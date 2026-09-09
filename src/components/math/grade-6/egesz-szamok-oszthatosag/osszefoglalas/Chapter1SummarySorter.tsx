import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';

interface Chapter1SummarySorterProps {
  onBack: () => void;
}

const SORTER_LEVELS: SorterLevelConfig[] = [
  {
    difficulty: 'easy',
    title: 'Könnyű szint: Számelméleti kategóriák',
    instruction: 'Csoportosítsd a számokat aszerint, hogy prímek, összetettek vagy egységek!',
    categories: [
      { id: 'prime', name: 'Prímszámok (pontosan 2 osztó)', color: 'emerald' },
      { id: 'composite', name: 'Összetett számok (>2 osztó)', color: 'indigo' },
      { id: 'special', name: 'Sem nem prím, sem nem összetett', color: 'slate' },
    ],
    items: [
      { id: 'e1', text: '2 (az egyetlen páros prím)', correctCategory: 'prime' },
      { id: 'e2', text: '17', correctCategory: 'prime' },
      { id: 'e3', text: '31', correctCategory: 'prime' },
      { id: 'e4', text: '9 (3²)', correctCategory: 'composite' },
      { id: 'e5', text: '24', correctCategory: 'composite' },
      { id: 'e6', text: '51 (3 · 17)', correctCategory: 'composite' },
      { id: 'e7', text: '91 (7 · 13)', correctCategory: 'composite' },
      { id: 'e8', text: '1 (egység)', correctCategory: 'special' },
      { id: 'e9', text: '0', correctCategory: 'special' },
      { id: 'e10', text: '37', correctCategory: 'prime' },
    ],
  },
  {
    difficulty: 'medium',
    title: 'Közepes szint: Egész számok műveleteinek előjele',
    instruction: 'Csoportosítsd a kifejezéseket az eredményük előjele alapján!',
    categories: [
      { id: 'pos', name: 'Pozitív (+) eredmény', color: 'emerald' },
      { id: 'neg', name: 'Negatív (-) eredmény', color: 'rose' },
      { id: 'zero', name: 'Nulla (0)', color: 'slate' },
    ],
    items: [
      { id: 'm1', text: '(-6) · (-7)', correctCategory: 'pos' },
      { id: 'm2', text: '(-36) : (-4)', correctCategory: 'pos' },
      { id: 'm3', text: '(-5) + (+12)', correctCategory: 'pos' },
      { id: 'm4', text: '(-8) · (+9)', correctCategory: 'neg' },
      { id: 'm5', text: '(+45) : (-5)', correctCategory: 'neg' },
      { id: 'm6', text: '(-14) + (+6)', correctCategory: 'neg' },
      { id: 'm7', text: '(-10) - (+5)', correctCategory: 'neg' },
      { id: 'm8', text: '(-8) · 0', correctCategory: 'zero' },
      { id: 'm9', text: '(-12) + (+12)', correctCategory: 'zero' },
      { id: 'm10', text: '(-15) - (-15)', correctCategory: 'zero' },
    ],
  },
  {
    difficulty: 'hard',
    title: 'Gondolkodtató szint: Oszthatósági csoportok',
    instruction: 'Csoportosítsd a számokat az összetett oszthatósági szabályaik szerint!',
    categories: [
      { id: 'div12', name: 'Osztható 12-vel', color: 'indigo' },
      { id: 'div18', name: 'Osztható 18-cal', color: 'purple' },
      { id: 'both36', name: 'Osztható 36-tal (mindkettővel)', color: 'emerald' },
    ],
    items: [
      { id: 'h1', text: '24', correctCategory: 'div12' },
      { id: 'h2', text: '48', correctCategory: 'div12' },
      { id: 'h3', text: '60', correctCategory: 'div12' },
      { id: 'h4', text: '18', correctCategory: 'div18' },
      { id: 'h5', text: '54', correctCategory: 'div18' },
      { id: 'h6', text: '90', correctCategory: 'div18' },
      { id: 'h7', text: '36', correctCategory: 'both36' },
      { id: 'h8', text: '72', correctCategory: 'both36' },
      { id: 'h9', text: '144', correctCategory: 'both36' },
      { id: 'h10', text: '216', correctCategory: 'both36' },
    ],
  },
];

export function Chapter1SummarySorter({ onBack }: Chapter1SummarySorterProps) {
  return (
    <SorterTemplate
      title="I. Fejezet Záró Csoportosító"
      description="Rendezd a matematikai fogalmakat, kifejezéseket és számokat a megfelelő csoportokba!"
      levels={SORTER_LEVELS}
      themeColor="indigo"
      onBack={onBack}
    />
  );
}
