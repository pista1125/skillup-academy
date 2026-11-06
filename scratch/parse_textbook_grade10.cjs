const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function main() {
    const dataBuffer = fs.readFileSync('scratch/OH-MAT10TA_I__teljes.pdf');
    console.log('PDF read, parsing...');
    
    const parser = new PDFParse({ data: dataBuffer });
    const info = await parser.getInfo();
    console.log('Total pages:', info.pages);
    
    // Scan pages for "Logika" or "Tartalom"
    for (let p = 1; p <= Math.min(25, info.pages); p++) {
        const text = await parser.getPageText(p);
        if (text.includes('Tartalom') || text.includes('TARTALOM') || text.includes('Logika') || text.includes('LOGIKA') || text.includes('állitás') || text.includes('állítás') || text.includes('Igaz')) {
            console.log(`\n================== PAGE ${p} ==================`);
            console.log(text.slice(0, 1500));
        }
    }
    await parser.destroy();
}

main().catch(console.error);
