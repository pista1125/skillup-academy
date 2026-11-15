import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TrigRegularPolygonsSorterProps {
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

const TRIG_REGULAR_POLYGONS_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Körív, körcikk vagy körszelet?',
    description: 'Döntsd el, melyik mennyiségre vonatkozik a képlet vagy a leírás!',
    categories: [
      {
        id: 'arc',
        name: 'Körív hossza',
        color: 'rose'
      },
      {
        id: 'sector',
        name: 'Körcikk területe',
        color: 'emerald'
      },
      {
        id: 'segment',
        name: 'Körszelet területe',
        color: 'blue'
      }
    ],
    items: [
      {
        id: 'trps1',
        text: 'rπα / 180°',
        categoryId: 'arc'
      },
      {
        id: 'trps2',
        text: '2rπ · α / 360°',
        categoryId: 'arc'
      },
      {
        id: 'trps3',
        text: 'A körkerület 360-ad részének α-szorosa',
        categoryId: 'arc'
      },
      {
        id: 'trps4',
        text: 'r²πα / 360°',
        categoryId: 'sector'
      },
      {
        id: 'trps5',
        text: 'i · r / 2',
        categoryId: 'sector'
      },
      {
        id: 'trps6',
        text: 'A körterület 360-ad részének α-szorosa',
        categoryId: 'sector'
      },
      {
        id: 'trps7',
        text: 'Körcikk − AOB háromszög',
        categoryId: 'segment'
      },
      {
        id: 'trps8',
        text: 'r²πα / 360° − r² · sin α / 2',
        categoryId: 'segment'
      },
      {
        id: 'trps9',
        text: 'A húr és a hozzá tartozó ív közötti síkrész',
        categoryId: 'segment'
      }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik szögfüggvény kell?',
    description: 'A szabályos n-szög elemi derékszögű háromszögében (átfogó R, befogók a/2 és ρ, szög 180° : n) melyik szögfüggvénnyel számolsz?',
    categories: [
      {
        id: 'sin',
        name: 'Szinusz (a/2 és R)',
        color: 'blue'
      },
      {
        id: 'cos',
        name: 'Koszinusz (ρ és R)',
        color: 'emerald'
      },
      {
        id: 'tg',
        name: 'Tangens (a/2 és ρ)',
        color: 'amber'
      }
    ],
    items: [
      {
        id: 'trps10',
        text: 'Az oldal a köré írt kör sugarából',
        categoryId: 'sin'
      },
      {
        id: 'trps11',
        text: 'A köré írt kör sugara az oldalból',
        categoryId: 'sin'
      },
      {
        id: 'trps12',
        text: 'Dísztárcsa: AP = 17,5 · sin 20°',
        categoryId: 'sin'
      },
      {
        id: 'trps13',
        text: 'A beírt kör sugara a köré írt kör sugarából',
        categoryId: 'cos'
      },
      {
        id: 'trps14',
        text: 'A köré írt kör sugara a beírt kör sugarából',
        categoryId: 'cos'
      },
      {
        id: 'trps15',
        text: 'Ötszög alakú terítővel lefedhető legnagyobb kerek asztal (R = 70 cm)',
        categoryId: 'cos'
      },
      {
        id: 'trps16',
        text: 'Az oldal a beírt kör sugarából',
        categoryId: 'tg'
      },
      {
        id: 'trps17',
        text: 'A beírt kör sugara az oldalból',
        categoryId: 'tg'
      },
      {
        id: 'trps18',
        text: 'A terület a beírt kör sugarából: T = n · ρ² · tg(180° : n)',
        categoryId: 'tg'
      }
    ]
  },
  {
    level: 3,
    title: '3. szint: Igaz, hamis vagy adatfüggő?',
    description: 'Válogasd szét az állításokat!',
    categories: [
      {
        id: 'true',
        name: 'Mindig igaz',
        color: 'emerald'
      },
      {
        id: 'false',
        name: 'Hamis',
        color: 'rose'
      },
      {
        id: 'depends',
        name: 'Az adatoktól függ',
        color: 'amber'
      }
    ],
    items: [
      {
        id: 'trps19',
        text: 'Kétszer akkora középponti szöghöz kétszer akkora körív tartozik',
        categoryId: 'true'
      },
      {
        id: 'trps20',
        text: 'A szabályos hatszög oldala egyenlő a köré írt kör sugarával',
        categoryId: 'true'
      },
      {
        id: 'trps21',
        text: 'A körbe írt szabályos sokszög területe kisebb a kör területénél',
        categoryId: 'true'
      },
      {
        id: 'trps22',
        text: 'Kétszer akkora középponti szöghöz kétszer akkora körszelet tartozik',
        categoryId: 'false'
      },
      {
        id: 'trps23',
        text: 'A szabályos n-szög oldala R · sin(360° : n)',
        categoryId: 'false'
      },
      {
        id: 'trps24',
        text: 'Azonos szög mellett kétszeres sugárnál a körcikk területe is kétszeres',
        categoryId: 'false'
      },
      {
        id: 'trps25',
        text: 'A (kisebbik) körszelet területe nagyobb, mint az AOB háromszögé',
        categoryId: 'depends'
      },
      {
        id: 'trps26',
        text: 'A szabályos n-szög oldala hosszabb a beírt kör sugaránál',
        categoryId: 'depends'
      },
      {
        id: 'trps27',
        text: 'A körív hosszabb, mint a kör sugara',
        categoryId: 'depends'
      }
    ]
  }
];

const TRIG_REGULAR_POLYGONS_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: TRIG_REGULAR_POLYGONS_SORTER_LEVELS_LIST[0],
  2: TRIG_REGULAR_POLYGONS_SORTER_LEVELS_LIST[1],
  3: TRIG_REGULAR_POLYGONS_SORTER_LEVELS_LIST[2]
};

export const TrigRegularPolygonsSorter: React.FC<TrigRegularPolygonsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-trig-szabalyos-sokszogek-sorter',
  topicTitle = '14. A kör és a szabályos sokszögek – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="trigonometria"
      topicId={topicId}
      subtopicId="a-kor-es-a-szabalyos-sokszogek"
      title={topicTitle}
      subtitle="Rendszerezd a körrel és a szabályos sokszögekkel kapcsolatos képleteket és állításokat!"
      levels={TRIG_REGULAR_POLYGONS_SORTER_LEVELS}
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

export default TrigRegularPolygonsSorter;
