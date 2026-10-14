import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ProportionalDivisionMatcherProps {
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
    title: '1. Szint: Pénz és Mennyiségek Elosztása Két Részre',
    subtitle: 'Párosítsd az elosztandó összeget és arányt a helyes részösszegekkel!',
    pairs: [
      {
        id: 'pdm1_1',
        prompt: '1000 Ft szétosztva 2 : 3 arányban',
        value: '400 Ft és 600 Ft'
      },
      {
        id: 'pdm1_2',
        prompt: '1200 Ft szétosztva 1 : 2 arányban',
        value: '400 Ft és 800 Ft'
      },
      {
        id: 'pdm1_3',
        prompt: '2000 Ft szétosztva 1 : 4 arányban',
        value: '400 Ft és 1600 Ft'
      },
      {
        id: 'pdm1_4',
        prompt: '1500 Ft szétosztva 2 : 1 arányban',
        value: '1000 Ft és 500 Ft'
      },
      {
        id: 'pdm1_5',
        prompt: '2400 Ft szétosztva 3 : 5 arányban',
        value: '900 Ft és 1500 Ft'
      },
      {
        id: 'pdm1_6',
        prompt: '1800 Ft szétosztva 4 : 5 arányban',
        value: '800 Ft és 1000 Ft'
      },
      {
        id: 'pdm1_7',
        prompt: '3000 Ft szétosztva 1 : 5 arányban',
        value: '500 Ft és 2500 Ft'
      },
      {
        id: 'pdm1_8',
        prompt: '1600 Ft szétosztva 3 : 1 arányban',
        value: '1200 Ft és 400 Ft'
      }
    ]
  },
  2: {
    title: '2. Szint: Szögek és Geometriai Szakaszok',
    subtitle: 'Határozd meg a szakaszok hosszát vagy a szögek nagyságát adott arányok mellett!',
    pairs: [
      {
        id: 'pdm2_1',
        prompt: '180° kiegészítő szögek 1 : 2 arányban',
        value: '60° és 120°'
      },
      {
        id: 'pdm2_2',
        prompt: '90° pótszögek 1 : 2 arányban',
        value: '30° és 60°'
      },
      {
        id: 'pdm2_3',
        prompt: '90° pótszögek 2 : 3 arányban',
        value: '36° és 54°'
      },
      {
        id: 'pdm2_4',
        prompt: '180° háromszög szögei 2 : 3 : 4 arányban',
        value: '40°, 60° és 80°'
      },
      {
        id: 'pdm2_5',
        prompt: '180° háromszög szögei 1 : 1 : 2 arányban',
        value: '45°, 45° és 90°'
      },
      {
        id: 'pdm2_6',
        prompt: '50 cm-es szakasz 2 : 3 arányban',
        value: '20 cm és 30 cm'
      },
      {
        id: 'pdm2_7',
        prompt: '60 cm-es szakasz 1 : 3 arányban',
        value: '15 cm és 45 cm'
      },
      {
        id: 'pdm2_8',
        prompt: '70 cm-es szakasz 3 : 4 arányban',
        value: '30 cm és 40 cm'
      }
    ]
  },
  3: {
    title: '3. Szint: Keverékek, Receptek és Többtagú Arányok',
    subtitle: 'Oldj meg mindennapi arányos osztási feladatokat!',
    pairs: [
      {
        id: 'pdm3_1',
        prompt: '700 g süti 4 : 2 : 1 (liszt : cukor : vaj)',
        value: '400 g, 200 g és 100 g'
      },
      {
        id: 'pdm3_2',
        prompt: '8 liter ital 1 : 7 (szörp : víz)',
        value: '1 liter és 7 liter'
      },
      {
        id: 'pdm3_3',
        prompt: '10 kg bronz 7 : 3 (réz : ón)',
        value: '7 kg és 3 kg'
      },
      {
        id: 'pdm3_4',
        prompt: '140 db cukorka 3 : 4 arányban',
        value: '60 db és 80 db'
      },
      {
        id: 'pdm3_5',
        prompt: '48 fős csoport 5 : 7 (fiú : lány)',
        value: '20 fiú és 28 lány'
      },
      {
        id: 'pdm3_6',
        prompt: '900 kg beton 1 : 2 : 3 (cement : homok : sóder)',
        value: '150 kg, 300 kg és 450 kg'
      },
      {
        id: 'pdm3_7',
        prompt: '100 cm kerületű téglalap, a : b = 2 : 3',
        value: '20 cm és 30 cm'
      },
      {
        id: 'pdm3_8',
        prompt: '80 füzet elosztása 1 : 3 : 4 arányban',
        value: '10 db, 30 db és 40 db'
      }
    ]
  }
};

export const ProportionalDivisionMatcher: React.FC<ProportionalDivisionMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onBack,
  topicId = 'g6-ratio-division-matcher',
  topicTitle = 'Arányos osztás (Párosító)'
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
      themeColor="amber"
      grade={6}
      chapterId="arany-szazalek-szoveges-feladatok"
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};
export default ProportionalDivisionMatcher;
