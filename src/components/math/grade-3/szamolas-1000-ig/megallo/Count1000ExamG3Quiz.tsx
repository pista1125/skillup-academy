import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Count1000ExamG3Matcher } from './Count1000ExamG3Matcher';
import { Count1000ExamG3Sorter } from './Count1000ExamG3Sorter';
import { Blocks1000Fig, Place4Fig, EgyptFig, Pay1000Fig, TwoBarsFig, PartsBarsFig, NumbersFrameFig } from './Count1000ExamG3Parts';
import { NLFig, RoundFig, CoinsRow, ChainFig, DigitCards, MagicFig } from '../../szamolas-500-ig/megallo/Count500ExamG3Parts';
import { Jumps, BarFig, CompareFig } from '../../szamolas-500-ig/osszeadas-es-kivonas/AddSub500G3QuizParts';
import {
  ShareFig,
  HopFig,
  CoinsFig,
  CoinGridFig,
  RodsFig,
  FlatRowFig,
  HundredAnalogyFig,
  ExchangeFig,
  MachineFig,
  RuleTableFig,
  CutFig,
  BoxesFig,
  TimesBarsFig
} from '../szorzas-es-osztas/MulDiv1000G3QuizParts';

type Q = Omit<QuizQuestion, 'correctAnswer'>;
const q = (x: Q): QuizQuestion => ({ ...x, correctAnswer: 0 } as QuizQuestion);

// ---------------------------------------------------------------------------
// 1. szint – egy lépés
// ---------------------------------------------------------------------------
const L1: QuizQuestion[] = [
  q({ id: 'c1000e-q1', level: 1, questionTypeBadge: 'Számkép', figure: <Blocks1000Fig sz={6} t={3} e={8} />, question: 'Melyik számot raktuk ki? (lap = 100, rúd = 10, kocka = 1)', options: ['638', '683', '368', '836'], explanation: '6 százas, 3 tízes, 8 egyes: 638.' }),
  q({ id: 'c1000e-q2', level: 1, questionTypeBadge: 'Számírás', question: 'Hogyan írjuk számjeggyel: hétszázöt?', options: ['705', '750', '75', '715'], explanation: '7 százas, 0 tízes, 5 egyes: 705. A tízesek helyére 0 kerül.' }),
  q({ id: 'c1000e-q3', level: 1, questionTypeBadge: 'Valódi érték', figure: <Place4Fig d={['', 8, 4, 2]} hl={1} />, question: 'Mennyi a 8-as valódi értéke a 842-ben?', options: ['800', '8', '80', '842'], explanation: 'A 8 a százasok helyén áll: 8 százas = 800.' }),
  q({ id: 'c1000e-q4', level: 1, questionTypeBadge: 'Ezer', question: 'Hány százas van az 1000-ben?', options: ['10', '100', '1', '1000'], explanation: '10 százas = 1000. Ezért 10 · 100 = 1000.' }),
  q({ id: 'c1000e-q5', level: 1, questionTypeBadge: 'Összehasonlítás', question: 'Melyik szám a legnagyobb?', options: ['980', '908', '899', '890'], explanation: 'Előbb a százasokat nézd: 9 százas a 980-ban és a 908-ban van. Tízesből a 980-ban van több.' }),
  q({ id: 'c1000e-q6', level: 1, questionTypeBadge: 'Számegyenes', figure: <NLFig lo={600} hi={700} step={10} labelStep={50} mark={670} />, question: 'Melyik számra mutat a nyíl?', options: ['670', '680', '660', '607'], explanation: 'Egy kis lépés 10. A 650 után 2 lépés: 670.' }),
  q({ id: 'c1000e-q7', level: 1, questionTypeBadge: 'Szomszédok', question: 'Mi a 437 nagyobb tízes szomszédja?', options: ['440', '430', '438', '500'], explanation: 'A 437 a 430 és a 440 között van. A nagyobb tízes szomszéd: 440.' }),
  q({ id: 'c1000e-q8', level: 1, questionTypeBadge: 'Kerekítés', figure: <RoundFig v={263} lo={260} hi={270} />, question: 'Kerekítsd tízesre: 263', options: ['260', '270', '300', '200'], explanation: 'Az egyesek helyén 3 áll. 0–4: lefelé kerekítünk. 263 ≈ 260.' }),
  q({ id: 'c1000e-q9', level: 1, questionTypeBadge: 'Kerekítés', figure: <RoundFig v={750} lo={700} hi={800} />, question: 'Kerekítsd százasra: 750', options: ['800', '700', '750', '900'], explanation: 'A tízesek helyén 5 áll. 5–9: felfelé kerekítünk. 750 ≈ 800.' }),
  q({ id: 'c1000e-q10', level: 1, questionTypeBadge: 'Szomszédok', question: 'Mi a 815 kisebb százas szomszédja?', options: ['800', '900', '810', '814'], explanation: 'A 815 a 800 és a 900 között van. A kisebb százas szomszéd: 800.' }),
  q({ id: 'c1000e-q11', level: 1, questionTypeBadge: 'Összeadás', figure: <Jumps lo={400} hi={1000} start={400} jumps={[{ to: 900, label: '+ 500' }]} />, question: '400 + 500 = ?', options: ['900', '450', '800', '1000'], explanation: '4 százas + 5 százas = 9 százas = 900.' }),
  q({ id: 'c1000e-q12', level: 1, questionTypeBadge: 'Kivonás', question: '1000 − 300 = ?', options: ['700', '600', '997', '800'], explanation: '10 százas − 3 százas = 7 százas = 700.' }),
  q({ id: 'c1000e-q13', level: 1, questionTypeBadge: 'Összeadás', figure: <Jumps lo={300} hi={400} start={360} jumps={[{ to: 400, label: '+ 40' }]} />, question: '360 + 40 = ?', options: ['400', '390', '760', '410'], explanation: '360 + 40 = 400. Pont a kerek százasig ugrottunk.' }),
  q({ id: 'c1000e-q14', level: 1, questionTypeBadge: 'Pótlás', figure: <BarFig known={650} total={1000} />, question: 'Mennyi hiányzik a 650-ből az 1000-ig?', options: ['350', '450', '250', '340'], explanation: '650 + 50 = 700, 700 + 300 = 1000. Hiányzik: 50 + 300 = 350.' }),
  q({ id: 'c1000e-q15', level: 1, questionTypeBadge: 'Kivonás', figure: <Jumps lo={500} hi={600} start={540} jumps={[{ to: 500, label: '− 40' }]} minus />, question: '540 − 40 = ?', options: ['500', '140', '580', '510'], explanation: '540 − 40 = 500. A 4 tízest vettük el.' }),
  q({ id: 'c1000e-q16', level: 1, questionTypeBadge: 'Szorzás 100-zal', figure: <FlatRowFig n={6} />, question: '6 · 100 = ?', options: ['600', '106', '60', '700'], explanation: '6 százas = 600.' }),
  q({ id: 'c1000e-q17', level: 1, questionTypeBadge: 'Szorzás', figure: <RodsFig groups={4} per={8} />, question: '4 · 80 = ?', options: ['320', '32', '84', '240'], explanation: '4 · 8 = 32, tehát 4 · 8 tízes = 32 tízes = 320.' }),
  q({ id: 'c1000e-q18', level: 1, questionTypeBadge: 'Részekre osztás', figure: <ShareFig total={600} k={3} />, question: '600 : 3 = ?', options: ['200', '20', '300', '597'], explanation: '6 százast 3 részre osztunk. Egy részbe 2 százas jut: 200.' }),
  q({ id: 'c1000e-q19', level: 1, questionTypeBadge: 'Osztás 10-zel', question: '480 : 10 = ?', options: ['48', '480', '4', '58'], explanation: '480 = 48 tízes. 480 : 10 = 48.' }),
  q({ id: 'c1000e-q20', level: 1, questionTypeBadge: 'Pénz', figure: <CoinsRow coins={[200, 200, 100, 50]} />, question: 'Mennyi pénz ez?', options: ['550 Ft', '450 Ft', '500 Ft', '650 Ft'], explanation: '200 + 200 = 400, + 100 = 500, + 50 = 550 Ft.' }),
  q({ id: 'c1000e-q21', level: 1, questionTypeBadge: 'Pénz', figure: <CoinsFig n={7} v={100} />, question: 'Mennyi pénz ez?', options: ['700 Ft', '107 Ft', '70 Ft', '600 Ft'], explanation: '7 db 100 forintos: 7 · 100 = 700 Ft.' }),
  q({ id: 'c1000e-q22', level: 1, questionTypeBadge: 'Számolvasás', question: 'Hogyan olvassuk ki: 409?', options: ['négyszázkilenc', 'négyszázkilencven', 'negyvenkilenc', 'kilencszáznégy'], explanation: '409 = 4 százas, 0 tízes, 9 egyes: négyszázkilenc.' }),
  q({ id: 'c1000e-q23', level: 1, questionTypeBadge: 'Páros, páratlan', question: 'Melyik szám páros?', options: ['734', '735', '737', '739'], explanation: 'A páros szám 0-ra, 2-re, 4-re, 6-ra vagy 8-ra végződik. A 734 a 4-re végződik.' }),
  q({ id: 'c1000e-q24', level: 1, questionTypeBadge: 'Sorozat', figure: <ChainFig values={[250, 300, 350, '?']} ops={['+ 50', '+ 50', '+ 50']} />, question: 'Melyik szám jön a sorozatban?', options: ['400', '360', '450', '355'], explanation: 'Mindig 50-et adunk hozzá: 350 + 50 = 400.' }),
  q({ id: 'c1000e-q25', level: 1, questionTypeBadge: 'Bontás', question: 'Melyik bontás jó? 506 = ?', options: ['500 + 6', '500 + 60', '50 + 6', '5 + 0 + 6'], explanation: '506 = 5 százas + 0 tízes + 6 egyes = 500 + 6.' }),
  q({ id: 'c1000e-q26', level: 1, questionTypeBadge: 'Tízszeres', question: 'Mennyi a 75 tízszerese?', options: ['750', '85', '705', '570'], explanation: '75 · 10 = 75 tízes = 750. A 75 végére egy 0 kerül.' }),
  q({ id: 'c1000e-q27', level: 1, questionTypeBadge: 'Ugrás', figure: <Jumps lo={700} hi={800} start={720} jumps={[{ to: 780, label: '+ 60' }]} />, question: 'Hová érkezel? 720 + 60 = ?', options: ['780', '760', '790', '726'], explanation: '72 tízes + 6 tízes = 78 tízes = 780.' }),
  q({ id: 'c1000e-q28', level: 1, questionTypeBadge: 'Bennfoglalás', figure: <HopFig total={800} size={100} />, question: '800 : 100 = ?', options: ['8', '80', '9', '700'], explanation: '100-asával 8 ugrás a 800-ig. 800 : 100 = 8.' }),
  q({ id: 'c1000e-q29', level: 1, questionTypeBadge: 'Számkép', figure: <Blocks1000Fig sz={9} t={0} e={4} />, question: 'Melyik számot raktuk ki? (lap = 100, kocka = 1)', options: ['904', '940', '94', '409'], explanation: '9 százas, 0 tízes, 4 egyes: 904. A tízesek helyére 0 kerül.' }),
  q({ id: 'c1000e-q30', level: 1, questionTypeBadge: 'Ezer', question: '999 + 1 = ?', options: ['1000', '998', '990', '900'], explanation: 'A 999 után az 1000 jön. Ez a legnagyobb szám, amivel most számolunk.' })
];

// ---------------------------------------------------------------------------
// 2. szint – nehezebb számok, kép
// ---------------------------------------------------------------------------
const L2: QuizQuestion[] = [
  q({ id: 'c1000e-q31', level: 2, questionTypeBadge: 'Beváltás', figure: <Blocks1000Fig sz={5} t={12} e={3} />, question: 'Melyik számot raktuk ki? Vigyázz, sok a rúd!', options: ['623', '523', '613', '632'], explanation: '12 tízes = 1 százas + 2 tízes. Tehát 5 + 1 = 6 százas, 2 tízes, 3 egyes: 623.' }),
  q({ id: 'c1000e-q32', level: 2, questionTypeBadge: 'Számkártyák', figure: <DigitCards digits={['7', '0', '4']} />, question: 'Mi a legkisebb háromjegyű szám, amit ezekből a kártyákból kirakhatsz?', options: ['407', '47', '470', '704'], explanation: 'A 0 nem lehet elöl, mert akkor nem háromjegyű. Elöl a 4, aztán 0, aztán 7: 407.' }),
  q({ id: 'c1000e-q33', level: 2, questionTypeBadge: 'Számkártyák', figure: <DigitCards digits={['5', '8', '3']} />, question: 'Mi a legnagyobb páros szám, amit ezekből a kártyákból kirakhatsz?', options: ['538', '853', '583', '358'], explanation: 'Páros csak úgy lesz, ha a 8 a végén van. Elöl a nagyobb: 538.' }),
  q({ id: 'c1000e-q34', level: 2, questionTypeBadge: 'Számegyenes', figure: <NLFig lo={0} hi={1000} step={50} labelStep={500} mark={750} />, question: 'Melyik számra mutat a nyíl?', options: ['750', '700', '800', '650'], explanation: 'A nyíl az 500 és az 1000 között pont középen van. Egy kis lépés 50: 750.' }),
  q({ id: 'c1000e-q35', level: 2, questionTypeBadge: 'Kerekítés', figure: <RoundFig v={649} lo={600} hi={700} />, question: 'Kerekítsd százasra: 649', options: ['600', '700', '650', '640'], explanation: 'A tízesek helyén 4 áll, ezért lefelé: 649 ≈ 600. Ne kerekíts kétszer!' }),
  q({ id: 'c1000e-q36', level: 2, questionTypeBadge: 'Kerekítés', question: 'Melyik szám tízesre kerekített értéke 680?', options: ['684', '686', '674', '692'], explanation: '684: az egyesek helyén 4, lefelé kerekítünk: 680. A 686 ≈ 690, a 674 ≈ 670, a 692 ≈ 690.' }),
  q({ id: 'c1000e-q37', level: 2, questionTypeBadge: 'Szomszédok', question: 'Mi a 999 nagyobb egyes szomszédja?', options: ['1000', '998', '990', '899'], explanation: '999 + 1 = 1000.' }),
  q({ id: 'c1000e-q38', level: 2, questionTypeBadge: 'Összeadás', figure: <Jumps lo={300} hi={700} start={380} jumps={[{ to: 580, label: '+ 200' }, { to: 630, label: '+ 50' }]} />, question: '380 + 250 = ?', options: ['630', '530', '620', '640'], explanation: 'Bontsd fel: 380 + 200 = 580, 580 + 50 = 630.' }),
  q({ id: 'c1000e-q39', level: 2, questionTypeBadge: 'Kivonás', figure: <Jumps lo={300} hi={800} start={720} jumps={[{ to: 420, label: '− 300' }, { to: 360, label: '− 60' }]} minus />, question: '720 − 360 = ?', options: ['360', '460', '440', '340'], explanation: 'Bontsd fel: 720 − 300 = 420, 420 − 60 = 360.' }),
  q({ id: 'c1000e-q40', level: 2, questionTypeBadge: 'Pótlás', figure: <BarFig known={470} total={1000} />, question: 'Mennyi hiányzik a 470-ből az 1000-ig?', options: ['530', '630', '470', '570'], explanation: '470 + 30 = 500, 500 + 500 = 1000. Hiányzik: 30 + 500 = 530.' }),
  q({ id: 'c1000e-q41', level: 2, questionTypeBadge: 'Hiányzó szám', question: '□ + 440 = 970. Melyik szám a □?', options: ['530', '630', '520', '430'], explanation: '970 − 440 = 530. Ellenőrzés: 530 + 440 = 970.' }),
  q({ id: 'c1000e-q42', level: 2, questionTypeBadge: 'Különbség', figure: <CompareFig a={{ name: 'piros', v: 820 }} b={{ name: 'kék', v: 560 }} diff="?" />, question: 'Mennyivel nagyobb a 820, mint az 560?', options: ['260', '360', '340', '240'], explanation: '820 − 560 = ? 820 − 500 = 320, 320 − 60 = 260.' }),
  q({ id: 'c1000e-q43', level: 2, questionTypeBadge: 'Szorzótábla', figure: <HundredAnalogyFig a={2} b={4} />, question: 'Tudod, hogy 2 · 4 = 8. Mennyi 2 · 400?', options: ['800', '80', '600', '1000'], explanation: '2 · 4 százas = 8 százas = 800.' }),
  q({ id: 'c1000e-q44', level: 2, questionTypeBadge: 'Szorzás', figure: <RodsFig groups={9} per={8} />, question: '9 · 80 = ?', options: ['720', '72', '640', '810'], explanation: '9 · 8 = 72, tehát 9 · 8 tízes = 72 tízes = 720.' }),
  q({ id: 'c1000e-q45', level: 2, questionTypeBadge: 'Részekre osztás', figure: <ShareFig total={630} k={7} />, question: '630 : 7 = ?', options: ['90', '9', '80', '623'], explanation: '63 : 7 = 9, tehát 63 tízes : 7 = 9 tízes = 90.' }),
  q({ id: 'c1000e-q46', level: 2, questionTypeBadge: 'Bennfoglalás', figure: <HopFig total={810} size={90} />, question: '810 : 90 = ?', options: ['9', '90', '8', '720'], explanation: '81 tízesben a 9 tízes 9-szer van meg. Ellenőrzés: 9 · 90 = 810.' }),
  q({ id: 'c1000e-q47', level: 2, questionTypeBadge: 'Beváltás', figure: <ExchangeFig total={1000} coin={200} />, question: 'Hány 200 forintos kell 1000 Ft-hoz?', options: ['5', '50', '4', '800'], explanation: '200, 400, 600, 800, 1000: ez 5 érme. 1000 : 200 = 5.' }),
  q({ id: 'c1000e-q48', level: 2, questionTypeBadge: 'Pénz', figure: <CoinGridFig rows={2} cols={4} v={100} />, question: 'Mennyi pénz ez?', options: ['800 Ft', '80 Ft', '400 Ft', '600 Ft'], explanation: 'Egy sorban 4 · 100 = 400 Ft. 2 sor: 2 · 400 = 800 Ft.' }),
  q({ id: 'c1000e-q49', level: 2, questionTypeBadge: 'Számírás betűvel', question: 'Hogyan írjuk betűvel: 560?', options: ['ötszázhatvan', 'ötszázhat', 'ötvenhat', 'hatszázötven'], explanation: '560 = 5 százas, 6 tízes, 0 egyes: ötszázhatvan.' }),
  q({ id: 'c1000e-q50', level: 2, questionTypeBadge: 'Sorozat', figure: <ChainFig values={[970, 950, 930, '?']} ops={['− 20', '− 20', '− 20']} />, question: 'Melyik szám jön a sorozatban?', options: ['910', '900', '920', '890'], explanation: 'Mindig 20-at veszünk el: 930 − 20 = 910.' }),
  q({ id: 'c1000e-q51', level: 2, questionTypeBadge: 'Nyitott mondat', question: '840 > □ > 820. Melyik szám lehet a □?', options: ['830', '820', '840', '850'], explanation: 'A □ kisebb, mint 840, és nagyobb, mint 820. A 830 jó.' }),
  q({ id: 'c1000e-q52', level: 2, questionTypeBadge: 'Valódi érték', figure: <Place4Fig d={['', 3, 7, 7]} />, question: 'A 377-ben két 7-es van. Mennyi a valódi értékük együtt?', options: ['77', '14', '707', '770'], explanation: 'Az egyik 7 tízes = 70, a másik 7 egyes = 7. Együtt 70 + 7 = 77.' }),
  q({ id: 'c1000e-q53', level: 2, questionTypeBadge: 'Kerekítés', question: 'Egy dobozban 386 gyöngy van. Kb. hány gyöngy ez, százasra kerekítve?', options: ['400', '300', '390', '380'], explanation: 'A tízesek helyén 8 áll, ezért felfelé: 386 ≈ 400.' }),
  q({ id: 'c1000e-q54', level: 2, questionTypeBadge: 'Számgép', figure: <MachineFig op=": 4" inp={800} out="?" />, question: 'A 800-at beteszed a gépbe. Mi jön ki?', options: ['200', '796', '400', '20'], explanation: '800 : 4 = 8 százas : 4 = 2 százas = 200.' }),
  q({ id: 'c1000e-q55', level: 2, questionTypeBadge: 'Összehasonlítás', question: 'Melyiknek a legnagyobb az eredménye?', options: ['5 · 200', '9 · 100', '8 · 90', '600 + 300'], explanation: '5 · 200 = 1000, 9 · 100 = 900, 8 · 90 = 720, 600 + 300 = 900. A legnagyobb az 1000.' }),
  q({ id: 'c1000e-q56', level: 2, questionTypeBadge: 'Vásárlás', figure: <Pay1000Fig prices={[750]} />, question: '1000 Ft-tal fizetsz egy 750 Ft-os játékért. Mennyit kapsz vissza?', options: ['250 Ft', '350 Ft', '150 Ft', '260 Ft'], explanation: '750 + 50 = 800, 800 + 200 = 1000. Visszajár: 50 + 200 = 250 Ft.' }),
  q({ id: 'c1000e-q57', level: 2, questionTypeBadge: 'Szomszédok', question: 'Melyek az 595 tízes szomszédjai?', options: ['590 és 600', '500 és 600', '594 és 596', '590 és 610'], explanation: 'Az 595 az 590 és a 600 között van. Ezek a tízes szomszédai.' }),
  q({ id: 'c1000e-q58', level: 2, questionTypeBadge: 'Hiányzó szám', question: '7 · □ = 560. Melyik szám a □?', options: ['80', '8', '70', '90'], explanation: '7 · 8 = 56, tehát 7 · 80 = 560. A □ = 80.' }),
  q({ id: 'c1000e-q59', level: 2, questionTypeBadge: 'Régi számírás', figure: <EgyptFig h={3} t={4} e={2} />, question: 'Az ókori egyiptomiak így írták a számokat. Melyik számot írták le?', options: ['342', '243', '324', '9'], explanation: '3 tekercs = 300, 4 kampó = 40, 2 vonal = 2. Összesen 342.' }),
  q({ id: 'c1000e-q60', level: 2, questionTypeBadge: 'Összeadás', question: '250 + 250 + 250 + 250 = ?', options: ['1000', '900', '750', '500'], explanation: '250 + 250 = 500, és még 500: 1000. Vagy: 4 · 250 = 1000.' })
];

// ---------------------------------------------------------------------------
// 3. szint – legfeljebb két lépés
// ---------------------------------------------------------------------------
const L3: QuizQuestion[] = [
  q({ id: 'c1000e-q61', level: 3, questionTypeBadge: 'Visszafelé', figure: <ChainFig values={['?', '', 1000]} ops={['· 3', '+ 100']} />, question: 'Ha háromszor annyi matricám lenne, és kapnék még 100-at, 1000 matricám lenne. Hány matricám van most?', options: ['300', '900', '350', '200'], explanation: 'Visszafelé: 1000 − 100 = 900, aztán 900 : 3 = 300. Ellenőrzés: 3 · 300 + 100 = 1000.' }),
  q({ id: 'c1000e-q62', level: 3, questionTypeBadge: 'Gondoltam egy számot', question: 'A 365 és a 450 összegének nagyobb tízes szomszédjára gondoltam. Melyik ez?', options: ['820', '810', '815', '900'], explanation: '365 + 450 = 815. A 815 nagyobb tízes szomszédja: 820.' }),
  q({ id: 'c1000e-q63', level: 3, questionTypeBadge: 'Szöveges feladat', figure: <TwoBarsFig a={{ name: '1. előadás', v: 460 }} b={{ name: '2. előadás', v: 380 }} />, question: 'A bábszínházban az első előadáson 460, a másodikon 380 néző volt. Hányan voltak összesen?', options: ['840', '80', '740', '830'], explanation: '460 + 380 = 460 + 300 + 80 = 760 + 80 = 840 néző.' }),
  q({ id: 'c1000e-q64', level: 3, questionTypeBadge: 'Vásárlás', figure: <Pay1000Fig prices={[450, 230]} />, question: 'Van 1000 Ft-od. Veszel egy 450 Ft-os könyvet és egy 230 Ft-os tollat. Mennyi pénzed marad?', options: ['320 Ft', '680 Ft', '420 Ft', '220 Ft'], explanation: 'Fizetsz: 450 + 230 = 680 Ft. Marad: 1000 − 680 = 320 Ft.' }),
  q({ id: 'c1000e-q65', level: 3, questionTypeBadge: 'Műveleti sorrend', question: '200 + 3 · 90 = ?', options: ['470', '870', '290', '570'], explanation: 'Előbb szorzunk: 3 · 90 = 270. Aztán összeadunk: 200 + 270 = 470.' }),
  q({ id: 'c1000e-q66', level: 3, questionTypeBadge: 'Zárójel', question: '(940 − 580) : 6 = ?', options: ['60', '360', '6', '70'], explanation: 'A zárójelben lévőt számoljuk először: 940 − 580 = 360. Aztán 360 : 6 = 60.' }),
  q({ id: 'c1000e-q67', level: 3, questionTypeBadge: 'Szöveges feladat', figure: <BoxesFig n={4} label="90" caption="és még 70 paprika" />, question: 'A kertben 4 sor paradicsom van, minden sorban 90 tő. Van még 70 tő paprika. Hány növény van összesen?', options: ['430', '360', '164', '530'], explanation: 'Paradicsom: 4 · 90 = 360. Összesen: 360 + 70 = 430 növény.' }),
  q({ id: 'c1000e-q68', level: 3, questionTypeBadge: 'Szöveges feladat', figure: <ShareFig total={800} k={4} />, question: '800 Ft-on 4 testvér egyformán osztozik. Az egyik vesz belőle egy 150 Ft-os csokit. Mennyi pénze marad?', options: ['50 Ft', '650 Ft', '200 Ft', '150 Ft'], explanation: 'Egy testvér kap: 800 : 4 = 200 Ft. Marad: 200 − 150 = 50 Ft.' }),
  q({ id: 'c1000e-q69', level: 3, questionTypeBadge: 'Kerekítés', question: 'Melyik szám az, amelyik tízesre kerekítve 450, százasra kerekítve 500?', options: ['452', '448', '455', '445'], explanation: '452 ≈ 450 (egyes: 2) és 452 ≈ 500 (tízes: 5). A 448 és a 445 százasra 400 lenne, a 455 tízesre 460.' }),
  q({ id: 'c1000e-q70', level: 3, questionTypeBadge: 'Becslés', question: 'Kerekítsd százasra a két számot, és add össze! 289 + 412 ≈ ?', options: ['700', '701', '600', '800'], explanation: '289 ≈ 300, 412 ≈ 400. 300 + 400 = 700.' }),
  q({ id: 'c1000e-q71', level: 3, questionTypeBadge: 'Szabály', figure: <RuleTableFig top={[80, 400, '?']} bottom={[1, 5, 8]} />, question: 'Felül mindig a lenti szám 80-szorosa áll. Mi kerül a ? helyére?', options: ['640', '88', '560', '720'], explanation: '1 · 80 = 80, 5 · 80 = 400, tehát 8 · 80 = 640.' }),
  q({ id: 'c1000e-q72', level: 3, questionTypeBadge: 'Sorozat', figure: <ChainFig values={[100, 300, 260, 460, '?']} ops={['+ 200', '− 40', '+ 200', '− 40']} />, question: 'Folytasd a sorozatot! Mi jön a ? helyére?', options: ['420', '500', '660', '380'], explanation: 'A szabály: + 200, aztán − 40, és így tovább. 460 − 40 = 420.' }),
  q({ id: 'c1000e-q73', level: 3, questionTypeBadge: 'Szöveges feladat', figure: <BoxesFig n={6} label="50" caption="leszáll 80 utas" />, question: '6 busz megy, mindegyikben 50 utas. Az első megállóban 80-an leszállnak. Hányan maradnak a buszokon?', options: ['220', '300', '380', '230'], explanation: 'Utasok: 6 · 50 = 300. Maradnak: 300 − 80 = 220.' }),
  q({ id: 'c1000e-q74', level: 3, questionTypeBadge: 'Négyszer annyi', figure: <TimesBarsFig a="Kati" v={70} b="Bence" k={4} />, question: 'Kati 70 kockát használt. Bence négyszer annyit. Hány kockát használtak együtt?', options: ['350', '280', '74', '300'], explanation: 'Bence: 4 · 70 = 280. Együtt: 70 + 280 = 350 kocka.' }),
  q({ id: 'c1000e-q75', level: 3, questionTypeBadge: 'Rúdmodell', figure: <PartsBarsFig names={['1. szalag', '2. szalag', '3. szalag']} parts={[1, 2, 3]} total={90} />, question: 'Három szalag együtt 90 cm. A második kétszer, a harmadik háromszor olyan hosszú, mint az első. Milyen hosszú az első?', options: ['15 cm', '30 cm', '45 cm', '18 cm'], explanation: 'Összesen 1 + 2 + 3 = 6 egyforma rész. 90 : 6 = 15. Az első szalag 15 cm.' }),
  q({ id: 'c1000e-q76', level: 3, questionTypeBadge: 'Beváltás', figure: <CoinsFig n={3} v={200} />, question: 'Ezt a pénzt 100 forintosokra váltod. Hány 100 forintost kapsz?', options: ['6', '3', '60', '5'], explanation: 'Összesen 3 · 200 = 600 Ft. 600 : 100 = 6 db 100 forintos.' }),
  q({ id: 'c1000e-q77', level: 3, questionTypeBadge: 'Hiányzó szám', question: '1000 − □ = 380. Melyik szám a □?', options: ['620', '720', '520', '680'], explanation: '380 + □ = 1000. 380 + 20 = 400, 400 + 600 = 1000. □ = 620.' }),
  q({ id: 'c1000e-q78', level: 3, questionTypeBadge: 'Nyitott mondat', question: '□ · 100 < 450. Melyik a legnagyobb szám, ami a □ helyére írható?', options: ['4', '5', '45', '3'], explanation: '4 · 100 = 400, ez kisebb 450-nél. 5 · 100 = 500 már nagyobb. A legnagyobb: 4.' }),
  q({ id: 'c1000e-q79', level: 3, questionTypeBadge: 'Logika', figure: <NumbersFrameFig nums={[415, 638, 790, 506, 924]} />, question: 'Melyik állítás igaz a keretben lévő számokra?', options: ['Van olyan szám, amelyben a számjegyek összege 17.', 'Minden szám páros.', 'Nincs olyan szám, amely 900-nál nagyobb.', 'Minden szám kisebb, mint 800.'], explanation: '6 + 3 + 8 = 17, tehát van ilyen. A 415 páratlan, a 924 nagyobb 900-nál, a 924 nem kisebb 800-nál.' }),
  q({ id: 'c1000e-q80', level: 3, questionTypeBadge: 'Régi számírás', figure: <EgyptFig h={1} t={1} e={1} />, question: 'Egyiptomi jelekkel melyik számhoz kell a legtöbb jel?', options: ['199', '901', '550', '820'], explanation: '199: 1 + 9 + 9 = 19 jel. 901: 9 + 1 = 10 jel. 550: 5 + 5 = 10 jel. 820: 8 + 2 = 10 jel.' }),
  q({ id: 'c1000e-q81', level: 3, questionTypeBadge: 'Kerekítés', figure: <NLFig lo={690} hi={710} step={1} labelStep={5} mark={700} markLabel="700" />, question: 'Hány olyan szám van, amelynek tízesre kerekített értéke 700?', options: ['10', '9', '5', '11'], explanation: '695, 696, 697, 698, 699, 700, 701, 702, 703, 704: ez 10 szám.' }),
  q({ id: 'c1000e-q82', level: 3, questionTypeBadge: 'Szöveges feladat', figure: <ShareFig total={720} k={8} />, question: 'A pékségben 720 kiflit 8 egyforma kosárba tesznek. Hány kifli van 3 kosárban?', options: ['270', '90', '240', '360'], explanation: 'Egy kosárba: 720 : 8 = 90 kifli. 3 kosárban: 3 · 90 = 270 kifli.' }),
  q({ id: 'c1000e-q83', level: 3, questionTypeBadge: 'Szöveges feladat', figure: <CutFig n={4} piece={200} rest={120} />, question: 'Egy kötélről 4 darab 200 cm-es darabot vágtunk le. Maradt 120 cm. Milyen hosszú volt a kötél?', options: ['920 cm', '800 cm', '324 cm', '680 cm'], explanation: 'Levágtunk: 4 · 200 = 800 cm. Az egész: 800 + 120 = 920 cm.' }),
  q({ id: 'c1000e-q84', level: 3, questionTypeBadge: 'Pénz', figure: <CoinsRow coins={[200, 200, 200, 100, 50, 50]} />, question: 'Ennyi pénzed van. Kapsz még 150 Ft-ot. Mennyi pénzed lesz?', options: ['950 Ft', '800 Ft', '850 Ft', '900 Ft'], explanation: 'Most: 600 + 100 + 100 = 800 Ft. Kapsz még 150-et: 800 + 150 = 950 Ft.' }),
  q({ id: 'c1000e-q85', level: 3, questionTypeBadge: 'Hétszer annyi', question: 'Egy tálban 90 dió van. A zsákban hétszer annyi. Mennyivel több dió van a zsákban, mint a tálban?', options: ['540', '630', '720', '97'], explanation: 'A zsákban: 7 · 90 = 630. Különbség: 630 − 90 = 540.' }),
  q({ id: 'c1000e-q86', level: 3, questionTypeBadge: 'Bűvös négyzet', figure: <MagicFig cells={[320, 40, 240, 120, '?', 280, 160, 360, 80]} />, question: 'Bűvös négyzet: minden sorban és oszlopban ugyanannyi az összeg. Mi kerül a ? helyére?', options: ['200', '240', '160', '600'], explanation: 'Az első sor: 320 + 40 + 240 = 600. A középső sor: 120 + ? + 280 = 600, ezért ? = 200.' }),
  q({ id: 'c1000e-q87', level: 3, questionTypeBadge: 'Műveletek', question: 'Melyik művelet eredménye 480?', options: ['6 · 80', '8 · 50', '4 · 200', '960 − 400'], explanation: '6 · 80 = 480. A többi: 8 · 50 = 400, 4 · 200 = 800, 960 − 400 = 560.' }),
  q({ id: 'c1000e-q88', level: 3, questionTypeBadge: 'Visszafelé', figure: <ChainFig values={['?', '', 900]} ops={['− 250', '· 2']} />, question: 'Gondoltam egy számot. Elvettem belőle 250-et, aztán megszoroztam 2-vel. 900 lett. Mire gondoltam?', options: ['700', '450', '200', '600'], explanation: 'Visszafelé: 900 : 2 = 450, aztán 450 + 250 = 700. Ellenőrzés: (700 − 250) · 2 = 900.' }),
  q({ id: 'c1000e-q89', level: 3, questionTypeBadge: 'Pótlás', figure: <CoinsFig n={6} v={100} />, question: 'Egy album 1000 Ft. Ennyi pénzed van. Mennyi hiányzik még?', options: ['400 Ft', '600 Ft', '994 Ft', '500 Ft'], explanation: 'Van 6 · 100 = 600 Ft. Hiányzik: 1000 − 600 = 400 Ft.' }),
  q({ id: 'c1000e-q90', level: 3, questionTypeBadge: 'Kétféle osztás', question: 'Mennyivel nagyobb a 640 : 8, mint a 640 : 80?', options: ['72', '8', '80', '560'], explanation: '640 : 8 = 80 és 640 : 80 = 8. A különbség: 80 − 8 = 72.' })
];

export const COUNT1000_EXAM_G3_QUESTIONS: QuizQuestion[] = [...L1, ...L2, ...L3];

export const Count1000ExamG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="szamolas-1000-ig"
      topicId="g3-c1000-tudasproba-quiz"
      subtopicId="megallo"
      title="5. Megálló – tudáspróba – Kvíz"
      subtitle="90 feladat 3 szinten: számok 1000-ig, szomszédok, kerekítés, összeadás, kivonás, szorzás, osztás, pénz, szöveges feladatok."
      badge="3. OSZTÁLY • XI. SZÁMOLÁS 0-TÓL 1000-IG • KVÍZ"
      questions={COUNT1000_EXAM_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Számok, kerekítés',
          items: ['705 = 7 százas, 0 tízes, 5 egyes', 'Tízesre: nézd az egyest! 263 ≈ 260', 'Százasra: nézd a tízest! 649 ≈ 600, 750 ≈ 800']
        },
        {
          title: 'Összeadás, kivonás',
          items: ['380 + 250 = 380 + 200 + 50 = 630', '720 − 360 = 720 − 300 − 60 = 360', 'Pótlás 1000-ig: 470 + 30 + 500']
        },
        {
          title: 'Szorzás, osztás',
          items: ['9 · 80: 9 · 8 = 72 → 720', '630 : 7 = 90, 810 : 90 = 9', 'Előbb szorzás: 200 + 3 · 90 = 470']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Count1000ExamG3Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Count1000ExamG3Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Count1000ExamG3Quiz;
