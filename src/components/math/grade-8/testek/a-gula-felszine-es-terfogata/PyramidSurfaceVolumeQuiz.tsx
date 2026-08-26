import React, { useState } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, Calculator, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PyramidSurfaceVolumeQuizProps {
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
    id: 'psv1',
    category: 'Gúla térfogatának képlete',
    question: 'Egy négyzet alapú gúla alapéle a = 6 cm, testmagassága m = 10 cm. Mennyi a térfogata (V)?',
    options: ['120 cm³', '360 cm³', '60 cm³', '180 cm³'],
    correctIndex: 0,
    explanation: 'Alapterület: Tₐ = 6² = 36 cm². Térfogat: V = (Tₐ · m) / 3 = (36 · 10) / 3 = 120 cm³.'
  },
  {
    id: 'psv2',
    category: 'Oldalmagasság számítása Pitagorasz-tétellel',
    question: 'Egy szabályos négyzet alapú gúla alapéle a = 12 cm, testmagassága m = 8 cm. Mennyi az oldallapjának magassága (mₒ)?',
    options: ['10 cm', '14 cm', '12 cm', '6 cm'],
    correctIndex: 0,
    explanation: 'A derékszögű háromszög befogói: m = 8 cm és a/2 = 6 cm. Átfogó: mₒ = √(8² + 6²) = √(64 + 36) = √100 = 10 cm.'
  },
  {
    id: 'psv3',
    category: 'Szabályos gúla felszíne',
    question: 'Egy szabályos négyzet alapú gúla alapéle a = 10 cm, oldalmagassága mₒ = 13 cm. Mennyi a gúla teljes felszíne (A)?',
    options: ['360 cm²', '260 cm²', '100 cm²', '460 cm²'],
    correctIndex: 0,
    explanation: 'Alapterület: Tₐ = 10² = 100 cm². Palástterület: 4 · (10 · 13 / 2) = 4 · 65 = 260 cm². Teljes felszín: A = 100 + 260 = 360 cm².'
  },
  {
    id: 'psv4',
    category: 'Gúla és hasáb kapcsolata',
    question: 'Egy egyenes hasáb és egy gúla alapterülete és magassága megegyezik. Hányszorosa a hasáb térfogata a gúla térfogatának?',
    options: [
      'Pontosan 3-szorosa (V_hasáb = 3 · V_gúla)',
      '2-szerese',
      '4-szerese',
      'Ugyanannyi'
    ],
    correctIndex: 0,
    explanation: 'A hasáb térfogata V = Tₐ · m, míg a gúláé V = (Tₐ · m) / 3, tehát a hasáb térfogata pontosan háromszorosa a gúláénak.'
  },
  {
    id: 'psv5',
    category: 'Oldalél kiszámítása',
    question: 'Egy szabályos négyzet alapú gúla alapéle a = 8 cm, oldalmagassága mₒ = 3 cm. Mennyi az oldalél (b) hossza?',
    options: ['5 cm', '7 cm', '6 cm', '8 cm'],
    correctIndex: 0,
    explanation: 'Az oldallapban mₒ és a/2 = 4 a befogók: b = √(3² + 4²) = √(9 + 16) = √25 = 5 cm.'
  },
  {
    id: 'psv6',
    category: 'Térfogatból magasság visszaszámítása',
    question: 'Egy négyzet alapú gúla alapterülete Tₐ = 50 cm², térfogata V = 250 cm³. Milyen magas a gúla (m)?',
    options: ['15 cm', '5 cm', '10 cm', '25 cm'],
    correctIndex: 0,
    explanation: 'V = (Tₐ · m) / 3 => 250 = (50 · m) / 3 => 750 = 50 · m => m = 15 cm.'
  }
];

export function PyramidSurfaceVolumeQuiz({ onComplete, onBack }: PyramidSurfaceVolumeQuizProps) {
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-white shadow-lg shadow-amber-200">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2">
            {percentage >= 80 ? 'Gúlaszámító Mester!' : percentage >= 60 ? 'Szép eredmény!' : 'Gyakorolj még!'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">3. A gúla felszíne és térfogata kvíz befejezve</p>

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
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">3. Fejezet • Gúla Felszín & Térfogat</span>
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

export default PyramidSurfaceVolumeQuiz;
