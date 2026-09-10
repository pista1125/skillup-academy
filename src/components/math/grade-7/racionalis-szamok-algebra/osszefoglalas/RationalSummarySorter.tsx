import React from 'react';
import { SorterTemplate, SorterItem, SorterCategory } from '../SorterTemplate';

interface RationalSummarySorterProps {
  onNextLevel?: () => void;
}

export const RationalSummarySorter: React.FC<RationalSummarySorterProps> = ({ onNextLevel }) => {
  // Level 1: Számtani kifejezések előjele
  const level1Categories: SorterCategory[] = [
    { id: 'pos', name: 'Pozitív érték (> 0)' },
    { id: 'neg', name: 'Negatív érték (< 0)' },
    { id: 'zero', name: 'Nulla (= 0)' },
  ];

  const level1Items: SorterItem[] = [
    { id: 's1-1', content: '(-3) · (-4)', categoryId: 'pos' },
    { id: 's1-2', content: '(-2/3)²', categoryId: 'pos' },
    { id: 's1-3', content: '|-8.5|', categoryId: 'pos' },
    { id: 's1-4', content: '15 - (-5)', categoryId: 'pos' },
    { id: 's1-5', content: '(-2) · 5', categoryId: 'neg' },
    { id: 's1-6', content: '(-3/4) : (1/2)', categoryId: 'neg' },
    { id: 's1-7', content: '4 - 10', categoryId: 'neg' },
    { id: 's1-8', content: '-3²', categoryId: 'neg' },
    { id: 's1-9', content: '5 - 5', categoryId: 'zero' },
    { id: 's1-10', content: '0 · (-7.2)', categoryId: 'zero' },
  ];

  // Level 2: Algebrai kifejezés szerkezete
  const level2Categories: SorterCategory[] = [
    { id: 'monomial', name: 'Egytagú kifejezés (Monom)' },
    { id: 'polynomial', name: 'Többtagú kifejezés (Polinom)' },
    { id: 'factored', name: 'Szorzat alak (Zárójeles)' },
  ];

  const level2Items: SorterItem[] = [
    { id: 's2-1', content: '7x²', categoryId: 'monomial' },
    { id: 's2-2', content: '-4ab', categoryId: 'monomial' },
    { id: 's2-3', content: '2/3 y', categoryId: 'monomial' },
    { id: 's2-4', content: '3x + 5', categoryId: 'polynomial' },
    { id: 's2-5', content: '2a - 3b + 7', categoryId: 'polynomial' },
    { id: 's2-6', content: 'x² + 4x - 5', categoryId: 'polynomial' },
    { id: 's2-7', content: '3(2x + 4)', categoryId: 'factored' },
    { id: 's2-8', content: '2x(x - 5)', categoryId: 'factored' },
    { id: 's2-9', content: '-4(a + 2b)', categoryId: 'factored' },
    { id: 's2-10', content: '5(x + 1)', categoryId: 'factored' },
  ];

  // Level 3: Helyettesítési érték (ha x = 3)
  const level3Categories: SorterCategory[] = [
    { id: 'lt-zero', name: 'Negatív érték (< 0)' },
    { id: 'mid-val', name: '0 és 15 közötti érték [0..15]' },
    { id: 'gt-15', name: '15-nél nagyobb érték (> 15)' },
  ];

  const level3Items: SorterItem[] = [
    { id: 's3-1', content: '2x - 10', categoryId: 'lt-zero' }, // 6 - 10 = -4
    { id: 's3-2', content: '1 - 2x', categoryId: 'lt-zero' }, // 1 - 6 = -5
    { id: 's3-3', content: '-3x + 4', categoryId: 'lt-zero' }, // -9 + 4 = -5
    { id: 's3-4', content: '2x + 1', categoryId: 'mid-val' }, // 6 + 1 = 7
    { id: 's3-5', content: '4x - 2', categoryId: 'mid-val' }, // 12 - 2 = 10
    { id: 's3-6', content: 'x² + 2', categoryId: 'mid-val' }, // 9 + 2 = 11
    { id: 's3-7', content: '3x + 10', categoryId: 'gt-15' }, // 9 + 10 = 19
    { id: 's3-8', content: '2x²', categoryId: 'gt-15' }, // 2 · 9 = 18
    { id: 's3-9', content: '5x + 7', categoryId: 'gt-15' }, // 15 + 7 = 22
    { id: 's3-10', content: 'x³', categoryId: 'gt-15' }, // 27
  ];

  return (
    <SorterTemplate
      title="II. Fejezeti Nagy Csoportosító"
      subtitle="Csoportosítsd a kifejezéseket előjelük, algebrai szerkezetük és számértékük szerint!"
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
