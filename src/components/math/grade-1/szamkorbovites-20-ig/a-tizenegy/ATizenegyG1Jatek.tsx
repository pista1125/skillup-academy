import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { BigSign, Domino, IconName, NumberLine } from '../../shared/G1Pics';
import { BagScene, CompareScene, DominoPair, ExprScene, GroupBox, MiniGroup, OpScene, PotyiPlusScene, ScatterScene, SeqStrip, TensRod, TwoFrames } from './ATizenegyG1Scenes';

const pic = (icon: IconName, n: number, say: string) => ({ figure: <GroupBox icon={icon} n={n} />, say });
const big = (t: string | number, say: string) => ({ figure: <BigSign text={t} />, say });
const frames = (a: number, b: number, say: string) => ({ figure: <TwoFrames a={a} b={b} className="w-40 h-auto" />, say });

export const A_TIZENEGY_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – a 11 felismerése, számlálás
  { id: 't1', level: 1, badge: 'Számlálás 11-ig', ask: 'Hány pötty van összesen?', say: 'Pötyin és Züminél hány pötty van összesen?', scene: <PotyiPlusScene ones={1} />, options: [11, 10, 1], hint: 'Pötyi két teli szárnya 10. Számolj tovább Zümi pöttyével!' },
  { id: 't2', level: 1, badge: 'Számlálás 11-ig', ask: 'Hol van 11 alma?', options: [pic('alma', 11, 'tizenegy alma'), pic('alma', 10, 'tíz alma'), pic('alma', 9, 'kilenc alma')], hint: 'Két teli sor 10 alma. 11-hez még 1 alma kell alul.' },
  { id: 't3', level: 1, badge: 'Számjegyek', ask: 'Melyik a tizenegy?', options: [big('11', 'tizenegy'), big('10', 'tíz'), big('1', 'egy')], hint: 'A tizenegyet két egyessel írjuk, egymás mellé.' },
  { id: 't4', level: 1, badge: 'Tízes és egyes', ask: 'Hány korong van?', say: 'Hány korong van a két keretben összesen?', scene: <TwoFrames a={10} b={1} />, options: [11, 10, 9], hint: 'A teli keret 10. A másikban még 1. Számolj tovább!' },
  { id: 't5', level: 1, badge: 'Számlálás 11-ig', ask: 'Hány labda van?', say: 'A zsákban 10 labda van, mellette még néhány. Hány labda van összesen?', scene: <BagScene icon="labda" n={11} />, options: [11, 10, 1], hint: 'A zsákban 10 labda van. Számolj tovább a kint lévővel!' },
  { id: 't6', level: 1, badge: 'Tízesrúd', ask: 'Hány kocka van?', say: 'Egy tízesrúd és mellette kocka. Hány kocka van összesen?', scene: <TensRod n={11} />, options: [11, 10, 2], hint: 'A tízesrúdban 10 kocka van. Meg még 1.' },
  { id: 't7', level: 1, badge: 'Dominó', ask: 'Melyik dominópáron van 11 pötty?', options: [{ figure: <DominoPair ones={1} />, say: 'öt és öt, meg egy' }, { figure: <DominoPair ones={0} />, say: 'öt és öt' }, { figure: <Domino left={5} right={4} />, say: 'öt és négy' }], hint: 'Az első dominón 10 pötty van. Kell még 1 pötty!' },
  { id: 't8', level: 1, badge: 'Számlálás 11-ig', ask: 'Hány méhecske repül?', say: 'Hány méhecske repül a kertben? Mutass rá mindegyikre!', scene: <ScatterScene icon="meh" n={11} />, options: [11, 10, 9], hint: 'Mutass rá mindegyikre, és számolj hangosan! Egyet se hagyj ki!' },
  // 2. szint – számegyenes, sorrend, tízes és egyes, műveletek
  { id: 't9', level: 2, badge: 'Számegyenes', ask: 'Melyik szám van a kérdőjel helyén?', scene: <NumberLine max={11} question={11} />, options: [11, 10, 9], hint: 'Mi jön a 10 után?' },
  { id: 't10', level: 2, badge: 'Számsor', ask: 'Melyik szám jön ezután?', say: '8, 9, 10, és utána? Melyik szám jön?', scene: <SeqStrip items={[8, 9, 10, '?']} />, options: [11, 9, 1], hint: 'Számolj tovább: a 10 után mi jön?' },
  { id: 't11', level: 2, badge: 'Visszafelé számlálás', ask: 'Számolj visszafelé! Mi jön?', say: '11, 10, és utána? Számolj visszafelé!', scene: <SeqStrip items={[11, 10, '?']} />, options: [9, 11, 8], hint: 'Visszafelé mindig eggyel kevesebb jön. A 10 előtt mi van?' },
  { id: 't12', level: 2, badge: 'Számjegy és mennyiség', ask: 'Melyik kép illik a 11-hez?', scene: <BigSign text="11" className="w-24 h-24 mx-auto" />, options: [pic('eper', 11, 'tizenegy eper'), pic('eper', 10, 'tíz eper'), pic('eper', 8, 'nyolc eper')], hint: 'Két teli sor és még 1 eper. Számold meg!' },
  { id: 't13', level: 2, badge: 'Tízes és egyes', ask: 'Hány tízes van a 11-ben?', say: 'Egy teli keret egy tízes. Hány tízes van a 11-ben?', scene: <TwoFrames a={10} b={1} />, options: [1, 11, 10], hint: 'Hány teli keret van? Az egy teli keret az egy tízes.' },
  { id: 't14', level: 2, badge: 'Összeadás', ask: 'Mennyi 10 + 1?', say: 'Mennyi 10 meg 1?', scene: <ExprScene text="10 + 1 = ?" />, options: [11, 10, 1], hint: 'A 10 után egyet lépj tovább!' },
  { id: 't15', level: 2, badge: 'Összeadás', ask: 'Hány virág lesz?', say: '1 virág, meg még 10 virág. Hány virág lesz?', scene: <OpScene icon="virag" a={1} b={10} op="+" />, options: [11, 10, 9], hint: '1 meg 10 ugyanannyi, mint 10 meg 1.' },
  { id: 't16', level: 2, badge: 'Kivonás', ask: 'Mennyi marad?', say: '11 korongból elvettünk 10-et, a teli keretet. Mennyi marad?', scene: <TwoFrames a={11} crossed={10} crossStart={0} />, options: [1, 10, 11], hint: 'Az egész teli keret áthúzva. Hány korong nincs áthúzva?' },
  // 3. szint – összehasonlítás, 10-en át, bontás, kis történetek
  { id: 't17', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: '11 virág, és 10 virág. Melyik jel kell középre?', scene: <CompareScene icon="virag" a={11} b={10} />, options: ['>', '<', '='], hint: 'Bal oldalon eggyel több van. A jel szája a több felé nyílik.' },
  { id: 't18', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: '9 labda, és 11 labda. Melyik jel kell középre?', scene: <CompareScene icon="labda" a={9} b={11} />, options: ['<', '>', '='], hint: 'Jobb oldalon van több. A jel hegye a kevesebb felé mutat.' },
  { id: 't19', level: 3, badge: 'Összeadás 10-en át', ask: 'Mennyi 9 + 2?', say: '9 piros korong, meg 2 kék. Mennyi 9 meg 2?', scene: <TwoFrames a={9} b={2} />, options: [11, 10, 9], hint: 'Előbb töltsd meg a keretet: 9 meg 1 az 10. Aztán még 1.' },
  { id: 't20', level: 3, badge: 'Kivonás 10-en át', ask: 'Mennyi 11 − 2?', say: '11 korongból 2-t áthúztunk. Mennyi 11 elvéve 2?', scene: <TwoFrames a={11} crossed={2} />, options: [9, 10, 8], hint: 'Előbb 1-et veszünk el: 10 marad. Aztán még 1-et.' },
  { id: 't21', level: 3, badge: 'A 11 bontása', ask: 'Hány kék korong van?', say: '11 korong van. 7 piros. Hány kék?', scene: <TwoFrames a={7} b={4} />, options: [4, 3, 5], hint: 'Csak a kék korongokat számold meg!' },
  { id: 't22', level: 3, badge: 'Történet', ask: 'Hány virágra szállt Zümi?', say: 'Zümi reggel 6 virágra szállt, délután még 5-re. Hány virágra szállt összesen?', scene: <OpScene icon="virag" a={6} b={5} op="+" />, options: [11, 10, 9], hint: '6 meg 4 az 10. Az ötből még 1 maradt: 10 meg 1.' },
  { id: 't23', level: 3, badge: 'A 11 felismerése', ask: 'Melyik NEM tizenegy?', say: 'Két képen tizenegy van. Melyiken nem?', options: [pic('hal', 10, 'tíz hal'), { figure: <DominoPair ones={1} />, say: 'öt és öt, meg egy pötty' }, { figure: <TensRod n={11} />, say: 'tízesrúd és egy kocka' }], hint: 'Számold meg mindhármat! Melyik kevesebb?' },
  { id: 't24', level: 3, badge: 'Nyitott mondat', ask: 'Melyik szám kell a négyzetbe?', say: '11 egyenlő 10 meg valahány. Melyik szám kell a négyzetbe?', scene: <ExprScene text="11 = 10 + □" />, options: [1, 11, 0], hint: '1 tízes és hány egyes a 11?' },
];

export const A_TIZENEGY_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Koppints egy képre, aztán a számra, ami illik hozzá!',
    pairs: [
      { a: { figure: <MiniGroup icon="alma" n={11} />, say: 'tizenegy alma' }, b: 11 },
      { a: { figure: <MiniGroup icon="alma" n={10} />, say: 'tíz alma' }, b: 10 },
      { a: { figure: <MiniGroup icon="alma" n={8} />, say: 'nyolc alma' }, b: 8 },
      { a: { figure: <MiniGroup icon="alma" n={5} />, say: 'öt alma' }, b: 5 },
    ],
  },
  2: {
    say: 'Keresd meg, mi illik össze! Ugyanannyi legyen.',
    pairs: [
      { a: frames(10, 1, 'egy teli keret és egy korong'), b: { figure: <TensRod n={11} className="w-36 h-auto" />, say: 'tízesrúd és egy kocka' } },
      { a: frames(10, 0, 'egy teli keret'), b: { figure: <TensRod n={10} className="w-36 h-auto" />, say: 'egy tízesrúd' } },
      { a: frames(7, 0, 'hét korong'), b: { figure: <MiniGroup icon="csillag" n={7} />, say: 'hét csillag' } },
      { a: { figure: <Domino left={5} right={4} className="w-28 h-auto" />, say: 'öt és négy pötty' }, b: { figure: <BigSign text="9" className="w-14 h-14" />, say: 'kilenc' } },
    ],
  },
  3: {
    say: 'Párosítsd a műveletet az eredményével!',
    pairs: [
      { a: '10 + 1', b: 11 },
      { a: '11 − 1', b: 10 },
      { a: '11 − 10', b: 1 },
      { a: '11 − 2', b: 9 },
      { a: '6 + 2', b: 8 },
    ],
  },
};

export const A_TIZENEGY_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Hová való a kép? Ahol tizenegy van, az a tizenegyes kosár. Ahol nem tizenegy, az a másik.',
    bins: [
      { label: 'Tizenegy', figure: <BigSign text="11" className="w-12 h-12" />, say: 'tizenegy' },
      { label: 'Nem tizenegy', say: 'nem tizenegy' },
    ],
    items: [
      { item: { figure: <MiniGroup icon="alma" n={11} />, say: 'almák' }, bin: 0 },
      { item: { figure: <MiniGroup icon="labda" n={10} />, say: 'labdák' }, bin: 1 },
      { item: { figure: <MiniGroup icon="virag" n={11} />, say: 'virágok' }, bin: 0 },
      { item: { figure: <MiniGroup icon="hal" n={9} />, say: 'halak' }, bin: 1 },
      { item: { figure: <TensRod n={11} className="w-28 h-auto" />, say: 'kockák' }, bin: 0 },
      { item: { figure: <MiniGroup icon="gomba" n={6} />, say: 'gombák' }, bin: 1 },
    ],
  },
  2: {
    say: 'Tizenegy, vagy tizenegynél kevesebb? Tedd a jó kosárba!',
    bins: [
      { label: 'Kevesebb, mint 11', say: 'tizenegynél kevesebb' },
      { label: 'Pont 11', figure: <BigSign text="11" className="w-12 h-12" />, say: 'pont tizenegy' },
    ],
    items: [
      { item: frames(10, 1, 'korongok'), bin: 1 },
      { item: frames(10, 0, 'korongok, teli keret'), bin: 0 },
      { item: frames(9, 0, 'kilenc korong'), bin: 0 },
      { item: { figure: <TensRod n={11} className="w-28 h-auto" />, say: 'tízesrúd és egy kocka' }, bin: 1 },
      { item: { figure: <MiniGroup icon="eper" n={11} />, say: 'eprek' }, bin: 1 },
      { item: { figure: <MiniGroup icon="eper" n={7} />, say: 'eprek' }, bin: 0 },
      { item: 10, bin: 0 },
      { item: 11, bin: 1 },
    ],
  },
  3: {
    say: 'Mennyi lesz? Tíz, vagy tizenegy? Tedd a jó kosárba!',
    bins: [
      { label: '10', say: 'tíz' },
      { label: '11', say: 'tizenegy' },
    ],
    items: [
      { item: '9 + 1', bin: 0 },
      { item: '9 + 2', bin: 1 },
      { item: '10 + 1', bin: 1 },
      { item: '11 − 1', bin: 0 },
      { item: '5 + 6', bin: 1 },
      { item: '8 + 2', bin: 0 },
      { item: '1 + 10', bin: 1 },
      { item: '10 + 0', bin: 0 },
    ],
  },
};

export const ATizenegyG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="1. A tizenegy"
    badge="1. OSZTÁLY • VI. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 20-IG • JÁTÉK"
    base="g1-c20-a-tizenegy"
    chapterId="szamkorbovites-20-ig"
    questions={A_TIZENEGY_G1_QUESTIONS}
    pairs={A_TIZENEGY_G1_PAIRS}
    sort={A_TIZENEGY_G1_SORT}
    {...props}
  />
);

export default ATizenegyG1Jatek;
