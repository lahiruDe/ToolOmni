const fs = require('fs');

const keywords = [
  "Resize image for Instagram", "Change photo width online", "Resize JPG online free",
  "Proportional image resizer", "Resize photo for passport", "Image dimension changer",
  "Resize PNG without quality loss", "Resize image in CM", "Resize web image",
  "Resize image for Facebook cover", "Custom image resizer", "Online photo resizer tool",
  "Resize image by pixel", "Resize image by percentage", "Fast image resizer online",
  "Resize image for YouTube thumbnail", "Resize image for Twitter", "Resize image for LinkedIn",
  "Resize image for email", "Resize image for website", "Secure image resizer",
  "Resize image Mac", "Resize image Windows", "Browser image resizer",
  "Resize WebP image", "Simple image resizer", "High quality image resizer",
  "Exact dimension image resizer", "Mobile photo resizer", "Free online picture resizer"
];

function generateSlug(kw) {
    return kw.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

const pages = keywords.map(kw => {
    return `{
        slug: '${generateSlug(kw)}',
        keyword: '${kw}',
        parentToolId: 'resize-image',
        meta_title: '${kw} Online | Online For Free | ToolOmni.co',
        meta_desc: 'Perfectly ${kw.toLowerCase()} with ToolOmni. Set exact dimensions, maintain aspect ratios, and download instantly within your secure browser environment.',
        h1: '${kw}',
        content: \`
<p>Are you looking to <strong>${kw.toLowerCase()}</strong> instantly? The ToolOmni Image Resizer is the ultimate browser-based solution designed to help you quickly change image dimensions without compromising quality or security. When preparing visual assets, precise scaling is essential to avoid stretched visuals and ensure compliance with platform-specific requirements like social media banners, passport photos, or professional web graphics.</p>
<p>With our advanced pixel control, you can define exact sizes using pixels (px), percentages (%), or centimeters (cm) depending on your target medium. The intelligent aspect ratio lock guarantees that when you adjust the width, the height calculates automatically to maintain flawless proportions. This eliminates distortion, allowing you to gracefully ${kw.toLowerCase()} regardless of the original dimensions.</p>
<p>Unlike conventional cloud applications, our entire rendering process executes strictly within your device's RAM. Your original photos are never uploaded to a remote server, offering you unrestricted privacy. Seamlessly export your newly sized assets into standard formats like JPG, PNG, and WebP perfectly tuned for modern performance. Try our free resizer today and gain absolute visual control.</p>
        \`,
        faqs: [
            { question: 'Is it free to ${kw.toLowerCase()}?', answer: 'Yes, our sizing tool is completely free with no restrictions on usage or watermarks.' },
            { question: 'Will resizing stretch my image?', answer: 'No. By leaving the Aspect Ratio Lock chain enabled, the proportions will scale accurately without introducing artificial stretching.' },
            { question: 'Are my images uploaded to any server?', answer: 'Absolutely not. ToolOmni operates 100% locally in your web browser. Your private pictures are never transmitted over the internet.' },
            { question: 'Can I resize using centimeters for printing?', answer: 'Yes, you can toggle between px, %, and cm to fit any digital or physical dimension requirement instantly.' },
            { question: 'Which image formats are supported?', answer: 'You can upload JPG, PNG, WebP, and standard image files. You can export back into JPG, PNG, or WebP seamlessly.' }
        ]
    }`;
});

let out = `import { SEOPage } from './types';\n\nexport const RESIZE_IMAGE_SEO_PAGES: SEOPage[] = [\n${pages.join(',\n')}\n];`;
fs.writeFileSync('./src/constants/seo/resize-image.ts', out);
console.log('Done');
