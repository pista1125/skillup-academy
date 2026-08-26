import React, { useState } from 'react';
import { QuizResult } from '@/types/education';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, ArrowLeft, Award, Sparkles, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Chapter2GeometrySummaryQuizProps {
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
    id: 'gsum1',
    category: '1. Egybevágóság',
    question: 'Melyik transzformáció fordítja meg egyedüliként a síkban a körüljárási irányt (orientációváltó)?',
    options: [
      'Tengelyes tükrözés',
      'Középpontos tükrözés',
      'Párhuzamos eltolás',
      'Elforgatás'
    ],
    correctIndex: 0,
    explanation: 'A tengelyes tükrözés az egyetlen alapvető egybevágósági transzformáció, amely megfordítja az orientációt.'
  },
  {
    id: 'gsum2',
    category: '1. Háromszögek egybevágósága',
    question: 'Két derékszögű háromszög átfogója és egyik befogója megegyezik. Egybevágóak-e?',
    options: [
      'Igen, a d-o-o (derékszög / nagyobbikkal szemközti szög) alapeset és Pitagorasz-tétel miatt.',
      'Nem, mert a szögek nem adottak.',
      'Csak ha egyenlő szárúak.',
      'Nem dönthető el.'
    ],
    correctIndex: 0,
    explanation: 'A Pitagorasz-tétel miatt a harmadik oldaluk is egyenlő, így az o-o-o (vagy d-o-o) alapján egybevágóak.'
  },
  {
    id: 'gsum3',
    category: '2. Transzformációk',
    question: 'Mi a tengelyes tükrözés fixegyenese?',
    options: [
      'Maga a tükörtengely (ennek minden pontja fixpont)',
      'A tengelyre merőleges egyenesek',
      'Nincs fixegyenese',
      'Bármely párhuzamos egyenes'
    ],
    correctIndex: 0,
    explanation: 'A tükörtengely minden egyes pontja helyben marad (fixpont), ezért a tükörtengely maga fixegyenes.'
  },
  {
    id: 'gsum4',
    category: '2. Invariáns egyenesek',
    question: 'Milyen egyenesek invariánsak (képeződnek le önmagukra ponthalmazként) a középpontos tükrözésnél?',
    options: [
      'A tükörközépponton átmenő összes egyenes',
      'Csak a vízszintes egyenesek',
      'A tükörközéppontra merőleges egyenesek',
      'Egyetlen egyenes sem'
    ],
    correctIndex: 0,
    explanation: 'A középponton átmenő egyenesek pontjai a középpontra szimmetrikusan helyet cserélnek, de az egyenes vonala önmagára képződik le.'
  },
  {
    id: 'gsum5',
    category: '3. Szoftveres szerkesztés',
    question: 'Mi történik dinamikus geometriai programban, ha egy szabályosan (matematikai relációkkal) szerkesztett háromszög egyik csúcsát elhúzzuk?',
    options: [
      'A szerkesztés követi a mozgást és megőrzi a matematikai összefüggéseket.',
      'Az alakzat azonnal szétesik.',
      'A program hibaüzenetet küld.',
      'Csak a vonalvastagság változik.'
    ],
    correctIndex: 0,
    explanation: 'A dinamikus geometria lényege a relációk (merőlegesség, szögfelező, stb.) folyamatos fenntartása mozgatás közben.'
  },
  {
    id: 'gsum6',
    category: '4. Hasonlósági arány',
    question: 'Egy háromszög oldalai 5 cm, 7 cm, 9 cm. Egy hasonló háromszög kerülete 42 cm. Mennyi a hasonlósági arány (k)?',
    options: [
      '2 (mert az eredeti kerület 21 cm, és 42 / 21 = 2)',
      '3',
      '4',
      '1,5'
    ],
    correctIndex: 0,
    explanation: 'Az eredeti háromszög kerülete K = 5 + 7 + 9 = 21 cm. A hasonlósági arány: k = K\' / K = 42 / 21 = 2.'
  },
  {
    id: 'gsum7',
    category: '4. Területek aránya',
    question: 'Ha egy alakzat területét 9-szeresére szeretnénk növelni, hányszorosára kell növelnünk az oldalait?',
    options: [
      '3-szorosára (k = √9 = 3)',
      '9-szeresére',
      '81-szeresére',
      '4,5-szeresére'
    ],
    correctIndex: 0,
    explanation: 'Mivel a területek aránya k² = 9, ezért a hasonlósági arány (az oldalak szorzója) k = √9 = 3.'
  },
  {
    id: 'gsum8',
    category: '4. Hasonlósági alapeset',
    question: 'Melyik NEM elegendő két háromszög hasonlóságának igazolásához?',
    options: [
      'Egy-egy oldaluk aránya és egy-egy tetszőleges szögük egyenlősége',
      'Két-két szögük megegyezése (sz-sz)',
      'Három-három oldaluk arányának megegyezése (o:o:o)',
      'Két-két oldal aránya és a közbezárt szögük megegyezése (o-sz-o)'
    ],
    correctIndex: 0,
    explanation: 'Egyetlen oldal aránya és egy nem rögzített helyzetű szög nem határozza meg a háromszög alakját.'
  },
  {
    id: 'gsum9',
    category: '5. Középpontos hasonlóság',
    question: 'Ha egy középpontos hasonlóságban λ = -3, mekkora és merre található a P pont képe (P\') az O centrumtól, ha OP = 4 cm?',
    options: [
      '12 cm távolságra az O ellentétes oldalán az OP egyenesen',
      '12 cm távolságra az O azonos oldalán',
      '-12 cm távolságra a síkból kilépve',
      '1,33 cm távolságra'
    ],
    correctIndex: 0,
    explanation: 'OP\' = |-3| · 4 = 12 cm. Mivel λ negatív, a P\' képpont az O ellentétes oldalára esik.'
  },
  {
    id: 'gsum10',
    category: '5. Párhuzamos szelők',
    question: 'Középpontos hasonlóságnál egy O-t elkerülő e egyenes képe (e\') milyen helyzetű e-hez képest?',
    options: [
      'Párhuzamos vele (e\' ∥ e)',
      'Merőleges rá',
      'Metszi 45°-ban',
      'Körré görbül'
    ],
    correctIndex: 0,
    explanation: 'Középpontos hasonlóságnál bármely, a centrumot elkerülő egyenes képe párhuzamos az eredeti egyenessel.'
  },
  {
    id: 'gsum11',
    category: '6. Szakasz felosztása',
    question: 'Egy 14 cm-es szakaszt 2 : 5 arányban osztunk fel. Mekkora a rövidebbik rész?',
    options: [
      '4 cm (14 / 7 = 2 cm egységenként, 2 · 2 = 4 cm)',
      '2 cm',
      '5 cm',
      '7 cm'
    ],
    correctIndex: 0,
    explanation: 'Összesen 2 + 5 = 7 rész. Egy rész: 14 cm / 7 = 2 cm. A rövidebbik rész: 2 · 2 cm = 4 cm, a hosszabbik: 5 · 2 cm = 10 cm.'
  },
  {
    id: 'gsum12',
    category: '6. Negyedik arányos',
    question: 'Ha a = 3, b = 6, c = 5, mekkora a negyedik arányos x szakasz (a : b = c : x)?',
    options: [
      '10 (mert x = (b · c) / a = 30 / 3 = 10)',
      '2,5',
      '15',
      '8'
    ],
    correctIndex: 0,
    explanation: '3 / 6 = 5 / x => 1/2 = 5/x => x = 10.'
  }
];

export function Chapter2GeometrySummaryQuiz({ onComplete, onBack }: Chapter2GeometrySummaryQuizProps) {
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
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
            <Award className="w-10 h-10" />
          </div>

          <h2 className="text-3xl font-black text-slate-800 mb-2">
            {percentage >= 85 ? 'Kiváló Geometria Eredmény! 🏆' : percentage >= 65 ? 'Szép munka! 👏' : 'Gyakorolj még a témazáróra! 📐'}
          </h2>
          <p className="text-sm text-slate-500 mb-6 font-medium">II. Geometria átfogó témazáró kvíz befejezve</p>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-6">
            <div className="text-5xl font-black text-emerald-600 mb-2">{percentage}%</div>
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
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-11 font-bold shadow-md shadow-emerald-200"
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
          <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
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
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">7. Fejezet • Geometria Összefoglalás</span>
            <h3 className="text-lg md:text-xl font-bold text-slate-800 mt-1 leading-snug">
              {currentQ.question}
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;
            let btnStyle = "border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 text-slate-700";

            if (showResult) {
              if (isCorrect) {
                btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
              } else if (isSelected && !isCorrect) {
                btnStyle = "border-rose-500 bg-rose-50 text-rose-900";
              } else {
                btnStyle = "border-slate-100 text-slate-400 opacity-60";
              }
            } else if (isSelected) {
              btnStyle = "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20";
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
              <HelpCircle className="w-4 h-4 text-emerald-600" /> Magyarázat:
            </div>
            <p>{currentQ.explanation}</p>
          </div>
        )}

        <div className="pt-2">
          {!showResult ? (
            <Button
              disabled={selectedOption === null}
              onClick={checkAnswer}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 rounded-xl font-bold shadow-md shadow-emerald-200"
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

export default Chapter2GeometrySummaryQuiz;
