const fs = require('fs');
const path = require('path');

const dir = path.join('src', 'components', 'math', 'grade-9', 'fuggvenyek');
const subfolders = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isDirectory());

for (const folder of subfolders) {
  const folderPath = path.join(dir, folder);
  const files = fs.readdirSync(folderPath);
  const quizFile = files.find(f => f.endsWith('Quiz.tsx'));
  if (quizFile) {
    const content = fs.readFileSync(path.join(folderPath, quizFile), 'utf8');
    const mTitle = content.match(/\btitle="([^"]+)"/) || content.match(/\bquizTitle="([^"]+)"/);
    const mSub = content.match(/\bsubtitle="([^"]+)"/) || content.match(/\bquizSubtitle="([^"]+)"/);
    console.log(`${quizFile.padEnd(28)} -> Title: "${mTitle ? mTitle[1] : 'NONE'}" | Subtitle: "${mSub ? mSub[1].slice(0, 40) + '...' : 'NONE'}"`);
  }
}

