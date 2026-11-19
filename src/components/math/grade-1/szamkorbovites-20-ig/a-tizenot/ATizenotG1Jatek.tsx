import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { BigSign, IconName, NumberLine } from '../../shared/G1Pics';
import {
  CompareScene,
  DominoPair,
  ExprScene,
  FivesScene,
  GroupBox,
  HopLine,
  MiniFrames,
  MiniGroup,
  NumberHouse,
  PondScene,
  ScatterScene,
  SeqStrip,
  TensRod,
  TwoFrames,
} from './ATizenotG1Scenes';

const grp = (icon: IconName, n: number, say: string) => ({ figure: <GroupBox icon={icon} n={n} />, say });
const dp = (ones: number, say: string) => ({ figure: <DominoPair ones={ones} className="w-40 h-auto" />, say });
const sign = (t: string | number, say: string) => ({ figure: <BigSign text={t} />, say });
const sm = (node: React.ReactNode, say: string) => ({ figure: node, say });
const rod = (n: number) => sm(<TensRod n={n} className="w-36 h-auto" />, `${n} kocka: tízesrúd és egyesek`);

export const A_TIZENOT_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – felismerés, számlálás
  { id: 't15-1', level: 1, badge: 'Számlálás', ask: 'Hány hal úszik a tóban?', say: 'Hány hal úszik a tóban? Számold meg!', scene: <PondScene n={15} />, options: [15, 14, 13], hint: 'Mutass rá mindegyik halra, és számolj hangosan! Egyet se hagyj ki.' },
  { id: 't15-2', level: 1, badge: 'Számjegy', ask: 'Melyik a tizenötös?', options: [sign(15, 'tizenöt'), sign(13, 'tizenhárom'), sign(5, 'öt')], hint: 'A tizenötös két számjegy: elöl egy 1-es, utána egy 5-ös.' },
  { id: 't15-3', level: 1, badge: 'Tízes keret', ask: 'Hány korong van a két keretben?', scene: <TwoFrames a={15} />, options: [15, 14, 10], hint: 'Az első keret tele van: az 10. Számolj tovább a másodikban: 11, 12…' },
  { id: 't15-4', level: 1, badge: 'Tizenöt', ask: 'Hol van 15 alma?', options: [grp('alma', 15, 'tizenöt alma'), grp('alma', 14, 'tizennégy alma'), grp('alma', 12, 'tizenkét alma')], hint: 'Egy sorban 5 alma van. Számolj soronként: 5, 10, 15!' },
  { id: 't15-5', level: 1, badge: 'Tízes és egyes', ask: 'Hány egyes kocka van a rúd mellett?', say: 'Egy tízesrudat és egyes kockákat látsz. Hány egyes kocka van a rúd mellett?', scene: <TensRod n={15} />, options: [5, 4, 6], hint: 'Csak a kis sárga kockákat számold, a hosszú rudat ne!' },
  { id: 't15-6', level: 1, badge: 'Dominó', ask: 'Hány pötty van a két dominón?', scene: <DominoPair ones={5} />, options: [15, 10, 14], hint: 'Az első dominón 10 pötty van. Számolj tovább a másodikon!' },
  { id: 't15-7', level: 1, badge: 'Számegyenes', ask: 'Melyik szám kell a ? helyére?', say: 'Melyik szám kell a kérdőjel helyére a számegyenesen?', scene: <NumberLine max={15} question={15} />, options: [15, 14, 13], hint: 'A 14 után melyik szám jön?' },
  { id: 't15-8', level: 1, badge: 'Számlálás', ask: 'Hány csillag ragyog?', say: 'Hány csillag ragyog az égen? Számold meg!', scene: <ScatterScene icon="csillag" n={13} bg="plain" />, options: [13, 15, 12], hint: 'Vigyázz, nem mindig tizenöt van! Számold meg még egyszer, sorról sorra.' },
  // 2. szint – tízes és egyes, tízre pótlás, számsor
  { id: 't15-9', level: 2, badge: 'Tízes és egyes', ask: '10 + 5 = ?', say: 'Egy teli keret és még 5 korong. 10 meg 5, az mennyi?', scene: <TwoFrames a={10} b={5} />, options: [15, 14, 5], hint: 'Egy tízes és öt egyes. Számolj a 10-től tovább ötöt!' },
  { id: 't15-10', level: 2, badge: 'Ötösével', ask: 'Hány hal pihen a levelek alatt?', say: 'Három levél alatt halak pihennek, mindegyiknél 5. Hány hal van összesen?', scene: <FivesScene pads={3} />, options: [15, 10, 13], hint: 'Ötösével számolj: 5, 10, és még egy levél…' },
  { id: 't15-11', level: 2, badge: 'Tízre pótlás', ask: 'Hány kell a 9-hez, hogy 10 legyen?', say: 'Az első keretben 9 korong van. Hány kell még, hogy tele legyen, vagyis 10 legyen?', scene: <TwoFrames a={9} />, options: [1, 2, 0], hint: 'Számold meg az üres helyeket az első keretben!' },
  { id: 't15-12', level: 2, badge: 'Tízen át', ask: '8 + 7 = ?', say: '8 piros és 7 kék korong. A kékekből 2 még az első keretbe került. 8 meg 7, az mennyi?', scene: <TwoFrames a={8} b={7} />, options: [15, 14, 13], hint: 'Előbb a tízig: 8 meg 2 az 10. A 7-ből maradt még 5. A 10-hez még 5.' },
  { id: 't15-13', level: 2, badge: 'Kivonás', ask: '15 − 5 = ?', say: '15 korongból 5-öt áthúztunk. Hány maradt?', scene: <TwoFrames a={15} crossed={5} />, options: [10, 5, 11], hint: 'Csak a nem áthúzott korongokat számold! Teli az első keret?' },
  { id: 't15-14', level: 2, badge: 'Ugrások', ask: 'Hová ér Zümi?', say: 'Zümi a 9-ről indul. Előbb 1-et ugrik, aztán 5-öt. Hová ér?', scene: <HopLine max={15} from={9} jumps={[{ from: 9, to: 10 }, { from: 10, to: 15 }]} question={15} />, options: [15, 14, 13], hint: 'A 9 meg 1 az 10. Aztán a 10-től még 5-öt ugrik.' },
  { id: 't15-15', level: 2, badge: 'Visszafelé', ask: 'Melyik szám hiányzik?', say: 'Visszafelé számolunk: 15, 14, kérdőjel, 12, 11. Melyik szám hiányzik?', scene: <SeqStrip items={[15, 14, '?', 12, 11]} />, options: [13, 10, 9], hint: 'Melyik szám áll a 14 és a 12 között?' },
  { id: 't15-16', level: 2, badge: 'Dominó', ask: 'Melyik dominópáron van 15 pötty?', options: [dp(5, 'tíz és öt pötty'), dp(4, 'tíz és négy pötty'), dp(3, 'tíz és három pötty')], hint: 'Az első dominó mindig 10. Hol van a másodikon pont 5 pötty?' },
  // 3. szint – összehasonlítás, két lépés, kis történetek, nyitott mondat
  { id: 't15-17', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: '15 hal, és 13 hal. Melyik jel kell középre?', scene: <CompareScene icon="hal" a={15} b={13} />, options: ['>', '<', '='], hint: 'Jobb oldalon kevesebb van. A jel hegye a kevesebb felé mutasson!' },
  { id: 't15-18', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: '12, kérdőjel, 15. Melyik jel kell a kérdőjel helyére?', scene: <ExprScene text="12 ? 15" />, options: ['<', '>', '='], hint: 'A 12 a kisebb. A jel hegye a kisebb szám felé mutat.' },
  { id: 't15-19', level: 3, badge: 'Tízen át', ask: '15 − 6 = ?', say: '15 elvéve 6. Pötyi így számol: 15 elvéve 5, az 10, aztán még elvéve 1. Mennyi?', scene: <ExprScene text={['15 − 6 = ?', '15 − 5 − 1 = ?']} />, options: [9, 10, 8], hint: 'Előbb 15-ből 5: az 10. A 10-ből még 1-et vegyél el!' },
  { id: 't15-20', level: 3, badge: 'Számház', ask: 'Melyik szám kell a ? helyére?', say: 'A számház tetején 15 áll. A szobában: 6 meg kérdőjel. Mennyi kell a 6-hoz, hogy 15 legyen?', scene: <NumberHouse top={15} rows={[[6, '?']]} />, options: [9, 8, 10], hint: 'Számolj a 6-tól 15-ig: előbb a 10-ig 4, aztán még 5.' },
  { id: 't15-21', level: 3, badge: 'Kis történet', ask: 'Hány virág van együtt?', say: 'Zümi 7 virágot gyűjtött, Csigusz 8-at. Hány virág van együtt?', scene: <GroupBox icon="virag" n={7} nb={8} colorB="#facc15" className="w-56 h-auto mx-auto" />, options: [15, 14, 13], hint: '8 meg 7: a 8-hoz előbb 2 kell a tízhez, aztán még 5.' },
  { id: 't15-22', level: 3, badge: 'Kis történet', ask: 'Hány hal látszik még?', say: '15 hal úszott a tóban. 7 elbújt a kő alá, ezeket áthúztuk. Hány hal látszik még?', scene: <GroupBox icon="hal" n={15} crossed={7} className="w-56 h-auto mx-auto" />, options: [8, 7, 9], hint: 'Előbb 5-öt vegyél el, az 10. Aztán még 2-t.' },
  { id: 't15-23', level: 3, badge: 'Nyitott mondat', ask: 'Melyik szám illik a □ helyére?', say: '12 kisebb, mint valahány, és az kisebb, mint 14. Melyik szám illik az üres helyre?', scene: <ExprScene text="12 < □ < 14" />, options: [13, 12, 15], hint: 'A szám legyen nagyobb a 12-nél, de kisebb a 14-nél!' },
  { id: 't15-24', level: 3, badge: 'Mennyivel több?', ask: 'Hány levelet hozott Zümi?', say: 'Csigusz 4 levelet hozott. Zümi 9-cel többet hozott. Hány levelet hozott Zümi?', scene: <GroupBox icon="level" n={4} className="w-40 h-auto mx-auto" />, options: [13, 5, 12], hint: '9-cel több: a 4-hez adj hozzá 9-et! Előbb a 10-ig.' },
];

export const A_TIZENOT_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Koppints bal oldalon egy képre, aztán jobb oldalon a hozzá illő számra!',
    pairs: [
      { a: sm(<MiniGroup icon="hal" n={15} />, 'tizenöt hal'), b: 15 },
      { a: sm(<MiniGroup icon="hal" n={13} />, 'tizenhárom hal'), b: 13 },
      { a: sm(<MiniGroup icon="hal" n={11} />, 'tizenegy hal'), b: 11 },
      { a: sm(<MiniGroup icon="hal" n={9} />, 'kilenc hal'), b: 9 },
    ],
  },
  2: {
    say: 'Keresd meg, mi illik össze! A korongok és a kockák ugyanannyit mutassanak.',
    pairs: [
      { a: sm(<MiniFrames a={15} />, 'tizenöt korong'), b: rod(15) },
      { a: sm(<MiniFrames a={12} />, 'tizenkét korong'), b: rod(12) },
      { a: sm(<MiniFrames a={14} />, 'tizennégy korong'), b: rod(14) },
      { a: sm(<MiniFrames a={11} />, 'tizenegy korong'), b: rod(11) },
    ],
  },
  3: {
    say: 'Pötyi a tízig számol, aztán tovább. Keresd meg a párokat!',
    pairs: [
      { a: '9 + 6', b: '9 + 1 + 5' },
      { a: '8 + 7', b: '8 + 2 + 5' },
      { a: '15 − 6', b: '15 − 5 − 1' },
      { a: '15 − 8', b: '15 − 5 − 3' },
    ],
  },
};

export const A_TIZENOT_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Tizenöt, vagy nem tizenöt? Számold meg, és tedd a jó kosárba!',
    bins: [
      { label: 'Tizenöt', figure: <BigSign text={15} className="w-12 h-12" />, say: 'tizenöt' },
      { label: 'Nem tizenöt', say: 'nem tizenöt' },
    ],
    items: [
      { item: sm(<MiniGroup icon="hal" n={15} />, 'halak'), bin: 0 },
      { item: sm(<MiniGroup icon="alma" n={14} />, 'almák'), bin: 1 },
      { item: sm(<MiniGroup icon="csillag" n={15} />, 'csillagok'), bin: 0 },
      { item: sm(<MiniGroup icon="virag" n={13} />, 'virágok'), bin: 1 },
      { item: sm(<MiniFrames a={15} />, 'korongok a keretekben'), bin: 0 },
      { item: sm(<MiniFrames a={12} />, 'korongok két keretben'), bin: 1 },
      { item: sm(<TensRod n={15} className="w-32 h-auto" />, 'tízesrúd és kockák'), bin: 0 },
      { item: sm(<MiniGroup icon="labda" n={10} />, 'labdák'), bin: 1 },
    ],
  },
  2: {
    say: 'Páros vagy páratlan? A páros számú dolgok mind párba állnak. Tedd a számot a jó kosárba!',
    bins: [
      { label: 'Páros', say: 'páros' },
      { label: 'Páratlan', say: 'páratlan' },
    ],
    items: [
      { item: 15, bin: 1 },
      { item: 14, bin: 0 },
      { item: 9, bin: 1 },
      { item: 12, bin: 0 },
      { item: 11, bin: 1 },
      { item: 6, bin: 0 },
      { item: 13, bin: 1 },
      { item: 10, bin: 0 },
    ],
  },
  3: {
    say: 'Számold ki! Pont tizenöt lesz, vagy kevesebb? Tedd a jó kosárba!',
    bins: [
      { label: 'Kevesebb', figure: <BigSign text="< 15" className="w-12 h-12" />, say: 'tizenötnél kevesebb' },
      { label: 'Pont 15', figure: <BigSign text={15} className="w-12 h-12" />, say: 'pont tizenöt' },
    ],
    items: [
      { item: '8 + 7', bin: 1 },
      { item: '9 + 6', bin: 1 },
      { item: '10 + 5', bin: 1 },
      { item: '6 + 9', bin: 1 },
      { item: '7 + 7', bin: 0 },
      { item: '9 + 4', bin: 0 },
      { item: '15 − 1', bin: 0 },
      { item: '8 + 5', bin: 0 },
    ],
  },
};

export const ATizenotG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="5. A tizenöt"
    badge="1. OSZTÁLY • VI. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 20-IG • JÁTÉK"
    base="g1-c20-a-tizenot"
    chapterId="szamkorbovites-20-ig"
    questions={A_TIZENOT_G1_QUESTIONS}
    pairs={A_TIZENOT_G1_PAIRS}
    sort={A_TIZENOT_G1_SORT}
    {...props}
  />
);

export default ATizenotG1Jatek;
