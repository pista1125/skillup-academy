import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TrigAreaFormulaSorterProps {
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

const TRIG_AREA_FORMULA_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik képlet kell?',
    description: 'Döntsd el, melyik területképlettel számolnál a megadott adatokból!',
    categories: [
      { id: 'tri', name: 'T = a · b · sin γ / 2 (háromszög)', color: 'emerald' },
      { id: 'para', name: 'T = a · b · sin γ (paralelogramma)', color: 'indigo' },
      { id: 'base', name: 'T = a · mₐ / 2 (alap és magasság)', color: 'amber' }
    ],
    items: [
      { id: 'tafs1', text: 'Háromszög: 4,5 cm, 2,8 cm és a közbezárt 73°', categoryId: 'tri' },
      { id: 'tafs2', text: 'Az AKB háromszög: két sugár és a köztük lévő hegyesszög', categoryId: 'tri' },
      { id: 'tafs3', text: 'A deltoid fele: 7 cm és 14 cm, köztük 82,2°', categoryId: 'tri' },
      { id: 'tafs4', text: 'Víztározó: 1,3 km és 1,2 km oldal, 41°-os hegyesszög', categoryId: 'para' },
      { id: 'tafs5', text: 'Rombusz: oldala 5 cm, hegyesszöge 50°', categoryId: 'para' },
      { id: 'tafs6', text: 'Paralelogramma: 8 cm és 7,5 cm oldal, ismert hegyesszög', categoryId: 'para' },
      { id: 'tafs7', text: 'Háromszög: alap 6 cm, a hozzá tartozó magasság 4 cm', categoryId: 'base' },
      { id: 'tafs8', text: 'Derékszögű háromszög: mindkét befogó ismert', categoryId: 'base' },
      { id: 'tafs9', text: 'Egyenlő szárú háromszög: alap és az alaphoz tartozó magasság', categoryId: 'base' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hogyan változik a terület?',
    description: 'A háromszög két oldala a és b, a közrefogott hegyesszög γ. Hogyan változik T = a · b · sin γ / 2?',
    categories: [
      { id: 'up', name: 'A terület nő', color: 'emerald' },
      { id: 'down', name: 'A terület csökken', color: 'rose' },
      { id: 'same', name: 'A terület nem változik', color: 'slate' }
    ],
    items: [
      { id: 'tafs10', text: 'γ-t 30°-ról 60°-ra növeljük', categoryId: 'up' },
      { id: 'tafs11', text: 'a-t kétszeresére növeljük', categoryId: 'up' },
      { id: 'tafs12', text: 'Mindkét oldalt 1%-kal megnöveljük', categoryId: 'up' },
      { id: 'tafs13', text: 'γ-t 70°-ról 20°-ra csökkentjük', categoryId: 'down' },
      { id: 'tafs14', text: 'b-t felére csökkentjük', categoryId: 'down' },
      { id: 'tafs15', text: 'a-t 10%-kal csökkentjük, b és γ marad', categoryId: 'down' },
      { id: 'tafs16', text: 'a-t kétszeresére, b-t felére változtatjuk', categoryId: 'same' },
      { id: 'tafs17', text: 'A háromszöget eltoljuk vagy elforgatjuk', categoryId: 'same' },
      { id: 'tafs18', text: 'Az a és b oldal szerepét felcseréljük', categoryId: 'same' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Igaz vagy hamis?',
    description: 'Válogasd szét az állításokat (γ hegyesszög)!',
    categories: [
      { id: 'true', name: 'Mindig igaz', color: 'emerald' },
      { id: 'false', name: 'Hamis', color: 'rose' },
      { id: 'depends', name: 'A konkrét adatoktól függ', color: 'amber' }
    ],
    items: [
      { id: 'tafs19', text: 'A paralelogramma területe kétszerese az egyik átlója által levágott háromszög területének', categoryId: 'true' },
      { id: 'tafs20', text: 'Rögzített oldalak mellett a hegyesszög növelésével a háromszög területe nő', categoryId: 'true' },
      { id: 'tafs21', text: 'A háromszög területe legfeljebb a · b / 2', categoryId: 'true' },
      { id: 'tafs22', text: 'A háromszög területe T = a · b · cos γ / 2', categoryId: 'false' },
      { id: 'tafs23', text: 'A képletbe a háromszög bármelyik szöge beírható', categoryId: 'false' },
      { id: 'tafs24', text: 'Ha minden oldal 1%-kal nő, a terület is pontosan 1%-kal nő', categoryId: 'false' },
      { id: 'tafs25', text: 'A háromszög területe nagyobb 10 cm²-nél', categoryId: 'depends' },
      { id: 'tafs26', text: 'A 6 cm és 5 cm oldalú paralelogramma területe 15 cm²', categoryId: 'depends' },
      { id: 'tafs27', text: 'A paralelogramma területe nagyobb az oldalai szorzatának felénél', categoryId: 'depends' }
    ]
  }
];

const TRIG_AREA_FORMULA_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: TRIG_AREA_FORMULA_SORTER_LEVELS_LIST[0],
  2: TRIG_AREA_FORMULA_SORTER_LEVELS_LIST[1],
  3: TRIG_AREA_FORMULA_SORTER_LEVELS_LIST[2]
};

export const TrigAreaFormulaSorter: React.FC<TrigAreaFormulaSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-trig-teruletkeplet-sorter',
  topicTitle = '6. Új területképlet – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="trigonometria"
      topicId={topicId}
      subtopicId="uj-teruletkeplet"
      title={topicTitle}
      subtitle="Rendszerezd a területképleteket, a terület változását és az állításokat!"
      levels={TRIG_AREA_FORMULA_SORTER_LEVELS}
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

export default TrigAreaFormulaSorter;
