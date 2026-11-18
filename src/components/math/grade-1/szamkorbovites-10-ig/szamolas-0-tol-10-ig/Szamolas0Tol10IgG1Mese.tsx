import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { NumberLine, TenFrame } from '../../shared/G1Pics';
import { EqCard, HopLine } from '../a-nyolc/ANyolcG1Scenes';
import { PinsScene, TenSplitsScene } from './Szamolas0Tol10IgG1Scenes';
import { BowlingPlayground } from './Szamolas0Tol10IgG1Parts';

const frameWithEq = (frame: React.ReactNode, eq: string) => (
  <svg viewBox="0 0 480 240">
    <rect x="0" y="0" width="480" height="240" rx="18" fill="#f5f3ff" />
    <svg x="100" y="14" width="280" height="120" viewBox="0 0 260 112">
      {frame}
    </svg>
    <svg x="60" y="148" width="360" height="80" viewBox="0 0 430 90">
      <EqCard text={eq} className="" />
    </svg>
  </svg>
);

const PAGES: MesePage[] = [
  {
    scene: <PinsScene standing={10} who="potyi" />,
    text: 'Tekézzünk!',
    say: 'Csigusz havas tekepályát épített a Számkertben. A végén bábuk állnak, háromszögben. Pötyi, Zümi és Csigusz golyót gurít. Ki dönt le többet?',
    mood: 'cheer',
  },
  {
    scene: <PinsScene standing={10} />,
    text: 'Hány bábu áll?',
    say: 'Számold meg a bábukat! Elöl kezdd, és haladj hátrafelé, soronként.',
    task: { ask: 'Hány bábu áll a pályán?', options: [10, 9, 8], hint: 'Soronként számolj: elöl 1, aztán 2, aztán 3, hátul 4.' },
  },
  {
    scene: <PinsScene standing={7} fallen={3} who="meh" />,
    text: 'Zümi gurított.',
    say: 'Zümi gurított először. Bumm! 3 bábu eldőlt. 10 bábu állt, 3 eldőlt. Hány bábu áll még?',
    task: { ask: 'Hány bábu áll még?', say: '10 bábuból 3 eldőlt. Hány bábu áll még?', options: [7, 3, 6], hint: 'Csak az álló bábukat számold, a fekvőket ne!' },
  },
  {
    scene: frameWithEq(<TenFrame n={10} crossed={3} className="" />, '10 − 3 = 7'),
    text: '10 − 3 = 7',
    say: 'Ezt le is írhatjuk. 10 bábuból elvettünk 3-at, maradt 7. 10 − 3 = 7. És fordítva: a 7 álló és a 3 fekvő bábu együtt 10.',
  },
  {
    scene: frameWithEq(<TenFrame n={6} second={4} className="" />, '6 + 4 = ?'),
    text: 'Visszaállítjuk!',
    say: 'Csigusz gurítása után 6 bábu állt. Pötyi visszaállított még 4 bábut. Hány bábu áll most? 6 + 4 egyenlő mennyi?',
    task: { ask: 'Mennyi 6 + 4?', options: [10, 9, 2], hint: 'Számolj tovább a 6-tól a kék korongokkal: 7, 8, 9, …' },
  },
  {
    scene: <TenSplitsScene rows={[[10, 0], [9, 1], [8, '?'], [7, 3], [6, 4], [5, 5]]} />,
    text: 'Így bontjuk a 10-et.',
    say: 'Pötyi felírta a táblára, hogyan lehet 10 bábu: álló és fekvő együtt. 10 meg 0, 9 meg 1, 8 meg valahány, 7 meg 3, 6 meg 4, 5 meg 5. Mi hiányzik a harmadik sorból?',
    task: { ask: 'Melyik szám kell a ? helyére?', say: '10 egyenlő 8 meg valahány. Melyik szám kell a kérdőjel helyére?', options: [2, 3, 1], hint: 'Számold meg az üres korongokat a harmadik sorban!' },
  },
  {
    scene: <TenFrame n={3} />,
    text: 'Tízesbarátok',
    say: 'Két szám tízesbarát, ha együtt 10-et adnak. A keretben 3 korong van. Hány kell még, hogy tele legyen? Ki a 3 tízesbarátja?',
    task: { ask: 'Ki a 3 tízesbarátja?', say: 'Melyik szám a 3 tízesbarátja? 3 meg mennyi az 10?', options: [7, 6, 3], hint: 'Számold meg az üres helyeket a keretben!' },
  },
  {
    scene: <HopLine from={10} to={7} max={10} icon="csiga" />,
    text: 'Csigusz visszalép.',
    say: 'Csigusz a számegyenesen is játszik. A 10-ről indul, és 3-at lép vissza. Hová ér? 10 − 3 egyenlő mennyi?',
    task: { ask: 'Hová ér Csigusz?', options: [7, 8, 3], hint: 'Kövesd az íveket visszafelé a 10-től: 9, 8, …' },
  },
  {
    scene: <EqCard text="7 + 3 ? 9" className="w-full max-w-[360px] h-auto mx-auto" />,
    text: 'Melyik jel kell?',
    say: 'Bal oldalon 7 + 3, jobb oldalon 9. Előbb számold ki a bal oldalt, aztán hasonlítsd össze! Melyik jel kell?',
    task: { ask: 'Melyik jel kell?', options: ['>', '<', '='], hint: 'Mennyi 7 + 3? Az több vagy kevesebb, mint 9?' },
  },
  {
    scene: <PinsScene standing={8} fallen={2} who="potyi" />,
    text: '10 − □ = 8',
    say: 'Most Pötyi gurított. 8 bábu maradt állva. Hány bábut döntött le Pötyi? 10 elvéve valahány az 8.',
    task: { ask: 'Hány bábut döntött le Pötyi?', options: [2, 8, 3], hint: 'Most a fekvő bábukat számold!' },
  },
  {
    scene: <NumberLine max={10} mark={[0, 10]} />,
    text: 'Ügyes tekés vagy!',
    say: 'Hurrá! Ma 10-ig adtunk össze és vontunk ki. 10 − 3 = 7, 6 + 4 = 10, és a tízesbarátok együtt mindig 10-et adnak. Most gyere, játsszunk!',
    mood: 'cheer',
    dots: 10,
  },
];

export const Szamolas0Tol10IgG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="18. Számolás 0-tól 10-ig"
    storyTitle="Pötyi és a havas tekepálya"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • MESE"
    pages={PAGES}
    coverDots={10}
    playground={<BowlingPlayground />}
    playgroundTitle="Játszótér: tekézz!"
    parentNote="A gyerek 10-ig összead és kivon képről, tízes keretről és a számegyenesen, megismeri a 10 bontásait (10 = 9 + 1, 8 + 2 …) és a tízesbarátokat. Kiegészít 10-re (10 − □ = 8), és összehasonlít egy műveletet egy számmal (7 + 3 > 9). A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default Szamolas0Tol10IgG1Mese;
