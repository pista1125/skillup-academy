import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CombinatoricsGraphsSummarySorterProps {
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

const COMBINATORICS_GRAPHS_SUMMARY_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Számít a sorrend?",
    description: "Melyik típusú kiválasztásról van szó?",
    categories: [
      { id: "var", name: "sorrend számít, ismétlés nincs", color: "blue" },
      { id: "rep", name: "sorrend számít, ismétlés lehet", color: "amber" },
      { id: "comb", name: "sorrend nem számít", color: "emerald" }
    ],
    items: [
      { id: "cgs101", text: "dobogósok 8 versenyzőből", categoryId: "var" },
      { id: "cgs102", text: "elnök és titkár 20 főből", categoryId: "var" },
      { id: "cgs103", text: "5 könyv sorrendje a polcon", categoryId: "var" },
      { id: "cgs104", text: "különböző jegyű háromjegyű számok", categoryId: "var" },
      { id: "cgs105", text: "ültetési rend 8 székre", categoryId: "var" },
      { id: "cgs106", text: "futóverseny teljes végeredménye", categoryId: "var" },
      { id: "cgs107", text: "kapitány, helyettes és jegyző választása", categoryId: "var" },
      { id: "cgs108", text: "kód különböző számjegyekből", categoryId: "var" },
      { id: "cgs109", text: "belépési sorrend 7 embernél", categoryId: "var" },
      { id: "cgs110", text: "3 kockadobás eredménye sorban", categoryId: "rep" },
      { id: "cgs111", text: "négyjegyű PIN-kód", categoryId: "rep" },
      { id: "cgs112", text: "totószelvény kitöltése", categoryId: "rep" },
      { id: "cgs113", text: "ötjegyű számok csupa páros jeggyel", categoryId: "rep" },
      { id: "cgs114", text: "10 pénzfeldobás sorozata", categoryId: "rep" },
      { id: "cgs115", text: "5 LED: fehér, piros vagy nem ég", categoryId: "rep" },
      { id: "cgs116", text: "tesztválaszok A–D betűkkel", categoryId: "rep" },
      { id: "cgs117", text: "háromjegyű számok tetszőleges jegyekkel", categoryId: "rep" },
      { id: "cgs118", text: "kétjegyű számok az 1–5 jegyekből (ismétlődhet)", categoryId: "rep" },
      { id: "cgs119", text: "ötöslottó-húzás", categoryId: "comb" },
      { id: "cgs120", text: "3 fős csoport 8 gyerekből", categoryId: "comb" },
      { id: "cgs121", text: "kézfogások száma", categoryId: "comb" },
      { id: "cgs122", text: "2 képviselő 34 főből", categoryId: "comb" },
      { id: "cgs123", text: "csökkenő jegyű ötjegyű számok", categoryId: "comb" },
      { id: "cgs124", text: "4 projekt kiválasztása 9-ből", categoryId: "comb" },
      { id: "cgs125", text: "egy halmaz 3 elemű részhalmazai", categoryId: "comb" },
      { id: "cgs126", text: "5 golyó kihúzása egyszerre", categoryId: "comb" },
      { id: "cgs127", text: "3 pizzafeltét 10 közül", categoryId: "comb" }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Mekkora az érték?",
    description: "Számold ki fejben, és sorold a megfelelő tartományba!",
    categories: [
      { id: "small", name: "100-nál kisebb", color: "emerald" },
      { id: "mid", name: "100 és 999 között", color: "blue" },
      { id: "big", name: "legalább 1000", color: "rose" }
    ],
    items: [
      { id: "cgs201", text: "(8 alatt 3)", categoryId: "small" },
      { id: "cgs202", text: "(6 alatt 2)", categoryId: "small" },
      { id: "cgs203", text: "4!", categoryId: "small" },
      { id: "cgs204", text: "2⁵ − 1", categoryId: "small" },
      { id: "cgs205", text: "(9 alatt 6)", categoryId: "small" },
      { id: "cgs206", text: "(7 alatt 2)", categoryId: "small" },
      { id: "cgs207", text: "5! / 2", categoryId: "small" },
      { id: "cgs208", text: "(10 alatt 1)", categoryId: "small" },
      { id: "cgs209", text: "3³", categoryId: "small" },
      { id: "cgs210", text: "5!", categoryId: "mid" },
      { id: "cgs211", text: "8 · 7 · 6", categoryId: "mid" },
      { id: "cgs212", text: "6³", categoryId: "mid" },
      { id: "cgs213", text: "(10 alatt 5)", categoryId: "mid" },
      { id: "cgs214", text: "2⁷", categoryId: "mid" },
      { id: "cgs215", text: "3⁵ − 1", categoryId: "mid" },
      { id: "cgs216", text: "(9 alatt 4)", categoryId: "mid" },
      { id: "cgs217", text: "6!", categoryId: "mid" },
      { id: "cgs218", text: "(10 alatt 3)", categoryId: "mid" },
      { id: "cgs219", text: "7!", categoryId: "big" },
      { id: "cgs220", text: "2¹⁰", categoryId: "big" },
      { id: "cgs221", text: "9000 − 8 · 9³", categoryId: "big" },
      { id: "cgs222", text: "2 · 7!", categoryId: "big" },
      { id: "cgs223", text: "4 · 5⁴", categoryId: "big" },
      { id: "cgs224", text: "7! − 6!", categoryId: "big" },
      { id: "cgs225", text: "2¹⁵ − 1", categoryId: "big" },
      { id: "cgs226", text: "8!", categoryId: "big" },
      { id: "cgs227", text: "(30 alatt 5)", categoryId: "big" }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Létezik ilyen gráf?",
    description: "Adott egy egyszerű gráf (nincs hurok- és többszörös él) csúcsainak fokszáma. Létezik ilyen gráf?",
    categories: [
      { id: "yes", name: "létezik ilyen gráf", color: "emerald" },
      { id: "odd", name: "nem: páratlan a fokszámösszeg", color: "rose" },
      { id: "big", name: "nem: van n − 1-nél nagyobb fokszám", color: "amber" }
    ],
    items: [
      { id: "cgs301", text: "2, 2, 2", categoryId: "yes" },
      { id: "cgs302", text: "1, 1", categoryId: "yes" },
      { id: "cgs303", text: "3, 3, 3, 3", categoryId: "yes" },
      { id: "cgs304", text: "2, 2, 2, 2, 2, 2, 2", categoryId: "yes" },
      { id: "cgs305", text: "0, 0, 0", categoryId: "yes" },
      { id: "cgs306", text: "4, 4, 4, 4, 4, 4", categoryId: "yes" },
      { id: "cgs307", text: "3, 3, 3, 3, 2", categoryId: "yes" },
      { id: "cgs308", text: "1, 1, 2, 2", categoryId: "yes" },
      { id: "cgs309", text: "5, 5, 5, 5, 5, 5", categoryId: "yes" },
      { id: "cgs310", text: "3, 3, 3, 2, 2", categoryId: "odd" },
      { id: "cgs311", text: "1, 1, 1", categoryId: "odd" },
      { id: "cgs312", text: "2, 2, 1", categoryId: "odd" },
      { id: "cgs313", text: "3, 3, 3, 3, 3, 3, 3", categoryId: "odd" },
      { id: "cgs314", text: "2, 2, 2, 1", categoryId: "odd" },
      { id: "cgs315", text: "5, 3, 3, 2, 2, 2", categoryId: "odd" },
      { id: "cgs316", text: "1, 1, 1, 1, 1", categoryId: "odd" },
      { id: "cgs317", text: "4, 4, 4, 4, 3", categoryId: "odd" },
      { id: "cgs318", text: "3, 2, 2, 2, 2, 2", categoryId: "odd" },
      { id: "cgs319", text: "4, 2, 1, 1", categoryId: "big" },
      { id: "cgs320", text: "3, 3, 2", categoryId: "big" },
      { id: "cgs321", text: "2, 2", categoryId: "big" },
      { id: "cgs322", text: "5, 1, 1, 1", categoryId: "big" },
      { id: "cgs323", text: "6, 2, 2, 2, 2, 2", categoryId: "big" },
      { id: "cgs324", text: "4, 4, 4, 4", categoryId: "big" },
      { id: "cgs325", text: "3, 1", categoryId: "big" },
      { id: "cgs326", text: "5, 5, 2, 2, 2", categoryId: "big" },
      { id: "cgs327", text: "4, 3, 1", categoryId: "big" }
    ]
  }
};

export const CombinatoricsGraphsSummarySorter: React.FC<CombinatoricsGraphsSummarySorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-sum-kombinatorika-grafok-sorter',
  topicTitle = "2. Kombinatorika, gráfok – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="rendszerezo-osszefoglalas"
      topicId={topicId}
      subtopicId="kombinatorika-grafok"
      title={topicTitle}
      subtitle="Döntsd el, számít-e a sorrend, becsüld meg az értékeket, és vizsgáld meg, létezik-e a gráf!"
      levels={COMBINATORICS_GRAPHS_SUMMARY_SORTER_LEVELS}
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

export default CombinatoricsGraphsSummarySorter;
