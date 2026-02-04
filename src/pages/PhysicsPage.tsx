import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GradeSelector } from '@/components/GradeSelector';
import { TopicCard } from '@/components/TopicCard';
import { MotionSimulation } from '@/components/physics/MotionSimulation';
import { MoleculesSimulation } from '@/components/physics/MoleculesSimulation';
import { BrownianSimulation } from '@/components/physics/BrownianSimulation';
import { RandomWalkSimulation } from '@/components/physics/RandomWalkSimulation';
import { PhysicsQuiz } from '@/components/physics/PhysicsQuiz';
import { GradeLevel, QuizResult, Lesson } from '@/types/education';
import { physicsTopics, physicsQuizzes, lessonContent } from '@/data/physicsContent';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Atom, BookOpen, PlayCircle, HelpCircle, Sparkles } from 'lucide-react';

type ViewState = 'grade-select' | 'topic-select' | 'lesson-list' | 'lesson' | 'simulation' | 'quiz';
type SimType = 'uniform' | 'accelerated' | 'projectile' | 'molecules' | 'brownian' | 'random-walk';

export default function PhysicsPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<ViewState>('grade-select');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [simulationType, setSimulationType] = useState<SimType>('uniform');

  const handleGradeSelect = (grade: GradeLevel) => {
    setSelectedGrade(grade);
    setView('topic-select');
  };

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopicId(topicId);
    setView('lesson-list');
  };

  const handleLessonSelect = (lesson: Lesson) => {
    setSelectedLesson(lesson);

    if (lesson.type === 'simulation') {
      if (lesson.id.includes('uniform')) {
        setSimulationType('uniform');
      } else if (lesson.id.includes('accelerated')) {
        setSimulationType('accelerated');
      } else if (lesson.id.includes('projectile')) {
        setSimulationType('projectile');
      } else if (lesson.id.includes('internal-energy')) {
        setSimulationType('molecules');
      } else if (lesson.id.includes('brownian')) {
        setSimulationType('brownian');
      } else if (lesson.id.includes('random-walk')) {
        setSimulationType('random-walk');
      }
      setView('simulation');
    } else if (lesson.type === 'quiz') {
      setView('quiz');
    } else {
      setView('lesson');
    }
  };

  const handleQuizComplete = (result: QuizResult) => {
    console.log('Quiz completed:', result);
  };

  const handleBack = () => {
    switch (view) {
      case 'quiz':
      case 'simulation':
      case 'lesson':
        setView('lesson-list');
        break;
      case 'lesson-list':
        setView('topic-select');
        break;
      case 'topic-select':
        setView('grade-select');
        setSelectedGrade(null);
        break;
      default:
        navigate('/');
    }
  };

  const gradeKey = typeof selectedGrade === 'string' ? selectedGrade : 'high-1';
  const topics = physicsTopics[gradeKey] || physicsTopics['high-1'];
  const selectedTopic = topics.find(t => t.id === selectedTopicId);

  // Get quiz questions for selected lesson
  const getQuizQuestions = () => {
    if (selectedLesson?.type === 'quiz') {
      return physicsQuizzes[selectedLesson.id] || physicsQuizzes['motion-quiz'];
    }
    return physicsQuizzes['motion-quiz'];
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-physics text-white py-8 px-4">
        <div className="container max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="text-white hover:bg-white/20 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Vissza
          </Button>
          <div className="flex items-center gap-4">
            <div className="p-4 bg-white/20 rounded-2xl">
              <Atom className="w-10 h-10" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold">Fizika</h1>
              {selectedGrade && (
                <p className="text-white/80">
                  {selectedGrade === 'graduation'
                    ? 'Érettségi felkészítés'
                    : `Középiskola ${gradeKey.split('-')[1]}. osztály`
                  }
                </p>
              )}
              {selectedTopic && (
                <p className="text-white/80">{selectedTopic.title}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {view === 'grade-select' && (
          <div className="animate-slide-up">
            <h2 className="font-display text-2xl font-bold mb-6 text-center">
              Melyik osztályba jársz?
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              A fizika középiskolai tananyag, válaszd ki az évfolyamodat!
            </p>
            <GradeSelector
              selectedGrade={selectedGrade}
              onSelectGrade={handleGradeSelect}
            />
          </div>
        )}

        {view === 'topic-select' && (
          <div className="animate-slide-up">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-physics" />
              <h2 className="font-display text-2xl font-bold">Válassz témakört!</h2>
            </div>

            <div className="space-y-4">
              {topics.map((topic) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  progress={0}
                  onClick={() => handleTopicSelect(topic.id)}
                />
              ))}
            </div>
          </div>
        )}

        {view === 'lesson-list' && selectedTopic && (
          <div className="animate-slide-up">
            <div className="bg-card rounded-2xl p-6 border border-border mb-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{selectedTopic.icon}</span>
                <div>
                  <h2 className="font-display text-2xl font-bold">{selectedTopic.title}</h2>
                  <p className="text-muted-foreground">{selectedTopic.description}</p>
                </div>
              </div>
            </div>

            <h3 className="font-display font-bold text-lg mb-4">Leckék</h3>
            <div className="space-y-3">
              {selectedTopic.lessons.map((lesson, index) => (
                <button
                  key={lesson.id}
                  onClick={() => handleLessonSelect(lesson)}
                  className="w-full bg-card rounded-xl p-4 border-2 border-border hover:border-physics transition-colors text-left flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-full bg-physics-light text-physics flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">{lesson.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {lesson.type === 'theory' && 'Elméleti anyag'}
                      {lesson.type === 'simulation' && 'Interaktív szimuláció'}
                      {lesson.type === 'quiz' && 'Tudáspróba'}
                      {lesson.type === 'practice' && 'Gyakorlás'}
                    </p>
                  </div>
                  <div className="text-physics">
                    {lesson.type === 'theory' && <BookOpen className="w-5 h-5" />}
                    {lesson.type === 'simulation' && <PlayCircle className="w-5 h-5" />}
                    {lesson.type === 'quiz' && <HelpCircle className="w-5 h-5" />}
                    {lesson.type === 'practice' && <PlayCircle className="w-5 h-5" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {view === 'lesson' && selectedLesson && (
          <div className="animate-slide-up">
            <div className="bg-card rounded-2xl p-8 border border-border prose prose-slate max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: lessonContent[selectedLesson.id]
                    ?.replace(/^# (.+)$/gm, '<h1 class="font-display text-3xl font-bold mb-4">$1</h1>')
                    .replace(/^## (.+)$/gm, '<h2 class="font-display text-xl font-bold mt-6 mb-3">$1</h2>')
                    .replace(/^### (.+)$/gm, '<h3 class="font-display text-lg font-bold mt-4 mb-2">$1</h3>')
                    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-physics">$1</strong>')
                    .replace(/\n\n/g, '</p><p class="mb-4">')
                    .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
                    || '<p>Tartalom hamarosan...</p>'
                }}
              />
            </div>
          </div>
        )}

        {view === 'simulation' && (
          <div className="animate-slide-up">
            <h2 className="font-display text-2xl font-bold mb-6">
              {simulationType === 'uniform' && 'Egyenletes mozgás'}
              {simulationType === 'accelerated' && 'Gyorsuló mozgás'}
              {simulationType === 'projectile' && 'Ferde hajítás'}
              {simulationType === 'molecules' && 'Molekuláris hőmozgás'}
              {simulationType === 'brownian' && 'Brown-mozgás'}
              {simulationType === 'random-walk' && 'Statisztikus bolyongás'}
            </h2>

            {simulationType === 'molecules' && <MoleculesSimulation />}
            {simulationType === 'brownian' && <BrownianSimulation />}
            {simulationType === 'random-walk' && <RandomWalkSimulation />}
            {(simulationType === 'uniform' || simulationType === 'accelerated' || simulationType === 'projectile') && (
              <MotionSimulation type={simulationType as any} />
            )}
          </div>
        )}

        {view === 'quiz' && (
          <PhysicsQuiz
            topic={selectedTopic?.title || 'Fizika'}
            questions={getQuizQuestions()}
            onComplete={handleQuizComplete}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}
