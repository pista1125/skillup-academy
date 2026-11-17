import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { CardRods, CardSplit, CardCoinMul } from './MulDiv200G3CardFigures';

interface MulDiv200G3SorterProps {
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

const rods = (groups: number, per: number) => <CardRods groups={groups} per={per} size="s" />;
const split = (total: number, n: number) => <CardSplit total={total} n={n} size="s" />;
const coins = (n: number, v: number) => <CardCoinMul n={n} v={v} size="s" />;

export const MUL_DIV_200_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Mennyi a szorzat?',
    description: 'Egy kék rúd 10. Számold ki, és tedd a jó dobozba!',
    categories: [
      { id: 's120', name: '120', color: 'sky' },
      { id: 's160', name: '160', color: 'emerald' },
      { id: 's180', name: '180', color: 'rose' }
    ],
    items: [
      { id: 'md200s1', label: '', figure: rods(2, 6), categoryId: 's120' },
      { id: 'md200s2', label: '', figure: rods(3, 4), categoryId: 's120' },
      { id: 'md200s3', label: '', figure: rods(4, 3), categoryId: 's120' },
      { id: 'md200s4', label: '', figure: coins(6, 20), categoryId: 's120' },
      { id: 'md200s5', label: '2 · 60', categoryId: 's120' },
      { id: 'md200s6', label: '60 · 2', categoryId: 's120' },
      { id: 'md200s7', label: '4 · 30', categoryId: 's120' },
      { id: 'md200s8', label: '40 + 40 + 40', categoryId: 's120' },
      { id: 'md200s9', label: '12 · 10', categoryId: 's120' },
      { id: 'md200s10', label: '', figure: rods(2, 8), categoryId: 's160' },
      { id: 'md200s11', label: '', figure: rods(4, 4), categoryId: 's160' },
      { id: 'md200s12', label: '', figure: coins(8, 20), categoryId: 's160' },
      { id: 'md200s13', label: '4 · 40', categoryId: 's160' },
      { id: 'md200s14', label: '2 · 80', categoryId: 's160' },
      { id: 'md200s15', label: '40 · 4', categoryId: 's160' },
      { id: 'md200s16', label: '80 + 80', categoryId: 's160' },
      { id: 'md200s17', label: '16 · 10', categoryId: 's160' },
      { id: 'md200s18', label: '20 · 8', categoryId: 's160' },
      { id: 'md200s19', label: '', figure: rods(2, 9), categoryId: 's180' },
      { id: 'md200s20', label: '', figure: coins(18, 10), categoryId: 's180' },
      { id: 'md200s21', label: '', figure: coins(9, 20), categoryId: 's180' },
      { id: 'md200s22', label: '6 · 30', categoryId: 's180' },
      { id: 'md200s23', label: '2 · 90', categoryId: 's180' },
      { id: 'md200s24', label: '3 · 60', categoryId: 's180' },
      { id: 'md200s25', label: '90 + 90', categoryId: 's180' },
      { id: 'md200s26', label: '60 + 60 + 60', categoryId: 's180' },
      { id: 'md200s27', label: '30 · 6', categoryId: 's180' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Mennyi az eredmény?',
    description: 'Oszd el egyformán, vagy keresd a hiányzó számot!',
    categories: [
      { id: 'e20', name: '20', color: 'amber' },
      { id: 'e30', name: '30', color: 'purple' },
      { id: 'e40', name: '40', color: 'teal' }
    ],
    items: [
      { id: 'md200s28', label: '', figure: split(60, 3), categoryId: 'e20' },
      { id: 'md200s29', label: '', figure: split(40, 2), categoryId: 'e20' },
      { id: 'md200s30', label: '', figure: split(80, 4), categoryId: 'e20' },
      { id: 'md200s31', label: '100 : 5', categoryId: 'e20' },
      { id: 'md200s32', label: '160 : 8', categoryId: 'e20' },
      { id: 'md200s33', label: '200 : 10', categoryId: 'e20' },
      { id: 'md200s34', label: '140 : 7', categoryId: 'e20' },
      { id: 'md200s35', label: '□ · 6 = 120', categoryId: 'e20' },
      { id: 'md200s36', label: '180 : 9', categoryId: 'e20' },
      { id: 'md200s37', label: '', figure: split(60, 2), categoryId: 'e30' },
      { id: 'md200s38', label: '', figure: split(90, 3), categoryId: 'e30' },
      { id: 'md200s39', label: '', figure: split(120, 4), categoryId: 'e30' },
      { id: 'md200s40', label: '150 : 5', categoryId: 'e30' },
      { id: 'md200s41', label: '180 : 6', categoryId: 'e30' },
      { id: 'md200s42', label: '□ · 5 = 150', categoryId: 'e30' },
      { id: 'md200s43', label: '2 · □ = 60', categoryId: 'e30' },
      { id: 'md200s44', label: '30 : 1', categoryId: 'e30' },
      { id: 'md200s45', label: '6 · □ = 180', categoryId: 'e30' },
      { id: 'md200s46', label: '', figure: split(80, 2), categoryId: 'e40' },
      { id: 'md200s47', label: '', figure: split(120, 3), categoryId: 'e40' },
      { id: 'md200s48', label: '', figure: split(160, 4), categoryId: 'e40' },
      { id: 'md200s49', label: '200 : 5', categoryId: 'e40' },
      { id: 'md200s50', label: '40 : 1', categoryId: 'e40' },
      { id: 'md200s51', label: '5 · □ = 200', categoryId: 'e40' },
      { id: 'md200s52', label: '□ · 2 = 80', categoryId: 'e40' },
      { id: 'md200s53', label: '3 · □ = 120', categoryId: 'e40' },
      { id: 'md200s54', label: '4 · □ = 160', categoryId: 'e40' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Kisebb vagy nagyobb, mint 150?',
    description: 'Számold ki, és hasonlítsd össze a 150-nel!',
    categories: [
      { id: 'k150', name: '150-nél kisebb', color: 'sky' },
      { id: 'e150', name: 'Pontosan 150', color: 'amber' },
      { id: 'n150', name: '150-nél nagyobb', color: 'rose' }
    ],
    items: [
      { id: 'md200s55', label: '', figure: rods(2, 7), categoryId: 'k150' },
      { id: 'md200s56', label: '', figure: rods(3, 4), categoryId: 'k150' },
      { id: 'md200s57', label: '', figure: coins(7, 20), categoryId: 'k150' },
      { id: 'md200s58', label: '', figure: coins(2, 50), categoryId: 'k150' },
      { id: 'md200s59', label: '4 · 30', categoryId: 'k150' },
      { id: 'md200s60', label: '200 : 2', categoryId: 'k150' },
      { id: 'md200s61', label: '6 · 20', categoryId: 'k150' },
      { id: 'md200s62', label: '70 · 2', categoryId: 'k150' },
      { id: 'md200s63', label: '80 : 4', categoryId: 'k150' },
      { id: 'md200s64', label: '', figure: coins(15, 10), categoryId: 'e150' },
      { id: 'md200s65', label: '', figure: coins(3, 50), categoryId: 'e150' },
      { id: 'md200s66', label: '5 · 30', categoryId: 'e150' },
      { id: 'md200s67', label: '30 · 5', categoryId: 'e150' },
      { id: 'md200s68', label: '50 · 3', categoryId: 'e150' },
      { id: 'md200s69', label: '100 + 50', categoryId: 'e150' },
      { id: 'md200s70', label: '200 − 50', categoryId: 'e150' },
      { id: 'md200s71', label: '15 · 10', categoryId: 'e150' },
      { id: 'md200s72', label: '50 + 50 + 50', categoryId: 'e150' },
      { id: 'md200s73', label: '', figure: rods(4, 4), categoryId: 'n150' },
      { id: 'md200s74', label: '', figure: rods(2, 8), categoryId: 'n150' },
      { id: 'md200s75', label: '', figure: coins(2, 100), categoryId: 'n150' },
      { id: 'md200s76', label: '', figure: coins(9, 20), categoryId: 'n150' },
      { id: 'md200s77', label: '', figure: coins(4, 50), categoryId: 'n150' },
      { id: 'md200s78', label: '5 · 40', categoryId: 'n150' },
      { id: 'md200s79', label: '2 · 90', categoryId: 'n150' },
      { id: 'md200s80', label: '6 · 30', categoryId: 'n150' },
      { id: 'md200s81', label: '170 : 1', categoryId: 'n150' }
    ]
  }
};

export const MulDiv200G3Sorter: React.FC<MulDiv200G3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-c200-szorzas-sorter',
  topicTitle = '5. Szorzás és osztás – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="szamolas-200-ig"
      topicId={topicId}
      subtopicId="szorzas-es-osztas"
      title={topicTitle}
      subtitle="Számolj, és válogasd szét a képeket és a műveleteket!"
      levels={MUL_DIV_200_G3_SORTER_LEVELS}
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

export default MulDiv200G3Sorter;
