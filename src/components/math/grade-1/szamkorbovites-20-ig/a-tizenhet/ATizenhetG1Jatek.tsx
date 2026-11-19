import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { BigSign, IconName, NumberLine } from '../../shared/G1Pics';
import { CompareScene, DominoPair, ExprScene, GroupBox, HopLine, MiniFrames, MiniGroup, ScatterScene, SeqStrip, TensRod, TwoFrames } from '../a-tizenot/ATizenotG1Scenes';
import { ForestScene, MachineScene, ThreeBaskets, TriangleScene } from './ATizenhetG1Scenes';

const grp = (icon: IconName, n: number, say: string) => ({ figure: <GroupBox icon={icon} n={n} />, say });
const sign = (t: string | number, say: string) => ({ figure: <BigSign text={t} />, say });
const sm = (node: React.ReactNode, say: string) => ({ figure: node, say });
const rod = (n: number) => sm(<TensRod n={n} className="w-36 h-auto" />, 'tízesrúd és egyes kockák');

export const A_TIZENHET_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – felismerés, számlálás
  { id: 't17-1', level: 1, badge: 'Számlálás', ask: 'Hány gomba nőtt az erdőben?', say: 'Hány gomba nőtt az erdőben? Számold meg!', scene: <ForestScene n={17} />, options: [17, 16, 15], hint: 'Mutass rá mindegyik gombára, és számolj hangosan! Egyet se hagyj ki.' },
  { id: 't17-2', level: 1, badge: 'Számjegy', ask: 'Melyik a tizenhetes?', options: [sign(17, 'tizenhét'), sign(7, 'hét'), sign(16, 'tizenhat')], hint: 'A tizenhetes két számjegy: elöl egy 1-es, utána egy 7-es.' },
  { id: 't17-3', level: 1, badge: 'Tízes keret', ask: 'Hány korong van a két keretben?', scene: <TwoFrames a={17} />, options: [17, 16, 7], hint: 'Az első keret tele van: az 10. Számolj tovább a másodikban: 11, 12…' },
  { id: 't17-4', level: 1, badge: 'Tizenhét', ask: 'Hol van 17 gomba?', options: [grp('gomba', 17, 'tizenhét gomba'), grp('gomba', 16, 'tizenhat gomba'), grp('gomba', 15, 'tizenöt gomba')], hint: 'Egy sorban 5 gomba van. Számolj soronként: 5, 10, 15, és még…' },
  { id: 't17-5', level: 1, badge: 'Tízes és egyes', ask: 'Hány egyes kocka van a rúd mellett?', say: 'Egy tízesrudat és egyes kockákat látsz. Hány egyes kocka van a rúd mellett?', scene: <TensRod n={17} />, options: [7, 6, 8], hint: 'Csak a kis sárga kockákat számold, a hosszú rudat ne!' },
  { id: 't17-6', level: 1, badge: 'Dominó', ask: 'Hány pötty van a két dominón?', scene: <DominoPair ones={7} />, options: [17, 16, 15], hint: 'Az első dominón 10 pötty van. Számolj tovább a másodikon!' },
  { id: 't17-7', level: 1, badge: 'Számegyenes', ask: 'Melyik szám kell a ? helyére?', say: 'Melyik szám kell a kérdőjel helyére a számegyenesen?', scene: <NumberLine max={17} question={17} />, options: [17, 16, 15], hint: 'A 16 után melyik szám jön?' },
  { id: 't17-8', level: 1, badge: 'Számlálás', ask: 'Hány levél hullott le?', say: 'Hány falevél hullott le? Számold meg!', scene: <ScatterScene icon="level" n={15} />, options: [15, 17, 16], hint: 'Vigyázz, nem mindig tizenhét van! Számold meg még egyszer, sorról sorra.' },
  // 2. szint – tízes és egyes, gép, tízre pótlás
  { id: 't17-9', level: 2, badge: 'Tízes és egyes', ask: '10 + 7 = ?', say: 'Egy teli keret és még 7 korong. 10 meg 7, az mennyi?', scene: <TwoFrames a={10} b={7} />, options: [17, 16, 7], hint: 'Egy tízes és hét egyes. Számolj a 10-től tovább hetet!' },
  { id: 't17-10', level: 2, badge: 'Számológép', ask: 'Melyik szám jön ki a gépből?', say: 'Zümi gépe mindig hozzáad 4-et. Most a 13 ment be. Melyik szám jön ki?', scene: <MachineScene input={13} op="+ 4" output="?" />, options: [17, 16, 9], hint: 'A gép hozzáad 4-et: 13 meg 4. Számolj a 13-tól tovább négyet!' },
  { id: 't17-11', level: 2, badge: 'Tízre pótlás', ask: 'Hány kell a 8-hoz, hogy 10 legyen?', say: 'Az első keretben 8 korong van. Hány kell még, hogy tele legyen, vagyis 10 legyen?', scene: <TwoFrames a={8} />, options: [2, 3, 1], hint: 'Számold meg az üres helyeket az első keretben!' },
  { id: 't17-12', level: 2, badge: 'Tízen át', ask: '8 + 9 = ?', say: '8 piros és 9 kék korong. A kékekből 2 még az első keretbe került. 8 meg 9, az mennyi?', scene: <TwoFrames a={8} b={9} />, options: [17, 16, 15], hint: 'Előbb a tízig: 8 meg 2 az 10. A 9-ből maradt még 7. A 10-hez még 7.' },
  { id: 't17-13', level: 2, badge: 'Kivonás', ask: '17 − 7 = ?', say: '17 korongból 7-et áthúztunk. Hány maradt?', scene: <TwoFrames a={17} crossed={7} />, options: [10, 7, 11], hint: 'Csak a nem áthúzott korongokat számold! Teli az első keret?' },
  { id: 't17-14', level: 2, badge: 'Ugrások', ask: 'Hová ér Zümi?', say: 'Zümi a 9-ről indul. Előbb 1-et ugrik, aztán 7-et. Hová ér?', scene: <HopLine max={17} from={9} jumps={[{ from: 9, to: 10 }, { from: 10, to: 17 }]} question={17} />, options: [17, 16, 15], hint: 'A 9 meg 1 az 10. Aztán a 10-től még 7-et ugrik.' },
  { id: 't17-15', level: 2, badge: 'Számsor', ask: 'Melyik szám hiányzik?', say: 'Nézd a számsort: 14, 15, kérdőjel, 17. Melyik szám hiányzik?', scene: <SeqStrip items={[14, 15, '?', 17]} />, options: [16, 13, 12], hint: 'Melyik szám jön a 15 után, és a 17 előtt?' },
  { id: 't17-16', level: 2, badge: 'Három szám', ask: 'Hány gomba van a három kosárban?', say: 'Az első kosárban 6, a másodikban 5, a harmadikban 6 gomba van. Hány gomba van összesen?', scene: <ThreeBaskets counts={[6, 5, 6]} total="?" />, options: [17, 16, 15], hint: 'Előbb 6 meg 5 az 11. Aztán az 11-hez még 6.' },
  // 3. szint – összehasonlítás, két lépés, rejtvények, kis történetek
  { id: 't17-17', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: '17 gomba, és 15 gomba. Melyik jel kell középre?', scene: <CompareScene icon="gomba" a={17} b={15} />, options: ['>', '<', '='], hint: 'Jobb oldalon kevesebb van. A jel hegye a kevesebb felé mutasson!' },
  { id: 't17-18', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: '9 meg 8, kérdőjel, 16. Melyik jel kell a kérdőjel helyére?', scene: <ExprScene text="9 + 8 ? 16" />, options: ['>', '<', '='], hint: 'Számold ki előbb: mennyi 9 meg 8? Aztán hasonlítsd a 16-hoz!' },
  { id: 't17-19', level: 3, badge: 'Tízen át', ask: '17 − 9 = ?', say: '17 elvéve 9. Pötyi így számol: 17 elvéve 7, az 10, aztán még elvéve 2. Mennyi?', scene: <ExprScene text={['17 − 9 = ?', '17 − 7 − 2 = ?']} />, options: [8, 10, 9], hint: 'Előbb 17-ből 7: az 10. A 10-ből még 2-t vegyél el!' },
  { id: 't17-20', level: 3, badge: 'Nyitott mondat', ask: 'Melyik szám kell a □ helyére?', say: '9 meg valahány egyenlő 17. Melyik szám kell az üres helyre?', scene: <ExprScene text="9 + □ = 17" />, options: [8, 7, 9], hint: 'Számolj a 9-től 17-ig: előbb a 10-ig 1, aztán még 7.' },
  { id: 't17-21', level: 3, badge: 'Szabály', ask: 'Melyik szám kerül a körbe?', say: 'A háromszög sarkain 7, 1 és 9 áll. A körbe a három szám összege kerül. Melyik szám az?', scene: <TriangleScene corners={[7, 1, 9]} center="?" />, options: [17, 16, 15], hint: 'Előbb 9 meg 1 az 10. Aztán a 10-hez még 7.' },
  { id: 't17-22', level: 3, badge: 'Rejtvény', ask: 'Hány gomba van egy kosárban?', say: 'Három egyforma kosárban összesen 15 gomba van. Mindegyikben ugyanannyi. Hány gomba van egy kosárban?', scene: <ThreeBaskets counts={['?', '?', '?']} total={15} />, options: [5, 3, 6], hint: 'Ötösével számoltunk már: 5, 10, 15. Hányszor mondtál számot?' },
  { id: 't17-23', level: 3, badge: 'Kis történet', ask: 'Hány gombát találtak együtt?', say: 'Zümi 8 gombát talált, Csigusz 9-et. Hány gombát találtak együtt?', scene: <GroupBox icon="gomba" n={8} nb={9} colorB="#a16207" className="w-56 h-auto mx-auto" />, options: [17, 16, 15], hint: '9 meg 8: a 9-hez előbb 1 kell a tízhez, aztán még 7.' },
  { id: 't17-24', level: 3, badge: 'Kis történet', ask: 'Hány gombát kell még megkeresni?', say: '17 gombát látott Pötyi az erdőben. 8 már a kosárban van. Hányat kell még megkeresni?', scene: <GroupBox icon="gomba" n={8} className="w-48 h-auto mx-auto" />, options: [9, 8, 10], hint: 'Számolj a 8-tól 17-ig: előbb a 10-ig 2, aztán még 7.' },
];

export const A_TIZENHET_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Koppints bal oldalon egy képre, aztán jobb oldalon a hozzá illő számra!',
    pairs: [
      { a: sm(<MiniGroup icon="gomba" n={17} />, 'tizenhét gomba'), b: 17 },
      { a: sm(<MiniGroup icon="gomba" n={16} />, 'tizenhat gomba'), b: 16 },
      { a: sm(<MiniGroup icon="gomba" n={13} />, 'tizenhárom gomba'), b: 13 },
      { a: sm(<MiniGroup icon="gomba" n={11} />, 'tizenegy gomba'), b: 11 },
    ],
  },
  2: {
    say: 'Egy tízesrúd és egyes kockák. Keresd meg, melyik művelet illik a képhez!',
    pairs: [
      { a: rod(17), b: '10 + 7' },
      { a: { ...rod(14), say: 'rúd és négy kocka' }, b: '10 + 4' },
      { a: { ...rod(16), say: 'rúd és hat kocka' }, b: '10 + 6' },
      { a: { ...rod(12), say: 'rúd és két kocka' }, b: '10 + 2' },
    ],
  },
  3: {
    say: 'Pötyi a tízig számol, aztán tovább. Keresd meg a párokat!',
    pairs: [
      { a: '9 + 8', b: '9 + 1 + 7' },
      { a: '8 + 9', b: '8 + 2 + 7' },
      { a: '17 − 8', b: '17 − 7 − 1' },
      { a: '17 − 9', b: '17 − 7 − 2' },
    ],
  },
};

export const A_TIZENHET_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Tizenhét, vagy nem tizenhét? Számold meg, és tedd a jó kosárba!',
    bins: [
      { label: 'Tizenhét', figure: <BigSign text={17} className="w-12 h-12" />, say: 'tizenhét' },
      { label: 'Nem tizenhét', say: 'nem tizenhét' },
    ],
    items: [
      { item: sm(<MiniGroup icon="gomba" n={17} />, 'gombák'), bin: 0 },
      { item: sm(<MiniGroup icon="level" n={16} />, 'levelek'), bin: 1 },
      { item: sm(<MiniGroup icon="labda" n={17} />, 'labdák'), bin: 0 },
      { item: sm(<MiniGroup icon="eper" n={15} />, 'eprek'), bin: 1 },
      { item: sm(<MiniFrames a={17} />, 'korongok a keretekben'), bin: 0 },
      { item: sm(<MiniFrames a={14} />, 'korongok két keretben'), bin: 1 },
      { item: sm(<TensRod n={17} className="w-32 h-auto" />, 'tízesrúd és kockák'), bin: 0 },
      { item: sm(<DominoPair ones={6} className="w-32 h-auto" />, 'két dominó'), bin: 1 },
    ],
  },
  2: {
    say: 'Egyjegyű vagy kétjegyű? Egy számjegyből vagy kettőből áll? Tedd a jó kosárba!',
    bins: [
      { label: 'Egyjegyű', say: 'egyjegyű' },
      { label: 'Kétjegyű', say: 'kétjegyű' },
    ],
    items: [
      { item: 17, bin: 1 },
      { item: 7, bin: 0 },
      { item: 10, bin: 1 },
      { item: 9, bin: 0 },
      { item: 12, bin: 1 },
      { item: 0, bin: 0 },
      { item: 15, bin: 1 },
      { item: 3, bin: 0 },
      { item: 11, bin: 1 },
    ],
  },
  3: {
    say: 'Számold ki! Tizenöt, tizenhat vagy tizenhét lesz? Tedd a jó kosárba!',
    bins: [
      { label: '15', say: 'tizenöt' },
      { label: '16', say: 'tizenhat' },
      { label: '17', say: 'tizenhét' },
    ],
    items: [
      { item: '9 + 8', bin: 2 },
      { item: '10 + 7', bin: 2 },
      { item: '8 + 9', bin: 2 },
      { item: '17 − 1', bin: 1 },
      { item: '8 + 8', bin: 1 },
      { item: '9 + 7', bin: 1 },
      { item: '7 + 8', bin: 0 },
      { item: '17 − 2', bin: 0 },
      { item: '6 + 9', bin: 0 },
    ],
  },
};

export const ATizenhetG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="7. A tizenhét"
    badge="1. OSZTÁLY • VI. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 20-IG • JÁTÉK"
    base="g1-c20-a-tizenhet"
    chapterId="szamkorbovites-20-ig"
    questions={A_TIZENHET_G1_QUESTIONS}
    pairs={A_TIZENHET_G1_PAIRS}
    sort={A_TIZENHET_G1_SORT}
    {...props}
  />
);

export default ATizenhetG1Jatek;
