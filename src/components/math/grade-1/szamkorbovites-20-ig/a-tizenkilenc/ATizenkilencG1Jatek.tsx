import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { BigSign, NumberLine } from '../../shared/G1Pics';
import { CompareScene, DominoPair, ExprScene, GroupBox, HopLine, MiniGroup, MiniFrames, SeqStrip, TensRod, TwoFrames } from '../a-tizenot/ATizenotG1Scenes';
import { BasketScene, ColorDotsScene, DotPic, PicEqScene, SpotScene, ThreeLeavesScene } from './ATizenkilencG1Scenes';

const grp = (n: number, say: string) => ({ figure: <GroupBox icon="eper" n={n} />, say });
const sign = (t: string | number, say: string) => ({ figure: <BigSign text={t} />, say });
const sm = (node: React.ReactNode, say: string) => ({ figure: node, say });

export const A_TIZENKILENC_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – felismerés, számlálás
  { id: 't19-1', level: 1, badge: 'Tízes és egyes', ask: 'Hány eper van összesen?', say: 'Egy teli kosárban 10 eper van. A levélen szem eprek vannak. Hány eper van összesen?', scene: <BasketScene ones={9} label="?" />, options: [19, 18, 9], hint: 'A kosárban 10 van. Számolj tovább a levélen: 11, 12…' },
  { id: 't19-2', level: 1, badge: 'Számjegy', ask: 'Melyik a tizenkilences?', options: [sign(19, 'tizenkilenc'), sign(9, 'kilenc'), sign(18, 'tizennyolc')], hint: 'A tizenkilences két számjegy: elöl egy 1-es, utána egy 9-es.' },
  { id: 't19-3', level: 1, badge: 'Tízes keret', ask: 'Hány korong van a két keretben?', scene: <TwoFrames a={19} />, options: [19, 18, 17], hint: 'Az első keret tele van: az 10. Számolj tovább a másodikban: 11, 12…' },
  { id: 't19-4', level: 1, badge: 'Tizenkilenc', ask: 'Hol van 19 eper?', options: [grp(19, 'tizenkilenc eper'), grp(18, 'tizennyolc eper'), grp(17, 'tizenhét eper')], hint: 'Egy sorban 5 eper van. Számolj soronként: 5, 10, 15, és még…' },
  { id: 't19-5', level: 1, badge: 'Tízes és egyes', ask: 'Hány egyes kocka van a rúd mellett?', say: 'Egy tízesrudat és egyes kockákat látsz. Hány egyes kocka van a rúd mellett?', scene: <TensRod n={19} />, options: [9, 8, 10], hint: 'Csak a kis sárga kockákat számold, a hosszú rudat ne!' },
  { id: 't19-6', level: 1, badge: 'Dominó', ask: 'Hány pötty van a két dominón?', scene: <DominoPair ones={9} />, options: [19, 18, 17], hint: 'Az első dominón 10 pötty van. Számolj tovább a másodikon!' },
  { id: 't19-7', level: 1, badge: 'Számegyenes', ask: 'Melyik szám kell a ? helyére?', say: 'Melyik szám kell a kérdőjel helyére a számegyenesen?', scene: <NumberLine max={19} question={19} />, options: [19, 18, 17], hint: 'A 18 után melyik szám jön?' },
  {
    id: 't19-8', level: 1, badge: 'Becslés', ask: 'Melyik színből van a legtöbb?', say: 'Színes bogyók vannak a képen. Melyik színből van a legtöbb? Számold meg!',
    scene: <ColorDotsScene counts={[{ color: '#22c55e', n: 4 }, { color: '#ef4444', n: 7 }, { color: '#f97316', n: 8 }]} />,
    options: [{ figure: <DotPic color="#f97316" />, say: 'narancs' }, { figure: <DotPic color="#ef4444" />, say: 'piros' }, { figure: <DotPic color="#22c55e" />, say: 'zöld' }],
    hint: 'Számold meg színenként, és mutass rá mindegyikre! A piros és a narancs majdnem ugyanannyi.',
  },
  // 2. szint – tízes és egyes, elvétel, pótlás, sorozatok
  { id: 't19-9', level: 2, badge: 'Tízes és egyes', ask: '10 + 9 = ?', say: 'Egy teli keret és még 9 korong. 10 meg 9, az mennyi?', scene: <TwoFrames a={10} b={9} />, options: [19, 9, 18], hint: 'Egy tízes és kilenc egyes. Számolj a 10-től tovább kilencet!' },
  { id: 't19-10', level: 2, badge: 'Tízes elvétele', ask: '19 − 10 = ?', say: 'Pötyi elviszi a teli kosarat, abban 10 eper van. 19 elvéve 10. Hány szem eper marad a levélen?', scene: <BasketScene ones={9} label="19 − 10 = ?" />, options: [9, 10, 8], hint: 'Ha a kosár elmegy, csak a levélen lévő szemek maradnak. Számold meg őket!' },
  { id: 't19-11', level: 2, badge: 'Kivonás', ask: '19 − 8 = ?', say: '19 eperből a rigó 8-at elcsent, ezeket áthúztuk. Hány eper maradt?', scene: <GroupBox icon="eper" n={19} crossed={8} className="w-56 h-auto mx-auto" />, options: [11, 12, 10], hint: 'Csak a nem áthúzott epreket számold!' },
  { id: 't19-12', level: 2, badge: 'Hiányzó szám', ask: '19 − □ = 14', say: 'Melyik szám kell a négyzet helyére? 19 elvéve valamennyi, az 14.', scene: <ExprScene text="19 − □ = 14" />, options: [5, 4, 6], hint: 'Számolj a 14-től a 19-ig: 15, 16, 17… Hányat mondtál?' },
  { id: 't19-13', level: 2, badge: 'Sorozat', ask: 'Melyik szám jön a sorban?', say: 'Visszafelé, kettesével: 19, 17, 15, kérdőjel. Melyik szám jön?', scene: <SeqStrip items={[19, 17, 15, '?']} />, options: [13, 14, 11], hint: 'Mindig kettőt lépünk vissza. A 15 előtt kettővel…' },
  { id: 't19-14', level: 2, badge: 'Páros, páratlan', ask: 'Páros vagy páratlan a 19?', say: 'Nézd a két keretet! Páros vagy páratlan a 19?', scene: <TwoFrames a={19} />, options: ['páratlan', 'páros'], hint: 'Párban állnak a korongok? Nézd meg, marad-e egy egyedül!' },
  { id: 't19-15', level: 2, badge: 'Számegyenes', ask: 'Hová ér Zümi?', say: 'Zümi a 19-ről indul, és 7-et ugrik visszafelé. Hová ér? 19 elvéve 7.', scene: <HopLine max={19} from={19} jumps={[{ from: 19, to: 12 }]} question={12} />, options: [12, 13, 11], hint: 'A 19-ből vegyél el 7-et: 18, 17, 16… Számolj vissza hetet!' },
  { id: 't19-16', level: 2, badge: 'Mennyivel több?', ask: 'Mennyivel több eper van jobbra?', say: 'Bal oldalon 15 eper, jobb oldalon 19 eper. Mennyivel több eper van jobbra?', scene: <CompareScene icon="eper" a={15} b={19} />, options: [4, 3, 5], hint: 'Számolj a 15-től a 19-ig: 16, 17, 18, 19. Hányat mondtál?' },
  // 3. szint – képes egyenlet, három szám, tízen át, történetek
  { id: 't19-17', level: 3, badge: 'Titkos szám', ask: 'Melyik számot takarja az alma?', say: 'Három egyforma alma meg 4, az 19. Az egyforma képek ugyanazt a számot takarják. Melyik számot takarja az alma?', scene: <PicEqScene icon="alma" count={3} plus={4} result={19} />, options: [5, 4, 6], hint: 'Vedd el a 4-et: a három alma együtt 15. Melyik három egyforma szám ad 15-öt? Próbáld ki: 5, 10, 15!' },
  { id: 't19-18', level: 3, badge: 'Három szám', ask: '9 + 6 + 4 = ?', say: 'Zümi 9, Csigusz 6, Pötyi 4 epret szedett. Mennyi ez összesen?', scene: <ThreeLeavesScene counts={[9, 6, 4]} label="9 + 6 + 4 = ?" />, options: [19, 18, 17], hint: 'Kezdd a végén: 6 meg 4 az 10. Aztán 9 meg 10…' },
  { id: 't19-19', level: 3, badge: 'Tízen át', ask: '17 − 9 = ?', say: '17 elvéve 9. Pötyi így számol: 17 elvéve 7, az 10, aztán még elvéve 2. Mennyi?', scene: <ExprScene text={['17 − 9 = ?', '17 − 7 − 2 = ?']} />, options: [8, 10, 9], hint: 'Előbb 17-ből 7: az 10. A 10-ből még 2-t vegyél el!' },
  { id: 't19-20', level: 3, badge: 'Mennyivel több?', ask: 'Hány epret szedett Zümi?', say: 'Csigusz 11 epret szedett. Zümi 8-cal többet. Hány epret szedett Zümi?', scene: <GroupBox icon="eper" n={11} className="w-48 h-auto mx-auto" />, options: [19, 18, 3], hint: '8-cal több: a 11-hez adj hozzá 8-at! 12, 13…' },
  { id: 't19-21', level: 3, badge: 'Kis történet', ask: 'Hány epret kell még összeszedni?', say: 'A földön 19 eper volt. Pötyi 7-et már a kosárba tett, ezeket áthúztuk. Hány epret kell még összeszednie?', scene: <GroupBox icon="eper" n={19} crossed={7} className="w-56 h-auto mx-auto" />, options: [12, 13, 11], hint: 'Csak a nem áthúzott epreket számold, vagy számold ki: 19 elvéve 7.' },
  { id: 't19-22', level: 3, badge: 'Nyitott mondat', ask: 'Melyik szám illik a □ helyére?', say: '18 elvéve 9 kisebb, mint a négyzet, a négyzet pedig kisebb, mint 8 meg 6. Melyik szám illik a négyzet helyére?', scene: <ExprScene text="18 − 9 < □ < 8 + 6" />, options: [12, 9, 14], hint: 'Számold ki a két szélét: 18 − 9 = 9 és 8 + 6 = 14. A szám a 9-nél nagyobb, de a 14-nél kisebb legyen!' },
  { id: 't19-23', level: 3, badge: 'Egyenlő eredmény', ask: 'Melyiknek ugyanannyi az eredménye?', say: 'Melyik műveletnek ugyanannyi az eredménye, mint 13 meg 6-nak?', scene: <ExprScene text="13 + 6" />, options: ['15 + 4', '16 + 2', '14 + 3'], hint: 'Számold ki előbb: 13 meg 6 az 19. Melyik ad még 19-et?' },
  { id: 't19-24', level: 3, badge: 'Mi változott?', ask: 'Hány eper tűnt el?', say: 'Nézd meg a két képet! A jobb oldalin néhány eper eltűnt a levélről. Hány eper tűnt el?', scene: <SpotScene left={9} right={7} />, options: [2, 3, 1], hint: 'Számold meg a szem epreket a bal levélen, aztán a jobbon. Mennyivel kevesebb?' },
];

export const A_TIZENKILENC_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Koppints bal oldalon egy képre, aztán jobb oldalon a hozzá illő számra!',
    pairs: [
      { a: sm(<MiniGroup icon="eper" n={19} />, 'tizenkilenc eper'), b: 19 },
      { a: sm(<MiniGroup icon="eper" n={17} />, 'tizenhét eper'), b: 17 },
      { a: sm(<MiniGroup icon="eper" n={18} />, 'tizennyolc eper'), b: 18 },
      { a: sm(<MiniGroup icon="eper" n={15} />, 'tizenöt eper'), b: 15 },
    ],
  },
  2: {
    say: 'Számold ki! Keresd meg, melyik eredmény illik a művelethez!',
    pairs: [
      { a: '19 − 7', b: 12 },
      { a: '19 − 9', b: 10 },
      { a: '17 − 9', b: 8 },
      { a: '19 − 5', b: 14 },
      { a: '14 + 5', b: 19 },
    ],
  },
  3: {
    say: 'Melyiknek ugyanannyi az eredménye? Keresd meg a párokat!',
    pairs: [
      { a: '13 + 6', b: '15 + 4' },
      { a: '16 + 2', b: '9 + 9' },
      { a: '19 − 2', b: '14 + 3' },
      { a: '19 − 3', b: '2 + 14' },
      { a: '7 + 8', b: '18 − 3' },
    ],
  },
};

export const A_TIZENKILENC_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Tizenkilenc, vagy nem tizenkilenc? Számold meg, és tedd a jó kosárba!',
    bins: [
      { label: 'Tizenkilenc', figure: <BigSign text={19} className="w-12 h-12" />, say: 'tizenkilenc' },
      { label: 'Nem tizenkilenc', say: 'nem tizenkilenc' },
    ],
    items: [
      { item: sm(<MiniGroup icon="eper" n={19} />, 'eprek'), bin: 0 },
      { item: sm(<MiniGroup icon="virag" n={18} />, 'virágok'), bin: 1 },
      { item: sm(<MiniGroup icon="alma" n={19} />, 'almák'), bin: 0 },
      { item: sm(<MiniGroup icon="gomba" n={17} />, 'gombák'), bin: 1 },
      { item: sm(<MiniFrames a={19} />, 'korongok a keretekben'), bin: 0 },
      { item: sm(<MiniFrames a={16} />, 'korongok két keretben'), bin: 1 },
      { item: sm(<TensRod n={19} className="w-32 h-auto" />, 'tízesrúd és kockák'), bin: 0 },
      { item: sm(<DominoPair ones={8} className="w-32 h-auto" />, 'két dominó'), bin: 1 },
    ],
  },
  2: {
    say: 'Egyjegyű vagy kétjegyű a szám? Tedd a jó kosárba!',
    bins: [
      { label: 'Egyjegyű', say: 'egyjegyű' },
      { label: 'Kétjegyű', say: 'kétjegyű' },
    ],
    items: [
      { item: 15, bin: 1 },
      { item: 8, bin: 0 },
      { item: 9, bin: 0 },
      { item: 19, bin: 1 },
      { item: 11, bin: 1 },
      { item: 18, bin: 1 },
      { item: 3, bin: 0 },
      { item: 0, bin: 0 },
      { item: 12, bin: 1 },
    ],
  },
  3: {
    say: 'Számold ki! Tizennyolc vagy tizenkilenc lesz? Tedd a tojást a jó fészekbe!',
    bins: [
      { label: '18', say: 'tizennyolc' },
      { label: '19', say: 'tizenkilenc' },
    ],
    items: [
      { item: '8 + 3 + 8', bin: 1 },
      { item: '17 − 8 + 10', bin: 1 },
      { item: '6 + 5 + 7', bin: 0 },
      { item: '9 + 6 + 3', bin: 0 },
      { item: '4 + 8 + 7', bin: 1 },
      { item: '12 + 3 + 3', bin: 0 },
      { item: '18 − 6 + 7', bin: 1 },
      { item: '6 + 6 + 6', bin: 0 },
    ],
  },
};

export const ATizenkilencG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="9. A tizenkilenc"
    badge="1. OSZTÁLY • VI. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 20-IG • JÁTÉK"
    base="g1-c20-a-tizenkilenc"
    chapterId="szamkorbovites-20-ig"
    questions={A_TIZENKILENC_G1_QUESTIONS}
    pairs={A_TIZENKILENC_G1_PAIRS}
    sort={A_TIZENKILENC_G1_SORT}
    {...props}
  />
);

export default ATizenkilencG1Jatek;
