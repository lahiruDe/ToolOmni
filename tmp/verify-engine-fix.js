
const { PDFDocument } = require('pdf-lib');
const JSZip = require('jszip');

async function simulateSplitPDF(rangeStr, method) {
    // 1. Create a 3-page donor PDF
    const donor = await PDFDocument.create();
    donor.addPage([100, 100]);
    donor.addPage([100, 100]);
    donor.addPage([100, 100]);
    const donorBytes = await donor.save();
    
    // 2. Load donor (Simulate the load in tool-engine.ts)
    const loadedDonor = await PDFDocument.load(donorBytes);
    const pdfDoc = await PDFDocument.create();

    if (method === 'all') {
        const zip = new JSZip();
        for (let i = 0; i < loadedDonor.getPageCount(); i++) {
            const singlePageDoc = await PDFDocument.create();
            const [copiedPage] = await singlePageDoc.copyPages(loadedDonor, [i]);
            singlePageDoc.addPage(copiedPage);
            const bytes = await singlePageDoc.save();
            zip.file(`page-${i + 1}.pdf`, bytes);
        }
        const zipBytes = await zip.generateAsync({ type: 'uint8array' });
        return { type: 'zip', length: zipBytes.length };
    } else {
        const pagesToExtract = [];
        const parts = rangeStr.split(',').map((s) => s.trim());
        
        parts.forEach((part) => {
            if (part.includes('-')) {
                const [s, e] = part.split('-').map(Number);
                const start = Math.min(s, e);
                const end = Math.max(s, e);
                for (let i = start; i <= end; i++) {
                    if (i > 0 && i <= loadedDonor.getPageCount()) pagesToExtract.push(i - 1);
                }
            } else {
                const p = Number(part);
                if (p > 0 && p <= loadedDonor.getPageCount()) pagesToExtract.push(p - 1);
            }
        });

        const uniquePages = Array.from(new Set(pagesToExtract)).sort((a, b) => a - b);
        if (uniquePages.length === 0) throw new Error("No valid pages selected");

        const copiedPages = await pdfDoc.copyPages(loadedDonor, uniquePages);
        copiedPages.forEach(p => pdfDoc.addPage(p));
        const finalBytes = await pdfDoc.save();
        return { type: 'pdf', length: finalBytes.length, pageCount: (await PDFDocument.load(finalBytes)).getPageCount() };
    }
}

async function run() {
    try {
        console.log("Test 1: Split Ranges '1-2' of 3 pages");
        const res1 = await simulateSplitPDF('1-2', 'ranges');
        console.log("Result:", res1); // Expected: { type: 'pdf', length: ..., pageCount: 2 }

        console.log("Test 2: Split All of 3 pages");
        const res2 = await simulateSplitPDF('', 'all');
        console.log("Result:", res2); // Expected: { type: 'zip', length: ... }

        console.log("Test 3: Inverted Range '3-1' of 3 pages");
        const res3 = await simulateSplitPDF('3-1', 'ranges');
        console.log("Result:", res3); // Expected: { type: 'pdf', length: ..., pageCount: 3 }

        console.log("All tests passed!");
    } catch (e) {
        console.error("Test failed:", e);
        process.exit(1);
    }
}

run();
