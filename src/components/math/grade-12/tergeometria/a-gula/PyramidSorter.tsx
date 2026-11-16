import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PyramidSorterProps {
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

const SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hány oldalú a gúla?',
    description: 'Csoportosítsd a jellemzőket aszerint, hogy melyik gúlára igazak!',
    categories: [
      { id: 'tri', name: 'Háromoldalú gúla', color: 'blue' },
      { id: 'quad', name: 'Négyoldalú gúla', color: 'emerald' },
      { id: 'hex', name: 'Hatoldalú gúla', color: 'amber' }
    ],
    items: [
      { id: 'pyrs1', text: '4 lapja van', categoryId: 'tri' },
      { id: 'pyrs2', text: '6 éle van', categoryId: 'tri' },
      { id: 'pyrs3', text: 'tetraédernek is nevezzük', categoryId: 'tri' },
      { id: 'pyrs4', text: '5 lapja van', categoryId: 'quad' },
      { id: 'pyrs5', text: '8 éle van', categoryId: 'quad' },
      { id: 'pyrs6', text: 'a Kheopsz-piramis modellje', categoryId: 'quad' },
      { id: 'pyrs7', text: '7 lapja van', categoryId: 'hex' },
      { id: 'pyrs8', text: '12 éle van', categoryId: 'hex' },
      { id: 'pyrs9', text: '7 csúcsa van', categoryId: 'hex' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik derékszögű háromszögben van?',
    description: 'Döntsd el, melyik derékszögű háromszög adja a mennyiséget!',
    categories: [
      { id: 'mrho', name: 'M, ρ, mₒ háromszög', color: 'purple' },
      { id: 'mrb', name: 'M, R, b háromszög', color: 'rose' },
      { id: 'half', name: 'mₒ, a/2, b (fél oldallap)', color: 'teal' }
    ],
    items: [
      { id: 'pyrs10', text: 'oldallap és alaplap hajlásszöge', categoryId: 'mrho' },
      { id: 'pyrs11', text: 'mₒ a magasságból és a beírt kör sugarából', categoryId: 'mrho' },
      { id: 'pyrs12', text: 'négyzet alapnál: mₒ² = M² + (a/2)²', categoryId: 'mrho' },
      { id: 'pyrs13', text: 'oldalél és alaplap hajlásszöge', categoryId: 'mrb' },
      { id: 'pyrs14', text: 'magasság az oldalélből és a köré írt kör sugarából', categoryId: 'mrb' },
      { id: 'pyrs15', text: 'négyzet alapnál: b² = M² + a²/2', categoryId: 'mrb' },
      { id: 'pyrs16', text: 'oldallap csúcsszögének fele', categoryId: 'half' },
      { id: 'pyrs17', text: 'oldalél az alapélből és az oldallap magasságából', categoryId: 'half' },
      { id: 'pyrs18', text: 'az oldallap területe a és mₒ ismeretében', categoryId: 'half' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Igaz vagy hamis?',
    description: 'Válogasd szét az állításokat!',
    categories: [
      { id: 'true', name: 'Mindig igaz', color: 'emerald' },
      { id: 'false', name: 'Hamis', color: 'rose' },
      { id: 'dep', name: 'Az adatoktól függ', color: 'amber' }
    ],
    items: [
      { id: 'pyrs19', text: 'A gúla magassága nem hosszabb egyetlen oldalélénél sem.', categoryId: 'true' },
      { id: 'pyrs20', text: 'Szabályos gúlában az oldallap hajlásszöge nagyobb, mint az oldalélé.', categoryId: 'true' },
      { id: 'pyrs21', text: 'Ha minden oldalél egyenlő, az alaplap körbe írható sokszög.', categoryId: 'true' },
      { id: 'pyrs22', text: 'Van olyan gúla, amelynek van testátlója.', categoryId: 'false' },
      { id: 'pyrs23', text: 'A szabályos tetraéder lapszöge 60°.', categoryId: 'false' },
      { id: 'pyrs24', text: 'Minden négyoldalú gúla alaplapja négyzet.', categoryId: 'false' },
      { id: 'pyrs25', text: 'A gúla magassága nagyobb az alapélénél.', categoryId: 'dep' },
      { id: 'pyrs26', text: 'Az oldallap 45°-os szöget zár be az alaplappal.', categoryId: 'dep' },
      { id: 'pyrs27', text: 'A gúla oldallapjai egyenlő szárú háromszögek.', categoryId: 'dep' }
    ]
  }
];

const SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: SORTER_LEVELS_LIST[0],
  2: SORTER_LEVELS_LIST[1],
  3: SORTER_LEVELS_LIST[2]
};

export const PyramidSorter: React.FC<PyramidSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-ter-gula-sorter',
  topicTitle = '10. A gúla – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="a-gula"
      title={topicTitle}
      subtitle="Rendszerezd a gúlákat, a derékszögű háromszögeket és a gúlákról szóló állításokat!"
      levels={SORTER_LEVELS}
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

export default PyramidSorter;
