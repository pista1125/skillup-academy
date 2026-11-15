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
  VerticalLineCircleSvg,
  RightTriangleCircumcircleSvg,
  BridgeArcSvg,
  TangentCountSvg,
  LineCirclePositionsSvg,
  RadioRangeSvg,
  CircleProblemsPlane,
  circleTangentPoints,
  circleProblemsLineThrough,
  circleProblemsTangentAt,
  CP_BLUE,
  CP_RED,
  CP_GREEN,
  CP_AMBER,
  CP_PURPLE
} from './CircleProblemsFigures';

const fmt = (x: number, d = 2) => {
  if (!Number.isFinite(x)) return '–';
  const s = Number(x.toFixed(d)).toString();
  return (Number(s) === 0 ? '0' : s).replace('.', ',').replace('-', '−');
};
const sqTerm = (name: string, c: number) =>
  Math.abs(c) < 1e-9 ? `${name}²` : c > 0 ? `(${name} − ${fmt(c)})²` : `(${name} + ${fmt(-c)})²`;
const lineLabel = (m: number, b: number) => {
  const mPart = Math.abs(m) < 1e-9 ? '' : Math.abs(m - 1) < 1e-9 ? 'x' : Math.abs(m + 1) < 1e-9 ? '−x' : `${fmt(m)}x`;
  if (!mPart) return `y = ${fmt(b)}`;
  const bPart = Math.abs(b) < 1e-9 ? '' : b > 0 ? ` + ${fmt(b)}` : ` − ${fmt(-b)}`;
  return `y = ${mPart}${bPart}`;
};
const EPS = 1e-9;

export const CircleProblemsTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: egyenes és kör
  const [u, setU] = useState<number>(0);
  const [v, setV] = useState<number>(0);
  const [r, setR] = useState<number>(5);
  const [vertical, setVertical] = useState<boolean>(false);
  const [m, setM] = useState<number>(1);
  const [b, setB] = useState<number>(1);
  const [c, setC] = useState<number>(3.5);

  // Labor II: érintők egy pontból
  const [S, setS] = useState<[number, number]>([2, 5]);
  const cu = -1;
  const cv = 1.5;
  const cr2 = 16.25;
  const cr = Math.sqrt(cr2);

  // ---- Labor I számítások ----
  let qa = 0;
  let qb = 0;
  let qc = 0;
  let disc = 0;
  let pts: [number, number][] = [];
  let dist = 0;
  if (!vertical) {
    const k = b - v;
    qa = 1 + m * m;
    qb = 2 * (m * k - u);
    qc = u * u + k * k - r * r;
    disc = qb * qb - 4 * qa * qc;
    dist = Math.abs(m * u - v + b) / Math.sqrt(1 + m * m);
    if (disc > EPS) {
      const s = Math.sqrt(disc);
      pts = [(-qb + s) / (2 * qa), (-qb - s) / (2 * qa)].map((x) => [x, m * x + b] as [number, number]);
    } else if (Math.abs(disc) <= EPS) {
      const x = -qb / (2 * qa);
      pts = [[x, m * x + b]];
    }
  } else {
    const rest = r * r - (c - u) ** 2;
    disc = rest;
    dist = Math.abs(c - u);
    if (rest > EPS) pts = [[c, v + Math.sqrt(rest)], [c, v - Math.sqrt(rest)]];
    else if (Math.abs(rest) <= EPS) pts = [[c, v]];
  }
  const count = pts.length;

  // ---- Labor II számítások ----
  const d2 = (S[0] - cu) ** 2 + (S[1] - cv) ** 2;
  const tPts = circleTangentPoints(cu, cv, cr, S[0], S[1]);
  const sRel = Math.abs(d2 - cr2) < 1e-9 ? 'on' : d2 < cr2 ? 'in' : 'out';
  const tangentLines =
    sRel === 'on'
      ? [circleProblemsTangentAt(cu, cv, S[0], S[1], { color: CP_AMBER, width: 2 })]
      : sRel === 'out'
        ? tPts.map((t) => circleProblemsLineThrough(S, t, { color: CP_GREEN, width: 2 }))
        : [];
  const onTangent = sRel === 'on' ? tangentLines[0] : null;

  return (
    <TheoryTemplate
      topicId="g11-koordinatageometria"
      subtopicId="korrel-kapcsolatos-feladatok"
      title="12. Körrel kapcsolatos feladatok"
      subtitle="Kör és egyenes közös pontjai egyenletrendszerrel, derékszögű háromszög köré írt köre, érintők egy pontból – körző és vonalzó nélkül."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • TANANYAG"
      themeColor="blue"
      pdfFilename="11_osztaly_korrel_kapcsolatos_feladatok_tananyag.pdf"
      practiceTitle="Készen állsz a körrel kapcsolatos feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — KÖR ÉS EGYENES KÖZÖS PONTJAI',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
              <span className="font-mono text-base font-black text-blue-900 dark:text-blue-200">
                kör egyenlete + egyenes egyenlete ⇒ másodfokú egyenlet
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Az egyenes egyenletéből az egyik ismeretlent a kör egyenletébe helyettesítjük; a kapott másodfokú egyenlet megoldásai adják a közös pontokat.</li>
              <li>
                Diszkrimináns &gt; 0: <strong>2 közös pont</strong> (szelő); = 0: <strong>1 közös pont</strong> (érintő); &lt; 0: <strong>nincs közös pont</strong>.
              </li>
              <li>Körön belüli pontból 0, körön lévő pontból 1, körön kívüli pontból 2 érintő húzható. Az érintő merőleges az érintési pontba húzott sugárra.</li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. KF 1 */}
      <TheorySection title="1. Kidolgozott feladat: a kör pontjai, amelyek első koordinátája 3,5" badge="Tankönyv 246. o." badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              Melyek az <strong>(x − 2)² + (y − 1)² = 8,5</strong> egyenletű kör azon pontjai, amelyeknek az első koordinátája 3,5?
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>A P(3,5; y) pont pontosan akkor van a körön, ha y megoldása a (3,5 − 2)² + (y − 1)² = 8,5 egyenletnek.</li>
              <li>A négyzetre emelések után: 2,25 + y² − 2y + 1 = 8,5, nullára rendezve <strong>y² − 2y − 5,25 = 0</strong>.</li>
              <li>A megoldóképlettel: y = (2 ± √25) / 2 ⇒ <strong>y = 3,5</strong> vagy <strong>y = −1,5</strong>.</li>
              <li>Két ilyen pont van: <strong>P₁(3,5; 3,5)</strong> és <strong>P₂(3,5; −1,5)</strong>.</li>
            </ul>
            <TheoryCallout type="info" title="Megjegyzés">
              Egy kör és egy (y tengellyel párhuzamos) egyenes közös pontjait határoztuk meg körző és vonalzó nélkül: az (x − 2)² + (y − 1)² = 8,5 és x = 3,5 egyenletrendszer megoldáshalmaza {'{'}(3,5; −1,5); (3,5; 3,5){'}'}.
            </TheoryCallout>
          </div>
          <VerticalLineCircleSvg />
        </div>
      </TheorySection>

      {/* 2. KF 2 */}
      <TheorySection title="2. Kidolgozott feladat: derékszögű háromszög köré írt köre" badge="Kidolgozott feladat" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <RightTriangleCircumcircleSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>Adott az ABC háromszög: A(−5; 2), B(3; 1), C(1; −2).</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>a)</strong> →AB(8; −1), AB = √65; →AC(6; −4), AC = √52; →BC(−2; −3), BC = √13.</li>
              <li>52 + 13 = 65, tehát a Pitagorasz-tétel megfordítása miatt a háromszög <strong>derékszögű</strong>; az átfogó AB, a derékszög a <strong>C</strong> csúcsnál van.</li>
              <li><strong>b)</strong> A köré írt kör középpontja az átfogó felezőpontja (Thalész-tétel): F((−5 + 3)/2; (2 + 1)/2) = <strong>F(−1; 1,5)</strong>.</li>
              <li>A sugár az átfogó fele: r = √65 / 2, r² = 65 / 4 = 16,25.</li>
              <li>A körülírt kör egyenlete: <strong>(x + 1)² + (y − 1,5)² = 16,25</strong>.</li>
            </ul>
          </div>
        </div>
      </TheorySection>

      {/* 3. Egyenes és kör */}
      <TheorySection title="3. Egyenes és kör kölcsönös helyzete" badge="Módszer" badgeColor="teal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <LineCirclePositionsSvg />
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <TheoryTable
              headers={['Egyenletrendszer', 'Másodfokú egyenlet', 'Közös pontok']}
              rows={[
                ['x² + y² = 25, y = x + 1', 'x² + x − 12 = 0, D = 49 > 0', '(3; 4) és (−4; −3) – szelő'],
                ['x² + y² = 25, y = 5', 'x² = 0, D = 0', 'csak (0; 5) – érintő'],
                ['x² + y² = 25, y = x + 8', '2x² + 16x + 39 = 0, D = −56 < 0', 'nincs közös pont']
              ]}
            />
            <TheoryCallout type="tip" title="Gyors ellenőrzés távolsággal">
              Az egyenes akkor szelő, ha a kör középpontjától mért távolsága kisebb a sugárnál; érintő, ha egyenlő vele; és nincs közös pontjuk, ha nagyobb. Az x = c alakú egyenesnél ez a távolság egyszerűen |c − u|.
            </TheoryCallout>
          </div>
        </div>
      </TheorySection>

      {/* 4. Érintők */}
      <TheorySection title="4. Érintők egy adott pontból" badge="2. feladat" badgeColor="purple">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              Hány érintője van az <strong>(x + 1)² + (y − 1,5)² = 16,25</strong> egyenletű körnek, amely átmegy a P(−3; 4,5), a Q(−5; 1), illetve az S(2; 5) ponton?
            </p>
            <TheoryTable
              headers={['Pont', '(x + 1)² + (y − 1,5)²', 'Helyzet', 'Érintők']}
              rows={[
                ['P(−3; 4,5)', '4 + 9 = 13 < 16,25', 'a körön belül', '0'],
                ['Q(−5; 1)', '16 + 0,25 = 16,25', 'a körön', '1'],
                ['S(2; 5)', '9 + 12,25 = 21,25 > 16,25', 'a körön kívül', '2']
              ]}
            />
            <TheoryCallout type="info" title="Az érintő a kör egy pontjában">
              Az érintő merőleges az érintési pontba húzott sugárra. Például az x² + y² = 25 kör (3; 4) pontjában a sugár meredeksége 4/3, az érintőé −3/4: <strong>y = −0,75x + 6,25</strong>.
            </TheoryCallout>
          </div>
          <TangentCountSvg />
        </div>
      </TheorySection>

      {/* 5. Feladatok */}
      <TheorySection title="5. Tankönyvi feladatok – megoldásokkal" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) A vasúti híd íve" badge="1. feladat" badgeColor="sky">
            <BridgeArcSvg className="w-full h-auto mb-2" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Az ív az x² + (y + 32)² = 1600 kör része: <strong>a)</strong> r = √1600 = <strong>40 m</strong>, a középpont (0; −32).</li>
              <li><strong>b)</strong> y = 0: x² = 1600 − 1024 = 576 ⇒ <strong>P(−24; 0), Q(24; 0)</strong>; x = 0: (y + 32)² = 1600 ⇒ <strong>R(0; 8)</strong>.</li>
              <li><strong>c)</strong> Ha az egyik oszlop a középen áll (x = 0), az a leghosszabb: <strong>8 m</strong>. A többi x = ±6, ±12, ±18 m-nél: y = √(1600 − x²) − 32 ≈ 7,55; 6,16; <strong>3,72 m</strong> (ez a legrövidebb).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Az y tengelyt érintő kör" badge="3. feladat" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>C(−5; −3), a kör érinti az y tengelyt ⇒ a sugár a középpont távolsága az y tengelytől: <strong>r = 5</strong>.</li>
              <li><strong>a)</strong> (x + 5)² + (y + 3)² = 25</li>
              <li><strong>b)</strong> y = −6: (x + 5)² + 9 = 25 ⇒ x + 5 = ±4 ⇒ <strong>(−1; −6) és (−9; −6)</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Házi feladatok" badge="Ellenőrzés" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>HF 1.</strong> A(7; 6), B(−1; −3), C(−3; 2): AB² = 145, AC² = 116, BC² = 29, 116 + 29 = 145 ⇒ derékszög C-nél. Körülírt kör: (x − 3)² + (y − 1,5)² = 36,25. Hegyesszögek: tg α = √29 / √116 = 0,5 ⇒ α ≈ 26,57°, β ≈ 63,43°; terület: √116 · √29 / 2 = 29.</li>
              <li><strong>HF 2.</strong> Az AB szakasz (A(−1; 0), B(4; 3)) a Thalész-kör pontjaiból látszik derékszögben: (x − 1,5)² + (y − 1,5)² = 8,5. A tengelyeken: <strong>(4; 0), (0; 4), (0; −1)</strong> (a (−1; 0) maga az A pont).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) A rádióadó hatóköre" badge="HF 3." badgeColor="rose">
            <RadioRangeSvg className="w-full h-auto max-w-xs mx-auto mb-2" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A vétel feltétele: (x + 3)² + (y − 2)² ≤ 225.</li>
              <li>A: 157, D: 221 ⇒ fogható; C(6; −10) és F(9; 11): pontosan 225 ⇒ a hatókör határán (fogható).</li>
              <li>B(9; −11): 313, E(−9; 16): 232 ⇒ <strong>nem fogható</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: elveszett megoldás a gyökvonásnál" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Csak a pozitív gyököt vesszük figyelembe"
          wrong="(3,5 − 2)² + (y − 1)² = 8,5 ⇒ (y − 1)² = 6,25 ⇒ y − 1 = 2,5 ⇒ csak P(3,5; 3,5)"
          wrongExplanation="Egy szám négyzete 6,25, ha a szám 2,5 VAGY −2,5. Az egyik megoldást elhagyva a kör és az egyenes egyik közös pontja elveszik."
          correct="(y − 1)² = 6,25 ⇒ y − 1 = ±2,5 ⇒ y = 3,5 vagy y = −1,5 ⇒ P₁(3,5; 3,5), P₂(3,5; −1,5)"
          correctExplanation="Ugyanezt adja a megoldóképlet is az y² − 2y − 5,25 = 0 egyenletre: y = (2 ± 5) / 2."
          tip="Egyenes és kör közös pontjainál mindig gondold végig: 2, 1 vagy 0 megoldás lehet – a diszkrimináns előjele dönt."
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: egyenes és kör metszéspontjai" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: `u = ${fmt(u)}`, val: u, set: setU, min: -4, max: 4, step: 0.5 },
                  { label: `v = ${fmt(v)}`, val: v, set: setV, min: -4, max: 4, step: 0.5 },
                  { label: `r = ${fmt(r)}`, val: r, set: setR, min: 1, max: 6, step: 0.5 }
                ].map((s) => (
                  <div key={s.label.slice(0, 2)}>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">{s.label}</label>
                    <input type="range" min={s.min} max={s.max} step={s.step} value={s.val} onChange={(e) => s.set(Number(e.target.value))} className="w-full accent-blue-600" aria-label={s.label} />
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setVertical(false)} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${!vertical ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'}`}>y = mx + b</button>
                <button onClick={() => setVertical(true)} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${vertical ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'}`}>x = c</button>
              </div>
              {!vertical ? (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">m = {fmt(m)}</label>
                    <input type="range" min="-3" max="3" step="0.25" value={m} onChange={(e) => setM(Number(e.target.value))} className="w-full accent-rose-600" aria-label="meredekség" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">b = {fmt(b)}</label>
                    <input type="range" min="-9" max="9" step="0.5" value={b} onChange={(e) => setB(Number(e.target.value))} className="w-full accent-rose-600" aria-label="tengelymetszet" />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">c = {fmt(c)}</label>
                  <input type="range" min="-8" max="8" step="0.5" value={c} onChange={(e) => setC(Number(e.target.value))} className="w-full accent-rose-600" aria-label="függőleges egyenes" />
                </div>
              )}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div>Kör: {sqTerm('x', u)} + {sqTerm('y', v)} = {fmt(r * r)}</div>
                <div>Egyenes: {vertical ? `x = ${fmt(c)}` : lineLabel(m, b)}</div>
                {!vertical ? (
                  <>
                    <div>Behelyettesítve: {fmt(qa, 4)}x² {qb < 0 ? '−' : '+'} {fmt(Math.abs(qb), 4)}x {qc < 0 ? '−' : '+'} {fmt(Math.abs(qc), 4)} = 0</div>
                    <div>Diszkrimináns: D = <strong>{fmt(disc, 3)}</strong></div>
                  </>
                ) : (
                  <div>Behelyettesítve: {sqTerm('y', v)} = {fmt(r * r)} − {fmt((c - u) ** 2)} = <strong>{fmt(disc, 3)}</strong></div>
                )}
                <div className="text-xs text-slate-500">A középpont távolsága az egyenestől: d ≈ {fmt(dist, 3)} {dist < r - 1e-9 ? '<' : Math.abs(dist - r) < 1e-9 ? '=' : '>'} r = {fmt(r)}</div>
                <div className={`font-sans font-bold ${count === 2 ? 'text-rose-700' : count === 1 ? 'text-amber-700' : 'text-slate-600'}`}>
                  {count === 2 ? 'Szelő: 2 közös pont' : count === 1 ? 'Érintő: 1 közös pont' : 'Nincs közös pont'}
                  {pts.length > 0 && ': ' + pts.map((p) => `(${fmt(p[0])}; ${fmt(p[1])})`).join(' és ')}
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'x² + y² = 25, y = x + 1', s: () => { setU(0); setV(0); setR(5); setVertical(false); setM(1); setB(1); } },
                  { name: 'x² + y² = 25, y = 5', s: () => { setU(0); setV(0); setR(5); setVertical(false); setM(0); setB(5); } },
                  { name: 'x² + y² = 25, y = x + 8', s: () => { setU(0); setV(0); setR(5); setVertical(false); setM(1); setB(8); } },
                  { name: '1. kidolgozott feladat', s: () => { setU(2); setV(1); setR(Math.sqrt(8.5)); setVertical(true); setC(3.5); } }
                ].map((p) => (
                  <button key={p.name} onClick={p.s} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200">
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
            <CircleProblemsPlane
              xMin={-9}
              xMax={9}
              yMin={-9}
              yMax={9}
              unit={15}
              tickEvery={3}
              className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200"
              circles={[{ cx: u, cy: v, r, color: CP_BLUE, width: 2.2, fill: 'rgba(37,99,235,0.06)' }]}
              lines={[vertical ? { x: c, color: CP_RED, width: 2 } : { m, b, color: CP_RED, width: 2 }]}
              points={[{ x: u, y: v, color: '#0f172a' }, ...pts.map((p) => ({ x: p[0], y: p[1], color: count === 1 ? CP_AMBER : CP_RED }))]}
            />
          </div>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: érintők egy pontból" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              <p className="text-sm text-slate-700">
                Kör: <strong>(x + 1)² + (y − 1,5)² = 16,25</strong> (a 2. kidolgozott feladat köre). Kattints a rácsra az S pont áthelyezéséhez!
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'P(−3; 4,5)', p: [-3, 4.5] },
                  { name: 'Q(−5; 1)', p: [-5, 1] },
                  { name: 'S(2; 5)', p: [2, 5] },
                  { name: 'B(3; 1)', p: [3, 1] },
                  { name: '(6; −3)', p: [6, -3] }
                ].map((pr) => (
                  <button
                    key={pr.name}
                    onClick={() => setS(pr.p as [number, number])}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
                  >
                    {pr.name}
                  </button>
                ))}
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div>S({fmt(S[0])}; {fmt(S[1])})</div>
                <div>({fmt(S[0])} + 1)² + ({fmt(S[1])} − 1,5)² = {fmt(d2)} {sRel === 'on' ? '=' : sRel === 'in' ? '<' : '>'} 16,25</div>
                <div className={`font-sans font-bold ${sRel === 'in' ? 'text-rose-700' : sRel === 'on' ? 'text-amber-700' : 'text-emerald-700'}`}>
                  {sRel === 'in' && 'S a körön belül van ⇒ nincs érintő.'}
                  {sRel === 'on' && 'S a körön van ⇒ pontosan 1 érintő (merőleges a CS sugárra).'}
                  {sRel === 'out' && 'S a körön kívül van ⇒ 2 érintő.'}
                </div>
                {onTangent && (
                  <div>Érintő: {onTangent.x !== undefined ? `x = ${fmt(onTangent.x)}` : lineLabel(onTangent.m ?? 0, onTangent.b ?? 0)}</div>
                )}
                {sRel === 'out' && (
                  <>
                    <div>Érintési pontok: {tPts.map((t) => `(${fmt(t[0])}; ${fmt(t[1])})`).join(' és ')}</div>
                    <div>Az érintőszakasz hossza: √(CS² − r²) = √({fmt(d2)} − 16,25) ≈ {fmt(Math.sqrt(d2 - cr2), 3)}</div>
                  </>
                )}
              </div>
              <TheoryCallout type="tip" title="Miért derékszög?">
                Az érintési pontba húzott sugár merőleges az érintőre, ezért a C középpont, az S pont és az érintési pont derékszögű háromszöget alkot – az érintési pontok a CS szakasz Thalész-körén vannak.
              </TheoryCallout>
            </div>
            <CircleProblemsPlane
              xMin={-8}
              xMax={7}
              yMin={-5}
              yMax={9}
              unit={18}
              tickEvery={2}
              className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200"
              onPick={(x, y) => setS([x, y])}
              circles={[
                { cx: cu, cy: cv, r: cr, color: CP_BLUE, width: 2.2, fill: 'rgba(37,99,235,0.06)' },
                ...(sRel === 'out'
                  ? [{ cx: (cu + S[0]) / 2, cy: (cv + S[1]) / 2, r: Math.sqrt(d2) / 2, color: CP_PURPLE, dashed: true, width: 1.2 }]
                  : [])
              ]}
              lines={tangentLines}
              segments={[
                { from: [cu, cv], to: S, color: '#94a3b8', dashed: true },
                ...tPts.filter(() => sRel === 'out').map((t) => ({ from: [cu, cv] as [number, number], to: t, color: CP_GREEN, width: 1.4 }))
              ]}
              rightAngles={sRel === 'out' ? tPts.map((t) => ({ v: t, p: [cu, cv] as [number, number], q: S, color: CP_GREEN })) : []}
              points={[
                { x: cu, y: cv, color: '#0f172a', label: 'C', dx: 5, dy: 12 },
                { x: S[0], y: S[1], color: sRel === 'in' ? CP_RED : sRel === 'on' ? CP_AMBER : CP_GREEN, label: 'S' },
                ...(sRel === 'out' ? tPts.map((t) => ({ x: t[0], y: t[1], color: CP_GREEN })) : [])
              ]}
            />
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CircleProblemsTheory;
