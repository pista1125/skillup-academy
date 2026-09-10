import React from 'react';
import { SorterTemplate, SorterItem, SorterCategory } from '../SorterTemplate';

interface ExpansionFactoringSorterProps {
  onNextLevel?: () => void;
}

export const ExpansionFactoringSorter: React.FC<ExpansionFactoringSorterProps> = ({ onNextLevel }) => {
  // Level 1: Kifejezés alakja
  const level1Categories: SorterCategory[] = [
    { id: 'product', name: 'Szorzat alak (Zárójeles)' },
    { id: 'expanded', name: 'Kifejtett összeg / különbség' },
    { id: 'fraction', name: 'Tört alakú kifejezés' },
  ];

  const level1Items: SorterItem[] = [
    { id: 's1-1', content: '3(2x + 5)', categoryId: 'product' },
    { id: 's1-2', content: '4a(a - 2b)', categoryId: 'product' },
    { id: 's1-3', content: '-5(x - y + 1)', categoryId: 'product' },
    { id: 's1-4', content: '6x + 15', categoryId: 'expanded' },
    { id: 's1-5', content: '8a² - 12ab', categoryId: 'expanded' },
    { id: 's1-6', content: '4x - 7y + 2', categoryId: 'expanded' },
    { id: 's1-7', content: '(6x + 9) / 3', categoryId: 'fraction' },
    { id: 's1-8', content: '(4a - 8) / 2', categoryId: 'fraction' },
    { id: 's1-9', content: '(x² - 4) / (x + 2)', categoryId: 'fraction' },
    { id: 's1-10', content: '2x(x + 3)', categoryId: 'product' },
  ];

  // Level 2: Kiemelhető legnagyobb közös számosztó
  const level2Categories: SorterCategory[] = [
    { id: 'div2', name: 'Kiemelhető a 2 (vagy páros)' },
    { id: 'div3', name: 'Kiemelhető a 3' },
    { id: 'div5', name: 'Kiemelhető az 5' },
  ];

  const level2Items: SorterItem[] = [
    { id: 's2-1', content: '4x + 6', categoryId: 'div2' }, // 2(2x + 3)
    { id: 's2-2', content: '8a - 10b', categoryId: 'div2' }, // 2(4a - 5b)
    { id: 's2-3', content: '2x² + 14x', categoryId: 'div2' }, // 2x(x + 7)
    { id: 's2-4', content: '9x + 12', categoryId: 'div3' }, // 3(3x + 4)
    { id: 's2-5', content: '6a - 21', categoryId: 'div3' }, // 3(2a - 7)
    { id: 's2-6', content: '15x² + 18x', categoryId: 'div3' }, // 3x(5x + 6)
    { id: 's2-7', content: '10x + 25', categoryId: 'div5' }, // 5(2x + 5)
    { id: 's2-8', content: '5a - 35b', categoryId: 'div5' }, // 5(a - 7b)
    { id: 's2-9', content: '20x² - 15x', categoryId: 'div5' }, // 5x(4x - 3)
    { id: 's2-10', content: '5x + 5', categoryId: 'div5' }, // 5(x + 1)
  ];

  // Level 3: Beszorzás utáni előjelek
  const level3Categories: SorterCategory[] = [
    { id: 'all-pos', name: 'Minden tag pozitív (+, +)' },
    { id: 'mixed', name: 'Vegyes előjel (+, -)' },
    { id: 'all-neg', name: 'Minden tag negatív (-, -)' },
  ];

  const level3Items: SorterItem[] = [
    { id: 's3-1', content: '3(2x + 4)', categoryId: 'all-pos' }, // 6x + 12
    { id: 's3-2', content: '5(a + 3b)', categoryId: 'all-pos' }, // 5a + 15b
    { id: 's3-3', content: '-2(-3x - 4)', categoryId: 'all-pos' }, // 6x + 8
    { id: 's3-4', content: '4(2x - 3)', categoryId: 'mixed' }, // 8x - 12
    { id: 's3-5', content: '-3(2a - 5)', categoryId: 'mixed' }, // -6a + 15
    { id: 's3-6', content: '2(-x + 7)', categoryId: 'mixed' }, // -2x + 14
    { id: 's3-7', content: '-2(3x + 4)', categoryId: 'all-neg' }, // -6x - 8
    { id: 's3-8', content: '-5(2a + b)', categoryId: 'all-neg' }, // -10a - 5b
    { id: 's3-9', content: '-(4x + 9)', categoryId: 'all-neg' }, // -4x - 9
    { id: 's3-10', content: '-4(x + 2y)', categoryId: 'all-neg' }, // -4x - 8y
  ];

  return (
    <SorterTemplate
      title="Zárójelfelbontás & Kiemelés Csoportosító"
      subtitle="Csoportosítsd az algebrai kifejezéseket alakjuk, kiemelhető tényezőjük és előjeleik szerint!"
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
