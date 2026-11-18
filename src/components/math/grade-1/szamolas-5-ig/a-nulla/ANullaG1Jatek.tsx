import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { Domino, Hand, NumberLine, BigSign, IconName } from '../../shared/G1Pics';
import { CompareScene, DotPairs, GroupBox, MiniGroup } from '../a-ketto/AKettoG1Scenes';
import { BasketBox, BeforeAfterScene, BugCard, NestScene, SnailBasketScene } from './ANullaG1Scenes';

const pic = (icon: IconName, n: number, say: string) => ({ figure: <GroupBox icon={icon} n={n} />, say });
const dom = (n: number, say: string) => ({ figure: <Domino left={n} single />, say });
const hand = (n: number, say: string) => ({ figure: <Hand fingers={n} />, say });
const basket = (n: number, say: string) => ({ figure: <BasketBox n={n} />, say });
const bug = (n: number, say: string) => ({ figure: <BugCard dots={n} />, say });
const sm = (node: React.ReactNode, say: string) => ({ figure: node, say });

export const A_NULLA_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – az üres felismerése
  { id: 'n1', level: 1, badge: 'Nulla', ask: 'Hány tojás van a fészekben?', scene: <NestScene eggs={0} />, options: [0, 1, 2], hint: 'Nézd meg jól! Látsz tojást? Ha nincs egy sem, az nulla.' },
  { id: 'n2', level: 1, badge: 'Nulla', ask: 'Hol van nulla alma?', options: [basket(0, 'üres kosár'), basket(1, 'egy alma'), basket(2, 'két alma')], hint: 'A nulla: nincs benne semmi. Keresd az üres kosarat!' },
  { id: 'n3', level: 1, badge: 'Számjegy', ask: 'Melyik a nulla?', options: [{ figure: <BigSign text="0" />, say: 'nulla' }, { figure: <BigSign text="1" />, say: 'egyes' }, { figure: <BigSign text="2" />, say: 'kettes' }], hint: 'A nulla kerek, mint egy tojás.' },
  { id: 'n4', level: 1, badge: 'Ujjkép', ask: 'Melyik kéz mutat nullát?', options: [hand(0, 'ököl'), hand(1, 'egy ujj'), hand(2, 'két ujj')], hint: 'Nulla ujj: egy ujj sincs fent. Az ököl!' },
  { id: 'n5', level: 1, badge: 'Dominó', ask: 'Melyik dominón nincs pötty?', options: [dom(0, 'üres dominó'), dom(1, 'egy pötty'), dom(2, 'két pötty')], hint: 'Keresd az üres dominót!' },
  { id: 'n6', level: 1, badge: 'Számlálás', ask: 'Hány tojás van a fészekben?', scene: <NestScene eggs={2} />, options: [2, 0, 1], hint: 'Mutass rá mindegyik tojásra!' },
  { id: 'n7', level: 1, badge: 'Nulla', ask: 'Melyik katicának nincs pöttye?', options: [bug(0, 'nulla pötty'), bug(1, 'egy pötty'), bug(2, 'két pötty')], hint: 'Nézd meg a hátukat! Melyik piros hát üres?' },
  { id: 'n8', level: 1, badge: 'Nulla', ask: 'Hány hal van a dobozban?', scene: <GroupBox icon="hal" n={0} className="w-48 h-40 mx-auto" />, options: [0, 1, 2], hint: 'A doboz üres. Mennyi az, ha nincs semmi?' },
  // 2. szint – számegyenes, párosítás, mi maradt
  { id: 'n9', level: 2, badge: 'Számegyenes', ask: 'Melyik szám kell a ? helyére?', say: 'Melyik szám kell a kérdőjel helyére? A számegyenes elején vagyunk.', scene: <NumberLine max={5} question={0} />, options: [0, 1, 2], hint: 'A számegyenes a nullával kezdődik.' },
  { id: 'n10', level: 2, badge: 'Párosítás', ask: 'Melyik kép illik a 0-hoz?', scene: <BigSign text="0" className="w-24 h-24 mx-auto" />, options: [pic('eper', 0, 'üres doboz'), pic('eper', 1, 'egy eper'), pic('eper', 2, 'két eper')], hint: 'A nullához nem kell semmi. Az üres doboz illik hozzá.' },
  { id: 'n11', level: 2, badge: 'Ujjkép', ask: 'Hány ujj van fent?', scene: <Hand fingers={0} className="w-32 h-32 mx-auto" />, options: [0, 1, 2], hint: 'Ez egy ököl. Egy ujj sincs fent.' },
  { id: 'n12', level: 2, badge: 'Dominó', ask: 'Melyik dominó illik a 0-hoz?', scene: <BigSign text="0" className="w-24 h-24 mx-auto" />, options: [dom(0, 'üres dominó'), dom(1, 'egy pötty'), dom(2, 'két pötty')], hint: 'A nullához nulla pötty illik: üres dominó.' },
  { id: 'n13', level: 2, badge: 'Mi maradt?', ask: 'Hány levél maradt?', say: 'Két levél volt itt. Csigusz megette mindet. Hány levél maradt?', scene: <BeforeAfterScene icon="level" before={2} after={0} />, options: [0, 1, 2], hint: 'Nézd a jobb oldali képet! Van ott levél?' },
  { id: 'n14', level: 2, badge: 'Számegyenes', ask: 'Melyik számnál van a pötty?', say: 'Melyik számnál van a piros pötty?', scene: <NumberLine max={5} mark={[0]} hideLabels={[0]} />, options: [0, 1, 2], hint: 'A pötty a számegyenes legelején van.' },
  { id: 'n15', level: 2, badge: 'Nulla', ask: 'Melyik NEM üres?', options: [basket(1, 'egy alma'), basket(0, 'üres kosár'), pic('gomba', 0, 'üres doboz')], hint: 'Kettő üres. Hol van benne valami?' },
  { id: 'n16', level: 2, badge: 'Számegyenes', ask: 'Mi jön a 0 után?', say: 'Mi jön a nulla után a számegyenesen?', scene: <NumberLine max={4} question={1} hideLabels={[2, 3, 4]} />, options: [1, 2, 0], hint: 'Egy lépés a nullától.' },
  // 3. szint – összehasonlítás, kis történetek
  { id: 'n17', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: 'Nulla alma, és egy alma. Melyik jel kell középre?', scene: <CompareScene icon="alma" a={0} b={1} />, options: ['<', '>', '='], hint: 'Az üres doboz a kevesebb. A jel hegye arra mutat.' },
  { id: 'n18', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: 'Két hal, és nulla hal. Melyik jel kell középre?', scene: <CompareScene icon="hal" a={2} b={0} />, options: ['>', '<', '='], hint: 'Jobb oldalon nincs semmi. A hegye arra mutasson!' },
  { id: 'n19', level: 3, badge: 'Ugyanannyi', ask: 'Melyik jel kell?', say: 'Üres doboz, és üres doboz. Melyik jel kell középre?', scene: <CompareScene icon="labda" a={0} b={0} />, options: ['=', '<', '>'], hint: 'Mindkettőben nulla van. Az ugyanannyi.' },
  { id: 'n20', level: 3, badge: 'Mi maradt?', ask: 'Hány fióka maradt a fészekben?', say: 'Két madárfióka ült itt. Aztán mind a kettő elrepült. Hány maradt?', scene: <BeforeAfterScene icon="madar" before={2} after={0} snail={false} />, options: [0, 2, 1], hint: 'Nézd a jobb oldali képet! Hány madár van ott?' },
  { id: 'n21', level: 3, badge: 'Kakukktojás', ask: 'Melyik NEM nulla?', say: 'Kettő nullát mutat. Melyik nem nulla?', options: [hand(1, 'egy ujj'), dom(0, 'üres dominó'), basket(0, 'üres kosár')], hint: 'Az üres dominó és az üres kosár nulla. Hol van valami?' },
  { id: 'n22', level: 3, badge: 'Párosítás', ask: 'Melyik illik az ökölhöz?', say: 'A kéz ökölbe van szorítva. Melyik dominó illik hozzá?', scene: <Hand fingers={0} className="w-28 h-28 mx-auto" />, options: [dom(0, 'üres dominó'), dom(1, 'egy pötty'), dom(2, 'két pötty')], hint: 'Nulla ujj, nulla pötty.' },
  { id: 'n23', level: 3, badge: 'Legkevesebb', ask: 'Hol van a legkevesebb csillag?', options: [pic('csillag', 0, 'nulla csillag'), pic('csillag', 1, 'egy csillag'), pic('csillag', 2, 'két csillag')], hint: 'A nulla a legkevesebb: ott nincs semmi.' },
  { id: 'n24', level: 3, badge: 'Kis történet', ask: 'Hány epret visz Csigusz?', say: 'Csigusz epret szedett, de útközben mindet megette. Hány epret visz most a kosarában?', scene: <SnailBasketScene n={0} />, options: [0, 1, 2], hint: 'Nézz bele a kosárba! Van benne eper?' },
];

export const A_NULLA_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Koppints bal oldalon egy képre, aztán jobb oldalon arra, ami illik hozzá!',
    pairs: [
      { a: sm(<BasketBox n={0} className="w-24 h-20" />, 'üres kosár'), b: 0 },
      { a: sm(<BasketBox n={1} className="w-24 h-20" />, 'egy alma'), b: 1 },
      { a: sm(<BasketBox n={2} className="w-24 h-20" />, 'két alma'), b: 2 },
      { a: sm(<Hand fingers={0} className="w-16 h-16" />, 'ököl'), b: sm(<Domino left={0} single className="w-14 h-14" />, 'üres dominó') },
    ],
  },
  2: {
    say: 'Keresd meg, mi illik össze! Ugyanannyi legyen.',
    pairs: [
      { a: sm(<MiniGroup icon="hal" n={0} />, 'nulla hal'), b: sm(<MiniGroup icon="csillag" n={0} />, 'nulla csillag') },
      { a: sm(<MiniGroup icon="hal" n={2} />, 'két hal'), b: sm(<MiniGroup icon="csillag" n={2} />, 'két csillag') },
      { a: sm(<MiniGroup icon="hal" n={1} />, 'egy hal'), b: sm(<MiniGroup icon="csillag" n={1} />, 'egy csillag') },
      { a: 0, b: sm(<Hand fingers={0} className="w-16 h-16" />, 'ököl') },
      { a: sm(<Domino left={2} single className="w-14 h-14" />, 'két pötty'), b: 2 },
    ],
  },
  3: {
    say: 'Párosítsd a jeleket a képekhez! Kék és piros korongokat látsz. Az üres keret nulla.',
    pairs: [
      { a: '0 < 1', b: sm(<DotPairs a={0} b={1} />, 'nulla kék, egy piros') },
      { a: '2 > 0', b: sm(<DotPairs a={2} b={0} />, 'két kék, nulla piros') },
      { a: '0 = 0', b: sm(<DotPairs a={0} b={0} />, 'két üres keret') },
      { a: '0 < 2', b: sm(<DotPairs a={0} b={2} />, 'nulla kék, két piros') },
    ],
  },
};

export const A_NULLA_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Üres, vagy van benne valami? Tedd a jó kosárba!',
    bins: [
      { label: 'Üres', figure: <BigSign text="0" className="w-12 h-12" />, say: 'üres, nulla' },
      { label: 'Van benne', say: 'van benne valami' },
    ],
    items: [
      { item: sm(<BasketBox n={0} className="w-24 h-20" />, 'kosár'), bin: 0 },
      { item: sm(<BasketBox n={2} className="w-24 h-20" />, 'kosár'), bin: 1 },
      { item: sm(<MiniGroup icon="hal" n={0} />, 'doboz'), bin: 0 },
      { item: sm(<MiniGroup icon="hal" n={1} />, 'doboz'), bin: 1 },
      { item: sm(<Domino left={0} single className="w-14 h-14" />, 'dominó'), bin: 0 },
      { item: sm(<Domino left={2} single className="w-14 h-14" />, 'dominó'), bin: 1 },
    ],
  },
  2: {
    say: 'Három kosár van: nulla, egy, kettő. Hová való?',
    bins: [
      { label: '0', say: 'nulla' },
      { label: '1', say: 'egy' },
      { label: '2', say: 'kettő' },
    ],
    items: [
      { item: sm(<Hand fingers={0} className="w-16 h-16" />, 'kéz'), bin: 0 },
      { item: sm(<Hand fingers={2} className="w-16 h-16" />, 'kéz'), bin: 2 },
      { item: sm(<Hand fingers={1} className="w-16 h-16" />, 'kéz'), bin: 1 },
      { item: sm(<Domino left={0} single className="w-14 h-14" />, 'dominó'), bin: 0 },
      { item: sm(<Domino left={1} single className="w-14 h-14" />, 'dominó'), bin: 1 },
      { item: sm(<MiniGroup icon="eper" n={2} />, 'eprek'), bin: 2 },
      { item: sm(<MiniGroup icon="eper" n={0} />, 'üres doboz'), bin: 0 },
    ],
  },
  3: {
    say: 'Nulla, egy, vagy kettő? Számold meg, és tedd a jó kosárba!',
    bins: [
      { label: '0', say: 'nulla' },
      { label: '1', say: 'egy' },
      { label: '2', say: 'kettő' },
    ],
    items: [
      { item: sm(<BugCard dots={0} />, 'katica'), bin: 0 },
      { item: sm(<BugCard dots={2} />, 'katica'), bin: 2 },
      { item: sm(<BugCard dots={1} />, 'katica'), bin: 1 },
      { item: sm(<svg viewBox="0 0 480 240" className="w-28 h-16"><NestScene eggs={0} /></svg>, 'fészek'), bin: 0 },
      { item: sm(<svg viewBox="0 0 480 240" className="w-28 h-16"><NestScene eggs={1} /></svg>, 'fészek'), bin: 1 },
      { item: sm(<svg viewBox="0 0 480 240" className="w-28 h-16"><NestScene eggs={2} /></svg>, 'fészek'), bin: 2 },
      { item: sm(<BasketBox n={0} className="w-24 h-20" />, 'kosár'), bin: 0 },
      { item: 2, bin: 2 },
    ],
  },
};

export const ANullaG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="3. A nulla"
    badge="1. OSZTÁLY • II. SZÁMOLÁS 0-TÓL 5-IG • JÁTÉK"
    base="g1-c5-a-nulla"
    chapterId="szamolas-5-ig"
    questions={A_NULLA_G1_QUESTIONS}
    pairs={A_NULLA_G1_PAIRS}
    sort={A_NULLA_G1_SORT}
    {...props}
  />
);

export default ANullaG1Jatek;
