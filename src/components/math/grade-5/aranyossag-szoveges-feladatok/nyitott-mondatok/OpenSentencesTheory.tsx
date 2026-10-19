import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  FormulaBox,
  ExampleBox,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  Variable,
  Scale,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Info,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Equal,
  Sliders,
  Calculator
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface OpenSentencesTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const OpenSentencesTheory: React.FC<OpenSentencesTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleQuiz = onStartQuiz || onSwitchToQuiz;

  // --- Interaktív Mérleg és Behelyettesítő Laboratórium ---
  // Példa nyitott mondat: 2 · x + 3 [reláció] 11
  const [testValue, setTestValue] = useState<number>(4);
  const [relation, setRelation] = useState<'=' | '<' | '>' | '<=' | '>='>('=');

  // Bal oldal kiszámítása: 2 · x + 3
  const leftSide = 2 * testValue + 3;
  const rightSide = 11;

  // Igazságtartalom vizsgálata
  const isTrue = (() => {
    switch (relation) {
      case '=':
        return leftSide === rightSide;
      case '<':
        return leftSide < rightSide;
      case '>':
        return leftSide > rightSide;
      case '<=':
        return leftSide <= rightSide;
      case '>=':
        return leftSide >= rightSide;
      default:
        return false;
    }
  })();

  // Mérleg dőlésszöge
  const balanceTilt = (() => {
    if (leftSide === rightSide) return 0;
    if (leftSide > rightSide) return 6; // bal oldal lejjebb
    return -6; // jobb oldal lejjebb
  })();

  // Interaktív gyakorló feladat
  const [practiceAnswer, setPracticeAnswer] = useState<string>('');
  const [practiceFeedback, setPracticeFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');

  const checkPractice = () => {
    // Feladat: x + 18 = 45. x = 27
    if (practiceAnswer.trim() === '27') {
      setPracticeFeedback('correct');
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
    } else {
      setPracticeFeedback('wrong');
    }
  };

  return (
    <TheoryTemplate
      title="Nyitott mondatok elmélete"
      subtitle="5. osztályos tananyag: egyenlőségek, egyenlőtlenségek, változók, alaphalmaz, igazsághalmaz és a mérlegelv"
      badge="VI. Mérés, arányosság, szöveges feladatok"
      quickRule={{
        label: 'A Mérlegelv Alapszabálya',
        formula: 'Mindkét oldalhoz ugyanazt adva vagy elvéve az egyensúly megmarad'
      }}
      onBack={onBack}
      onStartQuiz={handleQuiz}
    >
      {/* ========================================================
          1. SZEKCIÓ: MI A NYITOTT MONDAT?
      ======================================================== */}
      <TheorySection
        title="1. Mi a nyitott mondat?"
        subtitle="Olyan matematikai állítás, amely betűt vagy ismeretlen jelet tartalmaz"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TheoryCard
            title="A nyitott mondat fogalma"
            color="purple"
            badge="Alapfogalom"
          >
            <p className="text-sm text-slate-600 dark:text-slate-300">
              A <strong>nyitott mondat</strong> olyan matematikai állítás (egyenlőség vagy egyenlőtlenség), amelyben legalább egy <strong>ismeretlen (változó)</strong> szerepel betűvel vagy jellel jelölve:
            </p>
            <div className="flex items-center justify-center gap-3 my-3 font-mono text-base font-bold text-purple-700 dark:text-purple-300">
              <span className="p-2 bg-purple-100 dark:bg-purple-950/60 rounded-lg border border-purple-300">x</span>
              <span className="p-2 bg-purple-100 dark:bg-purple-950/60 rounded-lg border border-purple-300">y</span>
              <span className="p-2 bg-purple-100 dark:bg-purple-950/60 rounded-lg border border-purple-300">a</span>
              <span className="p-2 bg-purple-100 dark:bg-purple-950/60 rounded-lg border border-purple-300">□</span>
              <span className="p-2 bg-purple-100 dark:bg-purple-950/60 rounded-lg border border-purple-300">△</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Egy nyitott mondatról önmagában <strong>nem tudjuk eldönteni</strong>, hogy igaz vagy hamis! Csak akkor válik igazzá vagy hamissá, ha az ismeretlen helyébe konkrét számot helyettesítünk.
            </p>
          </TheoryCard>

          <TheoryCard
            title="Alaphalmaz és Igazsághalmaz"
            color="indigo"
            badge="Halmazok"
          >
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800">
                <strong className="text-indigo-900 dark:text-indigo-200 font-bold">1. Alaphalmaz (A):</strong>
                <p className="mt-1 text-xs">
                  Azon számok halmaza, amelyek közül az ismeretlen értékét választhatjuk (pl. természetes számok: 0, 1, 2, 3... vagy egyjegyű számok).
                </p>
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <strong className="text-emerald-900 dark:text-emerald-200 font-bold">2. Igazsághalmaz (I):</strong>
                <p className="mt-1 text-xs">
                  Az alaphalmaz azon számai (a feladat megoldásai), amelyeket behelyettesítve a nyitott mondat <strong>IGAZ állítássá válik</strong>.
                </p>
              </div>
            </div>
          </TheoryCard>
        </div>

        <TheoryCallout
          type="tip"
          title="Lehet-e az igazsághalmaz üres?"
        >
          Igen! Ha az alaphalmazból egyetlen szám sem teszi igazzá a nyitott mondatot, akkor a megoldáshalmaz az <strong>üres halmaz</strong> (jele: ∅).
          Például: x + 5 = 2 a természetes számok halmazán (mivel nincs olyan természetes szám, amihez 5-öt adva 2-t kapnánk).
        </TheoryCallout>
      </TheorySection>

      {/* ========================================================
          2. SZEKCIÓ: A KÉT FŐ TÍPUS: EGYENLŐSÉG ÉS EGYENLŐTLENSÉG
      ======================================================== */}
      <TheorySection
        title="2. A nyitott mondatok két nagy családja"
        subtitle="Egyenletek (=) és Egyenlőtlenségek (<, >, ≤, ≥)"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                <Equal className="w-5 h-5" />
              </span>
              <h4 className="font-bold text-slate-900 dark:text-white">1. Nyitott egyenlőség (Egyenlet)</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Olyan nyitott mondat, amelyben egyenlőségjel szerepel. A bal oldalnak és a jobb oldalnak hajszálpontosan egyenlőnek kell lennie.
            </p>
            <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl font-mono text-xs text-purple-900 dark:text-purple-200 space-y-1 border border-purple-200">
              <div>• <strong>x + 12 = 35</strong> → x = 35 − 12 = 23 (I = {'{23}'})</div>
              <div>• <strong>4 · y = 28</strong> → y = 28 : 4 = 7 (I = {'{7}'})</div>
              <div>• <strong>50 − a = 18</strong> → a = 50 − 18 = 32 (I = {'{32}'})</div>
            </div>
            <p className="text-[11px] text-slate-500">
              Az egyenleteknek az 5. osztályban általában <strong>egyetlen pontos megoldásuk</strong> van.
            </p>
          </div>

          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                <Scale className="w-5 h-5" />
              </span>
              <h4 className="font-bold text-slate-900 dark:text-white">2. Nyitott egyenlőtlenség</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Olyan nyitott mondat, amelyben relációs jel szerepel: &lt; (kisebb), &gt; (nagyobb), ≤ (kisebb vagy egyenlő), ≥ (nagyobb vagy egyenlő).
            </p>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl font-mono text-xs text-indigo-900 dark:text-indigo-200 space-y-1 border border-indigo-200">
              <div>• <strong>a + 3 &lt; 8</strong> (természetes számok halmazán)</div>
              <div>Megoldások: a lehet 0, 1, 2, 3, 4 (I = {'{0; 1; 2; 3; 4}'})</div>
              <div>• <strong>2 · b ≥ 6</strong> és b ≤ 5</div>
              <div>Megoldások: b lehet 3, 4, 5 (I = {'{3; 4; 5}'})</div>
            </div>
            <p className="text-[11px] text-slate-500">
              Az egyenlőtlenségeknek gyakran <strong>több megoldásuk</strong> van, egy egész számtartomány felel meg nekik.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* ========================================================
          3. SZEKCIÓ: INTERAKTÍV MÉRLEG ÉS BEHELYETTESÍTŐ LABORATÓRIUM
      ======================================================== */}
      <TheorySection
        title="3. Interaktív Mérleg és Behelyettesítő Laboratórium"
        subtitle="Vizsgáld meg a 2 · x + 3 nyitott mondat értékét a mérlegen különböző x értékek behelyettesítésével!"
      >
        <div className="bg-gradient-to-br from-purple-50/70 via-white to-indigo-50/70 dark:from-slate-900 dark:via-slate-900 dark:to-purple-950/40 p-6 rounded-2xl border border-purple-200 dark:border-purple-900 shadow-md space-y-6">
          {/* Beállító vezérlők */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
                Keresett x értéke (Csúsztasd a csúszkát):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={8}
                  step={1}
                  value={testValue}
                  onChange={(e) => setTestValue(parseInt(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
                <span className="font-mono font-bold text-purple-700 dark:text-purple-300 text-lg w-12 text-center bg-purple-50 dark:bg-purple-950/60 py-1 rounded-lg border border-purple-200">
                  x = {testValue}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
                Kapcsolat (Relációs jel):
              </label>
              <div className="flex flex-wrap gap-2">
                {(['=', '<', '>', '<=', '>='] as const).map((rel) => (
                  <button
                    key={rel}
                    onClick={() => setRelation(rel)}
                    className={`px-3 py-1.5 rounded-lg font-mono font-bold text-xs sm:text-sm transition-all ${
                      relation === rel
                        ? 'bg-purple-600 text-white shadow-md scale-105'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {rel === '<=' ? '≤' : rel === '>=' ? '≥' : rel}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Vizuális Mérleg Kétoldali Kijelzéssel */}
          <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="text-center mb-4 font-mono text-base sm:text-lg font-bold">
              <span className="text-purple-600 dark:text-purple-400">2 · {testValue} + 3</span>
              {' '}
              <span className="px-2 py-1 bg-white dark:bg-slate-800 rounded border border-slate-300 mx-2 text-indigo-600">
                {relation === '<=' ? '≤' : relation === '>=' ? '≥' : relation}
              </span>
              {' '}
              <span className="text-slate-700 dark:text-slate-300">{rightSide}</span>
            </div>

            {/* Mérleg SVG grafika */}
            <svg
              className="w-full max-w-[320px] h-36 transition-transform duration-300"
              viewBox="0 0 320 140"
              style={{ transform: `rotate(${balanceTilt}deg)` }}
            >
              {/* Állvány talpa és oszlopa */}
              <polygon points="160,50 145,130 175,130" fill="#64748b" />
              {/* Mérlegrúd */}
              <rect x="40" y="45" width="240" height="8" rx="4" fill="#475569" />

              {/* Bal oldali serpenyő */}
              <line x1="60" y1="50" x2="60" y2="90" stroke="#94a3b8" strokeWidth="2" />
              <rect x="25" y="90" width="70" height="30" rx="6" fill="#f3e8ff" stroke="#a855f7" strokeWidth="2" />
              <text x="60" y="110" fontSize="13" fontWeight="bold" fill="#7e22ce" textAnchor="middle">
                {leftSide}
              </text>

              {/* Jobb oldali serpenyő */}
              <line x1="260" y1="50" x2="260" y2="90" stroke="#94a3b8" strokeWidth="2" />
              <rect x="225" y="90" width="70" height="30" rx="6" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
              <text x="260" y="110" fontSize="13" fontWeight="bold" fill="#4338ca" textAnchor="middle">
                {rightSide}
              </text>
            </svg>

            {/* Igazság státusz doboz */}
            <div className="mt-4 flex items-center gap-2">
              {isTrue ? (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 text-emerald-800 dark:text-emerald-200 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  IGAZ állítás! (x = {testValue} eleme a megoldáshalmaznak)
                </div>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-100 dark:bg-rose-950/80 border border-rose-300 text-rose-800 dark:text-rose-200 font-bold text-sm">
                  <AlertCircle className="w-5 h-5 text-rose-600" />
                  HAMIS állítás! (x = {testValue} nem felel meg a relációnak)
                </div>
              )}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* ========================================================
          4. SZEKCIÓ: MEGOLDÁSI MÓDSZEREK (FORDÍTOTT MŰVELETEK)
      ======================================================== */}
      <TheorySection
        title="4. Hogyan oldjuk meg az egyenleteket? (Fordított műveletek)"
        subtitle="Lebontogatás: az ismeretlentől visszafelé lépkedünk az ellenkező művelettel"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ExampleBox
            title="1. Összeadás és Kivonás egymás ellentétei"
            problem="Oldjuk meg a nyitott mondatot: x + 17 = 42"
            solution="A bal oldalon az x-hez 17-et adtunk hozzá.
Hogy megkapjuk a tiszta x-et, el kell vennünk mindkét oldalból a 17-et (kivonunk):
x = 42 − 17
x = 25

Ellenőrzés behelyettesítéssel:
Bal oldal: 25 + 17 = 42
Jobb oldal: 42
Bal oldal = Jobb oldal, tehát a megoldás helyes: I = {25}."
          />

          <ExampleBox
            title="2. Szorzás és Osztás egymás ellentétei"
            problem="Oldjuk meg a nyitott mondatot: 5 · y = 65"
            solution="A bal oldalon az y-t megszoroztuk 5-tel.
Az ismeretlen kiszámításához el kell osztanunk a jobb oldalt 5-tel:
y = 65 : 5
y = 13

Ellenőrzés behelyettesítéssel:
Bal oldal: 5 · 13 = 65
Jobb oldal: 65
A megoldás helyes: I = {13}."
          />
        </div>

        <TheoryTrapBox
          title="Gyakori Csapda: A kivonás és osztás sorrendje!"
          trap="Ha 40 − x = 12, akkor x = 40 + 12 = 52? NEM!"
          explanation="A kivonásban a kivonandót (x-et) úgy kapjuk meg, hogy a kisebbítendőből (40-ből) kivonjuk a különbséget (12-t):
x = 40 − 12 = 28.
Ellenőrzés: 40 − 28 = 12, valóban igaz!
Ugyanez az osztásnál: 36 : x = 4 esetén x = 36 : 4 = 9 (és nem 36 · 4 = 144)!"
        />
      </TheorySection>

      {/* ========================================================
          5. SZEKCIÓ: GYAKORLÓ VILLÁMPRÓBA
      ======================================================== */}
      <TheorySection
        title="5. Gyakorló kihívás: Találd meg az ismeretlent!"
        subtitle="Oldd meg a nyitott mondatot fejben: x + 18 = 45"
      >
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
            Melyik az a szám, amelyhez 18-at adva 45-öt kapunk? (x = 45 − 18)
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              placeholder="x = ?"
              value={practiceAnswer}
              onChange={(e) => {
                setPracticeAnswer(e.target.value);
                setPracticeFeedback('idle');
              }}
              className="px-3 py-1.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-mono w-28 focus:outline-none focus:ring-2 focus:ring-purple-500 text-center font-bold"
            />
            <Button
              size="sm"
              onClick={checkPractice}
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs"
            >
              Ellenőrzés
            </Button>

            {practiceFeedback === 'correct' && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Pontos! x = 45 − 18 = 27. Ellenőrzés: 27 + 18 = 45!
              </span>
            )}
            {practiceFeedback === 'wrong' && (
              <span className="text-xs text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1">
                <AlertCircle className="w-4 h-4" /> Nem jó! Fordított művelet: vonj ki 18-at a 45-ből (45 − 18 = ?).
              </span>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
