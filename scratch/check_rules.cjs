const fs = require('fs');
const path = require('path');

const dir = path.join('src', 'components', 'math', 'grade-9', 'fuggvenyek');
const subfolders = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isDirectory());

console.log(`Found ${subfolders.length} subtopics.`);

for (const folder of subfolders) {
  const folderPath = path.join(dir, folder);
  const files = fs.readdirSync(folderPath);
  const theoryFile = files.find(f => f.endsWith('Theory.tsx'));
  if (theoryFile) {
    const content = fs.readFileSync(path.join(folderPath, theoryFile), 'utf8');
    const hasQuickRule = /quickRule\s*=/.test(content);
    const hasRuleTitle = /ruleTitle\s*=/.test(content);
    const hasRuleFormula = /ruleFormula\s*=/.test(content);
    const hasRule = hasQuickRule || hasRuleTitle || hasRuleFormula;
    console.log(`${folder.padEnd(45)} -> ${hasRule ? 'HAS RULE' : 'MISSING RULE'} (${theoryFile})`);
  } else {
    console.log(`${folder.padEnd(45)} -> NO THEORY FILE`);
  }
}

