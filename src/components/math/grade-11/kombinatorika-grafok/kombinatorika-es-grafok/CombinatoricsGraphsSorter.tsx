import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CombinatoricsGraphsSorterProps {
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

const COMBINATORICS_GRAPHS_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Csúcsokat vagy éleket választunk?',
    description: 'Döntsd el, mire vonatkozik a kérdés!',
    categories: [
      { id: 'vertices', name: 'Csúcsokat választunk ki', color: 'emerald' },
      { id: 'edges', name: 'Éleket választunk ki', color: 'orange' },
      { id: 'count', name: 'Egy teljes gráf éleit számoljuk össze', color: 'purple' }
    ],
    items: [
      { id: 'cgs1', text: '2 település kiválasztása az 5 közül', categoryId: 'vertices' },
      { id: 'cgs2', text: '4 csúcs kiválasztása a 120 élű teljes gráfban', categoryId: 'vertices' },
      { id: 'cgs3', text: '3 felhasználó kiválasztása a 6 regisztrált közül', categoryId: 'vertices' },
      { id: 'cgs4', text: '2 út kiválasztása a 6 közül', categoryId: 'edges' },
      { id: 'cgs5', text: '4 szerződés kiválasztása ellenőrzésre', categoryId: 'edges' },
      { id: 'cgs6', text: '3 lejátszott mérkőzés kiválasztása elemzésre', categoryId: 'edges' },
      { id: 'cgs7', text: 'Hány koccintás történik 5 ember között?', categoryId: 'count' },
      { id: 'cgs8', text: 'Hány meccs van 7 csapat körmérkőzésén?', categoryId: 'count' },
      { id: 'cgs9', text: 'Hány kézfogás történik 10 ember között?', categoryId: 'count' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Van ilyen gráf?',
    description: 'Válogasd szét a leírásokat!',
    categories: [
      { id: 'yes', name: 'Van ilyen gráf', color: 'emerald' },
      { id: 'odd', name: 'Nincs: páratlan a fokszámösszeg', color: 'rose' },
      { id: 'other', name: 'Nincs, más ok miatt', color: 'purple' }
    ],
    items: [
      { id: 'cgs10', text: '7 csúcs, minden fokszám 2', categoryId: 'yes' },
      { id: 'cgs11', text: '5 csúcs, 7 él, fokszámösszeg 14', categoryId: 'yes' },
      { id: 'cgs12', text: '4 csúcs, minden fokszám 3', categoryId: 'yes' },
      { id: 'cgs13', text: '7 csúcs, minden fokszám 3', categoryId: 'odd' },
      { id: 'cgs14', text: '6 csúcs, fokszámok 1, 2, 2, 2, 3, 3', categoryId: 'odd' },
      { id: 'cgs15', text: '8 versenyző válaszai: 7, 7, 6, 6, 5, 5, 5, 4', categoryId: 'odd' },
      { id: 'cgs16', text: '5 csúcs, 7 él, fokszámösszeg 12', categoryId: 'other' },
      { id: 'cgs17', text: '40 élű teljes gráf', categoryId: 'other' },
      { id: 'cgs18', text: '6 csapat körmérkőzése, egy csapat már 6 meccset játszott', categoryId: 'other' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Igaz vagy hamis?',
    description: 'Válogasd szét az állításokat!',
    categories: [
      { id: 'true', name: 'Mindig igaz', color: 'emerald' },
      { id: 'false', name: 'Hamis', color: 'rose' },
      { id: 'depends', name: 'A konkrét gráftól függ', color: 'amber' }
    ],
    items: [
      { id: 'cgs19', text: 'A fokszámtétel hurokéllel rendelkező gráfokra is igaz', categoryId: 'true' },
      { id: 'cgs20', text: 'Az n pontú teljes gráfnak C(n; 2) éle van', categoryId: 'true' },
      { id: 'cgs21', text: 'A páratlan fokszámú csúcsok száma páros', categoryId: 'true' },
      { id: 'cgs22', text: 'A 6 pontú teljes gráfnak 30 éle van', categoryId: 'false' },
      { id: 'cgs23', text: 'A fokszámok összege lehet páratlan', categoryId: 'false' },
      { id: 'cgs24', text: 'A teljes gráf csúcsainak fokszáma különböző', categoryId: 'false' },
      { id: 'cgs25', text: 'Egy 8 csúcsú gráfnak 28 éle van', categoryId: 'depends' },
      { id: 'cgs26', text: 'Az n csúcsú gráf egy csúcsának fokszáma n − 1', categoryId: 'depends' },
      { id: 'cgs27', text: 'A gráf éleinek száma páros', categoryId: 'depends' }
    ]
  }
];

const COMBINATORICS_GRAPHS_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: COMBINATORICS_GRAPHS_SORTER_LEVELS_LIST[0],
  2: COMBINATORICS_GRAPHS_SORTER_LEVELS_LIST[1],
  3: COMBINATORICS_GRAPHS_SORTER_LEVELS_LIST[2]
};

export const CombinatoricsGraphsSorter: React.FC<CombinatoricsGraphsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-comb-kombinatorika-grafok-sorter',
  topicTitle = '9. Kombinatorika és gráfok – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="kombinatorika-grafok"
      topicId={topicId}
      subtopicId="kombinatorika-es-grafok"
      title={topicTitle}
      subtitle="Csúcs vagy él? Létezik-e a gráf? Igaz vagy hamis? Rendszerezd a gráfos összeszámlálásokat!"
      levels={COMBINATORICS_GRAPHS_SORTER_LEVELS}
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

export default CombinatoricsGraphsSorter;
