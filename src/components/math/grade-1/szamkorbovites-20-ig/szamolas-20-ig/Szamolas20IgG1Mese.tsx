import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { NumberLine } from '../../shared/G1Pics';
import { HopLine, SeqStrip, TwoFrames } from '../a-tizenot/ATizenotG1Scenes';
import { RodsScene } from '../a-husz/AHuszG1Scenes';
import { BalloonNumbers, BalloonRow, MoreScene, PartyScene } from './Szamolas20IgG1Scenes';
import { BalloonPlayground } from './Szamolas20IgG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <PartyScene mood="wow" />,
    text: 'Év végi ünnep a Számkertben!',
    say: 'Vége az iskolaévnek! Pötyi nagy ünnepet rendez a Számkertben. Zümi és Csigusz segít a készülődésben. Minden díszhez jár egy kis feladat. Segítesz?',
    mood: 'wow',
  },
  {
    scene: <BalloonNumbers items={[14, 15, 16, '?', 18, 19, 20]} />,
    text: 'Melyik lufi hiányzik?',
    say: 'Zümi számozott lufikat kötött fel: 14, 15, 16, aztán egy kérdőjel, majd 18, 19, 20. Melyik szám kell a kérdőjel helyére?',
    task: { ask: 'Melyik lufi hiányzik?', options: [17, 16, 18], hint: 'Mindig eggyel több jön. A 16 után melyik szám jön?' },
  },
  {
    scene: <RodsScene n={16} />,
    text: '1 tízes és 6 egyes',
    say: 'Csigusz tízesrudakból és kockákból tornyot épít. Egy rúd 10 kocka, és mellette 6 sárga kocka van. Melyik számot rakta ki?',
    task: { ask: 'Melyik számot rakta ki Csigusz?', options: [16, 7, 15], hint: 'Egy rúd 10. Számolj tovább a kockákkal: 11, 12…' },
  },
  {
    scene: <TwoFrames a={8} b={6} />,
    text: '8 + 6: előbb a tízig!',
    say: 'Pötyi 8 piros és 6 kék tányért tett az asztalra. Ahogy már tudod: a 8-hoz előbb 2 kell, az 10. A 6-ból maradt még 4. Hány tányér van?',
    task: { ask: '8 + 6 = ?', options: [14, 13, 15], hint: 'Előbb a tízig: 8 meg 2. Aztán a 10-hez még 4.' },
  },
  {
    scene: <TwoFrames a={14} crossed={6} />,
    text: '14 − 6: előbb vissza a tízig!',
    say: '14 sütiből 6-ot megettek a vendégek. Pötyi előbb 4-et vesz el, az 10. Aztán még 2-t. Hány süti maradt?',
    task: { ask: '14 − 6 = ?', options: [8, 9, 7], hint: 'Előbb 14-ből 4: az 10. A 10-ből még 2-t vegyél el!' },
  },
  {
    scene: <HopLine max={20} from={7} jumps={[{ from: 7, to: 17 }, { from: 17, to: 16 }]} question={16} />,
    text: '7 + 9: 10-et előre, 1-et vissza!',
    say: 'Zümi a számegyenesen repül. A 7-ről indul, és 9-et kell előre mennie. Zümi okos: előbb 10-et ugrik, az 17. Ez eggyel több a kelleténél, ezért 1-et visszalép. Hová ér?',
    task: { ask: '7 + 9 = ?', options: [16, 17, 15], hint: '7 meg 10 az 17. Aztán lépj vissza egyet!' },
  },
  {
    scene: <NumberLine max={20} mark={[17, 19]} question={18} />,
    text: 'Ki lakik a 17 és a 19 között?',
    say: 'A számegyenesen a 17 és a 19 van megjelölve. Melyik szám lakik közöttük? Ő mindkettőnek a szomszédja.',
    task: { ask: 'Melyik szám van a 17 és a 19 között?', options: [18, 16, 20], hint: 'Lépj egyet a 17-től előre!' },
  },
  {
    scene: <TwoFrames a={12} />,
    text: '12 + □ = 20',
    say: 'Az ünnepre 20 vendég jön. Már 12 széket kitettek. Hány szék kell még, hogy 20 legyen? Számold meg az üres helyeket!',
    task: { ask: 'Melyik szám illik a □ helyére?', say: '12 meg valahány az 20. Melyik szám illik az üres helyre?', options: [8, 7, 9], hint: 'Számold meg az üres helyeket a második keretben!' },
  },
  {
    scene: <SeqStrip items={[0, 3, 6, 9, '?']} />,
    text: 'Mindig 3-mal több.',
    say: 'Csigusz köveket rak le a kertben, mindig 3-mal többet: 0, 3, 6, 9. Melyik szám jön?',
    task: { ask: 'Melyik szám jön a 9 után?', options: [12, 10, 11], hint: 'Mindig 3-mal több: a 9-től lépj hármat előre!' },
  },
  {
    scene: <MoreScene a={6} more={7} />,
    text: 'Zümi 7-tel többet sütött.',
    say: 'Csigusz 6 sütit sütött. Zümi 7-tel többet sütött, mint Csigusz. Hány sütit sütött Zümi?',
    task: { ask: 'Hány sütit sütött Zümi?', options: [13, 7, 1], hint: 'Zümi ugyanannyit sütött, mint Csigusz, és még 7-et. 6 meg 7: előbb a tízig!' },
  },
  {
    scene: <BalloonRow n={8} yellow={4} />,
    text: 'Hányadik a sárga lufi?',
    say: 'A lufisor eleje Pötyinél van. Pötyitől számolva hányadik a sárga lufi?',
    task: { ask: 'Hányadik a sárga lufi?', options: ['4.', '3.', '5.'], hint: 'Pötyitől számolj: első, második, …' },
  },
  {
    scene: <PartyScene number={20} mood="cheer" />,
    text: 'Viszlát a 2. osztályban!',
    say: 'Hurrá, kész az ünnep! Egész évben együtt számoltunk: 0-tól egészen 20-ig. Köszönöm, hogy velem tartottál! Nyáron is számolj sokat, és találkozunk a 2. osztályban. Előtte még játsszunk egy nagyot!',
    mood: 'cheer',
  },
];

export const Szamolas20IgG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="11. Számolás 20-ig"
    storyTitle="Pötyi év végi ünnepe"
    badge="1. OSZTÁLY • VI. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 20-IG • MESE"
    pages={PAGES}
    coverDots={7}
    playground={<BalloonPlayground />}
    playgroundTitle="Játszótér: lufik az ünnepre!"
    parentNote="Témakörzáró és év végi ismétlés: a gyerek a 20-as számkörben számlál, tízesekből és egyesekből rak ki számokat, megkeresi a számszomszédokat, sorozatot folytat, és összead, kivon a tízen át is (8 + 6 = 8 + 2 + 4, 14 − 6 = 14 − 4 − 2, 7 + 9 = 7 + 10 − 1). Kiegészít 20-ra, „ennyivel több” szöveges feladatot old meg, és sorszámot mond. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default Szamolas20IgG1Mese;
