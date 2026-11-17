import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Count500ExamG3Matcher } from './Count500ExamG3Matcher';
import { Count500ExamG3Sorter } from './Count500ExamG3Sorter';
import { BlocksFig, PlaceFig, NLFig, RoundFig, CoinsRow, ChainFig, DigitCards, TagsFig, MagicFig, TreesFig, TimesFig } from './Count500ExamG3Parts';
import { Jumps, BarFig, CompareFig } from '../osszeadas-es-kivonas/AddSub500G3QuizParts';
import { RodsFig, ShareFig, HopFig, CoinGridFig, AnalogyFig, FlatsFig, BoxesFig } from '../szorzas-es-osztas/MulDiv500G3QuizParts';

type Q = Omit<QuizQuestion, 'correctAnswer'>;
const q = (x: Q): QuizQuestion => ({ ...x, correctAnswer: 0 } as QuizQuestion);

// ---------------------------------------------------------------------------
// Kérdések – 1. szint (egy lépés)
// ---------------------------------------------------------------------------
const L1: QuizQuestion[] = [
  q({ id: 'c500e-q1', level: 1, questionTypeBadge: 'Számkép', figure: <BlocksFig sz={3} t={4} e={2} />, question: 'Melyik számot raktuk ki? (lap = 100, rúd = 10, kocka = 1)', options: ['342', '324', '243', '432'], explanation: '3 százas, 4 tízes, 2 egyes: 342.' }),
  q({ id: 'c500e-q2', level: 1, questionTypeBadge: 'Számírás', question: 'Hogyan írjuk számjeggyel: négyszázhat?', options: ['406', '460', '46', '416'], explanation: '4 százas, 0 tízes, 6 egyes: 406. A tízesek helyére 0 kerül.' }),
  q({ id: 'c500e-q3', level: 1, questionTypeBadge: 'Valódi érték', figure: <PlaceFig d={[2, 7, 5]} hl={1} />, question: 'Mennyi a 7-es valódi értéke a 275-ben?', options: ['70', '7', '75', '200'], explanation: 'A 7 a tízesek helyén áll: 7 tízes = 70.' }),
  q({ id: 'c500e-q4', level: 1, questionTypeBadge: 'Összehasonlítás', question: 'Melyik szám a legnagyobb?', options: ['430', '403', '340', '304'], explanation: 'Mindegyikben a százasokat nézd először: 4 százas a 430-ban és a 403-ban van. Tízesből a 430-ban van több.' }),
  q({ id: 'c500e-q5', level: 1, questionTypeBadge: 'Számegyenes', figure: <NLFig lo={0} hi={500} step={100} labelStep={500} mark={300} />, question: 'Melyik számnál van a nyíl?', options: ['300', '30', '3', '400'], explanation: 'Egy lépés 100. A 0-tól 3 lépés: 300.' }),
  q({ id: 'c500e-q6', level: 1, questionTypeBadge: 'Helyiérték', question: '2 százas + 5 tízes + 8 egyes = ?', options: ['258', '285', '250', '15'], explanation: '200 + 50 + 8 = 258.' }),
  q({ id: 'c500e-q7', level: 1, questionTypeBadge: 'Szomszédok', question: 'Melyek a 347 egyes szomszédai?', options: ['346 és 348', '340 és 350', '300 és 400', '345 és 349'], explanation: 'Egyes szomszéd: eggyel kisebb és eggyel nagyobb. 346 és 348.' }),
  q({ id: 'c500e-q8', level: 1, questionTypeBadge: 'Szomszédok', figure: <NLFig lo={200} hi={300} step={10} labelStep={50} mark={236} markLabel="236" />, question: 'Melyek a 236 tízes szomszédai?', options: ['230 és 240', '235 és 237', '200 és 300', '220 és 230'], explanation: 'A 236 a 230 és a 240 között van. Ezek a tízes szomszédai.' }),
  q({ id: 'c500e-q9', level: 1, questionTypeBadge: 'Kerekítés', figure: <RoundFig v={384} lo={380} hi={390} />, question: 'Kerekítsd tízesre: 384 ≈ ?', options: ['380', '390', '400', '300'], explanation: 'Az egyesek helyén 4 áll. 4 kisebb, mint 5, ezért lefelé: 380.' }),
  q({ id: 'c500e-q10', level: 1, questionTypeBadge: 'Kerekítés', figure: <RoundFig v={260} lo={200} hi={300} />, question: 'Kerekítsd százasra: 260 ≈ ?', options: ['300', '200', '260', '270'], explanation: 'A tízesek helyén 6 áll. 6 legalább 5, ezért felfelé: 300.' }),
  q({ id: 'c500e-q11', level: 1, questionTypeBadge: 'Szomszédok', figure: <NLFig lo={300} hi={500} step={10} labelStep={100} mark={418} />, question: 'A nyíl a 418-nál van. Melyik két kerek százas között van?', options: ['400 és 500', '300 és 400', '410 és 420', '300 és 500'], explanation: 'A 418-ban 4 százas van, tehát 400 és 500 között.' }),
  q({ id: 'c500e-q12', level: 1, questionTypeBadge: 'Szomszédok', question: 'Melyek a 300 százas szomszédai?', options: ['200 és 400', '300 és 400', '290 és 310', '200 és 300'], explanation: 'A szám nem lehet a saját szomszédja. A 300 előtt a 200, utána a 400 a kerek százas.' }),
  q({ id: 'c500e-q13', level: 1, questionTypeBadge: 'Pénz', figure: <CoinsRow coins={[200, 100, 100]} />, question: 'Mennyi pénz van itt?', options: ['400 Ft', '300 Ft', '3 Ft', '500 Ft'], explanation: '200 + 100 + 100 = 400 Ft.' }),
  q({ id: 'c500e-q14', level: 1, questionTypeBadge: 'Összeadás', question: '240 + 50 = ?', options: ['290', '245', '280', '190'], explanation: '24 tízes + 5 tízes = 29 tízes = 290.' }),
  q({ id: 'c500e-q15', level: 1, questionTypeBadge: 'Kivonás', figure: <Jumps minus lo={300} hi={400} start={370} jumps={[{ to: 330, label: '−40' }]} />, question: '370 − 40 = ?', options: ['330', '410', '340', '320'], explanation: '37 tízes − 4 tízes = 33 tízes = 330.' }),
  q({ id: 'c500e-q16', level: 1, questionTypeBadge: 'Kerek százasok', question: '500 − 300 = ?', options: ['200', '300', '20', '250'], explanation: '5 százas − 3 százas = 2 százas = 200.' }),
  q({ id: 'c500e-q17', level: 1, questionTypeBadge: 'Pótlás', figure: <BarFig known={450} />, question: '450 + □ = 500. Mennyi a □?', options: ['50', '150', '5', '60'], explanation: '450-től 500-ig 5 tízes hiányzik: 50.' }),
  q({ id: 'c500e-q18', level: 1, questionTypeBadge: 'Összeadás', question: '130 + 260 = ?', options: ['390', '290', '380', '400'], explanation: 'Százasok: 1 + 2 = 3. Tízesek: 3 + 6 = 9. Együtt 390.' }),
  q({ id: 'c500e-q19', level: 1, questionTypeBadge: 'Szorzás', figure: <RodsFig groups={4} per={3} />, question: '4 · 30 = ?', options: ['120', '12', '34', '70'], explanation: '4 · 3 tízes = 12 tízes = 120.' }),
  q({ id: 'c500e-q20', level: 1, questionTypeBadge: 'Szorzás 100-zal', figure: <FlatsFig n={4} />, question: 'Mennyi 4 · 100?', options: ['400', '104', '40', '500'], explanation: '4 százas = 400.' }),
  q({ id: 'c500e-q21', level: 1, questionTypeBadge: 'Tízszeres', question: 'Mennyi a 23 tízszerese?', options: ['230', '33', '203', '320'], explanation: '23 · 10 = 23 tízes = 230.' }),
  q({ id: 'c500e-q22', level: 1, questionTypeBadge: 'Osztás', figure: <ShareFig total={200} k={2} />, question: '200 : 2 = ?', options: ['100', '10', '198', '50'], explanation: '2 százast 2 részre osztunk: egy részbe 1 százas jut, 100.' }),
  q({ id: 'c500e-q23', level: 1, questionTypeBadge: 'Osztás 10-zel', question: '80 : 10 = ?', options: ['8', '80', '70', '10'], explanation: 'A 80-ban 8 tízes van, tehát 8-szor van meg benne a 10.' }),
  q({ id: 'c500e-q24', level: 1, questionTypeBadge: 'Pénz', figure: <CoinsRow coins={[50, 50, 50, 50, 50]} />, question: 'Mennyi pénz ez?', options: ['250 Ft', '55 Ft', '200 Ft', '300 Ft'], explanation: '5 db 50 forintos: 5 · 50 = 250 Ft.' }),
  q({ id: 'c500e-q25', level: 1, questionTypeBadge: 'Sorozat', figure: <ChainFig values={[100, 150, 200, '?']} ops={['+50', '+50', '+50']} />, question: 'Mi jön a sorban?', options: ['250', '210', '300', '201'], explanation: 'Mindig 50-et adunk hozzá: 200 + 50 = 250.' }),
  q({ id: 'c500e-q26', level: 1, questionTypeBadge: 'Sorozat', figure: <ChainFig values={[400, 380, 360, '?']} ops={['−20', '−20', '−20']} />, question: 'Mi jön a sorban?', options: ['340', '350', '320', '380'], explanation: 'Mindig 20-at veszünk el: 360 − 20 = 340.' }),
  q({ id: 'c500e-q27', level: 1, questionTypeBadge: 'Vásárlás', figure: <TagsFig pay prices={['300 Ft']} names={['labda']} />, question: 'A labda 300 Ft. 500 Ft-tal fizetsz. Mennyit kapsz vissza?', options: ['200 Ft', '300 Ft', '100 Ft', '250 Ft'], explanation: '500 − 300 = 200 Ft.' }),
  q({ id: 'c500e-q28', level: 1, questionTypeBadge: 'Összehasonlítás', question: 'Melyik igaz?', options: ['305 < 350', '450 < 405', '299 > 300', '410 = 401'], explanation: 'A 305-ben 0 tízes, a 350-ben 5 tízes van. Ezért 305 < 350.' }),
  q({ id: 'c500e-q29', level: 1, questionTypeBadge: 'Számkártyák', figure: <DigitCards digits={['4', '1', '3']} />, question: 'Melyik a legnagyobb háromjegyű szám ezekből a kártyákból?', options: ['431', '413', '341', '134'], explanation: 'A legnagyobb jegy kerül előre: 4, aztán 3, aztán 1. Ez 431.' }),
  q({ id: 'c500e-q30', level: 1, questionTypeBadge: 'Szöveges feladat', question: 'Az egyik polcon 120 könyv van, a másikon 200. Hány könyv van a két polcon?', options: ['320', '80', '220', '302'], explanation: '120 + 200 = 320 könyv.' })
];

// ---------------------------------------------------------------------------
// 2. szint (egy lépés, nehezebb számokkal, képről)
// ---------------------------------------------------------------------------
const L2: QuizQuestion[] = [
  q({ id: 'c500e-q31', level: 2, questionTypeBadge: 'Beváltás', figure: <BlocksFig sz={2} t={13} e={4} />, question: '2 százas, 13 tízes és 4 egyes. Melyik szám ez?', options: ['334', '234', '324', '343'], explanation: '10 tízes = 1 százas. 13 tízes = 1 százas és 3 tízes. Így 3 százas, 3 tízes, 4 egyes: 334.' }),
  q({ id: 'c500e-q32', level: 2, questionTypeBadge: 'Helyiérték', figure: <PlaceFig d={[4, 0, 9]} />, question: 'Melyik szám áll a táblázatban?', options: ['409', '490', '49', '419'], explanation: '4 százas, 0 tízes, 9 egyes: 409.' }),
  q({ id: 'c500e-q33', level: 2, questionTypeBadge: 'Számegyenes', figure: <NLFig lo={300} hi={400} step={10} labelStep={50} mark={370} />, question: 'Melyik számot jelöli a nyíl?', options: ['370', '307', '360', '380'], explanation: 'Egy kis lépés 10. A 350-től még 2 lépés: 370.' }),
  q({ id: 'c500e-q34', level: 2, questionTypeBadge: 'Számegyenes', figure: <NLFig lo={200} hi={300} step={10} labelStep={50} mark={245} />, question: 'Melyik szám lehet a nyílnál?', options: ['245', '254', '235', '265'], explanation: 'A nyíl a 240 és a 250 között, éppen középen van: 245.' }),
  q({ id: 'c500e-q35', level: 2, questionTypeBadge: 'Sorba rendezés', question: 'Melyik sor növekvő?', options: ['199, 291, 309, 390', '291, 199, 390, 309', '199, 309, 291, 390', '390, 309, 291, 199'], explanation: 'Növekvő: a legkisebbtől a legnagyobbig. 199 < 291 < 309 < 390.' }),
  q({ id: 'c500e-q36', level: 2, questionTypeBadge: 'Helyiérték', question: 'Hány tízes van összesen a 360-ban?', options: ['36', '6', '3', '360'], explanation: '360 = 36 tízes. (3 százas = 30 tízes, és még 6 tízes.)' }),
  q({ id: 'c500e-q37', level: 2, questionTypeBadge: 'Kerekítés', figure: <RoundFig v={349} lo={300} hi={400} />, question: 'Kerekítsd százasra: 349 ≈ ?', options: ['300', '400', '350', '340'], explanation: 'Százasra a tízest nézzük: 4. Ez kisebb, mint 5, tehát lefelé: 300. (Nem kerekítünk kétszer!)' }),
  q({ id: 'c500e-q38', level: 2, questionTypeBadge: 'Kerekítés', figure: <RoundFig v={495} lo={490} hi={500} />, question: 'Kerekítsd tízesre: 495 ≈ ?', options: ['500', '490', '400', '499'], explanation: 'Az egyesek helyén 5 áll, ezért felfelé: 500.' }),
  q({ id: 'c500e-q39', level: 2, questionTypeBadge: 'Szomszédok', question: 'Melyek a 490 tízes szomszédai?', options: ['480 és 500', '490 és 500', '480 és 490', '400 és 500'], explanation: 'A 490 kerek tízes, nem lehet a saját szomszédja. Előtte 480, utána 500.' }),
  q({ id: 'c500e-q40', level: 2, questionTypeBadge: 'Kerekítés', question: 'Melyik szám tízesre kerekített értéke 260?', options: ['264', '268', '254', '270'], explanation: '264 ≈ 260 (4 lefelé). 268 ≈ 270, 254 ≈ 250, a 270 marad 270.' }),
  q({ id: 'c500e-q41', level: 2, questionTypeBadge: 'Kerekítés', figure: <RoundFig v={250} lo={200} hi={300} />, question: 'Kerekítsd százasra: 250 ≈ ?', options: ['300', '200', '250', '260'], explanation: 'A tízesek helyén 5 áll. 5-nél felfelé kerekítünk: 300.' }),
  q({ id: 'c500e-q42', level: 2, questionTypeBadge: 'Szomszédok', question: 'Mi a 463 kisebb százas szomszédja?', options: ['400', '460', '500', '300'], explanation: 'A 463 a 400 és az 500 között van. A kisebb százas szomszéd a 400.' }),
  q({ id: 'c500e-q43', level: 2, questionTypeBadge: 'Százasátlépés', figure: <Jumps lo={260} hi={360} start={280} jumps={[{ to: 300, label: '+20' }, { to: 350, label: '+50' }]} />, question: '280 + 70 = ?', options: ['350', '250', '340', '360'], explanation: 'Előbb a 300-ig: +20. A 70-ből még 50 maradt: 300 + 50 = 350.' }),
  q({ id: 'c500e-q44', level: 2, questionTypeBadge: 'Százasátlépés', question: '430 − 80 = ?', options: ['350', '450', '360', '340'], explanation: '430 − 30 = 400. Aztán még 50: 400 − 50 = 350.' }),
  q({ id: 'c500e-q45', level: 2, questionTypeBadge: 'Bontás', figure: <Jumps lo={180} hi={450} start={190} jumps={[{ to: 390, label: '+200' }, { to: 430, label: '+40' }]} />, question: '190 + 240 = ?', options: ['430', '330', '420', '340'], explanation: 'Előbb +200: 390. Aztán +40: 390 + 10 = 400, 400 + 30 = 430.' }),
  q({ id: 'c500e-q46', level: 2, questionTypeBadge: 'Bontás', question: '450 − 170 = ?', options: ['280', '320', '380', '270'], explanation: 'Előbb −100: 350. Aztán −70: 350 − 50 = 300, 300 − 20 = 280.' }),
  q({ id: 'c500e-q47', level: 2, questionTypeBadge: 'Hiányzó szám', figure: <BarFig known={180} total={400} />, question: '□ + 180 = 400. Mennyi a □?', options: ['220', '320', '280', '210'], explanation: '180-tól 200-ig 20, 200-tól 400-ig 200. Együtt 220.' }),
  q({ id: 'c500e-q48', level: 2, questionTypeBadge: 'Pénz', figure: <CoinsRow coins={[200, 100, 50, 20, 20, 10]} />, question: 'Mennyi pénz van itt?', options: ['400 Ft', '390 Ft', '410 Ft', '380 Ft'], explanation: '200 + 100 + 50 = 350. Aztán 20 + 20 + 10 = 50. Együtt 400 Ft.' }),
  q({ id: 'c500e-q49', level: 2, questionTypeBadge: 'Szorzótábla', figure: <AnalogyFig a={8} b={5} />, question: 'Tudod, hogy 8 · 5 = 40. Mennyi 8 · 50?', options: ['400', '40', '450', '350'], explanation: '8 · 5 tízes = 40 tízes = 400.' }),
  q({ id: 'c500e-q50', level: 2, questionTypeBadge: 'Bennfoglalás', figure: <HopFig total={360} size={40} />, question: '360 : 40 = ?', options: ['9', '90', '8', '10'], explanation: '9 · 40 = 360, tehát a 40 kilencszer van meg a 360-ban.' }),
  q({ id: 'c500e-q51', level: 2, questionTypeBadge: 'Részekre osztás', figure: <ShareFig total={420} k={6} />, question: '420 : 6 = ?', options: ['70', '7', '60', '80'], explanation: '42 tízes : 6 = 7 tízes = 70. Ellenőrzés: 6 · 70 = 420.' }),
  q({ id: 'c500e-q52', level: 2, questionTypeBadge: 'Hiányzó szám', question: '□ · 60 = 300. Mennyi a □?', options: ['5', '50', '6', '240'], explanation: '5 · 60 = 300, tehát □ = 5.' }),
  q({ id: 'c500e-q53', level: 2, questionTypeBadge: 'Pénz', figure: <CoinGridFig rows={3} cols={5} v={20} />, question: 'Mennyi pénz van itt?', options: ['300 Ft', '15 Ft', '150 Ft', '280 Ft'], explanation: 'Egy sor: 5 · 20 = 100 Ft. 3 sor: 3 · 100 = 300 Ft.' }),
  q({ id: 'c500e-q54', level: 2, questionTypeBadge: 'Három tényező', question: '3 · 9 · 10 = ?', options: ['270', '27', '120', '300'], explanation: '3 · 9 = 27, aztán 27 · 10 = 270.' }),
  q({ id: 'c500e-q55', level: 2, questionTypeBadge: 'Sorozat', figure: <ChainFig values={[380, 290, 210, '?']} ops={['−90', '−80', '−70']} />, question: 'Mi kerül a ? helyére?', options: ['140', '150', '130', '70'], explanation: '210 − 70 = 140.' }),
  q({ id: 'c500e-q56', level: 2, questionTypeBadge: 'Sorozat', figure: <ChainFig values={[10, 20, 80, 90, '?']} ops={['+10', '· 4', '+10', '· 4']} />, question: 'Mi kerül a ? helyére?', options: ['360', '94', '100', '320'], explanation: 'Az utolsó nyíl: · 4. 90 · 4 = 9 tízes · 4 = 36 tízes = 360.' }),
  q({ id: 'c500e-q57', level: 2, questionTypeBadge: 'Vásárlás', figure: <TagsFig prices={['180 Ft', '90 Ft']} names={['füzet', 'ceruza']} />, question: 'Veszel egy füzetet és egy ceruzát. Mennyit fizetsz?', options: ['270 Ft', '170 Ft', '260 Ft', '280 Ft'], explanation: '180 + 90 = 180 + 20 + 70 = 270 Ft.' }),
  q({ id: 'c500e-q58', level: 2, questionTypeBadge: 'Igaz vagy hamis?', question: 'Melyik állítás igaz?', options: ['6 · 70 > 400', '5 · 90 < 400', '320 : 4 = 8', '200 + 290 > 500'], explanation: '6 · 70 = 420, és 420 > 400. A többi hamis: 450 nem kisebb 400-nál, 320 : 4 = 80, 490 nem nagyobb 500-nál.' }),
  q({ id: 'c500e-q59', level: 2, questionTypeBadge: 'Számkártyák', figure: <DigitCards digits={['2', '0', '5']} />, question: 'Melyik a legkisebb háromjegyű szám ezekből a kártyákból?', options: ['205', '250', '025', '200'], explanation: 'Háromjegyű szám nem kezdődhet 0-val. A legkisebb kezdés a 2, utána a 0, aztán az 5: 205.' }),
  q({ id: 'c500e-q60', level: 2, questionTypeBadge: 'Sorozat', question: 'Ugrálj 50-esével: 150, 200, 250, … Melyik szám NINCS a sorban?', options: ['320', '300', '350', '400'], explanation: 'A sor: 150, 200, 250, 300, 350, 400, 450, 500. A 320 nincs benne.' })
];

// ---------------------------------------------------------------------------
// 3. szint (legfeljebb két lépés)
// ---------------------------------------------------------------------------
const L3: QuizQuestion[] = [
  q({ id: 'c500e-q61', level: 3, questionTypeBadge: 'Beváltás', figure: <BlocksFig sz={3} t={15} e={6} />, question: '3 százas, 15 tízes és 6 egyes. Melyik szám ez?', options: ['456', '356', '465', '366'], explanation: '15 tízes = 1 százas és 5 tízes. Így 4 százas, 5 tízes, 6 egyes: 456.' }),
  q({ id: 'c500e-q62', level: 3, questionTypeBadge: 'Számrejtvény', question: 'A számban 4 százas van, a tízesek helyén 0 áll, az egyesek jegye 2-vel több a százasokénál. Melyik szám ez?', options: ['406', '460', '402', '446'], explanation: 'Százas: 4. Tízes: 0. Egyes: 4 + 2 = 6. A szám 406.' }),
  q({ id: 'c500e-q63', level: 3, questionTypeBadge: 'Számegyenes', figure: <NLFig lo={400} hi={500} step={20} labelStep={100} mark={460} />, question: 'Melyik számot jelöli a nyíl?', options: ['460', '430', '450', '470'], explanation: '400 és 500 között 5 lépés van, egy lépés 20. Három lépés: 400 + 60 = 460.' }),
  q({ id: 'c500e-q64', level: 3, questionTypeBadge: 'Nyitott mondat', question: '475 < □ < 485. Hány egész szám kerülhet a □ helyére?', options: ['9', '10', '8', '11'], explanation: '476, 477, 478, 479, 480, 481, 482, 483, 484 – ez 9 szám. A 475 és a 485 nem jó.' }),
  q({ id: 'c500e-q65', level: 3, questionTypeBadge: 'Számkártyák', figure: <DigitCards digits={['4', '1', '3', '8']} />, question: 'Három kártyából 500-nál kisebb számot raksz. Melyik a legnagyobb ilyen szám?', options: ['483', '438', '481', '431'], explanation: 'Az első jegy legfeljebb 4 lehet (500 alatt). Utána a legnagyobb: 8, aztán 3. Ez 483.' }),
  q({ id: 'c500e-q66', level: 3, questionTypeBadge: 'Letakart jegy', figure: <DigitCards digits={['3', '□', '6']} />, question: 'A szám százasra kerekítve 400. Melyik jegy lehet a letakart helyen?', options: ['7', '4', '2', '0'], explanation: 'A 3□6 csak akkor kerekedik 400-ra, ha a tízes jegye legalább 5. A 7 jó: 376 ≈ 400.' }),
  q({ id: 'c500e-q67', level: 3, questionTypeBadge: 'Kerekítés', question: 'Melyik szám lesz tízesre kerekítve 350, százasra kerekítve 300?', options: ['347', '352', '355', '298'], explanation: '347 ≈ 350 (tízesre) és 347 ≈ 300 (százasra, mert 4 tízes). 352 ≈ 400, 355 ≈ 360, 298 ≈ 300.' }),
  q({ id: 'c500e-q68', level: 3, questionTypeBadge: 'Becslés', figure: <TagsFig prices={['289 Ft']} names={['társasjáték']} />, question: 'Körülbelül mennyi ez az ár százasra kerekítve?', options: ['300 Ft', '200 Ft', '290 Ft', '280 Ft'], explanation: 'A 289-ben a tízes jegye 8, ez legalább 5. Felfelé: 300 Ft.' }),
  q({ id: 'c500e-q69', level: 3, questionTypeBadge: 'Kerekítés', question: 'Melyik szám százasra kerekített értéke NEM 400?', options: ['450', '350', '449', '399'], explanation: '450 ≈ 500 (5 tízes, felfelé). A 350, 449, 399 mind ≈ 400.' }),
  q({ id: 'c500e-q70', level: 3, questionTypeBadge: 'Becslés', figure: <TagsFig prices={['198 Ft', '203 Ft']} names={['kifestő', 'matrica']} />, question: 'Körülbelül mennyit fizetsz a kettőért? Kerekíts százasra!', options: ['400 Ft', '300 Ft', '500 Ft', '200 Ft'], explanation: '198 ≈ 200 és 203 ≈ 200. 200 + 200 = 400 Ft.' }),
  q({ id: 'c500e-q71', level: 3, questionTypeBadge: 'Szomszédok', figure: <NLFig lo={370} hi={380} step={1} labelStep={10} mark={376} markLabel="376" />, question: 'A 376 melyik tízes szomszédjához van közelebb, és mennyivel?', options: ['380-hoz, 4-gyel', '370-hez, 6-tal', '380-hoz, 6-tal', '400-hoz, 24-gyel'], explanation: '380 − 376 = 4, 376 − 370 = 6. A 380-hoz van közelebb, 4-gyel.' }),
  q({ id: 'c500e-q72', level: 3, questionTypeBadge: 'Kerekítés', figure: <RoundFig v={250} lo={200} hi={300} />, question: 'Mennyivel nagyobb a 250 százasra kerekített értéke, mint a 250?', options: ['50', '0', '100', '250'], explanation: '250 ≈ 300 (5 tízes, felfelé). 300 − 250 = 50.' }),
  q({ id: 'c500e-q73', level: 3, questionTypeBadge: 'Szöveges feladat', figure: <BarFig known={340} total={480} />, question: 'A futókör 480 m. Dani előbb 150 m-t, aztán 190 m-t fut. Mennyi van még hátra?', options: ['140 m', '340 m', '240 m', '160 m'], explanation: 'Eddig: 150 + 190 = 340 m. Hátra van: 480 − 340 = 140 m.' }),
  q({ id: 'c500e-q74', level: 3, questionTypeBadge: 'Szöveges feladat', question: 'Hétfőn 180 könyvet adtak ki a könyvtárban, kedden 70-nel többet. Hány könyvet adtak ki a két napon?', options: ['430', '250', '360', '440'], explanation: 'Kedden: 180 + 70 = 250. Két nap: 180 + 250 = 430.' }),
  q({ id: 'c500e-q75', level: 3, questionTypeBadge: 'Szöveges feladat', figure: <CompareFig a={{ name: 'Kata', v: 320 }} b={{ name: 'Bence', v: 180, hide: true }} diff="140" />, question: 'Kata 320 pontot gyűjtött, Bence 140-nel kevesebbet. Hány pontjuk van együtt?', options: ['500', '180', '460', '400'], explanation: 'Bence: 320 − 140 = 180. Együtt: 320 + 180 = 500.' }),
  q({ id: 'c500e-q76', level: 3, questionTypeBadge: 'Műveletsor', figure: <ChainFig values={[450, 380, '?']} ops={['−70', '−90']} />, question: '450 − 70 − 90 = ?', options: ['290', '470', '300', '280'], explanation: '450 − 70 = 380. 380 − 90 = 290.' }),
  q({ id: 'c500e-q77', level: 3, questionTypeBadge: 'Nyitott mondat', question: '320 + 150 < □ < 500 − 20. Melyik szám lehet a □?', options: ['475', '470', '480', '465'], explanation: '320 + 150 = 470, 500 − 20 = 480. A □ 470 és 480 között van: 475.' }),
  q({ id: 'c500e-q78', level: 3, questionTypeBadge: 'Gondolt szám', question: 'Gondoltam egy számot. Elvettem belőle 170-et, és 260 maradt. Melyik számra gondoltam?', options: ['430', '90', '330', '420'], explanation: 'Visszafelé: 260 + 170 = 430. Ellenőrzés: 430 − 170 = 260.' }),
  q({ id: 'c500e-q79', level: 3, questionTypeBadge: 'Szöveges feladat', figure: <BoxesFig n={6} label="30" />, question: '6 doboz tojás van, mindegyikben 30. Megsütöttek 70 tojást. Hány tojás maradt?', options: ['110', '180', '250', '120'], explanation: 'Összesen: 6 · 30 = 180. Maradt: 180 − 70 = 110.' }),
  q({ id: 'c500e-q80', level: 3, questionTypeBadge: 'Szöveges feladat', figure: <TimesFig a={{ name: 'kis busz', v: '30' }} b={{ name: 'nagy busz', parts: 4 }} note="a nagy busz négyszer annyi utast visz" />, question: 'A kis busz 30 utast visz, a nagy busz négyszer annyit. Hányan férnek el a két buszon együtt?', options: ['150', '120', '34', '160'], explanation: 'Nagy busz: 4 · 30 = 120. Együtt: 30 + 120 = 150.' }),
  q({ id: 'c500e-q81', level: 3, questionTypeBadge: 'Műveleti sorrend', question: '500 − 6 · 50 = ?', options: ['200', '300', '250', '100'], explanation: 'Előbb szorzunk: 6 · 50 = 300. Aztán 500 − 300 = 200.' }),
  q({ id: 'c500e-q82', level: 3, questionTypeBadge: 'Zárójel', question: '(450 − 410) · 10 = ?', options: ['400', '40', '410', '360'], explanation: 'Előbb a zárójel: 450 − 410 = 40. Aztán 40 · 10 = 400.' }),
  q({ id: 'c500e-q83', level: 3, questionTypeBadge: 'Összehasonlítás', question: 'Melyiknek a legnagyobb az eredménye?', options: ['480 − 4 · 10', '7 · 60', '150 + 10 · 20', '4 · 100 + 30'], explanation: '480 − 40 = 440, 7 · 60 = 420, 150 + 200 = 350, 400 + 30 = 430. A legnagyobb a 440.' }),
  q({ id: 'c500e-q84', level: 3, questionTypeBadge: 'Fasor', figure: <TreesFig total={280} gap={40} />, question: 'Egy 280 m-es út mellé 40 m-enként fát ültetnek, az elejére és a végére is. Hány fa kell?', options: ['8', '7', '9', '70'], explanation: '280 : 40 = 7 köz van. A fák eggyel többen vannak, mint a közök: 7 + 1 = 8 fa.' }),
  q({ id: 'c500e-q85', level: 3, questionTypeBadge: 'Hiányzó szám', question: '□ : 7 = 60. Mennyi a □?', options: ['420', '67', '360', '480'], explanation: 'Visszafelé szorzással: 7 · 60 = 420.' }),
  q({ id: 'c500e-q86', level: 3, questionTypeBadge: 'Igaz vagy hamis?', question: 'Melyik állítás igaz?', options: ['A 46 tízszerese 40-nel kisebb az 500-nál.', 'A 300-ban a 60 hatszor van meg.', 'A 7 · 60 nagyobb, mint 450.', 'A 480 : 8 = 6.'], explanation: '46 · 10 = 460, és 500 − 460 = 40. Ez igaz. 300 : 60 = 5, 7 · 60 = 420, 480 : 8 = 60.' }),
  q({ id: 'c500e-q87', level: 3, questionTypeBadge: 'Bűvös négyzet', figure: <MagicFig cells={[240, 30, 180, 90, 150, '?', 120, 270, 60]} />, question: 'Minden sorban, oszlopban és átlóban ugyanannyi az összeg. Mi kerül a ? helyére?', options: ['210', '200', '150', '240'], explanation: 'Az első sor: 240 + 30 + 180 = 450. A középső sor: 90 + 150 + □ = 450, így □ = 210.' }),
  q({ id: 'c500e-q88', level: 3, questionTypeBadge: 'Műveletlánc', figure: <ChainFig values={[300, 100, 250, 50, '?']} ops={[': 3', '+150', ': 5', '+150']} />, question: 'Mi kerül a ? helyére?', options: ['200', '150', '250', '300'], explanation: '300 : 3 = 100, +150 = 250, : 5 = 50, +150 = 200.' }),
  q({ id: 'c500e-q89', level: 3, questionTypeBadge: 'Vásárlás', figure: <TagsFig pay prices={['90 Ft']} names={['1 ceruza']} />, question: 'Van 500 Ft-od. Veszel 3 db 90 Ft-os ceruzát. Mennyi pénzed marad?', options: ['230 Ft', '270 Ft', '410 Ft', '330 Ft'], explanation: '3 ceruza: 3 · 90 = 270 Ft. Marad: 500 − 270 = 230 Ft.' }),
  q({ id: 'c500e-q90', level: 3, questionTypeBadge: 'Pénz', figure: <CoinsRow coins={[100, 100, 100, 100, 10, 10, 10, 10, 10, 10]} />, question: 'Bori perselyében ennyi pénz van. Mennyi hiányzik egy 470 Ft-os könyvhöz?', options: ['10 Ft', '0 Ft', '70 Ft', '60 Ft'], explanation: '4 · 100 + 6 · 10 = 460 Ft. 470 − 460 = 10 Ft hiányzik.' })
];

export const COUNT500_EXAM_G3_QUESTIONS: QuizQuestion[] = [...L1, ...L2, ...L3];

export const Count500ExamG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="szamolas-500-ig"
      topicId="g3-c500-tudasproba-quiz"
      subtopicId="megallo"
      title="5. Megálló – tudáspróba – Kvíz"
      subtitle="90 feladat 3 szinten: számok 500-ig, szomszédok, kerekítés, összeadás, kivonás, szorzás, osztás, pénz, sorozatok, szöveges feladatok."
      badge="3. OSZTÁLY • V. SZÁMOLÁS 0-TÓL 500-IG • KVÍZ"
      questions={COUNT500_EXAM_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Számok, kerekítés',
          items: ['406 = 4 százas, 0 tízes, 6 egyes', 'Tízesre: nézd az egyest! 384 ≈ 380', 'Százasra: nézd a tízest! 349 ≈ 300, 250 ≈ 300']
        },
        {
          title: 'Összeadás, kivonás',
          items: ['280 + 70 = 280 + 20 + 50 = 350', '450 − 170 = 450 − 100 − 70 = 280', 'Ellenőrizz: 280 + 170 = 450']
        },
        {
          title: 'Szorzás, osztás',
          items: ['8 · 50: 8 · 5 = 40 → 400', '420 : 6 = 70, 360 : 40 = 9', 'Előbb szorzás: 500 − 6 · 50 = 200']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Count500ExamG3Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Count500ExamG3Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Count500ExamG3Quiz;
