import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { BigSign, Domino, IconGroup, IconName, ICONS, NumberLine } from '../../shared/G1Pics';
import { CompareScene, DominoPair, ExprScene, GroupBox, MiniGroup, ScatterScene, SeqStrip, TensRod, TwoFrames } from '../a-tizenegy/ATizenegyG1Scenes';
import { BalloonsScene, DiceCard, DiceScene } from './ATizenkettoG1Scenes';

const pic = (icon: IconName, n: number, say: string) => ({ figure: <GroupBox icon={icon} n={n} />, say });
const big = (t: string | number, say: string) => ({ figure: <BigSign text={t} />, say });
const one = (icon: IconName, say: string) => ({
  figure: (
    <svg viewBox="0 0 80 80" className="w-16 h-16">
      <rect x="3" y="3" width="74" height="74" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      {ICONS[icon]({ x: 40, y: 42, s: 1.4 })}
    </svg>
  ),
  say,
});

export const A_TIZENKETTO_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – a 12 felismerése, számlálás
  { id: 'z1', level: 1, badge: 'Számlálás 12-ig', ask: 'Hány lufi van?', say: 'Hány lufi van a zsúron? Mutass rá mindegyikre!', scene: <BalloonsScene n={12} />, options: [12, 11, 10], hint: 'Fent 6, lent is 6. Számolj tovább a felső sor után!' },
  { id: 'z2', level: 1, badge: 'Számlálás 12-ig', ask: 'Hol van 12 eper?', options: [pic('eper', 12, 'tizenkét eper'), pic('eper', 11, 'tizenegy eper'), pic('eper', 10, 'tíz eper')], hint: 'Két teli sor 10. A 12-höz alul még 2 eper kell.' },
  { id: 'z3', level: 1, badge: 'Számjegyek', ask: 'Melyik a tizenkettő?', options: [big('12', 'tizenkettő'), big('11', 'tizenegy'), big('2', 'kettő')], hint: 'Elöl egy egyes, mellette egy kettes.' },
  { id: 'z4', level: 1, badge: 'Tízes és egyes', ask: 'Hány korong van?', say: 'Hány korong van a két keretben összesen?', scene: <TwoFrames a={10} b={2} />, options: [12, 11, 10], hint: 'A teli keret 10. Számolj tovább a kék korongokkal: 11, 12.' },
  { id: 'z5', level: 1, badge: 'Tízesrúd', ask: 'Hány kocka van?', say: 'Egy tízesrúd és mellette kockák. Hány kocka van összesen?', scene: <TensRod n={12} />, options: [12, 10, 2], hint: 'A tízesrúd 10. Meg még 2 kocka.' },
  { id: 'z6', level: 1, badge: 'Dominó', ask: 'Melyik dominópáron van 12 pötty?', options: [{ figure: <DominoPair ones={2} />, say: 'öt és öt, meg kettő' }, { figure: <DominoPair ones={1} />, say: 'öt és öt, meg egy' }, { figure: <Domino left={5} right={5} />, say: 'öt és öt' }], hint: 'Az első dominón 10 pötty van. Kell még 2.' },
  { id: 'z7', level: 1, badge: 'Számlálás 12-ig', ask: 'Hány csillag van?', say: 'Hány csillag ragyog az égen? Mutass rá mindegyikre!', scene: <ScatterScene icon="csillag" n={12} />, options: [12, 11, 10], hint: 'Mutass rá mindegyikre! Egyet se számolj kétszer!' },
  { id: 'z8', level: 1, badge: 'Tízes és egyes', ask: 'Hány egyes van a 12-ben?', say: 'A teli keret a tízes. Hány egyes van a 12-ben?', scene: <TwoFrames a={10} b={2} />, options: [2, 1, 12], hint: 'Számold meg a kék korongokat a második keretben!' },
  // 2. szint – számegyenes, szomszédok, műveletek
  { id: 'z9', level: 2, badge: 'Számegyenes', ask: 'Melyik szám van a kérdőjel helyén?', scene: <NumberLine max={12} question={12} />, options: [12, 11, 10], hint: 'Mi jön a 11 után?' },
  { id: 'z10', level: 2, badge: 'Számszomszédok', ask: 'Melyik szám van középen?', say: '10, valami, 12. Melyik szám van a 10 és a 12 között?', scene: <SeqStrip items={[10, '?', 12]} />, options: [11, 9, 2], hint: 'A 10 után jön, és a 12 előtt.' },
  { id: 'z11', level: 2, badge: 'Visszafelé számlálás', ask: 'Számolj visszafelé! Mi jön?', say: '12, 11, és utána? Számolj visszafelé!', scene: <SeqStrip items={[12, 11, '?']} />, options: [10, 12, 9], hint: 'Visszafelé mindig eggyel kevesebb jön.' },
  { id: 'z12', level: 2, badge: 'Összeadás', ask: 'Mennyi 10 + 2?', say: 'Mennyi 10 meg 2?', scene: <ExprScene text="10 + 2 = ?" />, options: [12, 11, 2], hint: '1 tízes és 2 egyes. Hogy hívjuk?' },
  { id: 'z13', level: 2, badge: 'Kivonás', ask: 'Mennyi marad?', say: '12 korongból elvettük a teli keretet, a 10-et. Mennyi marad?', scene: <TwoFrames a={12} crossed={10} crossStart={0} />, options: [2, 10, 12], hint: 'Hány korong nincs áthúzva?' },
  { id: 'z14', level: 2, badge: 'Kivonás', ask: 'Hány lufi maradt?', say: '12 lufiból 1 kipukkadt. Hány lufi maradt?', scene: <BalloonsScene n={12} popped={1} />, options: [11, 12, 10], hint: 'Egy lufi áthúzva. A 12 előtt melyik szám van?' },
  { id: 'z15', level: 2, badge: 'Páros, páratlan', ask: 'Páros vagy páratlan a 12?', say: 'Állítsd párba a halakat! Páros vagy páratlan a 12?', scene: <IconGroup icon="hal" n={12} perRow={6} className="w-64 h-auto mx-auto" />, options: ['páros', 'páratlan'], hint: 'Fent 6 hal, lent 6 hal. Minden halnak jut párja?' },
  { id: 'z16', level: 2, badge: 'Számjegy és mennyiség', ask: 'Melyik kép illik a 12-höz?', scene: <BigSign text="12" className="w-24 h-24 mx-auto" />, options: [pic('szív', 12, 'tizenkét szív'), pic('szív', 11, 'tizenegy szív'), pic('szív', 9, 'kilenc szív')], hint: 'Két teli sor és még 2. Számold meg!' },
  // 3. szint – összehasonlítás, 10-en át, kocka, kis történetek
  { id: 'z17', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: '12 alma, és 11 alma. Melyik jel kell középre?', scene: <CompareScene icon="alma" a={12} b={11} />, options: ['>', '<', '='], hint: 'Bal oldalon eggyel több van. A jel szája a több felé nyílik.' },
  { id: 'z18', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: '10 gomba, és 12 gomba. Melyik jel kell középre?', scene: <CompareScene icon="gomba" a={10} b={12} />, options: ['<', '>', '='], hint: 'Jobb oldalon van több. A jel hegye a kevesebb felé mutat.' },
  { id: 'z19', level: 3, badge: 'Összeadás 10-en át', ask: 'Mennyi 8 + 4?', say: '8 piros korong, meg 4 kék. Mennyi 8 meg 4?', scene: <TwoFrames a={8} b={4} />, options: [12, 11, 10], hint: 'Előbb töltsd meg a keretet: 8 meg 2 az 10. Aztán még 2.' },
  { id: 'z20', level: 3, badge: 'Kivonás 10-en át', ask: 'Mennyi 12 − 4?', say: '12 korongból 4-et áthúztunk. Mennyi 12 elvéve 4?', scene: <TwoFrames a={12} crossed={4} />, options: [8, 9, 7], hint: 'Előbb 2-t veszünk el: 10 marad. Aztán még 2-t.' },
  { id: 'z21', level: 3, badge: 'Összeadás 10-en át', ask: 'Mennyi 9 + 3?', say: '9 piros korong, meg 3 kék. Mennyi 9 meg 3?', scene: <TwoFrames a={9} b={3} />, options: [12, 11, 10], hint: '9 meg 1 az 10. A háromból még 2 maradt.' },
  { id: 'z22', level: 3, badge: 'Történet', ask: 'Hány lufit fújt fel Csigusz?', say: 'Csigusz 5 kék és 7 piros lufit fújt fel. Hány lufit fújt fel összesen?', scene: <BalloonsScene n={12} blue={5} />, options: [12, 11, 10], hint: '7 meg 3 az 10. Az ötből még 2 maradt.' },
  { id: 'z23', level: 3, badge: 'Kockadobás', ask: 'Mennyi a két kocka együtt?', say: 'Zümi 6-ot és 5-öt dobott. Mennyi 6 meg 5?', scene: <DiceScene a={6} b={5} />, options: [11, 12, 10], hint: 'Számolj tovább a 6-tól az öt pöttyel: 7, 8, 9, 10, 11.' },
  { id: 'z24', level: 3, badge: 'Nyitott mondat', ask: 'Melyik szám kell a négyzetbe?', say: '12 egyenlő 6 meg valahány. Melyik szám kell a négyzetbe?', scene: <ExprScene text="12 = 6 + □" />, options: [6, 7, 5], hint: 'A 12 két egyforma részre bontható. Gondolj a tortára!' },
];

export const A_TIZENKETTO_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Koppints egy képre, aztán a számra, ami illik hozzá!',
    pairs: [
      { a: { figure: <MiniGroup icon="eper" n={12} />, say: 'tizenkét eper' }, b: 12 },
      { a: { figure: <MiniGroup icon="eper" n={11} />, say: 'tizenegy eper' }, b: 11 },
      { a: { figure: <MiniGroup icon="eper" n={10} />, say: 'tíz eper' }, b: 10 },
      { a: { figure: <MiniGroup icon="eper" n={6} />, say: 'hat eper' }, b: 6 },
    ],
  },
  2: {
    say: 'Dobókocka! Párosítsd a két kockát azzal a számmal, amennyi pötty van rajtuk együtt!',
    pairs: [
      { a: { figure: <DiceCard a={6} b={6} />, say: 'hat és hat' }, b: 12 },
      { a: { figure: <DiceCard a={5} b={6} />, say: 'öt és hat' }, b: 11 },
      { a: { figure: <DiceCard a={4} b={6} />, say: 'négy és hat' }, b: 10 },
      { a: { figure: <DiceCard a={3} b={4} />, say: 'három és négy' }, b: 7 },
    ],
  },
  3: {
    say: 'Párosítsd a műveletet az eredményével!',
    pairs: [
      { a: '10 + 2', b: 12 },
      { a: '12 − 2', b: 10 },
      { a: '6 + 5', b: 11 },
      { a: '12 − 10', b: 2 },
      { a: '12 − 4', b: 8 },
    ],
  },
};

export const A_TIZENKETTO_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Rakj rendet a zsúr után! Az ennivaló az asztalra, a játék a dobozba.',
    bins: [
      { label: 'Ennivaló', say: 'ennivaló' },
      { label: 'Játék', say: 'játék' },
    ],
    items: [
      { item: one('alma', 'alma'), bin: 0 },
      { item: one('labda', 'labda'), bin: 1 },
      { item: one('eper', 'eper'), bin: 0 },
      { item: one('auto', 'kisautó'), bin: 1 },
      { item: one('gomba', 'gomba'), bin: 0 },
      { item: one('korong', 'korong'), bin: 1 },
    ],
  },
  2: {
    say: 'Páros, vagy páratlan? Tedd a számot a jó kosárba!',
    bins: [
      { label: 'Páros', say: 'páros' },
      { label: 'Páratlan', say: 'páratlan' },
    ],
    items: [
      { item: 12, bin: 0 },
      { item: 11, bin: 1 },
      { item: 10, bin: 0 },
      { item: 9, bin: 1 },
      { item: 8, bin: 0 },
      { item: 7, bin: 1 },
      { item: 6, bin: 0 },
      { item: 5, bin: 1 },
    ],
  },
  3: {
    say: 'Mennyi lesz? Tizenegy, vagy tizenkettő? Tedd a jó kosárba!',
    bins: [
      { label: '11', say: 'tizenegy' },
      { label: '12', say: 'tizenkettő' },
    ],
    items: [
      { item: '6 + 6', bin: 1 },
      { item: '9 + 3', bin: 1 },
      { item: '8 + 4', bin: 1 },
      { item: '10 + 2', bin: 1 },
      { item: '6 + 5', bin: 0 },
      { item: '9 + 2', bin: 0 },
      { item: '12 − 1', bin: 0 },
      { item: '7 + 4', bin: 0 },
    ],
  },
};

export const ATizenkettoG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="2. A tizenkettő"
    badge="1. OSZTÁLY • VI. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 20-IG • JÁTÉK"
    base="g1-c20-a-tizenketto"
    chapterId="szamkorbovites-20-ig"
    questions={A_TIZENKETTO_G1_QUESTIONS}
    pairs={A_TIZENKETTO_G1_PAIRS}
    sort={A_TIZENKETTO_G1_SORT}
    {...props}
  />
);

export default ATizenkettoG1Jatek;
