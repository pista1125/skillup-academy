import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import {
  COLORS,
  FLOWER,
  HouseBuildScene,
  MagicGridScene,
  MirrorFig,
  MirrorScene,
  NestedSquaresScene,
  ROCKET,
  ShapeFig,
  ShapePicture,
  ShapeRowScene,
  StickShapesScene,
  ThingFig,
  TRAIN,
  fold,
  shp,
} from './SikidomokG1Scenes';

const C = COLORS;
const sticks = (shapes: ('haromszog' | 'negyzet' | 'teglalap')[], say: string, cls = 'w-28 h-16') => ({ figure: <StickShapesScene shapes={shapes} className={cls} />, say });
const thing = (k: Parameters<typeof ThingFig>[0]['k'], say: string) => ({ figure: <ThingFig k={k} />, say });

export const SIKIDOMOK_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – a négy síkidom felismerése
  { id: 's1', level: 1, badge: 'Kör', ask: 'Melyik a kör?', options: [shp('kor', C.kek), shp('negyzet', C.kek), shp('haromszog', C.kek)], hint: 'Ennek sarka van. A kör kerek, mint a tányér.' },
  { id: 's2', level: 1, badge: 'Háromszög', ask: 'Melyik a háromszög?', options: [shp('haromszog', C.zold), shp('kor', C.zold), shp('teglalap', C.zold)], hint: 'Számold meg a sarkait! A háromszögnek három sarka van.' },
  { id: 's3', level: 1, badge: 'Négyzet', ask: 'Melyik a négyzet?', options: [shp('negyzet', C.piros), shp('teglalap', C.piros), shp('kor', C.piros)], hint: 'Ez hosszúkás. A négyzet minden oldala egyforma.' },
  { id: 's4', level: 1, badge: 'Téglalap', ask: 'Melyik a téglalap?', options: [shp('teglalap', C.lila), shp('negyzet', C.lila), shp('haromszog', C.lila)], hint: 'A téglalap hosszúkás: két oldala hosszabb, kettő rövidebb.' },
  { id: 's5', level: 1, badge: 'Forma, szín, méret', ask: 'Hol a nagy piros háromszög?', options: [shp('haromszog', C.piros, { r: 32, say: 'nagy piros háromszög' }), shp('haromszog', C.piros, { r: 16, say: 'kis piros háromszög' }), shp('haromszog', C.kek, { r: 32, say: 'nagy kék háromszög' })], hint: 'Figyelj a színére és a méretére is!' },
  { id: 's6', level: 1, badge: 'Pálcikából', ask: 'Hány pálcika kell a négyzethez?', scene: <StickShapesScene shapes={['negyzet']} className="w-44 h-auto mx-auto" />, options: [4, 3, 5], hint: 'Mutass rá mindegyik színes pálcikára, és számold!' },
  { id: 's7', level: 1, badge: 'Pálcikából', ask: 'Hány pálcika kell a háromszöghöz?', scene: <StickShapesScene shapes={['haromszog']} className="w-44 h-auto mx-auto" />, options: [3, 4, 2], hint: 'Mutass rá mindegyik színes pálcikára, és számold!' },
  { id: 's8', level: 1, badge: 'Egyforma formák', ask: 'Keresd a párját!', say: 'Melyik forma ugyanolyan, mint a kék négyzet?', scene: <ShapeFig k="negyzet" color={C.kek} className="w-24 h-24 mx-auto" />, options: [shp('negyzet', C.kek, { say: 'kék négyzet' }), shp('teglalap', C.kek, { say: 'kék téglalap' }), shp('kor', C.kek, { say: 'kék kör' })], hint: 'Ugyanolyan színű, de az alakja is egyezzen!' },
  // 2. szint – sorminta, válogatás, számlálás a képen
  { id: 's9', level: 2, badge: 'Sorminta', ask: 'Mi jön a sorban?', say: 'Kör, négyzet, háromszög, kör, négyzet. Mi jön a kérdőjel helyére?', scene: <ShapeRowScene items={[{ k: 'kor', color: C.zold }, { k: 'negyzet', color: C.zold }, { k: 'haromszog', color: C.zold }, { k: 'kor', color: C.zold }, { k: 'negyzet', color: C.zold }, null]} />, options: [shp('haromszog', C.zold), shp('kor', C.zold), shp('negyzet', C.zold)], hint: 'Mondd hangosan a sort az elejéről!' },
  { id: 's10', level: 2, badge: 'Sorminta', ask: 'Mi jön a sorban?', say: 'Háromszög, négyzet, négyzet, háromszög, négyzet. Mi jön a kérdőjel helyére?', scene: <ShapeRowScene items={[{ k: 'haromszog', color: C.sarga }, { k: 'negyzet', color: C.kek }, { k: 'negyzet', color: C.kek }, { k: 'haromszog', color: C.sarga }, { k: 'negyzet', color: C.kek }, null]} />, options: [shp('negyzet', C.kek), shp('haromszog', C.sarga)], hint: 'Egy háromszög után két négyzet jön. Hány négyzet van már az utolsó háromszög után?' },
  { id: 's11', level: 2, badge: 'Melyik nem illik', ask: 'Melyik nem illik a többi közé?', say: 'Három háromszög és egy másik forma. Melyik nem illik közéjük?', options: [shp('kor', C.sarga), shp('haromszog', C.piros), shp('derekszogu', C.kek), shp('haromszog', C.zold, { rot: 30 })], hint: 'Ennek három sarka van, ez háromszög. Melyik kerek?' },
  { id: 's12', level: 2, badge: 'Melyik nem illik', ask: 'Melyik nem illik a többi közé?', say: 'Három négyzet és egy másik forma. Melyik nem illik közéjük?', options: [shp('teglalap', C.narancs), shp('negyzet', C.narancs, { r: 18 }), shp('negyzet', C.kek, { rot: 45 }), shp('negyzet', C.zold)], hint: 'A ferdén álló is négyzet! Melyik hosszúkás?' },
  { id: 's13', level: 2, badge: 'Formák a képen', ask: 'Hány kör van a virágon?', say: 'Számold meg, hány kör van a virágon!', scene: <ShapePicture shapes={FLOWER} className="w-56 h-auto mx-auto" />, options: [6, 5, 4], hint: 'A közepét is számold! Mutass mindegyikre!' },
  { id: 's14', level: 2, badge: 'Formák a képen', ask: 'Hány háromszög van a rakétán?', scene: <ShapePicture shapes={ROCKET} bg="#eef2ff" className="w-56 h-auto mx-auto" />, options: [5, 3, 4], hint: 'Az orrát, a szárnyait és a lángokat is számold!' },
  { id: 's15', level: 2, badge: 'Formák a képen', ask: 'Hány négyzet van a vonaton?', say: 'Számold meg, hány négyzet van a vonaton!', scene: <ShapePicture shapes={TRAIN} w={280} h={190} bg="#f0fdf4" className="w-64 h-auto mx-auto" />, options: [4, 3, 5], hint: 'A mozdony fülkéje is négyzet. A hosszúkás téglalap nem az!' },
  { id: 's16', level: 2, badge: 'Bűvös négyzet', ask: 'Mi illik az üres helyre?', say: 'Minden sorban van egy kör, egy háromszög és egy négyzet. Mi hiányzik az utolsó sorból?', scene: <MagicGridScene grid={[['haromszog', 'kor', 'negyzet'], ['kor', 'negyzet', 'haromszog'], ['negyzet', 'haromszog', null]]} />, options: [shp('kor', C.kek), shp('negyzet', C.kek), shp('haromszog', C.kek)], hint: 'Nézd meg az utolsó sort! Melyik forma nincs még benne?' },
  // 3. szint – két lépés, tükör
  { id: 's17', level: 3, badge: 'Négyzetek az ábrán', ask: 'Hány négyzetet látsz?', say: 'Hány négyzetet látsz ezen az ábrán? A nagyot is számold!', scene: <NestedSquaresScene />, options: [2, 1, 3], hint: 'Van egy kicsi a sarokban, és egy nagy is körülötte.' },
  { id: 's18', level: 3, badge: 'Pálcikából', ask: 'Hány pálcika kell két háromszöghöz?', scene: <StickShapesScene shapes={['haromszog', 'haromszog']} className="w-60 h-auto mx-auto" />, options: [6, 3, 5], hint: 'Egy háromszöghöz 3 pálcika kell. És a másikhoz?' },
  { id: 's19', level: 3, badge: 'Pálcikából', ask: 'Hány pálcika kell ehhez a kettőhöz?', say: 'Egy négyzet és egy háromszög. Hány pálcika kell a kettőhöz együtt?', scene: <StickShapesScene shapes={['negyzet', 'haromszog']} className="w-60 h-auto mx-auto" />, options: [7, 6, 8], hint: 'A négyzethez 4 pálcika kell, a háromszöghöz 3. Számold össze!' },
  { id: 's20', level: 3, badge: 'Tükörkép', ask: 'Melyik a tükörképe?', say: 'A piros vonal a tükör. Melyik a lila forma tükörképe?', scene: <MirrorScene />, options: [{ figure: <MirrorFig mode="mirror" />, say: 'átfordítva oldalra' }, { figure: <MirrorFig mode="same" />, say: 'ugyanúgy áll' }, { figure: <MirrorFig mode="flip" />, say: 'fejjel lefelé' }], hint: 'A tükörben a forma oldalra fordul. A lába a tükör felé kerül.' },
  { id: 's21', level: 3, badge: 'Összehajtás', ask: 'Melyiknek fedi egymást a két fele?', say: 'Melyiket tudnád úgy összehajtani, hogy a két fele pontosan fedje egymást?', options: [fold('pillango'), fold('derekszogu'), fold('auto')], hint: 'Képzeld el, hogy középen összehajtod! Melyiknek egyforma a két fele?' },
  { id: 's22', level: 3, badge: 'Összehajtás', ask: 'Melyiket NEM lehet összehajtani?', say: 'Melyik rajznak NEM egyforma a két fele?', options: [fold('zaszlo'), fold('sziv'), fold('kor'), fold('level')], hint: 'Ezt középen összehajthatod. Keresd azt, amelyiknek a két fele más!' },
  { id: 's23', level: 3, badge: 'Kirakás', ask: 'Melyik illik a tetőre?', say: 'Csigusz házat rak ki. Melyik síkidom kell a tetőre?', scene: <HouseBuildScene />, options: [shp('haromszog', C.piros), shp('negyzet', C.piros), shp('kor', C.piros)], hint: 'Nézd meg a szaggatott vonalat! Hány sarka van?' },
  { id: 's24', level: 3, badge: 'Sorminta', ask: 'Mi jön a sorban?', say: 'Nagy kör, kis kör, nagy kör, kis kör. Mi jön ezután?', scene: <ShapeRowScene items={[{ k: 'kor', color: C.piros, r: 28 }, { k: 'kor', color: C.piros, r: 14 }, { k: 'kor', color: C.piros, r: 28 }, { k: 'kor', color: C.piros, r: 14 }, null]} />, options: [shp('kor', C.piros, { r: 32, say: 'nagy kör' }), shp('kor', C.piros, { r: 14, say: 'kis kör' }), shp('negyzet', C.piros, { r: 28, say: 'nagy négyzet' })], hint: 'Most a méret változik: nagy, kicsi, nagy, kicsi, és…' },
];

export const SIKIDOMOK_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Keresd meg az egyforma síkidomokat! Koppints bal oldalon egy formára, aztán jobb oldalon a párjára!',
    pairs: [
      { a: shp('kor', C.piros), b: shp('kor', C.kek, { say: 'kék kör' }) },
      { a: shp('haromszog', C.piros), b: shp('haromszog', C.kek, { say: 'kék háromszög' }) },
      { a: shp('negyzet', C.piros), b: shp('negyzet', C.kek, { say: 'kék négyzet' }) },
      { a: shp('teglalap', C.piros), b: shp('teglalap', C.kek, { say: 'kék téglalap' }) },
    ],
  },
  2: {
    say: 'Milyen alakú? Párosítsd a tárgyat a síkidommal!',
    pairs: [
      { a: thing('tanyer', 'tányér'), b: shp('kor', C.sarga) },
      { a: thing('ablak', 'ablak'), b: shp('negyzet', C.sarga) },
      { a: thing('ajto', 'ajtó'), b: shp('teglalap', C.sarga, { rot: 90 }) },
      { a: thing('zaszlocska', 'zászlócska'), b: shp('haromszog', C.sarga, { rot: 180 }) },
    ],
  },
  3: {
    say: 'Hány pálcika kell? Párosítsd a számmal!',
    pairs: [
      { a: sticks(['haromszog'], 'egy háromszög', 'w-16 h-14'), b: 3 },
      { a: sticks(['negyzet'], 'egy négyzet', 'w-16 h-14'), b: 4 },
      { a: sticks(['haromszog', 'haromszog'], 'két háromszög'), b: 6 },
      { a: sticks(['negyzet', 'haromszog'], 'egy négyzet és egy háromszög'), b: 7 },
    ],
  },
};

export const SIKIDOMOK_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Kör vagy háromszög? Tedd a jó zsákba!',
    bins: [
      { label: 'Kör', figure: <ShapeFig k="kor" color={C.piros} className="w-12 h-12" frame={false} />, say: 'kör' },
      { label: 'Háromszög', figure: <ShapeFig k="haromszog" color={C.sarga} className="w-12 h-12" frame={false} />, say: 'háromszög' },
    ],
    items: [
      { item: shp('kor', C.kek), bin: 0 },
      { item: shp('haromszog', C.kek), bin: 1 },
      { item: shp('kor', C.zold, { r: 14, say: 'kis kör' }), bin: 0 },
      { item: shp('derekszogu', C.piros), bin: 1 },
      { item: shp('kor', C.lila, { r: 32, say: 'nagy kör' }), bin: 0 },
      { item: shp('haromszog', C.narancs, { rot: 180, say: 'fejjel lefelé álló háromszög' }), bin: 1 },
      { item: shp('haromszog', C.zold, { r: 16, say: 'kis háromszög' }), bin: 1 },
    ],
  },
  2: {
    say: 'Négyzet, téglalap vagy háromszög? Tedd a jó zsákba!',
    bins: [
      { label: 'Négyzet', figure: <ShapeFig k="negyzet" color={C.kek} className="w-12 h-12" frame={false} />, say: 'négyzet' },
      { label: 'Téglalap', figure: <ShapeFig k="teglalap" color={C.zold} className="w-12 h-12" frame={false} />, say: 'téglalap' },
      { label: 'Háromszög', figure: <ShapeFig k="haromszog" color={C.sarga} className="w-12 h-12" frame={false} />, say: 'háromszög' },
    ],
    items: [
      { item: shp('negyzet', C.piros), bin: 0 },
      { item: shp('teglalap', C.piros), bin: 1 },
      { item: shp('haromszog', C.piros), bin: 2 },
      { item: shp('negyzet', C.lila, { rot: 45, say: 'ferdén álló négyzet' }), bin: 0 },
      { item: shp('teglalap', C.lila, { rot: 90, say: 'álló téglalap' }), bin: 1 },
      { item: shp('derekszogu', C.lila), bin: 2 },
      { item: shp('negyzet', C.narancs, { r: 16, say: 'kis négyzet' }), bin: 0 },
      { item: shp('teglalap', C.narancs, { r: 18, say: 'kis téglalap' }), bin: 1 },
    ],
  },
  3: {
    say: 'Lehet-e összehajtani úgy, hogy a két fele fedje egymást? Tedd a jó kosárba!',
    bins: [
      { label: 'Igen', figure: <svg viewBox="0 0 60 60" className="w-12 h-12"><path d="M30 52 C6 36 6 12 20 10 C26 9 30 14 30 18 C30 14 34 9 40 10 C54 12 54 36 30 52 Z" fill="#ef4444" /><path d="M30 6 V56" stroke="#1e293b" strokeWidth="3" strokeDasharray="5 4" /></svg>, say: 'igen, a két fele egyforma' },
      { label: 'Nem', figure: <svg viewBox="0 0 60 60" className="w-12 h-12"><path d="M18 54 V8 L48 18 L18 28" fill="#facc15" stroke="#a16207" strokeWidth="3" /></svg>, say: 'nem, a két fele más' },
    ],
    items: [
      { item: fold('sziv'), bin: 0 },
      { item: fold('auto'), bin: 1 },
      { item: fold('pillango'), bin: 0 },
      { item: fold('zaszlo'), bin: 1 },
      { item: fold('kor'), bin: 0 },
      { item: fold('derekszogu'), bin: 1 },
      { item: fold('level'), bin: 0 },
    ],
  },
};

export const SikidomokG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="2. Síkidomok"
    badge="1. OSZTÁLY • IV. GEOMETRIA • JÁTÉK"
    base="g1-geo-sikidomok"
    chapterId="geometria"
    questions={SIKIDOMOK_G1_QUESTIONS}
    pairs={SIKIDOMOK_G1_PAIRS}
    sort={SIKIDOMOK_G1_SORT}
    {...props}
  />
);

export default SikidomokG1Jatek;
