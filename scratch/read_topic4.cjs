const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function main() {
  const p = new PDFParse({ data: fs.readFileSync('scratch/OH-MAT10TA_I__teljes.pdf') });
  const t = await p.getText();
  await p.destroy();
  for (let i = 65; i <= 96; i++) {
    const text = t.pages[i]?.text || '';
    const lines = text.trim().split('\n').filter(l => l.trim().length > 0).slice(0, 3).join(' | ');
    console.log('Page ' + (i + 1) + ': ' + lines.substring(0, 100));
  }
}

main().catch(console.error);

