import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { NumberLine, TenFrame } from '../../shared/G1Pics';
import { ExprScene, OpScene, PinsScene, PotyiScene } from '../a-het/AHetG1Scenes';
import { PicnicPlayground } from './Szamolas0Tol7IgG1Parts';

const steps = (from: number, to: number) =>
  from < to ? Array.from({ length: to - from }, (_, i) => ({ from: from + i, to: from + i + 1 })) : Array.from({ length: from - to }, (_, i) => ({ from: from - i, to: from - i - 1 }));

const PAGES: MesePage[] = [
  {
    scene: <PotyiScene dots={7} mood="cheer" friends />,
    text: 'Piknik a Számkertben!',
    say: 'Szép napos idő van. Pötyi, Zümi és Csigusz piknikezni mennek a Számkertbe. Ma összeadunk és elveszünk, egészen hétig!',
    mood: 'cheer',
  },
  {
    scene: <OpScene icon="eper" a={5} b={2} op="+" />,
    text: '5 eper, meg még 2.',
    say: 'Pötyi kosarában öt eper van. Zümi hoz még kettőt. Hány eper lett?',
    task: { ask: '5 + 2 = ?', say: 'Öt meg kettő, mennyi?', options: [7, 6, 3], hint: 'Számolj tovább az öttől: hat, hét.' },
  },
  {
    scene: <TenFrame n={5} second={2} />,
    text: '5 + 2 = 7 és 2 + 5 = 7',
    say: 'Nézd a korongokat! Öt piros és két kék, az hét. Ha a kékkel kezdjük: kettő meg öt, az is hét. Mindegy, melyikkel kezdjük, ugyanannyi lesz.',
    dots: 7,
  },
  {
    scene: <OpScene icon="eper" a={7} b={3} op="−" />,
    text: 'Csigusz megeszik 3-at.',
    say: 'Csigusz nagyon éhes. Megeszik három epret. Az áthúzott epreket már megette. Hány maradt?',
    task: { ask: '7 − 3 = ?', say: 'Hét elvéve három, mennyi?', options: [4, 3, 7], hint: 'Csak azokat számold, amelyek nincsenek áthúzva!' },
  },
  {
    scene: <TenFrame n={6} second={1} />,
    text: 'Mit látsz a képen?',
    say: 'Pötyi kiszórta a korongjait. Melyik összeadás illik a képhez?',
    task: { ask: 'Melyik illik a képhez?', options: ['6 + 1', '5 + 1', '4 + 1'], hint: 'Számold meg külön a pirosakat, aztán a kékeket!' },
  },
  {
    scene: <ExprScene text="7 − 1 = 6 és 7 − 6 = 1" />,
    text: 'Elvehetjük a kéket is, a pirosat is.',
    say: 'Hét korongból ha elveszem az egy kéket, hat marad. Ha a hat pirosat veszem el, egy marad. Egy kép, sok művelet!',
    dots: 7,
  },
  {
    scene: <NumberLine max={7} mark={[4]} question={7} jumps={steps(4, 7)} />,
    text: 'Csigusz ugrál.',
    say: 'Csigusz a számegyenesen ugrál. A négyesről indul, és hármat ugrik előre. Hová ér?',
    task: { ask: '4 + 3 = ?', say: 'Négy meg három, hová ér Csigusz?', options: [7, 6, 5], hint: 'Ugorj az ujjaddal a négyestől: egy, kettő, három ugrás!' },
  },
  {
    scene: <NumberLine max={7} mark={[7]} question={5} jumps={steps(7, 5)} />,
    text: 'Most visszafelé!',
    say: 'Most Zümi a hetesről kettőt repül visszafelé. Visszafelé elveszünk. Hová ér?',
    task: { ask: '7 − 2 = ?', say: 'Hét elvéve kettő, hová ér Zümi?', options: [5, 6, 4], hint: 'Visszafelé lépj a hetestől: hat, öt.' },
  },
  {
    scene: <PinsScene total={7} fallen={2} />,
    text: 'Tekézés!',
    say: 'Ebéd után tekéznek. Hét bábu állt. Pötyi gurított, és kettő eldőlt. Hány bábu áll még?',
    task: { ask: 'Hány bábu áll még?', options: [5, 7, 2], hint: 'Csak az álló bábukat számold meg!' },
  },
  {
    scene: <TenFrame n={3} />,
    text: 'Legyen 7!',
    say: 'Három piros korong van a keretben. Hány kéket tegyünk mellé, hogy hét legyen?',
    task: { ask: 'Hány kék kell, hogy 7 legyen?', options: [4, 3, 5], hint: 'Számolj tovább a hármastól hétig, és számold, hányat léptél!' },
  },
  {
    scene: <PotyiScene dots={7} mood="cheer" friends />,
    text: 'Ügyes voltál!',
    say: 'Hurrá! Összeadtunk, elvettünk, ugráltunk a számegyenesen és tekéztünk. Most gyere, játsszunk!',
    mood: 'cheer',
    dots: 7,
  },
];

export const Szamolas0Tol7IgG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="6. Számolás 0-tól 7-ig"
    storyTitle="Pötyi és az eperpiknik"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • MESE"
    pages={PAGES}
    coverDots={7}
    playground={<PicnicPlayground />}
    playgroundTitle="Játszótér: eperpiknik"
    parentNote="A gyerek képről, korongokról és a számegyenesről összead és elvesz 7-ig, látja, hogy a tagok felcserélhetők (5 + 2 = 2 + 5), és egy képhez több műveletet is mond. Kiegészít 7-re, egyszerű történetekhez választ műveletet. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default Szamolas0Tol7IgG1Mese;
