import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface NumeralSystems2MatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const NUMERAL_SYSTEMS_2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Számjegyek és csoportok',
    description: 'Párosítsd a 16-os számjegyet, illetve a bitcsoportot az értékével!',
    pairs: [
      { id: 'ns2m1', left: 'A₁₆', right: '10' },
      { id: 'ns2m2', left: 'F₁₆', right: '15' },
      { id: 'ns2m3', left: 'C₁₆', right: '12' },
      { id: 'ns2m4', left: '10₁₆', right: '16' },
      { id: 'ns2m5', left: '11₂ (egy négyes jegy)', right: '3₄' },
      { id: 'ns2m6', left: '101₂ (egy nyolcas jegy)', right: '5₈' },
      { id: 'ns2m7', left: '1101₂ (egy 16-os jegy)', right: 'D₁₆' },
      { id: 'ns2m8', left: '1110₂ (egy 16-os jegy)', right: 'E₁₆' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Átváltások',
    description: 'Párosítsd a tízes számrendszerbeli számot a másik alakjával!',
    pairs: [
      { id: 'ns2m9', left: '315', right: '1243₆' },
      { id: 'ns2m10', left: '491', right: '111101011₂' },
      { id: 'ns2m11', left: '542', right: '1036₈' },
      { id: 'ns2m12', left: '420', right: '2B0₁₂' },
      { id: 'ns2m13', left: '768', right: '30000₄' },
      { id: 'ns2m14', left: '751', right: '1011101111₂' },
      { id: 'ns2m15', left: '255', right: 'FF₁₆' },
      { id: 'ns2m16', left: '1582', right: 'ABA₁₂' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Tankönyvi feladatok',
    description: 'Párosítsd a feladatot a helyes eredménnyel!',
    pairs: [
      { id: 'ns2m17', left: '110000111₂ négyes számrendszerben', right: '12013₄' },
      { id: 'ns2m18', left: '7AD₁₆ kettes számrendszerben', right: '11110101101₂' },
      { id: 'ns2m19', left: '1101100₂ + 101010₂', right: '10010110₂' },
      { id: 'ns2m20', left: '„A 145 kiskutya” alapszáma', right: '8' },
      { id: 'ns2m21', left: '12ₓ + 112ₓ + 1112ₓ = 1241ₓ alapszáma', right: '5' },
      { id: 'ns2m22', left: 'Legkisebb 5-nél nagyobb szám, amely 7-es, 8-as, 9-es rendszerben is 5-re végződik', right: '509' },
      { id: 'ns2m23', left: 'Háromjegyű számok a 16-os rendszerben', right: '3840' },
      { id: 'ns2m24', left: 'Különböző jegyű ötjegyű számok az ötös rendszerben', right: '96' }
    ]
  }
];

const NUMERAL_SYSTEMS_2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: NUMERAL_SYSTEMS_2_MATCHER_LEVELS_LIST[0],
  2: NUMERAL_SYSTEMS_2_MATCHER_LEVELS_LIST[1],
  3: NUMERAL_SYSTEMS_2_MATCHER_LEVELS_LIST[2]
};

export const NumeralSystems2Matcher: React.FC<NumeralSystems2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-num-szamrendszer-masodik-matcher',
  topicTitle = '8. Számrendszerek II. – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="szamelmelet"
      topicId={topicId}
      subtopicId="szamrendszerek-2"
      title={topicTitle}
      subtitle="Párosítsd a számjegyeket, a bitcsoportokat, az átváltásokat és a tankönyvi feladatok eredményeit!"
      levels={NUMERAL_SYSTEMS_2_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default NumeralSystems2Matcher;
