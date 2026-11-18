import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { Potyi } from '../../shared/Potyi';
import { DigitTrace, Domino, NumberLine, TenFrame } from '../../shared/G1Pics';
import { CompareBoxes, CountBox, EqCard, TwoHands } from '../a-nyolc/ANyolcG1Scenes';
import { FeederFriendsScene, FeederScene, PotyiWingsScene, TwoRowsScene } from './ATizG1Scenes';
import { FillTenPlayground } from './ATizG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <FeederFriendsScene />,
    text: 'Kész a madáretető!',
    say: 'Hideg tél van a Számkertben. Pötyi, Zümi és Csigusz madáretetőt építettek, és napraforgómagot szórtak bele. Vajon hány madár jön enni?',
    mood: 'cheer',
  },
  {
    scene: <FeederScene birds={9} />,
    text: 'Hány madár eszik?',
    say: 'Megérkeztek a madarak! Lent a padlón is, fent a tetőn is ülnek. Számold meg őket!',
    task: { ask: 'Hány madár ül az etetőn?', options: [9, 8, 10], hint: 'Előbb a lentieket számold, aztán folytasd a tetőn! Egyet se hagyj ki.' },
  },
  {
    scene: <FeederScene birds={9} coming={1} />,
    text: '9 meg 1: 10!',
    say: 'Nézd, jön még egy kismadár! 9 madár ült az etetőn, és jött még 1. 9 meg 1 az 10. Ez a tíz!',
    mood: 'wow',
    dots: 10,
  },
  {
    scene: <PotyiWingsScene dots={10} mood="cheer" />,
    text: 'Pötyi szárnyai tele!',
    say: 'Pötyi is kipróbálta: minden helyre tett egy pöttyöt. A bal szárnyán 5, a jobb szárnyán is 5. Ha mindkét szárnya tele van, az 10 pötty.',
    dots: 10,
    mood: 'cheer',
  },
  {
    scene: <DigitTrace digit="10" className="w-64 h-40 mx-auto" />,
    text: 'Ez a tíz: 10',
    say: 'A tíz az első szám, amit két számjeggyel írunk. Előbb egy egyest írunk, mellé jobbra egy nullát. Rajzold le a levegőbe: egyes, és mellé nulla!',
    dots: 10,
  },
  {
    scene: (
      <svg viewBox="0 0 480 240">
        <rect x="0" y="0" width="480" height="240" rx="18" fill="#fef3c7" />
        <svg x="10" y="10" width="220" height="116" viewBox="0 0 210 110">
          <TwoHands n={10} className="" />
        </svg>
        <svg x="260" y="30" width="190" height="95" viewBox="0 0 160 80">
          <Domino left={5} right={5} className="" />
        </svg>
        <svg x="110" y="136" width="260" height="96" viewBox="0 0 260 112">
          <TenFrame n={10} className="" />
        </svg>
      </svg>
    ),
    text: 'Tíz ujj. Tíz pötty.',
    say: 'Mutasd fel mind a tíz ujjadat: két kéz, mindkettőn 5 ujj. A dominón kétszer öt pötty van. A tízes keret most tele van: fent 5, lent 5 korong.',
    task: {
      ask: 'Melyik keret van tele?',
      say: 'Melyik tízes keretben van 10 korong? Melyik van tele?',
      options: [
        { figure: <TenFrame n={10} />, say: 'tíz korong' },
        { figure: <TenFrame n={9} />, say: 'kilenc korong' },
        { figure: <TenFrame n={8} />, say: 'nyolc korong' },
      ],
      hint: 'Nézd meg, maradt-e üres hely! A teli keretben nincs üres hely.',
    },
  },
  {
    scene: <NumberLine max={10} mark={[10]} />,
    text: 'A 10 a 9 után jön.',
    say: 'Ez a számegyenes. Nulla, egy, kettő, és így tovább, egészen kilencig. A 9 után jön a 10, ott, ahol a piros pötty van.',
    task: { ask: 'Melyik a 10 kisebb szomszédja?', options: [9, 8, 1], hint: 'A kisebb szomszéd közvetlenül a 10 előtt áll a számegyenesen.' },
  },
  {
    text: 'Hol van 10 hógolyó?',
    say: 'Csigusz hógolyókat gyúrt a madaraknak, hogy játsszanak. Melyik dobozban van pont 10 hógolyó?',
    task: {
      ask: 'Hol van 10 hógolyó?',
      options: [
        { figure: <CountBox icon="hogolyo" n={10} />, say: 'tíz hógolyó' },
        { figure: <CountBox icon="hogolyo" n={9} />, say: 'kilenc hógolyó' },
        { figure: <CountBox icon="hogolyo" n={7} />, say: 'hét hógolyó' },
      ],
      hint: 'Számold meg soronként! A teli sorban 5 van. Hol van kétszer öt?',
    },
  },
  {
    scene: <CompareBoxes icon="madar" a={10} b={8} />,
    text: 'Melyik jel kell?',
    say: 'Zümi két etetőt figyel. Az egyiken 10 madár ül, a másikon 8. Melyik jel kell középre? A jel hegye a kevesebb felé mutat.',
    task: { ask: 'Melyik jel kell?', say: '10 madár, és 8 madár. Melyik jel kell középre?', options: ['>', '<', '='], hint: 'A 8 kevesebb, mint a 10. A jel hegye a 8 felé mutasson!' },
  },
  {
    scene: <TwoRowsScene a={10} b={8} />,
    text: 'Mennyivel több?',
    say: 'Állítsuk párba őket! Fent 10 madár, lent 8. Minden lenti madár alá jut egy fenti. Mennyivel több madár van fent?',
    task: { ask: 'Mennyivel több madár van fent?', options: [2, 1, 10], hint: 'Párosítsd őket! Hány fenti madárnak nem jut pár?' },
  },
  {
    scene: (
      <svg viewBox="0 0 480 240">
        <rect x="0" y="0" width="480" height="240" rx="18" fill="#f5f3ff" />
        <Potyi dots={6} mood="think" x={20} y={25} size={190} />
        <svg x="200" y="70" width="270" height="70" viewBox="0 0 314 90">
          <EqCard text="6 + □ = 10" className="" />
        </svg>
      </svg>
    ),
    text: 'Hány pötty kell még?',
    say: 'Pötyi hátán most 6 pötty van. Hány pötty kell még, hogy mindkét szárnya tele legyen, és 10 pötty legyen? 6 meg valahány az 10.',
    dots: 6,
    task: { ask: 'Hány pötty kell még a 10-hez?', options: [4, 3, 5], hint: 'Számolj tovább a 6-tól a 10-ig: 7, 8, 9, 10. Hányat számoltál?' },
  },
  {
    scene: <FeederFriendsScene dots={10} />,
    text: 'Megtaláltad a tízet!',
    say: 'Hurrá! 10 madár, 10 ujj, 10 pötty Pötyi két szárnyán. A tíz a 9 után jön, és két számjeggyel írjuk. Most gyere, játsszunk!',
    mood: 'cheer',
    dots: 10,
  },
];

export const ATizG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="17. A tíz"
    storyTitle="Pötyi és a madáretető"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • MESE"
    pages={PAGES}
    coverDots={10}
    playground={<FillTenPlayground />}
    playgroundTitle="Játszótér: töltsd meg a keretet!"
    parentNote="A gyerek megismeri a tízet: 9 meg 1 az 10, két kéz tíz ujja, a teli tízes keret és Pötyi két teli szárnya. Megtudja, hogy a 10 az első kétjegyű szám (egyes és nulla), megtalálja a számegyenesen a 9 után, összehasonlítja a 10-et kisebb számokkal, és kiegészíti a számokat 10-re. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default ATizG1Mese;
