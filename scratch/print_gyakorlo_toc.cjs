const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function main() {
  const p = new PDFParse({ data: fs.readFileSync('scratch/OH-MAT912GY__teljes.pdf') });
  const t = await p.getText();
  await p.destroy();
  console.log('=== Page 5 ===\n' + t.pages[4]?.text);
  console.log('=== Page 6 ===\n' + t.pages[5]?.text);
  console.log('=== Page 7 ===\n' + t.pages[6]?.text);
}

main().catch(console.error);

