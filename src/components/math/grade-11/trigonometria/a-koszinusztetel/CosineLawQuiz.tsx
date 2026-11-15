import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { CosineLawMatcher } from './CosineLawMatcher';
import { CosineLawSorter } from './CosineLawSorter';


// ---- Kvízábrák (csak ebben a fájlban) ----
const FIG_CLASS = 'w-full max-w-[280px] h-auto mx-auto';
const DEG = Math.PI / 180;
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
const unitAngle = (V: Pt, P1: Pt, P2: Pt) => {
  const a1 = Math.atan2(P1.y - V.y, P1.x - V.x);
  const a2 = Math.atan2(P2.y - V.y, P2.x - V.x);
  let d = Math.abs(a2 - a1);
  if (d > Math.PI) d = 2 * Math.PI - d;
  return d;
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
/** Pontok elforgatása, tükrözése és beillesztése a rajzterületbe. */
const fitPoints = (pts: Pt[], rot: number, flip: boolean, padX: number): Pt[] => {
  const c = Math.cos(rot * DEG);
  const s = Math.sin(rot * DEG);
  const t = pts.map((p) => {
    const x = flip ? -p.x : p.x;
    return { x: x * c - p.y * s, y: x * s + p.y * c };
  });
  const xs = t.map((p) => p.x);
  const ys = t.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const W = 196 - 2 * padX;
  const H = 104;
  const k = Math.min(W / (maxX - minX || 1), H / (maxY - minY || 1));
  const ox = 120 - ((minX + maxX) / 2) * k;
  const oy = 80 - ((minY + maxY) / 2) * k;
  return t.map((p) => ({ x: ox + p.x * k, y: oy + p.y * k }));
};
const sideLabelPos = (P: Pt, Q: Pt, G: Pt, off = 11): Pt => {
  const M = { x: (P.x + Q.x) / 2, y: (P.y + Q.y) / 2 };
  let nx = -(Q.y - P.y);
  let ny = Q.x - P.x;
  const n = Math.hypot(nx, ny) || 1;
  nx /= n;
  ny /= n;
  if (nx * (M.x - G.x) + ny * (M.y - G.y) < 0) {
    nx = -nx;
    ny = -ny;
  }
  return { x: M.x + off * nx, y: M.y + off * ny + 3 };
};
const vertexLabel = (V: Pt, G: Pt, name: string, key: string) => {
  const dx = V.x - G.x;
  const dy = V.y - G.y;
  const n = Math.hypot(dx, dy) || 1;
  const x = V.x + (9 * dx) / n;
  const y = V.y + (9 * dy) / n + 3.5;
  const anchor = dx / n > 0.35 ? 'start' : dx / n < -0.35 ? 'end' : 'middle';
  return (
    <text key={key} x={x} y={y} fontSize={10} fill="#1e3a8a" fontWeight="bold" textAnchor={anchor}>{name}</text>
  );
};
const AngleMark: React.FC<{ V: Pt; P1: Pt; P2: Pt; label?: string; right?: boolean }> = ({ V, P1, P2, label, right }) => {
  if (right) {
    const d = bisectorPt(V, P1, P2, 7);
    return (
      <g>
        <path d={arcPath(V, P1, P2, 13)} fill="none" stroke="#dc2626" strokeWidth={1.2} />
        <circle cx={d.x} cy={d.y} r={1.8} fill="#dc2626" />
      </g>
    );
  }
  if (!label) return null;
  const th = unitAngle(V, P1, P2);
  const k = th < 0.7 ? 34 : th > 2.2 ? 20 : 25;
  const L = bisectorPt(V, P1, P2, k);
  return (
    <g>
      <path d={arcPath(V, P1, P2, 14)} fill="none" stroke="#dc2626" strokeWidth={1.2} />
      <text x={L.x} y={L.y + 3} fontSize={9.5} fill="#b91c1c" textAnchor="middle">{label}</text>
    </g>
  );
};

type TriProps = {
  /** CA és CB hossza, valamint a C-nél lévő szög (az alakhoz) */
  b: number;
  a: number;
  gamma: number;
  names?: [string, string, string];
  sides?: { a?: string; b?: string; c?: string };
  angles?: { A?: string; B?: string; C?: string };
  rightAtC?: boolean;
  dashedC?: boolean;
  rot?: number;
  flip?: boolean;
  padX?: number;
};
/** Általános háromszög: C csúcs, CA = b, CB = a, a C-nél γ szög. */
const TriFig: React.FC<TriProps> = ({ b, a, gamma, names = ['A', 'B', 'C'], sides = {}, angles = {}, rightAtC, dashedC, rot = 0, flip = false, padX = 8 }) => {
  const [A, B, C] = fitPoints(
    [{ x: b, y: 0 }, { x: a * Math.cos(gamma * DEG), y: -a * Math.sin(gamma * DEG) }, { x: 0, y: 0 }],
    rot,
    flip,
    padX
  );
  const G = { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 };
  const sl = (P: Pt, Q: Pt, t: string | undefined, key: string) => {
    if (!t) return null;
    const p = sideLabelPos(P, Q, G);
    return <text key={key} x={p.x} y={p.y} fontSize={9.5} fill="#0f172a" textAnchor="middle">{t}</text>;
  };
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <path d={'M ' + C.x + ' ' + C.y + ' L ' + A.x + ' ' + A.y + ' M ' + C.x + ' ' + C.y + ' L ' + B.x + ' ' + B.y} stroke="#1e40af" strokeWidth={1.7} fill="none" />
      <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={dashedC ? '#ea580c' : '#1e40af'} strokeWidth={1.7} strokeDasharray={dashedC ? '5 4' : undefined} />
      <AngleMark V={C} P1={A} P2={B} label={angles.C} right={rightAtC} />
      <AngleMark V={A} P1={B} P2={C} label={angles.A} />
      <AngleMark V={B} P1={A} P2={C} label={angles.B} />
      {sl(C, B, sides.a, 'sa')}
      {sl(C, A, sides.b, 'sb')}
      {sl(A, B, sides.c, 'sc')}
      {names[0] && vertexLabel(A, G, names[0], 'na')}
      {names[1] && vertexLabel(B, G, names[1], 'nb')}
      {names[2] && vertexLabel(C, G, names[2], 'nc')}
    </svg>
  );
};

/** ABCD paralelogramma: AB = p, AD = q, A-nál alpha szög; AC és BD átló címkével. */
const ParallelogramFig: React.FC<{ p: number; q: number; alpha: number; ab: string; ad: string; ac?: string; bd?: string; angA?: string; angB?: string; dashed?: 'ac' | 'bd' }> = ({ p, q, alpha, ab, ad, ac, bd, angA, angB, dashed }) => {
  const Dx = q * Math.cos(alpha * DEG);
  const Dy = -q * Math.sin(alpha * DEG);
  const [A, B, C, D] = fitPoints([{ x: 0, y: 0 }, { x: p, y: 0 }, { x: p + Dx, y: Dy }, { x: Dx, y: Dy }], 0, false, 14);
  const G = { x: (A.x + C.x) / 2, y: (A.y + C.y) / 2 };
  const diag = (P: Pt, Q: Pt, t: string | undefined, isDashed: boolean, key: string, color: string) => {
    if (!t) return null;
    const M = { x: P.x + (Q.x - P.x) * 0.3, y: P.y + (Q.y - P.y) * 0.3 };
    return (
      <g key={key}>
        <line x1={P.x} y1={P.y} x2={Q.x} y2={Q.y} stroke={color} strokeWidth={1.4} strokeDasharray={isDashed ? '5 4' : undefined} />
        <text x={M.x} y={M.y - 4} fontSize={9.5} fill={color} textAnchor="middle" fontWeight="bold">{t}</text>
      </g>
    );
  };
  const s1 = sideLabelPos(A, B, G);
  const s2 = sideLabelPos(A, D, G, 8);
  return (
    <svg viewBox="0 0 240 150" className={FIG_CLASS}>
      <polygon points={[A, B, C, D].map((P) => P.x + ',' + P.y).join(' ')} fill="#eff6ff" stroke="#1e40af" strokeWidth={1.7} />
      {diag(A, C, ac, dashed === 'ac', 'dac', '#7c3aed')}
      {diag(B, D, bd, dashed === 'bd', 'dbd', '#ea580c')}
      <AngleMark V={A} P1={B} P2={D} label={angA} />
      <AngleMark V={B} P1={A} P2={C} label={angB} />
      <text x={s1.x} y={s1.y} fontSize={9.5} fill="#0f172a" textAnchor="middle">{ab}</text>
      <text x={s2.x} y={s2.y} fontSize={9.5} fill="#0f172a" textAnchor="end">{ad}</text>
      {vertexLabel(A, G, 'A', 'A')}
      {vertexLabel(B, G, 'B', 'B')}
      {vertexLabel(C, G, 'C', 'C')}
      {vertexLabel(D, G, 'D', 'D')}
    </svg>
  );
};

const COSINE_LAW_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: A tétel és egyszerű alkalmazás (1–10)
  {
    id: 'cl-q1',
    level: 1,
    questionTypeBadge: 'A tétel',
    figure: <TriFig b={150} a={110} gamma={65} sides={{ a: 'a', b: 'b', c: 'c' }} angles={{ C: 'γ' }} />,
    question: 'Hogyan szól a koszinusztétel, ha a, b, c a háromszög oldalai, és γ a c oldallal szemközti szög?',
    options: [
      'c² = a² + b² − 2ab · cos γ',
      'c² = a² + b² + 2ab · cos γ',
      'c = a + b − 2ab · cos γ',
      'c² = a² + b² − ab · cos γ'
    ],
    correctAnswer: 0,
    explanation: 'Koszinusztétel: c² = a² + b² − 2ab cos γ. A szorzó 2ab, az előjel mínusz, és mindkét oldalon négyzetek szerepelnek.'
  },
  {
    id: 'cl-q2',
    level: 1,
    questionTypeBadge: 'A tétel',
    question: 'A c² = a² + b² − 2ab cos γ képletben melyik szög a γ?',
    options: [
      'A c oldallal szemközti szög, vagyis az a és b oldal által közbezárt szög',
      'Az a oldallal szemközti szög',
      'A háromszög legkisebb szöge',
      'Bármelyik szöge a háromszögnek'
    ],
    correctAnswer: 0,
    explanation: 'γ a kiszámítandó c oldallal szemben van, és éppen az a és b oldal zárja közre.'
  },
  {
    id: 'cl-q3',
    level: 1,
    questionTypeBadge: 'Pitagorasz-tétel',
    figure: <TriFig b={150} a={100} gamma={90} rightAtC sides={{ a: 'a', b: 'b', c: 'c' }} />,
    question: 'Mivé egyszerűsödik a koszinusztétel, ha γ = 90°?',
    options: ['A Pitagorasz-tétellé: c² = a² + b²', 'A szinusztétellé', 'c = a + b alakra', 'c² = a² − b² alakra'],
    correctAnswer: 0,
    explanation: 'cos 90° = 0, ezért a −2ab cos γ tag eltűnik: c² = a² + b². A koszinusztétel a Pitagorasz-tétel általánosítása.'
  },
  {
    id: 'cl-q4',
    level: 1,
    questionTypeBadge: 'Mikor melyik tétel?',
    question: 'Melyik adathármas esetén célszerű a koszinusztétellel kiszámítani a harmadik oldalt?',
    options: [
      'Két oldal és az általuk közbezárt szög',
      'Két szög és egy oldal',
      'Két oldal és az egyikkel szemközti szög',
      'Három szög'
    ],
    correctAnswer: 0,
    explanation: 'Két oldal és a közbezárt szög ismeretében nincs ismert oldal–szemközti szög pár, így a szinusztétel nem alkalmazható közvetlenül – a koszinusztétel igen.'
  },
  {
    id: 'cl-q5',
    level: 1,
    questionTypeBadge: 'Harmadik oldal',
    figure: <TriFig b={8} a={5} gamma={60} sides={{ a: '5 cm', b: '8 cm', c: '?' }} angles={{ C: '60°' }} />,
    question: 'Egy háromszög két oldala 5 cm és 8 cm, a közbezárt szög 60°. Mekkora a harmadik oldal?',
    options: ['7 cm', '√89 ≈ 9,4 cm', '√129 ≈ 11,4 cm', '13 cm'],
    correctAnswer: 0,
    explanation: 'c² = 25 + 64 − 2 · 5 · 8 · 0,5 = 89 − 40 = 49 ⇒ c = 7 cm.'
  },
  {
    id: 'cl-q6',
    level: 1,
    questionTypeBadge: 'Harmadik oldal',
    question: 'Egy háromszög két oldala 5 cm, a közbezárt szög 60°. Mekkora a harmadik oldal?',
    options: ['5 cm', '10 cm', '√50 ≈ 7,1 cm', '2,5 cm'],
    correctAnswer: 0,
    explanation: 'c² = 25 + 25 − 2 · 25 · 0,5 = 25 ⇒ c = 5 cm. (Szabályos háromszög.)'
  },
  {
    id: 'cl-q7',
    level: 1,
    questionTypeBadge: 'Tompaszög',
    figure: <TriFig b={1.2} a={1} gamma={125} sides={{ a: 'a', b: 'b', c: 'c' }} angles={{ C: 'γ' }} />,
    question: 'Ha γ tompaszög, mit mondhatunk a c oldalról?',
    options: ['c² > a² + b²', 'c² < a² + b²', 'c² = a² + b²', 'c < a és c < b'],
    correctAnswer: 0,
    explanation: 'Tompaszögnél cos γ < 0, így −2ab cos γ > 0, tehát c² nagyobb, mint a² + b².'
  },
  {
    id: 'cl-q8',
    level: 1,
    questionTypeBadge: 'Szög három oldalból',
    question: 'Három oldal ismeretében melyik képlettel számítható ki a γ szög koszinusza?',
    options: [
      'cos γ = (a² + b² − c²) / (2ab)',
      'cos γ = (a² + b² + c²) / (2ab)',
      'cos γ = (c² − a² − b²) / (2ab)',
      'cos γ = (a² + b² − c²) / (ab)'
    ],
    correctAnswer: 0,
    explanation: 'A tételből átrendezve: 2ab cos γ = a² + b² − c², ebből cos γ = (a² + b² − c²) / (2ab).'
  },
  {
    id: 'cl-q9',
    level: 1,
    questionTypeBadge: 'Szög három oldalból',
    question: 'Három oldal ismeretében a tankönyv szerint melyik szöget célszerű először a koszinusztétellel kiszámítani?',
    options: [
      'A leghosszabb oldallal szemközti szöget',
      'A legrövidebb oldallal szemközti szöget',
      'Mindegy, mindhármat koszinusztétellel kell',
      'A középső oldallal szemközti szöget'
    ],
    correctAnswer: 0,
    explanation: 'A legnagyobb szög lehet egyedül tompaszög; ezt a koszinusz előjele eldönti. A többi szög ezután hegyesszög, így szinusztétellel egyértelműen számolható.'
  },
  {
    id: 'cl-q10',
    level: 1,
    questionTypeBadge: 'A tétel',
    question: 'Mely háromszögekre igaz a koszinusztétel?',
    options: [
      'Minden háromszögre',
      'Csak hegyesszögű háromszögekre',
      'Csak derékszögű háromszögekre',
      'Csak tompaszögű háromszögekre'
    ],
    correctAnswer: 0,
    explanation: 'A tétel igaz minden háromszögre, függetlenül attól, hogy γ hegyesszög, derékszög vagy tompaszög.'
  },

  // LEVEL 2: Tankönyvi számolások (11–20)
  {
    id: 'cl-q11',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    figure: <TriFig b={309} a={233} gamma={60.9} flip padX={40} names={['Zágráb', 'Bécs', 'Budapest']} sides={{ a: '233 km', b: '309 km', c: '?' }} angles={{ C: '60,9°' }} />,
    question: 'Budapest–Bécs 233 km, Budapest–Zágráb 309 km, a két irány közti szög 60,9°. Mekkora a Bécs–Zágráb-távolság?',
    options: ['≈ 282 km', '≈ 387 km', '≈ 76 km', '≈ 542 km'],
    correctAnswer: 0,
    explanation: 'c² = 233² + 309² − 2 · 233 · 309 · cos 60,9° ≈ 79 740 ⇒ c ≈ 282 km. (387 km a Pitagorasz-tétel hibás alkalmazásából jönne.)'
  },
  {
    id: 'cl-q12',
    level: 2,
    questionTypeBadge: 'Szög három oldalból',
    figure: <TriFig b={309} a={233} gamma={60.9} flip padX={40} names={['Zágráb', 'Bécs', 'Budapest']} sides={{ a: '233 km', b: '309 km', c: '282 km' }} angles={{ B: '?' }} />,
    question: 'A 233 km, 282 km és 309 km oldalú háromszögben mekkora a 309 km-es oldallal szemközti szög (a Bécsnél lévő szög)?',
    options: ['≈ 73°', '≈ 60,9°', '≈ 46°', '≈ 107°'],
    correctAnswer: 0,
    explanation: 'cos α = (282² + 233² − 309²) / (2 · 282 · 233) ≈ 0,292 ⇒ α ≈ 73°. (≈ 46° a Zágrábnál lévő szög, a 233 km-es oldallal szemben.)'
  },
  {
    id: 'cl-q13',
    level: 2,
    questionTypeBadge: 'Harmadik oldal',
    question: 'Egy háromszög két oldala 53 mm és 71 mm, közbezárt szögük 60°. Mekkora a harmadik oldal?',
    options: ['≈ 63,9 mm', '≈ 88,6 mm', '≈ 119,0 mm', '≈ 39,2 mm'],
    correctAnswer: 0,
    explanation: 'c² = 53² + 71² − 2 · 53 · 71 · 0,5 = 4087 ⇒ c ≈ 63,9 mm.'
  },
  {
    id: 'cl-q14',
    level: 2,
    questionTypeBadge: 'Harmadik oldal',
    figure: <TriFig b={71} a={53} gamma={147} sides={{ a: '53 mm', b: '71 mm', c: '?' }} angles={{ C: '147°' }} />,
    question: 'Egy háromszög két oldala 53 mm és 71 mm, közbezárt szögük 147°. Mekkora a harmadik oldal?',
    options: ['≈ 119,0 mm', '≈ 39,2 mm', '≈ 88,6 mm', '≈ 63,9 mm'],
    correctAnswer: 0,
    explanation: 'cos 147° ≈ −0,8387, így c² ≈ 2809 + 5041 + 6312 = 14 162 ⇒ c ≈ 119,0 mm. (A 39,2 mm az előjel elhagyásából adódna.)'
  },
  {
    id: 'cl-q15',
    level: 2,
    questionTypeBadge: 'Szög három oldalból',
    figure: <TriFig b={6} a={5} gamma={78.46} sides={{ a: '5 cm', b: '6 cm', c: '7 cm' }} angles={{ C: '?' }} />,
    question: 'Mekkora az 5 cm, 6 cm, 7 cm oldalú háromszög legnagyobb szöge?',
    options: ['≈ 78,5°', '≈ 57,1°', '≈ 44,4°', '90°'],
    correctAnswer: 0,
    explanation: 'A 7 cm-es oldallal szemközti szög a legnagyobb: cos γ = (25 + 36 − 49) / 60 = 0,2 ⇒ γ ≈ 78,5°.'
  },
  {
    id: 'cl-q16',
    level: 2,
    questionTypeBadge: 'Szög három oldalból',
    question: 'Mekkora a 27,2 mm, 51,0 mm, 57,8 mm oldalú háromszög legnagyobb szöge?',
    options: ['90°', '≈ 78,5°', '≈ 118°', '≈ 62°'],
    correctAnswer: 0,
    explanation: '27,2² + 51,0² = 739,84 + 2601 = 3340,84 = 57,8², tehát cos γ = 0, γ = 90° – a háromszög derékszögű.'
  },
  {
    id: 'cl-q17',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    figure: <TriFig b={98} a={98} gamma={104.5} rot={142.25} names={['H', 'H', 'O']} sides={{ a: '98 pm', b: '98 pm', c: '?' }} angles={{ C: '104,5°' }} dashedC />,
    question: 'A vízmolekulában az O–H távolság 98 pm, a kötésszög 104,5°. Milyen messze van egymástól a két hidrogénatommag?',
    options: ['≈ 155 pm', '≈ 196 pm', '≈ 139 pm', '≈ 120 pm'],
    correctAnswer: 0,
    explanation: 'd² = 98² + 98² − 2 · 98 · 98 · cos 104,5° ≈ 24 017 ⇒ d ≈ 155 pm. (196 pm = 98 + 98 lenne, ha a molekula egyenes volna.)'
  },
  {
    id: 'cl-q18',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    figure: <TriFig b={17} a={12} gamma={52} names={['M₂', 'M₁', 'K']} sides={{ a: '12 km', b: '17 km', c: '?' }} angles={{ C: '52°' }} dashedC />,
    question: 'Két vasúti sínpár 52°-os szögben keresztezi egymást. A legközelebbi megállók a kereszteződéstől 12 km-re és 17 km-re vannak. Milyen messze vannak egymástól légvonalban?',
    options: ['≈ 13,5 km', '≈ 20,8 km', '≈ 26,2 km', '≈ 5 km'],
    correctAnswer: 0,
    explanation: 'd² = 12² + 17² − 2 · 12 · 17 · cos 52° ≈ 181,8 ⇒ d ≈ 13,5 km. (26,2 km a 128°-os szöggel számolva adódna.)'
  },
  {
    id: 'cl-q19',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    figure: <TriFig b={4} a={1.3} gamma={115} rot={-32.5} names={['', '', '']} sides={{ a: '1,3 m', b: '4 m', c: 'híd = ?' }} angles={{ C: '115°' }} dashedC />,
    question: 'Egy patak partjainak lejtője 4 m, illetve 1,3 m, a két part a mederben 115°-os szögben találkozik. Milyen hosszú legyen a két partot összekötő fahíd?',
    options: ['≈ 4,7 m', '≈ 4,2 m', '≈ 3,6 m', '≈ 5,3 m'],
    correctAnswer: 0,
    explanation: 'd² = 4² + 1,3² − 2 · 4 · 1,3 · cos 115° ≈ 22,08 ⇒ d ≈ 4,7 m. (5,3 m = 4 + 1,3 csak akkor lenne, ha a két lejtő egy egyenesbe esne.)'
  },
  {
    id: 'cl-q20',
    level: 2,
    questionTypeBadge: 'Harmadik oldal',
    figure: <TriFig b={5} a={3} gamma={120} sides={{ a: '3 cm', b: '5 cm', c: '?' }} angles={{ C: '120°' }} />,
    question: 'Egy háromszög két oldala 3 cm és 5 cm, a közbezárt szög 120°. Mekkora a harmadik oldal?',
    options: ['7 cm', '√19 ≈ 4,4 cm', '√34 ≈ 5,8 cm', '8 cm'],
    correctAnswer: 0,
    explanation: 'cos 120° = −0,5, így c² = 9 + 25 − 2 · 3 · 5 · (−0,5) = 34 + 15 = 49 ⇒ c = 7 cm.'
  },

  // LEVEL 3: Összetett feladatok (21–30)
  {
    id: 'cl-q21',
    level: 3,
    questionTypeBadge: 'Szög három oldalból',
    figure: <TriFig b={14.1} a={13.2} gamma={127.62} sides={{ a: '13,2 m', b: '14,1 m', c: '24,5 m' }} angles={{ C: '?' }} />,
    question: 'Mekkora a 13,2 m, 14,1 m, 24,5 m oldalú háromszög legnagyobb szöge?',
    options: ['≈ 127,6°', '≈ 52,4°', '≈ 27,1°', '≈ 90°'],
    correctAnswer: 0,
    explanation: 'cos γ = (13,2² + 14,1² − 24,5²) / (2 · 13,2 · 14,1) ≈ −0,610 ⇒ γ ≈ 127,6° (tompaszög).'
  },
  {
    id: 'cl-q22',
    level: 3,
    questionTypeBadge: 'Paralelogramma',
    figure: <ParallelogramFig p={32} q={24} alpha={83.87} ab="32 cm" ad="24 cm" ac="42 cm" angA="?" angB="?" />,
    question: 'Egy paralelogramma oldalai 24 cm és 32 cm, hosszabbik átlója 42 cm. Mekkorák a szögei?',
    options: ['≈ 96,1° és ≈ 83,9°', '≈ 120° és 60°', '≈ 106,3° és ≈ 73,7°', '90° és 90°'],
    correctAnswer: 0,
    explanation: 'A hosszabbik átló a tompaszöggel szemközti: cos β = (24² + 32² − 42²) / (2 · 24 · 32) ≈ −0,107 ⇒ β ≈ 96,1°, a másik szög 180° − 96,1° ≈ 83,9°.'
  },
  {
    id: 'cl-q23',
    level: 3,
    questionTypeBadge: 'Paralelogramma',
    figure: <ParallelogramFig p={32} q={24} alpha={83.87} ab="32 cm" ad="24 cm" ac="42 cm" bd="?" dashed="bd" />,
    question: 'Ugyanennek a paralelogrammának (24 cm, 32 cm, hosszabbik átló 42 cm) mekkora a rövidebbik átlója?',
    options: ['≈ 37,9 cm', '40 cm', '≈ 34,6 cm', '≈ 32,0 cm'],
    correctAnswer: 0,
    explanation: 'f² = 24² + 32² − 2 · 24 · 32 · cos 83,9° ≈ 1436 ⇒ f ≈ 37,9 cm. (Ellenőrzés: e² + f² = 2(a² + b²) = 3200.)'
  },
  {
    id: 'cl-q24',
    level: 3,
    questionTypeBadge: 'Létezik-e?',
    question: 'Mekkorák a 4,1 cm, 5,3 cm, 9,9 cm oldalú háromszög szögei?',
    options: [
      'Nincs ilyen háromszög',
      '≈ 20°, ≈ 26° és ≈ 134°',
      '≈ 30°, ≈ 40° és ≈ 110°',
      'A legnagyobb szög 180°'
    ],
    correctAnswer: 0,
    explanation: '4,1 + 5,3 = 9,4 < 9,9 – nem teljesül a háromszög-egyenlőtlenség. A koszinusztétel cos γ ≈ −1,22-et adna, ami lehetetlen.'
  },
  {
    id: 'cl-q25',
    level: 3,
    questionTypeBadge: 'Szög három oldalból',
    question: 'Mekkorák a 14 m, 33,6 m, 36,4 m oldalú háromszög szögei?',
    options: ['≈ 22,6°, ≈ 67,4° és 90°', '≈ 25°, ≈ 65° és 90°', '≈ 22,6°, ≈ 57,4° és 100°', '≈ 30°, 60° és 90°'],
    correctAnswer: 0,
    explanation: '14² + 33,6² = 196 + 1128,96 = 1324,96 = 36,4², tehát derékszögű (az 5–12–13-as háromszög 2,8-szerese). cos α = 33,6 / 36,4 ⇒ α ≈ 22,6°, a harmadik ≈ 67,4°.'
  },
  {
    id: 'cl-q26',
    level: 3,
    questionTypeBadge: 'Szög három oldalból',
    question: 'Mekkora a 3 cm, 5 cm, 7 cm oldalú háromszög legnagyobb szöge?',
    options: ['120°', '≈ 98°', '135°', '150°'],
    correctAnswer: 0,
    explanation: 'cos γ = (9 + 25 − 49) / (2 · 3 · 5) = −15/30 = −0,5 ⇒ γ = 120°.'
  },
  {
    id: 'cl-q27',
    level: 3,
    questionTypeBadge: 'Háromszög típusa',
    question: 'Milyen háromszög a 6 cm, 7 cm, 10 cm oldalú háromszög a szögei szerint?',
    options: ['Tompaszögű', 'Hegyesszögű', 'Derékszögű', 'Nincs ilyen háromszög'],
    correctAnswer: 0,
    explanation: '6² + 7² = 85 < 100 = 10², így a 10 cm-es oldallal szemközti szög koszinusza negatív (≈ −0,179): tompaszög.'
  },
  {
    id: 'cl-q28',
    level: 3,
    questionTypeBadge: 'Szög három oldalból',
    question: 'Egy háromszög oldalai 8 cm, 5 cm és 7 cm. Mekkora a 7 cm-es oldallal szemközti szög?',
    options: ['60°', '≈ 38,2°', '≈ 81,8°', '120°'],
    correctAnswer: 0,
    explanation: 'cos γ = (64 + 25 − 49) / (2 · 8 · 5) = 40 / 80 = 0,5 ⇒ γ = 60°.'
  },
  {
    id: 'cl-q29',
    level: 3,
    questionTypeBadge: 'Paralelogramma',
    figure: <ParallelogramFig p={7} q={5} alpha={81.79} ab="7 cm" ad="5 cm" bd="8 cm" ac="?" dashed="ac" />,
    question: 'Egy paralelogramma oldalai 5 cm és 7 cm, egyik átlója 8 cm. Mekkora a másik átlója?',
    options: ['√84 ≈ 9,17 cm', '√10 ≈ 3,16 cm', '√74 ≈ 8,60 cm', '√148 ≈ 12,17 cm'],
    correctAnswer: 0,
    explanation: 'A két átlóra a koszinusztételt felírva (a szögek kiegészítők, cos-uk ellentett) e² + f² = 2(a² + b²) = 148, így f² = 148 − 64 = 84, f ≈ 9,17 cm.'
  },
  {
    id: 'cl-q30',
    level: 3,
    questionTypeBadge: 'Igaz / hamis',
    question: 'Melyik állítás HAMIS?',
    options: [
      'Három oldal ismeretében a szögek mindig kiszámíthatók, bármilyen három pozitív számot adunk meg',
      'A koszinusztétel a Pitagorasz-tétel általánosítása',
      'Ha c² < a² + b², akkor a c oldallal szemközti szög hegyesszög',
      'A koszinusz 0° és 180° között egyértelműen meghatározza a szöget'
    ],
    correctAnswer: 0,
    explanation: 'Három számból csak akkor lesz háromszög, ha bármely kettő összege nagyobb a harmadiknál (lásd a 4,1; 5,3; 9,9 cm-es esetet). A többi állítás igaz.'
  }
];

export const CosineLawQuiz: React.FC<{
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
      topicId="g11-trig-koszinusztetel-quiz"
      subtopicId="a-koszinusztetel"
      title="12. A koszinusztétel – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: a tétel, a harmadik oldal kiszámítása, szögek három oldalból, paralelogrammák."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • KVÍZ"
      questions={COSINE_LAW_QUESTIONS}
      cheatSheets={[
        {
          title: 'A koszinusztétel',
          items: [
            'c² = a² + b² − 2ab · cos γ (γ a c-vel szemközti szög).',
            'Minden háromszögre igaz; γ = 90° ⇒ Pitagorasz-tétel.',
            'cos γ = (a² + b² − c²) / (2ab).',
            'Tompaszög ⇒ cos γ < 0 ⇒ c² > a² + b².'
          ]
        },
        {
          title: 'Mikor használjuk?',
          items: [
            'Két oldal + közbezárt szög ⇒ harmadik oldal.',
            'Három oldal ⇒ szögek: először a leghosszabb oldallal szemközti szög.',
            'Utána a hegyesszögeket szinusztétellel is lehet.',
            'Előbb ellenőrizd a háromszög-egyenlőtlenséget!'
          ]
        },
        {
          title: 'Tankönyvi eredmények',
          items: [
            'Bécs–Zágráb ≈ 282 km; a szög Bécsnél ≈ 73°',
            '53 és 71 mm: 60° ⇒ ≈ 63,9 mm; 147° ⇒ ≈ 119,0 mm',
            'Legnagyobb szög: 5–6–7 ⇒ ≈ 78,5°; 13,2–14,1–24,5 ⇒ ≈ 127,6°',
            'Vízmolekula H–H ≈ 155 pm; paralelogramma 24, 32, 42 ⇒ ≈ 96,1°, ≈ 83,9°, f ≈ 37,9 cm'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <CosineLawMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <CosineLawSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default CosineLawQuiz;
