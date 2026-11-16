import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CylinderSorterProps {
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

const CYLINDER_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Kör, téglalap vagy egyenes?',
    description: 'Milyen alakzat a henger adott része?',
    categories: [
      { id: 'kor', name: 'kör (körlap)', color: 'blue' },
      { id: 'teg', name: 'téglalap', color: 'amber' },
      { id: 'egy', name: 'szakasz vagy egyenes', color: 'emerald' }
    ],
    items: [
      { id: 'cys1', text: 'az alaplap', categoryId: 'kor' },
      { id: 'cys2', text: 'a fedőlap', categoryId: 'kor' },
      { id: 'cys3', text: 'az alaplappal párhuzamos síkmetszet', categoryId: 'kor' },
      { id: 'cys4', text: 'a tengelymetszet', categoryId: 'teg' },
      { id: 'cys5', text: 'a kiterített palást', categoryId: 'teg' },
      { id: 'cys6', text: 'a tengellyel párhuzamos síkmetszet', categoryId: 'teg' },
      { id: 'cys7', text: 'egy alkotó', categoryId: 'egy' },
      { id: 'cys8', text: 'a tengely', categoryId: 'egy' },
      { id: 'cys9', text: 'az alapkör egy átmérője', categoryId: 'egy' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Mi lesz belőle?',
    description: 'A téglalap vagy papírlap melyik oldala lesz a henger melyik adata?',
    categories: [
      { id: 'm', name: 'a henger magassága', color: 'purple' },
      { id: 'r', name: 'az alapkör sugara', color: 'teal' },
      { id: 'k', name: 'az alapkör kerülete', color: 'rose' }
    ],
    items: [
      { id: 'cys10', text: 'forgatásnál a tengelyen fekvő oldal', categoryId: 'm' },
      { id: 'cys11', text: 'papírhengernél az összeragasztott oldal', categoryId: 'm' },
      { id: 'cys12', text: 'az alkotó hossza', categoryId: 'm' },
      { id: 'cys13', text: 'forgatásnál a tengelyre merőleges oldal', categoryId: 'r' },
      { id: 'cys14', text: 'a tengelymetszet vízszintes oldalának fele', categoryId: 'r' },
      { id: 'cys15', text: 'a tengely és egy alkotó távolsága', categoryId: 'r' },
      { id: 'cys16', text: 'papírhengernél a szabadon maradt oldal', categoryId: 'k' },
      { id: 'cys17', text: 'a kiterített palást vízszintes oldala', categoryId: 'k' },
      { id: 'cys18', text: 'a fólia oldala, amelyet a cső köré tekerünk', categoryId: 'k' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Igaz vagy hamis?',
    description: 'Válogasd szét az állításokat!',
    categories: [
      { id: 't', name: 'mindig igaz', color: 'emerald' },
      { id: 'f', name: 'hamis', color: 'rose' },
      { id: 'd', name: 'a hengertől függ', color: 'amber' }
    ],
    items: [
      { id: 'cys19', text: 'Az alkotók hossza egyenlő a testmagassággal.', categoryId: 't' },
      { id: 'cys20', text: 'A palást és az alapkör területének hányadosa 2m / r.', categoryId: 't' },
      { id: 'cys21', text: 'Az alappal párhuzamos metszet egybevágó az alapkörrel.', categoryId: 't' },
      { id: 'cys22', text: 'Négyzet tengelymetszetnél r : m = 2 : 1.', categoryId: 'f' },
      { id: 'cys23', text: 'A tengelymetszet területe r · m.', categoryId: 'f' },
      { id: 'cys24', text: 'A kiterített palást egyik oldala az alapkör átmérője.', categoryId: 'f' },
      { id: 'cys25', text: 'A tengelymetszet négyzet.', categoryId: 'd' },
      { id: 'cys26', text: 'A palást területe nagyobb a két alapkör területénél.', categoryId: 'd' },
      { id: 'cys27', text: 'A henger magasabb, mint amilyen széles.', categoryId: 'd' }
    ]
  }
};

export const CylinderSorter: React.FC<CylinderSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-ter-henger-sorter',
  topicTitle = '4. A henger – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="a-henger"
      title={topicTitle}
      subtitle="Rendszerezd a henger részeit, a síkmetszeteket és az állításokat!"
      levels={CYLINDER_SORTER_LEVELS}
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

export default CylinderSorter;
