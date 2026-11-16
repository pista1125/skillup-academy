import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { TableSortingMatcher } from './TableSortingMatcher';
import { TableSortingSorter } from './TableSortingSorter';
import { PencilTableSvg, PencilTreeSvg, PencilVennSvg, LineTypesSvg, Pencil, PencilColor } from './TableSortingFigures';
import { LogicBlock } from '../valogatasok-halmazokba/SetSortingFigures';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const QCLS = 'w-full max-w-[300px] h-auto mx-auto';

/** Általános 2 × 2-es táblázat szöveges mezőkkel ('?' pirossal). */
const table2 = (rows: [string, string], cols: [string, string], cells: [string, string, string, string], color = '#7c3aed') => (
  <svg viewBox="0 0 300 130" className={QCLS} fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="296" height="126" rx="8" fill="#faf5ff" />
    {cols.map((c, i) => (
      <g key={c}>
        <rect x={96 + i * 100} y="6" width="100" height="26" fill={color} />
        <text x={146 + i * 100} y="23" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#fff">
          {c}
        </text>
      </g>
    ))}
    {rows.map((r, j) => (
      <g key={r}>
        <rect x="4" y={32 + j * 46} width="92" height="46" fill={color} />
        <text x="50" y={59 + j * 46} fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#fff">
          {r}
        </text>
      </g>
    ))}
    {cells.map((t, k) => {
      const x = 96 + (k % 2) * 100;
      const y = 32 + Math.floor(k / 2) * 46;
      return (
        <g key={k}>
          <rect x={x} y={y} width="100" height="46" fill="#fff" stroke={color} strokeWidth="1.5" />
          <text x={x + 50} y={y + 27} fontSize={t === '?' ? 20 : 10.5} fontWeight="bold" textAnchor="middle" fill={t.includes('?') ? '#dc2626' : '#1e293b'}>
            {t}
          </text>
        </g>
      );
    })}
  </svg>
);

const pencilAsk = (color: PencilColor, eraser: boolean) => (
  <svg viewBox="0 0 300 168" className={QCLS} fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="296" height="164" rx="8" fill="#fee2e2" />
    <rect x="96" y="6" width="100" height="26" fill="#dc2626" />
    <rect x="196" y="6" width="100" height="26" fill="#dc2626" />
    <text x="146" y="23" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#fff">
      Kék ceruza
    </text>
    <text x="246" y="23" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#fff">
      Nem kék ceruza
    </text>
    <rect x="4" y="32" width="92" height="46" fill="#dc2626" />
    <rect x="4" y="78" width="92" height="46" fill="#dc2626" />
    <text x="50" y="59" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#fff">
      Radíros
    </text>
    <text x="50" y="105" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#fff">
      Nem radíros
    </text>
    {[
      [96, 32],
      [196, 32],
      [96, 78],
      [196, 78]
    ].map(([x, y]) => (
      <rect key={`${x}${y}`} x={x} y={y} width="100" height="46" fill="#fff" stroke="#dc2626" strokeWidth="1.5" />
    ))}
    <text x="100" y="150" fontSize="11" fontWeight="bold" fill="#7f1d1d">
      Hova kerül?
    </text>
    <Pencil x={170} y={146} color={color} eraser={eraser} len={80} />
  </svg>
);

const FIG_TABLE_FULL = <PencilTableSvg className={QCLS} />;
const FIG_TREE = <PencilTreeSvg className={QCLS} />;
const FIG_VENN = <PencilVennSvg className={QCLS} />;
const FIG_LINES = <LineTypesSvg className={QCLS} />;

const FIG_ANIMAL_EMPTY = table2(['Hal', 'Nem hal'], ['Emlős', 'Nem emlős'], ['?', '🦈 🐠 🐡', '🐋 🐬', '🐸 🐌 🦐 🐙 🐚'], '#0e7490');
const FIG_ANIMAL_Q = table2(['Hal', 'Nem hal'], ['Emlős', 'Nem emlős'], ['', '', '', ''], '#0e7490');
const FIG_NUM_ASK = table2(['Páros', 'Nem páros'], ['Négyjegyű', 'Nem négyjegyű'], ['', '', '', ''], '#16a34a');
const FIG_NUM_WRONG = table2(['Páros', 'Nem páros'], ['Négyjegyű', 'Nem négyjegyű'], ['1246 8002 1005', '54 600 48', '9579 8889', '475 33 77'], '#16a34a');
const FIG_MULT_ASK = table2(['50 többszöröse', 'Nem 50 többsz.'], ['20 többszöröse', 'Nem 20 többsz.'], ['', '', '', ''], '#db2777');
const FIG_GIRLS = table2(['Lány', 'Fiú'], ['Szemüveges', 'Nem szemüveges'], ['2', '?', '1', '5'], '#0284c7');
const FIG_TOTALS = table2(['Radíros', 'Nem radíros'], ['Kék', 'Nem kék'], ['2', '5', '3', '1'], '#dc2626');

const FIG_BLOCK_E = (
  <svg viewBox="0 0 300 168" className={QCLS} fontFamily="system-ui, sans-serif">
    <rect x="2" y="2" width="296" height="164" rx="8" fill="#fff7ed" />
    <rect x="96" y="6" width="100" height="26" fill="#ea580c" />
    <rect x="196" y="6" width="100" height="26" fill="#ea580c" />
    <text x="146" y="23" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#fff">
      Kék
    </text>
    <text x="246" y="23" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#fff">
      Nem kék
    </text>
    <rect x="4" y="32" width="92" height="46" fill="#ea580c" />
    <rect x="4" y="78" width="92" height="46" fill="#ea580c" />
    <text x="50" y="59" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#fff">
      Lyukas
    </text>
    <text x="50" y="105" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#fff">
      Nem lyukas
    </text>
    {[
      [96, 32],
      [196, 32],
      [96, 78],
      [196, 78]
    ].map(([x, y]) => (
      <rect key={`${x}${y}`} x={x} y={y} width="100" height="46" fill="#fff" stroke="#ea580c" strokeWidth="1.5" />
    ))}
    <text x="100" y="150" fontSize="11" fontWeight="bold" fill="#7c2d12">
      Hova kerül az E lap?
    </text>
    <LogicBlock x={240} y={145} shape="négyzet" color="zöld" holed s={30} />
  </svg>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const TABLE_SORTING_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'ts-q1',
    level: 1,
    questionTypeBadge: 'Táblázat olvasása',
    figure: FIG_TREE,
    question: 'Kitti rajza alapján: hány ceruza kerül Manó táblázatában a „Kék ceruza – Radíros ceruza” mezőbe?',
    options: ['2', '3', '5', '7'],
    correctAnswer: 0,
    explanation: 'A kék ÉS radíros ceruzák kerülnek ebbe a mezőbe: 2 darab. A 3 kék, radír nélküli ceruza az alatta lévő mezőbe kerül.'
  },
  {
    id: 'ts-q2',
    level: 1,
    questionTypeBadge: 'Melyik mező?',
    figure: pencilAsk('piros', true),
    question: 'Melyik mezőbe kerül a piros, radíros ceruza?',
    options: ['Radíros sor, Nem kék oszlop', 'Radíros sor, Kék oszlop', 'Nem radíros sor, Nem kék oszlop', 'Nem radíros sor, Kék oszlop'],
    correctAnswer: 0,
    explanation: 'Radíros? igen → felső sor. Kék? nem → Nem kék oszlop. A kettő találkozása a jobb felső mező.'
  },
  {
    id: 'ts-q3',
    level: 1,
    questionTypeBadge: 'Melyik mező?',
    figure: pencilAsk('kék', false),
    question: 'Melyik mezőbe kerül a radír nélküli kék ceruza?',
    options: ['Nem radíros sor, Kék oszlop', 'Radíros sor, Kék oszlop', 'Nem radíros sor, Nem kék oszlop', 'Radíros sor, Nem kék oszlop'],
    correctAnswer: 0,
    explanation: 'Radíros? nem → alsó sor. Kék? igen → Kék oszlop. Tehát a bal alsó mező.'
  },
  {
    id: 'ts-q4',
    level: 1,
    questionTypeBadge: 'Táblázat olvasása',
    figure: FIG_TREE,
    question: 'Kitti rajza alapján: hány ceruza kerül a „Nem kék ceruza – Nem radíros ceruza” mezőbe?',
    options: ['1', '0', '5', '6'],
    correctAnswer: 0,
    explanation: 'Csak egyetlen ceruza nem kék és nincs rajta radír: a sárga. Ezért 1 ceruza van ebben a mezőben.'
  },
  {
    id: 'ts-q5',
    level: 1,
    questionTypeBadge: 'Vízi állatok',
    figure: FIG_ANIMAL_Q,
    question: 'Hova kerül a 🐋 bálna ebben a táblázatban?',
    options: ['Nem hal sor, Emlős oszlop', 'Hal sor, Emlős oszlop', 'Hal sor, Nem emlős oszlop', 'Nem hal sor, Nem emlős oszlop'],
    correctAnswer: 0,
    explanation: 'A bálna a vízben él, de nem hal: emlős, a kicsinyét anyatejjel táplálja. Ezért a Nem hal sor és az Emlős oszlop mezőjébe kerül.'
  },
  {
    id: 'ts-q6',
    level: 1,
    questionTypeBadge: 'Vízi állatok',
    figure: FIG_ANIMAL_Q,
    question: 'Hova kerül a 🦈 cápa?',
    options: ['Hal sor, Nem emlős oszlop', 'Hal sor, Emlős oszlop', 'Nem hal sor, Emlős oszlop', 'Nem hal sor, Nem emlős oszlop'],
    correctAnswer: 0,
    explanation: 'A cápa hal, és nem emlős. Ezért a Hal sor és a Nem emlős oszlop találkozásához kerül.'
  },
  {
    id: 'ts-q7',
    level: 1,
    questionTypeBadge: 'Üres mező',
    figure: FIG_ANIMAL_EMPTY,
    question: 'Melyik mező marad üresen a vízi állatok táblázatában?',
    options: ['Hal – Emlős', 'Hal – Nem emlős', 'Nem hal – Emlős', 'Nem hal – Nem emlős'],
    correctAnswer: 0,
    explanation: 'Nincs olyan állat, amelyik hal is és emlős is. Ezért a „Hal – Emlős” mező üres marad – ez nem hiba!'
  },
  {
    id: 'ts-q8',
    level: 1,
    questionTypeBadge: 'Vonalak',
    figure: FIG_LINES,
    question: 'A „folytonos – szaggatott” szempont szerint hova kerül a pontvonal?',
    options: ['A nem folytonos (szaggatott) vonalak közé', 'A folytonos vonalak közé', 'A görbe vonalak közé', 'A vastag vonalak közé'],
    correctAnswer: 0,
    explanation: 'A pontvonal apró darabokból áll, megszakad. Nem folytonos, ezért a szaggatott vonalak csoportjába kerül.'
  },
  {
    id: 'ts-q9',
    level: 1,
    questionTypeBadge: 'Mezők száma',
    question: 'Két szempont szerint válogatunk, mindkettőnél „igen” vagy „nem” a válasz. Hány mezője van a táblázatnak?',
    options: ['4', '2', '3', '6'],
    correctAnswer: 0,
    explanation: '2 sor és 2 oszlop van. Minden sor minden oszloppal találkozik: 2 · 2 = 4 mező.'
  },
  {
    id: 'ts-q10',
    level: 1,
    questionTypeBadge: 'Számok táblázatban',
    figure: FIG_NUM_ASK,
    question: 'Hova kerül az 54?',
    options: ['Páros sor, Nem négyjegyű oszlop', 'Páros sor, Négyjegyű oszlop', 'Nem páros sor, Nem négyjegyű oszlop', 'Nem páros sor, Négyjegyű oszlop'],
    correctAnswer: 0,
    explanation: 'Az 54 4-re végződik, tehát páros. Csak két számjegye van, tehát nem négyjegyű.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'ts-q11',
    level: 2,
    questionTypeBadge: 'Elágazásos rajz',
    figure: FIG_TREE,
    question: 'Kitti elágazásos rajzán hány ágvég van a jobb szélen?',
    options: ['4', '2', '3', '11'],
    correctAnswer: 0,
    explanation: 'Az első elágazásnál 2 ág van (kékek, nem kékek), mindkettő újra kettéágazik (radíros, nem radíros): 2 · 2 = 4 ágvég.'
  },
  {
    id: 'ts-q12',
    level: 2,
    questionTypeBadge: 'Halmazábra',
    figure: FIG_VENN,
    question: 'Mona ábráján a B csoportba a kék, a C csoportba a radíros ceruzák kerültek. Milyenek a B és a C közös részében lévő ceruzák?',
    options: ['Kékek és radírosak', 'Kékek, de nem radírosak', 'Radírosak, de nem kékek', 'Se nem kékek, se nem radírosak'],
    correctAnswer: 0,
    explanation: 'A közös részbe az kerül, ami mindkét csoportba beletartozik: kék IS és radíros IS. Ez a táblázat „Kék – Radíros” mezője.'
  },
  {
    id: 'ts-q13',
    level: 2,
    questionTypeBadge: 'Halmazábra',
    figure: FIG_VENN,
    question: 'Mona ábráján melyik ceruza került a karikákon kívülre (csak az A keretbe)?',
    options: ['A sárga, radír nélküli ceruza', 'Egy kék, radíros ceruza', 'Egy zöld, radíros ceruza', 'Egy kék, radír nélküli ceruza'],
    correctAnswer: 0,
    explanation: 'A karikákon kívül az van, ami se nem kék, se nem radíros: a sárga, radír nélküli ceruza.'
  },
  {
    id: 'ts-q14',
    level: 2,
    questionTypeBadge: 'Összeadás a táblázatban',
    figure: FIG_TABLE_FULL,
    question: 'Hány ceruza került Mona C csoportjába (radíros ceruzák)?',
    options: ['7', '5', '2', '9'],
    correctAnswer: 0,
    explanation: 'A radíros sor két mezőjét adjuk össze: 2 kék radíros + 5 nem kék radíros = 7.'
  },
  {
    id: 'ts-q15',
    level: 2,
    questionTypeBadge: 'Összeadás a táblázatban',
    figure: FIG_TABLE_FULL,
    question: 'Hány kék ceruza van összesen?',
    options: ['5', '2', '3', '7'],
    correctAnswer: 0,
    explanation: 'A Kék oszlop két mezőjét adjuk össze: 2 radíros + 3 radír nélküli = 5 kék ceruza.'
  },
  {
    id: 'ts-q16',
    level: 2,
    questionTypeBadge: 'Számok táblázatban',
    figure: FIG_NUM_ASK,
    question: 'Hova kerül a 9579?',
    options: ['Nem páros sor, Négyjegyű oszlop', 'Páros sor, Négyjegyű oszlop', 'Nem páros sor, Nem négyjegyű oszlop', 'Páros sor, Nem négyjegyű oszlop'],
    correctAnswer: 0,
    explanation: 'A 9579 9-re végződik → nem páros. Négy számjegye van → négyjegyű.'
  },
  {
    id: 'ts-q17',
    level: 2,
    questionTypeBadge: 'Számok táblázatban',
    figure: FIG_NUM_ASK,
    question: 'Hova kerül a 600?',
    options: ['Páros sor, Nem négyjegyű oszlop', 'Páros sor, Négyjegyű oszlop', 'Nem páros sor, Nem négyjegyű oszlop', 'Nem páros sor, Négyjegyű oszlop'],
    correctAnswer: 0,
    explanation: 'A 600 0-ra végződik → páros. Háromjegyű → nem négyjegyű. (A sok 0 nem tesz négyjegyűvé!)'
  },
  {
    id: 'ts-q18',
    level: 2,
    questionTypeBadge: 'Hibakeresés',
    figure: FIG_NUM_WRONG,
    question: 'Melyik szám került rossz mezőbe?',
    options: ['1005', '8002', '600', '8889'],
    correctAnswer: 0,
    explanation: 'Az 1005 5-re végződik, tehát nem páros. A „Nem páros – Négyjegyű” mezőbe kellett volna tenni.'
  },
  {
    id: 'ts-q19',
    level: 2,
    questionTypeBadge: 'Többszörösök',
    figure: FIG_MULT_ASK,
    question: 'Hova kerül a 8150?',
    options: ['50 többszöröse sor, Nem 20 többszöröse oszlop', '50 többszöröse sor, 20 többszöröse oszlop', 'Nem 50 többszöröse sor, 20 többszöröse oszlop', 'Nem 50 többszöröse sor, Nem 20 többszöröse oszlop'],
    correctAnswer: 0,
    explanation: 'A 8150 50-re végződik → az 50 többszöröse (8150 = 163 · 50). 20-szal nem osztható, mert a tízesek helyén páratlan szám (5) áll.'
  },
  {
    id: 'ts-q20',
    level: 2,
    questionTypeBadge: 'Táblázat és halmazábra',
    question: 'Mona halmazábrájának (B: kék, C: radíros) melyik része felel meg a táblázat „Nem kék – Nem radíros” mezőjének?',
    options: ['A karikákon kívüli rész', 'A két karika közös része', 'Csak a B karika', 'Csak a C karika'],
    correctAnswer: 0,
    explanation: 'Ami se nem kék, se nem radíros, az egyik karikába sem kerül: a karikákon kívül, de a kereten belül van.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'ts-q21',
    level: 3,
    questionTypeBadge: 'Összesen',
    figure: FIG_TOTALS,
    question: 'Hány ceruzát válogatott szét Kitti összesen?',
    options: ['11', '10', '8', '7'],
    correctAnswer: 0,
    explanation: 'A négy mező együtt az összes ceruza: 2 + 5 + 3 + 1 = 11.'
  },
  {
    id: 'ts-q22',
    level: 3,
    questionTypeBadge: 'Halmazábra',
    figure: FIG_TOTALS,
    question: 'Hány ceruza került Mona valamelyik karikájába (kék vagy radíros, vagy mindkettő)?',
    options: ['10', '11', '7', '12'],
    correctAnswer: 0,
    explanation: 'Csak a sárga, radír nélküli ceruza marad kívül. 11 − 1 = 10. (Másképp: 2 + 5 + 3 = 10.) A 12 hiba lenne: a 2 kék radírost kétszer számolnánk.'
  },
  {
    id: 'ts-q23',
    level: 3,
    questionTypeBadge: 'Logikai lapok',
    figure: FIG_BLOCK_E,
    question: 'Az E lap zöld, lyukas négyzet. Melyik mezőbe kerül?',
    options: ['Lyukas sor, Nem kék oszlop', 'Lyukas sor, Kék oszlop', 'Nem lyukas sor, Nem kék oszlop', 'Nem lyukas sor, Kék oszlop'],
    correctAnswer: 0,
    explanation: 'Lyukas? igen → felső sor. Kék? nem (zöld) → Nem kék oszlop. Az alakja (négyzet) most nem számít, mert az nem szempont!'
  },
  {
    id: 'ts-q24',
    level: 3,
    questionTypeBadge: 'Vízi állatok',
    question: 'Állatok: cápa, béka, aranyhal, csikóhal, csiga, bálna, rák, polip, kagyló, delfin. Hány állat kerül a „Nem hal – Nem emlős” mezőbe?',
    options: ['5', '7', '3', '2'],
    correctAnswer: 0,
    explanation: 'Halak: cápa, aranyhal, csikóhal (3). Emlősök: bálna, delfin (2). A maradék: béka, csiga, rák, polip, kagyló – ez 5 állat.'
  },
  {
    id: 'ts-q25',
    level: 3,
    questionTypeBadge: 'Vonalak',
    figure: FIG_LINES,
    question: 'Táblázat: sorok Folytonos – Nem folytonos, oszlopok Egyenes – Görbe. Melyik mezőbe kerül a szabadkézi vonal?',
    options: ['Folytonos sor, Görbe oszlop', 'Folytonos sor, Egyenes oszlop', 'Nem folytonos sor, Görbe oszlop', 'Nem folytonos sor, Egyenes oszlop'],
    correctAnswer: 0,
    explanation: 'A szabadkézi vonal nem szakad meg → folytonos. Hullámos → görbe.'
  },
  {
    id: 'ts-q26',
    level: 3,
    questionTypeBadge: 'Elágazásos rajz',
    figure: FIG_TREE,
    question: 'Ha Kitti a második elágazásnál radír helyett hossz szerint válogatna (hosszú, közepes, rövid), hány ágvég lenne a rajz végén?',
    options: ['6', '5', '4', '9'],
    correctAnswer: 0,
    explanation: 'Az első elágazás 2 ág (kékek, nem kékek), mindkettő 3 felé ágazik: 2 · 3 = 6 ágvég.'
  },
  {
    id: 'ts-q27',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    figure: FIG_TOTALS,
    question: 'Mennyivel több a radíros ceruza, mint a radír nélküli?',
    options: ['3-mal', '2-vel', '4-gyel', '7-tel'],
    correctAnswer: 0,
    explanation: 'Radíros: 2 + 5 = 7. Radír nélküli: 3 + 1 = 4. A különbség: 7 − 4 = 3.'
  },
  {
    id: 'ts-q28',
    level: 3,
    questionTypeBadge: 'Számok táblázatban',
    question: 'Számok: 1246, 54, 600, 8002, 9998, 475, 33, 6606, 48, 9579, 1005, 8889, 77, 1001, 423. Hány szám kerül a „Nem páros – Nem négyjegyű” mezőbe?',
    options: ['4', '3', '5', '8'],
    correctAnswer: 0,
    explanation: 'Páratlan és legfeljebb háromjegyű: 475, 33, 77, 423 – ez 4 szám.'
  },
  {
    id: 'ts-q29',
    level: 3,
    questionTypeBadge: 'Hiányzó adat',
    figure: FIG_GIRLS,
    question: 'Az osztályban 6 lány van, közülük 2 szemüveges. Hány lány kerül a „Lány – Nem szemüveges” mezőbe?',
    options: ['4', '2', '6', '8'],
    correctAnswer: 0,
    explanation: 'A Lány sor két mezője együtt 6. Ha 2 szemüveges, akkor 6 − 2 = 4 nem szemüveges.'
  },
  {
    id: 'ts-q30',
    level: 3,
    questionTypeBadge: 'Szabály',
    question: 'Melyik állítás igaz a 2 × 2-es válogató táblázatra?',
    options: [
      'Minden elem pontosan egy mezőbe kerül',
      'Egy elem két mezőbe is kerülhet',
      'Üres mező nem lehet a táblázatban',
      'Táblázatba csak számokat lehet válogatni'
    ],
    correctAnswer: 0,
    explanation: 'Minden elemre egy sor és egy oszlop igaz, ezért pontosan egy mezőbe kerül. Üres mező lehet (pl. Hal – Emlős), és bármit válogathatunk: ceruzát, állatot, logikai lapot is.'
  }
];

export const TableSortingQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="valogatasok-csoportositasok"
      topicId="g4-group-tablazatok-quiz"
      subtopicId="valogatasok-tablazatokba"
      title="2. Válogatások táblázatokba – Kvíz"
      subtitle="30 feladat 3 szinten: 2 × 2-es táblázatok olvasása és kitöltése, elágazásos rajz, táblázat és halmazábra kapcsolata."
      badge="4. OSZTÁLY • VI. VÁLOGATÁSOK, CSOPORTOSÍTÁSOK • KVÍZ"
      questions={TABLE_SORTING_QUESTIONS}
      cheatSheets={[
        {
          title: 'A táblázat',
          items: ['Sor: az egyik szempont (pl. radíros – nem radíros).', 'Oszlop: a másik szempont (pl. kék – nem kék).', '2 · 2 = 4 mező.', 'Ahol a sor és az oszlop találkozik, oda kerül az elem.']
        },
        {
          title: 'Számolás a táblázatban',
          items: ['Egy sor két mezője együtt = az egész sor.', 'Egy oszlop két mezője együtt = az egész oszlop.', 'A 4 mező együtt = az összes elem.', 'Egy mező üres is lehet.']
        },
        {
          title: 'Három rajz – ugyanaz a válogatás',
          items: ['Elágazásos rajz: 4 ágvég.', 'Táblázat: 4 mező.', 'Halmazábra: 2 karika = 4 rész (közös rész és kívül is).', '„Nem kék – Nem radíros” = a karikákon kívül.']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <TableSortingMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <TableSortingSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default TableSortingQuiz;
