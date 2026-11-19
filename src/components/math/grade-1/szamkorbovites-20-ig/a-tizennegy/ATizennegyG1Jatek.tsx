import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { BigSign, IconName, NumberLine } from '../../shared/G1Pics';
import { CompareScene, DominoPair, ExprScene, GroupBox, MiniFrames, MiniGroup, SeqStrip, TensRod, TwoFrames } from '../a-tizenot/ATizenotG1Scenes';
import { AquariumScene, FishDirCard, NetCard, OpFish, PairsScene } from './ATizennegyG1Scenes';

const grp = (icon: IconName, n: number, say: string) => ({ figure: <GroupBox icon={icon} n={n} />, say });
const sign = (t: string | number, say: string) => ({ figure: <BigSign text={t} />, say });
const sm = (node: React.ReactNode, say: string) => ({ figure: node, say });
const net = (n: number) => sm(<NetCard n={n} />, `${n}-es háló`.replace('13-es', '13-as'));
const dir = (d: 1 | -1, color: string) => sm(<FishDirCard dir={d} color={color} />, 'egy hal');

export const A_TIZENNEGY_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – felismerés, számlálás
  { id: 't14-1', level: 1, badge: 'Számlálás', ask: 'Hány hal úszik az akváriumban?', say: 'Hány hal úszik az akváriumban? Számold meg!', scene: <AquariumScene n={14} />, options: [14, 13, 12], hint: 'Mutass rá mindegyik halra, és számolj hangosan! Egyet se hagyj ki.' },
  { id: 't14-2', level: 1, badge: 'Számjegy', ask: 'Melyik a tizennégyes?', options: [sign(14, 'tizennégy'), sign(4, 'négy'), sign(13, 'tizenhárom')], hint: 'A tizennégyes két számjegy: elöl egy 1-es, utána egy 4-es.' },
  { id: 't14-3', level: 1, badge: 'Tízes keret', ask: 'Hány korong van a két keretben?', scene: <TwoFrames a={14} />, options: [14, 13, 4], hint: 'Az első keret tele van: az 10. Számolj tovább a másodikban: 11, 12…' },
  { id: 't14-4', level: 1, badge: 'Tizennégy', ask: 'Hol van 14 hal?', options: [grp('hal', 14, 'tizennégy hal'), grp('hal', 13, 'tizenhárom hal'), grp('hal', 12, 'tizenkét hal')], hint: 'Egy sorban 5 hal van. Két teli sor 10, és még…' },
  { id: 't14-5', level: 1, badge: 'Tízes és egyes', ask: 'Hány egyes kocka van a rúd mellett?', say: 'Egy tízesrudat és egyes kockákat látsz. Hány egyes kocka van a rúd mellett?', scene: <TensRod n={14} />, options: [4, 3, 5], hint: 'Csak a kis sárga kockákat számold, a hosszú rudat ne!' },
  { id: 't14-6', level: 1, badge: 'Dominó', ask: 'Hány pötty van a két dominón?', scene: <DominoPair ones={4} />, options: [14, 13, 12], hint: 'Az első dominón 10 pötty van. Számolj tovább a másodikon!' },
  { id: 't14-7', level: 1, badge: 'Számegyenes', ask: 'Melyik szám kell a ? helyére?', say: 'Melyik szám kell a kérdőjel helyére a számegyenesen?', scene: <NumberLine max={14} question={14} />, options: [14, 13, 12], hint: 'A 13 után melyik szám jön?' },
  { id: 't14-8', level: 1, badge: 'Jobbra, balra', ask: 'Hány hal úszik balra?', say: 'Nézd a halak fejét! Hány hal úszik balra?', scene: <AquariumScene n={12} left={4} color="#38bdf8" />, options: [4, 8, 5], hint: 'Csak azokat számold, amelyiknek a feje a bal kezed felé néz!' },
  // 2. szint – tízes és egyes, tízre pótlás, kettesével
  { id: 't14-9', level: 2, badge: 'Tízes és egyes', ask: '10 + 4 = ?', say: 'Egy teli keret és még 4 korong. 10 meg 4, az mennyi?', scene: <TwoFrames a={10} b={4} />, options: [14, 13, 4], hint: 'Egy tízes és négy egyes. Számolj a 10-től tovább négyet!' },
  { id: 't14-10', level: 2, badge: 'Kis történet', ask: 'Hány hal van most az akváriumban?', say: 'Az akváriumban 11 hal úszkált. Zümi beletett még 3-at. Hány hal van most az akváriumban?', scene: <GroupBox icon="hal" n={11} nb={3} colorB="#38bdf8" className="w-56 h-auto mx-auto" />, options: [14, 13, 8], hint: 'A 11-től számolj tovább hármat: 12, 13…' },
  { id: 't14-11', level: 2, badge: 'Tízre pótlás', ask: 'Hány kell a 8-hoz, hogy 10 legyen?', say: 'Az első keretben 8 korong van. Hány kell még, hogy tele legyen, vagyis 10 legyen?', scene: <TwoFrames a={8} />, options: [2, 3, 1], hint: 'Számold meg az üres helyeket az első keretben!' },
  { id: 't14-12', level: 2, badge: 'Tízen át', ask: '8 + 6 = ?', say: '8 piros és 6 kék korong. A kékekből 2 még az első keretbe került. 8 meg 6, az mennyi?', scene: <TwoFrames a={8} b={6} />, options: [14, 13, 12], hint: 'Előbb a tízig: 8 meg 2 az 10. A 6-ból maradt még 4. A 10-hez még 4.' },
  { id: 't14-13', level: 2, badge: 'Kivonás', ask: '14 − 4 = ?', say: '14 korongból 4-et áthúztunk. Hány maradt?', scene: <TwoFrames a={14} crossed={4} />, options: [10, 4, 11], hint: 'Csak a nem áthúzott korongokat számold! Teli az első keret?' },
  { id: 't14-14', level: 2, badge: 'Kettesével', ask: 'Hány háló kell?', say: 'Csigusz mindig 2 halat tesz egy hálóba. Hány háló kell a 14 halhoz?', scene: <PairsScene n={14} />, options: [7, 6, 14], hint: 'Ne a halakat számold, hanem a hálókat! Kettesével: 2, 4, 6…' },
  { id: 't14-15', level: 2, badge: 'Számsor', ask: 'Melyik szám hiányzik?', say: 'Nézd a számsort: 11, 12, kérdőjel, 14. Melyik szám hiányzik?', scene: <SeqStrip items={[11, 12, '?', 14]} />, options: [13, 10, 3], hint: 'Melyik szám jön a 12 után, és a 14 előtt?' },
  { id: 't14-16', level: 2, badge: 'Páros, páratlan', ask: 'Páros vagy páratlan a 13?', say: 'A hálókban 13 hal van. Mindegyiknek jut pár? Páros vagy páratlan a 13?', scene: <PairsScene n={13} />, options: ['páratlan', 'páros'], hint: 'Nézd az utolsó hálót! Van ott párja a halnak?' },
  // 3. szint – összehasonlítás, két lépés, kis történetek
  { id: 't14-17', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: '14 hal, és 12 hal. Melyik jel kell középre?', scene: <CompareScene icon="hal" a={14} b={12} />, options: ['>', '<', '='], hint: 'Jobb oldalon kevesebb van. A jel hegye a kevesebb felé mutasson!' },
  { id: 't14-18', level: 3, badge: 'Egyenlő', ask: 'Melyik jel kell?', say: '14, kérdőjel, 7 meg 7. Melyik jel kell a kérdőjel helyére?', scene: <ExprScene text="14 ? 7 + 7" />, options: ['=', '<', '>'], hint: 'Számold ki előbb: mennyi 7 meg 7? Aztán hasonlítsd a 14-hez!' },
  { id: 't14-19', level: 3, badge: 'Tízen át', ask: '14 − 6 = ?', say: '14 elvéve 6. Pötyi így számol: 14 elvéve 4, az 10, aztán még elvéve 2. Mennyi?', scene: <ExprScene text={['14 − 6 = ?', '14 − 4 − 2 = ?']} />, options: [8, 10, 9], hint: 'Előbb 14-ből 4: az 10. A 10-ből még 2-t vegyél el!' },
  { id: 't14-20', level: 3, badge: 'Nyitott mondat', ask: 'Melyik szám kell a □ helyére?', say: '9 meg valahány egyenlő 14. Melyik szám kell az üres helyre?', scene: <ExprScene text="9 + □ = 14" />, options: [5, 4, 6], hint: 'Számolj a 9-től 14-ig: előbb a 10-ig 1, aztán még 4.' },
  { id: 't14-21', level: 3, badge: 'Kis történet', ask: 'Hány hal úszik együtt?', say: 'Az akváriumban 9 narancssárga és 5 kék hal úszik. Hány hal úszik együtt?', scene: <GroupBox icon="hal" n={9} nb={5} colorB="#38bdf8" className="w-56 h-auto mx-auto" />, options: [14, 13, 15], hint: '9 meg 5: a 9-hez előbb 1 kell a tízhez, aztán még 4.' },
  { id: 't14-22', level: 3, badge: 'Kis történet', ask: 'Hány hal maradt?', say: '14 hal úszott az akváriumban. Csigusz 5-öt visszavitt a tóba, ezeket áthúztuk. Hány hal maradt?', scene: <GroupBox icon="hal" n={14} crossed={5} className="w-56 h-auto mx-auto" />, options: [9, 10, 8], hint: 'Előbb 4-et vegyél el, az 10. Aztán még 1-et.' },
  { id: 't14-23', level: 3, badge: 'Hálók', ask: 'Melyik hálóba úszik a hal?', say: 'A halon ez áll: 8 meg 5. Melyik hálóba úszik? Arra, amelyiken az eredmény áll.', scene: <OpFish text="8 + 5" />, options: [net(13), net(12), net(14)], hint: 'Előbb a tízig: 8 meg 2 az 10. Az 5-ből maradt még 3.' },
  { id: 't14-24', level: 3, badge: 'Mennyivel több?', ask: 'Mennyivel több hal van bal oldalon?', say: 'Bal oldalon 14 hal, jobb oldalon 11 hal. Mennyivel több hal van bal oldalon?', scene: <CompareScene icon="hal" a={14} b={11} />, options: [3, 2, 4], hint: 'Számolj a 11-től a 14-ig: 12, 13, 14. Hány lépés volt?' },
];

export const A_TIZENNEGY_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Koppints bal oldalon egy képre, aztán jobb oldalon a hozzá illő számra!',
    pairs: [
      { a: sm(<MiniGroup icon="hal" n={14} />, 'tizennégy hal'), b: 14 },
      { a: sm(<MiniGroup icon="hal" n={12} />, 'tizenkét hal'), b: 12 },
      { a: sm(<MiniGroup icon="hal" n={13} />, 'tizenhárom hal'), b: 13 },
      { a: sm(<MiniGroup icon="hal" n={11} />, 'tizenegy hal'), b: 11 },
    ],
  },
  2: {
    say: 'Egy tízes és még néhány egyes. Keresd meg, mi illik össze!',
    pairs: [
      { a: sm(<MiniFrames a={14} />, 'tizennégy korong'), b: '10 + 4' },
      { a: sm(<MiniFrames a={12} />, 'tizenkét korong'), b: '10 + 2' },
      { a: sm(<MiniFrames a={13} />, 'tizenhárom korong'), b: '10 + 3' },
      { a: sm(<MiniFrames a={11} />, 'tizenegy korong'), b: '10 + 1' },
    ],
  },
  3: {
    say: 'Pötyi a tízig számol, aztán tovább. Keresd meg a párokat!',
    pairs: [
      { a: '9 + 5', b: '9 + 1 + 4' },
      { a: '8 + 6', b: '8 + 2 + 4' },
      { a: '14 − 6', b: '14 − 4 − 2' },
      { a: '14 − 7', b: '14 − 4 − 3' },
    ],
  },
};

export const A_TIZENNEGY_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Tizennégy, vagy nem tizennégy? Számold meg, és tedd a jó kosárba!',
    bins: [
      { label: 'Tizennégy', figure: <BigSign text={14} className="w-12 h-12" />, say: 'tizennégy' },
      { label: 'Nem tizennégy', say: 'nem tizennégy' },
    ],
    items: [
      { item: sm(<MiniGroup icon="hal" n={14} />, 'halak'), bin: 0 },
      { item: sm(<MiniGroup icon="csillag" n={13} />, 'csillagok'), bin: 1 },
      { item: sm(<MiniGroup icon="labda" n={14} />, 'labdák'), bin: 0 },
      { item: sm(<MiniGroup icon="virag" n={12} />, 'virágok'), bin: 1 },
      { item: sm(<MiniFrames a={14} />, 'korongok a keretekben'), bin: 0 },
      { item: sm(<MiniFrames a={11} />, 'korongok két keretben'), bin: 1 },
      { item: sm(<TensRod n={14} className="w-32 h-auto" />, 'tízesrúd és kockák'), bin: 0 },
      { item: sm(<DominoPair ones={3} className="w-32 h-auto" />, 'két dominó'), bin: 1 },
    ],
  },
  2: {
    say: 'Jobbra vagy balra úszik a hal? Nézd a fejét, és tedd a jó kosárba!',
    bins: [
      { label: 'Jobbra úszik', say: 'jobbra úszik' },
      { label: 'Balra úszik', say: 'balra úszik' },
    ],
    items: [
      { item: dir(1, '#f97316'), bin: 0 },
      { item: dir(-1, '#38bdf8'), bin: 1 },
      { item: dir(-1, '#facc15'), bin: 1 },
      { item: dir(1, '#fb7185'), bin: 0 },
      { item: dir(1, '#38bdf8'), bin: 0 },
      { item: dir(-1, '#f97316'), bin: 1 },
      { item: dir(1, '#facc15'), bin: 0 },
      { item: dir(-1, '#fb7185'), bin: 1 },
    ],
  },
  3: {
    say: 'Számold ki! Tizenkettő, tizenhárom vagy tizennégy lesz? Tedd a jó kosárba!',
    bins: [
      { label: '12', say: 'tizenkettő' },
      { label: '13', say: 'tizenhárom' },
      { label: '14', say: 'tizennégy' },
    ],
    items: [
      { item: '9 + 5', bin: 2 },
      { item: '8 + 6', bin: 2 },
      { item: '7 + 7', bin: 2 },
      { item: '14 − 1', bin: 1 },
      { item: '9 + 4', bin: 1 },
      { item: '8 + 5', bin: 1 },
      { item: '14 − 2', bin: 0 },
      { item: '8 + 4', bin: 0 },
      { item: '7 + 5', bin: 0 },
    ],
  },
};

export const ATizennegyG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="4. A tizennégy"
    badge="1. OSZTÁLY • VI. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 20-IG • JÁTÉK"
    base="g1-c20-a-tizennegy"
    chapterId="szamkorbovites-20-ig"
    questions={A_TIZENNEGY_G1_QUESTIONS}
    pairs={A_TIZENNEGY_G1_PAIRS}
    sort={A_TIZENNEGY_G1_SORT}
    {...props}
  />
);

export default ATizennegyG1Jatek;
