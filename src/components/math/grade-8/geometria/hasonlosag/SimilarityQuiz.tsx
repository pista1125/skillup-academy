import React, { useState } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, Maximize2, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SimilarityQuizProps {
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
    id: 'sim1',
    category: 'Hasonlósági arány',
    question: 'Egy háromszög oldalai 4 cm, 6 cm és 8 cm. Egy hozzá hasonló háromszög leghosszabb oldala 24 cm. Mennyi a másik két oldala?',
    options: [
      '12 cm és 18 cm',
      '8 cm és 12 cm',
      '16 cm és 20 cm',
      '6 cm és 10 cm'
    ],
    correctIndex: 0,
    explanation: 'A leghosszabb oldalak aránya: k = 24 / 8 = 3. Tehát a többi oldal is 3-szorosára nő: 4 · 3 = 12 cm, és 6 · 3 = 18 cm.'
  },
  {
    id: 'sim2',
    category: 'Területek aránya',
    question: 'Két hasonló sokszög hasonlósági aránya k = 4. Hányszorosa a nagyobb sokszög területe a kisebbének?',
    options: ['16-szorosa (k²)', '4-szerese', '8-szorosa', '64-szerese'],
    correctIndex: 0,
    explanation: 'Hasonló síkidomok területeinek aránya a hasonlósági arány négyzetével egyenlő: T\'/T = k² = 4² = 16.'
  },
  {
    id: 'sim3',
    category: 'Kerületek aránya',
    question: 'Két hasonló háromszög területe 25 cm² és 100 cm². Mekkora a kerületeik aránya?',
    options: ['2 (k = √4 = 2)', '4', '16', '1,41'],
    correctIndex: 0,
    explanation: 'A területek aránya k² = 100 / 25 = 4. Ebből a hasonlósági arányszám (és a kerületek aránya) k = √4 = 2.'
  },
  {
    id: 'sim4',
    category: 'Hasonlóság alapesete',
    question: 'Egy derékszögű háromszög egyik hegyesszöge 35°. Egy másik derékszögű háromszög egyik hegyesszöge 55°. Hasonló-e a két háromszög?',
    options: [
      'Igen, mert mindkettő hegyesszögei 35° és 55° (sz-sz alapeset).',
      'Nem, mert a szögek nem egyformák.',
      'Csak akkor, ha az átfogójuk egyenlő.',
      'Nem dönthető el oldalak nélkül.'
    ],
    correctIndex: 0,
    explanation: 'A derékszögű háromszög másik hegyesszöge 90° - 35° = 55°. Így mindkét háromszög szögei 90°, 55°, 35°, tehát a két szög egyezése (sz-sz) miatt hasonlóak!'
  },
  {
    id: 'sim5',
    category: 'Egybevágóság vs. Hasonlóság',
    question: 'Melyik állítás IGAZ az alábbiak közül?',
    options: [
      'Minden egybevágó alakzat hasonló is (k = 1 aránnyal), de nem minden hasonló alakzat egybevágó.',
      'Minden hasonló alakzat egybevágó is.',
      'A hasonlóságnál a szögek is k-szorosukra nőnek.',
      'Két kör sohasem hasonló egymáshoz.'
    ],
    correctIndex: 0,
    explanation: 'Az egybevágóság a hasonlóság speciális esete (amikor a hasonlósági arány k = 1). A szögek hasonlóságnál mindig változatlanok maradnak!'
  },
  {
    id: 'sim6',
    category: 'Gyakorlati feladat (Árnyékmódszer)',
    question: 'Egy 1,8 m magas ember árnyéka 2,4 m hosszú. Ugyanekkor egy fa árnyéka 12 m hosszú. Milyen magas a fa?',
    options: ['9 m', '8 m', '10 m', '15 m'],
    correctIndex: 0,
    explanation: 'A napsugarak iránya miatt hasonló derékszögű háromszögek keletkeznek: Magasság / Árnyék = x / 12 = 1,8 / 2,4. x = (1,8 / 2,4) · 12 = 0,75 · 12 = 9 m.'
  }
];

export function SimilarityQuiz({ onComplete, onBack }: SimilarityQuizProps) {
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2">
            {percentage >= 80 ? 'Hasonlóság Mestere!' : percentage >= 60 ? 'Szép eredmény!' : 'Gyakorolj még!'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">4. Hasonlóság kvíz befejezve</p>

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
            <Maximize2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">4. Fejezet • Hasonlóság</span>
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

export default SimilarityQuiz;
