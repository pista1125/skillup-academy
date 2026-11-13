import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  LineAndParabolaIntersectionSvg,
  SymmetricSystemVieteBridgeSvg,
  CircleAndLineSystemSvg,
  EliminationQuadraticsSvg,
  OrderedPairsVerificationSvg
} from './QuadraticSystemsFigures';

interface QuadraticSystemsSorterProps {
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
    title: 'Megoldási stratégiák osztályozása',
    subtitle: 'Sorold be az egyenletrendszereket a legcélszerűbb és leggyorsabb algebrai megoldási módszerük szerint!',
    categories: [
      {
        id: 'cat-subst',
        name: 'Behelyettesítő módszer (lineáris + másodfokú)',
        description: 'Az elsőfokú egyenletből kifejezzük az egyik ismeretlent, és behelyettesítjük a másikba',
        badgeColor: 'bg-orange-100 text-orange-900 border-orange-300'
      },
      {
        id: 'cat-viete',
        name: 'Viète-segédegyenlet (szimmetrikus rendszer)',
        description: 'x + y = S és xy = P alak: közvetlenül u² - Su + P = 0 megoldásával kapjuk az x, y számpárokat',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-elim',
        name: 'Tagelimináció / Kivonás (két másodfokú)',
        description: 'A két másodfokú egyenlet kivonásával kiejtjük a négyzetes tagokat',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'qss1-1', content: 'y = 3x - 1  és  x² + y² = 10', figure: <LineAndParabolaIntersectionSvg size={42} />, categoryId: 'cat-subst' },
      { id: 'qss1-2', content: 'x - 2y = 4  és  xy = 6', categoryId: 'cat-subst' },
      { id: 'qss1-3', content: 'y = x²  és  2x + y = 3', categoryId: 'cat-subst' },
      { id: 'qss1-4', content: 'x + y = 9  és  xy = 14', figure: <SymmetricSystemVieteBridgeSvg size={42} />, categoryId: 'cat-viete' },
      { id: 'qss1-5', content: 'x + y = -2  és  xy = -15', categoryId: 'cat-viete' },
      { id: 'qss1-6', content: 'x² + y² = 25  és  xy = 12', categoryId: 'cat-viete' },
      { id: 'qss1-7', content: 'x² + y² = 20  és  x² - y² = 12', figure: <EliminationQuadraticsSvg size={42} />, categoryId: 'cat-elim' },
      { id: 'qss1-8', content: 'x² + y² + 2x = 9  és  x² + y² - 4y = 5', categoryId: 'cat-elim' },
      { id: 'qss1-9', content: '2x² + y² = 18  és  x² + y² = 10', categoryId: 'cat-elim' }
    ]
  },
  2: {
    title: 'A valós megoldáspárok száma',
    subtitle: 'Határozd meg, hogy hány rendezett valós számpár teszi igazzá a megadott rendszereket!',
    categories: [
      {
        id: 'cat-two-pairs',
        name: '2 vagy több megoldáspár (metsző görbék)',
        description: 'A diszkrimináns D > 0, az egyenes és a görbe két vagy több pontban metszi egymást',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-one-pair',
        name: 'Pontosan 1 megoldáspár (érintés / kétszeres gyök)',
        description: 'A diszkrimináns D = 0, az egyenes érinti a görbét',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-no-pairs',
        name: 'Nincs valós megoldáspár (elkerülő görbék)',
        description: 'A diszkrimináns D < 0, a görbék nem érintkeznek a valós síkon',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'qss2-1', content: 'y = x²  és  y = x + 6', figure: <LineAndParabolaIntersectionSvg size={42} />, categoryId: 'cat-two-pairs' },
      { id: 'qss2-2', content: 'x + y = 8  és  xy = 15', categoryId: 'cat-two-pairs' },
      { id: 'qss2-3', content: 'x² + y² = 25  és  y = 4', categoryId: 'cat-two-pairs' },
      { id: 'qss2-4', content: 'y = x²  és  y = 2x - 1', figure: <OrderedPairsVerificationSvg size={42} />, categoryId: 'cat-one-pair' },
      { id: 'qss2-5', content: 'x + y = 6  és  xy = 9', categoryId: 'cat-one-pair' },
      { id: 'qss2-6', content: 'x² + y² = 16  és  x = 4', categoryId: 'cat-one-pair' },
      { id: 'qss2-7', content: 'y = x²  és  y = -2', figure: <CircleAndLineSystemSvg size={42} />, categoryId: 'cat-no-pairs' },
      { id: 'qss2-8', content: 'x + y = 2  és  xy = 5', categoryId: 'cat-no-pairs' },
      { id: 'qss2-9', content: 'x² + y² = 9  és  y = 5', categoryId: 'cat-no-pairs' }
    ]
  },
  3: {
    title: 'Geometriai alakzatok metszése a koordinátasíkon',
    subtitle: 'Csoportosítsd az egyenletrendszereket a mögöttük rejlő geometriai alakzatok típusa szerint!',
    categories: [
      {
        id: 'cat-line-parabola',
        name: 'Egyenes és parabola metszése',
        description: 'y = ax² + bx + c és y = mx + d típusú rendszerek',
        badgeColor: 'bg-orange-100 text-orange-900 border-orange-300'
      },
      {
        id: 'cat-circle-line',
        name: 'Kör és egyenes metszése',
        description: '(x - u)² + (y - v)² = r² és egyenes egyenlete',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      },
      {
        id: 'cat-two-conics',
        name: 'Két másodfokú görbe metszése',
        description: 'Két kör, két parabola vagy kör és parabola metszése',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'qss3-1', content: 'y = x² - 3x  és  y = 2x + 1', figure: <LineAndParabolaIntersectionSvg size={42} />, categoryId: 'cat-line-parabola' },
      { id: 'qss3-2', content: 'y = -2x² + 5  és  x + y = 2', categoryId: 'cat-line-parabola' },
      { id: 'qss3-3', content: 'y = 0.5x²  és  y = 4', categoryId: 'cat-line-parabola' },
      { id: 'qss3-4', content: 'x² + y² = 25  és  3x + 4y = 25', figure: <CircleAndLineSystemSvg size={42} />, categoryId: 'cat-circle-line' },
      { id: 'qss3-5', content: 'x² + y² = 10  és  y = x + 2', categoryId: 'cat-circle-line' },
      { id: 'qss3-6', content: '(x - 1)² + y² = 9  és  x = 4', categoryId: 'cat-circle-line' },
      { id: 'qss3-7', content: 'x² + y² = 16  és  x² + (y - 2)² = 9', figure: <EliminationQuadraticsSvg size={42} />, categoryId: 'cat-two-conics' },
      { id: 'qss3-8', content: 'y = x²  és  y = 6 - x²', categoryId: 'cat-two-conics' },
      { id: 'qss3-9', content: 'x² + y² = 25  és  y = x² - 5', categoryId: 'cat-two-conics' }
    ]
  }
};

export const QuadraticSystemsSorter: React.FC<QuadraticSystemsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-eq-masodfoku-egyenletrendszerek-sorter',
  topicTitle = '9. Ráadás – Másodfokú egyenletrendszerek'
}) => {
  const activeLevel = currentLevel ?? level;

  return (
    <SorterTemplate
      level={activeLevel}
      levelConfigs={sorterLevels}
      themeColor="orange"
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

