import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { SimilarSolidsMatcher } from './SimilarSolidsMatcher';
import { SimilarSolidsSorter } from './SimilarSolidsSorter';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek (nem exportált). Takart élek szaggatottak.
// ---------------------------------------------------------------------------
const fR = (n: number) => Math.round(n * 10) / 10;
const F_INK = '#0f172a';
const F_RED = '#dc2626';
const F_UNK = '#dc2626';
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

const QText: React.FC<{ x: number; y: number; t: string; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end' }> = ({
  x,
  y,
  t,
  size = 10.5,
  color,
  anchor = 'middle'
}) => (
  <text x={fR(x)} y={fR(y)} fontSize={size} fontWeight="bold" textAnchor={anchor} dominantBaseline="middle" fill={t.includes('?') ? F_UNK : color ?? F_INK}>
    {t}
  </text>
);

/** Ferde vetületű téglatest; (x, y) az elülső lap bal alsó csúcsa. */
const QBox: React.FC<{ x: number; y: number; w: number; h: number; d: number; n?: number; color?: string; fill?: string; dashAll?: boolean }> = ({
  x,
  y,
  w,
  h,
  d,
  n = 1,
  color = '#334155',
  fill = 'rgba(59,130,246,0.12)',
  dashAll
}) => {
  const dx = d * 0.5;
  const dy = -d * 0.38;
  const P = (a: number, b: number) => `${fR(a)},${fR(b)}`;
  const grid: React.ReactNode[] = [];
  for (let i = 1; i < n; i++) {
    const t = i / n;
    grid.push(<line key={`a${i}`} x1={x + w * t} y1={y} x2={x + w * t} y2={y - h} />);
    grid.push(<line key={`b${i}`} x1={x} y1={y - h * t} x2={x + w} y2={y - h * t} />);
    grid.push(<line key={`c${i}`} x1={x + w * t} y1={y - h} x2={x + w * t + dx} y2={y - h + dy} />);
    grid.push(<line key={`d${i}`} x1={x + dx * t} y1={y - h + dy * t} x2={x + w + dx * t} y2={y - h + dy * t} />);
    grid.push(<line key={`e${i}`} x1={x + w + dx * t} y1={y + dy * t} x2={x + w + dx * t} y2={y - h + dy * t} />);
    grid.push(<line key={`f${i}`} x1={x + w} y1={y - h * t} x2={x + w + dx} y2={y - h * t + dy} />);
  }
  return (
    <g>
      <polygon
        points={`${P(x, y)} ${P(x + w, y)} ${P(x + w + dx, y + dy)} ${P(x + w + dx, y - h + dy)} ${P(x + dx, y - h + dy)} ${P(x, y - h)}`}
        fill={fill}
        stroke="none"
      />
      <g stroke={color} strokeWidth="0.7">{grid}</g>
      {!dashAll && (
        <g stroke={color} strokeWidth="0.9" strokeDasharray="3 2" opacity="0.7">
          <line x1={x + dx} y1={y + dy} x2={x} y2={y} />
          <line x1={x + dx} y1={y + dy} x2={x + w + dx} y2={y + dy} />
          <line x1={x + dx} y1={y + dy} x2={x + dx} y2={y - h + dy} />
        </g>
      )}
      <g stroke={color} strokeWidth={dashAll ? 1.1 : 1.5} fill="none" strokeLinejoin="round" strokeDasharray={dashAll ? '3 2' : undefined}>
        <polygon points={`${P(x, y)} ${P(x + w, y)} ${P(x + w, y - h)} ${P(x, y - h)}`} />
        <polyline points={`${P(x, y - h)} ${P(x + dx, y - h + dy)} ${P(x + w + dx, y - h + dy)} ${P(x + w, y - h)}`} />
        <polyline points={`${P(x + w, y)} ${P(x + w + dx, y + dy)} ${P(x + w + dx, y - h + dy)}`} />
      </g>
    </g>
  );
};

/** Ferde vetületű henger. */
const QCyl: React.FC<{ cx: number; by: number; r: number; m: number; lr?: string; lm?: string; color?: string }> = ({ cx, by, r, m, lr, lm, color = '#2563eb' }) => {
  const ry = r * 0.3;
  return (
    <g>
      <rect x={cx - r} y={by - m} width={2 * r} height={m} fill="rgba(37,99,235,0.1)" />
      <path d={`M ${cx - r} ${by} A ${r} ${fR(ry)} 0 0 1 ${cx + r} ${by}`} fill="none" stroke={color} strokeWidth="1" strokeDasharray="3 2" />
      <path d={`M ${cx - r} ${by} A ${r} ${fR(ry)} 0 0 0 ${cx + r} ${by}`} fill="none" stroke={color} strokeWidth="1.5" />
      <ellipse cx={cx} cy={by - m} rx={r} ry={fR(ry)} fill="rgba(37,99,235,0.15)" stroke={color} strokeWidth="1.5" />
      <line x1={cx - r} y1={by} x2={cx - r} y2={by - m} stroke={color} strokeWidth="1.5" />
      <line x1={cx + r} y1={by} x2={cx + r} y2={by - m} stroke={color} strokeWidth="1.5" />
      <line x1={cx} y1={by} x2={cx + r} y2={by} stroke={F_RED} strokeWidth="1.2" />
      {lr && <QText x={cx + r / 2} y={by - 6} t={lr} size={9.5} color={F_RED} />}
      {lm && <QText x={cx + r + 4} y={by - m / 2} t={lm} size={9.5} anchor="start" />}
    </g>
  );
};

const FIG_CUBE_PAIR = (k: string, ask: string) => (
  <QFig title={`Hasonló kockák, k = ${k}`}>
    <QBox x={30} y={120} w={30} h={30} d={30} />
    <QBox x={100} y={130} w={60} h={60} d={60} color="#7c3aed" fill="rgba(124,58,237,0.12)" />
    <QText x={45} y={132} t="a" size={10} />
    <QText x={130} y={142} t={`${k}a`} size={10} />
    <QText x={208} y={60} t={ask} size={11} />
  </QFig>
);

const FIG_RUBIK = (n: number, ask: string) => {
  const u = Math.min(22, 66 / n);
  return (
    <QFig title={`${n} × ${n} × ${n}-es kocka`}>
      <QBox x={60} y={128} w={n * u} h={n * u} d={n * u} n={n} fill="rgba(234,179,8,0.2)" />
      <QText x={200} y={70} t={ask} size={11} />
    </QFig>
  );
};

const FIG_MINYON = (ask: string) => (
  <QFig title="Minyon és 3-szoros nagyítása">
    <QBox x={18} y={118} w={28} h={17.5} d={21} color="#9d174d" fill="rgba(236,72,153,0.18)" />
    <QText x={40} y={132} t="4 × 3 × 2,5" size={8.5} />
    <QBox x={100} y={132} w={84} h={52.5} d={63} color="#9d174d" fill="rgba(236,72,153,0.12)" />
    <QText x={142} y={143} t={ask} size={10} />
  </QFig>
);

const FIG_CONCRETE = (a: string, frac: number) => (
  <QFig title="Kocka alakú üreg a betonkockában">
    <QBox x={40} y={135} w={90} h={90} d={90} fill="rgba(148,163,184,0.25)" />
    <QBox x={40 + 45 * (1 - frac) + 10} y={135 - 45 * (1 - frac) - 8} w={90 * frac} h={90 * frac} d={90 * frac} color={F_RED} fill="rgba(239,68,68,0.1)" dashAll />
    <QText x={85} y={144} t="126 cm" size={9.5} />
    <QText x={198} y={50} t={`üreg: ${a}`} size={9.5} color={F_RED} />
    <QText x={198} y={84} t="V_üreg : V_maradék" size={8.5} />
    <QText x={198} y={100} t="= ?" size={11} />
  </QFig>
);

const FIG_BONBON = (ask: string) => (
  <QFig title="Marcipángolyó csokoládémázban">
    <circle cx="75" cy="82" r="52" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
    <circle cx="75" cy="82" r="38" fill="#fde68a" stroke="#b45309" strokeWidth="1.2" />
    <line x1="37" y1="82" x2="113" y2="82" stroke={F_INK} strokeWidth="1" />
    <QText x={75} y={74} t="22 mm" size={9.5} />
    <line x1="23" y1="142" x2="127" y2="142" stroke={F_INK} strokeWidth="1" />
    <QText x={75} y={136} t="30 mm" size={9} />
    <QText x={186} y={82} t={ask} size={10.5} />
  </QFig>
);

const FIG_CYL_4 = (
  <QFig title="V′ = 4 · V">
    <QCyl cx={55} by={125} r={22} m={30} lr="r" lm="M" />
    <text x="92" y="100" fontSize="14" fill={F_AUX}>→</text>
    <QCyl cx={160} by={130} r={35} m={48} lr="7 cm" lm="3 cm" color="#7c3aed" />
    <QText x={55} y={78} t="r, M = ?" size={9.5} />
  </QFig>
);

const FIG_SHOT = (
  <QFig title="Gömbök hasonlósága">
    <circle cx="70" cy="80" r="50" fill="rgba(100,116,139,0.25)" stroke="#334155" strokeWidth="1.5" />
    <line x1="70" y1="80" x2="120" y2="80" stroke={F_RED} strokeWidth="1.3" />
    <QText x={95} y={72} t="20 mm" size={9.5} color={F_RED} />
    <circle cx="170" cy="80" r="3" fill="rgba(100,116,139,0.4)" stroke="#334155" strokeWidth="1" />
    <QText x={170} y={96} t="1 mm" size={9.5} />
    <QText x={200} y={124} t="k³ = ?" size={10.5} />
  </QFig>
);

const SIMILAR_SOLIDS_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'sim-q1',
    questionTypeBadge: 'Felszínarány',
    figure: FIG_CUBE_PAIR('2', 'A′/A = ?'),
    level: 1,
    question: 'Egy kocka éleit kétszeresére növeljük. Hányszorosára nő a felszíne?',
    options: ['4-szeresére', '2-szeresére', '8-szorosára', '6-szorosára'],
    correctAnswer: 0,
    explanation: 'A két kocka hasonló, k = 2. A felszínek aránya k² = 4.'
  },
  {
    id: 'sim-q2',
    questionTypeBadge: 'Térfogatarány',
    figure: FIG_CUBE_PAIR('2', 'V′/V = ?'),
    level: 1,
    question: 'Egy kocka éleit kétszeresére növeljük. Hányszorosára nő a térfogata?',
    options: ['8-szorosára', '4-szeresére', '2-szeresére', '6-szorosára'],
    correctAnswer: 0,
    explanation: 'A térfogatok aránya k³ = 2³ = 8 (a 2 × 2 × 2-es kocka 8 kis kockából áll).'
  },
  {
    id: 'sim-q3',
    questionTypeBadge: 'Rubik-kocka',
    figure: FIG_RUBIK(3, 'db = ?'),
    level: 1,
    question: 'Hány 1 × 1 × 1-es kis kockából épül fel egy 3 × 3 × 3-as kocka?',
    options: ['27', '9', '54', '26'],
    correctAnswer: 0,
    explanation: '3 sorban egymás fölött 3 · 3 kis kocka: 3³ = 27. (9 egy lap négyzeteinek száma, 54 a felszínen látható négyzetlapok száma.)'
  },
  {
    id: 'sim-q4',
    questionTypeBadge: 'Rubik-kocka',
    figure: FIG_RUBIK(4, 'A/A₁ = ?'),
    level: 1,
    question: 'Hányszorosa a 4 × 4 × 4-es kocka felszíne egy 1 × 1 × 1-es kis kocka felszínének?',
    options: ['16', '64', '4', '96'],
    correctAnswer: 0,
    explanation: 'k = 4, a felszínek aránya k² = 16 (96 négyzetlap : 6 négyzetlap). 64 a térfogatarány, 96 maga a felszín (egységnégyzetben).'
  },
  {
    id: 'sim-q5',
    questionTypeBadge: 'Rubik-kocka',
    level: 1,
    question: 'Hány kis kockából állna egy tömör 25 × 25 × 25-ös kocka?',
    options: ['15 625', '625', '3750', '75'],
    correctAnswer: 0,
    explanation: '25³ = 15 625. (625 = 25² egy lap, 3750 = 6 · 625 a felszíni négyzetek száma.)'
  },
  {
    id: 'sim-q6',
    questionTypeBadge: 'Kicsinyítés',
    level: 1,
    question: 'Egy testet a felére kicsinyítünk (k = 1/2). Hányad részére csökken a térfogata?',
    options: ['1/8 részére', '1/4 részére', '1/2 részére', '1/6 részére'],
    correctAnswer: 0,
    explanation: 'V′/V = k³ = (1/2)³ = 1/8. (1/4 a felszín változása.)'
  },
  {
    id: 'sim-q7',
    questionTypeBadge: 'Henger nagyítása',
    level: 1,
    question: 'Egy hengert k-szorosára nagyítunk (sugara és magassága is k-szoros). Hányszorosára nő a felszíne?',
    options: ['k²-szeresére', 'k-szorosára', 'k³-szorosára', '2k-szorosára'],
    correctAnswer: 0,
    explanation: 'A′ = 2(kr)²π + 2krπ · kM = k²(2r²π + 2rπM) = k² · A.'
  },
  {
    id: 'sim-q8',
    questionTypeBadge: 'Síkidomok',
    level: 1,
    question: 'Két hasonló síkidom hasonlósági aránya k. Mennyi a kerületük aránya?',
    options: ['k', 'k²', 'k³', '2k'],
    correctAnswer: 0,
    explanation: 'A kerület hosszúság, ezért a kerületek aránya k; a területeké k².'
  },
  {
    id: 'sim-q9',
    questionTypeBadge: 'Hasonlóság',
    level: 1,
    question: 'Melyik állítás igaz?',
    options: ['Bármely két gömb hasonló', 'Bármely két téglatest hasonló', 'Bármely két henger hasonló', 'Bármely két egyenlő térfogatú test hasonló'],
    correctAnswer: 0,
    explanation: 'Két gömb mindig hasonló (k = a sugarak aránya). Téglatestek és hengerek csak akkor, ha minden megfelelő méretük aránya ugyanaz.'
  },
  {
    id: 'sim-q10',
    questionTypeBadge: 'Felszínarány',
    level: 1,
    question: 'Két hasonló test hasonlósági aránya 10. Hányszorosa a nagyobbik felszíne a kisebbikének?',
    options: ['100', '10', '1000', '20'],
    correctAnswer: 0,
    explanation: 'A′/A = k² = 10² = 100.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'sim-q11',
    questionTypeBadge: 'Visszafelé',
    level: 2,
    question: 'Két hasonló test felszínének aránya 9. Mennyi a térfogatuk aránya?',
    options: ['27', '81', '9', '3'],
    correctAnswer: 0,
    explanation: 'k² = 9 ⇒ k = 3, így V′/V = k³ = 27. (81 = 9² hibás: a felszínarányt nem szabad négyzetre emelni.)'
  },
  {
    id: 'sim-q12',
    questionTypeBadge: 'Visszafelé',
    level: 2,
    question: 'Két hasonló test térfogatának aránya 8. Mennyi a felszínük aránya?',
    options: ['4', '64', '2', '8'],
    correctAnswer: 0,
    explanation: 'k³ = 8 ⇒ k = 2, így A′/A = k² = 4.'
  },
  {
    id: 'sim-q13',
    questionTypeBadge: 'Minyon',
    figure: FIG_MINYON('élek = ?'),
    level: 2,
    question: 'Egy téglatest alakú minyon méretei 4 cm, 3 cm és 2,5 cm. Mekkorák a 3-szoros nagyítás élei?',
    options: ['12 cm, 9 cm, 7,5 cm', '36 cm, 27 cm, 22,5 cm', '7 cm, 6 cm, 5,5 cm', '12 cm, 9 cm, 2,5 cm'],
    correctAnswer: 0,
    explanation: 'Hasonló nagyításnál minden él a 3-szorosára változik: 12 cm, 9 cm, 7,5 cm.'
  },
  {
    id: 'sim-q14',
    questionTypeBadge: 'Minyon',
    figure: FIG_MINYON('A′ = ?'),
    level: 2,
    question: 'A 4 cm × 3 cm × 2,5 cm-es minyon felszíne 59 cm². Mekkora a 3-szoros nagyítás („óriás minyon”) felszíne?',
    options: ['531 cm²', '177 cm²', '1593 cm²', '295 cm²'],
    correctAnswer: 0,
    explanation: 'A′ = k² · A = 9 · 59 = 531 cm². (Ellenőrzés: 2(12 · 9 + 12 · 7,5 + 9 · 7,5) = 2 · 265,5 = 531.)'
  },
  {
    id: 'sim-q15',
    questionTypeBadge: 'Minyon',
    level: 2,
    question: 'Mekkora a 4 cm × 3 cm × 2,5 cm-es minyon 3-szoros nagyításának térfogata?',
    options: ['810 cm³', '90 cm³', '270 cm³', '2430 cm³'],
    correctAnswer: 0,
    explanation: 'V = 4 · 3 · 2,5 = 30 cm³, V′ = 27 · 30 = 810 cm³ (= 12 · 9 · 7,5).'
  },
  {
    id: 'sim-q16',
    questionTypeBadge: 'Üreg',
    figure: FIG_CONCRETE('63 cm', 0.5),
    level: 2,
    question: 'Egy 1,26 m élű betonkockából 63 cm élű kocka alakú üreget vájtak ki. Hányad része az üreg térfogata a megmaradt betonénak?',
    options: ['1/7', '1/8', '1/2', '1/4'],
    correctAnswer: 0,
    explanation: 'k = 63/126 = 1/2 ⇒ V_üreg = V/8. A maradék 7V/8, így az üreg a maradék 1/7 része. (1/8 a teljes kockához viszonyít.)'
  },
  {
    id: 'sim-q17',
    questionTypeBadge: 'Üreg',
    figure: FIG_CONCRETE('42 cm', 1 / 3),
    level: 2,
    question: 'Egy 1,26 m élű betonkockából 42 cm élű kocka alakú üreget vájtak ki. Hányad része az üreg térfogata a megmaradt betonénak?',
    options: ['1/26', '1/27', '1/3', '1/9'],
    correctAnswer: 0,
    explanation: 'k = 42/126 = 1/3 ⇒ V_üreg = V/27, a maradék 26V/27, az arány 1/26.'
  },
  {
    id: 'sim-q18',
    questionTypeBadge: 'Üreg',
    level: 2,
    question: 'Egy 1,26 m élű betonkockából 21 cm élű kocka alakú üreget vájtak ki. Hányad része az üreg térfogata a megmaradt betonénak?',
    options: ['1/215', '1/216', '1/36', '1/6'],
    correctAnswer: 0,
    explanation: 'k = 21/126 = 1/6 ⇒ V_üreg = V/216, a maradék 215V/216, az arány 1/215.'
  },
  {
    id: 'sim-q19',
    questionTypeBadge: 'Bonbon',
    figure: FIG_BONBON('V : V = ?'),
    level: 2,
    question: 'A 22 mm átmérőjű marcipángolyót csokoládémázzal 30 mm átmérőjű gömb alakú bonbonná vonják be. Hányszorosa a bonbon térfogata a marcipángolyóénak?',
    options: ['≈ 2,54', '≈ 1,36', '≈ 1,86', '≈ 1,54'],
    correctAnswer: 0,
    explanation: 'A gömbök hasonlók, k = 30/22 ≈ 1,364, a térfogatarány k³ ≈ 2,54. (1,86 ≈ k² a felszínarány.)'
  },
  {
    id: 'sim-q20',
    questionTypeBadge: 'Sörétek',
    figure: FIG_SHOT,
    level: 2,
    question: 'Egy 2 cm sugarú ólomgolyóból 1 mm sugarú söréteket öntenek. A hasonlósággal számolva hány sörét készül?',
    options: ['8000', '400', '20', '2000'],
    correctAnswer: 0,
    explanation: 'A golyó és a sörét hasonló, k = 20 mm / 1 mm = 20, a térfogatarány k³ = 8000.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'sim-q21',
    questionTypeBadge: 'Marcipángolyók',
    level: 3,
    question: 'Hány dm³ a 340 darab 22 mm átmérőjű marcipángolyó együttes térfogata?',
    options: ['≈ 1,90 dm³', '≈ 15,2 dm³', '≈ 0,19 dm³', '≈ 5,58 dm³'],
    correctAnswer: 0,
    explanation: 'Egy golyó: 4 · 11³ · π / 3 ≈ 5575 mm³; 340 db: ≈ 1 895 600 mm³ ≈ 1,90 dm³ (1 dm³ = 10⁶ mm³). (15,2 dm³ az átmérővel számolva jön ki.)'
  },
  {
    id: 'sim-q22',
    questionTypeBadge: 'Csokoládémáz',
    figure: FIG_BONBON('máz = ?'),
    level: 3,
    question: 'Hány dm³ csokoládé kell 340 darab 22 mm-es marcipángolyó 30 mm átmérőjű bonbonná való bevonásához?',
    options: ['≈ 2,91 dm³', '≈ 4,81 dm³', '≈ 1,90 dm³', '≈ 0,85 dm³'],
    correctAnswer: 0,
    explanation: 'Egy bonbon mázának térfogata 4π(15³ − 11³)/3 ≈ 8562 mm³; 340 db ≈ 2 911 000 mm³ ≈ 2,91 dm³. (4,81 dm³ a teljes bonbonok térfogata.)'
  },
  {
    id: 'sim-q23',
    questionTypeBadge: 'Bonbon átmérője',
    level: 3,
    question: 'Mekkora lett volna egy bonbon átmérője, ha a 340 marcipángolyóra 5,2 dm³ csokoládét használtak volna fel?',
    options: ['≈ 34,2 mm', '≈ 30,0 mm', '≈ 30,8 mm', '≈ 38,3 mm'],
    correctAnswer: 0,
    explanation: 'Egy bonbonra 5,2 · 10⁶ / 340 ≈ 15 294 mm³ máz jut; a bonbon térfogata ≈ 15 294 + 5575 ≈ 20 869 mm³. r³ = 3 · 20 869 / (4π) ≈ 4982 ⇒ r ≈ 17,1 mm, d ≈ 34,2 mm. (30,8 mm a marcipán nélküli, 38,3 mm a 30 mm-es bonbonra rakott máz eredménye.)',
    breakdown: ['máz / db ≈ 15 294 mm³', 'V_bonbon ≈ 20 869 mm³', 'r ≈ ∛4982 ≈ 17,08 mm', 'd ≈ 34,2 mm']
  },
  {
    id: 'sim-q24',
    questionTypeBadge: 'Henger nagyítása',
    level: 3,
    question: 'Egy forgáshenger térfogata nagyítás során 4-szeresére nőtt. Hányszorosára nőtt a felszíne?',
    options: ['∛16 ≈ 2,52-szeresére', '16-szorosára', '2-szeresére', '4-szeresére'],
    correctAnswer: 0,
    explanation: 'k³ = 4 ⇒ k = ∛4 ≈ 1,587, így A′/A = k² = ∛16 ≈ 2,52. (2-szeres lenne, ha √4-gyel számolnánk.)'
  },
  {
    id: 'sim-q25',
    questionTypeBadge: 'Henger nagyítása',
    figure: FIG_CYL_4,
    level: 3,
    question: 'Egy henger térfogata nagyításkor 4-szeresére nőtt; a nagyított henger alapkörének sugara 7 cm, magassága 3 cm. Mekkorák voltak az eredeti adatok (egy tizedesre)?',
    options: ['r ≈ 4,4 cm, M ≈ 1,9 cm', 'r = 1,75 cm, M = 0,75 cm', 'r = 3,5 cm, M = 1,5 cm', 'r ≈ 11,1 cm, M ≈ 4,8 cm'],
    correctAnswer: 0,
    explanation: 'k = ∛4 ≈ 1,587: r = 7 / 1,587 ≈ 4,4 cm, M = 3 / 1,587 ≈ 1,9 cm. (1,75 és 0,75 a 4-gyel, 3,5 és 1,5 a 2-vel való osztás hibája.)'
  },
  {
    id: 'sim-q26',
    questionTypeBadge: 'Makett',
    level: 3,
    question: 'Egy hajó 1 : 50 méretarányú makettjének lefestéséhez a valódi hajó festékszükségletének hányad része kell (azonos rétegvastagságnál)?',
    options: ['1/2500 része', '1/50 része', '1/125 000 része', '1/100 része'],
    correctAnswer: 0,
    explanation: 'A festék a felszínnel arányos: k² = (1/50)² = 1/2500. (1/125 000 a térfogatok aránya.)'
  },
  {
    id: 'sim-q27',
    questionTypeBadge: 'Szobor',
    level: 3,
    question: 'Egy 20 cm magas bronz szobrocska tömege 0,5 kg. Mekkora a tömege a vele hasonló, ugyanabból az anyagból készült 2 m magas szobornak?',
    options: ['500 kg', '5 kg', '50 kg', '5000 kg'],
    correctAnswer: 0,
    explanation: 'k = 200 cm / 20 cm = 10, a térfogat (és tömeg) k³ = 1000-szeres: 0,5 · 1000 = 500 kg.'
  },
  {
    id: 'sim-q28',
    questionTypeBadge: 'Gömbök felszíne',
    level: 3,
    question: 'A marcipános feladatban háromféle gömb szerepel: a 22 mm-es marcipángolyó, a 30 mm-es bonbon és az 5,2 dm³ csokoládéval kapható ≈ 34,2 mm-es bonbon. Mekkora a felszínük?',
    options: ['≈ 1520,5 mm², ≈ 2827,4 mm², ≈ 3665,7 mm²', '≈ 6082,1 mm², ≈ 11 309,7 mm², ≈ 14 662,8 mm²', '≈ 380,1 mm², ≈ 706,9 mm², ≈ 916,4 mm²', '≈ 760,3 mm², ≈ 1413,7 mm², ≈ 1832,9 mm²'],
    correctAnswer: 0,
    explanation: 'A = 4r²π: r = 11 mm ⇒ 484π ≈ 1520,5 mm²; r = 15 mm ⇒ 900π ≈ 2827,4 mm²; r ≈ 17,08 mm ⇒ ≈ 3665,7 mm². A két 30 mm-es / 22 mm-es felszín aránya (15/11)² ≈ 1,86 = k². (A második sor az átmérővel mint sugárral, a harmadik a főkör területével számol.)'
  },
  {
    id: 'sim-q29',
    questionTypeBadge: 'Százalék',
    level: 3,
    question: 'Egy gömb sugarát 10%-kal növeljük. Hány százalékkal nő a térfogata?',
    options: ['33,1%-kal', '10%-kal', '21%-kal', '30%-kal'],
    correctAnswer: 0,
    explanation: 'k = 1,1, k³ = 1,331, tehát a térfogat 33,1%-kal nő. (21% a felszín növekedése: 1,1² = 1,21.)'
  },
  {
    id: 'sim-q30',
    questionTypeBadge: 'Felszín 20-szoros',
    level: 3,
    question: 'A 2 cm sugarú ólomgolyóból öntött 8000 darab 1 mm sugarú sörét együttes felszíne hányszorosa a golyó felszínének?',
    options: ['20', '400', '8000', '1/20'],
    correctAnswer: 0,
    explanation: 'Egy sörét felszíne a golyóénak (1/20)² = 1/400 része, 8000 sörété 8000/400 = 20-szorosa.'
  }
];

export const SimilarSolidsQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={12}
      chapterId="tergeometria"
      topicId="g12-ter-hasonlo-testek-quiz"
      subtopicId="hasonlo-testek-felszine-terfogata"
      title="8. Hasonló testek felszíne, térfogata – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: k, k², k³; Rubik-kockák, betonkocka, bonbonok, nagyított hengerek."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • KVÍZ"
      questions={SIMILAR_SOLIDS_QUESTIONS}
      cheatSheets={[
        {
          title: 'Arányok',
          items: [
            'Szakaszok (élek, sugarak, magasságok): k',
            'Kerület: k; terület, felszín: k²',
            'Térfogat (azonos anyagnál tömeg is): k³',
            'Kicsinyítésnél k < 1'
          ]
        },
        {
          title: 'Visszafelé',
          items: [
            'Felszínarányból: k = √(A′/A)',
            'Térfogatarányból: k = ∛(V′/V)',
            'V-arány 8 ⇒ k = 2 ⇒ A-arány 4',
            'V-arány 4 ⇒ k = ∛4 ≈ 1,587 ⇒ A-arány ≈ 2,52'
          ]
        },
        {
          title: 'Tankönyvi eredmények',
          items: [
            'n × n × n-es kocka: n³ kis kocka, felszín n²-szeres',
            'Betonkocka 126 cm, üreg 21 / 42 / 63 cm ⇒ 1/215, 1/26, 1/7',
            'Minyon ×3: élek 12, 9, 7,5 cm; A = 531 cm², V = 810 cm³',
            'Marcipán 22 mm → bonbon 30 mm: V-arány ≈ 2,54'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <SimilarSolidsMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <SimilarSolidsSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default SimilarSolidsQuiz;
