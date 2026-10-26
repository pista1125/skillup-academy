const fs = require('fs');

const text = fs.readFileSync('C:/Users/Istvan/.gemini/antigravity-ide/brain/c656c28f-d9c1-4ae0-a0fc-efb8548cca8f/tanmenet_text.txt', 'utf8');
const clean = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

// Find "II." or "törtek" or "számok világa"
console.log('--- ALL LESSONS ---');
const regex = /(\d+\.\s*óra[^\.]*lecke[^\)]*\))/gi;
let m;
while ((m = regex.exec(clean)) !== null) {
  console.log(m[0]);
}

// Find matches around "Számolás törtekkel"
const idx = clean.indexOf('törtekkel');
if (idx !== -1) {
  console.log('--- AROUND törtekkel ---');
  console.log(clean.substring(Math.max(0, idx - 200), idx + 600));
} else {
  console.log('Not found');
}
