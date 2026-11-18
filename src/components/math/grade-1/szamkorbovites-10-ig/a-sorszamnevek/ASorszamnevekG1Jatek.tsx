import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { BigSign } from '../../shared/G1Pics';
import { EqCard } from '../a-nyolc/ANyolcG1Scenes';
import { COLORS, XPIC, XPicName } from '../a-kilenc/AKilencG1Scenes';
import {
  ANIMAL_QUEUE,
  GARLAND,
  GarlandScene,
  OrdinalStrip,
  PodiumScene,
  RacerPic,
  SLEDS9,
  SledPic,
  StartQueue,
  StickPic,
  StickPile,
  TOWER,
  TowerScene,
  ord,
} from './ASorszamnevekG1Scenes';

const sm = (node: React.ReactNode, say: string) => ({ figure: node, say });
const sleds = SLEDS9.map((c) => ({ icon: 'szanko' as const, color: COLORS[c] }));
const sled = (pos: number, name: string) => sm(<SledPic color={COLORS[SLEDS9[pos - 1]]} />, `${name} szánkó`);
const racer = (who: 'potyi' | 'zumi' | 'csigusz') => sm(<RacerPic who={who} />, who === 'potyi' ? 'Pötyi' : who === 'zumi' ? 'Zümi' : 'Csigusz');
const pic = (icon: XPicName, say: string) =>
  sm(
    <svg viewBox="0 0 100 90" className="w-24 h-auto">
      <rect x="3" y="3" width="94" height="84" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      {XPIC(icon)({ x: 50, y: 46, s: 1.5 })}
    </svg>,
    say
  );
const strip = (k: number, mode: 'count' | 'place', n = 5, icon: XPicName = 'disz', color?: string) =>
  sm(<OrdinalStrip n={n} k={k} mode={mode} icon={icon} color={color} className="w-40 h-auto" />, mode === 'count' ? `${k} színes` : 'egy színes');
const PODIUM = <PodiumScene order={['csigusz', 'zumi', 'potyi']} />;

export const A_SORSZAMNEVEK_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – első, második, harmadik; a pont jelentése
  { id: 'o1', level: 1, badge: 'Első', ask: 'Ki lett az első?', say: 'Nézd a dobogót! Ki lett az első?', scene: PODIUM, options: [racer('csigusz'), racer('zumi'), racer('potyi')], hint: 'Keresd az 1 és pont jelet a dobogón!' },
  { id: 'o2', level: 1, badge: 'Harmadik', ask: 'Ki lett a harmadik?', say: 'Nézd a dobogót! Ki lett a harmadik?', scene: PODIUM, options: [racer('potyi'), racer('csigusz'), racer('zumi')], hint: 'Keresd a 3 és pont jelet a dobogón!' },
  { id: 'o3', level: 1, badge: 'Első', ask: 'Melyik szánkó az első?', say: 'Három szánkó áll sorban. Melyik az első? Az első a zászlóhoz legközelebb áll.', scene: <StartQueue items={[{ icon: 'szanko', color: COLORS[0] }, { icon: 'szanko', color: COLORS[1] }, { icon: 'szanko', color: COLORS[4] }]} />, options: [sm(<SledPic color={COLORS[0]} />, 'piros szánkó'), sm(<SledPic color={COLORS[1]} />, 'kék szánkó'), sm(<SledPic color={COLORS[4]} />, 'zöld szánkó')], hint: 'Az első az, amelyik a zászlóhoz a legközelebb áll.' },
  { id: 'o4', level: 1, badge: 'Jelölés', ask: 'Melyik jelenti: harmadik?', say: 'Melyik jelenti azt, hogy harmadik?', options: [ord(3), { label: '3', say: 'három' }, ord(4)], hint: 'A sorszám után pontot teszünk.' },
  { id: 'o5', level: 1, badge: 'Kilenc vagy kilencedik', ask: 'Hol van kiszínezve a 9. dísz?', say: 'Hol van kiszínezve a kilencedik dísz?', options: [sm(<OrdinalStrip k={9} mode="place" />, 'csak egy színes dísz'), sm(<OrdinalStrip k={9} mode="count" />, 'kilenc színes dísz')], hint: 'A kilencedik csak egy dísz: az utolsó a sorban.' },
  { id: 'o6', level: 1, badge: 'Hányadik?', ask: 'Hányadik dísz piros?', say: 'Balról számolj, a zöld nyílnál kezdd! Hányadik dísz piros?', scene: <OrdinalStrip n={5} k={2} mode="place" />, options: [ord(2), ord(3), ord(1)], hint: 'A nyílnál kezdd: első, második… Melyiknél tartasz, amikor a piroshoz érsz?' },
  { id: 'o7', level: 1, badge: 'Szintek', ask: 'Ki lakik az 1. szinten?', say: 'A toronyház szintjeit alulról számoljuk. Ki lakik az első szinten?', scene: <TowerScene residents={TOWER} />, options: [racer('csigusz'), racer('potyi'), racer('zumi')], hint: 'Az első szint a legalsó.' },
  { id: 'o8', level: 1, badge: 'Hányadik?', ask: 'Mi van az 1. zsákban?', say: 'Mi van az első zsákban?', scene: <GarlandScene items={GARLAND} />, options: [pic('toboz', 'toboz'), pic('ajandek', 'ajándék'), pic('csengo', 'csengő')], hint: 'Keresd az 1 és pont jelet! Mi van azon a zsákon?' },
  // 2. szint – hosszabb sor, 9-ig
  { id: 'o9', level: 2, badge: 'Hányadik?', ask: 'Hányadik a piros szánkó?', say: 'Hányadik a sorban a piros szánkó? A zászlónál kezdd!', scene: <StartQueue items={sleds} />, options: [ord(4), ord(3), ord(5)], hint: 'A zászlónál kezdd: első, második, harmadik… Mutass rá mindegyikre!' },
  { id: 'o10', level: 2, badge: 'Hányadik?', ask: 'Melyik szánkó az 5.?', say: 'Melyik szánkó áll az ötödik helyen? A zászlónál kezdd!', scene: <StartQueue items={sleds} />, options: [sled(5, 'lila'), sled(4, 'piros'), sled(6, 'narancssárga')], hint: 'Számolj a zászlótól: első, második… egészen az ötödikig!' },
  { id: 'o11', level: 2, badge: 'Jelölés', ask: 'Hányadik zsákban van a csengő?', say: 'Hányadik zsákban van a csengő?', scene: <GarlandScene items={GARLAND} />, options: [ord(6), ord(5), ord(7)], hint: 'Keresd meg a csengőt, aztán nézd meg a fölötte lévő számot!' },
  { id: 'o12', level: 2, badge: 'Szintek', ask: 'Ki lakik a 4. szinten?', say: 'Alulról számolj! Ki lakik a negyedik szinten?', scene: <TowerScene residents={TOWER} />, options: [pic('madar', 'madár'), racer('potyi'), pic('pillango', 'pillangó')], hint: 'Alulról számolj: első, második, harmadik, negyedik!' },
  { id: 'o13', level: 2, badge: 'Öt vagy ötödik', ask: 'Hol van kiszínezve 5 dísz?', say: 'Hol van kiszínezve öt dísz? Vigyázz: öt dísz, nem az ötödik!', options: [sm(<OrdinalStrip k={5} mode="count" />, 'öt színes dísz'), sm(<OrdinalStrip k={5} mode="place" />, 'egy színes dísz')], hint: 'Öt dísz: számold meg a színes díszeket! Ötnek kell lennie.' },
  { id: 'o14', level: 2, badge: 'Utolsó', ask: 'Ki az utolsó a sorban?', say: 'A barátok sorban állnak a forró teáért. Az első a zászlónál áll. Ki az utolsó?', scene: <StartQueue items={ANIMAL_QUEUE} />, options: [racer('csigusz'), racer('zumi'), pic('pillango', 'pillangó')], hint: 'Az utolsó a zászlótól a legmesszebb áll, a sor végén.' },
  { id: 'o15', level: 2, badge: 'Hányadik?', ask: 'Hányadik Pötyi a sorban?', say: 'Hányadik Pötyi a sorban? A zászlónál kezdd!', scene: <StartQueue items={ANIMAL_QUEUE} />, options: [ord(3), ord(2), ord(4)], hint: 'A zászlónál kezdd: első Zümi, aztán jön a második…' },
  { id: 'o16', level: 2, badge: 'Között', ask: 'Melyik áll a 2. és a 4. között?', say: 'Melyik szánkó áll a második és a negyedik között?', scene: <StartQueue items={sleds} labels />, options: [sled(3, 'sárga'), sled(2, 'zöld'), sled(4, 'piros')], hint: 'A második és a negyedik között a harmadik áll.' },
  // 3. szint – két lépés, kis történetek
  { id: 'o17', level: 3, badge: 'Kis történet', ask: 'Hányadik lett Csigusz?', say: 'Csigusz a harmadik volt. Aztán megelőzött egy szánkót. Hányadik lett?', scene: <StartQueue items={[{ icon: 'szanko', color: COLORS[0] }, { icon: 'szanko', color: COLORS[1] }, { icon: 'csiga' }, { icon: 'szanko', color: COLORS[4] }]} labels />, options: [ord(2), ord(4), ord(3)], hint: 'Ha megelőz valakit, előrébb kerül, közelebb a zászlóhoz.' },
  { id: 'o18', level: 3, badge: 'Előtte', ask: 'Hányan állnak Csigusz előtt?', say: 'Csigusz az ötödik a sorban. Hányan állnak előtte?', scene: <StartQueue items={ANIMAL_QUEUE} />, options: [4, 5, 3], hint: 'Számold meg, hányan vannak Csigusz és a zászló között! Csiguszt ne számold.' },
  { id: 'o19', level: 3, badge: 'Sorszámok sorban', ask: 'Melyik hiányzik?', say: 'Első, második, harmadik, kérdőjel, ötödik. Melyik hiányzik?', scene: <EqCard text="1. 2. 3. ? 5." />, options: [ord(4), { label: '4', say: 'négy' }, ord(6)], hint: 'A harmadik után melyik jön? És ne felejtsd el a pontot!' },
  { id: 'o20', level: 3, badge: 'Jelölés', ask: 'Hányadik zsákban van az ajándék?', say: 'Hányadik zsákban van az ajándék?', scene: <GarlandScene items={GARLAND} />, options: [ord(9), ord(8), ord(1)], hint: 'Keresd meg az ajándékot! Melyik szám van fölötte?' },
  { id: 'o21', level: 3, badge: 'Utolsó', ask: 'Hányadik az utolsó szánkó?', say: 'Hét szánkó áll sorban. Hányadik az utolsó?', scene: <StartQueue items={sleds.slice(0, 7)} />, options: [ord(7), ord(6), ord(8)], hint: 'Számold meg a szánkókat a zászlótól a sor végéig!' },
  { id: 'o22', level: 3, badge: 'Fölötte', ask: 'Ki lakik közvetlenül Pötyi fölött?', say: 'Pötyi a harmadik szinten lakik. Ki lakik közvetlenül fölötte?', scene: <TowerScene residents={TOWER} />, options: [pic('madar', 'madár'), racer('zumi'), pic('pillango', 'pillangó')], hint: 'Fölötte: eggyel feljebb, a negyedik szinten.' },
  { id: 'o23', level: 3, badge: 'Mögötte', ask: 'Melyik áll közvetlenül a piros mögött?', say: 'Melyik szánkó áll közvetlenül a piros szánkó mögött?', scene: <StartQueue items={sleds} />, options: [sled(5, 'lila'), sled(3, 'sárga'), sled(6, 'narancssárga')], hint: 'Mögötte: a piros után jön, egy hellyel messzebb a zászlótól.' },
  { id: 'o24', level: 3, badge: 'Pálcikák', ask: 'Melyik pálcikát veszed fel elsőként?', say: 'Úgy kell felvenni a pálcikákat, hogy a többi meg se mozduljon. Melyiket veszed fel elsőként?', scene: <StickPile colors={['#facc15', '#22c55e', '#ef4444']} />, options: [sm(<StickPic color="#ef4444" />, 'piros pálcika'), sm(<StickPic color="#22c55e" />, 'zöld pálcika'), sm(<StickPic color="#facc15" />, 'sárga pálcika')], hint: 'Azt veheted fel először, amelyik legfelül van, és semmi sincs rajta.' },
];

export const A_SORSZAMNEVEK_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Melyik dísz színes? Balról számolj, a zöld nyílnál kezdd!',
    pairs: [
      { a: { ...strip(1, 'place'), say: 'díszek' }, b: ord(1) },
      { a: { ...strip(2, 'place'), say: 'díszek' }, b: ord(2) },
      { a: { ...strip(3, 'place'), say: 'díszek' }, b: ord(3) },
      { a: { ...strip(4, 'place'), say: 'díszek' }, b: ord(4) },
    ],
  },
  2: {
    say: 'Vigyázz! Három dísz, vagy a harmadik dísz? Párosítsd!',
    pairs: [
      { a: { ...strip(3, 'count'), say: 'díszek' }, b: { label: '3', say: 'három' } },
      { a: { ...strip(3, 'place'), say: 'díszek' }, b: ord(3) },
      { a: { ...strip(5, 'count', 6), say: 'díszek' }, b: { label: '5', say: 'öt' } },
      { a: { ...strip(5, 'place', 6), say: 'díszek' }, b: ord(5) },
    ],
  },
  3: {
    say: 'Hányadik dísz színes a hosszú sorban? Párosítsd!',
    pairs: [
      { a: { ...strip(6, 'place', 9), say: 'díszek' }, b: ord(6) },
      { a: { ...strip(7, 'place', 9), say: 'díszek' }, b: ord(7) },
      { a: { ...strip(8, 'place', 9), say: 'díszek' }, b: ord(8) },
      { a: { ...strip(9, 'place', 9), say: 'díszek' }, b: ord(9) },
    ],
  },
};

const item = (label: string, say: string) => ({ label, say });

export const A_SORSZAMNEVEK_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Három színes dísz, vagy csak a harmadik színes? Tedd a jó kosárba!',
    bins: [
      { label: '3', figure: <BigSign text="3" className="w-12 h-12" />, say: 'három' },
      { label: '3.', figure: <BigSign text="3." className="w-12 h-12" />, say: 'harmadik' },
    ],
    items: [
      { item: { ...strip(3, 'count', 5, 'disz'), say: 'díszek' }, bin: 0 },
      { item: { ...strip(3, 'place', 5, 'disz'), say: 'díszek' }, bin: 1 },
      { item: { ...strip(3, 'count', 5, 'csengo', '#facc15'), say: 'csengők' }, bin: 0 },
      { item: { ...strip(3, 'place', 5, 'csengo', '#facc15'), say: 'csengők' }, bin: 1 },
      { item: { ...strip(3, 'count', 5, 'ajandek'), say: 'ajándékok' }, bin: 0 },
      { item: { ...strip(3, 'place', 5, 'ajandek'), say: 'ajándékok' }, bin: 1 },
    ],
  },
  2: {
    say: 'Hányadik színes? Első, második, vagy harmadik? Balról számolj!',
    bins: [
      { label: '1.', say: 'első' },
      { label: '2.', say: 'második' },
      { label: '3.', say: 'harmadik' },
    ],
    items: [
      { item: { ...strip(1, 'place', 5, 'disz', '#3b82f6'), say: 'kék dísz' }, bin: 0 },
      { item: { ...strip(2, 'place', 5, 'disz', '#3b82f6'), say: 'kék dísz' }, bin: 1 },
      { item: { ...strip(3, 'place', 5, 'disz', '#3b82f6'), say: 'kék dísz' }, bin: 2 },
      { item: { ...strip(2, 'place', 5, 'szanko', '#22c55e'), say: 'zöld szánkó' }, bin: 1 },
      { item: { ...strip(3, 'place', 5, 'szanko', '#22c55e'), say: 'zöld szánkó' }, bin: 2 },
      { item: { ...strip(1, 'place', 5, 'suti', '#c2410c'), say: 'süti' }, bin: 0 },
      { item: { ...strip(3, 'place', 5, 'suti', '#c2410c'), say: 'süti' }, bin: 2 },
    ],
  },
  3: {
    say: 'Szám, vagy sorszám? Ha pont van a szám után, az sorszám. Tedd a jó kosárba!',
    bins: [
      { label: 'Szám', figure: <BigSign text="7" className="w-12 h-12" />, say: 'szám, például hét' },
      { label: 'Sorszám', figure: <BigSign text="7." className="w-12 h-12" />, say: 'sorszám, például hetedik' },
    ],
    items: [
      { item: item('5', 'öt'), bin: 0 },
      { item: item('2.', 'második'), bin: 1 },
      { item: item('8', 'nyolc'), bin: 0 },
      { item: item('9.', 'kilencedik'), bin: 1 },
      { item: item('4', 'négy'), bin: 0 },
      { item: item('1.', 'első'), bin: 1 },
      { item: item('6', 'hat'), bin: 0 },
      { item: item('3.', 'harmadik'), bin: 1 },
    ],
  },
};

export const ASorszamnevekG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="15. A sorszámnevek"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • JÁTÉK"
    base="g1-c10-a-sorszamnevek"
    chapterId="szamkorbovites-10-ig"
    questions={A_SORSZAMNEVEK_G1_QUESTIONS}
    pairs={A_SORSZAMNEVEK_G1_PAIRS}
    sort={A_SORSZAMNEVEK_G1_SORT}
    {...props}
  />
);

export default ASorszamnevekG1Jatek;
