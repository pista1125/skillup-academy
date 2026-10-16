import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface DataMeanMatcherProps {
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
    title: '1. Szint: Alapfogalmak és Definíciók',
    subtitle: 'Párosítsd a statisztikai mutatókat és alapfogalmakat a pontos meghatározásukkal!',
    pairs: [
      { id: 'p1-1', prompt: 'Számtani közép (Átlag)', value: 'Az adatok összege osztva a darabszámmal' },
      { id: 'p1-2', prompt: 'Módusz (Mo)', value: 'A leggyakrabban előforduló érték (csúcs)' },
      { id: 'p1-3', prompt: 'Medián (Me)', value: 'A nagyság szerint rendezett sorozat középső eleme' },
      { id: 'p1-4', prompt: 'Terjedelem (R)', value: 'A legnagyobb és legkisebb adat különbsége (Max - Min)' },
      { id: 'p1-5', prompt: 'Gyakoriság (k)', value: 'Megmutatja, hányszor fordul elő egy adott érték' },
      { id: 'p1-6', prompt: 'Relatív gyakoriság (f)', value: 'A gyakoriság és az összes adat hányadosa (k / n)' },
      { id: 'p1-7', prompt: 'Kiugró érték (outlier)', value: 'A többi adattól kirívóan messze eső szélsőség' },
      { id: 'p1-8', prompt: 'Mintanagyság (n)', value: 'A megkérdezettek vagy mért adatok teljes darabszáma' }
    ]
  },
  2: {
    title: '2. Szint: Gyors Fejszámolások és Adatsorok',
    subtitle: 'Számítsd ki fejben az adatsorok mutatóit, és párosítsd a megfelelő eredménnyel!',
    pairs: [
      { id: 'p2-1', prompt: '{2, 4, 6, 8} adatsor átlaga', value: '5 (összeg: 20, 20 : 4 = 5)' },
      { id: 'p2-2', prompt: '{1, 3, 3, 3, 7} adatsor módusza', value: '3 (3 db fordul elő belőle)' },
      { id: 'p2-3', prompt: '{5, 2, 9, 1, 8} adatsor mediánja', value: '5 (rendezve: 1, 2, 5, 8, 9)' },
      { id: 'p2-4', prompt: '{4, 6, 8, 10} páros mediánja', value: '7 (a két középső átlaga: (6+8)/2 = 7)' },
      { id: 'p2-5', prompt: '{3, 7, 12, 19} adatsor terjedelme', value: '16 (Max - Min = 19 - 3 = 16)' },
      { id: 'p2-6', prompt: '20 diákból 5 választotta (rel. gyakoriság)', value: '25% (5 / 20 = 1/4)' },
      { id: 'p2-7', prompt: '50 diákból 15 választotta (rel. gyakoriság)', value: '30% (15 / 50 = 3/10)' },
      { id: 'p2-8', prompt: 'Öt szám összege 45, mennyi az átlaguk?', value: '9 (45 : 5 = 9)' }
    ]
  },
  3: {
    title: '3. Szint: Statisztikai Törvényszerűségek és Képletek',
    subtitle: 'Párosítsd a statisztikai törvényszerűségeket a matematikai magyarázatukkal!',
    pairs: [
      { id: 'p3-1', prompt: 'Relatív gyakoriságok összege', value: 'Mindig pontosan 1,0 (vagy 100%)' },
      { id: 'p3-2', prompt: 'Átlagtól vett előjeles eltérések összege', value: 'Mindig pontosan 0 (egyensúlyi súlypont)' },
      { id: 'p3-3', prompt: 'Páros elemszám (n) esetén a medián', value: 'A két középső adat számtani közepe' },
      { id: 'p3-4', prompt: 'Páratlan elemszám (n) esetén a medián indexe', value: '(n + 1) / 2 pozíció' },
      { id: 'p3-5', prompt: 'Egy extrém magas kiugró adat hatása', value: 'Az átlagot felhúzza, a medián stabil marad' },
      { id: 'p3-6', prompt: 'Minden adathoz +5-öt adunk hozzá', value: 'Átlag és medián +5-tel nő, terjedelem nem változik' },
      { id: 'p3-7', prompt: 'Minden adatot megszorzunk 2-vel', value: 'Átlag, medián és terjedelem is 2-szeresére nő' },
      { id: 'p3-8', prompt: 'Ha minden adat pontosan egyszer szerepel', value: 'Az adathalmaznak nincsen módusza' }
    ]
  }
};

export const DataMeanMatcher: React.FC<DataMeanMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onBack,
  topicId = 'g6-data-mean-matcher',
  topicTitle = 'Adatok ábrázolása, átlag párosító'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <MatcherTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      level={activeLevel}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onBack={onBack}
    />
  );
};

export default DataMeanMatcher;
