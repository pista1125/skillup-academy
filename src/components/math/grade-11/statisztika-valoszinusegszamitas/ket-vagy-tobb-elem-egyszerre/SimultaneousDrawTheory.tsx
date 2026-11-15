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
  SimultaneousDrawLottoSvg,
  SimultaneousDrawGroupsSvg,
  SimultaneousDrawBinomialPairsSvg,
  SimultaneousDrawBookshelfSvg,
  SimultaneousDrawOlympicsSvg
} from './SimultaneousDrawFigures';

/** n alatt k (pontos egész, kis n-re). */
const binom = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0;
  const kk = Math.min(k, n - k);
  let r = 1;
  for (let i = 1; i <= kk; i++) r = (r * (n - kk + i)) / i;
  return Math.round(r);
};

const fmt = (x: number, d = 4): string => (Number.isFinite(x) ? x.toLocaleString('hu-HU', { maximumFractionDigits: d }) : '–');
const big = (x: number): string => x.toLocaleString('hu-HU');

/** Binomiális együttható JSX-ben (egymás alatt n és k, zárójelben). */
const Binom: React.FC<{ n: React.ReactNode; k: React.ReactNode }> = ({ n, k }) => (
  <span className="inline-flex items-center align-middle mx-0.5">
    <span className="text-2xl leading-none font-light">(</span>
    <span className="inline-flex flex-col items-center leading-tight text-xs font-semibold px-0.5">
      <span>{n}</span>
      <span>{k}</span>
    </span>
    <span className="text-2xl leading-none font-light">)</span>
  </span>
);

/** Tört JSX-ben. */
const Frac: React.FC<{ num: React.ReactNode; den: React.ReactNode }> = ({ num, den }) => (
  <span className="inline-flex flex-col items-center align-middle mx-1">
    <span className="px-1">{num}</span>
    <span className="px-1 border-t border-current">{den}</span>
  </span>
);

const sample = (n: number, k: number): number[] => {
  const idx = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx.slice(0, k);
};

const LOTTERIES = [
  { name: 'ötös lottó', N: 90, k: 5 },
  { name: 'hatos lottó', N: 45, k: 6 },
  { name: 'skandináv lottó', N: 35, k: 7 }
];

export const SimultaneousDrawTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: urnamodell
  const [red, setRed] = useState<number>(4);
  const [blue, setBlue] = useState<number>(6);
  const [k, setK] = useState<number>(2);
  const [drawn, setDrawn] = useState<number[]>([]);
  const [trials, setTrials] = useState<number>(0);
  const [hits, setHits] = useState<number>(0);
  const n = red + blue;
  const kk = Math.min(k, n);
  const fav = binom(red, kk);
  const tot = binom(n, kk);
  const p = tot > 0 ? fav / tot : 0;
  const seqFactors = Array.from({ length: kk }, (_, i) => `${red - i}/${n - i}`);
  const reset = () => {
    setDrawn([]);
    setTrials(0);
    setHits(0);
  };
  const drawOnce = () => {
    const s = sample(n, kk);
    setDrawn(s);
    setTrials((t) => t + 1);
    if (s.every((i) => i < red)) setHits((h) => h + 1);
  };
  const drawMany = (times: number) => {
    let h = 0;
    let last: number[] = [];
    for (let t = 0; t < times; t++) {
      last = sample(n, kk);
      if (last.every((i) => i < red)) h++;
    }
    setDrawn(last);
    setTrials((t) => t + times);
    setHits((x) => x + h);
  };

  // Labor II: binomiális együttható és lottó
  const [bn, setBn] = useState<number>(10);
  const [bk, setBk] = useState<number>(3);
  const bkk = Math.min(bk, bn);
  const numFactors = Array.from({ length: bkk }, (_, i) => bn - i);
  const [threshold, setThreshold] = useState<number>(10);
  const pAbove = binom(90 - threshold, 5) / binom(90, 5);

  const cols = Math.min(10, Math.max(5, Math.ceil(Math.sqrt(n * 1.6))));
  const rowsCount = Math.ceil(n / cols);

  return (
    <TheoryTemplate
      topicId="g11-statisztika-valoszinuseg"
      subtopicId="ket-vagy-tobb-elem-egyszerre"
      title="10. Két vagy több elemet húzunk egyszerre"
      subtitle="Ha egyszerre több elemet választunk ki, a sorrend nem számít: az esetek számát binomiális együtthatókkal számoljuk – a lottótól a könyvespolcig."
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • TANANYAG"
      themeColor="sky"
      pdfFilename="11_osztaly_ket_vagy_tobb_elem_egyszerre_tananyag.pdf"
      practiceTitle="Készen állsz az egyszerre húzásra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — TÖBB ELEM KIVÁLASZTÁSA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center text-base font-black text-sky-900 dark:text-sky-200">
              p ={' '}
              <Frac num={<Binom n="m" k="k" />} den={<Binom n="n" k="k" />} />
              <span className="font-normal text-sm"> (mind a k kiválasztott elem az m elemű csoportból kerül ki)</span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>n = az összes elem száma, m = az adott tulajdonságú elemek száma, k = a kiválasztott elemek száma.</li>
              <li>
                Az összes eset: n elemből k-t választunk, és nem számít a sorrend: (n alatt k). Számológépen: <strong>n nCr k</strong>.
              </li>
              <li>
                (n alatt k) = n · (n − 1) · … · (n − k + 1) / k! = n! / (k! · (n − k)!); és (n alatt k) = (n alatt n − k).
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Kidolgozott feladat */}
      <TheorySection title="1. Kidolgozott feladat: nulla találat az ötös lottón" badge="Tankönyv 188. o." badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>Az ötös lottóban 90 számból kell ötöt megjelölni. Mennyi a valószínűsége a nulla találatos szelvénynek?</p>
            <p>
              <strong>Összes eset:</strong> a sorsoláskor 90 szám közül 5-öt húznak, és nem számít a sorrend: <Binom n={90} k={5} /> = 43 949 268.
            </p>
            <p>
              <strong>Kedvező esetek:</strong> a nulla találathoz mind az 5 megjelölt számnak a 85 nem nyerő közül kell kikerülnie: <Binom n={85} k={5} /> = 32 801 517.
            </p>
            <p className="text-base">
              p = <Frac num={<Binom n={85} k={5} />} den={<Binom n={90} k={5} />} /> = <Frac num="32 801 517" den="43 949 268" /> ≈ <strong>0,746</strong>
            </p>
            <TheoryCallout type="info" title="Meglepő?">
              A szelvények csaknem háromnegyede egyetlen találatot sem ér el – és legalább egy találat valószínűsége is csak 1 − 0,746 ≈ 0,254.
            </TheoryCallout>
          </div>
          <SimultaneousDrawLottoSvg />
        </div>
      </TheorySection>

      {/* 2. Elmélet */}
      <TheorySection title="2. Elmélet: a valószínűség több elem kiválasztása esetén" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <ul className="list-disc pl-5 space-y-1">
              <li>Egy n elemű halmaz elemei két csoportba különülnek el (nyerő / nem nyerő; egyik osztály / másik osztály; egyik szín / másik szín; hibás / hibátlan).</li>
              <li>Véletlenszerűen kiválasztunk az n közül k darabot.</li>
              <li>Mennyi a valószínűsége, hogy mind a k elem az első (m elemű) csoportból kerül ki?</li>
            </ul>
            <p className="text-base text-center">
              p = <Frac num={<Binom n="m" k="k" />} den={<Binom n="n" k="k" />} />
            </p>
            <TheoryCallout type="tip" title="Ha egyik sem a csoportból kerül ki">
              Ekkor mind a k elem a másik, n − m elemű csoportból jön: p = (n − m alatt k) / (n alatt k). A nulla találatos lottószelvény pontosan ilyen: (85 alatt 5) / (90 alatt 5).
            </TheoryCallout>
          </div>
          <SimultaneousDrawGroupsSvg />
        </div>
      </TheorySection>

      {/* 3. Binomiális együttható */}
      <TheorySection title="3. Binomiális együttható: n alatt a k (1. feladat)" badge="Tankönyv 188–189. o." badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Ha n elem közül kiválasztunk k-t, és nem számít a sorrend, akkor a lehetőségek száma <Binom n="n" k="k" />. Sok számológép ezt közvetlenül meghatározza az <strong>nCr</strong> paranccsal.
            </p>
            <p className="text-base">
              <Binom n={10} k={3} /> = <Frac num="10 · 9 · 8" den="3!" /> = <Frac num="10!" den="3! · 7!" /> = 120 (számológéppel: 10 nCr 3)
            </p>
            <p>
              <strong>1. feladat: kösd össze az egyenlőket!</strong> A szimmetria miatt <Binom n={10} k={3} /> = <Binom n={10} k={7} /> = 120, <Binom n={10} k={4} /> = <Binom n={10} k={6} /> = 210 és <Binom n={10} k={2} /> = <Binom n={10} k={8} /> = 45. Egyedül a <Binom n={10} k={5} /> marad pár nélkül: értéke <strong>252</strong>.
            </p>
          </div>
          <SimultaneousDrawBinomialPairsSvg />
        </div>
      </TheorySection>

      {/* 4. Feladatok */}
      <TheorySection title="4. Feladatok: diákok, könyvek, lottószámok" badge="Tankönyv 189. o." badgeColor="emerald">
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              <TheoryCard title="2. feladat: magyarfakultáció" badge="Feladat" badgeColor="emerald">
                <p className="text-sm text-slate-700">
                  28 diák: 15 tizenegyedikes, 13 tizenkettedikes; két diákot választunk. Összes eset: (28 alatt 2) = 378.
                </p>
                <ul className="list-disc pl-5 text-sm text-slate-700 mt-1">
                  <li>a) mindketten 11.-esek: (15 alatt 2) / 378 = 105/378 = 5/18 ≈ <strong>0,278</strong></li>
                  <li>b) mindketten 12.-esek: (13 alatt 2) / 378 = 78/378 = 13/63 ≈ <strong>0,206</strong></li>
                </ul>
              </TheoryCard>
              <TheoryCard title="3. feladat: a könyvespolc" badge="Feladat" badgeColor="sky">
                <p className="text-sm text-slate-700">14 könyv: 10 prózai (közte 2 Dosztojevszkij), 4 verseskönyv; két könyvet választunk, összes eset (14 alatt 2) = 91.</p>
                <ul className="list-disc pl-5 text-sm text-slate-700 mt-1">
                  <li>a) mindkettő prózai: (10 alatt 2) / 91 = 45/91 ≈ <strong>0,495</strong></li>
                  <li>b) egyik sem prózai (mindkettő vers): (4 alatt 2) / 91 = 6/91 ≈ <strong>0,066</strong></li>
                  <li>c) mindkettőt Dosztojevszkij írta: 1/91 ≈ <strong>0,011</strong></li>
                  <li>d) mindkettő prózai, de nem Dosztojevszkij: (8 alatt 2) / 91 = 28/91 = 4/13 ≈ <strong>0,308</strong></li>
                </ul>
              </TheoryCard>
            </div>
            <SimultaneousDrawBookshelfSvg />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              <TheoryCard title="4. feladat: minden kihúzott szám nagyobb 10-nél" badge="Feladat" badgeColor="amber">
                <p className="text-sm text-slate-700">
                  A 11, 12, …, 90 számok közül (80 db) kell mind az 5-nek kikerülnie: p = (80 alatt 5) / (90 alatt 5) = 24 040 016 / 43 949 268 ≈ <strong>0,547</strong>.
                </p>
              </TheoryCard>
              <TheoryCard title="6. feladat: nyári olimpiák" badge="Feladat" badgeColor="violet">
                <p className="text-sm text-slate-700">A diagram szerint 29 nyári olimpiát rendeztek; hármat választunk, összes eset (29 alatt 3) = 3654.</p>
                <ul className="list-disc pl-5 text-sm text-slate-700 mt-1">
                  <li>a) mind Amerikában: (7 alatt 3) / 3654 = 35/3654 ≈ <strong>0,0096</strong></li>
                  <li>b) mind Ázsiában: (4 alatt 3) / 3654 = 4/3654 ≈ <strong>0,0011</strong></li>
                  <li>c) mind Európán kívül (13 db): (13 alatt 3) / 3654 = 286/3654 ≈ <strong>0,078</strong></li>
                </ul>
              </TheoryCard>
            </div>
            <SimultaneousDrawOlympicsSvg />
          </div>
          <TheoryTable
            headers={['Házi feladat', 'n', 'm', 'k', 'Valószínűség']}
            rows={[
              ['1. mindkét szám osztója 20-nak (1, 2, 4, 5, 10, 20)', '20', '6', '2', '15/190 = 3/38 ≈ 0,079'],
              ['2. a) 3 lapból mindegyik makk', '32', '8', '3', '56/4960 ≈ 0,0113'],
              ['2. b) egyik sem makk', '32', '24', '3', '2024/4960 ≈ 0,408'],
              ['3. a) mind a 4 barátnő a 412-es kocsiban', '32', '18', '4', '3060/35 960 ≈ 0,085'],
              ['3. b) mind a 413-as kocsiban', '32', '14', '4', '1001/35 960 ≈ 0,028'],
              ['3. c) ugyanabban a kocsiban', '32', '–', '4', '(3060 + 1001)/35 960 ≈ 0,113']
            ]}
          />
        </div>
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: úgy számolunk, mintha visszatennénk" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Két faktost választunk a 28-ból. Mennyi a valószínűsége, hogy mindketten 11.-esek?"
          wrong="15/28 · 15/28 ≈ 0,287"
          wrongExplanation="Ez akkor lenne jó, ha az első kiválasztott diákot „visszatennénk”, és újra kiválaszthatnánk. Egyszerre két különböző diákot választunk!"
          correct="(15 alatt 2) / (28 alatt 2) = 105/378 = 5/18 ≈ 0,278"
          correctExplanation="Egymás utáni húzással, visszatevés nélkül is ugyanezt kapjuk: 15/28 · 14/27 = 210/756 = 5/18. A második húzásnál már csak 27 diák és 14 tizenegyedikes maradt."
          tip="Egyszerre húzás = visszatevés nélküli húzás: az összes esetet (n alatt k), a kedvezőket (m alatt k) adja."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: urnamodell kombinációkkal" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">piros golyók (m): {red}</label>
              <input type="range" min={1} max={15} value={red} onChange={(e) => { setRed(Number(e.target.value)); reset(); }} className="w-full accent-rose-600" aria-label="piros golyók száma" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">kék golyók (n − m): {blue}</label>
              <input type="range" min={0} max={15} value={blue} onChange={(e) => { setBlue(Number(e.target.value)); reset(); }} className="w-full accent-sky-600" aria-label="kék golyók száma" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">egyszerre húzott golyók (k): {kk}</label>
              <input type="range" min={1} max={Math.min(6, n)} value={kk} onChange={(e) => { setK(Number(e.target.value)); reset(); }} className="w-full accent-amber-600" aria-label="húzott golyók száma" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <svg viewBox={`0 0 ${cols * 34 + 30} ${rowsCount * 34 + 40}`} className="w-full max-w-sm mx-auto h-auto">
              <path
                d={`M 8 14 L 8 ${rowsCount * 34 + 22} Q 8 ${rowsCount * 34 + 34} 20 ${rowsCount * 34 + 34} L ${cols * 34 + 10} ${rowsCount * 34 + 34} Q ${cols * 34 + 22} ${rowsCount * 34 + 34} ${cols * 34 + 22} ${rowsCount * 34 + 22} L ${cols * 34 + 22} 14`}
                fill="#f1f5f9"
                stroke="#64748b"
                strokeWidth="2"
              />
              {Array.from({ length: n }, (_, i) => {
                const isRed = i < red;
                const isDrawn = drawn.includes(i);
                return (
                  <circle
                    key={i}
                    cx={32 + (i % cols) * 34}
                    cy={34 + Math.floor(i / cols) * 34}
                    r="13"
                    fill={isRed ? '#fb7185' : '#38bdf8'}
                    stroke={isDrawn ? '#facc15' : isRed ? '#be123c' : '#0369a1'}
                    strokeWidth={isDrawn ? 5 : 1.5}
                    opacity={drawn.length > 0 && !isDrawn ? 0.45 : 1}
                  />
                );
              })}
            </svg>
            <div className="space-y-2 text-sm">
              <div className="bg-sky-50 rounded-xl border border-sky-200 p-4 space-y-2">
                <div className="font-bold text-sky-800">P(mind a {kk} golyó piros)</div>
                <div className="text-base">
                  p = <Frac num={<Binom n={red} k={kk} />} den={<Binom n={n} k={kk} />} /> = <Frac num={big(fav)} den={big(tot)} /> ≈ <strong>{fmt(p)}</strong>
                </div>
                <div className="text-xs text-slate-600">
                  Egymás utáni húzással (visszatevés nélkül): {seqFactors.join(' · ')} ≈ {fmt(p)}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={drawOnce} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-100 text-amber-900 hover:bg-amber-200">
                  Húzz {kk} golyót!
                </button>
                <button onClick={() => drawMany(1000)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-100 text-amber-900 hover:bg-amber-200">
                  +1000 húzás
                </button>
                <button onClick={reset} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200">
                  törlés
                </button>
              </div>
              <div className="bg-amber-50 rounded-xl border border-amber-200 p-3">
                húzások: <strong>{trials}</strong>, ebből csupa piros: <strong>{hits}</strong>; relatív gyakoriság: <strong>{trials > 0 ? fmt(hits / trials, 3) : '–'}</strong>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { t: '4 piros, 6 sárga → 2', r: 4, b: 6, k: 2 },
              { t: 'faktosok: 15 / 13 → 2', r: 15, b: 13, k: 2 },
              { t: 'könyvek: 10 próza / 4 vers → 2', r: 10, b: 4, k: 2 },
              { t: '5 fehér, 3 fekete → 3', r: 5, b: 3, k: 3 }
            ].map((ps) => (
              <button
                key={ps.t}
                onClick={() => {
                  setRed(ps.r);
                  setBlue(ps.b);
                  setK(ps.k);
                  reset();
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-sky-50 text-sky-800 hover:bg-sky-100"
              >
                {ps.t}
              </button>
            ))}
          </div>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: n alatt a k és a lottó" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">n = {bn}</label>
                <input type="range" min={1} max={40} value={bn} onChange={(e) => setBn(Number(e.target.value))} className="w-full accent-teal-600" aria-label="n értéke" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">k = {bkk}</label>
                <input type="range" min={0} max={bn} value={bkk} onChange={(e) => setBk(Number(e.target.value))} className="w-full accent-teal-600" aria-label="k értéke" />
              </div>
              <div className="bg-teal-50 rounded-xl border border-teal-200 p-4 space-y-1 text-sm">
                <div className="text-base">
                  <Binom n={bn} k={bkk} /> = {bkk === 0 ? '1 (az üres kiválasztás)' : <Frac num={numFactors.length > 6 ? `${bn} · ${bn - 1} · … · ${bn - bkk + 1}` : numFactors.join(' · ')} den={`${bkk}!`} />} = <strong>{big(binom(bn, bkk))}</strong>
                </div>
                <div>
                  szimmetria: <Binom n={bn} k={bn - bkk} /> = {big(binom(bn, bn - bkk))}
                </div>
                <div className="text-xs text-slate-600">számológépen: {bn} nCr {bkk}</div>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">ötös lottó: mind az 5 kihúzott szám nagyobb, mint t = {threshold}</label>
                <input type="range" min={0} max={85} value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} className="w-full accent-amber-600" aria-label="küszöb" />
              </div>
              <div className="bg-amber-50 rounded-xl border border-amber-200 p-4">
                p = ({90 - threshold} alatt 5) / (90 alatt 5) = {big(binom(90 - threshold, 5))} / 43 949 268 ≈ <strong>{fmt(pAbove)}</strong>
              </div>
              <TheoryTable
                headers={['Játék', 'húzás', 'P(0 találat)']}
                rows={LOTTERIES.map((l) => [l.name, `${l.N}-ből ${l.k}`, `(${l.N - l.k} alatt ${l.k}) / (${l.N} alatt ${l.k}) ≈ ${fmt(binom(l.N - l.k, l.k) / binom(l.N, l.k), 3)}`])}
              />
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SimultaneousDrawTheory;
