import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { MixedOps1000G3Matcher } from './MixedOps1000G3Matcher';
import { MixedOps1000G3Sorter } from './MixedOps1000G3Sorter';
import { TableFig, RouteFig, BarFig, RowsFig, TriangleFig, RectFig, CardsFig, CoinsFig, SeqFig, TrackFig } from './MixedOps1000G3Parts';
import { NoteFig } from '../muveleti-sorrend/OrderOps1000G3Parts';
import { WrittenAddG3Column } from '../../irasbeli-osszeadas/irasbeli-osszeadas/WrittenAddG3Column';

type Q = Omit<QuizQuestion, 'correctAnswer'>;
const q = (x: Q): QuizQuestion => ({ ...x, correctAnswer: 0 } as QuizQuestion);

const CAMP_HEAD = ['', 'Fiúk', 'Lányok'];
const CAMP = [
  ['Sporttábor', '186', '147'],
  ['Rajztábor', '128', '209']
];
const STREET = ['Otthon', 'Pékség', 'Iskola', 'Park'];
const STREET_D = [275, 348, 186];

// ---------------------------------------------------------------------------
// 1. szint – egy lépés
// ---------------------------------------------------------------------------
const L1: QuizQuestion[] = [
  q({ id: 'mo1000-q1', level: 1, questionTypeBadge: 'Táblázat', figure: <TableFig head={CAMP_HEAD} rows={CAMP} caption="nyári táborok" />, question: 'Hány gyerek van a sporttáborban?', options: ['333', '323', '343', '39'], explanation: 'A sporttábor sorát adjuk össze: 186 + 147 = 333. (A 39 a különbség lenne.)' }),
  q({ id: 'mo1000-q2', level: 1, questionTypeBadge: 'Táblázat', figure: <TableFig head={CAMP_HEAD} rows={CAMP} caption="nyári táborok" />, question: 'Hány lány van a két táborban összesen?', options: ['356', '346', '366', '62'], explanation: 'A „Lányok” oszlopot adjuk össze: 147 + 209 = 356.' }),
  q({ id: 'mo1000-q3', level: 1, questionTypeBadge: 'Útvonal', figure: <RouteFig places={STREET.slice(0, 3)} dists={STREET_D.slice(0, 2)} ask={[0, 2]} />, question: 'Milyen messze van otthonról az iskola?', options: ['623 m', '613 m', '73 m', '523 m'], explanation: 'Két szakaszt adunk össze: 275 + 348 = 623. Az iskola 623 m-re van.' }),
  q({ id: 'mo1000-q4', level: 1, questionTypeBadge: 'Hiányzó szám', figure: <BarFig whole="912" parts={[{ v: 526, text: '□' }, { v: 386, text: '386' }]} />, question: '□ + 386 = 912. Melyik szám a □?', options: ['526', '536', '626', '516'], explanation: 'Az egészből elvesszük az ismert részt: 912 − 386 = 526. Ellenőrzés: 526 + 386 = 912.' }),
  q({ id: 'mo1000-q5', level: 1, questionTypeBadge: 'Hiányzó szám', figure: <BarFig whole="803" parts={[{ v: 446, text: '□' }, { v: 357, text: '357' }]} />, question: '803 − □ = 357. Melyik szám a □?', options: ['446', '456', '546', '554'], explanation: '803-ból annyit veszünk el, hogy 357 maradjon: 803 − 357 = 446. Ellenőrzés: 803 − 446 = 357.' }),
  q({ id: 'mo1000-q6', level: 1, questionTypeBadge: 'Hiányzó szám', question: '□ − 462 = 237. Melyik szám a □?', options: ['699', '225', '689', '799'], explanation: 'A kisebbítendő hiányzik. Összeadással kapjuk meg: 237 + 462 = 699. (A 225 a 462 − 237 lenne.)' }),
  q({ id: 'mo1000-q7', level: 1, questionTypeBadge: 'Melyik számra gondoltam?', question: 'Melyik számra gondoltam? A 458 és a 367 összegére.', options: ['825', '815', '725', '91'], explanation: 'Összeg = összeadás: 458 + 367 = 825. Az egyeseknél 15, a tízeseknél 12: kétszer marad 1.' }),
  q({ id: 'mo1000-q8', level: 1, questionTypeBadge: 'Melyik számra gondoltam?', question: 'Melyik számra gondoltam? A 924 és az 586 különbségére.', options: ['338', '348', '462', '238'], explanation: 'Különbség = kivonás: 924 − 586 = 338. Pótolj! 6-hoz 8, az 14; 9-hez 3, az 12; 6-hoz 3, az 9. (A 462 akkor jön ki, ha mindig a nagyobb jegyből vonsz ki.)' }),
  q({ id: 'mo1000-q9', level: 1, questionTypeBadge: 'Sorozat', figure: <SeqFig items={['215', '348', '481', '?']} step="+133" />, question: 'Mindig 133-mal nő. Melyik szám jön a 481 után?', options: ['614', '604', '714', '624'], explanation: '481 + 133 = 614.' }),
  q({ id: 'mo1000-q10', level: 1, questionTypeBadge: 'Szöveges feladat', question: 'Egy vonat délelőtt 386 km-t megy, délután 297 km-t. Hány km-t megy összesen?', options: ['683 km', '673 km', '583 km', '89 km'], explanation: '386 + 297 = 683. Az egyeseknél 13, a tízeseknél 18: kétszer marad 1.' })
];

// ---------------------------------------------------------------------------
// 2. szint – képről olvasás, nagyobb számok
// ---------------------------------------------------------------------------
const L2: QuizQuestion[] = [
  q({ id: 'mo1000-q11', level: 2, questionTypeBadge: 'Táblázat', figure: <TableFig head={CAMP_HEAD} rows={CAMP} caption="nyári táborok" />, question: 'Hány gyerek van a két táborban összesen?', options: ['670', '660', '680', '570'], explanation: 'Sporttábor: 186 + 147 = 333. Rajztábor: 128 + 209 = 337. Összesen: 333 + 337 = 670.' }),
  q({ id: 'mo1000-q12', level: 2, questionTypeBadge: 'Táblázat', figure: <TableFig head={CAMP_HEAD} rows={CAMP} caption="nyári táborok" />, question: 'Mennyivel több lány van a rajztáborban, mint fiú?', options: ['81', '91', '337', '121'], explanation: '209 − 128 = 81. (A 121 akkor jön ki, ha a tízeseknél 2 − 0-t számolsz 0 − 2 helyett.)' }),
  q({ id: 'mo1000-q13', level: 2, questionTypeBadge: 'Útvonal', figure: <RouteFig places={STREET} dists={STREET_D} ask={[1, 3]} />, question: 'Milyen messze van a pékség a parktól?', options: ['534 m', '524 m', '809 m', '162 m'], explanation: 'A pékségtől a parkig két szakasz van: 348 + 186 = 534 m. (A 809 m az egész utca.)' }),
  q({ id: 'mo1000-q14', level: 2, questionTypeBadge: 'Útvonal', figure: <RouteFig places={STREET.slice(0, 3)} dists={STREET_D.slice(0, 2)} />, question: 'Mennyivel van messzebb otthonról az iskola, mint a pékség?', options: ['348 m', '623 m', '275 m', '73 m'], explanation: 'Az iskola pont a pékség–iskola szakasszal van messzebb: 348 m. Számolással is: 623 − 275 = 348.' }),
  q({ id: 'mo1000-q15', level: 2, questionTypeBadge: 'Nyitott mondat', question: 'Melyik szám igaz? 428 + 315 > □ > 985 − 250', options: ['740', '735', '743', '750'], explanation: '428 + 315 = 743 és 985 − 250 = 735. A □ 735-nél nagyobb és 743-nál kisebb: a 740 jó. (A 735 és a 743 nem, mert egyenlő nem lehet.)' }),
  q({ id: 'mo1000-q16', level: 2, questionTypeBadge: 'Bűvös háromszög', figure: <TriangleFig v={['', '', '', '248', '?', '365']} caption="egy oldalon a számok összege 1000" />, question: 'A háromszög alsó oldalán a három szám összege 1000. Melyik szám kerül a „?” helyére?', options: ['387', '397', '487', '613'], explanation: '248 + 365 = 613. 1000 − 613 = 387. Ellenőrzés: 248 + 387 + 365 = 1000.' }),
  q({ id: 'mo1000-q17', level: 2, questionTypeBadge: 'Számkártyák', figure: <CardsFig digits={['5', '0', '7', '2']} />, question: 'Melyik a legnagyobb háromjegyű szám ezekből a kártyákból? Minden kártyát legfeljebb egyszer használhatsz.', options: ['752', '750', '725', '572'], explanation: 'A legnagyobb jegy kerül a százasokhoz (7), aztán az 5, aztán a 2: 752.' }),
  q({ id: 'mo1000-q18', level: 2, questionTypeBadge: 'Gondoltam egy számot', question: 'Gondoltam egy számot. Hozzáadtam 275-öt, és 812 lett. Melyik számra gondoltam?', options: ['537', '547', '637', '527'], explanation: 'Visszafelé: kivonunk. 812 − 275 = 537. Ellenőrzés: 537 + 275 = 812.' }),
  q({ id: 'mo1000-q19', level: 2, questionTypeBadge: 'Pénz', figure: <CoinsFig coins={[200, 200, 200, 200, 100]} caption="ennyi pénzed van" />, question: 'Ennyi pénzed van. Veszel egy 645 Ft-os könyvet. Mennyi marad?', options: ['255 Ft', '265 Ft', '355 Ft', '245 Ft'], explanation: 'A pénzed: 4 · 200 + 100 = 900 Ft. 900 − 645 = 255 Ft.' }),
  q({ id: 'mo1000-q20', level: 2, questionTypeBadge: 'Hiányzó számjegy', figure: <WrittenAddG3Column addends={['4?7', 285]} result={762} className="w-full max-w-[150px] h-auto mx-auto" />, question: 'Melyik számjegy hiányzik? 4?7 + 285 = 762', options: ['7', '8', '6', '5'], explanation: '762 − 285 = 477, tehát a hiányzó jegy a 7. Ellenőrzés: 477 + 285 = 762.' })
];

// ---------------------------------------------------------------------------
// 3. szint – két lépés
// ---------------------------------------------------------------------------
const L3: QuizQuestion[] = [
  q({ id: 'mo1000-q21', level: 3, questionTypeBadge: 'Két lépés', figure: <RowsFig max={473} right="?" rows={[{ name: 'délelőtt', segs: [{ v: 345, text: '345' }] }, { name: 'délután', segs: [{ v: 345, text: '345' }, { v: 128, text: '+128' }] }]} />, question: 'A fagyizó délelőtt 345 gombócot adott el, délután 128-cal többet. Hány gombócot adott el egész nap?', options: ['818', '473', '808', '918'], explanation: '1. lépés: délután 345 + 128 = 473. 2. lépés: egész nap 345 + 473 = 818.' }),
  q({ id: 'mo1000-q22', level: 3, questionTypeBadge: 'Két lépés', figure: <RowsFig max={520} right="?" rows={[{ name: '1. doboz', segs: [{ v: 520, text: '520' }] }, { name: '2. doboz', segs: [{ v: 385, text: '?' }, { v: 135, text: '135', dashed: true }] }]} />, question: 'Az első dobozban 520 gyöngy van. Ez 135-tel több, mint a másodikban. Hány gyöngy van a két dobozban összesen?', options: ['905', '655', '385', '915'], explanation: 'A második dobozban kevesebb van: 520 − 135 = 385. Összesen: 520 + 385 = 905.' }),
  q({ id: 'mo1000-q23', level: 3, questionTypeBadge: 'Fordított művelet', figure: <NoteFig lines={['szám − 236 = 418', 'szám + 236 = ?']} mark="?" />, question: 'Bálint egy számhoz hozzá akarta adni a 236-ot, de kivonta. 418 lett. Mi lett volna a jó eredmény?', options: ['890', '654', '182', '880'], explanation: 'A szám: 418 + 236 = 654. A jó eredmény: 654 + 236 = 890.' }),
  q({ id: 'mo1000-q24', level: 3, questionTypeBadge: 'Útvonal', figure: <RouteFig places={STREET} dists={STREET_D} />, question: 'A pékségből elmész a parkba, aztán visszasétálsz az iskoláig. Hány métert sétálsz?', options: ['720 m', '534 m', '730 m', '348 m'], explanation: 'Pékség → park: 348 + 186 = 534 m. Park → iskola: 186 m. Összesen: 534 + 186 = 720 m.' }),
  q({ id: 'mo1000-q25', level: 3, questionTypeBadge: 'Táblázat', figure: <TableFig head={CAMP_HEAD} rows={CAMP} caption="nyári táborok" />, question: 'Mennyivel több lány van a két táborban, mint fiú?', options: ['42', '52', '356', '314'], explanation: 'Lányok: 147 + 209 = 356. Fiúk: 186 + 128 = 314. Különbség: 356 − 314 = 42.' }),
  q({ id: 'mo1000-q26', level: 3, questionTypeBadge: 'Bűvös téglalap', figure: <RectFig v={['384', '', '296', '', '418', '', '', '?']} caption="egy oldalon a számok összege 1000" />, question: 'A téglalap minden oldalán a három szám összege 1000. Melyik szám kerül a jobb alsó sarokba?', options: ['286', '296', '714', '386'], explanation: 'A jobb oldalon: 296 + 418 = 714. 1000 − 714 = 286. Ellenőrzés: 296 + 418 + 286 = 1000.' }),
  q({ id: 'mo1000-q27', level: 3, questionTypeBadge: 'Nyitott mondat', question: 'Melyik páros szám igaz? 517 + 268 < □ < 924 − 135', options: ['786', '785', '787', '790'], explanation: '517 + 268 = 785 és 924 − 135 = 789. A □ 785 és 789 között van, és páros: 786 (vagy 788). A 790 már nagyobb a 789-nél.' }),
  q({ id: 'mo1000-q28', level: 3, questionTypeBadge: 'Számkártyák', figure: <CardsFig digits={['5', '0', '7', '2']} />, question: 'Képezd a legnagyobb és a legkisebb háromjegyű számot! Mennyi a különbségük?', options: ['547', '557', '495', '527'], explanation: 'A legnagyobb: 752. A legkisebb: 205 (0 nem lehet elöl). 752 − 205 = 547.' }),
  q({ id: 'mo1000-q29', level: 3, questionTypeBadge: 'Távolság', figure: <TrackFig total={1000} marks={[{ name: 'Lili', at: 615, color: '#db2777' }, { name: 'Ádám', at: 478, color: '#2563eb' }]} />, question: 'Egy 1000 m-es versenyen Lili 615 m-t, Ádám 478 m-t tett meg. Mennyi út van még hátra kettejüknek együtt?', options: ['907 m', '137 m', '897 m', '522 m'], explanation: 'Lilinek: 1000 − 615 = 385 m. Ádámnak: 1000 − 478 = 522 m. Együtt: 385 + 522 = 907 m.' }),
  q({ id: 'mo1000-q30', level: 3, questionTypeBadge: 'Pénz', figure: <CoinsFig coins={[200, 200, 200, 200]} caption="a mozijegy 850 Ft" />, question: 'A mozijegy 850 Ft. Négy 200 Ft-osod van. Mennyi pénz hiányzik még?', options: ['50 Ft', '650 Ft', '150 Ft', '60 Ft'], explanation: 'A pénzed: 4 · 200 = 800 Ft. Hiányzik: 850 − 800 = 50 Ft.' })
];

export const MIXED_OPS_1000_G3_QUESTIONS: QuizQuestion[] = [...L1, ...L2, ...L3];

export const MixedOps1000G3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={3}
    chapterId="irasbeli-muveletek-1000-ig"
    topicId="g3-wops-vegyes-quiz"
    subtopicId="vegyes-muveletek-szoveges"
    title="4. Vegyes műveletek és szöveges feladatok – Kvíz"
    subtitle="30 feladat 3 szinten: táblázat, útvonal, hiányzó szám, nyitott mondat, kétlépéses szöveges feladatok."
    badge="3. OSZTÁLY • XII. ÍRÁSBELI MŰVELETEK 1000-IG • KVÍZ"
    questions={MIXED_OPS_1000_G3_QUESTIONS}
    cheatSheets={[
      { title: 'Hiányzó szám', items: ['□ + 386 = 912 → 912 − 386', '803 − □ = 357 → 803 − 357', '□ − 462 = 237 → 237 + 462', 'Mindig ellenőrizz!'] },
      { title: 'Szavak', items: ['összeg → összeadás', 'különbség → kivonás', '„mennyivel több?” → kivonás', '„128-cal több” → hozzáadunk'] },
      { title: 'A terv', items: ['Mit tudunk? Mit kérdeznek?', 'Rajzolj szalagot vagy térképet!', 'Becsülj, számolj írásban, ellenőrizz!', 'Írj választ!'] }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={<MixedOps1000G3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
    sorterComponent={<MixedOps1000G3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
  />
);

export default MixedOps1000G3Quiz;
