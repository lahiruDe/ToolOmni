const fs = require('fs');
const path = require('path');

const files = [
    'src/constants/seo/merge-pdf.ts',
    'src/constants/seo/split-pdf.ts',
    'src/constants/seo/compress-pdf.ts',
    'src/constants/seo/pdf-to-word.ts',
    'src/constants/seo/jpg-to-pdf.ts'
];

const suffix = ' | Online For Free | ToolOmni.co';

files.forEach(file => {
    const absolutePath = path.resolve('c:/Users/lahiru/Downloads/ToolOmni-main/ToolOmni-main', file);
    if (!fs.existsSync(absolutePath)) {
        console.log(`File not found: ${absolutePath}`);
        return;
    }

    let content = fs.readFileSync(absolutePath, 'utf8');
    
    // Regular expression to find the keyword and meta_title
    // We look for objects like:
    // {
    //   "keyword": "...",
    //   "meta_title": "..."
    // }
    
    // This regex matches the keyword and then finds the next meta_title in the same object
    const regex = /"keyword":\s*"([^"]+)",\s*"meta_title":\s*"([^"]+)"/g;
    
    let updatedContent = content.replace(regex, (match, keyword, oldTitle) => {
        const newTitle = `${keyword}${suffix}`;
        return `"keyword": "${keyword}",\n        "meta_title": "${newTitle}"`;
    });

    if (content !== updatedContent) {
        fs.writeFileSync(absolutePath, updatedContent, 'utf8');
        console.log(`Updated ${file}`);
    } else {
        console.log(`No changes needed for ${file}`);
    }
});
