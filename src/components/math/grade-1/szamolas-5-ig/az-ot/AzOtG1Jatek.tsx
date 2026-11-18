import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { Domino, Hand, IconGroup, NumberLine, BigSign } from '../../shared/G1Pics';
import { CompareScene, DotsPair, FruitName, GroupBox, MiniGroup, NumberHouse, RowScene, TreeScene, drawThing } from '../a-negy/ANegyG1Scenes';
import { BasketFig, DieKorongs, RowsCompareScene, ScarecrowScene, StarfishFig, WheelbarrowScene } from './AzOtG1Scenes';

const pic = (icon: FruitName, n: number, say: string) => ({ figure: <GroupBox icon={icon} n={n} />, say });
const dom = (n: number, say: string) => ({ figure: <Domino left={n} single />, say });
const hand = (n: number, say: string) => ({ figure: <Hand fingers={n} />, say });

const TwoBaskets: React.FC<{ a: number; b: number }> = ({ a, b }) => (
  <svg viewBox="0 0 320 140">
    <svg x="0" y="0" width="120" height="100" viewBox="0 0 120 100">
      <BasketFig n={a} className="" />
    </svg>
    <svg x="200" y="0" width="120" height="100" viewBox="0 0 120 100">
      <BasketFig n={b} className="" />
    </svg>
    {drawThing('meh', 60, 120, 1)}
    {drawThing('csiga', 260, 120, 1)}
  </svg>
);

export const AZ_OT_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – felismerés, számlálás
  { id: 'o1', level: 1, badge: 'Ujjkép', ask: 'Hány ujj van fent?', scene: <Hand fingers={5} className="w-32 h-32 mx-auto" />, options: [5, 4, 3], hint: 'Mind fent van! Számold meg mindet, a hüvelykujjat is!' },
  { id: 'o2', level: 1, badge: 'Öt elem', ask: 'Hol van 5 csillag?', options: [pic('csillag', 5, 'öt csillag'), pic('csillag', 4, 'négy csillag'), pic('csillag', 3, 'három csillag')], hint: 'Számold meg a csillagokat mindegyik képen!' },
  { id: 'o3', level: 1, badge: 'Számjegy', ask: 'Melyik az ötös?', options: [{ figure: <BigSign text="5" />, say: 'ötös' }, { figure: <BigSign text="2" />, say: 'kettes' }, { figure: <BigSign text="3" />, say: 'hármas' }], hint: 'Az ötösnek kalapja van felül, és kerek pocakja lent.' },
  { id: 'o4', level: 1, badge: 'Dominó', ask: 'Hány pötty van rajta?', say: 'Hány pötty van a dominón?', scene: <Domino left={5} single className="w-32 h-32 mx-auto" />, options: [5, 4, 3], hint: 'Négy a sarkokban, és egy középen. Számold meg mind!' },
  { id: 'o5', level: 1, badge: 'Számlálás', ask: 'Hány szilva van a fán?', scene: <TreeScene fruit="szilva" n={5} />, options: [5, 4, 2], hint: 'Mutass rá minden szilvára, egyiket se hagyd ki!' },
  { id: 'o6', level: 1, badge: 'Ujjkép', ask: 'Melyik kéz mutat 5-öt?', options: [hand(5, 'öt ujj'), hand(4, 'négy ujj'), hand(3, 'három ujj')], hint: 'Az ötnél minden ujj fent van.' },
  { id: 'o7', level: 1, badge: 'Számlálás', ask: 'Hány hal úszik?', scene: <RowScene icon="hal" n={5} bg="#bae6fd" />, options: [5, 4, 3], hint: 'Számold meg a halakat balról jobbra!' },
  { id: 'o8', level: 1, badge: 'Dominó', ask: 'Hol van 5 pötty?', options: [dom(5, 'öt pötty'), dom(4, 'négy pötty'), dom(3, 'három pötty')], hint: 'Az ötösnél középen is van egy pötty.' },
  // 2. szint – számegyenes, párosítás, mennyivel több, bontás
  { id: 'o9', level: 2, badge: 'Számegyenes', ask: 'Melyik szám jön ide?', say: 'Melyik szám kell a kérdőjel helyére a számegyenesen?', scene: <NumberLine max={5} question={5} />, options: [5, 4, 3], hint: 'A négy után melyik szám jön?' },
  { id: 'o10', level: 2, badge: 'Számsor', ask: 'Melyik szám hiányzik?', say: 'Nulla, egy, kettő, három, valami, öt. Melyik szám hiányzik?', scene: <NumberLine max={5} question={4} />, options: [4, 3, 5], hint: 'Mondd végig: nulla, egy, kettő, három, …' },
  { id: 'o11', level: 2, badge: 'Párosítás', ask: 'Melyik kép illik az 5-höz?', scene: <BigSign text="5" className="w-24 h-24 mx-auto" />, options: [pic('eper', 5, 'öt eper'), pic('eper', 4, 'négy eper'), pic('eper', 3, 'három eper')], hint: 'Az ötöshöz öt eper kell. Számold meg!' },
  { id: 'o12', level: 2, badge: 'Mennyivel több', ask: 'Mennyivel több az alma?', say: 'Fent almák, lent körték. Mennyivel több az alma, mint a körte?', scene: <RowsCompareScene a={5} b={4} iconA="alma" />, options: [1, 2, 0], hint: 'Hány almának nem jut körte alatta?' },
  { id: 'o13', level: 2, badge: 'Bontás', ask: 'Hány kék korong van?', say: 'Öt korong van, négy piros. Hány kék korong van?', scene: <DieKorongs red={4} className="w-40 h-32 mx-auto" />, options: [1, 4, 2], hint: 'Csak a kék korongokat számold!' },
  { id: 'o14', level: 2, badge: 'Kevesebb, több', ask: 'Hol van 5-nél kevesebb?', say: 'Melyik képen van ötnél kevesebb virág?', options: [pic('virag', 3, 'három virág'), pic('virag', 5, 'öt virág')], hint: 'Ott pont öt virág van. Hol van kevesebb?' },
  { id: 'o15', level: 2, badge: 'Kiegészítés', ask: 'Hány tök fér még bele?', say: 'Öt tök fér a talicskába. Hány tök fér még bele? Számold meg az üres helyeket!', scene: <WheelbarrowScene n={3} empty={2} />, options: [2, 1, 3], hint: 'Csak a szaggatott, üres helyeket számold!' },
  { id: 'o16', level: 2, badge: 'Számegyenes', ask: 'Melyik számra mutat a pötty?', say: 'Melyik számnál van a piros pötty?', scene: <NumberLine max={5} mark={[5]} hideLabels={[5]} />, options: [5, 4, 3], hint: 'Számold a lépéseket a nullától!' },
  // 3. szint – összehasonlítás, mennyivel több, bontás, kis történetek
  { id: 'o17', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: 'Öt labda, és három labda. Melyik jel kell középre?', scene: <CompareScene icon="labda" a={5} b={3} />, options: ['>', '<', '='], hint: 'A jel hegye arra mutat, ahol kevesebb van.' },
  { id: 'o18', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: 'Négy gomba, és öt gomba. Melyik jel kell középre?', scene: <CompareScene icon="gomba" a={4} b={5} />, options: ['<', '>', '='], hint: 'Bal oldalon kevesebb van. A hegye a kevesebb felé mutat.' },
  { id: 'o19', level: 3, badge: 'Ugyanannyi', ask: 'Melyik jel kell?', say: 'Öt alma, és öt alma. Melyik jel kell középre?', scene: <CompareScene icon="alma" a={5} b={5} />, options: ['=', '<', '>'], hint: 'Számold meg mindkét oldalt! Ugyanannyi?' },
  { id: 'o20', level: 3, badge: 'Mennyivel több', ask: 'Mennyivel több a szilva?', say: 'Fent öt szilva, lent három körte. Mennyivel több a szilva?', scene: <RowsCompareScene a={5} b={3} />, options: [2, 1, 3], hint: 'Párosítsd őket! Hány szilvának nem jut körte?' },
  { id: 'o21', level: 3, badge: 'Számsor', ask: 'Mi jön a 4 után?', say: 'Melyik szám jön a négy után?', scene: <NumberLine max={5} mark={[4]} hideLabels={[5]} />, options: [5, 3, 0], hint: 'Egy lépés előre a négytől.' },
  { id: 'o22', level: 3, badge: 'Bontás', ask: 'Hány madár bújt el?', say: 'A madárijesztőn öt madár pihen. A bal vállán egy ül. A jobb vállát eltakarja egy kendő. Hány madár ül ott?', scene: <ScarecrowScene left={1} right="?" total={5} />, options: [4, 3, 5], hint: 'Mutass fel öt ujjat! Egy ujj a bal váll madara. A többi ujj a jobb vállé. Hány az?' },
  { id: 'o23', level: 3, badge: 'Párosítás', ask: 'Melyik illik a kézhez?', say: 'A kéz öt ujjat mutat. Melyik dominó illik hozzá?', scene: <Hand fingers={5} className="w-28 h-28 mx-auto" />, options: [dom(5, 'öt pötty'), dom(4, 'négy pötty'), dom(3, 'három pötty')], hint: 'Öt ujj, öt pötty.' },
  { id: 'o24', level: 3, badge: 'Több', ask: 'Ki szedett több szilvát?', say: 'Zümi öt szilvát szedett, Csigusz négyet. Ki szedett többet?', scene: <TwoBaskets a={5} b={4} />, options: [{ figure: <IconGroup icon="meh" n={1} className="w-16 h-16" />, say: 'Zümi' }, { figure: <IconGroup icon="csiga" n={1} className="w-16 h-16" />, say: 'Csigusz' }], hint: 'Számold meg mindkét kosarat! Az öt több, mint a négy.' },
];

export const AZ_OT_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Koppints bal oldalon egy képre, aztán jobb oldalon a hozzá illő számra!',
    pairs: [
      { a: { figure: <MiniGroup icon="szilva" n={5} />, say: 'öt szilva' }, b: 5 },
      { a: { figure: <MiniGroup icon="szilva" n={4} />, say: 'négy szilva' }, b: 4 },
      { a: { figure: <MiniGroup icon="szilva" n={3} />, say: 'három szilva' }, b: 3 },
      { a: { figure: <MiniGroup icon="szilva" n={0} />, say: 'üres doboz' }, b: 0 },
    ],
  },
  2: {
    say: 'Keresd meg, mi illik össze! Ugyanannyi legyen.',
    pairs: [
      { a: { figure: <Hand fingers={5} className="w-16 h-16" />, say: 'öt ujj' }, b: { figure: <Domino left={5} single className="w-14 h-14" />, say: 'öt pötty' } },
      { a: { figure: <StarfishFig className="w-16 h-16" />, say: 'tengeri csillag, öt kar' }, b: 5 },
      { a: { figure: <Hand fingers={4} className="w-16 h-16" />, say: 'négy ujj' }, b: { figure: <MiniGroup icon="korte" n={4} />, say: 'négy körte' } },
      { a: { figure: <Domino left={2} single className="w-14 h-14" />, say: 'két pötty' }, b: { figure: <MiniGroup icon="tok" n={2} />, say: 'két tök' } },
      { a: { figure: <DieKorongs red={2} className="w-24 h-20" />, say: 'két piros, három kék korong' }, b: { figure: <NumberHouse top={5} left={2} right={3} className="w-20 h-20" />, say: 'öt: kettő és három' } },
    ],
  },
  3: {
    say: 'Párosítsd a jelet a képhez! A kék pöttyök vannak elöl, a pirosak hátul.',
    pairs: [
      { a: '5 > 4', b: { figure: <DotsPair a={5} b={4} />, say: 'öt kék, négy piros' } },
      { a: '3 < 5', b: { figure: <DotsPair a={3} b={5} />, say: 'három kék, öt piros' } },
      { a: '5 = 5', b: { figure: <DotsPair a={5} b={5} />, say: 'öt kék, öt piros' } },
      { a: '2 > 1', b: { figure: <DotsPair a={2} b={1} />, say: 'két kék, egy piros' } },
    ],
  },
};

export const AZ_OT_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Ahol öt van, az az ötös kosárba megy. Ahol nem öt, az a másikba.',
    bins: [
      { label: '5', figure: <BigSign text="5" className="w-12 h-12" />, say: 'öt' },
      { label: 'Nem 5', figure: <MiniGroup icon="csillag" n={2} />, say: 'nem öt' },
    ],
    items: [
      { item: { figure: <MiniGroup icon="szilva" n={5} />, say: 'szilvák' }, bin: 0 },
      { item: { figure: <MiniGroup icon="szilva" n={3} />, say: 'szilvák' }, bin: 1 },
      { item: { figure: <Hand fingers={5} className="w-16 h-16" />, say: 'öt ujj' }, bin: 0 },
      { item: { figure: <Hand fingers={4} className="w-16 h-16" />, say: 'négy ujj' }, bin: 1 },
      { item: { figure: <StarfishFig className="w-16 h-16" />, say: 'tengeri csillag' }, bin: 0 },
      { item: { figure: <MiniGroup icon="tok" n={1} />, say: 'tök' }, bin: 1 },
      { item: { figure: <MiniGroup icon="virag" n={5} />, say: 'virágok' }, bin: 0 },
    ],
  },
  2: {
    say: 'Ötnél kevesebb, vagy pont öt? Tedd a jó kosárba!',
    bins: [
      { label: 'Kevesebb', figure: <MiniGroup icon="csillag" n={3} />, say: 'ötnél kevesebb' },
      { label: '5', figure: <BigSign text="5" className="w-12 h-12" />, say: 'pont öt' },
    ],
    items: [
      { item: { figure: <Domino left={5} single className="w-14 h-14" />, say: 'dominó' }, bin: 1 },
      { item: { figure: <Domino left={4} single className="w-14 h-14" />, say: 'dominó' }, bin: 0 },
      { item: { figure: <MiniGroup icon="madar" n={5} />, say: 'madarak' }, bin: 1 },
      { item: { figure: <MiniGroup icon="madar" n={2} />, say: 'madarak' }, bin: 0 },
      { item: { figure: <DieKorongs red={1} className="w-24 h-20" />, say: 'öt korong' }, bin: 1 },
      { item: { figure: <Hand fingers={3} className="w-16 h-16" />, say: 'három ujj' }, bin: 0 },
      { item: 5, bin: 1 },
      { item: 4, bin: 0 },
    ],
  },
  3: {
    say: 'Három kosár van: három, négy, öt. Hová való?',
    bins: [
      { label: '3', say: 'három' },
      { label: '4', say: 'négy' },
      { label: '5', say: 'öt' },
    ],
    items: [
      { item: { figure: <MiniGroup icon="korte" n={3} />, say: 'körték' }, bin: 0 },
      { item: { figure: <Hand fingers={4} className="w-16 h-16" />, say: 'négy ujj' }, bin: 1 },
      { item: { figure: <Domino left={5} single className="w-14 h-14" />, say: 'dominó' }, bin: 2 },
      { item: { figure: <DotsPair a={2} b={2} />, say: 'két kék, két piros pötty' }, bin: 1 },
      { item: { figure: <DieKorongs red={3} className="w-24 h-20" />, say: 'három piros, két kék korong' }, bin: 2 },
      { item: { figure: <Domino left={3} single className="w-14 h-14" />, say: 'dominó' }, bin: 0 },
      { item: { figure: <StarfishFig className="w-16 h-16" />, say: 'tengeri csillag' }, bin: 2 },
      { item: { figure: <MiniGroup icon="gomba" n={4} />, say: 'gombák' }, bin: 1 },
    ],
  },
};

export const AzOtG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="6. Az öt"
    badge="1. OSZTÁLY • II. SZÁMOLÁS 0-TÓL 5-IG • JÁTÉK"
    base="g1-c5-az-ot"
    chapterId="szamolas-5-ig"
    questions={AZ_OT_G1_QUESTIONS}
    pairs={AZ_OT_G1_PAIRS}
    sort={AZ_OT_G1_SORT}
    {...props}
  />
);

export default AzOtG1Jatek;
