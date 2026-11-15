import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ObtuseCosineMatcher } from './ObtuseCosineMatcher';
import { ObtuseCosineSorter } from './ObtuseCosineSorter';


// ---- Kvízábrák (csak ebben a fájlban) ----
const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';
const DEG = Math.PI / 180;
const UC = { cx: 120, cy: 126, r: 90 };
const ucPt = (deg: number, k = 1) => ({
  x: UC.cx + k * UC.r * Math.cos(deg * DEG),
  y: UC.cy - k * UC.r * Math.sin(deg * DEG)
});
const anchorFor = (deg: number) => {
  const c = Math.cos(deg * DEG);
  return c > 0.25 ? 'start' : c < -0.25 ? 'end' : 'middle';
};

type Pt = { x: number; y: number };
/** Szögív V csúcsnál a P1 és P2 felé mutató szárak között (a rövidebb úton). */
const arcPath = (V: Pt, P1: Pt, P2: Pt, r: number) => {
  const a1 = Math.atan2(P1.y - V.y, P1.x - V.x);
  const a2 = Math.atan2(P2.y - V.y, P2.x - V.x);
  let d = a2 - a1;
  while (d <= -Math.PI) d += 2 * Math.PI;
  while (d > Math.PI) d -= 2 * Math.PI;
  const s = { x: V.x + r * Math.cos(a1), y: V.y + r * Math.sin(a1) };
  const e = { x: V.x + r * Math.cos(a2), y: V.y + r * Math.sin(a2) };
  return 'M ' + s.x.toFixed(1) + ' ' + s.y.toFixed(1) + ' A ' + r + ' ' + r + ' 0 0 ' + (d > 0 ? 1 : 0) + ' ' + e.x.toFixed(1) + ' ' + e.y.toFixed(1);
};
/** Pont a szögfelezőn, a csúcstól k távolságra (szögcímkéhez). */
const bisectorPt = (V: Pt, P1: Pt, P2: Pt, k: number): Pt => {
  const n1 = Math.hypot(P1.x - V.x, P1.y - V.y);
  const n2 = Math.hypot(P2.x - V.x, P2.y - V.y);
  const ux = (P1.x - V.x) / n1 + (P2.x - V.x) / n2;
  const uy = (P1.y - V.y) / n1 + (P2.y - V.y) / n2;
  const n = Math.hypot(ux, uy) || 1;
  return { x: V.x + (k * ux) / n, y: V.y + (k * uy) / n };
};

type Ray = { deg: number; label: string; angleLabel?: string; proj?: boolean; xLabel?: string };
const UnitCircleFig: React.FC<{ rays: Ray[]; radiusLabel?: string }> = ({ rays, radiusLabel }) => {
  const { cx, cy, r } = UC;
  const R0 = rays[0];
  const M = R0 ? ucPt(R0.deg, 0.55) : { x: 0, y: 0 };
  const off = R0 && R0.deg < 90 ? -8 : 8;
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <line x1={14} y1={cy} x2={228} y2={cy} stroke="#64748b" strokeWidth={1.2} />
      <polygon points={'228,' + cy + ' 222,' + (cy - 3) + ' 222,' + (cy + 3)} fill="#64748b" />
      <line x1={cx} y1={146} x2={cx} y2={14} stroke="#64748b" strokeWidth={1.2} />
      <polygon points={cx + ',14 ' + (cx - 3) + ',20 ' + (cx + 3) + ',20'} fill="#64748b" />
      <text x={230} y={cy + 13} fontSize={10} fill="#475569" textAnchor="end">x</text>
      <text x={cx + 6} y={20} fontSize={10} fill="#475569">y</text>
      <path d={'M ' + (cx - r) + ' ' + cy + ' A ' + r + ' ' + r + ' 0 0 1 ' + (cx + r) + ' ' + cy} fill="none" stroke="#94a3b8" strokeWidth={1.2} />
      <text x={cx + r} y={cy + 12} fontSize={9} fill="#475569" textAnchor="middle">1</text>
      <text x={cx - r} y={cy + 12} fontSize={9} fill="#475569" textAnchor="middle">−1</text>
      <text x={cx - 4} y={cy + 12} fontSize={9} fill="#475569" textAnchor="end">O</text>
      {rays.map((ray, i) => {
        const P = ucPt(ray.deg);
        const L = ucPt(ray.deg, 1.08);
        const ar = 16 + i * 9;
        const A1 = ucPt(ray.deg, ar / r);
        const lab = ucPt(ray.deg / 2, (ar + 9) / r);
        return (
          <g key={i}>
            {ray.proj && (
              <line x1={P.x} y1={P.y} x2={P.x} y2={cy} stroke="#2563eb" strokeWidth={1} strokeDasharray="3 3" />
            )}
            {ray.proj && ray.xLabel && (
              <text x={P.x} y={cy + 12} fontSize={9.5} fill="#1d4ed8" textAnchor="middle" fontWeight="bold">{ray.xLabel}</text>
            )}
            <line x1={cx} y1={cy} x2={P.x} y2={P.y} stroke="#2563eb" strokeWidth={1.8} />
            <circle cx={P.x} cy={P.y} r={2.6} fill="#1d4ed8" />
            <text x={L.x} y={L.y + 3} fontSize={10} fill="#1e3a8a" fontWeight="bold" textAnchor={anchorFor(ray.deg)}>{ray.label}</text>
            {ray.angleLabel && (
              <path d={'M ' + (cx + ar) + ' ' + cy + ' A ' + ar + ' ' + ar + ' 0 0 0 ' + A1.x.toFixed(1) + ' ' + A1.y.toFixed(1)} fill="none" stroke="#dc2626" strokeWidth={1.2} />
            )}
            {ray.angleLabel && (
              <text x={lab.x} y={lab.y + 3} fontSize={9.5} fill="#b91c1c" textAnchor="middle">{ray.angleLabel}</text>
            )}
          </g>
        );
      })}
      {radiusLabel && R0 && (
        <text x={M.x + off} y={M.y - 4} fontSize={9.5} fill="#1e3a8a" textAnchor="middle">{radiusLabel}</text>
      )}
    </svg>
  );
};

/** Egyenlő szárú háromszög AB alappal, C csúccsal; baseDeg csak az alakhoz kell. */
const IsoscelesFig: React.FC<{ baseDeg: number; apexLabel: string; baseLabel: string; note: string }> = ({ baseDeg, apexLabel, baseLabel, note }) => {
  const t = Math.tan(baseDeg * DEG);
  const h = Math.min(85, 100 / t);
  const A = { x: 120 - h, y: 134 };
  const B = { x: 120 + h, y: 134 };
  const C = { x: 120, y: 134 - h * t };
  const lA = bisectorPt(A, B, C, 26);
  const lB = bisectorPt(B, A, C, 26);
  const lC = bisectorPt(C, A, B, 24);
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <polygon points={A.x + ',' + A.y + ' ' + B.x + ',' + B.y + ' ' + C.x + ',' + C.y} fill="#eff6ff" stroke="#1e40af" strokeWidth={1.6} />
      <path d={arcPath(A, B, C, 15)} fill="none" stroke="#dc2626" strokeWidth={1.2} />
      <path d={arcPath(B, A, C, 15)} fill="none" stroke="#dc2626" strokeWidth={1.2} />
      <path d={arcPath(C, A, B, 13)} fill="none" stroke="#16a34a" strokeWidth={1.2} />
      <text x={lA.x} y={lA.y + 3} fontSize={9.5} fill="#b91c1c" textAnchor="middle">{baseLabel}</text>
      <text x={lB.x} y={lB.y + 3} fontSize={9.5} fill="#b91c1c" textAnchor="middle">{baseLabel}</text>
      <text x={lC.x} y={lC.y + 3} fontSize={9.5} fill="#15803d" textAnchor="middle">{apexLabel}</text>
      <text x={A.x - 4} y={A.y + 4} fontSize={10} fill="#1e3a8a" textAnchor="end">A</text>
      <text x={B.x + 4} y={B.y + 4} fontSize={10} fill="#1e3a8a">B</text>
      <text x={C.x} y={C.y - 4} fontSize={10} fill="#1e3a8a" textAnchor="middle">C</text>
      <text x={6} y={14} fontSize={10} fill="#0f172a" fontWeight="bold">{note}</text>
    </svg>
  );
};

/** ABCD paralelogramma, A-nál hegyesszög, B-nél tompaszög. */
const ParallelogramFig: React.FC<{ labels: [string, string, string, string]; note: string }> = ({ labels, note }) => {
  const A = { x: 30, y: 126 };
  const B = { x: 156, y: 126 };
  const C = { x: 214, y: 46 };
  const D = { x: 88, y: 46 };
  const corners: [Pt, Pt, Pt][] = [[A, B, D], [B, A, C], [C, B, D], [D, A, C]];
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <polygon points={A.x + ',' + A.y + ' ' + B.x + ',' + B.y + ' ' + C.x + ',' + C.y + ' ' + D.x + ',' + D.y} fill="#eff6ff" stroke="#1e40af" strokeWidth={1.6} />
      {corners.map(([V, P1, P2], i) => {
        if (!labels[i]) return null;
        const lp = bisectorPt(V, P1, P2, 26);
        return (
          <g key={i}>
            <path d={arcPath(V, P1, P2, 14)} fill="none" stroke="#dc2626" strokeWidth={1.2} />
            <text x={lp.x} y={lp.y + 3} fontSize={9.5} fill="#b91c1c" textAnchor="middle">{labels[i]}</text>
          </g>
        );
      })}
      <text x={A.x - 4} y={A.y + 12} fontSize={10} fill="#1e3a8a" textAnchor="end">A</text>
      <text x={B.x + 2} y={B.y + 12} fontSize={10} fill="#1e3a8a">B</text>
      <text x={C.x + 4} y={C.y - 2} fontSize={10} fill="#1e3a8a">C</text>
      <text x={D.x - 4} y={D.y - 2} fontSize={10} fill="#1e3a8a" textAnchor="end">D</text>
      <text x={6} y={14} fontSize={10} fill="#0f172a" fontWeight="bold">{note}</text>
    </svg>
  );
};

const OBTUSE_COSINE_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Fogalmak és nevezetes értékek (1–10)
  {
    id: 'oc-q1',
    level: 1,
    questionTypeBadge: 'Nevezetes érték',
    figure: <UnitCircleFig rays={[{ deg: 90, label: 'M', angleLabel: '90°' }]} />,
    question: 'Mennyi a derékszög koszinusza, azaz cos 90°?',
    options: ['0', '1', '−1', 'Nincs értelmezve'],
    correctAnswer: 0,
    explanation: 'Az egységkörön a 90°-hoz tartozó pont M(0; 1). Első koordinátája 0, ezért cos 90° = 0 (és sin 90° = 1).'
  },
  {
    id: 'oc-q2',
    level: 1,
    questionTypeBadge: 'Egységkör',
    figure: <UnitCircleFig rays={[{ deg: 50, label: 'P(?; ?)', angleLabel: 'α', proj: true }]} radiusLabel="1" />,
    question: 'Az egységkörön az x tengely pozitív félegyenesével α szöget bezáró OP szakasz (OP = 1) végpontjának mik a koordinátái?',
    options: ['P(cos α; sin α)', 'P(sin α; cos α)', 'P(cos α; tg α)', 'P(1; α)'],
    correctAnswer: 0,
    explanation: 'A P pont x koordinátája cos α, y koordinátája sin α, mert az átfogó (OP) 1 egység: cos α = x / 1, sin α = y / 1.'
  },
  {
    id: 'oc-q3',
    level: 1,
    questionTypeBadge: 'Előjel',
    figure: <UnitCircleFig rays={[{ deg: 130, label: 'P', angleLabel: 'β', proj: true, xLabel: 'cos β = ?' }]} />,
    question: 'Milyen előjelű egy tompaszög koszinusza?',
    options: ['Negatív', 'Pozitív', 'Nulla', 'A szögtől függően pozitív vagy negatív'],
    correctAnswer: 0,
    explanation: 'A tompaszöghöz tartozó egységköri pont a II. síknegyedben van, ott az x koordináta negatív: −1 < cos β < 0.'
  },
  {
    id: 'oc-q4',
    level: 1,
    questionTypeBadge: 'Definíció',
    question: 'Hogyan definiáljuk az α tompaszög koszinuszát?',
    options: [
      'cos α = −cos(180° − α)',
      'cos α = cos(180° − α)',
      'cos α = −sin(180° − α)',
      'cos α = cos(α − 90°)'
    ],
    correctAnswer: 0,
    explanation: 'Definíció: tompaszög koszinusza egyenlő kiegészítő szöge koszinuszának ellentettjével.'
  },
  {
    id: 'oc-q5',
    level: 1,
    questionTypeBadge: 'Nevezetes érték',
    figure: <UnitCircleFig rays={[{ deg: 120, label: 'P', angleLabel: '120°', proj: true, xLabel: '?' }]} radiusLabel="1" />,
    question: 'Mennyi cos 120°?',
    options: ['−0,5', '0,5', '−√3/2', '√3/2'],
    correctAnswer: 0,
    explanation: 'cos 120° = −cos(180° − 120°) = −cos 60° = −0,5.'
  },
  {
    id: 'oc-q6',
    level: 1,
    questionTypeBadge: 'Nevezetes érték',
    question: 'Mennyi cos 135°?',
    options: ['−√2/2', '√2/2', '−1/2', '−√3/2'],
    correctAnswer: 0,
    explanation: 'cos 135° = −cos 45° = −√2/2 ≈ −0,7071.'
  },
  {
    id: 'oc-q7',
    level: 1,
    questionTypeBadge: 'Nevezetes érték',
    question: 'Mennyi cos 150°?',
    options: ['−√3/2', '√3/2', '−1/2', '1/2'],
    correctAnswer: 0,
    explanation: 'cos 150° = −cos 30° = −√3/2 ≈ −0,866.'
  },
  {
    id: 'oc-q8',
    level: 1,
    questionTypeBadge: 'Kiegészítő szögek',
    figure: <UnitCircleFig rays={[{ deg: 55, label: 'P', angleLabel: 'γ' }, { deg: 125, label: 'Q', angleLabel: 'δ' }]} />,
    question: 'Mi igaz a γ és δ kiegészítő szögekre (γ + δ = 180°)?',
    options: [
      'sin γ = sin δ és cos γ = −cos δ',
      'sin γ = −sin δ és cos γ = cos δ',
      'sin γ = cos δ és cos γ = sin δ',
      'sin γ = sin δ és cos γ = cos δ'
    ],
    correctAnswer: 0,
    explanation: 'A két pont egymás tükörképe az y tengelyre: az y koordináták (szinuszok) egyenlők, az x koordináták (koszinuszok) egymás ellentettjei.'
  },
  {
    id: 'oc-q9',
    level: 1,
    questionTypeBadge: 'Pitagoraszi összefüggés',
    question: 'Melyik szögekre teljesül a sin² α + cos² α = 1 összefüggés?',
    options: [
      'Hegyesszögre, derékszögre és tompaszögre egyaránt',
      'Csak hegyesszögre',
      'Csak hegyesszögre és derékszögre',
      'Csak tompaszögre'
    ],
    correctAnswer: 0,
    explanation: 'Az egységkör P(cos α; sin α) pontja 1 távolságra van az origótól, így x² + y² = 1 minden esetben teljesül.'
  },
  {
    id: 'oc-q10',
    level: 1,
    questionTypeBadge: 'Számológép',
    question: 'A számológépen cos⁻¹(−0,5) értékét kérjük. Mit kapunk?',
    options: ['120°', '60°', '−60°', '150°'],
    correctAnswer: 0,
    explanation: 'Negatív koszinuszhoz a cos⁻¹ funkció tompaszöget ad: cos 120° = −0,5.'
  },

  // LEVEL 2: Számolás számológéppel, kiegészítő szögek (11–20)
  {
    id: 'oc-q11',
    level: 2,
    questionTypeBadge: 'Számológép',
    figure: <UnitCircleFig rays={[{ deg: 102, label: 'P', angleLabel: '102°', proj: true, xLabel: '?' }]} />,
    question: 'Mennyi cos 102° négy tizedesjegyre kerekítve?',
    options: ['−0,2079', '0,2079', '0,9781', '−0,9781'],
    correctAnswer: 0,
    explanation: 'cos 102° = −cos 78° ≈ −0,2079. (0,9781 a 102° szinusza.)'
  },
  {
    id: 'oc-q12',
    level: 2,
    questionTypeBadge: 'Számológép',
    figure: <UnitCircleFig rays={[{ deg: 152, label: 'P', angleLabel: '152°', proj: true, xLabel: '?' }]} />,
    question: 'Mennyi cos 152° négy tizedesjegyre kerekítve?',
    options: ['−0,8829', '0,8829', '−0,4695', '0,4695'],
    correctAnswer: 0,
    explanation: 'cos 152° = −cos 28° ≈ −0,8829. (sin 152° = sin 28° ≈ 0,4695.)'
  },
  {
    id: 'oc-q13',
    level: 2,
    questionTypeBadge: 'Háromszög szögei',
    question: 'Egy háromszög két szögének koszinusza 0,5 és 0. Mennyi a harmadik szög koszinusza és szinusza?',
    options: [
      'cos = √3/2, sin = 1/2',
      'cos = 1/2, sin = √3/2',
      'cos = −√3/2, sin = 1/2',
      'cos = 0, sin = 1'
    ],
    correctAnswer: 0,
    explanation: 'cos α = 0,5 ⇒ α = 60°; cos β = 0 ⇒ β = 90°. A harmadik szög γ = 30°: cos 30° = √3/2, sin 30° = 1/2.'
  },
  {
    id: 'oc-q14',
    level: 2,
    questionTypeBadge: 'Háromszög szögei',
    question: 'Egy háromszög két szögének koszinusza √3/2 és −0,5. Mekkora a harmadik szög?',
    options: ['30°', '90°', '120°', '60°'],
    correctAnswer: 0,
    explanation: 'cos α = √3/2 ⇒ α = 30°; cos β = −0,5 ⇒ β = 120°. Így γ = 180° − 30° − 120° = 30°.'
  },
  {
    id: 'oc-q15',
    level: 2,
    questionTypeBadge: 'sin → cos',
    question: 'Mennyi lehet cos α, ha sin α = √2/2 (0° < α < 180°)?',
    options: ['√2/2 vagy −√2/2', 'Csak √2/2', 'Csak −√2/2', '1/2 vagy −1/2'],
    correctAnswer: 0,
    explanation: 'cos α = ±√(1 − 1/2) = ±√2/2. A szög lehet 45° (cos > 0) vagy 135° (cos < 0).'
  },
  {
    id: 'oc-q16',
    level: 2,
    questionTypeBadge: 'sin → cos',
    question: 'Mennyi lehet cos α, ha sin α = 0,7355 (0° < α < 180°)?',
    options: ['≈ 0,6775 vagy ≈ −0,6775', 'Csak ≈ 0,6775', '≈ 0,2645 vagy ≈ −0,2645', '≈ 0,4590'],
    correctAnswer: 0,
    explanation: 'cos α = ±√(1 − 0,7355²) ≈ ±0,6775 (α ≈ 47,3° vagy ≈ 132,7°). A 0,2645 = 1 − 0,7355 hibás, a négyzetek összege 1, nem az értékeké.'
  },
  {
    id: 'oc-q17',
    level: 2,
    questionTypeBadge: 'Szög a koszinuszból',
    question: 'A számológép szerint hány fokos az a szög, amelynek koszinusza 0,7924?',
    options: ['≈ 37,6°', '≈ 52,4°', '≈ 142,4°', '≈ 127,6°'],
    correctAnswer: 0,
    explanation: 'cos⁻¹ 0,7924 ≈ 37,6°. Pozitív koszinuszhoz hegyesszög tartozik. (52,4° a pótszöge, 142,4° a kiegészítő szöge – ennek koszinusza −0,7924.)'
  },
  {
    id: 'oc-q18',
    level: 2,
    questionTypeBadge: 'Szög a koszinuszból',
    question: 'Hány fokos az a szög (0° és 180° között), amelynek koszinusza −√3/2?',
    options: ['150°', '30°', '120°', '−30°'],
    correctAnswer: 0,
    explanation: 'cos 30° = √3/2, ezért cos 150° = −cos 30° = −√3/2.'
  },
  {
    id: 'oc-q19',
    level: 2,
    questionTypeBadge: 'Paralelogramma',
    figure: <ParallelogramFig labels={['α = ?', 'β', '', '']} note="cos β = −0,591" />,
    question: 'Egy paralelogramma egyik szögének koszinusza −0,591. Mennyi a vele szomszédos szög koszinusza?',
    options: ['0,591', '−0,591', '≈ 0,8067', '≈ −0,8067'],
    correctAnswer: 0,
    explanation: 'A paralelogramma szomszédos szögei kiegészítő szögek, ezért koszinuszuk egymás ellentettje: 0,591. (A szemközti szög koszinusza ugyanúgy −0,591.)'
  },
  {
    id: 'oc-q20',
    level: 2,
    questionTypeBadge: 'Paralelogramma',
    figure: <ParallelogramFig labels={['α', 'β', 'γ', 'δ']} note="cos β = −0,591" />,
    question: 'Ugyanennél a paralelogrammánál (az egyik szög koszinusza −0,591) mennyi a szögek szinusza?',
    options: ['Mind a négy szögé ≈ 0,8067', 'A tompaszögeké ≈ −0,8067, a hegyesszögeké ≈ 0,8067', 'Mind a négy szögé ≈ 0,409', 'Mind a négy szögé 0,591'],
    correctAnswer: 0,
    explanation: 'sin = √(1 − 0,591²) ≈ 0,8067. A kiegészítő szögek szinusza egyenlő, és 0° és 180° között a szinusz sosem negatív. (A tompaszög ≈ 126,2°, a hegyesszög ≈ 53,8°.)'
  },

  // LEVEL 3: Háromszögek, összetett esetek (21–30)
  {
    id: 'oc-q21',
    level: 3,
    questionTypeBadge: 'Egyenlő szárú háromszög',
    question: 'Egy egyenlő szárú háromszög egyik szögének koszinusza −0,777. Mekkorák az alapon fekvő szögei?',
    options: ['≈ 19,5°', '≈ 39,0°', '≈ 70,5°', '≈ 141,0°'],
    correctAnswer: 0,
    explanation: 'Negatív koszinusz ⇒ tompaszög ⇒ csak a szárszög lehet: γ = cos⁻¹(−0,777) ≈ 141,0°. Az alapon fekvő szögek: (180° − 141,0°) / 2 ≈ 19,5°.'
  },
  {
    id: 'oc-q22',
    level: 3,
    questionTypeBadge: 'Egyenlő szárú háromszög',
    figure: <IsoscelesFig baseDeg={43.45} baseLabel="α" apexLabel="γ" note="cos α = 0,726;  cos γ = ?" />,
    question: 'Egy egyenlő szárú háromszög alapon fekvő szögének koszinusza 0,726. Mennyi a szárszög koszinusza?',
    options: ['≈ −0,054', '≈ 0,054', '≈ 0,370', '−0,726'],
    correctAnswer: 0,
    explanation: 'Az alapon fekvő szög cos⁻¹ 0,726 ≈ 43,45°, így a szárszög 180° − 2 · 43,45° ≈ 93,1°, aminek koszinusza ≈ −0,054 (tompaszög!).'
  },
  {
    id: 'oc-q23',
    level: 3,
    questionTypeBadge: 'Egyenlő szárú háromszög',
    figure: <IsoscelesFig baseDeg={68.3} baseLabel="?" apexLabel="γ" note="cos γ = 0,726" />,
    question: 'Egy egyenlő szárú háromszög szárszögének koszinusza 0,726. Mekkorák az alapon fekvő szögei?',
    options: ['≈ 68,3°', '≈ 43,4°', '≈ 93,1°', '≈ 46,6°'],
    correctAnswer: 0,
    explanation: 'A szárszög ≈ 43,4°, ezért az alapon fekvő szögek (180° − 43,4°) / 2 ≈ 68,3°.'
  },
  {
    id: 'oc-q24',
    level: 3,
    questionTypeBadge: 'Egyenlő szárú háromszög',
    question: 'Egy egyenlő szárú háromszög egyik szögének szinusza 0,428, és ez a szög tompaszög. Mekkorák az alapon fekvő szögek?',
    options: ['≈ 12,7°', '≈ 25,3°', '≈ 77,3°', '≈ 64,7°'],
    correctAnswer: 0,
    explanation: 'sin⁻¹ 0,428 ≈ 25,3°, a tompaszög ennek kiegészítője: ≈ 154,7°. Ez a szárszög, így az alapon fekvő szögek (180° − 154,7°) / 2 ≈ 12,7°.'
  },
  {
    id: 'oc-q25',
    level: 3,
    questionTypeBadge: 'sin → cos',
    question: 'Egy tompaszög szinusza 0,472. Mennyi a koszinusza?',
    options: ['≈ −0,8816', '≈ 0,8816', '≈ −0,528', '≈ −0,7772'],
    correctAnswer: 0,
    explanation: 'cos α = −√(1 − 0,472²) ≈ −0,8816. Tompaszögnél a negatív előjelet kell választani.'
  },
  {
    id: 'oc-q26',
    level: 3,
    questionTypeBadge: 'Létezik-e?',
    question: 'Egy „háromszög” két szögének koszinusza −0,5 és 0,5. Mennyi a harmadik szög koszinusza?',
    options: [
      'Nincs ilyen háromszög, mert a két szög összege már 180°',
      '1',
      '0',
      '−1'
    ],
    correctAnswer: 0,
    explanation: 'cos α = −0,5 ⇒ α = 120°, cos β = 0,5 ⇒ β = 60°. α + β = 180°, a harmadik szögre nem maradna semmi – ilyen háromszög nincs.'
  },
  {
    id: 'oc-q27',
    level: 3,
    questionTypeBadge: 'Létezik-e?',
    question: 'Lehet-e egy háromszög két szögének koszinusza is negatív?',
    options: [
      'Nem, mert akkor két tompaszöge lenne',
      'Igen, ha a háromszög egyenlő szárú',
      'Igen, ha a harmadik szög hegyesszög',
      'Igen, mindig'
    ],
    correctAnswer: 0,
    explanation: 'Negatív koszinusz ⇔ tompaszög (0° és 180° között). Két tompaszög összege már 180°-nál nagyobb, ezért egy háromszögben legfeljebb egy szög koszinusza negatív.'
  },
  {
    id: 'oc-q28',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik a legkisebb az alábbi értékek közül?',
    options: ['cos 170°', 'cos 130°', 'cos 100°', 'cos 50°'],
    correctAnswer: 0,
    explanation: '0° és 180° között a koszinusz a szög növekedésével csökken (1-től −1-ig). cos 170° ≈ −0,985 a legkisebb (cos 130° ≈ −0,643; cos 100° ≈ −0,174; cos 50° ≈ 0,643).'
  },
  {
    id: 'oc-q29',
    level: 3,
    questionTypeBadge: 'Egységkör',
    figure: <UnitCircleFig rays={[{ deg: 126.87, label: 'Q(−0,6; 0,8)', angleLabel: '?', proj: true }]} />,
    question: 'Az egységkör egy pontja Q(−0,6; 0,8). Mekkora szöget zár be OQ az x tengely pozitív félegyenesével?',
    options: ['≈ 126,9°', '≈ 53,1°', '≈ 143,1°', '≈ 36,9°'],
    correctAnswer: 0,
    explanation: 'cos β = −0,6, sin β = 0,8 (és 0,6² + 0,8² = 1). β = cos⁻¹(−0,6) ≈ 126,9°. (53,1° a kiegészítő szöge.)'
  },
  {
    id: 'oc-q30',
    level: 3,
    questionTypeBadge: 'Igaz / hamis',
    question: 'Melyik állítás HAMIS (0° < α < 180°)?',
    options: [
      'Ha sin α ismert, akkor cos α egyértelműen meghatározható',
      'Ha cos α ismert, akkor α egyértelműen meghatározható',
      'Ha cos α < 0, akkor α tompaszög',
      'cos α = 0 pontosan akkor, ha α = 90°'
    ],
    correctAnswer: 0,
    explanation: 'Egy szinuszértékhez (1 kivételével) egy hegyesszög és egy tompaszög is tartozik, így cos α = ±√(1 − sin² α) két értéket vehet fel. A koszinusz viszont 0° és 180° között egyértelműen meghatározza a szöget.'
  }
];

export const ObtuseCosineQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="trigonometria"
      topicId="g11-trig-tompaszog-koszinusz-quiz"
      subtopicId="a-tompaszog-es-a-derekszog-koszinusza"
      title="11. A tompaszög és a derékszög koszinusza – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: az egységkör, a koszinusz előjele, kiegészítő szögek és háromszögek szögei."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • KVÍZ"
      questions={OBTUSE_COSINE_QUESTIONS}
      cheatSheets={[
        {
          title: 'Definíciók',
          items: [
            'Egységkör: P(cos α; sin α), OP = 1.',
            'Tompaszög: cos α = −cos(180° − α).',
            'Derékszög: cos 90° = 0, sin 90° = 1.',
            'sin² α + cos² α = 1 minden 0° és 180° közötti szögre.'
          ]
        },
        {
          title: 'Előjelek, kiegészítő szögek',
          items: [
            'Hegyesszög: 0 < cos α < 1; tompaszög: −1 < cos α < 0.',
            'γ + δ = 180° ⇒ sin γ = sin δ, cos γ = −cos δ.',
            'cos⁻¹ negatív értékre tompaszöget ad: cos⁻¹(−0,5) = 120°.',
            'sin α ismeretében cos α = ±√(1 − sin² α) – két lehetőség!'
          ]
        },
        {
          title: 'Nevezetes és tankönyvi értékek',
          items: [
            'cos 120° = −1/2; cos 135° = −√2/2; cos 150° = −√3/2',
            'cos 102° ≈ −0,2079; cos 152° ≈ −0,8829; cos 172° ≈ −0,9903',
            'cos⁻¹(−0,591) ≈ 126,2°; cos⁻¹ 0,7924 ≈ 37,6°',
            'Egyenlő szárú, cos = −0,777 ⇒ szárszög ≈ 141,0°, alapszögek ≈ 19,5°'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <ObtuseCosineMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <ObtuseCosineSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default ObtuseCosineQuiz;
