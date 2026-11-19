import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { DigitTrace, NumberLine } from '../../shared/G1Pics';
import { CompareScene, OpScene, PotyiScene, SeqStrip, TwoFrames } from '../a-tizenegy/ATizenegyG1Scenes';
import { FrogPondScene, PondFriendsScene } from './ATizenharomG1Scenes';
import { FrogHopPlayground } from './ATizenharomG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <PondFriendsScene />,
    text: 'Kirándulás a tóhoz',
    say: 'Nyár van. Pötyi, Zümi és Csigusz kirándul a tóhoz. Brekeke! – szól valaki a tavirózsa levelén. Egy béka! És nincs egyedül…',
    mood: 'wow',
  },
  {
    scene: <FrogPondScene n={13} />,
    text: 'Hány béka napozik?',
    say: 'A tavon sok béka napozik a leveleken. Számold meg őket! Mutass rá mindegyikre!',
    task: { ask: 'Hány béka van?', options: [13, 12, 11], hint: 'Mutass rá minden békára, egyet se hagyj ki! A 10 után számolj tovább!' },
  },
  {
    scene: <TwoFrames a={10} b={3} />,
    text: '1 tízes és 3 egyes',
    say: 'Pötyi minden békához tesz egy korongot. Az első keret megtelt: ez 1 tízes. A másodikban 3 korong van: 3 egyes. 1 tízes és 3 egyes: tizenhárom.',
    task: { ask: 'Hány egyes van a 13-ban?', say: 'Hány egyes van a tizenháromban? Hány korong van a második keretben?', options: [3, 1, 13], hint: 'A teli keret a tízes. Számold meg a második keret korongjait!' },
  },
  {
    scene: <DigitTrace digit="13" className="w-56 h-40 mx-auto" />,
    text: 'Így írjuk: 13',
    say: 'A tizenhármat így írjuk: elöl egy egyes, ez az 1 tízes. Mellé egy hármas, ez a 3 egyes. Rajzold le a levegőbe!',
    dots: 10,
  },
  {
    scene: <SeqStrip items={[11, '?', 13]} />,
    text: 'A 12 szomszédai',
    say: 'A 13 a 12 után jön. Most már a 12-nek is tudjuk mindkét szomszédját: a 11-et és a 13-at. Melyik szám van középen?',
    task: { ask: 'Melyik szám van középen?', options: [12, 10, 2], hint: 'A 11 után jön, és a 13 előtt.' },
  },
  {
    scene: <NumberLine max={13} mark={[1]} jumps={[{ from: 1, to: 11 }, { from: 11, to: 13 }]} hideLabels={[11, 12, 13]} />,
    text: '1 + 12: előbb 10, aztán 2',
    say: 'Egy béka az 1-es kövön ül. Nagyot ugrik: 10-et. Aztán még egy kicsit: 2-t. Összesen 12-t ugrott. 1 meg 12, hová érkezett?',
    task: { ask: 'Hová érkezett a béka?', options: [13, 12, 11], hint: 'Az 1-ről 10-et ugrik: 11. Onnan még 2-t.' },
  },
  {
    scene: <TwoFrames a={13} crossed={3} />,
    text: '13 − 3',
    say: 'Hoppá! 3 béka beugrott a vízbe. Épp a második keret 3 korongja tűnt el. 13-ból elvettünk 3-at.',
    task: { ask: 'Hány béka maradt a parton?', options: [10, 3, 13], hint: 'Az egyesek eltűntek. Mi maradt? A teli keret.' },
  },
  {
    scene: <TwoFrames a={9} b={4} />,
    text: '9 + 4: előbb 10, aztán 13',
    say: 'Zümi 9 tavirózsát látogatott meg, aztán még 4-et. Az első keretbe 1 fér még: 9 meg 1 az 10. A maradék 3 a második keretbe: 10 meg 3 az 13.',
    task: { ask: 'Mennyi 9 + 4?', say: 'Mennyi 9 meg 4?', options: [13, 12, 11], hint: 'Előbb töltsd meg a keretet: 9 meg 1. A négyből még 3 maradt.' },
  },
  {
    scene: <TwoFrames a={13} crossed={5} />,
    text: '13 − 5: előbb 3, aztán 2',
    say: 'A tavon 13 tavirózsa nyílt. Este 5 összecsukja a szirmait. Előbb a második keretből tűnik el 3: marad 10. Aztán még 2: marad 8.',
    task: { ask: 'Mennyi 13 − 5?', say: 'Mennyi 13 elvéve 5?', options: [8, 9, 7], hint: 'Előbb 3-at vegyél el: 10 marad. Aztán a 10-ből még 2-t.' },
  },
  {
    scene: <OpScene icon="hal" a={11} b={2} op="+" />,
    text: '2-vel több, mint 11',
    say: 'Csigusz 11 halat látott a vízben. Zümi 2-vel többet. 11 meg 2. Hány halat látott Zümi?',
    task: { ask: 'Hány halat látott Zümi?', options: [13, 12, 9], hint: '2-vel több: a 11-től számolj tovább kettőt!' },
  },
  {
    scene: <CompareScene icon="virag" a={13} b={12} />,
    text: 'Hol van több?',
    say: 'Bal oldalon 13 virág, jobb oldalon 12. Melyik jel kell középre? A jel hegye a kevesebb felé mutat.',
    task: { ask: 'Melyik jel kell?', options: ['>', '<', '='], hint: 'Bal oldalon eggyel több van. A jel szája a több felé nyílik.' },
  },
  {
    scene: <PotyiScene number={13} mood="cheer" friends />,
    text: 'Megismerted a 13-at!',
    say: 'Hurrá! 13 béka, 13 tavirózsa. A tizenhárom 1 tízes és 3 egyes. Most gyere, játsszunk békaugrást!',
    mood: 'cheer',
    dots: 10,
  },
];

export const ATizenharomG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="3. A tizenhárom"
    storyTitle="Pötyi és a tizenhárom béka"
    badge="1. OSZTÁLY • VI. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 20-IG • MESE"
    pages={PAGES}
    coverDots={10}
    playground={<FrogHopPlayground />}
    playgroundTitle="Játszótér: békaugrás a számegyenesen"
    parentNote="A gyerek megismeri a 13-at mint 1 tízest és 3 egyest, megtanulja az írását, és hogy a 12 szomszédai a 11 és a 13. A számegyenesen ugrálva ad össze (1 + 12: előbb 10, aztán 2), és a könyv módszerével számol 10-en át: 9 + 4-nél előbb 10-re pótol, 13 − 5-nél előbb a 10-ig vesz el. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default ATizenharomG1Mese;
