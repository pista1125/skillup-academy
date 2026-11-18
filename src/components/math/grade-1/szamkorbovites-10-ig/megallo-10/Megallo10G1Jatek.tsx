import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { BigSign, Domino, Hand, ICONS, NumberLine, TenFrame } from '../../shared/G1Pics';
import { Potyi } from '../../shared/Potyi';
import { CompareBoxes, CountBox, EqCard, HopLine, MiniBox, NumberHouse, TwoHands } from '../a-nyolc/ANyolcG1Scenes';
import { FeederScene, PairsScene, PotyiWingsScene, TwoRowsScene } from '../a-tiz/ATizG1Scenes';
import { MoreLessScene, TwoPilesScene } from '../szoveges-feladatok/SzovegesFeladatokG1Scenes';
import { QueueScene } from './Megallo10G1Scenes';

const sm = (node: React.ReactNode, say: string) => ({ figure: node, say });
const sign = (t: string, say: string) => sm(<BigSign text={t} />, say);
const dom = (l: number, r: number, say: string) => sm(<Domino left={l} right={r} />, say);
const domS = (l: number, r: number, say: string) => sm(<Domino left={l} right={r} className="w-24 h-auto" />, say);
const eq = (t: string) => <EqCard text={t} className="w-full max-w-[360px] h-auto mx-auto" />;
const big = 'w-full max-w-[340px] h-auto mx-auto';
const ICON_CSIGA = ICONS.csiga({ x: 30, y: 32, s: 1.2 });
const ICON_MEH = ICONS.meh({ x: 30, y: 32, s: 1.4 });

export const MEGALLO10_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – számlálás, számjegyek, kép és szám, egy lépés
  { id: 'm1', level: 1, badge: 'Számlálás', ask: 'Hány madár ül az etetőn?', scene: <FeederScene birds={8} />, options: [8, 7, 9], hint: 'Előbb a lentieket számold, aztán folytasd a tetőn!' },
  { id: 'm2', level: 1, badge: 'Számjegy', ask: 'Melyik a hetes?', options: [sign('7', 'hetes'), sign('1', 'egyes'), sign('4', 'négyes')], hint: 'A hetesnek fent egy vízszintes vonala van, onnan megy le ferdén.' },
  { id: 'm3', level: 1, badge: 'Ujjkép', ask: 'Hány ujj van fent?', scene: <TwoHands n={6} className="w-56 h-auto mx-auto" />, options: [6, 5, 7], hint: 'Az egyik kézen 5, a másikon még…? Számolj tovább!' },
  { id: 'm4', level: 1, badge: 'Dominó', ask: 'Hol van 9 pötty?', options: [dom(5, 4, 'kilenc pötty'), dom(4, 4, 'nyolc pötty'), dom(5, 5, 'tíz pötty')], hint: 'Számold meg mindkét felét! 5 és még 4.' },
  { id: 'm5', level: 1, badge: 'Pötyi pöttyei', ask: 'Hány pötty van Pötyi hátán?', scene: <Potyi dots={9} mood="happy" className="w-44 h-44 mx-auto" />, options: [9, 8, 10], hint: 'Az egyik szárnyán 5 van. Számolj tovább a másikon!' },
  { id: 'm6', level: 1, badge: 'Számegyenes', ask: 'Melyik szám kell a ? helyére?', say: 'Melyik szám kell a kérdőjel helyére a számegyenesen?', scene: <NumberLine max={10} question={8} />, options: [8, 7, 9], hint: 'Melyik szám jön a 7 után?' },
  { id: 'm7', level: 1, badge: 'Összeadás', ask: 'Mennyi 6 + 2?', say: '6 piros és 2 kék korong. Mennyi 6 + 2?', scene: <TenFrame n={6} second={2} />, options: [8, 4, 7], hint: 'Számolj tovább a 6-tól a kékekkel!' },
  { id: 'm8', level: 1, badge: 'Kivonás', ask: 'Mennyi 9 − 3?', say: '9 hógolyóból 3-at áthúztunk. Mennyi 9 − 3?', scene: <CountBox icon="hogolyo" n={9} crossed={3} className={big} />, options: [6, 3, 5], hint: 'Az áthúzottakat ne számold!' },
  { id: 'm9', level: 1, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: '7 csillag, és 9 csillag. Melyik jel kell középre?', scene: <CompareBoxes icon="csillag" a={7} b={9} />, options: ['<', '>', '='], hint: 'Bal oldalon kevesebb van. A jel hegye a kevesebb felé mutat.' },
  { id: 'm10', level: 1, badge: 'Páros, páratlan', ask: 'A 6 páros vagy páratlan?', say: 'Itt 6 szív van, kettesével párba állítva. A 6 páros vagy páratlan?', scene: <PairsScene n={6} />, options: ['páros', 'páratlan'], hint: 'Mindegyik szívnek jutott pár?' },
  { id: 'm11', level: 1, badge: 'Sorszámnevek', ask: 'Hányadik a sorban Pötyi?', say: 'A sor eleje a zászlónál van. Hányadik a sorban Pötyi?', scene: <QueueScene items={['csiga', 'potyi', 'meh', 'madar']} question={2} />, options: ['2.', '1.', '3.'], hint: 'Számolj a zászlótól: első, második, …' },
  { id: 'm12', level: 1, badge: 'Szöveges feladat', ask: 'Hány madár maradt az etetőn?', say: 'Az etetőn 7 madár ült. 2 elrepült. Hány madár maradt?', scene: <FeederScene birds={5} away={2} />, options: [5, 2, 9], hint: 'A repülőket ne számold, csak az etetőn ülőket!' },
  // 2. szint – szomszédok, bontás, jelek, nyitott mondat, szöveges feladat
  { id: 'm13', level: 2, badge: 'Számszomszéd', ask: 'Melyik a 7 nagyobb szomszédja?', options: [8, 6, 7], hint: 'A nagyobb szomszéd közvetlenül a 7 után jön.' },
  { id: 'm14', level: 2, badge: 'Számszomszéd', ask: 'Melyik szám illik ide: 4 < □ < 6?', say: '4 kisebb, mint valahány, és az kisebb, mint 6. Melyik szám illik a négyzetbe?', scene: eq('4 < □ < 6'), options: [5, 3, 6], hint: 'Melyik szám van a 4 és a 6 között?' },
  { id: 'm15', level: 2, badge: 'Bontás', ask: 'Melyik szám kell a ? helyére?', say: 'A 8 házában az egyik szobában 3 lakik. Ki lakik mellette, hogy együtt 8 legyen?', scene: <NumberHouse top={8} rows={[[3, '?']]} />, options: [5, 4, 6], hint: 'Számolj tovább a 3-tól a 8-ig!' },
  { id: 'm16', level: 2, badge: 'Számegyenes', ask: 'Hová ér Csigusz?', say: 'Csigusz a 10-ről 4-et lép vissza. Mennyi 10 − 4?', scene: <HopLine from={10} to={6} max={10} icon="csiga" />, options: [6, 4, 5], hint: 'Kövesd az íveket visszafelé a 10-től!' },
  { id: 'm17', level: 2, badge: 'Jel műveletnél', ask: 'Melyik jel kell?', say: 'Bal oldalon 3 + 4, jobb oldalon 8. Melyik jel kell a kérdőjel helyére?', scene: eq('3 + 4 ? 8'), options: ['<', '>', '='], hint: 'Előbb számold ki: mennyi 3 + 4? Aztán hasonlítsd a 8-hoz!' },
  { id: 'm18', level: 2, badge: 'Sorszámnevek', ask: 'Hányadik a sorban a méh?', say: 'A sor eleje a zászlónál van. Hányadik a sorban Zümi, a méh?', scene: <QueueScene items={['madar', 'potyi', 'csiga', 'meh', 'hogolyo']} question={4} />, options: ['4.', '3.', '5.'], hint: 'Számolj a zászlótól, és mutass rá mindenkire!' },
  { id: 'm19', level: 2, badge: 'Páros, páratlan', ask: 'A 9 páros vagy páratlan?', say: 'Itt 9 szív van, kettesével párba állítva. A 9 páros vagy páratlan?', scene: <PairsScene n={9} />, options: ['páratlan', 'páros'], hint: 'Maradt szív pár nélkül?' },
  { id: 'm20', level: 2, badge: 'Melyik művelet?', ask: 'Melyik illik a képhez?', say: '10 korongból 3-at áthúztunk. Melyik művelet illik a képhez?', scene: <TenFrame n={10} crossed={3} />, options: ['10 − 3 = 7', '7 − 3 = 4', '3 + 3 = 6'], hint: 'Hány korong volt az elején? Hányat húztunk át?' },
  { id: 'm21', level: 2, badge: 'Nyitott mondat', ask: 'Melyik szám kell a □ helyére?', say: 'Valahány meg 2 az 7. Melyik szám kell a négyzetbe?', scene: eq('□ + 2 = 7'), options: [5, 9, 4], hint: 'Mennyi kell a 2-höz, hogy 7 legyen?' },
  { id: 'm22', level: 2, badge: 'Mennyivel több?', ask: 'Mennyivel több csillag van fent?', say: 'Fent 9 csillag, lent 6 csillag. Mennyivel több van fent?', scene: <TwoRowsScene a={9} b={6} icon="csillag" />, options: [3, 2, 6], hint: 'Párosítsd őket! Hány fenti csillagnak nem jut pár?' },
  { id: 'm23', level: 2, badge: 'Kiegészítés', ask: 'Hány pötty kell még Pötyinek?', say: 'Pötyinek 3 pöttye van. Hány pötty kell még, hogy 10 legyen?', scene: <PotyiWingsScene dots={3} label={10} />, options: [7, 6, 3], hint: 'Ők tízesbarátok: 3 és mennyi? Számold meg az üres helyeket!' },
  { id: 'm24', level: 2, badge: 'Szöveges feladat', ask: 'Hány hógolyót gyúrtak összesen?', say: 'Pötyi 4 hógolyót gyúrt, Zümi 5-öt. Hány hógolyót gyúrtak összesen?', scene: <TwoPilesScene a={4} b={5} />, options: [9, 1, 8], hint: 'Rakd össze a két kupacot! Számolj tovább a 4-től.' },
  // 3. szint – szabály, igaz/hamis, két lépés, következtetés
  { id: 'm25', level: 3, badge: 'Sorozat', ask: 'Melyik szám jön a ? helyére?', say: 'A szabály: egyet előre, hármat vissza. 8, 9, 6, 7, és mi jön?', scene: eq('8 9 6 7 ?'), options: [4, 8, 5], hint: 'A 7 után hármat kell visszalépni!' },
  { id: 'm26', level: 3, badge: 'Igaz vagy hamis?', ask: 'Igaz vagy hamis?', say: '5 + 4 − 3 = 5. Igaz ez, vagy hamis?', scene: eq('5 + 4 − 3 = 5'), options: ['hamis', 'igaz'], hint: 'Számold ki lépésenként: előbb 5 + 4, aztán vegyél el 3-at!' },
  { id: 'm27', level: 3, badge: 'Igaz vagy hamis?', ask: 'Igaz vagy hamis?', say: '10 − 5 − 3 = 2. Igaz ez, vagy hamis?', scene: eq('10 − 5 − 3 = 2'), options: ['igaz', 'hamis'], hint: 'Előbb 10 − 5, aztán abból vegyél el még 3-at!' },
  { id: 'm28', level: 3, badge: 'Két lépés', ask: 'Hány veréb maradt az etetőn?', say: 'Az etetőn 3 cinke és 4 veréb evett. Elrepült mind a 3 cinke, és ugyanannyi veréb is. Hány veréb maradt?', scene: <TwoRowsScene a={3} b={4} icon="madar" colorB="#a16207" />, options: [1, 4, 7], hint: 'Annyi veréb repült el, ahány cinke: 3. A 4 verébből vegyél el 3-at!' },
  { id: 'm29', level: 3, badge: 'Próbálgatás', ask: 'Hány hógolyót gyúrt Zümi?', say: 'Pötyi és Zümi együtt 9 hógolyót gyúrt. Pötyi 1-gyel többet gyúrt, mint Zümi. Hány hógolyót gyúrt Zümi?', scene: <CountBox icon="hogolyo" n={9} className={big} />, options: [4, 5, 8], hint: 'Próbálgass! Zümi valahányat, Pötyi eggyel többet: együtt 9 legyen.' },
  { id: 'm30', level: 3, badge: 'Páros, nagyobb', ask: 'Melyik páros ÉS nagyobb 6-nál?', say: 'Melyik szám páros, és közben nagyobb, mint 6?', options: [8, 7, 4], hint: 'Kettőt kell figyelni: páros-e, és nagyobb-e, mint 6.' },
  { id: 'm31', level: 3, badge: 'Nyitott mondat', ask: 'Melyik szám illik ide: 10 > □ > 8?', say: '10 nagyobb, mint valahány, és az nagyobb, mint 8. Melyik szám illik a négyzetbe?', scene: eq('10 > □ > 8'), options: [9, 8, 10], hint: 'Melyik szám van a 8 és a 10 között?' },
  { id: 'm32', level: 3, badge: 'Kakukktojás', ask: 'Melyiknek NEM 8 az eredménye?', say: 'Két műveletnek 8 az eredménye. Melyiknek nem?', options: ['10 − 3', '4 + 4', '10 − 2'], hint: 'Számold ki mindegyiket!' },
  { id: 'm33', level: 3, badge: 'Sorszámnevek', ask: 'Ki áll a 3. helyen?', say: 'A sor eleje a zászlónál van. Ki áll a sorban a harmadik helyen?', scene: <QueueScene items={['madar', 'meh', 'csiga', 'potyi', 'hogolyo']} />, options: [sm(<svg viewBox="0 0 60 60" className="w-16 h-16">{ICON_CSIGA}</svg>, 'Csigusz, a csiga'), sm(<svg viewBox="0 0 60 60" className="w-16 h-16">{ICON_MEH}</svg>, 'Zümi, a méh'), sm(<Potyi dots={10} className="w-16 h-16" />, 'Pötyi')], hint: 'Számolj a zászlótól: első, második, harmadik!' },
  { id: 'm34', level: 3, badge: 'Három tag', ask: 'Mennyi 3 + 3 + 4?', say: 'Mennyi 3 + 3 + 4?', scene: eq('3 + 3 + 4 = ?'), options: [10, 9, 7], hint: 'Előbb 3 + 3, aztán jön még 4.' },
  { id: 'm35', level: 3, badge: 'Ennyivel kevesebb', ask: 'Hány levelet gyűjtött Zümi?', say: 'Csigusz 8 levelet gyűjtött. Zümi 3-mal kevesebbet. Hány levelet gyűjtött Zümi?', scene: <MoreLessScene a={8} diff={3} more={false} icon="level" whoA="csiga" whoB="meh" />, options: [5, 3, 8], hint: '3-mal kevesebb: vegyél el 3-at a 8-ból!' },
  { id: 'm36', level: 3, badge: 'Hány volt?', ask: 'Hány hógolyója volt Pötyinek?', say: 'Pötyi 4 hógolyót odaadott Csigusznak. 6 maradt neki. Hány hógolyója volt az elején?', scene: <CountBox icon="hogolyo" n={10} crossed={4} className={big} />, options: [10, 2, 6], hint: 'Az odaadottak is az övéi voltak. Számold meg az áthúzottakat is!' },
];

export const MEGALLO10_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd a képet a számmal!',
    pairs: [
      { a: sm(<TwoHands n={6} className="w-28 h-auto" />, 'hat ujj'), b: 6 },
      { a: domS(4, 3, 'hét pötty'), b: 7 },
      { a: sm(<TenFrame n={8} className="w-24 h-auto" />, 'nyolc korong'), b: 8 },
      { a: sm(<MiniBox icon="madar" n={9} />, 'kilenc madár'), b: 9 },
      { a: sm(<Potyi dots={10} className="w-16 h-16" />, 'Pötyi tíz pöttye'), b: 10 },
    ],
  },
  2: {
    say: 'Párosítsd a műveletet az eredményével!',
    pairs: [
      { a: '4 + 3', b: 7 },
      { a: '10 − 2', b: 8 },
      { a: '6 + 3', b: 9 },
      { a: '9 − 3', b: 6 },
      { a: '5 + 5', b: 10 },
    ],
  },
  3: {
    say: 'Melyik szám kell a négyzetbe? Párosítsd!',
    pairs: [
      { a: '□ + 4 = 10', b: 6 },
      { a: '8 − □ = 3', b: 5 },
      { a: '□ − 2 = 7', b: 9 },
      { a: '3 + □ = 7', b: 4 },
    ],
  },
};

export const MEGALLO10_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Páros vagy páratlan? Tedd a számot a jó kosárba!',
    bins: [
      { label: 'páros', say: 'páros' },
      { label: 'páratlan', say: 'páratlan' },
    ],
    items: [
      { item: 2, bin: 0 },
      { item: 7, bin: 1 },
      { item: 4, bin: 0 },
      { item: 9, bin: 1 },
      { item: 6, bin: 0 },
      { item: 1, bin: 1 },
      { item: 8, bin: 0 },
      { item: 3, bin: 1 },
      { item: 10, bin: 0 },
      { item: 5, bin: 1 },
    ],
  },
  2: {
    say: 'Kisebb, mint 6, vagy nagyobb, mint 6? Tedd a jó kosárba!',
    bins: [
      { label: '6-nál kisebb', say: 'hatnál kisebb' },
      { label: '6-nál nagyobb', say: 'hatnál nagyobb' },
    ],
    items: [
      { item: 3, bin: 0 },
      { item: 9, bin: 1 },
      { item: sm(<MiniBox icon="alma" n={4} />, 'négy alma'), bin: 0 },
      { item: sm(<TenFrame n={8} className="w-24 h-auto" />, 'nyolc korong'), bin: 1 },
      { item: 0, bin: 0 },
      { item: 10, bin: 1 },
      { item: domS(5, 2, 'hét pötty'), bin: 1 },
      { item: sm(<Hand fingers={5} className="w-16 h-16" />, 'öt ujj'), bin: 0 },
    ],
  },
  3: {
    say: 'Számold ki! Ami pont 10, az a tíz kosárba megy, a többi a másikba.',
    bins: [
      { label: 'Pont 10', figure: <BigSign text="10" className="w-12 h-12" />, say: 'pont tíz' },
      { label: 'Nem 10', say: 'nem tíz' },
    ],
    items: [
      { item: '6 + 4', bin: 0 },
      { item: '10 − 0', bin: 0 },
      { item: '3 + 6', bin: 1 },
      { item: '9 + 1', bin: 0 },
      { item: '10 − 1', bin: 1 },
      { item: '2 + 8', bin: 0 },
      { item: '5 + 4', bin: 1 },
      { item: '7 + 3', bin: 0 },
      { item: '8 + 1', bin: 1 },
    ],
  },
};

export const Megallo10G1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="20. Megálló"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • JÁTÉK"
    base="g1-c10-megallo-10"
    chapterId="szamkorbovites-10-ig"
    questions={MEGALLO10_G1_QUESTIONS}
    pairs={MEGALLO10_G1_PAIRS}
    sort={MEGALLO10_G1_SORT}
    {...props}
  />
);

export default Megallo10G1Jatek;
