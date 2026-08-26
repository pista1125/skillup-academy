import React, { useState } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, Circle, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SphereQuizProps {
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
    id: 'sph1',
    category: 'Gömb felszínének képlete',
    question: 'Egy gömb sugara r = 5 cm. Mennyi a gömb felszíne (π ≈ 3,14)?',
    options: [
      'A = 100π ≈ 314 cm²',
      'A = 25π ≈ 78,5 cm²',
      'A = 500π / 3 ≈ 523,3 cm²',
      'A = 20π ≈ 62,8 cm²'
    ],
    correctIndex: 0,
    explanation: 'A = 4 · r² · π = 4 · 25 · π = 100π ≈ 314 cm².'
  },
  {
    id: 'sph2',
    category: 'Gömb térfogatának képlete',
    question: 'Egy gömb sugara r = 3 cm. Mennyi a gömb térfogata (V)?',
    options: ['36π ≈ 113,04 cm³', '12π ≈ 37,68 cm³', '108π cm³', '27π cm³'],
    correctIndex: 0,
    explanation: 'V = (4/3) · π · r³ = (4/3) · π · 27 = 4 · 9 · π = 36π ≈ 113,04 cm³.'
  },
  {
    id: 'sph3',
    category: 'Főkör és felszín kapcsolata',
    question: 'Egy gömb főkörének területe 15 cm². Mennyi a teljes gömb felületének területe (felszíne)?',
    options: ['60 cm²', '30 cm²', '45 cm²', '15 cm²'],
    correctIndex: 0,
    explanation: 'A főkör területe T = r²π. A gömb felszíne A = 4r²π = 4 · T = 4 · 15 = 60 cm².'
  },
  {
    id: 'sph4',
    category: 'Átmérőből térfogatszámítás',
    question: 'Egy gömb alakú labda átmérője d = 20 cm (sugara r = 10 cm). Mennyi a labda térfogata literben kifejezve (π ≈ 3,14)?',
    options: ['kb. 4,19 liter', 'kb. 8,38 liter', 'kb. 12,56 liter', 'kb. 1,25 liter'],
    correctIndex: 0,
    explanation: 'V = (4/3) · 3,14 · 10³ = (4/3) · 3140 ≈ 4187 cm³ = 4,187 dm³ ≈ 4,19 liter.'
  },
  {
    id: 'sph5',
    category: 'Félgömb teljes felszíne',
    question: 'Mekkora egy r sugarú tömör félgömb TELJES felszíne (a görbült gömbsüveg + a sík körlap)?',
    options: ['3π · r²', '2π · r²', '4π · r²', 'π · r²'],
    correctIndex: 0,
    explanation: 'A palást (félgömbfelület) területe 2πr², az alaplap (kör) területe πr², így a kettő összege: 2πr² + πr² = 3πr².'
  },
  {
    id: 'sph6',
    category: 'Sugár duplázódásának hatása',
    question: 'Hogyan változik egy gömb felszíne és térfogata, ha a sugarát a KÉTSZERESÉRE növeljük?',
    options: [
      'A felszíne 4-szeresére (2²), a térfogata 8-szorosára (2³) nő.',
      'A felszíne és térfogata is 2-szeresére nő.',
      'A felszíne 2-szeresére, térfogata 4-szeresére nő.',
      'A térfogata 6-szorosára nő.'
    ],
    correctIndex: 0,
    explanation: 'A felület a hasonlósági arány négyzetével (k² = 4), a térfogat pedig a köbével (k³ = 8) skálázódik.'
  }
];

export function SphereQuiz({ onComplete, onBack }: SphereQuizProps) {
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
            {percentage >= 80 ? 'Gömbgeometria Mester!' : percentage >= 60 ? 'Szép eredmény!' : 'Gyakorolj még!'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">4. A gömb kvíz befejezve</p>

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
          <span className="text-xs font-bold px-3 py-1 bg-blue-50 text-blue-800 rounded-full border border-blue-200">
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
            <Circle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">4. Fejezet • A Gömb Geometriája</span>
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

export default SphereQuiz;
