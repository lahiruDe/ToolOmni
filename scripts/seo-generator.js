const fs = require('fs');
const path = require('path');

const TOOLS_DIR = path.join(__dirname, '../src/constants/tools');
const SEO_OUTPUT_DIR = path.join(__dirname, '../src/constants/seo');

// Comprehensive Keyword Factory
const KEYWORD_POOLS = {
    'PDF': ['for legal', 'no sign-up', 'for students', 'online securely', 'high speed', 'pro quality', 'without registration', 'on mac', 'for university', 'safely'],
    'IMAGE': ['hd quality', 'for real estate', 'anonymously', 'fast', 'pro resolution', 'for developers', 'lossless', 'bulk', 'without quality loss', 'on chrome'],
    'VIDEO': ['no watermark', 'fastest', 'for social media', 'high bitrate', 'without lag', 'for creators', 'securely', 'optimized', 'for mobile', 'on windows'],
    'WRITING': ['ai powered', 'for business', 'plagiarism free', 'natural', 'for essays', 'professional', 'instant', 'unlimited', 'for writers', 'best'],
    'UTILITY': ['simple', 'clean', 'functional', 'developer tools', 'for workflow', 'efficient', 'one-click', 'accurate', 'reliable', 'pro']
};

const TEMPLATE_MODS = [
    "The Authority on {keyword}",
    "Next-Gen {keyword} Implementation",
    "Professional {keyword} for Free",
    "Zero-Waste {keyword} Workflow",
    "High-Fidelity {keyword} Solution",
    "Sovereign {keyword} Processing"
];

function generateUniqueKeywords(title, category) {
    const pool = KEYWORD_POOLS[category] || KEYWORD_POOLS['UTILITY'];
    const toolKeywords = [];
    
    // Add 30 unique variations
    for(let i = 0; i < 30; i++) {
        const mod = pool[i % pool.length];
        const subMod = i >= pool.length ? ` ${Math.floor(i/pool.length) + 1}` : ""; 
        toolKeywords.push(`${title} ${mod}${subMod}`);
    }
    return toolKeywords;
}

function loadAllTools() {
    const files = fs.readdirSync(TOOLS_DIR).filter(f => f.endsWith('.ts'));
    let tools = [];
    files.forEach(file => {
        const content = fs.readFileSync(path.join(TOOLS_DIR, file), 'utf8');
        const categoryMatch = file.replace('.ts', '').toUpperCase();
        
        // PAIR ID AND TITLE ROBUSTLY
        const toolRegex = /id:\s*'([^']+)',\s*title:\s*'([^']+)'/gs;
        let match;
        while ((match = toolRegex.exec(content)) !== null) {
            tools.push({ 
                id: match[1], 
                title: match[2], 
                category: categoryMatch 
            });
        }
    });
    return tools;
}

function generateSEOFile(tool) {
    const toolId = tool.id;
    const title = tool.title;
    const category = tool.category;
    const keywords = generateUniqueKeywords(title, category);
    
    let pages = [];
    keywords.forEach((keyword, i) => {
        // Unique slug: ensure toolId at start
        const cleanMod = keyword.toLowerCase().replace(title.toLowerCase(), '').trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const slug = i === 0 ? toolId : `${toolId}-${cleanMod}`.replace(/-+/g, '-').replace(/-$/, '');
        
        const displayK = keyword.charAt(0).toUpperCase() + keyword.slice(1);
        let metaTitle = `${displayK} | 100% Free`;
        if (metaTitle.length > 60) metaTitle = metaTitle.substring(0, 57) + "...";
        
        const templateIdx = i % TEMPLATE_MODS.length;
        const mainTitle = TEMPLATE_MODS[templateIdx].replace('{keyword}', keyword);

        pages.push({
            slug,
            parentToolId: toolId,
            keyword,
            meta_title: metaTitle,
            meta_desc: `Professional ${keyword} solution. High-fidelity, secure, and free ${title} tool for any device with zero wait time.`,
            h1: displayK,
            content: `<h2>${mainTitle}</h2><p>ToolOmni presents a high-fidelity ${title} solution specifically optimized for ${keyword}. In a professional landscape where efficiency meets privacy, our local-RAM engine ensures your data never leaves your device while delivering pixel-perfect results. This is the zero-waste standard for modern workflows.</p><h3>High-Performance Metrics</h3><p>Whether you're managing ${keyword} for critical documentation or creative assets, our platform provides the precision you demand. Unlike cloud-heavy services, we focus on processing at the edge, reducing latency and maximizing quality. Experience ${title} with the stability of a desktop app and the speed of the web.</p><h3>Secure and Sovereign</h3><p>By bypassing traditional server uploads, we eliminate the primary risk associated with ${keyword}. Your files are processed entirely in your browser's memory, ensuring that your workflow is not just fast, but inherently anonymous. Join the pro league of users who prioritize security for their ${title} tasks.</p>`,
            faqs: [
                { question: `Is ${keyword} really safe?`, answer: `Absolutely. Our engine handles everything locally in your RAM, meaning no data is ever uploaded to our servers. Your privacy for ${keyword} is 100% guaranteed.` },
                { question: `Does ${keyword} degrade quality?`, answer: `No, we use lossless technology to ensure that the fidelity of your ${title} results remains professional-grade and ready for high-resolution use.` },
                { question: `Is there a cost for unlimited ${keyword}?`, answer: `None at all. ToolOmni offers 100% free services as part of our commitment to accessible, pro-quality web tools.` },
                { question: `What devices support ${keyword}?`, answer: `Any modern browser on Mac, Windows, Android, or iOS is fully compatible with our tool for all ${keyword} tasks.` },
                { question: `How fast is ${keyword}?`, answer: `Processing usually takes less than a second. Our zero-waste architecture is optimized for instant response times.` }
            ]
        });
    });

    const fileContent = `import { SEOPage } from './types';\n\nexport const ${toolId.toUpperCase().replace(/-/g, '_')}_SEO_PAGES: SEOPage[] = ${JSON.stringify(pages, null, 4)};`;
    fs.writeFileSync(path.join(SEO_OUTPUT_DIR, `${toolId}.ts`), fileContent);
}

function run() {
    console.log("Starting CORRECTED REGISTRY-DRIVEN SEO GENERATION (100 tools x 30 pages)...");
    const tools = loadAllTools();
    
    // Clear old SEO files
    const files = fs.readdirSync(SEO_OUTPUT_DIR).filter(f => f.endsWith('.ts') && f !== 'registry.ts' && f !== 'types.ts');
    files.forEach(f => fs.unlinkSync(path.join(SEO_OUTPUT_DIR, f)));

    tools.forEach(tool => {
        generateSEOFile(tool);
    });

    console.log(`Successfully generated SEO profiles for ${tools.length} tools.`);

    // Regenerate registry.ts
    const finalSEOs = fs.readdirSync(SEO_OUTPUT_DIR).filter(f => f.endsWith('.ts') && f !== 'registry.ts' && f !== 'types.ts');
    const exports = finalSEOs.map(f => {
        const base = f.replace('.ts', '');
        const varName = base.toUpperCase().replace(/-/g, '_') + '_SEO_PAGES';
        return { base, varName };
    });

    const registryContent = `
import { SEOPage } from './types';
${exports.map(e => `import { ${e.varName} } from './${e.base}';`).join('\n')}

export const ALL_SEO_PAGES: SEOPage[] = [
    ${exports.map(e => `...${e.varName}`).join(',\n    ')}
];

export function getSEOPageBySlug(slug: string): SEOPage | undefined {
    return ALL_SEO_PAGES.find(p => p.slug === slug);
}
`;
    fs.writeFileSync(path.join(SEO_OUTPUT_DIR, 'registry.ts'), registryContent);
    console.log("Registry Regenerated.");
}

run();
