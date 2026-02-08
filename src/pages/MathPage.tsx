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
  Gamepad2
} from 'lucide-react';
import { cn } from '@/lib/utils';

type ViewState = 'main-select' | 'topic-select' | 'tools-select' | 'games-select' | 'activity' | 'geometry-select';
type ActivityType = 'quiz' | 'fractions' | 'algebra' | 'geometry' | 'percentages' | 'coloring' | 'divisibility' | 'materials' | 'long-division' | 'angle-matching' | 'shape-classification' | 'line-relationships' | 'divisibility-powers' | 'grade1-basic' | 'grade2-basic' | 'grade3-basic' | 'word-problems' | 'triangle-classification' | 'quadrilateral-classification' | 'snake-game' | 'circle-parts';

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
    if (selectedGrade === 6) {
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
    if (topicId === 'geometry') {
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
              setSelectedTopic('divisibility-powers');
              setActivityType('divisibility-powers');
              setView('activity');
            }}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-amber-50 rounded-xl text-amber-600 group-hover:scale-110 transition-transform">
              <BookOpen className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-sm">Tananyag</h4>
              <p className="text-[10px] text-slate-500">Elméleti összefoglaló</p>
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
              <p className="text-[10px] text-slate-500">Szabályok és ellenőrző</p>
            </div>
          </button>

          <button
            onClick={() => {
              setActivityType('divisibility-powers');
              setView('activity');
              // This will open the module which defaults to menu, 
              // but we want to go straight to factorization if possible.
              // However, the module handles its own internal routing.
              // For now, let's just make it go to the module.
            }}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:shadow-md transition-all group"
          >
            <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 group-hover:scale-110 transition-transform">
              <Binary className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-sm">Prímtényezők</h4>
              <p className="text-[10px] text-slate-500">Felbontás prímszámokra</p>
            </div>
          </button>

          <button
            onClick={() => {
              setActivityType('divisibility-powers');
              setView('activity');
            }}
            className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl border border-slate-100 hover:border-primary hover:shadow-md transition-all group"
          >
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
              setActivityType('divisibility-powers');
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
              onClick={() => { window.location.href = 'https://matek.diakzona.hu'; }}
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
                  {selectedGrade === 6 && renderTopicContent(topic.id)}
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
