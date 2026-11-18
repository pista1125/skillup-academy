import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { Domino, DigitTrace, Hand, NumberLine, IconGroup } from '../../shared/G1Pics';
import { CherryScene, CompareScene, FlowerBedScene, GroupBox, JumpLineScene, ZumiMeetScene, ZumiWingsScene } from './AKettoG1Scenes';
import { MakeTwoPlayground } from './AKettoG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <ZumiMeetScene />,
    text: 'Bzzz! Ő Zümi, a méh.',
    say: 'Pötyi tovább sétál a Számkertben. Bzzz! Ki repül ott? Zümi, a méhecske! Zümi ma a kettőt mutatja meg nekünk.',
    mood: 'wow',
  },
  {
    scene: <ZumiWingsScene />,
    text: 'Nézd Zümi szárnyait!',
    say: 'Nézd meg Zümit közelről! Hány szárnya van? Számold meg!',
    task: { ask: 'Hány szárnya van Züminek?', options: [2, 1], hint: 'Mutass rá mindegyik szárnyra! Egy, és még egy.' },
  },
  {
    scene: <FlowerBedScene n={2} bee />,
    text: 'Egy virág, és még egy.',
    say: 'Zümi egy virágra száll, aztán még egy virágra. Egy és még egy: az kettő. Itt két virág nyílik.',
    dots: 2,
  },
  {
    text: 'Hol van két virág?',
    say: 'Melyik képen van két virág? Koppints rá!',
    task: {
      ask: 'Hol van két virág?',
      options: [
        { figure: <GroupBox icon="virag" n={2} />, say: 'két virág' },
        { figure: <GroupBox icon="virag" n={1} />, say: 'egy virág' },
        { figure: <GroupBox icon="virag" n={4} />, say: 'sok virág' },
      ],
      hint: 'Számold meg a virágokat! Egy, kettő. Hol van pont ennyi?',
    },
  },
  {
    scene: <DigitTrace digit={2} />,
    text: 'Ez a kettes: 2',
    say: 'Ez itt a kettes. Olyan, mint egy kis kacsa a vízen. A zöld pöttytől felfelé indulunk, kerek ívben le, ferdén lecsúszunk, a végén egyenesen jobbra húzzuk. Rajzold le a levegőbe!',
    dots: 2,
  },
  {
    scene: (
      <svg viewBox="0 0 480 170">
        <rect x="0" y="0" width="480" height="170" rx="18" fill="#fef3c7" />
        <svg x="50" y="20" width="130" height="130" viewBox="0 0 100 110">
          <Hand fingers={2} className="" />
        </svg>
        <svg x="250" y="45" width="180" height="90" viewBox="0 0 80 80">
          <Domino left={2} single className="" />
        </svg>
      </svg>
    ),
    text: 'Két ujj. Két pötty.',
    say: 'Mutass fel két ujjat! Így. A dominón is két pötty van.',
  },
  {
    scene: <CherryScene pairs={2} />,
    text: 'A cseresznye párban lóg.',
    say: 'Zümi a cseresznyefához repül. Nézd! A cseresznyék párban lógnak. Hány cseresznye lóg egy száron?',
    task: { ask: 'Hány cseresznye lóg egy száron?', options: [2, 1], hint: 'Nézz csak egy szárat! Hány piros cseresznye lóg rajta?' },
  },
  {
    scene: <NumberLine max={5} mark={[2]} />,
    text: 'A 2 az 1 után jön.',
    say: 'Ez a számegyenes. A kettes az egyes után jön, itt, ahol a piros pötty van.',
    dots: 2,
  },
  {
    scene: <JumpLineScene steps={2} />,
    text: 'Zümi ugrál.',
    say: 'Zümi a számegyenesen ugrál. Az elejéről indult, és két ugrást tett. Hová ért?',
    task: { ask: 'Hová ért Zümi?', options: [2, 1], hint: 'Számold meg az íveket! Egy ugrás, és még egy.' },
  },
  {
    scene: <CompareScene icon="eper" a={2} b={1} />,
    text: 'Hol van több?',
    say: 'Bal oldalon két eper van, jobb oldalon egy. Melyik jel kell középre? A jel hegye mindig a kevesebb felé mutat.',
    task: { ask: 'Melyik jel kell?', options: ['>', '<', '='], hint: 'A kettő több, mint az egy. A hegye az egy felé mutasson!' },
  },
  {
    scene: <IconGroup icon="meh" n={2} className="w-48 h-28 mx-auto" />,
    text: 'Megtaláltad a kettőt!',
    say: 'Hurrá! Megtaláltuk a kettőt. Két szárny, két virág, két ujj, két cseresznye. Zümi is hozott egy barátot. Most gyere, játsszunk!',
    mood: 'cheer',
    dots: 2,
  },
];

export const AKettoG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="2. A kettő"
    storyTitle="Pötyi és Zümi, a méhecske"
    badge="1. OSZTÁLY • II. SZÁMOLÁS 0-TÓL 5-IG • MESE"
    pages={PAGES}
    coverDots={2}
    playground={<MakeTwoPlayground />}
    playgroundTitle="Játszótér: legyen kettő!"
    parentNote="A gyerek felismeri a két elemű csoportokat, megkülönbözteti az egyet, a kettőt és a kettőnél többet, megismeri a 2-es számjegyet, írásirányát és helyét a számegyenesen, az ujjképet és a dominóképet. Összehasonlítja az 1-et és a 2-t a <, >, = jelekkel. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default AKettoG1Mese;
