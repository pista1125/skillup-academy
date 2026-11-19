import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { BigSign, NumberLine } from '../../shared/G1Pics';
import { CompareScene, DominoPair, ExprScene, HopLine, MiniFrames, MiniGroup, NumberHouse, ScatterScene, SeqStrip, TwoFrames } from '../a-tizenot/ATizenotG1Scenes';
import { MiniRods, PairsScene, RodsScene } from '../a-husz/AHuszG1Scenes';
import { BalloonBunch, BalloonRow, GiftBoxes, MoreScene } from './Szamolas20IgG1Scenes';

const sign = (t: string | number, say: string) => ({ figure: <BigSign text={t} />, say });
const sm = (node: React.ReactNode, say: string) => ({ figure: node, say });
const rods = (n: number, say: string) => sm(<MiniRods n={n} />, say);

export const SZAMOLAS20IG_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – számlálás, számok 20-ig, tízes és egyes, egyszerű műveletek
  { id: 's20-1', level: 1, badge: 'Számlálás', ask: 'Hány pillangó jött az ünnepre?', say: 'Hány pillangó jött az ünnepre? Számold meg!', scene: <ScatterScene icon="pillango" n={17} />, options: [17, 16, 18], hint: 'Mutass rá mindegyikre, és számolj hangosan! Egyet se hagyj ki.' },
  { id: 's20-2', level: 1, badge: 'Számjegy', ask: 'Melyik a tizenkilences?', options: [sign(19, 'tizenkilenc'), sign(16, 'tizenhat'), sign(9, 'kilenc')], hint: 'A tizenkilences két számjegy: elöl egy 1-es, utána egy 9-es. A 9-es feje fent van.' },
  { id: 's20-3', level: 1, badge: 'Tízes és egyes', ask: 'Melyik számot rakta ki Zümi?', say: 'Zümi egy tízesrudat és 4 egyes kockát rakott ki. Melyik szám ez?', scene: <RodsScene n={14} />, options: [14, 13, 4], hint: 'A rúd 10. Számolj tovább a kockákkal: 11, 12…' },
  { id: 's20-4', level: 1, badge: 'Tízes keret', ask: 'Hány korong van a két keretben?', scene: <TwoFrames a={18} />, options: [18, 17, 8], hint: 'Az első keret tele van: az 10. Számolj tovább a másodikban!' },
  { id: 's20-5', level: 1, badge: 'Tízes és egyes', ask: 'Hol van 12 kocka?', options: [rods(12, 'egy tízesrúd és 2 kocka'), rods(11, 'egy tízesrúd és 1 kocka'), rods(20, 'két tízesrúd')], hint: 'A 12: 1 tízes és 2 egyes. Keresd az egy rudat és 2 kockát!' },
  { id: 's20-6', level: 1, badge: 'Dominó', ask: 'Hány pötty van a két dominón?', scene: <DominoPair ones={3} />, options: [13, 3, 12], hint: 'Az első dominón 10 pötty van. Számolj tovább a másodikon!' },
  { id: 's20-7', level: 1, badge: 'Számegyenes', ask: 'Melyik szám kell a ? helyére?', say: 'Melyik szám kell a kérdőjel helyére a számegyenesen?', scene: <NumberLine max={20} question={16} />, options: [16, 15, 17], hint: 'Nézd meg a szomszédait! A 15 után melyik jön?' },
  { id: 's20-8', level: 1, badge: 'Páros, páratlan', ask: 'A 15 páros vagy páratlan?', say: '15 epret párba állítottunk. A 15 páros vagy páratlan?', scene: <PairsScene n={15} />, options: ['páratlan', 'páros'], hint: 'Nézd meg: maradt eper pár nélkül? Ha maradt, a szám páratlan.' },
  { id: 's20-9', level: 1, badge: 'Sorszám', ask: 'Hányadik a sárga lufi?', say: 'A lufisor eleje Pötyinél van. Pötyitől számolva hányadik a sárga lufi?', scene: <BalloonRow n={8} yellow={4} />, options: ['4.', '3.', '5.'], hint: 'Pötyitől számolj: első, második, …' },
  { id: 's20-10', level: 1, badge: 'Számszomszéd', ask: 'Melyik szám hiányzik?', say: '11, 12, kérdőjel, 14, 15. Melyik szám hiányzik?', scene: <SeqStrip items={[11, 12, '?', 14, 15]} />, options: [13, 16, 12], hint: 'Melyik szám áll a 12 és a 14 között?' },
  { id: 's20-11', level: 1, badge: 'Összeadás', ask: '10 + 7 = ?', say: 'Egy teli keret és még 7 korong. 10 meg 7, az mennyi?', scene: <TwoFrames a={10} b={7} />, options: [17, 3, 16], hint: 'Egy tízes és 7 egyes. Számolj tovább a 10-től!' },
  { id: 's20-12', level: 1, badge: 'Kivonás', ask: '15 − 5 = ?', say: '15 korongból 5-öt áthúztunk. Hány maradt?', scene: <TwoFrames a={15} crossed={5} />, options: [10, 5, 11], hint: 'Csak a nem áthúzott korongokat számold! Tele maradt az első keret?' },
  // 2. szint – műveletek a tízen át és nélküle, kiegészítés, sorozatok, jelek
  { id: 's20-13', level: 2, badge: 'Analógia', ask: '13 + 5 = ?', say: '3 meg 5 az 8. Akkor 13 meg 5 mennyi?', scene: <ExprScene text={['3 + 5 = 8', '13 + 5 = ?']} />, options: [18, 8, 17], hint: 'A tízes marad, csak az egyesekhez adunk: 3 meg 5 az 8. Elé jön a tízes.' },
  { id: 's20-14', level: 2, badge: 'Analógia', ask: '17 − 4 = ?', say: '7 elvéve 4 az 3. Akkor 17 elvéve 4 mennyi?', scene: <ExprScene text={['7 − 4 = 3', '17 − 4 = ?']} />, options: [13, 3, 14], hint: 'A tízes marad, csak az egyesekből veszünk el: 7 elvéve 4 az 3.' },
  { id: 's20-15', level: 2, badge: 'Tízen át', ask: '8 + 5 = ?', say: '8 piros és 5 kék korong. A kékekből 2 még az első keretbe került. 8 meg 5, az mennyi?', scene: <TwoFrames a={8} b={5} />, options: [13, 12, 14], hint: 'Előbb a tízig: 8 meg 2 az 10. Az 5-ből maradt még 3.' },
  { id: 's20-16', level: 2, badge: 'Tízen át', ask: '9 + 6 = ?', say: '9 meg 6. Pötyi így számol: 9 meg 1 az 10, aztán még 5. Mennyi?', scene: <ExprScene text={['9 + 6 = ?', '9 + 1 + 5 = ?']} />, options: [15, 14, 16], hint: 'Előbb a tízig: 9 meg 1. Aztán a 10-hez még 5.' },
  { id: 's20-17', level: 2, badge: 'Tízen át', ask: '13 − 5 = ?', say: '13 korongból 5-öt áthúztunk. Hány maradt?', scene: <TwoFrames a={13} crossed={5} />, options: [8, 9, 7], hint: 'Előbb 13-ból 3: az 10. A 10-ből még 2-t vegyél el!' },
  { id: 's20-18', level: 2, badge: 'Tízen át', ask: '16 − 9 = ?', say: '16 elvéve 9. Pötyi így számol: 16 elvéve 6, az 10, aztán még elvéve 3. Mennyi?', scene: <ExprScene text={['16 − 9 = ?', '16 − 6 − 3 = ?']} />, options: [7, 8, 6], hint: 'Előbb 16-ból 6: az 10. A 10-ből még 3-at vegyél el!' },
  { id: 's20-19', level: 2, badge: 'Ugrások', ask: '6 + 9 = ?', say: 'Zümi a 6-ról indul. 9-et kell előre mennie, ezért előbb 10-et ugrik, aztán 1-et visszalép. Hová ér?', scene: <HopLine max={20} from={6} jumps={[{ from: 6, to: 16 }, { from: 16, to: 15 }]} question={15} />, options: [15, 16, 14], hint: '6 meg 10 az 16. Aztán lépj vissza egyet!' },
  { id: 's20-20', level: 2, badge: 'Számház', ask: 'Melyik szám kell a ? helyére?', say: 'A számház tetején 20 áll. A szobában: 14 meg kérdőjel. Mennyi kell a 14-hez, hogy 20 legyen?', scene: <NumberHouse top={20} rows={[[14, '?']]} />, options: [6, 5, 7], hint: 'Számolj a 14-től 20-ig: 15, 16, … Hányat léptél?' },
  { id: 's20-21', level: 2, badge: 'Sorozat', ask: 'Melyik szám hiányzik?', say: 'Kettesével számolunk: 10, 12, 14, kérdőjel, 18. Melyik szám hiányzik?', scene: <SeqStrip items={[10, 12, 14, '?', 18]} />, options: [16, 15, 17], hint: 'Mindig 2-vel több: a 14 után ugorj át egy számot!' },
  { id: 's20-22', level: 2, badge: 'Sorozat', ask: 'Melyik szám jön?', say: 'Mindig 3-mal kevesebb: 19, 16, 13, és utána? Melyik szám jön?', scene: <SeqStrip items={[19, 16, 13, '?']} />, options: [10, 11, 9], hint: 'Lépj vissza hármat a 13-tól: 12, 11, …' },
  { id: 's20-23', level: 2, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: '17, kérdőjel, 14. Melyik jel kell a kérdőjel helyére?', scene: <ExprScene text="17 ? 14" />, options: ['>', '<', '='], hint: 'A 14 a kisebb. A jel hegye a kisebb szám felé mutat.' },
  { id: 's20-24', level: 2, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: '11 csillag és 19 csillag. Melyik jel kell középre?', scene: <CompareScene icon="csillag" a={11} b={19} />, options: ['<', '>', '='], hint: 'Bal oldalon kevesebb van. A jel hegye a kevesebb felé mutasson!' },
  // 3. szint – nyitott mondatok, láncok, szöveges feladatok, szabályok, kakukktojás
  { id: 's20-25', level: 3, badge: 'Nyitott mondat', ask: 'Melyik szám illik a □ helyére?', say: 'Valahány meg 6 az 18. Melyik szám illik az üres helyre?', scene: <ExprScene text="□ + 6 = 18" />, options: [12, 11, 14], hint: 'Melyik számhoz kell 6-ot adni, hogy 18 legyen? Számolj vissza 18-tól hatot!' },
  { id: 's20-26', level: 3, badge: 'Három tag', ask: '9 + 6 + 3 = ?', say: '9 meg 6 meg 3. Számolj lépésenként! Mennyi?', scene: <ExprScene text="9 + 6 + 3 = ?" />, options: [18, 17, 15], hint: 'Előbb 9 meg 6 az 15. Aztán a 15-höz még 3.' },
  { id: 's20-27', level: 3, badge: 'Két lépés', ask: '16 − 7 + 5 = ?', say: '16 elvéve 7, aztán meg 5. Számolj lépésenként! Mennyi?', scene: <ExprScene text="16 − 7 + 5 = ?" />, options: [14, 12, 9], hint: 'Előbb 16 elvéve 7 az 9. Aztán a 9-hez még 5: előbb a tízig!' },
  { id: 's20-28', level: 3, badge: 'Ennyivel több', ask: 'Hány sütit sütött Zümi?', say: 'Csigusz 6 sütit sütött. Zümi 7-tel többet sütött, mint Csigusz. Hány sütit sütött Zümi?', scene: <MoreScene a={6} more={7} />, options: [13, 7, 1], hint: '7-tel több: a 6-hoz adj hozzá 7-et! Előbb a tízig.' },
  { id: 's20-29', level: 3, badge: 'Kis történet', ask: 'Hány lufi maradt?', say: '19 lufi volt az ünnepen. 8 elszállt, ezeket áthúztuk. Hány lufi maradt?', scene: <BalloonBunch n={19} crossed={8} />, options: [11, 12, 10], hint: '19 elvéve 8: a tízes marad, az egyesekből: 9 elvéve 8.' },
  { id: 's20-30', level: 3, badge: 'Hány volt?', ask: 'Hány lufi volt eredetileg?', say: 'Elszállt 3 lufi, ezeket áthúztuk. 13 lufi maradt. Hány lufi volt eredetileg?', scene: <BalloonBunch n={16} crossed={3} />, options: [16, 10, 13], hint: 'A megmaradt 13-hoz add vissza az elszállt 3-at!' },
  { id: 's20-31', level: 3, badge: 'Mennyivel több?', ask: 'Mennyivel nagyobb a 13, mint a 7?', say: 'A számegyenesen a 7 és a 13 van megjelölve. Mennyivel nagyobb a 13, mint a 7?', scene: <NumberLine max={20} mark={[7, 13]} />, options: [6, 5, 7], hint: 'Lépkedj a 7-től a 13-ig, és számold a lépéseket! Előbb a 10-ig.' },
  { id: 's20-32', level: 3, badge: 'Nyitott mondat', ask: 'Melyik szám illik a □ helyére?', say: '12 meg 4 kisebb, mint valahány, és az kisebb, mint 18. Melyik szám illik az üres helyre?', scene: <ExprScene text="12 + 4 < □ < 18" />, options: [17, 16, 18], hint: 'Előbb számold ki: 12 meg 4 az 16. A szám legyen nagyobb a 16-nál, de kisebb a 18-nál!' },
  { id: 's20-33', level: 3, badge: 'Próbálgatás', ask: 'Hány cukor van egy dobozban?', say: '3 egyforma doboz, mindegyikben ugyanannyi cukor van. Együtt 15 cukor. Hány cukor van egy dobozban?', scene: <GiftBoxes count={3} total={15} />, options: [5, 3, 15], hint: 'Próbálgass! Ha mindegyikben 5 van: 5, 10, 15. Ez jó?' },
  { id: 's20-34', level: 3, badge: 'Tízen át', ask: 'Melyik ugyanannyi, mint 8 + 7?', say: 'Melyik művelet ad ugyanannyit, mint 8 meg 7?', scene: <ExprScene text="8 + 7" />, options: ['8 + 2 + 5', '8 + 3 + 5', '8 + 2 + 7'], hint: 'A 7-et bontsd két részre: annyi, amennyi a tízig kell, és a maradék. 2 meg 5 az 7.' },
  { id: 's20-35', level: 3, badge: 'Szabály', ask: 'Melyik szám jön?', say: '1, 3, 4, 6, 7, és utána? Egyszer 2-t lépünk, aztán 1-et. Melyik szám jön?', scene: <SeqStrip items={[1, 3, 4, 6, 7, '?']} />, options: [9, 8, 10], hint: 'Nézd a lépéseket: 2-t, 1-et, 2-t, 1-et… Most 2-t kell lépni.' },
  { id: 's20-36', level: 3, badge: 'Kakukktojás', ask: 'Melyik NEM 20?', say: 'Három művelet eredménye 20, egyé nem. Melyik a kakukktojás?', options: ['13 + 6', '14 + 6', '12 + 8', '11 + 9'], hint: 'Számold ki mindegyiket! Három lesz 20, egy kevesebb.' },
];

export const SZAMOLAS20IG_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Koppints bal oldalon egy képre, aztán jobb oldalon a hozzá illő számra!',
    pairs: [
      { a: sm(<MiniGroup icon="csillag" n={11} />, 'tizenegy csillag'), b: 11 },
      { a: sm(<MiniGroup icon="csillag" n={14} />, 'tizennégy csillag'), b: 14 },
      { a: sm(<MiniGroup icon="csillag" n={17} />, 'tizenhét csillag'), b: 17 },
      { a: sm(<MiniGroup icon="csillag" n={20} />, 'húsz csillag'), b: 20 },
    ],
  },
  2: {
    say: 'Keresd meg, mi illik össze! A kockák és a korongok ugyanannyit mutassanak.',
    pairs: [
      { a: rods(12, 'tizenkét kocka'), b: sm(<MiniFrames a={12} />, 'tizenkét korong') },
      { a: rods(15, 'tizenöt kocka'), b: sm(<MiniFrames a={15} />, 'tizenöt korong') },
      { a: rods(18, 'tizennyolc kocka'), b: sm(<MiniFrames a={18} />, 'tizennyolc korong') },
      { a: rods(20, 'húsz kocka'), b: sm(<MiniFrames a={20} />, 'húsz korong') },
    ],
  },
  3: {
    say: 'Számolj! Előbb a tízig, aztán tovább. Melyik művelethez melyik eredmény tartozik?',
    pairs: [
      { a: '7 + 6', b: 13 },
      { a: '9 + 8', b: 17 },
      { a: '15 − 7', b: 8 },
      { a: '12 − 9', b: 3 },
      { a: '14 + 6', b: 20 },
    ],
  },
};

export const SZAMOLAS20IG_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'A 15-nél nagyobb számok az egyik kosárba, a többiek a másikba!',
    bins: [
      { label: '15 vagy kisebb', say: 'tizenöt vagy kisebb' },
      { label: '15-nél nagyobb', figure: <BigSign text="> 15" className="w-12 h-12" />, say: 'tizenötnél nagyobb' },
    ],
    items: [
      { item: 16, bin: 1 },
      { item: 3, bin: 0 },
      { item: 19, bin: 1 },
      { item: 15, bin: 0 },
      { item: 20, bin: 1 },
      { item: 11, bin: 0 },
      { item: 17, bin: 1 },
      { item: 8, bin: 0 },
    ],
  },
  2: {
    say: 'Egyjegyű vagy kétjegyű? Nézd meg, hány számjegyből áll a szám!',
    bins: [
      { label: 'Egyjegyű', figure: <BigSign text={7} className="w-12 h-12" />, say: 'egyjegyű' },
      { label: 'Kétjegyű', figure: <BigSign text={17} className="w-12 h-12" />, say: 'kétjegyű' },
    ],
    items: [
      { item: 6, bin: 0 },
      { item: 12, bin: 1 },
      { item: 9, bin: 0 },
      { item: 18, bin: 1 },
      { item: 0, bin: 0 },
      { item: 20, bin: 1 },
      { item: 5, bin: 0 },
      { item: 15, bin: 1 },
    ],
  },
  3: {
    say: 'Számold ki! Az eredmény páros vagy páratlan? Tedd a jó kosárba!',
    bins: [
      { label: 'Páros', say: 'páros' },
      { label: 'Páratlan', say: 'páratlan' },
    ],
    items: [
      { item: '11 + 5', bin: 0 },
      { item: '9 + 5 − 7', bin: 1 },
      { item: '20 − 11 + 10', bin: 1 },
      { item: '8 + 5 + 7', bin: 0 },
      { item: '6 + 6 + 6', bin: 0 },
      { item: '9 + 4 − 3', bin: 0 },
      { item: '9 + 8', bin: 1 },
      { item: '12 + 3 − 6', bin: 1 },
    ],
  },
};

export const Szamolas20IgG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="11. Számolás 20-ig"
    badge="1. OSZTÁLY • VI. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 20-IG • JÁTÉK"
    base="g1-c20-szamolas-20-ig"
    chapterId="szamkorbovites-20-ig"
    questions={SZAMOLAS20IG_G1_QUESTIONS}
    pairs={SZAMOLAS20IG_G1_PAIRS}
    sort={SZAMOLAS20IG_G1_SORT}
    {...props}
  />
);

export default Szamolas20IgG1Jatek;
