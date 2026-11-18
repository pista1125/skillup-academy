import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { Domino, Hand, IconGroup, NumberLine, BigSign } from '../../shared/G1Pics';
import { BirdFig, Clover, CompareScene, DogFig, DotsPair, FruitName, GroupBox, KorongRow, LeafBugsScene, MiniGroup, SnailFig, SplitScene, TreeScene, drawThing } from './ANegyG1Scenes';

const pic = (icon: FruitName, n: number, say: string) => ({ figure: <GroupBox icon={icon} n={n} />, say });
const dom = (n: number, say: string) => ({ figure: <Domino left={n} single />, say });
const hand = (n: number, say: string) => ({ figure: <Hand fingers={n} />, say });

const FriendsBaskets: React.FC<{ a: number; b: number }> = ({ a, b }) => (
  <svg viewBox="0 0 320 140">
    <svg x="0" y="0" width="120" height="100" viewBox="0 0 120 100">
      <GroupBox icon="virag" n={a} className="" />
    </svg>
    <svg x="200" y="0" width="120" height="100" viewBox="0 0 120 100">
      <GroupBox icon="virag" n={b} className="" />
    </svg>
    {drawThing('meh', 60, 120, 1)}
    {drawThing('katica', 260, 120, 1)}
  </svg>
);

export const A_NEGY_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – felismerés, számlálás
  { id: 'n1', level: 1, badge: 'Számlálás', ask: 'Hány levele van?', say: 'Hány levele van a lóherének?', scene: <Clover leaves={4} className="w-40 h-40 mx-auto" />, options: [4, 3, 2], hint: 'Mutass rá minden levélre, és számolj!' },
  { id: 'n2', level: 1, badge: 'Négy elem', ask: 'Hol van 4 gomba?', options: [pic('gomba', 4, 'négy gomba'), pic('gomba', 3, 'három gomba'), pic('gomba', 2, 'két gomba')], hint: 'Számold meg a gombákat mindegyik képen!' },
  { id: 'n3', level: 1, badge: 'Számjegy', ask: 'Melyik a négyes?', options: [{ figure: <BigSign text="4" />, say: 'négyes' }, { figure: <BigSign text="1" />, say: 'egyes' }, { figure: <BigSign text="3" />, say: 'hármas' }], hint: 'A négyes olyan, mint egy kis zászló a rúdon.' },
  { id: 'n4', level: 1, badge: 'Ujjkép', ask: 'Melyik kéz mutat 4-et?', options: [hand(4, 'négy ujj'), hand(3, 'három ujj'), hand(2, 'két ujj')], hint: 'Számold meg a felemelt ujjakat!' },
  { id: 'n5', level: 1, badge: 'Dominó', ask: 'Hány pötty van rajta?', say: 'Hány pötty van a dominón?', scene: <Domino left={4} single className="w-32 h-32 mx-auto" />, options: [4, 3, 2], hint: 'Minden sarokban van egy pötty. Számold meg!' },
  { id: 'n6', level: 1, badge: 'Számlálás', ask: 'Hány alma van a fán?', scene: <TreeScene fruit="alma" n={4} />, options: [4, 2, 3], hint: 'Mutass rá minden almára, egyiket se hagyd ki!' },
  { id: 'n7', level: 1, badge: 'Számlálás', ask: 'Hány katica ül a levélen?', scene: <LeafBugsScene n={4} />, options: [4, 3, 1], hint: 'Számold meg a katicákat egyenként!' },
  { id: 'n8', level: 1, badge: 'Dominó', ask: 'Hol van 4 pötty?', options: [dom(4, 'négy pötty'), dom(3, 'három pötty'), dom(1, 'egy pötty')], hint: 'A négy pötty a négy sarokban ül.' },
  // 2. szint – számegyenes, párosítás, bontás
  { id: 'n9', level: 2, badge: 'Számegyenes', ask: 'Melyik szám jön ide?', say: 'Melyik szám kell a kérdőjel helyére a számegyenesen?', scene: <NumberLine max={4} question={4} />, options: [4, 3, 2], hint: 'A három után melyik szám jön?' },
  { id: 'n10', level: 2, badge: 'Számsor', ask: 'Melyik szám hiányzik?', say: 'Nulla, egy, kettő, valami, négy. Melyik szám hiányzik?', scene: <NumberLine max={4} question={3} />, options: [3, 2, 4], hint: 'Mondd végig: nulla, egy, kettő, …' },
  { id: 'n11', level: 2, badge: 'Párosítás', ask: 'Melyik kép illik a 4-hez?', scene: <BigSign text="4" className="w-24 h-24 mx-auto" />, options: [pic('eper', 4, 'négy eper'), pic('eper', 3, 'három eper'), pic('eper', 2, 'két eper')], hint: 'A négyeshez négy eper kell. Számold meg!' },
  { id: 'n12', level: 2, badge: 'Négy elem', ask: 'Kinek van 4 lába?', options: [{ figure: <DogFig />, say: 'a kutya' }, { figure: <BirdFig />, say: 'a madár' }, { figure: <SnailFig />, say: 'a csiga' }], hint: 'A madárnak két lába van. Kinek van több?' },
  { id: 'n13', level: 2, badge: 'Ujjkép', ask: 'Hány ujj van fent?', scene: <Hand fingers={4} className="w-32 h-32 mx-auto" />, options: [4, 3, 2], hint: 'Csak a hüvelykujj pihen. Számold meg a többit!' },
  { id: 'n14', level: 2, badge: 'Bontás', ask: 'Hány kék korong van?', say: 'Négy korong van, három piros. Hány kék korong van?', scene: <SplitScene red={3} blue={1} top={4} left={3} right="?" />, options: [1, 3, 2], hint: 'Csak a kék korongokat számold!' },
  { id: 'n15', level: 2, badge: 'Kevesebb, több', ask: 'Hol van 4-nél kevesebb?', say: 'Melyik képen van négynél kevesebb labda?', options: [pic('labda', 2, 'két labda'), pic('labda', 4, 'négy labda')], hint: 'Ott pont négy labda van. Hol van kevesebb?' },
  { id: 'n16', level: 2, badge: 'Számegyenes', ask: 'Melyik számra mutat a pötty?', say: 'Melyik számnál van a piros pötty?', scene: <NumberLine max={4} mark={[4]} hideLabels={[4]} />, options: [4, 3, 0], hint: 'Számold a lépéseket a nullától!' },
  // 3. szint – összehasonlítás, bontás, kis történetek
  { id: 'n17', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: 'Négy alma, és három alma. Melyik jel kell középre?', scene: <CompareScene icon="alma" a={4} b={3} />, options: ['>', '<', '='], hint: 'A jel hegye arra mutat, ahol kevesebb van.' },
  { id: 'n18', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: 'Két hal, és négy hal. Melyik jel kell középre?', scene: <CompareScene icon="hal" a={2} b={4} />, options: ['<', '>', '='], hint: 'Bal oldalon kevesebb van. A hegye a kevesebb felé mutat.' },
  { id: 'n19', level: 3, badge: 'Ugyanannyi', ask: 'Melyik jel kell?', say: 'Négy csillag, és négy csillag. Melyik jel kell középre?', scene: <CompareScene icon="csillag" a={4} b={4} />, options: ['=', '<', '>'], hint: 'Számold meg mindkét oldalt! Ugyanannyi?' },
  { id: 'n20', level: 3, badge: 'Bontás', ask: 'Hány korong fehér még?', say: 'Pötyi négy korongot színez. Kettőt már kiszínezett. Hány korong fehér még?', scene: <SplitScene red={2} blue={0} white={2} top={4} left={2} right="?" />, options: [2, 1, 4], hint: 'Csak a fehér korongokat számold!' },
  { id: 'n21', level: 3, badge: 'Számsor', ask: 'Mi jön a 3 után?', say: 'Melyik szám jön a három után?', scene: <NumberLine max={4} hideLabels={[4]} mark={[3]} />, options: [4, 2, 0], hint: 'Egy lépés előre a háromtól.' },
  { id: 'n22', level: 3, badge: 'Párosítás', ask: 'Melyik illik a kézhez?', say: 'A kéz négy ujjat mutat. Melyik dominó illik hozzá?', scene: <Hand fingers={4} className="w-28 h-28 mx-auto" />, options: [dom(4, 'négy pötty'), dom(3, 'három pötty'), dom(2, 'két pötty')], hint: 'Négy ujj, négy pötty.' },
  { id: 'n23', level: 3, badge: 'Több', ask: 'Ki szedett több virágot?', say: 'Zümi három virágot szedett, Pötyi négyet. Ki szedett többet?', scene: <FriendsBaskets a={3} b={4} />, options: [{ figure: <IconGroup icon="katica" n={1} className="w-16 h-16" />, say: 'Pötyi' }, { figure: <IconGroup icon="meh" n={1} className="w-16 h-16" />, say: 'Zümi' }], hint: 'Számold meg mindkét csokrot! A négy több, mint a három.' },
  { id: 'n24', level: 3, badge: 'Sorrend', ask: 'Melyik szám a legnagyobb?', options: [4, 2, 3, 1], hint: 'Gondolj a számegyenesre! Melyik van a legmesszebb?' },
];

export const A_NEGY_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Koppints bal oldalon egy képre, aztán jobb oldalon a hozzá illő számra!',
    pairs: [
      { a: { figure: <MiniGroup icon="alma" n={4} />, say: 'négy alma' }, b: 4 },
      { a: { figure: <MiniGroup icon="alma" n={3} />, say: 'három alma' }, b: 3 },
      { a: { figure: <MiniGroup icon="alma" n={2} />, say: 'két alma' }, b: 2 },
      { a: { figure: <MiniGroup icon="alma" n={1} />, say: 'egy alma' }, b: 1 },
    ],
  },
  2: {
    say: 'Keresd meg, mi illik össze! Ugyanannyi legyen.',
    pairs: [
      { a: { figure: <Hand fingers={4} className="w-16 h-16" />, say: 'négy ujj' }, b: { figure: <Domino left={4} single className="w-14 h-14" />, say: 'négy pötty' } },
      { a: { figure: <Hand fingers={3} className="w-16 h-16" />, say: 'három ujj' }, b: { figure: <MiniGroup icon="hal" n={3} />, say: 'három hal' } },
      { a: { figure: <Hand fingers={0} className="w-16 h-16" />, say: 'ököl, nulla ujj' }, b: { figure: <MiniGroup icon="hal" n={0} />, say: 'üres doboz' } },
      { a: 4, b: { figure: <MiniGroup icon="katica" n={4} />, say: 'négy katica' } },
      { a: { figure: <KorongRow red={2} blue={2} className="w-28 h-10" />, say: 'két piros, két kék korong' }, b: { figure: <MiniGroup icon="virag" n={4} />, say: 'négy virág' } },
    ],
  },
  3: {
    say: 'Párosítsd a jelet a képhez! A kék pöttyök vannak elöl, a pirosak hátul.',
    pairs: [
      { a: '4 > 3', b: { figure: <DotsPair a={4} b={3} />, say: 'négy kék, három piros' } },
      { a: '2 < 4', b: { figure: <DotsPair a={2} b={4} />, say: 'két kék, négy piros' } },
      { a: '4 = 4', b: { figure: <DotsPair a={4} b={4} />, say: 'négy kék, négy piros' } },
      { a: '1 < 3', b: { figure: <DotsPair a={1} b={3} />, say: 'egy kék, három piros' } },
    ],
  },
};

export const A_NEGY_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Ahol négy van, az a négyes kosárba megy. Ahol nem négy, az a másikba.',
    bins: [
      { label: '4', figure: <BigSign text="4" className="w-12 h-12" />, say: 'négy' },
      { label: 'Nem 4', figure: <Clover leaves={3} className="w-12 h-12" />, say: 'nem négy' },
    ],
    items: [
      { item: { figure: <MiniGroup icon="eper" n={4} />, say: 'eprek' }, bin: 0 },
      { item: { figure: <MiniGroup icon="eper" n={2} />, say: 'eprek' }, bin: 1 },
      { item: { figure: <MiniGroup icon="labda" n={4} />, say: 'labdák' }, bin: 0 },
      { item: { figure: <MiniGroup icon="labda" n={3} />, say: 'labdák' }, bin: 1 },
      { item: { figure: <Clover leaves={4} className="w-16 h-16" />, say: 'lóhere' }, bin: 0 },
      { item: { figure: <MiniGroup icon="pillango" n={1} />, say: 'pillangó' }, bin: 1 },
      { item: { figure: <MiniGroup icon="gomba" n={4} />, say: 'gombák' }, bin: 0 },
    ],
  },
  2: {
    say: 'Négynél kevesebb, vagy pont négy? Tedd a jó kosárba!',
    bins: [
      { label: 'Kevesebb', figure: <MiniGroup icon="csillag" n={2} />, say: 'négynél kevesebb' },
      { label: '4', figure: <BigSign text="4" className="w-12 h-12" />, say: 'pont négy' },
    ],
    items: [
      { item: { figure: <Hand fingers={4} className="w-16 h-16" />, say: 'négy ujj' }, bin: 1 },
      { item: { figure: <Hand fingers={2} className="w-16 h-16" />, say: 'két ujj' }, bin: 0 },
      { item: { figure: <Domino left={4} single className="w-14 h-14" />, say: 'dominó' }, bin: 1 },
      { item: { figure: <Domino left={3} single className="w-14 h-14" />, say: 'dominó' }, bin: 0 },
      { item: { figure: <MiniGroup icon="hal" n={1} />, say: 'hal' }, bin: 0 },
      { item: { figure: <MiniGroup icon="madar" n={4} />, say: 'madarak' }, bin: 1 },
      { item: 3, bin: 0 },
      { item: 4, bin: 1 },
    ],
  },
  3: {
    say: 'Három kosár van: kettő, három, négy. Hová való?',
    bins: [
      { label: '2', say: 'kettő' },
      { label: '3', say: 'három' },
      { label: '4', say: 'négy' },
    ],
    items: [
      { item: { figure: <MiniGroup icon="level" n={2} />, say: 'levelek' }, bin: 0 },
      { item: { figure: <Hand fingers={3} className="w-16 h-16" />, say: 'három ujj' }, bin: 1 },
      { item: { figure: <Domino left={4} single className="w-14 h-14" />, say: 'dominó' }, bin: 2 },
      { item: { figure: <KorongRow red={1} blue={3} className="w-28 h-10" />, say: 'egy piros, három kék korong' }, bin: 2 },
      { item: { figure: <Domino left={2} single className="w-14 h-14" />, say: 'dominó' }, bin: 0 },
      { item: { figure: <MiniGroup icon="csiga" n={3} />, say: 'csigák' }, bin: 1 },
      { item: { figure: <DogFig className="w-20 h-16" />, say: 'kutya, négy láb' }, bin: 2 },
      { item: { figure: <BirdFig className="w-20 h-16" />, say: 'madár, két láb' }, bin: 0 },
    ],
  },
};

export const ANegyG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="5. A négy"
    badge="1. OSZTÁLY • II. SZÁMOLÁS 0-TÓL 5-IG • JÁTÉK"
    base="g1-c5-a-negy"
    chapterId="szamolas-5-ig"
    questions={A_NEGY_G1_QUESTIONS}
    pairs={A_NEGY_G1_PAIRS}
    sort={A_NEGY_G1_SORT}
    {...props}
  />
);

export default ANegyG1Jatek;
