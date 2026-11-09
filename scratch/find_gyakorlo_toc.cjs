const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function main() {
  const p = new PDFParse({ data: fs.readFileSync('scratch/OH-MAT912GY__teljes.pdf') });
  const t = await p.getText();
  await p.destroy();
  console.log('Total pages in OH-MAT912GY:', t.pages.length);
  for (let i = 0; i < t.pages.length; i++) {
    const text = t.pages[i]?.text || '';
    if (text.includes('TARTALOM') || text.includes('Tartalomjegyzék')) {
      console.log('TOC on page:', i + 1);
      console.log(text.substring(0, 500));
    }
  }
}

main().catch(console.error);

