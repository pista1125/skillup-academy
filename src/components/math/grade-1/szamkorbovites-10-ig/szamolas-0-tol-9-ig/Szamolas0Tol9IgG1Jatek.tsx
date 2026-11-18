import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { BigSign, TenFrame } from '../../shared/G1Pics';
import { EqCard, HopLine } from '../a-nyolc/ANyolcG1Scenes';
import { XBox, XMini, XRow } from '../a-kilenc/AKilencG1Scenes';
import { ArrowCard, PlatesScene, SlotBox, TrayScene } from './Szamolas0Tol9IgG1Scenes';

const sm = (node: React.ReactNode, say: string) => ({ figure: node, say });
const cookies = (a: number, b: number) => sm(<XMini icon="suti" n={a} iconB="sutiSziv" nb={b} />, `${a} csillag és ${b} szív`);
const eaten = (a: number, x: number) => sm(<XMini icon="suti" n={a} crossed={x} />, `${a} süti, ${x} áthúzva`);

export const SZAMOLAS_0_TOL_9_IG_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – képről olvasott összeadás, kivonás
  { id: 's1', level: 1, badge: 'Összeadás', ask: '6 + 3 = ?', say: '6 csillag és 3 szív alakú süti van a tálcán. Hány süti van összesen?', scene: <TrayScene a={6} b={3} />, options: [9, 8, 7], hint: 'Számold meg a csillagokat, aztán számolj tovább a szívekkel!' },
  { id: 's2', level: 1, badge: 'Összeadás', ask: 'Hány korong van összesen?', say: '7 piros és 2 kék korong van a keretben. Hány korong van összesen?', scene: <TenFrame n={7} second={2} />, options: [9, 8, 6], hint: 'A felső sor tele van: az 5. Számolj tovább lent!' },
  { id: 's3', level: 1, badge: 'Kivonás', ask: '9 − 2 = ?', say: '9 süti volt a tálcán, kettőt megettek. Hány maradt?', scene: <TrayScene a={9} crossed={2} />, options: [7, 6, 8], hint: 'Csak azokat számold, amelyek nincsenek áthúzva!' },
  { id: 's4', level: 1, badge: 'Összeadás', ask: '5 + 4 = ?', scene: <XRow icon="bogre" a={5} b={4} color="#3b82f6" />, options: [9, 8, 1], hint: '5 kék bögre, aztán számolj tovább a pirosakkal: 6, 7…' },
  { id: 's5', level: 1, badge: 'Kivonás', ask: '9 − 1 = ?', say: '9 csengő volt, egyet elvittek. Hány maradt?', scene: <XBox icon="csengo" n={9} crossed={1} className="w-56 h-auto mx-auto" />, options: [8, 9, 7], hint: 'Egyet elvettünk. Melyik szám van közvetlenül a 9 előtt?' },
  { id: 's6', level: 1, badge: 'Művelet a képről', ask: 'Melyik művelet illik a képhez?', say: '4 kék és 5 piros bögrét látsz. Melyik művelet illik a képhez?', scene: <XRow icon="bogre" a={4} b={5} color="#3b82f6" />, options: ['4 + 5', '4 + 4', '3 + 5'], hint: 'Számold meg külön a kékeket és a pirosakat!' },
  { id: 's7', level: 1, badge: 'Nulla', ask: '0 + 9 = ?', say: 'Nulla meg kilenc. Mennyi az eredmény?', scene: <EqCard text="0 + 9 = ?" />, options: [9, 0, 8], hint: 'Ha nullát adunk hozzá, semmi sem változik.' },
  { id: 's8', level: 1, badge: 'Számegyenes', ask: 'Hová ér Csigusz?', say: 'Csigusz a 8-on ül, és egyet lép előre. Hová ér? 8 + 1 = ?', scene: <HopLine from={8} to={9} max={9} />, options: [9, 8, 7], hint: 'Egy lépés előre: melyik szám jön a 8 után?' },
  // 2. szint – nyíl, számegyenes, nyitott mondatok
  { id: 's9', level: 2, badge: 'Nyíl szerint', ask: 'Mi kerül a □ helyére?', say: 'Kezdd a 3-nál, és adj hozzá 5-öt. Mi kerül az üres négyzetbe?', scene: <ArrowCard from={3} op="+5" />, options: [8, 7, 9], hint: 'Kezdd a 3-nál, és számolj tovább ötöt!' },
  { id: 's10', level: 2, badge: 'Nyíl szerint', ask: 'Mi kerül a □ helyére?', say: 'Kezdd az 5-nél, és adj hozzá 4-et. Mi kerül az üres négyzetbe?', scene: <ArrowCard from={5} op="+4" />, options: [9, 8, 1], hint: 'Kezdd az 5-nél, és számolj tovább négyet: 6, 7…' },
  { id: 's11', level: 2, badge: 'Számegyenes', ask: '9 − 3 = ?', say: 'Csigusz a 9-ről hármat lép vissza. Hová ér? 9 − 3 = ?', scene: <HopLine from={9} to={6} max={9} />, options: [6, 5, 7], hint: 'Számold meg az íveket! Lépj vissza hármat a 9-től.' },
  { id: 's12', level: 2, badge: 'Nyitott mondat', ask: '4 + □ = 9', say: 'A dobozban 9 hely van, 4 süti már benne van. Hány fér még bele? 4 + □ = 9.', scene: <SlotBox have={4} />, options: [5, 4, 6], hint: 'Számold meg az üres helyeket! Vagy számolj tovább a 4-től a 9-ig.' },
  { id: 's13', level: 2, badge: 'Nyitott mondat', ask: '9 − □ = 7', say: '9 sütiből valahányat megettek, 7 maradt. Melyik szám kell az üres négyzetbe?', scene: <EqCard text="9 − □ = 7" />, options: [2, 3, 1], hint: 'Lépj visszafelé a 9-től a 7-ig! Hányat léptél?' },
  { id: 's14', level: 2, badge: 'Csere', ask: 'Melyik ugyanannyi, mint 2 + 7?', say: 'Melyik összeadás eredménye ugyanannyi, mint 2 + 7?', scene: <EqCard text="2 + 7" className="w-48 h-auto mx-auto" />, options: ['7 + 2', '7 + 3', '2 + 6'], hint: 'Ha a két számot felcseréled, az eredmény ugyanaz marad.' },
  { id: 's15', level: 2, badge: 'Nyitott mondat', ask: '□ − 4 = 5', say: 'Valahányból elvettünk 4-et, és 5 maradt. Melyik szám kell az üres négyzetbe?', scene: <EqCard text="□ − 4 = 5" />, options: [9, 8, 1], hint: 'Ami maradt, meg amit elvettünk: 5 + 4. Ennyi volt az elején.' },
  { id: 's16', level: 2, badge: 'Művelet a képről', ask: 'Melyik kivonás illik a képhez?', say: '9 süti volt, ebből kettőt áthúztunk. Melyik kivonás illik a képhez?', scene: <TrayScene a={9} crossed={2} />, options: ['9 − 2', '9 − 3', '7 − 2'], hint: 'Hány süti volt az elején? Hányat húztunk át?' },
  // 3. szint – három tag, jelek, két lépés, történetek
  { id: 's17', level: 3, badge: 'Három szám', ask: '3 + 3 + 3 = ?', say: 'Három tányéron 3-3 süti van. Hány süti van együtt?', scene: <PlatesScene per={[3, 3, 3]} />, options: [9, 6, 8], hint: 'Előbb 3 + 3 = 6. Aztán jön még 3.' },
  { id: 's18', level: 3, badge: 'Három szám', ask: '2 + 2 + 5 = ?', say: 'Három tányéron 2, 2 és 5 süti van. Hány süti van együtt?', scene: <PlatesScene per={[2, 2, 5]} />, options: [9, 7, 8], hint: 'Előbb 2 + 2 = 4. Aztán számolj tovább ötöt!' },
  { id: 's19', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: 'Bal oldalon 6 + 3, jobb oldalon 8. Melyik jel kell a kérdőjel helyére?', scene: <EqCard text="6 + 3 ? 8" />, options: ['>', '<', '='], hint: 'Számold ki: mennyi 6 + 3? Több, mint 8?' },
  { id: 's20', level: 3, badge: 'Ugyanannyi', ask: 'Melyik jel kell?', say: 'Bal oldalon 9 − 4, jobb oldalon 5. Melyik jel kell a kérdőjel helyére?', scene: <EqCard text="9 − 4 ? 5" />, options: ['=', '<', '>'], hint: 'Számold ki: mennyi 9 − 4? Hasonlítsd össze az 5-tel!' },
  { id: 's21', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: 'Bal oldalon 4 + 4, jobb oldalon 9. Melyik jel kell a kérdőjel helyére?', scene: <EqCard text="4 + 4 ? 9" />, options: ['<', '>', '='], hint: 'Mennyi 4 + 4? Több vagy kevesebb, mint 9?' },
  { id: 's22', level: 3, badge: 'Két lépés', ask: '2 + 7 − 5 = ?', say: 'Két lépésben számolj! 2 + 7, aztán vegyél el 5-öt.', scene: <EqCard text="2 + 7 − 5 = ?" />, options: [4, 5, 9], hint: 'Előbb 2 + 7 = 9. Aztán 9-ből vegyél el 5-öt!' },
  { id: 's23', level: 3, badge: 'Kis történet', ask: 'Hány süti maradt?', say: 'Zümi 9 sütit sütött. Csigusz megevett 3-at, Pötyi 2-t. Hány süti maradt?', scene: <TrayScene a={9} crossed={5} />, options: [4, 5, 6], hint: 'Előbb 9 − 3 = 6. Aztán a 6-ból vegyél el még 2-t!' },
  { id: 's24', level: 3, badge: 'Nyitott mondat', ask: '7 < □ < 9', say: 'Melyik szám nagyobb, mint 7, és kisebb, mint 9?', scene: <EqCard text="7 < □ < 9" />, options: [8, 7, 9], hint: 'Keresd a számegyenesen a 7 és a 9 között álló számot!' },
];

export const SZAMOLAS_0_TOL_9_IG_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd a képet a művelettel! Csillag és szív alakú sütiket látsz.',
    pairs: [
      { a: cookies(5, 4), b: '5 + 4' },
      { a: cookies(6, 2), b: '6 + 2' },
      { a: cookies(7, 2), b: '7 + 2' },
      { a: cookies(3, 3), b: '3 + 3' },
    ],
  },
  2: {
    say: 'Számold ki! Párosítsd a műveletet az eredményével!',
    pairs: [
      { a: '9 − 3', b: 6 },
      { a: '8 + 1', b: 9 },
      { a: '9 − 7', b: 2 },
      { a: '4 + 4', b: 8 },
      { a: '9 − 9', b: 0 },
    ],
  },
  3: {
    say: 'Melyik szám kell a négyzetbe? Párosítsd!',
    pairs: [
      { a: '4 + □ = 9', b: 5 },
      { a: '9 − □ = 6', b: 3 },
      { a: '□ + 2 = 9', b: 7 },
      { a: '9 − □ = 8', b: 1 },
    ],
  },
};

export const SZAMOLAS_0_TOL_9_IG_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Mit mutat a kép? Hozzáadtunk, vagy elvettünk? Tedd a jó kosárba!',
    bins: [
      { label: 'Összeadás', figure: <BigSign text="+" className="w-12 h-12" />, say: 'összeadás' },
      { label: 'Kivonás', figure: <BigSign text="−" className="w-12 h-12" />, say: 'kivonás' },
    ],
    items: [
      { item: cookies(5, 4), bin: 0 },
      { item: eaten(9, 2), bin: 1 },
      { item: cookies(6, 3), bin: 0 },
      { item: eaten(8, 3), bin: 1 },
      { item: cookies(2, 7), bin: 0 },
      { item: eaten(9, 4), bin: 1 },
    ],
  },
  2: {
    say: 'Számold ki! Pont 9 az eredmény, vagy nem 9?',
    bins: [
      { label: 'Pont 9', figure: <BigSign text="9" className="w-12 h-12" />, say: 'pont kilenc' },
      { label: 'Nem 9', say: 'nem kilenc' },
    ],
    items: [
      { item: '9 − 0', bin: 0 },
      { item: '4 + 5', bin: 0 },
      { item: '2 + 7', bin: 0 },
      { item: '6 + 3', bin: 0 },
      { item: '9 − 1', bin: 1 },
      { item: '3 + 5', bin: 1 },
      { item: '9 − 2', bin: 1 },
      { item: '1 + 7', bin: 1 },
    ],
  },
  3: {
    say: 'Számold ki! Az eredmény kevesebb, mint 5, pont 5, vagy több, mint 5?',
    bins: [
      { label: '< 5', say: 'kevesebb, mint öt' },
      { label: '5', say: 'pont öt' },
      { label: '> 5', say: 'több, mint öt' },
    ],
    items: [
      { item: '9 − 5', bin: 0 },
      { item: '9 − 8', bin: 0 },
      { item: '8 − 6', bin: 0 },
      { item: '2 + 3', bin: 1 },
      { item: '9 − 4', bin: 1 },
      { item: '1 + 2 + 2', bin: 1 },
      { item: '3 + 3 + 3', bin: 2 },
      { item: '6 + 1', bin: 2 },
      { item: '4 + 4', bin: 2 },
    ],
  },
};

export const Szamolas0Tol9IgG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="14. Számolás 0-tól 9-ig"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • JÁTÉK"
    base="g1-c10-szamolas-0-tol-9-ig"
    chapterId="szamkorbovites-10-ig"
    questions={SZAMOLAS_0_TOL_9_IG_G1_QUESTIONS}
    pairs={SZAMOLAS_0_TOL_9_IG_G1_PAIRS}
    sort={SZAMOLAS_0_TOL_9_IG_G1_SORT}
    {...props}
  />
);

export default Szamolas0Tol9IgG1Jatek;
