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
  ProbabilityReviewDieEventsSvg,
  ProbabilityReviewCarlsenPiesSvg,
  ProbabilityReviewProductTableSvg,
  ProbabilityReviewDivisorsVennSvg,
  ProbabilityReviewSeatsSvg,
  ProbabilityReviewDieFace
} from './ProbabilityReviewFigures';

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const fracText = (k: number, n: number): string => {
  if (n === 0) return '–';
  if (k === 0) return '0';
  const g = gcd(k, n);
  return g === n ? String(k / g) : `${k / g}/${n / g}`;
};
const dec = (x: number, d = 3) => (Math.round(x * 10 ** d) / 10 ** d).toString().replace('.', ',');

type Experiment = 'coin' | 'die' | 'sum';
const EXPERIMENTS: Record<Experiment, { label: string; outcomes: string[]; probs: number[]; roll: () => number }> = {
  coin: {
    label: 'pénzérme',
    outcomes: ['fej', 'írás'],
    probs: [1 / 2, 1 / 2],
    roll: () => (Math.random() < 0.5 ? 0 : 1)
  },
  die: {
    label: 'dobókocka',
    outcomes: ['1', '2', '3', '4', '5', '6'],
    probs: Array(6).fill(1 / 6),
    roll: () => Math.floor(Math.random() * 6)
  },
  sum: {
    label: 'két kocka összege',
    outcomes: ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    probs: [1, 2, 3, 4, 5, 6, 5, 4, 3, 2, 1].map((x) => x / 36),
    roll: () => Math.floor(Math.random() * 6) + Math.floor(Math.random() * 6)
  }
};

type Op = 'sum' | 'product' | 'max';
type EventKind = 'even' | 'prime' | 'square' | 'gt' | 'eq';
const isPrime = (n: number) => {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
};
const opValue = (op: Op, a: number, b: number) => (op === 'sum' ? a + b : op === 'product' ? a * b : Math.max(a, b));
const eventHolds = (ev: EventKind, v: number, k: number) =>
  ev === 'even' ? v % 2 === 0 : ev === 'prime' ? isPrime(v) : ev === 'square' ? Number.isInteger(Math.sqrt(v)) : ev === 'gt' ? v > k : v === k;

export const ProbabilityReviewTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: szimulátor
  const [exp, setExp] = useState<Experiment>('die');
  const [counts, setCounts] = useState<number[]>(Array(6).fill(0));
  const [last, setLast] = useState<number | null>(null);
  const cfg = EXPERIMENTS[exp];
  const total = counts.reduce((s, x) => s + x, 0);
  const chooseExp = (e: Experiment) => {
    setExp(e);
    setCounts(Array(EXPERIMENTS[e].outcomes.length).fill(0));
    setLast(null);
  };
  const run = (n: number) => {
    const next = [...counts];
    let r = 0;
    for (let i = 0; i < n; i++) {
      r = cfg.roll();
      next[r] += 1;
    }
    setCounts(next);
    setLast(r);
  };
  const maxBar = Math.max(...cfg.probs, ...(total ? counts.map((c) => c / total) : [0]), 0.1);
  const barW = 360 / cfg.outcomes.length;

  // Labor II: 6 × 6-os táblázat
  const [op, setOp] = useState<Op>('product');
  const [ev, setEv] = useState<EventKind>('gt');
  const [k, setK] = useState<number>(10);
  const [sim, setSim] = useState<{ n: number; hits: number } | null>(null);
  let fav = 0;
  for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) if (eventHolds(ev, opValue(op, a, b), k)) fav++;
  const opName = op === 'sum' ? 'összege' : op === 'product' ? 'szorzata' : 'nagyobbika';
  const evName = ev === 'even' ? 'páros' : ev === 'prime' ? 'prímszám' : ev === 'square' ? 'négyzetszám' : ev === 'gt' ? `nagyobb, mint ${k}` : `egyenlő ${k}-val/-vel`;
  const simulate100 = () => {
    let hits = 0;
    for (let i = 0; i < 100; i++) {
      const a = 1 + Math.floor(Math.random() * 6);
      const b = 1 + Math.floor(Math.random() * 6);
      if (eventHolds(ev, opValue(op, a, b), k)) hits++;
    }
    setSim({ n: 100, hits });
  };

  return (
    <TheoryTemplate
      topicId="g11-statisztika-valoszinuseg"
      subtopicId="valoszinuseg-ismetles"
      title="7. Valószínűség – ismétlés"
      subtitle="Klasszikus valószínűség: kedvező és összes elemi esemény, komplementer esemény, két kocka 6 × 6-os táblázata és a relatív gyakoriság."
      badge="11. OSZTÁLY • V. STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS • TANANYAG"
      themeColor="sky"
      pdfFilename="11_osztaly_valoszinuseg_ismetles_tananyag.pdf"
      practiceTitle="Készen állsz a valószínűség ismétlésére?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — KLASSZIKUS VALÓSZÍNŰSÉG',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-sky-50/90 dark:bg-sky-950/50 border border-sky-200 dark:border-sky-800/80 text-center font-mono text-base font-black text-sky-900 dark:text-sky-200">
              P(A) = kedvező elemi események száma / összes elemi esemény száma
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Csak akkor használható, ha az elemi események <strong>egyformán valószínűek</strong>.</li>
              <li>
                0 ≤ P(A) ≤ 1; komplementer esemény: <strong>P(A) = 1 − P(nem A)</strong>.
              </li>
              <li>Sokszor ismételt kísérletnél a relatív gyakoriság a valószínűség közelébe kerül.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: juss el a helyes válaszok mentén!" badge="Tankönyv 180. o." badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>Szabályos dobókockával dobunk. A 6 elemi esemény (1, 2, …, 6) egyformán valószínű. Mennyi annak a valószínűsége, hogy a dobott szám:</p>
            <TheoryTable
              headers={['Esemény', 'Kedvező esetek', 'Valószínűség']}
              rows={[
                ['osztója 6-nak', '1, 2, 3, 6', '4/6 = 2/3'],
                ['prímszám', '2, 3, 5', '3/6 = 1/2'],
                ['relatív prím a 30-hoz', '1', '1/6'],
                ['osztható 5-tel', '5', '1/6'],
                ['osztója 5!-nak (= 120)', '1, 2, 3, 4, 5, 6', '6/6 = 1 (biztos esemény)'],
                ['négyzetszám', '1, 4', '2/6 = 1/3'],
                ['osztója 5-nek', '1, 5', '2/6 = 1/3'],
                ['faktoriálisa páros', '2, 3, 4, 5, 6 (1! = 1 páratlan)', '5/6']
              ]}
            />
          </div>
          <ProbabilityReviewDieEventsSvg />
        </div>
      </TheorySection>

      {/* 2. Elmélet */}
      <TheorySection title="2. Elmélet: klasszikus valószínűség és relatív gyakoriság" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCallout type="info" title="Valószínűség és relatív gyakoriság">
            Ha nagyon sokszor elvégzünk egy véletlen kísérletet, egy esemény <strong>relatív gyakorisága</strong> (bekövetkezések száma / kísérletek száma) az esemény valószínűségéhez közeli érték. Az A esemény valószínűségének jele: P(A).
          </TheoryCallout>
          <TheoryCallout type="tip" title="Komplementer esemény">
            Néha könnyebb azokat az elemi eseményeket megszámolni, amikor az esemény <strong>nem</strong> következik be: P(A) = 1 − P(nem A). Pl. két kockával legalább egy hatos: 1 − 25/36 = 11/36.
          </TheoryCallout>
          <TheoryCallout type="warning" title="Egyforma tárgyak">
            Ha egyforma tárgyak szerepelnek (3 egyforma sárga golyó, 2 egyforma kocka, 3 egyforma érme), gondolatban különböztessük meg őket (pl. sárga₁, sárga₂, sárga₃) – fizikailag ezek valóban különbözők.
          </TheoryCallout>
          <TheoryCallout type="success" title="Két kocka">
            Két kockánál különböztessük meg a kockákat (pl. piros és kék), így az elemi események egy <strong>6 × 6-os táblázatban</strong> sorolhatók fel: 36 egyformán valószínű eset.
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 3. Carlsen */}
      <TheorySection title="3. Kidolgozott feladat: Magnus Carlsen játszmái (1. feladat)" badge="Tankönyv 181. o." badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Világossal: 384 győzelem, 303 döntetlen, 78 vereség (összesen 765). Sötéttel: 250 győzelem, 419 döntetlen, 65 vereség (összesen 734). Összesen <strong>1499</strong> játszma; egyet véletlenszerűen kiválasztunk.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>a)</strong> Carlsen világossal játszotta: P = 765/1499 ≈ 0,510.
              </li>
              <li>
                <strong>b)</strong> Carlsen nyert: P = (384 + 250)/1499 = 634/1499 ≈ 0,423.
              </li>
              <li>
                <strong>c)</strong> Az ellenfél sötéttel nyert = Carlsen világossal kikapott: P = 78/1499 ≈ 0,052.
              </li>
            </ul>
            <TheoryCallout type="tip" title="Figyelj a nézőpontra!">
              Ha Carlsen világossal játszik, az ellenfele sötéttel van – a c) kérdésnél ezért a <em>világos</em> diagram vereség-szeletét kell nézni.
            </TheoryCallout>
          </div>
          <ProbabilityReviewCarlsenPiesSvg />
        </div>
      </TheorySection>

      {/* 4. Szorzat tábla */}
      <TheorySection title="4. Kidolgozott feladat: két kocka, a dobások szorzata (2. feladat)" badge="Tankönyv 181. o." badgeColor="violet">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>A 6 × 6-os táblázat 36 cellája a 36 egyformán valószínű elemi esemény. Megszámoljuk a kedvező cellákat:</p>
            <TheoryTable
              headers={['A szorzat…', 'Kedvező', 'Valószínűség']}
              rows={[
                ['nagyobb, mint 10', '17', '17/36 ≈ 0,472'],
                ['négyzetszám (1, 4, 9, 16, 25, 36)', '8', '8/36 = 2/9'],
                ['páros', '36 − 9 = 27 (páratlan csak ha mindkettő páratlan: 3 · 3)', '27/36 = 3/4'],
                ['prímszám (2, 3, 5)', '6', '6/36 = 1/6']
              ]}
            />
            <p>
              <strong>c)</strong> Dobjatok két kockával 100-szor, és vessétek össze a relatív gyakoriságokat a kiszámolt valószínűségekkel – ezt a II. laboratórium is elvégzi.
            </p>
          </div>
          <ProbabilityReviewProductTableSvg />
        </div>
      </TheorySection>

      {/* 5. Házi feladatok */}
      <TheorySection title="5. Házi feladatok – kidolgozva" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="space-y-4">
            <TheoryCard title="HF 2.: 60 és 56 osztói" badge="Venn-diagram" badgeColor="amber">
              <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                <li>A = {'{'}1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60{'}'} (12 elem), B = {'{'}1, 2, 4, 7, 8, 14, 28, 56{'}'} (8 elem), A ∩ B = {'{'}1, 2, 4{'}'}.</li>
                <li>a) 60 egyik osztója 56-nak is osztója: 3/12 = <strong>1/4</strong>.</li>
                <li>b) 56 egyik osztója 60-nak is osztója: 3/8.</li>
                <li>c) A ∪ B 12 + 8 − 3 = 17 elemű, így P = <strong>3/17</strong>.</li>
              </ul>
            </TheoryCard>
            <TheoryCard title="HF 3.: két fiú és két lány négy széken" badge="Sorba rendezés" badgeColor="rose">
              <p className="text-sm text-slate-700">
                Összes ültetés: 4! = 24. A lányok egymás mellett: a lánypár 3 helyre kerülhet, a lányok 2-féleképpen, a fiúk 2-féleképpen ülhetnek: 3 · 2 · 2 = 12. Így P(nem ülnek egymás mellett) = 1 − 12/24 = <strong>1/2</strong>.
              </p>
            </TheoryCard>
            <TheoryCard title="HF 1.: repülőjáratok gráfja" badge="Gráf" badgeColor="sky">
              <p className="text-sm text-slate-700">
                Az elemi események a gráf élei (közvetlen járatok). P(egy adott várost érint) = a város fokszáma / élek száma; P(egyik végállomás sem D) = 1 − deg(D) / élek száma.
              </p>
            </TheoryCard>
          </div>
          <div className="space-y-4">
            <ProbabilityReviewDivisorsVennSvg />
            <ProbabilityReviewSeatsSvg />
          </div>
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: nem egyformán valószínű „esetek”" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Két kockával dobunk. Mennyi a valószínűsége, hogy az egyik 1-es, a másik 2-es?"
          wrong="1/21, mert 21-féle (rendezetlen) számpár van"
          wrongExplanation="A 21 rendezetlen pár nem egyformán valószínű: a {1; 2} pár kétféleképpen jöhet létre (piros 1 – kék 2 és piros 2 – kék 1), az {1; 1} csak egyféleképpen."
          correct="2/36 = 1/18"
          correctExplanation="Különböztessük meg a két kockát! A 36 rendezett pár már egyformán valószínű, ebből 2 kedvező."
          tip="Egyforma tárgyakat (kockát, érmét, golyót) mindig gondolatban különböztess meg, és a 6 × 6-os táblázatban számolj."
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: kocka- és érmeszimulátor" badge="Labor" badgeColor="sky">
        <div className="bg-white border-2 border-sky-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(EXPERIMENTS) as Experiment[]).map((e) => (
              <button
                key={e}
                onClick={() => chooseExp(e)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${exp === e ? 'bg-sky-600 text-white' : 'bg-sky-50 text-sky-800 hover:bg-sky-100'}`}
              >
                {EXPERIMENTS[e].label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[1, 10, 100, 1000].map((n) => (
              <button key={n} onClick={() => run(n)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-100">
                +{n} dobás
              </button>
            ))}
            <button onClick={() => chooseExp(exp)} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100">
              nullázás
            </button>
            <span className="text-sm text-slate-700 ml-2">
              kísérletek száma: <strong>{total}</strong>
              {last !== null && (
                <>
                  {' '}
                  · utolsó eredmény: <strong>{cfg.outcomes[last]}</strong>
                </>
              )}
            </span>
          </div>
          {exp === 'die' && last !== null && (
            <svg viewBox="0 0 60 60" className="w-14 h-14" aria-label="utolsó dobás">
              <ProbabilityReviewDieFace x={4} y={4} size={52} value={last + 1} />
            </svg>
          )}
          <svg viewBox="0 0 420 220" className="w-full max-w-xl mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="416" height="216" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
            <line x1="40" y1="180" x2="404" y2="180" stroke="#475569" />
            {cfg.outcomes.map((o, i) => {
              const rel = total ? counts[i] / total : 0;
              const h = (rel / maxBar) * 150;
              const ph = (cfg.probs[i] / maxBar) * 150;
              const x = 44 + i * barW;
              return (
                <g key={o}>
                  <rect x={x + barW * 0.15} y={180 - h} width={barW * 0.7} height={h} fill="#38bdf8" stroke="#0284c7" />
                  <line x1={x + barW * 0.05} y1={180 - ph} x2={x + barW * 0.95} y2={180 - ph} stroke="#e11d48" strokeWidth="2.5" />
                  <text x={x + barW / 2} y="196" fontSize="11" textAnchor="middle" fill="#334155">{o}</text>
                  <text x={x + barW / 2} y={174 - h} fontSize="9" textAnchor="middle" fill="#0c4a6e">{total ? dec(rel, 2) : ''}</text>
                </g>
              );
            })}
            <text x="40" y="20" fontSize="11" fill="#0284c7">kék oszlop: relatív gyakoriság</text>
            <text x="250" y="20" fontSize="11" fill="#e11d48">piros vonal: valószínűség</text>
          </svg>
          <TheoryCallout type="tip" title="Mit figyelj meg?">
            Kevés dobásnál a relatív gyakoriságok még nagyon ingadoznak; 1000–2000 dobás után már közel kerülnek a valószínűséghez (kocka: 1/6 ≈ 0,167; két kocka összegénél a 7 a legvalószínűbb: 6/36).
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: a 6 × 6-os táblázat" badge="Labor" badgeColor="violet">
        <div className="bg-white border-2 border-violet-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">művelet a két dobással</label>
              <select value={op} onChange={(e) => setOp(e.target.value as Op)} className="w-full px-3 py-2 rounded-lg border border-violet-200" aria-label="művelet">
                <option value="sum">összeg</option>
                <option value="product">szorzat</option>
                <option value="max">a nagyobbik dobás</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">esemény</label>
              <select value={ev} onChange={(e) => setEv(e.target.value as EventKind)} className="w-full px-3 py-2 rounded-lg border border-violet-200" aria-label="esemény">
                <option value="gt">nagyobb, mint k</option>
                <option value="eq">egyenlő k-val</option>
                <option value="even">páros</option>
                <option value="prime">prímszám</option>
                <option value="square">négyzetszám</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">k = {k}</label>
              <input
                type="range"
                min={1}
                max={36}
                value={k}
                onChange={(e) => setK(Number(e.target.value))}
                disabled={ev !== 'gt' && ev !== 'eq'}
                className="w-full accent-violet-600"
                aria-label="k értéke"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <svg viewBox="0 0 300 300" className="w-full max-w-sm mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
              {[1, 2, 3, 4, 5, 6].map((v) => (
                <g key={`h${v}`}>
                  <text x={40 + (v - 0.5) * 42} y="26" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0369a1">{v}</text>
                  <text x="24" y={34 + (v - 0.5) * 42 + 4} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#be123c">{v}</text>
                </g>
              ))}
              {[1, 2, 3, 4, 5, 6].map((a) =>
                [1, 2, 3, 4, 5, 6].map((b) => {
                  const v = opValue(op, a, b);
                  const hit = eventHolds(ev, v, k);
                  return (
                    <g key={`${a}-${b}`}>
                      <rect x={40 + (b - 1) * 42} y={34 + (a - 1) * 42} width="42" height="42" fill={hit ? '#c4b5fd' : '#ffffff'} stroke="#94a3b8" />
                      <text x={40 + (b - 0.5) * 42} y={34 + (a - 0.5) * 42 + 4} fontSize="12" textAnchor="middle" fill="#0f172a">{v}</text>
                    </g>
                  );
                })
              )}
            </svg>
            <div className="space-y-3 text-sm">
              <div className="bg-violet-50 rounded-xl border border-violet-200 p-4 space-y-1">
                <div>
                  Esemény: a dobások {opName} {evName}.
                </div>
                <div>
                  Kedvező cellák: <strong>{fav}</strong> a 36-ból
                </div>
                <div className="text-lg">
                  P = {fav}/36 {fav > 0 && fav < 36 ? `= ${fracText(fav, 36)}` : ''} ≈ <strong>{dec(fav / 36)}</strong>
                </div>
              </div>
              <button onClick={simulate100} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-violet-600 text-white hover:bg-violet-700">
                Dobjunk 100-szor két kockával!
              </button>
              {sim && (
                <div className="bg-emerald-50 rounded-xl border border-emerald-200 p-3">
                  Az esemény {sim.hits}-szor következett be a {sim.n} dobásból: relatív gyakoriság <strong>{dec(sim.hits / sim.n, 2)}</strong> (valószínűség ≈ {dec(fav / 36)}).
                </div>
              )}
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ProbabilityReviewTheory;
