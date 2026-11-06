const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function main() {
    const p = new PDFParse({ data: fs.readFileSync('scratch/OH-MAT912GY__teljes.pdf') });
    const t = await p.getText();
    await p.destroy();
    
    let out = '';
    for (let i = 409; i < 425; i++) {
        out += `\n\n====================== PAGE ${i + 1} ======================\n\n`;
        out += t.pages[i]?.text || '';
    }
    fs.writeFileSync('scratch/gyakorlo_grade10_logika.txt', out, 'utf-8');
    console.log('Saved pages 410-425 to scratch/gyakorlo_grade10_logika.txt');
}

main().catch(console.error);

