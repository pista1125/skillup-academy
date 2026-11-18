import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { Domino, DigitTrace, Hand, NumberLine } from '../../shared/G1Pics';
import { CompareScene, GroupBox, JumpLineScene } from '../a-ketto/AKettoG1Scenes';
import { FriendsScene, MushroomScene, StairsScene } from './AHaromG1Scenes';
import { SameCountPlayground } from './AHaromG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <FriendsScene />,
    text: 'Csigusz is jön!',
    say: 'Pötyi és Zümi tovább sétálnak a Számkertben. Ki mászik ott a fűben? Csigusz, a csiga! Ő is velük tart. Most már együtt mennek tovább.',
    mood: 'cheer',
  },
  {
    scene: <FriendsScene />,
    text: 'Hányan vannak?',
    say: 'Pötyi, Zümi és Csigusz. Számold meg a barátokat!',
    task: { ask: 'Hányan vannak a barátok?', options: [3, 2, 1], hint: 'Mutass rá mindegyikre: Pötyi, Zümi, Csigusz!' },
  },
  {
    scene: <MushroomScene n={3} />,
    text: 'Egy, kettő, három.',
    say: 'Az erdő szélén gombák nőnek. Számoljuk meg együtt: egy, kettő, három. Három gomba!',
    dots: 3,
  },
  {
    text: 'Hol van három gomba?',
    say: 'Melyik képen van három gomba? Koppints rá!',
    task: {
      ask: 'Hol van három gomba?',
      options: [
        { figure: <GroupBox icon="gomba" n={3} />, say: 'három gomba' },
        { figure: <GroupBox icon="gomba" n={2} />, say: 'két gomba' },
        { figure: <GroupBox icon="gomba" n={5} />, say: 'sok gomba' },
      ],
      hint: 'Számold meg a gombákat mindegyik képen! Egy, kettő, három.',
    },
  },
  {
    scene: <DigitTrace digit={3} />,
    text: 'Ez a hármas: 3',
    say: 'Ez itt a hármas. Két kis pocakja van, egymás alatt. A zöld pöttytől indulunk, megrajzoljuk a felső pocakot, aztán az alsót. Rajzold le a levegőbe!',
    dots: 3,
  },
  {
    scene: (
      <svg viewBox="0 0 480 170">
        <rect x="0" y="0" width="480" height="170" rx="18" fill="#fef3c7" />
        <svg x="50" y="20" width="130" height="130" viewBox="0 0 100 110">
          <Hand fingers={3} className="" />
        </svg>
        <svg x="250" y="45" width="180" height="90" viewBox="0 0 80 80">
          <Domino left={3} single className="" />
        </svg>
      </svg>
    ),
    text: 'Három ujj. Három pötty.',
    say: 'Mutass fel három ujjat! Így. A dominón is három pötty van, ferdén egy sorban.',
  },
  {
    text: 'Hol van a legtöbb gomba?',
    say: 'Csigusz a legtöbb gombát szeretné megnézni. Melyik képen van a legtöbb?',
    task: {
      ask: 'Hol van a legtöbb gomba?',
      options: [
        { figure: <GroupBox icon="gomba" n={3} />, say: 'három gomba' },
        { figure: <GroupBox icon="gomba" n={1} />, say: 'egy gomba' },
        { figure: <GroupBox icon="gomba" n={2} />, say: 'két gomba' },
      ],
      hint: 'Számold meg mindegyiket! Hol van három?',
    },
  },
  {
    scene: <NumberLine max={5} mark={[3]} />,
    text: 'A 3 a 2 után jön.',
    say: 'Ez a számegyenes. Nulla, egy, kettő, és utána jön a három, itt, ahol a piros pötty van.',
    dots: 3,
  },
  {
    scene: <JumpLineScene steps={3} icon="csiga" />,
    text: 'Csigusz lépeget.',
    say: 'Csigusz a számegyenesen lépeget. Az elejéről indult, és három lépést tett. Hová ért?',
    task: { ask: 'Hová ért Csigusz?', options: [3, 2, 1], hint: 'Számold meg az íveket! Egy, kettő, három.' },
  },
  {
    scene: <StairsScene max={3} />,
    text: '0, 1, 2, 3 – egyre több.',
    say: 'Nézd a számlépcsőt! A nullánál nincs kocka. Az egynél egy, a kettőnél kettő, a háromnál három. Minden lépcsőfok eggyel magasabb.',
    dots: 3,
  },
  {
    scene: <CompareScene icon="eper" a={2} b={3} />,
    text: 'Hol van több?',
    say: 'Bal oldalon két eper van, jobb oldalon három. Melyik jel kell középre? A jel hegye a kevesebb felé mutat.',
    task: { ask: 'Melyik jel kell?', options: ['<', '>', '='], hint: 'A kettő kevesebb, mint a három. A hegye a kettő felé mutasson!' },
  },
  {
    scene: <MushroomScene n={3} />,
    text: 'Megtaláltad a hármat!',
    say: 'Hurrá! Megtaláltuk a hármat. Három barát, három gomba, három ujj, három pötty. Most gyere, játsszunk!',
    mood: 'cheer',
    dots: 3,
  },
];

export const AHaromG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="4. A három"
    storyTitle="Pötyi és a három jó barát"
    badge="1. OSZTÁLY • II. SZÁMOLÁS 0-TÓL 5-IG • MESE"
    pages={PAGES}
    coverDots={3}
    playground={<SameCountPlayground />}
    playgroundTitle="Játszótér: legyen ugyanannyi!"
    parentNote="A gyerek felismeri a három elemű csoportokat, megkülönbözteti a háromnál kevesebbet és többet, megismeri a 3-as számjegyet, írásirányát és helyét a számegyenesen, az ujjképet és a dominóképet. Sorba rendezi a 0, 1, 2, 3 számokat, és összehasonlítja őket a <, >, = jelekkel. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default AHaromG1Mese;
