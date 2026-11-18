import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { IconGroup, NumberLine, TenFrame } from '../../shared/G1Pics';
import { ChestCard, ExprScene, PotyiScene } from '../a-het/AHetG1Scenes';
import { COLORS, DieScene, ShapeCard, ShapeRow } from './Megallo7G1Scenes';
import { DicePlayground } from './Megallo7G1Parts';

const CHEST_NAME: Record<number, string> = { 2: 'a kettes láda', 3: 'a hármas láda', 4: 'a négyes láda', 5: 'az ötös láda', 6: 'a hatos láda', 7: 'a hetes láda' };
const chest = (n: number, color?: string) => ({ figure: <ChestCard n={n} color={color} />, say: CHEST_NAME[n] });
const R = { k: 'kor' as const, c: COLORS.piros };
const T = { k: 'haromszog' as const, c: COLORS.zold };
const S = { k: 'negyzet' as const, c: COLORS.zold };

const PAGES: MesePage[] = [
  {
    scene: <PotyiScene dots={7} mood="cheer" friends />,
    text: 'Megálló: kincsvadászat!',
    say: 'Megálló! Pötyi kincsvadászatot rendez Züminek és Csigusznak. Minden állomáson egy feladat vár. Gyere te is!',
    mood: 'cheer',
  },
  {
    scene: <IconGroup icon="csillag" n={7} perRow={4} className="w-56 h-auto mx-auto" />,
    text: 'Első állomás',
    say: 'Az első állomáson aranycsillagok csillognak. Számold meg őket!',
    task: { ask: 'Hány csillag van?', options: [7, 6, 5], hint: 'Fent négy van. Számolj tovább az alsó sorral!' },
  },
  {
    scene: (
      <svg viewBox="0 0 440 100" className="w-full max-w-[440px] h-auto mx-auto">
        {[3, 5, 6, 7].map((n, i) => (
          <svg key={n} x={10 + i * 108} y="6" width="100" height="86" viewBox="0 0 100 86">
            <ChestCard n={n} color={['#b45309', '#be123c', '#1d4ed8', '#15803d'][i]} />
          </svg>
        ))}
      </svg>
    ),
    text: 'Melyik ládában a kincs?',
    say: 'Négy láda van: a hármas, az ötös, a hatos és a hetes. A kincs nem a hat elvéve három ládában van. Nem a hét elvéve kettő ládában. És nem a három meg három ládában.',
    task: {
      ask: 'Melyik ládában van a kincs?',
      say: 'Nem a 6 − 3, nem a 7 − 2, nem a 3 + 3. Melyik ládában van a kincs?',
      options: [chest(7, '#15803d'), chest(3, '#b45309'), chest(5, '#be123c'), chest(6, '#1d4ed8')],
      hint: 'Számold ki egyenként a hármat! Amelyik láda kijött, abban nincs a kincs.',
    },
  },
  {
    scene: <DieScene top={1} bottom={6} />,
    text: 'A kocka titka: együtt 7.',
    say: 'A kincs egy varázskocka! A kocka két szemközti lapján együtt mindig hét pötty van. Ha fent egy pötty van, lent hat: egy meg hat, az hét.',
    dots: 7,
  },
  {
    scene: <DieScene top={2} />,
    text: 'Fent 2. Lent mennyi?',
    say: 'Most fent két pötty van. Lent annyi, hogy együtt hét legyen.',
    task: { ask: 'Hány pötty van alul?', options: [5, 4, 6], hint: 'Számolj tovább a kettőtől hétig: három, négy, öt, hat, hét. Hányat számoltál?' },
  },
  {
    scene: <TenFrame n={4} second={3} />,
    text: 'Egy kép, négy művelet.',
    say: 'Csigusz kiborította a korongokat: négy piros, három kék. Négy meg három az hét. Három meg négy is hét. Hét elvéve négy az három. Hét elvéve három az négy.',
    task: { ask: 'Melyik NEM illik a képhez?', options: ['5 + 2', '4 + 3', '7 − 3'], hint: 'Számold meg a pirosakat és a kékeket! Melyik műveletben van más szám?' },
  },
  {
    scene: <ShapeRow items={[R, T, S, R, T, '?']} />,
    text: 'Mi jön a sorban?',
    say: 'Zümi mintát rakott: kör, háromszög, négyzet, aztán újra. Mi jön a kérdőjel helyére?',
    task: {
      ask: 'Mi jön a sorban?',
      options: [
        { figure: <ShapeCard s={S} />, say: 'zöld négyzet' },
        { figure: <ShapeCard s={R} />, say: 'piros kör' },
        { figure: <ShapeCard s={T} />, say: 'zöld háromszög' },
      ],
      hint: 'Nézd az elejét: kör, háromszög, és utána? Ugyanígy ismétlődik.',
    },
  },
  {
    scene: <NumberLine max={7} mark={[5]} hideLabels={[4, 6]} />,
    text: 'Számszomszédok',
    say: 'Csigusz az ötösnél pihen. Kik az öt szomszédai?',
    task: { ask: 'Kik az 5 szomszédai?', options: ['4 és 6', '3 és 5', '6 és 7'], hint: 'Egy szám közvetlenül előtte, egy közvetlenül utána.' },
  },
  {
    scene: <PotyiScene dots={7} mood="think" />,
    text: 'Páros vagy páratlan?',
    say: 'Pötyi párba állítja a pöttyeit. Hét pötty: három pár, és egy pötty egyedül marad.',
    task: { ask: 'A 7 páros vagy páratlan?', options: ['páratlan', 'páros'], hint: 'Ha egy egyedül marad, nem állítható mind párba.' },
  },
  {
    scene: <ExprScene text="3 + 3 ? 7" />,
    text: 'Utolsó állomás',
    say: 'Az utolsó állomás. Három meg három, és hét. Melyik jel kell középre?',
    task: { ask: 'Melyik jel kell?', options: ['<', '>', '='], hint: 'Előbb számold ki a három meg hármat! Kevesebb, mint hét?' },
  },
  {
    scene: <PotyiScene dots={7} mood="cheer" friends />,
    text: 'Megvan minden kincs!',
    say: 'Hurrá! Végigjártad az összes állomást. Most jöhet Pötyi nagy játéka!',
    mood: 'cheer',
    dots: 7,
  },
];

export const Megallo7G1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="8. Megálló"
    storyTitle="Pötyi kincsvadászata"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • MESE"
    pages={PAGES}
    coverDots={7}
    playground={<DicePlayground />}
    playgroundTitle="Játszótér: Pötyi dobókockája"
    parentNote="Ismétlés 7-ig: számlálás, a 7 felépítése, összeadás és elvétel képről és számegyenesen, egy képhez több művelet, számszomszédok, páros és páratlan, jelek, sorminta. A dobókocka szemközti lapjain együtt mindig 7 pötty van – ezzel a gyerek játékosan bontja a hetet. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default Megallo7G1Mese;
