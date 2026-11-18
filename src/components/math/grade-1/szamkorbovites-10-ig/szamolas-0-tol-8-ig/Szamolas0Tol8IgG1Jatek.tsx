import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { BigSign, TenFrame } from '../../shared/G1Pics';
import { CompareBoxes, CountBox, EqCard, HopLine, MiniBox, NumberHouse } from '../a-nyolc/ANyolcG1Scenes';
import { PicEq } from './Szamolas0Tol8IgG1Scenes';

const sm = (node: React.ReactNode, say: string) => ({ figure: node, say });
const B = '#bae6fd';

export const SZAMOLAS_0_TOL_8_IG_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – összeadás, elvétel képről
  { id: 's8a1', level: 1, badge: 'Összeadás', ask: 'Hány korong van összesen?', say: '5 piros és 3 kék korong. Mennyi 5 + 3?', scene: <PicEq pic={<TenFrame n={5} second={3} />} eq="5 + 3 = ?" />, options: [8, 7, 2], hint: 'Számold meg a pirosakat, aztán számolj tovább a kékekkel!' },
  { id: 's8a2', level: 1, badge: 'Összeadás', ask: 'Mennyi 4 + 4?', say: '4 piros és 4 zöld alma. Mennyi 4 + 4?', scene: <PicEq pic={<CountBox icon="alma" n={4} nb={4} colorB="#22c55e" />} eq="4 + 4 = ?" />, options: [8, 6, 7], hint: 'Számolj tovább a 4-től még négyet: 5, 6, 7…' },
  { id: 's8a3', level: 1, badge: 'Elvétel', ask: 'Mennyi 8 − 1?', say: '8 hógolyóból egyet áthúztunk. Mennyi 8 − 1?', scene: <PicEq pic={<CountBox icon="hogolyo" n={8} crossed={1} />} eq="8 − 1 = ?" />, options: [7, 6, 8], hint: 'Az áthúzottat ne számold!' },
  { id: 's8a4', level: 1, badge: 'Összeadás', ask: 'Mennyi 6 + 2?', say: '6 hal és még 2 kék hal. Mennyi 6 + 2?', scene: <PicEq pic={<CountBox icon="hal" n={6} nb={2} colorB="#3b82f6" />} eq="6 + 2 = ?" />, options: [8, 7, 4], hint: 'Számolj tovább a 6-tól kettőt!' },
  { id: 's8a5', level: 1, badge: 'Elvétel', ask: 'Mennyi 8 − 3?', say: '8 virágból hármat áthúztunk. Mennyi 8 − 3?', scene: <PicEq pic={<CountBox icon="virag" n={8} crossed={3} />} eq="8 − 3 = ?" />, options: [5, 4, 6], hint: 'Csak azokat számold, amelyek nincsenek áthúzva!' },
  { id: 's8a6', level: 1, badge: 'Összeadás', ask: 'Mennyi 7 + 1?', say: '7 piros és 1 kék korong. Mennyi 7 + 1?', scene: <PicEq pic={<TenFrame n={7} second={1} />} eq="7 + 1 = ?" />, options: [8, 7, 6], hint: 'Ha egyet hozzáteszel, a következő számot kapod.' },
  { id: 's8a7', level: 1, badge: 'Nulla', ask: 'Mennyi 8 − 8?', say: 'Mind a 8 sapkát áthúztuk. Mennyi 8 − 8?', scene: <PicEq pic={<CountBox icon="sapka" n={8} crossed={8} />} eq="8 − 8 = ?" />, options: [0, 8, 1], hint: 'Mindet elvettük. Maradt még egy is?' },
  { id: 's8a8', level: 1, badge: 'Nulla', ask: 'Mennyi 8 − 0?', say: 'A 8 gombból egyet sem húztunk át. Mennyi 8 − 0?', scene: <PicEq pic={<CountBox icon="gomb" n={8} />} eq="8 − 0 = ?" />, options: [8, 0, 7], hint: 'Ha semmit sem veszünk el, mennyi marad?' },
  // 2. szint – számegyenes, csere, bontás
  { id: 's8b1', level: 2, badge: 'Számegyenes', ask: 'Mennyi 2 + 6?', say: 'Zümi a 2-ről indul, és hatot ugrik előre. Mennyi 2 + 6?', scene: <HopLine from={2} to={8} icon="meh" />, options: [8, 7, 6], hint: 'Számold meg az íveket, és lépj annyit előre a 2-től!' },
  { id: 's8b2', level: 2, badge: 'Számegyenes', ask: 'Mennyi 8 − 3?', say: 'Csigusz a 8-ról hármat csúszik vissza. Mennyi 8 − 3?', scene: <HopLine from={8} to={5} />, options: [5, 4, 6], hint: 'Elvételnél visszafelé lépünk: 7, 6, 5…' },
  { id: 's8b3', level: 2, badge: 'Számegyenes', ask: 'Mennyi 6 − 4?', say: 'Csigusz a 6-ról négyet csúszik vissza. Mennyi 6 − 4?', scene: <HopLine from={6} to={2} />, options: [2, 3, 1], hint: 'Számold meg a visszafelé íveket: négyet lépj!' },
  { id: 's8b4', level: 2, badge: 'Csere', ask: '3 + 5 = 8. Mennyi 5 + 3?', say: '3 meg 5 egyenlő 8. Akkor mennyi 5 meg 3?', scene: <CountBox icon="hogolyo" n={3} nb={5} colorB={B} className="w-48 h-auto mx-auto" />, options: [8, 2, 7], hint: 'Ha megcseréled a két számot, ugyanannyi hógolyó marad.' },
  { id: 's8b5', level: 2, badge: 'Bontás', ask: 'Melyik kettő együtt 8?', say: 'Melyik két szám együtt pont 8?', options: ['5 + 3', '5 + 2', '4 + 3'], hint: 'Számold ki mindegyiket! Melyik lesz pont 8?' },
  { id: 's8b6', level: 2, badge: 'Elvétel', ask: 'Hány hógolyó maradt?', say: '8 hógolyóból 6 elrepült, ezeket áthúztuk. Hány hógolyó maradt?', scene: <CountBox icon="hogolyo" n={8} crossed={6} className="w-48 h-auto mx-auto" />, options: [2, 6, 3], hint: 'Ne az áthúzottakat számold, hanem a megmaradtakat!' },
  { id: 's8b7', level: 2, badge: 'Kiegészítés', ask: 'Hány korong kell még a 8-hoz?', say: '5 korong van a keretben. Hány kell még, hogy 8 legyen?', scene: <TenFrame n={5} />, options: [3, 2, 4], hint: 'Számolj tovább az 5-től a 8-ig, és figyeld, hányat mondtál!' },
  { id: 's8b8', level: 2, badge: 'Számház', ask: 'Mi kell a ? helyére?', say: 'A 8-as házban minden szobában 8 lakik. 7 meg 1. 2 meg mennyi?', scene: <NumberHouse top={8} rows={[[7, 1], [2, '?']]} />, options: [6, 5, 7], hint: 'Mennyi kell a 2-höz, hogy 8 legyen? Számolj tovább a 2-től!' },
  // 3. szint – művelet és szám összehasonlítása, két lépés, szabály, történet
  { id: 's8c1', level: 3, badge: 'Jelek', ask: 'Melyik jel kell?', say: '2 + 6, és 5. Melyik jel kell a kérdőjel helyére?', scene: <EqCard text="2 + 6 ? 5" />, options: ['>', '<', '='], hint: 'Előbb számold ki a bal oldalt! Aztán hasonlítsd össze az 5-tel.' },
  { id: 's8c2', level: 3, badge: 'Jelek', ask: 'Melyik jel kell?', say: '8 − 4, és 5. Melyik jel kell a kérdőjel helyére?', scene: <EqCard text="8 − 4 ? 5" />, options: ['<', '>', '='], hint: 'Előbb számold ki: 8 elvéve 4. Kisebb vagy nagyobb, mint 5?' },
  { id: 's8c3', level: 3, badge: 'Jelek', ask: 'Melyik jel kell?', say: '4 + 3, és 7. Melyik jel kell a kérdőjel helyére?', scene: <EqCard text="4 + 3 ? 7" />, options: ['=', '<', '>'], hint: 'Számold ki a 4 meg 3-at! Mi jön ki?' },
  { id: 's8c4', level: 3, badge: 'Két lépés', ask: 'Mennyi 8 − 2 − 2?', say: 'Pötyinek 8 hógolyója volt. Kettőt adott Züminek, kettőt Csigusznak. Mennyi 8 − 2 − 2?', scene: <EqCard text="8 − 2 − 2 = ?" />, options: [4, 6, 2], hint: 'Lépésenként számolj: előbb 8 elvéve 2, aztán még elvéve 2.' },
  { id: 's8c5', level: 3, badge: 'Két lépés', ask: 'Mennyi 5 − 1 + 2?', say: 'Mennyi 5 − 1 + 2? Balról jobbra számolj!', scene: <EqCard text="5 − 1 + 2 = ?" />, options: [6, 4, 8], hint: 'Előbb 5 elvéve 1. Utána adj hozzá kettőt.' },
  { id: 's8c6', level: 3, badge: 'Szabály', ask: 'Mindig 2-vel több. Mi jön?', say: 'Nézd a számsort: 1, 3, 5. Mindig kettővel több. Melyik szám jön?', scene: <EqCard text="1 3 5 ?" />, options: [7, 6, 8], hint: 'Az 5-höz adj hozzá kettőt!' },
  { id: 's8c7', level: 3, badge: 'Mennyivel több?', ask: 'Mennyivel több a bal oldalon?', say: 'Bal oldalon 8 hógolyó van, jobb oldalon 5. Mennyivel több a bal oldalon?', scene: <CompareBoxes icon="hogolyo" a={8} b={5} />, options: [3, 2, 5], hint: 'Párosítsd a hógolyókat! Hány marad pár nélkül?' },
  { id: 's8c8', level: 3, badge: 'Kis történet', ask: 'Hány hógolyó maradt Pötyinél?', say: 'Pötyinek 8 hógolyója volt. 3-at eldobott. Hány hógolyó maradt nála?', scene: <CountBox icon="hogolyo" n={8} className="w-48 h-auto mx-auto" />, options: [5, 4, 3], hint: '8 elvéve 3. Takarj le hármat az ujjaddal, és számold meg a többit!' },
];

export const SZAMOLAS_0_TOL_8_IG_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Melyik kép melyik összeadáshoz illik? Fehér és kék hógolyókat látsz.',
    pairs: [
      { a: sm(<MiniBox icon="hogolyo" n={5} nb={3} colorB={B} />, 'öt fehér, három kék'), b: '5 + 3' },
      { a: sm(<MiniBox icon="hogolyo" n={6} nb={2} colorB={B} />, 'hat fehér, két kék'), b: '6 + 2' },
      { a: sm(<MiniBox icon="hogolyo" n={4} nb={4} colorB={B} />, 'négy fehér, négy kék'), b: '4 + 4' },
      { a: sm(<MiniBox icon="hogolyo" n={7} nb={1} colorB={B} />, 'hét fehér, egy kék'), b: '7 + 1' },
    ],
  },
  2: {
    say: 'Számold ki! Melyik művelethez melyik szám illik?',
    pairs: [
      { a: '8 − 2', b: 6 },
      { a: '3 + 4', b: 7 },
      { a: '8 − 3', b: 5 },
      { a: '2 + 6', b: 8 },
      { a: '8 − 4', b: 4 },
    ],
  },
  3: {
    say: 'Két lépés! Balról jobbra számolj, és keresd meg az eredményt!',
    pairs: [
      { a: '8 − 2 − 2', b: 4 },
      { a: '5 − 1 + 2', b: 6 },
      { a: '8 − 1 − 0', b: 7 },
      { a: '7 − 1 + 2', b: 8 },
      { a: '8 − 1 − 2', b: 5 },
    ],
  },
};

export const SZAMOLAS_0_TOL_8_IG_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Hozzátettünk, vagy elvettünk? A kék hógolyókat hozzátettük, az áthúzottakat elvettük.',
    bins: [
      { label: 'Hozzátettünk', figure: <BigSign text="+" className="w-12 h-12" />, say: 'hozzátettünk' },
      { label: 'Elvettünk', figure: <BigSign text="−" className="w-12 h-12" />, say: 'elvettünk' },
    ],
    items: [
      { item: sm(<MiniBox icon="hogolyo" n={5} nb={3} colorB={B} />, 'öt meg három'), bin: 0 },
      { item: sm(<MiniBox icon="hogolyo" n={8} crossed={2} />, 'nyolcból kettő áthúzva'), bin: 1 },
      { item: sm(<MiniBox icon="hogolyo" n={6} nb={1} colorB={B} />, 'hat meg egy'), bin: 0 },
      { item: sm(<MiniBox icon="hogolyo" n={7} crossed={3} />, 'hétből három áthúzva'), bin: 1 },
      { item: sm(<MiniBox icon="hogolyo" n={2} nb={6} colorB={B} />, 'kettő meg hat'), bin: 0 },
      { item: sm(<MiniBox icon="hogolyo" n={8} crossed={5} />, 'nyolcból öt áthúzva'), bin: 1 },
    ],
  },
  2: {
    say: 'Számold ki! Hat, hét vagy nyolc lesz? Tedd a jó kosárba!',
    bins: [
      { label: '6', say: 'hat' },
      { label: '7', say: 'hét' },
      { label: '8', say: 'nyolc' },
    ],
    items: [
      { item: '4 + 2', bin: 0 },
      { item: '8 − 2', bin: 0 },
      { item: '5 + 2', bin: 1 },
      { item: '8 − 1', bin: 1 },
      { item: '4 + 4', bin: 2 },
      { item: '8 − 0', bin: 2 },
      { item: '3 + 3', bin: 0 },
      { item: '1 + 7', bin: 2 },
    ],
  },
  3: {
    say: 'Számold ki! Ötnél kevesebb, pont öt, vagy ötnél több lesz?',
    bins: [
      { label: 'Kevesebb', figure: <BigSign text="< 5" className="w-12 h-12" />, say: 'ötnél kevesebb' },
      { label: 'Pont 5', figure: <BigSign text="5" className="w-12 h-12" />, say: 'pont öt' },
      { label: 'Több', figure: <BigSign text="> 5" className="w-12 h-12" />, say: 'ötnél több' },
    ],
    items: [
      { item: '2 + 6', bin: 2 },
      { item: '4 + 1', bin: 1 },
      { item: '8 − 4', bin: 0 },
      { item: '7 − 3', bin: 0 },
      { item: '8 − 3', bin: 1 },
      { item: '3 + 3', bin: 2 },
      { item: '6 − 2', bin: 0 },
      { item: '2 + 3', bin: 1 },
      { item: '7 − 0', bin: 2 },
    ],
  },
};

export const Szamolas0Tol8IgG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="10. Számolás 0-tól 8-ig"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • JÁTÉK"
    base="g1-c10-szamolas-0-tol-8-ig"
    chapterId="szamkorbovites-10-ig"
    questions={SZAMOLAS_0_TOL_8_IG_G1_QUESTIONS}
    pairs={SZAMOLAS_0_TOL_8_IG_G1_PAIRS}
    sort={SZAMOLAS_0_TOL_8_IG_G1_SORT}
    {...props}
  />
);

export default Szamolas0Tol8IgG1Jatek;
