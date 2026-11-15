import React from 'react';
import { SorterTemplate, SorterLevelData } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface AltitudeLegTheoremsSorterProps {
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

const ALTITUDE_LEG_THEOREMS_SORTER_LEVELS: SorterLevelData[] = [
  {
    level: 1,
    title: '1. szint: Képletek és tételek csoportosítása',
    description: 'Csoportosítsd az egyenleteket és leírásokat a megfelelő tételhez!',
    categories: [
      { id: 'altitude_thm', name: 'Magasságtétel és mértani közép', color: 'rose' },
      { id: 'leg_thm', name: 'Befogótétel', color: 'emerald' },
      { id: 'pythagoras_area', name: 'Pitagorasz-tétel és Terület', color: 'blue' }
    ],
    items: [
      { id: 'as1', text: 'm² = p · q', categoryId: 'altitude_thm' },
      { id: 'as2', text: 'm = √(p · q)', categoryId: 'altitude_thm' },
      { id: 'as3', text: 'Az átfogóhoz tartozó magasság az átfogószeletek mértani közepe', categoryId: 'altitude_thm' },
      { id: 'as4', text: 'a² = p · c', categoryId: 'leg_thm' },
      { id: 'as5', text: 'b² = q · c', categoryId: 'leg_thm' },
      { id: 'as6', text: 'A befogó az átfogó és a saját merőleges vetületének mértani közepe', categoryId: 'leg_thm' },
      { id: 'as7', text: 'a² + b² = c²', categoryId: 'pythagoras_area' },
      { id: 'as8', text: 'T = (c · m) / 2', categoryId: 'pythagoras_area' },
      { id: 'as9', text: 'T = (a · b) / 2', categoryId: 'pythagoras_area' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Számításos eredmények kategóriái',
    description: 'Csoportosítsd a geometriai példák számszerű eredményeit szakaszfajták szerint!',
    categories: [
      { id: 'height_m', name: 'Magasság (m) értéke', color: 'rose' },
      { id: 'leg_ab', name: 'Befogó (a vagy b) értéke', color: 'emerald' },
      { id: 'projection_pq', name: 'Vetület (p vagy q) értéke', color: 'blue' }
    ],
    items: [
      { id: 'as10', text: 'm = 7,2 cm (ha p = 5,4 cm és q = 9,6 cm)', categoryId: 'height_m' },
      { id: 'as11', text: 'm = 25,1 m (a 42 m és 15 m szikla-feladatnál)', categoryId: 'height_m' },
      { id: 'as12', text: 'm = √6 ≈ 2,45 cm (ha p = 3 cm és q = 2 cm)', categoryId: 'height_m' },
      { id: 'as13', text: 'a = 9 cm (ha p = 5,4 cm és c = 15 cm)', categoryId: 'leg_ab' },
      { id: 'as14', text: 'b = 12 cm (ha q = 9,6 cm és c = 15 cm)', categoryId: 'leg_ab' },
      { id: 'as15', text: 'a = 30 cm (ha p = 20 cm és c = 45 cm)', categoryId: 'leg_ab' },
      { id: 'as16', text: 'p = 20 cm (ha a = 30 cm és c = 45 cm)', categoryId: 'projection_pq' },
      { id: 'as17', text: 'q = 25 cm (a fenti 45 cm átfogó másik szelete)', categoryId: 'projection_pq' },
      { id: 'as18', text: 'p = 14,0625 cm (ha a = 15 cm és c = 16 cm)', categoryId: 'projection_pq' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Állítások a derékszögű háromszögről',
    description: 'Döntsd el a metrikus tételekről szóló állítások matematikai érvényességét!',
    categories: [
      { id: 'always_true', name: 'Mindig igaz állítás', color: 'emerald' },
      { id: 'cond_true', name: 'Feltételesen igaz állítás', color: 'amber' },
      { id: 'false_stmt', name: 'Matematikai tévedés / hamis', color: 'rose' }
    ],
    items: [
      { id: 'as19', text: 'Az átfogóhoz tartozó magasság két, az eredetihez hasonló derékszögű háromszögre bontja az idomot', categoryId: 'always_true' },
      { id: 'as20', text: 'Bármely derékszögű háromszögben m = √(p · q)', categoryId: 'always_true' },
      { id: 'as21', text: 'A mértani közép soha nem haladja meg a számtani közepet: √(pq) ≤ (p + q) / 2', categoryId: 'always_true' },
      { id: 'as22', text: 'A két befogótétel összegéből levezethető a Pitagorasz-tétel: a² + b² = c²', categoryId: 'always_true' },
      { id: 'as23', text: 'A magasság egyenlő a körülírt kör sugarával (m = r, csak ha p = q)', categoryId: 'cond_true' },
      { id: 'as24', text: 'A két átfogószelet hossza megegyezik (p = q, csak egyenlő szárú derékszögűnél)', categoryId: 'cond_true' },
      { id: 'as25', text: 'A magasság felezi az átfogót (csak egyenlő szárú derékszögűnél)', categoryId: 'cond_true' },
      { id: 'as26', text: 'A magasságtétel tetszőleges tompaszögű háromszögre is érvényes', categoryId: 'false_stmt' },
      { id: 'as27', text: 'A magasság szigorúan nagyobb a körülírt kör sugaránál (m > r)', categoryId: 'false_stmt' },
      { id: 'as28', text: 'A befogó négyzete az átfogó és a magasság szorzata (a² = c · m)', categoryId: 'false_stmt' }
    ]
  }
];

export const AltitudeLegTheoremsSorter: React.FC<AltitudeLegTheoremsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g10-hasonlosag',
  topicTitle = '10. Magasságtétel, befogótétel – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      topicId={topicId}
      subtopicId="magassagtetel-befogotetel"
      title={topicTitle}
      subtitle="Rendszerezd a metrikus tételeket, a numerikus számítási eredményeket és az elméleti állításokat!"
      levels={ALTITUDE_LEG_THEOREMS_SORTER_LEVELS}
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

export default AltitudeLegTheoremsSorter;

