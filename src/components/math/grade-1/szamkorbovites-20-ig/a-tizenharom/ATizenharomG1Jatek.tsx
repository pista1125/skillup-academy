import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { BigSign, IconGroup, IconName, NumberLine } from '../../shared/G1Pics';
import { BagScene, CompareScene, DominoPair, ExprScene, GroupBox, MiniGroup, SeqStrip, TensRod, TwoFrames } from '../a-tizenegy/ATizenegyG1Scenes';
import { FrogCard, FrogPondScene } from './ATizenharomG1Scenes';

const pic = (icon: IconName, n: number, say: string) => ({ figure: <GroupBox icon={icon} n={n} />, say });
const big = (t: string | number, say: string) => ({ figure: <BigSign text={t} />, say });
const frames = (a: number, say: string) => ({ figure: <TwoFrames a={a} className="w-40 h-auto" />, say });
const rod = (n: number, say: string) => ({ figure: <TensRod n={n} className="w-36 h-auto" />, say });

export const A_TIZENHAROM_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – a 13 felismerése, számlálás
  { id: 'h1', level: 1, badge: 'Számlálás 13-ig', ask: 'Hány béka van?', say: 'Hány béka napozik a tavon? Mutass rá mindegyikre!', scene: <FrogPondScene n={13} />, options: [13, 12, 11], hint: 'Mutass rá minden békára! A 10 után számolj tovább!' },
  { id: 'h2', level: 1, badge: 'Számlálás 13-ig', ask: 'Hol van 13 hal?', options: [pic('hal', 13, 'tizenhárom hal'), pic('hal', 12, 'tizenkét hal'), pic('hal', 10, 'tíz hal')], hint: 'Két teli sor 10. A 13-hoz alul még 3 hal kell.' },
  { id: 'h3', level: 1, badge: 'Számjegyek', ask: 'Melyik a tizenhárom?', options: [big('13', 'tizenhárom'), big('12', 'tizenkettő'), big('3', 'három')], hint: 'Elöl egy egyes, mellette egy hármas.' },
  { id: 'h4', level: 1, badge: 'Tízes és egyes', ask: 'Hány korong van?', say: 'Hány korong van a két keretben összesen?', scene: <TwoFrames a={10} b={3} />, options: [13, 12, 10], hint: 'A teli keret 10. Számolj tovább: 11, 12, 13.' },
  { id: 'h5', level: 1, badge: 'Tízesrúd', ask: 'Hány kocka van?', say: 'Egy tízesrúd és mellette kockák. Hány kocka van összesen?', scene: <TensRod n={13} />, options: [13, 10, 3], hint: 'A tízesrúd 10. Meg még 3 kocka.' },
  { id: 'h6', level: 1, badge: 'Dominó', ask: 'Melyik dominópáron van 13 pötty?', options: [{ figure: <DominoPair ones={3} />, say: 'öt és öt, meg három' }, { figure: <DominoPair ones={2} />, say: 'öt és öt, meg kettő' }, { figure: <DominoPair ones={1} />, say: 'öt és öt, meg egy' }], hint: 'Az első dominón 10 pötty van. Kell még 3.' },
  { id: 'h7', level: 1, badge: 'Tízes és egyes', ask: 'Hány egyes van a 13-ban?', say: 'A teli keret a tízes. Hány egyes van a 13-ban?', scene: <TwoFrames a={10} b={3} />, options: [3, 1, 13], hint: 'Számold meg a második keret korongjait!' },
  { id: 'h8', level: 1, badge: 'Számlálás 13-ig', ask: 'Hány labda van?', say: 'A zsákban 10 labda van, mellette még néhány. Hány labda van összesen?', scene: <BagScene icon="labda" n={13} />, options: [13, 12, 11], hint: 'A zsákban 10. Számolj tovább a kint lévőkkel!' },
  // 2. szint – számegyenes, szomszédok, műveletek
  { id: 'h9', level: 2, badge: 'Számegyenes', ask: 'Melyik szám van a kérdőjel helyén?', scene: <NumberLine max={13} question={13} />, options: [13, 12, 11], hint: 'Mi jön a 12 után?' },
  { id: 'h10', level: 2, badge: 'Számsor', ask: 'Melyik szám jön ezután?', say: '11, 12, és utána? Melyik szám jön?', scene: <SeqStrip items={[11, 12, '?']} />, options: [13, 10, 3], hint: 'Számolj tovább a 12-től!' },
  { id: 'h11', level: 2, badge: 'Visszafelé számlálás', ask: 'Számolj visszafelé! Mi jön?', say: '13, 12, és utána? Számolj visszafelé!', scene: <SeqStrip items={[13, 12, '?']} />, options: [11, 13, 10], hint: 'Visszafelé mindig eggyel kevesebb jön.' },
  { id: 'h12', level: 2, badge: 'Összeadás', ask: 'Mennyi 10 + 3?', say: 'Mennyi 10 meg 3?', scene: <ExprScene text="10 + 3 = ?" />, options: [13, 12, 3], hint: '1 tízes és 3 egyes. Hogy hívjuk?' },
  { id: 'h13', level: 2, badge: 'Kivonás', ask: 'Mennyi marad?', say: '13 korongból elvettük a teli keretet, a 10-et. Mennyi marad?', scene: <TwoFrames a={13} crossed={10} crossStart={0} />, options: [3, 10, 13], hint: 'Hány korong nincs áthúzva?' },
  { id: 'h14', level: 2, badge: 'Ugrás a számegyenesen', ask: 'Hová érkezik a béka?', say: 'A béka a 10-en ül, és 3-at ugrik előre. Hová érkezik?', scene: <NumberLine max={13} mark={[10]} jumps={[{ from: 10, to: 13 }]} hideLabels={[13]} />, options: [13, 12, 7], hint: 'A 10-től számolj hármat: 11, 12, …' },
  { id: 'h15', level: 2, badge: 'Páros, páratlan', ask: 'Páros vagy páratlan a 13?', say: 'Állítsd párba a leveleket! Páros vagy páratlan a 13?', scene: <IconGroup icon="level" n={13} perRow={7} className="w-64 h-auto mx-auto" />, options: ['páratlan', 'páros'], hint: 'Fent 7, lent 6 levél. Jut mindegyiknek pár?' },
  { id: 'h16', level: 2, badge: 'Számjegy és mennyiség', ask: 'Melyik kép illik a 13-hoz?', scene: <BigSign text="13" className="w-24 h-24 mx-auto" />, options: [{ figure: <FrogCard n={13} />, say: 'tizenhárom béka' }, { figure: <FrogCard n={12} />, say: 'tizenkét béka' }, { figure: <FrogCard n={11} />, say: 'tizenegy béka' }], hint: 'Két teli sor és még 3 béka. Számold meg!' },
  // 3. szint – összehasonlítás, 10-en át, kis történetek
  { id: 'h17', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: '13 gomba, és 12 gomba. Melyik jel kell középre?', scene: <CompareScene icon="gomba" a={13} b={12} />, options: ['>', '<', '='], hint: 'Bal oldalon eggyel több van. A jel szája a több felé nyílik.' },
  { id: 'h18', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: '11 csillag, és 13 csillag. Melyik jel kell középre?', scene: <CompareScene icon="csillag" a={11} b={13} />, options: ['<', '>', '='], hint: 'Jobb oldalon van több. A jel hegye a kevesebb felé mutat.' },
  { id: 'h19', level: 3, badge: 'Összeadás 10-en át', ask: 'Mennyi 9 + 4?', say: '9 piros korong, meg 4 kék. Mennyi 9 meg 4?', scene: <TwoFrames a={9} b={4} />, options: [13, 12, 11], hint: 'Előbb töltsd meg a keretet: 9 meg 1. Aztán még 3.' },
  { id: 'h20', level: 3, badge: 'Kivonás 10-en át', ask: 'Mennyi 13 − 5?', say: '13 korongból 5-öt áthúztunk. Mennyi 13 elvéve 5?', scene: <TwoFrames a={13} crossed={5} />, options: [8, 9, 7], hint: 'Előbb 3-at veszünk el: 10 marad. Aztán még 2-t.' },
  { id: 'h21', level: 3, badge: 'Ugrás a számegyenesen', ask: 'Hová érkezik a béka?', say: 'A béka az 1-en ül. Előbb 10-et ugrik, aztán 2-t. Hová érkezik? 1 meg 12.', scene: <NumberLine max={13} mark={[1]} jumps={[{ from: 1, to: 11 }, { from: 11, to: 13 }]} hideLabels={[11, 12, 13]} />, options: [13, 12, 11], hint: 'Az 1-ről 10-et ugrik: 11. Onnan még 2-t.' },
  { id: 'h22', level: 3, badge: 'Történet', ask: 'Hány béka maradt a parton?', say: '13 béka ült a parton. 4 beugrott a vízbe. Hány béka maradt a parton?', scene: <FrogPondScene n={13} jumped={4} />, options: [9, 10, 8], hint: 'Előbb 3 ugrik be: 10 marad. Aztán még 1.' },
  { id: 'h23', level: 3, badge: 'A 13 bontása', ask: 'Hány kék korong van?', say: '13 korong van. 8 piros. Hány kék?', scene: <TwoFrames a={8} b={5} />, options: [5, 4, 6], hint: 'Csak a kék korongokat számold meg!' },
  { id: 'h24', level: 3, badge: 'Nyitott mondat', ask: 'Melyik szám kell a négyzetbe?', say: '9 meg valahány egyenlő 13. Melyik szám kell a négyzetbe?', scene: <ExprScene text="9 + □ = 13" />, options: [4, 3, 5], hint: '9 meg 1 az 10. A 10-től a 13-ig még 3. Összesen?' },
];

export const A_TIZENHAROM_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Koppints egy képre, aztán a számra, ami illik hozzá!',
    pairs: [
      { a: { figure: <FrogCard n={13} className="w-28 h-[76px]" />, say: 'tizenhárom béka' }, b: 13 },
      { a: { figure: <FrogCard n={12} className="w-28 h-[76px]" />, say: 'tizenkét béka' }, b: 12 },
      { a: { figure: <FrogCard n={11} className="w-28 h-[76px]" />, say: 'tizenegy béka' }, b: 11 },
      { a: { figure: <FrogCard n={7} className="w-28 h-[76px]" />, say: 'hét béka' }, b: 7 },
    ],
  },
  2: {
    say: 'Keresd meg, mi illik össze! Ugyanannyi legyen a korong, mint a kocka.',
    pairs: [
      { a: frames(13, 'teli keret és három korong'), b: rod(13, 'tízesrúd és három kocka') },
      { a: frames(12, 'teli keret és két korong'), b: rod(12, 'tízesrúd és két kocka') },
      { a: frames(10, 'teli keret'), b: rod(10, 'egy tízesrúd') },
      { a: frames(8, 'nyolc korong'), b: rod(8, 'nyolc kocka') },
    ],
  },
  3: {
    say: 'Párosítsd a műveletet az eredményével!',
    pairs: [
      { a: '10 + 3', b: 13 },
      { a: '13 − 3', b: 10 },
      { a: '9 + 3', b: 12 },
      { a: '13 − 10', b: 3 },
      { a: '13 − 5', b: 8 },
    ],
  },
};

export const A_TIZENHAROM_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Hová való a kép? Ahol tizenhárom van, az a tizenhármas kosár. Ahol nem, az a másik.',
    bins: [
      { label: 'Tizenhárom', figure: <BigSign text="13" className="w-12 h-12" />, say: 'tizenhárom' },
      { label: 'Nem tizenhárom', say: 'nem tizenhárom' },
    ],
    items: [
      { item: { figure: <FrogCard n={13} className="w-28 h-[76px]" />, say: 'békák' }, bin: 0 },
      { item: { figure: <MiniGroup icon="hal" n={12} />, say: 'halak' }, bin: 1 },
      { item: { figure: <MiniGroup icon="virag" n={13} />, say: 'virágok' }, bin: 0 },
      { item: { figure: <MiniGroup icon="csillag" n={10} />, say: 'csillagok' }, bin: 1 },
      { item: rod(13, 'kockák'), bin: 0 },
      { item: { figure: <MiniGroup icon="gomba" n={11} />, say: 'gombák' }, bin: 1 },
    ],
  },
  2: {
    say: 'Egyjegyű vagy kétjegyű szám? Az egyjegyűt egy számjeggyel írjuk, a kétjegyűt kettővel.',
    bins: [
      { label: 'Egyjegyű', say: 'egyjegyű' },
      { label: 'Kétjegyű', say: 'kétjegyű' },
    ],
    items: [
      { item: 13, bin: 1 },
      { item: 3, bin: 0 },
      { item: 12, bin: 1 },
      { item: 9, bin: 0 },
      { item: 10, bin: 1 },
      { item: 1, bin: 0 },
      { item: 11, bin: 1 },
      { item: 7, bin: 0 },
    ],
  },
  3: {
    say: 'Mennyi lesz? Tizenkettő, vagy tizenhárom? Tedd a jó kosárba!',
    bins: [
      { label: '12', say: 'tizenkettő' },
      { label: '13', say: 'tizenhárom' },
    ],
    items: [
      { item: '9 + 4', bin: 1 },
      { item: '8 + 5', bin: 1 },
      { item: '10 + 3', bin: 1 },
      { item: '7 + 6', bin: 1 },
      { item: '9 + 3', bin: 0 },
      { item: '8 + 4', bin: 0 },
      { item: '13 − 1', bin: 0 },
      { item: '6 + 6', bin: 0 },
    ],
  },
};

export const ATizenharomG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="3. A tizenhárom"
    badge="1. OSZTÁLY • VI. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 20-IG • JÁTÉK"
    base="g1-c20-a-tizenharom"
    chapterId="szamkorbovites-20-ig"
    questions={A_TIZENHAROM_G1_QUESTIONS}
    pairs={A_TIZENHAROM_G1_PAIRS}
    sort={A_TIZENHAROM_G1_SORT}
    {...props}
  />
);

export default ATizenharomG1Jatek;
