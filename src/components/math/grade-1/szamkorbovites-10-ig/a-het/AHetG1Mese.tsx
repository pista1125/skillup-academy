import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import { DigitTrace, Domino, NumberLine, TenFrame } from '../../shared/G1Pics';
import { CompareScene, GroupBox, HandsScene, OpScene, PotyiScene, WeekScene } from './AHetG1Scenes';
import { SevenDotsPlayground } from './AHetG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <PotyiScene dots={7} mood="cheer" friends />,
    text: 'Pötyi titka',
    say: 'Pötyi ma titkot árul el Züminek és Csigusznak. Tudjátok, miért hívnak engem hétpöttyös katicának? Számoljátok meg a pöttyeimet!',
    mood: 'cheer',
  },
  {
    scene: <PotyiScene dots={7} />,
    text: 'Számold meg!',
    say: 'Mutass rá mindegyik pöttyre, és számolj hangosan!',
    task: { ask: 'Hány pöttye van Pötyinek?', options: [7, 6, 5], hint: 'Mutass rá minden pöttyre, egyet se hagyj ki! Kezdd a bal szárnyon!' },
  },
  {
    scene: <PotyiScene dots={7} mood="wow" />,
    text: 'Hét pötty: 5 meg 2.',
    say: 'Hét pötty! Az egyik szárnyamon öt pötty van, a másikon kettő. Öt meg kettő az hét.',
    dots: 7,
  },
  {
    scene: <HandsScene a={5} b={2} />,
    text: 'Hét ujj.',
    say: 'Mutass hét ujjat! Egy egész kéz, az öt. A másik kézen még két ujj. Öt meg kettő, az hét.',
    task: {
      ask: 'Melyik dominón van 7 pötty?',
      options: [
        { figure: <Domino left={5} right={2} />, say: 'öt és kettő' },
        { figure: <Domino left={3} right={3} />, say: 'három és három' },
        { figure: <Domino left={4} right={1} />, say: 'négy és egy' },
      ],
      hint: 'Számold meg mindkét oldalt együtt! Hét pötty kell.',
    },
  },
  {
    scene: <OpScene icon="alma" a={6} b={1} op="+" iconB="alma" showResult />,
    text: '6 meg még 1: 7',
    say: 'Zümi hat almát talált. Csigusz hozott még egyet. Hat meg egy az hét. A hét eggyel több, mint a hat.',
    dots: 7,
  },
  {
    scene: <DigitTrace digit={7} />,
    text: 'Ez a hetes: 7',
    say: 'Ez itt a hetes. A zöld pöttytől jobbra húzzuk a tetejét, aztán ferdén le, mint egy csúszda. Kézzel írva középre egy kis vonalat is húzunk. Rajzold le a levegőbe!',
    dots: 7,
  },
  {
    text: 'Hol van 7 virág?',
    say: 'Zümi hét virágot keres. Melyik képen van hét virág?',
    task: {
      ask: 'Hol van 7 virág?',
      options: [
        { figure: <GroupBox icon="virag" n={7} />, say: 'hét virág' },
        { figure: <GroupBox icon="virag" n={6} />, say: 'hat virág' },
        { figure: <GroupBox icon="virag" n={5} />, say: 'öt virág' },
      ],
      hint: 'Számold meg a virágokat mindegyik képen! Hét kell, nem hat.',
    },
  },
  {
    scene: <WeekScene />,
    text: 'A hétnek 7 napja van.',
    say: 'Tudod, mi van még hét? A hétnek hét napja van: hétfő, kedd, szerda, csütörtök, péntek, szombat, vasárnap. Pötyi minden napra kap egy pöttyöt.',
    dots: 7,
  },
  {
    scene: <NumberLine max={7} mark={[7]} />,
    text: 'A 7 a 6 után jön.',
    say: 'Ez a számegyenes. A hetes a hatos után jön, itt, ahol a piros pötty van.',
    task: { ask: 'Melyik szám jön a 6 után?', options: [7, 5, 4], hint: 'Nézd a számegyenest! A hatostól egyet lépj tovább!' },
  },
  {
    scene: <TenFrame n={4} second={3} />,
    text: '7 korong: piros és kék.',
    say: 'Pötyi hét korongot szórt ki: néhány piros, néhány kék. Négy piros korong van. Hány kék?',
    task: { ask: 'Hány kék korong van?', options: [3, 4, 2], hint: 'Csak a kék korongokat számold meg!' },
  },
  {
    scene: <CompareScene icon="eper" a={7} b={5} />,
    text: 'Hol van több?',
    say: 'Bal oldalon hét eper van, jobb oldalon öt. Melyik jel kell középre? A jel csőre mindig a több felé nyílik.',
    task: { ask: 'Melyik jel kell?', options: ['>', '<', '='], hint: 'Bal oldalon van több. A jel nyitott szája a több felé nézzen!' },
  },
  {
    scene: <PotyiScene dots={7} mood="cheer" friends />,
    text: 'Megtaláltad a hetet!',
    say: 'Hurrá! Hét pötty, hét ujj, hét virág, hét nap. Most gyere, játsszunk a hetessel!',
    mood: 'cheer',
    dots: 7,
  },
];

export const AHetG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="5. A hét"
    storyTitle="Pötyi, a hétpöttyös katica"
    badge="1. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS, SZÁMOLÁS 10-IG • MESE"
    pages={PAGES}
    coverDots={7}
    playground={<SevenDotsPlayground />}
    playgroundTitle="Játszótér: pöttyözd ki Pötyit!"
    parentNote="A gyerek megismeri a 7-et: hét elemű csoportokat számlál, felismeri az ujjképet (5 és 2) és a dominóképet, megtanulja a 7-es írásirányát és helyét a számegyenesen a 6 után. Két színnel bontja a hetet, és jellel hasonlít össze. A mesét a gép felolvassa; a gyerek koppintással válaszol."
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default AHetG1Mese;
