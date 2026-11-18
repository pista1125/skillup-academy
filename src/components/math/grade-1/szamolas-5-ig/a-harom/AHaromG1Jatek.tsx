import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { Domino, Hand, IconGroup, NumberLine, BigSign, IconName } from '../../shared/G1Pics';
import { CompareScene, DotPairs, GroupBox, JumpLineScene, MiniGroup } from '../a-ketto/AKettoG1Scenes';
import { FriendsScene, MushroomScene, StairsScene } from './AHaromG1Scenes';

const pic = (icon: IconName, n: number, say: string, crossed = 0) => ({ figure: <GroupBox icon={icon} n={n} crossed={crossed} />, say });
const dom = (n: number, say: string) => ({ figure: <Domino left={n} single />, say });
const hand = (n: number, say: string) => ({ figure: <Hand fingers={n} />, say });
const sm = (node: React.ReactNode, say: string) => ({ figure: node, say });

export const A_HAROM_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – felismerés, számlálás
  { id: 'h1', level: 1, badge: 'Számlálás', ask: 'Hányan vannak a barátok?', say: 'Pötyi, Zümi és Csigusz. Hányan vannak?', scene: <FriendsScene />, options: [3, 2, 1], hint: 'Mutass rá mindegyikre: Pötyi, Zümi, Csigusz!' },
  { id: 'h2', level: 1, badge: 'Három', ask: 'Hol van három gomba?', options: [pic('gomba', 3, 'három gomba'), pic('gomba', 2, 'két gomba'), pic('gomba', 1, 'egy gomba')], hint: 'Számold meg: egy, kettő, három. Hol van pont ennyi?' },
  { id: 'h3', level: 1, badge: 'Számjegy', ask: 'Melyik a hármas?', options: [{ figure: <BigSign text="3" />, say: 'hármas' }, { figure: <BigSign text="2" />, say: 'kettes' }, { figure: <BigSign text="0" />, say: 'nulla' }], hint: 'A hármasnak két kis pocakja van.' },
  { id: 'h4', level: 1, badge: 'Ujjkép', ask: 'Melyik kéz mutat hármat?', options: [hand(3, 'három ujj'), hand(2, 'két ujj'), hand(5, 'sok ujj')], hint: 'Számold meg a fenti ujjakat! Három legyen.' },
  { id: 'h5', level: 1, badge: 'Dominó', ask: 'Hol van három pötty?', options: [dom(3, 'három pötty'), dom(2, 'két pötty'), dom(1, 'egy pötty')], hint: 'Számold meg a pöttyöket a dominón!' },
  { id: 'h6', level: 1, badge: 'Számlálás', ask: 'Hány gomba nő itt?', scene: <MushroomScene n={3} />, options: [3, 2, 1], hint: 'Mutass rá mindegyik gombára!' },
  { id: 'h7', level: 1, badge: 'Számlálás', ask: 'Hány madár repül?', scene: <IconGroup icon="madar" n={3} className="w-48 h-24 mx-auto" />, options: [3, 2, 0], hint: 'Mutass rá a madarakra, egyenként!' },
  { id: 'h8', level: 1, badge: 'Számlálás', ask: 'Hány csiga mászik itt?', scene: <IconGroup icon="csiga" n={2} className="w-40 h-24 mx-auto" />, options: [2, 3, 1], hint: 'Számold meg még egyszer, mutass rá mindegyikre!' },
  // 2. szint – több, kevesebb, számegyenes
  { id: 'h9', level: 2, badge: 'Háromnál több', ask: 'Hol van háromnál több?', options: [pic('hal', 4, 'sok hal'), pic('hal', 3, 'három hal'), pic('hal', 2, 'két hal')], hint: 'Ott három vagy kevesebb van. Hol van több?' },
  { id: 'h10', level: 2, badge: 'Számegyenes', ask: 'Melyik szám kell a ? helyére?', say: 'Melyik szám kell a kérdőjel helyére a számegyenesen?', scene: <NumberLine max={5} question={3} />, options: [3, 2, 1], hint: 'A kettő után melyik szám jön?' },
  { id: 'h11', level: 2, badge: 'Párosítás', ask: 'Melyik kép illik a 3-hoz?', scene: <BigSign text="3" className="w-24 h-24 mx-auto" />, options: [pic('eper', 3, 'három eper'), pic('eper', 2, 'két eper'), pic('eper', 4, 'sok eper')], hint: 'A hármashoz három tárgy kell. Számold meg!' },
  { id: 'h12', level: 2, badge: 'Ujjkép', ask: 'Hány ujj van fent?', scene: <Hand fingers={3} className="w-32 h-32 mx-auto" />, options: [3, 2, 1], hint: 'Számold meg a fenti ujjakat egyenként!' },
  { id: 'h13', level: 2, badge: 'Dominó', ask: 'Melyik dominó illik a 3-hoz?', scene: <BigSign text="3" className="w-24 h-24 mx-auto" />, options: [dom(3, 'három pötty'), dom(2, 'két pötty')], hint: 'A hármashoz három pötty illik.' },
  { id: 'h14', level: 2, badge: 'Lépések', ask: 'Hová ért Csigusz?', say: 'Csigusz az elejéről indult, és lépegetett a számegyenesen. Hová ért?', scene: <JumpLineScene steps={3} icon="csiga" />, options: [3, 2, 1], hint: 'Számold meg az íveket! Annyit lépett.' },
  { id: 'h15', level: 2, badge: 'Háromnál kevesebb', ask: 'Hol van háromnál kevesebb?', options: [pic('csillag', 2, 'két csillag'), pic('csillag', 3, 'három csillag'), pic('csillag', 4, 'sok csillag')], hint: 'Kevesebb, mint három: kettő, egy vagy nulla.' },
  { id: 'h16', level: 2, badge: 'Számegyenes', ask: 'Melyik szám hiányzik?', say: 'Melyik szám hiányzik a számegyenesről? Nézd a kérdőjelet!', scene: <NumberLine max={3} question={1} />, options: [1, 3, 0], hint: 'A nulla és a kettő között melyik szám van?' },
  // 3. szint – összehasonlítás, sorrend, kis történetek
  { id: 'h17', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: 'Három labda, és két labda. Melyik jel kell középre?', scene: <CompareScene icon="labda" a={3} b={2} />, options: ['>', '<', '='], hint: 'Jobb oldalon kevesebb van. A jel hegye arra mutasson!' },
  { id: 'h18', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: 'Egy virág, és három virág. Melyik jel kell középre?', scene: <CompareScene icon="virag" a={1} b={3} />, options: ['<', '>', '='], hint: 'Bal oldalon kevesebb van. A hegye a kevesebb felé mutat.' },
  { id: 'h19', level: 3, badge: 'Ugyanannyi', ask: 'Melyik jel kell?', say: 'Három hal, és három hal. Melyik jel kell középre?', scene: <CompareScene icon="hal" a={3} b={3} />, options: ['=', '<', '>'], hint: 'Számold meg mindkét oldalt! Ugyanannyi?' },
  { id: 'h20', level: 3, badge: 'Elvétel', ask: 'Hol maradt három?', say: 'Csigusz áthúzott néhány gombát. Melyik képen maradt három?', options: [pic('gomba', 4, 'egyet áthúzott', 1), pic('gomba', 4, 'kettőt áthúzott', 2), pic('gomba', 4, 'semmit sem húzott át', 0)], hint: 'Csak azokat számold, amelyek nincsenek áthúzva!' },
  { id: 'h21', level: 3, badge: 'Kakukktojás', ask: 'Melyik NEM három?', say: 'Két képen három látszik. Melyik nem három?', options: [pic('meh', 2, 'két méh'), hand(3, 'három ujj'), dom(3, 'három pötty')], hint: 'Számold meg mindegyiket! Hol nem három van?' },
  { id: 'h22', level: 3, badge: 'Párosítás', ask: 'Melyik illik a kézhez?', say: 'A kéz három ujjat mutat. Melyik dominó illik hozzá?', scene: <Hand fingers={3} className="w-28 h-28 mx-auto" />, options: [dom(3, 'három pötty'), dom(2, 'két pötty'), dom(1, 'egy pötty')], hint: 'Három ujj, három pötty.' },
  { id: 'h23', level: 3, badge: 'Sorrend', ask: 'Melyik a legnagyobb szám?', say: 'Melyik a legnagyobb szám? Nézd meg a számlépcsőt!', scene: <StairsScene max={3} />, options: [3, 0, 2, 1], hint: 'A legmagasabb lépcsőfok alatt melyik szám áll?' },
  { id: 'h24', level: 3, badge: 'Ugyanannyi', ask: 'Mindenki kap egy epret. Melyik jó?', say: 'Pötyi, Zümi és Csigusz mindegyike egy epret kap. Melyik dobozban van pont annyi eper, ahányan vannak?', scene: <FriendsScene />, options: [pic('eper', 3, 'három eper'), pic('eper', 2, 'két eper'), pic('eper', 4, 'sok eper')], hint: 'Hárman vannak. Mindenkinek egy eper jár: egy, kettő, három.' },
];

export const A_HAROM_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Koppints bal oldalon egy képre, aztán jobb oldalon arra, ami illik hozzá!',
    pairs: [
      { a: sm(<MiniGroup icon="alma" n={3} />, 'három alma'), b: 3 },
      { a: sm(<MiniGroup icon="alma" n={2} />, 'két alma'), b: 2 },
      { a: sm(<MiniGroup icon="alma" n={0} />, 'üres doboz'), b: 0 },
      { a: sm(<Hand fingers={3} className="w-16 h-16" />, 'három ujj'), b: sm(<Domino left={3} single className="w-14 h-14" />, 'három pötty') },
    ],
  },
  2: {
    say: 'Keresd meg, mi illik össze! Ugyanannyi legyen.',
    pairs: [
      { a: sm(<MiniGroup icon="hal" n={3} />, 'három hal'), b: sm(<MiniGroup icon="csillag" n={3} />, 'három csillag') },
      { a: sm(<MiniGroup icon="hal" n={1} />, 'egy hal'), b: sm(<MiniGroup icon="csillag" n={1} />, 'egy csillag') },
      { a: 3, b: sm(<Hand fingers={3} className="w-16 h-16" />, 'három ujj') },
      { a: sm(<Domino left={2} single className="w-14 h-14" />, 'két pötty'), b: sm(<MiniGroup icon="eper" n={2} />, 'két eper') },
      { a: 0, b: sm(<Domino left={0} single className="w-14 h-14" />, 'üres dominó') },
    ],
  },
  3: {
    say: 'Párosítsd a jeleket a képekhez! Kék és piros korongokat látsz. Az üres keret nulla.',
    pairs: [
      { a: '3 > 2', b: sm(<DotPairs a={3} b={2} />, 'három kék, két piros') },
      { a: '1 < 3', b: sm(<DotPairs a={1} b={3} />, 'egy kék, három piros') },
      { a: '3 = 3', b: sm(<DotPairs a={3} b={3} />, 'három kék, három piros') },
      { a: '0 < 3', b: sm(<DotPairs a={0} b={3} />, 'nulla kék, három piros') },
    ],
  },
};

export const A_HAROM_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Három, vagy nem három? Számold meg, és tedd a jó kosárba!',
    bins: [
      { label: 'Három', figure: <BigSign text="3" className="w-12 h-12" />, say: 'három' },
      { label: 'Nem három', say: 'nem három' },
    ],
    items: [
      { item: sm(<MiniGroup icon="gomba" n={3} />, 'gombák'), bin: 0 },
      { item: sm(<MiniGroup icon="gomba" n={2} />, 'gombák'), bin: 1 },
      { item: sm(<MiniGroup icon="labda" n={3} />, 'labdák'), bin: 0 },
      { item: sm(<MiniGroup icon="labda" n={1} />, 'labda'), bin: 1 },
      { item: sm(<MiniGroup icon="virag" n={4} />, 'virágok'), bin: 1 },
      { item: sm(<MiniGroup icon="katica" n={3} />, 'katicák'), bin: 0 },
    ],
  },
  2: {
    say: 'Három kosár van: egy, kettő, három. Hová való?',
    bins: [
      { label: '1', say: 'egy' },
      { label: '2', say: 'kettő' },
      { label: '3', say: 'három' },
    ],
    items: [
      { item: sm(<Hand fingers={3} className="w-16 h-16" />, 'kéz'), bin: 2 },
      { item: sm(<Hand fingers={1} className="w-16 h-16" />, 'kéz'), bin: 0 },
      { item: sm(<Domino left={2} single className="w-14 h-14" />, 'dominó'), bin: 1 },
      { item: sm(<Domino left={3} single className="w-14 h-14" />, 'dominó'), bin: 2 },
      { item: sm(<MiniGroup icon="hal" n={2} />, 'halak'), bin: 1 },
      { item: sm(<MiniGroup icon="eper" n={1} />, 'eper'), bin: 0 },
      { item: sm(<MiniGroup icon="pillango" n={3} />, 'pillangók'), bin: 2 },
      { item: 2, bin: 1 },
    ],
  },
  3: {
    say: 'Háromnál kevesebb, pont három, vagy háromnál több? Tedd a jó kosárba!',
    bins: [
      { label: 'Kevesebb', figure: <IconGroup icon="csillag" n={1} className="w-12 h-12" />, say: 'háromnál kevesebb' },
      { label: 'Három', figure: <BigSign text="3" className="w-12 h-12" />, say: 'pont három' },
      { label: 'Több', figure: <IconGroup icon="csillag" n={5} className="w-20 h-12" />, say: 'háromnál több' },
    ],
    items: [
      { item: sm(<MiniGroup icon="alma" n={2} />, 'almák'), bin: 0 },
      { item: sm(<MiniGroup icon="alma" n={3} />, 'almák'), bin: 1 },
      { item: sm(<MiniGroup icon="alma" n={5} />, 'sok alma'), bin: 2 },
      { item: sm(<MiniGroup icon="hal" n={0} />, 'üres doboz'), bin: 0 },
      { item: sm(<Hand fingers={3} className="w-16 h-16" />, 'kéz'), bin: 1 },
      { item: sm(<Hand fingers={4} className="w-16 h-16" />, 'kéz'), bin: 2 },
      { item: sm(<Domino left={1} single className="w-14 h-14" />, 'dominó'), bin: 0 },
      { item: sm(<MiniGroup icon="meh" n={4} />, 'méhek'), bin: 2 },
    ],
  },
};

export const AHaromG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="4. A három"
    badge="1. OSZTÁLY • II. SZÁMOLÁS 0-TÓL 5-IG • JÁTÉK"
    base="g1-c5-a-harom"
    chapterId="szamolas-5-ig"
    questions={A_HAROM_G1_QUESTIONS}
    pairs={A_HAROM_G1_PAIRS}
    sort={A_HAROM_G1_SORT}
    {...props}
  />
);

export default AHaromG1Jatek;
