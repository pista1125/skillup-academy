import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface NegativeChangesSorterProps {
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

const NEG_CHANGES_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hol van a −3-hoz és a 3-hoz képest?',
    description: 'Kisebb a −3-nál, a −3 és a 3 között van, vagy nagyobb a 3-nál?',
    categories: [
      { id: 'lt', name: 'A −3-nál kisebb', color: 'blue' },
      { id: 'mid', name: 'A −3 és a 3 között', color: 'amber' },
      { id: 'gt', name: 'A 3-nál nagyobb', color: 'rose' }
    ],
    items: [
      { id: 'nc3s1', text: '−14', categoryId: 'lt' },
      { id: 'nc3s2', text: '−8', categoryId: 'lt' },
      { id: 'nc3s3', text: '−5', categoryId: 'lt' },
      { id: 'nc3s4', text: '−2', categoryId: 'mid' },
      { id: 'nc3s5', text: '0', categoryId: 'mid' },
      { id: 'nc3s6', text: '2', categoryId: 'mid' },
      { id: 'nc3s7', text: '8', categoryId: 'gt' },
      { id: 'nc3s8', text: '11', categoryId: 'gt' },
      { id: 'nc3s9', text: '4', categoryId: 'gt' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyit változott a hőmérséklet?',
    description: 'Számold ki, hány fokot változott, és tedd a megfelelő csoportba!',
    categories: [
      { id: 'small', name: '1–9 fokot', color: 'teal' },
      { id: 'mid', name: '10–19 fokot', color: 'purple' },
      { id: 'big', name: '20 vagy több fokot', color: 'emerald' }
    ],
    items: [
      { id: 'nc3s10', text: '−51 °C → −54 °C', categoryId: 'small' },
      { id: 'nc3s11', text: '−36 °C → −45 °C', categoryId: 'small' },
      { id: 'nc3s12', text: '−5 °C → 2 °C', categoryId: 'small' },
      { id: 'nc3s13', text: '−4 °C → −19 °C', categoryId: 'mid' },
      { id: 'nc3s14', text: '−11 °C → 3 °C', categoryId: 'mid' },
      { id: 'nc3s15', text: '−17 °C → −7 °C', categoryId: 'mid' },
      { id: 'nc3s16', text: '−1 °C → −21 °C', categoryId: 'big' },
      { id: 'nc3s17', text: '−8 °C → −36 °C', categoryId: 'big' },
      { id: 'nc3s18', text: '−19 °C → −45 °C', categoryId: 'big' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi a vagyon törlesztés után?',
    description: 'Vond le az adósságot a készpénzből! Marad pénz, nulla lesz, vagy adósság marad?',
    categories: [
      { id: 'pos', name: 'Marad pénze (pozitív)', color: 'rose' },
      { id: 'zero', name: 'Nincs se pénze, se adóssága (0)', color: 'amber' },
      { id: 'neg', name: 'Adósság marad (negatív)', color: 'blue' }
    ],
    items: [
      { id: 'nc3s19', text: '7 fabatka, 2 adósságcédula', categoryId: 'pos' },
      { id: 'nc3s20', text: '6 fabatka, 3 adósságcédula', categoryId: 'pos' },
      { id: 'nc3s21', text: '500 Ft és 200 Ft adósság', categoryId: 'pos' },
      { id: 'nc3s22', text: '2 fabatka, 2 adósságcédula', categoryId: 'zero' },
      { id: 'nc3s23', text: '5 fabatka, 5 adósságcédula', categoryId: 'zero' },
      { id: 'nc3s24', text: '100 Ft és 100 Ft adósság', categoryId: 'zero' },
      { id: 'nc3s25', text: '9 fabatka, 10 adósságcédula', categoryId: 'neg' },
      { id: 'nc3s26', text: '9 fabatka, 13 adósságcédula', categoryId: 'neg' },
      { id: 'nc3s27', text: '50 Ft és 2080 Ft adósság', categoryId: 'neg' }
    ]
  }
];

const NEG_CHANGES_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: NEG_CHANGES_SORTER_LEVELS_LIST[0],
  2: NEG_CHANGES_SORTER_LEVELS_LIST[1],
  3: NEG_CHANGES_SORTER_LEVELS_LIST[2]
};

export const NegativeChangesSorter: React.FC<NegativeChangesSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-neg-valtozasok-sorter',
  topicTitle = '3. Összehasonlítás és változások – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="negativ-szamok"
      topicId={topicId}
      subtopicId="osszehasonlitas-es-valtozasok"
      title={topicTitle}
      subtitle="Csoportosítsd a számokat, a hőmérséklet-változásokat és a pénztárcákat!"
      levels={NEG_CHANGES_SORTER_LEVELS}
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

export default NegativeChangesSorter;
