import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TrigPracticeExamSorterProps {
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

const TRIG_PRACTICE_EXAM_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hány háromszög felel meg az adatoknak?',
    description: 'Döntsd el, hány megoldása van a feladatnak!',
    categories: [
      {
        id: 'zero',
        name: 'Nincs megoldás',
        color: 'rose'
      },
      {
        id: 'one',
        name: 'Pontosan 1 megoldás',
        color: 'emerald'
      },
      {
        id: 'two',
        name: '2 megoldás',
        color: 'amber'
      }
    ],
    items: [
      {
        id: 'tpes1',
        text: 'a = 2, b = 5, α = 60° (α az a-val szemközti szög)',
        categoryId: 'zero'
      },
      {
        id: 'tpes2',
        text: 'Oldalak: 3 cm, 4 cm, 8 cm',
        categoryId: 'zero'
      },
      {
        id: 'tpes3',
        text: 'Egy oldal és két szög: 100° és 90°',
        categoryId: 'zero'
      },
      {
        id: 'tpes4',
        text: 'Oldalak: 22 m, 33 m, 42,13 m',
        categoryId: 'one'
      },
      {
        id: 'tpes5',
        text: 'Két oldal és a közbezárt szög: 24, 41 és 133°',
        categoryId: 'one'
      },
      {
        id: 'tpes6',
        text: 'Tompaszögű háromszög: T = 6,65 dm², oldalak 4,62 és 3,08 dm',
        categoryId: 'one'
      },
      {
        id: 'tpes7',
        text: 'a = 50, b = 74, α = 37° (α az a-val szemközti szög)',
        categoryId: 'two'
      },
      {
        id: 'tpes8',
        text: 'a = 6, b = 8, α = 40° (α az a-val szemközti szög)',
        categoryId: 'two'
      },
      {
        id: 'tpes9',
        text: 'Háromszög egy szöge, ha a szinusza 0,7642',
        categoryId: 'two'
      }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik eszköz kell?',
    description: 'Csoportosítsd a feladatokat a megoldáshoz szükséges fő eszköz szerint!',
    categories: [
      {
        id: 'sine',
        name: 'Szinusztétel',
        color: 'blue'
      },
      {
        id: 'cosine',
        name: 'Koszinusztétel',
        color: 'emerald'
      },
      {
        id: 'right',
        name: 'Derékszögű háromszög szögfüggvényei',
        color: 'purple'
      }
    ],
    items: [
      {
        id: 'tpes10',
        text: 'Tudáspróba I. 4.: BC egy oldalból és két szögből',
        categoryId: 'sine'
      },
      {
        id: 'tpes11',
        text: 'Gyakorló 5.: AB az ABC háromszögből (AC és két szög)',
        categoryId: 'sine'
      },
      {
        id: 'tpes12',
        text: 'Érettségi 2013 c): a B csúcsnál lévő szög',
        categoryId: 'sine'
      },
      {
        id: 'tpes13',
        text: 'Vödör: a fiú ereje (két erő és a szögük)',
        categoryId: 'cosine'
      },
      {
        id: 'tpes14',
        text: 'A labdára ható két erő eredője',
        categoryId: 'cosine'
      },
      {
        id: 'tpes15',
        text: 'A telek átlója (22 m, 33 m, 98°)',
        categoryId: 'cosine'
      },
      {
        id: 'tpes16',
        text: 'A Kristályszálló magassága',
        categoryId: 'right'
      },
      {
        id: 'tpes17',
        text: 'A gúla alakú tető alapéle',
        categoryId: 'right'
      },
      {
        id: 'tpes18',
        text: 'Két érintő: a metszéspont távolsága a középponttól',
        categoryId: 'right'
      }
    ]
  },
  {
    level: 3,
    title: '3. szint: Pozitív, negatív vagy nulla?',
    description: 'Válogasd szét a kifejezéseket az értékük előjele szerint!',
    categories: [
      {
        id: 'pos',
        name: 'Pozitív',
        color: 'emerald'
      },
      {
        id: 'neg',
        name: 'Negatív',
        color: 'rose'
      },
      {
        id: 'zero',
        name: 'Nulla',
        color: 'amber'
      }
    ],
    items: [
      {
        id: 'tpes19',
        text: 'cos 49,84°',
        categoryId: 'pos'
      },
      {
        id: 'tpes20',
        text: 'tg 49,84°',
        categoryId: 'pos'
      },
      {
        id: 'tpes21',
        text: 'sin 130,16°',
        categoryId: 'pos'
      },
      {
        id: 'tpes22',
        text: 'cos 130,16°',
        categoryId: 'neg'
      },
      {
        id: 'tpes23',
        text: 'tg 130,16°',
        categoryId: 'neg'
      },
      {
        id: 'tpes24',
        text: 'cos 133°',
        categoryId: 'neg'
      },
      {
        id: 'tpes25',
        text: 'cos 90°',
        categoryId: 'zero'
      },
      {
        id: 'tpes26',
        text: 'tg 45° − sin 90°',
        categoryId: 'zero'
      },
      {
        id: 'tpes27',
        text: 'sin 30° − cos 60°',
        categoryId: 'zero'
      }
    ]
  }
];

const TRIG_PRACTICE_EXAM_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: TRIG_PRACTICE_EXAM_SORTER_LEVELS_LIST[0],
  2: TRIG_PRACTICE_EXAM_SORTER_LEVELS_LIST[1],
  3: TRIG_PRACTICE_EXAM_SORTER_LEVELS_LIST[2]
};

export const TrigPracticeExamSorter: React.FC<TrigPracticeExamSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-trig-tudasproba-sorter',
  topicTitle = '16. Gyakorlás, tudáspróba – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="trigonometria"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Rendszerezd a feladatokat: hány megoldás van, melyik eszköz kell, milyen az előjel?"
      levels={TRIG_PRACTICE_EXAM_SORTER_LEVELS}
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

export default TrigPracticeExamSorter;
