const fs = require('fs');
const path = require('path');

const dir = path.join('src', 'components', 'math', 'grade-9', 'fuggvenyek');
const subfolders = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isDirectory());

for (const folder of subfolders) {
  const folderPath = path.join(dir, folder);
  const files = fs.readdirSync(folderPath);
  const theoryFile = files.find(f => f.endsWith('Theory.tsx'));
  if (theoryFile) {
    const content = fs.readFileSync(path.join(folderPath, theoryFile), 'utf8');
    const m = content.match(/quickRule=\{\s*\{([\s\S]*?)\}\s*\}/) || content.match(/ruleTitle="([^"]*)"[\s\S]*?ruleFormula=\{?([^}\n"]*)\}?/);
    if (m) {
      console.log(`=== ${folder} ===\n${m[0].slice(0, 150)}...\n`);
    } else {
      console.log(`=== ${folder} === -> NO RULE\n`);
    }
  }
}

