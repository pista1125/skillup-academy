import fs from 'node:fs';
import path from 'node:path';

const baseTasksDir = 'src/components/math/competency-matrix/tasks';
const targetFile = 'src/components/math/competency-matrix/consolidated_tasks.ts';

function run() {
  if (!fs.existsSync(baseTasksDir)) {
    console.error(`Directory not found: ${baseTasksDir}`);
    return;
  }
  
  const folders = fs.readdirSync(baseTasksDir)
    .filter(f => fs.statSync(path.join(baseTasksDir, f)).isDirectory());
  
  let allTasks = [];
  let fileCount = 0;
  
  for (const folder of folders) {
    if (folder === 'scripts') continue;
    const folderPath = path.join(baseTasksDir, folder);
    const files = fs.readdirSync(folderPath)
      .filter(f => f.endsWith('.js') && f !== 'index.js')
      .sort();
      
    for (const file of files) {
      const content = fs.readFileSync(path.join(folderPath, file), 'utf8')
        .replace('export default', '')
        .trim()
        .replace(/;$/, '');
      allTasks.push(content);
      fileCount++;
    }
  }

  const finalContent = 'export const COMPETENCY_TASKS: any[] = [\n' + allTasks.join(',\n') + '\n];\n';
  fs.writeFileSync(targetFile, finalContent, 'utf8');
  console.log(`Successfully consolidated ${fileCount} tasks into ${targetFile}`);
}

run();
