import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
} from '../TheoryTemplate';
import {
  DiscsPlaceValueSvg,
  NumberLine20Svg,
  EvenOddStreetSvg,
  Grid1To20Svg,
  BarCountChartSvg,
  OrdinalRowSvg,
} from './Numbers20G2Figures';
import { OneDisc, TenDisc } from './Numbers20G2Parts';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

interface LineTask {
  prompt: string;
  answer: number;
  hint: string;
}

const makeLineTask = (prevAnswer?: number): LineTask => {
  const pool: (() => LineTask)[] = [
    () => {
      const n = rnd(1, 19);
      return {
        prompt: `Keresd meg a ${n} nagyobb egyes számszomszédját!`,
        answer: n + 1,
        hint: `A nagyobb egyes szomszéd 1-gyel több: ${n} + 1 = ${n + 1}.`,
      };
    },
    () => {
      const n = rnd(1, 19);
      return {
        prompt: `Keresd meg a ${n} kisebb egyes számszomszédját!`,
        answer: n - 1,
        hint: `A kisebb egyes szomszéd 1-gyel kevesebb: ${n} − 1 = ${n - 1}.`,
      };
    },
    () => {
      const mid = rnd(2, 19);
      return {
        prompt: `Melyik számra igaz: ${mid - 1} < □ < ${mid + 1}?`,
        answer: mid,
        hint: `A ${mid - 1} és a ${mid + 1} között pontosan a ${mid} áll.`,
      };
    },
    () => {
      const ones = rnd(1, 9);
      return {
        prompt: `Kattints arra a számra, amelyikben 1 tízes és ${ones} egyes van!`,
        answer: 10 + ones,
        hint: `1 tízes = 10, és még ${ones} egyes: 10 + ${ones} = ${10 + ones}.`,
      };
    },
    () => ({
      prompt: 'Kattints a legnagyobb egyjegyű páros számra!',
      answer: 8,
      hint: 'Az egyjegyű számok 0-tól 9-ig tartanak. A legnagyobb páros köztük a 8.',
    }),
    () => ({
      prompt: 'Kattints a legkisebb kétjegyű páratlan számra!',
      answer: 11,
      hint: 'A legkisebb kétjegyű szám a 10 (páros), a következő a 11 (páratlan).',
    }),
    () => ({
      prompt: 'Kattints arra a számra, amelyik pontosan 2 tízesből áll!',
      answer: 20,
      hint: '2 tízes = 20 egyes = 20.',
    }),
  ];
  for (let i = 0; i < 10; i++) {
    const pick = pool[rnd(0, pool.length - 1)]();
    if (pick.answer !== prevAnswer) return pick;
  }
  return pool[0]();
};

export const Numbers20G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: Korongos számépítő (0–20)
  const [target, setTarget] = useState<number>(14);
  const [tens, setTens] = useState<number>(0);
  const [ones, setOnes] = useState<number>(0);
  const [msg1, setMsg1] = useState<{ ok: boolean; text: string } | null>(null);
  const built = tens * 10 + ones;

  const newBuild = () => {
    let next = rnd(1, 20);
    if (next === target) next = target === 20 ? 11 : target + 1;
    setTarget(next);
    setTens(0);
    setOnes(0);
    setMsg1(null);
  };

  const check1 = () => {
    const T = Math.floor(target / 10);
    const E = target % 10;
    if (built === target && ones < 10) {
      setMsg1({
        ok: true,
        text: `Szuper! ${tens} tízes és ${ones} egyes együtt ${target}.`,
      });
    } else if (built === target) {
      setMsg1({
        ok: false,
        text: 'Az érték jó, de 10 darab 1-es korongot válts be egy 10-es korongra! Nyomd meg a „Beváltom” gombot.',
      });
    } else if (tens !== T && ones === E) {
      setMsg1({
        ok: false,
        text: `Az egyesek jók! A ${target}-ben ${T} tízes és ${E} egyes van. Neked most ${tens} tízesed van.`,
      });
    } else if (tens === T) {
      setMsg1({
        ok: false,
        text: `A tízesek jók! Most az egyeseket nézd: ${E} darab 1-es kell, nálad ${ones} van.`,
      });
    } else {
      setMsg1({
        ok: false,
        text: `Most ${built} van az asztalon. A ${target} = ${T} tízes + ${E} egyes. Próbáld újra!`,
      });
    }
  };

  // Labor II: Számegyenes-vadászat (0–20)
  const [lineTask, setLineTask] = useState<LineTask>(() => ({
    prompt: 'Keresd meg a 14 nagyobb egyes számszomszédját!',
    answer: 15,
    hint: 'A nagyobb egyes szomszéd 1-gyel több: 14 + 1 = 15.',
  }));
  const [selectedTick, setSelectedTick] = useState<number | null>(null);
  const [msg2, setMsg2] = useState<{ ok: boolean; text: string } | null>(null);

  const newLineTask = () => {
    setLineTask(makeLineTask(lineTask.answer));
    setSelectedTick(null);
    setMsg2(null);
  };

  const check2 = () => {
    if (selectedTick === null) {
      setMsg2({ ok: false, text: 'Előbb koppints egy számra a számegyenesen!' });
      return;
    }
    if (selectedTick === lineTask.answer) {
      setMsg2({ ok: true, text: `Ügyes vagy! A helyes válasz valóban a ${lineTask.answer}.` });
    } else {
      setMsg2({
        ok: false,
        text: `A ${selectedTick} nem jó válasz. Tipp: ${lineTask.hint}`,
      });
    }
  };

  return (
    <TheoryTemplate
      topicId="g2-numbers-to-20"
      subtopicId="szamok-0-tol-20-ig"
      grade={2}
      chapterId="szamolas-20-ig"
      title="1. Számok 0-tól 20-ig"
      subtitle="Számlálás, helyiérték (tízesek és egyesek), számegyenes, számszomszédok, páros és páratlan számok, sorszámok."
      badge="2. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 20-IG • TANANYAG"
      themeColor="blue"
      pdfFilename="2_osztaly_szamok_0_tol_20_ig_tananyag.pdf"
      practiceTitle="Készen állsz a gyakorlásra?"
      practiceSubtitle="Próbáld ki tudásodat a 3 szintes kvízben és a játékokban!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLYOK — 0-TÓL 20-IG',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center font-mono text-base font-black text-blue-900 dark:text-blue-200">
              10 egyes = 1 tízes • 20 egyes = 2 tízes
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Az <strong>egyjegyű</strong> számok: 0-tól 9-ig. A <strong>kétjegyűek</strong> 20-ig: 10-től 20-ig.</li>
              <li><strong>Páros</strong> számok: 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20.</li>
              <li><strong>Darab és sorszám:</strong> „5 zászló” (mennyi?), „az 5. zászló” (hányadik?).</li>
            </ul>
          </div>
        ),
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Bevezető" badgeColor="blue">
        <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>Idén felelevenítjük és megerősítjük a számokat <strong>0-tól 20-ig</strong>.</p>
          <p>Megszámoljuk a dolgokat, megnézzük a számok helyiértékét <strong>tízesekkel és egyesekkel</strong>, és elhelyezzük őket a <strong>számegyenesen</strong>.</p>
          <p>Megtanuljuk biztosan megkülönböztetni a <strong>páros és páratlan</strong> számokat, a <strong>számszomszédokat</strong> és a <strong>sorszámokat</strong> is.</p>
        </div>
      </TheorySection>

      {/* 2. Számlálás és helyiérték */}
      <TheorySection title="2. Számlálás és helyiérték" badge="10 egyes = 1 tízes" badgeColor="indigo">
        <DiscsPlaceValueSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Egyesek és tízesek" badge="Korongok" badgeColor="purple">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Ha összegyűlik <strong>10 darab 1-es</strong> korong, becseréljük <strong>1 darab 10-es</strong> korongra.
              A 16-ban <strong>1 tízes</strong> és <strong>6 egyes</strong> van. A 20-ban <strong>2 tízes</strong> és <strong>0 egyes</strong> van.
            </p>
          </TheoryCard>
          <TheoryCard title="Számok neve és jegyei" badge="0 – 20" badgeColor="sky">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              A <strong>0, 1, 2, 3, 4, 5, 6, 7, 8, 9</strong> mind <strong>egyjegyű</strong> szám.
              A <strong>10-től 20-ig</strong> terjedő számok <strong>kétjegyűek</strong>: az első jegy a tízesek, a második az egyesek száma.
              Például: <strong>17 = tizenhét</strong>, <strong>20 = húsz</strong>, <strong>0 = nulla</strong>.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Számegyenes, összehasonlítás, számszomszédok */}
      <TheorySection title="3. Számegyenes és számszomszédok" badge="<, =, >" badgeColor="emerald">
        <NumberLine20Svg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Egyes számszomszédok" badge="12 < 13 < 14" badgeColor="emerald">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Minden számnak van közvetlen <strong>kisebb</strong> (1-gyel kevesebb) és közvetlen <strong>nagyobb</strong> (1-gyel több) egyes számszomszédja.
              Például a 13 szomszédai a <strong>12 és a 14</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="Növekvő és csökkenő sorrend" badge="Összehasonlítás" badgeColor="teal">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              A számegyenesen jobbra haladva a számok <strong>növekednek</strong> (0, 1, 2, ..., 20), balra haladva <strong>csökkennek</strong>.
              A nyitott száj mindig a nagyobb szám felé fordul: <strong>15 &gt; 9</strong>, és <strong>10 &lt; 14 &lt; 18</strong>.
            </p>
          </TheoryCard>
        </div>
        <TheoryTable
          headers={['Kisebb egyes szomszéd', 'Szám', 'Nagyobb egyes szomszéd', 'Írása jelekkel']}
          rows={[
            ['0', '1', '2', '0 < 1 < 2'],
            ['7', '8', '9', '7 < 8 < 9'],
            ['18', '19', '20', '18 < 19 < 20'],
          ]}
        />
      </TheorySection>

      {/* 4. Páros és páratlan számok */}
      <TheorySection title="4. Páros és páratlan számok" badge="Páros = 0, 2, 4, 6, 8" badgeColor="amber">
        <EvenOddStreetSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Páros számok" badge="0, 2, 4, 6, 8" badgeColor="emerald">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Ha korongokat párba állítunk, egyik sem marad egyedül.
              A <strong>0 is páros szám</strong>! 20-ig a páros számok: <strong>0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="Páratlan számok" badge="1, 3, 5, 7, 9" badgeColor="blue">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Ha párba állítjuk a korongokat, <strong>1 mindig kimarad</strong>.
              20-ig a páratlan számok: <strong>1, 3, 5, 7, 9, 11, 13, 15, 17, 19</strong>.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Táblázat, diagram és sorszámok */}
      <TheorySection title="5. Táblázat, oszlopdiagram és sorszámok" badge="Darab és sorrend" badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          <Grid1To20Svg />
          <BarCountChartSvg />
        </div>
        <OrdinalRowSvg />
        <TheoryCallout type="tip" title="Pont a szám után = sorszám!">
          Ha azt kérdezzük: <strong>„Hány darab?”</strong>, akkor sima számot írunk (pl. <strong>5 zászló</strong>).
          Ha azt kérdezzük: <strong>„Hányadik a sorban?”</strong>, akkor pontot teszünk a szám után (pl. <strong>az 5. zászló</strong>).
          A rácsban mindkettőt megmondjuk: például <strong>„a 2. sor 4. helye”</strong>.
        </TheoryCallout>
      </TheorySection>

      {/* 6. Nézzük meg együtt */}
      <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="orange">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Mennyit ér?" badge="1 t + 10 e" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>Van 1 darab 10-es korongunk és 10 darab 1-es korongunk.</li>
              <li>A 10 darab 1-esből lesz még 1 darab 10-es.</li>
              <li>Így 2 darab 10-esünk van: <strong>20</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Mely számok illenek ide?" badge="10 < □ < 16" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>Keressük a 10-nél nagyobb, de 16-nál kisebb <strong>páratlan</strong> számokat!</li>
              <li>A 10 és 16 között ezek vannak: 11, 12, 13, 14, 15.</li>
              <li>Közülük a páratlanok: <strong>11, 13, 15</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Igaz vagy hamis?" badge="Állítások" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>„Minden kétjegyű szám nagyobb, mint 9.” → <strong>Igaz</strong> (10 a legkisebb).</li>
              <li>„A 15 nagyobb egyes szomszédja a 14.” → <strong>Hamis</strong> (a 14 kisebb, a 16 a nagyobb).</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 7. Vigyázz! */}
      <TheorySection title="7. Vigyázz!" badge="Gyakori csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Ne keverd össze a helyiértékeket és a pontot!"
          wrong="1 tízes + 5 egyes = 51, és a 7. zászló = 7 darab zászló"
          wrongExplanation="Az 51-ben 5 tízes és 1 egyes van! A „7. zászló” pedig csak egyetlen zászló a hetedik helyen."
          correct="1 tízes + 5 egyes = 15, és 7 zászló ≠ a 7. zászló"
          correctExplanation="Mindig a tízes áll elöl és az egyes hátul. Ha csak egy sorszámot mondunk, pontot írunk utána."
          tip="A 0 is egyjegyű, és a 0 is páros szám!"
        />
      </TheorySection>

      {/* 8. Labor I: Korongos számépítő */}
      <TheorySection title="8. Labor I: Rakd ki a számot korongokkal!" badge="Interaktív labor" badgeColor="blue">
        <div className="bg-white dark:bg-slate-900 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/40 rounded-xl p-3 text-center text-blue-900 dark:text-blue-200 font-semibold">
            Rakd ki korongokkal ezt a számot:
            <span className="text-3xl font-black align-middle ml-2">{target}</span>
          </div>

          <svg viewBox="0 0 360 132" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200">
            <rect x="1" y="1" width="358" height="130" rx="10" fill="#f8fafc" />
            {Array.from({ length: Math.min(tens, 4) }, (_, i) => (
              <TenDisc key={`t${i}`} cx={38 + i * 36} cy={52} r={15} />
            ))}
            {Array.from({ length: Math.min(ones, 15) }, (_, i) => (
              <OneDisc key={`o${i}`} cx={195 + (i % 5) * 28} cy={28 + Math.floor(i / 5) * 28} r={11} />
            ))}
            {built === 0 && (
              <text x="180" y="66" textAnchor="middle" fontSize="13.5" fill="#64748b">
                Az asztal üres. Nyomd meg a korong gombokat!
              </text>
            )}
            <text x="90" y="118" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#6b21a8">
              {tens} db 10-es
            </text>
            <text x="260" y="118" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">
              {ones} db 1-es
            </text>
          </svg>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => {
                setTens(Math.min(3, tens + 1));
                setMsg1(null);
              }}
              className="px-3 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm min-h-[48px] cursor-pointer"
            >
              + 10-es korong
            </button>
            <button
              type="button"
              onClick={() => {
                setTens(Math.max(0, tens - 1));
                setMsg1(null);
              }}
              className="px-3 py-3 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-sm min-h-[48px] cursor-pointer"
            >
              − 10-es korong
            </button>
            <button
              type="button"
              onClick={() => {
                setOnes(Math.min(15, ones + 1));
                setMsg1(null);
              }}
              className="px-3 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm min-h-[48px] cursor-pointer"
            >
              + 1-es korong
            </button>
            <button
              type="button"
              onClick={() => {
                setOnes(Math.max(0, ones - 1));
                setMsg1(null);
              }}
              className="px-3 py-3 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-sm min-h-[48px] cursor-pointer"
            >
              − 1-es korong
            </button>
          </div>

          {ones >= 10 && tens < 3 && (
            <button
              type="button"
              onClick={() => {
                setOnes(ones - 10);
                setTens(tens + 1);
                setMsg1(null);
              }}
              className="w-full px-3 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm min-h-[48px] cursor-pointer"
            >
              Beváltom: 10 db 1-es korong → 1 db 10-es korong
            </button>
          )}

          <div className="text-center text-base font-bold text-slate-700 dark:text-slate-200">
            Az asztalon: {tens} tízes + {ones} egyes = {built}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={check1}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold min-h-[48px] cursor-pointer"
            >
              Ellenőrzés
            </button>
            <button
              type="button"
              onClick={newBuild}
              className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm font-bold min-h-[48px] cursor-pointer"
            >
              Új feladat
            </button>
          </div>

          {msg1 && (
            <div
              className={`rounded-xl p-3 text-center text-sm font-bold ${
                msg1.ok ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
              }`}
            >
              {msg1.text}
            </div>
          )}
        </div>
      </TheorySection>

      {/* 9. Labor II: Számegyenes-vadászat */}
      <TheorySection title="9. Labor II: Találd meg a számegyenesen!" badge="Interaktív labor" badgeColor="emerald">
        <div className="bg-white dark:bg-slate-900 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-emerald-50 dark:bg-emerald-950/40 rounded-xl p-3 text-center text-sm sm:text-base font-bold text-emerald-900 dark:text-emerald-200">
            {lineTask.prompt}
          </div>

          <div className="grid grid-cols-7 sm:grid-cols-11 gap-1.5">
            {Array.from({ length: 21 }, (_, n) => {
              const isSelected = selectedTick === n;
              const isCorrectRevealed = msg2?.ok && n === lineTask.answer;
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    setSelectedTick(n);
                    setMsg2(null);
                  }}
                  className={`py-2.5 rounded-xl border-2 font-bold text-sm min-h-[44px] transition-all cursor-pointer ${
                    isCorrectRevealed
                      ? 'bg-emerald-600 text-white border-emerald-700'
                      : isSelected
                      ? 'bg-blue-600 text-white border-blue-700 shadow-sm'
                      : 'bg-slate-50 hover:bg-emerald-50 text-slate-800 border-slate-200'
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={check2}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold min-h-[48px] cursor-pointer"
            >
              Ellenőrzés
            </button>
            <button
              type="button"
              onClick={newLineTask}
              className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm font-bold min-h-[48px] cursor-pointer"
            >
              Új feladat
            </button>
          </div>

          {msg2 && (
            <div
              className={`rounded-xl p-3 text-center text-sm font-bold ${
                msg2.ok ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
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

export default Numbers20G2Theory;
