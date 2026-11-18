import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { CountBox, EqCard } from '../a-nyolc/ANyolcG1Scenes';
import { FeederFriendsScene, FeederScene } from '../a-tiz/ATizG1Scenes';
import { MoreLessScene, StoryStepsScene, TwoPilesScene } from './SzovegesFeladatokG1Scenes';
import { StoryMachinePlayground } from './SzovegesFeladatokG1Parts';

const withEq = (pic: React.ReactNode, eq: string) => (
  <svg viewBox="0 0 480 300">
    <svg x="0" y="0" width="480" height="210" viewBox="0 0 480 240">
      {pic}
    </svg>
    <svg x="90" y="218" width="300" height="78" viewBox="0 0 314 90">
      <EqCard text={eq} className="" />
    </svg>
  </svg>
);

const PAGES: MesePage[] = [
  {
    scene: <FeederFriendsScene mood="happy" />,
    text: 'Mesedélután!',
    say: 'Esik a hó. Pötyi, Zümi és Csigusz a madáretető mellett pihen. Pötyi azt mondja: Mesélek nektek rövid meséket! Minden mese végén van egy kérdés. Segíts megválaszolni!',
    mood: 'happy',
  },
  {
    scene: <StoryStepsScene />,
    text: 'Hallgasd, nézd, számolj!',
    say: 'Így oldjuk meg a mesés feladatot. Egy: figyelmesen meghallgatod a mesét. Kettő: megnézed a képet. Három: eldöntöd, összeadás vagy kivonás kell-e. Több lett, vagy kevesebb? Négy: kiszámolod, és válaszolsz a kérdésre.',
  },
  {
    scene: <TwoPilesScene a={4} b={3} whoA="potyi" whoB="meh" />,
    text: 'Pötyi 4, Zümi 3 hógolyót gyúrt.',
    say: 'Első mese. Pötyi gyúrt 4 hógolyót. Zümi gyúrt 3 hógolyót. Hány hógolyót gyúrtak összesen? Melyik művelet illik ehhez a meséhez?',
    task: { ask: 'Melyik művelet illik a meséhez?', options: ['4 + 3', '4 − 3', '7 − 3'], hint: 'Összesen kell: a két kupacot összerakjuk. Több lesz, vagy kevesebb?' },
  },
  {
    scene: withEq(<TwoPilesScene a={4} b={3} whoA="potyi" whoB="meh" />, '4 + 3 = ?'),
    text: 'Hány hógolyót gyúrtak?',
    say: '4 + 3 egyenlő mennyi? Számold ki, és válaszolj a kérdésre: hány hógolyót gyúrtak összesen?',
    task: { ask: 'Hány hógolyót gyúrtak összesen?', options: [7, 1, 6], hint: 'Számolj tovább a 4-től: 5, 6, … még hármat!' },
  },
  {
    scene: withEq(
      <svg viewBox="0 0 480 240">
        <rect x="0" y="0" width="480" height="240" rx="18" fill="#fef3c7" />
        <svg x="60" y="20" width="360" height="200" viewBox="0 0 160 100">
          <CountBox icon="alma" n={8} crossed={3} className="" />
        </svg>
      </svg>,
      '8 − 3 = ?'
    ),
    text: 'Csigusz almát evett.',
    say: 'Második mese. A tányéron 8 alma volt. Csigusz megevett 3 almát. Kevesebb lett. Ez kivonás: 8 − 3. Hány alma maradt a tányéron?',
    task: { ask: 'Hány alma maradt a tányéron?', options: [5, 3, 4], hint: 'Az áthúzott almákat Csigusz már megette. Ne számold őket!' },
  },
  {
    scene: <FeederScene birds={6} coming={3} />,
    text: 'Jön még 3 madár.',
    say: 'Harmadik mese. Az etetőn 6 madár ült. Jött még 3 madár. Több lett, ez összeadás. Hány madár van most az etetőn?',
    task: { ask: 'Hány madár van most az etetőn?', options: [9, 3, 8], hint: 'Számolj tovább a 6-tól a jövő madarakkal: 7, 8, …' },
  },
  {
    scene: <FeederScene birds={6} away={4} />,
    text: '4 madár elrepült.',
    say: 'Negyedik mese. Az etetőn 10 madár ült. 4 madár elrepült. Hány madár maradt az etetőn?',
    task: { ask: 'Hány madár maradt az etetőn?', say: '10 madár ült az etetőn, 4 elrepült. Hány madár maradt?', options: [6, 4, 10], hint: 'A repülőket ne számold, csak az etetőn ülőket!' },
  },
  {
    scene: <MoreLessScene a={5} diff={2} more icon="hopehely" whoA="meh" whoB="csiga" />,
    text: 'Csigusz 2-vel többet fogott.',
    say: 'Ötödik mese. Zümi 5 hópelyhet fogott el. Csigusz 2-vel többet fogott. Ha 2-vel több, akkor az 5-höz még 2-t adunk. Hány hópelyhet fogott Csigusz?',
    task: { ask: 'Hány hópelyhet fogott Csigusz?', options: [7, 3, 5], hint: '2-vel több: tegyél hozzá 2-t az 5-höz!' },
  },
  {
    scene: <MoreLessScene a={9} diff={3} more={false} icon="hogolyo" whoA="potyi" whoB="meh" />,
    text: 'Zümi 3-mal kevesebbet gyúrt.',
    say: 'Hatodik mese. Pötyi 9 hógolyót gyúrt. Zümi 3-mal kevesebbet. Ha 3-mal kevesebb, akkor a 9-ből elveszünk 3-at. Hány hógolyót gyúrt Zümi?',
    task: { ask: 'Hány hógolyót gyúrt Zümi?', options: [6, 3, 7], hint: '3-mal kevesebb: vegyél el 3-at a 9-ből! Lépj vissza hármat.' },
  },
  {
    text: 'Melyik kép illik a meséhez?',
    say: 'Hetedik mese. Csigusz talált 3 piros levelet és 2 zöld levelet. Melyik kép illik ehhez a meséhez?',
    task: {
      ask: 'Melyik kép illik a meséhez?',
      options: [
        { figure: <CountBox icon="level" n={3} nb={2} color="#ef4444" colorB="#22c55e" />, say: '3 piros és 2 zöld levél' },
        { figure: <CountBox icon="level" n={2} nb={3} color="#ef4444" colorB="#22c55e" />, say: '2 piros és 3 zöld levél' },
        { figure: <CountBox icon="level" n={3} nb={3} color="#ef4444" colorB="#22c55e" />, say: '3 piros és 3 zöld levél' },
      ],
      hint: 'Számold meg külön a piros és külön a zöld leveleket!',
    },
  },
  {
    scene: <FeederFriendsScene dots={10} />,
    text: 'Ügyes mesemegoldó vagy!',
    say: 'Hurrá! Minden mesét megoldottál. Ne feledd: figyelmesen hallgasd meg, nézd meg a képet, döntsd el, több lett vagy kevesebb, és válaszolj a kérdésre! Most gyere, játsszunk!',
    mood: 'cheer',
    dots: 10,
  },
];

export const SzovegesFeladatokG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="19. Szöveges feladatok"
    storyTitle="Pötyi mesedélutánja"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • MESE"
    pages={PAGES}
    coverDots={10}
    playground={<StoryMachinePlayground />}
    playgroundTitle="Játszótér: Pötyi mesegépe"
    parentNote="A gyerek rövid, felolvasott meséket old meg 10-ig: meghallgatja, megnézi a képet, eldönti, hogy összeadás vagy kivonás kell (több lett vagy kevesebb), kiszámolja és válaszol. Megismeri az „ennyivel több / kevesebb” kifejezéseket is. Olvasni nem kell: a mesét a gép mondja el, a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default SzovegesFeladatokG1Mese;
