import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { COLORS } from '../a-kilenc/AKilencG1Scenes';
import { GARLAND, GarlandScene, OrdinalStrip, PodiumScene, RaceHillScene, RacerPic, SLEDS9, SledPic, StartQueue, TOWER, TowerScene, ord } from './ASorszamnevekG1Scenes';
import { OrdinalTapPlayground } from './ASorszamnevekG1Parts';

const sledQueue = SLEDS9.map((c) => ({ icon: 'szanko' as const, color: COLORS[c] }));

const PAGES: MesePage[] = [
  {
    scene: <RaceHillScene />,
    text: 'Szánkóverseny!',
    say: 'Nagy hó esett a Számkertben. A domb tetején szánkóversenyt rendeznek. Pötyi, Zümi és Csigusz is indul. Vigyázz, kész, rajt!',
    mood: 'cheer',
  },
  {
    scene: <PodiumScene order={['csigusz', 'zumi', 'potyi']} labels={false} />,
    text: 'Ki lett az első?',
    say: 'Vége a versenynek! Aki első lett, az a dobogó legmagasabb fokára áll. Ki lett az első?',
    task: {
      ask: 'Ki lett az első?',
      options: [
        { figure: <RacerPic who="csigusz" />, say: 'Csigusz' },
        { figure: <RacerPic who="zumi" />, say: 'Zümi' },
        { figure: <RacerPic who="potyi" />, say: 'Pötyi' },
      ],
      hint: 'Nézd meg, ki áll a legmagasabb fokon, középen!',
    },
  },
  {
    scene: <PodiumScene order={['csigusz', 'zumi', 'potyi']} />,
    text: 'Első: 1. Második: 2. Harmadik: 3.',
    say: 'Csigusz lett az első, Zümi a második, Pötyi a harmadik. Ezeket a szavakat sorszámneveknek hívjuk. Így írjuk őket: a szám után egy pontot teszünk. Egy és pont: első. Kettő és pont: második.',
    mood: 'wow',
  },
  {
    scene: (
      <svg viewBox="0 0 460 164">
        <svg x="0" y="0" width="460" height="64" viewBox="0 0 408 64">
          <OrdinalStrip k={9} mode="count" className="" />
        </svg>
        <text x="230" y="88" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1e293b" fontFamily="system-ui, sans-serif">9 – 9.</text>
        <svg x="0" y="100" width="460" height="64" viewBox="0 0 408 64">
          <OrdinalStrip k={9} mode="place" className="" />
        </svg>
      </svg>
    ),
    text: 'Kilenc: 9. Kilencedik: 9.',
    say: 'Nézd a két sort! Fent 9 díszt színeztünk ki: ez kilenc dísz, így írjuk: 9. Lent csak egyet: a kilencediket, az utolsót. Ezt így írjuk: 9 és pont.',
    dots: 9,
  },
  {
    text: 'Hol van a 4. dísz kiszínezve?',
    say: 'Most te jössz! Melyik sorban színezték ki a negyedik díszt? A zöld nyílnál kezdd a számolást!',
    task: {
      ask: 'Hol van kiszínezve a 4. dísz?',
      say: 'Hol van kiszínezve a negyedik dísz?',
      options: [
        { figure: <OrdinalStrip k={4} mode="place" />, say: 'csak egy színes dísz' },
        { figure: <OrdinalStrip k={4} mode="count" />, say: 'négy színes dísz' },
      ],
      hint: 'A negyedik csak egy dísz: balról számolva a negyedik helyen áll.',
    },
  },
  {
    scene: <StartQueue items={sledQueue} />,
    text: 'Sorban állnak a szánkók.',
    say: 'A következő futamra kilenc szánkó áll sorba. Az első az, amelyik a zászlóhoz legközelebb áll. Hányadik a piros szánkó?',
    task: {
      ask: 'Hányadik a piros szánkó?',
      options: [ord(4), ord(3), ord(5)],
      hint: 'A zászlónál kezdd: első, második, harmadik… Mutass rá mindegyik szánkóra!',
    },
  },
  {
    scene: <StartQueue items={sledQueue} labels />,
    text: 'Melyik szánkó a 7.?',
    say: 'Most a sorszámokat is odaírtuk a szánkók alá. Melyik szánkó áll a hetedik helyen?',
    task: {
      ask: 'Melyik szánkó a 7.?',
      say: 'Melyik szánkó a hetedik?',
      options: [
        { figure: <SledPic color={COLORS[SLEDS9[6]]} />, say: 'rózsaszín szánkó' },
        { figure: <SledPic color={COLORS[SLEDS9[5]]} />, say: 'narancssárga szánkó' },
        { figure: <SledPic color={COLORS[SLEDS9[7]]} />, say: 'barna szánkó' },
      ],
      hint: 'Keresd meg a 7 és pont jelet a szánkók alatt!',
    },
  },
  {
    scene: <GarlandScene items={GARLAND} />,
    text: 'Ajándékzsákok a kerítésen',
    say: 'A verseny után ajándék jár mindenkinek! Kilenc zsák lóg a kerítésen, mindegyiken egy sorszám. Hányadik zsákban van a csengő?',
    task: {
      ask: 'Hányadik zsákban van a csengő?',
      options: [ord(6), ord(5), ord(7)],
      hint: 'Keresd meg a csengőt, aztán nézd meg a fölötte lévő számot!',
    },
  },
  {
    scene: <TowerScene residents={TOWER} />,
    text: 'A barátok toronyháza',
    say: 'Este mindenki hazamegy a toronyházba. A szinteket alulról számoljuk: legalul van az első. Ki lakik a harmadik szinten?',
    task: {
      ask: 'Ki lakik a 3. szinten?',
      say: 'Ki lakik a harmadik szinten?',
      options: [
        { figure: <RacerPic who="potyi" />, say: 'Pötyi' },
        { figure: <RacerPic who="zumi" />, say: 'Zümi' },
        { figure: <RacerPic who="csigusz" />, say: 'Csigusz' },
      ],
      hint: 'Alulról számolj: első, második, harmadik szint!',
    },
  },
  {
    scene: <PodiumScene order={['csigusz', 'zumi', 'potyi']} />,
    text: 'Te is első vagy!',
    say: 'Hurrá! Megtanultad a sorszámneveket: első, második, harmadik, egészen a kilencedikig. Tudod, hogy a sorszám után pontot írunk. Gyere, játsszunk!',
    mood: 'cheer',
    dots: 9,
  },
];

export const ASorszamnevekG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="15. A sorszámnevek"
    storyTitle="Pötyi és a szánkóverseny"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • MESE"
    pages={PAGES}
    coverDots={9}
    playground={<OrdinalTapPlayground />}
    playgroundTitle="Játszótér: koppints a hányadikra!"
    parentNote="A gyerek megismeri a sorszámneveket (első, második … kilencedik) és jelölésüket (1., 2. … 9.), megkülönbözteti a mennyiséget (9 dísz) és a helyet a sorban (a 9. dísz). Megmondja, hányadik valami egy sorban, egy füzéren vagy egy toronyház szintjein, és megtalálja a megadott sorszámú tárgyat. Mindig megbeszéljük, honnan kezdjük a számolást. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default ASorszamnevekG1Mese;
