import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Area4MatcherProps {
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

const AREA4_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Sorok és oszlopok',
    description: 'Párosítsd a téglalapot (egy sorban · sorok száma) a területével kis négyzetekben!',
    pairs: [
      { id: 'a4m1', left: 'terület', right: 'hány egység fedi le hézag nélkül' },
      { id: 'a4m2', left: '6 · 2-es téglalap', right: '12 kis négyzet' },
      { id: 'a4m3', left: '5 · 3-as téglalap', right: '15 kis négyzet' },
      { id: 'a4m4', left: '7 · 3-as téglalap', right: '21 kis négyzet' },
      { id: 'a4m5', left: '6 · 3-as téglalap', right: '18 kis négyzet' },
      { id: 'a4m6', left: '5 · 6-os téglalap', right: '30 kis négyzet' },
      { id: 'a4m7', left: '4 · 5-ös téglalap', right: '20 kis négyzet' },
      { id: 'a4m8', left: '6 · 4-es téglalap', right: '24 kis négyzet' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Más-más egység',
    description: 'Párosítsd a lefedést a szükséges darabszámmal!',
    pairs: [
      { id: 'a4m9', left: '1 kis négyzet', right: '2 fél négyzetnyi háromszög' },
      { id: 'a4m10', left: '1 dominó', right: '2 kis négyzet' },
      { id: 'a4m11', left: '1 nagy (2 · 2-es) négyzet', right: '4 kis négyzet' },
      { id: 'a4m12', left: '12 kis négyzet háromszögekkel', right: '24 háromszög' },
      { id: 'a4m13', left: '12 kis négyzet dominókkal', right: '6 dominó' },
      { id: 'a4m14', left: '16 kis négyzet nagy négyzetekkel', right: '4 nagy négyzet' },
      { id: 'a4m15', left: '56 kis négyzetnyi fal, 2 négyzetnyi csempe', right: '28 csempe' },
      { id: 'a4m16', left: '48 kis négyzetnyi fal, 2 · 2-es csempe', right: '12 csempe' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Szöveges feladatok',
    description: 'Párosítsd a feladatot a helyes eredménnyel!',
    pairs: [
      { id: 'a4m17', left: 'röplabdapálya 18 m × 9 m (1 m-es négyzetekkel)', right: '162 egység' },
      { id: 'a4m18', left: 'strandröplabdapálya 16 m × 8 m', right: '128 egység' },
      { id: 'a4m19', left: 'a két pálya területének különbsége', right: '34 egység' },
      { id: 'a4m20', left: '24 kis négyzet, egy sorban 6 – hány sor?', right: '4 sor' },
      { id: 'a4m21', left: '36 kis négyzetből álló négyzet oldala', right: '6 kis négyzet' },
      { id: 'a4m22', left: '10 · 8-as kert, benne 3 · 2-es fészer – a füves rész', right: '74 egység' },
      { id: 'a4m23', left: '6 · 5 nagy folt, mindegyik 4 kis négyzet', right: '120 kis négyzet' },
      { id: 'a4m24', left: '8 · 6-os téglalapba rajzolt háromszög (csúcs a felső oldal közepén)', right: '24 négyzetnyi' }
    ]
  }
];

const AREA4_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: AREA4_MATCHER_LEVELS_LIST[0],
  2: AREA4_MATCHER_LEVELS_LIST[1],
  3: AREA4_MATCHER_LEVELS_LIST[2]
};

export const Area4Matcher: React.FC<Area4MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-meas-terulet-matcher',
  topicTitle = '3. A terület mérése – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="a-terulet-merese"
      title={topicTitle}
      subtitle="Párosítsd a téglalapokat, az egységeket és a feladatokat a területtel!"
      levels={AREA4_MATCHER_LEVELS}
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

export default Area4Matcher;
