import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortCheck } from '../a-kulonbseg-becslese/DiffEstimateG3CardFigures';
import { SortPlace } from '../haromjegyu-szamok-kivonasa/ThreeDigitSubG3CardFigures';

interface WrittenSubG3SorterProps {
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
    title: '1. szint: Hol kell felváltani?',
    description: 'Nézd meg az egyeseket és a tízeseket! Hol kevés a felső szám?',
    categories: [
      { id: 'nincs', name: 'Nem kell felváltani', color: 'emerald' },
      { id: 'egyes', name: 'Felváltás az egyeseknél', color: 'amber' },
      { id: 'tizes', name: 'Felváltás a tízeseknél', color: 'sky' }
    ],
    items: [
      { id: 'wsus1', text: '', figure: <SortPlace a={486} b={253} />, categoryId: 'nincs' },
      { id: 'wsus2', text: '', figure: <SortPlace a={397} b={124} />, categoryId: 'nincs' },
      { id: 'wsus3', text: '458 − 136', categoryId: 'nincs' },
      { id: 'wsus4', text: '', figure: <SortPlace a={372} b={145} />, categoryId: 'egyes' },
      { id: 'wsus5', text: '', figure: <SortPlace a={263} b={128} />, categoryId: 'egyes' },
      { id: 'wsus6', text: '391 − 157', categoryId: 'egyes' },
      { id: 'wsus7', text: '', figure: <SortPlace a={428} b={175} />, categoryId: 'tizes' },
      { id: 'wsus8', text: '', figure: <SortPlace a={346} b={163} />, categoryId: 'tizes' },
      { id: 'wsus9', text: '417 − 156', categoryId: 'tizes' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mekkora a különbség?',
    description: 'Számold ki írásban, és tedd a jó dobozba!',
    categories: [
      { id: 'k200', name: 'Kevesebb, mint 200', color: 'sky' },
      { id: 'k23', name: '200 és 300 között', color: 'amber' },
      { id: 'k300', name: 'Több, mint 300', color: 'rose' }
    ],
    items: [
      { id: 'wsus10', text: '', figure: <SortPlace a={364} b={178} />, categoryId: 'k200' },
      { id: 'wsus11', text: '', figure: <SortPlace a={421} b={263} />, categoryId: 'k200' },
      { id: 'wsus12', text: '315 − 128', categoryId: 'k200' },
      { id: 'wsus13', text: '', figure: <SortPlace a={421} b={186} />, categoryId: 'k23' },
      { id: 'wsus14', text: '', figure: <SortPlace a={403} b={157} />, categoryId: 'k23' },
      { id: 'wsus15', text: '452 − 188', categoryId: 'k23' },
      { id: 'wsus16', text: '', figure: <SortPlace a={482} b={167} />, categoryId: 'k300' },
      { id: 'wsus17', text: '', figure: <SortPlace a={461} b={138} />, categoryId: 'k300' },
      { id: 'wsus18', text: '500 − 176', categoryId: 'k300' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hibavadász',
    description: 'Ellenőrizd összeadással! Jó az eredmény, vagy mennyivel több a jónál?',
    categories: [
      { id: 'jo', name: 'Jó eredmény', color: 'emerald' },
      { id: 'p10', name: '10-zel több a jónál', color: 'amber' },
      { id: 'p100', name: '100-zal több a jónál', color: 'rose' }
    ],
    items: [
      { id: 'wsus19', text: '', figure: <SortCheck a={372} b={145} r={227} />, categoryId: 'jo' },
      { id: 'wsus20', text: '', figure: <SortCheck a={428} b={175} r={253} />, categoryId: 'jo' },
      { id: 'wsus21', text: '403 − 157 = 246', categoryId: 'jo' },
      { id: 'wsus22', text: '', figure: <SortCheck a={372} b={145} r={237} />, categoryId: 'p10' },
      { id: 'wsus23', text: '', figure: <SortCheck a={364} b={178} r={196} />, categoryId: 'p10' },
      { id: 'wsus24', text: '315 − 128 = 197', categoryId: 'p10' },
      { id: 'wsus25', text: '', figure: <SortCheck a={428} b={175} r={353} />, categoryId: 'p100' },
      { id: 'wsus26', text: '', figure: <SortCheck a={421} b={186} r={335} />, categoryId: 'p100' },
      { id: 'wsus27', text: '452 − 267 = 285', categoryId: 'p100' }
    ]
  }
];

export const WRITTEN_SUB_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = { 1: LIST[0], 2: LIST[1], 3: LIST[2] };

export const WrittenSubG3Sorter: React.FC<WrittenSubG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-wsub-irasbeli-sorter',
  topicTitle = '3. Írásbeli kivonás – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="irasbeli-kivonas"
      topicId={topicId}
      subtopicId="irasbeli-kivonas"
      title={topicTitle}
      subtitle="Számolj írásban, és válogasd szét a kivonásokat!"
      levels={WRITTEN_SUB_G3_SORTER_LEVELS}
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

export default WrittenSubG3Sorter;
