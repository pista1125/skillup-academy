import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { Domino, Hand, NumberLine } from '../../shared/G1Pics';
import { CompareScene, JumpLineScene } from '../a-ketto/AKettoG1Scenes';
import { BasketBox } from '../a-nulla/ANullaG1Scenes';
import { PicnicScene } from '../kivonas-0-tol-5-ig/Kivonas0Tol5IgG1Scenes';
import { AddScene, CrateTowerScene, HarvestScene, WheelbarrowScene } from './Megallo5G1Scenes';
import { UnderClothPlayground } from './Megallo5G1Parts';

const dom = (n: number, say: string) => ({ figure: <Domino left={n} single />, say });

const PAGES: MesePage[] = [
  {
    scene: <HarvestScene />,
    text: 'Szüreti ünnep a Számkertben!',
    say: 'Ma nagy nap van a Számkertben: szüreti ünnep! Pötyi, Zümi és Csigusz összegyűjti, ami megtermett. Közben megnézzük, mi mindent tanultál már 0-tól 5-ig.',
    mood: 'cheer',
    dots: 5,
  },
  {
    scene: <BasketBox n={4} icon="alma" className="w-48 h-40 mx-auto" />,
    text: 'Hány alma van a kosárban?',
    say: 'Pötyi almát szedett. Hány alma van a kosarában? Mutass rá mindegyikre!',
    task: { ask: 'Hány alma van a kosárban?', options: [4, 5, 3], hint: 'Mutass rá mindegyik almára, és számolj: 1, 2, 3...' },
  },
  {
    scene: <NumberLine max={5} />,
    text: '0, 1, 2, 3, 4, 5',
    say: 'Ezeket a számokat már mind ismered: 0, 1, 2, 3, 4, 5. Mindegyiknek megvan a helye a számegyenesen. Minden szám eggyel több, mint az előtte lévő.',
    dots: 5,
  },
  {
    scene: <Hand fingers={4} className="w-36 h-36 mx-auto" />,
    text: 'Melyik dominó illik a kézhez?',
    say: 'Zümi 4 ujjat mutat. Melyik dominón van ugyanennyi pötty?',
    task: { ask: 'Melyik dominó illik a kézhez?', options: [dom(4, 'négy pötty'), dom(5, 'öt pötty'), dom(3, 'három pötty')], hint: 'Számold meg az ujjakat, aztán a pöttyöket!' },
  },
  {
    scene: <CompareScene icon="gomba" a={2} b={4} />,
    text: 'Melyik jel kell?',
    say: 'Csigusz gombát gyűjt. Bal oldalon 2 gomba van, jobb oldalon 4. Melyik jel kell középre?',
    task: { ask: 'Melyik jel kell?', options: ['<', '>', '='], hint: 'A jel hegye a kevesebb felé mutat. Hol van kevesebb?' },
  },
  {
    scene: <AddScene icon="gomba" have={3} add={2} />,
    text: 'Zümi hoz még gombát.',
    say: 'Csigusz kosarában 3 gomba van. Zümi hozott még 2-t. Hány gomba lett a kosárban? 3 + 2 = ?',
    task: { ask: 'Hány gomba lett?', options: [5, 4, 1], hint: 'Számolj tovább a 3-tól: 4, 5. Vagy számold meg mindet!' },
  },
  {
    scene: <PicnicScene total={4} eaten={1} />,
    text: '4 − 1 = 3',
    say: 'Uzsonnaszünet! A levélen 4 eper volt, Csigusz megevett 1-et. 4 − 1 = 3. 3 eper maradt Pötyinek és Züminek.',
    dots: 3,
  },
  {
    scene: <WheelbarrowScene visible={2} hidden={3} />,
    text: 'Mi van a kendő alatt?',
    say: 'Csigusz talicskájában 5 répa van. 2 répa kilátszik, a többit letakarta egy kendővel. Hány répa van a kendő alatt?',
    task: { ask: 'Hány répa van a kendő alatt?', options: [3, 2, 5], hint: '5 kell összesen. Számolj tovább a 2-től: 3, 4, 5. Hányat számoltál?' },
  },
  {
    scene: <WheelbarrowScene visible={2} hidden={3} reveal />,
    text: '2 + 3 = 5',
    say: 'Nézzük meg! A kendő alatt 3 répa volt. 2 + 3 = 5. Az 5-öt így is bonthatjuk: 2 és 3.',
    mood: 'wow',
    dots: 5,
  },
  {
    scene: <CrateTowerScene items={['eper', 'alma', 'gomba']} />,
    text: 'Melyik van legfelül?',
    say: 'A termés ládákba került, egymás tetejére. Mi van a legfelső ládában?',
    task: {
      ask: 'Mi van a legfelső ládában?',
      options: [
        { figure: <BasketBox n={1} icon="eper" />, say: 'eper' },
        { figure: <BasketBox n={1} icon="alma" />, say: 'alma' },
        { figure: <BasketBox n={1} icon="gomba" />, say: 'gomba' },
      ],
      hint: 'Legfelül: ez a láda van a legmagasabban, a többi alatta van.',
    },
  },
  {
    scene: <JumpLineScene steps={5} icon="meh" />,
    text: 'Zümi ugrál.',
    say: 'Zümi örömében ugrál a számegyenesen. A nulláról indult, és 5-öt ugrott. Hová ért?',
    task: { ask: 'Hová ért Zümi?', options: [5, 4, 3], hint: 'Számold meg az íveket! Annyit ugrott.' },
  },
  {
    scene: <HarvestScene mood="cheer" />,
    text: 'Mindent tudsz 0-tól 5-ig!',
    say: 'Hurrá! Kész a szüret. Számoltál, jeleket tettél, összeadtál és elvettél. Most jöhet Pötyi nagy játéka!',
    mood: 'cheer',
    dots: 5,
  },
];

export const Megallo5G1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="9. Megálló"
    storyTitle="Pötyi és a szüreti ünnep"
    badge="1. OSZTÁLY • II. SZÁMOLÁS 0-TÓL 5-IG • MESE"
    pages={PAGES}
    coverDots={5}
    playground={<UnderClothPlayground />}
    playgroundTitle="Játszótér: mi van a kendő alatt?"
    parentNote="Ez a Megálló a 0–5 számkör összefoglalása: számlálás, számjegyek, ujj- és dominókép, számegyenes, a <, >, = jelek, összeadás és kivonás 5-ig, valamint az 5 (és a kisebb számok) bontása. A Játszótéren a gyerek kitalálja, mennyi van a kendő alatt, aztán összeadással ellenőrizzük. A nagy játék 3 szinten 12-12 kérdéssel méri fel a tudást."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default Megallo5G1Mese;
