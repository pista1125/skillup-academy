import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { TangentCalcMatcher } from './TangentCalcMatcher';
import { TangentCalcSorter } from './TangentCalcSorter';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek (nem exportált)
// Derékszög jelölése: negyedkörív ponttal (magyar jelölés).
// ---------------------------------------------------------------------------
type FPt = [number, number];
const fSub = (p: FPt, q: FPt): FPt => [p[0] - q[0], p[1] - q[1]];
const fUnit = (p: FPt): FPt => {
  const l = Math.hypot(p[0], p[1]) || 1;
  return [p[0] / l, p[1] / l];
};
const fAt = (v: FPt, u: FPt, r: number): FPt => [v[0] + u[0] * r, v[1] + u[1] * r];
const fMid = (a: FPt, b: FPt): FPt => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
const fR = (n: number) => Math.round(n * 10) / 10;
const fRad = (deg: number) => (deg * Math.PI) / 180;
const F_INK = '#0f172a';
const F_LINE = '#4338ca';
const F_ARC = '#d97706';
const F_ANG = '#b45309';
const F_UNK = '#dc2626';
const F_FILL = '#e0e7ff';
const F_AUX = '#64748b';

const QFig: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <svg viewBox="0 0 240 150" className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height="148" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {title && (
      <text x="120" y="15" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#334155">
        {title}
      </text>
    )}
    {children}
  </svg>
);

const QText: React.FC<{ p: FPt; t: string; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end' }> = ({
  p,
  t,
  size = 11,
  color,
  anchor = 'middle'
}) => (
  <text
    x={fR(p[0])}
    y={fR(p[1])}
    fontSize={size}
    fontWeight="bold"
    textAnchor={anchor}
    dominantBaseline="middle"
    fill={t.includes('?') ? F_UNK : color ?? F_INK}
  >
    {t}
  </text>
);

const QSeg: React.FC<{ a: FPt; b: FPt; color?: string; w?: number; dash?: boolean }> = ({ a, b, color = F_LINE, w = 2, dash }) => (
  <line
    x1={fR(a[0])}
    y1={fR(a[1])}
    x2={fR(b[0])}
    y2={fR(b[1])}
    stroke={color}
    strokeWidth={w}
    strokeDasharray={dash ? '4 3' : undefined}
    strokeLinecap="round"
  />
);

const QPoly: React.FC<{ p: FPt[]; fill?: string; color?: string; w?: number }> = ({ p, fill = F_FILL, color = F_LINE, w = 2 }) => (
  <polygon points={p.map((q) => `${fR(q[0])},${fR(q[1])}`).join(' ')} fill={fill} stroke={color} strokeWidth={w} strokeLinejoin="round" />
);

/** Derékszög: negyedkörív ponttal a v csúcsnál. */
const QRight: React.FC<{ v: FPt; p1: FPt; p2: FPt; r?: number }> = ({ v, p1, p2, r = 11 }) => {
  const u1 = fUnit(fSub(p1, v));
  const u2 = fUnit(fSub(p2, v));
  const s = fAt(v, u1, r);
  const e = fAt(v, u2, r);
  const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0;
  const d = fAt(v, fUnit([u1[0] + u2[0], u1[1] + u2[1]]), r * 0.55);
  return (
    <g>
      <path d={`M ${fR(s[0])} ${fR(s[1])} A ${r} ${r} 0 0 ${sweep} ${fR(e[0])} ${fR(e[1])}`} fill="none" stroke={F_INK} strokeWidth="1.3" />
      <circle cx={fR(d[0])} cy={fR(d[1])} r="1.7" fill={F_INK} />
    </g>
  );
};

/** Szögív a v csúcsnál (p1 és p2 irányok között) felirattal a szögfelezőn. */
const QAngle: React.FC<{ v: FPt; p1: FPt; p2: FPt; t?: string; r?: number; tr?: number }> = ({ v, p1, p2, t, r = 15, tr }) => {
  const u1 = fUnit(fSub(p1, v));
  const u2 = fUnit(fSub(p2, v));
  const half = Math.acos(Math.max(-1, Math.min(1, u1[0] * u2[0] + u1[1] * u2[1]))) / 2;
  const auto = Math.min(70, Math.max(r + 9 + Math.max(0, (t ?? '').length - 1) * 3.2, 7 / Math.max(Math.sin(half), 0.1)));
  const obtuse = half > fRad(50);
  const rr = tr === undefined && obtuse ? Math.min(r, 10) : tr === undefined && t && auto > r + 30 ? auto - 16 : r;
  const s = fAt(v, u1, rr);
  const e = fAt(v, u2, rr);
  const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0;
  const l = fAt(v, fUnit([u1[0] + u2[0], u1[1] + u2[1]]), tr ?? (obtuse ? rr + 8 : auto));
  return (
    <g>
      <path d={`M ${fR(s[0])} ${fR(s[1])} A ${rr} ${rr} 0 0 ${sweep} ${fR(e[0])} ${fR(e[1])}`} fill="none" stroke={F_ARC} strokeWidth="1.6" />
      {t && <QText p={l} t={t} size={10.5} color={F_ANG} />}
    </g>
  );
};

/** Oldalfelirat helye: az oldal felezőpontjából kifelé (a g ponttól elfelé). */
const fSideLbl = (a: FPt, b: FPt, g: FPt, t: string, extra = 0): FPt => {
  const m = fMid(a, b);
  let n = fUnit([-(b[1] - a[1]), b[0] - a[0]]);
  if ((m[0] - g[0]) * n[0] + (m[1] - g[1]) * n[1] < 0) n = [-n[0], -n[1]];
  return fAt(m, n, 8 + extra + Math.abs(n[0]) * t.length * 3.1);
};

type OptS = string | undefined;

/** Háromszög: v = csúcsbetűk, s[i] = az i. csúccsal szemközti oldal felirata, a[i] = szögfelirat ('' = csak ív), right = derékszög indexe. */
const QTri: React.FC<{ p: [FPt, FPt, FPt]; v?: OptS[]; s?: OptS[]; a?: OptS[]; right?: number; fill?: string; ar?: number }> = ({
  p,
  v = [],
  s = [],
  a = [],
  right,
  fill = F_FILL,
  ar
}) => {
  const g: FPt = [(p[0][0] + p[1][0] + p[2][0]) / 3, (p[0][1] + p[1][1] + p[2][1]) / 3];
  return (
    <g>
      <QPoly p={p} fill={fill} />
      {p.map((q, i) => {
        const p1 = p[(i + 1) % 3];
        const p2 = p[(i + 2) % 3];
        const vi = v[i];
        const si = s[i];
        const ai = a[i];
        return (
          <g key={i}>
            {right === i && <QRight v={q} p1={p1} p2={p2} />}
            {right !== i && ai !== undefined && <QAngle v={q} p1={p1} p2={p2} t={ai} r={ar} />}
            {vi && <QText p={fAt(q, fUnit(fSub(q, g)), 10)} t={vi} size={11.5} />}
            {si && <QText p={fSideLbl(p1, p2, g, si)} t={si} />}
          </g>
        );
      })}
    </g>
  );
};

/** Derékszögű háromszög: A bal alsó (α), C jobb alsó (derékszög), B C fölött (β). ratio = BC / AC (rajzolási arány). */
const QRT: React.FC<{
  ratio: number;
  a?: string;
  b?: string;
  c?: string;
  al?: string;
  be?: string;
  vA?: string;
  vB?: string;
  vC?: string;
  title?: string;
  flip?: boolean;
  w?: number;
  fill?: string;
  extra?: (P: { A: FPt; B: FPt; C: FPt }) => React.ReactNode;
}> = ({ ratio, a, b, c, al, be, vA, vB, vC, title, flip, fill, extra, w = 150 }) => {
  const maxW = w;
  const maxH = title ? 88 : 96;
  let W = maxW;
  let H = maxW * ratio;
  if (H > maxH) {
    H = maxH;
    W = maxH / ratio;
  }
  const y0 = 124;
  const A: FPt = [flip ? 120 + W / 2 : 120 - W / 2, y0];
  const C: FPt = [flip ? 120 - W / 2 : 120 + W / 2, y0];
  const B: FPt = [C[0], y0 - H];
  return (
    <QFig title={title}>
      <QTri p={[A, B, C]} v={[vA, vB, vC]} s={[a, b, c]} a={[al, be, undefined]} right={2} fill={fill} />
      {extra && extra({ A, B, C })}
    </QFig>
  );
};

// ---- Kérdésábrák ----
const FIG_Q9 = <QRT ratio={1} a="100 m" b="100 m" al="α = ?" title="100%-os meredekség" />;

const FIG_Q10 = (
  <QRT
    ratio={0.75}
    a="h"
    b="30 m"
    al="α"
    title="h = ?"
    extra={({ A, C }) => <QSeg a={[A[0] - 12, A[1]]} b={[C[0] + 22, C[1]]} color={F_AUX} w={1.5} />}
  />
);

const FIG_Q11 = (
  <QRT
    ratio={0.75}
    a="h = ?"
    b="30 m"
    al="α"
    title="α: 36° és 38° között"
    extra={({ A, C }) => <QSeg a={[A[0] - 12, A[1]]} b={[C[0] + 22, C[1]]} color={F_AUX} w={1.5} />}
  />
);

const FIG_Q12 = (
  <QRT
    ratio={0.75}
    a="h = ?"
    b="30 m"
    al="α"
    title="α: 36,5° és 37,5° között"
    extra={({ A, C }) => <QSeg a={[A[0] - 12, A[1]]} b={[C[0] + 22, C[1]]} color={F_AUX} w={1.5} />}
  />
);

const FIG_Q17 = <QRT ratio={0.268} a="? m" b="100 m" al="15°" title="Hány százalékos az emelkedő?" />;

const FIG_Q18 = (
  <QFig title="α: 39,5° és 40,5° között; T = ?">
    <QPoly p={[[65, 124], [175, 124], [175, 32], [65, 32]]} />
    <QSeg a={[65, 124]} b={[175, 32]} color={F_ARC} />
    <QAngle v={[65, 124]} p1={[175, 124]} p2={[175, 32]} t="α" r={20} />
    <QText p={[120, 136]} t="25 m" />
    <QText p={[190, 78]} t="?" />
  </QFig>
);

const FIG_Q19 = (
  <QRT
    ratio={0.51}
    a="h = ?"
    b="1 km"
    al="α"
    title="α: 26° és 28° között"
  />
);

const FIG_Q20 = (
  <QRT
    ratio={0.754}
    a="1,70 m"
    b="árnyék = ?"
    al="37°"
    extra={({ A, C }) => <QSeg a={[A[0] - 12, A[1]]} b={[C[0] + 22, C[1]]} color={F_AUX} w={1.5} />}
  />
);

const FIG_Q21 = <QRT ratio={0.268} a="30 m" b="vízszintes táv = ?" al="15°" />;

const FIG_Q22 = <QRT ratio={0.268} a="30 m" b="111,96 m" c="út = ?" al="15°" />;

const FIG_Q23 = <QRT ratio={0.25} a="23 m" c="250 m" al="α = ?" flip title="p% = ?, α = ? (az ábra nem méretarányos)" />;

const FIG_Q29 = (
  <QRT
    ratio={0.571}
    a="2 m"
    b="árnyék: 3,5 m"
    al="α = ?"
    extra={({ A, C }) => <QSeg a={[A[0] - 12, A[1]]} b={[C[0] + 22, C[1]]} color={F_AUX} w={1.5} />}
  />
);


const TANGENT_CALC_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: A számológép használata (1–10)
  {
    id: 'tc-q1',
    questionTypeBadge: 'Számológép',
    level: 1,
    question: 'Mit kell ellenőrizni a számológépen, mielőtt egy fokban megadott szög tangensét kiszámítjuk?',
    options: [
      'Hogy D (DEG, fok) módban van-e a gép',
      'Hogy R (RAD) módban van-e a gép',
      'Hogy G (GRAD) módban van-e a gép',
      'Semmit, a gép mindig fokban számol'
    ],
    correctAnswer: 0,
    explanation: 'A szöget többféle mértékegységben mérhetjük. A fokokhoz a D / DEG (degree = fok) módot kell beállítani a DRG gombbal vagy a MODE menüben.'
  },
  {
    id: 'tc-q2',
    questionTypeBadge: 'Számológép',
    level: 1,
    question: 'Mire szolgál a számológép tan⁻¹ (2ndf tan vagy SHIFT tan) funkciója?',
    options: [
      'A tangens ismeretében megadja a hegyesszög nagyságát',
      'A szög ismeretében megadja a tangensét',
      'A tangens reciprokát számolja ki',
      'Fokból radiánba vált'
    ],
    correctAnswer: 0,
    explanation: 'A tan gomb: szög → tangens. A tan⁻¹ (2ndf tan / SHIFT tan): tangens → szög.'
  },
  {
    id: 'tc-q3',
    questionTypeBadge: 'Tangens értéke',
    level: 1,
    question: 'Mennyi tg 64° négy tizedesjegyre kerekítve?',
    options: ['2,0503', '0,4877', '0,8988', '1,0000'],
    correctAnswer: 0,
    explanation: 'D módban tan 64 = 2,050303842 ⇒ tg 64° ≈ 2,0503. (0,4877 a tg 26°, 0,8988 a sin 64°.)'
  },
  {
    id: 'tc-q4',
    questionTypeBadge: 'Fok és szögperc',
    level: 1,
    question: 'Hány fok tizedes törtben a 14° 24′?',
    options: ['14,4°', '14,24°', '14,04°', '14,6°'],
    correctAnswer: 0,
    explanation: '1° = 60′, ezért 24′ = 24/60° = 0,4°, így 14° 24′ = 14,4°.'
  },
  {
    id: 'tc-q5',
    questionTypeBadge: 'Tangens értéke',
    level: 1,
    question: 'Mennyi tg 14° 24′ négy tizedesjegyre kerekítve?',
    options: ['0,2568', '0,2487', '0,9686', '3,8947'],
    correctAnswer: 0,
    explanation: 'tan 14,4 = 0,25675636 ≈ 0,2568. (0,2487 a szinusz, 0,9686 a koszinusz, 3,8947 a tangens reciproka.)'
  },
  {
    id: 'tc-q6',
    questionTypeBadge: 'Szög meghatározása',
    level: 1,
    question: 'Melyik az a hegyesszög, amelynek tangense 0,2308?',
    options: ['≈ 13°', '≈ 77°', '≈ 0,23°', '≈ 23°'],
    correctAnswer: 0,
    explanation: '2ndf tan 0,2308 = 12,99629059, tehát a szög megközelítőleg 13°.'
  },
  {
    id: 'tc-q7',
    questionTypeBadge: 'Szög meghatározása',
    level: 1,
    question: 'Melyik az a hegyesszög, amelynek tangense 5?',
    options: ['≈ 78,69°', '≈ 11,31°', '5°', '≈ 85°'],
    correctAnswer: 0,
    explanation: '2ndf tan 5 = 78,69006753, tehát a szög ≈ 78,69°. (11,31° a 0,2 tangensű szög lenne.)'
  },
  {
    id: 'tc-q8',
    questionTypeBadge: 'Emelkedő (%)',
    level: 1,
    question: 'Mit jelent, hogy egy út 9%-os emelkedésű?',
    options: [
      '100 m vízszintes elmozduláshoz 9 m függőleges emelkedés tartozik, tg α = 0,09',
      'Az út 9°-os szöget zár be a vízszintessel',
      'Az út minden 100 m-én 9 m-t emelkedik az úton mérve, sin α = 0,09',
      'tg α = 9'
    ],
    correctAnswer: 0,
    explanation: 'A meredekség százalékban a függőleges és a vízszintes elmozdulás aránya: tg α = 9/100 = 0,09, ez kb. 5°-os szög.'
  },
  {
    id: 'tc-q9',
    questionTypeBadge: 'Emelkedő (%)',
    figure: FIG_Q9,
    level: 1,
    question: 'Hány fokos emelkedőt jelent a 100%-os meredekség?',
    options: ['45°', '90°', '100°', '60°'],
    correctAnswer: 0,
    explanation: '100% ⇒ tg α = 100/100 = 1 ⇒ α = 45°. (Függőleges, 90°-os „emelkedőnek” nincs véges százalékos meredeksége.)'
  },
  {
    id: 'tc-q10',
    questionTypeBadge: 'Toronymagasság',
    figure: FIG_Q10,
    level: 1,
    question: 'A toronytól 30 m-re mért emelkedési szög α. Melyik képlet adja a torony h magasságát?',
    options: ['h = 30 · tg α', 'h = 30 : tg α', 'h = tg α : 30', 'h = 30 + tg α'],
    correctAnswer: 0,
    explanation: 'A derékszögű háromszögben h az α-val szemközti, 30 m a melletti befogó: h / 30 = tg α ⇒ h = 30 · tg α.'
  },

  // LEVEL 2: Számolás és mérési pontosság (11–20)
  {
    id: 'tc-q11',
    questionTypeBadge: 'Mérési pontosság',
    figure: FIG_Q11,
    level: 2,
    question: 'A 30 m-re lévő pontból mért emelkedési szögek 36° és 38° között szóródnak. Milyen határok között van a torony magassága?',
    options: ['≈ 21,8 m és ≈ 23,4 m között', '≈ 17,6 m és ≈ 18,5 m között', '≈ 38,4 m és ≈ 41,3 m között', '36 m és 38 m között'],
    correctAnswer: 0,
    explanation: '30 · tg 36° ≈ 21,8 m és 30 · tg 38° ≈ 23,4 m. (A 38,4–41,3 m a hibás 30 : tg α osztásból jönne.)',
    breakdown: ['h = 30 · tg α', '30 · tg 36° ≈ 30 · 0,7265 ≈ 21,8 m', '30 · tg 38° ≈ 30 · 0,7813 ≈ 23,4 m']
  },
  {
    id: 'tc-q12',
    questionTypeBadge: 'Mérési pontosság',
    figure: FIG_Q12,
    level: 2,
    question: 'Pontosabb méréssel a szögek 36,5° és 37,5° között vannak (30 m távolságból). Mekkora a torony magassága?',
    options: ['≈ 22,2 m és ≈ 23,0 m között', '≈ 21,8 m és ≈ 23,4 m között', '≈ 22,6 m pontosan', '≈ 17,8 m és ≈ 18,3 m között'],
    correctAnswer: 0,
    explanation: '30 · tg 36,5° ≈ 22,2 m és 30 · tg 37,5° ≈ 23,0 m – a pontosabb szögmérés szűkebb magasságtartományt ad.'
  },
  {
    id: 'tc-q13',
    questionTypeBadge: 'Tangens értéke',
    level: 2,
    question: 'Mennyi tg 78,3° négy tizedesjegyre kerekítve?',
    options: ['4,8288', '0,2071', '0,9792', '−0,2445'],
    correctAnswer: 0,
    explanation: 'D módban tan 78,3 = 4,8288… (0,2071 a tg 11,7°, 0,9792 a sin 78,3°, −0,2445 pedig RAD módban jönne ki.)'
  },
  {
    id: 'tc-q14',
    questionTypeBadge: 'Tangens 90° közelében',
    level: 2,
    question: 'Mit tapasztalunk, ha kiszámítjuk tg 89,9°-ot?',
    options: [
      'Nagyon nagy számot kapunk (≈ 573), mert 90° közelében a tangens minden határon túl nő',
      'Közel 1-et kapunk',
      'Közel 0-t kapunk',
      'A gép hibát jelez, mert 89,9° nem hegyesszög'
    ],
    correctAnswer: 0,
    explanation: 'tg 89,9° ≈ 572,96. Ha a szemközti befogóhoz tartozó szög 90°-hoz közelít, a szemközti befogó a mellettihez képest egyre hosszabb.'
  },
  {
    id: 'tc-q15',
    questionTypeBadge: 'Szög meghatározása',
    level: 2,
    question: 'Hány fokos az a hegyesszög, amelynek tangense 0,28?',
    options: ['≈ 15,64°', '≈ 74,36°', '0,28°', '28°'],
    correctAnswer: 0,
    explanation: '2ndf tan 0,28 = 15,6422… ⇒ α ≈ 15,64°. (A 74,36° a pótszöge, annak tangense 1/0,28 ≈ 3,57.)'
  },
  {
    id: 'tc-q16',
    questionTypeBadge: 'Szög meghatározása',
    level: 2,
    question: 'Hány fokos az a hegyesszög, amelynek tangense 3,2?',
    options: ['≈ 72,65°', '≈ 17,35°', '≈ 3,2°', '≈ 86,8°'],
    correctAnswer: 0,
    explanation: '2ndf tan 3,2 = 72,6459… ⇒ α ≈ 72,65°.'
  },
  {
    id: 'tc-q17',
    questionTypeBadge: 'Emelkedő (%)',
    figure: FIG_Q17,
    level: 2,
    question: 'Hány százalékos emelkedésű az a lejtő, amely a vízszintessel 15°-os szöget alkot?',
    options: ['≈ 26,8%', '15%', '≈ 25,9%', '≈ 373%'],
    correctAnswer: 0,
    explanation: 'p% = 100 · tg 15° ≈ 100 · 0,2679 ≈ 26,8%. (25,9% a 100 · sin 15° hibás alkalmazása lenne.)'
  },
  {
    id: 'tc-q18',
    questionTypeBadge: 'Téglalap átlója',
    figure: FIG_Q18,
    level: 2,
    question: 'Egy téglalap alakú kert egyik oldala 25 m, ez az oldal az átlóval 39,5° és 40,5° közötti szöget zár be. Mekkora lehet a kert területe?',
    options: ['≈ 515 m² és ≈ 534 m² között', '≈ 988 m² és ≈ 1012 m² között', '≈ 732 m² és ≈ 758 m² között', 'Pontosan 625 m²'],
    correctAnswer: 0,
    explanation: 'A másik oldal 25 · tg α: 25 · tg 39,5° ≈ 20,61 m és 25 · tg 40,5° ≈ 21,35 m. A terület 25-szöröse: ≈ 515 m² és ≈ 534 m².'
  },
  {
    id: 'tc-q19',
    questionTypeBadge: 'Szöveges feladat',
    figure: FIG_Q19,
    level: 2,
    question: 'A hegycsúcs vízszintes távolsága 1 km, a csúcs 26° és 28° közötti emelkedési szögben látszik. Milyen magasan lehet a csúcs a mérő szintje felett?',
    options: ['≈ 488 m és ≈ 532 m között', '≈ 26 m és ≈ 28 m között', '≈ 1881 m és ≈ 2050 m között', '≈ 438 m és ≈ 469 m között'],
    correctAnswer: 0,
    explanation: '1000 · tg 26° ≈ 487,7 m és 1000 · tg 28° ≈ 531,7 m. (1881–2050 m a fordított, 1000 : tg α osztásból jönne.)'
  },
  {
    id: 'tc-q20',
    questionTypeBadge: 'Árnyék',
    figure: FIG_Q20,
    level: 2,
    question: 'Milyen hosszú egy 1,70 m magas ember árnyéka, ha a napsugarak 37°-os szöget zárnak be a vízszintes talajjal?',
    options: ['≈ 2,26 m', '≈ 1,28 m', '1,70 m', '≈ 2,82 m'],
    correctAnswer: 0,
    explanation: 'A 37°-os szöggel szemközti befogó a magasság (1,70 m), a melletti az árnyék: árnyék = 1,70 : tg 37° ≈ 1,70 : 0,7536 ≈ 2,26 m.'
  },

  // LEVEL 3: Összetett alkalmazások (21–30)
  {
    id: 'tc-q21',
    questionTypeBadge: 'Szöveges feladat',
    figure: FIG_Q21,
    level: 3,
    question: 'Egy 15°-os emelkedésű egyenes úton biciklizve 30 m-rel magasabbra jutottunk. Mekkora vízszintes távolságot tettünk meg?',
    options: ['≈ 112 m', '≈ 8 m', '30 m', '≈ 116 m'],
    correctAnswer: 0,
    explanation: 'tg 15° = 30 / x ⇒ x = 30 : tg 15° ≈ 30 : 0,2679 ≈ 112 m. (A ≈ 116 m már az úton megtett táv.)'
  },
  {
    id: 'tc-q22',
    questionTypeBadge: 'Pitagorasz-tétel',
    figure: FIG_Q22,
    level: 3,
    question: 'Az előző feladatban (vízszintesen ≈ 111,96 m, emelkedés 30 m) hány métert bicikliztünk az úton?',
    options: ['≈ 115,9 m', '≈ 142,0 m', '≈ 112,0 m', '≈ 107,8 m'],
    correctAnswer: 0,
    explanation: 'Az út a derékszögű háromszög átfogója: √(111,96² + 30²) ≈ √13 435 ≈ 115,9 m. (142 m a két befogó összege lenne.)'
  },
  {
    id: 'tc-q23',
    questionTypeBadge: 'Lejtő',
    figure: FIG_Q23,
    level: 3,
    question: 'Egyenletesen lejtő úton 250 m-t gurulva 23 m-rel kerültünk lejjebb. Hány százalékos a lejtő, és hány fokos szöget zár be a vízszintessel?',
    options: ['≈ 9,2% és ≈ 5,3°', '≈ 9,2% és ≈ 9,2°', '≈ 10,9% és ≈ 6,2°', '23% és ≈ 13°'],
    correctAnswer: 0,
    explanation: 'A 250 m az átfogó! Vízszintesen √(250² − 23²) ≈ 248,94 m. tg α = 23 / 248,94 ≈ 0,0924 ⇒ ≈ 9,2%, α ≈ 5,28°.',
    breakdown: ['vízszintes: √(250² − 23²) ≈ 248,94 m', 'tg α = 23 / 248,94 ≈ 0,0924 ⇒ ≈ 9,2%', 'α = tan⁻¹ 0,0924 ≈ 5,3°']
  },
  {
    id: 'tc-q24',
    questionTypeBadge: 'Pontosság',
    level: 3,
    question: 'Két csillagász egy galaxis távolságát 15,047 és 15,046 fényévnek mérte. Hány km az eltérés? (A fény 1 s alatt 300 000 km-t tesz meg.)',
    options: ['≈ 9,47 · 10⁹ km', '300 000 km', '≈ 9,47 · 10⁶ km', '≈ 1 km'],
    correctAnswer: 0,
    explanation: '0,001 fényév = 0,001 · 300 000 km/s · 365,25 · 24 · 3600 s ≈ 9,47 · 10⁹ km – a „sok tizedesjegy” ellenére óriási eltérés!'
  },
  {
    id: 'tc-q25',
    questionTypeBadge: 'Interpoláció',
    level: 3,
    question: 'A táblázatban tg 11° 30′ = 0,2035 és tg 11° 36′ = 0,2053. Lineáris interpolációval mennyi tg 11° 33′?',
    options: ['≈ 0,2044', '≈ 0,2053', '≈ 0,2038', '≈ 0,2088'],
    correctAnswer: 0,
    explanation: '6′ alatt 0,0018-cal nő, 1′-re 0,0003, 3′-re 0,0009 jut: 0,2035 + 0,0009 = 0,2044.'
  },
  {
    id: 'tc-q26',
    questionTypeBadge: 'Fok és szögperc',
    level: 3,
    question: 'A táblázat szerint a 0,1370 tangensű szög 7,8°. Hogyan írható ez fokban és szögpercben?',
    options: ['7° 48′', '7° 80′', '7° 8′', '7° 30′'],
    correctAnswer: 0,
    explanation: '0,8° = 0,8 · 60′ = 48′, így 7,8° = 7° 48′.'
  },
  {
    id: 'tc-q27',
    questionTypeBadge: 'Számológép',
    level: 3,
    question: 'Valaki a tan 64 = gombsorral 2,3478…-at kapott. Mi a hiba oka?',
    options: [
      'A gép RAD módban volt, a 64-et radiánként értelmezte',
      'A gép GRAD módban volt',
      'Rossz sorrendben nyomta meg a gombokat, ez mindig hibás eredményt ad',
      'Nincs hiba, tg 64° ≈ 2,3478'
    ],
    correctAnswer: 0,
    explanation: 'RAD módban tan 64 ≈ 2,3479 (64 radián). GRAD módban ≈ 1,5757 lenne, D módban a helyes érték 2,0503.'
  },
  {
    id: 'tc-q28',
    questionTypeBadge: 'Mérési pontosság',
    level: 3,
    question: '30 m távolságból mérünk. Melyik esetben okoz nagyobb magasságbeli eltérést 1°-os szöghiba?',
    options: [
      '70° és 71° között (≈ 4,7 m eltérés)',
      '20° és 21° között (≈ 0,6 m eltérés)',
      'Mindkettőnél ugyanakkora az eltérés',
      'Az eltérés nem függ a szögtől, csak a távolságtól'
    ],
    correctAnswer: 0,
    explanation: '30 · (tg 21° − tg 20°) ≈ 0,6 m, de 30 · (tg 71° − tg 70°) ≈ 4,7 m. A tangens 90° felé egyre gyorsabban nő, így nagy szögeknél a mérési hiba felerősödik.'
  },
  {
    id: 'tc-q29',
    questionTypeBadge: 'Szög meghatározása',
    figure: FIG_Q29,
    level: 3,
    question: 'Egy 2 m magas függőleges bot árnyéka 3,5 m. Mekkora szöget zárnak be a napsugarak a talajjal?',
    options: ['≈ 29,7°', '≈ 60,3°', '≈ 0,57°', '≈ 34,8°'],
    correctAnswer: 0,
    explanation: 'tg α = 2 / 3,5 ≈ 0,5714 ⇒ α = tan⁻¹ 0,5714 ≈ 29,7°. (60,3° a fordított hányadosból jönne.)'
  },
  {
    id: 'tc-q30',
    questionTypeBadge: 'Pótszögek',
    level: 3,
    question: 'Két hegyesszögre tg α = 2 és tg β = 0,5. Mennyi α + β?',
    options: ['90°', '2,5°', '75°', '120°'],
    correctAnswer: 0,
    explanation: 'tan⁻¹ 2 ≈ 63,43° és tan⁻¹ 0,5 ≈ 26,57°, összegük 90°. Nem véletlen: a tangensek reciprokok, tehát a két szög egy derékszögű háromszög két hegyesszöge (pótszögek).'
  }
];

export const TangentCalcQuiz: React.FC<{
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
      topicId="g11-trig-tangens-szamolas-quiz"
      subtopicId="szamolas-szogek-tangensevel"
      title="2. Számolás szögek tangensével – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: számológép-használat, mérési pontosság, lejtők meredeksége és interpoláció."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • KVÍZ"
      questions={TANGENT_CALC_QUESTIONS}
      cheatSheets={[
        {
          title: 'Számológép',
          items: [
            'D / DEG mód: fokban számol (ellenőrzés: tan 45 = 1).',
            'tan: szög → tangens; 2ndf tan (SHIFT tan): tangens → szög.',
            'Szögperc: 14° 24′ = 14 + 24/60 = 14,4°.',
            'tg 64° ≈ 2,0503; tg 14,4° ≈ 0,2568; tan⁻¹ 5 ≈ 78,69°.'
          ]
        },
        {
          title: 'Lejtők és mérések',
          items: [
            'p% meredekség ⇔ tg α = p / 100; 100% = 45°.',
            '15° ≈ 26,8%; 9% ≈ 5°.',
            'h = d · tg α; a szög hibahatárai ⇒ a magasság hibahatárai.',
            'Torony 30 m-ről: 36°…38° ⇒ 21,8 m…23,4 m.'
          ]
        },
        {
          title: 'Függvénytáblázat',
          items: [
            'Négyjegyű táblázat: négy tizedesjegyre kerekített értékek.',
            'Lineáris interpoláció: a két szomszédos érték között egyenletes növekedést feltételezünk.',
            'tg 11° 30′ = 0,2035; tg 11° 36′ = 0,2053 ⇒ tg 11° 33′ ≈ 0,2044.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <TangentCalcMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <TangentCalcSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default TangentCalcQuiz;
