const fs = require('fs');
const path = require('path');

const seoDir = path.join(__dirname, '../src/constants/seo');
const seoFiles = fs.readdirSync(seoDir).filter(f => f.endsWith('.ts') && f !== 'types.ts' && f !== 'registry.ts');

let imports = "import { SEOPage } from './types';\n";
let pagesArray = "export const ALL_SEO_PAGES: SEOPage[] = [\n";

seoFiles.forEach(file => {
    const toolId = file.replace('.ts', '');
    const exportName = toolId.toUpperCase().replace(/-/g, '_') + '_SEO_PAGES';
    
    imports += `import { ${exportName} } from './${toolId}';\n`;
    pagesArray += `    ...${exportName},\n`;
});

pagesArray += "];\n\nexport const getSEOPageBySlug = (slug: string) => {\n    return ALL_SEO_PAGES.find(p => p.slug === slug);\n};\n";

const registryContent = `${imports}\n// Aggregate all SEO pages into a single registry\n${pagesArray}`;

fs.writeFileSync(path.join(seoDir, 'registry.ts'), registryContent);

console.log("Registry Regenerated for 100 tools!");
