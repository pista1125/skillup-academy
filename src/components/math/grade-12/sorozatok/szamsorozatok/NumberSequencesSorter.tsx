import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface NumberSequencesSorterProps {
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

const NUMBER_SEQUENCES_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Sorszám, tag vagy sorozat?",
    description: "Mit jelent az adott dolog a sorozatok nyelvén?",
    categories: [
      { id: "n", name: "a tag sorszáma (n)", color: "blue" },
      { id: "a", name: "a tag értéke (aₙ)", color: "emerald" },
      { id: "s", name: "maga a sorozat", color: "purple" }
    ],
    items: [
      { id: "nss101", text: "a 12 az a₁₂ jelölésben", categoryId: "n" },
      { id: "nss102", text: "a pontgrafikon vízszintes tengelyén mért szám", categoryId: "n" },
      { id: "nss103", text: "az értelmezési tartomány egy eleme", categoryId: "n" },
      { id: "nss104", text: "a lépcsőfok sorszáma a lépcsős feladatban", categoryId: "n" },
      { id: "nss105", text: "a napok sorszáma a vicces feladatban", categoryId: "n" },
      { id: "nss106", text: "a tizedesjegy helye az 5/7-es feladatban", categoryId: "n" },
      { id: "nss107", text: "egy pozitív egész, amelyhez tagot rendelünk", categoryId: "n" },
      { id: "nss108", text: "a hozzárendelés változója", categoryId: "n" },
      { id: "nss109", text: "az alsó index", categoryId: "n" },
      { id: "nss110", text: "a pontgrafikon egy pontjának második koordinátája", categoryId: "a" },
      { id: "nss111", text: "a lehetőségek száma egy adott lépcsőfokon", categoryId: "a" },
      { id: "nss112", text: "egy tizedesjegy értéke az 5/7-ben", categoryId: "a" },
      { id: "nss113", text: "a képhalmaz egy eleme", categoryId: "a" },
      { id: "nss114", text: "a 34 az a₈ = 34 egyenlőségben", categoryId: "a" },
      { id: "nss115", text: "a hüllők száma egy adott évben", categoryId: "a" },
      { id: "nss116", text: "egy függvényérték", categoryId: "a" },
      { id: "nss117", text: "a 15 a k₆ = 15 egyenlőségben", categoryId: "a" },
      { id: "nss118", text: "a hétfői új hallgatók száma (3)", categoryId: "a" },
      { id: "nss119", text: "{aₙ}", categoryId: "s" },
      { id: "nss120", text: "a tagok végtelen felsorolása", categoryId: "s" },
      { id: "nss121", text: "egy ℤ⁺ → ℝ függvény", categoryId: "s" },
      { id: "nss122", text: "az 1; 2; 3; 5; 8; … egésze", categoryId: "s" },
      { id: "nss123", text: "a pontgrafikon egésze", categoryId: "s" },
      { id: "nss124", text: "az n ↦ aₙ hozzárendelés", categoryId: "s" },
      { id: "nss125", text: "a 0; 1; 3; 6; 10; … felsorolás", categoryId: "s" },
      { id: "nss126", text: "a pozitív páratlan számok növekvő felsorolása", categoryId: "s" },
      { id: "nss127", text: "az aₙ = n² szabállyal megadott hozzárendelés", categoryId: "s" }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Melyik sorozat tagja?",
    description: "Minden szám pontosan az egyik sorozatnak tagja.",
    categories: [
      { id: "sq", name: "aₙ = n²", color: "blue" },
      { id: "odd", name: "aₙ = 2n − 1", color: "amber" },
      { id: "lin", name: "aₙ = 3n + 2", color: "rose" }
    ],
    items: [
      { id: "nss201", text: "4", categoryId: "sq" },
      { id: "nss202", text: "16", categoryId: "sq" },
      { id: "nss203", text: "36", categoryId: "sq" },
      { id: "nss204", text: "64", categoryId: "sq" },
      { id: "nss205", text: "100", categoryId: "sq" },
      { id: "nss206", text: "144", categoryId: "sq" },
      { id: "nss207", text: "196", categoryId: "sq" },
      { id: "nss208", text: "256", categoryId: "sq" },
      { id: "nss209", text: "400", categoryId: "sq" },
      { id: "nss210", text: "3", categoryId: "odd" },
      { id: "nss211", text: "7", categoryId: "odd" },
      { id: "nss212", text: "13", categoryId: "odd" },
      { id: "nss213", text: "15", categoryId: "odd" },
      { id: "nss214", text: "19", categoryId: "odd" },
      { id: "nss215", text: "21", categoryId: "odd" },
      { id: "nss216", text: "27", categoryId: "odd" },
      { id: "nss217", text: "31", categoryId: "odd" },
      { id: "nss218", text: "33", categoryId: "odd" },
      { id: "nss219", text: "8", categoryId: "lin" },
      { id: "nss220", text: "14", categoryId: "lin" },
      { id: "nss221", text: "20", categoryId: "lin" },
      { id: "nss222", text: "26", categoryId: "lin" },
      { id: "nss223", text: "32", categoryId: "lin" },
      { id: "nss224", text: "38", categoryId: "lin" },
      { id: "nss225", text: "44", categoryId: "lin" },
      { id: "nss226", text: "50", categoryId: "lin" },
      { id: "nss227", text: "56", categoryId: "lin" }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Az 5/7 tizedesjegyei",
    description: "5/7 = 0,714285714285… Melyik számjegy áll az adott helyen?",
    categories: [
      { id: "d7", name: "a jegy: 7", color: "purple" },
      { id: "d1", name: "a jegy: 1", color: "teal" },
      { id: "d4", name: "a jegy: 4", color: "amber" }
    ],
    items: [
      { id: "nss301", text: "az 1. jegy", categoryId: "d7" },
      { id: "nss302", text: "a 7. jegy", categoryId: "d7" },
      { id: "nss303", text: "a 13. jegy", categoryId: "d7" },
      { id: "nss304", text: "a 25. jegy", categoryId: "d7" },
      { id: "nss305", text: "a 49. jegy", categoryId: "d7" },
      { id: "nss306", text: "a 61. jegy", categoryId: "d7" },
      { id: "nss307", text: "a 97. jegy", categoryId: "d7" },
      { id: "nss308", text: "a 601. jegy", categoryId: "d7" },
      { id: "nss309", text: "az 1003. jegy", categoryId: "d7" },
      { id: "nss310", text: "a 2. jegy", categoryId: "d1" },
      { id: "nss311", text: "a 8. jegy", categoryId: "d1" },
      { id: "nss312", text: "a 14. jegy", categoryId: "d1" },
      { id: "nss313", text: "a 20. jegy", categoryId: "d1" },
      { id: "nss314", text: "a 26. jegy", categoryId: "d1" },
      { id: "nss315", text: "az 50. jegy", categoryId: "d1" },
      { id: "nss316", text: "a 98. jegy", categoryId: "d1" },
      { id: "nss317", text: "a 200. jegy", categoryId: "d1" },
      { id: "nss318", text: "az 1004. jegy", categoryId: "d1" },
      { id: "nss319", text: "a 3. jegy", categoryId: "d4" },
      { id: "nss320", text: "a 9. jegy", categoryId: "d4" },
      { id: "nss321", text: "a 15. jegy", categoryId: "d4" },
      { id: "nss322", text: "a 21. jegy", categoryId: "d4" },
      { id: "nss323", text: "a 27. jegy", categoryId: "d4" },
      { id: "nss324", text: "a 45. jegy", categoryId: "d4" },
      { id: "nss325", text: "a 99. jegy", categoryId: "d4" },
      { id: "nss326", text: "a 303. jegy", categoryId: "d4" },
      { id: "nss327", text: "az 1005. jegy", categoryId: "d4" }
    ]
  }
};

export const NumberSequencesSorter: React.FC<NumberSequencesSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-seq-szamsorozatok-sorter',
  topicTitle = "1. Számsorozatok – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="sorozatok"
      topicId={topicId}
      subtopicId="szamsorozatok"
      title={topicTitle}
      subtitle="Rendszerezd a jelöléseket, a sorozatok tagjait és a periodikus tizedes tört jegyeit!"
      levels={NUMBER_SEQUENCES_SORTER_LEVELS}
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

export default NumberSequencesSorter;
