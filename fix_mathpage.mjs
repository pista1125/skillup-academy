import fs from 'fs';
import path from 'path';

const MATH_PAGE = path.join(process.cwd(), 'src', 'pages', 'MathPage.tsx');

const MAPPINGS = {
  // Shared
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

  // Graded Topics
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
  'DecimalFractionsQuiz.tsx': ['grade-5', 'grade-6'],
  'DecimalMultiplicationQuiz.tsx': ['grade-5', 'grade-6'],
  'DecimalDivisionQuiz.tsx': ['grade-5', 'grade-6'],
  'DecimalMultiplicationMatcher.tsx': ['grade-5', 'grade-6'],
  'DecimalDivisionMatcher.tsx': ['grade-5', 'grade-6'],
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
  'CompetencyAssessment.tsx': ['grade-4', 'grade-5', 'grade-6', 'grade-7']
};

function resolveImportTarget(impName) {
  const tsxName = impName + '.tsx';
  const tsName = impName + '.ts';
  const targets = MAPPINGS[tsxName] || MAPPINGS[tsName];
  if (!targets) return null;
  return targets[0]; // Just use the first one so the app builds without complex JSX updates
}

let content = fs.readFileSync(MATH_PAGE, 'utf8');

content = content.replace(/from\s+['"]@\/components\/math\/([^'"]+)['"]/g, (match, impPath) => {
  const baseName = impPath.split('/').pop();
  if (impPath.includes('/')) return match; 
  
  const targetDir = resolveImportTarget(baseName);
  if (targetDir) {
    return `from "@/components/math/${targetDir}/${baseName}"`;
  }
  return match;
});

fs.writeFileSync(MATH_PAGE, content);

console.log('MathPage.tsx imports updated successfully.');
