const fs = require('fs');

const keywords = [
  "Crop image for Instagram Square", "Crop photo for YouTube Thumbnail", "Circular crop online free",
  "Crop picture 16:9 ratio", "Image cropper for Facebook Cover", "Free image cutter online",
  "Crop JPG without losing quality", "Crop PNG transparent background", "Social media image cropper",
  "Perfect aspect ratio cropper", "Crop image to 4:5 ratio", "Crop portrait photo online",
  "Landscape image cropper tool", "Rotate and crop image free", "Flip and crop photo tool",
  "Crop avatar for Discord", "Crop profile picture for LinkedIn", "Crop image for Twitter header",
  "Fast browser image cropper", "Private image cropping tool", "Crop WebP image online",
  "Crop photo to exact pixels", "Visual image cropper UI", "Crop scanned document photo",
  "Image boundary editor free", "Interactive photo cropper tool", "Crop digital art online",
  "Mobile friendly image cropper", "Crop and save as PNG", "Custom dimension picture cutter"
];

function generateSlug(kw) {
    return kw.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

const pages = keywords.map(kw => {
    return `{
        slug: '${generateSlug(kw)}',
        keyword: '${kw}',
        parentToolId: 'crop-image',
        meta_title: '${kw} Online | Fast & Free | ToolOmni.co',
        meta_desc: 'Perfectly ${kw.toLowerCase()} utilizing ToolOmni. Easily remove unwanted backgrounds, secure perfect aspect ratios, and download securely in your browser.',
        h1: '${kw}',
        content: \`
<p>In search of a highly accurate way to <strong>${kw.toLowerCase()}</strong>? ToolOmni provides a robust, browser-operated image cropping environment specifically tailored to effortlessly process visuals while retaining maximum image clarity and total user privacy. Whether you're adjusting platform-specific profile pictures, framing subjects to remove peripheral clutter, or achieving absolute geometric continuity, intelligent photo framing is absolutely crucial for modern media processing.</p>
<p>Utilizing an interactive selection array, our platform allows you to intuitively ${kw.toLowerCase()} by utilizing predefined constraint ratios like 16:9, 1:1, or 4:5, or exclusively define complex boundaries manually via standard freeform tools. Should the source material present spatial difficulties, integrated geometry toggles permit seamless 90-degree rotations alongside instant horizontal or vertical mirroring logic. This significantly accelerates iterative design variations.</p>
<p>Differing fundamentally from remote processing services, this entire extraction calculation activates strictly inside your local machine hardware via native HTML5 Canvas drawing. This local sandbox eliminates bandwidth latency ensuring immediate responsiveness even with multi-megabyte files. Consequently, your personal or proprietary graphical content is never uploaded externally. When you ${kw.toLowerCase()}, the resulting file is rapidly generated in pure lossless or highly compressed formats, ready for immediate digital integration.</p>
        \`,
        faqs: [
            { question: 'Is it completely free to ${kw.toLowerCase()}?', answer: 'Yes, our pro image cropper is completely free to use without any restrictive usage limits or mandatory watermarking.' },
            { question: 'Can I lock the aspect ratio while cropping?', answer: 'Absolutely. You can select standard preset aspect ratios (such as 1:1, 16:9, or 4:5) forcing the selection box to strictly maintain accurate proportions.' },
            { question: 'What happens to my original uploaded image?', answer: 'Nothing. ToolOmni copies your file into a local browser buffer to calculate the geometric extraction. Your original photography never leaves your physical device ensuring perfect confidentiality.' },
            { question: 'Can I export the cropped result as a PNG?', answer: 'Yes! Upon finalizing the coordinates, you can arbitrarily select between JPG, PNG, and WebP formats before engaging the native download trigger.' }
        ]
    }`;
});

let out = `import { SEOPage } from './types';\n\nexport const CROP_IMAGE_SEO_PAGES: SEOPage[] = [\n${pages.join(',\n')}\n];`;
fs.writeFileSync('./src/constants/seo/crop-image.ts', out);
console.log('Done');
