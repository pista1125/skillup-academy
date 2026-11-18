import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { DigitTrace, Domino, NumberLine, TenFrame } from '../../shared/G1Pics';
import { TwoHands } from '../a-nyolc/ANyolcG1Scenes';
import { HolidayGardenScene, PairUpScene, TreeScene, XBox, XCompare, XRow } from './AKilencG1Scenes';
import { DecorateTreePlayground } from './AKilencG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <HolidayGardenScene dots={7} />,
    text: 'Közeleg az ünnep!',
    say: 'Hideg téli nap van. A Számkert közepén áll egy kis fenyőfa. Pötyi, Zümi és Csigusz elhatározza, hogy feldíszíti az ünnepre.',
    mood: 'cheer',
  },
  {
    scene: <TreeScene filled={9} />,
    text: 'Hány dísz van a fán?',
    say: 'Nézd, milyen szép lett a fa! Számold meg a díszeket! Mutass rá mindegyikre, fentről lefelé.',
    task: { ask: 'Hány dísz van a fán?', options: [9, 8, 7], hint: 'Soronként számolj, fentről lefelé! Egyet se hagyj ki, és egyet se számolj kétszer.' },
  },
  {
    scene: <TenFrame n={8} second={1} />,
    text: '8 meg 1: 9!',
    say: 'Csigusz 8 piros díszt hozott. Zümi hozott még 1 kéket. 8 meg 1 az 9. Ez a kilenc! A tízes keretben fent 5, lent 4 korong van.',
    dots: 9,
    mood: 'wow',
  },
  {
    scene: <DigitTrace digit={9} />,
    text: 'Ez a kilences: 9',
    say: 'Ez itt a kilences. Fent van a kerek feje, alatta a lába. A zöld pöttytől indulj: rajzold meg a kerek fejét, aztán húzd le a lábát! Vigyázz, ha megfordítod, hatos lesz belőle!',
    dots: 9,
  },
  {
    scene: (
      <svg viewBox="0 0 480 240">
        <rect x="0" y="0" width="480" height="240" rx="18" fill="#fef3c7" />
        <svg x="10" y="10" width="220" height="116" viewBox="0 0 210 110">
          <TwoHands n={9} className="" />
        </svg>
        <svg x="260" y="30" width="190" height="95" viewBox="0 0 160 80">
          <Domino left={5} right={4} className="" />
        </svg>
        <svg x="110" y="136" width="260" height="96" viewBox="0 0 260 112">
          <TenFrame n={9} className="" />
        </svg>
      </svg>
    ),
    text: 'Kilenc ujj. Kilenc pötty.',
    say: 'Mutass fel kilenc ujjat: az egyik kezeden ötöt, a másikon négyet. A dominón 5 és 4 pötty van. A tízes keretben egy hely üres maradt.',
    dots: 9,
  },
  {
    text: 'Hol van 9 toboz?',
    say: 'Zümi tobozokat gyűjtött a fa alá. Melyik dobozban van pont 9 toboz?',
    task: {
      ask: 'Hol van 9 toboz?',
      options: [
        { figure: <XBox icon="toboz" n={9} />, say: 'kilenc toboz' },
        { figure: <XBox icon="toboz" n={8} />, say: 'nyolc toboz' },
        { figure: <XBox icon="toboz" n={7} />, say: 'hét toboz' },
      ],
      hint: 'Számold meg a felső sort is, az alsót is! Hol lesz pont kilenc?',
    },
  },
  {
    scene: <NumberLine max={9} mark={[9]} />,
    text: 'A 9 a 8 után jön.',
    say: 'Ez a számegyenes. A 8 után jön a 9, ott, ahol a piros pötty van. A 9 eggyel több, mint a 8.',
    task: { ask: 'Melyik a 9 kisebb szomszédja?', options: [8, 7, 6], hint: 'A kisebb szomszéd közvetlenül a 9 előtt áll a számegyenesen.' },
  },
  {
    scene: <XRow icon="bogre" a={6} b={3} color="#3b82f6" colorB="#ef4444" />,
    text: '6 kék, 3 piros: 9 bögre.',
    say: 'Az ünnepi teához bögrék kellenek. 6 kék bögre és 3 piros bögre: ez összesen 9 bögre. 6 meg 3 az 9. A kilencet sokféleképpen bonthatjuk: 5 és 4, 7 és 2, 8 és 1.',
    dots: 9,
  },
  {
    scene: <TreeScene filled={4} label={9} showHooks />,
    text: 'Hány dísz kell még?',
    say: 'Másnap a szél lefújt néhány díszt. Csak 4 maradt a fán. Pötyi újra 9 díszt szeretne. Hány dísz kell még?',
    task: { ask: 'Hány dísz kell még, hogy 9 legyen?', options: [5, 4, 6], hint: 'Számold meg az üres karikákat! Vagy számolj tovább a 4-től a 9-ig.' },
  },
  {
    scene: <XCompare icon="ajandek" a={9} b={7} />,
    text: 'Hol van több?',
    say: 'Ajándékok is kerültek a fa alá. Bal oldalon 9 ajándék van, jobb oldalon 7. Melyik jel kell középre?',
    task: { ask: 'Melyik jel kell?', options: ['>', '<', '='], hint: 'Számold meg mindkét dobozt! A jel hegye a kevesebb felé mutasson.' },
  },
  {
    scene: <PairUpScene n={9} />,
    text: 'Párba állnak a díszek.',
    say: 'Pötyi a maradék kék díszeket párba rakta, kettesével egymás alá. Jutott mindegyiknek pár? Páros vagy páratlan a 9?',
    task: {
      ask: 'Páros vagy páratlan a 9?',
      options: [
        { label: 'páratlan', say: 'páratlan' },
        { label: 'páros', say: 'páros' },
      ],
      hint: 'Nézd meg az utolsó oszlopot! Ha egy dísz pár nélkül marad, a szám páratlan.',
    },
  },
  {
    scene: <TreeScene filled={9} friends dots={9} />,
    text: 'Megtaláltad a kilencet!',
    say: 'Hurrá! Kész az ünnepi fa. 9 dísz, 9 toboz, 9 bögre, és Pötyinek most 9 pöttye van. Gyere, játsszunk!',
    mood: 'cheer',
    dots: 9,
  },
];

export const AKilencG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="13. A kilenc"
    storyTitle="Pötyi és az ünnepi fenyőfa"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • MESE"
    pages={PAGES}
    coverDots={9}
    playground={<DecorateTreePlayground />}
    playgroundTitle="Játszótér: díszítsd fel a fát!"
    parentNote="A gyerek felismeri a kilenc elemű csoportokat, megismeri a 9-es számjegyet és írásirányát (és megkülönbözteti a 6-ostól), az ujjképet (5 és 4), a dominó- és a tízeskeret-képet. Megtalálja a 9 helyét és kisebb szomszédját a számegyenesen, bontja és kiegészíti a 9-et, összehasonlít a <, >, = jelekkel, és észreveszi, hogy a 9 páratlan. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default AKilencG1Mese;
