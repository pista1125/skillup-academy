import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { WrittenOps1000ExamG3Matcher } from './WrittenOps1000ExamG3Matcher';
import { WrittenOps1000ExamG3Sorter } from './WrittenOps1000ExamG3Sorter';
import { q, qAdd, qSub, AddFig, SubFig, PyramidFig } from './WrittenOps1000ExamG3Parts';
import { ExprFig, ChainFig, WalletFig, GroupsFig, NoteFig } from '../muveleti-sorrend/OrderOps1000G3Parts';
import { TableFig, RouteFig, BarFig, RowsFig, TriangleFig, CardsFig, SeqFig, TrackFig } from '../vegyes-muveletek-szoveges/MixedOps1000G3Parts';

const FRUIT_HEAD = ['', 'Alma (kg)', 'Körte (kg)'];
const FRUIT = [
  ['hétfő', '268', '145'],
  ['kedd', '327', '189']
];
const HIKE = ['Falu', 'Erdő', 'Tó', 'Rét'];
const HIKE_D = [384, 297, 245];

// ---------------------------------------------------------------------------
// 1. szint – egy lépés
// ---------------------------------------------------------------------------
const L1: QuizQuestion[] = [
  qAdd('wo1000e-q1', 1, [345, 232]),
  qAdd('wo1000e-q2', 1, [418, 365]),
  qAdd('wo1000e-q3', 1, [257, 481]),
  qAdd('wo1000e-q4', 1, [136, 529]),
  qAdd('wo1000e-q5', 1, [604, 293]),
  qAdd('wo1000e-q6', 1, [512, 279]),
  qSub('wo1000e-q7', 1, 687, 254),
  qSub('wo1000e-q8', 1, 752, 318),
  qSub('wo1000e-q9', 1, 846, 293),
  qSub('wo1000e-q10', 1, 935, 471),
  qSub('wo1000e-q11', 1, 568, 125),
  qSub('wo1000e-q12', 1, 623, 208),
  q({ id: 'wo1000e-q13', level: 1, questionTypeBadge: 'Balról jobbra', figure: <ChainFig start="600" ops={['− 200', '+ 300']} />, question: '600 − 200 + 300 = ?', options: ['700', '100', '500', '400'], explanation: 'Csak + és − van: balról jobbra. 600 − 200 = 400, 400 + 300 = 700.' }),
  q({ id: 'wo1000e-q14', level: 1, questionTypeBadge: 'Műveleti sorrend', figure: <ExprFig expr="400 + 50 · 4" bubbles={['?', '?']} />, question: '400 + 50 · 4 = ?', options: ['600', '800', '450', '650'], explanation: 'Előbb a szorzás: 50 · 4 = 200. Utána: 400 + 200 = 600.' }),
  q({ id: 'wo1000e-q15', level: 1, questionTypeBadge: 'Zárójel', figure: <ExprFig expr="(500 − 100) : 4" />, question: '(500 − 100) : 4 = ?', options: ['100', '475', '125', '400'], explanation: 'Előbb a zárójel: 500 − 100 = 400. Utána: 400 : 4 = 100.' }),
  q({ id: 'wo1000e-q16', level: 1, questionTypeBadge: 'Zárójel', figure: <ExprFig expr="900 − (300 + 200)" />, question: '900 − (300 + 200) = ?', options: ['400', '800', '500', '200'], explanation: 'Előbb a zárójel: 300 + 200 = 500. Utána: 900 − 500 = 400. (A 800 a zárójel nélküli eredmény.)' }),
  q({ id: 'wo1000e-q17', level: 1, questionTypeBadge: 'Hiányzó szám', figure: <BarFig whole="750" parts={[{ v: 450, text: '□' }, { v: 300, text: '300' }]} />, question: '□ + 300 = 750. Melyik szám a □?', options: ['450', '400', '550', '350'], explanation: '750 − 300 = 450. Ellenőrzés: 450 + 300 = 750.' }),
  q({ id: 'wo1000e-q18', level: 1, questionTypeBadge: 'Hiányzó szám', figure: <BarFig whole="800" parts={[{ v: 280, text: '□' }, { v: 520, text: '520' }]} />, question: '800 − □ = 520. Melyik szám a □?', options: ['280', '320', '380', '220'], explanation: '800 − 520 = 280. Ellenőrzés: 800 − 280 = 520.' }),
  q({ id: 'wo1000e-q19', level: 1, questionTypeBadge: 'Hiányzó szám', figure: <BarFig whole="□" parts={[{ v: 250, text: '250' }, { v: 400, text: '400' }]} />, question: '□ − 250 = 400. Melyik szám a □?', options: ['650', '150', '600', '550'], explanation: 'A kisebbítendőt összeadással kapjuk: 400 + 250 = 650.' }),
  q({ id: 'wo1000e-q20', level: 1, questionTypeBadge: 'Pótlás 1000-ig', figure: <BarFig whole="1000" parts={[{ v: 470, text: '470' }, { v: 530, text: '□' }]} />, question: '470 + □ = 1000. Melyik szám a □?', options: ['530', '630', '570', '430'], explanation: '470-től 1000-ig: 470 + 30 = 500, 500 + 500 = 1000. Összesen 530.' }),
  q({ id: 'wo1000e-q21', level: 1, questionTypeBadge: 'Becslés', question: 'Becsüld meg százasra kerekítve! 389 + 214 ≈ ?', options: ['600', '500', '700', '603'], explanation: '389 ≈ 400, 214 ≈ 200. 400 + 200 = 600. (A pontos összeg 603, ez közel van.)' }),
  q({ id: 'wo1000e-q22', level: 1, questionTypeBadge: 'Becslés', question: 'Becsüld meg százasra kerekítve! 712 − 288 ≈ ?', options: ['400', '500', '424', '300'], explanation: '712 ≈ 700, 288 ≈ 300. 700 − 300 = 400. (A pontos különbség 424.)' }),
  q({ id: 'wo1000e-q23', level: 1, questionTypeBadge: 'Becslés', question: 'Becsüld meg százasra kerekítve! 451 + 349 ≈ ?', options: ['800', '700', '900', '750'], explanation: '451 ≈ 500, 349 ≈ 300. 500 + 300 = 800.' }),
  q({ id: 'wo1000e-q24', level: 1, questionTypeBadge: 'Becslés', question: 'Becsüld meg százasra kerekítve! 864 − 531 ≈ ?', options: ['400', '300', '333', '500'], explanation: '864 ≈ 900, 531 ≈ 500. 900 − 500 = 400.' }),
  qAdd('wo1000e-q25', 1, [465, 328], { story: 'A könyvtárban 465 mesekönyv és 328 verseskötet van. Hány könyv ez összesen?', badge: 'Szöveges feladat', fig: false }),
  q({ id: 'wo1000e-q26', level: 1, questionTypeBadge: 'Szöveges feladat', figure: <TrackFig total={1000} marks={[{ name: 'te', at: 645, color: '#7c3aed' }]} />, question: 'Egy 1000 m-es útból már 645 m-t megtettél. Mennyi van még hátra?', options: ['355 m', '455 m', '365 m', '645 m'], explanation: '1000 − 645 = 355. Pótolva: 645-től 650-ig 5, 650-től 1000-ig 350. Összesen 355 m.' }),
  qSub('wo1000e-q27', 1, 386, 152, { story: 'Egy kosárban 386 alma van. Eladnak 152-t. Hány alma marad?', badge: 'Szöveges feladat', fig: false }),
  qAdd('wo1000e-q28', 1, [275, 418], { story: 'Zsófi 275 Ft-ot gyűjtött, a testvére 418 Ft-ot. Mennyi pénzük van együtt?', badge: 'Szöveges feladat', unit: 'Ft', fig: false }),
  q({ id: 'wo1000e-q29', level: 1, questionTypeBadge: 'Ellenőrzés', question: 'Melyik összeadással ellenőrizheted ezt: 742 − 315 = 427?', options: ['427 + 315', '742 + 315', '742 + 427', '427 + 427'], explanation: 'A különbséghez hozzáadjuk a kivonandót: 427 + 315 = 742. Ha a kisebbítendő jön ki, jó a kivonás.' }),
  q({ id: 'wo1000e-q30', level: 1, questionTypeBadge: 'Írásbeli összeadás', question: 'Melyik helyi értéken kezded az írásbeli összeadást?', options: ['az egyeseknél', 'a százasoknál', 'a tízeseknél', 'bárhol kezdhetem'], explanation: 'Mindig az egyeseknél kezdünk, mert ott keletkezhet maradék, amit a tízesekhez viszünk.' })
];

// ---------------------------------------------------------------------------
// 2. szint – több maradék, nullák, ábráról olvasás
// ---------------------------------------------------------------------------
const L2: QuizQuestion[] = [
  qAdd('wo1000e-q31', 2, [467, 385]),
  qAdd('wo1000e-q32', 2, [289, 547]),
  qAdd('wo1000e-q33', 2, [235, 148, 307]),
  qAdd('wo1000e-q34', 2, [176, 259, 384]),
  qAdd('wo1000e-q35', 2, [395, 405]),
  q({ id: 'wo1000e-q36', level: 2, questionTypeBadge: 'Kivonás 1000-ből', figure: <SubFig a={1000} b={496} />, question: 'Számold ki írásban! 1000 − 496 = ?', options: ['504', '614', '596', '514'], explanation: 'Pótolj! Egyesek: 6-hoz 4, az 10, maradt 1. Tízesek: 9 meg 1 az 10, 10-hez 0, az 10, maradt 1. Százasok: 4 meg 1 az 5, 5-höz 5, az 10, maradt 1. Az eredmény 504.' }),
  qSub('wo1000e-q37', 2, 700, 358, { badge: 'Kivonás nullákkal' }),
  qSub('wo1000e-q38', 2, 805, 267, { badge: 'Kivonás nullákkal' }),
  qSub('wo1000e-q39', 2, 603, 175, { badge: 'Kivonás nullákkal' }),
  qSub('wo1000e-q40', 2, 910, 384, { badge: 'Kivonás nullákkal' }),
  q({ id: 'wo1000e-q41', level: 2, questionTypeBadge: 'Balról jobbra', figure: <ChainFig start="736" ops={['− 284', '+ 159']} />, question: '736 − 284 + 159 = ?', options: ['611', '293', '621', '601'], explanation: 'Balról jobbra, írásban: 736 − 284 = 452, 452 + 159 = 611. (A 293 akkor jön ki, ha előbb 284 + 159-et számolsz.)' }),
  q({ id: 'wo1000e-q42', level: 2, questionTypeBadge: 'Műveleti sorrend', figure: <ExprFig expr="920 − 8 · 60" bubbles={['?', '?']} />, question: '920 − 8 · 60 = ?', options: ['440', '480', '540', '400'], explanation: 'Előbb a szorzás: 8 · 60 = 480. Utána: 920 − 480 = 440.' }),
  q({ id: 'wo1000e-q43', level: 2, questionTypeBadge: 'Zárójel', figure: <ExprFig expr="(845 − 365) : 6" />, question: '(845 − 365) : 6 = ?', options: ['80', '90', '70', '480'], explanation: 'Zárójel: 845 − 365 = 480. Utána: 480 : 6 = 80.' }),
  q({ id: 'wo1000e-q44', level: 2, questionTypeBadge: 'Zárójel', figure: <ExprFig expr="1000 − (438 + 279)" />, question: '1000 − (438 + 279) = ?', options: ['283', '293', '383', '717'], explanation: 'Zárójel: 438 + 279 = 717. Utána: 1000 − 717 = 283.' }),
  q({ id: 'wo1000e-q45', level: 2, questionTypeBadge: 'Zárójel', figure: <ExprFig expr="3 · (412 − 342)" />, question: '3 · (412 − 342) = ?', options: ['210', '70', '240', '180'], explanation: 'Zárójel: 412 − 342 = 70. Utána: 3 · 70 = 210.' }),
  q({ id: 'wo1000e-q46', level: 2, questionTypeBadge: 'Hiányzó szám', figure: <BarFig whole="913" parts={[{ v: 455, text: '□' }, { v: 458, text: '458' }]} />, question: '□ + 458 = 913. Melyik szám a □?', options: ['455', '465', '545', '445'], explanation: '913 − 458 = 455. Ellenőrzés: 455 + 458 = 913.' }),
  q({ id: 'wo1000e-q47', level: 2, questionTypeBadge: 'Hiányzó szám', question: '742 − □ = 386. Melyik szám a □?', options: ['356', '366', '456', '344'], explanation: '742 − 386 = 356. Ellenőrzés: 742 − 356 = 386.' }),
  q({ id: 'wo1000e-q48', level: 2, questionTypeBadge: 'Hiányzó szám', question: '□ − 267 = 548. Melyik szám a □?', options: ['815', '281', '805', '715'], explanation: 'A kisebbítendő: 548 + 267 = 815. (A 281 a 548 − 267 lenne.)' }),
  q({ id: 'wo1000e-q49', level: 2, questionTypeBadge: 'Pótlás 1000-ig', question: '395 + □ = 1000. Melyik szám a □?', options: ['605', '615', '705', '695'], explanation: '1000 − 395 = 605. Pótolva: 395 + 5 = 400, 400 + 600 = 1000. Összesen 605.' }),
  q({ id: 'wo1000e-q50', level: 2, questionTypeBadge: 'Hiányzó számjegy', figure: <AddFig nums={['5?8', 267]} result={835} />, question: 'Melyik számjegy hiányzik? 5?8 + 267 = 835', options: ['6', '7', '5', '8'], explanation: '835 − 267 = 568, tehát a hiányzó jegy a 6. Ellenőrzés: 568 + 267 = 835.' }),
  q({ id: 'wo1000e-q51', level: 2, questionTypeBadge: 'Hiányzó számjegy', figure: <SubFig a="7?3" b={248} result={485} />, question: 'Melyik számjegy hiányzik? 7?3 − 248 = 485', options: ['3', '2', '4', '8'], explanation: '485 + 248 = 733, tehát a hiányzó jegy a 3. Ellenőrzés: 733 − 248 = 485.' }),
  q({ id: 'wo1000e-q52', level: 2, questionTypeBadge: 'Hiányzó számjegy', figure: <SubFig a="64?" b={285} result={357} />, question: 'Melyik számjegy hiányzik? 64? − 285 = 357', options: ['2', '3', '1', '8'], explanation: '357 + 285 = 642, tehát a hiányzó jegy a 2.' }),
  q({ id: 'wo1000e-q53', level: 2, questionTypeBadge: 'Táblázat', figure: <TableFig head={FRUIT_HEAD} rows={FRUIT} caption="szüret a gyümölcsösben" />, question: 'Hány kg gyümölcsöt szedtek hétfőn?', options: ['413 kg', '403 kg', '123 kg', '595 kg'], explanation: 'Hétfő sora: 268 + 145 = 413 kg.' }),
  q({ id: 'wo1000e-q54', level: 2, questionTypeBadge: 'Táblázat', figure: <TableFig head={FRUIT_HEAD} rows={FRUIT} caption="szüret a gyümölcsösben" />, question: 'Mennyivel több almát szedtek kedden, mint hétfőn?', options: ['59 kg', '69 kg', '141 kg', '161 kg'], explanation: 'Az alma oszlop: 327 − 268 = 59 kg.' }),
  q({ id: 'wo1000e-q55', level: 2, questionTypeBadge: 'Útvonal', figure: <RouteFig places={HIKE.slice(0, 3)} dists={HIKE_D.slice(0, 2)} ask={[0, 2]} />, question: 'Milyen messze van a falutól a tó?', options: ['681 m', '671 m', '87 m', '581 m'], explanation: '384 + 297 = 681 m. Az egyeseknél 11, a tízeseknél 18: kétszer marad 1.' }),
  q({ id: 'wo1000e-q56', level: 2, questionTypeBadge: 'Útvonal', figure: <RouteFig places={HIKE.slice(0, 3)} dists={HIKE_D.slice(0, 2)} />, question: 'Mennyivel hosszabb a falu–erdő szakasz, mint az erdő–tó szakasz?', options: ['87 m', '113 m', '97 m', '681 m'], explanation: '384 − 297 = 87 m. (A 113 akkor jön ki, ha mindig a nagyobb jegyből vonsz ki.)' }),
  q({ id: 'wo1000e-q57', level: 2, questionTypeBadge: 'Nyitott mondat', question: 'Melyik szám igaz? 365 + 278 > □ > 912 − 281', options: ['640', '631', '643', '650'], explanation: '365 + 278 = 643 és 912 − 281 = 631. A □ 631-nél nagyobb és 643-nál kisebb: a 640 jó.' }),
  q({ id: 'wo1000e-q58', level: 2, questionTypeBadge: 'Összehasonlítás', question: 'Melyik a nagyobb? 528 + 296 vagy 1000 − 187', options: ['528 + 296', '1000 − 187', 'egyenlők', 'nem lehet eldönteni'], explanation: '528 + 296 = 824, 1000 − 187 = 813. A 824 a nagyobb.' }),
  q({ id: 'wo1000e-q59', level: 2, questionTypeBadge: 'Ellenőrzés', question: 'Melyik kivonással ellenőrizheted ezt: 386 + 457 = 843?', options: ['843 − 457', '843 + 457', '457 − 386', '843 − 843'], explanation: 'Az összegből elvesszük az egyik tagot. A másik tagot kell kapnunk: 843 − 457 = 386.' }),
  q({ id: 'wo1000e-q60', level: 2, questionTypeBadge: 'Sorozat', figure: <SeqFig items={['128', '275', '422', '?']} />, question: 'Mindig ugyanannyival nő. Melyik szám jön a 422 után?', options: ['569', '559', '579', '547'], explanation: '275 − 128 = 147, tehát mindig 147-tel nő. 422 + 147 = 569.' })
];

// ---------------------------------------------------------------------------
// 3. szint – két lépés
// ---------------------------------------------------------------------------
const L3: QuizQuestion[] = [
  q({ id: 'wo1000e-q61', level: 3, questionTypeBadge: 'Két lépés', figure: <RowsFig max={386} right="?" rows={[{ name: 'délelőtt', segs: [{ v: 386, text: '386' }] }, { name: 'délután', segs: [{ v: 239, text: '?' }, { v: 147, text: '147', dashed: true }] }]} />, question: 'A kisvonat délelőtt 386 utast vitt, délután 147-tel kevesebbet. Hány utast vitt egész nap?', options: ['625', '533', '239', '635'], explanation: 'Délután: 386 − 147 = 239. Egész nap: 386 + 239 = 625.' }),
  q({ id: 'wo1000e-q62', level: 3, questionTypeBadge: 'Két lépés', question: 'Egy iskolába 478 tanuló jár. 265 fiú. Mennyivel több a fiú, mint a lány?', options: ['52', '213', '62', '265'], explanation: 'Lányok: 478 − 265 = 213. Különbség: 265 − 213 = 52.' }),
  q({ id: 'wo1000e-q63', level: 3, questionTypeBadge: 'Pénz', figure: <WalletFig money="1000 Ft" tags={['456 Ft', '278 Ft']} />, question: '1000 Ft-tal mész a boltba. Veszel egy 456 Ft-os sajtot és egy 278 Ft-os kenyeret. Mennyi marad?', options: ['266 Ft', '822 Ft', '276 Ft', '734 Ft'], explanation: 'Fizetsz: 456 + 278 = 734 Ft. Marad: 1000 − 734 = 266 Ft. Egy műveletsorral: 1000 − (456 + 278).' }),
  q({ id: 'wo1000e-q64', level: 3, questionTypeBadge: 'Távolság', figure: <TrackFig total={1000} marks={[{ name: 'Bence', at: 735, color: '#2563eb' }, { name: 'Dóri', at: 590, color: '#db2777' }]} />, question: 'Egy 1000 m-es versenyen Bence 735 m-nél, Dóri 590 m-nél tart. Mennyi út van még hátra kettejüknek együtt?', options: ['675 m', '145 m', '665 m', '575 m'], explanation: 'Bencének: 1000 − 735 = 265 m. Dórinak: 1000 − 590 = 410 m. Együtt: 265 + 410 = 675 m.' }),
  q({ id: 'wo1000e-q65', level: 3, questionTypeBadge: 'Gondoltam egy számot', question: 'Gondoltam egy számot. Kivontam belőle 348-at, aztán hozzáadtam 125-öt. 600 lett. Melyik számra gondoltam?', options: ['823', '377', '723', '813'], explanation: 'Visszafelé: 600 − 125 = 475. Utána 475 + 348 = 823. Ellenőrzés: 823 − 348 = 475, 475 + 125 = 600.' }),
  q({ id: 'wo1000e-q66', level: 3, questionTypeBadge: 'Fordított művelet', question: 'Gergő 315-öt akart kivonni egy számból, de hozzáadta. 940 lett. Mi lett volna a jó eredmény?', options: ['310', '625', '320', '300'], explanation: 'A szám: 940 − 315 = 625. A jó eredmény: 625 − 315 = 310.' }),
  qAdd('wo1000e-q67', 3, [245, 318, 197], { story: 'A cukrászda hétfőn 245, kedden 318, szerdán 197 süteményt sütött. Hány süteményt sütött összesen?', badge: 'Három tag', unit: 'db' }),
  q({ id: 'wo1000e-q68', level: 3, questionTypeBadge: 'Melyik számra gondoltam?', question: 'A 8 · 90 és a 245 különbségénél 130-cal nagyobb számra gondoltam. Melyik ez?', options: ['605', '345', '615', '505'], explanation: '8 · 90 = 720. 720 − 245 = 475. 475 + 130 = 605.' }),
  q({ id: 'wo1000e-q69', level: 3, questionTypeBadge: 'Két lépés', figure: <GroupsFig k={4} label="80" extra="−125" />, question: 'A kertben 4 sor paprika van, soronként 80 tő. 125 tő elszáradt. Hány tő maradt?', options: ['195', '205', '445', '295'], explanation: 'Összesen: 4 · 80 = 320 tő. Marad: 320 − 125 = 195 tő.' }),
  q({ id: 'wo1000e-q70', level: 3, questionTypeBadge: 'Pénz', question: 'Lilinek 650 Ft-ja van. Vesz 3 füzetet, mindegyik 120 Ft. Mennyi pénze marad?', options: ['290 Ft', '530 Ft', '390 Ft', '280 Ft'], explanation: 'A füzetek: 3 · 120 = 360 Ft (3 · 12 tízes = 36 tízes). Marad: 650 − 360 = 290 Ft.' }),
  q({ id: 'wo1000e-q71', level: 3, questionTypeBadge: 'Műveletsor', question: '1000 Ft-ból veszel 3 csokit, mindegyik 200 Ft. Melyik műveletsor adja meg, mennyi marad?', options: ['1000 − 3 · 200', '(1000 − 3) · 200', '1000 − 3 + 200', '1000 − 200 + 3'], explanation: 'A csokik ára 3 · 200 = 600 Ft. Ezt vonjuk ki: 1000 − 3 · 200 = 1000 − 600 = 400 Ft. A szorzás előbb jön, ezért nem kell zárójel.' }),
  q({ id: 'wo1000e-q72', level: 3, questionTypeBadge: 'Zárójel', figure: <ExprFig expr="(1000 − 640) : 9" />, question: '(1000 − 640) : 9 = ?', options: ['40', '360', '50', '4'], explanation: 'Zárójel: 1000 − 640 = 360. Utána: 360 : 9 = 40 (mert 36 : 9 = 4).' }),
  q({ id: 'wo1000e-q73', level: 3, questionTypeBadge: 'Zárójel', figure: <ExprFig expr="850 − (5 · 90 + 165)" />, question: '850 − (5 · 90 + 165) = ?', options: ['235', '565', '245', '335'], explanation: 'A zárójelben előbb a szorzás: 5 · 90 = 450, aztán 450 + 165 = 615. Végül: 850 − 615 = 235.' }),
  q({ id: 'wo1000e-q74', level: 3, questionTypeBadge: 'Hová a zárójel?', figure: <ExprFig expr="900 − 360 − 140" hl={false} tail="= 680" />, question: 'Hová kell a zárójel, hogy igaz legyen? 900 − 360 − 140 = 680', options: ['900 − (360 − 140)', '(900 − 360) − 140', 'nem kell zárójel', '(900 − 360 − 140)'], explanation: '900 − (360 − 140) = 900 − 220 = 680. Zárójel nélkül 900 − 360 − 140 = 400 lenne.' }),
  q({ id: 'wo1000e-q75', level: 3, questionTypeBadge: 'Hiányzó szám', figure: <ExprFig expr="(□ + 275) − 180" tail="= 500" />, question: 'Melyik szám a □? (□ + 275) − 180 = 500', options: ['405', '955', '225', '415'], explanation: 'A zárójelben 680 van, mert 680 − 180 = 500. □ + 275 = 680, ezért □ = 405.' }),
  q({ id: 'wo1000e-q76', level: 3, questionTypeBadge: 'Hiányzó szám', figure: <ExprFig expr="1000 − □ − 365" tail="= 247" />, question: 'Melyik szám a □? 1000 − □ − 365 = 247', options: ['388', '612', '882', '398'], explanation: 'A 247-hez a 365-öt visszaadva: 247 + 365 = 612. Tehát 1000 − □ = 612, □ = 388.' }),
  q({ id: 'wo1000e-q77', level: 3, questionTypeBadge: 'Hiányzó szám', question: 'Melyik szám a □? □ : 7 + 380 = 470', options: ['630', '90', '560', '700'], explanation: '□ : 7 = 470 − 380 = 90. □ = 7 · 90 = 630.' }),
  q({ id: 'wo1000e-q78', level: 3, questionTypeBadge: 'Hiányzó számjegy', figure: <SubFig a="6?4" b={278} result={386} />, question: 'Melyik számjegy hiányzik? 6?4 − 278 = 386', options: ['6', '5', '7', '4'], explanation: '386 + 278 = 664, tehát a hiányzó jegy a 6.' }),
  q({ id: 'wo1000e-q79', level: 3, questionTypeBadge: 'Hibakeresés', figure: <NoteFig lines={['563 + 278 = 731']} mark="x" />, question: 'Kata így számolt. Mi a jó eredmény?', options: ['841', '731', '831', '741'], explanation: 'Kata elfelejtette a maradékot. Egyesek: 3 meg 8 az 11, maradt 1. Tízesek: 6 meg 7 az 13, meg 1 az 14, maradt 1. Százasok: 5 meg 2 az 7, meg 1 az 8. Jó: 841.' }),
  q({ id: 'wo1000e-q80', level: 3, questionTypeBadge: 'Hibakeresés', figure: <NoteFig lines={['702 − 345 = 443']} mark="x" />, question: 'Dani így számolt. Mi volt a hibája?', options: ['mindig a nagyobb jegyből vonta ki a kisebbet', 'elfelejtette a maradékot', 'jól számolt', 'összeadott kivonás helyett'], explanation: 'Dani a 2 − 5 helyett 5 − 2-t, a 0 − 4 helyett 4 − 0-t számolt. Pótlással: 5-höz 7, az 12, maradt 1; 5-höz 5, az 10, maradt 1; 4-hez 3, az 7. Jó: 357.' }),
  q({ id: 'wo1000e-q81', level: 3, questionTypeBadge: 'Hibakeresés', figure: <NoteFig lines={['480 − 60 : 6 =', '= 420 : 6 = 70']} mark="x" />, question: 'Bori így számolt. Mi a jó eredmény?', options: ['470', '70', '410', '80'], explanation: 'Az osztás előbb jön: 60 : 6 = 10. Utána: 480 − 10 = 470.' }),
  q({ id: 'wo1000e-q82', level: 3, questionTypeBadge: 'Összegpiramis', figure: <PyramidFig rows={[['185', '247', '318'], ['', ''], ['?']]} />, question: 'Minden szám a két alatta lévő összege. Melyik szám kerül a csúcsra?', options: ['997', '750', '987', '897'], explanation: 'Középen: 185 + 247 = 432 és 247 + 318 = 565. A csúcs: 432 + 565 = 997.' }),
  q({ id: 'wo1000e-q83', level: 3, questionTypeBadge: 'Összegpiramis', figure: <PyramidFig rows={[['230', '', '135'], ['500', '?'], ['905']]} />, question: 'Minden szám a két alatta lévő összege. Melyik szám kerül a „?” helyére?', options: ['405', '395', '270', '505'], explanation: 'A csúcs a két középső összege: 905 − 500 = 405. Ellenőrzés: alul a középső szám 500 − 230 = 270, és 270 + 135 = 405.' }),
  q({ id: 'wo1000e-q84', level: 3, questionTypeBadge: 'Bűvös háromszög', figure: <TriangleFig v={['315', '?', '', '286', '', '']} caption="egy oldalon a számok összege 1000" />, question: 'A háromszög bal oldalán a három szám összege 1000. Melyik szám kerül a „?” helyére?', options: ['399', '601', '409', '389'], explanation: '315 + 286 = 601. 1000 − 601 = 399.' }),
  q({ id: 'wo1000e-q85', level: 3, questionTypeBadge: 'Számkártyák', figure: <CardsFig digits={['3', '8', '1', '6']} />, question: 'Képezd a legnagyobb és a legkisebb háromjegyű számot! Mennyi az összegük?', options: ['999', '989', '727', '899'], explanation: 'A legnagyobb: 863. A legkisebb: 136. 863 + 136 = 999.' }),
  q({ id: 'wo1000e-q86', level: 3, questionTypeBadge: 'Számkártyák', figure: <CardsFig digits={['4', '0', '9', '5']} />, question: 'Melyik a legnagyobb páros háromjegyű szám ezekből a kártyákból?', options: ['954', '950', '945', '594'], explanation: 'Páros szám 0-ra vagy 4-re végződhet. A 9 és az 5 kerül előre: 954 nagyobb, mint 950.' }),
  q({ id: 'wo1000e-q87', level: 3, questionTypeBadge: 'Gondolkodj!', question: 'Két szám összege 1000. Az egyik 100-zal nagyobb, mint a másik. Melyik a nagyobb szám?', options: ['550', '450', '600', '900'], explanation: 'Ha a nagyobbikból elveszünk 100-at, két egyforma szám marad: 900 = 450 + 450. A kisebb 450, a nagyobb 550. Ellenőrzés: 550 + 450 = 1000.' }),
  q({ id: 'wo1000e-q88', level: 3, questionTypeBadge: 'Táblázat', figure: <TableFig head={FRUIT_HEAD} rows={FRUIT} caption="szüret a gyümölcsösben" />, question: 'Mennyivel több almát szedtek a két napon, mint körtét?', options: ['261 kg', '595 kg', '334 kg', '271 kg'], explanation: 'Alma: 268 + 327 = 595 kg. Körte: 145 + 189 = 334 kg. Különbség: 595 − 334 = 261 kg.' }),
  q({ id: 'wo1000e-q89', level: 3, questionTypeBadge: 'Útvonal', figure: <RouteFig places={HIKE} dists={HIKE_D} />, question: 'Az erdőből elsétálsz a rétre, aztán vissza a tóig. Hány métert teszel meg?', options: ['787 m', '542 m', '926 m', '777 m'], explanation: 'Erdő → rét: 297 + 245 = 542 m. Rét → tó: 245 m. Összesen: 542 + 245 = 787 m.' }),
  q({ id: 'wo1000e-q90', level: 3, questionTypeBadge: 'Sorozat', figure: <SeqFig items={['905', '778', '?', '524']} />, question: 'Mindig ugyanannyival csökken. Melyik szám hiányzik?', options: ['651', '641', '661', '751'], explanation: '905 − 778 = 127, tehát mindig 127-tel csökken. 778 − 127 = 651. Ellenőrzés: 651 − 127 = 524.' })
];

export const WRITTEN_OPS_1000_EXAM_G3_QUESTIONS: QuizQuestion[] = [...L1, ...L2, ...L3];

export const WrittenOps1000ExamG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={3}
    chapterId="irasbeli-muveletek-1000-ig"
    topicId="g3-wops-tudasproba-quiz"
    subtopicId="megallo"
    title="5. Megálló – tudáspróba – Kvíz"
    subtitle="90 feladat 3 szinten: írásbeli összeadás és kivonás, sorrend és zárójel, hiányzó számok, szöveges feladatok 1000-ig."
    badge="3. OSZTÁLY • XII. ÍRÁSBELI MŰVELETEK 1000-IG • KVÍZ"
    questions={WRITTEN_OPS_1000_EXAM_G3_QUESTIONS}
    cheatSheets={[
      { title: 'Írásban', items: ['Egyeseknél kezdj!', 'Összeadás: „meg … az …”, a maradékot a következő oszlophoz adod.', 'Kivonás: pótolj! „7-hez 5, az 12, maradt 1.”', 'A maradékot a kivonandó következő jegyéhez adod.'] },
      { title: 'Sorrend', items: ['1. zárójel', '2. szorzás, osztás', '3. összeadás, kivonás', 'Egyforma lépcsőn: balról jobbra'] },
      { title: 'Szöveges feladat', items: ['Mit tudunk? Mit kérdeznek?', 'Rajzolj szalagot!', 'Becsülj, számolj, ellenőrizz!', 'Írj választ!'] }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={<WrittenOps1000ExamG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
    sorterComponent={<WrittenOps1000ExamG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
  />
);

export default WrittenOps1000ExamG3Quiz;
