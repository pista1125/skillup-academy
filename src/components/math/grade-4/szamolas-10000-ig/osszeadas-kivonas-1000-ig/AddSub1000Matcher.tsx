import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface AddSub1000MatcherProps {
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

const ADDSUB_1000_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Azonos eredmény',
    description: 'Párosítsd azokat a műveleteket, amelyeknek ugyanannyi az eredménye!',
    pairs: [
      { id: 'as1m1', left: '32 + 48', right: '96 − 16' },
      { id: 'as1m2', left: '34 + 63', right: '100 − 3' },
      { id: 'as1m3', left: '81 − 35', right: '28 + 18' },
      { id: 'as1m4', left: '91 − 27', right: '30 + 34' },
      { id: 'as1m5', left: '19 + 16', right: '100 − 65' },
      { id: 'as1m6', left: '20 + 50', right: '23 + 47' },
      { id: 'as1m7', left: '38 + 28', right: '28 + 38' },
      { id: 'as1m8', left: '81 − 26', right: '100 − 45' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Fejben, kerek számokkal',
    description: 'Számold ki fejben, és párosítsd az eredménnyel!',
    pairs: [
      { id: 'as1m9', left: '250 + 170', right: '420' },
      { id: 'as1m10', left: '340 + 390', right: '730' },
      { id: 'as1m11', left: '450 − 170', right: '280' },
      { id: 'as1m12', left: '420 − 290', right: '130' },
      { id: 'as1m13', left: '610 + 230', right: '840' },
      { id: 'as1m14', left: '550 + 450', right: '1000' },
      { id: 'as1m15', left: '760 − 170', right: '590' },
      { id: 'as1m16', left: '1000 − 650', right: '350' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Írásbeli műveletek',
    description: 'Számold ki írásban, és keresd meg az eredményt! (A tábori plakát számai.)',
    pairs: [
      { id: 'as1m17', left: '448 + 263', right: '711' },
      { id: 'as1m18', left: '931 − 456', right: '475' },
      { id: 'as1m19', left: '934 − 456', right: '478' },
      { id: 'as1m20', left: '237 + 457', right: '694' },
      { id: 'as1m21', left: '873 − 254', right: '619' },
      { id: 'as1m22', left: '264 + 672', right: '936' },
      { id: 'as1m23', left: '645 − 297', right: '348' },
      { id: 'as1m24', left: '1000 − 657', right: '343' }
    ]
  }
];

const ADDSUB_1000_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: ADDSUB_1000_MATCHER_LEVELS_LIST[0],
  2: ADDSUB_1000_MATCHER_LEVELS_LIST[1],
  3: ADDSUB_1000_MATCHER_LEVELS_LIST[2]
};

export const AddSub1000Matcher: React.FC<AddSub1000MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-count-osszeadas-1000-matcher',
  topicTitle = '2. Összeadás és kivonás 1000-ig – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId={topicId}
      subtopicId="osszeadas-kivonas-1000-ig"
      title={topicTitle}
      subtitle="Párosítsd a műveleteket az eredményükkel!"
      levels={ADDSUB_1000_MATCHER_LEVELS}
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

export default AddSub1000Matcher;
