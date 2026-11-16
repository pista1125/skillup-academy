import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SampleSpaceSorterProps {
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

const SAMPLE_SPACE_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Biztos vagy lehetetlen?",
    description: "Egy dobókockával egyszer dobunk. Csoportosítsd az eseményeket!",
    categories: [
      { id: 'b', name: "biztos esemény", color: 'emerald' },
      { id: 'l', name: "lehetetlen esemény", color: 'rose' },
      { id: 'n', name: "egyik sem", color: 'amber' }
    ],
    items: [
      { id: 'sss1', text: "a dobott szám legfeljebb 6", categoryId: 'b' },
      { id: 'sss2', text: "1 és 6 közötti egész számot dobunk", categoryId: 'b' },
      { id: 'sss3', text: "nem dobunk 7-est", categoryId: 'b' },
      { id: 'sss4', text: "7-est dobunk", categoryId: 'l' },
      { id: 'sss5', text: "0-t dobunk", categoryId: 'l' },
      { id: 'sss6', text: "6-nál nagyobb számot dobunk", categoryId: 'l' },
      { id: 'sss7', text: "páros számot dobunk", categoryId: 'n' },
      { id: 'sss8', text: "prímszámot dobunk", categoryId: 'n' },
      { id: 'sss9', text: "6-ost dobunk", categoryId: 'n' }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Hány elemi esemény?",
    description: "Fehér és fekete kockával dobunk. Hány elemi esemény tartozik az eseményhez?",
    categories: [
      { id: 'e5', name: "5 elemi esemény", color: 'blue' },
      { id: 'e6', name: "6 elemi esemény", color: 'purple' },
      { id: 'e10', name: "10 elemi esemény", color: 'teal' }
    ],
    items: [
      { id: 'sss10', text: "a dobások összege 8", categoryId: 'e5' },
      { id: 'sss11', text: "a dobások összege 6", categoryId: 'e5' },
      { id: 'sss12', text: "a fehér dobás 1-gyel nagyobb a feketénél", categoryId: 'e5' },
      { id: 'sss13', text: "a két dobás egyenlő", categoryId: 'e6' },
      { id: 'sss14', text: "a dobások szorzata prím", categoryId: 'e6' },
      { id: 'sss15', text: "a dobások összege 7", categoryId: 'e6' },
      { id: 'sss16', text: "pontosan az egyik dobás hatos", categoryId: 'e10' },
      { id: 'sss17', text: "a dobások szorzata nagyobb, mint 16", categoryId: 'e10' },
      { id: 'sss18', text: "a két dobás eltérése pontosan 1", categoryId: 'e10' }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Milyen eseménypár?",
    description: "Döntsd el, milyen kapcsolatban van a két esemény!",
    categories: [
      { id: 'k', name: "komplementerek", color: 'emerald' },
      { id: 'x', name: "kizárók, de nem komplementerek", color: 'amber' },
      { id: 'e', name: "bekövetkezhetnek egyszerre", color: 'rose' }
    ],
    items: [
      { id: 'sss19', text: "két kocka: „van hatos” és „egyik sem hatos”", categoryId: 'k' },
      { id: 'sss20', text: "két kocka: „szorzat > 16” és „összeg < 9”", categoryId: 'k' },
      { id: 'sss21', text: "három érme: „10 Ft-os fej” és „10 Ft-os írás”", categoryId: 'k' },
      { id: 'sss22', text: "két kocka: „mindkettő hatos” és „egyik sem hatos”", categoryId: 'x' },
      { id: 'sss23', text: "két kocka: „szorzat prím” és „a két dobás egyenlő”", categoryId: 'x' },
      { id: 'sss24', text: "egy kocka: „páros szám” és „5-öst dobunk”", categoryId: 'x' },
      { id: 'sss25', text: "két kocka: „van hatos” és „az összeg 12”", categoryId: 'e' },
      { id: 'sss26', text: "„Bea kezdi a 2. játékot” és „mindkettőt Bea kezdi”", categoryId: 'e' },
      { id: 'sss27', text: "egy kocka: „páros szám” és „prímszám”", categoryId: 'e' }
    ]
  }
};

export const SampleSpaceSorter: React.FC<SampleSpaceSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-stat-esemenyter-sorter',
  topicTitle = "5. Az eseménytér – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="az-esemenyter"
      title={topicTitle}
      subtitle="Válogasd szét a biztos és lehetetlen eseményeket, az elemszámokat és az eseménypárokat!"
      levels={SAMPLE_SPACE_SORTER_LEVELS}
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

export default SampleSpaceSorter;
