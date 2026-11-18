import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { ShapeCard80, GlyphCard80, MiniMirrorCard80 } from './SymmetryG2CardFigures';

interface SymmetryG2SorterProps {
  level?: DifficultyLevel | { level?: DifficultyLevel };
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
}

const LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Merre áll a tengely?',
    description: 'Függőleges vagy vízszintes a tükörtengely? Vagy nincs is?',
    categories: [
      { id: 'fugg', name: 'Függőleges tengely', color: 'blue' },
      { id: 'vizsz', name: 'Vízszintes tengely', color: 'emerald' },
      { id: 'nincs', name: 'Nincs tengelye', color: 'rose' }
    ],
    items: [
      { id: 'sys1', text: '', categoryId: 'fugg', figure: <ShapeCard80 kind="sziv" /> },
      { id: 'sys2', text: '', categoryId: 'fugg', figure: <GlyphCard80 ch="A" /> },
      { id: 'sys3', text: '', categoryId: 'fugg', figure: <GlyphCard80 ch="T" /> },
      { id: 'sys4', text: '', categoryId: 'vizsz', figure: <ShapeCard80 kind="jobbra3" /> },
      { id: 'sys5', text: '', categoryId: 'vizsz', figure: <GlyphCard80 ch="E" /> },
      { id: 'sys6', text: '', categoryId: 'vizsz', figure: <GlyphCard80 ch="K" /> },
      { id: 'sys7', text: '', categoryId: 'nincs', figure: <ShapeCard80 kind="ferde" /> },
      { id: 'sys8', text: '', categoryId: 'nincs', figure: <GlyphCard80 ch="F" /> },
      { id: 'sys9', text: '', categoryId: 'nincs', figure: <GlyphCard80 ch="R" /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hány tengelye van?',
    description: 'Számold meg, hányféleképpen hajthatod félbe!',
    categories: [
      { id: 'egy', name: '1 tengely', color: 'sky' },
      { id: 'ketto', name: '2 tengely', color: 'purple' },
      { id: 'negy', name: '4 tengely', color: 'amber' }
    ],
    items: [
      { id: 'sys10', text: '', categoryId: 'egy', figure: <ShapeCard80 kind="egyenloszaru" /> },
      { id: 'sys11', text: '', categoryId: 'egy', figure: <ShapeCard80 kind="dalak" /> },
      { id: 'sys12', text: 'a T betű', categoryId: 'egy' },
      { id: 'sys13', text: '', categoryId: 'ketto', figure: <ShapeCard80 kind="teglalap" /> },
      { id: 'sys14', text: '', categoryId: 'ketto', figure: <ShapeCard80 kind="ellipszis" /> },
      { id: 'sys15', text: 'a H betű', categoryId: 'ketto' },
      { id: 'sys16', text: '', categoryId: 'negy', figure: <ShapeCard80 kind="negyzet" /> },
      { id: 'sys17', text: '', categoryId: 'negy', figure: <ShapeCard80 kind="plusz" /> },
      { id: 'sys18', text: 'a négyzet alakú szalvéta', categoryId: 'negy' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Jó a tükrözés?',
    description: 'A kék a minta, a rózsaszín a rajz. Jó tükörkép, csak áttolta, vagy elcsúszott?',
    categories: [
      { id: 'jo', name: 'Jó tükörkép', color: 'emerald' },
      { id: 'tolt', name: 'Csak áttolta', color: 'amber' },
      { id: 'csuszott', name: 'Elcsúszott 1 mezővel', color: 'rose' }
    ],
    items: [
      { id: 'sys19', text: '', categoryId: 'jo', figure: <MiniMirrorCard80 left={[[2, 0], [1, 1], [2, 1], [0, 2]]} mode="good" /> },
      { id: 'sys20', text: '', categoryId: 'jo', figure: <MiniMirrorCard80 left={[[0, 0], [1, 0], [2, 1], [2, 2], [1, 3]]} mode="good" /> },
      { id: 'sys21', text: '', categoryId: 'jo', figure: <MiniMirrorCard80 left={[[1, 0], [1, 1], [2, 2], [0, 3]]} mode="good" /> },
      { id: 'sys22', text: '', categoryId: 'tolt', figure: <MiniMirrorCard80 left={[[0, 0], [1, 0], [2, 1]]} mode="shift" /> },
      { id: 'sys23', text: '', categoryId: 'tolt', figure: <MiniMirrorCard80 left={[[0, 1], [0, 2], [1, 2], [2, 3]]} mode="shift" /> },
      { id: 'sys24', text: '', categoryId: 'tolt', figure: <MiniMirrorCard80 left={[[2, 0], [1, 1], [0, 2], [0, 3]]} mode="shift" /> },
      { id: 'sys25', text: '', categoryId: 'csuszott', figure: <MiniMirrorCard80 left={[[1, 0], [2, 1], [1, 2]]} mode="off" /> },
      { id: 'sys26', text: '', categoryId: 'csuszott', figure: <MiniMirrorCard80 left={[[2, 0], [2, 1], [1, 1], [1, 3]]} mode="off" /> },
      { id: 'sys27', text: '', categoryId: 'csuszott', figure: <MiniMirrorCard80 left={[[1, 1], [2, 2], [2, 3]]} mode="off" /> }
    ]
  }
];

export const SYMMETRY_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LEVELS_LIST[0],
  2: LEVELS_LIST[1],
  3: LEVELS_LIST[2]
};

export const SymmetryG2Sorter: React.FC<SymmetryG2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-geo-szimmetria-sorter',
  topicTitle = '3. Szimmetria, tükrözés – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="geometria"
      topicId={topicId}
      subtopicId="szimmetria-tukrozes"
      title={topicTitle}
      subtitle="Válogasd szét az alakzatokat a tükörtengelyük szerint!"
      levels={SYMMETRY_G2_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
    />
  );
};

export default SymmetryG2Sorter;
