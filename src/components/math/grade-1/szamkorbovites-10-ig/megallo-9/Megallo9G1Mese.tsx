import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { EqCard } from '../a-nyolc/ANyolcG1Scenes';
import { TOWER, TowerScene, RacerPic, ord } from '../a-sorszamnevek/ASorszamnevekG1Scenes';
import { GridScene, MailboxesScene, MugPattern, MugPic, PieceTree, PostScene, ScarfPic, ScarfScene } from './Megallo9G1Scenes';
import { LetterPlayground } from './Megallo9G1Parts';
import { ICONS } from '../../shared/G1Pics';

const iconPic = (name: 'madar' | 'pillango', say: string) => ({
  figure: (
    <svg viewBox="0 0 100 90" className="w-24 h-auto">
      <rect x="3" y="3" width="94" height="84" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      {ICONS[name]({ x: 50, y: 46, s: 1.5 })}
    </svg>
  ),
  say,
});

const PAGES: MesePage[] = [
  {
    scene: <PostScene dots={9} />,
    text: 'Pötyi, a téli postás',
    say: 'Közeleg a téli ünnep. Pötyi meghívókat visz a barátainak, Zümi segít neki. Útközben átismételjük, amit 9-ig tanultál. Indulunk!',
    mood: 'cheer',
  },
  {
    scene: <ScarfScene a={5} b={4} />,
    text: 'Melyik sálból van több?',
    say: 'Az első ház előtt sálak száradnak. Nézd meg gyorsan, és tippelj: sárga vagy zöld sálból van több? Utána számold meg őket!',
    task: {
      ask: 'Melyik sálból van több?',
      options: [
        { figure: <ScarfPic color="#facc15" />, say: 'sárga sál' },
        { figure: <ScarfPic color="#22c55e" />, say: 'zöld sál' },
      ],
      hint: 'Számold meg külön a sárgákat és a zöldeket! Melyik szám a nagyobb?',
    },
  },
  {
    scene: <ScarfScene a={5} b={4} />,
    text: '5 + 4 = 9 és 9 − 4 = 5',
    say: '5 sárga és 4 zöld sál: 5 + 4 = 9, összesen 9 sál. Ha a 4 zöldet beviszik a házba, 9 − 4 = 5 sárga marad kint. Egy képről összeadást és kivonást is mondhatsz!',
    dots: 9,
  },
  {
    scene: <MailboxesScene numbers={[6, 7, 8, 9]} />,
    text: 'Melyik ládába megy a levél?',
    say: 'Négy postaláda áll a kerítésnél. Zümi súg: Nem a 6 + 3 ládába megy. Nem a 9 − 3 ládába. És nem a 4 + 3 ládába. Melyikbe megy a levél?',
    task: {
      ask: 'Melyik ládába megy a levél?',
      options: [8, 9, 6, 7],
      hint: 'Számold ki mindhárom súgást: 6 + 3, 9 − 3, 4 + 3. Ezek a ládák nem jók. Melyik marad?',
    },
  },
  {
    scene: <PieceTree big />,
    text: 'Fenyő háromszögekből',
    say: 'A következő házon egy fenyőfát raktak ki háromszög alakú lapokból. Hány háromszögből áll a fenyő?',
    task: { ask: 'Hány háromszögből áll a fenyő?', options: [9, 8, 6], hint: 'Soronként számolj, fentről: az első sorban 1, aztán a következő sor… A fejjel lefelé állókat is számold!' },
  },
  {
    scene: <MugPattern pattern="BBBRR" shown={8} />,
    text: 'Milyen bögre jön?',
    say: 'Az ablakban bögrék állnak sorban: 3 kék, 2 piros, aztán megint 3 kék. Milyen színű lesz a következő bögre?',
    task: {
      ask: 'Milyen színű a következő bögre?',
      options: [
        { figure: <MugPic color="#ef4444" />, say: 'piros bögre' },
        { figure: <MugPic color="#3b82f6" />, say: 'kék bögre' },
      ],
      hint: 'A minta: 3 kék, 2 piros. A második körben megvan már a 3 kék. Mi jön utána?',
    },
  },
  {
    scene: <GridScene items={[{ r: 2, c: 3, k: 'csillag' }, { r: 1, c: 1, k: 'kor' }, { r: 3, c: 2, k: 'haromszog' }]} />,
    text: 'Hányadik sorban van a csillag?',
    say: 'Pötyi táblázatba írja, hová vitte a leveleket. A sorokat fentről számoljuk, az oszlopokat balról. Hányadik sorban van a csillag?',
    task: { ask: 'Hányadik sorban van a csillag?', say: 'Fentről számolj! Hányadik sorban van a csillag?', options: [ord(2), ord(3), ord(1)], hint: 'A sorok számai a bal oldalon, a sárga mezőkben vannak.' },
  },
  {
    scene: <TowerScene residents={TOWER} />,
    text: 'Levél a 4. szintre',
    say: 'A toronyházba is jár levél. Pötyi a negyedik szintre viszi. A szinteket alulról számoljuk. Ki kapja a levelet?',
    task: {
      ask: 'Ki lakik a 4. szinten?',
      say: 'Ki lakik a negyedik szinten?',
      options: [iconPic('madar', 'madár'), { figure: <RacerPic who="potyi" />, say: 'Pötyi' }, iconPic('pillango', 'pillangó')],
      hint: 'Alulról számolj: első, második, harmadik, negyedik!',
    },
  },
  {
    scene: <EqCard text="6 + □ = 9" />,
    text: 'Hány levél maradt?',
    say: 'Pötyinek 9 levele volt. 6-ot már kivitt. Hány levél van még a táskájában? 6 + valahány = 9.',
    task: { ask: 'Melyik szám kell a □ helyére?', options: [3, 2, 4], hint: 'Számolj tovább a 6-tól a 9-ig: 7, 8, 9. Hányat mondtál?' },
  },
  {
    scene: <PostScene dots={9} mood="cheer" />,
    text: 'Minden levél megérkezett!',
    say: 'Hurrá! Minden meghívó megérkezett. Számoltál 9-ig, összeadtál, elvettél, kiegészítettél, és a sorszámokat is ismered. Most jöhet Pötyi nagy játéka!',
    mood: 'cheer',
    dots: 9,
  },
];

export const Megallo9G1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="16. Megálló"
    storyTitle="Pötyi, a téli postás"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • MESE"
    pages={PAGES}
    coverDots={9}
    playground={<LetterPlayground />}
    playgroundTitle="Játszótér: levélhordó"
    parentNote="Ez a Megálló a 9-es számkör összefoglalása (A kilenc, Számolás 0-tól 9-ig, A sorszámnevek): becslés és számlálás, összeadás és kivonás egy képről, kizárásos fejtörő műveletekkel, mintakövetés, nyitott mondatok, sorszámok sorban, táblázatban és szinteken. A Játszótéren a gyerek kiszámolja a levélen álló műveletet, és a jó postaládába viszi. A nagy játék 3 szinten 12-12 kérdéssel méri fel a tudást."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default Megallo9G1Mese;
