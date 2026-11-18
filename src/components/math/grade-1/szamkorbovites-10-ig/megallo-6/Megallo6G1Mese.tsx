import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { Box6, Compare6, RowScene } from '../a-hat/AHatG1Scenes';
import { ChainScene } from '../szamolas-0-tol-6-ig/Szamolas0Tol6IgG1Scenes';
import { PairUpScene, PARATLAN, PAROS } from '../paros-es-paratlan-szamok/ParosEsParatlanSzamokG1Scenes';
import { HAMIS, IGAZ, LadybugOpScene, NumberCloudScene, RestStopScene, ShrinkScene } from './Megallo6G1Scenes';
import { LadybugOpsPlayground } from './Megallo6G1Parts';

const PAGES: MesePage[] = [
  {
    scene: <RestStopScene />,
    text: 'Megálló!',
    say: 'Pötyi, Zümi és Csigusz megáll pihenni a hatos táblánál. Itt megnézzük, mit tanultunk: a hatot, a számolást hatig, és a páros meg páratlan számokat. Gyere, próbáld ki!',
    mood: 'cheer',
    dots: 6,
  },
  {
    scene: <ShrinkScene icon="alma" counts={[6, 5, 4]} />,
    text: 'Hogyan változik?',
    say: 'Csigusz almákat eszeget. Nézd meg a dobozokat sorban! Hogyan változik az almák száma? Hány alma lesz a következő dobozban?',
    task: { ask: 'Hány alma lesz a következőben?', options: [3, 4, 2], hint: 'Hat, öt, négy… Minden dobozban mennyivel kevesebb van?' },
  },
  {
    scene: <LadybugOpScene op="6 − 2" />,
    text: 'Hány pötty kell?',
    say: 'Pötyi egyik barátja elvesztette a pöttyeit. A kártyán ez áll: hat elvéve kettő. Annyi pötty kell a hátára, amennyi az eredmény. Hány pötty kell?',
    task: { ask: 'Hány pötty kell a katicára?', say: 'Mennyi hat elvéve kettő?', options: [4, 3, 5], hint: 'Mutass hat ujjat, és hajts le kettőt!' },
  },
  {
    scene: <Box6 icon="eper" n={5} className="w-48 h-40 mx-auto" />,
    text: 'Igaz vagy hamis?',
    say: 'Zümi azt mondja: a dobozban hat eper van. Számold meg! Igaz, amit Zümi mond, vagy hamis?',
    task: { ask: 'Hat eper van a dobozban?', options: [HAMIS, IGAZ], hint: 'Számold meg az epreket egyenként! Pont hat?' },
  },
  {
    scene: <NumberCloudScene nums={[6, 5, 2, 3, 4]} />,
    text: 'Melyik páratlan?',
    say: 'Pötyi színes számokat rajzolt. Nézd meg őket! Melyik páratlan szám?',
    task: { ask: 'Melyik páratlan?', options: [5, 6, 2, 4], hint: 'Páratlannál egy egyedül marad, ha párba állítod. Próbáld ki ujjakkal!' },
  },
  {
    scene: <PairUpScene icon="katica" n={6} />,
    text: 'Hat katica táncol.',
    say: 'A hat katica párban táncol. Mindenkinek jutott pár. Ezért a hat páros szám.',
    dots: 6,
  },
  {
    scene: <RowScene icon="alma" n={3} hidden tag="6" />,
    text: 'Mi van a levél alatt?',
    say: 'Zümi hat almát hozott. Hármat látsz, a többi a levél alatt bújik. Hány alma van a levél alatt?',
    task: { ask: 'Hány alma bújik a levél alatt?', options: [3, 2, 4], hint: 'Három látszik. Számolj tovább hatig: négy, öt, hat. Hányat számoltál?' },
  },
  {
    scene: <Compare6 icon="labda" a={5} b={6} />,
    text: 'Melyik jel kell?',
    say: 'Bal oldalon öt labda van, jobb oldalon hat. Melyik jel kell középre?',
    task: { ask: 'Melyik jel kell?', options: ['<', '>', '='], hint: 'Bal oldalon kevesebb van. A jel hegye a kevesebb felé mutat.' },
  },
  {
    scene: <ChainScene start={2} ops={['+4', '−3']} values={['', '?']} />,
    text: 'Kövesd a nyilakat!',
    say: 'Csigusz a kettesről indul. Előbb néggyel előre megy, aztán hárommal vissza. Hová ér a végén?',
    task: { ask: 'Mi kerül a ? helyére?', options: [3, 2, 4], hint: 'Előbb: kettő meg négy. Ami kijön, abból vegyél el hármat!' },
  },
  {
    scene: <RowScene icon="level" n={3} n2={3} color2="#f59e0b" />,
    text: 'Páros vagy páratlan?',
    say: 'Csigusz reggel három levelet evett, este még hármat. Hány levelet evett összesen? Páros vagy páratlan ez a szám?',
    task: { ask: 'Páros vagy páratlan?', options: [PAROS, PARATLAN], hint: 'Három meg három, az hat. Jut mindenkinek pár a hatban?' },
  },
  {
    scene: <RestStopScene />,
    text: 'Szuper vagy!',
    say: 'Hurrá! Mindent tudsz hatig. Most jön Pötyi nagy játéka: sok-sok kérdés három szinten. Gyere, játsszunk!',
    mood: 'cheer',
    dots: 6,
  },
];

export const Megallo6G1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="4. Megálló"
    storyTitle="Pötyi és a hatos megálló"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • MESE"
    pages={PAGES}
    coverDots={6}
    playground={<LadybugOpsPlayground />}
    playgroundTitle="Játszótér: katicapöttyök"
    parentNote="Ismétlés a 0–6 számkörben: a hat fogalma és bontásai, összeadás és kivonás 6-ig (képről, számegyenesen, nyilakkal), összehasonlítás (<, >, =), igaz–hamis döntés, valamint a páros és páratlan számok. A végén Pötyi nagy játéka szintenként 12 kérdéssel méri fel a tudást. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default Megallo6G1Mese;
