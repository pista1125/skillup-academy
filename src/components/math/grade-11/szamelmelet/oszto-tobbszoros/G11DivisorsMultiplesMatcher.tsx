import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface G11DivisorsMultiplesMatcherProps {
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

const G11_DIVISORS_MULTIPLES_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Fogalmak',
    description: 'Párosítsd a fogalmat a jelentésével!',
    pairs: [
      { id: 'dmm1', left: 'a | b', right: 'b osztható a-val' },
      { id: 'dmm2', left: 'Prímszám', right: 'Pontosan 2 pozitív osztója van' },
      { id: 'dmm3', left: 'Összetett szám', right: '2-nél több pozitív osztója van' },
      { id: 'dmm4', left: 'Az 1', right: 'Egyetlen pozitív osztója van' },
      { id: 'dmm5', left: 'Nem valódi osztók', right: 'Az 1 és maga a szám' },
      { id: 'dmm6', left: 'Osztópár', right: 'Két osztó, amelyek szorzata a szám' },
      { id: 'dmm7', left: 'Páratlan sok osztó', right: 'A szám négyzetszám' },
      { id: 'dmm8', left: 'Az egyetlen páros prím', right: '2' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Prímtényezős felbontás',
    description: 'Párosítsd a számot a prímtényezős alakjával!',
    pairs: [
      { id: 'dmm9', left: '630', right: '2 · 3² · 5 · 7' },
      { id: 'dmm10', left: '525', right: '3 · 5² · 7' },
      { id: 'dmm11', left: '700', right: '2² · 5² · 7' },
      { id: 'dmm12', left: '990', right: '2 · 3² · 5 · 11' },
      { id: 'dmm13', left: '873', right: '3² · 97' },
      { id: 'dmm14', left: '1221', right: '3 · 11 · 37' },
      { id: 'dmm15', left: '450', right: '2 · 3² · 5²' },
      { id: 'dmm16', left: '240', right: '2⁴ · 3 · 5' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Tankönyvi feladatok eredményei',
    description: 'Párosítsd a feladatot a helyes eredménnyel!',
    pairs: [
      { id: 'dmm17', left: '630/525 egyszerűsítve', right: '6/5' },
      { id: 'dmm18', left: '483/1827 egyszerűsítve', right: '23/87' },
      { id: 'dmm19', left: '680/1071 egyszerűsítve', right: '40/63' },
      { id: 'dmm20', left: '4851/594 egyszerűsítve', right: '49/6' },
      { id: 'dmm21', left: 'A 450 osztóinak száma', right: '18' },
      { id: 'dmm22', left: 'Az 1485 osztóinak száma', right: '16' },
      { id: 'dmm23', left: 'A 196 osztóinak száma', right: '9' },
      { id: 'dmm24', left: 'A 211 prímtesztjének határa', right: '√211 ≈ 14,5' }
    ]
  }
];

const G11_DIVISORS_MULTIPLES_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: G11_DIVISORS_MULTIPLES_MATCHER_LEVELS_LIST[0],
  2: G11_DIVISORS_MULTIPLES_MATCHER_LEVELS_LIST[1],
  3: G11_DIVISORS_MULTIPLES_MATCHER_LEVELS_LIST[2]
};

export const G11DivisorsMultiplesMatcher: React.FC<G11DivisorsMultiplesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-num-oszto-tobbszoros-matcher',
  topicTitle = '2. Osztó, többszörös – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="szamelmelet"
      topicId={topicId}
      subtopicId="oszto-tobbszoros"
      title={topicTitle}
      subtitle="Párosítsd a fogalmakat, a prímtényezős alakokat és a tankönyvi feladatok eredményeit!"
      levels={G11_DIVISORS_MULTIPLES_MATCHER_LEVELS}
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

export default G11DivisorsMultiplesMatcher;
