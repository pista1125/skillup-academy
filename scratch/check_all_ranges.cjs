const fs = require('fs');
const path = require('path');

const dir = path.join('src', 'components', 'math', 'grade-9', 'fuggvenyek');
const subfolders = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isDirectory());

for (const folder of subfolders) {
  const p = path.join(dir, folder);
  const qFile = fs.readdirSync(p).find(f => f.endsWith('Quiz.tsx'));
  if (qFile) {
    const content = fs.readFileSync(path.join(p, qFile), 'utf8');
    const ranges = [...content.matchAll(/range:\s*['"]([^'"]+)['"]/g)].map(m => m[1]);
    console.log(`${qFile.padEnd(28)} -> ${ranges.join(' | ')}`);
  }
}

