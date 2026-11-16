import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SolidsPracticeExamSorterProps {
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

const SOLIDS_PRACTICE_EXAM_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Melyik testcsaládba tartozik?",
    description: "Csoportosítsd a testeket és képleteket!",
    categories: [
      { id: 'prism', name: "Hasábszerű (V = T · M)", color: 'blue' },
      { id: 'pyramid', name: "Gúlaszerű (V = T · M / 3)", color: 'amber' },
      { id: 'other', name: "Más képlet kell", color: 'emerald' }
    ],
    items: [
      { id: 'pes1', text: "Téglatest", categoryId: 'prism' },
      { id: 'pes2', text: "Forgáshenger", categoryId: 'prism' },
      { id: 'pes3', text: "Hatoldalú egyenes hasáb", categoryId: 'prism' },
      { id: 'pes4', text: "Négyzet alapú gúla", categoryId: 'pyramid' },
      { id: 'pes5', text: "Forgáskúp", categoryId: 'pyramid' },
      { id: 'pes6', text: "Szabályos tetraéder", categoryId: 'pyramid' },
      { id: 'pes7', text: "Gömb", categoryId: 'other' },
      { id: 'pes8', text: "Csonkagúla", categoryId: 'other' },
      { id: 'pes9', text: "Csonkakúp", categoryId: 'other' }
    ]
  },
  {
    level: 2,
    title: "2. szint: Milyen derékszögű háromszög kell?",
    description: "Döntsd el, melyik derékszögű háromszögből számolható a keresett mennyiség!",
    categories: [
      { id: 'diag', name: "M és a fél átló", color: 'rose' },
      { id: 'half', name: "M és a fél alapél", color: 'purple' },
      { id: 'radius', name: "m és a sugár (kúp)", color: 'teal' }
    ],
    items: [
      { id: 'pes10', text: "Négyzetes gúla oldaléle", categoryId: 'diag' },
      { id: 'pes11', text: "Az oldalél és az alaplap szöge", categoryId: 'diag' },
      { id: 'pes12', text: "A gúla magassága az oldalélből és az alapélből", categoryId: 'diag' },
      { id: 'pes13', text: "Négyzetes gúla oldallapmagassága", categoryId: 'half' },
      { id: 'pes14', text: "Az oldallap és az alaplap szöge", categoryId: 'half' },
      { id: 'pes15', text: "A gúla magassága az oldallapmagasságból", categoryId: 'half' },
      { id: 'pes16', text: "A kúp alkotója", categoryId: 'radius' },
      { id: 'pes17', text: "A kúp fél nyílásszöge", categoryId: 'radius' },
      { id: 'pes18', text: "A kúp magassága az alkotóból és a sugárból", categoryId: 'radius' }
    ]
  },
  {
    level: 3,
    title: "3. szint: Igaz vagy hamis?",
    description: "Válogasd szét a fejezet állításait!",
    categories: [
      { id: 'true', name: "Mindig igaz", color: 'emerald' },
      { id: 'false', name: "Hamis", color: 'rose' },
      { id: 'depends', name: "Az adatoktól függ", color: 'amber' }
    ],
    items: [
      { id: 'pes19', text: "A gömb térfogata a köré írt henger térfogatának 2/3 része", categoryId: 'true' },
      { id: 'pes20', text: "Kétszeres méretű hasonló test térfogata 8-szoros", categoryId: 'true' },
      { id: 'pes21', text: "A négyzetes gúla oldallapja meredekebb, mint az oldaléle", categoryId: 'true' },
      { id: 'pes22', text: "A gúla térfogata az alapterület és a magasság szorzata", categoryId: 'false' },
      { id: 'pes23', text: "A kúp palástja kiterítve körgyűrűcikk", categoryId: 'false' },
      { id: 'pes24', text: "A kúpot a magassága felénél elvágva két egyenlő térfogatú rész keletkezik", categoryId: 'false' },
      { id: 'pes25', text: "A henger tengelymetszete négyzet", categoryId: 'depends' },
      { id: 'pes26', text: "A gömb felszínének mérőszáma nagyobb a térfogatáénál", categoryId: 'depends' },
      { id: 'pes27', text: "A kúp nyílásszöge hegyesszög", categoryId: 'depends' }
    ]
  }
];

const SOLIDS_PRACTICE_EXAM_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: SOLIDS_PRACTICE_EXAM_SORTER_LEVELS_LIST[0],
  2: SOLIDS_PRACTICE_EXAM_SORTER_LEVELS_LIST[1],
  3: SOLIDS_PRACTICE_EXAM_SORTER_LEVELS_LIST[2]
};

export const SolidsPracticeExamSorter: React.FC<SolidsPracticeExamSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g12-ter-tudasproba-sorter',
  topicTitle = "18. Gyakorlás, tudáspróba – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Rendszerezd a fejezet testeit, képleteit és állításait!"
      levels={SOLIDS_PRACTICE_EXAM_SORTER_LEVELS}
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

export default SolidsPracticeExamSorter;
