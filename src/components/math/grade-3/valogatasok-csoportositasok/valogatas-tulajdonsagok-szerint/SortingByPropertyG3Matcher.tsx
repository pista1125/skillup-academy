import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { B, blockName, Block } from './SortingByPropertyG3Parts';
import { BlockCard, BlockGroupCard, BlockRowCard, NumberRowCard } from './SortingByPropertyG3CardFigures';

interface SortingByPropertyG3MatcherProps {
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

const L1_BLOCKS: Block[] = [
  B('piros', 'kor', true, true),
  B('piros', 'kor', false, true),
  B('kek', 'negyzet', true, false),
  B('kek', 'negyzet', true, true),
  B('sarga', 'haromszog', false, false),
  B('zold', 'haromszog', false, false),
  B('zold', 'kor', true, false),
  B('sarga', 'negyzet', false, true)
];

const row = (base: Block, odd: number, oddBlock: Block): Block[] => [0, 1, 2, 3].map((i) => (i === odd ? oddBlock : base));

const SORTING_BY_PROPERTY_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Milyen a lap?',
    description: 'Nézd meg a lapot! Melyik leírás illik rá?',
    pairs: L1_BLOCKS.map((b, i) => ({ id: `sbpm${i + 1}`, left: '', promptFigure: <BlockCard b={b} />, right: blockName(b) }))
  },
  {
    level: 2,
    title: '2. szint: Mi a címke?',
    description: 'Mi a közös a csoportban? Keresd meg a címkét!',
    pairs: [
      {
        id: 'sbpm9',
        left: '',
        promptFigure: <BlockGroupCard blocks={[B('piros', 'kor', true, false), B('piros', 'haromszog', false, true), B('piros', 'negyzet', true, true)]} />,
        right: 'piros lapok'
      },
      {
        id: 'sbpm10',
        left: '',
        promptFigure: <BlockGroupCard blocks={[B('kek', 'kor', true, true), B('sarga', 'haromszog', false, true), B('zold', 'negyzet', true, true)]} />,
        right: 'lyukas lapok'
      },
      {
        id: 'sbpm11',
        left: '',
        promptFigure: <BlockGroupCard blocks={[B('sarga', 'kor', false, false), B('kek', 'negyzet', false, true), B('piros', 'haromszog', false, false)]} />,
        right: 'kicsi lapok'
      },
      {
        id: 'sbpm12',
        left: '',
        promptFigure: <BlockGroupCard blocks={[B('zold', 'negyzet', true, false), B('sarga', 'negyzet', false, true), B('kek', 'negyzet', true, false)]} />,
        right: 'négyzetek'
      },
      { id: 'sbpm13', left: '36, 140, 258, 412', right: 'páros számok' },
      { id: 'sbpm14', left: '45, 117, 203, 389', right: 'páratlan számok' },
      { id: 'sbpm15', left: '8, 5, 3, 9', right: 'egyjegyű számok' },
      { id: 'sbpm16', left: '105, 260, 384, 499', right: 'háromjegyű számok' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Kakukktojás',
    description: 'Melyik nem illik a sorba? Miért?',
    pairs: [
      { id: 'sbpm17', left: '', promptFigure: <BlockRowCard blocks={row(B('piros', 'kor', true, true), 2, B('piros', 'negyzet', true, true))} />, right: 'A 3., mert nem kör.' },
      { id: 'sbpm18', left: '', promptFigure: <BlockRowCard blocks={row(B('kek', 'haromszog', true, false), 0, B('kek', 'haromszog', false, false))} />, right: 'Az 1., mert kicsi.' },
      { id: 'sbpm19', left: '', promptFigure: <BlockRowCard blocks={row(B('sarga', 'negyzet', true, true), 1, B('sarga', 'negyzet', true, false))} />, right: 'A 2., mert nem lyukas.' },
      { id: 'sbpm20', left: '', promptFigure: <BlockRowCard blocks={row(B('zold', 'kor', true, false), 3, B('piros', 'kor', true, false))} />, right: 'A 4., mert nem zöld.' },
      { id: 'sbpm21', left: '', promptFigure: <NumberRowCard nums={[12, 48, 77, 30]} />, right: '77, mert páratlan.' },
      { id: 'sbpm22', left: '', promptFigure: <NumberRowCard nums={[150, 230, 45, 410]} />, right: '45, mert kétjegyű.' },
      { id: 'sbpm23', left: '', promptFigure: <NumberRowCard nums={[310, 320, 345, 330]} />, right: '345, mert nem kerek tízes.' },
      { id: 'sbpm24', left: '', promptFigure: <NumberRowCard nums={[460, 120, 480, 450]} />, right: '120, mert kisebb 400-nál.' }
    ]
  }
];

export const SORTING_BY_PROPERTY_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: SORTING_BY_PROPERTY_G3_MATCHER_LEVELS_LIST[0],
  2: SORTING_BY_PROPERTY_G3_MATCHER_LEVELS_LIST[1],
  3: SORTING_BY_PROPERTY_G3_MATCHER_LEVELS_LIST[2]
};

export const SortingByPropertyG3Matcher: React.FC<SortingByPropertyG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-grp-tulajdonsagok-matcher',
  topicTitle = '1. Válogatás tulajdonságok szerint – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="valogatasok-csoportositasok"
      topicId={topicId}
      subtopicId="valogatas-tulajdonsagok-szerint"
      title={topicTitle}
      subtitle="Párosítsd a lapokat a leírásukkal, a csoportokat a címkéjükkel!"
      levels={SORTING_BY_PROPERTY_G3_MATCHER_LEVELS}
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

export default SortingByPropertyG3Matcher;
