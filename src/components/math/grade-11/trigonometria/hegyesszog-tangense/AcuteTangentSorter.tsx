import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface AcuteTangentSorterProps {
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

const ACUTE_TANGENT_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kisebb, egyenlő vagy nagyobb 1-nél?',
    description: 'Csoportosítsd a hegyesszögeket és befogópárokat aszerint, hogy a tangens 1-nél kisebb, 1 vagy 1-nél nagyobb!',
    categories: [
      { id: 'lt1', name: 'tg α < 1 (α < 45°)', color: 'blue' },
      { id: 'eq1', name: 'tg α = 1 (α = 45°)', color: 'emerald' },
      { id: 'gt1', name: 'tg α > 1 (α > 45°)', color: 'amber' }
    ],
    items: [
      { id: 'ats1', text: 'α = 25°', categoryId: 'lt1' },
      { id: 'ats2', text: 'Szemközti befogó 3 cm, melletti 4 cm', categoryId: 'lt1' },
      { id: 'ats3', text: 'α = 38°', categoryId: 'lt1' },
      { id: 'ats4', text: 'Egyenlő szárú derékszögű háromszög hegyesszöge', categoryId: 'eq1' },
      { id: 'ats5', text: 'A két befogó egyaránt 7 cm', categoryId: 'eq1' },
      { id: 'ats6', text: 'A négyzet átlója és oldala által bezárt szög', categoryId: 'eq1' },
      { id: 'ats7', text: 'α = 65°', categoryId: 'gt1' },
      { id: 'ats8', text: 'Szemközti befogó 50 cm, melletti 23,5 cm', categoryId: 'gt1' },
      { id: 'ats9', text: 'Szabályos háromszög 60°-os szöge (a magassággal felbontva)', categoryId: 'gt1' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik művelet kell?',
    description: 'Döntsd el, hogyan kapod meg a keresett mennyiséget!',
    categories: [
      { id: 'mult', name: 'Szorzás: melletti · tg α', color: 'purple' },
      { id: 'div', name: 'Osztás: szemközti : tg α', color: 'rose' },
      { id: 'ratio', name: 'Hányados: tg α = szemközti / melletti', color: 'teal' }
    ],
    items: [
      { id: 'ats10', text: 'Torony magassága 30 m távolságból, ismert emelkedési szöggel', categoryId: 'mult' },
      { id: 'ats11', text: 'Fa magassága az árnyék hosszából és a napsugarak szögéből', categoryId: 'mult' },
      { id: 'ats12', text: 'Téglalap rövidebb oldala a hosszabb oldalból és az átló szögéből', categoryId: 'mult' },
      { id: 'ats13', text: 'Melletti befogó, ha a szemközti 12 cm és tg α = 0,75', categoryId: 'div' },
      { id: 'ats14', text: 'Milyen messze van a torony, ha ismert a magassága és az emelkedési szög?', categoryId: 'div' },
      { id: 'ats15', text: 'Árnyék hossza ismert magasságú botnál és ismert napsugár-szögnél', categoryId: 'div' },
      { id: 'ats16', text: 'Lejtő meredeksége: 12 m emelkedés 100 m vízszintes úton', categoryId: 'ratio' },
      { id: 'ats17', text: 'Téglalap átlójának szöge a 23,5 cm és 50 cm oldalakból', categoryId: 'ratio' },
      { id: 'ats18', text: 'A 7,8 cm és 10 cm befogójú háromszög kisebbik szöge', categoryId: 'ratio' }
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
      { id: 'ats19', text: 'Egy derékszögű háromszög két hegyesszögére tg α · tg β = 1', categoryId: 'true' },
      { id: 'ats20', text: 'Hegyesszög tangense pozitív szám', categoryId: 'true' },
      { id: 'ats21', text: 'Hasonló derékszögű háromszögekben a megfelelő hegyesszögek tangense egyenlő', categoryId: 'true' },
      { id: 'ats22', text: 'Ha a háromszöget kétszeresére nagyítjuk, a szögeinek tangense is kétszeres lesz', categoryId: 'false' },
      { id: 'ats23', text: 'A tangens kiszámításához az átfogó hosszára is szükség van', categoryId: 'false' },
      { id: 'ats24', text: 'Kétszer akkora szögnek kétszer akkora a tangense', categoryId: 'false' },
      { id: 'ats25', text: 'Egy derékszögű háromszög hegyesszögének tangense nagyobb 1-nél', categoryId: 'depends' },
      { id: 'ats26', text: 'A rövidebb befogóval szemközti szög tangense 0,5', categoryId: 'depends' },
      { id: 'ats27', text: 'A torony magassága nagyobb, mint a toronytól mért távolságunk', categoryId: 'depends' }
    ]
  }
];

const ACUTE_TANGENT_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: ACUTE_TANGENT_SORTER_LEVELS_LIST[0],
  2: ACUTE_TANGENT_SORTER_LEVELS_LIST[1],
  3: ACUTE_TANGENT_SORTER_LEVELS_LIST[2]
};

export const AcuteTangentSorter: React.FC<AcuteTangentSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-trig-tangens-fogalma-sorter',
  topicTitle = '1. Hegyesszög tangense – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="trigonometria"
      topicId={topicId}
      subtopicId="hegyesszog-tangense"
      title={topicTitle}
      subtitle="Rendszerezd a tangensértékeket, a számolási lépéseket és az állításokat!"
      levels={ACUTE_TANGENT_SORTER_LEVELS}
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

export default AcuteTangentSorter;
