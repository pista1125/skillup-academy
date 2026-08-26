import React, { useState } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, Ruler, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConstructionsMeasurementsQuizProps {
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
    id: 'cm1',
    category: 'Derékszögű háromszög oldalai',
    question: 'Hogyan nevezzük a derékszögű háromszög derékszögét bezáró két oldalt, illetve a derékszöggel szemközti leghosszabb oldalt?',
    options: [
      'Befogók a derékszöget bezáró oldalak, és átfogó a leghosszabb oldal.',
      'Átfogók a derékszöget bezáró oldalak, és alap a harmadik oldal.',
      'Szárak és magasság.',
      'Húr és átmérő.'
    ],
    correctIndex: 0,
    explanation: 'A derékszöget közrefogó két oldal a befogó (a és b), a derékszöggel szemben fekvő leghosszabb oldal pedig az átfogó (c).'
  },
  {
    id: 'cm2',
    category: 'Thálész-tétel szerkesztésnél',
    question: 'Egy derékszögű háromszög átfogója AB = 10 cm. Hol helyezkedik el a C derékszögű csúcs a síkban?',
    options: [
      'Az AB szakasz mint átmérő fölé rajzolt körön (a Thálész-körön, az AB pontok kivételével).',
      'Az AB szakasz felezőmerőlegesén.',
      'Bárhol a síkban.',
      'Csak az origóban.'
    ],
    correctIndex: 0,
    explanation: 'A Thálész-tétel szerint ha egy kör átmérőjének két végpontját összekötjük a kör bármely más pontjával, mindig derékszögű háromszöget kapunk.'
  },
  {
    id: 'cm3',
    category: 'Négyzetek területe a négyzethálón',
    question: 'Egy derékszögű háromszög befogóira 9 cm² és 16 cm² területű négyzeteket rajzoltunk. Mekkora az átfogóra rajzolt négyzet területe?',
    options: ['25 cm²', '7 cm²', '144 cm²', '20 cm²'],
    correctIndex: 0,
    explanation: 'A befogókra emelt négyzetek területének összege megegyezik az átfogóra emelt négyzet területével: 9 cm² + 16 cm² = 25 cm².'
  },
  {
    id: 'cm4',
    category: 'Szerkesztés menete',
    question: 'Adott egy derékszögű háromszög a = 6 cm-es befogója és c = 10 cm-es átfogója. Melyik körívvel metsszük ki a harmadik csúcsot a derékszög szárából?',
    options: [
      'A B csúcsból rajzolt 10 cm sugarú körívvel',
      'A C csúcsból rajzolt 6 cm sugarú körívvel',
      'A felezőpontból 3 cm-es körívvel',
      'Tetszőleges sugárral'
    ],
    correctIndex: 0,
    explanation: 'A felmért a = 6 cm szakasz B végpontjából 10 cm sugarú (átfogó hosszúságú) körívet húzunk, amely kijelöli az A csúcsot a C-ből húzott merőleges egyenesen.'
  },
  {
    id: 'cm5',
    category: 'Hegyesszögek összege',
    question: 'Mennyi egy derékszögű háromszög két hegyesszögének összege (α + β)?',
    options: ['90° (pótszögek)', '180°', '60°', '45°'],
    correctIndex: 0,
    explanation: 'Mivel a belső szögek összege 180° és az egyik szög 90°, így a másik két hegyesszög összege mindig pontosan 180° - 90° = 90°.'
  },
  {
    id: 'cm6',
    category: 'Darabolásos szemléltetés',
    question: 'Mi a lényege a Pitagorasz-tétel darabolásos (átrendezéses) bizonyításának?',
    options: [
      'Két egyenlő területű nagy négyzetből 4-4 egybevágó derékszögű háromszöget elhagyva a megmaradt területek egyenlők: a² + b² = c².',
      'Összehajtogatjuk a papírt addig, amíg kör nem lesz.',
      'Csak vonalzóval lemérjük a hosszakat.',
      'A szögeket összeadjuk 360°-ig.'
    ],
    correctIndex: 0,
    explanation: 'Az (a+b) oldalú nagy négyzetből 4 darab derékszögű háromszöget elvéve az egyik elrendezésben a² és b² négyzetek, a másikban a c² négyzet marad meg, így területeik egyenlők.'
  }
];

export function ConstructionsMeasurementsQuiz({ onComplete, onBack }: ConstructionsMeasurementsQuizProps) {
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
            {percentage >= 80 ? 'Szerkesztési Mester!' : percentage >= 60 ? 'Szép eredmény!' : 'Gyakorolj még!'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">1. Szerkesztések, mérések kvíz befejezve</p>

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
            <Ruler className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">1. Fejezet • Szerkesztések és Mérések</span>
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

export default ConstructionsMeasurementsQuiz;
