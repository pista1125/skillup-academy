import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { CardRect } from './RectAreaG3CardFigures';
import { CardShape } from '../a-terulet-merese/AreaG3CardFigures';
import { S } from '../a-terulet-merese/AreaG3Parts';

interface RectAreaG3SorterProps {
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

type Pal = 'blue' | 'green' | 'orange' | 'purple' | 'teal' | 'pink';
const r = (rows: number, cols: number, pal: Pal = 'green', partial = false) => <CardRect rows={rows} cols={cols} size="s" pal={pal} partial={partial} />;
const sh = (str: string, pal: Pal = 'teal') => <CardShape cells={S(str)} size="s" pal={pal} />;

export const RECT_AREA_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Mekkora a terület?',
    description: 'Számolj soronként, és tedd a jó dobozba!',
    categories: [
      { id: 'r12', name: '12 kis négyzet', color: 'sky' },
      { id: 'r16', name: '16 kis négyzet', color: 'emerald' },
      { id: 'r18', name: '18 kis négyzet', color: 'rose' }
    ],
    items: [
      { id: 'ras1', label: '', figure: r(3, 4, 'blue'), categoryId: 'r12' },
      { id: 'ras2', label: '', figure: r(2, 6, 'blue'), categoryId: 'r12' },
      { id: 'ras3', label: '', figure: r(4, 3, 'blue'), categoryId: 'r12' },
      { id: 'ras4', label: '', figure: r(6, 2, 'blue'), categoryId: 'r12' },
      { id: 'ras5', label: '3 sor, soronként 4', categoryId: 'r12' },
      { id: 'ras6', label: '2 · 6', categoryId: 'r12' },
      { id: 'ras7', label: '6 + 6', categoryId: 'r12' },
      { id: 'ras8', label: '4 + 4 + 4', categoryId: 'r12' },
      { id: 'ras9', label: '1 sor, soronként 12', categoryId: 'r12' },
      { id: 'ras10', label: '', figure: r(4, 4, 'green'), categoryId: 'r16' },
      { id: 'ras11', label: '', figure: r(2, 8, 'green'), categoryId: 'r16' },
      { id: 'ras12', label: '', figure: r(8, 2, 'green'), categoryId: 'r16' },
      { id: 'ras13', label: '', figure: r(4, 4, 'green', true), categoryId: 'r16' },
      { id: 'ras14', label: '4 · 4', categoryId: 'r16' },
      { id: 'ras15', label: '2 sor, soronként 8', categoryId: 'r16' },
      { id: 'ras16', label: '8 + 8', categoryId: 'r16' },
      { id: 'ras17', label: '4 + 4 + 4 + 4', categoryId: 'r16' },
      { id: 'ras18', label: '1 sor, soronként 16', categoryId: 'r16' },
      { id: 'ras19', label: '', figure: r(3, 6, 'orange'), categoryId: 'r18' },
      { id: 'ras20', label: '', figure: r(6, 3, 'orange'), categoryId: 'r18' },
      { id: 'ras21', label: '', figure: r(2, 9, 'orange'), categoryId: 'r18' },
      { id: 'ras22', label: '', figure: r(3, 6, 'orange', true), categoryId: 'r18' },
      { id: 'ras23', label: '3 · 6', categoryId: 'r18' },
      { id: 'ras24', label: '2 sor, soronként 9', categoryId: 'r18' },
      { id: 'ras25', label: '9 + 9', categoryId: 'r18' },
      { id: 'ras26', label: '6 + 6 + 6', categoryId: 'r18' },
      { id: 'ras27', label: '1 sor, soronként 18', categoryId: 'r18' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Kevesebb, pont annyi, több?',
    description: 'Hasonlítsd a területet a 20 kis négyzethez!',
    categories: [
      { id: 'lt', name: '20-nál kevesebb', color: 'sky' },
      { id: 'eq', name: 'Pontosan 20', color: 'amber' },
      { id: 'gt', name: '20-nál több', color: 'purple' }
    ],
    items: [
      { id: 'ras28', label: '', figure: r(3, 5, 'blue'), categoryId: 'lt' },
      { id: 'ras29', label: '', figure: r(4, 4, 'blue'), categoryId: 'lt' },
      { id: 'ras30', label: '', figure: r(2, 9, 'blue'), categoryId: 'lt' },
      { id: 'ras31', label: '', figure: r(3, 6, 'blue', true), categoryId: 'lt' },
      { id: 'ras32', label: '2 sor, soronként 7', categoryId: 'lt' },
      { id: 'ras33', label: '3 sor, soronként 3', categoryId: 'lt' },
      { id: 'ras34', label: '5 · 3', categoryId: 'lt' },
      { id: 'ras35', label: '6 · 3', categoryId: 'lt' },
      { id: 'ras36', label: '19 kis négyzet', categoryId: 'lt' },
      { id: 'ras37', label: '', figure: r(4, 5, 'orange'), categoryId: 'eq' },
      { id: 'ras38', label: '', figure: r(5, 4, 'orange'), categoryId: 'eq' },
      { id: 'ras39', label: '', figure: r(4, 5, 'orange', true), categoryId: 'eq' },
      { id: 'ras40', label: '', figure: r(2, 10, 'orange'), categoryId: 'eq' },
      { id: 'ras41', label: '4 · 5', categoryId: 'eq' },
      { id: 'ras42', label: '2 · 10', categoryId: 'eq' },
      { id: 'ras43', label: '10 + 10', categoryId: 'eq' },
      { id: 'ras44', label: '5 + 5 + 5 + 5', categoryId: 'eq' },
      { id: 'ras45', label: '5 sor, soronként 4', categoryId: 'eq' },
      { id: 'ras46', label: '', figure: r(5, 5, 'purple'), categoryId: 'gt' },
      { id: 'ras47', label: '', figure: r(3, 7, 'purple'), categoryId: 'gt' },
      { id: 'ras48', label: '', figure: r(4, 6, 'purple'), categoryId: 'gt' },
      { id: 'ras49', label: '', figure: r(6, 4, 'purple', true), categoryId: 'gt' },
      { id: 'ras50', label: '3 · 8', categoryId: 'gt' },
      { id: 'ras51', label: '7 · 3', categoryId: 'gt' },
      { id: 'ras52', label: '6 · 6', categoryId: 'gt' },
      { id: 'ras53', label: '5 sor, soronként 6', categoryId: 'gt' },
      { id: 'ras54', label: '2 sor, soronként 11', categoryId: 'gt' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Két lépésben',
    description: 'Darabold fel, vagy vond ki a lyukat! Mekkora a terület?',
    categories: [
      { id: 't24', name: '24 kis négyzet', color: 'emerald' },
      { id: 't30', name: '30 kis négyzet', color: 'rose' },
      { id: 't36', name: '36 kis négyzet', color: 'sky' }
    ],
    items: [
      { id: 'ras55', label: '', figure: r(4, 6, 'green', true), categoryId: 't24' },
      { id: 'ras56', label: '', figure: sh('######|#...##|#...##|######|######', 'green'), categoryId: 't24' },
      { id: 'ras57', label: '', figure: sh('######|######|######|###...|###...', 'green'), categoryId: 't24' },
      { id: 'ras58', label: '', figure: r(3, 8, 'green'), categoryId: 't24' },
      { id: 'ras59', label: '4 sor, soronként 6', categoryId: 't24' },
      { id: 'ras60', label: '8 · 3', categoryId: 't24' },
      { id: 'ras61', label: '30 − 6', categoryId: 't24' },
      { id: 'ras62', label: '12 dominó', categoryId: 't24' },
      { id: 'ras63', label: '6 nagy négyzet (2 · 2-es)', categoryId: 't24' },
      { id: 'ras64', label: '', figure: r(5, 6, 'pink', true), categoryId: 't30' },
      { id: 'ras65', label: '', figure: r(6, 5, 'pink'), categoryId: 't30' },
      { id: 'ras66', label: '', figure: sh('######|######|######|######|###...|###...', 'pink'), categoryId: 't30' },
      { id: 'ras67', label: '', figure: sh('######|#..###|#..###|#..###|######|######', 'pink'), categoryId: 't30' },
      { id: 'ras68', label: '5 · 6', categoryId: 't30' },
      { id: 'ras69', label: '3 sor, soronként 10', categoryId: 't30' },
      { id: 'ras70', label: '15 dominó', categoryId: 't30' },
      { id: 'ras71', label: '6 + 6 + 6 + 6 + 6', categoryId: 't30' },
      { id: 'ras72', label: '36 − 6', categoryId: 't30' },
      { id: 'ras73', label: '', figure: r(6, 6, 'blue', true), categoryId: 't36' },
      { id: 'ras74', label: '', figure: r(6, 6, 'blue'), categoryId: 't36' },
      { id: 'ras75', label: '', figure: r(4, 9, 'blue'), categoryId: 't36' },
      { id: 'ras76', label: '', figure: sh('######|######|######|######|######|###...|###...', 'blue'), categoryId: 't36' },
      { id: 'ras77', label: '6 · 6', categoryId: 't36' },
      { id: 'ras78', label: '4 sor, soronként 9', categoryId: 't36' },
      { id: 'ras79', label: '18 dominó', categoryId: 't36' },
      { id: 'ras80', label: '9 nagy négyzet (2 · 2-es)', categoryId: 't36' },
      { id: 'ras81', label: '40 − 4', categoryId: 't36' }
    ]
  }
};

export const RectAreaG3Sorter: React.FC<RectAreaG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-meas-teglalap-terulet-sorter',
  topicTitle = '8. A téglalap és a négyzet területe – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="a-teglalap-es-a-negyzet-terulete"
      title={topicTitle}
      subtitle="Számold ki a területet, és válogasd szét!"
      levels={RECT_AREA_G3_SORTER_LEVELS}
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

export default RectAreaG3Sorter;
