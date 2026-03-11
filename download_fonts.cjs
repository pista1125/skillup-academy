const https = require('https');
const fs = require('fs');
const path = require('path');

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Node' } }, response => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // Handle explicit redirect
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', err => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function main() {
  await downloadFile('https://github.com/google/fonts/raw/main/ofl/roboto/Roboto-Regular.ttf', path.join(__dirname, 'src/assets/fonts/Roboto-Regular.ttf'));
  console.log('Downloaded Regular');
  await downloadFile('https://github.com/google/fonts/raw/main/ofl/roboto/Roboto-Bold.ttf', path.join(__dirname, 'src/assets/fonts/Roboto-Bold.ttf'));
  console.log('Downloaded Bold');
}

main().catch(console.error);
