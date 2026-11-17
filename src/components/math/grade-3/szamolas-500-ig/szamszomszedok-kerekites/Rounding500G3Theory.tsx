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
  NeighboursLadderSvg,
  HundredLineSvg,
  TenRuleSvg,
  HundredRuleSvg,
  TwoWaysSvg,
  ExactOrNotSvg,
  ToyShopSvg
} from './Rounding500G3Figures';
import { RLine, LineMark, LineArrow, roundTen, roundHundred } from './Rounding500G3Parts';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
/** Névelő a szám elé: „az 5”, „az 500”, „a 340”. */
const art = (n: number) => (String(n)[0] === '5' || n === 1 ? 'az' : 'a');
const Art = (n: number) => (art(n) === 'az' ? 'Az' : 'A');
const opts4 = (correct: number, wrong: number[]): number[] => {
  const out = [correct];
  wrong.forEach((w) => {
    if (w >= 0 && w <= 500 && !out.includes(w) && out.length < 4) out.push(w);
  });
  let k = 1;
  while (out.length < 4) {
    const w = correct + (k % 2 ? 10 * k : -10 * k);
    if (w >= 0 && w <= 500 && !out.includes(w)) out.push(w);
    k++;
  }
  return shuffle(out);
};

// ---------------------------------------------------------------------------
// Labor I – Szomszédkereső (egyes, tízes, százas)
// ---------------------------------------------------------------------------
type FieldKey = 'ke' | 'ne' | 'kt' | 'nt' | 'ksz' | 'nsz';
const FIELD_ORDER: FieldKey[] = ['ke', 'ne', 'kt', 'nt', 'ksz', 'nsz'];
const FIELD_NAME: Record<FieldKey, string> = {
  ke: 'kisebb egyes szomszédja',
  ne: 'nagyobb egyes szomszédja',
  kt: 'kisebb tízes szomszédja',
  nt: 'nagyobb tízes szomszédja',
  ksz: 'kisebb százas szomszédja',
  nsz: 'nagyobb százas szomszédja'
};
interface NbTask { n: number; ans: Record<FieldKey, number>; opts: Record<FieldKey, number[]> }

const makeNbFor = (n: number): NbTask => {
  const roundT = n % 10 === 0;
  const roundH = n % 100 === 0;
  const f10 = Math.floor(n / 10) * 10;
  const f100 = Math.floor(n / 100) * 100;
  const ans: Record<FieldKey, number> = {
    ke: n - 1,
    ne: n + 1,
    kt: roundT ? n - 10 : f10,
    nt: roundT ? n + 10 : f10 + 10,
    ksz: roundH ? n - 100 : f100,
    nsz: roundH ? n + 100 : f100 + 100
  };
  return {
    n,
    ans,
    opts: {
      ke: opts4(ans.ke, [n + 1, n - 10, n - 2]),
      ne: opts4(ans.ne, [n - 1, n + 10, n + 2]),
      kt: opts4(ans.kt, [roundT ? n : ans.nt, ans.ksz, ans.kt - 10]),
      nt: opts4(ans.nt, [roundT ? n : ans.kt, ans.nsz, ans.nt + 10]),
      ksz: opts4(ans.ksz, [roundH ? n : ans.nsz, ans.kt, ans.ksz - 100]),
      nsz: opts4(ans.nsz, [roundH ? n : ans.ksz, ans.nt, ans.nsz + 100])
    }
  };
};
const makeNb = (): NbTask => {
  const r = Math.random();
  if (r < 0.1) return makeNbFor(rnd(2, 4) * 100);
  if (r < 0.3) {
    let v = rnd(11, 49) * 10;
    while (v % 100 === 0) v = rnd(11, 49) * 10;
    return makeNbFor(v);
  }
  let v = rnd(101, 499);
  while (v % 10 === 0) v = rnd(101, 499);
  return makeNbFor(v);
};

// ---------------------------------------------------------------------------
// Labor II – Kerekítő (tízesre / százasra)
// ---------------------------------------------------------------------------
type RMode = 'tizes' | 'szazas';
const makeRound = (mode: RMode): number => {
  const r = Math.random();
  if (mode === 'tizes') {
    if (r < 0.15) return rnd(11, 49) * 10;
    if (r < 0.35) return rnd(10, 49) * 10 + 5;
    let v = rnd(101, 499);
    while (v % 10 === 0 || v % 10 === 5) v = rnd(101, 499);
    return v;
  }
  if (r < 0.12) return rnd(1, 4) * 100;
  if (r < 0.32) return rnd(1, 4) * 100 + 50 + rnd(0, 9);
  if (r < 0.52) return rnd(1, 4) * 100 + 40 + rnd(5, 9); // csapda: 345–349
  let v = rnd(101, 499);
  while (v % 100 === 0) v = rnd(101, 499);
  return v;
};

const OptButton: React.FC<{ v: number | string; onClick: () => void; state?: 'ok' | 'bad' | null }> = ({ v, onClick, state }) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 rounded-xl text-lg font-black min-h-[52px] min-w-[72px] border-2 transition-colors ${
      state === 'ok' ? 'bg-emerald-500 border-emerald-700 text-white' : state === 'bad' ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
    }`}
  >
    {v}
  </button>
);

export const Rounding500G3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I ----
  const [nb, setNb] = useState<NbTask>(() => ({
    n: 274,
    ans: { ke: 273, ne: 275, kt: 270, nt: 280, ksz: 200, nsz: 300 },
    opts: {
      ke: [273, 275, 264, 272],
      ne: [275, 273, 284, 276],
      kt: [270, 280, 200, 260],
      nt: [280, 270, 300, 290],
      ksz: [200, 300, 270, 100],
      nsz: [300, 200, 280, 400]
    }
  }));
  const [nbStep, setNbStep] = useState<number>(0);
  const [nbBad, setNbBad] = useState<number | null>(null);
  const [nbMsg, setNbMsg] = useState<string>('');
  const newNb = () => {
    setNb(makeNb());
    setNbStep(0);
    setNbBad(null);
    setNbMsg('');
  };
  const nbField = FIELD_ORDER[nbStep];
  const pickNb = (v: number) => {
    if (nbStep >= 6) return;
    const key = nbField;
    if (v === nb.ans[key]) {
      setNbStep(nbStep + 1);
      setNbBad(null);
      setNbMsg('');
      return;
    }
    setNbBad(v);
    const n = nb.n;
    let msg = '';
    if (key === 'ke') msg = v === n + 1 ? 'Ez nagyobb a számnál! A kisebb egyes szomszéd 1-gyel kisebb.' : `Csak 1-et lépj vissza: ${n} − 1 = ?`;
    else if (key === 'ne') msg = v === n - 1 ? 'Ez kisebb a számnál! A nagyobb egyes szomszéd 1-gyel nagyobb.' : `Csak 1-et lépj előre: ${n} + 1 = ?`;
    else if (v === n) msg = `${Art(n)} ${n} maga a szám. A szomszédja nem lehet saját maga!`;
    else if (key === 'kt' || key === 'nt') {
      if (v % 100 === 0 && v !== nb.ans[key]) msg = 'Ez kerek százas. Most kerek tízest keresünk, ami a legközelebb van!';
      else msg = key === 'kt' ? (v === nb.ans.nt ? 'Ez a nagyobb tízes szomszéd. Most a kisebbet keresd!' : 'Melyik kerek tízes áll közvetlenül a szám előtt?') : v === nb.ans.kt ? 'Ez a kisebb tízes szomszéd. Most a nagyobbat keresd!' : 'Melyik kerek tízes jön közvetlenül a szám után?';
    } else if (v % 100 !== 0) msg = 'Ez nem kerek százas! A kerek százasok: 100, 200, 300, 400, 500.';
    else msg = key === 'ksz' ? (v === nb.ans.nsz ? 'Ez a nagyobb százas szomszéd. Most a kisebbet keresd!' : 'Melyik kerek százas van közvetlenül a szám előtt?') : v === nb.ans.ksz ? 'Ez a kisebb százas szomszéd. Most a nagyobbat keresd!' : 'Melyik kerek százas jön közvetlenül a szám után?';
    setNbMsg(msg);
  };
  const nbMarks: LineMark[] = [{ v: nb.n, color: '#a16207' }];
  if (nbStep > 2) nbMarks.push({ v: nb.ans.kt, label: '', color: '#1d4ed8' });
  if (nbStep > 3) nbMarks.push({ v: nb.ans.nt, label: '', color: '#1d4ed8' });
  if (nbStep > 4) nbMarks.push({ v: nb.ans.ksz, label: '', color: '#b91c1c' });
  if (nbStep > 5) nbMarks.push({ v: nb.ans.nsz, label: '', color: '#b91c1c' });
  const cells: { key: FieldKey | 'n'; label: string; value: number; color: string }[] = [
    { key: 'ksz', label: 'kisebb százas', value: nb.ans.ksz, color: 'rose' },
    { key: 'kt', label: 'kisebb tízes', value: nb.ans.kt, color: 'blue' },
    { key: 'ke', label: 'kisebb egyes', value: nb.ans.ke, color: 'emerald' },
    { key: 'n', label: 'a szám', value: nb.n, color: 'yellow' },
    { key: 'ne', label: 'nagyobb egyes', value: nb.ans.ne, color: 'emerald' },
    { key: 'nt', label: 'nagyobb tízes', value: nb.ans.nt, color: 'blue' },
    { key: 'nsz', label: 'nagyobb százas', value: nb.ans.nsz, color: 'rose' }
  ];
  const nbLabels = nb.ans.nsz - nb.ans.ksz === 100 ? [nb.ans.ksz, nb.ans.ksz + 50, nb.ans.nsz] : [nb.ans.ksz, nb.ans.ksz + 100, nb.ans.nsz];

  // ---- Labor II ----
  const [mode, setMode] = useState<RMode>('szazas');
  const [rn, setRn] = useState<number>(347);
  const [rnDone, setRnDone] = useState<boolean>(false);
  const [rnBad, setRnBad] = useState<number | null>(null);
  const [rnMsg, setRnMsg] = useState<string>('');
  const [streak, setStreak] = useState<number>(0);
  const newRn = (m: RMode = mode) => {
    let v = makeRound(m);
    while (v === rn) v = makeRound(m);
    setMode(m);
    setRn(v);
    setRnDone(false);
    setRnBad(null);
    setRnMsg('');
  };
  const unit = mode === 'tizes' ? 10 : 100;
  const fl = Math.floor(rn / unit) * unit;
  const isRound = rn % unit === 0;
  const choices = isRound ? [rn - unit, rn, rn + unit] : [fl, fl + unit];
  const rnAns = mode === 'tizes' ? roundTen(rn) : roundHundred(rn);
  const tensDigit = Math.floor((rn % 100) / 10);
  const onesDigit = rn % 10;
  const pickRn = (v: number) => {
    if (rnDone) return;
    if (v === rnAns) {
      setRnDone(true);
      setRnBad(null);
      setRnMsg('');
      setStreak((s) => s + 1);
      return;
    }
    setRnBad(v);
    setStreak(0);
    if (isRound) setRnMsg(`${Art(rn)} ${rn} kerek ${mode === 'tizes' ? 'tízes' : 'százas'}. Nem kell kerekíteni, marad, ami volt!`);
    else if (mode === 'tizes') {
      if (onesDigit === 5) setRnMsg('Az egyesek helyén 5 áll. Pont középen van. Ilyenkor mindig a nagyobb tízesre kerekítünk!');
      else setRnMsg(`Nézd az egyest! ${onesDigit} áll ott. 0, 1, 2, 3, 4 → le. 5, 6, 7, 8, 9 → fel.`);
    } else if (tensDigit === 4 && onesDigit >= 5 && v > rn) {
      setRnMsg(`Csak a tízeseket nézd! A tízesek helyén 4 áll, ezért lefelé. Ne kerekíts kétszer: ${rn} még nem érte el a ${fl + 50}-et!`);
    } else if (tensDigit === 5) setRnMsg(`A tízesek helyén 5 áll. Ilyenkor mindig a nagyobb százasra kerekítünk!`);
    else setRnMsg(`Nézd a tízest! ${tensDigit} áll ott. 0, 1, 2, 3, 4 → le. 5, 6, 7, 8, 9 → fel.`);
  };
  const lineLo = mode === 'tizes' ? (isRound ? rn - 12 : fl - 2) : isRound ? rn - 100 : fl;
  const lineHi = mode === 'tizes' ? (isRound ? rn + 12 : fl + 12) : isRound ? rn + 100 : fl + 100;
  const lineLabels = mode === 'tizes'
    ? [isRound ? rn - 10 : fl, isRound ? rn : fl + 5, isRound ? rn + 10 : fl + 10]
    : isRound ? [rn - 100, rn, rn + 100] : [fl, fl + 50, fl + 100];
  const rnArrows: LineArrow[] = rnDone && !isRound ? [{ from: rn, to: rnAns, color: '#16a34a' }] : [];

  return (
    <TheoryTemplate
      topicId="g3-count-500"
      subtopicId="szamszomszedok-kerekites"
      grade={3}
      chapterId="szamolas-500-ig"
      title="2. Számszomszédok, kerekítés"
      subtitle="Egyes, tízes és százas szomszédok, kerekítés tízesre és százasra 500-ig."
      badge="3. OSZTÁLY • V. SZÁMOLÁS 0-TÓL 500-IG • TANANYAG"
      themeColor="sky"
      pdfFilename="3_osztaly_szamszomszedok_kerekites_500_ig_tananyag.pdf"
      practiceTitle="Készen állsz? Kerekítsünk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — KEREKÍTÉS SZÁZASRA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center font-mono text-base font-black text-sky-900 dark:text-sky-200">
              226 ≈ 200 &nbsp; 250 ≈ 300 &nbsp; 400 ≈ 400
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Százasra: nézd a <strong>tízeseket</strong>! Tízesre: nézd az <strong>egyeseket</strong>!</li>
              <li>0, 1, 2, 3, 4 → <strong>le</strong>. 5, 6, 7, 8, 9 → <strong>fel</strong>.</li>
              <li>Csak <strong>egyszer</strong> kerekíts: 349 ≈ 300.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 56–57. o." badgeColor="sky">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Az egyes és a tízes szomszédokat már ismered. Most jön egy új: a <strong>százas szomszéd</strong>.</p>
          <p>Tízesre már tudsz kerekíteni. Most megtanulsz <strong>százasra</strong> is kerekíteni!</p>
        </div>
      </TheorySection>

      {/* 2. Szomszédok */}
      <TheorySection title="2. Hat szomszéd" badge="Számszomszédok" badgeColor="emerald">
        <NeighboursLadderSvg />
        <HundredLineSvg />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="Egyes szomszédok" badge="±1" badgeColor="emerald">
            <p className="text-sm text-slate-700">Egyet lépsz vissza vagy előre: <strong>367 és 369</strong>.</p>
          </TheoryCard>
          <TheoryCard title="Tízes szomszédok" badge="kerek tízesek" badgeColor="blue">
            <p className="text-sm text-slate-700">A két legközelebbi kerek tízes: <strong>360 és 370</strong>.</p>
          </TheoryCard>
          <TheoryCard title="Százas szomszédok" badge="új!" badgeColor="rose">
            <p className="text-sm text-slate-700">A két legközelebbi kerek százas: <strong>300 és 400</strong>.</p>
          </TheoryCard>
        </div>
        <TheoryTable
          headers={['Kisebb százas', 'Kisebb tízes', 'Szám', 'Nagyobb tízes', 'Nagyobb százas']}
          rows={[
            ['100', '120', '125', '130', '200'],
            ['400', '440', '446', '450', '500'],
            ['200', '280', '290', '300', '300'],
            ['200', '290', '300', '310', '400']
          ]}
        />
        <TheoryCallout type="info" title="Mi van a kerek számokkal?">
          A 300 kerek százas. A szám nem lehet a saját szomszédja! Ezért a százas szomszédai a <strong>200</strong> és a <strong>400</strong>, a tízes szomszédai a <strong>290</strong> és a <strong>310</strong>.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Kerekítés tízesre */}
      <TheorySection title="3. Kerekítés tízesre – ismétlés" badge="Nézd az egyest!" badgeColor="blue">
        <TenRuleSvg />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="Le" badge="1, 2, 3, 4" badgeColor="blue">
            <p className="text-sm text-slate-700"><strong>243 ≈ 240</strong>, 412 ≈ 410</p>
          </TheoryCard>
          <TheoryCard title="Fel" badge="5, 6, 7, 8, 9" badgeColor="orange">
            <p className="text-sm text-slate-700"><strong>247 ≈ 250</strong>, 495 ≈ 500</p>
          </TheoryCard>
          <TheoryCard title="Marad" badge="kerek tízes" badgeColor="emerald">
            <p className="text-sm text-slate-700"><strong>380 ≈ 380</strong></p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Kerekítés százasra */}
      <TheorySection title="4. Kerekítés százasra – új!" badge="Nézd a tízest!" badgeColor="rose">
        <HundredRuleSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>A szám a két százas szomszédja között van. A <strong>közelebbi</strong> lesz a kerekített érték.</p>
          <p>Hogy melyik van közelebb, azt a <strong>tízesek helyén</strong> álló jegy mutatja meg.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="Le" badge="tízes: 0–4" badgeColor="blue">
            <p className="text-sm text-slate-700"><strong>226 ≈ 200</strong>, mert a tízes 2. És 418 ≈ 400.</p>
          </TheoryCard>
          <TheoryCard title="Fel" badge="tízes: 5–9" badgeColor="orange">
            <p className="text-sm text-slate-700"><strong>281 ≈ 300</strong>, mert a tízes 8. És 250 ≈ 300: pont középen van, ilyenkor felfelé!</p>
          </TheoryCard>
          <TheoryCard title="Marad" badge="kerek százas" badgeColor="emerald">
            <p className="text-sm text-slate-700"><strong>400 ≈ 400</strong>. A kerek százast nem kell kerekíteni.</p>
          </TheoryCard>
        </div>
        <TwoWaysSvg />
      </TheorySection>

      {/* 5. Pontosan vagy körülbelül */}
      <TheorySection title="5. Pontosan vagy körülbelül?" badge="≈ jel" badgeColor="amber">
        <ExactOrNotSvg />
        <TheoryCallout type="tip" title="Mikor jó a kerekített szám?">
          Ha nem fontos a pontos szám: „Az iskolába <strong>kb. 400</strong> gyerek jár.” De a jegy árát pontosan kell tudni, mert annyit kell fizetni.
        </TheoryCallout>
      </TheorySection>

      {/* 6. Mintapéldák */}
      <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A) Kerekítsd a 374-et!" badge="Kétféleképpen" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Tízesre: az egyes 4 → le: <strong>374 ≈ 370</strong>.</li>
              <li>Százasra: a tízes 7 → fel: <strong>374 ≈ 400</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Melyik számokból lesz 300?" badge="Visszafelé" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Lentről: 250, 251, … 299.</li>
              <li>Maga a 300.</li>
              <li>Fentről: 301, 302, … 349.</li>
              <li>Tehát <strong>250-től 349-ig</strong>. Ez 100 szám!</li>
            </ul>
          </TheoryCard>
        </div>
        <ToyShopSvg />
        <TheoryCard title="C) A játékboltban" badge="Becslés" badgeColor="amber">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li>Kisautó: 289 Ft ≈ 300 Ft. Radír: 108 Ft ≈ 100 Ft.</li>
            <li>A kettő együtt kb. 300 + 100 = <strong>400 Ft</strong>.</li>
            <li>Labda: 345 Ft. Tízesre ≈ 350 Ft, százasra ≈ 300 Ft.</li>
          </ul>
        </TheoryCard>
      </TheorySection>

      {/* 7. Vigyázz */}
      <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="349 – százasra kerekítve"
          wrong="349 ≈ 350 ≈ 400"
          wrongExplanation="Ez két kerekítés egymás után. Így eltávolodtál a számtól!"
          correct="349 ≈ 300"
          correctExplanation="Csak a tízest nézd: 4 áll ott. Ezért lefelé. A 349 közelebb van a 300-hoz, mint a 400-hoz."
          tip="Egyszer kerekíts, mindig az eredeti számból!"
        />
        <TheoryCallout type="warning" title="Kicsi számok is!">
          A 98 a 0 és a 100 között van. Százasra kerekítve: <strong>98 ≈ 100</strong>.
        </TheoryCallout>
      </TheorySection>

      {/* 8. Labor I */}
      <TheorySection title="8. Labor I: Hat szomszéd" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            <button onClick={newNb} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
          </div>
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {cells.map((c) => {
              const idx = c.key === 'n' ? -1 : FIELD_ORDER.indexOf(c.key);
              const shown = c.key === 'n' || idx < nbStep;
              const active = c.key !== 'n' && idx === nbStep;
              const base =
                c.key === 'n'
                  ? 'bg-yellow-100 border-yellow-500'
                  : active
                    ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300'
                    : c.color === 'rose'
                      ? 'bg-rose-50 border-rose-200'
                      : c.color === 'blue'
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-slate-50 border-slate-200';
              return (
                <div key={c.key} className={`rounded-xl border-2 p-1 sm:p-2 text-center ${base}`}>
                  <div className="text-base sm:text-2xl font-black text-slate-800">{shown ? c.value : '?'}</div>
                  <div className="text-[9px] sm:text-xs font-bold text-slate-500 leading-tight">{c.label}</div>
                </div>
              );
            })}
          </div>
          <RLine lo={nb.ans.ksz} hi={nb.ans.nsz} tickEvery={10} bigEvery={50} labels={nbLabels} marks={nbMarks} W={340} H={84} />
          {nbStep < 6 && (
            <>
              <div className="bg-emerald-50 rounded-xl p-3 text-center text-emerald-900 font-bold">
                Melyik {art(nb.n)} {nb.n} {FIELD_NAME[nbField]}?
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {nb.opts[nbField].map((v) => (
                  <OptButton key={`${nbStep}-${v}`} v={v} onClick={() => pickNb(v)} state={nbBad === v ? 'bad' : null} />
                ))}
              </div>
            </>
          )}
          {nbMsg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{nbMsg}</div>}
          {nbStep === 6 && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Ügyes vagy! Megtaláltad mind a hat szomszédot. Kérj új feladatot!
            </div>
          )}
        </div>
      </TheorySection>

      {/* 9. Labor II */}
      <TheorySection title="9. Labor II: Kerekítő" badge="Labor" badgeColor="orange">
        <div className="bg-white border-2 border-orange-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={() => newRn(mode)} className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <button onClick={() => newRn('tizes')} className={`px-4 py-2 rounded-xl text-sm font-bold min-h-[48px] border-2 ${mode === 'tizes' ? 'bg-blue-100 border-blue-500 text-blue-900' : 'bg-white border-slate-300 text-slate-700'}`}>Tízesre</button>
            <button onClick={() => newRn('szazas')} className={`px-4 py-2 rounded-xl text-sm font-bold min-h-[48px] border-2 ${mode === 'szazas' ? 'bg-rose-100 border-rose-500 text-rose-900' : 'bg-white border-slate-300 text-slate-700'}`}>Százasra</button>
            <div className="ml-auto text-sm font-bold text-orange-800 bg-orange-50 rounded-xl px-3 py-2">Jó válaszok egymás után: {streak}</div>
          </div>
          <div className="text-center text-3xl font-black text-slate-800">
            {rn} ≈ {rnDone ? <span className="text-emerald-600">{rnAns}</span> : '?'}
          </div>
          <RLine
            lo={lineLo}
            hi={lineHi}
            tickEvery={mode === 'tizes' ? 1 : 10}
            bigEvery={mode === 'tizes' ? 10 : 50}
            labels={lineLabels}
            marks={[{ v: rn, color: '#a16207' }]}
            arrows={rnArrows}
            W={340}
            H={96}
          />
          <div className="bg-orange-50 rounded-xl p-3 text-center text-orange-900 font-bold">
            Kerekítsd {mode === 'tizes' ? 'tízesre' : 'százasra'}! Nézd {mode === 'tizes' ? 'az egyest' : 'a tízest'}!
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {choices.map((v) => (
              <OptButton key={v} v={v} onClick={() => pickRn(v)} state={rnDone && v === rnAns ? 'ok' : rnBad === v ? 'bad' : null} />
            ))}
          </div>
          {rnMsg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{rnMsg}</div>}
          {rnDone && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Szuper! {rn} ≈ {rnAns}.{streak >= 5 ? ` Már ${streak} jó válasz egymás után!` : ''} Kérj új feladatot!
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Rounding500G3Theory;
