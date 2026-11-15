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
  BasisVectorsIntroSvg,
  GridVectorsReadingSvg,
  EqualPositionVectorsSvg,
  CoordinateOperationsSvg,
  VectorRotationSvg,
  VectorLengthSvg,
  CVGrid,
  CVPoint,
  CVVec
} from './CoordinateVectorsFigures';

const num = (x: number) => {
  const r = Math.round(x * 100) / 100;
  return String(r).replace('.', ',').replace('-', '−');
};
const fmt = (x: number, d = 2) => {
  if (!Number.isFinite(x)) return '–';
  const s = x.toFixed(d);
  return (Number(s) === 0 ? (0).toFixed(d) : s).replace('.', ',').replace('-', '−');
};
/** Négyzetgyök egyszerűsített alakban: √n = k√m. */
const sqrtText = (n: number) => {
  if (!Number.isInteger(n) || n < 0) return `√${num(n)}`;
  if (n === 0) return '0';
  let k = 1;
  for (let f = 2; f * f <= n; f++) if (n % (f * f) === 0) k = f;
  const m = n / (k * k);
  if (m === 1) return String(k);
  return k === 1 ? `√${m}` : `√${n} = ${k}√${m}`;
};
const sq = (x: number) => (x < 0 ? `(${num(x)})²` : `${num(x)}²`);

type Op = 'sum' | 'diff' | 'scalar' | 'rotP' | 'rotM';

export const CoordinateVectorsTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: két pont és a köztük lévő vektor
  const [A, setA] = useState<CVPoint>([1, 2]);
  const [B, setB] = useState<CVPoint>([2, 5]);
  const [mode, setMode] = useState<'A' | 'B'>('B');
  const [showPos, setShowPos] = useState<boolean>(false);

  // Labor II: műveletek koordinátákkal
  const [u1, setU1] = useState<number>(1);
  const [u2, setU2] = useState<number>(3);
  const [v1, setV1] = useState<number>(3);
  const [v2, setV2] = useState<number>(-1);
  const [op, setOp] = useState<Op>('sum');
  const [c, setC] = useState<number>(2);

  // ---- Labor I ----
  const d1 = B[0] - A[0];
  const d2 = B[1] - A[1];
  const lenSq = d1 * d1 + d2 * d2;
  const len = Math.sqrt(lenSq);
  const lab1Vectors: CVVec[] = [
    ...(showPos
      ? [
          { from: [0, 0] as CVPoint, to: A, label: 'a', color: '#94a3b8', side: 1 as const },
          { from: [0, 0] as CVPoint, to: B, label: 'b', color: '#94a3b8', side: -1 as const }
        ]
      : []),
    ...(d1 !== 0 || d2 !== 0
      ? [{ from: [0, 0] as CVPoint, to: [d1, d2] as CVPoint, label: 'helyvektor', color: '#f59e0b', dashed: true, side: 1 as const, plain: true, at: 0.6 }]
      : []),
    { from: A, to: B, label: '→AB', color: '#2563eb', side: -1, offset: 16 }
  ];

  // ---- Labor II ----
  const result: CVPoint =
    op === 'sum'
      ? [u1 + v1, u2 + v2]
      : op === 'diff'
        ? [u1 - v1, u2 - v2]
        : op === 'scalar'
          ? [c * u1, c * u2]
          : op === 'rotP'
            ? [-u2, u1]
            : [u2, -u1];
  const usesV = op === 'sum' || op === 'diff';
  const opName: Record<Op, string> = {
    sum: '→u + →v',
    diff: '→u − →v',
    scalar: `${num(c)} · →u`,
    rotP: '→u +90°-os elforgatottja',
    rotM: '→u −90°-os elforgatottja'
  };
  const opFormula: Record<Op, string> = {
    sum: `(${num(u1)} + ${num(v1)}; ${num(u2)} + ${num(v2)})`,
    diff: `(${num(u1)} − ${v1 < 0 ? `(${num(v1)})` : num(v1)}; ${num(u2)} − ${v2 < 0 ? `(${num(v2)})` : num(v2)})`,
    scalar: `(${num(c)} · ${u1 < 0 ? `(${num(u1)})` : num(u1)}; ${num(c)} · ${u2 < 0 ? `(${num(u2)})` : num(u2)})`,
    rotP: `(−u₂; u₁) = (${num(-u2)}; ${num(u1)})`,
    rotM: `(u₂; −u₁) = (${num(u2)}; ${num(-u1)})`
  };
  const pts2: CVPoint[] = [[0, 0], [u1, u2], result, ...(usesV ? [[v1, v2] as CVPoint] : [])];
  if (op === 'sum') pts2.push([u1 + v1, u2 + v2]);
  if (op === 'diff') pts2.push([-v1, -v2]);
  const xs = pts2.map((p) => p[0]);
  const ys = pts2.map((p) => p[1]);
  const gx0 = Math.min(-1, Math.floor(Math.min(...xs)) - 1);
  const gx1 = Math.max(1, Math.ceil(Math.max(...xs)) + 1);
  const gy0 = Math.min(-1, Math.floor(Math.min(...ys)) - 1);
  const gy1 = Math.max(1, Math.ceil(Math.max(...ys)) + 1);
  const cell2 = Math.max(9, Math.min(30, Math.floor(Math.min(380 / (gx1 - gx0), 320 / (gy1 - gy0)))));
  const lab2Vectors: CVVec[] = [
    { from: [0, 0], to: [u1, u2], label: 'u', color: '#2563eb', side: -1 },
    ...(usesV ? [{ from: [0, 0] as CVPoint, to: [v1, v2] as CVPoint, label: 'v', color: '#059669', side: 1 as const }] : []),
    ...(op === 'sum'
      ? [{ from: [u1, u2] as CVPoint, to: [u1 + v1, u2 + v2] as CVPoint, color: '#059669', dashed: true }]
      : []),
    ...(op === 'diff'
      ? [{ from: [u1, u2] as CVPoint, to: [u1 - v1, u2 - v2] as CVPoint, label: '−v', color: '#059669', dashed: true, side: 1 as const }]
      : []),
    { from: [0, 0], to: result, label: 'w', color: '#dc2626', side: 1, at: 0.7 }
  ];
  const resLenSq = result[0] * result[0] + result[1] * result[1];

  return (
    <TheoryTemplate
      topicId="g11-koordinatageometria"
      subtopicId="vektorok-a-koordinata-rendszerben"
      title="5. Vektorok a koordináta-rendszerben"
      subtitle="Bázisvektorok, vektor koordinátái, helyvektor – műveletek, 90°-os elforgatás és a vektor hossza koordinátákkal."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • TANANYAG"
      themeColor="blue"
      pdfFilename="11_osztaly_vektorok_koordinata_rendszerben_tananyag.pdf"
      practiceTitle="Készen állsz a vektorkoordinátás feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — VEKTOROK KOORDINÁTÁI',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
              <span className="font-mono text-base font-black text-blue-900 dark:text-blue-200">
                A(a₁; a₂), B(b₁; b₂) ⇒ →AB(b₁ − a₁; b₂ − a₂)
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                →a = a₁→i + a₂→j ⇔ →a(a₁; a₂); egy pont koordinátái megegyeznek a helyvektora koordinátáival.
              </li>
              <li>
                Összeg, különbség, számszoros: <strong>koordinátánként</strong> számolunk; +90°-os elforgatás: (v₁; v₂) → (−v₂; v₁).
              </li>
              <li>
                Hossz: <strong>|→v| = √(v₁² + v₂²)</strong> – a Pitagorasz-tétel a koordináták alkotta derékszögű háromszögben.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: vektorok felbontása →i és →j irányban" badge="Tankönyv 226. o." badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Adott a síkon az egymásra merőleges →i és →j <strong>egységvektor</strong> (hosszuk 1). Állítsuk elő a rácspontok között lévő vektorokat →i és →j irányú összetevők segítségével – az előző lecke felbontási tétele szerint ez mindig egyértelműen sikerül!
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>→a ∥ →i: <strong>→a = 3→i + 0→j</strong>, végpontja A(3; 0)</li>
              <li>→b ∥ →j: <strong>→b = 0→i − 2→j</strong>, végpontja B(0; −2)</li>
              <li>→c = →a + →b: <strong>→c = 3→i − 2→j</strong>, végpontja C(3; −2)</li>
              <li>→d: 2-szer →i-vel szemben, 3-szor →j irányban: <strong>→d = −2→i + 3→j</strong>, végpontja D(−2; 3)</li>
            </ul>
            <p>
              A vektorokat közös kezdőpontból (az origóból) rajzolva észrevehetjük: <strong>az →i és →j együtthatói megegyeznek a végpont koordinátáival.</strong>
            </p>
          </div>
          <BasisVectorsIntroSvg />
        </div>
      </TheorySection>

      {/* 2. Elmélet */}
      <TheorySection title="2. Elmélet: bázis, koordináták, helyvektor" badge="Elmélet" badgeColor="indigo">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="Bázisvektorok" badge="Definíció" badgeColor="blue">
            <p className="text-sm text-slate-700 leading-relaxed">
              Az origóból az (1; 0) pontba mutató <strong>→i</strong> és a (0; 1) pontba mutató <strong>→j</strong> egységvektorok a <strong>bázisvektorok</strong>; azt mondjuk, bázist (bázisrendszert) alkotnak.
            </p>
          </TheoryCard>
          <TheoryCard title="Vektor koordinátái" badge="Definíció" badgeColor="purple">
            <p className="text-sm text-slate-700 leading-relaxed">
              A sík bármely →a vektora egyértelműen felírható <strong>→a = a₁→i + a₂→j</strong> alakban. Az együtthatók az →a <strong>koordinátái</strong>: →a(a₁; a₂).
            </p>
          </TheoryCard>
          <TheoryCard title="Helyvektor" badge="Definíció" badgeColor="emerald">
            <p className="text-sm text-slate-700 leading-relaxed">
              Az A(a₁; a₂) pont <strong>helyvektora</strong> az origóból az A pontba mutató vektor. Egy pont koordinátái megegyeznek a helyvektora koordinátáival: →a(a₁; a₂).
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Kidolgozott feladat */}
      <TheorySection title="3. Kidolgozott feladat: koordináták leolvasása és műveletek" badge="Tankönyv 227. o." badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <GridVectorsReadingSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>a)</strong> Olvassuk le a kezdő- és végpontokat, és adjuk meg a vektorokkal egyenlő helyvektorok koordinátáit!
            </p>
            <TheoryTable
              headers={['Vektor', 'Kezdőpont', 'Végpont', 'Helyvektor']}
              rows={[
                ['→p = →AB', 'A(1; 2)', 'B(2; 5)', '(1; 3)'],
                ['→q = →CD', 'C(3; 3)', 'D(6; 2)', '(3; −1)'],
                ['→r = →FE', 'F(2; −2)', 'E(−1; −1)', '(−3; 1)'],
                ['→s = →GO', 'G(−3; 1)', 'O(0; 0)', '(3; −1)']
              ]}
            />
            <p>
              <strong>Megfigyelés:</strong> a vektor koordinátái a <strong>végpont és a kezdőpont</strong> megfelelő koordinátáinak különbségei.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <EqualPositionVectorsSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p><strong>b)</strong> Hosszak és irányok:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Mind a négy vektor egy olyan derékszögű háromszög átfogója, amelynek befogói 1 és 3 egység: hosszuk <strong>√(1² + 3²) = √10</strong>.</li>
              <li>→q, →s és →r párhuzamos; koordinátáik egymás 1- vagy −1-szeresei. →q és →s egyirányú, →r ellentétes irányú: <strong>→q = →s = −→r</strong>.</li>
              <li>→p mindhárom vektorra merőleges: koordinátáit megkapjuk, ha →q koordinátáit felcseréljük, és az egyik előjelét megváltoztatjuk.</li>
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <CoordinateOperationsSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p><strong>c)</strong> Műveletek – rajzzal és koordinátákkal:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>→p + →q = (1 + 3; 3 + (−1)) = <strong>(4; 2)</strong></li>
              <li>→p − →s = (1 − 3; 3 − (−1)) = <strong>(−2; 4)</strong></li>
              <li>2→r = (2 · (−3); 2 · 1) = <strong>(−6; 2)</strong></li>
            </ul>
            <p>A rajzról leolvasott eredmény megegyezik a koordinátákkal végzett számolás eredményével.</p>
          </div>
        </div>
      </TheorySection>

      {/* 4. Összefoglaló elmélet */}
      <TheorySection title="4. Elmélet: műveletek, elforgatás, hossz" badge="Elmélet" badgeColor="indigo">
        <TheoryTable
          headers={['Művelet', 'Koordinátákkal (→a(a₁; a₂), →b(b₁; b₂), c ∈ ℝ)']}
          rows={[
            ['→AB, ha A(a₁; a₂), B(b₁; b₂)', '(b₁ − a₁; b₂ − a₂) – végpont mínusz kezdőpont'],
            ['Két vektor összege', '→a + →b(a₁ + b₁; a₂ + b₂)'],
            ['Két vektor különbsége', '→a − →b(a₁ − b₁; a₂ − b₂)'],
            ['Vektor számszorosa', 'c · →a(c · a₁; c · a₂)'],
            ['+90°-os elforgatás', '(v₁; v₂) → (−v₂; v₁)'],
            ['−90°-os elforgatás', '(v₁; v₂) → (v₂; −v₁)'],
            ['Vektor hossza', '|→v| = √(v₁² + v₂²)'],
            ['→AB hossza', '|→AB| = √((b₁ − a₁)² + (b₂ − a₂)²)']
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <VectorRotationSvg />
          <VectorLengthSvg />
        </div>
        <TheoryCallout type="info" title="A hossz negatív koordinátákkal">
          Az →r = →FE(−3; 1) esetén a derékszögű háromszög befogói a koordináták abszolút értékei: |→r| = √((−3)² + 1²) = √10. A →v(−2; −7) vektorra: |→v| = √((−2)² + (−7)²) = √53 ≈ 7,28.
        </TheoryCallout>
      </TheorySection>

      {/* 5. Feladatok eredményei */}
      <TheorySection title="5. Kidolgozott tankönyvi feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Párhuzamos, fele olyan hosszú vektorok" badge="2. feladat" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>a)</strong> →u = 6→i = (6; 0) ⇒ ±½→u: <strong>(3; 0)</strong> és <strong>(−3; 0)</strong>.</li>
              <li><strong>b)</strong> →u = 2→i − 4→j = (2; −4) ⇒ <strong>(1; −2)</strong> és <strong>(−1; 2)</strong>.</li>
              <li>Párhuzamos vektor: a koordináták ugyanazzal a (pozitív vagy negatív) számmal szorzódnak.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Merőleges, háromszor olyan hosszú vektorok" badge="3. feladat" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>a)</strong> →v = →i + →j = (1; 1) ⇒ elforgatva (−1; 1), háromszorozva: <strong>(−3; 3)</strong> és <strong>(3; −3)</strong>.</li>
              <li><strong>b)</strong> →v(−1; 2) ⇒ elforgatva (−2; −1), háromszorozva: <strong>(−6; −3)</strong> és <strong>(6; 3)</strong>.</li>
              <li>Mindkét irány jó: a +90°-os és a −90°-os elforgatott is merőleges.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) →u = →i − 5→j és →v = 2→i + →j" badge="4. feladat" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>→u + →v = (3; −4), hossza √(9 + 16) = <strong>5</strong></li>
              <li>→u − →v = (−1; −6), hossza <strong>√37 ≈ 6,08</strong></li>
              <li>→v − →u = (1; 6), hossza szintén <strong>√37</strong> – ellentett vektorok hossza egyenlő.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Házi feladatok eredményei" badge="Ellenőrzés" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>HF 1.</strong> →a(3; −4), →b(12; 5), →c(−20; −21): hosszuk 5, 13, 29; →a + →b = (15; 1), →a − →c = (23; 17).</li>
              <li><strong>HF 2.</strong> Párhuzamos, kétszeres: a) (0; ±6); b) ±(2; −6); c) (±8; 0); d) ±(2; −2).</li>
              <li><strong>HF 3.</strong> Merőleges, kétszeres: a) (±6; 0); b) ±(6; 2); c) (0; ±8); d) ±(2; 2).</li>
              <li><strong>HF 4.</strong> →a = 5→i − 12→j, →b = 4→i − 3→j: →a + →b = (9; −15), 3→a = (15; −36), 2→b − →a = (3; 6); |→a| = 13, |→b| = 5, |→a + →b| = √306 = 3√34 ≈ 17,49.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: fordított kivonás, rossz négyzetre emelés" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Végpont mínusz kezdőpont – és a negatív szám négyzete pozitív!"
          wrong="A(1; 2), B(2; 5) ⇒ →AB = (1 − 2; 2 − 5) = (−1; −3); illetve |→v(−2; −7)| = √(−2² − 7²)"
          wrongExplanation="A kezdőpontból kivont végpont a →BA vektort adja (ellentétes irány). A hossz képletében a koordináták négyzetei szerepelnek: (−2)² = 4, nem −4 – a gyök alatt sosem lehet negatív szám."
          correct="→AB = (2 − 1; 5 − 2) = (1; 3), |→v| = √((−2)² + (−7)²) = √53"
          correctExplanation="Mindig a VÉGPONT koordinátáiból vonjuk ki a KEZDŐPONT koordinátáit. A hossz nem függ az iránytól: |→AB| = |→BA| = √10."
          tip="Ellenőrzés: a rácson számold meg, hány egységet lépsz jobbra (+) vagy balra (−), illetve fel (+) vagy le (−) a kezdőponttól a végpontig."
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: Pontok, vektor, hossz a rácson" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setMode('A')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${mode === 'A' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                >
                  Kattintás: A pont áthelyezése
                </button>
                <button
                  onClick={() => setMode('B')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${mode === 'B' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                >
                  Kattintás: B pont áthelyezése
                </button>
                <button
                  onClick={() => setShowPos((s) => !s)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  {showPos ? 'Helyvektorok elrejtése' : 'A és B helyvektora'}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'A első koordinátája', val: A[0], set: (x: number) => setA([x, A[1]]) },
                  { label: 'A második koordinátája', val: A[1], set: (y: number) => setA([A[0], y]) },
                  { label: 'B első koordinátája', val: B[0], set: (x: number) => setB([x, B[1]]) },
                  { label: 'B második koordinátája', val: B[1], set: (y: number) => setB([B[0], y]) }
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      {f.label}: {num(f.val)}
                    </label>
                    <input
                      type="range"
                      min="-6"
                      max="6"
                      value={f.val}
                      onChange={(e) => f.set(Number(e.target.value))}
                      className="w-full accent-blue-600"
                      aria-label={f.label}
                    />
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div>
                  A({num(A[0])}; {num(A[1])}), B({num(B[0])}; {num(B[1])})
                </div>
                <div>
                  →AB = ({num(B[0])} − {A[0] < 0 ? `(${num(A[0])})` : num(A[0])}; {num(B[1])} − {A[1] < 0 ? `(${num(A[1])})` : num(A[1])}) = <strong>({num(d1)}; {num(d2)})</strong>
                </div>
                <div>
                  |→AB| = √({sq(d1)} + {sq(d2)}) = √{lenSq}
                  {Number.isInteger(len) ? ` = ${len}` : ` ≈ ${fmt(len)}`}
                </div>
                {showPos && <div className="text-xs text-slate-500">→AB = →b − →a: a végpont helyvektorából kivonjuk a kezdőpont helyvektorát.</div>}
              </div>
              <p className="text-xs text-slate-500 italic">
                Kattints a rácsra a kijelölt pont áthelyezéséhez! A szaggatott narancs vektor a →AB-vel egyenlő helyvektor – végpontja éppen ({num(d1)}; {num(d2)}).
              </p>
            </div>
            <CVGrid
              x0={-6}
              x1={6}
              y0={-6}
              y1={6}
              cell={28}
              axes
              ticks
              className="w-full h-auto bg-slate-50 rounded-xl select-none"
              onGridClick={(p) => (mode === 'A' ? setA(p) : setB(p))}
              polygons={
                d1 !== 0 && d2 !== 0
                  ? [{ pts: [A, [B[0], A[1]], B], fill: 'rgba(250,204,21,0.15)', stroke: '#eab308' }]
                  : []
              }
              rightAngles={d1 !== 0 && d2 !== 0 ? [{ at: [B[0], A[1]], p: A, q: B }] : []}
              vectors={lab1Vectors}
              points={[
                { at: A, label: 'A', color: mode === 'A' ? '#dc2626' : '#0f172a', dx: -12, dy: 14 },
                { at: B, label: 'B', color: mode === 'B' ? '#dc2626' : '#0f172a', dx: 6, dy: -6 }
              ]}
            />
          </div>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: Műveletek koordinátákkal" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'u₁', val: u1, set: setU1, accent: 'accent-blue-600' },
                  { label: 'u₂', val: u2, set: setU2, accent: 'accent-blue-600' },
                  { label: 'v₁', val: v1, set: setV1, accent: 'accent-emerald-600' },
                  { label: 'v₂', val: v2, set: setV2, accent: 'accent-emerald-600' }
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      {f.label} = {num(f.val)}
                    </label>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      value={f.val}
                      onChange={(e) => f.set(Number(e.target.value))}
                      className={`w-full ${f.accent}`}
                      aria-label={f.label}
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ['sum', '→u + →v'],
                    ['diff', '→u − →v'],
                    ['scalar', 'c · →u'],
                    ['rotP', '+90°'],
                    ['rotM', '−90°']
                  ] as [Op, string][]
                ).map(([k, name]) => (
                  <button
                    key={k}
                    onClick={() => setOp(k)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${op === k ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'}`}
                  >
                    {name}
                  </button>
                ))}
              </div>
              {op === 'scalar' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">c = {num(c)}</label>
                  <input
                    type="range"
                    min="-3"
                    max="3"
                    step="0.5"
                    value={c}
                    onChange={(e) => setC(Number(e.target.value))}
                    className="w-full accent-rose-600"
                    aria-label="c szorzó"
                  />
                </div>
              )}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div>
                  →u({num(u1)}; {num(u2)}){usesV ? `, →v(${num(v1)}; ${num(v2)})` : ''}
                </div>
                <div>
                  →w = {opName[op]} = {opFormula[op]} = <strong>({num(result[0])}; {num(result[1])})</strong>
                </div>
                <div>
                  |→w| = √({sq(result[0])} + {sq(result[1])}) = {sqrtText(resLenSq)}
                  {Number.isInteger(Math.sqrt(resLenSq)) ? '' : ` ≈ ${fmt(Math.sqrt(resLenSq))}`}
                </div>
                {(op === 'rotP' || op === 'rotM') && (
                  <div className="text-xs text-slate-500">
                    Az elforgatott vektor hossza nem változik: |→u| = {fmt(Math.hypot(u1, u2))}.
                  </div>
                )}
              </div>
            </div>
            <CVGrid
              x0={gx0}
              x1={gx1}
              y0={gy0}
              y1={gy1}
              cell={cell2}
              axes
              className="w-full h-auto bg-slate-50 rounded-xl"
              rightAngles={(op === 'rotP' || op === 'rotM') && (u1 !== 0 || u2 !== 0) ? [{ at: [0, 0], p: [u1, u2], q: result }] : []}
              vectors={lab2Vectors}
            />
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CoordinateVectorsTheory;
