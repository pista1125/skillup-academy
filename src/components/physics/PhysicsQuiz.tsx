import { useState } from 'react';
import { QuizQuestion, QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, ArrowRight, Trophy, RotateCcw } from 'lucide-react';

interface PhysicsQuizProps {
  topic: string;
  questions: QuizQuestion[];
  onComplete: (result: QuizResult) => void;
  onBack: () => void;
}

export function PhysicsQuiz({ topic, questions, onComplete, onBack }: PhysicsQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const XP_PER_CORRECT = 15;

  const checkAnswer = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === questions[currentIndex].correctAnswer;
    setShowResult(true);
    
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      setXpEarned(prev => prev + XP_PER_CORRECT);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
      const finalCorrect = correctCount + (selectedAnswer === questions[currentIndex].correctAnswer ? 1 : 0);
      onComplete({
        totalQuestions: questions.length,
        correctAnswers: finalCorrect,
        percentage: Math.round((finalCorrect / questions.length) * 100),
        xpEarned: finalCorrect * XP_PER_CORRECT,
      });
    }
  };

  if (quizComplete) {
    const finalCorrect = correctCount;
    const percentage = Math.round((finalCorrect / questions.length) * 100);
    const finalXP = finalCorrect * XP_PER_CORRECT;

    return (
      <div className="max-w-lg mx-auto text-center animate-confetti">
        <div className="bg-card rounded-3xl p-8 shadow-xl border border-border">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-physics flex items-center justify-center">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="font-display text-3xl font-bold mb-2">
            {percentage >= 80 ? 'Kiváló!' : percentage >= 60 ? 'Jó munka!' : 'Gyakorolj tovább!'}
          </h2>
          
          <p className="text-muted-foreground mb-6">
            {topic} kvíz befejezve
          </p>

          <div className="bg-secondary/50 rounded-2xl p-6 mb-6">
            <div className="text-5xl font-display font-bold text-foreground mb-2">
              {percentage}%
            </div>
            <p className="text-muted-foreground">
              {finalCorrect} / {questions.length} helyes válasz
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <XPBadge xp={finalXP} />
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onBack} className="flex-1">
              Vissza
            </Button>
            <Button onClick={() => window.location.reload()} className="flex-1 bg-gradient-physics hover:opacity-90">
              <RotateCcw className="w-4 h-4 mr-2" />
              Újra
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-muted-foreground">
            {currentIndex + 1} / {questions.length}
          </span>
          <XPBadge xp={xpEarned} />
        </div>
        <ProgressBar 
          current={currentIndex + 1} 
          total={questions.length} 
          variant="physics"
          size="lg"
        />
      </div>

      {/* Question Card */}
      <div className="bg-card rounded-3xl p-8 shadow-xl border border-border animate-slide-up">
        <h3 className="text-xl font-display font-bold text-foreground mb-6">
          {currentQuestion.question}
        </h3>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showResult && setSelectedAnswer(index)}
              disabled={showResult}
              className={`quiz-option w-full text-left ${
                selectedAnswer === index ? 'selected' : ''
              } ${
                showResult && index === currentQuestion.correctAnswer ? 'correct' : ''
              } ${
                showResult && selectedAnswer === index && !isCorrect ? 'incorrect' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-bold text-sm">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
                {showResult && index === currentQuestion.correctAnswer && (
                  <CheckCircle className="w-5 h-5 text-success" />
                )}
                {showResult && selectedAnswer === index && !isCorrect && (
                  <XCircle className="w-5 h-5 text-destructive" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Explanation */}
        {showResult && currentQuestion.explanation && (
          <div className={`p-4 rounded-xl mb-6 ${isCorrect ? 'bg-success-light' : 'bg-physics-light'}`}>
            <p className="text-sm">
              <strong>Magyarázat:</strong> {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Action Button */}
        {!showResult ? (
          <Button 
            onClick={checkAnswer} 
            disabled={selectedAnswer === null}
            className="w-full h-14 text-lg font-bold bg-gradient-physics hover:opacity-90 rounded-xl"
          >
            Ellenőrzés
          </Button>
        ) : (
          <Button 
            onClick={nextQuestion}
            className="w-full h-14 text-lg font-bold bg-gradient-hero hover:opacity-90 rounded-xl"
          >
            {currentIndex < questions.length - 1 ? (
              <>
                Következő <ArrowRight className="w-5 h-5 ml-2" />
              </>
            ) : (
              'Eredmények'
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
