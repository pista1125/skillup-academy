const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function main() {
    const p = new PDFParse({ data: fs.readFileSync('scratch/OH-MAT912GY__teljes.pdf') });
    const t = await p.getText();
    await p.destroy();
    
    // Search for 1.1.1. in pages
    let exercisePages = [];
    t.pages.forEach((page, idx) => {
        if (page.text.includes('1.1.1') || page.text.includes('1.1.2') || page.text.includes('1.1.3')) {
            exercisePages.push(idx + 1);
        }
    });
    console.log('Exercise pages:', exercisePages);
    
    if (exercisePages.length > 0) {
        let firstExPage = exercisePages[0];
        let out = '';
        for (let i = firstExPage - 1; i < firstExPage + 10; i++) {
            out += `\n\n====================== PAGE ${i + 1} ======================\n\n`;
            out += t.pages[i]?.text?.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, ' ') || '';
        }
        fs.writeFileSync('scratch/gyakorlo_exercises.txt', out, 'utf-8');
        console.log('Saved exercises around page', firstExPage);
    }
}

main().catch(console.error);

