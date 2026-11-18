import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { NumberLine, TenFrame } from '../../shared/G1Pics';
import { BirdsScene, ExprScene, OpScene, PinsScene } from '../a-het/AHetG1Scenes';

const tf = (n: number, second: number, say: string) => ({ figure: <TenFrame n={n} second={second} className="w-32 h-auto" />, say });
const steps = (from: number, to: number) =>
  from < to ? Array.from({ length: to - from }, (_, i) => ({ from: from + i, to: from + i + 1 })) : Array.from({ length: from - to }, (_, i) => ({ from: from - i, to: from - i - 1 }));

export const SZAMOLAS_0_TOL_7_IG_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – összeadás, elvétel képről
  { id: 's1', level: 1, badge: 'Összeadás képről', ask: 'Hány eper lesz összesen?', say: 'Öt eper, meg még kettő. Hány eper lesz összesen?', scene: <OpScene icon="eper" a={5} b={2} op="+" />, options: [7, 6, 5], hint: 'Számolj tovább az öttől: hat, hét.' },
  { id: 's2', level: 1, badge: 'Összeadás korongokkal', ask: '6 + 1 = ?', say: 'Hat piros és egy kék korong. Hat meg egy, mennyi?', scene: <TenFrame n={6} second={1} />, options: [7, 5, 6], hint: 'A kék korongot is számold hozzá!' },
  { id: 's3', level: 1, badge: 'Elvétel képről', ask: 'Hány alma marad?', say: 'Hét alma volt, egyet áthúztunk. Hány alma marad?', scene: <OpScene icon="alma" a={7} b={1} op="−" />, options: [6, 7, 5], hint: 'Az áthúzott almát ne számold!' },
  { id: 's4', level: 1, badge: 'Elvétel képről', ask: 'Hány labda marad?', say: 'Hét labdából kettőt elgurítottunk. Hány labda marad?', scene: <OpScene icon="labda" a={7} b={2} op="−" />, options: [5, 4, 6], hint: 'Csak a nem áthúzott labdákat számold!' },
  { id: 's5', level: 1, badge: 'Összeadás korongokkal', ask: '4 + 3 = ?', say: 'Négy piros és három kék korong. Négy meg három, mennyi?', scene: <TenFrame n={4} second={3} />, options: [7, 6, 5], hint: 'Számold meg az összes korongot, a pirosat és a kéket is!' },
  { id: 's6', level: 1, badge: 'Összeadás képről', ask: 'Hány gomba lesz?', say: 'Három gomba, meg még három. Hány gomba lesz?', scene: <OpScene icon="gomba" a={3} b={3} op="+" />, options: [6, 7, 5], hint: 'Mutass rá mindegyik gombára, és számolj!' },
  { id: 's7', level: 1, badge: 'Elvétel', ask: 'Hány hal marad?', say: 'Hét hal úszott, mind a hét elúszott. Hány hal marad?', scene: <OpScene icon="hal" a={7} b={7} op="−" />, options: [0, 7, 1], hint: 'Mindegyik hal át van húzva. Ha nem marad semmi, az mennyi?' },
  { id: 's8', level: 1, badge: 'Nulla hozzáadása', ask: '7 + 0 = ?', say: 'Hét csillag, és a másik doboz üres. Hét meg nulla, mennyi?', scene: <OpScene icon="csillag" a={7} b={0} op="+" />, options: [7, 0, 6], hint: 'A nulla semmi. Ha semmit sem teszünk hozzá, ugyanannyi marad.' },
  // 2. szint – számegyenes, kép választása, kiegészítés
  { id: 's9', level: 2, badge: 'Számegyenes', ask: '2 + 5 = ?', say: 'Csigusz a kettesről ötöt ugrik előre. Hová ér?', scene: <NumberLine max={7} mark={[2]} question={7} jumps={steps(2, 7)} />, options: [7, 6, 5], hint: 'Számold az ugrásokat a kettestől: egy, kettő, három, négy, öt.' },
  { id: 's10', level: 2, badge: 'Számegyenes', ask: '7 − 4 = ?', say: 'Zümi a hetesről négyet repül visszafelé. Hová ér?', scene: <NumberLine max={7} mark={[7]} question={3} jumps={steps(7, 3)} />, options: [3, 4, 2], hint: 'Visszafelé lépj a hetestől: hat, öt, négy, három.' },
  { id: 's11', level: 2, badge: 'Elvétel képről', ask: 'Hány bábu áll még?', say: 'Hét bábu állt, három eldőlt. Hány bábu áll még?', scene: <PinsScene total={7} fallen={3} />, options: [4, 3, 5], hint: 'Csak az álló bábukat számold!' },
  { id: 's12', level: 2, badge: 'Kép a művelethez', ask: 'Melyik kép illik ide: 2 + 5?', say: 'Melyik korongkép illik ehhez: kettő meg öt?', options: [tf(2, 5, 'két piros, öt kék'), tf(2, 3, 'két piros, három kék'), tf(1, 5, 'egy piros, öt kék')], hint: 'Két piros korong és öt kék kell. Számold meg mindkét színt!' },
  { id: 's13', level: 2, badge: 'Kiegészítés 7-re', ask: 'Hány kék kell, hogy 7 legyen?', say: 'Négy piros korong van. Hány kéket tegyünk mellé, hogy hét legyen?', scene: <TenFrame n={4} />, options: [3, 4, 2], hint: 'Számolj tovább a négyestől hétig, és figyeld, hányat számoltál!' },
  { id: 's14', level: 2, badge: 'Elvétel képről', ask: '6 − 4 = ?', say: 'Hat korongból négyet elvettünk. Hat elvéve négy, mennyi?', scene: <OpScene icon="korong" a={6} b={4} op="−" />, options: [2, 3, 4], hint: 'Az áthúzottakat ne számold!' },
  { id: 's15', level: 2, badge: 'Összeadás korongokkal', ask: '1 + 6 = ?', say: 'Egy piros és hat kék korong. Egy meg hat, mennyi?', scene: <TenFrame n={1} second={6} />, options: [7, 6, 5], hint: 'Kezdd a hattal, és adj hozzá egyet!' },
  { id: 's16', level: 2, badge: 'Elvétel képről', ask: '5 − 3 = ?', say: 'Öt levél volt, hármat elfújt a szél. Hány maradt?', scene: <OpScene icon="level" a={5} b={3} op="−" />, options: [2, 3, 1], hint: 'Csak a nem áthúzott leveleket számold!' },
  // 3. szint – műveletek összehasonlítása, két lépés, történetek
  { id: 's17', level: 3, badge: 'Művelet és jel', ask: 'Melyik jel kell?', say: 'Öt meg kettő, és hat. Melyik jel kell középre?', scene: <ExprScene text="5 + 2 ? 6" />, options: ['>', '<', '='], hint: 'Előbb számold ki: öt meg kettő mennyi? Aztán hasonlítsd a hatoshoz!' },
  { id: 's18', level: 3, badge: 'Művelet és jel', ask: 'Melyik jel kell?', say: 'Négy meg három, és hét. Melyik jel kell középre?', scene: <ExprScene text="4 + 3 ? 7" />, options: ['=', '<', '>'], hint: 'Számold ki a négy meg hármat! Ugyanannyi, mint hét?' },
  { id: 's19', level: 3, badge: 'Művelet és jel', ask: 'Melyik jel kell?', say: 'Hét elvéve három, és öt. Melyik jel kell középre?', scene: <ExprScene text="7 − 3 ? 5" />, options: ['<', '>', '='], hint: 'Előbb számold ki: hét elvéve három. Kevesebb vagy több, mint öt?' },
  { id: 's20', level: 3, badge: 'Két lépés', ask: '4 + 3 − 1 = ?', say: 'Négy piros és három kék korong. Utána egy kéket elveszünk. Mennyi marad?', scene: <TenFrame n={4} second={3} crossed={1} />, options: [6, 7, 5], hint: 'Előbb add össze, aztán vegyél el egyet!' },
  { id: 's21', level: 3, badge: 'Történet', ask: 'Hány virág maradt?', say: 'Hét virág nyílt a kertben. Pötyi kettőt leszedett a mamájának. Hány virág maradt?', scene: <OpScene icon="virag" a={7} b={2} op="−" />, options: [5, 2, 7], hint: 'Hét elvéve kettő. A leszedetteket ne számold!' },
  { id: 's22', level: 3, badge: 'Történet', ask: 'Hány madár lesz az ágon?', say: 'Négy madár ül az ágon. Jön még három. Hány madár lesz az ágon?', scene: <BirdsScene sitting={4} coming={3} />, options: [7, 4, 3], hint: 'Az ülő és a repülő madarakat is számold!' },
  { id: 's23', level: 3, badge: 'Melyik ér 7-et?', ask: 'Melyik ér 7-et?', say: 'Melyik művelet eredménye hét?', options: ['3 + 4', '3 + 3', '7 − 1'], hint: 'Számold ki mindegyiket! Csak egy lesz pont hét.' },
  { id: 's24', level: 3, badge: 'Két lépés', ask: '5 + 2 − 3 = ?', say: 'Öt meg kettő, aztán elvéve három. Mennyi lesz?', scene: <ExprScene text="5 + 2 − 3 = ?" />, options: [4, 3, 5], hint: 'Lépésenként! Öt meg kettő az hét. Hétből vegyél el hármat!' },
];

export const SZAMOLAS_0_TOL_7_IG_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Hány korong van a képen összesen? Koppints a képre, aztán a számra!',
    pairs: [
      { a: tf(5, 2, 'öt piros, két kék'), b: 7 },
      { a: tf(3, 3, 'három piros, három kék'), b: 6 },
      { a: tf(4, 1, 'négy piros, egy kék'), b: 5 },
      { a: tf(2, 2, 'két piros, két kék'), b: 4 },
    ],
  },
  2: {
    say: 'Párosítsd a műveletet az eredményével!',
    pairs: [
      { a: '7 − 2', b: 5 },
      { a: '6 − 3', b: 3 },
      { a: '7 − 6', b: 1 },
      { a: '4 + 3', b: 7 },
      { a: '2 + 4', b: 6 },
    ],
  },
  3: {
    say: 'Keresd meg a párját! Az a pár, aminek ugyanannyi az eredménye.',
    pairs: [
      { a: '7 − 2', b: '6 − 1' },
      { a: '6 − 4', b: '4 − 2' },
      { a: '7 − 3', b: '6 − 2' },
      { a: '7 − 6', b: '4 − 3' },
    ],
  },
};

export const SZAMOLAS_0_TOL_7_IG_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Számold meg a korongokat! Ha hét, a hetes kosárba tedd. Ha kevesebb, a másikba.',
    bins: [
      { label: 'Pont 7', say: 'pont hét' },
      { label: 'Kevesebb, mint 7', say: 'hétnél kevesebb' },
    ],
    items: [
      { item: tf(5, 2, 'korongok'), bin: 0 },
      { item: tf(4, 3, 'korongok'), bin: 0 },
      { item: tf(3, 2, 'korongok'), bin: 1 },
      { item: tf(6, 1, 'korongok'), bin: 0 },
      { item: tf(2, 2, 'korongok'), bin: 1 },
      { item: tf(4, 2, 'korongok'), bin: 1 },
      { item: tf(1, 6, 'korongok'), bin: 0 },
    ],
  },
  2: {
    say: 'Számold ki! Öt, hat, vagy hét lesz? Tedd a jó kosárba!',
    bins: [
      { label: '5', say: 'öt' },
      { label: '6', say: 'hat' },
      { label: '7', say: 'hét' },
    ],
    items: [
      { item: '3 + 2', bin: 0 },
      { item: '7 − 2', bin: 0 },
      { item: '4 + 2', bin: 1 },
      { item: '7 − 1', bin: 1 },
      { item: '6 + 1', bin: 2 },
      { item: '7 − 0', bin: 2 },
      { item: '6 − 1', bin: 0 },
      { item: '3 + 3', bin: 1 },
      { item: '5 + 2', bin: 2 },
    ],
  },
  3: {
    say: 'Számold ki! Páros vagy páratlan lett az eredmény?',
    bins: [
      { label: 'Páros', say: 'páros' },
      { label: 'Páratlan', say: 'páratlan' },
    ],
    items: [
      { item: '3 + 2 − 4', bin: 1 },
      { item: '5 + 1 − 2', bin: 0 },
      { item: '1 + 2 + 3', bin: 0 },
      { item: '3 + 4 + 0', bin: 1 },
      { item: '7 − 4 + 2', bin: 1 },
      { item: '6 − 2 − 2', bin: 0 },
      { item: '7 − 1 − 3', bin: 1 },
      { item: '2 + 2 + 2', bin: 0 },
    ],
  },
};

export const Szamolas0Tol7IgG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="6. Számolás 0-tól 7-ig"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • JÁTÉK"
    base="g1-c10-szamolas-0-tol-7-ig"
    chapterId="szamkorbovites-10-ig"
    questions={SZAMOLAS_0_TOL_7_IG_G1_QUESTIONS}
    pairs={SZAMOLAS_0_TOL_7_IG_G1_PAIRS}
    sort={SZAMOLAS_0_TOL_7_IG_G1_SORT}
    {...props}
  />
);

export default Szamolas0Tol7IgG1Jatek;
