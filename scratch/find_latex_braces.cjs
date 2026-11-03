const fs = require('fs');
const path = require('path');

function walk(dir) {
  let files = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) files = files.concat(walk(full));
    else if (full.endsWith('.tsx')) files.push(full);
  }
  return files;
}

const files = walk('src/components/math/grade-9/fuggvenyek');
let count = 0;

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    // Check if line contains \ followed by word character and {
    if (/\\\w+\{/.test(line)) {
      if (!line.includes("{'") && !line.includes('{"') && !line.includes("const ") && !line.includes("let ") && !line.includes("var ")) {
        console.log(`${f}:${idx + 1}: ${line.trim()}`);
        count++;
      }
    }
  });
}

console.log(`Found ${count} candidate lines.`);
