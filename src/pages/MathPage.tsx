import { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { SectionHeader } from "@/components/math/shared/SectionHeader";
import { ActivityPlaceholder } from "@/components/math/shared/ActivityPlaceholder";
import DecimalFractionsQuiz from "@/components/math/grade-5/DecimalFractionsQuiz";
import DecimalMultiplicationQuiz from "@/components/math/grade-5/DecimalMultiplicationQuiz";
import DecimalDivisionQuiz from "@/components/math/grade-5/DecimalDivisionQuiz";
import { mathTopics } from '@/data/mathTopics';
import { MathTopicCard } from "@/components/math/shared/MathTopicCard";
import { ScrollSpySidebar, NavItem } from "@/components/math/shared/ScrollSpySidebar";
import { HorizontalTopicNav } from "@/components/math/shared/HorizontalTopicNav";
import { MathQuiz } from "@/components/math/shared/MathQuiz";
import { GradeSelector } from '@/components/GradeSelector';
import { FractionVisualizer } from "@/components/math/tools/FractionVisualizer";
import { FractionsModule } from "@/components/math/grade-4/FractionsModule";
import { Grade1MathModule } from "@/components/math/grade-1/Grade1MathModule";
import { Grade2MathModule } from "@/components/math/grade-2/Grade2MathModule";
import { Grade3MathModule } from "@/components/math/grade-3/Grade3MathModule";
import { AlgebraQuiz } from "@/components/math/grade-7/AlgebraQuiz";
import { MathColoringGame } from "@/components/math/games/MathColoringGame";
import { DivisibilityTool } from "@/components/math/tools/DivisibilityTool";
import { MaterialGallery } from "@/components/math/shared/MaterialGallery";
import { LessonViewer } from "@/components/math/shared/LessonViewer";
import { LongDivisionTool } from "@/components/math/tools/LongDivisionTool";
import { MathSnakeGame } from "@/components/math/games/MathSnakeGame";
import { AngleMatcher } from "@/components/math/grade-7/AngleMatcher";
import { ShapeClassifier } from "@/components/math/grade-4/ShapeClassifier";
import { LineRelationships } from "@/components/math/grade-4/LineRelationships";
import { DivisibilityPowersModule } from "@/components/math/grade-6/DivisibilityPowersModule";
import { WordProblemsModule } from "@/components/math/grade-5/WordProblemsModule";
import { TriangleClassifier } from "@/components/math/grade-6/TriangleClassifier";
import { QuadrilateralClassifier } from "@/components/math/grade-6/QuadrilateralClassifier";
import { CirclePartsGame } from "@/components/math/games/CirclePartsGame";
import { TriangleAnglesQuiz } from "@/components/math/grade-7/TriangleAnglesQuiz";
import { DecimalFractionsTool } from "@/components/math/tools/DecimalFractionsTool";
import { NumberLineTool } from "@/components/math/tools/NumberLineTool";
import { ManipulativeDivision } from "@/components/math/tools/ManipulativeDivision";
import { ConstructionTool } from "@/components/math/tools/ConstructionTool";
import { PercentagesQuiz } from "@/components/math/grade-6/PercentagesQuiz";
import { PercentWordProblems } from "@/components/math/grade-6/PercentWordProblems";
import { EquationSolverTool } from "@/components/math/tools/EquationSolverTool";
import { EquationBalanceTool } from "@/components/math/tools/EquationBalanceTool";
import { MoneyCalculationTool } from "@/components/math/tools/MoneyCalculationTool";
import DecimalShifterTool from "@/components/math/tools/DecimalShifterTool";
import { PuzzleMakerTool } from "@/components/math/tools/PuzzleMakerTool";
import { TotoTool } from "@/components/math/tools/TotoTool";
import { GeometryModule } from "@/components/math/grade-5/GeometryModule";
import { SymmetryQuiz } from "@/components/math/grade-6/SymmetryQuiz";
import { LogicBlocksGame } from "@/components/math/games/LogicBlocksGame";
import { VennDiagramGame } from "@/components/math/games/VennDiagramGame";
import { GroupingGame } from "@/components/math/games/GroupingGame";
import { NumberGroupingGame } from "@/components/math/games/NumberGroupingGame";
import { SudokuGame } from "@/components/math/games/SudokuGame";
import { SudokuGeneratorTool } from "@/components/math/tools/SudokuGeneratorTool";
import { VennInterpretationQuiz } from "@/components/math/grade-5/VennInterpretationQuiz";
import { VennReadingGame } from "@/components/math/games/VennReadingGame";
import { VENN_READING_OBJECTS, VENN_READING_NUMBERS } from '@/data/vennReadingLevels';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SidebarMenu } from '@/components/SidebarMenu';
import { SiteFooter } from '@/components/SiteFooter';
import { UserMenu } from '@/components/auth/UserMenu';
import { AxialSymmetryGame } from "@/components/math/games/AxialSymmetryGame";
import { SymmetryErrorGame } from "@/components/math/games/SymmetryErrorGame";
import { AxialSymmetryQuiz } from "@/components/math/grade-6/AxialSymmetryQuiz";
import { SymmetryConstructionTool } from "@/components/math/tools/SymmetryConstructionTool";
import { AxialSymmetryPresentation } from "@/components/math/grade-6/AxialSymmetryPresentation";
import { PerimeterAreaTool } from "@/components/math/tools/PerimeterAreaTool";
import { StudentFeedbackHub } from '@/components/feedback/StudentFeedbackHub';
import { WordSearchTool } from "@/components/math/tools/WordSearchTool";
import ChessGame from "@/components/math/games/ChessGame";
import { MatchingCreator } from "@/components/math/tools/MatchingCreator";
import { EquationBalanceQuiz } from "@/components/math/grade-7/EquationBalanceQuiz";
import { WordProblemsQuiz } from "@/components/math/grade-5/WordProblemsQuiz";
import PerimeterQuiz from "@/components/math/grade-5/PerimeterQuiz";
import AreaConversionQuiz from "@/components/math/grade-5/AreaConversionQuiz";
import AreaCalculationQuiz from "@/components/math/grade-5/AreaCalculationQuiz";
import { Grade7GeometryModule } from "@/components/math/grade-7/Grade7GeometryModule";
import { RatioIntroQuiz } from "@/components/math/grade-6/RatioIntroQuiz";
import { RatioCreatorQuiz } from "@/components/math/grade-6/RatioCreatorQuiz";
import { DirectProportionQuiz } from "@/components/math/grade-6/DirectProportionQuiz";
import { MatrixSortingGame } from "@/components/math/games/MatrixSortingGame";
import MemoryGameComponent from "@/components/math/games/MemoryGame";
import HanoiGame from "@/components/math/games/HanoiGame";
import { MonthlyAssessment as G4Monthly } from "@/components/math/competency/4/MonthlyAssessment";
import { MonthlyAssessment as G5Monthly } from "@/components/math/competency/5/MonthlyAssessment";
import { MonthlyAssessment as G6Monthly } from "@/components/math/competency/6/MonthlyAssessment";
import { TopicsAssessment as G6Topics } from "@/components/math/competency/6/TopicsAssessment";
import { MonthlyAssessment as G7Monthly } from "@/components/math/competency/7/MonthlyAssessment";
import TorpedoGame from "@/components/math/games/TorpedoGame";
import { MockAssessment as G7Mock } from "@/components/math/competency/7/MockAssessment";
import { COMPETENCY_DATA } from '@/data/competencyData';
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
  LayoutGrid,
  Repeat,
  Brain,
  Puzzle,
  Trophy,
  Flag,
  ArrowRightLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

type ViewState = 'main-select' | 'topic-select' | 'tools-select' | 'games-select' | 'competency-select' | 'activity' | 'geometry-select' | 'search-results';
type ActivityType =
  | 'quiz' | 'fractions' | 'algebra' | 'geometry' | 'percentages' | 'coloring'
  | 'divisibility' | 'materials' | 'long-division' | 'angle-matching'
  | 'shape-classification' | 'line-relationships' | 'reflection-quiz'
  | 'divisibility-rules' | 'divisibility-powers'
  | 'grade1-basic' | 'grade2-basic' | 'grade3-basic'
  | 'word-problems' | 'triangle-classification' | 'quadrilateral-classification'
  | 'snake-game' | 'circle-parts'
  | 'divisibility-theory' | 'divisibility-factorization' | 'divisibility-quiz'
  | 'divisibility-matcher' | 'divisibility-gcdquiz' | 'divisibility-lkktquiz'
  | 'triangle-angles-quiz' | 'g7-rational-numbers' | 'g7-expression-usage'
  | 'decimal-fractions' | 'number-line' | 'construction' | 'decimal-quiz'
  | 'decimal-multiplication-quiz' | 'decimal-division-quiz' | 'decimal-shifter'
  | 'manipulative-division' | 'equation-solver' | 'equation-balance' | 'money-calculation'
  | 'fractions-visualizer' | 'fractions-quiz' | 'fractions-multiplier'
  | 'fractions-visual-matcher' | 'fractions-divider' | 'decimal-multiplier'
  | 'decimal-divider' | 'decimal-multiplier-select' | 'decimal-divider-select'
  | 'grade1-addition10' | 'grade1-snake' | 'grade2-coloring' | 'grade2-quiz'
  | 'grade2-blocks' | 'grade2-snake' | 'grade3-coloring' | 'grade3-quiz'
  | 'grade3-blocks' | 'grade3-snake' | 'grade3-alapmuveletek' | 'grade3-tower-builder'
  | 'grade3-money-quiz' | 'triangle-angles-quiz' | 'decimal-fractions-tool' | 'number-line-tool'
  | 'manipulative-division' | 'construction-tool' | 'money-calculation'
  | 'decimal-shifter-tool' | 'puzzle-maker' | 'geometry-module'
  | 'logic-blocks' | 'venn-diagram-game' | 'grouping-game' | 'number-grouping-game'
  | 'sudoku' | 'sudoku-generator' | 'venn-interpretation-quiz'
  | 'venn-reading-objects' | 'venn-reading-numbers' | 'axial-symmetry' | 'symmetry-error' | 'symmetry-construction' | 'axial-symmetry-quiz' | 'axial-symmetry-presentation'
  | 'percent-value-word-problems' | 'percent-rate-word-problems' | 'percent-base-word-problems' | 'student-feedback' | 'word-search' | 'memory-game' | 'equation-balance-quiz'
  | 'ratio-intro' | 'ratio-creator' | 'g7-word-problems' | 'direct-proportion-quiz' | 'matrix-sorting-game'
  | 'toto-maker' | 'chess-game' | 'torpedo-game' | 'matching-creator'
  | 'hanoi-tower' | 'competency-assessment' | 'competency-mock-assessment' | 'competency-topics-assessment' | 'perimeter-quiz' | 'perimeter-area' | 'area-conversion-quiz' | 'area-calculation-quiz';

const gradeToSlug = (grade: GradeLevel): string => `${grade}-osztaly`;
const slugToGrade = (slug: string): GradeLevel | null => {
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
  // creative
  { id: 'puzzle-maker', title: 'Online Rejtvénykészítő', desc: 'Készíts matekos rejtvényeket és töltsd le PDF-ben!', icon: <span className="text-3xl">🧩</span>, color: 'bg-violet-100 text-violet-600', category: 'sec-creative' },
  { id: 'toto-maker', title: 'Totó Készítő', desc: 'Készíts 13+1 kérdéses totót egyedi megfejtéssel és töltsd le PDF-ben!', icon: <span className="text-3xl">🏆</span>, color: 'bg-amber-100 text-amber-600', category: 'sec-creative' },
  { id: 'matching-creator', title: 'Párosító Készítő', desc: 'Készíts koordinátás párosító feladatot és töltsd le PDF-ben!', icon: <Puzzle className="w-8 h-8" />, color: 'bg-blue-100 text-blue-600', category: 'sec-creative' },
  { id: 'word-search', title: 'Szókereső Készítő', desc: 'Készíts saját szókeresőt, letölthető megoldókulccsal!', icon: <span className="text-3xl">🔎</span>, color: 'bg-indigo-100 text-indigo-600', category: 'sec-creative' },
  { id: 'sudoku-generator', title: 'Sudoku Generátor', desc: 'Generálj és nyomtass egyedi Sudoku feladványokat!', icon: <Calculator className="w-8 h-8" />, color: 'bg-blue-100 text-blue-600', category: 'sec-creative' },
  { id: 'student-feedback', title: 'Diák visszajelzés (Céltábla)', desc: 'Kérj visszajelzést a diákoktól az óra végén!', icon: <Target className="w-8 h-8" />, color: 'bg-rose-100 text-rose-600', category: 'sec-creative' },
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
  { id: 'memory-game', title: 'Memóriajáték', desc: 'Jegyezd meg az ábrákat és teszteld a memóriád!', icon: <Brain className="w-8 h-8" />, color: 'bg-indigo-100 border-indigo-200 text-indigo-600' },
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

  const gradeNavItems: NavItem[] = useMemo(() => {
    if (view !== 'topic-select') return [];
    if (selectedGrade === 4) return [
      { id: 'g4-count-10k', label: 'Számolás 10k-ig', icon: <Calculator className="w-4 h-4" /> },
      { id: 'g4-measurements', label: 'Mérések', icon: <Scale className="w-4 h-4" /> },
      { id: 'g4-written-ops', label: 'Írásbeli műveletek', icon: <Calculator className="w-4 h-4" /> },
      { id: 'g4-long-div', label: 'Írásbeli osztás', icon: <Box className="w-4 h-4" /> },
      { id: 'g4-shapes-solids', label: 'Síkidomok, testek', icon: <Shapes className="w-4 h-4" /> },
      { id: 'g4-fractions', label: 'Törtszámok', icon: <Percent className="w-4 h-4" /> },
    ];
    if (selectedGrade === 5) return [
      { id: 'g5-ops', label: 'Alapműveletek', icon: <Calculator className="w-4 h-4" /> },
      { id: 'g5-geom-basics', label: 'Geometria', icon: <Shapes className="w-4 h-4" /> },
      { id: 'g5-proportions', label: 'Arányosság', icon: <Percent className="w-4 h-4" /> },
    ];
    if (selectedGrade === 6) return [
      { id: 'g6-integers', label: 'Egész számok', icon: <Calculator className="w-4 h-4" /> },
      { id: 'g6-fractions', label: 'Törtek', icon: <Percent className="w-4 h-4" /> },
      { id: 'g6-geometry', label: 'Geometria', icon: <Shapes className="w-4 h-4" /> },
    ];
    if (selectedGrade === 7) return [
      { id: 'g7-lines', label: 'Nevezetes vonalak', icon: <MoveHorizontal className="w-4 h-4" /> },
      { id: 'g7-triangles', label: 'Háromszögek', icon: <Triangle className="w-4 h-4" /> },
      { id: 'g7-quads', label: 'Négyszögek', icon: <Square className="w-4 h-4" /> },
      { id: 'g7-expressions', label: 'Kifejezések', icon: <Variable className="w-4 h-4" /> },
      { id: 'g7-percent-val', label: 'Százalékérték', icon: <Percent className="w-4 h-4" /> },
      { id: 'g7-percent-rate', label: 'Százalékláb', icon: <Percent className="w-4 h-4" /> },
      { id: 'g7-percent-base', label: 'Százalékalap', icon: <Percent className="w-4 h-4" /> },
    ];
    return [];
  }, [selectedGrade, view]);

  const handleSidebarItemClick = (id: string) => {
    // Map section IDs to their parent Topic IDs
    const sectionToTopic: Record<string, string> = {
      'g4-count-10k': 'g4-count-10k',
      'g4-measurements': 'g4-measurements',
      'g4-written-ops': 'g4-written-ops',
      'g4-long-div': 'g4-long-div',
      'g4-shapes-solids': 'g4-shapes-solids',
      'g4-fractions': 'g4-fractions',
      'g5-ops': 'g5-integers',
      'g5-geom-basics': 'g5-geometry-intro',
      'g5-proportions': 'g5-proportion-problems',
      'g7-lines': 'g7-geom-trans',
      'g7-triangles': 'g7-geom-trans',
      'g7-quads': 'g7-geom-trans',
      'g7-expressions': 'g7-rational-algebra',
      'g7-percent-val': 'g7-percent-equations',
      'g7-percent-rate': 'g7-percent-equations',
      'g7-percent-base': 'g7-percent-equations',
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
      if (topicParam) {
        setSelectedTopic(topicParam);
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
          if (topicParam === 'competency-assessment' || !((grade === 5 && topicParam.startsWith('g5-')) || grade === 4 || grade === 6 || grade === 7)) {
            setActivityType(topicParam as ActivityType);
            setView('activity');
          }
        }
      } else {
        setView('topic-select');
        setActivityType('quiz'); // Reset activity type when no topic or activity is selected
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
      path = `/kompetencia/${gradeToSlug(grade)}${activity === 'competency-mock-assessment' ? '-mock' : activity === 'competency-topics-assessment' ? '-topics' : ''}`;
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
    setExpandedTopicId(null);
    updateURL('topic-select', grade, null, null);
  };

  const handleTopicSelect = (topicId: string, forceActivity = false) => {
    if (!forceActivity && ((selectedGrade === 5 && topicId.startsWith('g5-')) || selectedGrade === 4 || selectedGrade === 6 || selectedGrade === 7)) {
      setExpandedTopicId(expandedTopicId === topicId ? null : topicId);
      // We don't necessarily update URL for expanded topics unless they are "terminal"
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
    } else if (topicId === 'competency-assessment' || topicId === 'competency-mock-assessment' || topicId === 'competency-topics-assessment') {
      finalActivityType = topicId as ActivityType;
    } else if (topicId === 'perimeter-quiz') {
      finalActivityType = 'perimeter-quiz';
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
      } else if (activityType === 'competency-assessment' || activityType === 'competency-mock-assessment' || activityType === 'competency-topics-assessment') {
        nextView = 'competency-select';
        nextTopic = null;
        nextGrade = null;
      } else if (selectedGrade) {
        nextView = 'topic-select';
        nextTopic = null;
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
    // Explicitly reset activityType unless we are staying in activity view
    if (nextView !== 'activity') {
      setActivityType('quiz');
    }
    updateURL(nextView, nextGrade, nextTopic, null);
  };

  const renderTopicContent = (topicId: string) => {
    if (topicId === 'competency-assessment') {
      return null;
    }

    if (topicId === 'g4-count-10k') {
      return (
        <div className="flex flex-col gap-10 py-6">
          <section>
            <SectionHeader id="g4-count-10k" number={1} title="Számfogalom 10 000-ig" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="Számok írása, olvasása, kerekítés"
                type="Teszt"
                onClick={() => handleActivitySelect('quiz', topicId)}
                icon={<Calculator className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Matek Kígyó 🐍"
                subtitle="Gyűjtsd össze a számokat!"
                type="Játék"
                onClick={() => handleActivitySelect('snake-game', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="emerald"
              />
            </div>
          </section>
        </div>
      );
    }

    if (topicId === 'g4-measurements') {
      return (
        <div className="flex flex-col gap-10 py-6">
          <section>
            <SectionHeader id="g4-measurements" number={1} title="Mértékegységek" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Pénztár"
                subtitle="Számolás pénzzel"
                type="Eszköz"
                onClick={() => handleActivitySelect('money-calculation', topicId)}
                icon={<Coins className="w-6 h-6" />}
                color="emerald"
              />
            </div>
          </section>
        </div>
      );
    }

    if (topicId === 'g4-written-ops') {
      return (
        <div className="flex flex-col gap-10 py-6">
          <section>
            <SectionHeader id="g4-written-ops" number={1} title="Összeadás és kivonás" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Írásbeli műveletek"
                subtitle="Gyakorlás 10 000-ig"
                type="Teszt"
                onClick={() => handleActivitySelect('quiz', topicId)}
                icon={<Calculator className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        </div>
      );
    }

    if (topicId === 'g4-negatives') {
      return (
        <div className="flex flex-col gap-10 py-6">
          <section>
            <SectionHeader id="g4-negatives" number={1} title="Pozitív és negatív számok" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Számegyenes"
                subtitle="Negatív számok ábrázolása"
                type="Eszköz"
                onClick={() => handleActivitySelect('number-line', topicId)}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        </div>
      );
    }

    if (topicId === 'g4-long-div') {
      return (
        <div className="flex flex-col gap-10 py-6">
          <section>
            <SectionHeader id="g4-long-div" number={1} title="Osztás egyjegyű osztóval" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Írásbeli osztás"
                subtitle="Lépcsős osztás levezetése"
                type="Eszköz"
                onClick={() => handleActivitySelect('long-division', topicId)}
                icon={<Box className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        </div>
      );
    }

    if (topicId === 'g4-shapes-solids') {
      return (
        <div className="flex flex-col gap-10 py-6">
          <section>
            <SectionHeader number={1} title="Sikidom és sokszög" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Sokszögek"
                subtitle="Alakzatok felismerése"
                type="Gyakorlás"
                onClick={() => handleActivitySelect('shape-classification', topicId)}
                icon={<Shapes className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Egyenesek"
                subtitle="Párhuzamos és merőleges"
                type="Gyakorlás"
                onClick={() => handleActivitySelect('line-relationships', topicId)}
                icon={<MoveHorizontal className="w-6 h-6 rotate-45" />}
                color="indigo"
              />
            </div>
          </section>

          <section>
            <SectionHeader number={2} title="A kör" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kör részei"
                subtitle="Sugár és átmérő"
                type="Gyakorlás"
                onClick={() => handleActivitySelect('circle-parts', topicId)}
                icon={<Circle className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>

          <section>
            <SectionHeader number={3} title="A testek" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Síkidom vagy Test?"
                subtitle="2D és 3D alakzatok"
                type="Játék"
                onClick={() => handleActivitySelect('shape-classification', topicId)}
                icon={<Box className="w-6 h-6" />}
                color="amber"
              />
            </div>
          </section>

          <section>
            <SectionHeader number={4} title="A tükrözés" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Tengelyes tükrözés"
                subtitle="Tükörkép keresése"
                type="Teszt"
                onClick={() => handleActivitySelect('reflection-quiz', topicId)}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Húzd a helyére!"
                subtitle="Tükrözés gyakorlása"
                type="Gyakorlás"
                onClick={() => handleActivitySelect('axial-symmetry', topicId)}
                icon={<Zap className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Találd meg a hibát!"
                subtitle="Diagnosztikai feladat"
                type="Gyakorlás"
                onClick={() => handleActivitySelect('symmetry-error', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="rose"
              />
              <ActivityPlaceholder
                title="Szimmetria eszköz"
                subtitle="Szerkessz tükörképeket!"
                type="Eszköz"
                onClick={() => handleActivitySelect('symmetry-construction', topicId)}
                icon={<Repeat className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>

          <section>
            <SectionHeader number={5} title="Nagyítás, kicsinyítés" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Nagyítás és kicsinyítés"
                subtitle="Arányok és méretek"
                type="Hamarosan"
                disabled
                icon={<Scale className="w-6 h-6" />}
                color="slate"
              />
            </div>
          </section>

          <section>
            <SectionHeader number={6} title="Eltolás, elforgatás" color="orange" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Transzformációk"
                subtitle="Alakzatok mozgatása"
                type="Hamarosan"
                disabled
                icon={<MoveHorizontal className="w-6 h-6 rotate-90" />}
                color="slate"
              />
            </div>
          </section>

          <section>
            <SectionHeader number={7} title="Tájékozódás" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Tájékozódás térben"
                subtitle="Irányok és helyzetek"
                type="Hamarosan"
                disabled
                icon={<Target className="w-6 h-6" />}
                color="slate"
              />
            </div>
          </section>
        </div>
      );
    }

    if (topicId === 'g4-fractions') {
      return (
        <div className="flex flex-col gap-10 py-6">
          <section>
            <SectionHeader id="g4-fractions" number={1} title="Törtek alapjai" color="orange" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Törtek vizuálisan"
                subtitle="Törtek ábrázolása"
                type="Eszköz"
                onClick={() => handleActivitySelect('fractions-visualizer')}
                icon={<Percent className="w-6 h-6" />}
                color="orange"
              />
            </div>
          </section>
        </div>
      );
    }

    if (topicId === 'g4-written-mult' || topicId === 'g4-time') {
      return (
        <div className="py-2">
          <div className="mb-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <p className="text-sm font-medium text-blue-700 italic">Ehhez a témakörhöz jelenleg a tankönyvi anyagok érhetőek el.</p>
          </div>
          <MaterialGallery
            grade={4}
            onView={handleMaterialSelect}
            initialMaterialId={new URLSearchParams(location.search).get('material')}
          />
        </div>
      );
    }

    if (topicId === 'g5-integers') {
      return (
        <div className="flex flex-col gap-10 py-6">
          <section>
            <SectionHeader id="g5-ops" number={1} title="Alapműveletek" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="Összeadás, kivonás, szorzás, osztás"
                type="Teszt"
                onClick={() => handleActivitySelect('quiz', topicId)}
                icon={<Calculator className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Írásbeli osztás"
                subtitle="Lépcsős osztás levezetése"
                type="Eszköz"
                onClick={() => handleActivitySelect('long-division', topicId)}
                icon={<Box className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Számegyenes"
                subtitle="Egész számok szemléltetése"
                type="Eszköz"
                onClick={() => handleActivitySelect('number-line')}
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>
        </div>
      );
    }

    if (topicId === 'g5-fractions-decimals') {
      const isFractionActivity = activityType === 'fractions' || activityType?.startsWith('fractions-') || activityType?.startsWith('decimal-');
      return (
        <FractionsModule
          isInline
          onBack={() => setExpandedTopicId(null)}
          onStartActivity={(type) => handleActivitySelect(type as ActivityType, topicId)}
          initialView={isFractionActivity ? activityType : 'menu'}
        />
      );
    }

    if (topicId === 'g5-geometry-intro') {
      return (
        <div className="flex flex-col gap-10 py-6">
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

          <section>
            <SectionHeader number={6} title="Testek építése, szemléltetése" color="pink" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Építs testeket!"
                subtitle="Térbeli alakzatok"
                type="Hamarosan"
                disabled
                icon={<Box className="w-6 h-6" />}
                color="slate"
              />
            </div>
          </section>

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
        </div>
      );
    }

    if (topicId === 'g4-grouping') {
      return (
        <div className="flex flex-col gap-10 py-6">
          <section>
            <SectionHeader id="g4-matrix-sorting" number={1} title="Válogatások táblázatba" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Táblázatos válogatás"
                subtitle="Elhelyezés a 2x2-es hálóban"
                type="Játék"
                onClick={() => handleActivitySelect('matrix-sorting-game', topicId)}
                icon={<Table className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        </div>
      );
    }

    if (topicId === 'g5-proportion-problems') {
      return (
        <div className="flex flex-col gap-10 py-6">
          <section>
            <SectionHeader id="g5-proportions" number={1} title="Arányosság és alkalmazása" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Szöveges feladatok"
                subtitle="Gyakorlati problémák"
                type="Indítás"
                onClick={() => handleActivitySelect('word-problems', topicId)}
                icon={<Sparkles className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Százalékszámítás"
                subtitle="Alap, érték, láb"
                type="Gyakorlás"
                onClick={() => { setPercentMode(null); handleActivitySelect('percentages', topicId); }}
                icon={<Percent className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>
        </div>
      );
    }

    if (topicId === 'g5-location-sequences' || topicId === 'g5-stats') {
      return (
        <div className="py-2">
          <MaterialGallery
            grade={5}
            onView={handleMaterialSelect}
            initialMaterialId={new URLSearchParams(location.search).get('material')}
          />
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
      return (
        <div className="flex flex-col gap-10 py-6">
          <section>
            <SectionHeader id="g7-lines" number={1} title="Háromszögek nevezetes vonalai" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Súlyvonalak, magasságvonalak"
                subtitle="Elmélet és szerkesztés"
                type="Kezdés"
                disabled
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Középvonalak"
                subtitle="Háromszög részei"
                type="Gyakorlás"
                disabled
                icon={<Triangle className="w-6 h-6" />}
                color="slate"
              />
            </div>
          </section>

          <section>
            <SectionHeader id="g7-triangles" number={2} title="Háromszögek" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Háromszögek fajtái"
                subtitle="Osztályozás tulajdonságok alapján"
                type="Kezdés"
                onClick={() => handleActivitySelect('triangle-classification', topicId)}
                icon={<Triangle className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Háromszögek szögei"
                subtitle="Belső és külső szögek"
                type="Teszt"
                onClick={() => handleActivitySelect('triangle-angles-quiz', topicId)}
                icon={<Sparkles className="w-6 h-6 text-amber-500" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Szögtípusok"
                subtitle="Felismerés és párosítás"
                type="Gyakorlás"
                onClick={() => handleActivitySelect('angle-matching', topicId)}
                icon={<Target className="w-6 h-6" />}
                color="emerald"
              />
            </div>
          </section>

          <section>
            <SectionHeader id="g7-quads" number={3} title="Négyszögek" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Négyszögek fajtái"
                subtitle="Tulajdonságok és csoportosítás"
                type="Kezdés"
                onClick={() => handleActivitySelect('quadrilateral-classification', topicId)}
                icon={<Square className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Terület és kerület"
                subtitle="Speciális négyszögek"
                type="Hamarosan"
                disabled
                icon={<Calculator className="w-6 h-6" />}
                color="slate"
              />
            </div>
          </section>

          <section>
            <SectionHeader number={4} title="Geometriai transzformációk" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Eltolás és forgatás"
                subtitle="Alapfogalmak"
                type="Kezdés"
                disabled
                icon={<MoveHorizontal className="w-6 h-6 rotate-45" />}
                color="indigo"
              />
            </div>
          </section>

          <section>
            <SectionHeader number={5} title="Középpontos tükrözés" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Pont és alakzat tükrözése"
                subtitle="Szerkesztési lépések"
                type="Kezdés"
                disabled
                icon={<MoveHorizontal className="w-6 h-6" />}
                color="violet"
              />
            </div>
          </section>

          <section>
            <SectionHeader number={6} title="Tengelyes tükrözés" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Szimmetria tengelyek"
                subtitle="Alakzatok tükrözése"
                type="Kezdés"
                disabled
                icon={<MoveHorizontal className="w-6 h-6 -rotate-45" />}
                color="rose"
              />
              <ActivityPlaceholder
                title="Egyenesek helyzete"
                subtitle="Párhuzamos és merőleges"
                type="Gyakorlás"
                onClick={() => handleActivitySelect('line-relationships', topicId)}
                icon={<MoveHorizontal className="w-6 h-6 rotate-45" />}
                color="rose"
              />
            </div>
          </section>

          <section>
            <SectionHeader number={7} title="Szabályos sokszögek" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Síkidom vagy Test?"
                subtitle="Szabályos alakzatok elkülönítése"
                type="Kezdés"
                onClick={() => handleActivitySelect('shape-classification', topicId)}
                icon={<Box className="w-6 h-6" />}
                color="teal"
              />
            </div>
          </section>

          <section>
            <SectionHeader number={8} title="Kör" color="red" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Kör és részei"
                subtitle="Sugár, átmérő, húr felismerése"
                type="Kezdés"
                onClick={() => handleActivitySelect('circle-parts', topicId)}
                icon={<Circle className="w-6 h-6" />}
                color="red"
              />
              <ActivityPlaceholder
                title="Kör területe, kerülete"
                subtitle="Számítási feladatok"
                type="Hamarosan"
                disabled
                icon={<Calculator className="w-6 h-6" />}
                color="slate"
              />
            </div>
          </section>
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
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => handleActivitySelect('divisibility-theory')}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-amber-50 rounded-xl text-amber-600 group-hover:scale-110 transition-transform">
              <BookOpen className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-sm">Tananyag</h4>
              <p className="text-[10px] text-slate-500">Hatványozás és oszthatóság elmélete</p>
            </div>
          </button>

          <button
            onClick={() => handleActivitySelect('divisibility')}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 group-hover:scale-110 transition-transform">
              <Calculator className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-sm">Oszthatóság</h4>
              <p className="text-[10px] text-slate-500">Szabályok és interaktív ellenőrző</p>
            </div>
          </button>

          <button
            onClick={() => handleActivitySelect('divisibility-factorization')}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 group-hover:scale-110 transition-transform">
              <Binary className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-sm">Prímtényezők</h4>
              <p className="text-[10px] text-slate-500">Számok felbontása prímszámokra</p>
            </div>
          </button>

          <button
            onClick={() => handleActivitySelect('divisibility-quiz')}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:shadow-md transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-1">
              <Sparkles className="w-3 h-3 text-rose-500 animate-pulse" />
            </div>
            <div className="p-3 bg-rose-50 rounded-xl text-rose-600 group-hover:scale-110 transition-transform">
              <Gamepad2 className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-sm">Kvíz Játék</h4>
              <p className="text-[10px] text-slate-500">Tedd próbára a tudásod!</p>
            </div>
          </button>

          <button
            onClick={() => handleActivitySelect('divisibility-matcher')}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-violet-50 rounded-xl text-violet-600 group-hover:scale-110 transition-transform">
              <Target className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-sm">Párosító Játék</h4>
              <p className="text-[10px] text-slate-500">Prímtényezők gyakorlása</p>
            </div>
          </button>

          <button
            onClick={() => handleActivitySelect('divisibility-gcdquiz')}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:shadow-md transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-1">
              <Sparkles className="w-3 h-3 text-rose-500 animate-pulse" />
            </div>
            <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-sm">LKÖ Kvíz</h4>
              <p className="text-[10px] text-slate-500">Legnagyobb közös osztó gyakorlása</p>
            </div>
          </button>

          <button
            onClick={() => handleActivitySelect('divisibility-lkktquiz')}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:shadow-md transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-1">
              <Sparkles className="w-3 h-3 text-rose-500 animate-pulse" />
            </div>
            <div className="p-3 bg-amber-50 rounded-xl text-amber-600 group-hover:scale-110 transition-transform">
              <Sparkles className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-sm">LKKT Kvíz</h4>
              <p className="text-[10px] text-slate-500">Legkisebb közös többszörös gyakorlása</p>
            </div>
          </button>
        </div>
      );
    }

    if (topicId === 'g6-fractions') {
      return (
        <div className="py-2">
          <FractionsModule
            onBack={handleBack}
            isInline
            onStartActivity={(type) => handleActivitySelect(type as ActivityType, topicId)}
          />
        </div>
      );
    }

    if (topicId === 'g6-geometry-symmetry') {
      return (
        <div className="py-2">
          <GeometryModule
            onBack={handleBack}
            isInline
            onStartActivity={(type) => handleActivitySelect(type as ActivityType, topicId)}
          />
        </div>
      );
    }

    if (topicId === 'g6-ratio-percent-word') {
      return (
        <div className="flex flex-col gap-10 py-6">
          <section>
            <SectionHeader number={1} title="Az arány fogalma" color="orange" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Arány felismerés"
                subtitle="Zászlók, poharak, kísérletek"
                type="Teszt"
                onClick={() => handleActivitySelect('ratio-intro', topicId)}
                icon={<Flag className="w-6 h-6" />}
                color="orange"
              />
              <ActivityPlaceholder
                title="Arány alkotó"
                subtitle="Színezés, keverés, elosztás"
                type="Interaktív"
                onClick={() => handleActivitySelect('ratio-creator', topicId)}
                icon={<Sparkles className="w-6 h-6" />}
                color="orange"
              />
            </div>
          </section>

          <section>
            <SectionHeader number={2} title="Arányos osztás" color="amber" />
            <div className="py-2">
              <MaterialGallery
                grade={6}
                onView={handleMaterialSelect}
              />
            </div>
          </section>

          <section>
            <SectionHeader number={3} title="Egyenes arányosság" color="yellow" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
              <ActivityPlaceholder
                title="Kvíz"
                subtitle="Egyenesen arányos?"
                type="Teszt"
                onClick={() => handleActivitySelect('direct-proportion-quiz', topicId)}
                icon={<Scale className="w-6 h-6" />}
                color="orange"
              />
            </div>
            <div className="py-2">
              <MaterialGallery
                grade={6}
                onView={handleMaterialSelect}
              />
            </div>
          </section>

          <section>
            <SectionHeader number={4} title="Egyenes arányosság grafikonja" color="lime" />
            <div className="py-2">
              <MaterialGallery
                grade={6}
                onView={handleMaterialSelect}
              />
            </div>
          </section>

          <section>
            <SectionHeader number={5} title="Szabályok, megfeleltetések" color="emerald" />
            <div className="py-2">
              <MaterialGallery
                grade={6}
                onView={handleMaterialSelect}
              />
            </div>
          </section>

          <section>
            <SectionHeader number={6} title="Törtrész" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Törtek vizuálisan"
                subtitle="Törtek ábrázolása"
                type="Eszköz"
                onClick={() => handleActivitySelect('fractions-visualizer', topicId)}
                icon={<Percent className="w-6 h-6" />}
                color="orange"
              />
            </div>
          </section>

          <section>
            <SectionHeader number={7} title="Százalékszámítás" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Mennyiségek"
                subtitle="Százalékérték számítás"
                type="Teszt"
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
                onClick={() => {
                  setPercentMode('calculate-rate');
                  handleActivitySelect('percentages', topicId);
                }}
                icon={<Percent className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Százalékalap"
                subtitle="Visszaszámolás az egészre"
                type="Teszt"
                onClick={() => {
                  setPercentMode('calculate-base');
                  handleActivitySelect('percentages', topicId);
                }}
                icon={<Percent className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>

          <section>
            <SectionHeader number={8} title="A százalékszámítás gyakorlása" color="pink" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Szöveges feladatok"
                subtitle="Gyakorlati problémák (%)"
                type="Gyakorlás"
                onClick={() => handleActivitySelect('percent-value-word-problems', topicId)}
                icon={<Percent className="w-6 h-6" />}
                color="pink"
              />
            </div>
          </section>

          <section>
            <SectionHeader number={9} title="Nyitott mondatok" color="violet" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Egyenletmegoldó"
                subtitle="Vizuális modell"
                type="Eszköz"
                onClick={() => handleActivitySelect('equation-solver', topicId)}
                icon={<Calculator className="w-6 h-6" />}
                color="violet"
              />
            </div>
          </section>

          <section>
            <SectionHeader number={10} title="Szöveges feladatok" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Matek Kvíz"
                subtitle="Vegyes szöveges feladatok"
                type="Teszt"
                onClick={() => handleActivitySelect('word-problems', topicId)}
                icon={<BookOpen className="w-6 h-6" />}
                color="teal"
              />
            </div>
          </section>

          <section>
            <SectionHeader number={11} title="Több megoldás is lehet" color="slate" />
            <div className="py-2">
              <MaterialGallery
                grade={6}
                onView={handleMaterialSelect}
              />
            </div>
          </section>

          <section>
            <SectionHeader number={12} title="Összefoglalás" color="indigo" />
            <div className="py-2">
              <MaterialGallery
                grade={6}
                onView={handleMaterialSelect}
              />
            </div>
          </section>
        </div>
      );
    }


    if (topicId === 'g6-measurements' || topicId === 'g6-statistics' || topicId === 'g6-finance') {
      return (
        <div className="py-2">
          <div className="mb-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <p className="text-sm font-medium text-blue-700 italic">Ehhez a témakörhöz jelenleg a tankönyvi anyagok érhetőek el.</p>
          </div>
          <MaterialGallery
            grade={6}
            onView={handleMaterialSelect}
            initialMaterialId={new URLSearchParams(location.search).get('material')}
          />
        </div>
      );
    }

    if (topicId === 'g7-rational-algebra') {
      return (
        <div className="flex flex-col gap-10 py-6">
          {/* Section 1 */}
          <section>
            <SectionHeader number={1} title="Racionális számok" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Racionális számok"
                subtitle="Műveletek ésszerűen"
                type="Kezdés"
                onClick={() => handleActivitySelect('g7-rational-numbers', topicId)}
                icon={<Calculator className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Pozitív és negatív számok"
                subtitle="Gyakorló feladatok"
                type="Hamarosan"
                disabled
                icon={<Target className="w-6 h-6" />}
                color="slate"
              />
              <ActivityPlaceholder
                title="Törtek és tizedestörtek"
                subtitle="Értékelő teszt"
                type="Teszt"
                disabled
                icon={<BookOpen className="w-6 h-6" />}
                color="slate"
              />
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <SectionHeader id="g7-expressions" number={2} title="Számok és betűs kifejezések használata" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Betűs kifejezések"
                subtitle="Változók használata"
                type="Kezdés"
                onClick={() => handleActivitySelect('g7-expression-usage', topicId)}
                icon={<Variable className="w-6 h-6" />}
                color="purple"
              />
              <ActivityPlaceholder
                title="Helyettesítési érték"
                subtitle="Számolás betűkkel"
                type="Gyakorlás"
                disabled
                icon={<Zap className="w-6 h-6" />}
                color="slate"
              />
            </div>
          </section>
        </div>
      );
    }

    if (topicId === 'g7-percent-equations' || topicId === 'percentages') {
      return (
        <div className="flex flex-col gap-10 py-6">
          <section>
            <SectionHeader id="g7-percent-val" number={1} title="Százalékérték" color="rose" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Százalékérték teszt"
                subtitle="Mennyi az alap adott %-a?"
                type="Teszt"
                onClick={() => {
                  setPercentMode('calculate-value');
                  handleActivitySelect('percentages', topicId);
                }}
                icon={<Percent className="w-6 h-6" />}
                color="rose"
              />
              <ActivityPlaceholder
                title="Szöveges feladatok"
                subtitle="10 feladat / szint"
                type="Gyakorlás"
                onClick={() => {
                  handleActivitySelect('percent-value-word-problems', topicId);
                }}
                icon={<BookOpen className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>

          <section>
            <SectionHeader id="g7-percent-rate" number={2} title="Százalékláb" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Százalékláb teszt"
                subtitle="Hány százaléka a rész az egésznek?"
                type="Teszt"
                onClick={() => {
                  setPercentMode('calculate-rate');
                  handleActivitySelect('percentages', topicId);
                }}
                icon={<Percent className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Szöveges feladatok"
                subtitle="10 feladat / szint"
                type="Gyakorlás"
                onClick={() => {
                  handleActivitySelect('percent-rate-word-problems', topicId);
                }}
                icon={<BookOpen className="w-6 h-6" />}
                color="emerald"
              />
            </div>
          </section>

          <section>
            <SectionHeader id="g7-percent-base" number={3} title="Százalékalap" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Százalékalap teszt"
                subtitle="Mennyi a 100%, ha ismerjük a részt?"
                type="Teszt"
                onClick={() => {
                  setPercentMode('calculate-base');
                  handleActivitySelect('percentages', topicId);
                }}
                icon={<Percent className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Szöveges feladatok"
                subtitle="10 feladat / szint"
                type="Gyakorlás"
                onClick={() => {
                  handleActivitySelect('percent-base-word-problems', topicId);
                }}
                icon={<BookOpen className="w-6 h-6" />}
                color="blue"
              />
            </div>
          </section>

          <section>
            <SectionHeader id="g7-equations" number={4} title="Egyenletek" color="indigo" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Egyenletmegoldás"
                subtitle="Mérlegelv szemléltetéssel"
                type="Kezdés"
                onClick={() => {
                  handleActivitySelect('equation-balance-quiz', topicId);
                }}
                icon={<Scale className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Szöveges egyenletek"
                subtitle="10 feladat / szint"
                type="Gyakorlás"
                onClick={() => {
                  handleActivitySelect('g7-word-problems', topicId);
                }}
                icon={<BookOpen className="w-6 h-6" />}
                color="indigo"
              />
            </div>
          </section>
        </div>
      );
    }

    if (topicId === 'g7-geometry') {
      return (
        <div className="py-2">
          <Grade7GeometryModule
            onBack={handleBack}
            isInline
            onStartActivity={(type) => handleActivitySelect(type as ActivityType, topicId)}
          />
        </div>
      );
    }

    if (topicId === 'g7-logic' || topicId === 'g7-stats' || topicId === 'g7-other') {
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

    if (topicId === 'g5-measurements') {
      return (
        <div className="flex flex-col gap-10 py-6">
          <section>
            <SectionHeader number={1} title="A hosszúság mérése" color="cyan" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Mértékegységek"
                subtitle="Hosszúság átváltás"
                type="Hamarosan"
                disabled
                icon={<Scale className="w-6 h-6" />}
                color="slate"
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
        </div>
      );
    }

    // Default fallback for Grade 5-7 topics that don't have custom interactive content yet
    if (topicId.startsWith('g5-') || selectedGrade === 6 || selectedGrade === 7) {
      return (
        <div className="py-2">
          <div className="mb-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-blue-500" />
            <p className="text-sm font-medium text-blue-700 italic">Ehhez a témakörhöz jelenleg a tankönyvi anyagok érhetőek el.</p>
          </div>
          <MaterialGallery
            grade={selectedGrade || 5}
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
        // Default for high school/graduation
        topics = mathTopics.filter(t => ['algebra', 'geometry', 'percentages', 'word-problems'].includes(t.id));
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
      (activityType === 'symmetry-construction' || activityType === 'perimeter-area') && "p-0 overflow-hidden h-screen"
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
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5 md:gap-3">
                    <SidebarMenu />
                    <Button
                      variant="ghost"
                      onClick={handleHome}
                      className="bg-white/10 text-white hover:bg-white/20 font-black px-2 md:px-4 border border-white/20 shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 md:gap-2"
                    >
                      <img src="/logo_header.png" alt="DiákZóna" className="h-10 md:h-16 object-contain translate-y-1.5 md:translate-y-2" />
                      <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tighter">Diákzóna</span>
                    </Button>
                  </div>

                  <div className="flex items-center gap-1 md:gap-2">
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
                    variant="secondary"
                    onClick={() => { window.location.assign('https://kviz.diakzona.hu/'); }}
                    className="bg-emerald-500 text-white hover:bg-emerald-600 font-extrabold px-3 md:px-6 shadow-lg shadow-emerald-500/30 border-none transition-all hover:scale-105 active:scale-95 h-9"
                  >
                    <span className="hidden sm:inline">online kvíz</span>
                    <span className="sm:hidden">kvíz</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Professional Sub-header for Navigation (no gap) */}
      {activityType !== 'symmetry-construction' && (
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
                    <span className="text-primary/70">{selectedGrade}. OSZTÁLY</span>
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
        activityType !== 'perimeter-area' && "container mx-auto px-4 py-8",
        "transition-all duration-500",
        (view === 'activity' || view === 'topic-select' || view === 'tools-select' || view === 'main-select') && activityType !== 'perimeter-area' ? "max-w-none lg:px-12" : (activityType === 'perimeter-area' ? "max-w-none p-0 w-full h-full" : "max-w-4xl")
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
                    </>
                  )
                })()}
              </div>
            </section>
          </div>
        )}

        {view === 'topic-select' && (() => {
          return (
            <div className="animate-slide-up pb-20 relative text-left">
              <div className="flex-1 transition-all duration-500">
                <div className="flex items-center gap-2 mb-8">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-2xl font-bold">Válaszd ki a témakört!</h2>
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
            { id: 'sec-creative', label: 'Kreatív', icon: <Sparkles className="w-4 h-4" /> },
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

                {/* 5. Interaktív / Kreatív eszközök */}
                <section>
                  <SectionHeader
                    id="sec-creative"
                    number={5}
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
              </div>
            </div>
          );
        })()}

        {view === 'games-select' && (
          <div className="animate-slide-up">
            <h2 className="font-display text-2xl font-bold mb-8 text-center flex items-center justify-center gap-3">
              <Sparkles className="w-7 h-7 text-pink-500" />
              Matematikai Játékok
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <div className="p-6 bg-white/50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center opacity-70">
                <div className="text-3xl mb-2">🏗️</div>
                <p className="text-sm font-bold text-slate-500">Toronyépítő</p>
                <p className="text-xs text-slate-400">Hamarosan érkezik...</p>
              </div>
            </div>
          </div>
        )}

        {view === 'competency-select' && (
          <div className="animate-slide-up space-y-8 pb-20">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl font-bold mb-4 flex items-center justify-center gap-3 text-slate-800">
                <Target className="w-8 h-8 text-emerald-500" />
                Kompetenciamérés Felkészítés
              </h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Készülj fel a mérésekre! Válaszd ki az évfolyamodat a folyamatosan elérhető tesztsorainkhoz.
              </p>
            </div>
            
            <div className="space-y-12">
              {[4, 5, 6, 7, 8].map(grade => {
                return (
                  <section key={grade} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group hover:border-emerald-200 transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-100 transition-colors"></div>
                    <SectionHeader number={grade} title={`${grade}. Osztály`} color="emerald" id={`comp-grade-${grade}`} />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 relative z-10">
                      {/* Havi mérés */}
                      {grade >= 4 && grade <= 7 && (
                        <ActivityPlaceholder
                          title="Szeptember - Június"
                          subtitle="10 feladatsor"
                          type="Kezdés"
                          onClick={() => {
                            handleActivitySelect('competency-assessment', `g${grade}-competency`, undefined, grade as GradeLevel);
                          }}
                          icon={<Target className="w-6 h-6 text-emerald-600" />}
                          color="emerald"
                        />
                      )}

                      {/* Témakörök (Grade 6) */}
                      {grade === 6 && (
                        <ActivityPlaceholder
                          title="Témakörök"
                          subtitle="Témakörönkénti felkészítés"
                          type="Kezdés"
                          onClick={() => {
                            handleActivitySelect('competency-topics-assessment', 'g6-competency', undefined, 6);
                          }}
                          icon={<Shapes className="w-6 h-6 text-blue-600" />}
                          color="blue"
                        />
                      )}
                      
                      {/* Próbamérés */}
                      {grade === 7 && COMPETENCY_DATA[7]?.some(m => m.id.includes('probameres')) && (
                        <ActivityPlaceholder
                          title="Próbamérés"
                          subtitle="Kiegészítő tesztek"
                          type="Kezdés"
                          onClick={() => {
                            handleActivitySelect('competency-mock-assessment', 'g7-competency', undefined, 7);
                          }}
                          icon={<Target className="w-6 h-6 text-indigo-600" />}
                          color="indigo"
                        />
                      )}
                      
                      {/* Várakozás üzenet */}
                      {grade === 8 && (
                        <div className="p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center opacity-70 col-span-2">
                          <div className="text-3xl mb-2">🚧</div>
                          <p className="text-sm font-bold text-slate-500">Hamarosan érkezik...</p>
                        </div>
                      )}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        )}

        {view === 'activity' && (
          <div className="animate-slide-up">
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
                  <DivisibilityPowersModule onBack={handleBack} initialView="factorization" />
                )}

                {activityType === 'divisibility-quiz' && (
                  <DivisibilityPowersModule onBack={handleBack} initialView="quiz" />
                )}

                {activityType === 'divisibility-matcher' && (
                  <DivisibilityPowersModule onBack={handleBack} initialView="matcher" />
                )}

                {activityType === 'divisibility-gcdquiz' && (
                  <DivisibilityPowersModule onBack={handleBack} initialView="gcdquiz" />
                )}

                {activityType === 'divisibility-lkktquiz' && (
                  <DivisibilityPowersModule onBack={handleBack} initialView="lkktquiz" />
                )}

                {activityType === 'triangle-angles-quiz' && (
                  <TriangleAnglesQuiz onBack={handleBack} />
                )}

                {activityType === 'word-problems' && (
                  <WordProblemsModule onBack={handleBack} />
                )}

                {activityType === 'g7-word-problems' && (
                  <WordProblemsQuiz onBack={handleBack} />
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

                {activityType === 'competency-assessment' && selectedGrade && (
                  (() => {
                    if (selectedGrade === 4) return <G4Monthly onBack={handleBack} grade={4} />;
                    if (selectedGrade === 5) return <G5Monthly onBack={handleBack} grade={5} />;
                    if (selectedGrade === 6) return <G6Monthly onBack={handleBack} grade={6} />;
                    if (selectedGrade === 7) return <G7Monthly onBack={handleBack} grade={7} />;
                    return <div className="p-10 text-center">8. évfolyam mérések hamarosan...</div>;
                  })()
                )}

                {activityType === 'competency-mock-assessment' && selectedGrade && (
                  (() => {
                    if (selectedGrade === 7) return <G7Mock onBack={handleBack} grade={7} />;
                    return <div className="p-10 text-center">Ebben az évfolyamban még nincs próbamérés.</div>;
                  })()
                )}

                {activityType === 'competency-topics-assessment' && selectedGrade === 6 && (
                  <G6Topics onBack={handleBack} grade={6} />
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

                {activityType === 'materials' && (
                  <MaterialGallery
                    grade={selectedGrade || 5}
                    onView={handleMaterialSelect}
                    initialMaterialId={new URLSearchParams(location.search).get('material')}
                  />
                )}

                {activeMaterial && (
                  <LessonViewer material={activeMaterial} onClose={() => handleMaterialSelect(null)} />
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
            )
            }
          </div>
        )}
        {((activityType !== 'symmetry-construction' && activityType !== 'perimeter-area' && activityType !== 'student-feedback') || view !== 'activity') && <SiteFooter />}
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
      className="flex items-center gap-6 p-6 bg-card rounded-2xl border-2 border-border hover:border-primary transition-all text-left shadow-sm group"
    >
      <div className={cn("p-4 rounded-xl transition-transform group-hover:scale-110", color)}>
        {icon}
      </div>
      <div>
        <h3 className="font-display font-bold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground leading-snug">{desc}</p>
      </div>
    </button>
  );
}


