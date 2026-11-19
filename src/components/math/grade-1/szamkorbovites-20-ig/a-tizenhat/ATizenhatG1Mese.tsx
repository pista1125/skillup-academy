import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { NumberLine } from '../../shared/G1Pics';
import { DominoPair, ExprScene, FriendsScene, PotyiTenScene, TensRod, TwoFrames } from '../a-tizenot/ATizenotG1Scenes';
import { ButterflyScene, GroupRow } from './ATizenhatG1Scenes';
import { TenBridgePlayground } from './ATizenhatG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <FriendsScene mood="wow" />,
    text: 'Pillangók jöttek a kertbe!',
    say: 'Kivirágzott a Számkert. Pötyi, Zümi és Csigusz a virágok között sétált, amikor egy nagy csapat pillangó szállt le melléjük.',
    mood: 'wow',
  },
  {
    scene: <ButterflyScene n={10} nb={6} />,
    text: 'Hány pillangó?',
    say: '10 lila és 6 narancssárga pillangó ül a virágokon. Hány pillangó van összesen?',
    task: { ask: 'Hány pillangó van a kertben?', options: [16, 15, 14], hint: 'A 10 lila után számolj tovább a narancssárgákkal: 11, 12…' },
  },
  {
    scene: <PotyiTenScene ones={6} label="10 + 6 = 16" />,
    text: '1 tízes és 6 egyes: 16',
    say: 'Pötyi két szárnya tele van: ez egy tízes. A levélen még 6 pötty van: ez 6 egyes. Egy tízes és hat egyes: ez a tizenhat. 10 meg 6 az 16.',
    dots: 10,
    mood: 'cheer',
  },
  {
    scene: (
      <svg viewBox="0 0 480 240">
        <rect x="0" y="0" width="480" height="240" rx="18" fill="#fef3c7" />
        <svg x="20" y="8" width="440" height="90" viewBox="0 0 540 112">
          <TwoFrames a={16} className="" />
        </svg>
        <svg x="30" y="104" width="420" height="64" viewBox="0 0 588 70">
          <TensRod n={16} className="" />
        </svg>
        <svg x="110" y="170" width="260" height="62" viewBox="0 0 340 80">
          <DominoPair ones={6} className="" />
        </svg>
      </svg>
    ),
    text: 'Így is 16.',
    say: 'Fent az első keret tele van, a másodikban 6 korong van. Középen egy tízesrúd és 6 kis kocka. Lent két dominó: 10 pötty és még 6 pötty. Mindegyik tizenhat.',
    task: { ask: 'Hány egyes kocka van a rúd mellett?', options: [6, 5, 7], hint: 'Csak a kis sárga kockákat számold, a narancs rudat ne!' },
  },
  {
    scene: <NumberLine max={16} mark={[16]} />,
    text: 'A 16 a 15 után jön.',
    say: 'Ez a számegyenes. A 15 után jön a 16, ott van a piros pötty. Melyik szám áll közvetlenül előtte?',
    task: { ask: 'Melyik a 16 kisebb szomszédja?', options: [15, 14, 6], hint: 'A kisebb szomszéd közvetlenül a 16 előtt áll a számegyenesen.' },
  },
  {
    scene: <GroupRow n={16} group={2} />,
    text: 'Párban: 2, 4, 6 … 16',
    say: 'A pillangók párban táncolnak. Számoljunk kettesével: 2, 4, 6, 8, 10, 12, 14, 16. Mindegyiknek van párja, egy sem marad egyedül.',
    task: { ask: 'Páros vagy páratlan a 16?', options: ['páros', 'páratlan'], hint: 'Ha mindenkinek van párja, és senki sem marad egyedül, akkor a szám…' },
  },
  {
    scene: <TwoFrames a={8} b={8} />,
    text: '8 + 8: előbb a tízig!',
    say: 'Zümi 8 piros korongot tett le, Csigusz 8 kéket. A kékekből 2 még az első keretbe fér, így az tele lesz. A második keretbe marad 6.',
    task: { ask: '8 + 8 = ?', options: [16, 15, 14], hint: 'Előbb a tízig: 8 meg 2 az 10. A 8-ból maradt még 6. A 10-hez még 6.' },
  },
  {
    scene: <TwoFrames a={7} b={9} />,
    text: '7 + 9: hány kell a tízhez?',
    say: 'Most 7 piros és 9 kék korong van. Nézd az első keretet! Hány kék kell a 7-hez, hogy 10 legyen?',
    task: { ask: 'Hány kell a 7-hez, hogy 10 legyen?', options: [3, 2, 4], hint: 'Számolj a 7-től a 10-ig: 8, 9, 10. Hányat mondtál?' },
  },
  {
    scene: <ExprScene text={['7 + 9 = ?', '7 + 3 + 6 = ?']} />,
    text: '7 + 3 + 6',
    say: 'A 9-ből 3 kellett a tízhez, maradt még 6. 7 meg 3 az 10, és 10 meg 6 az… Mennyi?',
    task: { ask: '7 + 9 = ?', options: [16, 15, 14], hint: 'Előbb a tízig: 7 meg 3. Aztán a 10-hez még 6.' },
  },
  {
    scene: <TwoFrames a={16} crossed={8} />,
    text: '16 − 8: előbb vissza a tízig!',
    say: '16 pillangó volt, 8 elrepült: a korongokon áthúztuk őket. Pötyi így számol: előbb 6-ot vesz el, az 10. Aztán még 2-t. 16 elvéve 6 elvéve 2.',
    task: { ask: '16 − 8 = ?', options: [8, 10, 7], hint: 'Előbb 16-ból 6: az 10. A 10-ből még 2-t vegyél el!' },
  },
  {
    scene: <GroupRow n={16} group={4} />,
    text: 'Négyesével: 4, 8, 12, 16',
    say: 'Most négyesével repülnek a pillangók, a színek mutatják a csoportokat. Számoljunk négyesével: 4, 8, 12, 16!',
    task: { ask: 'Hány négyes csoport van?', options: [4, 3, 2], hint: 'Mutass rá minden csoportra: egy lila, egy narancs… Hányat mutattál?' },
  },
  {
    scene: <FriendsScene number={16} mood="cheer" />,
    text: 'Megtaláltad a tizenhatot!',
    say: 'Hurrá! 16 pillangó, egy tízes és hat egyes. Kettesével és négyesével is eljutottunk a 16-ig. Gyere, játsszunk!',
    mood: 'cheer',
  },
];

export const ATizenhatG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="6. A tizenhat"
    storyTitle="Pötyi és a pillangók tánca"
    badge="1. OSZTÁLY • VI. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 20-IG • MESE"
    pages={PAGES}
    coverDots={10}
    playground={<TenBridgePlayground />}
    playgroundTitle="Játszótér: előbb a tízig!"
    parentNote="A gyerek megismeri a 16-ot: 1 tízes és 6 egyes (két tízes keret, tízesrúd, dominó), helyét a számegyenesen, és hogy páros szám; kettesével és négyesével számol 16-ig. A tízen átlépő összeadást és kivonást a könyv módszerével gyakorolja: előbb a tízig, aztán tovább (7 + 9 = 7 + 3 + 6, 16 − 8 = 16 − 6 − 2). A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default ATizenhatG1Mese;
