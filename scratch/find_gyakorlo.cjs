const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function main() {
    const p = new PDFParse({ data: fs.readFileSync('scratch/OH-MAT912GY__teljes.pdf') });
    const t = await p.getText();
    await p.destroy();
    
    console.log('Total pages in OH-MAT912GY:', t.pages.length);
    
    // Look for Logika
    let matches = [];
    t.pages.forEach((page, idx) => {
        if (page.text.includes('Logika') || page.text.includes('LOGIKA') || page.text.includes('Igaz vagy hamis') || page.text.includes('IGAZ VAGY HAMIS')) {
            matches.push(idx + 1);
        }
    });
    console.log('Matches on pages:', matches.slice(0, 30));
    
    if (matches.length > 0) {
        let out = '';
        for (let pageNum of matches.slice(0, 15)) {
            out += `\n\n====================== PAGE ${pageNum} ======================\n\n`;
            out += t.pages[pageNum - 1].text;
        }
        fs.writeFileSync('scratch/gyakorlo_grade10_logika.txt', out, 'utf-8');
        console.log('Saved matches to scratch/gyakorlo_grade10_logika.txt');
    }
}

main().catch(console.error);

