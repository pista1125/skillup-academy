import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { DigitTrace, Domino, NumberLine, TenFrame } from '../../shared/G1Pics';
import { CompareBoxes, CountBox, HatRow, NewDotScene, SnowfallScene, SnowmanScene, TwoHands, WinterFriendsScene, ZumiTwosScene } from './ANyolcG1Scenes';
import { SnowmanButtonsPlayground } from './ANyolcG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <WinterFriendsScene />,
    text: 'Leesett az első hó!',
    say: 'Reggel Pötyi kinézett, és mindent fehérnek látott. Leesett az első hó a Számkertben! Zümi és Csigusz is kijött játszani.',
    mood: 'wow',
  },
  {
    scene: <SnowfallScene n={8} />,
    text: 'Hány hópehely hull?',
    say: 'Nagy hópelyhek hullanak az égből. Számold meg őket! Mutass rá mindegyikre.',
    task: { ask: 'Hány hópehely hull?', options: [8, 7, 6], hint: 'Mutass rá mindegyik hópehelyre, és számolj hangosan! Egyet se hagyj ki.' },
  },
  {
    scene: <NewDotScene />,
    text: '7 meg 1: 8!',
    say: 'Pötyinek 7 pöttye van. Most egy hópehely ráesett a hátára, mintha egy új pötty lenne. 7 meg 1 az 8. Ez a nyolc!',
    dots: 8,
    mood: 'cheer',
  },
  {
    scene: <DigitTrace digit={8} />,
    text: 'Ez a nyolcas: 8',
    say: 'Ez itt a nyolcas. Olyan, mint egy hóember: fent egy kisebb kör, lent egy nagyobb kör. A zöld pöttytől indulj, és rajzold le a levegőbe, egy vonallal, megállás nélkül!',
    dots: 8,
  },
  {
    scene: (
      <svg viewBox="0 0 480 240">
        <rect x="0" y="0" width="480" height="240" rx="18" fill="#fef3c7" />
        <svg x="10" y="10" width="220" height="116" viewBox="0 0 210 110">
          <TwoHands n={8} className="" />
        </svg>
        <svg x="260" y="30" width="190" height="95" viewBox="0 0 160 80">
          <Domino left={4} right={4} className="" />
        </svg>
        <svg x="110" y="136" width="260" height="96" viewBox="0 0 260 112">
          <TenFrame n={8} className="" />
        </svg>
      </svg>
    ),
    text: 'Nyolc ujj. Nyolc pötty.',
    say: 'Mutass fel nyolc ujjat: az egyik kezeden ötöt, a másikon hármat. A dominón kétszer négy pötty van. A tízes keretben fent öt korong, lent három.',
    dots: 8,
  },
  {
    text: 'Hol van 8 hógolyó?',
    say: 'Csigusz hógolyókat gyúrt. Melyik dobozban van pont 8 hógolyó?',
    task: {
      ask: 'Hol van 8 hógolyó?',
      options: [
        { figure: <CountBox icon="hogolyo" n={8} />, say: 'nyolc hógolyó' },
        { figure: <CountBox icon="hogolyo" n={7} />, say: 'hét hógolyó' },
        { figure: <CountBox icon="hogolyo" n={6} />, say: 'hat hógolyó' },
      ],
      hint: 'Számold meg soronként: fent is, lent is! Hol lesz pont nyolc?',
    },
  },
  {
    scene: <SnowmanScene buttons={6} label={8} />,
    text: 'Hány gomb kell még?',
    say: 'Hóembert építettek. Zümi 6 gombot hozott, de Pötyi 8 gombot szeretne a hóemberre. Hány gomb kell még?',
    task: { ask: 'Hány gomb kell még, hogy 8 legyen?', options: [2, 1, 3], hint: 'Számolj tovább a 6-tól: 7, 8. Hányat számoltál hozzá?' },
  },
  {
    scene: <NumberLine max={8} mark={[8]} />,
    text: 'A 8 a 7 után jön.',
    say: 'Ez a számegyenes. Nulla, egy, kettő, és így tovább. A 7 után jön a 8, ott, ahol a piros pötty van.',
    task: { ask: 'Melyik a 8 kisebb szomszédja?', options: [7, 6, 5], hint: 'A kisebb szomszéd közvetlenül a 8 előtt áll a számegyenesen.' },
  },
  {
    scene: <HatRow a={5} b={3} />,
    text: '5 piros, 3 kék: 8 sapka.',
    say: 'A barátok sapkákat is hoztak. 5 piros sapka és 3 kék sapka: ez összesen 8 sapka. 5 meg 3 az 8.',
    dots: 8,
  },
  {
    scene: <CompareBoxes icon="sapka" a={8} b={7} />,
    text: 'Hol van több?',
    say: 'Bal oldalon 8 sapka van, jobb oldalon 7. Melyik jel kell középre? A jel hegye a kevesebb felé mutat.',
    task: { ask: 'Melyik jel kell?', options: ['>', '<', '='], hint: 'Számold meg mindkét dobozt! A jel hegye a kevesebb felé mutasson.' },
  },
  {
    scene: <ZumiTwosScene done={3} />,
    text: 'Zümi kettesével ugrik.',
    say: 'Zümi a hóban mindig kettőt ugrik: nulláról kettőre, kettőről négyre, négyről hatra. Hová ér a következő ugrással?',
    task: { ask: 'Hová ér Zümi a következő ugrással?', options: [8, 7, 6], hint: 'Zümi most a 6-on van. Lépj tovább kettőt: egy, kettő.' },
  },
  {
    scene: <WinterFriendsScene dots={8} />,
    text: 'Megtaláltad a nyolcat!',
    say: 'Hurrá! Megtaláltuk a nyolcat. 8 hópehely, 8 hógolyó, 8 gomb, 8 sapka, és Pötyinek most 8 pöttye van. Gyere, játsszunk!',
    mood: 'cheer',
    dots: 8,
  },
];

export const ANyolcG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="9. A nyolc"
    storyTitle="Pötyi és az első hó"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • MESE"
    pages={PAGES}
    coverDots={8}
    playground={<SnowmanButtonsPlayground />}
    playgroundTitle="Játszótér: gombok a hóemberre!"
    parentNote="A gyerek felismeri a nyolc elemű csoportokat, megismeri a 8-as számjegyet és írásirányát, az ujjképet (5 és 3), a dominó- és a tízeskeret-képet. Megtalálja a 8 helyét és kisebb szomszédját a számegyenesen, kettesével lépeget, a 8-at két részre bontja (pl. 5 meg 3), és összehasonlítja a számokat 8-ig a <, >, = jelekkel. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default ANyolcG1Mese;
