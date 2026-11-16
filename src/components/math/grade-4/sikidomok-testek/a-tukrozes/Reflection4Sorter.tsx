import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Reflection4SorterProps {
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

const REFLECTION4_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Szimmetrikus vagy nem?",
    description: "Van-e az alakzatnak szimmetriatengelye?",
    categories: [
      { id: 'sym', name: "Szimmetrikus", color: 'purple' },
      { id: 'no', name: "Nem szimmetrikus", color: 'rose' },
      { id: 'inf', name: "Végtelen sok tengelye van", color: 'emerald' }
    ],
    items: [
      { id: 'g4-geom-tukrozes-s1', text: "pillangó", categoryId: 'sym' },
      { id: 'g4-geom-tukrozes-s2', text: "szív", categoryId: 'sym' },
      { id: 'g4-geom-tukrozes-s3', text: "az A betű", categoryId: 'sym' },
      { id: 'g4-geom-tukrozes-s4', text: "az F betű", categoryId: 'no' },
      { id: 'g4-geom-tukrozes-s5', text: "a G betű", categoryId: 'no' },
      { id: 'g4-geom-tukrozes-s6', text: "ferde négyszög", categoryId: 'no' },
      { id: 'g4-geom-tukrozes-s7', text: "kör", categoryId: 'inf' },
      { id: 'g4-geom-tukrozes-s8', text: "pénzérme lapja", categoryId: 'inf' },
      { id: 'g4-geom-tukrozes-s9', text: "a kerék körvonala", categoryId: 'inf' }
    ]
  },
  {
    level: 2,
    title: "2. szint: Hány tengely?",
    description: "Hány szimmetriatengelye van?",
    categories: [
      { id: 'one', name: "Pontosan 1", color: 'sky' },
      { id: 'two', name: "Pontosan 2", color: 'amber' },
      { id: 'more', name: "3 vagy több", color: 'purple' }
    ],
    items: [
      { id: 'g4-geom-tukrozes-s10', text: "szív", categoryId: 'one' },
      { id: 'g4-geom-tukrozes-s11', text: "„vödör” alakú négyszög", categoryId: 'one' },
      { id: 'g4-geom-tukrozes-s12', text: "az A betű", categoryId: 'one' },
      { id: 'g4-geom-tukrozes-s13', text: "téglalap (nem négyzet)", categoryId: 'two' },
      { id: 'g4-geom-tukrozes-s14', text: "a H betű", categoryId: 'two' },
      { id: 'g4-geom-tukrozes-s15', text: "ovális", categoryId: 'two' },
      { id: 'g4-geom-tukrozes-s16', text: "négyzet", categoryId: 'more' },
      { id: 'g4-geom-tukrozes-s17', text: "egyenlő oldalú háromszög", categoryId: 'more' },
      { id: 'g4-geom-tukrozes-s18', text: "hópehely", categoryId: 'more' }
    ]
  },
  {
    level: 3,
    title: "3. szint: Merre kerül a tükörkép?",
    description: "Függőleges (piros, álló) tükörtengely mellett: hol lesz a tükörkép?",
    categories: [
      { id: 'left', name: "A tengelytől balra", color: 'sky' },
      { id: 'right', name: "A tengelytől jobbra", color: 'rose' },
      { id: 'on', name: "Pont a tengelyen", color: 'emerald' }
    ],
    items: [
      { id: 'g4-geom-tukrozes-s19', text: "a tengelytől jobbra 2 négyzetnyire lévő pont tükörképe", categoryId: 'left' },
      { id: 'g4-geom-tukrozes-s20', text: "a jobb oldali kutya tükörképe", categoryId: 'left' },
      { id: 'g4-geom-tukrozes-s21', text: "a tengelytől jobbra álló zászló tükörképe", categoryId: 'left' },
      { id: 'g4-geom-tukrozes-s22', text: "a tengelytől balra 3 négyzetnyire lévő pont tükörképe", categoryId: 'right' },
      { id: 'g4-geom-tukrozes-s23', text: "a bal oldali ház tükörképe", categoryId: 'right' },
      { id: 'g4-geom-tukrozes-s24', text: "a tengely bal oldalán álló vonat tükörképe", categoryId: 'right' },
      { id: 'g4-geom-tukrozes-s25', text: "a tengelyen lévő pont tükörképe", categoryId: 'on' },
      { id: 'g4-geom-tukrozes-s26', text: "a ház tengelyre eső csúcsának tükörképe", categoryId: 'on' },
      { id: 'g4-geom-tukrozes-s27', text: "a tengely egy pontjának tükörképe", categoryId: 'on' }
    ]
  }
];

const REFLECTION4_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: REFLECTION4_SORTER_LEVELS_LIST[0],
  2: REFLECTION4_SORTER_LEVELS_LIST[1],
  3: REFLECTION4_SORTER_LEVELS_LIST[2]
};

export const Reflection4Sorter: React.FC<Reflection4SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-geom-tukrozes-sorter',
  topicTitle = "4. A tükrözés – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="sikidomok-testek"
      topicId={topicId}
      subtopicId="a-tukrozes"
      title={topicTitle}
      subtitle="Válogasd szét a szimmetrikus alakzatokat és a tengelyek számát!"
      levels={REFLECTION4_SORTER_LEVELS}
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

export default Reflection4Sorter;
