import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { BigSign, IconName, NumberLine } from '../../shared/G1Pics';
import { CompareScene, DominoPair, ExprScene, GroupBox, HopLine, MiniFrames, MiniGroup, ScatterScene, SeqStrip, TwoFrames } from '../a-tizenot/ATizenotG1Scenes';
import { BasketsScene, HandsFeetScene, MiniRods, PairsScene, RodsScene } from './AHuszG1Scenes';

const grp = (icon: IconName, n: number, say: string) => ({ figure: <GroupBox icon={icon} n={n} />, say });
const sign = (t: string | number, say: string) => ({ figure: <BigSign text={t} />, say });
const sm = (node: React.ReactNode, say: string) => ({ figure: node, say });
const rods = (n: number) => sm(<MiniRods n={n} />, `${n} kocka: tízesrudak és egyesek`);

export const A_HUSZ_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – felismerés, számlálás
  { id: 'h20-1', level: 1, badge: 'Számlálás', ask: 'Hány eper van a kertben?', say: 'Hány eper van a kertben? Számold meg!', scene: <ScatterScene icon="eper" n={20} />, options: [20, 19, 18], hint: 'Mutass rá mindegyikre, és számolj hangosan! Egyet se hagyj ki.' },
  { id: 'h20-2', level: 1, badge: 'Számjegy', ask: 'Melyik a húszas?', options: [sign(20, 'húsz'), sign(12, 'tizenkettő'), sign(2, 'kettő')], hint: 'A húszas két számjegy: elöl egy 2-es, utána egy 0.' },
  { id: 'h20-3', level: 1, badge: 'Tízes keret', ask: 'Hány korong van a két keretben?', scene: <TwoFrames a={20} />, options: [20, 10, 19], hint: 'Mindkét keret tele van. Egy teli keret 10. Számolj tovább a másodikban: 11, 12…' },
  { id: 'h20-4', level: 1, badge: 'Húsz', ask: 'Hol van 20 alma?', options: [grp('alma', 20, 'húsz alma'), grp('alma', 18, 'tizennyolc alma'), grp('alma', 19, 'tizenkilenc alma')], hint: 'Egy sorban 5 alma van. Számolj soronként: 5, 10, 15, 20!' },
  { id: 'h20-5', level: 1, badge: 'Tízes és egyes', ask: 'Hány tízesrúd van?', say: 'Tízesrudakat látsz. Egy rúd 10 kocka. Hány tízesrúd van?', scene: <RodsScene n={20} />, options: [2, 20, 1], hint: 'Ne a kockákat számold, hanem a hosszú narancs rudakat!' },
  { id: 'h20-6', level: 1, badge: 'Dominó', ask: 'Hány pötty van a két dominón?', scene: <DominoPair ones={10} />, options: [20, 10, 15], hint: 'Egy dominón 10 pötty van. A másodikon is 10. Számolj tovább a 10-től!' },
  { id: 'h20-7', level: 1, badge: 'Számegyenes', ask: 'Melyik szám kell a ? helyére?', say: 'Melyik szám kell a kérdőjel helyére a számegyenesen?', scene: <NumberLine max={20} question={20} />, options: [20, 19, 18], hint: 'A 19 után melyik szám jön?' },
  { id: 'h20-8', level: 1, badge: 'Ötösével', ask: 'Hány ujj van a két kézen és a két lábon?', scene: <HandsFeetScene />, options: [20, 10, 15], hint: 'Ötösével számolj: 5, 10, 15, és még egy láb…' },
  // 2. szint – két tízes, kiegészítés 20-ra, számsorok, páros
  { id: 'h20-9', level: 2, badge: 'Két tízes', ask: '10 + 10 = ?', say: 'Két teli keret. 10 meg 10, az mennyi?', scene: <TwoFrames a={10} b={10} />, options: [20, 11, 19], hint: 'Egy tízes meg egy tízes: 2 tízes. Hogy hívjuk a 2 tízest?' },
  { id: 'h20-10', level: 2, badge: 'Kiegészítés', ask: 'Hány kell a 13-hoz, hogy 20 legyen?', say: 'A keretekben 13 korong van. Hány kell még, hogy mindkét keret tele legyen, vagyis 20 legyen?', scene: <TwoFrames a={13} />, options: [7, 6, 3], hint: 'Számold meg az üres helyeket a második keretben!' },
  { id: 'h20-11', level: 2, badge: 'Összeadás', ask: '14 + 6 = ?', say: 'Az első kosár tele van, a másodikban 4 eper van. Zümi hozott még 6-ot. 14 meg 6, az mennyi?', scene: <TwoFrames a={14} b={6} />, options: [20, 19, 18], hint: 'A 14-hez 6 kell, hogy a második keret is megteljen. Két teli keret: mennyi?' },
  { id: 'h20-12', level: 2, badge: 'Kivonás', ask: '20 − 10 = ?', say: '20 korongból 10-et áthúztunk: az egész második keretet. Hány maradt?', scene: <TwoFrames a={20} crossed={10} />, options: [10, 0, 20], hint: 'Csak a nem áthúzott korongokat számold! Egy teli keret marad.' },
  { id: 'h20-13', level: 2, badge: 'Számsor', ask: 'Melyik szám jön?', say: '16, 17, 18, 19, és utána? Melyik szám jön?', scene: <SeqStrip items={[16, 17, 18, 19, '?']} />, options: [20, 15, 18], hint: 'Mindig eggyel több jön. A 19 után…' },
  { id: 'h20-14', level: 2, badge: 'Kettesével', ask: 'Melyik szám jön?', say: 'Kettesével számolunk: 12, 14, 16, 18, és utána? Melyik szám jön?', scene: <SeqStrip items={[12, 14, 16, 18, '?']} />, options: [20, 19, 17], hint: 'Kettesével lépünk: a 18 után ugorj át egy számot!' },
  { id: 'h20-15', level: 2, badge: 'Ugrások', ask: 'Hová ér Zümi?', say: 'Zümi a 15-ről indul, és egyet ugrik: 5-öt előre. Hová ér?', scene: <HopLine max={20} from={15} jumps={[{ from: 15, to: 20 }]} question={20} />, options: [20, 19, 10], hint: 'Számolj tovább a 15-től ötöt: 16, 17, 18, 19, …' },
  { id: 'h20-16', level: 2, badge: 'Páros, páratlan', ask: 'A 20 páros vagy páratlan?', say: '20 epret párba állítottunk. A 20 páros vagy páratlan?', scene: <PairsScene n={20} />, options: ['páros', 'páratlan'], hint: 'Nézd meg: maradt eper pár nélkül? Ha nem maradt, a szám páros.' },
  // 3. szint – összehasonlítás, tízen át, kis történetek, nyitott mondat
  { id: 'h20-17', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: '20 eper és 17 eper. Melyik jel kell középre?', scene: <CompareScene icon="eper" a={20} b={17} />, options: ['>', '<', '='], hint: 'Jobb oldalon kevesebb van. A jel hegye a kevesebb felé mutasson!' },
  { id: 'h20-18', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: '19, kérdőjel, 20. Melyik jel kell a kérdőjel helyére?', scene: <ExprScene text="19 ? 20" />, options: ['<', '>', '='], hint: 'A 19 a kisebb. A jel hegye a kisebb szám felé mutat.' },
  { id: 'h20-19', level: 3, badge: 'Tízen át', ask: '12 − 7 = ?', say: '12 elvéve 7. Pötyi így számol: 12 elvéve 2, az 10, aztán még elvéve 5. Mennyi?', scene: <ExprScene text={['12 − 7 = ?', '12 − 2 − 5 = ?']} />, options: [5, 6, 4], hint: 'Előbb 12-ből 2: az 10. A 10-ből még 5-öt vegyél el!' },
  { id: 'h20-20', level: 3, badge: 'Tízen át', ask: '9 + 8 = ?', say: '9 piros és 8 kék korong. Egy kék még az első keretbe került. 9 meg 8, az mennyi?', scene: <TwoFrames a={9} b={8} />, options: [17, 16, 18], hint: 'Előbb a tízig: 9 meg 1 az 10. A 8-ból maradt még 7. A 10-hez még 7.' },
  { id: 'h20-21', level: 3, badge: 'Kis történet', ask: 'Hány virág van együtt?', say: 'Zümi 12 virágot gyűjtött, Csigusz 8-at. Hány virág van együtt?', scene: <GroupBox icon="virag" n={12} nb={8} colorB="#facc15" className="w-56 h-auto mx-auto" />, options: [20, 19, 4], hint: '12 meg 8: a 12-höz 8 kell, hogy 20 legyen. Számolj tovább a 12-től!' },
  { id: 'h20-22', level: 3, badge: 'Kis történet', ask: 'Hány csiga van még úton?', say: '20 csiga indult a csigaversenyen. 12 már célba ért, őket áthúztuk. Hány csiga van még úton?', scene: <GroupBox icon="csiga" n={20} crossed={12} className="w-56 h-auto mx-auto" />, options: [8, 12, 7], hint: '20 elvéve 12: előbb 10-et vegyél el, az 10. Aztán még 2-t.' },
  { id: 'h20-23', level: 3, badge: 'Nyitott mondat', ask: 'Melyik szám illik a □ helyére?', say: '18 kisebb, mint valahány, és az kisebb, mint 20. Melyik szám illik az üres helyre?', scene: <ExprScene text="18 < □ < 20" />, options: [19, 18, 20], hint: 'A szám legyen nagyobb a 18-nál, de kisebb a 20-nál!' },
  { id: 'h20-24', level: 3, badge: 'Mennyivel több?', ask: 'Mennyivel nagyobb a 20, mint a 17?', say: 'A számegyenesen a 17 és a 20 van megjelölve. Mennyivel nagyobb a 20, mint a 17?', scene: <NumberLine max={20} mark={[17, 20]} />, options: [3, 2, 4], hint: 'Lépkedj a 17-től a 20-ig, és számold a lépéseket!' },
];

export const A_HUSZ_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Koppints bal oldalon egy képre, aztán jobb oldalon a hozzá illő számra!',
    pairs: [
      { a: sm(<MiniGroup icon="eper" n={20} />, 'húsz eper'), b: 20 },
      { a: sm(<MiniGroup icon="eper" n={18} />, 'tizennyolc eper'), b: 18 },
      { a: sm(<MiniGroup icon="eper" n={16} />, 'tizenhat eper'), b: 16 },
      { a: sm(<MiniGroup icon="eper" n={19} />, 'tizenkilenc eper'), b: 19 },
    ],
  },
  2: {
    say: 'Keresd meg, mi illik össze! A korongok és a kockák ugyanannyit mutassanak.',
    pairs: [
      { a: sm(<MiniFrames a={20} />, 'húsz korong'), b: rods(20) },
      { a: sm(<MiniFrames a={17} />, 'tizenhét korong'), b: rods(17) },
      { a: sm(<MiniFrames a={13} />, 'tizenhárom korong'), b: rods(13) },
      { a: sm(<MiniFrames a={19} />, 'tizenkilenc korong'), b: rods(19) },
    ],
  },
  3: {
    say: 'Számolj! Melyik művelet melyik eredményhez tartozik? Keresd meg a párokat!',
    pairs: [
      { a: '11 + 8', b: 19 },
      { a: '12 + 8', b: 20 },
      { a: '16 + 2', b: 18 },
      { a: '19 − 4', b: 15 },
    ],
  },
};

export const A_HUSZ_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Húsz, vagy nem húsz? Számold meg, és tedd a jó kosárba!',
    bins: [
      { label: 'Húsz', figure: <BigSign text={20} className="w-12 h-12" />, say: 'húsz' },
      { label: 'Nem húsz', say: 'nem húsz' },
    ],
    items: [
      { item: sm(<MiniGroup icon="eper" n={20} />, 'eprek'), bin: 0 },
      { item: sm(<MiniGroup icon="alma" n={18} />, 'almák'), bin: 1 },
      { item: sm(<MiniFrames a={20} />, 'korongok a keretekben'), bin: 0 },
      { item: sm(<MiniFrames a={19} />, 'korongok két keretben'), bin: 1 },
      { item: sm(<MiniRods n={20} />, 'két tízesrúd'), bin: 0 },
      { item: sm(<MiniRods n={12} />, 'tízesrúd és kockák'), bin: 1 },
      { item: sm(<DominoPair ones={10} className="w-32 h-auto" />, 'két dominó'), bin: 0 },
      { item: sm(<MiniGroup icon="csillag" n={15} />, 'csillagok'), bin: 1 },
    ],
  },
  2: {
    say: 'Páros vagy páratlan? A páros számú dolgok mind párba állnak. Tedd a számot a jó kosárba!',
    bins: [
      { label: 'Páros', say: 'páros' },
      { label: 'Páratlan', say: 'páratlan' },
    ],
    items: [
      { item: 20, bin: 0 },
      { item: 19, bin: 1 },
      { item: 12, bin: 0 },
      { item: 17, bin: 1 },
      { item: 16, bin: 0 },
      { item: 11, bin: 1 },
      { item: 18, bin: 0 },
      { item: 13, bin: 1 },
      { item: 14, bin: 0 },
      { item: 15, bin: 1 },
    ],
  },
  3: {
    say: 'Számold ki! Az eredmény kevesebb, mint 15, pont 15, vagy több, mint 15? Tedd a jó kosárba!',
    bins: [
      { label: 'Kevesebb', figure: <BigSign text="< 15" className="w-12 h-12" />, say: 'tizenötnél kevesebb' },
      { label: 'Pont 15', figure: <BigSign text={15} className="w-12 h-12" />, say: 'pont tizenöt' },
      { label: 'Több', figure: <BigSign text="> 15" className="w-12 h-12" />, say: 'tizenötnél több' },
    ],
    items: [
      { item: '14 + 6', bin: 2 },
      { item: '20 − 8', bin: 0 },
      { item: '8 + 7', bin: 1 },
      { item: '9 + 6', bin: 1 },
      { item: '12 − 7', bin: 0 },
      { item: '9 + 8', bin: 2 },
      { item: '7 + 9', bin: 2 },
      { item: '16 − 8', bin: 0 },
    ],
  },
};

export const AHuszG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="10. A húsz"
    badge="1. OSZTÁLY • VI. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 20-IG • JÁTÉK"
    base="g1-c20-a-husz"
    chapterId="szamkorbovites-20-ig"
    questions={A_HUSZ_G1_QUESTIONS}
    pairs={A_HUSZ_G1_PAIRS}
    sort={A_HUSZ_G1_SORT}
    {...props}
  />
);

export default AHuszG1Jatek;
