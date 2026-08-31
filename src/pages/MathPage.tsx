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
const Grade3MathModule = lazy(() => import("@/components/math/grade-3/Grade3MathModule").then(m => ({ default: m.Grade3MathModule }))) as any;
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
  Thermometer
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
  | 'area-conversion-quiz' | 'volume-quiz' | 'surface-area-quiz' | 'area-calculation-quiz'
  | 'parallelogram-area-quiz' | 'parallelogram-area' | 'volume-surface' | 'perimeter-area'
  | 'divisibility-powers' | 'divisibility-theory' | 'divisibility-factorization' | 'divisibility-quiz' | 'divisibility-matcher' | 'divisibility-gcdquiz' | 'divisibility-lkktquiz'
  | 'percentages' | 'perimeter-quiz' | 'area-conversion' | 'volume-conversion' | 'triangle-area' | 'g7-geometry-summary'
  | 'g7-mapping-quiz' | 'g7-function-table-quiz';

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

interface Grade5SubSection {
  id: string;
  label: string;
}

interface Grade5Topic {
  id: string;
  title: string;
  icon: string;
  color: string;
  subsections: Grade5SubSection[];
}

const grade5Topics: Grade5Topic[] = [
  {
    id: 'materials',
    title: 'Tananyagok és Könyvek',
    icon: '📚',
    color: 'from-indigo-500 to-purple-600',
    subsections: []
  },
  {
    id: 'g5-integers',
    title: 'I. AZ EGÉSZ SZÁMOK',
    icon: '🔢',
    color: 'from-blue-500 to-blue-600',
    subsections: [
      { id: 'g5-int-sec-1', label: '1. A számok kialakulása, a római számok' },
      { id: 'g5-int-sec-2', label: '2. A helyiértékes írás' },
      { id: 'g5-int-sec-3', label: '3. A számjegyek hármas csoportosítása és a számok kiolvasása' },
      { id: 'g5-int-sec-4', label: '4. A természetes számok helyesírása' },
      { id: 'g5-int-sec-5', label: '5. Számrendszerek' },
      { id: 'g5-int-sec-6', label: '6. A számok ábrázolása a számegyenesen' },
      { id: 'g5-int-sec-7', label: '7. Becslés, kerekítés' },
      { id: 'g5-int-sec-8', label: '8. Összeadás, írásbeli összeadás' },
      { id: 'g5-int-sec-9', label: '9. Kivonás, írásbeli kivonás' },
      { id: 'g5-int-sec-10', label: '10. Szorzás, írásbeli szorzás' },
      { id: 'g5-int-sec-11', label: '11. Osztás, írásbeli osztás kétjegyű osztóval' },
      { id: 'g5-int-sec-12', label: '12. Műveletek tulajdonságai, műveleti sorrend, zárójelek' },
      { id: 'g5-int-sec-13', label: '13. Negatív számok' },
      { id: 'g5-int-sec-14', label: '14. A számok ellentettje és abszolút értéke' },
      { id: 'g5-int-sec-15', label: '15. Egész számok összeadása és kivonása' },
      { id: 'g5-int-sec-16', label: '16. Összefoglalás' }
    ]
  },
  {
    id: 'g5-fractions-decimals',
    title: 'II. TÖRTEK, TIZEDES TÖRTEK',
    icon: '🍕',
    color: 'from-orange-500 to-amber-600',
    subsections: [
      { id: 'g5-frac-sec-1', label: '1. Ismerkedés a törtekkel' },
      { id: 'g5-frac-sec-2', label: '2. Törtek bővítése, egyszerűsítése, összehasonlítása' },
      { id: 'g5-frac-sec-3', label: '3. Törtek ábrázolása számegyenesen, vegyes törtek' },
      { id: 'g5-frac-sec-4', label: '4. Egyenlő nevezőjű törtek összeadása és kivonása' },
      { id: 'g5-frac-sec-5', label: '5. Különböző nevezőjű törtek összeadása és kivonása' },
      { id: 'g5-frac-sec-6', label: '6. Tört szorzása természetes számmal' },
      { id: 'g5-frac-sec-7', label: '7. Tört osztása pozitív egész számmal' },
      { id: 'g5-frac-sec-8', label: '8. Műveletek sorrendje, zárójelfelbontás' },
      { id: 'g5-frac-sec-9', label: '9. Mit tanultunk eddig? Gyakoroljunk!' },
      { id: 'g5-frac-sec-10', label: '10. Tizedes törtek' },
      { id: 'g5-frac-sec-11', label: '11. Tizedes törtek ábrázolása, kerekítése és összehasonlítása' },
      { id: 'g5-frac-sec-12', label: '12. Tizedes törtek összeadása és kivonása' },
      { id: 'g5-frac-sec-13', label: '13. Tizedes törtek szorzása természetes számmal' },
      { id: 'g5-frac-sec-14', label: '14. Tizedes törtek osztása pozitív egész számmal' },
      { id: 'g5-frac-sec-15', label: '15. Közönséges törtek tizedes tört alakja' },
      { id: 'g5-frac-sec-16', label: '16. Összefoglalás' }
    ]
  },
  {
    id: 'g5-geometry-intro',
    title: 'III. BEVEZETÉS A GEOMETRIÁBA',
    icon: '📐',
    color: 'from-green-500 to-green-600',
    subsections: [
      { id: 'g5-geom-grouping', label: '1. Csoportosítások' },
      { id: 'g5-geom-sets', label: '2. Halmazok' },
      { id: 'g5-geom-bodies', label: '3. Test, felület, vonal, pont' },
      { id: 'g5-geom-angles', label: '4. A szög' },
      { id: 'g5-geom-triangles', label: '5. Síkidomok, sokszögek' },
      { id: 'g5-geom-building', label: '6. Testek építése, szemléltetése' },
      { id: 'g5-geom-lines', label: '7. Egyenesek síkban, térben' },
      { id: 'g5-geom-quads', label: '8. Téglalap, négyzet' },
      { id: 'g5-geom-summary', label: '9. Összefoglalás' }
    ]
  },
  {
    id: 'g5-measurements',
    title: 'IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT',
    icon: '📏',
    color: 'from-cyan-500 to-blue-500',
    subsections: [
      { id: 'g5-meas-sec-1', label: '1. A hosszúság mérése' },
      { id: 'g5-meas-sec-2', label: '2. Téglalap, négyzet kerülete' },
      { id: 'g5-meas-sec-3', label: '3. A terület mérése' },
      { id: 'g5-meas-sec-4', label: '4. Téglalap, négyzet területe' },
      { id: 'g5-meas-sec-5', label: '5. Téglatest, kocka' },
      { id: 'g5-meas-sec-6', label: '6. Téglatest, kocka felszíne' },
      { id: 'g5-meas-sec-7', label: '7. A térfogat mérése' },
      { id: 'g5-meas-sec-8', label: '8. Téglatest, kocka térfogata' },
      { id: 'g5-meas-sec-9', label: '9. Gyakorlati feladatok' },
      { id: 'g5-meas-sec-10', label: '10. Összefoglalás' }
    ]
  },
  {
    id: 'g5-location-sequences',
    title: 'V. HELYMEGHATÁROZÁS, SOROZATOK',
    icon: '📍',
    color: 'from-violet-500 to-purple-600',
    subsections: [
      { id: 'g5-loc-sec-1', label: '1. A helymeghatározás szerepe környezetünkben' },
      { id: 'g5-loc-sec-2', label: '2. Helymeghatározás' },
      { id: 'g5-loc-sec-3', label: '3. A derékszögű koordináta-rendszer' },
      { id: 'g5-loc-sec-4', label: '4. Pontok ábrázolása' },
      { id: 'g5-loc-sec-5', label: '5. Tájékozódás síkban, térben (kiegészítő tananyag)' },
      { id: 'g5-loc-sec-6', label: '6. Ritmusok, díszítések' },
      { id: 'g5-loc-sec-7', label: '7. Keressünk összefüggéseket!' },
      { id: 'g5-loc-sec-8', label: '8. Sorozatok' },
      { id: 'g5-loc-sec-9', label: '9. Nevezetes, érdekes sorozatok' },
      { id: 'g5-loc-sec-10', label: '10. Összefoglalás' }
    ]
  },
  {
    id: 'g5-proportion-problems',
    title: 'VI. MÉRÉS, ARÁNYOSSÁG, SZÖVEGES FELADATOK',
    icon: '📝',
    color: 'from-teal-500 to-teal-600',
    subsections: [
      { id: 'g5-prop-sec-1', label: '1. A tömeg mérése, mértékegységei' },
      { id: 'g5-prop-sec-2', label: '2. Az űrtartalom mérése, mértékegységei' },
      { id: 'g5-prop-sec-3', label: '3. Az idő mérése, mértékegységei' },
      { id: 'g5-prop-sec-4', label: '4. Mértékegység-átváltások' },
      { id: 'g5-prop-sec-5', label: '5. Arányosságok, változó mennyiségek' },
      { id: 'g5-prop-sec-6', label: '6. Egyenes arányosság' },
      { id: 'g5-prop-sec-7', label: '7. Nyitott mondatok' },
      { id: 'g5-prop-sec-8', label: '8. Keressük a megoldásokat!' },
      { id: 'g5-prop-sec-9', label: '9. Egyszerű szöveges feladatok' },
      { id: 'g5-prop-sec-10', label: '10. Szöveges feladatok a hétköznapjainkban' },
      { id: 'g5-prop-sec-11', label: '11. Összefoglalás' }
    ]
  },
  {
    id: 'g5-stats',
    title: 'VII. ADATGYŰJTÉS, STATISZTIKA',
    icon: '📈',
    color: 'from-pink-500 to-rose-500',
    subsections: [
      { id: 'g5-stats-sec-1', label: '1. Játékok' },
      { id: 'g5-stats-sec-2', label: '2. Táblázatok, grafikonok' },
      { id: 'g5-stats-sec-3', label: '3. Adatgyűjtés, az adatok ábrázolása' },
      { id: 'g5-stats-sec-4', label: '4. Átlag és tulajdonságai' },
      { id: 'g5-stats-sec-5', label: '5. Lehetetlen, lehetséges, biztos' },
      { id: 'g5-stats-sec-6', label: '6. Összefoglalás' }
    ]
  }
];

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
    // Map section IDs to their parent Topic IDs
    const sectionToTopic: Record<string, string> = {
      'g4-count-10k': 'g4-count-10k',
      'g4-count-sec-1': 'g4-count-10k',
      'g4-count-sec-2': 'g4-count-10k',
      'g4-count-sec-3': 'g4-count-10k',
      'g4-count-sec-4': 'g4-count-10k',
      'g4-count-sec-5': 'g4-count-10k',
      'g4-count-sec-6': 'g4-count-10k',
      'g4-count-sec-7': 'g4-count-10k',
      'g4-count-sec-8': 'g4-count-10k',
      'g4-count-sec-9': 'g4-count-10k',
      'g4-count-sec-10': 'g4-count-10k',
      'g4-count-sec-11': 'g4-count-10k',
      'g4-count-sec-12': 'g4-count-10k',
      'g4-count-sec-13': 'g4-count-10k',
      'g4-measurements': 'g4-measurements',
      'g4-meas-sec-1': 'g4-measurements',
      'g4-meas-sec-2': 'g4-measurements',
      'g4-meas-sec-3': 'g4-measurements',
      'g4-meas-sec-4': 'g4-measurements',
      'g4-meas-sec-5': 'g4-measurements',
      'g4-meas-sec-6': 'g4-measurements',
      'g4-meas-sec-7': 'g4-measurements',
      'g4-meas-sec-8': 'g4-measurements',
      'g4-written-ops': 'g4-written-ops',
      'g4-wops-sec-1': 'g4-written-ops',
      'g4-wops-sec-2': 'g4-written-ops',
      'g4-wops-sec-3': 'g4-written-ops',
      'g4-wops-sec-4': 'g4-written-ops',
      'g4-wops-sec-5': 'g4-written-ops',
      'g4-wops-sec-6': 'g4-written-ops',
      'g4-wops-sec-7': 'g4-written-ops',
      'g4-negatives': 'g4-negatives',
      'g4-neg-sec-1': 'g4-negatives',
      'g4-neg-sec-2': 'g4-negatives',
      'g4-neg-sec-3': 'g4-negatives',
      'g4-shapes-solids': 'g4-shapes-solids',
      'g4-geom-sec-1': 'g4-shapes-solids',
      'g4-geom-sec-2': 'g4-shapes-solids',
      'g4-geom-sec-3': 'g4-shapes-solids',
      'g4-geom-sec-4': 'g4-shapes-solids',
      'g4-geom-sec-5': 'g4-shapes-solids',
      'g4-geom-sec-6': 'g4-shapes-solids',
      'g4-geom-sec-7': 'g4-shapes-solids',
      'g4-geom-sec-8': 'g4-shapes-solids',
      'g4-grouping': 'g4-grouping',
      'g4-group-sec-1': 'g4-grouping',
      'g4-group-sec-2': 'g4-grouping',
      'g4-group-sec-3': 'g4-grouping',
      'g4-group-sec-4': 'g4-grouping',
      'g4-written-mult': 'g4-written-mult',
      'g4-wmult-sec-1': 'g4-written-mult',
      'g4-wmult-sec-2': 'g4-written-mult',
      'g4-wmult-sec-3': 'g4-written-mult',
      'g4-fractions': 'g4-fractions',
      'g4-frac-sec-1': 'g4-fractions',
      'g4-frac-sec-2': 'g4-fractions',
      'g4-frac-sec-3': 'g4-fractions',
      'g4-frac-sec-4': 'g4-fractions',
      'g4-frac-sec-5': 'g4-fractions',
      'g5-ops': 'g5-integers',
      'g5-geom-basics': 'g5-geometry-intro',
      'g5-proportions': 'g5-proportion-problems',
      'g7-sec-szamold-ossze': 'g7-logic',
      'g7-sec-rendezd-sorba': 'g7-logic',
      'g7-sec-hany-eset-van': 'g7-logic',
      'g7-sec-grafok': 'g7-logic',
      'g7-sec-igazold-cafold': 'g7-logic',
      'g7-sec-matematikai-jatekok': 'g7-logic',
      'g7-sec-osszefoglalas': 'g7-logic',
      'g7-sec-rat-egesz-attekintes': 'g7-rational-algebra',
      'g7-sec-rat-tortek-tizedes': 'g7-rational-algebra',
      'g7-sec-rat-muveletek': 'g7-rational-algebra',
      'g7-sec-rat-szoveges': 'g7-rational-algebra',
      'g7-sec-rat-osszetett-zarojel': 'g7-rational-algebra',
      'g7-sec-rat-szamok-betuk': 'g7-rational-algebra',
      'g7-sec-rat-osszevonas-ertek': 'g7-rational-algebra',
      'g7-sec-rat-zarojel-kiemeles': 'g7-rational-algebra',
      'g7-sec-trans-fogalmak': 'g7-geom-trans',
      'g7-sec-trans-haromszog-vonalak': 'g7-geom-trans',
      'g7-sec-trans-haromszog-negyszog': 'g7-geom-trans',
      'g7-sec-trans-transzformaciok': 'g7-geom-trans',
      'g7-sec-trans-kozeppontos-tukrozes': 'g7-geom-trans',
      'g7-sec-trans-kozeppontos-alkalmazas': 'g7-geom-trans',
      'g7-sec-trans-szogparok': 'g7-geom-trans',
      'g7-sec-trans-szimmetria': 'g7-geom-trans',
      'g7-sec-trans-paralelogramma-deltoid': 'g7-geom-trans',
      'g7-sec-trans-kozeppontosan-szimmetrikus': 'g7-geom-trans',
      'g7-sec-trans-szabalyos-sokszogek': 'g7-geom-trans',
      'g7-sec-trans-kor': 'g7-geom-trans',
      'g7-sec-trans-szerkesztesek': 'g7-geom-trans',
      'g7-sec-trans-osszefoglalas': 'g7-geom-trans',
      'g7-sec-pow-nagy-szamok': 'g7-powers-divisibility',
      'g7-sec-pow-alkalmazas': 'g7-powers-divisibility',
      'g7-sec-pow-mit-tanultunk-ismetles': 'g7-powers-divisibility',
      'g7-sec-pow-logika': 'g7-powers-divisibility',
      'g7-sec-pow-prim-felbontas': 'g7-powers-divisibility',
      'g7-sec-pow-szabaly-keszites': 'g7-powers-divisibility',
      'g7-sec-pow-osztok-tobbszorosok': 'g7-powers-divisibility',
      'g7-sec-pow-lnko': 'g7-powers-divisibility',
      'g7-sec-pow-lkkt': 'g7-powers-divisibility',
      'g7-sec-pow-jatekok': 'g7-powers-divisibility',
      'g7-sec-pow-osszefoglalas': 'g7-powers-divisibility',
      'g7-expressions': 'g7-rational-algebra',
      'g7-sec-pct-aranyossag': 'g7-percent-equations',
      'g7-sec-pct-mit-tanultunk': 'g7-percent-equations',
      'g7-sec-pct-100-szazalek': 'g7-percent-equations',
      'g7-sec-pct-hany-szazalek': 'g7-percent-equations',
      'g7-sec-pct-gyakorlas': 'g7-percent-equations',
      'g7-sec-pct-osszetett': 'g7-percent-equations',
      'g7-sec-pct-szoveges': 'g7-percent-equations',
      'g7-sec-pct-egyenlet-modszerek': 'g7-percent-equations',
      'g7-sec-pct-merlegelv': 'g7-percent-equations',
      'g7-sec-pct-egyenletek-merlegelvvel': 'g7-percent-equations',
      'g7-sec-pct-szoveges-egyenlettel': 'g7-percent-equations',
      'g7-sec-pct-osszefoglalas': 'g7-percent-equations',
      'g7-percent-val': 'g7-percent-equations',
      'g7-percent-rate': 'g7-percent-equations',
      'g7-percent-base': 'g7-percent-equations',
      'g7-sec-geom-egybevagosag': 'g7-geometry',
      'g7-sec-geom-oldalak-szogek': 'g7-geometry',
      'g7-sec-geom-sokszogek-szogei-atloi': 'g7-geometry',
      'g7-sec-geom-mertekegysegek': 'g7-geometry',
      'g7-sec-geom-paralelogramma-terulet': 'g7-geometry',
      'g7-sec-geom-haromszog-terulet': 'g7-geometry',
      'g7-sec-geom-trapez-terulet': 'g7-geometry',
      'g7-sec-geom-deltoid-terulet': 'g7-geometry',
      'g7-sec-geom-hasab-felszin-terfogat': 'g7-geometry',
      'g7-sec-geom-testek-terben-sikban': 'g7-geometry',
      'g7-sec-geom-szabaduloszoba': 'g7-geometry',
      'g7-sec-geom-osszefoglalas': 'g7-geometry',
      'g7-sec-stats-halmazok-hozzarendeles': 'g7-stats',
      'g7-sec-stats-megadasi-modok': 'g7-stats',
      'g7-sec-stats-olvassunk-grafikonrol': 'g7-stats',
      'g7-sec-stats-atlag-modusz-median': 'g7-stats',
      'g7-sec-stats-gyakorisag-relativ': 'g7-stats',
      'g7-sec-stats-valoszinuseg': 'g7-stats',
      'g7-sec-stats-tippelj-kiserletezz': 'g7-stats',
      'g7-sec-stats-osszefoglalas': 'g7-stats',
      'g8-sec-logika': 'g8-numbers-letters',
      'g8-sec-halmazok-alap': 'g8-numbers-letters',
      'g8-sec-halmaz-muveletek': 'g8-numbers-letters',
      'g8-sec-racionalis-halmaz': 'g8-numbers-letters',
      'g8-sec-racionalis-muvelet': 'g8-numbers-letters',
      'g8-sec-hatvanyozas': 'g8-numbers-letters',
      'g8-sec-negyzetgyok-fogalom': 'g8-numbers-letters',
      'g8-sec-szamok-negyzetgyoke': 'g8-numbers-letters',
      'g8-sec-betus-ismetles': 'g8-numbers-letters',
      'g8-sec-betus-szorzas': 'g8-numbers-letters',
      'g8-sec-tobbtagu-szorzat': 'g8-numbers-letters',
      'g8-sec-osszefoglalas': 'g8-numbers-letters',
      'g8-sec-geom-egybevagosag': 'g8-geometry',
      'g8-sec-geom-transzformaciok': 'g8-geometry',
      'g8-sec-geom-szerkesztoprogram': 'g8-geometry',
      'g8-sec-geom-hasonlosag': 'g8-geometry',
      'g8-sec-geom-kozeppontos': 'g8-geometry',
      'g8-sec-geom-szerkesztesek': 'g8-geometry',
      'g8-sec-geom-osszefoglalas': 'g8-geometry',
      'g8-sec-eq-alap': 'g8-equations',
      'g8-sec-eq-szamok-kor': 'g8-equations',
      'g8-sec-eq-keveres': 'g8-equations',
      'g8-sec-eq-mozgas-munka': 'g8-equations',
      'g8-sec-eq-geometria': 'g8-equations',
      'g8-sec-eq-vegyes': 'g8-equations',
      'g8-sec-eq-penzugy': 'g8-equations',
      'g8-sec-eq-osszefoglalas': 'g8-equations',
      'g8-sec-pyth-szerkesztes': 'g8-pythagoras',
      'g8-sec-pyth-tetel': 'g8-pythagoras',
      'g8-sec-pyth-megforditas': 'g8-pythagoras',
      'g8-sec-pyth-alkalmazas': 'g8-pythagoras',
      'g8-sec-pyth-szamologep': 'g8-pythagoras',
      'g8-sec-pyth-nevezetes': 'g8-pythagoras',
      'g8-sec-pyth-osszefoglalas': 'g8-pythagoras',
      'g8-sec-func-egyenes': 'g8-functions-probability-sequences',
      'g8-sec-func-grafikonok': 'g8-functions-probability-sequences',
      'g8-sec-func-forditott': 'g8-functions-probability-sequences',
      'g8-sec-func-olvasas': 'g8-functions-probability-sequences',
      'g8-sec-func-rajzolas': 'g8-functions-probability-sequences',
      'g8-sec-func-gyakorisag': 'g8-functions-probability-sequences',
      'g8-sec-func-jatek': 'g8-functions-probability-sequences',
      'g8-sec-func-valoszinuseg': 'g8-functions-probability-sequences',
      'g8-sec-func-feladatok': 'g8-functions-probability-sequences',
      'g8-sec-func-mintazat': 'g8-functions-probability-sequences',
      'g8-sec-func-sorozatok': 'g8-functions-probability-sequences',
      'g8-sec-func-osszefoglalas': 'g8-functions-probability-sequences',
      'g8-sec-solids-ismetles': 'g8-solids',
      'g8-sec-solids-gulak': 'g8-solids',
      'g8-sec-solids-gula-szamitas': 'g8-solids',
      'g8-sec-solids-gomb': 'g8-solids',
      'g8-sec-solids-fold': 'g8-solids',
      'g8-sec-solids-osszefoglalas': 'g8-solids',
    };

    const parentTopicId = sectionToTopic[id];
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
    if (topicId === 'competency-assessment') {
      return null;
    }

    if (topicId === 'basic-operations') {
      if (selectedGrade === 1) {
        return (
          <Grade1MathModule
            onBack={handleBack}
            initialView="grade1-basic"
            onStartActivity={(type) => handleActivitySelect(type as ActivityType, topicId)}
          />
        );
      }
      if (selectedGrade === 2) {
        return (
          <Grade2MathModule
            onBack={handleBack}
            initialView="grade2-basic"
            onStartActivity={(type) => handleActivitySelect(type as ActivityType, topicId)}
          />
        );
      }
      if (selectedGrade === 3) {
        return (
          <Grade3MathModule
            onBack={handleBack}
            initialView="grade3-basic"
            onStartActivity={(type) => handleActivitySelect(type as ActivityType, topicId)}
          />
        );
      }
    }

    if (topicId === 'g4-count-10k') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Számok 0-tól 1000-ig */}
          {(showAll || activeGrade5SubSectionId === 'g4-count-sec-1') && (
            <section>
              <SectionHeader id="g4-count-sec-1" number={1} title="Számok 0-tól 1000-ig" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Matek Kígyó 🐍"
                  subtitle="Gyűjtsd össze a számokat a táblán!"
                  type="Játék"
                  emoji="🐍"
                  onClick={() => handleActivitySelect('snake-game', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Számfogalom 1000-ig Kvíz"
                  subtitle="Helyiértékek, számegyenes és számszomszédok"
                  type="Hamarosan"
                  emoji="🔢"
                  disabled={true}
                  icon={<Binary className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 2: Összeadás és kivonás 1000-ig */}
          {(showAll || activeGrade5SubSectionId === 'g4-count-sec-2') && (
            <section>
              <SectionHeader id="g4-count-sec-2" number={2} title="Összeadás és kivonás 1000-ig" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összeadás és Kivonás Kvíz"
                  subtitle="Szóbeli és írásbeli műveletek átlépéssel"
                  type="Hamarosan"
                  emoji="➕"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 3: Szorzás és osztás 1000-ig */}
          {(showAll || activeGrade5SubSectionId === 'g4-count-sec-3') && (
            <section>
              <SectionHeader id="g4-count-sec-3" number={3} title="Szorzás és osztás 1000-ig" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szorzás és Osztás Kvíz"
                  subtitle="Szorzótáblák, maradékos osztás és kerek számok"
                  type="Hamarosan"
                  emoji="✖️"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 4: A műveletek sorrendje */}
          {(showAll || activeGrade5SubSectionId === 'g4-count-sec-4') && (
            <section>
              <SectionHeader id="g4-count-sec-4" number={4} title="A műveletek sorrendje" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Műveleti Sorrend Kvíz"
                  subtitle="Zárójelek és műveleti erősorrend szabályai"
                  type="Hamarosan"
                  emoji="🔀"
                  disabled={true}
                  icon={<Layers className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 5: Nyitott mondatok */}
          {(showAll || activeGrade5SubSectionId === 'g4-count-sec-5') && (
            <section>
              <SectionHeader id="g4-count-sec-5" number={5} title="Nyitott mondatok" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Nyitott Mondatok Kvíz"
                  subtitle="Hiányzó számok, egyenlőségek és egyenlőtlenségek"
                  type="Hamarosan"
                  emoji="🔤"
                  disabled={true}
                  icon={<Variable className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 6: Szöveges feladatok 1000-es számkörben */}
          {(showAll || activeGrade5SubSectionId === 'g4-count-sec-6') && (
            <section>
              <SectionHeader id="g4-count-sec-6" number={6} title="Szöveges feladatok 1000-es számkörben" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szöveges Feladatok Kvíz"
                  subtitle="Értelmezés, modell, számolás és válaszadás"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 7: A római számok */}
          {(showAll || activeGrade5SubSectionId === 'g4-count-sec-7') && (
            <section>
              <SectionHeader id="g4-count-sec-7" number={7} title="A római számok" color="yellow" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Római Számok Kvíz"
                  subtitle="I, V, X, L, C, D, M írása és átváltása 1000-ig"
                  type="Hamarosan"
                  emoji="🏛️"
                  disabled={true}
                  icon={<Binary className="w-6 h-6" />}
                  color="yellow"
                />
              </div>
            </section>
          )}

          {/* Section 8: Játékok a logikai lapokkal */}
          {(showAll || activeGrade5SubSectionId === 'g4-count-sec-8') && (
            <section>
              <SectionHeader id="g4-count-sec-8" number={8} title="Játékok a logikai lapokkal" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Logikai Készlet"
                  subtitle="Formák, színek, méretek és tulajdonságok"
                  type="Játék"
                  emoji="🧩"
                  onClick={() => handleActivitySelect('logic-blocks', topicId)}
                  icon={<Puzzle className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Mátrix Válogatás"
                  subtitle="Elhelyezés a 2x2-es táblázatban"
                  type="Játék"
                  emoji="🔲"
                  onClick={() => handleActivitySelect('matrix-sorting-game', topicId)}
                  icon={<Table className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 9: Csoportosítások és számok 10 000-ig */}
          {(showAll || activeGrade5SubSectionId === 'g4-count-sec-9') && (
            <section>
              <SectionHeader id="g4-count-sec-9" number={9} title="Csoportosítások és számok 10 000-ig" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Építőkockás Összehasonlítás"
                  subtitle="Négyjegyű számok és helyiértékek kockákkal"
                  type="Játék"
                  emoji="🧱"
                  onClick={() => handleActivitySelect('g5-building-blocks-comparison', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Tízezres Számfogalom Kvíz"
                  subtitle="Négyjegyű számok írása, olvasása és helyiértékei"
                  type="Hamarosan"
                  emoji="🔢"
                  disabled={true}
                  icon={<Binary className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 10: Számszomszédok, kerekítés 10 000-ig */}
          {(showAll || activeGrade5SubSectionId === 'g4-count-sec-10') && (
            <section>
              <SectionHeader id="g4-count-sec-10" number={10} title="Számszomszédok, kerekítés 10 000-ig" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számszomszédok és Kerekítés"
                  subtitle="Egyes, tízes, százas és ezres szomszédok kerekítése"
                  type="Hamarosan"
                  emoji="📏"
                  disabled={true}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 11: Összeadás és kivonás 10 000-ig */}
          {(showAll || activeGrade5SubSectionId === 'g4-count-sec-11') && (
            <section>
              <SectionHeader id="g4-count-sec-11" number={11} title="Összeadás és kivonás 10 000-ig" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összeadás és Kivonás 10 000-ig"
                  subtitle="Műveletek kerek ezresekkel és négyjegyű számokkal"
                  type="Hamarosan"
                  emoji="➕"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 12: Szorzás és osztás 10 000-ig */}
          {(showAll || activeGrade5SubSectionId === 'g4-count-sec-12') && (
            <section>
              <SectionHeader id="g4-count-sec-12" number={12} title="Szorzás és osztás 10 000-ig" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szorzás és Osztás 10 000-ig"
                  subtitle="Szorzás és osztás 10-zel, 100-zal, 1000-rel"
                  type="Hamarosan"
                  emoji="✖️"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 13: Megálló és Kitekintő (Összefoglalás) */}
          {(showAll || activeGrade5SubSectionId === 'g4-count-sec-13') && (
            <section>
              <SectionHeader id="g4-count-sec-13" number={13} title="Megálló és Kitekintő (Összefoglalás)" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglaló Megálló és Kitekintő"
                  subtitle="I. Számolás 0-tól 10 000-ig témazáró összefoglalás"
                  type="Hamarosan"
                  emoji="🏆"
                  disabled={true}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g4-measurements') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: A hosszúság mérése */}
          {(showAll || activeGrade5SubSectionId === 'g4-meas-sec-1') && (
            <section>
              <SectionHeader id="g4-meas-sec-1" number={1} title="A hosszúság mérése" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Hosszúság Átváltó"
                  subtitle="Mértékegységek (m, dm, cm, mm) vizuális ábrázolása"
                  type="Eszköz"
                  emoji="📏"
                  onClick={() => handleActivitySelect('unit-converter', topicId)}
                  icon={<Scale className="w-6 h-6" />}
                  color="cyan"
                />
                <ActivityPlaceholder
                  title="Hosszúság Kvíz"
                  subtitle="Hosszúság mértékegységek és átváltásuk"
                  type="Hamarosan"
                  emoji="📐"
                  disabled={true}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 2: A kerület mérése */}
          {(showAll || activeGrade5SubSectionId === 'g4-meas-sec-2') && (
            <section>
              <SectionHeader id="g4-meas-sec-2" number={2} title="A kerület mérése" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Kerület és Terület"
                  subtitle="Szemléltető eszköz síkidomok kerületéhez és területéhez"
                  type="Eszköz"
                  emoji="🔲"
                  onClick={() => handleActivitySelect('perimeter-area', topicId)}
                  icon={<Layers className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Kerületszámítás Kvíz"
                  subtitle="Téglalap, négyzet és sokszögek kerülete"
                  type="Hamarosan"
                  emoji="📐"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 3: A terület mérése */}
          {(showAll || activeGrade5SubSectionId === 'g4-meas-sec-3') && (
            <section>
              <SectionHeader id="g4-meas-sec-3" number={3} title="A terület mérése" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Területszámítás Kvíz"
                  subtitle="Egységnégyzetek, téglalap és négyzet területe"
                  type="Hamarosan"
                  emoji="🟩"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 4: A tömeg mérése */}
          {(showAll || activeGrade5SubSectionId === 'g4-meas-sec-4') && (
            <section>
              <SectionHeader id="g4-meas-sec-4" number={4} title="A tömeg mérése" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tömeg Mértékegységek Kvíz"
                  subtitle="g, dkg, kg, t átváltása és mérlegelése"
                  type="Hamarosan"
                  emoji="⚖️"
                  disabled={true}
                  icon={<Scale className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 5: Az űrtartalom mérése */}
          {(showAll || activeGrade5SubSectionId === 'g4-meas-sec-5') && (
            <section>
              <SectionHeader id="g4-meas-sec-5" number={5} title="Az űrtartalom mérése" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Űrtartalom Átváltó"
                  subtitle="Folyadékok mértékegységei (hl, l, dl, cl, ml)"
                  type="Eszköz"
                  emoji="🧪"
                  onClick={() => handleActivitySelect('capacity-converter', topicId)}
                  icon={<Compass className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Űrtartalom Kvíz"
                  subtitle="Űrmértékek átváltása és gyakorlati feladatok"
                  type="Hamarosan"
                  emoji="🥛"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 6: Az idő mérése */}
          {(showAll || activeGrade5SubSectionId === 'g4-meas-sec-6') && (
            <section>
              <SectionHeader id="g4-meas-sec-6" number={6} title="Az idő mérése" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Analóg Óra Szemléltető"
                  subtitle="Óra, perc leolvasása és beállítása"
                  type="Eszköz"
                  emoji="⏰"
                  onClick={() => handleActivitySelect('analog-clock', topicId)}
                  icon={<Timer className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Időmérés és Naptár Kvíz"
                  subtitle="Óra, perc, másodperc, időtartam és naptár"
                  type="Hamarosan"
                  emoji="⏱️"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 7: Megálló */}
          {(showAll || activeGrade5SubSectionId === 'g4-meas-sec-7') && (
            <section>
              <SectionHeader id="g4-meas-sec-7" number={7} title="Megálló (Összefoglalás)" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Pénztár"
                  subtitle="Számolás pénzzel, fizetés és visszajáró"
                  type="Eszköz"
                  emoji="💰"
                  onClick={() => handleActivitySelect('money-calculation', topicId)}
                  icon={<Coins className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Mérések Összefoglaló Kvíz"
                  subtitle="Tudáspróba a mérési témakörökből"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 8: Kitekintő */}
          {(showAll || activeGrade5SubSectionId === 'g4-meas-sec-8') && (
            <section>
              <SectionHeader id="g4-meas-sec-8" number={8} title="Kitekintő" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Különleges Mértékegységek"
                  subtitle="Régi magyar és nemzetközi mértékek, méretrekordok"
                  type="Hamarosan"
                  emoji="🌍"
                  disabled={true}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g4-written-ops') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Írásbeli összeadás és kivonás */}
          {(showAll || activeGrade5SubSectionId === 'g4-wops-sec-1') && (
            <section>
              <SectionHeader id="g4-wops-sec-1" number={1} title="Írásbeli összeadás és kivonás" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Írásbeli Összeadás és Kivonás"
                  subtitle="Többjegyű számok összeadása és kivonása átlépéssel"
                  type="Hamarosan"
                  emoji="➕"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 2: Írásbeli szorzás egyjegyű számmal */}
          {(showAll || activeGrade5SubSectionId === 'g4-wops-sec-2') && (
            <section>
              <SectionHeader id="g4-wops-sec-2" number={2} title="Írásbeli szorzás egyjegyű számmal" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Írásbeli Szorzás"
                  subtitle="Szorzás algoritmusa egyjegyű számmal és átvitelekkel"
                  type="Hamarosan"
                  emoji="✖️"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 3: Írásbeli osztás egyjegyű osztóval */}
          {(showAll || activeGrade5SubSectionId === 'g4-wops-sec-3') && (
            <section>
              <SectionHeader id="g4-wops-sec-3" number={3} title="Írásbeli osztás egyjegyű osztóval" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Írásbeli Osztás Eszköz"
                  subtitle="Lépcsős osztás algoritmusának levezetése"
                  type="Eszköz"
                  emoji="➗"
                  onClick={() => handleActivitySelect('long-division', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="violet"
                />
                <ActivityPlaceholder
                  title="Írásbeli Osztás Kvíz"
                  subtitle="Lépcsős osztás, maradékos osztás és ellenőrzés"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 4: A számok tulajdonságai */}
          {(showAll || activeGrade5SubSectionId === 'g4-wops-sec-4') && (
            <section>
              <SectionHeader id="g4-wops-sec-4" number={4} title="A számok tulajdonságai" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számtulajdonságok és Oszthatóság"
                  subtitle="Páros-páratlan, oszthatóság 2-vel, 5-tel, 10-zel"
                  type="Hamarosan"
                  emoji="🔢"
                  disabled={true}
                  icon={<Binary className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 5: Összefüggések, következtetések */}
          {(showAll || activeGrade5SubSectionId === 'g4-wops-sec-5') && (
            <section>
              <SectionHeader id="g4-wops-sec-5" number={5} title="Összefüggések, következtetések" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefüggések és Szabályok"
                  subtitle="Táblázatos szabálykeresés és logikai következtetések"
                  type="Hamarosan"
                  emoji="🔍"
                  disabled={true}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 6: A műveletek közötti kapcsolatok */}
          {(showAll || activeGrade5SubSectionId === 'g4-wops-sec-6') && (
            <section>
              <SectionHeader id="g4-wops-sec-6" number={6} title="A műveletek közötti kapcsolatok" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Műveleti Kapcsolatok"
                  subtitle="Inverz műveletek, felcserélhetőség és csoportosítás"
                  type="Hamarosan"
                  emoji="🔄"
                  disabled={true}
                  icon={<Puzzle className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 7: A műveletek sorrendje */}
          {(showAll || activeGrade5SubSectionId === 'g4-wops-sec-7') && (
            <section>
              <SectionHeader id="g4-wops-sec-7" number={7} title="A műveletek sorrendje" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Műveleti Sorrend Kvíz"
                  subtitle="Zárójelek és műveleti erősorrend alkalmazása"
                  type="Hamarosan"
                  emoji="🔀"
                  disabled={true}
                  icon={<Layers className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g4-negatives') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: A negatív számok a mindennapokban */}
          {(showAll || activeGrade5SubSectionId === 'g4-neg-sec-1') && (
            <section>
              <SectionHeader id="g4-neg-sec-1" number={1} title="A negatív számok a mindennapokban" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Gyakorlati Negatív Számok"
                  subtitle="Hőmérő, lift, mélygarázs és tengerszint"
                  type="Hamarosan"
                  emoji="❄️"
                  disabled={true}
                  icon={<Thermometer className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 2: Számegyenes és ellentettek */}
          {(showAll || activeGrade5SubSectionId === 'g4-neg-sec-2') && (
            <section>
              <SectionHeader id="g4-neg-sec-2" number={2} title="Számegyenes és ellentettek" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számegyenes"
                  subtitle="Negatív számok ábrázolása és távolsága a nullától"
                  type="Eszköz"
                  emoji="↔️"
                  onClick={() => handleActivitySelect('number-line', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Ellentett Számok Kvíz"
                  subtitle="Ellentettek keresése és szimmetria a számegyenesen"
                  type="Hamarosan"
                  emoji="🔀"
                  disabled={true}
                  icon={<Binary className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 3: Összehasonlítás és változások */}
          {(showAll || activeGrade5SubSectionId === 'g4-neg-sec-3') && (
            <section>
              <SectionHeader id="g4-neg-sec-3" number={3} title="Összehasonlítás és változások" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összehasonlítás és Változások"
                  subtitle="Negatív számok rendezése és hőmérséklet-változások"
                  type="Hamarosan"
                  emoji="📊"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}
        </div>
      );
    }



    if (topicId === 'g4-shapes-solids') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Síkidomok, sokszögek */}
          {(showAll || activeGrade5SubSectionId === 'g4-geom-sec-1') && (
            <section>
              <SectionHeader id="g4-geom-sec-1" number={1} title="Síkidomok, sokszögek" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Sokszögek"
                  subtitle="Alakzatok felismerése és csoportosítása"
                  type="Gyakorlás"
                  emoji="📐"
                  onClick={() => handleActivitySelect('shape-classification', topicId)}
                  icon={<Shapes className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Egyenesek"
                  subtitle="Párhuzamos és merőleges egyenesek"
                  type="Gyakorlás"
                  emoji="📏"
                  onClick={() => handleActivitySelect('line-relationships', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6 rotate-45" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Sokszögek Kvíz"
                  subtitle="Háromszögek, négyszögek tulajdonságai"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 2: A kör */}
          {(showAll || activeGrade5SubSectionId === 'g4-geom-sec-2') && (
            <section>
              <SectionHeader id="g4-geom-sec-2" number={2} title="A kör" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Kör részei"
                  subtitle="Középpont, sugár és átmérő"
                  type="Gyakorlás"
                  emoji="⭕"
                  onClick={() => handleActivitySelect('circle-parts', topicId)}
                  icon={<Circle className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Kör Kvíz"
                  subtitle="Körvonal, körlap és körzőhasználat"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}

          {/* Section 3: A testek */}
          {(showAll || activeGrade5SubSectionId === 'g4-geom-sec-3') && (
            <section>
              <SectionHeader id="g4-geom-sec-3" number={3} title="A testek" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Síkidom vagy Test?"
                  subtitle="2D és 3D alakzatok megkülönböztetése"
                  type="Játék"
                  emoji="🧊"
                  onClick={() => handleActivitySelect('shape-classification', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Testek és Hálók Kvíz"
                  subtitle="Lapok, élek, csúcsok és kockahálók"
                  type="Hamarosan"
                  emoji="📦"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 4: A tükrözés */}
          {(showAll || activeGrade5SubSectionId === 'g4-geom-sec-4') && (
            <section>
              <SectionHeader id="g4-geom-sec-4" number={4} title="A tükrözés" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tengelyes tükrözés"
                  subtitle="Tükörkép keresése és azonosítása"
                  type="Teszt"
                  emoji="🪞"
                  onClick={() => handleActivitySelect('reflection-quiz', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Húzd a helyére!"
                  subtitle="Tükrözés gyakorlása interaktívan"
                  type="Gyakorlás"
                  emoji="⚡"
                  onClick={() => handleActivitySelect('axial-symmetry', topicId)}
                  icon={<Zap className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Találd meg a hibát!"
                  subtitle="Szimmetriahibák felderítése"
                  type="Gyakorlás"
                  emoji="🎯"
                  onClick={() => handleActivitySelect('symmetry-error', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Szimmetria eszköz"
                  subtitle="Szerkessz tükörképeket a táblán!"
                  type="Eszköz"
                  emoji="🔄"
                  onClick={() => handleActivitySelect('symmetry-construction', topicId)}
                  icon={<Repeat className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 5: Nagyítás, kicsinyítés */}
          {(showAll || activeGrade5SubSectionId === 'g4-geom-sec-5') && (
            <section>
              <SectionHeader id="g4-geom-sec-5" number={5} title="Nagyítás, kicsinyítés" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Nagyítás és kicsinyítés"
                  subtitle="Arányos méretváltoztatások négyzethálón"
                  type="Hamarosan"
                  emoji="🔍"
                  disabled={true}
                  icon={<Scale className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 6: Eltolás */}
          {(showAll || activeGrade5SubSectionId === 'g4-geom-sec-6') && (
            <section>
              <SectionHeader id="g4-geom-sec-6" number={6} title="Eltolás" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Párhuzamos Eltolás"
                  subtitle="Alakzatok mozgatása adott irányba és távolságra"
                  type="Hamarosan"
                  emoji="➡️"
                  disabled={true}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 7: Elforgatás */}
          {(showAll || activeGrade5SubSectionId === 'g4-geom-sec-7') && (
            <section>
              <SectionHeader id="g4-geom-sec-7" number={7} title="Elforgatás" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Elforgatás Pont Körül"
                  subtitle="Forgatás 90°, 180° és 270° szögekben"
                  type="Hamarosan"
                  emoji="🔄"
                  disabled={true}
                  icon={<Repeat className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 8: Tájékozódás */}
          {(showAll || activeGrade5SubSectionId === 'g4-geom-sec-8') && (
            <section>
              <SectionHeader id="g4-geom-sec-8" number={8} title="Tájékozódás" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tájékozódás és Nézetek"
                  subtitle="Elölnézet, felülnézet, oldalnézet és útvonalak"
                  type="Hamarosan"
                  emoji="🧭"
                  disabled={true}
                  icon={<Compass className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g4-fractions') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: A törtrész és a törtek értelmezése */}
          {(showAll || activeGrade5SubSectionId === 'g4-frac-sec-1') && (
            <section>
              <SectionHeader id="g4-frac-sec-1" number={1} title="A törtrész és a törtek értelmezése" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Törtek vizuálisan"
                  subtitle="Törtek modellezése, számláló és nevező szemléltetése"
                  type="Eszköz"
                  emoji="🍕"
                  onClick={() => handleActivitySelect('fraction-tool', topicId)}
                  icon={<Pizza className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Törtek Alapjai Kvíz"
                  subtitle="Törtrészek felismerése és leolvasása ábrákról"
                  type="Teszt"
                  emoji="📝"
                  onClick={() => handleActivitySelect('fraction-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 2: Egynél kisebb törtek */}
          {(showAll || activeGrade5SubSectionId === 'g4-frac-sec-2') && (
            <section>
              <SectionHeader id="g4-frac-sec-2" number={2} title="Egynél kisebb törtek" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egynél Kisebb Törtek"
                  subtitle="Valódi törtek és kiegészítés egy egészre"
                  type="Hamarosan"
                  emoji="🥧"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 3: Az 1 egész és az egynél nagyobb törtek */}
          {(showAll || activeGrade5SubSectionId === 'g4-frac-sec-3') && (
            <section>
              <SectionHeader id="g4-frac-sec-3" number={3} title="Az 1 egész és az egynél nagyobb törtek" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egynél Nagyobb Törtek"
                  subtitle="Egészek, áltörtek és vegyes számok szemléltetése"
                  type="Hamarosan"
                  emoji="🎂"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}

          {/* Section 4: Törtek összehasonlítása és rendezése */}
          {(showAll || activeGrade5SubSectionId === 'g4-frac-sec-4') && (
            <section>
              <SectionHeader id="g4-frac-sec-4" number={4} title="Törtek összehasonlítása és rendezése" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Törtek Összehasonlítása"
                  subtitle="Azonos számlálójú és nevezőjű törtek vizsgálata"
                  type="Eszköz"
                  emoji="⚖️"
                  onClick={() => handleActivitySelect('fraction-comparison', topicId)}
                  icon={<Scale className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Összehasonlítás Kvíz"
                  subtitle="Törtek rendezése és relációs jelek alkalmazása"
                  type="Hamarosan"
                  emoji="📊"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 5: Törtrész kiszámítása és szöveges feladatok */}
          {(showAll || activeGrade5SubSectionId === 'g4-frac-sec-5') && (
            <section>
              <SectionHeader id="g4-frac-sec-5" number={5} title="Törtrész kiszámítása és szöveges feladatok" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Törtrész Számítása"
                  subtitle="Mennyiségek törtrésze és mindennapi szöveges feladatok"
                  type="Hamarosan"
                  emoji="💡"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g4-written-mult') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Szorzás kétjegyű szorzóval */}
          {(showAll || activeGrade5SubSectionId === 'g4-wmult-sec-1') && (
            <section>
              <SectionHeader id="g4-wmult-sec-1" number={1} title="Szorzás kétjegyű szorzóval" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szorzás Kerek Tízesekkel"
                  subtitle="Szorzás 10-zel, 20-szal és összeggel való szorzás"
                  type="Hamarosan"
                  emoji="🔟"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 2: Írásbeli szorzás */}
          {(showAll || activeGrade5SubSectionId === 'g4-wmult-sec-2') && (
            <section>
              <SectionHeader id="g4-wmult-sec-2" number={2} title="Írásbeli szorzás" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Írásbeli Szorzás Kétjegyűvel"
                  subtitle="Részletszorzatok eltolása, összeadása és maradékok"
                  type="Hamarosan"
                  emoji="✖️"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 3: Összefüggések, következtetések */}
          {(showAll || activeGrade5SubSectionId === 'g4-wmult-sec-3') && (
            <section>
              <SectionHeader id="g4-wmult-sec-3" number={3} title="Összefüggések, következtetések" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefüggések és Szövegesek"
                  subtitle="Tényezők változása, nyitott mondatok és szöveges feladatok"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g5-integers') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: A számok kialakulása, a római számok */}
          {(showAll || activeGrade5SubSectionId === 'g5-int-sec-1') && (
            <section>
              <SectionHeader id="g5-int-sec-1" number={1} title="A számok kialakulása, a római számok" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Római számok"
                  subtitle="Számok története és római számírás"
                  type="Hamarosan"
                  emoji="🏛️"
                  disabled={true}
                  icon={<Binary className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 2: A helyiértékes írás */}
          {(showAll || activeGrade5SubSectionId === 'g5-int-sec-2') && (
            <section>
              <SectionHeader id="g5-int-sec-2" number={2} title="A helyiértékes írás" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Építőkockás összehasonlítás"
                  subtitle="Számok összehasonlítása kockákkal és relációjelekkel"
                  type="Játék"
                  emoji="🧱"
                  onClick={() => handleActivitySelect('g5-building-blocks-comparison', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 3: A számjegyek hármas csoportosítása és a számok kiolvasása */}
          {(showAll || activeGrade5SubSectionId === 'g5-int-sec-3') && (
            <section>
              <SectionHeader id="g5-int-sec-3" number={3} title="A számjegyek hármas csoportosítása és a számok kiolvasása" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számok kiolvasása"
                  subtitle="Számcsoportok és osztályok helyes leolvasása"
                  type="Hamarosan"
                  emoji="🗣️"
                  disabled={true}
                  icon={<Binary className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 4: A természetes számok helyesírása */}
          {(showAll || activeGrade5SubSectionId === 'g5-int-sec-4') && (
            <section>
              <SectionHeader id="g5-int-sec-4" number={4} title="A természetes számok helyesírása" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számok helyesírása"
                  subtitle="Kétezres szabály és kötőjelezés"
                  type="Hamarosan"
                  emoji="✍️"
                  disabled={true}
                  icon={<Pencil className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 5: Számrendszerek */}
          {(showAll || activeGrade5SubSectionId === 'g5-int-sec-5') && (
            <section>
              <SectionHeader id="g5-int-sec-5" number={5} title="Számrendszerek" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számrendszerek"
                  subtitle="Tízes és kettes (bináris) számrendszer"
                  type="Hamarosan"
                  emoji="💻"
                  disabled={true}
                  icon={<Binary className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 6: A számok ábrázolása a számegyenesen */}
          {(showAll || activeGrade5SubSectionId === 'g5-int-sec-6') && (
            <section>
              <SectionHeader id="g5-int-sec-6" number={6} title="A számok ábrázolása a számegyenesen" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számegyenes"
                  subtitle="Számok ábrázolása és leolvasása"
                  type="Eszköz"
                  emoji="📏"
                  onClick={() => handleActivitySelect('number-line', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 7: Becslés, kerekítés */}
          {(showAll || activeGrade5SubSectionId === 'g5-int-sec-7') && (
            <section>
              <SectionHeader id="g5-int-sec-7" number={7} title="Becslés, kerekítés" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Kerekítés és Becslés"
                  subtitle="Tízesekre, százasokra, ezresekre kerekítés"
                  type="Hamarosan"
                  emoji="🎯"
                  disabled={true}
                  icon={<Target className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 8: Összeadás, írásbeli összeadás */}
          {(showAll || activeGrade5SubSectionId === 'g5-int-sec-8') && (
            <section>
              <SectionHeader id="g5-int-sec-8" number={8} title="Összeadás, írásbeli összeadás" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Írásbeli összeadás"
                  subtitle="Többjegyű számok összeadása átlépéssel"
                  type="Hamarosan"
                  emoji="➕"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 9: Kivonás, írásbeli kivonás */}
          {(showAll || activeGrade5SubSectionId === 'g5-int-sec-9') && (
            <section>
              <SectionHeader id="g5-int-sec-9" number={9} title="Kivonás, írásbeli kivonás" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Írásbeli kivonás"
                  subtitle="Pótlási elv és átlépések gyakorlása"
                  type="Hamarosan"
                  emoji="➖"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}

          {/* Section 10: Szorzás, írásbeli szorzás */}
          {(showAll || activeGrade5SubSectionId === 'g5-int-sec-10') && (
            <section>
              <SectionHeader id="g5-int-sec-10" number={10} title="Szorzás, írásbeli szorzás" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Írásbeli szorzás"
                  subtitle="Egy- és kétjegyű szorzóval"
                  type="Hamarosan"
                  emoji="✖️"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 11: Osztás, írásbeli osztás kétjegyű osztóval */}
          {(showAll || activeGrade5SubSectionId === 'g5-int-sec-11') && (
            <section>
              <SectionHeader id="g5-int-sec-11" number={11} title="Osztás, írásbeli osztás kétjegyű osztóval" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Írásbeli osztás"
                  subtitle="Lépcsős osztás levezetése"
                  type="Eszköz"
                  emoji="➗"
                  onClick={() => handleActivitySelect('long-division', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Osztás vizuálisan"
                  subtitle="Helyiérték-blokkokkal és szétbontással"
                  type="Eszköz"
                  emoji="🧮"
                  onClick={() => handleActivitySelect('manipulative-division', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 12: Műveletek tulajdonságai, műveleti sorrend, zárójelek */}
          {(showAll || activeGrade5SubSectionId === 'g5-int-sec-12') && (
            <section>
              <SectionHeader id="g5-int-sec-12" number={12} title="Műveletek tulajdonságai, műveleti sorrend, zárójelek" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Műveleti sorrend"
                  subtitle="Zárójelek és műveletek elsőbbsége"
                  type="Hamarosan"
                  emoji="🔢"
                  disabled={true}
                  icon={<Binary className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 13: Negatív számok */}
          {(showAll || activeGrade5SubSectionId === 'g5-int-sec-13') && (
            <section>
              <SectionHeader id="g5-int-sec-13" number={13} title="Negatív számok" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Negatív számok"
                  subtitle="Hőmérő, adósság és magasságok"
                  type="Hamarosan"
                  emoji="❄️"
                  disabled={true}
                  icon={<Target className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 14: A számok ellentettje és abszolút értéke */}
          {(showAll || activeGrade5SubSectionId === 'g5-int-sec-14') && (
            <section>
              <SectionHeader id="g5-int-sec-14" number={14} title="A számok ellentettje és abszolút értéke" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Ellentett és Abszolút Érték"
                  subtitle="Nullától mért távolság és szimmetria"
                  type="Hamarosan"
                  emoji="🔄"
                  disabled={true}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 15: Egész számok összeadása és kivonása */}
          {(showAll || activeGrade5SubSectionId === 'g5-int-sec-15') && (
            <section>
              <SectionHeader id="g5-int-sec-15" number={15} title="Egész számok összeadása és kivonása" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számegyenes összeadás/kivonás"
                  subtitle="Előjeles számok összeadása és kivonása"
                  type="Eszköz"
                  emoji="➖"
                  onClick={() => handleActivitySelect('number-line', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 16: Összefoglalás */}
          {(showAll || activeGrade5SubSectionId === 'g5-int-sec-16') && (
            <section>
              <SectionHeader id="g5-int-sec-16" number={16} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglaló felkészítő"
                  subtitle="I. Az egész számok témazáró összefoglalás"
                  type="Hamarosan"
                  emoji="🏆"
                  disabled={true}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g5-fractions-decimals') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Ismerkedés a törtekkel */}
          {(showAll || activeGrade5SubSectionId === 'g5-frac-sec-1') && (
            <section>
              <SectionHeader id="g5-frac-sec-1" number={1} title="Ismerkedés a törtekkel" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Törtek alapjai"
                  subtitle="Tört fogalma, számláló, nevező"
                  type="Teszt"
                  emoji="🍕"
                  onClick={() => handleActivitySelect('g5-fractions-quiz', topicId)}
                  icon={<Pizza className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Tört Képpárosító"
                  subtitle="Vizuális törtek és törtszámok"
                  type="Játék"
                  emoji="🧩"
                  onClick={() => handleActivitySelect('g5-fraction-visual-matcher', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 2: Törtek bővítése, egyszerűsítése, összehasonlítása */}
          {(showAll || activeGrade5SubSectionId === 'g5-frac-sec-2') && (
            <section>
              <SectionHeader id="g5-frac-sec-2" number={2} title="Törtek bővítése, egyszerűsítése, összehasonlítása" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Törtek Vizualizáló"
                  subtitle="Törtek bővítése és egyszerűsítése"
                  type="Eszköz"
                  emoji="🔍"
                  onClick={() => handleActivitySelect('fraction-visualizer', topicId)}
                  icon={<Search className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 3: Törtek ábrázolása számegyenesen, vegyes törtek */}
          {(showAll || activeGrade5SubSectionId === 'g5-frac-sec-3') && (
            <section>
              <SectionHeader id="g5-frac-sec-3" number={3} title="Törtek ábrázolása számegyenesen, vegyes törtek" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számegyenes törtbeosztással"
                  subtitle="Vegyes törtek és áltörtek ábrázolása"
                  type="Eszköz"
                  emoji="📏"
                  onClick={() => handleActivitySelect('number-line', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 4: Egyenlő nevezőjű törtek összeadása és kivonása */}
          {(showAll || activeGrade5SubSectionId === 'g5-frac-sec-4') && (
            <section>
              <SectionHeader id="g5-frac-sec-4" number={4} title="Egyenlő nevezőjű törtek összeadása és kivonása" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Azonos nevezőjű törtek műveletei"
                  subtitle="Összeadás és kivonás azonos nevezővel"
                  type="Hamarosan"
                  emoji="➕"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 5: Különböző nevezőjű törtek összeadása és kivonása */}
          {(showAll || activeGrade5SubSectionId === 'g5-frac-sec-5') && (
            <section>
              <SectionHeader id="g5-frac-sec-5" number={5} title="Különböző nevezőjű törtek összeadása és kivonása" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Közös nevező és műveletek"
                  subtitle="Különböző nevezőjű törtek összeadása/kivonása"
                  type="Hamarosan"
                  emoji="➗"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 6: Tört szorzása természetes számmal */}
          {(showAll || activeGrade5SubSectionId === 'g5-frac-sec-6') && (
            <section>
              <SectionHeader id="g5-frac-sec-6" number={6} title="Tört szorzása természetes számmal" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tört szorzása egész számmal"
                  subtitle="Számláló szorzása és egyszerűsítés"
                  type="Hamarosan"
                  emoji="✖️"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 7: Tört osztása pozitív egész számmal */}
          {(showAll || activeGrade5SubSectionId === 'g5-frac-sec-7') && (
            <section>
              <SectionHeader id="g5-frac-sec-7" number={7} title="Tört osztása pozitív egész számmal" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tört osztása egész számmal"
                  subtitle="Számláló osztása és nevező szorzása"
                  type="Hamarosan"
                  emoji="➗"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 8: Műveletek sorrendje, zárójelfelbontás */}
          {(showAll || activeGrade5SubSectionId === 'g5-frac-sec-8') && (
            <section>
              <SectionHeader id="g5-frac-sec-8" number={8} title="Műveletek sorrendje, zárójelfelbontás" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Műveleti sorrend törtekkel"
                  subtitle="Zárójeles törtszámítások"
                  type="Hamarosan"
                  emoji="🔢"
                  disabled={true}
                  icon={<Binary className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 9: Mit tanultunk eddig? Gyakoroljunk! */}
          {(showAll || activeGrade5SubSectionId === 'g5-frac-sec-9') && (
            <section>
              <SectionHeader id="g5-frac-sec-9" number={9} title="Mit tanultunk eddig? Gyakoroljunk!" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Törtek Modul"
                  subtitle="Közönséges törtek átfogó interaktív gyakorlása"
                  type="Gyakorlás"
                  emoji="📚"
                  onClick={() => handleActivitySelect('g5-fractions-module', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}

          {/* Section 10: Tizedes törtek */}
          {(showAll || activeGrade5SubSectionId === 'g5-frac-sec-10') && (
            <section>
              <SectionHeader id="g5-frac-sec-10" number={10} title="Tizedes törtek" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tizedestörtek Kvíz"
                  subtitle="Helyiértékek és fogalmak"
                  type="Teszt"
                  emoji="🪙"
                  onClick={() => handleActivitySelect('decimal-fractions-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Tizedestört Korongok"
                  subtitle="Helyiértékek átváltása korongokkal"
                  type="Eszköz"
                  emoji="🪙"
                  onClick={() => handleActivitySelect('decimal-fractions', topicId)}
                  icon={<Coins className="w-6 h-6" />}
                  color="yellow"
                />
              </div>
            </section>
          )}

          {/* Section 11: Tizedes törtek ábrázolása, kerekítése és összehasonlítása */}
          {(showAll || activeGrade5SubSectionId === 'g5-frac-sec-11') && (
            <section>
              <SectionHeader id="g5-frac-sec-11" number={11} title="Tizedes törtek ábrázolása, kerekítése és összehasonlítása" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tizedesvessző-eltoló"
                  subtitle="Szorzás és osztás 10, 100, 1000-rel"
                  type="Eszköz"
                  emoji="↔️"
                  onClick={() => handleActivitySelect('decimal-shifter', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 12: Tizedes törtek összeadása és kivonása */}
          {(showAll || activeGrade5SubSectionId === 'g5-frac-sec-12') && (
            <section>
              <SectionHeader id="g5-frac-sec-12" number={12} title="Tizedes törtek összeadása és kivonása" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Írásbeli összeadás/kivonás"
                  subtitle="Tizedesvessző a vessző alá"
                  type="Hamarosan"
                  emoji="➕"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 13: Tizedes törtek szorzása természetes számmal */}
          {(showAll || activeGrade5SubSectionId === 'g5-frac-sec-13') && (
            <section>
              <SectionHeader id="g5-frac-sec-13" number={13} title="Tizedes törtek szorzása természetes számmal" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szorzás Kvíz"
                  subtitle="Tizedestört szorzása egész számmal"
                  type="Teszt"
                  emoji="✖️"
                  onClick={() => handleActivitySelect('decimal-multiplication-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Szorzás Párosító"
                  subtitle="Interaktív szorzópárosító játék"
                  type="Játék"
                  emoji="🧩"
                  onClick={() => handleActivitySelect('decimal-multiplication-matcher', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="green"
                />
              </div>
            </section>
          )}

          {/* Section 14: Tizedes törtek osztása pozitív egész számmal */}
          {(showAll || activeGrade5SubSectionId === 'g5-frac-sec-14') && (
            <section>
              <SectionHeader id="g5-frac-sec-14" number={14} title="Tizedes törtek osztása pozitív egész számmal" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Osztás Kvíz"
                  subtitle="Tizedestört osztása egész számmal"
                  type="Teszt"
                  emoji="➗"
                  onClick={() => handleActivitySelect('decimal-division-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Osztás Párosító"
                  subtitle="Interaktív osztópárosító játék"
                  type="Játék"
                  emoji="🧩"
                  onClick={() => handleActivitySelect('decimal-division-matcher', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 15: Közönséges törtek tizedes tört alakja */}
          {(showAll || activeGrade5SubSectionId === 'g5-frac-sec-15') && (
            <section>
              <SectionHeader id="g5-frac-sec-15" number={15} title="Közönséges törtek tizedes tört alakja" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tört - Tizedes Átváltó"
                  subtitle="Közönséges tört és tizedestört párosító"
                  type="Játék"
                  emoji="🔄"
                  onClick={() => handleActivitySelect('g5-fraction-to-decimal-matcher', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 16: Összefoglalás */}
          {(showAll || activeGrade5SubSectionId === 'g5-frac-sec-16') && (
            <section>
              <SectionHeader id="g5-frac-sec-16" number={16} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglaló felkészítő"
                  subtitle="II. Törtek, tizedes törtek témazáró összefoglalás"
                  type="Hamarosan"
                  emoji="🏆"
                  disabled={true}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g5-geometry-intro') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {(showAll || activeGrade5SubSectionId === 'g5-geom-grouping') && (
            <section>
              <SectionHeader number={1} title="Csoportosítások" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tárgyak csoportosítása"
                  subtitle="Állatok, járművek, anyagok"
                  type="Játék"
                  emoji="📦"
                  onClick={() => handleActivitySelect('grouping-game', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Számok csoportosítása"
                  subtitle="Páros, prímek, oszthatóság"
                  type="Játék"
                  emoji="🔢"
                  onClick={() => handleActivitySelect('number-grouping-game', topicId)}
                  icon={<Binary className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {(showAll || activeGrade5SubSectionId === 'g5-geom-sets') && (
            <section>
              <SectionHeader number={2} title="Halmazok" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Venn-diagram elhelyezés"
                  subtitle="Tárgyak és tulajdonságok"
                  type="Játék"
                  emoji="🍎"
                  onClick={() => handleActivitySelect('venn-diagram-game', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Venn-diagram (Számhalmazok)"
                  subtitle="Oszthatóság, prímek, alaphalmaz"
                  type="Játék"
                  emoji="🔢"
                  onClick={() => handleActivitySelect('venn-diagram-game', topicId, -2)}
                  icon={<Target className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Hogy mondanád?"
                  subtitle="Venn-diagramok leírása"
                  type="Kvíz"
                  emoji="💬"
                  onClick={() => handleActivitySelect('venn-interpretation-quiz', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Venn-diagram leolvasás (Tárgyas)"
                  subtitle="Melyik hova tartozik?"
                  type="Játék"
                  emoji="🔍"
                  onClick={() => handleActivitySelect('venn-reading-objects', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Venn-diagram leolvasás (Számok)"
                  subtitle="Számok tulajdonságai"
                  type="Játék"
                  emoji="🧐"
                  onClick={() => handleActivitySelect('venn-reading-numbers', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {(showAll || activeGrade5SubSectionId === 'g5-geom-bodies') && (
            <section>
              <SectionHeader number={3} title="Test, felület, vonal, pont" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Síkidom vagy Test?"
                  subtitle="2D és 3D alakzatok"
                  type="Kezdés"
                  onClick={() => handleActivitySelect('shape-classification', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {(showAll || activeGrade5SubSectionId === 'g5-geom-angles') && (
            <section>
              <SectionHeader number={4} title="A szög" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szögek párosítása"
                  subtitle="Szögtípusok felismerése"
                  type="Gyakorlás"
                  onClick={() => handleActivitySelect('angle-matching', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {(showAll || activeGrade5SubSectionId === 'g5-geom-triangles') && (
            <section>
              <SectionHeader number={5} title="Síkidomok, sokszögek" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Háromszögek"
                  subtitle="Csoportosítás tulajdonságok szerint"
                  type="Kezdés"
                  onClick={() => handleActivitySelect('triangle-classification', topicId)}
                  icon={<Triangle className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {(showAll || activeGrade5SubSectionId === 'g5-geom-building') && (
            <section>
              <SectionHeader number={6} title="Testek építése, szemléltetése" color="pink" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Térfogat és felszín"
                  subtitle="Testek kiterítése és feltöltése"
                  type="Eszköz"
                  onClick={() => handleActivitySelect('volume-surface', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="pink"
                />
              </div>
            </section>
          )}

          {(showAll || activeGrade5SubSectionId === 'g5-geom-lines') && (
            <section>
              <SectionHeader number={7} title="Egyenesek síkban, térben" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egyenesek helyzete"
                  subtitle="Párhuzamos és merőleges"
                  type="Gyakorlás"
                  onClick={() => handleActivitySelect('line-relationships', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6 rotate-45" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Alapszerkesztés"
                  subtitle="Körző és vonalzó használata"
                  type="Eszköz"
                  onClick={() => handleActivitySelect('construction', topicId)}
                  icon={<Pencil className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {(showAll || activeGrade5SubSectionId === 'g5-geom-quads') && (
            <section>
              <SectionHeader number={8} title="Téglalap, négyzet" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Négyszögek fajtái"
                  subtitle="Négyszögek felismerése"
                  type="Kezdés"
                  onClick={() => handleActivitySelect('quadrilateral-classification', topicId)}
                  icon={<Square className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}

          {(showAll || activeGrade5SubSectionId === 'g5-geom-summary') && (
            <section>
              <SectionHeader number={9} title="Összefoglalás" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tengelyes tükrözés teszt"
                  subtitle="Ellenőrizd a tudásod!"
                  type="Teszt"
                  onClick={() => handleActivitySelect('reflection-quiz', topicId)}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g5-measurements') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: A hosszúság mérése */}
          {(showAll || activeGrade5SubSectionId === 'g5-meas-sec-1') && (
            <section>
              <SectionHeader id="g5-meas-sec-1" number={1} title="A hosszúság mérése" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Mértékegység-váltó"
                  subtitle="Hosszúságmértékek átváltása"
                  type="Eszköz"
                  emoji="📏"
                  onClick={() => handleActivitySelect('unit-converter', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 2: Téglalap, négyzet kerülete */}
          {(showAll || activeGrade5SubSectionId === 'g5-meas-sec-2') && (
            <section>
              <SectionHeader id="g5-meas-sec-2" number={2} title="Téglalap, négyzet kerülete" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Kerület Kvíz"
                  subtitle="Téglalap és négyzet kerületszámítása"
                  type="Teszt"
                  emoji="📐"
                  onClick={() => handleActivitySelect('perimeter-quiz', topicId)}
                  icon={<Square className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 3: A terület mérése */}
          {(showAll || activeGrade5SubSectionId === 'g5-meas-sec-3') && (
            <section>
              <SectionHeader id="g5-meas-sec-3" number={3} title="A terület mérése" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Terület Mértékegységek"
                  subtitle="Területmértékek és átváltások kvíz"
                  type="Teszt"
                  emoji="🔲"
                  onClick={() => handleActivitySelect('area-conversion-quiz', topicId)}
                  icon={<Layout className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 4: Téglalap, négyzet területe */}
          {(showAll || activeGrade5SubSectionId === 'g5-meas-sec-4') && (
            <section>
              <SectionHeader id="g5-meas-sec-4" number={4} title="Téglalap, négyzet területe" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Területszámítás Kvíz"
                  subtitle="Téglalap és négyzet területe és hiányzó oldala"
                  type="Teszt"
                  emoji="🟩"
                  onClick={() => handleActivitySelect('area-calc-quiz', topicId)}
                  icon={<Square className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 5: Téglatest, kocka */}
          {(showAll || activeGrade5SubSectionId === 'g5-meas-sec-5') && (
            <section>
              <SectionHeader id="g5-meas-sec-5" number={5} title="Téglatest, kocka" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Térbeli alakzatok"
                  subtitle="Téglatest és kocka csúcsai, élei, lapjai"
                  type="Hamarosan"
                  emoji="📦"
                  disabled={true}
                  icon={<Box className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 6: Téglatest, kocka felszíne */}
          {(showAll || activeGrade5SubSectionId === 'g5-meas-sec-6') && (
            <section>
              <SectionHeader id="g5-meas-sec-6" number={6} title="Téglatest, kocka felszíne" color="pink" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Felszínszámítás Kvíz"
                  subtitle="Téglatest és kocka határoló lapjai és felszíne"
                  type="Teszt"
                  emoji="🎁"
                  onClick={() => handleActivitySelect('surface-area-quiz', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="pink"
                />
                <ActivityPlaceholder
                  title="Térfogat és felszín szemléltető"
                  subtitle="Testek kiterítése és hálója"
                  type="Eszköz"
                  emoji="📦"
                  onClick={() => handleActivitySelect('volume-surface', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}

          {/* Section 7: A térfogat mérése */}
          {(showAll || activeGrade5SubSectionId === 'g5-meas-sec-7') && (
            <section>
              <SectionHeader id="g5-meas-sec-7" number={7} title="A térfogat mérése" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Űrmérték-váltó"
                  subtitle="Térfogat- és űrmértékek átváltása"
                  type="Eszköz"
                  emoji="🧪"
                  onClick={() => handleActivitySelect('capacity-converter', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 8: Téglatest, kocka térfogata */}
          {(showAll || activeGrade5SubSectionId === 'g5-meas-sec-8') && (
            <section>
              <SectionHeader id="g5-meas-sec-8" number={8} title="Téglatest, kocka térfogata" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Térfogatszámítás Kvíz"
                  subtitle="Téglatest és kocka térfogata egységkockákkal"
                  type="Teszt"
                  emoji="🧊"
                  onClick={() => handleActivitySelect('volume-quiz', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 9: Gyakorlati feladatok */}
          {(showAll || activeGrade5SubSectionId === 'g5-meas-sec-9') && (
            <section>
              <SectionHeader id="g5-meas-sec-9" number={9} title="Gyakorlati feladatok" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Gyakorlati számítások"
                  subtitle="Valós életbeli mérési és területszámítási feladatok"
                  type="Hamarosan"
                  emoji="🏠"
                  disabled={true}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 10: Összefoglalás */}
          {(showAll || activeGrade5SubSectionId === 'g5-meas-sec-10') && (
            <section>
              <SectionHeader id="g5-meas-sec-10" number={10} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglaló felkészítő"
                  subtitle="IV. Hosszúság, terület, térfogat összefoglalás"
                  type="Hamarosan"
                  emoji="🏆"
                  disabled={true}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g4-grouping') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Válogatások halmazokba */}
          {(showAll || activeGrade5SubSectionId === 'g4-group-sec-1') && (
            <section>
              <SectionHeader id="g4-group-sec-1" number={1} title="Válogatások halmazokba" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Válogatás halmazokba"
                  subtitle="Venn-diagramok és csoportosítás"
                  type="Játék"
                  emoji="⭕"
                  onClick={() => handleActivitySelect('venn-diagram-game', topicId)}
                  icon={<Shapes className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Számcsoportosítás"
                  subtitle="Számok válogatása tulajdonságaik szerint"
                  type="Gyakorlás"
                  emoji="🔢"
                  onClick={() => handleActivitySelect('number-grouping-game', topicId)}
                  icon={<Binary className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Halmazok Kvíz"
                  subtitle="Venn-karikák és közös tulajdonságok"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 2: Válogatások táblázatokba */}
          {(showAll || activeGrade5SubSectionId === 'g4-group-sec-2') && (
            <section>
              <SectionHeader id="g4-group-sec-2" number={2} title="Válogatások táblázatokba" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Táblázatos válogatás"
                  subtitle="Elhelyezés a 2x2-es hálóban két szempont szerint"
                  type="Játék"
                  emoji="📊"
                  onClick={() => handleActivitySelect('matrix-sorting-game', topicId)}
                  icon={<Table className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Táblázatos Válogatás Kvíz"
                  subtitle="Sorok és oszlopok metszéspontjai"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 3: Hányféle lehetőség van? */}
          {(showAll || activeGrade5SubSectionId === 'g4-group-sec-3') && (
            <section>
              <SectionHeader id="g4-group-sec-3" number={3} title="Hányféle lehetőség van?" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Kombinatorika és Esetek"
                  subtitle="Sorbarendezések, fadiagram és lehetőségek számlálása"
                  type="Hamarosan"
                  emoji="🔀"
                  disabled={true}
                  icon={<GitCompare className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 4: Igaz vagy hamis? */}
          {(showAll || activeGrade5SubSectionId === 'g4-group-sec-4') && (
            <section>
              <SectionHeader id="g4-group-sec-4" number={4} title="Igaz vagy hamis?" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Sudoku Játék"
                  subtitle="Logikai következtetés és rácskitöltés"
                  type="Játék"
                  emoji="🧩"
                  onClick={() => handleActivitySelect('sudoku', topicId)}
                  icon={<Grid3X3 className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Logikai Állítások Kvíz"
                  subtitle="Minden, van olyan, egyik sem állítások vizsgálata"
                  type="Hamarosan"
                  emoji="⚖️"
                  disabled={true}
                  icon={<CheckCircle2 className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g5-proportion-problems') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: A tömeg mérése, mértékegységei */}
          {(showAll || activeGrade5SubSectionId === 'g5-prop-sec-1') && (
            <section>
              <SectionHeader id="g5-prop-sec-1" number={1} title="A tömeg mérése, mértékegységei" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tömegmértékek Kvíz"
                  subtitle="Tömeg mértékegységei és átváltásai"
                  type="Hamarosan"
                  emoji="⚖️"
                  disabled={true}
                  icon={<Scale className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 2: Az űrtartalom mérése, mértékegységei */}
          {(showAll || activeGrade5SubSectionId === 'g5-prop-sec-2') && (
            <section>
              <SectionHeader id="g5-prop-sec-2" number={2} title="Az űrtartalom mérése, mértékegységei" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Űrmérték-váltó"
                  subtitle="Térfogat és űrmértékek átváltása"
                  type="Eszköz"
                  emoji="🧪"
                  onClick={() => handleActivitySelect('capacity-converter', topicId)}
                  icon={<FlaskConical className="w-6 h-6" />}
                  color="cyan"
                />
                <ActivityPlaceholder
                  title="Űrtartalom Kvíz"
                  subtitle="Folyadékok mérése és mértékváltások"
                  type="Hamarosan"
                  emoji="🫗"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 3: Az idő mérése, mértékegységei */}
          {(showAll || activeGrade5SubSectionId === 'g5-prop-sec-3') && (
            <section>
              <SectionHeader id="g5-prop-sec-3" number={3} title="Az idő mérése, mértékegységei" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Analóg Óra Szemléltető"
                  subtitle="Óra, perc leolvasása és beállítása"
                  type="Eszköz"
                  emoji="⏰"
                  onClick={() => handleActivitySelect('analog-clock', topicId)}
                  icon={<Timer className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Időmérés Kvíz"
                  subtitle="Időtartamok számítása és átváltások"
                  type="Hamarosan"
                  emoji="⏳"
                  disabled={true}
                  icon={<Timer className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 4: Mértékegység-átváltások */}
          {(showAll || activeGrade5SubSectionId === 'g5-prop-sec-4') && (
            <section>
              <SectionHeader id="g5-prop-sec-4" number={4} title="Mértékegység-átváltások" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Mértékegység-váltó"
                  subtitle="Hossz, tömeg és űr mértékegységek"
                  type="Eszköz"
                  emoji="📏"
                  onClick={() => handleActivitySelect('unit-converter', topicId)}
                  icon={<ArrowRightLeft className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Összetett Átváltások"
                  subtitle="Vegyes mértékegységek átváltása és számolás"
                  type="Hamarosan"
                  emoji="🔄"
                  disabled={true}
                  icon={<RefreshCw className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 5: Arányosságok, változó mennyiségek */}
          {(showAll || activeGrade5SubSectionId === 'g5-prop-sec-5') && (
            <section>
              <SectionHeader id="g5-prop-sec-5" number={5} title="Arányosságok, változó mennyiségek" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Változó mennyiségek"
                  subtitle="Összefüggések táblázatokban és mindennapi helyzetekben"
                  type="Hamarosan"
                  emoji="📊"
                  disabled={true}
                  icon={<GitCompare className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 6: Egyenes arányosság */}
          {(showAll || activeGrade5SubSectionId === 'g5-prop-sec-6') && (
            <section>
              <SectionHeader id="g5-prop-sec-6" number={6} title="Egyenes arányosság" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egyenes Arányosság Kvíz"
                  subtitle="Hármasszabály és egységre következtetés"
                  type="Hamarosan"
                  emoji="📈"
                  disabled={true}
                  icon={<TrendingUp className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 7: Nyitott mondatok */}
          {(showAll || activeGrade5SubSectionId === 'g5-prop-sec-7') && (
            <section>
              <SectionHeader id="g5-prop-sec-7" number={7} title="Nyitott mondatok" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Nyitott Mondatok Kvíz"
                  subtitle="Egyenlőségek, egyenlőtlenségek és ismeretlenek"
                  type="Hamarosan"
                  emoji="🔤"
                  disabled={true}
                  icon={<Variable className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 8: Keressük a megoldásokat! */}
          {(showAll || activeGrade5SubSectionId === 'g5-prop-sec-8') && (
            <section>
              <SectionHeader id="g5-prop-sec-8" number={8} title="Keressük a megoldásokat!" color="pink" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Lebontogatási Módszer"
                  subtitle="Egyenletek megoldása fordított műveletekkel"
                  type="Hamarosan"
                  emoji="🔍"
                  disabled={true}
                  icon={<Search className="w-6 h-6" />}
                  color="pink"
                />
              </div>
            </section>
          )}

          {/* Section 9: Egyszerű szöveges feladatok */}
          {(showAll || activeGrade5SubSectionId === 'g5-prop-sec-9') && (
            <section>
              <SectionHeader id="g5-prop-sec-9" number={9} title="Egyszerű szöveges feladatok" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szöveges feladatok modul"
                  subtitle="Gyakorlati problémák és feladatmegoldó lépések"
                  type="Indítás"
                  emoji="📝"
                  onClick={() => handleActivitySelect('word-problems', topicId)}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Szöveges Feladatok Kvíz"
                  subtitle="Kvíz feladatok megoldása lépésről lépésre"
                  type="Teszt"
                  emoji="✍️"
                  onClick={() => handleActivitySelect('word-problems-quiz', topicId)}
                  icon={<Pencil className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 10: Szöveges feladatok a hétköznapjainkban */}
          {(showAll || activeGrade5SubSectionId === 'g5-prop-sec-10') && (
            <section>
              <SectionHeader id="g5-prop-sec-10" number={10} title="Szöveges feladatok a hétköznapjainkban" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Pénzügyi és Vásárlási Számítások"
                  subtitle="Pénzkezelés, visszajáró és költségvetés"
                  type="Eszköz"
                  emoji="💰"
                  onClick={() => handleActivitySelect('money-calculation', topicId)}
                  icon={<Coins className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Hétköznapi Feladatok Kvíz"
                  subtitle="Vásárlás, utazás és receptek számításai"
                  type="Hamarosan"
                  emoji="🛒"
                  disabled={true}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 11: Összefoglalás */}
          {(showAll || activeGrade5SubSectionId === 'g5-prop-sec-11') && (
            <section>
              <SectionHeader id="g5-prop-sec-11" number={11} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglaló felkészítő"
                  subtitle="VI. Mérés, arányosság, szöveges feladatok összefoglalás"
                  type="Hamarosan"
                  emoji="🏆"
                  disabled={true}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g5-location-sequences') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: A helymeghatározás szerepe környezetünkben */}
          {(showAll || activeGrade5SubSectionId === 'g5-loc-sec-1') && (
            <section>
              <SectionHeader id="g5-loc-sec-1" number={1} title="A helymeghatározás szerepe környezetünkben" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Környezeti tájékozódás"
                  subtitle="Címek, házszámok és térképi tájékozódás"
                  type="Hamarosan"
                  emoji="🗺️"
                  disabled={true}
                  icon={<Compass className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 2: Helymeghatározás */}
          {(showAll || activeGrade5SubSectionId === 'g5-loc-sec-2') && (
            <section>
              <SectionHeader id="g5-loc-sec-2" number={2} title="Helymeghatározás" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Torpedó Játék"
                  subtitle="Tájékozódás a rácshálón és mezők azonosítása"
                  type="Játék"
                  emoji="⚓"
                  onClick={() => handleActivitySelect('torpedo-game', topicId)}
                  icon={<Gamepad2 className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Helymeghatározás Kvíz"
                  subtitle="Rácsháló, oszlopok és sorok azonosítása"
                  type="Hamarosan"
                  emoji="🎯"
                  disabled={true}
                  icon={<Grid3X3 className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 3: A derékszögű koordináta-rendszer */}
          {(showAll || activeGrade5SubSectionId === 'g5-loc-sec-3') && (
            <section>
              <SectionHeader id="g5-loc-sec-3" number={3} title="A derékszögű koordináta-rendszer" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Koordináta-rendszer"
                  subtitle="Tengelyek, origó és síknegyedek alapjai"
                  type="Hamarosan"
                  emoji="📈"
                  disabled={true}
                  icon={<LayoutGrid className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 4: Pontok ábrázolása */}
          {(showAll || activeGrade5SubSectionId === 'g5-loc-sec-4') && (
            <section>
              <SectionHeader id="g5-loc-sec-4" number={4} title="Pontok ábrázolása" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Pontábrázolás Kvíz"
                  subtitle="Rendezett számpárok leolvasása és megadása"
                  type="Hamarosan"
                  emoji="📍"
                  disabled={true}
                  icon={<Target className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 5: Tájékozódás síkban, térben (kiegészítő tananyag) */}
          {(showAll || activeGrade5SubSectionId === 'g5-loc-sec-5') && (
            <section>
              <SectionHeader id="g5-loc-sec-5" number={5} title="Tájékozódás síkban, térben (kiegészítő tananyag)" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Térbeli tájékozódás"
                  subtitle="3D pozíciók és földrajzi fokhálózat"
                  type="Hamarosan"
                  emoji="🌐"
                  disabled={true}
                  icon={<Globe className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 6: Ritmusok, díszítések */}
          {(showAll || activeGrade5SubSectionId === 'g5-loc-sec-6') && (
            <section>
              <SectionHeader id="g5-loc-sec-6" number={6} title="Ritmusok, díszítések" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Sorminták és Ritmusok"
                  subtitle="Ismétlődő motívumok és geometriai minták"
                  type="Hamarosan"
                  emoji="🎨"
                  disabled={true}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 7: Keressünk összefüggéseket! */}
          {(showAll || activeGrade5SubSectionId === 'g5-loc-sec-7') && (
            <section>
              <SectionHeader id="g5-loc-sec-7" number={7} title="Keressünk összefüggéseket!" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szabálykereső"
                  subtitle="Bemenet-kimenet táblázatok és számgépek"
                  type="Hamarosan"
                  emoji="🔍"
                  disabled={true}
                  icon={<Lightbulb className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 8: Sorozatok */}
          {(showAll || activeGrade5SubSectionId === 'g5-loc-sec-8') && (
            <section>
              <SectionHeader id="g5-loc-sec-8" number={8} title="Sorozatok" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számsorozatok Kvíz"
                  subtitle="Képzési szabályok, folytatás és hiányzó tagok"
                  type="Hamarosan"
                  emoji="🔢"
                  disabled={true}
                  icon={<TrendingUp className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 9: Nevezetes, érdekes sorozatok */}
          {(showAll || activeGrade5SubSectionId === 'g5-loc-sec-9') && (
            <section>
              <SectionHeader id="g5-loc-sec-9" number={9} title="Nevezetes, érdekes sorozatok" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Híres sorozatok"
                  subtitle="Négyzetszámok, háromszögszámok és Fibonacci"
                  type="Hamarosan"
                  emoji="🌀"
                  disabled={true}
                  icon={<Brain className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}

          {/* Section 10: Összefoglalás */}
          {(showAll || activeGrade5SubSectionId === 'g5-loc-sec-10') && (
            <section>
              <SectionHeader id="g5-loc-sec-10" number={10} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglaló felkészítő"
                  subtitle="V. Helymeghatározás, sorozatok összefoglalás"
                  type="Hamarosan"
                  emoji="🏆"
                  disabled={true}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g5-stats') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Játékok */}
          {(showAll || activeGrade5SubSectionId === 'g5-stats-sec-1') && (
            <section>
              <SectionHeader id="g5-stats-sec-1" number={1} title="Játékok" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Venn-diagram (Tárgyak)"
                  subtitle="Tárgyak és formák szétválogatása"
                  type="Játék"
                  emoji="⭕"
                  onClick={() => handleActivitySelect('venn-reading-objects', topicId)}
                  icon={<Shapes className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Venn-diagram (Számok)"
                  subtitle="Számhalmazok és tulajdonságok"
                  type="Játék"
                  emoji="🔢"
                  onClick={() => handleActivitySelect('venn-reading-numbers', topicId)}
                  icon={<Binary className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Logikai Készlet"
                  subtitle="Formák, színek, méretek válogatása"
                  type="Játék"
                  emoji="🧩"
                  onClick={() => handleActivitySelect('logic-blocks', topicId)}
                  icon={<Puzzle className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Venn-diagram Kvíz"
                  subtitle="Halmazok és metszetek leolvasása"
                  type="Teszt"
                  emoji="📋"
                  onClick={() => handleActivitySelect('venn-interpretation-quiz', topicId)}
                  icon={<CheckCircle2 className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 2: Táblázatok, grafikonok */}
          {(showAll || activeGrade5SubSectionId === 'g5-stats-sec-2') && (
            <section>
              <SectionHeader id="g5-stats-sec-2" number={2} title="Táblázatok, grafikonok" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Grafikonok és Táblázatok"
                  subtitle="Oszlop-, vonal- és kördiagramok leolvasása"
                  type="Hamarosan"
                  emoji="📊"
                  disabled={true}
                  icon={<BarChart3 className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 3: Adatgyűjtés, az adatok ábrázolása */}
          {(showAll || activeGrade5SubSectionId === 'g5-stats-sec-3') && (
            <section>
              <SectionHeader id="g5-stats-sec-3" number={3} title="Adatgyűjtés, az adatok ábrázolása" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Adatgyűjtés és Strigulázás"
                  subtitle="Gyakorisági táblázat és diagramkészítés"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<Table className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 4: Átlag és tulajdonságai */}
          {(showAll || activeGrade5SubSectionId === 'g5-stats-sec-4') && (
            <section>
              <SectionHeader id="g5-stats-sec-4" number={4} title="Átlag és tulajdonságai" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Átlagszámítás Kvíz"
                  subtitle="Számtani közép számítása és tulajdonságai"
                  type="Hamarosan"
                  emoji="➗"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 5: Lehetetlen, lehetséges, biztos */}
          {(showAll || activeGrade5SubSectionId === 'g5-stats-sec-5') && (
            <section>
              <SectionHeader id="g5-stats-sec-5" number={5} title="Lehetetlen, lehetséges, biztos" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Valószínűségi Játékok"
                  subtitle="Események minősítése, kocka- és érmekísérletek"
                  type="Hamarosan"
                  emoji="🎲"
                  disabled={true}
                  icon={<Dices className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}

          {/* Section 6: Összefoglalás */}
          {(showAll || activeGrade5SubSectionId === 'g5-stats-sec-6') && (
            <section>
              <SectionHeader id="g5-stats-sec-6" number={6} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglaló felkészítő"
                  subtitle="VII. Adatgyűjtés, statisztika összefoglalás"
                  type="Hamarosan"
                  emoji="🏆"
                  disabled={true}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }


    if (topicId === 'fractions') {
      return (
        <FractionsModule
          isInline
          onBack={() => setExpandedTopicId(null)}
          onStartActivity={(type) => handleActivitySelect(type as ActivityType, topicId)}
          initialView={activityType}
        />
      );
    }

    if (topicId === 'geometry' || topicId === 'g7-other') {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => handleActivitySelect('shape-classification')}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 group-hover:scale-110 transition-transform">
              <Box className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-sm">Síkidom vagy Test?</h4>
              <p className="text-[10px] text-slate-500">2D vagy 3D alakzatok</p>
            </div>
          </button>

          <button
            onClick={() => handleActivitySelect('angle-matching')}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:scale-110 transition-transform">
              <Target className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-sm">Szögek párosítása</h4>
              <p className="text-[10px] text-slate-500">Szögtípusok felismerése</p>
            </div>
          </button>

          <button
            onClick={() => handleActivitySelect('triangle-classification')}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-amber-50 rounded-xl text-amber-600 group-hover:scale-110 transition-transform">
              <Triangle className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-sm">Háromszögek</h4>
              <p className="text-[10px] text-slate-500">Csoportosítás tulajdonságok szerint</p>
            </div>
          </button>

          <button
            onClick={() => handleActivitySelect('quadrilateral-classification')}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-violet-50 rounded-xl text-violet-600 group-hover:scale-110 transition-transform">
              <Square className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-sm">Négyszögek</h4>
              <p className="text-[10px] text-slate-500">Négyszögek fajtái</p>
            </div>
          </button>

          <button
            onClick={() => handleActivitySelect('line-relationships')}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 group-hover:scale-110 transition-transform">
              <MoveHorizontal className="w-8 h-8 rotate-45" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-sm">Egyenesek helyzete</h4>
              <p className="text-[10px] text-slate-500">Párhuzamos, merőleges</p>
            </div>
          </button>

          <button
            onClick={() => handleActivitySelect('circle-parts')}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-red-50 rounded-xl text-red-600 group-hover:scale-110 transition-transform">
              <Circle className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-sm">Kör és részei</h4>
              <p className="text-[10px] text-slate-500">Sugár, átmérő, húr</p>
            </div>
          </button>

          <button
            onClick={() => handleActivitySelect('triangle-angles-quiz')}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-teal-50 rounded-xl text-teal-600 group-hover:scale-110 transition-transform">
              <Triangle className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-sm">Háromszögek szögei</h4>
              <p className="text-[10px] text-slate-500">Belső és külső szögek</p>
            </div>
          </button>
        </div>
      );
    }

    if (topicId === 'g7-geom-trans') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Geometriai fogalmak */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-trans-fogalmak') && (
            <section>
              <SectionHeader id="g7-sec-trans-fogalmak" number={1} title="Geometriai fogalmak" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szögek párosítása"
                  subtitle="Hegyesszög, derékszög, tompaszög stb."
                  type="Gyakorlás"
                  emoji="🎯"
                  onClick={() => handleActivitySelect('angle-matching', 'g7-geom-trans')}
                  icon={<Target className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Síkidom vagy Test?"
                  subtitle="2D és 3D geometriai alakzatok"
                  type="Gyakorlás"
                  emoji="📦"
                  onClick={() => handleActivitySelect('shape-classification', 'g7-geom-trans')}
                  icon={<Box className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Egyenesek helyzete"
                  subtitle="Párhuzamos, merőleges, metsző"
                  type="Gyakorlás"
                  emoji="📏"
                  onClick={() => handleActivitySelect('line-relationships', 'g7-geom-trans')}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 2: Háromszögek nevezetes vonalai */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-trans-haromszog-vonalak') && (
            <section>
              <SectionHeader id="g7-sec-trans-haromszog-vonalak" number={2} title="Háromszögek nevezetes vonalai" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Alapszerkesztések"
                  subtitle="Körző és vonalzó szerkesztő eszköz"
                  type="Gyakorlás"
                  emoji="📐"
                  onClick={() => handleActivitySelect('construction', 'g7-geom-trans')}
                  icon={<Pencil className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Nevezetes vonalak"
                  subtitle="Oldalfelezők, szögfelezők, magasságok és súlyvonalak"
                  type="Hamarosan"
                  emoji="📏"
                  disabled={true}
                  icon={<Triangle className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 3: Háromszögek és négyszögek */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-trans-haromszog-negyszog') && (
            <section>
              <SectionHeader id="g7-sec-trans-haromszog-negyszog" number={3} title="Háromszögek és négyszögek" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Háromszögek fajtái"
                  subtitle="Oldalak és szögek szerinti csoportosítás"
                  type="Gyakorlás"
                  emoji="🔺"
                  onClick={() => handleActivitySelect('triangle-classification', 'g7-geom-trans')}
                  icon={<Triangle className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Háromszögek szögei kvíz"
                  subtitle="Belső és külső szögek kiszámítása"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => handleActivitySelect('triangle-angles-quiz', 'g7-geom-trans')}
                  icon={<Target className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Négyszögek fajtái"
                  subtitle="Négyszögek tulajdonságai és típusai"
                  type="Gyakorlás"
                  emoji="🟩"
                  onClick={() => handleActivitySelect('quadrilateral-classification', 'g7-geom-trans')}
                  icon={<Square className="w-6 h-6" />}
                  color="green"
                />
              </div>
            </section>
          )}

          {/* Section 4: Geometriai transzformációk */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-trans-transzformaciok') && (
            <section>
              <SectionHeader id="g7-sec-trans-transzformaciok" number={4} title="Geometriai transzformációk" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egyenesek helyzete"
                  subtitle="Transzformációs tengelyek és egyenesek"
                  type="Gyakorlás"
                  emoji="↔️"
                  onClick={() => handleActivitySelect('line-relationships', 'g7-geom-trans')}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Transzformációk"
                  subtitle="Egybevágóságok és invariáns tulajdonságok"
                  type="Hamarosan"
                  emoji="🔄"
                  disabled={true}
                  icon={<RefreshCw className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 5: Középpontos tükrözés */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-trans-kozeppontos-tukrozes') && (
            <section>
              <SectionHeader id="g7-sec-trans-kozeppontos-tukrozes" number={5} title="Középpontos tükrözés" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tükrözés kvíz"
                  subtitle="Alakzatok tükörképeinek felismerése"
                  type="Kvíz"
                  emoji="🔄"
                  onClick={() => handleActivitySelect('reflection-quiz', 'g7-geom-trans')}
                  icon={<Target className="w-6 h-6" />}
                  color="cyan"
                />
                <ActivityPlaceholder
                  title="Középpontos tükrözés"
                  subtitle="Pont és alakzat tükrözése, szerkesztés"
                  type="Hamarosan"
                  emoji="🎯"
                  disabled={true}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 6: A középpontos tükrözés alkalmazása */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-trans-kozeppontos-alkalmazas') && (
            <section>
              <SectionHeader id="g7-sec-trans-kozeppontos-alkalmazas" number={6} title="A középpontos tükrözés alkalmazása" color="sky" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tükrözési alkalmazások"
                  subtitle="Pont és szakasz tükrözése, szimmetria"
                  type="Gyakorlás"
                  emoji="✨"
                  onClick={() => handleActivitySelect('symmetry-construction', 'g7-geom-trans')}
                  icon={<Shapes className="w-6 h-6" />}
                  color="sky"
                />
              </div>
            </section>
          )}

          {/* Section 7: Szögpárok */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-trans-szogparok') && (
            <section>
              <SectionHeader id="g7-sec-trans-szogparok" number={7} title="Szögpárok" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szögek és Szögpárok"
                  subtitle="Mellékszögek, csúcsszögek, pótszögek felismerése"
                  type="Gyakorlás"
                  emoji="📐"
                  onClick={() => handleActivitySelect('angle-matching', 'g7-geom-trans')}
                  icon={<Compass className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 8: Középpontos és tengelyes szimmetria */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-trans-szimmetria') && (
            <section>
              <SectionHeader id="g7-sec-trans-szimmetria" number={8} title="Középpontos és tengelyes szimmetria" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tengelyes szimmetria kvíz"
                  subtitle="Szimmetriatengelyek keresése és berajzolása"
                  type="Kvíz"
                  emoji="🦋"
                  onClick={() => handleActivitySelect('axial-symmetry-quiz', 'g7-geom-trans')}
                  icon={<Target className="w-6 h-6" />}
                  color="violet"
                />
                <ActivityPlaceholder
                  title="Szimmetria a világban"
                  subtitle="Interaktív prezentáció természetbeli példákkal"
                  type="Gyakorlás"
                  emoji="🌟"
                  onClick={() => handleActivitySelect('axial-symmetry-presentation', 'g7-geom-trans')}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Tengelyes tükrözés rajzoló"
                  subtitle="Rajzold meg az alakzat pontos tükörképét!"
                  type="Játék"
                  emoji="🪞"
                  onClick={() => handleActivitySelect('axial-symmetry', 'g7-geom-trans')}
                  icon={<Shapes className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Szimmetria hibakereső"
                  subtitle="Keresd meg a hibás tükrözést!"
                  type="Játék"
                  emoji="🔍"
                  onClick={() => handleActivitySelect('symmetry-error', 'g7-geom-trans')}
                  icon={<Zap className="w-6 h-6" />}
                  color="pink"
                />
              </div>
            </section>
          )}

          {/* Section 9: Paralelogramma és deltoid */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-trans-paralelogramma-deltoid') && (
            <section>
              <SectionHeader id="g7-sec-trans-paralelogramma-deltoid" number={9} title="Paralelogramma és deltoid" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Paralelogramma és deltoid"
                  subtitle="Négyszögek szimmetriái és tulajdonságai"
                  type="Gyakorlás"
                  emoji="🪁"
                  onClick={() => handleActivitySelect('quadrilateral-classification', 'g7-geom-trans')}
                  icon={<LayoutGrid className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 10: Középpontosan szimmetrikus alakzatok */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-trans-kozeppontosan-szimmetrikus') && (
            <section>
              <SectionHeader id="g7-sec-trans-kozeppontosan-szimmetrikus" number={10} title="Középpontosan szimmetrikus alakzatok" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Középpontos szimmetria"
                  subtitle="Forgásszimmetria és szimmetriaközéppont teszt"
                  type="Kvíz"
                  emoji="💠"
                  onClick={() => handleActivitySelect('reflection-quiz', 'g7-geom-trans')}
                  icon={<Boxes className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}

          {/* Section 11: Szabályos sokszögek */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-trans-szabalyos-sokszogek') && (
            <section>
              <SectionHeader id="g7-sec-trans-szabalyos-sokszogek" number={11} title="Szabályos sokszögek" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Sokszögek csoportosítása"
                  subtitle="Szabályos n-szögek szögei és szimmetriái"
                  type="Gyakorlás"
                  emoji="🛑"
                  onClick={() => handleActivitySelect('shape-classification', 'g7-geom-trans')}
                  icon={<Shapes className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 12: A kör */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-trans-kor') && (
            <section>
              <SectionHeader id="g7-sec-trans-kor" number={12} title="A kör" color="red" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="A kör és részei"
                  subtitle="Sugár, átmérő, húr, ív, körcikk és körszelet"
                  type="Játék"
                  emoji="⭕"
                  onClick={() => handleActivitySelect('circle-parts', 'g7-geom-trans')}
                  icon={<Circle className="w-6 h-6" />}
                  color="red"
                />
              </div>
            </section>
          )}

          {/* Section 13: Szerkesztések */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-trans-szerkesztesek') && (
            <section>
              <SectionHeader id="g7-sec-trans-szerkesztesek" number={13} title="Szerkesztések" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Geometriai szerkesztő"
                  subtitle="Körzővel és vonalzóval végzett alapszerkesztések"
                  type="Gyakorlás"
                  emoji="✏️"
                  onClick={() => handleActivitySelect('construction', 'g7-geom-trans')}
                  icon={<Pencil className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 14: Összefoglalás */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-trans-osszefoglalas') && (
            <section>
              <SectionHeader id="g7-sec-trans-osszefoglalas" number={14} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Transzformációk Záróteszt"
                  subtitle="III. Geometriai transzformációk összefoglaló kvíz"
                  type="Teszt"
                  emoji="🏆"
                  onClick={() => handleActivitySelect('quiz', 'g7-geom-trans')}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g7-powers-divisibility') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Nagy számok és a hatványalak */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-pow-nagy-szamok') && (
            <section>
              <SectionHeader id="g7-sec-pow-nagy-szamok" number={1} title="Nagy számok és a hatványalak" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Nagy számok és a hatványalak"
                  subtitle="Hatványozás fogalma, 10 hatványai és normálalak"
                  type="Hamarosan"
                  emoji="🔢"
                  disabled={true}
                  icon={<Binary className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 2: Hatványok alkalmazása */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-pow-alkalmazas') && (
            <section>
              <SectionHeader id="g7-sec-pow-alkalmazas" number={2} title="Hatványok alkalmazása" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Hatványok alkalmazása"
                  subtitle="Hatványozás azonosságai, előjeles számok és törtek hatványai"
                  type="Hamarosan"
                  emoji="⚡"
                  disabled={true}
                  icon={<Zap className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 3: Mit tanultunk az oszthatóságról? (Ismétlés) */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-pow-mit-tanultunk-ismetles') && (
            <section>
              <SectionHeader id="g7-sec-pow-mit-tanultunk-ismetles" number={3} title="Mit tanultunk az oszthatóságról? (Ismétlés)" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Mit tanultunk az oszthatóságról?"
                  subtitle="Alapvető szabályok (2, 3, 4, 5, 8, 9, 10, 25, 100), összeg és szorzat"
                  type="Hamarosan"
                  emoji="🔄"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 4: Egy kis logika */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-pow-logika') && (
            <section>
              <SectionHeader id="g7-sec-pow-logika" number={4} title="Egy kis logika" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egy kis logika"
                  subtitle="Logikai következtetések, szükséges és elégséges feltételek"
                  type="Hamarosan"
                  emoji="💡"
                  disabled={true}
                  icon={<Lightbulb className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 5: A prímszámok. A számok prímtényezős felbontása */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-pow-prim-felbontas') && (
            <section>
              <SectionHeader id="g7-sec-pow-prim-felbontas" number={5} title="A prímszámok. A számok prímtényezős felbontása" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Prímszámok és felbontás"
                  subtitle="Számelmélet alaptétele, prímfelbontás és kanonikus alak"
                  type="Hamarosan"
                  emoji="🧱"
                  disabled={true}
                  icon={<Boxes className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 6: Készítsünk magunknak oszthatósági szabályokat! */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-pow-szabaly-keszites') && (
            <section>
              <SectionHeader id="g7-sec-pow-szabaly-keszites" number={6} title="Készítsünk magunknak oszthatósági szabályokat!" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Oszthatósági szabályok alkotása"
                  subtitle="Összetett szabályok (6, 12, 15, 18, 36, 45) relatív prímekkel"
                  type="Hamarosan"
                  emoji="🛠️"
                  disabled={true}
                  icon={<Wrench className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 7: Osztókról, többszörösökről még egyszer */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-pow-osztok-tobbszorosok') && (
            <section>
              <SectionHeader id="g7-sec-pow-osztok-tobbszorosok" number={7} title="Osztókról, többszörösökről még egyszer" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Osztók és többszörösök"
                  subtitle="Osztópárok, osztók száma és négyzetszámok tulajdonsága"
                  type="Hamarosan"
                  emoji="📊"
                  disabled={true}
                  icon={<Table className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 8: Legnagyobb közös osztó */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-pow-lnko') && (
            <section>
              <SectionHeader id="g7-sec-pow-lnko" number={8} title="Legnagyobb közös osztó" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Legnagyobb közös osztó (LNKO)"
                  subtitle="Közös osztók, prímfelbontásos kiszámítás és relatív prímek"
                  type="Hamarosan"
                  emoji="🎯"
                  disabled={true}
                  icon={<Target className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 9: Legkisebb közös többszörös */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-pow-lkkt') && (
            <section>
              <SectionHeader id="g7-sec-pow-lkkt" number={9} title="Legkisebb közös többszörös" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Legkisebb közös többszörös (LKKT)"
                  subtitle="Közös többszörösök, közös nevező és LNKO·LKKT tétel"
                  type="Hamarosan"
                  emoji="📈"
                  disabled={true}
                  icon={<TrendingUp className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 10: Matematikai játékok */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-pow-jatekok') && (
            <section>
              <SectionHeader id="g7-sec-pow-jatekok" number={10} title="Matematikai játékok" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Matematikai játékok"
                  subtitle="Számelméleti játékok, nyerő stratégiák és paritás"
                  type="Hamarosan"
                  emoji="🎮"
                  disabled={true}
                  icon={<Gamepad2 className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}

          {/* Section 11: Összefoglalás */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-pow-osszefoglalas') && (
            <section>
              <SectionHeader id="g7-sec-pow-osszefoglalas" number={11} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglalás"
                  subtitle="IV. Hatványozás, oszthatóság fejezet átfogó rendszerezése"
                  type="Hamarosan"
                  emoji="🏆"
                  disabled={true}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'word-problems') {
      return (
        <div className="flex justify-center py-4">
          <Button
            onClick={() => handleActivitySelect('word-problems')}
            className="gap-2 bg-teal-500 hover:bg-teal-600 text-white rounded-xl px-8"
          >
            <Sparkles className="w-4 h-4" />
            Szöveges feladatok indítása
          </Button>
        </div>
      );
    }

    if (topicId === 'g6-integers-divisibility') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Műveletek az egész számok körében */}
          {(showAll || activeGrade5SubSectionId === 'g6-sec-muveletek') && (
            <section>
              <SectionHeader id="g6-sec-muveletek" number={1} title="Műveletek az egész számok körében (Mit tanultunk ötödik osztályban?)" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Műveletek az egész számok körében"
                  subtitle="Egész számok összeadása, kivonása és számegyenes"
                  type="Hamarosan"
                  emoji="🔢"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 2: Az egész számok szorzása */}
          {(showAll || activeGrade5SubSectionId === 'g6-sec-szorzas') && (
            <section>
              <SectionHeader id="g6-sec-szorzas" number={2} title="Az egész számok szorzása" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Az egész számok szorzása"
                  subtitle="Pozitív és negatív számok szorzása, előjelszabályok"
                  type="Hamarosan"
                  emoji="✖️"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 3: Az egész számok osztása */}
          {(showAll || activeGrade5SubSectionId === 'g6-sec-osztas') && (
            <section>
              <SectionHeader id="g6-sec-osztas" number={3} title="Az egész számok osztása" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Az egész számok osztása"
                  subtitle="Egész számok osztása, előjelszabályok és tulajdonságok"
                  type="Hamarosan"
                  emoji="➗"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 4: Hány eset van? Számoljuk össze! */}
          {(showAll || activeGrade5SubSectionId === 'g6-sec-hany-eset') && (
            <section>
              <SectionHeader id="g6-sec-hany-eset" number={4} title="Hány eset van? Számoljuk össze!" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Hány eset van?"
                  subtitle="Esetek rendszerezett összeszámolása és fastruktúra"
                  type="Hamarosan"
                  emoji="🎲"
                  disabled={true}
                  icon={<Dices className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 5: Osztó, többszörös */}
          {(showAll || activeGrade5SubSectionId === 'g6-sec-oszto-tobbszoros') && (
            <section>
              <SectionHeader id="g6-sec-oszto-tobbszoros" number={5} title="Osztó, többszörös" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Osztó és többszörös"
                  subtitle="Az osztó és a többszörös fogalma, tulajdonságai"
                  type="Hamarosan"
                  emoji="🔄"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 6: Számolás maradékokkal */}
          {(showAll || activeGrade5SubSectionId === 'g6-sec-maradekok') && (
            <section>
              <SectionHeader id="g6-sec-maradekok" number={6} title="Számolás maradékokkal" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számolás maradékokkal"
                  subtitle="Maradékos osztás alaptétele és maradékok vizsgálata"
                  type="Hamarosan"
                  emoji="⏳"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 7: Hány osztója van? */}
          {(showAll || activeGrade5SubSectionId === 'g6-sec-hany-osztoja-van') && (
            <section>
              <SectionHeader id="g6-sec-hany-osztoja-van" number={7} title="Hány osztója van?" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Prímtényezők"
                  subtitle="Számok felbontása prímszámok szorzatára"
                  type="Eszköz"
                  emoji="🧱"
                  onClick={() => handleActivitySelect('divisibility-factorization', topicId)}
                  icon={<Binary className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Párosító Játék"
                  subtitle="Párosítsd a számokat a prímfelbontásukkal!"
                  type="Játék"
                  emoji="🎯"
                  onClick={() => handleActivitySelect('divisibility-matcher', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 8: Oszthatóság 2-vel, 5-tel, 10-zel */}
          {(showAll || activeGrade5SubSectionId === 'g6-sec-oszthatosag-2-5-10') && (
            <section>
              <SectionHeader id="g6-sec-oszthatosag-2-5-10" number={8} title="Oszthatóság 2-vel, 5-tel, 10-zel" color="sky" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Oszthatóság 2-vel, 5-tel, 10-zel"
                  subtitle="Utolsó számjegy alapú oszthatósági szabályok"
                  type="Hamarosan"
                  emoji="🔟"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="sky"
                />
              </div>
            </section>
          )}

          {/* Section 9: Oszthatóság 3-mal és 9-cel */}
          {(showAll || activeGrade5SubSectionId === 'g6-sec-oszthatosag-3-9') && (
            <section>
              <SectionHeader id="g6-sec-oszthatosag-3-9" number={9} title="Oszthatóság 3-mal és 9-cel" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Oszthatóság 3-mal és 9-cel"
                  subtitle="Számjegyösszeg alapú oszthatósági szabályok"
                  type="Hamarosan"
                  emoji="🧮"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 10: Oszthatóság 4-gyel és 100-zal */}
          {(showAll || activeGrade5SubSectionId === 'g6-sec-oszthatosag-4-100') && (
            <section>
              <SectionHeader id="g6-sec-oszthatosag-4-100" number={10} title="Oszthatóság 4-gyel és 100-zal" color="pink" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Oszthatóság 4-gyel és 100-zal"
                  subtitle="Utolsó két számjegy vizsgálata és szabályai"
                  type="Hamarosan"
                  emoji="💯"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="pink"
                />
              </div>
            </section>
          )}

          {/* Section 11: Összetett oszthatósági szabályok */}
          {(showAll || activeGrade5SubSectionId === 'g6-sec-osszetett-oszthatosag') && (
            <section>
              <SectionHeader id="g6-sec-osszetett-oszthatosag" number={11} title="Összetett oszthatósági szabályok" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Oszthatósági Kvíz"
                  subtitle="Összetett oszthatósági szabályok gyakorlása"
                  type="Kvíz"
                  emoji="⚡"
                  onClick={() => handleActivitySelect('divisibility-quiz', topicId)}
                  icon={<Gamepad2 className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}

          {/* Section 12: Többszörös, közös többszörös */}
          {(showAll || activeGrade5SubSectionId === 'g6-sec-tobbszoros-kozos') && (
            <section>
              <SectionHeader id="g6-sec-tobbszoros-kozos" number={12} title="Többszörös, közös többszörös" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="LKKT Kvíz"
                  subtitle="Legkisebb közös többszörös gyakorlása"
                  type="Kvíz"
                  emoji="✨"
                  onClick={() => handleActivitySelect('divisibility-lkktquiz', topicId)}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 13: Osztó, közös osztó */}
          {(showAll || activeGrade5SubSectionId === 'g6-sec-oszto-kozos') && (
            <section>
              <SectionHeader id="g6-sec-oszto-kozos" number={13} title="Osztó, közös osztó" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="LKÖ Kvíz"
                  subtitle="Legnagyobb közös osztó meghatározása"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => handleActivitySelect('divisibility-gcdquiz', topicId)}
                  icon={<Zap className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 14: Összefoglalás */}
          {(showAll || activeGrade5SubSectionId === 'g6-sec-osszefoglalas') && (
            <section>
              <SectionHeader id="g6-sec-osszefoglalas" number={14} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglalás"
                  subtitle="I. Egész számok, oszthatóság fejezet átfogó ismétlése"
                  type="Hamarosan"
                  emoji="🏆"
                  disabled={true}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g6-fractions') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Mit tanultunk a törtekről? Ismétlés */}
          {(showAll || activeGrade5SubSectionId === 'g6-frac-sec-1') && (
            <section>
              <SectionHeader id="g6-frac-sec-1" number={1} title="Mit tanultunk a törtekről? Ismétlés" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Vizuális Tört Párosító"
                  subtitle="Törtek és ábrák párosítása"
                  type="Játék"
                  emoji="🍕"
                  onClick={() => handleActivitySelect('g6-fraction-visual-matcher', topicId)}
                  icon={<Pizza className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Tört Kvíz"
                  subtitle="Törtek összeadása, kivonása és egyszerűsítése"
                  type="Kvíz"
                  emoji="⚡"
                  onClick={() => handleActivitySelect('g6-fractions-quiz', topicId)}
                  icon={<Zap className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 2: Szorzás törttel, a reciprok */}
          {(showAll || activeGrade5SubSectionId === 'g6-frac-sec-2') && (
            <section>
              <SectionHeader id="g6-frac-sec-2" number={2} title="Szorzás törttel, a reciprok" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tört Szorzás Párosító"
                  subtitle="Szorzás egész számmal és törttel, reciprok"
                  type="Játék"
                  emoji="✖️"
                  onClick={() => handleActivitySelect('g6-fraction-multiplier', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 3: Osztás törttel */}
          {(showAll || activeGrade5SubSectionId === 'g6-frac-sec-3') && (
            <section>
              <SectionHeader id="g6-frac-sec-3" number={3} title="Osztás törttel" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tört Osztás Párosító"
                  subtitle="Osztás egész számmal és törttel, reciprokkal való szorzás"
                  type="Játék"
                  emoji="➗"
                  onClick={() => handleActivitySelect('g6-fraction-divider', topicId)}
                  icon={<Binary className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 4: Mit tanultunk a tizedes törtekről? Ismétlés */}
          {(showAll || activeGrade5SubSectionId === 'g6-frac-sec-4') && (
            <section>
              <SectionHeader id="g6-frac-sec-4" number={4} title="Mit tanultunk a tizedes törtekről? Ismétlés" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tizedestört Kvíz"
                  subtitle="Tizedestört helyiértékek, összeadás és kivonás"
                  type="Kvíz"
                  emoji="🧮"
                  onClick={() => handleActivitySelect('g6-decimal-quiz', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Tört - Tizedestört Párosító"
                  subtitle="Közönséges és tizedes tört alakok összerendelése"
                  type="Játék"
                  emoji="🎯"
                  onClick={() => handleActivitySelect('g6-to-decimal-matcher', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 5: Szorzás tizedes törttel */}
          {(showAll || activeGrade5SubSectionId === 'g6-frac-sec-5') && (
            <section>
              <SectionHeader id="g6-frac-sec-5" number={5} title="Szorzás tizedes törttel" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tizedestört Szorzás Kvíz"
                  subtitle="Szorzás 10-zel, 100-zal és tizedes törttel"
                  type="Kvíz"
                  emoji="⚡"
                  onClick={() => handleActivitySelect('g6-decimal-multiplier-quiz', topicId)}
                  icon={<Zap className="w-6 h-6" />}
                  color="violet"
                />
                <ActivityPlaceholder
                  title="Szorzás Párosító"
                  subtitle="Gyakorold a tizedestört szorzást párosító játékkal!"
                  type="Játék"
                  emoji="🧩"
                  onClick={() => handleActivitySelect('g6-decimal-multiplier', topicId)}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 6: Osztás tizedes törttel */}
          {(showAll || activeGrade5SubSectionId === 'g6-frac-sec-6') && (
            <section>
              <SectionHeader id="g6-frac-sec-6" number={6} title="Osztás tizedes törttel" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tizedestört Osztás Kvíz"
                  subtitle="Osztás 10-zel, 100-zal és tizedes törttel"
                  type="Kvíz"
                  emoji="⚡"
                  onClick={() => handleActivitySelect('g6-decimal-divider-quiz', topicId)}
                  icon={<Zap className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Osztás Párosító"
                  subtitle="Gyakorold a tizedestört osztást párosító játékkal!"
                  type="Játék"
                  emoji="🎯"
                  onClick={() => handleActivitySelect('g6-decimal-divider', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="pink"
                />
              </div>
            </section>
          )}

          {/* Section 7: Összetett műveletek, zárójelfelbontás */}
          {(showAll || activeGrade5SubSectionId === 'g6-frac-sec-7') && (
            <section>
              <SectionHeader id="g6-frac-sec-7" number={7} title="Összetett műveletek, zárójelfelbontás" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összetett műveletek"
                  subtitle="Műveleti sorrend és zárójelfelbontási szabályok"
                  type="Hamarosan"
                  emoji="📐"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 8: Összefoglalás */}
          {(showAll || activeGrade5SubSectionId === 'g6-frac-sec-8') && (
            <section>
              <SectionHeader id="g6-frac-sec-8" number={8} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Törtek Témazáró Teszt"
                  subtitle="A teljes II. Törtek fejezet átfogó ellenőrző tesztje"
                  type="Teszt"
                  emoji="🏆"
                  onClick={() => handleActivitySelect('g6-fractions-closing-test', topicId)}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g6-geometry-symmetry') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Síkbeli alakzatok */}
          {(showAll || activeGrade5SubSectionId === 'g6-geom-sec-1') && (
            <section>
              <SectionHeader id="g6-geom-sec-1" number={1} title="Síkbeli alakzatok" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Sokszögek"
                  subtitle="Alakzatok csoportosítása és tulajdonságai"
                  type="Gyakorlás"
                  emoji="📐"
                  onClick={() => handleActivitySelect('shape-classification', topicId)}
                  icon={<Shapes className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Egyenesek"
                  subtitle="Párhuzamos és merőleges kapcsolatok"
                  type="Gyakorlás"
                  emoji="📏"
                  onClick={() => handleActivitySelect('line-relationships', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Szögek párosítása"
                  subtitle="Szögtípusok és fokok gyakorlása"
                  type="Játék"
                  emoji="🎯"
                  onClick={() => handleActivitySelect('angle-matching', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 2: Egybevágóság */}
          {(showAll || activeGrade5SubSectionId === 'g6-geom-sec-2') && (
            <section>
              <SectionHeader id="g6-geom-sec-2" number={2} title="Egybevágóság" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egybevágóság"
                  subtitle="Egybevágó alakzatok és transzformációk"
                  type="Hamarosan"
                  emoji="✨"
                  disabled={true}
                  icon={<Zap className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 3: A kör */}
          {(showAll || activeGrade5SubSectionId === 'g6-geom-sec-3') && (
            <section>
              <SectionHeader id="g6-geom-sec-3" number={3} title="A kör" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Kör részei"
                  subtitle="Sugár, átmérő, húr, ív és körcikk felismerése"
                  type="Játék"
                  emoji="⭕"
                  onClick={() => handleActivitySelect('circle-parts', topicId)}
                  icon={<Circle className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 4: A szakasz felezőmerőlegese */}
          {(showAll || activeGrade5SubSectionId === 'g6-geom-sec-4') && (
            <section>
              <SectionHeader id="g6-geom-sec-4" number={4} title="A szakasz felezőmerőlegese" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Felezőmerőleges"
                  subtitle="Szakaszfelező merőleges és pontjainak tulajdonságai"
                  type="Hamarosan"
                  emoji="✂️"
                  disabled={true}
                  icon={<Pencil className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 5: Szerkesztések */}
          {(showAll || activeGrade5SubSectionId === 'g6-geom-sec-5') && (
            <section>
              <SectionHeader id="g6-geom-sec-5" number={5} title="Szerkesztések" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Alapszerkesztések"
                  subtitle="Körzővel és vonalzóval végzett szerkesztések"
                  type="Eszköz"
                  emoji="✏️"
                  onClick={() => handleActivitySelect('construction', topicId)}
                  icon={<Pencil className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 6: Tengelyes tükrözés */}
          {(showAll || activeGrade5SubSectionId === 'g6-geom-sec-6') && (
            <section>
              <SectionHeader id="g6-geom-sec-6" number={6} title="Tengelyes tükrözés" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tükörkép keresése"
                  subtitle="Interaktív tengelyes tükrözés kvíz"
                  type="Kvíz"
                  emoji="🪞"
                  onClick={() => handleActivitySelect('reflection-quiz', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Húzd a helyére!"
                  subtitle="Tükrözés pontról pontra a koordinátarendszerben"
                  type="Játék"
                  emoji="⚡"
                  onClick={() => handleActivitySelect('axial-symmetry', topicId)}
                  icon={<Zap className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Találd meg a hibát!"
                  subtitle="Diagnosztikai szimmetria hibakereső"
                  type="Játék"
                  emoji="🔍"
                  onClick={() => handleActivitySelect('symmetry-error', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 7: A tengelyes tükrözés tulajdonságai */}
          {(showAll || activeGrade5SubSectionId === 'g6-geom-sec-7') && (
            <section>
              <SectionHeader id="g6-geom-sec-7" number={7} title="A tengelyes tükrözés tulajdonságai" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Tükrözés tulajdonságai"
                  subtitle="Távolságtartás, szögtartás és körüljárási irány"
                  type="Hamarosan"
                  emoji="📖"
                  disabled={true}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 8: Tengelyes szimmetria */}
          {(showAll || activeGrade5SubSectionId === 'g6-geom-sec-8') && (
            <section>
              <SectionHeader id="g6-geom-sec-8" number={8} title="Tengelyes szimmetria" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szimmetriatengely Kvíz"
                  subtitle="Szimmetriatengelyek száma alakzatokban"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => handleActivitySelect('axial-symmetry-quiz', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="violet"
                />
                <ActivityPlaceholder
                  title="A szimmetria körbevesz"
                  subtitle="Interaktív vizuális bemutató"
                  type="Bemutató"
                  emoji="🦋"
                  onClick={() => handleActivitySelect('axial-symmetry-presentation', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 9: Tengelyesen szimmetrikus háromszögek, négyszögek, sokszögek */}
          {(showAll || activeGrade5SubSectionId === 'g6-geom-sec-9') && (
            <section>
              <SectionHeader id="g6-geom-sec-9" number={9} title="Tengelyesen szimmetrikus háromszögek, négyszögek, sokszögek" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Háromszögek"
                  subtitle="Háromszögek típusai és tengelyes szimmetriája"
                  type="Gyakorlás"
                  emoji="🔺"
                  onClick={() => handleActivitySelect('triangle-classification', topicId)}
                  icon={<Triangle className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Négyszögek"
                  subtitle="Négyszögek tulajdonságai és tengelyes szimmetriája"
                  type="Gyakorlás"
                  emoji="🔲"
                  onClick={() => handleActivitySelect('quadrilateral-classification', topicId)}
                  icon={<Square className="w-6 h-6" />}
                  color="pink"
                />
              </div>
            </section>
          )}

          {/* Section 10: Szerkesztési feladatok */}
          {(showAll || activeGrade5SubSectionId === 'g6-geom-sec-10') && (
            <section>
              <SectionHeader id="g6-geom-sec-10" number={10} title="Szerkesztési feladatok" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összetett szerkesztés"
                  subtitle="Háromszögek és négyszögek szerkesztése adatokból"
                  type="Hamarosan"
                  emoji="📐"
                  disabled={true}
                  icon={<Pencil className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 11: Összefoglalás */}
          {(showAll || activeGrade5SubSectionId === 'g6-geom-sec-11') && (
            <section>
              <SectionHeader id="g6-geom-sec-11" number={11} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szögek Kvíz"
                  subtitle="III. Geometria fejezet átfogó ismétlése"
                  type="Kvíz"
                  emoji="🏆"
                  onClick={() => handleActivitySelect('triangle-angles-quiz', topicId)}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g6-ratio-percent-word') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Az arány fogalma */}
          {(showAll || activeGrade5SubSectionId === 'g6-ratio-sec-1') && (
            <section>
              <SectionHeader id="g6-ratio-sec-1" number={1} title="Az arány fogalma" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Arány felismerés"
                  subtitle="Zászlók, poharak, kísérletek"
                  type="Teszt"
                  emoji="🚩"
                  onClick={() => handleActivitySelect('ratio-intro', topicId)}
                  icon={<Flag className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Arány alkotó"
                  subtitle="Színezés, keverés, elosztás"
                  type="Interaktív"
                  emoji="🎨"
                  onClick={() => handleActivitySelect('ratio-creator', topicId)}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 2: Arányos osztás */}
          {(showAll || activeGrade5SubSectionId === 'g6-ratio-sec-2') && (
            <section>
              <SectionHeader id="g6-ratio-sec-2" number={2} title="Arányos osztás" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Arányos osztás"
                  subtitle="Mennyiségek szétosztása adott arányban"
                  type="Hamarosan"
                  emoji="➗"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 3: Egyenes arányosság */}
          {(showAll || activeGrade5SubSectionId === 'g6-ratio-sec-3') && (
            <section>
              <SectionHeader id="g6-ratio-sec-3" number={3} title="Egyenes arányosság" color="yellow" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egyenes arányosság kvíz"
                  subtitle="Összetartozó mennyiségek és állandó hányados"
                  type="Teszt"
                  emoji="⚖️"
                  onClick={() => handleActivitySelect('direct-proportion-quiz', topicId)}
                  icon={<Scale className="w-6 h-6" />}
                  color="yellow"
                />
              </div>
            </section>
          )}

          {/* Section 4: Egyenes arányosság grafikonja */}
          {(showAll || activeGrade5SubSectionId === 'g6-ratio-sec-4') && (
            <section>
              <SectionHeader id="g6-ratio-sec-4" number={4} title="Egyenes arányosság grafikonja" color="lime" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Arányosság grafikonja"
                  subtitle="Origón átmenő egyenes és pontsor ábrázolása"
                  type="Hamarosan"
                  emoji="📈"
                  disabled={true}
                  icon={<LineChart className="w-6 h-6" />}
                  color="lime"
                />
              </div>
            </section>
          )}

          {/* Section 5: Szabályok, megfeleltetések */}
          {(showAll || activeGrade5SubSectionId === 'g6-ratio-sec-5') && (
            <section>
              <SectionHeader id="g6-ratio-sec-5" number={5} title="Szabályok, megfeleltetések" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szabályjáték"
                  subtitle="Hozzárendelések és táblázatok kitöltése"
                  type="Hamarosan"
                  emoji="🔄"
                  disabled={true}
                  icon={<Repeat className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 6: Törtrész */}
          {(showAll || activeGrade5SubSectionId === 'g6-ratio-sec-6') && (
            <section>
              <SectionHeader id="g6-ratio-sec-6" number={6} title="Törtrész" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Törtrész és egész"
                  subtitle="Törtrész kiszámítása és visszaszámolás"
                  type="Hamarosan"
                  emoji="🍕"
                  disabled={true}
                  icon={<Percent className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 7: Százalékszámítás */}
          {(showAll || activeGrade5SubSectionId === 'g6-ratio-sec-7') && (
            <section>
              <SectionHeader id="g6-ratio-sec-7" number={7} title="Százalékszámítás" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Százalékérték"
                  subtitle="Százalékérték kiszámítása"
                  type="Teszt"
                  emoji="💯"
                  onClick={() => {
                    setPercentMode('calculate-value');
                    handleActivitySelect('percentages', topicId);
                  }}
                  icon={<Percent className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Százalékláb"
                  subtitle="Arány megadása %-ban"
                  type="Teszt"
                  emoji="📊"
                  onClick={() => {
                    setPercentMode('calculate-rate');
                    handleActivitySelect('percentages', topicId);
                  }}
                  icon={<Percent className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Százalékalap"
                  subtitle="Visszaszámolás a 100%-ra"
                  type="Teszt"
                  emoji="🎯"
                  onClick={() => {
                    setPercentMode('calculate-base');
                    handleActivitySelect('percentages', topicId);
                  }}
                  icon={<Percent className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 8: A százalékszámítás gyakorlása */}
          {(showAll || activeGrade5SubSectionId === 'g6-ratio-sec-8') && (
            <section>
              <SectionHeader id="g6-ratio-sec-8" number={8} title="A százalékszámítás gyakorlása" color="pink" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Százalékos szöveges feladatok"
                  subtitle="Árleszállítás, drágulás és kedvezmények"
                  type="Gyakorlás"
                  emoji="🏷️"
                  onClick={() => handleActivitySelect('percent-value-word-problems', topicId)}
                  icon={<Percent className="w-6 h-6" />}
                  color="pink"
                />
              </div>
            </section>
          )}

          {/* Section 9: Nyitott mondatok */}
          {(showAll || activeGrade5SubSectionId === 'g6-ratio-sec-9') && (
            <section>
              <SectionHeader id="g6-ratio-sec-9" number={9} title="Nyitott mondatok" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egyenletmegoldó"
                  subtitle="Vizuális mérlegmodell és lebontogatás"
                  type="Eszköz"
                  emoji="⚖️"
                  onClick={() => handleActivitySelect('equation-solver', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 10: Szöveges feladatok */}
          {(showAll || activeGrade5SubSectionId === 'g6-ratio-sec-10') && (
            <section>
              <SectionHeader id="g6-ratio-sec-10" number={10} title="Szöveges feladatok" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szöveges feladatok kvíz"
                  subtitle="Gondolkodtató és gyakorlati szöveges feladatok"
                  type="Teszt"
                  emoji="📝"
                  onClick={() => handleActivitySelect('g6-word-problems-quiz', topicId)}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Feladatsorok"
                  subtitle="Szöveges feladatgyűjtemény lépésről lépésre"
                  type="Gyakorlás"
                  emoji="📚"
                  onClick={() => handleActivitySelect('g6-word-problems-module', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 11: Több megoldás is lehet */}
          {(showAll || activeGrade5SubSectionId === 'g6-ratio-sec-11') && (
            <section>
              <SectionHeader id="g6-ratio-sec-11" number={11} title="Több megoldás is lehet" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Esetvizsgálat"
                  subtitle="Feladatok több lehetséges megoldással"
                  type="Hamarosan"
                  emoji="🧩"
                  disabled={true}
                  icon={<Brain className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 12: Összefoglalás */}
          {(showAll || activeGrade5SubSectionId === 'g6-ratio-sec-12') && (
            <section>
              <SectionHeader id="g6-ratio-sec-12" number={12} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglaló felkészítő"
                  subtitle="IV. Arány, százalék, szöveges feladatok átfogó ismétlés"
                  type="Hamarosan"
                  emoji="🏆"
                  disabled={true}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }


    if (topicId === 'g6-measurements') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Hosszúság, tömeg, idő */}
          {(showAll || activeGrade5SubSectionId === 'g6-meas-sec-1') && (
            <section>
              <SectionHeader id="g6-meas-sec-1" number={1} title="Hosszúság, tömeg, idő" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Mértékegység átváltó"
                  subtitle="Hosszúság, tömeg és idő átváltása"
                  type="Eszköz"
                  emoji="📏"
                  onClick={() => handleActivitySelect('unit-converter', topicId)}
                  icon={<Ruler className="w-6 h-6" />}
                  color="cyan"
                />
                <ActivityPlaceholder
                  title="Analóg Óra"
                  subtitle="Időmérés és időszámítás"
                  type="Eszköz"
                  emoji="⏱️"
                  onClick={() => handleActivitySelect('analog-clock', topicId)}
                  icon={<Timer className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 2: A sokszögek kerülete */}
          {(showAll || activeGrade5SubSectionId === 'g6-meas-sec-2') && (
            <section>
              <SectionHeader id="g6-meas-sec-2" number={2} title="A sokszögek kerülete" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Kerület Kvíz"
                  subtitle="Háromszögek és négyszögek kerülete"
                  type="Teszt"
                  emoji="📐"
                  onClick={() => handleActivitySelect('perimeter-quiz', topicId)}
                  icon={<Shapes className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 3: A terület és a térfogat mérése */}
          {(showAll || activeGrade5SubSectionId === 'g6-meas-sec-3') && (
            <section>
              <SectionHeader id="g6-meas-sec-3" number={3} title="A terület és a térfogat mérése" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Terület Átváltás Kvíz"
                  subtitle="Mértékegységek 100-as váltószámmal"
                  type="Teszt"
                  emoji="🔄"
                  onClick={() => handleActivitySelect('area-conversion-quiz', topicId)}
                  icon={<MoveHorizontal className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Űrmérték Átváltó"
                  subtitle="Liter, deciliter és köbdeciméter"
                  type="Eszköz"
                  emoji="🧪"
                  onClick={() => handleActivitySelect('capacity-converter', topicId)}
                  icon={<FlaskConical className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 4: A sokszögek területe */}
          {(showAll || activeGrade5SubSectionId === 'g6-meas-sec-4') && (
            <section>
              <SectionHeader id="g6-meas-sec-4" number={4} title="A sokszögek területe" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Területszámítás Kvíz"
                  subtitle="Négyzet, téglalap, háromszögek területe"
                  type="Teszt"
                  emoji="🟩"
                  onClick={() => handleActivitySelect('area-calc-quiz', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Kerület & Terület Műhely"
                  subtitle="Interaktív rácsos síkidom tervező"
                  type="Eszköz"
                  emoji="📐"
                  onClick={() => handleActivitySelect('perimeter-area-tool', topicId)}
                  icon={<Shapes className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 5: Alakzatok a térben */}
          {(showAll || activeGrade5SubSectionId === 'g6-meas-sec-5') && (
            <section>
              <SectionHeader id="g6-meas-sec-5" number={5} title="Alakzatok a térben" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Térbeli testek és hálók"
                  subtitle="Csúcsok, élek, lapok és testhálók"
                  type="Hamarosan"
                  emoji="📦"
                  disabled={true}
                  icon={<Box className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 6: Testek felszíne */}
          {(showAll || activeGrade5SubSectionId === 'g6-meas-sec-6') && (
            <section>
              <SectionHeader id="g6-meas-sec-6" number={6} title="Testek felszíne" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Felszínszámítás Kvíz"
                  subtitle="Kocka és téglatest felszíne"
                  type="Teszt"
                  emoji="📦"
                  onClick={() => handleActivitySelect('surface-area-quiz', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="3D Test Stúdió"
                  subtitle="Testek 3D modellje és felszíne"
                  type="Eszköz"
                  emoji="🧊"
                  onClick={() => handleActivitySelect('volume-surface-tool', topicId)}
                  icon={<Boxes className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 7: Felszínszámítással kapcsolatos gyakorlati feladatok */}
          {(showAll || activeGrade5SubSectionId === 'g6-meas-sec-7') && (
            <section>
              <SectionHeader id="g6-meas-sec-7" number={7} title="Felszínszámítással kapcsolatos gyakorlati feladatok" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Gyakorlati felszínszámítás"
                  subtitle="Szobafestés, csomagolás, burkolás"
                  type="Hamarosan"
                  emoji="🏠"
                  disabled={true}
                  icon={<Target className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}

          {/* Section 8: Testek térfogata */}
          {(showAll || activeGrade5SubSectionId === 'g6-meas-sec-8') && (
            <section>
              <SectionHeader id="g6-meas-sec-8" number={8} title="Testek térfogata" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Térfogatszámítás Kvíz"
                  subtitle="Kocka, téglatest térfogata és űrtartalma"
                  type="Teszt"
                  emoji="🛢️"
                  onClick={() => handleActivitySelect('volume-quiz', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 9: Összefoglalás */}
          {(showAll || activeGrade5SubSectionId === 'g6-meas-sec-9') && (
            <section>
              <SectionHeader id="g6-meas-sec-9" number={9} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglaló felkészítő"
                  subtitle="V. Kerület, terület, felszín, térfogat összefoglalás"
                  type="Hamarosan"
                  emoji="🏆"
                  disabled={true}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g6-statistics') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Játékok */}
          {(showAll || activeGrade5SubSectionId === 'g6-stat-sec-1') && (
            <section>
              <SectionHeader id="g6-stat-sec-1" number={1} title="Játékok" color="pink" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Venn-diagram Kvíz"
                  subtitle="Halmazok és logikai adatok értelmezése"
                  type="Kvíz"
                  emoji="🎲"
                  onClick={() => handleActivitySelect('venn-interpretation-quiz', topicId)}
                  icon={<Gamepad2 className="w-6 h-6" />}
                  color="pink"
                />
                <ActivityPlaceholder
                  title="Venn-diagram Játék"
                  subtitle="Interaktív halmazrendező"
                  type="Játék"
                  emoji="⭕"
                  onClick={() => handleActivitySelect('venn-diagram-game', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 2: Grafikonok, diagramok, összefüggések */}
          {(showAll || activeGrade5SubSectionId === 'g6-stat-sec-2') && (
            <section>
              <SectionHeader id="g6-stat-sec-2" number={2} title="Grafikonok, diagramok, összefüggések" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Diagramok és Grafikonok"
                  subtitle="Oszlop-, sáv- és vonaldiagramok elemzése"
                  type="Hamarosan"
                  emoji="📊"
                  disabled={true}
                  icon={<BarChart3 className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 3: Kördiagram */}
          {(showAll || activeGrade5SubSectionId === 'g6-stat-sec-3') && (
            <section>
              <SectionHeader id="g6-stat-sec-3" number={3} title="Kördiagram" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Kördiagram Értelmező"
                  subtitle="Középponti szögek és százalékos részesedés"
                  type="Hamarosan"
                  emoji="🥧"
                  disabled={true}
                  icon={<PieChart className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 4: Adatok ábrázolása, átlag */}
          {(showAll || activeGrade5SubSectionId === 'g6-stat-sec-4') && (
            <section>
              <SectionHeader id="g6-stat-sec-4" number={4} title="Adatok ábrázolása, átlag" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Statisztikai Mutatók"
                  subtitle="Átlag, módusz, medián és terjedelem"
                  type="Hamarosan"
                  emoji="📈"
                  disabled={true}
                  icon={<TrendingUp className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 5: Összefoglalás */}
          {(showAll || activeGrade5SubSectionId === 'g6-stat-sec-5') && (
            <section>
              <SectionHeader id="g6-stat-sec-5" number={5} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglaló felkészítő"
                  subtitle="VI. Statisztika témakör átfogó ellenőrzése"
                  type="Hamarosan"
                  emoji="🏆"
                  disabled={true}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g7-rational-algebra') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Az egész számok tulajdonságainak áttekintése */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-rat-egesz-attekintes') && (
            <section>
              <SectionHeader id="g7-sec-rat-egesz-attekintes" number={1} title="Az egész számok tulajdonságainak áttekintése" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egész számok áttekintése"
                  subtitle="Előjelek, abszolútérték, ellentett"
                  type="Hamarosan"
                  emoji="➕"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 2: Törtek, tizedes törtek – minden, amit erről tudni kell */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-rat-tortek-tizedes') && (
            <section>
              <SectionHeader id="g7-sec-rat-tortek-tizedes" number={2} title="Törtek, tizedes törtek – minden, amit erről tudni kell" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Törtek és tizedes törtek"
                  subtitle="Bővítés, egyszerűsítés, átváltások"
                  type="Hamarosan"
                  emoji="🍕"
                  disabled={true}
                  icon={<Layers className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 3: Műveletek a racionális számok halmazán */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-rat-muveletek') && (
            <section>
              <SectionHeader id="g7-sec-rat-muveletek" number={3} title="Műveletek a racionális számok halmazán" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Műveletek racionális számokkal"
                  subtitle="Alapműveletek, reciprokok, előjelek"
                  type="Hamarosan"
                  emoji="🔢"
                  disabled={true}
                  icon={<Binary className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 4: Szöveges feladatok */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-rat-szoveges') && (
            <section>
              <SectionHeader id="g7-sec-rat-szoveges" number={4} title="Szöveges feladatok" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szöveges feladatok"
                  subtitle="Törtrész- és arányszámítás"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 5: Összetett műveletek, zárójelfelbontás */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-rat-osszetett-zarojel') && (
            <section>
              <SectionHeader id="g7-sec-rat-osszetett-zarojel" number={5} title="Összetett műveletek, zárójelfelbontás" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összetett műveletek"
                  subtitle="Műveleti sorrend, zárójelszabályok"
                  type="Hamarosan"
                  emoji="🧮"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 6: Számok és betűk használata */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-rat-szamok-betuk') && (
            <section>
              <SectionHeader id="g7-sec-rat-szamok-betuk" number={6} title="Számok és betűk használata" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számok és betűk használata"
                  subtitle="Változók, algebrai kifejezések"
                  type="Hamarosan"
                  emoji="🔤"
                  disabled={true}
                  icon={<Variable className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 7: Összevonás, helyettesítési érték */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-rat-osszevonas-ertek') && (
            <section>
              <SectionHeader id="g7-sec-rat-osszevonas-ertek" number={7} title="Összevonás, helyettesítési érték" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összevonás és behelyettesítés"
                  subtitle="Egynemű tagok, számérték"
                  type="Hamarosan"
                  emoji="🎯"
                  disabled={true}
                  icon={<Target className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 8: Zárójelfelbontás, kiemelés */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-rat-zarojel-kiemeles') && (
            <section>
              <SectionHeader id="g7-sec-rat-zarojel-kiemeles" number={8} title="Zárójelfelbontás, kiemelés" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Zárójelfelbontás, kiemelés"
                  subtitle="Beszorzás és közös tényező kiemelése"
                  type="Hamarosan"
                  emoji="⚡"
                  disabled={true}
                  icon={<Zap className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 9: Összefoglalás */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-rat-osszefoglalas') && (
            <section>
              <SectionHeader id="g7-sec-rat-osszefoglalas" number={9} title="Összefoglalás" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglalás"
                  subtitle="II. Racionális számok és kifejezések ismétlése"
                  type="Hamarosan"
                  emoji="🏆"
                  disabled={true}
                  icon={<Trophy className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g7-percent-equations' || topicId === 'percentages') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Az arányosságról még egyszer */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-pct-aranyossag') && (
            <section>
              <SectionHeader id="g7-sec-pct-aranyossag" number={1} title="Az arányosságról még egyszer" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Az arányosságról még egyszer"
                  subtitle="Egyenes és fordított arányosság, arányos osztás"
                  type="Hamarosan"
                  emoji="⚖️"
                  disabled={true}
                  icon={<TrendingUp className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 2: Mit tanultunk a százalékszámításról? */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-pct-mit-tanultunk') && (
            <section>
              <SectionHeader id="g7-sec-pct-mit-tanultunk" number={2} title="Mit tanultunk a százalékszámításról?" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Százalékszámítás alapjai"
                  subtitle="Százalék fogalma, alap, százalékláb, százalékérték"
                  type="Hamarosan"
                  emoji="📊"
                  disabled={true}
                  icon={<Percent className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}

          {/* Section 3: A 100% kiszámítása */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-pct-100-szazalek') && (
            <section>
              <SectionHeader id="g7-sec-pct-100-szazalek" number={3} title="A 100% kiszámítása" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="A 100% kiszámítása"
                  subtitle="Százalékalap meghatározása értékből és lábból"
                  type="Hamarosan"
                  emoji="💯"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 4: Hány százalék? */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-pct-hany-szazalek') && (
            <section>
              <SectionHeader id="g7-sec-pct-hany-szazalek" number={4} title="Hány százalék?" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Hány százalék?"
                  subtitle="Százalékláb kiszámítása tört és tizedes alakból"
                  type="Hamarosan"
                  emoji="❓"
                  disabled={true}
                  icon={<Percent className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 5: A százalékszámítás gyakorlása */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-pct-gyakorlas') && (
            <section>
              <SectionHeader id="g7-sec-pct-gyakorlas" number={5} title="A százalékszámítás gyakorlása" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Százalékszámítás gyakorlása"
                  subtitle="Százalékos növekedés és csökkenés egylépésben"
                  type="Hamarosan"
                  emoji="📈"
                  disabled={true}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 6: Összetett százalékszámítási feladatok */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-pct-osszetett') && (
            <section>
              <SectionHeader id="g7-sec-pct-osszetett" number={6} title="Összetett százalékszámítási feladatok" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összetett feladatok"
                  subtitle="Egymást követő árváltozások, kamat, keverékek"
                  type="Hamarosan"
                  emoji="🧩"
                  disabled={true}
                  icon={<Layers className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 7: Szöveges feladatok */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-pct-szoveges') && (
            <section>
              <SectionHeader id="g7-sec-pct-szoveges" number={7} title="Szöveges feladatok" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szöveges feladatok"
                  subtitle="Gyakorlati problémák modellezése és megoldása"
                  type="Hamarosan"
                  emoji="📝"
                  disabled={true}
                  icon={<BookOpen className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 8: Egyenletmegoldási módszerek: próbálgatás és lebontogatás */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-pct-egyenlet-modszerek') && (
            <section>
              <SectionHeader id="g7-sec-pct-egyenlet-modszerek" number={8} title="Egyenletmegoldási módszerek: próbálgatás és lebontogatás" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Próbálgatás és lebontogatás"
                  subtitle="Alaphalmaz, gyökök, szisztematikus próbálgatás, lebontogatás"
                  type="Hamarosan"
                  emoji="🔍"
                  disabled={true}
                  icon={<Search className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 9: A mérlegelv */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-pct-merlegelv') && (
            <section>
              <SectionHeader id="g7-sec-pct-merlegelv" number={9} title="A mérlegelv" color="sky" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="A mérlegelv"
                  subtitle="Mérleg modell, ekvivalens átalakítások és ellenőrzés"
                  type="Hamarosan"
                  emoji="⚖️"
                  disabled={true}
                  icon={<Scale className="w-6 h-6" />}
                  color="sky"
                />
              </div>
            </section>
          )}

          {/* Section 10: Egyenletek megoldása mérlegelvvel */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-pct-egyenletek-merlegelvvel') && (
            <section>
              <SectionHeader id="g7-sec-pct-egyenletek-merlegelvvel" number={10} title="Egyenletek megoldása mérlegelvvel" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egyenletek mérlegelvvel"
                  subtitle="Zárójelek, törtek eltüntetése, rendezési algoritmus"
                  type="Hamarosan"
                  emoji="🧮"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 11: Szöveges feladatok megoldása egyenlettel */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-pct-szoveges-egyenlettel') && (
            <section>
              <SectionHeader id="g7-sec-pct-szoveges-egyenlettel" number={11} title="Szöveges feladatok megoldása egyenlettel" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szöveges feladatok egyenlettel"
                  subtitle="Az 5 lépéses modell, életkoros és számelméleti feladatok"
                  type="Hamarosan"
                  emoji="💡"
                  disabled={true}
                  icon={<Pencil className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 12: Összefoglalás */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-pct-osszefoglalas') && (
            <section>
              <SectionHeader id="g7-sec-pct-osszefoglalas" number={12} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglalás"
                  subtitle="V. Százalékszámítás, egyenletek átfogó rendszerezése"
                  type="Hamarosan"
                  emoji="🏆"
                  disabled={true}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g7-geometry') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Egybevágó háromszögek, szerkesztések */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-geom-egybevagosag') && (
            <section>
              <SectionHeader id="g7-sec-geom-egybevagosag" number={1} title="Egybevágó háromszögek, szerkesztések" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Alapszerkesztések"
                  subtitle="Körző és vonalzó szerkesztő eszköz"
                  type="Gyakorlás"
                  emoji="📐"
                  onClick={() => handleActivitySelect('construction', 'g7-geometry')}
                  icon={<Pencil className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Háromszögek fajtái"
                  subtitle="Egybevágóság 4 alapesete és csoportosítás"
                  type="Gyakorlás"
                  emoji="🔺"
                  onClick={() => handleActivitySelect('triangle-classification', 'g7-geometry')}
                  icon={<Triangle className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 2: Összefüggések a háromszög oldalai és szögei között */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-geom-oldalak-szogek') && (
            <section>
              <SectionHeader id="g7-sec-geom-oldalak-szogek" number={2} title="Összefüggések a háromszög oldalai és szögei között" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Háromszögek szögei kvíz"
                  subtitle="Belső és külső szögek kiszámítása"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => handleActivitySelect('triangle-angles-quiz', 'g7-geometry')}
                  icon={<Target className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Háromszög-egyenlőtlenség"
                  subtitle="Oldalak és szemközti szögek kapcsolata"
                  type="Gyakorlás"
                  emoji="📏"
                  onClick={() => handleActivitySelect('triangle-classification', 'g7-geometry')}
                  icon={<Ruler className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Szögek párosítása"
                  subtitle="Hegyesszög, derékszög, tompaszög stb."
                  type="Gyakorlás"
                  emoji="🧭"
                  onClick={() => handleActivitySelect('angle-matching', 'g7-geometry')}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 3: Sokszögek szögei és átlói */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-geom-sokszogek-szogei-atloi') && (
            <section>
              <SectionHeader id="g7-sec-geom-sokszogek-szogei-atloi" number={3} title="Sokszögek szögei és átlói" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Sokszögek osztályozása"
                  subtitle="Négyszögek és konvex sokszögek tulajdonságai"
                  type="Gyakorlás"
                  emoji="🛑"
                  onClick={() => handleActivitySelect('quadrilateral-classification', 'g7-geometry')}
                  icon={<Shapes className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Sokszögek szögei és átlói"
                  subtitle="Átlók száma és belső szögek összege"
                  type="Hamarosan"
                  emoji="⚡"
                  disabled={true}
                  icon={<Zap className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 4: A terület és a térfogat mértékegységei */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-geom-mertekegysegek') && (
            <section>
              <SectionHeader id="g7-sec-geom-mertekegysegek" number={4} title="A terület és a térfogat mértékegységei" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Területmértékegységek kvíz"
                  subtitle="mm², cm², dm², m², ár, ha átváltások"
                  type="Kvíz"
                  emoji="📏"
                  onClick={() => handleActivitySelect('area-conversion-quiz', 'g7-geometry')}
                  icon={<Ruler className="w-6 h-6" />}
                  color="cyan"
                />
                <ActivityPlaceholder
                  title="Térfogat és űrmértékek kvíz"
                  subtitle="m³, dm³, cm³, mm³, liter, hl átváltások"
                  type="Kvíz"
                  emoji="📦"
                  onClick={() => handleActivitySelect('volume-quiz', 'g7-geometry')}
                  icon={<Box className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 5: A paralelogramma területe */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-geom-paralelogramma-terulet') && (
            <section>
              <SectionHeader id="g7-sec-geom-paralelogramma-terulet" number={5} title="A paralelogramma területe" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Paralelogramma terület kvíz"
                  subtitle="T = a · ma interaktív ábrás számítások"
                  type="Kvíz"
                  emoji="🟩"
                  onClick={() => handleActivitySelect('parallelogram-area-quiz', 'g7-geometry')}
                  icon={<Square className="w-6 h-6" />}
                  color="emerald"
                />
                <ActivityPlaceholder
                  title="Paralelogrammák típusai"
                  subtitle="Téglalap, négyzet, rombusz tulajdonságai"
                  type="Gyakorlás"
                  emoji="🔷"
                  onClick={() => handleActivitySelect('quadrilateral-classification', 'g7-geometry')}
                  icon={<Shapes className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 6: A háromszög területe */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-geom-haromszog-terulet') && (
            <section>
              <SectionHeader id="g7-sec-geom-haromszog-terulet" number={6} title="A háromszög területe" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Háromszög területe gyakorlás"
                  subtitle="T = (a · ma) / 2 és derékszögű háromszög"
                  type="Gyakorlás"
                  emoji="🔺"
                  onClick={() => handleActivitySelect('area-calculation-quiz', 'g7-geometry')}
                  icon={<Triangle className="w-6 h-6" />}
                  color="teal"
                />
                <ActivityPlaceholder
                  title="Háromszögek csoportosítása"
                  subtitle="Oldalak és magasságok kapcsolata"
                  type="Gyakorlás"
                  emoji="📐"
                  onClick={() => handleActivitySelect('triangle-classification', 'g7-geometry')}
                  icon={<Shapes className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 7: A trapéz területe */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-geom-trapez-terulet') && (
            <section>
              <SectionHeader id="g7-sec-geom-trapez-terulet" number={7} title="A trapéz területe" color="green" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Trapézok felismerése"
                  subtitle="Alapok, szárak és középvonal tulajdonságai"
                  type="Gyakorlás"
                  emoji="⏢"
                  onClick={() => handleActivitySelect('quadrilateral-classification', 'g7-geometry')}
                  icon={<Shapes className="w-6 h-6" />}
                  color="green"
                />
                <ActivityPlaceholder
                  title="Trapéz területszámítás"
                  subtitle="T = ((a+c)/2) · m képlet feladatai"
                  type="Hamarosan"
                  emoji="📐"
                  disabled={true}
                  icon={<Target className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 8: A deltoid területe */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-geom-deltoid-terulet') && (
            <section>
              <SectionHeader id="g7-sec-geom-deltoid-terulet" number={8} title="A deltoid területe" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Deltoid tulajdonságai"
                  subtitle="Merőleges átlók és szimmetria"
                  type="Gyakorlás"
                  emoji="🪁"
                  onClick={() => handleActivitySelect('quadrilateral-classification', 'g7-geometry')}
                  icon={<Target className="w-6 h-6" />}
                  color="amber"
                />
                <ActivityPlaceholder
                  title="Deltoid területe"
                  subtitle="T = (e · f) / 2 képlet feladatai"
                  type="Hamarosan"
                  emoji="✨"
                  disabled={true}
                  icon={<Shapes className="w-6 h-6" />}
                  color="yellow"
                />
              </div>
            </section>
          )}

          {/* Section 9: A hasáb felszíne és térfogata */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-geom-hasab-felszin-terfogat') && (
            <section>
              <SectionHeader id="g7-sec-geom-hasab-felszin-terfogat" number={9} title="A hasáb felszíne és térfogata" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Felszín és térfogat eszköz"
                  subtitle="3D testek térfogata és felszíne"
                  type="Eszköz"
                  emoji="🏛️"
                  onClick={() => handleActivitySelect('volume-surface', 'g7-geometry')}
                  icon={<Box className="w-6 h-6" />}
                  color="orange"
                />
                <ActivityPlaceholder
                  title="Felszínszámítás kvíz"
                  subtitle="Téglatest, kocka és hasáb felszíne"
                  type="Kvíz"
                  emoji="📐"
                  onClick={() => handleActivitySelect('surface-area-quiz', 'g7-geometry')}
                  icon={<Layers className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 10: Testek térben és síkban */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-geom-testek-terben-sikban') && (
            <section>
              <SectionHeader id="g7-sec-geom-testek-terben-sikban" number={10} title="Testek térben és síkban" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Síkidom vagy Test?"
                  subtitle="2D és 3D alakzatok szétválogatása"
                  type="Gyakorlás"
                  emoji="🧊"
                  onClick={() => handleActivitySelect('shape-classification', 'g7-geometry')}
                  icon={<Box className="w-6 h-6" />}
                  color="rose"
                />
                <ActivityPlaceholder
                  title="Testhálók és nézetek"
                  subtitle="Kiterített hálók és Euler-tétel"
                  type="Hamarosan"
                  emoji="📦"
                  disabled={true}
                  icon={<Layers className="w-6 h-6" />}
                  color="pink"
                />
              </div>
            </section>
          )}

          {/* Section 11: Szabadulószoba */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-geom-szabaduloszoba') && (
            <section>
              <SectionHeader id="g7-sec-geom-szabaduloszoba" number={11} title="Szabadulószoba" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Geometriai Szabadulószoba"
                  subtitle="Interaktív kódfejtés és geometriai feladványok"
                  type="Kvíz"
                  emoji="🔐"
                  onClick={() => handleActivitySelect('quiz', 'g7-geometry')}
                  icon={<Sparkles className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 12: Összefoglalás */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-geom-osszefoglalas') && (
            <section>
              <SectionHeader id="g7-sec-geom-osszefoglalas" number={12} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Geometria Záróteszt"
                  subtitle="VI. Geometria átfogó összefoglaló kvíz"
                  type="Teszt"
                  emoji="🏆"
                  onClick={() => handleActivitySelect('quiz', 'g7-geometry')}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g7-stats') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Két halmaz közötti hozzárendelések */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-stats-halmazok-hozzarendeles') && (
            <section>
              <SectionHeader id="g7-sec-stats-halmazok-hozzarendeles" number={1} title="Két halmaz közötti hozzárendelések" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Hozzárendelés Kvíz"
                  subtitle="Halmazok összekötése nyilakkal, függvény fogalma"
                  type="Kvíz"
                  emoji="🔄"
                  onClick={() => handleActivitySelect('g7-mapping-quiz', 'g7-stats')}
                  icon={<ArrowRightLeft className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 2: A hozzárendelések megadási módjai */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-stats-megadasi-modok') && (
            <section>
              <SectionHeader id="g7-sec-stats-megadasi-modok" number={2} title="A hozzárendelések megadási módjai" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Megadási módok kvíz"
                  subtitle="Utasítás, képlet, értéktáblázat és számpárok"
                  type="Kvíz"
                  emoji="📋"
                  onClick={() => handleActivitySelect('g7-mapping-quiz', 'g7-stats')}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Függvény leolvasás"
                  subtitle="Táblázat kitöltése szabály alapján"
                  type="Gyakorlás"
                  emoji="🔢"
                  onClick={() => handleActivitySelect('g7-function-table-quiz', 'g7-stats')}
                  icon={<LineChart className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 3: Olvassunk a grafikonról! */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-stats-olvassunk-grafikonrol') && (
            <section>
              <SectionHeader id="g7-sec-stats-olvassunk-grafikonrol" number={3} title="Olvassunk a grafikonról!" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Függvény leolvasás"
                  subtitle="Táblázat kitöltése grafikonról, folyamatok elemzése"
                  type="Kvíz"
                  emoji="📈"
                  onClick={() => handleActivitySelect('g7-function-table-quiz', 'g7-stats')}
                  icon={<LineChart className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 4: Átlag, módusz, medián */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-stats-atlag-modusz-median') && (
            <section>
              <SectionHeader id="g7-sec-stats-atlag-modusz-median" number={4} title="Átlag, módusz, medián" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Átlag, módusz, medián"
                  subtitle="Számtani közép, leggyakoribb érték és terjedelem"
                  type="Hamarosan"
                  emoji="📊"
                  disabled={true}
                  icon={<BarChart3 className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 5: Gyakoriság, relatív gyakoriság */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-stats-gyakorisag-relativ') && (
            <section>
              <SectionHeader id="g7-sec-stats-gyakorisag-relativ" number={5} title="Gyakoriság, relatív gyakoriság" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Gyakoriság és Relatív gyakoriság"
                  subtitle="Gyakorisági táblázatok, tört és százalékos alak, kördiagram"
                  type="Hamarosan"
                  emoji="📑"
                  disabled={true}
                  icon={<PieChart className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 6: Valószínűség */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-stats-valoszinuseg') && (
            <section>
              <SectionHeader id="g7-sec-stats-valoszinuseg" number={6} title="Valószínűség" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Klasszikus valószínűség"
                  subtitle="P(A) = kedvező / összes eset, kocka- és érmedobás"
                  type="Hamarosan"
                  emoji="🎲"
                  disabled={true}
                  icon={<Dices className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 7: Tippelj, kísérletezz, ellenőrizz! */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-stats-tippelj-kiserletezz') && (
            <section>
              <SectionHeader id="g7-sec-stats-tippelj-kiserletezz" number={7} title="Tippelj, kísérletezz, ellenőrizz!" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Kísérletek és statisztika"
                  subtitle="A nagy számok törvénye, relatív gyakoriság vs. valószínűség"
                  type="Hamarosan"
                  emoji="🧪"
                  disabled={true}
                  icon={<FlaskConical className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 8: Összefoglalás */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-stats-osszefoglalas') && (
            <section>
              <SectionHeader id="g7-sec-stats-osszefoglalas" number={8} title="Összefoglalás" color="slate" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Hozzárendelések és statisztika teszt"
                  subtitle="VII. fejezet átfogó összefoglaló kvíz"
                  type="Teszt"
                  emoji="🏆"
                  onClick={() => handleActivitySelect('quiz', 'g7-stats')}
                  icon={<Trophy className="w-6 h-6" />}
                  color="slate"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g7-other') {
      return (
        <div className="py-2">
          <MaterialGallery
            grade={7}
            onView={handleMaterialSelect}
            initialMaterialId={new URLSearchParams(location.search).get('material')}
          />
        </div>
      );
    }

    if (topicId === 'g7-logic') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Számold össze! */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-szamold-ossze') && (
            <section>
              <SectionHeader id="g7-sec-szamold-ossze" number={1} title="Számold össze!" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számold össze!"
                  subtitle="Leszámlálás és elemi kombinatorika"
                  type="Hamarosan"
                  emoji="🔢"
                  disabled={true}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 2: Rendezd sorba! */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-rendezd-sorba') && (
            <section>
              <SectionHeader id="g7-sec-rendezd-sorba" number={2} title="Rendezd sorba!" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Rendezd sorba!"
                  subtitle="Sorrendek, permutációk alapjai"
                  type="Hamarosan"
                  emoji="🔀"
                  disabled={true}
                  icon={<Layers className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 3: Hány eset van? */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-hany-eset-van') && (
            <section>
              <SectionHeader id="g7-sec-hany-eset-van" number={3} title="Hány eset van?" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Hány eset van?"
                  subtitle="Esetszétválasztás, szorzási szabály"
                  type="Hamarosan"
                  emoji="🎲"
                  disabled={true}
                  icon={<Dices className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 4: Gráfok */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-grafok') && (
            <section>
              <SectionHeader id="g7-sec-grafok" number={4} title="Gráfok" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Gráfok"
                  subtitle="Csúcsok, élek, fokszámok összefüggései"
                  type="Hamarosan"
                  emoji="🕸️"
                  disabled={true}
                  icon={<Network className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 5: Igazold! Cáfold! */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-igazold-cafold') && (
            <section>
              <SectionHeader id="g7-sec-igazold-cafold" number={5} title="Igazold! Cáfold!" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Igazold! Cáfold!"
                  subtitle="Kijelentések, bizonyítások és ellenpéldák"
                  type="Hamarosan"
                  emoji="💡"
                  disabled={true}
                  icon={<Lightbulb className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 6: Matematikai játékok */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-matematikai-jatekok') && (
            <section>
              <SectionHeader id="g7-sec-matematikai-jatekok" number={6} title="Matematikai játékok" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Matematikai játékok"
                  subtitle="Nyerő stratégiák, szimmetria, logikai fejtörők"
                  type="Hamarosan"
                  emoji="🎮"
                  disabled={true}
                  icon={<Gamepad2 className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 7: Összefoglalás */}
          {(showAll || activeGrade5SubSectionId === 'g7-sec-osszefoglalas') && (
            <section>
              <SectionHeader id="g7-sec-osszefoglalas" number={7} title="Összefoglalás" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefoglalás"
                  subtitle="I. Gondolkodjunk! fejezet rendszerezése és tesztje"
                  type="Hamarosan"
                  emoji="🏆"
                  disabled={true}
                  icon={<Trophy className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g5-measurements') {
      return (
        <div className="flex flex-col gap-10 py-6">
          <section>
            <SectionHeader number={1} title="A hosszúság mérése" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Mértékegységek"
                subtitle="Hosszúság átváltás eszköze"
                type="Eszköz"
                onClick={() => handleActivitySelect('unit-converter', topicId)}
                icon={<Scale className="w-6 h-6" />}
                color="cyan"
              />
            </div>
          </section>

          <section>
            <SectionHeader number={2} title="Téglalap, négyzet kerülete" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kerület Kvíz"
                subtitle="Négyzet és téglalap"
                type="Kezdés"
                onClick={() => handleActivitySelect('perimeter-quiz', topicId)}
                icon={<Calculator className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>

          <section>
            <SectionHeader number={3} title="A terület mérése" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Terület átváltás"
                subtitle="Mértékegység gyakorlás"
                type="Kezdés"
                onClick={() => handleActivitySelect('area-conversion-quiz', topicId)}
                icon={<ArrowRightLeft className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>

          <section>
            <SectionHeader number={4} title="Téglalap, négyzet területe" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Terület Kvíz"
                subtitle="Téglalap és négyzet"
                type="Kezdés"
                onClick={() => handleActivitySelect('area-calculation-quiz', topicId)}
                icon={<LayoutGrid className="w-6 h-6" />}
                color="emerald"
              />
            </div>
          </section>

          <section>
            <SectionHeader number={5} title="Térfogat és felszín" color="pink" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Felszín Kvíz"
                subtitle="Kocka és téglatest"
                type="Kezdés"
                onClick={() => handleActivitySelect('surface-area-quiz', topicId)}
                icon={<Box className="w-6 h-6" />}
                color="pink"
              />
              <ActivityPlaceholder
                title="Térfogat Kvíz"
                subtitle="Kocka és téglatest"
                type="Kezdés"
                onClick={() => handleActivitySelect('volume-quiz', topicId)}
                icon={<Box className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        </div>
      );
    }

    if (topicId === 'g8-numbers-letters') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Logika feladatok */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-logika') && (
            <section>
              <SectionHeader id="g8-sec-logika" number={1} title="Logika feladatok" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Logika Kvíz"
                  subtitle="Állítások, tagadás, skatulya-elv"
                  type="Kvíz"
                  emoji="🧠"
                  onClick={() => handleActivitySelect('g8-logic', topicId)}
                  icon={<Brain className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 2: Mit tudunk a halmazokról? */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-halmazok-alap') && (
            <section>
              <SectionHeader id="g8-sec-halmazok-alap" number={2} title="Mit tudunk a halmazokról?" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Halmaz Alapfogalmak"
                  subtitle="Relációk, részhalmazok száma"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => handleActivitySelect('g8-set-basics', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 3: Műveletek halmazokkal */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-halmaz-muveletek') && (
            <section>
              <SectionHeader id="g8-sec-halmaz-muveletek" number={3} title="Műveletek halmazokkal" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Halmazműveletek"
                  subtitle="Metszet, unió, különbség, szita"
                  type="Kvíz"
                  emoji="📑"
                  onClick={() => handleActivitySelect('g8-set-operations', topicId)}
                  icon={<Layers className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 4: A racionális számok halmaza */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-racionalis-halmaz') && (
            <section>
              <SectionHeader id="g8-sec-racionalis-halmaz" number={4} title="A racionális számok halmaza" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Racionális Számok (ℚ)"
                  subtitle="Törtek, tizedestörtek, abszolútérték"
                  type="Kvíz"
                  emoji="🔢"
                  onClick={() => handleActivitySelect('g8-rational-set', topicId)}
                  icon={<Binary className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 5: Mit tudunk a racionális számokról? */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-racionalis-muvelet') && (
            <section>
              <SectionHeader id="g8-sec-racionalis-muvelet" number={5} title="Mit tudunk a racionális számokról?" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Műveletek Racionálisan"
                  subtitle="Előjelek, törtek, műveleti sorrend"
                  type="Kvíz"
                  emoji="🧮"
                  onClick={() => handleActivitySelect('g8-rational-operations', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 6: Hatványozás */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-hatvanyozas') && (
            <section>
              <SectionHeader id="g8-sec-hatvanyozas" number={6} title="Hatványozás" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Hatványozás & Normálalak"
                  subtitle="Azonosságok, negatív kitevő"
                  type="Kvíz"
                  emoji="⚡"
                  onClick={() => handleActivitySelect('g8-powers', topicId)}
                  icon={<Zap className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 7: A négyzetgyök fogalma */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-negyzetgyok-fogalom') && (
            <section>
              <SectionHeader id="g8-sec-negyzetgyok-fogalom" number={7} title="A négyzetgyök fogalma" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Négyzetgyök Fogalma"
                  subtitle="Nemnegativitás, értelmezési tartomány"
                  type="Kvíz"
                  emoji="📐"
                  onClick={() => handleActivitySelect('g8-sqrt-concept', topicId)}
                  icon={<Square className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}

          {/* Section 8: Számok négyzetgyöke */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-szamok-negyzetgyoke') && (
            <section>
              <SectionHeader id="g8-sec-szamok-negyzetgyoke" number={8} title="Számok négyzetgyöke" color="pink" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számok Négyzetgyöke"
                  subtitle="Azonosságok, kiemelés, becslés"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => handleActivitySelect('g8-square-roots', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="pink"
                />
              </div>
            </section>
          )}

          {/* Section 9: Betűs kifejezések (ismétlés) */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-betus-ismetles') && (
            <section>
              <SectionHeader id="g8-sec-betus-ismetles" number={9} title="Betűs kifejezések (ismétlés)" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Betűs Kifejezések"
                  subtitle="Egynemű tagok, helyettesítési érték"
                  type="Kvíz"
                  emoji="🔤"
                  onClick={() => handleActivitySelect('g8-algebra-intro', topicId)}
                  icon={<Variable className="w-6 h-6" />}
                  color="blue"
                />
                <ActivityPlaceholder
                  title="Algebra Gyakorló"
                  subtitle="Egyenletek, kifejezések"
                  type="Gyakorlás"
                  onClick={() => handleActivitySelect('g8-algebra', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 10: Betűs kifejezések szorzása és a kiemelés */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-betus-szorzas') && (
            <section>
              <SectionHeader id="g8-sec-betus-szorzas" number={10} title="Betűs kifejezések szorzása és a kiemelés" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szorzás & Kiemelés"
                  subtitle="Zárójelbontás, közös tényező kiemelése"
                  type="Kvíz"
                  emoji="✂️"
                  onClick={() => handleActivitySelect('g8-factoring', topicId)}
                  icon={<Scissors className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 11: Többtagú kifejezések szorzata */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-tobbtagu-szorzat') && (
            <section>
              <SectionHeader id="g8-sec-tobbtagu-szorzat" number={11} title="Többtagú kifejezések szorzata" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Nevezetes Azonosságok"
                  subtitle="(a+b)², (a-b)², a²-b² kifejtése"
                  type="Kvíz"
                  emoji="📦"
                  onClick={() => handleActivitySelect('g8-polynomial-mult', topicId)}
                  icon={<Boxes className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 12: Összefoglalás */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-osszefoglalas') && (
            <section>
              <SectionHeader id="g8-sec-osszefoglalas" number={12} title="Összefoglalás" color="yellow" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="I. Fejezet Témazáró Kvíz"
                  subtitle="Számok és betűk átfogó teszt"
                  type="Témazáró"
                  emoji="🏆"
                  onClick={() => handleActivitySelect('g8-chapter1-summary', topicId)}
                  icon={<Award className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g8-geometry') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Egybevágósági transzformációk (ismétlés) */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-geom-egybevagosag') && (
            <section>
              <SectionHeader id="g8-sec-geom-egybevagosag" number={1} title="Egybevágósági transzformációk (ismétlés)" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egybevágósági Kvíz"
                  subtitle="Tükrözések, eltolás, forgatás"
                  type="Kvíz"
                  emoji="🔄"
                  onClick={() => handleActivitySelect('g8-geom-congruence', topicId)}
                  icon={<RefreshCw className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 2: Transzformációk */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-geom-transzformaciok') && (
            <section>
              <SectionHeader id="g8-sec-geom-transzformaciok" number={2} title="Transzformációk" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Transzformációk"
                  subtitle="Invariánsok, fixpontok, leképezések"
                  type="Kvíz"
                  emoji="🔀"
                  onClick={() => handleActivitySelect('g8-geom-transforms', topicId)}
                  icon={<GitCompare className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 3: Használjunk szerkesztőprogramot! */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-geom-szerkesztoprogram') && (
            <section>
              <SectionHeader id="g8-sec-geom-szerkesztoprogram" number={3} title="Használjunk szerkesztőprogramot!" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szerkesztőprogram Kvíz"
                  subtitle="Dinamikus geometria, mértani helyek"
                  type="Kvíz"
                  emoji="💻"
                  onClick={() => handleActivitySelect('g8-geom-software', topicId)}
                  icon={<MonitorPlay className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 4: Hasonlóság */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-geom-hasonlosag') && (
            <section>
              <SectionHeader id="g8-sec-geom-hasonlosag" number={4} title="Hasonlóság" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Hasonlóság Kvíz"
                  subtitle="Hasonlósági arány, alapesetek, területek aránya"
                  type="Kvíz"
                  emoji="📐"
                  onClick={() => handleActivitySelect('g8-geom-similarity', topicId)}
                  icon={<Maximize2 className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 5: A középpontos hasonlóság */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-geom-kozeppontos') && (
            <section>
              <SectionHeader id="g8-sec-geom-kozeppontos" number={5} title="A középpontos hasonlóság (Kiegészítő tananyag)" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Középpontos Hasonlóság"
                  subtitle="Centrum, λ arányszám, párhuzamos szelők"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => handleActivitySelect('g8-geom-central-similarity', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 6: Szerkesztések */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-geom-szerkesztesek') && (
            <section>
              <SectionHeader id="g8-sec-geom-szerkesztesek" number={6} title="Szerkesztések (Kiegészítő tananyag)" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Geometriai Szerkesztések"
                  subtitle="Szakaszosztás, negyedik arányos"
                  type="Kvíz"
                  emoji="🧭"
                  onClick={() => handleActivitySelect('g8-geom-constructions', topicId)}
                  icon={<Compass className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 7: Összefoglalás */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-geom-osszefoglalas') && (
            <section>
              <SectionHeader id="g8-sec-geom-osszefoglalas" number={7} title="Összefoglalás" color="yellow" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="II. Fejezet Témazáró Kvíz"
                  subtitle="Geometria átfogó teszt"
                  type="Témazáró"
                  emoji="🏆"
                  onClick={() => handleActivitySelect('g8-geom-summary', topicId)}
                  icon={<Award className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g8-equations') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Egyenletek */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-eq-alap') && (
            <section>
              <SectionHeader id="g8-sec-eq-alap" number={1} title="Egyenletek" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egyenletek Kvíz"
                  subtitle="Zárójelbontás, törtes egyenletek, kikötések"
                  type="Kvíz"
                  emoji="⚖️"
                  onClick={() => handleActivitySelect('g8-eq-basic', topicId)}
                  icon={<Scale className="w-6 h-6" />}
                  color="purple"
                />
                <ActivityPlaceholder
                  title="Mérlegelv Gyakorló"
                  subtitle="Vizuális egyenletmegoldás két karral"
                  type="Gyakorló"
                  emoji="⚖️"
                  onClick={() => handleActivitySelect('g8-equation-balance', topicId)}
                  icon={<Scale className="w-6 h-6" />}
                  color="indigo"
                />
                <ActivityPlaceholder
                  title="Egyenletmegoldó eszköz"
                  subtitle="Lépésről lépésre levezetés"
                  type="Eszköz"
                  emoji="🧮"
                  onClick={() => handleActivitySelect('equation-solver', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 2: Szöveges feladatok számokról, életkorokról */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-eq-szamok-kor') && (
            <section>
              <SectionHeader id="g8-sec-eq-szamok-kor" number={2} title="Szöveges feladatok számokról, életkorokról" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számok és Életkorok"
                  subtitle="Kétjegyű számok és életkori modellek"
                  type="Kvíz"
                  emoji="👥"
                  onClick={() => handleActivitySelect('g8-eq-numbers-ages', topicId)}
                  icon={<Users className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}

          {/* Section 3: Szöveges feladatok összekeverésről */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-eq-keveres') && (
            <section>
              <SectionHeader id="g8-sec-eq-keveres" number={3} title="Szöveges feladatok összekeverésről" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Keverési Feladatok"
                  subtitle="Oldatok, tömegszázalék, ötvözetek"
                  type="Kvíz"
                  emoji="🧪"
                  onClick={() => handleActivitySelect('g8-eq-mixing', topicId)}
                  icon={<FlaskConical className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 4: Szöveges feladatok mozgásról, munkáról */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-eq-mozgas-munka') && (
            <section>
              <SectionHeader id="g8-sec-eq-mozgas-munka" number={4} title="Szöveges feladatok mozgásról, munkáról" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Mozgás és Munka"
                  subtitle="s = v · t, találkozás, utolérés, munka"
                  type="Kvíz"
                  emoji="⏱️"
                  onClick={() => handleActivitySelect('g8-eq-motion-work', topicId)}
                  icon={<Timer className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 5: Szöveges geometriai feladatok */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-eq-geometria') && (
            <section>
              <SectionHeader id="g8-sec-eq-geometria" number={5} title="Szöveges geometriai feladatok" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Geometriai Egyenletek"
                  subtitle="Kerület, terület és szögek egyenletekkel"
                  type="Kvíz"
                  emoji="📐"
                  onClick={() => handleActivitySelect('g8-eq-geometry', topicId)}
                  icon={<Shapes className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 6: Vegyes feladatok */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-eq-vegyes') && (
            <section>
              <SectionHeader id="g8-sec-eq-vegyes" number={6} title="Vegyes feladatok" color="violet" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Vegyes Szöveges Feladatok"
                  subtitle="Összetett és felvételi típusú feladatok"
                  type="Kvíz"
                  emoji="🧠"
                  onClick={() => handleActivitySelect('g8-eq-mixed', topicId)}
                  icon={<Brain className="w-6 h-6" />}
                  color="violet"
                />
              </div>
            </section>
          )}

          {/* Section 7: Pénzügyi feladatok */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-eq-penzugy') && (
            <section>
              <SectionHeader id="g8-sec-eq-penzugy" number={7} title="Pénzügyi feladatok" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Pénzügyi Számítások"
                  subtitle="Árváltozások, kamat, megtakarítás"
                  type="Kvíz"
                  emoji="💰"
                  onClick={() => handleActivitySelect('g8-eq-financial', topicId)}
                  icon={<Coins className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 8: Összefoglalás */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-eq-osszefoglalas') && (
            <section>
              <SectionHeader id="g8-sec-eq-osszefoglalas" number={8} title="Összefoglalás" color="yellow" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="III. Fejezet Témazáró Kvíz"
                  subtitle="Egyenletek átfogó teszt"
                  type="Témazáró"
                  emoji="🏆"
                  onClick={() => handleActivitySelect('g8-eq-summary', topicId)}
                  icon={<Award className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g8-admissions-prep') {
      return (
        <div className="flex flex-col gap-10 py-6">
          <section>
            <SectionHeader id="g8-prep-word" number={1} title="Felvételi felkészítő & Szöveges feladatok" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Szöveges Feladatok Modul"
                subtitle="Komplex felvételi típusfeladatok"
                type="Modul"
                onClick={() => handleActivitySelect('g8-word-problems-module', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="rose"
              />
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="Szöveges és logikai feladványok"
                type="Kvíz"
                onClick={() => handleActivitySelect('g8-word-problems-quiz', topicId)}
                icon={<CheckCircle2 className="w-6 h-6" />}
                color="emerald"
              />
            </div>
          </section>
        </div>
      );
    }

    if (topicId === 'g8-pythagoras') {
      const showAll = !activeGrade5SubSectionId;
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1: Szerkesztések, mérések */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-pyth-szerkesztes') && (
            <section>
              <SectionHeader id="g8-sec-pyth-szerkesztes" number={1} title="Szerkesztések, mérések" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Szerkesztések & Mérések"
                  subtitle="Thálész-tétel, területek mérése"
                  type="Kvíz"
                  emoji="📏"
                  onClick={() => handleActivitySelect('g8-pyth-constructions', topicId)}
                  icon={<Ruler className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 2: A Pitagorasz-tétel */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-pyth-tetel') && (
            <section>
              <SectionHeader id="g8-sec-pyth-tetel" number={2} title="A Pitagorasz-tétel" color="orange" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Pitagorasz-tétel Kvíz"
                  subtitle="a² + b² = c², befogók és átfogó"
                  type="Kvíz"
                  emoji="📐"
                  onClick={() => handleActivitySelect('g8-pyth-theorem', topicId)}
                  icon={<Triangle className="w-6 h-6" />}
                  color="orange"
                />
              </div>
            </section>
          )}

          {/* Section 3: A Pitagorasz-tétel megfordítása */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-pyth-megforditas') && (
            <section>
              <SectionHeader id="g8-sec-pyth-megforditas" number={3} title="A Pitagorasz-tétel megfordítása" color="yellow" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Megfordítás & Számhármasok"
                  subtitle="Derékszögűség, 3-4-5, 5-12-13"
                  type="Kvíz"
                  emoji="🔄"
                  onClick={() => handleActivitySelect('g8-pyth-converse', topicId)}
                  icon={<GitCompare className="w-6 h-6" />}
                  color="yellow"
                />
              </div>
            </section>
          )}

          {/* Section 4: A Pitagorasz-tétel alkalmazása */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-pyth-alkalmazas') && (
            <section>
              <SectionHeader id="g8-sec-pyth-alkalmazas" number={4} title="A Pitagorasz-tétel alkalmazása" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Síkbeli Alkalmazások"
                  subtitle="Négyzet, téglalap, rombusz, trapéz"
                  type="Kvíz"
                  emoji="🔷"
                  onClick={() => handleActivitySelect('g8-pyth-applications', topicId)}
                  icon={<Shapes className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 5: Számológép & Projektmunka */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-pyth-szamologep') && (
            <section>
              <SectionHeader id="g8-sec-pyth-szamologep" number={5} title="Számológép és Projektmunka" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számológép & Projekt"
                  subtitle="Gyökcsiga (Theodórosz), hajtogatás"
                  type="Kvíz"
                  emoji="🧮"
                  onClick={() => handleActivitySelect('g8-pyth-calculator', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 6: Nevezetes derékszögű háromszögek */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-pyth-nevezetes') && (
            <section>
              <SectionHeader id="g8-sec-pyth-nevezetes" number={6} title="Nevezetes derékszögű háromszögek" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Nevezetes Háromszögek"
                  subtitle="30°-60°-90° és 45°-45°-90°"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => handleActivitySelect('g8-pyth-special-triangles', topicId)}
                  icon={<Target className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 7: Összefoglalás */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-pyth-osszefoglalas') && (
            <section>
              <SectionHeader id="g8-sec-pyth-osszefoglalas" number={7} title="Összefoglalás" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="V. Fejezet Témazáró Kvíz"
                  subtitle="Pitagorasz-tétel átfogó teszt"
                  type="Témazáró"
                  emoji="🏆"
                  onClick={() => handleActivitySelect('g8-pyth-summary', topicId)}
                  icon={<Award className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g8-functions-probability-sequences') {
      const showAll = !activeGrade5SubSectionId || activeGrade5SubSectionId === 'all';
      return (
        <div className="space-y-12">
          {/* Section 1: Egyenes arányosság */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-func-egyenes') && (
            <section>
              <SectionHeader id="g8-sec-func-egyenes" number={1} title="Egyenes arányosság" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Egyenes Arányosság Kvíz"
                  subtitle="y = k · x, arányossági tényező"
                  type="Kvíz"
                  emoji="📈"
                  onClick={() => handleActivitySelect('g8-func-direct', topicId)}
                  icon={<TrendingUp className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 2: Hozzárendelések és grafikonjaik */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-func-grafikonok') && (
            <section>
              <SectionHeader id="g8-sec-func-grafikonok" number={2} title="Hozzárendelések és grafikonjaik" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Függvények & Grafikonok"
                  subtitle="y = ax + b, meredekség, zérushely"
                  type="Kvíz"
                  emoji="📊"
                  onClick={() => handleActivitySelect('g8-func-graphs', topicId)}
                  icon={<LineChart className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 3: Fordított arányosság */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-func-forditott') && (
            <section>
              <SectionHeader id="g8-sec-func-forditott" number={3} title="Fordított arányosság" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Fordított Arányosság Kvíz"
                  subtitle="y = k / x, hiperbola, szorzat állandó"
                  type="Kvíz"
                  emoji="🔄"
                  onClick={() => handleActivitySelect('g8-func-inverse', topicId)}
                  icon={<ArrowRightLeft className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 4: Olvassunk a grafikonról! */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-func-olvasas') && (
            <section>
              <SectionHeader id="g8-sec-func-olvasas" number={4} title="Olvassunk a grafikonról!" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Grafikon Leolvasása"
                  subtitle="Menetdiagramok, szélsőértékek, szakaszok"
                  type="Kvíz"
                  emoji="👁️"
                  onClick={() => handleActivitySelect('g8-func-reading', topicId)}
                  icon={<Eye className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 5: Készítsünk grafikont! */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-func-rajzolas') && (
            <section>
              <SectionHeader id="g8-sec-func-rajzolas" number={5} title="Készítsünk grafikont!" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Grafikon Készítés Kvíz"
                  subtitle="Értéktáblázat, skálázás, pontok ábrázolása"
                  type="Gyakorló"
                  emoji="✏️"
                  onClick={() => handleActivitySelect('g8-func-plotting', topicId)}
                  icon={<Pencil className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 6: Gyakoriság, relatív gyakoriság, átlag */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-func-gyakorisag') && (
            <section>
              <SectionHeader id="g8-sec-func-gyakorisag" number={6} title="Gyakoriság, relatív gyakoriság, átlag" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Statisztika & Átlag Kvíz"
                  subtitle="Átlag, medián, módusz, diagramok"
                  type="Kvíz"
                  emoji="📊"
                  onClick={() => handleActivitySelect('g8-func-frequency', topicId)}
                  icon={<BarChart3 className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}

          {/* Section 7: Játék */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-func-jatek') && (
            <section>
              <SectionHeader id="g8-sec-func-jatek" number={7} title="Játék" color="purple" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Matematikai Játékok"
                  subtitle="Nyerő stratégiák, Nim, esélyek"
                  type="Játék"
                  emoji="🎲"
                  onClick={() => handleActivitySelect('g8-func-game', topicId)}
                  icon={<Gamepad2 className="w-6 h-6" />}
                  color="purple"
                />
              </div>
            </section>
          )}

          {/* Section 8: Valószínűség */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-func-valoszinuseg') && (
            <section>
              <SectionHeader id="g8-sec-func-valoszinuseg" number={8} title="Valószínűség" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Klasszikus Valószínűség"
                  subtitle="P = kedvező / összes, események"
                  type="Kvíz"
                  emoji="🎯"
                  onClick={() => handleActivitySelect('g8-func-prob-basics', topicId)}
                  icon={<Percent className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 9: Valószínűségszámítási feladatok */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-func-feladatok') && (
            <section>
              <SectionHeader id="g8-sec-func-feladatok" number={9} title="Valószínűségszámítási feladatok" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összetett Valószínűségi Feladatok"
                  subtitle="Két kocka, kártyák, golyóhúzások"
                  type="Gyakorló"
                  emoji="🧠"
                  onClick={() => handleActivitySelect('g8-func-prob-problems', topicId)}
                  icon={<Brain className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}

          {/* Section 10: Keressünk összefüggéseket! */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-func-mintazat') && (
            <section>
              <SectionHeader id="g8-sec-func-mintazat" number={10} title="Keressünk összefüggéseket!" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Összefüggések Keresése"
                  subtitle="Mintázatok, képletek felírása, n ↦ f(n)"
                  type="Kvíz"
                  emoji="🔍"
                  onClick={() => handleActivitySelect('g8-func-patterns', topicId)}
                  icon={<Search className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 11: Sorozatok */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-func-sorozatok') && (
            <section>
              <SectionHeader id="g8-sec-func-sorozatok" number={11} title="Sorozatok" color="cyan" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Számsorozatok Kvíz"
                  subtitle="Számtani, mértani, Fibonacci sorozat"
                  type="Kvíz"
                  emoji="🔢"
                  onClick={() => handleActivitySelect('g8-func-sequences', topicId)}
                  icon={<Layers className="w-6 h-6" />}
                  color="cyan"
                />
              </div>
            </section>
          )}

          {/* Section 12: Összefoglalás */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-func-osszefoglalas') && (
            <section>
              <SectionHeader id="g8-sec-func-osszefoglalas" number={12} title="Összefoglalás" color="emerald" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="VI. Fejezet Témazáró Kvíz"
                  subtitle="Hozzárendelések, statisztika, sorozatok teszt"
                  type="Témazáró"
                  emoji="🏆"
                  onClick={() => handleActivitySelect('g8-func-summary', topicId)}
                  icon={<Award className="w-6 h-6" />}
                  color="emerald"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    if (topicId === 'g8-solids') {
      const showAll = !activeGrade5SubSectionId || activeGrade5SubSectionId === 'all';
      return (
        <div className="space-y-12">
          {/* Section 1: Mit tanultunk eddig? (ismétlés) */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-solids-ismetles') && (
            <section>
              <SectionHeader id="g8-sec-solids-ismetles" number={1} title="Mit tanultunk eddig? (ismétlés)" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Testek Ismétlő Kvíz"
                  subtitle="Kocka, téglatest, hasáb, henger, mértékegységek"
                  type="Kvíz"
                  emoji="📦"
                  onClick={() => handleActivitySelect('g8-solids-review', topicId)}
                  icon={<Box className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}

          {/* Section 2: Gúlák */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-solids-gulak') && (
            <section>
              <SectionHeader id="g8-sec-solids-gulak" number={2} title="Gúlák" color="amber" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Gúlák Tulajdonságai"
                  subtitle="Alaplap, palást, oldalélek, háló, Euler-tétel"
                  type="Kvíz"
                  emoji="🔺"
                  onClick={() => handleActivitySelect('g8-solids-pyramids-intro', topicId)}
                  icon={<Triangle className="w-6 h-6" />}
                  color="amber"
                />
              </div>
            </section>
          )}

          {/* Section 3: A gúla felszíne és térfogata */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-solids-gula-szamitas') && (
            <section>
              <SectionHeader id="g8-sec-solids-gula-szamitas" number={3} title="A gúla felszíne és térfogata (Kiegészítő tananyag)" color="rose" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="Gúla Felszín és Térfogat"
                  subtitle="A = Ta + Tp, V = (Ta · m) / 3, Pitagorasz-tétel"
                  type="Gyakorló"
                  emoji="📐"
                  onClick={() => handleActivitySelect('g8-solids-pyramids-calc', topicId)}
                  icon={<Calculator className="w-6 h-6" />}
                  color="rose"
                />
              </div>
            </section>
          )}

          {/* Section 4: A gömb */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-solids-gomb') && (
            <section>
              <SectionHeader id="g8-sec-solids-gomb" number={4} title="A gömb" color="blue" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="A Gömb Geometriája"
                  subtitle="A = 4πr², V = (4/3)πr³, főkör, félgömb"
                  type="Kvíz"
                  emoji="⚪"
                  onClick={() => handleActivitySelect('g8-solids-sphere', topicId)}
                  icon={<Circle className="w-6 h-6" />}
                  color="blue"
                />
              </div>
            </section>
          )}

          {/* Section 5: A Föld */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-solids-fold') && (
            <section>
              <SectionHeader id="g8-sec-solids-fold" number={5} title="A Föld" color="teal" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="A Föld Mint Gömb"
                  subtitle="R ≈ 6370 km, Egyenlítő, fokhálózat, felszín"
                  type="Kvíz"
                  emoji="🌍"
                  onClick={() => handleActivitySelect('g8-solids-earth', topicId)}
                  icon={<Globe className="w-6 h-6" />}
                  color="teal"
                />
              </div>
            </section>
          )}

          {/* Section 6: Összefoglalás */}
          {(showAll || activeGrade5SubSectionId === 'g8-sec-solids-osszefoglalas') && (
            <section>
              <SectionHeader id="g8-sec-solids-osszefoglalas" number={6} title="Összefoglalás" color="indigo" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                <ActivityPlaceholder
                  title="VII. Fejezet Témazáró Kvíz"
                  subtitle="Hasábok, gúlák, gömbök átfogó teszt"
                  type="Témazáró"
                  emoji="🏆"
                  onClick={() => handleActivitySelect('g8-solids-summary', topicId)}
                  icon={<Award className="w-6 h-6" />}
                  color="indigo"
                />
              </div>
            </section>
          )}
        </div>
      );
    }

    // Default fallback for topics that don't have custom interactive content yet
    if (topicId.startsWith('g1-') || topicId.startsWith('g2-') || topicId.startsWith('g3-') || topicId.startsWith('g5-') || topicId.startsWith('g8-') || topicId.startsWith('g9-') || selectedGrade === 1 || selectedGrade === 2 || selectedGrade === 3 || selectedGrade === 6 || selectedGrade === 7 || selectedGrade === 8 || (typeof selectedGrade === 'string' && selectedGrade.startsWith('high-'))) {
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
    }

    return (
      <div className="text-center py-6 text-slate-400 text-sm italic">
        Ehhez a témakörhöz hamarosan érkeznek az interaktív feladatok!
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
                      className="bg-white/10 text-white hover:bg-white/20 font-black px-1.5 sm:px-3 border border-white/20 shadow-md backdrop-blur-md transition-all hover:scale-105 active:scale-95 flex items-center gap-1 sm:gap-2 h-8 sm:h-10 rounded-xl"
                    >
                      <img src="/logo_header.png" alt="DiákZóna" className="h-7 sm:h-12 object-contain" />
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
            const getGradeTopicsList = () => {
              if (selectedGrade === 5) return grade5Topics;

              let filtered: any[] = [];
              if (typeof selectedGrade === 'number') {
                filtered = mathTopics.filter(t => t.grades.includes(selectedGrade as number) && t.id !== 'materials');
              } else if (selectedGrade && selectedGrade.startsWith('high-')) {
                const specific = mathTopics.filter(t => t.grades.includes(selectedGrade as any) && t.id !== 'materials');
                filtered = specific.length > 0 ? specific : mathTopics.filter(t => ['algebra', 'geometry', 'percentages', 'word-problems'].includes(t.id));
              }
              
              const list: any[] = [];
              const materialsTopic = mathTopics.find(t => t.id === 'materials');
              if (materialsTopic) {
                list.push({
                  id: 'materials',
                  title: 'Tananyagok és Könyvek',
                  icon: '📚',
                  color: 'from-indigo-500 to-purple-600',
                  subsections: []
                });
              }

              filtered.forEach(t => {
                let subsections: { id: string, label: string }[] = [];
                // Add subsections for Grade 4
                if (t.id === 'g4-count-10k') {
                  subsections = [
                    { id: 'g4-count-sec-1', label: '1. Számok 0-tól 1000-ig' },
                    { id: 'g4-count-sec-2', label: '2. Összeadás és kivonás 1000-ig' },
                    { id: 'g4-count-sec-3', label: '3. Szorzás és osztás 1000-ig' },
                    { id: 'g4-count-sec-4', label: '4. A műveletek sorrendje' },
                    { id: 'g4-count-sec-5', label: '5. Nyitott mondatok' },
                    { id: 'g4-count-sec-6', label: '6. Szöveges feladatok 1000-es számkörben' },
                    { id: 'g4-count-sec-7', label: '7. A római számok' },
                    { id: 'g4-count-sec-8', label: '8. Játékok a logikai lapokkal' },
                    { id: 'g4-count-sec-9', label: '9. Csoportosítások és számok 10 000-ig' },
                    { id: 'g4-count-sec-10', label: '10. Számszomszédok, kerekítés 10 000-ig' },
                    { id: 'g4-count-sec-11', label: '11. Összeadás és kivonás 10 000-ig' },
                    { id: 'g4-count-sec-12', label: '12. Szorzás és osztás 10 000-ig' },
                    { id: 'g4-count-sec-13', label: '13. Megálló és Kitekintő (Összefoglalás)' }
                  ];
                } else if (t.id === 'g4-measurements') {
                  subsections = [
                    { id: 'g4-meas-sec-1', label: '1. A hosszúság mérése' },
                    { id: 'g4-meas-sec-2', label: '2. A kerület mérése' },
                    { id: 'g4-meas-sec-3', label: '3. A terület mérése' },
                    { id: 'g4-meas-sec-4', label: '4. A tömeg mérése' },
                    { id: 'g4-meas-sec-5', label: '5. Az űrtartalom mérése' },
                    { id: 'g4-meas-sec-6', label: '6. Az idő mérése' },
                    { id: 'g4-meas-sec-7', label: '7. Megálló' },
                    { id: 'g4-meas-sec-8', label: '8. Kitekintő' }
                  ];
                } else if (t.id === 'g4-written-ops') {
                  subsections = [
                    { id: 'g4-wops-sec-1', label: '1. Írásbeli összeadás és kivonás' },
                    { id: 'g4-wops-sec-2', label: '2. Írásbeli szorzás egyjegyű számmal' },
                    { id: 'g4-wops-sec-3', label: '3. Írásbeli osztás egyjegyű osztóval' },
                    { id: 'g4-wops-sec-4', label: '4. A számok tulajdonságai' },
                    { id: 'g4-wops-sec-5', label: '5. Összefüggések, következtetések' },
                    { id: 'g4-wops-sec-6', label: '6. A műveletek közötti kapcsolatok' },
                    { id: 'g4-wops-sec-7', label: '7. A műveletek sorrendje' }
                  ];
                } else if (t.id === 'g4-negatives') {
                  subsections = [
                    { id: 'g4-neg-sec-1', label: '1. A negatív számok a mindennapokban' },
                    { id: 'g4-neg-sec-2', label: '2. Számegyenes és ellentettek' },
                    { id: 'g4-neg-sec-3', label: '3. Összehasonlítás és változások' }
                  ];
                } else if (t.id === 'g4-shapes-solids') {
                  subsections = [
                    { id: 'g4-geom-sec-1', label: '1. Síkidomok, sokszögek' },
                    { id: 'g4-geom-sec-2', label: '2. A kör' },
                    { id: 'g4-geom-sec-3', label: '3. A testek' },
                    { id: 'g4-geom-sec-4', label: '4. A tükrözés' },
                    { id: 'g4-geom-sec-5', label: '5. Nagyítás, kicsinyítés' },
                    { id: 'g4-geom-sec-6', label: '6. Eltolás' },
                    { id: 'g4-geom-sec-7', label: '7. Elforgatás' },
                    { id: 'g4-geom-sec-8', label: '8. Tájékozódás' }
                  ];
                } else if (t.id === 'g4-grouping') {
                  subsections = [
                    { id: 'g4-group-sec-1', label: '1. Válogatások halmazokba' },
                    { id: 'g4-group-sec-2', label: '2. Válogatások táblázatokba' },
                    { id: 'g4-group-sec-3', label: '3. Hányféle lehetőség van?' },
                    { id: 'g4-group-sec-4', label: '4. Igaz vagy hamis?' }
                  ];
                } else if (t.id === 'g4-written-mult') {
                  subsections = [
                    { id: 'g4-wmult-sec-1', label: '1. Szorzás kétjegyű szorzóval' },
                    { id: 'g4-wmult-sec-2', label: '2. Írásbeli szorzás' },
                    { id: 'g4-wmult-sec-3', label: '3. Összefüggések, következtetések' }
                  ];
                } else if (t.id === 'g4-fractions') {
                  subsections = [
                    { id: 'g4-frac-sec-1', label: '1. A törtrész és a törtek értelmezése' },
                    { id: 'g4-frac-sec-2', label: '2. Egynél kisebb törtek' },
                    { id: 'g4-frac-sec-3', label: '3. Az 1 egész és az egynél nagyobb törtek' },
                    { id: 'g4-frac-sec-4', label: '4. Törtek összehasonlítása és rendezése' },
                    { id: 'g4-frac-sec-5', label: '5. Törtrész kiszámítása és szöveges feladatok' }
                  ];
                }
                // Add subsections for Grade 6
                else if (t.id === 'g6-integers-divisibility') {
                  subsections = [
                    { id: 'g6-sec-muveletek', label: '1. Műveletek az egész számok körében' },
                    { id: 'g6-sec-szorzas', label: '2. Az egész számok szorzása' },
                    { id: 'g6-sec-osztas', label: '3. Az egész számok osztása' },
                    { id: 'g6-sec-hany-eset', label: '4. Hány eset van? Számoljuk össze!' },
                    { id: 'g6-sec-oszto-tobbszoros', label: '5. Osztó, többszörös' },
                    { id: 'g6-sec-maradekok', label: '6. Számolás maradékokkal' },
                    { id: 'g6-sec-hany-osztoja-van', label: '7. Hány osztója van?' },
                    { id: 'g6-sec-oszthatosag-2-5-10', label: '8. Oszthatóság 2-vel, 5-tel, 10-zel' },
                    { id: 'g6-sec-oszthatosag-3-9', label: '9. Oszthatóság 3-mal és 9-cel' },
                    { id: 'g6-sec-oszthatosag-4-100', label: '10. Oszthatóság 4-gyel és 100-zal' },
                    { id: 'g6-sec-osszetett-oszthatosag', label: '11. Összetett oszthatósági szabályok' },
                    { id: 'g6-sec-tobbszoros-kozos', label: '12. Többszörös, közös többszörös' },
                    { id: 'g6-sec-oszto-kozos', label: '13. Osztó, közös osztó' },
                    { id: 'g6-sec-osszefoglalas', label: '14. Összefoglalás' }
                  ];
                } else if (t.id === 'g6-fractions') {
                  subsections = [
                    { id: 'g6-frac-sec-1', label: '1. Mit tanultunk a törtekről? Ismétlés' },
                    { id: 'g6-frac-sec-2', label: '2. Szorzás törttel, a reciprok' },
                    { id: 'g6-frac-sec-3', label: '3. Osztás törttel' },
                    { id: 'g6-frac-sec-4', label: '4. Mit tanultunk a tizedes törtekről? Ismétlés' },
                    { id: 'g6-frac-sec-5', label: '5. Szorzás tizedes törttel' },
                    { id: 'g6-frac-sec-6', label: '6. Osztás tizedes törttel' },
                    { id: 'g6-frac-sec-7', label: '7. Összetett műveletek, zárójelfelbontás' },
                    { id: 'g6-frac-sec-8', label: '8. Összefoglalás' }
                  ];
                } else if (t.id === 'g6-geometry-symmetry') {
                  subsections = [
                    { id: 'g6-geom-sec-1', label: '1. Síkbeli alakzatok' },
                    { id: 'g6-geom-sec-2', label: '2. Egybevágóság' },
                    { id: 'g6-geom-sec-3', label: '3. A kör' },
                    { id: 'g6-geom-sec-4', label: '4. A szakasz felezőmerőlegese' },
                    { id: 'g6-geom-sec-5', label: '5. Szerkesztések' },
                    { id: 'g6-geom-sec-6', label: '6. Tengelyes tükrözés' },
                    { id: 'g6-geom-sec-7', label: '7. A tengelyes tükrözés tulajdonságai' },
                    { id: 'g6-geom-sec-8', label: '8. Tengelyes szimmetria' },
                    { id: 'g6-geom-sec-9', label: '9. Tengelyesen szimmetrikus háromszögek, négyszögek, sokszögek' },
                    { id: 'g6-geom-sec-10', label: '10. Szerkesztési feladatok' },
                    { id: 'g6-geom-sec-11', label: '11. Összefoglalás' }
                  ];
                } else if (t.id === 'g6-ratio-percent-word') {
                  subsections = [
                    { id: 'g6-ratio-sec-1', label: '1. Az arány fogalma' },
                    { id: 'g6-ratio-sec-2', label: '2. Arányos osztás' },
                    { id: 'g6-ratio-sec-3', label: '3. Egyenes arányosság' },
                    { id: 'g6-ratio-sec-4', label: '4. Egyenes arányosság grafikonja' },
                    { id: 'g6-ratio-sec-5', label: '5. Szabályok, megfeleltetések' },
                    { id: 'g6-ratio-sec-6', label: '6. Törtrész' },
                    { id: 'g6-ratio-sec-7', label: '7. Százalékszámítás' },
                    { id: 'g6-ratio-sec-8', label: '8. A százalékszámítás gyakorlása' },
                    { id: 'g6-ratio-sec-9', label: '9. Nyitott mondatok' },
                    { id: 'g6-ratio-sec-10', label: '10. Szöveges feladatok' },
                    { id: 'g6-ratio-sec-11', label: '11. Több megoldás is lehet' },
                    { id: 'g6-ratio-sec-12', label: '12. Összefoglalás' }
                  ];
                } else if (t.id === 'g6-measurements') {
                  subsections = [
                    { id: 'g6-meas-sec-1', label: '1. Hosszúság, tömeg, idő' },
                    { id: 'g6-meas-sec-2', label: '2. A sokszögek kerülete' },
                    { id: 'g6-meas-sec-3', label: '3. A terület és a térfogat mérése' },
                    { id: 'g6-meas-sec-4', label: '4. A sokszögek területe' },
                    { id: 'g6-meas-sec-5', label: '5. Alakzatok a térben' },
                    { id: 'g6-meas-sec-6', label: '6. Testek felszíne' },
                    { id: 'g6-meas-sec-7', label: '7. Felszínszámítással kapcsolatos gyakorlati feladatok' },
                    { id: 'g6-meas-sec-8', label: '8. Testek térfogata' },
                    { id: 'g6-meas-sec-9', label: '9. Összefoglalás' }
                  ];
                } else if (t.id === 'g6-statistics') {
                  subsections = [
                    { id: 'g6-stat-sec-1', label: '1. Játékok' },
                    { id: 'g6-stat-sec-2', label: '2. Grafikonok, diagramok, összefüggések' },
                    { id: 'g6-stat-sec-3', label: '3. Kördiagram' },
                    { id: 'g6-stat-sec-4', label: '4. Adatok ábrázolása, átlag' },
                    { id: 'g6-stat-sec-5', label: '5. Összefoglalás' }
                  ];
                }
                // Add subsections for Grade 7
                if (t.id === 'g7-logic') {
                  subsections = [
                    { id: 'g7-sec-szamold-ossze', label: '1. Számold össze!' },
                    { id: 'g7-sec-rendezd-sorba', label: '2. Rendezd sorba!' },
                    { id: 'g7-sec-hany-eset-van', label: '3. Hány eset van?' },
                    { id: 'g7-sec-grafok', label: '4. Gráfok' },
                    { id: 'g7-sec-igazold-cafold', label: '5. Igazold! Cáfold!' },
                    { id: 'g7-sec-matematikai-jatekok', label: '6. Matematikai játékok' },
                    { id: 'g7-sec-osszefoglalas', label: '7. Összefoglalás' }
                  ];
                } else if (t.id === 'g7-rational-algebra') {
                  subsections = [
                    { id: 'g7-sec-rat-egesz-attekintes', label: '1. Egész számok áttekintése' },
                    { id: 'g7-sec-rat-tortek-tizedes', label: '2. Törtek, tizedes törtek' },
                    { id: 'g7-sec-rat-muveletek', label: '3. Műveletek racionális számokkal' },
                    { id: 'g7-sec-rat-szoveges', label: '4. Szöveges feladatok' },
                    { id: 'g7-sec-rat-osszetett-zarojel', label: '5. Összetett műveletek, zárójel' },
                    { id: 'g7-sec-rat-szamok-betuk', label: '6. Számok és betűk használata' },
                    { id: 'g7-sec-rat-osszevonas-ertek', label: '7. Összevonás, helyettesítési érték' },
                    { id: 'g7-sec-rat-zarojel-kiemeles', label: '8. Zárójelfelbontás, kiemelés' },
                    { id: 'g7-sec-rat-osszefoglalas', label: '9. Összefoglalás' }
                  ];
                } else if (t.id === 'g7-percent-equations') {
                  subsections = [
                    { id: 'g7-sec-pct-aranyossag', label: '1. Arányosság' },
                    { id: 'g7-sec-pct-mit-tanultunk', label: '2. Százalékszámítás alapjai' },
                    { id: 'g7-sec-pct-100-szazalek', label: '3. A 100% kiszámítása' },
                    { id: 'g7-sec-pct-hany-szazalek', label: '4. Hány százalék?' },
                    { id: 'g7-sec-pct-gyakorlas', label: '5. Százalékszámítás gyakorlása' },
                    { id: 'g7-sec-pct-osszetett', label: '6. Összetett feladatok' },
                    { id: 'g7-sec-pct-szoveges', label: '7. Szöveges feladatok' },
                    { id: 'g7-sec-pct-egyenlet-modszerek', label: '8. Próbálgatás, lebontogatás' },
                    { id: 'g7-sec-pct-merlegelv', label: '9. A mérlegelv' },
                    { id: 'g7-sec-pct-egyenletek-merlegelvvel', label: '10. Egyenletek mérlegelvvel' },
                    { id: 'g7-sec-pct-szoveges-egyenlettel', label: '11. Szöveges feladatok egyenlettel' },
                    { id: 'g7-sec-pct-osszefoglalas', label: '12. Összefoglalás' }
                  ];
                } else if (t.id === 'g7-geom-trans') {
                  subsections = [
                    { id: 'g7-sec-trans-fogalmak', label: '1. Geometriai fogalmak' },
                    { id: 'g7-sec-trans-haromszog-vonalak', label: '2. Háromszögek nevezetes vonalai' },
                    { id: 'g7-sec-trans-haromszog-negyszog', label: '3. Háromszögek és négyszögek' },
                    { id: 'g7-sec-trans-transzformaciok', label: '4. Geometriai transzformációk' },
                    { id: 'g7-sec-trans-kozeppontos-tukrozes', label: '5. Középpontos tükrözés' },
                    { id: 'g7-sec-trans-kozeppontos-alkalmazas', label: '6. A középpontos tükrözés alkalmazása' },
                    { id: 'g7-sec-trans-szogparok', label: '7. Szögpárok' },
                    { id: 'g7-sec-trans-szimmetria', label: '8. Középpontos és tengelyes szimmetria' },
                    { id: 'g7-sec-trans-paralelogramma-deltoid', label: '9. Paralelogramma és deltoid' },
                    { id: 'g7-sec-trans-kozeppontosan-szimmetrikus', label: '10. Középpontosan szimmetrikus alakzatok' },
                    { id: 'g7-sec-trans-szabalyos-sokszogek', label: '11. Szabályos sokszögek' },
                    { id: 'g7-sec-trans-kor', label: '12. A kör' },
                    { id: 'g7-sec-trans-szerkesztesek', label: '13. Szerkesztések' },
                    { id: 'g7-sec-trans-osszefoglalas', label: '14. Összefoglalás' }
                  ];
                } else if (t.id === 'g7-powers-divisibility') {
                  subsections = [
                    { id: 'g7-sec-pow-nagy-szamok', label: '1. Nagy számok és hatványalak' },
                    { id: 'g7-sec-pow-alkalmazas', label: '2. Hatványok alkalmazása' },
                    { id: 'g7-sec-pow-mit-tanultunk-ismetles', label: '3. Mit tanultunk az oszthatóságról?' },
                    { id: 'g7-sec-pow-logika', label: '4. Egy kis logika' },
                    { id: 'g7-sec-pow-prim-felbontas', label: '5. Prímszámok, felbontás' },
                    { id: 'g7-sec-pow-szabaly-keszites', label: '6. Oszthatósági szabályok' },
                    { id: 'g7-sec-pow-osztok-tobbszorosok', label: '7. Osztókról, többszörösökről' },
                    { id: 'g7-sec-pow-lnko', label: '8. Legnagyobb közös osztó' },
                    { id: 'g7-sec-pow-lkkt', label: '9. Legkisebb közös többszörös' },
                    { id: 'g7-sec-pow-jatekok', label: '10. Matematikai játékok' },
                    { id: 'g7-sec-pow-osszefoglalas', label: '11. Összefoglalás' }
                  ];
                } else if (t.id === 'g7-geometry') {
                  subsections = [
                    { id: 'g7-sec-geom-egybevagosag', label: '1. Egybevágó háromszögek' },
                    { id: 'g7-sec-geom-oldalak-szogek', label: '2. Háromszög oldalai, szögei' },
                    { id: 'g7-sec-geom-sokszogek-szogei-atloi', label: '3. Sokszögek szögei, átlói' },
                    { id: 'g7-sec-geom-mertekegysegek', label: '4. Mértékegységek' },
                    { id: 'g7-sec-geom-paralelogramma-terulet', label: '5. Paralelogramma területe' },
                    { id: 'g7-sec-geom-haromszog-terulet', label: '6. Háromszög területe' },
                    { id: 'g7-sec-geom-trapez-terulet', label: '7. Trapéz területe' },
                    { id: 'g7-sec-geom-deltoid-terulet', label: '8. Deltoid területe' },
                    { id: 'g7-sec-geom-hasab-felszin-terfogat', label: '9. Hasáb felszíne, térfogata' },
                    { id: 'g7-sec-geom-testek-terben-sikban', label: '10. Testek térben és síkban' },
                    { id: 'g7-sec-geom-szabaduloszoba', label: 'Szabadulószoba' },
                    { id: 'g7-sec-geom-osszefoglalas', label: '11. Összefoglalás' }
                  ];
                } else if (t.id === 'g7-stats') {
                  subsections = [
                    { id: 'g7-sec-stats-halmazok-hozzarendeles', label: '1. Két halmaz közötti hozzárendelések' },
                    { id: 'g7-sec-stats-megadasi-modok', label: '2. Megadási módok' },
                    { id: 'g7-sec-stats-olvassunk-grafikonrol', label: '3. Olvassunk a grafikonról!' },
                    { id: 'g7-sec-stats-atlag-modusz-median', label: '4. Átlag, módusz, medián' },
                    { id: 'g7-sec-stats-gyakorisag-relativ', label: '5. Gyakoriság, relatív gyakoriság' },
                    { id: 'g7-sec-stats-valoszinuseg', label: '6. Valószínűség' },
                    { id: 'g7-sec-stats-tippelj-kiserletezz', label: '7. Tippelj, kísérletezz!' },
                    { id: 'g7-sec-stats-osszefoglalas', label: '8. Összefoglalás' }
                  ];
                }
                // Add subsections for Grade 8
                else if (t.id === 'g8-numbers-letters') {
                  subsections = [
                    { id: 'g8-sec-logika', label: '1. Logika feladatok' },
                    { id: 'g8-sec-halmazok-alap', label: '2. Mit tudunk a halmazokról?' },
                    { id: 'g8-sec-halmaz-muveletek', label: '3. Műveletek halmazokkal' },
                    { id: 'g8-sec-racionalis-halmaz', label: '4. A racionális számok halmaza' },
                    { id: 'g8-sec-racionalis-muvelet', label: '5. Mit tudunk a racionális számokról?' },
                    { id: 'g8-sec-hatvanyozas', label: '6. Hatványozás' },
                    { id: 'g8-sec-negyzetgyok-fogalom', label: '7. A négyzetgyök fogalma' },
                    { id: 'g8-sec-szamok-negyzetgyoke', label: '8. Számok négyzetgyöke' },
                    { id: 'g8-sec-betus-ismetles', label: '9. Betűs kifejezések (ismétlés)' },
                    { id: 'g8-sec-betus-szorzas', label: '10. Betűs kifejezések szorzása és a kiemelés' },
                    { id: 'g8-sec-tobbtagu-szorzat', label: '11. Többtagú kifejezések szorzata' },
                    { id: 'g8-sec-osszefoglalas', label: '12. Összefoglalás' }
                  ];
                } else if (t.id === 'g8-geometry') {
                  subsections = [
                    { id: 'g8-sec-geom-egybevagosag', label: '1. Egybevágósági transzformációk' },
                    { id: 'g8-sec-geom-transzformaciok', label: '2. Transzformációk' },
                    { id: 'g8-sec-geom-szerkesztoprogram', label: '3. Használjunk szerkesztőprogramot!' },
                    { id: 'g8-sec-geom-hasonlosag', label: '4. Hasonlóság' },
                    { id: 'g8-sec-geom-kozeppontos', label: '5. A középpontos hasonlóság' },
                    { id: 'g8-sec-geom-szerkesztesek', label: '6. Szerkesztések' },
                    { id: 'g8-sec-geom-osszefoglalas', label: '7. Összefoglalás' }
                  ];
                } else if (t.id === 'g8-equations') {
                  subsections = [
                    { id: 'g8-sec-eq-alap', label: '1. Egyenletek' },
                    { id: 'g8-sec-eq-szamok-kor', label: '2. Szöveges feladatok számokról, életkorokról' },
                    { id: 'g8-sec-eq-keveres', label: '3. Szöveges feladatok összekeverésről' },
                    { id: 'g8-sec-eq-mozgas-munka', label: '4. Szöveges feladatok mozgásról, munkáról' },
                    { id: 'g8-sec-eq-geometria', label: '5. Szöveges geometriai feladatok' },
                    { id: 'g8-sec-eq-vegyes', label: '6. Vegyes feladatok' },
                    { id: 'g8-sec-eq-penzugy', label: '7. Pénzügyi feladatok' },
                    { id: 'g8-sec-eq-osszefoglalas', label: '8. Összefoglalás' }
                  ];
                } else if (t.id === 'g8-admissions-prep') {
                  subsections = [
                    { id: 'g8-prep-word', label: '1. Szöveges & felvételi feladatok' }
                  ];
                } else if (t.id === 'g8-pythagoras') {
                  subsections = [
                    { id: 'g8-sec-pyth-szerkesztes', label: '1. Szerkesztések, mérések' },
                    { id: 'g8-sec-pyth-tetel', label: '2. A Pitagorasz-tétel' },
                    { id: 'g8-sec-pyth-megforditas', label: '3. A Pitagorasz-tétel megfordítása' },
                    { id: 'g8-sec-pyth-alkalmazas', label: '4. A Pitagorasz-tétel alkalmazása' },
                    { id: 'g8-sec-pyth-szamologep', label: '5. Számológép & Projektmunka' },
                    { id: 'g8-sec-pyth-nevezetes', label: '6. Nevezetes derékszögű háromszögek' },
                    { id: 'g8-sec-pyth-osszefoglalas', label: '7. Összefoglalás' }
                  ];
                } else if (t.id === 'g8-functions-probability-sequences') {
                  subsections = [
                    { id: 'g8-sec-func-egyenes', label: '1. Egyenes arányosság' },
                    { id: 'g8-sec-func-grafikonok', label: '2. Hozzárendelések és grafikonjaik' },
                    { id: 'g8-sec-func-forditott', label: '3. Fordított arányosság' },
                    { id: 'g8-sec-func-olvasas', label: '4. Olvassunk a grafikonról!' },
                    { id: 'g8-sec-func-rajzolas', label: '5. Készítsünk grafikont!' },
                    { id: 'g8-sec-func-gyakorisag', label: '6. Gyakoriság, relatív gyakoriság, átlag' },
                    { id: 'g8-sec-func-jatek', label: '7. Játék' },
                    { id: 'g8-sec-func-valoszinuseg', label: '8. Valószínűség' },
                    { id: 'g8-sec-func-feladatok', label: '9. Valószínűségszámítási feladatok' },
                    { id: 'g8-sec-func-mintazat', label: '10. Keressünk összefüggéseket!' },
                    { id: 'g8-sec-func-sorozatok', label: '11. Sorozatok' },
                    { id: 'g8-sec-func-osszefoglalas', label: '12. Összefoglalás' }
                  ];
                } else if (t.id === 'g8-solids') {
                  subsections = [
                    { id: 'g8-sec-solids-ismetles', label: '1. Mit tanultunk eddig? (ismétlés)' },
                    { id: 'g8-sec-solids-gulak', label: '2. Gúlák' },
                    { id: 'g8-sec-solids-gula-szamitas', label: '3. A gúla felszíne és térfogata' },
                    { id: 'g8-sec-solids-gomb', label: '4. A gömb' },
                    { id: 'g8-sec-solids-fold', label: '5. A Föld' },
                    { id: 'g8-sec-solids-osszefoglalas', label: '6. Összefoglalás' }
                  ];
                }

                list.push({
                  id: t.id,
                  title: t.title,
                  icon: typeof t.icon === 'string' ? t.icon : '📐',
                  color: t.color,
                  subsections: subsections
                });
              });

              return list;
            };

            const currentGradeTopics = getGradeTopicsList();
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
                      {((selectedGrade === 5 && topic.id.startsWith('g5-')) || selectedGrade === 4 || selectedGrade === 6 || selectedGrade === 7) && renderTopicContent(topic.id)}
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
            ) : (activityType === 'grade3-basic' || activityType.startsWith('grade3-')) ? (
              <Grade3MathModule
                onBack={handleBack}
                initialView={activityType}
                onStartActivity={(type) => handleActivitySelect(type as ActivityType)}
              />
            ) : (
              /* NON-HUB ACTIVITIES - Rendered individually */
              <div className="space-y-6">


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


