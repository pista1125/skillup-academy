import React, { useState } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, GitCompare, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TransformationsQuizProps {
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
    id: 'tr1',
    category: 'Fixpont és Fixegyenes',
    question: 'Mi a lényeges különbség a fixegyenes és az invariáns egyenes között?',
    options: [
      'A fixegyenes minden egyes pontja fixpont (helyben marad), míg az invariáns egyenes ponthalmazként önmagába képeződik, de a pontjai elmozdulhatnak rajta.',
      'A fixegyenes csak kör alakú lehet.',
      'Nincs különbség, a két fogalom szinonima.',
      'Az invariáns egyenes mindig merőleges a fixegyenesre.'
    ],
    correctIndex: 0,
    explanation: 'Fixegyenesnél pontonkénti helyben maradás van (minden P ∈ e esetén P\' = P, pl. tükörtengely). Invariáns egyenesnél e\' = e ponthalmazként, de a pontok csúszhatnak/tükröződhetnek az egyenesen belül.'
  },
  {
    id: 'tr2',
    category: 'Tengelyes tükrözés invariánsai',
    question: 'Milyen egyenesek invariánsak a tengelyes tükrözés során a tengelyen kívül?',
    options: [
      'A tengelyre merőleges egyenesek',
      'A tengellyel párhuzamos egyenesek',
      'A tengellyel 45°-os szöget bezáró egyenesek',
      'Egyetlen más egyenes sem invariáns'
    ],
    correctIndex: 0,
    explanation: 'A tükörtengelyre merőleges bármely egyenes pontjai átkerülnek a túloldalra, de az egyenes vonala változatlanul önmagára képeződik le.'
  },
  {
    id: 'tr3',
    category: 'Középpontos tükrözés invariánsai',
    question: 'Középpontos tükrözésnél mely egyenesek képe önmaga (invariáns egyenes)?',
    options: [
      'A tükörközépponton átmenő összes egyenes',
      'Minden vízszintes egyenes',
      'Csak az origó',
      'Nincsenek ilyen egyenesek'
    ],
    correctIndex: 0,
    explanation: 'Minden olyan egyenes, amely áthalad az O tükörközépponton, önmagára képeződik le (a pontok az O-ra nézve szimmetrikusan átfordulnak).'
  },
  {
    id: 'tr4',
    category: 'Párhuzamos eltolás invariánsai',
    question: 'Párhuzamos eltolásnál mely egyenesek invariánsak?',
    options: [
      'Az eltolásvektorral párhuzamos egyenesek',
      'Az eltolásvektorra merőleges egyenesek',
      'Minden egyenes',
      'Egyetlen egyenes sem'
    ],
    correctIndex: 0,
    explanation: 'Az eltolás vektorának irányába eső egyenesek mentén a pontok az egyenesen belül tolódnak el, így az egyenes egésze önmagára képződik.'
  },
  {
    id: 'tr5',
    category: 'Invariáns tulajdonság',
    question: 'Melyik tulajdonság NEM invariáns általános hasonlósági transzformáció esetén?',
    options: [
      'Szakaszok abszolút hossza (távolság)',
      'Szögek nagysága',
      'Párhuzamosság',
      'Egyenesség'
    ],
    correctIndex: 0,
    explanation: 'Hasonlóságnál a szakaszok hossza arányosan változik (k-szorosára nő vagy csökken), tehát a távolság nem invariáns. A szögek, párhuzamosság és egyenesség viszont invariánsak.'
  },
  {
    id: 'tr6',
    category: 'Identikus transzformáció',
    question: 'Mi az identitás (helybenhagyás) a geometriai transzformációk között?',
    options: [
      'Az a transzformáció, amely a sík minden pontját önmagához rendeli (minden pont fixpont).',
      'A 90°-os elforgatás.',
      'A tengelyre való tükrözés.',
      'Egy tetszőleges kicsinyítés.'
    ],
    correctIndex: 0,
    explanation: 'Az identikus transzformáció (identitás) minden pontot helyben hagy: P\' = P minden síkbeli pontra.'
  }
];

export function TransformationsQuiz({ onComplete, onBack }: TransformationsQuizProps) {
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white shadow-lg shadow-teal-200">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2">
            {percentage >= 80 ? 'Transzformáció-Mester!' : percentage >= 60 ? 'Szép eredmény!' : 'Gyakorolj még!'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">2. Transzformációk kvíz befejezve</p>

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
            <GitCompare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">2. Fejezet • Transzformációk</span>
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

export default TransformationsQuiz;
