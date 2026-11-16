import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FrustumAreaSorterProps {
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

const FRUSTUM_AREA_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Melyik része a felszínnek?",
    description: "Döntsd el, hogy az adott terület az alaplap, a fedőlap vagy a palást része!",
    categories: [
      { id: 'base', name: "Alaplap (T)", color: 'blue' },
      { id: 'top', name: "Fedőlap (t)", color: 'emerald' },
      { id: 'lat', name: "Palást (P)", color: 'amber' }
    ],
    items: [
      { id: 'fas1', text: "R²π (csonkakúp)", categoryId: 'base' },
      { id: 'fas2', text: "a² (négyzetes csonkagúla, a az alapél)", categoryId: 'base' },
      { id: 'fas3', text: "A nagyobbik szabályos sokszög területe", categoryId: 'base' },
      { id: 'fas4', text: "r²π (csonkakúp)", categoryId: 'top' },
      { id: 'fas5', text: "b² (négyzetes csonkagúla, b a fedőél)", categoryId: 'top' },
      { id: 'fas6', text: "A kisebbik szabályos sokszög területe", categoryId: 'top' },
      { id: 'fas7', text: "(R + r)πa", categoryId: 'lat' },
      { id: 'fas8', text: "n darab egybevágó szimmetrikus trapéz", categoryId: 'lat' },
      { id: 'fas9', text: "A kiterített körgyűrűcikk", categoryId: 'lat' }
    ]
  },
  {
    level: 2,
    title: "2. szint: Mit kell előbb kiszámolni?",
    description: "Csoportosítsd a feladatokat aszerint, hogy mi a hiányzó lépés!",
    categories: [
      { id: 'slant', name: "Előbb az alkotó / oldallapmagasság kell", color: 'purple' },
      { id: 'direct', name: "Közvetlenül behelyettesíthető", color: 'teal' },
      { id: 'equation', name: "Egyenletet kell megoldani", color: 'rose' }
    ],
    items: [
      { id: 'fas10', text: "Csonkakúp felszíne R, r és M ismeretében", categoryId: 'slant' },
      { id: 'fas11', text: "Négyzetes csonkagúla felszíne a, b és M ismeretében", categoryId: 'slant' },
      { id: 'fas12', text: "Lámpaernyő anyaga a két sugárból és a magasságból", categoryId: 'slant' },
      { id: 'fas13', text: "Csonkakúp palástja R, r és a ismeretében", categoryId: 'direct' },
      { id: 'fas14', text: "Négyzetes csonkagúla felszíne a, b és m ismeretében", categoryId: 'direct' },
      { id: 'fas15', text: "Csonkakúp felszíne R, r és a ismeretében", categoryId: 'direct' },
      { id: 'fas16', text: "Oldallapmagasság a felszínből, a-ból és b-ből", categoryId: 'equation' },
      { id: 'fas17', text: "Fedőél a felszínből, a-ból és m-ből (másodfokú)", categoryId: 'equation' },
      { id: 'fas18', text: "Az alkotó a palást területéből, R-ből és r-ből", categoryId: 'equation' }
    ]
  },
  {
    level: 3,
    title: "3. szint: Igaz vagy hamis?",
    description: "Válogasd szét az állításokat!",
    categories: [
      { id: 'true', name: "Mindig igaz", color: 'emerald' },
      { id: 'false', name: "Hamis", color: 'rose' },
      { id: 'depends', name: "Az adatoktól függ", color: 'amber' }
    ],
    items: [
      { id: 'fas19', text: "A csonkakúp alkotója hosszabb a magasságánál", categoryId: 'true' },
      { id: 'fas20', text: "A palást területe nem függ attól, hogy a csonkakúp alapja felül vagy alul van", categoryId: 'true' },
      { id: 'fas21', text: "Ha minden méret kétszeres, a felszín négyszeres", categoryId: 'true' },
      { id: 'fas22', text: "A csonkakúp palástja (R − r)πa", categoryId: 'false' },
      { id: 'fas23', text: "A palást kiszámításához a test magassága kell az alkotó helyett", categoryId: 'false' },
      { id: 'fas24', text: "A csonkakúp palástja kiterítve körcikk", categoryId: 'false' },
      { id: 'fas25', text: "A palást nagyobb, mint az alaplap és a fedőlap együtt", categoryId: 'depends' },
      { id: 'fas26', text: "Az oldallap 45°-nál kisebb szöget zár be az alaplappal", categoryId: 'depends' },
      { id: 'fas27', text: "A kiterített palást középponti szöge 180°-nál nagyobb", categoryId: 'depends' }
    ]
  }
];

const FRUSTUM_AREA_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: FRUSTUM_AREA_SORTER_LEVELS_LIST[0],
  2: FRUSTUM_AREA_SORTER_LEVELS_LIST[1],
  3: FRUSTUM_AREA_SORTER_LEVELS_LIST[2]
};

export const FrustumAreaSorter: React.FC<FrustumAreaSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-ter-csonka-felszin-sorter',
  topicTitle = "15. A csonkagúla és a csonkakúp felszíne – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="a-csonkagula-es-a-csonkakup-felszine"
      title={topicTitle}
      subtitle="Rendszerezd a felszín részeit, a számolási lépéseket és az állításokat!"
      levels={FRUSTUM_AREA_SORTER_LEVELS}
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

export default FrustumAreaSorter;
