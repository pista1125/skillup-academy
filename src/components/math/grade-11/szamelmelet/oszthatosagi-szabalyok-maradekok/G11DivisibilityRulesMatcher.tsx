import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface G11DivisibilityRulesMatcherProps {
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

const G11_DIVISIBILITY_RULES_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Oszthatósági szabályok',
    description: 'Párosítsd az osztót a hozzá tartozó szabállyal!',
    pairs: [
      { id: 'drm1', left: 'Oszthatóság 2-vel', right: 'Az utolsó jegy páros' },
      { id: 'drm2', left: 'Oszthatóság 4-gyel', right: 'Az utolsó két jegyből álló szám osztható 4-gyel' },
      { id: 'drm3', left: 'Oszthatóság 8-cal', right: 'Az utolsó három jegyből álló szám osztható 8-cal' },
      { id: 'drm4', left: 'Oszthatóság 5-tel', right: 'Az utolsó jegy 0 vagy 5' },
      { id: 'drm5', left: 'Oszthatóság 25-tel', right: 'A szám vége 00, 25, 50 vagy 75' },
      { id: 'drm6', left: 'Oszthatóság 125-tel', right: 'Az utolsó három jegyből álló szám osztható 125-tel' },
      { id: 'drm7', left: 'Oszthatóság 3-mal', right: 'A számjegyek összege osztható 3-mal' },
      { id: 'drm8', left: 'Oszthatóság 9-cel', right: 'A számjegyek összege osztható 9-cel' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Maradékos osztás',
    description: 'Párosítsd az osztást a b = a · k + r alakjával!',
    pairs: [
      { id: 'drm9', left: '1200 osztva 350-nel', right: '1200 = 3 · 350 + 150' },
      { id: 'drm10', left: '100 osztva 7-tel', right: '100 = 14 · 7 + 2' },
      { id: 'drm11', left: '89 osztva 3-mal', right: '89 = 29 · 3 + 2' },
      { id: 'drm12', left: '117 osztva 40-nel', right: '117 = 2 · 40 + 37' },
      { id: 'drm13', left: '35 osztva 8-cal', right: '35 = 4 · 8 + 3' },
      { id: 'drm14', left: '37 osztva 6-tal', right: '37 = 6 · 6 + 1' },
      { id: 'drm15', left: '91 osztva 7-tel', right: '91 = 13 · 7 + 0' },
      { id: 'drm16', left: '247 osztva 11-gyel', right: '247 = 22 · 11 + 5' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Tankönyvi feladatok',
    description: 'Párosítsd a feladatot a helyes eredménnyel!',
    pairs: [
      { id: 'drm17', left: '11 385 részvény egyenlő szétosztása (2, 9 vagy 25 tag)', right: 'Csak 9 tag között' },
      { id: 'drm18', left: '2, 5, 7, 8 jegyekből: 2-vel osztható négyjegyűek', right: '12 darab' },
      { id: 'drm19', left: '2, 5, 7, 8 jegyekből: 4-gyel osztható négyjegyűek', right: '6 darab' },
      { id: 'drm20', left: '2, 5, 7, 8 jegyekből: 25-tel osztható négyjegyűek', right: '4 darab' },
      { id: 'drm21', left: '5Y283 osztható 9-cel', right: 'Y = 0 vagy 9' },
      { id: 'drm22', left: 'Ma kedd van; 100 nap múlva', right: 'Csütörtök' },
      { id: 'drm23', left: 'Szökőév, január 1. szombat; április 1.', right: 'Szombat' },
      { id: 'drm24', left: 'Gólyák és Végzősök: a csoportvezető csoportja', right: '14 fős csoport' }
    ]
  }
];

const G11_DIVISIBILITY_RULES_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: G11_DIVISIBILITY_RULES_MATCHER_LEVELS_LIST[0],
  2: G11_DIVISIBILITY_RULES_MATCHER_LEVELS_LIST[1],
  3: G11_DIVISIBILITY_RULES_MATCHER_LEVELS_LIST[2]
};

export const G11DivisibilityRulesMatcher: React.FC<G11DivisibilityRulesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-num-oszthatosagi-szabalyok-matcher',
  topicTitle = '4. Oszthatósági szabályok, osztási maradékok – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="szamelmelet"
      topicId={topicId}
      subtopicId="oszthatosagi-szabalyok-maradekok"
      title={topicTitle}
      subtitle="Párosítsd az oszthatósági szabályokat, a maradékos osztásokat és a tankönyvi feladatok eredményeit!"
      levels={G11_DIVISIBILITY_RULES_MATCHER_LEVELS}
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

export default G11DivisibilityRulesMatcher;
