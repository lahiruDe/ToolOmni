'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import {
    Upload, Download, FilePlus, X, FileText, CheckCircle,
    ArrowRight, RotateCcw, Smartphone, ShieldCheck,
    Zap, Globe, ImageIcon, Sparkles, Copy, RefreshCw
} from 'lucide-react';
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
            const { processUrl } = await import('@/lib/tool-engine');
            const data = await processUrl(tool.id, urlInput);

            if (data) {
                // @ts-ignore
                setTiktokData(data);
                setStage('TIKTOK_RESULT');
            }
        } catch (e) {
            console.error(e);
            alert("Error fetching info. Please check the input.");
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
                setSelectedFiles([newFiles[0]]);
                setStage('PROCESSING');
                processPdfToImages(newFiles[0]);
            } else if (tool.id === 'compress-pdf') {
                setSelectedFiles(newFiles);
                setStage('COMPRESSION_CHOICE');
            } else if (tool.id === 'background-remover' || tool.id === 'pdf-to-word' || tool.id === 'word-to-pdf' || tool.id === 'compress-image' || tool.id === 'jpg-to-png' || tool.id === 'png-to-jpg' || tool.id === 'upscale-image') {
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
        if (newFiles.length === 0) setStage('INITIAL_UPLOAD');
    };

    const processPdfToImages = async (file: File) => {
        try {
            // @ts-ignore
            const pdfjsLib = await import('pdfjs-dist/build/pdf');
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

            const arrayBuffer = await file.arrayBuffer();
            const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
            const pdf = await loadingTask.promise;

            const images: { blob: Blob, name: string }[] = [];
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 1.0 });
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
            const output = await processPDF('pdf-to-jpg', [file]);
            setResult(output);
            setStage('PDF_TO_JPG_RESULT');
        } catch (e) {
            console.error(e);
            alert("Failed to convert PDF.");
            setStage('INITIAL_UPLOAD');
        }
    };

    const downloadSingleImage = (blob: Blob, name: string) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = name; a.click();
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
            console.error(error); setStage('INITIAL_UPLOAD'); alert("Error processing file.");
        }
    }, [tool.id, selectedFiles, compressionLevel]);

    const handleDownload = () => {
        if (!result) return;
        let mimeType = 'application/pdf';
        let ext = 'pdf';

        if (tool.id === 'pdf-to-jpg') { mimeType = 'application/zip'; ext = 'zip'; }
        else if (tool.id === 'pdf-to-word') { mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'; ext = 'docx'; }
        else if (tool.category === 'Image') {
            if (tool.id === 'background-remover' || tool.id === 'jpg-to-png') { mimeType = 'image/png'; ext = 'png'; }
            else { mimeType = 'image/jpeg'; ext = 'jpg'; }
        }
        const blob = new Blob([result as any], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = `toolomni-${tool.id}-${Date.now()}.${ext}`; a.click();
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
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="min-h-[500px] flex flex-col items-center">

                {/* STAGE: INITIAL UPLOAD / INPUT */}
                {stage === 'INITIAL_UPLOAD' && (
                    <div className="w-full text-center py-6">
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
                            <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">{tool.title}</h1>
                            <p className="text-lg text-zinc-500 mb-6 font-medium leading-relaxed">{tool.description}</p>

                            {/* SEO/Intro Paragraph */}
                            <p className="text-sm text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed italic">
                                Use our free online {tool.title} tool to process your {tool.category.toLowerCase()} files instantly.
                                ToolOmni provides professional-grade security and speed without any hidden costs or registration requirements.
                                Simply upload your file below to get started.
                            </p>
                        </motion.div>

                        {tool.type === 'url-to-file' ? (
                            <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 p-2.5 rounded-2xl shadow-xl shadow-blue-500/5 border border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row gap-3">
                                <input type="text" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder="Paste your link here..." className="flex-grow px-6 py-4 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-base" />
                                <button onClick={handleUrlSubmit} className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-base whitespace-nowrap">
                                    {tool.id === 'qr-generator' ? 'Create QR' : 'Fetch Content'}
                                </button>
                            </div>
                        ) : tool.type === 'text-to-text' ? (
                            <div className="max-w-4xl mx-auto">
                                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 shadow-2xl shadow-blue-500/5 border border-zinc-100 dark:border-zinc-800">
                                    <textarea value={textInput} onChange={(e) => setTextInput(e.target.value)} placeholder="Start typing or paste your content here..." className="w-full h-72 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/10 transition-all text-lg resize-none mb-8 border border-zinc-100 dark:border-zinc-700 leading-relaxed" />
                                    <button onClick={handleTextSubmit} disabled={!textInput.trim()} className="px-12 py-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-xl flex items-center justify-center gap-4 text-lg mx-auto">
                                        <Sparkles className="w-6 h-6" /> {tool.id === 'ai-writer' ? 'Generate Content' : 'Polish My Writing'}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div onClick={() => fileInputRef.current?.click()} className="max-w-2xl mx-auto border-2 border-dashed border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900/50 rounded-3xl p-16 cursor-pointer hover:border-blue-500 hover:shadow-xl transition-all group relative overflow-hidden">
                                <input type="file" ref={fileInputRef} className="hidden" accept={tool.id === 'word-to-pdf' ? '.doc,.docx' : tool.category === 'Image' ? 'image/*' : 'application/pdf'} multiple={tool.id !== 'pdf-to-jpg' && tool.id !== 'compress-pdf' && tool.id !== 'pdf-to-word' && tool.id !== 'word-to-pdf' && tool.category !== 'Image'} onChange={(e) => handleFileSelect(e, false)} />
                                <div className="relative z-10">
                                    <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 group-hover:bg-blue-50 transition-all">
                                        <Upload className="w-8 h-8 text-zinc-400 group-hover:text-blue-600 transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 tracking-tight">Click to upload or drag & drop</h3>
                                    <p className="text-zinc-400 text-sm font-medium">Supports PDF, Image, and Document files</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* STAGE: PROCESSING */}
                {stage === 'PROCESSING' && (
                    <div className="w-full max-w-lg mx-auto text-center py-20 animate-fadeIn">
                        <div className="relative w-20 h-20 mx-auto mb-8">
                            <div className="absolute inset-0 border-4 border-zinc-100 dark:border-zinc-800 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Icon className="w-7 h-7 text-blue-600 animate-pulse" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Processing...</h2>
                        <p className="text-zinc-500 font-medium">Please wait while we work our magic.</p>
                    </div>
                )}

                {/* STAGE: RESULTS */}
                {(stage === 'SUCCESS' || stage === 'TIKTOK_RESULT' || stage === 'TEXT_RESULT') && (
                    <div className="w-full text-center py-8 animate-fadeIn">
                        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto">
                            <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                                <CheckCircle className="w-8 h-8 text-emerald-500" />
                            </div>
                            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight">Your result is ready!</h2>
                            <p className="text-zinc-500 mb-10 font-medium">Successful processing. Access your content below.</p>

                            {stage === 'TEXT_RESULT' && (
                                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl overflow-hidden border border-zinc-100 dark:border-zinc-800 mb-10 text-left">
                                    <div className="p-8 prose dark:prose-invert max-w-none text-zinc-800 dark:text-zinc-200 text-lg leading-relaxed whitespace-pre-wrap font-medium">{textResult}</div>
                                    <div className="px-8 py-4 bg-zinc-50 dark:bg-zinc-800/30 border-t border-zinc-100 flex justify-between items-center text-xs font-bold text-zinc-400">
                                        <span>{textResult.split(/\s+/).filter(x => x.length > 0).length} words</span>
                                        <button onClick={() => { navigator.clipboard.writeText(textResult); alert("Copied!"); }} className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"><Copy className="w-4 h-4" /> Copy Content</button>
                                    </div>
                                </div>
                            )}

                            {(tool.category === 'Image' || tool.id === 'qr-generator' || tool.id === 'tiktok-downloader') && (result || tiktokData) && (
                                <div className="mb-10 relative group max-w-sm mx-auto">
                                    <div className="aspect-square bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-xl relative p-6">
                                        {tool.id === 'background-remover' && <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'conic-gradient(#000 0.25turn, #fff 0.25turn 0.5turn, #000 0.5turn 0.75turn, #fff 0.75turn)', backgroundSize: '15px 15px' }} />}
                                        <img src={tiktokData?.cover || (result ? URL.createObjectURL(new Blob([result as any], { type: (tool.id === 'png-to-jpg' || tool.id === 'compress-image' || tool.id === 'upscale-image') ? 'image/jpeg' : 'image/png' })) : '')} className="relative z-10 w-full h-full object-contain" alt="Result" />
                                    </div>
                                </div>
                            )}

                            {(tool.id === 'compress-pdf' || tool.id === 'compress-image') && result && selectedFiles[0] && (() => {
                                const originalSize = selectedFiles[0].size; const compressedSize = result.length;
                                const reduction = Math.max(0, Math.round((1 - (compressedSize / originalSize)) * 100));
                                const formatSize = (bytes: number) => bytes < 1048576 ? (bytes / 1024).toFixed(1) + ' KB' : (bytes / 1048576).toFixed(2) + ' MB';
                                return (
                                    <div className="mb-10 flex items-center justify-center gap-12 border-y border-zinc-100 dark:border-zinc-800 py-6">
                                        <div className="text-center"><p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Original</p><p className="text-base font-bold text-zinc-400 line-through decoration-zinc-300">{formatSize(originalSize)}</p></div>
                                        <div className="px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 font-bold text-emerald-600 text-sm">-{reduction}%</div>
                                        <div className="text-center"><p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">New Size</p><p className="text-base font-bold text-zinc-900 dark:text-white">{formatSize(compressedSize)}</p></div>
                                    </div>
                                );
                            })()}

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                {stage === 'TEXT_RESULT' ? (
                                    <button onClick={() => { navigator.clipboard.writeText(textResult); alert("Copied!"); }} className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 text-base"><Copy className="w-5 h-5 opacity-70" /> Copy Content</button>
                                ) : (
                                    <button
                                        onClick={handleDownload}
                                        className="w-full sm:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-3 text-base"
                                    >
                                        <Download className="w-5 h-5" /> Download Result
                                    </button>
                                )}
                                <button onClick={startOver} className="w-full sm:w-auto px-10 py-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 font-bold rounded-xl hover:bg-zinc-50 transition-all flex items-center justify-center gap-3 text-base"><RotateCcw className="w-5 h-5 text-zinc-400" /> Start Over</button>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* STAGE: PDF TO JPG GRID */}
                {stage === 'PDF_TO_JPG_RESULT' && (
                    <div className="w-full max-w-6xl py-6 animate-fadeIn">
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-6 bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm sticky top-24 z-10">
                            <div><h2 className="text-xl font-bold text-zinc-900 dark:text-white">Conversion Complete</h2><p className="text-sm text-zinc-500 font-medium">Found {generatedImages.length} pages in your PDF.</p></div>
                            <div className="flex gap-3 w-full sm:w-auto">
                                <button onClick={startOver} className="flex-1 sm:flex-none px-6 py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 rounded-xl font-bold text-zinc-500 text-sm">Back</button>
                                <button onClick={handleDownload} className="flex-[2] sm:flex-none px-8 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm">Download ZIP <Download className="w-4 h-4" /></button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {generatedImages.map((img, idx) => (
                                <div key={idx} className="group relative bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm transition-all hover:border-blue-500">
                                    <div className="aspect-[3/4] bg-zinc-50 dark:bg-zinc-800 rounded-xl overflow-hidden mb-3 relative">
                                        <img src={URL.createObjectURL(img.blob)} className="w-full h-full object-contain" alt="page" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button onClick={() => downloadSingleImage(img.blob, img.name)} className="w-10 h-10 bg-white text-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl"><Download className="w-5 h-5" /></button>
                                        </div>
                                    </div>
                                    <p className="text-center font-bold text-zinc-400 text-xs">Page {idx + 1}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* STAGE: FILE REVIEW (Merge) */}
                {stage === 'FILE_REVIEW' && (
                    <div className="w-full max-w-4xl py-6 animate-fadeIn text-center">
                        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">Arrange Files</h2>
                        <p className="text-base text-zinc-500 mb-10 font-medium">Drag to reorder or add more files before processing.</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-12">
                            {selectedFiles.map((f, i) => (
                                <div key={i} className="relative aspect-[3/4] bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-5 flex flex-col items-center justify-center group shadow-sm hover:border-blue-500 transition-all">
                                    <button onClick={() => removeFile(i)} className="absolute -top-2 -right-2 w-7 h-7 bg-white text-red-500 rounded-full shadow-md border border-red-50 flex items-center justify-center hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"><X className="w-4 h-4" /></button>
                                    <div className="w-14 h-14 bg-zinc-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center mb-3 text-zinc-300 font-bold italic tracking-tighter">PDF</div>
                                    <p className="text-xs font-bold text-zinc-600 dark:text-zinc-300 line-clamp-2 break-all px-2">{f.name}</p>
                                </div>
                            ))}
                            <div onClick={() => addMoreInputRef.current?.click()} className="aspect-[3/4] border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 group transition-all">
                                <FilePlus className="w-8 h-8 text-zinc-300 group-hover:text-blue-500 transition-colors" />
                                <span className="text-[10px] font-black text-zinc-400 mt-2 uppercase tracking-widest">Add Files</span>
                                <input type="file" ref={addMoreInputRef} className="hidden" multiple onChange={(e) => handleFileSelect(e, true)} />
                            </div>
                        </div>
                        <button onClick={() => handleProcess()} className="px-12 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-xl hover:scale-105 transition-all text-lg font-medium tracking-tight">Process {selectedFiles.length} Files</button>
                    </div>
                )}
            </div>

            {/* SHARED RICH CONTENT & FAQS */}
            <div className="mt-24 max-w-5xl mx-auto border-t border-zinc-100 dark:border-zinc-800 pt-20 text-center">
                <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">How to use {tool.title}?</h2>
                <p className="text-lg text-zinc-500 mb-16 max-w-2xl mx-auto font-medium leading-relaxed">Get your task done in seconds following these three simple steps.</p>

                <div className="grid md:grid-cols-3 gap-12 mb-32">
                    {[
                        { icon: Upload, title: 'Upload', desc: `Select your ${tool.category.toLowerCase()} files from your device.` },
                        { icon: Zap, title: 'Process', desc: 'Our high-speed engine processes your content securely.' },
                        { icon: CheckCircle, title: 'Done', desc: 'Download your quality result immediately.' }
                    ].map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center px-4">
                            <div className="w-16 h-16 bg-blue-50 dark:bg-zinc-800/50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 dark:border-zinc-700">
                                <step.icon className="w-6 h-6 text-blue-600" />
                            </div>
                            <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 tracking-tight">{step.title}</h4>
                            <p className="text-zinc-500 text-sm leading-relaxed font-medium">{step.desc}</p>
                        </div>
                    ))}
                </div>

                {tool.faqs && (
                    <div className="mt-20 py-20 bg-zinc-50 dark:bg-zinc-900/40 rounded-[3rem] px-8 md:px-16 border border-zinc-100 dark:border-zinc-800">
                        <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-16 tracking-tight">Frequently Asked Questions</h2>
                        <div className="text-left grid md:grid-cols-2 gap-x-12 gap-y-12">
                            {tool.faqs.map((faq, idx) => (
                                <div key={idx} className="flex gap-4">
                                    <div className="w-10 h-10 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-zinc-100 dark:border-zinc-700 text-blue-600 font-serif italic font-bold">Q</div>
                                    <div>
                                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 leading-snug">{faq.question}</h3>
                                        <p className="text-zinc-500 text-sm leading-relaxed font-medium">{faq.answer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
