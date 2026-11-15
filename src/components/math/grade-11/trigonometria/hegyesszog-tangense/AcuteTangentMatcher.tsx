import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface AcuteTangentMatcherProps {
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

const ACUTE_TANGENT_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Fogalmak és alapértékek',
    description: 'Párosítsd a fogalmakat a pontos jelentésükkel, illetve a szögeket a közelítő tangensértékükkel!',
    pairs: [
      { id: 'atm1', left: 'tg α', right: 'α-val szemközti befogó : α melletti befogó' },
      { id: 'atm2', left: 'tg 45°', right: '1 (egyenlő szárú derékszögű háromszög)' },
      { id: 'atm3', left: 'tg 5°', right: '≈ 0,09' },
      { id: 'atm4', left: 'tg 15°', right: '≈ 0,27' },
      { id: 'atm5', left: 'tg 25°', right: '≈ 0,47' },
      { id: 'atm6', left: 'tg 35°', right: '≈ 0,70' },
      { id: 'atm7', left: 'tg 38°', right: '≈ 0,78' },
      { id: 'atm8', left: 'Miért csak a szögtől függ a tangens?', right: 'Az azonos hegyesszögű derékszögű háromszögek hasonlók' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Befogók aránya',
    description: 'Párosítsd a derékszögű háromszög befogóit (a: α-val szemközti, b: α melletti) a tg α értékével!',
    pairs: [
      { id: 'atm9', left: 'a = 3 cm, b = 4 cm', right: 'tg α = 0,75' },
      { id: 'atm10', left: 'a = 4 cm, b = 3 cm', right: 'tg α ≈ 1,33' },
      { id: 'atm11', left: 'a = 7,8 cm, b = 10 cm', right: 'tg α = 0,78 (α ≈ 38°)' },
      { id: 'atm12', left: 'a = 23,5 cm, b = 50 cm', right: 'tg α = 0,47 (α ≈ 25°)' },
      { id: 'atm13', left: 'a = 6 cm, b = 6 cm', right: 'tg α = 1 (α = 45°)' },
      { id: 'atm14', left: 'a = 12 m, b = 100 m', right: 'tg α = 0,12 (12%-os emelkedő)' },
      { id: 'atm15', left: 'a = 1, b = 2', right: 'tg α = 0,5' },
      { id: 'atm16', left: 'a = 5 cm, b = 2 cm', right: 'tg α = 2,5' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hiányzó oldalak kiszámítása',
    description: 'Párosítsd a feladatot a helyes eredménnyel!',
    pairs: [
      { id: 'atm17', left: 'Víztorony: 30 m távolság, tg 38° ≈ 0,78', right: 'h ≈ 23,4 m' },
      { id: 'atm18', left: 'Szemközti befogó 12 cm, tg α = 0,75 ⇒ melletti befogó', right: '16 cm' },
      { id: 'atm19', left: 'Befogók 12 cm és 16 cm ⇒ átfogó', right: '20 cm' },
      { id: 'atm20', left: 'Befogók 12 és 16, átfogó 20 ⇒ átfogóhoz tartozó magasság', right: '9,6 cm' },
      { id: 'atm21', left: 'Melletti befogó 1,6 cm, tg α = 0,55 ⇒ szemközti befogó', right: '0,88 cm' },
      { id: 'atm22', left: 'Téglalap hosszabb oldala 35 cm, átlóval 35°-ot zár be ⇒ rövidebb oldal', right: '≈ 24,5 cm' },
      { id: 'atm23', left: 'Melletti befogó 5 cm, tg 35° ≈ 0,70 ⇒ szemközti befogó', right: '≈ 3,5 cm' },
      { id: 'atm24', left: 'Szemközti befogó 5 cm, tg 35° ≈ 0,70 ⇒ melletti befogó', right: '≈ 7,1 cm' }
    ]
  }
];

const ACUTE_TANGENT_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: ACUTE_TANGENT_MATCHER_LEVELS_LIST[0],
  2: ACUTE_TANGENT_MATCHER_LEVELS_LIST[1],
  3: ACUTE_TANGENT_MATCHER_LEVELS_LIST[2]
};

export const AcuteTangentMatcher: React.FC<AcuteTangentMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-trig-tangens-fogalma-matcher',
  topicTitle = '1. Hegyesszög tangense – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="trigonometria"
      topicId={topicId}
      subtopicId="hegyesszog-tangense"
      title={topicTitle}
      subtitle="Gyakorold a tangens fogalmát, a tankönyvi tangensértékeket és a hiányzó befogók kiszámítását!"
      levels={ACUTE_TANGENT_MATCHER_LEVELS}
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

export default AcuteTangentMatcher;
