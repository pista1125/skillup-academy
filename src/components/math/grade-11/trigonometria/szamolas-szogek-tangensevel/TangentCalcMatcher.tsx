import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TangentCalcMatcherProps {
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

const TANGENT_CALC_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Számológép-funkciók és átváltások',
    description: 'Párosítsd a számológép gombjait, módjait és a szögperc-átváltásokat a jelentésükkel!',
    pairs: [
      { id: 'tcm1', left: 'D / DEG', right: 'Fokban számol (degree = fok)' },
      { id: 'tcm2', left: 'R / RAD', right: 'Radiánban számol' },
      { id: 'tcm3', left: 'G / GRAD', right: 'Gradiánban (gonban) számol' },
      { id: 'tcm4', left: 'tan gomb', right: 'Szög → a szög tangense' },
      { id: 'tcm5', left: '2ndf tan (SHIFT tan)', right: 'Tangens → a hozzá tartozó hegyesszög' },
      { id: 'tcm6', left: '14° 24′', right: '14,4°' },
      { id: 'tcm7', left: '7,8°', right: '7° 48′' },
      { id: 'tcm8', left: '11,55°', right: '11° 33′' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Szögek és tangensek',
    description: 'Párosítsd a szöget a tangensével, illetve a tangenst a szöggel (D mód)!',
    pairs: [
      { id: 'tcm9', left: 'tg 64°', right: '≈ 2,0503' },
      { id: 'tcm10', left: 'tg 14,4°', right: '≈ 0,2568' },
      { id: 'tcm11', left: 'tg 78,3°', right: '≈ 4,8288' },
      { id: 'tcm12', left: 'tg 89,9°', right: '≈ 572,96' },
      { id: 'tcm13', left: 'tg α = 0,2308', right: 'α ≈ 13°' },
      { id: 'tcm14', left: 'tg α = 5', right: 'α ≈ 78,69°' },
      { id: 'tcm15', left: 'tg α = 0,28', right: 'α ≈ 15,64°' },
      { id: 'tcm16', left: 'tg α = 1', right: 'α = 45°' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Gyakorlati alkalmazások',
    description: 'Párosítsd a feladatot a helyes eredménnyel!',
    pairs: [
      { id: 'tcm17', left: 'Torony 30 m-ről, 36°…38°', right: '≈ 21,8 m … 23,4 m' },
      { id: 'tcm18', left: 'Torony 30 m-ről, 36,5°…37,5°', right: '≈ 22,2 m … 23,0 m' },
      { id: 'tcm19', left: '15°-os lejtő meredeksége', right: '≈ 26,8%' },
      { id: 'tcm20', left: '9%-os lejtő szöge', right: '≈ 5°' },
      { id: 'tcm21', left: '100%-os meredekség', right: '45°' },
      { id: 'tcm22', left: 'Kert: 25 m-es oldal, átló szöge 39,5°…40,5°', right: '≈ 515 m² … 534 m²' },
      { id: 'tcm23', left: 'Hegycsúcs 1 km-re, 26°…28°', right: '≈ 488 m … 532 m' },
      { id: 'tcm24', left: '250 m úton 23 m szintcsökkenés', right: '≈ 9,2% és ≈ 5,3°' }
    ]
  }
];

const TANGENT_CALC_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: TANGENT_CALC_MATCHER_LEVELS_LIST[0],
  2: TANGENT_CALC_MATCHER_LEVELS_LIST[1],
  3: TANGENT_CALC_MATCHER_LEVELS_LIST[2]
};

export const TangentCalcMatcher: React.FC<TangentCalcMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-trig-tangens-szamolas-matcher',
  topicTitle = '2. Számolás szögek tangensével – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="trigonometria"
      topicId={topicId}
      subtopicId="szamolas-szogek-tangensevel"
      title={topicTitle}
      subtitle="Gyakorold a számológép tan és tan⁻¹ funkcióját, a szögperc-átváltást és a gyakorlati alkalmazásokat!"
      levels={TANGENT_CALC_MATCHER_LEVELS}
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

export default TangentCalcMatcher;
