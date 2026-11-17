import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortPlace, SortTag } from './ThreeDigitSubG3CardFigures';

interface ThreeDigitSubG3SorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi marad?',
    description: 'Vond ki a kerek százast, és tedd a jó dobozba! A képen fent a szám, lent az, amit elveszel.',
    categories: [
      { id: 'k100', name: 'Kevesebb, mint 100', color: 'sky' },
      { id: 'k12', name: '100 és 200 között', color: 'amber' },
      { id: 'k200', name: 'Több, mint 200', color: 'emerald' }
    ],
    items: [
      { id: 'tdss1', text: '', figure: <SortPlace a={360} b={300} />, categoryId: 'k100' },
      { id: 'tdss2', text: '', figure: <SortPlace a={190} b={100} />, categoryId: 'k100' },
      { id: 'tdss3', text: '385 − 300', categoryId: 'k100' },
      { id: 'tdss4', text: '', figure: <SortPlace a={240} b={100} />, categoryId: 'k12' },
      { id: 'tdss5', text: '', figure: <SortPlace a={410} b={300} />, categoryId: 'k12' },
      { id: 'tdss6', text: '298 − 100', categoryId: 'k12' },
      { id: 'tdss7', text: '', figure: <SortPlace a={450} b={200} />, categoryId: 'k200' },
      { id: 'tdss8', text: '475 − 200', categoryId: 'k200' },
      { id: 'tdss9', text: '330 − 100', categoryId: 'k200' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kell felváltani?',
    description: 'Van elég tízes, vagy fel kell váltani 1 százast?',
    categories: [
      { id: 'sz', name: 'Kerek százast veszünk el', color: 'rose' },
      { id: 'nem', name: 'Tízesek, felváltás nélkül', color: 'sky' },
      { id: 'kell', name: 'Tízesek, felváltással', color: 'emerald' }
    ],
    items: [
      { id: 'tdss10', text: '', figure: <SortPlace a={350} b={200} />, categoryId: 'sz' },
      { id: 'tdss11', text: '', figure: <SortPlace a={480} b={100} />, categoryId: 'sz' },
      { id: 'tdss12', text: '470 − 300', categoryId: 'sz' },
      { id: 'tdss13', text: '', figure: <SortPlace a={460} b={230} />, categoryId: 'nem' },
      { id: 'tdss14', text: '490 − 270', categoryId: 'nem' },
      { id: 'tdss15', text: '280 − 140', categoryId: 'nem' },
      { id: 'tdss16', text: '', figure: <SortPlace a={420} b={180} />, categoryId: 'kell' },
      { id: 'tdss17', text: '', figure: <SortPlace a={310} b={160} />, categoryId: 'kell' },
      { id: 'tdss18', text: '330 − 150', categoryId: 'kell' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Vásárlás 500 Ft-ból',
    description: '500 Ft-od van. Mennyi marad, ha ezt megveszed?',
    categories: [
      { id: 'm100', name: 'Kevesebb, mint 100 Ft marad', color: 'rose' },
      { id: 'm12', name: '100–200 Ft marad', color: 'amber' },
      { id: 'm200', name: 'Több, mint 200 Ft marad', color: 'emerald' }
    ],
    items: [
      { id: 'tdss19', text: '', figure: <SortTag price={455} kind="kite" />, categoryId: 'm100' },
      { id: 'tdss20', text: '', figure: <SortTag price={415} kind="bear" />, categoryId: 'm100' },
      { id: 'tdss21', text: '500 − 430', categoryId: 'm100' },
      { id: 'tdss22', text: '', figure: <SortTag price={320} kind="robot" />, categoryId: 'm12' },
      { id: 'tdss23', text: '', figure: <SortTag price={365} kind="puzzle" />, categoryId: 'm12' },
      { id: 'tdss24', text: '500 − 315', categoryId: 'm12' },
      { id: 'tdss25', text: '', figure: <SortTag price={245} kind="ball" />, categoryId: 'm200' },
      { id: 'tdss26', text: '', figure: <SortTag price={160} kind="yoyo" />, categoryId: 'm200' },
      { id: 'tdss27', text: '500 − 285', categoryId: 'm200' }
    ]
  }
];

export const THREE_DIGIT_SUB_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = { 1: LIST[0], 2: LIST[1], 3: LIST[2] };

export const ThreeDigitSubG3Sorter: React.FC<ThreeDigitSubG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-wsub-haromjegyu-sorter',
  topicTitle = '1. Háromjegyű számok kivonása – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="irasbeli-kivonas"
      topicId={topicId}
      subtopicId="haromjegyu-szamok-kivonasa"
      title={topicTitle}
      subtitle="Vonj ki fejben, és válogasd szét a kivonásokat!"
      levels={THREE_DIGIT_SUB_G3_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default ThreeDigitSubG3Sorter;
