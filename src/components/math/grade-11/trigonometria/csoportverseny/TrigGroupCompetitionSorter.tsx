import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TrigGroupCompetitionSorterProps {
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

const TRIG_GROUP_COMPETITION_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik eszköz kell?',
    description: 'Döntsd el, melyik tétellel vagy képlettel oldható meg a részfeladat!',
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
        id: 'area',
        name: 'Szinuszos területképlet',
        color: 'amber'
      }
    ],
    items: [
      {
        id: 'tgcs1',
        text: '3. feladat: QB a PQB háromszögből (egy oldal és két szög ismert)',
        categoryId: 'sine'
      },
      {
        id: 'tgcs2',
        text: '4. feladat: β két oldalból és az egyikkel szemközti szögből',
        categoryId: 'sine'
      },
      {
        id: 'tgcs3',
        text: 'Két szög és egy oldal ismert, egy másik oldal kell',
        categoryId: 'sine'
      },
      {
        id: 'tgcs4',
        text: '1. feladat: oldal a fél átlókból és a közbezárt szögből',
        categoryId: 'cosine'
      },
      {
        id: 'tgcs5',
        text: 'Három oldal ismert, egy szög kell',
        categoryId: 'cosine'
      },
      {
        id: 'tgcs6',
        text: 'HF 1.: a trapéz átlója két oldalból és a közbezárt szögből',
        categoryId: 'cosine'
      },
      {
        id: 'tgcs7',
        text: '2. feladat: paralelogramma két oldallal és a szögükkel',
        categoryId: 'area'
      },
      {
        id: 'tgcs8',
        text: '5. feladat: az AOB háromszög a körszelethez',
        categoryId: 'area'
      },
      {
        id: 'tgcs9',
        text: 'HF 2.: a húrnégyszög területe a középponti háromszögekből',
        categoryId: 'area'
      }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kell-e számolni?',
    description: 'Csoportosítsd a lépéseket aszerint, mennyi számolást igényelnek!',
    categories: [
      {
        id: 'none',
        name: 'Számolás nélkül, észrevétellel',
        color: 'emerald'
      },
      {
        id: 'head',
        name: 'Fejben számolható',
        color: 'blue'
      },
      {
        id: 'calc',
        name: 'Számológép kell',
        color: 'rose'
      }
    ],
    items: [
      {
        id: 'tgcs10',
        text: 'B értéke (a terület 0-ra végződik)',
        categoryId: 'none'
      },
      {
        id: 'tgcs11',
        text: 'D értéke (β₁ + β₂)',
        categoryId: 'none'
      },
      {
        id: 'tgcs12',
        text: 'C szerepe a végeredményben (a szorzója 0)',
        categoryId: 'none'
      },
      {
        id: 'tgcs13',
        text: 'sin 150° értéke',
        categoryId: 'head'
      },
      {
        id: 'tgcs14',
        text: 'A 30 és 50 mm-es átlók felei',
        categoryId: 'head'
      },
      {
        id: 'tgcs15',
        text: 'A PBQ szög: 180° − 42° − 53°',
        categoryId: 'head'
      },
      {
        id: 'tgcs16',
        text: 'QB = 15 · sin 53° / sin 85°',
        categoryId: 'calc'
      },
      {
        id: 'tgcs17',
        text: 'A 20 cm sugarú, 110°-os körszelet területe',
        categoryId: 'calc'
      },
      {
        id: 'tgcs18',
        text: 'A torony magassága: QB · tg 72°',
        categoryId: 'calc'
      }
    ]
  },
  {
    level: 3,
    title: '3. szint: Pozitív, negatív vagy nulla?',
    description: 'Válogasd szét az értékeket előjelük szerint!',
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
        id: 'tgcs19',
        text: 'sin 150°',
        categoryId: 'pos'
      },
      {
        id: 'tgcs20',
        text: 'sin 105°',
        categoryId: 'pos'
      },
      {
        id: 'tgcs21',
        text: 'cos 60°',
        categoryId: 'pos'
      },
      {
        id: 'tgcs22',
        text: 'cos 120°',
        categoryId: 'neg'
      },
      {
        id: 'tgcs23',
        text: 'cos 107°',
        categoryId: 'neg'
      },
      {
        id: 'tgcs24',
        text: 'cos 150°',
        categoryId: 'neg'
      },
      {
        id: 'tgcs25',
        text: 'cos 90°',
        categoryId: 'zero'
      },
      {
        id: 'tgcs26',
        text: '15 · A − D/2 a versenyben',
        categoryId: 'zero'
      },
      {
        id: 'tgcs27',
        text: 'B, a 2. feladat betűje',
        categoryId: 'zero'
      }
    ]
  }
];

const TRIG_GROUP_COMPETITION_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: TRIG_GROUP_COMPETITION_SORTER_LEVELS_LIST[0],
  2: TRIG_GROUP_COMPETITION_SORTER_LEVELS_LIST[1],
  3: TRIG_GROUP_COMPETITION_SORTER_LEVELS_LIST[2]
};

export const TrigGroupCompetitionSorter: React.FC<TrigGroupCompetitionSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-trig-csoportverseny-sorter',
  topicTitle = '15. Csoportverseny – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="trigonometria"
      topicId={topicId}
      subtopicId="csoportverseny"
      title={topicTitle}
      subtitle="Rendszerezd a versenyfeladatok lépéseit: melyik tétel kell, kell-e számolni, milyen az előjel?"
      levels={TRIG_GROUP_COMPETITION_SORTER_LEVELS}
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

export default TrigGroupCompetitionSorter;
