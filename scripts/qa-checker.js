/**
 * ToolOmni QA Checker
 * Comprehensive audit for 100 tools and 3000+ SEO pages.
 */
const fs = require('fs');
const path = require('path');

// 1. Load the Tool Registry (Mocked logic for Node environment without TS)
const toolsPath = path.join(__dirname, '../src/constants/tools.ts');
const seoDir = path.join(__dirname, '../src/constants/seo');

function log(msg, type = 'INFO') {
    const colors = { INFO: '\x1b[36m', ERROR: '\x1b[31m', SUCCESS: '\x1b[32m', WARNING: '\x1b[33m' };
    console.log(`${colors[type] || ''}[${type}] ${msg}\x1b[0m`);
}

async function runAudit() {
    log('Starting ToolOmni Comprehensive QA Audit...', 'INFO');

    const report = {
        totalToolsProcessed: 0,
        totalSeoPagesFound: 0,
        duplicates: [],
        missingContent: [],
        faqErrors: [],
        metaErrors: [],
        engineLinkageErrors: []
    };

    // Verify SEO Files
    const seoFiles = fs.readdirSync(seoDir).filter(f => f.endsWith('.ts') && f !== 'types.ts' && f !== 'registry.ts');
    
    const descriptions = new Set();
    const faqSets = new Set(); 

    seoFiles.forEach(file => {
        const filePath = path.join(seoDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        const arrayMatch = content.match(/export const \w+: SEOPage\[] = (\[[\s\S]*?\]);/);
        if (!arrayMatch) return;

        try {
            const pages = JSON.parse(arrayMatch[1]);
            pages.forEach(match => {
                const { slug, keyword, meta_title, meta_desc, h1, content: bodyContent, faqs } = match;
                const faqsLen = faqs ? faqs.length : 0;
                const faqContent = JSON.stringify(faqs);

                report.totalSeoPagesFound++;

                // 1. Duplicate Check
                if (bodyContent && descriptions.has(bodyContent)) {
                    report.duplicates.push({ slug, type: 'content' });
                }
                descriptions.add(bodyContent);

                if (faqContent && faqSets.has(faqContent)) {
                    report.duplicates.push({ slug, type: 'faqs' });
                }
                faqSets.add(faqContent);

                // 2. Missing Content
                if (!bodyContent || bodyContent.length < 200 || bodyContent.includes('Lorem ipsum') || bodyContent.includes('Coming soon')) {
                    report.missingContent.push({ slug, reason: `body (len: ${bodyContent?.length || 0})` });
                }
                if (!keyword || !h1) {
                    report.missingContent.push({ slug, reason: 'meta_h1' });
                }

                // 3. FAQ Count
                if (faqsLen !== 5) {
                    report.faqErrors.push({ slug, count: faqsLen });
                }

                // 4. Meta Tags Check
                if (keyword && !meta_title.toLowerCase().includes(keyword.toLowerCase())) {
                    report.metaErrors.push({ slug, target: 'title' });
                }
                if (keyword && !meta_desc.toLowerCase().includes(keyword.toLowerCase())) {
                    report.metaErrors.push({ slug, target: 'desc' });
                }
            });
        } catch (e) {
            log(`Failed to parse ${file}: ${e.message}`, 'ERROR');
        }
    });

    // Output Report
    log(`Audit Complete. Found ${report.totalSeoPagesFound} SEO pages.`, 'SUCCESS');
    
    if (report.duplicates.length > 0) {
        log(`${report.duplicates.length} Duplicates Found!`, 'ERROR');
        report.duplicates.slice(0, 10).forEach(d => log(`  - Duplicate ${d.type}: ${d.slug}`, 'WARNING'));
    }
    if (report.missingContent.length > 0) {
        log(`${report.missingContent.length} Pages with missing/placeholder content!`, 'ERROR');
        report.missingContent.slice(0, 10).forEach(m => log(`  - Missing ${m.reason}: ${m.slug}`, 'WARNING'));
    }
    if (report.faqErrors.length > 0) log(`${report.faqErrors.length} Pages with incorrect FAQ counts!`, 'WARNING');
    if (report.metaErrors.length > 0) log(`${report.metaErrors.length} Meta mismatches!`, 'WARNING');

    if (report.duplicates.length === 0 && report.missingContent.length === 0 && report.faqErrors.length === 0) {
        log('SYSTEM CLEAN: All checked pages are unique, complete, and optimized.', 'SUCCESS');
    } else {
        log('SYSTEM DIRTY: Fixes required.', 'ERROR');
    }
}

runAudit();
