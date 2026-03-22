import { Tool } from '../tools';

export const PDF_TOOLS: Tool[] = [
    {
        id: 'merge-pdf',
        title: 'Merge PDF',
        description: 'Combine multiple PDF files into one single document easily.',
        iconName: 'FilePlus',
        category: 'PDF',
        href: '/pdf/merge-pdf',
        type: 'file-to-file',
        seoTitle: 'Merge PDF Online | Online For Free | ToolOmni.co',
        seoDescription: 'Merge multiple PDF files into one document for free. No registration needed. Secure, fast, and easy to use online PDF merger.',
        keywords: ['Merge PDF', 'Combine PDF', 'Join PDF', 'PDF Merger'],
        content: {
            title: 'Merge PDF Online | Online For Free | ToolOmni.co',
            description: 'The "Merge PDF" tool on ToolOmni is engineered for professionals who demand speed, security, and precision. Merging PDF documents is a fundamental task in modern digital workflows, whether you\'re consolidating monthly bank statements, joining multiple legal contracts into a single signed agreement, or combining academic research papers for a final thesis. Our platform provides a seamless, browser-based experience that eliminates the need for expensive software installations or risky cloud uploads.<br/><br/>By utilizing advanced client-side processing, ToolOmni ensures that your files never leave your device. All merging operations are performed directly within your browser\'s memory (RAM), providing an inherent layer of privacy and data sovereignty that traditional "upload-to-cloud" services simply cannot match. This local-first approach also means that processing times are nearly instantaneous, limited only by your hardware\'s performance rather than server load or internet upload speeds.<br/><br/>Our PDF merging engine supports high-fidelity rendering, ensuring that layouts, fonts, and images remain pixel-perfect in the final combined document. You can easily drag and drop your files, rearrange their order with a simple visual interface, and merge them with a single click. This zero-waste architecture is designed to handle even large PDF files with multiple pages without breaking a sweat.<br/><br/>Whether you are a student organizing application materials, a real estate professional managing closing documents, or a business owner consolidating invoices, ToolOmni’s Merge PDF tool is the authoritative solution for your needs. We are committed to providing 100% free, pro-quality web tools that respect user privacy and deliver exceptional performance every time. Experience the standard of modern file processing today.',
            steps: ['Upload files', 'Arrange order', 'Merge PDF', 'Download result'],
            features: ['100% Free', 'Secure', 'Browser-based']
        },
        faqs: [
            {
                question: "How many PDF files can I merge at once?",
                answer: "You can merge an unlimited number of PDF files. Our tool is designed to handle heavy batch processing directly in your browser without artificial limits."
            },
            {
                question: "Will merging PDFs affect the quality of my images or text?",
                answer: "No. Our engine uses lossless processing, ensuring that every page, image, and font from your original documents is preserved exactly as it appears in the source files."
            },
            {
                question: "Is it safe to merge sensitive legal or financial documents on ToolOmni?",
                answer: "Yes, it is exceptionally safe. Unlike other online tools, ToolOmni processes your files locally on your computer. Your sensitive data is never uploaded to any server, making it the most secure choice for private documents."
            },
            {
                question: "Can I rearrange the pages or files before merging?",
                answer: "Absolutely. Once you upload your PDFs, you can drag and drop the file cards to set the exact order you want them to appear in the final combined document."
            },
            {
                question: "Does this tool work on mobile devices?",
                answer: "Yes. ToolOmni is fully responsive and works perfectly on modern browsers across Windows, Mac, iOS, and Android, allowing you to merge PDFs on the go."
            }
        ]
    },
    {
        id: 'split-pdf',
        title: 'Split PDF',
        description: 'Extract pages from your PDF or save each page as a separate PDF.',
        iconName: 'FileText',
        category: 'PDF',
        href: '/pdf/split-pdf',
        type: 'file-to-file',
        seoTitle: 'Split PDF Online | Online For Free | ToolOmni.co',
        seoDescription: 'Split PDF files into individual pages or extract specific ranges. Fast, secure, and free online PDF splitter with local-RAM processing.',
        keywords: ['Split PDF', 'Extract PDF pages', 'PDF Splitter'],
        content: {
            title: 'Split PDF Online | Online For Free | ToolOmni.co',
            description: `
                <p>The 'Split PDF' tool on ToolOmni is engineered for professionals who demand absolute precision and data sovereignty. In an era of cloud dependency, we offer a superior alternative: 100% local-RAM processing. This means your sensitive documents never leave your browser's memory, ensuring that your data remains yours alone while you extract the specific pages you need with surgical accuracy.</p>
                
                <p>Whether you're looking to extract specific page ranges for a legal filing, separate a massive bank statement into individual months, or divide a scanned document into separate chapters, our engine handles the task instantly. By leveraging advanced client-side technologies like pdf-lib, ToolOmni eliminates the latency and security risks typical of server-side converters, providing a desktop-quality experience directly in your web browser.</p>
                
                <p>Security is the cornerstone of our architecture. Traditional PDF splitters often store your files on remote servers, creating a vulnerability point for your private information. ToolOmni's zero-waste approach means no uploads, no storage, and no tracking. From specialized range extraction ("1-5, 8, 12-15") to automated splitting of every single page into individual files, our tool is optimized for high-performance workflows on Mac, Windows, and mobile devices.</p>
                
                <p>Experience the freedom of unlimited PDF splitting without the hassle of subscriptions, account registration, or annoying watermarks. ToolOmni is committed to providing pro-grade utilities that respect user privacy and deliver results at lightning speed. Start separating your documents today with the most secure PDF splitter on the web.</p>
            `,
            steps: ['Upload your PDF file', 'Select "Extract Ranges" or "Split Every Page"', 'Specify page numbers or preview thumbnails', 'Download your processed files instantly'],
            features: ['Local-RAM Security', 'ZIP Output Support', 'Live Page Previews', 'No Registration Required']
        },
        faqs: [
            {
                question: "How do I extract only specific pages from a PDF?",
                answer: "With our 'Extract Ranges' option, you can type in exact page numbers or ranges (e.g., 1, 3-5, 10). The tool will create a single PDF containing only those selected pages."
            },
            {
                question: "Is my data safe when I split a PDF here?",
                answer: "Yes, 100%. Unlike other sites, ToolOmni processes your PDF locally in your browser's RAM. Your files are never uploaded to our servers, ensuring total privacy for sensitive documents."
            },
            {
                question: "Can I split a large PDF into individual pages automatically?",
                answer: "Absolutely. Choose the 'Split Every Page' method, and our engine will instantly convert every page of your document into a separate PDF file, packaged in a single ZIP for easy download."
            },
            {
                question: "Is there a limit to how many times I can split PDFs?",
                answer: "No. ToolOmni offers unlimited, free PDF splitting with no watermarks, no registration, and no hidden costs or daily usage caps."
            },
            {
                question: "Does splitting a PDF reduce the original quality?",
                answer: "No. We use lossless page extraction technology that preserves all original text, images, and formatting exactly as they were in the source file."
            }
        ]
    },
    {
        id: 'compress-pdf',
        title: 'Compress PDF',
        description: 'Reduce the file size of your PDF while maintaining good quality.',
        iconName: 'Zap',
        category: 'PDF',
        href: '/pdf/compress-pdf',
        type: 'file-to-file',
        seoTitle: 'Compress PDF Online | Online For Free | ToolOmni.co',
        seoDescription: 'Shrink your PDF files for easier sharing. Maintain text and image quality.',
        keywords: ['Compress PDF', 'Reduce PDF Size', 'PDF Compressor'],
        content: {
            title: 'Compress PDF Online | Online For Free | ToolOmni.co',
            description: `
                <p>The 'Compress PDF' tool on ToolOmni is the authoritative solution for professionals and students who need to reduce file sizes without sacrificing document integrity. In a digital landscape where email attachments are capped and government portals have strict upload limits, our compression engine provides the efficiency you need. By utilizing advanced Object Stream Optimization, we deconstruct your PDF and rebuild it using more efficient internal structures, resulting in a significant reduction in megabytes while maintaining pixel-perfect text and visuals.</p>
                
                <p>Our commitment to security is absolute. Unlike traditional "upload-to-cloud" compressors that store your sensitive documents on remote servers, ToolOmni operates entirely within your browser's local RAM. Your business contracts, medical records, and financial statements never leave your machine, providing an inherent level of privacy and data sovereignty that is unmatched in the industry. This local-first approach also eliminates upload wait times, delivering optimized files at lightning speed, regardless of your internet connection.</p>
                
                <p>Designed for a seamless user experience, our tool handles everything from single-page scanned receipts to massive multi-hundred-page reports. Whether you are optimizing files for web display to ensure faster page loads or shrinking a portfolio for a job application, ToolOmni delivers professional results with zero friction. Experience unlimited, free PDF compression with no watermarks, no registrations, and no compromise on quality. Start optimizing your digital documents today with the most secure PDF compressor on the web.</p>
            `,
            steps: ['Upload your PDF file', 'Select your desired compression level (Low/Medium/High)', 'Our engine optimizes the internal object streams', 'Download your smaller, optimized PDF instantly'],
            features: ['Local-RAM Security', 'Object Stream Optimization', 'Zero Quality Loss', 'No Registration Required']
        },
        faqs: [
            {
                question: "How does the compression work without losing quality?",
                answer: "We use Object Stream Optimization to reorganize the PDF's internal data structures more efficiently. This reduces the file size by removing redundant data and optimizing how the document's components are stored, without altering the visual content."
            },
            {
                question: "Is there a limit to how many PDFs I can compress?",
                answer: "No. ToolOmni provides unlimited, free access to our compression engine. You can shrink as many files as you need without any daily caps or usage fees."
            },
            {
                question: "Will my confidential data stay private?",
                answer: "Yes, 100%. Our 'Local-RAM' technology ensures that all processing happens on your own computer. Your files are never uploaded to our servers, keeping your sensitive information completely private."
            },
            {
                question: "Can I use this on my phone or tablet?",
                answer: "Absolutely. ToolOmni is fully responsive and optimized for mobile browsers, allowing you to compress large PDFs on the go from any device."
            },
            {
                question: "Which compression level should I choose?",
                answer: "Most users find 'Medium' is the perfect balance. Use 'High' if you need the smallest possible file size for strict upload limits, or 'Low' if you just want a quick, light optimization."
            }
        ]
    },
    {
        id: 'word-to-pdf',
        title: 'Word to PDF',
        description: 'Convert Microsoft Word documents to professional PDF files.',
        iconName: 'FilePlus',
        category: 'PDF',
        href: '/pdf/word-to-pdf',
        type: 'file-to-file',
        seoTitle: 'Word to PDF Online | Online For Free | ToolOmni.co',
        seoDescription: 'Turn Word documents into high-quality PDFs instantly.',
        keywords: ['Word to PDF', 'Docx to PDF', 'Word Converter'],
        content: {
            title: 'Word to PDF Online | Online For Free | ToolOmni.co',
            description: 'Keep your formatting perfect with our Word to PDF converter.',
            steps: ['Upload .docx', 'Convert', 'Download PDF'],
            features: ['Layout preservation', 'Fast', 'Free']
        }
    },
    {
        id: 'pdf-to-word',
        title: 'PDF to Word',
        description: 'Convert PDF documents to editable Microsoft Word files with high accuracy.',
        iconName: 'FileText',
        category: 'PDF',
        href: '/pdf/pdf-to-word',
        type: 'file-to-file',
        seoTitle: 'PDF to Word Online | Online For Free | ToolOmni.co',
        seoDescription: 'Convert PDF to Word online for free. Our high-fidelity engine preserves text, layout, and formatting. Secure local processing with zero wait time.',
        keywords: ['PDF to Word', 'PDF to Docx', 'Convert PDF to editable Word', 'PDF Converter'],
        content: {
            title: 'PDF to Word Online | Online For Free | ToolOmni.co',
            description: `
                <p>The 'PDF to Word' converter on ToolOmni is the definitive solution for professionals who need to regain control over their documents. Unlike standard converters that output mangled text and broken layouts, our high-fidelity engine is designed to analyze your PDF's structure and reconstruct it into a clean, editable Microsoft Word (.docx) file. This ensures that your paragraphs, lists, and basic formatting remain intact, saving you hours of manual retyping and formatting correction. Whether you are dealing with academic papers, legal contracts, or business reports, our tool treats your data with the precision it deserves.</p>
                
                <p>Security and speed are at the heart of our architecture. Most online converters require you to upload sensitive files to their servers, creating a major privacy risk and potentially exposing your intellectual property. ToolOmni breaks this cycle by processing your documents locally within your browser's RAM using state-of-the-art client-side technology. Your data never leaves your device, providing absolute sovereignty over your information and peace of mind in a digital age. This local-first approach also means zero upload latency, delivering your converted Word files instantly without the need for high-bandwidth connections.</p>
                
                <p>Furthermore, our tool is optimized for the modern web, ensuring it works seamlessly across all platforms—Mac, Windows, Linux, and mobile devices—without requiring any software installation or registration. We believe that professional tools should be accessible to everyone, which is why we offer 100% free, unlimited conversions with no watermarks and no hidden fees. If your PDF contains scanned images, our integrated OCR technology will attempt to recognize and extract text, making even "dead" documents alive again in an editable format.</p>

                <p>In addition to text extraction, we place a heavy emphasis on preserving the structural integrity of your document. Our engine identifies headings, bullet points, and basic styling such as bold and italics, mapping them directly to their corresponding Word elements. While no automated tool can guarantee a perfect 1:1 replica of highly complex artistic layouts, ToolOmni provides the closest fidelity possible in a browser-based environment. Join the thousands of users who have streamlined their workflows by choosing ToolOmni for all their PDF to Word needs. Experience the difference of a tool built for security, speed, and accuracy.</p>
            `,
            steps: ['Upload your PDF document', 'Our engine analyzes and converts the content', 'Download your editable Word file immediately'],
            features: ['High-Fidelity Extraction', 'Local-RAM Security', 'No Registration Required', 'Immediate Download']
        },
        faqs: [
            {
                question: "Will the converted Word document be editable?",
                answer: "Yes, absolutely. Our tool converts PDF content into a standard Microsoft Word (.docx) format, allowing you to edit text, change fonts, and adjust layouts just like any other Word document."
            },
            {
                question: "Does this tool preserve the original PDF layout?",
                answer: "We strive for high-fidelity conversion. While complex layouts (like multi-column magazine styles) may require occasional manual adjustment, our engine is optimized to preserve paragraph flow, lists, and basic styling with high accuracy."
            },
            {
                question: "Is it safe to convert my private PDFs here?",
                answer: "Yes. ToolOmni uses unique Local-RAM technology. This means your files are processed entirely in your browser and are never uploaded to our servers. Your sensitive information stays on your device."
            },
            {
                question: "Do I need to pay for high-quality conversion?",
                answer: "No. ToolOmni offers pro-grade PDF to Word conversion completely free of charge. There are no daily limits, usage caps, or hidden subscriptions."
            },
            {
                question: "Can I convert scanned PDFs to Word?",
                answer: "Yes. If your PDF is a scan, our engine uses integrated OCR (Optical Character Recognition) to identify text and convert it into an editable document."
            }
        ]
    },
    {
        id: 'jpg-to-pdf',
        title: 'JPG to PDF',
        description: 'Convert JPG, PNG, and other images to a single PDF document.',
        iconName: 'ImageIcon',
        category: 'PDF',
        href: '/pdf/jpg-to-pdf',
        type: 'file-to-file',
        seoTitle: 'JPG to PDF Online | Online For Free | ToolOmni.co',
        seoDescription: 'Combine multiple JPG, PNG, or BMP images into one PDF document. Fast, secure, and preserves image quality.',
        keywords: ['JPG to PDF', 'Images to PDF', 'Convert JPG to PDF', 'Merge Images to PDF'],
        content: {
            title: 'JPG to PDF Online | Online For Free | ToolOmni.co',
            description: `
                <p>The 'JPG to PDF' tool on ToolOmni is the premier choice for individuals and organizations who need to assemble visual information into a single, professional document. Whether you are combining scanned receipts for an expense report, merging multiple photos from a recent project, or creating a digital portfolio, our converter provides the speed and flexibility required for modern workflows. We support a wide range of image formats, including JPG, PNG, BMP, and TIFF, ensuring that you can unify all your visual assets without worrying about compatibility.</p>
                
                <p>Data privacy is our core philosophy. Traditional image converters often require you to upload your sensitive photos—containing personal data, geolocation, or proprietary information—to their clouds. ToolOmni eliminates this vulnerability by processing all image conversions locally within your browser's RAM. Your images never leave your device, providing absolute sovereignty over your data. This local-first approach also guarantees lightning-fast conversion speeds, as you don't have to wait for large image files to upload or download through a remote server.</p>
                
                <p>Furthermore, our tool is built for maximum usability, allowing you to upload an unlimited number of images in a single batch. Once uploaded, you can reorder your images to ensure they appear in the exact sequence you desire within the final PDF document. The high-performance conversion engine maintains the original resolution and color fidelity of your photos, ensuring that the resulting PDF is of professional quality and ready for printing or high-resolution sharing.</p>

                <p>Join the thousands of professionals who trust ToolOmni for their document needs. Our 'JPG to PDF' converter is 100% free, requires no registration, and leaves no watermarks on your files. We believe in providing pro-grade utilities that are accessible to everyone, anywhere, on any device. Experience a more secure, faster, and more efficient way to manage your visual documents today with ToolOmni.</p>
            `,
            steps: ['Upload your images (JPG, PNG, BMP, etc.)', 'Rearrange the images in your preferred order', 'Our engine combines them into a high-quality PDF', 'Download your final PDF document immediately'],
            features: ['Local-RAM Security', 'Multiple Image Support', 'Lossless Quality', 'Instant Processing']
        },
        faqs: [
            {
                question: "Can I combine different image formats into one PDF?",
                answer: "Yes. You can upload any combination of JPG, PNG, BMP, or TIFF files, and ToolOmni will seamlessly merge them into a single, unified PDF document."
            },
            {
                question: "Is there a limit to the number of images I can upload?",
                answer: "No. You can upload as many images as you need. ToolOmni provides unlimited conversions for the most complex document requirements."
            },
            {
                question: "Will my images be stored on your servers?",
                answer: "Never. ToolOmni uses unique Local-RAM technology, meaning your images are processed entirely in your browser's memory and are never uploaded to any server."
            },
            {
                question: "Does the conversion process affect image quality?",
                answer: "No. Our engine is designed for high-fidelity conversion, preserving the original resolution and color clarity of your photographs."
            },
            {
                question: "Can I reorder the images after uploading?",
                answer: "Yes. Once your images are uploaded, you can easily drag and drop them to arrange them in the specific order you want them to appear in the PDF."
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
        seoTitle: 'PDF to JPG Online | Online For Free | ToolOmni.co',
        seoDescription: 'Extract every page of your PDF as a separate JPG image.',
        keywords: ['PDF to JPG', 'PDF to Image', 'Extract pages'],
        content: {
            title: 'PDF to JPG Online | Online For Free | ToolOmni.co',
            description: 'Turn your document pages into sharp image files.',
            steps: ['Upload PDF', 'Review pages', 'Download ZIP'],
            features: ['High resolution', 'Full page conversion', 'ZIP download']
        }
    },
    {
        id: 'excel-to-pdf',
        title: 'Excel to PDF',
        description: 'Convert Excel spreadsheets to PDF documents with perfect layout.',
        iconName: 'FileText',
        category: 'PDF',
        href: '/pdf/excel-to-pdf',
        type: 'file-to-file',
        seoTitle: 'Excel to PDF Online | Online For Free | ToolOmni.co',
        seoDescription: 'Make your spreadsheets easy to read and share as PDFs.',
        keywords: ['Excel to PDF', 'XLS to PDF', 'Table to PDF'],
        content: {
            title: 'Excel to PDF Online | Online For Free | ToolOmni.co',
            description: 'Convert worksheets and tables to formatted PDF files.',
            steps: ['Upload .xlsx', 'Convert', 'Download'],
            features: ['Grid preservation', 'Fast', 'Free']
        }
    },
    {
        id: 'pdf-to-excel',
        title: 'PDF to Excel',
        description: 'Convert PDF tables back into editable Excel spreadsheets.',
        iconName: 'FileText',
        category: 'PDF',
        href: '/pdf/pdf-to-excel',
        type: 'file-to-file',
        seoTitle: 'PDF to Excel Online | Online For Free | ToolOmni.co',
        seoDescription: 'Extract tables from PDF files into Microsoft Excel with accuracy.',
        keywords: ['PDF to Excel', 'PDF to XLS', 'Extract Table'],
        content: {
            title: 'PDF to Excel Online | Online For Free | ToolOmni.co',
            description: 'Turn static PDF tables into dynamic Excel data.',
            steps: ['Upload PDF', 'Analyze tables', 'Download .xlsx'],
            features: ['Data accuracy', 'Editable XLS', 'Private']
        }
    },
    {
        id: 'ppt-to-pdf',
        title: 'PPT to PDF',
        description: 'Convert PowerPoint presentations to PDF format.',
        iconName: 'FilePlus',
        category: 'PDF',
        href: '/pdf/ppt-to-pdf',
        type: 'file-to-file',
        seoTitle: 'PPT to PDF Online | Online For Free | ToolOmni.co',
        seoDescription: 'Save your presentation slides as high-quality PDF files.',
        keywords: ['PPT to PDF', 'PowerPoint to PDF', 'Slides to PDF'],
        content: {
            title: 'PPT to PDF Online | Online For Free | ToolOmni.co',
            description: 'Create professional PDFs from your PowerPoint decks.',
            steps: ['Upload .pptx', 'Render slides', 'Download'],
            features: ['Slide-by-slide', 'HQ rendering', 'Fast']
        }
    },
    {
        id: 'unlock-pdf',
        title: 'Unlock PDF',
        description: 'Remove password and restrictions from protected PDF files.',
        iconName: 'ShieldCheck',
        category: 'PDF',
        href: '/pdf/unlock-pdf',
        type: 'file-to-file',
        seoTitle: 'Unlock PDF Online | Online For Free | ToolOmni.co',
        seoDescription: 'Decipher and unlock protected PDFs locally in your browser.',
        keywords: ['Unlock PDF', 'Remove PDF password', 'Decrypted PDF'],
        content: {
            title: 'Unlock PDF Online | Online For Free | ToolOmni.co',
            description: 'Remove safety passwords to edit and print your documents.',
            steps: ['Upload locked PDF', 'Enter password', 'Download unlocked file'],
            features: ['Local decryption', 'Private', 'Secure']
        }
    },
    {
        id: 'protect-pdf',
        title: 'Protect PDF',
        description: 'Encrypt your PDF with a password and set permissions.',
        iconName: 'ShieldCheck',
        category: 'PDF',
        href: '/pdf/protect-pdf',
        type: 'file-to-file',
        seoTitle: 'Protect PDF Online | Online For Free | ToolOmni.co',
        seoDescription: 'Secure your sensitive documents with professional encryption.',
        keywords: ['Protect PDF', 'Encrypt PDF', 'PDF password'],
        content: {
            title: 'Protect PDF Online | Online For Free | ToolOmni.co',
            description: 'Add a password layer to your PDF for maximum security.',
            steps: ['Upload PDF', 'Set password', 'Encrypt', 'Download'],
            features: ['Strong encryption', 'Local processing', 'Privacy']
        }
    },
    {
        id: 'rotate-pdf',
        title: 'Rotate PDF',
        description: 'Rotate PDF pages permanently in any direction.',
        iconName: 'RotateCcw',
        category: 'PDF',
        href: '/pdf/rotate-pdf',
        type: 'file-to-file',
        seoTitle: 'Rotate PDF Online | Online For Free | ToolOmni.co',
        seoDescription: 'Fix upside-down or sideways PDF pages instantly.',
        keywords: ['Rotate PDF', 'Turn PDF', 'Fix PDF orientation'],
        content: {
            title: 'Rotate PDF Online | Online For Free | ToolOmni.co',
            description: 'Flip and turn your PDF pages to the correct orientation.',
            steps: ['Upload PDF', 'Rotate pages', 'Save', 'Download'],
            features: ['Individual rotation', 'Fast', 'No watermark']
        }
    },
    {
        id: 'add-watermark',
        title: 'Add Watermark',
        description: 'Add text or image watermark to your PDF documents.',
        iconName: 'FilePlus',
        category: 'PDF',
        href: '/pdf/add-watermark',
        type: 'file-to-file',
        seoTitle: 'Add Watermark Online | Online For Free | ToolOmni.co',
        seoDescription: 'Brand or protect your work by adding a custom watermark.',
        keywords: ['Add Watermark', 'PDF Watermark', 'Stamp PDF'],
        content: {
            title: 'Add Watermark Online | Online For Free | ToolOmni.co',
            description: 'Place custom logos or text over your PDF pages.',
            steps: ['Upload PDF', 'Design watermark', 'Apply to all', 'Download'],
            features: ['Opacity control', 'Text/Image support', 'Batch apply']
        }
    },
    {
        id: 'remove-watermark',
        title: 'Remove Watermark',
        description: 'Clean up your documents by removing overlay watermarks.',
        iconName: 'X',
        category: 'PDF',
        href: '/pdf/remove-watermark',
        type: 'file-to-file',
        seoTitle: 'Remove Watermark Online | Online For Free | ToolOmni.co',
        seoDescription: 'Remove distracting text or image stamps from your PDF.',
        keywords: ['Remove Watermark', 'Clean PDF', 'Delete Watermark'],
        content: {
            title: 'Remove Watermark Online | Online For Free | ToolOmni.co',
            description: 'Erase unwanted branding from your professional documents.',
            steps: ['Upload PDF', 'Select watermark area', 'Process', 'Download'],
            features: ['Layer-based cleanup', 'HQ output', 'Secure']
        }
    },
    {
        id: 'pdf-to-text',
        title: 'PDF to Text',
        description: 'Extract plain text from your PDF files.',
        iconName: 'FileText',
        category: 'PDF',
        href: '/pdf/pdf-to-text',
        type: 'file-to-file',
        seoTitle: 'PDF to Text Online | Online For Free | ToolOmni.co',
        seoDescription: 'Get the raw text content from any PDF document instantly.',
        keywords: ['PDF to Text', 'Extract Text', 'Scraped PDF'],
        content: {
            title: 'PDF to Text Online | Online For Free | ToolOmni.co',
            description: 'Convert PDF content to simple, copy-pasteable text.',
            steps: ['Upload PDF', 'Extract text', 'Download .txt'],
            features: ['OCR support', 'Format cleanup', 'Fast']
        }
    },
    {
        id: 'pdf-to-html',
        title: 'PDF to HTML',
        description: 'Convert PDF documents into web-ready HTML code.',
        iconName: 'Globe',
        category: 'PDF',
        href: '/pdf/pdf-to-html',
        type: 'file-to-file',
        seoTitle: 'PDF to HTML Online | Online For Free | ToolOmni.co',
        seoDescription: 'Turn your PDFs into responsive HTML pages for the web.',
        keywords: ['PDF to HTML', 'PDF to Web', 'Embed PDF'],
        content: {
            title: 'PDF to HTML Online | Online For Free | ToolOmni.co',
            description: 'Transform documents into clean, coded web environments.',
            steps: ['Upload PDF', 'Render HTML', 'Download package'],
            features: ['Responsive layout', 'CSS included', 'Ready to use']
        }
    },
    {
        id: 'organize-pages',
        title: 'Organize Pages',
        description: 'Drag and drop to rearrange PDF pages easily.',
        iconName: 'Zap',
        category: 'PDF',
        href: '/pdf/organize-pages',
        type: 'file-to-file',
        seoTitle: 'Organize Pages Online | Online For Free | ToolOmni.co',
        seoDescription: 'Get total control over your PDF page structure.',
        keywords: ['Organize PDF', 'Rearrange pages', 'Reorder PDF'],
        content: {
            title: 'Organize Pages Online | Online For Free | ToolOmni.co',
            description: 'Click and drag to sort your document exactly as you want.',
            steps: ['Upload PDF', 'Drag pages to reorder', 'Save', 'Download'],
            features: ['Visual sorter', 'Fast', 'Secure']
        }
    },
    {
        id: 'delete-pages',
        title: 'Delete Pages',
        description: 'Remove unwanted pages from your PDF file.',
        iconName: 'X',
        category: 'PDF',
        href: '/pdf/delete-pages',
        type: 'file-to-file',
        seoTitle: 'Delete Pages Online | Online For Free | ToolOmni.co',
        seoDescription: 'Instantly trim your PDF by removing unnecessary pages.',
        keywords: ['Delete PDF pages', 'Remove pages', 'PDF trimmer'],
        content: {
            title: 'Delete Pages Online | Online For Free | ToolOmni.co',
            description: 'Clean up your files by removing extra or redundant pages.',
            steps: ['Upload PDF', 'Select pages to delete', 'Trim', 'Download'],
            features: ['Simple UI', 'Secure', 'HQ output']
        }
    },
    {
        id: 'repair-pdf',
        title: 'Repair PDF',
        description: 'Fix corrupted or unreadable PDF documents.',
        iconName: 'Zap',
        category: 'PDF',
        href: '/pdf/repair-pdf',
        type: 'file-to-file',
        seoTitle: 'Repair PDF Online | Online For Free | ToolOmni.co',
        seoDescription: 'Recover data from broken or unopenable PDF files.',
        keywords: ['Repair PDF', 'Recover PDF', 'Fix broken PDF'],
        content: {
            title: 'Repair PDF Online | Online For Free | ToolOmni.co',
            description: 'Recover your data from damaged document structures.',
            steps: ['Upload corrupted PDF', 'Analyze & Fix', 'Download recovered file'],
            features: ['Structure recovery', 'Private', 'Secure']
        }
    },
    {
        id: 'sign-pdf',
        title: 'Sign PDF',
        description: 'Draw or upload your signature to sign PDF documents.',
        iconName: 'Zap',
        category: 'PDF',
        href: '/pdf/sign-pdf',
        type: 'file-to-file',
        seoTitle: 'Sign PDF Online | Online For Free | ToolOmni.co',
        seoDescription: 'Add your legal signature to contracts and forms in seconds.',
        keywords: ['Sign PDF', 'Electronic Signature', 'Digital Sign'],
        content: {
            title: 'Sign PDF Online | Online For Free | ToolOmni.co',
            description: 'Complete your paperwork digitally with a secure signature.',
            steps: ['Upload PDF', 'Draw/Add signature', 'Place on page', 'Download'],
            features: ['Digital signature', 'Secure', 'Local']
        }
    },
    {
        id: 'grayscale-pdf',
        title: 'Grayscale PDF',
        description: 'Convert color PDF pages to black and white for cheap printing.',
        iconName: 'FileText',
        category: 'PDF',
        href: '/pdf/grayscale-pdf',
        type: 'file-to-file',
        seoTitle: 'Grayscale PDF Online | Online For Free | ToolOmni.co',
        seoDescription: 'Save ink and printer costs by converting PDFs to grayscale.',
        keywords: ['Grayscale PDF', 'Black and White PDF', 'Save Ink'],
        content: {
            title: 'Grayscale PDF Online | Online For Free | ToolOmni.co',
            description: 'Turn vibrant colors into professional shades of gray.',
            steps: ['Upload PDF', 'Process to B/W', 'Download'],
            features: ['Perfect for printing', 'HQ grayscale', 'Fast']
        }
    },
    {
        id: 'crop-pdf',
        title: 'Crop PDF',
        description: 'Trim PDF margins or crop specific areas of pages.',
        iconName: 'Zap',
        category: 'PDF',
        href: '/pdf/crop-pdf',
        type: 'file-to-file',
        seoTitle: 'Crop PDF Online | Online For Free | ToolOmni.co',
        seoDescription: 'Adjust the visible area of your PDF pages easily.',
        keywords: ['Crop PDF', 'Trim PDF', 'PDF Margins'],
        content: {
            title: 'Crop PDF Online | Online For Free | ToolOmni.co',
            description: 'Focus on the content by removing large white margins.',
            steps: ['Upload PDF', 'Select crop area', 'Apply', 'Download'],
            features: ['Precise cropping', 'All pages support', 'Secure']
        }
    },
    {
        id: 'n-up-pdf',
        title: 'N-up PDF',
        description: 'Put multiple PDF pages onto a single sheet.',
        iconName: 'Zap',
        category: 'PDF',
        href: '/pdf/n-up-pdf',
        type: 'file-to-file',
        seoTitle: 'N-up PDF Online | Online For Free | ToolOmni.co',
        seoDescription: 'Create handouts by putting 2, 4, or 6 pages on one sheet.',
        keywords: ['N-up PDF', 'Pages per sheet', 'PDF Handout'],
        content: {
            title: 'N-up PDF Online | Online For Free | ToolOmni.co',
            description: 'Save paper by grouping multiple pages into one.',
            steps: ['Upload PDF', 'Select layout (2-up, 4-up)', 'Render', 'Download'],
            features: ['Paper saving', 'Custom layouts', 'HQ output']
        }
    },
    {
        id: 'flatten-pdf',
        title: 'Flatten PDF',
        description: 'Convert interactive form fields into non-editable content.',
        iconName: 'FileText',
        category: 'PDF',
        href: '/pdf/flatten-pdf',
        type: 'file-to-file',
        seoTitle: 'Flatten PDF Online | Online For Free | ToolOmni.co',
        seoDescription: 'Security measure to prevent editing of the finalized PDF.',
        keywords: ['Flatten PDF', 'Lock PDF', 'Non-editable PDF'],
        content: {
            title: 'Flatten PDF Online | Online For Free | ToolOmni.co',
            description: 'Merge form fields and layers into a single static layer.',
            steps: ['Upload PDF form', 'Flatten layers', 'Download static file'],
            features: ['Security boost', 'Formatting lock', 'Private']
        }
    }
];
