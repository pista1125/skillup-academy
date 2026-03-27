import fs from 'fs';
import path from 'path';

const SRC_MATH = path.join(process.cwd(), 'src', 'components', 'math');

const MAPPINGS = {
  // Shared Components
  'ActivityPlaceholder.tsx': ['shared'],
  'MathTopicCard.tsx': ['shared'],
  'SectionHeader.tsx': ['shared'],
  'ScrollSpySidebar.tsx': ['shared'],
  'HorizontalTopicNav.tsx': ['shared'],
  'LessonViewer.tsx': ['shared'],
  'MaterialGallery.tsx': ['shared'],
  'MathQuiz.tsx': ['shared'],

  // Games
  'SudokuGame.tsx': ['games'],
  'MathSnakeGame.tsx': ['games'],
  'MemoryGame.tsx': ['games'],
  'MemoryEditor.tsx': ['games'],
  'HanoiGame.tsx': ['games'],
  'TowerBuilderGame.tsx': ['games'],
  'ChessGame.tsx': ['games'],
  'ChessLobby.tsx': ['games'],
  'ChessBoardUI.tsx': ['games'],
  'MathColoringGame.tsx': ['games'],
  'LogicBlocksGame.tsx': ['games'],
  'VennDiagramGame.tsx': ['games'],
  'GroupingGame.tsx': ['games'],
  'NumberGroupingGame.tsx': ['games'],
  'VennReadingGame.tsx': ['games'],
  'AxialSymmetryGame.tsx': ['games'],
  'SymmetryErrorGame.tsx': ['games'],
  'AuditoryMemoryGame.tsx': ['games'],
  'CirclePartsGame.tsx': ['games'],

  // Tools
  'DivisibilityTool.tsx': ['tools'],
  'LongDivisionTool.tsx': ['tools'],
  'DecimalFractionsTool.tsx': ['tools'],
  'DecimalShifterTool.tsx': ['tools'],
  'EquationSolverTool.tsx': ['tools'],
  'EquationBalanceTool.tsx': ['tools'],
  'MoneyCalculationTool.tsx': ['tools'],
  'PuzzleMakerTool.tsx': ['tools'],
  'TotoTool.tsx': ['tools'],
  'NumberLineTool.tsx': ['tools'],
  'ConstructionTool.tsx': ['tools'],
  'SymmetryConstructionTool.tsx': ['tools'],
  'SudokuGeneratorTool.tsx': ['tools'],
  'WordSearchTool.tsx': ['tools'],
  'MatchingCreator.tsx': ['tools'],
  'FractionVisualizer.tsx': ['tools'],
  'ManipulativeDivision.tsx': ['tools'],

  // Grades 1-4 basics
  'Grade1Addition.tsx': ['grade-1'],
  'Grade1MathModule.tsx': ['grade-1'],
  'Grade2MathModule.tsx': ['grade-2'],
  'Grade3MathModule.tsx': ['grade-3'],

  // Grade 4-6 topics
  'FractionsModule.tsx': ['grade-4', 'grade-5', 'grade-6'],
  'FractionsQuiz.tsx': ['grade-4', 'grade-5', 'grade-6'],
  'FractionDivisionMatcher.tsx': ['grade-6'],
  'FractionMultiplicationMatcher.tsx': ['grade-6'],
  'FractionToDecimalMatcher.tsx': ['grade-5', 'grade-6'],
  'FractionVisualMatcher.tsx': ['grade-4', 'grade-5', 'grade-6'],
  'FractionsClosingTest.tsx': ['grade-6'],
  'FractionsClosingTestData.ts': ['grade-6'],

  'DivisibilityPowersModule.tsx': ['grade-6', 'grade-7'],
  'DivisibilityQuiz.tsx': ['grade-6', 'grade-7'],
  'LCMQuiz.tsx': ['grade-6', 'grade-7'],
  'GCDQuiz.tsx': ['grade-6', 'grade-7'],
  'PrimeFactorization.tsx': ['grade-6', 'grade-7'],
  'PrimeFactorizationMatcher.tsx': ['grade-6', 'grade-7'],

  // Decimals (G4-6)
  'DecimalFractionsQuiz.tsx': ['grade-5', 'grade-6'],
  'DecimalMultiplicationQuiz.tsx': ['grade-5', 'grade-6'],
  'DecimalDivisionQuiz.tsx': ['grade-5', 'grade-6'],
  'DecimalMultiplicationMatcher.tsx': ['grade-5', 'grade-6'],
  'DecimalDivisionMatcher.tsx': ['grade-5', 'grade-6'],

  // Geometry
  'GeometryModule.tsx': ['grade-5', 'grade-6', 'grade-7'],
  'Grade7GeometryModule.tsx': ['grade-7'],
  'AngleMatcher.tsx': ['grade-7'],
  'ShapeClassifier.tsx': ['grade-4', 'grade-5', 'grade-6'],
  'LineRelationships.tsx': ['grade-4', 'grade-5'],
  'TriangleClassifier.tsx': ['grade-6', 'grade-7'],
  'QuadrilateralClassifier.tsx': ['grade-6', 'grade-7'],
  'TriangleAnglesQuiz.tsx': ['grade-7'],
  'SymmetryQuiz.tsx': ['grade-6', 'grade-7'],
  'AxialSymmetryQuiz.tsx': ['grade-6', 'grade-7'],
  'AxialSymmetryPresentation.tsx': ['grade-6', 'grade-7'],
  'BuildingBlocksComparison.tsx': ['grade-4', 'grade-5'],

  // Algebra & Word Problems
  'WordProblemsModule.tsx': ['grade-5', 'grade-6', 'grade-7', 'grade-8'],
  'WordProblemsQuiz.tsx': ['grade-5', 'grade-6', 'grade-7', 'grade-8'],
  'EquationBalanceQuiz.tsx': ['grade-7', 'grade-8'],
  'AlgebraQuiz.tsx': ['grade-7', 'grade-8'],
  'RatioIntroQuiz.tsx': ['grade-6', 'grade-7', 'grade-8'],
  'RatioCreatorQuiz.tsx': ['grade-6', 'grade-7', 'grade-8'],
  'PercentagesQuiz.tsx': ['grade-6', 'grade-7', 'grade-8'],
  'PercentWordProblems.tsx': ['grade-6', 'grade-7', 'grade-8'],
  'VennInterpretationQuiz.tsx': ['grade-5', 'grade-6'],
  'MoneyCountingQuiz.tsx': ['grade-3', 'grade-4'],

  // Competency Assessment
  'CompetencyAssessment.tsx': ['grade-4', 'grade-5', 'grade-6', 'grade-7']
};

const ALL_DIRS = ['grade-1', 'grade-2', 'grade-3', 'grade-4', 'grade-5', 'grade-6', 'grade-7', 'grade-8', 'high-school', 'tools', 'games', 'shared'];

// 1. Create directories
for (const dir of ALL_DIRS) {
  const p = path.join(SRC_MATH, dir);
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true });
  }
}

function resolveImportTarget(impName, currentFolder) {
  const tsxName = impName + '.tsx';
  const tsName = impName + '.ts';
  const targets = MAPPINGS[tsxName] || MAPPINGS[tsName];
  if (!targets) return null;
  
  if (currentFolder && targets.includes(currentFolder)) return currentFolder;
  if (targets.includes('shared')) return 'shared';
  if (targets.includes('tools')) return 'tools';
  if (targets.includes('games')) return 'games';
  return targets[0];
}

const files = fs.readdirSync(SRC_MATH);
const memoryFiles = []; // { targetFolder, originalFile, content }

files.forEach(file => {
  const filePath = path.join(SRC_MATH, file);
  if (!fs.statSync(filePath).isFile()) return;

  const targets = MAPPINGS[file];
  if (!targets) return;

  const content = fs.readFileSync(filePath, 'utf8');

  targets.forEach(targetFolder => {
    memoryFiles.push({
      targetFolder,
      originalFile: file,
      content,
      isDuplicated: targets.length > 1
    });
  });
});

memoryFiles.forEach(item => {
  let { content, targetFolder, originalFile } = item;

  // 3a. Fix relative imports starting with '../' (e.g. '../ui/button')
  // Because the file is moving one level deeper, '../' needs to become '../../'
  // But wait! If it was already absolute '@/...', it works fine!
  content = content.replace(/from\s+['"]\.\.\/([^'"]+)['"]/g, "from \"../../$1\"");
  content = content.replace(/import\s+['"]\.\.\/([^'"]+)['"]/g, "import \"../../$1\"");

  // 3b. Fix relative imports starting with './' (e.g. './ActivityPlaceholder')
  // It could be another math component. Let's redirect to '@/' absolute path for math components!
  content = content.replace(/from\s+['"]\.\/([^'"]+)['"]/g, (match, impPath) => {
    const baseName = impPath.split('/').pop();
    const targetDir = resolveImportTarget(baseName, targetFolder);
    if (targetDir) {
      return `from "@/components/math/${targetDir}/${impPath}"`;
    }
    // If it's NOT a mapped math component (like a local image or something not in MAPPINGS),
    // it stays relative, but we need to ensure it's still there or moved. 
    // Since we move everything mapped, if it's not mapped, it stays in root math/. So it should be '../'
    return `from "../${impPath}"`;
  });

  // 3c. Fix existing absolute math imports
  content = content.replace(/from\s+['"]@\/components\/math\/([^'"]+)['"]/g, (match, impPath) => {
    const baseName = impPath.split('/').pop();
    if (impPath.includes('/')) return match; 
    const targetDir = resolveImportTarget(baseName, targetFolder);
    if (targetDir) {
      return `from "@/components/math/${targetDir}/${baseName}"`;
    }
    return match;
  });

  const targetPath = path.join(SRC_MATH, targetFolder, originalFile);
  fs.writeFileSync(targetPath, content);
});

// Delete Original Files
files.forEach(file => {
  const filePath = path.join(SRC_MATH, file);
  if (fs.statSync(filePath).isFile() && MAPPINGS[file]) {
    fs.unlinkSync(filePath);
  }
});

console.log('Reorganization Complete. Migrated', memoryFiles.length, 'files.');
