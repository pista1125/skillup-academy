import React from 'react';
import { MeseQuiz, MeseQuestion, MesePairsLevel, MeseSortLevel, MeseLevel } from '../../shared/MeseQuiz';
import { BigSign, NumberLine } from '../../shared/G1Pics';
import { CompareScene, DominoPair, ExprScene, MiniFrames, MiniGroup, ScatterScene, SeqStrip, TensRod, TwoFrames } from '../a-tizenot/ATizenotG1Scenes';
import { BalloonBox, BalloonScene, MiniBalloons, TokensScene } from './ATizennyolcG1Scenes';

const bal = (n: number, say: string) => ({ figure: <BalloonBox n={n} />, say });
const sign = (t: string | number, say: string) => ({ figure: <BigSign text={t} />, say });
const sm = (node: React.ReactNode, say: string) => ({ figure: node, say });

export const A_TIZENNYOLC_G1_QUESTIONS: MeseQuestion[] = [
  // 1. szint – felismerés, számlálás
  { id: 't18-1', level: 1, badge: 'Számlálás', ask: 'Hány lufi van a kertben?', say: 'Hány lufi van a kertben? Számold meg!', scene: <BalloonScene n={18} />, options: [18, 17, 16], hint: 'Mutass rá mindegyik lufira, és számolj hangosan! Egyet se hagyj ki.' },
  { id: 't18-2', level: 1, badge: 'Számjegy', ask: 'Melyik a tizennyolcas?', options: [sign(18, 'tizennyolc'), sign(8, 'nyolc'), sign(17, 'tizenhét')], hint: 'A tizennyolcas két számjegy: elöl egy 1-es, utána egy 8-as.' },
  { id: 't18-3', level: 1, badge: 'Tízes keret', ask: 'Hány korong van a két keretben?', scene: <TwoFrames a={18} />, options: [18, 17, 8], hint: 'Az első keret tele van: az 10. Számolj tovább a másodikban: 11, 12…' },
  { id: 't18-4', level: 1, badge: 'Tizennyolc', ask: 'Hol van 18 lufi?', options: [bal(18, 'tizennyolc lufi'), bal(17, 'tizenhét lufi'), bal(16, 'tizenhat lufi')], hint: 'Egy sorban 5 lufi van. Számolj soronként: 5, 10, 15, és még…' },
  { id: 't18-5', level: 1, badge: 'Tízes és egyes', ask: 'Hány egyes kocka van a rúd mellett?', say: 'Egy tízesrudat és egyes kockákat látsz. Hány egyes kocka van a rúd mellett?', scene: <TensRod n={18} />, options: [8, 7, 9], hint: 'Csak a kis sárga kockákat számold, a hosszú rudat ne!' },
  { id: 't18-6', level: 1, badge: 'Dominó', ask: 'Hány pötty van a két dominón?', scene: <DominoPair ones={8} />, options: [18, 17, 16], hint: 'Az első dominón 10 pötty van. Számolj tovább a másodikon!' },
  { id: 't18-7', level: 1, badge: 'Számegyenes', ask: 'Melyik szám kell a ? helyére?', say: 'Melyik szám kell a kérdőjel helyére a számegyenesen?', scene: <NumberLine max={18} question={18} />, options: [18, 17, 16], hint: 'A 17 után melyik szám jön?' },
  { id: 't18-8', level: 1, badge: 'Számlálás', ask: 'Hány csillag van a képen?', say: 'Hány csillag van a képen? Számold meg!', scene: <ScatterScene icon="csillag" n={17} />, options: [17, 18, 16], hint: 'Vigyázz, nem mindig tizennyolc van! Számold meg még egyszer, sorról sorra.' },
  // 2. szint – tízes és egyes, pótlás, elvétel, sorozatok
  { id: 't18-9', level: 2, badge: 'Tízes és egyes', ask: '10 + 8 = ?', say: 'Egy teli keret és még 8 korong. 10 meg 8, az mennyi?', scene: <TwoFrames a={10} b={8} />, options: [18, 17, 8], hint: 'Egy tízes és nyolc egyes. Számolj a 10-től tovább nyolcat!' },
  { id: 't18-10', level: 2, badge: 'Összeadás', ask: '11 + 7 = ?', say: '11 piros és 7 sárga lufi lebeg. 11 meg 7, az mennyi?', scene: <BalloonScene n={11} nb={7} />, options: [18, 17, 16], hint: 'A 11 piros után számolj tovább a sárgákkal: 12, 13…' },
  { id: 't18-11', level: 2, badge: 'Pótlás', ask: '□ + 12 = 18', say: 'Melyik szám kell a négyzet helyére? Valamennyi meg 12, az 18.', scene: <ExprScene text="□ + 12 = 18" />, options: [6, 5, 7], hint: 'Számolj a 12-től a 18-ig: 13, 14, 15… Hányat mondtál?' },
  { id: 't18-12', level: 2, badge: 'Kivonás', ask: 'Hány lufi maradt?', say: '18 lufi volt, 2 kipukkadt. Hány ép lufi maradt?', scene: <BalloonScene n={18} popped={2} />, options: [16, 17, 15], hint: 'Csak az ép lufikat számold, a kipukkadtakat ne!' },
  { id: 't18-13', level: 2, badge: 'Tízen át', ask: '9 + 9 = ?', say: '9 piros és 9 kék korong. A kékekből 1 még az első keretbe került. 9 meg 9, az mennyi?', scene: <TwoFrames a={9} b={9} />, options: [18, 17, 16], hint: 'Előbb a tízig: 9 meg 1 az 10. A 9-ből maradt még 8. A 10-hez még 8.' },
  { id: 't18-14', level: 2, badge: 'Tízre pótlás', ask: 'Hány kell a 8-hoz, hogy 10 legyen?', say: 'Az első keretben 8 korong van. Hány kell még, hogy tele legyen, vagyis 10 legyen?', scene: <TwoFrames a={8} />, options: [2, 1, 3], hint: 'Számold meg az üres helyeket az első keretben!' },
  { id: 't18-15', level: 2, badge: 'Kettesével', ask: 'Melyik szám jön a sorban?', say: 'Kettesével számolunk: 12, 14, 16, kérdőjel. Melyik szám jön?', scene: <SeqStrip items={[12, 14, 16, '?']} />, options: [18, 17, 15], hint: 'Mindig kettőt lépünk. A 16 után még kettő…' },
  { id: 't18-16', level: 2, badge: 'Visszafelé', ask: 'Melyik szám jön a sorban?', say: 'Visszafelé számolunk: 18, 17, 16, kérdőjel. Melyik szám jön?', scene: <SeqStrip items={[18, 17, 16, '?']} />, options: [15, 17, 14], hint: 'Mindig eggyel kisebb jön. Melyik szám áll a 16 előtt?' },
  // 3. szint – összehasonlítás, két lépés, kis történetek
  { id: 't18-17', level: 3, badge: 'Kisebb, nagyobb', ask: 'Melyik jel kell?', say: '17 labda, és 18 labda. Melyik jel kell középre?', scene: <CompareScene icon="labda" a={17} b={18} />, options: ['<', '>', '='], hint: 'Bal oldalon kevesebb van. A jel hegye a kevesebb felé mutasson!' },
  { id: 't18-18', level: 3, badge: 'Egyenlő', ask: 'Melyik jel kell?', say: '9 meg 9, kérdőjel, 18. Melyik jel kell a kérdőjel helyére?', scene: <ExprScene text="9 + 9 ? 18" />, options: ['=', '<', '>'], hint: 'Számold ki előbb: mennyi 9 meg 9? Aztán hasonlítsd a 18-hoz!' },
  { id: 't18-19', level: 3, badge: 'Tízen át', ask: '18 − 9 = ?', say: '18 elvéve 9. Pötyi így számol: 18 elvéve 8, az 10, aztán még elvéve 1. Mennyi?', scene: <ExprScene text={['18 − 9 = ?', '18 − 8 − 1 = ?']} />, options: [9, 10, 8], hint: 'Előbb 18-ból 8: az 10. A 10-ből még 1-et vegyél el!' },
  { id: 't18-20', level: 3, badge: 'Három szám', ask: '9 + 6 + □ = 18', say: '9 piros, 6 sárga és valahány kék lufi van, összesen 18. Hány kék lufi van?', scene: <ExprScene text="9 + 6 + □ = 18" />, options: [3, 4, 2], hint: 'Előbb add össze: 9 meg 6 az 15. Mennyi kell a 15-höz, hogy 18 legyen?' },
  { id: 't18-21', level: 3, badge: 'Ötösével', ask: 'Hány körre elég a 18 korong?', say: 'Egy kör a körhintán 5 korongba kerül. Az első ötöt bekarikáztuk. Hány körre elég a 18 korong?', scene: <TokensScene n={18} circled={5} />, options: [3, 4, 2], hint: 'Karikázz ötösével: 5, 10, 15. A maradék 3 korong már nem elég egy körre.' },
  { id: 't18-22', level: 3, badge: 'Mennyivel több?', ask: 'Hány lufit fújt fel Zümi?', say: 'Csigusz 7 lufit fújt fel. Zümi 4-gyel többet. Hány lufit fújt fel Zümi?', scene: <BalloonBox n={7} className="w-48 h-auto mx-auto" />, options: [11, 3, 10], hint: '4-gyel több: a 7-hez adj hozzá 4-et! 8, 9…' },
  { id: 't18-23', level: 3, badge: 'Kis történet', ask: 'Hány lufi van együtt?', say: 'Csigusznak 7 lufija van, Züminek 11. Hány lufi van együtt?', scene: <BalloonBox n={7} nb={11} className="w-56 h-auto mx-auto" />, options: [18, 17, 4], hint: 'A 11-hez számolj tovább 7-et: 12, 13…' },
  { id: 't18-24', level: 3, badge: 'Két lépés', ask: 'Hány lufi maradt Pötyinél?', say: 'Pötyinek 9 lufija volt. Kapott még 9-et, aztán 7 elszállt. Hány lufi maradt?', scene: <ExprScene text="9 + 9 − 7 = ?" />, options: [11, 12, 18], hint: 'Előbb: 9 meg 9 az 18. Aztán a 18-ból vegyél el 7-et!' },
];

export const A_TIZENNYOLC_G1_PAIRS: Record<MeseLevel, MesePairsLevel> = {
  1: {
    say: 'Párosítsd! Koppints bal oldalon egy képre, aztán jobb oldalon a hozzá illő számra!',
    pairs: [
      { a: sm(<MiniBalloons n={18} />, 'tizennyolc lufi'), b: 18 },
      { a: sm(<MiniBalloons n={16} />, 'tizenhat lufi'), b: 16 },
      { a: sm(<MiniBalloons n={13} />, 'tizenhárom lufi'), b: 13 },
      { a: sm(<MiniBalloons n={17} />, 'tizenhét lufi'), b: 17 },
    ],
  },
  2: {
    say: 'Egy tízes és még néhány egyes. Keresd meg, mi illik össze!',
    pairs: [
      { a: sm(<MiniFrames a={18} />, 'tizennyolc korong'), b: '10 + 8' },
      { a: sm(<MiniFrames a={14} />, 'tizennégy korong'), b: '10 + 4' },
      { a: sm(<MiniFrames a={17} />, 'tizenhét korong'), b: '10 + 7' },
      { a: sm(<MiniFrames a={12} />, 'tizenkét korong'), b: '10 + 2' },
    ],
  },
  3: {
    say: 'Melyiknek ugyanannyi az eredménye? Keresd meg a párokat!',
    pairs: [
      { a: '9 + 9', b: '10 + 4 + 4' },
      { a: '8 + 2 + 5', b: '9 + 6' },
      { a: '8 + 5', b: '10 + 3' },
      { a: '18 − 9', b: '18 − 8 − 1' },
      { a: '18 − 4', b: '17 − 3' },
    ],
  },
};

export const A_TIZENNYOLC_G1_SORT: Record<MeseLevel, MeseSortLevel> = {
  1: {
    say: 'Tizennyolc, vagy nem tizennyolc? Számold meg, és tedd a jó kosárba!',
    bins: [
      { label: 'Tizennyolc', figure: <BigSign text={18} className="w-12 h-12" />, say: 'tizennyolc' },
      { label: 'Nem tizennyolc', say: 'nem tizennyolc' },
    ],
    items: [
      { item: sm(<MiniBalloons n={18} />, 'lufik'), bin: 0 },
      { item: sm(<MiniGroup icon="alma" n={17} />, 'almák'), bin: 1 },
      { item: sm(<MiniGroup icon="csillag" n={18} />, 'csillagok'), bin: 0 },
      { item: sm(<MiniGroup icon="labda" n={16} />, 'labdák'), bin: 1 },
      { item: sm(<MiniFrames a={18} />, 'korongok a keretekben'), bin: 0 },
      { item: sm(<MiniFrames a={15} />, 'korongok két keretben'), bin: 1 },
      { item: sm(<TensRod n={18} className="w-32 h-auto" />, 'tízesrúd és kockák'), bin: 0 },
      { item: sm(<DominoPair ones={7} className="w-32 h-auto" />, 'két dominó'), bin: 1 },
    ],
  },
  2: {
    say: 'Páros vagy páratlan? Tedd a számot a jó kosárba!',
    bins: [
      { label: 'Páros', say: 'páros' },
      { label: 'Páratlan', say: 'páratlan' },
    ],
    items: [
      { item: 18, bin: 0 },
      { item: 17, bin: 1 },
      { item: 9, bin: 1 },
      { item: 14, bin: 0 },
      { item: 13, bin: 1 },
      { item: 6, bin: 0 },
      { item: 11, bin: 1 },
      { item: 16, bin: 0 },
      { item: 5, bin: 1 },
    ],
  },
  3: {
    say: 'Számold ki! Tizenhat, tizenhét vagy tizennyolc lesz? Tedd a jó kosárba!',
    bins: [
      { label: '16', say: 'tizenhat' },
      { label: '17', say: 'tizenhét' },
      { label: '18', say: 'tizennyolc' },
    ],
    items: [
      { item: '15 + 3', bin: 2 },
      { item: '9 + 9', bin: 2 },
      { item: '10 + 8', bin: 2 },
      { item: '11 + 6', bin: 1 },
      { item: '13 + 4', bin: 1 },
      { item: '9 + 8', bin: 1 },
      { item: '18 − 2', bin: 0 },
      { item: '8 + 8', bin: 0 },
      { item: '7 + 9', bin: 0 },
    ],
  },
};

export const ATizennyolcG1Jatek: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = (props) => (
  <MeseQuiz
    title="8. A tizennyolc"
    badge="1. OSZTÁLY • VI. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 20-IG • JÁTÉK"
    base="g1-c20-a-tizennyolc"
    chapterId="szamkorbovites-20-ig"
    questions={A_TIZENNYOLC_G1_QUESTIONS}
    pairs={A_TIZENNYOLC_G1_PAIRS}
    sort={A_TIZENNYOLC_G1_SORT}
    {...props}
  />
);

export default ATizennyolcG1Jatek;
