import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GradeSelector } from '@/components/GradeSelector';
import { TopicCard } from '@/components/TopicCard';
import { MathQuiz } from '@/components/math/MathQuiz';
import { GradeLevel, QuizResult } from '@/types/education';
import { mathTopics, mathTypeLabels } from '@/data/mathContent';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calculator, Sparkles } from 'lucide-react';

type ViewState = 'grade-select' | 'topic-select' | 'practice' | 'quiz';

export default function MathPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<ViewState>('grade-select');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | null>(null);
  const [selectedType, setSelectedType] = useState<string>('addition');

  const handleGradeSelect = (grade: GradeLevel) => {
    setSelectedGrade(grade);
    setView('topic-select');
  };

  const handleStartPractice = (type: string) => {
    setSelectedType(type);
    setView('quiz');
  };

  const handleQuizComplete = (result: QuizResult) => {
    console.log('Quiz completed:', result);
  };

  const handleBack = () => {
    if (view === 'quiz') {
      setView('topic-select');
    } else if (view === 'topic-select') {
      setView('grade-select');
      setSelectedGrade(null);
    } else {
      navigate('/');
    }
  };

  const gradeNumber = typeof selectedGrade === 'number' ? selectedGrade : 4;
  const topics = mathTopics[gradeNumber] || mathTopics[4];

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
              {selectedGrade && (
                <p className="text-white/80">
                  {typeof selectedGrade === 'number' 
                    ? `${selectedGrade}. osztály` 
                    : selectedGrade === 'graduation' 
                      ? 'Érettségi felkészítés'
                      : `Középiskola ${selectedGrade.split('-')[1]}. osztály`
                  }
                </p>
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
            <GradeSelector 
              selectedGrade={selectedGrade} 
              onSelectGrade={handleGradeSelect} 
            />
          </div>
        )}

        {view === 'topic-select' && (
          <div className="animate-slide-up">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="font-display text-2xl font-bold">Válassz témakört!</h2>
            </div>
            
            {/* Topics */}
            <div className="space-y-4 mb-8">
              {topics.map((topic) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  progress={0}
                  onClick={() => handleStartPractice(topic.id.includes('add') ? 'addition' : 
                    topic.id.includes('sub') ? 'subtraction' :
                    topic.id.includes('mult') ? 'multiplication' :
                    topic.id.includes('div') ? 'division' :
                    topic.id.includes('frac') ? 'fractions' : 'mixed'
                  )}
                />
              ))}
            </div>

            {/* Quick Practice */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h3 className="font-display font-bold text-lg mb-4">Gyors gyakorlás</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.entries(mathTypeLabels).map(([type, label]) => (
                  <Button
                    key={type}
                    variant="outline"
                    onClick={() => handleStartPractice(type)}
                    className="h-auto py-4 flex-col gap-1"
                  >
                    <span className="text-2xl">
                      {type === 'addition' ? '➕' : 
                       type === 'subtraction' ? '➖' :
                       type === 'multiplication' ? '✖️' :
                       type === 'division' ? '➗' :
                       type === 'fractions' ? '🥧' : '🔢'}
                    </span>
                    <span className="text-sm">{label}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === 'quiz' && (
          <MathQuiz
            grade={gradeNumber}
            type={selectedType as any}
            onComplete={handleQuizComplete}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}
