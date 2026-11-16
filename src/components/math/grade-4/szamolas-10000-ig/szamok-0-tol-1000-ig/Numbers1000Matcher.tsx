import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Numbers1000MatcherProps {
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

const NUMBERS_1000_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Szám betűvel és számjeggyel',
    description: 'Párosítsd a betűvel írt számot a számjegyekkel írt alakjával!',
    pairs: [
      { id: 'n1m1', left: 'hatszáznegyvenegy', right: '641' },
      { id: 'n1m2', left: 'kétszázhuszonhat', right: '226' },
      { id: 'n1m3', left: 'négyszázhat', right: '406' },
      { id: 'n1m4', left: 'háromszázhatvannégy', right: '364' },
      { id: 'n1m5', left: 'hatvanöt', right: '65' },
      { id: 'n1m6', left: 'kilencszázhatvanhét', right: '967' },
      { id: 'n1m7', left: 'ötszázharminchat', right: '536' },
      { id: 'n1m8', left: 'hétszázötvenhat', right: '756' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Százasok, tízesek, egyesek',
    description: 'Párosítsd a felbontást a számmal!',
    pairs: [
      { id: 'n1m9', left: '6 sz + 4 t + 1 e', right: '641' },
      { id: 'n1m10', left: '9 sz + 4 t', right: '940' },
      { id: 'n1m11', left: '9 sz + 4 e', right: '904' },
      { id: 'n1m12', left: '7 t + 9 e', right: '79' },
      { id: 'n1m13', left: '4 sz + 5 t + 9 e', right: '459' },
      { id: 'n1m14', left: '8 sz + 5 t + 7 e', right: '857' },
      { id: 'n1m15', left: '24 t + 8 e', right: '248' },
      { id: 'n1m16', left: '3 sz + 13 t', right: '430' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Szomszédok és kerekítés',
    description: 'Párosítsd a feladatot a helyes eredménnyel!',
    pairs: [
      { id: 'n1m17', left: '372 tízesre kerekítve', right: '370' },
      { id: 'n1m18', left: '595 tízesre kerekítve', right: '600' },
      { id: 'n1m19', left: '950 százasra kerekítve', right: '1000' },
      { id: 'n1m20', left: '137 nagyobb tízes szomszédja', right: '140' },
      { id: 'n1m21', left: '925 kisebb százas szomszédja', right: '900' },
      { id: 'n1m22', left: '640 nagyobb egyes szomszédja', right: '641' },
      { id: 'n1m23', left: 'A legnagyobb szám, amely százasra kerekítve 300', right: '349' },
      { id: 'n1m24', left: 'A legkisebb szám, amely tízesre kerekítve 260', right: '255' }
    ]
  }
];

const NUMBERS_1000_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: NUMBERS_1000_MATCHER_LEVELS_LIST[0],
  2: NUMBERS_1000_MATCHER_LEVELS_LIST[1],
  3: NUMBERS_1000_MATCHER_LEVELS_LIST[2]
};

export const Numbers1000Matcher: React.FC<Numbers1000MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-count-szamok-1000-matcher',
  topicTitle = '1. Számok 0-tól 1000-ig – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId={topicId}
      subtopicId="szamok-0-tol-1000-ig"
      title={topicTitle}
      subtitle="Párosítsd a számokat a nevükkel, a felbontásukkal és a kerekített értékükkel!"
      levels={NUMBERS_1000_MATCHER_LEVELS}
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

export default Numbers1000Matcher;
