import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { SignRow } from '../a-hat/AHatG1Scenes';
import { DanceScene, PairUpScene, PARATLAN, PAROS, ParityIcon, ParityLine, SocksScene } from './ParosEsParatlanSzamokG1Scenes';
import { PairingPlayground } from './ParosEsParatlanSzamokG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <DanceScene />,
    text: 'Ma bál van!',
    say: 'Ma táncmulatság van a Számkertben! Zümi zenél, a katicák párban táncolnak. Egy párban két katica van, és fogják egymás kezét.',
    mood: 'cheer',
    dots: 6,
  },
  {
    scene: <PairUpScene icon="katica" n={4} />,
    text: 'Mindenkinek van párja.',
    say: 'Nézd, itt katicák táncolnak párban. Mindegyiknek van párja. Számold meg őket!',
    task: { ask: 'Hány katica táncol?', options: [4, 2, 3], hint: 'Ne a párokat számold, hanem minden katicát egyenként!' },
  },
  {
    scene: <PairUpScene icon="katica" n={5} />,
    text: 'Egy egyedül maradt.',
    say: 'Most öt katica jött a bálba. Kettő-kettő párba állt. Jutott mindenkinek pár?',
    task: { ask: 'Jutott mindenkinek pár?', options: ['nem', 'igen'], hint: 'Nézd meg a szélén álló katicát! Kinek a kezét fogja?' },
  },
  {
    scene: (
      <svg viewBox="0 0 480 150">
        <rect x="0" y="0" width="480" height="150" rx="18" fill="#f8fafc" />
        <svg x="10" y="15" width="220" height="120" viewBox="0 0 120 70">
          <ParityIcon even className="" />
        </svg>
        <svg x="250" y="15" width="220" height="120" viewBox="0 0 120 70">
          <ParityIcon even={false} className="" />
        </svg>
      </svg>
    ),
    text: 'Páros, páratlan.',
    say: 'Ha mindenkinek jut pár, akkor az a szám páros. Ha egy egyedül marad, akkor az a szám páratlan. A négy páros, az öt páratlan.',
  },
  {
    scene: <SocksScene n={3} />,
    text: 'Pötyi zoknikat talált.',
    say: 'Pötyi zoknikat talált a szárítókötélen. Keress párt a zokniknak! Páros vagy páratlan a számuk?',
    task: { ask: 'Páros vagy páratlan?', say: 'Három zokni lóg a kötélen. Páros vagy páratlan?', options: [PARATLAN, PAROS], hint: 'Párosítsd a zoknikat kettesével! Marad egy egyedül?' },
  },
  {
    scene: <SocksScene n={6} />,
    text: 'És most?',
    say: 'Zümi még hozott zoknikat. Most hat zokni lóg a kötélen. Páros vagy páratlan?',
    task: { ask: 'Páros vagy páratlan?', options: [PAROS, PARATLAN], hint: 'Párosítsd a zoknikat kettesével! Marad egy egyedül?' },
  },
  {
    scene: <ParityLine />,
    text: 'Páros: 0, 2, 4, 6',
    say: 'Nézd a számegyenest! A páros számok pirosak: nulla, kettő, négy, hat. A páratlanok kékek: egy, három, öt. Minden második szám páros. Figyelj: a nulla is páros szám!',
  },
  {
    text: 'Melyik páros?',
    say: 'Melyik szám páros? Koppints rá!',
    task: { ask: 'Melyik szám páros?', options: [4, 3, 5], hint: 'Rakj ki annyi korongot, és állítsd párba! Melyiknél nem marad egyedül egy sem?' },
  },
  {
    scene: <SignRow items={['2', '+', '1', '=', '?']} />,
    text: 'Számolj, aztán párosíts!',
    say: 'Csigusz kettő meg egy virágot szedett. Számold ki! Páros vagy páratlan lett?',
    task: { ask: 'Az eredmény páros vagy páratlan?', options: [PARATLAN, PAROS], hint: 'Kettő meg egy, az három. A háromnak jut mindenkinek pár?' },
  },
  {
    scene: <PairUpScene icon="meh" n={5} />,
    text: 'Hány méh kell még?',
    say: 'Zümi barátai is táncolni szeretnének. Öten vannak, egy egyedül maradt. Hány méh kell még, hogy mindenkinek legyen párja?',
    task: { ask: 'Hány méh kell még?', options: [1, 2, 0], hint: 'Csak a magányos méhnek kell pár. Hány méh kell neki?' },
  },
  {
    scene: <DanceScene />,
    text: 'Szép volt a bál!',
    say: 'Hurrá! Megtanultuk: ha mindenkinek jut pár, a szám páros. Ha egy egyedül marad, páratlan. Most gyere, játsszunk!',
    mood: 'cheer',
    dots: 6,
  },
];

export const ParosEsParatlanSzamokG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="3. Páros és páratlan számok"
    storyTitle="Pötyi és a katicabál"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • MESE"
    pages={PAGES}
    coverDots={6}
    playground={<PairingPlayground />}
    playgroundTitle="Játszótér: párba állítás"
    parentNote="A gyerek párba állítással dönti el, hogy egy mennyiség páros (mindenkinek jut pár) vagy páratlan (egy egyedül marad). Megtanulja, hogy 6-ig a 0, 2, 4, 6 páros, az 1, 3, 5 páratlan, és műveletek eredményéről is eldönti, páros-e. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default ParosEsParatlanSzamokG1Mese;
