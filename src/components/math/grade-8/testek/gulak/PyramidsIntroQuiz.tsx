import React, { useState } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, Triangle, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PyramidsIntroQuizProps {
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
    id: 'pyr1',
    category: 'Gúla csúcsainak és lapjainak száma',
    question: 'Hány csúcsa, lapja és éle van egy négyzet alapú gúlának?',
    options: [
      '5 csúcsa, 5 lapja és 8 éle van',
      '4 csúcsa, 4 lapja és 6 éle van',
      '5 csúcsa, 6 lapja és 10 éle van',
      '6 csúcsa, 5 lapja és 8 éle van'
    ],
    correctIndex: 0,
    explanation: 'Négyzet alapú gúla (n=4): Csúcsok száma C = 4+1 = 5, Lapok száma L = 4+1 = 5 (1 négyzet + 4 háromszög), Élek száma É = 2 · 4 = 8 (4 alapél + 4 oldalél).'
  },
  {
    id: 'pyr2',
    category: 'Szabályos gúla definíciója',
    question: 'Milyen alakúak egy szabályos négyzet alapú gúla oldallapjai?',
    options: [
      'Egybevágó egyenlő szárú háromszögek',
      'Egyenlő oldalú háromszögek (mindig)',
      'Derékszögű háromszögek',
      'Trapézok'
    ],
    correctIndex: 0,
    explanation: 'A szabályos gúla csúcsa az alaplap középpontja felett helyezkedik el, ezért az összes oldalél egyenlő, így az oldallapok egybevágó egyenlő szárú háromszögek.'
  },
  {
    id: 'pyr3',
    category: 'Gúla hálója',
    question: 'Miből áll egy szabályos hatszög alapú gúla kiterített síkbeli hálója?',
    options: [
      'Egy szabályos hatszögből és 6 darab egybevágó egyenlő szárú háromszögből',
      'Két szabályos hatszögből és 6 téglalapból',
      '6 darab háromszögből, alaplap nélkül',
      'Egy négyzetből és 6 háromszögből'
    ],
    correctIndex: 0,
    explanation: 'A gúla kiterített hálója egyetlen alaplapból (szabályos hatszög) és a hozzákapcsolódó 6 darab oldalháromszögből áll.'
  },
  {
    id: 'pyr4',
    category: 'Euler-tétel alkalmazása',
    question: 'Egy gúlának összesen 14 éle van. Hány oldalú a gúla alaplapja, és hány csúcsa van?',
    options: [
      'Hétszög alapú (n = 7), és 8 csúcsa van (C = 7 + 1 = 8)',
      '14 oldalú alaplapja van, és 15 csúcsa',
      'Hatszög alapú, és 7 csúcsa van',
      'Nyolcszög alapú, és 9 csúcsa van'
    ],
    correctIndex: 0,
    explanation: 'Gúla éleinek száma É = 2n. Ha 2n = 14, akkor n = 7 (hétszög). A csúcsok száma C = n + 1 = 8.'
  },
  {
    id: 'pyr5',
    category: 'Testmagasság vs. oldalmagasság',
    question: 'Mi a különbség a gúla testmagassága (m) és oldallapjának magassága (mₒ) között?',
    options: [
      'A testmagasság merőleges az alaplap síkjára, míg az oldalmagasság az oldallapon fut a csúcstól az alapélig (mₒ > m).',
      'A két magasság mindig pontosan egyenlő.',
      'A testmagasság mindig hosszabb, mint az oldalmagasság.',
      'Az oldalmagasság vízszintes.'
    ],
    correctIndex: 0,
    explanation: 'A testmagasság (m), az alapszakasz fele (a/2) és az oldalmagasság (mₒ) derékszögű háromszöget alkot, amelyben mₒ az átfogó, ezért mₒ² = m² + (a/2)².'
  },
  {
    id: 'pyr6',
    category: 'Tetraéder fogalma',
    question: 'Mit nevezünk szabályos tetraédernek?',
    options: [
      'Olyan gúlát, amelyet 4 darab egybevágó szabályos (egyenlő oldalú) háromszög határol',
      'Egy kockát',
      'Négyzet alapú gúlát',
      'Szabályos nyolcszög alapú testet'
    ],
    correctIndex: 0,
    explanation: 'A szabályos tetraéder a legegyszerűbb szabályos test (platóni test), 4 egybevágó egyenlő oldalú háromszöglappal.'
  }
];

export function PyramidsIntroQuiz({ onComplete, onBack }: PyramidsIntroQuizProps) {
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-amber-200">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2">
            {percentage >= 80 ? 'Gúlaszakértő!' : percentage >= 60 ? 'Szép eredmény!' : 'Gyakorolj még!'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">2. Gúlák kvíz befejezve</p>

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
            <Triangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">2. Fejezet • Gúlák Tulajdonságai</span>
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

export default PyramidsIntroQuiz;
