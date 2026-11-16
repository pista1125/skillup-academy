import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SetsLogicSummarySorterProps {
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

const SETS_LOGIC_SUMMARY_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Véges, végtelen vagy üres?",
    description: "Döntsd el, hogy a halmaz véges (nem üres), végtelen vagy üres!",
    categories: [
      { id: "finite", name: "véges, nem üres", color: "emerald" },
      { id: "infinite", name: "végtelen", color: "blue" },
      { id: "empty", name: "üres halmaz", color: "rose" }
    ],
    items: [
      { id: "sls101", text: "{2; 3; 5; 7}", categoryId: "finite" },
      { id: "sls102", text: "{a 120 pozitív osztói}", categoryId: "finite" },
      { id: "sls103", text: "{egyjegyű pozitív egészek}", categoryId: "finite" },
      { id: "sls104", text: "{x ∈ ℤ | x² < 10}", categoryId: "finite" },
      { id: "sls105", text: "{a 6 pozitív osztói}", categoryId: "finite" },
      { id: "sls106", text: "{a kocka csúcsai}", categoryId: "finite" },
      { id: "sls107", text: "{x ∈ ℕ | x < 1}", categoryId: "finite" },
      { id: "sls108", text: "ℕ ∩ [2; 6]", categoryId: "finite" },
      { id: "sls109", text: "{a 63 pozitív osztói}", categoryId: "finite" },
      { id: "sls110", text: "ℤ", categoryId: "infinite" },
      { id: "sls111", text: "ℝ ∖ ∅", categoryId: "infinite" },
      { id: "sls112", text: "ℝ ∖ ℚ", categoryId: "infinite" },
      { id: "sls113", text: "[2; 6]", categoryId: "infinite" },
      { id: "sls114", text: "{egy körvonal pontjai}", categoryId: "infinite" },
      { id: "sls115", text: "{a sík rácspontjai}", categoryId: "infinite" },
      { id: "sls116", text: "{páros számok}", categoryId: "infinite" },
      { id: "sls117", text: "ℝ ∖ ℕ", categoryId: "infinite" },
      { id: "sls118", text: "{3-mal osztható pozitív egészek}", categoryId: "infinite" },
      { id: "sls119", text: "{x ∈ ℝ | x² = −1}", categoryId: "empty" },
      { id: "sls120", text: "ℕ ∖ ℝ", categoryId: "empty" },
      { id: "sls121", text: "∅ ∖ ℝ", categoryId: "empty" },
      { id: "sls122", text: "{4-nél nagyobb és 3-nál kisebb számok}", categoryId: "empty" },
      { id: "sls123", text: "{2-nél nagyobb páros prímek}", categoryId: "empty" },
      { id: "sls124", text: "ℤ ∩ ]0; 1[", categoryId: "empty" },
      { id: "sls125", text: "{negatív természetes számok}", categoryId: "empty" },
      { id: "sls126", text: "{x ∈ ℕ | x + 1 = 0}", categoryId: "empty" },
      { id: "sls127", text: "{1-nél kisebb pozitív egészek}", categoryId: "empty" }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Igaz, hamis vagy nem állítás?",
    description: "Csak a kijelentő mondat lehet állítás – annak logikai értéke igaz vagy hamis.",
    categories: [
      { id: "true", name: "igaz állítás", color: "emerald" },
      { id: "false", name: "hamis állítás", color: "rose" },
      { id: "none", name: "nem állítás", color: "amber" }
    ],
    items: [
      { id: "sls201", text: "A 7 prímszám.", categoryId: "true" },
      { id: "sls202", text: "2 ∈ {2; 3; 5; 7}", categoryId: "true" },
      { id: "sls203", text: "ℕ ⊆ ℤ", categoryId: "true" },
      { id: "sls204", text: "Minden deltoid tengelyesen szimmetrikus.", categoryId: "true" },
      { id: "sls205", text: "Van olyan halmaz, amelynek számossága 0.", categoryId: "true" },
      { id: "sls206", text: "Ha egy négyszög téglalap, akkor átlói felezik egymást.", categoryId: "true" },
      { id: "sls207", text: "|A ∪ B| ≤ |A| + |B|", categoryId: "true" },
      { id: "sls208", text: "A 7 prím vagy páros.", categoryId: "true" },
      { id: "sls209", text: "Az 1 nem prímszám.", categoryId: "true" },
      { id: "sls210", text: "A 9 prímszám.", categoryId: "false" },
      { id: "sls211", text: "Minden paralelogramma tengelyesen szimmetrikus.", categoryId: "false" },
      { id: "sls212", text: "Ha |a| = |b|, akkor a = b.", categoryId: "false" },
      { id: "sls213", text: "ℝ ⊆ ℚ", categoryId: "false" },
      { id: "sls214", text: "A 7 prím és páros.", categoryId: "false" },
      { id: "sls215", text: "12 ∈ {2; 3; 5; 7}", categoryId: "false" },
      { id: "sls216", text: "Bármely öt prímszám összege páros.", categoryId: "false" },
      { id: "sls217", text: "Ha egy négyszög átlói felezik egymást, akkor téglalap.", categoryId: "false" },
      { id: "sls218", text: "ℕ ∖ ℝ végtelen halmaz.", categoryId: "false" },
      { id: "sls219", text: "Hány éves vagy?", categoryId: "none" },
      { id: "sls220", text: "Csukd be az ajtót!", categoryId: "none" },
      { id: "sls221", text: "Bárcsak esne a hó!", categoryId: "none" },
      { id: "sls222", text: "Melyik a legkisebb prímszám?", categoryId: "none" },
      { id: "sls223", text: "Oldd meg az egyenletet!", categoryId: "none" },
      { id: "sls224", text: "Ki látta a Mátrixot?", categoryId: "none" },
      { id: "sls225", text: "Írd fel a 30 osztóit!", categoryId: "none" },
      { id: "sls226", text: "Milyen szép ez a gráf!", categoryId: "none" },
      { id: "sls227", text: "Rajzolj Venn-diagramot!", categoryId: "none" }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Melyik tartományba esik?",
    description: "A = {páros egészek}, B = {3-mal osztható egészek}. Az A ∩ B, az A ∖ B vagy a B ∖ A eleme a szám?",
    categories: [
      { id: "ab", name: "A ∩ B (6-tal osztható)", color: "purple" },
      { id: "a", name: "A ∖ B", color: "blue" },
      { id: "b", name: "B ∖ A", color: "rose" }
    ],
    items: [
      { id: "sls301", text: "6", categoryId: "ab" },
      { id: "sls302", text: "12", categoryId: "ab" },
      { id: "sls303", text: "18", categoryId: "ab" },
      { id: "sls304", text: "24", categoryId: "ab" },
      { id: "sls305", text: "30", categoryId: "ab" },
      { id: "sls306", text: "36", categoryId: "ab" },
      { id: "sls307", text: "42", categoryId: "ab" },
      { id: "sls308", text: "−6", categoryId: "ab" },
      { id: "sls309", text: "0", categoryId: "ab" },
      { id: "sls310", text: "2", categoryId: "a" },
      { id: "sls311", text: "4", categoryId: "a" },
      { id: "sls312", text: "8", categoryId: "a" },
      { id: "sls313", text: "10", categoryId: "a" },
      { id: "sls314", text: "14", categoryId: "a" },
      { id: "sls315", text: "16", categoryId: "a" },
      { id: "sls316", text: "20", categoryId: "a" },
      { id: "sls317", text: "−4", categoryId: "a" },
      { id: "sls318", text: "22", categoryId: "a" },
      { id: "sls319", text: "3", categoryId: "b" },
      { id: "sls320", text: "9", categoryId: "b" },
      { id: "sls321", text: "15", categoryId: "b" },
      { id: "sls322", text: "21", categoryId: "b" },
      { id: "sls323", text: "27", categoryId: "b" },
      { id: "sls324", text: "33", categoryId: "b" },
      { id: "sls325", text: "−3", categoryId: "b" },
      { id: "sls326", text: "−9", categoryId: "b" },
      { id: "sls327", text: "39", categoryId: "b" }
    ]
  }
};

export const SetsLogicSummarySorter: React.FC<SetsLogicSummarySorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-sum-halmazok-logika-sorter',
  topicTitle = "1. Halmazok, logika – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="rendszerezo-osszefoglalas"
      topicId={topicId}
      subtopicId="halmazok-logika"
      title={topicTitle}
      subtitle="Csoportosítsd a halmazokat, az állításokat és a számokat!"
      levels={SETS_LOGIC_SUMMARY_SORTER_LEVELS}
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

export default SetsLogicSummarySorter;
