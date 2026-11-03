const fs = require('fs');
const path = require('path');

const dir = path.join('src', 'components', 'math', 'grade-9', 'fuggvenyek');
const subfolders = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isDirectory() && f !== 'gyakorlas-tudasproba');

for (const folder of subfolders) {
  const folderPath = path.join(dir, folder);
  const files = fs.readdirSync(folderPath);
  const quizFile = files.find(f => f.endsWith('Quiz.tsx'));
  if (quizFile) {
    const content = fs.readFileSync(path.join(folderPath, quizFile), 'utf8');
    const qMatches = content.match(/id:\s*['"][^'"]+['"]/g) || [];
    console.log(`${quizFile.padEnd(28)} -> ${qMatches.length} questions`);
  }
}

