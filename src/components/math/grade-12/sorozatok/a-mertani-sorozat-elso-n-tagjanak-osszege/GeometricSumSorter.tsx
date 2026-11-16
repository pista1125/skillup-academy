import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GeometricSumSorterProps {
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

const GEOMETRIC_SUM_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Milyen előjelű az összeg?',
    description: 'Számold ki fejben vagy képlettel, és csoportosítsd az összegeket!',
    categories: [
      { id: 'pos', name: 'Sₙ > 0', color: 'emerald' },
      { id: 'neg', name: 'Sₙ < 0', color: 'rose' },
      { id: 'zero', name: 'Sₙ = 0', color: 'amber' }
    ],
    items: [
      { id: 'gss1', text: 'a₁ = 3, q = 2, S₅', categoryId: 'pos' },
      { id: 'gss2', text: 'a₁ = 64, q = 0,5, S₆', categoryId: 'pos' },
      { id: 'gss3', text: 'a₁ = 10, q = −2, S₃', categoryId: 'pos' },
      { id: 'gss4', text: 'a₁ = −1, q = 2, S₅', categoryId: 'neg' },
      { id: 'gss5', text: 'a₁ = 3, q = −2, S₆', categoryId: 'neg' },
      { id: 'gss6', text: 'a₁ = −2, q = 3, S₃', categoryId: 'neg' },
      { id: 'gss7', text: 'a₁ = 5, q = −1, S₈', categoryId: 'zero' },
      { id: 'gss8', text: 'a₁ = 49, q = −1, S₁₀', categoryId: 'zero' },
      { id: 'gss9', text: 'a₁ = 6, q = −1, S₄', categoryId: 'zero' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Mekkora a kvóciens?',
    description: 'Csoportosítsd a folyamatokat és sorozatokat a kvóciensük szerint!',
    categories: [
      { id: 'big', name: 'q > 1', color: 'blue' },
      { id: 'small', name: '0 < q < 1', color: 'teal' },
      { id: 'neg', name: 'q < 0', color: 'purple' }
    ],
    items: [
      { id: 'gss10', text: 'a sál: minden nap 20%-kal többet köt', categoryId: 'big' },
      { id: 'gss11', text: 'búzaszemek: minden mezőn kétszer annyi', categoryId: 'big' },
      { id: 'gss12', text: 'hízás: hetente a súly 1%-ával nő', categoryId: 'big' },
      { id: 'gss13', text: 'járvány: naponta az előző nap 90%-a', categoryId: 'small' },
      { id: 'gss14', text: 'fogyókúra: hetente a súly 1,5%-át adja le', categoryId: 'small' },
      { id: 'gss15', text: '64; 32; 16; 8; …', categoryId: 'small' },
      { id: 'gss16', text: '49; −49; 49; −49; …', categoryId: 'neg' },
      { id: 'gss17', text: '3; −6; 12; −24; …', categoryId: 'neg' },
      { id: 'gss18', text: '1; −3; 9; −27; …', categoryId: 'neg' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Mit keres a feladat?',
    description: 'Döntsd el, hogy a kérdésre egy tag, egy összeg vagy a tagszám a válasz!',
    categories: [
      { id: 'an', name: 'egy tag (aₙ)', color: 'sky' },
      { id: 'sn', name: 'összeg (Sₙ)', color: 'emerald' },
      { id: 'n', name: 'tagszám (n)', color: 'orange' }
    ],
    items: [
      { id: 'gss19', text: 'Hány búzaszem kerül a 64. mezőre?', categoryId: 'an' },
      { id: 'gss20', text: 'Hány új beteg lesz a 20. napon?', categoryId: 'an' },
      { id: 'gss21', text: 'Hány ősünk élt a 10. generációban?', categoryId: 'an' },
      { id: 'gss22', text: 'Hány búzaszem van összesen a sakktáblán?', categoryId: 'sn' },
      { id: 'gss23', text: 'Hányan betegednek meg összesen 20 nap alatt?', categoryId: 'sn' },
      { id: 'gss24', text: 'Hány kilót fogy összesen 5 hét alatt?', categoryId: 'sn' },
      { id: 'gss25', text: 'Hány nap alatt készül el a 2 méteres sál?', categoryId: 'n' },
      { id: 'gss26', text: 'Hány hét múlva lesz 85 kg-os?', categoryId: 'n' },
      { id: 'gss27', text: 'Hány tagot adtunk össze, ha az összeg 177 146?', categoryId: 'n' }
    ]
  }
};

export const GeometricSumSorter: React.FC<GeometricSumSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-seq-mertani-osszeg-sorter',
  topicTitle = '6. A mértani sorozat első n tagjának összege – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="sorozatok"
      topicId={topicId}
      subtopicId="a-mertani-sorozat-elso-n-tagjanak-osszege"
      title={topicTitle}
      subtitle="Rendszerezd a mértani összegeket előjel, kvóciens és a keresett mennyiség szerint!"
      levels={GEOMETRIC_SUM_SORTER_LEVELS}
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

export default GeometricSumSorter;
