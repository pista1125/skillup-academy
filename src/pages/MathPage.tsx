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
import { AngleMatcher } from '@/components/math/AngleMatcher';
import { ShapeClassifier } from '@/components/math/ShapeClassifier';
import { LineRelationships } from '@/components/math/LineRelationships';
import { DivisibilityPowersModule } from '@/components/math/DivisibilityPowersModule';
import { WordProblemsModule } from '@/components/math/WordProblemsModule';
import { TriangleClassifier } from '@/components/math/TriangleClassifier';
import { QuadrilateralClassifier } from '@/components/math/QuadrilateralClassifier';
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
  MoveHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';

type ViewState = 'main-select' | 'topic-select' | 'tools-select' | 'activity' | 'geometry-select';
type ActivityType = 'quiz' | 'fractions' | 'algebra' | 'geometry' | 'percentages' | 'coloring' | 'divisibility' | 'materials' | 'long-division' | 'angle-matching' | 'shape-classification' | 'line-relationships' | 'divisibility-powers' | 'grade1-basic' | 'grade2-basic' | 'grade3-basic' | 'word-problems' | 'triangle-classification' | 'quadrilateral-classification';

export default function MathPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<ViewState>('main-select');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | null>(null);
  const [activityType, setActivityType] = useState<ActivityType>('quiz');
  const [activeMaterial, setActiveMaterial] = useState<{ title: string, path: string } | null>(null);

  const currentTopic = mathTopics.find(t => t.id === selectedTopic);

  const handleGradeSelect = (grade: GradeLevel) => {
    setSelectedGrade(grade);
    setView('topic-select');
  };

  const handleTopicSelect = (topicId: string) => {
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
      if (selectedGrade === 6) {
        setView('geometry-select');
      } else {
        setActivityType('geometry');
        setView('activity');
      }
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
    } else if (topicId === 'word-problems' && selectedGrade === 6) {
      setActivityType('word-problems');
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
    } else if (view === 'tools-select') {
      setView('main-select');
    }
    // No navigation to '/' as this is now the root
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
      <div className="bg-gradient-math text-white py-8 px-4">
        <div className="container max-w-4xl mx-auto">
          {view !== 'main-select' && (
            <Button
              variant="ghost"
              onClick={handleBack}
              className="text-white hover:bg-white/20 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Vissza
            </Button>
          )}
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/20 rounded-2xl">
              <Calculator className="w-10 h-10" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold">Matematika</h1>
              <p className="text-white/80">
                {view === 'main-select' && 'Válassz évfolyamot vagy eszközt!'}
                {view === 'topic-select' && selectedGrade && `${selectedGrade === 'graduation' ? 'Érettségi' : selectedGrade + '. osztályos'} tananyag`}
                {view === 'tools-select' && 'Interaktív eszközök és modulok'}
                {view === 'geometry-select' && 'Válassz geometriai feladatot!'}
                {view === 'activity' && currentTopic?.title}
              </p>
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

            <section className="pt-4 border-t border-slate-100">
              <Button
                onClick={() => setView('tools-select')}
                className="w-full h-20 text-lg font-bold gap-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/20 group transition-all"
              >
                <div className="p-2 bg-white/10 rounded-lg group-hover:rotate-12 transition-transform">
                  <Wrench className="w-6 h-6" />
                </div>
                Matematikai Eszközök
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
                  onClick={() => handleTopicSelect(topic.id)}
                />
              ))}
              {getFilteredTopics().length === 0 && (
                <div className="text-center py-12 p-8 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  <p className="text-slate-500">Ehhez az évfolyamhoz még nincsenek feltöltve specifikus témakörök.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'geometry-select' && (
          <div className="animate-slide-up space-y-8">
            <h2 className="font-display text-2xl font-bold text-center mb-8">Geometria Feladatok</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => {
                  setActivityType('shape-classification');
                  setView('activity');
                }}
                className="flex flex-col items-center gap-4 p-6 bg-white rounded-3xl border-2 border-slate-100 hover:border-primary hover:shadow-xl transition-all group"
              >
                <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600 group-hover:scale-110 transition-transform">
                  <Box className="w-10 h-10" />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-lg mb-1">Síkidom vagy Test?</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">2D vagy 3D alakzatok megkülönböztetése</p>
                </div>
              </button>

              <button
                onClick={() => {
                  setActivityType('angle-matching');
                  setView('activity');
                }}
                className="flex flex-col items-center gap-4 p-6 bg-white rounded-3xl border-2 border-slate-100 hover:border-primary hover:shadow-xl transition-all group"
              >
                <div className="p-4 bg-blue-50 rounded-2xl text-blue-600 group-hover:scale-110 transition-transform">
                  <Target className="w-10 h-10" />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-lg mb-1">Szögek párosítása</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Szögtípusok felismerése vizuálisan</p>
                </div>
              </button>

              <button
                onClick={() => {
                  setActivityType('triangle-classification');
                  setView('activity');
                }}
                className="flex flex-col items-center gap-4 p-6 bg-white rounded-3xl border-2 border-slate-100 hover:border-primary hover:shadow-xl transition-all group"
              >
                <div className="p-4 bg-amber-50 rounded-2xl text-amber-600 group-hover:scale-110 transition-transform">
                  <Triangle className="w-10 h-10" />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-lg mb-1">Háromszögek</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Háromszögek csoportosítása</p>
                </div>
              </button>

              <button
                onClick={() => {
                  setActivityType('quadrilateral-classification');
                  setView('activity');
                }}
                className="flex flex-col items-center gap-4 p-6 bg-white rounded-3xl border-2 border-slate-100 hover:border-primary hover:shadow-xl transition-all group"
              >
                <div className="p-4 bg-violet-50 rounded-2xl text-violet-600 group-hover:scale-110 transition-transform">
                  <Square className="w-10 h-10" />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-lg mb-1">Négyszögek</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Négyszögek fajtái és tulajdonságai</p>
                </div>
              </button>

              <button
                onClick={() => {
                  setActivityType('line-relationships');
                  setView('activity');
                }}
                className="flex flex-col items-center gap-4 p-6 bg-white rounded-3xl border-2 border-slate-100 hover:border-primary hover:shadow-xl transition-all group"
              >
                <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600 group-hover:scale-110 transition-transform">
                  <MoveHorizontal className="w-10 h-10 rotate-45" />
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-lg mb-1">Egyenesek helyzete</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">Párhuzamos, merőleges és kitérő egyenesek</p>
                </div>
              </button>
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
