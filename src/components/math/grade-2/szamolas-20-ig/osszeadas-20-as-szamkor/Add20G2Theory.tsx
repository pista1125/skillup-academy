import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  TenPlusOnesBeadsSvg,
  AnalogyNoCrossSvg,
  BridgingTwentyFrameSvg,
  TwoHopNumberLineSvg,
  AdditionPyramidSvg,
  MagicSquareSvg
} from './Add20G2Figures';
import { ADD20_FONT, TwentyFramePart } from './Add20G2Parts';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

interface BridgeTask {
  a: number;
  b: number;
}

const makeBridgeTask = (): BridgeTask => {
  for (;;) {
    const a = rnd(6, 9);
    const b = rnd(2, 9);
    if (a + b > 10 && a + b <= 18) return { a, b };
  }
};

interface BalanceTask {
  leftA: number;
  leftB: number;
  rightKnown: number;
}

const makeBalanceTask = (): BalanceTask => {
  for (;;) {
    const leftA = rnd(5, 13);
    const leftB = rnd(3, 9);
    const sum = leftA + leftB;
    if (sum >= 11 && sum <= 20) {
      const rightKnown = rnd(4, sum - 1);
      const ans = sum - rightKnown;
      if (ans >= 1 && ans <= 12 && rightKnown !== leftA && rightKnown !== leftB) {
        return { leftA, leftB, rightKnown };
      }
    }
  }
};

export const Add20G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: 20-as keret + tízesátlépés
  const [task1, setTask1] = useState<BridgeTask>(() => ({ a: 8, b: 5 }));
  const [placed, setPlaced] = useState<number>(0);
  const [chosenSum, setChosenSum] = useState<number | null>(null);
  const [msg1, setMsg1] = useState<{ ok: boolean; text: string } | null>(null);

  const newBridge = () => {
    setTask1(makeBridgeTask());
    setPlaced(0);
    setChosenSum(null);
    setMsg1(null);
  };

  const check1 = () => {
    const targetSum = task1.a + task1.b;
    const toTen = 10 - task1.a;
    const rest = task1.b - toTen;
    if (placed !== task1.b) {
      setMsg1({
        ok: false,
        text: `Még ${placed} kék korongot tettél le, pedig ${task1.b} kék korong kell! (${task1.a} piros már fent van.)`
      });
      return;
    }
    if (chosenSum === null) {
      setMsg1({
        ok: false,
        text: 'A korongok jók! Most válaszd ki lent, mennyi lett az összeg!'
      });
      return;
    }
    if (chosenSum !== targetSum) {
      setMsg1({
        ok: false,
        text: `A keretben ${task1.a} + ${toTen} = 10 az első sorban, és ${rest} a második sorban. Számold össze újra!`
      });
      return;
    }
    setMsg1({
      ok: true,
      text: `Remek! ${task1.a} + ${task1.b} = ${task1.a} + ${toTen} + ${rest} = 10 + ${rest} = ${targetSum}.`
    });
  };

  // Labor II: Egyensúly-mérleg
  const [task2, setTask2] = useState<BalanceTask>(() => ({ leftA: 11, leftB: 5, rightKnown: 12 }));
  const [guess, setGuess] = useState<number>(2);
  const [msg2, setMsg2] = useState<{ ok: boolean; text: string } | null>(null);

  const leftSum = task2.leftA + task2.leftB;
  const rightSum = task2.rightKnown + guess;
  const diff = rightSum - leftSum;
  const tilt = diff === 0 ? 0 : diff > 0 ? 8 : -8;

  const newBalance = () => {
    const next = makeBalanceTask();
    setTask2(next);
    setGuess(1);
    setMsg2(null);
  };

  const check2 = () => {
    const need = leftSum - task2.rightKnown;
    if (guess === need) {
      setMsg2({
        ok: true,
        text: `Egyensúlyban van! ${task2.leftA} + ${task2.leftB} = ${leftSum}, és ${task2.rightKnown} + ${need} = ${leftSum}.`
      });
    } else if (rightSum < leftSum) {
      setMsg2({
        ok: false,
        text: `A bal oldal ${leftSum}, a jobb oldal még csak ${task2.rightKnown} + ${guess} = ${rightSum}. Adj még hozzá!`
      });
    } else {
      setMsg2({
        ok: false,
        text: `A bal oldal ${leftSum}, a jobb oldal már ${task2.rightKnown} + ${guess} = ${rightSum}, túl nehéz! Vegyél el belőle!`
      });
    }
  };

  const firstRowBlue = Math.min(placed, 10 - task1.a);
  const secondRowBlue = Math.max(0, placed - firstRowBlue);

  return (
    <TheoryTemplate
      topicId="g2-numbers-to-20"
      subtopicId="osszeadas-20-as-szamkor"
      grade={2}
      chapterId="szamolas-20-ig"
      title="4. Összeadás 20-as számkör"
      subtitle="10 + egyesek, számolás tízesátlépés nélkül és tízesátlépéssel (10-re pótlással), három tag, számpiramis és bűvös négyzet."
      badge="2. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 20-IG • TANANYAG"
      themeColor="amber"
      pdfFilename="2_osztaly_osszeadas_20_as_szamkor_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — A 10-RE PÓTLÁS TRÜKKJE',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center font-mono text-sm sm:text-base font-black text-amber-900 dark:text-amber-200">
              8 + 5 = 8 + 2 + 3 = 10 + 3 = 13
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>10 + egyes:</strong> 10 + 6 = 16.</li>
              <li><strong>Tízesátlépés nélkül:</strong> 4 + 3 = 7 → 14 + 3 = 17.</li>
              <li><strong>Tízesátlépéssel:</strong> előbb töltsd fel a 10-et, aztán add hozzá a maradékot!</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="0–20 számkör" badgeColor="amber">
        <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>Már biztosan összeadsz 10-ig. Most megnyitjuk a <strong>20-as számkört</strong>!</p>
          <p>Először a 10-hez adunk egyjegyű számokat, aztán a „kistesó” segítségével számolunk tovább, végül megtanuljuk a <strong>tízesátlépést</strong>.</p>
          <p>A végén három tagot is összeadunk, számpiramist építünk és kétoldalú egyenleteket oldunk meg.</p>
        </div>
      </TheorySection>

      {/* 2. 10 + egyesek */}
      <TheorySection title="2. Tíz meg az egyesek (10 + egyes)" badge="Alapozás" badgeColor="blue">
        <TenPlusOnesBeadsSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Egy teljes sor = 10" badge="10 + 6 = 16" badgeColor="blue">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Ha a 10-hez adsz egy egyjegyű számot, az egyesek a 0 helyére ugranak: <strong>10 + 6 = 16</strong>, <strong>10 + 9 = 19</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="A tagok felcserélhetők" badge="6 + 10 = 16" badgeColor="sky">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Mindegy, melyik tag áll elöl! <strong>10 + 6 = 16</strong> és <strong>6 + 10 = 16</strong> is ugyanannyi.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Összeadás tízesátlépés nélkül */}
      <TheorySection title="3. Tízesátlépés nélkül — a kistesó segít!" badge="Analógia" badgeColor="emerald">
        <AnalogyNoCrossSvg />
        <TheoryTable
          headers={['Kicsi (0–10)', 'Nagy (10–20)', 'Fordított sorrend', 'Eredmény elöl']}
          rows={[
            ['3 + 2 = 5', '13 + 2 = 15', '2 + 13 = 15', '15 = 13 + 2'],
            ['4 + 3 = 7', '14 + 3 = 17', '3 + 14 = 17', '17 = 14 + 3'],
            ['5 + 4 = 9', '15 + 4 = 19', '4 + 15 = 19', '19 = 15 + 4']
          ]}
        />
        <TheoryCallout type="info" title="Ugyanaz a vége!">
          Ha 14-hez adsz 3-at, a 10-es marad, csak az egyeseket adod össze: <strong>4 + 3 = 7</strong>, tehát <strong>14 + 3 = 17</strong>.
        </TheoryCallout>
      </TheorySection>

      {/* 4. Összeadás tízesátlépéssel */}
      <TheorySection title="4. Összeadás tízesátlépéssel (10-re pótlás)" badge="Fő stratégia" badgeColor="orange">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          <BridgingTwentyFrameSvg />
          <TwoHopNumberLineSvg />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="1. lépés: Pótold 10-re!" badge="7 + 3 = 10" badgeColor="emerald">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Nézd meg, mennyi kell az első számhoz, hogy teli legyen a 10-es sor! A 7-hez <strong>3</strong> kell.
            </p>
          </TheoryCard>
          <TheoryCard title="2. lépés: Bontsd fel!" badge="5 = 3 + 2" badgeColor="blue">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Vedd el a 3-at az 5-ből! Az 5-ből még <strong>2</strong> marad a második sorba.
            </p>
          </TheoryCard>
          <TheoryCard title="3. lépés: Add a 10-hez!" badge="10 + 2 = 12" badgeColor="amber">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Most már könnyű: <strong>10 + 2 = 12</strong>. Tehát <strong>7 + 5 = 12</strong>.
            </p>
          </TheoryCard>
        </div>
        <TheoryTable
          headers={['Példa', 'Pótlás 10-re', 'Így számolunk', 'Összeg']}
          rows={[
            ['9 + 4', '9 + 1 = 10', '9 + 1 + 3', '13'],
            ['8 + 5', '8 + 2 = 10', '8 + 2 + 3', '13'],
            ['7 + 6', '7 + 3 = 10', '7 + 3 + 3', '13'],
            ['6 + 9', '6 + 4 = 10', '6 + 4 + 5', '15']
          ]}
        />
      </TheorySection>

      {/* 5. Három tag, számpiramis, bűvös négyzet */}
      <TheorySection title="5. Három tag, számpiramis és bűvös négyzet" badge="Kapcsolatok" badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          <AdditionPyramidSvg />
          <MagicSquareSvg />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Keress 10-es párokat!" badge="3 + 8 + 7" badgeColor="teal">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Három számnál párosítsd össze a 10-et adókat! <strong>3 + 7 = 10</strong>, és <strong>10 + 8 = 18</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="Műveletcsaládok 20-ig" badge="4 művelet" badgeColor="purple">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              A 6, a 8 és a 14 összetartozik: <strong>6 + 8 = 14</strong>, <strong>8 + 6 = 14</strong>, <strong>14 − 6 = 8</strong>, <strong>14 − 8 = 6</strong>.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Nézzük meg együtt */}
      <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Tízesátlépés" badge="6 + 7" badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>Mennyi kell a 6-hoz 10-re? <strong>4</strong>.</li>
              <li>A 7-et bontjuk: 4 + <strong>3</strong>.</li>
              <li>6 + 4 = 10, és 10 + 3 = <strong>13</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Kétoldalú egyenlet" badge="11 + 5 = 12 + □" badgeColor="blue">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>Számold ki a bal oldalt: 11 + 5 = <strong>16</strong>.</li>
              <li>A jobb oldal is 16 legyen: 12 + □ = 16.</li>
              <li>12-höz <strong>4</strong> kell, így □ = <strong>4</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Szabály és sorozat" badge="+ 3" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>Sorozat: 5, 8, 11, 14, □.</li>
              <li>Mindig <strong>3-mal nő</strong>: 5 + 3 = 8, 8 + 3 = 11.</li>
              <li>A 14 után: 14 + 3 = <strong>17</strong> (20 alatt maradunk!).</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 7. Vigyázz! */}
      <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="8 + 5 — vigyázz a bontásra!"
          wrong="8 + 5 = 8 + 2 + 2 = 12"
          wrongExplanation="Ha 2-t már elvettél az 5-ből, nem 2 marad belőle! Ellenőrizd: 2 + 2 = 4, nem 5."
          correct="8 + 5 = 8 + 2 + 3 = 10 + 3 = 13"
          correctExplanation="Az 5 = 2 + 3. Így 8 + 2 = 10, és 10 + 3 = 13."
          tip="Mindig ellenőrizd fejben, hogy a két kisebb rész összege tényleg a második szám-e!"
        />
        <TheoryCallout type="warning" title="A □ bárhol állhat!">
          A <strong>□ = 14 + 3</strong> ugyanazt jelenti, mint a <strong>14 + 3 = □</strong>. Az egyenlőségjel két oldala mindig ugyanannyit ér!
        </TheoryCallout>
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Labor I: Tízesátlépés a 20-as keretben" badge="Interaktív labor" badgeColor="orange">
        <div className="bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-amber-50 dark:bg-amber-950/50 rounded-xl p-3 text-center text-amber-950 dark:text-amber-100">
            Számold ki a 20-as keretben:{' '}
            <span className="text-2xl sm:text-3xl font-black align-middle ml-2">
              {task1.a} + {task1.b} = ?
            </span>
          </div>

          <svg viewBox="0 0 330 92" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={ADD20_FONT}>
            <rect x="1" y="1" width="328" height="90" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
            <TwentyFramePart
              x={32}
              y={18}
              cell={26}
              firstCount={task1.a}
              secondCount={placed}
              highlightTenRow={task1.a + placed >= 10}
            />
          </svg>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                setPlaced((p) => Math.max(0, p - 1));
                setMsg1(null);
              }}
              className="px-4 py-2 rounded-xl bg-blue-100 text-blue-900 font-bold text-sm min-h-[48px]"
            >
              − 1 kék korong
            </button>
            <span className="px-3 py-2 font-bold text-sm text-slate-700 dark:text-slate-200">
              {task1.a} piros + {placed} kék
              {placed > 0 && task1.a + placed > 10
                ? ` (10 + ${secondRowBlue})`
                : ''}
            </span>
            <button
              type="button"
              onClick={() => {
                setPlaced((p) => Math.min(20 - task1.a, p + 1));
                setMsg1(null);
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-sm min-h-[48px]"
            >
              + 1 kék korong
            </button>
          </div>

          <div className="space-y-2">
            <p className="text-center text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300">
              Válaszd ki az összeget:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[11, 12, 13, 14, 15, 16, 17, 18].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    setChosenSum(n);
                    setMsg1(null);
                  }}
                  className={`w-12 h-12 rounded-xl font-black text-base border-2 transition-all ${
                    chosenSum === n
                      ? 'bg-amber-500 text-white border-amber-700 scale-105'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 pt-1">
            <button
              type="button"
              onClick={check1}
              className="px-5 py-2.5 rounded-xl bg-amber-600 text-white text-sm font-bold min-h-[48px]"
            >
              Ellenőrzés
            </button>
            <button
              type="button"
              onClick={newBridge}
              className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-sm font-bold min-h-[48px]"
            >
              Új feladat
            </button>
          </div>

          {msg1 && (
            <div
              className={`rounded-xl p-3 text-center text-sm font-bold ${
                msg1.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}
            >
              {msg1.text}
            </div>
          )}
        </div>
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Labor II: Egyensúly-mérleg és hiányzó szám" badge="Interaktív labor" badgeColor="blue">
        <div className="bg-white dark:bg-slate-900 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/50 rounded-xl p-3 text-center text-blue-950 dark:text-blue-100">
            Hozd egyensúlyba a mérleget:{' '}
            <span className="text-xl sm:text-2xl font-black align-middle ml-2">
              {task2.leftA} + {task2.leftB} = {task2.rightKnown} + □
            </span>
          </div>

          <svg viewBox="0 0 340 135" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={ADD20_FONT}>
            <rect x="1" y="1" width="338" height="133" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
            <polygon points="170,74 148,118 192,118" fill="#475569" />
            <g transform={`rotate(${tilt} 170 72)`}>
              <line x1="48" y1="72" x2="292" y2="72" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
              <rect x="26" y="24" width="108" height="42" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
              <text x="80" y="51" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e3a8a">
                {task2.leftA} + {task2.leftB}
              </text>
              <rect x="206" y="24" width="108" height="42" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
              <text x="260" y="51" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#92400e">
                {task2.rightKnown} + {guess}
              </text>
            </g>
            <text x="170" y="128" textAnchor="middle" fontSize="12" fontWeight="bold" fill={diff === 0 ? '#15803d' : '#b91c1c'}>
              {diff === 0 ? 'Egyensúlyban van!' : diff < 0 ? 'A bal oldal nehezebb!' : 'A jobb oldal nehezebb!'}
            </text>
          </svg>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setGuess((g) => Math.max(0, g - 1));
                setMsg2(null);
              }}
              className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 font-black text-lg min-h-[48px] min-w-[56px]"
            >
              − 1
            </button>
            <div className="px-5 py-2 rounded-xl bg-amber-100 border-2 border-amber-400 text-amber-950 font-black text-xl min-h-[48px] flex items-center">
              □ = {guess}
            </div>
            <button
              type="button"
              onClick={() => {
                setGuess((g) => Math.min(20, g + 1));
                setMsg2(null);
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white font-black text-lg min-h-[48px] min-w-[56px]"
            >
              + 1
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={check2}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold min-h-[48px]"
            >
              Ellenőrzés
            </button>
            <button
              type="button"
              onClick={newBalance}
              className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-sm font-bold min-h-[48px]"
            >
              Új feladat
            </button>
          </div>

          {msg2 && (
            <div
              className={`rounded-xl p-3 text-center text-sm font-bold ${
                msg2.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}
            >
              {msg2.text}
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Add20G2Theory;
