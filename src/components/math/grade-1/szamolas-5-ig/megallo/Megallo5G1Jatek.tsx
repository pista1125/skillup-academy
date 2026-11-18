import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { BigSign, Domino, Hand, IconGroup, IconName, NumberLine, TenFrame } from '../../shared/G1Pics';
import { Potyi } from '../../shared/Potyi';
import { CompareScene, GroupBox, JumpLineScene, MiniGroup } from '../a-ketto/AKettoG1Scenes';
import { FriendsScene } from '../a-harom/AHaromG1Scenes';
import { BasketBox, NestScene } from '../a-nulla/ANullaG1Scenes';
import { BackJumpScene, FlyAwayScene, PicnicScene, SentenceScene, SentenceStrip } from '../kivonas-0-tol-5-ig/Kivonas0Tol5IgG1Scenes';
import { AddScene, ApplePyramid, CrateTowerScene, WheelbarrowScene } from './Megallo5G1Scenes';

const sm = (node: React.ReactNode, say: string) => ({ figure: node, say });
const pic = (icon: IconName, n: number, say: string) => sm(<GroupBox icon={icon} n={n} />, say);
const dom = (n: number, say: string) => sm(<Domino left={n} single />, say);
const domS = (n: number, say: string) => sm(<Domino left={n} single className="w-14 h-14" />, say);
const hand = (n: number, say: string) => sm(<Hand fingers={n} className="w-16 h-16" />, say);
const sign = (t: string, say: string) => sm(<BigSign text={t} />, say);
const crate = (icon: IconName) => sm(<BasketBox n={1} icon={icon} />, icon === 'alma' ? 'alma' : icon === 'eper' ? 'eper' : 'gomba');

const TOWER: IconName[] = ['eper', 'alma', 'gomba'];

export const MEGALLO5_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – számlálás, számjegyek, ujj- és dominókép, egyszerű képes műveletek
  { id: 'm1', level: 1, badge: 'Számlálás', ask: 'Hány alma van a kosárban?', scene: <BasketBox n={3} icon="alma" className="w-44 h-36 mx-auto" />, options: [3, 4, 2], hint: 'Mutass rá mindegyik almára, egyenként!' },
  { id: 'm2', level: 1, badge: 'Számlálás', ask: 'Hány csillag van az égen?', scene: <IconGroup icon="csillag" n={5} className="w-64 h-auto mx-auto" />, options: [5, 4, 3], hint: 'Számolj balról jobbra, és mutass rá mindegyikre!' },
  { id: 'm3', level: 1, badge: 'Számjegy', ask: 'Melyik a négyes?', options: [sign('4', 'négyes'), sign('1', 'egyes'), sign('5', 'ötös')], hint: 'A négyesnek van egy hegyes sarka és egy hosszú lába.' },
  { id: 'm4', level: 1, badge: 'Számjegy', ask: 'Melyik az ötös?', options: [sign('5', 'ötös'), sign('2', 'kettes'), sign('3', 'hármas')], hint: 'Az ötösnek kalapja van, alul egy nagy pocakja.' },
  { id: 'm5', level: 1, badge: 'Ujjkép', ask: 'Hány ujj van fent?', scene: <Hand fingers={4} className="w-32 h-32 mx-auto" />, options: [4, 5, 3], hint: 'Számold meg a fenti ujjakat egyenként!' },
  { id: 'm6', level: 1, badge: 'Dominó', ask: 'Hol van öt pötty?', options: [dom(5, 'öt pötty'), dom(4, 'négy pötty'), dom(3, 'három pötty')], hint: 'Az ötös dominón a négy sarokban és középen is van pötty.' },
  { id: 'm7', level: 1, badge: 'Nulla', ask: 'Hány tojás van a fészekben?', scene: <NestScene eggs={0} />, options: [0, 1, 2], hint: 'Nézd meg jól a fészket! Van benne tojás?' },
  { id: 'm8', level: 1, badge: 'Ugyanannyi', ask: 'Melyik kép illik a 3-hoz?', scene: <BigSign text="3" className="w-24 h-24 mx-auto" />, options: [pic('eper', 3, 'három eper'), pic('eper', 2, 'két eper'), pic('eper', 4, 'négy eper')], hint: 'A hármashoz három eper kell. Számold meg!' },
  { id: 'm9', level: 1, badge: 'Számlálás', ask: 'Hány pötty van Pötyi hátán?', scene: <Potyi dots={5} mood="happy" className="w-40 h-40 mx-auto" />, options: [5, 4, 3], hint: 'Számold meg a pöttyöket mindkét szárnyán!' },
  { id: 'm10', level: 1, badge: 'Elvétel', ask: 'Hány madár maradt a kerítésen?', say: '3 madár ült a kerítésen. 2 elrepült. Hány madár maradt a kerítésen?', scene: <FlyAwayScene icon="madar" stay={1} gone={2} />, options: [1, 3, 2], hint: 'A repülőket ne számold, csak a kerítésen ülőket!' },
  { id: 'm11', level: 1, badge: 'Hozzáadás', ask: 'Hány gomba lesz a kosárban?', say: 'A kosárban 2 gomba van. Zümi hoz még 1-et. Hány gomba lesz a kosárban?', scene: <AddScene icon="gomba" have={2} add={1} />, options: [3, 2, 1], hint: 'Számolj tovább a 2-től: még egy!' },
  { id: 'm12', level: 1, badge: 'Számegyenes', ask: 'Melyik szám kell a ? helyére?', say: 'Melyik szám kell a kérdőjel helyére a számegyenesen?', scene: <NumberLine max={5} question={4} />, options: [4, 3, 5], hint: 'A 3 után melyik szám jön?' },
  // 2. szint – műveletek, jelek, számegyenes, helyzet
  { id: 'm13', level: 2, badge: 'Összeadás', ask: 'Mennyi 2 + 2?', say: 'Pötyi 2 piros és 2 kék korongot rakott ki. Mennyi 2 + 2?', scene: <TenFrame n={2} second={2} />, options: [4, 2, 5], hint: 'Számold meg az összes korongot, a pirosat és a kéket is!' },
  { id: 'm14', level: 2, badge: 'Kivonás', ask: 'Mennyi 5 − 1?', scene: <SentenceScene icon="alma" a={5} b={1} />, options: [4, 5, 3], hint: 'Az áthúzott almát ne számold!' },
  { id: 'm15', level: 2, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: '4 virág, és 5 virág. Melyik jel kell középre?', scene: <CompareScene icon="virag" a={4} b={5} />, options: ['<', '>', '='], hint: 'Bal oldalon kevesebb van. A jel hegye a kevesebb felé mutat.' },
  { id: 'm16', level: 2, badge: 'Ugyanannyi', ask: 'Melyik jel kell?', say: '4 hal, és 4 hal. Melyik jel kell középre?', scene: <CompareScene icon="hal" a={4} b={4} />, options: ['=', '<', '>'], hint: 'Számold meg mindkét oldalt! Ugyanannyi?' },
  { id: 'm17', level: 2, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: '5 és 3. Melyik jel kell a kérdőjel helyére?', scene: <SentenceStrip text="5  ?  3" />, options: ['>', '<', '='], hint: 'Az 5 több, mint a 3. A jel hegye a kisebb felé mutasson!' },
  { id: 'm18', level: 2, badge: 'Melyik művelet?', ask: 'Melyik illik a képhez?', say: 'A kosárban 3 labda van, Zümi hoz még 2-t. Melyik művelet illik a képhez?', scene: <AddScene icon="labda" have={3} add={2} />, options: ['3 + 2 = 5', '3 − 2 = 1', '5 − 3 = 2'], hint: 'A labdák a kosárba jönnek: több lesz. Ez összeadás vagy kivonás?' },
  { id: 'm19', level: 2, badge: 'Melyik művelet?', ask: 'Melyik illik a képhez?', say: 'A levélen 3 eper volt, Csigusz megevett 1-et. Melyik művelet illik a képhez?', scene: <PicnicScene total={3} eaten={1} />, options: ['3 − 1 = 2', '3 + 1 = 4', '2 − 1 = 1'], hint: 'Az eper elfogyott: kevesebb lett. Hány volt az elején?' },
  { id: 'm20', level: 2, badge: 'Számegyenes', ask: 'Hová ért Zümi?', say: 'Zümi a nulláról indult, és ugrált a számegyenesen. Hová ért?', scene: <JumpLineScene steps={5} icon="meh" />, options: [5, 4, 3], hint: 'Számold meg az íveket! Annyit ugrott.' },
  { id: 'm21', level: 2, badge: 'Visszalépés', ask: 'Hová ért Csigusz?', say: 'Csigusz a 3-ról indult, és 3-at lépett vissza. Hová ért?', scene: <BackJumpScene from={3} steps={3} />, options: [0, 1, 3], hint: 'Lépj vissza ívenként egyet a 3-ról!' },
  { id: 'm22', level: 2, badge: 'Fent, lent', ask: 'Mi van a legalsó ládában?', scene: <CrateTowerScene items={TOWER} />, options: [crate('gomba'), crate('eper'), crate('alma')], hint: 'Legalul: ez a láda van a földön, a többi rajta.' },
  { id: 'm23', level: 2, badge: 'Párosítás', ask: 'Melyik dominó illik a kézhez?', say: 'A kéz 5 ujjat mutat. Melyik dominó illik hozzá?', scene: <Hand fingers={5} className="w-28 h-28 mx-auto" />, options: [dom(5, 'öt pötty'), dom(4, 'négy pötty'), dom(2, 'két pötty')], hint: 'Öt ujj, öt pötty.' },
  { id: 'm24', level: 2, badge: 'Sorrend', ask: 'Melyik a legkisebb szám?', say: 'Melyik a legkisebb szám ezek közül?', options: [0, 2, 4, 5], hint: 'Melyik van a számegyenes legelején?' },
  // 3. szint – bontás, számpiramis, két lépés, jelek műveletekkel, helyzet
  { id: 'm25', level: 3, badge: 'Bontás', ask: 'Hány répa van a kendő alatt?', say: 'A talicskában 5 répa van. 1 kilátszik. Hány répa van a kendő alatt?', scene: <WheelbarrowScene visible={1} hidden={4} />, options: [4, 1, 5], hint: 'Számolj tovább az 1-től az 5-ig! Hányat számoltál?' },
  { id: 'm26', level: 3, badge: 'Bontás', ask: 'Hány répa van a kendő alatt?', say: 'A talicskában 5 répa van. 3 kilátszik. Hány répa van a kendő alatt?', scene: <WheelbarrowScene visible={3} hidden={2} />, options: [2, 3, 5], hint: 'Számolj tovább a 3-tól az 5-ig: 4, 5. Hányat számoltál?' },
  { id: 'm27', level: 3, badge: 'Számpiramis', ask: 'Mi kerül a felső almába?', say: 'A felső almába az alatta lévő két szám összege kerül. Lent 2 és 3 van. Mi kerül fölülre?', scene: <ApplePyramid top={null} left={2} right={3} />, options: [5, 4, 1], hint: 'Add össze a két alsó számot: 2 + 3.' },
  { id: 'm28', level: 3, badge: 'Számpiramis', ask: 'Melyik szám hiányzik lent?', say: 'Fönt 4 van, lent 1 és egy kérdőjel. A két alsó szám összege 4. Melyik szám hiányzik?', scene: <ApplePyramid top={4} left={1} right={null} />, options: [3, 4, 5], hint: 'Mennyi kell az 1-hez, hogy 4 legyen? Számolj tovább az ujjaidon!' },
  { id: 'm29', level: 3, badge: 'Mennyivel több?', ask: 'Mennyivel több madár van bal oldalon?', say: 'Bal oldalon 3 madár van, jobb oldalon 1. Mennyivel több madár van bal oldalon?', scene: <CompareScene icon="madar" a={3} b={1} />, options: [2, 3, 1], hint: 'Párosítsd össze őket! Hány madárnak nem jutott pár?' },
  { id: 'm30', level: 3, badge: 'Jel műveletnél', ask: 'Melyik jel kell?', say: 'Bal oldalon 2 + 2, jobb oldalon 5. Melyik jel kell a kérdőjel helyére?', scene: <SentenceStrip text="2 + 2  ?  5" />, options: ['<', '>', '='], hint: 'Előbb számold ki: mennyi 2 + 2? Aztán hasonlítsd az 5-höz!' },
  { id: 'm31', level: 3, badge: 'Jel műveletnél', ask: 'Melyik jel kell?', say: 'Bal oldalon 5 − 1, jobb oldalon 4. Melyik jel kell a kérdőjel helyére?', scene: <SentenceStrip text="5 − 1  ?  4" />, options: ['=', '<', '>'], hint: 'Előbb számold ki: mennyi 5 − 1? Aztán hasonlítsd a 4-hez!' },
  { id: 'm32', level: 3, badge: 'Kakukktojás', ask: 'Melyiknek NEM 3 az eredménye?', say: 'Két műveletnek 3 az eredménye. Melyiknek nem?', options: ['4 + 1', '1 + 2', '5 − 2'], hint: 'Számold ki mindegyiket az ujjaidon!' },
  { id: 'm33', level: 3, badge: 'Az 5 bontása', ask: 'Melyiknek 5 az eredménye?', say: 'Melyik összeadásnak 5 az eredménye?', options: ['2 + 3', '2 + 2', '1 + 3'], hint: 'Mutasd meg az ujjaidon! Melyiknél lesz fent mind az 5 ujjad?' },
  { id: 'm34', level: 3, badge: 'Két lépés', ask: 'Hány gombája van most Csigusznak?', say: 'Csigusz talált 4 gombát. 2-t odaadott Pötyinek, aztán talált még 1-et. Hány gombája van most?', scene: <FriendsScene />, options: [3, 2, 5], hint: 'Előbb vegyél el 2-t a 4-ből, aztán tegyél hozzá 1-et!' },
  { id: 'm35', level: 3, badge: 'Között', ask: 'Mi van az eper és a gomba között?', say: 'A ládatoronyban mi van az eper és a gomba között?', scene: <CrateTowerScene items={TOWER} />, options: [crate('alma'), crate('eper'), crate('gomba')], hint: 'Keresd meg az epret és a gombát! Melyik láda van a kettő között?' },
  { id: 'm36', level: 3, badge: 'Mindet elveszi', ask: 'Hány alma maradt a tányéron?', say: 'A tányéron 3 alma volt. Pötyi, Zümi és Csigusz is megevett egyet-egyet. Hány alma maradt?', scene: <GroupBox icon="alma" n={3} className="w-40 h-32 mx-auto" />, options: [0, 1, 3], hint: 'Hányan ettek? Annyi alma fogyott el.' },
];

export const MEGALLO5_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd a számot a képpel! Ugyanannyi legyen.',
    pairs: [
      { a: 4, b: hand(4, 'négy ujj') },
      { a: 2, b: domS(2, 'két pötty') },
      { a: 5, b: sm(<MiniGroup icon="csillag" n={5} />, 'öt csillag') },
      { a: 0, b: sm(<MiniGroup icon="alma" n={0} />, 'üres doboz') },
      { a: 1, b: sm(<MiniGroup icon="alma" n={1} />, 'egy alma') },
    ],
  },
  2: {
    say: 'Keresd meg, mi illik össze! Ugyanannyi legyen.',
    pairs: [
      { a: hand(3, 'három ujj'), b: domS(3, 'három pötty') },
      { a: domS(5, 'öt pötty'), b: sm(<MiniGroup icon="eper" n={5} />, 'öt eper') },
      { a: sm(<MiniGroup icon="hal" n={4} />, 'négy hal'), b: hand(4, 'négy ujj') },
      { a: sm(<MiniGroup icon="gomba" n={2} />, 'két gomba'), b: hand(2, 'két ujj') },
    ],
  },
  3: {
    say: 'Számold ki, és párosítsd a műveletet az eredményével!',
    pairs: [
      { a: '2 + 3', b: 5 },
      { a: '4 − 4', b: 0 },
      { a: '1 + 3', b: 4 },
      { a: '3 − 2', b: 1 },
      { a: '5 − 3', b: 2 },
      { a: '0 + 3', b: 3 },
    ],
  },
};

export const MEGALLO5_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Négy vagy öt? Számold meg, és tedd a jó kosárba!',
    bins: [
      { label: '4', figure: <BigSign text="4" className="w-12 h-12" />, say: 'négy' },
      { label: '5', figure: <BigSign text="5" className="w-12 h-12" />, say: 'öt' },
    ],
    items: [
      { item: hand(4, 'kéz'), bin: 0 },
      { item: hand(5, 'kéz'), bin: 1 },
      { item: domS(4, 'dominó'), bin: 0 },
      { item: domS(5, 'dominó'), bin: 1 },
      { item: sm(<MiniGroup icon="virag" n={4} />, 'virágok'), bin: 0 },
      { item: sm(<MiniGroup icon="labda" n={5} />, 'labdák'), bin: 1 },
      { item: sm(<MiniGroup icon="katica" n={5} />, 'katicák'), bin: 1 },
      { item: sm(<MiniGroup icon="hal" n={4} />, 'halak'), bin: 0 },
    ],
  },
  2: {
    say: 'Összeadás vagy kivonás? Nézd meg a jelet, és tedd a jó kosárba!',
    bins: [
      { label: 'Összeadás', figure: <BigSign text="+" className="w-12 h-12" />, say: 'összeadás, több lesz' },
      { label: 'Kivonás', figure: <BigSign text="−" className="w-12 h-12" />, say: 'kivonás, kevesebb lesz' },
    ],
    items: [
      { item: '2 + 1', bin: 0 },
      { item: '4 − 1', bin: 1 },
      { item: '0 + 5', bin: 0 },
      { item: '5 − 5', bin: 1 },
      { item: '3 + 1', bin: 0 },
      { item: '2 − 2', bin: 1 },
      { item: '1 + 1', bin: 0 },
      { item: '3 − 0', bin: 1 },
    ],
  },
  3: {
    say: 'Számold ki! Háromnál kevesebb, pont három, vagy háromnál több?',
    bins: [
      { label: 'Kevesebb', figure: <IconGroup icon="csillag" n={1} className="w-12 h-12" />, say: 'háromnál kevesebb' },
      { label: 'Három', figure: <BigSign text="3" className="w-12 h-12" />, say: 'pont három' },
      { label: 'Több', figure: <IconGroup icon="csillag" n={5} className="w-20 h-12" />, say: 'háromnál több' },
    ],
    items: [
      { item: '1 + 1', bin: 0 },
      { item: '5 − 2', bin: 1 },
      { item: '2 + 2', bin: 2 },
      { item: '4 − 3', bin: 0 },
      { item: '0 + 3', bin: 1 },
      { item: '5 − 0', bin: 2 },
      { item: '2 + 1', bin: 1 },
      { item: '3 − 3', bin: 0 },
      { item: '1 + 4', bin: 2 },
    ],
  },
};

export const Megallo5G1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="9. Megálló"
    badge="1. OSZTÁLY • II. SZÁMOLÁS 0-TÓL 5-IG • JÁTÉK"
    base="g1-c5-megallo"
    chapterId="szamolas-5-ig"
    questions={MEGALLO5_G1_QUESTIONS}
    pairs={MEGALLO5_G1_PAIRS}
    sort={MEGALLO5_G1_SORT}
    {...props}
  />
);

export default Megallo5G1Jatek;
