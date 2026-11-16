import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ArithmeticSumSorterProps {
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

const ARITHMETIC_SUM_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Melyik képlettel?",
    description: "Melyik összegképlet használható közvetlenül az adatokból?",
    categories: [
      { id: "an", name: "Sₙ = (a₁ + aₙ)/2 · n", color: "blue" },
      { id: "d", name: "Sₙ = (2a₁ + (n − 1)d)/2 · n", color: "emerald" },
      { id: "no", name: "előbb a₁-et vagy d-t kell keresni", color: "amber" }
    ],
    items: [
      { id: "asums101", text: "a₁ = 2, a₁₀ = 20, n = 10", categoryId: "an" },
      { id: "asums102", text: "a₁ = 26, a₅₀ = 124, n = 50", categoryId: "an" },
      { id: "asums103", text: "a₁ = −65, a₈ = 65, n = 8", categoryId: "an" },
      { id: "asums104", text: "a₁ = 3, a₈ = 24, n = 8", categoryId: "an" },
      { id: "asums105", text: "a₁ = 1, a₄₀ = 40, n = 40", categoryId: "an" },
      { id: "asums106", text: "a₁ = 6, a₂₁ = 112, n = 21", categoryId: "an" },
      { id: "asums107", text: "a₁ = 17, a₅₅ = 125, n = 55", categoryId: "an" },
      { id: "asums108", text: "a₁ = 1, a₁₀₀ = 100, n = 100", categoryId: "an" },
      { id: "asums109", text: "a₁ = 74, a₂₇ = 48, n = 27", categoryId: "an" },
      { id: "asums110", text: "a₁ = 15, d = −1,2, n = 10", categoryId: "d" },
      { id: "asums111", text: "a₁ = 340, d = 30, n = 27", categoryId: "d" },
      { id: "asums112", text: "a₁ = 5, d = 2, n = 4", categoryId: "d" },
      { id: "asums113", text: "a₁ = 129, d = −10, n = 13", categoryId: "d" },
      { id: "asums114", text: "a₁ = 3300, d = 200, n = 18", categoryId: "d" },
      { id: "asums115", text: "a₁ = 26, d = 2, n = 50", categoryId: "d" },
      { id: "asums116", text: "a₁ = 1, d = 2, n = 20", categoryId: "d" },
      { id: "asums117", text: "a₁ = −8, d = 3, n = 11", categoryId: "d" },
      { id: "asums118", text: "a₁ = 0, d = 1, n = 30", categoryId: "d" },
      { id: "asums119", text: "a₃ = 6, a₁₀ = −15, S₂₀ = ?", categoryId: "no" },
      { id: "asums120", text: "a₁ = −5, a₆ = 5, S₂₅ = ?", categoryId: "no" },
      { id: "asums121", text: "d = 5,3, a₂₁ = 112, S₂₁ = ?", categoryId: "no" },
      { id: "asums122", text: "a₂₈ = 96, a₃₂ = 112, S₁₀ = ?", categoryId: "no" },
      { id: "asums123", text: "a₅ = 10, d = 2, S₈ = ?", categoryId: "no" },
      { id: "asums124", text: "a₂ = 7, a₄ = 11, S₆ = ?", categoryId: "no" },
      { id: "asums125", text: "a₁₀ = 0, d = −2, S₁₂ = ?", categoryId: "no" },
      { id: "asums126", text: "a₇ = 20, a₉ = 26, S₉ = ?", categoryId: "no" },
      { id: "asums127", text: "a₃ = 1, a₅ = 9, S₁₀ = ?", categoryId: "no" }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Az összeg előjele",
    description: "Pozitív, nulla vagy negatív az összeg?",
    categories: [
      { id: "p", name: "Sₙ > 0", color: "emerald" },
      { id: "z", name: "Sₙ = 0", color: "purple" },
      { id: "n", name: "Sₙ < 0", color: "rose" }
    ],
    items: [
      { id: "asums201", text: "a₁ = 15, d = −1,2: S₁₀", categoryId: "p" },
      { id: "asums202", text: "a₁ = 15, d = −1,2: S₁₆", categoryId: "p" },
      { id: "asums203", text: "a₁ = −5, d = 2: S₂₅", categoryId: "p" },
      { id: "asums204", text: "1 + 2 + … + 40", categoryId: "p" },
      { id: "asums205", text: "a₁ = 129, d = −10: S₁₃", categoryId: "p" },
      { id: "asums206", text: "a₁ = −8, d = 3: S₁₁", categoryId: "p" },
      { id: "asums207", text: "a₁ = −10, d = 4: S₇", categoryId: "p" },
      { id: "asums208", text: "a₁ = 100, d = −5: S₃₀", categoryId: "p" },
      { id: "asums209", text: "a párosok összege −14-től 132-ig", categoryId: "p" },
      { id: "asums210", text: "a₁ = 15, d = −1,2: S₂₆", categoryId: "z" },
      { id: "asums211", text: "a₁ = −65, aₙ = 65: Sₙ", categoryId: "z" },
      { id: "asums212", text: "a₁ = −3, d = 1: S₇", categoryId: "z" },
      { id: "asums213", text: "a₁ = 10, d = −2: S₁₁", categoryId: "z" },
      { id: "asums214", text: "a₁ = −1, d = 1: S₃", categoryId: "z" },
      { id: "asums215", text: "−5 + (−4) + … + 5", categoryId: "z" },
      { id: "asums216", text: "a₁ = 6, d = −1: S₁₃", categoryId: "z" },
      { id: "asums217", text: "a₁ = −9, d = 2: S₁₀", categoryId: "z" },
      { id: "asums218", text: "a₁ = 2,5, d = −0,5: S₁₁", categoryId: "z" },
      { id: "asums219", text: "a₁ = 12, d = −3: S₂₀", categoryId: "n" },
      { id: "asums220", text: "a₁ = −8, d = 3: S₃", categoryId: "n" },
      { id: "asums221", text: "a₁ = 15, d = −1,2: S₃₀", categoryId: "n" },
      { id: "asums222", text: "a₁ = −5, d = 2: S₅", categoryId: "n" },
      { id: "asums223", text: "a₁ = 0, d = −1: S₄", categoryId: "n" },
      { id: "asums224", text: "a₁ = 50, d = −10: S₁₂", categoryId: "n" },
      { id: "asums225", text: "a₁ = −1, d = 0,1: S₁₀", categoryId: "n" },
      { id: "asums226", text: "−20 + (−18) + … + 10", categoryId: "n" },
      { id: "asums227", text: "a₁ = 3, d = −2: S₅", categoryId: "n" }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Hány tagú az összeg?",
    description: "Számold meg a tagokat: n = (aₙ − a₁)/d + 1.",
    categories: [
      { id: "n20", name: "n = 20", color: "blue" },
      { id: "n25", name: "n = 25", color: "amber" },
      { id: "n50", name: "n = 50", color: "teal" }
    ],
    items: [
      { id: "asums301", text: "1 + 2 + … + 20", categoryId: "n20" },
      { id: "asums302", text: "2 + 4 + … + 40", categoryId: "n20" },
      { id: "asums303", text: "1 + 3 + … + 39", categoryId: "n20" },
      { id: "asums304", text: "5 + 10 + … + 100", categoryId: "n20" },
      { id: "asums305", text: "−9 + (−7) + … + 29", categoryId: "n20" },
      { id: "asums306", text: "100 + 101 + … + 119", categoryId: "n20" },
      { id: "asums307", text: "0,5 + 1 + … + 10", categoryId: "n20" },
      { id: "asums308", text: "3 + 6 + … + 60", categoryId: "n20" },
      { id: "asums309", text: "−19 + (−17) + … + 19", categoryId: "n20" },
      { id: "asums310", text: "1 + 2 + … + 25", categoryId: "n25" },
      { id: "asums311", text: "2 + 4 + … + 50", categoryId: "n25" },
      { id: "asums312", text: "1 + 3 + … + 49", categoryId: "n25" },
      { id: "asums313", text: "4 + 8 + … + 100", categoryId: "n25" },
      { id: "asums314", text: "76 + 77 + … + 100", categoryId: "n25" },
      { id: "asums315", text: "−12 + (−11) + … + 12", categoryId: "n25" },
      { id: "asums316", text: "10 + 20 + … + 250", categoryId: "n25" },
      { id: "asums317", text: "0 + 3 + … + 72", categoryId: "n25" },
      { id: "asums318", text: "−5 + (−3) + … + 43", categoryId: "n25" },
      { id: "asums319", text: "26 + 28 + … + 124", categoryId: "n50" },
      { id: "asums320", text: "1 + 2 + … + 50", categoryId: "n50" },
      { id: "asums321", text: "2 + 4 + … + 100", categoryId: "n50" },
      { id: "asums322", text: "1 + 3 + … + 99", categoryId: "n50" },
      { id: "asums323", text: "51 + 52 + … + 100", categoryId: "n50" },
      { id: "asums324", text: "−49 + (−47) + … + 49", categoryId: "n50" },
      { id: "asums325", text: "0,2 + 0,4 + … + 10", categoryId: "n50" },
      { id: "asums326", text: "7 + 14 + … + 350", categoryId: "n50" },
      { id: "asums327", text: "−24 + (−23) + … + 25", categoryId: "n50" }
    ]
  }
};

export const ArithmeticSumSorter: React.FC<ArithmeticSumSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-seq-szamtani-osszeg-sorter',
  topicTitle = "4. A számtani sorozat első n tagjának összege – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="sorozatok"
      topicId={topicId}
      subtopicId="a-szamtani-sorozat-elso-n-tagjanak-osszege"
      title={topicTitle}
      subtitle="Válaszd ki a megfelelő képletet, becsüld meg az összeg előjelét, és számold meg a tagokat!"
      levels={ARITHMETIC_SUM_SORTER_LEVELS}
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

export default ArithmeticSumSorter;
