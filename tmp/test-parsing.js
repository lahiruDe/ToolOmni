
const { PDFDocument } = require('pdf-lib');
const JSZip = require('jszip');

async function testRangeParsing(rangeStr, pageCount) {
    const pagesToExtract = [];
    const parts = rangeStr.split(',').map((s) => s.trim());
    
    parts.forEach((part) => {
        if (part.includes('-')) {
            const [start, end] = part.split('-').map(Number);
            for (let i = start; i <= end; i++) {
                if (i > 0 && i <= pageCount) pagesToExtract.push(i - 1);
            }
        } else {
            const p = Number(part);
            if (p > 0 && p <= pageCount) pagesToExtract.push(p - 1);
        }
    });

    const uniquePages = Array.from(new Set(pagesToExtract)).sort((a, b) => a - b);
    return uniquePages;
}

async function runTests() {
    console.log("Testing range parsing: '1-3, 5' for 10 pages");
    const result1 = await testRangeParsing('1-3, 5', 10);
    console.log("Result:", result1); // Expected: [0, 1, 2, 4]
    
    console.log("Testing range parsing: '2, 4-2' for 5 pages");
    const result2 = await testRangeParsing('2, 4-2', 5);
    console.log("Result:", result2); // Expected: [1] (since 4-2 is invalid loop)
    
    console.log("Testing range parsing: '  1 , 2 ' for 5 pages");
    const result3 = await testRangeParsing('  1 , 2 ', 5);
    console.log("Result:", result3); // Expected: [0, 1]
}

runTests();
