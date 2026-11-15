import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ObtuseCosineSorterProps {
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

const OBTUSE_COSINE_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Milyen előjelű a koszinusz?',
    description: 'Csoportosítsd a kifejezéseket aszerint, hogy a koszinusz értéke pozitív, nulla vagy negatív!',
    categories: [
      { id: 'pos', name: 'cos > 0 (hegyesszög)', color: 'emerald' },
      { id: 'zero', name: 'cos = 0 (derékszög)', color: 'blue' },
      { id: 'neg', name: 'cos < 0 (tompaszög)', color: 'rose' }
    ],
    items: [
      { id: 'ocs1', text: 'cos 45°', categoryId: 'pos' },
      { id: 'ocs2', text: 'cos 89°', categoryId: 'pos' },
      { id: 'ocs3', text: 'Egy derékszögű háromszög hegyesszögének koszinusza', categoryId: 'pos' },
      { id: 'ocs4', text: 'cos 90°', categoryId: 'zero' },
      { id: 'ocs5', text: 'A négyzet egyik szögének koszinusza', categoryId: 'zero' },
      { id: 'ocs6', text: 'A derékszögű háromszög legnagyobb szögének koszinusza', categoryId: 'zero' },
      { id: 'ocs7', text: 'cos 92°', categoryId: 'neg' },
      { id: 'ocs8', text: 'cos 179°', categoryId: 'neg' },
      { id: 'ocs9', text: 'A szabályos hatszög belső szögének (120°) koszinusza', categoryId: 'neg' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hány szög tartozik hozzá?',
    description: 'Hány olyan α szög van 0° és 180° között (0° < α < 180°), amelyre az adott feltétel teljesül?',
    categories: [
      { id: 'one', name: 'Pontosan egy szög', color: 'blue' },
      { id: 'two', name: 'Két szög (egy hegyes és egy tompa)', color: 'purple' },
      { id: 'none', name: 'Nincs ilyen szög', color: 'slate' }
    ],
    items: [
      { id: 'ocs10', text: 'cos α = −0,3', categoryId: 'one' },
      { id: 'ocs11', text: 'cos α = 0,8', categoryId: 'one' },
      { id: 'ocs12', text: 'sin α = 1', categoryId: 'one' },
      { id: 'ocs13', text: 'sin α = 0,5', categoryId: 'two' },
      { id: 'ocs14', text: 'sin α = 0,7355', categoryId: 'two' },
      { id: 'ocs15', text: 'sin α = √2/2', categoryId: 'two' },
      { id: 'ocs16', text: 'cos α = −1,2', categoryId: 'none' },
      { id: 'ocs17', text: 'sin α = −0,5', categoryId: 'none' },
      { id: 'ocs18', text: 'sin α = 1,1', categoryId: 'none' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Igaz vagy hamis?',
    description: 'Válogasd szét az állításokat!',
    categories: [
      { id: 'true', name: 'Mindig igaz', color: 'emerald' },
      { id: 'false', name: 'Hamis', color: 'rose' },
      { id: 'depends', name: 'A konkrét adatoktól függ', color: 'amber' }
    ],
    items: [
      { id: 'ocs19', text: 'cos 100° = −cos 80°', categoryId: 'true' },
      { id: 'ocs20', text: 'sin 100° = sin 80°', categoryId: 'true' },
      { id: 'ocs21', text: 'sin² 130° + cos² 130° = 1', categoryId: 'true' },
      { id: 'ocs22', text: 'cos 120° = cos 60°', categoryId: 'false' },
      { id: 'ocs23', text: 'Egy háromszögnek lehet két negatív koszinuszú szöge', categoryId: 'false' },
      { id: 'ocs24', text: 'Ha sin α = 0,6, akkor cos α biztosan 0,8', categoryId: 'false' },
      { id: 'ocs25', text: 'Egy háromszög legnagyobb szögének koszinusza negatív', categoryId: 'depends' },
      { id: 'ocs26', text: 'Egy egyenlő szárú háromszög szárszögének koszinusza pozitív', categoryId: 'depends' },
      { id: 'ocs27', text: 'Egy paralelogramma egyik szögének koszinusza negatív', categoryId: 'depends' }
    ]
  }
];

const OBTUSE_COSINE_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: OBTUSE_COSINE_SORTER_LEVELS_LIST[0],
  2: OBTUSE_COSINE_SORTER_LEVELS_LIST[1],
  3: OBTUSE_COSINE_SORTER_LEVELS_LIST[2]
};

export const ObtuseCosineSorter: React.FC<ObtuseCosineSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-trig-tompaszog-koszinusz-sorter',
  topicTitle = '11. A tompaszög és a derékszög koszinusza – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="trigonometria"
      topicId={topicId}
      subtopicId="a-tompaszog-es-a-derekszog-koszinusza"
      title={topicTitle}
      subtitle="Rendszerezd a koszinusz előjelét, a szögkeresés eseteit és az állításokat!"
      levels={OBTUSE_COSINE_SORTER_LEVELS}
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

export default ObtuseCosineSorter;
