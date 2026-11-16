import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SequenceDefinitionSorterProps {
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

const SEQUENCE_DEFINITION_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Hogyan adtuk meg?",
    description: "Képlet, rekurzió vagy utasítás?",
    categories: [
      { id: "k", name: "képlettel", color: "blue" },
      { id: "r", name: "rekurzív módon", color: "emerald" },
      { id: "u", name: "utasítással", color: "purple" }
    ],
    items: [
      { id: "sds101", text: "aₙ = 3n + 2", categoryId: "k" },
      { id: "sds102", text: "aₙ = n²", categoryId: "k" },
      { id: "sds103", text: "aₙ = 8n − 3", categoryId: "k" },
      { id: "sds104", text: "bₙ = 16/2ⁿ", categoryId: "k" },
      { id: "sds105", text: "aₙ = 8 · (−1)ⁿ", categoryId: "k" },
      { id: "sds106", text: "cₙ = n(n − 1) + 2", categoryId: "k" },
      { id: "sds107", text: "aₙ = 12 − 5n", categoryId: "k" },
      { id: "sds108", text: "bₙ = 10 − n²", categoryId: "k" },
      { id: "sds109", text: "aₙ = 2n + 3", categoryId: "k" },
      { id: "sds110", text: "a₁ = 1, a₂ = 2, aₙ = aₙ₋₁ + aₙ₋₂", categoryId: "r" },
      { id: "sds111", text: "a₁ = 5, aₙ = aₙ₋₁ + 8", categoryId: "r" },
      { id: "sds112", text: "a₁ = 3, aₙ = 2aₙ₋₁ − 4", categoryId: "r" },
      { id: "sds113", text: "c₁ = 3, c₂ = 1, cₙ = cₙ₋₁ − cₙ₋₂", categoryId: "r" },
      { id: "sds114", text: "a₁ = 1, aₙ = aₙ₋₁ + (2n − 1)", categoryId: "r" },
      { id: "sds115", text: "b₁ = 8, bₙ = bₙ₋₁ : 2", categoryId: "r" },
      { id: "sds116", text: "a₁ = 5, aₙ = −2aₙ₋₁ + 1", categoryId: "r" },
      { id: "sds117", text: "a₁ = 0, aₙ = aₙ₋₁ + 1", categoryId: "r" },
      { id: "sds118", text: "a₁ = 2, aₙ = aₙ₋₁ + 2", categoryId: "r" },
      { id: "sds119", text: "a pozitív négyzetszámok növekvő sorozata", categoryId: "u" },
      { id: "sds120", text: "a 3/11 tizedes tört n-edik jegye", categoryId: "u" },
      { id: "sds121", text: "a páros pozitív egészek növekvő sorozata", categoryId: "u" },
      { id: "sds122", text: "a 7-tel osztva 4 maradékot adó pozitív egészek növekvő sorozata", categoryId: "u" },
      { id: "sds123", text: "a prímszámok növekvő sorozata", categoryId: "u" },
      { id: "sds124", text: "az 5/7 tizedesjegyei sorban", categoryId: "u" },
      { id: "sds125", text: "az őr n-edik napja: munka vagy pihenő", categoryId: "u" },
      { id: "sds126", text: "a pozitív páratlan számok növekvő sorozata", categoryId: "u" },
      { id: "sds127", text: "a 8-cal osztva 5 maradékot adó pozitív számok növekvő sorozata", categoryId: "u" }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: A biztonsági őr naptára",
    description: "4 nap munka, 2 nap pihenő, január 1-jén kezd. Mi történik az adott napon?",
    categories: [
      { id: "m", name: "munkanap", color: "emerald" },
      { id: "p1", name: "pihenő (a ciklus 5. napja)", color: "amber" },
      { id: "p2", name: "pihenő (a ciklus 6. napja)", color: "rose" }
    ],
    items: [
      { id: "sds201", text: "1. nap", categoryId: "m" },
      { id: "sds202", text: "4. nap", categoryId: "m" },
      { id: "sds203", text: "10. nap", categoryId: "m" },
      { id: "sds204", text: "15. nap", categoryId: "m" },
      { id: "sds205", text: "27. nap", categoryId: "m" },
      { id: "sds206", text: "50. nap", categoryId: "m" },
      { id: "sds207", text: "100. nap", categoryId: "m" },
      { id: "sds208", text: "200. nap", categoryId: "m" },
      { id: "sds209", text: "364. nap", categoryId: "m" },
      { id: "sds210", text: "5. nap", categoryId: "p1" },
      { id: "sds211", text: "11. nap", categoryId: "p1" },
      { id: "sds212", text: "17. nap", categoryId: "p1" },
      { id: "sds213", text: "29. nap", categoryId: "p1" },
      { id: "sds214", text: "41. nap", categoryId: "p1" },
      { id: "sds215", text: "53. nap", categoryId: "p1" },
      { id: "sds216", text: "101. nap", categoryId: "p1" },
      { id: "sds217", text: "125. nap", categoryId: "p1" },
      { id: "sds218", text: "365. nap", categoryId: "p1" },
      { id: "sds219", text: "6. nap", categoryId: "p2" },
      { id: "sds220", text: "12. nap", categoryId: "p2" },
      { id: "sds221", text: "18. nap", categoryId: "p2" },
      { id: "sds222", text: "36. nap", categoryId: "p2" },
      { id: "sds223", text: "60. nap", categoryId: "p2" },
      { id: "sds224", text: "96. nap", categoryId: "p2" },
      { id: "sds225", text: "120. nap", categoryId: "p2" },
      { id: "sds226", text: "180. nap", categoryId: "p2" },
      { id: "sds227", text: "300. nap", categoryId: "p2" }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Melyik sorozat tagja?",
    description: "Minden szám pontosan az egyik sorozatnak tagja.",
    categories: [
      { id: "a", name: "aₙ = 8n − 3", color: "blue" },
      { id: "b", name: "aₙ = 7n − 3", color: "purple" },
      { id: "c", name: "aₙ = n²", color: "teal" }
    ],
    items: [
      { id: "sds301", text: "5", categoryId: "a" },
      { id: "sds302", text: "13", categoryId: "a" },
      { id: "sds303", text: "21", categoryId: "a" },
      { id: "sds304", text: "29", categoryId: "a" },
      { id: "sds305", text: "37", categoryId: "a" },
      { id: "sds306", text: "45", categoryId: "a" },
      { id: "sds307", text: "61", categoryId: "a" },
      { id: "sds308", text: "69", categoryId: "a" },
      { id: "sds309", text: "77", categoryId: "a" },
      { id: "sds310", text: "11", categoryId: "b" },
      { id: "sds311", text: "18", categoryId: "b" },
      { id: "sds312", text: "32", categoryId: "b" },
      { id: "sds313", text: "39", categoryId: "b" },
      { id: "sds314", text: "46", categoryId: "b" },
      { id: "sds315", text: "60", categoryId: "b" },
      { id: "sds316", text: "67", categoryId: "b" },
      { id: "sds317", text: "74", categoryId: "b" },
      { id: "sds318", text: "88", categoryId: "b" },
      { id: "sds319", text: "1", categoryId: "c" },
      { id: "sds320", text: "9", categoryId: "c" },
      { id: "sds321", text: "16", categoryId: "c" },
      { id: "sds322", text: "36", categoryId: "c" },
      { id: "sds323", text: "49", categoryId: "c" },
      { id: "sds324", text: "64", categoryId: "c" },
      { id: "sds325", text: "100", categoryId: "c" },
      { id: "sds326", text: "121", categoryId: "c" },
      { id: "sds327", text: "169", categoryId: "c" }
    ]
  }
};

export const SequenceDefinitionSorter: React.FC<SequenceDefinitionSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-seq-megadas-sorter',
  topicTitle = "2. Sorozatok megadása – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="sorozatok"
      topicId={topicId}
      subtopicId="sorozatok-megadasa"
      title={topicTitle}
      subtitle="Válogasd szét a megadási módokat, a beosztás napjait és a sorozatok tagjait!"
      levels={SEQUENCE_DEFINITION_SORTER_LEVELS}
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

export default SequenceDefinitionSorter;
