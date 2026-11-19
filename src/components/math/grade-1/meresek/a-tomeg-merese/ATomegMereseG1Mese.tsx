import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { Potyi } from '../../shared/Potyi';
import { BallScalesScene, BigScaleScene, EndScene, IconFig, ItemFig, MarketScene, SacksScene, ScaleFig, SeesawScene } from './ATomegMereseG1Scenes';
import { BalancePlayground } from './ATomegMereseG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <MarketScene />,
    text: 'Ma piac van a Számkertben!',
    say: 'Szia! Pötyi vagyok. Ma piac van a Számkertben. Csigusz tököt, dinnyét és körtét árul, Zümi mézet. Segítünk nekik mérni. Jössz?',
    mood: 'cheer',
  },
  {
    scene: <SeesawScene heavyRight />,
    text: 'A nehezebb lent van.',
    say: 'Előbb libikókázunk! Csigusz lement, Pötyi fent maradt. A libikóka nehezebb vége lent van, a könnyebb vége fent.',
    task: {
      ask: 'Ki a nehezebb?',
      options: [
        { figure: <IconFig icon="csiga" />, say: 'Csigusz' },
        { figure: <Potyi className="w-20 h-20" />, say: 'Pötyi' },
      ],
      hint: 'Kinek a vége van lent? Az a nehezebb.',
    },
  },
  {
    scene: <BigScaleScene tilt={1} left={[{ k: 'tok' }]} right={[{ k: 'alma' }]} />,
    text: 'Ez a kétkarú mérleg.',
    say: 'Ez a kétkarú mérleg. Olyan, mint a libikóka: a nehezebb oldala lesüllyed, a könnyebb felemelkedik.',
    task: {
      ask: 'Melyik a nehezebb?',
      options: [
        { figure: <ItemFig k="tok" />, say: 'a tök' },
        { figure: <ItemFig k="alma" />, say: 'az alma' },
      ],
      hint: 'Melyik serpenyő van lent? Ami benne van, az a nehezebb.',
    },
  },
  {
    scene: <BigScaleScene tilt={0} left={[{ k: 'korte' }]} right={[{ k: 'korte' }]} />,
    text: 'Egyenesen áll: ugyanolyan nehéz.',
    say: 'Ha a két oldal ugyanolyan nehéz, a mérleg egyenesen áll. Azt mondjuk: egyensúlyban van.',
    task: {
      ask: 'Melyik mérleg áll egyensúlyban?',
      options: [
        { figure: <ScaleFig tilt={0} left={[{ k: 'eper' }]} right={[{ k: 'eper' }]} />, say: 'eper és eper, egyenesen áll' },
        { figure: <ScaleFig tilt={1} left={[{ k: 'dinnye' }]} right={[{ k: 'eper' }]} />, say: 'dinnye és eper, a dinnye lent' },
        { figure: <ScaleFig tilt={-1} left={[{ k: 'eper' }]} right={[{ k: 'tok' }]} />, say: 'eper és tök, a tök lent' },
      ],
      hint: 'Ez a mérleg ferde, az egyik oldala lent van. Melyik áll egyenesen?',
    },
  },
  {
    scene: <BigScaleScene tilt={-1} left={[{ k: 'lufi' }]} right={[{ k: 'ko' }]} />,
    text: 'A nagyobb nem mindig nehezebb!',
    say: 'Zümi egy nagy léggömböt és egy kis követ tett a mérlegre. Nézd, melyik oldal süllyedt le!',
    mood: 'wow',
    task: {
      ask: 'Melyik a nehezebb?',
      options: [
        { figure: <ItemFig k="ko" />, say: 'a kő' },
        { figure: <ItemFig k="lufi" />, say: 'a léggömb' },
      ],
      hint: 'A léggömb nagy, de nézd meg, melyik serpenyő van lent!',
      praise: 'Úgy van! A kis kő nehezebb, mint a nagy léggömb.',
    },
  },
  {
    scene: <BigScaleScene tilt={0} left={[{ k: 'korte' }]} right={{ balls: 3 }} />,
    text: 'Mérjünk golyókkal!',
    say: 'Pötyi a körte mellé golyókat tesz, amíg a mérleg egyenesen nem áll. Így megtudjuk, hány golyó nehéz a körte.',
    task: {
      ask: 'Hány golyó nehéz a körte?',
      options: [3, 2, 4],
      hint: 'Számold meg a golyókat a jobb oldali serpenyőben!',
    },
  },
  {
    scene: <BallScalesScene rows={[{ k: 'alma', n: 2 }, { k: 'mez', n: 5 }]} />,
    text: 'Az alma 2 golyó, a méz 5 golyó.',
    say: 'Az alma 2 golyóval van egyensúlyban, Zümi mézesbödöne 5 golyóval.',
    task: {
      ask: 'Melyik a nehezebb?',
      options: [
        { figure: <ItemFig k="mez" />, say: 'a méz' },
        { figure: <ItemFig k="alma" />, say: 'az alma' },
      ],
      hint: 'Amelyikhez több golyó kell, az a nehezebb.',
    },
  },
  {
    scene: <BigScaleScene tilt={1} left={[{ k: 'dinnye' }]} right={[{ k: 'eper' }]} />,
    text: 'A dinnye nehezebb, mint az eper.',
    say: 'A dinnye nehezebb, mint az eper. Melyik jelet tesszük a dinnye és az eper közé?',
    task: {
      ask: 'dinnye □ eper',
      say: 'Melyik jel kell a dinnye és az eper közé?',
      options: ['>', '<', '='],
      hint: 'A jel szája a nehezebb felé nyílik. Melyik a nehezebb?',
    },
  },
  {
    scene: <BigScaleScene tilt={0} left={[{ k: 'suly', s: 1 }]} right={[{ k: 'zsak', label: '1 kg', s: 1 }]} />,
    text: 'Ez 1 kilogramm. Jele: kg.',
    say: 'Ez a súly 1 kilogramm. Röviden így írjuk: kg. A zsák liszt is 1 kilogramm, ezért áll egyenesen a mérleg.',
    task: {
      ask: 'Melyik nehezebb 1 kg-nál?',
      say: 'Melyik nehezebb 1 kilogrammnál?',
      options: [
        { figure: <ItemFig k="dinnye" />, say: 'a dinnye' },
        { figure: <ItemFig k="eper" />, say: 'az eper' },
        { figure: <ItemFig k="alma" />, say: 'az alma' },
      ],
      hint: 'Gondolj arra, mit nehéz felemelni a piacon!',
    },
  },
  {
    scene: <SacksScene sacks={[{ label: '2 kg' }, { label: '3 kg' }]} sign={['+']} />,
    text: 'Pötyi krumplit vesz.',
    say: 'Pötyi vett egy 2 kilogrammos és egy 3 kilogrammos zsák krumplit. Hány kilogramm krumpli van összesen?',
    task: {
      ask: '2 kg + 3 kg = ? kg',
      say: '2 kilogramm meg 3 kilogramm, az hány kilogramm?',
      options: [5, 4, 6],
      hint: 'Számolj 3-tól kettőt tovább!',
    },
  },
  {
    scene: <EndScene />,
    text: 'Ügyes mérő vagy!',
    say: 'Hurrá! Megtanultuk: a nehezebb oldal lesüllyed, a könnyebb felemelkedik, egyforma tömegnél a mérleg egyenesen áll. Mértünk golyókkal és kilogrammal is. Most gyere, játsszunk!',
    mood: 'cheer',
  },
];

export const ATomegMereseG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="2. A tömeg mérése"
    storyTitle="Pötyi és a piaci mérleg"
    badge="1. OSZTÁLY • V. MÉRÉSEK • MESE"
    pages={PAGES}
    coverDots={7}
    playground={<BalancePlayground />}
    playgroundTitle="Játszótér: mérj golyókkal!"
    parentNote="A gyerek megtanulja, hogy a kétkarú mérlegen a nehezebb oldal lesüllyed, egyforma tömegnél a mérleg egyensúlyban van, és hogy a nagyobb tárgy nem mindig nehezebb. Golyókkal mér, a tömegeket jelekkel (<, >, =) hasonlítja össze, és megismeri az 1 kilogrammot (kg). Otthon emelgessenek két tárgyat: melyik a nehezebb?"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default ATomegMereseG1Mese;
