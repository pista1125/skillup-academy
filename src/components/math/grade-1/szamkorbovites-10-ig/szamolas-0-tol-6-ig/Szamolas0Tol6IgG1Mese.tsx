import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { NumberLine } from '../../shared/G1Pics';
import { RowScene } from '../a-hat/AHatG1Scenes';
import { ChainScene, ExprCompare, MixRowScene, PicnicScene } from './Szamolas0Tol6IgG1Scenes';
import { DiskFlipPlayground } from './Szamolas0Tol6IgG1Parts';

const GREEN = '#84cc16';

const PAGES: MesePage[] = [
  {
    scene: <PicnicScene />,
    text: 'Piknik a Számkertben!',
    say: 'Ma piknik van a Számkertben! Pötyi, Zümi és Csigusz gyümölcsöt gyűjt a kosárba. Közben sokat számolnak. Segíts nekik!',
    mood: 'cheer',
    dots: 6,
  },
  {
    scene: <RowScene icon="alma" n={5} n2={1} color2={GREEN} ringSecond />,
    text: '5 + 1 = ?',
    say: 'Pötyi öt piros almát hozott. Zümi még egy zöld almát tett mellé. Hány alma van összesen?',
    task: { ask: 'Hány alma van összesen?', say: 'Öt piros meg egy zöld alma. Hány alma van összesen?', options: [6, 5, 4], hint: 'Ne felejtsd el a zöld almát! Ötöt látsz, és még egyet.' },
  },
  {
    scene: <RowScene icon="alma" n={1} color={GREEN} n2={5} />,
    text: '1 + 5 = 6',
    say: 'Most a zöld alma van elöl. Egy meg öt, az is hat! Mindegy, melyik csoportot számoljuk előbb, ugyanannyi alma van.',
    dots: 6,
  },
  {
    scene: <RowScene icon="eper" n={6} crossed={2} />,
    text: '6 − 2 = ?',
    say: 'Hat eper volt a kosárban. Zümi megevett kettőt, azokat áthúztuk. Hány eper maradt?',
    task: { ask: 'Hány eper maradt?', options: [4, 3, 5], hint: 'Csak azokat számold, amelyek nincsenek áthúzva!' },
  },
  {
    scene: <NumberLine max={6} mark={[2]} question={6} jumps={[{ from: 2, to: 3 }, { from: 3, to: 4 }, { from: 4, to: 5 }, { from: 5, to: 6 }]} />,
    text: '2 + 4 = ?',
    say: 'Csigusz a számegyenesen lépeget. A kettesről indul, és négyet lép előre. Hová ér?',
    task: { ask: 'Hová ér Csigusz?', options: [6, 5, 4], hint: 'Számold meg a lépéseket a kettestől: egy, kettő, három, négy.' },
  },
  {
    scene: <NumberLine max={6} mark={[6]} question={3} jumps={[{ from: 6, to: 5 }, { from: 5, to: 4 }, { from: 4, to: 3 }]} />,
    text: '6 − 3 = ?',
    say: 'Most visszafelé megy: a hatosról indul, és hármat lép vissza. Hová ér?',
    task: { ask: 'Hová ér Csigusz?', options: [3, 2, 4], hint: 'Visszafelé lépünk a hatostól: öt, négy, három. Számold az íveket!' },
  },
  {
    scene: <ChainScene start={3} ops={['+2', '+1']} values={[5, '?']} />,
    text: 'Kövesd a nyilakat!',
    say: 'Zümi nyilakat rajzolt. A hármasból kettővel előre megyünk, az öt. Onnan még eggyel előre. Mi kerül a kérdőjel helyére?',
    task: { ask: 'Mi kerül a ? helyére?', say: 'Öt meg egy. Mi kerül a kérdőjel helyére?', options: [6, 5, 4], hint: 'Az ötből eggyel előre lépünk. Melyik szám jön az öt után?' },
  },
  {
    scene: <MixRowScene groups={[{ icon: 'alma', n: 1 }, { icon: 'eper', n: 2 }, { icon: 'gomba', n: 3 }]} />,
    text: '1 + 2 + 3 = ?',
    say: 'Csigusz egy almát, két epret és három gombát rakott a kosárba. Hány dolog van összesen?',
    task: { ask: 'Hány van összesen?', options: [6, 5, 4], hint: 'Számold meg sorban mindet: az almát, az epreket és a gombákat is!' },
  },
  {
    scene: <ExprCompare left="3 + 2" right="5 − 2" />,
    text: 'Melyik a több?',
    say: 'Bal oldalon három meg kettő, jobb oldalon öt elvéve kettő. Számold ki mindkettőt! Melyik jel kell középre?',
    task: { ask: 'Melyik jel kell?', options: ['>', '<', '='], hint: 'Bal oldalon öt lesz, jobb oldalon három. A jel hegye a kevesebb felé mutat.' },
  },
  {
    scene: <RowScene icon="alma" n={6} crossed={6} />,
    text: '6 − 6 = 0',
    say: 'A piknik végére mind a hat alma elfogyott. Hat elvéve hat, az nulla. Nem maradt semmi!',
    dots: 0,
  },
  {
    scene: <PicnicScene />,
    text: 'Ügyesen számoltál!',
    say: 'Hurrá! Összeadtunk, elvettünk, lépegettünk és nyilakat követtünk, mindig hatig. Most gyere, játsszunk!',
    mood: 'cheer',
    dots: 6,
  },
];

export const Szamolas0Tol6IgG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="2. Számolás 0-tól 6-ig"
    storyTitle="Pötyi és a nagy piknik"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • MESE"
    pages={PAGES}
    coverDots={6}
    playground={<DiskFlipPlayground />}
    playgroundTitle="Játszótér: korongfordító"
    parentNote="A gyerek képről és számegyenesen összead és kivon 6-ig, látja, hogy a tagok felcserélhetők (5 + 1 = 1 + 5), három számot is összead (1 + 2 + 3), nyilak mentén két lépést számol egymás után, és műveletek eredményét hasonlítja össze (<, >, =). A korongfordítóval a 3–6 számok bontását gyakorolja. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default Szamolas0Tol6IgG1Mese;
