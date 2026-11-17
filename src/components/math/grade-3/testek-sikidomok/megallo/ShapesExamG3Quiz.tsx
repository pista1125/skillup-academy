import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ShapesExamG3Matcher } from './ShapesExamG3Matcher';
import { ShapesExamG3Sorter } from './ShapesExamG3Sorter';
import { Solid, SolidKind, FitBuilding, PlanGrid } from '../a-testek/SolidsG3Parts';
import { Box, NetGrid, CuboidNet, CUBE_NETS_OK, CUBE_NETS_BAD } from '../a-teglatest-es-a-kocka/CuboidG3Parts';
import { QFig, AxisLine, GridG, CellsG, Heart, Butterfly, Flag, BigArrow } from '../tukrozesek-szimmetria/SymmetryG3Parts';
import { INK, UNK, PlaneShape, PolyKind, Sticks } from './ShapesExamG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const SX = (i: number) => 30 + 60 * i;
const ABCD = ['A', 'B', 'C', 'D'];
const Labels: React.FC<{ y?: number }> = ({ y = 124 }) => (
  <g>
    {ABCD.map((t, i) => (
      <text key={t} x={SX(i)} y={y} textAnchor="middle" fontSize="15" fontWeight="bold" fill={INK}>
        {t}
      </text>
    ))}
  </g>
);

const OneSolid: React.FC<{ k: SolidKind; s?: number }> = ({ k, s = 84 }) => (
  <QFig h={130}>
    <Solid kind={k} cx={120} by={116} s={s} />
  </QFig>
);
const OneShape: React.FC<{ k: PolyKind; r?: number }> = ({ k, r = 50 }) => (
  <QFig h={130}>
    <PlaneShape kind={k} cx={120} cy={65} r={r} sw={2.6} />
  </QFig>
);
const FourShapes: React.FC<{ ks: PolyKind[] }> = ({ ks }) => (
  <QFig h={136}>
    {ks.map((k, i) => (
      <PlaneShape key={i} kind={k} cx={SX(i)} cy={62} r={25} />
    ))}
    <Labels />
  </QFig>
);
const SixShapes: React.FC<{ ks: PolyKind[] }> = ({ ks }) => (
  <QFig h={130}>
    {ks.map((k, i) => (
      <PlaneShape key={i} kind={k} cx={40 + 80 * (i % 3)} cy={i < 3 ? 35 : 95} r={24} />
    ))}
  </QFig>
);
const Building: React.FC<{ plan: number[][]; h?: number }> = ({ plan, h = 130 }) => (
  <QFig h={h}>
    <FitBuilding plan={plan} x={30} y={10} w={180} h={h - 20} maxU={34} />
  </QFig>
);
const Plan: React.FC<{ plan: (number | string)[][] }> = ({ plan }) => {
  const cell = 32;
  const w = plan[0].length * cell;
  const x = (240 - w) / 2;
  return (
    <QFig h={plan.length * cell + 50}>
      <text x="120" y="17" textAnchor="middle" fontSize="11" fill="#475569">hátul</text>
      <PlanGrid plan={plan} x={x} y={24} cell={cell} />
      <text x="120" y={plan.length * cell + 40} textAnchor="middle" fontSize="11" fill="#475569">elöl</text>
    </QFig>
  );
};
const DotGrid: React.FC<{ cols: number; rows: number; axisV?: number; axisH?: number; dots: { gx: number; gy: number; c: string; l?: string }[]; water?: boolean }> = ({
  cols,
  rows,
  axisV,
  axisH,
  dots,
  water
}) => {
  const s = 24;
  const x0 = (240 - cols * s) / 2;
  const y0 = 14;
  return (
    <QFig h={y0 + rows * s + 16}>
      {water && axisH !== undefined && <rect x={x0} y={y0 + axisH * s} width={cols * s} height={(rows - axisH) * s} fill="#e0f2fe" />}
      <GridG x={x0} y={y0} cols={cols} rows={rows} s={s} />
      {axisV !== undefined && <AxisLine x1={x0 + axisV * s} y1={y0 - 8} x2={x0 + axisV * s} y2={y0 + rows * s + 8} />}
      {axisH !== undefined && <AxisLine x1={x0 - 8} y1={y0 + axisH * s} x2={x0 + cols * s + 8} y2={y0 + axisH * s} />}
      {dots.map((d, i) => (
        <g key={i}>
          <circle cx={x0 + d.gx * s} cy={y0 + d.gy * s} r="6.5" fill={d.c} stroke={INK} strokeWidth="1.4" />
          {d.l && (
            <text x={x0 + d.gx * s + 9} y={y0 + d.gy * s + 5} fontSize="13" fontWeight="bold" fill={INK}>
              {d.l}
            </text>
          )}
        </g>
      ))}
    </QFig>
  );
};
const CellGrid: React.FC<{ cols: number; rows: number; axis: number; cells: [number, number, string][] }> = ({ cols, rows, axis, cells }) => {
  const s = 20;
  const x0 = (240 - cols * s) / 2;
  const y0 = 14;
  return (
    <QFig h={y0 + rows * s + 14}>
      <GridG x={x0} y={y0} cols={cols} rows={rows} s={s} />
      <CellsG x={x0} y={y0} s={s} cells={cells} />
      <AxisLine x1={x0 + axis * s} y1={y0 - 8} x2={x0 + axis * s} y2={y0 + rows * s + 8} />
    </QFig>
  );
};
const NumLine: React.FC<{ x1: number; y1: number; x2: number; y2: number; n: number; lx: number; ly: number }> = ({ x1, y1, x2, y2, n, lx, ly }) => (
  <g>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#334155" strokeWidth="2.4" strokeDasharray="6 4" />
    <circle cx={lx} cy={ly} r="10" fill="#fff" stroke="#334155" strokeWidth="1.6" />
    <text x={lx} y={ly + 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>{n}</text>
  </g>
);
type C2 = [number, number];
const L_SHAPE: C2[] = [
  [0, 0],
  [1, 0],
  [2, 0],
  [2, 1]
];
const mV = (cs: C2[]): C2[] => cs.map(([r, c]) => [r, 1 - c]);
const mH = (cs: C2[]): C2[] => cs.map(([r, c]) => [2 - r, c]);
const Tet: React.FC<{ x: number; y: number; cells: C2[]; s?: number }> = ({ x, y, cells, s = 14 }) => (
  <g>
    {cells.map(([r, c], i) => (
      <rect key={i} x={x + c * s} y={y + r * s} width={s} height={s} fill="#f97316" stroke="#7c2d12" strokeWidth="1.4" />
    ))}
  </g>
);
const FourNets: React.FC<{ nets: [number, number][][] }> = ({ nets }) => (
  <QFig h={150}>
    {nets.map((n, i) => (
      <NetGrid key={i} cells={n} x={8 + 58 * i} y={14} w={50} h={100} maxCell={14} fill="#dbeafe" sw={1.6} />
    ))}
    {ABCD.map((t, i) => (
      <text key={t} x={33 + 58 * i} y={138} textAnchor="middle" fontSize="15" fontWeight="bold" fill={INK}>
        {t}
      </text>
    ))}
  </QFig>
);

export const SHAPES_EXAM_G3_QUESTIONS: QuizQuestion[] = [
  // =====================================================================
  // 1. szint (30)
  // =====================================================================
  { id: 'shexg3-q1', level: 1, questionTypeBadge: 'Testek', figure: <OneSolid k="gomb" s={76} />, question: 'Mi ennek a testnek a neve?', options: ['gömb', 'kör', 'kocka', 'téglatest'], correctAnswer: 0, explanation: 'Ez gömb, mint a labda. A kör síkidom, lapos, a gömböt meg is foghatod.' },
  { id: 'shexg3-q2', level: 1, questionTypeBadge: 'Testek', figure: <OneSolid k="kocka" s={74} />, question: 'Mi ennek a testnek a neve?', options: ['kocka', 'négyzet', 'gömb', 'piramis alakú test'], correctAnswer: 0, explanation: 'Ez kocka. A négyzet síkidom: a kocka egy lapja négyzet alakú.' },
  { id: 'shexg3-q3', level: 1, questionTypeBadge: 'Testek', question: 'Melyik tárgy hasonlít a gömbre?', options: ['narancs', 'cipősdoboz', 'dobókocka', 'konzervdoboz'], correctAnswer: 0, explanation: 'A narancs gömbölyű, mint a gömb. A cipősdoboz téglatest, a dobókocka kocka.' },
  { id: 'shexg3-q4', level: 1, questionTypeBadge: 'Testek', figure: <OneSolid k="henger" s={80} />, question: 'Van görbe része ennek a testnek?', options: ['Igen, van görbe része.', 'Nem, csak lapok határolják.', 'Nem, csak csúcsai vannak.', 'Nem, mert van lapja.'], correctAnswer: 0, explanation: 'A konzervdoboz alakú testnek 2 kör alakú lapja és egy görbe része van. Ezért gurul.' },
  { id: 'shexg3-q5', level: 1, questionTypeBadge: 'Kis kockák', figure: <Building plan={[[3, 2, 1]]} />, question: 'Hány kis kockából áll ez a lépcső?', options: ['6', '3', '5', '7'], correctAnswer: 0, explanation: 'Balra 3, középen 2, jobbra 1 kocka áll egymáson. 3 + 2 + 1 = 6.' },
  { id: 'shexg3-q6', level: 1, questionTypeBadge: 'Téglatest', figure: <OneSolid k="teglatest" s={110} />, question: 'Milyen alakú lapok határolják ezt a téglatestet?', options: ['téglalap', 'kör', 'háromszög', 'ötszög'], correctAnswer: 0, explanation: 'A téglatestet 6 téglalap alakú lap határolja.' },
  { id: 'shexg3-q7', level: 1, questionTypeBadge: 'Kocka', figure: <OneSolid k="kocka" s={70} />, question: 'Hány lapja van a kockának?', options: ['6', '4', '8', '12'], correctAnswer: 0, explanation: 'Elöl, hátul, fent, lent, jobbra, balra: 6 lap. Mindegyik négyzet.' },
  {
    id: 'shexg3-q8',
    level: 1,
    questionTypeBadge: 'Kocka',
    figure: (
      <QFig h={130}>
        <Box l={1.8} h={0.8} d={0.8} x={4} y={20} w={56} hh={70} color="#f59e0b" />
        <Box l={0.8} h={1.8} d={0.8} x={64} y={10} w={52} hh={90} color="#f59e0b" />
        <Box l={1} h={1} d={1} x={124} y={22} w={52} hh={66} color="#3b82f6" />
        <Box l={1.6} h={1.2} d={0.6} x={182} y={20} w={54} hh={70} color="#f59e0b" />
        <Labels y={120} />
      </QFig>
    ),
    question: 'Melyik test a kocka?',
    options: ['C', 'A', 'B', 'D'],
    correctAnswer: 0,
    explanation: 'A C test minden lapja ugyanakkora négyzet. A többi téglatest, de nem kocka.'
  },
  {
    id: 'shexg3-q9',
    level: 1,
    questionTypeBadge: 'Testháló',
    figure: (
      <QFig h={130}>
        <NetGrid cells={CUBE_NETS_OK[0]} x={40} y={10} w={160} h={110} maxCell={30} fill="#dbeafe" />
      </QFig>
    ),
    question: 'Ebből a hálóból összehajtunk egy testet. Melyik lesz az?',
    options: ['kocka', 'gömb', 'konzervdoboz alakú test', 'tölcsér alakú test'],
    correctAnswer: 0,
    explanation: 'A hálóban 6 egyforma négyzet van. Összehajtva kocka lesz belőle.'
  },
  { id: 'shexg3-q10', level: 1, questionTypeBadge: 'Sokszögek', figure: <OneShape k="tri" />, question: 'Hány oldala van ennek a sokszögnek?', options: ['3', '4', '5', '2'], correctAnswer: 0, explanation: 'Ez háromszög: 3 oldala és 3 csúcsa van.' },
  { id: 'shexg3-q11', level: 1, questionTypeBadge: 'Sokszögek', figure: <OneShape k="house" />, question: 'Hány csúcsa van ennek a sokszögnek?', options: ['5', '4', '6', '3'], correctAnswer: 0, explanation: 'Számold körbe: fent 1, a tető két végén 2, lent 2. Összesen 5 csúcs: ez ötszög.' },
  { id: 'shexg3-q12', level: 1, questionTypeBadge: 'Síkidomok', figure: <FourShapes ks={['circle', 'triIso', 'square', 'hex']} />, question: 'Melyik síkidom nem sokszög?', options: ['A', 'B', 'C', 'D'], correctAnswer: 0, explanation: 'A kört görbe vonal határolja, ezért nem sokszög. A többit egyenes szakaszok határolják.' },
  { id: 'shexg3-q13', level: 1, questionTypeBadge: 'Sokszögek', figure: <OneShape k="trap" />, question: 'Ennek a sokszögnek 4 oldala van. Mi a neve?', options: ['négyszög', 'háromszög', 'ötszög', 'hatszög'], correctAnswer: 0, explanation: 'A 4 oldalú sokszög a négyszög.' },
  { id: 'shexg3-q14', level: 1, questionTypeBadge: 'Síkidomok', figure: <OneShape k="square" r={46} />, question: 'Mi ennek a síkidomnak a neve? Minden oldala egyforma.', options: ['négyzet', 'kör', 'háromszög', 'kocka'], correctAnswer: 0, explanation: 'Ez négyzet. A kocka test, ennek csak a lapja négyzet.' },
  { id: 'shexg3-q15', level: 1, questionTypeBadge: 'Sokszögek', figure: <OneShape k="hex" />, question: 'Hány oldala van ennek a sokszögnek?', options: ['6', '5', '8', '4'], correctAnswer: 0, explanation: 'Számold körbe: 6 oldala van. Ez hatszög.' },
  { id: 'shexg3-q16', level: 1, questionTypeBadge: 'Sokszögek', question: 'Mi határolja a sokszögeket?', options: ['csak egyenes szakaszok', 'csak görbe vonalak', 'egyenes és görbe vonalak is', 'csak egy görbe vonal'], correctAnswer: 0, explanation: 'A sokszögeket csak egyenes szakaszok határolják. Ha görbe vonal is van, az nem sokszög.' },
  {
    id: 'shexg3-q17',
    level: 1,
    questionTypeBadge: 'Szimmetria',
    figure: (
      <QFig h={136}>
        <Flag x={18} y={98} h={74} />
        <PlaneShape kind="tri" cx={SX(1)} cy={62} r={26} />
        <Butterfly cx={SX(2)} cy={62} s={0.5} />
        <polygon points="196,22 172,66 188,66 180,100 212,54 196,54" fill="#facc15" stroke="#a16207" strokeWidth="2" strokeLinejoin="round" />
        <Labels />
      </QFig>
    ),
    question: 'Melyik ábrának van tükörtengelye?',
    options: ['C', 'A', 'B', 'D'],
    correctAnswer: 0,
    explanation: 'A pillangót középen félbehajthatod: a két szárnya pontosan fedi egymást.'
  },
  {
    id: 'shexg3-q18',
    level: 1,
    questionTypeBadge: 'Tükörtengely',
    figure: (
      <QFig h={140}>
        <rect x="90" y="14" width="60" height="112" fill="#fde68a" stroke="#a16207" strokeWidth="2.4" />
      </QFig>
    ),
    question: 'Hány tükörtengelye van ennek a téglalapnak?',
    options: ['2', '4', '1', '0'],
    correctAnswer: 0,
    explanation: 'Félbehajthatod hosszában és keresztben is: 2 tükörtengely. Az átlói nem tükörtengelyek.'
  },
  { id: 'shexg3-q19', level: 1, questionTypeBadge: 'Négyzetrács', figure: <DotGrid cols={8} rows={3} axisV={4} dots={[{ gx: 2, gy: 1, c: '#ef4444' }]} />, question: 'A piros pont 2 kockányira van a tengelytől. Hány kockányira lesz a tükörképe a tengelytől?', options: ['2', '4', '1', '3'], correctAnswer: 0, explanation: 'A tükörkép ugyanannyira van a tengelytől, csak a másik oldalon: 2 kockányira.' },
  { id: 'shexg3-q20', level: 1, questionTypeBadge: 'Betűk', question: 'Melyik betűnek van függőleges tükörtengelye?', options: ['T', 'F', 'L', 'P'], correctAnswer: 0, explanation: 'A T betű bal és jobb fele egyforma. Az F, az L és a P két fele nem fedi egymást.' },
  {
    id: 'shexg3-q21',
    level: 1,
    questionTypeBadge: 'Félbehajtás',
    figure: (
      <QFig h={130}>
        <rect x="60" y="14" width="80" height="100" fill="#fff" stroke="#94a3b8" strokeWidth="2" />
        <path d="M 140 14 L 152 8 L 152 108 L 140 114 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
        <path d="M 140 20 L 104 62 L 120 62 L 96 98 L 136 98 L 136 112 L 140 112 Z" fill="#22c55e" stroke="#15803d" strokeWidth="2" strokeLinejoin="round" />
        <AxisLine x1={140} y1={10} x2={140} y2={120} />
        <text x="196" y="68" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>hajtás</text>
      </QFig>
    ),
    question: 'A hajtásnál ezt vágtuk ki. Mit kapsz, ha kinyitod?',
    options: ['egy egész fenyőfát', 'egy fél fenyőfát', 'két külön fenyőfát', 'egy négyzetet'],
    correctAnswer: 0,
    explanation: 'A hajtás vonala lesz a tükörtengely. Kinyitva a fél fa kiegészül: egész fenyőfa lesz.'
  },
  { id: 'shexg3-q22', level: 1, questionTypeBadge: 'Testek', figure: <OneSolid k="kup" s={70} />, question: 'Melyik a jó név erre a testre?', options: ['tölcsér alakú test', 'gömb', 'kocka', 'téglatest'], correctAnswer: 0, explanation: 'Olyan, mint egy fagyitölcsér: 1 kör alakú lapja és görbe része van, a teteje hegyes.' },
  { id: 'shexg3-q23', level: 1, questionTypeBadge: 'Testek', question: 'Melyik test gurul el, akárhogyan teszed le?', options: ['gömb', 'kocka', 'téglatest', 'piramis alakú test'], correctAnswer: 0, explanation: 'A gömbnek nincs lapja, ezért mindig elgurul. A kocka, a téglatest és a piramis alakú test megáll.' },
  { id: 'shexg3-q24', level: 1, questionTypeBadge: 'Test vagy síkidom', question: 'Melyik NEM test?', options: ['háromszög', 'kocka', 'gömb', 'téglatest'], correctAnswer: 0, explanation: 'A háromszög síkidom: lapos, csak lerajzolni lehet. A kocka, a gömb és a téglatest test.' },
  { id: 'shexg3-q25', level: 1, questionTypeBadge: 'Alaprajz', figure: <Plan plan={[[1, 2, 3]]} />, question: 'Ez egy építmény alaprajza. Hány kis kocka kell hozzá?', options: ['6', '3', '5', '4'], correctAnswer: 0, explanation: 'A szám mutatja, hány kocka áll ott egymáson. 1 + 2 + 3 = 6.' },
  {
    id: 'shexg3-q26',
    level: 1,
    questionTypeBadge: 'Téglatest',
    figure: (
      <QFig h={120}>
        <Box l={2} h={1} d={1} x={40} y={10} w={160} hh={100} color="#f59e0b" />
      </QFig>
    ),
    question: 'Hány lapja van ennek a téglatestnek?',
    options: ['6', '4', '8', '3'],
    correctAnswer: 0,
    explanation: 'A téglatestnek is 6 lapja van, mint a kockának. A szaggatott vonalak a hátul lévő, nem látható részeket mutatják.'
  },
  { id: 'shexg3-q27', level: 1, questionTypeBadge: 'Sokszögek', figure: <OneShape k="rect" />, question: 'Hány csúcsa van a téglalapnak?', options: ['4', '2', '3', '6'], correctAnswer: 0, explanation: 'A téglalap négyszög: 4 oldala és 4 csúcsa van.' },
  { id: 'shexg3-q28', level: 1, questionTypeBadge: 'Síkidomok', figure: <FourShapes ks={['oval', 'halfDisc', 'drop', 'triRight']} />, question: 'Melyik síkidom sokszög?', options: ['D', 'A', 'B', 'C'], correctAnswer: 0, explanation: 'A D háromszöget csak egyenes szakaszok határolják. A többinek görbe vonala is van.' },
  {
    id: 'shexg3-q29',
    level: 1,
    questionTypeBadge: 'Tükörtengely',
    figure: (
      <QFig h={120}>
        <rect x="80" y="20" width="80" height="80" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2.4" />
      </QFig>
    ),
    question: 'Hány tükörtengelye van a négyzetnek?',
    options: ['4', '2', '1', '6'],
    correctAnswer: 0,
    explanation: 'A négyzetnek 2 középvonala és 2 átlója is tükörtengely: összesen 4.'
  },
  {
    id: 'shexg3-q30',
    level: 1,
    questionTypeBadge: 'Tükörkép',
    figure: (
      <QFig h={120}>
        <BigArrow cx={68} cy={60} len={80} dir="left" />
        <AxisLine x1={120} y1={14} x2={120} y2={106} />
        <text x="172" y="72" textAnchor="middle" fontSize="34" fontWeight="bold" fill={UNK}>?</text>
      </QFig>
    ),
    question: 'Merre mutat a nyíl tükörképe?',
    options: ['jobbra', 'balra', 'felfelé', 'lefelé'],
    correctAnswer: 0,
    explanation: 'A tükörben a kép megfordul: a balra mutató nyíl tükörképe jobbra mutat.'
  },

  // =====================================================================
  // 2. szint (30)
  // =====================================================================
  { id: 'shexg3-q31', level: 2, questionTypeBadge: 'Testek', figure: <OneSolid k="sator" s={96} />, question: 'Milyen alakú lapjai vannak ennek a sátor alakú testnek?', options: ['2 háromszög és 3 téglalap', 'csak háromszög', 'csak téglalap', '2 kör és 1 téglalap'], correctAnswer: 0, explanation: 'Elöl és hátul 1-1 háromszög, a két oldala és az alja téglalap: 2 háromszög és 3 téglalap.' },
  { id: 'shexg3-q32', level: 2, questionTypeBadge: 'Testek', figure: <OneSolid k="piramis4" s={84} />, question: 'Hány lapja van ennek a piramis alakú testnek?', options: ['5', '4', '6', '8'], correctAnswer: 0, explanation: 'Alul 1 négyzet, oldalt 4 háromszög: 1 + 4 = 5 lap. A hátsó lapokat is számold!' },
  { id: 'shexg3-q33', level: 2, questionTypeBadge: 'Kis kockák', figure: <Building plan={[[3, 3], [2, 1]]} />, question: 'Hány kis kockából áll ez az építmény?', options: ['9', '8', '4', '7'], correctAnswer: 0, explanation: 'Hátul 3 + 3 = 6, elöl 2 + 1 = 3. Összesen 6 + 3 = 9. Az eltakart kockák is ott vannak!' },
  { id: 'shexg3-q34', level: 2, questionTypeBadge: 'Alaprajz', figure: <Plan plan={[[3, 1, 2], [2, 2, 1]]} />, question: 'Hány kis kocka kell ehhez az építményhez?', options: ['11', '6', '10', '12'], correctAnswer: 0, explanation: 'Hátul 3 + 1 + 2 = 6, elöl 2 + 2 + 1 = 5. 6 + 5 = 11. A 6 csak a négyzetek száma.' },
  { id: 'shexg3-q35', level: 2, questionTypeBadge: 'Testek', figure: <OneSolid k="henger" s={80} />, question: 'Hány lapja van a konzervdoboz alakú testnek?', options: ['2', '3', '1', '0'], correctAnswer: 0, explanation: 'Alul és felül 1-1 kör alakú lap. A görbe része nem lap. Tehát 2 lapja van.' },
  { id: 'shexg3-q36', level: 2, questionTypeBadge: 'Kocka', figure: <Building plan={[[2, 2], [2, 2]]} />, question: 'Ez a nagy kocka kis kockákból épült. Hány kis kocka van benne?', options: ['8', '4', '6', '12'], correctAnswer: 0, explanation: 'Egy rétegben 2 · 2 = 4 kocka van, és 2 réteg van. 4 + 4 = 8.' },
  { id: 'shexg3-q37', level: 2, questionTypeBadge: 'Téglatest', figure: <Building plan={[[1, 1, 1], [1, 1, 1]]} />, question: 'Hány kis kockából áll ez a téglatest?', options: ['6', '3', '5', '9'], correctAnswer: 0, explanation: 'Elöl 3 és hátul 3 kocka van. 3 + 3 = 6.' },
  {
    id: 'shexg3-q38',
    level: 2,
    questionTypeBadge: 'Téglatest',
    figure: (
      <QFig h={120}>
        <Box l={3} h={1.5} d={1} x={30} y={10} w={180} hh={100} color="#f59e0b" />
      </QFig>
    ),
    question: 'Ennek a téglatestnek hányféle méretű lapja van?',
    options: ['3', '6', '2', '1'],
    correctAnswer: 0,
    explanation: 'A szemközti lapok egyformák: eleje = hátulja, teteje = alja, a két oldala egyforma. Ez 3-féle lap.'
  },
  {
    id: 'shexg3-q39',
    level: 2,
    questionTypeBadge: 'Testháló',
    figure: <FourNets nets={[CUBE_NETS_BAD[1], CUBE_NETS_BAD[0], CUBE_NETS_OK[3], CUBE_NETS_BAD[4]]} />,
    question: 'Melyik hálóból hajtható össze kocka?',
    options: ['C', 'A', 'B', 'D'],
    correctAnswer: 0,
    explanation: 'A C hálóban egy 4 négyzetes sor van, felette és alatta 1-1 négyzet. Ez összehajtva kocka. A többinél a lapok egymásra kerülnek.'
  },
  { id: 'shexg3-q40', level: 2, questionTypeBadge: 'Sokszögek', figure: <OneShape k="hexL" r={52} />, question: 'Hány oldala van ennek a sokszögnek?', options: ['6', '4', '5', '8'], correctAnswer: 0, explanation: 'Számold körbe a sarkokat: 6 csúcsa és 6 oldala van. Ez is hatszög, csak nem szabályos.' },
  { id: 'shexg3-q41', level: 2, questionTypeBadge: 'Sokszögek', figure: <FourShapes ks={['quad', 'pent', 'triIso', 'hex']} />, question: 'Melyik az ötszög?', options: ['B', 'A', 'C', 'D'], correctAnswer: 0, explanation: 'A B sokszögnek 5 oldala és 5 csúcsa van: ez az ötszög.' },
  { id: 'shexg3-q42', level: 2, questionTypeBadge: 'Sokszögek', figure: <FourShapes ks={['kite', 'para', 'house', 'square']} />, question: 'Melyik NEM négyszög?', options: ['C', 'A', 'B', 'D'], correctAnswer: 0, explanation: 'A C sokszögnek 5 oldala van, ez ötszög. A többinek 4 oldala van.' },
  { id: 'shexg3-q43', level: 2, questionTypeBadge: 'Síkidomok', figure: <SixShapes ks={['circle', 'tri', 'oval', 'square', 'hex', 'house']} />, question: 'Hány sokszög van a képen?', options: ['4', '6', '2', '3'], correctAnswer: 0, explanation: 'A kör és az ovális nem sokszög. A háromszög, a négyzet, a hatszög és az ötszög igen: 4 sokszög.' },
  { id: 'shexg3-q44', level: 2, questionTypeBadge: 'Igaz vagy hamis', question: 'Melyik állítás igaz?', options: ['Minden négyzet téglalap.', 'Minden síkidom sokszög.', 'A kör sokszög.', 'A háromszögnek 4 csúcsa van.'], correctAnswer: 0, explanation: 'A négyzet olyan téglalap, aminek minden oldala egyforma. A kör síkidom, de nem sokszög.' },
  { id: 'shexg3-q45', level: 2, questionTypeBadge: 'Sokszögek', figure: <OneShape k="hept" r={56} />, question: 'Hány csúcsa van ennek a nyíl alakú sokszögnek?', options: ['7', '5', '6', '8'], correctAnswer: 0, explanation: 'Számold körbe: a nyíl hegye 1, a hegy két oldalán 2 + 2, hátul 2. Összesen 7 csúcs.' },
  {
    id: 'shexg3-q46',
    level: 2,
    questionTypeBadge: 'Tükörtengely',
    figure: <OneShape k="triEq" r={56} />,
    question: 'Ennek a háromszögnek minden oldala egyforma. Hány tükörtengelye van?',
    options: ['3', '1', '0', '6'],
    correctAnswer: 0,
    explanation: 'Mindegyik csúcsától a szemközti oldal közepéig húzhatsz egy tükörtengelyt: 3 tükörtengely.'
  },
  {
    id: 'shexg3-q47',
    level: 2,
    questionTypeBadge: 'Tükörkép',
    figure: (
      <DotGrid
        cols={6}
        rows={7}
        axisH={3}
        water
        dots={[
          { gx: 3, gy: 1, c: '#f59e0b' },
          { gx: 3, gy: 4, c: '#94a3b8', l: 'A' },
          { gx: 1, gy: 5, c: '#94a3b8', l: 'B' },
          { gx: 3, gy: 5, c: '#94a3b8', l: 'C' },
          { gx: 3, gy: 6, c: '#94a3b8', l: 'D' }
        ]}
      />
    ),
    question: 'A narancs pont a víz fölött van. Melyik szürke pont a tükörképe a vízben?',
    options: ['C', 'A', 'B', 'D'],
    correctAnswer: 0,
    explanation: 'A narancs pont 2 kockányira van a víz fölött. A tükörképe 2 kockányira van a víz alatt, pontosan alatta: ez a C.'
  },
  { id: 'shexg3-q48', level: 2, questionTypeBadge: 'Betűk', question: 'Melyik betűnek van vízszintes és függőleges tükörtengelye is?', options: ['X', 'A', 'B', 'T'], correctAnswer: 0, explanation: 'Az X betűt fent-lent és jobbra-balra is félbehajthatod. Az A-nak és a T-nek csak függőleges, a B-nek csak vízszintes tengelye van.' },
  {
    id: 'shexg3-q49',
    level: 2,
    questionTypeBadge: 'Négyzetrács',
    figure: (
      <CellGrid
        cols={8}
        rows={4}
        axis={4}
        cells={[
          [0, 3, '#3b82f6'],
          [1, 2, '#3b82f6'],
          [1, 3, '#3b82f6'],
          [2, 1, '#3b82f6'],
          [2, 2, '#3b82f6'],
          [3, 3, '#3b82f6'],
          [0, 4, '#3b82f6'],
          [1, 4, '#3b82f6'],
          [1, 5, '#3b82f6'],
          [3, 4, '#3b82f6']
        ]}
      />
    ),
    question: 'A jobb oldalon a tükörkép egy része már kész. Hány kockát kell még kiszínezni?',
    options: ['2', '4', '6', '1'],
    correctAnswer: 0,
    explanation: 'A bal oldalon 6 kék kocka van, a jobb oldalon csak 4. A 3. sorban még 2 kocka hiányzik. 6 − 4 = 2.'
  },
  {
    id: 'shexg3-q50',
    level: 2,
    questionTypeBadge: 'Tükörkép',
    figure: (
      <QFig h={168}>
        <Tet x={106} y={10} cells={L_SHAPE} />
        <AxisLine x1={14} y1={60} x2={226} y2={60} />
        <Tet x={SX(0) - 14} y={78} cells={L_SHAPE} />
        <Tet x={SX(1) - 14} y={78} cells={mV(L_SHAPE)} />
        <Tet x={SX(2) - 14} y={78} cells={mH(mV(L_SHAPE))} />
        <Tet x={SX(3) - 14} y={78} cells={mH(L_SHAPE)} />
        <Labels y={150} />
      </QFig>
    ),
    question: 'A piros vonal a tükörtengely. Melyik az alakzat tükörképe a vonal alatt?',
    options: ['D', 'A', 'B', 'C'],
    correctAnswer: 0,
    explanation: 'Vízszintes tengelynél a kép fejjel lefelé fordul: a láb felülre kerül, de jobbra marad. Ez a D. Az A csak eltolás.'
  },
  {
    id: 'shexg3-q51',
    level: 2,
    questionTypeBadge: 'Tükörtengely',
    figure: (
      <QFig h={130}>
        <PlaneShape kind="trap" cx={120} cy={65} r={62} />
        <NumLine x1={120} y1={18} x2={120} y2={112} n={1} lx={120} ly={120} />
        <NumLine x1={44} y1={65} x2={196} y2={65} n={2} lx={212} ly={65} />
      </QFig>
    ),
    question: 'Melyik vonal tükörtengelye ennek a négyszögnek?',
    options: ['csak az 1-es', 'csak a 2-es', 'mindkettő', 'egyik sem'],
    correctAnswer: 0,
    explanation: 'Az 1-es vonal két oldalán egyforma a négyszög. A 2-es vonal fölött keskeny, alatta széles rész van.'
  },
  { id: 'shexg3-q52', level: 2, questionTypeBadge: 'Testek', question: 'Melyik testnek van kör alakú lapja?', options: ['tölcsér alakú test', 'kocka', 'piramis alakú test', 'sátor alakú test'], correctAnswer: 0, explanation: 'A tölcsér alakú test alja kör. A kocka, a piramis és a sátor alakú test lapjai sokszögek.' },
  { id: 'shexg3-q53', level: 2, questionTypeBadge: 'Testek', question: 'Melyik testnek nincs egyetlen lapja sem?', options: ['gömb', 'tölcsér alakú test', 'konzervdoboz alakú test', 'tál alakú test'], correctAnswer: 0, explanation: 'A gömbnek csak görbe része van. A többinek legalább 1 kör alakú lapja van.' },
  { id: 'shexg3-q54', level: 2, questionTypeBadge: 'Kis kockák', figure: <Building plan={[[2, 2, 2], [2, 2, 2]]} />, question: 'Hány kis kockából áll ez a téglatest?', options: ['12', '6', '8', '10'], correctAnswer: 0, explanation: 'Egy rétegben 6 kocka van (3 elöl, 3 hátul), és 2 réteg van. 6 + 6 = 12.' },
  { id: 'shexg3-q55', level: 2, questionTypeBadge: 'Kockává egészítés', figure: <Building plan={[[1, 1], [1, 1]]} />, question: 'Ebből 2 kocka magas nagy kockát építesz. Hány kis kocka kell még?', options: ['4', '8', '2', '6'], correctAnswer: 0, explanation: 'Most 1 réteg van, 4 kockából. A második réteghez még 4 kocka kell. Akkor 8 kockából áll a nagy kocka.' },
  { id: 'shexg3-q56', level: 2, questionTypeBadge: 'Sokszögek', figure: <SixShapes ks={['square', 'triIso', 'trap', 'circle', 'kite', 'pent']} />, question: 'Hány négyszög van a képen?', options: ['3', '4', '2', '5'], correctAnswer: 0, explanation: 'Számold meg az oldalakat! A négyzetnek, a sárkány alakú síkidomnak és a lent szélesebb síkidomnak is 4 oldala van: 3 négyszög.' },
  {
    id: 'shexg3-q57',
    level: 2,
    questionTypeBadge: 'Síkidomok',
    figure: (
      <QFig h={120}>
        <rect x="40" y="20" width="160" height="80" fill="#fde68a" stroke="#a16207" strokeWidth="2.4" />
        <line x1="40" y1="100" x2="200" y2="20" stroke="#b91c1c" strokeWidth="3" />
      </QFig>
    ),
    question: 'A téglalapot elvágtuk a piros vonal mentén. Milyen síkidomokat kaptunk?',
    options: ['2 háromszöget', '2 téglalapot', '2 négyzetet', '4 háromszöget'],
    correctAnswer: 0,
    explanation: 'A vágás az egyik csúcstól a szemközti csúcsig megy. Mindkét darabnak 3 oldala van: 2 háromszög.'
  },
  { id: 'shexg3-q58', level: 2, questionTypeBadge: 'Négyzetrács', figure: <DotGrid cols={10} rows={3} axisV={5} dots={[{ gx: 1, gy: 1, c: '#ef4444' }]} />, question: 'Hol lesz a piros pont tükörképe?', options: ['jobbra, 4 kockányira a tengelytől', 'balra, 4 kockányira a tengelytől', 'jobbra, 8 kockányira a tengelytől', 'jobbra, 2 kockányira a tengelytől'], correctAnswer: 0, explanation: 'A pont balra, 4 kockányira van a tengelytől. A tükörképe a másik oldalon, szintén 4 kockányira van.' },
  {
    id: 'shexg3-q59',
    level: 2,
    questionTypeBadge: 'Tükörtengely',
    figure: (
      <QFig h={136}>
        <PlaneShape kind="square" cx={SX(0)} cy={62} r={25} />
        <Heart cx={SX(1)} cy={62} s={0.62} />
        <PlaneShape kind="rect" cx={SX(2)} cy={62} r={26} />
        <PlaneShape kind="circle" cx={SX(3)} cy={62} r={27} />
        <Labels />
      </QFig>
    ),
    question: 'Melyiknek van pontosan 1 tükörtengelye?',
    options: ['B', 'A', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'A szívet csak középen, függőlegesen hajthatod félbe. A négyzetnek 4, a téglalapnak 2, a körnek akárhány tengelye van.'
  },
  {
    id: 'shexg3-q60',
    level: 2,
    questionTypeBadge: 'Testháló',
    figure: (
      <QFig h={130}>
        <CuboidNet l={2} d={1} h={1} x={20} y={10} w={200} hh={110} />
      </QFig>
    ),
    question: 'Ez egy test hálója. Melyik testé?',
    options: ['téglatest', 'kocka', 'sátor alakú test', 'piramis alakú test'],
    correctAnswer: 0,
    explanation: 'A hálóban 6 téglalap van, a szemköztiek egyformák, és nem mind négyzet. Ez téglatest hálója.'
  },

  // =====================================================================
  // 3. szint (30)
  // =====================================================================
  {
    id: 'shexg3-q61',
    level: 3,
    questionTypeBadge: 'Testek',
    figure: (
      <QFig h={120}>
        <Solid kind="kocka" cx={70} by={104} s={66} />
        <text x="120" y="70" textAnchor="middle" fontSize="22" fontWeight="bold" fill={INK}>és</text>
        <Solid kind="piramis4" cx={172} by={104} s={70} />
      </QFig>
    ),
    question: 'Hány lapja van összesen a kockának és a piramis alakú testnek?',
    options: ['11', '10', '9', '12'],
    correctAnswer: 0,
    explanation: 'A kockának 6, a piramis alakú testnek 5 lapja van (1 négyzet + 4 háromszög). 6 + 5 = 11.'
  },
  { id: 'shexg3-q62', level: 3, questionTypeBadge: 'Alaprajz', figure: <Plan plan={[[3, 3, 3], [2, 2, 2], [1, 1, 1]]} />, question: 'Hány kis kocka kell ehhez az építményhez?', options: ['18', '9', '15', '12'], correctAnswer: 0, explanation: 'Hátul 3 · 3 = 9, középen 3 · 2 = 6, elöl 3 · 1 = 3. 9 + 6 + 3 = 18.' },
  { id: 'shexg3-q63', level: 3, questionTypeBadge: 'Alaprajz', figure: <Plan plan={[[3, '?', 1], [2, 1, 1]]} />, question: 'Ez az építmény 10 kis kockából áll. Melyik szám kerül a ? helyére?', options: ['2', '3', '1', '10'], correctAnswer: 0, explanation: 'A többi szám összege: 3 + 1 + 2 + 1 + 1 = 8. 10 − 8 = 2.' },
  { id: 'shexg3-q64', level: 3, questionTypeBadge: 'Testek', figure: <OneSolid k="henger" s={72} />, question: 'Hány kör alakú lapja van összesen 3 ilyen konzervdoboz alakú testnek?', options: ['6', '3', '9', '4'], correctAnswer: 0, explanation: 'Egynek 2 kör alakú lapja van. 3 testnek 3 · 2 = 6.' },
  { id: 'shexg3-q65', level: 3, questionTypeBadge: 'Kocka', question: 'Két dobókockát teszel egymás mellé. Hány lapjuk van összesen?', options: ['12', '6', '10', '8'], correctAnswer: 0, explanation: 'Egy kockának 6 lapja van. 2 kockának 6 + 6 = 12. Az összeérő lapok is lapok maradnak.' },
  { id: 'shexg3-q66', level: 3, questionTypeBadge: 'Kockává egészítés', figure: <Building plan={[[2, 2, 2], [2, 2, 2], [2, 2, 2]]} h={140} />, question: 'Ebből 3 kocka magas nagy kockát építesz. Hány kis kocka kell még?', options: ['9', '27', '18', '3'], correctAnswer: 0, explanation: 'Egy rétegben 3 · 3 = 9 kocka van. Most 2 réteg van, még 1 réteg kell: 9 kocka.' },
  { id: 'shexg3-q67', level: 3, questionTypeBadge: 'Téglatest', figure: <Building plan={[[2, 2, 2, 2], [2, 2, 2, 2]]} />, question: 'Hány kis kockából áll ez a téglatest?', options: ['16', '8', '12', '10'], correctAnswer: 0, explanation: 'Egy rétegben 4 + 4 = 8 kocka van. 2 réteg: 8 + 8 = 16.' },
  {
    id: 'shexg3-q68',
    level: 3,
    questionTypeBadge: 'Testháló',
    figure: <FourNets nets={[CUBE_NETS_OK[1], CUBE_NETS_OK[6], CUBE_NETS_BAD[2], CUBE_NETS_OK[0]]} />,
    question: 'Melyik hálóból NEM hajtható össze kocka?',
    options: ['C', 'A', 'B', 'D'],
    correctAnswer: 0,
    explanation: 'A C hálóban 2 × 2-es négyzet van. Ezek hajtásnál egymásra esnek, így nem lesz meg a 6 különböző lap.'
  },
  { id: 'shexg3-q69', level: 3, questionTypeBadge: 'Kis kockák', figure: <Building plan={[[2, 2], [2, 2]]} />, question: 'Ez a kocka 8 kis kockából áll. Hány kis kocka kell egy kétszer ilyen magas téglatesthez?', options: ['16', '8', '12', '10'], correctAnswer: 0, explanation: 'Kétszer olyan magas: 2 réteg helyett 4 réteg. Egy réteg 4 kocka, 4 réteg 16 kocka. (8 + 8 = 16.)' },
  {
    id: 'shexg3-q70',
    level: 3,
    questionTypeBadge: 'Sokszögek',
    figure: (
      <QFig h={110}>
        <PlaneShape kind="triIso" cx={70} cy={55} r={44} />
        <text x="120" y="62" textAnchor="middle" fontSize="22" fontWeight="bold" fill={INK}>és</text>
        <PlaneShape kind="quad" cx={172} cy={55} r={42} />
      </QFig>
    ),
    question: 'Hány oldala van összesen a háromszögnek és a négyszögnek?',
    options: ['7', '6', '8', '12'],
    correctAnswer: 0,
    explanation: 'A háromszögnek 3, a négyszögnek 4 oldala van. 3 + 4 = 7.'
  },
  { id: 'shexg3-q71', level: 3, questionTypeBadge: 'Sokszögek', figure: <QFig h={110}><PlaneShape kind="pent" cx={70} cy={55} r={46} /><PlaneShape kind="house" cx={172} cy={55} r={44} /></QFig>, question: 'Hány csúcsa van összesen ennek a 2 ötszögnek?', options: ['10', '5', '8', '12'], correctAnswer: 0, explanation: 'Egy ötszögnek 5 csúcsa van. 5 + 5 = 10.' },
  {
    id: 'shexg3-q72',
    level: 3,
    questionTypeBadge: 'Pálcikák',
    figure: (
      <QFig h={110}>
        <Sticks segs={[[0, 0, 1, 0], [1, 0, 1, 1], [1, 1, 0, 1], [0, 1, 0, 0]]} x={40} y={22} s={64} />
        <Sticks segs={[[0, 1, 1, 1], [1, 1, 0.5, 0.13], [0.5, 0.13, 0, 1]]} x={140} y={22} s={64} color="#2563eb" />
      </QFig>
    ),
    question: 'Pálcikákból kiraktunk egy négyzetet és mellé egy háromszöget. Hány pálcika kellett?',
    options: ['7', '6', '8', '12'],
    correctAnswer: 0,
    explanation: 'A négyzethez 4, a háromszöghöz 3 pálcika kell. 4 + 3 = 7.'
  },
  {
    id: 'shexg3-q73',
    level: 3,
    questionTypeBadge: 'Pálcikák',
    figure: (
      <QFig h={110}>
        <Sticks segs={[[0, 0, 1, 0], [1, 0, 2, 0], [0, 1, 1, 1], [1, 1, 2, 1], [0, 0, 0, 1], [1, 0, 1, 1], [2, 0, 2, 1]]} x={56} y={22} s={64} />
      </QFig>
    ),
    question: 'Két négyzet egymás mellett, a középső pálcika közös. Hány pálcika van a képen?',
    options: ['7', '8', '6', '4'],
    correctAnswer: 0,
    explanation: 'Külön a két négyzethez 8 pálcika kellene, de a középső közös, ezért 8 − 1 = 7.'
  },
  {
    id: 'shexg3-q74',
    level: 3,
    questionTypeBadge: 'Síkidomok',
    figure: (
      <QFig h={130}>
        <polygon points="120,14 200,116 40,116" fill="#bbf7d0" stroke="#15803d" strokeWidth="2.6" strokeLinejoin="round" />
        <line x1="120" y1="14" x2="96" y2="116" stroke="#15803d" strokeWidth="2.6" />
      </QFig>
    ),
    question: 'Hány háromszöget látsz a képen? A nagyot is számold!',
    options: ['3', '2', '4', '1'],
    correctAnswer: 0,
    explanation: 'A vonal 2 kis háromszögre vágja a nagyot. 2 kicsi + 1 nagy = 3 háromszög.'
  },
  {
    id: 'shexg3-q75',
    level: 3,
    questionTypeBadge: 'Síkidomok',
    figure: (
      <QFig h={130}>
        <rect x="70" y="15" width="100" height="100" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2.6" />
        <line x1="120" y1="15" x2="120" y2="115" stroke="#1d4ed8" strokeWidth="2.6" />
        <line x1="70" y1="65" x2="170" y2="65" stroke="#1d4ed8" strokeWidth="2.6" />
      </QFig>
    ),
    question: 'Hány négyzetet látsz a képen? A nagyot is számold!',
    options: ['5', '4', '8', '9'],
    correctAnswer: 0,
    explanation: '4 kis négyzet van, és a 4 együtt egy nagy négyzet. 4 + 1 = 5.'
  },
  { id: 'shexg3-q76', level: 3, questionTypeBadge: 'Igaz vagy hamis', question: 'Melyik állítás HAMIS?', options: ['Minden síkidom sokszög.', 'A háromszög sokszög.', 'Minden négyzet téglalap.', 'A kör nem sokszög.'], correctAnswer: 0, explanation: 'Nem minden síkidom sokszög: a kört görbe vonal határolja. A másik három állítás igaz.' },
  { id: 'shexg3-q77', level: 3, questionTypeBadge: 'Sokszögek', question: 'Egy sokszögnek 2-vel több csúcsa van, mint egy háromszögnek. Mi a neve?', options: ['ötszög', 'négyszög', 'hatszög', 'háromszög'], correctAnswer: 0, explanation: 'A háromszögnek 3 csúcsa van. 3 + 2 = 5 csúcs: ez ötszög.' },
  {
    id: 'shexg3-q78',
    level: 3,
    questionTypeBadge: 'Kakukktojás',
    figure: <FourShapes ks={['square', 'rect', 'trap', 'pent']} />,
    question: 'Melyik a kakukktojás, és miért?',
    options: ['D, mert 5 oldala van', 'A, mert négyzet', 'B, mert a leghosszabb', 'C, mert ferdék az oldalai'],
    correctAnswer: 0,
    explanation: 'Az A, a B és a C négyszög, 4 oldaluk van. A D-nek 5 oldala van: ötszög.'
  },
  { id: 'shexg3-q79', level: 3, questionTypeBadge: 'Négyzetrács', figure: <DotGrid cols={8} rows={3} axisV={4} dots={[{ gx: 1, gy: 1, c: '#ef4444' }]} />, question: 'Milyen messze lesz a piros pont a saját tükörképétől?', options: ['6 kockányira', '3 kockányira', '4 kockányira', '8 kockányira'], correctAnswer: 0, explanation: 'A pont 3 kockányira van a tengelytől, a tükörképe is. 3 + 3 = 6.' },
  {
    id: 'shexg3-q80',
    level: 3,
    questionTypeBadge: 'Tükörtengely',
    figure: (
      <QFig h={120}>
        <PlaneShape kind="square" cx={66} cy={60} r={46} />
        <text x="120" y="68" textAnchor="middle" fontSize="22" fontWeight="bold" fill={INK}>és</text>
        <PlaneShape kind="triEq" cx={174} cy={58} r={50} />
      </QFig>
    ),
    question: 'A háromszög minden oldala egyforma. Hány tükörtengelye van összesen a két síkidomnak?',
    options: ['7', '5', '6', '8'],
    correctAnswer: 0,
    explanation: 'A négyzetnek 4, a háromszögnek 3 tükörtengelye van. 4 + 3 = 7.'
  },
  {
    id: 'shexg3-q81',
    level: 3,
    questionTypeBadge: 'Négyzetrács',
    figure: (
      <DotGrid
        cols={10}
        rows={3}
        axisV={5}
        dots={[
          { gx: 1, gy: 1, c: '#ef4444' },
          { gx: 6, gy: 1, c: '#3b82f6' }
        ]}
      />
    ),
    question: 'Hány kockát lépjen jobbra a kék pont, hogy a piros pont tükörképe legyen?',
    options: ['3', '4', '1', '5'],
    correctAnswer: 0,
    explanation: 'A piros pont 4 kockányira van a tengelytől, a kék csak 1-re. 4 − 1 = 3 lépés jobbra.'
  },
  { id: 'shexg3-q82', level: 3, questionTypeBadge: 'Betűk', question: 'Hány tükörtengelye van összesen a H és az A betűnek?', options: ['3', '2', '4', '1'], correctAnswer: 0, explanation: 'A H betűnek 2 (függőleges és vízszintes), az A betűnek 1 tükörtengelye van. 2 + 1 = 3.' },
  {
    id: 'shexg3-q83',
    level: 3,
    questionTypeBadge: 'Hibakeresés',
    figure: (
      <CellGrid
        cols={8}
        rows={4}
        axis={4}
        cells={[
          [0, 2, '#22c55e'],
          [1, 1, '#22c55e'],
          [1, 3, '#22c55e'],
          [2, 0, '#22c55e'],
          [3, 3, '#22c55e'],
          [0, 5, '#22c55e'],
          [1, 6, '#22c55e'],
          [1, 4, '#22c55e'],
          [2, 6, '#22c55e'],
          [3, 5, '#22c55e']
        ]}
      />
    ),
    question: 'Valaki kiszínezte a tükörképet a jobb oldalon. Hány kocka van rossz helyen?',
    options: ['2', '1', '0', '3'],
    correctAnswer: 0,
    explanation: 'Nézd meg sorról sorra! A 3. sorban a kocka 1-gyel közelebb van a tengelyhez, mint kellene. A 4. sorban a kocka a tengely mellé kellett volna. 2 kocka van rossz helyen.'
  },
  {
    id: 'shexg3-q84',
    level: 3,
    questionTypeBadge: 'Kiegészítés',
    figure: (
      <CellGrid
        cols={10}
        rows={4}
        axis={5}
        cells={[
          [0, 4, '#f87171'],
          [1, 3, '#f87171'],
          [1, 4, '#f87171'],
          [2, 1, '#fde68a'],
          [2, 2, '#fde68a'],
          [2, 3, '#fde68a'],
          [2, 4, '#fde68a'],
          [3, 1, '#fde68a'],
          [3, 2, '#92400e'],
          [3, 3, '#fde68a'],
          [3, 4, '#fde68a']
        ]}
      />
    ),
    question: 'Ez egy ház bal fele. Kiegészíted a tükörképével. Hány kocka széles lesz az egész ház?',
    options: ['8', '4', '9', '10'],
    correctAnswer: 0,
    explanation: 'A bal fele 4 kocka széles, a tükörképe is 4. 4 + 4 = 8.'
  },
  {
    id: 'shexg3-q85',
    level: 3,
    questionTypeBadge: 'Tükörkép',
    figure: <DotGrid cols={6} rows={6} axisH={3} water dots={[{ gx: 2, gy: 1, c: '#f59e0b' }]} />,
    question: 'A narancs labda 2 kockányira van a víz fölött. Milyen messze van a tükörképétől?',
    options: ['4 kockányira', '2 kockányira', '3 kockányira', '6 kockányira'],
    correctAnswer: 0,
    explanation: 'A tükörkép 2 kockányira van a víz alatt. 2 + 2 = 4 kockányira van a labdától.'
  },
  {
    id: 'shexg3-q86',
    level: 3,
    questionTypeBadge: 'Félbehajtás',
    figure: (
      <QFig h={130}>
        <rect x="70" y="15" width="100" height="100" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2.4" />
        <AxisLine x1={62} y1={7} x2={178} y2={123} />
      </QFig>
    ),
    question: 'A négyzetet félbehajtod a piros vonal mentén. Milyen alakú lesz?',
    options: ['háromszög', 'téglalap', 'kisebb négyzet', 'kör'],
    correctAnswer: 0,
    explanation: 'Az átló mentén hajtva a két fél pontosan fedi egymást, és egy háromszöget kapsz.'
  },
  {
    id: 'shexg3-q87',
    level: 3,
    questionTypeBadge: 'Félbehajtás',
    figure: (
      <QFig h={120}>
        <GridG x={40} y={20} cols={8} rows={4} s={20} />
        <rect x="40" y="20" width="160" height="80" fill="#fde68a" fillOpacity="0.7" stroke="#a16207" strokeWidth="2.4" />
        <AxisLine x1={120} y1={10} x2={120} y2={110} />
      </QFig>
    ),
    question: 'Ezt a téglalapot félbehajtod a piros vonal mentén. Milyen alakú lesz?',
    options: ['négyzet', 'háromszög', 'kör', 'ötszög'],
    correctAnswer: 0,
    explanation: 'A téglalap 8 kocka hosszú és 4 kocka magas. Félbehajtva 4 kocka hosszú és 4 kocka magas lesz: négyzet.'
  },
  { id: 'shexg3-q88', level: 3, questionTypeBadge: 'Testek', figure: <OneSolid k="sator" s={96} />, question: 'A sátor alakú test 2 háromszög alakú lapját körberajzolod. Hány oldala van összesen a 2 háromszögnek?', options: ['6', '3', '5', '9'], correctAnswer: 0, explanation: 'Egy háromszögnek 3 oldala van. 3 + 3 = 6.' },
  { id: 'shexg3-q89', level: 3, questionTypeBadge: 'Testek', figure: <OneSolid k="piramis4" s={84} />, question: 'A piramis alakú test minden lapját körberajzolod. Hány oldala van összesen a rajzolt síkidomoknak?', options: ['16', '5', '12', '20'], correctAnswer: 0, explanation: 'Lapjai: 1 négyzet (4 oldal) és 4 háromszög (4 · 3 = 12 oldal). 4 + 12 = 16.' },
  { id: 'shexg3-q90', level: 3, questionTypeBadge: 'Kocka', question: 'Egy kocka minden lapjára 1 matricát ragasztasz. Hány matrica kell 3 kockához?', options: ['18', '6', '9', '12'], correctAnswer: 0, explanation: 'Egy kockának 6 lapja van. 3 kockához 6 + 6 + 6 = 18 matrica kell.' }
];

export const ShapesExamG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="testek-sikidomok"
      topicId="g3-geom-tudasproba-quiz"
      subtopicId="megallo"
      title="5. Megálló – tudáspróba – Kvíz"
      subtitle="90 feladat 3 szinten: testek és lapjaik, kis kockák és alaprajz, téglatest és kocka, testháló, síkidomok és sokszögek, tükrözés."
      badge="3. OSZTÁLY • X. TESTEK, SÍKIDOMOK • KVÍZ"
      questions={SHAPES_EXAM_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Testek',
          items: ['kocka: 6 négyzet lap; téglatest: 6 téglalap lap', 'A görbe rész nem lap. A gömbnek nincs lapja.', 'Alaprajz: add össze a számokat!']
        },
        {
          title: 'Síkidomok',
          items: ['Sokszög: csak egyenes szakaszok határolják.', 'Annyi csúcsa van, ahány oldala.', 'A kör nem sokszög. Minden négyzet téglalap.']
        },
        {
          title: 'Tükrözés',
          items: ['Félbehajtva a két fele pontosan fedi egymást.', 'téglalap 2, négyzet 4, egyforma oldalú háromszög 3 tengely', 'A tükörkép ugyanannyi kockányira van a tengelytől.']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <ShapesExamG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <ShapesExamG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default ShapesExamG3Quiz;
