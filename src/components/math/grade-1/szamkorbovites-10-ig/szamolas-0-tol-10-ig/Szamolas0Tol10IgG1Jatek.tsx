import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { BigSign, NumberLine, TenFrame } from '../../shared/G1Pics';
import { CountBox, EqCard, HopLine, MiniBox, TwoHands } from '../a-nyolc/ANyolcG1Scenes';
import { PinsCard, PinsScene } from './Szamolas0Tol10IgG1Scenes';

const sm = (node: React.ReactNode, say: string) => ({ figure: node, say });
const eq = (t: string, wide = false) => <EqCard text={t} className={wide ? 'w-full max-w-[400px] h-auto mx-auto' : 'w-full max-w-[320px] h-auto mx-auto'} />;
const frS = (n: number, say: string, second = 0, crossed = 0) => sm(<TenFrame n={n} second={second} crossed={crossed} className="w-24 h-auto" />, say);

export const SZAMOLAS_0_TOL_10_IG_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – egy művelet képről
  { id: 's1', level: 1, badge: 'Számlálás', ask: 'Hány bábu áll a pályán?', scene: <PinsScene standing={10} />, options: [10, 9, 8], hint: 'Soronként számolj: elöl 1, aztán 2, 3, hátul 4.' },
  { id: 's2', level: 1, badge: 'Összeadás', ask: 'Mennyi 9 + 1?', say: '9 piros és 1 kék korong van a keretben. Mennyi 9 + 1?', scene: <TenFrame n={9} second={1} />, options: [10, 9, 8], hint: 'A 9 után melyik szám jön? Számolj tovább eggyel!' },
  { id: 's3', level: 1, badge: 'Kivonás', ask: 'Hány bábu áll még?', say: '10 bábuból 2 eldőlt. Hány bábu áll még?', scene: <PinsScene standing={8} fallen={2} />, options: [8, 2, 7], hint: 'Csak az álló bábukat számold, a fekvőket ne!' },
  { id: 's4', level: 1, badge: 'Összeadás', ask: 'Mennyi 5 + 5?', say: 'Mindkét kezeden 5 ujj van. Mennyi 5 + 5?', scene: <TwoHands n={10} className="w-56 h-auto mx-auto" />, options: [10, 5, 9], hint: 'Számold meg mindkét kéz ujjait!' },
  { id: 's5', level: 1, badge: 'Kivonás', ask: 'Mennyi 10 − 1?', say: 'Csigusz a 10-ről egyet lép vissza. Mennyi 10 − 1?', scene: <HopLine from={10} to={9} max={10} icon="csiga" />, options: [9, 10, 8], hint: 'Egy lépés visszafelé: melyik szám áll a 10 előtt?' },
  { id: 's6', level: 1, badge: 'Összeadás', ask: 'Mennyi 7 + 3?', say: '7 fehér és 3 kék hógolyó van a dobozban. Mennyi 7 + 3?', scene: <CountBox icon="hogolyo" n={7} nb={3} colorB="#93c5fd" className="w-56 h-auto mx-auto" />, options: [10, 9, 4], hint: 'Számolj tovább a 7-től a kék hógolyókkal: 8, 9, …' },
  { id: 's7', level: 1, badge: 'Kivonás', ask: 'Hány korong nincs áthúzva?', say: '10 korongból 4-et áthúztunk. Mennyi 10 − 4?', scene: <TenFrame n={10} crossed={4} />, options: [6, 4, 7], hint: 'Az áthúzottakat ne számold!' },
  { id: 's8', level: 1, badge: 'Melyik művelet?', ask: 'Melyik illik a képhez?', say: '6 piros és 4 kék korong. Melyik művelet illik a képhez?', scene: <TenFrame n={6} second={4} />, options: ['6 + 4 = 10', '6 + 3 = 9', '5 + 4 = 9'], hint: 'Számold meg külön a pirosakat és a kékeket!' },
  // 2. szint – bontás, tízesbarátok, jelek
  { id: 's9', level: 2, badge: 'A 10 bontása', ask: 'Melyik szám kell a □ helyére?', say: '10 egyenlő 8 meg valahány. Melyik szám kell a négyzetbe?', scene: eq('10 = 8 + □'), options: [2, 3, 8], hint: 'Számolj tovább a 8-tól a 10-ig: 9, 10. Hányat számoltál?' },
  { id: 's10', level: 2, badge: 'Kivonás', ask: 'Hány bábu dőlt el?', say: '10 bábu állt. Most 7 áll. Hány bábu dőlt el? 10 elvéve valahány az 7.', scene: <PinsScene standing={7} fallen={3} />, options: [3, 7, 4], hint: 'Most a fekvő bábukat számold!' },
  { id: 's11', level: 2, badge: 'Tízesbarátok', ask: 'Ki a 4 tízesbarátja?', say: 'A keretben 4 korong van. Melyik szám a 4 tízesbarátja?', scene: <TenFrame n={4} />, options: [6, 5, 4], hint: 'Számold meg az üres helyeket!' },
  { id: 's12', level: 2, badge: 'Kivonás', ask: 'Mennyi 10 − 6?', say: '10 korongból 6-ot áthúztunk. Mennyi 10 − 6?', scene: <TenFrame n={10} crossed={6} />, options: [4, 6, 3], hint: 'Csak azokat számold, amelyek nincsenek áthúzva!' },
  { id: 's13', level: 2, badge: 'Csere', ask: 'Mennyi 2 + 8?', say: '2 piros és 8 kék korong. Mennyi 2 + 8? Ugyanannyi, mint 8 + 2!', scene: <TenFrame n={2} second={8} />, options: [10, 6, 9], hint: 'Kezdd a nagyobbal: 8, és számolj tovább kettőt!' },
  { id: 's14', level: 2, badge: 'Számegyenes', ask: 'Hová ér Zümi?', say: 'Zümi a 4-ről indul, és 6-ot ugrik előre. Hová ér?', scene: <HopLine from={4} to={10} max={10} icon="meh" />, options: [10, 9, 6], hint: 'Kövesd az íveket a 4-től, és számold meg őket!' },
  { id: 's15', level: 2, badge: 'Jel műveletnél', ask: 'Melyik jel kell?', say: 'Bal oldalon 7 + 3, jobb oldalon 9. Melyik jel kell a kérdőjel helyére?', scene: eq('7 + 3 ? 9'), options: ['>', '<', '='], hint: 'Előbb számold ki: mennyi 7 + 3? Aztán hasonlítsd a 9-hez!' },
  { id: 's16', level: 2, badge: 'Jel műveletnél', ask: 'Melyik jel kell?', say: 'Bal oldalon 10 − 5, jobb oldalon 5. Melyik jel kell a kérdőjel helyére?', scene: eq('10 − 5 ? 5'), options: ['=', '<', '>'], hint: 'Előbb számold ki: mennyi 10 − 5?' },
  // 3. szint – 0 és 10, kakukktojás, két lépés, három tag
  { id: 's17', level: 3, badge: 'Nulla', ask: 'Mennyi 10 − 0?', say: '10 bábu állt, és egy sem dőlt el. Mennyi 10 − 0?', scene: <PinsScene standing={10} ball />, options: [10, 0, 9], hint: 'Ha semmit sem veszünk el, mennyi marad?' },
  { id: 's18', level: 3, badge: 'Nulla', ask: 'Mennyi 10 − 10?', say: 'Mind a 10 bábu eldőlt. Mennyi 10 − 10?', scene: <PinsScene standing={0} fallen={10} />, options: [0, 10, 1], hint: 'Áll még bábu a pályán?' },
  { id: 's19', level: 3, badge: 'Kakukktojás', ask: 'Melyiknek NEM 10 az eredménye?', say: 'Két összeadásnak 10 az eredménye. Melyiknek nem?', options: ['4 + 5', '3 + 7', '8 + 2'], hint: 'Számold ki mindegyiket az ujjaidon!' },
  { id: 's20', level: 3, badge: 'Két lépés', ask: 'Hová ér Csigusz?', say: 'Csigusz a 10-ről 3-at lép vissza, aztán még 2-t. Hová ér?', scene: <NumberLine max={10} mark={[10]} question={5} jumps={[{ from: 10, to: 7 }, { from: 7, to: 5 }]} />, options: [5, 7, 6], hint: 'Előbb a 10-ről 3-at vissza, onnan még 2-t!' },
  { id: 's21', level: 3, badge: 'Nyitott mondat', ask: 'Melyik szám kell a □ helyére?', say: 'Valahány meg 3 az 10. Melyik szám kell a négyzetbe?', scene: eq('□ + 3 = 10'), options: [7, 6, 3], hint: 'Mennyi kell a 3-hoz, hogy 10 legyen? Ők tízesbarátok.' },
  { id: 's22', level: 3, badge: 'Három tag', ask: 'Mennyi 4 + 3 + 3?', say: 'Pötyi 4, Zümi 3, Csigusz 3 hógolyót gyúrt. Mennyi 4 + 3 + 3?', scene: eq('4 + 3 + 3 = ?', true), options: [10, 9, 7], hint: 'Előbb add össze az első kettőt: 4 + 3. Aztán jön még 3.' },
  { id: 's23', level: 3, badge: 'Nyitott mondat', ask: 'Melyik szám illik ide: 8 < □ < 10?', say: '8 kisebb, mint valahány, és az kisebb, mint 10. Melyik szám illik a négyzetbe?', scene: eq('8 < □ < 10'), options: [9, 8, 10], hint: 'A 8 és a 10 között melyik szám áll a számegyenesen?' },
  { id: 's24', level: 3, badge: 'Szöveges feladat', ask: 'Hány hógolyója maradt Pötyinek?', say: 'Pötyinek 10 hógolyója volt. 5-öt eldobott. Hány hógolyója maradt?', scene: <CountBox icon="hogolyo" n={10} crossed={5} className="w-56 h-auto mx-auto" />, options: [5, 10, 4], hint: 'Az áthúzott hógolyókat már eldobta. Ne számold őket!' },
];

export const SZAMOLAS_0_TOL_10_IG_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd a műveletet az eredményével!',
    pairs: [
      { a: '9 + 1', b: 10 },
      { a: '10 − 2', b: 8 },
      { a: '6 + 3', b: 9 },
      { a: '10 − 3', b: 7 },
    ],
  },
  2: {
    say: 'Melyik művelet illik a képhez? Párosítsd!',
    pairs: [
      { a: frS(8, 'nyolc piros, két kék', 2), b: '8 + 2' },
      { a: frS(10, 'tízből hármat áthúztunk', 0, 3), b: '10 − 3' },
      { a: frS(5, 'öt piros, öt kék', 5), b: '5 + 5' },
      { a: frS(10, 'tízből hatot áthúztunk', 0, 6), b: '10 − 6' },
      { a: sm(<PinsCard standing={9} fallen={1} />, 'egy bábu eldőlt'), b: '10 − 1' },
    ],
  },
  3: {
    say: 'Keresd meg a párját! A két művelet eredménye ugyanannyi legyen.',
    pairs: [
      { a: '10 − 7', b: '1 + 2' },
      { a: '10 − 4', b: '3 + 3' },
      { a: '10 − 1', b: '5 + 4' },
      { a: '10 − 5', b: '2 + 3' },
    ],
  },
};

export const SZAMOLAS_0_TOL_10_IG_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Melyik összeadásnak 10 az eredménye? Ami 10, az a tíz kosárba megy, ami kevesebb, a másikba.',
    bins: [
      { label: 'Pont 10', figure: <BigSign text="10" className="w-12 h-12" />, say: 'pont tíz' },
      { label: '10-nél kevesebb', say: 'tíznél kevesebb' },
    ],
    items: [
      { item: '9 + 1', bin: 0 },
      { item: '7 + 2', bin: 1 },
      { item: '5 + 5', bin: 0 },
      { item: '6 + 4', bin: 0 },
      { item: '4 + 4', bin: 1 },
      { item: '3 + 7', bin: 0 },
      { item: '8 + 1', bin: 1 },
      { item: '2 + 2', bin: 1 },
    ],
  },
  2: {
    say: 'Hozzáadtunk vagy elvettünk? Tedd a képet a jó kosárba!',
    bins: [
      { label: '+', figure: <BigSign text="+" className="w-12 h-12" />, say: 'összeadás' },
      { label: '−', figure: <BigSign text="−" className="w-12 h-12" />, say: 'kivonás' },
    ],
    items: [
      { item: frS(6, 'hat piros, két kék', 2), bin: 0 },
      { item: frS(10, 'tízből hármat áthúztunk', 0, 3), bin: 1 },
      { item: sm(<PinsCard standing={6} fallen={4} />, 'bábuk eldőltek'), bin: 1 },
      { item: frS(4, 'négy piros, öt kék', 5), bin: 0 },
      { item: frS(8, 'nyolcból kettőt áthúztunk', 0, 2), bin: 1 },
      { item: sm(<MiniBox icon="hogolyo" n={9} crossed={4} />, 'hógolyók áthúzva'), bin: 1 },
      { item: sm(<MiniBox icon="madar" n={5} nb={3} colorB="#fb923c" />, 'öt kék és három narancs madár'), bin: 0 },
      { item: frS(7, 'hét piros, három kék', 3), bin: 0 },
    ],
  },
  3: {
    say: 'Számold ki! Kisebb, mint 5, pont 5, vagy nagyobb, mint 5?',
    bins: [
      { label: '5-nél kisebb', say: 'ötnél kisebb' },
      { label: '5', figure: <BigSign text="5" className="w-12 h-12" />, say: 'pont öt' },
      { label: '5-nél nagyobb', say: 'ötnél nagyobb' },
    ],
    items: [
      { item: '10 − 5', bin: 1 },
      { item: '10 − 7', bin: 0 },
      { item: '10 − 2', bin: 2 },
      { item: '3 + 2', bin: 1 },
      { item: '9 − 8', bin: 0 },
      { item: '4 + 4', bin: 2 },
      { item: '10 − 4', bin: 2 },
      { item: '1 + 3', bin: 0 },
      { item: '10 − 10', bin: 0 },
    ],
  },
};

export const Szamolas0Tol10IgG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="18. Számolás 0-tól 10-ig"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • JÁTÉK"
    base="g1-c10-szamolas-0-tol-10-ig"
    chapterId="szamkorbovites-10-ig"
    questions={SZAMOLAS_0_TOL_10_IG_G1_QUESTIONS}
    pairs={SZAMOLAS_0_TOL_10_IG_G1_PAIRS}
    sort={SZAMOLAS_0_TOL_10_IG_G1_SORT}
    {...props}
  />
);

export default Szamolas0Tol10IgG1Jatek;
