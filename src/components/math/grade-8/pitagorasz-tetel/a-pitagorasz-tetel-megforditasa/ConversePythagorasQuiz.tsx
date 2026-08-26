import React, { useState } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, GitCompare, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConversePythagorasQuizProps {
  onComplete?: (result: QuizResult) => void;
  onBack: () => void;
}

interface Question {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 'cp1',
    category: 'Derékszögűség eldöntése',
    question: 'Derékszögű-e az a háromszög, amelynek oldalhosszúságai 6 cm, 8 cm és 10 cm?',
    options: [
      'Igen, mert 6² + 8² = 36 + 64 = 100 = 10².',
      'Nem, mert 6 + 8 > 10.',
      'Csak akkor, ha egyenlő szárú.',
      'Nem, mert 10 nem osztható 3-mal.'
    ],
    correctIndex: 0,
    explanation: 'A két rövidebb oldal négyzetösszege (6² + 8² = 100) egyenlő a leghosszabb oldal négyzetével (10² = 100), így a megfordítás tétele szerint derékszögű.'
  },
  {
    id: 'cp2',
    category: 'Pitagoraszi számhármas felismerése',
    question: 'Melyik számhármas alkot PITAGORASZI számhármast az alábbiak közül?',
    options: ['(5; 12; 13)', '(4; 5; 6)', '(6; 7; 8)', '(2; 3; 4)'],
    correctIndex: 0,
    explanation: '5² + 12² = 25 + 144 = 169 = 13², tehát (5, 12, 13) valódi pitagoraszi számhármas.'
  },
  {
    id: 'cp3',
    category: 'Háromszög szögfajtája',
    question: 'Milyen szögű az a háromszög, amelynek oldalai 4 cm, 6 cm és 8 cm?',
    options: [
      'Tompaszögű (mert 8² = 64 > 4² + 6² = 52)',
      'Hegyesszögű',
      'Derékszögű',
      'Nem képez háromszöget'
    ],
    correctIndex: 0,
    explanation: '4² + 6² = 16 + 36 = 52. Mivel a leghosszabb oldal négyzete c² = 8² = 64 > 52, a legnagyobb szög tompaszög (> 90°).'
  },
  {
    id: 'cp4',
    category: 'Hegyesszögű háromszög',
    question: 'Egy háromszög oldalai 7 cm, 8 cm és 9 cm. Milyen a háromszög a szögei szerint?',
    options: [
      'Hegyesszögű (mert 9² = 81 < 7² + 8² = 113)',
      'Derékszögű',
      'Tompaszögű',
      'Egyenlő oldalú'
    ],
    correctIndex: 0,
    explanation: '7² + 8² = 49 + 64 = 113. Mivel c² = 9² = 81 < 113, a háromszög minden szöge hegyesszög (< 90°).'
  },
  {
    id: 'cp5',
    category: 'Egyiptomi zsinór',
    question: 'Hány csomóra osztott kötelet használtak az ókori egyiptomiak derékszögek kitűzésére, és milyen arányban feszítették ki?',
    options: [
      '12 csomós kötelet, 3 : 4 : 5 arányban kifeszítve',
      '10 csomós kötelet, 2 : 3 : 5 arányban',
      '15 csomós kötelet, 5 : 5 : 5 arányban',
      '100 méteres acélszalagot'
    ],
    correctIndex: 0,
    explanation: 'A 12 egyenlő részre osztott hurkolt kötélből a 3, 4, 5 oldalhosszúságú zárt háromszög derékszögű (3 + 4 + 5 = 12).'
  },
  {
    id: 'cp6',
    category: 'Többszörös számhármas',
    question: 'Ha a (3; 4; 5) pitagoraszi számhármas minden tagját megszorozzuk 7-tel, milyen számhármast kapunk, és derékszögű marad-e?',
    options: [
      '(21; 28; 35), és derékszögű marad',
      '(10; 11; 12), de tompaszögű lesz',
      '(21; 28; 35), de nem képez háromszöget',
      '(21; 24; 25), és hegyesszögű lesz'
    ],
    correctIndex: 0,
    explanation: 'Pitagoraszi számhármas tetszőleges k-szorosa is pitagoraszi számhármas: 21² + 28² = 441 + 784 = 1225 = 35².'
  }
];

export function ConversePythagorasQuiz({ onComplete, onBack }: ConversePythagorasQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const TOTAL_QUESTIONS = QUESTIONS.length;
  const XP_PER_CORRECT = 15;
  const currentQ = QUESTIONS[currentIndex];

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelectedOption(idx);
  };

  const checkAnswer = () => {
    if (selectedOption === null) return;
    const isCorrect = selectedOption === currentQ.correctIndex;
    setShowResult(true);
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      setXpEarned(prev => prev + XP_PER_CORRECT);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < TOTAL_QUESTIONS - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
      if (onComplete) {
        onComplete({
          totalQuestions: TOTAL_QUESTIONS,
          correctAnswers: correctCount + (selectedOption === currentQ.correctIndex ? 1 : 0),
          percentage: Math.round(((correctCount + (selectedOption === currentQ.correctIndex ? 1 : 0)) / TOTAL_QUESTIONS) * 100),
          xpEarned: xpEarned + (selectedOption === currentQ.correctIndex ? XP_PER_CORRECT : 0),
        });
      }
    }
  };

  if (quizComplete) {
    const finalCorrect = correctCount;
    const percentage = Math.round((finalCorrect / TOTAL_QUESTIONS) * 100);
    const finalXP = finalCorrect * XP_PER_CORRECT;

    return (
      <div className="max-w-xl mx-auto text-center py-6 animate-in fade-in zoom-in-95 duration-300">
        <Button variant="ghost" onClick={onBack} className="mb-6 rounded-xl hover:bg-slate-100">
          <ArrowLeft className="w-4 h-4 mr-2" /> Vissza a témakörökhöz
        </Button>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-white shadow-lg shadow-amber-200">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2">
            {percentage >= 80 ? 'Megfordítás Szakértő!' : percentage >= 60 ? 'Szép eredmény!' : 'Gyakorolj még!'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">3. A Pitagorasz-tétel megfordítása kvíz befejezve</p>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-6">
            <div className="text-5xl font-black text-amber-600 mb-2">{percentage}%</div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {finalCorrect} / {TOTAL_QUESTIONS} helyes válasz
            </p>
          </div>

          <div className="flex justify-center mb-6">
            <XPBadge xp={finalXP} />
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onBack} className="flex-1 rounded-xl h-11 font-bold">
              Vissza
            </Button>
            <Button
              onClick={() => {
                setCurrentIndex(0);
                setSelectedOption(null);
                setShowResult(false);
                setCorrectCount(0);
                setQuizComplete(false);
                setXpEarned(0);
              }}
              className="flex-1 bg-amber-600 hover:bg-amber-700 text-white rounded-xl h-11 font-bold shadow-md shadow-amber-200"
            >
              <RotateCcw className="w-4 h-4 mr-2" /> Újra
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-4">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack} className="rounded-xl hover:bg-slate-100 text-slate-600 font-bold">
          <ArrowLeft className="w-4 h-4 mr-2" /> Vissza
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 bg-amber-50 text-amber-800 rounded-full border border-amber-200">
            {currentQ.category}
          </span>
          <XPBadge xp={xpEarned} />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center text-xs font-bold text-slate-400 mb-2">
          <span>Kérdés {currentIndex + 1} / {TOTAL_QUESTIONS}</span>
          <span>{Math.round(((currentIndex + 1) / TOTAL_QUESTIONS) * 100)}%</span>
        </div>
        <ProgressBar current={currentIndex + 1} total={TOTAL_QUESTIONS} variant="default" size="lg" />
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 space-y-6">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
            <GitCompare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">3. Fejezet • Megfordítás és Számhármasok</span>
            <h3 className="text-lg md:text-xl font-bold text-slate-800 mt-1 leading-snug">
              {currentQ.question}
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;
            let btnStyle = "border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 text-slate-700";

            if (showResult) {
              if (isCorrect) {
                btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
              } else if (isSelected && !isCorrect) {
                btnStyle = "border-rose-500 bg-rose-50 text-rose-900";
              } else {
                btnStyle = "border-slate-100 text-slate-400 opacity-60";
              }
            } else if (isSelected) {
              btnStyle = "border-amber-600 bg-amber-50 text-amber-900 font-bold ring-2 ring-amber-500/20";
            }

            return (
              <button
                key={idx}
                disabled={showResult}
                onClick={() => handleSelect(idx)}
                className={cn(
                  "w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-sm md:text-base font-medium",
                  btnStyle
                )}
              >
                <span>{opt}</span>
                {showResult && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />}
                {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-600 shrink-0 ml-2" />}
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs md:text-sm text-slate-600 space-y-1 animate-in fade-in-50">
            <div className="font-bold flex items-center gap-1.5 text-slate-800">
              <HelpCircle className="w-4 h-4 text-amber-600" /> Magyarázat:
            </div>
            <p>{currentQ.explanation}</p>
          </div>
        )}

        <div className="pt-2">
          {!showResult ? (
            <Button
              disabled={selectedOption === null}
              onClick={checkAnswer}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white h-12 rounded-xl font-bold shadow-md shadow-amber-200"
            >
              Válasz ellenőrzése
            </Button>
          ) : (
            <Button
              onClick={nextQuestion}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white h-12 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <span>{currentIndex < TOTAL_QUESTIONS - 1 ? 'Következő feladat' : 'Eredmények megtekintése'}</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConversePythagorasQuiz;
