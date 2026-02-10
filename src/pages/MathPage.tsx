import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { QuizResult, GradeLevel } from '@/types/education';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Calculator,
  Wrench,
  Shapes,
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
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

type ViewState = 'main-select' | 'topic-select' | 'tools-select' | 'games-select' | 'activity' | 'geometry-select';
type ActivityType = 'quiz' | 'fractions' | 'algebra' | 'geometry' | 'percentages' | 'coloring' | 'divisibility' | 'materials' | 'long-division' | 'angle-matching' | 'shape-classification' | 'line-relationships' | 'divisibility-powers' | 'grade1-basic' | 'grade2-basic' | 'grade3-basic' | 'word-problems' | 'triangle-classification' | 'quadrilateral-classification' | 'snake-game' | 'circle-parts' | 'divisibility-theory' | 'divisibility-factorization' | 'divisibility-quiz' | 'divisibility-matcher' | 'divisibility-gcdquiz' | 'divisibility-lkktquiz' | 'triangle-angles-quiz' | 'g7-rational-numbers' | 'g7-expression-usage';

export default function MathPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<ViewState>('main-select');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | null>(null);
  const [activityType, setActivityType] = useState<ActivityType>('quiz');
  const [activeMaterial, setActiveMaterial] = useState<{ title: string, path: string } | null>(null);
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);

  const currentTopic = mathTopics.find(t => t.id === selectedTopic);

  const handleGradeSelect = (grade: GradeLevel) => {
    setSelectedGrade(grade);
    setView('topic-select');
    setExpandedTopicId(null);
  };

  const handleTopicSelect = (topicId: string) => {
    if (selectedGrade === 6 || selectedGrade === 7) {
      setExpandedTopicId(expandedTopicId === topicId ? null : topicId);
      return;
    }

    setSelectedTopic(topicId);

    if (topicId === 'fractions') {
      setActivityType('fractions');
      setView('activity');
    } else if (topicId === 'basic-operations' && selectedGrade === 1) {
      setActivityType('grade1-basic');
      setView('activity');
    } else if (topicId === 'basic-operations' && selectedGrade === 2) {
      setActivityType('grade2-basic');
      setView('activity');
    } else if (topicId === 'basic-operations' && selectedGrade === 3) {
      setActivityType('grade3-basic');
      setView('activity');
    } else if (topicId === 'algebra') {
      setActivityType('algebra');
      setView('activity');
    } else if (topicId === 'geometry') {
      setActivityType('geometry');
      setView('activity');
    } else if (topicId === 'percentages') {
      setActivityType('percentages');
      setView('activity');
    } else if (topicId === 'divisibility') {
      setActivityType('divisibility');
      setView('activity');
    } else if (topicId === 'materials') {
      setActivityType('materials');
      setView('activity');
    } else if (topicId === 'long-division') {
      setActivityType('long-division');
      setView('activity');
    } else if (topicId === 'line-relationships') {
      setActivityType('line-relationships');
      setView('activity');
    } else if (topicId === 'divisibility-powers') {
      setActivityType('divisibility-powers');
      setView('activity');
    } else {
      setActivityType('quiz');
      setView('activity');
    }
  };

  const handleToolSelect = (toolId: string) => {
    setSelectedGrade(null);
    handleTopicSelect(toolId);
  };

  const handleQuizComplete = (result: QuizResult) => {
    console.log('Quiz completed:', result);
  };

  const handleBack = () => {
    if (view === 'activity') {
      if (activityType === 'materials' && activeMaterial) {
        setActiveMaterial(null);
      } else if (selectedTopic === 'geometry' && selectedGrade === 6) {
        setView('geometry-select');
      } else if (selectedGrade) {
        setView('topic-select');
      } else {
        setView('tools-select');
      }
    } else if (view === 'geometry-select') {
      setView('topic-select');
    } else if (view === 'topic-select') {
      setView('main-select');
      setSelectedGrade(null);
    } else if (view === 'tools-select' || view === 'games-select') {
      setView('main-select');
    }
    // No navigation to '/' as this is now the root
  };

  const renderTopicContent = (topicId: string) => {
    if (topicId === 'geometry' || topicId === 'g7-other') {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => {
              setActivityType('shape-classification');
              setView('activity');
            }}
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
            onClick={() => {
              setActivityType('angle-matching');
              setView('activity');
            }}
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
            onClick={() => {
              setActivityType('triangle-classification');
              setView('activity');
            }}
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
            onClick={() => {
              setActivityType('quadrilateral-classification');
              setView('activity');
            }}
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
            onClick={() => {
              setActivityType('line-relationships');
              setView('activity');
            }}
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
            onClick={() => {
              setActivityType('circle-parts');
              setView('activity');
            }}
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
            onClick={() => {
              setActivityType('triangle-angles-quiz');
              setView('activity');
            }}
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
                onClick={() => { setActivityType('triangle-classification'); setView('activity'); }}
                icon={<Triangle className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Háromszögek szögei"
                subtitle="Belső és külső szögek"
                type="Teszt"
                onClick={() => { setActivityType('triangle-angles-quiz'); setView('activity'); }}
                icon={<Sparkles className="w-6 h-6 text-amber-500" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Szögtípusok"
                subtitle="Felismerés és párosítás"
                type="Gyakorlás"
                onClick={() => { setActivityType('angle-matching'); setView('activity'); }}
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
                onClick={() => { setActivityType('quadrilateral-classification'); setView('activity'); }}
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
                onClick={() => { setActivityType('line-relationships'); setView('activity'); }}
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
                onClick={() => { setActivityType('shape-classification'); setView('activity'); }}
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
                onClick={() => { setActivityType('circle-parts'); setView('activity'); }}
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
            onClick={() => {
              setActivityType('word-problems');
              setView('activity');
            }}
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
            onClick={() => {
              setActivityType('divisibility-theory');
              setView('activity');
            }}
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
            onClick={() => {
              setActivityType('divisibility');
              setView('activity');
            }}
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
            onClick={() => {
              setActivityType('divisibility-factorization');
              setView('activity');
            }}
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
            onClick={() => {
              setActivityType('divisibility-quiz');
              setView('activity');
            }}
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
            onClick={() => {
              setActivityType('divisibility-matcher');
              setView('activity');
            }}
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
            onClick={() => {
              setActivityType('divisibility-gcdquiz');
              setView('activity');
            }}
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
                onClick={() => { setActivityType('divisibility-theory'); setView('activity'); }}
                icon={<BookOpen className="w-6 h-6" />}
                color="amber"
              />
              <ActivityPlaceholder
                title="Oszthatóság"
                subtitle="Interaktív ellenőrző"
                type="Gyakorlás"
                onClick={() => { setActivityType('divisibility'); setView('activity'); }}
                icon={<Calculator className="w-6 h-6" />}
                color="emerald"
              />
              <ActivityPlaceholder
                title="Prímtényezők"
                subtitle="Felbontás prímszámokra"
                type="Gyakorlás"
                onClick={() => { setActivityType('divisibility-factorization'); setView('activity'); }}
                icon={<Binary className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="Kvíz Játék"
                subtitle="Tudd le a tudásod!"
                type="Teszt"
                onClick={() => { setActivityType('divisibility-quiz'); setView('activity'); }}
                icon={<Gamepad2 className="w-6 h-6" />}
                color="rose"
              />
              <ActivityPlaceholder
                title="Párosító Játék"
                subtitle="Prímtényezők gyakorlása"
                type="Teszt"
                onClick={() => { setActivityType('divisibility-matcher'); setView('activity'); }}
                icon={<Target className="w-6 h-6" />}
                color="violet"
              />
              <ActivityPlaceholder
                title="LKÖ Kvíz"
                subtitle="Legnagyobb közös osztó"
                type="Teszt"
                onClick={() => { setActivityType('divisibility-gcdquiz'); setView('activity'); }}
                icon={<Zap className="w-6 h-6" />}
                color="indigo"
              />
              <ActivityPlaceholder
                title="LKKT Kvíz"
                subtitle="Legkisebb közös többszörös"
                type="Teszt"
                onClick={() => { setActivityType('divisibility-lkktquiz'); setView('activity'); }}
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
          <MaterialGallery grade={selectedGrade || 6} onView={(m) => setActiveMaterial(m)} />
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
                onClick={() => { setActivityType('g7-rational-numbers'); setView('activity'); }}
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
                onClick={() => { setActivityType('g7-expression-usage'); setView('activity'); }}
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

    if (topicId === 'g7-percent-equations') {
      return (
        <div className="flex justify-center py-4">
          <button
            onClick={() => {
              setActivityType('percentages');
              setView('activity');
            }}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-rose-50 rounded-xl text-rose-600 group-hover:scale-110 transition-transform">
              <Percent className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-sm">Százalékszámítás</h4>
              <p className="text-[10px] text-slate-500">Arányok és százalékok</p>
            </div>
          </button>
        </div>
      );
    }

    if (topicId === 'g7-logic' || topicId === 'g7-stats' || topicId === 'g7-other') {
      return (
        <div className="py-2">
          <MaterialGallery grade={7} onView={(m) => setActiveMaterial(m)} />
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
    if (!selectedGrade) return mathTopics;

    if (typeof selectedGrade === 'number') {
      return mathTopics.filter(t => t.grades.includes(selectedGrade));
    }

    // Default for high school/graduation
    return mathTopics.filter(t => ['algebra', 'geometry', 'percentages', 'word-problems'].includes(t.id));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-gradient-math text-white py-12 px-4 shadow-xl relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full -ml-24 -mb-24 blur-2xl pointer-events-none"></div>

        <div className="container max-w-5xl mx-auto relative z-10">
          <div className="flex justify-between items-start mb-6">
            {view !== 'main-select' ? (
              <Button
                variant="ghost"
                onClick={handleBack}
                className="text-white hover:bg-white/20 transition-all"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Vissza
              </Button>
            ) : (
              <div></div>
            )}
            <Button
              variant="secondary"
              onClick={() => { window.location.assign('https://kviz.diakzona.hu/'); }}
              className="bg-emerald-500 text-white hover:bg-emerald-600 font-extrabold px-6 shadow-lg shadow-emerald-500/30 border-none transition-all hover:scale-105 active:scale-95"
            >
              online kvíz
            </Button>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
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
              <h1 className="font-display text-4xl md:text-5xl font-black mb-2 tracking-tight">
                Matematika
              </h1>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-white/90">
                <p className="text-lg font-medium">
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
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {view === 'main-select' && (
          <div className="animate-slide-up space-y-12">
            <section>
              <h2 className="font-display text-2xl font-bold mb-8 text-center">
                Melyik szinten szeretnél gyakorolni?
              </h2>
              <GradeSelector
                selectedGrade={selectedGrade}
                onSelectGrade={handleGradeSelect}
              />
            </section>

            <section className="pt-4 border-t border-slate-100 flex flex-col md:flex-row gap-4">
              <Button
                onClick={() => setView('tools-select')}
                className="flex-1 h-20 text-lg font-bold gap-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/20 group transition-all"
              >
                <div className="p-2 bg-white/10 rounded-lg group-hover:rotate-12 transition-transform">
                  <Wrench className="w-6 h-6" />
                </div>
                Matek Eszközök
                <ChevronRight className="w-6 h-6 ml-auto" />
              </Button>

              <Button
                onClick={() => setView('games-select')}
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
                  {(selectedGrade === 6 || selectedGrade === 7) && renderTopicContent(topic.id)}
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
            <h2 className="font-display text-2xl font-bold mb-8 text-center flex items-center justify-center gap-3">
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
                title="Egyenletmegoldás"
                desc="Lépésről lépésre segítő megoldó"
                icon={<Calculator className="w-8 h-8" />}
                color="bg-blue-100 text-blue-600"
                onClick={() => handleToolSelect('algebra')}
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
                onClick={() => {
                  setActivityType('snake-game');
                  setView('activity');
                }}
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
            {activityType === 'fractions' && (
              <FractionsModule onBack={handleBack} />
            )}

            {activityType === 'grade1-basic' && (
              <Grade1MathModule onBack={handleBack} />
            )}

            {activityType === 'grade2-basic' && (
              <Grade2MathModule onBack={handleBack} />
            )}

            {activityType === 'grade3-basic' && (
              <Grade3MathModule onBack={handleBack} />
            )}


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

            {activityType === 'materials' && (
              <MaterialGallery grade={selectedGrade || 5} onView={(m) => setActiveMaterial(m)} />
            )}

            {activeMaterial && (
              <LessonViewer material={activeMaterial} onClose={() => setActiveMaterial(null)} />
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
              <div className="text-center py-12 bg-card rounded-2xl border border-border">
                <div className="text-6xl mb-4">📊</div>
                <h2 className="font-display text-2xl font-bold mb-2">Százalékszámítás modul</h2>
                <p className="text-muted-foreground mb-6">
                  Egy interaktív kalkulátor hamarosan elérhető lesz itt!
                </p>
                <Button onClick={handleBack}>Vissza</Button>
              </div>
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
    </div>
  );
}

function ToolCard({ title, desc, icon, color, onClick }: any) {
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

function ActivityPlaceholder({ title, subtitle, type, icon, color, onClick, disabled }: any) {
  const colorClasses: any = {
    blue: "bg-blue-50 text-blue-600 border-blue-100 group-hover:border-blue-300",
    purple: "bg-purple-50 text-purple-600 border-purple-100 group-hover:border-purple-300",
    emerald: "bg-emerald-50 text-emerald-600 border-emerald-100 group-hover:border-emerald-300",
    amber: "bg-amber-50 text-amber-600 border-amber-100 group-hover:border-amber-300",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100 group-hover:border-indigo-300",
    violet: "bg-violet-50 text-violet-600 border-violet-100 group-hover:border-violet-300",
    rose: "bg-rose-50 text-rose-600 border-rose-100 group-hover:border-rose-300",
    teal: "bg-teal-50 text-teal-600 border-teal-100 group-hover:border-teal-300",
    red: "bg-red-50 text-red-600 border-red-100 group-hover:border-red-300",
    slate: "bg-slate-50 text-slate-400 border-slate-100 opacity-60"
  };

  const typeClasses: any = {
    "Kezdés": "text-emerald-600",
    "Teszt": "text-rose-600",
    "Gyakorlás": "text-blue-600",
    "Hamarosan": "text-slate-400"
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={cn(
        "flex flex-col bg-white rounded-xl border-b-2 border border-slate-200 transition-all text-left overflow-hidden group h-full",
        !disabled ? "hover:border-primary hover:-translate-y-0.5 active:translate-y-0 active:border-b-0 cursor-pointer shadow-sm hover:shadow-md" : "cursor-not-allowed"
      )}
    >
      <div className={cn("h-24 w-full flex items-center justify-center transition-colors relative overflow-hidden", colorClasses[color] || colorClasses.slate)}>
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="p-2.5 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm group-hover:scale-110 transition-transform">
          {icon}
        </div>
        {type && (
          <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-white/90 backdrop-blur-sm rounded text-[8px] font-bold shadow-sm">
            {type}
          </div>
        )}
      </div>
      <div className="p-2.5 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-[11px] text-slate-800 group-hover:text-primary transition-colors leading-tight line-clamp-2">{title}</h4>
          <p className="text-[9px] text-slate-400 mt-0.5 line-clamp-1">{subtitle}</p>
        </div>
        <div className="mt-2 pt-2 border-t border-slate-50 flex items-center justify-between">
          <span className={cn("text-[8px] font-bold tracking-wider", typeClasses[type] || "text-slate-400")}>
            {type === 'Kezdés' ? 'INDÍTÁS »' : (type === 'Teszt' ? 'FELADATOK »' : (type === 'Gyakorlás' ? 'GYAKORLAT »' : 'VÁRÓ...'))}
          </span>
        </div>
      </div>
    </button>
  );
}

function SectionHeader({ number, title, color }: { number: number, title: string, color: string }) {
  const colorMap: any = {
    blue: "bg-blue-100 text-blue-600 border-blue-200",
    emerald: "bg-emerald-100 text-emerald-600 border-emerald-200",
    amber: "bg-amber-100 text-amber-600 border-amber-200",
    indigo: "bg-indigo-100 text-indigo-600 border-indigo-200",
    violet: "bg-violet-100 text-violet-600 border-violet-200",
    rose: "bg-rose-100 text-rose-600 border-rose-200",
    teal: "bg-teal-100 text-teal-600 border-teal-200",
    red: "bg-red-100 text-red-600 border-red-200"
  };

  return (
    <div className="flex items-center gap-3 mb-6">
      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-sm border", colorMap[color] || colorMap.blue)}>
        {number}
      </div>
      <h3 className="text-xl font-bold text-slate-800">{title}</h3>
    </div>
  );
}
