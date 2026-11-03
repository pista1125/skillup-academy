const fs = require('fs');
const path = require('path');
const swc = require('@swc/core');

function walk(dir) {
  let files = [];
  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      files = files.concat(walk(full));
    } else if (full.endsWith('.tsx') || full.endsWith('.ts')) {
      files.push(full);
    }
  }
  return files;
}

const dir = path.join('src', 'components', 'math', 'grade-9', 'fuggvenyek');
const allFiles = walk(dir);
let errors = 0;

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const isTsx = file.endsWith('.tsx');
  try {
    swc.transformSync(content, {
      filename: file,
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: isTsx
        },
        transform: {
          react: {
            runtime: 'automatic',
            development: true,
            refresh: true
          }
        }
      }
    });
  } catch (err) {
    console.error('SWC ERROR in ' + file + ':\n' + err.message);
    errors++;
  }
}

if (errors === 0) {
  console.log('ALL ' + allFiles.length + ' FILES PASSED SWC TRANSFORM CLEANLY!');
} else {
  console.error(errors + ' files failed SWC transform!');
  process.exit(1);
}

