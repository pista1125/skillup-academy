import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Rotation4Matcher } from './Rotation4Matcher';
import { Rotation4Sorter } from './Rotation4Sorter';
import { rotQ } from './Rotation4Figures';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek (nem exportált)
// ---------------------------------------------------------------------------
const UNK = '#dc2626';
type Pt = [number, number];

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const T: React.FC<{ x: number; y: number; t: string; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end' }> = ({
  x,
  y,
  t,
  size = 12,
  color,
  anchor = 'middle'
}) => (
  <text x={x} y={y} fontSize={size} fontWeight="bold" textAnchor={anchor} fill={t.includes('?') ? UNK : color ?? '#0f172a'}>
    {t}
  </text>
);

const FLAG: Pt[] = [[0, 0], [0, -3], [2, -3], [2, -2], [1, -2], [1, 0]];
const mirror = (pts: Pt[]): Pt[] => pts.map(([x, y]) => [-x, y]);
const polyStr = (pts: Pt[], cx: number, cy: number, u: number) => pts.map(([x, y]) => `${cx + x * u},${cy + y * u}`).join(' ');

const FlagAt: React.FC<{ pts: Pt[]; cx: number; cy: number; u: number; fill?: string; stroke?: string; pin?: boolean }> = ({
  pts,
  cx,
  cy,
  u,
  fill = '#5eead4',
  stroke = '#0f766e',
  pin = true
}) => (
  <g>
    <polygon points={polyStr(pts, cx, cy, u)} fill={fill} stroke={stroke} strokeWidth="1.6" />
    {pin && <circle cx={cx} cy={cy} r="3" fill={UNK} />}
  </g>
);

/** Óralap: szaggatott mutató a 12-esen, teli mutató a „to” órán. */
const ClockFig: React.FC<{ to: number; label: string; label2?: string; from?: number }> = ({ to, label, label2, from = 12 }) => {
  const c: Pt = [120, 68];
  const ang = (h: number) => ((h % 12) * 30 - 90) * (Math.PI / 180);
  return (
    <QFig h={label2 ? 162 : 150}>
      <circle cx={c[0]} cy={c[1]} r="52" fill="#ffffff" stroke="#0f766e" strokeWidth="3" />
      {Array.from({ length: 12 }, (_, i) => {
        const h = i + 1;
        return (
          <text key={h} x={c[0] + 41 * Math.cos(ang(h))} y={c[1] + 41 * Math.sin(ang(h)) + 4} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155">
            {h}
          </text>
        );
      })}
      <line x1={c[0]} y1={c[1]} x2={c[0] + 32 * Math.cos(ang(from))} y2={c[1] + 32 * Math.sin(ang(from))} stroke="#94a3b8" strokeWidth="3" strokeDasharray="4 3" />
      <line x1={c[0]} y1={c[1]} x2={c[0] + 32 * Math.cos(ang(to))} y2={c[1] + 32 * Math.sin(ang(to))} stroke="#0f766e" strokeWidth="4" strokeLinecap="round" />
      <circle cx={c[0]} cy={c[1]} r="4" fill="#0f172a" />
      <T x={120} y={140} t={label} size={11} />
      {label2 && <T x={120} y={155} t={label2} size={11} />}
    </QFig>
  );
};

/** Nyíl: dir = 0 fel, 1 jobbra, 2 le, 3 balra. */
const ArrowFig: React.FC<{ dir: number; text: string }> = ({ dir, text }) => {
  const c: Pt = [70, 68];
  const pts: Pt[] = [[0, -36], [-14, -14], [-6, -14], [-6, 30], [6, 30], [6, -14], [14, -14]];
  const r = pts.map((p) => rotQ(p, dir));
  return (
    <QFig>
      <polygon points={r.map(([x, y]) => `${c[0] + x},${c[1] + y}`).join(' ')} fill="#5eead4" stroke="#0f766e" strokeWidth="2" />
      <circle cx={c[0]} cy={c[1]} r="3.5" fill={UNK} />
      {text.length > 14 ? (
        <>
          <T x={172} y={52} t={text.slice(0, text.lastIndexOf(' '))} size={11} color="#0f766e" />
          <T x={172} y={68} t={text.slice(text.lastIndexOf(' ') + 1)} size={11} color="#0f766e" />
        </>
      ) : (
        <T x={172} y={60} t={text} size={11} color="#0f766e" />
      )}
      <T x={172} y={92} t="Merre mutat?" size={11} />
    </QFig>
  );
};

// --- Ábrák ---
const FIG_CLOCK_3 = <ClockFig to={3} label="A nagymutató: 12 → 3." label2="Mekkora fordulat?" />;
const FIG_CLOCK_6 = <ClockFig to={6} label="A nagymutató: 12 → 6." label2="Mekkora fordulat?" />;
const FIG_CLOCK_45 = <ClockFig to={9} label="45 perc alatt: ? fordulat" />;

const FIG_ARROW_UP_Q1 = <ArrowFig dir={0} text="negyed fordulat jobbra" />;
const FIG_ARROW_UP_HALF = <ArrowFig dir={0} text="fél fordulat" />;
const FIG_ARROW_RIGHT_Q1L = <ArrowFig dir={1} text="negyed fordulat balra" />;
const FIG_ARROW_UP_3Q = <ArrowFig dir={0} text="3 negyed fordulat jobbra" />;

const FIG_WHICH_ROTATED = (
  <QFig h={165}>
    <FlagAt pts={FLAG} cx={120} cy={50} u={7} fill="#93c5fd" stroke="#1d4ed8" />
    <T x={150} y={40} t="eredeti" size={10} anchor="start" />
    <FlagAt pts={FLAG.map((p) => rotQ(p, 1))} cx={22} cy={110} u={7} />
    <FlagAt pts={FLAG} cx={95} cy={125} u={7} pin={false} />
    <FlagAt pts={mirror(FLAG)} cx={155} cy={125} u={7} />
    <FlagAt pts={FLAG} cx={200} cy={135} u={11} />
    <T x={35} y={155} t="A" size={11} />
    <T x={100} y={155} t="B" size={11} />
    <T x={150} y={155} t="C" size={11} />
    <T x={210} y={155} t="D" size={11} />
  </QFig>
);

const FIG_ROT_OPTIONS = (
  <QFig h={165}>
    <FlagAt pts={FLAG} cx={120} cy={50} u={7} fill="#93c5fd" stroke="#1d4ed8" />
    <T x={150} y={40} t="eredeti" size={10} anchor="start" />
    <FlagAt pts={FLAG.map((p) => rotQ(p, 3))} cx={48} cy={120} u={7} />
    <FlagAt pts={FLAG.map((p) => rotQ(p, 2))} cx={95} cy={98} u={7} />
    <FlagAt pts={FLAG.map((p) => rotQ(p, 1))} cx={140} cy={115} u={7} />
    <FlagAt pts={mirror(FLAG)} cx={210} cy={125} u={7} />
    <T x={35} y={155} t="A" size={11} />
    <T x={90} y={155} t="B" size={11} />
    <T x={155} y={155} t="C" size={11} />
    <T x={205} y={155} t="D" size={11} />
    <T x={60} y={30} t="negyed jobbra: ?" size={11} />
  </QFig>
);

const FIG_BUILDING = (
  <QFig>
    {[[0, 0], [0, -1], [0, -2], [1, 0], [2, 0]].map(([c, r], i) => (
      <g key={i}>
        <rect x={60 + c * 16} y={90 + r * 16} width={16} height={16} fill="#22c55e" stroke="#14532d" />
        <circle cx={68 + c * 16} cy={98 + r * 16} r="2.5" fill="#ffffff" />
      </g>
    ))}
    <circle cx={68} cy={50} r={9} fill="#facc15" stroke="#a16207" />
    <circle cx={116} cy={98} r={9} fill="#facc15" stroke="#a16207" />
    <T x={185} y={60} t="negyed fordulat" size={11} color="#0f766e" />
    <T x={185} y={76} t="jobbra" size={11} color="#0f766e" />
    <T x={185} y={104} t="Milyen szögben?" size={11} />
  </QFig>
);

const FIG_TEMPLATE = (
  <QFig>
    <ellipse cx="60" cy="62" rx="12" ry="36" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
    <circle cx="60" cy="96" r="4" fill={UNK} />
    <T x={60} y={124} t="sablon + gombostű" size={10} />
    <T x={170} y={60} t="mindig negyed" size={11} color="#0f766e" />
    <T x={170} y={76} t="fordulattal" size={11} color="#0f766e" />
    <T x={170} y={102} t="Hány rajz?" size={11} />
  </QFig>
);

const FIG_GRID_CELL = (() => {
  const u = 18;
  const o: Pt = [120, 75];
  const cell = (dx: number, dy: number, fill: string, label?: string) => (
    <g>
      <rect x={o[0] + dx * u} y={o[1] + dy * u} width={u} height={u} fill={fill} stroke="#475569" />
      {label && <T x={o[0] + dx * u + u / 2} y={o[1] + dy * u + u / 2 + 4} t={label} size={11} color="#4c1d95" />}
    </g>
  );
  return (
    <QFig>
      {Array.from({ length: 13 }, (_, i) => (
        <g key={i}>
          <line x1={o[0] + (i - 6) * u} y1={o[1] - 4 * u} x2={o[0] + (i - 6) * u} y2={o[1] + 3.6 * u} stroke="#e2e8f0" />
        </g>
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <line key={`h${i}`} x1={o[0] - 6 * u} y1={o[1] + (i - 4) * u} x2={o[0] + 6 * u} y2={o[1] + (i - 4) * u} stroke="#e2e8f0" />
      ))}
      {cell(2, -1, '#5eead4')}
      {cell(0, 2, '#ede9fe', 'A')}
      {cell(-1, -3, '#ede9fe', 'B')}
      {cell(-3, 0, '#ede9fe', 'C')}
      {cell(2, 0, '#ede9fe', 'D')}
      <circle cx={o[0]} cy={o[1]} r="4.5" fill={UNK} />
      <T x={o[0] - 8} y={o[1] - 6} t="O" size={11} color={UNK} anchor="end" />
      <T x={120} y={142} t="Negyed jobbra az O körül: ?" size={11} />
    </QFig>
  );
})();

const FIG_RECT_ROT = (
  <QFig h={130}>
    {Array.from({ length: 4 }, (_, c) =>
      Array.from({ length: 2 }, (_, r) => <rect key={`${c}${r}`} x={30 + c * 16} y={45 + r * 16} width={16} height={16} fill="#5eead4" stroke="#0f766e" />)
    )}
    <T x={62} y={38} t="4 széles, 2 magas" size={10} />
    <T x={175} y={60} t="negyed fordulat" size={11} color="#0f766e" />
    <T x={175} y={80} t="után: ?" size={11} />
  </QFig>
);

const FIG_TRIANGLE_PIN = (
  <QFig h={150}>
    <polygon points="40,20 40,75 85,75" fill="#818cf8" stroke="#3730a3" strokeWidth="1.5" />
    <path d="M40 63 A 12 12 0 0 1 52 75" fill="none" stroke="#0f172a" strokeWidth="1.5" />
    <circle cx="44.7" cy="70.3" r="1.8" fill="#0f172a" />
    <circle cx="85" cy="75" r="4" fill={UNK} />
    <line x1="85" y1="75" x2="110" y2="120" stroke="#0f172a" strokeDasharray="4 3" />
    <line x1="110" y1="120" x2="155" y2="95" stroke="#0f172a" strokeDasharray="4 3" />
    <circle cx="110" cy="120" r="4" fill={UNK} />
    <T x={108} y={140} t="tű" size={11} />
    <T x={163} y={99} t="X" size={13} />
    <T x={190} y={40} t="Mi igaz?" size={11} />
  </QFig>
);

const ROTATION4_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'ro-q1',
    level: 1,
    questionTypeBadge: 'Fogalmak',
    question: 'Mi a közös a körhintában, a pörgettyűben, a földgömbben és a játszótéri forgóban?',
    options: ['Mindegyik forog.', 'Mindegyik nagyít.', 'Mindegyik a tükörképét mutatja.', 'Mindegyik egyenes vonalban halad.'],
    correctAnswer: 0,
    explanation: 'Mindegyik egy pont (egy tengely) körül forog. Ez az elforgatás a mindennapokban.'
  },
  {
    id: 'ro-q2',
    level: 1,
    questionTypeBadge: 'Fordulatok',
    question: 'Hány negyed fordulat egy fél fordulat?',
    options: ['2', '4', '1', '3'],
    correctAnswer: 0,
    explanation: 'Két negyed együtt egy fél: 2 negyed fordulat = 1 fél fordulat.'
  },
  {
    id: 'ro-q3',
    level: 1,
    questionTypeBadge: 'Fordulatok',
    question: 'Hány negyed fordulat egy egész fordulat?',
    options: ['4', '2', '3', '8'],
    correctAnswer: 0,
    explanation: 'Egy egész fordulat alatt az alakzat egyszer körbeér: ez 4 negyed fordulat.'
  },
  {
    id: 'ro-q4',
    level: 1,
    questionTypeBadge: 'Szög',
    question: 'Negyed fordulat után milyen szögben áll az alakzat az eredetihez képest?',
    options: ['derékszögben', 'két derékszögben', 'egyáltalán nem fordult el', 'a derékszög felében'],
    correctAnswer: 0,
    explanation: 'Egy negyed fordulat éppen egy derékszögnyi forgatás – mint a téglalap sarka.'
  },
  {
    id: 'ro-q5',
    level: 1,
    questionTypeBadge: 'Irány',
    question: 'Mit jelent az, hogy negyed fordulattal „jobbra” forgatunk?',
    options: [
      'Az óramutató járásával megegyező irányban forgatunk.',
      'Az óramutató járásával ellentétes irányban forgatunk.',
      'Jobbra toljuk el az alakzatot.',
      'Jobb kézzel forgatunk.'
    ],
    correctAnswer: 0,
    explanation: 'Jobbra forgatás: úgy fordul, ahogy az óra mutatói haladnak. Balra: az ellenkező irányba.'
  },
  {
    id: 'ro-q6',
    level: 1,
    questionTypeBadge: 'Fogalmak',
    question: 'Elforgattuk a háromszöget a gombostű körül. Mi változott meg?',
    options: ['Csak az, hogy merre néz.', 'A mérete.', 'A formája.', 'A mérete és a formája is.'],
    correctAnswer: 0,
    explanation: 'Elforgatáskor a síkidom mérete és formája nem változik, csak elfordul – másfelé néz.'
  },
  {
    id: 'ro-q7',
    level: 1,
    questionTypeBadge: 'Óra',
    figure: FIG_CLOCK_3,
    question: 'Az óra nagymutatója a 12-esről a 3-asra fordult. Mekkora fordulatot tett?',
    options: ['negyed fordulatot', 'fél fordulatot', 'háromnegyed fordulatot', 'egész fordulatot'],
    correctAnswer: 0,
    explanation: 'A 12-estől a 3-asig az óralap negyede van: negyed fordulat (15 perc).'
  },
  {
    id: 'ro-q8',
    level: 1,
    questionTypeBadge: 'Óra',
    figure: FIG_CLOCK_6,
    question: 'Az óra nagymutatója a 12-esről a 6-osra fordult. Mekkora fordulatot tett?',
    options: ['fél fordulatot', 'negyed fordulatot', 'háromnegyed fordulatot', 'egész fordulatot'],
    correctAnswer: 0,
    explanation: 'A 12-estől a 6-osig az óralap fele van: fél fordulat (30 perc).'
  },
  {
    id: 'ro-q9',
    level: 1,
    questionTypeBadge: 'Nyíl forgatása',
    figure: FIG_ARROW_UP_Q1,
    question: 'A felfelé mutató nyilat negyed fordulattal jobbra forgatjuk a piros pont körül. Merre mutat utána?',
    options: ['jobbra', 'balra', 'lefelé', 'felfelé'],
    correctAnswer: 0,
    explanation: 'Jobbra forgatás = az óramutató irányába. A 12-es felől a 3-as felé fordul: a nyíl jobbra mutat.'
  },
  {
    id: 'ro-q10',
    level: 1,
    questionTypeBadge: 'Felismerés',
    figure: FIG_WHICH_ROTATED,
    question: 'Melyik rajzon forgattuk el a kék zászlót (és nem toltuk el, tükröztük vagy nagyítottuk)?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'Az A zászló elfordult a piros pont körül (jobbra mutat). A B ugyanúgy áll, csak arrébb van (eltolás), a C tükörkép, a D nagyobb lett.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'ro-q11',
    level: 2,
    questionTypeBadge: 'Nyíl forgatása',
    figure: FIG_ARROW_UP_HALF,
    question: 'A felfelé mutató nyilat fél fordulattal elforgatjuk. Merre mutat utána?',
    options: ['lefelé', 'jobbra', 'balra', 'felfelé'],
    correctAnswer: 0,
    explanation: 'Fél fordulat = 2 negyed. Fel → jobbra → le. A nyíl lefelé mutat.'
  },
  {
    id: 'ro-q12',
    level: 2,
    questionTypeBadge: 'Nyíl forgatása',
    figure: FIG_ARROW_RIGHT_Q1L,
    question: 'A jobbra mutató nyilat negyed fordulattal balra forgatjuk. Merre mutat utána?',
    options: ['felfelé', 'lefelé', 'balra', 'jobbra'],
    correctAnswer: 0,
    explanation: 'Balra forgatás = az óramutatóval ellentétesen. A 3-as felől a 12-es felé fordul: felfelé mutat.'
  },
  {
    id: 'ro-q13',
    level: 2,
    questionTypeBadge: 'Felismerés',
    figure: FIG_ROT_OPTIONS,
    question: 'Melyik rajz a kék zászló negyed fordulattal JOBBRA elforgatott képe a piros pont körül?',
    options: ['C', 'A', 'B', 'D'],
    correctAnswer: 0,
    explanation: 'Jobbra forgatva a felfelé álló rúd jobbra fordul, a zászló lefelé kerül: ez a C. Az A balra forgatás, a B fél fordulat, a D tükörkép.'
  },
  {
    id: 'ro-q14',
    level: 2,
    questionTypeBadge: 'Óra',
    question: 'A nagymutató a 12-esen áll. Negyed fordulattal jobbra fordul, majd még egy negyed fordulattal jobbra. Hová mutat?',
    options: ['a 6-osra', 'a 3-asra', 'a 9-esre', 'a 12-esre'],
    correctAnswer: 0,
    explanation: 'Első negyed: 12 → 3. Második negyed: 3 → 6. Két negyed = fél fordulat.'
  },
  {
    id: 'ro-q15',
    level: 2,
    questionTypeBadge: 'Irány',
    question: 'A háromnegyed fordulat jobbra ugyanoda viszi az alakzatot, mint…',
    options: ['a negyed fordulat balra.', 'a negyed fordulat jobbra.', 'a fél fordulat.', 'az egész fordulat.'],
    correctAnswer: 0,
    explanation: 'Jobbra 3 negyed után már csak 1 negyed hiányzik a teljes körhöz. Ezért ugyanoda jutunk, mintha 1 negyedet balra forgattunk volna.'
  },
  {
    id: 'ro-q16',
    level: 2,
    questionTypeBadge: 'Fordulatok',
    question: 'Egy alakzatot mindig negyed fordulattal jobbra forgatunk. Hányadik forgatás után áll először újra úgy, mint az elején?',
    options: ['a 4. után', 'a 2. után', 'a 3. után', 'az 5. után'],
    correctAnswer: 0,
    explanation: '4 negyed fordulat = 1 egész fordulat. Ekkor ér körbe, és újra úgy áll, mint az elején.'
  },
  {
    id: 'ro-q17',
    level: 2,
    questionTypeBadge: 'Logikai lapok',
    figure: FIG_BUILDING,
    question: 'A logikai lapokból épített építményt negyed fordulattal jobbra forgatjuk. Milyen szögben áll az eredetihez képest?',
    options: ['derékszögben', 'két derékszögben (fél fordulat)', 'ugyanúgy áll', 'háromnegyed fordulatnyira'],
    correctAnswer: 0,
    explanation: 'Negyed fordulat = 1 derékszög. Ami felfelé állt, az most jobbra áll.'
  },
  {
    id: 'ro-q18',
    level: 2,
    questionTypeBadge: 'Gombostű',
    question: 'A sablont a gombostű körül forgatjuk. Mi történik közben a gombostű helyével?',
    options: ['Nem mozdul el.', 'Mozog a legtöbbet.', 'Körbe megy a sablon körül.', 'Egyenesen arrébb csúszik.'],
    correctAnswer: 0,
    explanation: 'A gombostű helye a forgatás középpontja: végig ugyanott marad, körülötte fordul minden más.'
  },
  {
    id: 'ro-q19',
    level: 2,
    questionTypeBadge: 'Sablon',
    figure: FIG_TEMPLATE,
    question: 'A sablont mindig negyed fordulattal forgatod a gombostű körül, és körberajzolod. Hány különböző rajz lesz egy egész fordulat alatt?',
    options: ['4', '5', '3', '8'],
    correctAnswer: 0,
    explanation: 'Negyed, fél, háromnegyed, és az eredeti helyzet: 4 különböző rajz. Az 5. forgatás már az elsőre rajzol rá.'
  },
  {
    id: 'ro-q20',
    level: 2,
    questionTypeBadge: 'Alakzatok',
    question: 'Melyik alakzat néz ki ugyanúgy, ha a közepe körül negyed fordulattal elforgatjuk?',
    options: ['a négyzet', 'a téglalap, ha nem négyzet', 'az L alakú alakzat', 'a zászló'],
    correctAnswer: 0,
    explanation: 'A négyzet minden oldala egyforma, ezért negyed fordulat után ugyanúgy néz ki. A hosszúkás téglalap negyed fordulat után „állni” fog.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'ro-q21',
    level: 3,
    questionTypeBadge: 'Több forgatás',
    question: 'Egy alakzatot 2 negyed fordulattal jobbra, majd 1 negyed fordulattal balra forgatunk. Összesen mennyit fordult?',
    options: ['negyed fordulatot jobbra', 'háromnegyed fordulatot jobbra', 'negyed fordulatot balra', 'fél fordulatot'],
    correctAnswer: 0,
    explanation: '2 negyed jobbra, ebből 1 negyedet visszafordítunk balra: marad 1 negyed jobbra.'
  },
  {
    id: 'ro-q22',
    level: 3,
    questionTypeBadge: 'Nyíl forgatása',
    figure: FIG_ARROW_UP_3Q,
    question: 'A felfelé mutató nyilat 3 negyed fordulattal jobbra forgatjuk. Merre mutat utána?',
    options: ['balra', 'jobbra', 'lefelé', 'felfelé'],
    correctAnswer: 0,
    explanation: 'Fel → jobbra → le → balra. Három negyed fordulat után balra mutat (mintha 1 negyedet balra forgattunk volna).'
  },
  {
    id: 'ro-q23',
    level: 3,
    questionTypeBadge: 'Óra',
    figure: FIG_CLOCK_45,
    question: 'Mekkora fordulatot tesz az óra nagymutatója 45 perc alatt?',
    options: ['háromnegyed fordulatot', 'fél fordulatot', 'negyed fordulatot', 'egész fordulatot'],
    correctAnswer: 0,
    explanation: '15 perc = negyed fordulat. 45 perc = 3 · 15 perc = 3 negyed, vagyis háromnegyed fordulat.'
  },
  {
    id: 'ro-q24',
    level: 3,
    questionTypeBadge: 'Óra',
    question: 'Hány perc alatt tesz az óra nagymutatója fél fordulatot?',
    options: ['30 perc', '15 perc', '45 perc', '60 perc'],
    correctAnswer: 0,
    explanation: 'Egy egész fordulat 60 perc. A fele: 60 : 2 = 30 perc.'
  },
  {
    id: 'ro-q25',
    level: 3,
    questionTypeBadge: 'Négyzetháló',
    figure: FIG_GRID_CELL,
    question: 'A türkiz négyzetet az O pont körül negyed fordulattal jobbra forgatjuk. Melyik helyre kerül?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'Jobbra forgatáskor ami jobbra volt az O-tól, az lefelé kerül. A négyzet 2-vel jobbra és kicsit fent volt, így 2-vel lent, kicsit jobbra lesz: ez az A.'
  },
  {
    id: 'ro-q26',
    level: 3,
    questionTypeBadge: 'Fél fordulat',
    question: 'Egy pont 3 négyzetre van az O ponttól keletre (jobbra). Hová kerül, ha az O körül fél fordulattal elforgatjuk?',
    options: ['3 négyzetre nyugatra (balra)', '3 négyzetre délre (lefelé)', '6 négyzetre keletre', 'ugyanoda'],
    correctAnswer: 0,
    explanation: 'Fél fordulatnál a pont az O másik oldalára kerül, ugyanolyan messze: 3 négyzetre nyugatra.'
  },
  {
    id: 'ro-q27',
    level: 3,
    questionTypeBadge: 'Téglalap',
    figure: FIG_RECT_ROT,
    question: 'Egy 4 négyzet széles és 2 négyzet magas téglalapot negyed fordulattal elforgatunk. Milyen lesz?',
    options: ['2 széles és 4 magas', '4 széles és 2 magas', '8 széles és 4 magas', '2 széles és 2 magas'],
    correctAnswer: 0,
    explanation: 'Negyed fordulatnál a fekvő téglalap „feláll”: a szélessége és a magassága helyet cserél. Mérete nem változik.'
  },
  {
    id: 'ro-q28',
    level: 3,
    questionTypeBadge: 'Másolópapír',
    figure: FIG_TRIANGLE_PIN,
    question: 'A háromszöget másolópapírra rajzoltuk, és a tű körül elforgattuk, hogy a piros csúcs az X pontba kerüljön. Melyik állítás igaz?',
    options: [
      'Az elforgatott háromszög oldalai ugyanolyan hosszúak, mint az eredetié.',
      'Az elforgatott háromszög nagyobb lett.',
      'Az elforgatott háromszögnek már nincs derékszöge.',
      'A tű is az X pontba került.'
    ],
    correctAnswer: 0,
    explanation: 'Elforgatáskor a méret és a forma nem változik: az oldalak és a derékszög is megmaradnak. A tű a helyén marad.'
  },
  {
    id: 'ro-q29',
    level: 3,
    questionTypeBadge: 'Betűk',
    question: 'Melyik nagybetű néz ki ugyanúgy, ha fél fordulattal elforgatjuk (fejjel lefelé fordítjuk a lapon)?',
    options: ['N', 'A', 'T', 'E'],
    correctAnswer: 0,
    explanation: 'Az N fél fordulat után is N. Az A és a T fejjel lefelé áll, az E pedig balra néz – azok megváltoznak.'
  },
  {
    id: 'ro-q30',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A körhinta 1 perc alatt 2 egész fordulatot tesz. Hány negyed fordulatot tesz 3 perc alatt?',
    options: ['24', '6', '12', '18'],
    correctAnswer: 0,
    explanation: '3 perc alatt 3 · 2 = 6 egész fordulat. Egy egész fordulat 4 negyed: 6 · 4 = 24 negyed fordulat.'
  }
];

export const Rotation4Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="sikidomok-testek"
      topicId="g4-geom-elforgatas-quiz"
      subtopicId="elforgatas"
      title="7. Elforgatás – Kvíz"
      subtitle="30 feladat 3 szinten: negyed, fél és egész fordulat, forgatás jobbra és balra, elforgatás a tű körül."
      badge="4. OSZTÁLY • V. SÍKIDOMOK ÉS TESTEK • KVÍZ"
      questions={ROTATION4_QUESTIONS}
      cheatSheets={[
        {
          title: 'Fordulatok',
          items: [
            'negyed fordulat = 1 derékszög (15 perc a nagymutatónak)',
            'fél fordulat = 2 negyed (30 perc)',
            'háromnegyed fordulat = 3 negyed (45 perc)',
            'egész fordulat = 4 negyed (60 perc), visszaér'
          ]
        },
        {
          title: 'Jobbra, balra',
          items: [
            'Jobbra: az óramutató járásával megegyezően.',
            'Balra: az óramutató járásával ellentétesen.',
            'Felfelé mutató nyíl negyed jobbra → jobbra mutat.',
            '3 negyed jobbra = 1 negyed balra.'
          ]
        },
        {
          title: 'Mi változik?',
          items: [
            'A méret és a forma nem változik.',
            'A tű helye (a középpont) nem mozdul el.',
            'Csak az változik, merre néz az alakzat.',
            'Eltolás: ugyanúgy áll; tükrözés: tükörkép; elforgatás: elfordul.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Rotation4Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Rotation4Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Rotation4Quiz;
