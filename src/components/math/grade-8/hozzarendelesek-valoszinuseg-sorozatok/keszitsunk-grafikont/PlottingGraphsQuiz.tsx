import React, { useState } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, Pencil, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlottingGraphsQuizProps {
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
    id: 'pg1',
    category: 'Lineáris függvény ábrázolása',
    question: 'Hogyan ábrázoljuk a legegyszerűbben az f(x) = 2x - 3 lineáris függvényt?',
    options: [
      'Bejelöljük az y-tengelyen a (0; -3) pontot, onnan 1-et jobbra, 2-t fel lépve megkapjuk az (1; -1) pontot, majd összekötjük.',
      'Csak az origót (0; 0) kötjük össze az x = 2 ponttal.',
      'Kiszámolunk 100 pontot és körrel körberajzoljuk.',
      'Bejelöljük a (2; -3) pontot és vízszintes vonalat húzunk.'
    ],
    correctIndex: 0,
    explanation: 'A b = -3 miatt a (0; -3) az y-tengelymetszet. A meredekség a = 2 miatt 1-et jobbra, 2-t felfelé lépünk.'
  },
  {
    id: 'pg2',
    category: 'Folytonos vs. diszkrét grafikon',
    question: 'Egy mozielőadásra vásárolt jegyek számát (db) és a fizetendő összeget (Ft) ábrázoljuk. Szabad-e a kapott pontokat folytonos egyenessel összekötni?',
    options: [
      'Nem, mert fél vagy 2,7 darab jegyet nem lehet vásárolni; a grafikon diszkrét (különálló) pontokból áll.',
      'Igen, minden grafikont mindig össze kell kötni folytonos vonallal.',
      'Csak akkor, ha 10-nél több jegyet veszünk.',
      'Csak szaggatott vonallal köthetjük össze.'
    ],
    correctIndex: 0,
    explanation: 'Mivel a darabszám csak pozitív egész szám lehet (diszkrét értelmezési tartomány), a pontokat nem kötjük össze folyamatos vonallal.'
  },
  {
    id: 'pg3',
    category: 'Skálázás a koordinátatengelyeken',
    question: 'Szükséges-e, hogy az x és az y tengelyen pontosan ugyanaz legyen a beosztás (pl. 1 négyzetrács = 1 egység)?',
    options: [
      'Nem kötelező, a két tengely skálája eltérhet a feladat adatainak nagyságrendje szerint, de egy-egy tengelyen belül egyenletesnek kell lennie.',
      'Igen, szigorúan mindig ugyanannyi kell legyen.',
      'A tengelyeket nem kell skálázni.',
      'Csak az y-tengelyt kell beosztani.'
    ],
    correctIndex: 0,
    explanation: 'Ha például az idő órákban (0-5), a megtett út pedig kilométerekben (0-500) mérhető, az y-tengelyen célszerű pl. 1 rács = 50 km beosztást használni.'
  },
  {
    id: 'pg4',
    category: 'Tört meredekségű egyenes',
    question: 'Az f(x) = (3/4)x + 1 függvény grafikonjának megrajzolásához a (0; 1) pontból merre lépünk a következő rácspont eléréséhez?',
    options: [
      '4 egységet jobbra az x mentén, és 3 egységet fel az y mentén (a (4; 4) pontba).',
      '3 egységet jobbra és 4-et fel.',
      '1 egységet jobbra és 3/4-et le.',
      '4 egységet balra és 3-at fel.'
    ],
    correctIndex: 0,
    explanation: 'A meredekség a = Δy / Δx = 3 / 4, így a nevező (4) jelzi a vízszintes jobbra lépést, a számláló (3) pedig a függőleges felfelé lépést.'
  },
  {
    id: 'pg5',
    category: 'Másodfokú függvény pontjai',
    question: 'Melyik pont NEM illeszkedik az f(x) = x² - 1 függvény grafikonjára?',
    options: ['(2; 4)', '(0; -1)', '(1; 0)', '(-2; 3)'],
    correctIndex: 0,
    explanation: 'x = 2 esetén f(2) = 2² - 1 = 4 - 1 = 3, tehát a (2; 3) pont illeszkedne, a (2; 4) nem.'
  },
  {
    id: 'pg6',
    category: 'Grafikon és egyenletrendszer kapcsolata',
    question: 'Mit jelent geometriailag két elsőfokú függvény grafikonjának közös metszéspontja?',
    options: [
      'A két függvényből alkotott egyenletrendszer egyetlen közös megoldását (x; y).',
      'A függvények zérushelyének összegét.',
      'Azt, hogy a két függvény azonos.',
      'A meredekségek szorzatát.'
    ],
    correctIndex: 0,
    explanation: 'A metszéspont koordinátái (x; y) mindkét függvény egyenletét egyszerre kielégítik, tehát a két egyenletből álló rendszer megoldása.'
  }
];

export function PlottingGraphsQuiz({ onComplete, onBack }: PlottingGraphsQuizProps) {
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2">
            {percentage >= 80 ? 'Grafikonrajzoló Bajnok!' : percentage >= 60 ? 'Szép eredmény!' : 'Gyakorolj még!'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">5. Készítsünk grafikont! kvíz befejezve</p>

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
            <Pencil className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">5. Fejezet • Készítsünk Grafikont</span>
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

export default PlottingGraphsQuiz;
