import React, { useState } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, ArrowRightLeft, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InverseProportionQuizProps {
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
    id: 'ip1',
    category: 'Szorzat állandósága',
    question: 'Két mennyiség, x és y fordítottan arányos. Ha x = 6 esetén y = 8, mennyi lesz az y értéke, ha x = 12?',
    options: ['4', '16', '2', '14'],
    correctIndex: 0,
    explanation: 'Fordított arányosságnál a szorzat állandó: k = x · y = 6 · 8 = 48. Ha x = 12, akkor y = 48 / 12 = 4 (mivel x kétszeresére nőtt, y felére csökken).'
  },
  {
    id: 'ip2',
    category: 'Grafikon felismerése',
    question: 'Milyen alakú az y = 12 / x fordított arányosság grafikonja?',
    options: [
      'Hiperbola (két ágú görbe az I. és III. síknegyedben)',
      'Origón átmenő egyenes',
      'Felfelé nyíló parabola',
      'Kör a síkban'
    ],
    correctIndex: 0,
    explanation: 'Az y = k / x alakú függvények grafikonja hiperbola, amely sosem metszi a koordinátatengelyeket.'
  },
  {
    id: 'ip3',
    category: 'Munkamegosztási feladat',
    question: '6 munkás 8 óra alatt festi le a kerítést. Hány óra alatt végezne ugyanezzel a munkával 4 munkás azonos munkatempó mellett?',
    options: ['12 óra alatt', '5,3 óra alatt', '10 óra alatt', '16 óra alatt'],
    correctIndex: 0,
    explanation: 'Összes munkaóra: 6 · 8 = 48 munkaóra. 4 munkás ideje: 48 / 4 = 12 óra.'
  },
  {
    id: 'ip4',
    category: 'Sebesség és menetidő',
    question: 'Egy autó 90 km/h átlagsebességgel 2 óra alatt ér el a céljához. Mennyi időre lenne szüksége 60 km/h átlagsebességgel?',
    options: ['3 óra', '1,5 óra', '2,5 óra', '4 óra'],
    correctIndex: 0,
    explanation: 'A teljes távolság: s = v · t = 90 · 2 = 180 km. Új menetidő: t = 180 / 60 = 3 óra.'
  },
  {
    id: 'ip5',
    category: 'Értelmezési tartomány kikötése',
    question: 'Miért NEM veheti fel az x értéke a 0-t az y = k / x hozzárendelésben?',
    options: [
      'Mert 0-val nem lehet osztani (értelmetlen művelet)',
      'Mert a 0 mindig pozitív szám',
      'Mert az y negatív lenne',
      'Csak megállapodás kérdése'
    ],
    correctIndex: 0,
    explanation: 'A nevezőben álló kifejezés értéke nem lehet nulla, mert nullával való osztás a matematikában nincs értelmezve (D = R \\ {0}).'
  },
  {
    id: 'ip6',
    category: 'Fordított arányosság felismerése',
    question: 'Melyik kapcsolat jelent FORDÍTOTT ARÁNYOSSÁGOT az alábbiak közül?',
    options: [
      'Rögzített 24 cm² területű téglalap két oldalhosszúsága (a és b)',
      'Egy négyzet kerülete és oldalhossza',
      'Egy könyv elolvasott oldalainak száma és a hátralévő oldalak száma',
      'A boltban vásárolt füzetek száma és ára'
    ],
    correctIndex: 0,
    explanation: 'Mivel a · b = 24 (a szorzat állandó), így a = 24 / b, ami fordított arányosság.'
  }
];

export function InverseProportionQuiz({ onComplete, onBack }: InverseProportionQuizProps) {
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2">
            {percentage >= 80 ? 'Hiperbola Mester!' : percentage >= 60 ? 'Szép eredmény!' : 'Gyakorolj még!'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">3. Fordított arányosság kvíz befejezve</p>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-6">
            <div className="text-5xl font-black text-indigo-600 mb-2">{percentage}%</div>
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
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-11 font-bold shadow-md shadow-indigo-200"
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
          <span className="text-xs font-bold px-3 py-1 bg-indigo-50 text-indigo-800 rounded-full border border-indigo-200">
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
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <ArrowRightLeft className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">3. Fejezet • Fordított Arányosság</span>
            <h3 className="text-lg md:text-xl font-bold text-slate-800 mt-1 leading-snug">
              {currentQ.question}
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;
            let btnStyle = "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 text-slate-700";

            if (showResult) {
              if (isCorrect) {
                btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
              } else if (isSelected && !isCorrect) {
                btnStyle = "border-rose-500 bg-rose-50 text-rose-900";
              } else {
                btnStyle = "border-slate-100 text-slate-400 opacity-60";
              }
            } else if (isSelected) {
              btnStyle = "border-indigo-600 bg-indigo-50 text-indigo-900 font-bold ring-2 ring-indigo-500/20";
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
              <HelpCircle className="w-4 h-4 text-indigo-600" /> Magyarázat:
            </div>
            <p>{currentQ.explanation}</p>
          </div>
        )}

        <div className="pt-2">
          {!showResult ? (
            <Button
              disabled={selectedOption === null}
              onClick={checkAnswer}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12 rounded-xl font-bold shadow-md shadow-indigo-200"
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

export default InverseProportionQuiz;
