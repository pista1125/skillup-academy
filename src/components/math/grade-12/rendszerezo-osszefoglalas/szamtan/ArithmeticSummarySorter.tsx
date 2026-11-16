import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ArithmeticSummarySorterProps {
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

const ARITHMETIC_SUMMARY_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Melyik számhalmaz?",
    description: "Egész, racionális (de nem egész) vagy irracionális a szám?",
    categories: [
      { id: "int", name: "egész szám", color: "emerald" },
      { id: "rat", name: "racionális, de nem egész", color: "blue" },
      { id: "irr", name: "irracionális", color: "rose" }
    ],
    items: [
      { id: "ars101", text: "−5", categoryId: "int" },
      { id: "ars102", text: "0", categoryId: "int" },
      { id: "ars103", text: "√9", categoryId: "int" },
      { id: "ars104", text: "12/4", categoryId: "int" },
      { id: "ars105", text: "log₂ 8", categoryId: "int" },
      { id: "ars106", text: "(−2)³", categoryId: "int" },
      { id: "ars107", text: "|−7|", categoryId: "int" },
      { id: "ars108", text: "lg 100", categoryId: "int" },
      { id: "ars109", text: "∛(−27)", categoryId: "int" },
      { id: "ars110", text: "5/7", categoryId: "rat" },
      { id: "ars111", text: "2,03", categoryId: "rat" },
      { id: "ars112", text: "0,1666…", categoryId: "rat" },
      { id: "ars113", text: "−3,4", categoryId: "rat" },
      { id: "ars114", text: "log₉ 3", categoryId: "rat" },
      { id: "ars115", text: "2⁻³", categoryId: "rat" },
      { id: "ars116", text: "√(1/4)", categoryId: "rat" },
      { id: "ars117", text: "0,333…", categoryId: "rat" },
      { id: "ars118", text: "8^{-1/3}", categoryId: "rat" },
      { id: "ars119", text: "√2", categoryId: "irr" },
      { id: "ars120", text: "π", categoryId: "irr" },
      { id: "ars121", text: "lg 3", categoryId: "irr" },
      { id: "ars122", text: "√8", categoryId: "irr" },
      { id: "ars123", text: "∛2", categoryId: "irr" },
      { id: "ars124", text: "1 + √3", categoryId: "irr" },
      { id: "ars125", text: "log₂ 3", categoryId: "irr" },
      { id: "ars126", text: "√2 / 2", categoryId: "irr" },
      { id: "ars127", text: "2π", categoryId: "irr" }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Prím, összetett vagy egyik sem?",
    description: "A prím- és összetett szám fogalma csak a pozitív egészekre vonatkozik.",
    categories: [
      { id: "prime", name: "prímszám", color: "emerald" },
      { id: "comp", name: "összetett szám", color: "blue" },
      { id: "none", name: "egyik sem", color: "amber" }
    ],
    items: [
      { id: "ars201", text: "2", categoryId: "prime" },
      { id: "ars202", text: "3", categoryId: "prime" },
      { id: "ars203", text: "5", categoryId: "prime" },
      { id: "ars204", text: "7", categoryId: "prime" },
      { id: "ars205", text: "11", categoryId: "prime" },
      { id: "ars206", text: "13", categoryId: "prime" },
      { id: "ars207", text: "29", categoryId: "prime" },
      { id: "ars208", text: "97", categoryId: "prime" },
      { id: "ars209", text: "101", categoryId: "prime" },
      { id: "ars210", text: "4", categoryId: "comp" },
      { id: "ars211", text: "15", categoryId: "comp" },
      { id: "ars212", text: "26", categoryId: "comp" },
      { id: "ars213", text: "49", categoryId: "comp" },
      { id: "ars214", text: "51", categoryId: "comp" },
      { id: "ars215", text: "91", categoryId: "comp" },
      { id: "ars216", text: "57", categoryId: "comp" },
      { id: "ars217", text: "87", categoryId: "comp" },
      { id: "ars218", text: "1001", categoryId: "comp" },
      { id: "ars219", text: "1", categoryId: "none" },
      { id: "ars220", text: "0", categoryId: "none" },
      { id: "ars221", text: "−7", categoryId: "none" },
      { id: "ars222", text: "1/2", categoryId: "none" },
      { id: "ars223", text: "√2", categoryId: "none" },
      { id: "ars224", text: "−1", categoryId: "none" },
      { id: "ars225", text: "2,5", categoryId: "none" },
      { id: "ars226", text: "π", categoryId: "none" },
      { id: "ars227", text: "−13", categoryId: "none" }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Kisebb, egyenlő vagy nagyobb 1-nél?",
    description: "Hasonlítsd össze a kifejezés értékét 1-gyel!",
    categories: [
      { id: "lt", name: "kisebb, mint 1", color: "blue" },
      { id: "eq", name: "pontosan 1", color: "purple" },
      { id: "gt", name: "nagyobb, mint 1", color: "rose" }
    ],
    items: [
      { id: "ars301", text: "log₂ 1", categoryId: "lt" },
      { id: "ars302", text: "2⁻¹", categoryId: "lt" },
      { id: "ars303", text: "log₉ 3", categoryId: "lt" },
      { id: "ars304", text: "0,97⁴", categoryId: "lt" },
      { id: "ars305", text: "lg 0,5", categoryId: "lt" },
      { id: "ars306", text: "(1/2)^{1/2}", categoryId: "lt" },
      { id: "ars307", text: "⁵√(−32)", categoryId: "lt" },
      { id: "ars308", text: "log₅ 0,2", categoryId: "lt" },
      { id: "ars309", text: "9^{-1/2}", categoryId: "lt" },
      { id: "ars310", text: "7⁰", categoryId: "eq" },
      { id: "ars311", text: "log₃ 3", categoryId: "eq" },
      { id: "ars312", text: "lg 10", categoryId: "eq" },
      { id: "ars313", text: "√1", categoryId: "eq" },
      { id: "ars314", text: "(−1)²", categoryId: "eq" },
      { id: "ars315", text: "π⁰", categoryId: "eq" },
      { id: "ars316", text: "∛1", categoryId: "eq" },
      { id: "ars317", text: "log₂ 2", categoryId: "eq" },
      { id: "ars318", text: "(√7)⁻² · 7", categoryId: "eq" },
      { id: "ars319", text: "2^{1/2}", categoryId: "gt" },
      { id: "ars320", text: "log₂ 8", categoryId: "gt" },
      { id: "ars321", text: "1,0014¹⁹", categoryId: "gt" },
      { id: "ars322", text: "8^{2/3}", categoryId: "gt" },
      { id: "ars323", text: "lg 1000", categoryId: "gt" },
      { id: "ars324", text: "√2", categoryId: "gt" },
      { id: "ars325", text: "1,06²", categoryId: "gt" },
      { id: "ars326", text: "16^{3/4}", categoryId: "gt" },
      { id: "ars327", text: "log₃ 27", categoryId: "gt" }
    ]
  }
};

export const ArithmeticSummarySorter: React.FC<ArithmeticSummarySorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-sum-szamtan-sorter',
  topicTitle = "3. Számtan – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="rendszerezo-osszefoglalas"
      topicId={topicId}
      subtopicId="szamtan"
      title={topicTitle}
      subtitle="Csoportosítsd a számokat számhalmazok, oszthatóság és nagyság szerint!"
      levels={ARITHMETIC_SUMMARY_SORTER_LEVELS}
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

export default ArithmeticSummarySorter;
