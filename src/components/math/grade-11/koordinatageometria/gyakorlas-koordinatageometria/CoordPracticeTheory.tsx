import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { MidpointPlane, CP, PlaneLine, PlaneRightAngle } from '../felezopont/MidpointFigures';
import {
  CoordPracticeVectorsSvg,
  CoordPracticeIsoscelesSvg,
  CoordPracticeAltitudeSvg,
  CoordPracticeCircumcircleSvg,
  CoordPracticeCentroidMinSvg,
  CoordPracticeLinesSvg
} from './CoordPracticeFigures';

/** Magyar számformátum: tizedesvessző, valódi mínuszjel. */
const fmt = (x: number, d = 3) => {
  if (!Number.isFinite(x)) return '–';
  const r = Number(x.toFixed(d));
  return String(Object.is(r, -0) ? 0 : r).replace('.', ',').replace('-', '−');
};
const pt = (p: CP) => `(${fmt(p[0])}; ${fmt(p[1])})`;

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const isInt = (v: number) => Math.abs(v - Math.round(v)) < 1e-9;

/** Ax + By = C alak szép kiírása (egészekre egyszerűsítve, ha lehet). */
const lineText = (A: number, B: number, C: number) => {
  let a = A;
  let b = B;
  let c = C;
  for (let k = 0; k < 2 && !(isInt(a) && isInt(b) && isInt(c)); k++) {
    a *= 2;
    b *= 2;
    c *= 2;
  }
  if (isInt(a) && isInt(b) && isInt(c)) {
    a = Math.round(a);
    b = Math.round(b);
    c = Math.round(c);
    const g = gcd(gcd(Math.abs(a), Math.abs(b)), Math.abs(c)) || 1;
    a /= g;
    b /= g;
    c /= g;
    if (a < 0 || (a === 0 && b < 0)) {
      a = -a;
      b = -b;
      c = -c;
    }
  }
  const term = (coef: number, v: string, first: boolean) => {
    if (Math.abs(coef) < 1e-12) return '';
    const sign = coef < 0 ? (first ? '−' : ' − ') : first ? '' : ' + ';
    const abs = Math.abs(coef);
    return `${sign}${Math.abs(abs - 1) < 1e-12 ? '' : fmt(abs)}${v}`;
  };
  const left = term(a, 'x', true) + term(b, 'y', Math.abs(a) < 1e-12);
  return `${left || '0'} = ${fmt(c)}`;
};

/** Meredekséges alak (vagy x = c). */
const slopeText = (A: number, B: number, C: number) => {
  if (Math.abs(B) < 1e-12) return `x = ${fmt(C / A)}`;
  const m = -A / B;
  const b = C / B;
  const mPart = Math.abs(m) < 1e-12 ? '' : `${Math.abs(m - 1) < 1e-12 ? '' : Math.abs(m + 1) < 1e-12 ? '−' : fmt(m)}x`;
  const bPart = Math.abs(b) < 1e-12 ? (mPart ? '' : '0') : mPart ? (b < 0 ? ` − ${fmt(-b)}` : ` + ${fmt(b)}`) : fmt(b);
  return `y = ${mPart}${bPart}`;
};

type Line = { A: number; B: number; C: number };
/** P ponton átmenő, n = (A; B) vektorra merőleges egyenes: Ax + By = A·p₁ + B·p₂. */
const lineThrough = (P: CP, n: CP): Line => ({ A: n[0], B: n[1], C: n[0] * P[0] + n[1] * P[1] });
const intersect = (l1: Line, l2: Line): CP | null => {
  const d = l1.A * l2.B - l2.A * l1.B;
  if (Math.abs(d) < 1e-12) return null;
  return [(l1.C * l2.B - l2.C * l1.B) / d, (l1.A * l2.C - l2.A * l1.C) / d];
};
const toPlaneLine = (l: Line, color: string, label?: string, dashed = false): PlaneLine => {
  const P: CP = Math.abs(l.B) > 1e-12 ? [0, l.C / l.B] : [l.C / l.A, 0];
  return { p: P, d: [-l.B, l.A], color, label, dashed, width: 1.6 };
};

const TRI_PRESETS: { name: string; pts: CP[] }[] = [
  { name: 'Kidolgozott példa', pts: [[-2, -2], [7, 1], [5, 5]] },
  { name: '2. feladat (derékszögű)', pts: [[4, 1], [10, 5], [0, 7]] },
  { name: 'Ráadás háromszöge', pts: [[2, 4], [5, 7], [-1, 10]] },
  { name: 'Érettségi 2012', pts: [[-2, -1], [9, -3], [-3, 6]] }
];

const LINE_PRESETS: { name: string; l1: Line; l2: Line }[] = [
  { name: 'e és g (5. feladat)', l1: { A: 3, B: -5, C: 7 }, l2: { A: -9, B: 15, C: 10 } },
  { name: 'e és h (5. feladat)', l1: { A: 3, B: -5, C: 7 }, l2: { A: 6, B: -10, C: 14 } },
  { name: 'h és i (5. feladat)', l1: { A: 6, B: -10, C: 14 }, l2: { A: 10, B: 6, C: -14 } },
  { name: 'e és f (HF 1.)', l1: { A: 3, B: -2, C: 2 }, l2: { A: 3, B: 4, C: 14 } }
];

export const CoordPracticeTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: háromszög nevezetes vonalai
  const [tri, setTri] = useState<CP[]>(TRI_PRESETS[0].pts);
  const [show, setShow] = useState({ alt: true, bis: true, med: false, circ: true });

  // Labor II: két egyenes kölcsönös helyzete
  const [l1, setL1] = useState<Line>(LINE_PRESETS[0].l1);
  const [l2, setL2] = useState<Line>(LINE_PRESETS[0].l2);

  const [A, B, C] = tri;
  const sub = (U: CP, V: CP): CP => [U[0] - V[0], U[1] - V[1]];
  const mid = (U: CP, V: CP): CP => [(U[0] + V[0]) / 2, (U[1] + V[1]) / 2];
  const cross = (u: CP, v: CP) => u[0] * v[1] - u[1] * v[0];
  const area2 = cross(sub(B, A), sub(C, A));
  const degenerate = Math.abs(area2) < 1e-9;

  // magasságvonalak: csúcson át, a szemközti oldal vektorára merőlegesen
  const altC = lineThrough(C, sub(B, A));
  const altA = lineThrough(A, sub(C, B));
  const altB = lineThrough(B, sub(C, A));
  // oldalfelező merőlegesek
  const bisAB = lineThrough(mid(A, B), sub(B, A));
  const bisBC = lineThrough(mid(B, C), sub(C, B));
  const bisAC = lineThrough(mid(A, C), sub(C, A));
  // súlyvonal C-ből
  const Fab = mid(A, B);
  const dMed = sub(Fab, C);
  const medC = lineThrough(C, [-dMed[1], dMed[0]]);

  const K = degenerate ? null : intersect(bisAB, bisBC);
  const M = degenerate ? null : intersect(altA, altC);
  const S: CP = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3];
  const r = K ? Math.hypot(A[0] - K[0], A[1] - K[1]) : NaN;
  const footC = intersect(altC, lineThrough(A, [-(B[1] - A[1]), B[0] - A[0]]));
  const hC = Math.abs(area2) / Math.hypot(B[0] - A[0], B[1] - A[1]);

  // ablak
  const xs = [...tri.map((p) => p[0]), 0];
  const ys = [...tri.map((p) => p[1]), 0];
  if (show.circ && K && Number.isFinite(r) && r < 40) {
    xs.push(K[0] - r, K[0] + r);
    ys.push(K[1] - r, K[1] + r);
  }
  const win = {
    x: [Math.floor(Math.min(...xs)) - 1, Math.ceil(Math.max(...xs)) + 1] as [number, number],
    y: [Math.floor(Math.min(...ys)) - 1, Math.ceil(Math.max(...ys)) + 1] as [number, number]
  };
  const span = Math.max(win.x[1] - win.x[0], win.y[1] - win.y[0]);
  const unit = Math.max(5, Math.min(28, 320 / span));

  const triLines: PlaneLine[] = [];
  const triRight: PlaneRightAngle[] = [];
  if (!degenerate) {
    if (show.alt) {
      triLines.push(toPlaneLine(altA, '#dc2626', undefined, true), toPlaneLine(altB, '#dc2626', undefined, true), toPlaneLine(altC, '#dc2626', 'mc'));
      if (footC) triRight.push({ at: footC, p: C, q: Math.hypot(A[0] - footC[0], A[1] - footC[1]) > 0.3 ? A : B, r: 10, color: '#dc2626' });
    }
    if (show.bis) {
      triLines.push(toPlaneLine(bisAB, '#059669', 'fAB', true), toPlaneLine(bisBC, '#059669', undefined, true), toPlaneLine(bisAC, '#059669', undefined, true));
    }
    if (show.med) triLines.push(toPlaneLine(medC, '#b45309', 'sc'));
  }

  // Labor II
  const det = l1.A * l2.B - l2.A * l1.B;
  const valid1 = Math.abs(l1.A) + Math.abs(l1.B) > 1e-12;
  const valid2 = Math.abs(l2.A) + Math.abs(l2.B) > 1e-12;
  const P = valid1 && valid2 ? intersect(l1, l2) : null;
  const coincide =
    valid1 && valid2 && Math.abs(det) < 1e-12 && Math.abs(l1.A * l2.C - l2.A * l1.C) < 1e-9 && Math.abs(l1.B * l2.C - l2.B * l1.C) < 1e-9;
  const perpendicular = valid1 && valid2 && Math.abs(l1.A * l2.A + l1.B * l2.B) < 1e-12;
  const slope = (l: Line) => (Math.abs(l.B) < 1e-12 ? null : -l.A / l.B);
  const m1 = slope(l1);
  const m2 = slope(l2);
  const angleDeg = (l: Line) => {
    const m = slope(l);
    return m === null ? 90 : (Math.atan(m) * 180) / Math.PI;
  };
  let between = Math.abs(angleDeg(l1) - angleDeg(l2));
  if (between > 90) between = 180 - between;
  let relation = '';
  if (!valid1 || !valid2) relation = 'Az egyik egyenlet nem egyenes (A és B nem lehet egyszerre 0).';
  else if (coincide) relation = 'A két egyenes EGYBEESIK (az egyenletek egymás számszorosai).';
  else if (Math.abs(det) < 1e-12) relation = 'A két egyenes PÁRHUZAMOS (egyenlő meredekség, de különböző egyenesek) – nincs közös pontjuk.';
  else if (perpendicular) relation = 'A két egyenes MERŐLEGES egymásra (m₁ · m₂ = −1).';
  else relation = 'A két egyenes METSZI egymást, de nem merőlegesek.';

  const numInput = (val: number, set: (v: number) => void, label: string) => (
    <input
      type="number"
      step="1"
      value={val}
      onChange={(e) => set(Number(e.target.value) || 0)}
      className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
      aria-label={label}
    />
  );

  const lineEditor = (l: Line, set: (l: Line) => void, name: string, color: string) => (
    <div className="grid grid-cols-[2.5rem_1fr_auto_1fr_auto_1fr] gap-1.5 items-center">
      <span className={`text-sm font-bold ${color}`}>{name}:</span>
      {numInput(l.A, (v) => set({ ...l, A: v }), `${name} x együtthatója`)}
      <span className="text-sm">x +</span>
      {numInput(l.B, (v) => set({ ...l, B: v }), `${name} y együtthatója`)}
      <span className="text-sm">y =</span>
      {numInput(l.C, (v) => set({ ...l, C: v }), `${name} jobb oldala`)}
    </div>
  );

  const toggle = (key: keyof typeof show, label: string, cls: string) => (
    <button
      onClick={() => setShow((s) => ({ ...s, [key]: !s[key] }))}
      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${show[key] ? cls : 'bg-slate-100 text-slate-500'}`}
    >
      {show[key] ? '✓ ' : ''}
      {label}
    </button>
  );

  return (
    <TheoryTemplate
      topicId="g11-koordinatageometria"
      subtopicId="gyakorlas-koordinatageometria"
      title="16. Gyakorlás"
      subtitle="Vektorok, körök és egyenesek egyenletei, valamint a háromszög nevezetes vonalai koordinátákkal: oldalegyenes, magasságvonal, oldalfelező merőleges, súlyvonal és a körülírt kör."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • TANANYAG"
      themeColor="blue"
      pdfFilename="11_osztaly_koordinatageometria_gyakorlas_tananyag.pdf"
      practiceTitle="Készen állsz a koordinátageometriai gyakorló feladatokra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A HÁROMSZÖG NEVEZETES VONALAI KOORDINÁTÁKKAL',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
              <span className="font-mono text-base font-black text-blue-900 dark:text-blue-200">
                e ⊥ f ⇔ m₁ · m₂ = −1 &nbsp;&nbsp;|&nbsp;&nbsp; e ∥ f ⇔ m₁ = m₂
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Magasságvonal (mc):</strong> átmegy a C csúcson, és merőleges az AB oldalra ⇒ meredeksége −1/m(AB).
              </li>
              <li>
                <strong>Oldalfelező merőleges (fAB):</strong> átmegy az AB felezőpontján, és merőleges AB-re.
              </li>
              <li>
                <strong>Súlyvonal (sc):</strong> átmegy C-n és az AB oldal felezőpontján.
              </li>
              <li>
                <strong>Körülírt kör:</strong> középpontja K = két oldalfelező merőleges metszéspontja, sugara r = KA; egyenlete (x − u)² + (y − v)² = r².
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Összefoglaló */}
      <TheorySection title="1. Amit eddig tanultunk – összefoglaló" badge="Tankönyv 258. o." badgeColor="blue">
        <TheoryTable
          headers={['Fogalom', 'Képlet / eljárás', 'Példa']}
          rows={[
            ['Párhuzamos vektorok', '→w = λ · →v (koordinátánként ugyanaz a szorzó)', '(4; −6) = 2 · (2; −3)'],
            ['+90°-os elforgatott', '(v₁; v₂) ↦ (−v₂; v₁)', '(4; −6) ↦ (6; 4)'],
            ['−90°-os elforgatott', '(v₁; v₂) ↦ (v₂; −v₁)', '(2; −3) ↦ (−3; −2)'],
            ['Két pont távolsága', 'AB = √((b₁ − a₁)² + (b₂ − a₂)²)', 'A(4; 1), B(10; 5): √52 = 2√13'],
            ['Felezőpont, súlypont', 'F = (A + B)/2, S = (A + B + C)/3', 'BC felezőpontja: ((2 − 6)/2; (−7 − 1)/2) = (−2; −4)'],
            ['Egyenes egyenlete', 'y = mx + b vagy Ax + By = C', '5x − 12y + 43 = 0 ⇔ y = (5/12)x + 43/12'],
            ['Meredekség, irányszög', 'm = tg α = v₂/v₁', 'm = 5/12 ⇒ α ≈ 22,6°'],
            ['Kör egyenlete', '(x − u)² + (y − v)² = r²', 'K(−2; 7), r = 7: (x + 2)² + (y − 7)² = 49']
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <CoordPracticeVectorsSvg />
          <TheoryCard title="1. feladat: vektorok kapcsolatai" badge="Mintapélda" badgeColor="sky">
            <p className="text-sm text-slate-700 leading-relaxed">
              →a(2; −3), →b(−2; 3), →c(4; −6), →d(6; 4), →e(10; −2), →f(−4; −1).
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 mt-2">
              <li><strong>Párhuzamosak:</strong> →a, →b, →c, mert →b = −→a és →c = 2→a.</li>
              <li><strong>Merőlegesek:</strong> →d merőleges →a-ra (így →b-re és →c-re is): →a −90°-os elforgatottja (−3; −2) = −½ · →d.</li>
              <li><strong>Összeg:</strong> →e = →c + →d = (4 + 6; −6 + 4) = (10; −2).</li>
              <li><strong>Különbség:</strong> →c = →e − →d és →d = →e − →c.</li>
              <li><strong>+90°-os elforgatott:</strong> →c(4; −6) +90°-os elforgatottja (6; 4) = →d.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. Egyenlő szárú derékszögű háromszög */}
      <TheorySection title="2. Kidolgozott feladat: egyenlő szárú derékszögű háromszög" badge="2. feladat" badgeColor="indigo">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <CoordPracticeIsoscelesSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Feladat:</strong> az ABC egyenlő szárú derékszögű háromszög egyik befogójának végpontjai A(4; 1) és B(10; 5). Hány ilyen háromszög van, és hol lehet a harmadik csúcs?
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>→AB = (6; 4). A másik befogó ugyanilyen hosszú, és merőleges rá: ±(−4; 6).</li>
              <li>Derékszög A-nál: C = A ± (−4; 6) ⇒ <strong>C₁(0; 7)</strong> vagy <strong>C₂(8; −5)</strong>.</li>
              <li>Derékszög B-nél: C = B ± (−4; 6) ⇒ <strong>C₃(6; 11)</strong> vagy <strong>C₄(14; −1)</strong>.</li>
              <li>Tehát <strong>4 ilyen háromszög</strong> rajzolható.</li>
              <li>
                Befogó: AB = √(36 + 16) = √52 = 2√13, átfogó: √2 · √52 = √104 = 2√26.
                Kerület: K = 4√13 + 2√26 ≈ <strong>24,62</strong>, terület: T = 52/2 = <strong>26</strong>.
              </li>
              <li>
                A körülírt kör középpontja az <strong>átfogó felezőpontja</strong> (Thalész-tétel): C₁ és C₃ esetén (5; 6), C₂ és C₄ esetén (9; 0).
              </li>
            </ul>
          </div>
        </div>
      </TheorySection>

      {/* 3. Nevezetes vonalak */}
      <TheorySection title="3. A háromszög nevezetes vonalai koordinátákkal" badge="Kidolgozott feladat" badgeColor="teal">
        <p className="text-sm text-slate-700 leading-relaxed">
          Legyen <strong>A(−2; −2), B(7; 1), C(5; 5)</strong>. Az AB oldal meredeksége m(AB) = (1 − (−2))/(7 − (−2)) = 3/9 = 1/3, a BC oldalé m(BC) = (5 − 1)/(5 − 7) = −2.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <TheoryCard title="Magasságvonal a C csúcsból" badge="mc" badgeColor="rose">
            <CoordPracticeAltitudeSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>mc ⊥ AB, ezért meredeksége −1 : (1/3) = <strong>−3</strong>.</li>
              <li>Átmegy C(5; 5)-ön: y − 5 = −3(x − 5) ⇒ <strong>y = −3x + 20</strong>, azaz 3x + y = 20.</li>
              <li>Az AB egyenese: y = (1/3)x − 4/3, azaz x − 3y = 4. A két egyenes metszéspontja a talppont: <strong>T(6,4; 0,8)</strong>.</li>
              <li>A magasság hossza: CT = √(1,4² + 4,2²) = 14/√10 ≈ <strong>4,43</strong>; a terület T = ½ · AB · CT = ½ · 3√10 · 14/√10 = <strong>21</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Oldalfelező merőlegesek és a körülírt kör" badge="K, r" badgeColor="emerald">
            <CoordPracticeCircumcircleSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>AB felezőpontja (2,5; −0,5), a merőleges meredeksége −3: <strong>fAB: y = −3x + 7</strong>.</li>
              <li>BC felezőpontja (6; 3), a merőleges meredeksége 1/2: <strong>fBC: y = x/2</strong>.</li>
              <li>Metszéspont: −3x + 7 = x/2 ⇒ x = 2, y = 1, tehát <strong>K(2; 1)</strong>.</li>
              <li>Sugár: r = KA = √(4² + 3²) = <strong>5</strong> (ugyanennyi KB és KC is).</li>
              <li>A körülírt kör egyenlete: <strong>(x − 2)² + (y − 1)² = 25</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
        <TheoryTable
          headers={['Vonal', 'Melyik ponton megy át?', 'Milyen irányú?', 'A példában']}
          rows={[
            ['AB oldalegyenes', 'A és B', '→AB irányú', 'x − 3y = 4'],
            ['mc magasságvonal', 'C csúcs', 'merőleges AB-re', '3x + y = 20'],
            ['fAB oldalfelező merőleges', 'AB felezőpontja', 'merőleges AB-re', '3x + y = 7'],
            ['sc súlyvonal', 'C és AB felezőpontja', 'C-től F(AB) felé', '11x − 5y = 30'],
            ['Magasságpont', 'két magasságvonal metszéspontja', '–', 'M(6; 2)'],
            ['Súlypont', 'S = (A + B + C)/3', '–', 'S(10/3; 4/3)'],
            ['Körülírt kör középpontja', 'két oldalfelező merőleges metszéspontja', '–', 'K(2; 1), r = 5']
          ]}
        />
        <TheoryCallout type="info" title="Figyeld meg!">
          A magasságvonal és az ugyanahhoz az oldalhoz tartozó oldalfelező merőleges párhuzamos (mindkettő merőleges AB-re), csak más ponton mennek át: 3x + y = 20 és 3x + y = 7. Az egyenlet bal oldala ugyanaz, csak a jobb oldal különbözik.
        </TheoryCallout>
      </TheorySection>

      {/* 4. Tankönyvi feladatok */}
      <TheorySection title="4. Kidolgozott tankönyvi feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Körök egyenlete" badge="3. feladat" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>a) Középpont O, P(−5; 12) a körön: r² = 25 + 144 = 169 ⇒ <strong>x² + y² = 169</strong>.</li>
              <li>b) Középpont C(−2; 7), érinti az x tengelyt ⇒ r = |7| = 7: <strong>(x + 2)² + (y − 7)² = 49</strong>.</li>
              <li>c) Mindkét tengelyt érinti, r = 3 ⇒ a középpont (±3; ±3): <strong>4 ilyen kör</strong>, pl. (x − 3)² + (y − 3)² = 9.</li>
              <li>d) Átmérő A(7; −4), B(−3; −6) ⇒ K(2; −5), r² = 5² + 1² = 26: <strong>(x − 2)² + (y + 5)² = 26</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Egyenes y = mx + b alakban" badge="4. feladat" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>f: 5x − 12y + 43 = 0 ⇒ 12y = 5x + 43 ⇒ <strong>y = (5/12)x + 43/12</strong>.</li>
              <li>Iránytangens: <strong>m = 5/12</strong>.</li>
              <li>Irányszög: tg α = 5/12 ⇒ α ≈ <strong>22,6°</strong> az x tengellyel, így 90° − 22,6° ≈ <strong>67,4°</strong> az y tengellyel.</li>
              <li>Tengelymetszetek: y = 0 ⇒ x = −8,6, azaz <strong>(−8,6; 0)</strong>; x = 0 ⇒ y = 43/12 ≈ 3,58, azaz <strong>(0; 43/12)</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Egyenesek kölcsönös helyzete" badge="5. feladat" badgeColor="emerald">
            <CoordPracticeLinesSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>Rendezzük y-ra: e: y = (3/5)x − 7/5; f: y = −(5/3)x + 7/3; g: y = (3/5)x + 2/3; h: y = (3/5)x − 7/5; i: y = −(5/3)x − 7/3.</li>
              <li>a) g-vel párhuzamos: <strong>e és h</strong> (m = 3/5, de más a tengelymetszet).</li>
              <li>b) e-vel egybeesik: <strong>h</strong> (ugyanaz az m és a b).</li>
              <li>c) f-re merőleges: <strong>e, g, h</strong>, mert (3/5) · (−5/3) = −1.</li>
              <li>d) i-t metszi: <strong>e, g és h</strong> – 3 egyenes (f párhuzamos vele).</li>
              <li>e) Az i és h nem az y tengelyen metszik egymást: −7/3 ≠ −7/5.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Házi feladat: pontok és egyenesek" badge="HF 1." badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A(−5; −4), B(2; −7), C(−6; −1); e: 3x − 2y = 2, f: 3x + 4y = 14, g: x + 3y = −7.</li>
              <li>a) BC felezőpontja (−2; −4): 3 · (−2) − 2 · (−4) = 2 ✓, rajta van e-n.</li>
              <li>b) m(BC) = 6/(−8) = −3/4 = m(f), és B nincs f-en ⇒ <strong>BC ∥ f</strong>.</li>
              <li>c) m(AC) = 3/(−1) = −3, m(g) = −1/3, szorzatuk 1 ≠ −1 ⇒ <strong>nem merőleges</strong>.</li>
              <li>d) e ∩ f: a két egyenletet kivonva 6y = 12 ⇒ y = 2, x = 2: <strong>(2; 2)</strong>.</li>
              <li>e) g tengelymetszetei (−7; 0) és (0; −7/3) ⇒ T = ½ · 7 · 7/3 = 49/6 ≈ <strong>8,17</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="E) Házi feladat: további körök" badge="HF 2." badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>a) C(4; −5), P(7; −9): r² = 9 + 16 = 25 ⇒ (x − 4)² + (y + 5)² = 25.</li>
              <li>b) C(−5; −6), érinti az y tengelyt ⇒ r = 5: (x + 5)² + (y + 6)² = 25.</li>
              <li>c) Mindkét tengely negatív félegyenesét érinti, r = 4 ⇒ K(−4; −4): (x + 4)² + (y + 4)² = 16.</li>
              <li>d) Átmérő A(1; −8), B(−8; 32) ⇒ K(−3,5; 12), r = 20,5: (x + 3,5)² + (y − 12)² = 420,25.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="F) Ráadás: hol a legkisebb a négyzetösszeg?" badge="Ráadás" badgeColor="rose">
            <CoordPracticeCentroidMinSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A(2; 4), B(5; 7), C(−1; 10), P(x; y) tetszőleges pont.</li>
              <li>PA² + PB² + PC² = 3x² + 3y² − 12x − 42y + 195 = 3(x − 2)² + 3(y − 7)² + 36.</li>
              <li>A négyzetek nem negatívak, ezért a minimum <strong>36</strong>, és ezt <strong>P(2; 7)</strong>-ben veszi fel.</li>
              <li>Ez éppen a <strong>súlypont</strong>: ((2 + 5 − 1)/3; (4 + 7 + 10)/3) = (2; 7).</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: magasságvonal helyett oldalfelező merőleges (és fordítva)" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Ugyanaz az irány, más pont!"
          wrong="A C-ből induló magasságvonal: átmegy AB felezőpontján (2,5; −0,5), meredeksége −3 ⇒ y = −3x + 7"
          wrongExplanation="Ez az AB oldal felezőmerőlegese, nem a magasságvonal. A magasságvonal a CSÚCSON megy át, és csak egyenlő szárú háromszögben (CA = CB) halad át a szemközti oldal felezőpontján."
          correct="mc: átmegy C(5; 5)-ön, meredeksége −3 ⇒ y − 5 = −3(x − 5), azaz y = −3x + 20"
          correctExplanation="Ellenőrzés: C(5; 5) koordinátáit behelyettesítve −15 + 20 = 5 ✓. A meredekség a merőlegességből jön: (1/3) · (−3) = −1."
          tip="Magasságvonal: csúcs + merőleges irány. Oldalfelező merőleges: felezőpont + merőleges irány. Súlyvonal: csúcs + felezőpont."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: A háromszög nevezetes vonalai" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {TRI_PRESETS.map((pr) => (
              <button
                key={pr.name}
                onClick={() => setTri(pr.pts)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-100 text-blue-800 hover:bg-blue-200"
              >
                {pr.name}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {toggle('alt', 'Magasságvonalak', 'bg-rose-100 text-rose-800')}
            {toggle('bis', 'Oldalfelező merőlegesek', 'bg-emerald-100 text-emerald-800')}
            {toggle('med', 'Súlyvonal C-ből', 'bg-amber-100 text-amber-800')}
            {toggle('circ', 'Körülírt kör', 'bg-purple-100 text-purple-800')}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              {tri.map((p, i) => (
                <div key={i} className="grid grid-cols-[4rem_1fr_1fr] gap-2 items-center">
                  <span className="text-xs font-semibold text-slate-600">{['A', 'B', 'C'][i]} csúcs</span>
                  {[0, 1].map((k) => (
                    <input
                      key={k}
                      type="number"
                      step="1"
                      value={p[k]}
                      onChange={(e) => {
                        const v = Number(e.target.value) || 0;
                        setTri((old) => old.map((q, j) => (j === i ? ((k === 0 ? [v, q[1]] : [q[0], v]) as CP) : q)));
                      }}
                      className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
                      aria-label={`${['A', 'B', 'C'][i]} ${k + 1}. koordinátája`}
                    />
                  ))}
                </div>
              ))}
              {degenerate ? (
                <TheoryCallout type="warning" title="Nem háromszög">
                  A három pont egy egyenesre esik – adj meg más koordinátákat!
                </TheoryCallout>
              ) : (
                <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                  <div>AB oldalegyenes: {lineText(-(B[1] - A[1]), B[0] - A[0], -(B[1] - A[1]) * A[0] + (B[0] - A[0]) * A[1])}</div>
                  <div className="text-rose-700">
                    mc: {lineText(altC.A, altC.B, altC.C)} &nbsp;({slopeText(altC.A, altC.B, altC.C)})
                  </div>
                  <div className="text-emerald-700">
                    fAB: {lineText(bisAB.A, bisAB.B, bisAB.C)} &nbsp;({slopeText(bisAB.A, bisAB.B, bisAB.C)})
                  </div>
                  <div className="text-amber-700">sc: {lineText(medC.A, medC.B, medC.C)}</div>
                  <div>Talppont (C-ből): T{footC ? pt(footC) : '–'}, mc hossza ≈ {fmt(hC, 3)}</div>
                  <div>Magasságpont: M{M ? pt(M) : '–'}</div>
                  <div>Súlypont: S{pt(S)}</div>
                  <div className="text-purple-700">
                    Körülírt kör: K{K ? pt(K) : '–'}, r ≈ {fmt(r, 3)}
                  </div>
                  {K && (
                    <div className="text-purple-700">
                      (x {K[0] < 0 ? '+' : '−'} {fmt(Math.abs(K[0]))})² + (y {K[1] < 0 ? '+' : '−'} {fmt(Math.abs(K[1]))})² = {fmt(r * r, 3)}
                    </div>
                  )}
                  <div>Terület: {fmt(Math.abs(area2) / 2, 3)}</div>
                </div>
              )}
              <p className="text-xs text-slate-500 italic">
                Próbáld ki a derékszögű háromszöget: a körülírt kör középpontja az átfogó felezőpontja, a magasságpont pedig a derékszögű csúcs!
              </p>
            </div>
            <MidpointPlane
              x={win.x}
              y={win.y}
              unit={unit}
              labels={span > 16 ? 5 : 2}
              grid={span > 30 ? 5 : 1}
              className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200"
              polys={[{ pts: tri, fill: 'rgba(37,99,235,0.08)', stroke: '#2563eb' }]}
              lines={triLines}
              rightAngles={triRight}
              points={[
                { at: A, label: 'A', dx: -8, dy: -6, color: '#2563eb' },
                { at: B, label: 'B', dx: 8, dy: -6, color: '#2563eb' },
                { at: C, label: 'C', dx: 8, dy: -6, color: '#2563eb' },
                ...(show.alt && M ? [{ at: M, label: 'M', dx: 9, dy: 12, color: '#dc2626', r: 3 }] : []),
                ...(show.med ? [{ at: S, label: 'S', dx: -9, dy: 12, color: '#b45309', r: 3 }] : []),
                ...(show.circ && K ? [{ at: K, label: 'K', dx: 9, dy: -5, color: '#7c3aed', r: 3.4 }] : [])
              ]}
            >
              {(px) => {
                if (!show.circ || !K || !Number.isFinite(r)) return null;
                const c = px(K);
                return <circle cx={c.x} cy={c.y} r={r * unit} fill="none" stroke="#7c3aed" strokeWidth={1.8} />;
              }}
            </MidpointPlane>
          </div>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: Két egyenes kölcsönös helyzete" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {LINE_PRESETS.map((pr) => (
              <button
                key={pr.name}
                onClick={() => {
                  setL1(pr.l1);
                  setL2(pr.l2);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
              >
                {pr.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              {lineEditor(l1, setL1, 'e', 'text-blue-700')}
              {lineEditor(l2, setL2, 'f', 'text-rose-700')}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div className="text-blue-700">
                  e: {valid1 ? slopeText(l1.A, l1.B, l1.C) : '–'}, m₁ = {m1 === null ? 'nincs (x = c alakú)' : fmt(m1)}, irányszög ≈ {fmt(angleDeg(l1), 1)}°
                </div>
                <div className="text-rose-700">
                  f: {valid2 ? slopeText(l2.A, l2.B, l2.C) : '–'}, m₂ = {m2 === null ? 'nincs (x = c alakú)' : fmt(m2)}, irányszög ≈ {fmt(angleDeg(l2), 1)}°
                </div>
                {m1 !== null && m2 !== null && <div>m₁ · m₂ = {fmt(m1 * m2)}</div>}
                <div className="font-bold text-slate-900">{relation}</div>
                {P && (
                  <>
                    <div>Metszéspont: P{pt(P)}</div>
                    <div>A két egyenes hajlásszöge ≈ {fmt(between, 1)}°</div>
                  </>
                )}
              </div>
              <TheoryCallout type="tip" title="Hogyan döntsünk gyorsan?">
                Rendezd mindkét egyenletet y = mx + b alakra! Ugyanaz az m és a b ⇒ egybeesnek; ugyanaz az m, más b ⇒ párhuzamosak; m₁ · m₂ = −1 ⇒ merőlegesek. A metszéspontot az egyenletrendszer megoldása adja.
              </TheoryCallout>
            </div>
            <MidpointPlane
              x={[-8, 8]}
              y={[-8, 8]}
              unit={19}
              labels={2}
              className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200"
              lines={[...(valid1 ? [toPlaneLine(l1, '#2563eb', 'e')] : []), ...(valid2 ? [toPlaneLine(l2, '#dc2626', 'f', coincide)] : [])]}
              rightAngles={
                P && perpendicular && Math.abs(P[0]) < 8 && Math.abs(P[1]) < 8
                  ? [{ at: P, p: [P[0] - l1.B, P[1] + l1.A], q: [P[0] - l2.B, P[1] + l2.A], r: 12, color: '#7c3aed' }]
                  : []
              }
              points={P && Math.abs(P[0]) < 8 && Math.abs(P[1]) < 8 ? [{ at: P, label: 'P', dx: 10, dy: 14, color: '#7c3aed', r: 4 }] : []}
            />
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CoordPracticeTheory;
