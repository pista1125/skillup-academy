import fs from 'node:fs';
import path from 'node:path';

const baseDir = 'C:/Users/Istvan/PycharmProjects/kompetencia/app/server/data';
const targetDir = 'c:/Users/Istvan/PycharmProjects/skillup-academy/src/data';

function processTasks() {
  const taxonomy = fs.readFileSync(path.join(baseDir, 'taxonomy.js'), 'utf8')
    .replace('export const contentAreas =', 'export const CONTENT_AREAS =')
    .replace('export const thinkingLevels =', 'export const THINKING_LEVELS =')
    .replace('export const taxonomy =', '//');

  const tasksDir = path.join(baseDir, 'tasks');
  const folders = fs.readdirSync(tasksDir).filter(f => fs.statSync(path.join(tasksDir, f)).isDirectory());
  
  let allTasks = [];
  for (const folder of folders) {
    if (folder === 'scripts') continue;
    const files = fs.readdirSync(path.join(tasksDir, folder)).filter(f => f.endsWith('.js') && f !== 'index.js');
    for (const file of files) {
      const content = fs.readFileSync(path.join(tasksDir, folder, file), 'utf8')
        .replace('export default', '')
        .trim()
        .replace(/;$/, '');
      allTasks.push(content);
    }
  }

  const finalContent = taxonomy + '\nexport const COMPETENCY_TASKS = [\n' + allTasks.join(',\n') + '\n];\n';
  fs.writeFileSync(path.join(targetDir, 'competencyMatrixTasks.ts'), finalContent, 'utf8');
}

function processTests() {
  const pmDir = path.join(baseDir, 'probameres');
  const folders = fs.readdirSync(pmDir).filter(f => fs.statSync(path.join(pmDir, f)).isDirectory()).sort();
  
  let allTests = [];
  for (const folder of folders) {
    let title = `${folder}. próbamérés`;
    const metaPath = path.join(pmDir, folder, 'meta.js');
    if (fs.existsSync(metaPath)) {
      const meta = fs.readFileSync(metaPath, 'utf8');
      const match = meta.match(/title:\s*'(.+?)'/);
      if (match) title = match[1];
    }
    
    const files = fs.readdirSync(path.join(pmDir, folder))
      .filter(f => f.endsWith('.js') && f !== 'index.js' && f !== 'meta.js')
      .sort();
    
    let testTasks = [];
    for (const file of files) {
      const content = fs.readFileSync(path.join(pmDir, folder, file), 'utf8')
        .replace('export default', '')
        .trim()
        .replace(/;$/, '');
      testTasks.push(content);
    }
    
    allTests.push(`{ id: '${folder}', title: '${title}', tasks: [\n${testTasks.join(',\n')}\n] }`);
  }

  const finalContent = 'export const PRACTICE_TESTS = [\n' + allTests.join(',\n') + '\n];\n';
  fs.writeFileSync(path.join(targetDir, 'competencyPracticeTests.ts'), finalContent, 'utf8');
}

processTasks();
processTests();
console.log('Consolidation complete.');
