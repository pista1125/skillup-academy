import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { Domino, NumberLine, TenFrame } from '../../shared/G1Pics';
import { ArriveScene, ExprScene, PartyScene, SumScene, TwoColorApples, TwoHands, WriteItScene } from './Osszeadas0Tol5IgG1Scenes';
import { AddFramePlayground } from './Osszeadas0Tol5IgG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <PartyScene />,
    text: 'Uzsonna lesz!',
    say: 'Pötyi uzsonnát rendez a Számkertben. Zümi és Csigusz is jön, és mindenki hoz valami finomat. Ma megtanuljuk, hogyan számoljuk össze, mennyi lett!',
    mood: 'cheer',
  },
  {
    scene: <ArriveScene icon="eper" have={3} add={1} who="meh" />,
    text: '3 eper. Zümi hoz még 1-et.',
    say: 'A tányéron három eper van. Zümi hozzátesz még egyet. Hány eper lett összesen a tányéron?',
    task: { ask: 'Hány eper lett összesen?', options: [4, 3, 5], hint: 'Számold meg a tányéron lévőket, és azt is, amit Zümi hoz!' },
  },
  {
    scene: <WriteItScene a={3} b={1} />,
    text: 'Így írjuk: 3 + 1 = 4',
    say: 'Így írjuk le: három, plusz jel, egy, egyenlőségjel, négy. Így mondjuk: 3 meg 1 egyenlő 4. Ez a művelet az összeadás. A plusz jel azt jelenti: hozzáteszünk.',
    dots: 4,
  },
  {
    scene: <TenFrame n={2} second={2} />,
    text: '2 piros meg 2 kék.',
    say: 'Pötyi a tízes keretbe rak korongokat. Két piros, és hozzátesz két kéket. Hány korong van összesen?',
    task: { ask: 'Hány korong van összesen?', options: [4, 2, 5], hint: 'A pirosat és a kéket is számold meg, egymás után!' },
  },
  {
    scene: <ArriveScene icon="gomba" have={2} add={3} who="csiga" />,
    text: 'Csigusz gombát hoz.',
    say: 'Az asztalon két gomba van. Csigusz hoz még hármat. Melyik összeadás illik a képhez?',
    task: { ask: 'Melyik összeadás illik ide?', options: ['2 + 3', '2 + 2', '1 + 3'], hint: 'Előbb az van, ami már az asztalon van, utána amit Csigusz hoz.' },
  },
  {
    scene: <TwoHands a={1} b={3} />,
    text: 'Mutasd az ujjaiddal!',
    say: 'Az egyik kezeden egy ujj van fent, a másikon három. Hány ujj van fent összesen?',
    task: { ask: 'Hány ujj van fent összesen?', options: [4, 3, 5], hint: 'Számolj tovább: egy, és aztán kettő, három, négy…' },
  },
  {
    scene: (
      <svg viewBox="0 0 480 200">
        <rect x="0" y="0" width="480" height="200" rx="18" fill="#f0fdf4" />
        <svg x="20" y="20" width="200" height="60" viewBox="0 0 240 80">
          <TwoColorApples red={3} green={1} className="" />
        </svg>
        <text x="120" y="120" textAnchor="middle" fontSize="34" fontWeight="900" fill="#1f2937" fontFamily="system-ui, sans-serif">3 + 1</text>
        <svg x="260" y="20" width="200" height="60" viewBox="0 0 240 80">
          <TwoColorApples red={3} green={1} greenFirst className="" />
        </svg>
        <text x="360" y="120" textAnchor="middle" fontSize="34" fontWeight="900" fill="#1f2937" fontFamily="system-ui, sans-serif">1 + 3</text>
        <text x="240" y="180" textAnchor="middle" fontSize="36" fontWeight="900" fill="#dc2626" fontFamily="system-ui, sans-serif">3 + 1 = 1 + 3</text>
      </svg>
    ),
    text: '3 + 1 ugyanannyi, mint 1 + 3.',
    say: 'Nézd! Bal oldalon három piros alma és egy zöld. Jobb oldalon egy zöld és három piros. Mindkettő négy alma. Ha felcseréljük a két számot, az összeg nem változik.',
    task: { ask: 'Melyik ugyanannyi, mint 3 + 1?', options: ['1 + 3', '2 + 1', '1 + 1'], hint: 'Ugyanazok a számok kellenek, csak fordítva!' },
  },
  {
    scene: <SumScene icon="eper" a={4} b={0} />,
    text: 'Ha semmit sem teszünk hozzá…',
    say: 'Csigusz az üres kosarát hozta, nem tett hozzá semmit. Négy meg nulla az mennyi?',
    task: { ask: 'Mennyi 4 + 0?', options: [4, 0, 5], hint: 'A nulla azt jelenti: semmit sem tettünk hozzá. Hány eper van összesen?' },
  },
  {
    scene: <NumberLine max={5} mark={[2]} question={5} jumps={[{ from: 2, to: 3 }, { from: 3, to: 4 }, { from: 4, to: 5 }]} />,
    text: 'Zümi ugrál.',
    say: 'Zümi a kettesen ül a számegyenesen. Ugrik még hármat előre. Kettő meg három. Hová ért?',
    task: { ask: 'Hová ért Zümi?', options: [5, 4, 3], hint: 'Indulj a kettőről, és számold az íveket: egy, kettő, három!' },
  },
  {
    scene: <Domino left={1} right={4} className="w-56 h-auto mx-auto" />,
    text: 'Mit mutat a dominó?',
    say: 'A dominó egyik felén egy pötty, a másikon négy. Melyik összeadás illik hozzá?',
    task: { ask: 'Melyik összeadás illik hozzá?', options: ['1 + 4', '1 + 3', '0 + 4'], hint: 'Számold meg külön a két felét!' },
  },
  {
    scene: <ExprScene text="2 + 3 = 5" />,
    text: 'Ügyes vendéglátó vagy!',
    say: 'Hurrá! Megtanultuk az összeadást. Ha hozzáteszünk, megnézzük, mennyi lett összesen. Most gyere, játsszunk!',
    mood: 'cheer',
    dots: 5,
  },
];

export const Osszeadas0Tol5IgG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="7. Összeadás 0-tól 5-ig"
    storyTitle="Pötyi és a nagy uzsonna"
    badge="1. OSZTÁLY • II. SZÁMOLÁS 0-TÓL 5-IG • MESE"
    pages={PAGES}
    coverDots={5}
    playground={<AddFramePlayground />}
    playgroundTitle="Játszótér: piros meg kék"
    parentNote="A gyerek megismeri az összeadást: két csoportot összetesz („hozzáteszünk, összesen”), a képről leolvassa és jelekkel leírja (3 + 1 = 4), és kiszámolja az eredményt 5-ig. Felfedezi, hogy a tagok felcserélhetők (3 + 1 = 1 + 3), és hogy nulla hozzáadásától nem változik a szám. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default Osszeadas0Tol5IgG1Mese;
