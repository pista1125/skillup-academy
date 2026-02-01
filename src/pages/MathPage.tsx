import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mathTopics, gradeDescriptions } from '@/data/mathTopics';
import { MathTopicCard } from '@/components/math/MathTopicCard';
import { MathQuiz } from '@/components/math/MathQuiz';
import { FractionVisualizer } from '@/components/math/FractionVisualizer';
import { AlgebraQuiz } from '@/components/math/AlgebraQuiz';
import { QuizResult } from '@/types/education';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calculator, GraduationCap } from 'lucide-react';

type ViewState = 'topic-select' | 'grade-select' | 'activity';
type ActivityType = 'quiz' | 'fractions' | 'algebra' | 'geometry';

export default function MathPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<ViewState>('topic-select');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<number>(4);
  const [activityType, setActivityType] = useState<ActivityType>('quiz');

  const currentTopic = mathTopics.find(t => t.id === selectedTopic);

  const handleTopicSelect = (topicId: string) => {
    setSelectedTopic(topicId);
    
    // Determine activity type based on topic
    if (topicId === 'fractions') {
      setActivityType('fractions');
      setView('activity');
    } else if (topicId === 'algebra') {
      setActivityType('algebra');
      setView('grade-select');
    } else if (topicId === 'geometry') {
      setActivityType('geometry');
      setView('grade-select');
    } else {
      setActivityType('quiz');
      setView('grade-select');
    }
  };

  const handleGradeSelect = (grade: number) => {
    setSelectedGrade(grade);
    setView('activity');
  };

  const handleQuizComplete = (result: QuizResult) => {
    console.log('Quiz completed:', result);
  };

  const handleBack = () => {
    if (view === 'activity') {
      if (activityType === 'fractions') {
        setView('topic-select');
      } else {
        setView('grade-select');
      }
    } else if (view === 'grade-select') {
      setView('topic-select');
      setSelectedTopic(null);
    } else {
      navigate('/');
    }
  };

  const getMathType = () => {
    switch (selectedTopic) {
      case 'basic-operations': return 'mixed';
      case 'fractions': return 'fractions';
      default: return 'mixed';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-math text-white py-8 px-4">
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
              <Calculator className="w-10 h-10" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold">Matematika</h1>
              {currentTopic && (
                <p className="text-white/80">
                  {currentTopic.title}
                  {view === 'activity' && selectedGrade && activityType !== 'fractions' && (
                    <span> • {gradeDescriptions[selectedGrade]}</span>
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-4xl mx-auto px-4 py-8">
        {view === 'topic-select' && (
          <div className="animate-slide-up">
            <h2 className="font-display text-2xl font-bold mb-2 text-center">
              Válassz témakört!
            </h2>
            <p className="text-muted-foreground text-center mb-8">
              Melyik területen szeretnél gyakorolni?
            </p>
            
            <div className="space-y-4">
              {mathTopics.map((topic) => (
                <MathTopicCard
                  key={topic.id}
                  topic={topic}
                  onClick={() => handleTopicSelect(topic.id)}
                />
              ))}
            </div>
          </div>
        )}

        {view === 'grade-select' && currentTopic && (
          <div className="animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentTopic.color} flex items-center justify-center text-2xl`}>
                {currentTopic.icon}
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold">{currentTopic.title}</h2>
                <p className="text-muted-foreground text-sm">{currentTopic.description}</p>
              </div>
            </div>

            <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Válassz osztályt!
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {currentTopic.grades.map((grade) => (
                <Button
                  key={grade}
                  variant="outline"
                  onClick={() => handleGradeSelect(grade)}
                  className="h-auto py-6 flex-col gap-2 hover:border-primary hover:bg-primary/5"
                >
                  <span className="text-3xl font-display font-bold">{grade}.</span>
                  <span className="text-sm text-muted-foreground">osztály</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {view === 'activity' && (
          <>
            {activityType === 'fractions' && (
              <FractionVisualizer onBack={handleBack} />
            )}
            
            {activityType === 'algebra' && (
              <AlgebraQuiz
                grade={selectedGrade}
                onComplete={handleQuizComplete}
                onBack={handleBack}
              />
            )}
            
            {activityType === 'quiz' && (
              <MathQuiz
                grade={selectedGrade}
                type={getMathType() as any}
                onComplete={handleQuizComplete}
                onBack={handleBack}
              />
            )}

            {activityType === 'geometry' && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📐</div>
                <h2 className="font-display text-2xl font-bold mb-2">Geometria modul</h2>
                <p className="text-muted-foreground mb-6">
                  Hamarosan! Alakzatok, területek és kerületek.
                </p>
                <Button onClick={handleBack}>Vissza a témakörökhöz</Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
