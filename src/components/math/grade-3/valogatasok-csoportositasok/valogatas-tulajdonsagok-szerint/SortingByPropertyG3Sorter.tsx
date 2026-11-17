import React from 'react';
import { SorterTemplate, SorterLevelConfig, SorterItem } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { B, Block, blockName, BT, Btn } from './SortingByPropertyG3Parts';
import { BlockCard, ButtonCard } from './SortingByPropertyG3CardFigures';

interface SortingByPropertyG3SorterProps {
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

let uid = 0;
/** Lap képpel vagy (text = true) csak leírással. */
const blk = (b: Block, cat: string, text = false): SorterItem =>
  text ? { id: `sbps${++uid}`, text: blockName(b), categoryId: cat } : { id: `sbps${++uid}`, text: '', figure: <BlockCard b={b} small />, categoryId: cat };
const btn = (b: Btn, cat: string, text?: string, big = true): SorterItem =>
  text ? { id: `sbps${++uid}`, text, categoryId: cat } : { id: `sbps${++uid}`, text: '', figure: <ButtonCard b={b} small big={big} />, categoryId: cat };

const SORTING_BY_PROPERTY_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Milyen formájú?',
    description: 'Válogasd szét a lapokat forma szerint!',
    categories: [
      { id: 'kor', name: 'körök', color: 'rose' },
      { id: 'har', name: 'háromszögek', color: 'amber' },
      { id: 'negy', name: 'négyzetek', color: 'sky' }
    ],
    items: [
      blk(B('piros', 'kor', true, true), 'kor'),
      blk(B('kek', 'kor', false, false), 'kor'),
      blk(B('sarga', 'kor', true, false), 'kor'),
      blk(B('zold', 'kor', false, true), 'kor'),
      blk(B('kek', 'kor', true, true), 'kor'),
      blk(B('zold', 'kor', true, false), 'kor', true),
      blk(B('sarga', 'kor', false, true), 'kor', true),
      blk(B('piros', 'kor', false, false), 'kor', true),
      blk(B('kek', 'kor', false, true), 'kor', true),
      blk(B('zold', 'haromszog', true, true), 'har'),
      blk(B('piros', 'haromszog', false, false), 'har'),
      blk(B('sarga', 'haromszog', true, false), 'har'),
      blk(B('kek', 'haromszog', false, true), 'har'),
      blk(B('piros', 'haromszog', true, true), 'har'),
      blk(B('kek', 'haromszog', true, false), 'har', true),
      blk(B('zold', 'haromszog', false, false), 'har', true),
      blk(B('sarga', 'haromszog', false, true), 'har', true),
      blk(B('piros', 'haromszog', true, false), 'har', true),
      blk(B('sarga', 'negyzet', true, true), 'negy'),
      blk(B('zold', 'negyzet', false, false), 'negy'),
      blk(B('piros', 'negyzet', true, false), 'negy'),
      blk(B('kek', 'negyzet', false, true), 'negy'),
      blk(B('zold', 'negyzet', true, true), 'negy'),
      blk(B('kek', 'negyzet', true, false), 'negy', true),
      blk(B('piros', 'negyzet', false, true), 'negy', true),
      blk(B('sarga', 'negyzet', false, false), 'negy', true),
      blk(B('zold', 'negyzet', false, true), 'negy', true)
    ]
  },
  {
    level: 2,
    title: '2. szint: Két tulajdonság',
    description: 'Nagy és lyukas? Nagy, de nem lyukas? Vagy kicsi?',
    categories: [
      { id: 'nl', name: 'nagy és lyukas', color: 'emerald' },
      { id: 'nn', name: 'nagy, nem lyukas', color: 'sky' },
      { id: 'k', name: 'kicsi lapok', color: 'amber' }
    ],
    items: [
      blk(B('piros', 'kor', true, true), 'nl'),
      blk(B('kek', 'negyzet', true, true), 'nl'),
      blk(B('sarga', 'haromszog', true, true), 'nl'),
      blk(B('zold', 'kor', true, true), 'nl'),
      blk(B('piros', 'negyzet', true, true), 'nl'),
      blk(B('kek', 'haromszog', true, true), 'nl', true),
      blk(B('zold', 'negyzet', true, true), 'nl', true),
      blk(B('sarga', 'kor', true, true), 'nl', true),
      blk(B('piros', 'haromszog', true, true), 'nl', true),
      blk(B('kek', 'kor', true, false), 'nn'),
      blk(B('zold', 'haromszog', true, false), 'nn'),
      blk(B('sarga', 'negyzet', true, false), 'nn'),
      blk(B('piros', 'kor', true, false), 'nn'),
      blk(B('kek', 'negyzet', true, false), 'nn'),
      blk(B('piros', 'negyzet', true, false), 'nn', true),
      blk(B('sarga', 'haromszog', true, false), 'nn', true),
      blk(B('zold', 'kor', true, false), 'nn', true),
      blk(B('kek', 'haromszog', true, false), 'nn', true),
      blk(B('piros', 'kor', false, true), 'k'),
      blk(B('kek', 'negyzet', false, false), 'k'),
      blk(B('sarga', 'haromszog', false, true), 'k'),
      blk(B('zold', 'negyzet', false, true), 'k'),
      blk(B('piros', 'haromszog', false, false), 'k'),
      blk(B('sarga', 'kor', false, false), 'k', true),
      blk(B('kek', 'kor', false, true), 'k', true),
      blk(B('zold', 'haromszog', false, false), 'k', true),
      blk(B('piros', 'negyzet', false, true), 'k', true)
    ]
  },
  {
    level: 3,
    title: '3. szint: Gombok a dobozban',
    description: 'Nézd meg a gomb formáját és a lyukait!',
    categories: [
      { id: 'k2', name: 'kerek, kétlyukú', color: 'rose' },
      { id: 'k4', name: 'kerek, négylyukú', color: 'purple' },
      { id: 'nk', name: 'nem kerek', color: 'slate' }
    ],
    items: [
      btn(BT('kerek', 2, 'piros'), 'k2'),
      btn(BT('kerek', 2, 'kek'), 'k2', undefined, false),
      btn(BT('kerek', 2, 'sarga'), 'k2'),
      btn(BT('kerek', 2, 'zold'), 'k2', undefined, false),
      btn(BT('kerek', 2, 'barna'), 'k2'),
      btn(BT('kerek', 2, 'lila'), 'k2', 'lila, kerek, kétlyukú gomb'),
      btn(BT('kerek', 2, 'piros'), 'k2', 'kicsi, piros, kerek gomb 2 lyukkal'),
      btn(BT('kerek', 2, 'piros'), 'k2', 'nagy, sárga, kerek gomb 2 lyukkal'),
      btn(BT('kerek', 2, 'piros'), 'k2', 'zöld, kerek gomb, két lyuk'),
      btn(BT('kerek', 4, 'kek'), 'k4'),
      btn(BT('kerek', 4, 'piros'), 'k4', undefined, false),
      btn(BT('kerek', 4, 'zold'), 'k4'),
      btn(BT('kerek', 4, 'lila'), 'k4', undefined, false),
      btn(BT('kerek', 4, 'sarga'), 'k4'),
      btn(BT('kerek', 4, 'kek'), 'k4', 'barna, kerek, négylyukú gomb'),
      btn(BT('kerek', 4, 'kek'), 'k4', 'kicsi, kék, kerek gomb 4 lyukkal'),
      btn(BT('kerek', 4, 'kek'), 'k4', 'nagy, piros, kerek gomb 4 lyukkal'),
      btn(BT('kerek', 4, 'kek'), 'k4', 'fehér, kerek gomb, négy lyuk'),
      btn(BT('negyzet', 2, 'sarga'), 'nk'),
      btn(BT('hatszog', 4, 'zold'), 'nk'),
      btn(BT('negyzet', 4, 'piros'), 'nk', undefined, false),
      btn(BT('hatszog', 2, 'kek'), 'nk'),
      btn(BT('negyzet', 4, 'lila'), 'nk'),
      btn(BT('negyzet', 2, 'kek'), 'nk', 'négyzet alakú, kétlyukú gomb'),
      btn(BT('negyzet', 2, 'kek'), 'nk', 'hatszög alakú gomb 4 lyukkal'),
      btn(BT('negyzet', 2, 'kek'), 'nk', 'szív alakú, piros gomb'),
      btn(BT('negyzet', 2, 'kek'), 'nk', 'csillag alakú, kétlyukú gomb')
    ]
  }
];

export const SORTING_BY_PROPERTY_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: SORTING_BY_PROPERTY_G3_SORTER_LEVELS_LIST[0],
  2: SORTING_BY_PROPERTY_G3_SORTER_LEVELS_LIST[1],
  3: SORTING_BY_PROPERTY_G3_SORTER_LEVELS_LIST[2]
};

export const SortingByPropertyG3Sorter: React.FC<SortingByPropertyG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-grp-tulajdonsagok-sorter',
  topicTitle = '1. Válogatás tulajdonságok szerint – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="valogatasok-csoportositasok"
      topicId={topicId}
      subtopicId="valogatas-tulajdonsagok-szerint"
      title={topicTitle}
      subtitle="Nézd a címkét, és tedd a helyére a lapokat és a gombokat!"
      levels={SORTING_BY_PROPERTY_G3_SORTER_LEVELS}
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

export default SortingByPropertyG3Sorter;
