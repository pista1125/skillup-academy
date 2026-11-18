import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { BigSign, Domino, NumberLine, TenFrame } from '../../shared/G1Pics';
import { DotPairs } from '../../szamolas-5-ig/a-ketto/AKettoG1Scenes';
import { EqCard, TwoHands } from '../a-nyolc/ANyolcG1Scenes';
import { PairUpScene, TreeScene, TwoRows, XBox, XCompare, XMini, XPicName, XRow } from './AKilencG1Scenes';

const sm = (node: React.ReactNode, say: string) => ({ figure: node, say });
const box = (icon: XPicName, n: number, say: string, crossed = 0) => sm(<XBox icon={icon} n={n} crossed={crossed} />, say);
const dom = (l: number, r: number, say: string) => sm(<Domino left={l} right={r} />, say);
const hands = (n: number, say: string) => sm(<TwoHands n={n} />, say);
const sign = (t: string, say: string) => sm(<BigSign text={t} />, say);

export const A_KILENC_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – felismerés, számlálás
  { id: 'k1', level: 1, badge: 'Számlálás', ask: 'Hány dísz van a fán?', say: 'Hány dísz lóg a fenyőfán? Számold meg!', scene: <TreeScene filled={9} />, options: [9, 8, 7], hint: 'Soronként számolj, fentről lefelé! Mindegyikre mutass rá.' },
  { id: 'k2', level: 1, badge: 'Kilenc', ask: 'Hol van 9 toboz?', options: [box('toboz', 9, 'kilenc toboz'), box('toboz', 7, 'hét toboz'), box('toboz', 8, 'nyolc toboz')], hint: 'Számold meg a felső és az alsó sort is! Hol lesz pont kilenc?' },
  { id: 'k3', level: 1, badge: 'Számjegy', ask: 'Melyik a kilences?', options: [sign('9', 'kilences'), sign('6', 'hatos'), sign('8', 'nyolcas')], hint: 'A kilencesnek fent van a kerek feje, és lefelé lóg a lába. A hatosnak lent van a pocakja.' },
  { id: 'k4', level: 1, badge: 'Ujjkép', ask: 'Hány ujj van fent?', say: 'Két kezet látsz. Hány ujj van fent összesen?', scene: <TwoHands n={9} />, options: [9, 8, 7], hint: 'Az egyik kézen 5 ujj van. Számolj tovább a másik kézen: 6, 7…' },
  { id: 'k5', level: 1, badge: 'Tízes keret', ask: 'Hány korong van a keretben?', scene: <TenFrame n={9} />, options: [9, 8, 7], hint: 'A felső sor tele van: az 5. Számolj tovább lent! Az üres helyet ne számold.' },
  { id: 'k6', level: 1, badge: 'Számlálás', ask: 'Hány csengő van itt?', scene: <XBox icon="csengo" n={9} className="w-56 h-auto mx-auto" />, options: [9, 8, 6], hint: 'Balról jobbra haladj, előbb fent, aztán lent!' },
  { id: 'k7', level: 1, badge: 'Dominó', ask: 'Melyik dominón van 9 pötty?', options: [dom(5, 4, 'öt és négy pötty'), dom(4, 4, 'négy és négy pötty'), dom(3, 3, 'három és három pötty')], hint: 'Számold meg mindkét oldal pöttyeit, és számolj tovább!' },
  { id: 'k8', level: 1, badge: 'Számlálás', ask: 'Hány ajándék van?', say: 'Hány ajándék van a dobozban? Vigyázz, számold meg pontosan!', scene: <XBox icon="ajandek" n={8} className="w-56 h-auto mx-auto" />, options: [8, 9, 7], hint: 'Nem mindig kilenc van! Mutass rá mindegyikre, és számolj újra.' },
  // 2. szint – kevesebb, számegyenes, bontás, kiegészítés
  { id: 'k9', level: 2, badge: 'Kilencnél kevesebb', ask: 'Hol van kilencnél kevesebb?', options: [box('suti', 8, 'nyolc süti'), box('suti', 9, 'kilenc süti')], hint: 'Számold meg mindkét dobozt! Hol nincs meg a kilenc?' },
  { id: 'k10', level: 2, badge: 'Számegyenes', ask: 'Melyik szám kell a ? helyére?', say: 'Melyik szám kell a kérdőjel helyére a számegyenesen?', scene: <NumberLine max={9} question={9} />, options: [9, 6, 7], hint: 'A 8 után melyik szám jön?' },
  { id: 'k11', level: 2, badge: 'Számsor', ask: 'Melyik szám hiányzik?', say: 'Nézd a számsort: 6, 7, kérdőjel, 9. Melyik szám hiányzik?', scene: <EqCard text="6 7 ? 9" />, options: [8, 5, 6], hint: 'Melyik szám jön a 7 után, és a 9 előtt?' },
  { id: 'k12', level: 2, badge: 'Kiegészítés', ask: 'Hány dísz kell még, hogy 9 legyen?', say: 'A fán 6 dísz van. 9 díszt szeretnénk. Hány dísz kell még?', scene: <TreeScene filled={6} label={9} showHooks />, options: [3, 2, 4], hint: 'Számold meg az üres karikákat! Vagy számolj tovább a 6-tól: 7, 8, 9.' },
  { id: 'k13', level: 2, badge: 'Bontás', ask: 'Hány bögre van összesen?', say: '5 kék és 4 piros bögre áll a polcon. Hány bögre van összesen?', scene: <XRow icon="bogre" a={5} b={4} color="#3b82f6" />, options: [9, 8, 5], hint: 'Számold meg a kékeket, aztán számolj tovább a pirosakkal!' },
  { id: 'k14', level: 2, badge: 'Nyitott mondat', ask: 'Melyik szám kell a □ helyére?', say: '7 meg valahány egyenlő 9. Melyik szám kell az üres négyzetbe?', scene: <EqCard text="7 + □ = 9" />, options: [2, 3, 1], hint: 'Számolj tovább a 7-től a 9-ig: 8, 9. Hányat mondtál?' },
  { id: 'k15', level: 2, badge: 'Párosítás', ask: 'Melyik illik a 9-hez?', say: 'Melyik két kéz mutat kilencet?', scene: <BigSign text="9" className="w-24 h-24 mx-auto" />, options: [hands(9, 'kilenc ujj'), hands(8, 'nyolc ujj'), hands(7, 'hét ujj')], hint: 'Az egyik kézen 5 ujj van. Melyik másik kézen van még 4?' },
  { id: 'k16', level: 2, badge: 'Páratlan', ask: 'Páros vagy páratlan?', say: 'Kilenc díszt párba állítottunk. Páros vagy páratlan a 9?', scene: <PairUpScene n={9} />, options: [{ label: 'páratlan', say: 'páratlan' }, { label: 'páros', say: 'páros' }], hint: 'Nézd meg az utolsó oszlopot! Jutott mindegyik dísznek pár?' },
  // 3. szint – összehasonlítás, mennyivel több, két lépés, kis történetek
  { id: 'k17', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: '9 ajándék, és 7 ajándék. Melyik jel kell középre?', scene: <XCompare icon="ajandek" a={9} b={7} />, options: ['>', '<', '='], hint: 'Jobb oldalon kevesebb van. A jel hegye arra mutasson!' },
  { id: 'k18', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: '6 csengő, és 9 csengő. Melyik jel kell középre?', scene: <XCompare icon="csengo" a={6} b={9} />, options: ['<', '>', '='], hint: 'Bal oldalon kevesebb van. A hegye a kevesebb felé mutat.' },
  { id: 'k19', level: 3, badge: 'Ugyanannyi', ask: 'Melyik jel kell?', say: 'Tobozok bal oldalon és jobb oldalon. Melyik jel kell középre?', scene: <XCompare icon="toboz" a={9} b={9} />, options: ['=', '<', '>'], hint: 'Számold meg mindkét oldalt! Ugyanannyi?' },
  { id: 'k20', level: 3, badge: 'Kakukktojás', ask: 'Melyik NEM kilenc?', say: 'Két képen kilenc látszik. Melyik nem kilenc?', options: [box('disz', 8, 'díszek'), hands(9, 'két kéz'), sm(<TenFrame n={9} />, 'tízes keret')], hint: 'Számold meg mindegyiket! Hol nincs pont kilenc?' },
  { id: 'k21', level: 3, badge: 'Elvétel', ask: 'Hány süti maradt?', say: '9 süti volt. Csigusz hármat megevett, ezeket áthúztuk. Hány süti maradt?', scene: <XBox icon="suti" n={9} crossed={3} className="w-56 h-auto mx-auto" />, options: [6, 7, 5], hint: 'Csak azokat számold, amelyek nincsenek áthúzva!' },
  { id: 'k22', level: 3, badge: 'Mennyivel több?', ask: 'Mennyivel több a piros?', say: 'Fent 9 piros dísz van, lent 6 kék. Mennyivel több a piros, mint a kék?', scene: <TwoRows icon="disz" a={9} b={6} />, options: [3, 2, 9], hint: 'Nézd meg, melyik piros díszeknek nincs kék párja alattuk! Azokat számold meg.' },
  { id: 'k23', level: 3, badge: 'Bontás', ask: 'Melyik szám kell a □ helyére?', say: '9 egyenlő 4 meg valahány. Melyik szám kell az üres négyzetbe?', scene: <EqCard text="9 = 4 + □" />, options: [5, 4, 6], hint: 'Számolj tovább a 4-től a 9-ig! Hányat léptél?' },
  { id: 'k24', level: 3, badge: 'Kis történet', ask: 'Hány toboz van együtt?', say: 'Zümi 5 tobozt hozott, Csigusz 4-et. Hány toboz van együtt?', scene: <XBox icon="toboz" n={5} nb={4} colorB="#d97706" className="w-56 h-auto mx-auto" />, options: [9, 8, 1], hint: '5 meg 4. Számolj tovább az 5-től még négyet!' },
];

export const A_KILENC_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Koppints bal oldalon egy képre, aztán jobb oldalon arra a számra, ami illik hozzá!',
    pairs: [
      { a: sm(<XMini icon="disz" n={9} />, 'kilenc dísz'), b: 9 },
      { a: sm(<XMini icon="disz" n={8} />, 'nyolc dísz'), b: 8 },
      { a: sm(<XMini icon="disz" n={7} />, 'hét dísz'), b: 7 },
      { a: sm(<XMini icon="disz" n={6} />, 'hat dísz'), b: 6 },
    ],
  },
  2: {
    say: 'Keresd meg, mi illik össze! Ugyanannyi legyen.',
    pairs: [
      { a: sm(<TwoHands n={9} className="w-24 h-auto" />, 'kilenc ujj'), b: sm(<TenFrame n={9} className="w-24 h-auto" />, 'kilenc korong') },
      { a: sm(<Domino left={4} right={4} className="w-24 h-auto" />, 'nyolc pötty'), b: sm(<XMini icon="toboz" n={8} />, 'nyolc toboz') },
      { a: sm(<XMini icon="csengo" n={7} />, 'hét csengő'), b: sm(<TwoHands n={7} className="w-24 h-auto" />, 'hét ujj') },
      { a: 6, b: sm(<Domino left={3} right={3} className="w-24 h-auto" />, 'hat pötty') },
    ],
  },
  3: {
    say: 'Párosítsd a jeleket a képekhez! Kék és piros korongokat látsz.',
    pairs: [
      { a: '9 > 7', b: sm(<DotPairs a={9} b={7} />, 'kilenc kék, hét piros') },
      { a: '8 < 9', b: sm(<DotPairs a={8} b={9} />, 'nyolc kék, kilenc piros') },
      { a: '9 = 9', b: sm(<DotPairs a={9} b={9} />, 'kilenc kék, kilenc piros') },
      { a: '6 < 9', b: sm(<DotPairs a={6} b={9} />, 'hat kék, kilenc piros') },
    ],
  },
};

export const A_KILENC_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Kilenc, vagy nem kilenc? Számold meg, és tedd a jó kosárba!',
    bins: [
      { label: 'Kilenc', figure: <BigSign text="9" className="w-12 h-12" />, say: 'kilenc' },
      { label: 'Nem kilenc', say: 'nem kilenc' },
    ],
    items: [
      { item: sm(<XMini icon="csengo" n={9} />, 'csengők'), bin: 0 },
      { item: sm(<XMini icon="csengo" n={8} />, 'csengők'), bin: 1 },
      { item: sm(<XMini icon="ajandek" n={9} />, 'ajándékok'), bin: 0 },
      { item: sm(<XMini icon="ajandek" n={6} />, 'ajándékok'), bin: 1 },
      { item: sm(<XMini icon="suti" n={9} />, 'sütik'), bin: 0 },
      { item: sm(<XMini icon="toboz" n={7} />, 'tobozok'), bin: 1 },
      { item: sm(<TwoHands n={9} className="w-24 h-auto" />, 'két kéz'), bin: 0 },
    ],
  },
  2: {
    say: 'Három kosár van: hét, nyolc, kilenc. Hová való?',
    bins: [
      { label: '7', say: 'hét' },
      { label: '8', say: 'nyolc' },
      { label: '9', say: 'kilenc' },
    ],
    items: [
      { item: sm(<TwoHands n={9} className="w-24 h-auto" />, 'két kéz'), bin: 2 },
      { item: sm(<TwoHands n={7} className="w-24 h-auto" />, 'két kéz'), bin: 0 },
      { item: sm(<Domino left={4} right={4} className="w-24 h-auto" />, 'dominó'), bin: 1 },
      { item: sm(<Domino left={6} right={3} className="w-24 h-auto" />, 'dominó'), bin: 2 },
      { item: sm(<Domino left={5} right={2} className="w-24 h-auto" />, 'dominó'), bin: 0 },
      { item: sm(<TenFrame n={8} className="w-24 h-auto" />, 'korongok'), bin: 1 },
      { item: sm(<XMini icon="bogre" n={9} />, 'bögrék'), bin: 2 },
      { item: sm(<XMini icon="disz" n={7} />, 'díszek'), bin: 0 },
    ],
  },
  3: {
    say: 'Számold ki! Kilencnél kevesebb lesz, vagy pont kilenc? Tedd a jó kosárba!',
    bins: [
      { label: 'Kevesebb', figure: <BigSign text="< 9" className="w-12 h-12" />, say: 'kilencnél kevesebb' },
      { label: 'Pont 9', figure: <BigSign text="9" className="w-12 h-12" />, say: 'pont kilenc' },
    ],
    items: [
      { item: '5 + 4', bin: 1 },
      { item: '8 + 1', bin: 1 },
      { item: '6 + 3', bin: 1 },
      { item: '7 + 2', bin: 1 },
      { item: '4 + 4', bin: 0 },
      { item: '6 + 2', bin: 0 },
      { item: '5 + 3', bin: 0 },
      { item: '9 − 1', bin: 0 },
    ],
  },
};

export const AKilencG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="13. A kilenc"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • JÁTÉK"
    base="g1-c10-a-kilenc"
    chapterId="szamkorbovites-10-ig"
    questions={A_KILENC_G1_QUESTIONS}
    pairs={A_KILENC_G1_PAIRS}
    sort={A_KILENC_G1_SORT}
    {...props}
  />
);

export default AKilencG1Jatek;
