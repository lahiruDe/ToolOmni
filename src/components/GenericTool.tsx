'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Upload, Download, Loader2, FilePlus, X, FileText, CheckCircle, ArrowRight, RotateCcw, Smartphone, Mail, Edit, ShieldCheck, Zap, Globe, ImageIcon, Sparkles, Copy } from 'lucide-react';
import { Tool, ICON_MAP, TOOLS } from '@/constants/tools';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { processPDF } from '@/lib/tool-engine';

interface GenericToolProps {
    tool: Tool;
}

type ToolStage = 'INITIAL_UPLOAD' | 'FILE_REVIEW' | 'COMPRESSION_CHOICE' | 'PROCESSING' | 'SUCCESS' | 'PDF_TO_JPG_RESULT' | 'TIKTOK_RESULT' | 'TEXT_RESULT';

interface TikTokData {
    title: string;
    cover: string;
    author: {
        nickname: string;
        avatar: string;
    };
    play: string;
    hdplay: string;
    music: string;
}

export function GenericTool({ tool }: GenericToolProps) {
    const [stage, setStage] = useState<ToolStage>('INITIAL_UPLOAD');
    const [result, setResult] = useState<Uint8Array | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [generatedImages, setGeneratedImages] = useState<{ blob: Blob, name: string }[]>([]);

    const [urlInput, setUrlInput] = useState('');
    const [textInput, setTextInput] = useState('');
    const [textResult, setTextResult] = useState('');
    const [tiktokData, setTiktokData] = useState<TikTokData | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const addMoreInputRef = useRef<HTMLInputElement>(null);

    const [processingStep, setProcessingStep] = useState(0);
    const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high'>('medium');

    const Icon = ICON_MAP[tool.iconName] || FileText;

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (stage === 'PROCESSING') {
            setProcessingStep(0);
            interval = setInterval(() => {
                setProcessingStep(prev => (prev < 3 ? prev + 1 : prev));
            }, 600);
        }
        return () => clearInterval(interval);
    }, [stage]);

    const handleUrlSubmit = async () => {
        if (!urlInput.trim()) return;
        setStage('PROCESSING');

        try {
            // Import processUrl dynamically to avoid issues
            const { processUrl } = await import('@/lib/tool-engine');
            const data = await processUrl(tool.id, urlInput);

            if (data) {
                // @ts-ignore
                setTiktokData(data);
                setStage('TIKTOK_RESULT');
            }
        } catch (e) {
            console.error(e);
            alert("Error fetching video. Please check the URL.");
            setStage('INITIAL_UPLOAD');
        }
    };

    const handleTextSubmit = async () => {
        if (!textInput.trim()) return;
        setStage('PROCESSING');
        try {
            const { processText } = await import('@/lib/tool-engine');
            const result = await processText(tool.id, textInput);
            if (result) {
                setTextResult(result);
                setStage('TEXT_RESULT');
            }
        } catch (error) {
            console.error(error);
            alert("Error processing text. Please try again.");
            setStage('INITIAL_UPLOAD');
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, append: boolean = false) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);

            if (tool.id === 'pdf-to-jpg') {
                // Automatically start processing for PDF to JPG
                setSelectedFiles([newFiles[0]]);
                setStage('PROCESSING');
                processPdfToImages(newFiles[0]);
            } else if (tool.id === 'compress-pdf') {
                // Go to Compression Choice for Compress PDF
                setSelectedFiles(newFiles);
                setStage('COMPRESSION_CHOICE');
            } else if (tool.id === 'background-remover' || tool.id === 'pdf-to-word' || tool.id === 'word-to-pdf' || tool.id === 'compress-image' || tool.id === 'jpg-to-png' || tool.id === 'png-to-jpg' || tool.id === 'upscale-image') {
                // Auto process for single file tools
                setSelectedFiles([newFiles[0]]);
                setStage('PROCESSING');
                handleProcess([newFiles[0]]);
            } else {
                if (append) {
                    setSelectedFiles(prev => [...prev, ...newFiles]);
                } else {
                    setSelectedFiles(newFiles);
                    setStage('FILE_REVIEW');
                }
            }
        }
        e.target.value = '';
    };

    const removeFile = (index: number) => {
        const newFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(newFiles);
        if (newFiles.length === 0) {
            setStage('INITIAL_UPLOAD');
        }
    };

    // Dedicated Logic for PDF to JPG Rendering
    const processPdfToImages = async (file: File) => {
        try {
            // @ts-ignore
            const pdfjsLib = await import('pdfjs-dist/build/pdf');

            // Use CDN for worker to prevent local loading errors in Next.js
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

            const arrayBuffer = await file.arrayBuffer();
            const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
            const pdf = await loadingTask.promise;

            const images: { blob: Blob, name: string }[] = [];

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 1.0 }); // Thumbnail quality
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                if (context) {
                    await page.render({ canvasContext: context, viewport }).promise;
                    const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/jpeg'));
                    if (blob) images.push({ blob, name: `page-${i}.jpg` });
                }
            }

            setGeneratedImages(images);

            // Also generate ZIP in background for 'Download All'
            const output = await processPDF('pdf-to-jpg', [file]);
            setResult(output);

            setStage('PDF_TO_JPG_RESULT');

        } catch (e) {
            console.error(e);
            alert("Failed to convert PDF. Please try a non-password protected PDF.");
            setStage('INITIAL_UPLOAD');
        }
    };

    const downloadSingleImage = (blob: Blob, name: string) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.click();
    };

    const handleProcess = useCallback(async (overrideFiles?: File[]) => {
        const filesToProcess = overrideFiles || selectedFiles;
        if (tool.id === 'merge-pdf' && filesToProcess.length < 2) {
            alert("Please select at least 2 files to merge.");
            return;
        }
        setStage('PROCESSING');
        try {
            if (tool.id !== 'pdf-to-jpg') await new Promise(resolve => setTimeout(resolve, 2000));
            const output = await processPDF(tool.id, filesToProcess, { compressionLevel });
            if (output) { setResult(output); setStage('SUCCESS'); }
            else { throw new Error("Processing failed"); }
        } catch (error) {
            console.error(error); setStage('FILE_REVIEW'); alert("Error processing file.");
        }
    }, [tool.id, selectedFiles]);

    const handleDownload = () => {
        if (!result) return;
        let mimeType = 'application/pdf';
        let ext = 'pdf';

        if (tool.id === 'pdf-to-jpg') {
            mimeType = 'application/zip';
            ext = 'zip';
        } else if (tool.id === 'pdf-to-word') {
            mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            ext = 'docx';
        } else if (tool.category === 'Image') {
            if (tool.id === 'background-remover' || tool.id === 'jpg-to-png') {
                mimeType = 'image/png';
                ext = 'png';
            } else {
                mimeType = 'image/jpeg';
                ext = 'jpg';
            }
        }
        const blob = new Blob([result as any], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `toolomni-${tool.id}-${Date.now()}.${ext}`;
        a.click();
    };

    const startOver = () => {
        setSelectedFiles([]);
        setResult(null);
        setGeneratedImages([]);
        setTextInput('');
        setTextResult('');
        setUrlInput('');
        setStage('INITIAL_UPLOAD');
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="min-h-[500px] flex flex-col items-center">

                {/* STAGE 1: INITIAL UPLOAD or URL INPUT */}
                {stage === 'INITIAL_UPLOAD' && (
                    <div className="w-full text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 animate-fadeIn">{tool.title}</h1>
                        <p className="text-zinc-500 mb-10 text-lg max-w-2xl mx-auto">{tool.description}</p>

                        {tool.type === 'url-to-file' ? (
                            // URL INPUT INTERFACE (TikTok, etc.)
                            <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 p-2 rounded-2xl shadow-xl shadow-blue-500/10 border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row gap-2">
                                <input
                                    type="text"
                                    value={urlInput}
                                    onChange={(e) => setUrlInput(e.target.value)}
                                    placeholder="Insert a link here (e.g. https://www.tiktok.com/@user/video...)"
                                    className="flex-grow px-6 py-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-lg"
                                />
                                <button
                                    onClick={handleUrlSubmit}
                                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 text-lg whitespace-nowrap"
                                >
                                    Download {tool.id === 'qr-generator' ? 'QR Code' : <ArrowRight className="w-5 h-5" />}
                                </button>
                            </div>
                        ) : tool.type === 'text-to-text' ? (
                            // TEXT INPUT INTERFACE (AI Writer, Grammar Checker)
                            <div className="max-w-4xl mx-auto flex flex-col gap-6 animate-fadeIn">
                                <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 shadow-2xl shadow-blue-500/10 border border-zinc-200 dark:border-zinc-800">
                                    <textarea
                                        value={textInput}
                                        onChange={(e) => setTextInput(e.target.value)}
                                        placeholder={tool.id === 'ai-writer' ? "Describe what you want me to write for you... (e.g. A professional email for a job application)" : "Paste your text here to check for grammar and spelling errors..."}
                                        className="w-full h-64 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-lg resize-none mb-6 border border-zinc-100 dark:border-zinc-700"
                                    />
                                    <div className="flex justify-center">
                                        <button
                                            onClick={handleTextSubmit}
                                            disabled={!textInput.trim()}
                                            className="px-12 py-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-600/25 flex items-center justify-center gap-3 text-xl group"
                                        >
                                            <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                                            {tool.id === 'ai-writer' ? 'Generate Content' : 'Fix Grammar now'}
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        { icon: Zap, title: "AI Powered", desc: "Using advanced language models" },
                                        { icon: ShieldCheck, title: "Private", desc: "Your data is never stored" },
                                        { icon: Edit, title: "Quality", desc: "Professional grade output" }
                                    ].map((feat, i) => (
                                        <div key={i} className="bg-white/50 dark:bg-zinc-900/50 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 flex flex-col items-center text-center">
                                            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-4">
                                                <feat.icon className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <h4 className="font-bold text-zinc-900 dark:text-white mb-1">{feat.title}</h4>
                                            <p className="text-sm text-zinc-500">{feat.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            // FILE UPLOAD INTERFACE (PDF, etc.)
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="max-w-3xl mx-auto border-2 border-dashed border-blue-200 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-900/10 rounded-[2.5rem] p-16 cursor-pointer hover:bg-blue-50 transition-colors group"
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept={tool.id === 'word-to-pdf' ? '.doc,.docx' : tool.category === 'Image' ? 'image/*' : 'application/pdf'}
                                    multiple={tool.id !== 'pdf-to-jpg' && tool.id !== 'compress-pdf' && tool.id !== 'pdf-to-word' && tool.id !== 'word-to-pdf' && tool.category !== 'Image'}
                                    onChange={(e) => handleFileSelect(e, false)}
                                />
                                <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-600/20 group-hover:scale-110 transition-transform">
                                    <Upload className="w-10 h-10 text-white" />
                                </div>
                                <div className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/10 mb-4 hover:bg-blue-700 transition-colors">
                                    Upload from PC or Mobile
                                </div>
                                <p className="text-zinc-400 text-sm font-medium">or drag and drop files here</p>
                            </div>
                        )}
                    </div>
                )}


                {/* STAGE: TIKTOK RESULT */}
                {stage === 'TIKTOK_RESULT' && tiktokData && (
                    <div className="w-full max-w-4xl animate-fadeIn">
                        <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 p-2 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row gap-2 mb-8 opacity-75 focus-within:opacity-100 transition-opacity">
                            <input type="text" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder="Insert another link..." className="flex-grow px-6 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white outline-none" />
                            <button onClick={handleUrlSubmit} className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl whitespace-nowrap">Download</button>
                        </div>

                        <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden border border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row">
                            <div className="p-6 md:w-5/12 bg-zinc-50 dark:bg-zinc-800/50 flex flex-col gap-4 relative">
                                {tool.id === 'tiktok-downloader' && (
                                    <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-2 py-1 rounded-md font-bold flex items-center gap-1"><Globe className="w-3 h-3" /> Public</div>
                                )}
                                <div className="aspect-[9/16] bg-zinc-200 dark:bg-zinc-700 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center relative group">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                                    {tiktokData.cover && (
                                        <img
                                            src={tiktokData.cover}
                                            alt="Result"
                                            className={cn(
                                                "absolute inset-0 w-full h-full",
                                                tiktokData.cover.startsWith('data:') ? "object-contain p-8 bg-white" : "object-cover"
                                            )}
                                        />
                                    )}
                                    <div className="absolute bottom-4 left-4 text-white z-10">
                                        <p className="font-bold text-shadow-sm">{tool.id === 'qr-generator' ? '' : `@${tiktokData.author.nickname}`}</p>
                                        <p className="text-xs opacity-90 line-clamp-2">{tool.id === 'qr-generator' ? 'Generated QR Code' : tiktokData.title}</p>
                                    </div>
                                    {!tiktokData.cover.startsWith('data:') && (
                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer z-10">
                                            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1"></div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-8 md:w-7/12 flex flex-col justify-center gap-4">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="w-12 h-12 bg-zinc-200 rounded-full overflow-hidden">
                                        {tiktokData.author.avatar ? <img src={tiktokData.author.avatar} alt="Avatar" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white font-bold text-lg">U</div>}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white capitalize">{tool.id === 'qr-generator' ? 'ToolOmni QR' : tiktokData.author.nickname}</h3>
                                        <p className="text-sm text-zinc-500">{tool.id === 'qr-generator' ? 'Generated' : 'TikTok Video'}</p>
                                    </div>
                                </div>
                                <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-2" />
                                {tool.id === 'qr-generator' ? (
                                    <a
                                        href={tiktokData.play}
                                        download="toolomni-qr-code.png"
                                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-transform active:scale-95"
                                    >
                                        <Download className="w-5 h-5" /> Download QR Code (PNG)
                                    </a>
                                ) : (
                                    <a href={`/api/download?url=${encodeURIComponent(tiktokData.hdplay)}&filename=tiktok-${tiktokData.author.nickname}-hd.mp4`} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 transition-transform active:scale-95">
                                        <Download className="w-5 h-5" /> Without watermark HD
                                        <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded ml-1">HD</span>
                                    </a>
                                )}
                                {tool.id === 'tiktok-downloader' && (
                                    <>
                                        <a href={`/api/download?url=${encodeURIComponent(tiktokData.play)}&filename=tiktok-${tiktokData.author.nickname}.mp4`} className="w-full py-4 bg-blue-50 hover:bg-blue-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-blue-700 dark:text-blue-400 font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                                            <Download className="w-5 h-5" /> Without watermark
                                        </a>

                                        <a href={`/api/download?url=${encodeURIComponent(tiktokData.music)}&filename=tiktok-${tiktokData.author.nickname}-audio.mp3`} className="w-full py-4 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                                            <Smartphone className="w-5 h-5" /> Download MP3
                                        </a>
                                    </>
                                )}

                                {tool.id === 'qr-generator' && (
                                    <div className="mt-4 p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-700 text-center">
                                        <p className="text-xs text-zinc-400 font-medium">Your QR code is ready for use!</p>
                                    </div>
                                )}
                                <div className="mt-4 flex gap-4 text-xs text-zinc-400 justify-center">
                                    <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Secure</span>
                                    <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Fast</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* STAGE: TEXT RESULT */}
                {stage === 'TEXT_RESULT' && (
                    <div className="w-full max-w-4xl animate-fadeIn">
                        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-zinc-100 dark:border-zinc-800">
                            <div className="p-8 border-b border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 bg-zinc-50/50 dark:bg-zinc-800/30">
                                <div>
                                    <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-1">Your AI Result</h3>
                                    <p className="text-zinc-500 text-sm">Generated by ToolOmni AI engine</p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(textResult);
                                            alert("Copied to clipboard!");
                                        }}
                                        className="px-6 py-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold rounded-xl hover:bg-zinc-50 flex items-center gap-2 transition-all shadow-sm"
                                    >
                                        <Copy className="w-4 h-4" /> Copy
                                    </button>
                                    <button
                                        onClick={startOver}
                                        className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20"
                                    >
                                        <RotateCcw className="w-4 h-4" /> Write more
                                    </button>
                                </div>
                            </div>
                            <div className="p-10">
                                <div className="prose dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                                    {textResult}
                                </div>
                            </div>
                            <div className="px-10 py-6 bg-zinc-50 dark:bg-zinc-800/30 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                                <p className="text-xs text-zinc-400">Word count: {textResult.split(/\s+/).filter(x => x.length > 0).length} words</p>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500">
                                    <ShieldCheck className="w-3 h-3" /> Private & Secure
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* STAGE: COMPRESSION CHOICE (Specific for Compress PDF) */}
                {stage === 'COMPRESSION_CHOICE' && (
                    <div className="w-full max-w-4xl mx-auto animate-fadeIn">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">Choose Compression Level</h2>
                            <p className="text-zinc-500">Select how much you want to compress your PDF</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mb-12">
                            {[
                                { id: 'low', title: 'Low Compression', desc: 'High quality, larger file size', icon: ImageIcon },
                                { id: 'medium', title: 'Recommended', desc: 'Good quality, good compression', icon: Zap },
                                { id: 'high', title: 'Extreme Compression', desc: 'Basic quality, smallest file size', icon: ShieldCheck }
                            ].map((level) => (
                                <div
                                    key={level.id}
                                    onClick={() => setCompressionLevel(level.id as any)}
                                    className={cn(
                                        "p-8 rounded-[2rem] border-2 cursor-pointer transition-all flex flex-col items-center text-center group",
                                        compressionLevel === level.id
                                            ? "border-blue-600 bg-blue-50/50 dark:bg-blue-900/10 shadow-xl shadow-blue-500/10"
                                            : "border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-blue-200"
                                    )}
                                >
                                    <div className={cn(
                                        "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors",
                                        compressionLevel === level.id ? "bg-blue-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 group-hover:bg-blue-50 group-hover:text-blue-500"
                                    )}>
                                        <level.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="font-bold text-lg mb-2 text-zinc-900 dark:text-white">{level.title}</h3>
                                    <p className="text-sm text-zinc-500 leading-relaxed">{level.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col items-center gap-4">
                            <button
                                onClick={() => handleProcess()}
                                className="px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 text-lg flex items-center gap-2 transition-transform active:scale-95"
                            >
                                Compress PDF <ArrowRight className="w-5 h-5" />
                            </button>
                            <button
                                onClick={startOver}
                                className="text-zinc-400 hover:text-zinc-600 font-bold text-sm"
                            >
                                Cancel and start over
                            </button>
                        </div>
                    </div>
                )}

                {/* STAGE 3: PROCESSING (NEW PROFESSIONAL LOOK) */}
                {stage === 'PROCESSING' && (
                    <div className="w-full max-w-lg mx-auto text-center animate-fadeIn py-12">
                        <div className="relative w-24 h-24 mx-auto mb-8">
                            <div className="absolute inset-0 border-4 border-zinc-100 dark:border-zinc-800 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Icon className="w-8 h-8 text-blue-600 animate-pulse" />
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                            {processingStep === 0 && (tool.id === 'background-remover' ? 'Initializing AI model...' : 'Uploading your file...')}
                            {processingStep === 1 && (tool.id === 'background-remover' ? 'Detecting subject edges...' : tool.id === 'compress-image' ? 'Compressing pixel data...' : tool.id === 'upscale-image' ? 'Generating AI high-res pixels...' : tool.category === 'Image' ? 'Processing image format...' : 'Analyzing document structure...')}
                            {processingStep === 2 && (
                                tool.id === 'background-remover' ? 'Removing background...' :
                                    tool.id === 'compress-pdf' || tool.id === 'compress-image' ? 'Optimizing local data...' :
                                        tool.id === 'upscale-image' ? 'Applying AI enhancement filters...' :
                                            tool.category === 'Image' ? 'Encoding target format...' :
                                                'Processing your request...'
                            )}
                            {processingStep >= 3 && 'Finalizing changes...'}
                        </h2>
                        <p className="text-zinc-500 mb-8">Please wait while we work our magic.</p>

                        <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-3 overflow-hidden relative">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "90%" }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                className="h-full bg-blue-600 rounded-full relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 animate-[shimmer_1s_infinite] skew-x-12"></div>
                            </motion.div>
                        </div>
                    </div>
                )}

                {/* STAGE 5: PDF TO JPG RESULT (THUMBNAIL GRID) */}
                {stage === 'PDF_TO_JPG_RESULT' && (
                    <div className="w-full max-w-6xl">
                        <div className="flex justify-between items-center mb-10 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm sticky top-20 z-10">
                            <button onClick={startOver} className="px-6 py-2 border border-zinc-200 rounded-xl font-bold text-zinc-500 hover:bg-zinc-50">Start Over</button>
                            <button
                                onClick={handleDownload}
                                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 flex items-center gap-2"
                            >
                                Download .zip <Download className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {generatedImages.map((img, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group relative bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all"
                                >
                                    <div className="aspect-[3/4] bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden mb-4 relative">
                                        <img
                                            src={URL.createObjectURL(img.blob)}
                                            alt={`Page ${idx + 1}`}
                                            className="w-full h-full object-contain"
                                        />
                                        {/* Hover Overlay for Single Download */}
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button
                                                onClick={() => downloadSingleImage(img.blob, img.name)}
                                                className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 hover:scale-110 transition-transform"
                                            >
                                                <Download className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-center font-bold text-zinc-700 dark:text-zinc-300 text-sm">{idx + 1}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* STAGE 2: REVIEW (For Merge Only) */}
                {stage === 'FILE_REVIEW' && tool.id !== 'pdf-to-jpg' && tool.id !== 'compress-pdf' && (
                    /* ... Existing Merge Review Logic ... */
                    <div className="w-full max-w-5xl">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                            <h2 className="text-xl font-bold text-zinc-800 dark:text-white flex items-center gap-2">
                                <Icon className="w-6 h-6 text-blue-600" /> {tool.title}
                            </h2>
                            <div className="flex items-center gap-3">
                                <input type="file" ref={addMoreInputRef} className="hidden" accept="application/pdf" multiple onChange={(e) => handleFileSelect(e, true)} />
                                <button onClick={() => addMoreInputRef.current?.click()} className="px-6 py-2.5 border border-zinc-200 text-zinc-700 font-bold rounded-xl hover:bg-zinc-50 flex items-center gap-2">
                                    <FilePlus className="w-4 h-4" /> Add Files
                                </button>
                                <button onClick={() => handleProcess()} className="px-8 py-2.5 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
                                    {tool.id === 'merge-pdf' ? 'Merge PDF' : 'Compress PDF'}
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {selectedFiles.map((file, idx) => (
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} key={idx + file.name} className="relative aspect-[3/4] bg-white dark:bg-zinc-900 rounded-xl border-2 border-zinc-100 dark:border-zinc-800 p-4 flex flex-col items-center justify-center group hover:border-blue-400 transition-colors">
                                    <button onClick={() => removeFile(idx)} className="absolute top-2 right-2 p-1.5 bg-red-50 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100"><X className="w-4 h-4" /></button>
                                    <div className="w-12 h-12 mb-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-xs font-bold text-zinc-400">PDF</div>
                                    <p className="text-[11px] text-center font-bold text-zinc-700 dark:text-zinc-300 line-clamp-2 break-all">{file.name}</p>
                                </motion.div>
                            ))}
                            <div onClick={() => addMoreInputRef.current?.click()} className="aspect-[3/4] border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-50 text-zinc-400 hover:text-blue-500 hover:border-blue-200"><FilePlus className="w-8 h-8 mb-2" /><span className="text-xs font-bold">Add More</span></div>
                        </div>
                    </div>
                )}

                {/* STAGE 4: SUCCESS (Merge & Compress) */}
                {stage === 'SUCCESS' && (
                    <div className="w-full animate-fadeIn max-w-4xl mx-auto">
                        <div className="w-full max-w-lg mx-auto text-center py-10">
                            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-emerald-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Success!</h2>
                            <p className="text-zinc-500 mb-6">
                                {tool.id === 'merge-pdf' && 'Your merged PDF is ready.'}
                                {tool.id === 'compress-pdf' && 'Your compressed PDF is ready.'}
                                {tool.id === 'pdf-to-word' && 'Your PDF has been converted to Word.'}
                                {tool.id === 'word-to-pdf' && 'Your Word file has been converted to PDF.'}
                                {tool.id === 'background-remover' && 'Background removed successfully.'}
                                {tool.id === 'compress-image' && 'Image compressed successfully.'}
                                {tool.id === 'jpg-to-png' && 'Converted to PNG successfully.'}
                                {tool.id === 'png-to-jpg' && 'Converted to JPG successfully.'}
                                {tool.id === 'upscale-image' && 'Image upscaled and enhanced successfully.'}
                            </p>

                            {/* IMAGE PREVIEW FOR BACKGROUND REMOVER, COMPRESSOR & CONVERTERS */}
                            {(tool.category === 'Image') && result && (
                                <div className="mb-8 relative group">
                                    <div className="aspect-square max-w-sm mx-auto bg-zinc-100 dark:bg-zinc-800 rounded-3xl overflow-hidden border-4 border-white dark:border-zinc-800 shadow-2xl relative">
                                        {/* Checkerboard Background for transparency preview (only for remover) */}
                                        {tool.id === 'background-remover' && (
                                            <div className="absolute inset-0 opacity-10 dark:opacity-5" style={{ backgroundImage: 'conic-gradient(#000 0.25turn, #fff 0.25turn 0.5turn, #000 0.5turn 0.75turn, #fff 0.75turn)', backgroundSize: '20px 20px' }} />
                                        )}
                                        <img
                                            src={URL.createObjectURL(new Blob([result as any], { type: (tool.id === 'png-to-jpg' || tool.id === 'compress-image' || tool.id === 'upscale-image') ? 'image/jpeg' : 'image/png' }))}
                                            className="relative z-10 w-full h-full object-contain p-4"
                                            alt="Result"
                                        />
                                    </div>
                                    <div className="mt-4 flex items-center justify-center gap-2">
                                        <div className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-500">
                                            {tool.id === 'background-remover' ? 'PNG Transparent' : tool.id === 'jpg-to-png' ? 'PNG Image' : tool.id === 'upscale-image' ? '2X Enhanced' : 'JPG Image'}
                                        </div>
                                        <div className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/20 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-600">AI Optimized</div>
                                    </div>
                                </div>
                            )}

                            {/* SIZE REDUCTION DISPLAY (Only for Compress Tools) */}
                            {(tool.id === 'compress-pdf' || tool.id === 'compress-image') && result && selectedFiles[0] && (() => {
                                const originalSize = selectedFiles[0].size;
                                const compressedSize = result.length;
                                const reduction = Math.max(0, Math.round((1 - (compressedSize / originalSize)) * 100));

                                const formatSize = (bytes: number) => {
                                    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
                                    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
                                };

                                return (
                                    <div className="mb-8 p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 inline-block w-full">
                                        <div className="flex items-center justify-between gap-4 mb-4">
                                            <div className="text-left">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Impact</p>
                                                <p className="text-2xl font-black text-emerald-500">
                                                    {reduction > 0 ? `${reduction}% Smaller` : 'Optimized'}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Saving</p>
                                                <p className="text-sm font-bold text-zinc-600 dark:text-zinc-300">
                                                    {formatSize(originalSize)} → {formatSize(compressedSize)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2 rounded-full overflow-hidden relative">
                                            <div
                                                className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: `${Math.max(5, (compressedSize / originalSize) * 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })()}

                            <button onClick={handleDownload} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 text-lg flex items-center justify-center gap-2 mb-4">
                                Download {
                                    tool.id === 'pdf-to-jpg' ? 'ZIP File' :
                                        tool.id === 'pdf-to-word' ? 'Word File' :
                                            tool.category === 'Image' ? 'Image' :
                                                'PDF'
                                } <ArrowRight className="w-5 h-5" />
                            </button>
                            <button onClick={startOver} className="text-sm font-bold text-zinc-500 hover:text-zinc-800">Start Over</button>
                        </div>

                        {/* ADVERTISEMENT / PREMIUM PLACEHOLDER */}
                        <div className="w-full max-w-4xl mx-auto my-12 animate-fadeIn">
                            <div className="bg-gradient-to-r from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900 border border-zinc-200 dark:border-zinc-700 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-bl-lg">Ad Space</div>
                                <p className="text-zinc-500 font-medium text-sm mb-2">Advertisement</p>
                                <h3 className="text-xl font-bold text-zinc-400">Support us by disabling AdBlock</h3>
                                <p className="text-zinc-400 text-sm mt-1">We keep these tools free thanks to our sponsors.</p>
                            </div>
                        </div>

                        {/* RELATED TOOLS (POPULAR TOOLS) */}
                        <div className="w-full max-w-5xl mx-auto my-16 border-t border-zinc-100 dark:border-zinc-800 pt-16">
                            <h3 className="text-2xl font-black text-center text-zinc-900 dark:text-white mb-10">Try some of our most popular tools</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {TOOLS.filter(t => t.id !== tool.id && (t.category === tool.category || t.id === 'tiktok-downloader')) // Fallback to TikTok for variety if needed
                                    .slice(0, 3)
                                    .map((relatedTool) => {
                                        const RelatedIcon = ICON_MAP[relatedTool.iconName] || FileText;
                                        return (
                                            <a key={relatedTool.id} href={relatedTool.href} className="group flex flex-col items-center p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                                                <div className="w-14 h-14 bg-blue-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                    <RelatedIcon className="w-7 h-7" />
                                                </div>
                                                <h4 className="font-bold text-zinc-900 dark:text-white mb-2">{relatedTool.title}</h4>
                                                <p className="text-xs text-zinc-500 text-center line-clamp-2">{relatedTool.description}</p>
                                            </a>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* SEO */}
            {/* RICH CONTENT & SEO */}
            <div className="mt-24 border-t border-zinc-100 dark:border-zinc-800 pt-16 max-w-5xl mx-auto">
                {tool.content ? (
                    // CUSTOM CONTENT (TikTok, etc.)
                    <div className="space-y-16 animate-fadeIn">
                        {/* Intro */}
                        <div className="text-center">
                            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-6">{tool.content.title}</h2>
                            <p className="text-lg text-zinc-500 leading-relaxed max-w-2xl mx-auto">{tool.content.description}</p>
                        </div>

                        {/* Steps Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tool.content.steps.map((step, idx) => (
                                <div key={idx} className="bg-zinc-50 dark:bg-zinc-800/50 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 relative group hover:border-blue-200 dark:hover:border-blue-900 transition-colors">
                                    <div className="absolute -top-5 -left-2 w-12 h-12 bg-blue-600 text-white font-black text-xl rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 transform -rotate-6 group-hover:rotate-0 transition-transform">
                                        {idx + 1}
                                    </div>
                                    <p className="text-zinc-700 dark:text-zinc-300 font-bold text-lg pt-4 leading-relaxed">{step}</p>
                                </div>
                            ))}
                        </div>

                        {/* Features List */}
                        {tool.content.features && (
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />
                                <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-10 text-center relative z-10">Why use our {tool.title}?</h3>
                                <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 relative z-10">
                                    {tool.content.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-4">
                                            <div className="w-8 h-8 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 shadow-sm text-blue-600">
                                                <CheckCircle className="w-5 h-5" />
                                            </div>
                                            <p className="text-zinc-700 dark:text-zinc-300 font-medium text-lg">{feature}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    // GENERIC FALLBACK CONTENT (Existing)
                    <div className="text-center">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-black text-zinc-900 dark:text-white">How To Use {tool.title}</h2>
                            <p className="text-zinc-500 mt-2">Follow along with the steps below</p>
                        </div>

                        <div className="relative grid md:grid-cols-3 gap-8">
                            {/* Connecting Line (Desktop Only) */}
                            <div className="hidden md:block absolute top-[5.5rem] left-1/6 right-1/6 h-0.5 bg-zinc-200 dark:bg-zinc-800 -z-10 transform -translate-y-1/2 w-2/3 mx-auto" />

                            {/* Step 1 */}
                            <div className="flex flex-col items-center text-center relative z-10">
                                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mb-6 shadow-xl shadow-blue-600/20 hover:scale-110 transition-transform duration-300">
                                    <Upload className="w-8 h-8" />
                                </div>
                                <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-1.5 rounded-full text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4 border border-zinc-200 dark:border-zinc-700">
                                    Step 1
                                </div>
                                <p className="text-zinc-600 dark:text-zinc-400 font-medium text-sm px-4">
                                    Select a {tool.category} file from your computer or mobile device.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col items-center text-center relative z-10">
                                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mb-6 shadow-xl shadow-blue-600/20 hover:scale-110 transition-transform duration-300">
                                    <Zap className="w-8 h-8" />
                                </div>
                                <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-1.5 rounded-full text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4 border border-zinc-200 dark:border-zinc-700">
                                    Step 2
                                </div>
                                <p className="text-zinc-600 dark:text-zinc-400 font-medium text-sm px-4">
                                    Wait a moment while our engine processes your file securely.
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="flex flex-col items-center text-center relative z-10">
                                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mb-6 shadow-xl shadow-blue-600/20 hover:scale-110 transition-transform duration-300">
                                    <Download className="w-8 h-8" />
                                </div>
                                <div className="bg-zinc-100 dark:bg-zinc-800 px-4 py-1.5 rounded-full text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4 border border-zinc-200 dark:border-zinc-700">
                                    Step 3
                                </div>
                                <p className="text-zinc-600 dark:text-zinc-400 font-medium text-sm px-4">
                                    Download your converted result instantly to your device.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* FAQ SECTION */}
                {tool.faqs && (
                    <div className="mt-32 mb-20">
                        <h2 className="text-3xl md:text-4xl font-black text-center text-zinc-900 dark:text-white mb-16">Frequently Asked Questions</h2>
                        <div className="max-w-3xl mx-auto space-y-4">
                            {tool.faqs.map((faq, idx) => (
                                <div key={idx} className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all cursor-default relative overflow-hidden group">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4 flex items-start gap-4">
                                        <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-black mt-0.5">Q</span>
                                        {faq.question}
                                    </h3>
                                    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-lg pl-12 border-l-2 border-zinc-100 dark:border-zinc-800 ml-4">
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
