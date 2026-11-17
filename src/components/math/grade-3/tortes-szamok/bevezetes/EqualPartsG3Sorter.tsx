import React from 'react';
import { SorterTemplate, SorterLevelConfig, SorterItem } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { PieCard, BarCard, GridCard, DiagCard } from './EqualPartsG3CardFigures';
import { equalAngles, equalCuts } from './EqualPartsG3Parts';

interface EqualPartsG3SorterProps {
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
const fig = (figure: React.ReactNode, cat: string): SorterItem => ({ id: `eqps${++uid}`, text: '', figure, categoryId: cat });
const txt = (text: string, cat: string): SorterItem => ({ id: `eqps${++uid}`, text, categoryId: cat });
const R = [true];
const red = '#ef4444';

const EQUAL_PARTS_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hány egyenlő rész?',
    description: 'Számold meg a részeket, és tedd a helyére!',
    categories: [
      { id: 'r2', name: '2 egyenlő rész', color: 'sky' },
      { id: 'r3', name: '3 egyenlő rész', color: 'amber' },
      { id: 'r4', name: '4 egyenlő rész', color: 'rose' }
    ],
    items: [
      fig(<PieCard small bounds={equalAngles(2)} />, 'r2'),
      fig(<PieCard small bounds={equalAngles(2, 90)} cake />, 'r2'),
      fig(<BarCard small cuts={equalCuts(2)} />, 'r2'),
      fig(<BarCard small vertical cuts={equalCuts(2)} />, 'r2'),
      fig(<GridCard small rows={1} cols={2} dashed />, 'r2'),
      txt('1-szer félbehajtott lap', 'r2'),
      txt('csík 1 vágással', 'r2'),
      txt('fél alma és még egy fél', 'r2'),
      txt('kettévágott zsemle', 'r2'),
      fig(<PieCard small bounds={equalAngles(3)} />, 'r3'),
      fig(<PieCard small bounds={equalAngles(3, 60)} cake />, 'r3'),
      fig(<BarCard small cuts={equalCuts(3)} />, 'r3'),
      fig(<BarCard small vertical cuts={equalCuts(3)} />, 'r3'),
      fig(<GridCard small rows={3} cols={1} />, 'r3'),
      txt('csík 2 vágással', 'r3'),
      txt('3 gyerek egyenlően osztozik', 'r3'),
      txt('3 egyforma szeletre vágott pizza', 'r3'),
      txt('csokiszelet 3 egyforma darabban', 'r3'),
      fig(<PieCard small bounds={equalAngles(4)} />, 'r4'),
      fig(<PieCard small bounds={equalAngles(4, 45)} cake />, 'r4'),
      fig(<BarCard small cuts={equalCuts(4)} />, 'r4'),
      fig(<GridCard small rows={2} cols={2} dashed />, 'r4'),
      fig(<DiagCard small />, 'r4'),
      txt('2-szer félbehajtott lap', 'r4'),
      txt('csík 3 vágással', 'r4'),
      txt('4 gyerek egyenlően osztozik', 'r4'),
      txt('kétszer átvágott torta, keresztben', 'r4')
    ]
  },
  {
    level: 2,
    title: '2. szint: Egyenlők a részek?',
    description: 'Ugyanakkorák a részek? Vagy nincs is felvágva?',
    categories: [
      { id: 'eq', name: 'egyenlő részek', color: 'emerald' },
      { id: 'neq', name: 'nem egyenlő részek', color: 'rose' },
      { id: 'whole', name: '1 egész, nincs felvágva', color: 'sky' }
    ],
    items: [
      fig(<PieCard small bounds={equalAngles(6)} />, 'eq'),
      fig(<PieCard small bounds={equalAngles(5)} cake />, 'eq'),
      fig(<BarCard small cuts={equalCuts(4)} />, 'eq'),
      fig(<GridCard small rows={2} cols={3} />, 'eq'),
      fig(<DiagCard small />, 'eq'),
      fig(<BarCard small vertical cuts={equalCuts(5)} />, 'eq'),
      txt('egyforma szeletekre vágott torta', 'eq'),
      txt('pontosan félbehajtott lap', 'eq'),
      txt('igazságosan elosztott pizza', 'eq'),
      fig(<PieCard small bounds={[0, 200, 290, 360]} />, 'neq'),
      fig(<PieCard small bounds={[30, 90, 230, 300, 390]} cake />, 'neq'),
      fig(<BarCard small cuts={[0.15, 0.6]} />, 'neq'),
      fig(<BarCard small cuts={[0.3, 0.45, 0.8]} />, 'neq'),
      fig(<BarCard small vertical cuts={[0.25, 0.85]} />, 'neq'),
      txt('egy nagy és egy kicsi szelet', 'neq'),
      txt('ferdén kettétört csoki', 'neq'),
      txt('egyik szelet vastag, a másik vékony', 'neq'),
      txt('nem pont középen hajtott lap', 'neq'),
      fig(<PieCard small bounds={[0, 360]} />, 'whole'),
      fig(<PieCard small bounds={[0, 360]} cake />, 'whole'),
      fig(<BarCard small cuts={[]} />, 'whole'),
      fig(<BarCard small vertical cuts={[]} />, 'whole'),
      fig(<GridCard small rows={1} cols={1} />, 'whole'),
      txt('egész kenyér', 'whole'),
      txt('felvágatlan torta', 'whole'),
      txt('egy egész alma', 'whole'),
      txt('ki nem nyitott, sima lap', 'whole')
    ]
  },
  {
    level: 3,
    title: '3. szint: Mi a neve a piros résznek?',
    description: 'Hány egyenlő részre osztottuk az egészet?',
    categories: [
      { id: 'n2', name: '1 ketted', color: 'sky' },
      { id: 'n4', name: '1 negyed', color: 'amber' },
      { id: 'n8', name: '1 nyolcad', color: 'violet' }
    ],
    items: [
      fig(<PieCard small bounds={equalAngles(2)} colored={R} color={red} />, 'n2'),
      fig(<BarCard small cuts={equalCuts(2)} colored={R} color={red} />, 'n2'),
      fig(<BarCard small vertical cuts={equalCuts(2)} colored={R} color={red} />, 'n2'),
      fig(<GridCard small rows={2} cols={1} colored={R} color={red} />, 'n2'),
      txt('fél', 'n2'),
      txt('2 egyenlő részből 1', 'n2'),
      txt('1-szer félbehajtott lap egyik része', 'n2'),
      txt('fél zsemle', 'n2'),
      txt('a kettévágott alma egyik fele', 'n2'),
      fig(<PieCard small bounds={equalAngles(4)} colored={R} color={red} />, 'n4'),
      fig(<BarCard small cuts={equalCuts(4)} colored={R} color={red} />, 'n4'),
      fig(<GridCard small rows={2} cols={2} colored={R} color={red} />, 'n4'),
      fig(<DiagCard small colored={R} />, 'n4'),
      txt('4 egyenlő részből 1', 'n4'),
      txt('2-szer félbehajtott lap egyik része', 'n4'),
      txt('egy szelet, ha 4-en osztoztok', 'n4'),
      txt('a fél fele', 'n4'),
      txt('a 4 szeletes pizza 1 szelete', 'n4'),
      fig(<PieCard small bounds={equalAngles(8)} colored={R} color={red} />, 'n8'),
      fig(<GridCard small rows={2} cols={4} colored={R} color={red} />, 'n8'),
      fig(<BarCard small vertical cuts={equalCuts(8)} colored={R} color={red} />, 'n8'),
      fig(<PieCard small bounds={equalAngles(8, 22.5)} colored={R} color={red} cake />, 'n8'),
      txt('8 egyenlő részből 1', 'n8'),
      txt('3-szor félbehajtott lap egyik része', 'n8'),
      txt('egy szelet, ha 8-an osztoztok', 'n8'),
      txt('a negyed fele', 'n8'),
      txt('a 8 szeletes pizza 1 szelete', 'n8')
    ]
  }
];

export const EQUAL_PARTS_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: EQUAL_PARTS_G3_SORTER_LEVELS_LIST[0],
  2: EQUAL_PARTS_G3_SORTER_LEVELS_LIST[1],
  3: EQUAL_PARTS_G3_SORTER_LEVELS_LIST[2]
};

export const EqualPartsG3Sorter: React.FC<EqualPartsG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-frac-reszek-sorter',
  topicTitle = '1. Egyenlő részekre osztás – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="tortes-szamok"
      topicId={topicId}
      subtopicId="bevezetes"
      title={topicTitle}
      subtitle="Tedd a felvágott egészeket a helyükre!"
      levels={EQUAL_PARTS_G3_SORTER_LEVELS}
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

export default EqualPartsG3Sorter;
