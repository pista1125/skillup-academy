import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { Domino, DigitTrace, Hand, NumberLine, IconGroup } from '../../shared/G1Pics';
import { AppleTreeScene, FaceScene, GardenGateScene, GroupBox, SunSkyScene } from './AzEgyG1Scenes';
import { OneTapPlayground } from './AzEgyG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <GardenGateScene />,
    text: 'Szia! Pötyi vagyok.',
    say: 'Szia! Pötyi vagyok, a kis katica. Ma a Számkertben sétálunk, és az egyet keressük. Gyere velem!',
    mood: 'cheer',
  },
  {
    scene: <SunSkyScene suns={1} />,
    text: 'Nézd az eget!',
    say: 'Nézd az eget! Ott süt a nap. Számold meg!',
    task: { ask: 'Hány nap van az égen?', options: [1, 2, 3], hint: 'Mutass rá az ujjaddal! Hány napot látsz?' },
  },
  {
    scene: <AppleTreeScene apples={1} />,
    text: 'A fán egy alma van.',
    say: 'A fán egy piros alma van. Csak egy. Nem több.',
    dots: 1,
  },
  {
    text: 'Melyik képen van egy?',
    say: 'Melyik képen van egy alma? Koppints rá!',
    task: {
      ask: 'Hol van egy alma?',
      options: [
        { figure: <GroupBox icon="alma" n={1} />, say: 'egy alma' },
        { figure: <GroupBox icon="alma" n={3} />, say: 'sok alma' },
        { figure: <GroupBox icon="alma" n={2} />, say: 'több alma' },
      ],
      hint: 'Ott több alma van. Keresd azt, ahol csak egy van!',
    },
  },
  {
    scene: <DigitTrace digit={1} />,
    text: 'Ez az egyes: 1',
    say: 'Ez itt az egyes. Így írjuk: a zöld pöttytől felfelé, aztán egyenesen le. Rajzold le a levegőbe az ujjaddal!',
    dots: 1,
  },
  {
    scene: (
      <svg viewBox="0 0 480 170">
        <rect x="0" y="0" width="480" height="170" rx="18" fill="#fef3c7" />
        <svg x="50" y="20" width="130" height="130" viewBox="0 0 100 110">
          <Hand fingers={1} className="" />
        </svg>
        <svg x="250" y="45" width="180" height="90" viewBox="0 0 80 80">
          <Domino left={1} single className="" />
        </svg>
      </svg>
    ),
    text: 'Egy ujj. Egy pötty.',
    say: 'Mutass fel egy ujjat! Így. A dominón is egy pötty van.',
  },
  {
    scene: <FaceScene />,
    text: 'Egy orrod van.',
    say: 'Nézd meg az arcodat a tükörben! Egy orrod van, és egy szád. Szemből viszont kettő van, az több, mint egy.',
    task: {
      ask: 'Miből van egy?',
      say: 'Miből van egy az arcodon?',
      options: [
        { label: 'orr', figure: <svg viewBox="0 0 80 80"><path d="M40 14 L28 58 H52" fill="none" stroke="#9a3412" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" /></svg>, say: 'orr' },
        { label: 'szem', figure: <svg viewBox="0 0 80 80"><circle cx="24" cy="40" r="12" fill="#1f2937" /><circle cx="56" cy="40" r="12" fill="#1f2937" /></svg>, say: 'szem' },
      ],
      hint: 'Szemből kettő van. Mi van középen, csak egy?',
    },
  },
  {
    scene: <NumberLine max={10} mark={[1]} />,
    text: 'Az 1 itt lakik.',
    say: 'Ez a számegyenes. A számok egymás után sorakoznak. Az egyes a nulla után jön, itt, ahol a piros pötty van.',
  },
  {
    scene: (
      <svg viewBox="0 0 480 160">
        <rect x="0" y="0" width="480" height="160" rx="18" fill="#f0fdf4" />
        <svg x="30" y="20" width="150" height="120" viewBox="0 0 120 100">
          <GroupBox icon="labda" n={1} className="" />
        </svg>
        <text x="240" y="100" textAnchor="middle" fontSize="64" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">?</text>
        <svg x="300" y="20" width="150" height="120" viewBox="0 0 120 100">
          <GroupBox icon="labda" n={3} className="" />
        </svg>
      </svg>
    ),
    text: 'Hol van kevesebb?',
    say: 'Bal oldalon egy labda van, jobb oldalon több. Melyik jel kell középre? A kisebb felé a csőr hegye mutat.',
    task: { ask: 'Melyik jel kell?', options: ['<', '>', '='], hint: 'Az egy kevesebb. A jel hegye a kevesebb felé mutasson!' },
  },
  {
    scene: <IconGroup icon="csillag" n={1} className="w-40 h-40 mx-auto" />,
    text: 'Megtaláltad az egyet!',
    say: 'Hurrá! Megtaláltuk az egyet. Egy nap, egy alma, egy ujj, egy orr. Most gyere, játsszunk!',
    mood: 'cheer',
    dots: 1,
  },
];


export const AzEgyG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="1. Az egy"
    storyTitle="Pötyi és a nap, az alma meg az egyes"
    badge="1. OSZTÁLY • II. SZÁMOLÁS 0-TÓL 5-IG • MESE"
    pages={PAGES}
    coverDots={1}
    playground={<OneTapPlayground />}
    playgroundTitle="Játszótér: koppints egyet!"
    parentNote="A gyerek felismeri az egy elemű halmazokat, megkülönbözteti az „egy” és az „egynél több” mennyiséget, megismeri az 1-es számjegyet és helyét a számegyenesen, valamint az ujjképet és a dominóképet. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default AzEgyG1Mese;
