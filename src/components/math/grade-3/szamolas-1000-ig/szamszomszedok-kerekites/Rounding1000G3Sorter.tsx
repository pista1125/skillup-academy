import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortLine } from './Rounding1000G3CardFigures';
import { SortCards } from '../szamok-1000-ig/Numbers1000G3CardFigures';

interface Rounding1000G3SorterProps {
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
    title: '1. szint: Százasra kerekítve',
    description: 'Kerekítsd százasra! Melyik dobozba kerül?',
    categories: [
      { id: 'h700', name: '≈ 700', color: 'sky' },
      { id: 'h800', name: '≈ 800', color: 'amber' },
      { id: 'h900', name: '≈ 900', color: 'emerald' }
    ],
    items: [
      { id: 'r1000s1', text: '', figure: <SortLine lo={600} v={680} />, categoryId: 'h700' },
      { id: 'r1000s2', text: '', figure: <SortLine lo={700} v={720} />, categoryId: 'h700' },
      { id: 'r1000s3', text: '749', categoryId: 'h700' },
      { id: 'r1000s4', text: '', figure: <SortLine lo={700} v={780} />, categoryId: 'h800' },
      { id: 'r1000s5', text: '', figure: <SortLine lo={800} v={820} />, categoryId: 'h800' },
      { id: 'r1000s6', text: '751', categoryId: 'h800' },
      { id: 'r1000s7', text: '', figure: <SortLine lo={800} v={880} />, categoryId: 'h900' },
      { id: 'r1000s8', text: '', figure: <SortLine lo={900} v={920} />, categoryId: 'h900' },
      { id: 'r1000s9', text: '949', categoryId: 'h900' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Tízesre – le, fel vagy marad?',
    description: 'Nézd az egyest! 0: marad, 1–4: le, 5–9: fel.',
    categories: [
      { id: 'down', name: 'Lefelé kerekítünk', color: 'sky' },
      { id: 'up', name: 'Felfelé kerekítünk', color: 'orange' },
      { id: 'stay', name: 'Marad, mert kerek tízes', color: 'emerald' }
    ],
    items: [
      { id: 'r1000s10', text: '', figure: <SortCards digits={['6', '4', '2']} />, categoryId: 'down' },
      { id: 'r1000s11', text: '', figure: <SortCards digits={['9', '9', '3']} />, categoryId: 'down' },
      { id: 'r1000s12', text: '871', categoryId: 'down' },
      { id: 'r1000s13', text: '', figure: <SortCards digits={['3', '0', '5']} />, categoryId: 'up' },
      { id: 'r1000s14', text: '', figure: <SortCards digits={['9', '9', '7']} />, categoryId: 'up' },
      { id: 'r1000s15', text: '548', categoryId: 'up' },
      { id: 'r1000s16', text: '', figure: <SortCards digits={['7', '8', '0']} />, categoryId: 'stay' },
      { id: 'r1000s17', text: '', figure: <SortCards digits={['1', '0', '0', '0']} />, categoryId: 'stay' },
      { id: 'r1000s18', text: '450', categoryId: 'stay' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Letakart jegy – százasra 600?',
    description: 'Egy jegy le van takarva. Százasra kerekítve 600 lesz?',
    categories: [
      { id: 'sure', name: 'Biztosan ≈ 600', color: 'teal' },
      { id: 'maybe', name: 'Lehet, de nem biztos', color: 'purple' },
      { id: 'never', name: 'Biztosan nem ≈ 600', color: 'rose' }
    ],
    items: [
      { id: 'r1000s19', text: '', figure: <SortCards digits={['5', '9', '?']} />, categoryId: 'sure' },
      { id: 'r1000s20', text: '', figure: <SortCards digits={['6', '0', '?']} />, categoryId: 'sure' },
      { id: 'r1000s21', text: '', figure: <SortCards digits={['6', '4', '?']} />, categoryId: 'sure' },
      { id: 'r1000s22', text: '', figure: <SortCards digits={['6', '?', '2']} />, categoryId: 'maybe' },
      { id: 'r1000s23', text: '', figure: <SortCards digits={['5', '?', '8']} />, categoryId: 'maybe' },
      { id: 'r1000s24', text: '', figure: <SortCards digits={['?', '2', '0']} />, categoryId: 'maybe' },
      { id: 'r1000s25', text: '', figure: <SortCards digits={['7', '?', '1']} />, categoryId: 'never' },
      { id: 'r1000s26', text: '', figure: <SortCards digits={['5', '4', '?']} />, categoryId: 'never' },
      { id: 'r1000s27', text: '', figure: <SortCards digits={['6', '5', '?']} />, categoryId: 'never' }
    ]
  }
];

export const ROUNDING_1000_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const Rounding1000G3Sorter: React.FC<Rounding1000G3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-c1000-kerekites-sorter',
  topicTitle = '2. Számszomszédok, kerekítés – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="szamolas-1000-ig"
      topicId={topicId}
      subtopicId="szamszomszedok-kerekites"
      title={topicTitle}
      subtitle="Válogasd szét a számokat a kerekítésük szerint!"
      levels={ROUNDING_1000_G3_SORTER_LEVELS}
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

export default Rounding1000G3Sorter;
