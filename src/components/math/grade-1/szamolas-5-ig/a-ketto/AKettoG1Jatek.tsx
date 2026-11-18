import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { Domino, Hand, IconGroup, NumberLine, BigSign, IconName } from '../../shared/G1Pics';
import { CherryScene, CompareScene, DotPairs, FlowerBedScene, GroupBox, JumpLineScene, MiniGroup, ThingPic, ZumiWingsScene } from './AKettoG1Scenes';

const pic = (icon: IconName, n: number, say: string, crossed = 0) => ({ figure: <GroupBox icon={icon} n={n} crossed={crossed} />, say });
const dom = (n: number, say: string) => ({ figure: <Domino left={n} single />, say });
const hand = (n: number, say: string) => ({ figure: <Hand fingers={n} />, say });

export const A_KETTO_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – felismerés
  { id: 'k1', level: 1, badge: 'Számlálás', ask: 'Hány szárnya van Züminek?', scene: <ZumiWingsScene />, options: [2, 1], hint: 'Mutass rá mindegyik szárnyra! Egy, és még egy.' },
  { id: 'k2', level: 1, badge: 'Kettő vagy több', ask: 'Hol van két virág?', options: [pic('virag', 2, 'két virág'), pic('virag', 1, 'egy virág'), pic('virag', 4, 'sok virág')], hint: 'Számold meg! Egy, kettő. Hol van pont ennyi?' },
  { id: 'k3', level: 1, badge: 'Számjegy', ask: 'Melyik a kettes?', options: [{ figure: <BigSign text="2" />, say: 'kettes' }, { figure: <BigSign text="1" />, say: 'egyes' }], hint: 'Az egyes egy egyenes bot. A kettes alja egyenes vonal.' },
  { id: 'k4', level: 1, badge: 'Ujjkép', ask: 'Melyik kéz mutat kettőt?', options: [hand(2, 'két ujj'), hand(1, 'egy ujj'), hand(4, 'sok ujj')], hint: 'Számold meg a fenti ujjakat! Kettő legyen.' },
  { id: 'k5', level: 1, badge: 'Dominó', ask: 'Hol van két pötty?', options: [dom(2, 'két pötty'), dom(1, 'egy pötty'), dom(3, 'sok pötty')], hint: 'Számold meg a pöttyöket a dominón!' },
  { id: 'k6', level: 1, badge: 'Számlálás', ask: 'Hány cseresznye lóg itt?', scene: <CherryScene pairs={1} />, options: [2, 1], hint: 'Mutass rá mindegyik piros cseresznyére!' },
  { id: 'k7', level: 1, badge: 'Számlálás', ask: 'Hány méh repül?', scene: <IconGroup icon="meh" n={2} className="w-44 h-28 mx-auto" />, options: [2, 1], hint: 'Mutass rá a méhekre, egyenként!' },
  { id: 'k8', level: 1, badge: 'Egy vagy kettő', ask: 'Hány madár ül itt?', scene: <IconGroup icon="madar" n={1} className="w-32 h-28 mx-auto" />, options: [1, 2], hint: 'Nézd meg jól! Csak egy madarat látsz?' },
  // 2. szint – kettőnél több, kevesebb, számegyenes
  { id: 'k9', level: 2, badge: 'Kettőnél több', ask: 'Hol van kettőnél több?', options: [pic('hal', 3, 'sok hal'), pic('hal', 2, 'két hal'), pic('hal', 1, 'egy hal')], hint: 'Ott csak kettő vagy egy hal van. Hol van több?' },
  { id: 'k10', level: 2, badge: 'Számegyenes', ask: 'Melyik szám kell a ? helyére?', say: 'Melyik szám kell a kérdőjel helyére a számegyenesen?', scene: <NumberLine max={5} question={2} />, options: [2, 1], hint: 'Az egyes után melyik szám jön?' },
  { id: 'k11', level: 2, badge: 'Párosítás', ask: 'Melyik kép illik a 2-höz?', scene: <BigSign text="2" className="w-24 h-24 mx-auto" />, options: [pic('eper', 2, 'két eper'), pic('eper', 1, 'egy eper'), pic('eper', 3, 'sok eper')], hint: 'A kettőhöz két tárgy kell. Számold meg!' },
  { id: 'k12', level: 2, badge: 'Ujjkép', ask: 'Hány ujj van fent?', scene: <Hand fingers={2} className="w-32 h-32 mx-auto" />, options: [2, 1], hint: 'A mutatóujj és a középső ujj van fent. Számold meg!' },
  { id: 'k13', level: 2, badge: 'Dominó', ask: 'Melyik dominó illik a 2-höz?', scene: <BigSign text="2" className="w-24 h-24 mx-auto" />, options: [dom(2, 'két pötty'), dom(1, 'egy pötty')], hint: 'A kettőhöz két pötty illik.' },
  { id: 'k14', level: 2, badge: 'Ugrás', ask: 'Hová ért Zümi?', say: 'Zümi az elejéről indult, és ugrált a számegyenesen. Hová ért?', scene: <JumpLineScene steps={2} />, options: [2, 1], hint: 'Számold meg az íveket! Annyit ugrott.' },
  { id: 'k15', level: 2, badge: 'Kettőnél kevesebb', ask: 'Hol van kettőnél kevesebb?', options: [pic('csiga', 1, 'egy csiga'), pic('csiga', 2, 'két csiga'), pic('csiga', 3, 'sok csiga')], hint: 'Kevesebb, mint kettő: az csak egy.' },
  { id: 'k16', level: 2, badge: 'Számegyenes', ask: 'Melyik számnál van a pötty?', say: 'Melyik számnál van a piros pötty?', scene: <NumberLine max={5} mark={[2]} hideLabels={[2]} />, options: [2, 1], hint: 'Nézd meg, mi jön az egyes után!' },
  // 3. szint – összehasonlítás, elvétel, kis történetek
  { id: 'k17', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: 'Két labda, és egy labda. Melyik jel kell középre?', scene: <CompareScene icon="labda" a={2} b={1} />, options: ['>', '<', '='], hint: 'Jobb oldalon kevesebb van. A jel hegye arra mutasson!' },
  { id: 'k18', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: 'Egy virág, és két virág. Melyik jel kell középre?', scene: <CompareScene icon="virag" a={1} b={2} />, options: ['<', '>', '='], hint: 'Bal oldalon csak egy van. A hegye a kevesebb felé mutat.' },
  { id: 'k19', level: 3, badge: 'Ugyanannyi', ask: 'Melyik jel kell?', say: 'Két hal, és két hal. Melyik jel kell középre?', scene: <CompareScene icon="hal" a={2} b={2} />, options: ['=', '<', '>'], hint: 'Számold meg mindkét oldalt! Ugyanannyi?' },
  { id: 'k20', level: 3, badge: 'Elvétel', ask: 'Hol maradt kettő?', say: 'Csigusz áthúzott néhány gombát. Melyik képen maradt kettő?', options: [pic('gomba', 3, 'egyet áthúzott', 1), pic('gomba', 3, 'semmit sem húzott át', 0), pic('gomba', 3, 'kettőt áthúzott', 2)], hint: 'Csak azokat számold, amelyek nincsenek áthúzva!' },
  { id: 'k21', level: 3, badge: 'Kakukktojás', ask: 'Melyik NEM kettő?', say: 'Három kép közül kettőn kettő látszik. Melyik nem kettő?', options: [pic('gomba', 1, 'egy gomba'), hand(2, 'két ujj'), pic('meh', 2, 'két méh')], hint: 'Számold meg mindegyiket! Hol nem kettő van?' },
  { id: 'k22', level: 3, badge: 'Párosítás', ask: 'Melyik illik a kézhez?', say: 'A kéz két ujjat mutat. Melyik dominó illik hozzá?', scene: <Hand fingers={2} className="w-28 h-28 mx-auto" />, options: [dom(2, 'két pötty'), dom(1, 'egy pötty'), dom(4, 'sok pötty')], hint: 'Két ujj, két pötty.' },
  { id: 'k23', level: 3, badge: 'Párban', ask: 'Miből van kettő?', say: 'Melyikből van kettő? Koppints arra, ami párban jár!', options: [{ figure: <ThingPic kind="szemek" />, say: 'szemek' }, { figure: <ThingPic kind="nap" />, say: 'nap' }, { figure: <ThingPic kind="orr" />, say: 'orr' }], hint: 'A nap és az orr csak egy. Mi jár párban?' },
  { id: 'k24', level: 3, badge: 'Kis történet', ask: 'Hány virágon járt Zümi?', say: 'Zümi először egy virágra szállt, aztán még egy virágra. Hány virágon járt?', scene: <FlowerBedScene n={2} bee />, options: [2, 1], hint: 'Egy virág, és még egy. Mennyi az?' },
];

export const A_KETTO_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Koppints bal oldalon egy képre, aztán jobb oldalon arra, ami illik hozzá!',
    pairs: [
      { a: { figure: <MiniGroup icon="alma" n={2} />, say: 'két alma' }, b: 2 },
      { a: { figure: <MiniGroup icon="alma" n={1} />, say: 'egy alma' }, b: 1 },
      { a: { figure: <Hand fingers={2} className="w-16 h-16" />, say: 'két ujj' }, b: { figure: <Domino left={2} single className="w-14 h-14" />, say: 'két pötty' } },
      { a: { figure: <Hand fingers={1} className="w-16 h-16" />, say: 'egy ujj' }, b: { figure: <Domino left={1} single className="w-14 h-14" />, say: 'egy pötty' } },
    ],
  },
  2: {
    say: 'Keresd meg, mi illik össze! Ugyanannyi legyen.',
    pairs: [
      { a: { figure: <MiniGroup icon="hal" n={2} />, say: 'két hal' }, b: { figure: <MiniGroup icon="csillag" n={2} />, say: 'két csillag' } },
      { a: { figure: <MiniGroup icon="hal" n={1} />, say: 'egy hal' }, b: { figure: <MiniGroup icon="csillag" n={1} />, say: 'egy csillag' } },
      { a: { figure: <MiniGroup icon="hal" n={4} />, say: 'sok hal' }, b: 'sok' },
      { a: 2, b: { figure: <Hand fingers={2} className="w-16 h-16" />, say: 'két ujj' } },
      { a: { figure: <Domino left={1} single className="w-14 h-14" />, say: 'egy pötty' }, b: { figure: <MiniGroup icon="eper" n={1} />, say: 'egy eper' } },
    ],
  },
  3: {
    say: 'Párosítsd a jeleket a képekhez! Kék és piros korongokat látsz.',
    pairs: [
      { a: '2 > 1', b: { figure: <DotPairs a={2} b={1} />, say: 'két kék, egy piros' } },
      { a: '1 < 2', b: { figure: <DotPairs a={1} b={2} />, say: 'egy kék, két piros' } },
      { a: '2 = 2', b: { figure: <DotPairs a={2} b={2} />, say: 'két kék, két piros' } },
      { a: '1 = 1', b: { figure: <DotPairs a={1} b={1} />, say: 'egy kék, egy piros' } },
    ],
  },
};

export const A_KETTO_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Hová való a kép? Ahol egy van, az az egy kosár. Ahol kettő van, az a kettő kosár.',
    bins: [
      { label: 'Egy', figure: <IconGroup icon="csillag" n={1} className="w-12 h-12" />, say: 'egy' },
      { label: 'Kettő', figure: <IconGroup icon="csillag" n={2} className="w-20 h-12" />, say: 'kettő' },
    ],
    items: [
      { item: { figure: <MiniGroup icon="alma" n={1} />, say: 'alma' }, bin: 0 },
      { item: { figure: <MiniGroup icon="alma" n={2} />, say: 'almák' }, bin: 1 },
      { item: { figure: <MiniGroup icon="meh" n={2} />, say: 'méhek' }, bin: 1 },
      { item: { figure: <MiniGroup icon="labda" n={1} />, say: 'labda' }, bin: 0 },
      { item: { figure: <MiniGroup icon="virag" n={2} />, say: 'virágok' }, bin: 1 },
      { item: { figure: <MiniGroup icon="katica" n={1} />, say: 'katica' }, bin: 0 },
    ],
  },
  2: {
    say: 'Három kosár van: egy, kettő, és több. Hová való?',
    bins: [
      { label: '1', say: 'egy' },
      { label: '2', say: 'kettő' },
      { label: 'Több', say: 'kettőnél több' },
    ],
    items: [
      { item: { figure: <Hand fingers={2} className="w-16 h-16" />, say: 'kéz' }, bin: 1 },
      { item: { figure: <Hand fingers={1} className="w-16 h-16" />, say: 'kéz' }, bin: 0 },
      { item: { figure: <Domino left={2} single className="w-14 h-14" />, say: 'dominó' }, bin: 1 },
      { item: { figure: <Domino left={5} single className="w-14 h-14" />, say: 'dominó' }, bin: 2 },
      { item: { figure: <MiniGroup icon="hal" n={3} />, say: 'halak' }, bin: 2 },
      { item: { figure: <MiniGroup icon="eper" n={2} />, say: 'eprek' }, bin: 1 },
      { item: { figure: <MiniGroup icon="pillango" n={1} />, say: 'pillangó' }, bin: 0 },
      { item: 2, bin: 1 },
    ],
  },
  3: {
    say: 'Mi jár párban, és miből van csak egy? Tedd a jó kosárba!',
    bins: [
      { label: 'Egy', figure: <BigSign text="1" className="w-12 h-12" />, say: 'egy' },
      { label: 'Kettő', figure: <BigSign text="2" className="w-12 h-12" />, say: 'kettő, párban' },
    ],
    items: [
      { item: { figure: <ThingPic kind="zokni" />, say: 'zokni' }, bin: 1 },
      { item: { figure: <ThingPic kind="nap" />, say: 'nap' }, bin: 0 },
      { item: { figure: <ThingPic kind="szemek" />, say: 'szemek' }, bin: 1 },
      { item: { figure: <ThingPic kind="hold" />, say: 'hold' }, bin: 0 },
      { item: { figure: <ThingPic kind="cseresznye" />, say: 'cseresznye' }, bin: 1 },
      { item: { figure: <ThingPic kind="orr" />, say: 'orr' }, bin: 0 },
      { item: { figure: <ThingPic kind="kesztyu" />, say: 'kesztyű' }, bin: 1 },
      { item: { figure: <ThingPic kind="csiga1" />, say: 'Csigusz' }, bin: 0 },
    ],
  },
};

export const AKettoG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="2. A kettő"
    badge="1. OSZTÁLY • II. SZÁMOLÁS 0-TÓL 5-IG • JÁTÉK"
    base="g1-c5-a-ketto"
    chapterId="szamolas-5-ig"
    questions={A_KETTO_G1_QUESTIONS}
    pairs={A_KETTO_G1_PAIRS}
    sort={A_KETTO_G1_SORT}
    {...props}
  />
);

export default AKettoG1Jatek;
