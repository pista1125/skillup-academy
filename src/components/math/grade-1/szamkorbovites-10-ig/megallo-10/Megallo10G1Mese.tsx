import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { BigSign, NumberLine } from '../../shared/G1Pics';
import { CountBox, EqCard, NumberHouse, SnowfallScene } from '../a-nyolc/ANyolcG1Scenes';
import { FeederScene, PairsScene } from '../a-tiz/ATizG1Scenes';
import { MoreLessScene } from '../szoveges-feladatok/SzovegesFeladatokG1Scenes';
import { QueueScene, TreasureScene } from './Megallo10G1Scenes';
import { TreasurePlayground } from './Megallo10G1Parts';

const eqScene = (t: string) => <EqCard text={t} className="w-full max-w-[360px] h-auto mx-auto" />;

const PAGES: MesePage[] = [
  {
    scene: <TreasureScene gems={0} open={false} />,
    text: 'Téli kincskeresés!',
    say: 'Pötyi talált egy titkos térképet. A Számkert havas ösvényén van egy kincsesláda! Az ösvényen állomások vannak, mindegyiken egy feladat. Gyere, oldjuk meg együtt!',
    mood: 'wow',
  },
  {
    scene: <SnowfallScene n={7} />,
    text: 'Első állomás: hópelyhek.',
    say: 'Az első állomáson hópelyhek hullanak. Számold meg őket!',
    task: { ask: 'Hány hópehely hull?', options: [7, 6, 8], hint: 'Mutass rá mindegyikre, és számolj hangosan!' },
  },
  {
    text: 'Melyik a kilences?',
    say: 'A második állomáson számkártyák vannak a hóban. Melyik a kilences?',
    task: {
      ask: 'Melyik a kilences?',
      options: [
        { figure: <BigSign text="9" />, say: 'kilences' },
        { figure: <BigSign text="6" />, say: 'hatos' },
        { figure: <BigSign text="8" />, say: 'nyolcas' },
      ],
      hint: 'A kilences feje fent van, a lába lent. A hatos fordítva: a pocakja lent.',
    },
  },
  {
    scene: <NumberLine max={10} mark={[5, 7]} question={6} />,
    text: 'Ki lakik a kettő között?',
    say: 'A harmadik állomáson a számegyenes van. Melyik szám lakik az 5 és a 7 között? Ő a két szám közös szomszédja.',
    task: { ask: 'Melyik szám van az 5 és a 7 között?', options: [6, 4, 8], hint: 'Lépj egyet az 5-től előre!' },
  },
  {
    scene: <PairsScene n={7} />,
    text: 'Páros vagy páratlan?',
    say: 'A negyedik állomáson 7 szív van, kettesével párba állítva. Mindegyiknek jutott pár? A 7 páros vagy páratlan?',
    task: { ask: 'A 7 páros vagy páratlan?', options: ['páratlan', 'páros'], hint: 'Nézd meg, maradt-e szív pár nélkül!' },
  },
  {
    scene: <QueueScene items={['meh', 'csiga', 'potyi', 'madar', 'hogolyo']} question={3} />,
    text: 'Hányadik Pötyi?',
    say: 'Az ötödik állomáson sorba álltak a barátok a szánkóhoz. A sor eleje a zászlónál van. Elöl Zümi áll, ő az első. Hányadik a sorban Pötyi?',
    task: { ask: 'Hányadik a sorban Pötyi?', options: ['3.', '2.', '4.'], hint: 'Számolj a zászlótól: első, második, …' },
  },
  {
    scene: <FeederScene birds={5} coming={3} />,
    text: 'Jön még 3 madár.',
    say: 'A hatodik állomás a madáretető. 5 madár ül rajta, és jön még 3. Hány madár lesz az etetőn?',
    task: { ask: 'Hány madár lesz az etetőn?', options: [8, 3, 7], hint: 'Számolj tovább az 5-től a jövő madarakkal!' },
  },
  {
    scene: <CountBox icon="hogolyo" n={9} crossed={4} className="w-full max-w-[340px] h-auto mx-auto" />,
    text: '9 − 4 = ?',
    say: 'A hetedik állomáson 9 hógolyó volt. Csigusz 4-et elgurított. Hány hógolyó maradt? Mennyi 9 − 4?',
    task: { ask: 'Mennyi 9 − 4?', options: [5, 4, 6], hint: 'Az áthúzott hógolyókat ne számold!' },
  },
  {
    scene: <NumberHouse top={9} rows={[[4, '?']]} />,
    text: 'A 9 háza',
    say: 'A nyolcadik állomáson egy számház áll. A tetején a 9. Az egyik szobában 4 lakik. Ki lakik mellette, hogy együtt 9 legyen?',
    task: { ask: 'Melyik szám kell a ? helyére?', say: '4 meg valahány az 9. Melyik szám kell a kérdőjel helyére?', options: [5, 4, 6], hint: 'Számolj tovább a 4-től a 9-ig az ujjaidon!' },
  },
  {
    scene: eqScene('□ + 2 = 7'),
    text: 'Nyitott mondat',
    say: 'A kilencedik állomáson egy nyitott mondat van. Valahány meg 2 az 7. Melyik szám kell a négyzetbe?',
    task: { ask: 'Melyik szám kell a □ helyére?', options: [5, 9, 4], hint: 'Mennyi kell a 2-höz, hogy 7 legyen? Vagy: 7-ből vegyél el 2-t!' },
  },
  {
    scene: <MoreLessScene a={6} diff={3} more={false} icon="level" whoA="csiga" whoB="meh" />,
    text: 'Az utolsó mese',
    say: 'Az utolsó állomáson Pötyi mesél. Csigusz 6 levelet gyűjtött. Zümi 3-mal kevesebbet. Hány levelet gyűjtött Zümi?',
    task: { ask: 'Hány levelet gyűjtött Zümi?', options: [3, 9, 6], hint: '3-mal kevesebb: vegyél el 3-at a 6-ból!' },
  },
  {
    scene: <TreasureScene gems={10} />,
    text: 'Megvan a kincs!',
    say: 'Hurrá! Minden állomást megoldottál, és kinyílt a kincsesláda. 10 csillogó drágakő van benne! Te már ügyesen számolsz 10-ig. Most gyere, játsszunk egy nagyot!',
    mood: 'cheer',
    dots: 10,
  },
];

export const Megallo10G1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="20. Megálló"
    storyTitle="Pötyi és a téli kincskeresés"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • MESE"
    pages={PAGES}
    coverDots={10}
    playground={<TreasurePlayground />}
    playgroundTitle="Játszótér: töltsd meg a kincsesládát!"
    parentNote="Ismétlés a III. témakör végén: számlálás és számjegyek 10-ig, számszomszédok, páros és páratlan számok, sorszámnevek, összeadás és kivonás 10-ig, a számok bontása, nyitott mondatok és rövid szöveges feladatok. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default Megallo10G1Mese;
