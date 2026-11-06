const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function main() {
    const p = new PDFParse({ data: fs.readFileSync('scratch/OH-MAT10TA_I__teljes.pdf') });
    const t = await p.getText();
    await p.destroy();
    
    // Find table of contents
    t.pages.forEach((page, idx) => {
        if (page.text.includes('TARTALOM') || page.text.includes('Tartalomjegyzék') || (page.text.includes('I.') && page.text.includes('Logika'))) {
            if (idx < 10) {
                console.log(`=== TOC on Page ${idx + 1} ===`);
                console.log(page.text);
            }
        }
    });
}

main().catch(console.error);

