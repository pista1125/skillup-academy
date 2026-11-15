import React, { useRef, useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  BermudaTriangleSvg,
  BoundingRectangleSvg,
  DistanceFormulaSvg,
  TriangleABDSvg,
  QuadrilateralAreaSvg,
  DPAArrow,
  DPAPoint
} from './DistancePerimeterAreaFigures';

const num = (x: number) => String(Math.round(x * 100) / 100).replace('.', ',').replace('-', '−');
const fmt = (x: number, d = 2) => {
  if (!Number.isFinite(x)) return '–';
  const s = x.toFixed(d);
  return (Number(s) === 0 ? (0).toFixed(d) : s).replace('.', ',').replace('-', '−');
};
const fmtBig = (x: number) => Math.round(x).toLocaleString('hu-HU');
/** √n egyszerűsített alakja (n egész). */
const rootText = (n: number) => {
  if (!Number.isInteger(n) || n < 0) return `√${num(n)}`;
  if (n === 0) return '0';
  let k = 1;
  for (let f = 2; f * f <= n; f++) if (n % (f * f) === 0) k = f;
  const m = n / (k * k);
  if (m === 1) return String(k);
  return k === 1 ? `√${m}` : `${k}√${m}`;
};
const sq = (x: number) => (x < 0 ? `(${num(x)})²` : `${num(x)}²`);
const dist2 = (P: DPAPoint, Q: DPAPoint) => (Q[0] - P[0]) ** 2 + (Q[1] - P[1]) ** 2;
const shoelace = (pts: DPAPoint[]) => {
  let s = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % pts.length];
    s += x1 * y2 - x2 * y1;
  }
  return Math.abs(s) / 2;
};
/** Igaz, ha a sokszög oldalai nem metszik egymást (egyszerű sokszög). */
const isSimple = (pts: DPAPoint[]) => {
  const n = pts.length;
  const orient = (a: DPAPoint, b: DPAPoint, c: DPAPoint) => Math.sign((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]));
  const onSeg = (a: DPAPoint, b: DPAPoint, c: DPAPoint) =>
    Math.min(a[0], b[0]) <= c[0] && c[0] <= Math.max(a[0], b[0]) && Math.min(a[1], b[1]) <= c[1] && c[1] <= Math.max(a[1], b[1]);
  const cross = (p1: DPAPoint, p2: DPAPoint, p3: DPAPoint, p4: DPAPoint) => {
    const d1 = orient(p3, p4, p1);
    const d2 = orient(p3, p4, p2);
    const d3 = orient(p1, p2, p3);
    const d4 = orient(p1, p2, p4);
    if (d1 !== d2 && d3 !== d4 && d1 !== 0 && d2 !== 0 && d3 !== 0 && d4 !== 0) return true;
    if (d1 === 0 && onSeg(p3, p4, p1)) return true;
    if (d2 === 0 && onSeg(p3, p4, p2)) return true;
    if (d3 === 0 && onSeg(p1, p2, p3)) return true;
    if (d4 === 0 && onSeg(p1, p2, p4)) return true;
    return false;
  };
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (j === i + 1 || (i === 0 && j === n - 1)) continue;
      if (cross(pts[i], pts[(i + 1) % n], pts[j], pts[(j + 1) % n])) return false;
    }
  }
  return shoelace(pts) > 0;
};

const NAMES = ['A', 'B', 'C', 'D', 'E', 'F'];
const PRESETS: { name: string; pts: DPAPoint[] }[] = [
  { name: 'Bermuda (M, S, H)', pts: [[-4, 1], [4, -4], [6, 5]] },
  { name: '2. feladat: ABCD', pts: [[-3, 1], [6, 1], [3, 5], [-1, 4]] },
  { name: 'HF 2: PQR', pts: [[1, -4], [7, 2], [-5, -2]] },
  { name: 'Ötszög', pts: [[-5, -2], [0, -5], [6, -1], [3, 5], [-4, 4]] }
];

// Labor I rácsa
const GX0 = -7;
const GX1 = 8;
const GY0 = -6;
const GY1 = 7;
const CELL = 26;
const PAD = 16;
const GW = (GX1 - GX0) * CELL + 2 * PAD;
const GH = (GY1 - GY0) * CELL + 2 * PAD;
const SX = (x: number) => PAD + (x - GX0) * CELL;
const SY = (y: number) => PAD + (GY1 - y) * CELL;

type Shape = 'adjSquare' | 'oppSquare' | 'equilateral';

export const DistancePerimeterAreaTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: húzható csúcsok
  const [pts, setPts] = useState<DPAPoint[]>(PRESETS[0].pts);
  const [drag, setDrag] = useState<number | null>(null);
  const [showBox, setShowBox] = useState<boolean>(true);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Labor II: két pontból négyzet / szabályos háromszög, térképi lépték
  const [P1, setP1] = useState<DPAPoint>([1, 2]);
  const [P2, setP2] = useState<DPAPoint>([6, -10]);
  const [shape, setShape] = useState<Shape>('adjSquare');
  const [scale, setScale] = useState<number>(1);

  // ---- Labor I számítások ----
  const n = pts.length;
  const sides = pts.map((p, i) => dist2(p, pts[(i + 1) % n]));
  const perimeter = sides.reduce((s, d) => s + Math.sqrt(d), 0);
  const simple = isSimple(pts);
  const area = shoelace(pts);
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const bx0 = Math.min(...xs);
  const bx1 = Math.max(...xs);
  const by0 = Math.min(...ys);
  const by1 = Math.max(...ys);
  const boxArea = (bx1 - bx0) * (by1 - by0);

  const toGrid = (clientX: number, clientY: number): DPAPoint | null => {
    const el = svgRef.current;
    if (!el) return null;
    const r = el.getBoundingClientRect();
    if (!r.width || !r.height) return null;
    const sx = ((clientX - r.left) / r.width) * GW;
    const sy = ((clientY - r.top) / r.height) * GH;
    const gx = Math.max(GX0, Math.min(GX1, Math.round(GX0 + (sx - PAD) / CELL)));
    const gy = Math.max(GY0, Math.min(GY1, Math.round(GY1 - (sy - PAD) / CELL)));
    return [gx, gy];
  };
  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (drag === null) return;
    const g = toGrid(e.clientX, e.clientY);
    if (!g) return;
    if (pts.some((p, i) => i !== drag && p[0] === g[0] && p[1] === g[1])) return;
    if (pts[drag][0] === g[0] && pts[drag][1] === g[1]) return;
    setPts(pts.map((p, i) => (i === drag ? g : p)));
  };
  const addVertex = () => {
    if (n >= 6) return;
    // az utolsó oldal felezőpontjához legközelebbi szabad rácspont
    const a = pts[n - 1];
    const b = pts[0];
    let cand: DPAPoint = [Math.round((a[0] + b[0]) / 2), Math.round((a[1] + b[1]) / 2)];
    let guard = 0;
    while (pts.some((p) => p[0] === cand[0] && p[1] === cand[1]) && guard < 20) {
      cand = [Math.min(GX1, cand[0] + 1), cand[1]];
      guard++;
    }
    setPts([...pts, cand]);
  };
  const removeVertex = () => {
    if (n <= 3) return;
    setPts(pts.slice(0, n - 1));
  };

  // ---- Labor II számítások ----
  const d2 = dist2(P1, P2);
  const d = Math.sqrt(d2);
  const side = shape === 'oppSquare' ? d / Math.SQRT2 : d;
  const K = shape === 'equilateral' ? 3 * side : 4 * side;
  const T = shape === 'equilateral' ? (side * side * Math.sqrt(3)) / 4 : side * side;
  const shapeText: Record<Shape, string> = {
    adjSquare: 'négyzet, a két pont szomszédos csúcs',
    oppSquare: 'négyzet, a két pont szemközti csúcs',
    equilateral: 'szabályos háromszög, a két pont két csúcs'
  };

  return (
    <TheoryTemplate
      topicId="g11-koordinatageometria"
      subtopicId="tavolsag-kerulet-terulet"
      title="6. Távolság, kerület, terület"
      subtitle="Mekkora a Bermuda-háromszög kerülete és területe? Két pont távolsága koordinátákból, sokszögek kerülete, és terület a befoglaló téglalap segítségével."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • TANANYAG"
      themeColor="blue"
      pdfFilename="11_osztaly_tavolsag_kerulet_terulet_tananyag.pdf"
      practiceTitle="Készen állsz a távolság-, kerület- és területszámításra?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott interaktív kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — KÉT PONT TÁVOLSÁGA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
              <span className="font-mono text-base font-black text-blue-900 dark:text-blue-200">
                AB = |→AB| = √((b₁ − a₁)² + (b₂ − a₂)²)
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Az AB szakasz hossza = az A(a₁; a₂) és B(b₁; b₂) pontok távolsága = az →AB vektor hossza.</li>
              <li><strong>Kerület:</strong> az oldalak (szomszédos csúcsok távolságainak) összege.</li>
              <li>
                <strong>Terület:</strong> foglaljuk a sokszöget a tengelyekkel párhuzamos oldalú, legkisebb téglalapba, és vonjuk ki a levágott derékszögű háromszögek (téglalapok) területét!
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Bevezető */}
      <TheorySection title="1. Bevezető: a Bermuda-háromszög" badge="Tankönyv 230. o." badgeColor="blue">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              A Bermuda-háromszög az Atlanti-óceán egy háromszög alakú része, csúcsai nagyjából <strong>Hamilton</strong> (Bermuda-szigetek), <strong>Miami</strong> (Florida) és <strong>San Juan</strong> (Puerto Rico).
            </p>
            <p>
              A térképre illesztett koordináta-rendszerben a csúcsok: <strong>M(−4; 1)</strong>, <strong>S(4; −4)</strong>, <strong>H(6; 5)</strong>, és <strong>1 egység a valóságban 160 km</strong>. Határozzuk meg a háromszög kerületét és területét!
            </p>
            <p className="text-xs text-slate-500">
              A földrajzi helyeket egy síkban lévőknek tekintjük: a feladat szempontjából a térkép jó leképezése a valóságnak.
            </p>
          </div>
          <BermudaTriangleSvg />
        </div>
      </TheorySection>

      {/* 2. Kerület */}
      <TheorySection title="2. A kerület: oldalak hossza a csúcsok távolságából" badge="Megoldás" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <DistanceFormulaSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>Egy oldal hossza a két végpont távolsága, ami az általuk meghatározott vektor hossza:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>MS = |→MS| = √((4 − (−4))² + (−4 − 1)²) = √(64 + 25) = <strong>√89</strong></li>
              <li>SH = |→SH| = √((6 − 4)² + (5 − (−4))²) = √(4 + 81) = <strong>√85</strong></li>
              <li>HM = |→HM| = √((6 − (−4))² + (5 − 1)²) = √(100 + 16) = <strong>√116</strong></li>
            </ul>
            <p>
              K = √89 + √85 + √116 ≈ <strong>29,4 egység</strong>, a valóságban 29,4 · 160 km ≈ <strong>4700 km</strong>.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* 3. Terület */}
      <TheorySection title="3. A terület: befoglaló téglalap mínusz a levágott háromszögek" badge="Megoldás" badgeColor="sky">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <BoundingRectangleSvg />
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              A T = (a · mₐ) / 2 vagy a T = (a · b · sin γ) / 2 képlethez szükséges adatok kiszámítása túl bonyolult lenne – ezért másképp okoskodunk.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Foglaljuk a háromszöget a lehető legkisebb, a tengelyekkel párhuzamos oldalú téglalapba: x = −4-től 6-ig (10 egység), y = −4-től 5-ig (9 egység).</li>
              <li>A téglalap területe 10 · 9 = <strong>90</strong>.</li>
              <li>A három levágott derékszögű háromszög: (8 · 5) / 2 = 20, (2 · 9) / 2 = 9 és (10 · 4) / 2 = 20.</li>
              <li>T = 90 − 20 − 9 − 20 = <strong>41 területegység</strong>.</li>
              <li>A valóságban: 41 · 160² km² = <strong>1 049 600 km²</strong> (egy területegység 160 km · 160 km).</li>
            </ul>
          </div>
        </div>
      </TheorySection>

      {/* 4. Elmélet */}
      <TheorySection title="4. Elmélet: két pont távolsága" badge="Elmélet" badgeColor="indigo">
        <TheoryCard title="Szakasz hossza koordinátákból" badge="Tétel" badgeColor="blue">
          <p className="text-sm text-slate-700 leading-relaxed">
            Az AB szakasz hossza egyenlő az A(a₁; a₂) és B(b₁; b₂) pontok távolságával, ami megegyezik az →AB vektor abszolút értékével, ezért
            <strong> AB = √((b₁ − a₁)² + (b₂ − a₂)²)</strong>.
          </p>
        </TheoryCard>
        <TheoryTable
          headers={['Feladattípus', 'Módszer']}
          rows={[
            ['Két pont távolsága', 'AB = √((b₁ − a₁)² + (b₂ − a₂)²)'],
            ['Sokszög kerülete', 'a szomszédos csúcsok távolságainak összege'],
            ['Sokszög területe', 'befoglaló téglalap − levágott derékszögű háromszögek és téglalapok'],
            ['Tengellyel párhuzamos oldal', 'hossza a koordináták különbségének abszolút értéke (pl. |6 − (−3)| = 9)'],
            ['Valós méretek', 'távolság · lépték, terület · lépték²']
          ]}
        />
        <TheoryCallout type="tip" title="A sorrend mindegy, a négyzet miatt">
          (b₁ − a₁)² = (a₁ − b₁)², ezért a távolság kiszámításakor nem számít, melyik pontot tekintjük kezdőpontnak: AB = BA.
        </TheoryCallout>
      </TheorySection>

      {/* 5. Kidolgozott feladatok */}
      <TheorySection title="5. Kidolgozott feladatok" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="A) Az ABD háromszög (1. a) feladat)" badge="1. feladat" badgeColor="sky">
            <TriangleABDSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A(−4; −7), B(8; −3), D(0; 3): AB = √(144 + 16) = √160 = 4√10 ≈ 12,65; BD = √(64 + 36) = 10; DA = √(16 + 100) = √116 = 2√29 ≈ 10,77.</li>
              <li><strong>K ≈ 33,42</strong> egység.</li>
              <li>Befoglaló téglalap: 12 · 10 = 120; levágott háromszögek: 24 + 24 + 20 = 68 ⇒ <strong>T = 52</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Az EFC háromszög (1. b) feladat)" badge="1. feladat" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>E(3; −7), F(8; 3), C(−4; 3): EF = √(25 + 100) = √125 = 5√5 ≈ 11,18; FC = 12 (vízszintes oldal!); CE = √(49 + 100) = √149 ≈ 12,21.</li>
              <li><strong>K ≈ 35,39</strong> egység.</li>
              <li>Az FC oldal vízszintes, a hozzá tartozó magasság az E pont távolsága az y = 3 egyenestől: 3 − (−7) = 10 ⇒ <strong>T = (12 · 10) / 2 = 60</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Az ABCD négyszög területe (2. feladat)" badge="2. feladat" badgeColor="emerald">
            <QuadrilateralAreaSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A(−3; 1), B(6; 1), C(3; 5), D(−1; 4). A befoglaló téglalap 9 · 4 = <strong>36</strong>.</li>
              <li>A négyszöghöz toldott részek: 6 + 2 + 2 + 3 = <strong>13</strong> (három derékszögű háromszög és egy 2 · 1-es téglalap).</li>
              <li><strong>T = 36 − 13 = 23</strong> területegység.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="D) Négyzet és szabályos háromszög két csúcsból (3. feladat)" badge="3. feladat" badgeColor="rose">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>a)</strong> Szomszédos csúcsok A(1; 2), B(6; −10): oldal √(25 + 144) = 13 ⇒ <strong>K = 52, T = 169</strong>.</li>
              <li><strong>b)</strong> Szemközti csúcsok A(7; −3), C(1; 5): átló √(36 + 64) = 10, oldal 10 / √2 = 5√2 ⇒ <strong>K = 20√2 ≈ 28,28, T = 50</strong> (T = e² / 2, ahol e az átló).</li>
              <li><strong>c)</strong> Szabályos háromszög A(−12; 20), B(15; −16): oldal √(729 + 1296) = √2025 = 45 ⇒ <strong>K = 135</strong>, T = 45² · √3 / 4 ≈ <strong>876,85</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="E) Házi feladatok eredményei" badge="Ellenőrzés" badgeColor="slate">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>HF 1.</strong> A(1; −4), B(7; 2), C(−5; −2) súlyvonalai (az oldalfelező pontokba futnak, pl. BC felezőpontja (1; 0)): sₐ = 4, s_b = √106 ≈ 10,30, s_c = √82 ≈ 9,06.</li>
              <li><strong>HF 2.</strong> P(1; −4), Q(7; 2), R(−5; −2): PQ = 6√2, QR = 4√10, RP = 2√10 ⇒ K = 6√2 + 6√10 ≈ 27,46; T = 24.</li>
              <li><strong>HF 3.</strong> a = 5√2 ≈ 7,07 (négyzet átlója, oldal 5); b = 4√3 ≈ 6,93 (szabályos háromszög magassága, oldal 8); c = 2√13 ≈ 7,21 (szabályos hatszög leghosszabb átlója = 2 · oldal). Sorrend: <strong>b &lt; a &lt; c</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="F) Mire figyeljünk a téglalapos módszernél?" badge="Módszer" badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A téglalap oldalai a tengelyekkel párhuzamosak, és a sokszög legkisebb és legnagyobb x, illetve y koordinátáin mennek át.</li>
              <li>A levágott részek derékszögű háromszögek (vagy téglalapok), befogóik a koordináták különbségei.</li>
              <li>A derékszögű háromszög területe a befogók szorzatának <strong>fele</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 6. Csapda */}
      <TheorySection title="6. Tipikus hiba: elmarad a felezés vagy a gyökvonás" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A levágott derékszögű háromszögeknél a befogók szorzatának fele kell!"
          wrong="T(MSH) = 10 · 9 − 8 · 5 − 2 · 9 − 10 · 4 = −8"
          wrongExplanation="A befoglaló téglalapból derékszögű HÁROMSZÖGEKET vágunk le, ezek területe (a · b) / 2. Felezés nélkül negatív (lehetetlen) eredmény jön ki. Hasonló hiba a távolságnál a gyökvonás elhagyása: MS = 89 helyett √89 ≈ 9,43."
          correct="T(MSH) = 90 − 20 − 9 − 20 = 41"
          correctExplanation="A levágott részek: (8 · 5) / 2 = 20, (2 · 9) / 2 = 9, (10 · 4) / 2 = 20. A valós területnél a lépték NÉGYZETÉVEL szorzunk: 41 · 160² = 1 049 600 km²."
          tip="Ellenőrzés: a sokszög területe mindig kisebb a befoglaló téglalapénál, és pozitív."
        />
      </TheorySection>

      {/* 7. Labor I */}
      <TheorySection title="7. Interaktív Laboratórium I: Húzható csúcsok – kerület és terület" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((pr) => (
                  <button
                    key={pr.name}
                    onClick={() => setPts(pr.pts)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-100 text-blue-800 hover:bg-blue-200"
                  >
                    {pr.name}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={addVertex}
                  disabled={n >= 6}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-800 hover:bg-emerald-200 disabled:opacity-40"
                >
                  + csúcs
                </button>
                <button
                  onClick={removeVertex}
                  disabled={n <= 3}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-100 text-rose-800 hover:bg-rose-200 disabled:opacity-40"
                >
                  − csúcs
                </button>
                <button
                  onClick={() => setShowBox((s) => !s)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  {showBox ? 'Befoglaló téglalap elrejtése' : 'Befoglaló téglalap'}
                </button>
              </div>
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div className="text-xs text-slate-500">
                  Csúcsok: {pts.map((p, i) => `${NAMES[i]}(${num(p[0])}; ${num(p[1])})`).join(', ')}
                </div>
                {pts.map((p, i) => {
                  const q = pts[(i + 1) % n];
                  return (
                    <div key={i}>
                      {NAMES[i]}
                      {NAMES[(i + 1) % n]} = √({sq(q[0] - p[0])} + {sq(q[1] - p[1])}) = {rootText(sides[i])}
                      {Number.isInteger(Math.sqrt(sides[i])) ? '' : ` ≈ ${fmt(Math.sqrt(sides[i]))}`}
                    </div>
                  );
                })}
                <div>
                  <strong>K ≈ {fmt(perimeter)}</strong> egység
                </div>
                {simple ? (
                  <>
                    <div>
                      Befoglaló téglalap: {num(bx1 - bx0)} · {num(by1 - by0)} = {num(boxArea)}; levágott részek: {num(boxArea - area)}
                    </div>
                    <div>
                      <strong>T = {num(boxArea)} − {num(boxArea - area)} = {num(area)}</strong> területegység
                    </div>
                  </>
                ) : (
                  <div className="font-sans text-rose-700 font-bold">
                    Az oldalak metszik egymást (vagy a csúcsok egy egyenesre esnek) – ez így nem sokszög. Húzd arrébb valamelyik csúcsot!
                  </div>
                )}
              </div>
              <p className="text-xs text-slate-500 italic">
                Fogd meg és húzd a piros csúcsokat! A csúcsok mindig rácspontra ugranak. A szürke szaggatott téglalap a sokszöget befoglaló, a tengelyekkel párhuzamos oldalú legkisebb téglalap.
              </p>
            </div>
            <svg
              ref={svgRef}
              viewBox={`0 0 ${GW} ${GH}`}
              className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200 select-none touch-none"
              onPointerMove={onMove}
              onPointerUp={() => setDrag(null)}
              onPointerLeave={() => setDrag(null)}
            >
              {Array.from({ length: GX1 - GX0 + 1 }, (_, k) => GX0 + k).map((x) => (
                <line key={'vx' + x} x1={SX(x)} y1={SY(GY0)} x2={SX(x)} y2={SY(GY1)} stroke="#e2e8f0" />
              ))}
              {Array.from({ length: GY1 - GY0 + 1 }, (_, k) => GY0 + k).map((y) => (
                <line key={'hy' + y} x1={SX(GX0)} y1={SY(y)} x2={SX(GX1)} y2={SY(y)} stroke="#e2e8f0" />
              ))}
              <DPAArrow x1={SX(GX0)} y1={SY(0)} x2={SX(GX1) + 8} y2={SY(0)} color="#334155" width={1.4} head={7} />
              <DPAArrow x1={SX(0)} y1={SY(GY0)} x2={SX(0)} y2={SY(GY1) - 8} color="#334155" width={1.4} head={7} />
              <text x={SX(0) - 5} y={SY(0) + 12} fontSize="10" textAnchor="end" fill="#334155">O</text>
              <text x={SX(1)} y={SY(0) + 12} fontSize="9" textAnchor="middle" fill="#64748b">1</text>
              <text x={SX(0) - 5} y={SY(1) + 3} fontSize="9" textAnchor="end" fill="#64748b">1</text>
              {showBox && simple && (
                <rect
                  x={SX(bx0)}
                  y={SY(by1)}
                  width={(bx1 - bx0) * CELL}
                  height={(by1 - by0) * CELL}
                  fill="rgba(250,204,21,0.12)"
                  stroke="#94a3b8"
                  strokeDasharray="5 4"
                />
              )}
              <polygon
                points={pts.map((p) => `${SX(p[0])},${SY(p[1])}`).join(' ')}
                fill={simple ? 'rgba(59,130,246,0.20)' : 'rgba(244,63,94,0.15)'}
                stroke={simple ? '#2563eb' : '#e11d48'}
                strokeWidth="2.5"
              />
              {pts.map((p, i) => {
                const q = pts[(i + 1) % n];
                return (
                  <text
                    key={'s' + i}
                    x={(SX(p[0]) + SX(q[0])) / 2}
                    y={(SY(p[1]) + SY(q[1])) / 2 - 4}
                    fontSize="10"
                    textAnchor="middle"
                    fill="#1e3a8a"
                    fontWeight="bold"
                  >
                    {fmt(Math.sqrt(sides[i]), 1)}
                  </text>
                );
              })}
              {pts.map((p, i) => (
                <g
                  key={'v' + i}
                  style={{ cursor: 'grab' }}
                  onPointerDown={(e) => {
                    e.preventDefault();
                    (e.currentTarget.ownerSVGElement as SVGSVGElement | null)?.setPointerCapture?.(e.pointerId);
                    setDrag(i);
                  }}
                >
                  <circle cx={SX(p[0])} cy={SY(p[1])} r="14" fill="transparent" />
                  <circle cx={SX(p[0])} cy={SY(p[1])} r="7" fill={drag === i ? '#f59e0b' : '#dc2626'} stroke="#ffffff" strokeWidth="2" />
                  <text x={SX(p[0]) + 9} y={SY(p[1]) - 9} fontSize="12" fontWeight="bold" fill="#0f172a">
                    {NAMES[i]}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </TheorySection>

      {/* 8. Labor II */}
      <TheorySection title="8. Interaktív Laboratórium II: Két csúcsból négyzet vagy szabályos háromszög" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'P₁ első koordinátája', val: P1[0], set: (x: number) => setP1([x, P1[1]]) },
              { label: 'P₁ második koordinátája', val: P1[1], set: (y: number) => setP1([P1[0], y]) },
              { label: 'P₂ első koordinátája', val: P2[0], set: (x: number) => setP2([x, P2[1]]) },
              { label: 'P₂ második koordinátája', val: P2[1], set: (y: number) => setP2([P2[0], y]) }
            ].map((f) => (
              <div key={f.label}>
                <label className="block text-xs font-semibold text-slate-600 mb-1">{f.label}</label>
                <input
                  type="number"
                  step="0.1"
                  value={f.val}
                  onChange={(e) => f.set(Number(e.target.value) || 0)}
                  className="w-full border border-slate-300 rounded-lg px-2 py-1 text-sm"
                  aria-label={f.label}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {(
              [
                ['adjSquare', 'Négyzet: szomszédos csúcsok'],
                ['oppSquare', 'Négyzet: szemközti csúcsok'],
                ['equilateral', 'Szabályos háromszög']
              ] as [Shape, string][]
            ).map(([k, label]) => (
              <button
                key={k}
                onClick={() => setShape(k)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold ${shape === k ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800 hover:bg-purple-200'}`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { name: '3. a)', a: [1, 2] as DPAPoint, b: [6, -10] as DPAPoint, s: 'adjSquare' as Shape },
              { name: '3. b)', a: [7, -3] as DPAPoint, b: [1, 5] as DPAPoint, s: 'oppSquare' as Shape },
              { name: '3. c)', a: [-12, 20] as DPAPoint, b: [15, -16] as DPAPoint, s: 'equilateral' as Shape },
              { name: 'Bermuda MS', a: [-4, 1] as DPAPoint, b: [4, -4] as DPAPoint, s: 'adjSquare' as Shape }
            ].map((pr) => (
              <button
                key={pr.name}
                onClick={() => {
                  setP1(pr.a);
                  setP2(pr.b);
                  setShape(pr.s);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-100 text-amber-800 hover:bg-amber-200"
              >
                {pr.name}
              </button>
            ))}
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Lépték: 1 egység = {scale} km {scale === 1 ? '(nincs átváltás)' : ''}</label>
            <input
              type="range"
              min="1"
              max="200"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="w-full accent-amber-600"
              aria-label="lépték"
            />
            <button
              onClick={() => setScale(160)}
              className="mt-1 px-2 py-1 rounded text-xs font-bold bg-sky-100 text-sky-800 hover:bg-sky-200"
            >
              Bermuda-lépték: 160 km
            </button>
          </div>
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 text-sm text-slate-700 space-y-1 font-mono">
            <div>
              P₁P₂ = √({sq(P2[0] - P1[0])} + {sq(P2[1] - P1[1])}) = √{num(d2)} ≈ <strong>{fmt(d)}</strong> egység
              {scale !== 1 && <> ≈ {fmtBig(d * scale)} km</>}
            </div>
            <div className="font-sans">Alakzat: {shapeText[shape]}</div>
            <div>
              oldal ≈ {fmt(side)}
              {shape === 'oppSquare' && ' (= e / √2, ahol e az átló)'}
            </div>
            <div>
              <strong>K ≈ {fmt(K)}</strong> egység{scale !== 1 && <> ≈ {fmtBig(K * scale)} km</>}
            </div>
            <div>
              <strong>T ≈ {fmt(T)}</strong> területegység{scale !== 1 && <> ≈ {fmtBig(T * scale * scale)} km²</>}
            </div>
          </div>
          <TheoryCallout type="success" title="Próbáld ki a tankönyvi adatokkal!">
            3. a) K = 52, T = 169; 3. b) K ≈ 28,28, T = 50; 3. c) K = 135, T ≈ 876,85. Figyeld meg: a lépték a távolságot és a kerületet egyszeresen, a területet a négyzetével szorozza!
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default DistancePerimeterAreaTheory;
