import React from 'react';
import { SorterTemplate, SorterLevelConfig, SorterItem } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { B, Block, blockName } from './VennG3Parts';
import { VBlockCard, NumHintCard } from './VennG3CardFigures';

interface VennG3SorterProps {
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
  text ? { id: `vns${++uid}`, text: blockName(b), categoryId: cat } : { id: `vns${++uid}`, text: '', figure: <VBlockCard b={b} small />, categoryId: cat };
/** Számok; az első négy képpel (színes utolsó számjegy). */
const nums = (list: number[], cat: string): SorterItem[] =>
  list.map((n, i) =>
    i < 4 ? { id: `vns${++uid}`, text: '', figure: <NumHintCard n={n} />, categoryId: cat } : { id: `vns${++uid}`, text: String(n), categoryId: cat }
  );

const VENN_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kicsi? Lyukas?',
    description: 'Két karika: „kicsi” és „lyukas”. Hová kerül a lap?',
    categories: [
      { id: 'a', name: 'csak a „kicsi” karikába', color: 'rose' },
      { id: 'ab', name: 'a közös részbe', color: 'purple' },
      { id: 'b', name: 'csak a „lyukas” karikába', color: 'sky' }
    ],
    items: [
      blk(B('piros', 'kor', false, false), 'a'),
      blk(B('kek', 'negyzet', false, false), 'a'),
      blk(B('sarga', 'haromszog', false, false), 'a'),
      blk(B('zold', 'kor', false, false), 'a'),
      blk(B('piros', 'negyzet', false, false), 'a'),
      blk(B('kek', 'haromszog', false, false), 'a', true),
      blk(B('zold', 'negyzet', false, false), 'a', true),
      blk(B('sarga', 'kor', false, false), 'a', true),
      blk(B('piros', 'haromszog', false, false), 'a', true),
      blk(B('piros', 'kor', false, true), 'ab'),
      blk(B('kek', 'negyzet', false, true), 'ab'),
      blk(B('sarga', 'haromszog', false, true), 'ab'),
      blk(B('zold', 'kor', false, true), 'ab'),
      blk(B('sarga', 'negyzet', false, true), 'ab'),
      blk(B('kek', 'kor', false, true), 'ab', true),
      blk(B('zold', 'haromszog', false, true), 'ab', true),
      blk(B('piros', 'negyzet', false, true), 'ab', true),
      blk(B('sarga', 'kor', false, true), 'ab', true),
      blk(B('piros', 'kor', true, true), 'b'),
      blk(B('kek', 'haromszog', true, true), 'b'),
      blk(B('sarga', 'negyzet', true, true), 'b'),
      blk(B('zold', 'kor', true, true), 'b'),
      blk(B('kek', 'negyzet', true, true), 'b'),
      blk(B('piros', 'haromszog', true, true), 'b', true),
      blk(B('zold', 'negyzet', true, true), 'b', true),
      blk(B('sarga', 'kor', true, true), 'b', true),
      blk(B('kek', 'kor', true, true), 'b', true)
    ]
  },
  {
    level: 2,
    title: '2. szint: Nagy? Lyukas?',
    description: 'Két karika: „nagy” és „lyukas”. Hány karikába kerül a lap?',
    categories: [
      { id: 'ab', name: 'a közös részbe', color: 'purple' },
      { id: 'one', name: 'csak az egyik karikába', color: 'amber' },
      { id: 'out', name: 'egyik karikába sem', color: 'slate' }
    ],
    items: [
      blk(B('piros', 'kor', true, true), 'ab'),
      blk(B('kek', 'negyzet', true, true), 'ab'),
      blk(B('sarga', 'haromszog', true, true), 'ab'),
      blk(B('zold', 'kor', true, true), 'ab'),
      blk(B('piros', 'negyzet', true, true), 'ab'),
      blk(B('kek', 'haromszog', true, true), 'ab', true),
      blk(B('zold', 'negyzet', true, true), 'ab', true),
      blk(B('sarga', 'kor', true, true), 'ab', true),
      blk(B('piros', 'haromszog', true, true), 'ab', true),
      blk(B('kek', 'kor', true, false), 'one'),
      blk(B('zold', 'haromszog', true, false), 'one'),
      blk(B('sarga', 'negyzet', true, false), 'one'),
      blk(B('piros', 'negyzet', false, true), 'one'),
      blk(B('kek', 'kor', false, true), 'one'),
      blk(B('piros', 'kor', true, false), 'one', true),
      blk(B('sarga', 'haromszog', false, true), 'one', true),
      blk(B('zold', 'negyzet', true, false), 'one', true),
      blk(B('kek', 'haromszog', false, true), 'one', true),
      blk(B('piros', 'kor', false, false), 'out'),
      blk(B('kek', 'haromszog', false, false), 'out'),
      blk(B('sarga', 'negyzet', false, false), 'out'),
      blk(B('zold', 'haromszog', false, false), 'out'),
      blk(B('kek', 'kor', false, false), 'out'),
      blk(B('piros', 'haromszog', false, false), 'out', true),
      blk(B('zold', 'kor', false, false), 'out', true),
      blk(B('sarga', 'kor', false, false), 'out', true),
      blk(B('kek', 'negyzet', false, false), 'out', true)
    ]
  },
  {
    level: 3,
    title: '3. szint: Páros? 300-nál nagyobb?',
    description: 'Két karika: „páros” és „300-nál nagyobb”. Az utolsó számjegy színes.',
    categories: [
      { id: 'a', name: 'csak a „páros” karikába', color: 'rose' },
      { id: 'ab', name: 'a közös részbe', color: 'purple' },
      { id: 'b', name: 'csak a „300-nál nagyobb” karikába', color: 'sky' }
    ],
    items: [
      ...nums([46, 300, 178, 252, 8, 120, 94, 36, 210], 'a'),
      ...nums([302, 450, 376, 498, 314, 500, 340, 422, 368], 'ab'),
      ...nums([301, 355, 417, 499, 333, 461, 309, 485, 377], 'b')
    ]
  }
];

export const VENN_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: VENN_G3_SORTER_LEVELS_LIST[0],
  2: VENN_G3_SORTER_LEVELS_LIST[1],
  3: VENN_G3_SORTER_LEVELS_LIST[2]
};

export const VennG3Sorter: React.FC<VennG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-grp-venn-sorter',
  topicTitle = '2. Venn-diagramok és halmazok – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="valogatasok-csoportositasok"
      topicId={topicId}
      subtopicId="venn-diagramok-es-halmazok"
      title={topicTitle}
      subtitle="Melyik részbe kerül? Válogasd szét!"
      levels={VENN_G3_SORTER_LEVELS}
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

export default VennG3Sorter;
