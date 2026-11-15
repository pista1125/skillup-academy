import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface RightTriangleSolvingSorterProps {
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

const RIGHT_TRIANGLE_SOLVING_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik szögfüggvényt használod?',
    description: 'Döntsd el, melyik szögfüggvényben szerepel a két ismert és a keresett adat!',
    categories: [
      { id: 'sin', name: 'sin (szemközti és átfogó)', color: 'rose' },
      { id: 'cos', name: 'cos (melletti és átfogó)', color: 'emerald' },
      { id: 'tg', name: 'tg (két befogó)', color: 'blue' }
    ],
    items: [
      { id: 'rtss1', text: 'Egyenlő szárú △: AD = 10,8 cm (szemközti), AB = 12 cm (átfogó) ⇒ α', categoryId: 'sin' },
      { id: 'rtss2', text: 'Új út: AB = 30 km, A-nál 37° ⇒ a trapéz m magassága', categoryId: 'sin' },
      { id: 'rtss3', text: 'Hegyről 6°-kal lefelé, 435 m légvonalban ⇒ szintkülönbség', categoryId: 'sin' },
      { id: 'rtss4', text: 'BF = 6 cm (melletti), B-nél 64,2° ⇒ a BC szár', categoryId: 'cos' },
      { id: 'rtss5', text: 'Daru: k hosszú gém, α szög ⇒ vízszintes távolság d', categoryId: 'cos' },
      { id: 'rtss6', text: '5 m-es létra alja 1,5 m-re a faltól ⇒ a létra és a talaj szöge', categoryId: 'cos' },
      { id: 'rtss7', text: 'Szabadság-szobor: 47 m magas talapzat, 70 m távolság ⇒ emelkedési szög', categoryId: 'tg' },
      { id: 'rtss8', text: 'Torony 30 m-ről 38°-os szögben látszik ⇒ magassága', categoryId: 'tg' },
      { id: 'rtss9', text: 'Téglalap két oldala ismert ⇒ az átló és az oldal szöge', categoryId: 'tg' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik művelet kell?',
    description: 'Csoportosítsd a lépéseket aszerint, hogy szorozni, osztani vagy a szöget visszakeresni kell!',
    categories: [
      { id: 'mult', name: 'Szorzás: oldal · szögfüggvény', color: 'purple' },
      { id: 'div', name: 'Osztás: oldal : szögfüggvény', color: 'amber' },
      { id: 'inv', name: 'Szög visszakeresése (sin⁻¹, cos⁻¹, tg⁻¹)', color: 'teal' }
    ],
    items: [
      { id: 'rtss10', text: 'sin 37° = m / 30 ⇒ m = ?', categoryId: 'mult' },
      { id: 'rtss11', text: 'cos δ = QD / 20 ⇒ QD = ?', categoryId: 'mult' },
      { id: 'rtss12', text: 'Daru: sin 60° = h / 12 ⇒ h = ?', categoryId: 'mult' },
      { id: 'rtss13', text: 'cos 64,2° = 6 / x ⇒ x = ?', categoryId: 'div' },
      { id: 'rtss14', text: 'Húrtrapéz: sin 67° = 10,2 / x ⇒ x = ?', categoryId: 'div' },
      { id: 'rtss15', text: 'tg 33,9° = 47 / x ⇒ x = ?', categoryId: 'div' },
      { id: 'rtss16', text: 'sin α = 0,9 ⇒ α = ?', categoryId: 'inv' },
      { id: 'rtss17', text: 'tg α₂ = 93 / 70 ⇒ α₂ = ?', categoryId: 'inv' },
      { id: 'rtss18', text: 'sin δ = 18,05 / 20 ⇒ δ = ?', categoryId: 'inv' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Igaz vagy hamis?',
    description: 'Válogasd szét az állításokat (α hegyesszög)!',
    categories: [
      { id: 'true', name: 'Mindig igaz', color: 'emerald' },
      { id: 'false', name: 'Hamis', color: 'rose' },
      { id: 'depends', name: 'A konkrét adatoktól függ', color: 'amber' }
    ],
    items: [
      { id: 'rtss19', text: 'sin²α + cos²α = 1', categoryId: 'true' },
      { id: 'rtss20', text: 'ctg α = tg(90° − α)', categoryId: 'true' },
      { id: 'rtss21', text: 'Hegyesszög szinusza és koszinusza 0 és 1 közötti szám', categoryId: 'true' },
      { id: 'rtss22', text: 'cos α = 6 / x ⇒ x = 6 · cos α', categoryId: 'false' },
      { id: 'rtss23', text: 'tg α = cos α / sin α', categoryId: 'false' },
      { id: 'rtss24', text: 'Derékszögű háromszögben egy befogó hosszabb lehet az átfogónál', categoryId: 'false' },
      { id: 'rtss25', text: 'sin α > cos α', categoryId: 'depends' },
      { id: 'rtss26', text: 'tg α > 1', categoryId: 'depends' },
      { id: 'rtss27', text: 'Egy egyenlő szárú háromszög alapon fekvő szöge nagyobb a szárszögénél', categoryId: 'depends' }
    ]
  }
];

const RIGHT_TRIANGLE_SOLVING_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: RIGHT_TRIANGLE_SOLVING_SORTER_LEVELS_LIST[0],
  2: RIGHT_TRIANGLE_SOLVING_SORTER_LEVELS_LIST[1],
  3: RIGHT_TRIANGLE_SOLVING_SORTER_LEVELS_LIST[2]
};

export const RightTriangleSolvingSorter: React.FC<RightTriangleSolvingSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-trig-derekszogu-megoldas-sorter',
  topicTitle = '5. Hosszúságok és szögek kiszámítása – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="trigonometria"
      topicId={topicId}
      subtopicId="hosszusagok-es-szogek-kiszamitasa"
      title={topicTitle}
      subtitle="Rendszerezd, melyik szögfüggvény és melyik művelet kell, és mely állítások igazak!"
      levels={RIGHT_TRIANGLE_SOLVING_SORTER_LEVELS}
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

export default RightTriangleSolvingSorter;
