import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ChartsDiagramsMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onBack?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Diagramtípusok és Alapelemek',
    subtitle: 'Párosítsd a diagramtípusokat és tengelyeket a megfelelő feladataikkal és meghatározásukkal!',
    pairs: [
      { id: 'p1-1', prompt: 'Oszlopdiagram', value: 'Függőleges oszlopok magassága fejezi ki a mennyiséget' },
      { id: 'p1-2', prompt: 'Sávdiagram', value: 'Vízszintes sávok hosszúsága mutatja a mért adatot' },
      { id: 'p1-3', prompt: 'Vonaldiagram', value: 'Időbeli változások, folyamatos trendek ábrázolására szolgál' },
      { id: 'p1-4', prompt: 'Vízszintes (X) tengely', value: 'A vizsgált kategóriák vagy az időpontok tengelye' },
      { id: 'p1-5', prompt: 'Függőleges (Y) tengely', value: 'A mért értékek számszerű skálája (mértékegységgel)' },
      { id: 'p1-6', prompt: 'Jelmagyarázat (Legenda)', value: 'Bemutatja, hogy melyik szín melyik csoporthoz tartozik' },
      { id: 'p1-7', prompt: 'Minimum érték', value: 'A diagram legkisebb, legalacsonyabb adatpontja' },
      { id: 'p1-8', prompt: 'Maximum érték', value: 'A diagram legmagasabb, csúcsértéke' }
    ]
  },
  2: {
    title: '2. Szint: Diagramok Olvasása és Számítások',
    subtitle: 'Párosítsd a diagramok alapján felvetett kérdéseket a pontosan kiszámított válaszokkal!',
    pairs: [
      { id: 'p2-1', prompt: 'Sportok: Foci (12 fő) és Kosár (8 fő) együtt', value: '20 tanuló' },
      { id: 'p2-2', prompt: 'Könyvtár: 30 képregény vs. 15 sci-fi különbsége', value: '15 darabbal több képregény' },
      { id: 'p2-3', prompt: 'Könyvtári összkölcsönzés (30+25+15+10)', value: '80 darab könyv' },
      { id: 'p2-4', prompt: 'Hőmérséklet ingadozás (21°C max - 4°C min)', value: '17 °C hőingás' },
      { id: 'p2-5', prompt: 'Mikor mérték a legmagasabb hőmérsékletet (21°C)?', value: '14:00-kor (délután)' },
      { id: 'p2-6', prompt: 'A 4 sportág átlagos létszáma (30 : 4)', value: '7,5 fő / sportág' },
      { id: 'p2-7', prompt: 'Kettős oszlop: 6.A jelesek (8 fő) és 6.B jelesek (5 fő) különbsége', value: '3 fővel több a 6.A-ban' },
      { id: 'p2-8', prompt: 'Legkisebb létszámú sportág (Futás)', value: '4 fő' }
    ]
  },
  3: {
    title: '3. Szint: Trendek, Meredekség és Statisztikai Csapdák',
    subtitle: 'Párosítsd az összetett grafikonok jellegzetességeit és a statisztikai manipulációk formáit!',
    pairs: [
      { id: 'p3-1', prompt: 'Meredeken felfelé haladó vonalszakasz', value: 'Gyors ütemű, intenzív növekedés' },
      { id: 'p3-2', prompt: 'Vízszintes szakasz a vonaldiagramon', value: 'Állandó érték, stagnálás (nincs változás)' },
      { id: 'p3-3', prompt: 'Lefelé hajló vonalszakasz', value: 'Csökkenő folyamat (hűlés, lassulás)' },
      { id: 'p3-4', prompt: 'Csonkolt (nem 0-ról induló) tengely', value: 'Eltorzítja az arányokat, a minimális eltérést óriásinak mutatja' },
      { id: 'p3-5', prompt: 'Kettős oszlopdiagram célja', value: 'Két párhuzamos adatsor (pl. két osztály) egyidejű összevetése' },
      { id: 'p3-6', prompt: 'Hiányzó skálázás a tengelyen', value: 'Manipulatív, semmilyen pontos adat nem olvasható le róla' },
      { id: 'p3-7', prompt: 'Egyenletes skálabeosztás', value: 'Azonos távolságok mindig azonos mennyiséget jelentenek' },
      { id: 'p3-8', prompt: 'A diagramok legfőbb előnye a táblázattal szemben', value: 'Azonnali vizuális áttekinthetőség és mintázatfelismerés' }
    ]
  }
};

export const ChartsDiagramsMatcher: React.FC<ChartsDiagramsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onBack,
  topicId = 'g6-charts-diagrams-matcher',
  topicTitle = 'Grafikonok, diagramok, összefüggések'
}) => {
  const activeLevel = (currentLevel || level) as DifficultyLevel;

  return (
    <MatcherTemplate
      title="Grafikonok és diagramok párosító"
      subtitle="Párosítsd a diagramtípusokat, leolvasott adatokat és statisztikai összefüggéseket 3 szinten!"
      badge="6. OSZTÁLY • VI. STATISZTIKA • 2. GRAFIKONOK, DIAGRAMOK"
      themeColor="blue"
      level={activeLevel}
      currentLevel={activeLevel}
      levels={matcherLevels}
      levelsConfig={matcherLevels}
      config={matcherLevels[activeLevel]}
      levelConfig={matcherLevels[activeLevel]}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onBack={onBack}
      topicId={topicId}
      topicTitle={topicTitle}
      grade={6}
      chapterId="statisztika"
    />
  );
};

export default ChartsDiagramsMatcher;
