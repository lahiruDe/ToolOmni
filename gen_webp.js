const fs = require('fs');

const keywords = [
  "Convert JPG to WebP online", "Bulk PNG to WebP converter", "Free WebP converter for WordPress",
  "Image to WebP batch converter", "High quality WebP compression", "Change photo to WebP format",
  "Convert images for Google SEO", "Browser native WebP converter", "Fast WebP generator online",
  "Reduce image size to WebP", "Lossless WebP format converter", "Convert BMP to WebP free",
  "Convert TIFF to WebP online", "WebP converter without losing quality", "Mac WebP converter online",
  "Windows WebP batch converter", "Mobile WebP image converter", "Secure local WebP converter",
  "Private browser WebP generation", "Multiple image to WebP ZIP", "Convert profile picture to WebP",
  "Compress photos to WebP format", "WebP image optimizer tool", "Convert banners to WebP",
  "Convert social media images to WebP", "Web developer WebP tool", "Create WebP assets easily",
  "WebP converter with quality control", "Convert e-commerce photos to WebP", "Fastest JPG to WebP converter"
];

function generateSlug(kw) {
    return kw.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

const pages = keywords.map(kw => {
    return `{
        slug: '${generateSlug(kw)}',
        keyword: '${kw}',
        parentToolId: 'convert-to-webp',
        meta_title: '${kw} | 100% Free & Fast | ToolOmni.co',
        meta_desc: 'Easily ${kw.toLowerCase()} utilizing ToolOmni. Enjoy native browser conversion, batch ZIP downloads, and adjustable quality parameters.',
        h1: '${kw}',
        content: \`
<p>Are you looking to <strong>${kw.toLowerCase()}</strong> instantly? WebP is a modern image format developed by Google that provides superior lossless and lossy compression for web visuals. Using WebP enables webmasters and developers to create smaller, richer images that make the web faster, ensuring exceptional SEO scores and significantly improved user retention rates. ToolOmni provides a comprehensive browser-based solution designed to generate these high-performance assets.</p>
<p>Different from restrictive cloud-based conversion platforms, our utility enables you to batch convert multiple original images—including standard JPGs, PNGs, TIFFs, or BMPs—directly inside your device's RAM. By leveraging native HTML5 canvas technologies, the images are instantly processed using hardware acceleration. You can adjust the quality slider to locate the perfect threshold between pristine visual clarity and the smallest possible file size, seeing an estimated reduction immediately before finalizing the export.</p>
<p>Because the conversion happens 100% locally, your proprietary graphics or personal photographs are never uploaded to our servers, assuring zero digital footprint. Effortlessly extract an automated ZIP archive containing all your processed WebP files. Improve your website's performance, pass core web vitals consistently, and save extensive bandwidth costs today with our highly secure and unrestricted WebP converter.</p>
        \`,
        faqs: [
            { question: 'Is it free to ${kw.toLowerCase()}?', answer: 'Yes! Our WebP converter is completely free to use without any restrictive usage limits, watermarks, or account registration requirements.' },
            { question: 'Will this tool upload my images to a server?', answer: 'Absolutely not. ToolOmni operates securely within your browser\\'s local RAM. Your images never leave your computer, ensuring absolute privacy.' },
            { question: 'Can I compress multiple images at once?', answer: 'Yes. You can upload dozens of images in a single batch, adjust the compression quality, and download them all at once via a unified ZIP file.' },
            { question: 'Why should I convert to WebP?', answer: 'WebP uses advanced predictive coding to encode an image, typically resulting in file sizes 25-34% smaller than comparable JPEG images without visible quality loss, significantly boosting website load speeds.' }
        ]
    }`;
});

let out = "import { SEOPage } from './types';\n\nexport const CONVERT_TO_WEBP_SEO_PAGES: SEOPage[] = [\n" + pages.join(',\n') + "\n];";
fs.writeFileSync('./src/constants/seo/convert-to-webp.ts', out);
console.log('Done');
