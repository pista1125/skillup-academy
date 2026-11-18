import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { NumberLine, TenFrame } from '../../shared/G1Pics';
import { CountBox, EqCard, WinterFriendsScene } from '../a-nyolc/ANyolcG1Scenes';
import { PicEq } from '../szamolas-0-tol-8-ig/Szamolas0Tol8IgG1Scenes';
import { HAMIS, IGAZ, SnowyCardsScene } from './NyitottMondatokG1Scenes';
import { OpenSentencePlayground } from './NyitottMondatokG1Parts';

const B = '#bae6fd';

const PAGES: MesePage[] = [
  {
    scene: <SnowyCardsScene />,
    text: 'A hó betakart egy számot!',
    say: 'Pötyi kirakta a számkártyáit a hóba. Éjjel havazott, és a hó betakart egy számot. Ahol a szám elbújt, ott most egy üres doboz van. Ez egy nyitott mondat.',
    mood: 'think',
    dots: 8,
  },
  {
    scene: <PicEq pic={<CountBox icon="hogolyo" n={3} nb={2} colorB={B} />} eq="3 + □ = 5" />,
    text: 'Melyik szám bújt el?',
    say: '3 fehér hógolyóhoz kékeket tettünk, és így 5 lett. Hány kék hógolyót tettünk hozzá? Melyik szám bújt el a doboz alatt?',
    task: { ask: 'Melyik szám illik a doboz helyére?', options: [2, 3, 5], hint: 'Számold meg a kék hógolyókat! Vagy számolj tovább a 3-tól az 5-ig.' },
  },
  {
    scene: <EqCard text="3 + □ = 5" filled={{ at: 0, value: 2, ok: true }} />,
    text: 'Próbáljuk ki: 3 + 2 = 5. Igaz!',
    say: 'Tegyük a 2-t a doboz helyére: 3 meg 2 egyenlő 5. Ez igaz! Ha a 4-et tennénk oda, 3 meg 4 az 7 lenne, és az nem 5. Az hamis.',
    dots: 8,
  },
  {
    scene: <PicEq pic={<TenFrame n={3} second={5} />} eq="□ + 5 = 8" />,
    text: 'Hány piros korong van?',
    say: 'A keretben piros és kék korongok vannak, összesen 8. A kékek 5-en vannak. Hány piros korong bújt el a doboz alatt?',
    task: { ask: 'Melyik szám illik a doboz helyére?', options: [3, 5, 2], hint: 'Számold meg a piros korongokat! Ennyi meg 5 legyen 8.' },
  },
  {
    scene: <PicEq pic={<CountBox icon="hogolyo" n={8} crossed={3} />} eq="8 − □ = 5" />,
    text: 'Hányat dobott el Zümi?',
    say: 'Zümi 8 hógolyóval kezdte. Néhányat eldobott, ezeket áthúztuk. Most 5 van neki. Hányat dobott el?',
    task: { ask: 'Melyik szám illik a doboz helyére?', options: [3, 5, 2], hint: 'Az áthúzottakat számold meg: annyit dobott el.' },
  },
  {
    scene: <PicEq pic={<CountBox icon="hogolyo" n={8} crossed={5} />} eq="□ − 5 = 3" />,
    text: 'Hány hógolyója volt Csigusznak?',
    say: 'Csigusz 5 hógolyót elgurított, és 3 maradt neki. Hány hógolyója volt az elején? A megmaradtak és az elgurítottak együtt.',
    task: { ask: 'Melyik szám illik a doboz helyére?', options: [8, 2, 7], hint: 'Számold meg az összeset: az áthúzottakat és a megmaradtakat is!' },
  },
  {
    scene: <NumberLine max={8} mark={[0, 1, 2, 3]} />,
    text: '□ < 4: sok szám jó lehet.',
    say: 'Néha több szám is illik a doboz helyére. Melyik szám kisebb, mint 4? A 0, az 1, a 2 és a 3 is! A 4 már nem, mert a 4 nem kisebb, mint 4.',
    dots: 8,
  },
  {
    scene: <EqCard text="□ < 4" />,
    text: 'Melyik teszi igazzá?',
    say: 'Pötyi három számot hozott. Melyik szám kisebb, mint 4? Melyik teszi igazzá a mondatot?',
    task: { ask: 'Melyik szám teszi igazzá?', options: [2, 4, 6], hint: 'Próbáld ki mindegyiket! A 4 nem kisebb, mint 4.' },
  },
  {
    scene: <EqCard text="□ > 5" />,
    text: 'Nagyobb, mint 5.',
    say: 'Most nagyobb kell, mint 5. Melyik szám teszi igazzá?',
    task: { ask: 'Melyik szám teszi igazzá?', options: [7, 5, 3], hint: 'Nézd a számegyenest: az 5 után jövő számok nagyobbak.' },
  },
  {
    scene: <EqCard text="2 < □ < 6" />,
    text: 'A 2 és a 6 között.',
    say: 'Ez a doboz két feltételt kér: nagyobb legyen, mint 2, és kisebb, mint 6. Melyik szám jó?',
    task: { ask: 'Melyik szám teszi igazzá?', options: [4, 1, 7], hint: 'A számnak a 2 és a 6 között kell lennie a számegyenesen.' },
  },
  {
    scene: <EqCard text="8 − 3 = 4" />,
    text: 'Igaz vagy hamis?',
    say: 'Csigusz felírt egy mondatot: 8 elvéve 3 egyenlő 4. Igaz ez, vagy hamis? A zöld pipa: igaz. A piros kereszt: hamis.',
    task: { ask: 'Igaz vagy hamis?', options: [HAMIS, IGAZ], hint: 'Számold ki: 8 elvéve 3. Annyi, mint 4?' },
  },
  {
    scene: <WinterFriendsScene dots={8} />,
    text: 'Megtaláltad a számokat!',
    say: 'Hurrá! Kisütött a nap, elolvadt a hó, és előbújtak a számok. Te már tudod: a doboz helyére azt a számot keressük, amelyikkel igaz lesz a mondat. Gyere, játsszunk!',
    mood: 'cheer',
    dots: 8,
  },
];

export const NyitottMondatokG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="11. Nyitott mondatok"
    storyTitle="Pötyi és a behavazott számok"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • MESE"
    pages={PAGES}
    coverDots={8}
    playground={<OpenSentencePlayground />}
    playgroundTitle="Játszótér: melyik szám bújt a hó alá?"
    parentNote="A gyerek megismeri a nyitott mondatot: az üres doboz (□) egy ismeretlen számot jelöl. Képről és próbálgatással megkeresi, melyik szám illik a helyére (3 + □ = 5, 8 − □ = 5, □ − 5 = 3), és megtanulja, hogy a < és > jeles mondatoknak több megoldása is lehet. Eldönti egy állításról, hogy igaz vagy hamis. A számok 0 és 8 között vannak."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default NyitottMondatokG1Mese;
