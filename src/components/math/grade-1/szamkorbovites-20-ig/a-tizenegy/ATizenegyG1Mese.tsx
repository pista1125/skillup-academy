import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { DigitTrace, NumberLine } from '../../shared/G1Pics';
import { CompareScene, OpScene, PotyiPlusScene, PotyiScene, ScatterScene, TensRod, TwoFrames } from './ATizenegyG1Scenes';
import { ElevenFramesPlayground } from './ATizenegyG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <PotyiScene dots={10} mood="cheer" friends />,
    text: 'Tavasz van a Számkertben.',
    say: 'Tavasz van a Számkertben! Kinyíltak a tulipánok. Pötyi meg akarja számolni őket: minden tulipánhoz tesz egy pöttyöt a hátára.',
    mood: 'cheer',
  },
  {
    scene: <ScatterScene icon="virag" n={11} color="#ef4444" />,
    text: 'Mennyi tulipán!',
    say: 'Pötyi számol: 1, 2, 3, és így tovább, egészen 10-ig. Jaj! Mindkét szárnya megtelt, de még maradt egy tulipán!',
    mood: 'wow',
    dots: 10,
  },
  {
    scene: <PotyiPlusScene ones={1} label="10 + 1" />,
    text: '10 meg 1: tizenegy',
    say: 'Zümi segít: ő tartja a következő pöttyöt. Pötyi két teli szárnyán 10 pötty van: ez egy tízes. Züminél 1 pötty: ez egy egyes. Egy tízes és egy egyes: tizenegy.',
    task: { ask: 'Hány pötty van összesen?', options: [11, 10, 1], hint: 'Pötyin 10 pötty van, Züminél még 1. Számolj tovább a 10-től!' },
  },
  {
    scene: <TwoFrames a={10} b={1} />,
    text: '1 tízes és 1 egyes',
    say: 'Rakjuk ki korongokkal is! Az első keret tele van: ez 10 korong, egy tízes. A második keretben 1 kék korong van: egy egyes.',
    task: { ask: 'Hány korong van a két keretben?', options: [11, 10, 1], hint: 'A teli keret 10. Még 1 korong van a másikban. 10 meg 1?' },
  },
  {
    scene: <TensRod n={11} />,
    text: 'Tízesrúd és 1 kocka',
    say: 'Csigusz kockákat hozott. 10 kockát összeragasztott: ez egy tízesrúd. Mellé tett még 1 kockát. Ez is tizenegy.',
    task: {
      ask: 'Hol van 11 kocka?',
      options: [
        { figure: <TensRod n={11} />, say: 'tízesrúd és egy kocka' },
        { figure: <TensRod n={10} />, say: 'csak egy tízesrúd' },
        { figure: <TensRod n={9} />, say: 'kilenc kocka' },
      ],
      hint: 'A tízesrúd 10 kocka. Mellette még 1 kocka kell.',
    },
  },
  {
    scene: <DigitTrace digit="11" className="w-56 h-40 mx-auto" />,
    text: 'Így írjuk: 11',
    say: 'A tizenegyet két számjeggyel írjuk: két egyest egymás mellé. Az első egyes az egy tízes, a második egyes az egy egyes. Rajzold le a levegőbe!',
    dots: 10,
  },
  {
    scene: <NumberLine max={11} mark={[11]} />,
    text: 'A 11 a 10 után jön.',
    say: 'Nézd a számegyenest! A 10 után még egyet lépünk: ott a 11, ahol a piros pötty van.',
    task: { ask: 'Melyik szám jön a 10 után?', options: [11, 9, 1], hint: 'A 10-től egyet lépj tovább jobbra!' },
  },
  {
    scene: <CompareScene icon="virag" a={11} b={9} />,
    text: 'Hol van több?',
    say: 'Bal oldalon 11 tulipán van, jobb oldalon 9. Melyik jel kell középre? A jel hegye a kevesebb felé mutat.',
    task: { ask: 'Melyik jel kell?', options: ['>', '<', '='], hint: 'Bal oldalon van több. A jel nyitott szája a több felé nézzen!' },
  },
  {
    scene: <OpScene icon="virag" a={10} b={1} op="+" showResult />,
    text: '10 + 1 = 11',
    say: 'Zümi 10 tulipánra szállt, aztán még 1-re. 10 meg 1 az 11. Ha a 11-ből elveszünk 1-et, újra 10 lesz.',
    task: { ask: 'Mennyi 11 − 1?', say: 'Mennyi 11 elvéve 1?', options: [10, 11, 1], hint: 'Az egyes korongot vedd el! Mennyi marad? A teli keret.' },
  },
  {
    scene: <TwoFrames a={9} b={2} />,
    text: '9 + 2: előbb 10, aztán 11',
    say: 'Csigusz 9 tulipánt locsolt meg, aztán még 2-t. Az első keretbe már csak 1 fér: 9 meg 1 az 10. A másik 1 a második keretbe megy: 10 meg 1 az 11.',
    task: { ask: 'Mennyi 9 + 2?', say: 'Mennyi 9 meg 2?', options: [11, 10, 9], hint: 'Töltsd meg előbb a keretet: 9 meg 1 az 10. Aztán még 1!' },
  },
  {
    scene: <TwoFrames a={11} crossed={2} />,
    text: '11 − 2: előbb 1, aztán még 1',
    say: 'Pötyi 11 tulipánból 2-t Csigusznak ajándékozott. Előbb a második keretből vesszük el az 1 korongot: marad 10. Aztán még 1-et: marad 9.',
    task: { ask: 'Hány tulipán maradt?', say: 'Hány tulipán maradt Pötyinek?', options: [9, 10, 11], hint: 'Két korong van áthúzva. Számold meg, hány nincs áthúzva!' },
  },
  {
    scene: <PotyiScene number={11} mood="cheer" friends />,
    text: 'Megismerted a 11-et!',
    say: 'Hurrá! 11 tulipán, 11 pötty, 11 kocka. A tizenegy egy tízes és egy egyes. Most gyere, játsszunk!',
    mood: 'cheer',
    dots: 10,
  },
];

export const ATizenegyG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="1. A tizenegy"
    storyTitle="Pötyi és a tizenegy tulipán"
    badge="1. OSZTÁLY • VI. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 20-IG • MESE"
    pages={PAGES}
    coverDots={10}
    playground={<ElevenFramesPlayground />}
    playgroundTitle="Játszótér: rakd ki korongokkal!"
    parentNote="A gyerek megismeri a 11-et mint 1 tízest és 1 egyest: két tízes keretben, tízesrúddal és Pötyi teli szárnyaival. Megtanulja a 11 írását és helyét a számegyenesen, összehasonlít, és a könyv módszerével számol 11-ig: 9 + 2-nél előbb 10-re egészít, 11 − 2-nél előbb a 10-ig vesz el. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default ATizenegyG1Mese;
