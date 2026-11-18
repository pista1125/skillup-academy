import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { BigSign, Domino, IconGroup, NumberLine, TenFrame } from '../../shared/G1Pics';
import { Potyi } from '../../shared/Potyi';
import { ChestCard, CompareScene, ExprScene, GroupBox, HandsScene, HousesScene, MiniGroup, OpScene, PinsScene, PotyiScene, SeqStrip } from '../a-het/AHetG1Scenes';
import { COLORS, DieScene, ShapeCard, ShapeRow } from './Megallo7G1Scenes';

const tf = (n: number, second: number, say: string) => ({ figure: <TenFrame n={n} second={second} className="w-32 h-auto" />, say });
const die = (n: number, say: string) => ({ figure: <Domino left={n} single className="w-16 h-16" />, say });
const steps = (from: number, to: number) =>
  from < to ? Array.from({ length: to - from }, (_, i) => ({ from: from + i, to: from + i + 1 })) : Array.from({ length: from - to }, (_, i) => ({ from: from - i, to: from - i - 1 }));
const CHEST_NAME: Record<number, string> = { 2: 'a kettes láda', 4: 'a négyes láda', 5: 'az ötös láda', 6: 'a hatos láda' };
const chest = (n: number, color: string) => ({ figure: <ChestCard n={n} color={color} />, say: CHEST_NAME[n] });

const RK = { k: 'kor' as const, c: COLORS.piros };
const BN = { k: 'negyzet' as const, c: COLORS.kek };
const YT = { k: 'haromszog' as const, c: COLORS.sarga };
const GK = { k: 'kor' as const, c: COLORS.zold };

export const MEGALLO_7_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – számlálás, számjegyek, egyszerű műveletek képről
  { id: 'm1', level: 1, badge: 'Számlálás 7-ig', ask: 'Hány katica van?', scene: <IconGroup icon="katica" n={7} perRow={4} className="w-56 h-auto mx-auto" />, options: [7, 6, 5], hint: 'Fent négy van. Számolj tovább az alsó sorral!' },
  { id: 'm2', level: 1, badge: 'Számlálás 7-ig', ask: 'Hol van 6 virág?', options: [{ figure: <GroupBox icon="virag" n={6} />, say: 'hat virág' }, { figure: <GroupBox icon="virag" n={7} />, say: 'hét virág' }, { figure: <GroupBox icon="virag" n={5} />, say: 'öt virág' }], hint: 'Számold meg a virágokat mindegyik képen! Hat kell.' },
  { id: 'm3', level: 1, badge: 'Számjegy', ask: 'Melyik a hetes?', options: [{ figure: <BigSign text="7" />, say: 'hetes' }, { figure: <BigSign text="2" />, say: 'kettes' }, { figure: <BigSign text="1" />, say: 'egyes' }], hint: 'A hetesnek vízszintes teteje van, onnan megy ferdén le.' },
  { id: 'm4', level: 1, badge: 'Ujjkép', ask: 'Hány ujj van fent?', say: 'Hány ujj van fent a két kézen összesen?', scene: <HandsScene a={5} b={1} />, options: [6, 7, 5], hint: 'Egy egész kéz az öt. Számolj tovább a másik kézzel!' },
  { id: 'm5', level: 1, badge: 'Dominó', ask: 'Hány pötty van a dominón?', scene: <Domino left={4} right={3} className="w-48 h-auto mx-auto" />, options: [7, 6, 5], hint: 'Számold meg mindkét oldalt együtt!' },
  { id: 'm6', level: 1, badge: 'Számegyenes', ask: 'Melyik szám hiányzik?', say: 'Melyik szám van a kérdőjel helyén a számegyenesen?', scene: <NumberLine max={7} question={6} />, options: [6, 5, 7], hint: 'Az öt és a hét között melyik szám áll?' },
  { id: 'm7', level: 1, badge: 'Összeadás képről', ask: 'Hány alma lesz?', say: 'Négy alma, meg még kettő. Hány alma lesz?', scene: <OpScene icon="alma" a={4} b={2} op="+" />, options: [6, 5, 7], hint: 'Számolj tovább a négytől: öt, hat.' },
  { id: 'm8', level: 1, badge: 'Elvétel képről', ask: 'Hány eper marad?', say: 'Hét eperből hármat megettek. Hány eper marad?', scene: <OpScene icon="eper" a={7} b={3} op="−" />, options: [4, 3, 7], hint: 'Az áthúzott epreket ne számold!' },
  { id: 'm9', level: 1, badge: 'Számszomszéd', ask: 'Mi jön a 4 után?', say: 'Melyik szám jön a négyes után?', scene: <NumberLine max={7} mark={[4]} question={5} />, options: [5, 3, 6], hint: 'Utána: eggyel tovább jobbra.' },
  { id: 'm10', level: 1, badge: 'Páros, páratlan', ask: 'Páros vagy páratlan?', say: 'Hat labda, párban. Ez páros, vagy páratlan?', scene: <IconGroup icon="labda" n={6} perRow={2} className="w-28 h-auto mx-auto" />, options: ['páros', 'páratlan'], hint: 'Nézd meg: mindegyik labdának van párja?' },
  { id: 'm11', level: 1, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: 'Hat gomba, és négy gomba. Melyik jel kell középre?', scene: <CompareScene icon="gomba" a={6} b={4} />, options: ['>', '<', '='], hint: 'Bal oldalon több van. A jel szája a több felé nyílik.' },
  { id: 'm12', level: 1, badge: 'Korongkép', ask: 'Hány korong van összesen?', scene: <TenFrame n={3} second={4} />, options: [7, 6, 4], hint: 'A piros és a kék korongokat is számold!' },
  // 2. szint – számegyenes, kiegészítés, szomszédok, sorminta, kocka
  { id: 'm13', level: 2, badge: 'Számegyenes', ask: '3 + 4 = ?', say: 'Csigusz a hármasról négyet ugrik előre. Hová ér?', scene: <NumberLine max={7} mark={[3]} question={7} jumps={steps(3, 7)} />, options: [7, 6, 5], hint: 'Számold az ugrásokat a hármastól!' },
  { id: 'm14', level: 2, badge: 'Számegyenes', ask: '6 − 4 = ?', say: 'Zümi a hatosról négyet repül visszafelé. Hová ér?', scene: <NumberLine max={7} mark={[6]} question={2} jumps={steps(6, 2)} />, options: [2, 3, 4], hint: 'Visszafelé lépj a hatostól: öt, négy, három, kettő.' },
  { id: 'm15', level: 2, badge: 'Elvétel képről', ask: 'Hány bábu áll még?', say: 'Hét bábu állt, négy eldőlt. Hány bábu áll még?', scene: <PinsScene total={7} fallen={4} />, options: [3, 4, 2], hint: 'Csak az álló bábukat számold!' },
  { id: 'm16', level: 2, badge: 'Kiegészítés 7-re', ask: 'Hány kell még, hogy 7 legyen?', say: 'Öt piros korong van. Hány kéket tegyünk mellé, hogy hét legyen?', scene: <TenFrame n={5} />, options: [2, 3, 1], hint: 'Számolj tovább az öttől hétig!' },
  { id: 'm17', level: 2, badge: 'Számszomszédok', ask: 'Kik a 6 szomszédai?', say: 'Kik laknak a hatos ház két oldalán?', scene: <HousesScene houses={[{ label: '?' }, { label: 6, hi: true }, { label: '?' }]} />, options: ['5 és 7', '4 és 6', '6 és 7'], hint: 'Egy szám előtte, egy utána. Magát a hatot ne válaszd!' },
  { id: 'm18', level: 2, badge: 'Visszafelé', ask: 'Melyik szám hiányzik?', say: 'Hét, hat, öt, és? Számolj visszafelé!', scene: <SeqStrip items={[7, 6, 5, '?']} />, options: [4, 3, 5], hint: 'Visszafelé mindig eggyel kevesebb jön.' },
  { id: 'm19', level: 2, badge: 'Szomszéd és jel', ask: 'Melyik szám kell a kérdőjel helyére?', say: 'Egy kisebb, mint valami, és az kisebb, mint három. Melyik szám az?', scene: <ExprScene text="1 < ? < 3" />, options: [2, 0, 4], hint: 'Az egy és a három között egyetlen szám van.' },
  { id: 'm20', level: 2, badge: 'Sorminta', ask: 'Mi jön a sorban?', say: 'Piros kör, kék négyzet, piros kör, kék négyzet. Mi jön utána?', scene: <ShapeRow items={[RK, BN, RK, BN, '?']} />, options: [{ figure: <ShapeCard s={RK} />, say: 'piros kör' }, { figure: <ShapeCard s={BN} />, say: 'kék négyzet' }, { figure: <ShapeCard s={GK} />, say: 'zöld kör' }], hint: 'Mindig kettő ismétlődik. Mi jött a kék négyzet után?' },
  { id: 'm21', level: 2, badge: 'Dobókocka', ask: 'Fent 3 pötty. Hány van alul?', say: 'A dobókocka szemközti lapjain együtt mindig hét pötty van. Fent három. Hány pötty van alul?', scene: <DieScene top={3} />, options: [4, 3, 5], hint: 'Számolj tovább a hármastól hétig!' },
  { id: 'm22', level: 2, badge: 'Páros, páratlan', ask: 'Melyik képen páratlan a korongok száma?', say: 'Melyik képen páratlan a korongok száma? Ott nem lehet mindet párba állítani.', options: [{ figure: <MiniGroup icon="korong" n={5} />, say: 'öt korong' }, { figure: <MiniGroup icon="korong" n={4} />, say: 'négy korong' }, { figure: <MiniGroup icon="korong" n={6} />, say: 'hat korong' }], hint: 'Állítsd párba a korongokat! Hol marad egy egyedül?' },
  { id: 'm23', level: 2, badge: 'Kép a művelethez', ask: 'Melyik kép illik ide: 3 + 3?', say: 'Melyik korongkép illik ehhez: három meg három?', options: [tf(3, 3, 'három piros, három kék'), tf(3, 4, 'három piros, négy kék'), tf(2, 3, 'két piros, három kék')], hint: 'Három piros és három kék kell.' },
  { id: 'm24', level: 2, badge: 'Elvétel képről', ask: 'Hány levél marad?', say: 'Hét levél volt a fán, ötöt elfújt a szél. Hány maradt?', scene: <OpScene icon="level" a={7} b={5} op="−" />, options: [2, 5, 3], hint: 'Csak a nem áthúzott leveleket számold!' },
  // 3. szint – műveletek és jelek, két lépés, történetek, logika
  { id: 'm25', level: 3, badge: 'Művelet és jel', ask: 'Melyik jel kell?', say: 'Hat meg egy, és öt meg kettő. Melyik jel kell középre?', scene: <ExprScene text="6 + 1 ? 5 + 2" />, options: ['=', '<', '>'], hint: 'Számold ki mindkét oldalt! Ugyanannyi lett?' },
  { id: 'm26', level: 3, badge: 'Művelet és jel', ask: 'Melyik jel kell?', say: 'Hét elvéve négy, és kettő. Melyik jel kell középre?', scene: <ExprScene text="7 − 4 ? 2" />, options: ['>', '<', '='], hint: 'Előbb számold ki: hét elvéve négy. Több vagy kevesebb, mint kettő?' },
  { id: 'm27', level: 3, badge: 'Művelet és jel', ask: 'Melyik jel kell?', say: 'Kettő meg három, és hat. Melyik jel kell középre?', scene: <ExprScene text="2 + 3 ? 6" />, options: ['<', '>', '='], hint: 'Előbb számold ki a kettő meg hármat!' },
  { id: 'm28', level: 3, badge: 'Logika', ask: 'Melyik ládában van a kincs?', say: 'A kincs nem a 7 − 3 ládában van, nem a 3 + 3 ládában, és nem a 6 − 1 ládában. Melyikben van?', scene: <ExprScene text="7 − 3, 3 + 3, 6 − 1" bg="#fef3c7" />, options: [chest(2, '#15803d'), chest(4, '#b45309'), chest(5, '#be123c'), chest(6, '#1d4ed8')], hint: 'Számold ki mindhármat! Amelyik láda kijött, abban nincs a kincs.' },
  { id: 'm29', level: 3, badge: 'Két lépés', ask: '4 + 2 − 3 = ?', say: 'Négy meg kettő, aztán elvéve három. Mennyi lesz?', scene: <ExprScene text="4 + 2 − 3 = ?" />, options: [3, 4, 2], hint: 'Lépésenként! Előbb a négy meg kettő, aztán vegyél el hármat.' },
  { id: 'm30', level: 3, badge: 'Két lépés', ask: '7 − 2 + 1 = ?', say: 'Hét elvéve kettő, aztán meg egy. Mennyi lesz?', scene: <ExprScene text="7 − 2 + 1 = ?" />, options: [6, 4, 5], hint: 'Lépésenként! Előbb a hét elvéve kettő, aztán adj hozzá egyet.' },
  { id: 'm31', level: 3, badge: 'Történet', ask: 'Hány levelet evett Csigusz?', say: 'Csigusz reggel három levelet evett, délben négyet. Hány levelet evett összesen?', scene: <OpScene icon="level" a={3} b={4} op="+" />, options: [7, 6, 1], hint: 'Összesen: add össze a hármat és a négyet!' },
  { id: 'm32', level: 3, badge: 'Történet', ask: 'Hány méhecske maradt?', say: 'Hét méhecske ült a virágon. Öt elrepült. Hány maradt?', scene: <OpScene icon="meh" a={7} b={5} op="−" />, options: [2, 5, 3], hint: 'Elrepültek: vedd el őket! Hét elvéve öt.' },
  { id: 'm33', level: 3, badge: 'Dobókocka', ask: 'Fent 6 pötty. Hány van alul?', say: 'A dobókocka szemközti lapjain együtt hét pötty van. Fent hat. Hány van alul?', scene: <DieScene top={6} />, options: [1, 6, 2], hint: 'Hat után már csak egy kell a hétig.' },
  { id: 'm34', level: 3, badge: 'Hány hiányzik?', ask: 'Hány pötty hiányzik a hétből?', say: 'Ennek a katicának négy pöttye van. Hány pötty hiányzik, hogy hétpöttyös legyen?', scene: <PotyiScene dots={4} mood="think" />, options: [3, 2, 4], hint: 'Számolj tovább a négytől hétig: öt, hat, hét. Hányat számoltál?' },
  { id: 'm35', level: 3, badge: 'Melyik ér 6-ot?', ask: 'Melyik ér 6-ot?', say: 'Melyik művelet eredménye hat?', options: ['7 − 1', '7 − 2', '3 + 4'], hint: 'Számold ki mindegyiket! Csak egy lesz pont hat.' },
  { id: 'm36', level: 3, badge: 'Sorminta', ask: 'Mi jön a sorban?', say: 'Háromszög, háromszög, kör, háromszög, háromszög. Mi jön utána?', scene: <ShapeRow items={[YT, YT, GK, YT, YT, '?']} />, options: [{ figure: <ShapeCard s={GK} />, say: 'zöld kör' }, { figure: <ShapeCard s={YT} />, say: 'sárga háromszög' }, { figure: <ShapeCard s={BN} />, say: 'kék négyzet' }], hint: 'Két háromszög után mindig mi jön?' },
];

export const MEGALLO_7_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Koppints bal oldalon egy képre, aztán jobb oldalon a számra, ami illik hozzá!',
    pairs: [
      { a: { figure: <MiniGroup icon="virag" n={7} />, say: 'hét virág' }, b: 7 },
      { a: { figure: <Domino left={3} right={3} className="w-28 h-auto" />, say: 'három és három pötty' }, b: 6 },
      { a: { figure: <TenFrame n={5} className="w-28 h-auto" />, say: 'öt korong' }, b: 5 },
      { a: { figure: <Potyi dots={4} className="w-16 h-16" title="katica" />, say: 'négypöttyös katica' }, b: 4 },
    ],
  },
  2: {
    say: 'Párosítsd a műveletet az eredményével!',
    pairs: [
      { a: '3 + 4', b: 7 },
      { a: '7 − 5', b: 2 },
      { a: '6 − 3', b: 3 },
      { a: '2 + 4', b: 6 },
      { a: '5 − 1', b: 4 },
    ],
  },
  3: {
    say: 'A dobókocka szemközti lapjain együtt mindig hét pötty van. Párosítsd a szemközti lapokat!',
    pairs: [
      { a: die(1, 'egy pötty'), b: die(6, 'hat pötty') },
      { a: die(2, 'két pötty'), b: die(5, 'öt pötty') },
      { a: die(3, 'három pötty'), b: die(4, 'négy pötty') },
    ],
  },
};

export const MEGALLO_7_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Páros vagy páratlan? Tedd a számot a jó kosárba!',
    bins: [
      { label: 'Páros', say: 'páros' },
      { label: 'Páratlan', say: 'páratlan' },
    ],
    items: [
      { item: 1, bin: 1 },
      { item: 2, bin: 0 },
      { item: 3, bin: 1 },
      { item: 4, bin: 0 },
      { item: 5, bin: 1 },
      { item: 6, bin: 0 },
      { item: 7, bin: 1 },
    ],
  },
  2: {
    say: 'Számold ki! Pont hét lett, vagy hétnél kevesebb?',
    bins: [
      { label: 'Pont 7', say: 'pont hét' },
      { label: 'Kevesebb, mint 7', say: 'hétnél kevesebb' },
    ],
    items: [
      { item: '4 + 3', bin: 0 },
      { item: '6 − 2', bin: 1 },
      { item: '5 + 2', bin: 0 },
      { item: '3 + 2', bin: 1 },
      { item: '7 − 0', bin: 0 },
      { item: '6 + 0', bin: 1 },
      { item: '1 + 6', bin: 0 },
      { item: '7 − 7', bin: 1 },
    ],
  },
  3: {
    say: 'Melyik jel kell a kérdőjel helyére? Kisebb, egyenlő, vagy nagyobb?',
    bins: [
      { label: '<', say: 'kisebb' },
      { label: '=', say: 'egyenlő' },
      { label: '>', say: 'nagyobb' },
    ],
    items: [
      { item: { label: '6 + 1 ? 7', say: 'hat meg egy, és hét' }, bin: 1 },
      { item: { label: '3 + 2 ? 6', say: 'három meg kettő, és hat' }, bin: 0 },
      { item: { label: '7 − 1 ? 4', say: 'hét elvéve egy, és négy' }, bin: 2 },
      { item: { label: '4 + 3 ? 5', say: 'négy meg három, és öt' }, bin: 2 },
      { item: { label: '2 + 2 ? 4', say: 'kettő meg kettő, és négy' }, bin: 1 },
      { item: { label: '7 − 5 ? 3', say: 'hét elvéve öt, és három' }, bin: 0 },
      { item: { label: '1 + 5 ? 6', say: 'egy meg öt, és hat' }, bin: 1 },
      { item: { label: '6 − 4 ? 1', say: 'hat elvéve négy, és egy' }, bin: 2 },
    ],
  },
};

export const Megallo7G1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="8. Megálló"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • JÁTÉK"
    base="g1-c10-megallo-7"
    chapterId="szamkorbovites-10-ig"
    questions={MEGALLO_7_G1_QUESTIONS}
    pairs={MEGALLO_7_G1_PAIRS}
    sort={MEGALLO_7_G1_SORT}
    {...props}
  />
);

export default Megallo7G1Jatek;
