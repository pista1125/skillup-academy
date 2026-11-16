import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SequencesPracticeExamSorterProps {
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

const PRACTICE_EXAM_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Hogyan adták meg a sorozatot?',
    description: 'Csoportosítsd a sorozatokat a megadás módja szerint!',
    categories: [
      { id: 'formula', name: 'képlettel (aₙ = f(n))', color: 'blue' },
      { id: 'rec', name: 'rekurzív módon', color: 'purple' },
      { id: 'text', name: 'utasítással, körülírással', color: 'amber' }
    ],
    items: [
      { id: 'pes1', text: 'aₙ = 3n + 2', categoryId: 'formula' },
      { id: 'pes2', text: 'aₙ = 8 · (−1)ⁿ', categoryId: 'formula' },
      { id: 'pes3', text: 'cₙ = n(n − 1) + 2', categoryId: 'formula' },
      { id: 'pes4', text: 'a₁ = 1, a₂ = 2, aₙ = aₙ₋₁ + aₙ₋₂', categoryId: 'rec' },
      { id: 'pes5', text: 'a₁ = 3, aₙ = 2aₙ₋₁ − 4', categoryId: 'rec' },
      { id: 'pes6', text: 'a₁ = 201, aₙ = 2aₙ₋₁ − 200', categoryId: 'rec' },
      { id: 'pes7', text: 'a pozitív négyzetszámok növekvő sorozata', categoryId: 'text' },
      { id: 'pes8', text: 'az 5/7 tizedes tört alakjának n-edik jegye', categoryId: 'text' },
      { id: 'pes9', text: 'a 8-cal osztva 5 maradékot adó pozitív egészek növekvő sorozata', categoryId: 'text' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Számtani, mértani vagy egyik sem?',
    description: 'Milyen sorozat írja le a folyamatot?',
    categories: [
      { id: 'ar', name: 'számtani sorozat', color: 'blue' },
      { id: 'ge', name: 'mértani sorozat', color: 'rose' },
      { id: 'no', name: 'egyik sem', color: 'slate' }
    ],
    items: [
      { id: 'pes10', text: 'stadion: soronként 30 üléssel több', categoryId: 'ar' },
      { id: 'pes11', text: 'Péter I. ajánlata: havonta +5000 Ft', categoryId: 'ar' },
      { id: 'pes12', text: 'webszerver: 1, 3, 5, … mp várakozás', categoryId: 'ar' },
      { id: 'pes13', text: 'Betyár patkószegeinek ára', categoryId: 'ge' },
      { id: 'pes14', text: 'a fiúk öröksége (a maradék 20%-a)', categoryId: 'ge' },
      { id: 'pes15', text: 'a Sierpiński-háromszög fekete területe', categoryId: 'ge' },
      { id: 'pes16', text: 'Fibonacci nyulai', categoryId: 'no' },
      { id: 'pes17', text: 'a lépcsőre jutás lehetőségeinek száma', categoryId: 'no' },
      { id: 'pes18', text: 'a négyzetszámok: 1; 4; 9; 16; …', categoryId: 'no' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Mit kell kiszámolni?',
    description: 'Döntsd el, hogy a válasz egy tag, egy összeg vagy a tagszám!',
    categories: [
      { id: 'an', name: 'egy tag (aₙ)', color: 'sky' },
      { id: 'sn', name: 'összeg (Sₙ)', color: 'emerald' },
      { id: 'n', name: 'tagszám (n)', color: 'orange' }
    ],
    items: [
      { id: 'pes19', text: 'Mennyi a legkisebb fiú része?', categoryId: 'an' },
      { id: 'pes20', text: 'Hány litert rendelnek július 31-én?', categoryId: 'an' },
      { id: 'pes21', text: 'Hány fekete háromszög van a 20. ábrán?', categoryId: 'an' },
      { id: 'pes22', text: 'Mennyiért lehet megvenni Betyárt?', categoryId: 'sn' },
      { id: 'pes23', text: 'Hány ülőhely van a 27 soros stadionban?', categoryId: 'sn' },
      { id: 'pes24', text: 'Melyik ajánlat ad nagyobb 4 éves jövedelmet?', categoryId: 'sn' },
      { id: 'pes25', text: 'Hány versenyzőt jutalmaztak?', categoryId: 'n' },
      { id: 'pes26', text: 'Hány tagot adtunk össze, ha az összeg 1233?', categoryId: 'n' },
      { id: 'pes27', text: 'Hány tagja kisebb a sorozatnak 1 000 000-nál?', categoryId: 'n' }
    ]
  }
};

export const SequencesPracticeExamSorter: React.FC<SequencesPracticeExamSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-seq-tudasproba-sorter',
  topicTitle = '10. Gyakorlás, tudáspróba – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="sorozatok"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Rendszerezd a fejezet sorozatait megadás, típus és a keresett mennyiség szerint!"
      levels={PRACTICE_EXAM_SORTER_LEVELS}
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

export default SequencesPracticeExamSorter;
