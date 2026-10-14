import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface DirectProportionMatcherProps {
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
    title: '1. Szint: Egységárak és Alapvető Arányos Értékek',
    subtitle: 'Párosítsd a feladványokat a helyes arányos eredménnyel!',
    pairs: [
      {
        id: 'dpm1_1',
        prompt: '1 kg alma 300 Ft -> 4 kg alma',
        value: '1200 Ft'
      },
      {
        id: 'dpm1_2',
        prompt: '1 füzet 180 Ft -> 5 füzet',
        value: '900 Ft'
      },
      {
        id: 'dpm1_3',
        prompt: '2 óra alatt 120 km -> 1 óra alatt',
        value: '60 km'
      },
      {
        id: 'dpm1_4',
        prompt: '3 db kifli 210 Ft -> 1 db kifli',
        value: '70 Ft'
      },
      {
        id: 'dpm1_5',
        prompt: '1 m léc 800 Ft -> 3 m léc',
        value: '2400 Ft'
      },
      {
        id: 'dpm1_6',
        prompt: '4 gombóc fagyi 1600 Ft -> 1 gombóc',
        value: '400 Ft'
      },
      {
        id: 'dpm1_7',
        prompt: '1 óra alatt 80 km -> 4 óra alatt',
        value: '320 km'
      },
      {
        id: 'dpm1_8',
        prompt: '2 liter tej 700 Ft -> 6 liter tej',
        value: '2100 Ft'
      }
    ]
  },
  2: {
    title: '2. Szint: Következtetés Egységre Visszavezetéssel',
    subtitle: 'Vezesd vissza az értéket 1 egységre, majd számítsd ki a keresett mennyiséget!',
    pairs: [
      {
        id: 'dpm2_1',
        prompt: '3 kg narancs 1500 Ft -> 5 kg narancs',
        value: '2500 Ft'
      },
      {
        id: 'dpm2_2',
        prompt: '4 csoki 1200 Ft -> 6 csoki',
        value: '1800 Ft'
      },
      {
        id: 'dpm2_3',
        prompt: '2 óra alatt 160 km -> 3 óra alatt',
        value: '240 km'
      },
      {
        id: 'dpm2_4',
        prompt: '5 doboz tej 2000 Ft -> 3 doboz tej',
        value: '1200 Ft'
      },
      {
        id: 'dpm2_5',
        prompt: '3 füzet 750 Ft -> 8 füzet',
        value: '2000 Ft'
      },
      {
        id: 'dpm2_6',
        prompt: '6 kg burgonya 1800 Ft -> 4 kg burgonya',
        value: '1200 Ft'
      },
      {
        id: 'dpm2_7',
        prompt: '2 liter szörp 3000 Ft -> 5 liter szörp',
        value: '7500 Ft'
      },
      {
        id: 'dpm2_8',
        prompt: '4 óra alatt 280 km -> 5 óra alatt',
        value: '350 km'
      }
    ]
  },
  3: {
    title: '3. Szint: Tört, Tizedes Mennyiségek és Arányossági Tényező',
    subtitle: 'Határozd meg az arányossági tényezőt és a törtmennyiségek értékeit!',
    pairs: [
      {
        id: 'dpm3_1',
        prompt: '1,5 kg banán 900 Ft -> 3 kg banán',
        value: '1800 Ft'
      },
      {
        id: 'dpm3_2',
        prompt: '0,5 kg sajt 1400 Ft -> 2 kg sajt',
        value: '5600 Ft'
      },
      {
        id: 'dpm3_3',
        prompt: '2,5 óra alatt 200 km -> 1 óra alatt',
        value: '80 km'
      },
      {
        id: 'dpm3_4',
        prompt: '40 perc alatt 10 km -> 2 óra alatt',
        value: '30 km'
      },
      {
        id: 'dpm3_5',
        prompt: 'Arányossági tényező: 600 Ft / 2 kg',
        value: 'k = 300 Ft/kg'
      },
      {
        id: 'dpm3_6',
        prompt: 'Arányossági tényező: 450 km / 5 óra',
        value: 'k = 90 km/h'
      },
      {
        id: 'dpm3_7',
        prompt: '250 g kávé 1500 Ft -> 1 kg kávé',
        value: '6000 Ft'
      },
      {
        id: 'dpm3_8',
        prompt: '3,2 m szalag 1600 Ft -> 1 m szalag',
        value: '500 Ft'
      }
    ]
  }
};

export const DirectProportionMatcher: React.FC<DirectProportionMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onBack,
  topicId = 'g6-direct-prop-matcher',
  topicTitle = 'Egyenes arányosság (Párosító)'
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

export default DirectProportionMatcher;
