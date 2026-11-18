import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { BigSign, IconName, TenFrame } from '../../shared/G1Pics';
import { GroupBox, MiniGroup } from '../a-ketto/AKettoG1Scenes';
import { FriendsScene } from '../a-harom/AHaromG1Scenes';
import { BackJumpScene, BranchScene, FlyAwayScene, PicnicScene, PlateScene, SentenceScene, SentenceStrip } from './Kivonas0Tol5IgG1Scenes';

const sm = (node: React.ReactNode, say: string) => ({ figure: node, say });
const crossedPic = (icon: IconName, n: number, crossed: number, say: string) => sm(<GroupBox icon={icon} n={n} crossed={crossed} />, say);
const miniCrossed = (icon: IconName, n: number, crossed: number, say: string) => sm(<GroupBox icon={icon} n={n} crossed={crossed} className="w-24 h-20" />, say);
const tf = (n: number, crossed: number, say: string, second = 0) => sm(<TenFrame n={n} second={second} crossed={crossed} className="w-28 h-auto" />, say);

export const KIVONAS_0_TOL_5_IG_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – képről: mennyi maradt?
  { id: 'k1', level: 1, badge: 'Elrepül', ask: 'Hány madár maradt a kerítésen?', say: 'A kerítésen 3 madár ült. 1 elrepült. Hány madár maradt a kerítésen?', scene: <FlyAwayScene icon="madar" stay={2} gone={1} />, options: [2, 3, 1], hint: 'Csak azokat számold, amelyek még a kerítésen ülnek!' },
  { id: 'k2', level: 1, badge: 'Megeszik', ask: 'Hány eper maradt?', say: 'Csigusz megevett 1 epret a 4-ből. Hány egész eper maradt a levélen?', scene: <PicnicScene total={4} eaten={1} />, options: [3, 4, 2], hint: 'A zöld kalapokat ne számold, azokat már megette!' },
  { id: 'k3', level: 1, badge: 'Áthúzás', ask: 'Hány korong maradt?', say: 'Pötyi 5 korongot rakott ki, és 1-et áthúzott. Hány korong maradt?', scene: <TenFrame n={5} crossed={1} />, options: [4, 5, 1], hint: 'Az áthúzott korongot ne számold!' },
  { id: 'k4', level: 1, badge: 'Mínusz jel', ask: 'Melyik a mínusz jel?', say: 'Melyik a kivonás jele, a mínusz?', options: [sm(<BigSign text="−" />, 'mínusz'), sm(<BigSign text="+" />, 'plusz'), sm(<BigSign text="=" />, 'egyenlő')], hint: 'A mínusz egyetlen kis vízszintes vonal.' },
  { id: 'k5', level: 1, badge: 'Áthúzás', ask: 'Hol húztunk át kettőt?', say: 'Melyik képen húztunk át pontosan 2 gombát?', options: [crossedPic('gomba', 4, 2, 'négy gomba, kettő áthúzva'), crossedPic('gomba', 4, 1, 'négy gomba, egy áthúzva'), crossedPic('gomba', 4, 3, 'négy gomba, három áthúzva')], hint: 'Számold meg az áthúzott gombákat! Kettő legyen.' },
  { id: 'k6', level: 1, badge: 'Elveszi', ask: 'Hány alma maradt a tányéron?', say: 'A tányéron 5 alma volt. Pötyi elvett 2-t a barátainak. Hány alma maradt a tányéron?', scene: <PlateScene icon="alma" total={5} taken={2} />, options: [3, 2, 5], hint: 'Csak a tányéron lévő almákat számold!' },
  { id: 'k7', level: 1, badge: 'Elrepül', ask: 'Hány méh maradt a virágon?', say: '2 méh ült a virágokon. 1 elrepült. Hány méh maradt?', scene: <FlyAwayScene icon="meh" stay={1} gone={1} perch="flower" />, options: [1, 2, 0], hint: 'Nézd a virágokat! Hány virágon ül még méh?' },
  { id: 'k8', level: 1, badge: 'Elrepül', ask: 'Hány pillangó maradt?', say: '5 pillangó ült a virágokon. 2 elrepült. Hány pillangó maradt a virágokon?', scene: <FlyAwayScene icon="pillango" stay={3} gone={2} perch="flower" />, options: [3, 5, 2], hint: 'A repülőket ne számold, csak a virágon ülőket!' },
  // 2. szint – kép és kivonás összekötése, 0 elvétele
  { id: 'k9', level: 2, badge: 'Melyik kivonás?', ask: 'Melyik kivonás illik a képhez?', say: '4 madár ült a kerítésen, aztán 1 elrepült. Melyik kivonás illik a képhez?', scene: <FlyAwayScene icon="madar" stay={3} gone={1} />, options: ['4 − 1 = 3', '4 − 3 = 1', '3 + 1 = 4'], hint: 'Hány madár volt összesen? Ezzel kezdődik a kivonás.' },
  { id: 'k10', level: 2, badge: 'Kivonás', ask: 'Mennyi 3 − 1?', scene: <SentenceScene icon="hal" a={3} b={1} />, options: [2, 3, 4], hint: 'Az áthúzott halat ne számold! A többi marad.' },
  { id: 'k11', level: 2, badge: 'Kivonás', ask: 'Mennyi 5 − 3?', scene: <TenFrame n={5} crossed={3} />, options: [2, 3, 1], hint: 'Az áthúzott korongokat ne számold!' },
  { id: 'k12', level: 2, badge: 'Nulla elvétele', ask: 'Mennyi 4 − 0?', say: 'A kerítésen 4 madár ül. Egy sem repült el. Mennyi 4 − 0?', scene: <FlyAwayScene icon="madar" stay={4} gone={0} />, options: [4, 0, 3], hint: 'Ha nem veszünk el semmit, ugyanannyi marad.' },
  { id: 'k13', level: 2, badge: 'Mindet elveszi', ask: 'Mennyi 3 − 3?', say: 'A levélen 3 eper volt, és Csigusz mind a 3-at megette. Mennyi 3 − 3?', scene: <PicnicScene total={3} eaten={3} />, options: [0, 3, 1], hint: 'Ha mindet megette, maradt-e még egész eper?' },
  { id: 'k14', level: 2, badge: 'Kép a kivonáshoz', ask: 'Melyik kép illik: 5 − 1?', say: 'Melyik kép illik ehhez a kivonáshoz: 5 − 1?', options: [crossedPic('alma', 5, 1, 'öt alma, egy áthúzva'), crossedPic('alma', 4, 1, 'négy alma, egy áthúzva'), crossedPic('alma', 5, 2, 'öt alma, kettő áthúzva')], hint: '5 alma legyen összesen, és abból 1 legyen áthúzva.' },
  { id: 'k15', level: 2, badge: 'Számegyenes', ask: 'Hová ért Csigusz?', say: 'Csigusz a 4-ről indult, és 2-t lépett vissza a számegyenesen. Hová ért?', scene: <BackJumpScene from={4} steps={2} />, options: [2, 1, 3], hint: 'Lépj vissza a kisebb számok felé, ívenként egyet!' },
  { id: 'k16', level: 2, badge: 'Elveszi', ask: 'Hány eper maradt a tányéron?', say: 'A tányéron 2 eper volt. Pötyi elvett 1-et. Hány eper maradt a tányéron?', scene: <PlateScene icon="eper" total={2} taken={1} />, options: [1, 2, 0], hint: 'Csak a tányéron lévő epret számold!' },
  // 3. szint – kis történetek, összehasonlítás, két lépés
  { id: 'k17', level: 3, badge: 'Történet', ask: 'Hány levél maradt az ágon?', say: 'Az ágon 3 levél volt. Jött a szél, és 2 levél leesett. Hány levél maradt az ágon?', options: [sm(<MiniGroup icon="level" n={1} />, 'egy levél'), sm(<MiniGroup icon="level" n={2} />, 'két levél'), sm(<MiniGroup icon="level" n={3} />, 'három levél')], hint: 'Mutass fel 3 ujjat, és hajts le 2-t! Hány ujj maradt fent?' },
  { id: 'k18', level: 3, badge: 'Hány esett le?', ask: 'Hány levél esett le?', say: 'Az ágon 3 levél volt. Most már csak 1 van ott. Hány levél esett le?', scene: <BranchScene stay={1} fell={2} />, options: [2, 1, 3], hint: 'Nézd meg a földet! Ott vannak a lehullott levelek.' },
  { id: 'k19', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: 'Bal oldalon 5 − 2, jobb oldalon 2. Melyik jel kell a kérdőjel helyére?', scene: <SentenceStrip text="5 − 2  ?  2" />, options: ['>', '<', '='], hint: 'Előbb számold ki: mennyi 5 − 2? Aztán hasonlítsd a 2-höz!' },
  { id: 'k20', level: 3, badge: 'Kakukktojás', ask: 'Melyiknek NEM 2 az eredménye?', say: 'Két kivonásnak 2 az eredménye. Melyiknek nem?', options: ['3 − 2', '4 − 2', '5 − 3'], hint: 'Számold ki mindegyiket az ujjaidon!' },
  { id: 'k21', level: 3, badge: 'Hol marad több?', ask: 'Hol marad több?', say: 'Hol marad több korong? 4 − 1, vagy 4 − 3?', options: [tf(4, 1, '4 − 1'), tf(4, 3, '4 − 3')], hint: 'Számold meg, hány korong nincs áthúzva!' },
  { id: 'k22', level: 3, badge: 'Melyik kivonás?', ask: 'Elveszi a kéket. Melyik illik?', say: 'Pötyi 3 piros és 2 kék korongot rakott ki. Aztán elvette a 2 kéket. Melyik kivonás illik a képhez?', scene: <TenFrame n={3} second={2} crossed={2} />, options: ['5 − 2 = 3', '5 − 3 = 2', '3 + 2 = 5'], hint: 'Hány korong volt összesen? Hányat húztunk át?' },
  { id: 'k23', level: 3, badge: 'Két lépés', ask: 'Hány almája maradt Pötyinek?', say: 'Pötyinek 4 almája volt. Adott 1-et Züminek, és 1-et Csigusznak. Hány almája maradt?', scene: <FriendsScene />, options: [2, 3, 1], hint: 'Előbb Zümi kap egyet, aztán Csigusz is egyet. Lépj vissza kettőt!' },
  { id: 'k24', level: 3, badge: 'Eggyel kevesebb', ask: 'Csigusznak eggyel kevesebb van. Hány?', say: 'Pötyinek 5 epre van. Csigusznak eggyel kevesebb. Hány epre van Csigusznak?', scene: <GroupBox icon="eper" n={5} className="w-40 h-32 mx-auto" />, options: [4, 5, 3], hint: 'Eggyel kevesebb: lépj vissza egyet az 5-ről!' },
];

export const KIVONAS_0_TOL_5_IG_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Az áthúzottakat ne számold. Hány maradt?',
    pairs: [
      { a: miniCrossed('eper', 3, 1, 'három eper, egy áthúzva'), b: 2 },
      { a: miniCrossed('eper', 4, 4, 'négy eper, mind áthúzva'), b: 0 },
      { a: miniCrossed('eper', 5, 2, 'öt eper, kettő áthúzva'), b: 3 },
      { a: miniCrossed('eper', 2, 1, 'két eper, egy áthúzva'), b: 1 },
    ],
  },
  2: {
    say: 'Melyik kivonás melyik képhez illik? Keresd meg a párját!',
    pairs: [
      { a: '5 − 1', b: tf(5, 1, 'öt korong, egy áthúzva') },
      { a: '3 − 2', b: tf(3, 2, 'három korong, kettő áthúzva') },
      { a: '4 − 4', b: tf(4, 4, 'négy korong, mind áthúzva') },
      { a: '2 − 0', b: tf(2, 0, 'két korong, semmi sincs áthúzva') },
    ],
  },
  3: {
    say: 'Számold ki, és párosítsd a kivonást az eredményével!',
    pairs: [
      { a: '5 − 2', b: 3 },
      { a: '4 − 3', b: 1 },
      { a: '3 − 3', b: 0 },
      { a: '5 − 0', b: 5 },
      { a: '4 − 2', b: 2 },
    ],
  },
};

export const KIVONAS_0_TOL_5_IG_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Maradt még valami, vagy semmi sem maradt? Az áthúzottakat ne számold!',
    bins: [
      { label: 'Maradt', figure: <MiniGroup icon="alma" n={1} />, say: 'maradt még' },
      { label: 'Semmi', figure: <MiniGroup icon="alma" n={0} />, say: 'semmi sem maradt' },
    ],
    items: [
      { item: miniCrossed('alma', 3, 1, 'három alma, egy áthúzva'), bin: 0 },
      { item: miniCrossed('alma', 2, 2, 'két alma, mind áthúzva'), bin: 1 },
      { item: miniCrossed('alma', 4, 0, 'négy alma, semmi sincs áthúzva'), bin: 0 },
      { item: miniCrossed('alma', 5, 5, 'öt alma, mind áthúzva'), bin: 1 },
      { item: miniCrossed('alma', 1, 1, 'egy alma, áthúzva'), bin: 1 },
      { item: miniCrossed('alma', 3, 2, 'három alma, kettő áthúzva'), bin: 0 },
    ],
  },
  2: {
    say: 'Mennyi maradt? Tedd a jó kosárba: egy, kettő vagy három!',
    bins: [
      { label: '1', say: 'egy' },
      { label: '2', say: 'kettő' },
      { label: '3', say: 'három' },
    ],
    items: [
      { item: '3 − 2', bin: 0 },
      { item: '4 − 2', bin: 1 },
      { item: '5 − 2', bin: 2 },
      { item: tf(2, 1, 'két korong, egy áthúzva'), bin: 0 },
      { item: tf(5, 3, 'öt korong, három áthúzva'), bin: 1 },
      { item: '4 − 1', bin: 2 },
      { item: tf(3, 0, 'három korong, semmi sincs áthúzva'), bin: 2 },
      { item: '2 − 0', bin: 1 },
    ],
  },
  3: {
    say: 'Kevesebb lett, vagy ugyanannyi maradt? Gondold végig: elvettünk valamit?',
    bins: [
      { label: 'Kevesebb lett', figure: <SentenceStrip text="4 − 1" className="w-20 h-auto" />, say: 'kevesebb lett' },
      { label: 'Ugyanannyi', figure: <SentenceStrip text="4 − 0" className="w-20 h-auto" />, say: 'ugyanannyi maradt' },
    ],
    items: [
      { item: '5 − 2', bin: 0 },
      { item: '3 − 0', bin: 1 },
      { item: '2 − 1', bin: 0 },
      { item: '5 − 0', bin: 1 },
      { item: '1 − 1', bin: 0 },
      { item: '2 − 0', bin: 1 },
      { item: '4 − 3', bin: 0 },
      { item: '1 − 0', bin: 1 },
    ],
  },
};

export const Kivonas0Tol5IgG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="8. Kivonás 0-tól 5-ig"
    badge="1. OSZTÁLY • II. SZÁMOLÁS 0-TÓL 5-IG • JÁTÉK"
    base="g1-c5-kivonas-0-tol-5-ig"
    chapterId="szamolas-5-ig"
    questions={KIVONAS_0_TOL_5_IG_G1_QUESTIONS}
    pairs={KIVONAS_0_TOL_5_IG_G1_PAIRS}
    sort={KIVONAS_0_TOL_5_IG_G1_SORT}
    {...props}
  />
);

export default Kivonas0Tol5IgG1Jatek;
