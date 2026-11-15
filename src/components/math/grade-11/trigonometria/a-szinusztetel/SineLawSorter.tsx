import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SineLawSorterProps {
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

const SINE_LAW_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Milyen eszköz kell?',
    description: 'Döntsd el, mivel oldható meg legegyszerűbben a feladat!',
    categories: [
      { id: 'sinelaw', name: 'Szinusztétel', color: 'blue' },
      { id: 'right', name: 'Derékszögű háromszög szögfüggvényei', color: 'amber' },
      { id: 'sum', name: 'Elég a szögösszeg (180°)', color: 'emerald' }
    ],
    items: [
      { id: 'sls1', text: 'Ferdeszögű háromszög: két szög és egy oldal adott, egy másik oldal kell', categoryId: 'sinelaw' },
      { id: 'sls2', text: 'Az Új Híd leghosszabb kábelének hossza (200 m, 109°, 16°)', categoryId: 'sinelaw' },
      { id: 'sls3', text: 'Két oldal összege 20 cm, szemközti szögeik 67° és 48° – az oldalak', categoryId: 'sinelaw' },
      { id: 'sls4', text: 'Torony magassága 30 m-ről, 38°-os emelkedési szögben', categoryId: 'right' },
      { id: 'sls5', text: 'Derékszögű háromszög befogója az átfogóból és egy hegyesszögből', categoryId: 'right' },
      { id: 'sls6', text: 'Hajó távolsága a parttól, ha a hajó és a part egy pontjának távolsága és a szög már ismert', categoryId: 'right' },
      { id: 'sls7', text: 'A háromszög harmadik szöge, ha kettő 109° és 16°', categoryId: 'sum' },
      { id: 'sls8', text: 'Az ABP háromszög A-nál lévő szöge (B-nél 109°, P-nél 41°)', categoryId: 'sum' },
      { id: 'sls9', text: 'Egyenlő szárú háromszög szárszöge 70°-os alapszögekből', categoryId: 'sum' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik oldal a nagyobb?',
    description: 'Hasonlítsd össze az a és b oldalt a szemközti szögek alapján!',
    categories: [
      { id: 'agt', name: 'a > b', color: 'purple' },
      { id: 'aeq', name: 'a = b', color: 'teal' },
      { id: 'alt', name: 'a < b', color: 'rose' }
    ],
    items: [
      { id: 'sls10', text: 'α = 70°, β = 50°', categoryId: 'agt' },
      { id: 'sls11', text: 'sin α / sin β = 1,3', categoryId: 'agt' },
      { id: 'sls12', text: 'α = 100°, β = 40°', categoryId: 'agt' },
      { id: 'sls13', text: 'α = β = 55°', categoryId: 'aeq' },
      { id: 'sls14', text: 'sin α = sin β (egy háromszögben)', categoryId: 'aeq' },
      { id: 'sls15', text: 'α = 30°, β = 30°, γ = 120°', categoryId: 'aeq' },
      { id: 'sls16', text: 'α = 30°, β = 60°', categoryId: 'alt' },
      { id: 'sls17', text: 'α = 20°, β = 120°', categoryId: 'alt' },
      { id: 'sls18', text: 'sin α / sin β = 0,8', categoryId: 'alt' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Igaz vagy hamis?',
    description: 'Válogasd szét az állításokat!',
    categories: [
      { id: 'true', name: 'Mindig igaz', color: 'emerald' },
      { id: 'false', name: 'Hamis', color: 'rose' },
      { id: 'depends', name: 'Az adatoktól függ', color: 'amber' }
    ],
    items: [
      { id: 'sls19', text: 'A szinusztétel tompaszögű háromszögben is érvényes', categoryId: 'true' },
      { id: 'sls20', text: 'a : b : c = sin α : sin β : sin γ', categoryId: 'true' },
      { id: 'sls21', text: 'Ha α > β, akkor a > b', categoryId: 'true' },
      { id: 'sls22', text: 'a / b = α / β', categoryId: 'false' },
      { id: 'sls23', text: 'A szinusztétel csak derékszögű háromszögben használható', categoryId: 'false' },
      { id: 'sls24', text: 'Ha a = 2b, akkor α = 2β', categoryId: 'false' },
      { id: 'sls25', text: 'A szinusztétellel kapott szög hegyesszög', categoryId: 'depends' },
      { id: 'sls26', text: 'Két oldal és az egyikkel szemközti szög egyetlen háromszöget határoz meg', categoryId: 'depends' },
      { id: 'sls27', text: 'A háromszög leghosszabb oldalával szemközti szög tompaszög', categoryId: 'depends' }
    ]
  }
];

const SINE_LAW_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: SINE_LAW_SORTER_LEVELS_LIST[0],
  2: SINE_LAW_SORTER_LEVELS_LIST[1],
  3: SINE_LAW_SORTER_LEVELS_LIST[2]
};

export const SineLawSorter: React.FC<SineLawSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-trig-szinusztetel-sorter',
  topicTitle = '9. A szinusztétel – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="trigonometria"
      topicId={topicId}
      subtopicId="a-szinusztetel"
      title={topicTitle}
      subtitle="Rendszerezd a feladattípusokat, az oldalak nagyságát és az állításokat!"
      levels={SINE_LAW_SORTER_LEVELS}
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

export default SineLawSorter;
