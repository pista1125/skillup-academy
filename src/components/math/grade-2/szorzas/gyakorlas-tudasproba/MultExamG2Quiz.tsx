import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { MultExamG2Matcher } from './MultExamG2Matcher';
import { MultExamG2Sorter } from './MultExamG2Sorter';
import {
  QGroups,
  QArray,
  QJumps,
  QSeq,
  QChain,
  QArrowMap,
  QCompare,
  QTable,
  QCoins,
  QTags,
  QStrips,
  QGrid10,
} from './MultExamG2Parts';

const q = (
  n: number,
  level: 1 | 2 | 3,
  questionTypeBadge: string,
  question: string,
  options: string[],
  explanation: string,
  figure?: React.ReactNode
): QuizQuestion => ({
  id: `g2multex-q${n}`,
  level,
  questionTypeBadge,
  question,
  options,
  correctAnswer: 0,
  explanation,
  ...(figure ? { figure } : {}),
});

export const MULT_EXAM_G2_QUESTIONS: QuizQuestion[] = [
  // =========================================================================
  // 1. SZINT – a szorzás jelentése, könnyű táblák, képek
  // =========================================================================
  q(1, 1, 'Kép és szorzás', 'Melyik szorzás illik a képhez?', ['3 · 4', '4 · 4', '3 + 4', '3 · 3'],
    '3 zsák, mindegyikben 4 labda: 4 + 4 + 4 = 3 · 4.', <QGroups sizes={[4, 4, 4]} />),
  q(2, 1, 'Összeadásból szorzás', 'Hogyan írod le szorzással? 5 + 5 + 5 + 5', ['4 · 5', '5 · 5', '4 + 5', '3 · 5'],
    'Négyszer adtuk össze az 5-öt: 4 · 5 = 20.'),
  q(3, 1, 'Rácspontok', 'Hány pötty van a képen?', ['12', '8', '10', '14'],
    '2 sor, soronként 6 pötty: 2 · 6 = 12.', <QArray rows={2} cols={6} />),
  q(4, 1, 'Ugrások', 'Hová érkezik a béka?', ['15', '8', '12', '18'],
    '3, 6, 9, 12, 15. Öt ugrás, mindig 3: 5 · 3 = 15.', <QJumps step={3} jumps={5} />),
  q(5, 1, '2-es tábla', 'Mennyi 2 · 7?', ['14', '9', '12', '16'],
    'Kétszer hét: 7 + 7 = 14.'),
  q(6, 1, 'Pénz', 'Mennyi pénz van itt?', ['40 Ft', '14 Ft', '30 Ft', '50 Ft'],
    '4 darab 10 Ft-os: 4 · 10 = 40 Ft.', <QCoins values={[10, 10, 10, 10]} />),
  q(7, 1, '5-ös tábla', 'Mennyi 5 · 6?', ['30', '11', '25', '35'],
    'Ötször hat: 6 + 6 + 6 + 6 + 6 = 30.'),
  q(8, 1, 'Párok', 'Hány zokni van összesen?', ['12', '8', '6', '14'],
    '6 pár, egy párban 2 zokni: 6 · 2 = 12.', <QGroups sizes={[2, 2, 2, 2, 2, 2]} caption="6 pár zokni" />),
  q(9, 1, '10-es tábla', 'Mennyi 10 · 4?', ['40', '14', '44', '30'],
    'Tízszer négy: 10 darab 4 = 40. A felcserélés is segít: 4 · 10 = 40, vagyis 4 tízes.'),
  q(10, 1, 'Rácspontok', 'Melyik igaz a képre?', ['3 · 3 = 9', '3 + 3 = 9', '3 · 3 = 6', '3 · 4 = 9'],
    '3 sor, soronként 3 pötty: 3 · 3 = 9.', <QArray rows={3} cols={3} />),
  q(11, 1, 'Felcserélés', '4 · 2 = 2 · □. Mi kerül a □ helyére?', ['4', '2', '8', '6'],
    'A tényezők helyet cserélhetnek: 4 · 2 = 2 · 4. Mindkettő 8.', <QArray rows={4} cols={2} />),
  q(12, 1, 'Szorzás 0-val', 'Mennyi 0 · 7?', ['0', '7', '70', '1'],
    'Nulla darab 7 az semmi: 0 · 7 = 0.'),
  q(13, 1, 'Szorzás 1-gyel', 'Mennyi 1 · 9?', ['9', '1', '10', '0'],
    'Egyszer 9 az 9.', <QGroups sizes={[9]} caption="1 tál, benne 9 szilva" />),
  q(14, 1, 'Ugrások', 'Hová érkezik a nyuszi?', ['24', '20', '28', '10'],
    '4, 8, 12, 16, 20, 24. Hat ugrás, mindig 4: 6 · 4 = 24.', <QJumps step={4} jumps={6} />),
  q(15, 1, 'Kép és szorzás', 'Hány pötty van a 3 zsákban?', ['18', '9', '15', '21'],
    '3 zsák, mindegyikben 6: 3 · 6 = 18.', <QGroups sizes={[6, 6, 6]} />),
  q(16, 1, 'Számsor', 'Melyik szám hiányzik?', ['20', '16', '30', '18'],
    'Mindig 5-tel több: 15 + 5 = 20. Ez az 5-ös tábla.', <QSeq items={[5, 10, 15, '?', 25]} />),
  q(17, 1, 'Olvasd ki!', 'Melyik szorzás ez: „hétszer kettő”?', ['7 · 2', '7 + 2', '7 · 7', '2 · 2'],
    'Hétszer kettő: 7 · 2. Előbb mondjuk, hányszor, aztán azt, hogy mit.'),
  q(18, 1, 'Pénz', 'Mennyi pénz van itt?', ['15 Ft', '8 Ft', '10 Ft', '20 Ft'],
    '3 darab 5 Ft-os: 3 · 5 = 15 Ft.', <QCoins values={[5, 5, 5]} />),
  q(19, 1, 'Rácspontok', 'Hány pötty van a képen?', ['16', '10', '18', '14'],
    '2 sor, soronként 8: 2 · 8 = 16, vagyis 8 + 8.', <QArray rows={2} cols={8} />),
  q(20, 1, '10-es tábla', 'Mennyi 9 · 10?', ['90', '19', '80', '100'],
    'Kilencszer tíz: 9 tízes = 90.'),
  q(21, 1, 'Rácspontok', 'Hány pötty van a képen?', ['25', '10', '20', '30'],
    '5 sor, soronként 5: 5 · 5 = 25.', <QArray rows={5} cols={5} />),
  q(22, 1, 'Igaz vagy hamis?', 'Melyik igaz?', ['6 · 2 = 12', '6 · 2 = 8', '6 · 2 = 62', '6 · 2 = 14'],
    '6 · 2 = 12. A 8 az összeadás lenne (6 + 2).'),
  q(23, 1, 'Szöveges', 'Hány kerék van összesen?', ['8', '6', '10', '4'],
    '4 bicikli, mindegyiknek 2 kereke: 4 · 2 = 8.', <QGroups sizes={[2, 2, 2, 2]} caption="4 bicikli, mindegyiknek 2 kereke" />),
  q(24, 1, 'Összehasonlítás', 'Melyik jel kerül a ? helyére?', ['=', '<', '>'],
    '4 · 3 = 12 és 3 · 4 = 12. Felcseréltük a tényezőket, a szorzat ugyanaz.', <QCompare left="4 · 3" right="3 · 4" />),
  q(25, 1, 'Pénz', 'Mennyi pénz van itt?', ['35 Ft', '12 Ft', '30 Ft', '40 Ft'],
    '7 darab 5 Ft-os: 7 · 5 = 35 Ft.', <QCoins values={[5, 5, 5, 5, 5, 5, 5]} />),
  q(26, 1, 'Ugrások', 'Hová érkezik a kenguru?', ['30', '13', '20', '40'],
    '10, 20, 30. Három ugrás, mindig 10: 3 · 10 = 30.', <QJumps step={10} jumps={3} />),
  q(27, 1, 'Többszörös', 'Melyik szám van benne a 3-as szorzótáblában?', ['21', '22', '20', '23'],
    '7 · 3 = 21. A 20, a 22 és a 23 nincs a 3-as táblában.'),
  q(28, 1, 'Kép és szorzás', 'Hány pötty van összesen?', ['15', '8', '12', '18'],
    '5 zsák, mindegyikben 3: 5 · 3 = 15.', <QGroups sizes={[3, 3, 3, 3, 3]} />),
  q(29, 1, 'Kétszerese', 'Mennyi a 4 kétszerese?', ['8', '6', '2', '16'],
    'A 4 kétszerese: 2 · 4 = 8.', <QArrowMap from={4} to="?" op="· 2" />),
  q(30, 1, '10-es tábla', 'Mennyi 6 · 10?', ['60', '16', '61', '50'],
    'Hatszor tíz: 6 tízes = 60.'),

  // =========================================================================
  // 2. SZINT – minden tábla, hiányzó tényező, táblák kapcsolata, -szorosa
  // =========================================================================
  q(31, 2, '8-as tábla', 'Mennyi 7 · 8?', ['56', '54', '48', '15'],
    '7 · 4 = 28, és ezt duplázzuk: 28 + 28 = 56.'),
  q(32, 2, 'Hiányzó tényező', '□ · 6 = 42. Mi kerül a □ helyére?', ['7', '6', '8', '36'],
    'Hatosával 42-ig 7 ugrás kell: 7 · 6 = 42.', <QJumps step={6} jumps={7} askJumps />),
  q(33, 2, '6-os tábla', 'Mennyi 9 · 6?', ['54', '45', '56', '63'],
    '9 · 3 = 27, és ezt duplázzuk: 27 + 27 = 54.'),
  q(34, 2, 'Hiányzó tényező', '8 · □ = 64. Mi kerül a □ helyére?', ['8', '7', '9', '56'],
    '8 · 8 = 64.'),
  q(35, 2, '2-es és 4-es', '2 · 6 = 12 (kék sorok). Mennyi 4 · 6?', ['24', '14', '18', '12'],
    'A 4-es tábla a 2-es kétszerese: 12 + 12 = 24.', <QArray rows={4} cols={6} splitRow={2} />),
  q(36, 2, '4-es és 8-as', '4 · 7 = 28. Mennyi 8 · 7?', ['56', '32', '35', '48'],
    'A 8-as tábla a 4-es kétszerese: 28 + 28 = 56.', <QChain items={[7, 28, '?']} ops={['· 4', '· 2']} />),
  q(37, 2, '5-ös és 10-es', '10 · 9 = 90. Mennyi 5 · 9?', ['45', '85', '40', '50'],
    'A kék és a narancs rész egyforma: 5 · 9 + 5 · 9 = 90. Mivel 45 + 45 = 90, ezért 5 · 9 = 45.',
    <QArray rows={10} cols={9} splitRow={5} />),
  q(38, 2, '3-as és 6-os', '3 · 8 = 24 (kék sorok). Mennyi 6 · 8?', ['48', '27', '32', '30'],
    'A 6-os tábla a 3-as kétszerese: 24 + 24 = 48.', <QArray rows={6} cols={8} splitRow={3} />),
  q(39, 2, '3-as és 9-es', '3 · 4 = 12. Mennyi 9 · 4?', ['36', '24', '15', '27'],
    'A 9-es tábla a 3-as háromszorosa: 12 + 12 + 12 = 36.', <QChain items={[4, 12, '?']} ops={['· 3', '· 3']} />),
  q(40, 2, 'Ötszöröse', 'Mennyi a 6 ötszöröse?', ['30', '11', '35', '25'],
    'A 6 ötszöröse: 5 · 6 = 30. A 11 az összeadás lenne.', <QArrowMap from={6} to="?" op="· 5" />),
  q(41, 2, 'Többszörös', 'Melyik szám a 7 többszöröse?', ['49', '47', '27', '17'],
    '7 · 7 = 49. A 47, a 27 és a 17 nincs a 7-es táblában.'),
  q(42, 2, 'Ugrások', 'Hová érkezik?', ['40', '13', '32', '48'],
    '8, 16, 24, 32, 40. Öt ugrás, mindig 8: 5 · 8 = 40.', <QJumps step={8} jumps={5} />),
  q(43, 2, 'Szöveges', 'Hány lába van a 3 póknak?', ['24', '11', '16', '32'],
    'Mindegyik póknak 8 lába van: 3 · 8 = 24.', <QGroups sizes={[8, 8, 8]} caption="3 pók, mindegyiknek 8 lába" />),
  q(44, 2, 'Hiányzó tényező', '□ · 4 = 36. Mi kerül a □ helyére?', ['9', '8', '32', '40'],
    '9 · 4 = 36. Ellenőrzés: 8 · 4 = 32, az kevés.'),
  q(45, 2, 'Összehasonlítás', 'Melyik jel kerül a ? helyére?', ['>', '<', '='],
    '6 · 7 = 42, és 42 több, mint 40.', <QCompare left="6 · 7" right="40" />),
  q(46, 2, '9-es tábla', 'Mennyi 9 · 9?', ['81', '18', '72', '99'],
    '9 · 10 = 90, és ebből elveszünk egy 9-et: 90 − 9 = 81.'),
  q(47, 2, 'Számsor', 'Melyik szám hiányzik?', ['28', '24', '22', '27'],
    'Mindig 7-tel több: 21 + 7 = 28. Ez a 7-es tábla.', <QSeq items={[7, 14, 21, '?', 35]} />),
  q(48, 2, 'Táblázat', 'Hány kereke van 4 triciklinek?', ['12', '10', '13', '11'],
    'Egy triciklinek 3 kereke van: 4 · 3 = 12.',
    <QTable topLabel="tricikli" bottomLabel="kerék" top={[1, 2, 3, 4, 5]} bottom={[3, 6, 9, '?', 15]} />),
  q(49, 2, 'Pénz', 'Mennyi pénz van itt?', ['45 Ft', '14 Ft', '40 Ft', '50 Ft'],
    '9 darab 5 Ft-os: 9 · 5 = 45 Ft.', <QCoins values={[5, 5, 5, 5, 5, 5, 5, 5, 5]} />),
  q(50, 2, 'Szorzás 0-val', 'Mennyi 10 · 0?', ['0', '10', '1', '100'],
    'Tízszer a semmi is semmi: 10 · 0 = 0.'),
  q(51, 2, 'Melyik nagyobb?', 'Melyik szorzat nagyobb, mint 50?', ['8 · 7', '6 · 8', '7 · 7', '9 · 5'],
    '8 · 7 = 56. A többi: 6 · 8 = 48, 7 · 7 = 49, 9 · 5 = 45.'),
  q(52, 2, 'Szorzótábla', 'Melyik szám kerül a ? helyére a szorzótáblában?', ['42', '48', '36', '13'],
    'A kék sor a 6, a rózsaszín oszlop a 7: 6 · 7 = 42.', <QGrid10 row={6} col={7} />),
  q(53, 2, 'Felcserélés', 'Melyik két szorzás illik a képhez?', ['6 · 4 és 4 · 6', '6 · 4 és 6 + 4', '6 · 6 és 4 · 4', '4 · 4 és 6 · 4'],
    '6 sor, soronként 4: 6 · 4. Elforgatva 4 sor, soronként 6: 4 · 6. Mindkettő 24.', <QArray rows={6} cols={4} />),
  q(54, 2, 'Kép és szorzás', 'Hány pötty van összesen?', ['40', '13', '45', '35'],
    '5 zsák, mindegyikben 8: 5 · 8 = 40.', <QGroups sizes={[8, 8, 8, 8, 8]} />),
  q(55, 2, 'Háromszorosa', 'Mennyi a 9 háromszorosa?', ['27', '12', '24', '93'],
    'A 9 háromszorosa: 3 · 9 = 27.', <QArrowMap from={9} to="?" op="· 3" />),
  q(56, 2, 'Kétszer annyi', 'Ádámnak 7 matricája van. Évának kétszer annyi. Hány matricája van Évának?', ['14', '9', '7', '5'],
    'Kétszer annyi: 2 · 7 = 14. Nézd a csíkokat: Éva csíkja két 7-esből áll.',
    <QStrips rows={[{ label: 'Ádám', segs: [{ w: 1, text: '7' }] }, { label: 'Éva', segs: [{ w: 1, text: '7' }, { w: 1, text: '7' }] }]} />),
  q(57, 2, 'Felcserélés', '8 · 4 = 4 · □. Mi kerül a □ helyére?', ['8', '4', '32', '12'],
    'Felcseréljük a tényezőket: 8 · 4 = 4 · 8 = 32.'),
  q(58, 2, 'Ugrások', 'Hová érkezik?', ['36', '13', '27', '45'],
    '9, 18, 27, 36. Négy ugrás, mindig 9: 4 · 9 = 36.', <QJumps step={9} jumps={4} />),
  q(59, 2, 'Többszörös', 'Melyik szám NEM a 6 többszöröse?', ['26', '24', '36', '54'],
    '4 · 6 = 24, 6 · 6 = 36, 9 · 6 = 54. A 26 nincs a 6-os táblában.'),
  q(60, 2, 'Pénz', 'Mennyi pénz van itt?', ['70 Ft', '17 Ft', '60 Ft', '80 Ft'],
    '7 darab 10 Ft-os: 7 · 10 = 70 Ft.', <QCoins values={[10, 10, 10, 10, 10, 10, 10]} />),

  // =========================================================================
  // 3. SZINT – két lépés, szöveges feladatok, nyitott mondatok
  // =========================================================================
  q(61, 3, 'Két lépés', '3 dobozban 6-6 tojás van. 4 tojás eltört. Hány ép tojás maradt?', ['14', '22', '18', '12'],
    'Előbb: 3 · 6 = 18 tojás. Aztán: 18 − 4 = 14 ép tojás.', <QGroups sizes={[6, 6, 6]} caption="3 doboz tojás" />),
  q(62, 3, 'Műveletsor', 'Mennyi 5 · 6 + 5?', ['35', '40', '30', '36'],
    'Előbb szorzunk: 5 · 6 = 30. Aztán: 30 + 5 = 35.'),
  q(63, 3, 'Műveletsor', 'Mennyi 4 · 9 − 6?', ['30', '32', '36', '20'],
    'Előbb szorzunk: 4 · 9 = 36. Aztán: 36 − 6 = 30.'),
  q(64, 3, 'Két szín', 'Egy csomagban 4 piros és 3 kék golyó van. Hány golyó van 5 csomagban?', ['35', '12', '27', '40'],
    'Egy csomagban 4 + 3 = 7 golyó. 5 csomagban: 5 · 7 = 35.',
    <QGroups sizes={[7, 7, 7, 7, 7]} split={4} color="#3b82f6" color2="#ef4444" />),
  q(65, 3, 'Nyitott mondat', 'Mely számok kerülhetnek a □ helyére? □ · 7 < 30', ['0, 1, 2, 3, 4', '1, 2, 3, 4', '0, 1, 2, 3, 4, 5', '5, 6, 7'],
    '4 · 7 = 28, ez kevesebb, mint 30. 5 · 7 = 35, ez már sok. A 0 is jó: 0 · 7 = 0.'),
  q(66, 3, 'Összehasonlítás', 'Melyik jel kerül a ? helyére?', ['<', '>', '='],
    '6 · 9 = 54 és 7 · 8 = 56. 54 kisebb, mint 56.', <QCompare left="6 · 9" right="7 · 8" />),
  q(67, 3, 'Szorzótábla', 'Melyik szám kerül a ? helyére a szorzótáblában?', ['72', '64', '81', '17'],
    'A kék sor a 8, a rózsaszín oszlop a 9: 8 · 9 = 72.', <QGrid10 row={8} col={9} />),
  q(68, 3, 'Fejtörő', 'Két egyforma szám szorzata 36. Melyik ez a szorzás?', ['6 · 6', '4 · 9', '9 · 4', '5 · 7'],
    '6 · 6 = 36, és a két tényező egyforma. A 4 · 9 is 36, de ott nem egyformák a számok.'),
  q(69, 3, 'Gondoltam egy számot', 'Gondoltam egy számot. A négyszerese 32. Melyik számra gondoltam?', ['8', '28', '36', '4'],
    '4 · 8 = 32, tehát a 8-ra gondoltam.', <QArrowMap from="?" to={32} op="· 4" />),
  q(70, 3, 'Műveletlánc', 'Melyik szám kerül a lánc végére?', ['24', '9', '12', '18'],
    '3 · 2 = 6, aztán 6 · 4 = 24. (Ez ugyanaz, mint 3 · 8.)', <QChain items={[3, '', '?']} ops={['· 2', '· 4']} />),
  q(71, 3, 'Vásárlás', 'Lili 6 radírt vesz, egy radír 10 Ft. 100 Ft-tal fizet. Mennyi pénzt kap vissza?', ['40 Ft', '60 Ft', '94 Ft', '50 Ft'],
    '6 radír: 6 · 10 = 60 Ft. Visszajár: 100 − 60 = 40 Ft.', <QTags n={6} text="10 Ft" caption="Fizet: 100 Ft" />),
  q(72, 3, 'Egyenlőség', 'Melyik igaz?', ['3 · 8 = 4 · 6', '3 · 8 = 4 · 7', '2 · 9 = 3 · 5', '5 · 5 = 4 · 6'],
    '3 · 8 = 24 és 4 · 6 = 24. A többinél a két oldal nem egyforma.'),
  q(73, 3, 'Háromszor annyi', 'Bencének 9 kisautója van. Zolinak háromszor ennyi. Hány kisautója van Zolinak?', ['27', '12', '18', '6'],
    'Háromszor annyi: 3 · 9 = 27.',
    <QStrips rows={[{ label: 'Bence', segs: [{ w: 1, text: '9' }] }, { label: 'Zoli', segs: [{ w: 1, text: '9' }, { w: 1, text: '9' }, { w: 1, text: '9' }] }]} />),
  q(74, 3, 'Csapda: több', 'Bencének 9 kisautója van. Zolinak 3-mal több. Hány kisautója van Zolinak?', ['12', '27', '6', '93'],
    '3-mal több: 9 + 3 = 12. Itt nem kell szorozni! A „háromszor annyi” lenne 27.',
    <QStrips rows={[{ label: 'Bence', segs: [{ w: 3, text: '9' }] }, { label: 'Zoli', segs: [{ w: 3, text: '9' }, { w: 1, text: '3' }] }]} />),
  q(75, 3, '5-ös és 10-es', '5 · 7 = 35 (kék sorok). Mennyi 10 · 7?', ['70', '40', '45', '75'],
    'A 10-es tábla az 5-ös kétszerese: 35 + 35 = 70.', <QArray rows={10} cols={7} splitRow={5} />),
  q(76, 3, 'Két szorzás', 'Hány kerék van összesen?', ['22', '14', '28', '24'],
    '4 autó: 4 · 4 = 16 kerék. 3 bicikli: 3 · 2 = 6 kerék. Együtt: 16 + 6 = 22.',
    <QGroups sizes={[4, 4, 4, 4, 2, 2, 2]} caption="4 autó és 3 bicikli kerekei" />),
  q(77, 3, 'Nyitott mondat', 'Mely számok kerülhetnek a □ helyére? □ · 6 > 40, és a □ kisebb, mint 9.', ['7, 8', '7, 8, 9', '6, 7, 8', '8'],
    '6 · 6 = 36, ez kevés. 7 · 6 = 42 és 8 · 6 = 48 jó. A 9 nem kisebb, mint 9.'),
  q(78, 3, 'Szorzótábla', 'Melyik szám hiányzik a kék sor elejéről?', ['9', '8', '6', '48'],
    '? · 6 = 54. Mivel 9 · 6 = 54, a sor eleje a 9.', <QGrid10 row={9} col={6} cell="54" hideRow />),
  q(79, 3, 'Közös többszörös', 'Melyik szám a 4-nek és a 6-nak is többszöröse?', ['24', '16', '18', '30'],
    '6 · 4 = 24 és 4 · 6 = 24. A 16 csak a 4-es, a 18 és a 30 csak a 6-os táblában van.'),
  q(80, 3, 'Melyik illik?', 'Melyik szorzat van a 30 és a 36 között?', ['4 · 8', '5 · 6', '6 · 6', '3 · 9'],
    '4 · 8 = 32, ez 30 és 36 között van. 5 · 6 = 30 és 6 · 6 = 36 nincs közöttük, 3 · 9 = 27 kisebb.'),
  q(81, 3, 'Hetek', 'Hány nap 4 hét?', ['28', '11', '21', '35'],
    'Egy hét 7 nap: 4 · 7 = 28 nap.', <QGroups sizes={[7, 7, 7, 7]} caption="4 hét, hetente 7 nap" />),
  q(82, 3, 'Két lépés', '5 tálcán 8-8 sütemény van. A gyerekek megettek 10-et. Hány sütemény maradt?', ['30', '40', '50', '13'],
    'Előbb: 5 · 8 = 40 sütemény. Aztán: 40 − 10 = 30.', <QGroups sizes={[8, 8, 8, 8, 8]} caption="5 tálca sütemény" />),
  q(83, 3, 'Melyik nagyobb?', 'Melyik nagyobb: a 8 hatszorosa vagy a 7 hétszerese?', ['a 7 hétszerese', 'a 8 hatszorosa', 'egyformák'],
    'A 8 hatszorosa: 6 · 8 = 48. A 7 hétszerese: 7 · 7 = 49. A 49 a nagyobb.', <QCompare left="6 · 8" right="7 · 7" />),
  q(84, 3, 'Fejtörő', 'Két szám szorzata 24, az összegük 10. Melyik ez a két szám?', ['4 és 6', '3 és 8', '2 és 12', '5 és 5'],
    '4 · 6 = 24 és 4 + 6 = 10. A 3 + 8 = 11, a 2 + 12 = 14, az 5 · 5 = 25.'),
  q(85, 3, 'Számsor', 'Melyik szám hiányzik?', ['32', '30', '28', '36'],
    'Mindig 8-cal több: 24 + 8 = 32. Ez a 8-as tábla.', <QSeq items={[8, 16, 24, '?', 40]} />),
  q(86, 3, 'Pénz', 'Mennyi pénz van itt?', ['75 Ft', '65 Ft', '55 Ft', '80 Ft'],
    'Három 20 Ft-os: 20 + 20 + 20 = 60 Ft. Még 10 Ft és 5 Ft: 60 + 10 + 5 = 75 Ft.', <QCoins values={[20, 20, 20, 10, 5]} />),
  q(87, 3, 'Szorzás 0-val', 'Melyik szorzásnak 0 az eredménye?', ['7 · 0', '7 · 1', '1 · 1', '7 + 0'],
    'Ha a 0-t vesszük hétszer, 0 lesz. 7 · 1 = 7, 1 · 1 = 1, 7 + 0 = 7.'),
  q(88, 3, 'Két lépés', '6 sorban 7-7 szék van, és még 3 szék áll a falnál. Hány szék van összesen?', ['45', '42', '49', '39'],
    'Előbb: 6 · 7 = 42 szék. Aztán: 42 + 3 = 45.', <QArray rows={6} cols={7} caption="+ 3 szék a falnál" />),
  q(89, 3, 'Ügyes trükk', 'Kati így számolt: 3 · 9 = 3 · 10 − 3. Mennyi 3 · 9?', ['27', '30', '33', '7'],
    '3 · 10 = 30. Minden sorból elveszünk 1 pöttyöt, ez 3 pötty: 30 − 3 = 27.', <QArray rows={3} cols={10} crossCol={9} />),
  q(90, 3, 'Egyenlőség', '6 · □ = 3 · 8. Mi kerül a □ helyére?', ['4', '8', '3', '5'],
    '3 · 8 = 24. 6 · 4 = 24, tehát a □ helyére 4 kerül.'),
];

export const MultExamG2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="szorzas"
    topicId="g2-szorzas-tudasproba-quiz"
    subtopicId="gyakorlas-tudasproba"
    title="10. Gyakorlás, tudáspróba – Tudáspróba Kvíz"
    subtitle="90 feladat 3 szinten: a szorzás jelentése, a teljes szorzótábla, felcserélés, a táblák kapcsolata, -szorosa, szöveges feladatok."
    badge="2. OSZTÁLY • IV. SZORZÁS • KVÍZ"
    questions={MULT_EXAM_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'A szorzás jelentése',
        items: ['3 · 4 = 4 + 4 + 4 = 12', '3 csoport, csoportonként 4', 'Olvasd: háromszor négy', '0 · 7 = 0, 1 · 7 = 7'],
      },
      {
        title: 'A táblák segítenek',
        items: ['4-es = a 2-es kétszerese, 8-as = a 4-es kétszerese', '6-os = a 3-as kétszerese', '9-es = a 3-as háromszorosa', '10-es = az 5-ös kétszerese'],
      },
      {
        title: 'Jó tudni',
        items: ['4 · 6 = 6 · 4 (felcserélhetők)', 'A 7 ötszöröse: 5 · 7 = 35', '„3-mal több”: + 3, „háromszor annyi”: · 3', 'Előbb szorozz, aztán adj össze vagy vonj ki!'],
      },
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={
      <MultExamG2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
    }
    sorterComponent={
      <MultExamG2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
    }
  />
);

export default MultExamG2Quiz;
