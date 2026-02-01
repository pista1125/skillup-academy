import { useState, useEffect, useCallback } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft } from 'lucide-react';

interface AlgebraQuizProps {
  grade: number;
  onComplete: (result: QuizResult) => void;
  onBack: () => void;
}

interface AlgebraProblem {
  id: string;
  equation: string;
  variable: string;
  answer: number;
  hint?: string;
}

function generateAlgebraProblem(grade: number): AlgebraProblem {
  const id = Math.random().toString(36).substr(2, 9);
  let a: number, b: number, x: number, equation: string;
  
  if (grade <= 5) {
    // Simple: x + a = b
    x = Math.floor(Math.random() * 10) + 1;
    a = Math.floor(Math.random() * 10) + 1;
    b = x + a;
    const operations = [
      { eq: `x + ${a} = ${b}`, hint: `Vond ki ${a}-${a > 1 ? 'e' : ''}t mindkét oldalból!` },
      { eq: `x - ${a} = ${b - a - a}`, hint: `Adj hozzá ${a}-${a > 1 ? 'e' : ''}t mindkét oldalhoz!` },
      { eq: `${a} + x = ${b}`, hint: `Vond ki ${a}-${a > 1 ? 'e' : ''}t mindkét oldalból!` },
    ];
    const chosen = operations[Math.floor(Math.random() * operations.length)];
    equation = chosen.eq;
    return { id, equation, variable: 'x', answer: x, hint: chosen.hint };
  } else if (grade <= 7) {
    // Medium: ax = b or ax + c = d
    const coef = [2, 3, 4, 5][Math.floor(Math.random() * 4)];
    x = Math.floor(Math.random() * 10) + 1;
    
    if (Math.random() > 0.5) {
      // ax = b
      const product = coef * x;
      equation = `${coef}x = ${product}`;
      return { id, equation, variable: 'x', answer: x, hint: `Oszd el mindkét oldalt ${coef}-${coef === 2 ? 'vel' : coef === 3 ? 'mal' : coef === 4 ? 'gyel' : 'tel'}!` };
    } else {
      // ax + c = d
      const c = Math.floor(Math.random() * 10) + 1;
      const d = coef * x + c;
      equation = `${coef}x + ${c} = ${d}`;
      return { id, equation, variable: 'x', answer: x, hint: `Először vond ki ${c}-${c > 1 ? 'e' : ''}t, aztán oszd el!` };
    }
  } else {
    // Hard: ax + b = cx + d
    const coefLeft = [2, 3, 4][Math.floor(Math.random() * 3)];
    const coefRight = [1, 2][Math.floor(Math.random() * 2)];
    x = Math.floor(Math.random() * 8) + 2;
    const bVal = Math.floor(Math.random() * 10) + 1;
    const dVal = coefLeft * x + bVal - coefRight * x;
    
    equation = `${coefLeft}x + ${bVal} = ${coefRight === 1 ? '' : coefRight}x + ${dVal}`;
    return { id, equation, variable: 'x', answer: x, hint: 'Gyűjtsd az x-eket az egyik oldalra, a számokat a másikra!' };
  }
}

export function AlgebraQuiz({ grade, onComplete, onBack }: AlgebraQuizProps) {
  const [problems, setProblems] = useState<AlgebraProblem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const TOTAL_QUESTIONS = 10;
  const XP_PER_CORRECT = 15;

  useEffect(() => {
    const newProblems = Array.from({ length: TOTAL_QUESTIONS }, () => 
      generateAlgebraProblem(grade)
    );
    setProblems(newProblems);
  }, [grade]);

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
      setShowHint(false);
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
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Vissza
        </Button>

        <div className="bg-card rounded-3xl p-8 shadow-xl border border-border">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="font-display text-3xl font-bold mb-2">
            {percentage >= 80 ? 'Zseniális!' : percentage >= 60 ? 'Jól megy!' : 'Gyakorolj tovább!'}
          </h2>
          
          <p className="text-muted-foreground mb-6">
            Algebra kvíz befejezve!
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
            <Button onClick={() => window.location.reload()} className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90">
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
      <Button 
        variant="ghost" 
        onClick={onBack}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Vissza a témakörökhöz
      </Button>

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
          variant="default"
          size="lg"
        />
      </div>

      {/* Question Card */}
      <div className="bg-card rounded-3xl p-8 shadow-xl border border-border animate-slide-up">
        <div className="text-center mb-8">
          <p className="text-sm text-muted-foreground mb-4">Oldd meg az egyenletet (x = ?):</p>
          <div className="text-3xl sm:text-4xl font-display font-bold text-foreground bg-secondary/50 rounded-xl p-4">
            {currentProblem.equation}
          </div>
        </div>

        {/* Hint */}
        {currentProblem.hint && !showResult && (
          <div className="mb-4">
            {showHint ? (
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-700 dark:text-blue-400 text-sm">
                💡 {currentProblem.hint}
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHint(true)}
                className="w-full text-muted-foreground"
              >
                💡 Segítség kérése
              </Button>
            )}
          </div>
        )}

        {/* Answer Input */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold">x =</span>
            <Input
              type="number"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="?"
              disabled={showResult}
              className={`text-center text-2xl font-bold h-16 rounded-xl flex-1 ${
                showResult 
                  ? isCorrect 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/30' 
                    : 'border-destructive bg-destructive/10'
                  : ''
              }`}
              autoFocus
            />
          </div>

          {/* Result Feedback */}
          {showResult && (
            <div className={`flex items-center justify-center gap-2 p-4 rounded-xl ${
              isCorrect ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-destructive/10 text-destructive'
            }`}>
              {isCorrect ? (
                <>
                  <CheckCircle className="w-6 h-6" />
                  <span className="font-bold">Helyes! +{XP_PER_CORRECT} XP</span>
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6" />
                  <span className="font-bold">Helytelen. x = {currentProblem.answer}</span>
                </>
              )}
            </div>
          )}

          {/* Action Button */}
          {!showResult ? (
            <Button 
              onClick={checkAnswer} 
              disabled={!userAnswer}
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-purple-500 to-purple-600 hover:opacity-90 rounded-xl"
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
