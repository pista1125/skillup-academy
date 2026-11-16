import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface AlgebraSummarySorterProps {
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

const ALGEBRA_SUMMARY_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Milyen típusú az egyenlet?",
    description: "Rendezés után elsőfokú, másodfokú, vagy exponenciális / logaritmusos az egyenlet?",
    categories: [
      { id: "lin", name: "elsőfokú", color: "emerald" },
      { id: "quad", name: "másodfokú", color: "blue" },
      { id: "explog", name: "exponenciális vagy logaritmusos", color: "purple" }
    ],
    items: [
      { id: "als101", text: "4x − 3 = 2x + 7", categoryId: "lin" },
      { id: "als102", text: "3 − 7x = −2", categoryId: "lin" },
      { id: "als103", text: "5x = 0", categoryId: "lin" },
      { id: "als104", text: "2(x + 1) = x − 4", categoryId: "lin" },
      { id: "als105", text: "x/3 + 1 = 5", categoryId: "lin" },
      { id: "als106", text: "12 000n + 4000 = 13 000n − 4000", categoryId: "lin" },
      { id: "als107", text: "3,5a + 8 = 2,5(a + 8)", categoryId: "lin" },
      { id: "als108", text: "(x + 2)² = x² + 8", categoryId: "lin" },
      { id: "als109", text: "−7x + 16 = 13", categoryId: "lin" },
      { id: "als110", text: "3x² − 12x = 0", categoryId: "quad" },
      { id: "als111", text: "x² − 16x + 39 = 0", categoryId: "quad" },
      { id: "als112", text: "2x² − x − 1 = 0", categoryId: "quad" },
      { id: "als113", text: "(2x − 1)(2x + 1) = 8", categoryId: "quad" },
      { id: "als114", text: "−2x² + 4x − 3 = 0", categoryId: "quad" },
      { id: "als115", text: "x(x − 1) = 2", categoryId: "quad" },
      { id: "als116", text: "(x + 3)² − 4 = −3", categoryId: "quad" },
      { id: "als117", text: "x² = 9", categoryId: "quad" },
      { id: "als118", text: "3x² − 8x − 35 = 0", categoryId: "quad" },
      { id: "als119", text: "2ˣ = 32", categoryId: "explog" },
      { id: "als120", text: "lg(5 − 6x) = −2", categoryId: "explog" },
      { id: "als121", text: "3ˣ · 9⁻ˣ = 27", categoryId: "explog" },
      { id: "als122", text: "0,97ˣ = 0,5", categoryId: "explog" },
      { id: "als123", text: "log₂ x = 5", categoryId: "explog" },
      { id: "als124", text: "1,0014ˣ = 1,161", categoryId: "explog" },
      { id: "als125", text: "10ˣ = 0,01", categoryId: "explog" },
      { id: "als126", text: "lg x + lg 2 = 1", categoryId: "explog" },
      { id: "als127", text: "5ˣ⁺¹ = 125", categoryId: "explog" }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Hány valós gyök?",
    description: "Számold ki a diszkriminánst, és döntsd el, hány valós gyöke van az egyenletnek!",
    categories: [
      { id: "two", name: "két különböző valós gyök (D > 0)", color: "emerald" },
      { id: "one", name: "egy kettős gyök (D = 0)", color: "amber" },
      { id: "none", name: "nincs valós gyök (D < 0)", color: "rose" }
    ],
    items: [
      { id: "als201", text: "x² − 5x + 6 = 0", categoryId: "two" },
      { id: "als202", text: "3x² − 8x − 35 = 0", categoryId: "two" },
      { id: "als203", text: "2x² − x − 1 = 0", categoryId: "two" },
      { id: "als204", text: "x² − 16x + 39 = 0", categoryId: "two" },
      { id: "als205", text: "x² − 9 = 0", categoryId: "two" },
      { id: "als206", text: "3x² − 12x = 0", categoryId: "two" },
      { id: "als207", text: "x² + x − 1 = 0", categoryId: "two" },
      { id: "als208", text: "−x² + 4x + 5 = 0", categoryId: "two" },
      { id: "als209", text: "x² + 6x + 5 = 0", categoryId: "two" },
      { id: "als210", text: "3x² − 12x + 12 = 0", categoryId: "one" },
      { id: "als211", text: "x² − 4x + 4 = 0", categoryId: "one" },
      { id: "als212", text: "x² + 10x + 25 = 0", categoryId: "one" },
      { id: "als213", text: "4x² − 4x + 1 = 0", categoryId: "one" },
      { id: "als214", text: "x² = 0", categoryId: "one" },
      { id: "als215", text: "9x² + 6x + 1 = 0", categoryId: "one" },
      { id: "als216", text: "x² − 2x + 1 = 0", categoryId: "one" },
      { id: "als217", text: "2x² + 4x + 2 = 0", categoryId: "one" },
      { id: "als218", text: "−x² + 6x − 9 = 0", categoryId: "one" },
      { id: "als219", text: "−2x² + 4x − 3 = 0", categoryId: "none" },
      { id: "als220", text: "x² + 1 = 0", categoryId: "none" },
      { id: "als221", text: "x² + x + 1 = 0", categoryId: "none" },
      { id: "als222", text: "2x² + 3x + 5 = 0", categoryId: "none" },
      { id: "als223", text: "x² − 2x + 5 = 0", categoryId: "none" },
      { id: "als224", text: "3x² + 2 = 0", categoryId: "none" },
      { id: "als225", text: "x² + 4x + 5 = 0", categoryId: "none" },
      { id: "als226", text: "−x² + x − 1 = 0", categoryId: "none" },
      { id: "als227", text: "5x² − x + 1 = 0", categoryId: "none" }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Milyen alakú a megoldáshalmaz?",
    description: "Oldd meg fejben a valós számok halmazán: korlátos intervallum, egy félegyenes vagy két félegyenes uniója?",
    categories: [
      { id: "int", name: "korlátos intervallum", color: "blue" },
      { id: "ray", name: "egy félegyenes", color: "emerald" },
      { id: "two", name: "két félegyenes uniója", color: "rose" }
    ],
    items: [
      { id: "als301", text: "x² − 4 < 0", categoryId: "int" },
      { id: "als302", text: "3x² − 8x − 35 < 0", categoryId: "int" },
      { id: "als303", text: "(x − 1)(x − 5) ≤ 0", categoryId: "int" },
      { id: "als304", text: "lg(5 − 6x) ≤ −2", categoryId: "int" },
      { id: "als305", text: "|x| < 3", categoryId: "int" },
      { id: "als306", text: "x² − x − 6 ≤ 0", categoryId: "int" },
      { id: "als307", text: "−x² + 9 > 0", categoryId: "int" },
      { id: "als308", text: "(x + 3)² − 4 < 0", categoryId: "int" },
      { id: "als309", text: "x² < 1", categoryId: "int" },
      { id: "als310", text: "4x − 1 > −6", categoryId: "ray" },
      { id: "als311", text: "2x − 7 ≤ 0", categoryId: "ray" },
      { id: "als312", text: "0,3⁴ˣ⁻¹ < 0,09⁻³", categoryId: "ray" },
      { id: "als313", text: "lg(7 − 3x) > 0", categoryId: "ray" },
      { id: "als314", text: "−3x + 6 ≥ 0", categoryId: "ray" },
      { id: "als315", text: "2ˣ > 8", categoryId: "ray" },
      { id: "als316", text: "0,5ˣ ≥ 4", categoryId: "ray" },
      { id: "als317", text: "5x + 2 < 3x", categoryId: "ray" },
      { id: "als318", text: "3ˣ ≤ 1/9", categoryId: "ray" },
      { id: "als319", text: "x² − 4 > 0", categoryId: "two" },
      { id: "als320", text: "3x² − 8x − 35 > 0", categoryId: "two" },
      { id: "als321", text: "(x − 1)(x − 5) ≥ 0", categoryId: "two" },
      { id: "als322", text: "|x| > 3", categoryId: "two" },
      { id: "als323", text: "x² − x − 6 > 0", categoryId: "two" },
      { id: "als324", text: "−x² + 9 < 0", categoryId: "two" },
      { id: "als325", text: "x² ≥ 1", categoryId: "two" },
      { id: "als326", text: "(x + 3)² − 4 ≥ 0", categoryId: "two" },
      { id: "als327", text: "2x² − x − 1 > 0", categoryId: "two" }
    ]
  }
};

export const AlgebraSummarySorter: React.FC<AlgebraSummarySorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-sum-algebra-sorter',
  topicTitle = "4. Algebra – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="rendszerezo-osszefoglalas"
      topicId={topicId}
      subtopicId="algebra"
      title={topicTitle}
      subtitle="Csoportosítsd az egyenleteket típus és diszkrimináns szerint, az egyenlőtlenségeket a megoldáshalmazuk alakja szerint!"
      levels={ALGEBRA_SUMMARY_SORTER_LEVELS}
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

export default AlgebraSummarySorter;
