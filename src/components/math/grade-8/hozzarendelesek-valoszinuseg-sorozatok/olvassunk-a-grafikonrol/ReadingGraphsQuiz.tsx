import React, { useState } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, Eye, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReadingGraphsQuizProps {
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
    id: 'rg1',
    category: 'Menetdiagram leolvasása',
    question: 'Egy menetdiagramon (út-idő grafikon) egy 2 órás vízszintes szakasz látható. Mit jelent ez a fizikai mozgás szempontjából?',
    options: [
      'A jármű állt (pihenő, sebessége 0 km/h).',
      'A jármű egyenletes sebességgel haladt.',
      'A jármű hegyre ment fel.',
      'A jármű tolatott.'
    ],
    correctIndex: 0,
    explanation: 'Ha az út nem változik az idő múlásával (vízszintes vonal), akkor a sebesség v = 0, a test nyugalomban van.'
  },
  {
    id: 'rg2',
    category: 'Sebesség összehasonlítása meredekséggel',
    question: 'Két kerékpáros menetdiagramján az I. szakasz meredekebb, mint a II. szakasz. Melyik szakaszon volt nagyobb a sebesség?',
    options: [
      'Az I. szakaszon, mert a nagyobb meredekség nagyobb sebességet (több utat egységnyi idő alatt) jelent.',
      'A II. szakaszon.',
      'Egyenlő volt a sebesség.',
      'A grafikon meredeksége nem függ a sebességtől.'
    ],
    correctIndex: 0,
    explanation: 'Az út-idő grafikon meredeksége pontosan a sebesség (v = Δs / Δt). A meredekebb egyenes gyorsabb haladást jelent.'
  },
  {
    id: 'rg3',
    category: 'Metszéspont jelentése',
    question: 'Két gyalogos menetdiagramja a t = 3 óra időpontban és az s = 12 km távolságnál metszi egymást. Mit jelent ez?',
    options: [
      'A két gyalogos 3 óra elteltével, a starttól 12 km-re találkozott.',
      'Az egyik gyalogos megállt 12 órára.',
      'Egyikük elfáradt.',
      'Mindketten visszafordultak.'
    ],
    correctIndex: 0,
    explanation: 'A két grafikon metszéspontja az a hely és időpont, ahol a két mozgó test koordinátái megegyeznek, tehát találkoznak.'
  },
  {
    id: 'rg4',
    category: 'Hőmérséklet grafikon szélsőértéke',
    question: 'Egy napi hőmérséklet-grafikonon a görbe legmagasabb pontja (14:00-kor) a 28 °C-os vonalon van. Mi a folyamat maximuma és maximumhelye?',
    options: [
      'Maximum: 28 °C, maximumhely: 14:00 óra',
      'Maximum: 14:00 óra, maximumhely: 28 °C',
      'Maximum: 0 °C',
      'Nem létezik maximum'
    ],
    correctIndex: 0,
    explanation: 'A maximum a felvett legnagyobb függvényérték (28 °C), a maximumhely pedig az ehhez tartozó független változó (14:00).'
  },
  {
    id: 'rg5',
    category: 'Zérushely leolvasása',
    question: 'Mit mutat meg a grafikonon az a pont, ahol a görbe metszi a vízszintes (x) tengelyt?',
    options: [
      'A függvény zérushelyét (ahol a függvényérték y = 0)',
      'A függvény legnagyobb értékét',
      'A grafikon meredekségét',
      'A kezdőértéket x = 0-nál'
    ],
    correctIndex: 0,
    explanation: 'Az x-tengelyen fekvő pontok y-koordinátája mindig 0, ezért az x-tengely metszéspontjai a függvény zérushelyei.'
  },
  {
    id: 'rg6',
    category: 'Csökkenő szakasz értelmezése',
    question: 'Egy víztározó vízmennyiségének grafikonja a 4. és 8. óra között egyenesen lefelé lejt. Mi történt ebben az időszakban?',
    options: [
      'A víztározóból folyamatosan egyenletes ütemben vizet engedtek le.',
      'A víztározóba több víz folyt be.',
      'A vízszint nem változott.',
      'Megfagyott a víz.'
    ],
    correctIndex: 0,
    explanation: 'A lefelé lejtő szakasz az y-érték (vízmennyiség) csökkenését jelenti, azaz vízleeresztést.'
  }
];

export function ReadingGraphsQuiz({ onComplete, onBack }: ReadingGraphsQuizProps) {
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
            {percentage >= 80 ? 'Grafikonelemző Zseni!' : percentage >= 60 ? 'Szép eredmény!' : 'Gyakorolj még!'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">4. Olvassunk a grafikonról! kvíz befejezve</p>

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
          <span className="text-xs font-bold px-3 py-1 bg-teal-50 text-teal-800 rounded-full border border-teal-200">
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
            <Eye className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">4. Fejezet • Olvassunk a Grafikonról</span>
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

export default ReadingGraphsQuiz;
