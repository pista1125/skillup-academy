import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { TenFrame } from '../../shared/G1Pics';
import { GroupBox } from '../a-ketto/AKettoG1Scenes';
import { BackJumpScene, FlyAwayScene, PicnicScene, SentenceScene } from './Kivonas0Tol5IgG1Scenes';
import { CrossOutPlayground } from './Kivonas0Tol5IgG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <PicnicScene total={5} eaten={0} />,
    text: 'Pötyi epret szedett.',
    say: 'Pötyi a Számkertben epret szedett, és kirakta egy nagy levélre. Számold meg velem: 1, 2, 3, 4, 5. Öt szép piros eper!',
    mood: 'cheer',
    dots: 5,
  },
  {
    scene: <PicnicScene total={5} eaten={2} />,
    text: 'Hamm! Csigusz evett.',
    say: 'Amíg Pötyi vizet hozott, Csigusz megéhezett, és megevett 2 epret. Csak a zöld kis kalapjuk maradt. Hány egész eper maradt a levélen?',
    task: { ask: 'Hány eper maradt?', options: [3, 2, 5], hint: 'A zöld kalapokat ne számold! Csak az egész epreket.' },
  },
  {
    scene: <SentenceScene icon="eper" a={5} b={2} showResult />,
    text: '5 − 2 = 3',
    say: 'Így írjuk le: 5 − 2 = 3. Így mondjuk: 5-ből elvettünk 2-t, maradt 3. Ez a kis vízszintes vonal a mínusz jel. Ez a művelet a kivonás.',
    mood: 'wow',
    dots: 3,
  },
  {
    scene: <TenFrame n={5} crossed={2} />,
    text: 'Áthúzzuk, ami elmegy.',
    say: 'Pötyi korongokkal is kirakta. 5 korong. Amelyik elment, azt áthúzzuk: egyet, kettőt. A többi maradt: 3 korong.',
    dots: 3,
  },
  {
    scene: <FlyAwayScene icon="madar" stay={3} gone={1} />,
    text: 'Egy madár elrepült.',
    say: 'A kerítésen 4 madár üldögélt. Egy elrepült. Hány madár maradt a kerítésen?',
    task: { ask: 'Hány madár maradt?', options: [3, 4, 1], hint: 'Csak azokat számold, amelyek még a kerítésen ülnek!' },
  },
  {
    scene: <FlyAwayScene icon="meh" stay={1} gone={2} perch="flower" />,
    text: 'Zümi barátai elrepülnek.',
    say: 'Zümi barátai, a méhek, 3 virágon ültek. Aztán 2 méh hazarepült a kaptárba. Melyik kivonás illik a képhez?',
    task: {
      ask: 'Melyik illik a képhez?',
      options: ['3 − 2 = 1', '3 − 1 = 2', '2 + 1 = 3'],
      hint: 'Hány méh volt az elején? Ezzel kezdődik. Hány repült el? Azt vesszük el.',
    },
  },
  {
    scene: <FlyAwayScene icon="madar" stay={3} gone={0} />,
    text: '3 − 0 = 3',
    say: 'Most 3 madár ül a kerítésen, és egy sem repül el. 3 − 0 = 3. Ha nem veszünk el semmit, ugyanannyi marad.',
    dots: 3,
  },
  {
    scene: <PicnicScene total={2} eaten={2} />,
    text: 'Mindet megette!',
    say: 'A másik levélen 2 eper volt. Csigusz mindkettőt megette! Hány eper maradt?',
    task: { ask: 'Hány eper maradt?', options: [0, 2, 1], hint: 'Nézd meg jól: van még egész eper a levélen?' },
  },
  {
    scene: <TenFrame n={4} crossed={3} />,
    text: 'Hány korong maradt?',
    say: 'Pötyi 4 korongot rakott ki, és 3-at áthúzott. Hány korong maradt?',
    task: { ask: 'Hány korong maradt?', options: [1, 3, 4], hint: 'Az áthúzott korongokat ne számold!' },
  },
  {
    scene: <BackJumpScene from={5} steps={2} />,
    text: 'Csigusz visszafelé lép.',
    say: 'A számegyenesen is el tudunk venni: ilyenkor visszafelé lépünk, a kisebb számok felé. Csigusz az 5-ről indult, és 2-t lépett vissza. Hová ért?',
    task: { ask: 'Hová ért Csigusz?', options: [3, 4, 2], hint: 'Számold meg az íveket, és lépj vissza annyit az 5-ről!' },
  },
  {
    text: 'Melyik kép illik: 4 − 1?',
    say: 'Melyik kép illik ehhez a kivonáshoz: 4 − 1? Koppints rá!',
    task: {
      ask: 'Melyik kép illik: 4 − 1?',
      options: [
        { figure: <GroupBox icon="alma" n={4} crossed={1} />, say: '4 alma, 1 áthúzva' },
        { figure: <GroupBox icon="alma" n={4} crossed={3} />, say: '4 alma, 3 áthúzva' },
        { figure: <GroupBox icon="alma" n={5} crossed={1} />, say: '5 alma, 1 áthúzva' },
      ],
      hint: '4 alma legyen összesen, és abból 1 legyen áthúzva.',
    },
  },
  {
    scene: <PicnicScene total={5} eaten={0} snail />,
    text: 'Ügyes voltál!',
    say: 'Csigusz bocsánatot kért, és új epret szedett Pötyinek. Megtanultuk a kivonást: elvesz, elrepül, megeszik, és megnézzük, mennyi marad. Gyere, játsszunk!',
    mood: 'cheer',
    dots: 5,
  },
];

export const Kivonas0Tol5IgG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="8. Kivonás 0-tól 5-ig"
    storyTitle="Pötyi és az eltűnt eprek"
    badge="1. OSZTÁLY • II. SZÁMOLÁS 0-TÓL 5-IG • MESE"
    pages={PAGES}
    coverDots={5}
    playground={<CrossOutPlayground />}
    playgroundTitle="Játszótér: húzd át, és számold meg!"
    parentNote="A gyerek megismeri a kivonást és a mínusz jelet: képes történetekből (elvesz, elrepül, megeszik) kivonást mond, áthúzással és korongokkal kiszámolja, mennyi marad, és visszafelé lép a számegyenesen. Megtapasztalja, hogy ha semmit sem veszünk el, ugyanannyi marad, ha mindent elveszünk, nulla marad. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default Kivonas0Tol5IgG1Mese;
