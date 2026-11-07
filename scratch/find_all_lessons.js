import fs from 'fs';
import zlib from 'zlib';

const buf = fs.readFileSync('scratch/OH-MAT10TA_I__teljes.pdf');

let pos = 0;
while (true) {
  let sStart = buf.indexOf(Buffer.from('stream'), pos);
  if (sStart === -1) break;
  let dataStart = sStart + 6;
  if (buf[dataStart] === 0x0d && buf[dataStart+1] === 0x0a) dataStart += 2;
  else if (buf[dataStart] === 0x0a || buf[dataStart] === 0x0d) dataStart += 1;

  let sEnd = buf.indexOf(Buffer.from('endstream'), dataStart);
  if (sEnd === -1) break;
  let dataEnd = sEnd;
  while (dataEnd > dataStart && (buf[dataEnd-1] === 0x0a || buf[dataEnd-1] === 0x0d)) dataEnd--;

  const slice = buf.subarray(dataStart, dataEnd);
  try {
    const dec = zlib.inflateSync(slice).toString('latin1');
    if (dec.includes('lec k e') || dec.includes('lecke')) {
      const match = dec.match(/\d+\.\s*lec\s*k\s*e[^\n\r]{0,80}/gi);
      if (match) {
        console.log(match.join(' | '));
      }
    }
  } catch (e) {}
  pos = sEnd + 9;
}

