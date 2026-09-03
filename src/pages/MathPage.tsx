import { useState, useRef, useEffect, useMemo, lazy, Suspense } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { SectionHeader } from "@/components/math/shared/SectionHeader";
import { ActivityPlaceholder } from "@/components/math/shared/ActivityPlaceholder";
import { mathTopics } from '@/data/mathTopics';
import { MathTopicCard } from "@/components/math/shared/MathTopicCard";
import { ScrollSpySidebar, NavItem } from "@/components/math/shared/ScrollSpySidebar";
import { HorizontalTopicNav } from "@/components/math/shared/HorizontalTopicNav";
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
const DecimalFractionsQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek").then(m => ({ default: m.DecimalFractionsQuiz }))) as any;
const DecimalMultiplicationQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek").then(m => ({ default: m.DecimalMultiplicationQuiz }))) as any;
const DecimalDivisionQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek").then(m => ({ default: m.DecimalDivisionQuiz }))) as any;
const Grade5FractionVisualMatcher = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek").then(m => ({ default: m.FractionVisualMatcher }))) as any;
const Grade5FractionsQuiz = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek").then(m => ({ default: m.FractionsQuiz }))) as any;
const Grade5FractionsModule = lazy(() => import("@/components/math/grade-5/tortek-tizedestortek").then(m => ({ default: m.FractionsModule }))) as any;
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
const AngleMatcher = lazy(() => import("@/components/math/grade-7/geometria/AngleMatcher").then(m => ({ default: m.AngleMatcher }))) as any;
const ShapeClassifier = lazy(() => import("@/components/math/grade-4/sikidomok-testek/ShapeClassifier").then(m => ({ default: m.ShapeClassifier }))) as any;
const LineRelationships = lazy(() => import("@/components/math/grade-4/sikidomok-testek/LineRelationships").then(m => ({ default: m.LineRelationships }))) as any;
const DivisibilityPowersModule = lazy(() => import("@/components/math/grade-7/hatvanyozas-oszthatosag/DivisibilityPowersModule").then(m => ({ default: m.DivisibilityPowersModule }))) as any;
const Grade6PrimeFactorization = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/hany-osztoja-van/PrimeFactorization").then(m => ({ default: m.PrimeFactorization }))) as any;
const Grade6PrimeFactorizationMatcher = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/hany-osztoja-van/PrimeFactorizationMatcher").then(m => ({ default: m.PrimeFactorizationMatcher }))) as any;
const Grade6DivisibilityQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/osszetett-oszthatosagi-szabalyok/DivisibilityQuiz").then(m => ({ default: m.DivisibilityQuiz }))) as any;
const Grade6LCMQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/tobbszoros-kozos-tobbszoros/LCMQuiz").then(m => ({ default: m.LCMQuiz }))) as any;
const Grade6GCDQuiz = lazy(() => import("@/components/math/grade-6/egesz-szamok-oszthatosag/oszto-kozos-oszto/GCDQuiz").then(m => ({ default: m.GCDQuiz }))) as any;
const Grade6FractionVisualMatcher = lazy(() => import("@/components/math/grade-6/tortek/mit-tanultunk-a-tortekrol-ismetles/FractionVisualMatcher").then(m => ({ default: m.FractionVisualMatcher }))) as any;
const Grade6FractionsQuiz = lazy(() => import("@/components/math/grade-6/tortek/mit-tanultunk-a-tortekrol-ismetles/FractionsQuiz").then(m => ({ default: m.FractionsQuiz }))) as any;
const Grade6FractionMultiplicationMatcher = lazy(() => import("@/components/math/grade-6/tortek/szorzas-torttel-a-reciprok/FractionMultiplicationMatcher").then(m => ({ default: m.FractionMultiplicationMatcher }))) as any;
const Grade6FractionDivisionMatcher = lazy(() => import("@/components/math/grade-6/tortek/osztas-torttel/FractionDivisionMatcher").then(m => ({ default: m.FractionDivisionMatcher }))) as any;
const Grade6DecimalFractionsQuiz = lazy(() => import("@/components/math/grade-6/tortek/mit-tanultunk-a-tizedes-tortekrol-ismetles/DecimalFractionsQuiz")) as any;
const Grade6FractionToDecimalMatcher = lazy(() => import("@/components/math/grade-6/tortek/mit-tanultunk-a-tizedes-tortekrol-ismetles/FractionToDecimalMatcher").then(m => ({ default: m.FractionToDecimalMatcher }))) as any;
const Grade6DecimalMultiplicationQuiz = lazy(() => import("@/components/math/grade-6/tortek/szorzas-tizedes-torttel/DecimalMultiplicationQuiz")) as any;
const Grade6DecimalMultiplicationMatcher = lazy(() => import("@/components/math/grade-6/tortek/szorzas-tizedes-torttel/DecimalMultiplicationMatcher").then(m => ({ default: m.DecimalMultiplicationMatcher }))) as any;
const Grade6DecimalDivisionQuiz = lazy(() => import("@/components/math/grade-6/tortek/osztas-tizedes-torttel/DecimalDivisionQuiz")) as any;
const Grade6DecimalDivisionMatcher = lazy(() => import("@/components/math/grade-6/tortek/osztas-tizedes-torttel/DecimalDivisionMatcher").then(m => ({ default: m.DecimalDivisionMatcher }))) as any;
const Grade6FractionsClosingTest = lazy(() => import("@/components/math/grade-6/tortek/osszefoglalas/FractionsClosingTest").then(m => ({ default: m.FractionsClosingTest }))) as any;
const WordProblemsModule = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/WordProblemsModule").then(m => ({ default: m.WordProblemsModule }))) as any;
const TriangleClassifier = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyesen-szimmetrikus-haromszogek-negyszogek-sokszogek/TriangleClassifier").then(m => ({ default: m.TriangleClassifier }))) as any;
const QuadrilateralClassifier = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/tengelyesen-szimmetrikus-haromszogek-negyszogek-sokszogek/QuadrilateralClassifier").then(m => ({ default: m.QuadrilateralClassifier }))) as any;
const CirclePartsGame = lazy(() => import("@/components/math/grade-6/geometria-szimmetria/a-kor/CirclePartsGame").then(m => ({ default: m.CirclePartsGame }))) as any;
const TriangleAnglesQuiz = lazy(() => import("@/components/math/grade-7/geometria/TriangleAnglesQuiz").then(m => ({ default: m.TriangleAnglesQuiz }))) as any;
const DecimalFractionsTool = lazy(() => import("@/components/math/tools/DecimalFractionsTool").then(m => ({ default: m.DecimalFractionsTool }))) as any;
const NumberLineTool = lazy(() => import("@/components/math/tools/NumberLineTool").then(m => ({ default: m.NumberLineTool }))) as any;
const ManipulativeDivision = lazy(() => import("@/components/math/tools/ManipulativeDivision").then(m => ({ default: m.ManipulativeDivision }))) as any;
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
const GeometryModule = lazy(() => import("@/components/math/grade-5/bevezetes-a-geometriaba/GeometryModule").then(m => ({ default: m.GeometryModule }))) as any;
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
const PerimeterAreaTool = lazy(() => import("@/components/math/tools/PerimeterAreaTool").then(m => ({ default: m.PerimeterAreaTool }))) as any;
const StudentFeedbackHub = lazy(() => import("@/components/feedback/StudentFeedbackHub").then(m => ({ default: m.StudentFeedbackHub }))) as any;
const WordSearchTool = lazy(() => import("@/components/math/tools/WordSearchTool").then(m => ({ default: m.WordSearchTool }))) as any;
const ChessGame = lazy(() => import("@/components/math/games/chess/ChessGame")) as any;
const ColorSequenceGame = lazy(() => import("@/components/math/games/color-sequence/ColorSequenceGame")) as any;
const MatchingCreator = lazy(() => import("@/components/math/tools/MatchingCreator").then(m => ({ default: m.MatchingCreator }))) as any;
const VolumeSurfaceTool = lazy(() => import("@/components/math/tools/VolumeSurfaceTool").then(m => ({ default: m.VolumeSurfaceTool }))) as any;
const EquationBalanceQuiz = lazy(() => import("@/components/math/grade-7/szazalekszamitas-egyenletek/EquationBalanceQuiz").then(m => ({ default: m.EquationBalanceQuiz }))) as any;
const WordProblemsQuiz = lazy(() => import("@/components/math/grade-5/aranyossag-szoveges-feladatok/WordProblemsQuiz").then(m => ({ default: m.WordProblemsQuiz }))) as any;
const UnitConverterTool = lazy(() => import("@/components/math/tools/UnitConverterTool").then(m => ({ default: m.UnitConverterTool }))) as any;
const CapacityConverterTool = lazy(() => import("@/components/math/tools/CapacityConverterTool").then(m => ({ default: m.CapacityConverterTool }))) as any;
const AnalogClockTool = lazy(() => import("@/components/math/tools/AnalogClockTool").then(m => ({ default: m.AnalogClockTool }))) as any;
const PerimeterQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat").then(m => ({ default: m.PerimeterQuiz }))) as any;
const AreaConversionQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat").then(m => ({ default: m.AreaConversionQuiz }))) as any;
const AreaCalculationQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat").then(m => ({ default: m.AreaCalculationQuiz }))) as any;
const VolumeQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat").then(m => ({ default: m.VolumeQuiz }))) as any;
const SurfaceAreaQuiz = lazy(() => import("@/components/math/grade-5/hosszusag-terulet-terfogat").then(m => ({ default: m.SurfaceAreaQuiz }))) as any;
const Grade7GeometryModule = lazy(() => import("@/components/math/grade-7/geometria/Grade7GeometryModule").then(m => ({ default: m.Grade7GeometryModule }))) as any;
const MappingQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/MappingQuiz").then(m => ({ default: m.MappingQuiz }))) as any;
const FunctionTableQuiz = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/FunctionTableQuiz").then(m => ({ default: m.FunctionTableQuiz }))) as any;
const Grade7StatsModule = lazy(() => import("@/components/math/grade-7/hozzarendelesek-statisztika/Grade7StatsModule").then(m => ({ default: m.Grade7StatsModule }))) as any;
const Grade5BuildingBlocksComparison = lazy(() => import("@/components/math/grade-5/egesz-szamok/a-helyiertekes-iras/BuildingBlocksComparison").then(m => ({ default: m.BuildingBlocksComparison }))) as any;
const RatioIntroQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/az-arany-fogalma/RatioIntroQuiz").then(m => ({ default: m.RatioIntroQuiz }))) as any;
const RatioCreatorQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/az-arany-fogalma/RatioCreatorQuiz").then(m => ({ default: m.RatioCreatorQuiz }))) as any;
const DirectProportionQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/egyenes-aranyossag/DirectProportionQuiz").then(m => ({ default: m.DirectProportionQuiz }))) as any;
const Grade6WordProblemsQuiz = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szoveges-feladatok/WordProblemsQuiz").then(m => ({ default: m.WordProblemsQuiz }))) as any;
const Grade6WordProblemsModule = lazy(() => import("@/components/math/grade-6/arany-szazalek-szoveges-feladatok/szoveges-feladatok/WordProblemsModule").then(m => ({ default: m.WordProblemsModule }))) as any;
const MatrixSortingGame = lazy(() => import("@/components/math/grade-1/grouping/MatrixSortingGame").then(m => ({ default: m.MatrixSortingGame }))) as any;
const MemoryGameComponent = lazy(() => import("@/components/math/games/memory/MemoryGame")) as any;
const HanoiGame = lazy(() => import("@/components/math/games/hanoi/HanoiGame")) as any;
const TorpedoGame = lazy(() => import("@/components/math/games/torpedo/TorpedoGame")) as any;
const TowerBuilderGame = lazy(() => import("@/components/math/games/toronyepites/TowerBuilderGame").then(m => ({ default: m.TowerBuilderGame }))) as any;
const ParallelogramAreaQuiz = lazy(() => import("@/components/math/grade-7/geometria/ParallelogramAreaQuiz").then(m => ({ default: m.ParallelogramAreaQuiz }))) as any;
const Grade8AlgebraQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/betus-kifejezesek-ismetles/AlgebraQuiz").then(m => ({ default: m.AlgebraQuiz }))) as any;
const Grade8WordProblemsModule = lazy(() => import("@/components/math/grade-8/keszuljunk-a-felvetelire/WordProblemsModule").then(m => ({ default: m.WordProblemsModule }))) as any;
const Grade8WordProblemsQuiz = lazy(() => import("@/components/math/grade-8/keszuljunk-a-felvetelire/WordProblemsQuiz").then(m => ({ default: m.WordProblemsQuiz }))) as any;
const Grade8LogicQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/logika-feladatok/LogicQuiz").then(m => ({ default: m.LogicQuiz }))) as any;
const Grade8SetBasicsQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/mit-tudunk-a-halmazokrol/SetBasicsQuiz").then(m => ({ default: m.SetBasicsQuiz }))) as any;
const Grade8SetOperationsQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/muveletek-halmazokkal/SetOperationsQuiz").then(m => ({ default: m.SetOperationsQuiz }))) as any;
const Grade8RationalSetQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/a-racionalis-szamok-halmaza/RationalSetQuiz").then(m => ({ default: m.RationalSetQuiz }))) as any;
const Grade8RationalOperationsQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/mit-tudunk-a-racionalis-szamokrol/RationalOperationsQuiz").then(m => ({ default: m.RationalOperationsQuiz }))) as any;
const Grade8PowersQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/hatvanyozas/PowersQuiz").then(m => ({ default: m.PowersQuiz }))) as any;
const Grade8SquareRootConceptQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/a-negyzetgyok-fogalma/SquareRootConceptQuiz").then(m => ({ default: m.SquareRootConceptQuiz }))) as any;
const Grade8SquareRootsQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/szamok-negyzetgyoke/SquareRootsQuiz").then(m => ({ default: m.SquareRootsQuiz }))) as any;
const Grade8AlgebraIntroQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/betus-kifejezesek-ismetles/AlgebraIntroQuiz").then(m => ({ default: m.AlgebraIntroQuiz }))) as any;
const Grade8FactoringQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/betus-kifejezesek-szorzasa-es-kiemeles/FactoringQuiz").then(m => ({ default: m.FactoringQuiz }))) as any;
const Grade8PolynomialMultQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/tobbtagu-kifejezesek-szorzata/PolynomialMultQuiz").then(m => ({ default: m.PolynomialMultQuiz }))) as any;
const Grade8Chapter1SummaryQuiz = lazy(() => import("@/components/math/grade-8/szamok-es-betuk/osszefoglalas/Chapter1SummaryQuiz").then(m => ({ default: m.Chapter1SummaryQuiz }))) as any;
const Grade8CongruenceTransformQuiz = lazy(() => import("@/components/math/grade-8/geometria/egybevagosagi-transzformaciok-ismetles/CongruenceTransformQuiz").then(m => ({ default: m.CongruenceTransformQuiz }))) as any;
const Grade8TransformationsQuiz = lazy(() => import("@/components/math/grade-8/geometria/transzformaciok/TransformationsQuiz").then(m => ({ default: m.TransformationsQuiz }))) as any;
const Grade8GeometrySoftwareQuiz = lazy(() => import("@/components/math/grade-8/geometria/hasznaljunk-szerkesztoprogramot/GeometrySoftwareQuiz").then(m => ({ default: m.GeometrySoftwareQuiz }))) as any;
const Grade8SimilarityQuiz = lazy(() => import("@/components/math/grade-8/geometria/hasonlosag/SimilarityQuiz").then(m => ({ default: m.SimilarityQuiz }))) as any;
const Grade8CentralSimilarityQuiz = lazy(() => import("@/components/math/grade-8/geometria/a-kozeppontos-hasonlosag/CentralSimilarityQuiz").then(m => ({ default: m.CentralSimilarityQuiz }))) as any;
const Grade8GeometricConstructionsQuiz = lazy(() => import("@/components/math/grade-8/geometria/szerkesztesek/GeometricConstructionsQuiz").then(m => ({ default: m.GeometricConstructionsQuiz }))) as any;
const Grade8Chapter2GeometrySummaryQuiz = lazy(() => import("@/components/math/grade-8/geometria/osszefoglalas/Chapter2GeometrySummaryQuiz").then(m => ({ default: m.Chapter2GeometrySummaryQuiz }))) as any;
const Grade8EquationBalanceQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/egyenletek/EquationBalanceQuiz").then(m => ({ default: m.EquationBalanceQuiz }))) as any;
const Grade8EquationsQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/egyenletek/EquationsQuiz").then(m => ({ default: m.EquationsQuiz }))) as any;
const Grade8NumbersAgesQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-szamokrol-eletkorokrol/NumbersAgesQuiz").then(m => ({ default: m.NumbersAgesQuiz }))) as any;
const Grade8MixingWordProblemsQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-osszekeveresrol/MixingWordProblemsQuiz").then(m => ({ default: m.MixingWordProblemsQuiz }))) as any;
const Grade8MotionWorkProblemsQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-feladatok-mozgasrol-munkarol/MotionWorkProblemsQuiz").then(m => ({ default: m.MotionWorkProblemsQuiz }))) as any;
const Grade8GeometricEquationsQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/szoveges-geometriai-feladatok/GeometricEquationsQuiz").then(m => ({ default: m.GeometricEquationsQuiz }))) as any;
const Grade8MixedWordProblemsQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/vegyes-feladatok/MixedWordProblemsQuiz").then(m => ({ default: m.MixedWordProblemsQuiz }))) as any;
const Grade8FinancialProblemsQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/penzugyi-feladatok/FinancialProblemsQuiz").then(m => ({ default: m.FinancialProblemsQuiz }))) as any;
const Grade8Chapter3EquationsSummaryQuiz = lazy(() => import("@/components/math/grade-8/egyenletek/osszefoglalas/Chapter3EquationsSummaryQuiz").then(m => ({ default: m.Chapter3EquationsSummaryQuiz }))) as any;
const Grade8ConstructionsMeasurementsQuiz = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/szerkesztesek-meresek/ConstructionsMeasurementsQuiz").then(m => ({ default: m.ConstructionsMeasurementsQuiz }))) as any;
const Grade8PythagorasTheoremQuiz = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/a-pitagorasz-tetel/PythagorasTheoremQuiz").then(m => ({ default: m.PythagorasTheoremQuiz }))) as any;
const Grade8ConversePythagorasQuiz = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/a-pitagorasz-tetel-megforditasa/ConversePythagorasQuiz").then(m => ({ default: m.ConversePythagorasQuiz }))) as any;
const Grade8PythagorasApplicationsQuiz = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/a-pitagorasz-tetel-alkalmazasa/PythagorasApplicationsQuiz").then(m => ({ default: m.PythagorasApplicationsQuiz }))) as any;
const Grade8CalculatorProjectQuiz = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/alkalmazas-szamologep-projektmunka/CalculatorProjectQuiz").then(m => ({ default: m.CalculatorProjectQuiz }))) as any;
const Grade8SpecialRightTrianglesQuiz = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/nevezetes-derekszogu-haromszogek/SpecialRightTrianglesQuiz").then(m => ({ default: m.SpecialRightTrianglesQuiz }))) as any;
const Grade8Chapter5PythagorasSummaryQuiz = lazy(() => import("@/components/math/grade-8/pitagorasz-tetel/osszefoglalas/Chapter5PythagorasSummaryQuiz").then(m => ({ default: m.Chapter5PythagorasSummaryQuiz }))) as any;
const Grade8DirectProportionG8Quiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/egyenes-aranyossag/DirectProportionG8Quiz").then(m => ({ default: m.DirectProportionG8Quiz }))) as any;
const Grade8FunctionsGraphsQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/hozzarendelesek-es-grafikonjaik/FunctionsGraphsQuiz").then(m => ({ default: m.FunctionsGraphsQuiz }))) as any;
const Grade8InverseProportionQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/forditott-aranyossag/InverseProportionQuiz").then(m => ({ default: m.InverseProportionQuiz }))) as any;
const Grade8ReadingGraphsQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/olvassunk-a-grafikonrol/ReadingGraphsQuiz").then(m => ({ default: m.ReadingGraphsQuiz }))) as any;
const Grade8PlottingGraphsQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/keszitsunk-grafikont/PlottingGraphsQuiz").then(m => ({ default: m.PlottingGraphsQuiz }))) as any;
const Grade8FrequencyStatisticsQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/gyakorisag-relativ-gyakorisag-atlag/FrequencyStatisticsQuiz").then(m => ({ default: m.FrequencyStatisticsQuiz }))) as any;
const Grade8ProbabilityGameQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/jatek/ProbabilityGameQuiz").then(m => ({ default: m.ProbabilityGameQuiz }))) as any;
const Grade8ProbabilityBasicsQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/valoszinuseg/ProbabilityBasicsQuiz").then(m => ({ default: m.ProbabilityBasicsQuiz }))) as any;
const Grade8ProbabilityProblemsQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/valoszinusegszamitasi-feladatok/ProbabilityProblemsQuiz").then(m => ({ default: m.ProbabilityProblemsQuiz }))) as any;
const Grade8FindingPatternsQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/keressunk-osszefuggeseket/FindingPatternsQuiz").then(m => ({ default: m.FindingPatternsQuiz }))) as any;
const Grade8SequencesQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/sorozatok/SequencesQuiz").then(m => ({ default: m.SequencesQuiz }))) as any;
const Grade8Chapter6SummaryQuiz = lazy(() => import("@/components/math/grade-8/hozzarendelesek-valoszinuseg-sorozatok/osszefoglalas/Chapter6SummaryQuiz").then(m => ({ default: m.Chapter6SummaryQuiz }))) as any;
const Grade8SolidsReviewQuiz = lazy(() => import("@/components/math/grade-8/testek/mit-tanultunk-eddig-ismetles/SolidsReviewQuiz").then(m => ({ default: m.SolidsReviewQuiz }))) as any;
const Grade8PyramidsIntroQuiz = lazy(() => import("@/components/math/grade-8/testek/gulak/PyramidsIntroQuiz").then(m => ({ default: m.PyramidsIntroQuiz }))) as any;
const Grade8PyramidSurfaceVolumeQuiz = lazy(() => import("@/components/math/grade-8/testek/a-gula-felszine-es-terfogata/PyramidSurfaceVolumeQuiz").then(m => ({ default: m.PyramidSurfaceVolumeQuiz }))) as any;
const Grade8SphereQuiz = lazy(() => import("@/components/math/grade-8/testek/a-gomb/SphereQuiz").then(m => ({ default: m.SphereQuiz }))) as any;
const Grade8EarthGeometryQuiz = lazy(() => import("@/components/math/grade-8/testek/a-fold/EarthGeometryQuiz").then(m => ({ default: m.EarthGeometryQuiz }))) as any;
const Grade8Chapter7SolidsSummaryQuiz = lazy(() => import("@/components/math/grade-8/testek/osszefoglalas/Chapter7SolidsSummaryQuiz").then(m => ({ default: m.Chapter7SolidsSummaryQuiz }))) as any;
import { QuizResult, GradeLevel } from '@/types/education';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
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
  | 'manipulative-division' | 'construction-tool' | 'money-calculation'
  | 'decimal-shifter-tool' | 'puzzle-maker' | 'geometry-module'
  | 'logic-blocks' | 'venn-diagram-game' | 'grouping-game' | 'number-grouping-game'
  | 'sudoku' | 'sudoku-generator' | 'venn-interpretation-quiz'
  | 'venn-reading-objects' | 'venn-reading-numbers' | 'axial-symmetry' | 'symmetry-error' | 'symmetry-construction' | 'axial-symmetry-quiz' | 'axial-symmetry-presentation'
  | 'percent-value-word-problems' | 'percent-rate-word-problems' | 'percent-base-word-problems' | 'student-feedback' | 'word-search' | 'memory-game' | 'equation-balance-quiz'
  | 'ratio-intro' | 'ratio-creator' | 'g7-word-problems' | 'direct-proportion-quiz' | 'matrix-sorting-game'
  | 'toto-maker' | 'chess-game' | 'torpedo-game' | 'matching-creator' | 'unit-converter' | 'capacity-converter' | 'analog-clock'
  | 'g8-algebra' | 'g8-equation-balance' | 'g8-word-problems-module' | 'g8-word-problems-quiz'
  | 'g8-logic' | 'g8-set-basics' | 'g8-set-operations' | 'g8-rational-set' | 'g8-rational-operations' | 'g8-powers' | 'g8-sqrt-concept' | 'g8-square-roots' | 'g8-algebra-intro' | 'g8-factoring' | 'g8-polynomial-mult' | 'g8-chapter1-summary'
  | 'g8-geom-congruence' | 'g8-geom-transforms' | 'g8-geom-software' | 'g8-geom-similarity' | 'g8-geom-central-similarity' | 'g8-geom-constructions' | 'g8-geom-summary'
  | 'g8-eq-basic' | 'g8-eq-numbers-ages' | 'g8-eq-mixing' | 'g8-eq-motion-work' | 'g8-eq-geometry' | 'g8-eq-mixed' | 'g8-eq-financial' | 'g8-eq-summary'
  | 'g8-pyth-constructions' | 'g8-pyth-theorem' | 'g8-pyth-converse' | 'g8-pyth-applications' | 'g8-pyth-calculator' | 'g8-pyth-special-triangles' | 'g8-pyth-summary'
  | 'g8-func-direct' | 'g8-func-graphs' | 'g8-func-inverse' | 'g8-func-reading' | 'g8-func-plotting' | 'g8-func-frequency' | 'g8-func-game' | 'g8-func-prob-basics' | 'g8-func-prob-problems' | 'g8-func-patterns' | 'g8-func-sequences' | 'g8-func-summary'
  | 'g8-solids-review' | 'g8-solids-pyramids-intro' | 'g8-solids-pyramids-calc' | 'g8-solids-sphere' | 'g8-solids-earth' | 'g8-solids-summary'
  | 'angle-matching' | 'triangle-classification' | 'quadrilateral-classification'
  | 'shape-classification' | 'line-relationships' | 'reflection-quiz' | 'circle-parts'
  | 'area-conversion-quiz' | 'volume-quiz' | 'surface-area-quiz' | 'area-calculation-quiz' | 'area-calc-quiz'
  | 'parallelogram-area-quiz' | 'parallelogram-area' | 'volume-surface' | 'perimeter-area' | 'perimeter-area-tool' | 'volume-surface-tool'
  | 'divisibility-powers' | 'divisibility-theory' | 'divisibility-factorization' | 'divisibility-quiz' | 'divisibility-matcher' | 'divisibility-gcdquiz' | 'divisibility-lkktquiz'
  | 'percentages' | 'perimeter-quiz' | 'area-conversion' | 'volume-conversion' | 'triangle-area' | 'g7-geometry-summary'
  | 'g7-mapping-quiz' | 'g7-function-table-quiz'
  | 'decimal-division-matcher' | 'decimal-division-quiz' | 'decimal-multiplication-matcher' | 'decimal-multiplication-quiz'
  | 'decimal-fractions' | 'decimal-fractions-quiz' | 'decimal-shifter'
  | 'g5-fraction-to-decimal-matcher' | 'g5-fraction-visual-matcher' | 'g5-fractions-quiz' | 'g5-fractions-module' | 'g5-building-blocks-comparison'
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
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
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

  const gradeNavItems: NavItem[] = useMemo(() => {
    if (view !== 'topic-select') return [];
    if (isUpperGradeLayout) return [];
    return [];
  }, [selectedGrade, view, isUpperGradeLayout]);

  const handleSidebarItemClick = (id: string) => {
    const parentTopicId = sectionToTopicMap[id];
    if (parentTopicId && expandedTopicId !== parentTopicId) {
      setExpandedTopicId(parentTopicId);
    }
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
    } else if (topicId === 'divisibility-powers') {
      finalActivityType = 'divisibility-powers';
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
    } else if (topicId === 'decimal-shifter') {
      finalActivityType = 'decimal-shifter';
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
    if (topicId) setSelectedTopic(topicId);
    
    // If a grade is provided explicitly (e.g., from the competency hub), set it immediately
    const finalGrade = gradeOverride !== undefined ? gradeOverride : selectedGrade;
    if (gradeOverride !== undefined) {
      setSelectedGrade(gradeOverride);
    }

    if (level !== undefined) {
      setVennLevel(level);
    } else {
      setVennLevel(null);
    }
    setView('activity');
    window.scrollTo(0, 0);
    updateURL('activity', finalGrade, topicId || selectedTopic, type);
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
    let nextActivity: ActivityType | null = activityType;

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
        const isExpandable = (selectedGrade === 5 && selectedTopic?.startsWith('g5-')) || selectedGrade === 4 || selectedGrade === 6 || selectedGrade === 7;
        nextTopic = isExpandable ? selectedTopic : null;
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
      ((activityType === 'symmetry-construction' || activityType === 'perimeter-area') || (isUpperGradeLayout && view === 'topic-select')) && "p-0 overflow-hidden h-screen"
    )}>
      {/* Header */}
      {(activityType !== 'symmetry-construction' && activityType !== 'perimeter-area' && activityType !== 'student-feedback') || view !== 'activity' ? (
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

      {/* Professional Sub-header for Navigation (no gap) */}
      {activityType !== 'symmetry-construction' && activityType !== 'snake-game' && activityType !== 'tower-builder' && selectedGrade !== 'admission' && selectedGrade !== 'graduation' && (
        <div className={cn(
          "w-full transition-all duration-300",
          view !== 'main-select' ? "h-10 opacity-100" : "h-0 opacity-0 overflow-hidden"
        )}>
          <div className="bg-white/95 backdrop-blur-xl border-b border-slate-200/60 py-1 shadow-sm">
            <div className="w-full px-4 lg:px-12 flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={handleBack}
                className="text-slate-600 hover:text-primary hover:bg-primary/5 transition-all flex items-center gap-2.5 group rounded-xl px-4 h-8"
              >
                <div className="p-1 rounded-lg bg-slate-100 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                  <ArrowLeft className="w-3.5 h-3.5" />
                </div>
                <span className="font-bold text-sm tracking-tight text-slate-700">Vissza</span>
              </Button>

              {/* Horizontal Topic Navigation */}
              {gradeNavItems.length > 0 && (
                <div className="flex-1 flex justify-center px-4">
                  <HorizontalTopicNav items={gradeNavItems} onItemClick={handleSidebarItemClick} />
                </div>
              )}

              <div className={cn(
                "hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400",
                gradeNavItems.length > 0 && "lg:hidden" // Hide breadcrumbs when nav is visible on large screens
              )}>
                <span>MATEMATIKA</span>
                {selectedGrade && (
                  <>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-primary/70">{getGradeLabel(selectedGrade).toUpperCase()}</span>
                  </>
                )}
                {selectedTopic && (
                  <>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-slate-500">{currentTopic?.title || 'TÉMAKÖR'}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className={cn(
        (activityType !== 'perimeter-area' && activityType !== 'snake-game' && activityType !== 'tower-builder' && activityType !== 'grade2-blocks' && activityType !== 'grade3-blocks' && activityType !== 'grade3-tower-builder' && !(isUpperGradeLayout && view === 'topic-select')) && "container mx-auto px-4 py-8",
        "transition-all duration-500",
        (isUpperGradeLayout && view === 'topic-select')
          ? "w-full p-0 max-w-none flex-1 overflow-hidden"
          : (activityType === 'perimeter-area' || activityType === 'snake-game' || activityType === 'tower-builder' || activityType === 'grade2-blocks' || activityType === 'grade3-blocks' || activityType === 'grade3-tower-builder'
            ? "max-w-none p-0 w-full h-full"
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
              <ScrollSpySidebar items={toolNavItems} onCollapseChange={setIsSidebarCollapsed} onItemClick={handleSidebarItemClick} />

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

                {activityType === 'g5-building-blocks-comparison' && (
                  <Grade5BuildingBlocksComparison onBack={handleBack} />
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

                {activityType === 'angle-matching' && (
                  <AngleMatcher onBack={handleBack} />
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

                {activityType === 'divisibility-powers' && (
                  <DivisibilityPowersModule onBack={handleBack} />
                )}

                {activityType === 'divisibility-theory' && (
                  <DivisibilityPowersModule onBack={handleBack} initialView="theory" />
                )}

                {activityType === 'divisibility-factorization' && (
                  <Grade6PrimeFactorization onBack={handleBack} />
                )}

                {activityType === 'divisibility-quiz' && (
                  <Grade6DivisibilityQuiz onBack={handleBack} />
                )}

                {activityType === 'divisibility-matcher' && (
                  <Grade6PrimeFactorizationMatcher onBack={handleBack} />
                )}

                {activityType === 'divisibility-gcdquiz' && (
                  <Grade6GCDQuiz onBack={handleBack} />
                )}

                {activityType === 'divisibility-lkktquiz' && (
                  <Grade6LCMQuiz onBack={handleBack} />
                )}

                {activityType === 'g6-fraction-visual-matcher' && (
                  <Grade6FractionVisualMatcher onBack={handleBack} />
                )}

                {activityType === 'g6-fractions-quiz' && (
                  <Grade6FractionsQuiz onBack={handleBack} />
                )}

                {activityType === 'g6-fraction-multiplier' && (
                  <Grade6FractionMultiplicationMatcher onBack={handleBack} />
                )}

                {activityType === 'g6-fraction-divider' && (
                  <Grade6FractionDivisionMatcher onBack={handleBack} />
                )}

                {activityType === 'g6-decimal-quiz' && (
                  <Grade6DecimalFractionsQuiz onBack={handleBack} />
                )}

                {activityType === 'g6-to-decimal-matcher' && (
                  <Grade6FractionToDecimalMatcher onBack={handleBack} />
                )}

                {activityType === 'g6-decimal-multiplier-quiz' && (
                  <Grade6DecimalMultiplicationQuiz onBack={handleBack} />
                )}

                {activityType === 'g6-decimal-multiplier' && (
                  <Grade6DecimalMultiplicationMatcher onBack={handleBack} />
                )}

                {activityType === 'g6-decimal-divider-quiz' && (
                  <Grade6DecimalDivisionQuiz onBack={handleBack} />
                )}

                {activityType === 'g6-decimal-divider' && (
                  <Grade6DecimalDivisionMatcher onBack={handleBack} />
                )}

                {activityType === 'g6-fractions-closing-test' && (
                  <Grade6FractionsClosingTest onBack={handleBack} />
                )}

                {activityType === 'g5-fraction-visual-matcher' && (
                  <Grade5FractionVisualMatcher onBack={handleBack} />
                )}

                {activityType === 'g5-fractions-quiz' && (
                  <Grade5FractionsQuiz onBack={handleBack} />
                )}

                {activityType === 'g5-fractions-module' && (
                  <Grade5FractionsModule onBack={handleBack} />
                )}

                {activityType === 'fraction-visualizer' && (
                  <FractionVisualizer onBack={handleBack} />
                )}

                {activityType === 'decimal-fractions-quiz' && (
                  <DecimalFractionsQuiz onBack={handleBack} />
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

                {activityType === 'triangle-angles-quiz' && (
                  <TriangleAnglesQuiz onBack={handleBack} />
                )}

                {activityType === 'perimeter-quiz' && (
                  <PerimeterQuiz onBack={handleBack} />
                )}

                {activityType === 'area-conversion-quiz' && (
                  <AreaConversionQuiz onBack={handleBack} />
                )}

                {activityType === 'area-calc-quiz' && (
                  <AreaCalculationQuiz onBack={handleBack} />
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

                {activityType === 'g8-logic' && (
                  <Grade8LogicQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-set-basics' && (
                  <Grade8SetBasicsQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-set-operations' && (
                  <Grade8SetOperationsQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-rational-set' && (
                  <Grade8RationalSetQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-rational-operations' && (
                  <Grade8RationalOperationsQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-powers' && (
                  <Grade8PowersQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-sqrt-concept' && (
                  <Grade8SquareRootConceptQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-square-roots' && (
                  <Grade8SquareRootsQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-algebra-intro' && (
                  <Grade8AlgebraIntroQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-factoring' && (
                  <Grade8FactoringQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-polynomial-mult' && (
                  <Grade8PolynomialMultQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-chapter1-summary' && (
                  <Grade8Chapter1SummaryQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-geom-congruence' && (
                  <Grade8CongruenceTransformQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-geom-transforms' && (
                  <Grade8TransformationsQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-geom-software' && (
                  <Grade8GeometrySoftwareQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-geom-similarity' && (
                  <Grade8SimilarityQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-geom-central-similarity' && (
                  <Grade8CentralSimilarityQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-geom-constructions' && (
                  <Grade8GeometricConstructionsQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-geom-summary' && (
                  <Grade8Chapter2GeometrySummaryQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-algebra' && (
                  <Grade8AlgebraQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-eq-basic' && (
                  <Grade8EquationsQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-equation-balance' && (
                  <Grade8EquationBalanceQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-eq-numbers-ages' && (
                  <Grade8NumbersAgesQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-eq-mixing' && (
                  <Grade8MixingWordProblemsQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-eq-motion-work' && (
                  <Grade8MotionWorkProblemsQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-eq-geometry' && (
                  <Grade8GeometricEquationsQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-eq-mixed' && (
                  <Grade8MixedWordProblemsQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-eq-financial' && (
                  <Grade8FinancialProblemsQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-eq-summary' && (
                  <Grade8Chapter3EquationsSummaryQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-word-problems-module' && (
                  <Grade8WordProblemsModule onBack={handleBack} />
                )}

                {activityType === 'g8-word-problems-quiz' && (
                  <Grade8WordProblemsQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-pyth-constructions' && (
                  <Grade8ConstructionsMeasurementsQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-pyth-theorem' && (
                  <Grade8PythagorasTheoremQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-pyth-converse' && (
                  <Grade8ConversePythagorasQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-pyth-applications' && (
                  <Grade8PythagorasApplicationsQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-pyth-calculator' && (
                  <Grade8CalculatorProjectQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-pyth-special-triangles' && (
                  <Grade8SpecialRightTrianglesQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-pyth-summary' && (
                  <Grade8Chapter5PythagorasSummaryQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-func-direct' && (
                  <Grade8DirectProportionG8Quiz onBack={handleBack} />
                )}

                {activityType === 'g8-func-graphs' && (
                  <Grade8FunctionsGraphsQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-func-inverse' && (
                  <Grade8InverseProportionQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-func-reading' && (
                  <Grade8ReadingGraphsQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-func-plotting' && (
                  <Grade8PlottingGraphsQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-func-frequency' && (
                  <Grade8FrequencyStatisticsQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-func-game' && (
                  <Grade8ProbabilityGameQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-func-prob-basics' && (
                  <Grade8ProbabilityBasicsQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-func-prob-problems' && (
                  <Grade8ProbabilityProblemsQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-func-patterns' && (
                  <Grade8FindingPatternsQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-func-sequences' && (
                  <Grade8SequencesQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-func-summary' && (
                  <Grade8Chapter6SummaryQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-solids-review' && (
                  <Grade8SolidsReviewQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-solids-pyramids-intro' && (
                  <Grade8PyramidsIntroQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-solids-pyramids-calc' && (
                  <Grade8PyramidSurfaceVolumeQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-solids-sphere' && (
                  <Grade8SphereQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-solids-earth' && (
                  <Grade8EarthGeometryQuiz onBack={handleBack} />
                )}

                {activityType === 'g8-solids-summary' && (
                  <Grade8Chapter7SolidsSummaryQuiz onBack={handleBack} />
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

                {activityType === 'ratio-intro' && (
                   <RatioIntroQuiz onBack={handleBack} />
                )}

                {activityType === 'ratio-creator' && (
                   <RatioCreatorQuiz onBack={handleBack} />
                )}

                {activityType === 'direct-proportion-quiz' && (
                   <DirectProportionQuiz onBack={handleBack} />
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

                {activityType === 'area-conversion-quiz' && (
                  <AreaConversionQuiz onBack={handleBack} />
                )}

                {activityType === 'area-calculation-quiz' && (
                  <AreaCalculationQuiz onBack={handleBack} />
                )}

                {(activityType === 'parallelogram-area-quiz' || activityType === 'parallelogram-area' as ActivityType) && (
                  <ParallelogramAreaQuiz onBack={handleBack} />
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
        {activityType !== 'snake-game' && activityType !== 'tower-builder' && !isUpperGradeLayout && view !== 'competency-select' && ((activityType !== 'symmetry-construction' && activityType !== 'perimeter-area' && activityType !== 'volume-surface' && activityType !== 'student-feedback' && activityType !== 'volume-quiz' && activityType !== 'surface-area-quiz' && activityType !== 'unit-converter' && activityType !== 'capacity-converter' && activityType !== 'analog-clock' && activityType !== 'g7-mapping-quiz' && activityType !== 'g7-function-table-quiz') || view !== 'activity') && <SiteFooter />}
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


