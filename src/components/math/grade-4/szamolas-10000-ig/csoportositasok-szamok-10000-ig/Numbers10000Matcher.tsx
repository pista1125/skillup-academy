import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Numbers10000MatcherProps {
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

const NUMBERS_10000_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Számjeggyel és betűvel',
    description: 'Párosítsd a számot a betűvel írt alakjával!',
    pairs: [
      { id: 'n10m1', left: '2001', right: 'kétezer-egy' },
      { id: 'n10m2', left: '5010', right: 'ötezer-tíz' },
      { id: 'n10m3', left: '7700', right: 'hétezer-hétszáz' },
      { id: 'n10m4', left: '1909', right: 'ezerkilencszázkilenc' },
      { id: 'n10m5', left: '8714', right: 'nyolcezer-hétszáztizennégy' },
      { id: 'n10m6', left: '2000', right: 'kétezer' },
      { id: 'n10m7', left: '10 000', right: 'tízezer' },
      { id: 'n10m8', left: '250', right: 'kétszázötven' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Helyi értékekből szám',
    description: 'Melyik szám áll ennyi ezresből (E), százasból (sz), tízesből (t) és egyesből (e)?',
    pairs: [
      { id: 'n10m9', left: '5 E + 4 sz + 7 t + 2 e', right: '5472' },
      { id: 'n10m10', left: '7 E + 4 t + 5 e', right: '7045' },
      { id: 'n10m11', left: '37 sz + 7 e', right: '3707' },
      { id: 'n10m12', left: '52 sz + 25 t + 18 e', right: '5468' },
      { id: 'n10m13', left: '4 E + 19 sz + 8 t', right: '5980' },
      { id: 'n10m14', left: '3 E + 4 sz + 5 t + 7 e', right: '3457' },
      { id: 'n10m15', left: '6 E + 3 t + 2 sz + 10 e', right: '6240' },
      { id: 'n10m16', left: '1 E + 58 t + 8 e', right: '1588' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Bontások és leltárak',
    description: 'Párosítsd a bontást vagy a leltárt a számmal!',
    pairs: [
      { id: 'n10m17', left: '1000 + 900 + 10 + 4', right: '1914' },
      { id: 'n10m18', left: '1000 + 500 + 30 + 2', right: '1532' },
      { id: 'n10m19', left: '5000 + 300 + 20 + 1', right: '5321' },
      { id: 'n10m20', left: '2000 + 100 + 50 + 3', right: '2153' },
      { id: 'n10m21', left: '9 E + 9 sz + 99 e', right: '9999' },
      { id: 'n10m22', left: 'Zafírok hármasával: 1 zsák, 0 doboz, 1 zacskó, 2 db', right: '32 zafír' },
      { id: 'n10m23', left: 'Zafírok hármasával: 2 zsák, 1 doboz, 2 zacskó, 0 db', right: '69 zafír' },
      { id: 'n10m24', left: 'Rubinok négyesével: 2 doboz, 1 zacskó, 3 db', right: '39 rubin' }
    ]
  }
];

const NUMBERS_10000_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: NUMBERS_10000_MATCHER_LEVELS_LIST[0],
  2: NUMBERS_10000_MATCHER_LEVELS_LIST[1],
  3: NUMBERS_10000_MATCHER_LEVELS_LIST[2]
};

export const Numbers10000Matcher: React.FC<Numbers10000MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-count-szamok-10000-matcher',
  topicTitle = '9. Csoportosítások, számok 10 000-ig – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId={topicId}
      subtopicId="csoportositasok-szamok-10000-ig"
      title={topicTitle}
      subtitle="Párosítsd a számokat a nevükkel, a helyi értékeikkel és a bontásukkal!"
      levels={NUMBERS_10000_MATCHER_LEVELS}
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

export default Numbers10000Matcher;
