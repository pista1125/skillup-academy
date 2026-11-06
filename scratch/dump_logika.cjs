const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function main() {
    const p = new PDFParse({ data: fs.readFileSync('scratch/OH-MAT10TA_I__teljes.pdf') });
    const t = await p.getText();
    await p.destroy();
    
    // Dump pages 7 to 20 into a text file
    let out = '';
    for (let i = 6; i < 25; i++) {
        out += `\n\n====================== PAGE ${i + 1} ======================\n\n`;
        out += t.pages[i]?.text || '';
    }
    fs.writeFileSync('scratch/textbook_grade10_logika.txt', out, 'utf-8');
    console.log('Saved pages 7-25 to scratch/textbook_grade10_logika.txt');
}

main().catch(console.error);

