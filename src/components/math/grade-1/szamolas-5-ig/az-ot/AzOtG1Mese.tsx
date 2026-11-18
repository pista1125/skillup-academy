import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { Domino, Hand, NumberLine } from '../../shared/G1Pics';
import { CompareScene, DigitStrokes, NumberHouse, TreeScene } from '../a-negy/ANegyG1Scenes';
import { BasketFig, DieKorongs, HarvestScene, RowsCompareScene, ScarecrowScene, StarfishFig } from './AzOtG1Scenes';
import { WheelbarrowPlayground } from './AzOtG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <HarvestScene />,
    text: 'Szüret van!',
    say: 'Ősz van a Számkertben. Megérett a szilva! Pötyi, Zümi és Csigusz szüretelni mennek. Gyere, segíts nekik!',
    mood: 'cheer',
  },
  {
    scene: <TreeScene fruit="szilva" n={5} />,
    text: 'Hány szilva van a fán?',
    say: 'Nézd a szilvafát! Számold meg a szilvákat: egy, kettő, három, négy, és még egy. Hány szilva van a fán?',
    task: { ask: 'Hány szilva van a fán?', options: [5, 4, 3], hint: 'Mutass rá mindegyikre! A négy után még egy jön.' },
  },
  {
    scene: <Hand fingers={5} className="w-40 h-40 mx-auto" />,
    text: 'Egy kéz: 5 ujj.',
    say: 'Nézd meg a kezedet! Hüvelykujj, mutatóujj, középső ujj, gyűrűsujj, kisujj. Egy kezeden öt ujj van. A négy után jön az öt.',
    dots: 5,
  },
  {
    scene: <DigitStrokes digit={5} />,
    text: 'Ez az ötös: 5',
    say: 'Ez itt az ötös. A zöld pöttytől lefelé indulunk, aztán nagy, kerek pocakot rajzolunk. Végül felül egy kis kalapot húzunk jobbra. Rajzold le a levegőbe!',
    dots: 5,
  },
  {
    scene: (
      <svg viewBox="0 0 480 170">
        <rect x="0" y="0" width="480" height="170" rx="18" fill="#fef3c7" />
        <svg x="250" y="45" width="180" height="90" viewBox="0 0 80 80">
          <Domino left={5} single className="" />
        </svg>
        <svg x="40" y="15" width="150" height="140" viewBox="0 0 120 120">
          <StarfishFig className="" />
        </svg>
      </svg>
    ),
    text: 'Öt kar. Öt pötty.',
    say: 'A tengeri csillagnak öt karja van. A dominón öt pötty: négy a sarkokban, egy középen. Melyik dominón van öt pötty?',
    task: {
      ask: 'Hol van 5 pötty?',
      options: [
        { figure: <Domino left={5} single />, say: 'öt pötty' },
        { figure: <Domino left={4} single />, say: 'négy pötty' },
        { figure: <Domino left={3} single />, say: 'három pötty' },
      ],
      hint: 'Négy pötty a sarokban, és kell még egy középen!',
    },
  },
  {
    text: 'Melyik kosár teli?',
    say: 'Zümi minden kosárba öt szilvát tesz. Melyik kosárban van már öt szilva?',
    task: {
      ask: 'Hol van 5 szilva?',
      options: [
        { figure: <BasketFig n={5} />, say: 'öt szilva' },
        { figure: <BasketFig n={4} />, say: 'négy szilva' },
        { figure: <BasketFig n={3} />, say: 'három szilva' },
      ],
      hint: 'Számold meg a szilvákat mindegyik kosárban!',
    },
  },
  {
    scene: <NumberLine max={5} mark={[5]} />,
    text: 'Az 5 a 4 után jön.',
    say: 'Ez a számegyenes. Nulla, egy, kettő, három, négy, és utána jön az öt, ott, ahol a piros pötty van.',
    dots: 5,
  },
  {
    scene: <RowsCompareScene a={5} b={4} />,
    text: '5 szilva, 4 körte.',
    say: 'Csigusz körtét is szedett. Fent öt szilva, lent négy körte. Tegyünk minden szilva alá egy körtét! Az utolsó szilvának nem jut körte. Mennyivel több a szilva?',
    task: { ask: 'Mennyivel több a szilva?', options: [1, 2, 4], hint: 'Párosítsd őket! Hány szilvának nem jut körte?' },
  },
  {
    scene: <CompareScene icon="szilva" a={5} b={4} iconB="korte" />,
    text: 'Melyik jel kell?',
    say: 'Öt szilva, és négy körte. Melyik jel kell középre? A jel hegye a kevesebb felé mutat.',
    task: { ask: 'Melyik jel kell?', options: ['>', '<', '='], hint: 'A négy kevesebb, mint az öt. A hegye a négy felé mutasson!' },
  },
  {
    scene: (
      <svg viewBox="0 0 480 180">
        <rect x="0" y="0" width="480" height="180" rx="18" fill="#f8fafc" />
        <svg x="40" y="20" width="200" height="140" viewBox="0 0 120 100">
          <DieKorongs red={3} className="" />
        </svg>
        <svg x="290" y="15" width="150" height="150" viewBox="0 0 120 120">
          <NumberHouse top={5} left={3} right="?" className="" />
        </svg>
      </svg>
    ),
    text: '5 korong: 3 piros.',
    say: 'Pötyi öt korongot rakott ki. Három piros, a többi kék. Hány kék korong van?',
    task: { ask: 'Hány kék korong van?', options: [2, 3, 1], hint: 'Csak a kék korongokat számold!' },
  },
  {
    scene: <ScarecrowScene left={2} right={3} total={5} />,
    text: '5 madár pihen.',
    say: 'A madárijesztőn öt kismadár pihen meg. A bal vállán kettő ül. Hány madár ül a jobb vállán?',
    task: { ask: 'Hány madár ül jobb oldalt?', options: [3, 2, 4], hint: 'Csak a jobb oldali madarakat számold!' },
  },
  {
    scene: <HarvestScene />,
    text: 'Megtaláltad az ötöt!',
    say: 'Hurrá! Kész a szüret. Öt szilva, öt ujj, öt pötty, öt madár. Most gyere, játsszunk!',
    mood: 'cheer',
    dots: 5,
  },
];

export const AzOtG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="6. Az öt"
    storyTitle="Pötyi és a szilvaszüret"
    badge="1. OSZTÁLY • II. SZÁMOLÁS 0-TÓL 5-IG • MESE"
    pages={PAGES}
    coverDots={5}
    playground={<WheelbarrowPlayground />}
    playgroundTitle="Játszótér: legyen 5 tök!"
    parentNote="A gyerek felismeri az öt elemű csoportokat, megismeri az 5-ös számjegyet, írásirányát, az egész kéz ujjképét és a dominóképet, valamint helyét a számegyenesen. Párba állítással megállapítja, mennyivel több az egyik csoport, két részre bontja az ötöt, és a <, >, = jelekkel összehasonlítja a 0–5 számokat. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default AzOtG1Mese;
