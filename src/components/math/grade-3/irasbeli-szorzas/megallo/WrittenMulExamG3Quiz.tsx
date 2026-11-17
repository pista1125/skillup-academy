import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { WrittenMulExamG3Matcher } from './WrittenMulExamG3Matcher';
import { WrittenMulExamG3Sorter } from './WrittenMulExamG3Sorter';
import {
  q,
  qMul,
  qMental,
  qEst,
  qExpr,
  MulColumn,
  LineFig,
  RelFig,
  PriceFig,
  ExprFig,
  PackFig,
  BarFig,
  RepeatFig,
  ShopFig,
  ChainFig
} from './WrittenMulExamG3Parts';

// ---------------------------------------------------------------------------
// XIII. Írásbeli szorzás – 6. Megálló: 90 kérdés (30 / szint), az egész fejezetből:
// fejben szorzás, becslés, írásbeli szorzás, elnevezések, összefüggések,
// következtetés, műveleti sorrend, szöveges feladatok.
// ---------------------------------------------------------------------------

export const WRITTEN_MUL_EXAM_G3_QUESTIONS: QuizQuestion[] = [
  // =========================== 1. szint ===========================
  qMental('wme-q1', 1, 120, 3),
  qMental('wme-q2', 1, 230, 2),
  qMental('wme-q3', 1, 140, 5, { fig: false }),
  qMental('wme-q4', 1, 210, 4),
  qEst('wme-q5', 1, 335, 2, 10),
  qEst('wme-q6', 1, 189, 3, 100),
  qEst('wme-q7', 1, 412, 2, 10, { fig: false }),
  q({
    id: 'wme-q8',
    level: 1,
    questionTypeBadge: 'Becslés',
    figure: <LineFig n={214} to={10} />,
    question: 'Melyik becslés illik a 214 · 3 szorzathoz, ha tízesre kerekítesz?',
    options: ['210 · 3', '200 · 3', '220 · 3', '214 · 4'],
    explanation: '214 tízesre kerekítve 210, mert a 210-hez van közelebb. A becslés: 210 · 3 = 630.'
  }),
  qMul('wme-q9', 1, 232, 3),
  qMul('wme-q10', 1, 123, 2),
  qMul('wme-q11', 1, 214, 3),
  qMul('wme-q12', 1, 312, 3),
  qMul('wme-q13', 1, 201, 4),
  qMul('wme-q14', 1, 122, 4, { fig: false }),
  q({
    id: 'wme-q15',
    level: 1,
    questionTypeBadge: 'Elnevezések',
    figure: <MulColumn a="232" d="3" p="696" mark="szorzo" />,
    question: 'Mi a neve a bekeretezett számnak?',
    options: ['szorzó', 'szorzandó', 'szorzat', 'összeg'],
    explanation: 'A 232 · 3 = 696 szorzásban a 232 a szorzandó, a 3 a szorzó, a 696 a szorzat.'
  }),
  q({
    id: 'wme-q16',
    level: 1,
    questionTypeBadge: 'Elnevezések',
    question: 'Mennyi a szorzat? 143 · 2 = 286',
    options: ['286', '143', '2', '145'],
    explanation: 'A szorzat a szorzás eredménye: 286.'
  }),
  q({
    id: 'wme-q17',
    level: 1,
    questionTypeBadge: 'Ellenőrzés',
    question: 'Hogyan ellenőrizheted a 231 · 3 = 693 szorzást?',
    options: ['231 + 231 + 231', '231 + 3', '3 + 3 + 3', '231 − 3'],
    explanation: 'A 3-szor 231 ugyanaz, mint 231 + 231 + 231. Ez is 693.'
  }),
  q({
    id: 'wme-q18',
    level: 1,
    questionTypeBadge: 'Összefüggés',
    figure: <RelFig top="4 · 30 = 120" bottom="8 · 30 =" op="· 2" />,
    question: 'Ha 4 · 30 = 120, mennyi 8 · 30?',
    options: ['240', '124', '160', '120'],
    explanation: 'A 8 a 4-nek a 2-szerese, így a szorzat is 2-szeres: 120 · 2 = 240.'
  }),
  q({
    id: 'wme-q19',
    level: 1,
    questionTypeBadge: 'Összefüggés',
    figure: <RelFig top="6 · 7 = 42" bottom="6 · 70 =" op="· 10" />,
    question: 'Ha 6 · 7 = 42, mennyi 6 · 70?',
    options: ['420', '42', '49', '427'],
    explanation: 'A 70 a 7-nek a 10-szerese, így a szorzat is 10-szeres: 420.'
  }),
  q({
    id: 'wme-q20',
    level: 1,
    questionTypeBadge: 'Összefüggés',
    question: 'Melyik szorzat ugyanannyi, mint 120 · 4?',
    options: ['240 · 2', '120 · 2', '240 · 4', '60 · 2'],
    explanation: 'A 120-at 2-szeresére vesszük (240), a 4-et 2-vel osztjuk (2). A szorzat nem változik: 480.'
  }),
  q({
    id: 'wme-q21',
    level: 1,
    questionTypeBadge: 'Következtetés',
    figure: <PriceFig n1={2} p1={150} n2={4} />,
    question: '2 db radír 150 Ft. Mennyibe kerül 4 db?',
    options: ['300 Ft', '600 Ft', '154 Ft', '450 Ft'],
    explanation: '4 db = 2 db · 2. Kétszer annyi radír, kétszer annyi pénz: 150 · 2 = 300 Ft.'
  }),
  qExpr('wme-q22', 1, '200 + 3 · 100', [900, 600, 400]),
  qExpr('wme-q23', 1, '(100 + 60) · 2', [220, 260, 162], { fig: <PackFig n={2} a={100} b={60} /> }),
  q({
    id: 'wme-q24',
    level: 1,
    questionTypeBadge: 'Sorrend',
    figure: <ExprFig expr="600 − 120 · 3" />,
    question: 'Melyik műveletet végzed el először?',
    options: ['120 · 3', '600 − 120', 'Mindegy, melyiket', '3 − 600'],
    explanation: 'A szorzás előbb jön: 120 · 3 = 360. Utána 600 − 360 = 240.'
  }),
  qMul('wme-q25', 1, 213, 3, { story: 'Egy szekrénybe 213 könyv fér. Hány könyv fér 3 ugyanilyen szekrénybe?', unit: 'könyv', badge: 'Szöveges feladat', fig: <RepeatFig n={3} v={213} unit="könyv" /> }),
  qMental('wme-q26', 1, 240, 2, { story: 'Egy mozijegy 240 Ft. Mennyibe kerül 2 jegy?', unit: 'Ft', badge: 'Szöveges feladat' }),
  qMul('wme-q27', 1, 143, 2, { story: 'Délelőtt 143-an, délután 2-szer annyian mentek a múzeumba. Hányan mentek délután?', badge: 'Szöveges feladat', fig: <BarFig base={143} times={2} l1="délelőtt" l2="délután" ask="second" /> }),
  q({
    id: 'wme-q28',
    level: 1,
    questionTypeBadge: 'Hiányzó szorzó',
    figure: <MulColumn a="143" d="□" p="286" />,
    question: 'Melyik szám a hiányzó szorzó?',
    options: ['2', '3', '4', '143'],
    explanation: '143 · 2 = 286. Nézd az egyeseket: 3 · 2 = 6. Jó!'
  }),
  q({
    id: 'wme-q29',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik szorzat a nagyobb: 125 · 3 vagy 190 · 2?',
    options: ['190 · 2', '125 · 3', 'Egyenlők', 'Nem lehet eldönteni'],
    explanation: '125 · 3 = 375 és 190 · 2 = 380. A 380 a nagyobb.'
  }),
  q({
    id: 'wme-q30',
    level: 1,
    questionTypeBadge: 'Szorzás fejben',
    question: 'Mennyi 400 · 2?',
    options: ['800', '600', '80', '402'],
    explanation: '4 százas · 2 = 8 százas, vagyis 800.'
  }),

  // =========================== 2. szint ===========================
  qMental('wme-q31', 2, 280, 2),
  qMental('wme-q32', 2, 160, 3),
  qMental('wme-q33', 2, 170, 4, { fig: false }),
  qEst('wme-q34', 2, 216, 4, 10),
  qEst('wme-q35', 2, 295, 3, 10),
  qEst('wme-q36', 2, 165, 5, 100),
  q({
    id: 'wme-q37',
    level: 2,
    questionTypeBadge: 'Becslés',
    figure: <LineFig n={214} to={10} />,
    question: 'A becslés: 214 · 3 ≈ 210 · 3 = 630. Milyen lesz a pontos szorzat?',
    options: ['Nagyobb 630-nál', 'Kisebb 630-nál', 'Pontosan 630', 'Nagyobb 700-nál'],
    explanation: 'Lefelé kerekítettünk (214 → 210), ezért a pontos szorzat nagyobb: 214 · 3 = 642.'
  }),
  qMul('wme-q38', 2, 157, 2),
  qMul('wme-q39', 2, 243, 3),
  qMul('wme-q40', 2, 216, 4),
  qMul('wme-q41', 2, 129, 3),
  qMul('wme-q42', 2, 118, 5),
  qMul('wme-q43', 2, 337, 2),
  qMul('wme-q44', 2, 108, 6, { fig: false }),
  qMul('wme-q45', 2, 136, 7, { fig: false }),
  q({
    id: 'wme-q46',
    level: 2,
    questionTypeBadge: 'Hibakeresés',
    figure: <MulColumn a="214" d="3" p="632" />,
    question: 'Bence így szorzott. Mit rontott el?',
    options: ['Elfelejtette a maradékot.', 'Rossz helyre írta a 2-t.', 'Összeadott szorzás helyett.', 'Semmit, jó lett.'],
    explanation: '3 · 4 = 12, leírjuk a 2-t, marad 1. A tízeseknél: 3 · 1 = 3, + 1 = 4. A jó eredmény 642, nem 632.'
  }),
  q({
    id: 'wme-q47',
    level: 2,
    questionTypeBadge: 'Hiányzó szorzó',
    figure: <MulColumn a="304" d="□" p="912" />,
    question: 'Melyik szám a hiányzó szorzó?',
    options: ['3', '2', '4', '9'],
    explanation: '304 · 3 = 912. Nézd az egyeseket: 4 · 3 = 12, leírjuk a 2-t. Jó!'
  }),
  q({
    id: 'wme-q48',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    question: 'Melyik számot szoroztuk meg 2-vel, ha a szorzat 868?',
    options: ['434', '436', '866', '424'],
    explanation: '868 : 2 = 434. Ellenőrzés: 434 · 2 = 868.'
  }),
  q({
    id: 'wme-q49',
    level: 2,
    questionTypeBadge: 'Elnevezések',
    figure: <MulColumn a="236" d="4" mark="szorzat" />,
    question: 'A szorzandó 236, a szorzó 4. Mennyi a szorzat?',
    options: ['944', '824', '240', '232'],
    explanation: '236 · 4: 4 · 6 = 24, leírom a 4-et, marad 2. 4 · 3 = 12, + 2 = 14, leírom a 4-et, marad 1. 4 · 2 = 8, + 1 = 9. A szorzat 944.'
  }),
  q({
    id: 'wme-q50',
    level: 2,
    questionTypeBadge: 'Következtetés',
    question: '3 · □ = 270. Mennyi 9 · □?',
    options: ['810', '540', '279', '90'],
    explanation: 'A 9 a 3-nak a 3-szorosa, így a szorzat is 3-szoros: 270 · 3 = 810.'
  }),
  q({
    id: 'wme-q51',
    level: 2,
    questionTypeBadge: 'Következtetés',
    figure: <PriceFig n1={4} p1={440} n2={8} />,
    question: '4 db képeslap 440 Ft. Mennyibe kerül 8 db?',
    options: ['880 Ft', '444 Ft', '840 Ft', '448 Ft'],
    explanation: '8 db = 4 db · 2. Kétszer annyi képeslap, kétszer annyi pénz: 440 · 2 = 880 Ft.'
  }),
  q({
    id: 'wme-q52',
    level: 2,
    questionTypeBadge: 'Összefüggés',
    question: 'Melyik szorzat ugyanannyi, mint 115 · 4?',
    options: ['230 · 2', '115 · 2', '230 · 4', '230 · 8'],
    explanation: '115 · 2 = 230, és 4 : 2 = 2. Egyik · 2, másik : 2, a szorzat nem változik: 460.'
  }),
  q({
    id: 'wme-q53',
    level: 2,
    questionTypeBadge: 'Összefüggés',
    figure: <RelFig top="5 · 60 = 300" bottom="5 · 180 =" op="· 3" />,
    question: 'Ha 5 · 60 = 300, mennyi 5 · 180?',
    options: ['900', '600', '420', '303'],
    explanation: 'A 180 a 60-nak a 3-szorosa, így a szorzat is 3-szoros: 300 · 3 = 900.'
  }),
  qExpr('wme-q54', 2, '4 · 160 + 95', [640, 255, 745]),
  qExpr('wme-q55', 2, '2 · (215 + 160)', [590, 535, 375], { fig: <PackFig n={2} a={215} b={160} /> }),
  qExpr('wme-q56', 2, '900 − 3 · 125', [375, 775, 535]),
  q({
    id: 'wme-q57',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyiknek a legnagyobb az eredménye?',
    options: ['(130 + 70) · 4', '130 + 70 · 4', '130 · 4 + 70', '130 + 70 + 4'],
    explanation: '(130 + 70) · 4 = 800, 130 + 70 · 4 = 410, 130 · 4 + 70 = 590, 130 + 70 + 4 = 204. A legnagyobb a 800.'
  }),
  q({
    id: 'wme-q58',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BarFig base={126} times={3} l1="képregény" l2="mese" />,
    question: 'A polcon 126 képregény és 3-szor annyi mesekönyv van. Hány könyv van összesen?',
    options: ['504', '378', '252', '494'],
    explanation: 'Mesekönyv: 126 · 3 = 378. Összesen: 126 + 378 = 504.'
  }),
  q({
    id: 'wme-q59',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    figure: <ShopFig n={4} price={185} pay={1000} />,
    question: 'Veszel 4 tollat, mindegyik 185 Ft. 1000 Ft-tal fizetsz. Mennyi jár vissza?',
    options: ['260 Ft', '740 Ft', '815 Ft', '360 Ft'],
    explanation: 'A 4 toll ára: 185 · 4 = 740 Ft. Visszajár: 1000 − 740 = 260 Ft.'
  }),
  q({
    id: 'wme-q60',
    level: 2,
    questionTypeBadge: 'Műveletlánc',
    figure: <ChainFig start={125} ops={['· 3', '− 200']} />,
    question: 'Melyik szám kerül a lánc végére?',
    options: ['175', '375', '125', '575'],
    explanation: '125 · 3 = 375. Utána 375 − 200 = 175.'
  }),

  // =========================== 3. szint ===========================
  qMul('wme-q61', 3, 186, 4, { story: 'Egy vonatnak 4 kocsija van. Mindegyikben 186 ülés van. Hány ülés van a vonaton?', unit: 'ülés', badge: 'Szöveges feladat', fig: <RepeatFig n={4} v={186} unit="ülés" /> }),
  qMul('wme-q62', 3, 238, 3, { story: 'Egy gyár naponta 238 játékot készít. Hány játékot készít 3 nap alatt?', unit: 'játék', badge: 'Szöveges feladat', fig: <RepeatFig n={3} v={238} unit="játék" /> }),
  qMul('wme-q63', 3, 249, 4),
  qMul('wme-q64', 3, 189, 5),
  qMul('wme-q65', 3, 278, 3, { fig: false }),
  q({
    id: 'wme-q66',
    level: 3,
    questionTypeBadge: 'Hiányzó számjegy',
    figure: <MulColumn a="□27" d="7" p="889" />,
    question: 'Melyik számjegy hiányzik a □ helyéről?',
    options: ['1', '2', '3', '8'],
    explanation: '127 · 7 = 889. Próbáld ki: 7 · 7 = 49, marad 4. 7 · 2 = 14, + 4 = 18, marad 1. 7 · 1 = 7, + 1 = 8. Jó!'
  }),
  q({
    id: 'wme-q67',
    level: 3,
    questionTypeBadge: 'Hiányzó számjegy',
    figure: <MulColumn a="2□3" d="3" p="729" />,
    question: 'Melyik számjegy hiányzik a □ helyéről?',
    options: ['4', '2', '3', '7'],
    explanation: '243 · 3 = 729. A tízeseknél: 3 · 4 = 12, leírjuk a 2-t, marad 1. 3 · 2 = 6, + 1 = 7. Jó!'
  }),
  q({
    id: 'wme-q68',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik a nagyobb: a 236 háromszorosa vagy a 352 kétszerese?',
    options: ['A 236 háromszorosa', 'A 352 kétszerese', 'Egyenlők', 'Nem lehet eldönteni'],
    explanation: '236 · 3 = 708 és 352 · 2 = 704. A 708 a nagyobb, de csak 4-gyel!'
  }),
  q({
    id: 'wme-q69',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik a nagyobb: 115 · 4 + 115 vagy (115 + 115) · 4?',
    options: ['(115 + 115) · 4', '115 · 4 + 115', 'Egyenlők', 'Nem lehet eldönteni'],
    explanation: '115 · 4 + 115 = 460 + 115 = 575. (115 + 115) · 4 = 230 · 4 = 920. A 920 a nagyobb.'
  }),
  q({
    id: 'wme-q70',
    level: 3,
    questionTypeBadge: 'Szorzás fejben',
    question: 'Melyik számpár szorzata 720?',
    options: ['80 és 9', '90 és 7', '170 és 4', '240 és 2'],
    explanation: '80 · 9 = 720. A többi: 90 · 7 = 630, 170 · 4 = 680, 240 · 2 = 480.'
  }),
  q({
    id: 'wme-q71',
    level: 3,
    questionTypeBadge: 'Hiányzó szám',
    figure: <ExprFig expr="□ : 3 = 286" />,
    question: 'Melyik számot osztottuk 3-mal, ha 286 lett?',
    options: ['858', '648', '289', '868'],
    explanation: 'Fordítva gondolkodunk: 286 · 3 = 858. Ellenőrzés: 858 : 3 = 286.'
  }),
  q({
    id: 'wme-q72',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számot',
    question: 'Mennyi a 112 hétszeresének és a 125 ötszörösének a különbsége?',
    options: ['159', '169', '149', '784'],
    explanation: '112 · 7 = 784 és 125 · 5 = 625. A különbség: 784 − 625 = 159.'
  }),
  q({
    id: 'wme-q73',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számot',
    question: 'A 147 hatszorosa mennyivel nagyobb 500-nál?',
    options: ['382', '882', '352', '392'],
    explanation: '147 · 6 = 882. A különbség: 882 − 500 = 382.'
  }),
  q({
    id: 'wme-q74',
    level: 3,
    questionTypeBadge: 'Műveletlánc',
    figure: <ChainFig start={214} ops={['· 2', '− 299', '· 4', '− 315']} />,
    question: 'Melyik szám kerül a lánc végére?',
    options: ['201', '516', '129', '211'],
    explanation: '214 · 2 = 428. 428 − 299 = 129. 129 · 4 = 516. 516 − 315 = 201.'
  }),
  q({
    id: 'wme-q75',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számot',
    question: 'Melyik számra gondoltam? A 175 négyszeresénél 205-tel kisebb.',
    options: ['495', '905', '700', '505'],
    explanation: '175 · 4 = 700. Ennél 205-tel kisebb: 700 − 205 = 495.'
  }),
  q({
    id: 'wme-q76',
    level: 3,
    questionTypeBadge: 'Becslés',
    figure: <ShopFig n={4} price={192} pay={800} />,
    question: 'Egy belépő 192 Ft. Elég-e 800 Ft 4 belépőre?',
    options: ['Igen, mert 4 belépő 768 Ft.', 'Nem, mert 4 belépő 808 Ft.', 'Nem, mert 4 belépő 868 Ft.', 'Igen, mert 4 belépő 400 Ft.'],
    explanation: 'Becslés: 192 ≈ 190, 190 · 4 = 760. Pontosan: 192 · 4 = 768 Ft. Ez kevesebb 800 Ft-nál, tehát elég.'
  }),
  q({
    id: 'wme-q77',
    level: 3,
    questionTypeBadge: 'Következtetés',
    question: 'Egy szám kétszerese 320. Mennyi a hatszorosa?',
    options: ['960', '640', '480', '326'],
    explanation: 'A 6 a 2-nek a 3-szorosa. Így a szorzat is 3-szoros: 320 · 3 = 960.'
  }),
  q({
    id: 'wme-q78',
    level: 3,
    questionTypeBadge: 'Következtetés',
    figure: <PriceFig n1={3} p1={270} n2={9} unit="kg" />,
    question: '3 kg alma 270 Ft. Mennyibe kerül 9 kg?',
    options: ['810 Ft', '540 Ft', '279 Ft', '930 Ft'],
    explanation: '9 kg = 3 kg · 3. Háromszor annyi alma, háromszor annyi pénz: 270 · 3 = 810 Ft.'
  }),
  q({
    id: 'wme-q79',
    level: 3,
    questionTypeBadge: 'Összefüggés',
    figure: <RelFig top="3 · 40 = 120" bottom="6 · 80 =" op="· 2 · 2" />,
    question: 'Ha 3 · 40 = 120, mennyi 6 · 80?',
    options: ['480', '240', '120', '960'],
    explanation: 'Mindkét tényező 2-szeres lett. A szorzat így 4-szeres: 120 · 4 = 480.'
  }),
  q({
    id: 'wme-q80',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <PackFig n={3} a={45} b={230} la="fent" lb="lent" />,
    question: 'A moziban fent 45, lent 230 hely van. 3 előadás volt, mindig tele. Hány néző volt?',
    options: ['825', '365', '735', '275'],
    explanation: 'Egy előadáson 45 + 230 = 275 néző. 3 előadáson: (45 + 230) · 3 = 825.'
  }),
  q({
    id: 'wme-q81',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <RepeatFig n={3} v={145} e={280} unit="zsemle" />,
    question: 'A pékségben 3 tálcán 145-145 zsemle volt. Eladtak 280-at. Hány zsemle maradt?',
    options: ['155', '715', '435', '165'],
    explanation: '3 tálcán: 145 · 3 = 435 zsemle. Maradt: 435 − 280 = 155.'
  }),
  qMul('wme-q82', 3, 125, 6, { story: 'Egy csomagban 125 lap van. Hány lap van 6 csomagban?', unit: 'lap', badge: 'Szöveges feladat', fig: <RepeatFig n={6} v={125} unit="lap" /> }),
  q({
    id: 'wme-q83',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BarFig base={168} times={4} l1="délelőtt" l2="délután" ask="second" />,
    question: 'A színházban 950 hely van. Délelőtt 168 gyerek, délután 4-szer annyi gyerek ült ott. Hány hely maradt üresen délután?',
    options: ['278', '672', '782', '288'],
    explanation: 'Délután: 168 · 4 = 672 gyerek. Üres hely: 950 − 672 = 278.'
  }),
  q({
    id: 'wme-q84',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Veszel 3 db 215 Ft-os füzetet és 2 db 120 Ft-os ceruzát. Mennyit fizetsz?',
    options: ['885 Ft', '645 Ft', '860 Ft', '335 Ft'],
    explanation: 'Füzetek: 215 · 3 = 645 Ft. Ceruzák: 120 · 2 = 240 Ft. Összesen: 645 + 240 = 885 Ft.'
  }),
  q({
    id: 'wme-q85',
    level: 3,
    questionTypeBadge: 'Hibakeresés',
    question: 'Becsléssel döntsd el: melyik szorzás biztosan hibás?',
    options: ['312 · 3 = 636', '198 · 4 = 792', '207 · 3 = 621', '163 · 5 = 815'],
    explanation: '312 ≈ 310, és 310 · 3 = 930. A 636 túl messze van tőle! A jó eredmény: 312 · 3 = 936.'
  }),
  q({
    id: 'wme-q86',
    level: 3,
    questionTypeBadge: 'Hiányzó számjegy',
    figure: <MulColumn a="1□7" d="2" p="314" />,
    question: 'Melyik számjegy hiányzik a □ helyéről?',
    options: ['5', '4', '6', '1'],
    explanation: '157 · 2 = 314. Egyesek: 2 · 7 = 14, marad 1. Tízesek: 2 · 5 = 10, + 1 = 11, leírom az 1-et, marad 1. Százasok: 2 · 1 + 1 = 3.'
  }),
  q({
    id: 'wme-q87',
    level: 3,
    questionTypeBadge: 'Hiányzó szám',
    figure: <ExprFig expr="4 · □ + 120 = 920" />,
    question: 'Melyik szám kerül a □ helyére?',
    options: ['200', '800', '230', '260'],
    explanation: '4 · □ + 120 = 920, tehát 4 · □ = 800. Ezért □ = 200. Ellenőrzés: 4 · 200 + 120 = 920.'
  }),
  q({
    id: 'wme-q88',
    level: 3,
    questionTypeBadge: 'Következtetés',
    figure: <RelFig top="125 · 4 = 500" bottom="125 · 8 =" op="· 2" />,
    question: 'Ha 125 · 4 = 500, mennyi 125 · 8?',
    options: ['1000', '504', '900', '250'],
    explanation: 'A 8 a 4-nek a 2-szerese, így a szorzat is 2-szeres: 500 · 2 = 1000.'
  }),
  q({
    id: 'wme-q89',
    level: 3,
    questionTypeBadge: 'Sorrend',
    question: 'Melyik műveletsor eredménye 660?',
    options: ['3 · (125 + 95)', '3 · 125 + 95', '125 + 3 · 95', '125 + 95 + 3'],
    explanation: '3 · (125 + 95) = 3 · 220 = 660. A többi: 470, 410, 223.'
  }),
  q({
    id: 'wme-q90',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <ShopFig n={4} price={230} pay={1000} />,
    question: 'Egy múzeumi jegy 230 Ft. A 4 fős család 1000 Ft-tal fizet. Mennyi jár vissza?',
    options: ['80 Ft', '920 Ft', '770 Ft', '180 Ft'],
    explanation: '4 jegy: 230 · 4 = 920 Ft. Visszajár: 1000 − 920 = 80 Ft.'
  })
];

export const WrittenMulExamG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="irasbeli-szorzas"
      topicId="g3-wmul-tudasproba-quiz"
      subtopicId="megallo"
      title="6. Megálló – tudáspróba – Kvíz"
      subtitle="90 feladat 3 szinten: fejben és írásban szorzás, becslés, következtetés, műveleti sorrend."
      badge="3. OSZTÁLY • XIII. ÍRÁSBELI SZORZÁS • KVÍZ"
      questions={WRITTEN_MUL_EXAM_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Írásbeli szorzás',
          items: ['Az egyesekkel kezdj!', '3 · 4 = 12: leírom a 2-t, marad 1', 'A maradékot a szorzás UTÁN add hozzá', 'Ellenőrzés: 214 + 214 + 214 = 642']
        },
        {
          title: 'Fejben és becsléssel',
          items: ['280 · 2 = 200 · 2 + 80 · 2 = 560', 'Becslés: 335 ≈ 340, 340 · 2 = 680', 'Lefelé kerekítettél → a szorzat nagyobb lesz']
        },
        {
          title: 'Következtetés, sorrend',
          items: ['Egyik tényező · 2 → szorzat · 2', '2 db 150 Ft → 4 db 300 Ft', 'Sorrend: ( ) → · → + −']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <WrittenMulExamG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <WrittenMulExamG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default WrittenMulExamG3Quiz;
