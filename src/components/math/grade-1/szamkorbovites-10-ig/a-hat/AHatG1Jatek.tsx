import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { Domino, IconGroup, NumberLine, BigSign, IconName } from '../../shared/G1Pics';
import { JumpLineScene } from '../../szamolas-5-ig/a-ketto/AKettoG1Scenes';
import { Box6, Compare6, Disks, Fingers, LegsScene, Mini6, PotyiDotsScene, RowScene } from './AHatG1Scenes';

const pic = (icon: IconName, n: number, say: string, crossed = 0) => ({ figure: <Box6 icon={icon} n={n} crossed={crossed} />, say });
const dom = (n: number, say: string) => ({ figure: <Domino left={n} single />, say });
const fing = (n: number, say: string) => ({ figure: <Fingers n={n} />, say });
const sm = (node: React.ReactNode, say: string) => ({ figure: node, say });

export const A_HAT_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – felismerés, számlálás
  { id: 'hat1', level: 1, badge: 'Számlálás', ask: 'Hány lába van Pötyinek?', say: 'Számold meg Pötyi lábait! Hány lába van?', scene: <LegsScene />, options: [6, 5, 4], hint: 'Mindkét oldalon számold meg a lábakat: három és még három.' },
  { id: 'hat2', level: 1, badge: 'Hat', ask: 'Hol van hat eper?', options: [pic('eper', 6, 'hat eper'), pic('eper', 5, 'öt eper'), pic('eper', 4, 'négy eper')], hint: 'Számold meg mindegyik dobozt! Hat legyen benne.' },
  { id: 'hat3', level: 1, badge: 'Számjegy', ask: 'Melyik a hatos?', options: [sm(<BigSign text="6" />, 'hatos'), sm(<BigSign text="5" />, 'ötös'), sm(<BigSign text="0" />, 'nulla')], hint: 'A hatos fent kanyarral indul, alul kerek pocakja van.' },
  { id: 'hat4', level: 1, badge: 'Ujjkép', ask: 'Melyik mutat hat ujjat?', say: 'Melyik képen van fent hat ujj?', options: [fing(6, 'hat ujj'), fing(5, 'öt ujj'), fing(4, 'négy ujj')], hint: 'Egy kézen csak öt ujj van. A hathoz a másik kéz is kell!' },
  { id: 'hat5', level: 1, badge: 'Dominó', ask: 'Hol van hat pötty?', options: [dom(6, 'hat pötty'), dom(5, 'öt pötty'), dom(4, 'négy pötty')], hint: 'Számold meg a pöttyöket a dominón!' },
  { id: 'hat6', level: 1, badge: 'Számlálás', ask: 'Hány gomba nő itt?', scene: <RowScene icon="gomba" n={6} />, options: [6, 5, 4], hint: 'Mutass rá mindegyik gombára, egyenként!' },
  { id: 'hat7', level: 1, badge: 'Számlálás', ask: 'Hány pötty van Pötyi hátán?', scene: <PotyiDotsScene dots={6} />, options: [6, 5, 3], hint: 'Az egyik szárnyán öt van. Ne felejtsd el a másik szárnyát!' },
  { id: 'hat8', level: 1, badge: 'Számlálás', ask: 'Hány madár repül?', scene: <IconGroup icon="madar" n={6} perRow={3} className="w-44 h-32 mx-auto" />, options: [6, 4, 5], hint: 'Mutass rá a madarakra soronként!' },
  // 2. szint – több, kevesebb, számegyenes, kiegészítés
  { id: 'hat9', level: 2, badge: 'Hatnál kevesebb', ask: 'Hol van hatnál kevesebb?', options: [pic('hal', 4, 'négy hal'), pic('hal', 6, 'hat hal')], hint: 'Ott pont hat van. Hol van kevesebb?' },
  { id: 'hat10', level: 2, badge: 'Számegyenes', ask: 'Melyik szám kell a ? helyére?', say: 'Melyik szám kell a kérdőjel helyére a számegyenesen?', scene: <NumberLine max={6} question={6} />, options: [6, 5, 4], hint: 'Az öt után melyik szám jön?' },
  { id: 'hat11', level: 2, badge: 'Párosítás', ask: 'Melyik kép illik a 6-hoz?', scene: <BigSign text="6" className="w-24 h-24 mx-auto" />, options: [pic('alma', 6, 'hat alma'), pic('alma', 5, 'öt alma'), pic('alma', 3, 'három alma')], hint: 'A hatoshoz hat tárgy kell. Számold meg!' },
  { id: 'hat12', level: 2, badge: 'Ujjkép', ask: 'Hány ujj van fent?', scene: <Fingers n={6} className="w-56 h-32 mx-auto" />, options: [6, 5, 1], hint: 'Számold meg mindkét kezet! Öt, és még…' },
  { id: 'hat13', level: 2, badge: 'Kiegészítés', ask: 'Hány kell még, hogy 6 legyen?', say: 'Pötyi négy epret hozott. Hány eper kell még, hogy hat legyen?', scene: <RowScene icon="eper" n={4} tag="6" />, options: [2, 1, 3], hint: 'Négy van. Számolj tovább az ujjaiddal: öt, hat. Hányat számoltál?' },
  { id: 'hat14', level: 2, badge: 'Dominó', ask: 'Melyik dominó illik a 6-hoz?', scene: <BigSign text="6" className="w-24 h-24 mx-auto" />, options: [dom(6, 'hat pötty'), dom(5, 'öt pötty')], hint: 'A hatoshoz hat pötty illik. Számold meg!' },
  { id: 'hat15', level: 2, badge: 'Lépések', ask: 'Hová ért Zümi?', say: 'Zümi a nullától indult, és ugrált a számegyenesen. Hová ért?', scene: <JumpLineScene steps={6} max={6} icon="meh" />, options: [6, 5, 4], hint: 'Számold meg az íveket! Annyit ugrott.' },
  { id: 'hat16', level: 2, badge: 'Kisebb, nagyobb', ask: 'Melyik a nagyobb szám?', say: 'Melyik a nagyobb szám: a hat vagy a négy?', scene: <NumberLine max={6} mark={[4, 6]} />, options: [6, 4], hint: 'A számegyenesen a nagyobb szám jobbra, messzebb van.' },
  // 3. szint – összehasonlítás, elvétel, rejtett rész, bontás
  { id: 'hat17', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: 'Hat labda, és öt labda. Melyik jel kell középre?', scene: <Compare6 icon="labda" a={6} b={5} />, options: ['>', '<', '='], hint: 'Jobb oldalon kevesebb van. A jel hegye arra mutasson!' },
  { id: 'hat18', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: 'Négy virág, és hat virág. Melyik jel kell középre?', scene: <Compare6 icon="virag" a={4} b={6} />, options: ['<', '>', '='], hint: 'Bal oldalon kevesebb van. A hegye a kevesebb felé mutat.' },
  { id: 'hat19', level: 3, badge: 'Ugyanannyi', ask: 'Melyik jel kell?', say: 'Hat hal, és hat hal. Melyik jel kell középre?', scene: <Compare6 icon="hal" a={6} b={6} />, options: ['=', '<', '>'], hint: 'Számold meg mindkét oldalt! Ugyanannyi?' },
  { id: 'hat20', level: 3, badge: 'Elvétel', ask: 'Hány gomba maradt?', say: 'Hat gomba volt. Csigusz egyet megevett, azt áthúztuk. Hány gomba maradt?', scene: <RowScene icon="gomba" n={6} crossed={1} />, options: [5, 6, 4], hint: 'Csak azokat számold, amelyek nincsenek áthúzva!' },
  { id: 'hat21', level: 3, badge: 'Rejtett rész', ask: 'Hány alma bújik a levél alatt?', say: 'Hat alma van. Négyet látsz, a többi a levél alatt bújik. Hány alma van a levél alatt?', scene: <RowScene icon="alma" n={4} hidden tag="6" />, options: [2, 1, 3], hint: 'Négy látszik. Számolj tovább hatig: öt, hat!' },
  { id: 'hat22', level: 3, badge: 'Kakukktojás', ask: 'Melyik NEM hat?', say: 'Két képen hat látszik. Melyik nem hat?', options: [pic('meh', 5, 'öt méh'), fing(6, 'hat ujj'), dom(6, 'hat pötty')], hint: 'Számold meg mindegyiket! Hol nem hat van?' },
  { id: 'hat23', level: 3, badge: 'Mennyivel több?', ask: 'Mennyivel több alma van bal oldalon?', say: 'Bal oldalon hat alma van, jobb oldalon négy. Mennyivel több van a bal oldalon?', scene: <Compare6 icon="alma" a={6} b={4} noSign />, options: [2, 1, 6], hint: 'Párosítsd az almákat! Hány alma marad bal oldalon pár nélkül?' },
  { id: 'hat24', level: 3, badge: 'Bontás', ask: 'Melyik lesz hat?', say: 'Melyik összeadás lesz hat?', scene: <Disks a={5} b={1} className="w-36 h-28 mx-auto" />, options: ['5 + 1', '4 + 1', '3 + 2'], hint: 'Rakd ki az ujjaidon! Melyiknél lesz hat ujj fent?' },
];

export const A_HAT_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Koppints bal oldalon egy képre, aztán jobb oldalon arra, ami illik hozzá!',
    pairs: [
      { a: sm(<Mini6 icon="alma" n={6} />, 'hat alma'), b: 6 },
      { a: sm(<Mini6 icon="alma" n={5} />, 'öt alma'), b: 5 },
      { a: sm(<Mini6 icon="labda" n={4} />, 'négy labda'), b: 4 },
      { a: sm(<Fingers n={3} className="w-16 h-16" />, 'három ujj'), b: sm(<Domino left={3} single className="w-14 h-14" />, 'három pötty') },
    ],
  },
  2: {
    say: 'Keresd meg, mi illik össze! Ugyanannyi legyen.',
    pairs: [
      { a: sm(<Mini6 icon="hal" n={6} />, 'hat hal'), b: sm(<Mini6 icon="csillag" n={6} />, 'hat csillag') },
      { a: sm(<Mini6 icon="hal" n={4} />, 'négy hal'), b: sm(<Mini6 icon="csillag" n={4} />, 'négy csillag') },
      { a: 5, b: sm(<Fingers n={5} className="w-16 h-16" />, 'öt ujj') },
      { a: sm(<Domino left={2} single className="w-14 h-14" />, 'két pötty'), b: sm(<Mini6 icon="eper" n={2} />, 'két eper') },
    ],
  },
  3: {
    say: 'Hat korong, pirosak és kékek. Párosítsd az összeadást a képhez!',
    pairs: [
      { a: '5 + 1', b: sm(<Disks a={5} b={1} />, 'öt piros, egy kék') },
      { a: '4 + 2', b: sm(<Disks a={4} b={2} />, 'négy piros, két kék') },
      { a: '3 + 3', b: sm(<Disks a={3} b={3} />, 'három piros, három kék') },
      { a: '6 + 0', b: sm(<Disks a={6} b={0} />, 'hat piros, nulla kék') },
    ],
  },
};

export const A_HAT_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Hat, vagy nem hat? Számold meg, és tedd a jó kosárba!',
    bins: [
      { label: 'Hat', figure: <BigSign text="6" className="w-12 h-12" />, say: 'hat' },
      { label: 'Nem hat', say: 'nem hat' },
    ],
    items: [
      { item: sm(<Mini6 icon="gomba" n={6} />, 'gombák'), bin: 0 },
      { item: sm(<Mini6 icon="gomba" n={5} />, 'gombák'), bin: 1 },
      { item: sm(<Mini6 icon="labda" n={6} />, 'labdák'), bin: 0 },
      { item: sm(<Mini6 icon="labda" n={3} />, 'labdák'), bin: 1 },
      { item: sm(<Domino left={6} single className="w-14 h-14" />, 'dominó'), bin: 0 },
      { item: sm(<Mini6 icon="virag" n={4} />, 'virágok'), bin: 1 },
      { item: sm(<Mini6 icon="katica" n={6} />, 'katicák'), bin: 0 },
    ],
  },
  2: {
    say: 'Három kosár van: négy, öt, hat. Hová való?',
    bins: [
      { label: '4', say: 'négy' },
      { label: '5', say: 'öt' },
      { label: '6', say: 'hat' },
    ],
    items: [
      { item: sm(<Fingers n={6} className="w-24 h-16" />, 'két kéz'), bin: 2 },
      { item: sm(<Fingers n={4} className="w-16 h-16" />, 'kéz'), bin: 0 },
      { item: sm(<Domino left={5} single className="w-14 h-14" />, 'dominó'), bin: 1 },
      { item: sm(<Domino left={6} single className="w-14 h-14" />, 'dominó'), bin: 2 },
      { item: sm(<Mini6 icon="hal" n={4} />, 'halak'), bin: 0 },
      { item: sm(<Mini6 icon="eper" n={5} />, 'eprek'), bin: 1 },
      { item: sm(<Mini6 icon="pillango" n={6} />, 'pillangók'), bin: 2 },
      { item: 5, bin: 1 },
    ],
  },
  3: {
    say: 'Melyikből lesz hat? Számold ki, és tedd a jó kosárba!',
    bins: [
      { label: 'Hat lesz', figure: <BigSign text="6" className="w-12 h-12" />, say: 'hat lesz' },
      { label: 'Nem hat', say: 'nem hat lesz' },
    ],
    items: [
      { item: '5 + 1', bin: 0 },
      { item: '3 + 3', bin: 0 },
      { item: '4 + 1', bin: 1 },
      { item: '2 + 4', bin: 0 },
      { item: '6 − 0', bin: 0 },
      { item: '3 + 2', bin: 1 },
      { item: '6 − 1', bin: 1 },
      { item: '2 + 2', bin: 1 },
    ],
  },
};

export const AHatG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="1. A hat"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • JÁTÉK"
    base="g1-c10-a-hat"
    chapterId="szamkorbovites-10-ig"
    questions={A_HAT_G1_QUESTIONS}
    pairs={A_HAT_G1_PAIRS}
    sort={A_HAT_G1_SORT}
    {...props}
  />
);

export default AHatG1Jatek;
