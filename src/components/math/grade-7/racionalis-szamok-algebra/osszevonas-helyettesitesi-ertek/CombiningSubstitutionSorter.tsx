import React from 'react';
import { SorterTemplate, SorterItem, SorterCategory } from '../SorterTemplate';

interface CombiningSubstitutionSorterProps {
  onNextLevel?: () => void;
}

export const CombiningSubstitutionSorter: React.FC<CombiningSubstitutionSorterProps> = ({ onNextLevel }) => {
  // Level 1: Melyik kategóriába tartozik az egynemű tag?
  const level1Categories: SorterCategory[] = [
    { id: 'linear-x', name: 'x változós tagok' },
    { id: 'quadratic-x', name: 'x² hatványos tagok' },
    { id: 'constant', name: 'Puszta konstans számok' },
  ];

  const level1Items: SorterItem[] = [
    { id: 's1-1', content: '7x', categoryId: 'linear-x' },
    { id: 's1-2', content: '-3x', categoryId: 'linear-x' },
    { id: 's1-3', content: '0.5x', categoryId: 'linear-x' },
    { id: 's1-4', content: '4x²', categoryId: 'quadratic-x' },
    { id: 's1-5', content: '-x²', categoryId: 'quadratic-x' },
    { id: 's1-6', content: '12x²', categoryId: 'quadratic-x' },
    { id: 's1-7', content: '8', categoryId: 'constant' },
    { id: 's1-8', content: '-14', categoryId: 'constant' },
    { id: 's1-9', content: '2/3', categoryId: 'constant' },
    { id: 's1-10', content: '-x', categoryId: 'linear-x' },
  ];

  // Level 2: Összevonás utáni tagszám
  const level2Categories: SorterCategory[] = [
    { id: 'monomial', name: '1 tagú (Monom)' },
    { id: 'binomial', name: '2 tagú (Binom)' },
    { id: 'trinomial', name: '3 tagú (Trinom)' },
  ];

  const level2Items: SorterItem[] = [
    { id: 's2-1', content: '4x + 3x - 2x', categoryId: 'monomial' }, // 5x
    { id: 's2-2', content: '5a - 5a + 8', categoryId: 'monomial' }, // 8
    { id: 's2-3', content: '3x² + 4x²', categoryId: 'monomial' }, // 7x²
    { id: 's2-4', content: '5x + 3 - 2x', categoryId: 'binomial' }, // 3x + 3
    { id: 's2-5', content: '4a - 3b + 2a', categoryId: 'binomial' }, // 6a - 3b
    { id: 's2-6', content: 'x² + 5x + 2x²', categoryId: 'binomial' }, // 3x² + 5x
    { id: 's2-7', content: '10 - 2x + 4', categoryId: 'binomial' }, // 14 - 2x
    { id: 's2-8', content: '2x² + 3x - 5', categoryId: 'trinomial' }, // nem vonható tovább
    { id: 's2-9', content: '4a + 2b - 3c', categoryId: 'trinomial' }, // nem vonható tovább
    { id: 's2-10', content: 'x² + 2x - 3 + 4x', categoryId: 'trinomial' }, // x² + 6x - 3
  ];

  // Level 3: Helyettesítési érték előjele (ha x = -2)
  const level3Categories: SorterCategory[] = [
    { id: 'positive', name: 'Pozitív érték (> 0)' },
    { id: 'negative', name: 'Negatív érték (< 0)' },
    { id: 'zero', name: 'Pontosan nulla (= 0)' },
  ];

  const level3Items: SorterItem[] = [
    { id: 's3-1', content: 'x²', categoryId: 'positive' }, // (-2)² = 4
    { id: 's3-2', content: '10 + 3x', categoryId: 'positive' }, // 10 - 6 = 4
    { id: 's3-3', content: '5 - 2x', categoryId: 'positive' }, // 5 - (-4) = 9
    { id: 's3-4', content: '-3x', categoryId: 'positive' }, // -3(-2) = 6
    { id: 's3-5', content: '4x', categoryId: 'negative' }, // 4(-2) = -8
    { id: 's3-6', content: 'x - 5', categoryId: 'negative' }, // -2 - 5 = -7
    { id: 's3-7', content: '2x + 1', categoryId: 'negative' }, // -4 + 1 = -3
    { id: 's3-8', content: 'x + 2', categoryId: 'zero' }, // -2 + 2 = 0
    { id: 's3-9', content: '2x + 4', categoryId: 'zero' }, // -4 + 4 = 0
    { id: 's3-10', content: 'x² - 4', categoryId: 'zero' }, // 4 - 4 = 0
  ];

  return (
    <SorterTemplate
      title="Összevonás & Behelyettesítés Csoportosító"
      subtitle="Csoportosítsd a kifejezéseket egyneműség, összevont tagszám és helyettesítési érték szerint!"
      level1Categories={level1Categories}
      level1Items={level1Items}
      level2Categories={level2Categories}
      level2Items={level2Items}
      level3Categories={level3Categories}
      level3Items={level3Items}
      onNextLevel={onNextLevel}
    />
  );
};
