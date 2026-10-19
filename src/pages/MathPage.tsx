import { useState, useRef, useEffect, useMemo, lazy, Suspense } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { SectionHeader } from "@/components/math/shared/SectionHeader";
import { ActivityPlaceholder } from "@/components/math/shared/ActivityPlaceholder";
import { mathTopics } from '@/data/mathTopics';
import { MathTopicCard } from "@/components/math/shared/MathTopicCard";
import { ScrollSpySidebar } from "@/components/math/shared/ScrollSpySidebar";
import { GradeSelector } from '@/components/GradeSelector';
import { VENN_READING_OBJECTS, VENN_READING_NUMBERS } from '@/data/vennReadingLevels';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SidebarMenu } from '@/components/SidebarMenu';
import { SiteFooter } from '@/components/SiteFooter';
import { UserMenu } from '@/components/auth/UserMenu';
import { OnlineTutoringModal } from '@/components/tutoring/OnlineTutoringModal';
import {
  Grade1View,
  Grade2View,
  Grade3View,
  Grade4View,
  Grade5View,
  Grade6View,
  Grade7View,
  Grade8View,
  Grade9View,
  Grade10View,
  Grade11View,
  Grade12View,
  AdmissionPrepView,
  GraduationPrepView,
  CompetencyAssessmentView,
  GradeViewProps,
  sectionToTopicMap,
  getGradeSubsections
} from '@/components/math/views';
import { grade5Topics } from '@/data/grade5Topics';

// Lazy load heavy components
const CompetencyMatrixHub = lazy(() => import("@/components/math/competency-matrix/CompetencyMatrixHub")) as any;
const GraduationPrep = lazy(() => import("@/components/math/graduation/GraduationPrep")) as any;
const AdmissionPrep = lazy(() => import("@/components/math/admission/AdmissionPrep")) as any;
const DecimalMultiplicationQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek").then(m => ({ default: m.DecimalMultiplicationQuiz }))) as any;
const DecimalDivisionQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek").then(m => ({ default: m.DecimalDivisionQuiz }))) as any;
const Grade5DecimalMultiplicationMatcher = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek").then(m => ({ default: m.DecimalMultiplicationMatcher }))) as any;
const Grade5DecimalDivisionMatcher = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek").then(m => ({ default: m.DecimalDivisionMatcher }))) as any;
const Grade5FractionToDecimalMatcher = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek").then(m => ({ default: m.FractionToDecimalMatcher }))) as any;
const MathQuiz = lazy(() => import("@/components/math/shared/MathQuiz").then(m => ({ default: m.MathQuiz }))) as any;
const FractionVisualizer = lazy(() => import("@/components/math/tools/FractionVisualizer").then(m => ({ default: m.FractionVisualizer }))) as any;
const FractionsModule = lazy(() => import("@/components/math/grade-4/tortszamok").then(m => ({ default: m.FractionsModule }))) as any;
const Grade1MathModule = lazy(() => import("@/components/math/grade-1/Grade1MathModule").then(m => ({ default: m.Grade1MathModule }))) as any;
const Grade2MathModule = lazy(() => import("@/components/math/grade-2/Grade2MathModule").then(m => ({ default: m.Grade2MathModule }))) as any;
const MoneyCountingQuiz = lazy(() => import("@/components/math/grade-4/meresek/MoneyCountingQuiz").then(m => ({ default: m.MoneyCountingQuiz }))) as any;
const BuildingBlocksComparison = lazy(() => import("@/components/math/grade-4/szamolas-10000-ig/BuildingBlocksComparison").then(m => ({ default: m.BuildingBlocksComparison }))) as any;
const AlgebraQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/AlgebraQuiz").then(m => ({ default: m.AlgebraQuiz }))) as any;
const MathColoringGame = lazy(() => import("@/components/math/games/coloring/MathColoringGame").then(m => ({ default: m.MathColoringGame }))) as any;
const DivisibilityTool = lazy(() => import("@/components/math/tools/DivisibilityTool").then(m => ({ default: m.DivisibilityTool }))) as any;
const MaterialGallery = lazy(() => import("@/components/math/shared/MaterialGallery").then(m => ({ default: m.MaterialGallery }))) as any;
const LessonViewer = lazy(() => import("@/components/math/shared/LessonViewer").then(m => ({ default: m.LessonViewer }))) as any;
const LongDivisionTool = lazy(() => import("@/components/math/tools/LongDivisionTool").then(m => ({ default: m.LongDivisionTool }))) as any;
const MathSnakeGame = lazy(() => import("@/components/math/games/snake/MathSnakeGame").then(m => ({ default: m.MathSnakeGame }))) as any;
const ShapeClassifier = lazy(() => import("@/components/math/grade-4/sikidomok-testek/ShapeClassifier").then(m => ({ default: m.ShapeClassifier }))) as any;
const LineRelationships = lazy(() => import("@/components/math/grade-4/sikidomok-testek/LineRelationships").then(m => ({ default: m.LineRelationships }))) as any;
const Grade6OperationsTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/muveletek-az-egesz-szamok-koreben/OperationsWithIntegersTheory").then(m => ({ default: m.OperationsWithIntegersTheory }))) as any;
const Grade6OperationsQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/muveletek-az-egesz-szamok-koreben/OperationsWithIntegersQuiz").then(m => ({ default: m.OperationsWithIntegersQuiz }))) as any;
const Grade6MultiplicationTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/az-egesz-szamok-szorzasa/IntegerMultiplicationTheory").then(m => ({ default: m.IntegerMultiplicationTheory }))) as any;
const Grade6MultiplicationQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/az-egesz-szamok-szorzasa/IntegerMultiplicationQuiz").then(m => ({ default: m.IntegerMultiplicationQuiz }))) as any;
const Grade6DivisionTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/az-egesz-szamok-osztasa/IntegerDivisionTheory").then(m => ({ default: m.IntegerDivisionTheory }))) as any;
const Grade6DivisionQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/az-egesz-szamok-osztasa/IntegerDivisionQuiz").then(m => ({ default: m.IntegerDivisionQuiz }))) as any;
const Grade6CountingPossibilitiesTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/hany-eset-van/CountingPossibilitiesTheory").then(m => ({ default: m.CountingPossibilitiesTheory }))) as any;
const Grade6CountingPossibilitiesQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/hany-eset-van/CountingPossibilitiesQuiz").then(m => ({ default: m.CountingPossibilitiesQuiz }))) as any;
const Grade6DivisorsMultiplesTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/oszto-tobbszoros/DivisorsMultiplesTheory").then(m => ({ default: m.DivisorsMultiplesTheory }))) as any;
const Grade6DivisorsMultiplesQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/oszto-tobbszoros/DivisorsMultiplesQuiz").then(m => ({ default: m.DivisorsMultiplesQuiz }))) as any;
const Grade6RemaindersTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/szamolas-maradekokkal/RemainderCalculationTheory").then(m => ({ default: m.RemainderCalculationTheory }))) as any;
const Grade6RemaindersQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/szamolas-maradekokkal/RemainderCalculationQuiz").then(m => ({ default: m.RemainderCalculationQuiz }))) as any;
const Grade6PrimeFactorizationTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/hany-osztoja-van/PrimeFactorizationTheory").then(m => ({ default: m.PrimeFactorizationTheory }))) as any;
const Grade6PrimeFactorizationQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/hany-osztoja-van/PrimeFactorizationQuiz").then(m => ({ default: m.PrimeFactorizationQuiz }))) as any;
const Grade6PrimeFactorization = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/hany-osztoja-van/PrimeFactorization").then(m => ({ default: m.PrimeFactorization }))) as any;
const Grade6PrimeFactorizationMatcher = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/hany-osztoja-van/PrimeFactorizationMatcher").then(m => ({ default: m.PrimeFactorizationMatcher }))) as any;
const Grade6DivisibilityBy2510Theory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/oszthatosag-2-vel-5-tel-10-zel/DivisibilityBy2510Theory").then(m => ({ default: m.DivisibilityBy2510Theory }))) as any;
const Grade6DivisibilityBy2510Quiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/oszthatosag-2-vel-5-tel-10-zel/DivisibilityBy2510Quiz").then(m => ({ default: m.DivisibilityBy2510Quiz }))) as any;
const Grade6DivisibilityBy39Theory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/oszthatosag-3-mal-es-9-cel/DivisibilityBy39Theory").then(m => ({ default: m.DivisibilityBy39Theory }))) as any;
const Grade6DivisibilityBy39Quiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/oszthatosag-3-mal-es-9-cel/DivisibilityBy39Quiz").then(m => ({ default: m.DivisibilityBy39Quiz }))) as any;
const Grade6DivisibilityBy4100Theory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/oszthatosag-4-gyel-es-100-zal/DivisibilityBy4100Theory").then(m => ({ default: m.DivisibilityBy4100Theory }))) as any;
const Grade6DivisibilityBy4100Quiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/oszthatosag-4-gyel-es-100-zal/DivisibilityBy4100Quiz").then(m => ({ default: m.DivisibilityBy4100Quiz }))) as any;
const Grade6DivisibilityCompositeTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/osszetett-oszthatosagi-szabalyok/DivisibilityCompositeTheory").then(m => ({ default: m.DivisibilityCompositeTheory }))) as any;
const Grade6DivisibilityCompositeQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/osszetett-oszthatosagi-szabalyok/DivisibilityCompositeQuiz").then(m => ({ default: m.DivisibilityCompositeQuiz }))) as any;
const Grade6LCMTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/tobbszoros-kozos-tobbszoros/LCMTheory").then(m => ({ default: m.LCMTheory }))) as any;
const Grade6LCMQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/tobbszoros-kozos-tobbszoros/LCMQuiz").then(m => ({ default: m.LCMQuiz }))) as any;
const Grade6GCDTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/oszto-kozos-oszto/GCDTheory").then(m => ({ default: m.GCDTheory }))) as any;
const Grade6GCDQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/oszto-kozos-oszto/GCDQuiz").then(m => ({ default: m.GCDQuiz }))) as any;
const Grade6Chapter1SummaryTheory = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/osszefoglalas/Chapter1SummaryTheory").then(m => ({ default: m.Chapter1SummaryTheory }))) as any;
const Grade6FractionsReviewTheory = lazy(() => import("@/components/math/grade-6/tortek/mit-tanultunk-a-tortekrol-ismetles/FractionsReviewTheory").then(m => ({ default: m.FractionsReviewTheory }))) as any;
const Grade6FractionsReviewQuiz = lazy(() => import("@/components/math/grade-6/tortek/mit-tanultunk-a-tortekrol-ismetles/FractionsReviewQuiz").then(m => ({ default: m.FractionsReviewQuiz }))) as any;
const Grade6FractionsReviewMatcher = lazy(() => import("@/components/math/grade-6/tortek/mit-tanultunk-a-tortekrol-ismetles/FractionsReviewMatcher").then(m => ({ default: m.FractionsReviewMatcher }))) as any;
const Grade6FractionsReviewSorter = lazy(() => import("@/components/math/grade-6/tortek/mit-tanultunk-a-tortekrol-ismetles/FractionsReviewSorter").then(m => ({ default: m.FractionsReviewSorter }))) as any;
const Grade6FractionMultiplicationTheory = lazy(() => import("@/components/math/grade-6/tortek/szorzas-torttel-a-reciprok/FractionMultiplicationTheory").then(m => ({ default: m.FractionMultiplicationTheory }))) as any;
const Grade6FractionMultiplicationQuiz = lazy(() => import("@/components/math/grade-6/tortek/szorzas-torttel-a-reciprok/FractionMultiplicationQuiz").then(m => ({ default: m.FractionMultiplicationQuiz }))) as any;
const Grade6FractionMultiplicationMatcher = lazy(() => import("@/components/math/grade-6/tortek/szorzas-torttel-a-reciprok/FractionMultiplicationMatcher").then(m => ({ default: m.FractionMultiplicationMatcher }))) as any;
const Grade6FractionMultiplicationSorter = lazy(() => import("@/components/math/grade-6/tortek/szorzas-torttel-a-reciprok/FractionMultiplicationSorter").then(m => ({ default: m.FractionMultiplicationSorter }))) as any;
const Grade6FractionDivisionTheory = lazy(() => import("@/components/math/grade-6/tortek/osztas-torttel/FractionDivisionTheory").then(m => ({ default: m.FractionDivisionTheory }))) as any;
const Grade6FractionDivisionQuiz = lazy(() => import("@/components/math/grade-6/tortek/osztas-torttel/FractionDivisionQuiz").then(m => ({ default: m.FractionDivisionQuiz }))) as any;
const Grade6FractionDivisionMatcher = lazy(() => import("@/components/math/grade-6/tortek/osztas-torttel/FractionDivisionMatcher").then(m => ({ default: m.FractionDivisionMatcher }))) as any;
const Grade6DecimalFractionsTheory = lazy(() => import("@/components/math/grade-6/tortek/mit-tanultunk-a-tizedes-tortekrol-ismetles/DecimalFractionsTheory").then(m => ({ default: m.DecimalFractionsTheory }))) as any;
const Grade6DecimalFractionsQuiz = lazy(() => import("@/components/math/grade-6/tortek/mit-tanultunk-a-tizedes-tortekrol-ismetles/DecimalFractionsQuiz").then(m => ({ default: m.DecimalFractionsQuiz }))) as any;
const Grade6FractionToDecimalMatcher = lazy(() => import("@/components/math/grade-6/tortek/mit-tanultunk-a-tizedes-tortekrol-ismetles/FractionToDecimalMatcher").then(m => ({ default: m.FractionToDecimalMatcher }))) as any;
const Grade6DecimalMultiplicationTheory = lazy(() => import("@/components/math/grade-6/tortek/szorzas-tizedes-torttel/DecimalMultiplicationTheory").then(m => ({ default: m.DecimalMultiplicationTheory }))) as any;
const Grade6DecimalMultiplicationQuiz = lazy(() => import("@/components/math/grade-6/tortek/szorzas-tizedes-torttel/DecimalMultiplicationQuiz").then(m => ({ default: m.DecimalMultiplicationQuiz }))) as any;
const Grade6DecimalMultiplicationMatcher = lazy(() => import("@/components/math/grade-6/tortek/szorzas-tizedes-torttel/DecimalMultiplicationMatcher").then(m => ({ default: m.DecimalMultiplicationMatcher }))) as any;
const Grade6DecimalMultiplicationSorter = lazy(() => import("@/components/math/grade-6/tortek/szorzas-tizedes-torttel/DecimalMultiplicationSorter").then(m => ({ default: m.DecimalMultiplicationSorter }))) as any;
const Grade6DecimalDivisionTheory = lazy(() => import("@/components/math/grade-6/tortek/osztas-tizedes-torttel/DecimalDivisionTheory").then(m => ({ default: m.DecimalDivisionTheory }))) as any;
const Grade6DecimalDivisionQuiz = lazy(() => import("@/components/math/grade-6/tortek/osztas-tizedes-torttel/DecimalDivisionQuiz").then(m => ({ default: m.DecimalDivisionQuiz }))) as any;
const Grade6DecimalDivisionMatcher = lazy(() => import("@/components/math/grade-6/tortek/osztas-tizedes-torttel/DecimalDivisionMatcher").then(m => ({ default: m.DecimalDivisionMatcher }))) as any;
const Grade6DecimalDivisionSorter = lazy(() => import("@/components/math/grade-6/tortek/osztas-tizedes-torttel/DecimalDivisionSorter").then(m => ({ default: m.DecimalDivisionSorter }))) as any;
const Grade6ComplexOperationsTheory = lazy(() => import("@/components/math/grade-6/tortek/osszetett-muveletek-zarojelfelbontas/ComplexOperationsTheory").then(m => ({ default: m.ComplexOperationsTheory }))) as any;
const Grade6ComplexOperationsQuiz = lazy(() => import("@/components/math/grade-6/tortek/osszetett-muveletek-zarojelfelbontas/ComplexOperationsQuiz").then(m => ({ default: m.ComplexOperationsQuiz }))) as any;
const Grade6ComplexOperationsMatcher = lazy(() => import("@/components/math/grade-6/tortek/osszetett-muveletek-zarojelfelbontas/ComplexOperationsMatcher").then(m => ({ default: m.ComplexOperationsMatcher }))) as any;
const Grade6ComplexOperationsSorter = lazy(() => import("@/components/math/grade-6/tortek/osszetett-muveletek-zarojelfelbontas/ComplexOperationsSorter").then(m => ({ default: m.ComplexOperationsSorter }))) as any;
const Grade6FractionsSummaryTheory = lazy(() => import("@/components/math/grade-6/tortek/osszefoglalas/FractionsSummaryTheory").then(m => ({ default: m.FractionsSummaryTheory }))) as any;
const Grade6FractionsSummaryQuiz = lazy(() => import("@/components/math/grade-6/tortek/osszefoglalas/FractionsSummaryQuiz").then(m => ({ default: m.FractionsSummaryQuiz }))) as any;
const Grade6FractionsSummaryMatcher = lazy(() => import("@/components/math/grade-6/tortek/osszefoglalas/FractionsSummaryMatcher").then(m => ({ default: m.FractionsSummaryMatcher }))) as any;
const Grade6FractionsSummarySorter = lazy(() => import("@/components/math/grade-6/tortek/osszefoglalas/FractionsSummarySorter").then(m => ({ default: m.FractionsSummarySorter }))) as any;

const WordProblemsModule = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/WordProblemsModule").then(m => ({ default: m.WordProblemsModule }))) as any;
const TriangleClassifier = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyesen-szimmetrikus-haromszogek-negyszogek-sokszogek/TriangleClassifier").then(m => ({ default: m.TriangleClassifier }))) as any;
const QuadrilateralClassifier = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyesen-szimmetrikus-haromszogek-negyszogek-sokszogek/QuadrilateralClassifier").then(m => ({ default: m.QuadrilateralClassifier }))) as any;
const CirclePartsGame = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-kor/CirclePartsGame").then(m => ({ default: m.CirclePartsGame }))) as any;
const DecimalFractionsTool = lazy(() => import("@/components/math/tools/DecimalFractionsTool").then(m => ({ default: m.DecimalFractionsTool }))) as any;
const NumberLineTool = lazy(() => import("@/components/math/tools/NumberLineTool").then(m => ({ default: m.NumberLineTool }))) as any;
const ManipulativeDivision = lazy(() => import("@/components/math/tools/ManipulativeDivision").then(m => ({ default: m.ManipulativeDivision }))) as any;
const ManipulativeAddition = lazy(() => import("@/components/math/tools/ManipulativeAddition").then(m => ({ default: m.ManipulativeAddition }))) as any;
const ConstructionTool = lazy(() => import("@/components/math/tools/ConstructionTool").then(m => ({ default: m.ConstructionTool }))) as any;
const PercentagesQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szazalekszamitas/PercentagesQuiz").then(m => ({ default: m.PercentagesQuiz }))) as any;
const PercentWordProblems = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/a-szazalekszamitas-gyakorlasa/PercentWordProblems").then(m => ({ default: m.PercentWordProblems }))) as any;
const EquationSolverTool = lazy(() => import("@/components/math/tools/EquationSolverTool").then(m => ({ default: m.EquationSolverTool }))) as any;
const EquationBalanceTool = lazy(() => import("@/components/math/tools/EquationBalanceTool").then(m => ({ default: m.EquationBalanceTool }))) as any;
const MoneyCalculationTool = lazy(() => import("@/components/math/tools/MoneyCalculationTool").then(m => ({ default: m.MoneyCalculationTool }))) as any;
const DecimalShifterTool = lazy(() => import("@/components/math/tools/DecimalShifterTool")) as any;
const PuzzleMakerTool = lazy(() => import("@/components/math/tools/PuzzleMakerTool").then(m => ({ default: m.PuzzleMakerTool }))) as any;
const TotoTool = lazy(() => import("@/components/math/tools/TotoTool").then(m => ({ default: m.TotoTool }))) as any;
const SmartWhiteboardTool = lazy(() => import("@/components/math/tools/SmartWhiteboardTool").then(m => ({ default: m.SmartWhiteboardTool }))) as any;
const SymmetryQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-tukrozes/SymmetryQuiz").then(m => ({ default: m.SymmetryQuiz }))) as any;
const LogicBlocksGame = lazy(() => import("@/components/math/games/logic-blocks/LogicBlocksGame").then(m => ({ default: m.LogicBlocksGame }))) as any;
const VennDiagramGame = lazy(() => import("@/components/math/grade-5/adatgyujtes-statisztika/venn/VennDiagramGame").then(m => ({ default: m.VennDiagramGame }))) as any;
const GroupingGame = lazy(() => import("@/components/math/grade-1/grouping/GroupingGame").then(m => ({ default: m.GroupingGame }))) as any;
const NumberGroupingGame = lazy(() => import("@/components/math/grade-1/grouping/NumberGroupingGame").then(m => ({ default: m.NumberGroupingGame }))) as any;
const SudokuGame = lazy(() => import("@/components/math/games/sudoku/SudokuGame").then(m => ({ default: m.SudokuGame }))) as any;
const SudokuGeneratorTool = lazy(() => import("@/components/math/tools/SudokuGeneratorTool").then(m => ({ default: m.SudokuGeneratorTool }))) as any;
const VennInterpretationQuiz = lazy(() => import("@/components/math/grade-5/adatgyujtes-statisztika/VennInterpretationQuiz").then(m => ({ default: m.VennInterpretationQuiz }))) as any;
const VennReadingGame = lazy(() => import("@/components/math/grade-5/adatgyujtes-statisztika/venn/VennReadingGame").then(m => ({ default: m.VennReadingGame }))) as any;
const AxialSymmetryGame = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-tukrozes/AxialSymmetryGame").then(m => ({ default: m.AxialSymmetryGame }))) as any;
const SymmetryErrorGame = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-tukrozes/SymmetryErrorGame").then(m => ({ default: m.SymmetryErrorGame }))) as any;
const AxialSymmetryQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-szimmetria/AxialSymmetryQuiz").then(m => ({ default: m.AxialSymmetryQuiz }))) as any;
const SymmetryConstructionTool = lazy(() => import("@/components/math/tools/SymmetryConstructionTool").then(m => ({ default: m.SymmetryConstructionTool }))) as any;
const AxialSymmetryPresentation = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-szimmetria/AxialSymmetryPresentation").then(m => ({ default: m.AxialSymmetryPresentation }))) as any;
const Grade6PlanarShapesTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/sikbeli-alakzatok/PlanarShapesTheory").then(m => ({ default: m.PlanarShapesTheory }))) as any;
const Grade6PlanarShapesQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/sikbeli-alakzatok/PlanarShapesQuiz").then(m => ({ default: m.PlanarShapesQuiz }))) as any;
const Grade6PlanarShapesMatcher = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/sikbeli-alakzatok/PlanarShapesMatcher").then(m => ({ default: m.PlanarShapesMatcher }))) as any;
const Grade6PlanarShapesSorter = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/sikbeli-alakzatok/PlanarShapesSorter").then(m => ({ default: m.PlanarShapesSorter }))) as any;
const Grade6CongruenceTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/egybevagosag/CongruenceTheory").then(m => ({ default: m.CongruenceTheory }))) as any;
const Grade6CongruenceQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/egybevagosag/CongruenceQuiz").then(m => ({ default: m.CongruenceQuiz }))) as any;
const Grade6CongruenceMatcher = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/egybevagosag/CongruenceMatcher").then(m => ({ default: m.CongruenceMatcher }))) as any;
const Grade6CongruenceSorter = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/egybevagosag/CongruenceSorter").then(m => ({ default: m.CongruenceSorter }))) as any;
const Grade6CircleTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-kor/CircleTheory").then(m => ({ default: m.CircleTheory }))) as any;
const Grade6CircleQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-kor/CircleQuiz").then(m => ({ default: m.CircleQuiz }))) as any;
const Grade6CircleMatcher = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-kor/CircleMatcher").then(m => ({ default: m.CircleMatcher }))) as any;
const Grade6CircleSorter = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-kor/CircleSorter").then(m => ({ default: m.CircleSorter }))) as any;
const Grade6BisectorTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-szakasz-felezomerolegese/BisectorTheory").then(m => ({ default: m.BisectorTheory }))) as any;
const Grade6BisectorQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-szakasz-felezomerolegese/BisectorQuiz").then(m => ({ default: m.BisectorQuiz }))) as any;
const Grade6BisectorMatcher = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-szakasz-felezomerolegese/BisectorMatcher").then(m => ({ default: m.BisectorMatcher }))) as any;
const Grade6BisectorSorter = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-szakasz-felezomerolegese/BisectorSorter").then(m => ({ default: m.BisectorSorter }))) as any;
const Grade6ConstructionsTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/szerkesztesek/ConstructionsTheory").then(m => ({ default: m.ConstructionsTheory }))) as any;
const Grade6ConstructionsQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/szerkesztesek/ConstructionsQuiz").then(m => ({ default: m.ConstructionsQuiz }))) as any;
const Grade6ConstructionsMatcher = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/szerkesztesek/ConstructionsMatcher").then(m => ({ default: m.ConstructionsMatcher }))) as any;
const Grade6ConstructionsSorter = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/szerkesztesek/ConstructionsSorter").then(m => ({ default: m.ConstructionsSorter }))) as any;
const Grade6AxialReflectionTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-tukrozes/AxialReflectionTheory").then(m => ({ default: m.AxialReflectionTheory }))) as any;
const Grade6AxialReflectionQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-tukrozes/AxialReflectionQuiz").then(m => ({ default: m.AxialReflectionQuiz }))) as any;
const Grade6AxialReflectionMatcher = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-tukrozes/AxialReflectionMatcher").then(m => ({ default: m.AxialReflectionMatcher }))) as any;
const Grade6AxialReflectionSorter = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-tukrozes/AxialReflectionSorter").then(m => ({ default: m.AxialReflectionSorter }))) as any;
const Grade6ReflectionPropertiesTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-tengelyes-tukrozes-tulajdonsagai/ReflectionPropertiesTheory").then(m => ({ default: m.ReflectionPropertiesTheory }))) as any;
const Grade6ReflectionPropertiesQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-tengelyes-tukrozes-tulajdonsagai/ReflectionPropertiesQuiz").then(m => ({ default: m.ReflectionPropertiesQuiz }))) as any;
const Grade6ReflectionPropertiesMatcher = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-tengelyes-tukrozes-tulajdonsagai/ReflectionPropertiesMatcher").then(m => ({ default: m.ReflectionPropertiesMatcher }))) as any;
const Grade6ReflectionPropertiesSorter = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-tengelyes-tukrozes-tulajdonsagai/ReflectionPropertiesSorter").then(m => ({ default: m.ReflectionPropertiesSorter }))) as any;
const Grade6AxialSymmetryTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-szimmetria/AxialSymmetryTheory").then(m => ({ default: m.AxialSymmetryTheory }))) as any;
const Grade6AxialSymmetryQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-szimmetria/AxialSymmetryQuiz").then(m => ({ default: m.AxialSymmetryQuiz }))) as any;
const Grade6AxialSymmetryMatcher = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-szimmetria/AxialSymmetryMatcher").then(m => ({ default: m.AxialSymmetryMatcher }))) as any;
const Grade6AxialSymmetrySorter = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyes-szimmetria/AxialSymmetrySorter").then(m => ({ default: m.AxialSymmetrySorter }))) as any;
const Grade6SymmetricShapesTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyesen-szimmetrikus-haromszogek-negyszogek-sokszogek/SymmetricShapesTheory").then(m => ({ default: m.SymmetricShapesTheory }))) as any;
const Grade6SymmetricShapesQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyesen-szimmetrikus-haromszogek-negyszogek-sokszogek/SymmetricShapesQuiz").then(m => ({ default: m.SymmetricShapesQuiz }))) as any;
const Grade6SymmetricShapesMatcher = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyesen-szimmetrikus-haromszogek-negyszogek-sokszogek/SymmetricShapesMatcher").then(m => ({ default: m.SymmetricShapesMatcher }))) as any;
const Grade6SymmetricShapesSorter = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyesen-szimmetrikus-haromszogek-negyszogek-sokszogek/SymmetricShapesSorter").then(m => ({ default: m.SymmetricShapesSorter }))) as any;
const Grade6ConstructionTasksTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/szerkesztesi-feladatok/ConstructionTasksTheory").then(m => ({ default: m.ConstructionTasksTheory }))) as any;
const Grade6ConstructionTasksQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/szerkesztesi-feladatok/ConstructionTasksQuiz").then(m => ({ default: m.ConstructionTasksQuiz }))) as any;
const Grade6ConstructionTasksMatcher = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/szerkesztesi-feladatok/ConstructionTasksMatcher").then(m => ({ default: m.ConstructionTasksMatcher }))) as any;
const Grade6ConstructionTasksSorter = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/szerkesztesi-feladatok/ConstructionTasksSorter").then(m => ({ default: m.ConstructionTasksSorter }))) as any;
const Grade6GeometrySummaryTheory = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/osszefoglalas/GeometrySummaryTheory").then(m => ({ default: m.GeometrySummaryTheory }))) as any;
const Grade6GeometrySummaryQuiz = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/osszefoglalas/GeometrySummaryQuiz").then(m => ({ default: m.GeometrySummaryQuiz }))) as any;
const Grade6GeometrySummaryMatcher = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/osszefoglalas/GeometrySummaryMatcher").then(m => ({ default: m.GeometrySummaryMatcher }))) as any;
const Grade6GeometrySummarySorter = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/osszefoglalas/GeometrySummarySorter").then(m => ({ default: m.GeometrySummarySorter }))) as any;
const PerimeterAreaTool = lazy(() => import("@/components/math/tools/PerimeterAreaTool").then(m => ({ default: m.PerimeterAreaTool }))) as any;
const StudentFeedbackHub = lazy(() => import("@/components/feedback/StudentFeedbackHub").then(m => ({ default: m.StudentFeedbackHub }))) as any;
const WordSearchTool = lazy(() => import("@/components/math/tools/WordSearchTool").then(m => ({ default: m.WordSearchTool }))) as any;
const ChessGame = lazy(() => import("@/components/math/games/chess/ChessGame")) as any;
const ColorSequenceGame = lazy(() => import("@/components/math/games/color-sequence/ColorSequenceGame")) as any;
const MatchingCreator = lazy(() => import("@/components/math/tools/MatchingCreator").then(m => ({ default: m.MatchingCreator }))) as any;
const VolumeSurfaceTool = lazy(() => import("@/components/math/tools/VolumeSurfaceTool").then(m => ({ default: m.VolumeSurfaceTool }))) as any;
const EquationBalanceQuiz = lazy(() => import("@/components/math/grade-7/szazalekszamitas/EquationBalanceQuiz").then(m => ({ default: m.EquationBalanceQuiz }))) as any;
const WordProblemsQuiz = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/WordProblemsQuiz").then(m => ({ default: m.WordProblemsQuiz }))) as any;
const UnitConverterTool = lazy(() => import("@/components/math/tools/UnitConverterTool").then(m => ({ default: m.UnitConverterTool }))) as any;
const CapacityConverterTool = lazy(() => import("@/components/math/tools/CapacityConverterTool").then(m => ({ default: m.CapacityConverterTool }))) as any;
const AnalogClockTool = lazy(() => import("@/components/math/tools/AnalogClockTool").then(m => ({ default: m.AnalogClockTool }))) as any;
const ScientificCalculator = lazy(() => import("@/components/math/tools/ScientificCalculator").then(m => ({ default: m.ScientificCalculator }))) as any;
const AlgebraCloudTool = lazy(() => import("@/components/math/tools/AlgebraCloudTool").then(m => ({ default: m.AlgebraCloudTool }))) as any;
const PerimeterQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat").then(m => ({ default: m.PerimeterQuiz }))) as any;
const VolumeQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat").then(m => ({ default: m.VolumeQuiz }))) as any;
const SurfaceAreaQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat").then(m => ({ default: m.SurfaceAreaQuiz }))) as any;
const MappingQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/MappingQuiz").then(m => ({ default: m.MappingQuiz }))) as any;
const FunctionTableQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/FunctionTableQuiz").then(m => ({ default: m.FunctionTableQuiz }))) as any;
const Grade7StatsModule = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/Grade7StatsModule").then(m => ({ default: m.Grade7StatsModule }))) as any;
const Grade5RomanNumeralsTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/a-szamok-kialakulasa-a-romai-szamok/RomanNumeralsTheory").then(m => ({ default: m.RomanNumeralsTheory }))) as any;
const Grade5RomanNumeralsQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/a-szamok-kialakulasa-a-romai-szamok/RomanNumeralsQuiz").then(m => ({ default: m.RomanNumeralsQuiz }))) as any;
const Grade5PlaceValueTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/a-helyiertekes-iras/PlaceValueTheory").then(m => ({ default: m.PlaceValueTheory }))) as any;
const Grade5PlaceValueQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/a-helyiertekes-iras/PlaceValueQuiz").then(m => ({ default: m.PlaceValueQuiz }))) as any;
const Grade5NumberReadingTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/a-szamjegyek-harmas-csoportositasa-es-a-szamok-kiolvasasa/NumberReadingTheory").then(m => ({ default: m.NumberReadingTheory }))) as any;
const Grade5NumberReadingQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/a-szamjegyek-harmas-csoportositasa-es-a-szamok-kiolvasasa/NumberReadingQuiz").then(m => ({ default: m.NumberReadingQuiz }))) as any;
const Grade5NumberSpellingTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/a-termeszetes-szamok-helyesirasa/NumberSpellingTheory").then(m => ({ default: m.NumberSpellingTheory }))) as any;
const Grade5NumberSpellingQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/a-termeszetes-szamok-helyesirasa/NumberSpellingQuiz").then(m => ({ default: m.NumberSpellingQuiz }))) as any;
const Grade5NumberSystemsTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/szamrendszerek/NumberSystemsTheory").then(m => ({ default: m.NumberSystemsTheory }))) as any;
const Grade5NumberSystemsQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/szamrendszerek/NumberSystemsQuiz").then(m => ({ default: m.NumberSystemsQuiz }))) as any;
const Grade5NumberLineTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/a-szamok-abrazolasa-a-szamegyenesen/NumberLineTheory").then(m => ({ default: m.NumberLineTheory }))) as any;
const Grade5NumberLineQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/a-szamok-abrazolasa-a-szamegyenesen/NumberLineQuiz").then(m => ({ default: m.NumberLineQuiz }))) as any;
const Grade5RoundingTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/becsles-kerekites/RoundingTheory").then(m => ({ default: m.RoundingTheory }))) as any;
const Grade5RoundingQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/becsles-kerekites/RoundingQuiz").then(m => ({ default: m.RoundingQuiz }))) as any;
const Grade5AdditionTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/osszeadas-irasbeli-osszeadas/AdditionTheory").then(m => ({ default: m.AdditionTheory }))) as any;
const Grade5AdditionQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/osszeadas-irasbeli-osszeadas/AdditionQuiz").then(m => ({ default: m.AdditionQuiz }))) as any;
const Grade5SubtractionTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/kivonas-irasbeli-kivonas/SubtractionTheory").then(m => ({ default: m.SubtractionTheory }))) as any;
const Grade5SubtractionQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/kivonas-irasbeli-kivonas/SubtractionQuiz").then(m => ({ default: m.SubtractionQuiz }))) as any;
const Grade5MultiplicationTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/szorzas-irasbeli-szorzas/MultiplicationTheory").then(m => ({ default: m.MultiplicationTheory }))) as any;
const Grade5MultiplicationQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/szorzas-irasbeli-szorzas/MultiplicationQuiz").then(m => ({ default: m.MultiplicationQuiz }))) as any;
const Grade5DivisionTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/osztas-irasbeli-osztas-ketjegyu-osztoval/DivisionTheory").then(m => ({ default: m.DivisionTheory }))) as any;
const Grade5DivisionQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/osztas-irasbeli-osztas-ketjegyu-osztoval/DivisionQuiz").then(m => ({ default: m.DivisionQuiz }))) as any;
const Grade5OrderOfOperationsTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/muveletek-tulajdonsagai-muveleti-sorrend-zarojelek/OrderOfOperationsTheory").then(m => ({ default: m.OrderOfOperationsTheory }))) as any;
const Grade5OrderOfOperationsQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/muveletek-tulajdonsagai-muveleti-sorrend-zarojelek/OrderOfOperationsQuiz").then(m => ({ default: m.OrderOfOperationsQuiz }))) as any;
const Grade5NegativeNumbersTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/negativ-szamok/NegativeNumbersTheory").then(m => ({ default: m.NegativeNumbersTheory }))) as any;
const Grade5NegativeNumbersQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/negativ-szamok/NegativeNumbersQuiz").then(m => ({ default: m.NegativeNumbersQuiz }))) as any;
const Grade5OppositeAbsoluteTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/a-szamok-ellentettje-es-abszolut-erteke/OppositeAbsoluteTheory").then(m => ({ default: m.OppositeAbsoluteTheory }))) as any;
const Grade5OppositeAbsoluteQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/a-szamok-ellentettje-es-abszolut-erteke/OppositeAbsoluteQuiz").then(m => ({ default: m.OppositeAbsoluteQuiz }))) as any;
const Grade5IntegerAdditionSubtractionTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/egesz-szamok-osszeadasa-es-kivonasa/IntegerAdditionSubtractionTheory").then(m => ({ default: m.IntegerAdditionSubtractionTheory }))) as any;
const Grade5IntegerAdditionSubtractionQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/egesz-szamok-osszeadasa-es-kivonasa/IntegerAdditionSubtractionQuiz").then(m => ({ default: m.IntegerAdditionSubtractionQuiz }))) as any;
const Grade5Chapter1SummaryTheory = lazy(() => import("@/components/math/grade-5/egesz-szamok/osszefoglalas/Chapter1SummaryTheory").then(m => ({ default: m.Chapter1SummaryTheory }))) as any;
const Grade5Chapter1SummaryQuiz = lazy(() => import("@/components/math/grade-5/egesz-szamok/osszefoglalas/Chapter1SummaryQuiz").then(m => ({ default: m.Chapter1SummaryQuiz }))) as any;
const Grade5FractionsIntroTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/ismerkedes-a-tortekkel/FractionsIntroTheory").then(m => ({ default: m.FractionsIntroTheory }))) as any;
const Grade5FractionsIntroQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/ismerkedes-a-tortekkel/FractionsIntroQuiz").then(m => ({ default: m.FractionsIntroQuiz }))) as any;
const Grade5FractionsExpandSimplifyTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tortek-bovitese-egyszerusitese-osszehasonlitasa/FractionsExpandSimplifyTheory").then(m => ({ default: m.FractionsExpandSimplifyTheory }))) as any;
const Grade5FractionsExpandSimplifyQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tortek-bovitese-egyszerusitese-osszehasonlitasa/FractionsExpandSimplifyQuiz").then(m => ({ default: m.FractionsExpandSimplifyQuiz }))) as any;
const Grade5FractionsNumberLineTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tortek-abrazolasa-szamegyenesen-vegyes-tortek/FractionsNumberLineTheory").then(m => ({ default: m.FractionsNumberLineTheory }))) as any;
const Grade5FractionsNumberLineQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tortek-abrazolasa-szamegyenesen-vegyes-tortek/FractionsNumberLineQuiz").then(m => ({ default: m.FractionsNumberLineQuiz }))) as any;
const Grade5FractionsSameDenomTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/egyenlo-nevezeju-tortek-osszeadasa-es-kivonasa/FractionsSameDenomTheory").then(m => ({ default: m.FractionsSameDenomTheory }))) as any;
const Grade5FractionsSameDenomQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/egyenlo-nevezeju-tortek-osszeadasa-es-kivonasa/FractionsSameDenomQuiz").then(m => ({ default: m.FractionsSameDenomQuiz }))) as any;
const Grade5FractionsDiffDenomTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/kulonbozo-nevezeju-tortek-osszeadasa-es-kivonasa/FractionsDiffDenomTheory").then(m => ({ default: m.FractionsDiffDenomTheory }))) as any;
const Grade5FractionsDiffDenomQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/kulonbozo-nevezeju-tortek-osszeadasa-es-kivonasa/FractionsDiffDenomQuiz").then(m => ({ default: m.FractionsDiffDenomQuiz }))) as any;
const Grade5FractionMultiplyTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tort-szorzasa-termeszetes-szammal/FractionMultiplyTheory").then(m => ({ default: m.FractionMultiplyTheory }))) as any;
const Grade5FractionMultiplyQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tort-szorzasa-termeszetes-szammal/FractionMultiplyQuiz").then(m => ({ default: m.FractionMultiplyQuiz }))) as any;
const Grade5FractionDivideTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tort-osztasa-pozitiv-egesz-szammal/FractionDivideTheory").then(m => ({ default: m.FractionDivideTheory }))) as any;
const Grade5FractionDivideQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tort-osztasa-pozitiv-egesz-szammal/FractionDivideQuiz").then(m => ({ default: m.FractionDivideQuiz }))) as any;
const Grade5OrderOfOperationsFractionsTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/muveletek-sorrendje-zarojelfelbontas/OrderOfOperationsFractionsTheory").then(m => ({ default: m.OrderOfOperationsFractionsTheory }))) as any;
const Grade5OrderOfOperationsFractionsQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/muveletek-sorrendje-zarojelfelbontas/OrderOfOperationsFractionsQuiz").then(m => ({ default: m.OrderOfOperationsFractionsQuiz }))) as any;
const Grade5FractionsReviewTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/mit-tanultunk-eddig-gyakoroljunk/FractionsReviewTheory").then(m => ({ default: m.FractionsReviewTheory }))) as any;
const Grade5FractionsReviewQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/mit-tanultunk-eddig-gyakoroljunk/FractionsReviewQuiz").then(m => ({ default: m.FractionsReviewQuiz }))) as any;
const Grade5DecimalFractionsTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tizedes-tortek/DecimalFractionsTheory").then(m => ({ default: m.DecimalFractionsTheory }))) as any;
const Grade5DecimalFractionsQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tizedes-tortek/DecimalFractionsQuiz").then(m => ({ default: m.DecimalFractionsQuiz }))) as any;
const Grade5DecimalCompareRoundingTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tizedes-tortek-abrazolasa-kerekitese-es-osszehasonlitasa/DecimalCompareRoundingTheory").then(m => ({ default: m.DecimalCompareRoundingTheory }))) as any;
const Grade5DecimalCompareRoundingQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tizedes-tortek-abrazolasa-kerekitese-es-osszehasonlitasa/DecimalCompareRoundingQuiz").then(m => ({ default: m.DecimalCompareRoundingQuiz }))) as any;
const Grade5DecimalAdditionSubtractionTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tizedes-tortek-osszeadasa-es-kivonasa/DecimalAdditionSubtractionTheory").then(m => ({ default: m.DecimalAdditionSubtractionTheory }))) as any;
const Grade5DecimalAdditionSubtractionQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tizedes-tortek-osszeadasa-es-kivonasa/DecimalAdditionSubtractionQuiz").then(m => ({ default: m.DecimalAdditionSubtractionQuiz }))) as any;
const Grade5DecimalMultiplicationTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tizedes-tortek-szorzasa-termeszetes-szammal/DecimalMultiplicationTheory").then(m => ({ default: m.DecimalMultiplicationTheory }))) as any;
const Grade5DecimalMultiplicationQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tizedes-tortek-szorzasa-termeszetes-szammal/DecimalMultiplicationQuiz").then(m => ({ default: m.DecimalMultiplicationQuiz }))) as any;
const Grade5DecimalDivisionTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tizedes-tortek-osztasa-pozitiv-egesz-szammal/DecimalDivisionTheory").then(m => ({ default: m.DecimalDivisionTheory }))) as any;
const Grade5DecimalDivisionQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/tizedes-tortek-osztasa-pozitiv-egesz-szammal/DecimalDivisionQuiz").then(m => ({ default: m.DecimalDivisionQuiz }))) as any;
const Grade5FractionToDecimalTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/kozonseges-tortek-tizedes-tort-alakja/FractionToDecimalTheory").then(m => ({ default: m.FractionToDecimalTheory }))) as any;
const Grade5FractionToDecimalQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/kozonseges-tortek-tizedes-tort-alakja/FractionToDecimalQuiz").then(m => ({ default: m.FractionToDecimalQuiz }))) as any;
const Grade5Chapter2SummaryTheory = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/osszefoglalas/Chapter2SummaryTheory").then(m => ({ default: m.Chapter2SummaryTheory }))) as any;
const Grade5Chapter2SummaryQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek/osszefoglalas/Chapter2SummaryQuiz").then(m => ({ default: m.Chapter2SummaryQuiz }))) as any;
const Grade5GroupingTheory = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/csoportositasok/GroupingTheory").then(m => ({ default: m.GroupingTheory }))) as any;
const Grade5GroupingQuiz = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/csoportositasok/GroupingQuiz").then(m => ({ default: m.GroupingQuiz }))) as any;
const Grade5SetsTheory = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/halmazok/SetsTheory").then(m => ({ default: m.SetsTheory }))) as any;
const Grade5SetsQuiz = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/halmazok/SetsQuiz").then(m => ({ default: m.SetsQuiz }))) as any;
const Grade5BodiesTheory = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/test-felulet-vonal-pont/BodiesTheory").then(m => ({ default: m.BodiesTheory }))) as any;
const Grade5BodiesQuiz = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/test-felulet-vonal-pont/BodiesQuiz").then(m => ({ default: m.BodiesQuiz }))) as any;
const Grade5AnglesTheory = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/a-szog/AnglesTheory").then(m => ({ default: m.AnglesTheory }))) as any;
const Grade5AnglesQuiz = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/a-szog/AnglesQuiz").then(m => ({ default: m.AnglesQuiz }))) as any;
const Grade5PolygonsTheory = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/sikidomok-sokszogek/PolygonsTheory").then(m => ({ default: m.PolygonsTheory }))) as any;
const Grade5PolygonsQuiz = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/sikidomok-sokszogek/PolygonsQuiz").then(m => ({ default: m.PolygonsQuiz }))) as any;
const Grade5BuildingTheory = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/testek-epitese-szemleltetese/BuildingTheory").then(m => ({ default: m.BuildingTheory }))) as any;
const Grade5BuildingQuiz = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/testek-epitese-szemleltetese/BuildingQuiz").then(m => ({ default: m.BuildingQuiz }))) as any;
const Grade5LinesTheory = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/egyenesek-sikban-terben/LinesTheory").then(m => ({ default: m.LinesTheory }))) as any;
const Grade5LinesQuiz = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/egyenesek-sikban-terben/LinesQuiz").then(m => ({ default: m.LinesQuiz }))) as any;
const Grade5QuadsTheory = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/teglalap-negyzet/QuadsTheory").then(m => ({ default: m.QuadsTheory }))) as any;
const Grade5QuadsQuiz = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/teglalap-negyzet/QuadsQuiz").then(m => ({ default: m.QuadsQuiz }))) as any;
const Grade5SummaryTheory = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/osszefoglalas/SummaryTheory").then(m => ({ default: m.SummaryTheory }))) as any;
const Grade5SummaryQuiz = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/osszefoglalas/SummaryQuiz").then(m => ({ default: m.SummaryQuiz }))) as any;
const Grade5LengthTheory = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/a-hosszusag-merese/LengthTheory").then(m => ({ default: m.LengthTheory }))) as any;
const Grade5LengthQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/a-hosszusag-merese/LengthQuiz").then(m => ({ default: m.LengthQuiz }))) as any;
const Grade5LengthMatcher = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/a-hosszusag-merese/LengthMatcher").then(m => ({ default: m.LengthMatcher }))) as any;
const Grade5LengthSorter = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/a-hosszusag-merese/LengthSorter").then(m => ({ default: m.LengthSorter }))) as any;
const Grade5PerimeterTheory = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglalap-negyzet-kerulete/PerimeterTheory").then(m => ({ default: m.PerimeterTheory }))) as any;
const Grade5PerimeterQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglalap-negyzet-kerulete/PerimeterQuiz").then(m => ({ default: m.PerimeterQuiz }))) as any;
const Grade5PerimeterMatcher = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglalap-negyzet-kerulete/PerimeterMatcher").then(m => ({ default: m.PerimeterMatcher }))) as any;
const Grade5PerimeterSorter = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglalap-negyzet-kerulete/PerimeterSorter").then(m => ({ default: m.PerimeterSorter }))) as any;
const Grade5AreaTheory = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/a-terulet-merese/AreaTheory").then(m => ({ default: m.AreaTheory }))) as any;
const Grade5AreaQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/a-terulet-merese/AreaQuiz").then(m => ({ default: m.AreaQuiz }))) as any;
const Grade5AreaMatcher = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/a-terulet-merese/AreaMatcher").then(m => ({ default: m.AreaMatcher }))) as any;
const Grade5AreaSorter = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/a-terulet-merese/AreaSorter").then(m => ({ default: m.AreaSorter }))) as any;
const Grade5RectangleAreaTheory = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglalap-negyzet-terulete/RectangleAreaTheory").then(m => ({ default: m.RectangleAreaTheory }))) as any;
const Grade5RectangleAreaQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglalap-negyzet-terulete/RectangleAreaQuiz").then(m => ({ default: m.RectangleAreaQuiz }))) as any;
const Grade5RectangleAreaMatcher = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglalap-negyzet-terulete/RectangleAreaMatcher").then(m => ({ default: m.RectangleAreaMatcher }))) as any;
const Grade5RectangleAreaSorter = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglalap-negyzet-terulete/RectangleAreaSorter").then(m => ({ default: m.RectangleAreaSorter }))) as any;
const Grade5CuboidCubeTheory = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglatest-kocka/CuboidCubeTheory").then(m => ({ default: m.CuboidCubeTheory }))) as any;
const Grade5CuboidCubeQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglatest-kocka/CuboidCubeQuiz").then(m => ({ default: m.CuboidCubeQuiz }))) as any;
const Grade5CuboidCubeMatcher = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglatest-kocka/CuboidCubeMatcher").then(m => ({ default: m.CuboidCubeMatcher }))) as any;
const Grade5CuboidCubeSorter = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglatest-kocka/CuboidCubeSorter").then(m => ({ default: m.CuboidCubeSorter }))) as any;
const Grade5SurfaceAreaTheory = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglatest-kocka-felszine/SurfaceAreaTheory").then(m => ({ default: m.SurfaceAreaTheory }))) as any;
const Grade5SurfaceAreaQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglatest-kocka-felszine/SurfaceAreaQuiz").then(m => ({ default: m.SurfaceAreaQuiz }))) as any;
const Grade5SurfaceAreaMatcher = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglatest-kocka-felszine/SurfaceAreaMatcher").then(m => ({ default: m.SurfaceAreaMatcher }))) as any;
const Grade5SurfaceAreaSorter = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglatest-kocka-felszine/SurfaceAreaSorter").then(m => ({ default: m.SurfaceAreaSorter }))) as any;
const Grade5VolumeMeasureTheory = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/a-terfogat-merese/VolumeMeasureTheory").then(m => ({ default: m.VolumeMeasureTheory }))) as any;
const Grade5VolumeMeasureQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/a-terfogat-merese/VolumeMeasureQuiz").then(m => ({ default: m.VolumeMeasureQuiz }))) as any;
const Grade5VolumeMeasureMatcher = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/a-terfogat-merese/VolumeMeasureMatcher").then(m => ({ default: m.VolumeMeasureMatcher }))) as any;
const Grade5VolumeMeasureSorter = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/a-terfogat-merese/VolumeMeasureSorter").then(m => ({ default: m.VolumeMeasureSorter }))) as any;
const Grade5CuboidCubeVolumeTheory = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglatest-kocka-terfogata/CuboidCubeVolumeTheory").then(m => ({ default: m.CuboidCubeVolumeTheory }))) as any;
const Grade5CuboidCubeVolumeQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglatest-kocka-terfogata/VolumeQuiz").then(m => ({ default: m.CuboidCubeVolumeQuiz }))) as any;
const Grade5CuboidCubeVolumeMatcher = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglatest-kocka-terfogata/CuboidCubeVolumeMatcher").then(m => ({ default: m.CuboidCubeVolumeMatcher }))) as any;
const Grade5CuboidCubeVolumeSorter = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/teglatest-kocka-terfogata/CuboidCubeVolumeSorter").then(m => ({ default: m.CuboidCubeVolumeSorter }))) as any;
const Grade5PracticalTheory = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/gyakorlati-feladatok/PracticalProblemsTheory").then(m => ({ default: m.PracticalProblemsTheory }))) as any;
const Grade5PracticalQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/gyakorlati-feladatok/PracticalProblemsQuiz").then(m => ({ default: m.PracticalProblemsQuiz }))) as any;
const Grade5PracticalMatcher = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/gyakorlati-feladatok/PracticalProblemsMatcher").then(m => ({ default: m.PracticalProblemsMatcher }))) as any;
const Grade5PracticalSorter = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/gyakorlati-feladatok/PracticalProblemsSorter").then(m => ({ default: m.PracticalProblemsSorter }))) as any;
const Grade5MeasurementSummaryTheory = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/osszefoglalas/MeasurementSummaryTheory").then(m => ({ default: m.MeasurementSummaryTheory }))) as any;
const Grade5MeasurementSummaryQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/osszefoglalas/MeasurementSummaryQuiz").then(m => ({ default: m.MeasurementSummaryQuiz }))) as any;
const Grade5MeasurementSummaryMatcher = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/osszefoglalas/MeasurementSummaryMatcher").then(m => ({ default: m.MeasurementSummaryMatcher }))) as any;
const Grade5MeasurementSummarySorter = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat/osszefoglalas/MeasurementSummarySorter").then(m => ({ default: m.MeasurementSummarySorter }))) as any;
const Grade5LocationRoleTheory = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/a-helymeghatarozas-szerepe-kornyezetunkben/LocationRoleTheory").then(m => ({ default: m.LocationRoleTheory }))) as any;
const Grade5LocationRoleQuiz = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/a-helymeghatarozas-szerepe-kornyezetunkben/LocationRoleQuiz").then(m => ({ default: m.LocationRoleQuiz }))) as any;
const Grade5LocationRoleMatcher = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/a-helymeghatarozas-szerepe-kornyezetunkben/LocationRoleMatcher").then(m => ({ default: m.LocationRoleMatcher }))) as any;
const Grade5LocationRoleSorter = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/a-helymeghatarozas-szerepe-kornyezetunkben/LocationRoleSorter").then(m => ({ default: m.LocationRoleSorter }))) as any;
const Grade5GridLocationTheory = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/helymeghatarozas/GridLocationTheory").then(m => ({ default: m.GridLocationTheory }))) as any;
const Grade5GridLocationQuiz = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/helymeghatarozas/GridLocationQuiz").then(m => ({ default: m.GridLocationQuiz }))) as any;
const Grade5GridLocationMatcher = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/helymeghatarozas/GridLocationMatcher").then(m => ({ default: m.GridLocationMatcher }))) as any;
const Grade5GridLocationSorter = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/helymeghatarozas/GridLocationSorter").then(m => ({ default: m.GridLocationSorter }))) as any;
const Grade5CoordinateSystemTheory = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/a-derekszogu-koordinata-rendszer/CoordinateSystemTheory").then(m => ({ default: m.CoordinateSystemTheory }))) as any;
const Grade5CoordinateSystemQuiz = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/a-derekszogu-koordinata-rendszer/CoordinateSystemQuiz").then(m => ({ default: m.CoordinateSystemQuiz }))) as any;
const Grade5CoordinateSystemMatcher = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/a-derekszogu-koordinata-rendszer/CoordinateSystemMatcher").then(m => ({ default: m.CoordinateSystemMatcher }))) as any;
const Grade5CoordinateSystemSorter = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/a-derekszogu-koordinata-rendszer/CoordinateSystemSorter").then(m => ({ default: m.CoordinateSystemSorter }))) as any;
const Grade5PointPlottingTheory = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/pontok-abrazolasa/PointPlottingTheory").then(m => ({ default: m.PointPlottingTheory }))) as any;
const Grade5PointPlottingQuiz = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/pontok-abrazolasa/PointPlottingQuiz").then(m => ({ default: m.PointPlottingQuiz }))) as any;
const Grade5PointPlottingMatcher = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/pontok-abrazolasa/PointPlottingMatcher").then(m => ({ default: m.PointPlottingMatcher }))) as any;
const Grade5PointPlottingSorter = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/pontok-abrazolasa/PointPlottingSorter").then(m => ({ default: m.PointPlottingSorter }))) as any;
const Grade5SpatialOrientationTheory = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/tajekozodas-sikban-terben/SpatialOrientationTheory").then(m => ({ default: m.SpatialOrientationTheory }))) as any;
const Grade5SpatialOrientationQuiz = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/tajekozodas-sikban-terben/SpatialOrientationQuiz").then(m => ({ default: m.SpatialOrientationQuiz }))) as any;
const Grade5SpatialOrientationMatcher = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/tajekozodas-sikban-terben/SpatialOrientationMatcher").then(m => ({ default: m.SpatialOrientationMatcher }))) as any;
const Grade5SpatialOrientationSorter = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/tajekozodas-sikban-terben/SpatialOrientationSorter").then(m => ({ default: m.SpatialOrientationSorter }))) as any;
const Grade5RhythmPatternsTheory = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/ritmusok-diszitesek/RhythmPatternsTheory").then(m => ({ default: m.RhythmPatternsTheory }))) as any;
const Grade5RhythmPatternsQuiz = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/ritmusok-diszitesek/RhythmPatternsQuiz").then(m => ({ default: m.RhythmPatternsQuiz }))) as any;
const Grade5RhythmPatternsMatcher = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/ritmusok-diszitesek/RhythmPatternsMatcher").then(m => ({ default: m.RhythmPatternsMatcher }))) as any;
const Grade5RhythmPatternsSorter = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/ritmusok-diszitesek/RhythmPatternsSorter").then(m => ({ default: m.RhythmPatternsSorter }))) as any;
const Grade5RelationsTheory = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/keressunk-osszefuggeseket/RelationsTheory").then(m => ({ default: m.RelationsTheory }))) as any;
const Grade5RelationsQuiz = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/keressunk-osszefuggeseket/RelationsQuiz").then(m => ({ default: m.RelationsQuiz }))) as any;
const Grade5RelationsMatcher = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/keressunk-osszefuggeseket/RelationsMatcher").then(m => ({ default: m.RelationsMatcher }))) as any;
const Grade5RelationsSorter = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/keressunk-osszefuggeseket/RelationsSorter").then(m => ({ default: m.RelationsSorter }))) as any;
const Grade5SequencesTheory = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/sorozatok/SequencesTheory").then(m => ({ default: m.SequencesTheory }))) as any;
const Grade5SequencesQuiz = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/sorozatok/SequencesQuiz").then(m => ({ default: m.SequencesQuiz }))) as any;
const Grade5SequencesMatcher = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/sorozatok/SequencesMatcher").then(m => ({ default: m.SequencesMatcher }))) as any;
const Grade5SequencesSorter = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/sorozatok/SequencesSorter").then(m => ({ default: m.SequencesSorter }))) as any;
const Grade5FamousSequencesTheory = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/nevezetes-erdekes-sorozatok/FamousSequencesTheory").then(m => ({ default: m.FamousSequencesTheory }))) as any;
const Grade5FamousSequencesQuiz = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/nevezetes-erdekes-sorozatok/FamousSequencesQuiz").then(m => ({ default: m.FamousSequencesQuiz }))) as any;
const Grade5FamousSequencesMatcher = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/nevezetes-erdekes-sorozatok/FamousSequencesMatcher").then(m => ({ default: m.FamousSequencesMatcher }))) as any;
const Grade5FamousSequencesSorter = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/nevezetes-erdekes-sorozatok/FamousSequencesSorter").then(m => ({ default: m.FamousSequencesSorter }))) as any;
const Grade5LocationSummaryTheory = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/osszefoglalas/LocationSummaryTheory").then(m => ({ default: m.LocationSummaryTheory }))) as any;
const Grade5LocationSummaryQuiz = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/osszefoglalas/LocationSummaryQuiz").then(m => ({ default: m.LocationSummaryQuiz }))) as any;
const Grade5LocationSummaryMatcher = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/osszefoglalas/LocationSummaryMatcher").then(m => ({ default: m.LocationSummaryMatcher }))) as any;
const Grade5LocationSummarySorter = lazy(() => import("@/components/math/grade-5/helymeghatarozas-sorozatok/osszefoglalas/LocationSummarySorter").then(m => ({ default: m.LocationSummarySorter }))) as any;
const RatioIntroTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/az-arany-fogalma/RatioIntroTheory").then(m => ({ default: m.RatioIntroTheory }))) as any;
const RatioIntroQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/az-arany-fogalma/RatioIntroQuiz").then(m => ({ default: m.RatioIntroQuiz }))) as any;
const RatioIntroMatcher = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/az-arany-fogalma/RatioIntroMatcher").then(m => ({ default: m.RatioIntroMatcher }))) as any;
const RatioIntroSorter = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/az-arany-fogalma/RatioIntroSorter").then(m => ({ default: m.RatioIntroSorter }))) as any;
const RatioCreatorQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/az-arany-fogalma/RatioCreatorQuiz").then(m => ({ default: m.RatioCreatorQuiz }))) as any;
const ProportionalDivisionTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/aranyos-osztas/ProportionalDivisionTheory").then(m => ({ default: m.ProportionalDivisionTheory }))) as any;
const ProportionalDivisionQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/aranyos-osztas/ProportionalDivisionQuiz").then(m => ({ default: m.ProportionalDivisionQuiz }))) as any;
const ProportionalDivisionMatcher = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/aranyos-osztas/ProportionalDivisionMatcher").then(m => ({ default: m.ProportionalDivisionMatcher }))) as any;
const ProportionalDivisionSorter = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/aranyos-osztas/ProportionalDivisionSorter").then(m => ({ default: m.ProportionalDivisionSorter }))) as any;
const DirectProportionTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/egyenes-aranyossag/DirectProportionTheory").then(m => ({ default: m.DirectProportionTheory }))) as any;
const DirectProportionQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/egyenes-aranyossag/DirectProportionQuiz").then(m => ({ default: m.DirectProportionQuiz }))) as any;
const DirectProportionMatcher = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/egyenes-aranyossag/DirectProportionMatcher").then(m => ({ default: m.DirectProportionMatcher }))) as any;
const DirectProportionSorter = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/egyenes-aranyossag/DirectProportionSorter").then(m => ({ default: m.DirectProportionSorter }))) as any;
const DirectProportionGraphTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/egyenes-aranyossag-grafikonja/DirectProportionGraphTheory").then(m => ({ default: m.DirectProportionGraphTheory }))) as any;
const DirectProportionGraphQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/egyenes-aranyossag-grafikonja/DirectProportionGraphQuiz").then(m => ({ default: m.DirectProportionGraphQuiz }))) as any;
const DirectProportionGraphMatcher = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/egyenes-aranyossag-grafikonja/DirectProportionGraphMatcher").then(m => ({ default: m.DirectProportionGraphMatcher }))) as any;
const DirectProportionGraphSorter = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/egyenes-aranyossag-grafikonja/DirectProportionGraphSorter").then(m => ({ default: m.DirectProportionGraphSorter }))) as any;
const RulesAndRelationsTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szabalyok-megfeleltetesek/RulesAndRelationsTheory").then(m => ({ default: m.RulesAndRelationsTheory }))) as any;
const RulesAndRelationsQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szabalyok-megfeleltetesek/RulesAndRelationsQuiz").then(m => ({ default: m.RulesAndRelationsQuiz }))) as any;
const RulesAndRelationsMatcher = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szabalyok-megfeleltetesek/RulesAndRelationsMatcher").then(m => ({ default: m.RulesAndRelationsMatcher }))) as any;
const RulesAndRelationsSorter = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szabalyok-megfeleltetesek/RulesAndRelationsSorter").then(m => ({ default: m.RulesAndRelationsSorter }))) as any;
const FractionPartTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/tortresz/FractionPartTheory").then(m => ({ default: m.FractionPartTheory }))) as any;
const FractionPartQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/tortresz/FractionPartQuiz").then(m => ({ default: m.FractionPartQuiz }))) as any;
const FractionPartMatcher = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/tortresz/FractionPartMatcher").then(m => ({ default: m.FractionPartMatcher }))) as any;
const FractionPartSorter = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/tortresz/FractionPartSorter").then(m => ({ default: m.FractionPartSorter }))) as any;
const PercentageTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szazalekszamitas/PercentageTheory").then(m => ({ default: m.PercentageTheory }))) as any;
const PercentageQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szazalekszamitas/PercentageQuiz").then(m => ({ default: m.PercentageQuiz }))) as any;
const PercentageMatcher = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szazalekszamitas/PercentageMatcher").then(m => ({ default: m.PercentageMatcher }))) as any;
const PercentageSorter = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szazalekszamitas/PercentageSorter").then(m => ({ default: m.PercentageSorter }))) as any;
const PercentPracticeTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/a-szazalekszamitas-gyakorlasa/PercentPracticeTheory").then(m => ({ default: m.PercentPracticeTheory }))) as any;
const PercentPracticeQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/a-szazalekszamitas-gyakorlasa/PercentPracticeQuiz").then(m => ({ default: m.PercentPracticeQuiz }))) as any;
const PercentPracticeMatcher = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/a-szazalekszamitas-gyakorlasa/PercentPracticeMatcher").then(m => ({ default: m.PercentPracticeMatcher }))) as any;
const PercentPracticeSorter = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/a-szazalekszamitas-gyakorlasa/PercentPracticeSorter").then(m => ({ default: m.PercentPracticeSorter }))) as any;
const OpenSentencesTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/nyitott-mondatok/OpenSentencesTheory").then(m => ({ default: m.OpenSentencesTheory }))) as any;
const OpenSentencesQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/nyitott-mondatok/OpenSentencesQuiz").then(m => ({ default: m.OpenSentencesQuiz }))) as any;
const OpenSentencesMatcher = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/nyitott-mondatok/OpenSentencesMatcher").then(m => ({ default: m.OpenSentencesMatcher }))) as any;
const OpenSentencesSorter = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/nyitott-mondatok/OpenSentencesSorter").then(m => ({ default: m.OpenSentencesSorter }))) as any;
const Grade6WordProblemsTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szoveges-feladatok/WordProblemsTheory").then(m => ({ default: m.WordProblemsTheory }))) as any;
const Grade6WordProblemsQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szoveges-feladatok/WordProblemsQuiz").then(m => ({ default: m.WordProblemsQuiz }))) as any;
const Grade6WordProblemsMatcher = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szoveges-feladatok/WordProblemsMatcher").then(m => ({ default: m.WordProblemsMatcher }))) as any;
const Grade6WordProblemsSorter = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szoveges-feladatok/WordProblemsSorter").then(m => ({ default: m.WordProblemsSorter }))) as any;
const MultipleSolutionsTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/tobb-megoldas-is-lehet/MultipleSolutionsTheory").then(m => ({ default: m.MultipleSolutionsTheory }))) as any;
const MultipleSolutionsQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/tobb-megoldas-is-lehet/MultipleSolutionsQuiz").then(m => ({ default: m.MultipleSolutionsQuiz }))) as any;
const MultipleSolutionsMatcher = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/tobb-megoldas-is-lehet/MultipleSolutionsMatcher").then(m => ({ default: m.MultipleSolutionsMatcher }))) as any;
const MultipleSolutionsSorter = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/tobb-megoldas-is-lehet/MultipleSolutionsSorter").then(m => ({ default: m.MultipleSolutionsSorter }))) as any;
const RatioSummaryTheory = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/osszefoglalas/RatioSummaryTheory").then(m => ({ default: m.RatioSummaryTheory }))) as any;
const RatioSummaryQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/osszefoglalas/RatioSummaryQuiz").then(m => ({ default: m.RatioSummaryQuiz }))) as any;
const RatioSummaryMatcher = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/osszefoglalas/RatioSummaryMatcher").then(m => ({ default: m.RatioSummaryMatcher }))) as any;
const RatioSummarySorter = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/osszefoglalas/RatioSummarySorter").then(m => ({ default: m.RatioSummarySorter }))) as any;
const Grade6WordProblemsModule = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szoveges-feladatok/WordProblemsModule").then(m => ({ default: m.WordProblemsModule }))) as any;
const LengthMassTimeTheory = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/hosszusag-tomeg-ido/LengthMassTimeTheory").then(m => ({ default: m.LengthMassTimeTheory }))) as any;
const LengthMassTimeQuiz = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/hosszusag-tomeg-ido/LengthMassTimeQuiz").then(m => ({ default: m.LengthMassTimeQuiz }))) as any;
const LengthMassTimeMatcher = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/hosszusag-tomeg-ido/LengthMassTimeMatcher").then(m => ({ default: m.LengthMassTimeMatcher }))) as any;
const LengthMassTimeSorter = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/hosszusag-tomeg-ido/LengthMassTimeSorter").then(m => ({ default: m.LengthMassTimeSorter }))) as any;
const PolygonPerimeterTheory = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-sokszogek-kerulete/PolygonPerimeterTheory").then(m => ({ default: m.PolygonPerimeterTheory }))) as any;
const PolygonPerimeterQuiz = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-sokszogek-kerulete/PolygonPerimeterQuiz").then(m => ({ default: m.PolygonPerimeterQuiz }))) as any;
const PolygonPerimeterMatcher = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-sokszogek-kerulete/PolygonPerimeterMatcher").then(m => ({ default: m.PolygonPerimeterMatcher }))) as any;
const PolygonPerimeterSorter = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-sokszogek-kerulete/PolygonPerimeterSorter").then(m => ({ default: m.PolygonPerimeterSorter }))) as any;
const AreaVolumeMeasurementTheory = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-terulet-es-a-terfogat-merese/AreaVolumeMeasurementTheory").then(m => ({ default: m.AreaVolumeMeasurementTheory }))) as any;
const AreaVolumeMeasurementQuiz = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-terulet-es-a-terfogat-merese/AreaVolumeMeasurementQuiz").then(m => ({ default: m.AreaVolumeMeasurementQuiz }))) as any;
const AreaVolumeMeasurementMatcher = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-terulet-es-a-terfogat-merese/AreaVolumeMeasurementMatcher").then(m => ({ default: m.AreaVolumeMeasurementMatcher }))) as any;
const AreaVolumeMeasurementSorter = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-terulet-es-a-terfogat-merese/AreaVolumeMeasurementSorter").then(m => ({ default: m.AreaVolumeMeasurementSorter }))) as any;
const PolygonAreaTheory = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-sokszogek-terulete/PolygonAreaTheory").then(m => ({ default: m.PolygonAreaTheory }))) as any;
const PolygonAreaQuiz = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-sokszogek-terulete/PolygonAreaQuiz").then(m => ({ default: m.PolygonAreaQuiz }))) as any;
const PolygonAreaMatcher = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-sokszogek-terulete/PolygonAreaMatcher").then(m => ({ default: m.PolygonAreaMatcher }))) as any;
const PolygonAreaSorter = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/a-sokszogek-terulete/PolygonAreaSorter").then(m => ({ default: m.PolygonAreaSorter }))) as any;
const SpatialShapesTheory = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/alakzatok-a-terben/SpatialShapesTheory").then(m => ({ default: m.SpatialShapesTheory }))) as any;
const SpatialShapesQuiz = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/alakzatok-a-terben/SpatialShapesQuiz").then(m => ({ default: m.SpatialShapesQuiz }))) as any;
const SpatialShapesMatcher = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/alakzatok-a-terben/SpatialShapesMatcher").then(m => ({ default: m.SpatialShapesMatcher }))) as any;
const SpatialShapesSorter = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/alakzatok-a-terben/SpatialShapesSorter").then(m => ({ default: m.SpatialShapesSorter }))) as any;
const SurfaceAreaTheory = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/testek-felszine/SurfaceAreaTheory").then(m => ({ default: m.SurfaceAreaTheory }))) as any;
const Grade6SurfaceAreaQuiz = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/testek-felszine/SurfaceAreaQuiz").then(m => ({ default: m.SurfaceAreaQuiz }))) as any;
const SurfaceAreaMatcher = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/testek-felszine/SurfaceAreaMatcher").then(m => ({ default: m.SurfaceAreaMatcher }))) as any;
const SurfaceAreaSorter = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/testek-felszine/SurfaceAreaSorter").then(m => ({ default: m.SurfaceAreaSorter }))) as any;
const PracticalSurfaceAreaTheory = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/felszinszamitassal-kapcsolatos-gyakorlati-feladatok/PracticalSurfaceAreaTheory").then(m => ({ default: m.PracticalSurfaceAreaTheory }))) as any;
const PracticalSurfaceAreaQuiz = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/felszinszamitassal-kapcsolatos-gyakorlati-feladatok/PracticalSurfaceAreaQuiz").then(m => ({ default: m.PracticalSurfaceAreaQuiz }))) as any;
const PracticalSurfaceAreaMatcher = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/felszinszamitassal-kapcsolatos-gyakorlati-feladatok/PracticalSurfaceAreaMatcher").then(m => ({ default: m.PracticalSurfaceAreaMatcher }))) as any;
const PracticalSurfaceAreaSorter = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/felszinszamitassal-kapcsolatos-gyakorlati-feladatok/PracticalSurfaceAreaSorter").then(m => ({ default: m.PracticalSurfaceAreaSorter }))) as any;
const VolumeTheory = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/testek-terfogata/VolumeTheory").then(m => ({ default: m.VolumeTheory }))) as any;
const Grade6VolumeQuiz = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/testek-terfogata/VolumeQuiz").then(m => ({ default: m.VolumeQuiz }))) as any;
const VolumeMatcher = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/testek-terfogata/VolumeMatcher").then(m => ({ default: m.VolumeMatcher }))) as any;
const VolumeSorter = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/testek-terfogata/VolumeSorter").then(m => ({ default: m.VolumeSorter }))) as any;
const Chapter5SummaryTheory = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/osszefoglalas/Chapter5SummaryTheory").then(m => ({ default: m.Chapter5SummaryTheory }))) as any;
const Chapter5SummaryQuiz = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/osszefoglalas/Chapter5SummaryQuiz").then(m => ({ default: m.Chapter5SummaryQuiz }))) as any;
const Chapter5SummaryMatcher = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/osszefoglalas/Chapter5SummaryMatcher").then(m => ({ default: m.Chapter5SummaryMatcher }))) as any;
const Chapter5SummarySorter = lazy(() => import("@/components/math/grade-6/kerulet-terulet-felszin-terfogat/osszefoglalas/Chapter5SummarySorter").then(m => ({ default: m.Chapter5SummarySorter }))) as any;
const StatisticsGamesTheory = lazy(() => import("@/components/math/grade-6/statisztika/jatekok/StatisticsGamesTheory").then(m => ({ default: m.StatisticsGamesTheory }))) as any;
const StatisticsGamesQuiz = lazy(() => import("@/components/math/grade-6/statisztika/jatekok/StatisticsGamesQuiz").then(m => ({ default: m.StatisticsGamesQuiz }))) as any;
const StatisticsGamesMatcher = lazy(() => import("@/components/math/grade-6/statisztika/jatekok/StatisticsGamesMatcher").then(m => ({ default: m.StatisticsGamesMatcher }))) as any;
const StatisticsGamesSorter = lazy(() => import("@/components/math/grade-6/statisztika/jatekok/StatisticsGamesSorter").then(m => ({ default: m.StatisticsGamesSorter }))) as any;
const ChartsDiagramsTheory = lazy(() => import("@/components/math/grade-6/statisztika/grafikonok-diagramok-osszefuggesek/ChartsDiagramsTheory").then(m => ({ default: m.ChartsDiagramsTheory }))) as any;
const ChartsDiagramsQuiz = lazy(() => import("@/components/math/grade-6/statisztika/grafikonok-diagramok-osszefuggesek/ChartsDiagramsQuiz").then(m => ({ default: m.ChartsDiagramsQuiz }))) as any;
const ChartsDiagramsMatcher = lazy(() => import("@/components/math/grade-6/statisztika/grafikonok-diagramok-osszefuggesek/ChartsDiagramsMatcher").then(m => ({ default: m.ChartsDiagramsMatcher }))) as any;
const ChartsDiagramsSorter = lazy(() => import("@/components/math/grade-6/statisztika/grafikonok-diagramok-osszefuggesek/ChartsDiagramsSorter").then(m => ({ default: m.ChartsDiagramsSorter }))) as any;
const PieChartTheory = lazy(() => import("@/components/math/grade-6/statisztika/kordiagram/PieChartTheory").then(m => ({ default: m.PieChartTheory }))) as any;
const PieChartQuiz = lazy(() => import("@/components/math/grade-6/statisztika/kordiagram/PieChartQuiz").then(m => ({ default: m.PieChartQuiz }))) as any;
const PieChartMatcher = lazy(() => import("@/components/math/grade-6/statisztika/kordiagram/PieChartMatcher").then(m => ({ default: m.PieChartMatcher }))) as any;
const PieChartSorter = lazy(() => import("@/components/math/grade-6/statisztika/kordiagram/PieChartSorter").then(m => ({ default: m.PieChartSorter }))) as any;
const DataMeanTheory = lazy(() => import("@/components/math/grade-6/statisztika/adatok-abrazolasa-atlag/DataMeanTheory").then(m => ({ default: m.DataMeanTheory }))) as any;
const DataMeanQuiz = lazy(() => import("@/components/math/grade-6/statisztika/adatok-abrazolasa-atlag/DataMeanQuiz").then(m => ({ default: m.DataMeanQuiz }))) as any;
const DataMeanMatcher = lazy(() => import("@/components/math/grade-6/statisztika/adatok-abrazolasa-atlag/DataMeanMatcher").then(m => ({ default: m.DataMeanMatcher }))) as any;
const DataMeanSorter = lazy(() => import("@/components/math/grade-6/statisztika/adatok-abrazolasa-atlag/DataMeanSorter").then(m => ({ default: m.DataMeanSorter }))) as any;
const StatisticsSummaryTheory = lazy(() => import("@/components/math/grade-6/statisztika/osszefoglalas/StatisticsSummaryTheory").then(m => ({ default: m.StatisticsSummaryTheory }))) as any;
const StatisticsSummaryQuiz = lazy(() => import("@/components/math/grade-6/statisztika/osszefoglalas/StatisticsSummaryQuiz").then(m => ({ default: m.StatisticsSummaryQuiz }))) as any;
const StatisticsSummaryMatcher = lazy(() => import("@/components/math/grade-6/statisztika/osszefoglalas/StatisticsSummaryMatcher").then(m => ({ default: m.StatisticsSummaryMatcher }))) as any;
const StatisticsSummarySorter = lazy(() => import("@/components/math/grade-6/statisztika/osszefoglalas/StatisticsSummarySorter").then(m => ({ default: m.StatisticsSummarySorter }))) as any;
const MatrixSortingGame = lazy(() => import("@/components/math/grade-1/grouping/MatrixSortingGame").then(m => ({ default: m.MatrixSortingGame }))) as any;
const MemoryGameComponent = lazy(() => import("@/components/math/games/memory/MemoryGame")) as any;
const HanoiGame = lazy(() => import("@/components/math/games/hanoi/HanoiGame")) as any;
const TorpedoGame = lazy(() => import("@/components/math/games/torpedo/TorpedoGame")) as any;
const TowerBuilderGame = lazy(() => import("@/components/math/games/toronyepites/TowerBuilderGame").then(m => ({ default: m.TowerBuilderGame }))) as any;
const Grade8CongruenceTransformTheory = lazy(() => import("@/components/math/grade-8/geometria/egybevagosagi-transzformaciok-ismetles/CongruenceTransformTheory").then(m => ({ default: m.CongruenceTransformTheory }))) as any;
const Grade8CongruenceTransformQuiz = lazy(() => import("@/components/math/grade-8/geometria/egybevagosagi-transzformaciok-ismetles/CongruenceTransformQuiz").then(m => ({ default: m.CongruenceTransformQuiz }))) as any;
const Grade8CongruenceTransformMatcher = lazy(() => import("@/components/math/grade-8/geometria/egybevagosagi-transzformaciok-ismetles/CongruenceTransformMatcher").then(m => ({ default: m.CongruenceTransformMatcher }))) as any;
const Grade8CongruenceTransformSorter = lazy(() => import("@/components/math/grade-8/geometria/egybevagosagi-transzformaciok-ismetles/CongruenceTransformSorter").then(m => ({ default: m.CongruenceTransformSorter }))) as any;
const Grade8TransformationsTheory = lazy(() => import("@/components/math/grade-8/geometria/transzformaciok/TransformationsTheory").then(m => ({ default: m.TransformationsTheory }))) as any;
const Grade8TransformationsQuiz = lazy(() => import("@/components/math/grade-8/geometria/transzformaciok/TransformationsQuiz").then(m => ({ default: m.TransformationsQuiz }))) as any;
const Grade8TransformationsMatcher = lazy(() => import("@/components/math/grade-8/geometria/transzformaciok/TransformationsMatcher").then(m => ({ default: m.TransformationsMatcher }))) as any;
const Grade8TransformationsSorter = lazy(() => import("@/components/math/grade-8/geometria/transzformaciok/TransformationsSorter").then(m => ({ default: m.TransformationsSorter }))) as any;
const Grade8GeometrySoftwareTheory = lazy(() => import("@/components/math/grade-8/geometria/hasznaljunk-szerkesztoprogramot/GeometrySoftwareTheory").then(m => ({ default: m.GeometrySoftwareTheory }))) as any;
const Grade8GeometrySoftwareQuiz = lazy(() => import("@/components/math/grade-8/geometria/hasznaljunk-szerkesztoprogramot/GeometrySoftwareQuiz").then(m => ({ default: m.GeometrySoftwareQuiz }))) as any;
const Grade8GeometrySoftwareMatcher = lazy(() => import("@/components/math/grade-8/geometria/hasznaljunk-szerkesztoprogramot/GeometrySoftwareMatcher").then(m => ({ default: m.GeometrySoftwareMatcher }))) as any;
const Grade8GeometrySoftwareSorter = lazy(() => import("@/components/math/grade-8/geometria/hasznaljunk-szerkesztoprogramot/GeometrySoftwareSorter").then(m => ({ default: m.GeometrySoftwareSorter }))) as any;
const Grade8SimilarityTheory = lazy(() => import("@/components/math/grade-8/geometria/hasonlosag/SimilarityTheory").then(m => ({ default: m.SimilarityTheory }))) as any;
const Grade8SimilarityQuiz = lazy(() => import("@/components/math/grade-8/geometria/hasonlosag/SimilarityQuiz").then(m => ({ default: m.SimilarityQuiz }))) as any;
const Grade8SimilarityMatcher = lazy(() => import("@/components/math/grade-8/geometria/hasonlosag/SimilarityMatcher").then(m => ({ default: m.SimilarityMatcher }))) as any;
const Grade8SimilaritySorter = lazy(() => import("@/components/math/grade-8/geometria/hasonlosag/SimilaritySorter").then(m => ({ default: m.SimilaritySorter }))) as any;
const Grade8CentralSimilarityTheory = lazy(() => import("@/components/math/grade-8/geometria/a-kozeppontos-hasonlosag/CentralSimilarityTheory").then(m => ({ default: m.CentralSimilarityTheory }))) as any;
const Grade8CentralSimilarityQuiz = lazy(() => import("@/components/math/grade-8/geometria/a-kozeppontos-hasonlosag/CentralSimilarityQuiz").then(m => ({ default: m.CentralSimilarityQuiz }))) as any;
const Grade8CentralSimilarityMatcher = lazy(() => import("@/components/math/grade-8/geometria/a-kozeppontos-hasonlosag/CentralSimilarityMatcher").then(m => ({ default: m.CentralSimilarityMatcher }))) as any;
const Grade8CentralSimilaritySorter = lazy(() => import("@/components/math/grade-8/geometria/a-kozeppontos-hasonlosag/CentralSimilaritySorter").then(m => ({ default: m.CentralSimilaritySorter }))) as any;
const Grade8GeometricConstructionsTheory = lazy(() => import("@/components/math/grade-8/geometria/szerkesztesek/GeometricConstructionsTheory").then(m => ({ default: m.GeometricConstructionsTheory }))) as any;
const Grade8GeometricConstructionsQuiz = lazy(() => import("@/components/math/grade-8/geometria/szerkesztesek/GeometricConstructionsQuiz").then(m => ({ default: m.GeometricConstructionsQuiz }))) as any;
const Grade8GeometricConstructionsMatcher = lazy(() => import("@/components/math/grade-8/geometria/szerkesztesek/GeometricConstructionsMatcher").then(m => ({ default: m.GeometricConstructionsMatcher }))) as any;
const Grade8GeometricConstructionsSorter = lazy(() => import("@/components/math/grade-8/geometria/szerkesztesek/GeometricConstructionsSorter").then(m => ({ default: m.GeometricConstructionsSorter }))) as any;
const Grade8Chapter2GeometrySummaryTheory = lazy(() => import("@/components/math/grade-8/geometria/osszefoglalas/Chapter2GeometrySummaryTheory").then(m => ({ default: m.Chapter2GeometrySummaryTheory }))) as any;
const Grade8Chapter2GeometrySummaryQuiz = lazy(() => import("@/components/math/grade-8/geometria/osszefoglalas/Chapter2GeometrySummaryQuiz").then(m => ({ default: m.Chapter2GeometrySummaryQuiz }))) as any;
const Grade8Chapter2GeometrySummaryMatcher = lazy(() => import("@/components/math/grade-8/geometria/osszefoglalas/Chapter2GeometrySummaryMatcher").then(m => ({ default: m.Chapter2GeometrySummaryMatcher }))) as any;
const Grade8Chapter2GeometrySummarySorter = lazy(() => import("@/components/math/grade-8/geometria/osszefoglalas/Chapter2GeometrySummarySorter").then(m => ({ default: m.Chapter2GeometrySummarySorter }))) as any;
const Grade8EquationBalanceQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/egyenletek/EquationBalanceQuiz").then(m => ({ default: m.EquationBalanceQuiz }))) as any;
const Grade8EquationsTheory = lazy(() => import("@/components/math/grade-8/egyenletek/egyenletek/EquationsTheory").then(m => ({ default: m.EquationsTheory }))) as any;
const Grade8EquationsQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/egyenletek/EquationsQuiz").then(m => ({ default: m.EquationsQuiz }))) as any;
const Grade8EquationsMatcher = lazy(() => import("@/components/math/grade-8/egyenletek/egyenletek/EquationsMatcher").then(m => ({ default: m.EquationsMatcher }))) as any;
const Grade8EquationsSorter = lazy(() => import("@/components/math/grade-8/egyenletek/egyenletek/EquationsSorter").then(m => ({ default: m.EquationsSorter }))) as any;
const Grade8NumbersAgesTheory = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-szamokrol-eletkorokrol/NumbersAgesTheory").then(m => ({ default: m.NumbersAgesTheory }))) as any;
const Grade8NumbersAgesQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-szamokrol-eletkorokrol/NumbersAgesQuiz").then(m => ({ default: m.NumbersAgesQuiz }))) as any;
const Grade8NumbersAgesMatcher = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-szamokrol-eletkorokrol/NumbersAgesMatcher").then(m => ({ default: m.NumbersAgesMatcher }))) as any;
const Grade8NumbersAgesSorter = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-szamokrol-eletkorokrol/NumbersAgesSorter").then(m => ({ default: m.NumbersAgesSorter }))) as any;
const Grade8MixingWordProblemsTheory = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-osszekeveresrol/MixingWordProblemsTheory").then(m => ({ default: m.MixingWordProblemsTheory }))) as any;
const Grade8MixingWordProblemsQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-osszekeveresrol/MixingWordProblemsQuiz").then(m => ({ default: m.MixingWordProblemsQuiz }))) as any;
const Grade8MixingWordProblemsMatcher = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-osszekeveresrol/MixingWordProblemsMatcher").then(m => ({ default: m.MixingWordProblemsMatcher }))) as any;
const Grade8MixingWordProblemsSorter = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-osszekeveresrol/MixingWordProblemsSorter").then(m => ({ default: m.MixingWordProblemsSorter }))) as any;
const Grade8MotionWorkProblemsTheory = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-mozgasrol-munkarol/MotionWorkProblemsTheory").then(m => ({ default: m.MotionWorkProblemsTheory }))) as any;
const Grade8MotionWorkProblemsQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-mozgasrol-munkarol/MotionWorkProblemsQuiz").then(m => ({ default: m.MotionWorkProblemsQuiz }))) as any;
const Grade8MotionWorkProblemsMatcher = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-mozgasrol-munkarol/MotionWorkProblemsMatcher").then(m => ({ default: m.MotionWorkProblemsMatcher }))) as any;
const Grade8MotionWorkProblemsSorter = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-mozgasrol-munkarol/MotionWorkProblemsSorter").then(m => ({ default: m.MotionWorkProblemsSorter }))) as any;
const Grade8GeometricEquationsTheory = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-geometriai-feladatok/GeometricEquationsTheory").then(m => ({ default: m.GeometricEquationsTheory }))) as any;
const Grade8GeometricEquationsQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-geometriai-feladatok/GeometricEquationsQuiz").then(m => ({ default: m.GeometricEquationsQuiz }))) as any;
const Grade8GeometricEquationsMatcher = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-geometriai-feladatok/GeometricEquationsMatcher").then(m => ({ default: m.GeometricEquationsMatcher }))) as any;
const Grade8GeometricEquationsSorter = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-geometriai-feladatok/GeometricEquationsSorter").then(m => ({ default: m.GeometricEquationsSorter }))) as any;
const Grade8MixedWordProblemsTheory = lazy(() => import("@/components/math/grade-8/egyenletek/vegyes-feladatok/MixedWordProblemsTheory").then(m => ({ default: m.MixedWordProblemsTheory }))) as any;
const Grade8MixedWordProblemsQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/vegyes-feladatok/MixedWordProblemsQuiz").then(m => ({ default: m.MixedWordProblemsQuiz }))) as any;
const Grade8MixedWordProblemsMatcher = lazy(() => import("@/components/math/grade-8/egyenletek/vegyes-feladatok/MixedWordProblemsMatcher").then(m => ({ default: m.MixedWordProblemsMatcher }))) as any;
const Grade8MixedWordProblemsSorter = lazy(() => import("@/components/math/grade-8/egyenletek/vegyes-feladatok/MixedWordProblemsSorter").then(m => ({ default: m.MixedWordProblemsSorter }))) as any;
const Grade8FinancialProblemsTheory = lazy(() => import("@/components/math/grade-8/egyenletek/penzugyi-feladatok/FinancialProblemsTheory").then(m => ({ default: m.FinancialProblemsTheory }))) as any;
const Grade8FinancialProblemsQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/penzugyi-feladatok/FinancialProblemsQuiz").then(m => ({ default: m.FinancialProblemsQuiz }))) as any;
const Grade8FinancialProblemsMatcher = lazy(() => import("@/components/math/grade-8/egyenletek/penzugyi-feladatok/FinancialProblemsMatcher").then(m => ({ default: m.FinancialProblemsMatcher }))) as any;
const Grade8FinancialProblemsSorter = lazy(() => import("@/components/math/grade-8/egyenletek/penzugyi-feladatok/FinancialProblemsSorter").then(m => ({ default: m.FinancialProblemsSorter }))) as any;
const Grade8Chapter3EquationsSummaryTheory = lazy(() => import("@/components/math/grade-8/egyenletek/osszefoglalas/Chapter3EquationsSummaryTheory").then(m => ({ default: m.Chapter3EquationsSummaryTheory }))) as any;
const Grade8Chapter3EquationsSummaryQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/osszefoglalas/Chapter3EquationsSummaryQuiz").then(m => ({ default: m.Chapter3EquationsSummaryQuiz }))) as any;
const Grade8Chapter3EquationsSummaryMatcher = lazy(() => import("@/components/math/grade-8/egyenletek/osszefoglalas/Chapter3EquationsSummaryMatcher").then(m => ({ default: m.Chapter3EquationsSummaryMatcher }))) as any;
const Grade8Chapter3EquationsSummarySorter = lazy(() => import("@/components/math/grade-8/egyenletek/osszefoglalas/Chapter3EquationsSummarySorter").then(m => ({ default: m.Chapter3EquationsSummarySorter }))) as any;
const Grade8ConstructionsMeasurementsTheory = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/szerkesztesek-meresek/ConstructionsMeasurementsTheory").then(m => ({ default: m.ConstructionsMeasurementsTheory }))) as any;
const Grade8ConstructionsMeasurementsQuiz = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/szerkesztesek-meresek/ConstructionsMeasurementsQuiz").then(m => ({ default: m.ConstructionsMeasurementsQuiz }))) as any;
const Grade8PythagorasTheoremTheory = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/a-pitagorasz-tetel/PythagorasTheoremTheory").then(m => ({ default: m.PythagorasTheoremTheory }))) as any;
const Grade8PythagorasTheoremQuiz = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/a-pitagorasz-tetel/PythagorasTheoremQuiz").then(m => ({ default: m.PythagorasTheoremQuiz }))) as any;
const Grade8ConversePythagorasTheory = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/a-pitagorasz-tetel-megforditasa/ConversePythagorasTheory").then(m => ({ default: m.ConversePythagorasTheory }))) as any;
const Grade8ConversePythagorasQuiz = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/a-pitagorasz-tetel-megforditasa/ConversePythagorasQuiz").then(m => ({ default: m.ConversePythagorasQuiz }))) as any;
const Grade8PythagorasApplicationsTheory = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/a-pitagorasz-tetel-alkalmazasa/PythagorasApplicationsTheory").then(m => ({ default: m.PythagorasApplicationsTheory }))) as any;
const Grade8PythagorasApplicationsQuiz = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/a-pitagorasz-tetel-alkalmazasa/PythagorasApplicationsQuiz").then(m => ({ default: m.PythagorasApplicationsQuiz }))) as any;
const Grade8CalculatorProjectTheory = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/alkalmazas-szamologep-projektmunka/CalculatorProjectTheory").then(m => ({ default: m.CalculatorProjectTheory }))) as any;
const Grade8CalculatorProjectQuiz = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/alkalmazas-szamologep-projektmunka/CalculatorProjectQuiz").then(m => ({ default: m.CalculatorProjectQuiz }))) as any;
const Grade8SpecialRightTrianglesTheory = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/nevezetes-derekszogu-haromszogek/SpecialRightTrianglesTheory").then(m => ({ default: m.SpecialRightTrianglesTheory }))) as any;
const Grade8SpecialRightTrianglesQuiz = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/nevezetes-derekszogu-haromszogek/SpecialRightTrianglesQuiz").then(m => ({ default: m.SpecialRightTrianglesQuiz }))) as any;
const Grade8Chapter5PythagorasSummaryTheory = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/osszefoglalas/Chapter5PythagorasSummaryTheory").then(m => ({ default: m.Chapter5PythagorasSummaryTheory }))) as any;
const Grade8Chapter5PythagorasSummaryQuiz = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/osszefoglalas/Chapter5PythagorasSummaryQuiz").then(m => ({ default: m.Chapter5PythagorasSummaryQuiz }))) as any;
const Grade8DirectProportionTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/egyenes-aranyossag/DirectProportionTheory").then(m => ({ default: m.DirectProportionTheory }))) as any;
const Grade8DirectProportionQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/egyenes-aranyossag/DirectProportionQuiz").then(m => ({ default: m.DirectProportionQuiz }))) as any;
const Grade8DirectProportionMatcher = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/egyenes-aranyossag/DirectProportionMatcher").then(m => ({ default: m.DirectProportionMatcher }))) as any;
const Grade8DirectProportionSorter = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/egyenes-aranyossag/DirectProportionSorter").then(m => ({ default: m.DirectProportionSorter }))) as any;
const Grade8DirectProportionG8Quiz = Grade8DirectProportionQuiz;
const Grade8FunctionsGraphsTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/hozzarendelesek-es-grafikonjaik/FunctionsGraphsTheory").then(m => ({ default: m.FunctionsGraphsTheory }))) as any;
const Grade8FunctionsGraphsQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/hozzarendelesek-es-grafikonjaik/FunctionsGraphsQuiz").then(m => ({ default: m.FunctionsGraphsQuiz }))) as any;
const Grade8FunctionsGraphsMatcher = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/hozzarendelesek-es-grafikonjaik/FunctionsGraphsMatcher").then(m => ({ default: m.FunctionsGraphsMatcher }))) as any;
const Grade8FunctionsGraphsSorter = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/hozzarendelesek-es-grafikonjaik/FunctionsGraphsSorter").then(m => ({ default: m.FunctionsGraphsSorter }))) as any;
const Grade8InverseProportionTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/forditott-aranyossag/InverseProportionTheory").then(m => ({ default: m.InverseProportionTheory }))) as any;
const Grade8InverseProportionQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/forditott-aranyossag/InverseProportionQuiz").then(m => ({ default: m.InverseProportionQuiz }))) as any;
const Grade8InverseProportionMatcher = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/forditott-aranyossag/InverseProportionMatcher").then(m => ({ default: m.InverseProportionMatcher }))) as any;
const Grade8InverseProportionSorter = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/forditott-aranyossag/InverseProportionSorter").then(m => ({ default: m.InverseProportionSorter }))) as any;
const Grade8ReadingGraphsTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/olvassunk-a-grafikonrol/ReadingGraphsTheory").then(m => ({ default: m.ReadingGraphsTheory }))) as any;
const Grade8ReadingGraphsQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/olvassunk-a-grafikonrol/ReadingGraphsQuiz").then(m => ({ default: m.ReadingGraphsQuiz }))) as any;
const Grade8ReadingGraphsMatcher = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/olvassunk-a-grafikonrol/ReadingGraphsMatcher").then(m => ({ default: m.ReadingGraphsMatcher }))) as any;
const Grade8ReadingGraphsSorter = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/olvassunk-a-grafikonrol/ReadingGraphsSorter").then(m => ({ default: m.ReadingGraphsSorter }))) as any;
const Grade8PlottingGraphsTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/keszitsunk-grafikont/PlottingGraphsTheory").then(m => ({ default: m.PlottingGraphsTheory }))) as any;
const Grade8PlottingGraphsQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/keszitsunk-grafikont/PlottingGraphsQuiz").then(m => ({ default: m.PlottingGraphsQuiz }))) as any;
const Grade8PlottingGraphsMatcher = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/keszitsunk-grafikont/PlottingGraphsMatcher").then(m => ({ default: m.PlottingGraphsMatcher }))) as any;
const Grade8PlottingGraphsSorter = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/keszitsunk-grafikont/PlottingGraphsSorter").then(m => ({ default: m.PlottingGraphsSorter }))) as any;
const Grade8FrequencyStatisticsTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/gyakorisag-relativ-gyakorisag-atlag/FrequencyStatisticsTheory").then(m => ({ default: m.FrequencyStatisticsTheory }))) as any;
const Grade8FrequencyStatisticsQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/gyakorisag-relativ-gyakorisag-atlag/FrequencyStatisticsQuiz").then(m => ({ default: m.FrequencyStatisticsQuiz }))) as any;
const Grade8FrequencyStatisticsMatcher = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/gyakorisag-relativ-gyakorisag-atlag/FrequencyStatisticsMatcher").then(m => ({ default: m.FrequencyStatisticsMatcher }))) as any;
const Grade8FrequencyStatisticsSorter = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/gyakorisag-relativ-gyakorisag-atlag/FrequencyStatisticsSorter").then(m => ({ default: m.FrequencyStatisticsSorter }))) as any;
const Grade8ProbabilityGameTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/jatek/ProbabilityGameTheory").then(m => ({ default: m.ProbabilityGameTheory }))) as any;
const Grade8ProbabilityGameQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/jatek/ProbabilityGameQuiz").then(m => ({ default: m.ProbabilityGameQuiz }))) as any;
const Grade8ProbabilityGameMatcher = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/jatek/ProbabilityGameMatcher").then(m => ({ default: m.ProbabilityGameMatcher }))) as any;
const Grade8ProbabilityGameSorter = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/jatek/ProbabilityGameSorter").then(m => ({ default: m.ProbabilityGameSorter }))) as any;
const Grade8ProbabilityBasicsTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/valoszinuseg/ProbabilityBasicsTheory").then(m => ({ default: m.ProbabilityBasicsTheory }))) as any;
const Grade8ProbabilityBasicsQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/valoszinuseg/ProbabilityBasicsQuiz").then(m => ({ default: m.ProbabilityBasicsQuiz }))) as any;
const Grade8ProbabilityBasicsMatcher = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/valoszinuseg/ProbabilityBasicsMatcher").then(m => ({ default: m.ProbabilityBasicsMatcher }))) as any;
const Grade8ProbabilityBasicsSorter = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/valoszinuseg/ProbabilityBasicsSorter").then(m => ({ default: m.ProbabilityBasicsSorter }))) as any;
const Grade8ProbabilityProblemsTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/valoszinusegszamitasi-feladatok/ProbabilityProblemsTheory").then(m => ({ default: m.ProbabilityProblemsTheory }))) as any;
const Grade8ProbabilityProblemsQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/valoszinusegszamitasi-feladatok/ProbabilityProblemsQuiz").then(m => ({ default: m.ProbabilityProblemsQuiz }))) as any;
const Grade8ProbabilityProblemsMatcher = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/valoszinusegszamitasi-feladatok/ProbabilityProblemsMatcher").then(m => ({ default: m.ProbabilityProblemsMatcher }))) as any;
const Grade8ProbabilityProblemsSorter = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/valoszinusegszamitasi-feladatok/ProbabilityProblemsSorter").then(m => ({ default: m.ProbabilityProblemsSorter }))) as any;
const Grade8FindingPatternsTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/keressunk-osszefuggeseket/FindingPatternsTheory").then(m => ({ default: m.FindingPatternsTheory }))) as any;
const Grade8FindingPatternsQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/keressunk-osszefuggeseket/FindingPatternsQuiz").then(m => ({ default: m.FindingPatternsQuiz }))) as any;
const Grade8FindingPatternsMatcher = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/keressunk-osszefuggeseket/FindingPatternsMatcher").then(m => ({ default: m.FindingPatternsMatcher }))) as any;
const Grade8FindingPatternsSorter = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/keressunk-osszefuggeseket/FindingPatternsSorter").then(m => ({ default: m.FindingPatternsSorter }))) as any;
const Grade8SequencesTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/sorozatok/SequencesTheory").then(m => ({ default: m.SequencesTheory }))) as any;
const Grade8SequencesQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/sorozatok/SequencesQuiz").then(m => ({ default: m.SequencesQuiz }))) as any;
const Grade8SequencesMatcher = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/sorozatok/SequencesMatcher").then(m => ({ default: m.SequencesMatcher }))) as any;
const Grade8SequencesSorter = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/sorozatok/SequencesSorter").then(m => ({ default: m.SequencesSorter }))) as any;
const Grade8Chapter6SummaryTheory = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/osszefoglalas/Chapter6SummaryTheory").then(m => ({ default: m.Chapter6SummaryTheory }))) as any;
const Grade8Chapter6SummaryQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/osszefoglalas/Chapter6SummaryQuiz").then(m => ({ default: m.Chapter6SummaryQuiz }))) as any;
const Grade8Chapter6SummaryMatcher = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/osszefoglalas/Chapter6SummaryMatcher").then(m => ({ default: m.Chapter6SummaryMatcher }))) as any;
const Grade8Chapter6SummarySorter = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/osszefoglalas/Chapter6SummarySorter").then(m => ({ default: m.Chapter6SummarySorter }))) as any;
const Grade8SolidsReviewTheory = lazy(() => import("@/components/math/grade-8/testek/mit-tanultunk-eddig-ismetles/SolidsReviewTheory").then(m => ({ default: m.SolidsReviewTheory }))) as any;
const Grade8SolidsReviewQuiz = lazy(() => import("@/components/math/grade-8/testek/mit-tanultunk-eddig-ismetles/SolidsReviewQuiz").then(m => ({ default: m.SolidsReviewQuiz }))) as any;
const Grade8SolidsReviewMatcher = lazy(() => import("@/components/math/grade-8/testek/mit-tanultunk-eddig-ismetles/SolidsReviewMatcher").then(m => ({ default: m.SolidsReviewMatcher }))) as any;
const Grade8SolidsReviewSorter = lazy(() => import("@/components/math/grade-8/testek/mit-tanultunk-eddig-ismetles/SolidsReviewSorter").then(m => ({ default: m.SolidsReviewSorter }))) as any;
const Grade8PyramidsTheory = lazy(() => import("@/components/math/grade-8/testek/gulak/PyramidsTheory").then(m => ({ default: m.PyramidsTheory }))) as any;
const Grade8PyramidsQuiz = lazy(() => import("@/components/math/grade-8/testek/gulak/PyramidsQuiz").then(m => ({ default: m.PyramidsQuiz }))) as any;
const Grade8PyramidsMatcher = lazy(() => import("@/components/math/grade-8/testek/gulak/PyramidsMatcher").then(m => ({ default: m.PyramidsMatcher }))) as any;
const Grade8PyramidsSorter = lazy(() => import("@/components/math/grade-8/testek/gulak/PyramidsSorter").then(m => ({ default: m.PyramidsSorter }))) as any;
const Grade8PyramidSurfaceVolumeTheory = lazy(() => import("@/components/math/grade-8/testek/a-gula-felszine-es-terfogata/PyramidSurfaceVolumeTheory").then(m => ({ default: m.PyramidSurfaceVolumeTheory }))) as any;
const Grade8PyramidSurfaceVolumeQuiz = lazy(() => import("@/components/math/grade-8/testek/a-gula-felszine-es-terfogata/PyramidSurfaceVolumeQuiz").then(m => ({ default: m.PyramidSurfaceVolumeQuiz }))) as any;
const Grade8PyramidSurfaceVolumeMatcher = lazy(() => import("@/components/math/grade-8/testek/a-gula-felszine-es-terfogata/PyramidSurfaceVolumeMatcher").then(m => ({ default: m.PyramidSurfaceVolumeMatcher }))) as any;
const Grade8PyramidSurfaceVolumeSorter = lazy(() => import("@/components/math/grade-8/testek/a-gula-felszine-es-terfogata/PyramidSurfaceVolumeSorter").then(m => ({ default: m.PyramidSurfaceVolumeSorter }))) as any;
const Grade8SphereTheory = lazy(() => import("@/components/math/grade-8/testek/a-gomb/SphereTheory").then(m => ({ default: m.SphereTheory }))) as any;
const Grade8SphereQuiz = lazy(() => import("@/components/math/grade-8/testek/a-gomb/SphereQuiz").then(m => ({ default: m.SphereQuiz }))) as any;
const Grade8SphereMatcher = lazy(() => import("@/components/math/grade-8/testek/a-gomb/SphereMatcher").then(m => ({ default: m.SphereMatcher }))) as any;
const Grade8SphereSorter = lazy(() => import("@/components/math/grade-8/testek/a-gomb/SphereSorter").then(m => ({ default: m.SphereSorter }))) as any;
const Grade8EarthGeometryQuiz = lazy(() => import("@/components/math/grade-8/testek/a-fold/EarthQuiz").then(m => ({ default: m.EarthQuiz }))) as any;
const Grade8EarthTheory = lazy(() => import("@/components/math/grade-8/testek/a-fold/EarthTheory").then(m => ({ default: m.EarthTheory }))) as any;
const Grade8EarthQuiz = lazy(() => import("@/components/math/grade-8/testek/a-fold/EarthQuiz").then(m => ({ default: m.EarthQuiz }))) as any;
const Grade8EarthMatcher = lazy(() => import("@/components/math/grade-8/testek/a-fold/EarthMatcher").then(m => ({ default: m.EarthMatcher }))) as any;
const Grade8EarthSorter = lazy(() => import("@/components/math/grade-8/testek/a-fold/EarthSorter").then(m => ({ default: m.EarthSorter }))) as any;
const Grade8Chapter7SolidsSummaryQuiz = lazy(() => import("@/components/math/grade-8/testek/osszefoglalas/Chapter7SolidsSummaryQuiz").then(m => ({ default: m.Chapter7SolidsSummaryQuiz }))) as any;
const Grade8SolidsSummaryTheory = lazy(() => import("@/components/math/grade-8/testek/osszefoglalas/SolidsSummaryTheory").then(m => ({ default: m.SolidsSummaryTheory }))) as any;
const Grade8SolidsSummaryQuiz = lazy(() => import("@/components/math/grade-8/testek/osszefoglalas/SolidsSummaryQuiz").then(m => ({ default: m.SolidsSummaryQuiz }))) as any;
const Grade8SolidsSummaryMatcher = lazy(() => import("@/components/math/grade-8/testek/osszefoglalas/SolidsSummaryMatcher").then(m => ({ default: m.SolidsSummaryMatcher }))) as any;
const Grade8SolidsSummarySorter = lazy(() => import("@/components/math/grade-8/testek/osszefoglalas/SolidsSummarySorter").then(m => ({ default: m.SolidsSummarySorter }))) as any;
const Grade7CountItTheory = lazy(() => import("@/components/math/grade-7/gondolkodjunk/szamold-ossze/CountingTheory").then(m => ({ default: m.CountingTheory }))) as any;
const Grade7CountItQuiz = lazy(() => import("@/components/math/grade-7/gondolkodjunk/szamold-ossze/CountingQuiz").then(m => ({ default: m.CountingQuiz }))) as any;
const Grade7CountItMatcher = lazy(() => import("@/components/math/grade-7/gondolkodjunk/szamold-ossze/CountingMatcher").then(m => ({ default: m.CountingMatcher }))) as any;
const Grade7CountItSorter = lazy(() => import("@/components/math/grade-7/gondolkodjunk/szamold-ossze/CountingSorter").then(m => ({ default: m.CountingSorter }))) as any;
const Grade7OrderItTheory = lazy(() => import("@/components/math/grade-7/gondolkodjunk/rendezd-sorba/OrderingTheory").then(m => ({ default: m.OrderingTheory }))) as any;
const Grade7OrderItQuiz = lazy(() => import("@/components/math/grade-7/gondolkodjunk/rendezd-sorba/OrderingQuiz").then(m => ({ default: m.OrderingQuiz }))) as any;
const Grade7OrderItMatcher = lazy(() => import("@/components/math/grade-7/gondolkodjunk/rendezd-sorba/OrderingMatcher").then(m => ({ default: m.OrderingMatcher }))) as any;
const Grade7OrderItSorter = lazy(() => import("@/components/math/grade-7/gondolkodjunk/rendezd-sorba/OrderingSorter").then(m => ({ default: m.OrderingSorter }))) as any;
const Grade7HowManyCasesTheory = lazy(() => import("@/components/math/grade-7/gondolkodjunk/hany-eset-van/PossibilitiesTheory").then(m => ({ default: m.PossibilitiesTheory }))) as any;
const Grade7HowManyCasesQuiz = lazy(() => import("@/components/math/grade-7/gondolkodjunk/hany-eset-van/PossibilitiesQuiz").then(m => ({ default: m.PossibilitiesQuiz }))) as any;
const Grade7HowManyCasesMatcher = lazy(() => import("@/components/math/grade-7/gondolkodjunk/hany-eset-van/PossibilitiesMatcher").then(m => ({ default: m.PossibilitiesMatcher }))) as any;
const Grade7HowManyCasesSorter = lazy(() => import("@/components/math/grade-7/gondolkodjunk/hany-eset-van/PossibilitiesSorter").then(m => ({ default: m.PossibilitiesSorter }))) as any;
const Grade7GraphsTheory = lazy(() => import("@/components/math/grade-7/gondolkodjunk/grafok/GraphTheory").then(m => ({ default: m.GraphTheory }))) as any;
const Grade7GraphsQuiz = lazy(() => import("@/components/math/grade-7/gondolkodjunk/grafok/GraphQuiz").then(m => ({ default: m.GraphQuiz }))) as any;
const Grade7GraphsMatcher = lazy(() => import("@/components/math/grade-7/gondolkodjunk/grafok/GraphMatcher").then(m => ({ default: m.GraphMatcher }))) as any;
const Grade7GraphsSorter = lazy(() => import("@/components/math/grade-7/gondolkodjunk/grafok/GraphSorter").then(m => ({ default: m.GraphSorter }))) as any;
const Grade7ProofsTheory = lazy(() => import("@/components/math/grade-7/gondolkodjunk/igazold-cafold/ProofTheory").then(m => ({ default: m.ProofTheory }))) as any;
const Grade7ProofsQuiz = lazy(() => import("@/components/math/grade-7/gondolkodjunk/igazold-cafold/ProofQuiz").then(m => ({ default: m.ProofQuiz }))) as any;
const Grade7ProofsMatcher = lazy(() => import("@/components/math/grade-7/gondolkodjunk/igazold-cafold/ProofMatcher").then(m => ({ default: m.ProofMatcher }))) as any;
const Grade7ProofsSorter = lazy(() => import("@/components/math/grade-7/gondolkodjunk/igazold-cafold/ProofSorter").then(m => ({ default: m.ProofSorter }))) as any;
const Grade7GamesTheory = lazy(() => import("@/components/math/grade-7/gondolkodjunk/matematikai-jatekok/GameTheory").then(m => ({ default: m.GameTheory }))) as any;
const Grade7GamesQuiz = lazy(() => import("@/components/math/grade-7/gondolkodjunk/matematikai-jatekok/GameQuiz").then(m => ({ default: m.GameQuiz }))) as any;
const Grade7GamesMatcher = lazy(() => import("@/components/math/grade-7/gondolkodjunk/matematikai-jatekok/GameMatcher").then(m => ({ default: m.GameMatcher }))) as any;
const Grade7GamesSorter = lazy(() => import("@/components/math/grade-7/gondolkodjunk/matematikai-jatekok/GameSorter").then(m => ({ default: m.GameSorter }))) as any;
const Grade7SummaryTheory = lazy(() => import("@/components/math/grade-7/gondolkodjunk/osszefoglalas/SummaryTheory").then(m => ({ default: m.SummaryTheory }))) as any;
const Grade7SummaryQuiz = lazy(() => import("@/components/math/grade-7/gondolkodjunk/osszefoglalas/SummaryQuiz").then(m => ({ default: m.SummaryQuiz }))) as any;
const Grade7SummaryMatcher = lazy(() => import("@/components/math/grade-7/gondolkodjunk/osszefoglalas/SummaryMatcher").then(m => ({ default: m.SummaryMatcher }))) as any;
const Grade7SummarySorter = lazy(() => import("@/components/math/grade-7/gondolkodjunk/osszefoglalas/SummarySorter").then(m => ({ default: m.SummarySorter }))) as any;
const Grade7IntegerPropertiesTheory = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/egesz-szamok-tulajdonsagai/IntegerPropertiesTheory").then(m => ({ default: m.IntegerPropertiesTheory }))) as any;
const Grade7IntegerPropertiesQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/egesz-szamok-tulajdonsagai/IntegerPropertiesQuiz").then(m => ({ default: m.IntegerPropertiesQuiz }))) as any;
const Grade7IntegerPropertiesMatcher = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/egesz-szamok-tulajdonsagai/IntegerPropertiesMatcher").then(m => ({ default: m.IntegerPropertiesMatcher }))) as any;
const Grade7IntegerPropertiesSorter = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/egesz-szamok-tulajdonsagai/IntegerPropertiesSorter").then(m => ({ default: m.IntegerPropertiesSorter }))) as any;
const Grade7FractionsDecimalsTheory = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/tortek-tizedestortek/FractionsDecimalsTheory").then(m => ({ default: m.FractionsDecimalsTheory }))) as any;
const Grade7FractionsDecimalsQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/tortek-tizedestortek/FractionsDecimalsQuiz").then(m => ({ default: m.FractionsDecimalsQuiz }))) as any;
const Grade7FractionsDecimalsMatcher = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/tortek-tizedestortek/FractionsDecimalsMatcher").then(m => ({ default: m.FractionsDecimalsMatcher }))) as any;
const Grade7FractionsDecimalsSorter = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/tortek-tizedestortek/FractionsDecimalsSorter").then(m => ({ default: m.FractionsDecimalsSorter }))) as any;
const Grade7RationalOperationsTheory = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/muveletek-racionalis-szamok/RationalOperationsTheory").then(m => ({ default: m.RationalOperationsTheory }))) as any;
const Grade7RationalOperationsQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/muveletek-racionalis-szamok/RationalOperationsQuiz").then(m => ({ default: m.RationalOperationsQuiz }))) as any;
const Grade7RationalOperationsMatcher = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/muveletek-racionalis-szamok/RationalOperationsMatcher").then(m => ({ default: m.RationalOperationsMatcher }))) as any;
const Grade7RationalOperationsSorter = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/muveletek-racionalis-szamok/RationalOperationsSorter").then(m => ({ default: m.RationalOperationsSorter }))) as any;
const Grade7WordProblemsTheory = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/szoveges-feladatok/WordProblemsTheory").then(m => ({ default: m.WordProblemsTheory }))) as any;
const Grade7WordProblemsQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/szoveges-feladatok/WordProblemsQuiz").then(m => ({ default: m.WordProblemsQuiz }))) as any;
const Grade7WordProblemsMatcher = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/szoveges-feladatok/WordProblemsMatcher").then(m => ({ default: m.WordProblemsMatcher }))) as any;
const Grade7WordProblemsSorter = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/szoveges-feladatok/WordProblemsSorter").then(m => ({ default: m.WordProblemsSorter }))) as any;
const Grade7ComplexOperationsTheory = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszetett-muveletek-zarojelfelbontas/ComplexOperationsTheory").then(m => ({ default: m.ComplexOperationsTheory }))) as any;
const Grade7ComplexOperationsQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszetett-muveletek-zarojelfelbontas/ComplexOperationsQuiz").then(m => ({ default: m.ComplexOperationsQuiz }))) as any;
const Grade7ComplexOperationsMatcher = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszetett-muveletek-zarojelfelbontas/ComplexOperationsMatcher").then(m => ({ default: m.ComplexOperationsMatcher }))) as any;
const Grade7ComplexOperationsSorter = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszetett-muveletek-zarojelfelbontas/ComplexOperationsSorter").then(m => ({ default: m.ComplexOperationsSorter }))) as any;
const Grade7NumbersLettersTheory = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/szamok-es-betuk-hasznalata/NumbersLettersTheory").then(m => ({ default: m.NumbersLettersTheory }))) as any;
const Grade7NumbersLettersQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/szamok-es-betuk-hasznalata/NumbersLettersQuiz").then(m => ({ default: m.NumbersLettersQuiz }))) as any;
const Grade7NumbersLettersMatcher = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/szamok-es-betuk-hasznalata/NumbersLettersMatcher").then(m => ({ default: m.NumbersLettersMatcher }))) as any;
const Grade7NumbersLettersSorter = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/szamok-es-betuk-hasznalata/NumbersLettersSorter").then(m => ({ default: m.NumbersLettersSorter }))) as any;
const Grade7CombiningSubstitutionTheory = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszevonas-helyettesitesi-ertek/CombiningSubstitutionTheory").then(m => ({ default: m.CombiningSubstitutionTheory }))) as any;
const Grade7CombiningSubstitutionQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszevonas-helyettesitesi-ertek/CombiningSubstitutionQuiz").then(m => ({ default: m.CombiningSubstitutionQuiz }))) as any;
const Grade7CombiningSubstitutionMatcher = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszevonas-helyettesitesi-ertek/CombiningSubstitutionMatcher").then(m => ({ default: m.CombiningSubstitutionMatcher }))) as any;
const Grade7CombiningSubstitutionSorter = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszevonas-helyettesitesi-ertek/CombiningSubstitutionSorter").then(m => ({ default: m.CombiningSubstitutionSorter }))) as any;
const Grade7ExpansionFactoringTheory = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/zarojelfelbontas-kiemeles/ExpansionFactoringTheory").then(m => ({ default: m.ExpansionFactoringTheory }))) as any;
const Grade7ExpansionFactoringQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/zarojelfelbontas-kiemeles/ExpansionFactoringQuiz").then(m => ({ default: m.ExpansionFactoringQuiz }))) as any;
const Grade7ExpansionFactoringMatcher = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/zarojelfelbontas-kiemeles/ExpansionFactoringMatcher").then(m => ({ default: m.ExpansionFactoringMatcher }))) as any;
const Grade7ExpansionFactoringSorter = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/zarojelfelbontas-kiemeles/ExpansionFactoringSorter").then(m => ({ default: m.ExpansionFactoringSorter }))) as any;
const Grade7RationalSummaryTheory = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszefoglalas/RationalSummaryTheory").then(m => ({ default: m.RationalSummaryTheory }))) as any;
const Grade7RationalSummaryQuiz = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszefoglalas/RationalSummaryQuiz").then(m => ({ default: m.RationalSummaryQuiz }))) as any;
const Grade7RationalSummaryMatcher = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszefoglalas/RationalSummaryMatcher").then(m => ({ default: m.RationalSummaryMatcher }))) as any;
const Grade7RationalSummarySorter = lazy(() => import("@/components/math/grade-7/racionalis-szamok-algebra/osszefoglalas/RationalSummarySorter").then(m => ({ default: m.RationalSummarySorter }))) as any;
const Grade7GeometricConceptsTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/geometriai-fogalmak/GeometricConceptsTheory").then(m => ({ default: m.GeometricConceptsTheory }))) as any;
const Grade7GeometricConceptsQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/geometriai-fogalmak/GeometricConceptsQuiz").then(m => ({ default: m.GeometricConceptsQuiz }))) as any;
const Grade7GeometricConceptsMatcher = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/geometriai-fogalmak/GeometricConceptsMatcher").then(m => ({ default: m.GeometricConceptsMatcher }))) as any;
const Grade7GeometricConceptsSorter = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/geometriai-fogalmak/GeometricConceptsSorter").then(m => ({ default: m.GeometricConceptsSorter }))) as any;
const Grade7TriangleLinesTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/haromszogek-nevezetes-vonalai/TriangleLinesTheory").then(m => ({ default: m.TriangleLinesTheory }))) as any;
const Grade7TriangleLinesQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/haromszogek-nevezetes-vonalai/TriangleLinesQuiz").then(m => ({ default: m.TriangleLinesQuiz }))) as any;
const Grade7TriangleLinesMatcher = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/haromszogek-nevezetes-vonalai/TriangleLinesMatcher").then(m => ({ default: m.TriangleLinesMatcher }))) as any;
const Grade7TriangleLinesSorter = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/haromszogek-nevezetes-vonalai/TriangleLinesSorter").then(m => ({ default: m.TriangleLinesSorter }))) as any;
const Grade7TrianglesAndQuadrilateralsTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/haromszogek-es-negyszogek/TrianglesAndQuadrilateralsTheory").then(m => ({ default: m.TrianglesAndQuadrilateralsTheory }))) as any;
const Grade7TrianglesAndQuadrilateralsQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/haromszogek-es-negyszogek/TrianglesAndQuadrilateralsQuiz").then(m => ({ default: m.TrianglesAndQuadrilateralsQuiz }))) as any;
const Grade7TrianglesAndQuadrilateralsMatcher = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/haromszogek-es-negyszogek/TrianglesAndQuadrilateralsMatcher").then(m => ({ default: m.TrianglesAndQuadrilateralsMatcher }))) as any;
const Grade7TrianglesAndQuadrilateralsSorter = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/haromszogek-es-negyszogek/TrianglesAndQuadrilateralsSorter").then(m => ({ default: m.TrianglesAndQuadrilateralsSorter }))) as any;
const Grade7GeometricTransformationsTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/geometriai-transzformaciok/GeometricTransformationsTheory").then(m => ({ default: m.GeometricTransformationsTheory }))) as any;
const Grade7GeometricTransformationsQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/geometriai-transzformaciok/GeometricTransformationsQuiz").then(m => ({ default: m.GeometricTransformationsQuiz }))) as any;
const Grade7GeometricTransformationsMatcher = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/geometriai-transzformaciok/GeometricTransformationsMatcher").then(m => ({ default: m.GeometricTransformationsMatcher }))) as any;
const Grade7GeometricTransformationsSorter = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/geometriai-transzformaciok/GeometricTransformationsSorter").then(m => ({ default: m.GeometricTransformationsSorter }))) as any;
const Grade7PointReflectionTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontos-tukrozes/PointReflectionTheory").then(m => ({ default: m.PointReflectionTheory }))) as any;
const Grade7PointReflectionQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontos-tukrozes/PointReflectionQuiz").then(m => ({ default: m.PointReflectionQuiz }))) as any;
const Grade7PointReflectionMatcher = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontos-tukrozes/PointReflectionMatcher").then(m => ({ default: m.PointReflectionMatcher }))) as any;
const Grade7PointReflectionSorter = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontos-tukrozes/PointReflectionSorter").then(m => ({ default: m.PointReflectionSorter }))) as any;
const Grade7ReflectionAppTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/a-kozeppontos-tukrozes-alkalmazasa/ReflectionAppTheory").then(m => ({ default: m.ReflectionAppTheory }))) as any;
const Grade7ReflectionAppQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/a-kozeppontos-tukrozes-alkalmazasa/ReflectionAppQuiz").then(m => ({ default: m.ReflectionAppQuiz }))) as any;
const Grade7ReflectionAppMatcher = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/a-kozeppontos-tukrozes-alkalmazasa/ReflectionAppMatcher").then(m => ({ default: m.ReflectionAppMatcher }))) as any;
const Grade7ReflectionAppSorter = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/a-kozeppontos-tukrozes-alkalmazasa/ReflectionAppSorter").then(m => ({ default: m.ReflectionAppSorter }))) as any;
const Grade7AnglePairsTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szogparok/AnglePairsTheory").then(m => ({ default: m.AnglePairsTheory }))) as any;
const Grade7AnglePairsQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szogparok/AnglePairsQuiz").then(m => ({ default: m.AnglePairsQuiz }))) as any;
const Grade7AnglePairsMatcher = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szogparok/AnglePairsMatcher").then(m => ({ default: m.AnglePairsMatcher }))) as any;
const Grade7AnglePairsSorter = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szogparok/AnglePairsSorter").then(m => ({ default: m.AnglePairsSorter }))) as any;
const Grade7SymmetryTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontos-es-tengelyes-szimmetria/SymmetryComparisonTheory").then(m => ({ default: m.SymmetryComparisonTheory }))) as any;
const Grade7SymmetryQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontos-es-tengelyes-szimmetria/SymmetryComparisonQuiz").then(m => ({ default: m.SymmetryComparisonQuiz }))) as any;
const Grade7SymmetryMatcher = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontos-es-tengelyes-szimmetria/SymmetryComparisonMatcher").then(m => ({ default: m.SymmetryComparisonMatcher }))) as any;
const Grade7SymmetrySorter = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontos-es-tengelyes-szimmetria/SymmetryComparisonSorter").then(m => ({ default: m.SymmetryComparisonSorter }))) as any;
const Grade7ParallelogramTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/paralelogramma-es-deltoid/ParallelogramDeltoidTheory").then(m => ({ default: m.ParallelogramDeltoidTheory }))) as any;
const Grade7ParallelogramQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/paralelogramma-es-deltoid/ParallelogramDeltoidQuiz").then(m => ({ default: m.ParallelogramDeltoidQuiz }))) as any;
const Grade7ParallelogramMatcher = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/paralelogramma-es-deltoid/ParallelogramDeltoidMatcher").then(m => ({ default: m.ParallelogramDeltoidMatcher }))) as any;
const Grade7ParallelogramSorter = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/paralelogramma-es-deltoid/ParallelogramDeltoidSorter").then(m => ({ default: m.ParallelogramDeltoidSorter }))) as any;
const Grade7PointSymmetricShapesTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontosan-szimmetrikus-alakzatok/PointSymmetricShapesTheory").then(m => ({ default: m.PointSymmetricShapesTheory }))) as any;
const Grade7PointSymmetricShapesQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontosan-szimmetrikus-alakzatok/PointSymmetricShapesQuiz").then(m => ({ default: m.PointSymmetricShapesQuiz }))) as any;
const Grade7PointSymmetricShapesMatcher = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontosan-szimmetrikus-alakzatok/PointSymmetricShapesMatcher").then(m => ({ default: m.PointSymmetricShapesMatcher }))) as any;
const Grade7PointSymmetricShapesSorter = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/kozeppontosan-szimmetrikus-alakzatok/PointSymmetricShapesSorter").then(m => ({ default: m.PointSymmetricShapesSorter }))) as any;
const Grade7RegularPolygonsTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szabalyos-sokszogek/RegularPolygonsTheory").then(m => ({ default: m.RegularPolygonsTheory }))) as any;
const Grade7RegularPolygonsQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szabalyos-sokszogek/RegularPolygonsQuiz").then(m => ({ default: m.RegularPolygonsQuiz }))) as any;
const Grade7RegularPolygonsMatcher = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szabalyos-sokszogek/RegularPolygonsMatcher").then(m => ({ default: m.RegularPolygonsMatcher }))) as any;
const Grade7RegularPolygonsSorter = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szabalyos-sokszogek/RegularPolygonsSorter").then(m => ({ default: m.RegularPolygonsSorter }))) as any;
const Grade7CircleTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/a-kor/CircleTheory").then(m => ({ default: m.CircleTheory }))) as any;
const Grade7CircleQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/a-kor/CircleQuiz").then(m => ({ default: m.CircleQuiz }))) as any;
const Grade7CircleMatcher = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/a-kor/CircleMatcher").then(m => ({ default: m.CircleMatcher }))) as any;
const Grade7CircleSorter = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/a-kor/CircleSorter").then(m => ({ default: m.CircleSorter }))) as any;
const Grade7ConstructionsTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szerkesztesek/ConstructionsTheory").then(m => ({ default: m.ConstructionsTheory }))) as any;
const Grade7ConstructionsQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szerkesztesek/ConstructionsQuiz").then(m => ({ default: m.ConstructionsQuiz }))) as any;
const Grade7ConstructionsMatcher = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szerkesztesek/ConstructionsMatcher").then(m => ({ default: m.ConstructionsMatcher }))) as any;
const Grade7ConstructionsSorter = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/szerkesztesek/ConstructionsSorter").then(m => ({ default: m.ConstructionsSorter }))) as any;
const Grade7GeometrySummaryTheory = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/osszefoglalas/GeometrySummaryTheory").then(m => ({ default: m.GeometrySummaryTheory }))) as any;
const Grade7GeometrySummaryQuiz = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/osszefoglalas/GeometrySummaryQuiz").then(m => ({ default: m.GeometrySummaryQuiz }))) as any;
const Grade7GeometrySummaryMatcher = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/osszefoglalas/GeometrySummaryMatcher").then(m => ({ default: m.GeometrySummaryMatcher }))) as any;
const Grade7GeometrySummarySorter = lazy(() => import("@/components/math/grade-7/geometriai-transzformaciok/osszefoglalas/GeometrySummarySorter").then(m => ({ default: m.GeometrySummarySorter }))) as any;
const Grade7LargeNumbersPowersTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/nagy-szamok-es-a-hatvanyalak/LargeNumbersPowersTheory").then(m => ({ default: m.LargeNumbersPowersTheory }))) as any;
const Grade7LargeNumbersPowersQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/nagy-szamok-es-a-hatvanyalak/LargeNumbersPowersQuiz").then(m => ({ default: m.LargeNumbersPowersQuiz }))) as any;
const Grade7LargeNumbersPowersMatcher = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/nagy-szamok-es-a-hatvanyalak/LargeNumbersPowersMatcher").then(m => ({ default: m.LargeNumbersPowersMatcher }))) as any;
const Grade7LargeNumbersPowersSorter = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/nagy-szamok-es-a-hatvanyalak/LargeNumbersPowersSorter").then(m => ({ default: m.LargeNumbersPowersSorter }))) as any;
const Grade7PowersApplicationTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/hatvanyok-alkalmazasa/PowersApplicationTheory").then(m => ({ default: m.PowersApplicationTheory }))) as any;
const Grade7PowersApplicationQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/hatvanyok-alkalmazasa/PowersApplicationQuiz").then(m => ({ default: m.PowersApplicationQuiz }))) as any;
const Grade7PowersApplicationMatcher = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/hatvanyok-alkalmazasa/PowersApplicationMatcher").then(m => ({ default: m.PowersApplicationMatcher }))) as any;
const Grade7PowersApplicationSorter = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/hatvanyok-alkalmazasa/PowersApplicationSorter").then(m => ({ default: m.PowersApplicationSorter }))) as any;
const Grade7DivisibilityReviewTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/mit-tanultunk-az-oszthatosagrol-ismetles/DivisibilityReviewTheory").then(m => ({ default: m.DivisibilityReviewTheory }))) as any;
const Grade7DivisibilityReviewQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/mit-tanultunk-az-oszthatosagrol-ismetles/DivisibilityReviewQuiz").then(m => ({ default: m.DivisibilityReviewQuiz }))) as any;
const Grade7DivisibilityReviewMatcher = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/mit-tanultunk-az-oszthatosagrol-ismetles/DivisibilityReviewMatcher").then(m => ({ default: m.DivisibilityReviewMatcher }))) as any;
const Grade7DivisibilityReviewSorter = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/mit-tanultunk-az-oszthatosagrol-ismetles/DivisibilityReviewSorter").then(m => ({ default: m.DivisibilityReviewSorter }))) as any;
const Grade7LogicTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/egy-kis-logika/LogicTheory").then(m => ({ default: m.LogicTheory }))) as any;
const Grade7LogicQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/egy-kis-logika/LogicQuiz").then(m => ({ default: m.LogicQuiz }))) as any;
const Grade7LogicMatcher = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/egy-kis-logika/LogicMatcher").then(m => ({ default: m.LogicMatcher }))) as any;
const Grade7LogicSorter = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/egy-kis-logika/LogicSorter").then(m => ({ default: m.LogicSorter }))) as any;
const Grade7PrimeFactorizationTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/a-primszamok-a-szamok-primtenyezos-felbontasa/PrimeFactorizationTheory").then(m => ({ default: m.PrimeFactorizationTheory }))) as any;
const Grade7PrimeFactorizationQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/a-primszamok-a-szamok-primtenyezos-felbontasa/PrimeFactorizationQuiz").then(m => ({ default: m.PrimeFactorizationQuiz }))) as any;
const Grade7PrimeFactorizationMatcher = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/a-primszamok-a-szamok-primtenyezos-felbontasa/PrimeFactorizationMatcher").then(m => ({ default: m.PrimeFactorizationMatcher }))) as any;
const Grade7PrimeFactorizationSorter = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/a-primszamok-a-szamok-primtenyezos-felbontasa/PrimeFactorizationSorter").then(m => ({ default: m.PrimeFactorizationSorter }))) as any;
const Grade7DivisibilityRulesTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/keszitsunk-magunknak-oszthatosagi-szabalyokat/DivisibilityRulesTheory").then(m => ({ default: m.DivisibilityRulesTheory }))) as any;
const Grade7DivisibilityRulesQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/keszitsunk-magunknak-oszthatosagi-szabalyokat/DivisibilityRulesQuiz").then(m => ({ default: m.DivisibilityRulesQuiz }))) as any;
const Grade7DivisibilityRulesMatcher = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/keszitsunk-magunknak-oszthatosagi-szabalyokat/DivisibilityRulesMatcher").then(m => ({ default: m.DivisibilityRulesMatcher }))) as any;
const Grade7DivisibilityRulesSorter = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/keszitsunk-magunknak-oszthatosagi-szabalyokat/DivisibilityRulesSorter").then(m => ({ default: m.DivisibilityRulesSorter }))) as any;
const Grade7DivisorsMultiplesTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/osztokrol-tobbszorosokrol-meg-egyszer/DivisorsMultiplesTheory").then(m => ({ default: m.DivisorsMultiplesTheory }))) as any;
const Grade7DivisorsMultiplesQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/osztokrol-tobbszorosokrol-meg-egyszer/DivisorsMultiplesQuiz").then(m => ({ default: m.DivisorsMultiplesQuiz }))) as any;
const Grade7DivisorsMultiplesMatcher = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/osztokrol-tobbszorosokrol-meg-egyszer/DivisorsMultiplesMatcher").then(m => ({ default: m.DivisorsMultiplesMatcher }))) as any;
const Grade7DivisorsMultiplesSorter = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/osztokrol-tobbszorosokrol-meg-egyszer/DivisorsMultiplesSorter").then(m => ({ default: m.DivisorsMultiplesSorter }))) as any;
const Grade7GreatestCommonDivisorTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/legnagyobb-kozos-oszto/GreatestCommonDivisorTheory").then(m => ({ default: m.GreatestCommonDivisorTheory }))) as any;
const Grade7GreatestCommonDivisorQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/legnagyobb-kozos-oszto/GreatestCommonDivisorQuiz").then(m => ({ default: m.GreatestCommonDivisorQuiz }))) as any;
const Grade7GreatestCommonDivisorMatcher = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/legnagyobb-kozos-oszto/GreatestCommonDivisorMatcher").then(m => ({ default: m.GreatestCommonDivisorMatcher }))) as any;
const Grade7GreatestCommonDivisorSorter = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/legnagyobb-kozos-oszto/GreatestCommonDivisorSorter").then(m => ({ default: m.GreatestCommonDivisorSorter }))) as any;
const Grade7LeastCommonMultipleTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/legkisebb-kozos-tobbszoros/LeastCommonMultipleTheory").then(m => ({ default: m.LeastCommonMultipleTheory }))) as any;
const Grade7LeastCommonMultipleQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/legkisebb-kozos-tobbszoros/LeastCommonMultipleQuiz").then(m => ({ default: m.LeastCommonMultipleQuiz }))) as any;
const Grade7LeastCommonMultipleMatcher = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/legkisebb-kozos-tobbszoros/LeastCommonMultipleMatcher").then(m => ({ default: m.LeastCommonMultipleMatcher }))) as any;
const Grade7LeastCommonMultipleSorter = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/legkisebb-kozos-tobbszoros/LeastCommonMultipleSorter").then(m => ({ default: m.LeastCommonMultipleSorter }))) as any;
const Grade7MathGamesTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/matematikai-jatekok/MathGamesTheory").then(m => ({ default: m.MathGamesTheory }))) as any;
const Grade7MathGamesQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/matematikai-jatekok/MathGamesQuiz").then(m => ({ default: m.MathGamesQuiz }))) as any;
const Grade7MathGamesMatcher = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/matematikai-jatekok/MathGamesMatcher").then(m => ({ default: m.MathGamesMatcher }))) as any;
const Grade7MathGamesSorter = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/matematikai-jatekok/MathGamesSorter").then(m => ({ default: m.MathGamesSorter }))) as any;
const Grade7PowersSummaryTheory = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/osszefoglalas/PowersSummaryTheory").then(m => ({ default: m.PowersSummaryTheory }))) as any;
const Grade7PowersSummaryQuiz = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/osszefoglalas/PowersSummaryQuiz").then(m => ({ default: m.PowersSummaryQuiz }))) as any;
const Grade7PowersSummaryMatcher = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/osszefoglalas/PowersSummaryMatcher").then(m => ({ default: m.PowersSummaryMatcher }))) as any;
const Grade7PowersSummarySorter = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/osszefoglalas/PowersSummarySorter").then(m => ({ default: m.PowersSummarySorter }))) as any;
const Grade7RatioReviewTheory = lazy(() => import("@/components/math/grade-7/szazalekszamitas/az-aranyossagrol-meg-egyszer/RatioReviewTheory").then(m => ({ default: m.RatioReviewTheory }))) as any;
const Grade7RatioReviewQuiz = lazy(() => import("@/components/math/grade-7/szazalekszamitas/az-aranyossagrol-meg-egyszer/RatioReviewQuiz").then(m => ({ default: m.RatioReviewQuiz }))) as any;
const Grade7RatioReviewMatcher = lazy(() => import("@/components/math/grade-7/szazalekszamitas/az-aranyossagrol-meg-egyszer/RatioReviewMatcher").then(m => ({ default: m.RatioReviewMatcher }))) as any;
const Grade7RatioReviewSorter = lazy(() => import("@/components/math/grade-7/szazalekszamitas/az-aranyossagrol-meg-egyszer/RatioReviewSorter").then(m => ({ default: m.RatioReviewSorter }))) as any;
const Grade7PercentReviewTheory = lazy(() => import("@/components/math/grade-7/szazalekszamitas/mit-tanultunk-a-szazalekszamitasrol/PercentReviewTheory").then(m => ({ default: m.PercentReviewTheory }))) as any;
const Grade7PercentReviewQuiz = lazy(() => import("@/components/math/grade-7/szazalekszamitas/mit-tanultunk-a-szazalekszamitasrol/PercentReviewQuiz").then(m => ({ default: m.PercentReviewQuiz }))) as any;
const Grade7PercentReviewMatcher = lazy(() => import("@/components/math/grade-7/szazalekszamitas/mit-tanultunk-a-szazalekszamitasrol/PercentReviewMatcher").then(m => ({ default: m.PercentReviewMatcher }))) as any;
const Grade7PercentReviewSorter = lazy(() => import("@/components/math/grade-7/szazalekszamitas/mit-tanultunk-a-szazalekszamitasrol/PercentReviewSorter").then(m => ({ default: m.PercentReviewSorter }))) as any;
const Grade7CalculateHundredTheory = lazy(() => import("@/components/math/grade-7/szazalekszamitas/a-100-szazalek-kiszamitasa/CalculateHundredTheory").then(m => ({ default: m.CalculateHundredTheory }))) as any;
const Grade7CalculateHundredQuiz = lazy(() => import("@/components/math/grade-7/szazalekszamitas/a-100-szazalek-kiszamitasa/CalculateHundredQuiz").then(m => ({ default: m.CalculateHundredQuiz }))) as any;
const Grade7CalculateHundredMatcher = lazy(() => import("@/components/math/grade-7/szazalekszamitas/a-100-szazalek-kiszamitasa/CalculateHundredMatcher").then(m => ({ default: m.CalculateHundredMatcher }))) as any;
const Grade7CalculateHundredSorter = lazy(() => import("@/components/math/grade-7/szazalekszamitas/a-100-szazalek-kiszamitasa/CalculateHundredSorter").then(m => ({ default: m.CalculateHundredSorter }))) as any;
const Grade7WhatPercentTheory = lazy(() => import("@/components/math/grade-7/szazalekszamitas/hany-szazalek/WhatPercentTheory").then(m => ({ default: m.WhatPercentTheory }))) as any;
const Grade7WhatPercentQuiz = lazy(() => import("@/components/math/grade-7/szazalekszamitas/hany-szazalek/WhatPercentQuiz").then(m => ({ default: m.WhatPercentQuiz }))) as any;
const Grade7WhatPercentMatcher = lazy(() => import("@/components/math/grade-7/szazalekszamitas/hany-szazalek/WhatPercentMatcher").then(m => ({ default: m.WhatPercentMatcher }))) as any;
const Grade7WhatPercentSorter = lazy(() => import("@/components/math/grade-7/szazalekszamitas/hany-szazalek/WhatPercentSorter").then(m => ({ default: m.WhatPercentSorter }))) as any;
const Grade7PracticeTheory = lazy(() => import("@/components/math/grade-7/szazalekszamitas/a-szazalekszamitas-gyakorlasa/PracticeTheory").then(m => ({ default: m.PracticeTheory }))) as any;
const Grade7PracticeQuiz = lazy(() => import("@/components/math/grade-7/szazalekszamitas/a-szazalekszamitas-gyakorlasa/PracticeQuiz").then(m => ({ default: m.PracticeQuiz }))) as any;
const Grade7PracticeMatcher = lazy(() => import("@/components/math/grade-7/szazalekszamitas/a-szazalekszamitas-gyakorlasa/PracticeMatcher").then(m => ({ default: m.PracticeMatcher }))) as any;
const Grade7PracticeSorter = lazy(() => import("@/components/math/grade-7/szazalekszamitas/a-szazalekszamitas-gyakorlasa/PracticeSorter").then(m => ({ default: m.PracticeSorter }))) as any;
const Grade7ComplexPercentTheory = lazy(() => import("@/components/math/grade-7/szazalekszamitas/osszetett-szazalekszamitasi-feladatok/ComplexPercentTheory").then(m => ({ default: m.ComplexPercentTheory }))) as any;
const Grade7ComplexPercentQuiz = lazy(() => import("@/components/math/grade-7/szazalekszamitas/osszetett-szazalekszamitasi-feladatok/ComplexPercentQuiz").then(m => ({ default: m.ComplexPercentQuiz }))) as any;
const Grade7ComplexPercentMatcher = lazy(() => import("@/components/math/grade-7/szazalekszamitas/osszetett-szazalekszamitasi-feladatok/ComplexPercentMatcher").then(m => ({ default: m.ComplexPercentMatcher }))) as any;
const Grade7ComplexPercentSorter = lazy(() => import("@/components/math/grade-7/szazalekszamitas/osszetett-szazalekszamitasi-feladatok/ComplexPercentSorter").then(m => ({ default: m.ComplexPercentSorter }))) as any;
const Grade7PctWordProblemsTheory = lazy(() => import("@/components/math/grade-7/szazalekszamitas/szoveges-feladatok/WordProblemsTheory").then(m => ({ default: m.WordProblemsTheory }))) as any;
const Grade7PctWordProblemsQuiz = lazy(() => import("@/components/math/grade-7/szazalekszamitas/szoveges-feladatok/WordProblemsQuiz").then(m => ({ default: m.WordProblemsQuiz }))) as any;
const Grade7PctWordProblemsMatcher = lazy(() => import("@/components/math/grade-7/szazalekszamitas/szoveges-feladatok/WordProblemsMatcher").then(m => ({ default: m.WordProblemsMatcher }))) as any;
const Grade7PctWordProblemsSorter = lazy(() => import("@/components/math/grade-7/szazalekszamitas/szoveges-feladatok/WordProblemsSorter").then(m => ({ default: m.WordProblemsSorter }))) as any;
const Grade7PercentSummaryTheory = lazy(() => import("@/components/math/grade-7/szazalekszamitas/osszefoglalas/PercentSummaryTheory").then(m => ({ default: m.PercentSummaryTheory }))) as any;
const Grade7PercentSummaryQuiz = lazy(() => import("@/components/math/grade-7/szazalekszamitas/osszefoglalas/PercentSummaryQuiz").then(m => ({ default: m.PercentSummaryQuiz }))) as any;
const Grade7PercentSummaryMatcher = lazy(() => import("@/components/math/grade-7/szazalekszamitas/osszefoglalas/PercentSummaryMatcher").then(m => ({ default: m.PercentSummaryMatcher }))) as any;
const Grade7PercentSummarySorter = lazy(() => import("@/components/math/grade-7/szazalekszamitas/osszefoglalas/PercentSummarySorter").then(m => ({ default: m.PercentSummarySorter }))) as any;
const Grade7EquationMethodsTheory = lazy(() => import("@/components/math/grade-7/egyenletek/egyenletmegoldasi-modszerek-probalgatas-es-lebontogatas/EquationMethodsTheory").then(m => ({ default: m.EquationMethodsTheory }))) as any;
const Grade7EquationMethodsQuiz = lazy(() => import("@/components/math/grade-7/egyenletek/egyenletmegoldasi-modszerek-probalgatas-es-lebontogatas/EquationMethodsQuiz").then(m => ({ default: m.EquationMethodsQuiz }))) as any;
const Grade7EquationMethodsMatcher = lazy(() => import("@/components/math/grade-7/egyenletek/egyenletmegoldasi-modszerek-probalgatas-es-lebontogatas/EquationMethodsMatcher").then(m => ({ default: m.EquationMethodsMatcher }))) as any;
const Grade7EquationMethodsSorter = lazy(() => import("@/components/math/grade-7/egyenletek/egyenletmegoldasi-modszerek-probalgatas-es-lebontogatas/EquationMethodsSorter").then(m => ({ default: m.EquationMethodsSorter }))) as any;
const Grade7BalanceScaleTheory = lazy(() => import("@/components/math/grade-7/egyenletek/a-merlegelv/BalanceScaleTheory").then(m => ({ default: m.BalanceScaleTheory }))) as any;
const Grade7BalanceScaleQuiz = lazy(() => import("@/components/math/grade-7/egyenletek/a-merlegelv/BalanceScaleQuiz").then(m => ({ default: m.BalanceScaleQuiz }))) as any;
const Grade7BalanceScaleMatcher = lazy(() => import("@/components/math/grade-7/egyenletek/a-merlegelv/BalanceScaleMatcher").then(m => ({ default: m.BalanceScaleMatcher }))) as any;
const Grade7BalanceScaleSorter = lazy(() => import("@/components/math/grade-7/egyenletek/a-merlegelv/BalanceScaleSorter").then(m => ({ default: m.BalanceScaleSorter }))) as any;
const Grade7EquationSolveTheory = lazy(() => import("@/components/math/grade-7/egyenletek/egyenletek-megoldasa-merlegelvvel/EquationSolveTheory").then(m => ({ default: m.EquationSolveTheory }))) as any;
const Grade7EquationSolveQuiz = lazy(() => import("@/components/math/grade-7/egyenletek/egyenletek-megoldasa-merlegelvvel/EquationSolveQuiz").then(m => ({ default: m.EquationSolveQuiz }))) as any;
const Grade7EquationSolveMatcher = lazy(() => import("@/components/math/grade-7/egyenletek/egyenletek-megoldasa-merlegelvvel/EquationSolveMatcher").then(m => ({ default: m.EquationSolveMatcher }))) as any;
const Grade7EquationSolveSorter = lazy(() => import("@/components/math/grade-7/egyenletek/egyenletek-megoldasa-merlegelvvel/EquationSolveSorter").then(m => ({ default: m.EquationSolveSorter }))) as any;
const Grade7EquationWordProblemsTheory = lazy(() => import("@/components/math/grade-7/egyenletek/szoveges-feladatok-megoldasa-egyenlettel/EquationWordProblemsTheory").then(m => ({ default: m.EquationWordProblemsTheory }))) as any;
const Grade7EquationWordProblemsQuiz = lazy(() => import("@/components/math/grade-7/egyenletek/szoveges-feladatok-megoldasa-egyenlettel/EquationWordProblemsQuiz").then(m => ({ default: m.EquationWordProblemsQuiz }))) as any;
const Grade7EquationWordProblemsMatcher = lazy(() => import("@/components/math/grade-7/egyenletek/szoveges-feladatok-megoldasa-egyenlettel/EquationWordProblemsMatcher").then(m => ({ default: m.EquationWordProblemsMatcher }))) as any;
const Grade7EquationWordProblemsSorter = lazy(() => import("@/components/math/grade-7/egyenletek/szoveges-feladatok-megoldasa-egyenlettel/EquationWordProblemsSorter").then(m => ({ default: m.EquationWordProblemsSorter }))) as any;
const Grade7EquationSummaryTheory = lazy(() => import("@/components/math/grade-7/egyenletek/osszefoglalas/EquationSummaryTheory").then(m => ({ default: m.EquationSummaryTheory }))) as any;
const Grade7EquationSummaryQuiz = lazy(() => import("@/components/math/grade-7/egyenletek/osszefoglalas/EquationSummaryQuiz").then(m => ({ default: m.EquationSummaryQuiz }))) as any;
const Grade7EquationSummaryMatcher = lazy(() => import("@/components/math/grade-7/egyenletek/osszefoglalas/EquationSummaryMatcher").then(m => ({ default: m.EquationSummaryMatcher }))) as any;
const Grade7EquationSummarySorter = lazy(() => import("@/components/math/grade-7/egyenletek/osszefoglalas/EquationSummarySorter").then(m => ({ default: m.EquationSummarySorter }))) as any;
const Grade7TriangleCongruenceTheory = lazy(() => import("@/components/math/grade-7/geometria/egybevago-haromszogek-szerkesztesek/TriangleCongruenceTheory").then(m => ({ default: m.TriangleCongruenceTheory }))) as any;
const Grade7TriangleCongruenceQuiz = lazy(() => import("@/components/math/grade-7/geometria/egybevago-haromszogek-szerkesztesek/TriangleCongruenceQuiz").then(m => ({ default: m.TriangleCongruenceQuiz }))) as any;
const Grade7TriangleCongruenceMatcher = lazy(() => import("@/components/math/grade-7/geometria/egybevago-haromszogek-szerkesztesek/TriangleCongruenceMatcher").then(m => ({ default: m.TriangleCongruenceMatcher }))) as any;
const Grade7TriangleCongruenceSorter = lazy(() => import("@/components/math/grade-7/geometria/egybevago-haromszogek-szerkesztesek/TriangleCongruenceSorter").then(m => ({ default: m.TriangleCongruenceSorter }))) as any;
const Grade7TriangleSidesAnglesTheory = lazy(() => import("@/components/math/grade-7/geometria/osszefuggesek-a-haromszog-oldalai-es-szogei-kozott/TriangleSidesAnglesTheory").then(m => ({ default: m.TriangleSidesAnglesTheory }))) as any;
const Grade7TriangleSidesAnglesQuiz = lazy(() => import("@/components/math/grade-7/geometria/osszefuggesek-a-haromszog-oldalai-es-szogei-kozott/TriangleSidesAnglesQuiz").then(m => ({ default: m.TriangleSidesAnglesQuiz }))) as any;
const Grade7TriangleSidesAnglesMatcher = lazy(() => import("@/components/math/grade-7/geometria/osszefuggesek-a-haromszog-oldalai-es-szogei-kozott/TriangleSidesAnglesMatcher").then(m => ({ default: m.TriangleSidesAnglesMatcher }))) as any;
const Grade7TriangleSidesAnglesSorter = lazy(() => import("@/components/math/grade-7/geometria/osszefuggesek-a-haromszog-oldalai-es-szogei-kozott/TriangleSidesAnglesSorter").then(m => ({ default: m.TriangleSidesAnglesSorter }))) as any;
const Grade7PolygonAnglesDiagonalsTheory = lazy(() => import("@/components/math/grade-7/geometria/sokszogek-szogei-es-atloi/PolygonAnglesDiagonalsTheory").then(m => ({ default: m.PolygonAnglesDiagonalsTheory }))) as any;
const Grade7PolygonAnglesDiagonalsQuiz = lazy(() => import("@/components/math/grade-7/geometria/sokszogek-szogei-es-atloi/PolygonAnglesDiagonalsQuiz").then(m => ({ default: m.PolygonAnglesDiagonalsQuiz }))) as any;
const Grade7PolygonAnglesDiagonalsMatcher = lazy(() => import("@/components/math/grade-7/geometria/sokszogek-szogei-es-atloi/PolygonAnglesDiagonalsMatcher").then(m => ({ default: m.PolygonAnglesDiagonalsMatcher }))) as any;
const Grade7PolygonAnglesDiagonalsSorter = lazy(() => import("@/components/math/grade-7/geometria/sokszogek-szogei-es-atloi/PolygonAnglesDiagonalsSorter").then(m => ({ default: m.PolygonAnglesDiagonalsSorter }))) as any;
const Grade7AreaVolumeUnitsTheory = lazy(() => import("@/components/math/grade-7/geometria/a-terulet-es-a-terfogat-mertekegysegei/AreaVolumeUnitsTheory").then(m => ({ default: m.AreaVolumeUnitsTheory }))) as any;
const Grade7AreaVolumeUnitsQuiz = lazy(() => import("@/components/math/grade-7/geometria/a-terulet-es-a-terfogat-mertekegysegei/AreaVolumeUnitsQuiz").then(m => ({ default: m.AreaVolumeUnitsQuiz }))) as any;
const Grade7AreaVolumeUnitsMatcher = lazy(() => import("@/components/math/grade-7/geometria/a-terulet-es-a-terfogat-mertekegysegei/AreaVolumeUnitsMatcher").then(m => ({ default: m.AreaVolumeUnitsMatcher }))) as any;
const Grade7AreaVolumeUnitsSorter = lazy(() => import("@/components/math/grade-7/geometria/a-terulet-es-a-terfogat-mertekegysegei/AreaVolumeUnitsSorter").then(m => ({ default: m.AreaVolumeUnitsSorter }))) as any;
const Grade7ParallelogramAreaTheory = lazy(() => import("@/components/math/grade-7/geometria/a-paralelogramma-terulete/ParallelogramAreaTheory").then(m => ({ default: m.ParallelogramAreaTheory }))) as any;
const Grade7ParallelogramAreaQuiz = lazy(() => import("@/components/math/grade-7/geometria/a-paralelogramma-terulete/ParallelogramAreaQuiz").then(m => ({ default: m.ParallelogramAreaQuiz }))) as any;
const Grade7ParallelogramAreaMatcher = lazy(() => import("@/components/math/grade-7/geometria/a-paralelogramma-terulete/ParallelogramAreaMatcher").then(m => ({ default: m.ParallelogramAreaMatcher }))) as any;
const Grade7ParallelogramAreaSorter = lazy(() => import("@/components/math/grade-7/geometria/a-paralelogramma-terulete/ParallelogramAreaSorter").then(m => ({ default: m.ParallelogramAreaSorter }))) as any;
const Grade7TriangleAreaTheory = lazy(() => import("@/components/math/grade-7/geometria/a-haromszog-terulete/TriangleAreaTheory").then(m => ({ default: m.TriangleAreaTheory }))) as any;
const Grade7TriangleAreaQuiz = lazy(() => import("@/components/math/grade-7/geometria/a-haromszog-terulete/TriangleAreaQuiz").then(m => ({ default: m.TriangleAreaQuiz }))) as any;
const Grade7TriangleAreaMatcher = lazy(() => import("@/components/math/grade-7/geometria/a-haromszog-terulete/TriangleAreaMatcher").then(m => ({ default: m.TriangleAreaMatcher }))) as any;
const Grade7TriangleAreaSorter = lazy(() => import("@/components/math/grade-7/geometria/a-haromszog-terulete/TriangleAreaSorter").then(m => ({ default: m.TriangleAreaSorter }))) as any;
const Grade7TrapezoidAreaTheory = lazy(() => import("@/components/math/grade-7/geometria/a-trapez-terulete/TrapezoidAreaTheory").then(m => ({ default: m.TrapezoidAreaTheory }))) as any;
const Grade7TrapezoidAreaQuiz = lazy(() => import("@/components/math/grade-7/geometria/a-trapez-terulete/TrapezoidAreaQuiz").then(m => ({ default: m.TrapezoidAreaQuiz }))) as any;
const Grade7TrapezoidAreaMatcher = lazy(() => import("@/components/math/grade-7/geometria/a-trapez-terulete/TrapezoidAreaMatcher").then(m => ({ default: m.TrapezoidAreaMatcher }))) as any;
const Grade7TrapezoidAreaSorter = lazy(() => import("@/components/math/grade-7/geometria/a-trapez-terulete/TrapezoidAreaSorter").then(m => ({ default: m.TrapezoidAreaSorter }))) as any;
const Grade7DeltoidAreaTheory = lazy(() => import("@/components/math/grade-7/geometria/a-deltoid-terulete/DeltoidAreaTheory").then(m => ({ default: m.DeltoidAreaTheory }))) as any;
const Grade7DeltoidAreaQuiz = lazy(() => import("@/components/math/grade-7/geometria/a-deltoid-terulete/DeltoidAreaQuiz").then(m => ({ default: m.DeltoidAreaQuiz }))) as any;
const Grade7DeltoidAreaMatcher = lazy(() => import("@/components/math/grade-7/geometria/a-deltoid-terulete/DeltoidAreaMatcher").then(m => ({ default: m.DeltoidAreaMatcher }))) as any;
const Grade7DeltoidAreaSorter = lazy(() => import("@/components/math/grade-7/geometria/a-deltoid-terulete/DeltoidAreaSorter").then(m => ({ default: m.DeltoidAreaSorter }))) as any;
const Grade7PrismSurfaceVolumeTheory = lazy(() => import("@/components/math/grade-7/geometria/a-hasab-felszine-es-terfogata/PrismSurfaceVolumeTheory").then(m => ({ default: m.PrismSurfaceVolumeTheory }))) as any;
const Grade7PrismSurfaceVolumeQuiz = lazy(() => import("@/components/math/grade-7/geometria/a-hasab-felszine-es-terfogata/PrismSurfaceVolumeQuiz").then(m => ({ default: m.PrismSurfaceVolumeQuiz }))) as any;
const Grade7PrismSurfaceVolumeMatcher = lazy(() => import("@/components/math/grade-7/geometria/a-hasab-felszine-es-terfogata/PrismSurfaceVolumeMatcher").then(m => ({ default: m.PrismSurfaceVolumeMatcher }))) as any;
const Grade7PrismSurfaceVolumeSorter = lazy(() => import("@/components/math/grade-7/geometria/a-hasab-felszine-es-terfogata/PrismSurfaceVolumeSorter").then(m => ({ default: m.PrismSurfaceVolumeSorter }))) as any;
const Grade7SolidsInSpaceAndPlaneTheory = lazy(() => import("@/components/math/grade-7/geometria/testek-terben-es-sikban/SolidsInSpaceAndPlaneTheory").then(m => ({ default: m.SolidsInSpaceAndPlaneTheory }))) as any;
const Grade7SolidsInSpaceAndPlaneQuiz = lazy(() => import("@/components/math/grade-7/geometria/testek-terben-es-sikban/SolidsInSpaceAndPlaneQuiz").then(m => ({ default: m.SolidsInSpaceAndPlaneQuiz }))) as any;
const Grade7SolidsInSpaceAndPlaneMatcher = lazy(() => import("@/components/math/grade-7/geometria/testek-terben-es-sikban/SolidsInSpaceAndPlaneMatcher").then(m => ({ default: m.SolidsInSpaceAndPlaneMatcher }))) as any;
const Grade7SolidsInSpaceAndPlaneSorter = lazy(() => import("@/components/math/grade-7/geometria/testek-terben-es-sikban/SolidsInSpaceAndPlaneSorter").then(m => ({ default: m.SolidsInSpaceAndPlaneSorter }))) as any;
const Grade7GeomEscapeRoomTheory = lazy(() => import("@/components/math/grade-7/geometria/szabaduloszoba/GeometryEscapeRoomTheory").then(m => ({ default: m.GeometryEscapeRoomTheory }))) as any;
const Grade7GeomEscapeRoomQuiz = lazy(() => import("@/components/math/grade-7/geometria/szabaduloszoba/GeometryEscapeRoomQuiz").then(m => ({ default: m.GeometryEscapeRoomQuiz }))) as any;
const Grade7GeomEscapeRoomMatcher = lazy(() => import("@/components/math/grade-7/geometria/szabaduloszoba/GeometryEscapeRoomMatcher").then(m => ({ default: m.GeometryEscapeRoomMatcher }))) as any;
const Grade7GeomEscapeRoomSorter = lazy(() => import("@/components/math/grade-7/geometria/szabaduloszoba/GeometryEscapeRoomSorter").then(m => ({ default: m.GeometryEscapeRoomSorter }))) as any;
const Grade7GeomSummaryTheory = lazy(() => import("@/components/math/grade-7/geometria/osszefoglalas/GeometrySummaryTheory").then(m => ({ default: m.GeometrySummaryTheory }))) as any;
const Grade7GeomSummaryQuiz = lazy(() => import("@/components/math/grade-7/geometria/osszefoglalas/GeometrySummaryQuiz").then(m => ({ default: m.GeometrySummaryQuiz }))) as any;
const Grade7GeomSummaryMatcher = lazy(() => import("@/components/math/grade-7/geometria/osszefoglalas/GeometrySummaryMatcher").then(m => ({ default: m.GeometrySummaryMatcher }))) as any;
const Grade7GeomSummarySorter = lazy(() => import("@/components/math/grade-7/geometria/osszefoglalas/GeometrySummarySorter").then(m => ({ default: m.GeometrySummarySorter }))) as any;
const Grade7StatsRelationsTheory = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/ket-halmaz-kozotti-hozzarendelesek/SetRelationsTheory").then(m => ({ default: m.SetRelationsTheory }))) as any;
const Grade7StatsRelationsQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/ket-halmaz-kozotti-hozzarendelesek/SetRelationsQuiz").then(m => ({ default: m.SetRelationsQuiz }))) as any;
const Grade7StatsRelationsMatcher = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/ket-halmaz-kozotti-hozzarendelesek/SetRelationsMatcher").then(m => ({ default: m.SetRelationsMatcher }))) as any;
const Grade7StatsRelationsSorter = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/ket-halmaz-kozotti-hozzarendelesek/SetRelationsSorter").then(m => ({ default: m.SetRelationsSorter }))) as any;
const Grade7StatsRepTheory = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/a-hozzarendelesek-megadasi-modjai/MappingRepresentationsTheory").then(m => ({ default: m.MappingRepresentationsTheory }))) as any;
const Grade7StatsRepQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/a-hozzarendelesek-megadasi-modjai/MappingRepresentationsQuiz").then(m => ({ default: m.MappingRepresentationsQuiz }))) as any;
const Grade7StatsRepMatcher = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/a-hozzarendelesek-megadasi-modjai/MappingRepresentationsMatcher").then(m => ({ default: m.MappingRepresentationsMatcher }))) as any;
const Grade7StatsRepSorter = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/a-hozzarendelesek-megadasi-modjai/MappingRepresentationsSorter").then(m => ({ default: m.MappingRepresentationsSorter }))) as any;
const Grade7StatsGraphTheory = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/olvassunk-a-grafikonrol/GraphReadingTheory").then(m => ({ default: m.GraphReadingTheory }))) as any;
const Grade7StatsGraphQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/olvassunk-a-grafikonrol/GraphReadingQuiz").then(m => ({ default: m.GraphReadingQuiz }))) as any;
const Grade7StatsGraphMatcher = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/olvassunk-a-grafikonrol/GraphReadingMatcher").then(m => ({ default: m.GraphReadingMatcher }))) as any;
const Grade7StatsGraphSorter = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/olvassunk-a-grafikonrol/GraphReadingSorter").then(m => ({ default: m.GraphReadingSorter }))) as any;
const Grade7StatsCentralTheory = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/atlag-modusz-median/CentralTendencyTheory").then(m => ({ default: m.CentralTendencyTheory }))) as any;
const Grade7StatsCentralQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/atlag-modusz-median/CentralTendencyQuiz").then(m => ({ default: m.CentralTendencyQuiz }))) as any;
const Grade7StatsCentralMatcher = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/atlag-modusz-median/CentralTendencyMatcher").then(m => ({ default: m.CentralTendencyMatcher }))) as any;
const Grade7StatsCentralSorter = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/atlag-modusz-median/CentralTendencySorter").then(m => ({ default: m.CentralTendencySorter }))) as any;
const Grade7StatsFreqTheory = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/gyakorisag-relativ-gyakorisag/FrequencyAnalysisTheory").then(m => ({ default: m.FrequencyAnalysisTheory }))) as any;
const Grade7StatsFreqQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/gyakorisag-relativ-gyakorisag/FrequencyAnalysisQuiz").then(m => ({ default: m.FrequencyAnalysisQuiz }))) as any;
const Grade7StatsFreqMatcher = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/gyakorisag-relativ-gyakorisag/FrequencyAnalysisMatcher").then(m => ({ default: m.FrequencyAnalysisMatcher }))) as any;
const Grade7StatsFreqSorter = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/gyakorisag-relativ-gyakorisag/FrequencyAnalysisSorter").then(m => ({ default: m.FrequencyAnalysisSorter }))) as any;
const Grade7StatsProbTheory = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/valoszinuseg/ProbabilityTheory").then(m => ({ default: m.ProbabilityTheory }))) as any;
const Grade7StatsProbQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/valoszinuseg/ProbabilityQuiz").then(m => ({ default: m.ProbabilityQuiz }))) as any;
const Grade7StatsProbMatcher = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/valoszinuseg/ProbabilityMatcher").then(m => ({ default: m.ProbabilityMatcher }))) as any;
const Grade7StatsProbSorter = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/valoszinuseg/ProbabilitySorter").then(m => ({ default: m.ProbabilitySorter }))) as any;
const Grade7StatsExpTheory = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/tippelj-kiserletezz-ellenorizz/ExperimentSimulationTheory").then(m => ({ default: m.ExperimentSimulationTheory }))) as any;
const Grade7StatsExpQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/tippelj-kiserletezz-ellenorizz/ExperimentSimulationQuiz").then(m => ({ default: m.ExperimentSimulationQuiz }))) as any;
const Grade7StatsExpMatcher = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/tippelj-kiserletezz-ellenorizz/ExperimentSimulationMatcher").then(m => ({ default: m.ExperimentSimulationMatcher }))) as any;
const Grade7StatsExpSorter = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/tippelj-kiserletezz-ellenorizz/ExperimentSimulationSorter").then(m => ({ default: m.ExperimentSimulationSorter }))) as any;
const Grade7StatsSummaryTheory = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/osszefoglalas/StatsSummaryTheory").then(m => ({ default: m.StatsSummaryTheory }))) as any;
const Grade7StatsSummaryQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/osszefoglalas/StatsSummaryQuiz").then(m => ({ default: m.StatsSummaryQuiz }))) as any;
const Grade7StatsSummaryMatcher = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/osszefoglalas/StatsSummaryMatcher").then(m => ({ default: m.StatsSummaryMatcher }))) as any;
const Grade7StatsSummarySorter = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/osszefoglalas/StatsSummarySorter").then(m => ({ default: m.StatsSummarySorter }))) as any;
const Grade8LogicTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/logika-feladatok/LogicTheory").then(m => ({ default: m.LogicTheory }))) as any;
const Grade8LogicQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/logika-feladatok/LogicQuiz").then(m => ({ default: m.LogicQuiz }))) as any;
const Grade8SetBasicsTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/mit-tudunk-a-halmazokrol/SetBasicsTheory").then(m => ({ default: m.SetBasicsTheory }))) as any;
const Grade8SetBasicsQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/mit-tudunk-a-halmazokrol/SetBasicsQuiz").then(m => ({ default: m.SetBasicsQuiz }))) as any;
const Grade8SetBasicsMatcher = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/mit-tudunk-a-halmazokrol/SetBasicsMatcher").then(m => ({ default: m.SetBasicsMatcher }))) as any;
const Grade8SetBasicsSorter = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/mit-tudunk-a-halmazokrol/SetBasicsSorter").then(m => ({ default: m.SetBasicsSorter }))) as any;
const Grade8SetOperationsTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/muveletek-halmazokkal/SetOperationsTheory").then(m => ({ default: m.SetOperationsTheory }))) as any;
const Grade8SetOperationsQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/muveletek-halmazokkal/SetOperationsQuiz").then(m => ({ default: m.SetOperationsQuiz }))) as any;
const Grade8SetOperationsMatcher = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/muveletek-halmazokkal/SetOperationsMatcher").then(m => ({ default: m.SetOperationsMatcher }))) as any;
const Grade8SetOperationsSorter = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/muveletek-halmazokkal/SetOperationsSorter").then(m => ({ default: m.SetOperationsSorter }))) as any;
const Grade8RationalSetTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/a-racionalis-szamok-halmaza/RationalSetTheory").then(m => ({ default: m.RationalSetTheory }))) as any;
const Grade8RationalSetQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/a-racionalis-szamok-halmaza/RationalSetQuiz").then(m => ({ default: m.RationalSetQuiz }))) as any;
const Grade8RationalSetMatcher = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/a-racionalis-szamok-halmaza/RationalSetMatcher").then(m => ({ default: m.RationalSetMatcher }))) as any;
const Grade8RationalSetSorter = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/a-racionalis-szamok-halmaza/RationalSetSorter").then(m => ({ default: m.RationalSetSorter }))) as any;
const Grade8RationalOperationsTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/mit-tudunk-a-racionalis-szamokrol/RationalOperationsTheory").then(m => ({ default: m.RationalOperationsTheory }))) as any;
const Grade8RationalOperationsQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/mit-tudunk-a-racionalis-szamokrol/RationalOperationsQuiz").then(m => ({ default: m.RationalOperationsQuiz }))) as any;
const Grade8RationalOperationsMatcher = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/mit-tudunk-a-racionalis-szamokrol/RationalOperationsMatcher").then(m => ({ default: m.RationalOperationsMatcher }))) as any;
const Grade8RationalOperationsSorter = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/mit-tudunk-a-racionalis-szamokrol/RationalOperationsSorter").then(m => ({ default: m.RationalOperationsSorter }))) as any;
const Grade8PowersTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/hatvanyozas/PowersTheory").then(m => ({ default: m.PowersTheory }))) as any;
const Grade8PowersQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/hatvanyozas/PowersQuiz").then(m => ({ default: m.PowersQuiz }))) as any;
const Grade8PowersMatcher = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/hatvanyozas/PowersMatcher").then(m => ({ default: m.PowersMatcher }))) as any;
const Grade8PowersSorter = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/hatvanyozas/PowersSorter").then(m => ({ default: m.PowersSorter }))) as any;
const Grade8SqrtConceptTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/a-negyzetgyok-fogalma/SqrtConceptTheory").then(m => ({ default: m.SqrtConceptTheory }))) as any;
const Grade8SqrtConceptQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/a-negyzetgyok-fogalma/SqrtConceptQuiz").then(m => ({ default: m.SqrtConceptQuiz }))) as any;
const Grade8SqrtConceptMatcher = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/a-negyzetgyok-fogalma/SqrtConceptMatcher").then(m => ({ default: m.SqrtConceptMatcher }))) as any;
const Grade8SqrtConceptSorter = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/a-negyzetgyok-fogalma/SqrtConceptSorter").then(m => ({ default: m.SqrtConceptSorter }))) as any;
const Grade8SquareRootsTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/szamok-negyzetgyoke/SquareRootsTheory").then(m => ({ default: m.SquareRootsTheory }))) as any;
const Grade8SquareRootsQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/szamok-negyzetgyoke/SquareRootsQuiz").then(m => ({ default: m.SquareRootsQuiz }))) as any;
const Grade8SquareRootsMatcher = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/szamok-negyzetgyoke/SquareRootsMatcher").then(m => ({ default: m.SquareRootsMatcher }))) as any;
const Grade8SquareRootsSorter = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/szamok-negyzetgyoke/SquareRootsSorter").then(m => ({ default: m.SquareRootsSorter }))) as any;
const Grade8AlgebraIntroTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/betus-kifejezesek-ismetles/AlgebraIntroTheory").then(m => ({ default: m.AlgebraIntroTheory }))) as any;
const Grade8AlgebraIntroQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/betus-kifejezesek-ismetles/AlgebraIntroQuiz").then(m => ({ default: m.AlgebraIntroQuiz }))) as any;
const Grade8AlgebraIntroMatcher = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/betus-kifejezesek-ismetles/AlgebraIntroMatcher").then(m => ({ default: m.AlgebraIntroMatcher }))) as any;
const Grade8AlgebraIntroSorter = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/betus-kifejezesek-ismetles/AlgebraIntroSorter").then(m => ({ default: m.AlgebraIntroSorter }))) as any;
const Grade8FactoringTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/betus-kifejezesek-szorzasa-es-kiemeles/FactoringTheory").then(m => ({ default: m.FactoringTheory }))) as any;
const Grade8FactoringQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/betus-kifejezesek-szorzasa-es-kiemeles/FactoringQuiz").then(m => ({ default: m.FactoringQuiz }))) as any;
const Grade8FactoringMatcher = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/betus-kifejezesek-szorzasa-es-kiemeles/FactoringMatcher").then(m => ({ default: m.FactoringMatcher }))) as any;
const Grade8FactoringSorter = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/betus-kifejezesek-szorzasa-es-kiemeles/FactoringSorter").then(m => ({ default: m.FactoringSorter }))) as any;
const Grade8PolynomialMultTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/tobbtagu-kifejezesek-szorzata/PolynomialMultTheory").then(m => ({ default: m.PolynomialMultTheory }))) as any;
const Grade8PolynomialMultQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/tobbtagu-kifejezesek-szorzata/PolynomialMultQuiz").then(m => ({ default: m.PolynomialMultQuiz }))) as any;
const Grade8PolynomialMultMatcher = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/tobbtagu-kifejezesek-szorzata/PolynomialMultMatcher").then(m => ({ default: m.PolynomialMultMatcher }))) as any;
const Grade8PolynomialMultSorter = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/tobbtagu-kifejezesek-szorzata/PolynomialMultSorter").then(m => ({ default: m.PolynomialMultSorter }))) as any;
const Grade8ChapterSummaryTheory = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/osszefoglalas/ChapterSummaryTheory").then(m => ({ default: m.ChapterSummaryTheory }))) as any;
const Grade8ChapterSummaryQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/osszefoglalas/ChapterSummaryQuiz").then(m => ({ default: m.ChapterSummaryQuiz }))) as any;
const Grade8ChapterSummaryMatcher = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/osszefoglalas/ChapterSummaryMatcher").then(m => ({ default: m.ChapterSummaryMatcher }))) as any;
const Grade8ChapterSummarySorter = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/osszefoglalas/ChapterSummarySorter").then(m => ({ default: m.ChapterSummarySorter }))) as any;

import { QuizResult, GradeLevel } from '@/types/education';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Plus,
  Calculator,
  Wrench,
  Shapes,
  Scale,
  Triangle,
  Square,
  Settings2,
  Variable,
  Percent,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Home,
  Sparkles,
  Target,
  Box,
  MoveHorizontal,
  Circle,
  BookOpen,
  Binary,
  Gamepad2,
  Zap,
  Search,
  X,
  Pencil,
  Heart,
  Grid3X3,
  Columns,
  Table,
  Coins,
  Layout,
  LayoutGrid,
  Repeat,
  Brain,
  Puzzle,
  Trophy,
  Flag,
  ArrowRightLeft,
  GraduationCap,
  Video,
  PieChart,
  CheckCircle2,
  Layers,
  Scissors,
  Award,
  Boxes,
  RefreshCw,
  GitCompare,
  MonitorPlay,
  Maximize2,
  Compass,
  FlaskConical,
  Timer,
  Users,
  Ruler,
  TrendingUp,
  LineChart,
  Eye,
  BarChart3,
  Globe,
  Network,
  Lightbulb,
  Dices,
  Pizza,
  Thermometer,
  Blocks
} from 'lucide-react';
import { cn } from '@/lib/utils';

type ViewState = 'main-select' | 'topic-select' | 'tools-select' | 'games-select' | 'competency-select' | 'activity' | 'geometry-select' | 'search-results';
type ActivityType =
  | 'fraction-quiz' | 'decimal-quiz' | 'fraction-table' | 'percent-table'
  | 'decimal-cards' | 'decimal-operations' | 'number-line' | 'fraction-comparison'
  | 'coordinate-geometry' | 'coordinate-polygon' | 'angle-measurement'
  | 'coordinate-transform' | 'fraction-tool' | 'construction'
  | 'fraction-addition-tool' | 'fraction-subtraction-tool' | 'fraction-multiplication-tool'
  | 'fraction-division-tool' | 'decimal-visualizer-tool' | 'decimal-addition-subtraction-tool'
  | 'decimal-multiplication-tool' | 'decimal-division-tool' | 'percentage-calculator-tool'
  | 'prime-factorization-tool' | 'gcd-lcm-tool' | 'number-set-visualizer-tool'
  | 'coordinate-game' | 'equation-solver-tool' | 'pythagorean-tool'
  | 'pythagorean-practice' | 'surface-area-volume-tool' | 'algebraic-expressions-tool'
  | 'probability-tool' | 'set-operations-tool' | 'function-plotter-tool'
  | 'combinatorics-tool' | 'statistics-tool' | 'geometric-shapes-tool'
  | 'congruence-transformations-tool' | 'similarity-transformations-tool'
  | 'coordinate-plane-tool' | 'powers-roots-tool' | 'percentage-calculation-tool'
  | 'proportion-tool' | 'interest-calculator-tool'
  | 'direct-proportionality-game' | 'inverse-proportionality-game' | 'graph-reading-tool'
  | 'table-of-values-tool' | 'relative-frequency-tool' | 'mean-mode-median-tool'
  | 'probability-simulation-tool' | 'geometric-probability-tool' | 'arithmetic-sequence-tool'
  | 'geometric-sequence-tool' | 'fibonacci-sequence-tool'
  | 'grade3-addition-quiz' | 'grade3-subtraction-quiz' | 'grade3-multiplication-quiz' | 'grade3-division-quiz'
  | 'grade3-fractions-quiz' | 'grade3-geometry-quiz' | 'grade3-measurement-quiz' | 'grade3-word-problems-quiz'
  | 'grade3-blocks' | 'grade3-snake' | 'grade3-alapmuveletek' | 'grade3-tower-builder'
  | 'grade3-money-quiz' | 'triangle-angles-quiz' | 'decimal-fractions-tool' | 'number-line-tool'
  | 'manipulative-division' | 'manipulative-addition' | 'construction-tool' | 'money-calculation'
  | 'decimal-shifter-tool' | 'puzzle-maker' | 'geometry-module'
  | 'logic-blocks' | 'venn-diagram-game' | 'grouping-game' | 'number-grouping-game'
  | 'sudoku' | 'sudoku-generator' | 'venn-interpretation-quiz'
  | 'venn-reading-objects' | 'venn-reading-numbers' | 'axial-symmetry' | 'symmetry-error' | 'symmetry-construction' | 'axial-symmetry-quiz' | 'axial-symmetry-presentation'
  | 'percent-value-word-problems' | 'percent-rate-word-problems' | 'percent-base-word-problems' | 'student-feedback' | 'word-search' | 'memory-game' | 'equation-balance-quiz'
  | 'ratio-intro' | 'ratio-creator' | 'g7-word-problems' | 'direct-proportion-quiz' | 'matrix-sorting-game'
  | 'g6-ratio-intro-theory' | 'g6-ratio-intro-quiz' | 'g6-ratio-intro-matcher' | 'g6-ratio-intro-sorter'
  | 'g6-ratio-division-theory' | 'g6-ratio-division-quiz' | 'g6-ratio-division-matcher' | 'g6-ratio-division-sorter'
  | 'g6-direct-prop-theory' | 'g6-direct-prop-quiz' | 'g6-direct-prop-matcher' | 'g6-direct-prop-sorter'
  | 'g6-direct-prop-graph-theory' | 'g6-direct-prop-graph-quiz' | 'g6-direct-prop-graph-matcher' | 'g6-direct-prop-graph-sorter'
  | 'g6-rules-relations-theory' | 'g6-rules-relations-quiz' | 'g6-rules-relations-matcher' | 'g6-rules-relations-sorter'
  | 'g6-fraction-part-theory' | 'g6-fraction-part-quiz' | 'g6-fraction-part-matcher' | 'g6-fraction-part-sorter'
  | 'g6-percentage-theory' | 'g6-percentage-quiz' | 'g6-percentage-matcher' | 'g6-percentage-sorter'
  | 'g6-percent-practice-theory' | 'g6-percent-practice-quiz' | 'g6-percent-practice-matcher' | 'g6-percent-practice-sorter'
  | 'g6-open-sentences-theory' | 'g6-open-sentences-quiz' | 'g6-open-sentences-matcher' | 'g6-open-sentences-sorter'
  | 'g6-word-problems-theory' | 'g6-word-problems-quiz' | 'g6-word-problems-matcher' | 'g6-word-problems-sorter' | 'g6-word-problems-module'
  | 'g6-multiple-solutions-theory' | 'g6-multiple-solutions-quiz' | 'g6-multiple-solutions-matcher' | 'g6-multiple-solutions-sorter'
  | 'g6-ratio-summary-theory' | 'g6-ratio-summary-quiz' | 'g6-ratio-summary-matcher' | 'g6-ratio-summary-sorter'
  | 'g6-length-mass-time-theory' | 'g6-length-mass-time-quiz' | 'g6-length-mass-time-matcher' | 'g6-length-mass-time-sorter'
  | 'toto-maker' | 'chess-game' | 'torpedo-game' | 'matching-creator' | 'unit-converter' | 'capacity-converter' | 'analog-clock'
  | 'g8-algebra' | 'g8-equation-balance'
  | 'g8-logic' | 'g8-set-basics' | 'g8-set-operations' | 'g8-rational-set' | 'g8-rational-operations' | 'g8-powers' | 'g8-sqrt-concept' | 'g8-square-roots' | 'g8-algebra-intro' | 'g8-factoring' | 'g8-polynomial-mult' | 'g8-chapter1-summary'
  | 'g8-geom-congruence' | 'g8-geom-transforms' | 'g8-geom-software' | 'g8-geom-similarity' | 'g8-geom-central-similarity' | 'g8-geom-central-similarity-theory' | 'g8-geom-central-similarity-quiz' | 'g8-geom-central-similarity-matcher' | 'g8-geom-central-similarity-sorter' | 'g8-geom-constructions' | 'g8-geom-constructions-theory' | 'g8-geom-constructions-quiz' | 'g8-geom-constructions-matcher' | 'g8-geom-constructions-sorter' | 'g8-geom-summary' | 'g8-geom-summary-theory' | 'g8-geom-summary-quiz' | 'g8-geom-summary-matcher' | 'g8-geom-summary-sorter'
  | 'g8-eq-basic' | 'g8-eq-basic-theory' | 'g8-eq-basic-quiz' | 'g8-eq-basic-matcher' | 'g8-eq-basic-sorter' | 'g8-eq-numbers-ages' | 'g8-eq-numbers-ages-theory' | 'g8-eq-numbers-ages-quiz' | 'g8-eq-numbers-ages-matcher' | 'g8-eq-numbers-ages-sorter' | 'g8-eq-mixing' | 'g8-eq-mixing-theory' | 'g8-eq-mixing-quiz' | 'g8-eq-mixing-matcher' | 'g8-eq-mixing-sorter' | 'g8-eq-motion-work' | 'g8-eq-motion-work-theory' | 'g8-eq-motion-work-quiz' | 'g8-eq-motion-work-matcher' | 'g8-eq-motion-work-sorter' | 'g8-eq-geometry' | 'g8-eq-geometry-theory' | 'g8-eq-geometry-quiz' | 'g8-eq-geometry-matcher' | 'g8-eq-geometry-sorter' | 'g8-eq-mixed' | 'g8-eq-mixed-theory' | 'g8-eq-mixed-quiz' | 'g8-eq-mixed-matcher' | 'g8-eq-mixed-sorter' | 'g8-eq-financial' | 'g8-eq-financial-theory' | 'g8-eq-financial-quiz' | 'g8-eq-financial-matcher' | 'g8-eq-financial-sorter' | 'g8-eq-summary' | 'g8-eq-summary-theory' | 'g8-eq-summary-quiz' | 'g8-eq-summary-matcher' | 'g8-eq-summary-sorter'
  | 'g8-pyth-constructions' | 'g8-pyth-constructions-theory' | 'g8-pyth-theorem' | 'g8-pyth-theorem-theory' | 'g8-pyth-converse' | 'g8-pyth-converse-theory' | 'g8-pyth-applications' | 'g8-pyth-applications-theory' | 'g8-pyth-calculator' | 'g8-pyth-calculator-theory' | 'g8-pyth-special-triangles' | 'g8-pyth-special-triangles-theory' | 'g8-pyth-summary' | 'g8-pyth-summary-theory'
  | 'g8-func-direct' | 'g8-func-direct-theory' | 'g8-func-direct-matcher' | 'g8-func-direct-sorter' | 'g8-func-graphs' | 'g8-func-graphs-theory' | 'g8-func-graphs-matcher' | 'g8-func-graphs-sorter' | 'g8-func-inverse' | 'g8-func-inverse-theory' | 'g8-func-inverse-matcher' | 'g8-func-inverse-sorter' | 'g8-func-reading' | 'g8-func-reading-theory' | 'g8-func-reading-matcher' | 'g8-func-reading-sorter' | 'g8-func-plotting' | 'g8-func-plotting-theory' | 'g8-func-plotting-matcher' | 'g8-func-plotting-sorter' | 'g8-func-frequency' | 'g8-func-frequency-theory' | 'g8-func-frequency-matcher' | 'g8-func-frequency-sorter' | 'g8-func-game' | 'g8-func-game-theory' | 'g8-func-game-matcher' | 'g8-func-game-sorter' | 'g8-func-prob-basics' | 'g8-func-prob-basics-theory' | 'g8-func-prob-basics-matcher' | 'g8-func-prob-basics-sorter' | 'g8-func-prob-problems' | 'g8-func-prob-problems-theory' | 'g8-func-prob-problems-matcher' | 'g8-func-prob-problems-sorter' | 'g8-func-patterns' | 'g8-func-patterns-theory' | 'g8-func-patterns-matcher' | 'g8-func-patterns-sorter' | 'g8-func-sequences' | 'g8-func-sequences-theory' | 'g8-func-sequences-matcher' | 'g8-func-sequences-sorter' | 'g8-func-summary' | 'g8-func-summary-theory' | 'g8-func-summary-matcher' | 'g8-func-summary-sorter'
  | 'g8-solids-review' | 'g8-solids-review-theory' | 'g8-solids-review-matcher' | 'g8-solids-review-sorter' | 'g8-solids-pyramids' | 'g8-solids-pyramids-theory' | 'g8-solids-pyramids-matcher' | 'g8-solids-pyramids-sorter' | 'g8-solids-pyramids-intro' | 'g8-solids-pyramids-calc' | 'g8-solids-pyramids-calc-theory' | 'g8-solids-pyramids-calc-matcher' | 'g8-solids-pyramids-calc-sorter' | 'g8-solids-sphere' | 'g8-solids-sphere-theory' | 'g8-solids-sphere-matcher' | 'g8-solids-sphere-sorter' | 'g8-solids-earth' | 'g8-solids-earth-theory' | 'g8-solids-earth-matcher' | 'g8-solids-earth-sorter' | 'g8-solids-summary' | 'g8-solids-summary-theory' | 'g8-solids-summary-matcher' | 'g8-solids-summary-sorter'
  | 'angle-matching' | 'triangle-classification' | 'quadrilateral-classification'
  | 'shape-classification' | 'line-relationships' | 'reflection-quiz' | 'circle-parts'
  | 'area-conversion-quiz' | 'volume-quiz' | 'surface-area-quiz' | 'area-calculation-quiz' | 'area-calc-quiz'
  | 'parallelogram-area-quiz' | 'parallelogram-area' | 'volume-surface' | 'perimeter-area' | 'perimeter-area-tool' | 'volume-surface-tool'
  | 'divisibility-powers' | 'divisibility-theory' | 'divisibility-factorization' | 'divisibility-quiz' | 'divisibility-matcher' | 'divisibility-gcdquiz' | 'divisibility-lkktquiz'
  | 'percentages' | 'perimeter-quiz' | 'area-conversion' | 'volume-conversion' | 'triangle-area' | 'g7-geometry-summary'
  | 'g7-mapping-quiz' | 'g7-function-table-quiz'
  | 'decimal-division-matcher' | 'decimal-division-quiz' | 'decimal-multiplication-matcher' | 'decimal-multiplication-quiz'
  | 'decimal-fractions' | 'decimal-fractions-quiz' | 'decimal-shifter'
  | 'g5-chapter2-summary-theory' | 'g5-chapter2-summary-quiz' | 'g5-chapter2-summary-matcher' | 'g5-chapter2-summary-sorter' | 'g5-fraction-to-decimal-theory' | 'g5-fraction-to-decimal-quiz' | 'g5-fraction-to-decimal-matcher' | 'g5-fraction-to-decimal-sorter' | 'g5-fraction-visual-matcher' | 'g5-fractions-quiz' | 'g5-fractions-module' | 'g5-fractions-intro-theory' | 'g5-fractions-intro-quiz' | 'g5-fractions-expand-simplify-theory' | 'g5-fractions-expand-simplify-quiz' | 'g5-fractions-number-line-theory' | 'g5-fractions-number-line-quiz' | 'g5-fractions-same-denom-theory' | 'g5-fractions-same-denom-quiz' | 'g5-fractions-diff-denom-theory' | 'g5-fractions-diff-denom-quiz' | 'g5-fraction-multiply-theory' | 'g5-fraction-multiply-quiz' | 'g5-fraction-divide-theory' | 'g5-fraction-divide-quiz' | 'g5-fractions-order-of-operations-theory' | 'g5-fractions-order-of-operations-quiz' | 'g5-fractions-review-theory' | 'g5-fractions-review-quiz' | 'g5-decimal-fractions-theory' | 'g5-decimal-fractions-quiz' | 'g5-decimal-compare-rounding-theory' | 'g5-decimal-compare-rounding-quiz' | 'g5-decimal-add-sub-theory' | 'g5-decimal-add-sub-quiz' | 'g5-decimal-multiply-theory' | 'g5-decimal-multiply-quiz' | 'g5-decimal-divide-theory' | 'g5-decimal-divide-quiz' | 'g5-roman-numerals-theory' | 'g5-roman-numerals-quiz' | 'g5-place-value-theory' | 'g5-place-value-quiz' | 'g5-number-reading-theory' | 'g5-number-reading-quiz' | 'g5-number-spelling-theory' | 'g5-number-spelling-quiz' | 'g5-number-systems-theory' | 'g5-number-systems-quiz' | 'g5-number-line-theory' | 'g5-number-line-quiz' | 'g5-rounding-theory' | 'g5-rounding-quiz' | 'g5-addition-theory' | 'g5-addition-quiz' | 'g5-subtraction-theory' | 'g5-subtraction-quiz' | 'g5-multiplication-theory' | 'g5-multiplication-quiz' | 'g5-division-theory' | 'g5-division-quiz' | 'g5-order-of-operations-theory' | 'g5-order-of-operations-quiz' | 'g5-negative-numbers-theory' | 'g5-negative-numbers-quiz' | 'g5-opposite-absolute-theory' | 'g5-opposite-absolute-quiz' | 'g5-integer-addition-subtraction-theory' | 'g5-integer-addition-subtraction-quiz' | 'g5-chapter1-summary-theory' | 'g5-chapter1-summary-quiz' | 'g5-geom-grouping-theory' | 'g5-geom-grouping-quiz'
  | 'g5-geom-sets-theory' | 'g5-geom-sets-quiz'
  | 'g5-geom-bodies-theory' | 'g5-geom-bodies-quiz'
  | 'g5-geom-angles-theory' | 'g5-geom-angles-quiz'
  | 'g5-meas-length-theory' | 'g5-meas-length-quiz' | 'g5-meas-length-matcher' | 'g5-meas-length-sorter'
  | 'g5-meas-perimeter-theory' | 'g5-meas-perimeter-quiz' | 'g5-meas-perimeter-matcher' | 'g5-meas-perimeter-sorter'
  | 'g5-meas-area-theory' | 'g5-meas-area-quiz' | 'g5-meas-area-matcher' | 'g5-meas-area-sorter'
  | 'g5-meas-rectangle-area-theory' | 'g5-meas-rectangle-area-quiz' | 'g5-meas-rectangle-area-matcher' | 'g5-meas-rectangle-area-sorter'
  | 'g5-meas-cuboid-cube-theory' | 'g5-meas-cuboid-cube-quiz' | 'g5-meas-cuboid-cube-matcher' | 'g5-meas-cuboid-cube-sorter'
  | 'g5-meas-surface-area-theory' | 'g5-meas-surface-area-quiz' | 'g5-meas-surface-area-matcher' | 'g5-meas-surface-area-sorter'
  | 'g5-meas-volume-measure-theory' | 'g5-meas-volume-measure-quiz' | 'g5-meas-volume-measure-matcher' | 'g5-meas-volume-measure-sorter'
  | 'g5-meas-cuboid-cube-volume-theory' | 'g5-meas-cuboid-cube-volume-quiz' | 'g5-meas-cuboid-cube-volume-matcher' | 'g5-meas-cuboid-cube-volume-sorter'
  | 'g5-meas-practical-theory' | 'g5-meas-practical-quiz' | 'g5-meas-practical-matcher' | 'g5-meas-practical-sorter'
  | 'g5-meas-summary-theory' | 'g5-meas-summary-quiz' | 'g5-meas-summary-matcher' | 'g5-meas-summary-sorter'
  | 'g5-loc-role-theory' | 'g5-loc-role-quiz' | 'g5-loc-role-matcher' | 'g5-loc-role-sorter'
  | 'g5-loc-grid-theory' | 'g5-loc-grid-quiz' | 'g5-loc-grid-matcher' | 'g5-loc-grid-sorter'
  | 'g5-loc-coord-sys-theory' | 'g5-loc-coord-sys-quiz' | 'g5-loc-coord-sys-matcher' | 'g5-loc-coord-sys-sorter'
  | 'g5-loc-points-theory' | 'g5-loc-points-quiz' | 'g5-loc-points-matcher' | 'g5-loc-points-sorter'
  | 'g5-loc-spatial-theory' | 'g5-loc-spatial-quiz' | 'g5-loc-spatial-matcher' | 'g5-loc-spatial-sorter'
  | 'g5-loc-patterns-theory' | 'g5-loc-patterns-quiz' | 'g5-loc-patterns-matcher' | 'g5-loc-patterns-sorter'
  | 'g5-loc-relations-theory' | 'g5-loc-relations-quiz' | 'g5-loc-relations-matcher' | 'g5-loc-relations-sorter'
  | 'g5-loc-sequences-theory' | 'g5-loc-sequences-quiz' | 'g5-loc-sequences-matcher' | 'g5-loc-sequences-sorter'
  | 'g5-loc-famous-seq-theory' | 'g5-loc-famous-seq-quiz' | 'g5-loc-famous-seq-matcher' | 'g5-loc-famous-seq-sorter'
  | 'g5-loc-summary-theory' | 'g5-loc-summary-quiz' | 'g5-loc-summary-matcher' | 'g5-loc-summary-sorter'
  | 'g6-planar-shapes-theory' | 'g6-planar-shapes-quiz' | 'g6-planar-shapes-matcher' | 'g6-planar-shapes-sorter'
  | 'g6-congruence-theory' | 'g6-congruence-quiz' | 'g6-congruence-matcher' | 'g6-congruence-sorter'
  | 'g6-integers-operations-theory' | 'g6-integers-operations-quiz'
  | 'g6-integers-mult-theory' | 'g6-integers-mult-quiz'
  | 'g6-integers-div-theory' | 'g6-integers-div-quiz'
  | 'g6-integers-cases-theory' | 'g6-integers-cases-quiz'
  | 'g6-integers-divisors-theory' | 'g6-integers-divisors-quiz'
  | 'g6-integers-remainders-theory' | 'g6-integers-remainders-quiz'
  | 'g6-integers-factorization-theory' | 'g6-integers-factorization-quiz'
  | 'g6-integers-divisibility-2-5-10-theory' | 'g6-integers-divisibility-2-5-10-quiz'
  | 'g6-integers-divisibility-3-9-theory' | 'g6-integers-divisibility-3-9-quiz'
  | 'g6-integers-divisibility-4-100-theory' | 'g6-integers-divisibility-4-100-quiz'
  | 'g6-integers-composite-divisibility-theory' | 'g6-integers-composite-divisibility-quiz'
  | 'g6-integers-lcm-theory' | 'g6-integers-lcm-quiz'
  | 'g6-integers-gcd-theory' | 'g6-integers-gcd-quiz'
  | 'g6-integers-summary-theory' | 'g6-integers-summary-quiz'
  | 'g6-summary-numbers-theory' | 'g6-summary-numbers-quiz'
  | 'g6-summary-fractions-theory' | 'g6-summary-fractions-quiz'
  | 'g6-summary-proportions-theory' | 'g6-summary-proportions-quiz'
  | 'g6-summary-geometry-theory' | 'g6-summary-geometry-quiz'
  | 'g6-summary-final-theory' | 'g6-summary-final-quiz'
  | 'g7-rat-integer-properties-theory' | 'g7-rat-integer-properties-quiz' | 'g7-rat-integer-properties-matcher' | 'g7-rat-integer-properties-sorter'
  | 'g7-rat-fractions-decimals-theory' | 'g7-rat-fractions-decimals-quiz' | 'g7-rat-fractions-decimals-matcher' | 'g7-rat-fractions-decimals-sorter'
  | 'g7-rat-operations-theory' | 'g7-rat-operations-quiz' | 'g7-rat-operations-matcher' | 'g7-rat-operations-sorter'
  | 'g7-rat-word-problems-theory' | 'g7-rat-word-problems-quiz' | 'g7-rat-word-problems-matcher' | 'g7-rat-word-problems-sorter'
  | 'g7-rat-complex-operations-theory' | 'g7-rat-complex-operations-quiz' | 'g7-rat-complex-operations-matcher' | 'g7-rat-complex-operations-sorter'
  | 'g7-rat-numbers-letters-theory' | 'g7-rat-numbers-letters-quiz' | 'g7-rat-numbers-letters-matcher' | 'g7-rat-numbers-letters-sorter'
  | 'g7-rat-combining-substitution-theory' | 'g7-rat-combining-substitution-quiz' | 'g7-rat-combining-substitution-matcher' | 'g7-rat-combining-substitution-sorter'
  | 'g7-rat-expansion-factoring-theory' | 'g7-rat-expansion-factoring-quiz' | 'g7-rat-expansion-factoring-matcher' | 'g7-rat-expansion-factoring-sorter'
  | 'g7-rat-summary-theory' | 'g7-rat-summary-quiz' | 'g7-rat-summary-matcher' | 'g7-rat-summary-sorter'
  | 'g7-geom-concepts-theory' | 'g7-geom-concepts-quiz' | 'g7-geom-concepts-matcher' | 'g7-geom-concepts-sorter'
  | 'g7-geom-triangle-lines-theory' | 'g7-geom-triangle-lines-quiz' | 'g7-geom-triangle-lines-matcher' | 'g7-geom-triangle-lines-sorter'
  | 'g7-geom-triangles-quads-theory' | 'g7-geom-triangles-quads-quiz' | 'g7-geom-triangles-quads-matcher' | 'g7-geom-triangles-quads-sorter'
  | 'g7-geom-transformations-theory' | 'g7-geom-transformations-quiz' | 'g7-geom-transformations-matcher' | 'g7-geom-transformations-sorter'
  | 'g7-geom-point-reflection-theory' | 'g7-geom-point-reflection-quiz' | 'g7-geom-point-reflection-matcher' | 'g7-geom-point-reflection-sorter'
  | 'g7-geom-reflection-app-theory' | 'g7-geom-reflection-app-quiz' | 'g7-geom-reflection-app-matcher' | 'g7-geom-reflection-app-sorter'
  | 'g7-geom-angle-pairs-theory' | 'g7-geom-angle-pairs-quiz' | 'g7-geom-angle-pairs-matcher' | 'g7-geom-angle-pairs-sorter'
  | 'g7-geom-symmetry-theory' | 'g7-geom-symmetry-quiz' | 'g7-geom-symmetry-matcher' | 'g7-geom-symmetry-sorter'
  | 'g7-geom-parallelogram-theory' | 'g7-geom-parallelogram-quiz' | 'g7-geom-parallelogram-matcher' | 'g7-geom-parallelogram-sorter'
  | 'g7-geom-point-symmetric-shapes-theory' | 'g7-geom-point-symmetric-shapes-quiz' | 'g7-geom-point-symmetric-shapes-matcher' | 'g7-geom-point-symmetric-shapes-sorter'
  | 'g7-geom-regular-polygons-theory' | 'g7-geom-regular-polygons-quiz' | 'g7-geom-regular-polygons-matcher' | 'g7-geom-regular-polygons-sorter'
  | 'g7-geom-circle-theory' | 'g7-geom-circle-quiz' | 'g7-geom-circle-matcher' | 'g7-geom-circle-sorter'
  | 'g7-geom-constructions-theory' | 'g7-geom-constructions-quiz' | 'g7-geom-constructions-matcher' | 'g7-geom-constructions-sorter'
  | 'g7-geom-summary-theory' | 'g7-geom-summary-quiz' | 'g7-geom-summary-matcher' | 'g7-geom-summary-sorter'
  | 'g7-pow-large-numbers-theory' | 'g7-pow-large-numbers-quiz' | 'g7-pow-large-numbers-matcher' | 'g7-pow-large-numbers-sorter'
  | 'g7-pow-application-theory' | 'g7-pow-application-quiz' | 'g7-pow-application-matcher' | 'g7-pow-application-sorter'
  | 'g7-pow-divisibility-review-theory' | 'g7-pow-divisibility-review-quiz' | 'g7-pow-divisibility-review-matcher' | 'g7-pow-divisibility-review-sorter'
  | 'g7-pow-logic-theory' | 'g7-pow-logic-quiz' | 'g7-pow-logic-matcher' | 'g7-pow-logic-sorter'
  | 'g7-pow-prime-factors-theory' | 'g7-pow-prime-factors-quiz' | 'g7-pow-prime-factors-matcher' | 'g7-pow-prime-factors-sorter'
  | 'g7-pow-custom-rules-theory' | 'g7-pow-custom-rules-quiz' | 'g7-pow-custom-rules-matcher' | 'g7-pow-custom-rules-sorter'
  | 'g7-pow-divisors-multiples-theory' | 'g7-pow-divisors-multiples-quiz' | 'g7-pow-divisors-multiples-matcher' | 'g7-pow-divisors-multiples-sorter'
  | 'g7-pow-gcd-theory' | 'g7-pow-gcd-quiz' | 'g7-pow-gcd-matcher' | 'g7-pow-gcd-sorter'
  | 'g7-pow-lcm-theory' | 'g7-pow-lcm-quiz' | 'g7-pow-lcm-matcher' | 'g7-pow-lcm-sorter'
  | 'g7-pow-games-theory' | 'g7-pow-games-quiz' | 'g7-pow-games-matcher' | 'g7-pow-games-sorter'
  | 'g7-pow-summary-theory' | 'g7-pow-summary-quiz' | 'g7-pow-summary-matcher' | 'g7-pow-summary-sorter'
  | 'g7-pct-ratio-theory' | 'g7-pct-ratio-quiz' | 'g7-pct-ratio-matcher' | 'g7-pct-ratio-sorter'
  | 'g7-pct-review-theory' | 'g7-pct-review-quiz' | 'g7-pct-review-matcher' | 'g7-pct-review-sorter'
  | 'g7-pct-100-theory' | 'g7-pct-100-quiz' | 'g7-pct-100-matcher' | 'g7-pct-100-sorter'
  | 'g7-pct-what-theory' | 'g7-pct-what-quiz' | 'g7-pct-what-matcher' | 'g7-pct-what-sorter'
  | 'g7-pct-practice-theory' | 'g7-pct-practice-quiz' | 'g7-pct-practice-matcher' | 'g7-pct-practice-sorter'
  | 'g7-pct-complex-theory' | 'g7-pct-complex-quiz' | 'g7-pct-complex-matcher' | 'g7-pct-complex-sorter'
  | 'g7-pct-word-theory' | 'g7-pct-word-quiz' | 'g7-pct-word-matcher' | 'g7-pct-word-sorter'
  | 'g7-pct-summary-theory' | 'g7-pct-summary-quiz' | 'g7-pct-summary-matcher' | 'g7-pct-summary-sorter'
  | 'g7-pct-eq-methods-theory' | 'g7-pct-eq-methods-quiz' | 'g7-pct-eq-methods-matcher' | 'g7-pct-eq-methods-sorter'
  | 'g7-pct-balance-theory' | 'g7-pct-balance-quiz' | 'g7-pct-balance-matcher' | 'g7-pct-balance-sorter'
  | 'g7-eq-solve-theory' | 'g7-eq-solve-quiz' | 'g7-eq-solve-matcher' | 'g7-eq-solve-sorter' | 'g7-pct-eq-solve-theory' | 'g7-pct-eq-solve-quiz' | 'g7-pct-eq-solve-matcher' | 'g7-pct-eq-solve-sorter'
  | 'g7-eq-word-theory' | 'g7-eq-word-quiz' | 'g7-eq-word-matcher' | 'g7-eq-word-sorter' | 'g7-pct-eq-word-theory' | 'g7-pct-eq-word-quiz' | 'g7-pct-eq-word-matcher' | 'g7-pct-eq-word-sorter'
  | 'g7-eq-summary-theory' | 'g7-eq-summary-quiz' | 'g7-eq-summary-matcher' | 'g7-eq-summary-sorter' | 'g7-pct-eq-summary-theory' | 'g7-pct-eq-summary-quiz' | 'g7-pct-eq-summary-matcher' | 'g7-pct-eq-summary-sorter'
  | 'g7-geom-congruence-theory' | 'g7-geom-congruence-quiz' | 'g7-geom-congruence-matcher' | 'g7-geom-congruence-sorter'
  | 'g7-geom-sides-angles-theory' | 'g7-geom-sides-angles-quiz' | 'g7-geom-sides-angles-matcher' | 'g7-geom-sides-angles-sorter'
  | 'g7-geom-polygons-theory' | 'g7-geom-polygons-quiz' | 'g7-geom-polygons-matcher' | 'g7-geom-polygons-sorter'
  | 'g7-geom-units-theory' | 'g7-geom-units-quiz' | 'g7-geom-units-matcher' | 'g7-geom-units-sorter'
  | 'g7-geom-parallelogram-area-theory' | 'g7-geom-parallelogram-area-quiz' | 'g7-geom-parallelogram-area-matcher' | 'g7-geom-parallelogram-area-sorter'
  | 'g7-geom-triangle-area-theory' | 'g7-geom-triangle-area-quiz' | 'g7-geom-triangle-area-matcher' | 'g7-geom-triangle-area-sorter'
  | 'g7-geom-trapezoid-area-theory' | 'g7-geom-trapezoid-area-quiz' | 'g7-geom-trapezoid-area-matcher' | 'g7-geom-trapezoid-area-sorter'
  | 'g7-geom-deltoid-area-theory' | 'g7-geom-deltoid-area-quiz' | 'g7-geom-deltoid-area-matcher' | 'g7-geom-deltoid-area-sorter'
  | 'g7-geom-prism-surface-volume-theory' | 'g7-geom-prism-surface-volume-quiz' | 'g7-geom-prism-surface-volume-matcher' | 'g7-geom-prism-surface-volume-sorter'
  | 'g7-geom-solids-space-plane-theory' | 'g7-geom-solids-space-plane-quiz' | 'g7-geom-solids-space-plane-matcher' | 'g7-geom-solids-space-plane-sorter'
  | 'g7-geom-escape-room-theory' | 'g7-geom-escape-room-quiz' | 'g7-geom-escape-room-matcher' | 'g7-geom-escape-room-sorter'
  | 'g7-geom-summary-theory' | 'g7-geom-summary-quiz' | 'g7-geom-summary-matcher' | 'g7-geom-summary-sorter' | 'g7-geometry-summary'
  | 'g7-stats-relations-theory' | 'g7-stats-relations-quiz' | 'g7-stats-relations-matcher' | 'g7-stats-relations-sorter'
  | 'g7-stats-rep-theory' | 'g7-stats-rep-quiz' | 'g7-stats-rep-matcher' | 'g7-stats-rep-sorter'
  | 'g7-stats-graph-theory' | 'g7-stats-graph-quiz' | 'g7-stats-graph-matcher' | 'g7-stats-graph-sorter'
  | 'g7-stats-central-theory' | 'g7-stats-central-quiz' | 'g7-stats-central-matcher' | 'g7-stats-central-sorter'
  | 'g7-stats-freq-theory' | 'g7-stats-freq-quiz' | 'g7-stats-freq-matcher' | 'g7-stats-freq-sorter'
  | 'g7-stats-prob-theory' | 'g7-stats-prob-quiz' | 'g7-stats-prob-matcher' | 'g7-stats-prob-sorter'
  | 'g7-stats-exp-theory' | 'g7-stats-exp-quiz' | 'g7-stats-exp-matcher' | 'g7-stats-exp-sorter'
  | 'g7-stats-summary-theory' | 'g7-stats-summary-quiz' | 'g7-stats-summary-matcher' | 'g7-stats-summary-sorter'
  | 'g8-logic-theory' | 'g8-logic-quiz'
  | 'g8-set-basics-theory' | 'g8-set-basics-quiz' | 'g8-set-basics-matcher' | 'g8-set-basics-sorter'
  | 'g8-set-operations-theory' | 'g8-set-operations-quiz' | 'g8-set-operations-matcher' | 'g8-set-operations-sorter'
  | 'g8-rational-set-theory' | 'g8-rational-set-quiz' | 'g8-rational-set-matcher' | 'g8-rational-set-sorter'
  | 'g8-rational-operations-theory' | 'g8-rational-operations-quiz' | 'g8-rational-operations-matcher' | 'g8-rational-operations-sorter'
  | 'g8-powers-theory' | 'g8-powers-quiz' | 'g8-powers-matcher' | 'g8-powers-sorter'
  | 'g8-sqrt-concept-theory' | 'g8-sqrt-concept-quiz' | 'g8-sqrt-concept-matcher' | 'g8-sqrt-concept-sorter'
  | 'g8-square-roots-theory' | 'g8-square-roots-quiz' | 'g8-square-roots-matcher' | 'g8-square-roots-sorter'
  | 'g8-algebra-intro-theory' | 'g8-algebra-intro-quiz' | 'g8-algebra-intro-matcher' | 'g8-algebra-intro-sorter'
  | 'g8-factoring-theory' | 'g8-factoring-quiz' | 'g8-factoring-matcher' | 'g8-factoring-sorter'
  | 'g8-polynomial-mult-theory' | 'g8-polynomial-mult-quiz' | 'g8-polynomial-mult-matcher' | 'g8-polynomial-mult-sorter'
  | 'g8-chapter1-summary-theory' | 'g8-chapter1-summary-quiz' | 'g8-chapter1-summary-matcher' | 'g8-chapter1-summary-sorter'
  | 'g8-geom-congruence-theory' | 'g8-geom-congruence-quiz' | 'g8-geom-congruence-matcher' | 'g8-geom-congruence-sorter'
  | 'g8-geom-transforms-theory' | 'g8-geom-transforms-quiz' | 'g8-geom-transforms-matcher' | 'g8-geom-transforms-sorter'
  | 'g8-geom-software-theory' | 'g8-geom-software-quiz' | 'g8-geom-software-matcher' | 'g8-geom-software-sorter'
  | 'g8-geom-similarity-theory' | 'g8-geom-similarity-quiz' | 'g8-geom-similarity-matcher' | 'g8-geom-similarity-sorter'
  | 'g6-fraction-visual-matcher' | 'g6-fractions-quiz' | 'g6-fraction-multiplier' | 'g6-fraction-divider'
  | 'g6-decimal-quiz' | 'g6-to-decimal-matcher' | 'g6-decimal-multiplier-quiz' | 'g6-decimal-multiplier'
  | 'g6-decimal-divider-quiz' | 'g6-decimal-divider' | 'g6-fractions-closing-test'
  | 'scale-tool' | 'measurement-quiz' | 'water-measurement-tool' | 'ruler-tool'
  | 'snake-game' | 'long-division' | 'fraction-visualizer' | 'word-problems' | 'word-problems-quiz' | 'quiz'
  | 'equation-solver' | 'equation-balance' | 'g6-word-problems-quiz' | 'g6-word-problems-module'
  | 'materials' | 'tower-builder' | 'grade2-blocks' | 'fractions'
  | 'grade1-basic' | 'grade2-basic' | 'grade3-basic' | 'divisibility'
  | 'coloring' | 'grade2-coloring' | 'grade3-coloring' | 'hanoi-tower' | 'color-sequence-game'
  | 'smart-whiteboard' | 'algebra' | 'g7-rational-numbers' | 'g7-expression-usage' | 'geometry'
  | (string & {});

const gradeToSlug = (grade: GradeLevel): string => {
  if (grade === 'graduation') return 'erettsegi';
  if (grade === 'admission') return 'felveteli';
  if (grade === 'high-1') return '9-osztaly';
  if (grade === 'high-2') return '10-osztaly';
  if (grade === 'high-3') return '11-osztaly';
  if (grade === 'high-4') return '12-osztaly';
  return `${grade}-osztaly`;
};

const slugToGrade = (slug: string): GradeLevel | null => {
  if (slug === 'erettsegi') return 'graduation';
  if (slug === 'felveteli') return 'admission';
  if (slug === '9-osztaly') return 'high-1';
  if (slug === '10-osztaly') return 'high-2';
  if (slug === '11-osztaly') return 'high-3';
  if (slug === '12-osztaly') return 'high-4';
  const match = slug.match(/^(\d)-osztaly$/);
  return match ? parseInt(match[1]) as GradeLevel : null;
};

interface ActivityConfig {
  id: ActivityType;
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  category?: string;
  emoji?: string;
}

const TOOLS: ActivityConfig[] = [
  // basics
  { id: 'number-line', title: 'Számegyenes', desc: 'Egész számok összeadása és kivonása', icon: <span className="text-2xl">➖</span>, color: 'bg-blue-100 text-blue-600', category: 'sec-basics' },
  { id: 'manipulative-addition', title: 'Összeadás vizuálisan', desc: 'Helyiértékes összeadás blokkokkal és átváltással', icon: <Plus className="w-8 h-8" />, color: 'bg-emerald-100 text-emerald-600', category: 'sec-basics' },
  { id: 'manipulative-division', title: 'Osztás vizuálisan', desc: 'Helyiérték-blokkokkal és szétbontással', icon: <Calculator className="w-8 h-8" />, color: 'bg-blue-100 text-blue-600', category: 'sec-basics' },
  { id: 'long-division', title: 'Írásbeli osztás', desc: 'Lépcsős osztás levezetése egyjegyű osztóval', icon: <Calculator className="w-8 h-8" />, color: 'bg-indigo-100 text-indigo-600', category: 'sec-basics' },
  { id: 'divisibility', title: 'Oszthatóság', desc: 'Számok oszthatóságának vizsgálata maradékkal', icon: <Calculator className="w-8 h-8" />, color: 'bg-emerald-100 text-emerald-600', category: 'sec-basics' },
  { id: 'decimal-shifter', title: 'Tizedesvessző-eltoló', desc: 'Szorzás és osztás 10, 100, 1000-rel', icon: <span className="text-2xl">↔️</span>, color: 'bg-primary/10 text-primary', category: 'sec-basics' },
  { id: 'decimal-fractions', title: 'Tizedestörtek', desc: 'Helyiértékek, átváltások korongokkal', icon: <span className="text-2xl">🪙</span>, color: 'bg-amber-100 text-amber-700', category: 'sec-basics' },
  // fractions
  { id: 'fractions', title: 'Törtek', desc: 'Törtek szemléltetése és összehasonlítása', icon: <Calculator className="w-8 h-8" />, color: 'bg-orange-100 text-orange-600', category: 'sec-fractions' },
  { id: 'percentages', title: 'Százalékszámítás', desc: 'Arányok és százalékok vizualizációja', icon: <Percent className="w-8 h-8" />, color: 'bg-pink-100 text-pink-600', category: 'sec-fractions' },
  { id: 'money-calculation', title: 'Pénztár', desc: 'Kifizetések és visszajáró gyakorlása', icon: <Coins className="w-8 h-8" />, color: 'bg-amber-50 text-amber-600', category: 'sec-fractions' },
  // algebra
  { id: 'algebra-cloud', title: 'Algebrai Felhők (Összevonás, Zárójel, Kiemelés)', desc: 'Interaktív algebrai modellezés: konkrét gyümölcsöktől az absztrakt algebráig, tömbökkel, nullapárokkal és szorzókkal', icon: <span className="text-3xl">☁️</span>, color: 'bg-indigo-100 text-indigo-700 border-indigo-200', category: 'sec-algebra' },
  { id: 'algebra', title: 'Algebra', desc: 'Egyenletek és kifejezések szimbolikus megoldása', icon: <Variable className="w-8 h-8" />, color: 'bg-purple-100 text-purple-600', category: 'sec-algebra' },
  { id: 'equation-solver', title: 'Egyenletmegoldó (Téglalapos)', desc: 'Lépésről lépésre, téglalapos vizuális modell', icon: <Calculator className="w-8 h-8" />, color: 'bg-purple-100 text-purple-600', category: 'sec-algebra' },
  { id: 'equation-balance', title: 'Mérlegelv', desc: 'Egyenletmegoldás kétkarú mérleg modellel', icon: <Scale className="w-8 h-8" />, color: 'bg-indigo-100 text-indigo-600', category: 'sec-algebra' },
  // geometry
  { id: 'geometry', title: 'Geometria', desc: 'Interaktív alakzatok, terület–kerület, testek és koordinátageometria', icon: <Shapes className="w-8 h-8" />, color: 'bg-green-100 text-green-600', category: 'sec-geometry' },
  { id: 'construction', title: 'Alapszerkesztés', desc: 'Szerkesztés körzővel és vonalzóval', icon: <Pencil className="w-8 h-8" />, color: 'bg-indigo-100 text-indigo-600', category: 'sec-geometry' },
  { id: 'symmetry-construction', title: 'Szimmetria szerkesztő', desc: 'Tengelyes és középpontos tükrözés eszköze', icon: <Repeat className="w-8 h-8" />, color: 'bg-indigo-100 text-indigo-600', category: 'sec-geometry' },
  { id: 'perimeter-area', title: 'Kerület, terület', desc: 'Alakzatok kerületének és területének szemléltetése egységnégyzetekkel', icon: <LayoutGrid className="w-8 h-8" />, color: 'bg-cyan-100 text-cyan-600', category: 'sec-geometry' },
  { id: 'volume-surface', title: 'Térfogat és felszín', desc: '3D testek kiterítése és feltöltése egységkockákkal', icon: <span className="text-3xl">📦</span>, color: 'bg-indigo-100 text-indigo-600', category: 'sec-geometry' },
  // measurements
  { id: 'unit-converter', title: 'Hosszúság átváltás', desc: 'Mértékegységek (m, dm, cm, mm) vizuális ábrázolása', icon: <Scale className="w-8 h-8" />, color: 'bg-teal-100 text-teal-600', category: 'sec-measurements' },
  { id: 'capacity-converter', title: 'Űrmértékegység átváltó', desc: 'Folyadékok áttöltése mérőpoharakba (l, dl, cl, ml)', icon: <span className="text-3xl">🚰</span>, color: 'bg-blue-100 text-blue-600', category: 'sec-measurements' },
  // measuring instruments
  { id: 'analog-clock', title: 'Számlapos óra', desc: 'Időpontok leolvasása és beállítása a számlapon', icon: <span className="text-3xl">⏰</span>, color: 'bg-amber-100 text-amber-600', category: 'sec-measuring-instruments' },
  // creative
  { id: 'puzzle-maker', title: 'Online Rejtvénykészítő', desc: 'Készíts matekos rejtvényeket és töltsd le PDF-ben!', icon: <span className="text-3xl">🧩</span>, color: 'bg-violet-100 text-violet-600', category: 'sec-creative' },
  { id: 'toto-maker', title: 'Totó Készítő', desc: 'Készíts 13+1 kérdéses totót egyedi megfejtéssel és töltsd le PDF-ben!', icon: <span className="text-3xl">🏆</span>, color: 'bg-amber-100 text-amber-600', category: 'sec-creative' },
  { id: 'matching-creator', title: 'Párosító Készítő', desc: 'Készíts koordinátás párosító feladatot és töltsd le PDF-ben!', icon: <Puzzle className="w-8 h-8" />, color: 'bg-blue-100 text-blue-600', category: 'sec-creative' },
  { id: 'word-search', title: 'Szókereső Készítő', desc: 'Készíts saját szókeresőt, letölthető megoldókulccsal!', icon: <span className="text-3xl">🔎</span>, color: 'bg-indigo-100 text-indigo-600', category: 'sec-creative' },
  { id: 'sudoku-generator', title: 'Sudoku Generátor', desc: 'Generálj és nyomtass egyedi Sudoku feladványokat!', icon: <Calculator className="w-8 h-8" />, color: 'bg-blue-100 text-blue-600', category: 'sec-creative' },
  { id: 'student-feedback', title: 'Diák visszajelzés (Céltábla)', desc: 'Kérj visszajelzést a diákoktól az óra végén!', icon: <Target className="w-8 h-8" />, color: 'bg-rose-100 text-rose-600', category: 'sec-teacher' },
  { id: 'smart-whiteboard', title: 'AI Interaktív Okostábla', desc: 'Érintőképernyős tantermi okostábla AI alakzat- és függvényfelismeréssel', icon: <span className="text-3xl">🪄</span>, color: 'bg-purple-100 text-purple-700 border-purple-200', category: 'sec-teacher' },
  { id: 'scientific-calculator', title: 'Tudományos Számológép (Casio fx-82ES)', desc: 'Natural-V.P.A.M. kétsoros iskolai és érettségi tudományos számológép', icon: <Calculator className="w-8 h-8" />, color: 'bg-primary/10 text-primary border-primary/20', category: 'sec-algebra' },
];

const GAMES: ActivityConfig[] = [
  { id: 'sudoku', title: 'Sudoku Mester', desc: 'Klasszikus és extrém Sudoku feladványok', icon: <Calculator className="w-8 h-8" />, color: 'bg-blue-100 border-blue-200 text-blue-600' },
  {
    id: 'hanoi-tower',
    title: 'Hanoi tornyai',
    desc: 'Logikai és stratégiai játék a korongokkal.',
    icon: <Trophy className="w-8 h-8 text-amber-500" />,
    color: 'bg-amber-50 dark:bg-amber-900/20'
  },
  { id: 'snake-game', title: 'Matek Kígyó', desc: 'Gyűjtsd össze a helyes válaszokat a kígyóval!', icon: <span className="text-3xl">🐍</span>, color: 'bg-emerald-100 border-emerald-200' },
  { id: 'tower-builder', title: 'Toronyépítő', desc: 'Építs tornyokat Dienes-tömbökből és számolj!', icon: <span className="text-3xl">🏗️</span>, color: 'bg-blue-100 border-blue-200 text-blue-700' },
  { id: 'coloring', title: 'Számolj és Színezz!', desc: 'Számold ki az eredményt és színezd ki a képeket!', icon: <span className="text-3xl">🎨</span>, color: 'bg-pink-100 border-pink-200 text-pink-700' },
  { id: 'memory-game', title: 'Memóriajáték', desc: 'Jegyezd meg az ábrákat és teszteld a memóriád!', icon: <Brain className="w-8 h-8" />, color: 'bg-indigo-100 border-indigo-200 text-indigo-600' },
  { id: 'color-sequence-game', title: 'Szín-sorrend emlékezet', desc: 'Ismételd meg a villogó színes gombok sorrendjét!', icon: <Brain className="w-8 h-8 text-pink-500 animate-pulse" />, color: 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 border-pink-200' },
  { id: 'chess-game', title: 'Sakk Mester', desc: 'Játssz a gép ellen vagy hívd ki barátaidat!', icon: <span className="text-3xl">♟️</span>, color: 'bg-slate-100 border-slate-200 text-slate-700' },
  { id: 'torpedo-game', title: 'Torpedó Matek', desc: 'Süllyeszd el az ellenfél hajóit koordinátákkal!', icon: <span className="text-3xl">⚓</span>, color: 'bg-indigo-100 border-indigo-200 text-indigo-700' },
];

export default function MathPage() {
  const navigate = useNavigate();
  const { grade: gradeParam, topic: topicParam, activity: activityParam } = useParams();
  const location = useLocation();

  const [view, setView] = useState<ViewState>('main-select');
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | null>(null);
  const [activityType, setActivityType] = useState<ActivityType>('quiz');
  const [activeMaterial, setActiveMaterial] = useState<{ title: string, path: string } | null>(null);
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [vennLevel, setVennLevel] = useState<number | null>(null);
  const [activeGrade5TopicId, setActiveGrade5TopicId] = useState<string>('g5-integers');
  const [activeGrade5SubSectionId, setActiveGrade5SubSectionId] = useState<string | null>(null);
  const [isGrade5MobileMenuOpen, setIsGrade5MobileMenuOpen] = useState(false);
  const [isTutoringModalOpen, setIsTutoringModalOpen] = useState(false);

  const isUpperGradeLayout = selectedGrade !== null && (
    typeof selectedGrade === 'number' || 
    (typeof selectedGrade === 'string' && (
      selectedGrade.startsWith('high-') || 
      selectedGrade === 'admission' || 
      selectedGrade === 'graduation'
    ))
  );

  const getGradeLabel = (grade: GradeLevel | null): string => {
    if (!grade) return '';
    if (grade === 'graduation') return 'Érettségi';
    if (grade === 'admission') return 'Felvételi';
    if (grade === 'high-1') return '9. osztály';
    if (grade === 'high-2') return '10. osztály';
    if (grade === 'high-3') return '11. osztály';
    if (grade === 'high-4') return '12. osztály';
    return `${grade}. osztály`;
  };


  const [percentMode, setPercentMode] = useState<'calculate-value' | 'calculate-rate' | 'calculate-base' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchEndY = useRef(0);

  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return mathTopics.filter(t =>
      t.title.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query)
    );
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setShowResults(false);
    setView('search-results');
    updateURL('search-results', selectedGrade, null, null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync state from URL on load and URL change
  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '') {
      setView('main-select');
      setSelectedGrade(null);
      setSelectedTopic(null);
      return;
    }

    if (location.pathname.startsWith('/eszkozok')) {
      setView('tools-select');
      setSelectedGrade(null);
      if (topicParam) {
        setSelectedTopic(topicParam);
        setActivityType(topicParam as ActivityType);
        setView('activity');
      }
      return;
    }

    if (location.pathname.startsWith('/jatekok')) {
      setView('games-select');
      setSelectedGrade(null);
      if (topicParam) {
        setSelectedTopic(topicParam);
        setActivityType(topicParam as ActivityType);
        setView('activity');
      }
      return;
    }

    if (location.pathname.startsWith('/kompetencia')) {
      const slugMatch = location.pathname.match(/\/kompetencia\/(.+)/);
      if (slugMatch) {
        let type = 'competency-assessment';
        if (slugMatch[1].includes('-mock')) {
          type = 'competency-mock-assessment';
        }
        const parsedGrade = slugToGrade(slugMatch[1].replace('-mock', ''));
        if (parsedGrade) {
          setSelectedGrade(parsedGrade);
          setActivityType(type as ActivityType);
          setView('activity');
        }
      } else {
        setView('competency-select');
        setSelectedGrade(null);
      }
      return;
    }

    const grade = slugToGrade(gradeParam || '');
    if (grade) {
      setSelectedGrade(grade);
      const defaultTopic = grade === 8 ? 'g8-numbers-letters' : grade === 7 ? 'g7-logic' : grade === 6 ? 'g6-integers-divisibility' : grade === 5 ? 'g5-integers' : 'materials';
      if (topicParam) {
        setSelectedTopic(topicParam);
        setActiveGrade5TopicId(topicParam);
        if (activityParam) {
          setActivityType(activityParam as ActivityType);
          setView('activity');
          // Support material parameter if activity is materials
          const params = new URLSearchParams(location.search);
          const materialId = params.get('material');
          if (activityParam === 'materials' && materialId) {
            // The ID will be passed to MaterialGallery via the search param extraction below
          }
        } else {
          setView('topic-select');
          // Some topics might show detail instead of full activity
          if (topicParam === 'competency-assessment' || !((grade === 5 && topicParam.startsWith('g5-')) || grade === 4 || grade === 6 || grade === 7 || grade === 8)) {
            setActivityType(topicParam as ActivityType);
            setView('activity');
          } else {
            setExpandedTopicId(topicParam);
          }
        }
      } else {
        setView('topic-select');
        setActivityType('quiz'); // Reset activity type when no topic or activity is selected
        setActiveGrade5TopicId(defaultTopic);
        setExpandedTopicId(defaultTopic);
      }
    }
  }, [location.pathname, gradeParam, topicParam, activityParam, location.search]);

  // Sync URL from state when state changes via user interaction
  const updateURL = (
    newView: ViewState,
    grade: GradeLevel | null,
    topic: string | null,
    activity: ActivityType | null
  ) => {
    let path = '/';
    if (newView === 'tools-select') {
      path = topic ? `/eszkozok/${topic}` : '/eszkozok';
    } else if (newView === 'games-select') {
      path = topic ? `/jatekok/${topic}` : '/jatekok';
    } else if (newView === 'competency-select') {
      path = '/kompetencia';
      // Kompetencia activity specific routing
      path = grade ? `/kompetencia/${gradeToSlug(grade)}` : '/kompetencia';
    } else if (newView === 'activity' && !grade) {
      // Handle tool/game activity without grade
      const isGame = GAMES.some(g => g.id === activity);
      path = isGame ? `/jatekok/${topic || activity}` : `/eszkozok/${topic || activity}`;
    } else if (grade) {
      path = `/${gradeToSlug(grade)}`;
      if (topic) {
        path += `/${topic}`;
        // Only append activity if it's different from the topic to avoid redundant URLs
        if (newView === 'activity' && activity && activity !== topic) {
          path += `/${activity}`;
        }
      }
    }

    if (location.pathname !== path) {
      navigate(path);
    }
  };

  // Auto scroll to top on activity or view change and sync URL
  useEffect(() => {
    if (view === 'activity') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (selectedGrade && selectedTopic && activityType) {
        updateURL('activity', selectedGrade, selectedTopic, activityType);
      }
    }
  }, [activityType, view, selectedGrade, selectedTopic]);

  const handleHome = () => {
    setView('main-select');
    setSelectedGrade(null);
    setSelectedTopic(null);
    setActivityType('quiz');
    setActiveMaterial(null);
    setExpandedTopicId(null);
    setPercentMode(null);
    updateURL('main-select', null, null, null);
  };

  const handleMaterialSelect = (material: any) => {
    setActiveMaterial(material);
    if (material) {
      // For now, we use a query param for material to avoid complex URL nesting
      const path = location.pathname + `?material=${material.id}`;
      navigate(path);
    } else {
      navigate(location.pathname);
    }
  };


  const currentTopic = mathTopics.find(t => t.id === selectedTopic);

  const handleGradeSelect = (grade: GradeLevel) => {
    setSelectedGrade(grade);
    setView('topic-select');
    if (typeof grade === 'number' || (typeof grade === 'string' && grade.startsWith('high-'))) {
      const defaultTopic = grade === 8 ? 'g8-numbers-letters' : grade === 7 ? 'g7-logic' : grade === 6 ? 'g6-integers-divisibility' : grade === 5 ? 'g5-integers' : 'materials';
      setActiveGrade5TopicId(defaultTopic);
      setExpandedTopicId(defaultTopic);
      setActiveGrade5SubSectionId(null);
    } else {
      setExpandedTopicId(null);
    }
    updateURL('topic-select', grade, null, null);
  };

  const handleTopicSelect = (topicId: string, forceActivity = false) => {
    if (!forceActivity && ((selectedGrade === 5 && topicId.startsWith('g5-')) || selectedGrade === 4 || selectedGrade === 6 || selectedGrade === 7 || selectedGrade === 8)) {
      const nextExpanded = expandedTopicId === topicId ? null : topicId;
      setExpandedTopicId(nextExpanded);
      updateURL('topic-select', selectedGrade, nextExpanded, null);
      return;
    }

    setSelectedTopic(topicId);
    window.scrollTo(0, 0);

    let finalActivityType: ActivityType = 'quiz';

    // Check if it's a direct game or tool first
    const isGame = GAMES.some(g => g.id === topicId);
    const isTool = TOOLS.some(t => t.id === topicId);

    if (isGame || isTool) {
      finalActivityType = topicId as ActivityType;
    } else if (topicId === 'fractions') {
      finalActivityType = 'fractions';
    } else if (topicId === 'basic-operations' && selectedGrade === 1) {
      finalActivityType = 'grade1-basic';
    } else if (topicId === 'basic-operations' && selectedGrade === 2) {
      finalActivityType = 'grade2-basic';
    } else if (topicId === 'basic-operations' && selectedGrade === 3) {
      finalActivityType = 'grade3-basic';
    } else if (topicId === 'algebra') {
      finalActivityType = 'algebra';
    } else if (topicId === 'geometry') {
      finalActivityType = 'geometry';
    } else if (topicId === 'percentages' || topicId === 'g7-percent-equations') {
      finalActivityType = 'percentages';
      setPercentMode(null);
    } else if (topicId === 'divisibility') {
      finalActivityType = 'divisibility';
    } else if (topicId === 'materials') {
      finalActivityType = 'materials';
    } else if (topicId === 'long-division') {
      finalActivityType = 'long-division';
    } else if (topicId === 'line-relationships') {
      finalActivityType = 'line-relationships';
    } else if (topicId === 'snake-game') {
      finalActivityType = 'snake-game';
    } else if (topicId === 'decimal-fractions') {
      finalActivityType = 'decimal-fractions';
    } else if (topicId === 'number-line') {
      finalActivityType = 'number-line';
    } else if (topicId === 'construction') {
      finalActivityType = 'construction';
    } else if (topicId === 'manipulative-division') {
      finalActivityType = 'manipulative-division';
    } else if (topicId === 'manipulative-addition') {
      finalActivityType = 'manipulative-addition';
    } else if (topicId === 'decimal-shifter') {
      finalActivityType = 'decimal-shifter';
    } else if (topicId === 'algebra-cloud' || topicId === 'algebrai-felhok') {
      finalActivityType = 'algebra-cloud';
    } else if (topicId === 'equation-solver') {
      finalActivityType = 'equation-solver';
    } else if (topicId === 'equation-balance') {
      finalActivityType = 'equation-balance';
    } else if (topicId === 'money-calculation') {
      finalActivityType = 'money-calculation';
    } else if (topicId === 'puzzle-maker') {
      finalActivityType = 'puzzle-maker';
    } else if (topicId === 'symmetry-construction') {
      finalActivityType = 'symmetry-construction';
    } else if (topicId === 'perimeter-area') {
      finalActivityType = 'perimeter-area';
    } else if (topicId === 'volume-surface') {
      finalActivityType = 'volume-surface';
    } else if (topicId === 'perimeter-quiz') {
      finalActivityType = 'perimeter-quiz';
    } else if (topicId === 'parallelogram-area' || topicId === 'parallelogram-area-quiz') {
      finalActivityType = 'parallelogram-area-quiz';
    } else {
      finalActivityType = 'quiz';
    }

    setActivityType(finalActivityType);
    setView('activity');
    updateURL('activity', selectedGrade, topicId, finalActivityType);
  };

  const handleActivitySelect = (type: ActivityType, topicId?: string, level?: number, gradeOverride?: GradeLevel) => {
    setActivityType(type);
    const finalGrade = gradeOverride !== undefined ? gradeOverride : selectedGrade;
    if (gradeOverride !== undefined) {
      setSelectedGrade(gradeOverride);
    }

    let resolvedTopic = topicId || selectedTopic;
    if (!resolvedTopic && (finalGrade === 8 || selectedGrade === 8)) {
      if (type.startsWith('g8-geom-')) resolvedTopic = 'g8-geometry';
      else if (type.startsWith('g8-eq-')) resolvedTopic = 'g8-equations';
      else if (type.startsWith('g8-pyth-')) resolvedTopic = 'g8-pythagoras';
      else if (type.startsWith('g8-func-')) resolvedTopic = 'g8-functions-probability-sequences';
      else if (type.startsWith('g8-solids-')) resolvedTopic = 'g8-solids';
      else if (type.startsWith('g8-stat-')) resolvedTopic = 'g8-statistics';
      else resolvedTopic = 'g8-numbers-letters';
    }
    if (resolvedTopic) {
      setSelectedTopic(resolvedTopic);
      setActiveGrade5TopicId(resolvedTopic);
      setExpandedTopicId(resolvedTopic);
    }

    if (level !== undefined) {
      setVennLevel(level);
    } else {
      setVennLevel(null);
    }
    setView('activity');
    window.scrollTo(0, 0);
    updateURL('activity', finalGrade, resolvedTopic || selectedTopic, type);
  };

  const handleToolSelect = (toolId: string) => {
    setSelectedGrade(null);
    setSelectedTopic(toolId);
    setActivityType(toolId as ActivityType);
    setView('activity');
    updateURL('activity', null, toolId, toolId as ActivityType);
  };



  const handleQuizComplete = (result: QuizResult) => {
    console.log('Quiz completed:', result);
  };

  const handleBack = () => {
    let nextView: ViewState = 'main-select';
    let nextGrade: GradeLevel | null = selectedGrade;
    let nextTopic: string | null = selectedTopic;
    const nextActivity: ActivityType | null = activityType;

    if (view === 'activity') {
      if (activityType === 'materials' && activeMaterial) {
        handleMaterialSelect(null);
        return; // Stay in activity view
      }

      // If we are in a hub module (fractions, decimals, grade-specific hubs),
      // and we are NOT already at the hub menu level, go back to the menu level first.
      const isHubSubActivity =
        (activityType.startsWith('fractions-') || activityType.startsWith('decimal-') || activityType.startsWith('grade1-') || activityType.startsWith('grade2-') || activityType.startsWith('grade3-')) &&
        activityType !== 'fractions' && activityType !== 'grade1-basic' && activityType !== 'grade2-basic' && activityType !== 'grade3-basic';

      if (isHubSubActivity) {
        const hubId = activityType.startsWith('fractions-') || activityType.startsWith('decimal-') ? 'fractions' :
          activityType.startsWith('grade1-') ? 'grade1-basic' :
            activityType.startsWith('grade2-') ? 'grade2-basic' : 'grade3-basic';

        handleActivitySelect(hubId as ActivityType, selectedTopic || undefined);
        return;
      }

      if (selectedTopic === 'geometry' && selectedGrade === 6) {
        nextView = 'geometry-select';
        nextTopic = null;

      } else if (selectedGrade) {
        nextView = 'topic-select';
        let resolvedTopic = selectedTopic || activeGrade5TopicId;
        if (!resolvedTopic && selectedGrade === 8) {
          if (activityType.startsWith('g8-geom-')) resolvedTopic = 'g8-geometry';
          else if (activityType.startsWith('g8-eq-')) resolvedTopic = 'g8-equations';
          else if (activityType.startsWith('g8-pyth-')) resolvedTopic = 'g8-pythagoras';
          else if (activityType.startsWith('g8-func-')) resolvedTopic = 'g8-functions-probability-sequences';
          else if (activityType.startsWith('g8-solids-')) resolvedTopic = 'g8-solids';
          else if (activityType.startsWith('g8-stat-')) resolvedTopic = 'g8-statistics';
          else resolvedTopic = 'g8-numbers-letters';
        }
        const isExpandable =
          (selectedGrade === 5 && resolvedTopic?.startsWith('g5-')) ||
          selectedGrade === 4 ||
          selectedGrade === 6 ||
          selectedGrade === 7 ||
          selectedGrade === 8 ||
          (typeof selectedGrade === 'string' && selectedGrade.startsWith('high-'));
        nextTopic = isExpandable ? resolvedTopic : null;
        if (nextTopic) {
          setActiveGrade5TopicId(nextTopic);
          setExpandedTopicId(nextTopic);
        }
      } else if (location.pathname.startsWith('/jatekok') || GAMES.some(g => g.id === activityType)) {
        nextView = 'games-select';
        nextTopic = null;
      } else if (location.pathname.startsWith('/eszkozok') || TOOLS.some(t => t.id === activityType)) {
        nextView = 'tools-select';
        nextTopic = null;
      } else {
        nextView = 'main-select';
        nextGrade = null;
        nextTopic = null;
      }
    } else if (view === 'geometry-select') {
      nextView = 'topic-select';
      nextTopic = null;
    } else if (view === 'topic-select') {
      nextView = 'main-select';
      nextGrade = null;
      nextTopic = null;
    } else if (view === 'tools-select' || view === 'games-select' || view === 'search-results' || view === 'competency-select') {
      nextView = 'main-select';
      nextGrade = null;
      nextTopic = null;
    }

    setView(nextView);
    setSelectedGrade(nextGrade);
    setSelectedTopic(nextTopic);
    if (nextView === 'main-select') {
      setExpandedTopicId(null);
    }
    // Explicitly reset activityType unless we are staying in activity view
    if ((nextView as string) !== 'activity') {
      setActivityType('quiz');
    }
    updateURL(nextView, nextGrade, nextTopic, null);
  };

  const renderTopicContent = (topicId: string) => {
    if (selectedGrade === 'admission') return <AdmissionPrepView onBack={handleHome} />;
    if (selectedGrade === 'graduation') return <GraduationPrepView onBack={handleHome} />;
    if (topicId === 'competency-assessment') return <CompetencyAssessmentView onBack={handleHome} />;

    const viewProps: GradeViewProps = {
      topicId,
      activeSubSectionId: activeGrade5SubSectionId,
      selectedGrade: selectedGrade || 1,
      onActivitySelect: (type, tId) => handleActivitySelect(type as ActivityType, tId),
      onMaterialSelect: handleMaterialSelect,
      setPercentMode,
    };

    if (selectedGrade === 1) return <Grade1View {...viewProps} />;
    if (selectedGrade === 2) return <Grade2View {...viewProps} />;
    if (selectedGrade === 3) return <Grade3View {...viewProps} />;
    if (selectedGrade === 4) return <Grade4View {...viewProps} />;
    if (selectedGrade === 5) return <Grade5View {...viewProps} />;
    if (selectedGrade === 6) return <Grade6View {...viewProps} />;
    if (selectedGrade === 7) return <Grade7View {...viewProps} />;
    if (selectedGrade === 8) return <Grade8View {...viewProps} />;
    if (selectedGrade === 'high-1') return <Grade9View {...viewProps} />;
    if (selectedGrade === 'high-2') return <Grade10View {...viewProps} />;
    if (selectedGrade === 'high-3') return <Grade11View {...viewProps} />;
    if (selectedGrade === 'high-4') return <Grade12View {...viewProps} />;

    return (
      <div className="py-2">
        <div className="mb-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-blue-500" />
          <p className="text-sm font-medium text-blue-700 italic">Ehhez a témakörhöz jelenleg a tankönyvi anyagok érhetőek el.</p>
        </div>
        <MaterialGallery
          grade={selectedGrade || 8}
          onView={handleMaterialSelect}
          initialMaterialId={new URLSearchParams(location.search).get('material')}
        />
      </div>
    );
  };

  const getFilteredTopics = () => {
    let topics = mathTopics;

    if (selectedGrade) {
      if (typeof selectedGrade === 'number') {
        topics = mathTopics.filter(t => t.grades.includes(selectedGrade as number));
      } else {
        const gradeTopics = mathTopics.filter(t => t.grades.includes(selectedGrade as any));
        topics = gradeTopics.length > 0 ? gradeTopics : mathTopics.filter(t => ['algebra', 'geometry', 'percentages', 'word-problems'].includes(t.id));
      }
    }

    if (!searchQuery.trim()) return topics;

    const query = searchQuery.toLowerCase();
    return topics.filter(t =>
      t.title.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query)
    );
  };

  return (
    <div className={cn(
      "min-h-screen bg-transparent text-foreground flex flex-col", 
      ((activityType === 'symmetry-construction' || activityType === 'perimeter-area' || activityType === 'algebra-cloud') || (isUpperGradeLayout && view === 'topic-select')) && "p-0 overflow-hidden h-screen"
    )}>
      {/* Header */}
      {(activityType !== 'symmetry-construction' && activityType !== 'perimeter-area' && activityType !== 'algebra-cloud') || view !== 'activity' ? (
        <div className="sticky top-0 z-50 w-full">
          {/* Main Header */}
            <div className="bg-gradient-math text-white py-2 md:py-3 px-3 md:px-4 shadow-xl relative transition-all duration-300">
              {/* Decorative background elements */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full -ml-24 -mb-24 blur-2xl"></div>
              </div>

              <div className="w-full px-2 lg:px-12 relative z-10">
                <div className="flex justify-between items-center gap-1.5">
                  <div className="flex items-center gap-1 sm:gap-2.5">
                    <SidebarMenu />
                    <Button
                      variant="ghost"
                      onClick={handleHome}
                      className="bg-white/10 text-white hover:bg-white/20 font-black px-1.5 sm:px-3 border border-white/20 shadow-md backdrop-blur-md transition-all hover:scale-105 active:scale-95 flex items-center gap-1 sm:gap-2 h-8 sm:h-10 rounded-xl overflow-hidden"
                    >
                      <img src="/logo_header.png" alt="DiákZóna" className="h-6 sm:h-8 object-contain" />
                      <span className="text-sm sm:text-lg md:text-xl font-black tracking-tighter">Diákzóna</span>
                    </Button>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2">
                    <div ref={searchRef} className="relative hidden lg:flex items-center group">
                    <input
                      type="text"
                      placeholder="Keresés..."
                      value={searchQuery}
                      onFocus={() => setShowResults(true)}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowResults(true);
                      }}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                      className="bg-white/10 hover:bg-white/20 focus:bg-white/20 border border-white/10 focus:border-white/30 rounded-xl py-2 pl-4 pr-10 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all w-40 md:w-56 backdrop-blur-md"
                    />
                    <div className="absolute right-1 flex items-center gap-1">
                      {searchQuery && (
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setShowResults(false);
                          }}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-all"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={() => handleSearchSubmit()}
                        className="p-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-all shadow-sm"
                      >
                        <Search className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Dropdown Results */}
                    {showResults && searchQuery.trim() !== '' && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="max-h-[320px] overflow-y-auto p-2">
                          {getSearchResults().length > 0 ? (
                            getSearchResults().slice(0, 6).map(topic => (
                              <button
                                key={topic.id}
                                onClick={() => {
                                  handleTopicSelect(topic.id, true);
                                  setShowResults(false);
                                  setSearchQuery('');
                                }}
                                className="w-full flex items-center gap-3 p-3 hover:bg-black/5 rounded-xl transition-all text-left group/item"
                              >
                                <div className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-lg text-2xl group-hover/item:scale-110 transition-transform">
                                  {typeof topic.icon === 'string' ? (
                                    topic.icon
                                  ) : (
                                    <topic.icon className="w-6 h-6" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-bold text-sm text-slate-800 truncate">{topic.title}</div>
                                  <div className="text-[10px] text-slate-500 line-clamp-1">{topic.description}</div>
                                </div>
                                <ChevronRight className="w-3 h-3 text-slate-300 group-hover/item:text-primary transition-colors" />
                              </button>
                            ))
                          ) : (
                            <div className="p-4 text-center">
                              <div className="text-2xl mb-1">🔍</div>
                              <p className="text-xs text-slate-400">Nincs találat a keresésre.</p>
                            </div>
                          )}

                          {getSearchResults().length > 6 && (
                            <button
                              onClick={() => handleSearchSubmit()}
                              className="w-full p-2 text-center text-xs font-bold text-primary hover:bg-primary/5 rounded-lg transition-all"
                            >
                              Összes találat megtekintése ({getSearchResults().length})
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <UserMenu />
                  <Button
                    variant="default"
                    onClick={() => navigate('/korrepetalas')}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 font-extrabold px-2.5 sm:px-3.5 shadow-md shadow-purple-500/30 border border-white/20 transition-all hover:scale-105 active:scale-95 h-8 sm:h-9 flex items-center gap-1.5 rounded-xl"
                    title="Online Korrepetálás"
                  >
                    <Video className="w-4 h-4 flex-shrink-0" />
                    <span className="hidden md:inline text-xs sm:text-sm">Online Korrepetálás</span>
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => { window.location.assign('https://kviz.diakzona.hu/'); }}
                    className="bg-emerald-500 text-white hover:bg-emerald-600 font-extrabold px-2.5 sm:px-3.5 shadow-md shadow-emerald-500/30 border-none transition-all hover:scale-105 active:scale-95 h-8 sm:h-9 flex items-center gap-1.5 rounded-xl"
                    title="Online Kvíz"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                      <circle cx="12" cy="3" r="1.8" />
                      <path d="M13 6.5L8 14H12.5L10.5 21.5L17 12H12.5L13.5 6.5H13Z" />
                    </svg>
                    <span className="hidden md:inline text-xs sm:text-sm">Online Kvíz</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}



      {/* Content */}
      <div className={cn(
        (activityType !== 'chess-game' && activityType !== 'perimeter-area' && activityType !== 'snake-game' && activityType !== 'tower-builder' && activityType !== 'grade2-blocks' && activityType !== 'grade3-blocks' && activityType !== 'grade3-tower-builder' && activityType !== 'toto-maker' && activityType !== 'student-feedback' && !(isUpperGradeLayout && view === 'topic-select')) && "container mx-auto px-4 py-8",
        "transition-all duration-500",
        (isUpperGradeLayout && view === 'topic-select')
          ? "w-full p-0 max-w-none flex-1 overflow-hidden"
          : (activityType === 'chess-game' || activityType === 'perimeter-area' || activityType === 'algebra-cloud' || activityType === 'snake-game' || activityType === 'tower-builder' || activityType === 'grade2-blocks' || activityType === 'grade3-blocks' || activityType === 'grade3-tower-builder'
            ? "max-w-none p-0 w-full h-full"
            : (activityType === 'toto-maker' || activityType === 'student-feedback')
            ? "w-full max-w-none px-2 sm:px-4 py-1.5"
            : ((view === 'activity' || view === 'topic-select' || view === 'tools-select' || view === 'games-select' || view === 'main-select' || view === 'competency-select')
              ? "max-w-none lg:px-12"
              : "max-w-4xl"
            )
          )
      )}>
        {view === 'search-results' && (
          <div className="animate-slide-up">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-slate-800">Keresési találatok</h2>
                  <p className="text-sm text-slate-500">Találatok erre: <span className="font-bold text-primary italic">"{searchQuery}"</span></p>
                </div>
              </div>
              <Button variant="ghost" onClick={handleBack} className="text-slate-500 hover:text-primary rounded-xl px-6">
                Bezárás
              </Button>
            </div>

            <div className="space-y-4">
              {getSearchResults().map((topic) => (
                <MathTopicCard
                  key={topic.id}
                  topic={topic}
                  onClick={() => handleTopicSelect(topic.id, true)}
                />
              ))}
              {getSearchResults().length === 0 && (
                <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <Search className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-600 mb-2">Nincs találat a keresésre.</h3>
                  <p className="text-slate-400">Próbálkozz más kulcsszóval vagy ellenőrizd a helyesírást!</p>
                  <Button variant="outline" onClick={handleHome} className="mt-8 rounded-xl border-slate-200">
                    Vissza a főoldalra
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'main-select' && (
          <div className="animate-slide-up space-y-12">
            <section>
              <GradeSelector
                selectedGrade={selectedGrade}
                onSelectGrade={handleGradeSelect}
              />
            </section>

            <section className="pt-4 border-t border-slate-100 flex flex-col md:flex-row gap-4">
              <Button
                onClick={() => { setView('tools-select'); updateURL('tools-select', null, null, null); }}
                className="flex-1 h-20 text-lg font-bold gap-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/20 group transition-all"
              >
                <div className="p-2 bg-white/10 rounded-lg group-hover:rotate-12 transition-transform">
                  <Wrench className="w-6 h-6" />
                </div>
                Matek Eszközök
                <ChevronRight className="w-6 h-6 ml-auto" />
              </Button>

              <Button
                onClick={() => { setView('competency-select'); updateURL('competency-select', null, null, null); }}
                className="flex-1 h-20 text-lg font-bold gap-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/20 group transition-all text-white"
              >
                <div className="p-2 bg-white/10 rounded-lg group-hover:rotate-12 transition-transform">
                  <Target className="w-6 h-6" />
                </div>
                Kompetencia felkészítés
                <ChevronRight className="w-6 h-6 ml-auto" />
              </Button>

              <Button
                onClick={() => { setView('games-select'); updateURL('games-select', null, null, null); }}
                className="flex-1 h-20 text-lg font-bold gap-4 bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 shadow-lg shadow-pink-500/20 group transition-all"
              >
                <div className="p-2 bg-white/10 rounded-lg group-hover:rotate-12 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                Matek Játékok
                <ChevronRight className="w-6 h-6 ml-auto" />
              </Button>
            </section>

            {/* --- NEW SECTIONS --- */}

            {/* Math Quote Section */}
            <section className="py-12 px-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-xl text-center relative overflow-hidden">
              <div className="absolute -top-10 -left-10 text-9xl text-white/5 font-black">&ldquo;</div>
              <div className="absolute -bottom-10 -right-10 text-9xl text-white/5 font-black">&rdquo;</div>
              <div className="relative z-10 max-w-2xl mx-auto">
                <blockquote className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                  <span className="text-primary-300">„</span>A természet könyve a <span className="text-primary font-black underline decoration-primary/50 underline-offset-4">matematika</span> nyelvén íródott.<span className="text-primary-300">”</span>
                </blockquote>
                <p className="text-slate-400 font-medium uppercase tracking-widest text-sm">— Galileo Galilei —</p>
              </div>
            </section>

            {/* Developer Bio Section */}
            <section className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Photo Area */}
                <div className="lg:w-2/5 xl:w-1/3 relative bg-slate-900 overflow-hidden min-h-[300px] lg:min-h-full flex-shrink-0">
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500 rounded-full blur-3xl -ml-24 -mb-24"></div>
                  </div>
                  <img
                    src="/orsos_istvan.jpg"
                    alt="Orsós István"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                  {/* Gradient Overlay for smooth transition on mobile if needed, or just decoration */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900/50"></div>
                </div>

                {/* Content Area */}
                <div className="lg:w-2/3 p-8 lg:p-10 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest w-fit mb-4">
                    <Sparkles className="w-3.5 h-3.5" /> A Fejlesztőről
                  </div>
                  <h2 className="text-3xl font-black text-slate-800 mb-2">Orsós István</h2>
                  <p className="text-lg font-bold text-slate-500 mb-6 border-b border-slate-100 pb-6">Tanár • Mentor • Önkéntes</p>

                  <div className="space-y-4 mb-8">
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                      Elhivatott <span className="font-bold text-slate-800">matematikus és fizikus</span> vagyok, aki szenvedéllyel oktat és mentorál. Több éves tapasztalatom van középiskolai tanításban és egyetemi mentorprogramokban.
                    </p>
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                      Célom, hogy tudásommal és tapasztalataimmal minél több embernek segíthessek a fejlődésben és az önmegvalósításban. Aktívan foglalkozom <span className="font-bold text-primary">3D nyomtatással</span> és technológiai innovációkkal.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                      <div className="font-black text-slate-800">PTE</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Mat-Fiz Mester</div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                      <div className="font-black text-slate-800">2020<span className="text-slate-400 font-normal">óta</span></div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Tanár</div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                      <div className="font-black text-slate-800">Python</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Programozás</div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                      <div className="font-black text-slate-800">3D</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Nyomtatás</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Site Stats Section */}
            <section className="mb-12">
              <div className="text-center mb-8">
                <h2 className="font-display text-2xl font-bold text-slate-800 mb-2">Mit találsz a DiákZónán?</h2>
                <p className="text-slate-500">Folyamatosan bővülő, interaktív matematikai tartalom, ami a tanulást játékká teszi.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {(() => {
                  // Dinamikus számítások az új tömbök alapján
                  const toolsCount = TOOLS.length;
                  const gamesCount = GAMES.length;
                  const topicsCount = mathTopics.filter(t => t.id.startsWith('g')).length;

                  return (
                    <>
                      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center hover:border-primary/50 transition-all hover:-translate-y-1">
                        <div className="p-4 rounded-2xl bg-purple-50 text-purple-600 mb-4">
                          <Wrench className="w-8 h-8" />
                        </div>
                        <div className="text-4xl font-black text-slate-800 mb-1">{toolsCount}+</div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Interaktív Eszköz</div>
                      </div>
                      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center hover:border-pink-500/50 transition-all hover:-translate-y-1">
                        <div className="p-4 rounded-2xl bg-pink-50 text-pink-500 mb-4">
                          <Gamepad2 className="w-8 h-8" />
                        </div>
                        <div className="text-4xl font-black text-slate-800 mb-1">{gamesCount}+</div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Oktató Játék</div>
                      </div>
                      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center hover:border-blue-500/50 transition-all hover:-translate-y-1">
                        <div className="p-4 rounded-2xl bg-blue-50 text-blue-500 mb-4">
                          <BookOpen className="w-8 h-8" />
                        </div>
                        <div className="text-4xl font-black text-slate-800 mb-1">{topicsCount}+</div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rendszerezett Témakör</div>
                      </div>
                      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center hover:border-emerald-500/50 transition-all hover:-translate-y-1">
                        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600 mb-4">
                          <Target className="w-8 h-8" />
                        </div>
                        <div className="text-4xl font-black text-slate-800 mb-1">1000+</div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Gyakorló Feladat</div>
                      </div>
                    </>
                  )
                })()}
              </div>
            </section>
          </div>
        )}

        {view === 'topic-select' && (() => {
          if (selectedGrade === 'graduation') {
            return (
              <Suspense fallback={
                <div className="flex flex-col items-center justify-center py-32 space-y-6 animate-pulse text-left">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-primary/40 rounded-full animate-ping" />
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold text-slate-700">Töltés...</h3>
                    <p className="text-slate-400">Érettségi felkészítő betöltése...</p>
                  </div>
                </div>
              }>
                <GraduationPrep onBack={handleHome} />
              </Suspense>
            );
          }
          if (selectedGrade === 'admission') {
            return (
              <Suspense fallback={
                <div className="flex flex-col items-center justify-center py-32 space-y-6 animate-pulse text-left">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-primary/40 rounded-full animate-ping" />
                  </div>
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold text-slate-700">Töltés...</h3>
                    <p className="text-slate-400">Felvételi felkészítő betöltése...</p>
                  </div>
                </div>
              }>
                <AdmissionPrep onBack={handleHome} />
              </Suspense>
            );
          }
          if (typeof selectedGrade === 'number' || (selectedGrade !== null && selectedGrade.startsWith('high-'))) {
            const currentGradeTopics = getGradeSubsections(selectedGrade, mathTopics);
            const activeTopic = currentGradeTopics.find(t => t.id === activeGrade5TopicId) || currentGradeTopics[0];

            const handleTouchStart = (e: React.TouchEvent) => {
              touchStartY.current = e.touches[0].clientY;
              touchEndY.current = e.touches[0].clientY;
            };

            const handleTouchMove = (e: React.TouchEvent) => {
              touchEndY.current = e.touches[0].clientY;
            };

            const handleTouchEnd = () => {
              const diffY = touchStartY.current - touchEndY.current;
              if (diffY > 50) {
                setIsGrade5MobileMenuOpen(true);
              } else if (diffY < -50) {
                setIsGrade5MobileMenuOpen(false);
              }
            };

            return (
              <div className="flex flex-col lg:flex-row h-full w-full bg-slate-50 text-slate-800 overflow-hidden animate-slide-up relative text-left">
                {/* Left Sidebar (Desktop only) */}
                <aside className={cn(
                  "hidden lg:flex bg-white border-r border-slate-200/80 flex-col transition-all duration-300 relative z-20 shrink-0",
                  isSidebarCollapsed ? "w-16" : "w-64"
                )}>
                  {/* Collapsible toggle */}
                  <button
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="absolute top-4 -right-3 bg-purple-600 hover:bg-purple-500 text-white rounded-full p-1 shadow-md hover:scale-110 transition-all z-30"
                  >
                    {isSidebarCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
                  </button>

                  {/* Sidebar Header */}
                  <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                    {!isSidebarCollapsed && (
                      <div className="flex items-center gap-2">
                        <span className="font-display font-black text-sm tracking-wider uppercase text-purple-700">{getGradeLabel(selectedGrade)}</span>
                      </div>
                    )}
                    <button
                      onClick={handleHome}
                      className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 hover:text-slate-950 transition-colors ml-auto"
                      title="Főoldal"
                    >
                      <Home className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Sidebar Nav */}
                  <nav className="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                    {currentGradeTopics.map((topic) => {
                      const isTopicActive = activeGrade5TopicId === topic.id;
                      const hasSubsections = topic.subsections && topic.subsections.length > 0;
                      const isExpanded = expandedTopicId === topic.id;

                      return (
                        <div key={topic.id} className="space-y-1">
                          <button
                            onClick={() => {
                              if (isExpanded) {
                                setExpandedTopicId(null);
                              } else {
                                setActiveGrade5TopicId(topic.id);
                                setActiveGrade5SubSectionId(null);
                                setExpandedTopicId(hasSubsections ? topic.id : null);
                              }
                            }}
                            className={cn(
                              "w-full text-left p-2.5 rounded-xl transition-all font-bold text-xs flex items-center gap-2.5 group",
                              isTopicActive
                                ? "bg-purple-600 text-white font-black shadow-md shadow-purple-100"
                                : "hover:bg-slate-100 text-slate-900 hover:text-black font-bold"
                            )}
                          >
                            <span className="text-base shrink-0">{topic.icon}</span>
                            {!isSidebarCollapsed && (
                              <>
                                <span className="line-clamp-2 flex-1 font-bold">{topic.title}</span>
                                {hasSubsections && (
                                  <span
                                    className={cn(
                                      "p-0.5 rounded transition-transform duration-200 shrink-0",
                                      isTopicActive ? "text-white/90 group-hover:text-white" : "text-slate-700 group-hover:text-slate-950"
                                    )}
                                    title={isExpanded ? "Altémák összecsukása" : "Altémák lenyitása"}
                                  >
                                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", !isExpanded && "-rotate-90")} />
                                  </span>
                                )}
                              </>
                            )}
                          </button>

                          {/* Subsections list */}
                          {isExpanded && !isSidebarCollapsed && hasSubsections && (
                            <div className="pl-2 pr-1 py-1 border-l-2 border-purple-300 space-y-1 ml-3 mt-1 animate-in fade-in-50 slide-in-from-top-1 duration-150">
                              {topic.subsections.map((sub: any) => {
                                const isSubActive = activeGrade5SubSectionId === sub.id;
                                return (
                                  <button
                                    key={sub.id}
                                    onClick={() => setActiveGrade5SubSectionId(sub.id)}
                                    className={cn(
                                      "w-full text-left py-2 pr-3 rounded-lg text-xs font-bold transition-all flex items-center justify-between",
                                      isSubActive
                                        ? "bg-purple-100 text-purple-950 font-black border-l-2 border-purple-700"
                                        : "hover:bg-slate-100 text-slate-900 hover:text-black",
                                      isSubActive ? "pl-2" : "pl-3"
                                    )}
                                  >
                                    <span className="truncate mr-2">{sub.label}</span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </nav>
                </aside>

                {/* ── MOBILE BOTTOM DRAWER (< lg) ──────────────────────────── */}
                {/* Backdrop overlay */}
                {isGrade5MobileMenuOpen && (
                  <div
                    className="fixed inset-0 bg-black/45 z-40 lg:hidden"
                    onClick={() => setIsGrade5MobileMenuOpen(false)}
                  />
                )}

                {/* Floating center tab button (Visible when closed) */}
                {!isGrade5MobileMenuOpen && (
                  <button
                    onClick={() => setIsGrade5MobileMenuOpen(true)}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 lg:hidden h-9 w-fit px-4 bg-purple-600 text-white font-extrabold text-[11px] tracking-wider uppercase rounded-t-2xl shadow-[0_-4px_15px_rgba(147,51,234,0.35)] flex items-center justify-center gap-1.5 transition-all active:scale-95 animate-in fade-in slide-in-from-bottom-5 duration-300"
                  >
                    <ChevronUp className="w-4 h-4 animate-bounce" style={{ animationDuration: '2s' }} />
                    <span className="font-extrabold text-[11px] tracking-wider">Témakörök</span>
                  </button>
                )}

                {/* Bottom drawer panel */}
                <div
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className={cn(
                    "fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white text-slate-900 rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.15)] border-t border-slate-200/80 transition-transform duration-300 ease-in-out",
                    isGrade5MobileMenuOpen ? "translate-y-0" : "translate-y-full"
                  )}
                  style={{ maxHeight: '75vh' }}
                >
                  {/* Drawer handle / toggle strip */}
                  <button
                    onClick={() => setIsGrade5MobileMenuOpen(false)}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    className="w-full h-12 flex items-center justify-between px-5 bg-slate-50 border-b border-slate-200/60 rounded-t-3xl flex-shrink-0"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Sparkles className="w-4 h-4 text-purple-600 animate-pulse flex-shrink-0" />
                      <span className="font-display font-black text-xs tracking-wider uppercase text-purple-800 flex-shrink-0">
                        Témakörök
                      </span>
                      <span className="bg-purple-100 text-purple-900 text-[10px] font-black px-2.5 py-0.5 rounded-full truncate">
                        {activeTopic.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-800 flex-shrink-0">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider">Bezárás</span>
                      <ChevronDown className="w-4 h-4 text-purple-600" />
                    </div>
                  </button>

                  {/* Scrollable content inside drawer */}
                  <div className="overflow-y-auto p-4 space-y-4" style={{ maxHeight: 'calc(75vh - 3rem)' }}>
                    <div className="flex justify-end border-b border-slate-100 pb-2">
                      <button
                        onClick={() => {
                          setIsGrade5MobileMenuOpen(false);
                          handleHome();
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 hover:text-black transition-colors text-xs font-bold"
                      >
                        <Home className="w-3.5 h-3.5" />
                        Vissza a főoldalra
                      </button>
                    </div>

                    <nav className="space-y-2.5">
                      {currentGradeTopics.map((topic) => {
                        const isTopicActive = activeGrade5TopicId === topic.id;
                        const hasSubsections = topic.subsections && topic.subsections.length > 0;
                        const isExpanded = expandedTopicId === topic.id;

                        return (
                          <div key={topic.id} className="space-y-1">
                            <button
                              onClick={() => {
                                if (isExpanded) {
                                  setExpandedTopicId(null);
                                } else {
                                  setActiveGrade5TopicId(topic.id);
                                  setActiveGrade5SubSectionId(null);
                                  setExpandedTopicId(hasSubsections ? topic.id : null);
                                  if (!hasSubsections) {
                                    setIsGrade5MobileMenuOpen(false);
                                  }
                                }
                              }}
                              className={cn(
                                "w-full text-left p-3 rounded-2xl transition-all font-bold text-xs flex items-center gap-3 group",
                                isTopicActive
                                  ? "bg-purple-600 text-white font-black shadow-md shadow-purple-100"
                                  : "hover:bg-slate-100 bg-slate-50 text-slate-900 hover:text-black font-bold border border-slate-200/60"
                              )}
                            >
                              <span className="text-base shrink-0">{topic.icon}</span>
                              <span className="flex-1 font-bold">{topic.title}</span>
                              {hasSubsections && (
                                <ChevronDown className={cn("w-4 h-4 transition-transform duration-200 shrink-0", !isExpanded && "-rotate-90", isTopicActive ? "text-white/80" : "text-slate-700")} />
                              )}
                            </button>

                            {/* Subsections list inside mobile drawer */}
                            {isExpanded && hasSubsections && (
                              <div className="pl-3 pr-1 py-1 border-l-2 border-purple-300 space-y-1.5 ml-4 mt-1.5 animate-in fade-in-50 slide-in-from-top-1 duration-150">
                                {topic.subsections.map((sub: any) => {
                                  const isSubActive = activeGrade5SubSectionId === sub.id;
                                  return (
                                    <button
                                      key={sub.id}
                                      onClick={() => {
                                        setActiveGrade5SubSectionId(sub.id);
                                        setIsGrade5MobileMenuOpen(false);
                                      }}
                                      className={cn(
                                        "w-full text-left py-2.5 pr-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between",
                                        isSubActive
                                          ? "bg-purple-100 text-purple-950 font-black border-l-2 border-purple-700"
                                          : "hover:bg-slate-100 bg-slate-50 text-slate-900 hover:text-black",
                                        isSubActive ? "pl-3.5" : "pl-4"
                                      )}
                                    >
                                      <span className="truncate mr-2">{sub.label}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </nav>
                  </div>
                </div>

                {/* Right Content Area */}
                <main className="flex-1 bg-slate-50/30 p-6 md:p-8 pb-16 lg:pb-8 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                  <div className="max-w-6xl mx-auto space-y-8">
                    {/* Header Card */}
                    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{activeTopic.icon}</span>
                          <h1 className="font-display text-xl md:text-2xl font-black text-slate-800">
                            {activeTopic.title}
                          </h1>
                        </div>
                        <p className="text-xs text-slate-500">
                          {activeGrade5SubSectionId
                            ? activeTopic.subsections.find((s: any) => s.id === activeGrade5SubSectionId)?.label
                            : "Válassz egy alfejezetet vagy nézd meg az összes feladatot!"}
                        </p>
                      </div>
                    </div>

                    {/* Active Topic Rendering */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                      {activeGrade5TopicId === 'materials' ? (
                        <div className="py-2">
                          <MaterialGallery
                            grade={selectedGrade as number}
                            onView={handleMaterialSelect}
                            initialMaterialId={new URLSearchParams(location.search).get('material')}
                          />
                        </div>
                      ) : (
                        renderTopicContent(activeGrade5TopicId)
                      )}
                    </div>
                  </div>
                </main>
              </div>
            );
          }

          return (
            <div className="animate-slide-up pb-20 relative text-left">
              <div className="flex-1 transition-all duration-500">
                <div className="flex items-center gap-2 mb-8">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-2xl font-bold">Válaszd ki a témakörök!</h2>
                </div>
                <div className="space-y-4">
                  {getFilteredTopics().map((topic) => (
                    <MathTopicCard
                      key={topic.id}
                      topic={topic}
                      isExpanded={expandedTopicId === topic.id}
                      onClick={() => handleTopicSelect(topic.id)}
                    >
                      {((((selectedGrade as any) === 5 && topic.id.startsWith('g5-')) || (selectedGrade as any) === 4 || (selectedGrade as any) === 6 || (selectedGrade as any) === 7) && renderTopicContent(topic.id))}
                    </MathTopicCard>
                  ))}
                  {getFilteredTopics().length === 0 && (
                    <div className="text-center py-12 p-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                      <p className="text-slate-500">Ehhez az évfolyamhoz még nincsenek feltöltve specifikus témakörök.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })()}

        {view === 'tools-select' && (() => {
          const toolNavItems: NavItem[] = [
            { id: 'sec-basics', label: 'Alapműveletek', icon: <Calculator className="w-4 h-4" /> },
            { id: 'sec-fractions', label: 'Törtek', icon: <Percent className="w-4 h-4" /> },
            { id: 'sec-algebra', label: 'Algebra', icon: <Variable className="w-4 h-4" /> },
            { id: 'sec-geometry', label: 'Geometria', icon: <Shapes className="w-4 h-4" /> },
            { id: 'sec-measurements', label: 'Mértékegység', icon: <Scale className="w-4 h-4" /> },
            { id: 'sec-measuring-instruments', label: 'Mérőeszközök', icon: <Wrench className="w-4 h-4" /> },
            { id: 'sec-creative', label: 'Kreatív', icon: <Sparkles className="w-4 h-4" /> },
            { id: 'sec-teacher', label: 'Tanári', icon: <GraduationCap className="w-4 h-4" /> },
          ];

          return (
            <div className="animate-slide-up pb-20 relative text-left">
              <ScrollSpySidebar items={toolNavItems} onCollapseChange={setIsSidebarCollapsed} />

              <div className={cn("flex-1 space-y-12 transition-all duration-500 text-left", isSidebarCollapsed ? "lg:pl-16" : "lg:pl-36")}>
                <div className="text-center lg:text-left mb-12">
                  <h2 className="font-display text-3xl font-bold mb-4 flex items-center justify-center lg:justify-start gap-3 text-slate-800">
                    <Settings2 className="w-8 h-8 text-primary" />
                    Matematikai Eszköztár
                  </h2>
                  <p className="text-slate-500 max-w-2xl">
                    Válogass interaktív eszközeink közül, amelyek segítenek a vizuális megértésben és a gyakorlásban.
                  </p>
                </div>

                {/* 1. Számfogalom és alapműveletek */}
                <section>
                  <SectionHeader
                    id="sec-basics"
                    number={1}
                    title="Számfogalom és alapműveletek"
                    color="blue"
                    subtitle="Cél: számérzék, műveleti biztonság"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                    {TOOLS.filter(t => t.category === 'sec-basics').map(tool => (
                      <ToolCard
                        key={tool.id}
                        title={tool.title}
                        desc={tool.desc}
                        icon={tool.icon}
                        color={tool.color}
                        onClick={() => handleToolSelect(tool.id)}
                      />
                    ))}
                  </div>
                </section>

                {/* 2. Törtek és arányosság világa */}
                <section>
                  <SectionHeader
                    id="sec-fractions"
                    number={2}
                    title="Törtek és arányosság világa"
                    color="orange"
                    subtitle="Cél: törtek megértése és gyakorlati pálmazás"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                    {TOOLS.filter(t => t.category === 'sec-fractions').map(tool => (
                      <ToolCard
                        key={tool.id}
                        title={tool.title}
                        desc={tool.desc}
                        icon={tool.icon}
                        color={tool.color}
                        onClick={() => handleToolSelect(tool.id)}
                      />
                    ))}
                  </div>
                </section>

                {/* 3. Algebrai gondolkodás */}
                <section>
                  <SectionHeader
                    id="sec-algebra"
                    number={3}
                    title="Algebrai gondolkodás"
                    color="purple"
                    subtitle="Cél: absztrakció, egyenletmegoldó vizuális modellekkel"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                    {TOOLS.filter(t => t.category === 'sec-algebra').map(tool => (
                      <ToolCard
                        key={tool.id}
                        title={tool.title}
                        desc={tool.desc}
                        icon={tool.icon}
                        color={tool.color}
                        onClick={() => handleToolSelect(tool.id)}
                      />
                    ))}
                  </div>
                </section>

                {/* 4. Geometria és szerkesztés */}
                <section>
                  <SectionHeader
                    id="sec-geometry"
                    number={4}
                    title="Geometria és szerkesztés"
                    color="green"
                    subtitle="Cél: térszemlélet, konstrukció, terület-kerület"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                    {TOOLS.filter(t => t.category === 'sec-geometry').map(tool => (
                      <ToolCard
                        key={tool.id}
                        title={tool.title}
                        desc={tool.desc}
                        icon={tool.icon}
                        color={tool.color}
                        onClick={() => handleToolSelect(tool.id)}
                      />
                    ))}
                  </div>
                </section>

                {/* 5. Mértékegység átváltás */}
                <section>
                  <SectionHeader
                    id="sec-measurements"
                    number={5}
                    title="Mértékegység átváltás"
                    color="teal"
                    subtitle="Cél: hosszúság mértékegységek vizuális megértése"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                    {TOOLS.filter(t => t.category === 'sec-measurements').map(tool => (
                      <ToolCard
                        key={tool.id}
                        title={tool.title}
                        desc={tool.desc}
                        icon={tool.icon}
                        color={tool.color}
                        onClick={() => handleToolSelect(tool.id)}
                      />
                    ))}
                  </div>
                </section>

                {/* 6. Mérőeszközök */}
                <section>
                  <SectionHeader
                    id="sec-measuring-instruments"
                    number={6}
                    title="Mérőeszközök"
                    color="amber"
                    subtitle="Cél: óra leolvasása, időmérés vizuális gyakorlása"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                    {TOOLS.filter(t => t.category === 'sec-measuring-instruments').map(tool => (
                      <ToolCard
                        key={tool.id}
                        title={tool.title}
                        desc={tool.desc}
                        icon={tool.icon}
                        color={tool.color}
                        onClick={() => handleToolSelect(tool.id)}
                      />
                    ))}
                  </div>
                </section>

                {/* 7. Interaktív / Kreatív eszközök */}
                <section>
                  <SectionHeader
                    id="sec-creative"
                    number={7}
                    title="Interaktív / Kreatív eszközök"
                    color="violet"
                    subtitle="Készíts saját tartalmakat!"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                    {TOOLS.filter(t => t.category === 'sec-creative').map(tool => (
                      <ToolCard
                        key={tool.id}
                        title={tool.title}
                        desc={tool.desc}
                        icon={tool.icon}
                        color={tool.color}
                        onClick={() => handleToolSelect(tool.id)}
                      />
                    ))}
                  </div>
                </section>

                {/* 8. Tanári eszközök */}
                <section>
                  <SectionHeader
                    id="sec-teacher"
                    number={8}
                    title="Tanári eszközök"
                    color="rose"
                    subtitle="Segédanyagok és visszajelzések"
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                    {TOOLS.filter(t => t.category === 'sec-teacher').map(tool => (
                      <ToolCard
                        key={tool.id}
                        title={tool.title}
                        desc={tool.desc}
                        icon={tool.icon}
                        color={tool.color}
                        onClick={() => handleToolSelect(tool.id)}
                      />
                    ))}
                  </div>
                </section>
              </div>
            </div>
          );
        })()}

        {view === 'games-select' && (
          <div className="animate-slide-up w-full">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-800 flex items-center justify-center gap-3 mb-2">
                <Sparkles className="w-8 h-8 text-pink-500 animate-pulse" />
                Matematikai Játékok
              </h2>
              <p className="text-sm text-slate-500 font-medium max-w-xl mx-auto">
                Fejleszd a logikád, gyakorold a számolást és játssz önállóan vagy barátaiddal!
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 w-full">
              {GAMES.map(game => (
                <ToolCard
                  key={game.id}
                  title={game.title}
                  desc={game.desc}
                  icon={game.icon}
                  color={game.color}
                  onClick={() => handleActivitySelect(game.id as ActivityType)}
                />
              ))}
            </div>
          </div>
        )}

        {view === 'competency-select' && (
          <Suspense fallback={
            <div className="flex flex-col items-center justify-center py-32 space-y-6 animate-pulse">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-primary/40 rounded-full animate-ping" />
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-xl font-bold text-slate-700">Felkészítő betöltése...</h3>
                <p className="text-slate-400">Pár pillanat és kezdhetjük!</p>
              </div>
            </div>
          }>
            <CompetencyMatrixHub onBack={handleHome} />
          </Suspense>
        )}

        {view === 'activity' && (
          <div className="animate-slide-up">
            <Suspense fallback={
              <div className="flex flex-col items-center justify-center py-32 space-y-6 animate-pulse">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-primary/40 rounded-full animate-ping" />
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold text-slate-700">Töltés...</h3>
                  <p className="text-slate-400">Pár pillanat és kezdhetjük!</p>
                </div>
              </div>
            }>
            {/* HUB MODULES - Handle their own sets of activities exclusively */}
            {(activityType === 'fractions' || activityType.startsWith('fractions-') || activityType.startsWith('decimal-')) ? (
              <FractionsModule
                onBack={handleBack}
                initialView={activityType}
                onStartActivity={(type) => {
                  handleActivitySelect(type as ActivityType);
                }}
              />
            ) : (activityType === 'grade1-basic' || activityType.startsWith('grade1-')) ? (
              <Grade1MathModule
                onBack={handleBack}
                initialView={activityType}
                onStartActivity={(type) => handleActivitySelect(type as ActivityType)}
              />
            ) : (activityType === 'grade2-basic' || activityType.startsWith('grade2-')) ? (
              <Grade2MathModule
                onBack={handleBack}
                initialView={activityType}
                onStartActivity={(type) => handleActivitySelect(type as ActivityType)}
              />
            ) : (
              /* NON-HUB ACTIVITIES - Rendered individually */
              <div className="space-y-6">
                {activityType === 'grade3-addition-quiz' && (
                  <MathQuiz onBack={handleBack} grade={3} type="addition" />
                )}
                {activityType === 'grade3-subtraction-quiz' && (
                  <MathQuiz onBack={handleBack} grade={3} type="subtraction" />
                )}
                {activityType === 'grade3-multiplication-quiz' && (
                  <MathQuiz onBack={handleBack} grade={3} type="multiplication" />
                )}
                {activityType === 'grade3-division-quiz' && (
                  <MathQuiz onBack={handleBack} grade={3} type="division" />
                )}
                {(activityType === 'grade3-alapmuveletek' || activityType === 'grade3-quiz' || activityType === 'grade3-rounding-quiz' || activityType === 'grade3-word-problems-quiz') && (
                  <MathQuiz onBack={handleBack} grade={3} type="mixed" />
                )}
                {activityType === 'grade3-blocks' && (
                  <BuildingBlocksComparison onBack={handleBack} />
                )}
                {activityType === 'grade3-snake' && (
                  <MathSnakeGame onBack={handleBack} grade={3} />
                )}
                {activityType === 'grade3-tower-builder' && (
                  <TowerBuilderGame onBack={handleBack} grade={3} />
                )}
                {activityType === 'grade3-money-quiz' && (
                  <MoneyCountingQuiz onBack={handleBack} difficulty="easy" />
                )}


                {activityType === 'divisibility' && (
                  <DivisibilityTool onBack={handleBack} />
                )}

                {activityType === 'g5-roman-numerals-theory' && (
                  <Grade5RomanNumeralsTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-roman-numerals-quiz')}
                  />
                )}

                {activityType === 'g5-roman-numerals-quiz' && (
                  <Grade5RomanNumeralsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-roman-numerals-theory')}
                  />
                )}

                {activityType === 'g5-place-value-theory' && (
                  <Grade5PlaceValueTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-place-value-quiz')}
                  />
                )}

                {activityType === 'g5-place-value-quiz' && (
                  <Grade5PlaceValueQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-place-value-theory')}
                  />
                )}

                {activityType === 'g5-number-reading-theory' && (
                  <Grade5NumberReadingTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-number-reading-quiz')}
                  />
                )}

                {activityType === 'g5-number-reading-quiz' && (
                  <Grade5NumberReadingQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-number-reading-theory')}
                  />
                )}

                {activityType === 'g5-number-spelling-theory' && (
                  <Grade5NumberSpellingTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-number-spelling-quiz')}
                  />
                )}

                {activityType === 'g5-number-spelling-quiz' && (
                  <Grade5NumberSpellingQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-number-spelling-theory')}
                  />
                )}

                {activityType === 'g5-number-systems-theory' && (
                  <Grade5NumberSystemsTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-number-systems-quiz')}
                  />
                )}

                {activityType === 'g5-number-systems-quiz' && (
                  <Grade5NumberSystemsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-number-systems-theory')}
                  />
                )}

                {activityType === 'g5-number-line-theory' && (
                  <Grade5NumberLineTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-number-line-quiz')}
                  />
                )}

                {activityType === 'g5-number-line-quiz' && (
                  <Grade5NumberLineQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-number-line-theory')}
                  />
                )}

                {activityType === 'g5-rounding-theory' && (
                  <Grade5RoundingTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-rounding-quiz')}
                  />
                )}

                {activityType === 'g5-rounding-quiz' && (
                  <Grade5RoundingQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-rounding-theory')}
                  />
                )}

                {activityType === 'g5-addition-theory' && (
                  <Grade5AdditionTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-addition-quiz')}
                  />
                )}

                {activityType === 'g5-addition-quiz' && (
                  <Grade5AdditionQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-addition-theory')}
                  />
                )}

                {activityType === 'g5-subtraction-theory' && (
                  <Grade5SubtractionTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-subtraction-quiz')}
                  />
                )}

                {activityType === 'g5-subtraction-quiz' && (
                  <Grade5SubtractionQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-subtraction-theory')}
                  />
                )}

                {activityType === 'g5-multiplication-theory' && (
                  <Grade5MultiplicationTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-multiplication-quiz')}
                  />
                )}

                {activityType === 'g5-multiplication-quiz' && (
                  <Grade5MultiplicationQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-multiplication-theory')}
                  />
                )}

                {activityType === 'g5-division-theory' && (
                  <Grade5DivisionTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-division-quiz')}
                  />
                )}

                {activityType === 'g5-division-quiz' && (
                  <Grade5DivisionQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-division-theory')}
                  />
                )}

                {activityType === 'g5-order-of-operations-theory' && (
                  <Grade5OrderOfOperationsTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-order-of-operations-quiz')}
                  />
                )}

                {activityType === 'g5-order-of-operations-quiz' && (
                  <Grade5OrderOfOperationsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-order-of-operations-theory')}
                  />
                )}

                {activityType === 'g5-negative-numbers-theory' && (
                  <Grade5NegativeNumbersTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-negative-numbers-quiz')}
                  />
                )}

                {activityType === 'g5-negative-numbers-quiz' && (
                  <Grade5NegativeNumbersQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-negative-numbers-theory')}
                  />
                )}

                {activityType === 'g5-opposite-absolute-theory' && (
                  <Grade5OppositeAbsoluteTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-opposite-absolute-quiz')}
                  />
                )}

                {activityType === 'g5-opposite-absolute-quiz' && (
                  <Grade5OppositeAbsoluteQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-opposite-absolute-theory')}
                  />
                )}

                {activityType === 'g5-integer-addition-subtraction-theory' && (
                  <Grade5IntegerAdditionSubtractionTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-integer-addition-subtraction-quiz')}
                  />
                )}

                {activityType === 'g5-integer-addition-subtraction-quiz' && (
                  <Grade5IntegerAdditionSubtractionQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-integer-addition-subtraction-theory')}
                  />
                )}

                {activityType === 'g5-chapter1-summary-theory' && (
                  <Grade5Chapter1SummaryTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-chapter1-summary-quiz')}
                  />
                )}

                {activityType === 'g5-chapter1-summary-quiz' && (
                  <Grade5Chapter1SummaryQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-chapter1-summary-theory')}
                  />
                )}

                {activityType === 'g5-fractions-intro-theory' && (
                  <Grade5FractionsIntroTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-fractions-intro-quiz')}
                  />
                )}

                {activityType === 'g5-fractions-intro-quiz' && (
                  <Grade5FractionsIntroQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-fractions-intro-theory')}
                  />
                )}

                {activityType === 'g5-fractions-expand-simplify-theory' && (
                  <Grade5FractionsExpandSimplifyTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-fractions-expand-simplify-quiz')}
                  />
                )}

                {activityType === 'g5-fractions-expand-simplify-quiz' && (
                  <Grade5FractionsExpandSimplifyQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-fractions-expand-simplify-theory')}
                  />
                )}

                {activityType === 'g5-fractions-number-line-theory' && (
                  <Grade5FractionsNumberLineTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-fractions-number-line-quiz')}
                  />
                )}

                {activityType === 'g5-fractions-number-line-quiz' && (
                  <Grade5FractionsNumberLineQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-fractions-number-line-theory')}
                  />
                )}

                {activityType === 'g5-fractions-same-denom-theory' && (
                  <Grade5FractionsSameDenomTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-fractions-same-denom-quiz')}
                  />
                )}

                {activityType === 'g5-fractions-same-denom-quiz' && (
                  <Grade5FractionsSameDenomQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-fractions-same-denom-theory')}
                  />
                )}

                {activityType === 'g5-fractions-diff-denom-theory' && (
                  <Grade5FractionsDiffDenomTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-fractions-diff-denom-quiz')}
                  />
                )}

                {activityType === 'g5-fractions-diff-denom-quiz' && (
                  <Grade5FractionsDiffDenomQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-fractions-diff-denom-theory')}
                  />
                )}

                {activityType === 'g5-fraction-multiply-theory' && (
                  <Grade5FractionMultiplyTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-fraction-multiply-quiz')}
                  />
                )}

                 {activityType === 'g5-fraction-multiply-quiz' && (
                  <Grade5FractionMultiplyQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-fraction-multiply-theory')}
                  />
                )}

                {activityType === 'g5-fraction-divide-theory' && (
                  <Grade5FractionDivideTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-fraction-divide-quiz')}
                  />
                )}

                {activityType === 'g5-fraction-divide-quiz' && (
                  <Grade5FractionDivideQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-fraction-divide-theory')}
                  />
                )}

                {activityType === 'g5-fractions-order-of-operations-theory' && (
                  <Grade5OrderOfOperationsFractionsTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-fractions-order-of-operations-quiz')}
                  />
                )}

                {activityType === 'g5-fractions-order-of-operations-quiz' && (
                  <Grade5OrderOfOperationsFractionsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-fractions-order-of-operations-theory')}
                  />
                )}

                {activityType === 'g5-fractions-review-theory' && (
                  <Grade5FractionsReviewTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-fractions-review-quiz')}
                  />
                )}

                {activityType === 'g5-fractions-review-quiz' && (
                  <Grade5FractionsReviewQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-fractions-review-theory')}
                  />
                )}

                {activityType === 'g5-decimal-fractions-theory' && (
                  <Grade5DecimalFractionsTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-decimal-fractions-quiz')}
                  />
                )}

                {activityType === 'g5-decimal-fractions-quiz' && (
                  <Grade5DecimalFractionsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-decimal-fractions-theory')}
                  />
                )}

                {activityType === 'g5-decimal-compare-rounding-theory' && (
                  <Grade5DecimalCompareRoundingTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-decimal-compare-rounding-quiz')}
                  />
                )}

                {activityType === 'g5-decimal-compare-rounding-quiz' && (
                  <Grade5DecimalCompareRoundingQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-decimal-compare-rounding-theory')}
                  />
                )}

                {activityType === 'g5-decimal-add-sub-theory' && (
                  <Grade5DecimalAdditionSubtractionTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-decimal-add-sub-quiz')}
                  />
                )}

                {activityType === 'g5-decimal-add-sub-quiz' && (
                  <Grade5DecimalAdditionSubtractionQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-decimal-add-sub-theory')}
                  />
                )}

                {activityType === 'g5-decimal-multiply-theory' && (
                  <Grade5DecimalMultiplicationTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-decimal-multiply-quiz')}
                  />
                )}

                {activityType === 'g5-decimal-multiply-quiz' && (
                  <Grade5DecimalMultiplicationQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-decimal-multiply-theory')}
                  />
                )}

                {activityType === 'g5-decimal-divide-theory' && (
                  <Grade5DecimalDivisionTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-decimal-divide-quiz')}
                  />
                )}

                {activityType === 'g5-decimal-divide-quiz' && (
                  <Grade5DecimalDivisionQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-decimal-divide-theory')}
                  />
                )}

                {activityType === 'g5-fraction-to-decimal-theory' && (
                  <Grade5FractionToDecimalTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-fraction-to-decimal-quiz')}
                  />
                )}

                {activityType === 'g5-fraction-to-decimal-quiz' && (
                  <Grade5FractionToDecimalQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-fraction-to-decimal-theory')}
                  />
                )}

                {activityType === 'g5-chapter2-summary-theory' && (
                  <Grade5Chapter2SummaryTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-chapter2-summary-quiz')}
                  />
                )}

                {activityType === 'g5-chapter2-summary-quiz' && (
                  <Grade5Chapter2SummaryQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-chapter2-summary-theory')}
                  />
                )}

                {activityType === 'g5-geom-grouping-theory' && (
                  <Grade5GroupingTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-geom-grouping-quiz')}
                  />
                )}

                {activityType === 'g5-geom-grouping-quiz' && (
                  <Grade5GroupingQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-geom-grouping-theory')}
                  />
                )}

                {activityType === 'g5-geom-sets-theory' && (
                  <Grade5SetsTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-geom-sets-quiz')}
                  />
                )}

                {activityType === 'g5-geom-sets-quiz' && (
                  <Grade5SetsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-geom-sets-theory')}
                  />
                )}

                {activityType === 'g5-geom-bodies-theory' && (
                  <Grade5BodiesTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-geom-bodies-quiz')}
                  />
                )}

                {activityType === 'g5-geom-bodies-quiz' && (
                  <Grade5BodiesQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-geom-bodies-theory')}
                  />
                )}

                {activityType === 'g5-geom-angles-theory' && (
                  <Grade5AnglesTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-geom-angles-quiz')}
                  />
                )}

                {activityType === 'g5-geom-angles-quiz' && (
                  <Grade5AnglesQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-geom-angles-theory')}
                  />
                )}

                {activityType === 'g5-geom-triangles-theory' && (
                  <Grade5PolygonsTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-geom-triangles-quiz')}
                  />
                )}

                {activityType === 'g5-geom-triangles-quiz' && (
                  <Grade5PolygonsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-geom-triangles-theory')}
                  />
                )}

                {activityType === 'g5-geom-building-theory' && (
                  <Grade5BuildingTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-geom-building-quiz')}
                  />
                )}

                {activityType === 'g5-geom-building-quiz' && (
                  <Grade5BuildingQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-geom-building-theory')}
                  />
                )}

                {activityType === 'g5-geom-lines-theory' && (
                  <Grade5LinesTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-geom-lines-quiz')}
                  />
                )}

                {activityType === 'g5-geom-lines-quiz' && (
                  <Grade5LinesQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-geom-lines-theory')}
                  />
                )}

                {activityType === 'g5-geom-quads-theory' && (
                  <Grade5QuadsTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-geom-quads-quiz')}
                  />
                )}

                {activityType === 'g5-geom-quads-quiz' && (
                  <Grade5QuadsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-geom-quads-theory')}
                  />
                )}

                {activityType === 'g5-geom-summary-theory' && (
                  <Grade5SummaryTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-geom-summary-quiz')}
                  />
                )}

                {activityType === 'g5-geom-summary-quiz' && (
                  <Grade5SummaryQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-geom-summary-theory')}
                  />
                )}

                {activityType === 'g5-meas-length-theory' && (
                  <Grade5LengthTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-meas-length-quiz')}
                    onSwitchToQuiz={() => setActivityType('g5-meas-length-quiz')}
                  />
                )}

                {activityType === 'g5-meas-length-quiz' && (
                  <Grade5LengthQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-length-theory')}
                  />
                )}

                {activityType === 'g5-meas-length-matcher' && (
                  <Grade5LengthMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-length-theory')}
                  />
                )}

                {activityType === 'g5-meas-length-sorter' && (
                  <Grade5LengthSorter
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-length-theory')}
                  />
                )}

                {activityType === 'g5-meas-perimeter-theory' && (
                  <Grade5PerimeterTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-meas-perimeter-quiz')}
                    onSwitchToQuiz={() => setActivityType('g5-meas-perimeter-quiz')}
                  />
                )}

                {activityType === 'g5-meas-perimeter-quiz' && (
                  <Grade5PerimeterQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-perimeter-theory')}
                  />
                )}

                {activityType === 'g5-meas-perimeter-matcher' && (
                  <Grade5PerimeterMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-perimeter-theory')}
                  />
                )}

                {activityType === 'g5-meas-perimeter-sorter' && (
                  <Grade5PerimeterSorter
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-perimeter-theory')}
                  />
                )}

                {activityType === 'g5-meas-area-theory' && (
                  <Grade5AreaTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-meas-area-quiz')}
                    onSwitchToQuiz={() => setActivityType('g5-meas-area-quiz')}
                  />
                )}

                {activityType === 'g5-meas-area-quiz' && (
                  <Grade5AreaQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-area-theory')}
                  />
                )}

                {activityType === 'g5-meas-area-matcher' && (
                  <Grade5AreaMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-area-theory')}
                  />
                )}

                {activityType === 'g5-meas-area-sorter' && (
                  <Grade5AreaSorter
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-area-theory')}
                  />
                )}

                {activityType === 'g5-meas-rectangle-area-theory' && (
                  <Grade5RectangleAreaTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-meas-rectangle-area-quiz')}
                    onSwitchToQuiz={() => setActivityType('g5-meas-rectangle-area-quiz')}
                  />
                )}

                {activityType === 'g5-meas-rectangle-area-quiz' && (
                  <Grade5RectangleAreaQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-rectangle-area-theory')}
                  />
                )}

                {activityType === 'g5-meas-rectangle-area-matcher' && (
                  <Grade5RectangleAreaMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-rectangle-area-theory')}
                  />
                )}

                {activityType === 'g5-meas-rectangle-area-sorter' && (
                  <Grade5RectangleAreaSorter
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-rectangle-area-theory')}
                  />
                )}

                {activityType === 'g5-meas-cuboid-cube-theory' && (
                  <Grade5CuboidCubeTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-meas-cuboid-cube-quiz')}
                    onSwitchToQuiz={() => setActivityType('g5-meas-cuboid-cube-quiz')}
                  />
                )}

                {activityType === 'g5-meas-cuboid-cube-quiz' && (
                  <Grade5CuboidCubeQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-cuboid-cube-theory')}
                  />
                )}

                {activityType === 'g5-meas-cuboid-cube-matcher' && (
                  <Grade5CuboidCubeMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-cuboid-cube-theory')}
                  />
                )}

                {activityType === 'g5-meas-cuboid-cube-sorter' && (
                  <Grade5CuboidCubeSorter
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-cuboid-cube-theory')}
                  />
                )}

                {activityType === 'g5-meas-surface-area-theory' && (
                  <Grade5SurfaceAreaTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-meas-surface-area-quiz')}
                    onSwitchToQuiz={() => setActivityType('g5-meas-surface-area-quiz')}
                  />
                )}

                {activityType === 'g5-meas-surface-area-quiz' && (
                  <Grade5SurfaceAreaQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-surface-area-theory')}
                  />
                )}

                {activityType === 'g5-meas-surface-area-matcher' && (
                  <Grade5SurfaceAreaMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-surface-area-theory')}
                  />
                )}

                {activityType === 'g5-meas-surface-area-sorter' && (
                  <Grade5SurfaceAreaSorter
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-surface-area-theory')}
                  />
                )}

                {activityType === 'g5-meas-volume-measure-theory' && (
                  <Grade5VolumeMeasureTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-meas-volume-measure-quiz')}
                    onSwitchToQuiz={() => setActivityType('g5-meas-volume-measure-quiz')}
                  />
                )}

                {activityType === 'g5-meas-volume-measure-quiz' && (
                  <Grade5VolumeMeasureQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-volume-measure-theory')}
                  />
                )}

                {activityType === 'g5-meas-volume-measure-matcher' && (
                  <Grade5VolumeMeasureMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-volume-measure-theory')}
                  />
                )}

                {activityType === 'g5-meas-volume-measure-sorter' && (
                  <Grade5VolumeMeasureSorter
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-volume-measure-theory')}
                  />
                )}

                {activityType === 'g5-meas-cuboid-cube-volume-theory' && (
                  <Grade5CuboidCubeVolumeTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-meas-cuboid-cube-volume-quiz')}
                    onSwitchToQuiz={() => setActivityType('g5-meas-cuboid-cube-volume-quiz')}
                  />
                )}

                {activityType === 'g5-meas-cuboid-cube-volume-quiz' && (
                  <Grade5CuboidCubeVolumeQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-cuboid-cube-volume-theory')}
                  />
                )}

                {activityType === 'g5-meas-cuboid-cube-volume-matcher' && (
                  <Grade5CuboidCubeVolumeMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-cuboid-cube-volume-theory')}
                  />
                )}

                {activityType === 'g5-meas-cuboid-cube-volume-sorter' && (
                  <Grade5CuboidCubeVolumeSorter
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-cuboid-cube-volume-theory')}
                  />
                )}

                {activityType === 'g5-meas-practical-theory' && (
                  <Grade5PracticalTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-meas-practical-quiz')}
                    onSwitchToQuiz={() => setActivityType('g5-meas-practical-quiz')}
                  />
                )}

                {activityType === 'g5-meas-practical-quiz' && (
                  <Grade5PracticalQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-practical-theory')}
                  />
                )}

                {activityType === 'g5-meas-practical-matcher' && (
                  <Grade5PracticalMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-practical-theory')}
                  />
                )}

                {activityType === 'g5-meas-practical-sorter' && (
                  <Grade5PracticalSorter
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-practical-theory')}
                  />
                )}

                {activityType === 'g5-meas-summary-theory' && (
                  <Grade5MeasurementSummaryTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-meas-summary-quiz')}
                    onSwitchToQuiz={() => setActivityType('g5-meas-summary-quiz')}
                  />
                )}

                {activityType === 'g5-meas-summary-quiz' && (
                  <Grade5MeasurementSummaryQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-summary-theory')}
                  />
                )}

                {activityType === 'g5-meas-summary-matcher' && (
                  <Grade5MeasurementSummaryMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-summary-theory')}
                  />
                )}

                {activityType === 'g5-meas-summary-sorter' && (
                  <Grade5MeasurementSummarySorter
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-meas-summary-theory')}
                  />
                )}

                {activityType === 'g5-loc-role-theory' && (
                  <Grade5LocationRoleTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-loc-role-quiz')}
                    onSwitchToQuiz={() => setActivityType('g5-loc-role-quiz')}
                  />
                )}

                {activityType === 'g5-loc-role-quiz' && (
                  <Grade5LocationRoleQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-role-theory')}
                  />
                )}

                {activityType === 'g5-loc-role-matcher' && (
                  <Grade5LocationRoleMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-role-theory')}
                  />
                )}

                {activityType === 'g5-loc-role-sorter' && (
                  <Grade5LocationRoleSorter
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-role-theory')}
                  />
                )}

                {activityType === 'g5-loc-grid-theory' && (
                  <Grade5GridLocationTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-loc-grid-quiz')}
                    onSwitchToQuiz={() => setActivityType('g5-loc-grid-quiz')}
                  />
                )}

                {activityType === 'g5-loc-grid-quiz' && (
                  <Grade5GridLocationQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-grid-theory')}
                  />
                )}

                {activityType === 'g5-loc-grid-matcher' && (
                  <Grade5GridLocationMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-grid-theory')}
                  />
                )}

                {activityType === 'g5-loc-grid-sorter' && (
                  <Grade5GridLocationSorter
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-grid-theory')}
                  />
                )}

                {activityType === 'g5-loc-coord-sys-theory' && (
                  <Grade5CoordinateSystemTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-loc-coord-sys-quiz')}
                    onSwitchToQuiz={() => setActivityType('g5-loc-coord-sys-quiz')}
                  />
                )}

                {activityType === 'g5-loc-coord-sys-quiz' && (
                  <Grade5CoordinateSystemQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-coord-sys-theory')}
                  />
                )}

                {activityType === 'g5-loc-coord-sys-matcher' && (
                  <Grade5CoordinateSystemMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-coord-sys-theory')}
                  />
                )}

                {activityType === 'g5-loc-coord-sys-sorter' && (
                  <Grade5CoordinateSystemSorter
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-coord-sys-theory')}
                  />
                )}

                {activityType === 'g5-loc-points-theory' && (
                  <Grade5PointPlottingTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-loc-points-quiz')}
                    onSwitchToQuiz={() => setActivityType('g5-loc-points-quiz')}
                  />
                )}

                {activityType === 'g5-loc-points-quiz' && (
                  <Grade5PointPlottingQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-points-theory')}
                  />
                )}

                {activityType === 'g5-loc-points-matcher' && (
                  <Grade5PointPlottingMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-points-theory')}
                  />
                )}

                {activityType === 'g5-loc-points-sorter' && (
                  <Grade5PointPlottingSorter
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-points-theory')}
                  />
                )}

                {activityType === 'g5-loc-spatial-theory' && (
                  <Grade5SpatialOrientationTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-loc-spatial-quiz')}
                    onSwitchToQuiz={() => setActivityType('g5-loc-spatial-quiz')}
                  />
                )}

                {activityType === 'g5-loc-spatial-quiz' && (
                  <Grade5SpatialOrientationQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-spatial-theory')}
                  />
                )}

                {activityType === 'g5-loc-spatial-matcher' && (
                  <Grade5SpatialOrientationMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-spatial-theory')}
                  />
                )}

                {activityType === 'g5-loc-spatial-sorter' && (
                  <Grade5SpatialOrientationSorter
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-spatial-theory')}
                  />
                )}

                {activityType === 'g5-loc-patterns-theory' && (
                  <Grade5RhythmPatternsTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-loc-patterns-quiz')}
                    onSwitchToQuiz={() => setActivityType('g5-loc-patterns-quiz')}
                  />
                )}

                {activityType === 'g5-loc-patterns-quiz' && (
                  <Grade5RhythmPatternsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-patterns-theory')}
                  />
                )}

                {activityType === 'g5-loc-patterns-matcher' && (
                  <Grade5RhythmPatternsMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-patterns-theory')}
                  />
                )}

                {activityType === 'g5-loc-patterns-sorter' && (
                  <Grade5RhythmPatternsSorter
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-patterns-theory')}
                  />
                )}

                {activityType === 'g5-loc-relations-theory' && (
                  <Grade5RelationsTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-loc-relations-quiz')}
                    onSwitchToQuiz={() => setActivityType('g5-loc-relations-quiz')}
                  />
                )}

                {activityType === 'g5-loc-relations-quiz' && (
                  <Grade5RelationsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-relations-theory')}
                  />
                )}

                {activityType === 'g5-loc-relations-matcher' && (
                  <Grade5RelationsMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-relations-theory')}
                  />
                )}

                {activityType === 'g5-loc-relations-sorter' && (
                  <Grade5RelationsSorter
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-relations-theory')}
                  />
                )}

                {activityType === 'g5-loc-sequences-theory' && (
                  <Grade5SequencesTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-loc-sequences-quiz')}
                    onSwitchToQuiz={() => setActivityType('g5-loc-sequences-quiz')}
                  />
                )}

                {activityType === 'g5-loc-sequences-quiz' && (
                  <Grade5SequencesQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-sequences-theory')}
                  />
                )}

                {activityType === 'g5-loc-sequences-matcher' && (
                  <Grade5SequencesMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-sequences-theory')}
                  />
                )}

                {activityType === 'g5-loc-sequences-sorter' && (
                  <Grade5SequencesSorter
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-sequences-theory')}
                  />
                )}

                {activityType === 'g5-loc-famous-seq-theory' && (
                  <Grade5FamousSequencesTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-loc-famous-seq-quiz')}
                    onSwitchToQuiz={() => setActivityType('g5-loc-famous-seq-quiz')}
                  />
                )}

                {activityType === 'g5-loc-famous-seq-quiz' && (
                  <Grade5FamousSequencesQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-famous-seq-theory')}
                  />
                )}

                {activityType === 'g5-loc-famous-seq-matcher' && (
                  <Grade5FamousSequencesMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-famous-seq-theory')}
                  />
                )}

                {activityType === 'g5-loc-famous-seq-sorter' && (
                  <Grade5FamousSequencesSorter
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-famous-seq-theory')}
                  />
                )}

                {activityType === 'g5-loc-summary-theory' && (
                  <Grade5LocationSummaryTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g5-loc-summary-quiz')}
                    onSwitchToQuiz={() => setActivityType('g5-loc-summary-quiz')}
                  />
                )}

                {activityType === 'g5-loc-summary-quiz' && (
                  <Grade5LocationSummaryQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-summary-theory')}
                  />
                )}

                {activityType === 'g5-loc-summary-matcher' && (
                  <Grade5LocationSummaryMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-summary-theory')}
                  />
                )}

                {activityType === 'g5-loc-summary-sorter' && (
                  <Grade5LocationSummarySorter
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g5-loc-summary-theory')}
                  />
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

                {(activityType === 'tower-builder' || activityType === 'grade2-blocks' || activityType === 'grade3-blocks' || activityType === 'grade3-tower-builder') && (
                  <TowerBuilderGame onBack={handleBack} grade={typeof selectedGrade === 'number' && selectedGrade <= 4 ? selectedGrade : 1} />
                )}

                {(activityType === 'coloring' || activityType === 'grade2-coloring' || activityType === 'grade3-coloring') && (
                  <MathColoringGame onBack={handleBack} grade={typeof selectedGrade === 'number' && selectedGrade <= 4 ? selectedGrade : 1} />
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

                {activityType === 'g6-planar-shapes-theory' && (
                  <Grade6PlanarShapesTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g6-planar-shapes-quiz')}
                  />
                )}

                {activityType === 'g6-planar-shapes-quiz' && (
                  <Grade6PlanarShapesQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g6-planar-shapes-theory')}
                  />
                )}

                {activityType === 'g6-planar-shapes-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6PlanarShapesMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => setActivityType('g6-planar-shapes-quiz')}
                      onSwitchToSorter={() => setActivityType('g6-planar-shapes-sorter')}
                      onSwitchToTheory={() => setActivityType('g6-planar-shapes-theory')}
                    />
                  </div>
                )}

                {activityType === 'g6-planar-shapes-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6PlanarShapesSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => setActivityType('g6-planar-shapes-quiz')}
                      onSwitchToMatcher={() => setActivityType('g6-planar-shapes-matcher')}
                      onSwitchToTheory={() => setActivityType('g6-planar-shapes-theory')}
                    />
                  </div>
                )}

                {activityType === 'g6-congruence-theory' && (
                  <Grade6CongruenceTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g6-congruence-quiz')}
                  />
                )}

                {activityType === 'g6-congruence-quiz' && (
                  <Grade6CongruenceQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g6-congruence-theory')}
                  />
                )}

                {activityType === 'g6-congruence-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6CongruenceMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => setActivityType('g6-congruence-quiz')}
                      onSwitchToSorter={() => setActivityType('g6-congruence-sorter')}
                      onSwitchToTheory={() => setActivityType('g6-congruence-theory')}
                    />
                  </div>
                )}

                {activityType === 'g6-congruence-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6CongruenceSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => setActivityType('g6-congruence-quiz')}
                      onSwitchToMatcher={() => setActivityType('g6-congruence-matcher')}
                      onSwitchToTheory={() => setActivityType('g6-congruence-theory')}
                    />
                  </div>
                )}

                {activityType === 'g6-circle-theory' && (
                  <Grade6CircleTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g6-circle-quiz')}
                  />
                )}

                {activityType === 'g6-circle-quiz' && (
                  <Grade6CircleQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g6-circle-theory')}
                  />
                )}

                {activityType === 'g6-circle-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6CircleMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => setActivityType('g6-circle-quiz')}
                      onSwitchToSorter={() => setActivityType('g6-circle-sorter')}
                      onSwitchToTheory={() => setActivityType('g6-circle-theory')}
                    />
                  </div>
                )}

                {activityType === 'g6-circle-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6CircleSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => setActivityType('g6-circle-quiz')}
                      onSwitchToMatcher={() => setActivityType('g6-circle-matcher')}
                      onSwitchToTheory={() => setActivityType('g6-circle-theory')}
                    />
                  </div>
                )}

                {activityType === 'g6-bisector-theory' && (
                  <Grade6BisectorTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g6-bisector-quiz')}
                  />
                )}

                {activityType === 'g6-bisector-quiz' && (
                  <Grade6BisectorQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g6-bisector-theory')}
                  />
                )}

                {activityType === 'g6-bisector-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6BisectorMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => setActivityType('g6-bisector-quiz')}
                      onSwitchToSorter={() => setActivityType('g6-bisector-sorter')}
                      onSwitchToTheory={() => setActivityType('g6-bisector-theory')}
                    />
                  </div>
                )}

                {activityType === 'g6-bisector-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6BisectorSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => setActivityType('g6-bisector-quiz')}
                      onSwitchToMatcher={() => setActivityType('g6-bisector-matcher')}
                      onSwitchToTheory={() => setActivityType('g6-bisector-theory')}
                    />
                  </div>
                )}

                {activityType === 'g6-constructions-theory' && (
                  <Grade6ConstructionsTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g6-constructions-quiz')}
                  />
                )}

                {activityType === 'g6-constructions-quiz' && (
                  <Grade6ConstructionsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g6-constructions-theory')}
                  />
                )}

                {activityType === 'g6-constructions-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6ConstructionsMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => setActivityType('g6-constructions-quiz')}
                      onSwitchToSorter={() => setActivityType('g6-constructions-sorter')}
                      onSwitchToTheory={() => setActivityType('g6-constructions-theory')}
                    />
                  </div>
                )}

                {activityType === 'g6-constructions-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6ConstructionsSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => setActivityType('g6-constructions-quiz')}
                      onSwitchToMatcher={() => setActivityType('g6-constructions-matcher')}
                      onSwitchToTheory={() => setActivityType('g6-constructions-theory')}
                    />
                  </div>
                )}

                {activityType === 'g6-axial-reflection-theory' && (
                  <Grade6AxialReflectionTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g6-axial-reflection-quiz')}
                  />
                )}

                {activityType === 'g6-axial-reflection-quiz' && (
                  <Grade6AxialReflectionQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g6-axial-reflection-theory')}
                  />
                )}

                {activityType === 'g6-axial-reflection-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6AxialReflectionMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => setActivityType('g6-axial-reflection-quiz')}
                      onSwitchToSorter={() => setActivityType('g6-axial-reflection-sorter')}
                      onSwitchToTheory={() => setActivityType('g6-axial-reflection-theory')}
                    />
                  </div>
                )}

                {activityType === 'g6-axial-reflection-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6AxialReflectionSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => setActivityType('g6-axial-reflection-quiz')}
                      onSwitchToMatcher={() => setActivityType('g6-axial-reflection-matcher')}
                      onSwitchToTheory={() => setActivityType('g6-axial-reflection-theory')}
                    />
                  </div>
                )}

                {activityType === 'g6-reflection-properties-theory' && (
                  <Grade6ReflectionPropertiesTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g6-reflection-properties-quiz')}
                  />
                )}

                {activityType === 'g6-reflection-properties-quiz' && (
                  <Grade6ReflectionPropertiesQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g6-reflection-properties-theory')}
                  />
                )}

                {activityType === 'g6-reflection-properties-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6ReflectionPropertiesMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => setActivityType('g6-reflection-properties-quiz')}
                      onSwitchToSorter={() => setActivityType('g6-reflection-properties-sorter')}
                      onSwitchToTheory={() => setActivityType('g6-reflection-properties-theory')}
                    />
                  </div>
                )}

                {activityType === 'g6-reflection-properties-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6ReflectionPropertiesSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => setActivityType('g6-reflection-properties-quiz')}
                      onSwitchToMatcher={() => setActivityType('g6-reflection-properties-matcher')}
                      onSwitchToTheory={() => setActivityType('g6-reflection-properties-theory')}
                    />
                  </div>
                )}

                {activityType === 'g6-axial-symmetry-theory' && (
                  <Grade6AxialSymmetryTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g6-axial-symmetry-quiz')}
                  />
                )}

                {activityType === 'g6-axial-symmetry-quiz' && (
                  <Grade6AxialSymmetryQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g6-axial-symmetry-theory')}
                  />
                )}

                {activityType === 'g6-axial-symmetry-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6AxialSymmetryMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => setActivityType('g6-axial-symmetry-quiz')}
                      onSwitchToSorter={() => setActivityType('g6-axial-symmetry-sorter')}
                      onSwitchToTheory={() => setActivityType('g6-axial-symmetry-theory')}
                    />
                  </div>
                )}

                {activityType === 'g6-axial-symmetry-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6AxialSymmetrySorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => setActivityType('g6-axial-symmetry-quiz')}
                      onSwitchToMatcher={() => setActivityType('g6-axial-symmetry-matcher')}
                      onSwitchToTheory={() => setActivityType('g6-axial-symmetry-theory')}
                    />
                  </div>
                )}

                {activityType === 'g6-symmetric-shapes-theory' && (
                  <Grade6SymmetricShapesTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g6-symmetric-shapes-quiz')}
                  />
                )}

                {activityType === 'g6-symmetric-shapes-quiz' && (
                  <Grade6SymmetricShapesQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g6-symmetric-shapes-theory')}
                  />
                )}

                {activityType === 'g6-symmetric-shapes-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6SymmetricShapesMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => setActivityType('g6-symmetric-shapes-quiz')}
                      onSwitchToSorter={() => setActivityType('g6-symmetric-shapes-sorter')}
                      onSwitchToTheory={() => setActivityType('g6-symmetric-shapes-theory')}
                    />
                  </div>
                )}

                {activityType === 'g6-symmetric-shapes-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6SymmetricShapesSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => setActivityType('g6-symmetric-shapes-quiz')}
                      onSwitchToMatcher={() => setActivityType('g6-symmetric-shapes-matcher')}
                      onSwitchToTheory={() => setActivityType('g6-symmetric-shapes-theory')}
                    />
                  </div>
                )}

                {activityType === 'g6-construction-tasks-theory' && (
                  <Grade6ConstructionTasksTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g6-construction-tasks-quiz')}
                  />
                )}

                {activityType === 'g6-construction-tasks-quiz' && (
                  <Grade6ConstructionTasksQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g6-construction-tasks-theory')}
                  />
                )}

                {activityType === 'g6-construction-tasks-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6ConstructionTasksMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => setActivityType('g6-construction-tasks-quiz')}
                      onSwitchToSorter={() => setActivityType('g6-construction-tasks-sorter')}
                      onSwitchToTheory={() => setActivityType('g6-construction-tasks-theory')}
                    />
                  </div>
                )}

                {activityType === 'g6-construction-tasks-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6ConstructionTasksSorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => setActivityType('g6-construction-tasks-quiz')}
                      onSwitchToMatcher={() => setActivityType('g6-construction-tasks-matcher')}
                      onSwitchToTheory={() => setActivityType('g6-construction-tasks-theory')}
                    />
                  </div>
                )}

                {activityType === 'g6-geometry-summary-theory' && (
                  <Grade6GeometrySummaryTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g6-geometry-summary-quiz')}
                  />
                )}

                {activityType === 'g6-geometry-summary-quiz' && (
                  <Grade6GeometrySummaryQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g6-geometry-summary-theory')}
                  />
                )}

                {activityType === 'g6-geometry-summary-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6GeometrySummaryMatcher
                      onBack={handleBack}
                      onSwitchToQuiz={() => setActivityType('g6-geometry-summary-quiz')}
                      onSwitchToSorter={() => setActivityType('g6-geometry-summary-sorter')}
                      onSwitchToTheory={() => setActivityType('g6-geometry-summary-theory')}
                    />
                  </div>
                )}

                {activityType === 'g6-geometry-summary-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6GeometrySummarySorter
                      onBack={handleBack}
                      onSwitchToQuiz={() => setActivityType('g6-geometry-summary-quiz')}
                      onSwitchToMatcher={() => setActivityType('g6-geometry-summary-matcher')}
                      onSwitchToTheory={() => setActivityType('g6-geometry-summary-theory')}
                    />
                  </div>
                )}

                {activityType === 'g6-integers-operations-theory' && (
                  <Grade6OperationsTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g6-integers-operations-quiz')}
                  />
                )}

                {activityType === 'g6-integers-operations-quiz' && (
                  <Grade6OperationsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g6-integers-operations-theory')}
                  />
                )}

                {activityType === 'g6-integers-mult-theory' && (
                  <Grade6MultiplicationTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g6-integers-mult-quiz')}
                  />
                )}

                {activityType === 'g6-integers-mult-quiz' && (
                  <Grade6MultiplicationQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g6-integers-mult-theory')}
                  />
                )}

                {activityType === 'g6-integers-div-theory' && (
                  <Grade6DivisionTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g6-integers-div-quiz')}
                  />
                )}

                {activityType === 'g6-integers-div-quiz' && (
                  <Grade6DivisionQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g6-integers-div-theory')}
                  />
                )}

                {activityType === 'g6-integers-cases-theory' && (
                  <Grade6CountingPossibilitiesTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g6-integers-cases-quiz')}
                  />
                )}

                {activityType === 'g6-integers-cases-quiz' && (
                  <Grade6CountingPossibilitiesQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g6-integers-cases-theory')}
                  />
                )}

                {activityType === 'g6-integers-divisors-theory' && (
                  <Grade6DivisorsMultiplesTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g6-integers-divisors-quiz')}
                  />
                )}

                {activityType === 'g6-integers-divisors-quiz' && (
                  <Grade6DivisorsMultiplesQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g6-integers-divisors-theory')}
                  />
                )}

                {activityType === 'g6-integers-remainders-theory' && (
                  <Grade6RemaindersTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g6-integers-remainders-quiz')}
                  />
                )}

                {activityType === 'g6-integers-remainders-quiz' && (
                  <Grade6RemaindersQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g6-integers-remainders-theory')}
                  />
                )}

                {activityType === 'g6-integers-factorization-theory' && (
                  <Grade6PrimeFactorizationTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g6-integers-factorization-quiz')}
                  />
                )}

                {activityType === 'g6-integers-factorization-quiz' && (
                  <Grade6PrimeFactorizationQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g6-integers-factorization-theory')}
                  />
                )}

                {activityType === 'g6-integers-divisibility-2-5-10-theory' && (
                  <Grade6DivisibilityBy2510Theory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g6-integers-divisibility-2-5-10-quiz')}
                  />
                )}

                {activityType === 'g6-integers-divisibility-2-5-10-quiz' && (
                  <Grade6DivisibilityBy2510Quiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g6-integers-divisibility-2-5-10-theory')}
                  />
                )}

                {activityType === 'g6-integers-divisibility-3-9-theory' && (
                  <Grade6DivisibilityBy39Theory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g6-integers-divisibility-3-9-quiz')}
                  />
                )}

                {activityType === 'g6-integers-divisibility-3-9-quiz' && (
                  <Grade6DivisibilityBy39Quiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g6-integers-divisibility-3-9-theory')}
                  />
                )}

                {activityType === 'g6-integers-divisibility-4-100-theory' && (
                  <Grade6DivisibilityBy4100Theory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g6-integers-divisibility-4-100-quiz')}
                  />
                )}

                {activityType === 'g6-integers-divisibility-4-100-quiz' && (
                  <Grade6DivisibilityBy4100Quiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g6-integers-divisibility-4-100-theory')}
                  />
                )}

                {activityType === 'g6-integers-composite-divisibility-theory' && (
                  <Grade6DivisibilityCompositeTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g6-integers-composite-divisibility-quiz')}
                  />
                )}

                {(activityType === 'g6-integers-composite-divisibility-quiz' || activityType === 'divisibility-quiz') && (
                  <Grade6DivisibilityCompositeQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g6-integers-composite-divisibility-theory')}
                  />
                )}

                {activityType === 'g6-integers-lcm-theory' && (
                  <Grade6LCMTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g6-integers-lcm-quiz')}
                  />
                )}

                {(activityType === 'g6-integers-lcm-quiz' || activityType === 'divisibility-lkktquiz') && (
                  <Grade6LCMQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g6-integers-lcm-theory')}
                  />
                )}

                {activityType === 'divisibility-factorization' && (
                  <Grade6PrimeFactorization onBack={handleBack} />
                )}

                {activityType === 'divisibility-matcher' && (
                  <Grade6PrimeFactorizationMatcher onBack={handleBack} />
                )}

                {activityType === 'g6-integers-gcd-theory' && (
                  <Grade6GCDTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g6-integers-gcd-quiz')}
                  />
                )}

                {(activityType === 'g6-integers-gcd-quiz' || activityType === 'divisibility-gcdquiz') && (
                  <Grade6GCDQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g6-integers-gcd-theory')}
                  />
                )}

                {activityType === 'g6-integers-summary-theory' && (
                  <Grade6Chapter1SummaryTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g6-integers-summary-quiz')}
                  />
                )}

                {activityType === 'g6-integers-summary-quiz' && (
                  <Grade6Chapter1SummaryQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g6-integers-summary-theory')}
                  />
                )}

                {/* 7. Osztály - I. Gondolkodjunk! */}
                {activityType === 'g7-logic-count-it-theory' && (
                  <Grade7CountItTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-logic-count-it-quiz')}
                  />
                )}

                {activityType === 'g7-logic-count-it-quiz' && (
                  <Grade7CountItQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-logic-count-it-theory')}
                  />
                )}

                {activityType === 'g7-logic-count-it-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7CountItMatcher onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g7-logic-count-it-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7CountItSorter onNextLevel={handleBack} />
                  </div>
                )}

                {/* Section 2: Rendezd sorba! */}
                {activityType === 'g7-logic-order-it-theory' && (
                  <Grade7OrderItTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-logic-order-it-quiz')}
                  />
                )}

                {activityType === 'g7-logic-order-it-quiz' && (
                  <Grade7OrderItQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-logic-order-it-theory')}
                  />
                )}

                {activityType === 'g7-logic-order-it-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7OrderItMatcher onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g7-logic-order-it-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7OrderItSorter onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g7-logic-how-many-cases-theory' && (
                  <Grade7HowManyCasesTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-logic-how-many-cases-quiz')}
                  />
                )}

                {activityType === 'g7-logic-how-many-cases-quiz' && (
                  <Grade7HowManyCasesQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-logic-how-many-cases-theory')}
                  />
                )}

                {activityType === 'g7-logic-how-many-cases-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7HowManyCasesMatcher onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g7-logic-how-many-cases-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7HowManyCasesSorter onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g7-logic-graphs-theory' && (
                  <Grade7GraphsTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-logic-graphs-quiz')}
                  />
                )}

                {activityType === 'g7-logic-graphs-quiz' && (
                  <Grade7GraphsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-logic-graphs-theory')}
                  />
                )}

                {activityType === 'g7-logic-graphs-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7GraphsMatcher onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g7-logic-graphs-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7GraphsSorter onNextLevel={handleBack} />
                  </div>
                )}

                {/* Section 5: Igazold! Cáfold! */}
                {activityType === 'g7-logic-proofs-theory' && (
                  <Grade7ProofsTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-logic-proofs-quiz')}
                  />
                )}

                {activityType === 'g7-logic-proofs-quiz' && (
                  <Grade7ProofsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-logic-proofs-theory')}
                  />
                )}

                {activityType === 'g7-logic-proofs-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7ProofsMatcher onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g7-logic-proofs-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7ProofsSorter onNextLevel={handleBack} />
                  </div>
                )}

                {/* Section 6: Matematikai játékok */}
                {activityType === 'g7-logic-games-theory' && (
                  <Grade7GamesTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-logic-games-quiz')}
                  />
                )}

                {activityType === 'g7-logic-games-quiz' && (
                  <Grade7GamesQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-logic-games-theory')}
                  />
                )}

                {activityType === 'g7-logic-games-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7GamesMatcher onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g7-logic-games-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7GamesSorter onNextLevel={handleBack} />
                  </div>
                )}

                {/* Section 7: Összefoglalás */}
                {activityType === 'g7-logic-summary-theory' && (
                  <Grade7SummaryTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-logic-summary-quiz')}
                  />
                )}

                {activityType === 'g7-logic-summary-quiz' && (
                  <Grade7SummaryQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-logic-summary-theory')}
                  />
                )}

                {activityType === 'g7-logic-summary-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7SummaryMatcher onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g7-logic-summary-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7SummarySorter onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g7-rat-integer-properties-theory' && (
                  <Grade7IntegerPropertiesTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-rat-integer-properties-quiz')}
                  />
                )}

                {activityType === 'g7-rat-integer-properties-quiz' && (
                  <Grade7IntegerPropertiesQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-rat-integer-properties-theory')}
                  />
                )}

                {activityType === 'g7-rat-integer-properties-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7IntegerPropertiesMatcher onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g7-rat-integer-properties-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7IntegerPropertiesSorter onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g7-rat-fractions-decimals-theory' && (
                  <Grade7FractionsDecimalsTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-rat-fractions-decimals-quiz')}
                  />
                )}

                {activityType === 'g7-rat-fractions-decimals-quiz' && (
                  <Grade7FractionsDecimalsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-rat-fractions-decimals-theory')}
                  />
                )}

                {activityType === 'g7-rat-fractions-decimals-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7FractionsDecimalsMatcher onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g7-rat-fractions-decimals-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7FractionsDecimalsSorter onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g7-rat-operations-theory' && (
                  <Grade7RationalOperationsTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-rat-operations-quiz')}
                  />
                )}

                {activityType === 'g7-rat-operations-quiz' && (
                  <Grade7RationalOperationsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-rat-operations-theory')}
                  />
                )}

                {activityType === 'g7-rat-operations-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7RationalOperationsMatcher onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g7-rat-operations-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7RationalOperationsSorter onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g7-rat-word-problems-theory' && (
                  <Grade7WordProblemsTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-rat-word-problems-quiz')}
                  />
                )}

                {activityType === 'g7-rat-word-problems-quiz' && (
                  <Grade7WordProblemsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-rat-word-problems-theory')}
                  />
                )}

                {activityType === 'g7-rat-word-problems-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7WordProblemsMatcher onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g7-rat-word-problems-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7WordProblemsSorter onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g7-rat-complex-operations-theory' && (
                  <Grade7ComplexOperationsTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-rat-complex-operations-quiz')}
                  />
                )}

                {activityType === 'g7-rat-complex-operations-quiz' && (
                  <Grade7ComplexOperationsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-rat-complex-operations-theory')}
                  />
                )}

                {activityType === 'g7-rat-complex-operations-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7ComplexOperationsMatcher onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g7-rat-complex-operations-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7ComplexOperationsSorter onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g7-rat-numbers-letters-theory' && (
                  <Grade7NumbersLettersTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-rat-numbers-letters-quiz')}
                  />
                )}

                {activityType === 'g7-rat-numbers-letters-quiz' && (
                  <Grade7NumbersLettersQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-rat-numbers-letters-theory')}
                  />
                )}

                {activityType === 'g7-rat-numbers-letters-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7NumbersLettersMatcher onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g7-rat-numbers-letters-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7NumbersLettersSorter onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g7-rat-combining-substitution-theory' && (
                  <Grade7CombiningSubstitutionTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-rat-combining-substitution-quiz')}
                  />
                )}

                {activityType === 'g7-rat-combining-substitution-quiz' && (
                  <Grade7CombiningSubstitutionQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-rat-combining-substitution-theory')}
                  />
                )}

                {activityType === 'g7-rat-combining-substitution-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7CombiningSubstitutionMatcher onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g7-rat-combining-substitution-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7CombiningSubstitutionSorter onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g7-rat-expansion-factoring-theory' && (
                  <Grade7ExpansionFactoringTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-rat-expansion-factoring-quiz')}
                  />
                )}

                {activityType === 'g7-rat-expansion-factoring-quiz' && (
                  <Grade7ExpansionFactoringQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-rat-expansion-factoring-theory')}
                  />
                )}

                {activityType === 'g7-rat-expansion-factoring-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7ExpansionFactoringMatcher onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g7-rat-expansion-factoring-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7ExpansionFactoringSorter onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g7-rat-summary-theory' && (
                  <Grade7RationalSummaryTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-rat-summary-quiz')}
                  />
                )}

                {activityType === 'g7-rat-summary-quiz' && (
                  <Grade7RationalSummaryQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-rat-summary-theory')}
                  />
                )}

                {activityType === 'g7-rat-summary-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7RationalSummaryMatcher onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g7-rat-summary-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7RationalSummarySorter onNextLevel={handleBack} />
                  </div>
                )}

                {/* 7. Osztály - III. Geometriai transzformációk */}
                {activityType === 'g7-geom-concepts-theory' && (
                  <Grade7GeometricConceptsTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-geom-concepts-quiz')}
                  />
                )}

                {activityType === 'g7-geom-concepts-quiz' && (
                  <Grade7GeometricConceptsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-geom-concepts-theory')}
                  />
                )}

                {activityType === 'g7-geom-concepts-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7GeometricConceptsMatcher onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-concepts-quiz')} />
                  </div>
                )}

                {activityType === 'g7-geom-concepts-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7GeometricConceptsSorter onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-concepts-quiz')} />
                  </div>
                )}

                {activityType === 'g7-geom-triangle-lines-theory' && (
                  <Grade7TriangleLinesTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-geom-triangle-lines-quiz')}
                  />
                )}

                {activityType === 'g7-geom-triangle-lines-quiz' && (
                  <Grade7TriangleLinesQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-geom-triangle-lines-theory')}
                  />
                )}

                {activityType === 'g7-geom-triangle-lines-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7TriangleLinesMatcher onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-triangle-lines-quiz')} />
                  </div>
                )}

                {activityType === 'g7-geom-triangle-lines-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7TriangleLinesSorter onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-triangle-lines-quiz')} />
                  </div>
                )}

                {activityType === 'g7-geom-triangles-quads-theory' && (
                  <Grade7TrianglesAndQuadrilateralsTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-geom-triangles-quads-quiz')}
                  />
                )}

                {activityType === 'g7-geom-triangles-quads-quiz' && (
                  <Grade7TrianglesAndQuadrilateralsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-geom-triangles-quads-theory')}
                  />
                )}

                {activityType === 'g7-geom-triangles-quads-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7TrianglesAndQuadrilateralsMatcher onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-triangles-quads-quiz')} />
                  </div>
                )}

                {activityType === 'g7-geom-triangles-quads-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7TrianglesAndQuadrilateralsSorter onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-triangles-quads-quiz')} />
                  </div>
                )}

                {activityType === 'g7-geom-transformations-theory' && (
                  <Grade7GeometricTransformationsTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-geom-transformations-quiz')}
                  />
                )}

                {activityType === 'g7-geom-transformations-quiz' && (
                  <Grade7GeometricTransformationsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-geom-transformations-theory')}
                  />
                )}

                {activityType === 'g7-geom-transformations-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7GeometricTransformationsMatcher onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-transformations-quiz')} />
                  </div>
                )}

                {activityType === 'g7-geom-transformations-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7GeometricTransformationsSorter onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-transformations-quiz')} />
                  </div>
                )}

                {activityType === 'g7-geom-point-reflection-theory' && (
                  <Grade7PointReflectionTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-geom-point-reflection-quiz')}
                  />
                )}

                {activityType === 'g7-geom-point-reflection-quiz' && (
                  <Grade7PointReflectionQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-geom-point-reflection-theory')}
                  />
                )}

                {activityType === 'g7-geom-point-reflection-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7PointReflectionMatcher onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-point-reflection-quiz')} />
                  </div>
                )}

                {activityType === 'g7-geom-point-reflection-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7PointReflectionSorter onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-point-reflection-quiz')} />
                  </div>
                )}

                {activityType === 'g7-geom-reflection-app-theory' && (
                  <Grade7ReflectionAppTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-geom-reflection-app-quiz')}
                  />
                )}

                {activityType === 'g7-geom-reflection-app-quiz' && (
                  <Grade7ReflectionAppQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-geom-reflection-app-theory')}
                  />
                )}

                {activityType === 'g7-geom-reflection-app-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7ReflectionAppMatcher onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-reflection-app-quiz')} />
                  </div>
                )}

                {activityType === 'g7-geom-reflection-app-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7ReflectionAppSorter onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-reflection-app-quiz')} />
                  </div>
                )}

                {activityType === 'g7-geom-angle-pairs-theory' && (
                  <Grade7AnglePairsTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-geom-angle-pairs-quiz')}
                  />
                )}

                {activityType === 'g7-geom-angle-pairs-quiz' && (
                  <Grade7AnglePairsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-geom-angle-pairs-theory')}
                  />
                )}

                {activityType === 'g7-geom-angle-pairs-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7AnglePairsMatcher onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-angle-pairs-quiz')} />
                  </div>
                )}

                {activityType === 'g7-geom-angle-pairs-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7AnglePairsSorter onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-angle-pairs-quiz')} />
                  </div>
                )}

                {activityType === 'g7-geom-symmetry-theory' && (
                  <Grade7SymmetryTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-geom-symmetry-quiz')}
                  />
                )}

                {(activityType === 'g7-geom-symmetry-quiz' || activityType === 'axial-symmetry-quiz') && (
                  <Grade7SymmetryQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-geom-symmetry-theory')}
                  />
                )}

                {activityType === 'g7-geom-symmetry-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7SymmetryMatcher onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-symmetry-quiz')} />
                  </div>
                )}

                {activityType === 'g7-geom-symmetry-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7SymmetrySorter onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-symmetry-quiz')} />
                  </div>
                )}

                {activityType === 'g7-geom-parallelogram-theory' && (
                  <Grade7ParallelogramTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-geom-parallelogram-quiz')}
                  />
                )}

                {activityType === 'g7-geom-parallelogram-quiz' && (
                  <Grade7ParallelogramQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-geom-parallelogram-theory')}
                  />
                )}

                {activityType === 'g7-geom-parallelogram-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7ParallelogramMatcher onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-parallelogram-quiz')} />
                  </div>
                )}

                {activityType === 'g7-geom-parallelogram-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7ParallelogramSorter onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-parallelogram-quiz')} />
                  </div>
                )}

                {activityType === 'g7-geom-point-symmetric-shapes-theory' && (
                  <Grade7PointSymmetricShapesTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-geom-point-symmetric-shapes-quiz')}
                  />
                )}

                {activityType === 'g7-geom-point-symmetric-shapes-quiz' && (
                  <Grade7PointSymmetricShapesQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-geom-point-symmetric-shapes-theory')}
                  />
                )}

                {activityType === 'g7-geom-point-symmetric-shapes-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7PointSymmetricShapesMatcher onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-point-symmetric-shapes-quiz')} />
                  </div>
                )}

                {activityType === 'g7-geom-point-symmetric-shapes-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7PointSymmetricShapesSorter onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-point-symmetric-shapes-quiz')} />
                  </div>
                )}

                {activityType === 'g7-geom-regular-polygons-theory' && (
                  <Grade7RegularPolygonsTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-geom-regular-polygons-quiz')}
                  />
                )}

                {activityType === 'g7-geom-regular-polygons-quiz' && (
                  <Grade7RegularPolygonsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-geom-regular-polygons-theory')}
                  />
                )}

                {activityType === 'g7-geom-regular-polygons-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7RegularPolygonsMatcher onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-regular-polygons-quiz')} />
                  </div>
                )}

                {activityType === 'g7-geom-regular-polygons-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7RegularPolygonsSorter onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-regular-polygons-quiz')} />
                  </div>
                )}

                {activityType === 'g7-geom-circle-theory' && (
                  <Grade7CircleTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-geom-circle-quiz')}
                  />
                )}

                {activityType === 'g7-geom-circle-quiz' && (
                  <Grade7CircleQuiz
                    onBack={handleBack}
                    onOpenMatcher={() => setActivityType('g7-geom-circle-matcher')}
                    onOpenSorter={() => setActivityType('g7-geom-circle-sorter')}
                  />
                )}

                {activityType === 'g7-geom-circle-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7CircleMatcher onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-circle-quiz')} />
                  </div>
                )}

                {activityType === 'g7-geom-circle-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7CircleSorter onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-circle-quiz')} />
                  </div>
                )}

                {activityType === 'g7-geom-constructions-theory' && (
                  <Grade7ConstructionsTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-geom-constructions-quiz')}
                  />
                )}

                {activityType === 'g7-geom-constructions-quiz' && (
                  <Grade7ConstructionsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-geom-constructions-theory')}
                    onOpenMatcher={() => setActivityType('g7-geom-constructions-matcher')}
                    onOpenSorter={() => setActivityType('g7-geom-constructions-sorter')}
                  />
                )}

                {activityType === 'g7-geom-constructions-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7ConstructionsMatcher onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-constructions-quiz')} />
                  </div>
                )}

                {activityType === 'g7-geom-constructions-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7ConstructionsSorter onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-constructions-quiz')} />
                  </div>
                )}

                {activityType === 'g7-geom-summary-theory' && (
                  <Grade7GeometrySummaryTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-geom-summary-quiz')}
                  />
                )}

                {activityType === 'g7-geom-summary-quiz' && (
                  <Grade7GeometrySummaryQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-geom-summary-theory')}
                    onOpenMatcher={() => setActivityType('g7-geom-summary-matcher')}
                    onOpenSorter={() => setActivityType('g7-geom-summary-sorter')}
                  />
                )}

                {activityType === 'g7-geom-summary-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7GeometrySummaryMatcher onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-summary-quiz')} />
                  </div>
                )}

                {activityType === 'g7-geom-summary-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7GeometrySummarySorter onNextLevel={handleBack} onSwitchToQuiz={() => setActivityType('g7-geom-summary-quiz')} />
                  </div>
                )}

                {activityType === 'g7-pow-large-numbers-theory' && (
                  <Grade7LargeNumbersPowersTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-pow-large-numbers-quiz')}
                  />
                )}

                {activityType === 'g7-pow-large-numbers-quiz' && (
                  <Grade7LargeNumbersPowersQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-large-numbers-theory')}
                  />
                )}

                {activityType === 'g7-pow-large-numbers-matcher' && (
                  <Grade7LargeNumbersPowersMatcher
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-large-numbers-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pow-large-numbers-quiz')}
                    onSwitchToSorter={() => setActivityType('g7-pow-large-numbers-sorter')}
                  />
                )}

                {activityType === 'g7-pow-large-numbers-sorter' && (
                  <Grade7LargeNumbersPowersSorter
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-large-numbers-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pow-large-numbers-quiz')}
                    onSwitchToMatcher={() => setActivityType('g7-pow-large-numbers-matcher')}
                  />
                )}

                {activityType === 'g7-pow-application-theory' && (
                  <Grade7PowersApplicationTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-pow-application-quiz')}
                  />
                )}

                {activityType === 'g7-pow-application-quiz' && (
                  <Grade7PowersApplicationQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-application-theory')}
                  />
                )}

                {activityType === 'g7-pow-application-matcher' && (
                  <Grade7PowersApplicationMatcher
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-application-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pow-application-quiz')}
                    onSwitchToSorter={() => setActivityType('g7-pow-application-sorter')}
                  />
                )}

                {activityType === 'g7-pow-application-sorter' && (
                  <Grade7PowersApplicationSorter
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-application-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pow-application-quiz')}
                    onSwitchToMatcher={() => setActivityType('g7-pow-application-matcher')}
                  />
                )}

                {activityType === 'g7-pow-divisibility-review-theory' && (
                  <Grade7DivisibilityReviewTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-pow-divisibility-review-quiz')}
                  />
                )}

                {activityType === 'g7-pow-divisibility-review-quiz' && (
                  <Grade7DivisibilityReviewQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-divisibility-review-theory')}
                  />
                )}

                {activityType === 'g7-pow-divisibility-review-matcher' && (
                  <Grade7DivisibilityReviewMatcher
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-divisibility-review-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pow-divisibility-review-quiz')}
                    onSwitchToSorter={() => setActivityType('g7-pow-divisibility-review-sorter')}
                  />
                )}

                {activityType === 'g7-pow-divisibility-review-sorter' && (
                  <Grade7DivisibilityReviewSorter
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-divisibility-review-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pow-divisibility-review-quiz')}
                    onSwitchToMatcher={() => setActivityType('g7-pow-divisibility-review-matcher')}
                  />
                )}

                {activityType === 'g7-pow-logic-theory' && (
                  <Grade7LogicTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-pow-logic-quiz')}
                  />
                )}

                {activityType === 'g7-pow-logic-quiz' && (
                  <Grade7LogicQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-logic-theory')}
                  />
                )}

                {activityType === 'g7-pow-logic-matcher' && (
                  <Grade7LogicMatcher
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-logic-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pow-logic-quiz')}
                    onSwitchToSorter={() => setActivityType('g7-pow-logic-sorter')}
                  />
                )}

                {activityType === 'g7-pow-logic-sorter' && (
                  <Grade7LogicSorter
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-logic-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pow-logic-quiz')}
                    onSwitchToMatcher={() => setActivityType('g7-pow-logic-matcher')}
                  />
                )}

                {activityType === 'g7-pow-prime-factors-theory' && (
                  <Grade7PrimeFactorizationTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-pow-prime-factors-quiz')}
                  />
                )}

                {activityType === 'g7-pow-prime-factors-quiz' && (
                  <Grade7PrimeFactorizationQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-prime-factors-theory')}
                  />
                )}

                {activityType === 'g7-pow-prime-factors-matcher' && (
                  <Grade7PrimeFactorizationMatcher
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-prime-factors-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pow-prime-factors-quiz')}
                    onSwitchToSorter={() => setActivityType('g7-pow-prime-factors-sorter')}
                  />
                )}

                {activityType === 'g7-pow-prime-factors-sorter' && (
                  <Grade7PrimeFactorizationSorter
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-prime-factors-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pow-prime-factors-quiz')}
                    onSwitchToMatcher={() => setActivityType('g7-pow-prime-factors-matcher')}
                  />
                )}

                {activityType === 'g7-pow-custom-rules-theory' && (
                  <Grade7DivisibilityRulesTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-pow-custom-rules-quiz')}
                  />
                )}

                {activityType === 'g7-pow-custom-rules-quiz' && (
                  <Grade7DivisibilityRulesQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-custom-rules-theory')}
                  />
                )}

                {activityType === 'g7-pow-custom-rules-matcher' && (
                  <Grade7DivisibilityRulesMatcher
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-custom-rules-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pow-custom-rules-quiz')}
                    onSwitchToSorter={() => setActivityType('g7-pow-custom-rules-sorter')}
                  />
                )}

                {activityType === 'g7-pow-custom-rules-sorter' && (
                  <Grade7DivisibilityRulesSorter
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-custom-rules-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pow-custom-rules-quiz')}
                    onSwitchToMatcher={() => setActivityType('g7-pow-custom-rules-matcher')}
                  />
                )}

                {activityType === 'g7-pow-divisors-multiples-theory' && (
                  <Grade7DivisorsMultiplesTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-pow-divisors-multiples-quiz')}
                  />
                )}

                {activityType === 'g7-pow-divisors-multiples-quiz' && (
                  <Grade7DivisorsMultiplesQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-divisors-multiples-theory')}
                  />
                )}

                {activityType === 'g7-pow-divisors-multiples-matcher' && (
                  <Grade7DivisorsMultiplesMatcher
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-divisors-multiples-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pow-divisors-multiples-quiz')}
                    onSwitchToSorter={() => setActivityType('g7-pow-divisors-multiples-sorter')}
                  />
                )}

                {activityType === 'g7-pow-divisors-multiples-sorter' && (
                  <Grade7DivisorsMultiplesSorter
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-divisors-multiples-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pow-divisors-multiples-quiz')}
                    onSwitchToMatcher={() => setActivityType('g7-pow-divisors-multiples-matcher')}
                  />
                )}

                {activityType === 'g7-pow-gcd-theory' && (
                  <Grade7GreatestCommonDivisorTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-pow-gcd-quiz')}
                  />
                )}

                {activityType === 'g7-pow-gcd-quiz' && (
                  <Grade7GreatestCommonDivisorQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-gcd-theory')}
                  />
                )}

                {activityType === 'g7-pow-gcd-matcher' && (
                  <Grade7GreatestCommonDivisorMatcher
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-gcd-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pow-gcd-quiz')}
                    onSwitchToSorter={() => setActivityType('g7-pow-gcd-sorter')}
                  />
                )}

                {activityType === 'g7-pow-gcd-sorter' && (
                  <Grade7GreatestCommonDivisorSorter
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-gcd-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pow-gcd-quiz')}
                    onSwitchToMatcher={() => setActivityType('g7-pow-gcd-matcher')}
                  />
                )}

                {activityType === 'g7-pow-lcm-theory' && (
                  <Grade7LeastCommonMultipleTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-pow-lcm-quiz')}
                  />
                )}

                {activityType === 'g7-pow-lcm-quiz' && (
                  <Grade7LeastCommonMultipleQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-lcm-theory')}
                  />
                )}

                {activityType === 'g7-pow-lcm-matcher' && (
                  <Grade7LeastCommonMultipleMatcher
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-lcm-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pow-lcm-quiz')}
                    onSwitchToSorter={() => setActivityType('g7-pow-lcm-sorter')}
                  />
                )}

                {activityType === 'g7-pow-lcm-sorter' && (
                  <Grade7LeastCommonMultipleSorter
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-lcm-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pow-lcm-quiz')}
                    onSwitchToMatcher={() => setActivityType('g7-pow-lcm-matcher')}
                  />
                )}

                {activityType === 'g7-pow-games-theory' && (
                  <Grade7MathGamesTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-pow-games-quiz')}
                  />
                )}

                {activityType === 'g7-pow-games-quiz' && (
                  <Grade7MathGamesQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-games-theory')}
                  />
                )}

                {activityType === 'g7-pow-games-matcher' && (
                  <Grade7MathGamesMatcher
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-games-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pow-games-quiz')}
                    onSwitchToSorter={() => setActivityType('g7-pow-games-sorter')}
                  />
                )}

                {activityType === 'g7-pow-games-sorter' && (
                  <Grade7MathGamesSorter
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-games-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pow-games-quiz')}
                    onSwitchToMatcher={() => setActivityType('g7-pow-games-matcher')}
                  />
                )}

                {activityType === 'g7-pow-summary-theory' && (
                  <Grade7PowersSummaryTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-pow-summary-quiz')}
                  />
                )}

                {activityType === 'g7-pow-summary-quiz' && (
                  <Grade7PowersSummaryQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-summary-theory')}
                  />
                )}

                {activityType === 'g7-pow-summary-matcher' && (
                  <Grade7PowersSummaryMatcher
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-summary-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pow-summary-quiz')}
                    onSwitchToSorter={() => setActivityType('g7-pow-summary-sorter')}
                  />
                )}

                {activityType === 'g7-pow-summary-sorter' && (
                  <Grade7PowersSummarySorter
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pow-summary-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pow-summary-quiz')}
                    onSwitchToMatcher={() => setActivityType('g7-pow-summary-matcher')}
                  />
                )}

                {activityType === 'g7-pct-ratio-theory' && (
                  <Grade7RatioReviewTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-pct-ratio-quiz')}
                  />
                )}

                {activityType === 'g7-pct-ratio-quiz' && (
                  <Grade7RatioReviewQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-ratio-theory')}
                  />
                )}

                {activityType === 'g7-pct-ratio-matcher' && (
                  <Grade7RatioReviewMatcher
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-ratio-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pct-ratio-quiz')}
                    onSwitchToSorter={() => setActivityType('g7-pct-ratio-sorter')}
                  />
                )}

                {activityType === 'g7-pct-ratio-sorter' && (
                  <Grade7RatioReviewSorter
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-ratio-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pct-ratio-quiz')}
                    onSwitchToMatcher={() => setActivityType('g7-pct-ratio-matcher')}
                  />
                )}

                {activityType === 'g7-pct-review-theory' && (
                  <Grade7PercentReviewTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-pct-review-quiz')}
                  />
                )}

                {activityType === 'g7-pct-review-quiz' && (
                  <Grade7PercentReviewQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-review-theory')}
                  />
                )}

                {activityType === 'g7-pct-review-matcher' && (
                  <Grade7PercentReviewMatcher
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-review-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pct-review-quiz')}
                    onSwitchToSorter={() => setActivityType('g7-pct-review-sorter')}
                  />
                )}

                {activityType === 'g7-pct-review-sorter' && (
                  <Grade7PercentReviewSorter
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-review-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pct-review-quiz')}
                    onSwitchToMatcher={() => setActivityType('g7-pct-review-matcher')}
                  />
                )}

                {activityType === 'g7-pct-100-theory' && (
                  <Grade7CalculateHundredTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-pct-100-quiz')}
                  />
                )}

                {activityType === 'g7-pct-100-quiz' && (
                  <Grade7CalculateHundredQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-100-theory')}
                  />
                )}

                {activityType === 'g7-pct-100-matcher' && (
                  <Grade7CalculateHundredMatcher
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-100-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pct-100-quiz')}
                    onSwitchToSorter={() => setActivityType('g7-pct-100-sorter')}
                  />
                )}

                {activityType === 'g7-pct-100-sorter' && (
                  <Grade7CalculateHundredSorter
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-100-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pct-100-quiz')}
                    onSwitchToMatcher={() => setActivityType('g7-pct-100-matcher')}
                  />
                )}

                {activityType === 'g7-pct-what-theory' && (
                  <Grade7WhatPercentTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-pct-what-quiz')}
                  />
                )}

                {activityType === 'g7-pct-what-quiz' && (
                  <Grade7WhatPercentQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-what-theory')}
                  />
                )}

                {activityType === 'g7-pct-what-matcher' && (
                  <Grade7WhatPercentMatcher
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-what-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pct-what-quiz')}
                    onSwitchToSorter={() => setActivityType('g7-pct-what-sorter')}
                  />
                )}

                {activityType === 'g7-pct-what-sorter' && (
                  <Grade7WhatPercentSorter
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-what-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pct-what-quiz')}
                    onSwitchToMatcher={() => setActivityType('g7-pct-what-matcher')}
                  />
                )}

                {activityType === 'g7-pct-practice-theory' && (
                  <Grade7PracticeTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-pct-practice-quiz')}
                  />
                )}

                {activityType === 'g7-pct-practice-quiz' && (
                  <Grade7PracticeQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-practice-theory')}
                  />
                )}

                {activityType === 'g7-pct-practice-matcher' && (
                  <Grade7PracticeMatcher
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-practice-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pct-practice-quiz')}
                    onSwitchToSorter={() => setActivityType('g7-pct-practice-sorter')}
                  />
                )}

                {activityType === 'g7-pct-practice-sorter' && (
                  <Grade7PracticeSorter
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-practice-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pct-practice-quiz')}
                    onSwitchToMatcher={() => setActivityType('g7-pct-practice-matcher')}
                  />
                )}

                {activityType === 'g7-pct-complex-theory' && (
                  <Grade7ComplexPercentTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-pct-complex-quiz')}
                  />
                )}

                {activityType === 'g7-pct-complex-quiz' && (
                  <Grade7ComplexPercentQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-complex-theory')}
                  />
                )}

                {activityType === 'g7-pct-complex-matcher' && (
                  <Grade7ComplexPercentMatcher
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-complex-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pct-complex-quiz')}
                    onSwitchToSorter={() => setActivityType('g7-pct-complex-sorter')}
                  />
                )}

                {activityType === 'g7-pct-complex-sorter' && (
                  <Grade7ComplexPercentSorter
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-complex-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pct-complex-quiz')}
                    onSwitchToMatcher={() => setActivityType('g7-pct-complex-matcher')}
                  />
                )}

                {activityType === 'g7-pct-word-theory' && (
                  <Grade7PctWordProblemsTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-pct-word-quiz')}
                  />
                )}

                {activityType === 'g7-pct-word-quiz' && (
                  <Grade7PctWordProblemsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-word-theory')}
                  />
                )}

                {activityType === 'g7-pct-word-matcher' && (
                  <Grade7PctWordProblemsMatcher
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-word-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pct-word-quiz')}
                    onSwitchToSorter={() => setActivityType('g7-pct-word-sorter')}
                  />
                )}

                {activityType === 'g7-pct-word-sorter' && (
                  <Grade7PctWordProblemsSorter
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-word-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pct-word-quiz')}
                    onSwitchToMatcher={() => setActivityType('g7-pct-word-matcher')}
                  />
                )}

                {activityType === 'g7-pct-summary-theory' && (
                  <Grade7PercentSummaryTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-pct-summary-quiz')}
                  />
                )}

                {activityType === 'g7-pct-summary-quiz' && (
                  <Grade7PercentSummaryQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-summary-theory')}
                  />
                )}

                {activityType === 'g7-pct-summary-matcher' && (
                  <Grade7PercentSummaryMatcher
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-summary-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pct-summary-quiz')}
                    onSwitchToSorter={() => setActivityType('g7-pct-summary-sorter')}
                  />
                )}

                {activityType === 'g7-pct-summary-sorter' && (
                  <Grade7PercentSummarySorter
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-summary-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pct-summary-quiz')}
                    onSwitchToMatcher={() => setActivityType('g7-pct-summary-matcher')}
                  />
                )}

                {activityType === 'g7-pct-eq-methods-theory' && (
                  <Grade7EquationMethodsTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-pct-eq-methods-quiz')}
                  />
                )}

                {activityType === 'g7-pct-eq-methods-quiz' && (
                  <Grade7EquationMethodsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-eq-methods-theory')}
                  />
                )}

                {activityType === 'g7-pct-eq-methods-matcher' && (
                  <Grade7EquationMethodsMatcher
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-eq-methods-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pct-eq-methods-quiz')}
                    onSwitchToSorter={() => setActivityType('g7-pct-eq-methods-sorter')}
                  />
                )}

                {activityType === 'g7-pct-eq-methods-sorter' && (
                  <Grade7EquationMethodsSorter
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-eq-methods-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pct-eq-methods-quiz')}
                    onSwitchToMatcher={() => setActivityType('g7-pct-eq-methods-matcher')}
                  />
                )}

                {activityType === 'g7-pct-balance-theory' && (
                  <Grade7BalanceScaleTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-pct-balance-quiz')}
                  />
                )}

                {activityType === 'g7-pct-balance-quiz' && (
                  <Grade7BalanceScaleQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-balance-theory')}
                  />
                )}

                {activityType === 'g7-pct-balance-matcher' && (
                  <Grade7BalanceScaleMatcher
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-balance-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pct-balance-quiz')}
                    onSwitchToSorter={() => setActivityType('g7-pct-balance-sorter')}
                  />
                )}

                {activityType === 'g7-pct-balance-sorter' && (
                  <Grade7BalanceScaleSorter
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-pct-balance-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-pct-balance-quiz')}
                    onSwitchToMatcher={() => setActivityType('g7-pct-balance-matcher')}
                  />
                )}

                {(activityType === 'g7-eq-solve-theory' || activityType === 'g7-pct-eq-solve-theory') && (
                  <Grade7EquationSolveTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-eq-solve-quiz')}
                  />
                )}

                {(activityType === 'g7-eq-solve-quiz' || activityType === 'g7-pct-eq-solve-quiz') && (
                  <Grade7EquationSolveQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-eq-solve-theory')}
                  />
                )}

                {(activityType === 'g7-eq-solve-matcher' || activityType === 'g7-pct-eq-solve-matcher') && (
                  <Grade7EquationSolveMatcher
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-eq-solve-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-eq-solve-quiz')}
                    onSwitchToSorter={() => setActivityType('g7-eq-solve-sorter')}
                  />
                )}

                {(activityType === 'g7-eq-solve-sorter' || activityType === 'g7-pct-eq-solve-sorter') && (
                  <Grade7EquationSolveSorter
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-eq-solve-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-eq-solve-quiz')}
                    onSwitchToMatcher={() => setActivityType('g7-eq-solve-matcher')}
                  />
                )}

                {(activityType === 'g7-eq-word-theory' || activityType === 'g7-pct-eq-word-theory') && (
                  <Grade7EquationWordProblemsTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-eq-word-quiz')}
                  />
                )}

                {(activityType === 'g7-eq-word-quiz' || activityType === 'g7-pct-eq-word-quiz') && (
                  <Grade7EquationWordProblemsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-eq-word-theory')}
                  />
                )}

                {(activityType === 'g7-eq-word-matcher' || activityType === 'g7-pct-eq-word-matcher') && (
                  <Grade7EquationWordProblemsMatcher
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-eq-word-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-eq-word-quiz')}
                    onSwitchToSorter={() => setActivityType('g7-eq-word-sorter')}
                  />
                )}

                {(activityType === 'g7-eq-word-sorter' || activityType === 'g7-pct-eq-word-sorter') && (
                  <Grade7EquationWordProblemsSorter
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-eq-word-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-eq-word-quiz')}
                    onSwitchToMatcher={() => setActivityType('g7-eq-word-matcher')}
                  />
                )}

                {(activityType === 'g7-eq-summary-theory' || activityType === 'g7-pct-eq-summary-theory') && (
                  <Grade7EquationSummaryTheory
                    onBack={handleBack}
                    onStartQuiz={() => setActivityType('g7-eq-summary-quiz')}
                  />
                )}

                {(activityType === 'g7-eq-summary-quiz' || activityType === 'g7-pct-eq-summary-quiz') && (
                  <Grade7EquationSummaryQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-eq-summary-theory')}
                  />
                )}

                {(activityType === 'g7-eq-summary-matcher' || activityType === 'g7-pct-eq-summary-matcher') && (
                  <Grade7EquationSummaryMatcher
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-eq-summary-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-eq-summary-quiz')}
                    onSwitchToSorter={() => setActivityType('g7-eq-summary-sorter')}
                  />
                )}

                {(activityType === 'g7-eq-summary-sorter' || activityType === 'g7-pct-eq-summary-sorter') && (
                  <Grade7EquationSummarySorter
                    onBack={handleBack}
                    onNextLevel={handleBack}
                    onSwitchToTheory={() => setActivityType('g7-eq-summary-theory')}
                    onSwitchToQuiz={() => setActivityType('g7-eq-summary-quiz')}
                    onSwitchToMatcher={() => setActivityType('g7-eq-summary-matcher')}
                  />
                )}

                {activityType === 'g7-geom-congruence-theory' && (
                  <Grade7TriangleCongruenceTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g7-geom-congruence-quiz', selectedTopic?.id || 'g7-geometry')}
                  />
                )}

                {activityType === 'g7-geom-congruence-quiz' && (
                  <Grade7TriangleCongruenceQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g7-geom-congruence-theory', selectedTopic?.id || 'g7-geometry')}
                  />
                )}

                {activityType === 'g7-geom-congruence-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7TriangleCongruenceMatcher
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-congruence-theory', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-geom-congruence-quiz', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToSorter={() => handleActivitySelect('g7-geom-congruence-sorter', selectedTopic?.id || 'g7-geometry')}
                    />
                  </div>
                )}

                {activityType === 'g7-geom-congruence-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7TriangleCongruenceSorter
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-congruence-theory', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-geom-congruence-quiz', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToMatcher={() => handleActivitySelect('g7-geom-congruence-matcher', selectedTopic?.id || 'g7-geometry')}
                    />
                  </div>
                )}

                {activityType === 'g7-geom-sides-angles-theory' && (
                  <Grade7TriangleSidesAnglesTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g7-geom-sides-angles-quiz', selectedTopic?.id || 'g7-geometry')}
                  />
                )}

                {(activityType === 'g7-geom-sides-angles-quiz' || activityType === 'triangle-angles-quiz') && (
                  <Grade7TriangleSidesAnglesQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g7-geom-sides-angles-theory', selectedTopic?.id || 'g7-geometry')}
                  />
                )}

                {(activityType === 'g7-geom-sides-angles-matcher' || activityType === 'angle-matching') && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7TriangleSidesAnglesMatcher
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-sides-angles-theory', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-geom-sides-angles-quiz', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToSorter={() => handleActivitySelect('g7-geom-sides-angles-sorter', selectedTopic?.id || 'g7-geometry')}
                    />
                  </div>
                )}

                {(activityType === 'g7-geom-sides-angles-sorter' || activityType === 'triangle-classification') && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7TriangleSidesAnglesSorter
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-sides-angles-theory', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-geom-sides-angles-quiz', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToMatcher={() => handleActivitySelect('g7-geom-sides-angles-matcher', selectedTopic?.id || 'g7-geometry')}
                    />
                  </div>
                )}

                {activityType === 'g7-geom-polygons-theory' && (
                  <Grade7PolygonAnglesDiagonalsTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g7-geom-polygons-quiz', selectedTopic?.id || 'g7-geometry')}
                  />
                )}

                {activityType === 'g7-geom-polygons-quiz' && (
                  <Grade7PolygonAnglesDiagonalsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g7-geom-polygons-theory', selectedTopic?.id || 'g7-geometry')}
                  />
                )}

                {activityType === 'g7-geom-polygons-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7PolygonAnglesDiagonalsMatcher
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-polygons-theory', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-geom-polygons-quiz', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToSorter={() => handleActivitySelect('g7-geom-polygons-sorter', selectedTopic?.id || 'g7-geometry')}
                    />
                  </div>
                )}

                {activityType === 'g7-geom-polygons-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7PolygonAnglesDiagonalsSorter
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-polygons-theory', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-geom-polygons-quiz', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToMatcher={() => handleActivitySelect('g7-geom-polygons-matcher', selectedTopic?.id || 'g7-geometry')}
                    />
                  </div>
                )}

                {activityType === 'g7-geom-units-theory' && (
                  <Grade7AreaVolumeUnitsTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g7-geom-units-quiz', selectedTopic?.id || 'g7-geometry')}
                  />
                )}

                {(activityType === 'g7-geom-units-quiz' || activityType === 'area-conversion-quiz' || activityType === 'volume-quiz') && (
                  <Grade7AreaVolumeUnitsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g7-geom-units-theory', selectedTopic?.id || 'g7-geometry')}
                  />
                )}

                {activityType === 'g7-geom-units-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7AreaVolumeUnitsMatcher
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-units-theory', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-geom-units-quiz', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToSorter={() => handleActivitySelect('g7-geom-units-sorter', selectedTopic?.id || 'g7-geometry')}
                    />
                  </div>
                )}

                {activityType === 'g7-geom-units-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7AreaVolumeUnitsSorter
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-units-theory', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-geom-units-quiz', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToMatcher={() => handleActivitySelect('g7-geom-units-matcher', selectedTopic?.id || 'g7-geometry')}
                    />
                  </div>
                )}

                {activityType === 'g7-geom-parallelogram-area-theory' && (
                  <Grade7ParallelogramAreaTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g7-geom-parallelogram-area-quiz', selectedTopic?.id || 'g7-geometry')}
                  />
                )}

                {(activityType === 'g7-geom-parallelogram-area-quiz' || activityType === 'parallelogram-area-quiz' || activityType === 'parallelogram-area') && (
                  <Grade7ParallelogramAreaQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g7-geom-parallelogram-area-theory', selectedTopic?.id || 'g7-geometry')}
                  />
                )}

                {activityType === 'g7-geom-parallelogram-area-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7ParallelogramAreaMatcher
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-parallelogram-area-theory', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-geom-parallelogram-area-quiz', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToSorter={() => handleActivitySelect('g7-geom-parallelogram-area-sorter', selectedTopic?.id || 'g7-geometry')}
                    />
                  </div>
                )}

                {activityType === 'g7-geom-parallelogram-area-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7ParallelogramAreaSorter
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-parallelogram-area-theory', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-geom-parallelogram-area-quiz', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToMatcher={() => handleActivitySelect('g7-geom-parallelogram-area-matcher', selectedTopic?.id || 'g7-geometry')}
                    />
                  </div>
                )}

                {activityType === 'g7-geom-triangle-area-theory' && (
                  <Grade7TriangleAreaTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g7-geom-triangle-area-quiz', selectedTopic?.id || 'g7-geometry')}
                  />
                )}

                {(activityType === 'g7-geom-triangle-area-quiz' || activityType === 'area-calculation-quiz' || activityType === 'triangle-area') && (
                  <Grade7TriangleAreaQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g7-geom-triangle-area-theory', selectedTopic?.id || 'g7-geometry')}
                  />
                )}

                {activityType === 'g7-geom-triangle-area-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7TriangleAreaMatcher
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-triangle-area-theory', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-geom-triangle-area-quiz', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToSorter={() => handleActivitySelect('g7-geom-triangle-area-sorter', selectedTopic?.id || 'g7-geometry')}
                    />
                  </div>
                )}

                {activityType === 'g7-geom-triangle-area-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7TriangleAreaSorter
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-triangle-area-theory', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-geom-triangle-area-quiz', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToMatcher={() => handleActivitySelect('g7-geom-triangle-area-matcher', selectedTopic?.id || 'g7-geometry')}
                    />
                  </div>
                )}

                {activityType === 'g7-geom-trapezoid-area-theory' && (
                  <Grade7TrapezoidAreaTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g7-geom-trapezoid-area-quiz', selectedTopic?.id || 'g7-geometry')}
                  />
                )}

                {activityType === 'g7-geom-trapezoid-area-quiz' && (
                  <Grade7TrapezoidAreaQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g7-geom-trapezoid-area-theory', selectedTopic?.id || 'g7-geometry')}
                  />
                )}

                {activityType === 'g7-geom-trapezoid-area-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7TrapezoidAreaMatcher
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-trapezoid-area-theory', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-geom-trapezoid-area-quiz', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToSorter={() => handleActivitySelect('g7-geom-trapezoid-area-sorter', selectedTopic?.id || 'g7-geometry')}
                    />
                  </div>
                )}

                {activityType === 'g7-geom-trapezoid-area-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7TrapezoidAreaSorter
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-trapezoid-area-theory', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-geom-trapezoid-area-quiz', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToMatcher={() => handleActivitySelect('g7-geom-trapezoid-area-matcher', selectedTopic?.id || 'g7-geometry')}
                    />
                  </div>
                )}

                {activityType === 'g7-geom-deltoid-area-theory' && (
                  <Grade7DeltoidAreaTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g7-geom-deltoid-area-quiz', selectedTopic?.id || 'g7-geometry')}
                  />
                )}

                {activityType === 'g7-geom-deltoid-area-quiz' && (
                  <Grade7DeltoidAreaQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g7-geom-deltoid-area-theory', selectedTopic?.id || 'g7-geometry')}
                  />
                )}

                {activityType === 'g7-geom-deltoid-area-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7DeltoidAreaMatcher
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-deltoid-area-theory', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-geom-deltoid-area-quiz', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToSorter={() => handleActivitySelect('g7-geom-deltoid-area-sorter', selectedTopic?.id || 'g7-geometry')}
                    />
                  </div>
                )}

                {activityType === 'g7-geom-deltoid-area-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7DeltoidAreaSorter
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-deltoid-area-theory', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-geom-deltoid-area-quiz', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToMatcher={() => handleActivitySelect('g7-geom-deltoid-area-matcher', selectedTopic?.id || 'g7-geometry')}
                    />
                  </div>
                )}

                {activityType === 'g7-geom-prism-surface-volume-theory' && (
                  <Grade7PrismSurfaceVolumeTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g7-geom-prism-surface-volume-quiz', selectedTopic?.id || 'g7-geometry')}
                  />
                )}

                {activityType === 'g7-geom-prism-surface-volume-quiz' && (
                  <Grade7PrismSurfaceVolumeQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g7-geom-prism-surface-volume-theory', selectedTopic?.id || 'g7-geometry')}
                  />
                )}

                {activityType === 'g7-geom-prism-surface-volume-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7PrismSurfaceVolumeMatcher
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-prism-surface-volume-theory', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-geom-prism-surface-volume-quiz', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToSorter={() => handleActivitySelect('g7-geom-prism-surface-volume-sorter', selectedTopic?.id || 'g7-geometry')}
                    />
                  </div>
                )}

                {activityType === 'g7-geom-prism-surface-volume-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7PrismSurfaceVolumeSorter
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-prism-surface-volume-theory', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-geom-prism-surface-volume-quiz', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToMatcher={() => handleActivitySelect('g7-geom-prism-surface-volume-matcher', selectedTopic?.id || 'g7-geometry')}
                    />
                  </div>
                )}

                {activityType === 'g7-geom-solids-space-plane-theory' && (
                  <Grade7SolidsInSpaceAndPlaneTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g7-geom-solids-space-plane-quiz', selectedTopic?.id || 'g7-geometry')}
                  />
                )}

                {activityType === 'g7-geom-solids-space-plane-quiz' && (
                  <Grade7SolidsInSpaceAndPlaneQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g7-geom-solids-space-plane-theory', selectedTopic?.id || 'g7-geometry')}
                  />
                )}

                {activityType === 'g7-geom-solids-space-plane-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7SolidsInSpaceAndPlaneMatcher
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-solids-space-plane-theory', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-geom-solids-space-plane-quiz', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToSorter={() => handleActivitySelect('g7-geom-solids-space-plane-sorter', selectedTopic?.id || 'g7-geometry')}
                    />
                  </div>
                )}

                {activityType === 'g7-geom-solids-space-plane-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7SolidsInSpaceAndPlaneSorter
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-solids-space-plane-theory', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-geom-solids-space-plane-quiz', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToMatcher={() => handleActivitySelect('g7-geom-solids-space-plane-matcher', selectedTopic?.id || 'g7-geometry')}
                    />
                  </div>
                )}

                {activityType === 'g7-geom-escape-room-theory' && (
                  <Grade7GeomEscapeRoomTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g7-geom-escape-room-quiz', selectedTopic?.id || 'g7-geometry')}
                  />
                )}

                {activityType === 'g7-geom-escape-room-quiz' && (
                  <Grade7GeomEscapeRoomQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g7-geom-escape-room-theory', selectedTopic?.id || 'g7-geometry')}
                  />
                )}

                {activityType === 'g7-geom-escape-room-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7GeomEscapeRoomMatcher
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-escape-room-theory', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-geom-escape-room-quiz', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToSorter={() => handleActivitySelect('g7-geom-escape-room-sorter', selectedTopic?.id || 'g7-geometry')}
                    />
                  </div>
                )}

                {activityType === 'g7-geom-escape-room-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7GeomEscapeRoomSorter
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-escape-room-theory', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-geom-escape-room-quiz', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToMatcher={() => handleActivitySelect('g7-geom-escape-room-matcher', selectedTopic?.id || 'g7-geometry')}
                    />
                  </div>
                )}

                {activityType === 'g7-geom-summary-theory' && (
                  <Grade7GeomSummaryTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g7-geom-summary-quiz', selectedTopic?.id || 'g7-geometry')}
                  />
                )}

                {(activityType === 'g7-geom-summary-quiz' || activityType === 'g7-geometry-summary') && (
                  <Grade7GeomSummaryQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g7-geom-summary-theory', selectedTopic?.id || 'g7-geometry')}
                  />
                )}

                {activityType === 'g7-geom-summary-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7GeomSummaryMatcher
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-summary-theory', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-geom-summary-quiz', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToSorter={() => handleActivitySelect('g7-geom-summary-sorter', selectedTopic?.id || 'g7-geometry')}
                    />
                  </div>
                )}

                {activityType === 'g7-geom-summary-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7GeomSummarySorter
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-geom-summary-theory', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-geom-summary-quiz', selectedTopic?.id || 'g7-geometry')}
                      onSwitchToMatcher={() => handleActivitySelect('g7-geom-summary-matcher', selectedTopic?.id || 'g7-geometry')}
                    />
                  </div>
                )}
                {/* Grade 7 Geometria ágak vége */}

                {/* Grade 7 VIII. Hozzárendelések, statisztika - 1. Két halmaz közötti hozzárendelések */}
                {activityType === 'g7-stats-relations-theory' && (
                  <Grade7StatsRelationsTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g7-stats-relations-quiz', selectedTopic?.id || 'g7-stats')}
                  />
                )}

                {activityType === 'g7-stats-relations-quiz' && (
                  <Grade7StatsRelationsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g7-stats-relations-theory', selectedTopic?.id || 'g7-stats')}
                    onOpenMatcher={() => handleActivitySelect('g7-stats-relations-matcher', selectedTopic?.id || 'g7-stats')}
                    onOpenSorter={() => handleActivitySelect('g7-stats-relations-sorter', selectedTopic?.id || 'g7-stats')}
                  />
                )}

                {activityType === 'g7-stats-relations-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7StatsRelationsMatcher
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-stats-relations-theory', selectedTopic?.id || 'g7-stats')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-stats-relations-quiz', selectedTopic?.id || 'g7-stats')}
                      onSwitchToSorter={() => handleActivitySelect('g7-stats-relations-sorter', selectedTopic?.id || 'g7-stats')}
                    />
                  </div>
                )}

                {activityType === 'g7-stats-relations-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7StatsRelationsSorter
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-stats-relations-theory', selectedTopic?.id || 'g7-stats')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-stats-relations-quiz', selectedTopic?.id || 'g7-stats')}
                      onSwitchToMatcher={() => handleActivitySelect('g7-stats-relations-matcher', selectedTopic?.id || 'g7-stats')}
                    />
                  </div>
                )}

                {/* Grade 7 VIII. Hozzárendelések, statisztika - 2. A hozzárendelések megadási módjai */}
                {activityType === 'g7-stats-rep-theory' && (
                  <Grade7StatsRepTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g7-stats-rep-quiz', selectedTopic?.id || 'g7-stats')}
                  />
                )}

                {activityType === 'g7-stats-rep-quiz' && (
                  <Grade7StatsRepQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g7-stats-rep-theory', selectedTopic?.id || 'g7-stats')}
                    onOpenMatcher={() => handleActivitySelect('g7-stats-rep-matcher', selectedTopic?.id || 'g7-stats')}
                    onOpenSorter={() => handleActivitySelect('g7-stats-rep-sorter', selectedTopic?.id || 'g7-stats')}
                  />
                )}

                {activityType === 'g7-stats-rep-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7StatsRepMatcher
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-stats-rep-theory', selectedTopic?.id || 'g7-stats')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-stats-rep-quiz', selectedTopic?.id || 'g7-stats')}
                      onSwitchToSorter={() => handleActivitySelect('g7-stats-rep-sorter', selectedTopic?.id || 'g7-stats')}
                    />
                  </div>
                )}

                {activityType === 'g7-stats-rep-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7StatsRepSorter
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-stats-rep-theory', selectedTopic?.id || 'g7-stats')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-stats-rep-quiz', selectedTopic?.id || 'g7-stats')}
                      onSwitchToMatcher={() => handleActivitySelect('g7-stats-rep-matcher', selectedTopic?.id || 'g7-stats')}
                    />
                  </div>
                )}

                {/* Grade 7 VIII. Hozzárendelések, statisztika - 3. Olvassunk a grafikonról! */}
                {activityType === 'g7-stats-graph-theory' && (
                  <Grade7StatsGraphTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g7-stats-graph-quiz', selectedTopic?.id || 'g7-stats')}
                  />
                )}

                {activityType === 'g7-stats-graph-quiz' && (
                  <Grade7StatsGraphQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g7-stats-graph-theory', selectedTopic?.id || 'g7-stats')}
                    onOpenMatcher={() => handleActivitySelect('g7-stats-graph-matcher', selectedTopic?.id || 'g7-stats')}
                    onOpenSorter={() => handleActivitySelect('g7-stats-graph-sorter', selectedTopic?.id || 'g7-stats')}
                  />
                )}

                {activityType === 'g7-stats-graph-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7StatsGraphMatcher
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-stats-graph-theory', selectedTopic?.id || 'g7-stats')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-stats-graph-quiz', selectedTopic?.id || 'g7-stats')}
                      onSwitchToSorter={() => handleActivitySelect('g7-stats-graph-sorter', selectedTopic?.id || 'g7-stats')}
                    />
                  </div>
                )}

                {activityType === 'g7-stats-graph-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7StatsGraphSorter
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-stats-graph-theory', selectedTopic?.id || 'g7-stats')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-stats-graph-quiz', selectedTopic?.id || 'g7-stats')}
                      onSwitchToMatcher={() => handleActivitySelect('g7-stats-graph-matcher', selectedTopic?.id || 'g7-stats')}
                    />
                  </div>
                )}

                {/* Grade 7 VIII. Hozzárendelések, statisztika - 4. Átlag, módusz, medián */}
                {activityType === 'g7-stats-central-theory' && (
                  <Grade7StatsCentralTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g7-stats-central-quiz', selectedTopic?.id || 'g7-stats')}
                  />
                )}

                {activityType === 'g7-stats-central-quiz' && (
                  <Grade7StatsCentralQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g7-stats-central-theory', selectedTopic?.id || 'g7-stats')}
                    onOpenMatcher={() => handleActivitySelect('g7-stats-central-matcher', selectedTopic?.id || 'g7-stats')}
                    onOpenSorter={() => handleActivitySelect('g7-stats-central-sorter', selectedTopic?.id || 'g7-stats')}
                  />
                )}

                {activityType === 'g7-stats-central-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7StatsCentralMatcher
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-stats-central-theory', selectedTopic?.id || 'g7-stats')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-stats-central-quiz', selectedTopic?.id || 'g7-stats')}
                      onSwitchToSorter={() => handleActivitySelect('g7-stats-central-sorter', selectedTopic?.id || 'g7-stats')}
                    />
                  </div>
                )}

                {activityType === 'g7-stats-central-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7StatsCentralSorter
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-stats-central-theory', selectedTopic?.id || 'g7-stats')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-stats-central-quiz', selectedTopic?.id || 'g7-stats')}
                      onSwitchToMatcher={() => handleActivitySelect('g7-stats-central-matcher', selectedTopic?.id || 'g7-stats')}
                    />
                  </div>
                )}

                {/* Grade 7 VIII. Hozzárendelések, statisztika - 5. Gyakoriság, relatív gyakoriság */}
                {activityType === 'g7-stats-freq-theory' && (
                  <Grade7StatsFreqTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g7-stats-freq-quiz', selectedTopic?.id || 'g7-stats')}
                  />
                )}

                {activityType === 'g7-stats-freq-quiz' && (
                  <Grade7StatsFreqQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g7-stats-freq-theory', selectedTopic?.id || 'g7-stats')}
                    onOpenMatcher={() => handleActivitySelect('g7-stats-freq-matcher', selectedTopic?.id || 'g7-stats')}
                    onOpenSorter={() => handleActivitySelect('g7-stats-freq-sorter', selectedTopic?.id || 'g7-stats')}
                  />
                )}

                {activityType === 'g7-stats-freq-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7StatsFreqMatcher
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-stats-freq-theory', selectedTopic?.id || 'g7-stats')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-stats-freq-quiz', selectedTopic?.id || 'g7-stats')}
                      onSwitchToSorter={() => handleActivitySelect('g7-stats-freq-sorter', selectedTopic?.id || 'g7-stats')}
                    />
                  </div>
                )}

                {activityType === 'g7-stats-freq-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7StatsFreqSorter
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-stats-freq-theory', selectedTopic?.id || 'g7-stats')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-stats-freq-quiz', selectedTopic?.id || 'g7-stats')}
                      onSwitchToMatcher={() => handleActivitySelect('g7-stats-freq-matcher', selectedTopic?.id || 'g7-stats')}
                    />
                  </div>
                )}

                {/* Grade 7 VIII. Hozzárendelések, statisztika - 6. Valószínűség */}
                {activityType === 'g7-stats-prob-theory' && (
                  <Grade7StatsProbTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g7-stats-prob-quiz', selectedTopic?.id || 'g7-stats')}
                  />
                )}

                {activityType === 'g7-stats-prob-quiz' && (
                  <Grade7StatsProbQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g7-stats-prob-theory', selectedTopic?.id || 'g7-stats')}
                    onOpenMatcher={() => handleActivitySelect('g7-stats-prob-matcher', selectedTopic?.id || 'g7-stats')}
                    onOpenSorter={() => handleActivitySelect('g7-stats-prob-sorter', selectedTopic?.id || 'g7-stats')}
                  />
                )}

                {activityType === 'g7-stats-prob-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7StatsProbMatcher
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-stats-prob-theory', selectedTopic?.id || 'g7-stats')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-stats-prob-quiz', selectedTopic?.id || 'g7-stats')}
                      onSwitchToSorter={() => handleActivitySelect('g7-stats-prob-sorter', selectedTopic?.id || 'g7-stats')}
                    />
                  </div>
                )}

                {activityType === 'g7-stats-prob-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7StatsProbSorter
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-stats-prob-theory', selectedTopic?.id || 'g7-stats')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-stats-prob-quiz', selectedTopic?.id || 'g7-stats')}
                      onSwitchToMatcher={() => handleActivitySelect('g7-stats-prob-matcher', selectedTopic?.id || 'g7-stats')}
                    />
                  </div>
                )}

                {/* Grade 7 VIII. Hozzárendelések, statisztika - 7. Tippelj, kísérletezz, ellenőrizz! */}
                {activityType === 'g7-stats-exp-theory' && (
                  <Grade7StatsExpTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g7-stats-exp-quiz', selectedTopic?.id || 'g7-stats')}
                  />
                )}

                {activityType === 'g7-stats-exp-quiz' && (
                  <Grade7StatsExpQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g7-stats-exp-theory', selectedTopic?.id || 'g7-stats')}
                    onOpenMatcher={() => handleActivitySelect('g7-stats-exp-matcher', selectedTopic?.id || 'g7-stats')}
                    onOpenSorter={() => handleActivitySelect('g7-stats-exp-sorter', selectedTopic?.id || 'g7-stats')}
                  />
                )}

                {activityType === 'g7-stats-exp-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7StatsExpMatcher
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-stats-exp-theory', selectedTopic?.id || 'g7-stats')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-stats-exp-quiz', selectedTopic?.id || 'g7-stats')}
                      onSwitchToSorter={() => handleActivitySelect('g7-stats-exp-sorter', selectedTopic?.id || 'g7-stats')}
                    />
                  </div>
                )}

                {activityType === 'g7-stats-exp-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7StatsExpSorter
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-stats-exp-theory', selectedTopic?.id || 'g7-stats')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-stats-exp-quiz', selectedTopic?.id || 'g7-stats')}
                      onSwitchToMatcher={() => handleActivitySelect('g7-stats-exp-matcher', selectedTopic?.id || 'g7-stats')}
                    />
                  </div>
                )}

                {/* Grade 7 VIII. Hozzárendelések, statisztika - 8. Összefoglalás */}
                {activityType === 'g7-stats-summary-theory' && (
                  <Grade7StatsSummaryTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g7-stats-summary-quiz', selectedTopic?.id || 'g7-stats')}
                  />
                )}

                {activityType === 'g7-stats-summary-quiz' && (
                  <Grade7StatsSummaryQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g7-stats-summary-theory', selectedTopic?.id || 'g7-stats')}
                    onOpenMatcher={() => handleActivitySelect('g7-stats-summary-matcher', selectedTopic?.id || 'g7-stats')}
                    onOpenSorter={() => handleActivitySelect('g7-stats-summary-sorter', selectedTopic?.id || 'g7-stats')}
                  />
                )}

                {activityType === 'g7-stats-summary-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7StatsSummaryMatcher
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-stats-summary-theory', selectedTopic?.id || 'g7-stats')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-stats-summary-quiz', selectedTopic?.id || 'g7-stats')}
                      onSwitchToSorter={() => handleActivitySelect('g7-stats-summary-sorter', selectedTopic?.id || 'g7-stats')}
                    />
                  </div>
                )}

                {activityType === 'g7-stats-summary-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade7StatsSummarySorter
                      onNextLevel={handleBack}
                      onBack={handleBack}
                      onSwitchToTheory={() => handleActivitySelect('g7-stats-summary-theory', selectedTopic?.id || 'g7-stats')}
                      onSwitchToQuiz={() => handleActivitySelect('g7-stats-summary-quiz', selectedTopic?.id || 'g7-stats')}
                      onSwitchToMatcher={() => handleActivitySelect('g7-stats-summary-matcher', selectedTopic?.id || 'g7-stats')}
                    />
                  </div>
                )}

                {activityType === 'g6-fractions-review-theory' && (
                  <Grade6FractionsReviewTheory
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g6-fractions-review-quiz', selectedTopic?.id || 'g6-fractions')}
                  />
                )}

                {(activityType === 'g6-fractions-review-quiz' || activityType === 'g6-fractions-review' || activityType === 'g6-fractions-quiz') && (
                  <Grade6FractionsReviewQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g6-fractions-review-theory', selectedTopic?.id || 'g6-fractions')}
                  />
                )}

                {(activityType === 'g6-fractions-review-matcher' || activityType === 'g6-fraction-visual-matcher') && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6FractionsReviewMatcher onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g6-fractions-review-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6FractionsReviewSorter onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g6-fraction-multiplication-theory' && (
                  <Grade6FractionMultiplicationTheory
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g6-fraction-multiplication-quiz', selectedTopic?.id || 'g6-fractions')}
                  />
                )}

                {(activityType === 'g6-fraction-multiplication-quiz' || activityType === 'g6-fraction-mult-quiz') && (
                  <Grade6FractionMultiplicationQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g6-fraction-multiplication-theory', selectedTopic?.id || 'g6-fractions')}
                  />
                )}

                {(activityType === 'g6-fraction-multiplication-matcher' || activityType === 'g6-fraction-multiplier') && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6FractionMultiplicationMatcher onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g6-fraction-multiplication-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6FractionMultiplicationSorter onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g6-fraction-division-theory' && (
                  <Grade6FractionDivisionTheory
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g6-fraction-division-quiz', selectedTopic?.id || 'g6-fractions')}
                  />
                )}

                {(activityType === 'g6-fraction-division-quiz' || activityType === 'g6-fraction-div-quiz') && (
                  <Grade6FractionDivisionQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g6-fraction-division-theory', selectedTopic?.id || 'g6-fractions')}
                  />
                )}

                {(activityType === 'g6-fraction-division-matcher' || activityType === 'g6-fraction-divider') && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6FractionDivisionMatcher onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g6-fraction-division-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6FractionDivisionSorter onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g6-decimal-fractions-theory' && (
                  <Grade6DecimalFractionsTheory
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g6-decimal-fractions-quiz', selectedTopic?.id || 'g6-fractions')}
                  />
                )}

                {(activityType === 'g6-decimal-fractions-quiz' || activityType === 'g6-decimal-quiz') && (
                  <Grade6DecimalFractionsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g6-decimal-fractions-theory', selectedTopic?.id || 'g6-fractions')}
                  />
                )}

                {(activityType === 'g6-decimal-fractions-matcher' || activityType === 'g6-to-decimal-matcher') && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6FractionToDecimalMatcher onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g6-decimal-fractions-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6DecimalFractionsSorter onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g6-decimal-multiplication-theory' && (
                  <Grade6DecimalMultiplicationTheory
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g6-decimal-multiplication-quiz', selectedTopic?.id || 'g6-fractions')}
                  />
                )}

                {(activityType === 'g6-decimal-multiplication-quiz' || activityType === 'g6-decimal-multiplier-quiz') && (
                  <Grade6DecimalMultiplicationQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g6-decimal-multiplication-theory', selectedTopic?.id || 'g6-fractions')}
                  />
                )}

                {(activityType === 'g6-decimal-multiplication-matcher' || activityType === 'g6-decimal-multiplier') && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6DecimalMultiplicationMatcher onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g6-decimal-multiplication-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6DecimalMultiplicationSorter onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g6-decimal-division-theory' && (
                  <Grade6DecimalDivisionTheory
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g6-decimal-division-quiz', selectedTopic?.id || 'g6-fractions')}
                  />
                )}

                {(activityType === 'g6-decimal-division-quiz' || activityType === 'g6-decimal-divider-quiz') && (
                  <Grade6DecimalDivisionQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g6-decimal-division-theory', selectedTopic?.id || 'g6-fractions')}
                  />
                )}

                {(activityType === 'g6-decimal-division-matcher' || activityType === 'g6-decimal-divider') && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6DecimalDivisionMatcher onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g6-decimal-division-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6DecimalDivisionSorter onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g6-complex-operations-theory' && (
                  <Grade6ComplexOperationsTheory
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g6-complex-operations-quiz', selectedTopic?.id || 'g6-fractions')}
                  />
                )}

                {activityType === 'g6-complex-operations-quiz' && (
                  <Grade6ComplexOperationsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g6-complex-operations-theory', selectedTopic?.id || 'g6-fractions')}
                  />
                )}

                {activityType === 'g6-complex-operations-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6ComplexOperationsMatcher onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g6-complex-operations-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6ComplexOperationsSorter onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g6-fractions-summary-theory' && (
                  <Grade6FractionsSummaryTheory
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g6-fractions-summary-quiz', selectedTopic?.id || 'g6-fractions')}
                  />
                )}

                {(activityType === 'g6-fractions-summary-quiz' || activityType === 'g6-fractions-closing-test') && (
                  <Grade6FractionsSummaryQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g6-fractions-summary-theory', selectedTopic?.id || 'g6-fractions')}
                  />
                )}

                {activityType === 'g6-fractions-summary-matcher' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6FractionsSummaryMatcher onNextLevel={handleBack} />
                  </div>
                )}

                {activityType === 'g6-fractions-summary-sorter' && (
                  <div className="w-full max-w-5xl mx-auto px-4 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleBack}
                      className="mb-4 rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Vissza a témakörökhöz
                    </Button>
                    <Grade6FractionsSummarySorter onNextLevel={handleBack} />
                  </div>
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

                {activityType === 'g5-fraction-to-decimal-matcher' && (
                  <Grade5FractionToDecimalMatcher onBack={handleBack} />
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

                {activityType === 'g6-word-problems-quiz' && (
                  <Grade6WordProblemsQuiz onBack={handleBack} />
                )}

                {activityType === 'g6-word-problems-module' && (
                  <Grade6WordProblemsModule onBack={handleBack} />
                )}

                {activityType === 'g7-word-problems' && (
                  <WordProblemsQuiz onBack={handleBack} />
                )}

                {activityType === 'g7-mapping-quiz' && (
                  <MappingQuiz onBack={handleBack} />
                )}

                {activityType === 'g7-function-table-quiz' && (
                  <FunctionTableQuiz onBack={handleBack} />
                )}

                {(activityType === 'g8-logic' || activityType === 'g8-logic-quiz') && (
                  <Grade8LogicQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-logic-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-logic-theory' && (
                  <Grade8LogicTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-logic-quiz', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-set-basics-theory' && (
                  <Grade8SetBasicsTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-set-basics-quiz', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {(activityType === 'g8-set-basics' || activityType === 'g8-set-basics-quiz') && (
                  <Grade8SetBasicsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-set-basics-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-set-basics-matcher' && (
                  <Grade8SetBasicsMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-set-basics-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-set-basics-sorter' && (
                  <Grade8SetBasicsSorter
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-set-basics-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-set-operations-theory' && (
                  <Grade8SetOperationsTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-set-operations-quiz', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {(activityType === 'g8-set-operations' || activityType === 'g8-set-operations-quiz') && (
                  <Grade8SetOperationsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-set-operations-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-set-operations-matcher' && (
                  <Grade8SetOperationsMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-set-operations-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-set-operations-sorter' && (
                  <Grade8SetOperationsSorter
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-set-operations-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-rational-set-theory' && (
                  <Grade8RationalSetTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-rational-set-quiz', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {(activityType === 'g8-rational-set' || activityType === 'g8-rational-set-quiz') && (
                  <Grade8RationalSetQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-rational-set-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-rational-set-matcher' && (
                  <Grade8RationalSetMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-rational-set-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-rational-set-sorter' && (
                  <Grade8RationalSetSorter
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-rational-set-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-rational-operations-theory' && (
                  <Grade8RationalOperationsTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-rational-operations-quiz', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {(activityType === 'g8-rational-operations' || activityType === 'g8-rational-operations-quiz') && (
                  <Grade8RationalOperationsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-rational-operations-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-rational-operations-matcher' && (
                  <Grade8RationalOperationsMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-rational-operations-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-rational-operations-sorter' && (
                  <Grade8RationalOperationsSorter
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-rational-operations-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-powers-theory' && (
                  <Grade8PowersTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-powers-quiz', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {(activityType === 'g8-powers' || activityType === 'g8-powers-quiz') && (
                  <Grade8PowersQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-powers-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-powers-matcher' && (
                  <Grade8PowersMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-powers-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-powers-sorter' && (
                  <Grade8PowersSorter
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-powers-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-sqrt-concept-theory' && (
                  <Grade8SqrtConceptTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-sqrt-concept-quiz', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {(activityType === 'g8-sqrt-concept' || activityType === 'g8-sqrt-concept-quiz') && (
                  <Grade8SqrtConceptQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-sqrt-concept-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-sqrt-concept-matcher' && (
                  <Grade8SqrtConceptMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-sqrt-concept-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-sqrt-concept-sorter' && (
                  <Grade8SqrtConceptSorter
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-sqrt-concept-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-square-roots-theory' && (
                  <Grade8SquareRootsTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-square-roots-quiz', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {(activityType === 'g8-square-roots' || activityType === 'g8-square-roots-quiz') && (
                  <Grade8SquareRootsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-square-roots-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-square-roots-matcher' && (
                  <Grade8SquareRootsMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-square-roots-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-square-roots-sorter' && (
                  <Grade8SquareRootsSorter
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-square-roots-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-algebra-intro-theory' && (
                  <Grade8AlgebraIntroTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-algebra-intro-quiz', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {(activityType === 'g8-algebra-intro' || activityType === 'g8-algebra-intro-quiz') && (
                  <Grade8AlgebraIntroQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-algebra-intro-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-algebra-intro-matcher' && (
                  <Grade8AlgebraIntroMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-algebra-intro-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-algebra-intro-sorter' && (
                  <Grade8AlgebraIntroSorter
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-algebra-intro-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-factoring-theory' && (
                  <Grade8FactoringTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-factoring-quiz', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {(activityType === 'g8-factoring' || activityType === 'g8-factoring-quiz') && (
                  <Grade8FactoringQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-factoring-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-factoring-matcher' && (
                  <Grade8FactoringMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-factoring-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-factoring-sorter' && (
                  <Grade8FactoringSorter
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-factoring-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-polynomial-mult-theory' && (
                  <Grade8PolynomialMultTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-polynomial-mult-quiz', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {(activityType === 'g8-polynomial-mult' || activityType === 'g8-polynomial-mult-quiz') && (
                  <Grade8PolynomialMultQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-polynomial-mult-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-polynomial-mult-matcher' && (
                  <Grade8PolynomialMultMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-polynomial-mult-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-polynomial-mult-sorter' && (
                  <Grade8PolynomialMultSorter
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-polynomial-mult-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-chapter1-summary-theory' && (
                  <Grade8ChapterSummaryTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-chapter1-summary-quiz', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {(activityType === 'g8-chapter1-summary' || activityType === 'g8-chapter1-summary-quiz') && (
                  <Grade8ChapterSummaryQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-chapter1-summary-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-chapter1-summary-matcher' && (
                  <Grade8ChapterSummaryMatcher
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-chapter1-summary-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-chapter1-summary-sorter' && (
                  <Grade8ChapterSummarySorter
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-chapter1-summary-theory', selectedTopic?.id || 'g8-numbers-letters')}
                  />
                )}

                {activityType === 'g8-geom-congruence-theory' && (
                  <Grade8CongruenceTransformTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-geom-congruence-quiz', selectedTopic || 'g8-geometry')}
                  />
                )}

                {(activityType === 'g8-geom-congruence' || activityType === 'g8-geom-congruence-quiz') && (
                  <Grade8CongruenceTransformQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-geom-congruence-theory', selectedTopic || 'g8-geometry')}
                  />
                )}

                {activityType === 'g8-geom-congruence-matcher' && (
                  <Grade8CongruenceTransformMatcher
                    onNextLevel={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-geom-congruence-quiz', selectedTopic || 'g8-geometry')}
                    onSwitchToTheory={() => handleActivitySelect('g8-geom-congruence-theory', selectedTopic || 'g8-geometry')}
                  />
                )}

                {activityType === 'g8-geom-congruence-sorter' && (
                  <Grade8CongruenceTransformSorter
                    onNextLevel={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-geom-congruence-quiz', selectedTopic || 'g8-geometry')}
                    onSwitchToTheory={() => handleActivitySelect('g8-geom-congruence-theory', selectedTopic || 'g8-geometry')}
                  />
                )}

                {activityType === 'g8-geom-transforms-theory' && (
                  <Grade8TransformationsTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-geom-transforms-quiz', selectedTopic || 'g8-geometry')}
                  />
                )}

                {(activityType === 'g8-geom-transforms' || activityType === 'g8-geom-transforms-quiz') && (
                  <Grade8TransformationsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-geom-transforms-theory', selectedTopic || 'g8-geometry')}
                  />
                )}

                {activityType === 'g8-geom-transforms-matcher' && (
                  <Grade8TransformationsMatcher
                    onNextLevel={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-geom-transforms-quiz', selectedTopic || 'g8-geometry')}
                    onSwitchToTheory={() => handleActivitySelect('g8-geom-transforms-theory', selectedTopic || 'g8-geometry')}
                  />
                )}

                {activityType === 'g8-geom-transforms-sorter' && (
                  <Grade8TransformationsSorter
                    onNextLevel={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-geom-transforms-quiz', selectedTopic || 'g8-geometry')}
                    onSwitchToTheory={() => handleActivitySelect('g8-geom-transforms-theory', selectedTopic || 'g8-geometry')}
                  />
                )}

                {activityType === 'g8-geom-software-theory' && (
                  <Grade8GeometrySoftwareTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-geom-software-quiz', selectedTopic || 'g8-geometry')}
                  />
                )}

                {(activityType === 'g8-geom-software' || activityType === 'g8-geom-software-quiz') && (
                  <Grade8GeometrySoftwareQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-geom-software-theory', selectedTopic || 'g8-geometry')}
                  />
                )}

                {activityType === 'g8-geom-software-matcher' && (
                  <Grade8GeometrySoftwareMatcher
                    onNextLevel={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-geom-software-quiz', selectedTopic || 'g8-geometry')}
                    onSwitchToTheory={() => handleActivitySelect('g8-geom-software-theory', selectedTopic || 'g8-geometry')}
                  />
                )}

                {activityType === 'g8-geom-software-sorter' && (
                  <Grade8GeometrySoftwareSorter
                    onNextLevel={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-geom-software-quiz', selectedTopic || 'g8-geometry')}
                    onSwitchToTheory={() => handleActivitySelect('g8-geom-software-theory', selectedTopic || 'g8-geometry')}
                  />
                )}

                {activityType === 'g8-geom-similarity-theory' && (
                  <Grade8SimilarityTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-geom-similarity-quiz', selectedTopic || 'g8-geometry')}
                  />
                )}

                {(activityType === 'g8-geom-similarity' || activityType === 'g8-geom-similarity-quiz') && (
                  <Grade8SimilarityQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-geom-similarity-theory', selectedTopic || 'g8-geometry')}
                  />
                )}

                {activityType === 'g8-geom-similarity-matcher' && (
                  <Grade8SimilarityMatcher
                    onNextLevel={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-geom-similarity-quiz', selectedTopic || 'g8-geometry')}
                    onSwitchToTheory={() => handleActivitySelect('g8-geom-similarity-theory', selectedTopic || 'g8-geometry')}
                  />
                )}

                {activityType === 'g8-geom-similarity-sorter' && (
                  <Grade8SimilaritySorter
                    onNextLevel={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-geom-similarity-quiz', selectedTopic || 'g8-geometry')}
                    onSwitchToTheory={() => handleActivitySelect('g8-geom-similarity-theory', selectedTopic || 'g8-geometry')}
                  />
                )}

                {activityType === 'g8-geom-central-similarity-theory' && (
                  <Grade8CentralSimilarityTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-geom-central-similarity-quiz', selectedTopic || 'g8-geometry')}
                  />
                )}

                {(activityType === 'g8-geom-central-similarity' || activityType === 'g8-geom-central-similarity-quiz') && (
                  <Grade8CentralSimilarityQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-geom-central-similarity-theory', selectedTopic || 'g8-geometry')}
                  />
                )}

                {activityType === 'g8-geom-central-similarity-matcher' && (
                  <Grade8CentralSimilarityMatcher
                    onNextLevel={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-geom-central-similarity-quiz', selectedTopic || 'g8-geometry')}
                    onSwitchToTheory={() => handleActivitySelect('g8-geom-central-similarity-theory', selectedTopic || 'g8-geometry')}
                  />
                )}

                {activityType === 'g8-geom-central-similarity-sorter' && (
                  <Grade8CentralSimilaritySorter
                    onNextLevel={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-geom-central-similarity-quiz', selectedTopic || 'g8-geometry')}
                    onSwitchToTheory={() => handleActivitySelect('g8-geom-central-similarity-theory', selectedTopic || 'g8-geometry')}
                  />
                )}

                {activityType === 'g8-geom-constructions-theory' && (
                  <Grade8GeometricConstructionsTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-geom-constructions-quiz', selectedTopic || 'g8-geometry')}
                  />
                )}

                {(activityType === 'g8-geom-constructions' || activityType === 'g8-geom-constructions-quiz') && (
                  <Grade8GeometricConstructionsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-geom-constructions-theory', selectedTopic || 'g8-geometry')}
                  />
                )}

                {activityType === 'g8-geom-constructions-matcher' && (
                  <Grade8GeometricConstructionsMatcher
                    onNextLevel={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-geom-constructions-quiz', selectedTopic || 'g8-geometry')}
                    onSwitchToTheory={() => handleActivitySelect('g8-geom-constructions-theory', selectedTopic || 'g8-geometry')}
                  />
                )}

                {activityType === 'g8-geom-constructions-sorter' && (
                  <Grade8GeometricConstructionsSorter
                    onNextLevel={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-geom-constructions-quiz', selectedTopic || 'g8-geometry')}
                    onSwitchToTheory={() => handleActivitySelect('g8-geom-constructions-theory', selectedTopic || 'g8-geometry')}
                  />
                )}

                {activityType === 'g8-geom-summary-theory' && (
                  <Grade8Chapter2GeometrySummaryTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-geom-summary-quiz', selectedTopic || 'g8-geometry')}
                  />
                )}

                {(activityType === 'g8-geom-summary' || activityType === 'g8-geom-summary-quiz') && (
                  <Grade8Chapter2GeometrySummaryQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-geom-summary-theory', selectedTopic || 'g8-geometry')}
                  />
                )}

                {activityType === 'g8-geom-summary-matcher' && (
                  <Grade8Chapter2GeometrySummaryMatcher
                    onNextLevel={handleBack}
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-geom-summary-quiz', selectedTopic || 'g8-geometry')}
                    onSwitchToTheory={() => handleActivitySelect('g8-geom-summary-theory', selectedTopic || 'g8-geometry')}
                  />
                )}

                {activityType === 'g8-geom-summary-sorter' && (
                  <Grade8Chapter2GeometrySummarySorter
                    onNextLevel={handleBack}
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-geom-summary-quiz', selectedTopic || 'g8-geometry')}
                    onSwitchToTheory={() => handleActivitySelect('g8-geom-summary-theory', selectedTopic || 'g8-geometry')}
                  />
                )}

                {activityType === 'g8-algebra' && (
                  <Grade8AlgebraQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-eq-basic-theory' && (
                  <Grade8EquationsTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-eq-basic', selectedTopic || 'g8-equations')}
                  />
                )}

                {(activityType === 'g8-eq-basic' || activityType === 'g8-eq-basic-quiz') && (
                  <Grade8EquationsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-eq-basic-theory', selectedTopic || 'g8-equations')}
                  />
                )}

                {activityType === 'g8-eq-basic-matcher' && (
                  <Grade8EquationsMatcher
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-eq-basic', selectedTopic || 'g8-equations')}
                    onSwitchToTheory={() => handleActivitySelect('g8-eq-basic-theory', selectedTopic || 'g8-equations')}
                  />
                )}

                {activityType === 'g8-eq-basic-sorter' && (
                  <Grade8EquationsSorter
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-eq-basic', selectedTopic || 'g8-equations')}
                    onSwitchToTheory={() => handleActivitySelect('g8-eq-basic-theory', selectedTopic || 'g8-equations')}
                  />
                )}

                {activityType === 'g8-equation-balance' && (
                  <Grade8EquationBalanceQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-eq-numbers-ages-theory' && (
                  <Grade8NumbersAgesTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-eq-numbers-ages', selectedTopic || 'g8-equations')}
                  />
                )}

                {(activityType === 'g8-eq-numbers-ages' || activityType === 'g8-eq-numbers-ages-quiz') && (
                  <Grade8NumbersAgesQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-eq-numbers-ages-theory', selectedTopic || 'g8-equations')}
                  />
                )}

                {activityType === 'g8-eq-numbers-ages-matcher' && (
                  <Grade8NumbersAgesMatcher
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-eq-numbers-ages', selectedTopic || 'g8-equations')}
                    onSwitchToTheory={() => handleActivitySelect('g8-eq-numbers-ages-theory', selectedTopic || 'g8-equations')}
                  />
                )}

                {activityType === 'g8-eq-numbers-ages-sorter' && (
                  <Grade8NumbersAgesSorter
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-eq-numbers-ages', selectedTopic || 'g8-equations')}
                    onSwitchToTheory={() => handleActivitySelect('g8-eq-numbers-ages-theory', selectedTopic || 'g8-equations')}
                  />
                )}

                {activityType === 'g8-eq-mixing-theory' && (
                  <Grade8MixingWordProblemsTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-eq-mixing', selectedTopic || 'g8-equations')}
                  />
                )}

                {(activityType === 'g8-eq-mixing' || activityType === 'g8-eq-mixing-quiz') && (
                  <Grade8MixingWordProblemsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-eq-mixing-theory', selectedTopic || 'g8-equations')}
                  />
                )}

                {activityType === 'g8-eq-mixing-matcher' && (
                  <Grade8MixingWordProblemsMatcher
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-eq-mixing', selectedTopic || 'g8-equations')}
                    onSwitchToTheory={() => handleActivitySelect('g8-eq-mixing-theory', selectedTopic || 'g8-equations')}
                  />
                )}

                {activityType === 'g8-eq-mixing-sorter' && (
                  <Grade8MixingWordProblemsSorter
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-eq-mixing', selectedTopic || 'g8-equations')}
                    onSwitchToTheory={() => handleActivitySelect('g8-eq-mixing-theory', selectedTopic || 'g8-equations')}
                  />
                )}

                {activityType === 'g8-eq-motion-work-theory' && (
                  <Grade8MotionWorkProblemsTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-eq-motion-work', selectedTopic || 'g8-equations')}
                  />
                )}

                {(activityType === 'g8-eq-motion-work' || activityType === 'g8-eq-motion-work-quiz') && (
                  <Grade8MotionWorkProblemsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-eq-motion-work-theory', selectedTopic || 'g8-equations')}
                  />
                )}

                {activityType === 'g8-eq-motion-work-matcher' && (
                  <Grade8MotionWorkProblemsMatcher
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-eq-motion-work', selectedTopic || 'g8-equations')}
                    onSwitchToTheory={() => handleActivitySelect('g8-eq-motion-work-theory', selectedTopic || 'g8-equations')}
                  />
                )}

                {activityType === 'g8-eq-motion-work-sorter' && (
                  <Grade8MotionWorkProblemsSorter
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-eq-motion-work', selectedTopic || 'g8-equations')}
                    onSwitchToTheory={() => handleActivitySelect('g8-eq-motion-work-theory', selectedTopic || 'g8-equations')}
                  />
                )}

                {activityType === 'g8-eq-geometry-theory' && (
                  <Grade8GeometricEquationsTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-eq-geometry', selectedTopic || 'g8-equations')}
                  />
                )}

                {(activityType === 'g8-eq-geometry' || activityType === 'g8-eq-geometry-quiz') && (
                  <Grade8GeometricEquationsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-eq-geometry-theory', selectedTopic || 'g8-equations')}
                  />
                )}

                {activityType === 'g8-eq-geometry-matcher' && (
                  <Grade8GeometricEquationsMatcher
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-eq-geometry', selectedTopic || 'g8-equations')}
                    onSwitchToTheory={() => handleActivitySelect('g8-eq-geometry-theory', selectedTopic || 'g8-equations')}
                  />
                )}

                {activityType === 'g8-eq-geometry-sorter' && (
                  <Grade8GeometricEquationsSorter
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-eq-geometry', selectedTopic || 'g8-equations')}
                    onSwitchToTheory={() => handleActivitySelect('g8-eq-geometry-theory', selectedTopic || 'g8-equations')}
                  />
                )}

                {activityType === 'g8-eq-mixed-theory' && (
                  <Grade8MixedWordProblemsTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-eq-mixed', selectedTopic || 'g8-equations')}
                  />
                )}

                {(activityType === 'g8-eq-mixed' || activityType === 'g8-eq-mixed-quiz') && (
                  <Grade8MixedWordProblemsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-eq-mixed-theory', selectedTopic || 'g8-equations')}
                  />
                )}

                {activityType === 'g8-eq-mixed-matcher' && (
                  <Grade8MixedWordProblemsMatcher
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-eq-mixed', selectedTopic || 'g8-equations')}
                    onSwitchToTheory={() => handleActivitySelect('g8-eq-mixed-theory', selectedTopic || 'g8-equations')}
                  />
                )}

                {activityType === 'g8-eq-mixed-sorter' && (
                  <Grade8MixedWordProblemsSorter
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-eq-mixed', selectedTopic || 'g8-equations')}
                    onSwitchToTheory={() => handleActivitySelect('g8-eq-mixed-theory', selectedTopic || 'g8-equations')}
                  />
                )}

                {activityType === 'g8-eq-financial-theory' && (
                  <Grade8FinancialProblemsTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-eq-financial', selectedTopic || 'g8-equations')}
                  />
                )}

                {(activityType === 'g8-eq-financial' || activityType === 'g8-eq-financial-quiz') && (
                  <Grade8FinancialProblemsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-eq-financial-theory', selectedTopic || 'g8-equations')}
                  />
                )}

                {activityType === 'g8-eq-financial-matcher' && (
                  <Grade8FinancialProblemsMatcher
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-eq-financial', selectedTopic || 'g8-equations')}
                    onSwitchToTheory={() => handleActivitySelect('g8-eq-financial-theory', selectedTopic || 'g8-equations')}
                  />
                )}

                {activityType === 'g8-eq-financial-sorter' && (
                  <Grade8FinancialProblemsSorter
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-eq-financial', selectedTopic || 'g8-equations')}
                    onSwitchToTheory={() => handleActivitySelect('g8-eq-financial-theory', selectedTopic || 'g8-equations')}
                  />
                )}

                {activityType === 'g8-eq-summary-theory' && (
                  <Grade8Chapter3EquationsSummaryTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-eq-summary', selectedTopic || 'g8-equations')}
                  />
                )}

                {(activityType === 'g8-eq-summary' || activityType === 'g8-eq-summary-quiz') && (
                  <Grade8Chapter3EquationsSummaryQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-eq-summary-theory', selectedTopic || 'g8-equations')}
                  />
                )}

                {activityType === 'g8-eq-summary-matcher' && (
                  <Grade8Chapter3EquationsSummaryMatcher
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-eq-summary', selectedTopic || 'g8-equations')}
                    onSwitchToTheory={() => handleActivitySelect('g8-eq-summary-theory', selectedTopic || 'g8-equations')}
                  />
                )}

                {activityType === 'g8-eq-summary-sorter' && (
                  <Grade8Chapter3EquationsSummarySorter
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-eq-summary', selectedTopic || 'g8-equations')}
                    onSwitchToTheory={() => handleActivitySelect('g8-eq-summary-theory', selectedTopic || 'g8-equations')}
                  />
                )}

                {activityType === 'g8-pyth-constructions-theory' && (
                  <Grade8ConstructionsMeasurementsTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-pyth-constructions', selectedTopic || 'g8-pythagoras')}
                  />
                )}

                {activityType === 'g8-pyth-constructions' && (
                  <Grade8ConstructionsMeasurementsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-pyth-constructions-theory', selectedTopic || 'g8-pythagoras')}
                  />
                )}

                {activityType === 'g8-pyth-theorem-theory' && (
                  <Grade8PythagorasTheoremTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-pyth-theorem', selectedTopic || 'g8-pythagoras')}
                  />
                )}

                {activityType === 'g8-pyth-theorem' && (
                  <Grade8PythagorasTheoremQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-pyth-theorem-theory', selectedTopic || 'g8-pythagoras')}
                  />
                )}

                {activityType === 'g8-pyth-converse-theory' && (
                  <Grade8ConversePythagorasTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-pyth-converse', selectedTopic || 'g8-pythagoras')}
                  />
                )}

                {activityType === 'g8-pyth-converse' && (
                  <Grade8ConversePythagorasQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-pyth-converse-theory', selectedTopic || 'g8-pythagoras')}
                  />
                )}

                {activityType === 'g8-pyth-applications-theory' && (
                  <Grade8PythagorasApplicationsTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-pyth-applications', selectedTopic || 'g8-pythagoras')}
                  />
                )}

                {activityType === 'g8-pyth-applications' && (
                  <Grade8PythagorasApplicationsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-pyth-applications-theory', selectedTopic || 'g8-pythagoras')}
                  />
                )}

                {activityType === 'g8-pyth-calculator-theory' && (
                  <Grade8CalculatorProjectTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-pyth-calculator', selectedTopic || 'g8-pythagoras')}
                  />
                )}

                {activityType === 'g8-pyth-calculator' && (
                  <Grade8CalculatorProjectQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-pyth-calculator-theory', selectedTopic || 'g8-pythagoras')}
                  />
                )}

                {activityType === 'g8-pyth-special-triangles-theory' && (
                  <Grade8SpecialRightTrianglesTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-pyth-special-triangles', selectedTopic || 'g8-pythagoras')}
                  />
                )}

                {activityType === 'g8-pyth-special-triangles' && (
                  <Grade8SpecialRightTrianglesQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-pyth-special-triangles-theory', selectedTopic || 'g8-pythagoras')}
                  />
                )}

                {activityType === 'g8-pyth-summary-theory' && (
                  <Grade8Chapter5PythagorasSummaryTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-pyth-summary', selectedTopic || 'g8-pythagoras')}
                  />
                )}

                {activityType === 'g8-pyth-summary' && (
                  <Grade8Chapter5PythagorasSummaryQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-pyth-summary-theory', selectedTopic || 'g8-pythagoras')}
                  />
                )}

                {activityType === 'g8-func-direct-theory' && (
                  <Grade8DirectProportionTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-func-direct', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-direct' && (
                  <Grade8DirectProportionQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-direct-theory', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-direct-matcher' && (
                  <Grade8DirectProportionMatcher
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-func-direct', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-direct-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToSorter={() => handleActivitySelect('g8-func-direct-sorter', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-direct-sorter' && (
                  <Grade8DirectProportionSorter
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-func-direct', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-direct-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToMatcher={() => handleActivitySelect('g8-func-direct-matcher', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-graphs-theory' && (
                  <Grade8FunctionsGraphsTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-func-graphs', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-graphs' && (
                  <Grade8FunctionsGraphsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-graphs-theory', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-graphs-matcher' && (
                  <Grade8FunctionsGraphsMatcher
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-func-graphs', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-graphs-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToSorter={() => handleActivitySelect('g8-func-graphs-sorter', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-graphs-sorter' && (
                  <Grade8FunctionsGraphsSorter
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-func-graphs', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-graphs-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToMatcher={() => handleActivitySelect('g8-func-graphs-matcher', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-inverse-theory' && (
                  <Grade8InverseProportionTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-func-inverse', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-inverse' && (
                  <Grade8InverseProportionQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-inverse-theory', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-inverse-matcher' && (
                  <Grade8InverseProportionMatcher
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-func-inverse', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-inverse-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToSorter={() => handleActivitySelect('g8-func-inverse-sorter', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-inverse-sorter' && (
                  <Grade8InverseProportionSorter
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-func-inverse', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-inverse-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToMatcher={() => handleActivitySelect('g8-func-inverse-matcher', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-reading-theory' && (
                  <Grade8ReadingGraphsTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-func-reading', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-reading' && (
                  <Grade8ReadingGraphsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-reading-theory', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-reading-matcher' && (
                  <Grade8ReadingGraphsMatcher
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-func-reading', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-reading-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToSorter={() => handleActivitySelect('g8-func-reading-sorter', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-reading-sorter' && (
                  <Grade8ReadingGraphsSorter
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-func-reading', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-reading-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToMatcher={() => handleActivitySelect('g8-func-reading-matcher', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-plotting-theory' && (
                  <Grade8PlottingGraphsTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-func-plotting', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-plotting' && (
                  <Grade8PlottingGraphsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-plotting-theory', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-plotting-matcher' && (
                  <Grade8PlottingGraphsMatcher
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-func-plotting', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-plotting-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToSorter={() => handleActivitySelect('g8-func-plotting-sorter', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-plotting-sorter' && (
                  <Grade8PlottingGraphsSorter
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-func-plotting', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-plotting-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToMatcher={() => handleActivitySelect('g8-func-plotting-matcher', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-frequency-theory' && (
                  <Grade8FrequencyStatisticsTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-func-frequency', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-frequency' && (
                  <Grade8FrequencyStatisticsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-frequency-theory', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-frequency-matcher' && (
                  <Grade8FrequencyStatisticsMatcher
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-func-frequency', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-frequency-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToSorter={() => handleActivitySelect('g8-func-frequency-sorter', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-frequency-sorter' && (
                  <Grade8FrequencyStatisticsSorter
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-func-frequency', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-frequency-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToMatcher={() => handleActivitySelect('g8-func-frequency-matcher', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-game-theory' && (
                  <Grade8ProbabilityGameTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-func-game', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-game' && (
                  <Grade8ProbabilityGameQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-game-theory', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-game-matcher' && (
                  <Grade8ProbabilityGameMatcher
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-func-game', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-game-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToSorter={() => handleActivitySelect('g8-func-game-sorter', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-game-sorter' && (
                  <Grade8ProbabilityGameSorter
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-func-game', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-game-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToMatcher={() => handleActivitySelect('g8-func-game-matcher', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-prob-basics-theory' && (
                  <Grade8ProbabilityBasicsTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-func-prob-basics', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-prob-basics' && (
                  <Grade8ProbabilityBasicsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-prob-basics-theory', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-prob-basics-matcher' && (
                  <Grade8ProbabilityBasicsMatcher
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-func-prob-basics', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-prob-basics-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToSorter={() => handleActivitySelect('g8-func-prob-basics-sorter', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-prob-basics-sorter' && (
                  <Grade8ProbabilityBasicsSorter
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-func-prob-basics', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-prob-basics-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToMatcher={() => handleActivitySelect('g8-func-prob-basics-matcher', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-prob-problems-theory' && (
                  <Grade8ProbabilityProblemsTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-func-prob-problems', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-prob-problems' && (
                  <Grade8ProbabilityProblemsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-prob-problems-theory', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-prob-problems-matcher' && (
                  <Grade8ProbabilityProblemsMatcher
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-func-prob-problems', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-prob-problems-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToSorter={() => handleActivitySelect('g8-func-prob-problems-sorter', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-prob-problems-sorter' && (
                  <Grade8ProbabilityProblemsSorter
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-func-prob-problems', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-prob-problems-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToMatcher={() => handleActivitySelect('g8-func-prob-problems-matcher', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-patterns-theory' && (
                  <Grade8FindingPatternsTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-func-patterns', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-patterns' && (
                  <Grade8FindingPatternsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-patterns-theory', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-patterns-matcher' && (
                  <Grade8FindingPatternsMatcher
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-func-patterns', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-patterns-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToSorter={() => handleActivitySelect('g8-func-patterns-sorter', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-patterns-sorter' && (
                  <Grade8FindingPatternsSorter
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-func-patterns', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-patterns-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToMatcher={() => handleActivitySelect('g8-func-patterns-matcher', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-sequences-theory' && (
                  <Grade8SequencesTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-func-sequences', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-sequences' && (
                  <Grade8SequencesQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-sequences-theory', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-sequences-matcher' && (
                  <Grade8SequencesMatcher
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-func-sequences', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-sequences-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToSorter={() => handleActivitySelect('g8-func-sequences-sorter', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-sequences-sorter' && (
                  <Grade8SequencesSorter
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-func-sequences', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-sequences-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToMatcher={() => handleActivitySelect('g8-func-sequences-matcher', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-summary-theory' && (
                  <Grade8Chapter6SummaryTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-func-summary', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-summary' && (
                  <Grade8Chapter6SummaryQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-summary-theory', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-summary-matcher' && (
                  <Grade8Chapter6SummaryMatcher
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-func-summary', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-summary-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToSorter={() => handleActivitySelect('g8-func-summary-sorter', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-func-summary-sorter' && (
                  <Grade8Chapter6SummarySorter
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-func-summary', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToTheory={() => handleActivitySelect('g8-func-summary-theory', selectedTopic || 'g8-functions-probability-sequences')}
                    onSwitchToMatcher={() => handleActivitySelect('g8-func-summary-matcher', selectedTopic || 'g8-functions-probability-sequences')}
                  />
                )}

                {activityType === 'g8-solids-review-theory' && (
                  <Grade8SolidsReviewTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-solids-review', selectedTopic || 'g8-solids')}
                  />
                )}

                {activityType === 'g8-solids-review' && (
                  <Grade8SolidsReviewQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-solids-review-theory', selectedTopic || 'g8-solids')}
                  />
                )}

                {activityType === 'g8-solids-review-matcher' && (
                  <Grade8SolidsReviewMatcher
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-solids-review', selectedTopic || 'g8-solids')}
                    onSwitchToTheory={() => handleActivitySelect('g8-solids-review-theory', selectedTopic || 'g8-solids')}
                    onSwitchToSorter={() => handleActivitySelect('g8-solids-review-sorter', selectedTopic || 'g8-solids')}
                  />
                )}

                {activityType === 'g8-solids-review-sorter' && (
                  <Grade8SolidsReviewSorter
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-solids-review', selectedTopic || 'g8-solids')}
                    onSwitchToTheory={() => handleActivitySelect('g8-solids-review-theory', selectedTopic || 'g8-solids')}
                    onSwitchToMatcher={() => handleActivitySelect('g8-solids-review-matcher', selectedTopic || 'g8-solids')}
                  />
                )}

                {activityType === 'g8-solids-pyramids-theory' && (
                  <Grade8PyramidsTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-solids-pyramids', selectedTopic || 'g8-solids')}
                  />
                )}

                {(activityType === 'g8-solids-pyramids' || activityType === 'g8-solids-pyramids-intro') && (
                  <Grade8PyramidsQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-solids-pyramids-theory', selectedTopic || 'g8-solids')}
                  />
                )}

                {activityType === 'g8-solids-pyramids-matcher' && (
                  <Grade8PyramidsMatcher
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-solids-pyramids', selectedTopic || 'g8-solids')}
                    onSwitchToTheory={() => handleActivitySelect('g8-solids-pyramids-theory', selectedTopic || 'g8-solids')}
                    onSwitchToSorter={() => handleActivitySelect('g8-solids-pyramids-sorter', selectedTopic || 'g8-solids')}
                  />
                )}

                {activityType === 'g8-solids-pyramids-sorter' && (
                  <Grade8PyramidsSorter
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-solids-pyramids', selectedTopic || 'g8-solids')}
                    onSwitchToTheory={() => handleActivitySelect('g8-solids-pyramids-theory', selectedTopic || 'g8-solids')}
                    onSwitchToMatcher={() => handleActivitySelect('g8-solids-pyramids-matcher', selectedTopic || 'g8-solids')}
                  />
                )}

                {activityType === 'g8-solids-pyramids-calc-theory' && (
                  <Grade8PyramidSurfaceVolumeTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-solids-pyramids-calc', selectedTopic || 'g8-solids')}
                  />
                )}

                {activityType === 'g8-solids-pyramids-calc' && (
                  <Grade8PyramidSurfaceVolumeQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-solids-pyramids-calc-theory', selectedTopic || 'g8-solids')}
                  />
                )}

                {activityType === 'g8-solids-pyramids-calc-matcher' && (
                  <Grade8PyramidSurfaceVolumeMatcher
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-solids-pyramids-calc', selectedTopic || 'g8-solids')}
                    onSwitchToTheory={() => handleActivitySelect('g8-solids-pyramids-calc-theory', selectedTopic || 'g8-solids')}
                    onSwitchToSorter={() => handleActivitySelect('g8-solids-pyramids-calc-sorter', selectedTopic || 'g8-solids')}
                  />
                )}

                {activityType === 'g8-solids-pyramids-calc-sorter' && (
                  <Grade8PyramidSurfaceVolumeSorter
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-solids-pyramids-calc', selectedTopic || 'g8-solids')}
                    onSwitchToTheory={() => handleActivitySelect('g8-solids-pyramids-calc-theory', selectedTopic || 'g8-solids')}
                    onSwitchToMatcher={() => handleActivitySelect('g8-solids-pyramids-calc-matcher', selectedTopic || 'g8-solids')}
                  />
                )}

                {activityType === 'g8-solids-sphere-theory' && (
                  <Grade8SphereTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-solids-sphere', selectedTopic || 'g8-solids')}
                  />
                )}

                {activityType === 'g8-solids-sphere' && (
                  <Grade8SphereQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-solids-sphere-theory', selectedTopic || 'g8-solids')}
                    onSwitchToMatcher={() => handleActivitySelect('g8-solids-sphere-matcher', selectedTopic || 'g8-solids')}
                    onSwitchToSorter={() => handleActivitySelect('g8-solids-sphere-sorter', selectedTopic || 'g8-solids')}
                  />
                )}

                {activityType === 'g8-solids-sphere-matcher' && (
                  <Grade8SphereMatcher
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-solids-sphere', selectedTopic || 'g8-solids')}
                    onSwitchToTheory={() => handleActivitySelect('g8-solids-sphere-theory', selectedTopic || 'g8-solids')}
                    onSwitchToSorter={() => handleActivitySelect('g8-solids-sphere-sorter', selectedTopic || 'g8-solids')}
                  />
                )}

                {activityType === 'g8-solids-sphere-sorter' && (
                  <Grade8SphereSorter
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-solids-sphere', selectedTopic || 'g8-solids')}
                    onSwitchToTheory={() => handleActivitySelect('g8-solids-sphere-theory', selectedTopic || 'g8-solids')}
                    onSwitchToMatcher={() => handleActivitySelect('g8-solids-sphere-matcher', selectedTopic || 'g8-solids')}
                  />
                )}

                {activityType === 'g8-solids-earth-theory' && (
                  <Grade8EarthTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-solids-earth', selectedTopic || 'g8-solids')}
                  />
                )}

                {activityType === 'g8-solids-earth' && (
                  <Grade8EarthQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-solids-earth-theory', selectedTopic || 'g8-solids')}
                    onSwitchToMatcher={() => handleActivitySelect('g8-solids-earth-matcher', selectedTopic || 'g8-solids')}
                    onSwitchToSorter={() => handleActivitySelect('g8-solids-earth-sorter', selectedTopic || 'g8-solids')}
                  />
                )}

                {activityType === 'g8-solids-earth-matcher' && (
                  <Grade8EarthMatcher
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-solids-earth', selectedTopic || 'g8-solids')}
                    onSwitchToTheory={() => handleActivitySelect('g8-solids-earth-theory', selectedTopic || 'g8-solids')}
                    onSwitchToSorter={() => handleActivitySelect('g8-solids-earth-sorter', selectedTopic || 'g8-solids')}
                  />
                )}

                {activityType === 'g8-solids-earth-sorter' && (
                  <Grade8EarthSorter
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-solids-earth', selectedTopic || 'g8-solids')}
                    onSwitchToTheory={() => handleActivitySelect('g8-solids-earth-theory', selectedTopic || 'g8-solids')}
                    onSwitchToMatcher={() => handleActivitySelect('g8-solids-earth-matcher', selectedTopic || 'g8-solids')}
                  />
                )}

                {activityType === 'g8-solids-summary-theory' && (
                  <Grade8SolidsSummaryTheory
                    onBack={handleBack}
                    onStartQuiz={() => handleActivitySelect('g8-solids-summary', selectedTopic || 'g8-solids')}
                  />
                )}

                {activityType === 'g8-solids-summary' && (
                  <Grade8SolidsSummaryQuiz
                    onBack={handleBack}
                    onSwitchToTheory={() => handleActivitySelect('g8-solids-summary-theory', selectedTopic || 'g8-solids')}
                    onSwitchToMatcher={() => handleActivitySelect('g8-solids-summary-matcher', selectedTopic || 'g8-solids')}
                    onSwitchToSorter={() => handleActivitySelect('g8-solids-summary-sorter', selectedTopic || 'g8-solids')}
                  />
                )}

                {activityType === 'g8-solids-summary-matcher' && (
                  <Grade8SolidsSummaryMatcher
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-solids-summary', selectedTopic || 'g8-solids')}
                    onSwitchToTheory={() => handleActivitySelect('g8-solids-summary-theory', selectedTopic || 'g8-solids')}
                    onSwitchToSorter={() => handleActivitySelect('g8-solids-summary-sorter', selectedTopic || 'g8-solids')}
                  />
                )}

                {activityType === 'g8-solids-summary-sorter' && (
                  <Grade8SolidsSummarySorter
                    onBack={handleBack}
                    onSwitchToQuiz={() => handleActivitySelect('g8-solids-summary', selectedTopic || 'g8-solids')}
                    onSwitchToTheory={() => handleActivitySelect('g8-solids-summary-theory', selectedTopic || 'g8-solids')}
                    onSwitchToMatcher={() => handleActivitySelect('g8-solids-summary-matcher', selectedTopic || 'g8-solids')}
                  />
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

                {activityType === 'g6-ratio-intro-theory' && (
                   <RatioIntroTheory
                     onBack={handleBack}
                     onStartQuiz={() => handleActivitySelect('g6-ratio-intro-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {(activityType === 'g6-ratio-intro-quiz' || activityType === 'ratio-intro') && (
                   <RatioIntroQuiz
                     onBack={handleBack}
                     onSwitchToTheory={() => handleActivitySelect('g6-ratio-intro-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onOpenMatcher={() => handleActivitySelect('g6-ratio-intro-matcher', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onOpenSorter={() => handleActivitySelect('g6-ratio-intro-sorter', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-ratio-intro-matcher' && (
                   <RatioIntroMatcher
                     onBack={() => handleActivitySelect('g6-ratio-intro-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-ratio-intro-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToTheory={() => handleActivitySelect('g6-ratio-intro-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-ratio-intro-sorter' && (
                   <RatioIntroSorter
                     onBack={() => handleActivitySelect('g6-ratio-intro-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-ratio-intro-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToTheory={() => handleActivitySelect('g6-ratio-intro-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-ratio-division-theory' && (
                   <ProportionalDivisionTheory
                     onBack={handleBack}
                     onStartQuiz={() => handleActivitySelect('g6-ratio-division-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-ratio-division-quiz' && (
                   <ProportionalDivisionQuiz
                     onBack={handleBack}
                     onSwitchToTheory={() => handleActivitySelect('g6-ratio-division-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onOpenMatcher={() => handleActivitySelect('g6-ratio-division-matcher', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onOpenSorter={() => handleActivitySelect('g6-ratio-division-sorter', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-ratio-division-matcher' && (
                   <ProportionalDivisionMatcher
                     onBack={() => handleActivitySelect('g6-ratio-division-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-ratio-division-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToTheory={() => handleActivitySelect('g6-ratio-division-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-ratio-division-sorter' && (
                   <ProportionalDivisionSorter
                     onBack={() => handleActivitySelect('g6-ratio-division-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-ratio-division-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToTheory={() => handleActivitySelect('g6-ratio-division-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'ratio-creator' && (
                   <RatioCreatorQuiz onBack={handleBack} />
                )}

                {activityType === 'g6-direct-prop-theory' && (
                   <DirectProportionTheory
                     onBack={handleBack}
                     onStartQuiz={() => handleActivitySelect('g6-direct-prop-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {(activityType === 'g6-direct-prop-quiz' || activityType === 'direct-proportion-quiz') && (
                   <DirectProportionQuiz
                     onBack={handleBack}
                     onSwitchToTheory={() => handleActivitySelect('g6-direct-prop-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onOpenMatcher={() => handleActivitySelect('g6-direct-prop-matcher', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onOpenSorter={() => handleActivitySelect('g6-direct-prop-sorter', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-direct-prop-matcher' && (
                   <DirectProportionMatcher
                     onBack={() => handleActivitySelect('g6-direct-prop-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-direct-prop-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToTheory={() => handleActivitySelect('g6-direct-prop-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToSorter={() => handleActivitySelect('g6-direct-prop-sorter', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-direct-prop-sorter' && (
                   <DirectProportionSorter
                     onBack={() => handleActivitySelect('g6-direct-prop-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-direct-prop-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToTheory={() => handleActivitySelect('g6-direct-prop-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToMatcher={() => handleActivitySelect('g6-direct-prop-matcher', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-direct-prop-graph-theory' && (
                   <DirectProportionGraphTheory
                     onBack={handleBack}
                     onStartQuiz={() => handleActivitySelect('g6-direct-prop-graph-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-direct-prop-graph-quiz' && (
                   <DirectProportionGraphQuiz
                     onBack={handleBack}
                     onSwitchToTheory={() => handleActivitySelect('g6-direct-prop-graph-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onOpenMatcher={() => handleActivitySelect('g6-direct-prop-graph-matcher', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onOpenSorter={() => handleActivitySelect('g6-direct-prop-graph-sorter', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-direct-prop-graph-matcher' && (
                   <DirectProportionGraphMatcher
                     onBack={() => handleActivitySelect('g6-direct-prop-graph-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-direct-prop-graph-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToTheory={() => handleActivitySelect('g6-direct-prop-graph-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToSorter={() => handleActivitySelect('g6-direct-prop-graph-sorter', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-direct-prop-graph-sorter' && (
                   <DirectProportionGraphSorter
                     onBack={() => handleActivitySelect('g6-direct-prop-graph-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-direct-prop-graph-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToTheory={() => handleActivitySelect('g6-direct-prop-graph-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToMatcher={() => handleActivitySelect('g6-direct-prop-graph-matcher', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-rules-relations-theory' && (
                   <RulesAndRelationsTheory
                     onBack={handleBack}
                     onStartQuiz={() => handleActivitySelect('g6-rules-relations-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-rules-relations-quiz' && (
                   <RulesAndRelationsQuiz
                     onBack={handleBack}
                     onSwitchToTheory={() => handleActivitySelect('g6-rules-relations-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onOpenMatcher={() => handleActivitySelect('g6-rules-relations-matcher', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onOpenSorter={() => handleActivitySelect('g6-rules-relations-sorter', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-rules-relations-matcher' && (
                   <RulesAndRelationsMatcher
                     onBack={() => handleActivitySelect('g6-rules-relations-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-rules-relations-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToTheory={() => handleActivitySelect('g6-rules-relations-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-rules-relations-sorter' && (
                   <RulesAndRelationsSorter
                     onBack={() => handleActivitySelect('g6-rules-relations-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-rules-relations-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToTheory={() => handleActivitySelect('g6-rules-relations-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-fraction-part-theory' && (
                   <FractionPartTheory
                     onBack={handleBack}
                     onStartQuiz={() => handleActivitySelect('g6-fraction-part-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-fraction-part-quiz' && (
                   <FractionPartQuiz
                     onBack={handleBack}
                     onSwitchToTheory={() => handleActivitySelect('g6-fraction-part-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onOpenMatcher={() => handleActivitySelect('g6-fraction-part-matcher', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onOpenSorter={() => handleActivitySelect('g6-fraction-part-sorter', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-fraction-part-matcher' && (
                   <FractionPartMatcher
                     onBack={() => handleActivitySelect('g6-fraction-part-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-fraction-part-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToTheory={() => handleActivitySelect('g6-fraction-part-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-fraction-part-sorter' && (
                   <FractionPartSorter
                     onBack={() => handleActivitySelect('g6-fraction-part-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-fraction-part-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToTheory={() => handleActivitySelect('g6-fraction-part-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-percentage-theory' && (
                   <PercentageTheory
                     onBack={handleBack}
                     onStartQuiz={() => handleActivitySelect('g6-percentage-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-percentage-quiz' && (
                   <PercentageQuiz
                     onBack={handleBack}
                     onSwitchToTheory={() => handleActivitySelect('g6-percentage-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onOpenMatcher={() => handleActivitySelect('g6-percentage-matcher', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onOpenSorter={() => handleActivitySelect('g6-percentage-sorter', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-percentage-matcher' && (
                   <PercentageMatcher
                     onBack={() => handleActivitySelect('g6-percentage-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-percentage-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToTheory={() => handleActivitySelect('g6-percentage-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-percentage-sorter' && (
                   <PercentageSorter
                     onBack={() => handleActivitySelect('g6-percentage-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-percentage-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToTheory={() => handleActivitySelect('g6-percentage-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-percent-practice-theory' && (
                   <PercentPracticeTheory
                     onBack={handleBack}
                     onStartQuiz={() => handleActivitySelect('g6-percent-practice-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-percent-practice-quiz' && (
                   <PercentPracticeQuiz
                     onBack={handleBack}
                     onSwitchToTheory={() => handleActivitySelect('g6-percent-practice-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onOpenMatcher={() => handleActivitySelect('g6-percent-practice-matcher', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onOpenSorter={() => handleActivitySelect('g6-percent-practice-sorter', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-percent-practice-matcher' && (
                   <PercentPracticeMatcher
                     onBack={() => handleActivitySelect('g6-percent-practice-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-percent-practice-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToTheory={() => handleActivitySelect('g6-percent-practice-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-percent-practice-sorter' && (
                   <PercentPracticeSorter
                     onBack={() => handleActivitySelect('g6-percent-practice-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-percent-practice-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToTheory={() => handleActivitySelect('g6-percent-practice-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-open-sentences-theory' && (
                   <OpenSentencesTheory
                     onBack={handleBack}
                     onStartQuiz={() => handleActivitySelect('g6-open-sentences-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-open-sentences-quiz' && (
                   <OpenSentencesQuiz
                     onBack={handleBack}
                     onSwitchToTheory={() => handleActivitySelect('g6-open-sentences-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onOpenMatcher={() => handleActivitySelect('g6-open-sentences-matcher', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onOpenSorter={() => handleActivitySelect('g6-open-sentences-sorter', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-open-sentences-matcher' && (
                   <OpenSentencesMatcher
                     onBack={() => handleActivitySelect('g6-open-sentences-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-open-sentences-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToTheory={() => handleActivitySelect('g6-open-sentences-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-open-sentences-sorter' && (
                   <OpenSentencesSorter
                     onBack={() => handleActivitySelect('g6-open-sentences-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-open-sentences-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToTheory={() => handleActivitySelect('g6-open-sentences-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-word-problems-theory' && (
                   <Grade6WordProblemsTheory
                     onBack={handleBack}
                     onStartQuiz={() => handleActivitySelect('g6-word-problems-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-word-problems-quiz' && (
                   <Grade6WordProblemsQuiz
                     onBack={handleBack}
                     onSwitchToTheory={() => handleActivitySelect('g6-word-problems-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onOpenMatcher={() => handleActivitySelect('g6-word-problems-matcher', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onOpenSorter={() => handleActivitySelect('g6-word-problems-sorter', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-word-problems-matcher' && (
                   <Grade6WordProblemsMatcher
                     onBack={() => handleActivitySelect('g6-word-problems-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-word-problems-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToTheory={() => handleActivitySelect('g6-word-problems-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-word-problems-sorter' && (
                   <Grade6WordProblemsSorter
                     onBack={() => handleActivitySelect('g6-word-problems-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-word-problems-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToTheory={() => handleActivitySelect('g6-word-problems-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-word-problems-module' && (
                   <Grade6WordProblemsModule onBack={handleBack} />
                )}

                {activityType === 'g6-multiple-solutions-theory' && (
                   <MultipleSolutionsTheory
                     onBack={handleBack}
                     onStartQuiz={() => handleActivitySelect('g6-multiple-solutions-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-multiple-solutions-quiz' && (
                   <MultipleSolutionsQuiz
                     onBack={handleBack}
                     onSwitchToTheory={() => handleActivitySelect('g6-multiple-solutions-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onOpenMatcher={() => handleActivitySelect('g6-multiple-solutions-matcher', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onOpenSorter={() => handleActivitySelect('g6-multiple-solutions-sorter', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-multiple-solutions-matcher' && (
                   <MultipleSolutionsMatcher
                     onBack={() => handleActivitySelect('g6-multiple-solutions-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-multiple-solutions-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToTheory={() => handleActivitySelect('g6-multiple-solutions-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-multiple-solutions-sorter' && (
                   <MultipleSolutionsSorter
                     onBack={() => handleActivitySelect('g6-multiple-solutions-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-multiple-solutions-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToTheory={() => handleActivitySelect('g6-multiple-solutions-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-ratio-summary-theory' && (
                   <RatioSummaryTheory
                     onBack={handleBack}
                     onStartQuiz={() => handleActivitySelect('g6-ratio-summary-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-ratio-summary-quiz' && (
                   <RatioSummaryQuiz
                     onBack={handleBack}
                     onSwitchToTheory={() => handleActivitySelect('g6-ratio-summary-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onOpenMatcher={() => handleActivitySelect('g6-ratio-summary-matcher', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onOpenSorter={() => handleActivitySelect('g6-ratio-summary-sorter', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-ratio-summary-matcher' && (
                   <RatioSummaryMatcher
                     onBack={() => handleActivitySelect('g6-ratio-summary-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-ratio-summary-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToTheory={() => handleActivitySelect('g6-ratio-summary-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-ratio-summary-sorter' && (
                   <RatioSummarySorter
                     onBack={() => handleActivitySelect('g6-ratio-summary-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-ratio-summary-quiz', selectedTopic?.id || 'g6-ratio-percent-word')}
                     onSwitchToTheory={() => handleActivitySelect('g6-ratio-summary-theory', selectedTopic?.id || 'g6-ratio-percent-word')}
                   />
                )}

                {activityType === 'g6-length-mass-time-theory' && (
                   <LengthMassTimeTheory
                     onBack={handleBack}
                     onStartQuiz={() => handleActivitySelect('g6-length-mass-time-quiz', selectedTopic?.id || 'g6-measurement-perimeter-area')}
                   />
                )}

                {activityType === 'g6-length-mass-time-quiz' && (
                   <LengthMassTimeQuiz
                     onBack={handleBack}
                     onSwitchToTheory={() => handleActivitySelect('g6-length-mass-time-theory', selectedTopic?.id || 'g6-measurement-perimeter-area')}
                     onOpenMatcher={() => handleActivitySelect('g6-length-mass-time-matcher', selectedTopic?.id || 'g6-measurement-perimeter-area')}
                     onOpenSorter={() => handleActivitySelect('g6-length-mass-time-sorter', selectedTopic?.id || 'g6-measurement-perimeter-area')}
                   />
                )}

                {activityType === 'g6-length-mass-time-matcher' && (
                   <LengthMassTimeMatcher
                     onBack={() => handleActivitySelect('g6-length-mass-time-quiz', selectedTopic?.id || 'g6-measurement-perimeter-area')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-length-mass-time-quiz', selectedTopic?.id || 'g6-measurement-perimeter-area')}
                     onSwitchToTheory={() => handleActivitySelect('g6-length-mass-time-theory', selectedTopic?.id || 'g6-measurement-perimeter-area')}
                   />
                )}

                {activityType === 'g6-length-mass-time-sorter' && (
                   <LengthMassTimeSorter
                     onBack={() => handleActivitySelect('g6-length-mass-time-quiz', selectedTopic?.id || 'g6-measurements')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-length-mass-time-quiz', selectedTopic?.id || 'g6-measurements')}
                     onSwitchToTheory={() => handleActivitySelect('g6-length-mass-time-theory', selectedTopic?.id || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-polygon-perimeter-theory' && (
                   <PolygonPerimeterTheory
                     onBack={handleBack}
                     onStartQuiz={() => handleActivitySelect('g6-polygon-perimeter-quiz', selectedTopic?.id || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-polygon-perimeter-quiz' && (
                   <PolygonPerimeterQuiz
                     onBack={handleBack}
                     onSwitchToTheory={() => handleActivitySelect('g6-polygon-perimeter-theory', selectedTopic?.id || 'g6-measurements')}
                     onOpenMatcher={() => handleActivitySelect('g6-polygon-perimeter-matcher', selectedTopic?.id || 'g6-measurements')}
                     onOpenSorter={() => handleActivitySelect('g6-polygon-perimeter-sorter', selectedTopic?.id || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-polygon-perimeter-matcher' && (
                   <PolygonPerimeterMatcher
                     onBack={() => handleActivitySelect('g6-polygon-perimeter-quiz', selectedTopic?.id || 'g6-measurements')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-polygon-perimeter-quiz', selectedTopic?.id || 'g6-measurements')}
                     onSwitchToTheory={() => handleActivitySelect('g6-polygon-perimeter-theory', selectedTopic?.id || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-polygon-perimeter-sorter' && (
                   <PolygonPerimeterSorter
                     onBack={() => handleActivitySelect('g6-polygon-perimeter-quiz', selectedTopic?.id || 'g6-measurements')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-polygon-perimeter-quiz', selectedTopic?.id || 'g6-measurements')}
                     onSwitchToTheory={() => handleActivitySelect('g6-polygon-perimeter-theory', selectedTopic?.id || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-area-volume-measurement-theory' && (
                   <AreaVolumeMeasurementTheory
                     onBack={handleBack}
                     onStartQuiz={() => handleActivitySelect('g6-area-volume-measurement-quiz', selectedTopic?.id || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-area-volume-measurement-quiz' && (
                   <AreaVolumeMeasurementQuiz
                     onBack={handleBack}
                     onSwitchToTheory={() => handleActivitySelect('g6-area-volume-measurement-theory', selectedTopic?.id || 'g6-measurements')}
                     onOpenMatcher={() => handleActivitySelect('g6-area-volume-measurement-matcher', selectedTopic?.id || 'g6-measurements')}
                     onOpenSorter={() => handleActivitySelect('g6-area-volume-measurement-sorter', selectedTopic?.id || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-area-volume-measurement-matcher' && (
                   <AreaVolumeMeasurementMatcher
                     onBack={() => handleActivitySelect('g6-area-volume-measurement-quiz', selectedTopic?.id || 'g6-measurements')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-area-volume-measurement-quiz', selectedTopic?.id || 'g6-measurements')}
                     onSwitchToTheory={() => handleActivitySelect('g6-area-volume-measurement-theory', selectedTopic?.id || 'g6-measurements')}
                     onSwitchToSorter={() => handleActivitySelect('g6-area-volume-measurement-sorter', selectedTopic?.id || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-area-volume-measurement-sorter' && (
                   <AreaVolumeMeasurementSorter
                     onBack={() => handleActivitySelect('g6-area-volume-measurement-quiz', selectedTopic?.id || 'g6-measurements')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-area-volume-measurement-quiz', selectedTopic?.id || 'g6-measurements')}
                     onSwitchToTheory={() => handleActivitySelect('g6-area-volume-measurement-theory', selectedTopic?.id || 'g6-measurements')}
                     onSwitchToMatcher={() => handleActivitySelect('g6-area-volume-measurement-matcher', selectedTopic?.id || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-polygon-area-theory' && (
                   <PolygonAreaTheory
                     onBack={handleBack}
                     onStartQuiz={() => handleActivitySelect('g6-polygon-area-quiz', selectedTopic?.id || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-polygon-area-quiz' && (
                   <PolygonAreaQuiz
                     onBack={handleBack}
                     onSwitchToTheory={() => handleActivitySelect('g6-polygon-area-theory', selectedTopic?.id || 'g6-measurements')}
                     onOpenMatcher={() => handleActivitySelect('g6-polygon-area-matcher', selectedTopic?.id || 'g6-measurements')}
                     onOpenSorter={() => handleActivitySelect('g6-polygon-area-sorter', selectedTopic?.id || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-polygon-area-matcher' && (
                   <PolygonAreaMatcher
                     onBack={() => handleActivitySelect('g6-polygon-area-quiz', selectedTopic?.id || 'g6-measurements')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-polygon-area-quiz', selectedTopic?.id || 'g6-measurements')}
                     onSwitchToTheory={() => handleActivitySelect('g6-polygon-area-theory', selectedTopic?.id || 'g6-measurements')}
                     onSwitchToSorter={() => handleActivitySelect('g6-polygon-area-sorter', selectedTopic?.id || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-polygon-area-sorter' && (
                   <PolygonAreaSorter
                     onBack={() => handleActivitySelect('g6-polygon-area-quiz', selectedTopic?.id || 'g6-measurements')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-polygon-area-quiz', selectedTopic?.id || 'g6-measurements')}
                     onSwitchToTheory={() => handleActivitySelect('g6-polygon-area-theory', selectedTopic?.id || 'g6-measurements')}
                     onSwitchToMatcher={() => handleActivitySelect('g6-polygon-area-matcher', selectedTopic?.id || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-spatial-shapes-theory' && (
                   <SpatialShapesTheory
                     onBack={handleBack}
                     onStartQuiz={() => handleActivitySelect('g6-spatial-shapes-quiz', selectedTopic?.id || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-spatial-shapes-quiz' && (
                   <SpatialShapesQuiz
                     onBack={handleBack}
                     onSwitchToTheory={() => handleActivitySelect('g6-spatial-shapes-theory', selectedTopic?.id || 'g6-measurements')}
                     onOpenMatcher={() => handleActivitySelect('g6-spatial-shapes-matcher', selectedTopic?.id || 'g6-measurements')}
                     onOpenSorter={() => handleActivitySelect('g6-spatial-shapes-sorter', selectedTopic?.id || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-spatial-shapes-matcher' && (
                   <SpatialShapesMatcher
                     onBack={() => handleActivitySelect('g6-spatial-shapes-quiz', selectedTopic?.id || 'g6-measurements')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-spatial-shapes-quiz', selectedTopic?.id || 'g6-measurements')}
                     onSwitchToTheory={() => handleActivitySelect('g6-spatial-shapes-theory', selectedTopic?.id || 'g6-measurements')}
                     onSwitchToSorter={() => handleActivitySelect('g6-spatial-shapes-sorter', selectedTopic?.id || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-spatial-shapes-sorter' && (
                   <SpatialShapesSorter
                     onBack={() => handleActivitySelect('g6-spatial-shapes-quiz', selectedTopic?.id || 'g6-measurements')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-spatial-shapes-quiz', selectedTopic?.id || 'g6-measurements')}
                     onSwitchToTheory={() => handleActivitySelect('g6-spatial-shapes-theory', selectedTopic?.id || 'g6-measurements')}
                     onSwitchToMatcher={() => handleActivitySelect('g6-spatial-shapes-matcher', selectedTopic?.id || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-surface-area-theory' && (
                   <SurfaceAreaTheory
                     onBack={handleBack}
                     onStartQuiz={() => handleActivitySelect('g6-surface-area-quiz', selectedTopic || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-surface-area-quiz' && (
                   <Grade6SurfaceAreaQuiz
                     onBack={handleBack}
                     onSwitchToTheory={() => handleActivitySelect('g6-surface-area-theory', selectedTopic || 'g6-measurements')}
                     onOpenMatcher={() => handleActivitySelect('g6-surface-area-matcher', selectedTopic || 'g6-measurements')}
                     onOpenSorter={() => handleActivitySelect('g6-surface-area-sorter', selectedTopic || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-surface-area-matcher' && (
                   <SurfaceAreaMatcher
                     onBack={() => handleActivitySelect('g6-surface-area-quiz', selectedTopic || 'g6-measurements')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-surface-area-quiz', selectedTopic || 'g6-measurements')}
                     onSwitchToTheory={() => handleActivitySelect('g6-surface-area-theory', selectedTopic || 'g6-measurements')}
                     onSwitchToSorter={() => handleActivitySelect('g6-surface-area-sorter', selectedTopic || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-surface-area-sorter' && (
                   <SurfaceAreaSorter
                     onBack={() => handleActivitySelect('g6-surface-area-quiz', selectedTopic || 'g6-measurements')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-surface-area-quiz', selectedTopic || 'g6-measurements')}
                     onSwitchToTheory={() => handleActivitySelect('g6-surface-area-theory', selectedTopic || 'g6-measurements')}
                     onSwitchToMatcher={() => handleActivitySelect('g6-surface-area-matcher', selectedTopic || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-practical-surface-theory' && (
                   <PracticalSurfaceAreaTheory
                     onBack={handleBack}
                     onStartQuiz={() => handleActivitySelect('g6-practical-surface-quiz', selectedTopic || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-practical-surface-quiz' && (
                   <PracticalSurfaceAreaQuiz
                     onBack={handleBack}
                     onSwitchToTheory={() => handleActivitySelect('g6-practical-surface-theory', selectedTopic || 'g6-measurements')}
                     onOpenMatcher={() => handleActivitySelect('g6-practical-surface-matcher', selectedTopic || 'g6-measurements')}
                     onOpenSorter={() => handleActivitySelect('g6-practical-surface-sorter', selectedTopic || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-practical-surface-matcher' && (
                   <PracticalSurfaceAreaMatcher
                     onBack={() => handleActivitySelect('g6-practical-surface-quiz', selectedTopic || 'g6-measurements')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-practical-surface-quiz', selectedTopic || 'g6-measurements')}
                     onSwitchToTheory={() => handleActivitySelect('g6-practical-surface-theory', selectedTopic || 'g6-measurements')}
                     onSwitchToSorter={() => handleActivitySelect('g6-practical-surface-sorter', selectedTopic || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-practical-surface-sorter' && (
                   <PracticalSurfaceAreaSorter
                     onBack={() => handleActivitySelect('g6-practical-surface-quiz', selectedTopic || 'g6-measurements')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-practical-surface-quiz', selectedTopic || 'g6-measurements')}
                     onSwitchToTheory={() => handleActivitySelect('g6-practical-surface-theory', selectedTopic || 'g6-measurements')}
                     onSwitchToMatcher={() => handleActivitySelect('g6-practical-surface-matcher', selectedTopic || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-volume-theory' && (
                   <VolumeTheory
                     onBack={handleBack}
                     onStartQuiz={() => handleActivitySelect('g6-volume-quiz', selectedTopic || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-volume-quiz' && (
                   <Grade6VolumeQuiz
                     onBack={handleBack}
                     onSwitchToTheory={() => handleActivitySelect('g6-volume-theory', selectedTopic || 'g6-measurements')}
                     onOpenMatcher={() => handleActivitySelect('g6-volume-matcher', selectedTopic || 'g6-measurements')}
                     onOpenSorter={() => handleActivitySelect('g6-volume-sorter', selectedTopic || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-volume-matcher' && (
                   <VolumeMatcher
                     onBack={() => handleActivitySelect('g6-volume-quiz', selectedTopic || 'g6-measurements')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-volume-quiz', selectedTopic || 'g6-measurements')}
                     onSwitchToTheory={() => handleActivitySelect('g6-volume-theory', selectedTopic || 'g6-measurements')}
                     onSwitchToSorter={() => handleActivitySelect('g6-volume-sorter', selectedTopic || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-volume-sorter' && (
                   <VolumeSorter
                     onBack={() => handleActivitySelect('g6-volume-quiz', selectedTopic || 'g6-measurements')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-volume-quiz', selectedTopic || 'g6-measurements')}
                     onSwitchToTheory={() => handleActivitySelect('g6-volume-theory', selectedTopic || 'g6-measurements')}
                     onSwitchToMatcher={() => handleActivitySelect('g6-volume-matcher', selectedTopic || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-chapter5-summary-theory' && (
                   <Chapter5SummaryTheory
                     onBack={handleBack}
                     onStartQuiz={() => handleActivitySelect('g6-chapter5-summary-quiz', selectedTopic || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-chapter5-summary-quiz' && (
                   <Chapter5SummaryQuiz
                     onBack={handleBack}
                     onSwitchToTheory={() => handleActivitySelect('g6-chapter5-summary-theory', selectedTopic || 'g6-measurements')}
                     onOpenMatcher={() => handleActivitySelect('g6-chapter5-summary-matcher', selectedTopic || 'g6-measurements')}
                     onOpenSorter={() => handleActivitySelect('g6-chapter5-summary-sorter', selectedTopic || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-chapter5-summary-matcher' && (
                   <Chapter5SummaryMatcher
                     onBack={() => handleActivitySelect('g6-chapter5-summary-quiz', selectedTopic || 'g6-measurements')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-chapter5-summary-quiz', selectedTopic || 'g6-measurements')}
                     onSwitchToTheory={() => handleActivitySelect('g6-chapter5-summary-theory', selectedTopic || 'g6-measurements')}
                     onSwitchToSorter={() => handleActivitySelect('g6-chapter5-summary-sorter', selectedTopic || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-chapter5-summary-sorter' && (
                   <Chapter5SummarySorter
                     onBack={() => handleActivitySelect('g6-chapter5-summary-quiz', selectedTopic || 'g6-measurements')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-chapter5-summary-quiz', selectedTopic || 'g6-measurements')}
                     onSwitchToTheory={() => handleActivitySelect('g6-chapter5-summary-theory', selectedTopic || 'g6-measurements')}
                     onSwitchToMatcher={() => handleActivitySelect('g6-chapter5-summary-matcher', selectedTopic || 'g6-measurements')}
                   />
                )}

                {activityType === 'g6-stat-games-theory' && (
                   <StatisticsGamesTheory
                     onBack={handleBack}
                     onStartQuiz={() => handleActivitySelect('g6-stat-games-quiz', selectedTopic || 'g6-statistics')}
                   />
                )}

                {activityType === 'g6-stat-games-quiz' && (
                   <StatisticsGamesQuiz
                     onBack={handleBack}
                     onSwitchToTheory={() => handleActivitySelect('g6-stat-games-theory', selectedTopic || 'g6-statistics')}
                     onOpenMatcher={() => handleActivitySelect('g6-stat-games-matcher', selectedTopic || 'g6-statistics')}
                     onOpenSorter={() => handleActivitySelect('g6-stat-games-sorter', selectedTopic || 'g6-statistics')}
                   />
                )}

                {activityType === 'g6-stat-games-matcher' && (
                   <StatisticsGamesMatcher
                     onBack={() => handleActivitySelect('g6-stat-games-quiz', selectedTopic || 'g6-statistics')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-stat-games-quiz', selectedTopic || 'g6-statistics')}
                     onSwitchToTheory={() => handleActivitySelect('g6-stat-games-theory', selectedTopic || 'g6-statistics')}
                     onSwitchToSorter={() => handleActivitySelect('g6-stat-games-sorter', selectedTopic || 'g6-statistics')}
                   />
                )}

                {activityType === 'g6-stat-games-sorter' && (
                   <StatisticsGamesSorter
                     onBack={() => handleActivitySelect('g6-stat-games-quiz', selectedTopic || 'g6-statistics')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-stat-games-quiz', selectedTopic || 'g6-statistics')}
                     onSwitchToTheory={() => handleActivitySelect('g6-stat-games-theory', selectedTopic || 'g6-statistics')}
                     onSwitchToMatcher={() => handleActivitySelect('g6-stat-games-matcher', selectedTopic || 'g6-statistics')}
                   />
                )}

                {activityType === 'g6-charts-diagrams-theory' && (
                   <ChartsDiagramsTheory
                     onBack={handleBack}
                     onStartQuiz={() => handleActivitySelect('g6-charts-diagrams-quiz', selectedTopic || 'g6-statistics')}
                   />
                )}

                {activityType === 'g6-charts-diagrams-quiz' && (
                   <ChartsDiagramsQuiz
                     onBack={handleBack}
                     onSwitchToTheory={() => handleActivitySelect('g6-charts-diagrams-theory', selectedTopic || 'g6-statistics')}
                     onOpenMatcher={() => handleActivitySelect('g6-charts-diagrams-matcher', selectedTopic || 'g6-statistics')}
                     onOpenSorter={() => handleActivitySelect('g6-charts-diagrams-sorter', selectedTopic || 'g6-statistics')}
                   />
                )}

                {activityType === 'g6-charts-diagrams-matcher' && (
                   <ChartsDiagramsMatcher
                     onBack={() => handleActivitySelect('g6-charts-diagrams-quiz', selectedTopic || 'g6-statistics')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-charts-diagrams-quiz', selectedTopic || 'g6-statistics')}
                     onSwitchToTheory={() => handleActivitySelect('g6-charts-diagrams-theory', selectedTopic || 'g6-statistics')}
                     onSwitchToSorter={() => handleActivitySelect('g6-charts-diagrams-sorter', selectedTopic || 'g6-statistics')}
                   />
                )}

                {activityType === 'g6-charts-diagrams-sorter' && (
                   <ChartsDiagramsSorter
                     onBack={() => handleActivitySelect('g6-charts-diagrams-quiz', selectedTopic || 'g6-statistics')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-charts-diagrams-quiz', selectedTopic || 'g6-statistics')}
                     onSwitchToTheory={() => handleActivitySelect('g6-charts-diagrams-theory', selectedTopic || 'g6-statistics')}
                     onSwitchToMatcher={() => handleActivitySelect('g6-charts-diagrams-matcher', selectedTopic || 'g6-statistics')}
                   />
                )}

                {activityType === 'g6-pie-chart-theory' && (
                   <PieChartTheory
                     onBack={handleBack}
                     onStartQuiz={() => handleActivitySelect('g6-pie-chart-quiz', selectedTopic || 'g6-statistics')}
                   />
                )}

                {activityType === 'g6-pie-chart-quiz' && (
                   <PieChartQuiz
                     onBack={handleBack}
                     onSwitchToTheory={() => handleActivitySelect('g6-pie-chart-theory', selectedTopic || 'g6-statistics')}
                     onOpenMatcher={() => handleActivitySelect('g6-pie-chart-matcher', selectedTopic || 'g6-statistics')}
                     onOpenSorter={() => handleActivitySelect('g6-pie-chart-sorter', selectedTopic || 'g6-statistics')}
                   />
                )}

                {activityType === 'g6-pie-chart-matcher' && (
                   <PieChartMatcher
                     onBack={() => handleActivitySelect('g6-pie-chart-quiz', selectedTopic || 'g6-statistics')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-pie-chart-quiz', selectedTopic || 'g6-statistics')}
                     onSwitchToTheory={() => handleActivitySelect('g6-pie-chart-theory', selectedTopic || 'g6-statistics')}
                     onSwitchToSorter={() => handleActivitySelect('g6-pie-chart-sorter', selectedTopic || 'g6-statistics')}
                   />
                )}

                {activityType === 'g6-pie-chart-sorter' && (
                   <PieChartSorter
                     onBack={() => handleActivitySelect('g6-pie-chart-quiz', selectedTopic || 'g6-statistics')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-pie-chart-quiz', selectedTopic || 'g6-statistics')}
                     onSwitchToTheory={() => handleActivitySelect('g6-pie-chart-theory', selectedTopic || 'g6-statistics')}
                     onSwitchToMatcher={() => handleActivitySelect('g6-pie-chart-matcher', selectedTopic || 'g6-statistics')}
                   />
                )}

                {activityType === 'g6-data-mean-theory' && (
                   <DataMeanTheory
                     onBack={handleBack}
                     onStartQuiz={() => handleActivitySelect('g6-data-mean-quiz', selectedTopic || 'g6-statistics')}
                   />
                )}

                {activityType === 'g6-data-mean-quiz' && (
                   <DataMeanQuiz
                     onBack={handleBack}
                     onSwitchToTheory={() => handleActivitySelect('g6-data-mean-theory', selectedTopic || 'g6-statistics')}
                     onOpenMatcher={() => handleActivitySelect('g6-data-mean-matcher', selectedTopic || 'g6-statistics')}
                     onOpenSorter={() => handleActivitySelect('g6-data-mean-sorter', selectedTopic || 'g6-statistics')}
                   />
                )}

                {activityType === 'g6-data-mean-matcher' && (
                   <DataMeanMatcher
                     onBack={() => handleActivitySelect('g6-data-mean-quiz', selectedTopic || 'g6-statistics')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-data-mean-quiz', selectedTopic || 'g6-statistics')}
                     onSwitchToTheory={() => handleActivitySelect('g6-data-mean-theory', selectedTopic || 'g6-statistics')}
                     onSwitchToSorter={() => handleActivitySelect('g6-data-mean-sorter', selectedTopic || 'g6-statistics')}
                   />
                )}

                {activityType === 'g6-data-mean-sorter' && (
                   <DataMeanSorter
                     onBack={() => handleActivitySelect('g6-data-mean-quiz', selectedTopic || 'g6-statistics')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-data-mean-quiz', selectedTopic || 'g6-statistics')}
                     onSwitchToTheory={() => handleActivitySelect('g6-data-mean-theory', selectedTopic || 'g6-statistics')}
                     onSwitchToMatcher={() => handleActivitySelect('g6-data-mean-matcher', selectedTopic || 'g6-statistics')}
                   />
                )}

                {activityType === 'g6-stat-summary-theory' && (
                   <StatisticsSummaryTheory
                     onBack={handleBack}
                     onStartQuiz={() => handleActivitySelect('g6-stat-summary-quiz', selectedTopic || 'g6-statistics')}
                   />
                )}

                {activityType === 'g6-stat-summary-quiz' && (
                   <StatisticsSummaryQuiz
                     onBack={handleBack}
                     onSwitchToTheory={() => handleActivitySelect('g6-stat-summary-theory', selectedTopic || 'g6-statistics')}
                     onOpenMatcher={() => handleActivitySelect('g6-stat-summary-matcher', selectedTopic || 'g6-statistics')}
                     onOpenSorter={() => handleActivitySelect('g6-stat-summary-sorter', selectedTopic || 'g6-statistics')}
                   />
                )}

                {activityType === 'g6-stat-summary-matcher' && (
                   <StatisticsSummaryMatcher
                     onBack={() => handleActivitySelect('g6-stat-summary-quiz', selectedTopic || 'g6-statistics')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-stat-summary-quiz', selectedTopic || 'g6-statistics')}
                     onSwitchToTheory={() => handleActivitySelect('g6-stat-summary-theory', selectedTopic || 'g6-statistics')}
                     onSwitchToSorter={() => handleActivitySelect('g6-stat-summary-sorter', selectedTopic || 'g6-statistics')}
                   />
                )}

                {activityType === 'g6-stat-summary-sorter' && (
                   <StatisticsSummarySorter
                     onBack={() => handleActivitySelect('g6-stat-summary-quiz', selectedTopic || 'g6-statistics')}
                     onSwitchToQuiz={() => handleActivitySelect('g6-stat-summary-quiz', selectedTopic || 'g6-statistics')}
                     onSwitchToTheory={() => handleActivitySelect('g6-stat-summary-theory', selectedTopic || 'g6-statistics')}
                     onSwitchToMatcher={() => handleActivitySelect('g6-stat-summary-matcher', selectedTopic || 'g6-statistics')}
                   />
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

                {(activityType === 'g7-rational-numbers' || activityType === 'g7-expression-usage') && (
                  <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100 animate-slide-up">
                    <div className="inline-flex p-6 bg-slate-50 rounded-full text-slate-400 mb-6 group-hover:scale-110 transition-transform">
                      {activityType === 'g7-rational-numbers' ? <Calculator className="w-12 h-12" /> : <Variable className="w-12 h-12" />}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      {activityType === 'g7-rational-numbers' ? 'Racionális számok' : 'Számok és betűs kifejezések'}
                    </h3>
                    <p className="text-slate-500 max-w-md mx-auto mb-8 px-4">
                      Ez az interaktív modul hamarosan elkészül! Addig is nézd meg a többi tananyagot.
                    </p>
                    <Button
                      onClick={handleBack}
                      variant="outline"
                      className="rounded-xl px-8"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Vissza a témakörökhöz
                    </Button>
                  </div>
                )}

                {activityType && typeof activityType === 'string' && activityType.startsWith('g6-summary-') && (
                  <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100 animate-slide-up">
                    <div className="inline-flex p-6 bg-emerald-50 rounded-full text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                      <BookOpen className="w-12 h-12" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">
                      VII. Év végi összefoglalás
                    </h3>
                    <p className="text-slate-500 max-w-md mx-auto mb-8 px-4">
                      Ez az interaktív modul kidolgozás alatt áll, és hamarosan elérhető lesz!
                    </p>
                    <Button
                      onClick={handleBack}
                      variant="outline"
                      className="rounded-xl px-8"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Vissza a témakörökhöz
                    </Button>
                  </div>
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
              </div>
            )}
          </Suspense>
        </div>
      )}
        {activityType !== 'chess-game' && activityType !== 'snake-game' && activityType !== 'algebra-cloud' && activityType !== 'tower-builder' && activityType !== 'toto-maker' && activityType !== 'manipulative-division' && activityType !== 'manipulative-addition' && !isUpperGradeLayout && view !== 'competency-select' && ((activityType !== 'symmetry-construction' && activityType !== 'perimeter-area' && activityType !== 'volume-surface' && activityType !== 'student-feedback' && activityType !== 'volume-quiz' && activityType !== 'surface-area-quiz' && activityType !== 'unit-converter' && activityType !== 'capacity-converter' && activityType !== 'analog-clock' && activityType !== 'g7-mapping-quiz' && activityType !== 'g7-function-table-quiz') || view !== 'activity') && <SiteFooter />}
        {activeMaterial && (
          <LessonViewer material={activeMaterial} onClose={() => handleMaterialSelect(null)} />
        )}
        <OnlineTutoringModal isOpen={isTutoringModalOpen} onClose={() => setIsTutoringModalOpen(false)} />
      </div>
    </div>
  );
}

interface ToolCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}


function ToolCard({ title, desc, icon, color, onClick }: ToolCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 sm:gap-5 p-5 sm:p-6 bg-white rounded-3xl border-2 border-slate-100 hover:border-primary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 text-left shadow-sm group w-full"
    >
      <div className={cn("p-3.5 sm:p-4 rounded-2xl transition-transform group-hover:scale-110 flex-shrink-0 shadow-sm flex items-center justify-center", color)}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-display font-bold text-base sm:text-lg text-slate-800 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-xs sm:text-sm text-slate-500 leading-snug line-clamp-2 mt-0.5">{desc}</p>
      </div>
    </button>
  );
}


