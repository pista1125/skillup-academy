import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { BuildScene, ColorDot, CubeTrain, MiniStair, PairPic, PatternLyingScene, PatternScene, RodPic, RodsCompare, SlotScene, StairScene, fitOpt, rodName, rodOpt } from './SzinesrudKeszletG1Scenes';

const stairOpt = (order: number[]) => ({ figure: <MiniStair order={order} />, say: order.map(rodName).join(', ') });
const pairOpt = (top: number[], bottom: number[], say: string) => ({ figure: <PairPic top={top} bottom={bottom} />, say });

export const SZINESRUD_KESZLET_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – színek, hosszabb, rövidebb
  { id: 'r1', level: 1, badge: 'Hosszabb, rövidebb', ask: 'Melyik a leghosszabb?', options: [rodOpt(10), rodOpt(6), rodOpt(3)], hint: 'Nézd meg, melyik ér a legmesszebbre!' },
  { id: 'r2', level: 1, badge: 'Hosszabb, rövidebb', ask: 'Melyik a legrövidebb?', options: [rodOpt(2, 8), rodOpt(5, 8), rodOpt(8, 8)], hint: 'Ez hosszabb. Keresd azt, amelyik a leghamarabb véget ér!' },
  { id: 'r3', level: 1, badge: 'Színek', ask: 'Hol van a sárga rúd?', say: 'Koppints a sárga rúdra!', options: [rodOpt(5, 6), rodOpt(4, 6), rodOpt(6, 6)], hint: 'Ez nem sárga. A sárga olyan, mint a napocska.' },
  { id: 'r4', level: 1, badge: 'Színek', ask: 'Hol van a fekete rúd?', say: 'Koppints a fekete rúdra!', options: [rodOpt(7, 9), rodOpt(9, 9), rodOpt(4, 9)], hint: 'Ez nem fekete. A fekete olyan sötét, mint az éjszaka.' },
  { id: 'r5', level: 1, badge: 'Színek', ask: 'Hol a kis fehér kocka?', say: 'Hol van a kis fehér kocka? Koppints rá!', options: [rodOpt(1, 3), rodOpt(2, 3), rodOpt(3, 3)], hint: 'A fehér kocka a legkisebb darab a dobozban.' },
  { id: 'r6', level: 1, badge: 'Hosszabb, rövidebb', ask: 'Melyik hosszabb?', say: 'A piros vagy a világoskék rúd hosszabb?', scene: <RodsCompare lens={[4, 3]} />, options: [rodOpt(4, 4), rodOpt(3, 4)], hint: 'Tedd egymás mellé őket a fejedben! Melyik lóg túl?' },
  { id: 'r7', level: 1, badge: 'Hosszabb, rövidebb', ask: 'Melyik rövidebb?', say: 'A lila vagy a kék rúd rövidebb?', scene: <RodsCompare lens={[9, 6]} />, options: [rodOpt(6, 9), rodOpt(9, 9)], hint: 'Ez a hosszabb. A rövidebb hamarabb véget ér.' },
  { id: 'r8', level: 1, badge: 'Színek', ask: 'Hol a narancssárga rúd?', say: 'Koppints a narancssárga rúdra! Ez a leghosszabb rúd a dobozban.', options: [rodOpt(10), rodOpt(4), rodOpt(5)], hint: 'Ez nem narancssárga. Olyan színű, mint a narancs, és nagyon hosszú.' },
  // 2. szint – lépcső, sorozat, építés
  { id: 'r9', level: 2, badge: 'Lépcső', ask: 'Melyik rúd hiányzik?', say: 'Egy rúd kiesett a lépcsőből. Melyik fér pontosan a helyére?', scene: <StairScene missing={3} />, options: [fitOpt(3, 3), fitOpt(3, 2), fitOpt(3, 4)], hint: 'Ez kilóg, vagy marad üres hely. Keresd a pont akkorát!' },
  { id: 'r10', level: 2, badge: 'Lépcső', ask: 'Melyik rúd hiányzik?', say: 'Melyik rúd fér pontosan a lépcső üres helyére?', scene: <StairScene missing={8} />, options: [fitOpt(8, 8), fitOpt(8, 7), fitOpt(8, 9)], hint: 'Fölötte egy kicsit rövidebb, alatta egy kicsit hosszabb rúd van.' },
  { id: 'r11', level: 2, badge: 'Sorozat', ask: 'Mi jön ezután?', say: 'Fehér, fehér, lila, fehér, fehér. Mi jön ezután?', scene: <PatternScene seq={[1, 1, 6, 1, 1]} />, options: [rodOpt(6, 6), rodOpt(1, 6)], hint: 'Két fehér után mindig egy lila jön.' },
  { id: 'r12', level: 2, badge: 'Sorozat', ask: 'Mi jön ezután?', say: 'Piros, fehér, világoskék, világoskék, piros. Mi jön ezután?', scene: <PatternLyingScene seq={[4, 1, 3, 3, 4]} />, options: [rodOpt(1, 4), rodOpt(3, 4), rodOpt(4, 4)], hint: 'Nézd az elejét: a piros után mi jött?' },
  { id: 'r13', level: 2, badge: 'Építés', ask: 'Melyik rúd kell a padra?', say: 'Pötyi padot épít. Melyik rúd fér pontosan a lábak tetejére?', scene: <BuildScene variant="bench" />, options: [fitOpt(6, 6), fitOpt(6, 5), fitOpt(6, 7)], hint: 'Ez kilóg, vagy nem elég hosszú. A pont jó kell!' },
  { id: 'r14', level: 2, badge: 'Építés', ask: 'Mi kell a torony tetejére?', say: 'Melyik rúd fér a torony tetején a szaggatott helyre?', scene: <BuildScene variant="tower" />, options: [fitOpt(3, 3), fitOpt(3, 1), fitOpt(3, 4)], hint: 'A torony fölfelé mindig keskenyebb. Pont akkora kell, mint a hely.' },
  { id: 'r15', level: 2, badge: 'Ugyanolyan hosszú', ask: 'Melyik olyan hosszú, mint a rózsaszín?', say: 'Fent a rózsaszín rúd van. Hány fehér kocka olyan hosszú, mint ő? Melyik képen egyforma hosszú a két sor?', options: [pairOpt([2], [1, 1], 'két fehér kocka'), pairOpt([2], [1, 1, 1], 'három fehér kocka'), pairOpt([2], [1], 'egy fehér kocka')], hint: 'Nézd meg a két sor végét! Ugyanott érjen véget.' },
  { id: 'r16', level: 2, badge: 'Lépcső', ask: 'Melyik lépcső jó?', say: 'Melyik lépcső jó? Fölfelé mindig rövidebb rúd jön.', options: [stairOpt([1, 2, 3]), stairOpt([1, 3, 2]), stairOpt([2, 1, 3])], hint: 'Itt a rudak össze vannak keverve. Fölfelé egyre rövidebb legyen!' },
  // 3. szint – találós, vonatok, nehezebb sorozat
  { id: 'r17', level: 3, badge: 'Találós', ask: 'Rövidebb a világoskéknél, de nem a legrövidebb.', say: 'Gondoltam egy rúdra. Rövidebb, mint a világoskék rúd, de nem a legrövidebb. Melyik az?', options: [rodOpt(2, 3), rodOpt(1, 3), rodOpt(3, 3)], hint: 'A fehér a legrövidebb, az nem lehet.' },
  { id: 'r18', level: 3, badge: 'Találós', ask: 'Hosszabb a barnánál, rövidebb a narancsnál.', say: 'Gondoltam egy rúdra. Hosszabb, mint a barna rúd, de rövidebb, mint a narancssárga. Melyik az?', scene: <StairScene />, options: [rodOpt(9), rodOpt(7), rodOpt(10)], hint: 'Nézd a lépcsőt: a barna és a narancssárga között melyik van?' },
  { id: 'r19', level: 3, badge: 'Találós', ask: 'Hosszabb a sárgánál, rövidebb a feketénél.', say: 'Gondoltam egy rúdra. Hosszabb, mint a sárga, de rövidebb, mint a fekete. Melyik az?', scene: <StairScene />, options: [rodOpt(6, 8), rodOpt(4, 8), rodOpt(8, 8)], hint: 'Nézd a lépcsőt: a sárga és a fekete között melyik rúd van?' },
  { id: 'r20', level: 3, badge: 'Ugyanolyan hosszú', ask: 'Mi olyan hosszú, mint két rózsaszín?', say: 'Fent két rózsaszín rúd van egymás után. Melyik rúd olyan hosszú, mint ők együtt?', options: [pairOpt([2, 2], [4], 'piros rúd'), pairOpt([2, 2], [3], 'világoskék rúd'), pairOpt([2, 2], [5], 'sárga rúd')], hint: 'Ez rövidebb vagy hosszabb. A két sor ugyanott érjen véget!' },
  { id: 'r21', level: 3, badge: 'Ugyanolyan hosszú', ask: 'Melyik vonat olyan hosszú, mint a sárga?', say: 'Fent a sárga rúd van. Melyik két rúd olyan hosszú együtt, mint a sárga?', options: [pairOpt([5], [4, 1], 'piros és fehér'), pairOpt([5], [3, 1], 'világoskék és fehér'), pairOpt([5], [4, 2], 'piros és rózsaszín')], hint: 'Ez a vonat rövidebb vagy kilóg. Keresd a pont egyformát!' },
  { id: 'r22', level: 3, badge: 'Sorozat', ask: 'Mi jön ezután?', say: 'Fehér, rózsaszín, világoskék, fehér, rózsaszín. Mi jön ezután?', scene: <PatternScene seq={[1, 2, 3, 1, 2]} />, options: [rodOpt(3, 3), rodOpt(1, 3), rodOpt(2, 3)], hint: 'Nézd az elejét: fehér, rózsaszín, és utána?' },
  { id: 'r23', level: 3, badge: 'Lépcső', ask: 'Mi kerül a lila alá?', say: 'A lépcsőben minden rúd alatt egy kicsit hosszabb van. Melyik rúd kerül a lila alá?', scene: <StairScene upTo={7} missing={7} />, options: [rodOpt(7, 9), rodOpt(5, 9), rodOpt(9, 9)], hint: 'A lila alá egy kicsit hosszabb kell, nem sokkal hosszabb.' },
  { id: 'r24', level: 3, badge: 'Ugyanolyan hosszú', ask: 'Melyik vonat olyan hosszú, mint a lila?', say: 'Fent a lila rúd van. Melyik két rúd olyan hosszú együtt, mint a lila?', options: [pairOpt([6], [3, 3], 'két világoskék'), pairOpt([6], [3, 2], 'világoskék és rózsaszín'), pairOpt([6], [4, 3], 'piros és világoskék')], hint: 'Nézd a sorok végét! Ugyanott érjenek véget.' },
];

const rodCard = (len: number, maxLen = 10) => ({ figure: <RodPic len={len} maxLen={maxLen} className="w-full h-auto" />, say: `${rodName(len)} rúd` });

export const SZINESRUD_KESZLET_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Koppints bal oldalon egy rúdra, aztán jobb oldalon a színére!',
    pairs: [4, 5, 3, 7].map((l) => ({ a: rodCard(l, 7), b: { figure: <ColorDot len={l} />, say: `${rodName(l)} szín` } })),
  },
  2: {
    say: 'Melyik rúd melyik helyre fér pontosan? Párosítsd!',
    pairs: [2, 5, 8, 10].map((l) => ({ a: rodCard(l), b: { figure: <SlotScene len={l} />, say: `hely a ${rodName(l)} rúdnak` } })),
  },
  3: {
    say: 'Hány fehér kocka olyan hosszú, mint a rúd? Párosítsd a rudat a kockasorral!',
    pairs: [2, 3, 4, 5].map((l) => ({ a: rodCard(l, 5), b: { figure: <CubeTrain n={l} maxLen={5} />, say: `${['', 'egy', 'két', 'három', 'négy', 'öt'][l]} fehér kocka` } })),
  },
};

export const SZINESRUD_KESZLET_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Rövid vagy hosszú a rúd? Tedd a jó kosárba!',
    bins: [
      { label: 'Rövid', figure: <RodPic len={1} maxLen={1} className="w-8 h-8" />, say: 'rövid' },
      { label: 'Hosszú', figure: <RodPic len={10} maxLen={10} className="w-28 h-auto" />, say: 'hosszú' },
    ],
    items: [1, 2, 3, 8, 9, 10].map((l) => ({ item: rodCard(l), bin: l <= 3 ? 0 : 1 })),
  },
  2: {
    say: 'Fent mindig a sárga rúd van. Rövidebb vagy hosszabb nála a lenti rúd?',
    bins: [
      { label: 'Rövidebb', say: 'rövidebb, mint a sárga' },
      { label: 'Hosszabb', say: 'hosszabb, mint a sárga' },
    ],
    items: [1, 2, 3, 4, 6, 7, 8, 9, 10].map((l) => ({ item: { figure: <PairPic top={[5]} bottom={[l]} />, say: `${rodName(l)} rúd` }, bin: l < 5 ? 0 : 1 })),
  },
  3: {
    say: 'Fent mindig a piros rúd van. A lenti sor rövidebb, ugyanolyan hosszú, vagy hosszabb?',
    bins: [
      { label: 'Rövidebb', say: 'rövidebb, mint a piros' },
      { label: 'Ugyanolyan', say: 'ugyanolyan hosszú, mint a piros' },
      { label: 'Hosszabb', say: 'hosszabb, mint a piros' },
    ],
    items: [
      { item: pairOpt([4], [2], 'rózsaszín rúd'), bin: 0 },
      { item: pairOpt([4], [3], 'világoskék rúd'), bin: 0 },
      { item: pairOpt([4], [1, 1], 'két fehér kocka'), bin: 0 },
      { item: pairOpt([4], [2, 2], 'két rózsaszín'), bin: 1 },
      { item: pairOpt([4], [1, 1, 1, 1], 'négy fehér kocka'), bin: 1 },
      { item: pairOpt([4], [3, 1], 'világoskék és fehér'), bin: 1 },
      { item: pairOpt([4], [6], 'lila rúd'), bin: 2 },
      { item: pairOpt([4], [9], 'kék rúd'), bin: 2 },
      { item: pairOpt([4], [3, 2], 'világoskék és rózsaszín'), bin: 2 },
    ],
  },
};

export const SzinesrudKeszletG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="5. Színesrúd-készlet"
    badge="1. OSZTÁLY • I. ELŐKÉSZÍTŐ IDŐSZAK • JÁTÉK"
    base="g1-prep-szinesrud-keszlet"
    chapterId="elokeszito-idoszak"
    questions={SZINESRUD_KESZLET_G1_QUESTIONS}
    pairs={SZINESRUD_KESZLET_G1_PAIRS}
    sort={SZINESRUD_KESZLET_G1_SORT}
    {...props}
  />
);

export default SzinesrudKeszletG1Jatek;
