import React, { useState } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, FlaskConical, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MixingWordProblemsQuizProps {
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
    id: 'mix1',
    category: 'Két oldat keverése',
    question: 'Összekeverünk 3 kg 20%-os és 2 kg 30%-os sóoldatot. Hány százalékos lesz a kapott keverék?',
    options: ['24%-os', '25%-os', '22%-os', '26%-os'],
    correctIndex: 0,
    explanation: 'Tiszta só: 3 · 20 + 2 · 30 = 60 + 60 = 120 g (0,12 kg). Össztömeg = 3 + 2 = 5 kg. Százalék: 120 / 5 = 24%.'
  },
  {
    id: 'mix2',
    category: 'Hígítás tiszta vízzel',
    question: '4 kg 15%-os cukoroldathoz 2 kg tiszta vizet adunk. Hány százalékos lesz az új oldat?',
    options: ['10%-os', '12%-os', '7,5%-os', '8%-os'],
    correctIndex: 0,
    explanation: 'Tiszta cukor = 4 · 15 = 60. Az új tömeg = 4 + 2 = 6 kg. Az új töménység: 60 / 6 = 10%.'
  },
  {
    id: 'mix3',
    category: 'Ismeretlen tömeg kiszámítása',
    question: 'Hány kg 10%-os és hány kg 40%-os alkohololdatból készíthető 60 kg 20%-os oldat?',
    options: [
      '40 kg 10%-os és 20 kg 40%-os',
      '30 kg 10%-os és 30 kg 40%-os',
      '50 kg 10%-os és 10 kg 40%-os',
      '45 kg 10%-os és 15 kg 40%-os'
    ],
    correctIndex: 0,
    explanation: '10x + 40(60 - x) = 60 · 20 => 10x + 2400 - 40x = 1200 => 30x = 1200 => x = 40 kg (10%-os), és 60 - 40 = 20 kg (40%-os).'
  },
  {
    id: 'mix4',
    category: 'Töményítés tiszta sóval',
    question: 'Hány gramm tiszta sót kell adni 180 g 10%-os sóoldathoz, hogy 20%-os oldatot kapjunk?',
    options: ['22,5 g', '20 g', '18 g', '25 g'],
    correctIndex: 0,
    explanation: 'Só egyenlet (tiszta só 100%-os): 180 · 10 + x · 100 = (180 + x) · 20 => 1800 + 100x = 3600 + 20x => 80x = 1800 => x = 22,5 g.'
  },
  {
    id: 'mix5',
    category: 'Ötvözetek',
    question: 'Összeolvasztunk 300 g 14 karátos (58,3%) aranyat és 200 g 18 karátos (75%) aranyat. Hány karátos az ötvözet?',
    options: ['15,6 karátos', '16 karátos', '15 karátos', '16,2 karátos'],
    correctIndex: 0,
    explanation: 'Karátban számolva: (300 · 14 + 200 · 18) / 500 = (4200 + 3600) / 500 = 7800 / 500 = 15,6 karát.'
  },
  {
    id: 'mix6',
    category: 'Víz elpárologtatása',
    question: '500 g 8%-os sóoldatból elpárologtatunk 100 g vizet. Hány százalékos lesz a megmaradó oldat?',
    options: ['10%-os', '9,6%-os', '12%-os', '16%-os'],
    correctIndex: 0,
    explanation: 'A só mennyisége nem változik: 500 · 0,08 = 40 g só. Az új oldat tömege: 500 - 100 = 400 g. Új százalék: (40 / 400) · 100% = 10%.'
  }
];

export function MixingWordProblemsQuiz({ onComplete, onBack }: MixingWordProblemsQuizProps) {
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-teal-200">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2">
            {percentage >= 80 ? 'Keverési Szakértő!' : percentage >= 60 ? 'Szép eredmény!' : 'Gyakorolj még!'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">3. Szöveges feladatok összekeverésről kvíz befejezve</p>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-6">
            <div className="text-5xl font-black text-teal-600 mb-2">{percentage}%</div>
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
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-xl h-11 font-bold shadow-md shadow-teal-200"
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
          <span className="text-xs font-bold px-3 py-1 bg-teal-50 text-teal-700 rounded-full border border-teal-100">
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
          <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl">
            <FlaskConical className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">3. Fejezet • Keverési Feladatok</span>
            <h3 className="text-lg md:text-xl font-bold text-slate-800 mt-1 leading-snug">
              {currentQ.question}
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;
            let btnStyle = "border-slate-200 hover:border-teal-300 hover:bg-teal-50/50 text-slate-700";

            if (showResult) {
              if (isCorrect) {
                btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
              } else if (isSelected && !isCorrect) {
                btnStyle = "border-rose-500 bg-rose-50 text-rose-900";
              } else {
                btnStyle = "border-slate-100 text-slate-400 opacity-60";
              }
            } else if (isSelected) {
              btnStyle = "border-teal-600 bg-teal-50 text-teal-900 font-bold ring-2 ring-teal-500/20";
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
              <HelpCircle className="w-4 h-4 text-teal-600" /> Magyarázat:
            </div>
            <p>{currentQ.explanation}</p>
          </div>
        )}

        <div className="pt-2">
          {!showResult ? (
            <Button
              disabled={selectedOption === null}
              onClick={checkAnswer}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white h-12 rounded-xl font-bold shadow-md shadow-teal-200"
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

export default MixingWordProblemsQuiz;
