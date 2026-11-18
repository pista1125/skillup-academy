import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { CountBox, EqCard, HopLine, WinterFriendsScene } from '../a-nyolc/ANyolcG1Scenes';
import { HatSplitsScene, PicEq, TwoEqScene } from './Szamolas0Tol8IgG1Scenes';
import { SnowballCalcPlayground } from './Szamolas0Tol8IgG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <WinterFriendsScene dots={8} />,
    text: 'Hógolyócsata!',
    say: 'Még mindig fehér a Számkert. Pötyi, Zümi és Csigusz hógolyócsatát rendeznek. Előbb sok hógolyót kell gyúrni!',
    mood: 'cheer',
    dots: 8,
  },
  {
    scene: <CountBox icon="hogolyo" n={5} nb={3} colorB="#bae6fd" className="w-56 h-auto mx-auto" />,
    text: '5 fehér, 3 kék hógolyó.',
    say: 'Pötyi 5 fehér hógolyót gyúrt, Zümi 3 kéket. Hány hógolyó van együtt?',
    task: { ask: 'Hány hógolyó van együtt?', options: [8, 7, 2], hint: 'Számold meg a fehéreket, aztán számolj tovább a kékekkel: 6, 7…' },
  },
  {
    scene: <TwoEqScene a="5 + 3 = 8" b="3 + 5 = 8" />,
    text: '5 + 3 = 8 és 3 + 5 = 8',
    say: 'Leírjuk: 5 meg 3 egyenlő 8. Ha előbb a kékeket számoljuk, akkor 3 meg 5, és az is 8. Ha megcseréljük a két számot, ugyanannyi marad.',
    dots: 8,
  },
  {
    scene: <HatSplitsScene />,
    text: 'A 8 sokféle lehet.',
    say: 'Nézd a sapkasorokat! Mindegyikben 8 sapka van. 7 meg 1, 6 meg 2, 5 meg 3, 4 meg 4. Mindegyik 8.',
    dots: 8,
  },
  {
    text: 'Melyik kettő együtt 8?',
    say: 'Csigusz két kupacba rakja a hógolyókat. Melyik két szám együtt 8?',
    task: { ask: 'Melyik kettő együtt 8?', options: ['4 + 4', '4 + 3', '5 + 2'], hint: 'Számold ki mindegyiket az ujjaiddal! Melyik lesz pont 8?' },
  },
  {
    scene: <PicEq pic={<CountBox icon="hogolyo" n={8} crossed={2} />} eq="8 − 2 = ?" />,
    text: 'Elrepült 2 hógolyó.',
    say: '8 hógolyó volt. Pötyi kettőt eldobott, ezeket áthúztuk. Hány hógolyó maradt? 8 elvéve 2.',
    task: { ask: 'Hány hógolyó maradt?', options: [6, 5, 7], hint: 'Csak azokat számold, amelyek nincsenek áthúzva!' },
  },
  {
    scene: <HopLine from={7} to={4} icon="csiga" />,
    text: 'Csigusz visszacsúszik.',
    say: 'Csigusz a 7-en ül a számegyenesen. Hármat csúszik vissza a domb felé: 7 elvéve 3. Hová ér?',
    task: { ask: 'Hová ért Csigusz?', options: [4, 3, 5], hint: 'Számold meg a visszafelé ívet: 6, 5, 4. Hol állt meg?' },
  },
  {
    scene: <HopLine from={3} to={8} icon="meh" hideTarget={false} />,
    text: 'Zümi előre ugrik: 3 + 5 = 8',
    say: 'Zümi a 3-ról indul, és ötöt ugrik előre: 4, 5, 6, 7, 8. Hozzáadásnál előre megyünk, elvételnél visszafelé.',
    dots: 8,
  },
  {
    scene: <EqCard text="2 + 6 ? 5" />,
    text: 'Melyik jel kell?',
    say: 'Zümi azt kérdezi: 2 meg 6, vagy 5 a több? Előbb számold ki a 2 meg 6-ot! Melyik jel kell a kérdőjel helyére?',
    task: { ask: 'Melyik jel kell?', options: ['>', '<', '='], hint: 'Előbb számold ki: 2 meg 6. Aztán nézd meg: több vagy kevesebb, mint 5? A jel hegye a kisebb felé mutat.' },
  },
  {
    scene: <PicEq pic={<CountBox icon="hogolyo" n={8} crossed={4} />} eq="8 − 2 − 2 = ?" />,
    text: 'Kettőt Zümi, kettőt Csigusz kap.',
    say: 'Pötyinek 8 hógolyója van. 2-t ad Züminek, aztán 2-t Csigusznak. Hány marad Pötyinél? 8 elvéve 2, elvéve 2.',
    task: { ask: 'Hány hógolyó marad Pötyinél?', options: [4, 6, 2], hint: 'Lépésenként haladj: 8 elvéve 2, az 6. Aztán 6 elvéve 2.' },
  },
  {
    scene: <EqCard text="2 4 6 ?" />,
    text: 'Mindig 2-vel több.',
    say: 'A hógolyókupacok egyre nagyobbak: 2, 4, 6. Mindig kettővel több. Mennyi lesz a következő?',
    task: { ask: 'Mi jön a 6 után?', options: [8, 7, 5], hint: 'Adj hozzá kettőt a 6-hoz: számolj tovább kettőt!' },
  },
  {
    scene: <WinterFriendsScene dots={8} />,
    text: 'Ügyesen számoltál!',
    say: 'Hurrá! Vége a hógolyócsatának. Hozzáadtunk, elvettünk, előre és visszafelé lépkedtünk 8-ig. Gyere, játsszunk még!',
    mood: 'cheer',
    dots: 8,
  },
];

export const Szamolas0Tol8IgG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="10. Számolás 0-tól 8-ig"
    storyTitle="Pötyi és a hógolyócsata"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • MESE"
    pages={PAGES}
    coverDots={8}
    playground={<SnowballCalcPlayground />}
    playgroundTitle="Játszótér: hógolyó-számoló"
    parentNote="A gyerek képről és számegyenesen összead és kivon a 8-as számkörben, észreveszi, hogy a tagok felcserélhetők (5 + 3 = 3 + 5), és megismeri a 8 bontásait (7 + 1, 6 + 2, 5 + 3, 4 + 4). Két lépésben is számol (8 − 2 − 2), műveletet hasonlít össze számmal (2 + 6 > 5), és szabály szerint folytat számsort. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default Szamolas0Tol8IgG1Mese;
