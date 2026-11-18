import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { BigSign, Domino, IconGroup, NumberLine, TenFrame } from '../../shared/G1Pics';
import { CompareBoxes, CountBox, EqCard, HopLine, MiniBox, NumberHouse, PicName, SnowmanScene, TwoHands } from '../a-nyolc/ANyolcG1Scenes';
import { PicEq } from '../szamolas-0-tol-8-ig/Szamolas0Tol8IgG1Scenes';
import { HAMIS, IGAZ, TruthIcon } from '../nyitott-mondatok/NyitottMondatokG1Scenes';
import { KeysScene } from './Megallo8G1Scenes';

const box = (icon: PicName, n: number, say: string) => ({ figure: <CountBox icon={icon} n={n} />, say });
const sm = (node: React.ReactNode, say: string) => ({ figure: node, say });
const B = '#bae6fd';
const BOX = 'Melyik szám illik a □ helyére?';

export const MEGALLO_8_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – számlálás 8-ig, számjegy, művelet képről
  { id: 'm8a1', level: 1, badge: 'Számlálás', ask: 'Hány csillag van az égen?', scene: <IconGroup icon="csillag" n={8} perRow={4} className="w-56 h-auto mx-auto" />, options: [8, 7, 6], hint: 'Soronként számolj, és mutass rá mindegyikre!' },
  { id: 'm8a2', level: 1, badge: 'Nyolc', ask: 'Hol van 8 gomba?', options: [box('gomba', 8, 'nyolc gomba'), box('gomba', 7, 'hét gomba'), box('gomba', 5, 'öt gomba')], hint: 'Számold meg a felső és az alsó sort is!' },
  { id: 'm8a3', level: 1, badge: 'Számjegy', ask: 'Melyik a nyolcas?', options: [{ figure: <BigSign text="8" />, say: 'nyolcas' }, { figure: <BigSign text="0" />, say: 'nulla' }, { figure: <BigSign text="5" />, say: 'ötös' }], hint: 'A nyolcas olyan, mint egy hóember: két kör egymáson.' },
  { id: 'm8a4', level: 1, badge: 'Ujjkép', ask: 'Hány ujj van fent?', say: 'Két kezet látsz. Hány ujj van fent összesen?', scene: <TwoHands n={7} />, options: [7, 8, 6], hint: 'Az egyik kézen 5 ujj van. Számolj tovább a másikon!' },
  { id: 'm8a5', level: 1, badge: 'Dominó', ask: 'Hány pötty van a dominón?', scene: <Domino left={5} right={3} className="w-48 h-auto mx-auto" />, options: [8, 7, 6], hint: 'Számold meg mindkét felét! 5, aztán tovább.' },
  { id: 'm8a6', level: 1, badge: 'Tízes keret', ask: 'Hány korong van a keretben?', scene: <TenFrame n={6} />, options: [6, 8, 7], hint: 'A felső sor tele: az 5. Számolj tovább lent!' },
  { id: 'm8a7', level: 1, badge: 'Összeadás', ask: 'Mennyi 5 + 3?', say: '5 piros és 3 zöld alma. Mennyi 5 + 3?', scene: <PicEq pic={<CountBox icon="alma" n={5} nb={3} colorB="#22c55e" />} eq="5 + 3 = ?" />, options: [8, 7, 2], hint: 'Számolj tovább az 5-től hármat!' },
  { id: 'm8a8', level: 1, badge: 'Elvétel', ask: 'Mennyi 8 − 4?', say: '8 hógolyóból négyet áthúztunk. Mennyi 8 − 4?', scene: <PicEq pic={<CountBox icon="hogolyo" n={8} crossed={4} />} eq="8 − 4 = ?" />, options: [4, 3, 5], hint: 'Csak azokat számold, amelyek nincsenek áthúzva!' },
  { id: 'm8a9', level: 1, badge: 'Összeadás', ask: 'Mennyi 2 + 6?', say: '2 piros és 6 kék korong. Mennyi 2 + 6?', scene: <PicEq pic={<TenFrame n={2} second={6} />} eq="2 + 6 = ?" />, options: [8, 6, 7], hint: 'Számold meg az összes korongot!' },
  { id: 'm8a10', level: 1, badge: 'Elvétel', ask: 'Mennyi 7 − 2?', say: '7 virágból kettőt áthúztunk. Mennyi 7 − 2?', scene: <PicEq pic={<CountBox icon="virag" n={7} crossed={2} />} eq="7 − 2 = ?" />, options: [5, 4, 6], hint: 'Az áthúzottakat ne számold!' },
  { id: 'm8a11', level: 1, badge: 'Számegyenes', ask: 'Melyik szám kell a ? helyére?', say: 'Melyik szám kell a kérdőjel helyére a számegyenesen?', scene: <NumberLine max={8} question={7} />, options: [7, 6, 8], hint: 'A 6 és a 8 között melyik szám áll?' },
  { id: 'm8a12', level: 1, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: '6 hal, és 8 hal. Melyik jel kell középre?', scene: <CompareBoxes icon="hal" a={6} b={8} />, options: ['<', '>', '='], hint: 'Bal oldalon kevesebb van. A jel hegye a kevesebb felé mutat.' },
  // 2. szint – számegyenes, bontás, csere, nyitott mondat képpel, szomszéd
  { id: 'm8b1', level: 2, badge: 'Számegyenes', ask: 'Mennyi 1 + 7?', say: 'Zümi az 1-ről indul, és hetet ugrik előre. Mennyi 1 + 7?', scene: <HopLine from={1} to={8} icon="meh" />, options: [8, 7, 6], hint: 'Számold meg az íveket, és lépj annyit előre!' },
  { id: 'm8b2', level: 2, badge: 'Számegyenes', ask: 'Mennyi 8 − 6?', say: 'Csigusz a 8-ról hatot csúszik vissza. Mennyi 8 − 6?', scene: <HopLine from={8} to={2} />, options: [2, 3, 6], hint: 'Elvételnél visszafelé lépünk. Számold meg az íveket!' },
  { id: 'm8b3', level: 2, badge: 'Bontás', ask: 'Melyik kettő együtt 8?', say: 'Melyik két szám együtt pont 8?', options: ['2 + 6', '3 + 4', '6 + 1'], hint: 'Számold ki mindegyiket! Melyik lesz pont 8?' },
  { id: 'm8b4', level: 2, badge: 'Csere', ask: '6 + 2 = 8. Mennyi 2 + 6?', say: '6 meg 2 egyenlő 8. Akkor mennyi 2 meg 6?', scene: <CountBox icon="hogolyo" n={6} nb={2} colorB={B} className="w-48 h-auto mx-auto" />, options: [8, 4, 6], hint: 'Ha megcseréled a két számot, ugyanannyi marad.' },
  { id: 'm8b5', level: 2, badge: 'Számház', ask: 'Mi kell a ? helyére?', say: 'A 8-as házban minden szobában 8 lakik: 5 meg 3. Valahány meg 4 is 8. Melyik szám kell a kérdőjel helyére?', scene: <NumberHouse top={8} rows={[[5, 3], ['?', 4]]} />, options: [4, 3, 5], hint: 'Mennyi kell a 4-hez, hogy 8 legyen?' },
  { id: 'm8b6', level: 2, badge: 'Nyitott mondat', ask: BOX, say: '1 piros sapka meg néhány kék, az 8. Melyik szám bújt el a doboz alatt?', scene: <PicEq pic={<CountBox icon="sapka" n={1} nb={7} color="#ef4444" colorB="#3b82f6" />} eq="1 + □ = 8" />, options: [7, 6, 8], hint: 'Számold meg a kék sapkákat!' },
  { id: 'm8b7', level: 2, badge: 'Nyitott mondat', ask: BOX, say: '8 hógolyóból néhányat áthúztunk, és 1 maradt. Melyik szám bújt el a doboz alatt?', scene: <PicEq pic={<CountBox icon="hogolyo" n={8} crossed={7} />} eq="8 − □ = 1" />, options: [7, 1, 6], hint: 'Az áthúzott hógolyókat számold meg!' },
  { id: 'm8b8', level: 2, badge: 'Kisebb, mint', ask: 'Melyik szám teszi igazzá?', say: 'Valahány kisebb, mint 3. Melyik szám teszi igazzá?', scene: <EqCard text="□ < 3" />, options: [1, 3, 5], hint: 'A 3 nem kisebb, mint 3. Keress kisebbet!' },
  { id: 'm8b9', level: 2, badge: 'Nagyobb, mint', ask: 'Melyik szám teszi igazzá?', say: 'Valahány nagyobb, mint 6. Melyik szám teszi igazzá?', scene: <EqCard text="□ > 6" />, options: [8, 6, 4], hint: 'A 6 nem nagyobb, mint 6. A 6 után jövő számok kellenek.' },
  { id: 'm8b10', level: 2, badge: 'Számszomszéd', ask: 'Melyik a 6 nagyobb szomszédja?', scene: <NumberLine max={8} mark={[6]} />, options: [7, 5, 8], hint: 'A nagyobb szomszéd közvetlenül a 6 után áll.' },
  { id: 'm8b11', level: 2, badge: 'Kiegészítés', ask: 'Hány gomb kell még, hogy 8 legyen?', say: 'A hóemberen 4 gomb van. 8 gombot szeretnénk. Hány gomb kell még?', scene: <SnowmanScene buttons={4} label={8} />, options: [4, 3, 5], hint: 'Számolj tovább a 4-től a 8-ig: hányat mondtál?' },
  { id: 'm8b12', level: 2, badge: 'Mennyivel több?', ask: 'Mennyivel több a bal oldalon?', say: 'Bal oldalon 8 sapka van, jobb oldalon 6. Mennyivel több a bal oldalon?', scene: <CompareBoxes icon="sapka" a={8} b={6} />, options: [2, 1, 6], hint: 'Párosítsd a sapkákat! Hány marad pár nélkül?' },
  // 3. szint – művelet és szám, két lépés, szabály, igaz/hamis, kizárás, történet
  { id: 'm8c1', level: 3, badge: 'Jelek', ask: 'Melyik jel kell?', say: '3 + 5, és 7. Melyik jel kell a kérdőjel helyére?', scene: <EqCard text="3 + 5 ? 7" />, options: ['>', '<', '='], hint: 'Előbb számold ki a bal oldalt, aztán hasonlítsd a 7-hez!' },
  { id: 'm8c2', level: 3, badge: 'Jelek', ask: 'Melyik jel kell?', say: '8 − 5, és 4. Melyik jel kell a kérdőjel helyére?', scene: <EqCard text="8 − 5 ? 4" />, options: ['<', '>', '='], hint: 'Előbb számold ki: 8 elvéve 5. Kisebb vagy nagyobb, mint 4?' },
  { id: 'm8c3', level: 3, badge: 'Jelek', ask: 'Melyik jel kell?', say: '6 − 2, és 4. Melyik jel kell a kérdőjel helyére?', scene: <EqCard text="6 − 2 ? 4" />, options: ['=', '<', '>'], hint: 'Számold ki a 6 elvéve 2-t! Mi jön ki?' },
  { id: 'm8c4', level: 3, badge: 'Két lépés', ask: 'Mennyi 8 − 3 − 2?', say: 'Mennyi 8 − 3 − 2? Lépésenként számolj!', scene: <EqCard text="8 − 3 − 2 = ?" />, options: [3, 5, 1], hint: 'Előbb 8 elvéve 3. Utána még elvéve 2.' },
  { id: 'm8c5', level: 3, badge: 'Két lépés', ask: 'Mennyi 2 + 3 + 3?', say: 'Mennyi 2 + 3 + 3? Lépésenként számolj!', scene: <EqCard text="2 + 3 + 3 = ?" />, options: [8, 7, 5], hint: 'Előbb 2 meg 3. Utána adj hozzá még hármat.' },
  { id: 'm8c6', level: 3, badge: 'Szabály', ask: 'Mindig 2-vel kevesebb. Mi jön?', say: 'Nézd a számsort: 8, 6, 4. Mindig kettővel kevesebb. Melyik szám jön?', scene: <EqCard text="8 6 4 ?" />, options: [2, 3, 0], hint: 'A 4-ből vegyél el kettőt!' },
  { id: 'm8c7', level: 3, badge: 'Igaz vagy hamis?', ask: 'Igaz vagy hamis?', say: '4 meg 4 egyenlő 7. Igaz vagy hamis? A zöld pipa: igaz. A piros kereszt: hamis.', scene: <EqCard text="4 + 4 = 7" />, options: [HAMIS, IGAZ], hint: 'Számold ki a 4 meg 4-et! Annyi, mint 7?' },
  { id: 'm8c8', level: 3, badge: 'Igaz vagy hamis?', ask: 'Igaz vagy hamis?', say: '8 elvéve 1 nagyobb, mint 6. Igaz vagy hamis?', scene: <EqCard text="8 − 1 > 6" />, options: [IGAZ, HAMIS], hint: 'Előbb számold ki: 8 elvéve 1. Nagyobb, mint 6?' },
  { id: 'm8c9', level: 3, badge: 'Nyitott mondat', ask: BOX, say: 'Valahány elvéve 3 egyenlő 5. Hány volt az elején?', scene: <EqCard text="□ − 3 = 5" />, options: [8, 2, 7], hint: 'Ami maradt, meg amit elvettünk: 5 meg 3.' },
  { id: 'm8c10', level: 3, badge: 'Számszomszéd', ask: 'Melyik a 8 − 3 kisebb szomszédja?', say: 'Előbb számold ki a 8 elvéve 3-at. Melyik szám az eredmény kisebb szomszédja?', scene: <NumberLine max={8} />, options: [4, 5, 6], hint: 'Előbb számold ki a 8 elvéve 3-at. Aztán nézd meg a számegyenesen, melyik szám áll közvetlenül előtte.' },
  { id: 'm8c11', level: 3, badge: 'Kizárás', ask: 'Melyik kulcs nyitja a kamrát?', say: 'Csigusz azt mondja: nem 2 meg 2, és nem 8 elvéve 1. Melyik kulcs nyitja a kamrát?', scene: <KeysScene nums={[4, 5, 7]} />, options: [5, 4, 7], hint: 'Számold ki: 2 meg 2, és 8 elvéve 1. Ezeket a kulcsokat húzd át!' },
  { id: 'm8c12', level: 3, badge: 'Kis történet', ask: 'Hány szánkó van fent a dombon?', say: 'Zümi 3 szánkót húzott fel a dombra, Csigusz 5-öt. Hány szánkó van fent a dombon?', options: [8, 7, 2], hint: '3 meg 5. Számolj tovább az 5-től hármat!' },
];

export const MEGALLO_8_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd a képet a számmal! Számold meg, mennyi van rajta.',
    pairs: [
      { a: sm(<MiniBox icon="hopehely" n={8} />, 'hópelyhek'), b: 8 },
      { a: sm(<TwoHands n={7} className="w-24 h-auto" />, 'két kéz'), b: 7 },
      { a: sm(<Domino left={3} right={3} className="w-24 h-auto" />, 'dominó'), b: 6 },
      { a: sm(<TenFrame n={5} className="w-24 h-auto" />, 'korongok'), b: 5 },
    ],
  },
  2: {
    say: 'Számold ki! Melyik művelethez melyik szám illik?',
    pairs: [
      { a: '3 + 5', b: 8 },
      { a: '8 − 6', b: 2 },
      { a: '7 − 4', b: 3 },
      { a: '2 + 4', b: 6 },
      { a: '8 − 1', b: 7 },
      { a: '4 + 0', b: 4 },
    ],
  },
  3: {
    say: 'Melyik szám bújt el? Párosítsd a nyitott mondatot a jó számmal!',
    pairs: [
      { a: '□ + 6 = 8', b: 2 },
      { a: '8 − □ = 3', b: 5 },
      { a: '□ − 4 = 4', b: 8 },
      { a: '3 + □ = 7', b: 4 },
      { a: '6 − □ = 6', b: 0 },
    ],
  },
};

const ok = <TruthIcon ok className="w-10 h-10" />;
const no = <TruthIcon ok={false} className="w-10 h-10" />;

export const MEGALLO_8_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Nyolc, vagy nem nyolc? Számold meg vagy számold ki, és tedd a jó kosárba!',
    bins: [
      { label: 'Nyolc', figure: <BigSign text="8" className="w-12 h-12" />, say: 'nyolc' },
      { label: 'Nem nyolc', say: 'nem nyolc' },
    ],
    items: [
      { item: sm(<MiniBox icon="alma" n={8} />, 'almák'), bin: 0 },
      { item: '4 + 4', bin: 0 },
      { item: sm(<TwoHands n={8} className="w-24 h-auto" />, 'két kéz'), bin: 0 },
      { item: '5 + 2', bin: 1 },
      { item: sm(<MiniBox icon="hal" n={7} />, 'halak'), bin: 1 },
      { item: '8 − 0', bin: 0 },
      { item: sm(<Domino left={4} right={3} className="w-24 h-auto" />, 'dominó'), bin: 1 },
      { item: '6 + 1', bin: 1 },
    ],
  },
  2: {
    say: 'Számold ki! Páros vagy páratlan szám lesz az eredmény?',
    bins: [
      { label: 'Páros', say: 'páros' },
      { label: 'Páratlan', say: 'páratlan' },
    ],
    items: [
      { item: '3 + 3', bin: 0 },
      { item: '8 − 1', bin: 1 },
      { item: '2 + 2', bin: 0 },
      { item: '8 − 3', bin: 1 },
      { item: '5 + 3', bin: 0 },
      { item: '4 − 1', bin: 1 },
      { item: '7 − 6', bin: 1 },
      { item: '6 − 4', bin: 0 },
    ],
  },
  3: {
    say: 'Igaz vagy hamis? Számold ki, és tedd a jó kosárba!',
    bins: [
      { label: 'Igaz', figure: ok, say: 'igaz' },
      { label: 'Hamis', figure: no, say: 'hamis' },
    ],
    items: [
      { item: '8 − 4 = 4', bin: 0 },
      { item: '3 + 4 > 8', bin: 1 },
      { item: '2 + 6 = 8', bin: 0 },
      { item: '7 − 2 < 4', bin: 1 },
      { item: '6 = 3 + 3', bin: 0 },
      { item: '8 − 8 > 0', bin: 1 },
      { item: '5 + 1 < 7', bin: 0 },
      { item: '4 + 3 = 8', bin: 1 },
    ],
  },
};

export const Megallo8G1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="12. Megálló"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • JÁTÉK"
    base="g1-c10-megallo-8"
    chapterId="szamkorbovites-10-ig"
    questions={MEGALLO_8_G1_QUESTIONS}
    pairs={MEGALLO_8_G1_PAIRS}
    sort={MEGALLO_8_G1_SORT}
    {...props}
  />
);

export default Megallo8G1Jatek;
