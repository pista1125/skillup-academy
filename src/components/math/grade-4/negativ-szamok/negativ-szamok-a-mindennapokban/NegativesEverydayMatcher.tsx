import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface NegativesEverydayMatcherProps {
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

const NEG_EVERYDAY_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Írd le számmal!',
    description: 'Párosítsd a helyzetet a számmal, amellyel leírjuk!',
    pairs: [
      { id: 'ne1m1', left: '6 fokkal fagypont alatt', right: '−6 °C' },
      { id: 'ne1m2', left: '6 fokkal fagypont felett', right: '6 °C' },
      { id: 'ne1m3', left: 'pont fagypont', right: '0 °C' },
      { id: 'ne1m4', left: 'a tengerszint', right: '0 m' },
      { id: 'ne1m5', left: '50 m-rel a tengerszint alatt', right: '−50 m' },
      { id: 'ne1m6', left: '400 m-rel a tengerszint felett', right: '400 m' },
      { id: 'ne1m7', left: 'a mélygarázs 2. szintje', right: '−2. szint' },
      { id: 'ne1m8', left: '200 Ft adósság', right: '−200 Ft' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mihez illik ez a hőmérséklet?',
    description: 'Melyik helyzethez melyik hőmérséklet illik?',
    pairs: [
      { id: 'ne1m9', left: 'szánkózás a dombon', right: '−8 °C' },
      { id: 'ne1m10', left: 'napozás a strandon', right: '27 °C' },
      { id: 'ne1m11', left: 'a víz forráspontja', right: '100 °C' },
      { id: 'ne1m12', left: 'olvad a jég', right: '0 °C' },
      { id: 'ne1m13', left: 'a tanterem levegője', right: '20 °C' },
      { id: 'ne1m14', left: 'az iskolaudvar ősszel', right: '5 °C' },
      { id: 'ne1m15', left: 'a mélyhűtő belseje', right: '−18 °C' },
      { id: 'ne1m16', left: 'téli nap Grönlandon', right: '−40 °C' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hogyan változott?',
    description: 'Lépj a hőmérőn felfelé vagy lefelé, és keresd meg, mennyi lett!',
    pairs: [
      { id: 'ne1m17', left: '3 °C, 3 fokkal hidegebb lett', right: '0 °C' },
      { id: 'ne1m18', left: '5 °C, 2 fokkal melegebb lett', right: '7 °C' },
      { id: 'ne1m19', left: '−1 °C, 4 fokot csökkent', right: '−5 °C' },
      { id: 'ne1m20', left: '−10 °C, 2 fokot emelkedett', right: '−8 °C' },
      { id: 'ne1m21', left: '0 °C, 2 fokot hűlt', right: '−2 °C' },
      { id: 'ne1m22', left: '−17 °C, 10 fokot emelkedett', right: '−7 °C' },
      { id: 'ne1m23', left: '−3 °C, nem változott', right: '−3 °C' },
      { id: 'ne1m24', left: '2 °C, 6 fokot hűlt', right: '−4 °C' }
    ]
  }
];

const NEG_EVERYDAY_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: NEG_EVERYDAY_MATCHER_LEVELS_LIST[0],
  2: NEG_EVERYDAY_MATCHER_LEVELS_LIST[1],
  3: NEG_EVERYDAY_MATCHER_LEVELS_LIST[2]
};

export const NegativesEverydayMatcher: React.FC<NegativesEverydayMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-neg-mindennapok-matcher',
  topicTitle = '1. A negatív számok a mindennapokban – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="negativ-szamok"
      topicId={topicId}
      subtopicId="negativ-szamok-a-mindennapokban"
      title={topicTitle}
      subtitle="Párosítsd a helyzeteket a hőmérsékletekkel, magasságokkal és szintekkel!"
      levels={NEG_EVERYDAY_MATCHER_LEVELS}
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

export default NegativesEverydayMatcher;
