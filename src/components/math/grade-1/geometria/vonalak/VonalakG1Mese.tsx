import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { ICONS } from '../../shared/G1Pics';
import {
  BeeSnailPathScene,
  DigitFig,
  DigitLinesScene,
  DotsShapeScene,
  FenceScene,
  Hive,
  IconFig,
  LinesHelloScene,
  StickThreadScene,
  TangleScene,
  drawing,
  line,
} from './VonalakG1Scenes';
import { LineHuntPlayground } from './VonalakG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <LinesHelloScene />,
    text: 'Ma vonalakat keresünk!',
    say: 'Szia! Pötyi vagyok. Ma Zümivel, a méhecskével és Csigusszal, a csigával vonalakat keresünk a Számkertben. Gyere velünk!',
    mood: 'cheer',
  },
  {
    scene: <StickThreadScene />,
    text: 'A pálcika egyenes. A fonal görbe.',
    say: 'Nézd! A pálcika egyenes, sehol sem hajlik. A fonal görbe, kanyarog, mint egy kígyó.',
  },
  {
    text: 'Melyik vonal egyenes?',
    say: 'Melyik vonal egyenes, mint a pálcika? Koppints rá!',
    task: {
      ask: 'Melyik vonal egyenes?',
      options: [line('ferde', '#16a34a'), line('hullam', '#16a34a'), line('iv', '#16a34a')],
      hint: 'Az a vonal hajlik, kanyarog. Keresd azt, amelyik sehol sem hajlik!',
    },
  },
  {
    scene: <BeeSnailPathScene />,
    text: 'Zümi egyenesen repül.',
    say: 'Zümi, a méhecske egyenesen repül virágtól virágig. Csigusz kanyarogva mászik levéltől levélig, az ő csíkja görbe.',
    task: {
      ask: 'Kinek az útja görbe?',
      say: 'Kinek az útja görbe vonal?',
      options: [
        { figure: <IconFig icon="csiga" />, say: 'Csigusz' },
        { figure: <IconFig icon="meh" />, say: 'Zümi' },
      ],
      hint: 'Zümi útja egyenes, mint a pálcika. Kié kanyarog?',
    },
  },
  {
    scene: <DigitLinesScene />,
    text: 'A számokban is vannak vonalak.',
    say: 'A számokban is vannak vonalak! Az 1 és a 4 csak egyenes vonalakból áll, ezeket zölddel rajzoltam. A 3 és a 0 görbe, ezek pirosak.',
  },
  {
    text: 'Melyik szám csak egyenes?',
    say: 'Melyik szám áll csak egyenes vonalakból?',
    task: {
      ask: 'Melyik szám csak egyenes?',
      options: [
        { figure: <DigitFig d={7} />, say: 'hét' },
        { figure: <DigitFig d={3} />, say: 'három' },
        { figure: <DigitFig d={8} />, say: 'nyolc' },
      ],
      hint: 'Ebben a számban görbe vonal is van. Keresd azt, amelyikben nincs kanyar!',
    },
  },
  {
    scene: <FenceScene closed />,
    text: 'A kerítés körbeér. Ez zárt vonal.',
    say: 'Pötyi kerítést épített a saláták köré. A kerítés körbeér, nincs rajta rés. Ez zárt vonal. Csigusz nem tud bemászni a salátához.',
  },
  {
    scene: <FenceScene closed={false} />,
    text: 'Itt rés van. Ez nyitott vonal.',
    say: 'Jaj! Ezen a kerítésen rés van. Ez nyitott vonal. Itt Csigusz be tud mászni, és megeszi a salátát!',
    mood: 'wow',
    task: {
      ask: 'Melyik zárt vonal?',
      say: 'Melyik vonal zárt? Melyikből nem tud kimászni Csigusz?',
      options: [line('paca', '#92400e'), line('nyitottpaca', '#92400e'), line('kanyar', '#92400e')],
      hint: 'Fuss végig rajta az ujjaddal! Ott rés van. Melyik ér körbe?',
    },
  },
  {
    scene: <TangleScene />,
    text: 'Kövesd a vonalat!',
    say: 'Hű, de kusza vonalak! Kövesd az ujjaddal Pötyi vonalát! Indulj Pötyitől, és ne térj le! Hová érkezik?',
    task: {
      ask: 'Hová vezet Pötyi vonala?',
      options: [
        { figure: <IconFig icon="virag" />, say: 'a virághoz' },
        { figure: <Hive />, say: 'a kaptárhoz' },
        { figure: <IconFig icon="level" />, say: 'a levélhez' },
      ],
      hint: 'Lassan húzd az ujjad! A kereszteződésnél menj tovább egyenesen a saját vonaladon.',
    },
  },
  {
    scene: <DotsShapeScene pts={[[240, 30], [380, 190], [100, 190]]} drawn={2} />,
    text: 'Kössük össze a pontokat!',
    say: 'Pötyi egyenes vonalakkal összeköti a pontokat. Még egy vonal hiányzik, a szaggatott. Ha azt is meghúzza, zárt forma lesz belőle.',
  },
  {
    text: 'Melyik rajz csak egyenes vonalakból áll?',
    say: 'Melyik rajzon van csak egyenes vonal?',
    task: {
      ask: 'Melyik rajz csak egyenes?',
      say: 'Melyik rajz áll csak egyenes vonalakból?',
      options: [drawing('haz'), drawing('alma'), drawing('felho')],
      hint: 'Ezen görbe vonal is van. Keresd azt, amelyiket pálcikákból ki tudnád rakni!',
    },
  },
  {
    scene: (
      <svg viewBox="0 0 480 120">
        <rect x="0" y="0" width="480" height="120" rx="18" fill="#fef3c7" />
        <path d="M40 60 L160 60" stroke="#16a34a" strokeWidth="8" strokeLinecap="round" />
        <path d="M190 60 Q215 20 240 60 T290 60" fill="none" stroke="#e11d48" strokeWidth="8" strokeLinecap="round" />
        <circle cx="360" cy="60" r="34" fill="none" stroke="#2563eb" strokeWidth="8" />
        {ICONS.csillag({ x: 440, y: 60, s: 1.2 })}
      </svg>
    ),
    text: 'Ügyes vonalvadász vagy!',
    say: 'Hurrá! Megtaláltuk az egyenes és a görbe vonalat, a nyitott és a zárt vonalat. Most gyere, játsszunk!',
    mood: 'cheer',
  },
];

export const VonalakG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="1. Vonalak"
    storyTitle="Pötyi és a kanyargós csigacsík"
    badge="1. OSZTÁLY • IV. GEOMETRIA • MESE"
    pages={PAGES}
    coverDots={7}
    playground={<LineHuntPlayground />}
    playgroundTitle="Játszótér: vonalvadászat"
    parentNote="A gyerek megkülönbözteti az egyenes és a görbe vonalat (pálcika és fonal), felismeri őket a számjegyekben és a rajzokon, megtanulja, mi a nyitott és a zárt vonal, és gyakorolja egy vonal végigkövetését. Otthon pálcikából és fonalból is kirakhatják a vonalakat."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default VonalakG1Mese;
