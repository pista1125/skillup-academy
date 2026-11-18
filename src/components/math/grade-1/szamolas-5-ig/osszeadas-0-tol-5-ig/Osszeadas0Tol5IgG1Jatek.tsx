import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { Domino, NumberLine, TenFrame, BigSign } from '../../shared/G1Pics';
import { ArriveScene, ExprScene, SumScene, TwoColorApples, TwoHands } from './Osszeadas0Tol5IgG1Scenes';

const tf = (a: number, b: number, say: string) => ({ figure: <TenFrame n={a} second={b} className="w-40 h-auto" />, say });
const dom2 = (a: number, b: number, say: string) => ({ figure: <Domino left={a} right={b} className="w-28 h-auto" />, say });
const tfMini = (a: number, b: number, say: string) => ({ figure: <TenFrame n={a} second={b} className="w-28 h-auto" />, say });
const domMini = (a: number, b: number, say: string) => ({ figure: <Domino left={a} right={b} className="w-24 h-auto" />, say });

export const OSSZEADAS_0_TOL_5_IG_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – hozzáteszünk, összesen (képről számlálva)
  { id: 'a1', level: 1, badge: 'Hozzáteszünk', ask: 'Hány eper lett összesen?', say: 'A tányéron két eper van. Zümi hoz még egyet. Hány eper lett összesen?', scene: <ArriveScene icon="eper" have={2} add={1} who="meh" />, options: [3, 2, 4], hint: 'Számold meg a tányéron lévőket, és amit Zümi hoz!' },
  { id: 'a2', level: 1, badge: 'Tízes keret', ask: 'Hány korong van összesen?', say: 'Három piros, meg egy kék korong. Hány korong van összesen?', scene: <TenFrame n={3} second={1} />, options: [4, 3, 5], hint: 'A pirosat és a kéket is számold meg!' },
  { id: 'a3', level: 1, badge: 'Jelek', ask: 'Melyik a plusz jel?', say: 'Melyik a plusz jel, amivel az összeadást írjuk?', options: [{ figure: <BigSign text="+" color="#dc2626" />, say: 'plusz' }, { figure: <BigSign text="=" />, say: 'egyenlő' }, { figure: <BigSign text="<" />, say: 'kisebb' }], hint: 'A plusz jel olyan, mint egy kis kereszt.' },
  { id: 'a4', level: 1, badge: 'Ujjkép', ask: 'Hány ujj van fent összesen?', say: 'Az egyik kézen egy ujj, a másikon kettő. Hány ujj van fent összesen?', scene: <TwoHands a={1} b={2} />, options: [3, 2, 4], hint: 'Számold meg mindkét kezet, egymás után!' },
  { id: 'a5', level: 1, badge: 'Dominó', ask: 'Hány pötty van összesen?', say: 'Hány pötty van a dominón összesen, a két felén együtt?', scene: <Domino left={2} right={2} className="w-56 h-auto mx-auto" />, options: [4, 2, 3], hint: 'Mindkét felét számold meg!' },
  { id: 'a6', level: 1, badge: 'Hozzáteszünk', ask: 'Hány madár lesz az ágon?', say: 'Az ágon három madár ül. Odarepül még egy. Hány madár lesz az ágon?', scene: <ArriveScene icon="madar" have={3} add={1} place="branch" />, options: [4, 3, 5], hint: 'Ami odarepül, az is az ágra kerül. Számold meg mindet!' },
  { id: 'a7', level: 1, badge: 'Összesen', ask: 'Hány alma van összesen?', say: 'Két piros alma és két zöld alma. Hány alma van összesen?', scene: <TwoColorApples red={2} green={2} />, options: [4, 2, 5], hint: 'A pirosakat és a zöldeket is számold!' },
  { id: 'a8', level: 1, badge: 'Összeadás', ask: 'Mennyi 1 + 1?', say: 'Egy labda meg egy labda. Mennyi összesen?', scene: <SumScene icon="labda" a={1} b={1} />, options: [2, 1, 3], hint: 'Egy, és még egy. Számold meg!' },
  // 2. szint – képről a művelet, eredmény
  { id: 'a9', level: 2, badge: 'Képről művelet', ask: 'Melyik összeadás illik ide?', say: 'A tányéron három alma van. Csigusz hoz még kettőt. Melyik összeadás illik a képhez?', scene: <ArriveScene icon="alma" have={3} add={2} who="csiga" />, options: ['3 + 2', '3 + 1', '2 + 2'], hint: 'Előbb, ami a tányéron van, utána, amit Csigusz hoz.' },
  { id: 'a10', level: 2, badge: 'Dominó', ask: 'Melyik illik a dominóhoz?', say: 'Melyik összeadás illik ehhez a dominóhoz?', scene: <Domino left={1} right={3} className="w-56 h-auto mx-auto" />, options: ['1 + 3', '1 + 2', '2 + 3'], hint: 'Számold meg külön a bal és a jobb felét!' },
  { id: 'a11', level: 2, badge: 'Tízes keret', ask: 'Mennyi 2 + 3?', say: 'Két piros meg három kék. Mennyi kettő meg három?', scene: <TenFrame n={2} second={3} />, options: [5, 4, 3], hint: 'Számold meg az összes korongot!' },
  { id: 'a12', level: 2, badge: 'Nulla', ask: 'Mennyi 4 + 0?', say: 'Négy gomba, és egy üres doboz. Mennyi négy meg nulla?', scene: <SumScene icon="gomba" a={4} b={0} />, options: [4, 0, 5], hint: 'A nulla azt jelenti: semmit sem tettünk hozzá.' },
  { id: 'a13', level: 2, badge: 'Számegyenes', ask: 'Hová ért Zümi?', say: 'Zümi az egyesen ül. Ugrik még kettőt előre. Hová ért?', scene: <NumberLine max={5} mark={[1]} question={3} jumps={[{ from: 1, to: 2 }, { from: 2, to: 3 }]} />, options: [3, 2, 4], hint: 'Indulj az egyesről, és számold az íveket!' },
  { id: 'a14', level: 2, badge: 'Képről művelet', ask: 'Hol látod: 2 + 2?', say: 'Melyik tízes keret mutatja: kettő meg kettő?', options: [tf(2, 2, 'két piros, két kék'), tf(2, 1, 'két piros, egy kék'), tf(3, 2, 'három piros, két kék')], hint: 'Két piros és két kék kell.' },
  { id: 'a15', level: 2, badge: 'Nulla', ask: 'Mennyi 0 + 3?', say: 'Üres doboz, meg három virág. Mennyi nulla meg három?', scene: <SumScene icon="virag" a={0} b={3} />, options: [3, 0, 4], hint: 'Az első doboz üres. Hány virág van összesen?' },
  { id: 'a16', level: 2, badge: 'Összeadás', ask: 'Mennyi 1 + 4?', say: 'Egy szilva meg négy szilva. Mennyi összesen?', scene: <SumScene icon="szilva" a={1} b={4} />, options: [5, 4, 3], hint: 'A négytől számolj tovább eggyel!' },
  // 3. szint – felcserélés, egyenlőség, kis történetek
  { id: 'a17', level: 3, badge: 'Felcserélés', ask: 'Melyik ugyanannyi, mint 3 + 2?', say: 'Melyik összeadás ugyanannyi, mint három meg kettő?', options: ['2 + 3', '3 + 1', '2 + 2'], hint: 'Ugyanazok a számok kellenek, csak fordítva.' },
  { id: 'a18', level: 3, badge: 'Összeadás', ask: 'Melyiknek 5 az eredménye?', say: 'Melyik összeadás eredménye öt?', options: ['4 + 1', '2 + 2', '3 + 1'], hint: 'Számold ki mindegyiket az ujjaiddal!' },
  { id: 'a19', level: 3, badge: 'Összehasonlítás', ask: 'Melyik ad többet?', say: 'Melyik összeadás ad többet?', options: ['2 + 2', '1 + 2', '0 + 3'], hint: 'Számold ki mindegyiket! Melyik a legtöbb?' },
  { id: 'a20', level: 3, badge: 'Történet', ask: 'Hány levele lett Pötyinek?', say: 'Pötyinek két levele van. Zümi ad neki még kettőt. Hány levele lett Pötyinek?', scene: <ArriveScene icon="level" have={2} add={2} who="meh" />, options: [4, 3, 2], hint: 'Kettő, és még kettő. Számolj tovább!' },
  { id: 'a21', level: 3, badge: 'Történet', ask: 'Hány gombát talált Csigusz?', say: 'Csigusz reggel egy gombát talált, délután még hármat. Hány gombát talált összesen?', scene: <SumScene icon="gomba" a={1} b={3} />, options: [4, 3, 5], hint: 'Egy, és még három. Számold meg mind!' },
  { id: 'a22', level: 3, badge: 'Jelek', ask: 'Melyik jel kell?', say: 'Három meg egy, és négy. Melyik jel kell a kérdőjel helyére?', scene: <ExprScene text="3 + 1 ? 4" />, options: ['=', '<', '>'], hint: 'Előbb számold ki: mennyi három meg egy?' },
  { id: 'a23', level: 3, badge: 'Jelek', ask: 'Melyik jel kell?', say: 'Kettő meg egy, és öt. Melyik jel kell a kérdőjel helyére?', scene: <ExprScene text="2 + 1 ? 5" />, options: ['<', '>', '='], hint: 'Kettő meg egy az három. A három kevesebb, mint az öt.' },
  { id: 'a24', level: 3, badge: 'Képről művelet', ask: 'Hol látod: 1 + 4?', say: 'Melyik dominó mutatja: egy meg négy?', options: [dom2(1, 4, 'egy és négy pötty'), dom2(1, 3, 'egy és három pötty'), dom2(0, 4, 'nulla és négy pötty')], hint: 'Az egyik felén egy pötty, a másikon négy legyen.' },
];

export const OSSZEADAS_0_TOL_5_IG_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Hány korong van összesen? Keresd meg a hozzá illő számot!',
    pairs: [
      { a: tfMini(2, 1, 'két piros, egy kék'), b: 3 },
      { a: tfMini(2, 2, 'két piros, két kék'), b: 4 },
      { a: tfMini(4, 1, 'négy piros, egy kék'), b: 5 },
      { a: tfMini(1, 0, 'egy piros, nulla kék'), b: 1 },
    ],
  },
  2: {
    say: 'Melyik összeadás melyik dominóhoz illik? Párosítsd!',
    pairs: [
      { a: '2 + 3', b: domMini(2, 3, 'két és három pötty') },
      { a: '1 + 1', b: domMini(1, 1, 'egy és egy pötty') },
      { a: '4 + 0', b: domMini(4, 0, 'négy és nulla pötty') },
      { a: '1 + 2', b: domMini(1, 2, 'egy és két pötty') },
    ],
  },
  3: {
    say: 'Párosítsd az összeadást az eredményével!',
    pairs: [
      { a: '3 + 2', b: 5 },
      { a: '2 + 2', b: 4 },
      { a: '1 + 2', b: 3 },
      { a: '0 + 1', b: 1 },
      { a: '1 + 1', b: 2 },
    ],
  },
};

export const OSSZEADAS_0_TOL_5_IG_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Hány van összesen? Három, vagy négy? Tedd a jó kosárba!',
    bins: [
      { label: '3', figure: <BigSign text="3" className="w-12 h-12" />, say: 'összesen három' },
      { label: '4', figure: <BigSign text="4" className="w-12 h-12" />, say: 'összesen négy' },
    ],
    items: [
      { item: tfMini(2, 1, 'két piros, egy kék korong'), bin: 0 },
      { item: tfMini(2, 2, 'két piros, két kék korong'), bin: 1 },
      { item: domMini(1, 2, 'dominó, egy és kettő'), bin: 0 },
      { item: domMini(3, 1, 'dominó, három és egy'), bin: 1 },
      { item: tfMini(3, 0, 'három piros korong'), bin: 0 },
      { item: tfMini(1, 3, 'egy piros, három kék korong'), bin: 1 },
    ],
  },
  2: {
    say: 'Számold ki! Négy lesz, vagy öt? Tedd a jó kosárba!',
    bins: [
      { label: '4', figure: <BigSign text="4" className="w-12 h-12" />, say: 'négy' },
      { label: '5', figure: <BigSign text="5" className="w-12 h-12" />, say: 'öt' },
    ],
    items: [
      { item: '2 + 2', bin: 0 },
      { item: '3 + 1', bin: 0 },
      { item: '4 + 0', bin: 0 },
      { item: '1 + 3', bin: 0 },
      { item: '4 + 1', bin: 1 },
      { item: '3 + 2', bin: 1 },
      { item: '5 + 0', bin: 1 },
      { item: '2 + 3', bin: 1 },
    ],
  },
  3: {
    say: 'Három kosár van: három, négy, öt. Mennyi az eredmény? Hová való?',
    bins: [
      { label: '3', say: 'három' },
      { label: '4', say: 'négy' },
      { label: '5', say: 'öt' },
    ],
    items: [
      { item: '1 + 2', bin: 0 },
      { item: '0 + 4', bin: 1 },
      { item: '1 + 4', bin: 2 },
      { item: domMini(2, 1, 'dominó, kettő és egy'), bin: 0 },
      { item: tfMini(2, 3, 'két piros, három kék korong'), bin: 2 },
      { item: '2 + 2', bin: 1 },
      { item: '3 + 0', bin: 0 },
      { item: '0 + 5', bin: 2 },
    ],
  },
};

export const Osszeadas0Tol5IgG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="7. Összeadás 0-tól 5-ig"
    badge="1. OSZTÁLY • II. SZÁMOLÁS 0-TÓL 5-IG • JÁTÉK"
    base="g1-c5-osszeadas-0-tol-5-ig"
    chapterId="szamolas-5-ig"
    questions={OSSZEADAS_0_TOL_5_IG_G1_QUESTIONS}
    pairs={OSSZEADAS_0_TOL_5_IG_G1_PAIRS}
    sort={OSSZEADAS_0_TOL_5_IG_G1_SORT}
    {...props}
  />
);

export default Osszeadas0Tol5IgG1Jatek;
