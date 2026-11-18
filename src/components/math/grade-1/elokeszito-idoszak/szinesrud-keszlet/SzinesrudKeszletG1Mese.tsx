import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { AllRodsScene, BoxScene, BuildScene, PatternScene, RodsCompare, StairScene, fitOpt, rodOpt } from './SzinesrudKeszletG1Scenes';
import { RodFitPlayground } from './SzinesrudKeszletG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <BoxScene />,
    text: 'Nézd, egy doboz!',
    say: 'Szia! Pötyi vagyok, a kis katica. A Számkertben találtam egy dobozt. Tele van színes rudakkal! Nézzük meg együtt!',
    mood: 'wow',
  },
  {
    scene: <AllRodsScene />,
    text: 'Ez a színesrúd-készlet.',
    say: 'Ez a színesrúd-készlet. Van benne fehér, rózsaszín, világoskék, piros, sárga, lila, fekete, barna, kék és narancssárga rúd. Minden színű rúd más hosszú.',
  },
  {
    scene: <RodsCompare lens={[7, 10, 4]} />,
    text: 'Melyik a leghosszabb?',
    say: 'Itt van három rúd. Melyik a leghosszabb?',
    task: { ask: 'Melyik a leghosszabb?', options: [rodOpt(10), rodOpt(7), rodOpt(4)], hint: 'Nézd meg, melyik ér a legmesszebbre jobbra!' },
  },
  {
    scene: <RodsCompare lens={[3, 1, 2]} />,
    text: 'Melyik a legrövidebb?',
    say: 'És ezek közül melyik a legrövidebb?',
    task: { ask: 'Melyik a legrövidebb?', options: [rodOpt(1, 3), rodOpt(2, 3), rodOpt(3, 3)], hint: 'A legrövidebb olyan kicsi, mint egy kis kocka.' },
  },
  {
    scene: <StairScene potyi />,
    text: 'Lépcsőt építek!',
    say: 'Építsünk lépcsőt! Alulra a leghosszabb kerül, a narancssárga. Fölé mindig egy kicsit rövidebb rúd jön. Legfölül a kis fehér kocka van. Fel is másztam a tetejére!',
    mood: 'cheer',
  },
  {
    scene: <StairScene missing={5} />,
    text: 'Egy rúd kiesett!',
    say: 'Jaj, egy rúd kiesett a lépcsőből! Melyik rúd fér pontosan a helyére?',
    task: {
      ask: 'Melyik rúd fér a helyére?',
      say: 'Melyik rúd fér pontosan a szaggatott helyre? Nézd meg, melyik nem lóg ki, és nem is rövidebb!',
      options: [fitOpt(5, 5), fitOpt(5, 4), fitOpt(5, 6)],
      hint: 'Ez nem jó: kilóg, vagy marad üres hely. Keresd azt, amelyik pont akkora!',
    },
  },
  {
    scene: <StairScene />,
    text: 'Mondd a színeket!',
    say: 'Mondd el velem a színeket alulról fölfelé: narancssárga, kék, barna, fekete, lila, sárga, piros, világoskék, rózsaszín, fehér. Most csukd be a szemed, és próbáld meg így is!',
    mood: 'think',
  },
  {
    scene: <PatternScene seq={[2, 2, 1, 2, 2]} />,
    text: 'Mi jön ezután?',
    say: 'Pötyi sorba állította a rudakat: rózsaszín, rózsaszín, fehér, rózsaszín, rózsaszín. Mi jön ezután?',
    task: { ask: 'Mi jön ezután?', options: [rodOpt(1, 2), rodOpt(2, 2)], hint: 'Két rózsaszín után mindig egy fehér jön. Most mi következik?' },
  },
  {
    scene: <BuildScene variant="gate" />,
    text: 'Kaput építek.',
    say: 'Pötyi kaput épít a kertbe. Két sárga oszlop már áll. Melyik rúd kell a tetejére, hogy pont befedje?',
    task: { ask: 'Melyik rúd kell a tetejére?', options: [fitOpt(4, 4), fitOpt(4, 5), fitOpt(4, 3)], hint: 'Ez kilóg, vagy nem éri el a másik oszlopot. Keresd a pont jót!' },
  },
  {
    scene: <RodsCompare lens={[3, 1, 2]} />,
    text: 'Találd ki!',
    say: 'Gondoltam egy rúdra. Rövidebb, mint a világoskék rúd, de nem ez a legrövidebb. Melyik az?',
    task: {
      ask: 'Melyikre gondoltam?',
      say: 'Rövidebb, mint a világoskék, de nem a legrövidebb. Melyik rúdra gondoltam?',
      options: [rodOpt(2, 3), rodOpt(1, 3), rodOpt(3, 3)],
      hint: 'A fehér a legrövidebb, az nem lehet. A világoskéknél pedig rövidebb kell.',
    },
  },
  {
    scene: <StairScene potyi />,
    text: 'Ügyes voltál!',
    say: 'Hurrá! Megismerted a színes rudakat. Tudod, melyik hosszabb, melyik rövidebb, és lépcsőt is építettél. Most gyere, játsszunk!',
    mood: 'cheer',
  },
];

export const SzinesrudKeszletG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="5. Színesrúd-készlet"
    storyTitle="Pötyi és a színes rudak lépcsője"
    badge="1. OSZTÁLY • I. ELŐKÉSZÍTŐ IDŐSZAK • MESE"
    pages={PAGES}
    coverDots={7}
    playground={<RodFitPlayground />}
    playgroundTitle="Játszótér: melyik rúd fér a helyére?"
    parentNote="A gyerek megismeri a színesrúd-készlet tíz színét, összehasonlítja a rudak hosszát (hosszabb, rövidebb, leghosszabb, legrövidebb), lépcsőt rak sorba, sorozatot folytat, és megkeresi, melyik rúd fér pontosan egy helyre. Ha van otthon színes rúd, rakjátok ki együtt a lépcsőt!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default SzinesrudKeszletG1Mese;
