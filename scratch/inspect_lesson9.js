const fs = require('fs');

function inspectPdf(filename) {
  if (!fs.existsSync(filename)) {
    console.log('File not found:', filename);
    return;
  }
  const buf = fs.readFileSync(filename);
  console.log('Read', filename, 'size:', buf.length);
  // Simple scan for "9. lecke" or page numbers around 40
  const str = buf.toString('latin1');
  let idx = 0;
  while ((idx = str.indexOf('9. lecke', idx)) !== -1) {
    console.log('--- Found at index:', idx);
    console.log(str.substring(idx, idx + 800).replace(/[^a-zA-Z0-9áéíóöőúüűÁÉÍÓÖŐÚÜŰ.,;:\-+= \n]/g, ' '));
    idx += 8;
  }
}

inspectPdf('scratch/OH-MAT10TA_I__teljes.pdf');

