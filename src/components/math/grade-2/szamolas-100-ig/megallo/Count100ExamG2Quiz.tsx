import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Count100ExamG2Matcher } from './Count100ExamG2Matcher';
import { Count100ExamG2Sorter } from './Count100ExamG2Sorter';
import {
  QFig,
  RodsFig,
  MarkLineFig,
  WindowFig,
  MagicSquareFig,
  CardsFig,
  PlaceTableFig,
  RuleTableFig,
  NumLine100Part,
  CoinPart,
  ArrowChainPart,
  PyramidPart,
  BarPart,
  CompareBarsPart,
  IconPart
} from './Count100ExamG2Parts';
import type { BarSeg, CompareRow, IconKind } from '../szoveges-feladatok/WordProblems100G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const CoinsFig: React.FC<{ coins: (10 | 20 | 50)[] }> = ({ coins }) => {
  const step = 44;
  const x0 = 130 - ((coins.length - 1) * step) / 2;
  return (
    <QFig h={80}>
      {coins.map((c, i) => (
        <CoinPart key={i} cx={x0 + i * step} cy={40} value={c} scale={1.3} />
      ))}
    </QFig>
  );
};

const JumpFig: React.FC<{ start: number; hops: number; dir?: 1 | -1 }> = ({ start, hops, dir = 1 }) => (
  <QFig h={112}>
    <NumLine100Part x0={16} w={228} y={66} start={start} hops={hops} dir={dir} />
  </QFig>
);

const PWFig: React.FC<{ segs: BarSeg[]; total: string; icon?: IconKind }> = ({ segs, total, icon }) => (
  <QFig h={96}>
    {icon && <IconPart kind={icon} x={28} y={64} s={1.2} />}
    <BarPart x={icon ? 56 : 20} y={50} w={icon ? 188 : 220} h={32} segs={segs} total={total} fontSize={16} />
  </QFig>
);

const CmpFig: React.FC<{ rows: [CompareRow, CompareRow]; diff?: string }> = ({ rows, diff }) => (
  <QFig h={96}>
    <CompareBarsPart x={12} y={14} w={236} h={28} nameW={70} rows={rows} diffLabel={diff} fontSize={15} />
  </QFig>
);

const ChainFig: React.FC<{ boxes: string[]; ops: string[] }> = ({ boxes, ops }) => (
  <QFig h={90}>
    <ArrowChainPart y={38} boxes={boxes} ops={ops} />
  </QFig>
);

const PyrFig: React.FC<{ rows: string[][] }> = ({ rows }) => (
  <QFig h={rows.length * 28 + 22}>
    <PyramidPart cx={130} y={10} rows={rows} bw={52} bh={28} />
  </QFig>
);

const PriceFig: React.FC<{ items: { icon: IconKind; name: string; price: number }[]; have?: number }> = ({ items, have }) => {
  const step = 240 / items.length;
  return (
    <QFig h={have !== undefined ? 112 : 92}>
      {items.map((it, i) => {
        const cx = 10 + step * i + step / 2;
        return (
          <g key={i}>
            <IconPart kind={it.icon} x={cx} y={28} s={1.3} />
            <text x={cx} y={58} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
              {it.name}
            </text>
            <rect x={cx - 28} y={64} width="56" height="22" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.8" />
            <text x={cx} y={80} textAnchor="middle" fontSize="14" fontWeight="900" fill="#78350f">
              {it.price} Ft
            </text>
          </g>
        );
      })}
      {have !== undefined && (
        <text x="130" y="104" textAnchor="middle" fontSize="14" fontWeight="900" fill="#15803d">
          Neked van: {have} Ft
        </text>
      )}
    </QFig>
  );
};

const PayFig: React.FC<{ price: number; coin: 10 | 20 | 50 }> = ({ price, coin }) => (
  <QFig h={84}>
    <IconPart kind="star" x={44} y={42} s={1.6} />
    <rect x="72" y="28" width="66" height="28" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    <text x="105" y="48" textAnchor="middle" fontSize="16" fontWeight="900" fill="#78350f">
      {price} Ft
    </text>
    <text x="170" y="48" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#475569">
      fizetsz:
    </text>
    <CoinPart cx={222} cy={42} value={coin} scale={1.4} />
  </QFig>
);

type Opt = string;
const Q = (
  n: number,
  level: 1 | 2 | 3,
  badge: string,
  question: string,
  options: Opt[],
  explanation: string,
  figure?: React.ReactNode
): QuizQuestion => ({
  id: `g2c100ex-q${n}`,
  level,
  questionTypeBadge: badge,
  question,
  options,
  correctAnswer: 0,
  explanation,
  ...(figure ? { figure } : {})
});

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const COUNT100_EXAM_G2_QUESTIONS: QuizQuestion[] = [
  // =========================== 1. SZINT ===========================
  Q(1, 1, 'Tízesrudak', 'Melyik számot raktuk ki?', ['53', '35', '8', '50'], '5 tízesrúd = 50, és 3 kocka = 3. Együtt 53.', <RodsFig tens={5} ones={3} />),
  Q(2, 1, 'Helyiérték', 'Hány tízes van a 68-ban?', ['6', '8', '60', '14'], 'A 68 = 6 tízes és 8 egyes.'),
  Q(3, 1, 'Számegyenes', 'Melyik szám helyén áll a kérdőjel?', ['46', '44', '56', '64'], 'A 40-től 6 lépés jobbra: 46.', <MarkLineFig from={40} to={50} marks={[{ v: 46, label: '?' }]} />),
  Q(4, 1, 'Számsor', 'Melyik szám hiányzik? 38, 39, □, 41', ['40', '42', '30', '49'], 'A 39 után a 40 jön, utána a 41.', <CardsFig items={['38', '39', '?', '41']} />),
  Q(5, 1, 'Százas tábla', 'A százas táblában melyik szám áll a 47 jobb oldalán?', ['48', '46', '57', '37'], 'Jobbra 1-gyel nagyobb szám áll: 47 + 1 = 48.', <WindowFig center={47} ask="right" />),
  Q(6, 1, 'Páros szám', 'Melyik szám páros?', ['36', '35', '47', '59'], 'A páros számok végén 0, 2, 4, 6 vagy 8 áll. A 36 végén 6 van.'),
  Q(7, 1, 'Számírás', 'Hogyan írjuk számjeggyel: hetvenkettő?', ['72', '27', '70', '62'], 'Hetven = 7 tízes, kettő = 2 egyes: 72.'),
  Q(8, 1, 'Összehasonlítás', 'Melyik igaz?', ['63 > 36', '63 < 36', '63 = 36', '36 > 63'], 'A 63-ban 6 tízes van, a 36-ban csak 3. Ezért 63 > 36.'),
  Q(9, 1, 'Kerek tízesek', 'Mennyi 30 + 40?', ['70', '7', '60', '34'], '3 tízes + 4 tízes = 7 tízes = 70.', <RodsFig tens={3} add={4} caption="30 + 40 = ?" />),
  Q(10, 1, 'Kerek tízesek', 'Hova érkezel? 80 − 30 = ?', ['50', '77', '40', '60'], 'Három tízes ugrás vissza: 80 → 70 → 60 → 50.', <JumpFig start={80} hops={3} dir={-1} />),
  Q(11, 1, 'Összeadás', 'Mennyi 42 + 5?', ['47', '92', '46', '57'], 'Csak az egyesek változnak: 2 + 5 = 7. Tehát 47.', <PlaceTableFig rows={[[' ', '4', '2'], ['+', '', '5'], ['=', '?', '?']]} />),
  Q(12, 1, 'Összeadás', 'Mennyi 35 + 20?', ['55', '37', '45', '65'], '3 tízes + 2 tízes = 5 tízes, az 5 egyes marad: 55.'),
  Q(13, 1, 'Összeadás', 'Mennyi 23 + 14?', ['37', '36', '47', '27'], '23 + 10 = 33, és 33 + 4 = 37.', <PWFig segs={[{ label: '23', v: 23 }, { label: '14', v: 14 }]} total="?" />),
  Q(14, 1, 'Kivonás', 'Mennyi 58 − 6?', ['52', '64', '53', '42'], 'Az egyesekből: 8 − 6 = 2. Tehát 52.'),
  Q(15, 1, 'Kivonás', 'Mennyi 76 − 30?', ['46', '73', '36', '56'], '7 tízes − 3 tízes = 4 tízes, a 6 egyes marad: 46.', <RodsFig tens={7} ones={6} cross={3} caption="76 − 30 = ?" />),
  Q(16, 1, 'Kivonás', 'Mennyi 49 − 24?', ['25', '35', '24', '73'], '49 − 20 = 29, és 29 − 4 = 25.', <ChainFig boxes={['49', '?']} ops={['− 24']} />),
  Q(17, 1, 'Szöveges feladat', 'Ábel 25 matricát kapott, Hanna 13-at. Hány matricát kaptak együtt?', ['38', '12', '37', '48'], '25 + 13 = 38 matrica.', <PWFig icon="star" segs={[{ label: '25', v: 25 }, { label: '13', v: 13 }]} total="?" />),
  Q(18, 1, 'Szöveges feladat', 'A kosárban 39 dió volt. 7-et megettek. Hány dió maradt?', ['32', '46', '33', '22'], '39 − 7 = 32 dió maradt.', <PWFig icon="chestnut" segs={[{ label: '?', v: 32 }, { label: '7', v: 10, crossed: true }]} total="39" />),
  Q(19, 1, 'Pénz', 'Mennyi pénz van itt?', ['90 Ft', '70 Ft', '80 Ft', '100 Ft'], '50 + 20 = 70, és 70 + 20 = 90 Ft.', <CoinsFig coins={[50, 20, 20]} />),
  Q(20, 1, 'Számpiramis', 'Mi kerül a tetejére? (A két alsó szám összege.)', ['39', '9', '49', '38'], '24 + 15 = 39.', <PyrFig rows={[['?'], ['24', '15']]} />),
  Q(21, 1, 'Legkisebb', 'Melyik a legkisebb?', ['19', '91', '29', '90'], 'A 19-ben van a legkevesebb tízes (1 tízes).'),
  Q(22, 1, 'Számegyenes', 'Melyik szám helyén áll a kérdőjel?', ['62', '68', '52', '26'], 'A 60-tól 2 lépés jobbra: 62.', <MarkLineFig from={60} to={70} marks={[{ v: 62, label: '?' }]} />),
  Q(23, 1, 'Kerek tízes szomszédok', 'Melyik két kerek tízes között van a 47?', ['40 és 50', '40 és 47', '30 és 40', '47 és 50'], '40 < 47 < 50. A kerek tízesek: 40 és 50.'),
  Q(24, 1, 'Pénz', 'Hány forint van itt?', ['40 Ft', '4 Ft', '30 Ft', '50 Ft'], '10 + 10 + 10 + 10 = 40 Ft.', <CoinsFig coins={[10, 10, 10, 10]} />),
  Q(25, 1, 'Kerek tízesek', 'Mennyi 100 − 50?', ['50', '5', '40', '60'], '10 tízes − 5 tízes = 5 tízes = 50.'),
  Q(26, 1, 'Sorozat', 'Hogyan folytatódik? 12, 22, 32, …', ['42', '33', '43', '40'], 'Mindig 10-zel nő: 32 + 10 = 42.', <CardsFig items={['12', '22', '32', '?']} />),
  Q(27, 1, 'Helyiérték', 'Melyik szám áll 8 tízesből és 0 egyesből?', ['80', '8', '18', '88'], '8 tízes = 80, egyes nincs.'),
  Q(28, 1, 'Hiányzó szám', 'Melyik szám illik a □ helyére? □ + 5 = 29', ['24', '34', '25', '23'], '29 − 5 = 24. Ellenőrzés: 24 + 5 = 29.'),
  Q(
    29,
    1,
    'Ennyivel több',
    'Nóra tornya 40 cm magas. Ábelé 10 cm-rel magasabb. Milyen magas Ábel tornya?',
    ['50 cm', '30 cm', '41 cm', '40 cm'],
    'Magasabb = több: 40 + 10 = 50 cm.',
    <CmpFig rows={[{ name: 'Nóra', label: '40', v: 40 }, { name: 'Ábel', label: '?', v: 50 }]} diff="10" />
  ),
  Q(30, 1, 'Százas tábla', 'A százas táblában melyik szám áll az 56 fölött?', ['46', '66', '55', '57'], 'Fölötte 10-zel kisebb szám áll: 56 − 10 = 46.', <WindowFig center={56} ask="up" />),

  // =========================== 2. SZINT ===========================
  Q(31, 2, 'Tízesátlépés', 'Mennyi 38 + 7?', ['45', '35', '44', '46'], '38 + 2 = 40, és 40 + 5 = 45.', <MarkLineFig from={36} to={46} marks={[{ v: 45, label: '?' }]} hops={[{ from: 38, to: 40, label: '+2' }, { from: 40, to: 45, label: '+5' }]} />),
  Q(32, 2, 'Összeadás', 'Mennyi 56 + 28?', ['84', '74', '83', '94'], '56 + 20 = 76, 76 + 4 = 80, 80 + 4 = 84.'),
  Q(33, 2, 'Összeadás', 'Mennyi 47 + 36?', ['83', '73', '82', '93'], 'Egyesek: 7 + 6 = 13, ez 1 tízes és 3 egyes. Tízesek: 4 + 3 + 1 = 8. Tehát 83.', <PlaceTableFig rows={[[' ', '4', '7'], ['+', '3', '6'], ['=', '?', '?']]} />),
  Q(34, 2, 'Tízesátlépés', 'Mennyi 63 − 8?', ['55', '65', '54', '45'], '63 − 3 = 60, és 60 − 5 = 55.', <MarkLineFig from={53} to={63} marks={[{ v: 55, label: '?' }]} hops={[{ from: 63, to: 60, label: '−3' }, { from: 60, to: 55, label: '−5' }]} />),
  Q(35, 2, 'Kivonás', 'Mennyi 82 − 47?', ['35', '45', '25', '34'], '82 − 40 = 42, 42 − 2 = 40, 40 − 5 = 35.'),
  Q(36, 2, 'Kivonás', 'Mennyi 91 − 57?', ['34', '46', '44', '33'], '91 − 50 = 41, 41 − 1 = 40, 40 − 6 = 34.', <ChainFig boxes={['91', '□', '?']} ops={['− 50', '− 7']} />),
  Q(37, 2, 'Hiányzó szám', 'Melyik szám illik a □ helyére? 45 + □ = 72', ['27', '37', '26', '33'], '72 − 45 = 27. Ellenőrzés: 45 + 27 = 72.', <PWFig segs={[{ label: '45', v: 45 }, { label: '?', v: 27 }]} total="72" />),
  Q(38, 2, 'Hiányzó szám', 'Melyik szám illik a □ helyére? □ − 25 = 38', ['63', '13', '53', '64'], 'Visszafelé összeadunk: 38 + 25 = 63.', <ChainFig boxes={['?', '38']} ops={['− 25']} />),
  Q(39, 2, 'Helyiérték', 'Melyik szám ez: 7 egyes és 4 tízes?', ['47', '74', '11', '70'], 'A tízesek elöl állnak: 4 tízes és 7 egyes = 47.'),
  Q(40, 2, 'Százas tábla', 'A százas táblában melyik szám áll a 39 alatt?', ['49', '29', '40', '38'], 'Alatta 10-zel nagyobb szám áll: 39 + 10 = 49.', <WindowFig center={39} ask="down" />),
  Q(41, 2, 'Számkártyák', 'Melyik a legnagyobb kétjegyű szám, amit két kártyából kirakhatsz?', ['85', '83', '58', '88'], 'A legnagyobb kártya (8) legyen elöl, a második legnagyobb (5) hátul: 85. Egy kártyát csak egyszer használhatsz.', <CardsFig items={['3', '8', '5']} digit />),
  Q(42, 2, 'Páratlan szám', 'Melyik szám páratlan?', ['73', '68', '74', '90'], 'A páratlan számok végén 1, 3, 5, 7 vagy 9 áll. A 73 végén 3 van.'),
  Q(43, 2, 'Összehasonlítás', 'Melyik igaz?', ['45 + 30 > 70', '45 + 30 < 70', '45 + 30 = 70', '45 + 30 < 50'], '45 + 30 = 75, és 75 > 70.'),
  Q(44, 2, 'Számpiramis', 'Mi kerül a piramis tetejére?', ['62', '52', '47', '72'], '12 + 15 = 27, 15 + 20 = 35. A tetején: 27 + 35 = 62.', <PyrFig rows={[['?'], ['', ''], ['12', '15', '20']]} />),
  Q(45, 2, 'Bűvös négyzet', 'Bűvös négyzet: minden sor, oszlop és átló összege 60. Mi kerül a ? helyére?', ['28', '32', '24', '36'], 'A felső sor: 8 + □ + 24 = 60. 8 + 24 = 32, és 60 − 32 = 28.', <MagicSquareFig grid={[[8, '?', 24], [36, 20, 4], [16, 12, 32]]} />),
  Q(46, 2, 'Szabálytáblázat', 'Mi a szabály, és mi kerül a ? helyére?', ['58', '49', '68', '38'], 'A szabály: + 10. 48 + 10 = 58.', <RuleTableFig top={['25', '34', '48', '52']} bottom={['35', '44', '?', '62']} />),
  Q(47, 2, 'Szöveges feladat', 'A boltban 64 kifli volt. Délig eladtak 38-at. Hány kifli maradt?', ['26', '36', '34', '24'], '64 − 38: 64 − 30 = 34, 34 − 8 = 26.', <PWFig segs={[{ label: '?', v: 26 }, { label: '38', v: 38, crossed: true }]} total="64" />),
  Q(48, 2, 'Szöveges feladat', 'Zsófi 27 gesztenyét, Olivér 45-öt gyűjtött. Hányat gyűjtöttek együtt?', ['72', '62', '18', '73'], '27 + 45: 27 + 40 = 67, 67 + 5 = 72.', <PWFig icon="chestnut" segs={[{ label: '27', v: 27 }, { label: '45', v: 45 }]} total="?" />),
  Q(
    49,
    2,
    'Mennyivel több?',
    'Dorka 81 pontot, Kristóf 56 pontot szerzett. Mennyivel szerzett többet Dorka?',
    ['25', '35', '24', '15'],
    'A különbség: 81 − 56. 81 − 50 = 31, 31 − 6 = 25.',
    <CmpFig rows={[{ name: 'Dorka', label: '81', v: 81 }, { name: 'Kristóf', label: '56', v: 56 }]} diff="?" />
  ),
  Q(50, 2, 'Kerek tízesek', 'Hova érkezel? 63 + 30 = ?', ['93', '66', '83', '96'], 'Három tízes ugrás: 63 → 73 → 83 → 93.', <JumpFig start={63} hops={3} />),
  Q(51, 2, 'Kerek tízesek', 'Mennyi 100 − 70?', ['30', '70', '20', '3'], '10 tízes − 7 tízes = 3 tízes = 30.'),
  Q(52, 2, 'Számegyenes', 'Melyik szám helyén áll a kérdőjel?', ['75', '70', '57', '85'], 'A 70 és a 80 között pontosan középen a 75 van.', <MarkLineFig from={0} to={100} marks={[{ v: 75, label: '?' }]} />),
  Q(53, 2, 'Helyiérték', 'A 64-ben mennyit ér a 6-os számjegy?', ['60', '6', '64', '10'], 'A 6 a tízesek helyén áll: 6 tízes = 60.'),
  Q(54, 2, 'Sorrend', 'Melyik sor van növekvő sorrendben?', ['19, 46, 64, 91', '19, 64, 46, 91', '91, 64, 46, 19', '46, 19, 64, 91'], 'Növekvő: a legkisebbtől a legnagyobbig. 19 < 46 < 64 < 91.'),
  Q(55, 2, 'Visszajáró', 'A matrica 45 Ft. 50 Ft-tal fizetsz. Mennyi pénzt kapsz vissza?', ['5 Ft', '15 Ft', '10 Ft', '95 Ft'], '45 + 5 = 50, tehát 5 Ft a visszajáró.', <PayFig price={45} coin={50} />),
  Q(
    56,
    2,
    'Ennyivel több',
    'A piros szalag 34 cm. A kék 18 cm-rel hosszabb. Milyen hosszú a kék szalag?',
    ['52 cm', '16 cm', '42 cm', '62 cm'],
    'Hosszabb = több: 34 + 18. 34 + 6 = 40, 40 + 12 = 52 cm.',
    <CmpFig rows={[{ name: 'piros', label: '34', v: 34 }, { name: 'kék', label: '?', v: 52 }]} diff="18" />
  ),
  Q(57, 2, 'Egyenlőség', 'Melyik szám illik a □ helyére? 37 + 20 = 50 + □', ['7', '17', '57', '27'], 'Bal oldal: 37 + 20 = 57. Jobb oldal: 50 + 7 = 57. □ = 7.'),
  Q(58, 2, 'Sorozat', 'Hogyan folytatódik? 95, 88, 81, 74, …', ['67', '68', '77', '60'], 'Mindig 7-tel csökken: 74 − 7 = 67.', <CardsFig items={['95', '88', '81', '74', '?']} />),
  Q(59, 2, 'Százas tábla', 'A százas táblában melyik szám áll a 70 bal oldalán?', ['69', '71', '60', '80'], 'Balra 1-gyel kisebb szám áll: 70 − 1 = 69.', <WindowFig center={70} ask="left" />),
  Q(60, 2, 'Három tag', 'Mennyi 25 + 25 + 25?', ['75', '65', '70', '85'], '25 + 25 = 50, és 50 + 25 = 75.', <PWFig segs={[{ label: '25', v: 25 }, { label: '25', v: 25 }, { label: '25', v: 25 }]} total="?" />),

  // =========================== 3. SZINT ===========================
  Q(61, 3, 'Két lépés', 'Mennyi 45 + 27 − 30?', ['42', '52', '72', '32'], 'Előbb 45 + 27 = 72, aztán 72 − 30 = 42.', <ChainFig boxes={['45', '□', '?']} ops={['+ 27', '− 30']} />),
  Q(62, 3, 'Két lépés', 'Mennyi 100 − 36 − 24?', ['40', '60', '50', '30'], '100 − 36 = 64, és 64 − 24 = 40.', <ChainFig boxes={['100', '□', '?']} ops={['− 36', '− 24']} />),
  Q(63, 3, 'Számpiramis', 'Melyik szám kerül a ? helyére?', ['45', '55', '35', '40'], 'Alulról: 20 + 25 = 45. Fentről ellenőrizve: 80 − 35 = 45.', <PyrFig rows={[['80'], ['?', '35'], ['20', '25', '10']]} />),
  Q(64, 3, 'Bűvös négyzet', 'Bűvös négyzet: minden sor, oszlop és átló összege ugyanannyi. Mi kerül középre?', ['15', '16', '14', '45'], 'Az alsó sor: 14 + 13 + 18 = 45. A középső sor: 19 + □ + 11 = 45, tehát □ = 15.', <MagicSquareFig grid={[[12, '', 16], [19, '?', 11], [14, 13, 18]]} />),
  Q(
    65,
    3,
    'Csapda: „ez több”',
    'Levente 63 matricát gyűjtött. Ez 18-cal több, mint Hannáé. Hány matricája van Hannának?',
    ['45', '81', '55', '35'],
    'Leventének van több, Hannának kevesebb: 63 − 18 = 45.',
    <CmpFig rows={[{ name: 'Levente', label: '63', v: 63 }, { name: 'Hanna', label: '?', v: 45 }]} diff="18" />
  ),
  Q(66, 3, 'Le és fel', 'A buszon 48-an utaztak. 15-en leszálltak, 23-an felszálltak. Hányan utaznak most?', ['56', '33', '86', '10'], '48 − 15 = 33, és 33 + 23 = 56.', <ChainFig boxes={['48', '□', '?']} ops={['− 15', '+ 23']} />),
  Q(
    67,
    3,
    'Vásárlás',
    'Van 100 Ft-od. Veszel egy füzetet és egy tollat. Mennyi pénzed marad?',
    ['17 Ft', '27 Ft', '55 Ft', '83 Ft'],
    'Fizetsz: 45 + 38 = 83 Ft. Marad: 100 − 83 = 17 Ft.',
    <PriceFig items={[{ icon: 'book', name: 'füzet', price: 45 }, { icon: 'pencil', name: 'toll', price: 38 }]} have={100} />
  ),
  Q(
    68,
    3,
    'Mennyi van hátra?',
    'A könyv 100 oldalas. Nóra hétfőn 28, kedden 45 oldalt olvasott el. Hány oldal van még hátra?',
    ['27', '73', '37', '17'],
    'Elolvasott: 28 + 45 = 73 oldal. Hátra van: 100 − 73 = 27 oldal.',
    <PWFig icon="book" segs={[{ label: '28', v: 28 }, { label: '45', v: 45 }, { label: '?', v: 27 }]} total="100" />
  ),
  Q(69, 3, 'Fejtörő', 'Melyik kétjegyű szám ez? A tízesek száma 3-mal több, mint az egyeseké. A két számjegy összege 9.', ['63', '36', '54', '72'], '6 és 3: 6 = 3 + 3, és 6 + 3 = 9. A tízes a 6, tehát 63.'),
  Q(70, 3, 'Fejtörő', 'Hány olyan kétjegyű szám van, amelyben a két számjegy egyforma?', ['9', '10', '11', '8'], '11, 22, 33, 44, 55, 66, 77, 88, 99 – ez 9 szám.'),
  Q(71, 3, 'Szabálytáblázat', 'Mi kerül a ? helyére?', ['65', '35', '50', '64'], 'A szabály: − 15 (20 → 5, 35 → 20). Visszafelé: 50 + 15 = 65.', <RuleTableFig top={['20', '35', '47', '?']} bottom={['5', '20', '32', '50']} />),
  Q(72, 3, 'Egyenlőség', 'Melyik szám illik a □ helyére? 34 + 28 = 70 − □', ['8', '12', '62', '18'], 'Bal oldal: 34 + 28 = 62. 70 − 8 = 62, tehát □ = 8.'),
  Q(73, 3, 'Számegyenes', 'Melyik szám van pontosan középen a 47 és a 67 között?', ['57', '55', '52', '60'], 'A 47-től 10 lépés a 57, onnan még 10 lépés a 67.', <MarkLineFig from={40} to={70} marks={[{ v: 47, label: '47' }, { v: 57, label: '?' }, { v: 67, label: '67' }]} />),
  Q(74, 3, 'Legnagyobb', 'Melyik műveletnek a legnagyobb az eredménye?', ['92 − 39', '26 + 25', '80 − 30', '24 + 28'], '92 − 39 = 53, 26 + 25 = 51, 80 − 30 = 50, 24 + 28 = 52. A legnagyobb az 53.'),
  Q(75, 3, 'Sorozat', 'Hogyan folytatódik? 18, 25, 32, 39, …', ['46', '45', '40', '47'], 'Mindig 7-tel nő: 39 + 7 = 46.', <CardsFig items={['18', '25', '32', '39', '?']} />),
  Q(
    76,
    3,
    'Két lépés',
    'Ábel 26 kavicsot gyűjtött. Emma 15-tel többet. Hány kavicsot gyűjtöttek együtt?',
    ['67', '41', '56', '52'],
    'Emma: 26 + 15 = 41. Együtt: 26 + 41 = 67.',
    <CmpFig rows={[{ name: 'Ábel', label: '26', v: 26 }, { name: 'Emma', label: '?', v: 41 }]} diff="15" />
  ),
  Q(
    77,
    3,
    'Csapda: „magasabb”',
    'A kék torony 72 cm. Ez 25 cm-rel magasabb a pirosnál. Milyen magas a piros torony?',
    ['47 cm', '97 cm', '57 cm', '53 cm'],
    'A kék a magasabb, a piros az alacsonyabb: 72 − 25 = 47 cm.',
    <CmpFig rows={[{ name: 'kék', label: '72', v: 72 }, { name: 'piros', label: '?', v: 47 }]} diff="25" />
  ),
  Q(78, 3, 'Felcserélés', 'Melyik szám illik a □ helyére? □ + 46 = 46 + 30', ['30', '76', '46', '16'], 'A tagok felcserélhetők: 30 + 46 = 46 + 30. □ = 30.'),
  Q(79, 3, 'Pénz', 'Melyik érmékkel fizethetsz pontosan 80 Ft-ot?', ['50 + 20 + 10', '50 + 20 + 20', '20 + 20 + 20', '50 + 10 + 10'], '50 + 20 + 10 = 80. A többi: 90, 60, 70.'),
  Q(80, 3, 'Százas tábla', 'A százas táblában melyik szám áll a 64-től jobbra lent (átlósan)?', ['75', '74', '65', '73'], 'Lefelé 10-zel több (74), jobbra még 1-gyel több: 75.', <WindowFig center={64} ask="downRight" />),
  Q(
    81,
    3,
    'Két lépés',
    'Kristófnak 35 Ft-ja van. Hannának 20 Ft-tal több. Mennyi pénzük van együtt?',
    ['90 Ft', '55 Ft', '70 Ft', '50 Ft'],
    'Hanna: 35 + 20 = 55 Ft. Együtt: 35 + 55 = 90 Ft.',
    <CmpFig rows={[{ name: 'Kristóf', label: '35', v: 35 }, { name: 'Hanna', label: '?', v: 55 }]} diff="20" />
  ),
  Q(82, 3, 'Számpiramis', 'Mi kerül a piramis tetejére?', ['63', '54', '45', '73'], '18 + 9 = 27, 9 + 27 = 36. A tetején: 27 + 36 = 63.', <PyrFig rows={[['?'], ['', ''], ['18', '9', '27']]} />),
  Q(83, 3, 'Gondoltam egy számot', 'Melyik szám 25-tel nagyobb a 48-nál?', ['73', '23', '63', '83'], '48 + 25: 48 + 2 = 50, 50 + 23 = 73.'),
  Q(84, 3, 'Nyíllánc', 'Mi kerül a lánc végére?', ['77', '37', '93', '67'], '30 + 25 = 55, 55 − 18 = 37, 37 + 40 = 77.', <ChainFig boxes={['30', '□', '□', '?']} ops={['+ 25', '− 18', '+ 40']} />),
  Q(85, 3, 'Helyiérték', 'Hány tízes van összesen a 100-ban?', ['10', '100', '1', '0'], '10 tízes = 100.'),
  Q(
    86,
    3,
    'Két lépés',
    'Az egyik dobozban 52 golyó van, a másikban 19-cel kevesebb. Hány golyó van a két dobozban összesen?',
    ['85', '33', '71', '75'],
    'A második doboz: 52 − 19 = 33. Összesen: 52 + 33 = 85.',
    <CmpFig rows={[{ name: '1. doboz', label: '52', v: 52 }, { name: '2. doboz', label: '?', v: 33 }]} diff="19" />
  ),
  Q(
    87,
    3,
    'Mennyi kell még?',
    'Dorka 100 gyöngyöt szeretne. Van 36 pirosa és 28 kékje. Hány gyöngy kell még?',
    ['36', '64', '46', '26'],
    'Van: 36 + 28 = 64. Kell még: 100 − 64 = 36.',
    <PWFig icon="bead" segs={[{ label: '36', v: 36 }, { label: '28', v: 28 }, { label: '?', v: 36 }]} total="100" />
  ),
  Q(88, 3, 'Számkártyák', 'Melyik a legkisebb kétjegyű szám, amit két kártyából kirakhatsz?', ['40', '47', '7', '70'], 'A 0 nem állhat elöl (a 07 nem kétjegyű). Elöl a 4, hátul a 0: 40.', <CardsFig items={['0', '4', '7']} digit />),
  Q(89, 3, 'Nyitott mondat', 'Melyik szám igaz? 58 < □ < 61, és □ páratlan.', ['59', '60', '61', '57'], 'A 58 és a 61 között a 59 és a 60 van. Ebből a 59 páratlan.'),
  Q(90, 3, 'Bűvös négyzet', 'Bűvös négyzet: minden sor, oszlop és átló összege 75. Mi kerül a ? helyére?', ['35', '25', '45', '30'], 'A felső sor: 10 + □ + 30 = 75. 10 + 30 = 40, és 75 − 40 = 35.', <MagicSquareFig grid={[[10, '?', 30], [45, 25, ''], [20, '', 40]]} />)
];

export const Count100ExamG2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="szamolas-100-ig"
    topicId="g2-c100-tudasproba-quiz"
    subtopicId="megallo"
    title="6. Megálló – Tudáspróba Kvíz"
    subtitle="90 feladat 3 szinten: számok 100-ig, összeadás és kivonás tízesátlépéssel, kerek tízesek, fejtörők és szöveges feladatok."
    badge="2. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 100-IG • TUDÁSPRÓBA"
    questions={COUNT100_EXAM_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'Számok 100-ig',
        items: ['47 = 4 tízes + 7 egyes', 'Százas tábla: jobbra +1, lefelé +10', 'Páros szám végén: 0, 2, 4, 6, 8', 'Előbb a tízeseket hasonlítsd össze!']
      },
      {
        title: 'Összeadás, kivonás',
        items: ['38 + 7 = 38 + 2 + 5 = 45', '63 − 8 = 63 − 3 − 5 = 55', '47 + 30: csak a tízesek változnak', 'Ellenőrizz a fordított művelettel!']
      },
      {
        title: 'Fejtörők és szöveges',
        items: ['Piramis: a két alsó szám összege kerül föléjük', 'Bűvös négyzet: minden sor ugyanannyi', '„Ez 18-cal több, mint…” → a másiknak kevesebb!', 'Két lépés: előbb az egyik, aztán a másik']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={
      <Count100ExamG2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
    }
    sorterComponent={
      <Count100ExamG2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
    }
  />
);

export default Count100ExamG2Quiz;
