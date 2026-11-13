import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  SynthesisConceptMapSvg,
  ExamChecklistTreeSvg,
  InequalityRegionsSvg,
  NonlinearSystemsIntersectionSvg,
  GradingRubricTrophySvg
} from './PracticeExamFigures';

interface PracticeExamSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: 'Feladványok matematikai típusa',
    subtitle: 'Sorold be a kifejezéseket és összefüggéseket a fejezet 3 fő témaköre szerint!',
    categories: [
      {
        id: 'cat-quad',
        name: 'Másodfokú algebrai egyenlet',
        description: 'ax² + bx + c = 0 alakú egyenletek (megoldóképlet, kiemelés, szorzattá bontás)',
        badgeColor: 'bg-violet-100 text-violet-900 border-violet-300'
      },
      {
        id: 'cat-rad',
        name: 'Irracionális (négyzetgyökös) egyenlet',
        description: 'Ismeretlent tartalmazó négyzetgyökös kifejezések kötelező próbával',
        badgeColor: 'bg-pink-100 text-pink-900 border-pink-300'
      },
      {
        id: 'cat-ineq',
        name: 'Egyenlőtlenség (másodfokú vagy törtes)',
        description: 'Relációjeles algebrai összefüggések, intervallumos megoldáshalmazzal',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      { id: 'pes1-1', content: 'x² - 5x + 6 = 0', figure: <SynthesisConceptMapSvg size={42} />, categoryId: 'cat-quad' },
      { id: 'pes1-2', content: '3x² - 12 = 0', categoryId: 'cat-quad' },
      { id: 'pes1-3', content: '2x² + 7x = 0', categoryId: 'cat-quad' },
      { id: 'pes1-4', content: '√(2x + 5) = x + 1', figure: <ExamChecklistTreeSvg size={42} />, categoryId: 'cat-rad' },
      { id: 'pes1-5', content: '√(x - 3) = 4', categoryId: 'cat-rad' },
      { id: 'pes1-6', content: '√(x² - 16) = 3', categoryId: 'cat-rad' },
      { id: 'pes1-7', content: '(x - 2)(x + 4) ≤ 0', figure: <InequalityRegionsSvg size={42} />, categoryId: 'cat-ineq' },
      { id: 'pes1-8', content: '(x + 1)/(x - 3) > 0', categoryId: 'cat-ineq' },
      { id: 'pes1-9', content: 'x² - 9 < 0', categoryId: 'cat-ineq' }
    ]
  },
  2: {
    title: 'A valós megoldások száma a témazárón',
    subtitle: 'Határozd meg, hány valós megoldással vagy számpárral rendelkeznek az alábbi feladatok!',
    categories: [
      {
        id: 'cat-two-roots',
        name: '2 valós megoldás / számpár (D > 0)',
        description: 'Két különböző valós gyök vagy metszéspont a síkon',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-one-root',
        name: 'Pontosan 1 valós megoldás (D = 0 vagy szűrés)',
        description: 'Érintő állapot, teljes négyzet vagy az egyik gyök hamissága miatt 1 valódi gyök',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-no-roots',
        name: 'Nincs valós megoldás (D < 0 vagy M = ∅)',
        description: 'Negatív diszkrimináns vagy ellentmondásos feltétel',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'pes2-1', content: 'x² - 7x + 10 = 0', figure: <SynthesisConceptMapSvg size={42} />, categoryId: 'cat-two-roots' },
      { id: 'pes2-2', content: 'x² - 16 = 0', categoryId: 'cat-two-roots' },
      { id: 'pes2-3', content: 'x + y = 5  és  xy = 6', categoryId: 'cat-two-roots' },
      { id: 'pes2-4', content: 'x² - 6x + 9 = 0', figure: <GradingRubricTrophySvg size={42} />, categoryId: 'cat-one-root' },
      { id: 'pes2-5', content: '√(x + 2) = x', categoryId: 'cat-one-root' },
      { id: 'pes2-6', content: 'y = x²  és  y = 2x - 1', categoryId: 'cat-one-root' },
      { id: 'pes2-7', content: 'x² + 9 = 0', figure: <ExamChecklistTreeSvg size={42} />, categoryId: 'cat-no-roots' },
      { id: 'pes2-8', content: '√(x + 3) = -2', categoryId: 'cat-no-roots' },
      { id: 'pes2-9', content: 'x² - 2x + 5 = 0', categoryId: 'cat-no-roots' }
    ]
  },
  3: {
    title: 'Érettségi feladatok elméleti fókusza',
    subtitle: 'Milyen matematikai elvet vagy eszköztárat igényel a megoldás levezetése?',
    categories: [
      {
        id: 'cat-domain',
        name: 'Értelmezési tartomány és kizárás',
        description: 'Nevező nem 0, gyök alatt nemnegatív, hamis gyökök elkerülése',
        badgeColor: 'bg-violet-100 text-violet-900 border-violet-300'
      },
      {
        id: 'cat-viete-focus',
        name: 'Viète-formulák és szimmetria',
        description: 'Gyökök összege (-b/a), szorzata (c/a), négyzetösszeg és szimmetrikus rendszerek',
        badgeColor: 'bg-orange-100 text-orange-900 border-orange-300'
      },
      {
        id: 'cat-geometry',
        name: 'Geometriai metszéspontok és alakzatok',
        description: 'Egyenes és parabola, kör és egyenes közös pontjai a koordinátasíkon',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      }
    ],
    items: [
      { id: 'pes3-1', content: '(x² - 4)/(x - 2) = 0', figure: <ExamChecklistTreeSvg size={42} />, categoryId: 'cat-domain' },
      { id: 'pes3-2', content: '√(3x - 6) = x - 2 kikötése', categoryId: 'cat-domain' },
      { id: 'pes3-3', content: '(x + 4)/(x - 1) ≤ 0 nevezője', categoryId: 'cat-domain' },
      { id: 'pes3-4', content: 'x₁² + x₂² = (x₁ + x₂)² - 2x₁x₂', figure: <SynthesisConceptMapSvg size={42} />, categoryId: 'cat-viete-focus' },
      { id: 'pes3-5', content: 'x + y = 8  és  xy = 15', categoryId: 'cat-viete-focus' },
      { id: 'pes3-6', content: '1/x₁ + 1/x₂ = -b/c', categoryId: 'cat-viete-focus' },
      { id: 'pes3-7', content: 'y = x²  és  y = x + 2', figure: <NonlinearSystemsIntersectionSvg size={42} />, categoryId: 'cat-geometry' },
      { id: 'pes3-8', content: 'x² + y² = 25  és  y = 3', categoryId: 'cat-geometry' },
      { id: 'pes3-9', content: 'y = 2x²  és  y = 4x - 2 érintője', categoryId: 'cat-geometry' }
    ]
  }
};

export const PracticeExamSorter: React.FC<PracticeExamSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-eq-gyakorlas-tudasproba-sorter',
  topicTitle = '10. Gyakorlás, fejezeti tudáspróba'
}) => {
  const activeLevel = currentLevel ?? level;

  return (
    <SorterTemplate
      level={activeLevel}
      levelConfigs={sorterLevels}
      themeColor="violet"
      topicId={topicId}
      topicTitle={topicTitle}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

