import React, { useMemo, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import {
  SolidsFamilySvg,
  FlatCurvedSvg,
  CuboidPartsSvg,
  CuboidNetSvg,
  CubeStairsSvg,
  ViewsSvg,
  Solids4Building,
  DEPTH
} from './Solids4Figures';

// ---------------------------------------------------------------------------
// Labor I – téglatest-építő
// ---------------------------------------------------------------------------
type Mode = 'none' | 'lap' | 'el' | 'csucs';
const BUILD_TASKS: { text: string; check: (l: number, w: number, h: number) => boolean }[] = [
  { text: 'Építs kockát 8 kis kockából!', check: (l, w, h) => l === 2 && w === 2 && h === 2 },
  { text: 'Építs téglatestet 12 kis kockából!', check: (l, w, h) => l * w * h === 12 },
  { text: 'Építs 1 kocka magas téglatestet 6 kis kockából!', check: (l, w, h) => h === 1 && l * w === 6 },
  { text: 'Építs kockát 27 kis kockából!', check: (l, w, h) => l === 3 && w === 3 && h === 3 },
  { text: 'Építs téglatestet 24 kis kockából, amely 2 kocka magas!', check: (l, w, h) => h === 2 && l * w === 12 }
];
const COUNT_FACTS: { key: Exclude<Mode, 'none'>; label: string; right: number; options: number[]; why: string }[] = [
  { key: 'lap', label: 'Hány lapja van?', right: 6, options: [3, 4, 6, 8], why: 'elöl, hátul, fent, lent, bal és jobb oldalt: 6 lap' },
  { key: 'el', label: 'Hány éle van?', right: 12, options: [6, 8, 9, 12], why: 'elöl 4, hátul 4, és 4 él köti össze őket: 12 él' },
  { key: 'csucs', label: 'Hány csúcsa van?', right: 8, options: [4, 6, 7, 8], why: 'elöl 4 és hátul 4 csúcs: 8 csúcs' }
];

// ---------------------------------------------------------------------------
// Labor II – alaprajz-építő
// ---------------------------------------------------------------------------
const ROWS = 4;
const COLS = 3;
const pad = (g: number[][]) => Array.from({ length: ROWS }, (_, r) => Array.from({ length: COLS }, (_, c) => g[r]?.[c] ?? 0));
const PLANS: { name: string; plan: number[][] }[] = [
  {
    name: 'A) alaprajz',
    plan: pad([
      [3, 3, 3],
      [2, 2, 2],
      [1, 0, 0],
      [1, 0, 0]
    ])
  },
  {
    name: 'B) alaprajz',
    plan: pad([
      [2, 4, 2],
      [4, 2, 4],
      [2, 4, 2]
    ])
  },
  {
    name: 'C) alaprajz',
    plan: pad([
      [2, 0, 2],
      [1, 2, 1]
    ])
  },
  {
    name: 'D) alaprajz',
    plan: pad([
      [3, 3, 3],
      [2, 0, 2],
      [2, 0, 2]
    ])
  }
];
const sum = (g: number[][]) => g.flat().reduce((a, b) => a + b, 0);
const emptyGrid = () => Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => 0));

export const Solids4Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [l, setL] = useState(3);
  const [w, setW] = useState(2);
  const [h, setH] = useState(2);
  const [mode, setMode] = useState<Mode>('none');
  const [answers, setAnswers] = useState<Record<string, number | null>>({});
  const [bt, setBt] = useState(0);
  const [cubeGuess, setCubeGuess] = useState<number | null>(null);
  const total = l * w * h;
  const isCube = l === w && w === h;
  const solved = BUILD_TASKS[bt].check(l, w, h);
  const cubeOptions = useMemo(() => {
    const cand = [total, l * h, l * h + w * h + l * w, l + w + h, total + l, total - 1];
    return Array.from(new Set(cand.filter((x) => x > 0))).slice(0, 4).sort((a, b) => a - b);
  }, [total, l, w, h]);

  const U = 28;
  const X0 = 30;
  const Y0 = 200;
  const ddx = DEPTH.dx * U * w;
  const ddy = DEPTH.dy * U * w;
  const P = {
    A: [X0, Y0],
    B: [X0 + l * U, Y0],
    C: [X0 + l * U, Y0 - h * U],
    D: [X0, Y0 - h * U],
    E: [X0 + ddx, Y0 + ddy],
    F: [X0 + l * U + ddx, Y0 + ddy],
    G: [X0 + l * U + ddx, Y0 - h * U + ddy],
    H: [X0 + ddx, Y0 - h * U + ddy]
  } as Record<string, number[]>;
  const EDGES: [string, string, boolean][] = [
    ['A', 'B', false],
    ['B', 'C', false],
    ['C', 'D', false],
    ['D', 'A', false],
    ['B', 'F', false],
    ['F', 'G', false],
    ['G', 'C', false],
    ['G', 'H', false],
    ['H', 'D', false],
    ['A', 'E', true],
    ['E', 'F', true],
    ['E', 'H', true]
  ];
  const mid = (...ks: string[]) => [ks.reduce((s, k) => s + P[k][0], 0) / ks.length, ks.reduce((s, k) => s + P[k][1], 0) / ks.length];
  const FACES: { pts: string[]; hidden: boolean; name: string }[] = [
    { pts: ['A', 'B', 'C', 'D'], hidden: false, name: 'elöl' },
    { pts: ['D', 'C', 'G', 'H'], hidden: false, name: 'fent' },
    { pts: ['B', 'F', 'G', 'C'], hidden: false, name: 'jobb' },
    { pts: ['E', 'F', 'G', 'H'], hidden: true, name: 'hátul' },
    { pts: ['A', 'B', 'F', 'E'], hidden: true, name: 'lent' },
    { pts: ['A', 'E', 'H', 'D'], hidden: true, name: 'bal' }
  ];
  const svgW = X0 + 5 * U + DEPTH.dx * U * 4 + 30;
  const svgH = Y0 + 20;

  // Labor II
  const [grid, setGrid] = useState<number[][]>(emptyGrid);
  const [plan, setPlan] = useState(0);
  const [checked, setChecked] = useState(false);
  const target = PLANS[plan].plan;
  const allOk = grid.every((row, r) => row.every((v, c) => v === target[r][c]));
  const front = Array.from({ length: COLS }, (_, c) => Math.max(...grid.map((row) => row[c])));
  const side = Array.from({ length: ROWS }, (_, r) => Math.max(...grid[ROWS - 1 - r]));
  const bump = (r: number, c: number) => {
    setChecked(false);
    setGrid((g) => g.map((row, i) => row.map((v, j) => (i === r && j === c ? (v + 1) % 5 : v))));
  };

  const btn = 'min-h-[48px] px-4 rounded-xl font-bold border-2 transition active:scale-95';
  const stepBtn = 'w-11 h-11 rounded-xl text-xl font-black bg-white border-2 border-slate-300 hover:bg-slate-100 active:scale-95 transition';

  const Stepper: React.FC<{ label: string; v: number; set: (n: number) => void; max: number }> = ({ label, v, set, max }) => (
    <div className="flex items-center gap-2">
      <span className="font-bold text-slate-700 w-24 text-right">{label}</span>
      <button className={stepBtn} onClick={() => set(Math.max(1, v - 1))} aria-label={`${label} csökkentése`}>
        −
      </button>
      <span className="w-8 text-center font-mono text-2xl font-black text-amber-700">{v}</span>
      <button className={stepBtn} onClick={() => set(Math.min(max, v + 1))} aria-label={`${label} növelése`}>
        +
      </button>
    </div>
  );

  return (
    <TheoryTemplate
      topicId="g4-shapes-solids"
      subtopicId="a-testek"
      grade={4}
      chapterId="sikidomok-testek"
      title="3. A testek"
      subtitle="Kocka, téglatest, gömb, henger… Milyen lapok határolják őket? Hány lapjuk, élük, csúcsuk van? Építs kis kockákból!"
      badge="4. OSZTÁLY • V. SÍKIDOMOK ÉS TESTEK • TANANYAG"
      themeColor="amber"
      pdfFilename="4_osztaly_a_testek_tananyag.pdf"
      practiceTitle="Készen állsz a testes feladatokra?"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A TESTEK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center">
              <span className="text-base font-black text-amber-900 dark:text-amber-200">
                A téglatestnek és a kockának 6 lapja, 12 éle és 8 csúcsa van.
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                A test lapjainak a találkozása az <strong>él</strong>, az élek találkozása a <strong>csúcs</strong>.
              </li>
              <li>A kockát 6 egyforma négyzet, a téglatestet 6 téglalap határolja (kettő-kettő egyforma).</li>
              <li>A gömböt görbe felület határolja, a téglatestet síklapok.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1 */}
      <TheorySection title="1. Mit tanulunk? Testek körülöttünk" badge="Tankönyv 118. o." badgeColor="amber">
        <SolidsFamilySvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          Az iglu <strong>félgömb</strong> alakú, a jégtömb <strong>téglatest</strong>, a hógolyó <strong>gömb</strong>, a vödör <strong>henger</strong> alakú. Marokkóban kocka formájú, Kenyában henger alakú házak is vannak. A testek nem laposak, mint a síkidomok: van hosszúságuk, szélességük és magasságuk is.
        </p>
      </TheorySection>

      {/* 2 */}
      <TheorySection title="2. Síklapok vagy görbe felület?" badge="Tankönyv 118–119. o." badgeColor="sky">
        <FlatCurvedSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Síklapok határolják" badge="kocka, téglatest, gúla" badgeColor="sky">
            <p className="text-sm text-slate-700 leading-relaxed">
              Húzd végig a kezed egy dobozon: <strong>sík lapokat</strong> érzel. A kocka, a téglatest és a gúla nem gurul el.
            </p>
          </TheoryCard>
          <TheoryCard title="Görbe felület határolja" badge="gömb, henger, kúp" badgeColor="amber">
            <p className="text-sm text-slate-700 leading-relaxed">
              A gömböt csak <strong>görbe felület</strong> határolja, ezért könnyen gurul. A hengernek és a kúpnak sík lapja és görbe felülete is van.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3 */}
      <TheorySection title="3. Lap, él, csúcs" badge="Tankönyv 120. o." badgeColor="orange">
        <CuboidPartsSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          A test lapjainak a találkozását a test <strong>éleinek</strong>, az élek találkozását a test <strong>csúcsainak</strong> nevezzük. Ha a kocka élvázát számolópálcikákból építed meg, <strong>12 pálcika</strong> (él) és <strong>8 gyurmagolyó</strong> (csúcs) kell.
        </p>
        <TheoryTable
          headers={['Test', 'Lapjai', 'Lapok száma', 'Élek száma', 'Csúcsok száma']}
          rows={[
            ['kocka', '6 egyforma négyzet', '6', '12', '8'],
            ['téglatest', '6 téglalap, kettő-kettő egyforma', '6', '12', '8'],
            ['négyzet alapú gúla', '1 négyzet és 4 háromszög', '5', '8', '5'],
            ['gömb', 'görbe felület', '–', '0', '0']
          ]}
        />
      </TheorySection>

      {/* 4 */}
      <TheorySection title="4. A téglatest és a kocka hálója" badge="Tankönyv 120. o., Munkafüzet 33. o." badgeColor="purple">
        <CuboidNetSvg />
        <p className="text-sm text-slate-700 leading-relaxed">
          Bonts szét egy papírdobozt a ragasztások mentén! A kiterített síkidom a téglatest <strong>hálója</strong>. A háló hat téglalapja közül kettő-kettő ugyanolyan alakú és ugyanakkora – ezek a szemben lévő lapok. A kocka hálója 6 egyforma négyzetből áll.
        </p>
      </TheorySection>

      {/* 5 */}
      <TheorySection title="5. Építmények kis kockákból, alaprajz, nézetek" badge="Tankönyv 119., 122. o." badgeColor="rose">
        <ViewsSvg />
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>
            Az <strong>alaprajz</strong> az építményt felülről mutatja. Minden mezőbe beírjuk, <strong>hány kocka</strong> áll ott egymáson. A számokat összeadva megkapjuk, hány kis kockából áll az építmény.
          </p>
          <p>
            Egy építményt nézhetsz <strong>elölről</strong>, <strong>oldalról</strong> és <strong>felülről</strong>. Ezek az elölnézet, az oldalnézet és a felülnézet.
          </p>
        </div>
        <CubeStairsSvg />
        <TheoryCallout type="info" title="Lépcsők (Tankönyv 6. feladat)">
          Az egyre magasabb lépcsőkhöz 1, 3, 6, 10 kocka kell. A következőhöz 10 + 5 = 15, utána 15 + 6 = 21 kocka – mindig eggyel többet adunk hozzá.
        </TheoryCallout>
      </TheorySection>

      {/* 6 */}
      <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A) Egészítsd ki kockává! (Tankönyv 5. feladat)" badge="1. példa" badgeColor="amber">
            <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-1">
              <li>Az építmény 5 kis kockából áll, és 2 kocka magas.</li>
              <li>A legkisebb kocka, amibe belefér: 2 · 2 · 2 = 8 kis kocka.</li>
              <li>Hiányzik: 8 − 5 = 3 kis kocka.</li>
              <li>Ha 3 kocka magas lenne, 3 · 3 · 3 = 27 kis kockából álló kockát kellene építeni.</li>
            </ol>
          </TheoryCard>
          <TheoryCard title="B) Teniszlabdák dobozban (Munkafüzet 34. o.)" badge="2. példa" badgeColor="emerald">
            <ol className="list-decimal pl-5 text-sm text-slate-700 space-y-1">
              <li>Egy gömb alakú teniszlabda 66 mm széles.</li>
              <li>3 labda egy sorban: 3 · 66 = 198 mm = 19 cm 8 mm.</li>
              <li>5 labda egy sorban: 5 · 66 = 330 mm = 33 cm.</li>
              <li>A henger alakú doboz legalább ilyen hosszú legyen.</li>
            </ol>
          </TheoryCard>
        </div>
        <TheoryCallout type="info" title="C) Belefér a labda a hálóba? (Munkafüzet 35. o.)">
          A háló legfeljebb 30 cm széles labdát bír el. Mérjük ugyanabban az egységben! 300 mm = 30 cm: belefér. 26 cm és 14 cm: belefér. 380 mm = 38 cm, 400 mm = 40 cm, 5 dm = 50 cm: nem fér bele.
        </TheoryCallout>
      </TheorySection>

      {/* 7 */}
      <TheorySection title="7. Vigyázz! A hátsó élek is számítanak" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Csak amit látsz?"
          wrong="A rajzon a téglatestnek 9 éle és 7 csúcsa van."
          wrongExplanation="A rajzon a hátsó éleket nem, vagy csak szaggatottan látjuk. Pedig azok is a test élei!"
          correct="A téglatestnek 12 éle és 8 csúcsa van."
          correctExplanation="A szaggatott vonalak a takart éleket mutatják. Számold meg ezeket is!"
          tip="Kis kockás építménynél is gondolj a hátul és alul lévő, nem látható kockákra – egy kocka nem lóghat a levegőben!"
        />
      </TheorySection>

      {/* 8 Labor I */}
      <TheorySection title="8. Labor I: Téglatest-építő" badge="Labor" badgeColor="amber">
        <div className="bg-white border-2 border-amber-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-base font-bold text-amber-900">Feladat: {BUILD_TASKS[bt].text}</p>
            <button
              onClick={() => setBt((t) => (t + 1) % BUILD_TASKS.length)}
              className={`${btn} bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100`}
            >
              Új feladat
            </button>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Stepper label="hosszúság" v={l} set={(n) => { setL(n); setCubeGuess(null); }} max={5} />
            <Stepper label="szélesség" v={w} set={(n) => { setW(n); setCubeGuess(null); }} max={4} />
            <Stepper label="magasság" v={h} set={(n) => { setH(n); setCubeGuess(null); }} max={5} />
          </div>
          <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-lg mx-auto h-auto bg-slate-50 rounded-xl border border-slate-200">
            <g opacity={mode === 'none' ? 1 : 0.3}>
              <Solids4Building heights={Array.from({ length: w }, () => Array.from({ length: l }, () => h))} u={U} x0={X0} y0={Y0} color={isCube ? '#a78bfa' : '#f59e0b'} />
            </g>
            {mode === 'lap' &&
              FACES.map((f, i) => {
                const [mx, my] = mid(...f.pts);
                return (
                  <g key={i}>
                    <polygon points={f.pts.map((k) => P[k].join(',')).join(' ')} fill={f.hidden ? 'none' : '#fde68a'} fillOpacity="0.6" stroke="#b45309" strokeWidth="2" strokeDasharray={f.hidden ? '5 4' : undefined} />
                    <circle cx={mx + (f.name === 'hátul' ? 10 : f.name === 'lent' ? -10 : 0)} cy={my + (f.name === 'lent' ? 6 : 0)} r="11" fill={f.hidden ? '#ffffff' : '#b45309'} stroke="#b45309" strokeDasharray={f.hidden ? '3 2' : undefined} />
                    <text x={mx + (f.name === 'hátul' ? 10 : f.name === 'lent' ? -10 : 0)} y={my + (f.name === 'lent' ? 10 : 4)} textAnchor="middle" fontSize="12" fontWeight="bold" fill={f.hidden ? '#b45309' : '#ffffff'}>
                      {i + 1}
                    </text>
                  </g>
                );
              })}
            {mode === 'el' &&
              EDGES.map(([p, q, hidden], i) => {
                const [mx, my] = mid(p, q);
                return (
                  <g key={i}>
                    <line x1={P[p][0]} y1={P[p][1]} x2={P[q][0]} y2={P[q][1]} stroke="#dc2626" strokeWidth="4" strokeDasharray={hidden ? '7 5' : undefined} strokeLinecap="round" />
                    <circle cx={mx} cy={my} r="9" fill="#ffffff" stroke="#dc2626" />
                    <text x={mx} y={my + 4} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#dc2626">
                      {i + 1}
                    </text>
                  </g>
                );
              })}
            {mode === 'csucs' &&
              Object.keys(P).map((k, i) => (
                <g key={k}>
                  <circle cx={P[k][0]} cy={P[k][1]} r="10" fill={k === 'E' ? '#ffffff' : '#16a34a'} stroke="#15803d" strokeWidth="2" strokeDasharray={k === 'E' ? '3 2' : undefined} />
                  <text x={P[k][0]} y={P[k][1] + 4} textAnchor="middle" fontSize="11" fontWeight="bold" fill={k === 'E' ? '#15803d' : '#ffffff'}>
                    {i + 1}
                  </text>
                </g>
              ))}
          </svg>
          <div className={`p-3 rounded-xl text-center font-bold ${solved ? 'bg-emerald-50 text-emerald-800' : 'bg-slate-50 text-slate-700'}`}>
            {isCube ? 'Ez kocka!' : 'Ez téglatest.'} {solved ? ' Teljesítetted a feladatot!' : ''}
          </div>
          <div className="space-y-2">
            <p className="text-sm font-bold text-slate-700 text-center">Hány kis kockából építetted?</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {cubeOptions.map((o) => (
                <button
                  key={o}
                  onClick={() => cubeGuess === null && setCubeGuess(o)}
                  className={`${btn} font-mono text-lg ${
                    cubeGuess === null ? 'bg-white border-slate-300 hover:bg-amber-50' : o === total ? 'bg-emerald-100 border-emerald-500' : o === cubeGuess ? 'bg-rose-100 border-rose-500' : 'bg-white border-slate-200 opacity-60'
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
            {cubeGuess !== null && (
              <p className="text-center text-sm font-semibold text-slate-700">
                Egy rétegben {l} · {w} = {l * w} kocka, és {h} réteg van: {l * w} · {h} = <strong>{total}</strong> kis kocka.
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {COUNT_FACTS.map((f) => {
              const a = answers[f.key];
              return (
                <div key={f.key} className="p-3 rounded-xl border-2 border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">{f.label}</span>
                    <button
                      onClick={() => setMode((m) => (m === f.key ? 'none' : f.key))}
                      className={`px-3 py-1 rounded-lg text-xs font-bold border ${mode === f.key ? 'bg-amber-500 text-white border-amber-600' : 'bg-white border-slate-300'}`}
                    >
                      {mode === f.key ? 'Elrejtem' : 'Megmutatom'}
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    {f.options.map((o) => (
                      <button
                        key={o}
                        onClick={() => setAnswers((s) => ({ ...s, [f.key]: o }))}
                        className={`min-h-[44px] rounded-lg border-2 font-mono font-bold ${
                          a === undefined || a === null ? 'bg-white border-slate-300' : o === f.right ? 'bg-emerald-100 border-emerald-500' : o === a ? 'bg-rose-100 border-rose-500' : 'bg-white border-slate-200 opacity-60'
                        }`}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                  {a !== undefined && a !== null && (
                    <p className={`text-xs font-semibold ${a === f.right ? 'text-emerald-700' : 'text-rose-700'}`}>
                      {a === f.right ? 'Igen! ' : 'Nem egészen: '}
                      {f.why}.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <TheoryCallout type="tip" title="Figyeld meg!">
            Akármekkora téglatestet építesz, mindig 6 lapja, 12 éle és 8 csúcsa lesz. Csak a kis kockák száma változik!
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* 9 Labor II */}
      <TheorySection title="9. Labor II: Alaprajz-építő" badge="Labor" badgeColor="rose">
        <div className="bg-white border-2 border-rose-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap justify-center gap-2">
            {PLANS.map((p, i) => (
              <button
                key={p.name}
                onClick={() => {
                  setPlan(i);
                  setChecked(false);
                }}
                className={`${btn} ${plan === i ? 'bg-rose-600 text-white border-rose-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-rose-50'}`}
              >
                {p.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-700 text-center">Ezt építsd meg (Tankönyv 4. c):</p>
              <div className="grid grid-cols-3 gap-1 w-40 mx-auto">
                {target.flatMap((row, r) =>
                  row.map((v, c) => (
                    <div key={`${r}-${c}`} className={`h-11 flex items-center justify-center rounded border font-mono text-lg font-bold ${v ? 'bg-rose-50 border-rose-300 text-rose-900' : 'border-transparent'}`}>
                      {v || ''}
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-700 text-center">A te alaprajzod (kattints a mezőkre!):</p>
              <div className="grid grid-cols-3 gap-1 w-40 mx-auto">
                {grid.flatMap((row, r) =>
                  row.map((v, c) => {
                    const bad = checked && v !== target[r][c];
                    return (
                      <button
                        key={`${r}-${c}`}
                        onClick={() => bump(r, c)}
                        className={`h-11 rounded border-2 font-mono text-lg font-bold active:scale-95 transition ${bad ? 'bg-rose-200 border-rose-500' : v ? 'bg-amber-100 border-amber-400' : 'bg-slate-50 border-slate-200'}`}
                        aria-label={`mező ${r + 1}. sor ${c + 1}. oszlop`}
                      >
                        {v || ''}
                      </button>
                    );
                  })
                )}
              </div>
              <p className="text-xs text-center text-slate-500">Minden kattintás +1 kocka (4 után újra 0).</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-sm font-bold text-slate-700">Kis kockák száma</div>
              <div className="text-4xl font-black text-rose-700">{sum(grid)}</div>
              <button
                onClick={() => setChecked(true)}
                className={`${btn} bg-rose-600 text-white border-rose-700 hover:bg-rose-700`}
              >
                Ellenőrzöm
              </button>
              <button onClick={() => { setGrid(emptyGrid()); setChecked(false); }} className={`${btn} bg-white text-slate-700 border-slate-300 hover:bg-slate-100 ml-2`}>
                Lebontom
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <svg viewBox="0 0 200 200" className="w-full max-w-xs mx-auto h-auto bg-slate-50 rounded-xl border border-slate-200 md:col-span-1">
              <Solids4Building heights={grid} u={26} x0={25} y0={185} color="#f59e0b" />
            </svg>
            <div className="text-center">
              <p className="text-xs font-bold text-slate-600 mb-1">elölnézet</p>
              <svg viewBox="0 0 80 90" className="w-28 mx-auto h-auto">
                {front.map((v, c) =>
                  Array.from({ length: v }, (_, k) => <rect key={`${c}-${k}`} x={10 + c * 20} y={80 - (k + 1) * 18} width="20" height="18" fill="#fde68a" stroke="#92400e" />)
                )}
                <line x1="5" y1="80" x2="75" y2="80" stroke="#334155" strokeWidth="2" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-slate-600 mb-1">oldalnézet (jobbról)</p>
              <svg viewBox="0 0 100 90" className="w-28 mx-auto h-auto">
                {side.map((v, r) =>
                  Array.from({ length: v }, (_, k) => <rect key={`${r}-${k}`} x={10 + r * 20} y={80 - (k + 1) * 18} width="20" height="18" fill="#fecaca" stroke="#991b1b" />)
                )}
                <line x1="5" y1="80" x2="95" y2="80" stroke="#334155" strokeWidth="2" />
              </svg>
            </div>
          </div>
          {checked && (
            <div className={`p-3 rounded-xl text-center font-bold ${allOk ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
              {allOk
                ? `Hibátlan! Az építmény ${sum(target)} kis kockából áll.`
                : 'Még nem egyezik – a pirossal jelölt mezőkön más a magasság. Javítsd ki!'}
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default Solids4Theory;
