const fs = require('fs');
const path = require('path');

const TOOLS_DIR = path.join(__dirname, '../src/constants/tools');
const SEO_DIR = path.join(__dirname, '../src/constants/seo');

// 1. Load All Tools
function loadAllTools() {
    const files = fs.readdirSync(TOOLS_DIR).filter(f => f.endsWith('.ts'));
    let tools = [];
    files.forEach(file => {
        const content = fs.readFileSync(path.join(TOOLS_DIR, file), 'utf8');
        // Simple regex to extract IDs instead of full TS parsing
        const idMatches = content.match(/id:\s*'([^']+)'/g);
        if (idMatches) {
            idMatches.forEach(m => {
                const id = m.match(/'([^']+)'/)[1];
                tools.push({ id, filename: file });
            });
        }
    });
    return tools;
}

// 2. Load SEO Files
function getSEOFiles() {
    return fs.readdirSync(SEO_DIR).filter(f => f.endsWith('.ts') && f !== 'registry.ts' && f !== 'types.ts');
}

async function fixConsistency() {
    console.log("Starting ToolOmni Consistency Audit...");
    const tools = loadAllTools();
    const seoFiles = getSEOFiles();
    
    console.log(`Found ${tools.length} tools and ${seoFiles.length} SEO files.`);

    tools.forEach(tool => {
        const expectedFile = `${tool.id}.ts`;
        let actualFile = seoFiles.find(f => f === expectedFile);
        
        if (!actualFile) {
            // Try to find a fuzzy match (e.g. image-upscaler -> upscale-image)
            actualFile = seoFiles.find(f => {
                const base = f.replace('.ts', '');
                const words = base.split('-');
                return words.every(w => tool.id.includes(w)) || tool.id.split('-').every(w => base.includes(w));
            });
            
            if (actualFile) {
                console.log(`[SYNC] Mapping ${actualFile} to tool ID "${tool.id}"`);
                const oldPath = path.join(SEO_DIR, actualFile);
                const newPath = path.join(SEO_DIR, expectedFile);
                
                // Read and update content
                let content = fs.readFileSync(oldPath, 'utf8');
                
                // Update parentToolId (handle both single and double quotes)
                content = content.replace(/"parentToolId":\s*"[^"]+"/g, `"parentToolId": "${tool.id}"`);
                content = content.replace(/'parentToolId':\s*'[^']+'/g, `'parentToolId': '${tool.id}'`);
                
                // Update first slug (handle both single and double quotes)
                const baseSlugRegex = new RegExp(`"slug":\\s*"${actualFile.replace('.ts', '')}"`, 'g');
                content = content.replace(baseSlugRegex, `"slug": "${tool.id}"`);
                
                const baseSlugRegex2 = new RegExp(`'slug':\\s*'${actualFile.replace('.ts', '')}'`, 'g');
                content = content.replace(baseSlugRegex2, `'slug': '${tool.id}'`);

                // Move file
                fs.writeFileSync(newPath, content);
                fs.unlinkSync(oldPath);
            } else {
                console.warn(`[MISSING] Tool "${tool.id}" has no corresponding SEO file!`);
            }
        } else {
            // File exists, but check parentToolId inside
             let content = fs.readFileSync(path.join(SEO_DIR, actualFile), 'utf8');
             if (!content.includes(`"parentToolId": "${tool.id}"`)) {
                 console.log(`[FIX] Syncing parentToolId in ${actualFile} to "${tool.id}"`);
                 content = content.replace(/"parentToolId":\s*"[^"]+"/g, `"parentToolId": "${tool.id}"`);
                 fs.writeFileSync(path.join(SEO_DIR, actualFile), content);
             }
        }
    });

    // Final check for abandoned SEO files
    const finalSEOs = getSEOFiles();
    finalSEOs.forEach(f => {
        const base = f.replace('.ts', '');
        if (!tools.find(t => t.id === base)) {
             // console.log(`[CLEAN] Candidate for removal/rename: ${f}`);
        }
    });

    console.log("Consistency Audit Complete.");
    
    // Regenerate registry.ts
    const exports = getSEOFiles().map(f => {
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
    fs.writeFileSync(path.join(SEO_DIR, 'registry.ts'), registryContent);
    console.log("Registry Regenerated.");
}

fixConsistency();
