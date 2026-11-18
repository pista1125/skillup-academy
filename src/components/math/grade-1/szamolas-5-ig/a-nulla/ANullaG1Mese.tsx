import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { Domino, DigitTrace, Hand, NumberLine } from '../../shared/G1Pics';
import { CompareScene } from '../a-ketto/AKettoG1Scenes';
import { BasketBox, BeforeAfterScene, BugCard, NestScene } from './ANullaG1Scenes';
import { ZeroCountPlayground } from './ANullaG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <NestScene eggs={2} friends />,
    text: 'Nézd, egy fészek!',
    say: 'Pötyi és Zümi tovább sétálnak a Számkertben. Nézd csak! Ott fent, a fa ágán egy madárfészek van. Kukkantsunk bele!',
    mood: 'wow',
  },
  {
    scene: <NestScene eggs={2} />,
    text: 'Mi van a fészekben?',
    say: 'A fészekben tojások vannak. Számold meg őket!',
    task: { ask: 'Hány tojás van a fészekben?', options: [2, 1, 0], hint: 'Mutass rá mindegyik tojásra! Egy, és még egy.' },
  },
  {
    scene: <NestScene eggs={0} friends />,
    text: 'A fészek üres.',
    say: 'Másnap Pötyi újra benéz. A tojásokból kikeltek a fiókák, és elrepültek. A fészek üres. Nincs benne egy tojás sem. Ez a nulla.',
    mood: 'think',
    dots: 0,
  },
  {
    text: 'Melyik kosár üres?',
    say: 'Csigusz kosarakat hozott. Melyikben van nulla alma? Koppints rá!',
    task: {
      ask: 'Hol van nulla alma?',
      options: [
        { figure: <BasketBox n={0} />, say: 'üres kosár' },
        { figure: <BasketBox n={1} />, say: 'egy alma' },
        { figure: <BasketBox n={2} />, say: 'két alma' },
      ],
      hint: 'A nulla azt jelenti: nincs benne semmi. Keresd az üres kosarat!',
    },
  },
  {
    scene: <DigitTrace digit={0} />,
    text: 'Ez a nulla: 0',
    say: 'Ez itt a nulla. Olyan kerek, mint egy tojás. A zöld pöttytől balra indulunk, körbe megyünk, és visszaérünk a tetejére. Rajzold le a levegőbe!',
    dots: 0,
  },
  {
    scene: (
      <svg viewBox="0 0 480 170">
        <rect x="0" y="0" width="480" height="170" rx="18" fill="#fef3c7" />
        <svg x="50" y="20" width="130" height="130" viewBox="0 0 100 110">
          <Hand fingers={0} className="" />
        </svg>
        <svg x="250" y="45" width="180" height="90" viewBox="0 0 80 80">
          <Domino left={0} single className="" />
        </svg>
      </svg>
    ),
    text: 'Nulla ujj. Nulla pötty.',
    say: 'Szorítsd ökölbe a kezed! Most nulla ujjad van fent. Az üres dominón nulla pötty van.',
    dots: 0,
  },
  {
    text: 'Melyik katica pöttytelen?',
    say: 'Pötyinek sok rokona van. Melyik katicának nincs egy pöttye sem?',
    task: {
      ask: 'Melyiknek nulla pöttye van?',
      options: [
        { figure: <BugCard dots={0} />, say: 'nulla pötty' },
        { figure: <BugCard dots={1} />, say: 'egy pötty' },
        { figure: <BugCard dots={2} />, say: 'két pötty' },
      ],
      hint: 'Nézd meg a hátukat! Melyiken nincs egy pötty sem?',
    },
  },
  {
    scene: <NumberLine max={5} mark={[0]} />,
    text: 'A számegyenes a 0-val kezdődik.',
    say: 'Ez a számegyenes. Az elején, itt, ahol a piros pötty van, a nulla lakik. Utána jön az egy, aztán a kettő.',
    dots: 0,
  },
  {
    scene: <BeforeAfterScene icon="level" before={2} after={0} />,
    text: 'Csigusz ebédel.',
    say: 'Csigusz, a csiga megéhezett. Két levél volt itt. Csigusz mindet megette. Hány levél maradt?',
    task: { ask: 'Hány levél maradt?', options: [0, 1, 2], hint: 'Nézd a jobb oldali képet! Látsz ott levelet?' },
  },
  {
    scene: <CompareScene icon="alma" a={2} b={0} />,
    text: 'Hol van több?',
    say: 'Bal oldalon két alma van, jobb oldalon nulla. Melyik jel kell középre? A jel hegye a kevesebb felé mutat.',
    task: { ask: 'Melyik jel kell?', options: ['>', '<', '='], hint: 'A kettő több, mint a nulla. A hegye az üres doboz felé mutasson!' },
  },
  {
    scene: <NestScene eggs={0} />,
    text: 'Megtaláltad a nullát!',
    say: 'Hurrá! Megtaláltuk a nullát. Üres fészek, üres kosár, ököl, üres dominó. A nulla azt jelenti: nincs semmi. Most gyere, játsszunk!',
    mood: 'cheer',
    dots: 0,
  },
];

export const ANullaG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="3. A nulla"
    storyTitle="Pötyi és az üres fészek"
    badge="1. OSZTÁLY • II. SZÁMOLÁS 0-TÓL 5-IG • MESE"
    pages={PAGES}
    coverDots={0}
    playground={<ZeroCountPlayground />}
    playgroundTitle="Játszótér: nulla, egy vagy kettő?"
    parentNote="A gyerek megérti, hogy a nulla azt jelenti: nincs semmi (üres fészek, üres kosár, ököl, üres dominó). Megismeri a 0 számjegyet, írásirányát és helyét a számegyenes elején, és összehasonlítja a 0, 1, 2 számokat a <, >, = jelekkel. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default ANullaG1Mese;
