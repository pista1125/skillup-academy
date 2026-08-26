import React, { useState } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, Brain, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MixedWordProblemsQuizProps {
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
    id: 'mx1',
    category: 'Tyúkok és nyulak',
    question: 'Egy farmon összesen 40 állat van (kacsák és bárányok). Együtt 110 lábuk van. Hány bárány él a farmon?',
    options: ['15 bárány', '25 bárány', '20 bárány', '10 bárány'],
    correctIndex: 0,
    explanation: 'Legyen b a bárányok száma (4 láb) és 40-b a kacsák száma (2 láb). 4b + 2(40 - b) = 110 => 2b + 80 = 110 => 2b = 30 => b = 15 bárány.'
  },
  {
    id: 'mx2',
    category: 'Jegyárak és bevételek',
    question: 'Egy színházi előadásra 150 jegy kelt el 420 000 Ft-ért. A földszinti hely 3200 Ft, az erkélyhely 2400 Ft. Hány földszinti jegyet adtak el?',
    options: ['75 jegyet', '60 jegyet', '80 jegyet', '90 jegyet'],
    correctIndex: 0,
    explanation: '3200x + 2400(150 - x) = 420 000 => 3200x + 360 000 - 2400x = 420 000 => 800x = 60 000 => x = 75 jegy.'
  },
  {
    id: 'mx3',
    category: 'Kétismeretlenes feladat',
    question: 'Két szám összege 64, különbsége 18. Melyik a nagyobb szám?',
    options: ['41', '39', '43', '37'],
    correctIndex: 0,
    explanation: 'x + y = 64 és x - y = 18. A két egyenletet összeadva: 2x = 82 => x = 41. (y = 23, 41 - 23 = 18).'
  },
  {
    id: 'mx4',
    category: 'Padok és diákok',
    question: 'Ha egy teremben minden padba 2 diák ül, 5 diáknak nem jut hely. Ha minden padba 3 diák ül, 2 pad üresen marad. Hány diák van?',
    options: ['27 diák', '11 diák', '25 diák', '33 diák'],
    correctIndex: 0,
    explanation: 'Legyen p a padok száma: Diákok = 2p + 5 = 3(p - 2) => 2p + 5 = 3p - 6 => p = 11 pad. Diákok száma: 2 · 11 + 5 = 27.'
  },
  {
    id: 'mx5',
    category: 'Lépcsőfokok',
    question: 'Peti ha kettesével lépked a lépcsőn, 7 lépéssel többet tesz meg, mintha hármasával lépkedne. Hány lépcsőfok van a lépcsőn?',
    options: ['42 lépcsőfok', '36 lépcsőfok', '48 lépcsőfok', '30 lépcsőfok'],
    correctIndex: 0,
    explanation: 'Lépcsőfokok száma: x. x/2 = x/3 + 7 => Beszorzunk 6-tal: 3x = 2x + 42 => x = 42 lépcsőfok.'
  },
  {
    id: 'mx6',
    category: 'Arányos megosztás',
    question: 'Egy 360 oldalas könyvet Anna 3 nap alatt olvasott el úgy, hogy mindennap 20 oldallal többet olvasott, mint az előző napon. Hány oldalt olvasott az első nap?',
    options: ['100 oldalt', '120 oldalt', '80 oldalt', '110 oldalt'],
    correctIndex: 0,
    explanation: 'x + (x + 20) + (x + 40) = 360 => 3x + 60 = 360 => 3x = 300 => x = 100 oldal.'
  }
];

export function MixedWordProblemsQuiz({ onComplete, onBack }: MixedWordProblemsQuizProps) {
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white shadow-lg shadow-violet-200">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2">
            {percentage >= 80 ? 'Logikai Zseni!' : percentage >= 60 ? 'Szép eredmény!' : 'Gyakorolj még!'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">6. Vegyes feladatok kvíz befejezve</p>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-6">
            <div className="text-5xl font-black text-violet-600 mb-2">{percentage}%</div>
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
              className="flex-1 bg-violet-600 hover:bg-violet-700 text-white rounded-xl h-11 font-bold shadow-md shadow-violet-200"
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
          <span className="text-xs font-bold px-3 py-1 bg-violet-50 text-violet-700 rounded-full border border-violet-100">
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
          <div className="p-2.5 bg-violet-50 text-violet-600 rounded-xl">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-violet-600 uppercase tracking-wider">6. Fejezet • Vegyes Szöveges Feladatok</span>
            <h3 className="text-lg md:text-xl font-bold text-slate-800 mt-1 leading-snug">
              {currentQ.question}
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;
            let btnStyle = "border-slate-200 hover:border-violet-300 hover:bg-violet-50/50 text-slate-700";

            if (showResult) {
              if (isCorrect) {
                btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
              } else if (isSelected && !isCorrect) {
                btnStyle = "border-rose-500 bg-rose-50 text-rose-900";
              } else {
                btnStyle = "border-slate-100 text-slate-400 opacity-60";
              }
            } else if (isSelected) {
              btnStyle = "border-violet-600 bg-violet-50 text-violet-900 font-bold ring-2 ring-violet-500/20";
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
              <HelpCircle className="w-4 h-4 text-violet-600" /> Magyarázat:
            </div>
            <p>{currentQ.explanation}</p>
          </div>
        )}

        <div className="pt-2">
          {!showResult ? (
            <Button
              disabled={selectedOption === null}
              onClick={checkAnswer}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white h-12 rounded-xl font-bold shadow-md shadow-violet-200"
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

export default MixedWordProblemsQuiz;
