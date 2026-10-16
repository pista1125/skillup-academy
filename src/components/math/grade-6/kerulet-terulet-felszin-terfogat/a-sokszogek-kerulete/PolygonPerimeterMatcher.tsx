import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PolygonPerimeterMatcherProps {
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
    title: '1. Szint: Alapvető Síkidomok Kerülete',
    subtitle: 'Keresd meg az alakzat adataihoz tartozó helyes kerületet!',
    pairs: [
      { id: 'ppm1_1', prompt: 'Négyzet: a = 6 cm', value: 'K = 24 cm' },
      { id: 'ppm1_2', prompt: 'Téglalap: a = 5 cm, b = 3 cm', value: 'K = 16 cm' },
      { id: 'ppm1_3', prompt: 'Szabályos háromszög: a = 8 cm', value: 'K = 24 cm' },
      { id: 'ppm1_4', prompt: 'Egyenlő szárú háromszög: alap 10 cm, szár 7 cm', value: 'K = 24 cm' },
      { id: 'ppm1_5', prompt: 'Rombusz: a = 9 cm', value: 'K = 36 cm' },
      { id: 'ppm1_6', prompt: 'Paralelogramma: a = 7 cm, b = 4 cm', value: 'K = 22 cm' },
      { id: 'ppm1_7', prompt: 'Szabályos ötszög: a = 5 cm', value: 'K = 25 cm' },
      { id: 'ppm1_8', prompt: 'Szabályos hatszög: a = 4 cm', value: 'K = 24 cm' }
    ]
  },
  2: {
    title: '2. Szint: Vegyes Mértékegységek és Visszafelé Számolás',
    subtitle: 'Párosítsd a kerületből visszaszámolt oldalhosszakat és vegyes mértékegységeket!',
    pairs: [
      { id: 'ppm2_1', prompt: 'Téglalap: a = 40 cm, b = 3 dm', value: 'K = 140 cm' },
      { id: 'ppm2_2', prompt: 'Négyzet: K = 48 cm', value: 'a = 12 cm' },
      { id: 'ppm2_3', prompt: 'Téglalap: K = 30 cm, a = 9 cm', value: 'b = 6 cm' },
      { id: 'ppm2_4', prompt: 'Szabályos háromszög: K = 45 cm', value: 'a = 15 cm' },
      { id: 'ppm2_5', prompt: 'Rombusz: K = 60 cm', value: 'a = 15 cm' },
      { id: 'ppm2_6', prompt: 'Egyenlő szárú háromszög: K = 28 cm, alap 8 cm', value: 'szár = 10 cm' },
      { id: 'ppm2_7', prompt: 'Egyenlő szárú háromszög: K = 35 cm, szár 12 cm', value: 'alap = 11 cm' },
      { id: 'ppm2_8', prompt: 'Szabályos nyolcszög: a = 3,5 cm', value: 'K = 28 cm' }
    ]
  },
  3: {
    title: '3. Szint: Tizedes Értékek és Összetett Gyakorlati Feladatok',
    subtitle: 'Számítsd ki a szöveges és összetett sokszögek kerületi értékeit!',
    pairs: [
      { id: 'ppm3_1', prompt: 'Téglalap: a = 1,2 m, b = 80 cm', value: 'K = 4 m' },
      { id: 'ppm3_2', prompt: 'Négyzet alakú telek: K = 120 m', value: 'oldal = 30 m' },
      { id: 'ppm3_3', prompt: 'Téglalap kert kerítése: K = 54 m, a = 15 m', value: 'másik oldal = 12 m' },
      { id: 'ppm3_4', prompt: 'Szabályos tízszög: a = 4,2 cm', value: 'K = 42 cm' },
      { id: 'ppm3_5', prompt: 'Derékszögű háromszög oldalai: 3 cm, 4 cm, 5 cm', value: 'K = 12 cm' },
      { id: 'ppm3_6', prompt: 'Téglalap: a = 6 cm, a másik oldal a kétszerese (b = 12 cm)', value: 'K = 36 cm' },
      { id: 'ppm3_7', prompt: 'Négyzet oldala 4 cm-ről 8 cm-re duplázva', value: 'K = 32 cm' },
      { id: 'ppm3_8', prompt: 'Rombusz: K = 14 cm', value: 'a = 3,5 cm' }
    ]
  }
};

export const PolygonPerimeterMatcher: React.FC<PolygonPerimeterMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onBack,
  topicId = 'g6-polygon-perimeter-matcher',
  topicTitle = 'Sokszögek kerülete (Párosító)'
}) => {
  return (
    <MatcherTemplate
      level={level}
      currentLevel={currentLevel}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onBack={onBack}
      themeColor="blue"
      grade={6}
      chapterId="kerulet-terulet-felszin-terfogat"
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

export default PolygonPerimeterMatcher;
