const fs = require('fs');
const path = require('path');

const files = [
    'src/constants/tools/pdf.ts',
    'src/constants/tools/image.ts'
];

const suffix = ' | Online For Free | ToolOmni.co';

files.forEach(file => {
    const absolutePath = path.resolve('c:/Users/lahiru/Downloads/ToolOmni-main/ToolOmni-main', file);
    if (!fs.existsSync(absolutePath)) return;

    let content = fs.readFileSync(absolutePath, 'utf8');
    
    // This is a rough way to split by tool objects, assuming each starts with { and ends with },
    // and they are elements of an array.
    // However, a simple regex for the whole file might be better if we scope it correctly.
    
    // Let's use a non-greedy match that doesn't cross the start of another tool.
    // A tool starts with { and has an `id: '...'`.
    
    const toolBlocks = content.split(/\{(?=\s*id:\s*')/);
    const updatedBlocks = toolBlocks.map((block, index) => {
        if (index === 0) return block; // Header of file
        
        // Extract the title
        const titleMatch = block.match(/title:\s*'([^']+)'/);
        if (!titleMatch) return block;
        const mainTitle = titleMatch[1];
        
        const newSeoTitle = `${mainTitle} Online${suffix}`;
        
        // Update seoTitle ONLY within this block
        let updatedBlock = block.replace(/seoTitle:\s*'([^']+)'/, `seoTitle: '${newSeoTitle}'`);
        
        // Update content.title ONLY within this block if it's generic
        updatedBlock = updatedBlock.replace(/content:\s*{[\s\S]*?title:\s*'([^']+)'/, (match, oldContentTitle) => {
             return match.replace(oldContentTitle, newSeoTitle);
        });
        
        return updatedBlock;
    });

    content = updatedBlocks.join('{');
    fs.writeFileSync(absolutePath, content, 'utf8');
    console.log(`Fixed ${file}`);
});
