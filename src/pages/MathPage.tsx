import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { SectionHeader } from '@/components/math/SectionHeader';
import { ActivityPlaceholder } from '@/components/math/ActivityPlaceholder';
import DecimalFractionsQuiz from '@/components/math/DecimalFractionsQuiz';
import DecimalMultiplicationQuiz from '@/components/math/DecimalMultiplicationQuiz';
import DecimalDivisionQuiz from '@/components/math/DecimalDivisionQuiz';
import { mathTopics } from '@/data/mathTopics';
import { MathTopicCard } from '@/components/math/MathTopicCard';
import { MathQuiz } from '@/components/math/MathQuiz';
import { GradeSelector } from '@/components/GradeSelector';
import { FractionVisualizer } from '@/components/math/FractionVisualizer';
import { FractionsModule } from '@/components/math/FractionsModule';
import { Grade1MathModule } from '@/components/math/Grade1MathModule';
import { Grade2MathModule } from '@/components/math/Grade2MathModule';
import { Grade3MathModule } from '@/components/math/Grade3MathModule';
import { AlgebraQuiz } from '@/components/math/AlgebraQuiz';
import { MathColoringGame } from '@/components/math/MathColoringGame';
import { DivisibilityTool } from '@/components/math/DivisibilityTool';
import { MaterialGallery } from '@/components/math/MaterialGallery';
import { LessonViewer } from '@/components/math/LessonViewer';
import { LongDivisionTool } from '@/components/math/LongDivisionTool';
import { MathSnakeGame } from '@/components/math/MathSnakeGame';
import { AngleMatcher } from '@/components/math/AngleMatcher';
import { ShapeClassifier } from '@/components/math/ShapeClassifier';
import { LineRelationships } from '@/components/math/LineRelationships';
import { DivisibilityPowersModule } from '@/components/math/DivisibilityPowersModule';
import { WordProblemsModule } from '@/components/math/WordProblemsModule';
import { TriangleClassifier } from '@/components/math/TriangleClassifier';
import { QuadrilateralClassifier } from '@/components/math/QuadrilateralClassifier';
import { CirclePartsGame } from '@/components/math/CirclePartsGame';
import { TriangleAnglesQuiz } from '@/components/math/TriangleAnglesQuiz';
import { DecimalFractionsTool } from '@/components/math/DecimalFractionsTool';
import { NumberLineTool } from '@/components/math/NumberLineTool';
import { ManipulativeDivision } from '@/components/math/ManipulativeDivision';
import { ConstructionTool } from '@/components/math/ConstructionTool';
import { PercentagesQuiz } from '@/components/math/PercentagesQuiz';
import { EquationSolverTool } from '@/components/math/EquationSolverTool';
import { EquationBalanceTool } from '@/components/math/EquationBalanceTool';
import { MoneyCalculationTool } from '@/components/math/MoneyCalculationTool';
import DecimalShifterTool from '@/components/math/DecimalShifterTool';
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
  Grid3X3,
  Columns,
  Coins,
  LayoutGrid
} from 'lucide-react';
import { cn } from '@/lib/utils';

type ViewState = 'main-select' | 'topic-select' | 'tools-select' | 'games-select' | 'activity' | 'geometry-select';
type ActivityType = 'quiz' | 'fractions' | 'algebra' | 'geometry' | 'percentages' | 'coloring' | 'divisibility' | 'materials' | 'long-division' | 'angle-matching' | 'shape-classification' | 'line-relationships' | 'divisibility-powers' | 'grade1-basic' | 'grade2-basic' | 'grade3-basic' | 'word-problems' | 'triangle-classification' | 'quadrilateral-classification' | 'snake-game' | 'circle-parts' | 'divisibility-theory' | 'divisibility-factorization' | 'divisibility-quiz' | 'divisibility-matcher' | 'divisibility-gcdquiz' | 'divisibility-lkktquiz' | 'triangle-angles-quiz' | 'g7-rational-numbers' | 'g7-expression-usage' | 'decimal-fractions' | 'number-line' | 'construction' | 'decimal-quiz' | 'decimal-multiplication-quiz' | 'decimal-division-quiz' | 'decimal-shifter' | 'manipulative-division' | 'equation-solver' | 'equation-balance' | 'money-calculation' | 'fractions-visualizer' | 'fractions-quiz' | 'fractions-multiplier' | 'fractions-visual-matcher' | 'fractions-divider' | 'decimal-multiplier' | 'decimal-divider' | 'decimal-multiplier-select' | 'decimal-divider-select' | 'grade1-addition10' | 'grade1-snake' | 'grade2-coloring' | 'grade2-quiz' | 'grade2-blocks' | 'grade2-snake' | 'grade3-coloring' | 'grade3-quiz' | 'grade3-blocks' | 'grade3-snake' | 'grade3-alapmuveletek' | 'grade3-tower-builder' | 'grade3-money-quiz' | 'grade3-money-level-select';

const gradeToSlug = (grade: GradeLevel): string => `${grade}-osztaly`;
const slugToGrade = (slug: string): GradeLevel | null => {
  const match = slug.match(/^(\d)-osztaly$/);
  return match ? parseInt(match[1]) as GradeLevel : null;
};

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

  const [percentMode, setPercentMode] = useState<'calculate-value' | 'calculate-rate' | 'calculate-base' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

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
          if (!((grade === 5 && topicParam.startsWith('g5-')) || grade === 6 || grade === 7)) {
            setActivityType(topicParam as ActivityType);
            setView('activity');
          }
        }
      } else {
        setView('topic-select');
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
    } else if (newView === 'activity' && !grade) {
      // Handle tool/game activity without grade
      const isGame = activity === 'snake-game';
      path = isGame ? `/jatekok/${topic || activity}` : `/eszkozok/${topic || activity}`;
    } else if (grade) {
      path = `/${gradeToSlug(grade)}`;
      if (topic) {
        path += `/${topic}`;
        if (newView === 'activity' && activity) {
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
    if (!forceActivity && ((selectedGrade === 5 && topicId.startsWith('g5-')) || selectedGrade === 6 || selectedGrade === 7)) {
      setExpandedTopicId(expandedTopicId === topicId ? null : topicId);
      // We don't necessarily update URL for expanded topics unless they are "terminal"
      return;
    }

    setSelectedTopic(topicId);
    window.scrollTo(0, 0);

    let finalActivityType: ActivityType = 'quiz';
    if (topicId === 'fractions') {
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
    } else {
      finalActivityType = 'quiz';
    }

    setActivityType(finalActivityType);
    setView('activity');
    updateURL('activity', selectedGrade, topicId, finalActivityType);
  };

  const handleActivitySelect = (type: ActivityType, topicId?: string) => {
    setActivityType(type);
    if (topicId) setSelectedTopic(topicId);
    setView('activity');
    updateURL('activity', selectedGrade, topicId || selectedTopic, type);
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
        nextTopic = null;
      } else if (location.pathname.startsWith('/eszkozok')) {
        nextView = 'tools-select';
        nextTopic = null;
      } else if (location.pathname.startsWith('/jatekok')) {
        nextView = 'games-select';
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
    } else if (view === 'tools-select' || view === 'games-select') {
      nextView = 'main-select';
      nextGrade = null;
      nextTopic = null;
    }

    setView(nextView);
    setSelectedGrade(nextGrade);
    setSelectedTopic(nextTopic);
    updateURL(nextView, nextGrade, nextTopic, null);
  };

  const renderTopicContent = (topicId: string) => {
    if (topicId === 'g5-integers') {
      return (
        <div className="flex flex-col gap-10 py-6">
          <section>
            <SectionHeader number={1} title="Alapműveletek" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Gyakorló Kvíz"
                subtitle="Összeadás, kivonás, szorzás, osztás"
                type="Teszt"
                onClick={() => handleActivitySelect('quiz')}
                icon={<Calculator className="w-6 h-6" />}
                color="blue"
              />
              <ActivityPlaceholder
                title="Írásbeli osztás"
                subtitle="Lépcsős osztás levezetése"
                type="Eszköz"
                onClick={() => handleActivitySelect('long-division')}
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
            <SectionHeader number={1} title="Geometriai Alapok" color="green" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Alapszerkesztés"
                subtitle="Körző és vonalzó használata"
                type="Eszköz"
                onClick={() => handleActivitySelect('construction')}
                icon={<Pencil className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Síkidom vagy Test?"
                subtitle="2D és 3D alakzatok"
                type="Játék"
                onClick={() => handleActivitySelect('shape-classification')}
                icon={<Box className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Egyenesek helyzete"
                subtitle="Párhuzamos és merőleges"
                type="Gyakorlás"
                onClick={() => handleActivitySelect('line-relationships')}
                icon={<MoveHorizontal className="w-6 h-6 rotate-45" />}
                color="green"
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
            <SectionHeader number={1} title="Arányosság és alkalmazása" color="teal" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Szöveges feladatok"
                subtitle="Gyakorlati problémák"
                type="Indítás"
                onClick={() => handleActivitySelect('word-problems')}
                icon={<Sparkles className="w-6 h-6" />}
                color="teal"
              />
              <ActivityPlaceholder
                title="Százalékszámítás"
                subtitle="Alap, érték, láb"
                type="Gyakorlás"
                onClick={() => { setPercentMode(null); handleActivitySelect('percentages'); }}
                icon={<Percent className="w-6 h-6" />}
                color="rose"
              />
            </div>
          </section>
        </div>
      );
    }

    if (topicId === 'g5-measurements' || topicId === 'g5-location-sequences' || topicId === 'g5-stats') {
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

    if (topicId === 'g7-geom-trans' || topicId === 'g7-geometry') {
      return (
        <div className="flex flex-col gap-10 py-6">
          <section>
            <SectionHeader number={1} title="Háromszögek nevezetes vonalai" color="blue" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
            <SectionHeader number={2} title="Háromszögek" color="emerald" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
            <SectionHeader number={3} title="Négyszögek" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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

    if (topicId === 'divisibility-powers') {
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
        </div>
      );
    }

    if (topicId === 'g7-powers-divisibility') {
      return (
        <div className="flex flex-col gap-10 py-6">
          <section>
            <SectionHeader number={1} title="Hatványozás és oszthatóság" color="amber" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Tananyag"
                subtitle="Elméleti összefoglaló"
                type="Kezdés"
                onClick={() => handleActivitySelect('divisibility-theory')}
                icon={<BookOpen className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Oszthatóság"
                subtitle="Interaktív ellenőrző"
                type="Gyakorlás"
                onClick={() => handleActivitySelect('divisibility')}
                icon={<Calculator className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Prímtényezők"
                subtitle="Felbontás prímszámokra"
                type="Gyakorlás"
                onClick={() => handleActivitySelect('divisibility-factorization')}
                icon={<Binary className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Kvíz Játék"
                subtitle="Tudd le a tudásod!"
                type="Teszt"
                onClick={() => handleActivitySelect('divisibility-quiz')}
                icon={<Gamepad2 className="w-6 h-6" />}
                color="rose"
              />
              <ActivityPlaceholder
                title="Párosító Játék"
                subtitle="Prímtényezők gyakorlása"
                type="Teszt"
                onClick={() => handleActivitySelect('divisibility-matcher')}
                icon={<Target className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="LKÖ Kvíz"
                subtitle="Legnagyobb közös osztó"
                type="Teszt"
                onClick={() => handleActivitySelect('divisibility-gcdquiz')}
                icon={<Zap className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="LKKT Kvíz"
                subtitle="Legkisebb közös többszörös"
                type="Teszt"
                onClick={() => handleActivitySelect('divisibility-lkktquiz')}
                icon={<Sparkles className="w-6 h-6" />}
                color="amber"
              />
            </div>
          </section>
        </div>
      );
    }

    if (topicId === 'materials') {
      return (
        <div className="py-2">
          <MaterialGallery
            grade={selectedGrade || 6}
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Racionális számok"
                subtitle="Műveletek ésszerűen"
                type="Kezdés"
                onClick={() => handleActivitySelect('g7-rational-numbers')}
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
            <SectionHeader number={2} title="Számok és betűs kifejezések használata" color="purple" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <ActivityPlaceholder
                title="Betűs kifejezések"
                subtitle="Változók használata"
                type="Kezdés"
                onClick={() => handleActivitySelect('g7-expression-usage')}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => {
              setPercentMode('calculate-value');
              handleActivitySelect('percentages', topicId);
            }}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-rose-50 rounded-xl text-rose-600 group-hover:scale-110 transition-transform">
              <Percent className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-sm">Százalékérték</h4>
              <p className="text-[10px] text-slate-500">Mennyi az alap adott %-a?</p>
            </div>
          </button>

          <button
            onClick={() => {
              setPercentMode('calculate-rate');
              handleActivitySelect('percentages', topicId);
            }}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600 group-hover:scale-110 transition-transform">
              <Percent className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-sm">Százalékláb</h4>
              <p className="text-[10px] text-slate-500">Hány százaléka a rész az egésznek?</p>
            </div>
          </button>

          <button
            onClick={() => {
              setPercentMode('calculate-base');
              handleActivitySelect('percentages', topicId);
            }}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:scale-110 transition-transform">
              <Percent className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-sm">Alap kiszámítása</h4>
              <p className="text-[10px] text-slate-500">Mennyi a 100%, ha ismerjük a részt?</p>
            </div>
          </button>
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

  const getSearchResults = () => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return mathTopics.filter(t =>
      t.title.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query)
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-gradient-math text-white py-4 px-4 shadow-xl relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full -ml-24 -mb-24 blur-2xl pointer-events-none"></div>

        <div className="container max-w-5xl mx-auto relative z-10">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={handleHome}
                className="bg-white/10 text-white hover:bg-white/20 font-black px-4 border border-white/20 shadow-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <LayoutGrid className="w-4 h-4" />
                DIÁKZÓNA
              </Button>

              {view !== 'main-select' && (
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  className="text-white hover:bg-white/20 transition-all border border-white/10"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Vissza
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div ref={searchRef} className="relative hidden sm:flex items-center group">
                <input
                  type="text"
                  placeholder="Keresés..."
                  value={searchQuery}
                  onFocus={() => setShowResults(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(true);
                  }}
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
                  <button className="p-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-all shadow-sm">
                    <Search className="w-4 h-4" />
                  </button>
                </div>

                {/* Dropdown Results */}
                {showResults && searchQuery.trim() !== '' && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="max-h-[320px] overflow-y-auto p-2">
                      {getSearchResults().length > 0 ? (
                        getSearchResults().map(topic => (
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
                    </div>
                  </div>
                )}
              </div>
              <Button
                variant="secondary"
                onClick={() => { window.location.assign('https://kviz.diakzona.hu/'); }}
                className="bg-emerald-500 text-white hover:bg-emerald-600 font-extrabold px-6 shadow-lg shadow-emerald-500/30 border-none transition-all hover:scale-105 active:scale-95"
              >
                online kvíz
              </Button>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative p-1 bg-white/10 rounded-full backdrop-blur-sm">
                <img
                  src="/istvan.jpg"
                  alt="Orsós István"
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white/50 shadow-2xl"
                  onError={(e) => {
                    // Fallback to calculator icon if image is missing
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const iconContainer = document.createElement('div');
                      iconContainer.className = "p-6 bg-white/20 rounded-full";
                      iconContainer.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calculator"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>';
                      parent.appendChild(iconContainer);
                    }
                  }}
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium mb-3 backdrop-blur-sm border border-white/10">
                <Sparkles className="w-3 h-3 text-yellow-300" />
                <span>Interaktív Tanulási Platform</span>
              </div>
              <h1 className="font-display text-2xl md:text-3xl font-black mb-2 tracking-tight">
                Matematika
              </h1>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-white/90">
                <p className="text-base font-medium">
                  {view === 'main-select' && 'Válassz évfolyamot vagy eszközt!'}
                  {view === 'topic-select' && selectedGrade && `${selectedGrade === 'graduation' ? 'Érettségi' : selectedGrade + '. osztályos'} tananyag`}
                  {view === 'tools-select' && 'Interaktív eszközök és modulok'}
                  {view === 'games-select' && 'Játékos tanulás és gyakorlás'}
                  {view === 'geometry-select' && 'Válassz geometriai feladatot!'}
                  {view === 'activity' && currentTopic?.title}
                </p>
                <div className="hidden md:block w-1.5 h-1.5 bg-white/30 rounded-full"></div>
                <p className="text-white/70 text-sm md:text-base italic">
                  a weboldalt készítette: <span className="text-white font-bold not-italic">Orsós István</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={cn(
        "container mx-auto px-4 py-8 transition-all duration-500",
        view === 'activity' ? "max-w-[1400px]" : "max-w-4xl"
      )}>
        {view === 'main-select' && (
          <div className="animate-slide-up space-y-12">
            <section>
              <h2 className="font-display text-xl font-bold mb-8 text-center">
                Melyik szinten szeretnél gyakorolni?
              </h2>
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
          </div>
        )}

        {view === 'topic-select' && (
          <div className="animate-slide-up">
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
                  {((selectedGrade === 5 && topic.id.startsWith('g5-')) || selectedGrade === 6 || selectedGrade === 7) && renderTopicContent(topic.id)}
                </MathTopicCard>
              ))}
              {getFilteredTopics().length === 0 && (
                <div className="text-center py-12 p-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  <p className="text-slate-500">Ehhez az évfolyamhoz még nincsenek feltöltve specifikus témakörök.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'tools-select' && (
          <div className="animate-slide-up">
            <h2 className="font-display text-xl font-bold mb-8 text-center flex items-center justify-center gap-3">
              <Settings2 className="w-7 h-7" />
              Speciális Eszközök
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ToolCard
                title="Törtek"
                desc="Törtek szemléltetése és összehasonlítása"
                icon={<Calculator className="w-8 h-8" />}
                color="bg-orange-100 text-orange-600"
                onClick={() => handleToolSelect('fractions')}
              />
              <ToolCard
                title="Oszthatóság"
                desc="Számok oszthatóságának vizsgálata maradékkal"
                icon={<Calculator className="w-8 h-8" />}
                color="bg-emerald-100 text-emerald-600"
                onClick={() => handleToolSelect('divisibility')}
              />
              <ToolCard
                title="Írásbeli osztás"
                desc="Lépcsős osztás levezetése egyjegyű osztóval"
                icon={<Calculator className="w-8 h-8" />}
                color="bg-indigo-100 text-indigo-600"
                onClick={() => handleToolSelect('long-division')}
              />
              <ToolCard
                title="Algebra"
                desc="Egyenletek és kifejezések gyakorlása"
                icon={<Variable className="w-8 h-8" />}
                color="bg-purple-100 text-purple-600"
                onClick={() => handleToolSelect('algebra')}
              />
              <ToolCard
                title="Geometria"
                desc="Interaktív alakzatok és számítások"
                icon={<Shapes className="w-8 h-8" />}
                color="bg-green-100 text-green-600"
                onClick={() => handleToolSelect('geometry')}
              />
              <ToolCard
                title="Százalékszámítás"
                desc="Arányok és százalékok vizualizációja"
                icon={<Percent className="w-8 h-8" />}
                color="bg-pink-100 text-pink-600"
                onClick={() => handleToolSelect('percentages')}
              />
              <ToolCard
                title="Egyenletmegoldó (Téglalapos)"
                desc="Lépésről lépésre, téglalapos lerakós módszer"
                icon={<Columns className="w-8 h-8" />}
                color="bg-purple-100 text-purple-600"
                onClick={() => handleToolSelect('equation-solver')}
              />
              <ToolCard
                title="Tizedestörtek"
                desc="Helyiértékek, átváltások korongokkal"
                icon={<span className="text-2xl">🪙</span>}
                color="bg-amber-100 text-amber-700"
                onClick={() => handleToolSelect('decimal-fractions')}
              />
              <ToolCard
                title="Számegyenes"
                desc="Egész számok összeadása és kivonása"
                icon={<span className="text-2xl">➖</span>}
                color="bg-blue-100 text-blue-600"
                onClick={() => handleToolSelect('number-line')}
              />
              <ToolCard
                title="Alapszerkesztés"
                desc="Szerkesztés körzővel és vonalzóval"
                icon={<Pencil className="w-8 h-8" />}
                color="bg-indigo-100 text-indigo-600"
                onClick={() => handleToolSelect('construction')}
              />
              <ToolCard
                title="Osztás vizuálisan"
                desc="Helyiérték-blokkokkal és szétbontással"
                icon={<Grid3X3 className="w-8 h-8" />}
                color="bg-blue-100 text-blue-600"
                onClick={() => handleToolSelect('manipulative-division')}
              />
              <ToolCard
                title="Tizedesvessző-eltoló"
                desc="Szorzás és osztás 10, 100, 1000-rel"
                icon={<span className="text-2xl">↔️</span>}
                color="bg-primary/10 text-primary"
                onClick={() => handleToolSelect('decimal-shifter')}
              />
              <ToolCard
                title="Mérlegelv"
                desc="Egyenletmegoldás kétkarú mérleggel"
                icon={<Scale className="w-8 h-8" />}
                color="bg-indigo-100 text-indigo-600"
                onClick={() => handleToolSelect('equation-balance')}
              />
              <ToolCard
                title="Pénztár"
                desc="Kifizetések és visszajáró gyakorlása"
                icon={<Coins className="w-8 h-8" />}
                color="bg-amber-50 text-amber-600"
                onClick={() => handleToolSelect('money-calculation')}
              />
            </div>
          </div>
        )}

        {view === 'games-select' && (
          <div className="animate-slide-up">
            <h2 className="font-display text-2xl font-bold mb-8 text-center flex items-center justify-center gap-3">
              <Sparkles className="w-7 h-7 text-pink-500" />
              Matematikai Játékok
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ToolCard
                title="Matek Kígyó"
                desc="Gyűjtsd össze a helyes válaszokat a kígyóval!"
                icon={<span className="text-3xl">🐍</span>}
                color="bg-emerald-100 border-emerald-200"
                onClick={() => handleActivitySelect('snake-game')}
              />
              <div className="p-6 bg-white/50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center opacity-70">
                <div className="text-3xl mb-2">🏗️</div>
                <p className="text-sm font-bold text-slate-500">Toronyépítő</p>
                <p className="text-xs text-slate-400">Hamarosan érkezik...</p>
              </div>
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

                {activityType === 'number-line' && (
                  <NumberLineTool onBack={handleBack} />
                )}

                {activityType === 'construction' && (
                  <ConstructionTool onBack={handleBack} />
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

                {activityType === 'equation-balance' && (
                  <EquationBalanceTool onBack={handleBack} />
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

                {activityType === 'quiz' && (
                  <MathQuiz
                    grade={typeof selectedGrade === 'number' ? selectedGrade : 5}
                    type="mixed"
                    onComplete={handleQuizComplete}
                    onBack={handleBack}
                  />
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
          </div>
        )}
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


