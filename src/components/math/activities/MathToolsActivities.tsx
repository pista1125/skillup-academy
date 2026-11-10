import React, { lazy } from 'react';
import { ActivityRouterProps } from './types';
import { Button } from '@/components/ui/button';
import { VENN_READING_OBJECTS, VENN_READING_NUMBERS } from '@/data/vennReadingLevels';

// Lazy loaded activity components
const AlgebraCloudTool = lazy(() => import("@/components/math/tools/algebra-cloud").then(m => ({ default: m.AlgebraCloudTool })))
const AlgebraQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/AlgebraQuiz").then(m => ({ default: m.AlgebraQuiz })))
const AnalogClockTool = lazy(() => import("@/components/math/tools/analog-clock").then(m => ({ default: m.AnalogClockTool })))
const AxialSymmetryGame = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-tukrozes/AxialSymmetryGame").then(m => ({ default: m.AxialSymmetryGame })))
const AxialSymmetryPresentation = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-szimmetria/AxialSymmetryPresentation").then(m => ({ default: m.AxialSymmetryPresentation })))
const AxialSymmetryQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-szimmetria/AxialSymmetryQuiz").then(m => ({ default: m.AxialSymmetryQuiz })))
const CapacityConverterTool = lazy(() => import("@/components/math/tools/capacity-converter").then(m => ({ default: m.CapacityConverterTool })))
const ChessGame = lazy(() => import("@/components/math/games/chess/ChessGame"))
const CirclePartsGame = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-kor/CirclePartsGame").then(m => ({ default: m.CirclePartsGame })))
const ColorSequenceGame = lazy(() => import("@/components/math/games/color-sequence/ColorSequenceGame"))
const ConstructionTool = lazy(() => import("@/components/math/tools/construction").then(m => ({ default: m.ConstructionTool })))
const DebtAssetModelTool = lazy(() => import("@/components/math/tools/debt-asset-model").then(m => ({ default: m.DebtAssetModelTool })))
const DecimalDivisionQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek").then(m => ({ default: m.DecimalDivisionQuiz })))
const DecimalFractionsTool = lazy(() => import("@/components/math/tools/decimal-fractions").then(m => ({ default: m.DecimalFractionsTool })))
const DecimalMultiplicationQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek").then(m => ({ default: m.DecimalMultiplicationQuiz })))
const DecimalShifterTool = lazy(() => import("@/components/math/tools/decimal-shifter"))
const DivisibilityTool = lazy(() => import("@/components/math/tools/divisibility").then(m => ({ default: m.DivisibilityTool })))
const EquationBalanceQuiz = lazy(() => import("@/components/math/grade-7/szazalekszamitas/EquationBalanceQuiz").then(m => ({ default: m.EquationBalanceQuiz })))
const EquationBalanceTool = lazy(() => import("@/components/math/tools/equation-balance").then(m => ({ default: m.EquationBalanceTool })))
const EquationSolverTool = lazy(() => import("@/components/math/tools/equation-solver").then(m => ({ default: m.EquationSolverTool })))
const FractionVisualizer = lazy(() => import("@/components/math/tools/fraction-visualizer").then(m => ({ default: m.FractionVisualizer })))
const Grade5DecimalDivisionMatcher = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek").then(m => ({ default: m.DecimalDivisionMatcher })))
const Grade5DecimalMultiplicationMatcher = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek").then(m => ({ default: m.DecimalMultiplicationMatcher })))
const Grade6PrimeFactorization = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/hany-osztoja-van/PrimeFactorization").then(m => ({ default: m.PrimeFactorization })))
const Grade6PrimeFactorizationMatcher = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/hany-osztoja-van/PrimeFactorizationMatcher").then(m => ({ default: m.PrimeFactorizationMatcher })))
const GroupingGame = lazy(() => import("@/components/math/grade-1/grouping/GroupingGame").then(m => ({ default: m.GroupingGame })))
const HanoiGame = lazy(() => import("@/components/math/games/hanoi/HanoiGame"))
const LineRelationships = lazy(() => import("@/components/math/grade-4/sikidomok-testek/LineRelationships").then(m => ({ default: m.LineRelationships })))
const LogicBlocksGame = lazy(() => import("@/components/math/games/logic-blocks/LogicBlocksGame").then(m => ({ default: m.LogicBlocksGame })))
const LongDivisionTool = lazy(() => import("@/components/math/tools/long-division").then(m => ({ default: m.LongDivisionTool })))
const ManipulativeAddition = lazy(() => import("@/components/math/tools/manipulative-addition").then(m => ({ default: m.ManipulativeAddition })))
const ManipulativeDivision = lazy(() => import("@/components/math/tools/manipulative-division").then(m => ({ default: m.ManipulativeDivision })))
const MatchingCreator = lazy(() => import("@/components/math/tools/matching-creator").then(m => ({ default: m.MatchingCreator })))
const MaterialGallery = lazy(() => import("@/components/math/shared/MaterialGallery").then(m => ({ default: m.MaterialGallery })))
const MathQuiz = lazy(() => import("@/components/math/shared/MathQuiz").then(m => ({ default: m.MathQuiz })))
const MathSnakeGame = lazy(() => import("@/components/math/games/snake/MathSnakeGame").then(m => ({ default: m.MathSnakeGame })))
const MatrixSortingGame = lazy(() => import("@/components/math/grade-1/grouping/MatrixSortingGame").then(m => ({ default: m.MatrixSortingGame })))
const MemoryGameComponent = lazy(() => import("@/components/math/games/memory/MemoryGame"))
const MoneyCalculationTool = lazy(() => import("@/components/math/tools/money-calculation").then(m => ({ default: m.MoneyCalculationTool })))
const NumberGroupingGame = lazy(() => import("@/components/math/grade-1/grouping/NumberGroupingGame").then(m => ({ default: m.NumberGroupingGame })))
const NumberLineTool = lazy(() => import("@/components/math/tools/number-line").then(m => ({ default: m.NumberLineTool })))
const PercentWordProblems = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/a-szazalekszamitas-gyakorlasa/PercentWordProblems").then(m => ({ default: m.PercentWordProblems })))
const PercentagesQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szazalekszamitas/PercentagesQuiz").then(m => ({ default: m.PercentagesQuiz })))
const PerimeterAreaTool = lazy(() => import("@/components/math/tools/perimeter-area").then(m => ({ default: m.PerimeterAreaTool })))
const PerimeterQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat").then(m => ({ default: m.PerimeterQuiz })))
const PuzzleMakerTool = lazy(() => import("@/components/math/tools/puzzle-maker").then(m => ({ default: m.PuzzleMakerTool })))
const QuadrilateralClassifier = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyesen-szimmetrikus-haromszogek-negyszogek-sokszogek/QuadrilateralClassifier").then(m => ({ default: m.QuadrilateralClassifier })))
const RatioCreatorQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/az-arany-fogalma/RatioCreatorQuiz").then(m => ({ default: m.RatioCreatorQuiz })))
const ScientificCalculator = lazy(() => import("@/components/math/tools/scientific").then(m => ({ default: m.ScientificCalculator })))
const ShapeClassifier = lazy(() => import("@/components/math/grade-4/sikidomok-testek/ShapeClassifier").then(m => ({ default: m.ShapeClassifier })))
const SmartWhiteboardTool = lazy(() => import("@/components/math/tools/smart-whiteboard").then(m => ({ default: m.SmartWhiteboardTool })))
const StudentFeedbackHub = lazy(() => import("@/components/math/tools/feedback").then(m => ({ default: m.StudentFeedbackHub })))
const SudokuGame = lazy(() => import("@/components/math/games/sudoku/SudokuGame").then(m => ({ default: m.SudokuGame })))
const SudokuGeneratorTool = lazy(() => import("@/components/math/tools/sudoku-generator").then(m => ({ default: m.SudokuGeneratorTool })))
const SurfaceAreaQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat").then(m => ({ default: m.SurfaceAreaQuiz })))
const SymmetryConstructionTool = lazy(() => import("@/components/math/tools/symmetry-construction").then(m => ({ default: m.SymmetryConstructionTool })))
const SymmetryErrorGame = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-tukrozes/SymmetryErrorGame").then(m => ({ default: m.SymmetryErrorGame })))
const SymmetryQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-tukrozes/SymmetryQuiz").then(m => ({ default: m.SymmetryQuiz })))
const TorpedoGame = lazy(() => import("@/components/math/games/torpedo/TorpedoGame"))
const TotoTool = lazy(() => import("@/components/math/tools/toto").then(m => ({ default: m.TotoTool })))
const TriangleClassifier = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyesen-szimmetrikus-haromszogek-negyszogek-sokszogek/TriangleClassifier").then(m => ({ default: m.TriangleClassifier })))
const UnitConverterTool = lazy(() => import("@/components/math/tools/unit-converter").then(m => ({ default: m.UnitConverterTool })))
const VennDiagramGame = lazy(() => import("@/components/math/games/venn/VennDiagramGame").then(m => ({ default: m.VennDiagramGame })))
const VennInterpretationQuiz = lazy(() => import("@/components/math/games/venn/VennInterpretationQuiz").then(m => ({ default: m.VennInterpretationQuiz })))
const VennReadingGame = lazy(() => import("@/components/math/games/venn/VennReadingGame").then(m => ({ default: m.VennReadingGame })))
const VolumeQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat").then(m => ({ default: m.VolumeQuiz })))
const VolumeSurfaceTool = lazy(() => import("@/components/math/tools/volume-surface").then(m => ({ default: m.VolumeSurfaceTool })))
const WordProblemsModule = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/WordProblemsModule").then(m => ({ default: m.WordProblemsModule })))
const WordSearchTool = lazy(() => import("@/components/math/tools/word-search").then(m => ({ default: m.WordSearchTool })))

export const MathToolsActivities: React.FC<ActivityRouterProps> = ({
  activityType,
  onBack,
  onActivitySelect,
  setActivityType: setActivityTypeProp,
  selectedGrade,
  selectedTopic,
  handleMaterialSelect,
  handleQuizComplete,
  percentMode,
  vennLevel
}) => {
  const handleBack = onBack;
  const handleActivitySelect = onActivitySelect;
  const setActivityType = (type: string) => {
    if (setActivityTypeProp) {
      setActivityTypeProp(type);
    } else {
      onActivitySelect(type, typeof selectedTopic === 'object' ? selectedTopic?.id : selectedTopic);
    }
  };

  if (!activityType) return null;

  return (
    <>
                  {activityType === 'divisibility' && (
                    <DivisibilityTool onBack={handleBack} />
                  )}

                  {activityType === 'logic-blocks' && (
                    <LogicBlocksGame onBack={handleBack} />
                  )}

                  {activityType === 'grouping-game' && (
                    <GroupingGame onBack={handleBack} />
                  )}

                  {activityType === 'number-grouping-game' && (
                    <NumberGroupingGame onBack={handleBack} />
                  )}

                  {activityType === 'venn-diagram-game' && (
                    <VennDiagramGame
                      onBack={handleBack}
                      initialLevelIndex={vennLevel !== null && vennLevel >= 0 ? vennLevel : undefined}
                      allowedLevelIndices={
                        vennLevel === -2 ? [7, 8, 9, 10, 11, 12] :
                          (vennLevel === null ? [1, 2, 3, 4, 5, 6] : undefined)
                      }
                    />
                  )}

                  {activityType === 'venn-interpretation-quiz' && (
                    <VennInterpretationQuiz onBack={handleBack} />
                  )}

                  {activityType === 'venn-reading-objects' && (
                    <VennReadingGame levels={VENN_READING_OBJECTS} onBack={handleBack} />
                  )}

                  {activityType === 'venn-reading-numbers' && (
                    <VennReadingGame levels={VENN_READING_NUMBERS} onBack={handleBack} />
                  )}

                  {activityType === 'sudoku' && (
                    <SudokuGame onBack={handleBack} />
                  )}

                  {activityType === 'snake-game' && (
                    <MathSnakeGame onBack={handleBack} grade={typeof selectedGrade === 'number' ? selectedGrade : 3} />
                  )}

                  {activityType === 'long-division' && (
                    <LongDivisionTool onBack={handleBack} />
                  )}

                  {activityType === 'shape-classification' && (
                    <ShapeClassifier onBack={handleBack} />
                  )}

                  {activityType === 'line-relationships' && (
                    <LineRelationships onBack={handleBack} />
                  )}

                  {activityType === 'reflection-quiz' && (
                    <SymmetryQuiz onBack={handleBack} />
                  )}

                  {activityType === 'axial-symmetry' && (
                    <AxialSymmetryGame onBack={handleBack} />
                  )}

                  {activityType === 'symmetry-error' && (
                    <SymmetryErrorGame onBack={handleBack} />
                  )}

                  {activityType === 'axial-symmetry-quiz' && (
                    <AxialSymmetryQuiz onBack={handleBack} />
                  )}

                  {activityType === 'axial-symmetry-presentation' && (
                    <AxialSymmetryPresentation onBack={handleBack} />
                  )}

                  {activityType === 'construction' && (
                    <ConstructionTool onBack={handleBack} />
                  )}

                  {activityType === 'circle-parts' && (
                    <CirclePartsGame onBack={handleBack} />
                  )}

                  {activityType === 'triangle-classification' && (
                    <TriangleClassifier onBack={handleBack} />
                  )}

                  {activityType === 'quadrilateral-classification' && (
                    <QuadrilateralClassifier onBack={handleBack} />
                  )}

                  {activityType === 'divisibility-factorization' && (
                    <Grade6PrimeFactorization onBack={handleBack} />
                  )}

                  {activityType === 'divisibility-matcher' && (
                    <Grade6PrimeFactorizationMatcher onBack={handleBack} />
                  )}

                  {activityType === 'fraction-visualizer' && (
                    <FractionVisualizer onBack={handleBack} />
                  )}

                  {activityType === 'decimal-fractions' && (
                    <DecimalFractionsTool onBack={handleBack} />
                  )}

                  {activityType === 'decimal-shifter' && (
                    <DecimalShifterTool onBack={handleBack} />
                  )}

                  {activityType === 'decimal-multiplication-quiz' && (
                    <DecimalMultiplicationQuiz onBack={handleBack} />
                  )}

                  {activityType === 'decimal-multiplication-matcher' && (
                    <Grade5DecimalMultiplicationMatcher onBack={handleBack} />
                  )}

                  {activityType === 'decimal-division-quiz' && (
                    <DecimalDivisionQuiz onBack={handleBack} />
                  )}

                  {activityType === 'decimal-division-matcher' && (
                    <Grade5DecimalDivisionMatcher onBack={handleBack} />
                  )}

                  {activityType === 'perimeter-quiz' && (
                    <PerimeterQuiz onBack={handleBack} />
                  )}

                  {activityType === 'surface-area-quiz' && (
                    <SurfaceAreaQuiz onBack={handleBack} />
                  )}

                  {activityType === 'volume-quiz' && (
                    <VolumeQuiz onBack={handleBack} />
                  )}

                  {activityType === 'unit-converter' && (
                    <UnitConverterTool onBack={handleBack} />
                  )}

                  {activityType === 'analog-clock' && (
                    <AnalogClockTool onBack={handleBack} />
                  )}

                  {activityType === 'capacity-converter' && (
                    <CapacityConverterTool onBack={handleBack} />
                  )}

                  {activityType === 'perimeter-area-tool' && (
                    <PerimeterAreaTool onBack={handleBack} />
                  )}

                  {(activityType === 'volume-surface-tool' || activityType === 'volume-surface') && (
                    <VolumeSurfaceTool onBack={handleBack} />
                  )}

                  {activityType === 'word-problems' && (
                    <WordProblemsModule onBack={handleBack} />
                  )}

                  {activityType === 'number-line' && (
                    <NumberLineTool onBack={handleBack} />
                  )}

                  {activityType === 'construction' && (
                    <ConstructionTool onBack={handleBack} />
                  )}

                  {activityType === 'symmetry-construction' && (
                    <SymmetryConstructionTool onBack={handleBack} />
                  )}

                  {activityType === 'manipulative-division' && (
                    <ManipulativeDivision onBack={handleBack} />
                  )}

                  {activityType === 'manipulative-addition' && (
                    <ManipulativeAddition onBack={handleBack} />
                  )}

                  {activityType === 'unit-converter' && (
                    <UnitConverterTool onBack={handleBack} />
                  )}

                  {activityType === 'capacity-converter' && (
                    <CapacityConverterTool onBack={handleBack} />
                  )}

                  {activityType === 'analog-clock' && (
                    <AnalogClockTool onBack={handleBack} />
                  )}

                  {activityType === 'equation-solver' && (
                    <EquationSolverTool onBack={handleBack} />
                  )}

                  {activityType === 'money-calculation' && (
                    <MoneyCalculationTool onBack={handleBack} />
                  )}

                  {activityType === 'sudoku-generator' && (
                    <SudokuGeneratorTool onBack={handleBack} />
                  )}

                  {activityType === 'puzzle-maker' && (
                    <PuzzleMakerTool onBack={handleBack} />
                  )}

                  {activityType === 'toto-maker' && (
                    <TotoTool onBack={handleBack} />
                  )}

                  {activityType === 'matching-creator' && (
                    <MatchingCreator onBack={handleBack} />
                  )}

                  {(activityType === 'algebra-cloud' || activityType === 'algebrai-felhok') && (
                    <AlgebraCloudTool onBack={handleBack} />
                  )}

                  {(activityType === 'debt-asset-model' || activityType === 'adossag-vagyon') && (
                    <DebtAssetModelTool onBack={handleBack} />
                  )}

                  {(activityType === 'scientific-calculator' || activityType === 'tudomanyos-szamologep') && (
                    <ScientificCalculator onBack={handleBack} />
                  )}

                  {activityType === 'word-search' && (
                    <WordSearchTool />
                  )}

                  {activityType === 'memory-game' && (
                    <MemoryGameComponent />
                  )}

                  {activityType === 'hanoi-tower' && (
                    <HanoiGame onBack={handleBack} />
                  )}

                  {activityType === 'color-sequence-game' && (
                    <ColorSequenceGame onBack={handleBack} />
                  )}

                  {activityType === 'chess-game' && (
                    <ChessGame onBack={handleBack} />
                  )}

                  {activityType === 'torpedo-game' && (
                    <TorpedoGame onBack={handleBack} />
                  )}

                  {activityType === 'equation-balance' && (
                    <EquationBalanceTool onBack={handleBack} />
                  )}

                  {activityType === 'equation-balance-quiz' && (
                    <EquationBalanceQuiz onBack={handleBack} />
                  )}

                  {activityType === 'ratio-creator' && (
                    <RatioCreatorQuiz onBack={handleBack} />
                  )}

                  {activityType === 'matrix-sorting-game' && (
                    <MatrixSortingGame onBack={handleBack} />
                  )}

                  {activityType === 'smart-whiteboard' && (
                    <SmartWhiteboardTool onBack={handleBack} />
                  )}

                  {activityType === 'materials' && (
                    <MaterialGallery
                      grade={selectedGrade || 5}
                      onView={handleMaterialSelect}
                      initialMaterialId={new URLSearchParams(location.search).get('material')}
                    />
                  )}

                  {activityType === 'algebra' && (
                    <AlgebraQuiz
                      grade={typeof selectedGrade === 'number' ? selectedGrade : 7}
                      onComplete={handleQuizComplete}
                      onBack={handleBack}
                    />
                  )}

                  {activityType === 'percentages' && (
                    <PercentagesQuiz onBack={handleBack} initialMode={percentMode} />
                  )}

                  {activityType === 'percent-value-word-problems' && (
                    <PercentWordProblems onBack={handleBack} type="value" />
                  )}

                  {activityType === 'percent-rate-word-problems' && (
                    <PercentWordProblems onBack={handleBack} type="rate" />
                  )}

                  {activityType === 'percent-base-word-problems' && (
                    <PercentWordProblems onBack={handleBack} type="base" />
                  )}

                  {activityType === 'perimeter-quiz' && (
                    <PerimeterQuiz onBack={handleBack} />
                  )}

                  {activityType === 'volume-quiz' && (
                    <VolumeQuiz onBack={handleBack} />
                  )}

                  {activityType === 'surface-area-quiz' && (
                    <SurfaceAreaQuiz onBack={handleBack} />
                  )}

                  {activityType === 'quiz' && (
                    <MathQuiz
                      grade={typeof selectedGrade === 'number' ? selectedGrade : 5}
                      type="mixed"
                      onComplete={handleQuizComplete}
                      onBack={handleBack}
                    />
                  )}

                  {activityType === 'axial-symmetry' && (
                    <AxialSymmetryGame onBack={handleBack} />
                  )}

                  {activityType === 'symmetry-error' && (
                    <SymmetryErrorGame onBack={handleBack} />
                  )}

                  {activityType === 'axial-symmetry-quiz' && (
                    <AxialSymmetryQuiz onBack={handleBack} />
                  )}

                  {activityType === 'axial-symmetry-presentation' && (
                    <AxialSymmetryPresentation onBack={handleBack} />
                  )}

                  {activityType === 'perimeter-area' && (
                    <PerimeterAreaTool onBack={handleBack} />
                  )}

                  {activityType === 'volume-surface' && (
                    <VolumeSurfaceTool onBack={handleBack} />
                  )}

                  {activityType === 'student-feedback' && (
                    <StudentFeedbackHub onBack={handleBack} />
                  )}

                  {activityType === 'geometry' && (
                    <div className="text-center py-12 bg-card rounded-2xl border border-border">
                      <div className="text-6xl mb-4">📐</div>
                      <h2 className="font-display text-2xl font-bold mb-2">Geometria modul</h2>
                      <p className="text-muted-foreground mb-6">
                        Az interaktív geometriai szerkesztő és számoló modul fejlesztés alatt áll.
                      </p>
                      <Button onClick={handleBack}>Vissza</Button>
                    </div>
                  )}
    </>
  );
};
