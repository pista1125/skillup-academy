import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { BigSign, Domino, Hand, NumberLine, TenFrame } from '../../shared/G1Pics';
import { Potyi } from '../../shared/Potyi';
import { CompareBoxes, CountBox, EqCard, HopLine, MiniBox, TwoHands } from '../a-nyolc/ANyolcG1Scenes';
import { FeederScene, PairsScene, PotyiWingsScene, TwoRowsScene } from './ATizG1Scenes';

const sm = (node: React.ReactNode, say: string) => ({ figure: node, say });
const sign = (t: string, say: string) => sm(<BigSign text={t} />, say);
const dom = (l: number, r: number, say: string) => sm(<Domino left={l} right={r} />, say);
const frame = (n: number, say: string) => sm(<TenFrame n={n} />, say);
const frameS = (n: number, say: string) => sm(<TenFrame n={n} className="w-24 h-auto" />, say);
const domS = (l: number, r: number, say: string) => sm(<Domino left={l} right={r} className="w-24 h-auto" />, say);
const handsS = (n: number, say: string) => sm(<TwoHands n={n} className="w-28 h-auto" />, say);

export const A_TIZ_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – a tíz felismerése
  { id: 't1', level: 1, badge: 'Számlálás', ask: 'Hány madár ül az etetőn?', scene: <FeederScene birds={10} />, options: [10, 9, 8], hint: 'Előbb a lentieket számold, aztán folytasd a tetőn!' },
  { id: 't2', level: 1, badge: 'Számjegy', ask: 'Melyik a tíz?', say: 'Melyik kártyán van a tíz?', options: [sign('10', 'tíz'), sign('01', 'nulla, egy'), sign('7', 'hét')], hint: 'A tíznél elöl áll az egyes, mögötte a nulla.' },
  { id: 't3', level: 1, badge: 'Ujjkép', ask: 'Hány ujj van fent?', scene: <TwoHands n={10} className="w-56 h-auto mx-auto" />, options: [10, 9, 5], hint: 'Számold meg mindkét kezet! Az egyiken 5, a másikon is.' },
  { id: 't4', level: 1, badge: 'Dominó', ask: 'Hol van 10 pötty?', options: [dom(5, 5, 'tíz pötty'), dom(5, 4, 'kilenc pötty'), dom(4, 4, 'nyolc pötty')], hint: 'Tíz pötty: mindkét felén öt pötty legyen!' },
  { id: 't5', level: 1, badge: 'Tízes keret', ask: 'Melyik keret van tele?', options: [frame(10, 'tíz korong'), frame(9, 'kilenc korong'), frame(7, 'hét korong')], hint: 'Keresd azt, ahol nem maradt üres hely!' },
  { id: 't6', level: 1, badge: 'Pötyi pöttyei', ask: 'Hány pötty van Pötyi hátán?', scene: <Potyi dots={10} mood="cheer" className="w-44 h-44 mx-auto" />, options: [10, 9, 8], hint: 'Számold meg mindkét szárnyát! Az egyiken 5, a másikon?' },
  { id: 't7', level: 1, badge: 'Számegyenes', ask: 'Melyik szám kell a ? helyére?', say: 'Melyik szám kell a kérdőjel helyére a számegyenesen?', scene: <NumberLine max={10} question={10} />, options: [10, 9, 1], hint: 'A 9 után melyik szám jön?' },
  { id: 't8', level: 1, badge: 'Ugyanannyi', ask: 'Melyik kép illik a 10-hez?', scene: <BigSign text="10" className="w-24 h-24 mx-auto" />, options: [sm(<CountBox icon="csillag" n={10} />, 'tíz csillag'), sm(<CountBox icon="csillag" n={9} />, 'kilenc csillag'), sm(<CountBox icon="csillag" n={8} />, 'nyolc csillag')], hint: 'Számold meg a csillagokat soronként! Kétszer öt kell.' },
  // 2. szint – helye a számsorban, összehasonlítás, kiegészítés
  { id: 't9', level: 2, badge: 'Kevesebb', ask: 'Hol van 10-nél kevesebb?', say: 'Melyik dobozban van tíznél kevesebb hógolyó?', options: [sm(<CountBox icon="hogolyo" n={8} />, 'nyolc hógolyó'), sm(<CountBox icon="hogolyo" n={10} />, 'tíz hógolyó')], hint: 'Számold meg mindkettőt! Melyik nem éri el a tízet?' },
  { id: 't10', level: 2, badge: 'Számszomszéd', ask: 'Melyik a 10 kisebb szomszédja?', options: [9, 8, 1], hint: 'Közvetlenül a 10 előtt áll a számegyenesen.' },
  { id: 't11', level: 2, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: '10 alma, és 7 alma. Melyik jel kell középre?', scene: <CompareBoxes icon="alma" a={10} b={7} />, options: ['>', '<', '='], hint: 'Bal oldalon több van. A jel hegye a kevesebb felé mutat.' },
  { id: 't12', level: 2, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: '9 és 10. Melyik jel kell a kérdőjel helyére?', scene: <EqCard text="9 ? 10" className="w-full max-w-[220px] h-auto mx-auto" />, options: ['<', '>', '='], hint: 'A 9 kisebb, mint a 10. A jel hegye a 9 felé mutasson!' },
  { id: 't13', level: 2, badge: 'Mennyivel több?', ask: 'Mennyivel több madár van fent?', say: 'Fent 10 madár, lent 7 madár ül. Mennyivel több madár van fent?', scene: <TwoRowsScene a={10} b={7} />, options: [3, 2, 7], hint: 'Párosítsd őket! Hány fenti madárnak nem jut pár?' },
  { id: 't14', level: 2, badge: 'Kiegészítés', ask: 'Hány üres hely van a keretben?', say: 'A keretben 7 korong van. Hány hely üres még?', scene: <TenFrame n={7} />, options: [3, 2, 7], hint: 'Ne a korongokat számold, hanem az üres helyeket!' },
  { id: 't15', level: 2, badge: 'Kiegészítés', ask: 'Hány pötty kell még Pötyinek?', say: 'Pötyi hátán 8 pötty van. Hány pötty kell még, hogy 10 legyen?', scene: <PotyiWingsScene dots={8} label={10} />, options: [2, 1, 3], hint: 'Számolj tovább a 8-tól: 9, 10. Hányat számoltál?' },
  { id: 't16', level: 2, badge: 'Számegyenes', ask: 'Hová ér Csigusz?', say: 'Csigusz a 7-ről indul, és hármat lép előre. Hová ér?', scene: <HopLine from={7} to={10} max={10} icon="csiga" />, options: [10, 9, 3], hint: 'Kövesd az íveket a 7-től! Minden ív egy lépés.' },
  // 3. szint – bontás, tízesbarátok, két lépés
  { id: 't17', level: 3, badge: 'A 10 bontása', ask: 'Melyik szám kell a □ helyére?', say: '6 meg valahány az 10. Melyik szám kell a négyzetbe?', scene: <EqCard text="6 + □ = 10" className="w-full max-w-[320px] h-auto mx-auto" />, options: [4, 3, 5], hint: 'Számolj tovább a 6-tól a 10-ig az ujjaidon!' },
  { id: 't18', level: 3, badge: 'A 10 bontása', ask: 'Hány kék korong van?', say: 'A keretben 10 korong van. 3 piros, a többi kék. Hány kék korong van?', scene: <TenFrame n={3} second={7} />, options: [7, 3, 6], hint: 'Csak a kék korongokat számold!' },
  { id: 't19', level: 3, badge: 'Tízesbarátok', ask: 'Melyik ad együtt 10-et?', say: 'Melyik összeadásnak 10 az eredménye?', options: ['7 + 3', '6 + 3', '5 + 4'], hint: 'Számold ki mindegyiket az ujjaidon! Hol lesz fent mind a tíz ujjad?' },
  { id: 't20', level: 3, badge: 'Jel műveletnél', ask: 'Melyik jel kell?', say: 'Bal oldalon 5 + 5, jobb oldalon 10. Melyik jel kell a kérdőjel helyére?', scene: <EqCard text="5 + 5 ? 10" className="w-full max-w-[320px] h-auto mx-auto" />, options: ['=', '<', '>'], hint: 'Előbb számold ki: mennyi 5 + 5? Aztán hasonlítsd a 10-hez!' },
  { id: 't21', level: 3, badge: 'Elvétel', ask: 'Hány madár maradt az etetőn?', say: '10 madár ült az etetőn. 1 elrepült. Hány madár maradt az etetőn?', scene: <FeederScene birds={9} away={1} />, options: [9, 10, 8], hint: 'A repülőt ne számold, csak az etetőn ülőket!' },
  { id: 't22', level: 3, badge: 'Páros, páratlan', ask: 'A 10 páros vagy páratlan?', say: 'Itt 10 szív van, kettesével párba állítva. Mindegyiknek jutott pár? A 10 páros vagy páratlan?', scene: <PairsScene n={10} />, options: ['páros', 'páratlan'], hint: 'Nézd meg, maradt-e szív pár nélkül!' },
  { id: 't23', level: 3, badge: 'Nyitott mondat', ask: 'Melyik szám illik ide: 9 < □?', say: '9 kisebb, mint valahány. Melyik szám illik a négyzetbe?', scene: <EqCard text="9 < □" className="w-full max-w-[220px] h-auto mx-auto" />, options: [10, 9, 8], hint: 'Olyan szám kell, ami nagyobb, mint a 9!' },
  { id: 't24', level: 3, badge: 'Szöveges feladat', ask: 'Hány madár lesz az etetőn?', say: 'Az etetőn 6 madár ül. Jön még 4. Hány madár lesz az etetőn?', scene: <FeederScene birds={6} coming={4} />, options: [10, 9, 2], hint: 'Számolj tovább a 6-tól a jövő madarakkal: 7, 8, 9, …' },
];

export const A_TIZ_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Koppints bal oldalon egy képre, aztán jobb oldalon a hozzá illő számra!',
    pairs: [
      { a: frameS(10, 'tíz korong'), b: 10 },
      { a: sm(<MiniBox icon="madar" n={9} />, 'kilenc madár'), b: 9 },
      { a: sm(<MiniBox icon="hogolyo" n={7} />, 'hét hógolyó'), b: 7 },
      { a: sm(<Hand fingers={5} className="w-16 h-16" />, 'öt ujj'), b: 5 },
    ],
  },
  2: {
    say: 'Keresd meg, mi illik össze! Ugyanannyi legyen.',
    pairs: [
      { a: handsS(10, 'tíz ujj'), b: domS(5, 5, 'tíz pötty') },
      { a: frameS(9, 'kilenc korong'), b: sm(<MiniBox icon="csillag" n={9} />, 'kilenc csillag') },
      { a: sm(<MiniBox icon="sapka" n={8} />, 'nyolc sapka'), b: domS(4, 4, 'nyolc pötty') },
      { a: sm(<Potyi dots={10} className="w-16 h-16" />, 'Pötyi tíz pöttye'), b: sm(<MiniBox icon="alma" n={10} />, 'tíz alma') },
      { a: domS(3, 3, 'hat pötty'), b: handsS(6, 'hat ujj') },
    ],
  },
  3: {
    say: 'Tízesbarátok! Hány korong hiányzik, hogy tele legyen a keret? Párosítsd a számmal!',
    pairs: [
      { a: frameS(9, 'kilenc korong'), b: 1 },
      { a: frameS(8, 'nyolc korong'), b: 2 },
      { a: frameS(7, 'hét korong'), b: 3 },
      { a: frameS(6, 'hat korong'), b: 4 },
      { a: frameS(5, 'öt korong'), b: 5 },
    ],
  },
};

export const A_TIZ_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Hová való a kép? Ahol pont tíz van, az a tíz kosár. A többi a másik kosárba megy.',
    bins: [
      { label: 'Tíz', figure: <TenFrame n={10} className="w-20 h-auto" />, say: 'tíz' },
      { label: 'Nem tíz', figure: <TenFrame n={6} className="w-20 h-auto" />, say: 'nem tíz' },
    ],
    items: [
      { item: sm(<MiniBox icon="madar" n={10} />, 'tíz madár'), bin: 0 },
      { item: sm(<MiniBox icon="madar" n={8} />, 'nyolc madár'), bin: 1 },
      { item: handsS(10, 'tíz ujj'), bin: 0 },
      { item: domS(5, 4, 'kilenc pötty'), bin: 1 },
      { item: domS(5, 5, 'tíz pötty'), bin: 0 },
      { item: sm(<Potyi dots={10} className="w-16 h-16" />, 'Pötyi tíz pöttye'), bin: 0 },
      { item: sm(<Hand fingers={5} className="w-16 h-16" />, 'öt ujj'), bin: 1 },
      { item: sm(<MiniBox icon="hogolyo" n={9} />, 'kilenc hógolyó'), bin: 1 },
    ],
  },
  2: {
    say: 'Kisebb, mint 10, vagy pont 10? Tedd a jó kosárba!',
    bins: [
      { label: '10-nél kisebb', say: 'tíznél kisebb' },
      { label: '10', figure: <BigSign text="10" className="w-12 h-12" />, say: 'pont tíz' },
    ],
    items: [
      { item: 9, bin: 0 },
      { item: 3, bin: 0 },
      { item: 10, bin: 1 },
      { item: 0, bin: 0 },
      { item: frameS(10, 'teli keret'), bin: 1 },
      { item: frameS(8, 'nyolc korong'), bin: 0 },
      { item: handsS(10, 'tíz ujj'), bin: 1 },
      { item: sm(<MiniBox icon="csillag" n={6} />, 'hat csillag'), bin: 0 },
    ],
  },
  3: {
    say: 'Melyik összeadásnak 10 az eredménye? Ami 10, az a tíz kosárba megy, a többi a másikba.',
    bins: [
      { label: 'Pont 10', figure: <BigSign text="10" className="w-12 h-12" />, say: 'pont tíz' },
      { label: 'Nem 10', say: 'nem tíz' },
    ],
    items: [
      { item: '7 + 3', bin: 0 },
      { item: '6 + 4', bin: 0 },
      { item: '5 + 5', bin: 0 },
      { item: '9 + 1', bin: 0 },
      { item: '6 + 3', bin: 1 },
      { item: '8 + 1', bin: 1 },
      { item: '4 + 4', bin: 1 },
      { item: '2 + 8', bin: 0 },
      { item: '5 + 4', bin: 1 },
    ],
  },
};

export const ATizG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="17. A tíz"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • JÁTÉK"
    base="g1-c10-a-tiz"
    chapterId="szamkorbovites-10-ig"
    questions={A_TIZ_G1_QUESTIONS}
    pairs={A_TIZ_G1_PAIRS}
    sort={A_TIZ_G1_SORT}
    {...props}
  />
);

export default ATizG1Jatek;
