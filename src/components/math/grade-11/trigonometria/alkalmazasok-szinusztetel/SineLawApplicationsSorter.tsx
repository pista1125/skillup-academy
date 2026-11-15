import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SineLawApplicationsSorterProps {
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

const SINE_LAW_APPLICATIONS_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hány háromszög van?',
    description: 'Adott a, b és az a oldallal szemközti α szög. Hány (nem egybevágó) háromszög felel meg? (sin β = b · sin α / a)',
    categories: [
      { id: 'zero', name: 'Nincs megoldás', color: 'rose' },
      { id: 'one', name: 'Egy megoldás', color: 'amber' },
      { id: 'two', name: 'Két megoldás', color: 'emerald' }
    ],
    items: [
      { id: 'slas1', text: 'a = 2 cm, b = 7 cm, α = 68°', categoryId: 'zero' },
      { id: 'slas2', text: 'a = 3 cm, b = 8 cm, α = 40°', categoryId: 'zero' },
      { id: 'slas3', text: 'a = 6 cm, b = 7,5 cm, α = 65°', categoryId: 'zero' },
      { id: 'slas4', text: 'a = 8 cm, b = 7 cm, α = 68°', categoryId: 'one' },
      { id: 'slas5', text: 'a = 5 cm, b = 10 cm, α = 30°', categoryId: 'one' },
      { id: 'slas6', text: 'a = 7 cm, b = 7 cm, α = 50°', categoryId: 'one' },
      { id: 'slas7', text: 'a = 4,5 cm, b = 6 cm, α = 45°', categoryId: 'two' },
      { id: 'slas8', text: 'a = 5 cm, b = 8 cm, α = 30°', categoryId: 'two' },
      { id: 'slas9', text: 'a = 6 cm, b = 7,5 cm, α = 30°', categoryId: 'two' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik lépéshez mi kell?',
    description: 'Csoportosítsd a repülős, hegyes, tornyos és hajós feladatok lépéseit!',
    categories: [
      { id: 'sinelaw', name: 'Szinusztétel (ferdeszögű háromszög)', color: 'blue' },
      { id: 'right', name: 'Derékszögű háromszög szögfüggvénye', color: 'purple' },
      { id: 'angles', name: 'Szögösszeg, mellékszög, váltószög', color: 'teal' }
    ],
    items: [
      { id: 'slas10', text: 'd = R₁J kiszámítása az R₁R₂J háromszögből', categoryId: 'sinelaw' },
      { id: 'slas11', text: 'BH távolság a hegy ABH háromszögéből', categoryId: 'sinelaw' },
      { id: 'slas12', text: 'A pisai torony hossza a 9 m-es árnyékból', categoryId: 'sinelaw' },
      { id: 'slas13', text: 'A gép repülési magassága, ha d már ismert', categoryId: 'right' },
      { id: 'slas14', text: 'A hegycsúcs m magassága, ha BH már ismert', categoryId: 'right' },
      { id: 'slas15', text: 'A hajó távolsága a parttól, ha a hajó és az egyik végpont távolsága ismert', categoryId: 'right' },
      { id: 'slas16', text: 'Az R₂-nél lévő szög: 180° − 57° = 123°', categoryId: 'angles' },
      { id: 'slas17', text: 'A J-nél lévő szög: 180° − 27° − 123° = 30°', categoryId: 'angles' },
      { id: 'slas18', text: 'A J-nél fekvő 27°-os hegyesszög (az R₁-nél lévő szög váltószöge)', categoryId: 'angles' }
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
      { id: 'slas19', text: 'Ha a ≥ b, akkor az a, b, α adatokhoz legfeljebb egy háromszög tartozik', categoryId: 'true' },
      { id: 'slas20', text: 'Két megoldás esetén a két β szög összege 180°', categoryId: 'true' },
      { id: 'slas21', text: 'Ha sin β = 1, a háromszög derékszögű', categoryId: 'true' },
      { id: 'slas22', text: 'A sin⁻¹ funkció mindig megadja az összes lehetséges szöget', categoryId: 'false' },
      { id: 'slas23', text: 'Ha sin β < 1, akkor mindig két háromszög van', categoryId: 'false' },
      { id: 'slas24', text: 'Egy háromszögnek két tompaszöge is lehet', categoryId: 'false' },
      { id: 'slas25', text: 'Az a, b, α adatokhoz két háromszög tartozik', categoryId: 'depends' },
      { id: 'slas26', text: 'A tompaszögű β jelölt is megoldás', categoryId: 'depends' },
      { id: 'slas27', text: 'A szerkesztésnél a C körüli kör két pontban metszi a szögszárat', categoryId: 'depends' }
    ]
  }
];

const SINE_LAW_APPLICATIONS_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: SINE_LAW_APPLICATIONS_SORTER_LEVELS_LIST[0],
  2: SINE_LAW_APPLICATIONS_SORTER_LEVELS_LIST[1],
  3: SINE_LAW_APPLICATIONS_SORTER_LEVELS_LIST[2]
};

export const SineLawApplicationsSorter: React.FC<SineLawApplicationsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-trig-alkalmazasok-sorter',
  topicTitle = '10. Alkalmazások (szinusztétel) – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="trigonometria"
      topicId={topicId}
      subtopicId="alkalmazasok-szinusztetel"
      title={topicTitle}
      subtitle="Döntsd el a megoldások számát, rendszerezd a számolási lépéseket és az állításokat!"
      levels={SINE_LAW_APPLICATIONS_SORTER_LEVELS}
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

export default SineLawApplicationsSorter;
