import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface EventProbabilitySorterProps {
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

const EVENT_PROBABILITY_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: 0, 1 vagy közte?",
    description: "Mennyi az esemény valószínűsége?",
    categories: [
      { id: 'z', name: "P = 0", color: 'rose' },
      { id: 'o', name: "P = 1", color: 'emerald' },
      { id: 'm', name: "0 < P < 1", color: 'amber' }
    ],
    items: [
      { id: 'eps1', text: "kocka: 7-est dobunk", categoryId: 'z' },
      { id: 'eps2', text: "két kocka: az összeg 1", categoryId: 'z' },
      { id: 'eps3', text: "három érme: ugyanannyi fej, mint írás", categoryId: 'z' },
      { id: 'eps4', text: "kocka: legfeljebb 6-ot dobunk", categoryId: 'o' },
      { id: 'eps5', text: "két kocka: az összeg kisebb, mint 13", categoryId: 'o' },
      { id: 'eps6', text: "három érme: a fejek száma legfeljebb 3", categoryId: 'o' },
      { id: 'eps7', text: "kocka: páros számot dobunk", categoryId: 'm' },
      { id: 'eps8', text: "két kocka: van hatos", categoryId: 'm' },
      { id: 'eps9', text: "három érme: pontosan egy fej", categoryId: 'm' }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Melyik valószínűség?",
    description: "Csoportosítsd az eseményeket a valószínűségük szerint!",
    categories: [
      { id: 's', name: "1/6", color: 'blue' },
      { id: 'q', name: "1/4", color: 'purple' },
      { id: 'h', name: "1/2", color: 'teal' }
    ],
    items: [
      { id: 'eps10', text: "kocka: 3-ast dobunk", categoryId: 's' },
      { id: 'eps11', text: "két kocka: az összeg 7", categoryId: 's' },
      { id: 'eps12', text: "két kocka: a két dobás egyenlő", categoryId: 's' },
      { id: 'eps13', text: "három érme: mindhárom azonos", categoryId: 'q' },
      { id: 'eps14', text: "két kocka: mindkét dobás páros", categoryId: 'q' },
      { id: 'eps15', text: "társasjáték: legalább 10 lépés", categoryId: 'q' },
      { id: 'eps16', text: "kocka: páratlan számot dobunk", categoryId: 'h' },
      { id: 'eps17', text: "három érme: több fej, mint írás", categoryId: 'h' },
      { id: 'eps18', text: "két kocka: az összeg páros", categoryId: 'h' }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Független vagy kizáró?",
    description: "Milyen kapcsolatban van a két esemény?",
    categories: [
      { id: 'f', name: "függetlenek", color: 'emerald' },
      { id: 'k', name: "kizárják egymást", color: 'rose' },
      { id: 'n', name: "sem nem függetlenek, sem nem kizárók", color: 'amber' }
    ],
    items: [
      { id: 'eps19', text: "két kocka: „fehér hatos” és „fekete hatos”", categoryId: 'f' },
      { id: 'eps20', text: "két kocka: „fehér hatos” és „az összeg 7”", categoryId: 'f' },
      { id: 'eps21', text: "három érme: „mindhárom azonos” és „több fej, mint írás”", categoryId: 'f' },
      { id: 'eps22', text: "két kocka: „az összeg 2” és „van hatos”", categoryId: 'k' },
      { id: 'eps23', text: "kocka: „páros szám” és „5-öst dobunk”", categoryId: 'k' },
      { id: 'eps24', text: "három érme: „mindhárom fej” és „pontosan egy fej”", categoryId: 'k' },
      { id: 'eps25', text: "két kocka: „fehér hatos” és „az összeg 8”", categoryId: 'n' },
      { id: 'eps26', text: "érkezés: „Anna 3.” és „Bea 4.”", categoryId: 'n' },
      { id: 'eps27', text: "két kocka: „fehér hatos” és „van hatos”", categoryId: 'n' }
    ]
  }
};

export const EventProbabilitySorter: React.FC<EventProbabilitySorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-stat-valoszinuseg-sorter',
  topicTitle = "7. Esemény valószínűsége – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="esemeny-valoszinusege"
      title={topicTitle}
      subtitle="Csoportosítsd az eseményeket valószínűségük és kapcsolatuk (független, kizáró) szerint!"
      levels={EVENT_PROBABILITY_SORTER_LEVELS}
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

export default EventProbabilitySorter;
