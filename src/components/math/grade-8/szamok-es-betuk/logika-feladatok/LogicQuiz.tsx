import React, { useState, useEffect, useCallback } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, Brain, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogicQuizProps {
  onComplete?: (result: QuizResult) => void;
  onBack: () => void;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

const QUESTIONS: Question[] = [
  {
    id: 'l1',
    category: 'Állítások és tagadás',
    question: 'Mi a helyes tagadása a következő állításnak: „Minden 8. osztályos tanuló szereti a matematikát.”?',
    options: [
      'Egyik 8. osztályos tanuló sem szereti a matematikát.',
      'Van legalább egy 8. osztályos tanuló, aki nem szereti a matematikát.',
      'Minden 8. osztályos tanuló utálja a matematikát.',
      'A tanulók többsége nem szereti a matematikát.'
    ],
    correctIndex: 1,
    explanation: 'A „Minden A rendelkezik B tulajdonsággal” típusú állítás tagadása: „Van olyan A, amelyik NEM rendelkezik B tulajdonsággal”. Nem kell, hogy mindegyik ne szeresse, elég 1 ellenpélda!'
  },
  {
    id: 'l2',
    category: 'Állítás fogalma',
    question: 'Az alábbi mondatok közül melyik számít matematikai értelemben állításnak (kijelentésnek)?',
    options: [
      'Mennyi 15 négyzete?',
      'Bárcsak ötös lennék matematikából!',
      'Minden prímszám páratlan.',
      'Tanulj szorgalmasan a felvételire!'
    ],
    correctIndex: 2,
    explanation: 'Állítás csak olyan kijelentő mondat lehet, amelyről egyértelműen eldönthető, hogy igaz vagy hamis. A „Minden prímszám páratlan” egy állítás (méghozzá hamis, mert a 2 páros prím).'
  },
  {
    id: 'l3',
    category: 'Skatulya-elv',
    question: 'Egy dobozban 10 fekete és 10 fehér zokni van összekeverve a sötétben. Legalább hány zoknit kell kivennünk ránézés nélkül, hogy biztosan legyen köztük egy azonos színű pár?',
    options: [
      '2 zoknit',
      '3 zoknit',
      '11 zoknit',
      '20 zoknit'
    ],
    correctIndex: 1,
    explanation: 'A skatulya-elv szerint 2 szín (skatulya) van: fekete és fehér. Ha 3 zoknit húzunk ($2+1$), biztosan lesz legalább 2 azonos színű köztük.'
  },
  {
    id: 'l4',
    category: 'Állítások tagadása',
    question: 'Mi a tagadása a következőnek: „Van olyan négyzetszám, amelyik páros.”?',
    options: [
      'Minden négyzetszám páratlan.',
      'Minden négyzetszám páros.',
      'Van olyan négyzetszám, amelyik páratlan.',
      'Néhány négyzetszám nem páros.'
    ],
    correctIndex: 0,
    explanation: 'A „Van olyan...” tagadása: „Nincs olyan...” vagy azzal egyenértékűen „Minden... az ellenkezője”. Vagyis „Egyetlen négyzetszám sem páros” = „Minden négyzetszám páratlan”.'
  },
  {
    id: 'l5',
    category: 'Skatulya-elv',
    question: 'Legalább hány embernek kell egy teremben lennie ahhoz, hogy biztosan legyen legalább 2 olyan, aki a hét ugyanazon napján született?',
    options: [
      '7',
      '8',
      '14',
      '15'
    ],
    correctIndex: 1,
    explanation: 'Egy héten 7 nap van (7 skatulya). A skatulya-elv alapján $7 + 1 = 8$ ember esetén biztosan lesz legalább kettő, aki ugyanazon a napon született.'
  },
  {
    id: 'l6',
    category: 'Logikai műveletek',
    question: 'Ha A = „A 24 osztható 4-gyel” (Igaz) és B = „A 24 osztható 5-tel” (Hamis), akkor mikor IGAZ a kapcsolatuk?',
    options: [
      'A ÉS B',
      'A VAGY B',
      'Nem A',
      'Nem A ÉS B'
    ],
    correctIndex: 1,
    explanation: 'A „VAGY” művelet (diszjunkció) már akkor is IGAZ, ha legalább az egyik tagja igaz. Mivel A igaz, ezért „A VAGY B” igaz lesz.'
  },
  {
    id: 'l7',
    category: 'Logikai fejtörő',
    question: 'Egy szigeten csak igazmondók (mindig igazat mondanak) és hazudósok (mindig hazudnak) élnek. Egy lakó azt mondja: „Én hazudós vagyok.” Ki mondhatta ezt?',
    options: [
      'Egy igazmondó.',
      'Egy hazudós.',
      'Bármelyik lakó.',
      'Egyik sem (ez egy logikai paradoxon).'
    ],
    correctIndex: 3,
    explanation: 'Igazmondó nem mondhatja, mert akkor hazudna. Hazudós sem mondhatja, mert akkor igazat mondana magáról. Tehát ilyen mondat nem hangozhat el ebben a világban (paradoxon).'
  },
  {
    id: 'l8',
    category: 'Skatulya-elv',
    question: 'Egy 37 fős osztályban a születési hónapok alapján a skatulya-elv garantálja, hogy biztosan van legalább:',
    options: [
      '2 diák, aki ugyanabban a hónapban született.',
      '3 diák, aki ugyanabban a hónapban született.',
      '4 diák, aki ugyanabban a hónapban született.',
      '5 diák, aki ugyanabban a hónapban született.'
    ],
    correctIndex: 2,
    explanation: '12 hónap van. $37 = 3 \\cdot 12 + 1$. Mivel $37 > 3 \\cdot 12$, a skatulya-elv szerint biztosan van legalább $3 + 1 = 4$ diák, aki ugyanabban a hónapban ünnepli a születésnapját.'
  }
];

export function LogicQuiz({ onComplete, onBack }: LogicQuizProps) {
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2">
            {percentage >= 80 ? 'Kiváló logika!' : percentage >= 60 ? 'Szép eredmény!' : 'Gyakorolj még!'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">1. Logika feladatok kvíz befejezve</p>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-6">
            <div className="text-5xl font-black text-blue-600 mb-2">{percentage}%</div>
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
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 font-bold shadow-md shadow-blue-200"
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
          <span className="text-xs font-bold px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-100">
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
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">1. Fejezet • Logika</span>
            <h3 className="text-lg md:text-xl font-bold text-slate-800 mt-1 leading-snug">
              {currentQ.question}
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;
            let btnStyle = "border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 text-slate-700";

            if (showResult) {
              if (isCorrect) {
                btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
              } else if (isSelected && !isCorrect) {
                btnStyle = "border-rose-500 bg-rose-50 text-rose-900";
              } else {
                btnStyle = "border-slate-100 text-slate-400 opacity-60";
              }
            } else if (isSelected) {
              btnStyle = "border-blue-600 bg-blue-50 text-blue-900 font-bold ring-2 ring-blue-500/20";
            }

            return (
              <button
                key={idx}
                disabled={showResult}
                onClick={() => handleSelect(idx)}
                className={cn(
                  "w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-sm md:text-base",
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
              <HelpCircle className="w-4 h-4 text-blue-600" /> Magyarázat:
            </div>
            <p>{currentQ.explanation}</p>
          </div>
        )}

        <div className="pt-2">
          {!showResult ? (
            <Button
              disabled={selectedOption === null}
              onClick={checkAnswer}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 rounded-xl font-bold shadow-md shadow-blue-200"
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

export default LogicQuiz;
