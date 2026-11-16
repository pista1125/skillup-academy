import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Orientation4Matcher } from './Orientation4Matcher';
import { Orientation4Sorter } from './Orientation4Sorter';
import { TownMap, ChessBoard } from './Orientation4Figures';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek (nem exportált)
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const MapFig: React.FC<{ highlight?: string; note?: string }> = ({ highlight, note }) => (
  <svg viewBox={`0 0 310 ${note ? 284 : 262}`} className="w-full max-w-[300px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="308" height={note ? 282 : 260} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    <TownMap highlight={highlight} />
    {note && (
      <text x="155" y="276" textAnchor="middle" fontSize="13" fontWeight="bold" fill={note.includes('?') ? UNK : '#0f172a'}>
        {note}
      </text>
    )}
  </svg>
);

const ChessFig: React.FC<{ highlight?: string; pieces?: boolean }> = ({ highlight, pieces = true }) => (
  <svg viewBox="0 0 210 206" className="w-full max-w-[240px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="208" height="204" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    <ChessBoard u={22} x0={24} y0={8} highlight={highlight} pieces={pieces} />
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
  <text x={x} y={y} fontSize={size} fontWeight="bold" textAnchor={anchor} fill={t.includes('?') ? UNK : color ?? '#0f172a'} fontFamily="system-ui, sans-serif">
    {t}
  </text>
);

type P = [number, number];
/** Négyzetrács pontokkal: P a kezdőpont, A–D a lehetséges végpontok. */
const WalkFig: React.FC<{ start: P; cands?: { l: string; p: P }[]; path?: P[]; note: string; firstArrow?: boolean }> = ({ start, cands = [], path, note, firstArrow }) => {
  const u = 20;
  const x0 = 20;
  const y0 = 12;
  const X = (p: P) => x0 + p[0] * u;
  const Y = (p: P) => y0 + p[1] * u;
  return (
    <svg viewBox="0 0 240 160" className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="238" height="158" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`v${i}`} x1={x0 + i * u} y1={y0} x2={x0 + i * u} y2={y0 + 6 * u} stroke="#cbd5e1" />
      ))}
      {Array.from({ length: 7 }, (_, i) => (
        <line key={`h${i}`} x1={x0} y1={y0 + i * u} x2={x0 + 8 * u} y2={y0 + i * u} stroke="#cbd5e1" />
      ))}
      {path && <polyline points={path.map((p) => `${X(p)},${Y(p)}`).join(' ')} fill="none" stroke="#059669" strokeWidth="3" strokeLinejoin="round" />}
      {path && firstArrow && (
        <polygon
          points={`${(X(path[0]) + X(path[1])) / 2 + 6},${(Y(path[0]) + Y(path[1])) / 2} ${(X(path[0]) + X(path[1])) / 2 - 4},${(Y(path[0]) + Y(path[1])) / 2 - 6} ${(X(path[0]) + X(path[1])) / 2 - 4},${(Y(path[0]) + Y(path[1])) / 2 + 6}`}
          fill="#059669"
        />
      )}
      <circle cx={X(start)} cy={Y(start)} r="5" fill="#0f172a" />
      <T x={X(start) - 8} y={Y(start) + 15} t="P" size={11} />
      {cands.map((c) => (
        <g key={c.l}>
          <circle cx={X(c.p)} cy={Y(c.p)} r="5" fill="#7c3aed" />
          <T x={X(c.p) + 9} y={Y(c.p) - 6} t={c.l} size={11} color="#6d28d9" />
        </g>
      ))}
      <g>
        <line x1="222" y1="40" x2="222" y2="22" stroke={UNK} strokeWidth="2" />
        <polygon points="222,16 218,24 226,24" fill={UNK} />
        <T x={222} y={52} t="É" size={10} color={UNK} />
      </g>
      <T x={120} y={150} t={note} size={11} />
    </svg>
  );
};

const PieceFig: React.FC<{ piece: string; white?: boolean }> = ({ piece, white = true }) => (
  <svg viewBox="0 0 240 110" className="w-full max-w-[220px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="238" height="108" rx="10" fill="#fff7ed" stroke="#fed7aa" />
    <text x="120" y="78" textAnchor="middle" fontSize="64" fill={white ? '#ffffff' : '#0f172a'} stroke="#0f172a" strokeWidth={white ? 1.2 : 0}>
      {piece}
    </text>
    <T x={205} y={30} t="?" size={22} />
  </svg>
);

// --- Ábrák ---
const FIG_MAP = <MapFig />;
const FIG_MAP_TEMPLE = <MapFig note="templom: ?" />;
const FIG_MAP_C3 = <MapFig highlight="C3" />;
const FIG_CHESS = <ChessFig />;
const FIG_CHESS_EMPTY = <ChessFig pieces={false} />;
const FIG_CHESS_E4 = <ChessFig highlight="e4" pieces={false} />;
const FIG_KNIGHT = <PieceFig piece="♘" />;
const FIG_WALK_2K = (
  <WalkFig
    start={[2, 3]}
    cands={[
      { l: 'A', p: [4, 3] },
      { l: 'B', p: [0, 3] },
      { l: 'C', p: [2, 1] },
      { l: 'D', p: [2, 5] }
    ]}
    note="P-ből: 2K → ?"
  />
);
const FIG_WALK_3 = (
  <WalkFig
    start={[2, 5]}
    cands={[
      { l: 'A', p: [3, 2] },
      { l: 'B', p: [1, 2] },
      { l: 'C', p: [3, 4] },
      { l: 'D', p: [5, 2] }
    ]}
    note="P-ből: 2K, 3É, 1NY → ?"
  />
);
const FIG_WALK_SQUARE = (
  <WalkFig start={[3, 5]} path={[[3, 5], [5, 5], [5, 3], [3, 3], [3, 5]]} firstArrow note="Melyik lépéssor rajzolta?" />
);
const FIG_WALK_DIAG = (
  <WalkFig
    start={[2, 3]}
    cands={[
      { l: 'A', p: [4, 3] },
      { l: 'B', p: [4, 1] },
      { l: 'C', p: [2, 1] },
      { l: 'D', p: [3, 2] }
    ]}
    note="P-ből: 1ÉK, 1DK → ?"
  />
);

const ORIENTATION4_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'or-q1',
    level: 1,
    questionTypeBadge: 'Térkép',
    figure: FIG_MAP,
    question: 'Mi található a B2 mezőben?',
    options: ['az iskola', 'a posta', 'az uszoda', 'a templom'],
    correctAnswer: 0,
    explanation: 'Keresd meg a B oszlopot és a 2. sort! Ahol találkoznak, ott az iskola van.'
  },
  {
    id: 'or-q2',
    level: 1,
    questionTypeBadge: 'Térkép',
    figure: FIG_MAP_TEMPLE,
    question: 'Melyik mezőben van a templom?',
    options: ['D1', '1D', 'D2', 'C1'],
    correctAnswer: 0,
    explanation: 'A templom a D oszlopban és az 1. sorban van. Előbb a betű, aztán a szám: D1.'
  },
  {
    id: 'or-q3',
    level: 1,
    questionTypeBadge: 'Mezőkód',
    question: 'A tankönyvi térképen mit jelent a G1 kód?',
    options: ['A G jelű oszlop 1-es mezőjét.', 'Az 1. oszlop G jelű sorát.', 'A G oszlop összes mezőjét.', '1 lépést a G betűtől.'],
    correctAnswer: 0,
    explanation: 'A tankönyv szerint: „A G1 azt jelenti, hogy a G jelű oszlop 1-es mezőjében van a keresett város.”'
  },
  {
    id: 'or-q4',
    level: 1,
    questionTypeBadge: 'Sakktábla',
    figure: FIG_CHESS_EMPTY,
    question: 'Milyen jelek vannak a sakktábla oszlopai alatt?',
    options: ['a-tól h-ig betűk', '1-től 8-ig számok', 'A-tól I-ig nagybetűk', 'a-tól j-ig betűk'],
    correctAnswer: 0,
    explanation: 'A sakktábla 8 oszlopát kisbetűk jelölik: a, b, c, d, e, f, g, h. A sorokat számok: 1–8.'
  },
  {
    id: 'or-q5',
    level: 1,
    questionTypeBadge: 'Sakktábla',
    figure: FIG_CHESS_EMPTY,
    question: 'Hány mezője van a sakktáblának?',
    options: ['64', '16', '32', '81'],
    correctAnswer: 0,
    explanation: '8 oszlop és 8 sor van: 8 · 8 = 64 mező.'
  },
  {
    id: 'or-q6',
    level: 1,
    questionTypeBadge: 'Sakkbábuk',
    figure: FIG_KNIGHT,
    question: 'Mi a neve ennek a sakkbábunak?',
    options: ['huszár', 'futó', 'bástya', 'vezér'],
    correctAnswer: 0,
    explanation: 'A lófejes bábu a huszár. A futónak csúcsos süvege, a bástyának várfala, a vezérnek koronája van.'
  },
  {
    id: 'or-q7',
    level: 1,
    questionTypeBadge: 'Sakktábla',
    figure: FIG_CHESS,
    question: 'Melyik mezőn áll a világos király?',
    options: ['e1', '1e', 'd1', 'e8'],
    correctAnswer: 0,
    explanation: 'A világos király az e oszlopban, az 1. sorban áll: e1. (Az e8-on a sötét király áll, a d1-en a világos vezér.)'
  },
  {
    id: 'or-q8',
    level: 1,
    questionTypeBadge: 'Irányok',
    question: 'A négyzetrácson mit jelent a 3É utasítás?',
    options: ['3 lépés észak felé (felfelé)', '3 lépés dél felé (lefelé)', '3 lépés kelet felé (jobbra)', '1 lépés észak felé, 3-szor'],
    correctAnswer: 0,
    explanation: 'A szám a lépések száma, a betű az irány: É = észak, ami a rácson felfelé van.'
  },
  {
    id: 'or-q9',
    level: 1,
    questionTypeBadge: 'Térkép',
    figure: FIG_MAP_C3,
    question: 'Melyik mező van közvetlenül a C3 mezőtől jobbra (keletre)?',
    options: ['D3', 'B3', 'C4', 'D4'],
    correctAnswer: 0,
    explanation: 'Jobbra lépve ugyanabban a sorban maradunk, csak a betű változik: C után D jön. Ez a D3.'
  },
  {
    id: 'or-q10',
    level: 1,
    questionTypeBadge: 'Séta a rácson',
    figure: FIG_WALK_2K,
    question: 'A P pontból 2 lépést teszel keletre (2K). Melyik pontba érsz?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'Kelet = jobbra. 2 rácsvonalnyit jobbra lépve az A pontba érsz. A B nyugatra, a C északra, a D délre van.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'or-q11',
    level: 2,
    questionTypeBadge: 'Térkép',
    figure: FIG_MAP,
    question: 'Mi található az E4 mezőben?',
    options: ['a park', 'a fagyizó', 'a focipálya', 'a könyvtár'],
    correctAnswer: 0,
    explanation: 'Az E oszlop és a 4. sor találkozásánál a park van. A fagyizó egy sorral feljebb, az E3-ban.'
  },
  {
    id: 'or-q12',
    level: 2,
    questionTypeBadge: 'Térkép',
    figure: FIG_MAP,
    question: 'Mi az uszoda kódja?',
    options: ['F2', '2F', 'E2', 'F3'],
    correctAnswer: 0,
    explanation: 'Az uszoda az F oszlopban, a 2. sorban van: F2. A 2F rossz sorrend.'
  },
  {
    id: 'or-q13',
    level: 2,
    questionTypeBadge: 'Sakktábla',
    figure: FIG_CHESS,
    question: 'Melyik mezőn áll a sötét huszár?',
    options: ['c6', '6c', 'c3', 'f6'],
    correctAnswer: 0,
    explanation: 'A fekete lófejes bábu a c oszlopban és a 6. sorban áll: c6.'
  },
  {
    id: 'or-q14',
    level: 2,
    questionTypeBadge: 'Sakktábla',
    figure: FIG_CHESS,
    question: 'Melyik bábu áll az f3 mezőn?',
    options: ['a világos huszár', 'a sötét huszár', 'a világos futó', 'a világos gyalog'],
    correctAnswer: 0,
    explanation: 'Az f oszlop és a 3. sor találkozásánál a világos (fehér) huszár áll.'
  },
  {
    id: 'or-q15',
    level: 2,
    questionTypeBadge: 'Séta a rácson',
    figure: FIG_WALK_3,
    question: 'A P pontból indulsz: 2K, 3É, 1NY. Melyik pontba érsz?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
    explanation: '2 jobbra, 3 fel, 1 balra: összesen 1-gyel jobbra és 3-mal feljebb vagy, mint P. Ez az A pont.'
  },
  {
    id: 'or-q16',
    level: 2,
    questionTypeBadge: 'Térkép',
    figure: FIG_MAP,
    question: 'Az A1 mezőből (a kúttól) 2 mezőt lépsz keletre, majd 1 mezőt délre. Melyik mezőbe érsz?',
    options: ['C2', 'B3', 'C1', 'D2'],
    correctAnswer: 0,
    explanation: 'Keletre: A → B → C, tehát C1. Délre (lefelé) egy sor: C2. A térképen az 1. sor van felül.'
  },
  {
    id: 'or-q17',
    level: 2,
    questionTypeBadge: 'Sakktábla',
    question: 'Egy bábu az e1 mezőről egyenesen előre (felfelé) az e4 mezőre lép. Hány mezőnyit lépett?',
    options: ['3', '4', '1', '5'],
    correctAnswer: 0,
    explanation: 'e1 → e2 → e3 → e4: ez 3 lépés. (4 − 1 = 3.)'
  },
  {
    id: 'or-q18',
    level: 2,
    questionTypeBadge: 'Séta a rácson',
    question: 'Ezt a lépéssort követed: 1É, 1K, 1D, 1NY. Milyen alakzatot jártál körbe?',
    options: ['egy kis négyzetet', 'egy hosszú téglalapot', 'egy háromszöget', 'nem értem vissza, nincs zárt alakzat'],
    correctAnswer: 0,
    explanation: 'Fel 1, jobbra 1, le 1, balra 1: egy kis négyzet oldalain mentél körbe, és visszaértél.'
  },
  {
    id: 'or-q19',
    level: 2,
    questionTypeBadge: 'Térkép',
    figure: FIG_MAP,
    question: 'Melyik épület van az 5. sorban?',
    options: ['a könyvtár', 'az uszoda', 'az iskola', 'a templom'],
    correctAnswer: 0,
    explanation: 'Az 5. sor a térkép alsó sora. Ott van a pékség (B5), a focipálya (D5) és a könyvtár (F5).'
  },
  {
    id: 'or-q20',
    level: 2,
    questionTypeBadge: 'Irányok',
    question: 'Mit jelent a négyzetrácson az 1ÉK lépés?',
    options: ['Egy kis négyzet átlóján megyünk jobbra fel.', 'Egyet lépünk felfelé.', 'Egyet lépünk jobbra.', 'Egy kis négyzet átlóján megyünk balra le.'],
    correctAnswer: 0,
    explanation: 'Az északkelet az észak (fel) és a kelet (jobbra) között van, ezért átlósan jobbra fel lépünk.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'or-q21',
    level: 3,
    questionTypeBadge: 'Séta a rácson',
    question: 'Ezt a lépéssort követed: 3K, 2É, 1NY, 2D, 2NY. Hová érsz a kiindulóponthoz képest?',
    options: ['vissza a kiindulópontba', '1 lépésre keletre', '2 lépésre északra', '2 lépésre nyugatra'],
    correctAnswer: 0,
    explanation: 'Kelet–nyugat: 3 jobbra, 1 + 2 = 3 balra → 0. Észak–dél: 2 fel, 2 le → 0. Visszaértél!'
  },
  {
    id: 'or-q22',
    level: 3,
    questionTypeBadge: 'Séta a rácson',
    figure: FIG_WALK_SQUARE,
    question: 'A P pontból indultunk a nyíl irányába. Melyik lépéssor rajzolta ezt az ábrát?',
    options: ['2K, 2É, 2NY, 2D', '2NY, 2É, 2K, 2D', '2K, 2D, 2NY, 2É', '2É, 2K, 2D, 2NY'],
    correctAnswer: 0,
    explanation: 'Először jobbra (K) 2-t, aztán fel (É) 2-t, balra (NY) 2-t, végül le (D) 2-t, vissza P-be.'
  },
  {
    id: 'or-q23',
    level: 3,
    questionTypeBadge: 'Csapda',
    figure: FIG_MAP_C3,
    question: 'A Kisváros térképén az 1. sor van legfelül. Melyik mező van közvetlenül a C3 mező fölött (északra)?',
    options: ['C2', 'C4', 'B3', 'D3'],
    correctAnswer: 0,
    explanation: 'Felfelé haladva ezen a térképen csökkennek a sorok számai: a 3. sor fölött a 2. sor van. Ez a C2.'
  },
  {
    id: 'or-q24',
    level: 3,
    questionTypeBadge: 'Csapda',
    figure: FIG_CHESS_E4,
    question: 'A sakktáblán az 1. sor van alul. Melyik mező van közvetlenül az e4 mező fölött?',
    options: ['e5', 'e3', 'f4', 'd4'],
    correctAnswer: 0,
    explanation: 'A sakktáblán felfelé nőnek a számok: e4 fölött az e5 van. (Az f4 jobbra, a d4 balra van mellette.)'
  },
  {
    id: 'or-q25',
    level: 3,
    questionTypeBadge: 'Térkép',
    figure: FIG_MAP,
    question: 'Kata a postától (C3) indul. 2 mezőt megy keletre, majd 1 mezőt délre. Melyik helyre ér?',
    options: ['a parkba', 'a fagyizóba', 'a könyvtárba', 'az uszodába'],
    correctAnswer: 0,
    explanation: 'C3 → keletre 2: E3 (itt a fagyizó van). Majd délre 1: E4, ez a park.'
  },
  {
    id: 'or-q26',
    level: 3,
    questionTypeBadge: 'Sakktábla',
    figure: FIG_CHESS,
    question: 'Hol állnak a világos bástyák? (Ha több azonos bábu van, mindegyik helyét add meg!)',
    options: ['a1 és h1', 'a1 és a8', 'h1 és h8', 'a8 és h8'],
    correctAnswer: 0,
    explanation: 'A két világos (fehér) bástya a tábla alsó sarkaiban áll: a1 és h1. Az a8-on a sötét bástya áll.'
  },
  {
    id: 'or-q27',
    level: 3,
    questionTypeBadge: 'Mezők száma',
    figure: FIG_MAP,
    question: 'A Kisváros térképén A-tól F-ig vannak oszlopok és 1-től 5-ig sorok. Hány mezőből áll a térkép?',
    options: ['30', '11', '25', '36'],
    correctAnswer: 0,
    explanation: '6 oszlop (A, B, C, D, E, F) és 5 sor van: 6 · 5 = 30 mező. (A 11 akkor jönne ki, ha összeadnád: 6 + 5.)'
  },
  {
    id: 'or-q28',
    level: 3,
    questionTypeBadge: 'Mellékvilágtáj',
    figure: FIG_WALK_DIAG,
    question: 'A P pontból indulsz: 1ÉK, majd 1DK. Melyik pontba érsz?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'ÉK: jobbra fel, DK: jobbra le. A fel és a le kiejti egymást, így 2-vel jobbra kerülsz: ez az A.'
  },
  {
    id: 'or-q29',
    level: 3,
    questionTypeBadge: 'Sakktábla',
    question: 'Egy bábu a d4 mezőről 2 mezőt lép jobbra (az f oszlop felé), majd 3 mezőt felfelé. Melyik mezőre ér?',
    options: ['f7', 'f6', 'g7', 'b7'],
    correctAnswer: 0,
    explanation: 'Jobbra: d → e → f, tehát f4. Felfelé 3: 4 + 3 = 7, tehát f7.'
  },
  {
    id: 'or-q30',
    level: 3,
    questionTypeBadge: 'Séta a rácson',
    question: 'A ponttól ezt a lépéssort követed: 1D, 2NY, 3É, 1NY. Hová érsz a kiindulóponthoz képest?',
    options: ['3 lépésre nyugatra és 2 lépésre északra', '3 lépésre nyugatra és 4 lépésre északra', '1 lépésre nyugatra és 2 lépésre északra', '3 lépésre keletre és 2 lépésre északra'],
    correctAnswer: 0,
    explanation: 'Nyugat felé: 2 + 1 = 3. Észak–dél: 1 le, 3 fel → 2 fel, vagyis 2 északra.'
  }
];

export const Orientation4Quiz: React.FC<{
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
      topicId="g4-geom-tajekozodas-quiz"
      subtopicId="tajekozodas"
      title="8. Tájékozódás – Kvíz"
      subtitle="30 feladat 3 szinten: mezőkódok a térképen, sakktábla-szerű jelölés, séta a négyzetrácson világtájak szerint."
      badge="4. OSZTÁLY • V. SÍKIDOMOK ÉS TESTEK • KVÍZ"
      questions={ORIENTATION4_QUESTIONS}
      cheatSheets={[
        {
          title: 'Mezőkód',
          items: [
            'Kód = oszlop betűje + sor száma (G1, C4).',
            'Előbb a betű, aztán a szám!',
            'Ahol az oszlop és a sor találkozik, ott a mező.',
            'Mezők száma = oszlopok száma · sorok száma.'
          ]
        },
        {
          title: 'Sakktábla',
          items: [
            'Oszlopok: a–h, sorok: 1–8; 64 mező.',
            'Az 1. sor alul van (a világos oldalán).',
            'Bábuk: király, vezér, bástya, futó, huszár, gyalog.',
            'Több azonos bábunál mindegyik helyét megadjuk.'
          ]
        },
        {
          title: 'Séta a rácson',
          items: [
            'É = fel, D = le, K = jobbra, NY = balra.',
            'ÉK, DK, DNY, ÉNY: átlós lépés.',
            '3É = 3 lépés észak felé.',
            'Zárt ábránál a végén visszaérsz a kezdőpontba.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Orientation4Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Orientation4Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Orientation4Quiz;
