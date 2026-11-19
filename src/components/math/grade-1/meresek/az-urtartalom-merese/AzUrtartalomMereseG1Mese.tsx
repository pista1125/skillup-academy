import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { ICONS } from '../../shared/G1Pics';
import {
  CompareScene,
  CupsToVesselScene,
  EndScene,
  GlassFig,
  HelloScene,
  LiterScene,
  MeasureScene,
  PotJugsScene,
  PourScene,
  TripsScene,
  VesselFig,
  VesselsScene,
} from './AzUrtartalomMereseG1Scenes';
import { FillJugPlayground } from './AzUrtartalomMereseG1Parts';

const who = (icon: 'meh' | 'csiga', say: string) => ({
  figure: (
    <svg viewBox="0 0 60 60" className="w-20 h-20">
      {ICONS[icon]({ x: 30, y: 30, s: 1.2 })}
    </svg>
  ),
  say,
});

const PAGES: MesePage[] = [
  {
    scene: <HelloScene />,
    text: 'Szomjasak a virágok!',
    say: 'Szia! Pötyi vagyok. Nagy a meleg, a virágok lekókadtak, szomjasak. Zümivel és Csigusszal megöntözzük őket. Segítesz vizet hordani?',
    mood: 'think',
  },
  {
    scene: <VesselsScene kinds={['kanal', 'pohar', 'bogre', 'palack', 'vodor']} />,
    text: 'Ezekbe víz fér.',
    say: 'Kanál, pohár, bögre, palack, vödör. Mindegyikbe folyadék fér. De nem ugyanannyi!',
    task: {
      ask: 'Melyikbe fér a legtöbb víz?',
      options: [
        { figure: <VesselFig k="vodor" />, say: 'a vödörbe' },
        { figure: <VesselFig k="bogre" />, say: 'a bögrébe' },
        { figure: <VesselFig k="kanal" />, say: 'a kanálba' },
      ],
      hint: 'Melyik edény a legnagyobb belül? Abba fér a legtöbb.',
    },
  },
  {
    scene: <PourScene from="vodor" to="bogre" overflow />,
    text: 'A vödörből a bögrébe? Jaj!',
    say: 'Csigusz a teli vödör vizét a bögrébe öntötte. Mi történt? A vödörbe több víz fér, mint a bögrébe.',
    mood: 'wow',
    task: {
      ask: 'Mi történt?',
      say: 'Mi történt? Belefért a víz a bögrébe, vagy kifolyt?',
      options: [
        { figure: <GlassFig fill={1} overflow />, say: 'kifolyt a víz' },
        { figure: <GlassFig fill={0.5} />, say: 'belefért, félig lett' },
      ],
      hint: 'A vödörbe sokkal több víz fér, mint a bögrébe. Belefér a bögrébe?',
    },
  },
  {
    scene: <CupsToVesselScene rows={[{ k: 'kanna', n: 4 }]} />,
    text: 'Mérjük pohárral!',
    say: 'Pötyi pohárral tölti meg a locsolókannát. Minden teli pohár egy pohár víz. Hány pohár víz fért a kannába?',
    task: {
      ask: 'Hány pohár víz fért a kannába?',
      options: [4, 3, 5],
      hint: 'Mutass rá minden pohárra, és számold meg őket!',
    },
  },
  {
    scene: <TripsScene small={6} big={3} />,
    text: 'Kis pohárral többször kell fordulni.',
    say: 'Zümi kis pohárral, Csigusz nagy bögrével tölti meg ugyanakkora vödrét. Zümi 6-szor fordul, Csigusz csak 3-szor.',
    task: {
      ask: 'Kinek kell kevesebbszer fordulnia?',
      options: [who('csiga', 'Csigusz, a nagy bögrével'), who('meh', 'Zümi, a kis pohárral')],
      hint: 'Számold meg Zümi poharait és Csigusz bögréit! Kinek van kevesebb?',
      praise: 'Úgy van! A nagy bögrébe több fér, ezért Csigusznak kevesebbszer kell fordulnia.',
    },
  },
  {
    scene: <CompareScene a="csesze" b="vodor" />,
    text: 'Melyikbe fér több?',
    say: 'A csészébe kevesebb víz fér, mint a vödörbe. Melyik jel kell közéjük?',
    task: {
      ask: 'csésze □ vödör',
      say: 'Melyik jel kell a csésze és a vödör közé?',
      options: ['<', '>', '='],
      hint: 'A jel szája arra nyílik, amelyikbe több fér.',
    },
  },
  {
    scene: <LiterScene />,
    text: '10 kis pohár = 1 liter.',
    say: 'Ez a kis pohár 1 deciliteres. Az 1 literes kancsóból pontosan 10 ilyen pohár telik meg. 1 liter 10 deciliter.',
    task: {
      ask: 'Hány 1 dl-es pohár van itt?',
      say: 'Hány 1 deciliteres pohár telt meg az 1 literes kancsóból?',
      options: [10, 9, 5],
      hint: 'Számold meg a poharakat sorban: előbb a felső sort, aztán az alsót!',
    },
  },
  {
    scene: <PotJugsScene n={3} />,
    text: 'Litert kancsóval mérünk.',
    say: 'Pötyi a lábasból 1 literes kancsókba önti a vizet. 3 kancsó telt meg. Hány liter víz volt a lábasban?',
    task: {
      ask: 'Hány liter víz volt a lábasban?',
      options: [3, 2, 4],
      hint: 'Minden kancsó 1 liter. Számold meg a kancsókat!',
    },
  },
  {
    scene: <MeasureScene dl={4} />,
    text: 'Ez a mérőedény.',
    say: 'Ez a mérőedény. Minden kis vonal 1 deciliter. A legfelső vonal 1 liter. Számold meg alulról, meddig ér a víz!',
    task: {
      ask: 'Hány dl víz van benne?',
      say: 'Hány deciliter víz van a mérőedényben?',
      options: [4, 3, 5],
      hint: 'Alulról számold a vonalakat a víz tetejéig!',
    },
  },
  {
    scene: <MeasureScene dl={8} />,
    text: 'Még mennyi fér bele?',
    say: 'A mérőedényben 8 deciliter víz van. Az 1 liter 10 deciliter. Hány deciliter víz fér még bele, hogy 1 liter legyen?',
    task: {
      ask: '8 dl + ? dl = 10 dl',
      say: '8 deciliter, és még mennyi, hogy 10 deciliter legyen?',
      options: [2, 3, 1],
      hint: 'Számolj 8-tól 10-ig! Hányat léptél?',
    },
  },
  {
    scene: <EndScene />,
    text: 'A virágok megitták a vizet!',
    say: 'Hurrá! A virágok felélénkültek. Megtanultuk, melyik edénybe fér több és kevesebb, mértünk pohárral, deciliterrel és literrel. Most gyere, játsszunk!',
    mood: 'cheer',
  },
];

export const AzUrtartalomMereseG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="3. Az űrtartalom mérése"
    storyTitle="Pötyi és a szomjas virágok"
    badge="1. OSZTÁLY • V. MÉRÉSEK • MESE"
    pages={PAGES}
    coverDots={7}
    playground={<FillJugPlayground />}
    playgroundTitle="Játszótér: tölts a mérőedénybe!"
    parentNote="A gyerek összehasonlítja, melyik edénybe fér több vagy kevesebb folyadék, és megtapasztalja, hogy kisebb pohárral többször kell fordulni. Pohárral mér, megismeri a decilitert (dl) és a litert (l), és hogy 1 liter 10 deciliter. Otthon töltögessenek vizet: hány pohár víz fér egy kancsóba?"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default AzUrtartalomMereseG1Mese;
