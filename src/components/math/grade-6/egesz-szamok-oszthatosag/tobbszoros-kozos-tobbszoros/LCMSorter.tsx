import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';

interface LCMSorterProps {
  onBack: () => void;
}

const SORTER_LEVELS: SorterLevelConfig[] = [
  {
    difficulty: 'easy',
    title: 'Könnyű szint: LKKT kapcsolattípusok',
    instruction: 'Csoportosítsd a számpárokat aszerint, hogy hogyan kapjuk meg a legkisebb közös többszörösüket!',
    categories: [
      { id: 'product', name: 'Szorzat: [a, b] = a · b (relatív prímek)', color: 'emerald' },
      { id: 'larger', name: 'Nagyobb szám: [a, b] = b (egyik osztója)', color: 'amber' },
      { id: 'proper_lcm', name: 'Köztes LKKT: [a, b] < a · b', color: 'blue' },
    ],
    items: [
      { id: 'e1', text: '[3, 7]', correctCategory: 'product' },
      { id: 'e2', text: '[5, 8]', correctCategory: 'product' },
      { id: 'e3', text: '[4, 9]', correctCategory: 'product' },
      { id: 'e4', text: '[4, 8]', correctCategory: 'larger' },
      { id: 'e5', text: '[6, 18]', correctCategory: 'larger' },
      { id: 'e6', text: '[5, 20]', correctCategory: 'larger' },
      { id: 'e7', text: '[4, 6]', correctCategory: 'proper_lcm' },
      { id: 'e8', text: '[6, 8]', correctCategory: 'proper_lcm' },
      { id: 'e9', text: '[8, 12]', correctCategory: 'proper_lcm' },
      { id: 'e10', text: '[10, 15]', correctCategory: 'proper_lcm' },
    ],
  },
  {
    difficulty: 'medium',
    title: 'Közepes szint: LKKT számszerű értéke',
    instruction: 'Csoportosítsd a számpárokat a legkisebb közös többszörösük nagysága alapján!',
    categories: [
      { id: 'under30', name: '[a, b] ≤ 30', color: 'emerald' },
      { id: 'mid30to60', name: '30 < [a, b] ≤ 60', color: 'amber' },
      { id: 'over60', name: '[a, b] > 60', color: 'purple' },
    ],
    items: [
      { id: 'm1', text: '[4, 6] = 12', correctCategory: 'under30' },
      { id: 'm2', text: '[6, 8] = 24', correctCategory: 'under30' },
      { id: 'm3', text: '[5, 6] = 30', correctCategory: 'under30' },
      { id: 'm4', text: '[12, 18] = 36', correctCategory: 'mid30to60' },
      { id: 'm5', text: '[16, 24] = 48', correctCategory: 'mid30to60' },
      { id: 'm6', text: '[15, 20] = 60', correctCategory: 'mid30to60' },
      { id: 'm7', text: '[20, 30] = 60', correctCategory: 'mid30to60' },
      { id: 'm8', text: '[24, 36] = 72', correctCategory: 'over60' },
      { id: 'm9', text: '[18, 27] = 54', correctCategory: 'mid30to60' },
      { id: 'm10', text: '[14, 21, 35] = 210', correctCategory: 'over60' },
    ],
  },
  {
    difficulty: 'hard',
    title: 'Gondolkodtató szint: LKKT és LNKO kapcsolatok',
    instruction: 'Csoportosítsd az állításokat és számpárokat a rájuk jellemző összefüggés szerint!',
    categories: [
      { id: 'gcd1', name: 'LNKO = 1 (Relatív prímek)', color: 'emerald' },
      { id: 'gcdPrime', name: 'LNKO prímszám (2, 3 vagy 5)', color: 'blue' },
      { id: 'gcdComposite', name: 'LNKO összetett szám (≥ 4)', color: 'purple' },
    ],
    items: [
      { id: 'h1', text: '[8, 15] = 120', correctCategory: 'gcd1' },
      { id: 'h2', text: '[9, 16] = 144', correctCategory: 'gcd1' },
      { id: 'h3', text: '[7, 11] = 77', correctCategory: 'gcd1' },
      { id: 'h4', text: '[6, 8] = 24 (LNKO=2)', correctCategory: 'gcdPrime' },
      { id: 'h5', text: '[6, 9] = 18 (LNKO=3)', correctCategory: 'gcdPrime' },
      { id: 'h6', text: '[10, 15] = 30 (LNKO=5)', correctCategory: 'gcdPrime' },
      { id: 'h7', text: '[12, 18] = 36 (LNKO=6)', correctCategory: 'gcdComposite' },
      { id: 'h8', text: '[16, 24] = 48 (LNKO=8)', correctCategory: 'gcdComposite' },
      { id: 'h9', text: '[24, 36] = 72 (LNKO=12)', correctCategory: 'gcdComposite' },
      { id: 'h10', text: '[20, 30] = 60 (LNKO=10)', correctCategory: 'gcdComposite' },
    ],
  },
];

export function LCMSorter({ onBack }: LCMSorterProps) {
  return (
    <SorterTemplate
      title="LKKT Csoportosító"
      description="Rendezd a számpárokat és LKKT összefüggéseket a megfelelő csoportokba!"
      levels={SORTER_LEVELS}
      themeColor="amber"
      onBack={onBack}
    />
  );
}
