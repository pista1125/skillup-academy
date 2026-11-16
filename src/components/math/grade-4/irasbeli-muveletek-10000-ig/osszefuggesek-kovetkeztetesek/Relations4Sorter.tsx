import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Relations4SorterProps {
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

const RELATIONS_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Milyen az összefüggés?',
    description: 'Ha az egyik mennyiség kétszeresére nő, mi történik a másikkal? Vagy nincs is elég adat?',
    categories: [
      { id: 'same', name: 'Kétszer annyi → kétszer annyi', color: 'emerald' },
      { id: 'inv', name: 'Kétszer annyi → feleannyi', color: 'amber' },
      { id: 'none', name: 'Nincs elég adat', color: 'rose' }
    ],
    items: [
      { id: 'rel4s1', text: 'Több óra alatt hosszabb utat tesz meg a vonat.', categoryId: 'same' },
      { id: 'rel4s2', text: 'Több lufiért több pénzt fizetek.', categoryId: 'same' },
      { id: 'rel4s3', text: 'Több perc alatt több víz folyik a csapból.', categoryId: 'same' },
      { id: 'rel4s4', text: 'Több kertész – kevesebb palánta jut egy kertészre.', categoryId: 'inv' },
      { id: 'rel4s5', text: 'Több barát – kevesebbet fizet egy barát a társasjátékért.', categoryId: 'inv' },
      { id: 'rel4s6', text: 'Hosszabb lépés – kevesebb lépés ugyanazon a távon.', categoryId: 'inv' },
      { id: 'rel4s7', text: '6 kocsi, az egyikben 105 utas. Hány utas van összesen?', categoryId: 'none' },
      { id: 'rel4s8', text: 'Hétfőn 236 utas. Hány utas egy hét alatt?', categoryId: 'none' },
      { id: 'rel4s9', text: 'Az 1. megállóig 700 m. Hány méter a 3. megállóig?', categoryId: 'none' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyi a hányados?',
    description: 'Ne végezd el az osztást! Figyeld meg, hogyan változott az osztandó és az osztó!',
    categories: [
      { id: 'q3', name: 'A hányados 3', color: 'rose' },
      { id: 'q4', name: 'A hányados 4', color: 'emerald' },
      { id: 'q30', name: 'A hányados 30', color: 'blue' }
    ],
    items: [
      { id: 'rel4s10', text: '12 : 4', categoryId: 'q3' },
      { id: 'rel4s11', text: '120 : 40', categoryId: 'q3' },
      { id: 'rel4s12', text: '1200 : 400', categoryId: 'q3' },
      { id: 'rel4s13', text: '12 : 3', categoryId: 'q4' },
      { id: 'rel4s14', text: '120 : 30', categoryId: 'q4' },
      { id: 'rel4s15', text: '240 : 60', categoryId: 'q4' },
      { id: 'rel4s16', text: '120 : 4', categoryId: 'q30' },
      { id: 'rel4s17', text: '1200 : 40', categoryId: 'q30' },
      { id: 'rel4s18', text: '3600 : 120', categoryId: 'q30' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi a szorzat?',
    description: 'Az egyik tényezőt növeltük, a másikat csökkentettük. Melyik szorzat egyenlő melyikkel?',
    categories: [
      { id: 'p4800', name: 'Egyenlő 600 · 8-cal (4800)', color: 'teal' },
      { id: 'p2700', name: 'Egyenlő 300 · 9-cel (2700)', color: 'purple' },
      { id: 'p7200', name: 'Egyenlő 3600 · 2-vel (7200)', color: 'amber' }
    ],
    items: [
      { id: 'rel4s19', text: '1200 · 4', categoryId: 'p4800' },
      { id: 'rel4s20', text: '2400 · 2', categoryId: 'p4800' },
      { id: 'rel4s21', text: '300 · 16', categoryId: 'p4800' },
      { id: 'rel4s22', text: '900 · 3', categoryId: 'p2700' },
      { id: 'rel4s23', text: '100 · 27', categoryId: 'p2700' },
      { id: 'rel4s24', text: '2700 · 1', categoryId: 'p2700' },
      { id: 'rel4s25', text: '1800 · 4', categoryId: 'p7200' },
      { id: 'rel4s26', text: '1200 · 6', categoryId: 'p7200' },
      { id: 'rel4s27', text: '900 · 8', categoryId: 'p7200' }
    ]
  }
];

const RELATIONS_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: RELATIONS_SORTER_LEVELS_LIST[0],
  2: RELATIONS_SORTER_LEVELS_LIST[1],
  3: RELATIONS_SORTER_LEVELS_LIST[2]
};

export const Relations4Sorter: React.FC<Relations4SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-wops-osszefuggesek-sorter',
  topicTitle = '5. Összefüggések, következtetések – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="irasbeli-muveletek-10000-ig"
      topicId={topicId}
      subtopicId="osszefuggesek-kovetkeztetesek"
      title={topicTitle}
      subtitle="Csoportosítsd az összefüggéseket, a hányadosokat és a szorzatokat!"
      levels={RELATIONS_SORTER_LEVELS}
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

export default Relations4Sorter;
