import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { DivExamG2Matcher } from './DivExamG2Matcher';
import { DivExamG2Sorter } from './DivExamG2Sorter';
import {
  QGroups,
  QDots,
  QArray,
  QJumps,
  QChain,
  QArrowMap,
  QCompare,
  QTable,
  QCoins,
  QStrips,
  QGrid10,
} from '../../szorzas/gyakorlas-tudasproba/MultExamG2Parts';
import { QPlates, QRemainder, QBoxNeed, QFamily } from './DivExamG2Parts';

const q = (
  n: number,
  level: 1 | 2 | 3,
  questionTypeBadge: string,
  question: string,
  options: string[],
  explanation: string,
  figure?: React.ReactNode
): QuizQuestion => ({
  id: `g2divex-q${n}`,
  level,
  questionTypeBadge,
  question,
  options,
  correctAnswer: 0,
  explanation,
  ...(figure ? { figure } : {}),
});

export const DIV_EXAM_G2_QUESTIONS: QuizQuestion[] = [
  // =========================================================================
  // 1. SZINT – bennfoglalás, részekre osztás, könnyű osztások, képek
  // =========================================================================
  q(1, 1, 'Szétosztás', '12 sütit 3 tányérra osztunk egyformán. Mennyi jut egy tányérra?', ['4', '3', '9', '15'],
    '12 : 3 = 4, mert 4 · 3 = 12.', <QPlates plates={3} pile={12} />),
  q(2, 1, 'Csoportosítás', 'Hány hármas csoport van a 15-ben?', ['5', '3', '15', '4'],
    '5 csoportot látsz, mindegyikben 3 van: 15 : 3 = 5.', <QGroups sizes={[3, 3, 3, 3, 3]} color="#7c3aed" />),
  q(3, 1, '5-tel osztás', 'Mennyi 20 : 5?', ['4', '5', '15', '25'],
    '4 · 5 = 20, ezért 20 : 5 = 4.'),
  q(4, 1, 'Rácspontok', '18 pötty van 2 sorban. Hány pötty van egy sorban?', ['9', '8', '16', '20'],
    '18 : 2 = 9, mert 9 + 9 = 18.', <QArray rows={2} cols={9} />),
  q(5, 1, 'Csoportosítás', 'Hány 6-os csoport van a 24-ben?', ['4', '6', '24', '30'],
    '4 csoport, mindegyikben 6: 24 : 6 = 4.', <QGroups sizes={[6, 6, 6, 6]} color="#7c3aed" />),
  q(6, 1, '10-zel osztás', 'Mennyi 30 : 10?', ['3', '20', '10', '40'],
    '3 · 10 = 30, ezért 30 : 10 = 3.'),
  q(7, 1, 'Ugrások', 'Hány 4-es ugrás kell 0-tól 28-ig?', ['7', '6', '8', '24'],
    '4, 8, 12, 16, 20, 24, 28: 7 ugrás. 28 : 4 = 7.', <QJumps step={4} jumps={7} askJumps />),
  q(8, 1, 'Fele', 'Mennyi a 16 fele?', ['8', '6', '4', '32'],
    'A fele: 16 : 2 = 8, mert 8 + 8 = 16.', <QArrowMap from={16} to="?" op="fele" />),
  q(9, 1, 'Szétosztás', '35 sütit 7 tányérra osztunk egyformán. Mennyi jut egy tányérra?', ['5', '6', '7', '28'],
    '35 : 7 = 5, mert 5 · 7 = 35.', <QPlates plates={7} pile={35} />),
  q(10, 1, 'Ellenőrzés', 'Melyik szorzással ellenőrzöd? 27 : 3 = 9', ['9 · 3 = 27', '27 · 3 = 81', '9 + 3 = 12', '27 − 3 = 24'],
    'Az eredményt (9) szorozd meg azzal, amivel osztottál (3): 9 · 3 = 27. Stimmel!'),
  q(11, 1, 'Pénz', 'Hány 10 Ft-os érme ér annyit, mint 40 Ft?', ['4', '10', '30', '40'],
    '4 · 10 = 40, ezért 40 : 10 = 4 érme.', <QCoins values={[10]} caption="Hány ilyen kell 40 Ft-hoz?" />),
  q(12, 1, 'Osztás 0-ból', 'Mennyi 0 : 6?', ['0', '6', '1', '60'],
    'Ha nincs mit szétosztani, mindenki 0-t kap: 0 : 6 = 0.'),
  q(13, 1, 'Önmagával', 'Mennyi 9 : 9?', ['1', '0', '9', '18'],
    'A 9-ben a 9 egyszer van meg: 9 : 9 = 1.'),
  q(14, 1, 'Szorzás és osztás', 'Minden tányérra 5 süti jutott. Hány süti volt összesen?', ['20', '9', '5', '25'],
    '4 tányér, mindegyiken 5: 4 · 5 = 20. Ellenőrzés: 20 : 4 = 5.', <QPlates plates={4} each={5} />),
  q(15, 1, 'Harmada', 'Mennyi a 30 harmada?', ['10', '3', '27', '33'],
    'A harmada: 30 : 3 = 10, mert 3 · 10 = 30.', <QArrowMap from={30} to="?" op="harmada" />),
  q(16, 1, 'Párok', '12 zokniból hány pár lesz?', ['6', '12', '10', '24'],
    'Egy párban 2 zokni van: 12 : 2 = 6 pár.', <QDots n={12} perRow={6} />),
  q(17, 1, 'Maradék', 'Párokba rakjuk a korongokat. Hány maradt ki?', ['1', '2', '3', '0'],
    '3 pár = 6 korong. 7 − 6 = 1 maradt ki.', <QRemainder n={7} d={2} ask={false} />),
  q(18, 1, 'Igaz vagy hamis?', 'Melyik igaz?', ['24 : 4 = 6', '24 : 4 = 5', '24 : 4 = 20', '24 : 4 = 28'],
    '6 · 4 = 24, ezért 24 : 4 = 6.'),
  q(19, 1, '5-tel osztás', 'Mennyi 45 : 5?', ['9', '8', '40', '50'],
    'Ötösével 45-ig 9 ugrás kell: 9 · 5 = 45.', <QJumps step={5} jumps={9} askJumps />),
  q(20, 1, '10-zel osztás', 'Mennyi 50 : 10?', ['5', '40', '10', '60'],
    '5 · 10 = 50, ezért 50 : 10 = 5.'),
  q(21, 1, 'Rácspontok', '14 : 2 = 7. Mennyi 14 : 7?', ['2', '7', '14', '21'],
    '2 sor, soronként 7 pötty. 14 : 2 = 7 és 14 : 7 = 2.', <QArray rows={2} cols={7} />),
  q(22, 1, 'Szétosztás', '10 almát 2 tányérra teszünk egyformán. Mennyi jut egy tányérra?', ['5', '8', '12', '2'],
    '10 : 2 = 5, mert 5 + 5 = 10.', <QPlates plates={2} pile={10} />),
  q(23, 1, 'Csoportosítás', 'Hány 7-es csoport van a 21-ben?', ['3', '7', '21', '14'],
    '3 csoport, mindegyikben 7: 21 : 7 = 3.', <QGroups sizes={[7, 7, 7]} color="#7c3aed" />),
  q(24, 1, '8-cal osztás', 'Mennyi 64 : 8?', ['8', '7', '9', '56'],
    '8 · 8 = 64, ezért 64 : 8 = 8.'),
  q(25, 1, 'Hiányzó szám', '6 · □ = 30. Mi kerül a □ helyére?', ['5', '6', '24', '36'],
    '30 : 6 = 5, mert 6 · 5 = 30.'),
  q(26, 1, 'Csoportosítás', 'Rakd a pöttyöket 4-esével! Hány csoport lesz?', ['5', '4', '16', '24'],
    '20 : 4 = 5, mert 5 · 4 = 20.', <QDots n={20} perRow={10} caption="20 pötty" />),
  q(27, 1, 'Tizede', 'Mennyi a 60 tizede?', ['6', '10', '50', '70'],
    'A tizede: 60 : 10 = 6.', <QArrowMap from={60} to="?" op="tizede" />),
  q(28, 1, '9-cel osztás', 'Mennyi 81 : 9?', ['9', '8', '72', '90'],
    '9 · 9 = 81, ezért 81 : 9 = 9.', <QJumps step={9} jumps={9} askJumps />),
  q(29, 1, 'Maradékos', 'Hármas csoportokba raktuk. Hány csoport lett, és mennyi maradt?', ['3 csoport, maradt 1', '3 csoport, maradt 2', '2 csoport, maradt 4', '4 csoport, maradt 0'],
    '3 csoport = 9 korong, 1 maradt. Ellenőrzés: 3 · 3 + 1 = 10.', <QRemainder n={10} d={3} />),
  q(30, 1, 'Melyik osztás?', 'Melyik osztásnak 4 az eredménye?', ['32 : 8', '32 : 4', '24 : 8', '36 : 4'],
    '32 : 8 = 4. A többi: 32 : 4 = 8, 24 : 8 = 3, 36 : 4 = 9.'),

  // =========================================================================
  // 2. SZINT – minden tábla, -ad része, hiányzó szám, maradék, „hány kell”
  // =========================================================================
  q(31, 2, '7-tel osztás', 'Mennyi 56 : 7?', ['8', '7', '9', '49'],
    '8 · 7 = 56, ezért 56 : 7 = 8.'),
  q(32, 2, 'Hiányzó szám', '□ : 6 = 7. Mi kerül a □ helyére?', ['42', '13', '36', '48'],
    'Szorozz: 7 · 6 = 42. Ellenőrzés: 42 : 6 = 7.', <QArrowMap from="?" to={7} op=": 6" />),
  q(33, 2, '9-cel osztás', 'Mennyi 72 : 9?', ['8', '9', '7', '63'],
    '8 · 9 = 72, ezért 72 : 9 = 8.', <QJumps step={9} jumps={8} askJumps />),
  q(34, 2, 'Hatoda', 'Mennyi a 48 hatoda?', ['8', '6', '42', '7'],
    'A hatoda: 48 : 6 = 8, mert 8 · 6 = 48.', <QArrowMap from={48} to="?" op="hatoda" />),
  q(35, 2, 'Maradékos', 'Ötös csoportokba raktuk. Hány csoport lett, és mennyi maradt?', ['3 csoport, maradt 2', '2 csoport, maradt 7', '4 csoport, maradt 3', '3 csoport, maradt 3'],
    '3 · 5 = 15, és 17 − 15 = 2. Ellenőrzés: 3 · 5 + 2 = 17.', <QRemainder n={17} d={5} />),
  q(36, 2, 'Ellenőrzés', '23 almát 4-esével csomagolunk: 5 csoport lett, maradt 3. Melyik ellenőrzés jó?', ['5 · 4 + 3 = 23', '5 · 3 + 4 = 19', '4 · 3 + 5 = 17', '5 · 4 − 3 = 17'],
    'A csoportok száma szorozva a csoport nagyságával, meg a maradék: 5 · 4 + 3 = 23.'),
  q(37, 2, 'A maradék', '6-tal osztunk. Melyik szám NEM lehet a maradék?', ['6', '5', '3', '0'],
    'A maradék mindig kevesebb, mint 6. Ha 6 maradna, abból még egy csoport kijönne.'),
  q(38, 2, 'Szétosztás', '36 diót 4 tányérra osztunk egyformán. Hány jut egy tányérra?', ['9', '8', '32', '40'],
    '36 : 4 = 9, mert 9 · 4 = 36.', <QPlates plates={4} pile={36} />),
  q(39, 2, 'Csomagolás', '42 tojást 6-osával dobozolunk. Hány doboz lesz?', ['7', '6', '36', '48'],
    '42 : 6 = 7, mert 7 · 6 = 42.', <QBoxNeed total={42} each={6} kind="box" item="tojás" ask="Hány doboz?" />),
  q(40, 2, 'Hány kell?', '25 gyerek csónakázik, egy csónakba 4 fér. Hány csónak kell?', ['7', '6', '5', '21'],
    '6 · 4 = 24, és 1 gyerek még marad. Neki is kell csónak: 6 + 1 = 7.', <QBoxNeed total={25} each={4} kind="boat" item="gyerek" />),
  q(41, 2, 'Műveletcsalád', 'Melyik NEM tartozik ehhez a családhoz?', ['48 : 4 = 12', '6 · 8 = 48', '48 : 6 = 8', '8 · 6 = 48'],
    'A 6, 8, 48 család: 6 · 8 = 48, 8 · 6 = 48, 48 : 6 = 8, 48 : 8 = 6. A 4 és a 12 nincs benne.', <QFamily a={6} b={8} c={48} />),
  q(42, 2, 'Melyik osztás?', 'Melyik osztás eredménye 7?', ['63 : 9', '56 : 7', '54 : 9', '64 : 8'],
    '63 : 9 = 7. A többi: 56 : 7 = 8, 54 : 9 = 6, 64 : 8 = 8.'),
  q(43, 2, 'Műveletsor', 'Mennyi 90 : 10 − 4?', ['5', '9', '86', '6'],
    'Előbb osztunk: 90 : 10 = 9. Aztán: 9 − 4 = 5.'),
  q(44, 2, 'Szétosztás', '40 sütit 5 tányérra osztunk egyformán. Mennyi jut egy tányérra?', ['8', '5', '35', '45'],
    '40 : 5 = 8, mert 8 · 5 = 40.', <QPlates plates={5} pile={40} />),
  q(45, 2, 'Melyik nagyobb?', 'Melyik nagyobb: a 27 harmada vagy a 32 negyede?', ['a 27 harmada', 'a 32 negyede', 'egyformák'],
    'A 27 harmada: 27 : 3 = 9. A 32 negyede: 32 : 4 = 8. A 9 a nagyobb.', <QCompare left="27 : 3" right="32 : 4" />),
  q(46, 2, 'Hiányzó szám', '□ : 8 = 5. Mi kerül a □ helyére?', ['40', '13', '3', '45'],
    'Szorozz: 5 · 8 = 40. Ellenőrzés: 40 : 8 = 5.'),
  q(47, 2, 'Maradékos', 'Nyolcas csoportokba raktuk. Hány csoport lett, és mennyi maradt?', ['3 csoport, maradt 2', '2 csoport, maradt 10', '3 csoport, maradt 6', '4 csoport, maradt 2'],
    '3 · 8 = 24, és 26 − 24 = 2. Ellenőrzés: 3 · 8 + 2 = 26.', <QRemainder n={26} d={8} />),
  q(48, 2, 'Műveletsor', 'Mennyi 49 : 7 + 3?', ['10', '7', '52', '4'],
    'Előbb osztunk: 49 : 7 = 7. Aztán: 7 + 3 = 10.'),
  q(49, 2, 'Ugrások', 'Hány 9-es van a 45-ben?', ['5', '9', '36', '4'],
    'Kilencesével 45-ig 5 ugrás: 45 : 9 = 5.', <QJumps step={9} jumps={5} askJumps />),
  q(50, 2, 'Maradék nélkül', 'Melyik számot lehet 7-esével csoportosítani úgy, hogy semmi se maradjon?', ['63', '57', '47', '37'],
    '63 = 9 · 7, nem marad semmi. 57-nél 1, 47-nél 5, 37-nél 2 marad.'),
  q(51, 2, 'Táblázat', 'Hány 6-os doboz kell 24 tojáshoz?', ['4', '6', '5', '24'],
    'Minden doboz 6 tojás: 24 : 6 = 4.',
    <QTable topLabel="tojás" bottomLabel="6-os doboz" top={[12, 18, 24, 30]} bottom={[2, 3, '?', 5]} />),
  q(52, 2, 'Hetek', 'Hány hét 35 nap?', ['5', '7', '28', '42'],
    'Egy hét 7 nap: 35 : 7 = 5 hét.', <QJumps step={7} jumps={5} askJumps />),
  q(53, 2, 'Maradékos', '30 szem cukrot 7-esével teszünk zacskóba. Hány teli zacskó lesz, és mennyi marad?', ['4 zacskó, maradt 2', '5 zacskó, maradt 5', '3 zacskó, maradt 9', '4 zacskó, maradt 3'],
    '4 · 7 = 28, és 30 − 28 = 2. Ellenőrzés: 4 · 7 + 2 = 30.', <QRemainder n={30} d={7} ask={false} />),
  q(54, 2, 'Feleannyi', 'Pistának 18 golyója van. Bálintnak feleannyi. Hány golyója van Bálintnak?', ['9', '36', '16', '20'],
    'Feleannyi: 18 : 2 = 9. A 36 a kétszer annyi lenne.',
    <QStrips rows={[{ label: 'Pista', segs: [{ w: 2, text: '18' }] }, { label: 'Bálint', segs: [{ w: 1, text: '?' }] }]} />),
  q(55, 2, 'Ellenőrzés', 'Melyik szorzás ellenőrzi ezt: 32 : 4 = 8?', ['8 · 4 = 32', '4 · 4 = 16', '32 − 4 = 28', '8 + 4 = 12'],
    'Az eredményt (8) szorozd meg 4-gyel: 8 · 4 = 32.'),
  q(56, 2, 'Hetede', 'Mennyi a 63 hetede?', ['9', '7', '56', '8'],
    'A hetede: 63 : 7 = 9, mert 9 · 7 = 63.', <QArrowMap from={63} to="?" op="hetede" />),
  q(57, 2, 'Szorzótábla', '7 · ? = 42. Melyik szám hiányzik az oszlop tetejéről?', ['6', '7', '5', '35'],
    '42 : 7 = 6, mert 7 · 6 = 42.', <QGrid10 row={7} col={6} cell="42" hideCol />),
  q(58, 2, '10-zel osztás', 'Mennyi 100 : 10?', ['10', '90', '1', '100'],
    '10 · 10 = 100, ezért 100 : 10 = 10.'),
  q(59, 2, 'Hány kell?', '38 könyvet teszünk polcokra, egy polcra 9 fér. Hány polc kell?', ['5', '4', '29', '2'],
    '4 · 9 = 36, és 2 könyv még marad. Nekik is kell polc: 4 + 1 = 5.', <QBoxNeed total={38} each={9} kind="shelf" item="könyv" />),
  q(60, 2, 'Hiányzó szám', '□ · 9 = 54. Mi kerül a □ helyére?', ['6', '5', '45', '63'],
    '54 : 9 = 6, mert 6 · 9 = 54.'),

  // =========================================================================
  // 3. SZINT – két lépés, maradék és ellenőrzés, „hány kell”, fejtörők
  // =========================================================================
  q(61, 3, 'Két lépés', '24 almát 3 tányérra osztunk egyformán. Aztán az egyik tányérról megeszünk 2-t. Mennyi marad azon a tányéron?', ['6', '8', '22', '5'],
    'Előbb: 24 : 3 = 8 alma jut egy tányérra. Aztán: 8 − 2 = 6.', <QPlates plates={3} pile={24} />),
  q(62, 3, 'Maradékos', 'Négyes csoportokba raktuk. Hány csoport lett, és mennyi maradt?', ['9 csoport, maradt 3', '8 csoport, maradt 7', '9 csoport, maradt 4', '10 csoport, maradt 1'],
    '9 · 4 = 36, és 39 − 36 = 3. Ellenőrzés: 9 · 4 + 3 = 39.', <QRemainder n={39} d={4} />),
  q(63, 3, 'Visszafelé', '7 hatos csoport lett, és maradt 4 korong. Hány korong volt?', ['46', '42', '38', '17'],
    '7 · 6 = 42, és még 4: 42 + 4 = 46.', <QRemainder n={46} d={6} ask={false} caption="Hány korong van?" />),
  q(64, 3, 'Hány kell?', '50 gyerek kirándul. Egy kisbuszba 8 gyerek fér. Hány kisbusz kell?', ['7', '6', '42', '58'],
    '6 · 8 = 48, és 2 gyerek még marad. Nekik is kell busz: 6 + 1 = 7.', <QBoxNeed total={50} each={8} kind="bus" item="gyerek" />),
  q(65, 3, 'Vásárlás', '45 Ft-od van. Egy matrica 10 Ft. Legfeljebb hány matricát veszel?', ['4', '5', '35', '10'],
    '4 · 10 = 40 Ft, és marad 5 Ft. Az 5 Ft már nem elég még egy matricára.', <QCoins values={[20, 20, 5]} caption="Egy matrica 10 Ft" />),
  q(66, 3, 'Fejtörő', 'Melyik szám osztható 3-mal is és 4-gyel is maradék nélkül?', ['24', '16', '18', '30'],
    '24 : 3 = 8 és 24 : 4 = 6. A 16 csak 4-gyel, a 18 és a 30 csak 3-mal osztható.'),
  q(67, 3, 'Összehasonlítás', 'Melyik jel kerül a ? helyére?', ['=', '<', '>'],
    '72 : 8 = 9 és 54 : 6 = 9. A két oldal egyenlő.', <QCompare left="72 : 8" right="54 : 6" />),
  q(68, 3, 'Összehasonlítás', 'Melyik jel kerül a □ helyére? 36 : 4 □ 5 · 2', ['<', '>', '='],
    '36 : 4 = 9 és 5 · 2 = 10. A 9 kisebb, mint 10.'),
  q(69, 3, 'Műveletlánc', 'Melyik szám kerül a lánc végére?', ['24', '8', '16', '18'],
    '48 : 6 = 8, aztán 8 · 3 = 24.', <QChain items={[48, '', '?']} ops={[': 6', '· 3']} />),
  q(70, 3, 'Gondoltam egy számot', 'Gondoltam egy számot. 7-tel osztottam, 6 lett. Melyik számra gondoltam?', ['42', '13', '1', '49'],
    'Visszafelé szorzunk: 6 · 7 = 42. Ellenőrzés: 42 : 7 = 6.', <QArrowMap from="?" to={6} op=": 7" />),
  q(71, 3, 'Két lépés', 'Mennyi a 40 negyedének a fele?', ['5', '10', '20', '8'],
    'A 40 negyede: 40 : 4 = 10. A 10 fele: 10 : 2 = 5.', <QChain items={[40, '', '?']} ops={[': 4', ': 2']} />),
  q(72, 3, 'Két lépés', 'A pék 60 kiflit 10-esével zacskóba tett. 2 zacskót eladott. Hány zacskó maradt?', ['4', '58', '6', '50'],
    'Előbb: 60 : 10 = 6 zacskó. Aztán: 6 − 2 = 4 zacskó.'),
  q(73, 3, 'A maradék', '8-cal osztunk. Mennyi lehet a legnagyobb maradék?', ['7', '8', '9', '1'],
    'A maradék mindig kevesebb, mint 8. A legnagyobb tehát 7.'),
  q(74, 3, 'Szétosztás maradékkal', '29 sütit 3 tányérra osztasz egyformán. Mennyi jut egy tányérra, és mennyi marad?', ['9 jut, maradt 2', '8 jut, maradt 5', '10 jut, maradt 1', '9 jut, maradt 1'],
    '9 · 3 = 27, és 29 − 27 = 2. Ellenőrzés: 9 · 3 + 2 = 29. 10 nem juthat, mert 10 · 3 = 30.', <QPlates plates={3} pile={29} />),
  q(75, 3, 'Hiányzó szám', '40 : □ = 8. Mi kerül a □ helyére?', ['5', '8', '32', '48'],
    'Hányszor 8 lesz 40? 5 · 8 = 40, tehát 40 : 5 = 8.'),
  q(76, 3, 'Szöveges', 'Egy 8 gyerekből álló csapat 56 labdát gyűjtött. Mindenki ugyanannyit. Hányat gyűjtött egy gyerek?', ['7', '8', '48', '64'],
    '56 : 8 = 7, mert 7 · 8 = 56.'),
  q(77, 3, 'Két lépés', 'Zsófi 3 csomag matricát vett, mindben 8 van. Szétosztja 4 barátja között egyformán. Hány matrica jut egynek?', ['6', '8', '24', '12'],
    'Előbb: 3 · 8 = 24 matrica. Aztán: 24 : 4 = 6.', <QGroups sizes={[8, 8, 8]} caption="3 csomag matrica" />),
  q(78, 3, 'Műveletcsalád', 'Melyik szám hiányzik a családból?', ['63', '16', '2', '56'],
    '9 · 7 = 63. A család: 9 · 7, 7 · 9, 63 : 7 = 9, 63 : 9 = 7.', <QFamily a={9} b={7} c="?" />),
  q(79, 3, 'Ötöde', 'Egy szám ötöde 8. Melyik ez a szám?', ['40', '13', '3', '45'],
    'A szám 5 egyforma részből áll, mindegyik 8: 5 · 8 = 40. Ellenőrzés: 40 : 5 = 8.',
    <QStrips rows={[{ label: '? szám', segs: [1, 2, 3, 4, 5].map(() => ({ w: 1, text: '8' })) }]} />),
  q(80, 3, 'Keresd a hibát!', 'Bori így írta: 22 korong 5-ösével: 3 csoport, maradt 7. Mi a hiba?', ['A maradék túl sok: 4 csoport, maradt 2', 'Nincs hiba', '5 csoport, maradt 0', '2 csoport, maradt 12'],
    'A 7-ből még egy ötös csoport kijön! Helyesen: 4 csoport, maradt 2. Ellenőrzés: 4 · 5 + 2 = 22.', <QRemainder n={22} d={5} ask={false} />),
  q(81, 3, 'Teli dobozok', '34 tojás van, egy dobozba 6 fér. Hány doboz lesz tele?', ['5', '6', '4', '28'],
    '5 · 6 = 30, és 4 tojás marad. 5 doboz lesz tele.', <QBoxNeed total={34} each={6} kind="box" item="tojás" ask="Hány lesz tele?" />),
  q(82, 3, 'Hány kell?', 'Hány doboz kell, hogy mind a 34 tojás elférjen, ha egy dobozba 6 fér?', ['6', '5', '7', '4'],
    '5 teli doboz, és a maradék 4 tojásnak is kell egy: 5 + 1 = 6.', <QBoxNeed total={34} each={6} kind="box" item="tojás" />),
  q(83, 3, 'Igaz vagy hamis?', 'Melyik igaz?', ['45 : 9 = 5, mert 5 · 9 = 45', '45 : 9 = 4, mert 4 · 9 = 45', '45 : 9 = 6, mert 6 · 9 = 45', '45 : 9 = 36, mert 45 − 9 = 36'],
    '5 · 9 = 45, ezért 45 : 9 = 5. A 4 · 9 = 36 és a 6 · 9 = 54.'),
  q(84, 3, 'Pénz', '9 gyerek egyformán osztozik ezen a pénzen. Mennyi jut egynek?', ['10 Ft', '9 Ft', '81 Ft', '20 Ft'],
    'Összesen: 50 + 20 + 20 = 90 Ft. 90 : 9 = 10 Ft.', <QCoins values={[50, 20, 20]} />),
  q(85, 3, 'Oda-vissza', 'Mennyi 7 · 8 : 8?', ['7', '8', '56', '1'],
    '7 · 8 = 56, aztán 56 : 8 = 7. Szoroztunk 8-cal, aztán osztottunk 8-cal: visszakaptuk a 7-et.'),
  q(86, 3, 'Rácspontok', '63 : 7 = 9. Mennyi 63 : 9?', ['7', '9', '56', '8'],
    '7 sor, soronként 9 pötty: 63 : 7 = 9 és 63 : 9 = 7.', <QArray rows={7} cols={9} />),
  q(87, 3, 'Ki kap többet?', '30 cukrot 6 gyerek kap egyformán, vagy 32 cukrot 8 gyerek. Hol kap több cukrot egy gyerek?', ['a 30 cukornál', 'a 32 cukornál', 'egyformán kapnak'],
    '30 : 6 = 5 és 32 : 8 = 4. Az 5 több, mint 4.', <QCompare left="30 : 6" right="32 : 8" />),
  q(88, 3, 'Harmada', 'Egy dobozban 9 golyó van. Ennek a harmada piros. Hány piros golyó van?', ['3', '6', '9', '27'],
    'A 9 harmada: 9 : 3 = 3.', <QDots n={9} perRow={9} color="#94a3b8" />),
  q(89, 3, 'Ellenőrzés', '58 korongot 7-esével rakunk: 8 csoport lett, maradt 2. Melyik ellenőrzés illik ide?', ['8 · 7 + 2 = 58', '7 · 2 + 8 = 22', '8 · 2 + 7 = 23', '8 · 7 − 2 = 54'],
    '8 csoport, mindegyikben 7: 8 · 7 = 56. Meg a maradék: 56 + 2 = 58.'),
  q(90, 3, 'Tízesével', '87 kockát tízesével rakunk rúdba. Hány rúd lesz, és mennyi marad?', ['8 rúd, maradt 7', '7 rúd, maradt 8', '8 rúd, maradt 0', '87 rúd, maradt 0'],
    '8 · 10 = 80, és 87 − 80 = 7. A tízesek száma 8, az egyesek száma 7.', <QRemainder n={87} d={10} ask={false} />),
];

export const DivExamG2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="osztas"
    topicId="g2-osztas-tudasproba-quiz"
    subtopicId="gyakorlas-tudasproba"
    title="10. Gyakorlás, tudáspróba – Tudáspróba Kvíz"
    subtitle="90 feladat 3 szinten: bennfoglalás és szétosztás, az osztás minden táblája, -ad része, ellenőrzés szorzással, maradékos osztás, hány kell."
    badge="2. OSZTÁLY • V. OSZTÁS • KVÍZ"
    questions={DIV_EXAM_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'Kétféle osztás',
        items: ['Hány 4-es van a 12-ben? 12 : 4 = 3', '12 sütit 3 tányérra: 12 : 3 = 4', 'Ellenőrzés szorzással: 3 · 4 = 12', 'fele : 2, harmada : 3, negyede : 4'],
      },
      {
        title: 'Maradékos osztás',
        items: ['23 korong 4-esével', 'Ennyi csoport: 5, ennyi maradt: 3', 'Ellenőrzés: 5 · 4 + 3 = 23', 'A maradék kevesebb, mint 4!'],
      },
      {
        title: 'Hány kell?',
        items: ['22 gyerek, egy csónakba 5 fér', '4 teli csónak, maradt 2 gyerek', 'Nekik is kell csónak: 5 csónak', 'Teli dobozok: ne számold a maradékot!'],
      },
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={
      <DivExamG2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
    }
    sorterComponent={
      <DivExamG2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
    }
  />
);

export default DivExamG2Quiz;
