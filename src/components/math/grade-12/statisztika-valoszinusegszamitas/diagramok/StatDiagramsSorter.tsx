import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface StatDiagramsSorterProps {
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

const STAT_DIAGRAMS_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Melyik diagram?',
    description: 'Melyik diagramtípus illik leginkább a feladathoz vagy a leíráshoz?',
    categories: [
      { id: 'osz', name: 'oszlopdiagram', color: 'blue' },
      { id: 'kor', name: 'kördiagram', color: 'amber' },
      { id: 'dob', name: 'dobozdiagram', color: 'purple' }
    ],
    items: [
      { id: 'sdis1', text: 'havi mosópor-eladások összehasonlítása', categoryId: 'osz' },
      { id: 'sdis2', text: 'egy mozi havi bevételei', categoryId: 'osz' },
      { id: 'sdis3', text: 'a magassága arányos a gyakorisággal (0-tól induló tengelynél)', categoryId: 'osz' },
      { id: 'sdis4', text: 'az egész részeinek aránya, összesen 360°', categoryId: 'kor' },
      { id: 'sdis5', text: 'a februári napi létszámok megoszlása', categoryId: 'kor' },
      { id: 'sdis6', text: 'körcikkek középponti szöge arányos a gyakorisággal', categoryId: 'kor' },
      { id: 'sdis7', text: 'minimum, kvartilisek, medián, maximum', categoryId: 'dob' },
      { id: 'sdis8', text: 'kiugró adatok jelölése külön pontokkal', categoryId: 'dob' },
      { id: 'sdis9', text: 'Tamás edzésidőinek szóródása', categoryId: 'dob' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Melyik negyedbe esik?',
    description: 'Tamás idői: Q₀ = 50,59; Q₁ = 50,62; Q₂ = 50,7; Q₃ = 50,76; Q₄ = 50,81 s. Hová esik az idő?',
    categories: [
      { id: 'lo', name: 'Q₀ és Q₁ közé', color: 'blue' },
      { id: 'mid', name: 'a dobozba (Q₁ és Q₃ közé)', color: 'purple' },
      { id: 'hi', name: 'Q₃ és Q₄ közé', color: 'amber' }
    ],
    items: [
      { id: 'sdis10', text: '50,60 s', categoryId: 'lo' },
      { id: 'sdis11', text: '50,61 s', categoryId: 'lo' },
      { id: 'sdis12', text: '50,595 s', categoryId: 'lo' },
      { id: 'sdis13', text: '50,65 s', categoryId: 'mid' },
      { id: 'sdis14', text: '50,72 s', categoryId: 'mid' },
      { id: 'sdis15', text: '50,68 s', categoryId: 'mid' },
      { id: 'sdis16', text: '50,78 s', categoryId: 'hi' },
      { id: 'sdis17', text: '50,80 s', categoryId: 'hi' },
      { id: 'sdis18', text: '50,79 s', categoryId: 'hi' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Kiugró adat?',
    description: 'Q₁ = 10, Q₃ = 14 (félterjedelem 4). Csoportosítsd az adatokat!',
    categories: [
      { id: 'low', name: 'kiugró (4 alatt)', color: 'rose' },
      { id: 'ok', name: 'nem kiugró (4 és 20 között)', color: 'emerald' },
      { id: 'high', name: 'kiugró (20 felett)', color: 'rose' }
    ],
    items: [
      { id: 'sdis19', text: '3', categoryId: 'low' },
      { id: 'sdis20', text: '−1', categoryId: 'low' },
      { id: 'sdis21', text: '3,9', categoryId: 'low' },
      { id: 'sdis22', text: '4', categoryId: 'ok' },
      { id: 'sdis23', text: '12', categoryId: 'ok' },
      { id: 'sdis24', text: '20', categoryId: 'ok' },
      { id: 'sdis25', text: '21', categoryId: 'high' },
      { id: 'sdis26', text: '20,5', categoryId: 'high' },
      { id: 'sdis27', text: '31', categoryId: 'high' }
    ]
  }
};

export const StatDiagramsSorter: React.FC<StatDiagramsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-stat-diagramok-sorter',
  topicTitle = '3. Diagramok – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="diagramok"
      title={topicTitle}
      subtitle="Rendszerezd a diagramtípusokat, a dobozdiagram negyedeit és a kiugró adatokat!"
      levels={STAT_DIAGRAMS_SORTER_LEVELS}
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

export default StatDiagramsSorter;
