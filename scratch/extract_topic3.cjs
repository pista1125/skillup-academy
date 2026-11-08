const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function main() {
  const p = new PDFParse({ data: fs.readFileSync('scratch/OH-MAT10TA_I__teljes.pdf') });
  const t = await p.getText();
  await p.destroy();
  
  let out = '';
  for (let i = 45; i < 75; i++) {
    const text = t.pages[i]?.text || '';
    if (text.includes('13.') || text.toLowerCase().includes('egész kitevőjű')) {
      console.log('Found on page:', i + 1);
    }
    out += '\n\n====================== PAGE ' + (i + 1) + ' ======================\n\n' + text;
  }
  fs.writeFileSync('scratch/textbook_grade10_topic3.txt', out, 'utf-8');
  console.log('Saved Topic III pages to scratch/textbook_grade10_topic3.txt');
}
main().catch(console.error);

