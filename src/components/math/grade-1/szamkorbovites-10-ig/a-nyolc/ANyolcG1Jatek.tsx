import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { BigSign, Domino, IconGroup, NumberLine, TenFrame } from '../../shared/G1Pics';
import { DotPairs } from '../../szamolas-5-ig/a-ketto/AKettoG1Scenes';
import { CompareBoxes, CountBox, EqCard, HatRow, HopLine, MiniBox, PicName, SnowfallScene, SnowmanScene, TwoHands, ZumiTwosScene } from './ANyolcG1Scenes';

const box = (icon: PicName, n: number, say: string, crossed = 0) => ({ figure: <CountBox icon={icon} n={n} crossed={crossed} />, say });
const dom = (l: number, r: number, say: string) => ({ figure: <Domino left={l} right={r} />, say });
const hands = (n: number, say: string) => ({ figure: <TwoHands n={n} />, say });
const sm = (node: React.ReactNode, say: string) => ({ figure: node, say });

export const A_NYOLC_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – felismerés, számlálás
  { id: 'ny1', level: 1, badge: 'Számlálás', ask: 'Hány hópehely hull?', say: 'Hány hópehely hull az égből? Számold meg!', scene: <SnowfallScene n={8} />, options: [8, 7, 6], hint: 'Mutass rá mindegyik hópehelyre, és számolj hangosan!' },
  { id: 'ny2', level: 1, badge: 'Nyolc', ask: 'Hol van 8 hógolyó?', options: [box('hogolyo', 8, 'nyolc hógolyó'), box('hogolyo', 6, 'hat hógolyó'), box('hogolyo', 7, 'hét hógolyó')], hint: 'Számold meg a felső és az alsó sort is! Hol lesz pont nyolc?' },
  { id: 'ny3', level: 1, badge: 'Számjegy', ask: 'Melyik a nyolcas?', options: [{ figure: <BigSign text="8" />, say: 'nyolcas' }, { figure: <BigSign text="3" />, say: 'hármas' }, { figure: <BigSign text="6" />, say: 'hatos' }], hint: 'A nyolcas olyan, mint egy hóember: két kör egymáson.' },
  { id: 'ny4', level: 1, badge: 'Ujjkép', ask: 'Hány ujj van fent?', say: 'Két kezet látsz. Hány ujj van fent összesen?', scene: <TwoHands n={8} />, options: [8, 7, 6], hint: 'Az egyik kézen 5 ujj van. Számolj tovább a másik kézen: 6, 7…' },
  { id: 'ny5', level: 1, badge: 'Számlálás', ask: 'Hány gomb van a hóemberen?', scene: <SnowmanScene buttons={8} />, options: [8, 7, 5], hint: 'Párosával is számolhatsz: 2, 4, 6… Egyet se hagyj ki!' },
  { id: 'ny6', level: 1, badge: 'Számlálás', ask: 'Hány sapka van a sorban?', scene: <HatRow a={8} b={0} />, options: [8, 6, 7], hint: 'Balról jobbra haladj, és mindegyikre mutass rá!' },
  { id: 'ny7', level: 1, badge: 'Tízes keret', ask: 'Hány korong van a keretben?', scene: <TenFrame n={8} />, options: [8, 7, 6], hint: 'A felső sor tele van: az 5. Számolj tovább lent!' },
  { id: 'ny8', level: 1, badge: 'Számlálás', ask: 'Hány madár ül itt?', scene: <IconGroup icon="madar" n={7} perRow={4} className="w-56 h-auto mx-auto" />, options: [7, 8, 6], hint: 'Vigyázz, nem mindig nyolc van! Számold meg még egyszer.' },
  // 2. szint – több, kevesebb, számegyenes, bontás
  { id: 'ny9', level: 2, badge: 'Nyolcnál kevesebb', ask: 'Hol van nyolcnál kevesebb?', options: [box('alma', 7, 'hét alma'), box('alma', 8, 'nyolc alma')], hint: 'Számold meg mindkét dobozt! Hol nincs meg a nyolc?' },
  { id: 'ny10', level: 2, badge: 'Számegyenes', ask: 'Melyik szám kell a ? helyére?', say: 'Melyik szám kell a kérdőjel helyére a számegyenesen?', scene: <NumberLine max={8} question={8} />, options: [8, 7, 6], hint: 'A 7 után melyik szám jön?' },
  { id: 'ny11', level: 2, badge: 'Dominó', ask: 'Melyik dominón van 8 pötty?', options: [dom(4, 4, 'négy és négy pötty'), dom(5, 2, 'öt és két pötty'), dom(3, 3, 'három és három pötty')], hint: 'Számold meg mindkét oldal pöttyeit, és add össze!' },
  { id: 'ny12', level: 2, badge: 'Kiegészítés', ask: 'Hány gomb kell még, hogy 8 legyen?', say: 'A hóemberen 5 gomb van. 8 gombot szeretnénk. Hány gomb kell még?', scene: <SnowmanScene buttons={5} label={8} />, options: [3, 2, 4], hint: 'Számolj tovább az 5-től a 8-ig: 6, 7, 8. Hányat mondtál?' },
  { id: 'ny13', level: 2, badge: 'Lépések', ask: 'Hová ér Csigusz?', say: 'Csigusz a 4-ről indul, és előre mászik. Számold meg a lépéseit! Hová ér?', scene: <HopLine from={4} to={8} />, options: [8, 7, 6], hint: 'Számold meg az íveket, és lépj annyit a 4-től!' },
  { id: 'ny14', level: 2, badge: 'Összeadás', ask: 'Hány korong van összesen?', say: '6 piros és 2 kék korong van a keretben. Hány korong van összesen?', scene: <TenFrame n={6} second={2} />, options: [8, 7, 6], hint: 'Számold meg a pirosakat, aztán számolj tovább a kékekkel!' },
  { id: 'ny15', level: 2, badge: 'Kettesével', ask: 'Hová ér Zümi a következő ugrással?', say: 'Zümi mindig kettőt ugrik. Hová ér a következő ugrással?', scene: <ZumiTwosScene done={2} />, options: [6, 5, 7], hint: 'Zümi most a 4-en van. Lépj tovább kettőt!' },
  { id: 'ny16', level: 2, badge: 'Párosítás', ask: 'Melyik illik a 8-hoz?', say: 'Melyik két kéz mutat nyolcat?', scene: <BigSign text="8" className="w-24 h-24 mx-auto" />, options: [hands(8, 'nyolc ujj'), hands(7, 'hét ujj'), hands(6, 'hat ujj')], hint: 'Az egyik kézen 5 ujj van. Melyik másik kézen van még 3?' },
  // 3. szint – összehasonlítás, két lépés, kis történetek
  { id: 'ny17', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: '8 hógolyó, és 6 hógolyó. Melyik jel kell középre?', scene: <CompareBoxes icon="hogolyo" a={8} b={6} />, options: ['>', '<', '='], hint: 'Jobb oldalon kevesebb van. A jel hegye arra mutasson!' },
  { id: 'ny18', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: '7 sapka, és 8 sapka. Melyik jel kell középre?', scene: <CompareBoxes icon="sapka" a={7} b={8} />, options: ['<', '>', '='], hint: 'Bal oldalon kevesebb van. A hegye a kevesebb felé mutat.' },
  { id: 'ny19', level: 3, badge: 'Ugyanannyi', ask: 'Melyik jel kell?', say: 'Gombok bal oldalon és jobb oldalon. Melyik jel kell középre?', scene: <CompareBoxes icon="gomb" a={8} b={8} />, options: ['=', '<', '>'], hint: 'Számold meg mindkét oldalt! Ugyanannyi?' },
  { id: 'ny20', level: 3, badge: 'Kakukktojás', ask: 'Melyik NEM nyolc?', say: 'Két képen nyolc látszik. Melyik nem nyolc?', options: [box('hopehely', 7, 'hópelyhek'), hands(8, 'két kéz'), dom(4, 4, 'dominó')], hint: 'Számold meg mindegyiket! Hol nincs pont nyolc?' },
  { id: 'ny21', level: 3, badge: 'Elvétel', ask: 'Hány hógolyó maradt?', say: '8 hógolyó volt. Csigusz kettőt elgurított, ezeket áthúztuk. Hány hógolyó maradt?', scene: <CountBox icon="hogolyo" n={8} crossed={2} className="w-48 h-auto mx-auto" />, options: [6, 7, 5], hint: 'Csak azokat számold, amelyek nincsenek áthúzva!' },
  { id: 'ny22', level: 3, badge: 'Kiegészítés', ask: '8 sapka kell. Hány hiányzik még?', say: 'A barátok 8 sapkát szeretnének. 6 sapka már megvan. Hány hiányzik még?', scene: <HatRow a={6} b={0} />, options: [2, 3, 1], hint: 'Számolj tovább a 6-tól: 7, 8. Hányat számoltál?' },
  { id: 'ny23', level: 3, badge: 'Számsor', ask: 'Melyik szám hiányzik?', say: 'Nézd a számsort: 5, 6, kérdőjel, 8. Melyik szám hiányzik?', scene: <EqCard text="5 6 ? 8" />, options: [7, 4, 3], hint: 'Melyik szám jön a 6 után, és a 8 előtt?' },
  { id: 'ny24', level: 3, badge: 'Kis történet', ask: 'Hány hógolyó van együtt?', say: 'Zümi 4 hógolyót gyúrt, Csigusz is 4-et. Hány hógolyó van együtt?', scene: <CountBox icon="hogolyo" n={4} nb={4} colorB="#bae6fd" className="w-48 h-auto mx-auto" />, options: [8, 7, 4], hint: '4 meg 4. Számolj tovább a 4-től még négyet!' },
];

export const A_NYOLC_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Koppints bal oldalon egy képre, aztán jobb oldalon arra, ami illik hozzá!',
    pairs: [
      { a: sm(<MiniBox icon="hogolyo" n={8} />, 'nyolc hógolyó'), b: 8 },
      { a: sm(<MiniBox icon="hogolyo" n={7} />, 'hét hógolyó'), b: 7 },
      { a: sm(<MiniBox icon="hogolyo" n={6} />, 'hat hógolyó'), b: 6 },
      { a: sm(<MiniBox icon="hogolyo" n={5} />, 'öt hógolyó'), b: 5 },
    ],
  },
  2: {
    say: 'Keresd meg, mi illik össze! Ugyanannyi legyen.',
    pairs: [
      { a: sm(<MiniBox icon="sapka" n={8} />, 'nyolc sapka'), b: sm(<TenFrame n={8} className="w-24 h-auto" />, 'nyolc korong') },
      { a: sm(<Domino left={4} right={3} className="w-24 h-auto" />, 'hét pötty'), b: 7 },
      { a: sm(<MiniBox icon="hopehely" n={6} />, 'hat hópehely'), b: sm(<TwoHands n={6} className="w-24 h-auto" />, 'hat ujj') },
      { a: 5, b: sm(<Domino left={5} right={0} className="w-24 h-auto" />, 'öt pötty') },
    ],
  },
  3: {
    say: 'Párosítsd a jeleket a képekhez! Kék és piros korongokat látsz. Az üres keret nulla.',
    pairs: [
      { a: '8 > 6', b: sm(<DotPairs a={8} b={6} />, 'nyolc kék, hat piros') },
      { a: '7 < 8', b: sm(<DotPairs a={7} b={8} />, 'hét kék, nyolc piros') },
      { a: '8 = 8', b: sm(<DotPairs a={8} b={8} />, 'nyolc kék, nyolc piros') },
      { a: '0 < 8', b: sm(<DotPairs a={0} b={8} />, 'nulla kék, nyolc piros') },
    ],
  },
};

export const A_NYOLC_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Nyolc, vagy nem nyolc? Számold meg, és tedd a jó kosárba!',
    bins: [
      { label: 'Nyolc', figure: <BigSign text="8" className="w-12 h-12" />, say: 'nyolc' },
      { label: 'Nem nyolc', say: 'nem nyolc' },
    ],
    items: [
      { item: sm(<MiniBox icon="gomba" n={8} />, 'gombák'), bin: 0 },
      { item: sm(<MiniBox icon="gomba" n={7} />, 'gombák'), bin: 1 },
      { item: sm(<MiniBox icon="labda" n={8} />, 'labdák'), bin: 0 },
      { item: sm(<MiniBox icon="labda" n={6} />, 'labdák'), bin: 1 },
      { item: sm(<MiniBox icon="hopehely" n={8} />, 'hópelyhek'), bin: 0 },
      { item: sm(<MiniBox icon="virag" n={5} />, 'virágok'), bin: 1 },
      { item: sm(<TwoHands n={8} className="w-24 h-auto" />, 'két kéz'), bin: 0 },
    ],
  },
  2: {
    say: 'Három kosár van: hat, hét, nyolc. Hová való?',
    bins: [
      { label: '6', say: 'hat' },
      { label: '7', say: 'hét' },
      { label: '8', say: 'nyolc' },
    ],
    items: [
      { item: sm(<TwoHands n={8} className="w-24 h-auto" />, 'két kéz'), bin: 2 },
      { item: sm(<TwoHands n={6} className="w-24 h-auto" />, 'két kéz'), bin: 0 },
      { item: sm(<Domino left={4} right={3} className="w-24 h-auto" />, 'dominó'), bin: 1 },
      { item: sm(<Domino left={4} right={4} className="w-24 h-auto" />, 'dominó'), bin: 2 },
      { item: sm(<Domino left={3} right={3} className="w-24 h-auto" />, 'dominó'), bin: 0 },
      { item: sm(<MiniBox icon="hal" n={7} />, 'halak'), bin: 1 },
      { item: sm(<MiniBox icon="alma" n={8} />, 'almák'), bin: 2 },
      { item: sm(<TenFrame n={6} className="w-24 h-auto" />, 'korongok'), bin: 0 },
    ],
  },
  3: {
    say: 'Számold ki! Nyolcnál kevesebb lesz, vagy pont nyolc? Tedd a jó kosárba!',
    bins: [
      { label: 'Kevesebb', figure: <BigSign text="< 8" className="w-12 h-12" />, say: 'nyolcnál kevesebb' },
      { label: 'Pont 8', figure: <BigSign text="8" className="w-12 h-12" />, say: 'pont nyolc' },
    ],
    items: [
      { item: '5 + 3', bin: 1 },
      { item: '4 + 4', bin: 1 },
      { item: '7 + 1', bin: 1 },
      { item: '6 + 2', bin: 1 },
      { item: '4 + 3', bin: 0 },
      { item: '6 + 1', bin: 0 },
      { item: '5 + 2', bin: 0 },
      { item: '8 − 1', bin: 0 },
    ],
  },
};

export const ANyolcG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="9. A nyolc"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • JÁTÉK"
    base="g1-c10-a-nyolc"
    chapterId="szamkorbovites-10-ig"
    questions={A_NYOLC_G1_QUESTIONS}
    pairs={A_NYOLC_G1_PAIRS}
    sort={A_NYOLC_G1_SORT}
    {...props}
  />
);

export default ANyolcG1Jatek;
