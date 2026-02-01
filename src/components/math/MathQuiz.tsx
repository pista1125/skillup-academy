import { useState, useEffect, useCallback } from 'react';
import { MathProblem, QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, XCircle, ArrowRight, Trophy, RotateCcw } from 'lucide-react';

interface MathQuizProps {
  grade: number;
  type: 'addition' | 'subtraction' | 'multiplication' | 'division' | 'mixed' | 'fractions';
  onComplete: (result: QuizResult) => void;
  onBack: () => void;
}

function generateProblem(grade: number, type: string): MathProblem {
  const id = Math.random().toString(36).substr(2, 9);
  let a: number, b: number, answer: number, expression: string;
  
  // Difficulty based on grade
  const maxNum = grade <= 2 ? 10 : grade <= 4 ? 50 : grade <= 6 ? 100 : 1000;
  
  const operations = type === 'mixed' 
    ? ['addition', 'subtraction', 'multiplication'] 
    : [type];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  
  switch (operation) {
    case 'addition':
      a = Math.floor(Math.random() * maxNum) + 1;
      b = Math.floor(Math.random() * maxNum) + 1;
      answer = a + b;
      expression = `${a} + ${b} = ?`;
      break;
    case 'subtraction':
      a = Math.floor(Math.random() * maxNum) + 1;
      b = Math.floor(Math.random() * a) + 1;
      answer = a - b;
      expression = `${a} - ${b} = ?`;
      break;
    case 'multiplication':
      const multMax = grade <= 2 ? 5 : grade <= 4 ? 10 : 12;
      a = Math.floor(Math.random() * multMax) + 1;
      b = Math.floor(Math.random() * multMax) + 1;
      answer = a * b;
      expression = `${a} × ${b} = ?`;
      break;
    case 'division':
      const divMax = grade <= 4 ? 10 : 12;
      b = Math.floor(Math.random() * divMax) + 1;
      answer = Math.floor(Math.random() * divMax) + 1;
      a = b * answer;
      expression = `${a} ÷ ${b} = ?`;
      break;
    case 'fractions':
      // Simple fractions for elementary
      const denom = [2, 4, 5, 10][Math.floor(Math.random() * 4)];
      const num1 = Math.floor(Math.random() * (denom - 1)) + 1;
      const num2 = Math.floor(Math.random() * (denom - num1)) + 1;
      answer = num1 + num2;
      expression = `${num1}/${denom} + ${num2}/${denom} = ?/${denom}`;
      break;
    default:
      a = Math.floor(Math.random() * 10) + 1;
      b = Math.floor(Math.random() * 10) + 1;
      answer = a + b;
      expression = `${a} + ${b} = ?`;
  }
  
  return {
    id,
    expression: expression!,
    answer: answer!,
    difficulty: grade <= 2 ? 'easy' : grade <= 5 ? 'medium' : 'hard',
    type: operation as MathProblem['type'],
  };
}

export function MathQuiz({ grade, type, onComplete, onBack }: MathQuizProps) {
  const [problems, setProblems] = useState<MathProblem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const TOTAL_QUESTIONS = 10;
  const XP_PER_CORRECT = 10;

  useEffect(() => {
    const newProblems = Array.from({ length: TOTAL_QUESTIONS }, () => 
      generateProblem(grade, type)
    );
    setProblems(newProblems);
  }, [grade, type]);

  const checkAnswer = useCallback(() => {
    const correct = parseInt(userAnswer) === problems[currentIndex].answer;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setCorrectCount(prev => prev + 1);
      setXpEarned(prev => prev + XP_PER_CORRECT);
    }
  }, [userAnswer, problems, currentIndex]);

  const nextQuestion = useCallback(() => {
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserAnswer('');
      setShowResult(false);
      setIsCorrect(null);
    } else {
      setQuizComplete(true);
      onComplete({
        totalQuestions: TOTAL_QUESTIONS,
        correctAnswers: correctCount + (isCorrect ? 1 : 0),
        percentage: Math.round(((correctCount + (isCorrect ? 1 : 0)) / TOTAL_QUESTIONS) * 100),
        xpEarned: xpEarned + (isCorrect ? XP_PER_CORRECT : 0),
      });
    }
  }, [currentIndex, correctCount, isCorrect, xpEarned, onComplete]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (showResult) {
        nextQuestion();
      } else if (userAnswer) {
        checkAnswer();
      }
    }
  };

  if (problems.length === 0) return null;

  if (quizComplete) {
    const finalCorrect = correctCount;
    const percentage = Math.round((finalCorrect / TOTAL_QUESTIONS) * 100);
    const finalXP = finalCorrect * XP_PER_CORRECT;
    
    return (
      <div className="max-w-lg mx-auto text-center animate-confetti">
        <div className="bg-card rounded-3xl p-8 shadow-xl border border-border">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-success flex items-center justify-center">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="font-display text-3xl font-bold mb-2">
            {percentage >= 80 ? 'Fantasztikus!' : percentage >= 60 ? 'Szép munka!' : 'Jó próbálkozás!'}
          </h2>
          
          <p className="text-muted-foreground mb-6">
            Befejezted a kvízt!
          </p>

          <div className="bg-secondary/50 rounded-2xl p-6 mb-6">
            <div className="text-5xl font-display font-bold text-foreground mb-2">
              {percentage}%
            </div>
            <p className="text-muted-foreground">
              {finalCorrect} / {TOTAL_QUESTIONS} helyes válasz
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <XPBadge xp={finalXP} />
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onBack} className="flex-1">
              Vissza
            </Button>
            <Button onClick={() => window.location.reload()} className="flex-1 bg-gradient-hero hover:opacity-90">
              <RotateCcw className="w-4 h-4 mr-2" />
              Újra
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentProblem = problems[currentIndex];

  return (
    <div className="max-w-lg mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-muted-foreground">
            {currentIndex + 1} / {TOTAL_QUESTIONS}
          </span>
          <XPBadge xp={xpEarned} />
        </div>
        <ProgressBar 
          current={currentIndex + 1} 
          total={TOTAL_QUESTIONS} 
          variant="math"
          size="lg"
        />
      </div>

      {/* Question Card */}
      <div className="bg-card rounded-3xl p-8 shadow-xl border border-border animate-slide-up">
        <div className="text-center mb-8">
          <p className="text-sm text-muted-foreground mb-4">Oldd meg a feladatot:</p>
          <div className="text-4xl sm:text-5xl font-display font-bold text-foreground">
            {currentProblem.expression}
          </div>
        </div>

        {/* Answer Input */}
        <div className="space-y-4">
          <Input
            type="number"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Írd be a választ..."
            disabled={showResult}
            className={`text-center text-2xl font-bold h-16 rounded-xl ${
              showResult 
                ? isCorrect 
                  ? 'border-success bg-success-light' 
                  : 'border-destructive bg-destructive/10'
                : ''
            }`}
            autoFocus
          />

          {/* Result Feedback */}
          {showResult && (
            <div className={`flex items-center justify-center gap-2 p-4 rounded-xl ${
              isCorrect ? 'bg-success-light text-success' : 'bg-destructive/10 text-destructive'
            }`}>
              {isCorrect ? (
                <>
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-bold">Helyes! +{XP_PER_CORRECT} XP</span>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6" />
                  <span className="font-bold">Helytelen. A válasz: {currentProblem.answer}</span>
                </>
              )}
            </div>
          )}

          {/* Action Button */}
          {!showResult ? (
            <Button 
              onClick={checkAnswer} 
              disabled={!userAnswer}
              className="w-full h-14 text-lg font-bold bg-gradient-math hover:opacity-90 rounded-xl"
            >
              Ellenőrzés
            </Button>
          ) : (
            <Button 
              onClick={nextQuestion}
              className="w-full h-14 text-lg font-bold bg-gradient-hero hover:opacity-90 rounded-xl"
            >
              {currentIndex < TOTAL_QUESTIONS - 1 ? (
                <>
                  Következő <ArrowRight className="w-5 h-5 ml-2" />
                </>
              ) : (
                'Eredmények megtekintése'
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
