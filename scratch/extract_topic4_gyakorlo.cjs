const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function main() {
  const p = new PDFParse({ data: fs.readFileSync('scratch/OH-MAT912GY__teljes.pdf') });
  const t = await p.getText();
  await p.destroy();
  
  let fullText = '';
  // Extract 8.1 (approx pages 163 to 175)
  for (let i = 162; i < 176; i++) {
    const pageNum = i + 1;
    fullText += `\n\n====================================================\n`;
    fullText += `=== GYAKORLÓ (8.1) PDF OLDAL: ${pageNum} ===\n`;
    fullText += `====================================================\n\n`;
    fullText += t.pages[i]?.text || '';
  }
  
  // Extract 8.2 key transformation pages (approx pages 176 to 195)
  for (let i = 176; i < 196; i++) {
    const pageNum = i + 1;
    fullText += `\n\n====================================================\n`;
    fullText += `=== GYAKORLÓ (8.2) PDF OLDAL: ${pageNum} ===\n`;
    fullText += `====================================================\n\n`;
    fullText += t.pages[i]?.text || '';
  }
  
  // Extract Útmutató / Megoldások for 8.1 (approx pages 529 to 545)
  for (let i = 528; i < 546; i++) {
    const pageNum = i + 1;
    fullText += `\n\n====================================================\n`;
    fullText += `=== GYAKORLÓ ÚTMUTATÁS PDF OLDAL: ${pageNum} ===\n`;
    fullText += `====================================================\n\n`;
    fullText += t.pages[i]?.text || '';
  }

  fs.writeFileSync('scratch/gyakorlo_grade10_topic4.txt', fullText, 'utf-8');
  console.log('Successfully saved scratch/gyakorlo_grade10_topic4.txt (' + fullText.length + ' chars)');
}

main().catch(console.error);

