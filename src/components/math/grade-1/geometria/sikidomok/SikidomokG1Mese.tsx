import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import {
  COLORS,
  FourShapesScene,
  HouseBuildScene,
  MirrorFig,
  MirrorScene,
  PuddleScene,
  ROCKET,
  SackScene,
  ShapePicture,
  ShapeRowScene,
  ShapesHelloScene,
  SquareVsRectScene,
  StickShapesScene,
  fold,
  shp,
} from './SikidomokG1Scenes';
import { ShapeHuntPlayground } from './SikidomokG1Parts';

const C = COLORS;

const PAGES: MesePage[] = [
  {
    scene: <ShapesHelloScene />,
    text: 'Pötyi zsákjában formák vannak.',
    say: 'Szia! Pötyi vagyok. Nézd, a zsákomból lapos formák potyogtak ki! Ezek a síkidomok. Laposak, mint egy papírlap. Gyere, ismerd meg őket!',
    mood: 'cheer',
  },
  {
    scene: <FourShapesScene />,
    text: 'Kör, háromszög, négyzet, téglalap.',
    say: 'Ez itt a kör, kerek, mint a tányér. Ez a háromszög, három sarka van. Ez a négyzet, és ez a téglalap.',
  },
  {
    scene: <StickShapesScene shapes={['haromszog']} className="w-52 h-auto mx-auto" />,
    text: 'A háromszöghöz 3 pálcika kell.',
    say: 'Pötyi pálcikákból kirakja a háromszöget. Számold meg, hány pálcika kell hozzá!',
    task: { ask: 'Hány pálcika kell?', say: 'Hány pálcikából áll a háromszög?', options: [3, 4, 2], hint: 'Mutass rá mindegyik pálcikára, és számold!' },
  },
  {
    scene: <SquareVsRectScene />,
    text: 'Négyzet és téglalap.',
    say: 'A négyzetnek mind a négy oldala egyforma hosszú. A téglalap hosszúkás: két oldala hosszabb, kettő rövidebb. Mindkettőhöz 4 pálcika kell.',
  },
  {
    text: 'Hol a téglalap?',
    say: 'Melyik a téglalap? Koppints rá!',
    task: {
      ask: 'Melyik a téglalap?',
      options: [shp('teglalap', C.zold), shp('negyzet', C.zold), shp('kor', C.zold)],
      hint: 'Ennek minden oldala egyforma. A téglalap hosszúkás.',
    },
  },
  {
    scene: <ShapeRowScene items={[{ k: 'kor', color: C.piros }, { k: 'negyzet', color: C.kek }, { k: 'haromszog', color: C.sarga }, { k: 'kor', color: C.piros }, { k: 'negyzet', color: C.kek }, null]} />,
    text: 'Mi jön a sorban?',
    say: 'Zümi sort rakott: kör, négyzet, háromszög, aztán újra kör, négyzet. Mi jön a kérdőjel helyére?',
    task: {
      ask: 'Mi jön a sorban?',
      options: [shp('haromszog', C.sarga), shp('kor', C.piros), shp('negyzet', C.kek)],
      hint: 'Mondd hangosan: kör, négyzet, háromszög, kör, négyzet, és…',
    },
  },
  {
    scene: <SackScene shapes={[{ k: 'haromszog', color: C.kek }, { k: 'haromszog', color: C.piros, rot: 20 }, { k: 'derekszogu', color: C.zold }, { k: 'kor', color: C.sarga }, { k: 'haromszog', color: C.lila, rot: -15 }]} />,
    text: 'Melyik nem illik a zsákba?',
    say: 'Ebbe a zsákba csak háromszögek valók. Az egyik forma rossz helyre került. Melyik?',
    task: {
      ask: 'Melyik nem illik a zsákba?',
      options: [shp('kor', C.sarga), shp('haromszog', C.kek), shp('derekszogu', C.zold)],
      hint: 'Ennek három sarka van, ez háromszög. Melyik kerek?',
    },
  },
  {
    scene: <ShapePicture shapes={ROCKET} w={240} h={200} bg="#eef2ff" className="w-60 h-auto mx-auto" />,
    text: 'Pötyi rakétát rakott ki.',
    say: 'Pötyi síkidomokból rakétát rakott ki. Számold meg, hány háromszöget használt!',
    task: { ask: 'Hány háromszög van a rakétán?', options: [5, 3, 7], hint: 'Ne felejtsd el a lángokat és a szárnyakat! Mutass mindegyikre!' },
  },
  {
    scene: <HouseBuildScene />,
    text: 'Mi kell a tetőre?',
    say: 'Csigusz házat rak ki. A tető még hiányzik. Melyik síkidom illik a helyére?',
    task: {
      ask: 'Melyik illik a tetőre?',
      options: [shp('haromszog', C.piros), shp('kor', C.piros), shp('teglalap', C.piros)],
      hint: 'Nézd meg a szaggatott vonalat! Hány sarka van?',
    },
  },
  {
    scene: <MirrorScene />,
    text: 'Melyik a tükörképe?',
    say: 'Pötyi a tócsában meglátja a tükörképét. Most a piros vonal a tükör. Melyik a lila forma tükörképe a tükör másik oldalán?',
    task: {
      ask: 'Melyik a tükörképe?',
      options: [
        { figure: <MirrorFig mode="mirror" />, say: 'átfordítva oldalra' },
        { figure: <MirrorFig mode="same" />, say: 'ugyanúgy áll' },
        { figure: <MirrorFig mode="flip" />, say: 'fejjel lefelé' },
      ],
      hint: 'A tükörben a forma átfordul: ami a tükörhöz közel van, az a túloldalon is közel lesz.',
    },
  },
  {
    scene: <PuddleScene />,
    text: 'Melyiket lehet összehajtani?',
    say: 'Pötyi tükörképe a vízben pont olyan, mint ő. Melyik rajzot tudnád úgy összehajtani, hogy a két fele pontosan fedje egymást?',
    task: {
      ask: 'Melyiknek fedi egymást a két fele?',
      options: [fold('sziv'), fold('auto'), fold('zaszlo')],
      hint: 'Képzeld el, hogy középen összehajtod! Melyiknek egyforma a két fele?',
    },
  },
  {
    scene: <FourShapesScene labels={false} />,
    text: 'Formamester lettél!',
    say: 'Hurrá! Megismerted a kört, a háromszöget, a négyzetet és a téglalapot, és még a tükörrel is játszottunk. Most gyere, játsszunk!',
    mood: 'cheer',
  },
];

export const SikidomokG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="2. Síkidomok"
    storyTitle="Pötyi és a formás zsák"
    badge="1. OSZTÁLY • IV. GEOMETRIA • MESE"
    pages={PAGES}
    coverDots={7}
    playground={<ShapeHuntPlayground />}
    playgroundTitle="Játszótér: formavadászat"
    parentNote="A gyerek megismeri és megnevezi a kört, a háromszöget, a négyzetet és a téglalapot, megszámolja, hány pálcikából rakható ki egy forma, sormintát folytat, válogat, formákat számol egy kirakott képen, és a tükörrel is játszik (tükörkép, összehajtható rajzok). Otthon érdemes papírból kivágott formákból képeket kirakni."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default SikidomokG1Mese;
