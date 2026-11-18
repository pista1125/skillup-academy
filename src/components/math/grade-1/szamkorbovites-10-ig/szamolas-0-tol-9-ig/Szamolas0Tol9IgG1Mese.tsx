import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { EqCard } from '../a-nyolc/ANyolcG1Scenes';
import { ArrowCard, BakeryScene, PlatesScene, SlotBox, TrayScene } from './Szamolas0Tol9IgG1Scenes';
import { CookieCalcPlayground } from './Szamolas0Tol9IgG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <BakeryScene dots={9} />,
    text: 'Mézeskalácsot sütünk!',
    say: 'Az ünnep előtt Pötyi, Zümi és Csigusz mézeskalácsot süt. Zümi hozta a mézet a kaptárból. Gyere, segíts nekik számolni!',
    mood: 'cheer',
  },
  {
    scene: <TrayScene a={6} b={3} />,
    text: 'Kész az első tálca!',
    say: 'Kisült az első tálca: 6 csillag és 3 szív alakú süti. Hány süti van a tálcán? 6 + 3 = ?',
    task: { ask: '6 + 3 = ?', options: [9, 8, 7], hint: 'Számold meg a csillagokat, aztán számolj tovább a szívekkel: 7, 8…' },
  },
  {
    scene: <TrayScene a={3} b={6} iconA="sutiSziv" iconB="suti" />,
    text: '3 + 6 = 9 is igaz!',
    say: 'Csigusz megfordította a tálcát. Most elöl van a 3 szív, utána a 6 csillag. Ugyanannyi süti maradt: 3 + 6 is 9. Ha a két számot felcseréljük, az eredmény nem változik.',
    dots: 9,
  },
  {
    scene: <ArrowCard from={3} op="+5" />,
    text: 'Számolj a nyíl szerint!',
    say: 'Zümi 3 kanál mézet tett a tésztába. A nyíl azt mondja: tegyél hozzá még 5-öt. Hány kanál méz lesz a tésztában?',
    task: { ask: 'Mi kerül a □ helyére?', say: '3 + 5 = ?', options: [8, 7, 9], hint: 'Kezdd a 3-nál, és számolj tovább ötöt: 4, 5, 6, 7…' },
  },
  {
    scene: <TrayScene a={9} crossed={2} />,
    text: 'Csigusz kóstolgat.',
    say: 'A második tálcán 9 süti volt. Csigusz megkóstolt kettőt, ezeket áthúztuk. Hány süti maradt? 9 − 2 = ?',
    task: { ask: '9 − 2 = ?', options: [7, 6, 8], hint: 'Csak azokat számold, amelyek nincsenek áthúzva!' },
  },
  {
    scene: <TrayScene a={9} crossed={2} />,
    text: '9 − 7 = 2',
    say: 'Erről a képről másik kivonás is szól. 9 sütiből 7 egészben maradt. Hányat evett meg Csigusz? 9 − 7 = 2. Mondd el te is: mikor mit számoltunk ki?',
    mood: 'think',
  },
  {
    scene: <SlotBox have={4} />,
    text: '4 + □ = 9',
    say: 'Pötyi dobozba csomagolja a sütiket. A dobozban 9 hely van, 4 süti már benne van. Hány süti fér még bele? 4 + valahány = 9.',
    task: { ask: 'Melyik szám kell a □ helyére?', say: '4 + □ = 9. Melyik szám kell az üres négyzetbe?', options: [5, 4, 6], hint: 'Számold meg az üres helyeket! Vagy számolj tovább a 4-től a 9-ig.' },
  },
  {
    scene: <EqCard text="9 − □ = 3" />,
    text: 'Hányat vitt el Zümi?',
    say: 'A harmadik tálcán 9 süti volt. Zümi elvitt néhányat a méhecske barátainak. 3 süti maradt. Hányat vitt el Zümi?',
    task: { ask: 'Melyik szám kell a □ helyére?', say: '9 − □ = 3. Melyik szám kell az üres négyzetbe?', options: [6, 5, 3], hint: 'Lépj visszafelé a 9-től a 3-ig: 8, 7, 6… Hányat léptél?' },
  },
  {
    scene: <PlatesScene per={[3, 3, 3]} />,
    text: 'Mindenkinek 3 süti jut.',
    say: 'Uzsonna! Pötyi, Zümi és Csigusz is kap 3-3 sütit egy tányéron. Hány süti van a három tányéron együtt? 3 + 3 + 3 = ?',
    task: { ask: '3 + 3 + 3 = ?', options: [9, 6, 8], hint: 'Előbb add össze az első két tányért: 3 + 3 = 6. Aztán jön még 3.' },
  },
  {
    scene: <EqCard text="6 + 3 ? 8" />,
    text: 'Melyik jel kell?',
    say: 'Pötyi talált egy fejtörőt. Bal oldalon 6 + 3 van, jobb oldalon 8. Számold ki a bal oldalt, aztán tedd ki a jelet!',
    task: { ask: 'Melyik jel kell a ? helyére?', options: ['>', '<', '='], hint: 'Mennyi 6 + 3? Aztán nézd meg: több vagy kevesebb, mint 8?' },
  },
  {
    scene: <BakeryScene dots={9} cookies mood="cheer" />,
    text: 'Ügyesen számoltál!',
    say: 'Hurrá! Kész minden süti. Összeadtál, elvettél, kiegészítettél, és három számot is összeadtál 9-ig. Gyere, játsszunk!',
    mood: 'cheer',
    dots: 9,
  },
];

export const Szamolas0Tol9IgG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="14. Számolás 0-tól 9-ig"
    storyTitle="Pötyi és a mézeskalács-sütés"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • MESE"
    pages={PAGES}
    coverDots={9}
    playground={<CookieCalcPlayground />}
    playgroundTitle="Játszótér: süti-számoló"
    parentNote="A gyerek képről összeadást és kivonást olvas le és számol ki 9-ig, észreveszi, hogy a tagok felcserélhetők, nyíl szerint számol, kiegészít (4 + □ = 9), megkeresi a hiányzó kivonandót (9 − □ = 3), három számot ad össze, és műveletet hasonlít össze számmal (<, >, =). A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default Szamolas0Tol9IgG1Mese;
