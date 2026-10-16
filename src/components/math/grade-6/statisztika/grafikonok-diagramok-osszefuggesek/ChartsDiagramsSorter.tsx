import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ChartsDiagramsSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onBack?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: A legmegfelelőbb diagramtípus kiválasztása',
    subtitle: 'Válogasd szét a gyakorlati feladatokat aszerint, hogy milyen típusú diagrammal a legcélszerűbb ábrázolni őket!',
    categories: [
      {
        id: 'cat-column',
        name: 'Oszlopdiagram (Függőleges)',
        description: 'Különálló kategóriák, csoportok összehasonlítása rövid feliratokkal',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-bar',
        name: 'Sávdiagram (Vízszintes)',
        description: 'Hosszú kategórianevek vagy sok elemből álló rangsorok',
        badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300'
      },
      {
        id: 'cat-line',
        name: 'Vonaldiagram (Folytonos)',
        description: 'Időbeli folyamatos változások, trendek (hőmérséklet, sebesség, vízállás)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      }
    ],
    items: [
      { id: 's1-1', label: '24 órás napi hőmérséklet alakulása kétóránként', category: 'cat-line' },
      { id: 's1-2', label: '6. osztályosok kedvenc tantárgyai (Matek, Tesi, Rajz, Ének)', category: 'cat-column' },
      { id: 's1-3', label: 'Iskolai szakkörök hosszú megnevezései és létszámai', category: 'cat-bar' },
      { id: 's1-4', label: 'Egy futóversenyző sebességének változása percről percre', category: 'cat-line' },
      { id: 's1-5', label: 'Matematika dolgozat érdemjegyeinek (1-5) eloszlása', category: 'cat-column' },
      { id: 's1-6', label: 'Könyvtári könyvkölcsönzések részletes témacímei', category: 'cat-bar' },
      { id: 's1-7', label: 'A Duna vízállásának heti alakulása naponta mérve', category: 'cat-line' },
      { id: 's1-8', label: 'Iskolai kosárbajnokság 4 csapatának dobott pontjai', category: 'cat-column' },
      { id: 's1-9', label: 'Kerékpáros túrázó által megtett út az eltelt órákban', category: 'cat-line' },
      { id: 's1-10', label: 'Különböző intézmények hosszú neveinek rangsora', category: 'cat-bar' },
      { id: 's1-11', label: 'Az év 12 hónapjának összesített csapadékmennyiségei', category: 'cat-column' },
      { id: 's1-12', label: 'Országok rangsora az egy főre jutó könyvolvasás alapján', category: 'cat-bar' }
    ]
  },
  2: {
    title: '2. Szint: A diagramok alkotóelemei és szerepük',
    subtitle: 'Csoportosítsd a diagram elemeit aszerint, hogy milyen funkciót töltenek be a helyes ábrázolásban!',
    categories: [
      {
        id: 'cat-axis-x',
        name: 'Vízszintes (X) Tengely',
        description: 'Kategóriák felsorolása vagy az időpontok tengelye',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-axis-y',
        name: 'Függőleges (Y) Tengely',
        description: 'Mért értékek számszerű skálája mértékegységgel',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-legend',
        name: 'Jelmagyarázat (Legenda)',
        description: 'Több csoport vagy adatsor színeinek azonosítása',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-label',
        name: 'Adatcímke & Rácsvonal',
        description: 'Pontos számok közvetlen leolvasását segítő feliratok és vonalak',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      }
    ],
    items: [
      { id: 's2-1', label: 'Tantárgyak nevei az oszlopok alatt (Matek, Tesi, Rajz)', category: 'cat-axis-x' },
      { id: 's2-2', label: 'Létszám beosztása 0-tól 30 főig ötösével léptetve', category: 'cat-axis-y' },
      { id: 's2-3', label: 'Kék téglalap: 6.A osztály, Narancs téglalap: 6.B osztály', category: 'cat-legend' },
      { id: 's2-4', label: 'Az oszlop tetejére írt pontos "12 fő" számszerű felirat', category: 'cat-label' },
      { id: 's2-5', label: 'Időpontok jelölése (06:00, 08:00, 10:00, 12:00)', category: 'cat-axis-x' },
      { id: 's2-6', label: 'Hőmérsékleti skála Celsius-fokban (°C) megadva', category: 'cat-axis-y' },
      { id: 's2-7', label: 'Piros vonal: Max hőmérséklet, Kék vonal: Min hőmérséklet', category: 'cat-legend' },
      { id: 's2-8', label: 'Halvány szaggatott vonalak az oszlopok mögött a könnyű olvasáshoz', category: 'cat-label' },
      { id: 's2-9', label: 'A hét napjainak feliratai (Hétfő, Kedd, Szerda)', category: 'cat-axis-x' },
      { id: 's2-10', label: 'Magasság skála centiméterben 100-tól 180 cm-ig', category: 'cat-axis-y' },
      { id: 's2-11', label: 'Zöld szín: Fiúk létszáma, Lila szín: Lányok létszáma', category: 'cat-legend' },
      { id: 's2-12', label: 'A vonaldiagram csúcspontja mellé írt "21°C (Max)" jelölés', category: 'cat-label' }
    ]
  },
  3: {
    title: '3. Szint: Tények, Számítások és Manipulatív Csapdák',
    subtitle: 'Döntsd el a diagramok kapcsán, hogy mi közvetlen tény, mi számítandó adat, és mi félrevezető trükk!',
    categories: [
      {
        id: 'cat-direct',
        name: 'Közvetlenül leolvasható tény',
        description: 'Minden számolás nélkül, ránézésre azonnal egyértelmű az ábráról',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-calculated',
        name: 'Számítandó következtetés',
        description: 'Összeadás, kivonás vagy átlagolás szükséges a megválaszolásához',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-manipulative',
        name: 'Félrevezető / Manipulatív jelenség',
        description: 'Torzított vagy hiányos ábrázolás a valóság manipulálására',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      { id: 's3-1', label: 'A kosárlabdázók száma pontosan 8 fő az oszlopdiagram szerint', category: 'cat-direct' },
      { id: 's3-2', label: 'A 4 sportágban résztvevő diákok teljes létszáma (12+8+6+4 = 30 fő)', category: 'cat-calculated' },
      { id: 's3-3', label: 'A függőleges tengely 95-től indul, így a 98 pont négyszeresnek látszik', category: 'cat-manipulative' },
      { id: 's3-4', label: 'A legmagasabb mért tavaszi hőmérséklet 21 °C volt', category: 'cat-direct' },
      { id: 's3-5', label: 'A 6.A és 6.B jeles tanulói közötti különbség (8 - 5 = 3 fő)', category: 'cat-calculated' },
      { id: 's3-6', label: 'Hiányoznak a számozott skálaértékek a tengelyről, csak egy nyíl emelkedik', category: 'cat-manipulative' },
      { id: 's3-7', label: 'A könyvtárban a kalandregényekből 25 darabot kölcsönöztek', category: 'cat-direct' },
      { id: 's3-8', label: 'A sportágankénti átlagos létszám kiszámítása (30 : 4 = 7,5 fő)', category: 'cat-calculated' },
      { id: 's3-9', label: 'Döntött 3D diagram, ahol az elöl lévő kisebb cikkely nagyobbnak látszik', category: 'cat-manipulative' },
      { id: 's3-10', label: 'A napi hőingás (maximum és minimum különbsége: 21°C - 4°C = 17°C)', category: 'cat-calculated' }
    ]
  }
};

export const ChartsDiagramsSorter: React.FC<ChartsDiagramsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onBack,
  topicId = 'g6-charts-diagrams-sorter',
  topicTitle = 'Grafikonok, diagramok, összefüggések'
}) => {
  const activeLevel = (currentLevel || level) as DifficultyLevel;

  return (
    <SorterTemplate
      title="Grafikonok és diagramok csoportosító"
      subtitle="Válogasd szét az ábrázolási feladatokat, alkotóelemeket és statisztikai jelenségeket 3 szinten!"
      badge="6. OSZTÁLY • VI. STATISZTIKA • 2. GRAFIKONOK, DIAGRAMOK"
      themeColor="blue"
      level={activeLevel}
      currentLevel={activeLevel}
      levels={sorterLevels}
      levelsConfig={sorterLevels}
      config={sorterLevels[activeLevel]}
      levelConfig={sorterLevels[activeLevel]}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onBack={onBack}
      topicId={topicId}
      topicTitle={topicTitle}
      grade={6}
      chapterId="statisztika"
    />
  );
};

export default ChartsDiagramsSorter;
