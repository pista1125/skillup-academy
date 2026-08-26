import React, { useState } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, Globe, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EarthGeometryQuizProps {
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
    id: 'eg1',
    category: 'Egyenlítő hossza',
    question: 'A Föld átlagos sugara R ≈ 6370 km. Hozzávetőlegesen mekkora az Egyenlítő kerülete?',
    options: ['kb. 40 000 km', 'kb. 20 000 km', 'kb. 12 740 km', 'kb. 80 000 km'],
    correctIndex: 0,
    explanation: 'K = 2 · R · π = 2 · 6370 · 3,1416 ≈ 40 024 km ≈ 40 000 km.'
  },
  {
    id: 'eg2',
    category: 'Föld felszínének becslése',
    question: 'Körülbelül mekkora a Föld teljes felszíne négyzetkilométerben?',
    options: [
      'kb. 510 millió km²',
      'kb. 100 millió km²',
      'kb. 1 milliárd km²',
      'kb. 40 millió km²'
    ],
    correctIndex: 0,
    explanation: 'A = 4 · π · R² = 4 · 3,1416 · 6370² ≈ 510 000 000 km² (510 millió km²).'
  },
  {
    id: 'eg3',
    category: '1 fok szélességkülönbség távolsága',
    question: 'Hozzávetőlegesen hány kilométer távolságot jelent az északi vagy déli irányú elmozdulás 1° szélesség mentén a Föld felszínén?',
    options: ['kb. 111 km (40 000 km / 360°)', 'kb. 40 km', 'kb. 10 km', 'kb. 1000 km'],
    correctIndex: 0,
    explanation: 'A teljes délkör 40 000 km, ennek 1/360-ad része: 40 000 / 360 ≈ 111,1 km/fok.'
  },
  {
    id: 'eg4',
    category: 'Főköri távolság és repülési útvonalak',
    question: 'Miért repülnek a repülőgépek gyakran az északi sarkvidék felé (pl. London – Tokió útvonalon)?',
    options: [
      'Mert gömbi felületen a legrövidebb út a két pontot összekötő főkör íve (ortodróma).',
      'Mert ott hidegebb van és nem melegszik a hajtómű.',
      'Mert a Föld lapos.',
      'Hogy elkerüljék a hegyeket.'
    ],
    correctIndex: 0,
    explanation: 'Gömbön a legrövidebb távolság nem a térképi egyenes (szélességi kör), hanem a gömbi főkör íve (geodetikus vonal).'
  },
  {
    id: 'eg5',
    category: 'Szárazföld és óceán aránya',
    question: 'A Föld 510 millió km² felszínének mekkora részét borítják óceánok és tengerek?',
    options: ['kb. 71% (kb. 361 millió km²)', 'kb. 50%', 'kb. 29%', 'kb. 90%'],
    correctIndex: 0,
    explanation: 'A Föld felszínének kb. 71%-a víz (világtenger) és csupán kb. 29%-a szárazföld.'
  },
  {
    id: 'eg6',
    category: 'Eratoszthenész kísérlete',
    question: 'Hogyan számította ki Eratoszthenész az ókorban a Föld kerületét?',
    options: [
      'A déli napsugarak beesési szögét mérte egyidőben Alexandriában és Szüénében, és a távolságból aránypárral számolt.',
      'Körbehajózta a Földet.',
      'Holdfogyatkozáskor mérte a Föld árnyékát.',
      'Kiszámolta a tenger mélységét.'
    ],
    correctIndex: 0,
    explanation: 'Szüénében a Nap délben a kút mélyére sütött (90°), Alexandriában árnyékot vetett az oszlop (kb. 7,2° eltérés, ami a 360° 1/50-ed része). Az 5000 stádium távolság 50-szerese adta meg a Föld kerületét.'
  }
];

export function EarthGeometryQuiz({ onComplete, onBack }: EarthGeometryQuizProps) {
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
            {percentage >= 80 ? 'Földrajzi Geometria Bajnok!' : percentage >= 60 ? 'Szép eredmény!' : 'Gyakorolj még!'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">5. A Föld kvíz befejezve</p>

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
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">5. Fejezet • A Föld Mint Gömb</span>
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

export default EarthGeometryQuiz;
