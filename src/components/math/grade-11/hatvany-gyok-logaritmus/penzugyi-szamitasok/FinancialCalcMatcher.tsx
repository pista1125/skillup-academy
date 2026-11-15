import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FinancialCalcMatcherProps {
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

const pairs = (prefix: string, start: number, list: [string, string][]) =>
  list.map(([left, right], i) => ({ id: `${prefix}${start + i}`, left, right }));

const FINANCIAL_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Százalékos változás és szorzó',
    description: 'Párosítsd az évi változást a hozzá tartozó szorzóval!',
    pairs: pairs('finm', 1, [
      ['évi 6%-os kamat', '1,06'],
      ['évi 6,5%-os kamat', '1,065'],
      ['évi 18%-os gyarapodás', '1,18'],
      ['évi 7,5%-os kamat', '1,075'],
      ['évi 20%-os értékcsökkenés', '0,8'],
      ['évi 12%-os értékcsökkenés', '0,88'],
      ['évi 0,2%-os fogyás', '0,998'],
      ['heti 5%-os áremelés', '1,05']
    ])
  },
  {
    level: 2,
    title: '2. szint: Hatványok és gyökök értéke',
    description: 'Párosítsd a kifejezést a (kerekített) értékével!',
    pairs: pairs('finm', 9, [
      ['500 000 · 1,06¹⁰', '≈ 895 424 Ft'],
      ['¹⁰√2', '≈ 1,072'],
      ['1,06¹¹', '≈ 1,898'],
      ['1,06¹²', '≈ 2,012'],
      ['1,06⁵', '≈ 1,338'],
      ['¹⁰√1,5', '≈ 1,041'],
      ['¹⁰√3', '≈ 1,116'],
      ['0,8³', '0,512']
    ])
  },
  {
    level: 3,
    title: '3. szint: Feladat és eredmény',
    description: 'Párosítsd a tankönyvi feladatot az eredményével!',
    pairs: pairs('finm', 17, [
      ['600 000 Ft, 3 év, 6,5% – a növekmény', '≈ 124 770 Ft'],
      ['ugyanez 15% kamatadó után – kézhez', '≈ 706 054 Ft'],
      ['3,5 M Ft-os autó, −20%/év – veszteség 3 év alatt', '1 708 000 Ft'],
      ['2,5 M Ft-os autó, −12%/év – veszteség 3 év alatt', '796 320 Ft'],
      ['2 152 000 Ft → 900 000 Ft 5 év alatt – évi csökkenés', '16%'],
      ['5 év alatti duplázódáshoz szükséges évi gyarapodás', '≈ 14,87%'],
      ['18%-kal évente – háromszorozódás ideje', '7 év'],
      ['7,5%-kal évente – duplázódás ideje', '10 év']
    ])
  }
];

const FINANCIAL_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: FINANCIAL_MATCHER_LEVELS_LIST[0],
  2: FINANCIAL_MATCHER_LEVELS_LIST[1],
  3: FINANCIAL_MATCHER_LEVELS_LIST[2]
};

export const FinancialCalcMatcher: React.FC<FinancialCalcMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-exp-penzugyek-matcher',
  topicTitle = '6. Pénzügyi számítások – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="penzugyi-szamitasok"
      title={topicTitle}
      subtitle="Párosítsd a százalékos változásokat a szorzókkal, a kifejezéseket az értékükkel és a feladatokat az eredményükkel!"
      levels={FINANCIAL_MATCHER_LEVELS}
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

export default FinancialCalcMatcher;
