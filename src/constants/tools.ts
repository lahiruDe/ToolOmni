import {
    FilePlus,
    ImageIcon,
    Video,
    Sparkles,
    QrCode,
    Languages,
    PenTool
} from 'lucide-react';

export const ICON_MAP: Record<string, any> = {
    FilePlus,
    ImageIcon,
    Video,
    Sparkles,
    QrCode,
    Languages,
    PenTool
};

export type ToolCategory = 'PDF' | 'Video' | 'Image' | 'Utility' | 'AI' | 'Writing' | 'File';

export type ToolType = 'file-to-file' | 'url-to-file' | 'text-to-text';

export interface Tool {
    id: string;
    title: string;
    description: string;
    iconName: string;
    category: ToolCategory;
    href: string;
    type: ToolType;
    seoTitle?: string;
    seoDescription?: string;
    keywords?: string[];
    content?: {
        title: string; // H2 title for the content section
        steps: string[]; // Steps for "How to use"
        features: string[]; // Key features list
        description: string; // Longer description paragraph
    };
    faqs?: {
        question: string;
        answer: string;
    }[];
}

export const TOOLS: Tool[] = [
    {
        id: 'merge-pdf',
        title: 'Merge PDF',
        description: 'Combine multiple PDF files into one single document easily.',
        iconName: 'FilePlus',
        category: 'PDF',
        href: '/pdf/merge-pdf',
        type: 'file-to-file',
        seoTitle: 'Merge PDF - Combine PDF Files Online for Free',
        seoDescription: 'Merge multiple PDF files into one document for free. No registration needed. Secure, fast, and easy to use online PDF merger.',
        keywords: ['Merge PDF', 'Combine PDF', 'Join PDF', 'PDF Merger', 'Combine PDF Files', 'Merge PDF Free', 'Online PDF Merger'],
        content: {
            title: 'How to Merge PDF Files Online for Free',
            description: 'ToolOmni Merge PDF is the easiest way to combine multiple PDF files into one. Whether you have invoices, reports, or e-books, you can join them together in seconds. It is completely free, secure, and works directly in your browser.',
            steps: [
                'Click "Upload from PC or Mobile" or drag and drop your PDF files.',
                'Arrange the files in the order you want them to appear in the final document.',
                'Click "Add More" if you need to include additional files.',
                'Click the "Merge PDF" button.',
                'Download your single combined PDF file instantly.'
            ],
            features: [
                '100% Free: No hidden costs, watermarks, or limits.',
                'Drag & Drop: Easy to use interface for rearranging files.',
                'Secure Processing: Files are processed securely and deleted automatically.',
                'Fast Merging: Combine large files in seconds.',
                'Universal Support: Works on Windows, Mac, Linux, and Mobile.'
            ]
        },
        faqs: [
            {
                question: 'Is it safe to merge sensitive PDFs here?',
                answer: 'Yes, absolutely. We prioritize your privacy. Your files are processed securely and are automatically deleted from our servers after 1 hour.'
            },
            {
                question: 'How many files can I merge at once?',
                answer: 'You can merge as many files as you want. There is no strict limit on the number of files.'
            },
            {
                question: 'Can I rearrange the pages?',
                answer: 'Yes! After uploading, you can drag and drop your files to change their order before merging.'
            },
            {
                question: 'Do I need to install any software?',
                answer: 'No, ToolOmni works entirely in your web browser. You don\'t need to download or install anything.'
            }
        ]
    },
    {
        id: 'pdf-to-jpg',
        title: 'PDF to JPG',
        description: 'Convert PDF pages to high-quality JPG images.',
        iconName: 'ImageIcon',
        category: 'PDF',
        href: '/pdf/pdf-to-jpg',
        type: 'file-to-file',
        seoTitle: 'PDF to JPG - Convert PDF to Image High Quality (Free)',
        seoDescription: 'Convert PDF to JPG online for free. Extract images from PDF or save pages as high-quality JPG pictures. No sign-up, secure, and fast.',
        keywords: ['PDF to JPG', 'Convert PDF to JPG', 'PDF to Image', 'PDF to Picture', 'Save PDF as JPG', 'PDF to JPG High Quality', 'Free PDF Converter'],
        content: {
            title: 'How to Convert PDF to JPG Online',
            description: 'Turn your PDF documents into high-quality JPG images instantly. ToolOmni PDF to JPG converter extracts every page of your PDF and saves them as separate image files. Perfect for sharing on social media or inserting into presentations.',
            steps: [
                'Upload your PDF file by clicking the upload button or dragging it onto the page.',
                'Wait a few seconds for the conversion process to complete.',
                'Preview the generated JPG images for each page.',
                'Click "Download .zip" to get all images at once.',
                'Or click the download icon on individual images to save specific pages.'
            ],
            features: [
                'High Quality: Converts pages to sharp, high-resolution JPGs.',
                'Batch Conversion: Converts all pages in your PDF document at once.',
                'Zip Download: Get all your images in one convenient zip file.',
                'Instant Preview: See your images before downloading.',
                'Privacy First: No one sees your files but you.'
            ]
        },
        faqs: [
            {
                question: 'Is the image quality good?',
                answer: 'Yes, we convert PDFs to high-resolution JPGs suitable for printing and sharing.'
            },
            {
                question: 'Can I convert a password-protected PDF?',
                answer: 'For security reasons, you should unlock your PDF (remove the password) before uploading it for conversion.'
            },
            {
                question: 'Does it work on my phone?',
                answer: 'Yes! You can convert PDFs to images directly on your Android or iPhone using your web browser.'
            },
            {
                question: 'Is it free?',
                answer: '100% Free. You can convert as many files as you need without paying a cent.'
            }
        ]
    },
    {
        id: 'compress-pdf',
        title: 'Compress PDF',
        description: 'Reduce the file size of your PDF while maintaining good quality.',
        iconName: 'FilePlus',
        category: 'PDF',
        href: '/pdf/compress-pdf',
        type: 'file-to-file',
        seoTitle: 'Compress PDF - Reduce PDF File Size Online for Free',
        seoDescription: 'Compress PDF file size online for free. Optimize PDF documents for web and email without losing quality. Secure, fast, and easy to use.',
        keywords: ['Compress PDF', 'Reduce PDF Size', 'Optimize PDF', 'Shrink PDF', 'PDF Compressor', 'Free PDF Compressor', 'Online PDF Compressor'],
        content: {
            title: 'How to Compress PDF Files Online',
            description: 'Reduce the size of your PDF documents easily with ToolOmni. Our intelligent compression algorithm removes unnecessary data to shrink your file efficiently while keeping the content legible.',
            steps: [
                'Upload your large PDF file by dropping it here or clicking the button.',
                'Wait a moment while we analyze and optimize the file structure.',
                'The tool will automatically remove redundant data and optimize the document.',
                'Click "Download PDF" to save the smaller, optimized file.',
            ],
            features: [
                'Smart Compression: Reduces size by removing unused objects and data.',
                'Web Optimized: Perfect for uploading to websites or sending via email.',
                'Secure: All processing happens in your browser or secure environment.',
                'No Quality Loss: Text and vector graphics remain sharp.',
                'Free Forever: Compress as many files as you need.'
            ]
        },
        faqs: [
            {
                question: 'Does compressing reduce quality?',
                answer: 'Our tool focuses on structural optimization, so text quality remains perfect. Images may be slightly optimized but remain clear.'
            },
            {
                question: 'How much space can I save?',
                answer: 'It depends on the file. PDFs generated from Word or Scanners often shrink by 30-70%.'
            },
            {
                question: 'Is it free?',
                answer: 'Yes, completely free with no limits.'
            }
        ]
    },
    {
        id: 'tiktok-downloader',
        title: 'TikTok Downloader',
        description: 'Download TikTok videos without watermark in HD quality.',
        iconName: 'Video',
        category: 'Video',
        href: '/video/tiktok-downloader',
        type: 'url-to-file',
        seoTitle: 'TikTok Downloader - Download Video TikTok Without Watermark',
        seoDescription: 'TikTok Downloader - download video TikTok without watermark online. Save TikTok video in MP4, HD quality. Free and fast TikTok video downloader.',
        keywords: ['TikTok Downloader', 'Download TikTok Video', 'TikTok No Watermark', 'Save TikTok', 'TikTok MP4', 'TikTok MP3', 'TikTok Downloader Online'],
        content: {
            title: 'How to Download TikTok Videos Without Watermark',
            description: 'ToolOmni TikTok Downloader is the best free online tool to download TikTok videos without watermark. It is fast, easy, and works on all devices (PC, Mac, Android, iOS). You can download videos in high definition (HD) MP4 format or convert them to MP3 audio.',
            steps: [
                'Open the TikTok app or website and find the video you want to download.',
                'Click on the "Share" button and select "Copy Link".',
                'Paste the link into the input box above on ToolOmni.',
                'Click the "Download" button.',
                'Choose your preferred format (HD Video, No Watermark, or MP3) and save the file.'
            ],
            features: [
                'No Watermark: Download clean videos without the TikTok logo.',
                'HD Quality: Support for high-definition video downloads.',
                'MP3 Support: Convert and download TikTok audio as MP3.',
                'Unlimited Downloads: Download as many videos as you want for free.',
                'Cross-Platform: Works on iPhone, iPad, Android, Window, and Mac.'
            ]
        },
        faqs: [
            {
                question: 'I have to pay to use this TikTok Downloader?',
                answer: 'No, this tool is completely free. You do not need to pay anything to download TikTok videos.'
            },
            {
                question: 'Where are the downloaded videos saved?',
                answer: 'Videos are usually saved in the "Downloads" folder on your device (Windows, Mac, Android, or iOS).'
            },
            {
                question: 'Does ToolOmni store downloaded videos?',
                answer: 'No, we do not store videos. We only provide a link to download the video directly from TikTok servers.'
            },
            {
                question: 'Can I download TikTok videos on Android/iOS?',
                answer: 'Yes, our tool is fully compatible with all mobile devices. Just use your browser (Chrome, Safari) to visit ToolOmni.'
            }
        ]
    },
    {
        id: 'pdf-to-word',
        title: 'PDF to Word',
        description: 'Convert PDF documents to editable Microsoft Word files.',
        iconName: 'FileText',
        category: 'PDF',
        href: '/pdf/pdf-to-word',
        type: 'file-to-file',
        seoTitle: 'PDF to Word - Convert PDF to Editable Docx Online (Free)',
        seoDescription: 'Convert PDF to Word online for free. Turn PDF files into editable Docx documents with high accuracy. Fast, secure, and no sign-up.',
        keywords: ['PDF to Word', 'Convert PDF to Word', 'PDF to Docx', 'Editable PDF', 'PDF to Word Converter', 'Free PDF to Word'],
        content: {
            title: 'How to Convert PDF to Word Online',
            description: 'Easily convert your PDF files into editable Word documents. ToolOmni PDF to Word converter preserves the layout and formatting of your original PDF while giving you the freedom to edit the text in Microsoft Word.',
            steps: [
                'Upload your PDF file by dragging it or clicking the upload button.',
                'Our engine will analyze the document and extract the text content.',
                'Wait a few seconds for the conversion to Microsoft Word format.',
                'Download your editable .docx file instantly.'
            ],
            features: [
                'High Accuracy: Preserves layout, fonts, and images.',
                'Editable Content: Get a fully editable Word document.',
                'Fast Conversion: Convert even large PDFs in seconds.',
                'Secure: Your documents are processed in-memory and not stored.',
                'Universal Accessibility: Works on any device with a browser.'
            ]
        }
    },
    {
        id: 'word-to-pdf',
        title: 'Word to PDF',
        description: 'Convert Microsoft Word documents to professional PDF files.',
        iconName: 'FilePlus',
        category: 'PDF',
        href: '/pdf/word-to-pdf',
        type: 'file-to-file',
        seoTitle: 'Word to PDF - Convert Docx to PDF Online for Free',
        seoDescription: 'Convert Word to PDF online for free. Save Microsoft Word documents as professional PDF files with high quality. Easy, fast, and secure.',
        keywords: ['Word to PDF', 'Convert Word to PDF', 'Docx to PDF', 'Save Word as PDF', 'Word to PDF Converter', 'Free Word to PDF'],
        content: {
            title: 'How to Convert Word to PDF Online',
            description: 'Turn your Word documents into professional PDF files instantly. ToolOmni Word to PDF converter ensures your document looks exactly as intended, protecting it from unwanted edits and maintaining formatting across all platforms.',
            steps: [
                'Upload your Word (.doc, .docx) file.',
                'Wait while our engine renders the document to a PDF format.',
                'The conversion process takes only a few seconds.',
                'Download your high-quality PDF file.'
            ],
            features: [
                'Perfect Formatting: Maintains the original look of your Word document.',
                'Quick & Easy: One-click conversion from Word to PDF.',
                'Multiple Formats: Supports both .doc and .docx files.',
                'Private & Secure: We respect your privacy and don\'t store your files.',
                'Free Forever: No limits on the number of conversions.'
            ]
        }
    },
    {
        id: 'background-remover',
        title: 'Background Remover',
        description: 'Remove backgrounds from images instantly using AI.',
        iconName: 'Sparkles',
        category: 'Image',
        href: '/image/background-remover',
        type: 'file-to-file',
        seoTitle: 'Background Remover - Remove Image Background Online (AI)',
        seoDescription: 'Remove image backgrounds automatically in seconds with ToolOmni Background Remover. Powered by AI, free and high quality.',
        keywords: ['Background Remover', 'Remove Background', 'AI Background Remover', 'Image Background Remover', 'Transparent Background', 'Remove BG'],
        content: {
            title: 'How to Remove Background from Image Online',
            description: 'Experience the magic of AI with ToolOmni Background Remover. Our advanced AI model detects the subject of your photo and removes the background instantly, giving you a clean, transparent result perfect for e-commerce, profiles, or design projects.',
            steps: [
                'Upload your photo (JPG, PNG) by dragging it or clicking the button.',
                'Our AI will process the image to identify the subject.',
                'The background is removed automatically in seconds.',
                'Preview the result and download your transparent PNG image.'
            ],
            features: [
                'AI Powered: High-precision background detection.',
                'Instant Results: Removes background in less than 5 seconds.',
                'High Quality: Maintains original edge details of the subject.',
                'Free to Use: Process images without any subscription.',
                'Secure: Your images are never stored on our servers.'
            ]
        }
    },
    {
        id: 'compress-image',
        title: 'Image Compressor',
        description: 'Compress images to reduce file size while maintaining quality.',
        iconName: 'ImageIcon',
        category: 'Image',
        href: '/image/compress-image',
        type: 'file-to-file',
        seoTitle: 'Image Compressor - Reduce Image Size Online (Free)',
        seoDescription: 'Reduce image file size online for free. Compress JPG, PNG and WEBP images while maintaining high quality. Fast, secure, and easy to use.',
        keywords: ['Image Compressor', 'Reduce Image Size', 'Compress JPG', 'Compress PNG', 'Shrink Image', 'Online Image Compressor'],
        content: {
            title: 'How to Compress Images Online for Free',
            description: 'ToolOmni Image Compressor is the easiest way to reduce the file size of your photos. Whether you need to upload a profile picture or optimize images for your website, our tool shrinks your files in seconds without noticeable quality loss.',
            steps: [
                'Click "Upload" or drag and drop your image files.',
                'Our engine will automatically optimize and compress the image.',
                'Wait a few seconds for the process to complete.',
                'Download your compressed image file instantly.'
            ],
            features: [
                'High Quality: Maintains visual clarity while reducing file size.',
                'Fast Processing: Compress images in milliseconds.',
                'Secure: All processing happens in your browser.',
                'Multiple Formats: Supports JPG, PNG, and WEBP.',
                'Free Forever: No limits on usage.'
            ]
        }
    },
    {
        id: 'jpg-to-png',
        title: 'JPG to PNG',
        description: 'Convert JPG images to PNG format with high quality.',
        iconName: 'ImageIcon',
        category: 'Image',
        href: '/image/jpg-to-png',
        type: 'file-to-file',
        seoTitle: 'JPG to PNG - Convert JPG to PNG Online (Free)',
        seoDescription: 'Convert JPG to PNG online for free. Maintain high quality and transparency support. Fast, secure, and no installation required.',
        keywords: ['JPG to PNG', 'Convert JPG to PNG', 'JPG to PNG Online', 'Free Image Converter'],
        content: {
            title: 'How to Convert JPG to PNG Online',
            description: 'Easily convert your JPG images to PNG format. PNG is ideal for web use as it supports transparency and offers lossless compression. Our tool ensures your images remain sharp and clear.',
            steps: [
                'Upload your JPG image.',
                'Our engine converts it to PNG format instantly.',
                'Wait a second for the processing to finish.',
                'Download your new PNG image.'
            ],
            features: [
                'High Quality: Lossless conversion to PNG.',
                'Fast & Easy: One-click conversion.',
                'Secure: Your files are processed locally.',
                'Free: No limits or watermarks.'
            ]
        }
    },
    {
        id: 'png-to-jpg',
        title: 'PNG to JPG',
        description: 'Convert PNG images to JPG format quickly and easily.',
        iconName: 'ImageIcon',
        category: 'Image',
        href: '/image/png-to-jpg',
        type: 'file-to-file',
        seoTitle: 'PNG to JPG - Convert PNG to JPG Online (Free)',
        seoDescription: 'Convert PNG to JPG online for free. Ideal for reducing file size and compatibility. Fast, secure, and easy to use.',
        keywords: ['PNG to JPG', 'Convert PNG to JPG', 'PNG to JPG Online', 'Free Image Converter'],
        content: {
            title: 'How to Convert PNG to JPG Online',
            description: 'Turn your PNG images into JPG files in seconds. JPG is the most compatible format for photos and offers excellent file size reduction. Perfect for saving storage space.',
            steps: [
                'Upload your PNG file.',
                'The tool converts it to a high-quality JPG.',
                'The process completes in milliseconds.',
                'Download your converted JPG image.'
            ],
            features: [
                'File Size Reduction: JPGs are much smaller than PNGs.',
                'High Compatibility: Works on all devices and platforms.',
                'Secure Processing: No files are stored on our servers.',
                'Free Forever: Unlimited conversions.'
            ]
        }
    },
    {
        id: 'upscale-image',
        title: 'AI Image Upscaler',
        description: 'Increase image resolution and quality using AI upscaling.',
        iconName: 'Sparkles',
        category: 'Image',
        href: '/image/upscale-image',
        type: 'file-to-file',
        seoTitle: 'AI Image Upscaler - Upscale Image Online for Free',
        seoDescription: 'Upscale and enhance your images online for free using AI. Increase resolution without losing quality. Fast, secure, and professional results.',
        keywords: ['AI Image Upscaler', 'Upscale Image', 'Image Enhancer', 'Increase Resolution', 'High Quality Resizing'],
        content: {
            title: 'How to Upscale Images with AI Online',
            description: 'Convert low-resolution photos into high-quality masterpieces. Our AI Image Upscaler analyzes your image pixel by pixel and generates new data to increase resolution while maintaining sharpness and detail.',
            steps: [
                'Upload your low-resolution photo.',
                'The AI model analyzes and generates enhanced pixels.',
                'Wait a few seconds for the upscaling process.',
                'Download your 2x higher resolution image.'
            ],
            features: [
                '2x Resolution: Double the width and height of your images.',
                'AI Sharpening: Reduces blur and enhances edges.',
                'No Quality Loss: Professional-grade upscaling algorithm.',
                'Free & Secure: Processed entirely in your browser.'
            ]
        }
    },
    {
        id: 'qr-generator',
        title: 'QR Code Generator',
        description: 'Create custom QR codes for URLs, text, and more.',
        iconName: 'QrCode',
        category: 'Utility',
        href: '/utility/qr-generator',
        type: 'url-to-file',
        seoTitle: 'QR Code Generator - Create Free Custom QR Codes Online',
        seoDescription: 'Generate custom QR codes for free. Support for URLs, text, and emails. High quality, no registration required, and fast.',
        keywords: ['QR Code Generator', 'Create QR Code', 'Free QR Code', 'Custom QR Code', 'QR Creator'],
        content: {
            title: 'How to Generate a QR Code Online',
            description: 'Make your own functional QR code in seconds. Whether it is for a website link, business card, or simple text, our generator creates high-resolution QR codes that work everywhere.',
            steps: [
                'Enter the URL or text into the input field.',
                'Our generator creates the QR code instantly.',
                'Preview the generated QR code.',
                'Download as a high-quality PNG image.'
            ],
            features: [
                'Instant Generation: See your QR code as you type.',
                'High Resolution: Perfect for printing and digital use.',
                'Works for Everything: URLs, Text, Emails, and more.',
                'Free Forever: No hidden fees or sign-ups.'
            ]
        }
    },
    {
        id: 'ai-writer',
        title: 'AI Writing Assistant',
        description: 'Generate high-quality content, emails, and articles using AI.',
        iconName: 'PenTool',
        category: 'AI',
        href: '/ai/ai-writer',
        type: 'text-to-text',
        seoTitle: 'AI Writing Assistant - Free AI Content Generator',
        seoDescription: 'Generate professional content, emails, and blog posts for free with ToolOmni AI Writer. Fast, creative, and easy to use.',
        keywords: ['AI Writer', 'Content Generator', 'AI Writing Assistant', 'Free AI Writer', 'Article Generator'],
        content: {
            title: 'How to use AI Writing Assistant',
            description: 'Our AI Writing Assistant helps you overcome writer\'s block and generate professional content in seconds. Simply provide a topic or prompt, and let the AI do the work.',
            steps: [
                'Enter your topic or a brief description of what you want to write.',
                'Select the tone and style (optional).',
                'Click "Generate Content".',
                'Copy or download your AI-generated text.'
            ],
            features: [
                'Creative Content: Generate unique ideas and articles.',
                'Professional Tone: Perfect for emails and business documents.',
                'Instant Output: Get results in milliseconds.',
                'Free Access: No subscription required.'
            ]
        }
    },
    {
        id: 'grammar-checker',
        title: 'Grammar Checker',
        description: 'Fix grammar, spelling, and punctuation errors instantly.',
        iconName: 'Languages',
        category: 'AI',
        href: '/ai/grammar-checker',
        type: 'text-to-text',
        seoTitle: 'Grammar Checker - Free Online Grammar & Spell Check',
        seoDescription: 'Check and fix your grammar, spelling, and punctuation errors for free. Improve your writing quality instantly with ToolOmni Grammar Checker.',
        keywords: ['Grammar Checker', 'Spell Check', 'Fix Grammar', 'Online Grammar Checker', 'Writing improver'],
        content: {
            title: 'How to use AI Grammar Checker',
            description: 'Ensure your writing is flawless with our AI-powered Grammar Checker. It detects and fixes complex grammatical errors, spelling mistakes, and punctuation issues automatically.',
            steps: [
                'Paste your text into the input box.',
                'Our AI analyzes the text for errors.',
                'Review the suggested fixes.',
                'Click "Fix All Errors" to get the polished version.'
            ],
            features: [
                'Advanced Detection: Finds errors that basic checkers miss.',
                'Style Suggestions: Improves readability and flow.',
                'Multilingual Support: Works with various dialects.',
                'Secure: Your text is processed and never stored.'
            ]
        }
    }
];

export interface CategoryDetail {
    name: ToolCategory;
    description: string;
    count: string;
    featured: string;
    color: string;
    iconName: string;
}

export const CATEGORY_DETAILS: CategoryDetail[] = [
    { name: 'PDF', description: 'Tools to manage PDF files.', count: '5 Tools', featured: 'Merge PDF', color: 'bg-[#7c3aed]', iconName: 'FilePlus' },
    { name: 'Video', description: 'Download videos from social media.', count: '1 Tool', featured: 'TikTok Downloader', color: 'bg-[#ec4899]', iconName: 'Video' },
    { name: 'Image', description: 'AI-powered image manipulation.', count: '5 Tools', featured: 'Background Remover', color: 'bg-[#3b82f6]', iconName: 'ImageIcon' },
    { name: 'Utility', description: 'Useful tools for everyday tasks.', count: '1 Tool', featured: 'QR Generator', color: 'bg-[#10b981]', iconName: 'QrCode' },
    { name: 'AI', description: 'Advanced AI processing tools.', count: '2 Tools', featured: 'AI Writer', color: 'bg-[#f59e0b]', iconName: 'Sparkles' }
];

export const CATEGORIES: ToolCategory[] = ['PDF', 'Video', 'Image', 'Utility', 'AI', 'Writing', 'File'];
