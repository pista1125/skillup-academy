import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { BigSign, Domino, IconGroup, IconName, NumberLine, TenFrame } from '../../shared/G1Pics';
import { Potyi } from '../../shared/Potyi';
import { CompareScene, GroupBox, HandsScene, MiniGroup, OpScene, PotyiScene, SeqStrip } from './AHetG1Scenes';

const pic = (icon: IconName, n: number, say: string) => ({ figure: <GroupBox icon={icon} n={n} />, say });
const bug = (dots: number, say: string) => ({ figure: <Potyi dots={dots} className="w-24 h-24" title="katica" />, say });
const tf = (n: number, second: number, say: string) => ({ figure: <TenFrame n={n} second={second} className="w-32 h-auto" />, say });

export const A_HET_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – a hét felismerése, számlálás
  { id: 'h1', level: 1, badge: 'Számlálás 7-ig', ask: 'Hány pöttye van Pötyinek?', scene: <PotyiScene dots={7} />, options: [7, 6, 5], hint: 'Mutass rá minden pöttyre, egyet se hagyj ki!' },
  { id: 'h2', level: 1, badge: 'Számlálás 7-ig', ask: 'Hol van 7 alma?', options: [pic('alma', 7, 'hét alma'), pic('alma', 6, 'hat alma'), pic('alma', 5, 'öt alma')], hint: 'Számold meg az almákat mindegyik képen! Hét kell.' },
  { id: 'h3', level: 1, badge: 'Számjegy', ask: 'Melyik a hetes?', options: [{ figure: <BigSign text="7" />, say: 'hetes' }, { figure: <BigSign text="1" />, say: 'egyes' }, { figure: <BigSign text="4" />, say: 'négyes' }], hint: 'A hetesnek felül van egy vízszintes teteje, onnan megy ferdén le.' },
  { id: 'h4', level: 1, badge: 'Ujjkép', ask: 'Hány ujj van fent?', say: 'Hány ujj van fent a két kézen összesen?', scene: <HandsScene a={5} b={2} />, options: [7, 6, 5], hint: 'Az egyik kézen öt ujj van. Számolj tovább a másik kézzel: hat, hét.' },
  { id: 'h5', level: 1, badge: 'Dominó', ask: 'Melyik dominón van 7 pötty?', options: [{ figure: <Domino left={5} right={2} />, say: 'öt és kettő' }, { figure: <Domino left={3} right={3} />, say: 'három és három' }, { figure: <Domino left={4} right={1} />, say: 'négy és egy' }], hint: 'Számold meg a két oldalt együtt!' },
  { id: 'h6', level: 1, badge: 'Számlálás 7-ig', ask: 'Hány virág nyílik?', scene: <IconGroup icon="virag" n={7} perRow={4} className="w-56 h-auto mx-auto" />, options: [7, 6, 4], hint: 'Számold a felső sort, aztán folytasd az alsóval!' },
  { id: 'h7', level: 1, badge: 'Számlálás 7-ig', ask: 'Hány csillag van?', scene: <IconGroup icon="csillag" n={6} perRow={3} className="w-44 h-auto mx-auto" />, options: [6, 7, 5], hint: 'Mutass rá mindegyikre! Ne számold kétszer ugyanazt!' },
  { id: 'h8', level: 1, badge: 'Számlálás 7-ig', ask: 'Melyik katica hétpöttyös?', options: [bug(7, 'hét pötty'), bug(6, 'hat pötty'), bug(5, 'öt pötty')], hint: 'Számold meg a pöttyöket mindegyik katicán!' },
  // 2. szint – számegyenes, sorrend, kép a számhoz
  { id: 'h9', level: 2, badge: 'Számegyenes', ask: 'Melyik szám kell a kérdőjel helyére?', say: 'Melyik szám van a kérdőjel helyén a számegyenesen?', scene: <NumberLine max={7} question={7} />, options: [7, 6, 5], hint: 'Mi jön a hatos után?' },
  { id: 'h10', level: 2, badge: 'Számsor', ask: 'Melyik szám hiányzik?', say: 'Négy, öt, valami, hét. Melyik szám hiányzik?', scene: <SeqStrip items={[4, 5, '?', 7]} />, options: [6, 3, 7], hint: 'Számolj sorban: négy, öt, és utána?' },
  { id: 'h11', level: 2, badge: 'Számjegy és mennyiség', ask: 'Melyik kép illik a 7-hez?', scene: <BigSign text="7" className="w-24 h-24 mx-auto" />, options: [pic('eper', 7, 'hét eper'), pic('eper', 6, 'hat eper'), pic('eper', 4, 'négy eper')], hint: 'A hetes mellé hét eper kell. Számold meg!' },
  { id: 'h12', level: 2, badge: 'Eggyel több', ask: 'Hány alma lesz?', say: 'Hat alma van. Csigusz hoz még egyet. Hány alma lesz?', scene: <OpScene icon="alma" a={6} b={1} op="+" />, options: [7, 6, 5], hint: 'Hat után eggyel több jön. Számolj tovább a hattól!' },
  { id: 'h13', level: 2, badge: 'Korongkép', ask: 'Hány korong van összesen?', scene: <TenFrame n={5} second={2} />, options: [7, 5, 6], hint: 'A piros és a kék korongokat is számold!' },
  { id: 'h14', level: 2, badge: 'Számlálás 7-ig', ask: 'Hol van 7 hal?', options: [pic('hal', 7, 'hét hal'), pic('hal', 6, 'hat hal')], hint: 'Az egyik képen csak hat hal van. Számold meg pontosan!' },
  { id: 'h15', level: 2, badge: 'Számlálás 7-ig', ask: 'Hány méhecske repül?', scene: <IconGroup icon="meh" n={7} perRow={4} className="w-56 h-auto mx-auto" />, options: [7, 5, 6], hint: 'Fent négy, lent még néhány. Számolj tovább!' },
  { id: 'h16', level: 2, badge: 'Visszafelé számlálás', ask: 'Számolj visszafelé! Mi jön?', say: 'Hét, hat, és utána? Számolj visszafelé!', scene: <SeqStrip items={[7, 6, '?']} />, options: [5, 4, 7], hint: 'Visszafelé mindig eggyel kevesebb jön. Hat előtt mi van?' },
  // 3. szint – összehasonlítás, bontás, kis történetek
  { id: 'h17', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: 'Hét gomba, és öt gomba. Melyik jel kell középre?', scene: <CompareScene icon="gomba" a={7} b={5} />, options: ['>', '<', '='], hint: 'Bal oldalon több van. A jel szája a több felé nyílik.' },
  { id: 'h18', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: 'Hat labda, és hét labda. Melyik jel kell középre?', scene: <CompareScene icon="labda" a={6} b={7} />, options: ['<', '>', '='], hint: 'Jobb oldalon eggyel több van. A jel szája arra nyíljon!' },
  { id: 'h19', level: 3, badge: 'Ugyanannyi', ask: 'Melyik jel kell?', say: 'Hét hal, és hét csillag. Melyik jel kell középre?', scene: <CompareScene icon="hal" a={7} b={7} iconB="csillag" />, options: ['=', '<', '>'], hint: 'Számold meg mindkét oldalt! Ugyanannyi?' },
  { id: 'h20', level: 3, badge: 'A 7 bontása', ask: 'Hány kék korong van?', say: 'Hét korong van. Három piros. Hány kék?', scene: <TenFrame n={3} second={4} />, options: [4, 3, 5], hint: 'Csak a kék korongokat számold!' },
  { id: 'h21', level: 3, badge: 'Hány hiányzik?', ask: 'Hány pötty hiányzik a hétből?', say: 'Ennek a katicának öt pöttye van. Hány pötty hiányzik, hogy hétpöttyös legyen?', scene: <PotyiScene dots={5} mood="think" />, options: [2, 1, 3], hint: 'Számolj tovább az ötös után: hat, hét. Hányat számoltál?' },
  { id: 'h22', level: 3, badge: 'A 7 felismerése', ask: 'Melyik NEM hét?', say: 'Két képen hét van. Melyiken nem hét?', options: [pic('labda', 6, 'hat labda'), { figure: <Domino left={5} right={2} />, say: 'öt és kettő pötty' }, pic('level', 7, 'hét levél')], hint: 'Számold meg mindhármat! Melyik kevesebb?' },
  { id: 'h23', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik a legnagyobb szám?', say: 'Melyik a legnagyobb szám? Gondolj a számegyenesre!', options: [{ figure: <BigSign text="7" />, say: 'hét' }, { figure: <BigSign text="6" />, say: 'hat' }, { figure: <BigSign text="3" />, say: 'három' }], hint: 'A számegyenesen a legnagyobb van legjobban jobbra.' },
  { id: 'h24', level: 3, badge: 'Történet', ask: 'Hány virágot látogat meg Zümi?', say: 'Zümi reggel öt virágra száll, délután még kettőre. Hány virágot látogatott meg összesen?', scene: <OpScene icon="virag" a={5} b={2} op="+" iconB="meh" />, options: [7, 6, 3], hint: 'Öt meg kettő. Számolj tovább az öttől: hat, hét.' },
];

export const A_HET_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Koppints bal oldalon egy képre, aztán jobb oldalon a számra, ami illik hozzá!',
    pairs: [
      { a: { figure: <MiniGroup icon="alma" n={7} />, say: 'hét alma' }, b: 7 },
      { a: { figure: <MiniGroup icon="alma" n={6} />, say: 'hat alma' }, b: 6 },
      { a: { figure: <MiniGroup icon="alma" n={5} />, say: 'öt alma' }, b: 5 },
      { a: { figure: <MiniGroup icon="alma" n={3} />, say: 'három alma' }, b: 3 },
    ],
  },
  2: {
    say: 'Keresd meg, mi illik össze! Ugyanannyi legyen.',
    pairs: [
      { a: { figure: <Domino left={5} right={2} className="w-28 h-auto" />, say: 'öt és kettő pötty' }, b: { figure: <MiniGroup icon="hal" n={7} />, say: 'hét hal' } },
      { a: { figure: <Domino left={3} right={3} className="w-28 h-auto" />, say: 'három és három pötty' }, b: { figure: <MiniGroup icon="hal" n={6} />, say: 'hat hal' } },
      { a: { figure: <Domino left={4} right={0} className="w-28 h-auto" />, say: 'négy pötty' }, b: { figure: <MiniGroup icon="hal" n={4} />, say: 'négy hal' } },
      { a: { figure: <Potyi dots={7} className="w-16 h-16" title="katica" />, say: 'hétpöttyös katica' }, b: { figure: <BigSign text="7" className="w-14 h-14" />, say: 'hetes' } },
      { a: { figure: <Potyi dots={5} className="w-16 h-16" title="katica" />, say: 'ötpöttyös katica' }, b: { figure: <BigSign text="5" className="w-14 h-14" />, say: 'ötös' } },
    ],
  },
  3: {
    say: 'Párosítsd a korongképet a művelettel!',
    pairs: [
      { a: tf(5, 2, 'öt piros, két kék'), b: '5 + 2' },
      { a: tf(4, 3, 'négy piros, három kék'), b: '4 + 3' },
      { a: tf(6, 1, 'hat piros, egy kék'), b: '6 + 1' },
      { a: tf(2, 5, 'két piros, öt kék'), b: '2 + 5' },
    ],
  },
};

export const A_HET_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Hová való a kép? Ahol hét van, az a hetes kosár. Ahol nem hét, az a másik kosár.',
    bins: [
      { label: 'Hét', figure: <BigSign text="7" className="w-12 h-12" />, say: 'hét' },
      { label: 'Nem hét', say: 'nem hét' },
    ],
    items: [
      { item: { figure: <MiniGroup icon="alma" n={7} />, say: 'almák' }, bin: 0 },
      { item: { figure: <MiniGroup icon="labda" n={5} />, say: 'labdák' }, bin: 1 },
      { item: { figure: <MiniGroup icon="virag" n={7} />, say: 'virágok' }, bin: 0 },
      { item: { figure: <MiniGroup icon="hal" n={6} />, say: 'halak' }, bin: 1 },
      { item: { figure: <Potyi dots={7} className="w-16 h-16" title="katica" />, say: 'katica' }, bin: 0 },
      { item: { figure: <MiniGroup icon="gomba" n={4} />, say: 'gombák' }, bin: 1 },
    ],
  },
  2: {
    say: 'Hét, vagy hétnél kevesebb? Tedd a jó kosárba!',
    bins: [
      { label: 'Kevesebb, mint 7', say: 'hétnél kevesebb' },
      { label: 'Pont 7', figure: <BigSign text="7" className="w-12 h-12" />, say: 'pont hét' },
    ],
    items: [
      { item: { figure: <Domino left={5} right={2} className="w-24 h-auto" />, say: 'dominó' }, bin: 1 },
      { item: { figure: <Domino left={3} right={2} className="w-24 h-auto" />, say: 'dominó' }, bin: 0 },
      { item: { figure: <TenFrame n={6} className="w-24 h-auto" />, say: 'korongok' }, bin: 0 },
      { item: { figure: <TenFrame n={7} className="w-24 h-auto" />, say: 'korongok' }, bin: 1 },
      { item: { figure: <MiniGroup icon="eper" n={7} />, say: 'eprek' }, bin: 1 },
      { item: { figure: <MiniGroup icon="eper" n={4} />, say: 'eprek' }, bin: 0 },
      { item: 6, bin: 0 },
      { item: 7, bin: 1 },
    ],
  },
  3: {
    say: 'Mennyi lesz? Hat, vagy hét? Tedd a jó kosárba!',
    bins: [
      { label: '6', say: 'hat' },
      { label: '7', say: 'hét' },
    ],
    items: [
      { item: '5 + 2', bin: 1 },
      { item: '3 + 3', bin: 0 },
      { item: '4 + 3', bin: 1 },
      { item: '6 + 0', bin: 0 },
      { item: '1 + 6', bin: 1 },
      { item: '4 + 2', bin: 0 },
      { item: '7 + 0', bin: 1 },
      { item: '5 + 1', bin: 0 },
    ],
  },
};

export const AHetG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="5. A hét"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • JÁTÉK"
    base="g1-c10-a-het"
    chapterId="szamkorbovites-10-ig"
    questions={A_HET_G1_QUESTIONS}
    pairs={A_HET_G1_PAIRS}
    sort={A_HET_G1_SORT}
    {...props}
  />
);

export default AHetG1Jatek;
