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
  Count500BlocksSvg,
  Count500NumberLineSvg,
  Count500RoundingSvg,
  Count500AddSubSvg,
  Count500MulDivSvg,
  Count500MoneySvg
} from './Count500ExamG3Figures';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
/** 4 különböző egész szám 0 és 500 között; a helyes benne van. */
const opts = (correct: number, wrong: number[], step = 10): number[] => {
  const out = [correct];
  wrong.forEach((w) => {
    if (Number.isInteger(w) && w >= 0 && w <= 500 && !out.includes(w) && out.length < 4) out.push(w);
  });
  let k = 1;
  while (out.length < 4) {
    const w = correct + (k % 2 ? step * Math.ceil(k / 2) : -step * Math.ceil(k / 2));
    if (w >= 0 && w <= 500 && !out.includes(w)) out.push(w);
    k++;
  }
  return shuffle(out);
};

// ---------------------------------------------------------------------------
// Számok betűvel (0–500)
// ---------------------------------------------------------------------------
const ONES = ['', 'egy', 'kettő', 'három', 'négy', 'öt', 'hat', 'hét', 'nyolc', 'kilenc'];
const TENS = ['', 'tíz', 'húsz', 'harminc', 'negyven', 'ötven', 'hatvan', 'hetven', 'nyolcvan', 'kilencven'];
const TENS_PRE = ['', 'tizen', 'huszon', 'harminc', 'negyven', 'ötven', 'hatvan', 'hetven', 'nyolcvan', 'kilencven'];
const HUNDREDS = ['', 'száz', 'kétszáz', 'háromszáz', 'négyszáz', 'ötszáz'];
export const numberWord = (n: number): string => {
  if (n === 0) return 'nulla';
  const h = Math.floor(n / 100);
  const t = Math.floor((n % 100) / 10);
  const e = n % 10;
  return HUNDREDS[h] + (e ? TENS_PRE[t] : TENS[t]) + ONES[e];
};
export const roundTen = (n: number) => Math.floor((n + 5) / 10) * 10;
export const roundHundred = (n: number) => Math.floor((n + 50) / 100) * 100;

// ---------------------------------------------------------------------------
// Labor I – Vegyes feladatok
// ---------------------------------------------------------------------------
export type Count500TaskKind = 'szam' | 'szomszed' | 'kerekites' | 'osszeadas' | 'kivonas' | 'szorzas' | 'osztas' | 'sorrend';
export interface Count500Task {
  kind: Count500TaskKind;
  text: string;
  answer: number;
  options: number[];
  hints: Record<number, string>;
  hint: string;
}

const makeTaskRaw = (kind: Count500TaskKind): Count500Task => {
  for (;;) {
    if (kind === 'szam') {
      const n = rnd(101, 499);
      const h = Math.floor(n / 100);
      const t = Math.floor((n % 100) / 10);
      const e = n % 10;
      if (t === e) continue;
      const swap = h * 100 + e * 10 + t;
      const noTen = h * 100 + e;
      const hints: Record<number, string> = { [swap]: 'Felcserélted a tízeseket és az egyeseket.' };
      if (noTen !== n) hints[noTen] = 'Hová lett a tízes? Nézd meg még egyszer a szót!';
      return { kind, text: `Írd számjeggyel: ${numberWord(n)}`, answer: n, options: opts(n, [swap, noTen, n + 100 <= 500 ? n + 100 : n - 100], 1), hints, hint: 'Bontsd részekre: hány százas, hány tízes, hány egyes?' };
    }
    if (kind === 'szomszed') {
      const n = rnd(101, 499);
      if (n % 10 === 0) continue;
      const hundred = Math.random() < 0.5;
      const bigger = Math.random() < 0.5;
      const lo = hundred ? Math.floor(n / 100) * 100 : Math.floor(n / 10) * 10;
      const hi = lo + (hundred ? 100 : 10);
      const ans = bigger ? hi : lo;
      const other = bigger ? lo : hi;
      const egyes = bigger ? n + 1 : n - 1;
      const wrongKind = hundred ? (bigger ? Math.floor(n / 10) * 10 + 10 : Math.floor(n / 10) * 10) : bigger ? Math.floor(n / 100) * 100 + 100 : Math.floor(n / 100) * 100;
      if (ans > 500) continue;
      return {
        kind,
        text: `Mi a ${n} ${bigger ? 'nagyobb' : 'kisebb'} ${hundred ? 'százas' : 'tízes'} szomszédja?`,
        answer: ans,
        options: opts(ans, [other, egyes, wrongKind]),
        hints: { [other]: `Ez a ${bigger ? 'kisebb' : 'nagyobb'} szomszéd. A ${bigger ? 'nagyobbat' : 'kisebbet'} keressük!`, [egyes]: `Ez egyes szomszéd. Most ${hundred ? 'kerek százast' : 'kerek tízest'} keresünk!`, [wrongKind]: hundred ? 'Ez kerek tízes. Most kerek százas kell!' : 'Ez kerek százas. Most kerek tízes kell!' },
        hint: `A ${n} két ${hundred ? 'kerek százas' : 'kerek tízes'} között van: ${lo} és ${hi}.`
      };
    }
    if (kind === 'kerekites') {
      const n = rnd(101, 499);
      const hundred = Math.random() < 0.5;
      const ans = hundred ? roundHundred(n) : roundTen(n);
      const twice = roundHundred(roundTen(n));
      const otherWay = hundred ? (ans > n ? ans - 100 : ans + 100) : ans > n ? ans - 10 : ans + 10;
      const hints: Record<number, string> = { [otherWay]: hundred ? `Nézd a tízesek jegyét: ${Math.floor((n % 100) / 10)}. ${Math.floor((n % 100) / 10) >= 5 ? 'Ez legalább 5, felfelé kerekítünk.' : 'Ez kisebb, mint 5, lefelé kerekítünk.'}` : `Nézd az egyesek jegyét: ${n % 10}. ${n % 10 >= 5 ? 'Ez legalább 5, felfelé kerekítünk.' : 'Ez kisebb, mint 5, lefelé kerekítünk.'}` };
      if (hundred && twice !== ans) hints[twice] = 'Kétszer kerekítettél! Százasra csak a tízesek jegyét nézd.';
      if (hundred) hints[roundTen(n)] = 'Ez tízesre kerekítve. Most százasra kell!';
      return {
        kind,
        text: `Kerekítsd ${hundred ? 'százasra' : 'tízesre'}: ${n} ≈ ?`,
        answer: ans,
        options: opts(ans, hundred ? [otherWay, twice, roundTen(n)] : [otherWay, roundHundred(n), n - (n % 10)]),
        hints,
        hint: hundred ? 'Százasra: nézd a tízest! 5-től felfelé.' : 'Tízesre: nézd az egyest! 5-től felfelé.'
      };
    }
    if (kind === 'osszeadas') {
      const a = rnd(11, 39) * 10;
      const b = rnd(3, 25) * 10;
      const s = a + b;
      if (s > 500) continue;
      const cross = Math.floor(a / 100) + Math.floor(b / 100) !== Math.floor(s / 100);
      const hints: Record<number, string> = {};
      if (cross) hints[s - 100] = 'Átléptél egy kerek százast! A 10 tízes egy új százas.';
      return { kind, text: `${a} + ${b} = ?`, answer: s, options: opts(s, [cross ? s - 100 : s + 100, s + 10, s - 10]), hints, hint: b >= 100 ? `Bontsd szét: előbb ${a} + ${b - (b % 100)}, aztán + ${b % 100}.` : 'Ugorj előbb a következő kerek százasig, aztán add hozzá a maradékot!' };
    }
    if (kind === 'kivonas') {
      const a = rnd(15, 50) * 10;
      const b = rnd(3, Math.min(29, a / 10 - 2)) * 10;
      const d = a - b;
      const cross = Math.floor(a / 100) - Math.floor(b / 100) !== Math.floor(d / 100);
      const hints: Record<number, string> = {};
      if (cross) hints[d + 100] = 'Átléptél egy kerek százast! Lépj vissza előbb a kerek százasig.';
      hints[a + b <= 500 ? a + b : d + 20] = a + b <= 500 ? 'Ez összeadás lett! Itt kivonunk.' : 'Számolj tízesekkel!';
      return { kind, text: `${a} − ${b} = ?`, answer: d, options: opts(d, [cross ? d + 100 : d - 100, a + b, d + 10]), hints, hint: `Ellenőrizz összeadással: ? + ${b} = ${a}.` };
    }
    if (kind === 'szorzas') {
      const k = rnd(2, 9);
      const v = rnd(2, 9) * 10;
      const p = k * v;
      if (p > 500) continue;
      return {
        kind,
        text: `${k} · ${v} = ?`,
        answer: p,
        options: opts(p, [p / 10, k + v, p + v <= 500 ? p + v : p - v]),
        hints: { [p / 10]: `Ne hagyd le a nullát! ${k} · ${v / 10} tízes = ${p / 10} tízes.`, [k + v]: 'Összeadtad a két számot. Itt szorozni kell!' },
        hint: `A szorzótábla segít: ${k} · ${v / 10} = ${p / 10}.`
      };
    }
    if (kind === 'osztas') {
      const k = rnd(2, 9);
      const v = rnd(2, 9) * 10;
      const p = k * v;
      if (p > 500 || k * 10 === v) continue;
      const byTen = Math.random() < 0.5;
      const ans = byTen ? k : v;
      const div = byTen ? v : k;
      const wrongs = byTen ? [k * 10, k + 1, k - 1] : [v / 10, v + 10, v - 10];
      return {
        kind,
        text: `${p} : ${div} = ?`,
        answer: ans,
        options: opts(ans, wrongs, byTen ? 1 : 10),
        hints: byTen ? { [k * 10]: `Ez túl sok! Ellenőrizz: ${k * 10} · ${v} sokkal több, mint ${p}.` } : { [v / 10]: `Ez csak ${v / 10}. De ${p / 10} tízes : ${k} = ${v / 10} tízes!` },
        hint: `Ellenőrizz szorzással: ? · ${div} = ${p}.`
      };
    }
    // sorrend
    const a = rnd(1, 20) * 10;
    const k = rnd(2, 9);
    const v = rnd(2, 9) * 10;
    const res = a + k * v;
    if (res > 500) continue;
    const wrongOrder = (a + k) * v;
    const hints: Record<number, string> = { [k * v]: `Ez csak a szorzás: ${k} · ${v}. Még hozzá kell adni a ${a}-at!` };
    if (wrongOrder <= 500) hints[wrongOrder] = 'Balról jobbra számoltál. Előbb a szorzás jön!';
    return { kind, text: `${a} + ${k} · ${v} = ?`, answer: res, options: opts(res, [wrongOrder, k * v, res + 10]), hints, hint: 'Előbb szorzunk, aztán összeadunk.' };
  }
};

/** Véletlen feladat; a helyes válaszhoz soha nem tartozik hibaüzenet. */
export const makeCount500Task = (kind: Count500TaskKind): Count500Task => {
  const t = makeTaskRaw(kind);
  delete t.hints[t.answer];
  return t;
};

// ---------------------------------------------------------------------------
// Labor II – Sorozat-gép
// ---------------------------------------------------------------------------
export interface ChainTask {
  values: number[]; // 6 szám
  ops: string[]; // 5 művelet
  given: number; // ennyi szám látszik az elején
  options: number[][]; // a hiányzó helyekre
}

const applyOp = (x: number, op: string) => {
  const n = Number(op.slice(op.indexOf(' ') + 1));
  if (op.startsWith('+')) return x + n;
  if (op.startsWith('−')) return x - n;
  if (op.startsWith('·')) return x * n;
  return x / n;
};

export const makeChainTask = (): ChainTask => {
  for (;;) {
    const type = rnd(0, 2);
    let start: number;
    let ops: string[];
    if (type === 0) {
      const step = [20, 30, 40, 50, 60, 70, 80][rnd(0, 6)];
      const up = Math.random() < 0.5;
      start = up ? rnd(0, 10) * 10 : rnd(30, 50) * 10;
      ops = Array.from({ length: 5 }, () => `${up ? '+' : '−'} ${step}`);
    } else if (type === 1) {
      const add = rnd(1, 5) * 10;
      const m = rnd(2, 3);
      start = rnd(1, 4) * 10;
      ops = [`+ ${add}`, `· ${m}`, `+ ${add}`, `· ${m}`, `+ ${add}`];
    } else {
      const d = [2, 4, 5][rnd(0, 2)];
      const add = rnd(5, 15) * 10;
      start = rnd(2, 5) * 100;
      ops = [`: ${d}`, `+ ${add}`, `: ${d}`, `+ ${add}`, `: ${d}`];
    }
    const values = [start];
    let ok = true;
    ops.forEach((op) => {
      const nx = applyOp(values[values.length - 1], op);
      if (!Number.isInteger(nx) || nx < 0 || nx > 500) ok = false;
      values.push(nx);
    });
    if (!ok) continue;
    if (new Set(values).size < 6) continue;
    const given = 3;
    const options = values.slice(given).map((v, i) => {
      const prev = values[given + i - 1];
      const n = Number(ops[given + i - 1].slice(2));
      return opts(v, [prev, v + 10, v - 10, prev + n], v < 20 ? 1 : 10);
    });
    return { values, ops, given, options };
  }
};

const OptButton: React.FC<{ v: number | string; onClick: () => void; state?: 'ok' | 'bad' | null }> = ({ v, onClick, state }) => (
  <button
    onClick={onClick}
    className={`px-4 py-3 rounded-xl text-lg font-black min-h-[52px] min-w-[64px] border-2 transition-colors ${
      state === 'ok' ? 'bg-emerald-500 border-emerald-700 text-white' : state === 'bad' ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
    }`}
  >
    {v}
  </button>
);

const KIND_LABELS: { k: Count500TaskKind; label: string }[] = [
  { k: 'szam', label: 'Számírás' },
  { k: 'szomszed', label: 'Szomszédok' },
  { k: 'kerekites', label: 'Kerekítés' },
  { k: 'osszeadas', label: 'Összeadás' },
  { k: 'kivonas', label: 'Kivonás' },
  { k: 'szorzas', label: 'Szorzás' },
  { k: 'osztas', label: 'Osztás' },
  { k: 'sorrend', label: 'Sorrend' }
];

export const Count500ExamG3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I ----
  const [task, setTask] = useState<Count500Task>(() => ({
    kind: 'osszeadas',
    text: '280 + 70 = ?',
    answer: 350,
    options: [250, 350, 360, 340],
    hints: { 250: 'Átléptél egy kerek százast! A 10 tízes egy új százas.' },
    hint: 'Ugorj előbb a következő kerek százasig, aztán add hozzá a maradékot!'
  }));
  const [tBad, setTBad] = useState<number | null>(null);
  const [tOk, setTOk] = useState<boolean>(false);
  const [tMsg, setTMsg] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const newTask = (k?: Count500TaskKind) => {
    const kind = k ?? KIND_LABELS[rnd(0, KIND_LABELS.length - 1)].k;
    setTask(makeCount500Task(kind));
    setTBad(null);
    setTOk(false);
    setTMsg('');
  };
  const pickTask = (v: number) => {
    if (tOk) return;
    if (v === task.answer) {
      setTOk(true);
      setTBad(null);
      setTMsg('');
      setScore(score + 1);
      return;
    }
    setTBad(v);
    setTMsg(task.hints[v] ?? task.hint);
  };

  // ---- Labor II ----
  const [chain, setChain] = useState<ChainTask>(() => ({
    values: [380, 290, 210, 140, 80, 30],
    ops: ['− 90', '− 80', '− 70', '− 60', '− 50'],
    given: 3,
    options: [
      [140, 150, 130, 210],
      [80, 90, 70, 140],
      [30, 40, 20, 80]
    ]
  }));
  const [cStep, setCStep] = useState<number>(0);
  const [cBad, setCBad] = useState<number | null>(null);
  const [cMsg, setCMsg] = useState<string>('');
  const newChain = () => {
    setChain(makeChainTask());
    setCStep(0);
    setCBad(null);
    setCMsg('');
  };
  const cIdx = chain.given + cStep;
  const pickChain = (v: number) => {
    if (cIdx >= chain.values.length) return;
    if (v === chain.values[cIdx]) {
      setCStep(cStep + 1);
      setCBad(null);
      setCMsg('');
      return;
    }
    setCBad(v);
    const prev = chain.values[cIdx - 1];
    setCMsg(v === prev ? `Ez az előző szám. Még el kell végezni: ${prev} ${chain.ops[cIdx - 1]}.` : `Nézd a nyíl fölötti műveletet: ${prev} ${chain.ops[cIdx - 1]} = ?`);
  };

  return (
    <TheoryTemplate
      topicId="g3-count-500"
      subtopicId="megallo"
      grade={3}
      chapterId="szamolas-500-ig"
      title="5. Megálló – tudáspróba"
      subtitle="Az egész fejezet ismétlése: számok 500-ig, szomszédok, kerekítés, összeadás, kivonás, szorzás, osztás, pénz."
      badge="3. OSZTÁLY • V. SZÁMOLÁS 0-TÓL 500-IG • TANANYAG"
      themeColor="emerald"
      pdfFilename="3_osztaly_szamolas_500_ig_megallo_tananyag.pdf"
      practiceTitle="Jöhet a tudáspróba?"
      practiceSubtitle="90 feladat vár rád 3 szinten!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'AMIT MÁR TUDSZ',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center font-mono text-base font-black text-emerald-900 dark:text-emerald-200">
              374 ≈ 370 (tízesre) · 374 ≈ 400 (százasra)
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Tízesre: nézd az <strong>egyest</strong>. Százasra: nézd a <strong>tízest</strong>.</li>
              <li>Átlépésnél ugorj a <strong>kerek százasig</strong>.</li>
              <li>Szorzásnál a <strong>szorzótábla</strong> segít: 7 · 60 = 420.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Amit már tudsz */}
      <TheorySection title="1. Amit már tudsz" badge="Tankönyv 52–67. o." badgeColor="emerald">
        <TheoryTable
          headers={['Lecke', 'Mit tanultunk?', 'Példa']}
          rows={[
            ['1. Számok 500-ig', 'százas, tízes, egyes; helyiérték', '247 = 200 + 40 + 7'],
            ['2. Szomszédok, kerekítés', 'egyes, tízes, százas szomszéd', '374 ≈ 370, 374 ≈ 400'],
            ['3. Összeadás, kivonás', 'kerek tízesekkel, átlépés', '280 + 70 = 350'],
            ['4. Szorzás, osztás', 'szorzótábla tízesekkel', '7 · 60 = 420, 420 : 7 = 60'],
            ['5. Megálló', 'minden együtt', 'pénz, sorozat, szöveges feladat']
          ]}
        />
      </TheorySection>

      {/* 2. Számok */}
      <TheorySection title="2. Számok 500-ig" badge="Helyiérték" badgeColor="sky">
        <Count500BlocksSvg />
        <Count500NumberLineSvg />
        <p className="text-sm text-slate-700">Minden számnak helye van a számegyenesen. A 380 a 300 és a 400 között van, közelebb a 400-hoz.</p>
      </TheorySection>

      {/* 3. Kerekítés */}
      <TheorySection title="3. Szomszédok és kerekítés" badge="≈" badgeColor="amber">
        <Count500RoundingSvg />
        <TheoryTable
          headers={['Szám', 'Tízes szomszédai', 'Százas szomszédai', '≈ tízesre', '≈ százasra']}
          rows={[
            ['374', '370 és 380', '300 és 400', '370', '400'],
            ['250', '240 és 260', '200 és 300', '250', '300'],
            ['415', '410 és 420', '400 és 500', '420', '400']
          ]}
        />
      </TheorySection>

      {/* 4. Műveletek */}
      <TheorySection title="4. A négy alapművelet" badge="+ − · :" badgeColor="purple">
        <Count500AddSubSvg />
        <p className="text-sm text-slate-700">270 + 160: előbb +100 (370), aztán +60 (430).</p>
        <Count500MulDivSvg />
        <Count500MoneySvg />
      </TheorySection>

      {/* 5. Nézzük meg együtt */}
      <TheorySection title="5. Nézzük meg együtt!" badge="Vegyes feladatok" badgeColor="indigo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A) Gondoltam egy számot" badge="Számok" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>3 százas, 12 tízes, 5 egyes.</li>
              <li>12 tízes = 1 százas és 2 tízes.</li>
              <li><strong>A szám: 425.</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Mennyi maradt?" badge="Kivonás" badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Van 500 Ft-od. Veszel egy 260 Ft-os és egy 90 Ft-os dolgot.</li>
              <li>Együtt: 260 + 90 = 350 Ft.</li>
              <li><strong>Marad: 500 − 350 = 150 Ft.</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Hány doboz?" badge="Osztás" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>450 golyót teszünk dobozokba, 50-esével.</li>
              <li>450 : 50 = 9, mert 9 · 50 = 450.</li>
              <li><strong>9 doboz kell.</strong></li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Sorozat" badge="Szabály" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>20 → +10 → 30 → · 3 → 90 → +10 → 100 → · 3 → ?</li>
              <li>100 · 3 = 300.</li>
              <li><strong>A következő szám: 300.</strong></li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Vigyázz */}
      <TheorySection title="6. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Kétszeri kerekítés"
          wrong="349 ≈ 350 ≈ 400"
          wrongExplanation="Előbb tízesre, aztán százasra kerekítettél. Így rossz lesz!"
          correct="349 ≈ 300"
          correctExplanation="Százasra csak a tízesek jegyét nézd: 4. Ez kisebb, mint 5, lefelé."
        />
        <TheoryTrapBox
          title="A 0 helye"
          wrong="négyszázhat = 46"
          wrongExplanation="Hiányzik a tízesek helye! A tízes helyére 0 kell."
          correct="négyszázhat = 406"
          correctExplanation="4 százas, 0 tízes, 6 egyes."
        />
        <TheoryCallout type="warning" title="Előbb a szorzás!">
          120 + 4 · 50 = 120 + 200 = 320. Ha balról jobbra számolsz, rossz lesz.
        </TheoryCallout>
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Labor I: Vegyes feladatok" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <button onClick={() => newTask()} className="px-4 py-2 rounded-xl bg-teal-600 text-white text-sm font-bold min-h-[48px]">Új feladat (vegyes)</button>
            <div className="text-sm font-bold text-teal-900 bg-teal-50 rounded-xl px-3 py-2">Jó válasz: {score}</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {KIND_LABELS.map((x) => (
              <button
                key={x.k}
                onClick={() => newTask(x.k)}
                className={`px-3 py-2 rounded-xl text-xs font-bold min-h-[44px] border-2 ${task.kind === x.k ? 'bg-teal-100 border-teal-500 text-teal-900' : 'bg-white border-slate-200 text-slate-700'}`}
              >
                {x.label}
              </button>
            ))}
          </div>
          <div className="text-center text-2xl sm:text-3xl font-black text-slate-800">{task.text}</div>
          <div className="flex flex-wrap gap-2 justify-center">
            {task.options.map((v) => (
              <OptButton key={v} v={v} onClick={() => pickTask(v)} state={tOk && v === task.answer ? 'ok' : tBad === v ? 'bad' : null} />
            ))}
          </div>
          {tMsg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{tMsg}</div>}
          {tOk && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Ügyes vagy! A helyes válasz: {task.answer}. Kérj új feladatot!
            </div>
          )}
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Labor II: Sorozat-gép" badge="Labor" badgeColor="amber">
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <button onClick={newChain} className="px-4 py-2 rounded-xl bg-amber-500 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="text-sm font-bold text-amber-900 bg-amber-50 rounded-xl px-3 py-2">Kövesd a nyilakat!</div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1">
            {chain.values.map((v, i) => {
              const shown = i < chain.given + cStep;
              const current = i === cIdx;
              return (
                <React.Fragment key={i}>
                  <div
                    className={`min-w-[56px] px-2 py-3 rounded-xl text-center text-lg font-black border-2 ${
                      shown ? (i < chain.given ? 'bg-indigo-50 border-indigo-300 text-indigo-900' : 'bg-emerald-50 border-emerald-400 text-emerald-800') : current ? 'bg-amber-50 border-amber-400 text-amber-700 ring-2 ring-amber-300' : 'bg-slate-50 border-slate-200 text-slate-300'
                    }`}
                  >
                    {shown ? v : '?'}
                  </div>
                  {i < chain.ops.length && (
                    <div className="flex flex-col items-center px-1">
                      <span className="text-xs font-black text-purple-700">{chain.ops[i]}</span>
                      <span className="text-slate-400 font-black">→</span>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
          {cIdx < chain.values.length ? (
            <>
              <div className="text-center text-sm text-slate-700">
                {chain.values[cIdx - 1]} {chain.ops[cIdx - 1]} = ?
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {chain.options[cStep].map((v) => (
                  <OptButton key={`${cStep}-${v}`} v={v} onClick={() => pickChain(v)} state={cBad === v ? 'bad' : null} />
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">Szuper! Végig követted a szabályt. Kérj új sorozatot!</div>
          )}
          {cMsg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{cMsg}</div>}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Count500ExamG3Theory;
