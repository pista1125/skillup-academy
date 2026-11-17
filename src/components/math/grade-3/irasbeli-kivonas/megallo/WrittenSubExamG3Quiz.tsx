import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { WrittenSubExamG3Matcher } from './WrittenSubExamG3Matcher';
import { WrittenSubExamG3Sorter } from './WrittenSubExamG3Sorter';
import {
  ColFig,
  CoinsFig,
  EstFig,
  PartsFig,
  BarsFig,
  DataTableFig,
  ChainFig,
  PyramidFig,
  CardsFig,
  TagsFig,
  CleverFig,
  AgeFig,
  DiffRowsFig,
  CompareFig,
  DiffTableFig
} from './WrittenSubExamG3Parts';

type Q = Omit<QuizQuestion, 'correctAnswer'>;
const q = (x: Q): QuizQuestion => ({ ...x, correctAnswer: 0 } as QuizQuestion);

// ---------------------------------------------------------------------------
// 1. szint – egy lépés
// ---------------------------------------------------------------------------
const L1: QuizQuestion[] = [
  q({ id: 'wsube-q1', level: 1, questionTypeBadge: 'Kerek százas', figure: <CoinsFig coins={[100, 100, 100, 100, 10, 10, 10, 10, 10, 10, 5]} crossed={[0, 1]} />, question: '465 Ft-ból elköltünk 200 Ft-ot. Mennyi marad?', options: ['265 Ft', '245 Ft', '275 Ft', '65 Ft'], explanation: 'Csak a százasokból veszünk el: 4 százas − 2 százas = 2 százas. A tízesek és az egyesek maradnak: 265 Ft.' }),
  q({ id: 'wsube-q2', level: 1, questionTypeBadge: 'Kerek tízes', question: '380 − 40 = ?', options: ['340', '420', '330', '300'], explanation: '38 tízes − 4 tízes = 34 tízes = 340.' }),
  q({ id: 'wsube-q3', level: 1, questionTypeBadge: 'Kerek százas', question: '450 − 300 = ?', options: ['150', '250', '15', '180'], explanation: '4 százas − 3 százas = 1 százas. Az 5 tízes marad: 150.' }),
  q({ id: 'wsube-q4', level: 1, questionTypeBadge: 'Írásbeli kivonás', figure: <ColFig minuend={486} subtrahend={253} result="???" />, question: 'Számold ki írásban! 486 − 253 = ?', options: ['233', '239', '333', '223'], explanation: 'Pótolj! Egyesek: 3-hoz 3, az 6. Tízesek: 5-höz 3, az 8. Százasok: 2-höz 2, az 4. Az eredmény 233.' }),
  q({ id: 'wsube-q5', level: 1, questionTypeBadge: 'Írásbeli kivonás', figure: <ColFig minuend={397} subtrahend={165} result="???" />, question: 'Számold ki írásban! 397 − 165 = ?', options: ['232', '222', '242', '132'], explanation: 'Pótolj! Egyesek: 5-höz 2, az 7. Tízesek: 6-hoz 3, az 9. Százasok: 1-hez 2, az 3. Az eredmény 232.' }),
  q({ id: 'wsube-q6', level: 1, questionTypeBadge: 'Írásbeli kivonás', question: 'Melyik helyi értéken kezdjük az írásbeli kivonást?', options: ['az egyeseknél', 'a százasoknál', 'a tízeseknél', 'mindegy, hol'], explanation: 'Az írásbeli kivonást mindig a legkisebb helyi értéken, az egyeseknél kezdjük. Utána jönnek a tízesek, végül a százasok.' }),
  q({ id: 'wsube-q7', level: 1, questionTypeBadge: 'Maradék', figure: <ColFig minuend={352} subtrahend={127} result="???" />, question: 'Számold ki írásban! 352 − 127 = ?', options: ['225', '235', '215', '125'], explanation: 'Egyesek: 7-hez 5, az 12, maradt 1. Tízesek: 2 meg 1 az 3, 3-hoz 2, az 5. Százasok: 1-hez 2, az 3. Az eredmény 225. (Aki 235-öt kapott, elfelejtette a maradékot.)' }),
  q({ id: 'wsube-q8', level: 1, questionTypeBadge: 'Becslés', figure: <EstFig a={389} b={214} step={100} />, question: 'Becsüld meg százasra kerekítve: 389 − 214 ≈ ?', options: ['200', '100', '175', '300'], explanation: '389 ≈ 400, 214 ≈ 200. 400 − 200 = 200. (A pontos eredmény 175, ez közel van.)' }),
  q({ id: 'wsube-q9', level: 1, questionTypeBadge: 'Becslés', figure: <EstFig a={468} b={255} step={10} />, question: 'Becsüld meg tízesre kerekítve: 468 − 255 ≈ ?', options: ['210', '200', '213', '220'], explanation: '468 ≈ 470, 255 ≈ 260 (az 5 felfelé kerekít). 470 − 260 = 210.' }),
  q({ id: 'wsube-q10', level: 1, questionTypeBadge: 'Ellenőrzés', question: 'Melyik összeadással ellenőrizheted ezt: 437 − 215 = 222?', options: ['222 + 215', '437 + 215', '437 + 222', '222 + 222'], explanation: 'A különbséghez hozzáadjuk a kivonandót. Ha a kisebbítendőt kapjuk, jó a kivonás: 222 + 215 = 437.' }),
  q({ id: 'wsube-q11', level: 1, questionTypeBadge: 'Szöveges feladat', figure: <PartsFig total="365 gyöngy" parts={[{ v: 150, text: '150' }, { v: 215, text: '?' }]} />, question: 'Egy dobozban 365 gyöngy van. 150-et felfűzöl. Hány gyöngy marad a dobozban?', options: ['215', '205', '225', '115'], explanation: '365 − 150 = 215. Ellenőrzés: 215 + 150 = 365.' }),
  q({ id: 'wsube-q12', level: 1, questionTypeBadge: 'Kevesebb', figure: <BarsFig rows={[{ name: 'fiúk', v: 248 }, { name: 'lányok', v: 222, text: '?' }]} max={260} />, question: 'Az iskolában 248 fiú van. A lányok 26-tal kevesebben vannak. Hány lány van?', options: ['222', '274', '228', '232'], explanation: '„26-tal kevesebb”: kivonunk. 248 − 26 = 222.' }),
  q({ id: 'wsube-q13', level: 1, questionTypeBadge: 'Pénz', figure: <TagsFig have={500} prices={[320]} />, question: '500 Ft-od van. Veszel egy 320 Ft-os társasjátékot. Mennyi pénzed marad?', options: ['180 Ft', '280 Ft', '220 Ft', '170 Ft'], explanation: '500 − 320 = 180. 180 Ft marad.' }),
  q({ id: 'wsube-q14', level: 1, questionTypeBadge: 'Különbség változása', figure: <DiffRowsFig names rows={[[345, 120, 225], [355, 120, '?']]} changes={[['+10', null, '?']]} />, question: 'A kisebbítendő 10-zel nőtt. Mennyi az új különbség?', options: ['235', '215', '225', '245'], explanation: 'Ha a kisebbítendő nő, a különbség is ugyanannyival nő: 225 + 10 = 235.' }),
  q({ id: 'wsube-q15', level: 1, questionTypeBadge: 'Különbség változása', figure: <DiffRowsFig names rows={[[480, 150, 330], [480, 250, '?']]} changes={[[null, '+100', '?']]} />, question: 'A kivonandó 100-zal nőtt. Mennyi az új különbség?', options: ['230', '430', '330', '220'], explanation: 'Többet veszünk el, kevesebb marad. A különbség 100-zal csökken: 330 − 100 = 230.' }),
  q({ id: 'wsube-q16', level: 1, questionTypeBadge: 'Különbség változása', figure: <DiffRowsFig names rows={[[263, 141, 122], [273, 151, '?']]} changes={[['+10', '+10', '?']]} />, question: 'Mindkét szám 10-zel nőtt. Hogyan változik a különbség?', options: ['nem változik', '20-szal nő', '10-zel nő', '10-zel csökken'], explanation: 'Ha mindkét szám ugyanannyival nő, a különbség nem változik: 273 − 151 = 122.' }),
  q({ id: 'wsube-q17', level: 1, questionTypeBadge: 'Hiányzó szám', figure: <PartsFig total="300" parts={[{ v: 120, text: '120' }, { v: 180, text: '?' }]} />, question: '300 − □ = 120. Melyik szám a □?', options: ['180', '420', '280', '220'], explanation: 'A 300 két részből áll: 120 és □. □ = 300 − 120 = 180. Ellenőrzés: 300 − 180 = 120.' }),
  q({ id: 'wsube-q18', level: 1, questionTypeBadge: 'Különbség', question: 'Mennyi a 420 és a 180 különbsége?', options: ['240', '260', '340', '140'], explanation: 'Különbség: a nagyobbikból kivonjuk a kisebbiket. 420 − 180 = 240.' }),
  q({ id: 'wsube-q19', level: 1, questionTypeBadge: 'Hiányzó számjegy', figure: <ColFig minuend={458} subtrahend={236} result="2?2" />, question: 'Melyik számjegy kerül a ? helyére?', options: ['2', '8', '3', '1'], explanation: 'A tízeseknél: 3-hoz 2, az 5. Az eredmény 222.' }),
  q({ id: 'wsube-q20', level: 1, questionTypeBadge: 'Táblázat', figure: <DataTableFig head="gyerekek" cols={[{ name: 'úszás', v: 340 }, { name: 'foci', v: 220 }, { name: 'tánc', v: 180 }]} />, question: 'Mennyivel többen szeretik az úszást, mint a focit?', options: ['120', '160', '220', '100'], explanation: 'Mennyivel több? Kivonással: 340 − 220 = 120.' }),
  q({ id: 'wsube-q21', level: 1, questionTypeBadge: 'Sorozat', figure: <ChainFig values={[480, 430, 380, '?']} ops={['−50', '−50', '?']} />, question: 'Folytasd a sort! Melyik szám jön?', options: ['330', '340', '280', '430'], explanation: 'Mindig 50-et veszünk el: 380 − 50 = 330.' }),
  q({ id: 'wsube-q22', level: 1, questionTypeBadge: 'Különbség-piramis', figure: <PyramidFig rows={[[350, 120], ['?']]} />, question: 'Az alsó dobozba a fölötte lévő két szám különbsége kerül. Mi kerül oda?', options: ['230', '470', '220', '130'], explanation: '350 − 120 = 230. (A 470 az összegük lenne.)' }),
  q({ id: 'wsube-q23', level: 1, questionTypeBadge: 'Pénz', figure: <CoinsFig coins={[200, 100, 100, 50, 20, 10]} crossed={[1, 4]} />, question: 'Kivesszük az áthúzott érméket. Mennyi pénz marad?', options: ['360 Ft', '120 Ft', '340 Ft', '380 Ft'], explanation: 'Összesen 480 Ft volt. Kivettünk 100 + 20 = 120 Ft-ot. 480 − 120 = 360 Ft.' }),
  q({ id: 'wsube-q24', level: 1, questionTypeBadge: 'Igaz vagy hamis?', question: 'Melyik igaz?', options: ['436 − 216 = 220', '436 − 216 = 210', '436 − 216 = 230', '436 − 216 = 320'], explanation: 'Egyesek: 6-hoz 0, az 6. Tízesek: 1-hez 2, az 3. Százasok: 2-höz 2, az 4. Tehát 220.' }),
  q({ id: 'wsube-q25', level: 1, questionTypeBadge: 'Fogalmak', question: 'A 425 − 213 = 212 kivonásban mi a 213 neve?', options: ['kivonandó', 'kisebbítendő', 'különbség', 'tag'], explanation: 'kisebbítendő − kivonandó = különbség. A 213-at vonjuk ki, ez a kivonandó.' }),
  q({ id: 'wsube-q26', level: 1, questionTypeBadge: 'Maradék', figure: <ColFig minuend={427} subtrahend={153} result="???" />, question: 'Számold ki írásban! 427 − 153 = ?', options: ['274', '374', '334', '264'], explanation: 'Egyesek: 3-hoz 4, az 7. Tízesek: a 2 kisebb, mint az 5, ezért 12-ig pótolok: 5-höz 7, az 12, maradt 1. Százasok: 1 meg 1 az 2, 2-höz 2, az 4. Az eredmény 274.' }),
  q({ id: 'wsube-q27', level: 1, questionTypeBadge: 'Becslés', figure: <TagsFig have={500} prices={[290]} />, question: 'Kb. mennyi pénzed marad, ha 500 Ft-ból veszel egy 290 Ft-os labdát?', options: ['kb. 200 Ft', 'kb. 300 Ft', 'kb. 100 Ft', 'kb. 250 Ft'], explanation: '290 ≈ 300. 500 − 300 = 200. Kb. 200 Ft marad (pontosan 210 Ft).' }),
  q({ id: 'wsube-q28', level: 1, questionTypeBadge: 'Kevesebb', question: 'Hétfőn 430 mozijegyet adtak el, kedden 120-szal kevesebbet. Hány jegyet adtak el kedden?', options: ['310', '320', '210', '300'], explanation: '„120-szal kevesebb”: 430 − 120 = 310.' }),
  q({ id: 'wsube-q29', level: 1, questionTypeBadge: 'Életkor', figure: <AgeFig laterTitle="10 év múlva" rows={[{ name: 'Áron', now: 12, later: 22 }, { name: 'Vilma', now: 5, later: 15 }]} />, question: 'Áron 7 évvel idősebb Vilmánál. Hány évvel lesz idősebb 10 év múlva?', options: ['7 évvel', '17 évvel', '10 évvel', '3 évvel'], explanation: 'Mindketten 10 évvel lesznek idősebbek. A korkülönbség nem változik: 22 − 15 = 7.' }),
  q({ id: 'wsube-q30', level: 1, questionTypeBadge: 'Okos kivonás', figure: <CleverFig m={345} s={199} k={1} />, question: 'Számolj okosan! 345 − 199 = ?', options: ['146', '144', '156', '246'], explanation: 'Mindkét számhoz 1-et adok: 346 − 200 = 146. A különbség nem változik.' })
];

// ---------------------------------------------------------------------------
// 2. szint – egy lépés, nehezebb számokkal, képről
// ---------------------------------------------------------------------------
const L2: QuizQuestion[] = [
  q({ id: 'wsube-q31', level: 2, questionTypeBadge: 'Kétszer maradt 1', figure: <ColFig minuend={423} subtrahend={167} result="???" />, question: 'Számold ki írásban! 423 − 167 = ?', options: ['256', '344', '366', '266'], explanation: 'Egyesek: 7-hez 6, az 13, maradt 1. Tízesek: 6 meg 1 az 7, 7-hez 5, az 12, maradt 1. Százasok: 1 meg 1 az 2, 2-höz 2, az 4. Az eredmény 256.' }),
  q({ id: 'wsube-q32', level: 2, questionTypeBadge: '0 a tízeseknél', figure: <ColFig minuend={405} subtrahend={248} result="???" />, question: 'Számold ki írásban! 405 − 248 = ?', options: ['157', '243', '167', '257'], explanation: 'Egyesek: 8-hoz 7, az 15, maradt 1. Tízesek: 4 meg 1 az 5, 5-höz 5, az 10, maradt 1. Százasok: 2 meg 1 az 3, 3-hoz 1, az 4. Az eredmény 157.' }),
  q({ id: 'wsube-q33', level: 2, questionTypeBadge: '0 a tízeseknél', figure: <ColFig minuend={300} subtrahend={136} result="???" />, question: 'Számold ki írásban! 300 − 136 = ?', options: ['164', '236', '174', '264'], explanation: 'Egyesek: 6-hoz 4, az 10, maradt 1. Tízesek: 3 meg 1 az 4, 4-hez 6, az 10, maradt 1. Százasok: 1 meg 1 az 2, 2-höz 1, az 3. Az eredmény 164.' }),
  q({ id: 'wsube-q34', level: 2, questionTypeBadge: 'Hiányzó számjegy', figure: <ColFig minuend="4?6" subtrahend={231} result={245} />, question: 'Melyik számjegy hiányzik a kisebbítendőből?', options: ['7', '5', '6', '8'], explanation: 'A tízeseknél: 3-hoz 4, az ?. Tehát ? = 7. Ellenőrzés: 476 − 231 = 245.' }),
  q({ id: 'wsube-q35', level: 2, questionTypeBadge: 'Hiányzó számjegy', figure: <ColFig minuend={482} subtrahend="2?5" result={237} />, question: 'Melyik számjegy hiányzik a kivonandóból?', options: ['4', '5', '3', '6'], explanation: 'Egyesek: 5-höz 7, az 12, maradt 1. Tízesek: ? meg 1, ehhez 3 kell, hogy 8 legyen. ? meg 1 az 5, tehát ? = 4. Ellenőrzés: 482 − 245 = 237.' }),
  q({ id: 'wsube-q36', level: 2, questionTypeBadge: 'Hiányzó szám', figure: <PartsFig total="?" parts={[{ v: 145, text: '145' }, { v: 230, text: '230' }]} />, question: '□ − 145 = 230. Melyik szám a □?', options: ['375', '85', '365', '385'], explanation: 'A kisebbítendő az egész: 145 + 230 = 375. Ellenőrzés: 375 − 145 = 230.' }),
  q({ id: 'wsube-q37', level: 2, questionTypeBadge: 'Hiányzó szám', question: '410 − □ = 260. Melyik szám a □?', options: ['150', '250', '160', '140'], explanation: '□ = 410 − 260 = 150. Ellenőrzés: 410 − 150 = 260.' }),
  q({ id: 'wsube-q38', level: 2, questionTypeBadge: 'Becslés', figure: <EstFig a={463} b={288} step={10} />, question: 'Becsüld meg tízesre kerekítve: 463 − 288 ≈ ?', options: ['170', '180', '160', '200'], explanation: '463 ≈ 460, 288 ≈ 290. 460 − 290 = 170. (Pontosan: 175.)' }),
  q({ id: 'wsube-q39', level: 2, questionTypeBadge: 'Becslés', question: 'Noel kiszámolta: 384 − 197 = 287. Becsüld meg: jó lehet?', options: ['Nem, kb. 200 a jó eredmény.', 'Igen, jó.', 'Nem, kb. 300 a jó eredmény.', 'Nem, kb. 100 a jó eredmény.'], explanation: '384 ≈ 400, 197 ≈ 200, 400 − 200 = 200. A 287 messze van, ezért hibás. (Pontosan: 187.)' }),
  q({ id: 'wsube-q40', level: 2, questionTypeBadge: 'Ellenőrzés', figure: <ColFig op="+" minuend={218} subtrahend={147} result={365} />, question: 'Lenke ezzel az összeadással ellenőrzött. Melyik kivonást ellenőrizte?', options: ['365 − 147 = 218', '365 − 218 = 157', '218 − 147 = 71', '365 − 147 = 228'], explanation: 'Különbség + kivonandó = kisebbítendő. 218 + 147 = 365, tehát a kivonás: 365 − 147 = 218.' }),
  q({ id: 'wsube-q41', level: 2, questionTypeBadge: '„Több, mint”', question: 'A könyvtárban 312 mesekönyv van. Ez 145-tel több, mint az állatos könyvek száma. Hány állatos könyv van?', options: ['167', '457', '177', '233'], explanation: 'A mesekönyv több, tehát az állatos könyv kevesebb: 312 − 145 = 167. Vigyázz: itt a „több” szó ellenére kivonunk!' }),
  q({ id: 'wsube-q42', level: 2, questionTypeBadge: 'Kevesebb', question: 'A piros csapat 286 pontot szerzett, a kék csapat 158-cal kevesebbet. Hány pontot szerzett a kék csapat?', options: ['128', '444', '138', '228'], explanation: '286 − 158: 8-hoz 8, az 16, maradt 1. 5 meg 1 az 6, 6-hoz 2, az 8. 1-hez 1, az 2. 128 pont.' }),
  q({ id: 'wsube-q43', level: 2, questionTypeBadge: 'Mennyivel több?', figure: <BarsFig rows={[{ name: '1. fa', v: 346 }, { name: '2. fa', v: 179 }]} />, question: 'Az egyik fán 346, a másikon 179 alma van. Mennyivel több alma van az első fán?', options: ['167', '233', '177', '267'], explanation: '346 − 179 = 167. Ellenőrzés: 167 + 179 = 346.' }),
  q({ id: 'wsube-q44', level: 2, questionTypeBadge: 'Táblázat', figure: <DataTableFig head="gyerekek" cols={[{ name: 'kosár', v: 284 }, { name: 'foci', v: 417 }, { name: 'tenisz', v: 139 }]} />, question: 'Mennyivel többen szeretik a focit, mint a kosárlabdát?', options: ['133', '143', '233', '123'], explanation: '417 − 284: 4-hez 3, az 7. 8-hoz 3, az 11, maradt 1. 2 meg 1 az 3, 3-hoz 1, az 4. 133-mal többen.' }),
  q({ id: 'wsube-q45', level: 2, questionTypeBadge: 'Különbség-piramis', figure: <PyramidFig rows={[[450, 280, 130], ['', ''], ['?']]} />, question: 'Minden dobozba a fölötte lévő két szám különbsége kerül. Mi kerül a ? helyére?', options: ['20', '320', '30', '40'], explanation: 'Középső sor: 450 − 280 = 170 és 280 − 130 = 150. Alul: 170 − 150 = 20.' }),
  q({ id: 'wsube-q46', level: 2, questionTypeBadge: 'Számpárok', figure: <CardsFig cards={[312, 145, 230, 85, 398]} />, question: 'Melyik két kártya különbsége 167?', options: ['312 és 145', '398 és 230', '230 és 85', '398 és 312'], explanation: '312 − 145 = 167. (398 − 230 = 168, 230 − 85 = 145, 398 − 312 = 86.)' }),
  q({ id: 'wsube-q47', level: 2, questionTypeBadge: 'Számkártyák', figure: <CardsFig big cards={[2, 3, 4]} />, question: 'Rakd ki a legnagyobb és a legkisebb háromjegyű számot ezekből a kártyákból! Mennyi a különbségük?', options: ['198', '200', '98', '188'], explanation: 'A legnagyobb: 432, a legkisebb: 234. 432 − 234 = 198.' }),
  q({ id: 'wsube-q48', level: 2, questionTypeBadge: 'Összehasonlítás', figure: <CompareFig l={[365, 148]} r={[365, 158]} />, question: 'Melyik különbség a nagyobb, és mennyivel?', options: ['Az első, 10-zel', 'A második, 10-zel', 'Egyenlők.', 'Az első, 20-szal'], explanation: 'A kisebbítendő ugyanaz. A másodiknál 10-zel többet veszünk el, ott 10-zel kevesebb marad. 217 > 207.' }),
  q({ id: 'wsube-q49', level: 2, questionTypeBadge: 'Különbség változása', figure: <DiffRowsFig names rows={[[372, 145, 227], [382, 135, '?']]} changes={[['+10', '−10', '?']]} />, question: 'Mennyi az új különbség?', options: ['247', '227', '237', '207'], explanation: 'A kisebbítendő +10: a különbség 10-zel nő. A kivonandó −10: még 10-zel nő. Együtt 20-szal: 227 + 20 = 247.' }),
  q({ id: 'wsube-q50', level: 2, questionTypeBadge: 'Állandó különbség', figure: <DiffTableFig a={[260, 280, 300, '?']} b={[110, 130, 150, 170]} s={[150, 150, 150, 150]} />, question: 'A különbség mindig 150. Mi kerül a ? helyére?', options: ['320', '300', '340', '170'], explanation: 'A kivonandó 170, a különbség 150. A kisebbítendő: 170 + 150 = 320. (Mindkét sor mindig 20-szal nő.)' }),
  q({ id: 'wsube-q51', level: 2, questionTypeBadge: 'Pénz', figure: <CoinsFig coins={[100, 100, 100, 50, 50, 20, 10, 5]} crossed={[0, 3, 5]} />, question: 'Kivesszük az áthúzott érméket. Mennyi pénz marad?', options: ['265 Ft', '170 Ft', '275 Ft', '255 Ft'], explanation: 'Összesen 435 Ft volt. Kivettünk 100 + 50 + 20 = 170 Ft-ot. 435 − 170 = 265 Ft.' }),
  q({ id: 'wsube-q52', level: 2, questionTypeBadge: 'Vásárlás', figure: <TagsFig have={500} prices={[345, 315, 285]} />, question: '500 Ft-od van. Melyiket veheted meg, hogy legalább 200 Ft-od maradjon?', options: ['a 285 Ft-osat', 'a 315 Ft-osat', 'a 345 Ft-osat', 'egyiket sem'], explanation: '500 − 285 = 215, ez több, mint 200. A többinél kevesebb marad: 500 − 315 = 185, 500 − 345 = 155.' }),
  q({ id: 'wsube-q53', level: 2, questionTypeBadge: 'Hibakeresés', question: 'Melyik kivonás hibás?', options: ['342 − 128 = 224', '451 − 236 = 215', '370 − 145 = 225', '283 − 167 = 116'], explanation: '342 − 128 = 214 a jó. Aki 224-et írt, elfelejtette a maradékot a tízeseknél (2 meg 1 az 3). Ellenőrizz összeadással: 214 + 128 = 342.' }),
  q({ id: 'wsube-q54', level: 2, questionTypeBadge: 'Sorozat', figure: <ChainFig values={[460, 390, 410, 340, 360, '?']} ops={['−70', '+20', '−70', '+20', '?']} />, question: 'Folytasd a sort! Melyik szám jön?', options: ['290', '380', '270', '300'], explanation: 'A szabály: −70, +20, −70, +20, … Most −70 jön: 360 − 70 = 290.' }),
  q({ id: 'wsube-q55', level: 2, questionTypeBadge: 'Pótlás', figure: <ColFig minuend={352} subtrahend={127} highlight={0} />, question: '352 − 127: az egyeseknél a 2 kisebb, mint a 7. Mit mondasz?', options: ['7-hez 5, az 12. Maradt 1.', '2-höz 5, az 7.', '7-hez 5, az 12. Nem marad semmi.', '7-hez 2, az 9.'], explanation: 'A 2 kisebb, mint a 7, ezért 12-ig pótolunk: 7-hez 5, az 12. Leírom az 5-öt, és maradt 1.' }),
  q({ id: 'wsube-q56', level: 2, questionTypeBadge: 'Maradék', figure: <ColFig minuend={352} subtrahend={127} result="  5" carries={[null, 1]} highlight={1} />, question: 'Az egyeseknél maradt 1. Mit mondasz a tízeseknél?', options: ['2 meg 1 az 3. 3-hoz 2, az 5.', '2-höz 3, az 5.', '2 meg 1 az 3. 3-hoz 3, az 6.', '5 meg 1 az 6. 6-hoz 2, az 8.'], explanation: 'A maradékot a kivonandó jegyéhez adjuk: 2 meg 1 az 3. Aztán pótolunk: 3-hoz 2, az 5. Leírom a 2-t.' }),
  q({ id: 'wsube-q57', level: 2, questionTypeBadge: 'Különbség változása', question: 'Bálintnak 340 Ft-ja, Csillának 410 Ft-ja van. Mindketten vesznek egy 215 Ft-os könyvet. Kinek marad több pénze, és mennyivel?', options: ['Csillának, 70 Ft-tal', 'Bálintnak, 70 Ft-tal', 'Ugyanannyi marad.', 'Csillának, 125 Ft-tal'], explanation: 'Mindketten ugyanannyit költenek, ezért a különbség marad: 410 − 340 = 70. (Bálintnak 125 Ft, Csillának 195 Ft marad.)' }),
  q({ id: 'wsube-q58', level: 2, questionTypeBadge: 'Legnagyobb különbség', question: 'Melyik kivonás eredménye a legnagyobb?', options: ['462 − 175', '431 − 269', '385 − 196', '350 − 87'], explanation: '462 − 175 = 287, 431 − 269 = 162, 385 − 196 = 189, 350 − 87 = 263. A legnagyobb: 287.' }),
  q({ id: 'wsube-q59', level: 2, questionTypeBadge: 'Okos kivonás', figure: <CleverFig m={432} s={98} k={2} />, question: 'Számolj okosan! 432 − 98 = ?', options: ['334', '330', '344', '336'], explanation: 'Mindkét számhoz 2-t adok: 434 − 100 = 334.' }),
  q({ id: 'wsube-q60', level: 2, questionTypeBadge: 'Maradék', figure: <ColFig minuend={415} subtrahend={238} />, question: 'Hányszor marad 1 a 415 − 238 kivonásban?', options: ['kétszer', 'egyszer', 'egyszer sem', 'háromszor'], explanation: '8-hoz 7, az 15, maradt 1. 3 meg 1 az 4, 4-hez 7, az 11, maradt 1. 2 meg 1 az 3, 3-hoz 1, az 4. Kétszer maradt 1. (Eredmény: 177.)' })
];

// ---------------------------------------------------------------------------
// 3. szint – legfeljebb két lépés
// ---------------------------------------------------------------------------
const L3: QuizQuestion[] = [
  q({ id: 'wsube-q61', level: 3, questionTypeBadge: 'Szöveges feladat', question: 'A tornateremben 480 szék van. 315-ön már ülnek, aztán még 120 gyerek érkezik és leül. Hány szék marad üresen?', options: ['45', '165', '285', '55'], explanation: 'Először: 480 − 315 = 165 üres szék. Aztán 120 gyerek leül: 165 − 120 = 45.' }),
  q({ id: 'wsube-q62', level: 3, questionTypeBadge: 'Vásárlás', figure: <TagsFig have={500} prices={[185, 140]} />, question: 'Áronnak 500 Ft-ja van. Vesz egy 185 Ft-os füzetet és egy 140 Ft-os ceruzát. Mennyi pénze marad?', options: ['175 Ft', '315 Ft', '455 Ft', '185 Ft'], explanation: '500 − 185 = 315. 315 − 140 = 175. 175 Ft marad.' }),
  q({ id: 'wsube-q63', level: 3, questionTypeBadge: '„Több, mint”', question: 'A bábelőadásra 213 gyerekjegyet adtak el. Ez 87-tel több, mint a felnőttjegyek száma. Hány jegyet adtak el összesen?', options: ['339', '300', '126', '349'], explanation: 'Felnőttjegy: 213 − 87 = 126. Összesen: 213 + 126 = 339.' }),
  q({ id: 'wsube-q64', level: 3, questionTypeBadge: 'Különbség-piramis', figure: <PyramidFig rows={[[480, 250, 120], ['', ''], ['?']]} />, question: 'Minden dobozba a fölötte lévő két szám különbsége kerül. Mi kerül a ? helyére?', options: ['100', '360', '110', '200'], explanation: 'Középső sor: 480 − 250 = 230 és 250 − 120 = 130. Alul: 230 − 130 = 100.' }),
  q({ id: 'wsube-q65', level: 3, questionTypeBadge: 'Hiányzó számjegy', figure: <ColFig minuend={432} subtrahend="1?6" result={256} />, question: 'Melyik számjegy hiányzik a kivonandóból?', options: ['7', '8', '6', '3'], explanation: 'Egyesek: 6-hoz 6, az 12, maradt 1. Tízesek: ? meg 1, ehhez 5 kell, hogy 13 legyen. ? meg 1 az 8, tehát ? = 7. Ellenőrzés: 432 − 176 = 256.' }),
  q({ id: 'wsube-q66', level: 3, questionTypeBadge: 'Nyitott mondat', question: 'Melyik szám teszi igazzá mindkettőt? □ − 150 > 230 és □ < 500 − 118', options: ['381', '380', '382', '383'], explanation: '□ − 150 > 230, tehát □ nagyobb, mint 380. 500 − 118 = 382, tehát □ kisebb, mint 382. Csak a 381 jó.' }),
  q({ id: 'wsube-q67', level: 3, questionTypeBadge: 'Számpárok', figure: <CardsFig cards={[410, 235, 188, 63, 354]} />, question: 'Melyik két kártya különbsége 125-tel kisebb, mint 300?', options: ['410 és 235', '354 és 188', '235 és 63', '188 és 63'], explanation: '300 − 125 = 175. 410 − 235 = 175. (354 − 188 = 166, 235 − 63 = 172, 188 − 63 = 125.)' }),
  q({ id: 'wsube-q68', level: 3, questionTypeBadge: 'Sorozat', figure: <ChainFig values={[470, 395, 415, 340, 360, '?']} ops={['?', '?', '?', '?', '?']} />, question: 'Találd ki a szabályt, és folytasd a sort! Melyik szám jön?', options: ['285', '380', '265', '295'], explanation: 'A szabály: −75, +20, −75, +20, … Most −75 jön: 360 − 75 = 285.' }),
  q({ id: 'wsube-q69', level: 3, questionTypeBadge: 'Különbség változása', question: '386 − 147 = 239. Mennyi a 396 − 137?', options: ['259', '239', '249', '219'], explanation: 'A kisebbítendő 10-zel nagyobb (a különbség +10), a kivonandó 10-zel kisebb (a különbség még +10). 239 + 20 = 259.' }),
  q({ id: 'wsube-q70', level: 3, questionTypeBadge: 'Életkor', figure: <AgeFig laterTitle="később" rows={[{ name: 'nagymama', now: 63, later: '?' }, { name: 'Vilma', now: 9, later: 20 }]} />, question: 'Vilma 9 éves, a nagymamája 63. Hány éves lesz a nagymama, amikor Vilma 20 éves lesz?', options: ['74', '83', '63', '72'], explanation: 'A korkülönbség: 63 − 9 = 54 év, és ez nem változik. 20 + 54 = 74.' }),
  q({ id: 'wsube-q71', level: 3, questionTypeBadge: 'Becslés', figure: <TagsFig prices={[312, 177]} />, question: 'Kb. mennyivel drágább a 312 Ft-os játék a 177 Ft-osnál? Becsülj tízesre kerekítve!', options: ['130 Ft-tal', '135 Ft-tal', '100 Ft-tal', '140 Ft-tal'], explanation: '312 ≈ 310, 177 ≈ 180. 310 − 180 = 130. (Pontosan 135, de most becsülni kellett.)' }),
  q({ id: 'wsube-q72', level: 3, questionTypeBadge: 'Hibakeresés', figure: <ColFig minuend={405} subtrahend={168} result={347} />, question: 'Teo így számolt. Hol hibázott?', options: ['Elfelejtette a maradékot a tízeseknél és a százasoknál.', 'Csak az egyeseknél hibázott.', 'Fordítva számolt az egyeseknél.', 'Nem hibázott.'], explanation: 'Egyesek: 8-hoz 7, az 15, maradt 1 – ez jó. Tízesek: 6 meg 1 az 7, 7-hez 3, az 10, maradt 1. Százasok: 1 meg 1 az 2, 2-höz 2, az 4. A jó eredmény 237.' }),
  q({ id: 'wsube-q73', level: 3, questionTypeBadge: 'Szöveges feladat', question: 'Egy könyv 450 oldalas. Noel hétfőn 128, kedden 135 oldalt olvasott el. Hány oldal van még hátra?', options: ['187', '322', '315', '197'], explanation: '450 − 128 = 322. 322 − 135 = 187 oldal van hátra.' }),
  q({ id: 'wsube-q74', level: 3, questionTypeBadge: 'Mennyivel több?', figure: <BarsFig rows={[{ name: 'Lenke', v: 296 }, { name: 'Bálint', v: 158 }, { name: 'Csilla', v: 341 }]} />, question: 'Ugrókötelezés: hányat ugrottak? Mennyivel ugrott többet a győztes, mint a harmadik helyezett?', options: ['183', '45', '138', '193'], explanation: 'A győztes Csilla (341), a harmadik Bálint (158). 341 − 158 = 183.' }),
  q({ id: 'wsube-q75', level: 3, questionTypeBadge: 'Ugyanannyi', question: 'Melyik kivonásnak ugyanannyi a különbsége, mint a 453 − 287-nek?', options: ['456 − 290', '450 − 290', '453 − 290', '456 − 284'], explanation: 'Mindkét számhoz 3-at adtunk. Ugyanannyival, ugyanarra: a különbség marad 166.' }),
  q({ id: 'wsube-q76', level: 3, questionTypeBadge: 'Táblázat', figure: <DiffTableFig a={[350, 410, 420]} b={[140, '?', 160]} s={[210, 185, 260]} />, question: 'Mi kerül a ? helyére?', options: ['225', '235', '215', '185'], explanation: '410 − □ = 185, tehát □ = 410 − 185 = 225. Ellenőrzés: 410 − 225 = 185.' }),
  q({ id: 'wsube-q77', level: 3, questionTypeBadge: 'Vásárlás', figure: <CoinsFig coins={[200, 200, 50, 20, 10]} caption="Vesz: 135 Ft-os és 90 Ft-os ajándékot." />, question: 'Ennyi pénze van Jázminnak. Mennyi marad a két ajándék után?', options: ['255 Ft', '345 Ft', '225 Ft', '265 Ft'], explanation: 'Jázminnak 480 Ft-ja van. 480 − 135 = 345. 345 − 90 = 255 Ft.' }),
  q({ id: 'wsube-q78', level: 3, questionTypeBadge: 'Hiányzó szám', question: 'Melyik számot kell a 238-ból kivonni, hogy 25-tel több maradjon, mint 100?', options: ['113', '138', '13', '163'], explanation: '25-tel több, mint 100: 125. 238 − □ = 125, □ = 238 − 125 = 113.' }),
  q({ id: 'wsube-q79', level: 3, questionTypeBadge: 'Különbség változása', question: 'Két kosárban 415 és 268 dió van. Mindkettőből 50-et megesztek. Mennyivel több dió maradt az elsőben?', options: ['147', '97', '197', '47'], explanation: 'Mindkettőből ugyanannyi fogyott, a különbség nem változik: 415 − 268 = 147.' }),
  q({ id: 'wsube-q80', level: 3, questionTypeBadge: 'Két lépés', question: 'Melyik szám 100-zal kisebb, mint a 476 és a 189 különbsége?', options: ['187', '387', '287', '197'], explanation: '476 − 189 = 287. 100-zal kisebb: 287 − 100 = 187.' }),
  q({ id: 'wsube-q81', level: 3, questionTypeBadge: 'Szakaszos ábra', figure: <PartsFig total="420" parts={[{ v: 135, text: '135' }, { v: 160, text: '160' }, { v: 125, text: '?' }]} />, question: 'A 420 három részből áll. Mekkora a harmadik rész?', options: ['125', '285', '260', '135'], explanation: '420 − 135 = 285. 285 − 160 = 125.' }),
  q({ id: 'wsube-q82', level: 3, questionTypeBadge: 'Összehasonlítás', figure: <CompareFig l={[412, 198]} r={[422, 188]} />, question: 'Melyik különbség a nagyobb, és mennyivel?', options: ['A második, 20-szal', 'Egyenlők.', 'A második, 10-zel', 'Az első, 20-szal'], explanation: 'A második kivonásban a kisebbítendő +10, a kivonandó −10. Mindkettő növeli a különbséget: 20-szal nagyobb. 234 > 214.' }),
  q({ id: 'wsube-q83', level: 3, questionTypeBadge: 'Szöveges feladat', question: 'A vonaton 486 utas ült. Az állomáson 145-en leszálltak, 78-an felszálltak. Hányan utaznak tovább?', options: ['419', '263', '341', '409'], explanation: 'Leszálltak: 486 − 145 = 341. Felszálltak: 341 + 78 = 419.' }),
  q({ id: 'wsube-q84', level: 3, questionTypeBadge: 'Kevesebb', question: 'A piros polcon 238 könyv van, a kéken 76-tal kevesebb. Hány könyv van a két polcon összesen?', options: ['400', '314', '162', '390'], explanation: 'A kéken: 238 − 76 = 162. Összesen: 238 + 162 = 400.' }),
  q({ id: 'wsube-q85', level: 3, questionTypeBadge: 'Hiányzó szám', figure: <ColFig minuend="???" subtrahend={245} result={168} />, question: 'Egy kivonásban a kivonandó 245, a különbség 168. Mennyi a kisebbítendő?', options: ['413', '77', '403', '423'], explanation: 'Különbség + kivonandó = kisebbítendő: 168 + 245 = 413. Ellenőrzés: 413 − 245 = 168.' }),
  q({ id: 'wsube-q86', level: 3, questionTypeBadge: 'Becslés', question: 'Becsülj százasra kerekítve! Melyik kivonás eredménye kb. 200?', options: ['487 − 312', '462 − 158', '349 − 251', '438 − 342'], explanation: '487 − 312 ≈ 500 − 300 = 200. A többi: 500 − 200 = 300, 300 − 300 = 0, 400 − 300 = 100.' }),
  q({ id: 'wsube-q87', level: 3, questionTypeBadge: 'Különbség-piramis', figure: <PyramidFig rows={[['?', 260, 140], ['', ''], [30]]} />, question: 'Minden dobozba a fölötte lévő két szám különbsége kerül. Melyik szám van a ? helyén?', options: ['410', '110', '390', '150'], explanation: 'Középen jobbra: 260 − 140 = 120. Bal oldalt: □ − 120 = 30, tehát 150. Fent: ? − 260 = 150, tehát ? = 410.' }),
  q({ id: 'wsube-q88', level: 3, questionTypeBadge: 'Szakaszos ábra', figure: <PartsFig total="450 m" parts={[{ v: 287, text: '287 m' }, { v: 95, text: '95 m' }, { v: 68, text: '?' }]} />, question: 'Jázmin 450 m-t akar futni. Már lefutott 287 m-t, aztán még 95 m-t. Hány méter van még hátra?', options: ['68 m', '163 m', '258 m', '78 m'], explanation: '450 − 287 = 163. 163 − 95 = 68 m van hátra.' }),
  q({ id: 'wsube-q89', level: 3, questionTypeBadge: 'Különbség változása', question: 'Egy kivonásban a kivonandót 30-cal növeltük. Mennyivel növeljük a kisebbítendőt, hogy a különbség 10-zel nagyobb legyen?', options: ['40-nel', '20-szal', '10-zel', '30-cal'], explanation: 'A kivonandó +30 miatt a különbség 30-cal csökken. Ezt vissza kell hozni, és még 10 kell: 30 + 10 = 40.' }),
  q({ id: 'wsube-q90', level: 3, questionTypeBadge: 'Nyitott mondat', question: '500 − 245 = □ + 125. Melyik szám a □?', options: ['130', '380', '120', '255'], explanation: 'Bal oldal: 500 − 245 = 255. 255 = □ + 125, tehát □ = 255 − 125 = 130.' })
];

export const WRITTEN_SUB_EXAM_G3_QUESTIONS: QuizQuestion[] = [...L1, ...L2, ...L3];

export const WrittenSubExamG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="irasbeli-kivonas"
      topicId="g3-wsub-tudasproba-quiz"
      subtopicId="megallo"
      title="5. Megálló – tudáspróba – Kvíz"
      subtitle="90 feladat 3 szinten: kivonás fejben, becslés, írásbeli kivonás pótlással és maradékkal, ellenőrzés, hiányzó számok, szöveges feladatok, a különbség változásai."
      badge="3. OSZTÁLY • VIII. ÍRÁSBELI KIVONÁS • KVÍZ"
      questions={WRITTEN_SUB_EXAM_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Írásbeli kivonás',
          items: ['Egyesekkel kezdd, aztán tízesek, végül százasok!', 'Pótolj: 7-hez 5, az 12 – maradt 1.', 'A maradékot add a következő kivonandó-jegyhez: 6 meg 1 az 7.']
        },
        {
          title: 'Becslés, ellenőrzés',
          items: ['Százasra: 389 − 214 ≈ 400 − 200 = 200', 'Tízesre: 468 − 255 ≈ 470 − 260 = 210', 'Ellenőrzés: különbség + kivonandó = kisebbítendő']
        },
        {
          title: 'A különbség változásai',
          items: ['kisebbítendő +10 → különbség +10', 'kivonandó +10 → különbség −10', 'Mindkettő +10 → a különbség marad']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <WrittenSubExamG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <WrittenSubExamG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default WrittenSubExamG3Quiz;
