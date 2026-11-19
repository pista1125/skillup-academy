import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { NumberLine } from '../../shared/G1Pics';
import { CompareScene, DominoPair, ExprScene, FivesScene, FriendsScene, PondScene, PotyiTenScene, StonesScene, TensRod, TwoFrames } from './ATizenotG1Scenes';
import { FishNetPlayground } from './ATizenotG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <FriendsScene bg="pond" mood="wow" />,
    text: 'Pötyi a halastóhoz ment.',
    say: 'Egy napsütéses reggelen Pötyi, Zümi és Csigusz lement a Számkert halastavához. A vízben sok kis hal úszkált.',
    mood: 'wow',
  },
  {
    scene: <PondScene n={10} nb={5} />,
    text: 'Hány hal úszik?',
    say: 'Nézd, mennyi hal! 10 narancssárga és 5 sárga hal úszik a tóban. Hány hal van összesen?',
    task: { ask: 'Hány hal úszik a tóban?', options: [15, 14, 13], hint: 'A 10 narancssárga után számolj tovább a sárgákkal: 11, 12…' },
  },
  {
    scene: <PotyiTenScene ones={5} label="10 + 5 = 15" />,
    text: '1 tízes és 5 egyes: 15',
    say: 'Pötyi két szárnya tele van: ez 10 pötty, egy tízes. A levélen még 5 pötty van: ez 5 egyes. Egy tízes és öt egyes: ez a tizenöt. 10 meg 5 az 15.',
    dots: 10,
    mood: 'cheer',
  },
  {
    scene: (
      <svg viewBox="0 0 480 240">
        <rect x="0" y="0" width="480" height="240" rx="18" fill="#fef3c7" />
        <svg x="20" y="8" width="440" height="90" viewBox="0 0 540 112">
          <TwoFrames a={15} className="" />
        </svg>
        <svg x="40" y="104" width="400" height="66" viewBox="0 0 550 70">
          <TensRod n={15} className="" />
        </svg>
        <svg x="110" y="170" width="260" height="62" viewBox="0 0 340 80">
          <DominoPair ones={5} className="" />
        </svg>
      </svg>
    ),
    text: 'Így is 15.',
    say: 'Fent az első keret tele van, a másodikban 5 korong van. Középen egy tízesrúd és 5 kis kocka. Lent két dominó: 10 pötty és még 5 pötty. Mindegyik tizenöt.',
    task: { ask: 'Hány egyes kocka van a rúd mellett?', options: [5, 4, 6], hint: 'Csak a kis sárga kockákat számold, a narancs rudat ne!' },
  },
  {
    scene: <NumberLine max={15} mark={[15]} />,
    text: 'A 15 a 14 után jön.',
    say: 'Ez a számegyenes. A 14 után jön a 15, ott van a piros pötty. A 15 páratlan szám: a halakat nem lehet mind párba állítani, egy mindig egyedül marad.',
    task: { ask: 'Melyik a 15 kisebb szomszédja?', options: [14, 13, 10], hint: 'A kisebb szomszéd közvetlenül a 15 előtt áll a számegyenesen.' },
  },
  {
    scene: <FivesScene pads={3} />,
    text: '5, 10, 15',
    say: 'A halak három tavirózsa-levél alatt pihennek, mindegyiknél 5 hal. Számoljunk ötösével: 5, 10, 15!',
    task: { ask: 'Hány hal pihen a levelek alatt?', options: [15, 10, 5], hint: 'Ötösével számolj: minden levélnél mondj ötöt tovább!' },
  },
  {
    scene: <TwoFrames a={8} b={7} />,
    text: '8 + 7: előbb a tízig!',
    say: 'Pötyi 8 piros korongot tett a keretbe, aztán még 7 kéket. Pötyi okosan számol: a 8-hoz előbb annyit tesz, hogy 10 legyen. Nézd a kék korongokat az első keretben!',
    task: { ask: 'Hány kell a 8-hoz, hogy 10 legyen?', options: [2, 3, 1], hint: 'Számold meg az első keret üres helyeit a kékek előtt: a 8 után 9, 10.' },
  },
  {
    scene: <ExprScene text={['8 + 7 = ?', '8 + 2 + 5 = ?']} />,
    text: '8 + 2 + 5',
    say: 'A 7-ből 2 kellett a tízhez. Maradt még 5. 8 meg 2 az 10, és 10 meg 5 az… Mennyi?',
    task: { ask: '8 + 7 = ?', options: [15, 14, 13], hint: 'Előbb a 10-ig: 8 meg 2. Aztán a 10-hez még 5.' },
  },
  {
    scene: <TwoFrames a={15} crossed={6} />,
    text: '15 − 6: előbb a tízig vissza!',
    say: '15 halból 6 elúszott a nád közé. Pötyi így számol: előbb 5-öt vesz el, az 10. Aztán még 1-et. 15 elvéve 5 elvéve 1.',
    task: { ask: '15 − 6 = ?', options: [9, 10, 8], hint: 'Előbb 15-ből 5: az 10. A 10-ből még 1-et vegyél el!' },
  },
  {
    scene: <StonesScene stones={[15, 14, '?', 12, 11, 10, 9, 8]} />,
    text: 'Csigusz visszafelé lépked.',
    say: 'Csigusz köveken mászik át a patakon. A köveken a számok egyre kisebbek: 15, 14, aztán egy kérdőjel. Melyik szám kell oda?',
    task: { ask: 'Melyik szám hiányzik?', options: [13, 11, 10], hint: 'Visszafelé számolunk: a 14 után melyik jön, ha lefelé haladunk?' },
  },
  {
    scene: <CompareScene icon="hal" a={15} b={12} />,
    text: 'Hol van több?',
    say: 'Bal oldalon 15 hal van, jobb oldalon 12. Melyik jel kell középre? A jel hegye a kevesebb felé mutat.',
    task: { ask: 'Melyik jel kell?', options: ['>', '<', '='], hint: 'Számold meg mindkét dobozt! A jel hegye a kevesebb felé mutasson.' },
  },
  {
    scene: <FriendsScene bg="pond" number={15} mood="cheer" />,
    text: 'Megtaláltad a tizenötöt!',
    say: 'Hurrá! 15 hal, 15 korong, egy tízes és öt egyes. Ma a tízen át is tudtunk számolni. Gyere, játsszunk!',
    mood: 'cheer',
  },
];

export const ATizenotG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="5. A tizenöt"
    storyTitle="Pötyi és a halastó"
    badge="1. OSZTÁLY • VI. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 20-IG • MESE"
    pages={PAGES}
    coverDots={10}
    playground={<FishNetPlayground />}
    playgroundTitle="Játszótér: halak a hálóba!"
    parentNote="A gyerek megismeri a 15-öt: 1 tízes és 5 egyes (két tízes keret, tízesrúd, dominó), helyét a számegyenesen, és ötösével számol (5, 10, 15). A tízen átlépő összeadást és kivonást a könyv módszerével gyakorolja: előbb a tízig, aztán tovább (8 + 7 = 8 + 2 + 5, 15 − 6 = 15 − 5 − 1). Összehasonlít, visszafelé számol, kis szöveges feladatokat old meg. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default ATizenotG1Mese;
