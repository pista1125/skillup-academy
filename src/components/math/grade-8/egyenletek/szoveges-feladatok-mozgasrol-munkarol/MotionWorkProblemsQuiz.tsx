import React, { useState } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, Timer, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MotionWorkProblemsQuizProps {
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
    id: 'mw1',
    category: 'Találkozási feladat',
    question: 'Két város távolsága 180 km. Egyszerre indul egymással szembe két autó, az egyik 50 km/h, a másik 40 km/h sebességgel. Hány óra múlva találkoznak?',
    options: ['2 óra múlva', '1,5 óra múlva', '2,5 óra múlva', '3 óra múlva'],
    correctIndex: 0,
    explanation: 'Együttes sebességük v_ö = 50 + 40 = 90 km/h. Találkozási idő: t = s / v_ö = 180 / 90 = 2 óra.'
  },
  {
    id: 'mw2',
    category: 'Együttes munkavégzés',
    question: 'Egy kerti munkát Tamás egyedül 12 óra alatt, Gábor egyedül 6 óra alatt végez el. Hány óra alatt végzik el a munkát közösen?',
    options: ['4 óra alatt', '3 óra alatt', '4,5 óra alatt', '9 óra alatt'],
    correctIndex: 0,
    explanation: '1 óra alatt: 1/12 + 1/6 = 1/12 + 2/12 = 3/12 = 1/4 rész. Tehát a teljes munka ideje 4 óra.'
  },
  {
    id: 'mw3',
    category: 'Utolérési feladat',
    question: 'Egy gyalogos 4 km/h sebességgel elindult. 3 óra múlva ugyaninnen kerékpáros indult utána 16 km/h sebességgel. Hány óra múlva éri utol a kerékpáros a gyalogost?',
    options: ['1 óra múlva', '1,5 óra múlva', '45 perc múlva', '2 óra múlva'],
    correctIndex: 0,
    explanation: 'A gyalogos előnye: 3 · 4 = 12 km. A sebességkülönbség: 16 - 4 = 12 km/h. Utolérési idő: t = 12 / 12 = 1 óra.'
  },
  {
    id: 'mw4',
    category: 'Folyóvízi mozgás',
    question: 'Egy motorcsónak saját sebessége 22 km/h, a folyó sebessége 3 km/h. Mennyi utat tesz meg a csónak folyásirányban lefelé 4 óra alatt?',
    options: ['100 km', '76 km', '88 km', '96 km'],
    correctIndex: 0,
    explanation: 'Folyásirányban a sebességek összeadódnak: v = 22 + 3 = 25 km/h. Út: s = 25 · 4 = 100 km.'
  },
  {
    id: 'mw5',
    category: 'Csap és lefolyó',
    question: 'Egy tartályt a beömlő csap 4 óra alatt tölt meg, a leeresztő csap 6 óra alatt ürít ki teljesen. Ha mindkettő nyitva van, hány óra alatt telik meg a tartály?',
    options: ['12 óra alatt', '10 óra alatt', '8 óra alatt', '5 óra alatt'],
    correctIndex: 0,
    explanation: '1 óra alatt a nettó töltés: 1/4 - 1/6 = 3/12 - 2/12 = 1/12 rész. Így 12 óra alatt telik meg teljesen a tartály.'
  },
  {
    id: 'mw6',
    category: 'Átlagsebesség',
    question: 'Egy autó odafelé 60 km/h sebességgel tett meg 120 km-t, visszafelé 40 km/h-val jött ugyanazon az úton. Mennyi a teljes útra vonatkozó átlagsebessége?',
    options: ['48 km/h', '50 km/h', '45 km/h', '52 km/h'],
    correctIndex: 0,
    explanation: 'Összes út = 120 + 120 = 240 km. Idők: t1 = 120/60 = 2 h, t2 = 120/40 = 3 h. Összes idő = 5 h. Átlagsebesség = 240 / 5 = 48 km/h.'
  }
];

export function MotionWorkProblemsQuiz({ onComplete, onBack }: MotionWorkProblemsQuizProps) {
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2">
            {percentage >= 80 ? 'Mozgás & Munka Mester!' : percentage >= 60 ? 'Szép eredmény!' : 'Gyakorolj még!'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">4. Mozgás és munka feladatok kvíz befejezve</p>

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
            <Timer className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">4. Fejezet • Mozgás és Munka</span>
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

export default MotionWorkProblemsQuiz;
