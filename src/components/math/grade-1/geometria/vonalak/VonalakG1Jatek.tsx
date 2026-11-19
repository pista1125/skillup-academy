import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { Potyi } from '../../shared/Potyi';
import {
  BeeSnailPathScene,
  DigitFig,
  DotsShapeScene,
  FenceScene,
  Hive,
  IconFig,
  LineFig,
  LineRowScene,
  StickFig,
  TangleScene,
  ThreadFig,
  drawing,
  line,
} from './VonalakG1Scenes';

const stick = { figure: <StickFig />, say: 'egyenes, mint a pálcika' };
const thread = { figure: <ThreadFig />, say: 'görbe, mint a fonal' };
const digit = (d: number, say: string) => ({ figure: <DigitFig d={d} />, say });
const big = (k: Parameters<typeof LineFig>[0]['k'], color?: string) => <LineFig k={k} color={color} className="w-56 h-auto mx-auto" />;

export const VONALAK_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – egyenes, görbe, nyitott, zárt felismerése
  { id: 'v1', level: 1, badge: 'Egyenes vonal', ask: 'Melyik vonal egyenes?', options: [line('egyenes'), line('hullam'), line('kanyar')], hint: 'Ez a vonal kanyarog. Keresd azt, amelyik sehol sem hajlik!' },
  { id: 'v2', level: 1, badge: 'Görbe vonal', ask: 'Melyik vonal görbe?', options: [line('iv', '#e11d48'), line('allo', '#e11d48'), line('ferde', '#e11d48')], hint: 'Ez a vonal egyenes, mint a pálcika. Keresd azt, amelyik hajlik!' },
  { id: 'v3', level: 1, badge: 'Egyenes vagy görbe', ask: 'Ez a vonal egyenes vagy görbe?', say: 'Nézd meg a vonalat! Egyenes, mint a pálcika, vagy görbe, mint a fonal?', scene: big('hullam', '#9333ea'), options: [thread, stick], hint: 'Fuss végig rajta az ujjaddal! Hajlik valahol?' },
  { id: 'v4', level: 1, badge: 'Zárt vonal', ask: 'Melyik vonal zárt?', say: 'Melyik vonal ér körbe? Melyik zárt?', options: [line('kor', '#16a34a'), line('nyitottkor', '#16a34a'), line('hullam', '#16a34a')], hint: 'Ott rés van, vagy a vonal nem ér vissza. Melyik ér körbe?' },
  { id: 'v5', level: 1, badge: 'Nyitott vonal', ask: 'Melyik vonal nyitott?', say: 'Melyik vonalon van rés? Melyik nyitott?', options: [line('nyitottharomszog', '#ea580c'), line('haromszog', '#ea580c'), line('kor', '#ea580c')], hint: 'Ez körbeér, ez zárt. Hol van rés?' },
  { id: 'v6', level: 1, badge: 'Egyenes vonal', ask: 'Kinek az útja egyenes?', scene: <BeeSnailPathScene />, options: [{ figure: <IconFig icon="meh" />, say: 'Zümi' }, { figure: <IconFig icon="csiga" />, say: 'Csigusz' }], hint: 'Csigusz útja kanyarog. Ki repül egyenesen?' },
  { id: 'v7', level: 1, badge: 'Pálcika és fonal', ask: 'Mivel raknád ki ezt a vonalat?', say: 'Ezt a vonalat pálcikával vagy fonallal raknád ki?', scene: big('ferde', '#a16207'), options: [stick, thread], hint: 'Ez a vonal nem hajlik. A pálcika sem hajlik.' },
  { id: 'v8', level: 1, badge: 'Pálcika és fonal', ask: 'Mivel raknád ki ezt a vonalat?', say: 'Ezt a kanyargós vonalat pálcikával vagy fonallal raknád ki?', scene: big('kanyar', '#db2777'), options: [thread, stick], hint: 'A pálcika nem tud kanyarodni. Mi hajlik?' },
  // 2. szint – számjegyek, rajzok, vonalkövetés
  { id: 'v9', level: 2, badge: 'Vonalak a számokban', ask: 'Melyik szám csak egyenes?', say: 'Melyik szám áll csak egyenes vonalakból?', options: [digit(4, 'négy'), digit(0, 'nulla'), digit(6, 'hat')], hint: 'Ebben a számban kanyar van. Melyiket raknád ki pálcikákból?' },
  { id: 'v10', level: 2, badge: 'Vonalak a számokban', ask: 'Melyik szám csak görbe?', say: 'Melyik szám áll csak görbe vonalból?', options: [digit(0, 'nulla'), digit(1, 'egy'), digit(7, 'hét')], hint: 'Ebben egyenes vonal van. Melyik kerek, mint egy tojás?' },
  { id: 'v11', level: 2, badge: 'Egyenes vonalak a rajzon', ask: 'Melyik rajz csak egyenes?', say: 'Melyik rajz áll csak egyenes vonalakból?', options: [drawing('kerites'), drawing('nap'), drawing('hold')], hint: 'Ezen görbe vonal is van. Melyiket raknád ki pálcikákból?' },
  { id: 'v12', level: 2, badge: 'Görbe vonalak a rajzon', ask: 'Melyik rajzon van görbe vonal?', options: [drawing('felho'), drawing('haz'), drawing('zaszlo')], hint: 'Ez a rajz csak egyenes vonalakból áll. Hol kanyarog a vonal?' },
  { id: 'v13', level: 2, badge: 'Vonal követése', ask: 'Hová vezet Zümi vonala?', say: 'Kövesd az ujjaddal Zümi vonalát! Hová vezet?', scene: <TangleScene />, options: [{ figure: <Hive />, say: 'a kaptárhoz' }, { figure: <IconFig icon="virag" />, say: 'a virághoz' }, { figure: <IconFig icon="level" />, say: 'a levélhez' }], hint: 'Ne ugorj át másik vonalra! A kereszteződésnél menj tovább a saját vonaladon.' },
  { id: 'v14', level: 2, badge: 'Vonal követése', ask: 'Hová vezet Csigusz vonala?', say: 'Kövesd az ujjaddal Csigusz vonalát! Hová vezet?', scene: <TangleScene />, options: [{ figure: <IconFig icon="level" />, say: 'a levélhez' }, { figure: <Hive />, say: 'a kaptárhoz' }, { figure: <IconFig icon="virag" />, say: 'a virághoz' }], hint: 'Lassan húzd az ujjad Csigusztól lefelé, és ne térj le!' },
  { id: 'v15', level: 2, badge: 'Nyitott vonal', ask: 'Hol tud bemászni Csigusz?', say: 'Melyik kerítésen tud bemászni Csigusz? Melyik nyitott?', options: [line('nyitottkor', '#92400e', 'nyitott kerítés'), line('kor', '#92400e', 'zárt kerítés'), line('tojas', '#92400e', 'zárt tojás alakú kerítés')], hint: 'Ez a kerítés körbeér. Hol van rés?' },
  { id: 'v16', level: 2, badge: 'Zárt forma', ask: 'Hány vonal hiányzik még?', say: 'Pötyi összeköti a pontokat. Hány vonal hiányzik még, hogy zárt legyen?', scene: <DotsShapeScene pts={[[140, 40], [340, 40], [340, 190], [140, 190]]} drawn={3} />, options: [1, 2, 3], hint: 'Számold meg a szaggatott vonalakat!' },
  // 3. szint – számlálás, többféle tulajdonság
  { id: 'v17', level: 3, badge: 'Egyenesek számlálása', ask: 'Hány egyenes vonal van?', say: 'Számold meg, hány egyenes vonal van a képen!', scene: <LineRowScene kinds={['egyenes', 'hullam', 'allo', 'iv', 'ferde']} />, options: [3, 5, 2], hint: 'A görbéket ne számold! Csak azokat, amelyek nem hajlanak.' },
  { id: 'v18', level: 3, badge: 'Görbék számlálása', ask: 'Hány görbe vonal van?', say: 'Számold meg, hány görbe vonal van a képen!', scene: <LineRowScene kinds={['hullam', 'egyenes', 'iv', 'allo', 'kanyar']} color="#e11d48" />, options: [3, 2, 5], hint: 'Az egyeneseket ne számold! Csak a kanyargósakat.' },
  { id: 'v19', level: 3, badge: 'Zárt vonalak számlálása', ask: 'Hány zárt vonal van?', say: 'Számold meg, hány zárt vonal van a képen!', scene: <LineRowScene kinds={['kor', 'nyitottkor', 'negyzet', 'iv', 'haromszog']} color="#16a34a" />, options: [3, 2, 5], hint: 'Ahol rés van, az nyitott. Csak azokat számold, amelyek körbeérnek!' },
  { id: 'v20', level: 3, badge: 'Nyitott vonal', ask: 'Melyik NEM zárt?', say: 'Három vonal zárt. Melyik nem az?', options: [line('nyitottpaca', '#9333ea'), line('kor', '#9333ea'), line('haz', '#9333ea'), line('tojas', '#9333ea')], hint: 'Fuss végig mindegyiken! Melyiknél nem érsz vissza?' },
  { id: 'v21', level: 3, badge: 'Vonalak a számokban', ask: 'Melyikben van egyenes és görbe is?', say: 'Melyik számban van egyenes vonal és görbe vonal is?', options: [digit(2, 'kettő'), digit(1, 'egy'), digit(0, 'nulla')], hint: 'Az egyikben csak egyenes, a másikban csak görbe van. Melyikben van mindkettő?' },
  { id: 'v22', level: 3, badge: 'Melyik nem illik', ask: 'Melyik nem illik a többi közé?', say: 'Három zárt vonal görbe. Melyik nem illik közéjük?', options: [line('haromszog'), line('kor'), line('tojas'), line('paca')], hint: 'A többiben nincs egyenes vonal. Melyikben van?' },
  { id: 'v23', level: 3, badge: 'Zárt és egyenes', ask: 'Melyik zárt és csak egyenes?', say: 'Melyik vonal zárt, és csak egyenes vonalakból áll?', options: [line('negyzet', '#ea580c'), line('kor', '#ea580c'), line('nyitottnegyzet', '#ea580c')], hint: 'Az egyik görbe, a másikon rés van. Melyik jó mindkettőre?' },
  { id: 'v24', level: 3, badge: 'Vonal követése', ask: 'Kinek a vonala vezet a virághoz?', say: 'Kövesd visszafelé a vonalat a virágtól! Ki indult onnan?', scene: <TangleScene />, options: [{ figure: <Potyi className="w-20 h-20" />, say: 'Pötyi' }, { figure: <IconFig icon="meh" />, say: 'Zümi' }, { figure: <IconFig icon="csiga" />, say: 'Csigusz' }], hint: 'Indulj a virágtól, és húzd az ujjad felfelé a vonalon!' },
];

export const VONALAK_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Keresd meg az egyforma vonalakat! Koppints bal oldalon egy vonalra, aztán jobb oldalon a párjára!',
    pairs: [
      { a: line('egyenes'), b: line('egyenes', '#e11d48', 'piros egyenes vonal') },
      { a: line('hullam'), b: line('hullam', '#e11d48', 'piros hullámos vonal') },
      { a: line('kor'), b: line('kor', '#e11d48', 'piros kör') },
      { a: line('csigavonal'), b: line('csigavonal', '#e11d48', 'piros csigavonal') },
    ],
  },
  2: {
    say: 'Zárd be a vonalat! Melyik zárt vonal lesz belőle?',
    pairs: [
      { a: line('nyitottkor', '#92400e'), b: line('kor', '#16a34a', 'zárt kör') },
      { a: line('nyitottharomszog', '#92400e'), b: line('haromszog', '#16a34a', 'zárt háromszög') },
      { a: line('nyitottnegyzet', '#92400e'), b: line('negyzet', '#16a34a', 'zárt négyzet') },
      { a: line('nyitottpaca', '#92400e'), b: line('paca', '#16a34a', 'zárt paca') },
    ],
  },
  3: {
    say: 'Hány egyenes vonal van a képen? Párosítsd a számmal!',
    pairs: [
      { a: { figure: <LineRowScene kinds={['egyenes', 'hullam']} className="w-28 h-16" />, say: 'egy egyenes, egy görbe' }, b: 1 },
      { a: { figure: <LineRowScene kinds={['allo', 'iv', 'ferde']} className="w-32 h-16" />, say: 'két egyenes, egy görbe' }, b: 2 },
      { a: { figure: <LineRowScene kinds={['egyenes', 'allo', 'kanyar', 'ferde']} className="w-36 h-16" />, say: 'három egyenes, egy görbe' }, b: 3 },
      { a: { figure: <LineRowScene kinds={['iv', 'hullam']} className="w-28 h-16" />, say: 'két görbe vonal' }, b: 0 },
    ],
  },
};

export const VONALAK_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Egyenes vagy görbe? Az egyenes a pálcikás kosárba, a görbe a fonalas kosárba kerül.',
    bins: [
      { label: 'Egyenes', figure: <StickFig className="w-14 h-10" />, say: 'egyenes' },
      { label: 'Görbe', figure: <ThreadFig className="w-14 h-10" />, say: 'görbe' },
    ],
    items: [
      { item: line('egyenes'), bin: 0 },
      { item: line('hullam'), bin: 1 },
      { item: line('ferde'), bin: 0 },
      { item: line('iv'), bin: 1 },
      { item: line('allo'), bin: 0 },
      { item: line('kanyar'), bin: 1 },
      { item: line('csigavonal'), bin: 1 },
    ],
  },
  2: {
    say: 'Nyitott vagy zárt? Tedd a jó kosárba!',
    bins: [
      { label: 'Nyitott', figure: <LineFig k="nyitottkor" className="w-14 h-10" frame={false} />, say: 'nyitott' },
      { label: 'Zárt', figure: <LineFig k="kor" className="w-14 h-10" frame={false} />, say: 'zárt' },
    ],
    items: [
      { item: line('kor', '#16a34a'), bin: 1 },
      { item: line('nyitottkor', '#16a34a'), bin: 0 },
      { item: line('haromszog', '#16a34a'), bin: 1 },
      { item: line('nyitottharomszog', '#16a34a'), bin: 0 },
      { item: line('paca', '#16a34a'), bin: 1 },
      { item: line('hullam', '#16a34a'), bin: 0 },
      { item: line('negyzet', '#16a34a'), bin: 1 },
      { item: line('nyitottnegyzet', '#16a34a'), bin: 0 },
    ],
  },
  3: {
    say: 'Milyen vonalakból áll a szám? Csak egyenesből, csak görbéből, vagy mindkettőből?',
    bins: [
      { label: 'Egyenes', figure: <StickFig className="w-14 h-10" />, say: 'csak egyenes' },
      { label: 'Görbe', figure: <ThreadFig className="w-14 h-10" />, say: 'csak görbe' },
      { label: 'Mindkettő', figure: <svg viewBox="0 0 80 50" className="w-16 h-10"><path d="M6 40 L34 10" stroke="#a16207" strokeWidth="7" strokeLinecap="round" /><path d="M44 30 C52 4 62 46 74 16" fill="none" stroke="#db2777" strokeWidth="5" strokeLinecap="round" /></svg>, say: 'egyenes és görbe is' },
    ],
    items: [
      { item: digit(1, 'egy'), bin: 0 },
      { item: digit(0, 'nulla'), bin: 1 },
      { item: digit(4, 'négy'), bin: 0 },
      { item: digit(3, 'három'), bin: 1 },
      { item: digit(2, 'kettő'), bin: 2 },
      { item: digit(7, 'hét'), bin: 0 },
      { item: digit(8, 'nyolc'), bin: 1 },
      { item: digit(5, 'öt'), bin: 2 },
    ],
  },
};

export const VonalakG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="1. Vonalak"
    badge="1. OSZTÁLY • IV. GEOMETRIA • JÁTÉK"
    base="g1-geo-vonalak"
    chapterId="geometria"
    questions={VONALAK_G1_QUESTIONS}
    pairs={VONALAK_G1_PAIRS}
    sort={VONALAK_G1_SORT}
    {...props}
  />
);

export default VonalakG1Jatek;
