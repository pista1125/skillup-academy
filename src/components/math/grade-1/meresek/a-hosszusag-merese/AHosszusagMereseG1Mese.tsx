import React from 'react';
import { MeseLesson, MesePage } from '../../shared/MeseLesson';
import {
  AraszScene,
  BenchSticksScene,
  FlowerFig,
  FlowersScene,
  HeightScene,
  HelloScene,
  IconFig,
  LenFig,
  MeterScene,
  PartyScene,
  PathsScene,
  RibbonsScene,
  RodScene,
  ShoeFig,
  StepsScene,
  vsRod,
} from './AHosszusagMereseG1Scenes';
import { RodMeasurePlayground } from './AHosszusagMereseG1Parts';

const PAGES: MesePage[] = [
  {
    scene: <HelloScene />,
    text: 'Holnap Csigusz születésnapja!',
    say: 'Szia! Pötyi vagyok. Holnap lesz Csigusz születésnapja! Zümivel feldíszítjük a kertet. Ehhez sok mindent meg kell mérnünk. Segítesz?',
    mood: 'cheer',
  },
  {
    scene: <RibbonsScene />,
    text: 'Egy vonalról indítsd őket!',
    say: 'Két szalagunk van. Ha össze akarod hasonlítani őket, tedd egymás mellé, és egy vonalról indítsd mindkettőt!',
    task: {
      ask: 'Melyik szalag hosszabb?',
      options: [
        { figure: <LenFig len={200} color="#ef4444" />, say: 'a piros szalag' },
        { figure: <LenFig len={140} color="#3b82f6" />, say: 'a kék szalag' },
      ],
      hint: 'Nézd meg, melyiknek a vége nyúlik messzebbre!',
      praise: 'Úgy van! A piros szalag hosszabb, a kék rövidebb.',
    },
  },
  {
    scene: <FlowersScene />,
    text: 'Magas és alacsony virágok.',
    say: 'A kertben napraforgók nőnek. Van magasabb és alacsonyabb is. Zümi a legmagasabbra szeretne szállni.',
    task: {
      ask: 'Melyik a legmagasabb?',
      say: 'Melyik napraforgó a legmagasabb?',
      options: [
        { figure: <FlowerFig h={185} color="#fb923c" />, say: 'a narancssárga napraforgó' },
        { figure: <FlowerFig h={120} color="#facc15" />, say: 'a sárga napraforgó' },
        { figure: <FlowerFig h={80} color="#f472b6" />, say: 'a rózsaszín napraforgó' },
      ],
      hint: 'Melyiknek ér a feje a legfeljebb?',
    },
  },
  {
    scene: <PathsScene />,
    text: 'Melyik út hosszabb?',
    say: 'Zümi egyenesen repül a levéltől a virágig. Csigusz kanyarogva mászik. Ha egy fonalat végigvezetünk az utakon, és kiegyenesítjük, látjuk, melyik hosszabb.',
    task: {
      ask: 'Kinek az útja hosszabb?',
      options: [
        { figure: <IconFig icon="csiga" />, say: 'Csigusz útja' },
        { figure: <IconFig icon="meh" />, say: 'Zümi útja' },
      ],
      hint: 'A kanyargós utat ha kiegyenesítjük, sokkal messzebbre ér!',
      praise: 'Ügyes! A kanyargós út hosszabb. Ezért ér Csigusz mindig később oda.',
    },
  },
  {
    scene: <BenchSticksScene n={5} />,
    text: 'Mérjük meg pálcikával!',
    say: 'Mekkora a pad? Pötyi egymás után pálcikákat tesz le a pad alá, az elejétől a végéig.',
    task: {
      ask: 'Hány pálcika hosszú a pad?',
      options: [5, 4, 6],
      hint: 'Mutass rá minden pálcikára, és számold meg őket!',
    },
  },
  {
    scene: <AraszScene n={4} />,
    text: 'Araszolva is mérhetünk.',
    say: 'Feszítsd szét a hüvelykujjad és a kisujjad! Ez egy arasz. Pötyi araszokkal méri meg az asztalt.',
    task: {
      ask: 'Hány arasz hosszú az asztal?',
      options: [4, 3, 5],
      hint: 'Számold meg a kék íveket! Mindegyik egy arasz.',
    },
  },
  {
    scene: <StepsScene small={6} big={3} />,
    text: 'Lépéssel is mérhetünk.',
    say: 'Az utat lépésekkel mérjük. A kis cipővel 6 lépés, a nagy csizmával csak 3 lépés. A kis lépésből többet kell lépni.',
    task: {
      ask: 'Kinek kellett többet lépnie?',
      say: 'Ki lépett többet: a kis cipő vagy a nagy csizma?',
      options: [
        { figure: <ShoeFig />, say: 'a kis cipő' },
        { figure: <ShoeFig big />, say: 'a nagy csizma' },
      ],
      hint: 'Számold meg a rózsaszín és a zöld nyomokat!',
      praise: 'Úgy van! A kis cipő 6-ot lépett, a nagy csizma csak 3-at.',
    },
  },
  {
    scene: <RodScene />,
    text: 'Ez a rúd 1 deciméter.',
    say: 'Ez a narancssárga rúd. Olyan hosszú, mint 1 deciméter. A radír rövidebb nála, a ceruza hosszabb nála.',
    task: {
      ask: 'Melyik rövidebb a rúdnál?',
      options: [vsRod('kulcs', 0.7), vsRod('ecset', 1.8), vsRod('szalag', 2.4, '#a855f7')],
      hint: 'Nézd meg, melyiknek a vége nem éri el a rúd végét!',
    },
  },
  {
    scene: <MeterScene />,
    text: '10 rúd hossza 1 méter.',
    say: 'Ha 10 narancssárga rudat egymás után teszünk, olyan hosszú lesz, mint a piros-fehér méterrúd. 1 méter 10 deciméter.',
    task: {
      ask: 'Hány rúd hosszú a méterrúd?',
      say: 'Hány narancssárga rúd hosszú a méterrúd?',
      options: [10, 8, 5],
      hint: 'Számold meg a narancssárga rudakat egyenként!',
    },
  },
  {
    scene: <HeightScene n={4} what="torta" />,
    text: 'Milyen magas a torta?',
    say: 'Csigusz tortája mellé rudakat raktunk egymásra. Számold meg, hány rúd magas a torta!',
    task: {
      ask: 'Hány dm magas a torta?',
      say: 'Hány deciméter magas a torta?',
      options: [4, 3, 5],
      hint: 'Számold meg a rudakat alulról felfelé, a szaggatott vonalig!',
    },
  },
  {
    scene: <PartyScene />,
    text: 'Boldog születésnapot, Csigusz!',
    say: 'Hurrá! Mindent megmértünk: hosszabb, rövidebb, magasabb, alacsonyabb. Mértünk pálcikával, araszolva, lépéssel és rúddal. Ügyes voltál! Most gyere, játsszunk!',
    mood: 'cheer',
  },
];

export const AHosszusagMereseG1Mese: React.FC<{ onBack?: () => void; onStartQuiz?: () => void }> = ({ onBack, onStartQuiz }) => (
  <MeseLesson
    title="1. A hosszúság mérése"
    storyTitle="Pötyi és Csigusz szülinapi szalagjai"
    badge="1. OSZTÁLY • V. MÉRÉSEK • MESE"
    pages={PAGES}
    coverDots={7}
    playground={<RodMeasurePlayground />}
    playgroundTitle="Játszótér: mérj rudakkal!"
    parentNote="A gyerek összehasonlítja a hosszúságokat (hosszabb, rövidebb, magasabb, alacsonyabb, széles, keskeny), és megtanulja, hogy közös vonalról kell indítani őket. Mér pálcikával, araszolva, lépéssel és a narancssárga rúddal (1 dm), és látja, hogy 10 rúd 1 méter. Otthon mérjenek együtt araszolva és lépésekkel: kinek kell többet lépnie?"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
  />
);

export default AHosszusagMereseG1Mese;
