import fs from 'node:fs';
import path from 'node:path';

const baseTasksDir = 'src/components/math/competency-matrix/tasks';
const practiceTestsDir = 'src/components/math/competency-matrix/practice-tests';

const cells = [
  'M-T', 'M-A', 'M-K',
  'H-T', 'H-A', 'H-K',
  'A-T', 'A-A', 'A-K',
  'S-T', 'S-A', 'S-K'
];

// Read all tasks from the 12 cells
const cellTasks = {};
for (const cell of cells) {
  const dir = path.join(baseTasksDir, cell);
  const files = fs.readdirSync(dir)
    .filter(x => x.endsWith('.js') && x !== 'index.js')
    .sort();
  
  cellTasks[cell] = files.map(file => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf8')
      .replace('export default', '')
      .trim()
      .replace(/;$/, '');
    return raw;
  });
}

// Generate 10 practice tests
for (let t = 0; t < 10; t++) {
  const testNum = String(t + 1).padStart(2, '0');
  const testId = `PM-${testNum}`;
  const testTitle = `${t + 1}. Országos Kompetenciamérés Próbateszt`;
  
  const selectedTaskStrings = [];
  
  // Phase 1: Level T (Knowledge & Direct application) - 4 content areas
  // 2 tasks from each of M-T, H-T, A-T, S-T
  const tCells = ['M-T', 'H-T', 'A-T', 'S-T'];
  for (const cell of tCells) {
    selectedTaskStrings.push(cellTasks[cell][t * 3]);
    selectedTaskStrings.push(cellTasks[cell][t * 3 + 1]);
  }
  
  // Phase 2: Level A (Application & Modeling) - 4 content areas
  // 2 tasks from each of M-A, H-A, A-A, S-A
  const aCells = ['M-A', 'H-A', 'A-A', 'S-A'];
  for (const cell of aCells) {
    selectedTaskStrings.push(cellTasks[cell][t * 3]);
    selectedTaskStrings.push(cellTasks[cell][t * 3 + 1]);
  }
  
  // Phase 3: Level K (Reasoning & Problem solving) - 4 content areas
  // 2 tasks from each of M-K, H-K, A-K, S-K
  const kCells = ['M-K', 'H-K', 'A-K', 'S-K'];
  for (const cell of kCells) {
    selectedTaskStrings.push(cellTasks[cell][t * 3]);
    selectedTaskStrings.push(cellTasks[cell][t * 3 + 1]);
  }
  
  // 24 tasks drawn so far. Now draw 7 extra tasks (the 3rd task at index t*3 + 2)
  // Rotated across tests so all content areas get balanced extra tasks
  const extraOrder = [
    'M-T', 'H-T', 'A-T', 'S-T',
    'M-A', 'H-A', 'A-A', 'S-A',
    'M-K', 'H-K', 'A-K', 'S-K'
  ];
  
  for (let i = 0; i < 7; i++) {
    const cellIdx = (i + t * 7) % 12;
    const cell = extraOrder[cellIdx];
    selectedTaskStrings.push(cellTasks[cell][t * 3 + 2]);
  }
  
  // Create test file content
  const targetDir = path.join(practiceTestsDir, testNum);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  const fileContent = `export interface Task {
  id: string;
  contentArea: string;
  thinkingLevel: string;
  title: string;
  difficulty: number;
  scenario?: string;
  question: string;
  visual?: any;
  options?: string[];
  answer: string;
  keywords?: string[];
  solution: string;
}

export interface PracticeTest {
  id: string;
  title: string;
  tasks: Task[];
}

export const practiceTest${testNum}: PracticeTest = {
  id: '${testId}',
  title: '${testTitle}',
  tasks: [
${selectedTaskStrings.join(',\n')}
  ]
};

export default practiceTest${testNum};
`;

  const targetFile = path.join(targetDir, 'index.ts');
  fs.writeFileSync(targetFile, fileContent, 'utf8');
  console.log(`Generated ${targetFile} with ${selectedTaskStrings.length} tasks`);
}

// Generate practice-tests/index.ts
let indexContent = `// Practice Tests 01-10 aggregated export
`;
for (let t = 1; t <= 10; t++) {
  const num = String(t).padStart(2, '0');
  indexContent += `import practiceTest${num} from './${num}';\n`;
}

indexContent += `\nexport const ALL_PRACTICE_TESTS = [\n`;
for (let t = 1; t <= 10; t++) {
  const num = String(t).padStart(2, '0');
  indexContent += `  practiceTest${num},\n`;
}
indexContent += `];\n\n`;

for (let t = 1; t <= 10; t++) {
  const num = String(t).padStart(2, '0');
  indexContent += `export { practiceTest${num} } from './${num}';\n`;
}

fs.writeFileSync(path.join(practiceTestsDir, 'index.ts'), indexContent, 'utf8');
console.log(`Generated ${path.join(practiceTestsDir, 'index.ts')}`);
