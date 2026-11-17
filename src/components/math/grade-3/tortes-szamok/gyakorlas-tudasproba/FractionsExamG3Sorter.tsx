import React from 'react';
import { SorterTemplate, SorterLevelConfig, SorterItem } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SmallPie, SmallBar, SmallGrid } from './FractionsExamG3CardFigures';
import { SortClock, SortStrip } from '../osszehasonlitas/FractionAmountsG3CardFigures';

interface FractionsExamG3SorterProps {
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
const fig = (figure: React.ReactNode, cat: string): SorterItem => ({ id: `fexs${++uid}`, text: '', figure, categoryId: cat });
const txt = (text: string, cat: string): SorterItem => ({ id: `fexs${++uid}`, text, categoryId: cat });

const LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mi a rész neve?',
    description: 'Hány egyenlő részre osztottuk az egészet?',
    categories: [
      { id: 'h3', name: '1 harmad', color: 'emerald' },
      { id: 'h4', name: '1 negyed', color: 'sky' },
      { id: 'h6', name: '1 hatod', color: 'violet' }
    ],
    items: [
      fig(<SmallPie n={3} k={1} />, 'h3'),
      fig(<SmallBar n={3} k={1} />, 'h3'),
      fig(<SmallBar n={3} k={1} vertical />, 'h3'),
      fig(<SortClock min={20} />, 'h3'),
      txt('3 egyenlő részből 1', 'h3'),
      txt('lila rúdnak a rózsaszín része', 'h3'),
      txt('20 perc az 1 órából', 'h3'),
      txt('3 egyforma szelet egyike', 'h3'),
      txt('1 m-ből 3 egyenlő darab egyike', 'h3'),
      fig(<SmallPie n={4} k={1} />, 'h4'),
      fig(<SmallBar n={4} k={1} />, 'h4'),
      fig(<SmallGrid rows={2} cols={2} k={1} />, 'h4'),
      fig(<SortClock min={15} />, 'h4'),
      txt('4 egyenlő részből 1', 'h4'),
      txt('kétszer félbehajtott lap egy része', 'h4'),
      txt('15 perc az 1 órából', 'h4'),
      txt('25 dkg az 1 kg-ból', 'h4'),
      txt('bordó rúdnak a rózsaszín része', 'h4'),
      fig(<SmallPie n={6} k={1} />, 'h6'),
      fig(<SmallBar n={6} k={1} vertical />, 'h6'),
      fig(<SmallGrid rows={2} cols={3} k={1} />, 'h6'),
      fig(<SortClock min={10} />, 'h6'),
      txt('6 egyenlő részből 1', 'h6'),
      txt('lila rúdnak a fehér kocka', 'h6'),
      txt('10 perc az 1 órából', 'h6'),
      txt('6 egyforma szelet egyike', 'h6'),
      txt('6 gyerek egyikének a része', 'h6')
    ]
  },
  {
    level: 2,
    title: '2. szint: Több vagy kevesebb, mint a fele?',
    description: 'Hasonlítsd össze a színes részt az 1 kettedel!',
    categories: [
      { id: 'lt', name: 'kevesebb, mint 1 ketted', color: 'sky' },
      { id: 'eq', name: 'pont 1 ketted', color: 'amber' },
      { id: 'gt', name: 'több, mint 1 ketted', color: 'rose' }
    ],
    items: [
      fig(<SmallPie n={4} k={1} />, 'lt'),
      fig(<SmallBar n={8} k={3} />, 'lt'),
      fig(<SmallBar n={10} k={2} />, 'lt'),
      fig(<SmallPie n={6} k={2} />, 'lt'),
      txt('1 harmad', 'lt'),
      txt('1 tized', 'lt'),
      txt('2 ötöd', 'lt'),
      txt('3 nyolcad', 'lt'),
      txt('1 nyolcad', 'lt'),
      fig(<SmallPie n={4} k={2} />, 'eq'),
      fig(<SmallBar n={8} k={4} />, 'eq'),
      fig(<SmallBar n={10} k={5} />, 'eq'),
      fig(<SmallPie n={6} k={3} />, 'eq'),
      txt('2 negyed', 'eq'),
      txt('5 tized', 'eq'),
      txt('3 hatod', 'eq'),
      txt('4 nyolcad', 'eq'),
      txt('fél', 'eq'),
      fig(<SmallPie n={4} k={3} />, 'gt'),
      fig(<SmallBar n={8} k={5} />, 'gt'),
      fig(<SmallBar n={10} k={7} />, 'gt'),
      fig(<SmallPie n={6} k={4} />, 'gt'),
      txt('3 negyed', 'gt'),
      txt('4 ötöd', 'gt'),
      txt('5 hatod', 'gt'),
      txt('7 nyolcad', 'gt'),
      txt('2 harmad', 'gt')
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi egy rész?',
    description: 'Oszd el, vagy keresd meg az egészet!',
    categories: [
      { id: 'v100', name: '100', color: 'emerald' },
      { id: 'v50', name: '50', color: 'amber' },
      { id: 'v25', name: '25', color: 'sky' }
    ],
    items: [
      fig(<SortStrip top={200} n={2} />, 'v100'),
      fig(<SortStrip top={400} n={4} />, 'v100'),
      fig(<SortStrip top={500} n={5} />, 'v100'),
      fig(<SortStrip top={1000} n={10} />, 'v100'),
      txt('a 300 harmada', 'v100'),
      txt('a 600 hatoda', 'v100'),
      txt('a 800 nyolcada', 'v100'),
      txt('Ha a fele 50, mennyi az egész?', 'v100'),
      txt('Ha a negyede 25, mennyi az egész?', 'v100'),
      fig(<SortStrip top={100} n={2} />, 'v50'),
      fig(<SortStrip top={150} n={3} />, 'v50'),
      fig(<SortStrip top={250} n={5} />, 'v50'),
      fig(<SortStrip top={500} n={10} />, 'v50'),
      txt('a 200 negyede', 'v50'),
      txt('a 300 hatoda', 'v50'),
      txt('a 400 nyolcada', 'v50'),
      txt('Ha a fele 25, mennyi az egész?', 'v50'),
      txt('Ha a tizede 5, mennyi az egész?', 'v50'),
      fig(<SortStrip top={50} n={2} />, 'v25'),
      fig(<SortStrip top={75} n={3} />, 'v25'),
      fig(<SortStrip top={200} n={8} />, 'v25'),
      fig(<SortStrip top={250} n={10} />, 'v25'),
      txt('a 125 ötöde', 'v25'),
      txt('a 150 hatoda', 'v25'),
      txt('a 100 negyede', 'v25'),
      txt('az 1 m negyede, cm-ben', 'v25'),
      txt('a negyed kg, dkg-ban', 'v25')
    ]
  }
];

export const FRACTIONS_EXAM_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const FractionsExamG3Sorter: React.FC<FractionsExamG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-frac-tudasproba-sorter',
  topicTitle = '4. Gyakorlás, tudáspróba – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="tortes-szamok"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Tedd a kártyákat a jó dobozba!"
      levels={FRACTIONS_EXAM_G3_SORTER_LEVELS}
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

export default FractionsExamG3Sorter;
