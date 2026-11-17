import React, { useEffect, useState } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { CuboidsAndCubeSvg, OppositeFacesSvg, CubeNetSvg, LayersSvg, CompleteCubeSvg } from './CuboidG3Figures';
import { PolySolid, boxGeom, FitBuilding, V3 } from '../a-testek/SolidsG3Parts';
import { cuboidPlan } from './CuboidG3Parts';

// ---------------------------------------------------------------------------
// Labor I – Forgasd meg a téglatestet!
// ---------------------------------------------------------------------------
type M3 = number[][];
const I3: M3 = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1]
];
const mul = (a: M3, b: M3): M3 => a.map((r) => [0, 1, 2].map((j) => r[0] * b[0][j] + r[1] * b[1][j] + r[2] * b[2][j]));
const rot = (axis: 'x' | 'y', deg: number): M3 => {
  const t = (deg * Math.PI) / 180;
  const c = Math.cos(t);
  const s = Math.sin(t);
  return axis === 'y'
    ? [
        [c, 0, s],
        [0, 1, 0],
        [-s, 0, c]
      ]
    : [
        [1, 0, 0],
        [0, c, -s],
        [0, s, c]
      ];
};
const apply = (m: M3, v: V3): V3 => [m[0][0] * v[0] + m[0][1] * v[1] + m[0][2] * v[2], m[1][0] * v[0] + m[1][1] * v[1] + m[1][2] * v[2], m[2][0] * v[0] + m[2][1] * v[1] + m[2][2] * v[2]];

type Dims = [number, number, number]; // hossz, magasság, mélység
const BOXES: Dims[] = [
  [2, 1.2, 1],
  [1.3, 1.3, 1.3],
  [1, 2, 1],
  [2.2, 0.8, 1.4],
  [1.6, 1.6, 0.8]
];
const PAIR_COLORS = ['#fca5a5', '#93c5fd', '#fde68a'];
/** Lapok mérete (boxGeom sorrend: elöl, hátul, alul, fölül, bal, jobb). */
const faceSizeKey = ([l, h, d]: Dims, i: number) => {
  const pair = i < 2 ? [l, h] : i < 4 ? [l, d] : [d, h];
  return pair
    .map((v) => v.toFixed(2))
    .sort()
    .join('x');
};
const classesOf = (dm: Dims) => [...new Set([0, 1, 2, 3, 4, 5].map((i) => faceSizeKey(dm, i)))];

// ---------------------------------------------------------------------------
// Labor II – Építs téglatestet!
// ---------------------------------------------------------------------------
const MAX = { l: 6, d: 3, h: 4 };
const TARGETS = [6, 8, 12, 16, 18, 24];
const solutionsOf = (n: number): string[] => {
  const out = new Set<string>();
  for (let a = 1; a <= n; a++)
    for (let b = 1; b <= n; b++) {
      if (n % (a * b)) continue;
      const c = n / (a * b);
      if (a <= MAX.l && b <= MAX.d && c <= MAX.h) out.add([a, b, c].sort((x, y) => x - y).join('·'));
    }
  return [...out];
};

const btn = 'px-4 py-2 rounded-xl text-sm font-bold min-h-[48px]';

const Stepper: React.FC<{ label: string; value: number; min: number; max: number; onChange: (v: number) => void }> = ({ label, value, min, max, onChange }) => (
  <div className="flex items-center justify-between gap-2 bg-slate-50 rounded-xl border border-slate-200 px-2 py-1">
    <span className="text-sm font-bold text-slate-700 w-24">{label}</span>
    <button onClick={() => onChange(Math.max(min, value - 1))} className="w-11 h-11 rounded-lg bg-white border-2 border-slate-300 text-xl font-black" aria-label={`${label} kevesebb`}>
      −
    </button>
    <span className="w-8 text-center text-xl font-black text-slate-900">{value}</span>
    <button onClick={() => onChange(Math.min(max, value + 1))} className="w-11 h-11 rounded-lg bg-white border-2 border-slate-300 text-xl font-black" aria-label={`${label} több`}>
      +
    </button>
  </div>
);

export const CuboidG3Theory: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => {
  // Labor I
  const [dims, setDims] = useState<Dims>(BOXES[0]);
  const [mat, setMat] = useState<M3>(I3);
  const [anim, setAnim] = useState<{ axis: 'x' | 'y'; deg: number } | null>(null);
  const [marked, setMarked] = useState<boolean[]>(Array(6).fill(false));
  const [kinds, setKinds] = useState<number | null>(null);
  useEffect(() => {
    if (!anim) return;
    if (anim.deg >= 90) {
      const m = mul(rot(anim.axis, 90), mat).map((r) => r.map((v) => Math.round(v)));
      setMat(m);
      setAnim(null);
      return;
    }
    const t = setTimeout(() => setAnim({ ...anim, deg: anim.deg + 10 }), 28);
    return () => clearTimeout(t);
  }, [anim, mat]);
  const shown = anim ? mul(rot(anim.axis, anim.deg), mat) : mat;
  const g = boxGeom(dims[0], dims[1], dims[2]);
  const c: V3 = [dims[0] / 2, dims[1] / 2, dims[2] / 2];
  const verts = g.verts.map((v) => apply(shown, [v[0] - c[0], v[1] - c[1], v[2] - c[2]]));
  const cls = classesOf(dims);
  const nMarked = marked.filter(Boolean).length;
  const newBox = () => {
    let next: Dims;
    do next = BOXES[Math.floor(Math.random() * BOXES.length)];
    while (next === dims);
    setDims(next);
    setMat(I3);
    setMarked(Array(6).fill(false));
    setKinds(null);
  };

  // Labor II
  const [goal, setGoal] = useState(12);
  const [l, setL] = useState(2);
  const [d, setD] = useState(1);
  const [h, setH] = useState(1);
  const [found, setFound] = useState<string[]>([]);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const all = solutionsOf(goal);
  const n = l * d * h;
  const check = () => {
    if (n !== goal) {
      setMsg({ ok: false, text: n < goal ? `Ez csak ${n} kocka. Még ${goal - n} hiányzik.` : `Ez ${n} kocka, ${n - goal}-vel több a kelleténél.` });
      return;
    }
    const k = [l, d, h].sort((a, b) => a - b).join('·');
    if (found.includes(k)) setMsg({ ok: false, text: 'Ezt már megtaláltad! Ha elforgatod, ugyanaz a téglatest. Keress másikat!' });
    else {
      const f = [...found, k];
      setFound(f);
      setMsg({ ok: true, text: f.length === all.length ? `Szuper! Megvan mind a ${all.length} megoldás.` : `Jó! ${l} · ${d} · ${h} = ${goal}. Van még más megoldás is!` });
    }
  };
  const newGoal = () => {
    let g2: number;
    do g2 = TARGETS[Math.floor(Math.random() * TARGETS.length)];
    while (g2 === goal);
    setGoal(g2);
    setFound([]);
    setMsg(null);
    setL(1);
    setD(1);
    setH(1);
  };

  return (
    <TheoryTemplate
      topicId="g3-shapes-solids"
      subtopicId="a-teglatest-es-a-kocka"
      grade={3}
      chapterId="testek-sikidomok"
      title="2. A téglatest és a kocka"
      subtitle="Lapok, szemközti lapok, testháló, építés kis kockákból."
      badge="3. OSZTÁLY • X. TESTEK, SÍKIDOMOK • TANANYAG"
      themeColor="orange"
      pdfFilename="3_osztaly_a_teglatest_es_a_kocka_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — TÉGLATEST ÉS KOCKA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-orange-50/90 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/80 text-center text-sm font-black text-orange-900 dark:text-orange-200">
              Téglatest: 6 téglalap alakú lap. Kocka: 6 egyforma négyzet.
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>A szemben lévő lapok mindig egyformák.</li>
              <li>A kocka is téglatest.</li>
              <li>Kis kockákból: egy réteg kockái · rétegek száma.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tankönyv 102–103. o." badgeColor="orange">
        <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
          <p>A cipősdoboz, a tégla, a gyufásdoboz <strong>téglatest</strong> alakú. A dobókocka <strong>kocka</strong> alakú.</p>
          <p>Megnézzük a lapjaikat, és kis kockákból építünk ilyen testeket.</p>
        </div>
        <CuboidsAndCubeSvg />
      </TheorySection>

      <TheorySection title="2. A téglatest lapjai" badge="3 pár" badgeColor="rose">
        <OppositeFacesSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>A téglatestet <strong>6 téglalap alakú lap</strong> határolja.</p>
          <p>A <strong>szemben lévő lapok egyformák</strong>. Ezért a lapok 3 párt alkotnak.</p>
        </div>
        <TheoryCallout type="tip" title="Hányféle lap?">
          Egy cipősdoboznak legfeljebb 3-féle lapja van. Ha két szemközti lapja négyzet, akkor csak 2-féle. A kockának csak 1-féle: mind a 6 egyforma.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="3. A kocka és a hálója" badge="testháló" badgeColor="sky">
        <CubeNetSvg />
        <div className="space-y-2 text-sm text-slate-700">
          <p>A kockát <strong>6 egyforma négyzet</strong> határolja.</p>
          <p>Ha a kockát kinyitjuk és kiterítjük, megkapjuk a <strong>hálóját</strong>. A háló darabjai a lapok.</p>
        </div>
        <TheoryCallout type="warning" title="Nem minden 6 négyzet jó!">
          Ha a 6 négyzet egy sorban van, nem lesz belőle kocka: két lap egymásra kerül, és két lap hiányzik.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Építés kis kockákból" badge="rétegek" badgeColor="emerald">
        <LayersSvg />
        <p className="text-sm text-slate-700">Először egy réteget számolunk: 3 kocka egy sorban, 2 sor: 3 · 2 = 6. Két réteg: 6 + 6 = 12.</p>
        <CompleteCubeSvg />
        <p className="text-sm text-slate-700">
          <strong>Kiegészítés kockává:</strong> a 2 · 2-es réteg fölé még egy ugyanilyen réteg kell. Legalább 4 kis kockát kell még hozzátenni.
        </p>
      </TheorySection>

      <TheorySection title="5. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Hány kocka?" badge="3 réteg" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>Egy sorban 4 kocka, 2 sor.</li>
              <li>Egy réteg: 4 · 2 = 8.</li>
              <li>3 réteg: 8 + 8 + 8 = <strong>24</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) 8 kockából" badge="több megoldás" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>8 egy sorban: 8 · 1 · 1.</li>
              <li>4 · 2, egy rétegben.</li>
              <li>2 · 2 · 2: ez <strong>kocka</strong>!</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Dobókocka" badge="szemközti lap" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
              <li>A szemközti lapokon összesen 7 pötty van.</li>
              <li>Az 5-tel szemben: 7 − 5 = <strong>2</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="6. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A belső és a hátsó kockák is számítanak!"
          wrong="A 3 · 2 · 2-es téglatestben 8 kockát látok, tehát 8 kocka van."
          wrongExplanation="A hátsó és az alsó kockák egy része el van takarva."
          correct="Rétegenként számolok: 6 + 6 = 12 kocka."
          correctExplanation="Egy réteg: 3 · 2 = 6 kocka. Két réteg van."
          tip="Ne a látható kockákat számold, hanem a rétegeket!"
        />
        <TheoryCallout type="warning" title="Hány lapja van?">
          Egy hosszú, 12 kockából álló rúdnak is csak 6 lapja van. A lapok száma nem függ attól, hány kis kockából építetted.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="7. Labor I: Forgasd meg a téglatestet!" badge="Labor" badgeColor="rose">
        <div className="bg-white border-2 border-rose-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <p className="text-sm text-slate-700 text-center">Koppints minden lapra! Az egyforma lapok egyforma színt kapnak. Forgasd meg, hogy a hátsó lapokat is lásd!</p>
          <svg viewBox="0 0 300 220" className="w-full max-w-sm h-auto mx-auto touch-manipulation" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="298" height="218" rx="14" fill="#f8fafc" stroke="#e2e8f0" />
            <PolySolid
              verts={verts}
              faces={g.faces}
              ox={150}
              oy={110}
              u={62}
              color="#e2e8f0"
              sw={2.6}
              faceFill={(i) => (marked[i] ? PAIR_COLORS[cls.indexOf(faceSizeKey(dims, i))] : undefined)}
              onFaceClick={(i) => {
                if (anim) return;
                setMarked(marked.map((m, k) => m || k === i));
              }}
            />
          </svg>
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={() => !anim && setAnim({ axis: 'y', deg: 0 })} className={`${btn} bg-rose-600 text-white`}>
              Forgasd oldalra ↻
            </button>
            <button onClick={() => !anim && setAnim({ axis: 'x', deg: 0 })} className={`${btn} bg-rose-600 text-white`}>
              Billentsd előre ↓
            </button>
            <button onClick={newBox} className={`${btn} bg-slate-200 text-slate-700`}>
              Új feladat
            </button>
          </div>
          <div className="text-center text-sm font-bold text-rose-900">Megtalált lapok: {nMarked} / 6</div>
          {nMarked === 6 && (
            <div className="space-y-2">
              <p className="text-center text-sm font-bold text-slate-700">Mind a 6 lapot megtaláltad! Hányféle méretű lapja van ennek a testnek?</p>
              <div className="flex gap-2 justify-center">
                {[1, 2, 3].map((v) => (
                  <button key={v} onClick={() => setKinds(v)} className={`${btn} w-14 border-2 ${kinds === v ? (v === cls.length ? 'bg-emerald-500 text-white border-emerald-700' : 'bg-rose-100 border-rose-400') : 'bg-white border-slate-300'}`}>
                    {v}
                  </button>
                ))}
              </div>
              {kinds !== null && (
                <div className={`rounded-xl p-3 text-center text-sm font-bold ${kinds === cls.length ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  {kinds === cls.length
                    ? cls.length === 1
                      ? 'Igen! Mind a 6 lap egyforma négyzet: ez kocka.'
                      : `Igen! ${cls.length}-féle lap van, a szemben lévők egyformák.`
                    : 'Számold meg a színeket! Ahány szín, annyiféle lap.'}
                </div>
              )}
            </div>
          )}
        </div>
      </TheorySection>

      <TheorySection title="8. Labor II: Építs téglatestet!" badge="Labor" badgeColor="emerald">
        <div className="bg-white border-2 border-emerald-200 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
          <div className="text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 border-2 border-emerald-400 text-emerald-900 font-black text-lg">Építs téglatestet {goal} kis kockából!</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div className="space-y-2">
              <Stepper label="egy sorban" value={l} min={1} max={MAX.l} onChange={(v) => { setL(v); setMsg(null); }} />
              <Stepper label="sorok" value={d} min={1} max={MAX.d} onChange={(v) => { setD(v); setMsg(null); }} />
              <Stepper label="rétegek" value={h} min={1} max={MAX.h} onChange={(v) => { setH(v); setMsg(null); }} />
              <div className="text-center text-sm font-bold text-slate-700">
                {l} · {d} = {l * d} egy rétegben, {h} réteg: {n} kocka
              </div>
            </div>
            <svg viewBox="0 0 220 180" className="w-full max-w-[260px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
              <FitBuilding plan={cuboidPlan(l, d, h)} x={6} y={6} w={208} h={168} maxU={34} color="#22c55e" />
            </svg>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <button onClick={check} className={`${btn} bg-emerald-600 text-white`}>
              Ellenőrzés
            </button>
            <button onClick={newGoal} className={`${btn} bg-slate-200 text-slate-700`}>
              Új feladat
            </button>
          </div>
          {msg && <div className={`rounded-xl p-3 text-center text-sm font-bold ${msg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{msg.text}</div>}
          <div className="text-center text-sm text-slate-700">
            Megtalált téglatestek: <strong>{found.length}</strong> / {all.length} {found.length > 0 && <span className="font-bold">({found.join(', ')})</span>}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CuboidG3Theory;
