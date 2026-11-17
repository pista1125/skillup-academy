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
  MulDiv500BoxesSvg,
  MulDiv500AnalogySvg,
  MulDiv500HundredsSvg,
  MulDiv500SharingSvg,
  MulDiv500HopsSvg,
  MulDiv500CoinGridSvg
} from './MulDiv500G3Figures';
import { FONT, RodGroups } from './MulDiv500G3Parts';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const opts = (correct: number, wrong: number[]): number[] => {
  const out = [correct];
  wrong.forEach((w) => {
    if (Number.isInteger(w) && w > 0 && w <= 500 && !out.includes(w) && out.length < 4) out.push(w);
  });
  let k = 1;
  const step = correct >= 20 ? 10 : 1;
  while (out.length < 4) {
    const w = correct + (k % 2 ? step * k : -step * k);
    if (w > 0 && w <= 500 && !out.includes(w)) out.push(w);
    k++;
  }
  return shuffle(out);
};

// ---------------------------------------------------------------------------
// Labor I – Egy kép, három művelet (műveletcsalád)
// ---------------------------------------------------------------------------
export interface FamilyTask {
  g: number; // csoportok száma
  v: number; // egy csoportban (kerek tízes)
  p: number; // szorzat
  mulOpts: number[];
  divGOpts: number[]; // p : g
  divVOpts: number[]; // p : v
}

export const makeFamilyTask = (): FamilyTask => {
  for (;;) {
    const g = rnd(2, 9);
    const v = rnd(2, 9) * 10;
    const p = g * v;
    if (p > 500 || p < 60) continue;
    return {
      g,
      v,
      p,
      mulOpts: opts(p, [p / 10, g + v, (g + 1) * v <= 500 ? (g + 1) * v : (g - 1) * v]),
      divGOpts: opts(v, [v / 10, v + 10, p - g]),
      divVOpts: opts(g, [g * 10, g + 1, g - 1])
    };
  }
};

// ---------------------------------------------------------------------------
// Labor II – Csomagolj!
// ---------------------------------------------------------------------------
export interface PackTask {
  mode: 'benn' | 'reszek';
  n: number; // kréták száma (kerek tízes)
  s: number; // bennfoglalás: egy dobozba ennyi; részekre osztás: ennyi doboz
  answer: number;
  answerOpts: number[];
}

export const makePackTask = (mode: 'benn' | 'reszek'): PackTask => {
  for (;;) {
    if (mode === 'benn') {
      const s = rnd(2, 9) * 10;
      const q = rnd(2, 9);
      const n = s * q;
      if (n > 480 || n / 10 > 48) continue;
      return { mode, n, s, answer: q, answerOpts: opts(q, [q * 10, q + 1, q - 1]) };
    }
    const k = rnd(2, 6);
    const per = rnd(2, 8) * 10;
    const n = k * per;
    if (n > 480) continue;
    return { mode, n, s: k, answer: per, answerOpts: opts(per, [per / 10, per + 10, n - k]) };
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

/** A dobozok és a még ki nem pakolt kréták (1 rúd = 10 kréta). */
const PackScene: React.FC<{ pile: number; boxes: number[] }> = ({ pile, boxes }) => {
  const bw = 52;
  const perRow = 6;
  const rows = Math.max(1, Math.ceil(boxes.length / perRow));
  const pileRows = Math.ceil(pile / 16);
  const H = 30 + pileRows * 26 + rows * 70 + 10;
  return (
    <svg viewBox={`0 0 360 ${H}`} className="w-full h-auto max-w-xl mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height={H - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="14" y="20" fontSize="12" fontWeight="bold" fill="#475569">{pile ? `Az asztalon: ${pile * 10} kréta` : 'Az asztal üres.'}</text>
      {Array.from({ length: pile }).map((_, i) => (
        <rect key={i} x={20 + (i % 16) * 20} y={28 + Math.floor(i / 16) * 26} width="12" height="22" rx="2" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.2" />
      ))}
      {boxes.length === 0 && (
        <text x="180" y={30 + pileRows * 26 + 36} textAnchor="middle" fontSize="13" fill="#94a3b8">Ide kerülnek a dobozok.</text>
      )}
      {boxes.map((c, b) => {
        const x = 14 + (b % perRow) * (bw + 6);
        const y = 30 + pileRows * 26 + Math.floor(b / perRow) * 70;
        return (
          <g key={b}>
            <rect x={x} y={y} width={bw} height="56" rx="5" fill="#fef3c7" stroke="#92400e" strokeWidth="2" />
            {Array.from({ length: c }).map((__, k) => (
              <rect key={k} x={x + 4 + (k % 5) * 9.5} y={y + 4 + Math.floor(k / 5) * 24} width="6" height="20" rx="1.5" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="0.9" />
            ))}
          </g>
        );
      })}
    </svg>
  );
};

export const MulDiv500G3Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // ---- Labor I ----
  const [fam, setFam] = useState<FamilyTask>(() => ({ g: 4, v: 70, p: 280, mulOpts: [280, 28, 74, 350], divGOpts: [70, 7, 80, 276], divVOpts: [4, 40, 5, 3] }));
  const [famStep, setFamStep] = useState<number>(0);
  const [famBad, setFamBad] = useState<number | null>(null);
  const [famMsg, setFamMsg] = useState<string>('');
  const newFam = () => {
    setFam(makeFamilyTask());
    setFamStep(0);
    setFamBad(null);
    setFamMsg('');
  };
  const famGw = (fam.v / 10) * 7.5 + 7.5;
  const famPl = Math.max(1, Math.min(fam.g, Math.floor(350 / (famGw + 6))));
  const famH = 14 + Math.ceil(fam.g / famPl) * 52 + 4;
  const famQ = [`${fam.g} · ${fam.v} = ?`, `${fam.p} : ${fam.g} = ?`, `${fam.p} : ${fam.v} = ?`];
  const famHelp = [
    `${fam.g} csoport, mindegyikben ${fam.v} (${fam.v / 10} rúd). Hány rúd van összesen?`,
    `${fam.p}-at ${fam.g} egyforma részre osztod. Mennyi jut egy csoportba?`,
    `Hányszor van meg a ${fam.p}-ban a ${fam.v}? Számold meg a csoportokat!`
  ];
  const famAns = [fam.p, fam.v, fam.g];
  const famOpts = [fam.mulOpts, fam.divGOpts, fam.divVOpts];
  const pickFam = (x: number) => {
    if (famStep > 2) return;
    if (x === famAns[famStep]) {
      setFamStep(famStep + 1);
      setFamBad(null);
      setFamMsg('');
      return;
    }
    setFamBad(x);
    if (famStep === 0) {
      if (x === fam.p / 10) setFamMsg(`Ne hagyd le a nullát! ${fam.g} · ${fam.v / 10} tízes = ${fam.p / 10} tízes, az ${fam.p}.`);
      else if (x === fam.g + fam.v) setFamMsg('Összeadtad a két számot. Itt szorozni kell!');
      else setFamMsg(`Számold meg a csoportokat! ${fam.g} van, nem több és nem kevesebb.`);
    } else if (famStep === 1) {
      if (x === fam.v / 10) setFamMsg(`Ez csak a tízesek száma. ${fam.v / 10} tízes = ${fam.v}.`);
      else setFamMsg(`Nézd meg egy csoportot: hány rúd van benne? Egy rúd 10.`);
    } else {
      if (x === fam.g * 10) setFamMsg(`Ez túl sok! Itt azt kérdezzük, hány csoport van. Az nem tízes, hanem darab.`);
      else setFamMsg(`Számold meg a csoportokat! Ellenőrzés: ? · ${fam.v} = ${fam.p}.`);
    }
  };

  // ---- Labor II ----
  const [pack, setPack] = useState<PackTask>(() => ({ mode: 'benn', n: 240, s: 40, answer: 6, answerOpts: [6, 60, 7, 5] }));
  const [boxes, setBoxes] = useState<number[]>([]);
  const [packBad, setPackBad] = useState<number | null>(null);
  const [packDone, setPackDone] = useState<boolean>(false);
  const [packMsg, setPackMsg] = useState<string>('');
  const rodsTotal = pack.n / 10;
  const packed = boxes.reduce((a, b) => a + b, 0);
  const pile = rodsTotal - packed;
  const newPack = (mode: 'benn' | 'reszek') => {
    const t = makePackTask(mode);
    setPack(t);
    setBoxes(mode === 'reszek' ? Array.from({ length: t.s }, () => 0) : []);
    setPackBad(null);
    setPackDone(false);
    setPackMsg('');
  };
  const step = () => {
    if (pile <= 0) return;
    if (pack.mode === 'benn') setBoxes([...boxes, pack.s / 10]);
    else setBoxes(boxes.map((b) => b + 1));
  };
  const pickPack = (x: number) => {
    if (packDone) return;
    if (x === pack.answer) {
      setPackDone(true);
      setPackBad(null);
      setPackMsg('');
      return;
    }
    setPackBad(x);
    if (pack.mode === 'benn') {
      setPackMsg(x === pack.answer * 10 ? 'Nem a krétákat kérdezzük, hanem a dobozokat! Számold meg őket.' : 'Számold meg a teli dobozokat!');
    } else {
      setPackMsg(x === pack.answer / 10 ? `Egy dobozban ${pack.answer / 10} rúd van. Egy rúd 10 kréta!` : 'Nézz meg egy dobozt! Hány rúd van benne? Egy rúd 10 kréta.');
    }
  };

  return (
    <TheoryTemplate
      topicId="g3-count-500"
      subtopicId="szorzas-es-osztas"
      grade={3}
      chapterId="szamolas-500-ig"
      title="4. Szorzás és osztás"
      subtitle="Szorzás 10-zel és 100-zal, kerek tízesek szorzása és osztása 500-ig, a kétféle osztás, műveletcsalád, szöveges feladatok."
      badge="3. OSZTÁLY • V. SZÁMOLÁS 0-TÓL 500-IG • TANANYAG"
      themeColor="indigo"
      pdfFilename="3_osztaly_szorzas_es_osztas_500_ig_tananyag.pdf"
      practiceTitle="Készen állsz? Számoljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — A SZORZÓTÁBLA SEGÍT',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center font-mono text-base font-black text-indigo-900 dark:text-indigo-200">
              6 · 7 = 42 → 6 · 70 = 420
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Számolj <strong>tízesekkel</strong>: 6 · 7 tízes = 42 tízes.</li>
              <li>Osztásnál is: 420 : 6 = 70, mert 42 tízes : 6 = 7 tízes.</li>
              <li>Ellenőrizz szorzással: 6 · 70 = 420.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Mit tanulunk? */}
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 61–63. o." badgeColor="indigo">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>Szorzunk 10-zel és 100-zal.</p>
          <p>Kerek tízeseket szorzunk és osztunk 500-ig.</p>
          <p>A szorzótáblát használjuk, csak tízesekkel.</p>
        </div>
      </TheorySection>

      {/* 2. Szorzás 10-zel */}
      <TheorySection title="2. Szorzás 10-zel" badge="Tízszeres" badgeColor="amber">
        <MulDiv500BoxesSvg />
        <TheoryTable
          headers={['Művelet', 'Így gondold', 'Eredmény']}
          rows={[
            ['14 · 10', '14 tízes', '140'],
            ['10 · 37', '37 tízes', '370'],
            ['a 45 tízszerese', '45 · 10 = 45 tízes', '450'],
            ['10 · 30', '30 tízes = 3 százas', '300']
          ]}
        />
        <TheoryCallout type="tip" title="Ügyes trükk">
          Ha egy számot 10-zel szorzol, a végére egy 0 kerül: 23 · 10 = 230.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Százasok */}
      <TheorySection title="3. Szorzás 100-zal" badge="Százasok" badgeColor="rose">
        <MulDiv500HundredsSvg />
        <p className="text-sm text-slate-700">1 · 100 = 100, 2 · 100 = 200, … 5 · 100 = <strong>500</strong>. És 50 · 10 is 500!</p>
      </TheorySection>

      {/* 4. Kerek tízesek */}
      <TheorySection title="4. A szorzótábla segít" badge="Tízesekkel" badgeColor="sky">
        <MulDiv500AnalogySvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Szorzás" badge="8 · 50" badgeColor="emerald">
            <p className="text-sm text-slate-700">8 · 5 = 40, tehát 8 · 5 tízes = 40 tízes. <strong>8 · 50 = 400</strong>. És 50 · 8 is 400.</p>
          </TheoryCard>
          <TheoryCard title="Osztás" badge="360 : 9" badgeColor="orange">
            <p className="text-sm text-slate-700">36 : 9 = 4, tehát 36 tízes : 9 = 4 tízes. <strong>360 : 9 = 40</strong>.</p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Kétféle osztás */}
      <TheorySection title="5. Kétféle osztás" badge="Részekre, bennfoglalás" badgeColor="teal">
        <MulDiv500SharingSvg />
        <TheoryCard title="Részekre osztás" badge="280 : 4 = 70" badgeColor="emerald">
          <p className="text-sm text-slate-700">A 280-at 4 egyforma részre osztod. Egy részbe <strong>70</strong> jut. Kérdés: „Mennyi jut egyre?”</p>
        </TheoryCard>
        <MulDiv500HopsSvg />
        <TheoryCard title="Bennfoglalás" badge="280 : 40 = 7" badgeColor="purple">
          <p className="text-sm text-slate-700">40-esével ugrálsz a 280-ig. <strong>7</strong> ugrás kell. Kérdés: „Hányszor van meg?”, „Hány doboz kell?”</p>
        </TheoryCard>
      </TheorySection>

      {/* 6. Műveletcsalád */}
      <TheorySection title="6. Egy kép, négy művelet" badge="Műveletcsalád" badgeColor="purple">
        <MulDiv500CoinGridSvg />
        <p className="text-sm text-slate-700">4 sor van, egy sorban 60 Ft. 6 oszlop van, egy oszlopban 40 Ft. Mindegyik 240 Ft.</p>
        <TheoryCallout type="info" title="Mire jó ez?">
          Ha tudod, hogy 4 · 60 = 240, akkor azt is tudod, hogy 240 : 4 = 60 és 240 : 60 = 4.
        </TheoryCallout>
      </TheorySection>

      {/* 7. Nézzük meg együtt */}
      <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="indigo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A) Háromszor annyi" badge="Szorzás" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A tanyán 70 tyúk van. Liba háromszor annyi.</li>
              <li>Libák: 3 · 70 = 210.</li>
              <li>Összesen: 70 + 210 = <strong>280 szárnyas</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Hány doboz kell?" badge="Bennfoglalás" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Van 360 tojás. Egy dobozba 40 fér.</li>
              <li>360 : 40 = ? Gondold: 36 : 4 = 9.</li>
              <li><strong>9 doboz kell.</strong> Ellenőrzés: 9 · 40 = 360.</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryCard title="C) Előbb a szorzás!" badge="Műveleti sorrend" badgeColor="amber">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
            <li>120 + 4 · 50 = ?</li>
            <li>Előbb szorzunk: 4 · 50 = 200.</li>
            <li>Aztán összeadunk: 120 + 200 = <strong>320</strong>.</li>
          </ul>
        </TheoryCard>
      </TheorySection>

      {/* 8. Vigyázz */}
      <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Elveszett nulla"
          wrong="6 · 70 = 42"
          wrongExplanation="6 · 7 = 42, de itt 7 tízest szorzunk! 42 tízes lesz."
          correct="6 · 70 = 420"
          correctExplanation="6 · 7 tízes = 42 tízes = 420."
          tip="Becsüld meg! 6 · 70 biztosan több, mint 6 · 10 = 60."
        />
        <TheoryTrapBox
          title="320 : 4 és 320 : 40 nem ugyanaz!"
          wrong="320 : 40 = 80"
          wrongExplanation="A 80 a 320 : 4 eredménye. A 40 tízszer akkora, ezért kevesebbszer van meg."
          correct="320 : 40 = 8"
          correctExplanation="40-esével 8 ugrás a 320-ig. Ellenőrzés: 8 · 40 = 320."
        />
      </TheorySection>

      {/* 9. Labor I */}
      <TheorySection title="9. Labor I: Egy kép, három művelet" badge="Labor" badgeColor="teal">
        <div className="bg-white border-2 border-teal-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <button onClick={newFam} className="px-4 py-2 rounded-xl bg-teal-600 text-white text-sm font-bold min-h-[48px]">Új feladat</button>
            <div className="text-sm font-bold text-teal-900 bg-teal-50 rounded-xl px-3 py-2">Egy kék rúd = 10</div>
          </div>
          <svg viewBox={`0 0 360 ${famH}`} className="w-full h-auto max-w-xl mx-auto" xmlns="http://www.w3.org/2000/svg">
            <RodGroups groups={fam.g} per={fam.v / 10} x0={8} width={344} y={14} rodH={38} />
          </svg>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center">
            {famQ.map((q, i) => (
              <div key={i} className={`rounded-xl p-2 text-lg font-black ${famStep > i ? 'bg-emerald-100 text-emerald-800' : famStep === i ? 'bg-teal-50 text-teal-900 ring-2 ring-teal-300' : 'bg-slate-50 text-slate-400'}`}>
                {famStep > i ? q.replace('?', String(famAns[i])) : q}
              </div>
            ))}
          </div>
          {famStep < 3 && (
            <>
              <div className="text-center text-sm text-slate-700">{famHelp[famStep]}</div>
              <div className="flex flex-wrap gap-2 justify-center">
                {famOpts[famStep].map((x) => (
                  <OptButton key={`${famStep}-${x}`} v={x} onClick={() => pickFam(x)} state={famBad === x ? 'bad' : null} />
                ))}
              </div>
            </>
          )}
          {famMsg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{famMsg}</div>}
          {famStep === 3 && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Szuper! Egy képből három művelet: {fam.g} · {fam.v} = {fam.p}, {fam.p} : {fam.g} = {fam.v}, {fam.p} : {fam.v} = {fam.g}.
            </div>
          )}
        </div>
      </TheorySection>

      {/* 10. Labor II */}
      <TheorySection title="10. Labor II: Csomagolj!" badge="Labor" badgeColor="amber">
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => newPack('benn')} className="px-4 py-2 rounded-xl bg-purple-600 text-white text-sm font-bold min-h-[48px]">Hány doboz kell?</button>
            <button onClick={() => newPack('reszek')} className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold min-h-[48px]">Mennyi jut egy dobozba?</button>
          </div>
          <div className="text-center text-base font-black text-amber-900 bg-amber-50 rounded-xl px-3 py-2">
            {pack.mode === 'benn'
              ? `${pack.n} kréta van. Egy dobozba ${pack.s} kréta kerül.`
              : `${pack.n} krétát ${pack.s} dobozba osztunk szét, egyformán.`}
          </div>
          <PackScene pile={pile} boxes={boxes} />
          {pile > 0 && (
            <div className="flex justify-center">
              <button onClick={step} className="px-5 py-3 rounded-xl bg-amber-500 text-white text-base font-black min-h-[52px]">
                {pack.mode === 'benn' ? 'Tölts meg egy dobozt!' : 'Tegyél minden dobozba egy rudat!'}
              </button>
            </div>
          )}
          {pile === 0 && (
            <>
              <div className="text-center text-xl font-black text-slate-800">
                {pack.n} : {pack.s} = {packDone ? <span className="text-emerald-600">{pack.answer}</span> : '?'}
              </div>
              {!packDone && (
                <>
                  <div className="text-center text-sm text-slate-700">{pack.mode === 'benn' ? 'Hány doboz telt meg?' : 'Hány kréta jutott egy dobozba?'}</div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {pack.answerOpts.map((x) => (
                      <OptButton key={x} v={x} onClick={() => pickPack(x)} state={packBad === x ? 'bad' : null} />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
          {packMsg && <div className="rounded-xl p-3 text-center text-sm font-bold bg-rose-100 text-rose-800">{packMsg}</div>}
          {packDone && (
            <div className="rounded-xl p-3 text-center text-sm font-bold bg-emerald-100 text-emerald-800">
              Ügyes vagy! {pack.n} : {pack.s} = {pack.answer}. Ellenőrzés: {pack.mode === 'benn' ? `${pack.answer} · ${pack.s}` : `${pack.s} · ${pack.answer}`} = {pack.n}.
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default MulDiv500G3Theory;
