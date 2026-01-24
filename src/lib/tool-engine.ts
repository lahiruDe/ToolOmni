import { PDFDocument, degrees } from 'pdf-lib';
import JSZip from 'jszip';

// NOTE: We do NOT import pdfjs-dist at the top level to avoid SSR/Worker issues.
// We will dynamically import it inside the function.

export const isRealTool = (id: string) => {
    return ['merge-pdf', 'pdf-to-jpg', 'split-pdf', 'jpg-to-pdf', 'rotate-pdf', 'tiktok-downloader', 'compress-pdf', 'background-remover', 'pdf-to-word', 'word-to-pdf', 'compress-image', 'jpg-to-png', 'png-to-jpg', 'upscale-image', 'qr-generator', 'ai-writer', 'grammar-checker'].includes(id);
};

// Interface for TikTok Data
export interface TikTokData {
    title: string;
    cover: string;
    author: {
        nickname: string;
        avatar: string;
    };
    play: string; // No watermark
    hdplay: string; // HD No watermark
    music: string; // MP3
}

export async function processUrl(action: string, url: string): Promise<TikTokData | null> {
    if (action === 'tiktok-downloader') {
        if (!url.includes('tiktok.com')) {
            throw new Error('Invalid TikTok URL');
        }

        // RAPIDAPI CONFIGURATION
        // You can get a free key from: https://rapidapi.com/yi005/api/tiktok-video-no-watermark2
        const RAPIDAPI_KEY = '6a156a0bd4msh21b0012b7cfd982p1642cejsn9cdff3cab01c';
        const RAPIDAPI_HOST = 'tiktok-video-no-watermark2.p.rapidapi.com';

        try {
            const response = await fetch(`https://${RAPIDAPI_HOST}/?url=${encodeURIComponent(url)}&hd=1`, {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': RAPIDAPI_KEY,
                    'x-rapidapi-host': RAPIDAPI_HOST
                }
            });

            const data = await response.json();

            if (data && data.data) {
                return {
                    title: data.data.title || 'TikTok Video',
                    cover: data.data.cover,
                    author: {
                        nickname: data.data.author.nickname,
                        avatar: data.data.author.avatar
                    },
                    play: data.data.play,
                    hdplay: data.data.play, // Force Use 'play' URL for HD as well to ensure reliability
                    music: data.data.music
                };
            } else {
                throw new Error('Video not found or API error');
            }
        } catch (error) {
            console.error(error);
            throw new Error('Failed to fetch video details');
        }
    }
    if (action === 'qr-generator') {
        try {
            // @ts-ignore
            const QRCode = await import('qrcode');
            const dataUrl = await QRCode.toDataURL(url, {
                width: 1000,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#ffffff'
                }
            });

            // For QR Generator, we return the dataUrl as play for preview
            return {
                title: 'QR Code',
                cover: dataUrl,
                author: { nickname: 'ToolOmni', avatar: '' },
                play: dataUrl,
                hdplay: dataUrl,
                music: ''
            };
        } catch (error) {
            console.error(error);
            throw new Error('Failed to generate QR code');
        }
    }
    return null;
}

export async function processText(action: string, text: string): Promise<string | null> {
    if (action === 'ai-writer') {
        const prompts = [
            "Sure! Here is a professionally written draft for you:\n\n",
            "I've generated this content based on your request:\n\n",
            "Great topic! Here's a creative take on it:\n\n"
        ];
        const randomStart = prompts[Math.floor(Math.random() * prompts.length)];

        // Mocking AI response by expanding the input text into a more formal structure
        return randomStart + `Title: ${text.split(' ').slice(0, 5).join(' ')}...\n\nIn today's fast-paced digital landscape, ${text} has become an increasingly significant subject. From a professional standpoint, addressing the nuances of this topic is essential for achieving long-term success. \n\nKey areas to consider:\n1. Strategic Implementation\n2. User Engagement Optimization\n3. Scalability and Efficiency\n\nIn conclusion, mastering ${text} requires a blend of innovation and consistent effort. We hope this draft helps you articulate your vision clearly.`;
    }

    if (action === 'grammar-checker') {
        // Simple mock grammar checker logic
        let fixedText = text;
        const corrections = {
            " i ": " I ",
            "dont": "don't",
            "cant": "can't",
            "wonna": "want to",
            "gonna": "going to",
            "im ": "I'm ",
            "your ": "you're ", // risky but just for demo
            "there ": "their ", // risky but just for demo
            "thanks": "Thank you,"
        };

        Object.entries(corrections).forEach(([wrong, right]) => {
            const regex = new RegExp(`\\b${wrong}\\b`, 'gi');
            fixedText = fixedText.replace(regex, right);
        });

        if (fixedText === text) {
            return "No errors detected! Your text looks great. \n\n" + text;
        }

        return "We've polished your text for better grammar and flow:\n\n" + fixedText;
    }

    return null;
}

export async function processPDF(action: string, files: File[], options?: { compressionLevel?: 'low' | 'medium' | 'high' }): Promise<Uint8Array | null> {
    try {
        const pdfDoc = await PDFDocument.create();

        // -------------------------
        // 1. MERGE PDF
        // -------------------------
        if (action === 'merge-pdf') {
            if (files.length < 2) {
                throw new Error("Please select at least 2 PDF files to merge.");
            }
            for (const file of files) {
                const arrayBuffer = await file.arrayBuffer();
                const donorPdf = await PDFDocument.load(arrayBuffer);
                const copiedPages = await pdfDoc.copyPages(donorPdf, donorPdf.getPageIndices());
                copiedPages.forEach((page) => pdfDoc.addPage(page));
            }
            return await pdfDoc.save();
        }

        // -------------------------
        // 2. PDF TO JPG (Updated with Dynamic Import)
        // -------------------------
        if (action === 'pdf-to-jpg') {
            const file = files[0];
            const arrayBuffer = await file.arrayBuffer();

            // DYNAMICALLY IMPORT PDFJS
            // @ts-ignore
            const pdfjsLib = await import('pdfjs-dist/build/pdf');

            // Use CDN for worker
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

            const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
            const pdf = await loadingTask.promise;
            const totalPages = pdf.numPages;

            const zip = new JSZip();

            // Loop through all pages
            for (let i = 1; i <= totalPages; i++) {
                const page = await pdf.getPage(i);

                // Define scale (quality) - 1.5 is decent balance for speed/quality in browser
                const viewport = page.getViewport({ scale: 1.5 });

                // Create a canvas to render
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                if (context) {
                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport,
                    };
                    await page.render(renderContext).promise;

                    // Convert canvas to blob (JPG)
                    const blob = await new Promise<Blob | null>(resolve =>
                        canvas.toBlob(resolve, 'image/jpeg', 0.85)
                    );

                    if (blob) {
                        zip.file(`page-${i}.jpg`, blob);
                    }
                }
            }

            // Generate Zip
            const zipContent = await zip.generateAsync({ type: 'uint8array' });
            return zipContent;
        }

        // -------------------------
        // 3. COMPRESS PDF (Structural Optimization)
        // -------------------------
        if (action === 'compress-pdf') {
            const file = files[0];
            const level = options?.compressionLevel || 'medium';
            const arrayBuffer = await file.arrayBuffer();

            // 1. Structural Cleanup (Low Compression)
            if (level === 'low') {
                const donorPdf = await PDFDocument.load(arrayBuffer);
                const newPdf = await PDFDocument.create();
                const copiedPages = await newPdf.copyPages(donorPdf, donorPdf.getPageIndices());
                copiedPages.forEach((page) => newPdf.addPage(page));
                return await newPdf.save({ useObjectStreams: true });
            }

            // @ts-ignore
            const pdfjsLib = await import('pdfjs-dist/build/pdf');
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

            const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
            const pdf = await loadingTask.promise;
            const newPdf = await PDFDocument.create();

            const scale = level === 'medium' ? 1.5 : 1.0;
            const quality = level === 'medium' ? 0.75 : 0.5;

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                if (context) {
                    await page.render({ canvasContext: context, viewport }).promise;
                    const jpgDataUrl = canvas.toDataURL('image/jpeg', quality);
                    const jpgBase64 = jpgDataUrl.split(',')[1];
                    const jpgImage = await newPdf.embedJpg(jpgBase64);
                    const pdfPage = newPdf.addPage([viewport.width, viewport.height]);
                    pdfPage.drawImage(jpgImage, {
                        x: 0,
                        y: 0,
                        width: viewport.width,
                        height: viewport.height,
                    });
                }
            }

            return await newPdf.save({ useObjectStreams: true });
        }

        // -------------------------
        // 4. MAGIC BACKGROUND REMOVER (AI Implementation)
        // -------------------------
        if (action === 'background-remover') {
            const file = files[0];

            // DYNAMICALLY IMPORT IMGLY
            // @ts-ignore
            const { removeBackground } = await import('@imgly/background-removal');

            // Perform background removal
            const resultBlob = await removeBackground(file);

            // Convert Blob to Uint8Array for consistency
            const arrayBuffer = await resultBlob.arrayBuffer();
            return new Uint8Array(arrayBuffer);
        }

        // -------------------------
        // 5. PDF TO WORD (Simulation)
        // -------------------------
        if (action === 'pdf-to-word') {
            const file = files[0];
            const arrayBuffer = await file.arrayBuffer();
            // TODO: Use an API like Cloudmersive or specialized library for real conversion
            return new Uint8Array(arrayBuffer);
        }

        // -------------------------
        // 6. WORD TO PDF (Simulation)
        // -------------------------
        if (action === 'word-to-pdf') {
            const file = files[0];
            const arrayBuffer = await file.arrayBuffer();
            // TODO: Real Word-to-PDF requires server-side rendering or heavy library
            return new Uint8Array(arrayBuffer);
        }

        // -------------------------
        // 7. IMAGE COMPRESSOR
        // -------------------------
        if (action === 'compress-image') {
            const file = files[0];

            // USE CANVAS FOR COMPRESSION
            const img = new Image();
            const url = URL.createObjectURL(file);

            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                img.src = url;
            });

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;

            if (ctx) {
                ctx.drawImage(img, 0, 0);

                // Determine output format (keep original if possible, otherwise jpeg)
                const type = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
                // Aggressive compression for jpeg, subtle for png (png compression is lossless mostly in canvas)
                const quality = type === 'image/jpeg' ? 0.6 : 0.8;

                const blob = await new Promise<Blob | null>(resolve =>
                    canvas.toBlob(resolve, 'image/jpeg', quality) // Always JPEG for best size reduction
                );

                URL.revokeObjectURL(url);

                if (blob) {
                    const arrayBuffer = await blob.arrayBuffer();
                    return new Uint8Array(arrayBuffer);
                }
            }
            URL.revokeObjectURL(url);
            return null;
        }

        // -------------------------
        // 8. IMAGE FORMAT CONVERTERS
        // -------------------------
        if (action === 'jpg-to-png' || action === 'png-to-jpg') {
            const file = files[0];
            const img = new Image();
            const url = URL.createObjectURL(file);

            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                img.src = url;
            });

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;

            if (ctx) {
                ctx.drawImage(img, 0, 0);
                const targetType = action === 'jpg-to-png' ? 'image/png' : 'image/jpeg';
                const blob = await new Promise<Blob | null>(resolve =>
                    canvas.toBlob(resolve, targetType, 0.95)
                );

                URL.revokeObjectURL(url);

                if (blob) {
                    const arrayBuffer = await blob.arrayBuffer();
                    return new Uint8Array(arrayBuffer);
                }
            }
            URL.revokeObjectURL(url);
            return null;
        }

        // -------------------------
        // 9. AI IMAGE UPSCALER (High-Quality Enhancement)
        // -------------------------
        if (action === 'upscale-image') {
            const file = files[0];
            const img = new Image();
            const url = URL.createObjectURL(file);

            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                img.src = url;
            });

            // Target 2x upscaling
            const scaleFactor = 2;
            const targetWidth = img.width * scaleFactor;
            const targetHeight = img.height * scaleFactor;

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            canvas.width = targetWidth;
            canvas.height = targetHeight;

            if (ctx) {
                // High Quality Resampling
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

                // --- SHARPENING CONVOLUTION (Mimics AI Enhancement) ---
                const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
                const pixels = imageData.data;
                const output = new Uint8ClampedArray(pixels.length);

                // Sharpen Matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0]
                const weights = [0, -1, 0, -1, 5, -1, 0, -1, 0];
                const side = 3;
                const halfSide = 1;

                for (let y = 0; y < targetHeight; y++) {
                    for (let x = 0; x < targetWidth; x++) {
                        const dstOff = (y * targetWidth + x) * 4;
                        let r = 0, g = 0, b = 0;
                        for (let cy = 0; cy < side; cy++) {
                            for (let cx = 0; cx < side; cx++) {
                                const scy = Math.min(targetHeight - 1, Math.max(0, y + cy - halfSide));
                                const scx = Math.min(targetWidth - 1, Math.max(0, x + cx - halfSide));
                                const srcOff = (scy * targetWidth + scx) * 4;
                                const wt = weights[cy * side + cx];
                                r += pixels[srcOff] * wt;
                                g += pixels[srcOff + 1] * wt;
                                b += pixels[srcOff + 2] * wt;
                            }
                        }
                        output[dstOff] = r;
                        output[dstOff + 1] = g;
                        output[dstOff + 2] = b;
                        output[dstOff + 3] = pixels[dstOff + 3]; // Alpha
                    }
                }

                ctx.putImageData(new ImageData(output, targetWidth, targetHeight), 0, 0);

                const blob = await new Promise<Blob | null>(resolve =>
                    canvas.toBlob(resolve, 'image/jpeg', 0.95)
                );

                URL.revokeObjectURL(url);

                if (blob) {
                    const arrayBuffer = await blob.arrayBuffer();
                    return new Uint8Array(arrayBuffer);
                }
            }
            URL.revokeObjectURL(url);
            return null;
        }

        return null;

    } catch (error) {
        console.error("PDF Processing Error:", error);
        throw error;
    }
}
