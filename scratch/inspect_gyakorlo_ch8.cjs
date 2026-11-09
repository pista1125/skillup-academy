const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function main() {
  const p = new PDFParse({ data: fs.readFileSync('scratch/OH-MAT912GY__teljes.pdf') });
  const t = await p.getText();
  await p.destroy();
  
  // Chapter 8 starts around page 161
  for (let i = 160; i < 205; i++) {
    const text = t.pages[i]?.text || '';
    const lines = text.split('\n').filter(l => l.trim().length > 0);
    // Find headings or bold lines
    for (let line of lines) {
      if (line.includes('transzform') || line.includes('Másodfokú') || line.includes('másodfokú') || line.includes('Parabola') || line.includes('parabola') || line.includes('8.')) {
        console.log(`P.${i + 1}: ${line.trim().substring(0, 80)}`);
      }
    }
  }
}

main().catch(console.error);

