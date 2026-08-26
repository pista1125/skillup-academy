import React, { useState } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, Award, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Chapter3EquationsSummaryQuizProps {
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
    id: 'esum1',
    category: '1. Zárójeles egyenlet',
    question: 'Oldd meg az egyenletet: 4(x - 2) + 3 = 2(x + 5) - 1',
    options: ['x = 7', 'x = 6', 'x = 8', 'x = 5'],
    correctIndex: 0,
    explanation: '4x - 8 + 3 = 2x + 10 - 1 => 4x - 5 = 2x + 9 => 2x = 14 => x = 7.'
  },
  {
    id: 'esum2',
    category: '1. Törtes egyenlet kikötéssel',
    question: 'Oldd meg az egyenletet a valós számok halmazán: 10 / (x - 3) = 2',
    options: ['x = 8 (Kikötés: x ≠ 3)', 'x = 5', 'x = 3', 'Nincs megoldás'],
    correctIndex: 0,
    explanation: 'Kikötés: x ≠ 3. 10 = 2(x - 3) => 10 = 2x - 6 => 2x = 16 => x = 8 (kikötésnek megfelel).'
  },
  {
    id: 'esum3',
    category: '2. Számokról',
    question: 'Egy kétjegyű szám számjegyeinek összege 11. Ha a számjegyeket felcseréljük, 45-tel nagyobb számot kapunk. Mi az eredeti szám?',
    options: ['38', '29', '47', '56'],
    correctIndex: 0,
    explanation: 'A szám 38 (3+8=11). Felcserélve 83. 83 - 38 = 45.'
  },
  {
    id: 'esum4',
    category: '2. Életkorok',
    question: 'Apa most 40 éves, lánya 12 éves. Hány év múlva lesz az apa pontosan kétszer annyi idős, mint a lánya?',
    options: ['16 év múlva', '14 év múlva', '18 év múlva', '12 év múlva'],
    correctIndex: 0,
    explanation: '40 + x = 2(12 + x) => 40 + x = 24 + 2x => x = 16. (16 év múlva: apa 56, lánya 28; 56 = 2 · 28).'
  },
  {
    id: 'esum5',
    category: '3. Keverés',
    question: 'Hány kg tiszta vizet kell adni 6 kg 30%-os sóoldathoz, hogy 18%-os oldatot kapjunk?',
    options: ['4 kg', '3 kg', '5 kg', '2 kg'],
    correctIndex: 0,
    explanation: 'Tiszta só: 6 · 30 = 180. Egyenlet: 180 / (6 + x) = 18 => 180 = 18(6 + x) => 10 = 6 + x => x = 4 kg víz.'
  },
  {
    id: 'esum6',
    category: '3. Ötvözetek',
    question: 'Összeolvasztunk 2 kg 60%-os és 3 kg 80%-os ezüstötvözetet. Hány százalék ezüstöt tartalmaz az új ötvözet?',
    options: ['72%', '70%', '75%', '74%'],
    correctIndex: 0,
    explanation: '(2 · 60 + 3 · 80) / 5 = (120 + 240) / 5 = 360 / 5 = 72%.'
  },
  {
    id: 'esum7',
    category: '4. Mozgás',
    question: 'Két kerékpáros egymással szembe halad 60 km távolságból. Sebességeik 18 km/h és 12 km/h. Hány óra múlva találkoznak?',
    options: ['2 óra múlva', '1,5 óra múlva', '2,5 óra múlva', '3 óra múlva'],
    correctIndex: 0,
    explanation: 't = s / (v1 + v2) = 60 / (18 + 12) = 60 / 30 = 2 óra.'
  },
  {
    id: 'esum8',
    category: '4. Munka',
    question: 'Egy gépsor 10 óra alatt, egy újabb gépsor 15 óra alatt gyárt le egy tételt. Hány óra alatt végzik el közösen?',
    options: ['6 óra alatt', '7,5 óra alatt', '5 óra alatt', '8 óra alatt'],
    correctIndex: 0,
    explanation: '1 óra alatt: 1/10 + 1/15 = 3/30 + 2/30 = 5/30 = 1/6 rész. Idő = 6 óra.'
  },
  {
    id: 'esum9',
    category: '5. Geometria',
    question: 'Egy téglalap kerülete 36 cm. Hosszabbik oldala kétszer akkora, mint a rövidebbik. Mekkora a téglalap területe?',
    options: ['72 cm²', '64 cm²', '81 cm²', '54 cm²'],
    correctIndex: 0,
    explanation: '2(x + 2x) = 36 => 6x = 36 => x = 6 cm. Oldalak: 6 cm és 12 cm. Terület: 6 · 12 = 72 cm².'
  },
  {
    id: 'esum10',
    category: '6. Vegyes / Jegyek',
    question: 'Egy koncertre összesen 200 jegyet adtak el 550 000 Ft értékben. A felnőttjegy 3000 Ft, a diákjegy 2000 Ft volt. Hány felnőttjegyet értékesítettek?',
    options: ['150 felnőttjegyet', '120 felnőttjegyet', '160 felnőttjegyet', '140 felnőttjegyet'],
    correctIndex: 0,
    explanation: '3000x + 2000(200 - x) = 550 000 => 1000x + 400 000 = 550 000 => 1000x = 150 000 => x = 150 felnőttjegy.'
  },
  {
    id: 'esum11',
    category: '7. Pénzügy / Árváltozás',
    question: 'Egy okosóra árát 10%-kal felemelték, majd az új árat 10%-kal leértékelték. Az új ár 49 500 Ft. Mennyi volt az eredeti ára?',
    options: ['50 000 Ft', '49 500 Ft', '52 000 Ft', '48 000 Ft'],
    correctIndex: 0,
    explanation: 'x · 1,1 · 0,9 = 0,99x. 0,99x = 49 500 => x = 49 500 / 0,99 = 50 000 Ft.'
  },
  {
    id: 'esum12',
    category: '7. Egyszerű kamat',
    question: 'Befektetünk 400 000 Ft-ot évi 5%-os kamatra 2 évre. Mennyi lesz az összegyűlt tőke a kamatokkal együtt?',
    options: ['440 000 Ft', '420 000 Ft', '40 000 Ft', '450 000 Ft'],
    correctIndex: 0,
    explanation: 'Kamat = 400 000 · 0,05 · 2 = 40 000 Ft. Összegyűlt tőke = 400 000 + 40 000 = 440 000 Ft.'
  }
];

export function Chapter3EquationsSummaryQuiz({ onComplete, onBack }: Chapter3EquationsSummaryQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);

  const TOTAL_QUESTIONS = QUESTIONS.length;
  const XP_PER_CORRECT = 20;
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-purple-200">
            <Award className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2">
            {percentage >= 85 ? 'Kiváló Egyenlet Eredmény! 🏆' : percentage >= 65 ? 'Szép munka! 👏' : 'Gyakorolj még a témazáróra! ⚖️'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">III. Egyenletek átfogó témazáró kvíz befejezve</p>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-6">
            <div className="text-5xl font-black text-purple-600 mb-2">{percentage}%</div>
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
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-xl h-11 font-bold shadow-md shadow-purple-200"
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
          <span className="text-xs font-bold px-3 py-1 bg-purple-50 text-purple-800 rounded-full border border-purple-200">
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
          <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">8. Fejezet • Egyenletek Összefoglalás</span>
            <h3 className="text-lg md:text-xl font-bold text-slate-800 mt-1 leading-snug">
              {currentQ.question}
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;
            let btnStyle = "border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 text-slate-700";

            if (showResult) {
              if (isCorrect) {
                btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
              } else if (isSelected && !isCorrect) {
                btnStyle = "border-rose-500 bg-rose-50 text-rose-900";
              } else {
                btnStyle = "border-slate-100 text-slate-400 opacity-60";
              }
            } else if (isSelected) {
              btnStyle = "border-purple-600 bg-purple-50 text-purple-900 font-bold ring-2 ring-purple-500/20";
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
              <HelpCircle className="w-4 h-4 text-purple-600" /> Magyarázat:
            </div>
            <p>{currentQ.explanation}</p>
          </div>
        )}

        <div className="pt-2">
          {!showResult ? (
            <Button
              disabled={selectedOption === null}
              onClick={checkAnswer}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white h-12 rounded-xl font-bold shadow-md shadow-purple-200"
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

export default Chapter3EquationsSummaryQuiz;
