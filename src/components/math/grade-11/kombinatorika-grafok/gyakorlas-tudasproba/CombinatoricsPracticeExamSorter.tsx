import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CombinatoricsPracticeExamSorterProps {
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

const COMBINATORICS_PRACTICE_EXAM_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik modell?',
    description: 'Döntsd el, melyik összeszámlálási modell illik a feladathoz!',
    categories: [
      {
        id: 'var',
        name: 'Sorrend számít, nincs ismétlés',
        color: 'indigo'
      },
      {
        id: 'rep',
        name: 'Ismétléses variáció (nᵏ)',
        color: 'rose'
      },
      {
        id: 'comb',
        name: 'Kombináció (n alatt a k)',
        color: 'amber'
      }
    ],
    items: [
      {
        id: 'cpes1',
        text: '8 gyerek leül egy 8 személyes padra',
        categoryId: 'var'
      },
      {
        id: 'cpes2',
        text: '17 főből 3 felelő, mindenki más feladatot kap',
        categoryId: 'var'
      },
      {
        id: 'cpes3',
        text: 'Arany-, ezüst- és bronzérem 10 versenyző között',
        categoryId: 'var'
      },
      {
        id: 'cpes4',
        text: 'Rendszám: 3 betű és 3 számjegy',
        categoryId: 'rep'
      },
      {
        id: 'cpes5',
        text: '10 kérdéses teszt, kérdésenként 4 válasz',
        categoryId: 'rep'
      },
      {
        id: 'cpes6',
        text: '4 jegyű PIN-kód a 0–9 számjegyekből',
        categoryId: 'rep'
      },
      {
        id: 'cpes7',
        text: '3 gyümölcsnap kiválasztása novemberben',
        categoryId: 'comb'
      },
      {
        id: 'cpes8',
        text: 'Ötfős küldöttség egy 27 fős osztályból',
        categoryId: 'comb'
      },
      {
        id: 'cpes9',
        text: 'Ötös lottó: 5 szám a 90-ből',
        categoryId: 'comb'
      }
    ]
  },
  {
    level: 2,
    title: '2. szint: Létezik-e ilyen egyszerű gráf?',
    description: 'A fokszámok alapján döntsd el, létezik-e hurok- és többszörös él nélküli gráf!',
    categories: [
      {
        id: 'yes',
        name: 'Létezik',
        color: 'emerald'
      },
      {
        id: 'odd',
        name: 'Nem létezik: páratlan a fokszámösszeg',
        color: 'rose'
      },
      {
        id: 'other',
        name: 'Nem létezik, pedig az összeg páros',
        color: 'amber'
      }
    ],
    items: [
      {
        id: 'cpes10',
        text: '3; 2; 2; 1',
        categoryId: 'yes'
      },
      {
        id: 'cpes11',
        text: '0; 1; 2; 2; 2; 5; 0; 0; 4; 4; 2',
        categoryId: 'yes'
      },
      {
        id: 'cpes12',
        text: '2; 2; 2',
        categoryId: 'yes'
      },
      {
        id: 'cpes13',
        text: '1; 2; 2; 3; 3; 6; 6',
        categoryId: 'odd'
      },
      {
        id: 'cpes14',
        text: '1; 1; 1',
        categoryId: 'odd'
      },
      {
        id: 'cpes15',
        text: '3; 3; 3; 3; 3',
        categoryId: 'odd'
      },
      {
        id: 'cpes16',
        text: '1; 1; 3; 3',
        categoryId: 'other'
      },
      {
        id: 'cpes17',
        text: '4; 4; 2; 2',
        categoryId: 'other'
      },
      {
        id: 'cpes18',
        text: '3; 3; 3; 1',
        categoryId: 'other'
      }
    ]
  },
  {
    level: 3,
    title: '3. szint: Melyik stratégia vezet célhoz?',
    description: 'Válogasd szét a feladatokat a legcélravezetőbb megoldási ötlet szerint!',
    categories: [
      {
        id: 'compl',
        name: 'Komplementer: összes − rossz',
        color: 'violet'
      },
      {
        id: 'cases',
        name: 'Esetszétválasztás: összeadás',
        color: 'sky'
      },
      {
        id: 'prod',
        name: 'Csak szorzás (független döntések)',
        color: 'emerald'
      }
    ],
    items: [
      {
        id: 'cpes19',
        text: 'Ötfős küldöttség, amelyben van fiú',
        categoryId: 'compl'
      },
      {
        id: 'cpes20',
        text: 'Hatjegyű páros számok, amelyekben előfordul a 0',
        categoryId: 'compl'
      },
      {
        id: 'cpes21',
        text: 'Hajni és Bence ne üljön egymás mellé',
        categoryId: 'compl'
      },
      {
        id: 'cpes22',
        text: 'Buszjegy 2, 3, 4 vagy 5 lyukkal',
        categoryId: 'cases'
      },
      {
        id: 'cpes23',
        text: 'Telefonszám: a középső vagy a szélső oszlop van elöl',
        categoryId: 'cases'
      },
      {
        id: 'cpes24',
        text: 'Két csoportos pingpong: csoportmeccsek + helyosztók',
        categoryId: 'cases'
      },
      {
        id: 'cpes25',
        text: 'Rendszámok száma BB-BB-SzSzSz felépítéssel',
        categoryId: 'prod'
      },
      {
        id: 'cpes26',
        text: 'Okmányazonosító: 6 számjegy és 2 betű',
        categoryId: 'prod'
      },
      {
        id: 'cpes27',
        text: 'Négyjegyű páros számok 7-es jegy nélkül',
        categoryId: 'prod'
      }
    ]
  }
];

const COMBINATORICS_PRACTICE_EXAM_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: COMBINATORICS_PRACTICE_EXAM_SORTER_LEVELS_LIST[0],
  2: COMBINATORICS_PRACTICE_EXAM_SORTER_LEVELS_LIST[1],
  3: COMBINATORICS_PRACTICE_EXAM_SORTER_LEVELS_LIST[2]
};

export const CombinatoricsPracticeExamSorter: React.FC<CombinatoricsPracticeExamSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-comb-tudasproba-sorter',
  topicTitle = '10. Gyakorlás, tudáspróba – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="kombinatorika-grafok"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Rendszerezd a fejezetet: melyik modell, létezik-e a gráf, és melyik megoldási stratégia a célravezető!"
      levels={COMBINATORICS_PRACTICE_EXAM_SORTER_LEVELS}
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

export default CombinatoricsPracticeExamSorter;
