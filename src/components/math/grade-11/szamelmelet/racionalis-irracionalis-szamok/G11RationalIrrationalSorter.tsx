import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface G11RationalIrrationalSorterProps {
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

const RATIONAL_IRRATIONAL_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Természetes, racionális vagy irracionális?',
    description: 'Számold ki fejben, és sorold be a számot a legszűkebb illő csoportba!',
    categories: [
      { id: 'nat', name: 'Természetes szám', color: 'emerald' },
      { id: 'rat', name: 'Racionális, de nem természetes', color: 'sky' },
      { id: 'irr', name: 'Irracionális', color: 'purple' }
    ],
    items: [
      { id: 'ris1', text: '√144', categoryId: 'nat' },
      { id: 'ris2', text: '8⁰', categoryId: 'nat' },
      { id: 'ris3', text: '√(81 · 225)', categoryId: 'nat' },
      { id: 'ris4', text: '−7', categoryId: 'rat' },
      { id: 'ris5', text: '20,5', categoryId: 'rat' },
      { id: 'ris6', text: '0,2727… = 0,(27)', categoryId: 'rat' },
      { id: 'ris7', text: '16π', categoryId: 'irr' },
      { id: 'ris8', text: '√2', categoryId: 'irr' },
      { id: 'ris9', text: '0,121122111222…', categoryId: 'irr' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Milyen a tizedes tört alakja?',
    description: 'Számolás nélkül döntsd el, milyen tizedes tört alakban írható fel a szám!',
    categories: [
      { id: 'fin', name: 'Véges tizedes tört', color: 'emerald' },
      { id: 'per', name: 'Végtelen szakaszos', color: 'amber' },
      { id: 'non', name: 'Végtelen, nem szakaszos', color: 'purple' }
    ],
    items: [
      { id: 'ris10', text: '7/25', categoryId: 'fin' },
      { id: 'ris11', text: '13/8', categoryId: 'fin' },
      { id: 'ris12', text: '3/60', categoryId: 'fin' },
      { id: 'ris13', text: '4/9', categoryId: 'per' },
      { id: 'ris14', text: '5/6', categoryId: 'per' },
      { id: 'ris15', text: '17/11', categoryId: 'per' },
      { id: 'ris16', text: '√3', categoryId: 'non' },
      { id: 'ris17', text: 'π', categoryId: 'non' },
      { id: 'ris18', text: '√10', categoryId: 'non' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mi lesz a művelet eredménye?',
    description: 'Döntsd el, hogy az eredmény mindig racionális, mindig irracionális, vagy lehet mindkettő!',
    categories: [
      { id: 'q', name: 'Mindig racionális', color: 'emerald' },
      { id: 'i', name: 'Mindig irracionális', color: 'purple' },
      { id: 'both', name: 'Lehet racionális is, irracionális is', color: 'amber' }
    ],
    items: [
      { id: 'ris19', text: 'Két racionális szám összege', categoryId: 'q' },
      { id: 'ris20', text: 'Két racionális szám hányadosa (az osztó nem 0)', categoryId: 'q' },
      { id: 'ris21', text: 'Egy racionális szám négyzete', categoryId: 'q' },
      { id: 'ris22', text: 'Egy racionális és egy irracionális szám összege', categoryId: 'i' },
      { id: 'ris23', text: 'Egy nem nulla racionális és egy irracionális szám szorzata', categoryId: 'i' },
      { id: 'ris24', text: 'Egy irracionális számból kivonunk egy racionálisat', categoryId: 'i' },
      { id: 'ris25', text: 'Két irracionális szám összege', categoryId: 'both' },
      { id: 'ris26', text: 'Két irracionális szám szorzata', categoryId: 'both' },
      { id: 'ris27', text: 'Egy irracionális szám négyzete', categoryId: 'both' }
    ]
  }
];

const RATIONAL_IRRATIONAL_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: RATIONAL_IRRATIONAL_SORTER_LEVELS_LIST[0],
  2: RATIONAL_IRRATIONAL_SORTER_LEVELS_LIST[1],
  3: RATIONAL_IRRATIONAL_SORTER_LEVELS_LIST[2]
};

export const G11RationalIrrationalSorter: React.FC<G11RationalIrrationalSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-num-irracionalis-sorter',
  topicTitle = '10. Racionális számok, irracionális számok – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="szamelmelet"
      topicId={topicId}
      subtopicId="racionalis-irracionalis-szamok"
      title={topicTitle}
      subtitle="Rendszerezd a számokat halmazuk és tizedes tört alakjuk szerint, és döntsd el, mi lesz a műveletek eredménye!"
      levels={RATIONAL_IRRATIONAL_SORTER_LEVELS}
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

export default G11RationalIrrationalSorter;
