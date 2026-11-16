import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PyramidMatcherProps {
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

const MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Fogalmak',
    description: 'Párosítsd a fogalmat a jelentésével!',
    pairs: [
      { id: 'pyrm1', left: 'gúla', right: 'sokszög és annyi háromszög határolja, ahány oldalú a sokszög' },
      { id: 'pyrm2', left: 'testmagasság (M)', right: 'a csúcs távolsága az alapsíktól' },
      { id: 'pyrm3', left: 'oldalél', right: 'a csúcsot egy alapcsúccsal összekötő él' },
      { id: 'pyrm4', left: 'oldallap', right: 'a csúcsot tartalmazó háromszöglap' },
      { id: 'pyrm5', left: 'tetraéder', right: 'háromoldalú gúla (4 lap)' },
      { id: 'pyrm6', left: 'szabályos tetraéder', right: 'mind a 4 lapja szabályos háromszög' },
      { id: 'pyrm7', left: 'szabályos gúla', right: 'szabályos alaplap és egyenlő oldalélek' },
      { id: 'pyrm8', left: 'oldallap magassága (mₒ)', right: 'az oldallap háromszög alapélhez tartozó magassága' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Lapok, élek, csúcsok és sugarak',
    description: 'Párosítsd a gúlát vagy a sokszöget a megfelelő adattal!',
    pairs: [
      { id: 'pyrm9', left: 'hatoldalú gúla lapjai', right: '7' },
      { id: 'pyrm10', left: 'ötoldalú gúla élei', right: '10' },
      { id: 'pyrm11', left: 'nyolcoldalú gúla csúcsai', right: '9' },
      { id: 'pyrm12', left: 'tízoldalú gúla élei', right: '20' },
      { id: 'pyrm13', left: 'négyzet: ρ (beírt kör sugara)', right: 'a/2' },
      { id: 'pyrm14', left: 'négyzet: R (köré írt kör sugara)', right: 'a√2/2' },
      { id: 'pyrm15', left: 'szabályos hatszög: R', right: 'a' },
      { id: 'pyrm16', left: 'szabályos háromszög: R', right: 'a√3/3' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Számolás a szabályos gúlában',
    description: 'Párosítsd az adatokat a kiszámított eredménnyel!',
    pairs: [
      { id: 'pyrm17', left: 'négyoldalú: a = 6, M = 4 ⇒ mₒ', right: '5' },
      { id: 'pyrm18', left: 'négyoldalú: a = 10, mₒ = 13 ⇒ M', right: '12' },
      { id: 'pyrm19', left: 'négyoldalú: a = 8, b = 9 ⇒ M', right: '7' },
      { id: 'pyrm20', left: 'hatoldalú: a = 12, b = 13 ⇒ M', right: '5' },
      { id: 'pyrm21', left: 'négyoldalú: a = 8, M = 3 ⇒ β', right: '≈ 36,9°' },
      { id: 'pyrm22', left: 'szabályos tetraéder lapszöge', right: '≈ 70,5°' },
      { id: 'pyrm23', left: 'Kheopsz: oldalél–alaplap szög', right: '≈ 41,8°' },
      { id: 'pyrm24', left: 'Kheopsz: oldallap–alaplap szög', right: '≈ 51,6°' }
    ]
  }
];

const MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: MATCHER_LEVELS_LIST[0],
  2: MATCHER_LEVELS_LIST[1],
  3: MATCHER_LEVELS_LIST[2]
};

export const PyramidMatcher: React.FC<PyramidMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-ter-gula-matcher',
  topicTitle = '10. A gúla – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="a-gula"
      title={topicTitle}
      subtitle="Gyakorold a gúla részeit, a szabályos gúla derékszögű háromszögeit és a hajlásszögeket!"
      levels={MATCHER_LEVELS}
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

export default PyramidMatcher;
