import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface EventAlgebraSorterProps {
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

const EVENT_ALGEBRA_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Venn-tartományok",
    description: "H = {1; 2; …; 20}, A: páros, B: 3-mal osztható. Melyik tartományba esik a szám?",
    categories: [
      { id: 'ab', name: "A · B", color: 'purple' },
      { id: 'a', name: "A · B̄ (csak A)", color: 'blue' },
      { id: 'b', name: "Ā · B (csak B)", color: 'rose' }
    ],
    items: [
      { id: 'eas1', text: "6", categoryId: 'ab' },
      { id: 'eas2', text: "12", categoryId: 'ab' },
      { id: 'eas3', text: "18", categoryId: 'ab' },
      { id: 'eas4', text: "4", categoryId: 'a' },
      { id: 'eas5', text: "10", categoryId: 'a' },
      { id: 'eas6', text: "16", categoryId: 'a' },
      { id: 'eas7', text: "3", categoryId: 'b' },
      { id: 'eas8', text: "9", categoryId: 'b' },
      { id: 'eas9', text: "15", categoryId: 'b' }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Világít-e a lámpa?",
    description: "A sorosan, B és C párhuzamosan kapcsolva. Mit tudunk a lámpáról, ha az esemény bekövetkezik?",
    categories: [
      { id: 'v', name: "biztosan világít", color: 'emerald' },
      { id: 'n', name: "biztosan nem világít", color: 'rose' },
      { id: 'd', name: "nem dönthető el", color: 'amber' }
    ],
    items: [
      { id: 'eas10', text: "A · B", categoryId: 'v' },
      { id: 'eas11', text: "A · C", categoryId: 'v' },
      { id: 'eas12', text: "A · B · C", categoryId: 'v' },
      { id: 'eas13', text: "Ā", categoryId: 'n' },
      { id: 'eas14', text: "B̄ · C̄", categoryId: 'n' },
      { id: 'eas15', text: "Ā · B · C", categoryId: 'n' },
      { id: 'eas16', text: "B · C", categoryId: 'd' },
      { id: 'eas17', text: "A", categoryId: 'd' },
      { id: 'eas18', text: "B + C", categoryId: 'd' }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Igaz vagy hamis?",
    description: "Válogasd szét az állításokat!",
    categories: [
      { id: 't', name: "mindig igaz", color: 'emerald' },
      { id: 'f', name: "hamis", color: 'rose' },
      { id: 'x', name: "pontosan akkor igaz, ha A és B kizárják egymást", color: 'amber' }
    ],
    items: [
      { id: 'eas19', text: "A · Ā a lehetetlen esemény.", categoryId: 't' },
      { id: 'eas20', text: "A + Ā a biztos esemény.", categoryId: 't' },
      { id: 'eas21', text: "|A + B| = |A| + |B| − |A · B|", categoryId: 't' },
      { id: 'eas22', text: "A + B mindig a biztos esemény.", categoryId: 'f' },
      { id: 'eas23', text: "Az A + B komplementere Ā + B̄.", categoryId: 'f' },
      { id: 'eas24', text: "Az A · B mindig több elemi eseményből áll, mint A.", categoryId: 'f' },
      { id: 'eas25', text: "|A + B| = |A| + |B|", categoryId: 'x' },
      { id: 'eas26', text: "A · B a lehetetlen esemény.", categoryId: 'x' },
      { id: 'eas27', text: "Az A része a B̄ eseménynek.", categoryId: 'x' }
    ]
  }
};

export const EventAlgebraSorter: React.FC<EventAlgebraSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-stat-esemenyalgebra-sorter',
  topicTitle = "6. Események összege és szorzata – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="esemenyek-osszege-es-szorzata"
      title={topicTitle}
      subtitle="Rendszerezd a Venn-tartományokat, az áramkör állapotait és az eseményalgebrai állításokat!"
      levels={EVENT_ALGEBRA_SORTER_LEVELS}
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

export default EventAlgebraSorter;
