import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FunctionsSummarySorterProps {
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

const FUNCTIONS_SUMMARY_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Függvény? Kölcsönösen egyértelmű?",
    description: "Döntsd el a hozzárendelésről, hogy függvény-e, és ha igen, kölcsönösen egyértelmű-e!",
    categories: [
      { id: "no", name: "nem függvény", color: "rose" },
      { id: "fun", name: "függvény, de nem kölcsönösen egyértelmű", color: "amber" },
      { id: "bij", name: "kölcsönösen egyértelmű függvény", color: "emerald" }
    ],
    items: [
      { id: "fus101", text: "egész számhoz a tőle 2 egységre lévő számot", categoryId: "no" },
      { id: "fus102", text: "pozitív számhoz mindkét négyzetgyökét (±)", categoryId: "no" },
      { id: "fus103", text: "emberhez a testvérét", categoryId: "no" },
      { id: "fus104", text: "valós számhoz a nála kisebb számokat", categoryId: "no" },
      { id: "fus105", text: "körhöz egy húrját", categoryId: "no" },
      { id: "fus106", text: "országhoz egy városát", categoryId: "no" },
      { id: "fus107", text: "pozitív egészhez egy osztóját", categoryId: "no" },
      { id: "fus108", text: "számhoz egy nála nagyobb prímet", categoryId: "no" },
      { id: "fus109", text: "háromszöghöz egy oldalát", categoryId: "no" },
      { id: "fus110", text: "x ↦ x² (ℝ → ℝ)", categoryId: "fun" },
      { id: "fus111", text: "x ↦ |x|", categoryId: "fun" },
      { id: "fus112", text: "háromszöghöz a területét", categoryId: "fun" },
      { id: "fus113", text: "emberhez a születési évét", categoryId: "fun" },
      { id: "fus114", text: "x ↦ 7", categoryId: "fun" },
      { id: "fus115", text: "x ↦ (x − 2)² − 5", categoryId: "fun" },
      { id: "fus116", text: "országhoz a kontinensét", categoryId: "fun" },
      { id: "fus117", text: "egész számhoz a 2-vel vett maradékát", categoryId: "fun" },
      { id: "fus118", text: "x ↦ |x² − 3|", categoryId: "fun" },
      { id: "fus119", text: "x ↦ x + 5", categoryId: "bij" },
      { id: "fus120", text: "x ↦ 3x", categoryId: "bij" },
      { id: "fus121", text: "kémiai elemhez a vegyjelét", categoryId: "bij" },
      { id: "fus122", text: "x ↦ −0,8x + 2", categoryId: "bij" },
      { id: "fus123", text: "x ↦ 2ˣ", categoryId: "bij" },
      { id: "fus124", text: "x ↦ x/3", categoryId: "bij" },
      { id: "fus125", text: "x ↦ x³", categoryId: "bij" },
      { id: "fus126", text: "x ↦ 1/x (x ≠ 0)", categoryId: "bij" },
      { id: "fus127", text: "x ↦ √x (x ≥ 0)", categoryId: "bij" }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: A függvény menete",
    description: "Az egész értelmezési tartományán szigorúan nő, szigorúan csökken, vagy egyik sem?",
    categories: [
      { id: "inc", name: "szigorúan monoton nő", color: "emerald" },
      { id: "dec", name: "szigorúan monoton csökken", color: "blue" },
      { id: "none", name: "nem monoton", color: "rose" }
    ],
    items: [
      { id: "fus201", text: "2x + 1", categoryId: "inc" },
      { id: "fus202", text: "2ˣ", categoryId: "inc" },
      { id: "fus203", text: "√x", categoryId: "inc" },
      { id: "fus204", text: "x³", categoryId: "inc" },
      { id: "fus205", text: "0,25x + 2,75", categoryId: "inc" },
      { id: "fus206", text: "lg x", categoryId: "inc" },
      { id: "fus207", text: "5x − 2", categoryId: "inc" },
      { id: "fus208", text: "√x + 6", categoryId: "inc" },
      { id: "fus209", text: "1,0014ˣ", categoryId: "inc" },
      { id: "fus210", text: "−0,8x + 2", categoryId: "dec" },
      { id: "fus211", text: "0,5ˣ", categoryId: "dec" },
      { id: "fus212", text: "−(7/3)x + 22", categoryId: "dec" },
      { id: "fus213", text: "−7x + 16", categoryId: "dec" },
      { id: "fus214", text: "14 · 0,991ᵗ", categoryId: "dec" },
      { id: "fus215", text: "−x³", categoryId: "dec" },
      { id: "fus216", text: "−√x", categoryId: "dec" },
      { id: "fus217", text: "3 − 2x", categoryId: "dec" },
      { id: "fus218", text: "0,97ˣ", categoryId: "dec" },
      { id: "fus219", text: "x²", categoryId: "none" },
      { id: "fus220", text: "|x|", categoryId: "none" },
      { id: "fus221", text: "(x + 3)² − 4", categoryId: "none" },
      { id: "fus222", text: "1/x (x ≠ 0)", categoryId: "none" },
      { id: "fus223", text: "−(x − 2)² + 9", categoryId: "none" },
      { id: "fus224", text: "|x² − 3|", categoryId: "none" },
      { id: "fus225", text: "x² − 8x + 18", categoryId: "none" },
      { id: "fus226", text: "−|x|", categoryId: "none" },
      { id: "fus227", text: "2x² − x − 1", categoryId: "none" }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Hány zérushely?",
    description: "A valós számok (illetve a legbővebb értelmezési tartomány) halmazán hány zérushelye van a függvénynek?",
    categories: [
      { id: "z0", name: "nincs zérushelye", color: "rose" },
      { id: "z1", name: "pontosan 1 zérushelye van", color: "amber" },
      { id: "z2", name: "pontosan 2 zérushelye van", color: "emerald" }
    ],
    items: [
      { id: "fus301", text: "2ˣ", categoryId: "z0" },
      { id: "fus302", text: "1/x", categoryId: "z0" },
      { id: "fus303", text: "x² + 1", categoryId: "z0" },
      { id: "fus304", text: "3", categoryId: "z0" },
      { id: "fus305", text: "(x − 4)² + 2", categoryId: "z0" },
      { id: "fus306", text: "14 · 0,991ᵗ", categoryId: "z0" },
      { id: "fus307", text: "|x| + 1", categoryId: "z0" },
      { id: "fus308", text: "−x² − 5", categoryId: "z0" },
      { id: "fus309", text: "2ˣ + 3", categoryId: "z0" },
      { id: "fus310", text: "0,5x − 8", categoryId: "z1" },
      { id: "fus311", text: "|x|", categoryId: "z1" },
      { id: "fus312", text: "x²", categoryId: "z1" },
      { id: "fus313", text: "√x", categoryId: "z1" },
      { id: "fus314", text: "1/x + 2", categoryId: "z1" },
      { id: "fus315", text: "(x − 3)²", categoryId: "z1" },
      { id: "fus316", text: "−0,8x + 2", categoryId: "z1" },
      { id: "fus317", text: "x³", categoryId: "z1" },
      { id: "fus318", text: "|x − 4|", categoryId: "z1" },
      { id: "fus319", text: "x² − 4", categoryId: "z2" },
      { id: "fus320", text: "2x² − x − 1", categoryId: "z2" },
      { id: "fus321", text: "(x + 3)² − 4", categoryId: "z2" },
      { id: "fus322", text: "|x| − 3", categoryId: "z2" },
      { id: "fus323", text: "−(x − 2)² + 9", categoryId: "z2" },
      { id: "fus324", text: "(x − 2)² − 5", categoryId: "z2" },
      { id: "fus325", text: "x² + 2x − 3", categoryId: "z2" },
      { id: "fus326", text: "|x² − 3|", categoryId: "z2" },
      { id: "fus327", text: "x² − 16x + 39", categoryId: "z2" }
    ]
  }
};

export const FunctionsSummarySorter: React.FC<FunctionsSummarySorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-sum-fuggvenyek-sorter',
  topicTitle = "5. Függvények – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="rendszerezo-osszefoglalas"
      topicId={topicId}
      subtopicId="fuggvenyek"
      title={topicTitle}
      subtitle="Csoportosítsd a hozzárendeléseket, a függvények menetét és a zérushelyek számát!"
      levels={FUNCTIONS_SUMMARY_SORTER_LEVELS}
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

export default FunctionsSummarySorter;
