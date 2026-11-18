import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { DigitTrace, NumberLine } from '../../shared/G1Pics';
import { Box6, Compare6, FingersDominoScene, LegsScene, PotyiDotsScene, RowScene, SixMorningScene, SplitsScene } from './AHatG1Scenes';
import { PotyiDotsPlayground } from './AHatG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <SixMorningScene />,
    text: 'Pötyi hátán hat pötty!',
    say: 'Jó reggelt! Pötyi felébredt a Számkertben, és nézd csak: ma hat pötty ragyog a hátán! Zümi és Csigusz csodálkozva nézik. Ma a hatot keressük. Gyere velünk!',
    mood: 'cheer',
    dots: 6,
  },
  {
    scene: <PotyiDotsScene dots={6} />,
    text: 'Számold meg a pöttyöket!',
    say: 'Számold meg Pötyi pöttyeit! Mutass rá mindegyikre!',
    task: { ask: 'Hány pötty van Pötyi hátán?', options: [6, 5, 4], hint: 'Az egyik szárnyán öt pötty van, a másikon még egy. Számold tovább!' },
  },
  {
    scene: <LegsScene />,
    text: 'És hány lábam van?',
    say: 'Pötyi nevet: és hány lábam van? Számold meg mindkét oldalon!',
    task: { ask: 'Hány lába van Pötyinek?', options: [6, 4, 5], hint: 'Az egyik oldalon három láb van, a másikon is három. Számold meg mindet!' },
  },
  {
    scene: <RowScene icon="katica" n={5} n2={1} ringSecond />,
    text: 'Öt meg még egy: hat.',
    say: 'Öt kis katica játszik a fűben. Jön még egy! Öt meg egy, az hat. A hat eggyel több, mint az öt.',
    dots: 6,
  },
  {
    text: 'Hol van hat eper?',
    say: 'Pötyi epret szed a barátainak. Melyik dobozban van hat eper? Koppints rá!',
    task: {
      ask: 'Hol van hat eper?',
      options: [
        { figure: <Box6 icon="eper" n={6} />, say: 'hat eper' },
        { figure: <Box6 icon="eper" n={5} />, say: 'öt eper' },
        { figure: <Box6 icon="eper" n={4} />, say: 'négy eper' },
      ],
      hint: 'Számold meg az epreket mindegyik dobozban! Hat legyen.',
    },
  },
  {
    scene: <DigitTrace digit={6} />,
    text: 'Ez a hatos: 6',
    say: 'Ez itt a hatos. A zöld pöttytől indulunk fent, nagy ívben lekanyarodunk, és alul egy kerek pocakot rajzolunk. Rajzold le a levegőbe az ujjaddal!',
    dots: 6,
  },
  {
    scene: <FingersDominoScene n={6} />,
    text: 'Hat ujj. Hat pötty.',
    say: 'Az egyik kezeden mutass ötöt, a másikon egyet! Ez hat ujj. A dominón két sorban, hármasával van a hat pötty.',
  },
  {
    scene: <NumberLine max={6} mark={[6]} />,
    text: 'A 6 az 5 után jön.',
    say: 'Ez a számegyenes. Nulla, egy, kettő, három, négy, öt, és utána jön a hat, itt, ahol a piros pötty van.',
    dots: 6,
  },
  {
    scene: <Compare6 icon="eper" a={6} b={5} />,
    text: 'Hol van több?',
    say: 'Bal oldalon hat eper van, jobb oldalon öt. Melyik jel kell középre? A jel hegye a kevesebb felé mutat.',
    task: { ask: 'Melyik jel kell?', options: ['>', '<', '='], hint: 'Jobb oldalon kevesebb van. A jel hegye arra mutasson!' },
  },
  {
    scene: <SplitsScene rows={[[5, 1], [4, 2], [3, 3]]} />,
    text: 'A hat sokféle lehet.',
    say: 'Pötyinek hat korongja van, pirosak és kékek. Öt piros meg egy kék, az hat. Négy piros meg két kék, az is hat. Három meg három, az is hat!',
    dots: 6,
  },
  {
    scene: <RowScene icon="alma" n={4} hidden tag="6" />,
    text: 'Mi van a levél alatt?',
    say: 'Csigusz hat almát hozott. Négyet látsz, a többi a nagy levél alatt bújik. Hány alma van a levél alatt?',
    task: { ask: 'Hány alma bújik a levél alatt?', options: [2, 1, 3], hint: 'Négy alma látszik. Mennyi kell még, hogy hat legyen? Számolj tovább az ujjaiddal: öt, hat.' },
  },
  {
    scene: <PotyiDotsScene dots={6} mood="cheer" />,
    text: 'Megtaláltad a hatot!',
    say: 'Hurrá! Megtaláltuk a hatot. Hat pötty, hat láb, hat eper, hat ujj. Most gyere, játsszunk!',
    mood: 'cheer',
    dots: 6,
  },
];

export const AHatG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="1. A hat"
    storyTitle="Pötyi és a hat pötty"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • MESE"
    pages={PAGES}
    coverDots={6}
    playground={<PotyiDotsPlayground />}
    playgroundTitle="Játszótér: Pötyi pöttyei"
    parentNote="A gyerek felismeri a hat elemű csoportokat, megtudja, hogy a hat eggyel több az ötnél, megismeri a 6-os számjegyet, írásirányát és helyét a számegyenesen, az ujjképet (5 + 1) és a dominóképet. Összehasonlít (<, >, =), és látja, hogy a hat többféleképpen is kirakható (5 + 1, 4 + 2, 3 + 3). A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default AHatG1Mese;
