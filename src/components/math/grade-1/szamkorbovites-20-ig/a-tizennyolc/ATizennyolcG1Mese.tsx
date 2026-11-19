import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { NumberLine } from '../../shared/G1Pics';
import { DominoPair, ExprScene, FriendsScene, PotyiTenScene, TensRod, TwoFrames } from '../a-tizenot/ATizenotG1Scenes';
import { BalloonGroups, BalloonScene, TokensScene, balloonGarland } from './ATizennyolcG1Scenes';
import { BackToTenPlayground } from './ATizennyolcG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <FriendsScene mood="wow" extra={balloonGarland} />,
    text: 'Zümi születésnapja van!',
    say: 'Ma Zümi születésnapja van! Pötyi és Csigusz lufikkal díszíti a Számkertet. Segíts nekik számolni!',
    mood: 'wow',
  },
  {
    scene: <BalloonScene n={10} nb={8} />,
    text: 'Hány lufi?',
    say: 'Pötyi 10 piros lufit hozott, Csigusz 8 sárgát. Hány lufi lebeg a kertben összesen?',
    task: { ask: 'Hány lufi van a kertben?', options: [18, 17, 16], hint: 'A 10 piros után számolj tovább a sárgákkal: 11, 12…' },
  },
  {
    scene: <PotyiTenScene ones={8} label="10 + 8 = 18" />,
    text: '1 tízes és 8 egyes: 18',
    say: 'Pötyi két szárnya tele van: ez egy tízes. A levélen még 8 pötty van: ez 8 egyes. Egy tízes és nyolc egyes: ez a tizennyolc. 10 meg 8 az 18.',
    dots: 10,
    mood: 'cheer',
  },
  {
    scene: (
      <svg viewBox="0 0 480 240">
        <rect x="0" y="0" width="480" height="240" rx="18" fill="#ffedd5" />
        <svg x="20" y="8" width="440" height="90" viewBox="0 0 540 112">
          <TwoFrames a={18} className="" />
        </svg>
        <svg x="30" y="104" width="420" height="64" viewBox="0 0 664 70">
          <TensRod n={18} className="" />
        </svg>
        <svg x="110" y="170" width="260" height="62" viewBox="0 0 340 80">
          <DominoPair ones={8} className="" />
        </svg>
      </svg>
    ),
    text: 'Így is 18.',
    say: 'Fent az első keret tele van, a másodikban 8 korong van. Középen egy tízesrúd és kis kockák. Lent két dominó: 10 pötty és még 8 pötty. Mindegyik tizennyolc.',
    task: { ask: 'Hány egyes kocka van a rúd mellett?', options: [8, 7, 9], hint: 'Csak a kis sárga kockákat számold, a narancs rudat ne!' },
  },
  {
    scene: <NumberLine max={18} mark={[18]} />,
    text: 'A 18 a 17 után jön.',
    say: 'Ez a számegyenes. A 17 után jön a 18, ott van a piros pötty. Melyik szám áll közvetlenül előtte?',
    task: { ask: 'Melyik a 18 kisebb szomszédja?', options: [17, 16, 8], hint: 'A kisebb szomszéd közvetlenül a 18 előtt áll a számegyenesen.' },
  },
  {
    scene: <TwoFrames a={9} b={9} />,
    text: '9 + 9: előbb a tízig!',
    say: 'Csigusz 9 piros korongot tett a keretbe, Zümi 9 kéket. Nézd az első keretet! Hány kék kell még bele, hogy tele legyen?',
    task: { ask: 'Hány kell a 9-hez, hogy 10 legyen?', options: [1, 2, 3], hint: 'Az első keretben csak egy hely üres a piros korongok után.' },
  },
  {
    scene: <ExprScene text={['9 + 9 = ?', '9 + 1 + 8 = ?']} />,
    text: '9 + 1 + 8',
    say: 'A 9 kékből 1 kellett a tízhez, maradt még 8. 9 meg 1 az 10, és 10 meg 8 az… Mennyi?',
    task: { ask: '9 + 9 = ?', options: [18, 17, 16], hint: 'Előbb a tízig: 9 meg 1. Aztán a 10-hez még 8.' },
  },
  {
    scene: <BalloonScene n={10} nb={8} popped={9} />,
    text: '18 − 9 = 18 − 8 − 1',
    say: 'Hoppá! A szél a tüskés bokorra fújta a lufikat, és 9 kipukkadt: mind a 8 sárga és még 1 piros. Előbb 8-at veszünk el, az 10. Aztán még 1-et. Hány lufi maradt?',
    mood: 'sad',
    task: { ask: '18 − 9 = ?', options: [9, 10, 8], hint: 'Előbb 18-ból 8: az 10. A 10-ből még 1-et vegyél el!' },
  },
  {
    scene: <BalloonGroups n={18} group={2} />,
    text: 'Párban: 2, 4, 6 … 18',
    say: 'Zümi új lufikat hozott, és párba kötötte őket. A színek mutatják a párokat. Számoljunk kettesével: 2, 4, 6, 8, 10, 12, 14, 16, 18. Egy lufi sem maradt pár nélkül.',
    task: { ask: 'Páros vagy páratlan a 18?', options: ['páros', 'páratlan'], hint: 'Ha mindegyiknek van párja, és egy sem marad egyedül, akkor a szám…' },
  },
  {
    scene: <BalloonGroups n={18} group={3} />,
    text: 'Hármasával: 3, 6, 9 … 18',
    say: 'Most hármasával kötötte össze a lufikat. Számoljunk hármasával: 3, 6, 9, 12, 15, 18! Hány hármas csokor lett?',
    task: { ask: 'Hány hármas csokor van?', options: [6, 5, 3], hint: 'Mutass rá minden csokorra: egy piros, egy kék… Hányat mutattál?' },
  },
  {
    scene: <TokensScene n={18} circled={5} />,
    text: 'Egy kör: 5 korong.',
    say: 'Zümi 18 korongot kapott ajándékba. Egy kör a körhintán 5 korongba kerül. Az első 5-öt bekarikáztuk. Karikázz tovább ötösével: 5, 10, 15. Hány körre elég?',
    task: { ask: 'Hány körre elég a 18 korong?', options: [3, 4, 2], hint: 'Ötösével: 5, 10, 15. A megmaradt 3 korong már nem elég egy újabb körre.' },
  },
  {
    scene: <FriendsScene number={18} mood="cheer" extra={balloonGarland} />,
    text: 'Boldog születésnapot, Zümi!',
    say: 'Hurrá! 18 lufi, egy tízes és nyolc egyes. 9 meg 9 az 18, és a 18 páros szám. Gyere, játsszunk!',
    mood: 'cheer',
  },
];

export const ATizennyolcG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="8. A tizennyolc"
    storyTitle="Pötyi és Zümi születésnapja"
    badge="1. OSZTÁLY • VI. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 20-IG • MESE"
    pages={PAGES}
    coverDots={10}
    playground={<BackToTenPlayground />}
    playgroundTitle="Játszótér: előbb vissza a tízig!"
    parentNote="A gyerek megismeri a 18-at: 1 tízes és 8 egyes (két tízes keret, tízesrúd, dominó), helyét a számegyenesen, és hogy páros szám; kettesével, hármasával és ötösével csoportosít. A tízen átlépő műveleteket a könyv módszerével gyakorolja: 9 + 9 = 9 + 1 + 8 és 18 − 9 = 18 − 8 − 1 (előbb a tízig, aztán tovább). A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default ATizennyolcG1Mese;
