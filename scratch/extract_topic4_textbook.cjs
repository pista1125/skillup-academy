const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function main() {
  const p = new PDFParse({ data: fs.readFileSync('scratch/OH-MAT10TA_I__teljes.pdf') });
  const t = await p.getText();
  await p.destroy();
  
  let fullText = '';
  // PDF pages 69 to 95 (0-indexed: 68 to 94)
  for (let i = 68; i <= 94; i++) {
    const pageNum = i + 1;
    const pageText = t.pages[i]?.text || '';
    fullText += `\n\n====================================================\n`;
    fullText += `=== TANKÖNYV PDF OLDAL: ${pageNum} (Könyv oldal: ~${pageNum - 1}) ===\n`;
    fullText += `====================================================\n\n`;
    fullText += pageText;
  }
  
  fs.writeFileSync('scratch/textbook_grade10_topic4.txt', fullText, 'utf-8');
  console.log('Successfully saved scratch/textbook_grade10_topic4.txt (' + fullText.length + ' chars)');
}

main().catch(console.error);

