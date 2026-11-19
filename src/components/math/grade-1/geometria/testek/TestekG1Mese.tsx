import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { LineFig } from '../vonalak/VonalakG1Scenes';
import { BlocksHelloScene, FeelySackScene, FlatVsSolidScene, GateScene, RampScene, SolidFig, TowersScene, flat, obj, solid } from './TestekG1Scenes';
import { TowerBuilderPlayground } from './TestekG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <BlocksHelloScene />,
    text: 'Ma építünk!',
    say: 'Szia! Pötyi vagyok. Ma építőkockákkal és más építőelemekkel játszunk. Ezek a testek. Kézbe veheted őket, és nem laposak.',
    mood: 'cheer',
  },
  {
    scene: <FlatVsSolidScene />,
    text: 'A négyzet lapos. A kocka test.',
    say: 'Nézd! A kék papírnégyzet lapos, mint a papír. Ez síkidom. A kék kocka nem lapos, megfoghatod, egymásra rakhatod. A kocka test.',
    task: {
      ask: 'Melyik a test?',
      say: 'Melyik test? Melyiket tudod kézbe venni, mint egy építőkockát?',
      options: [solid('kocka', '#3b82f6'), flat('negyzet', '#3b82f6'), flat('kor', '#3b82f6')],
      hint: 'Ez lapos, mint a papír. Keresd azt, amelyik nem lapos!',
    },
  },
  {
    scene: <RampScene />,
    text: 'A labda gurul. A kocka nem gurul.',
    say: 'Zümi a lejtőre tette a testeket. A labda alakú legurult. A fekvő konzervdoboz alakú is gurul. A kocka megállt, mert a lapjai laposak.',
    mood: 'wow',
  },
  {
    text: 'Melyik gurul?',
    say: 'Melyik test gurul le a lejtőn?',
    task: {
      ask: 'Melyik gurul?',
      options: [solid('gomb', '#ef4444'), solid('kocka', '#ef4444'), solid('teglatest', '#ef4444')],
      hint: 'Ennek lapos oldalai vannak, nem gurul. Melyik gömbölyű?',
    },
  },
  {
    scene: <TowersScene heights={[4]} className="w-40 h-auto mx-auto" />,
    text: 'Pötyi tornyot épít.',
    say: 'Pötyi kockákból tornyot épít. Számold meg, hány kockából áll a torony! Kezdd alulról!',
    task: { ask: 'Hány kockából épült?', options: [4, 3, 5], hint: 'Mutass rá mindegyik kockára alulról felfelé!' },
  },
  {
    scene: <TowersScene heights={[1, 2, 3]} numbers className="w-72 h-auto mx-auto" />,
    text: 'Három torony.',
    say: 'Zümi három tornyot épített. Az alattuk lévő szám mutatja, hány kocka van bennük: 1, 2 és 3. Hány kockát használt összesen?',
    task: { ask: 'Hány kocka van összesen?', say: 'Hány kocka van a három toronyban összesen?', options: [6, 5, 3], hint: 'Számold tovább toronyról toronyra: 1, aztán 2, aztán 3.' },
  },
  {
    scene: <GateScene />,
    text: 'Csigusz kaput épített.',
    say: 'Csigusz kaput épített. Két álló téglácska, rajtuk egy fekvő, legfelül egy tető. Hány építőelemből épült a kapu?',
    task: { ask: 'Hány elemből épült a kapu?', options: [4, 3, 5], hint: 'A tetőt is számold! Mutass rá mindegyik elemre!' },
  },
  {
    scene: <FeelySackScene />,
    text: 'Mi van a zsákban?',
    say: 'Csigusz becsukott szemmel a zsákba nyúl. Gömbölyű, nincs sarka, és gurul. Mi lehet az?',
    task: {
      ask: 'Mi lehet a zsákban?',
      options: [obj('labda'), obj('dobokocka'), obj('ajandek')],
      hint: 'Ennek sarkai vannak. Melyik gömbölyű, és gurul?',
    },
  },
  {
    scene: <SolidFig k="kup" color="#ef4444" className="w-36 h-36 mx-auto" />,
    text: 'Melyik tárgy ilyen?',
    say: 'Pötyi születésnapján a tárgyak között is elbújtak a testek. Melyik tárgy olyan, mint ez a csúcsos test?',
    task: {
      ask: 'Melyik olyan, mint ez a test?',
      options: [obj('sapka'), obj('pohar'), obj('labda')],
      hint: 'Ennek nincs csúcsa. Melyiknek van hegyes csúcsa, mint a testnek?',
    },
  },
  {
    scene: (
      <svg viewBox="0 0 480 150">
        <rect x="0" y="0" width="480" height="150" rx="18" fill="#f0f9ff" />
        <svg x="20" y="20" width="130" height="110" viewBox="0 0 120 80"><LineFig k="hullam" color="#db2777" frame={false} className="" /></svg>
        <svg x="175" y="15" width="130" height="120" viewBox="0 0 80 80"><rect x="16" y="16" width="48" height="48" fill="#facc15" stroke="#a16207" strokeWidth="3" /></svg>
        <svg x="330" y="15" width="130" height="120" viewBox="0 0 80 80"><SolidFig k="kocka" color="#facc15" frame={false} className="" /></svg>
      </svg>
    ),
    text: 'Vonal, síkidom, test.',
    say: 'A fonal vonal. A papírnégyzet lapos síkidom. A kocka test. Ugye, mind más?',
  },
  {
    text: 'Melyik nem test?',
    say: 'Három test és egy lapos síkidom. Melyik nem test?',
    task: {
      ask: 'Melyik nem test?',
      options: [flat('haromszog', '#22c55e'), solid('kocka', '#22c55e'), solid('henger', '#22c55e'), solid('gomb', '#22c55e')],
      hint: 'Ezt kézbe veheted, építhetsz vele. Melyik lapos, mint a papír?',
    },
  },
  {
    scene: <TowersScene heights={[2, 5, 3]} className="w-72 h-auto mx-auto" />,
    text: 'Ügyes építőmester vagy!',
    say: 'Hurrá! Megismerted a testeket: a kockát és társait. Tudod, melyik gurul, és tornyot is építettél. Most gyere, játsszunk!',
    mood: 'cheer',
  },
];

export const TestekG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="3. Testek"
    storyTitle="Pötyi és a toronyépítő játék"
    badge="1. OSZTÁLY • IV. GEOMETRIA • MESE"
    pages={PAGES}
    coverDots={7}
    playground={<TowerBuilderPlayground />}
    playgroundTitle="Játszótér: toronyépítő"
    parentNote="A gyerek megkülönbözteti a lapos síkidomot a kézbe vehető testtől, megismeri a kockát és a többi építőelemet, kipróbálja, melyik gurul, megszámolja, hány elemből épült egy torony vagy építmény, és felismeri a testeket a hétköznapi tárgyakban. Otthon építőkockákkal érdemes tornyot építeni és számolni."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default TestekG1Mese;
