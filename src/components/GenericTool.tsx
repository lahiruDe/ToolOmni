'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import {
    Upload, Download, FilePlus, X, FileText, CheckCircle,
    ArrowRight, RotateCcw, Smartphone, ShieldCheck,
    Zap, Globe, ImageIcon, Sparkles, Copy, RefreshCw,
    ChevronUp, ChevronDown, Link, Unlink, Crop, RotateCw, FlipHorizontal, FlipVertical, Plus
} from 'lucide-react';
import { Tool, ICON_MAP, TOOLS } from '@/constants/tools';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { processPDF } from '@/lib/tool-engine';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface GenericToolProps {
    tool: Tool;
    hideFaq?: boolean;
}

type ToolStage = 'INITIAL_UPLOAD' | 'FILE_REVIEW' | 'COMPRESSION_CHOICE' | 'IMAGE_COMPRESSION_CHOICE' | 'IMAGE_RESIZE_CHOICE' | 'IMAGE_CROP_CHOICE' | 'BLUR_FACE_WORKSHOP' | 'SPLIT_OPTIONS' | 'UPSCALE_CHOICE' | 'PROCESSING' | 'SUCCESS' | 'PDF_TO_JPG_RESULT' | 'TIKTOK_RESULT' | 'TEXT_RESULT';

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

export function GenericTool({ tool, hideFaq }: GenericToolProps) {
    const [stage, setStage] = useState<ToolStage>('INITIAL_UPLOAD');
    const [result, setResult] = useState<Uint8Array | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [generatedImages, setGeneratedImages] = useState<{ blob: Blob, name: string }[]>([]);
    const [pageThumbnails, setPageThumbnails] = useState<string[]>([]);
    const [splitMethod, setSplitMethod] = useState<'ranges' | 'all'>('ranges');
    const [splitRanges, setSplitRanges] = useState('1');

    const [urlInput, setUrlInput] = useState('');
    const [textInput, setTextInput] = useState('');
    const [textResult, setTextResult] = useState('');
    const [tiktokData, setTiktokData] = useState<TikTokData | null>(null);
    const [originalFileName, setOriginalFileName] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const addMoreInputRef = useRef<HTMLInputElement>(null);

    const [processingStep, setProcessingStep] = useState(0);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [statusMessage, setStatusMessage] = useState('');
    const [compressionLevel, setCompressionLevel] = useState<'low' | 'medium' | 'high'>('medium');

    // Background Replacement State
    const [bgType, setBgType] = useState<'transparent' | 'color' | 'image'>('transparent');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [bgImageFile, setBgImageFile] = useState<File | null>(null);
    const [compositeResult, setCompositeResult] = useState<string | null>(null);
    const [upscaleScale, setUpscaleScale] = useState<2 | 4>(2);
    const [sliderPos, setSliderPos] = useState(tool.id === 'compress-image' ? 80 : 50);
    const [isImageCompressing, setIsImageCompressing] = useState(false);
    
    // Resize Image State
    const [resizeWidth, setResizeWidth] = useState<number | string>(1080);
    const [resizeHeight, setResizeHeight] = useState<number | string>(1080);
    const [resizeUnit, setResizeUnit] = useState<'px' | '%' | 'cm'>('px');
    const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
    const [originalDimensions, setOriginalDimensions] = useState({w: 1, h: 1});
    const [resizeOutputFormat, setResizeOutputFormat] = useState('image/jpeg');

    // Crop Image State
    const cropperRef = useRef<ReactCropperElement>(null);
    const [cropImageSrc, setCropImageSrc] = useState<string>('');
    const [activeCropRatio, setActiveCropRatio] = useState<number | undefined>(undefined);
    const [cropOutputFormat, setCropOutputFormat] = useState('image/jpeg');

    // Blur Face State
    const [detectedFaces, setDetectedFaces] = useState<any[]>([]);
    const [toggledFaces, setToggledFaces] = useState<Record<number, boolean>>({});
    const [isDetectingFaces, setIsDetectingFaces] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const originalImageRef = useRef<HTMLImageElement>(null);
    const blurredCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const [manualBlurBoxes, setManualBlurBoxes] = useState<{ id: string, x: number, y: number, width: number, height: number }[]>([]);
    const [isAddManualMode, setIsAddManualMode] = useState(false);
    const [interactionState, setInteractionState] = useState<{ 
        type: 'draw' | 'move' | 'resize' | null, 
        boxId: string | null, 
        startX: number, 
        startY: number, 
        origBox?: { x: number, y: number, width: number, height: number } 
    }>({ type: null, boxId: null, startX: 0, startY: 0 });

    const bgImageInputRef = useRef<HTMLInputElement>(null);

    const handleSliderMove = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        if (tool.id === 'compress-image') return; // Slider for compress-image uses an input[type=range]
        const rect = e.currentTarget.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const pos = ((clientX - rect.left) / rect.width) * 100;
        setSliderPos(Math.min(Math.max(pos, 0), 100));
    }, []);

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
            setOriginalFileName(newFiles[0].name.split('.').slice(0, -1).join('.') || 'file');

            if (tool.id === 'pdf-to-jpg') {
                setSelectedFiles([newFiles[0]]);
                setStage('PROCESSING');
                processPdfToImages(newFiles[0]);
            } else if (tool.id === 'compress-pdf') {
                setSelectedFiles(newFiles);
                setStage('COMPRESSION_CHOICE');
            } else if (tool.id === 'upscale-image') {
                setSelectedFiles([newFiles[0]]);
                setStage('UPSCALE_CHOICE');
            } else if (tool.id === 'compress-image' || tool.id === 'convert-to-webp') {
                if (tool.id === 'compress-image') {
                    setSelectedFiles([newFiles[0]]);
                } else {
                    setSelectedFiles(newFiles);
                }
                setSliderPos(80);
                setStage('IMAGE_COMPRESSION_CHOICE');
            } else if (tool.id === 'resize-image') {
                const f = newFiles[0];
                setSelectedFiles([f]);
                const img = new Image();
                img.onload = () => {
                    setOriginalDimensions({ w: img.width, h: img.height });
                    setResizeWidth(img.width);
                    setResizeHeight(img.height);
                    setResizeUnit('px');
                    setMaintainAspectRatio(true);
                    setResizeOutputFormat(f.type === 'image/png' ? 'image/png' : 'image/jpeg');
                    setStage('IMAGE_RESIZE_CHOICE');
                    URL.revokeObjectURL(img.src);
                };
                img.src = URL.createObjectURL(f);
            } else if (tool.id === 'blur-face') {
                const f = newFiles[0];
                setSelectedFiles([f]);
                setSliderPos(75);
                setStage('BLUR_FACE_WORKSHOP');
                detectFaces(f);
            } else if (tool.id === 'crop-image') {
                const f = newFiles[0];
                setSelectedFiles([f]);
                setCropImageSrc(URL.createObjectURL(f));
                setActiveCropRatio(undefined);
                setCropOutputFormat(f.type === 'image/png' ? 'image/png' : 'image/jpeg');
                setStage('IMAGE_CROP_CHOICE');
            } else if (tool.id === 'background-remover' || tool.id === 'pdf-to-word' || tool.id === 'word-to-pdf' || tool.id === 'jpg-to-png' || tool.id === 'png-to-jpg') {
                setSelectedFiles([newFiles[0]]);
                setStage('PROCESSING');
                handleProcess([newFiles[0]]);
            } else if (tool.id === 'split-pdf') {
                setSelectedFiles([newFiles[0]]);
                generatePageThumbnails(newFiles[0]);
                setStage('SPLIT_OPTIONS');
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

    const moveFileUp = (index: number) => {
        if (index === 0) return;
        const newFiles = [...selectedFiles];
        [newFiles[index - 1], newFiles[index]] = [newFiles[index], newFiles[index - 1]];
        setSelectedFiles(newFiles);
    };

    const moveFileDown = (index: number) => {
        if (index === selectedFiles.length - 1) return;
        const newFiles = [...selectedFiles];
        [newFiles[index + 1], newFiles[index]] = [newFiles[index], newFiles[index + 1]];
        setSelectedFiles(newFiles);
    };

    const generatePageThumbnails = async (file: File) => {
        try {
            // @ts-ignore
            const pdfjsLib = await import('pdfjs-dist/build/pdf');
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

            const arrayBuffer = await file.arrayBuffer();
            const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
            const pdf = await loadingTask.promise;

            const thumbs: string[] = [];
            for (let i = 1; i <= Math.min(pdf.numPages, 20); i++) { // Limit to 20 previews for performance
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 0.3 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                if (context) {
                    await page.render({ canvasContext: context, viewport }).promise;
                    thumbs.push(canvas.toDataURL('image/jpeg', 0.6));
                }
            }
            setPageThumbnails(thumbs);
        } catch (e) {
            console.error("Thumbnail generation failed", e);
        }
    };

    const detectFaces = async (file: File) => {
        setIsDetectingFaces(true);
        try {
            // @ts-ignore
            const { FaceDetector, FilesetResolver } = await import('@mediapipe/tasks-vision');
            
            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
            );
            
            const faceDetector = await FaceDetector.createFromOptions(vision, {
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
                    delegate: "CPU"
                },
                runningMode: "IMAGE"
            });

            const img = new Image();
            const url = URL.createObjectURL(file);
            await new Promise((res, rej) => { 
                img.onload = res; 
                img.onerror = rej;
                img.src = url; 
            });
            
            if (img.width === 0 || img.height === 0) {
                throw new Error("Image has invalid dimensions.");
            }

            const results = faceDetector.detect(img);
            
            setDetectedFaces(results.detections || []);
            const initialToggles: Record<number, boolean> = {};
            (results.detections || []).forEach((_: any, i: number) => initialToggles[i] = true);
            setToggledFaces(initialToggles);
            
            originalImageRef.current = img;
            URL.revokeObjectURL(url);
            faceDetector.close(); // Clean up WASM memory
        } catch (e: any) {
            console.error('Face detection failed:', e);
            // Don't alert here, just fallback to manual mode implicitly by allowing the user to continue
            // alert('Face detection failed. Switching to manual mode.');
        } finally {
            setIsDetectingFaces(false);
        }
    };

    const drawFaceCanvas = useCallback(() => {
        if (!canvasRef.current || !originalImageRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = originalImageRef.current;
        if (!ctx) return;
        
        canvas.width = img.width;
        canvas.height = img.height;
        
        ctx.filter = 'none';
        ctx.drawImage(img, 0, 0, img.width, img.height);
        
        const blurValue = Math.max(1, sliderPos / 2.5);

        // 1. Draw Auto-detected Faces
        detectedFaces.forEach((det, i) => {
            const bb = det.boundingBox;
            const pad = Math.floor(bb.width * 0.1);
            const ox = Math.max(0, bb.originX - pad);
            const oy = Math.max(0, bb.originY - pad);
            const ow = Math.min(img.width - ox, bb.width + pad * 2);
            const oh = Math.min(img.height - oy, bb.height + pad * 2);

            if (ow < 1 || oh < 1) return;

            if (toggledFaces[i]) {
                if (blurredCanvasRef.current) {
                    ctx.drawImage(blurredCanvasRef.current, ox, oy, ow, oh, ox, oy, ow, oh);
                } else {
                    const offCanvas = document.createElement('canvas');
                    offCanvas.width = ow;
                    offCanvas.height = oh;
                    const offCtx = offCanvas.getContext('2d');
                    if (offCtx) {
                        offCtx.filter = `blur(${blurValue}px)`;
                        offCtx.drawImage(img, ox, oy, ow, oh, 0, 0, ow, oh);
                        ctx.drawImage(offCanvas, ox, oy);
                    }
                }
                
                ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
                ctx.lineWidth = 2;
                ctx.strokeRect(ox, oy, ow, oh);
            } else {
                ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
                ctx.lineWidth = 2;
                ctx.strokeRect(ox, oy, ow, oh);
            }
        });

        // 2. Draw Manual Blur Boxes
        manualBlurBoxes.forEach(box => {
            if (Math.abs(box.width) < 1 || Math.abs(box.height) < 1) return;

            if (blurredCanvasRef.current) {
                ctx.drawImage(blurredCanvasRef.current, box.x, box.y, box.width, box.height, box.x, box.y, box.width, box.height);
            } else {
                const offCanvas = document.createElement('canvas');
                offCanvas.width = Math.abs(box.width);
                offCanvas.height = Math.abs(box.height);
                const offCtx = offCanvas.getContext('2d');
                if (offCtx) {
                    offCtx.filter = `blur(${blurValue}px)`;
                    offCtx.drawImage(img, box.x, box.y, box.width, box.height, 0, 0, box.width, box.height);
                    ctx.drawImage(offCanvas, box.x, box.y);
                }
            }

            // UI for manual box
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.strokeRect(box.x, box.y, box.width, box.height);
            ctx.setLineDash([]);

            // Resize handle (bottom right)
            ctx.fillStyle = '#3b82f6';
            ctx.fillRect(box.x + box.width - 6, box.y + box.height - 6, 12, 12);
            
            // Delete handle (top right)
            ctx.fillStyle = '#ef4444';
            ctx.beginPath();
            ctx.arc(box.x + box.width, box.y, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(box.x + box.width - 4, box.y - 4);
            ctx.lineTo(box.x + box.width + 4, box.y + 4);
            ctx.moveTo(box.x + box.width + 4, box.y - 4);
            ctx.lineTo(box.x + box.width - 4, box.y + 4);
            ctx.stroke();
        });
    }, [detectedFaces, toggledFaces, sliderPos, manualBlurBoxes, interactionState]);

    // Cache blurred version of the image for high-performance rendering
    useEffect(() => {
        if (stage === 'BLUR_FACE_WORKSHOP' && originalImageRef.current) {
            const img = originalImageRef.current;
            const blurValue = Math.max(1, sliderPos / 2.5);
            
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.filter = `blur(${blurValue}px)`;
                ctx.drawImage(img, 0, 0);
                blurredCanvasRef.current = canvas;
                drawFaceCanvas();
            }
        }
    }, [sliderPos, stage]);

    useEffect(() => {
        if (stage === 'BLUR_FACE_WORKSHOP') {
            drawFaceCanvas();
        }
    }, [drawFaceCanvas, stage, manualBlurBoxes, isAddManualMode]);

    const getEventCoords = (e: any) => {
        if (!canvasRef.current || !originalImageRef.current) return { x: 0, y: 0, scaleX: 1, scaleY: 1 };
        const rect = canvasRef.current.getBoundingClientRect();
        const scaleX = originalImageRef.current.width / rect.width;
        const scaleY = originalImageRef.current.height / rect.height;
        
        let clientX = 0;
        let clientY = 0;
        
        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }
        
        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY,
            scaleX,
            scaleY
        };
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if ('touches' in e && e.touches.length > 1) return; // Ignore multi-touch
        const { x, y, scaleX, scaleY } = getEventCoords(e);
        if (x === 0 && y === 0) return;

        // 1. Check for Manual Box Interactions
        for (let i = manualBlurBoxes.length - 1; i >= 0; i--) {
            const box = manualBlurBoxes[i];
            
            // Check Delete Handle (top right)
            const distDelete = Math.sqrt(Math.pow(x - (box.x + box.width), 2) + Math.pow(y - box.y, 2));
            if (distDelete < 15 * scaleX) {
                setManualBlurBoxes(prev => prev.filter((_, idx) => idx !== i));
                return;
            }

            // Check Resize Handle (bottom right)
            if (x >= box.x + box.width - 15 * scaleX && x <= box.x + box.width + 15 * scaleX &&
                y >= box.y + box.height - 15 * scaleY && y <= box.y + box.height + 15 * scaleY) {
                setInteractionState({ type: 'resize', boxId: box.id, startX: x, startY: y, origBox: { ...box } });
                return;
            }

            // Check Body for Drag
            if (x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.y + box.height) {
                setInteractionState({ type: 'move', boxId: box.id, startX: x, startY: y, origBox: { ...box } });
                return;
            }
        }

        // 2. Toggling Auto-detected Faces (Legacy logic)
        if (!isAddManualMode && originalImageRef.current) {
            for (let i = detectedFaces.length - 1; i >= 0; i--) {
                const bb = detectedFaces[i].boundingBox;
                const pad = Math.floor(bb.width * 0.1);
                const ox = Math.max(0, bb.originX - pad);
                const oy = Math.max(0, bb.originY - pad);
                const ow = Math.min(originalImageRef.current.width - ox, bb.width + pad * 2);
                const oh = Math.min(originalImageRef.current.height - oy, bb.height + pad * 2);
                
                if (x >= ox && x <= ox + ow && y >= oy && y <= oy + oh) {
                    setToggledFaces(prev => ({ ...prev, [i]: !prev[i] }));
                    return;
                }
            }
        }

        // 3. Start Drawing New Box
        if (isAddManualMode) {
            const newId = `manual-${Date.now()}`;
            setInteractionState({ type: 'draw', boxId: newId, startX: x, startY: y });
            setManualBlurBoxes(prev => [...prev, { id: newId, x, y, width: 0, height: 0 }]);
        }
    };

    const handleMouseMove = (e: any) => {
        if (!interactionState.type || !canvasRef.current || !originalImageRef.current) return;
        const { x, y } = getEventCoords(e);
        if (x === 0 && y === 0) return;

        setManualBlurBoxes(prev => prev.map(box => {
            if (box.id !== interactionState.boxId) return box;

            if (interactionState.type === 'draw') {
                return {
                    ...box,
                    width: x - interactionState.startX,
                    height: y - interactionState.startY
                };
            }

            if (interactionState.type === 'move' && interactionState.origBox) {
                return {
                    ...box,
                    x: interactionState.origBox.x + (x - interactionState.startX),
                    y: interactionState.origBox.y + (y - interactionState.startY)
                };
            }

            if (interactionState.type === 'resize' && interactionState.origBox) {
                return {
                    ...box,
                    width: Math.max(10, interactionState.origBox.width + (x - interactionState.startX)),
                    height: Math.max(10, interactionState.origBox.height + (y - interactionState.startY))
                };
            }

            return box;
        }));
    };

    const handleMouseUp = (e?: any) => {
        if (interactionState.type === 'draw') {
            const lastBox = manualBlurBoxes.find(b => b.id === interactionState.boxId);
            if (lastBox && (Math.abs(lastBox.width) < 5 || Math.abs(lastBox.height) < 5)) {
                setManualBlurBoxes(prev => prev.filter(b => b.id !== interactionState.boxId));
            } else if (lastBox) {
                // Normalize box coordinates (ensure positive width/height)
                setManualBlurBoxes(prev => prev.map(b => b.id === interactionState.boxId ? {
                    ...b,
                    x: b.width < 0 ? b.x + b.width : b.x,
                    y: b.height < 0 ? b.y + b.height : b.y,
                    width: Math.abs(b.width),
                    height: Math.abs(b.height)
                } : b));
            }
            setIsAddManualMode(false);
        }
        setInteractionState({ type: null, boxId: null, startX: 0, startY: 0 });
    };

    const handleBlurFaceDownload = async () => {
        if (!canvasRef.current || !originalImageRef.current) return;
        setStage('PROCESSING');
        try {
            await new Promise(res => setTimeout(res, 500));
            const finalCanvas = document.createElement('canvas');
            finalCanvas.width = originalImageRef.current.width;
            finalCanvas.height = originalImageRef.current.height;
            const finalCtx = finalCanvas.getContext('2d');
            if (!finalCtx) return;
            
            finalCtx.drawImage(originalImageRef.current, 0, 0);
            const blurValue = Math.max(1, sliderPos / 2.5);

            // Ensure we have a blurred version ready for the final draw
            let blurSource = blurredCanvasRef.current;
            if (!blurSource) {
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = originalImageRef.current.width;
                tempCanvas.height = originalImageRef.current.height;
                const tempCtx = tempCanvas.getContext('2d');
                if (tempCtx) {
                    tempCtx.filter = `blur(${blurValue}px)`;
                    tempCtx.drawImage(originalImageRef.current, 0, 0);
                    blurSource = tempCanvas;
                }
            }

            if (!blurSource) return;

            // 1. Draw Auto-detected Faces
            detectedFaces.forEach((det, i) => {
                if (toggledFaces[i]) {
                    const bb = det.boundingBox;
                    const pad = Math.floor(bb.width * 0.1);
                    const ox = Math.max(0, bb.originX - pad);
                    const oy = Math.max(0, bb.originY - pad);
                    const ow = Math.min(originalImageRef.current!.width - ox, bb.width + pad * 2);
                    const oh = Math.min(originalImageRef.current!.height - oy, bb.height + pad * 2);
                    
                    if (ow < 1 || oh < 1) return;

                    finalCtx.drawImage(blurSource!, ox, oy, ow, oh, ox, oy, ow, oh);
                }
            });

            // 2. Draw Manual Blur Boxes
            manualBlurBoxes.forEach(box => {
                if (Math.abs(box.width) < 1 || Math.abs(box.height) < 1) return;
                finalCtx.drawImage(blurSource!, box.x, box.y, box.width, box.height, box.x, box.y, box.width, box.height);
            });

            const blob = await new Promise<Blob | null>(res => finalCanvas.toBlob(res, 'image/jpeg', 0.95));
            if (blob) {
                const output = new Uint8Array(await blob.arrayBuffer());
                setResult(output);
                setStage('SUCCESS');
            }
        } catch (e: any) {
            console.error(e);
            alert(`Error saving blurred image: ${e.message || e}`);
            setStage('BLUR_FACE_WORKSHOP');
        }
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
        a.style.display = 'none';
        a.href = url; 
        a.download = name; 
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleProcess = useCallback(async (overrideFiles?: File[]) => {
        const filesToProcess = overrideFiles || selectedFiles;
        if (tool.id === 'merge-pdf' && filesToProcess.length < 2) {
            alert("Please select at least 2 files to merge.");
            return;
        }
        if (tool.id !== 'compress-image' && tool.id !== 'convert-to-webp') {
            setStage('PROCESSING');
            setDownloadProgress(0);
            setStatusMessage('Starting...');
        } else {
            setIsImageCompressing(true);
        }
        
        try {
            if (tool.id !== 'pdf-to-jpg' && tool.id !== 'background-remover') {
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
            
            let output: Uint8Array | null = null;
            const { processPDF } = await import('@/lib/tool-engine');

            if (tool.category === 'Image' || tool.id === 'jpg-to-png' || tool.id === 'png-to-jpg' || tool.id === 'upscale-image') {
                let targetWidth = undefined;
                let targetHeight = undefined;
                if (tool.id === 'resize-image') {
                    const wNum = Number(resizeWidth) || originalDimensions.w;
                    const hNum = Number(resizeHeight) || originalDimensions.h;
                    if (resizeUnit === 'px') {
                        targetWidth = wNum;
                        targetHeight = hNum;
                    } else if (resizeUnit === '%') {
                        targetWidth = Math.round(originalDimensions.w * (wNum / 100));
                        targetHeight = Math.round(originalDimensions.h * (hNum / 100));
                    } else if (resizeUnit === 'cm') {
                        targetWidth = Math.round(wNum * 37.795);
                        targetHeight = Math.round(hNum * 37.795);
                    }
                }

                output = await processPDF(tool.id, [filesToProcess[0]], { 
                    compressionLevel,
                    onProgress: (p: number, msg: string) => { setDownloadProgress(p); setStatusMessage(msg); },
                    upscaleScale,
                    quality: tool.id === 'compress-image' ? sliderPos / 100 : undefined,
                    width: targetWidth,
                    height: targetHeight,
                    outputFormat: tool.id === 'resize-image' ? resizeOutputFormat : undefined
                });
            } else {
                output = await processPDF(tool.id, filesToProcess, { 
                    compressionLevel,
                    method: splitMethod,
                    ranges: splitRanges,
                    onProgress: (pct: number, msg: string) => {
                        setDownloadProgress(pct);
                        setStatusMessage(msg);
                    }
                });
            }

            if (output) { 
                setResult(output); 
                if (tool.id === 'background-remover') {
                    setCompositeResult(URL.createObjectURL(new Blob([output as any], { type: 'image/png' })));
                }
                if (tool.id !== 'compress-image' && tool.id !== 'convert-to-webp') {
                    setStage('SUCCESS'); 
                } else {
                    setIsImageCompressing(false);
                }
            }
            else { throw new Error("Processing failed"); }
        } catch (error) {
            console.error(error); 
            if (tool.id !== 'compress-image' && tool.id !== 'convert-to-webp') setStage('INITIAL_UPLOAD'); 
            setIsImageCompressing(false);
            if (tool.id !== 'compress-image' && tool.id !== 'convert-to-webp') alert("Error processing file.");
        }
    }, [tool.id, selectedFiles, compressionLevel, splitMethod, splitRanges, sliderPos, upscaleScale]);

    // Live preview for image compression
    useEffect(() => {
        if ((tool.id === 'compress-image' || tool.id === 'convert-to-webp') && stage === 'IMAGE_COMPRESSION_CHOICE' && selectedFiles.length > 0) {
            const timeoutId = setTimeout(() => {
                handleProcess();
            }, 500); // 500ms debounce
            return () => clearTimeout(timeoutId);
        }
    }, [sliderPos, stage, selectedFiles, tool.id, handleProcess]);

    // Background Composition Effect
    useEffect(() => {
        if (tool.id === 'background-remover' && stage === 'SUCCESS' && result) {
            const compose = async () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                const cutOutImg = new Image();
                const cutOutUrl = URL.createObjectURL(new Blob([result as any], { type: 'image/png' }));
                await new Promise(res => { cutOutImg.onload = res; cutOutImg.src = cutOutUrl; });
                
                canvas.width = cutOutImg.width;
                canvas.height = cutOutImg.height;

                // 1. Draw Background
                if (bgType === 'color') {
                    ctx.fillStyle = bgColor;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                } else if (bgType === 'image' && bgImageFile) {
                    const bgImg = new Image();
                    const bgUrl = URL.createObjectURL(bgImageFile);
                    await new Promise(res => { bgImg.onload = res; bgImg.src = bgUrl; });
                    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height); // Simple stretch for now
                    URL.revokeObjectURL(bgUrl);
                }

                // 2. Draw Cut-out
                ctx.drawImage(cutOutImg, 0, 0);
                
                const finalUrl = canvas.toDataURL('image/png');
                setCompositeResult(finalUrl);
                URL.revokeObjectURL(cutOutUrl);
            };
            compose();
        }
    }, [bgType, bgColor, bgImageFile, result, stage, tool.id]);

    const handleDownload = () => {
        if (!result && !compositeResult) return;
        let mimeType = 'application/pdf';
        let ext = 'pdf';

        if (tool.id === 'pdf-to-jpg' || (tool.id === 'split-pdf' && splitMethod === 'all') || (tool.id === 'convert-to-webp' && selectedFiles.length > 1)) { 
            mimeType = 'application/zip'; 
            ext = 'zip'; 
        }
        else if (tool.id === 'pdf-to-word') { mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'; ext = 'docx'; }
        else if (tool.category === 'Image') {
            if (tool.id === 'background-remover' || tool.id === 'jpg-to-png') { mimeType = 'image/png'; }
            else if (tool.id === 'convert-to-webp') { mimeType = 'image/webp'; }
            else if (tool.id === 'resize-image') { mimeType = resizeOutputFormat; }
            else if (tool.id === 'crop-image') { mimeType = cropOutputFormat; }
            else if (tool.id === 'compress-image' && selectedFiles[0]) { mimeType = selectedFiles[0].type || 'image/jpeg'; }
            else { mimeType = 'image/jpeg'; }
            
            ext = mimeType.split('/')[1] || 'jpg';
            if (ext === 'jpeg') ext = 'jpg';
        }

        let blob: Blob;
        if (tool.id === 'background-remover' && compositeResult && bgType !== 'transparent') {
            // Convert data URL back to blob
            const base64Data = compositeResult.split(',')[1];
            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            blob = new Blob([byteArray], { type: 'image/png' });
        } else {
            blob = new Blob([result as any], { type: mimeType });
        }

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url; 
        
        const baseName = originalFileName || `toolomni-${tool.id}`;
        let filename = `${baseName}-${tool.id}-${Date.now()}.${ext}`;
        if (tool.id === 'split-pdf' && splitMethod === 'all') {
            filename = `toolomni-split-pages-${Date.now()}.zip`;
        }
        
        a.download = filename; 
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const startOver = () => {
        setSelectedFiles([]);
        setResult(null);
        setGeneratedImages([]);
        setTextInput('');
        setTextResult('');
        setUrlInput('');
        setStage('INITIAL_UPLOAD');
        // Reset background remover states
        setBgType('transparent');
        setBgColor('#ffffff');
        setBgImageFile(null);
        setCompositeResult(null);
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
                                <input type="file" ref={fileInputRef} className="hidden" accept={tool.id === 'word-to-pdf' ? '.doc,.docx' : (tool.category === 'Image' || tool.id === 'jpg-to-pdf') ? 'image/*' : 'application/pdf'} multiple={tool.id !== 'pdf-to-jpg' && tool.id !== 'split-pdf' && tool.id !== 'compress-pdf' && tool.id !== 'pdf-to-word' && tool.id !== 'word-to-pdf' && tool.category !== 'Image'} onChange={(e) => handleFileSelect(e, false)} />
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

                {/* STAGE: COMPRESSION CHOICE */}
                {stage === 'COMPRESSION_CHOICE' && (
                    <div className="w-full max-w-4xl mx-auto animate-fadeIn">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight">Compression Level</h2>
                            <p className="text-zinc-500 font-medium">Choose how much you want to shrink your PDF.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            {[
                                { id: 'low', title: 'Low', desc: 'Slight optimization, best quality.', icon: Sparkles },
                                { id: 'medium', title: 'Medium', desc: 'Recommended balance.', icon: Zap },
                                { id: 'high', title: 'High', desc: 'Maximum compression.', icon: RotateCcw }
                            ].map((level) => (
                                <div 
                                    key={level.id}
                                    onClick={() => setCompressionLevel(level.id as any)}
                                    className={cn(
                                        "p-8 rounded-3xl border-2 cursor-pointer transition-all flex flex-col items-center text-center",
                                        compressionLevel === level.id 
                                            ? "border-blue-500 bg-blue-50/30 dark:bg-blue-900/10 shadow-lg shadow-blue-500/5" 
                                            : "border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-200"
                                    )}
                                >
                                    <div className={cn(
                                        "w-14 h-14 rounded-2xl flex items-center justify-center mb-6",
                                        compressionLevel === level.id ? "bg-blue-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"
                                    )}>
                                        <level.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="font-bold text-xl text-zinc-900 dark:text-white mb-2">{level.title}</h3>
                                    <p className="text-sm text-zinc-500 font-medium leading-relaxed">{level.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 justify-center pt-8 border-t border-zinc-100 dark:border-zinc-800">
                            <button onClick={startOver} className="px-8 py-4 text-zinc-500 hover:text-zinc-900 dark:hover:text-white font-bold transition-colors">
                                Cancel
                            </button>
                            <button onClick={() => handleProcess()} className="px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3">
                                Compress PDF <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* STAGE: IMAGE COMPRESSION CHOICE */}
                {stage === 'IMAGE_COMPRESSION_CHOICE' && (
                    <div className="w-full max-w-4xl mx-auto animate-fadeIn">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight">{tool.id === 'convert-to-webp' ? 'Convert to WebP' : 'Image Compression'}</h2>
                            <p className="text-zinc-500 font-medium">{tool.id === 'convert-to-webp' ? 'Adjust the output quality to convert your images.' : 'Adjust the slider to balance quality and file size.'}</p>
                        </div>

                        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-blue-500/5 mb-10 text-center relative overflow-hidden">
                            {(isImageCompressing && !result) && (
                                <div className="absolute inset-0 z-20 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm flex items-center justify-center">
                                    <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                            <div className="mb-8 flex justify-center items-center h-[250px] bg-zinc-50 dark:bg-zinc-800 rounded-2xl border border-zinc-100 dark:border-zinc-700 relative overflow-hidden">
                                {result ? (
                                    <img src={URL.createObjectURL(new Blob([result as any], { type: 'image/jpeg' }))} alt="Compressed preview" className="max-w-full max-h-full object-contain" />
                                ) : (
                                    <img src={URL.createObjectURL(selectedFiles[0])} alt="Original preview" className="max-w-full max-h-full object-contain filter blur-sm grayscale opacity-50" />
                                )}
                            </div>

                            <div className="max-w-xl mx-auto mb-10">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-[10px] md:text-sm font-bold text-zinc-400">Smaller File</span>
                                    <span className="text-sm md:text-base font-black px-3 md:px-4 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg">{sliderPos}% Quality</span>
                                    <span className="text-[10px] md:text-sm font-bold text-zinc-400">Higher Quality</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="10" 
                                    max="100" 
                                    value={sliderPos} 
                                    onChange={(e) => setSliderPos(Number(e.target.value))}
                                    className="w-full h-3 bg-zinc-200 dark:bg-zinc-700 rounded-full appearance-none outline-none cursor-pointer accent-blue-600"
                                />
                            </div>

                            {result && (() => {
                                const originalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0); 
                                const compressedSize = result.length;
                                const reduction = Math.max(0, Math.round((1 - (compressedSize / originalSize)) * 100));
                                const formatSize = (bytes: number) => bytes < 1048576 ? (bytes / 1024).toFixed(1) + ' KB' : (bytes / 1048576).toFixed(2) + ' MB';
                                return (
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 bg-zinc-50 dark:bg-zinc-800 p-6 rounded-2xl border border-zinc-100 dark:border-zinc-700">
                                        <div className="text-center"><p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Original Size</p><p className="text-xl font-bold text-zinc-400 line-through decoration-zinc-300">{formatSize(originalSize)}</p></div>
                                        <div className="px-5 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center gap-2">
                                            <span className="text-lg font-black text-emerald-600">-{reduction}%</span>
                                        </div>
                                        <div className="text-center"><p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Compressed Size</p><p className="text-xl font-bold text-zinc-900 dark:text-white">{formatSize(compressedSize)}</p></div>
                                    </div>
                                );
                            })()}
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <button onClick={startOver} className="px-8 py-4 text-zinc-500 hover:text-zinc-900 dark:hover:text-white font-bold transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleDownload} disabled={!result || isImageCompressing} className="px-12 py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3">
                                {tool.id === 'convert-to-webp' ? (selectedFiles.length > 1 ? 'Download All as ZIP' : 'Download WebP') : 'Download Compressed Image'} <Download className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* STAGE: IMAGE RESIZE CHOICE */}
                {stage === 'IMAGE_RESIZE_CHOICE' && selectedFiles[0] && (
                    <div className="w-full max-w-5xl mx-auto animate-fadeIn">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight">Resize Image</h2>
                            <p className="text-zinc-500 font-medium">Set your dimensions to resize the image instantly.</p>
                        </div>
                        
                        <div className="flex flex-col lg:flex-row gap-8 mb-10">
                            <div className="flex-1 bg-zinc-50 dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-100 dark:border-zinc-800 shadow-sm flex items-center justify-center min-h-[300px]">
                                <img src={URL.createObjectURL(selectedFiles[0])} alt="Preview" className="max-w-full max-h-[400px] object-contain rounded-xl shadow-md" />
                            </div>
                            
                            <div className="w-full lg:w-96 flex flex-col gap-6">
                                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-xl">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold text-lg text-zinc-900 dark:text-white">Dimensions</h3>
                                        <div className="flex bg-zinc-100 dark:bg-zinc-800 rounded-lg p-1">
                                            {['px', '%', 'cm'].map(unit => (
                                                <button key={unit} onClick={() => setResizeUnit(unit as any)} className={cn("px-3 py-1 text-xs font-bold rounded-md transition-all", resizeUnit === unit ? "bg-white dark:bg-zinc-700 text-blue-600 shadow-sm" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300")}>
                                                    {unit.toUpperCase()}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-end gap-3 mb-6">
                                        <div className="flex-1">
                                            <label className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1 block">Width</label>
                                            <input type="number" value={resizeWidth} onChange={(e) => {
                                                const val = e.target.value; setResizeWidth(val);
                                                if (maintainAspectRatio && val !== '' && !isNaN(Number(val))) {
                                                    const ratio = originalDimensions.h / originalDimensions.w;
                                                    setResizeHeight(Math.round(Number(val) * ratio));
                                                }
                                            }} className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors" />
                                        </div>
                                        
                                        <button onClick={() => setMaintainAspectRatio(!maintainAspectRatio)} className={cn("w-12 h-12 flex items-center justify-center rounded-xl border transition-all shrink-0 mb-0.5", maintainAspectRatio ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600" : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:border-zinc-300")}>
                                            {maintainAspectRatio ? <Link className="w-5 h-5" /> : <Unlink className="w-5 h-5" />}
                                        </button>
                                        
                                        <div className="flex-1">
                                            <label className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1 block">Height</label>
                                            <input type="number" value={resizeHeight} onChange={(e) => {
                                                const val = e.target.value; setResizeHeight(val);
                                                if (maintainAspectRatio && val !== '' && !isNaN(Number(val))) {
                                                    const ratio = originalDimensions.w / originalDimensions.h;
                                                    setResizeWidth(Math.round(Number(val) * ratio));
                                                }
                                            }} className="w-full bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-zinc-900 dark:text-white font-bold outline-none focus:border-blue-500 transition-colors" />
                                        </div>
                                    </div>
                                    
                                    <div className="mb-6">
                                        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2 block">Quick Presets</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button onClick={() => { setResizeUnit('px'); setMaintainAspectRatio(false); setResizeWidth(1080); setResizeHeight(1080); }} className="text-xs font-bold px-3 py-2 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg text-zinc-600 dark:text-zinc-300 transition-colors text-left truncate">Instagram (1:1)</button>
                                            <button onClick={() => { setResizeUnit('px'); setMaintainAspectRatio(false); setResizeWidth(820); setResizeHeight(312); }} className="text-xs font-bold px-3 py-2 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg text-zinc-600 dark:text-zinc-300 transition-colors text-left truncate">FB Cover</button>
                                            <button onClick={() => { setResizeUnit('px'); setMaintainAspectRatio(false); setResizeWidth(1920); setResizeHeight(1080); }} className="text-xs font-bold px-3 py-2 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg text-zinc-600 dark:text-zinc-300 transition-colors text-left truncate">FHD 1080p</button>
                                            <button onClick={() => { setResizeUnit('cm'); setMaintainAspectRatio(false); setResizeWidth(3.5); setResizeHeight(4.5); }} className="text-xs font-bold px-3 py-2 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg text-zinc-600 dark:text-zinc-300 transition-colors text-left truncate">Passport (cm)</button>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2 block">Output Format</label>
                                        <div className="flex gap-2">
                                            {[{id: 'image/jpeg', name: 'JPG'}, {id: 'image/png', name: 'PNG'}, {id: 'image/webp', name: 'WebP'}].map(fmt => (
                                                <button key={fmt.id} onClick={() => setResizeOutputFormat(fmt.id)} className={cn("flex-1 py-2 rounded-lg text-xs font-bold transition-all border", resizeOutputFormat === fmt.id ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600" : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:border-zinc-300")}>{fmt.name}</button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                
                                <button onClick={() => handleProcess()} className="w-full py-5 md:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3">
                                    Resize and Download <Download className="w-5 h-5" />
                                </button>
                                <button onClick={startOver} className="w-full py-3 text-zinc-500 hover:text-zinc-900 dark:hover:text-white font-bold transition-colors">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* STAGE: IMAGE CROP CHOICE */}
                {stage === 'IMAGE_CROP_CHOICE' && selectedFiles[0] && (
                    <div className="w-full max-w-6xl mx-auto animate-fadeIn">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight">Crop Image</h2>
                            <p className="text-zinc-500 font-medium">Drag the handles to perfectly frame your photo.</p>
                        </div>
                        
                        <div className="flex flex-col lg:flex-row gap-8 mb-10">
                            <div className="flex-1 bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm relative min-h-[500px] flex items-center justify-center">
                                <Cropper
                                    src={cropImageSrc}
                                    style={{ height: '100%', width: '100%', maxHeight: '600px' }}
                                    initialAspectRatio={NaN}
                                    aspectRatio={activeCropRatio}
                                    guides={true}
                                    ref={cropperRef}
                                    viewMode={1}
                                    dragMode="crop"
                                    background={false}
                                    responsive={true}
                                    autoCropArea={1}
                                />
                            </div>
                            
                            <div className="w-full lg:w-96 flex flex-col gap-6">
                                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-xl">
                                    
                                    <div className="mb-6">
                                        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2 block">Aspect Ratio</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {[
                                                { label: 'Freeform', value: NaN },
                                                { label: 'Square (1:1)', value: 1 },
                                                { label: '16:9', value: 16/9 },
                                                { label: '4:3', value: 4/3 },
                                                { label: 'YouTube Banner', value: 2560/1440 },
                                                { label: 'FB Cover', value: 820/312 }
                                            ].map(ratio => (
                                                <button key={ratio.label} onClick={() => { setActiveCropRatio(ratio.value); cropperRef.current?.cropper.setAspectRatio(ratio.value); }} className={cn("py-2 px-2 text-xs font-bold rounded-lg transition-all border", (isNaN(ratio.value) ? isNaN(activeCropRatio as number) : activeCropRatio === ratio.value) ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600" : "bg-zinc-50 dark:bg-zinc-800 border-transparent text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-700")}>
                                                    {ratio.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="mb-6">
                                        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2 block">Transform</label>
                                        <div className="grid grid-cols-4 gap-2">
                                            <button onClick={() => cropperRef.current?.cropper.rotate(-90)} className="flex items-center justify-center p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors text-zinc-600 dark:text-zinc-300" title="Rotate Left">
                                                <RotateCcw className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => cropperRef.current?.cropper.rotate(90)} className="flex items-center justify-center p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors text-zinc-600 dark:text-zinc-300" title="Rotate Right">
                                                <RotateCw className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => { const c = cropperRef.current?.cropper; const d = c?.getData(); c?.scaleX(d?.scaleX === -1 ? 1 : -1); }} className="flex items-center justify-center p-3 bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors" title="Flip Horizontal">
                                                <FlipHorizontal className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => { const c = cropperRef.current?.cropper; const d = c?.getData(); c?.scaleY(d?.scaleY === -1 ? 1 : -1); }} className="flex items-center justify-center p-3 bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors" title="Flip Vertical">
                                                <FlipVertical className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2 block">Output Format</label>
                                        <div className="flex gap-2">
                                            {[{id: 'image/jpeg', name: 'JPG'}, {id: 'image/png', name: 'PNG'}, {id: 'image/webp', name: 'WebP'}].map(fmt => (
                                                <button key={fmt.id} onClick={() => setCropOutputFormat(fmt.id)} className={cn("flex-1 py-2 rounded-lg text-xs font-bold transition-all border", cropOutputFormat === fmt.id ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600" : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:border-zinc-300")}>{fmt.name}</button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                
                                <button onClick={() => {
                                    if (!cropperRef.current || !cropperRef.current.cropper) return;
                                    const canvas = cropperRef.current.cropper.getCroppedCanvas({
                                        imageSmoothingEnabled: true,
                                        imageSmoothingQuality: 'high',
                                    });
                                    if (canvas) {
                                        setStage('PROCESSING');
                                        setDownloadProgress(0);
                                        setStatusMessage('Extracting your crop...');
                                        canvas.toBlob((blob) => {
                                            if (blob) {
                                                blob.arrayBuffer().then(buffer => {
                                                    setResult(new Uint8Array(buffer));
                                                    setStage('SUCCESS');
                                                });
                                            }
                                        }, cropOutputFormat, 0.92);
                                    }
                                }} className="w-full py-5 md:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3">
                                    Crop and Download <Crop className="w-5 h-5" />
                                </button>
                                <button onClick={startOver} className="w-full py-3 text-zinc-500 hover:text-zinc-900 dark:hover:text-white font-bold transition-colors">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* STAGE: BLUR FACE WORKSHOP */}
                {stage === 'BLUR_FACE_WORKSHOP' && selectedFiles[0] && (
                    <div className="w-full max-w-6xl mx-auto animate-fadeIn">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight">Blur Faces</h2>
                            <p className="text-zinc-500 font-medium">Auto-detected faces are blurred. Adjust intensity and click faces to toggle.</p>
                        </div>
                        
                        <div className="flex flex-col lg:flex-row gap-8 mb-10">
                            <div className="flex-1 bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm relative min-h-[500px] flex items-center justify-center p-4">
                                {isDetectingFaces && (
                                    <div className="absolute inset-0 z-20 bg-zinc-900/80 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                                        <p className="font-bold">Loading local AI models...</p>
                                        <p className="text-xs text-zinc-400 mt-2">100% processing in browser.</p>
                                    </div>
                                )}
                                <canvas 
                                    ref={canvasRef} 
                                    onMouseDown={handleMouseDown}
                                    onMouseMove={handleMouseMove}
                                    onMouseUp={handleMouseUp}
                                    onMouseLeave={handleMouseUp}
                                    onTouchStart={handleMouseDown}
                                    onTouchMove={handleMouseMove}
                                    onTouchEnd={handleMouseUp}
                                    className={cn(
                                        "max-w-full max-h-[600px] object-contain rounded-xl shadow-md transition-all",
                                        isAddManualMode ? "cursor-crosshair" : "cursor-pointer"
                                    )}
                                />
                            </div>
                            
                            <div className="w-full lg:w-96 flex flex-col gap-6">
                                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-xl">
                                    <div className="mb-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-center border border-blue-100 dark:border-blue-800/50">
                                        <h3 className="text-3xl font-black text-blue-600 mb-1">{detectedFaces.length + manualBlurBoxes.length}</h3>
                                        <p className="text-sm font-bold text-zinc-600 dark:text-zinc-300">Total Blur Areas</p>
                                    </div>

                                    <button 
                                        onClick={() => setIsAddManualMode(!isAddManualMode)}
                                        className={cn(
                                            "w-full py-3 mb-6 rounded-xl font-bold transition-all flex items-center justify-center gap-2 border-2",
                                            isAddManualMode 
                                                ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20" 
                                                : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-blue-500"
                                        )}
                                    >
                                        <Plus className="w-5 h-5" /> {isAddManualMode ? 'Click & Drag on Image' : 'Add Manual Blur Area'}
                                    </button>

                                    <div className="mb-8">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-sm font-bold text-zinc-400">Blur Intensity</span>
                                            <span className="text-base font-black px-4 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg">{sliderPos}%</span>
                                        </div>
                                        <input 
                                            type="range" 
                                            min="0" 
                                            max="100" 
                                            value={sliderPos} 
                                            onChange={(e) => setSliderPos(Number(e.target.value))}
                                            className="w-full h-3 bg-zinc-200 dark:bg-zinc-700 rounded-full appearance-none outline-none cursor-pointer accent-blue-600"
                                        />
                                    </div>
                                    
                                    <div className="mb-6 space-y-3">
                                        <div className="flex items-center gap-3 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-100 dark:border-zinc-700">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-black shrink-0 text-xs">AI</div>
                                            <p className="text-[11px] text-zinc-600 dark:text-zinc-300 font-medium">Click on any blue outlined box on the image to toggle auto-detected faces.</p>
                                        </div>
                                        <div className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-900/30">
                                            <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 font-black shrink-0 text-xs">TIP</div>
                                            <p className="text-[11px] text-zinc-600 dark:text-zinc-300 font-medium italic">Can't see a face? Use "Add Manual Blur Area" to draw your own blur box anywhere!</p>
                                        </div>
                                    </div>
                                    
                                    <button onClick={handleBlurFaceDownload} disabled={isDetectingFaces} className="w-full py-5 md:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3">
                                        Download Image <Download className="w-5 h-5" />
                                    </button>
                                    <button onClick={startOver} className="w-full mt-3 py-3 text-zinc-500 hover:text-zinc-900 dark:hover:text-white font-bold transition-colors">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* STAGE: UPSCALE CHOICE */}
                {stage === 'UPSCALE_CHOICE' && (
                    <div className="w-full max-w-4xl mx-auto animate-fadeIn">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight">Upscale Resolution</h2>
                            <p className="text-zinc-500 font-medium">Select the enhancement level for your image.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
                            {[
                                { id: 2, title: '2x Upscale', desc: 'Double the resolution. Fast & High Quality.', icon: Sparkles },
                                { id: 4, title: '4x Upscale', desc: 'Maximum resolution. Best for printing.', icon: Zap }
                            ].map((level) => (
                                <div 
                                    key={level.id}
                                    onClick={() => setUpscaleScale(level.id as 2 | 4)}
                                    className={cn(
                                        "p-8 rounded-3xl border-2 cursor-pointer transition-all flex flex-col items-center text-center",
                                        upscaleScale === level.id 
                                            ? "border-blue-500 bg-blue-50/30 dark:bg-blue-900/10 shadow-lg shadow-blue-500/5" 
                                            : "border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-200"
                                    )}
                                >
                                    <div className={cn(
                                        "w-14 h-14 rounded-2xl flex items-center justify-center mb-6",
                                        upscaleScale === level.id ? "bg-blue-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"
                                    )}>
                                        <level.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="font-bold text-xl text-zinc-900 dark:text-white mb-2">{level.title}</h3>
                                    <p className="text-sm text-zinc-500 font-medium leading-relaxed">{level.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 justify-center pt-8 border-t border-zinc-100 dark:border-zinc-800">
                            <button onClick={startOver} className="px-8 py-5 md:py-4 text-zinc-500 hover:text-zinc-900 dark:hover:text-white font-bold transition-colors">
                                Cancel
                            </button>
                            <button onClick={() => handleProcess()} className="px-12 py-5 md:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3">
                                Enhance Image <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}


                {/* STAGE: SPLIT OPTIONS */}
                {stage === 'SPLIT_OPTIONS' && (
                    <div className="w-full max-w-4xl mx-auto animate-fadeIn">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight">Split Options</h2>
                            <p className="text-zinc-500 font-medium">Choose how you want to separate your PDF pages.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                            <div 
                                onClick={() => setSplitMethod('ranges')}
                                className={cn(
                                    "p-8 rounded-3xl border-2 cursor-pointer transition-all",
                                    splitMethod === 'ranges' 
                                        ? "border-blue-500 bg-blue-50/30 dark:bg-blue-900/10 shadow-lg shadow-blue-500/5" 
                                        : "border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-200"
                                )}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", splitMethod === 'ranges' ? "bg-blue-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400")}>
                                        <FileText className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bold text-lg text-zinc-900 dark:text-white">Extract Ranges</h3>
                                        <p className="text-sm text-zinc-400">Specify custom page ranges</p>
                                    </div>
                                </div>
                                {splitMethod === 'ranges' && (
                                    <input 
                                        type="text" 
                                        value={splitRanges} 
                                        onChange={(e) => setSplitRanges(e.target.value)}
                                        placeholder="e.g. 1-5, 8, 11-14"
                                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-blue-200 dark:border-blue-800/50 text-zinc-900 dark:text-white outline-none focus:ring-4 focus:ring-blue-500/10 transition-all font-mono text-sm"
                                    />
                                )}
                            </div>

                            <div 
                                onClick={() => setSplitMethod('all')}
                                className={cn(
                                    "p-8 rounded-3xl border-2 cursor-pointer transition-all",
                                    splitMethod === 'all' 
                                        ? "border-blue-500 bg-blue-50/30 dark:bg-blue-900/10 shadow-lg shadow-blue-500/5" 
                                        : "border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-200"
                                )}
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", splitMethod === 'all' ? "bg-blue-600 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400")}>
                                        <Copy className="w-6 h-6" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bold text-lg text-zinc-900 dark:text-white">Split Every Page</h3>
                                        <p className="text-sm text-zinc-400">Save each page as a separate PDF</p>
                                    </div>
                                </div>
                                <p className="text-sm text-zinc-400 mt-2">Perfect for large documents that need full separation.</p>
                            </div>
                        </div>

                        {pageThumbnails.length > 0 && (
                            <div className="mb-10">
                                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4 ml-1">Page Previews</h3>
                                <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
                                    {pageThumbnails.map((thumb, idx) => (
                                        <div key={idx} className="flex-shrink-0 group relative">
                                            <div className="w-28 h-40 bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-sm group-hover:border-blue-500/50 transition-all">
                                                <img src={thumb} alt={`Page ${idx + 1}`} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="absolute top-2 left-2 px-2 py-0.5 bg-zinc-900/60 backdrop-blur-md rounded text-[10px] font-bold text-white">
                                                Page {idx + 1}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex flex-col md:flex-row gap-4 justify-center pt-6 border-t border-zinc-100 dark:border-zinc-800">
                            <button onClick={startOver} className="px-8 py-4 text-zinc-500 hover:text-zinc-900 dark:hover:text-white font-bold transition-colors">
                                Cancel
                            </button>
                            <button onClick={() => handleProcess()} className="px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3">
                                Split PDF <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* STAGE: PROCESSING */}
                {stage === 'PROCESSING' && (
                    <div className="w-full max-w-lg mx-auto text-center py-20 animate-fadeIn">
                        <div className="relative w-24 h-24 mx-auto mb-10">
                            <div className="absolute inset-0 border-4 border-zinc-100 dark:border-zinc-800 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Icon className="w-8 h-8 text-blue-600 animate-pulse" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-2 tracking-tight">
                            {downloadProgress > 0 && downloadProgress < 100 ? `Downloading AI Engine: ${downloadProgress}%` : 'Processing...'}
                        </h2>
                        <p className="text-zinc-500 font-medium mb-8 leading-relaxed">
                            {statusMessage || 'Please wait while we work our magic.'}
                        </p>
                        
                        {downloadProgress > 0 && downloadProgress < 100 && (
                            <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden mb-4">
                                <motion.div 
                                    className="bg-blue-600 h-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${downloadProgress}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        )}
                        <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">100% Private Browser-Side ML</p>
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
                                <div className="mb-10 relative group max-w-lg mx-auto">
                                    <div className="bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-2xl relative p-8">
                                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'conic-gradient(#ccc 0.25turn, #fff 0.25turn 0.5turn, #ccc 0.5turn 0.75turn, #fff 0.75turn)', backgroundSize: '20px 20px' }} />
                                        {tool.id === 'upscale-image' ? (
                                            <div 
                                                className="relative z-10 w-full h-full min-h-[300px] flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden group/compare cursor-ew-resize select-none touch-none"
                                                onMouseMove={handleSliderMove}
                                                onTouchMove={handleSliderMove}
                                                onMouseDown={handleSliderMove}
                                            >
                                                <div className="absolute inset-0 flex pointer-events-none">
                                                    {/* Original Image (Before) - Pixelated to show the contrast of upscaling */}
                                                    <img src={URL.createObjectURL(selectedFiles[0])} className="w-full h-full object-contain" style={{ imageRendering: 'pixelated' }} alt="Original" />
                                                    
                                                    {/* Upscaled Image (After) */}
                                                    <div className="absolute inset-0 z-20 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}>
                                                        <img src={compositeResult || (result ? URL.createObjectURL(new Blob([result as any], { type: 'image/png' })) : '')} className="w-full h-full object-contain" alt="Upscaled" />
                                                    </div>
                                                </div>
                                                
                                                {/* Interactive Slider Line */}
                                                <div 
                                                    className="absolute top-0 bottom-0 z-30 w-0.5 bg-white shadow-xl pointer-events-none"
                                                    style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
                                                >
                                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-[0_0_15px_rgba(0,0,0,0.3)] flex items-center justify-center border-4 border-blue-600">
                                                        <div className="flex gap-0.5">
                                                            <div className="w-0.5 h-3 bg-blue-600 rounded-full" />
                                                            <div className="w-0.5 h-3 bg-blue-600 rounded-full" />
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="absolute bottom-4 left-4 z-40 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest pointer-events-none">Before</div>
                                                <div className="absolute bottom-4 right-4 z-40 px-3 py-1 bg-blue-600/80 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest pointer-events-none">After</div>
                                            </div>
                                        ) : (
                                            <img src={tiktokData?.cover || compositeResult || (result ? URL.createObjectURL(new Blob([result as any], { type: 'image/png' })) : '')} className="relative z-10 w-full h-auto max-h-[400px] object-contain mx-auto rounded-xl" alt="Result" />
                                        )}
                                    </div>
                                    
                                    {tool.id === 'background-remover' && (
                                        <div className="mt-8 p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 text-left">
                                            <div className="flex items-center gap-2 mb-4">
                                                <RefreshCw className="w-4 h-4 text-blue-600" />
                                                <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Edit Background</h3>
                                            </div>
                                            
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                <button onClick={() => setBgType('transparent')} className={cn("px-4 py-2 rounded-lg text-xs font-bold transition-all", bgType === 'transparent' ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-white dark:bg-zinc-800 text-zinc-500 border border-zinc-100 dark:border-zinc-700 hover:border-blue-500")}>Transparent</button>
                                                <button onClick={() => setBgType('color')} className={cn("px-4 py-2 rounded-lg text-xs font-bold transition-all", bgType === 'color' ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-white dark:bg-zinc-800 text-zinc-500 border border-zinc-100 dark:border-zinc-700 hover:border-blue-500")}>Solid Color</button>
                                                <button onClick={() => setBgType('image')} className={cn("px-4 py-2 rounded-lg text-xs font-bold transition-all", bgType === 'image' ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "bg-white dark:bg-zinc-800 text-zinc-500 border border-zinc-100 dark:border-zinc-700 hover:border-blue-500")}>Add Image</button>
                                            </div>

                                            {bgType === 'color' && (
                                                <div className="flex items-center gap-4 animate-fadeIn">
                                                    <input 
                                                        type="color" 
                                                        value={bgColor} 
                                                        onChange={(e) => setBgColor(e.target.value)} 
                                                        className="w-10 h-10 rounded-xl cursor-pointer border-2 border-white dark:border-zinc-700 shadow-sm" 
                                                    />
                                                    <div className="flex-wrap flex gap-2">
                                                        {['#ffffff', '#f3f4f6', '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#000000'].map(c => (
                                                            <button 
                                                                key={c} 
                                                                onClick={() => setBgColor(c)} 
                                                                className={cn(
                                                                    "w-7 h-7 rounded-full border-2 transition-transform hover:scale-110", 
                                                                    bgColor === c ? "border-blue-500 scale-110 shadow-md" : "border-white dark:border-zinc-700"
                                                                )} 
                                                                style={{ backgroundColor: c }} 
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {bgType === 'image' && (
                                                <div className="animate-fadeIn">
                                                    <button onClick={() => bgImageInputRef.current?.click()} className="w-full py-3 border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-xl text-zinc-500 text-xs font-bold hover:border-blue-500 transition-all flex items-center justify-center gap-2">
                                                        {bgImageFile ? <span className="text-blue-600 truncate px-4">{bgImageFile.name}</span> : <><FilePlus className="w-4 h-4" /> Upload Background Image</>}
                                                    </button>
                                                    <input type="file" ref={bgImageInputRef} className="hidden" accept="image/*" onChange={(e) => { if(e.target.files?.[0]) setBgImageFile(e.target.files[0]); }} />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {(tool.id === 'compress-pdf') && result && selectedFiles[0] && (() => {
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

                {/* STAGE: FILE REVIEW (Merge / JPG to PDF) */}
                {stage === 'FILE_REVIEW' && (
                    <div className="w-full max-w-4xl py-6 animate-fadeIn text-center">
                        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">Arrange Files</h2>
                        <p className="text-base text-zinc-500 mb-10 font-medium">Reorder or add more files before processing.</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-12">
                            {selectedFiles.map((f, i) => (
                                <div key={i} className="relative aspect-[3/4] bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 p-4 flex flex-col items-center justify-center group shadow-sm hover:border-blue-500 transition-all">
                                    <button onClick={() => removeFile(i)} className="absolute -top-2 -right-2 w-7 h-7 bg-white text-red-500 rounded-full shadow-md border border-red-50 flex items-center justify-center hover:bg-red-50 transition-all z-10"><X className="w-4 h-4" /></button>
                                    
                                    <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                        <button onClick={() => moveFileUp(i)} disabled={i === 0} className="w-6 h-6 bg-white dark:bg-zinc-800 rounded shadow border border-zinc-100 dark:border-zinc-700 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/20 disabled:opacity-30"><ChevronUp className="w-4 h-4" /></button>
                                        <button onClick={() => moveFileDown(i)} disabled={i === selectedFiles.length - 1} className="w-6 h-6 bg-white dark:bg-zinc-800 rounded shadow border border-zinc-100 dark:border-zinc-700 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/20 disabled:opacity-30"><ChevronDown className="w-4 h-4" /></button>
                                    </div>

                                    <div className="w-full h-full rounded-xl overflow-hidden mb-2 flex items-center justify-center bg-zinc-50 dark:bg-zinc-800">
                                        {f.type.startsWith('image/') ? (
                                            <img src={URL.createObjectURL(f)} alt={f.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="font-bold text-zinc-300 italic">PDF</div>
                                        )}
                                    </div>
                                    <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 line-clamp-1 truncate w-full px-2">{f.name}</p>
                                </div>
                            ))}
                            <div onClick={() => addMoreInputRef.current?.click()} className="aspect-[3/4] border-2 border-dashed border-zinc-100 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 group transition-all">
                                <FilePlus className="w-8 h-8 text-zinc-300 group-hover:text-blue-500 transition-colors" />
                                <span className="text-[10px] font-black text-zinc-400 mt-2 uppercase tracking-widest">Add Files</span>
                                <input type="file" ref={addMoreInputRef} className="hidden" accept={tool.id === 'word-to-pdf' ? '.doc,.docx' : (tool.category === 'Image' || tool.id === 'jpg-to-pdf') ? 'image/*' : 'application/pdf'} multiple onChange={(e) => handleFileSelect(e, true)} />
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

                {!hideFaq && tool.faqs && (
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
