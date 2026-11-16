import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { ChapterMapSvg, BuffetPriceSvg, ForestTrainSvg, OrchardSvg, ErrorHuntSvg, ArrowCycleSvg, ERROR_HUNT } from './WrittenMultExamFigures';
import { WrittenMul2Layout } from '../irasbeli-szorzas/WrittenMulTwoDigitFigures';

export const round10 = (n: number) => Math.floor((n + 5) / 10) * 10;

export interface ExamTask {
  kind: string;
  text: string;
  answer: number;
  options: number[];
  explain: string;
}

/** Egyszerű, determinisztikus álvéletlen-generátor (ugyanaz a mag → ugyanaz a feladat). */
const rng = (seed: number) => {
  let s = (seed * 9301 + 49297) % 233280;
  return (min: number, max: number) => {
    s = (s * 9301 + 49297) % 233280;
    return min + Math.floor((s / 233280) * (max - min + 1));
  };
};

const uniqueOptions = (answer: number, wrongs: number[]): number[] => {
  const set = new Set<number>([answer]);
  wrongs.forEach((w) => {
    if (w > 0 && !set.has(w) && set.size < 4) set.add(w);
  });
  let k = 1;
  while (set.size < 4) {
    const w = answer + k * 10;
    if (!set.has(w)) set.add(w);
    k++;
  }
  return Array.from(set).sort((x, y) => ((x * 7) % 13) - ((y * 7) % 13));
};

/**
 * Vegyes feladat a fejezet anyagából: kerek tízes, írásbeli szorzás, becslés, következtetés.
 * Minden szorzat legfeljebb 9999.
 */
export const makeExamTask = (seed: number): ExamTask => {
  const r = rng(seed);
  const kind = seed % 4;
  if (kind === 0) {
    const a = r(12, 99);
    const d = r(2, 9);
    const p = a * d * 10;
    if (p > 9999) return makeExamTask(seed + 4);
    return {
      kind: 'Kerek tízes',
      text: `${a} · ${d * 10} = ?`,
      answer: p,
      options: uniqueOptions(p, [a * d, p * 10 > 9999 ? p + 100 : p * 10, p - a * 10]),
      explain: `${a} · ${d} = ${a * d}, és 10-zel szorozva ${p}.`
    };
  }
  if (kind === 1) {
    const big = r(0, 2) === 0;
    const a = big ? r(102, 389) : r(12, 98);
    const t = r(1, 3);
    const e = r(1, 9);
    const b = t * 10 + e;
    const p = a * b;
    if (p > 9999 || a % 10 === 0) return makeExamTask(seed + 4);
    return {
      kind: 'Írásbeli szorzás',
      text: `${a} · ${b} = ?`,
      answer: p,
      options: uniqueOptions(p, [a * e + a * t, p + 100, p - 10]),
      explain: `1. részletszorzat: ${a} · ${e} = ${a * e}. 2. részletszorzat: ${a} · ${t} = ${a * t}, egy hellyel balra tolva ${a * t * 10}. Összeadva: ${a * e} + ${a * t * 10} = ${p}.`
    };
  }
  if (kind === 2) {
    const a = r(12, 98);
    const b = r(12, 98);
    if (a % 10 === 5 || b % 10 === 5 || a % 10 === 0 || b % 10 === 0) return makeExamTask(seed + 4);
    const est = round10(a) * round10(b);
    const down = Math.floor(a / 10) * 10 * (Math.floor(b / 10) * 10);
    const up = (Math.floor(a / 10) + 1) * 10 * ((Math.floor(b / 10) + 1) * 10);
    return {
      kind: 'Becslés',
      text: `Becsüld meg tízesre kerekítéssel: ${a} · ${b} ≈ ?`,
      answer: est,
      options: uniqueOptions(est, [down, up, round10(a) * b]),
      explain: `${a} ≈ ${round10(a)}, ${b} ≈ ${round10(b)}, ${round10(a)} · ${round10(b)} = ${est}.`
    };
  }
  const unit = r(2, 5);
  const price = r(3, 9) * 100;
  const k = r(2, 4);
  const p = price * k;
  return {
    kind: 'Következtetés',
    text: `${unit} kg gyümölcs ${price} Ft. Mennyibe kerül ${unit * k} kg?`,
    answer: p,
    options: uniqueOptions(p, [price + k, price * unit * k, p + price]),
    explain: `${unit * k} kg a ${unit} kg ${k}-szorosa, ezért az ár is: ${price} · ${k} = ${p} Ft.`
  };
};

/** I. labor: vegyes feladatgenerátor ellenőrzéssel. */
const MixedLab: React.FC = () => {
  const [seed, setSeed] = useState(1);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState({ good: 0, all: 0 });
  const task = makeExamTask(seed);
  const answered = picked !== null;

  const pick = (o: number) => {
    if (answered) return;
    setPicked(o);
    setScore({ good: score.good + (o === task.answer ? 1 : 0), all: score.all + 1 });
  };
  const next = () => {
    setSeed(seed + 1);
    setPicked(null);
  };

  return (
    <div className="bg-white border-2 border-rose-200 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-black">{task.kind}</span>
        <span className="text-sm font-bold text-slate-600">
          Helyes: {score.good} / {score.all}
        </span>
      </div>
      <div className="text-2xl font-black text-slate-800 text-center">{task.text}</div>
      <div className="grid grid-cols-2 gap-3">
        {task.options.map((o) => (
          <button
            key={o}
            onClick={() => pick(o)}
            className={`h-14 rounded-xl text-xl font-black border-2 ${
              answered && o === task.answer
                ? 'bg-emerald-100 border-emerald-500 text-emerald-800'
                : answered && o === picked
                ? 'bg-rose-100 border-rose-400 text-rose-700'
                : 'bg-white border-rose-200 hover:bg-rose-50 text-slate-800'
            }`}
          >
            {o}
          </button>
        ))}
      </div>
      {answered && (
        <TheoryCallout type={picked === task.answer ? 'success' : 'warning'} title={picked === task.answer ? 'Helyes! 🎉' : 'Nézzük meg!'}>
          {task.explain}
        </TheoryCallout>
      )}
      <button onClick={next} className="px-5 h-12 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold">
        Új feladat ➜
      </button>
    </div>
  );
};

/** II. labor: Hibavadász – melyik eredmény jó, melyik hibás? */
const ErrorHuntLab: React.FC = () => {
  const [marks, setMarks] = useState<Record<number, boolean>>({});
  const done = Object.keys(marks).length === ERROR_HUNT.length;
  const correctMarks = ERROR_HUNT.filter((r, i) => marks[i] !== undefined && marks[i] === (r.claimed === r.real)).length;
  const goodOf = (w: 'Karesz' | 'Kitti') => ERROR_HUNT.filter((r) => r.who === w && r.claimed === r.real).length;

  return (
    <div className="bg-white border-2 border-amber-200 rounded-2xl p-5 shadow-sm space-y-3">
      {ERROR_HUNT.map((r, i) => {
        const ok = r.claimed === r.real;
        const m = marks[i];
        return (
          <div key={i} className="flex flex-wrap items-center gap-2 p-2 rounded-xl border border-slate-200">
            <span className={`text-xs font-black px-2 py-1 rounded-full ${r.who === 'Karesz' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
              {r.who}
            </span>
            <span className="font-mono font-black text-slate-800 flex-1 min-w-[12rem]">
              {r.task} = {r.claimed}
            </span>
            <button
              onClick={() => setMarks({ ...marks, [i]: true })}
              className={`h-12 px-4 rounded-xl font-black border-2 ${m === true ? 'bg-emerald-500 border-emerald-600 text-white' : 'bg-white border-emerald-300 text-emerald-700'}`}
            >
              ✓ jó
            </button>
            <button
              onClick={() => setMarks({ ...marks, [i]: false })}
              className={`h-12 px-4 rounded-xl font-black border-2 ${m === false ? 'bg-rose-500 border-rose-600 text-white' : 'bg-white border-rose-300 text-rose-700'}`}
            >
              ✗ hibás
            </button>
            {m !== undefined && (
              <span className={`text-sm font-bold ${m === ok ? 'text-emerald-700' : 'text-rose-700'}`}>
                {m === ok ? 'Igazad van!' : 'Nem egészen!'} {ok ? 'Ez jó.' : `Helyesen: ${r.real}.`}
              </span>
            )}
          </div>
        );
      })}
      {done && (
        <TheoryCallout type="info" title={`Kész! ${correctMarks} / ${ERROR_HUNT.length} jelölésed jó.`}>
          Karesznak {goodOf('Karesz')}, Kittinek {goodOf('Kitti')} helyes eredménye lett, tehát Karesznak lett több. Tipp: becsléssel gyorsan
          kiszűrheted a nagy hibákat (412 · 23 ≈ 410 · 20 = 8200, ebből 1476-ot elvéve 7000-nél több marad).
        </TheoryCallout>
      )}
    </div>
  );
};

export const WrittenMultExamTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      topicId="g4-written-mult"
      subtopicId="gyakorlas-tudasproba"
      grade={4}
      chapterId="irasbeli-szorzas"
      title="4. Gyakorlás, tudáspróba"
      subtitle="Amit már tudsz: szorzás kerek tízesekkel, írásbeli szorzás kétjegyű szorzóval, becslés, ellenőrzés, összefüggések, következtetések."
      badge="4. OSZTÁLY • VII. ÍRÁSBELI SZORZÁS • TANANYAG"
      themeColor="rose"
      pdfFilename="4_osztaly_irasbeli_szorzas_tudasproba_tananyag.pdf"
      practiceTitle="Készen állsz a fejezetzáró tudáspróbára?"
      practiceSubtitle="90 feladat vár rád 3 szinten!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'AMIT MÁR TUDSZ — ÍRÁSBELI SZORZÁS',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-rose-50/90 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-center">
              <span className="font-mono text-base font-black text-rose-900 dark:text-rose-200">
                becslés → részletszorzatok → összeadás → ellenőrzés
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Kerek tízessel: 28 · 60 = 28 · 6 · 10 = 1680.</li>
              <li>Írásban: előbb az egyesekkel, aztán a tízesekkel (egy hellyel balra), végül összeadás.</li>
              <li>Becslés tízesre kerekítéssel, ellenőrzés a tényezők felcserélésével.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Amit már tudsz */}
      <TheorySection title="1. Amit már tudsz – a fejezet állomásai" badge="Tankönyv 135–144. o." badgeColor="rose">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <ChapterMapSvg />
          <TheoryTable
            headers={['Lecke', 'Amit tudsz', 'Példa']}
            rows={[
              ['1. Szorzás kétjegyű szorzóval', 'szorzás 10-zel, kerek tízesekkel, tagonként', '43 · 40 = 1720; 130 · 60 = 7800'],
              ['2. Írásbeli szorzás', 'becslés, részletszorzatok, eltolás, ellenőrzés', '26 · 24 = 144 + 480 = 624'],
              ['3. Összefüggések', 'a szorzat változása, következtetés', '61 · 80 = 122 · 40; 10 kg → 20 kg']
            ]}
          />
        </div>
      </TheorySection>

      {/* 2. Írásbeli szorzás összefoglalva */}
      <TheorySection title="2. Nézzük meg együtt! 407 · 18" badge="Tankönyv 145. o., Megálló 3." badgeColor="orange">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <WrittenMul2Layout a={407} b={18} showZero labels title="407 · 18 írásban" />
          <TheoryTable
            headers={['Lépés', 'Számolás']}
            rows={[
              ['Becslés', '407 ≈ 410, 18 ≈ 20, 410 · 20 = 8200'],
              ['1. részletszorzat', '407 · 8: 8 · 7 = 56 → leírom a 6-ot, maradt 5; 8 · 0 = 0, és még 5: 5; 8 · 4 = 32 → 3256'],
              ['2. részletszorzat', '407 · 1 = 407, egy hellyel balra: 4070'],
              ['Összeadás', '3256 + 4070 = 7326'],
              ['Ellenőrzés', 'Az eredmény (7326) összhangban van a becsült 8200-zal ✔ (a 18-at felfelé kerekítettük, ezért kisebb)']
            ]}
          />
        </div>
      </TheorySection>

      {/* 3. Összefüggések */}
      <TheorySection title="3. Összefüggések és következtetések" badge="Tankönyv 144. és 146. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A szorzat változása" badge="Szabály" badgeColor="violet">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>48 · 10 = 480. Kétszeresére: 48 · 20 = 960. Felére: 24 · 10 = 240.</li>
              <li>Tízszeresére: 48 · 100 = 4800. Tizedére: 53 · 20 = 1060 → 53 · 2 = 106.</li>
              <li>Duplázás és felezés: 61 · 80 = 122 · 40 = 4880.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Következtetés" badge="Kitekintő 6." badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>3 db 120 Ft-os ceruza = 360 Ft. Ezért 90 Ft-os radírból 4 db (90 · 4 = 360).</li>
              <li>50 ceruza dobozonként, 60 doboz = 3000 ceruza. 10-esével: 300 doboz.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Megálló-feladatok */}
      <TheorySection title="4. Nézzük meg együtt! Megálló-feladatok" badge="Tankönyv 145. o." badgeColor="emerald">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <ForestTrainSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Erdei vasút:</strong> egyszer oda-vissza 800 · 2 = 1600 m. Naponta háromszor: 1600 · 3 = 4800 m. A hétvége 2 nap:
              4800 · 2 = <strong>9600 m</strong>.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <BuffetPriceSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Büfé:</strong> 12 gyerek bodzaszörpöt, 14 csipkebogyószörpöt vett.
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>12 · 250 = 3000 Ft</li>
              <li>14 · 280 = 3920 Ft</li>
              <li>
                Összesen: 3000 + 3920 = <strong>6920 Ft</strong>
              </li>
            </ol>
            <p>
              <strong>Műveleti sorrend:</strong> 448 · (28 − 16) = 448 · 12 = 5376, de 448 · 16 − 28 = 7168 − 28 = 7140.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <OrchardSvg />
          <ArrowCycleSvg values />
        </div>
        <TheoryCallout type="info" title="Melyik gyümölcsösben van több fa?">
          Péter bácsi: 78 · 36 = 2808 fa, Joli néni: 82 · 28 = 2296 fa. Péter bácsinál 2808 − 2296 = 512-vel több almafa van.
        </TheoryCallout>
      </TheorySection>

      {/* 5. Vigyázz! */}
      <TheorySection title="5. Vigyázz! A leggyakoribb hibák" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Elfelejtett eltolás"
          wrong="291 · 32 = 582 + 873 = 1455"
          wrongExplanation="A 873 tízeseket jelent, ezért egy hellyel balra kell írni."
          correct="291 · 32 = 582 + 8730 = 9312"
          correctExplanation="A tízesekkel kapott részletszorzat egy hellyel balra kerül."
          tip="Becsülj! 290 · 30 = 8700, ehhez az 1455 túl kicsi."
        />
        <TheoryTrapBox
          title="Rossz műveleti sorrend"
          wrong="448 − 28 · 16 = 420 · 16 = 6720"
          wrongExplanation="Balról jobbra számolt, pedig a szorzás az első."
          correct="448 − 28 · 16 = 448 − 448 = 0"
          correctExplanation="Előbb szorzunk, utána vonunk ki."
        />
        <TheoryCallout type="warning" title="Gondolkodj, mielőtt szorzol!">
          Ha egy bivaly az év 183 napján van kint a legelőn, akkor 60 bivaly is 183 napig – nem 60 · 183 napig!
        </TheoryCallout>
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Játékos labor I: Vegyes feladatgenerátor" badge="Labor" badgeColor="rose">
        <p className="text-sm text-slate-600">Kerek tízes, írásbeli szorzás, becslés, következtetés – mindig új feladat! Válaszd ki a jó eredményt.</p>
        <MixedLab />
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Játékos labor II: Hibavadász" badge="Labor · Munkafüzet II. 82. o." badgeColor="amber">
        <p className="text-sm text-slate-600">Karesz és Kitti megoldotta a feladatokat. Jelöld, melyik eredmény jó és melyik hibás! Kinek lett több helyes eredménye?</p>
        <ErrorHuntSvg className="w-full max-w-xl mx-auto h-auto" />
        <ErrorHuntLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default WrittenMultExamTheory;
