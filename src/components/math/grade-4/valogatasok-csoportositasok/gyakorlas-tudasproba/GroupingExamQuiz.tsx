import React from 'react';
import { QuizTemplate, QuizQuestion, DifficultyLevel } from '../QuizTemplate';
import { GroupingExamMatcher } from './GroupingExamMatcher';
import { GroupingExamSorter } from './GroupingExamSorter';
import { BlocksTableSvg, OutfitGridSvg } from './GroupingExamFigures';
import { Venn2, Venn3Frame, LogicBlock, LogicBlocksRowSvg, OtterBoatSvg, BlockColor, BlockShape } from '../valogatasok-halmazokba/SetSortingFigures';
import { PencilTreeSvg, PencilTableSvg, LineTypesSvg, AnimalTableSvg } from '../valogatasok-tablazatokba/TableSortingFigures';
import { RunnersTreeSvg, PodiumSvg, PairsSvg, NapkinsSvg, NumberCardsSvg } from '../hanyfele-lehetoseg-van/PossibilitiesFigures';
import { AnimalsGlobeSvg, ThreeSetsSvg, MfSetSvg } from '../igaz-vagy-hamis/TrueFalse4Figures';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const QCLS = 'w-full max-w-[300px] h-auto mx-auto';

const animalVenn = (q: string) => <Venn2 className={QCLS} frame="ÁLLATOK" labelA="Madár" labelB="Háziállat" pending={q} />;
const mf5Venn = (q: string) => <Venn2 className={QCLS} frame="Négyjegyű számok" labelA="Az 50 többszörösei" labelB="A 20 többszörösei" pending={q} fontSize={12} />;
const numVenn = (q: string) => <Venn2 className={QCLS} frame="Számok" labelA="Páros számok" labelB="Négyjegyű számok" colorB="#2563eb" pending={q} />;
const logicVenn = (color: BlockColor, shape: BlockShape, holed: boolean) => (
  <svg viewBox="0 0 360 240" className={QCLS}>
    <Venn3Frame />
    <rect x="290" y="14" width="62" height="62" rx="10" fill="#ffffff" stroke="#94a3b8" />
    <LogicBlock x={321} y={45} shape={shape} color={color} holed={holed} s={34} />
  </svg>
);
const FIG_LOGIC_EMPTY = (
  <svg viewBox="0 0 360 240" className={QCLS}>
    <Venn3Frame />
  </svg>
);

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

const box = (title: string, nums: string[], color = '#16a34a') => (
  <svg viewBox="0 0 240 130" className="w-full max-w-[260px] h-auto mx-auto" fontFamily="system-ui, sans-serif">
    <ellipse cx="120" cy="70" rx="112" ry="54" fill={color} fillOpacity="0.1" stroke={color} strokeWidth="2.2" />
    <rect x="62" y="6" width="116" height="22" rx="6" fill="#ffffff" stroke={color} strokeWidth="1.6" />
    <text x="120" y="21" fontSize="11" fontWeight="bold" textAnchor="middle" fill={color}>
      {title}
    </text>
    {nums.map((n, i) => (
      <text key={n} x={52 + (i % 4) * 46} y={i < 4 ? 62 : 92} fontSize="12.5" fontWeight="bold" textAnchor="middle" fill="#1e293b">
        {n}
      </text>
    ))}
  </svg>
);

const FIG_GLOBE = <AnimalsGlobeSvg className={QCLS} />;
const FIG_SETS = <ThreeSetsSvg className={QCLS} />;
const FIG_SET_A = <ThreeSetsSvg className="w-full max-w-[320px] h-auto mx-auto" only={['A']} />;
const FIG_SET_B = <ThreeSetsSvg className="w-full max-w-[320px] h-auto mx-auto" only={['B']} />;
const FIG_SET_C = <ThreeSetsSvg className="w-full max-w-[320px] h-auto mx-auto" only={['C']} />;
const FIG_MF = <MfSetSvg className="w-full max-w-[200px] h-auto mx-auto" />;
const FIG_BLOCKS = <LogicBlocksRowSvg className={QCLS} />;
const FIG_OTTER = <OtterBoatSvg className={QCLS} />;
const FIG_TREE = <PencilTreeSvg className={QCLS} />;
const FIG_PTABLE = <PencilTableSvg className={QCLS} />;
const FIG_LINES = <LineTypesSvg className={QCLS} />;
const FIG_ATABLE = <AnimalTableSvg className={QCLS} />;
const FIG_RUNNERS = <RunnersTreeSvg className={QCLS} hideLeaves />;
const FIG_PODIUM_A = <PodiumSvg className={QCLS} names={['A', '?', '?']} />;
const FIG_LAKES4 = <PairsSvg className={QCLS} labels={['A', 'B', 'C', 'D']} showLines={false} />;
const FIG_LAKES5 = <PairsSvg className={QCLS} showLines={false} />;
const FIG_FRIENDS3 = <PairsSvg className={QCLS} labels={['A', 'B', 'C']} showLines={false} />;
const FIG_FRIENDS5 = <PairsSvg className={QCLS} labels={['A', 'B', 'C', 'D', 'E']} showLines={false} />;
const FIG_NAPKINS = <NapkinsSvg className={QCLS} />;
const FIG_C47 = <NumberCardsSvg className="w-full max-w-[160px] h-auto mx-auto" digits={['4', '7']} />;
const FIG_C123 = <NumberCardsSvg className="w-full max-w-[220px] h-auto mx-auto" />;
const FIG_C057 = <NumberCardsSvg className="w-full max-w-[220px] h-auto mx-auto" digits={['0', '5', '7']} />;
const FIG_EVEN3_30 = <Venn2 className={QCLS} frame="Számok 1-től 30-ig" labelA="Páros" labelB="3 többszöröse" both={['? db']} colorA="#0891b2" colorB="#d97706" fontSize={14} />;
const FIG_BTABLE = <BlocksTableSvg className={QCLS} />;
const FIG_OUTFIT = <OutfitGridSvg className={QCLS} />;
const FIG_NUMTABLE = table2(['Páros', 'Nem páros'], ['Négyjegyű', 'Nem négyjegyű'], ['', '', '', ''], '#16a34a');
const FIG_NUMTABLE_WRONG = table2(['Páros', 'Nem páros'], ['Négyjegyű', 'Nem négyjegyű'], ['1246 8002', '54 600 475', '9579 1005', '33 77'], '#16a34a');
const FIG_TOTALS = table2(['Radíros', 'Nem radíros'], ['Kék', 'Nem kék'], ['2', '?', '3', '1'], '#dc2626');
const FIG_TOTALS_FULL = table2(['Radíros', 'Nem radíros'], ['Kék', 'Nem kék'], ['2', '5', '3', '1'], '#dc2626');
const FIG_GLASSES = table2(['Lány', 'Fiú'], ['Szemüveges', 'Nem szemüveges'], ['', '', '', ''], '#0284c7');
const FIG_GLASSES_Q = table2(['Lány', 'Fiú'], ['Szemüveges', 'Nem szemüveges'], ['2', '4', '3', '?'], '#0284c7');
const FIG_ODD1 = box('Melyik nem illik?', ['2450', '3870', '5610', '7225', '9030'], '#dc2626');
const FIG_ODD2 = box('Melyik nem illik?', ['1111', '3579', '7313', '5555', '2468'], '#2563eb');
const FIG_ROW_10 = box('Számok', ['10', '20', '30', '45'], '#9333ea');
const FIG_ROW_ODD = box('Melyiket vegyük ki?', ['15', '25', '35', '40', '55'], '#e11d48');

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
let n = 0;
const Q = (
  level: DifficultyLevel,
  badge: string,
  question: string,
  options: string[],
  explanation: string,
  figure?: React.ReactNode
): QuizQuestion => ({ id: `ge-q${++n}`, level, questionTypeBadge: badge, question, options, correctAnswer: 0, explanation, ...(figure ? { figure } : {}) });

const IN_BOTH = 'A két karika közös részébe';
const ONLY_L = (l: string) => `Csak a(z) ${l} karikába`;
const OUT = 'A karikákon kívülre, de a keretbe';

export const GROUPING_EXAM_QUESTIONS: QuizQuestion[] = [
  // ======================= 1. SZINT (30) =======================
  // Halmazok
  Q(1, 'Halmazábra', 'Hova kerül a tyúk?', [IN_BOTH, ONLY_L('Madár'), ONLY_L('Háziállat'), OUT], 'A tyúk madár is és háziállat is – mindkét címke igaz rá, ezért a közös részbe kerül.', animalVenn('🐔 tyúk')),
  Q(1, 'Halmazábra', 'Hova kerül a gólya?', [ONLY_L('Madár'), IN_BOTH, ONLY_L('Háziállat'), OUT], 'A gólya madár, de nem háziállat: csak a Madár karikába kerül.', animalVenn('🕊️ gólya')),
  Q(1, 'Halmazábra', 'Hova kerül a kecske?', [ONLY_L('Háziállat'), ONLY_L('Madár'), IN_BOTH, OUT], 'A kecske háziállat, de nem madár: csak a Háziállat karikába kerül.', animalVenn('🐐 kecske')),
  Q(1, 'Halmazábra', 'Hova kerül az őz?', [OUT, ONLY_L('Madár'), ONLY_L('Háziállat'), IN_BOTH], 'Az őz se nem madár, se nem háziállat. Állat, ezért a kereten belül, a karikákon kívül a helye.', animalVenn('🦌 őz')),
  Q(1, 'Kakukktojás', 'Melyik szám a kakukktojás?', ['7225', '2450', '5610', '9030'], 'A többi szám 0-ra végződik (kerek tízes), a 7225 5-re. Ő nem illik a csoportba.', FIG_ODD1),
  Q(1, 'Kakukktojás', 'Melyik szám a kakukktojás?', ['2468', '1111', '3579', '5555'], 'A többi szám páratlan, a 2468 páros (8-ra végződik).', FIG_ODD2),
  Q(1, 'Címke', 'A halmaz címkéje: „Háromjegyű számok”. Melyik szám NEM kerülhet bele?', ['1000', '999', '100', '505'], 'Az 1000 már négyjegyű. A 100, az 505 és a 999 háromjegyű.'),
  Q(1, 'Halmaz a halmazban', 'Hol van a „Négyszögek” karika a „Sokszögek” karikához képest?', ['Teljesen a Sokszögek karikán belül', 'Teljesen azon kívül', 'Csak egy kis közös részük van', 'Ugyanakkora, egybeesik vele'], 'Minden négyszög sokszög, ezért a Négyszögek karika a Sokszögek karikán belül van (MF II. 51. o. 11.).'),
  // Táblázat
  Q(1, 'Táblázat', 'Hova kerül Peti, aki fiú, és nem szemüveges?', ['Fiú sor, Nem szemüveges oszlop', 'Lány sor, Nem szemüveges oszlop', 'Fiú sor, Szemüveges oszlop', 'Lány sor, Szemüveges oszlop'], 'Sor: fiú. Oszlop: nem szemüveges. A kettő találkozása a jobb alsó mező.', FIG_GLASSES),
  Q(1, 'Táblázat', 'Hova kerül a delfin ebben a táblázatban?', ['Nem hal sor, Emlős oszlop', 'Hal sor, Emlős oszlop', 'Hal sor, Nem emlős oszlop', 'Nem hal sor, Nem emlős oszlop'], 'A delfin a vízben él, de emlős, nem hal.', table2(['Hal', 'Nem hal'], ['Emlős', 'Nem emlős'], ['', '', '', ''], '#0e7490')),
  Q(1, 'Mezők száma', 'Hány mezője van egy 2 × 2-es válogató táblázatnak?', ['4', '2', '3', '6'], '2 sor és 2 oszlop: 2 · 2 = 4 mező.'),
  Q(1, 'Számok táblázatban', 'Hova kerül a 8002?', ['Páros sor, Négyjegyű oszlop', 'Páros sor, Nem négyjegyű oszlop', 'Nem páros sor, Négyjegyű oszlop', 'Nem páros sor, Nem négyjegyű oszlop'], 'A 8002 2-re végződik (páros), és négy számjegye van.', FIG_NUMTABLE),
  Q(1, 'Számok táblázatban', 'Hova kerül a 77?', ['Nem páros sor, Nem négyjegyű oszlop', 'Páros sor, Nem négyjegyű oszlop', 'Nem páros sor, Négyjegyű oszlop', 'Páros sor, Négyjegyű oszlop'], 'A 77 páratlan, és kétjegyű.', FIG_NUMTABLE),
  Q(1, 'Táblázat olvasása', 'Hány nem kék, radíros ceruza van Kitti válogatásában?', ['5', '2', '3', '1'], 'A Radíros sor és a Nem kék oszlop találkozásánál 5 ceruza van (piros, lila, sárga, két zöld).', FIG_TREE),
  Q(1, 'Vonalak', 'A „folytonos – szaggatott” szempont szerint hova kerül a vastag vonal?', ['A folytonos vonalak közé', 'A szaggatott vonalak közé', 'A görbe vonalak közé', 'Sehova, mert vastag'], 'A vastag vonal nem szakad meg, tehát folytonos. A vastagság itt nem szempont.', FIG_LINES),
  // Lehetőségek
  Q(1, 'Sorrend', 'Ádám és Bea sorba áll. Hányféle sorrendben állhatnak?', ['2', '1', '3', '4'], 'Ádám–Bea vagy Bea–Ádám: 2 sorrend.'),
  Q(1, 'Sorrend', 'Zoli, Peti és Andris libasorban megy. Hányféle sorrendben mehetnek?', ['6', '3', '9', '4'], 'Mindegyik fiúval 2 sorrend kezdődik: 3 · 2 = 6.'),
  Q(1, 'Számkártyák', 'Hány kétjegyű szám rakható ki a 4-es és a 7-es kártyával (mindkettőt felhasználva)?', ['2', '1', '4', '3'], '47 és 74 – ez 2 szám.', FIG_C47),
  Q(1, 'Öltözet', 'Van 2 pólód és 3 nadrágod. Hányféle öltözetet állíthatsz össze?', ['6', '5', '3', '8'], 'Mindkét pólóhoz 3 nadrág: 2 · 3 = 6. (Az 5 az összeadás hibája.)', FIG_OUTFIT),
  Q(1, 'Párok', 'A, B és C párokban játszik. Hány pár alakítható? (AB = BA)', ['3', '6', '2', '9'], 'AB, AC, BC – 3 pár.', FIG_FRIENDS3),
  Q(1, 'Elágazásos rajz', 'Kitti rajzán hány ágvég van?', ['4', '2', '3', '11'], '2 színág, mindkettő 2 felé ágazik: 2 · 2 = 4.', FIG_TREE),
  Q(1, 'Hiányzó lehetőség', 'Az 1, 2, 3 kártyával kirakott számok: 123, 132, 213, 231, 312. Melyik hiányzik?', ['321', '123', '312', '322'], 'A 3-mal kezdődők közül hiányzik a 321. (A 322-höz két 2-es kártya kellene.)', FIG_C123),
  Q(1, 'Dobogó', 'Anna lett az első. Hányféleképpen állhat a 2. és 3. helyen Bianka és Cecília?', ['2', '1', '3', '6'], 'A–B–C vagy A–C–B: 2 lehetőség.', FIG_PODIUM_A),
  // Igaz / hamis
  Q(1, 'Van közöttük', 'Igaz vagy hamis a képen látható állatokra: „Van közöttük emlősállat.”?', ['Igaz, például a farkas', 'Hamis, mert mindegyik madár', 'Hamis, mert nincs közöttük medve', 'Nem lehet eldönteni'], 'Egy példa elég: a farkas (vagy a tigris, a medve) emlős.', FIG_GLOBE),
  Q(1, 'Egyik sem', 'Igaz vagy hamis az A halmazra: „Egyik eleme sem páratlan.”?', ['Igaz', 'Hamis, mert az 54 páratlan', 'Hamis, mert az 1246 páratlan', 'Hamis, mert a 600 páratlan'], 'Az A minden száma páros, tehát egyik sem páratlan.', FIG_SET_A),
  Q(1, 'Mindegyik', 'Igaz vagy hamis a C halmazra: „Mindegyik eleme páratlan.”?', ['Igaz', 'Hamis, mert az 1001 páros', 'Hamis, mert a 423 páros', 'Hamis, mert a 77 páros'], 'A C halmaz számai 5-re, 9-re, 7-re, 1-re, 3-ra végződnek: mind páratlan.', FIG_SET_C),
  Q(1, 'Ellenpélda', 'Igaz vagy hamis: „Mindegyik szám a 10 többszöröse.”?', ['Hamis, mert a 45 nem a 10 többszöröse', 'Igaz, mert a 10, 20, 30 jó', 'Igaz, mert a 45 is kerek', 'Hamis, mert a 20 nem jó'], 'A 45 5-re végződik, nem a 10 többszöröse – egy ellenpélda elég.', FIG_ROW_10),
  Q(1, 'Szavak', 'Mit jelent: „Van olyan …”?', ['Legalább egy ilyen van', 'Mindegyik ilyen', 'Egy sincs ilyen', 'Pontosan kettő ilyen van'], 'A „van olyan” már egyetlen ilyen elemmel is igaz.'),
  Q(1, 'Nincs közöttük', 'Igaz vagy hamis a képen látható állatokra: „Nincs közöttük háziállat.”?', ['Igaz, mert mindegyik vadon élő állat', 'Hamis, mert a farkas háziállat', 'Hamis, mert a vidra háziállat', 'Hamis, mert a pingvin háziállat'], 'A képen csak vadon élő állatok vannak, háziállat nincs.', FIG_GLOBE),
  Q(1, 'Minden', 'Igaz vagy hamis: „A halmazban minden szám páratlan.”?', ['Hamis, mert a 4016 páros', 'Igaz, mert a 3063 páratlan', 'Igaz, mert az 5939 páratlan', 'Hamis, mert a 9705 páratlan'], 'A 4016 páros – ez ellenpélda, az állítás hamis.', FIG_MF),

  // ======================= 2. SZINT (30) =======================
  Q(2, 'Számok halmazai', 'Hova kerül a 9500?', [IN_BOTH, ONLY_L('Az 50 többszörösei'), ONLY_L('A 20 többszörösei'), OUT], '9500 = 190 · 50 és 9500 = 475 · 20. Mindkettőnek többszöröse (00-ra végződik).', mf5Venn('9500')),
  Q(2, 'Számok halmazai', 'Hova kerül a 8150?', [ONLY_L('Az 50 többszörösei'), IN_BOTH, ONLY_L('A 20 többszörösei'), OUT], 'A 8150 50-re végződik: az 50 többszöröse. A 20-nak nem, mert a tízesek helyén páratlan (5) áll.', mf5Venn('8150')),
  Q(2, 'Számok halmazai', 'Hova kerül a 4580?', [ONLY_L('A 20 többszörösei'), ONLY_L('Az 50 többszörösei'), IN_BOTH, OUT], '4580 = 229 · 20. Az 50 többszörösei 00-ra vagy 50-re végződnek, a 4580 nem.', mf5Venn('4580')),
  Q(2, 'Páros és négyjegyű', 'Hova kerül az 1001?', [ONLY_L('Négyjegyű számok'), ONLY_L('Páros számok'), IN_BOTH, OUT], 'Az 1001 négyjegyű, de 1-re végződik, tehát páratlan.', numVenn('1001')),
  Q(2, 'Páros és négyjegyű', 'Hova kerül a 48?', [ONLY_L('Páros számok'), ONLY_L('Négyjegyű számok'), IN_BOTH, OUT], 'A 48 páros, de csak kétjegyű.', numVenn('48')),
  Q(2, 'Logikai lapok', 'Melyik számú részbe kerül a kék, lyukas négyzet?', ['2', '1', '5', '3'], 'Kék? igen. Lyukas? igen. Háromszög? nem → a Kék és a Lyukas közös része, a Háromszögön kívül: 2.', logicVenn('kék', 'négyzet', true)),
  Q(2, 'Logikai lapok', 'Melyik számú részbe kerül a zöld, nem lyukas háromszög?', ['7', '4', '6', '8'], 'Kék? nem. Lyukas? nem. Háromszög? igen → csak a Háromszög karika: 7.', logicVenn('zöld', 'háromszög', false)),
  Q(2, 'Művelet + halmaz', 'Melyik halmazba kerül a 250 · 3 + 750 művelet betűjele: 1500, 2800 vagy 7200?', ['1500', '2800', '7200', 'Egyikbe sem'], 'Először szorzunk: 250 · 3 = 750. Aztán: 750 + 750 = 1500.'),
  Q(2, 'Táblázat és halmazábra', 'A táblázat „Kék – Radíros” mezőjének melyik rész felel meg Mona halmazábráján (B: kék, C: radíros)?', ['A két karika közös része', 'A karikákon kívüli rész', 'Csak a B karika', 'Csak a C karika'], 'Kék IS és radíros IS → mindkét karikában benne van: a közös rész.'),
  Q(2, 'Táblázat olvasása', 'Hány radíros ceruza van összesen?', ['7', '5', '2', '11'], 'A Radíros sor két mezője: 2 + 5 = 7.', FIG_TOTALS_FULL),
  Q(2, 'Hibakeresés', 'Melyik szám került rossz mezőbe?', ['475', '600', '1005', '33'], 'A 475 5-re végződik, nem páros. A „Nem páros – Nem négyjegyű” mezőbe való.', FIG_NUMTABLE_WRONG),
  Q(2, 'Logikai lapok', 'Az F lap kék, lyukas, kis négyzet. Melyik mezőbe kerül?', ['Lyukas sor, Kék oszlop', 'Lyukas sor, Nem kék oszlop', 'Nem lyukas sor, Kék oszlop', 'Nem lyukas sor, Nem kék oszlop'], 'Lyukas? igen → felső sor. Kék? igen → Kék oszlop. A mérete és az alakja most nem szempont.', FIG_BTABLE),
  Q(2, 'Hiányzó adat', 'Az osztályban 7 fiú van, közülük 3 szemüveges. Hány fiú kerül a „Fiú – Nem szemüveges” mezőbe?', ['4', '3', '7', '10'], 'A Fiú sor két mezője együtt 7: 7 − 3 = 4.', FIG_GLASSES_Q),
  Q(2, 'Vízi állatok', 'Melyik állat kerül a „Hal – Nem emlős” mezőbe?', ['csikóhal', 'delfin', 'bálna', 'béka'], 'A csikóhal furcsa alakú, de hal. A delfin és a bálna emlős, a béka kétéltű.', FIG_ATABLE),
  Q(2, 'Fa és táblázat', 'Kitti rajzán a „nem kékek → radíros” ágvég melyik táblázatmezőnek felel meg?', ['Radíros sor, Nem kék oszlop', 'Radíros sor, Kék oszlop', 'Nem radíros sor, Nem kék oszlop', 'Nem radíros sor, Kék oszlop'], 'Az ág két tulajdonságot mond: nem kék és radíros. Ez a táblázat jobb felső mezője.', FIG_PTABLE),
  Q(2, 'Számkártyák', 'Hány háromjegyű szám rakható ki az 1, 2, 3 kártyával (mindegyiket egyszer használva)?', ['6', '3', '9', '27'], '123, 132, 213, 231, 312, 321: 6 szám.', FIG_C123),
  Q(2, 'Számkártyák', 'Hány háromjegyű szám rakható ki a 0, 5, 7 kártyával (mindegyiket egyszer használva)?', ['4', '6', '3', '2'], 'A 0 nem állhat elöl: 507, 570, 705, 750 – 4 szám.', FIG_C057),
  Q(2, 'Párok', 'Az A, B, C, D tavakat párba állítjuk (AB = BA). Hány pár van?', ['6', '12', '4', '8'], 'AB, AC, AD, BC, BD, CD: 3 + 2 + 1 = 6 pár.', FIG_LAKES4),
  Q(2, 'Párok', 'Az A, B, C, D, E tavakat párba állítjuk (AB = BA). Hány pár van?', ['10', '20', '5', '15'], '4 + 3 + 2 + 1 = 10 pár.', FIG_LAKES5),
  Q(2, 'Logikai lapok', 'Piros és kék lapot gyártunk, mindegyik színből kört, háromszöget, négyzetet és téglalapot. Hányféle lap lesz?', ['8', '6', '4', '16'], '2 szín · 4 alak = 8 lap.'),
  Q(2, 'Elágazásos rajz', 'Dániel fut be elsőnek. Hány sorrend lehet a rajz szerint?', ['6', '3', '4', '24'], 'A 2. helyre 3 fiú jöhet, utána 2, majd 1: 3 · 2 · 1 = 6.', FIG_RUNNERS),
  Q(2, 'Sorrend', 'Máté, Bence és Gergő mellé beállt Balázs, aki mindig utolsó. Hányféle sorrend lehetséges?', ['6', '24', '4', '8'], 'Balázs helye biztos, csak a másik három sorrendje változik: 6.'),
  Q(2, 'Logikai lapok', 'Piros, kék és sárga köröket gyártunk, lyukasat is, nem lyukasat is. Hányféle kör lesz?', ['6', '5', '3', '4'], '3 szín · 2 (lyukas, nem lyukas) = 6.'),
  Q(2, 'Nincs olyan', 'Igaz vagy hamis a képen látható állatokra: „Nincs olyan madár, amelyik ragadozó.”?', ['Hamis, mert a rétisas ragadozó madár', 'Igaz, mert a pingvin nem repül', 'Hamis, mert a tigris ragadozó', 'Igaz, mert a madarak nem vadásznak'], 'A rétisas (és a hóbagoly) ragadozó madár. A tigris nem madár, ezért ő nem cáfolja.', FIG_GLOBE),
  Q(2, 'Nem mindegyik', 'Igaz vagy hamis: „Nem mindegyik madár tud repülni.”?', ['Igaz, mert a pingvin nem tud repülni', 'Hamis, mert a sas tud repülni', 'Hamis, mert egyik madár sem tud repülni', 'Igaz, mert egyik madár sem tud repülni'], 'A „nem mindegyik” = van olyan, amelyik nem. A pingvin ilyen.', FIG_GLOBE),
  Q(2, 'Ugyanazt jelenti', 'Melyik jelenti ugyanazt, mint: „Mindegyik eleme páros.”?', ['Egyik eleme sem páratlan.', 'Van olyan eleme, amelyik páros.', 'Egyik eleme sem páros.', 'Nem mindegyik eleme páratlan.'], 'Ha mindegyik páros, akkor egy páratlan sincs: „egyik eleme sem páratlan”.'),
  Q(2, 'Melyik halmazra?', 'Melyik halmazra igaz: „Van olyan eleme, amelyik nem páratlan.”?', ['Az A-ra és a B-re', 'Csak az A-ra', 'Csak a C-re', 'A B-re és a C-re'], 'Nem páratlan = páros. Páros szám van az A-ban és a B-ben (6606, 48), a C-ben nincs.', FIG_SETS),
  Q(2, 'Van olyan', 'Igaz vagy hamis: „Van olyan szám, amelyben a számjegyek összege 26.”?', ['Igaz: 5939', 'Igaz: 8808', 'Igaz: 6624', 'Hamis: nincs ilyen'], '5 + 9 + 3 + 9 = 26. A 8808 összege 24, a 6624-é 18.', FIG_MF),
  Q(2, 'Nincs olyan', 'Igaz vagy hamis: „Nincs olyan szám, amelyben három egyforma számjegy van.”?', ['Hamis: 7000 és 8808', 'Igaz: mindegyik számjegy más', 'Hamis: 6624', 'Igaz: legfeljebb két egyforma van'], 'A 7000-ben három 0, a 8808-ban három 8 van, ezért a „nincs olyan” hamis.', FIG_MF),
  Q(2, 'Ellenpélda', 'Melyik szám ellenpélda erre: „Minden háromjegyű szám páratlan.”?', ['600', '475', '4016', '33'], 'Az ellenpélda háromjegyű és páros: 600. A 475 páratlan (nem cáfol), a 4016 és a 33 nem háromjegyű.'),

  // ======================= 3. SZINT (30) =======================
  Q(3, 'Leolvasás', 'Hány gyerek csónakázott összesen?', ['11', '3', '8', '16'], 'A kék keretbe a közös rész is beletartozik: 8 (mindkettő) + 3 (csak csónakázott) = 11.', FIG_OTTER),
  Q(3, 'Leolvasás', 'Hány gyerek vett részt legalább az egyik programon?', ['16', '24', '13', '11'], '5 csak vidraetetés + 8 mindkettő + 3 csak csónakázás = 16. (A 24-nél a közös részt kétszer számolnánk.)', FIG_OTTER),
  Q(3, 'Számolás a halmazban', 'A 2350, 4580, 5600, 7200, 8060, 9500, 4200, 8150, 1040, 1530 számok közül hány kerül csak „A 20 többszörösei” részbe?', ['3', '7', '4', '2'], 'A 20 többszörösei: 4580, 5600, 7200, 8060, 9500, 4200, 1040 (7 db). Ebből 5600, 7200, 9500, 4200 az 50-é is. Csak a 20-é: 4580, 8060, 1040 – 3 szám.'),
  Q(3, 'Logikai lapok', 'A tankönyv A–H lapjai közül hány kerül a Kék karikába (bárhová a karikán belül)?', ['4', '2', '3', '5'], 'Kék lapok: B, D, F, G – ez 4. A karikán belül a közös részek is beletartoznak.', FIG_BLOCKS),
  Q(3, 'Logikai lapok', 'A tankönyv A–H lapjai közül melyik kerül az 5. részbe (mindhárom karika közös része)?', ['G', 'A', 'B', 'F'], 'Az 5. részbe a kék, lyukas háromszög kerül: ez a G. Az A sárga, a B nem lyukas, az F négyzet.', FIG_BLOCKS),
  Q(3, 'Összeadás + halmaz', 'Számold ki: 2068 + 1918. Hova kerül az összeg, ha a karikák: „Páros” és benne „Számjegyeinek összege 15”?', ['A Páros karikába, de a belső karikán kívül', 'A belső karikába', 'A karikákon kívülre', 'Egyik helyre sem'], '2068 + 1918 = 3986. Páros (6-ra végződik). Számjegyösszeg: 3 + 9 + 8 + 6 = 26, nem 15.'),
  Q(3, 'Összeadás + halmaz', 'Számold ki: 2500 + 1790. Hova kerül az összeg (Páros karika, benne „Számjegyeinek összege 15”)?', ['A belső karikába (számjegyösszeg 15)', 'A Páros karikába, de a belső karikán kívül', 'A karikákon kívülre', 'Egyik helyre sem'], '2500 + 1790 = 4290. Páros, és 4 + 2 + 9 + 0 = 15 → a belső karikába kerül.'),
  Q(3, 'Közös rész', 'A „Páros” és a „3 többszöröse” karikába válogatjuk az 1–30 számokat. Hány szám kerül a közös részbe?', ['5', '15', '10', '4'], 'Páros és 3 többszöröse is: 6, 12, 18, 24, 30 – ez 5 szám (a 6 többszörösei).', FIG_EVEN3_30),
  Q(3, 'Táblázat és halmazábra', 'Hány ceruza került Mona valamelyik karikájába (kék vagy radíros, vagy mindkettő)?', ['10', '11', '7', '12'], 'Csak a sárga, radír nélküli marad kívül: 11 − 1 = 10. (2 + 5 + 3 = 10.)', FIG_TOTALS_FULL),
  Q(3, 'Mezők száma', 'A sorok: Radíros – Nem radíros, az oszlopok: Kék – Piros – Sárga. Hány mezője van a táblázatnak?', ['6', '5', '4', '9'], '2 sor és 3 oszlop: 2 · 3 = 6 mező.'),
  Q(3, 'Számok táblázatban', 'A 15 szám (1246, 54, 600, 8002, 9998, 475, 33, 6606, 48, 9579, 1005, 8889, 77, 1001, 423) közül hány kerül a „Páros – Négyjegyű” mezőbe?', ['4', '3', '5', '8'], 'Páros és négyjegyű: 1246, 8002, 9998, 6606 – 4 szám.'),
  Q(3, 'Hiányzó adat', 'A Radíros sorban összesen 7 ceruza van, a „Kék – Radíros” mezőben 2. Hány ceruza van a „Nem kék – Radíros” mezőben?', ['5', '9', '2', '7'], 'A sor két mezője együtt 7: 7 − 2 = 5.', FIG_TOTALS),
  Q(3, 'Logikai lapok', 'A tankönyv A–H lapjai közül hány kerül a „Lyukas – Nem kék” mezőbe?', ['2', '4', '1', '3'], 'Lyukas lapok: A, E, F, G. Ebből nem kék: A (sárga), E (zöld) – 2 lap.', FIG_BLOCKS),
  Q(3, 'Vízi állatok', 'Cápa, béka, aranyhal, csikóhal, csiga, bálna, rák, polip, kagyló, delfin. Hány állat kerül a „Nem hal” sorba?', ['7', '5', '2', '3'], 'Hal: cápa, aranyhal, csikóhal (3). A többi 10 − 3 = 7 állat nem hal (bálna, delfin, béka, csiga, rák, polip, kagyló).'),
  Q(3, 'Üres mező', 'Sorok: Folytonos – Nem folytonos, oszlopok: Egyenes – Görbe. A tankönyv vonalai (vékony, vastag, szaggatott, pontvonal, szabadkézi) közül melyik kerül a „Nem folytonos – Görbe” mezőbe?', ['Egyik sem: ez a mező üres marad', 'a szaggatott vonal', 'a szabadkézi vonal', 'a pontvonal'], 'A szaggatott és a pontvonal egyenes, a szabadkézi vonal folytonos. Nem folytonos, görbe vonal nincs a képen.', FIG_LINES),
  Q(3, 'Sorrend', 'Alex, Barna, Csaba és Dániel fut. Hányféle sorrendben érhetnek célba, ha bárki lehet az első?', ['24', '12', '16', '6'], 'Mind a 4 fiú lehet az első, és mindegyik után 6 sorrend van: 4 · 6 = 24.'),
  Q(3, 'Feltétel', 'A négy fiú versenyén Alex megelőzi Barnát és Csabát is. Hányféle sorrend lehet?', ['8', '6', '12', '4'], 'A–B–Cs vagy A–Cs–B (2), és Dániel 4 helyre állhat be közéjük: 2 · 4 = 8.'),
  Q(3, 'Feltétel', 'Csaba fut be másodiknak, és Dániel előbb ér célba, mint Barna. Hány sorrend lehet?', ['3', '2', '6', '4'], 'A–Cs–D–B, D–Cs–A–B, D–Cs–B–A: 3 sorrend.'),
  Q(3, 'Választás', '5 színű szalvétából (sárga, piros, kék, zöld, fehér) hányféleképpen vehetsz 3 különböző színűt?', ['10', '15', '60', '5'], 'Rendszerezve: SPK, SPZ, SPF, SKZ, SKF, SZF, PKZ, PKF, PZF, KZF – 10 lehetőség.', FIG_NAPKINS),
  Q(3, 'Sorrend', 'A szülők közrefogják a kisfiút, és Anna is velük sétál. Hányféleképpen haladhatnak négyen egymás mellett?', ['4', '2', '6', '24'], 'Apa–fiú–anya vagy anya–fiú–apa (2), Anna a bal vagy a jobb szélre áll (2): 2 · 2 = 4.'),
  Q(3, 'Kézfogás', '5 barát (A, B, C, D, E) mindegyike mindenkivel egyszer kezet fog. Hány kézfogás lesz?', ['10', '20', '25', '15'], 'Mint a párok: 4 + 3 + 2 + 1 = 10. (A 20 hiba: minden kézfogást kétszer számolnánk.)', FIG_FRIENDS5),
  Q(3, 'Csoportok', 'Két fiú, két lány és két kiskutya közül hárman szaladnak a labdáért. Hányféle lehet a hármas, ha csak azt nézzük, hány fiú, lány és kutya van benne?', ['7', '6', '8', '3'], 'FFL, FFK, LLF, LLK, KKF, KKL, FLK – 7. Három egyforma nem lehet, mert mindegyikből csak 2 van.'),
  Q(3, 'Ismétlés', 'Hány kétjegyű szám írható az 1, 2, 3 számjegyekkel, ha egy számjegyet többször is használhatsz (pl. 11)?', ['9', '6', '3', '27'], 'A tízesek helyére 3-féle, az egyesek helyére is 3-féle számjegy kerülhet: 3 · 3 = 9 (11, 12, 13, 21, 22, 23, 31, 32, 33).'),
  Q(3, 'Két olyan', 'Igaz vagy hamis: „Két olyan szám van, amely ezresekre kerekített értéke a kisebb ezres számszomszédja.”?', ['Igaz: a 3063 és a 4016', 'Hamis: csak a 3063', 'Hamis: négy ilyen van', 'Igaz: a 6624 és a 8808'], '3063 → 3000 és 4016 → 4000 lefelé kerekedik. A 6624, 8808, 9705, 5939 felfelé, a 7000 már kerek ezres.', FIG_MF),
  Q(3, 'Logikai lapok', 'Igaz vagy hamis: „Mindegyik kék lap háromszög.”?', ['Hamis: a D kék négyzet', 'Igaz: a B és a G kék háromszög', 'Hamis: az A sárga háromszög', 'Igaz: minden háromszög kék'], 'Kék lapok: B, D, F, G. A D és az F négyzet – ellenpélda. Az A nem kék, nem számít.', FIG_BLOCKS),
  Q(3, 'Logikai lapok', 'Igaz vagy hamis: „Egyik zöld lap sem lyukas.”?', ['Hamis: az E zöld, lyukas négyzet', 'Igaz: a C és a H nem lyukas', 'Igaz: nincs zöld lap', 'Hamis: a G zöld és lyukas'], 'Zöld lapok: C, E, H. Az E lyukas, ezért az „egyik sem” hamis. A G kék.', FIG_BLOCKS),
  Q(3, 'Tagadás', 'Mi az ellentéte annak, hogy „Van olyan gyerek, aki csónakázott.”?', ['Egyik gyerek sem csónakázott.', 'Van olyan gyerek, aki nem csónakázott.', 'Mindegyik gyerek csónakázott.', 'Nem mindegyik gyerek csónakázott.'], 'A „van olyan” akkor hamis, ha egy sincs: „Egyik gyerek sem csónakázott.”'),
  Q(3, 'Halmazábra', 'Igaz vagy hamis: „Mindegyik gyerek, aki csónakázott, a vidraetetést is nézte.”?', ['Hamis: András csak csónakázott', 'Igaz: Éva mindkettőn ott volt', 'Hamis: Dóri nem csónakázott', 'Igaz: van közös rész'], 'András, Zsuzsi és Józsi csónakázott, de nem nézte a vidraetetést – ellenpéldák. Dóri nem csónakázott, ő nem cáfol.', FIG_OTTER),
  Q(3, 'Melyik igaz?', 'Melyik állítás igaz a B halmazra?', ['Van páros és páratlan eleme is.', 'Mindegyik eleme páros.', 'Egyik eleme sem páros.', 'Mindegyik eleme négyjegyű.'], 'A B-ben a 6606 és a 48 páros, a 475, a 33 és a 9579 páratlan. Négyjegyű sem mind (33, 48, 475).', FIG_SET_B),
  Q(3, 'Tedd igazzá', 'Melyik számot kell kivenni, hogy igaz legyen: „Mindegyik szám páratlan.”?', ['40', '15', '25', '55'], 'A 40 0-ra végződik, páros – ő az ellenpélda. Nélküle 15, 25, 35, 55 mind páratlan.', FIG_ROW_ODD)
];

export const GroupingExamQuiz: React.FC<{
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
      topicId="g4-group-tudasproba-quiz"
      subtopicId="gyakorlas-tudasproba"
      title="5. Gyakorlás, tudáspróba – Kvíz"
      subtitle="Fejezetzáró tudáspróba: 90 feladat 3 szinten – halmazábrák, táblázatok, hányféle lehetőség, igaz és hamis állítások."
      badge="4. OSZTÁLY • VI. VÁLOGATÁSOK, CSOPORTOSÍTÁSOK • TUDÁSPRÓBA"
      questions={GROUPING_EXAM_QUESTIONS}
      cheatSheets={[
        {
          title: 'Halmazábra és táblázat',
          items: [
            'Mindkét címke igaz → közös rész; egyik sem → kívül.',
            'Táblázat: sor + oszlop = egy mező.',
            'A 4 mező = a halmazábra 4 része.',
            'A karikába a közös rész is beletartozik!'
          ]
        },
        {
          title: 'Hányféle lehetőség?',
          items: ['3 elem sorrendje: 6; 4 elemé: 24.', 'Két választás egymás után: szorzás (2 · 3 = 6).', 'Párok (AB = BA): 4 elem → 6, 5 elem → 10.', 'A 0 nem állhat a szám elején.']
        },
        {
          title: 'Igaz vagy hamis?',
          items: ['Mindegyik: 1 ellenpélda megdönti.', 'Van olyan: 1 példa elég.', 'Egyik sem = nincs olyan.', 'Nem mindegyik = van olyan, amelyik nem.']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <GroupingExamMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <GroupingExamSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default GroupingExamQuiz;
