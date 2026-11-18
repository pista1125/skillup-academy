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
  ReachTenAndSubTenSvg,
  AnalogySubNoCrossSvg,
  BridgingDownTwentyFrameSvg,
  ThreeStrategiesLineSvg,
  RadialTwentyWheelSvg,
  ArrowChainSubSvg
} from './Sub20G2Figures';
import { SUB20_FONT, TwentyFrameSubPart } from './Sub20G2Parts';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

interface BridgeSubTask {
  minuend: number;
  subtrahend: number;
}

const makeBridgeSubTask = (): BridgeSubTask => {
  for (;;) {
    const minuend = rnd(11, 18);
    const ones = minuend - 10;
    const subtrahend = rnd(ones + 1, 9);
    if (minuend - subtrahend >= 2 && subtrahend <= 9) {
      return { minuend, subtrahend };
    }
  }
};

interface TwoSidedSubTask {
  leftA: number;
  leftB: number;
  rightMinuend: number;
}

const makeTwoSidedSubTask = (): TwoSidedSubTask => {
  for (;;) {
    const leftA = rnd(12, 20);
    const leftB = rnd(3, leftA - 2);
    const targetDiff = leftA - leftB;
    if (targetDiff >= 2 && targetDiff <= 14) {
      const rightMinuend = rnd(targetDiff + 2, 20);
      const ans = rightMinuend - targetDiff;
      if (rightMinuend !== leftA && ans >= 1 && ans <= 12) {
        return { leftA, leftB, rightMinuend };
      }
    }
  }
};

export const Sub20G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: Átlépés 10-en (20-as keret áthúzással)
  const [lab1, setLab1] = useState<BridgeSubTask>(() => ({ minuend: 14, subtrahend: 7 }));
  const [crossed, setCrossed] = useState<number>(0);
  const [chosenDiff, setChosenDiff] = useState<number | null>(null);
  const [msg1, setMsg1] = useState<{ ok: boolean; text: string } | null>(null);

  const newLab1 = () => {
    setLab1(makeBridgeSubTask());
    setCrossed(0);
    setChosenDiff(null);
    setMsg1(null);
  };

  const checkLab1 = () => {
    const toTen = lab1.minuend - 10;
    const rest = lab1.subtrahend - toTen;
    const ans = lab1.minuend - lab1.subtrahend;
    if (crossed !== lab1.subtrahend) {
      setMsg1({
        ok: false,
        text: `Még ${crossed} korongot húztál át, pedig ${lab1.subtrahend}-at kell elvenni! Előbb húzd át az alsó sorban lévő ${toTen} korongot, aztán még ${rest}-at!`
      });
      return;
    }
    if (chosenDiff === null) {
      setMsg1({
        ok: false,
        text: 'Az áthúzás szuper! Most válaszd ki lent a maradékot!'
      });
      return;
    }
    if (chosenDiff !== ans) {
      setMsg1({
        ok: false,
        text: `Nézd meg a keretet: ${lab1.minuend} − ${toTen} = 10, majd 10 − ${rest}. Számold meg a megmaradt korongokat!`
      });
      return;
    }
    setMsg1({
      ok: true,
      text: `Remek! ${lab1.minuend} − ${lab1.subtrahend} = ${lab1.minuend} − ${toTen} − ${rest} = 10 − ${rest} = ${ans}.`
    });
  };

  // Labor II: Kétoldali kivonás-egyenlet (mérleg)
  const [lab2, setLab2] = useState<TwoSidedSubTask>(() => ({
    leftA: 16,
    leftB: 5,
    rightMinuend: 18
  }));
  const [guess2, setGuess2] = useState<number>(4);
  const [msg2, setMsg2] = useState<{ ok: boolean; text: string } | null>(null);

  const leftVal = lab2.leftA - lab2.leftB;
  const rightVal = lab2.rightMinuend - guess2;
  const tilt = rightVal === leftVal ? 0 : rightVal > leftVal ? 8 : -8;

  const newLab2 = () => {
    setLab2(makeTwoSidedSubTask());
    setGuess2(3);
    setMsg2(null);
  };

  const checkLab2 = () => {
    const need = lab2.rightMinuend - leftVal;
    if (guess2 === need) {
      setMsg2({
        ok: true,
        text: `Egyensúlyban van! ${lab2.leftA} − ${lab2.leftB} = ${leftVal}, és ${lab2.rightMinuend} − ${need} = ${leftVal}.`
      });
    } else if (rightVal > leftVal) {
      setMsg2({
        ok: false,
        text: `A bal oldal ${leftVal}, a jobb oldal ${lab2.rightMinuend} − ${guess2} = ${rightVal}. Ez túl sok, vonj ki többet!`
      });
    } else {
      setMsg2({
        ok: false,
        text: `A bal oldal ${leftVal}, a jobb oldal csak ${lab2.rightMinuend} − ${guess2} = ${rightVal}. Vonj ki kevesebbet!`
      });
    }
  };

  const toTen1 = lab1.minuend - 10;
  const crossedFromSecondRow = Math.min(crossed, toTen1);
  const crossedFromFirstRow = Math.max(0, crossed - toTen1);

  return (
    <TheoryTemplate
      topicId="g2-numbers-to-20"
      subtopicId="kivonas-20-as-szamkor"
      grade={2}
      chapterId="szamolas-20-ig"
      title="5. Kivonás 20-as számkör"
      subtitle="Elvétel 10-ig, 10 elvétele, kivonás tízesátlépés nélkül és tízesátlépéssel, kétjegyűből kétjegyű és ellenőrzés összeadással."
      badge="2. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 20-IG • TANANYAG"
      themeColor="teal"
      pdfFilename="2_osztaly_kivonas_20_as_szamkor_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben, a párosítóban és a csoportosítóban!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — VISSZALÉPÉS 10-RE',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-teal-50/90 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800/80 text-center font-mono text-sm sm:text-base font-black text-teal-900 dark:text-teal-200">
              14 − 7 = 14 − 4 − 3 = 10 − 3 = 7
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>10-re lépés:</strong> 14 − 4 = 10. A <strong>10 elvétele:</strong> 16 − 10 = 6.</li>
              <li><strong>Tízesátlépés nélkül:</strong> 8 − 3 = 5 → 18 − 3 = 15.</li>
              <li><strong>Tízesátlépéssel:</strong> előbb lépj vissza 10-re, aztán vedd el a maradékot!</li>
              <li><strong>Ellenőrzés:</strong> mindig összeadással (7 + 7 = 14).</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="0–20 számkör" badgeColor="teal">
        <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>Most a <strong>0–20-as számkörben</strong> gyakoroljuk a kivonást!</p>
          <p>Először visszalépünk 10-re és elvesszük a 10-et, aztán a „kistesóval” számolunk, majd megtanuljuk a <strong>tízesátlépést</strong> két lépésben.</p>
          <p>Megnézzük azt is, hogyan vonunk ki <strong>kétjegyűből kétjegyű</strong> számot háromféle ügyes módon.</p>
        </div>
      </TheorySection>

      {/* 2. Elvétel 10-ig és 10 elvétele */}
      <TheorySection title="2. Elvétel 10-ig és 10 elvétele" badge="Alapok" badgeColor="sky">
        <ReachTenAndSubTenSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Visszalépés 10-re" badge="14 − 4 = 10" badgeColor="sky">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Ha egy kétjegyű számból az <strong>összes egyest</strong> vesszük el, pontosan <strong>10</strong> marad: 12 − 2 = 10, 17 − 7 = 10.
            </p>
          </TheoryCard>
          <TheoryCard title="A 10 elvétele" badge="16 − 10 = 6" badgeColor="amber">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Ha a <strong>10-et</strong> vesszük el, csak az egyesek maradnak meg: 16 − 10 = 6, 19 − 10 = 9.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Kivonás tízesátlépés nélkül */}
      <TheorySection title="3. Kivonás tízesátlépés nélkül" badge="Kistesó trükk" badgeColor="emerald">
        <AnalogySubNoCrossSvg />
        <TheoryCallout type="tip" title="A kistesó segít!">
          Ha a kivonandó nem nagyobb az egyesek számánál, a tízeshez nem nyúlunk! Tudod, hogy <strong>8 − 3 = 5</strong>, ezért <strong>18 − 3 = 15</strong> és <strong>16 − 4 = 12</strong> (mert 6 − 4 = 2).
        </TheoryCallout>
      </TheorySection>

      {/* 4. Kivonás tízesátlépéssel */}
      <TheorySection title="4. Kivonás tízesátlépéssel (átlépés 10-en)" badge="Két lépés" badgeColor="orange">
        <BridgingDownTwentyFrameSvg />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="1. lépés: Vissza 10-re" badge="14 − 4 = 10" badgeColor="emerald">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              A 14-ből először elvesszük a 4 egyest. Így megérkezünk a <strong>10</strong>-hez.
            </p>
          </TheoryCard>
          <TheoryCard title="2. lépés: A maradék" badge="7 = 4 + 3" badgeColor="orange">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              7-et kell elvenni. 4-et már elvettünk, ezért még <strong>3</strong>-at kell elvenni a 10-ből.
            </p>
          </TheoryCard>
          <TheoryCard title="3. lépés: Eredmény" badge="10 − 3 = 7" badgeColor="rose">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              10 − 3 = 7. Vagyis <strong>14 − 7 = 7</strong>. Ellenőrzés: 7 + 7 = 14.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Kétjegyűből kétjegyű (3 út) */}
      <TheorySection title="5. Kétjegyűből kétjegyű (3 ügyes út)" badge="Stratégiák" badgeColor="blue">
        <ThreeStrategiesLineSvg />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="1. út: Tízes, aztán egyes" badge="17 − 10 − 3" badgeColor="sky">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Előbb a 10-et veszed el: 17 − 10 = 7. Aztán még 3-at: 7 − 3 = <strong>4</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="2. út: Egyes, aztán tízes" badge="17 − 3 − 10" badgeColor="amber">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Előbb a 3 egyest veszed el: 17 − 3 = 14. Aztán a 10-et: 14 − 10 = <strong>4</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="3. út: Előbb 10-re!" badge="17 − 7 − 6" badgeColor="emerald">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Visszalépsz 10-re: 17 − 7 = 10. A 13-ból még 6 maradt: 10 − 6 = <strong>4</strong>.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Ellenőrzés, kivonókerék, műveletlánc */}
      <TheorySection title="6. Ellenőrzés, kivonókerék és műveletlánc" badge="Összefüggések" badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          <RadialTwentyWheelSvg />
          <ArrowChainSubSvg />
        </div>
        <TheoryTable
          headers={['Feladat', 'Mit keresünk?', 'Hogyan számoljuk ki?', 'Ellenőrzés']}
          rows={[
            ['15 − 8 = □', 'különbség', '15 − 5 − 3 = 7', '7 + 8 = 15'],
            ['16 − □ = 9', 'kivonandó', '16 − 9 = 7 (vagy 9 + 7 = 16)', '16 − 7 = 9'],
            ['□ − 6 = 8', 'kisebbítendő', '8 + 6 = 14', '14 − 6 = 8']
          ]}
        />
      </TheorySection>

      {/* 7. Nézzük meg együtt! */}
      <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Tízesátlépés" badge="13 − 6" badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>13-ból mennyi kell vissza 10-re? <strong>3</strong>.</li>
              <li>A 6-ot felbontjuk: 6 = 3 + 3.</li>
              <li>13 − 3 = 10, majd 10 − 3 = <strong>7</strong>.</li>
              <li>Ellenőrzés: 7 + 6 = 13.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Hiányzó számok" badge="□" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li><strong>□ − 7 = 8</strong> → a kisebbítendőt összeadással kapjuk: 8 + 7 = <strong>15</strong>.</li>
              <li><strong>16 − 5 = 18 − □</strong> → a bal oldal 11.</li>
              <li>18-ból mennyit vegyünk el, hogy 11 legyen? 18 − 11 = <strong>7</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Nyitott mondat (0–20)" badge="▲ < 15 − 7" badgeColor="teal">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>Előbb számolj: 15 − 7 = 8.</li>
              <li>Így: <strong>▲ &lt; 8</strong>.</li>
              <li>A 0–20-as számkörben ide írható: <strong>0, 1, 2, 3, 4, 5, 6, 7</strong> (összesen 8 szám).</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 8. Vigyázz! */}
      <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="14 − 6 = ? (Mindkét részt vedd el!)"
          wrong="14 − 4 + 2 = 12"
          wrongExplanation="A 6-ot 4-re és 2-re bontottuk, de a 2-t nem hozzáadni kell, hanem azt is el kell venni!"
          correct="14 − 4 − 2 = 10 − 2 = 8"
          correctExplanation="Előbb elveszel 4-et (10 marad), aztán még 2-t elveszel a 10-ből. Így 8 marad."
          tip="Mindig ellenőrizd összeadással: 8 + 6 = 14 (a 12 + 6 = 18, tehát a 12 biztosan nem jó!)."
        />
        <TheoryCallout type="warning" title="Vigyázz, ha az első szám hiányzik!">
          A <strong>□ − 5 = 9</strong> feladatban a □ a legnagyobb szám, mert belőle vettünk el! Ezért összeadni kell: <strong>9 + 5 = 14</strong>, nem pedig 9 − 5!
        </TheoryCallout>
      </TheorySection>

      {/* 9. Labor I: Átlépés 10-en */}
      <TheorySection title="9. Labor I: Lépj vissza 10-re a 20-as keretben!" badge="Labor" badgeColor="orange">
        <div className="bg-white dark:bg-slate-900 border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-orange-50 dark:bg-orange-950/40 rounded-xl p-3 text-center text-orange-950 dark:text-orange-100">
            Számold ki: <span className="text-3xl font-black align-middle ml-2">{lab1.minuend} − {lab1.subtrahend} = ?</span>
            <p className="text-xs mt-1 text-orange-800 dark:text-orange-300">
              1. Húzz át pontosan {lab1.subtrahend} korongot (előbb az alsó sorból!). &nbsp; 2. Válaszd ki a maradékot!
            </p>
          </div>

          <svg viewBox="0 0 340 96" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200" fontFamily={SUB20_FONT}>
            <TwentyFrameSubPart
              x={38}
              y={16}
              cell={26}
              total={lab1.minuend}
              crossed={crossed}
              highlightTenRow
            />
            <text x="170" y="84" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
              Áthúzva: {crossed} db (−{crossedFromSecondRow} az alsó sorból, −{crossedFromFirstRow} a felsőből)
            </text>
          </svg>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => {
                setCrossed(Math.min(lab1.minuend, crossed + 1));
                setMsg1(null);
              }}
              className="px-3 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm min-h-[48px] cursor-pointer"
            >
              + 1 korong áthúzása
            </button>
            <button
              type="button"
              onClick={() => {
                setCrossed(Math.max(0, crossed - 1));
                setMsg1(null);
              }}
              className="px-3 py-3 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold text-sm min-h-[48px] cursor-pointer"
            >
              − 1 visszavonás
            </button>
            <button
              type="button"
              onClick={() => {
                setCrossed(toTen1);
                setMsg1(null);
              }}
              className="col-span-2 sm:col-span-1 px-3 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm min-h-[48px] cursor-pointer"
            >
              Vissza 10-re (−{toTen1})
            </button>
          </div>

          <div className="space-y-1.5">
            <div className="text-xs font-bold text-slate-600 dark:text-slate-400">Mennyi maradt? Válaszd ki a különbséget:</div>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    setChosenDiff(n);
                    setMsg1(null);
                  }}
                  className={`py-2.5 rounded-xl font-black text-base border-2 cursor-pointer min-h-[44px] ${
                    chosenDiff === n
                      ? 'bg-teal-600 text-white border-teal-700'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-teal-400'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={checkLab1}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold min-h-[48px] cursor-pointer"
            >
              Ellenőrzés
            </button>
            <button
              type="button"
              onClick={newLab1}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm font-bold min-h-[48px] cursor-pointer"
            >
              Új feladat
            </button>
          </div>

          {msg1 && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${msg1.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {msg1.text}
            </div>
          )}
        </div>
      </TheorySection>

      {/* 10. Labor II: Egyensúly-mérleg kivonással */}
      <TheorySection title="10. Labor II: Állítsd egyensúlyba a kivonásmérleget!" badge="Labor" badgeColor="teal">
        <div className="bg-white dark:bg-slate-900 border-2 border-teal-200 dark:border-teal-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="bg-teal-50 dark:bg-teal-950/40 rounded-xl p-3 text-center text-teal-950 dark:text-teal-100">
            Milyen szám kerüljön a □ helyére, hogy egyenlő legyen?
            <div className="text-2xl sm:text-3xl font-black mt-1">
              {lab2.leftA} − {lab2.leftB} = {lab2.rightMinuend} − □
            </div>
          </div>

          <svg viewBox="0 0 340 135" className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200" fontFamily={SUB20_FONT}>
            <polygon points="170,86 154,122 186,122" fill="#475569" />
            <rect x="128" y="120" width="84" height="8" rx="4" fill="#334155" />
            <g transform={`rotate(${tilt} 170 84)`}>
              <line x1="56" y1="84" x2="284" y2="84" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
              <rect x="30" y="34" width="108" height="44" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="2.5" />
              <text x="84" y="62" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e3a8a">
                {lab2.leftA} − {lab2.leftB}
              </text>
              <rect x="202" y="34" width="108" height="44" rx="10" fill="#fee2e2" stroke="#dc2626" strokeWidth="2.5" />
              <text x="256" y="62" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#991b1b">
                {lab2.rightMinuend} − {guess2}
              </text>
            </g>
            <text x="170" y="20" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={tilt === 0 ? '#15803d' : '#b45309'}>
              {tilt === 0 ? 'A két oldal egyenlő!' : tilt > 0 ? 'A jobb oldal nagyobb!' : 'A jobb oldal kisebb!'}
            </text>
          </svg>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                setGuess2(Math.max(0, guess2 - 1));
                setMsg2(null);
              }}
              className="px-4 py-2.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold text-base min-h-[48px] cursor-pointer"
            >
              − 1 (kevesebbet vonok ki)
            </button>
            <div className="px-5 py-2.5 rounded-xl bg-slate-100 border-2 border-slate-300 font-black text-xl text-slate-900">
              □ = {guess2}
            </div>
            <button
              type="button"
              onClick={() => {
                setGuess2(Math.min(lab2.rightMinuend, guess2 + 1));
                setMsg2(null);
              }}
              className="px-4 py-2.5 rounded-xl bg-teal-100 hover:bg-teal-200 text-teal-900 font-bold text-base min-h-[48px] cursor-pointer"
            >
              + 1 (többet vonok ki)
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={checkLab2}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold min-h-[48px] cursor-pointer"
            >
              Ellenőrzés
            </button>
            <button
              type="button"
              onClick={newLab2}
              className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm font-bold min-h-[48px] cursor-pointer"
            >
              Új feladat
            </button>
          </div>

          {msg2 && (
            <div className={`rounded-xl p-3 text-center text-sm font-bold ${msg2.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {msg2.text}
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Sub20G2Theory;
