import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { BigSign, IconName, NumberLine } from '../../shared/G1Pics';
import { CompareScene, DominoPair, ExprScene, GroupBox, HopLine, MiniFrames, MiniGroup, NumberHouse, ScatterScene, SeqStrip, TensRod, TwoFrames } from '../a-tizenot/ATizenotG1Scenes';
import { ButterflyRow, ButterflyScene, GroupRow } from './ATizenhatG1Scenes';

const grp = (icon: IconName, n: number, say: string) => ({ figure: <GroupBox icon={icon} n={n} />, say });
const sign = (t: string | number, say: string) => ({ figure: <BigSign text={t} />, say });
const sm = (node: React.ReactNode, say: string) => ({ figure: node, say });

export const A_TIZENHAT_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – felismerés, számlálás
  { id: 't16-1', level: 1, badge: 'Számlálás', ask: 'Hány pillangó van a kertben?', say: 'Hány pillangó van a kertben? Számold meg!', scene: <ButterflyScene n={16} />, options: [16, 15, 14], hint: 'Mutass rá mindegyik pillangóra, és számolj hangosan! Egyet se hagyj ki.' },
  { id: 't16-2', level: 1, badge: 'Számjegy', ask: 'Melyik a tizenhatos?', options: [sign(16, 'tizenhat'), sign(6, 'hat'), sign(15, 'tizenöt')], hint: 'A tizenhatos két számjegy: elöl egy 1-es, utána egy 6-os.' },
  { id: 't16-3', level: 1, badge: 'Tízes keret', ask: 'Hány korong van a két keretben?', scene: <TwoFrames a={16} />, options: [16, 15, 6], hint: 'Az első keret tele van: az 10. Számolj tovább a másodikban: 11, 12…' },
  { id: 't16-4', level: 1, badge: 'Tizenhat', ask: 'Hol van 16 pillangó?', options: [grp('pillango', 16, 'tizenhat pillangó'), grp('pillango', 15, 'tizenöt pillangó'), grp('pillango', 14, 'tizennégy pillangó')], hint: 'Egy sorban 5 pillangó van. Számolj soronként: 5, 10, 15, és még…' },
  { id: 't16-5', level: 1, badge: 'Tízes és egyes', ask: 'Hány egyes kocka van a rúd mellett?', say: 'Egy tízesrudat és egyes kockákat látsz. Hány egyes kocka van a rúd mellett?', scene: <TensRod n={16} />, options: [6, 5, 7], hint: 'Csak a kis sárga kockákat számold, a hosszú rudat ne!' },
  { id: 't16-6', level: 1, badge: 'Dominó', ask: 'Hány pötty van a két dominón?', scene: <DominoPair ones={6} />, options: [16, 15, 14], hint: 'Az első dominón 10 pötty van. Számolj tovább a másodikon!' },
  { id: 't16-7', level: 1, badge: 'Számegyenes', ask: 'Melyik szám kell a ? helyére?', say: 'Melyik szám kell a kérdőjel helyére a számegyenesen?', scene: <NumberLine max={16} question={16} />, options: [16, 15, 14], hint: 'A 15 után melyik szám jön?' },
  { id: 't16-8', level: 1, badge: 'Számlálás', ask: 'Hány alma van a képen?', say: 'Hány alma van a képen? Számold meg!', scene: <ScatterScene icon="alma" n={14} />, options: [14, 16, 15], hint: 'Vigyázz, nem mindig tizenhat van! Számold meg még egyszer, sorról sorra.' },
  // 2. szint – tízes és egyes, párok, tízre pótlás
  { id: 't16-9', level: 2, badge: 'Tízes és egyes', ask: '10 + 6 = ?', say: 'Egy teli keret és még 6 korong. 10 meg 6, az mennyi?', scene: <TwoFrames a={10} b={6} />, options: [16, 15, 6], hint: 'Egy tízes és hat egyes. Számolj a 10-től tovább hatot!' },
  { id: 't16-10', level: 2, badge: 'Kettesével', ask: 'Hány pár pillangó táncol?', say: 'A pillangók párban táncolnak, a színek mutatják a párokat. Hány pár van?', scene: <GroupRow n={16} group={2} />, options: [8, 16, 7], hint: 'Egy pár két pillangó. Mutass rá minden párra, és számold a párokat!' },
  { id: 't16-11', level: 2, badge: 'Tízre pótlás', ask: 'Hány kell a 7-hez, hogy 10 legyen?', say: 'Az első keretben 7 korong van. Hány kell még, hogy tele legyen, vagyis 10 legyen?', scene: <TwoFrames a={7} />, options: [3, 2, 4], hint: 'Számold meg az üres helyeket az első keretben!' },
  { id: 't16-12', level: 2, badge: 'Tízen át', ask: '7 + 9 = ?', say: '7 piros és 9 kék korong. A kékekből 3 még az első keretbe került. 7 meg 9, az mennyi?', scene: <TwoFrames a={7} b={9} />, options: [16, 15, 14], hint: 'Előbb a tízig: 7 meg 3 az 10. A 9-ből maradt még 6. A 10-hez még 6.' },
  { id: 't16-13', level: 2, badge: 'Kivonás', ask: '16 − 6 = ?', say: '16 korongból 6-ot áthúztunk. Hány maradt?', scene: <TwoFrames a={16} crossed={6} />, options: [10, 6, 11], hint: 'Csak a nem áthúzott korongokat számold! Teli az első keret?' },
  { id: 't16-14', level: 2, badge: 'Ugrások', ask: 'Hová ér Zümi?', say: 'Zümi a 8-ról indul. Előbb 2-t ugrik, aztán 6-ot. Hová ér?', scene: <HopLine max={16} from={8} jumps={[{ from: 8, to: 10 }, { from: 10, to: 16 }]} question={16} />, options: [16, 15, 14], hint: 'A 8 meg 2 az 10. Aztán a 10-től még 6-ot ugrik.' },
  { id: 't16-15', level: 2, badge: 'Kettesével', ask: 'Melyik szám jön a sorban?', say: 'Kettesével számolunk: 10, 12, 14, kérdőjel. Melyik szám jön?', scene: <SeqStrip items={[10, 12, 14, '?']} />, options: [16, 15, 13], hint: 'Mindig kettőt lépünk. A 14 után még kettő…' },
  { id: 't16-16', level: 2, badge: 'Páros, páratlan', ask: 'Melyik szám páros?', say: 'Három szám közül melyik páros?', options: [16, 15, 11], hint: 'A páros számú dolgok mind párba állnak. Kettesével számolva melyikhez érsz el?' },
  // 3. szint – összehasonlítás, két lépés, kis történetek
  { id: 't16-17', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: '14 pillangó, és 16 pillangó. Melyik jel kell középre?', scene: <CompareScene icon="pillango" a={14} b={16} />, options: ['<', '>', '='], hint: 'Bal oldalon kevesebb van. A jel hegye a kevesebb felé mutasson!' },
  { id: 't16-18', level: 3, badge: 'Egyenlő', ask: 'Melyik jel kell?', say: '16, kérdőjel, 8 meg 8. Melyik jel kell a kérdőjel helyére?', scene: <ExprScene text="16 ? 8 + 8" />, options: ['=', '<', '>'], hint: 'Számold ki előbb: mennyi 8 meg 8? Aztán hasonlítsd a 16-hoz!' },
  { id: 't16-19', level: 3, badge: 'Tízen át', ask: '16 − 8 = ?', say: '16 elvéve 8. Pötyi így számol: 16 elvéve 6, az 10, aztán még elvéve 2. Mennyi?', scene: <ExprScene text={['16 − 8 = ?', '16 − 6 − 2 = ?']} />, options: [8, 10, 9], hint: 'Előbb 16-ból 6: az 10. A 10-ből még 2-t vegyél el!' },
  { id: 't16-20', level: 3, badge: 'Számház', ask: 'Melyik szám kell a ? helyére?', say: 'A számház tetején 16 áll. A szobában: kérdőjel meg 7. Mennyi kell a 7-hez, hogy 16 legyen?', scene: <NumberHouse top={16} rows={[['?', 7]]} />, options: [9, 8, 10], hint: 'Számolj a 7-től 16-ig: előbb a 10-ig 3, aztán még 6.' },
  { id: 't16-21', level: 3, badge: 'Kis történet', ask: 'Hány virág van együtt?', say: 'Zümi 9 virágot gyűjtött, Csigusz 7-et. Hány virág van együtt?', scene: <GroupBox icon="virag" n={9} nb={7} colorB="#facc15" className="w-56 h-auto mx-auto" />, options: [16, 15, 14], hint: '9 meg 7: a 9-hez előbb 1 kell a tízhez, aztán még 6.' },
  { id: 't16-22', level: 3, badge: 'Kis történet', ask: 'Hány pillangó maradt?', say: '16 pillangó ült a virágokon. 9 elrepült, ezeket áthúztuk. Hány pillangó maradt?', scene: <GroupBox icon="pillango" n={16} crossed={9} className="w-56 h-auto mx-auto" />, options: [7, 8, 6], hint: 'Előbb 6-ot vegyél el, az 10. Aztán még 3-at.' },
  { id: 't16-23', level: 3, badge: 'Mennyivel több?', ask: 'Hány levelet gyűjtött Zümi?', say: 'Csigusz 13 levelet gyűjtött. Zümi 3-mal többet. Hány levelet gyűjtött Zümi?', scene: <GroupBox icon="level" n={13} className="w-48 h-auto mx-auto" />, options: [16, 10, 15], hint: '3-mal több: a 13-hoz adj hozzá 3-at! 14, 15…' },
  { id: 't16-24', level: 3, badge: 'Sorszám', ask: 'Hányadik a sárga pillangó?', say: 'Csigusz a sor elején ül. Tőle számolva hányadik a sárga pillangó?', scene: <ButterflyRow n={8} yellow={6} />, options: ['hatodik', 'ötödik', 'hetedik'], hint: 'Csigusztól indulj, és mutass rá egyenként: első, második, harmadik…' },
];

export const A_TIZENHAT_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Koppints bal oldalon egy képre, aztán jobb oldalon a hozzá illő számra!',
    pairs: [
      { a: sm(<MiniGroup icon="pillango" n={16} />, 'tizenhat pillangó'), b: 16 },
      { a: sm(<MiniGroup icon="pillango" n={14} />, 'tizennégy pillangó'), b: 14 },
      { a: sm(<MiniGroup icon="pillango" n={12} />, 'tizenkét pillangó'), b: 12 },
      { a: sm(<MiniGroup icon="pillango" n={15} />, 'tizenöt pillangó'), b: 15 },
    ],
  },
  2: {
    say: 'Egy tízes és még néhány egyes. Keresd meg, mi illik össze!',
    pairs: [
      { a: sm(<MiniFrames a={16} />, 'tizenhat korong'), b: '10 + 6' },
      { a: sm(<MiniFrames a={13} />, 'tizenhárom korong'), b: '10 + 3' },
      { a: sm(<MiniFrames a={15} />, 'tizenöt korong'), b: '10 + 5' },
      { a: sm(<MiniFrames a={11} />, 'tizenegy korong'), b: '10 + 1' },
    ],
  },
  3: {
    say: 'Pötyi a tízig számol, aztán tovább. Keresd meg a párokat!',
    pairs: [
      { a: '7 + 9', b: '7 + 3 + 6' },
      { a: '8 + 8', b: '8 + 2 + 6' },
      { a: '16 − 8', b: '16 − 6 − 2' },
      { a: '16 − 7', b: '16 − 6 − 1' },
    ],
  },
};

export const A_TIZENHAT_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Tizenhat, vagy nem tizenhat? Számold meg, és tedd a jó kosárba!',
    bins: [
      { label: 'Tizenhat', figure: <BigSign text={16} className="w-12 h-12" />, say: 'tizenhat' },
      { label: 'Nem tizenhat', say: 'nem tizenhat' },
    ],
    items: [
      { item: sm(<MiniGroup icon="pillango" n={16} />, 'pillangók'), bin: 0 },
      { item: sm(<MiniGroup icon="alma" n={15} />, 'almák'), bin: 1 },
      { item: sm(<MiniGroup icon="virag" n={16} />, 'virágok'), bin: 0 },
      { item: sm(<MiniGroup icon="csillag" n={14} />, 'csillagok'), bin: 1 },
      { item: sm(<MiniFrames a={16} />, 'korongok a keretekben'), bin: 0 },
      { item: sm(<MiniFrames a={13} />, 'korongok két keretben'), bin: 1 },
      { item: sm(<TensRod n={16} className="w-32 h-auto" />, 'tízesrúd és kockák'), bin: 0 },
      { item: sm(<DominoPair ones={5} className="w-32 h-auto" />, 'két dominó'), bin: 1 },
    ],
  },
  2: {
    say: 'Páros vagy páratlan? Tedd a számot a jó kosárba!',
    bins: [
      { label: 'Páros', say: 'páros' },
      { label: 'Páratlan', say: 'páratlan' },
    ],
    items: [
      { item: 16, bin: 0 },
      { item: 7, bin: 1 },
      { item: 11, bin: 1 },
      { item: 2, bin: 0 },
      { item: 8, bin: 0 },
      { item: 0, bin: 0 },
      { item: 15, bin: 1 },
      { item: 3, bin: 1 },
      { item: 12, bin: 0 },
    ],
  },
  3: {
    say: 'Számold ki! Tizennégy, tizenöt vagy tizenhat lesz? Tedd a jó kosárba!',
    bins: [
      { label: '14', say: 'tizennégy' },
      { label: '15', say: 'tizenöt' },
      { label: '16', say: 'tizenhat' },
    ],
    items: [
      { item: '10 + 6', bin: 2 },
      { item: '8 + 8', bin: 2 },
      { item: '7 + 9', bin: 2 },
      { item: '9 + 6', bin: 1 },
      { item: '8 + 7', bin: 1 },
      { item: '16 − 1', bin: 1 },
      { item: '7 + 7', bin: 0 },
      { item: '9 + 5', bin: 0 },
      { item: '16 − 2', bin: 0 },
    ],
  },
};

export const ATizenhatG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="6. A tizenhat"
    badge="1. OSZTÁLY • VI. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 20-IG • JÁTÉK"
    base="g1-c20-a-tizenhat"
    chapterId="szamkorbovites-20-ig"
    questions={A_TIZENHAT_G1_QUESTIONS}
    pairs={A_TIZENHAT_G1_PAIRS}
    sort={A_TIZENHAT_G1_SORT}
    {...props}
  />
);

export default ATizenhatG1Jatek;
