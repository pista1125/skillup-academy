import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface NumberTheoryPracticeExamSorterProps {
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

const NUMBER_THEORY_EXAM_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Melyik oszthatósági szabály teljesül?',
    description: 'Minden szám a három osztó közül pontosan eggyel osztható. Melyikkel?',
    categories: [
      { id: 'd4', name: 'Osztható 4-gyel', color: 'blue' },
      { id: 'd9', name: 'Osztható 9-cel', color: 'emerald' },
      { id: 'd25', name: 'Osztható 25-tel', color: 'amber' }
    ],
    items: [
      { id: 'ntes1', text: '13 516', categoryId: 'd4' },
      { id: 'ntes2', text: '7372', categoryId: 'd4' },
      { id: 'ntes3', text: '10 504', categoryId: 'd4' },
      { id: 'ntes4', text: '11 385', categoryId: 'd9' },
      { id: 'ntes5', text: '2349', categoryId: 'd9' },
      { id: 'ntes6', text: '70 101', categoryId: 'd9' },
      { id: 'ntes7', text: '4175', categoryId: 'd25' },
      { id: 'ntes8', text: '13 550', categoryId: 'd25' },
      { id: 'ntes9', text: '7025', categoryId: 'd25' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Milyen a szám tizedes tört alakja?',
    description: 'Egyszerűsíts, vizsgáld a nevező prímtényezőit, és ismerd fel az irracionális számokat!',
    categories: [
      { id: 'fin', name: 'Véges tizedes tört', color: 'teal' },
      { id: 'rep', name: 'Végtelen szakaszos tizedes tört', color: 'violet' },
      { id: 'irr', name: 'Végtelen, nem szakaszos (irracionális)', color: 'rose' }
    ],
    items: [
      { id: 'ntes10', text: '21/28', categoryId: 'fin' },
      { id: 'ntes11', text: '49/32', categoryId: 'fin' },
      { id: 'ntes12', text: '√(0,09)', categoryId: 'fin' },
      { id: 'ntes13', text: '25/15', categoryId: 'rep' },
      { id: 'ntes14', text: '38/22', categoryId: 'rep' },
      { id: 'ntes15', text: '12/9', categoryId: 'rep' },
      { id: 'ntes16', text: '√8', categoryId: 'irr' },
      { id: 'ntes17', text: '16π', categoryId: 'irr' },
      { id: 'ntes18', text: '0,12112211122211112222…', categoryId: 'irr' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Az állítás és a megfordítása',
    description: 'Döntsd el, igaz-e az állítás, és ha igen, igaz-e a megfordítása is!',
    categories: [
      { id: 'tt', name: 'Igaz, és a megfordítása is igaz', color: 'emerald' },
      { id: 'tf', name: 'Igaz, de a megfordítása hamis', color: 'amber' },
      { id: 'f', name: 'Az állítás hamis', color: 'rose' }
    ],
    items: [
      { id: 'ntes19', text: 'Ha 10 | n, akkor 2 | n és 5 | n.', categoryId: 'tt' },
      { id: 'ntes20', text: 'Ha egy pozitív egész négyzetszám, akkor páratlan sok pozitív osztója van.', categoryId: 'tt' },
      { id: 'ntes21', text: 'Ha egy egyszerűsített tört nevezőjében csak 2 és 5 a prímtényező, akkor tizedes tört alakja véges.', categoryId: 'tt' },
      { id: 'ntes22', text: 'Ha 10 | n, akkor 5 | n.', categoryId: 'tf' },
      { id: 'ntes23', text: 'Ha 48 | n, akkor 6 | n és 8 | n.', categoryId: 'tf' },
      { id: 'ntes24', text: 'Ha a és b különböző prímszámok, akkor relatív prímek.', categoryId: 'tf' },
      { id: 'ntes25', text: 'Ha 6 | n és 8 | n, akkor 48 | n.', categoryId: 'f' },
      { id: 'ntes26', text: 'Ha p és q prímszám, akkor p + q páros.', categoryId: 'f' },
      { id: 'ntes27', text: 'Ha egy szám irracionális, akkor a négyzete is irracionális.', categoryId: 'f' }
    ]
  }
};

export const NumberTheoryPracticeExamSorter: React.FC<NumberTheoryPracticeExamSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-num-tudasproba-sorter',
  topicTitle = '11. Gyakorlás, tudáspróba – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="szamelmelet"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Rendszerezd a számokat oszthatóság és tizedes tört alak szerint, az állításokat pedig logikai értékük szerint!"
      levels={NUMBER_THEORY_EXAM_SORTER_LEVELS}
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

export default NumberTheoryPracticeExamSorter;
