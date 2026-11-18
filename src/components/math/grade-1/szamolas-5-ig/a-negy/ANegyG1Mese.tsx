import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { Domino, Hand, NumberLine } from '../../shared/G1Pics';
import { Clover, CloverMeadowScene, CompareScene, CountCloverScene, DigitStrokes, DogFig, BirdFig, SnailFig, SplitScene, TableFig } from './ANegyG1Scenes';
import { SplitPlayground } from './ANegyG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <CloverMeadowScene />,
    text: 'Szerencsét keresünk!',
    say: 'Pötyi, Zümi és Csigusz a Számkert rétjén sétálnak. Pötyi azt hallotta, hogy a négylevelű lóhere szerencsét hoz. Keressük meg együtt!',
    mood: 'cheer',
  },
  {
    text: 'Melyiknek van 4 levele?',
    say: 'Itt három lóhere nő. Számold meg a leveleiket! Melyiknek van négy levele?',
    task: {
      ask: 'Hol a négylevelű lóhere?',
      options: [
        { figure: <Clover leaves={4} />, say: 'négy levél' },
        { figure: <Clover leaves={3} />, say: 'három levél' },
        { figure: <Clover leaves={2} />, say: 'két levél' },
      ],
      hint: 'Mutass rá minden levélre, és számolj: egy, kettő, három, négy!',
    },
  },
  {
    scene: <CountCloverScene />,
    text: 'Egy, kettő, három, négy.',
    say: 'Megvan! Számoljuk meg a leveleit: egy, kettő, három, négy. Négy levél! A három után jön a négy.',
    dots: 4,
  },
  {
    scene: <DigitStrokes digit={4} />,
    text: 'Ez a négyes: 4',
    say: 'Ez itt a négyes. Két vonalból áll. Először a zöld pöttytől ferdén lefelé, aztán jobbra. Utána felemeled a ceruzát, és a kék vonalat fentről lefelé húzod. Olyan, mint egy kis zászló. Rajzold le a levegőbe!',
    dots: 4,
  },
  {
    scene: (
      <svg viewBox="0 0 480 170">
        <rect x="0" y="0" width="480" height="170" rx="18" fill="#fef3c7" />
        <svg x="50" y="20" width="130" height="130" viewBox="0 0 100 110">
          <Hand fingers={4} className="" />
        </svg>
        <svg x="250" y="45" width="180" height="90" viewBox="0 0 80 80">
          <Domino left={4} single className="" />
        </svg>
      </svg>
    ),
    text: 'Négy ujj. Négy pötty.',
    say: 'Mutass fel négy ujjat! A hüvelykujjad most pihen. A dominón a négy pötty a négy sarokban ül.',
    task: { ask: 'Hány pötty van a dominón?', options: [4, 3, 2], hint: 'Nézd meg a sarkokat! Minden sarokban egy pötty van.' },
  },
  {
    text: 'Kinek van 4 lába?',
    say: 'Egy kutya szalad át a réten. Neki négy lába van. A madárnak kettő, Csigusznak pedig egy sincs. Kinek van négy lába?',
    task: {
      ask: 'Kinek van 4 lába?',
      options: [
        { figure: <DogFig />, say: 'a kutya' },
        { figure: <BirdFig />, say: 'a madár' },
        { figure: <SnailFig />, say: 'Csigusz, a csiga' },
      ],
      hint: 'Számold meg a lábakat! A madárnak csak kettő van.',
    },
  },
  {
    text: 'Csigusz terít.',
    say: 'Csigusz meghívja a barátait egy kis uzsonnára. Olyan asztalt keres, amelyiknek négy lába van, hogy ne billegjen. Melyik az?',
    task: {
      ask: 'Melyik asztalnak van 4 lába?',
      options: [
        { figure: <TableFig legs={4} />, say: 'négylábú asztal' },
        { figure: <TableFig legs={3} />, say: 'háromlábú asztal' },
        { figure: <TableFig legs={2} />, say: 'kétlábú asztal' },
      ],
      hint: 'Számold meg az asztal lábait egyenként!',
    },
  },
  {
    scene: <NumberLine max={4} mark={[4]} />,
    text: 'A 4 a 3 után jön.',
    say: 'Ez a számegyenes. Nulla, egy, kettő, három, és utána jön a négy, ott, ahol a piros pötty van.',
    dots: 4,
  },
  {
    scene: <NumberLine max={4} question={4} jumps={[{ from: 0, to: 1 }, { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 }]} />,
    text: 'Zümi ugrál.',
    say: 'Zümi a számegyenesen ugrál. A nullától indult, és négyet ugrott. Hová ért?',
    task: { ask: 'Hová ért Zümi?', options: [4, 3, 2], hint: 'Számold meg az íveket! Minden ív egy ugrás.' },
  },
  {
    scene: <SplitScene red={1} blue={3} top={4} left={1} right="?" />,
    text: '4 korong: 1 piros.',
    say: 'Pötyi négy korongot színezett ki. Egy piros lett, a többi kék. A kis házikó tetején a négy van, lent a két szoba: a piros és a kék. Hány kék korong van?',
    task: { ask: 'Hány kék korong van?', options: [3, 1, 4], hint: 'Csak a kék korongokat számold!' },
  },
  {
    scene: <CompareScene icon="eper" a={4} b={3} />,
    text: 'Hol van több?',
    say: 'Bal oldalon négy eper van, jobb oldalon három. Melyik jel kell középre? A jel hegye a kevesebb felé mutat.',
    task: { ask: 'Melyik jel kell?', options: ['>', '<', '='], hint: 'A három kevesebb. A hegye a három felé mutasson!' },
  },
  {
    scene: <CloverMeadowScene />,
    text: 'Megtaláltad a négyet!',
    say: 'Hurrá! Megtaláltuk a négyet. Négy levél, négy láb, négy ujj, négy pötty. Ez a mi szerencsénk! Most gyere, játsszunk!',
    mood: 'cheer',
    dots: 4,
  },
];

export const ANegyG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="5. A négy"
    storyTitle="Pötyi és a négylevelű lóhere"
    badge="1. OSZTÁLY • II. SZÁMOLÁS 0-TÓL 5-IG • MESE"
    pages={PAGES}
    coverDots={4}
    playground={<SplitPlayground total={4} />}
    playgroundTitle="Játszótér: színezd a korongokat!"
    parentNote="A gyerek felismeri a négy elemű csoportokat, megismeri a 4-es számjegyet, írásirányát, ujj- és dominóképét, valamint helyét a számegyenesen. Két színnel szétválogatja a négy korongot (a 4 bontásai), és a <, >, = jelekkel összehasonlítja a 0–4 számokat. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default ANegyG1Mese;
