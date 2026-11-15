import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CosineLawSorterProps {
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

const COSINE_LAW_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik tétellel érdemes számolni?',
    description: 'Döntsd el, melyik tétel vezet közvetlenül a keresett adathoz!',
    categories: [
      { id: 'cos', name: 'Koszinusztétel', color: 'blue' },
      { id: 'sin', name: 'Szinusztétel', color: 'purple' },
      { id: 'pyth', name: 'Pitagorasz-tétel (derékszögű háromszög)', color: 'emerald' }
    ],
    items: [
      { id: 'cls1', text: 'Két oldal és a közbezárt szög ismert, a harmadik oldal a kérdés', categoryId: 'cos' },
      { id: 'cls2', text: 'Mindhárom oldal ismert, a legnagyobb szög a kérdés', categoryId: 'cos' },
      { id: 'cls3', text: 'Bécs–Zágráb távolság a Budapesttől mért távolságokból és a 60,9°-os szögből', categoryId: 'cos' },
      { id: 'cls4', text: 'Két szög és egy oldal ismert, egy másik oldal a kérdés', categoryId: 'sin' },
      { id: 'cls5', text: 'Egy oldal, a vele szemközti szög és egy másik szög ismert', categoryId: 'sin' },
      { id: 'cls6', text: 'A háromszög köré írt kör sugara egy oldalból és a vele szemközti szögből', categoryId: 'sin' },
      { id: 'cls7', text: 'Derékszögű háromszög két befogója ismert, az átfogó a kérdés', categoryId: 'pyth' },
      { id: 'cls8', text: 'Derékszögű háromszög átfogója és egyik befogója ismert, a másik befogó a kérdés', categoryId: 'pyth' },
      { id: 'cls9', text: 'Téglalap két oldalából az átló hossza', categoryId: 'pyth' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hegyes-, derék- vagy tompaszögű?',
    description: 'Hasonlítsd össze a két rövidebb oldal négyzetösszegét a leghosszabb oldal négyzetével!',
    categories: [
      { id: 'acute', name: 'Hegyesszögű', color: 'emerald' },
      { id: 'right', name: 'Derékszögű', color: 'blue' },
      { id: 'obtuse', name: 'Tompaszögű', color: 'rose' }
    ],
    items: [
      { id: 'cls10', text: '5 cm, 6 cm, 7 cm', categoryId: 'acute' },
      { id: 'cls11', text: '4 cm, 5 cm, 6 cm', categoryId: 'acute' },
      { id: 'cls12', text: '7 cm, 8 cm, 9 cm', categoryId: 'acute' },
      { id: 'cls13', text: '27,2 mm, 51,0 mm, 57,8 mm', categoryId: 'right' },
      { id: 'cls14', text: '14 m, 33,6 m, 36,4 m', categoryId: 'right' },
      { id: 'cls15', text: '6 cm, 8 cm, 10 cm', categoryId: 'right' },
      { id: 'cls16', text: '13,2 m, 14,1 m, 24,5 m', categoryId: 'obtuse' },
      { id: 'cls17', text: '3 cm, 5 cm, 7 cm', categoryId: 'obtuse' },
      { id: 'cls18', text: '6 cm, 7 cm, 10 cm', categoryId: 'obtuse' }
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
      { id: 'cls19', text: 'A koszinusztétel minden háromszögre igaz', categoryId: 'true' },
      { id: 'cls20', text: 'γ = 90° esetén a koszinusztétel a Pitagorasz-tétellel egyezik meg', categoryId: 'true' },
      { id: 'cls21', text: 'Paralelogrammában az átlók négyzetösszege: e² + f² = 2(a² + b²)', categoryId: 'true' },
      { id: 'cls22', text: 'c² = a² + b² + 2ab · cos γ', categoryId: 'false' },
      { id: 'cls23', text: 'Bármely három pozitív szám lehet egy háromszög három oldala', categoryId: 'false' },
      { id: 'cls24', text: 'Tompaszögű γ esetén a −2ab · cos γ tag negatív', categoryId: 'false' },
      { id: 'cls25', text: 'A c oldalra c² < a² + b² teljesül', categoryId: 'depends' },
      { id: 'cls26', text: 'Egy háromszög leghosszabb oldalával szemközti szöge tompaszög', categoryId: 'depends' },
      { id: 'cls27', text: 'A harmadik oldal hosszabb a két adott oldal mindegyikénél', categoryId: 'depends' }
    ]
  }
];

const COSINE_LAW_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: COSINE_LAW_SORTER_LEVELS_LIST[0],
  2: COSINE_LAW_SORTER_LEVELS_LIST[1],
  3: COSINE_LAW_SORTER_LEVELS_LIST[2]
};

export const CosineLawSorter: React.FC<CosineLawSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-trig-koszinusztetel-sorter',
  topicTitle = '12. A koszinusztétel – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="trigonometria"
      topicId={topicId}
      subtopicId="a-koszinusztetel"
      title={topicTitle}
      subtitle="Rendszerezd, mikor melyik tétel kell, milyen a háromszög a szögei szerint, és mely állítások igazak!"
      levels={COSINE_LAW_SORTER_LEVELS}
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

export default CosineLawSorter;
