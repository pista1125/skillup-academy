import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TrigPropertiesSorterProps {
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

const TRIG_PROPERTIES_SORTER_LEVELS: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik nevezetes szög?',
    description: 'Csoportosítsd az értékeket aszerint, melyik nevezetes szöghöz tartoznak!',
    categories: [
      { id: 'deg30', name: '30°-os szög', color: 'emerald' },
      { id: 'deg45', name: '45°-os szög', color: 'blue' },
      { id: 'deg60', name: '60°-os szög', color: 'amber' }
    ],
    items: [
      { id: 'p1', text: 'sin α = 1/2', categoryId: 'deg30' },
      { id: 'p2', text: 'cos α = √3/2', categoryId: 'deg30' },
      { id: 'p3', text: 'tg α = √3/3', categoryId: 'deg30' },
      { id: 'p4', text: 'sin α = √2/2', categoryId: 'deg45' },
      { id: 'p5', text: 'tg α = 1', categoryId: 'deg45' },
      { id: 'p6', text: 'sin α = cos α', categoryId: 'deg45' },
      { id: 'p7', text: 'sin α = √3/2', categoryId: 'deg60' },
      { id: 'p8', text: 'cos α = 1/2', categoryId: 'deg60' },
      { id: 'p9', text: 'tg α = √3', categoryId: 'deg60' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mindig igaz, néha igaz, soha?',
    description: 'Döntsd el, hogy az állítás minden hegyesszögre igaz, csak bizonyos szögekre, vagy sosem!',
    categories: [
      { id: 'always', name: 'Minden hegyesszögre igaz', color: 'emerald' },
      { id: 'sometimes', name: 'Csak bizonyos hegyesszögre igaz', color: 'amber' },
      { id: 'never', name: 'Egyetlen hegyesszögre sem igaz', color: 'rose' }
    ],
    items: [
      { id: 'p10', text: 'sin²α + cos²α = 1', categoryId: 'always' },
      { id: 'p11', text: 'sin α = cos(90° − α)', categoryId: 'always' },
      { id: 'p12', text: 'tg α = sin α / cos α', categoryId: 'always' },
      { id: 'p13', text: 'sin α = cos α', categoryId: 'sometimes' },
      { id: 'p14', text: 'tg α > 1', categoryId: 'sometimes' },
      { id: 'p15', text: 'sin α = 1/2', categoryId: 'sometimes' },
      { id: 'p16', text: 'sin α + cos α = 1', categoryId: 'never' },
      { id: 'p17', text: 'cos α = 1,1', categoryId: 'never' },
      { id: 'p18', text: 'sin α = 0,6 és cos α = 0,7 egyszerre', categoryId: 'never' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Melyik eszközzel számolunk?',
    description: 'Csoportosítsd a feladatokat a megoldáshoz szükséges összefüggés szerint!',
    categories: [
      { id: 'pyth', name: 'sin²α + cos²α = 1 azonosság', color: 'teal' },
      { id: 'comp', name: 'Pótszögek összefüggése', color: 'violet' },
      { id: 'sine', name: 'Szinusz a derékszögű háromszögben', color: 'blue' }
    ],
    items: [
      { id: 'p19', text: 'sin α = 0,8 ⇒ cos α = ?', categoryId: 'pyth' },
      { id: 'p20', text: 'cos α = 5/13 ⇒ sin α = ?', categoryId: 'pyth' },
      { id: 'p21', text: 'Igaz-e, hogy sin α = 0,6 és cos α = 0,7?', categoryId: 'pyth' },
      { id: 'p22', text: 'sin 25° = cos ?', categoryId: 'comp' },
      { id: 'p23', text: 'sin 37° − cos 53° = ?', categoryId: 'comp' },
      { id: 'p24', text: 'sin²20° + sin²70° = ?', categoryId: 'comp' },
      { id: 'p25', text: 'Siklóernyős magassága 80 m-es kötélnél, 35°-nál', categoryId: 'sine' },
      { id: 'p26', text: 'Budavári Sikló pályájának hajlásszöge', categoryId: 'sine' },
      { id: 'p27', text: 'Montserrat-pálya szintkülönbsége 82°-nál', categoryId: 'sine' }
    ]
  }
];

export const TrigPropertiesSorter: React.FC<TrigPropertiesSorterProps> = ({
  level,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-trig-tulajdonsagok-sorter',
  topicTitle = '4. A szögfüggvények tulajdonságai – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      topicId={topicId}
      subtopicId="a-szogfuggvenyek-tulajdonsagai"
      title={topicTitle}
      subtitle="Ismerd fel a nevezetes szögeket, döntsd el, mikor igazak az összefüggések, és válaszd ki a megfelelő eszközt!"
      levels={{ 1: TRIG_PROPERTIES_SORTER_LEVELS[0], 2: TRIG_PROPERTIES_SORTER_LEVELS[1], 3: TRIG_PROPERTIES_SORTER_LEVELS[2] }}
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

export default TrigPropertiesSorter;
