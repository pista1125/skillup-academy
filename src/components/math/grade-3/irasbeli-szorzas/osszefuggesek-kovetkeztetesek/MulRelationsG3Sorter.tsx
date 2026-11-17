import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { ChangeSmall, BoxesSmall, PriceSmall } from './MulRelationsG3CardFigures';

interface MulRelationsG3SorterProps {
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
    title: '1. szint: Hogyan változik a szorzat?',
    description: 'Nézd meg, mi történt a tényezőkkel!',
    categories: [
      { id: 'x2', name: '2-szeres lesz', color: 'orange' },
      { id: 'x10', name: '10-szeres lesz', color: 'sky' },
      { id: 'same', name: 'Nem változik', color: 'purple' }
    ],
    items: [
      { id: 'mrs1', text: '4 · 5 → 8 · 5', categoryId: 'x2', figure: <ChangeSmall a={4} b={5} a2={8} b2={5} /> },
      { id: 'mrs2', text: '3 · 30 → 6 · 30', categoryId: 'x2', figure: <ChangeSmall a={3} b={30} a2={6} b2={30} /> },
      { id: 'mrs3', text: '7 · 20 → 7 · 40', categoryId: 'x2' },
      { id: 'mrs4', text: '6 · 4 → 6 · 40', categoryId: 'x10', figure: <ChangeSmall a={6} b={4} a2={6} b2={40} /> },
      { id: 'mrs5', text: '8 · 3 → 80 · 3', categoryId: 'x10' },
      { id: 'mrs6', text: '5 · 9 → 5 · 90', categoryId: 'x10', figure: <ChangeSmall a={5} b={9} a2={5} b2={90} /> },
      { id: 'mrs7', text: '4 · 6 → 8 · 3', categoryId: 'same', figure: <ChangeSmall a={4} b={6} a2={8} b2={3} /> },
      { id: 'mrs8', text: '2 · 50 → 50 · 2', categoryId: 'same' },
      { id: 'mrs9', text: '6 · 20 → 3 · 40', categoryId: 'same' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Egyenlő szorzatok',
    description: 'Melyik szorzat mennyi? Használd az okos következtetést!',
    categories: [
      { id: 'p480', name: 'A szorzat 480', color: 'emerald' },
      { id: 'p360', name: 'A szorzat 360', color: 'amber' },
      { id: 'p840', name: 'A szorzat 840', color: 'rose' }
    ],
    items: [
      { id: 'mrs10', text: '240 · 2', categoryId: 'p480', figure: <BoxesSmall n={2} v={240} /> },
      { id: 'mrs11', text: '120 · 4', categoryId: 'p480' },
      { id: 'mrs12', text: '160 · 3', categoryId: 'p480', figure: <BoxesSmall n={3} v={160} /> },
      { id: 'mrs13', text: '180 · 2', categoryId: 'p360', figure: <BoxesSmall n={2} v={180} /> },
      { id: 'mrs14', text: '90 · 4', categoryId: 'p360' },
      { id: 'mrs15', text: '120 · 3', categoryId: 'p360', figure: <BoxesSmall n={3} v={120} /> },
      { id: 'mrs16', text: '420 · 2', categoryId: 'p840', figure: <BoxesSmall n={2} v={420} /> },
      { id: 'mrs17', text: '210 · 4', categoryId: 'p840' },
      { id: 'mrs18', text: '105 · 8', categoryId: 'p840' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyibe kerül?',
    description: 'Hányszor annyit veszel? Válogasd szét az árak szerint!',
    categories: [
      { id: 'f360', name: '360 Ft', color: 'sky' },
      { id: 'f480', name: '480 Ft', color: 'orange' },
      { id: 'f600', name: '600 Ft', color: 'emerald' }
    ],
    items: [
      { id: 'mrs19', text: '2 db 180 Ft → 4 db', categoryId: 'f360', figure: <PriceSmall n1={2} p1={180} n2={4} /> },
      { id: 'mrs20', text: '3 db 120 Ft → 9 db', categoryId: 'f360', figure: <PriceSmall n1={3} p1={120} n2={9} /> },
      { id: 'mrs21', text: '1 db 60 Ft → 6 db', categoryId: 'f360' },
      { id: 'mrs22', text: '2 db 240 Ft → 4 db', categoryId: 'f480', figure: <PriceSmall n1={2} p1={240} n2={4} /> },
      { id: 'mrs23', text: '3 db 160 Ft → 9 db', categoryId: 'f480' },
      { id: 'mrs24', text: '5 db 160 Ft → 15 db', categoryId: 'f480', figure: <PriceSmall n1={5} p1={160} n2={15} /> },
      { id: 'mrs25', text: '2 db 150 Ft → 8 db', categoryId: 'f600', figure: <PriceSmall n1={2} p1={150} n2={8} /> },
      { id: 'mrs26', text: '3 db 200 Ft → 9 db', categoryId: 'f600' },
      { id: 'mrs27', text: '5 db 300 Ft → 10 db', categoryId: 'f600' }
    ]
  }
];

export const MUL_RELATIONS_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const MulRelationsG3Sorter: React.FC<MulRelationsG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-wmul-osszefuggesek-sorter',
  topicTitle = '4. Összefüggések, következtetések – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="irasbeli-szorzas"
      topicId={topicId}
      subtopicId="osszefuggesek-kovetkeztetesek"
      title={topicTitle}
      subtitle="Válogasd szét a szorzásokat!"
      levels={MUL_RELATIONS_G3_SORTER_LEVELS}
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

export default MulRelationsG3Sorter;
