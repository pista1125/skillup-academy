import React from 'react';
import { SorterTemplate, SorterItem, SorterCategory } from '../SorterTemplate';

interface NumbersLettersSorterProps {
  onNextLevel?: () => void;
}

export const NumbersLettersSorter: React.FC<NumbersLettersSorterProps> = ({ onNextLevel }) => {
  // Level 1: Fő művelet jellege
  const level1Categories: SorterCategory[] = [
    { id: 'sum', name: 'Összeg kifejezés (+)' },
    { id: 'diff', name: 'Különbség kifejezés (-)' },
    { id: 'prod-quot', name: 'Szorzat vagy Hányados (· / :)' },
  ];

  const level1Items: SorterItem[] = [
    { id: 's1-1', content: 'x + 8', categoryId: 'sum' },
    { id: 's1-2', content: '2a + 3b', categoryId: 'sum' },
    { id: 's1-3', content: '5x + 10', categoryId: 'sum' },
    { id: 's1-4', content: 'y - 4', categoryId: 'diff' },
    { id: 's1-5', content: '7 - 2x', categoryId: 'diff' },
    { id: 's1-6', content: '3a - 5b', categoryId: 'diff' },
    { id: 's1-7', content: '4 · x', categoryId: 'prod-quot' },
    { id: 's1-8', content: '3(a + b)', categoryId: 'prod-quot' },
    { id: 's1-9', content: 'x / 5', categoryId: 'prod-quot' },
    { id: 's1-10', content: '-6ab', categoryId: 'prod-quot' },
  ];

  // Level 2: Együttható kategóriák
  const level2Categories: SorterCategory[] = [
    { id: 'pos', name: 'Pozitív szám együttható (> 1)' },
    { id: 'neg', name: 'Negatív szám együttható (< -1)' },
    { id: 'implicit', name: 'Rejtett együttható (+1 vagy -1)' },
  ];

  const level2Items: SorterItem[] = [
    { id: 's2-1', content: '5x', categoryId: 'pos' },
    { id: 's2-2', content: '12a²', categoryId: 'pos' },
    { id: 's2-3', content: '3.5y', categoryId: 'pos' },
    { id: 's2-4', content: '-4x', categoryId: 'neg' },
    { id: 's2-5', content: '-8ab', categoryId: 'neg' },
    { id: 's2-6', content: '-2.5k', categoryId: 'neg' },
    { id: 's2-7', content: 'x', categoryId: 'implicit' },
    { id: 's2-8', content: '-x', categoryId: 'implicit' },
    { id: 's2-9', content: 'ab', categoryId: 'implicit' },
    { id: 's2-10', content: '-y²', categoryId: 'implicit' },
  ];

  // Level 3: Szerkezet szerinti csoportosítás
  const level3Categories: SorterCategory[] = [
    { id: 'monomial', name: 'Egytagú kifejezés (Monom)' },
    { id: 'polynomial', name: 'Többtagú kifejezés (Polinom)' },
    { id: 'parenthesis-frac', name: 'Zárójeles / Törtes kifejezés' },
  ];

  const level3Items: SorterItem[] = [
    { id: 's3-1', content: '7x²', categoryId: 'monomial' },
    { id: 's3-2', content: '-3ab', categoryId: 'monomial' },
    { id: 's3-3', content: '1/2 y', categoryId: 'monomial' },
    { id: 's3-4', content: '2x + 5', categoryId: 'polynomial' },
    { id: 's3-5', content: 'a² - 2ab + b²', categoryId: 'polynomial' },
    { id: 's3-6', content: '3x - 4y + 7', categoryId: 'polynomial' },
    { id: 's3-7', content: '4(x - 3)', categoryId: 'parenthesis-frac' },
    { id: 's3-8', content: '(a + b) / 2', categoryId: 'parenthesis-frac' },
    { id: 's3-9', content: '2(3a + 5b)', categoryId: 'parenthesis-frac' },
    { id: 's3-10', content: '(x - 4) / (y + 2)', categoryId: 'parenthesis-frac' },
  ];

  return (
    <SorterTemplate
      title="Algebrai Kifejezések Csoportosító"
      subtitle="Válogasd szét a betűs kifejezéseket típusuk, együtthatóik és felépítésük szerint!"
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
