import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { NumberLine } from '../../shared/G1Pics';
import { EqCard } from '../a-nyolc/ANyolcG1Scenes';
import { KeysScene, ShedScene } from './Megallo8G1Scenes';
import { KeyPuzzlePlayground } from './Megallo8G1Parts';

const KEYS = [2, 4, 6, 7, 8];

const PAGES: MesePage[] = [
  {
    scene: <ShedScene />,
    text: 'Szánkózni megyünk!',
    say: 'Pötyi, Zümi és Csigusz szánkózni szeretnének. A szánkók a kamrában vannak, de az ajtón lakat van. Melyik kulcs nyitja?',
    mood: 'think',
    dots: 8,
  },
  {
    scene: <KeysScene nums={KEYS} friends />,
    text: 'Öt kulcs. Melyik a jó?',
    say: 'Öt kulcs lóg a szögön: a 2-es, a 4-es, a 6-os, a 7-es és a 8-as. Csigusz tudja a titkot, de csak feladványokban mondja el. Minden feladvány egy rossz kulcsot mutat meg.',
    dots: 8,
  },
  {
    scene: <EqCard text="3 + 3 = ?" />,
    text: 'Nem a 3 + 3.',
    say: 'Csigusz első feladványa: nem a 3 meg 3. Mennyi 3 meg 3? Azt a kulcsot áthúzzuk.',
    task: { ask: 'Mennyi 3 + 3?', options: [6, 5, 7], hint: 'Számolj tovább a 3-tól még hármat!' },
  },
  {
    scene: <NumberLine max={8} mark={[8]} />,
    text: 'Nem a 8 kisebb szomszédja.',
    say: 'Második feladvány: nem a 8 kisebb szomszédja. Melyik szám áll közvetlenül a 8 előtt?',
    task: { ask: 'Melyik a 8 kisebb szomszédja?', options: [7, 6, 5], hint: 'Nézd a számegyenest: a 8 előtt melyik szám áll?' },
  },
  {
    scene: <EqCard text="8 − 6 = ?" />,
    text: 'Nem a 8 − 6.',
    say: 'Harmadik feladvány: nem a 8 elvéve 6. Mennyi 8 elvéve 6?',
    task: { ask: 'Mennyi 8 − 6?', options: [2, 3, 6], hint: 'Mutass 8 ujjat, és hajts be hatot! Hány maradt fent?' },
  },
  {
    scene: <EqCard text="□ + 4 = 8" />,
    text: 'Nem a □ + 4 = 8.',
    say: 'Negyedik feladvány: nem az a szám, amelyikhez 4-et adva 8 lesz. Melyik szám bújt el a doboz alatt?',
    task: { ask: 'Melyik szám illik a □ helyére?', options: [4, 3, 5], hint: 'Mennyi kell a 4-hez, hogy 8 legyen? Számolj tovább a 4-től!' },
  },
  {
    scene: <KeysScene nums={KEYS} crossed={[6, 7, 2, 4]} />,
    text: 'Melyik kulcs maradt?',
    say: 'Áthúztuk a 6-ost, a 7-est, a 2-est és a 4-est. Melyik kulcs maradt meg?',
    task: { ask: 'Melyik kulcs nyitja a kamrát?', options: [8, 4, 2], hint: 'Keresd azt a kulcsot, amelyik nincs áthúzva!' },
  },
  {
    scene: <ShedScene open />,
    text: 'Kinyílt a kamra!',
    say: 'Pötyi a 8-as kulcsot teszi a lakatba. Kattan, és kinyílik az ajtó! Bent van a szánkó.',
    mood: 'cheer',
    dots: 8,
  },
  {
    scene: <EqCard text="5 + □ = 8" />,
    text: 'Hány hógolyó fér még rá?',
    say: 'Csigusz hógolyókat visz a szánkón. A szánkóra 8 hógolyó fér, és már 5 rajta van. Hány fér még rá? 5 meg valahány egyenlő 8.',
    task: { ask: 'Melyik szám illik a □ helyére?', options: [3, 2, 4], hint: 'Számolj tovább az 5-től a 8-ig, és figyeld, hányat mondtál!' },
  },
  {
    scene: <EqCard text="8 − 2 ? 5" />,
    text: 'Melyik jel kell?',
    say: 'Lent a domb alján Zümi még egy feladványt mond: 8 elvéve 2, és 5. Melyik jel kell a kérdőjel helyére?',
    task: { ask: 'Melyik jel kell?', options: ['>', '<', '='], hint: 'Előbb számold ki a 8 elvéve 2-t! Aztán hasonlítsd az 5-höz.' },
  },
  {
    scene: <ShedScene open />,
    text: 'Ügyes vagy!',
    say: 'Hurrá! Megfejtetted Csigusz rejtvényét, és mehetünk szánkózni. Most jön Pötyi nagy játéka: mindent gyakorolunk, amit 8-ig tanultunk.',
    mood: 'cheer',
    dots: 8,
  },
];

export const Megallo8G1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="12. Megálló"
    storyTitle="Pötyi és a szánkós kamra kulcsa"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • MESE"
    pages={PAGES}
    coverDots={8}
    playground={<KeyPuzzlePlayground />}
    playgroundTitle="Játszótér: kulcsrejtvény"
    parentNote="Ismétlő, ellenőrző lecke a 8-as számkörben: számlálás és számjegyek 8-ig, összeadás és kivonás képről, számegyenesen és fejben, a 8 bontásai, számszomszédok, összehasonlítás a <, >, = jelekkel és a nyitott mondatok (□). A kulcsrejtvényben a gyerek kizárással gondolkodik: kiszámolja, melyik kulcs nem jó, és a megmaradt nyit."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default Megallo8G1Mese;
