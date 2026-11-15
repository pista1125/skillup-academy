import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { MidpointPlane, CP, PlaneLine } from '../felezopont/MidpointFigures';
import {
  CoordPracticeExamPerpLinesSvg,
  CoordPracticeExamTriangleSvg,
  CoordPracticeExamCircleAxisSvg,
  CoordPracticeExamVectorSumSvg,
  CoordPracticeExamRhombusSvg,
  CoordPracticeExamRightTriangleSvg
} from './CoordPracticeExamFigures';

/** Magyar számformátum: tizedesvessző, valódi mínuszjel. */
const fmt = (x: number, d = 3) => {
  if (!Number.isFinite(x)) return '–';
  const r = Number(x.toFixed(d));
  return String(Object.is(r, -0) ? 0 : r).replace('.', ',').replace('-', '−');
};
const vec = (v: CP) => `(${fmt(v[0])}; ${fmt(v[1])})`;
const signed = (v: number) => (v < 0 ? `+ ${fmt(-v)}` : `− ${fmt(v)}`);

const VEC_PRESETS: { name: string; a: CP; b: CP; lambda: number }[] = [
  { name: 'Tudáspróba I. (→a, →b)', a: [1, 4], b: [-3, 6], lambda: 0.5 },
  { name: 'Merőleges pár', a: [2, -3], b: [3, 2], lambda: 2 },
  { name: 'Párhuzamos pár', a: [2, -3], b: [-4, 6], lambda: -1 },
  { name: '120°, hosszuk 5 (≈)', a: [5, 0], b: [-2.5, 4.5], lambda: 1 }
];

type CircleLinePreset = { name: string; u: number; v: number; r: number; vertical: boolean; m: number; b: number; c: number };
const CL_PRESETS: CircleLinePreset[] = [
  { name: 'x² + y² = 25 és y = x + 1', u: 0, v: 0, r: 5, vertical: false, m: 1, b: 1, c: 0 },
  { name: 'Érintő: 3x + 4y = 25', u: 0, v: 0, r: 5, vertical: false, m: -0.75, b: 6.25, c: 0 },
  { name: '76. lecke: x = 3,5', u: 2, v: 1, r: Math.sqrt(8.5), vertical: true, m: 0, b: 0, c: 3.5 },
  { name: 'Érettségi 2010: x tengely', u: 4, v: 4, r: 5, vertical: false, m: 0, b: 0, c: 0 },
  { name: 'Nincs közös pont', u: -2, v: -1, r: 3, vertical: false, m: 0.5, b: 5, c: 0 }
];

export const CoordPracticeExamTheory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  // Labor I: vektorműveletek
  const [a, setA] = useState<CP>(VEC_PRESETS[0].a);
  const [b, setB] = useState<CP>(VEC_PRESETS[0].b);
  const [lambda, setLambda] = useState(VEC_PRESETS[0].lambda);

  // Labor II: kör és egyenes
  const [cl, setCl] = useState<CircleLinePreset>(CL_PRESETS[0]);

  const sum: CP = [a[0] + b[0], a[1] + b[1]];
  const diff: CP = [a[0] - b[0], a[1] - b[1]];
  const scaled: CP = [lambda * a[0], lambda * a[1]];
  const len = (v: CP) => Math.hypot(v[0], v[1]);
  const rotPlus: CP = [-a[1], a[0]];
  const rotMinus: CP = [a[1], -a[0]];
  const la = len(a);
  const lb = len(b);
  const cosG = la > 1e-9 && lb > 1e-9 ? (la * la + lb * lb - len(diff) ** 2) / (2 * la * lb) : NaN;
  const gamma = Number.isFinite(cosG) ? (Math.acos(Math.max(-1, Math.min(1, cosG))) * 180) / Math.PI : NaN;
  const cross = a[0] * b[1] - a[1] * b[0];
  const relation =
    la < 1e-9 || lb < 1e-9
      ? 'Az egyik vektor nullvektor.'
      : Math.abs(cross) < 1e-9
        ? 'A két vektor PÁRHUZAMOS (egymás számszorosai).'
        : Math.abs(gamma - 90) < 1e-6
          ? 'A két vektor MERŐLEGES egymásra.'
          : 'A két vektor sem nem párhuzamos, sem nem merőleges.';
  const vMax = Math.max(6, ...[a, b, sum, diff, scaled].flatMap((v) => [Math.abs(v[0]), Math.abs(v[1])])) + 1;
  const vWin: [number, number] = [-Math.ceil(vMax), Math.ceil(vMax)];
  const vUnit = Math.max(8, Math.min(22, 300 / (2 * Math.ceil(vMax))));

  // Labor II számítások
  const { u, v, r, vertical, m, b: bb, c } = cl;
  let D = 0;
  let pts: CP[] = [];
  if (vertical) {
    const q = r * r - (c - u) ** 2;
    D = q;
    if (q > 1e-9) pts = [[c, v + Math.sqrt(q)], [c, v - Math.sqrt(q)]];
    else if (Math.abs(q) <= 1e-9) pts = [[c, v]];
  } else {
    const A2 = 1 + m * m;
    const B1 = 2 * (m * (bb - v) - u);
    const C0 = u * u + (bb - v) ** 2 - r * r;
    D = B1 * B1 - 4 * A2 * C0;
    if (D > 1e-9) {
      const x1 = (-B1 + Math.sqrt(D)) / (2 * A2);
      const x2 = (-B1 - Math.sqrt(D)) / (2 * A2);
      pts = [[x1, m * x1 + bb], [x2, m * x2 + bb]];
    } else if (Math.abs(D) <= 1e-9) {
      const x0 = -B1 / (2 * A2);
      pts = [[x0, m * x0 + bb]];
    }
  }
  const clText = pts.length === 2 ? 'Az egyenes METSZI a kört (szelő): 2 közös pont.' : pts.length === 1 ? 'Az egyenes ÉRINTI a kört: 1 közös pont.' : 'Az egyenesnek és a körnek NINCS közös pontja.';
  const clLine: PlaneLine = vertical
    ? { p: [c, 0], d: [0, 1], color: '#dc2626', label: 'e', width: 2 }
    : { p: [0, bb], d: [1, m], color: '#dc2626', label: 'e', width: 2 };
  const cWin = { x: [Math.floor(u - r) - 2, Math.ceil(u + r) + 2] as [number, number], y: [Math.floor(v - r) - 2, Math.ceil(v + r) + 2] as [number, number] };
  if (cWin.x[0] > 0) cWin.x[0] = -1;
  if (cWin.x[1] < 0) cWin.x[1] = 1;
  if (cWin.y[0] > 0) cWin.y[0] = -1;
  if (cWin.y[1] < 0) cWin.y[1] = 1;
  const cSpan = Math.max(cWin.x[1] - cWin.x[0], cWin.y[1] - cWin.y[0]);
  const cUnit = Math.max(8, Math.min(26, 300 / cSpan));

  const slider = (label: string, val: number, set: (v: number) => void, min: number, max: number, step: number, accent: string) => (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1">
        {label}: {fmt(val, 2)}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={val}
        onChange={(e) => set(Number(e.target.value))}
        className={`w-full ${accent}`}
        aria-label={label}
      />
    </div>
  );


  return (
    <TheoryTemplate
      topicId="g11-koordinatageometria"
      subtopicId="gyakorlas-tudasproba"
      title="17. Gyakorlás, tudáspróba"
      subtitle="A VI. fejezet összefoglalása: vektorok, pontok, távolság, felezőpont, az egyenes és a kör egyenlete, metszéspontok, párhuzamosság és merőlegesség – érettségi feladatokkal és két tudáspróbával."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • TANANYAG"
      themeColor="blue"
      pdfFilename="11_osztaly_koordinatageometria_tudasproba_tananyag.pdf"
      practiceTitle="Készen állsz a koordinátageometria tudáspróbára?"
      practiceSubtitle="Tedd próbára tudásodat a 3 szintre bontott, 90 kérdéses fejezetzáró kvízben!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS SZABÁLY — A FEJEZET LEGFONTOSABB KÉPLETEI',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center">
              <span className="font-mono text-base font-black text-blue-900 dark:text-blue-200">
                →AB(b₁ − a₁; b₂ − a₂) &nbsp;|&nbsp; y = mx + b &nbsp;|&nbsp; (x − u)² + (y − v)² = r²
              </span>
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                <strong>Vektorok:</strong> koordinátánként adunk össze, vonunk ki és szorzunk; |→a| = √(a₁² + a₂²); +90°-os elforgatott: (−a₂; a₁).
              </li>
              <li>
                <strong>Pontok:</strong> AB = √((b₁ − a₁)² + (b₂ − a₂)²), F = (A + B)/2, S = (A + B + C)/3.
              </li>
              <li>
                <strong>Egyenesek:</strong> m = tg α = v₂/v₁; párhuzamos: m₁ = m₂; merőleges: m₁ · m₂ = −1; metszéspont: egyenletrendszer.
              </li>
              <li>
                <strong>Kör:</strong> P a körön ⇔ KP = r; a kör és egyenes közös pontjai: másodfokú egyenletrendszer.
              </li>
            </ul>
          </div>
        )
      }}
    >
      {/* 1. Vektorok */}
      <TheorySection title="1. Összefoglaló: vektorok (1–5. lecke)" badge="Ismétlés" badgeColor="blue">
        <TheoryTable
          headers={['Fogalom', 'Szabály', 'Példa']}
          rows={[
            ['Vektor', 'iránya és hossza (abszolút értéke) jellemzi; jele |→v|', 'egyenlő vektorok: párhuzamosak, egyirányúak, egyenlő hosszúak'],
            ['Összeadás', 'összefűzés (háromszögmódszer) vagy paralelogramma-módszer', '→AB + →BC = →AC'],
            ['Kivonás', 'közös kezdőpontból: a kivonandó végpontjából a kisebbítendő végpontjába', '→AB − →AC = →CB'],
            ['Számszoros', 'λ→a párhuzamos →a-val, hossza |λ| · |→a|; λ < 0 esetén ellentétes irányú', '|−3→a| = 3|→a|'],
            ['Felbontás', 'ha →a és →b nem párhuzamos: →v = m→a + n→b egyértelműen', '(7; 1) = 4 · (1; 1) + 3 · (1; −1)'],
            ['Koordináták', '→a = a₁→i + a₂→j ⇔ →a(a₁; a₂); helyvektor: →OA', '3→i − 2→j = (3; −2)'],
            ['Műveletek koordinátákkal', '(a₁ ± b₁; a₂ ± b₂), λ · (a₁; a₂) = (λa₁; λa₂)', '(1; 4) + 4 · (½; 3/2) = (3; 10)'],
            ['Elforgatás', '+90°: (−a₂; a₁), −90°: (a₂; −a₁)', '½→b = (−1,5; 3) ⇒ (−3; −1,5) és (3; 1,5)']
          ]}
        />
      </TheorySection>

      {/* 2. Pontok, egyenesek, kör */}
      <TheorySection title="2. Összefoglaló: pontok, egyenesek, kör (6–16. lecke)" badge="Ismétlés" badgeColor="indigo">
        <TheoryTable
          headers={['Téma', 'Képlet / eljárás', 'Példa']}
          rows={[
            ['Két pont távolsága', 'AB = √((b₁ − a₁)² + (b₂ − a₂)²)', 'A(1; 2), B(7; 10): AB = 10'],
            ['Felezőpont, súlypont', 'F = (A + B)/2, S = (A + B + C)/3', 'A(−5; 3), B(1; −5): F(−2; −1)'],
            ['Egyenes egyenlete', 'y = mx + b, x = c, illetve Ax + By = C', '4x + 3y = −11 ⇔ y = −(4/3)x − 11/3'],
            ['Meredekség, irányszög', 'm = v₂/v₁ = tg α, −90° < α ≤ 90°', 'm = 2,5 ⇒ α ≈ 68,2°'],
            ['Párhuzamos / merőleges', 'm₁ = m₂ / m₁ · m₂ = −1', 'y = 5x − 9 ∥ y = 5x + 39'],
            ['Metszéspont', 'a két egyenlet közös megoldása', 'e: 5x − 2y = −7, f: y = 5x − 9 ⇒ (5; 16)'],
            ['Kör egyenlete', '(x − u)² + (y − v)² = r²', 'K(−2; −1), r = 5: (x + 2)² + (y + 1)² = 25'],
            ['Pont és kör', 'KP < r: belül, KP = r: a körön, KP > r: kívül', 'S(1; 3): 9 + 16 = 25 ⇒ a körön'],
            ['Thalész-tétel', 'derékszögű háromszög körülírt körének középpontja az átfogó felezőpontja', 'A(−3; 7), C(−1; 23) ⇒ K(−2; 15)']
          ]}
        />
        <TheoryCallout type="info" title="Érintők száma egy adott ponton át">
          Ha a pont a körön belül van, nincs érintő; ha a körön van, 1 érintő van (merőleges a sugárra); ha a körön kívül van, 2 érintő húzható.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Érettségi feladatok */}
      <TheorySection title="3. Kidolgozott érettségi feladatok" badge="Tankönyv 260. o." badgeColor="amber">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="1. Érettségi 2011: két merőleges egyenes" badge="1. feladat" badgeColor="sky">
            <CoordPracticeExamPerpLinesSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>e: 5x − 2y = −14,5; f: 2x + 5y = 14,5.</li>
              <li>a) Az első egyenletet 5-tel, a másodikat 2-vel szorozva és összeadva: 29x = −43,5 ⇒ x = −1,5, y = 3,5: <strong>P(−1,5; 3,5)</strong>.</li>
              <li>b) m(e) = 5/2, m(f) = −2/5, szorzatuk <strong>−1</strong> ⇒ e ⊥ f.</li>
              <li>c) tg α = 2,5 ⇒ <strong>α ≈ 68,2°</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="2. Érettségi 2012: háromszög" badge="2. feladat" badgeColor="emerald">
            <CoordPracticeExamTriangleSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A(−2; −1), B(9; −3), C(−3; 6).</li>
              <li>a) →BC = (−12; 9), m = −3/4 ⇒ y + 3 = −(3/4)(x − 9) ⇒ <strong>3x + 4y = 15</strong>.</li>
              <li>b) BC = √(144 + 81) = 15, a vele párhuzamos középvonal ennek fele: <strong>7,5</strong>.</li>
              <li>c) CA = √50, CB = 15, AB = √125. Koszinusztétellel: cos γ = (50 + 225 − 125)/(2 · √50 · 15) = 150/(150√2) = 1/√2 ⇒ <strong>γ = 45°</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="3. Érettségi 2010: kör a tengelyen" badge="3. feladat" badgeColor="purple">
            <CoordPracticeExamCircleAxisSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>A kör középpontja egyenlő távol van az (1; 0) és (7; 0) ponttól, ezért a szakasz felezőmerőlegesén, az <strong>x = 4</strong> egyenesen van.</li>
              <li>Az y = x egyenesen is rajta van ⇒ <strong>K(4; 4)</strong>.</li>
              <li>Ellenőrzés: r² = 3² + 4² = 25, a kör (x − 4)² + (y − 4)² = 25.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="4. Érettségi 2007: egyenes és kör" badge="4. feladat" badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>a) e: 4x + 3y = −11. P(100; −36): 400 − 108 = 292 ≠ −11 ⇒ P <strong>nincs</strong> az egyenesen.</li>
              <li>Q ordinátája 107: 4x + 321 = −11 ⇒ <strong>x = −83</strong>.</li>
              <li>b) AB átmérő, A(−5; 3), B(1; −5): K(−2; −1), r = AB/2 = 10/2 = 5 ⇒ <strong>(x + 2)² + (y + 1)² = 25</strong>.</li>
              <li>S(1; 3): 3² + 4² = 25 ⇒ S <strong>rajta van</strong> a körön.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="5. Érettségi 2015: vektorok és rombusz" badge="5. feladat" badgeColor="rose">
            <CoordPracticeExamVectorSumSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>a) →AB + →AC a 120°-os szögű rombusz rövidebb átlója: két 5 egységes oldallal és 60°-os szöggel szabályos háromszöget alkot ⇒ <strong>5</strong>.</li>
              <li>b) →AB − →AC = →CB, a hosszabb átló: 2 · 5 · sin 60° = <strong>5√3 ≈ 8,66</strong>.</li>
            </ul>
            <CoordPracticeExamRhombusSvg className="w-full h-auto my-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>c) K(4; −3), T(7; 1): R = 2K − T = <strong>R(1; −7)</strong>.</li>
              <li>→KT = (3; 4), KT = 5. Mivel RT = PS/2, KP = 2 · KT = 10, és KP ⊥ KT: →KP = ±(−8; 6).</li>
              <li><strong>P(−4; 3), S(12; −9)</strong> (vagy fordított betűzéssel P(12; −9), S(−4; 3)).</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Tudáspróba II. 4.: derékszögű háromszög" badge="Tudáspróba" badgeColor="teal">
            <CoordPracticeExamRightTriangleSvg className="w-full h-auto mb-3" />
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li>AB: 3x − 2y = −23 (m = 3/2), az átfogó A(−3; 7), C(−1; 23) ⇒ a derékszög B-nél van.</li>
              <li>a) BC ⊥ AB, m = −2/3, átmegy C-n: <strong>2x + 3y = 67</strong>.</li>
              <li>b) A két egyenes metszéspontja: <strong>B(5; 19)</strong>.</li>
              <li>c) Thalész: K = AC felezőpontja = (−2; 15), r² = 1 + 64 = 65 ⇒ <strong>(x + 2)² + (y − 15)² = 65</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Tudáspróbák */}
      <TheorySection title="4. A tudáspróbák megoldásai" badge="Ellenőrzés" badgeColor="slate">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard title="Tudáspróba I." badge="I." badgeColor="blue">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>1.</strong> →a(1; 4), →b(−3; 6), →c(½; 3/2): →a + 4→c = (3; 10); ½→b = (−1,5; 3) elforgatottjai (−3; −1,5) és (3; 1,5); BC felezőpontja (−1,25; 3,75); AB: x + 2y = 9.</li>
              <li><strong>2.</strong> e: 5x − 2y = −7, f: y = 5x − 9, g: cx + 4y = 5. a) c = 13/3; b) y = 5x + 39; c) g ⊥ e ⇔ c = 1,6; d) (0; 3,5); e) e ∩ f = (5; 16).</li>
              <li><strong>3.</strong> A(1; −3), B(−2; −7), C(−2; 6): →AB(−3; −4); BC: x = −2; A rajta van a körön (25 + 144 = 169); (x + 2)² + (y − 6)² = 16; (x − 1)² + (y + 3)² = 1.</li>
              <li><strong>4.</strong> Rombusz A(1; 4), C(9; −6), AB: 13x − 6y = −11. BD az AC felezőmerőlegese: 4x − 5y = 25; B(−5; −9), D(15; 7); oldal: √205 ≈ 14,32.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="Tudáspróba II." badge="II." badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 leading-relaxed">
              <li><strong>1.</strong> →a(2; 4), →c(−2/3; 5/3): →a + 6→c = (−2; 14); ½→a = (1; 2) elforgatottjai (−2; 1) és (2; −1).</li>
              <li><strong>2.</strong> e: −3x + 4y = 11, f: y = 6x − 13, g: kx + 2y = 1. a) k = 1; b) y = 6x − 32; c) g ⊥ e ⇔ k = 8/3; d) (−11/3; 0); e) e ∩ f = (3; 5).</li>
              <li><strong>3.</strong> P(1; 7), Q(1; −4), R(−2; 5): →PR(−3; −2); PQ: x = 1; P rajta van a körön (25 + 144 = 169); (x − 1)² + (y + 4)² = 9; (x − 1)² + (y − 7)² = 49.</li>
              <li><strong>4.</strong> BC: 2x + 3y = 67, B(5; 19), körülírt kör: (x + 2)² + (y − 15)² = 65.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. Csapda */}
      <TheorySection title="5. Tipikus hiba: előjel és sugár a kör egyenletében" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="(x − u)² + (y − v)² = r² – a zárójelben MÍNUSZ, a jobb oldalon r NÉGYZETE áll"
          wrong="K(−2; −1), r = 5 ⇒ (x − 2)² + (y − 1)² = 5"
          wrongExplanation="Két hiba is van: a középpont koordinátáit ellentétes előjellel kell beírni (x − (−2) = x + 2), és a jobb oldalra r² = 25 kerül, nem r."
          correct="(x + 2)² + (y + 1)² = 25"
          correctExplanation="Ellenőrzés egy körponttal: S(1; 3) esetén (1 + 2)² + (3 + 1)² = 9 + 16 = 25 ✓."
          tip="Visszafelé is figyelj: (x + 1)² + (y − 5)² = 9 középpontja K(−1; 5), sugara √9 = 3."
        />
      </TheorySection>

      {/* 6. Labor I */}
      <TheorySection title="6. Interaktív Laboratórium I: Vektorműveletek koordinátákkal" badge="Labor" badgeColor="blue">
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {VEC_PRESETS.map((pr) => (
              <button
                key={pr.name}
                onClick={() => {
                  setA(pr.a);
                  setB(pr.b);
                  setLambda(pr.lambda);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-100 text-blue-800 hover:bg-blue-200"
              >
                {pr.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {slider('a₁', a[0], (x) => setA([x, a[1]]), -6, 6, 0.5, 'accent-blue-600')}
                {slider('a₂', a[1], (y) => setA([a[0], y]), -6, 6, 0.5, 'accent-blue-600')}
                {slider('b₁', b[0], (x) => setB([x, b[1]]), -6, 6, 0.5, 'accent-emerald-600')}
                {slider('b₂', b[1], (y) => setB([b[0], y]), -6, 6, 0.5, 'accent-emerald-600')}
              </div>
              {slider('λ (szorzó)', lambda, setLambda, -3, 3, 0.5, 'accent-amber-600')}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div className="text-purple-700">→a + →b = {vec(sum)}, |→a + →b| ≈ {fmt(len(sum), 3)}</div>
                <div className="text-rose-700">→a − →b = {vec(diff)}, |→a − →b| ≈ {fmt(len(diff), 3)}</div>
                <div className="text-amber-700">λ→a = {vec(scaled)}, |λ→a| ≈ {fmt(len(scaled), 3)}</div>
                <div>|→a| ≈ {fmt(la, 3)}, |→b| ≈ {fmt(lb, 3)}</div>
                <div>→a +90°-os elforgatottja: {vec(rotPlus)}, −90°-os: {vec(rotMinus)}</div>
                <div>A két vektor szöge (koszinusztétellel) ≈ {fmt(gamma, 1)}°</div>
                <div className="font-bold text-slate-900">{relation}</div>
              </div>
              <TheoryCallout type="tip" title="Kísérletezz!">
                Állítsd →b-t az →a +90°-os elforgatottjára: a szög 90° lesz, és |→a + →b| = |→a − →b| – a paralelogramma ilyenkor téglalap (egyenlő hosszú vektoroknál négyzet).
              </TheoryCallout>
            </div>
            <MidpointPlane
              x={vWin}
              y={vWin}
              unit={vUnit}
              labels={vMax > 10 ? 5 : 2}
              className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200"
              polys={[{ pts: [[0, 0], a, sum, b], fill: 'rgba(124,58,237,0.05)', stroke: '#cbd5e1', dashed: true }]}
              vecs={[
                { from: [0, 0], to: scaled, color: '#f59e0b', width: 5, label: 'λa', lx: 14, ly: 14 },
                { from: [0, 0], to: a, color: '#2563eb', label: 'a', lx: -10, ly: -4 },
                { from: [0, 0], to: b, color: '#059669', label: 'b', lx: -10, ly: -4 },
                { from: [0, 0], to: sum, color: '#7c3aed', dashed: true, label: 'a+b', lx: 14, ly: -4 },
                { from: b, to: a, color: '#dc2626', dashed: true, label: 'a−b', lx: 12, ly: 14 }
              ]}
            />
          </div>
        </div>
      </TheorySection>

      {/* 7. Labor II */}
      <TheorySection title="7. Interaktív Laboratórium II: Kör és egyenes közös pontjai" badge="Labor" badgeColor="purple">
        <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap gap-2">
            {CL_PRESETS.map((pr) => (
              <button
                key={pr.name}
                onClick={() => setCl(pr)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-100 text-purple-800 hover:bg-purple-200"
              >
                {pr.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                {slider('u', u, (x) => setCl({ ...cl, u: x }), -8, 8, 0.5, 'accent-purple-600')}
                {slider('v', v, (y) => setCl({ ...cl, v: y }), -8, 8, 0.5, 'accent-purple-600')}
                {slider('r', r, (x) => setCl({ ...cl, r: x }), 0.5, 10, 0.5, 'accent-purple-600')}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCl({ ...cl, vertical: false })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${!vertical ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-800'}`}
                >
                  y = mx + b
                </button>
                <button
                  onClick={() => setCl({ ...cl, vertical: true })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${vertical ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-800'}`}
                >
                  x = c (függőleges)
                </button>
              </div>
              {vertical ? (
                slider('c', c, (x) => setCl({ ...cl, c: x }), -10, 10, 0.5, 'accent-rose-600')
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {slider('m (meredekség)', m, (x) => setCl({ ...cl, m: x }), -4, 4, 0.25, 'accent-rose-600')}
                  {slider('b (tengelymetszet)', bb, (x) => setCl({ ...cl, b: x }), -10, 10, 0.25, 'accent-rose-600')}
                </div>
              )}
              <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-sm font-mono text-slate-700 space-y-1">
                <div className="text-purple-700">
                  k: (x {signed(u)})² + (y {signed(v)})² = {fmt(r * r, 3)}
                </div>
                <div className="text-rose-700">
                  e: {vertical ? `x = ${fmt(c)}` : `y = ${fmt(m)}x ${bb < 0 ? '−' : '+'} ${fmt(Math.abs(bb))}`}
                </div>
                <div>{vertical ? 'A behelyettesítés után (y − v)²-re kapott érték' : 'A másodfokú egyenlet diszkriminánsa'}: {fmt(D, 3)}</div>
                <div className="font-bold text-slate-900">{clText}</div>
                {pts.map((p, i) => (
                  <div key={i}>
                    M{pts.length > 1 ? i + 1 : ''}{vec(p)}
                  </div>
                ))}
              </div>
              <TheoryCallout type="info" title="Az algebrai módszer">
                Az egyenes egyenletéből y-t (vagy x-et) behelyettesítjük a kör egyenletébe. A kapott másodfokú egyenlet megoldásainak száma (2, 1 vagy 0) megmondja, hogy az egyenes szelő, érintő vagy elkerüli a kört.
              </TheoryCallout>
            </div>
            <MidpointPlane
              x={cWin.x}
              y={cWin.y}
              unit={cUnit}
              labels={cSpan > 16 ? 5 : 2}
              className="w-full h-auto bg-slate-50 rounded-xl border border-slate-200"
              lines={[clLine]}
              points={[
                { at: [u, v], label: 'K', dx: -9, dy: -5, color: '#7c3aed', r: 3.4 },
                ...pts.map((p, i) => ({ at: p, label: pts.length > 1 ? `M${i + 1}` : 'M', dx: 12, dy: -6, color: '#dc2626', r: 4 }))
              ]}
            >
              {(px) => {
                const C0 = px([u, v]);
                return <circle cx={C0.x} cy={C0.y} r={r * cUnit} fill="rgba(124,58,237,0.05)" stroke="#7c3aed" strokeWidth={2} />;
              }}
            </MidpointPlane>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CoordPracticeExamTheory;
