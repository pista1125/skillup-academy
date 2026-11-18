import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { NumberLine, BigSign } from '../../shared/G1Pics';
import { Disks, Mini6, RowScene, SignRow } from '../a-hat/AHatG1Scenes';
import { ChainScene, ExprCompare, MixRowScene } from './Szamolas0Tol6IgG1Scenes';

const sm = (node: React.ReactNode, say: string) => ({ figure: node, say });
const GREEN = '#84cc16';
const eq = (s: string) => <SignRow items={s.split(' ')} />;

export const SZAMOLAS_0_TOL_6_IG_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – összeadás, kivonás képről
  { id: 's6-1', level: 1, badge: 'Összeadás képről', ask: 'Hány korong van összesen?', say: 'Öt piros meg egy kék korong. Hány korong van összesen?', scene: <Disks a={5} b={1} className="w-40 h-32 mx-auto" />, options: [6, 5, 4], hint: 'Számold meg a pirosakat, aztán számolj tovább a kékkel!' },
  { id: 's6-2', level: 1, badge: 'Összeadás képről', ask: '5 + 1 = ?', say: 'Öt piros alma meg egy zöld alma. Mennyi öt meg egy?', scene: <RowScene icon="alma" n={5} n2={1} color2={GREEN} />, options: [6, 5, 4], hint: 'Ötöt látsz pirosat. Számolj tovább a zölddel!' },
  { id: 's6-3', level: 1, badge: 'Összeadás képről', ask: '4 + 2 = ?', say: 'Négy piros meg két kék korong. Mennyi négy meg kettő?', scene: <Disks a={4} b={2} className="w-40 h-32 mx-auto" />, options: [6, 5, 3], hint: 'A négy után számolj tovább: öt, hat.' },
  { id: 's6-4', level: 1, badge: 'Kivonás képről', ask: '6 − 2 = ?', say: 'Hat eper volt, kettőt megettek, azok át vannak húzva. Mennyi hat elvéve kettő?', scene: <RowScene icon="eper" n={6} crossed={2} />, options: [4, 3, 2], hint: 'Csak azokat számold, amelyek nincsenek áthúzva!' },
  { id: 's6-5', level: 1, badge: 'Kivonás képről', ask: 'Hány gomba maradt?', say: 'Hat gomba volt, Csigusz egyet megevett. Hány gomba maradt?', scene: <RowScene icon="gomba" n={6} crossed={1} />, options: [5, 6, 4], hint: 'Az áthúzott gombát már megette. A többit számold!' },
  { id: 's6-6', level: 1, badge: 'Összeadás képről', ask: '3 + 3 = ?', say: 'Három piros meg három kék korong. Mennyi három meg három?', scene: <Disks a={3} b={3} className="w-40 h-32 mx-auto" />, options: [6, 5, 4], hint: 'Fent három, lent három. Számold meg mindet!' },
  { id: 's6-7', level: 1, badge: 'Kivonás képről', ask: 'Hány madár maradt?', say: 'Hat madár ült a fűben. Három elrepült, azokat áthúztuk. Hány madár maradt?', scene: <RowScene icon="madar" n={6} crossed={3} />, options: [3, 2, 4], hint: 'Az áthúzottak elrepültek. Csak a maradékot számold!' },
  { id: 's6-8', level: 1, badge: 'Összeadás képről', ask: '2 + 2 = ?', say: 'Két piros meg két kék korong. Mennyi kettő meg kettő?', scene: <Disks a={2} b={2} className="w-40 h-32 mx-auto" />, options: [4, 3, 5], hint: 'Mutass rá mindegyik korongra, és számolj!' },
  // 2. szint – műveletek kép nélkül, számegyenes, nyilak
  { id: 's6-9', level: 2, badge: 'Kivonás', ask: '6 − 3 = ?', say: 'Mennyi hat elvéve három?', scene: eq('6 − 3 = ?'), options: [3, 2, 4], hint: 'Mutass hat ujjat, és hajts le hármat! Hány maradt fent?' },
  { id: 's6-10', level: 2, badge: 'Összeadás', ask: '1 + 5 = ?', say: 'Mennyi egy meg öt?', scene: eq('1 + 5 = ?'), options: [6, 5, 4], hint: 'Kezdd a nagyobbal: öt, és még egy.' },
  { id: 's6-11', level: 2, badge: 'Számegyenes', ask: 'Hová ér Zümi?', say: 'Zümi a kettesről indul, és négyet ugrik előre. Hová ér?', scene: <NumberLine max={6} mark={[2]} question={6} jumps={[{ from: 2, to: 3 }, { from: 3, to: 4 }, { from: 4, to: 5 }, { from: 5, to: 6 }]} />, options: [6, 5, 4], hint: 'Számold meg az íveket a kettestől!' },
  { id: 's6-12', level: 2, badge: 'Kivonás', ask: '5 − 4 = ?', say: 'Mennyi öt elvéve négy?', scene: eq('5 − 4 = ?'), options: [1, 2, 0], hint: 'Mutass öt ujjat, és hajts le négyet!' },
  { id: 's6-13', level: 2, badge: 'Nyilak', ask: 'Mi kerül a ? helyére?', say: 'A hármasból kettővel előre megyünk. Mi kerül a kérdőjel helyére?', scene: <ChainScene start={3} ops={['+2']} values={['?']} />, options: [5, 4, 6], hint: 'A hármastól lépj kettőt előre: négy, öt.' },
  { id: 's6-14', level: 2, badge: 'Művelet a képhez', ask: 'Melyik illik a képhez?', say: 'Hat eper volt, kettőt áthúztunk. Melyik művelet illik a képhez?', scene: <RowScene icon="eper" n={6} crossed={2} />, options: ['6 − 2', '6 − 4', '5 − 2'], hint: 'Hány eper volt az elején? És hányat húztunk át?' },
  { id: 's6-15', level: 2, badge: 'Kivonás', ask: '6 − 6 = ?', say: 'Mennyi hat elvéve hat?', scene: eq('6 − 6 = ?'), options: [0, 6, 1], hint: 'Ha mindet elvesszük, mennyi marad?' },
  { id: 's6-16', level: 2, badge: 'Összeadás', ask: '? = 2 + 4', say: 'Mennyivel egyenlő kettő meg négy?', scene: eq('? = 2 + 4'), options: [6, 5, 4], hint: 'Itt az eredmény elöl áll. Számold ki: négy, és még kettő.' },
  // 3. szint – két lépés, összehasonlítás, történetek
  { id: 's6-17', level: 3, badge: 'Nyilak', ask: 'Mi lesz a végén?', say: 'A hatosból előbb kettővel vissza, aztán még hárommal vissza. Mi kerül a kérdőjel helyére?', scene: <ChainScene start={6} ops={['−2', '−3']} values={['', '?']} />, options: [1, 2, 3], hint: 'Előbb: hat elvéve kettő. Ami kijön, abból vegyél el hármat!' },
  { id: 's6-18', level: 3, badge: 'Jelek', ask: 'Melyik jel kell?', say: 'Három meg kettő, és öt elvéve kettő. Melyik jel kell középre?', scene: <ExprCompare left="3 + 2" right="5 − 2" />, options: ['>', '<', '='], hint: 'Számold ki mindkét oldalt! Utána hasonlítsd össze.' },
  { id: 's6-19', level: 3, badge: 'Jelek', ask: 'Melyik jel kell?', say: 'Kettő meg három, és egy meg négy. Melyik jel kell középre?', scene: <ExprCompare left="2 + 3" right="1 + 4" />, options: ['=', '<', '>'], hint: 'Mindkét oldalon számold ki az eredményt! Ugyanannyi?' },
  { id: 's6-20', level: 3, badge: 'Jelek', ask: 'Melyik jel kell?', say: 'Hat elvéve négy, és kettő meg egy. Melyik jel kell középre?', scene: <ExprCompare left="6 − 4" right="2 + 1" />, options: ['<', '>', '='], hint: 'Bal oldalon kettő lesz, jobb oldalon három. A hegye a kevesebb felé mutat.' },
  { id: 's6-21', level: 3, badge: 'Kakukktojás', ask: 'Melyik NEM hat?', say: 'Három művelet eredménye hat. Melyiké nem?', options: ['4 + 1', '2 + 4', '3 + 3', '6 − 0'], hint: 'Számold ki mindegyiket az ujjaidon! Melyik lesz kevesebb?' },
  { id: 's6-22', level: 3, badge: 'Három szám', ask: '1 + 2 + 3 = ?', say: 'Egy alma, két eper és három gomba. Mennyi egy meg kettő meg három?', scene: <MixRowScene groups={[{ icon: 'alma', n: 1 }, { icon: 'eper', n: 2 }, { icon: 'gomba', n: 3 }]} />, options: [6, 5, 4], hint: 'Egy meg kettő az három. A háromhoz adj még hármat!' },
  { id: 's6-23', level: 3, badge: 'Szöveges feladat', ask: 'Hány virágra szállt Zümi?', say: 'Zümi négy virágra szállt, aztán még kettőre. Hány virágra szállt összesen?', scene: <RowScene icon="virag" n={4} n2={2} color2="#a855f7" ringSecond />, options: [6, 5, 3], hint: 'Négy, és még kettő. Számolj tovább: öt, hat.' },
  { id: 's6-24', level: 3, badge: 'Szöveges feladat', ask: 'Hány levél maradt?', say: 'Csigusznak öt levele volt. Hármat megevett. Hány levele maradt?', scene: <RowScene icon="level" n={5} crossed={3} />, options: [2, 3, 1], hint: 'Öt volt, hármat elvett. Mutasd az ujjaidon!' },
];

export const SZAMOLAS_0_TOL_6_IG_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Piros és kék korongok. Párosítsd a képet az összeadással!',
    pairs: [
      { a: sm(<Disks a={5} b={1} />, 'öt piros, egy kék'), b: '5 + 1' },
      { a: sm(<Disks a={2} b={1} />, 'két piros, egy kék'), b: '2 + 1' },
      { a: sm(<Disks a={3} b={3} />, 'három piros, három kék'), b: '3 + 3' },
      { a: sm(<Disks a={4} b={2} />, 'négy piros, két kék'), b: '4 + 2' },
    ],
  },
  2: {
    say: 'Számold ki! Párosítsd a műveletet az eredményével!',
    pairs: [
      { a: '4 + 2', b: 6 },
      { a: '6 − 3', b: 3 },
      { a: '5 − 4', b: 1 },
      { a: '2 + 3', b: 5 },
      { a: '6 − 2', b: 4 },
    ],
  },
  3: {
    say: 'Melyik kettő egyforma? Párosítsd azokat, amelyeknek ugyanannyi az eredménye!',
    pairs: [
      { a: '2 + 4', b: '6 − 0' },
      { a: '1 + 2', b: '5 − 2' },
      { a: '6 − 5', b: '0 + 1' },
      { a: '2 + 2', b: '6 − 2' },
    ],
  },
};

export const SZAMOLAS_0_TOL_6_IG_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Összeadás vagy kivonás? Nézd meg a jelet, és tedd a jó kosárba!',
    bins: [
      { label: 'meg', figure: <BigSign text="+" className="w-12 h-12" />, say: 'összeadás, meg' },
      { label: 'elvéve', figure: <BigSign text="−" className="w-12 h-12" />, say: 'kivonás, elvéve' },
    ],
    items: [
      { item: '3 + 2', bin: 0 },
      { item: '6 − 1', bin: 1 },
      { item: '4 + 2', bin: 0 },
      { item: '5 − 3', bin: 1 },
      { item: '1 + 1', bin: 0 },
      { item: '6 − 6', bin: 1 },
      { item: sm(<Mini6 icon="alma" n={4} n2={2} color2={GREEN} />, 'piros és zöld almák'), bin: 0 },
      { item: sm(<Mini6 icon="eper" n={5} crossed={2} />, 'áthúzott eprek'), bin: 1 },
    ],
  },
  2: {
    say: 'Számold ki! Négy, öt vagy hat lesz?',
    bins: [
      { label: '4', say: 'négy' },
      { label: '5', say: 'öt' },
      { label: '6', say: 'hat' },
    ],
    items: [
      { item: '3 + 1', bin: 0 },
      { item: '6 − 2', bin: 0 },
      { item: '2 + 3', bin: 1 },
      { item: '6 − 1', bin: 1 },
      { item: '3 + 3', bin: 2 },
      { item: '6 − 0', bin: 2 },
      { item: '4 + 1', bin: 1 },
      { item: '2 + 2', bin: 0 },
    ],
  },
  3: {
    say: 'Háromnál kevesebb, pont három, vagy háromnál több lesz? Számold ki!',
    bins: [
      { label: 'Kevesebb', say: 'háromnál kevesebb' },
      { label: '3', figure: <BigSign text="3" className="w-12 h-12" />, say: 'pont három' },
      { label: 'Több', say: 'háromnál több' },
    ],
    items: [
      { item: '6 − 5', bin: 0 },
      { item: '4 − 2', bin: 0 },
      { item: '1 + 2', bin: 1 },
      { item: '6 − 3', bin: 1 },
      { item: '5 − 2', bin: 1 },
      { item: '2 + 4', bin: 2 },
      { item: '3 + 1', bin: 2 },
      { item: '6 − 6', bin: 0 },
    ],
  },
};

export const Szamolas0Tol6IgG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="2. Számolás 0-tól 6-ig"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • JÁTÉK"
    base="g1-c10-szamolas-0-tol-6-ig"
    chapterId="szamkorbovites-10-ig"
    questions={SZAMOLAS_0_TOL_6_IG_G1_QUESTIONS}
    pairs={SZAMOLAS_0_TOL_6_IG_G1_PAIRS}
    sort={SZAMOLAS_0_TOL_6_IG_G1_SORT}
    {...props}
  />
);

export default Szamolas0Tol6IgG1Jatek;
