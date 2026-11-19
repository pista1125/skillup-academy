import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { ICONS, NumberLine } from '../../shared/G1Pics';
import { CompareScene, DominoPair, FriendsScene, PotyiTenScene, TensRod, TwoFrames } from '../a-tizenot/ATizenotG1Scenes';
import { BasketScene, ColorDotsScene, DotPic, PicEqScene, ThreeLeavesScene } from './ATizenkilencG1Scenes';
import { EperEpitoPlayground } from './ATizenkilencG1Parts';

const berries = (
  <g>
    {[[250, 26], [300, 20], [350, 30], [410, 22], [456, 40], [460, 140], [300, 214], [230, 222]].map(([x, y], i) => ICONS.eper({ x, y, s: 0.8, key: i }))}
  </g>
);

const PAGES: MesePage[] = [
  {
    scene: <FriendsScene mood="wow" extra={berries} />,
    text: 'Eperszüret a Számkertben!',
    say: 'Megérett az eper a Számkertben! Pötyi, Zümi és Csigusz kosarakkal indul szüretelni. Segíts nekik számolni!',
    mood: 'wow',
  },
  {
    scene: <BasketScene ones={9} label="?" />,
    text: 'Hány eper?',
    say: 'Zümi teleszedett egy kosarat: abban 10 eper van. A levélen még 9 szem eper van. Hány eper van összesen?',
    task: { ask: 'Hány eper van összesen?', options: [19, 18, 9], hint: 'A kosárban 10 van. Számolj tovább a levélen: 11, 12…' },
  },
  {
    scene: <PotyiTenScene ones={9} label="10 + 9 = 19" />,
    text: '1 tízes és 9 egyes: 19',
    say: 'Pötyi két szárnya tele van: ez egy tízes. A levélen még 9 pötty van: ez 9 egyes. Egy tízes és kilenc egyes: ez a tizenkilenc. 10 meg 9 az 19.',
    dots: 10,
    mood: 'cheer',
  },
  {
    scene: (
      <svg viewBox="0 0 480 240">
        <rect x="0" y="0" width="480" height="240" rx="18" fill="#ccfbf1" />
        <svg x="20" y="8" width="440" height="90" viewBox="0 0 540 112">
          <TwoFrames a={19} className="" />
        </svg>
        <svg x="30" y="104" width="420" height="64" viewBox="0 0 702 70">
          <TensRod n={19} className="" />
        </svg>
        <svg x="110" y="170" width="260" height="62" viewBox="0 0 340 80">
          <DominoPair ones={9} className="" />
        </svg>
      </svg>
    ),
    text: 'Így is 19.',
    say: 'Fent az első keret tele van, a másodikban csak egy hely üres. Középen egy tízesrúd és kis kockák. Lent két dominó: 10 pötty és még 9 pötty. Mindegyik tizenkilenc.',
    task: { ask: 'Hány egyes kocka van a rúd mellett?', options: [9, 8, 10], hint: 'Csak a kis sárga kockákat számold, a narancs rudat ne!' },
  },
  {
    scene: <NumberLine max={19} mark={[19]} />,
    text: 'A 19 a 18 után jön.',
    say: 'Ez a számegyenes. A 18 után jön a 19, ott van a piros pötty. Melyik szám áll közvetlenül előtte?',
    task: { ask: 'Melyik a 19 kisebb szomszédja?', options: [18, 17, 9], hint: 'A kisebb szomszéd közvetlenül a 19 előtt áll a számegyenesen.' },
  },
  {
    scene: <TwoFrames a={19} />,
    text: 'Párban? Egy egyedül marad!',
    say: 'A keretben a korongok oszloponként párban állnak: fent egy, lent egy. Nézd a második keret végét! Ott az utolsó korong egyedül maradt, nincs párja.',
    task: { ask: 'Páros vagy páratlan a 19?', options: ['páratlan', 'páros'], hint: 'Ha egy korong pár nélkül marad, akkor a szám…' },
  },
  {
    scene: <CompareScene icon="eper" a={16} b={19} />,
    text: 'Kinél több? Mennyivel?',
    say: 'Bal oldalon Csigusz epre: 16. Jobb oldalon Zümi epre: 19. Zümi többet szedett. Mennyivel többet?',
    task: { ask: 'Mennyivel több eper van Züminél?', options: [3, 2, 4], hint: 'Számolj a 16-tól a 19-ig: 17, 18, 19. Hányat mondtál?' },
  },
  {
    scene: <ThreeLeavesScene counts={[8, 6, 5]} label="8 + 6 + 5 = ?" />,
    text: '8 + 6 + 5',
    say: 'Zümi 8, Csigusz 6, Pötyi 5 epret tett a levelére. Előbb 8 meg 6: a 8-hoz 2 kell a tízig, aztán még 4, az 14. Aztán a 14-hez még 5. Mennyi az összesen?',
    task: { ask: '8 + 6 + 5 = ?', options: [19, 18, 17], hint: 'Előbb 8 meg 6 az 14. Aztán 14 meg 5: 15, 16, 17, 18…' },
  },
  {
    scene: <TwoFrames a={17} crossed={9} />,
    text: '17 − 9 = 17 − 7 − 2',
    say: 'Hoppá! Egy rigó 17 eperből 9-et elcsent, ezeket áthúztuk. Pötyi így számol: előbb 7-et vesz el, az 10. Aztán még 2-t. Hány eper maradt?',
    mood: 'sad',
    task: { ask: '17 − 9 = ?', options: [8, 9, 7], hint: 'Előbb 17-ből 7: az 10. A 10-ből még 2-t vegyél el!' },
  },
  {
    scene: <PicEqScene icon="eper" count={2} plus={1} result={19} />,
    text: 'Titkos szám!',
    say: 'Csigusz talált egy titkos üzenetet. Két egyforma eper meg 1, az 19. Az egyforma képek ugyanazt a számot takarják. Melyik számot takarja az eper?',
    mood: 'think',
    task: { ask: 'Melyik számot takarja az eper?', options: [9, 8, 10], hint: 'Előbb vedd el az 1-et: a két eper együtt 18. Melyik két egyforma szám ad együtt 18-at?' },
  },
  {
    scene: <ColorDotsScene counts={[{ color: '#ef4444', n: 8 }, { color: '#f97316', n: 6 }, { color: '#22c55e', n: 5 }]} />,
    text: 'Melyikből van a legtöbb?',
    say: 'A szüret végén színes bogyókat is találtak: piros, narancs és zöld bogyót. Tippelj: melyik színből van a legtöbb? Aztán számold meg!',
    task: {
      ask: 'Melyik színből van a legtöbb?',
      options: [
        { figure: <DotPic color="#ef4444" />, say: 'piros' },
        { figure: <DotPic color="#f97316" />, say: 'narancs' },
        { figure: <DotPic color="#22c55e" />, say: 'zöld' },
      ],
      hint: 'Számold meg színenként: előbb a pirosakat, aztán a narancsokat, aztán a zöldeket.',
    },
  },
  {
    scene: <FriendsScene number={19} mood="cheer" extra={berries} />,
    text: 'Megtaláltad a tizenkilencet!',
    say: 'Hurrá! 19 eper: egy teli kosár és kilenc szem. A 19 páratlan, és a 18 után jön. Gyere, játsszunk!',
    mood: 'cheer',
  },
];

export const ATizenkilencG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="9. A tizenkilenc"
    storyTitle="Pötyi és az eperszüret"
    badge="1. OSZTÁLY • VI. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 20-IG • MESE"
    pages={PAGES}
    coverDots={10}
    playground={<EperEpitoPlayground />}
    playgroundTitle="Játszótér: eperépítő"
    parentNote="A gyerek megismeri a 19-et: 1 tízes és 9 egyes (kosár és szem eper, két tízes keret, tízesrúd, dominó), helyét a számegyenesen, és hogy páratlan szám. Összehasonlít (mennyivel több?), három számot ad össze, a tízen át kivon a könyv módszerével (17 − 9 = 17 − 7 − 2), és képes egyenletben kitalálja a titkos számot. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default ATizenkilencG1Mese;
