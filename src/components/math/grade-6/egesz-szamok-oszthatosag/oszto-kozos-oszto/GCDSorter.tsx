import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';

interface GCDSorterProps {
  onBack: () => void;
}

const SORTER_LEVELS: SorterLevelConfig[] = [
  {
    difficulty: 'easy',
    title: 'Könnyű szint: LNKO kapcsolattípusok',
    instruction: 'Csoportosítsd a számpárokat a legnagyobb közös osztójuk jellege alapján!',
    categories: [
      { id: 'coprime', name: 'Relatív prímek: (a, b) = 1', color: 'emerald' },
      { id: 'smaller', name: 'Kisebb szám: (a, b) = a (egyik osztója)', color: 'blue' },
      { id: 'proper_gcd', name: 'Köztes LNKO: 1 < (a, b) < a', color: 'indigo' },
    ],
    items: [
      { id: 'e1', text: '(8, 9)', correctCategory: 'coprime' },
      { id: 'e2', text: '(7, 15)', correctCategory: 'coprime' },
      { id: 'e3', text: '(4, 25)', correctCategory: 'coprime' },
      { id: 'e4', text: '(6, 18)', correctCategory: 'smaller' },
      { id: 'e5', text: '(5, 20)', correctCategory: 'smaller' },
      { id: 'e6', text: '(12, 48)', correctCategory: 'smaller' },
      { id: 'e7', text: '(12, 18)', correctCategory: 'proper_gcd' },
      { id: 'e8', text: '(8, 12)', correctCategory: 'proper_gcd' },
      { id: 'e9', text: '(15, 25)', correctCategory: 'proper_gcd' },
      { id: 'e10', text: '(16, 24)', correctCategory: 'proper_gcd' },
    ],
  },
  {
    difficulty: 'medium',
    title: 'Közepes szint: LNKO számszerű értéke',
    instruction: 'Csoportosítsd a számpárokat a legnagyobb közös osztójuk nagysága alapján!',
    categories: [
      { id: 'under6', name: '(a, b) ≤ 5', color: 'emerald' },
      { id: 'mid6to12', name: '6 ≤ (a, b) ≤ 12', color: 'indigo' },
      { id: 'over12', name: '(a, b) > 12', color: 'purple' },
    ],
    items: [
      { id: 'm1', text: '(8, 12) = 4', correctCategory: 'under6' },
      { id: 'm2', text: '(15, 25) = 5', correctCategory: 'under6' },
      { id: 'm3', text: '(9, 15) = 3', correctCategory: 'under6' },
      { id: 'm4', text: '(12, 18) = 6', correctCategory: 'mid6to12' },
      { id: 'm5', text: '(16, 24) = 8', correctCategory: 'mid6to12' },
      { id: 'm6', text: '(24, 36) = 12', correctCategory: 'mid6to12' },
      { id: 'm7', text: '(28, 70) = 14', correctCategory: 'over12' },
      { id: 'm8', text: '(30, 45) = 15', correctCategory: 'over12' },
      { id: 'm9', text: '(48, 72) = 24', correctCategory: 'over12' },
      { id: 'm10', text: '(60, 80) = 20', correctCategory: 'over12' },
    ],
  },
  {
    difficulty: 'hard',
    title: 'Gondolkodtató szint: Törtek egyszerűsíthetősége',
    instruction: 'Csoportosítsd a törteket aszerint, hogy mekkora számmal egyszerűsíthetők a számláló és nevező LNKO-ja alapján!',
    categories: [
      { id: 'irreducible', name: 'Tovább nem egyszerűsíthető: LNKO = 1', color: 'emerald' },
      { id: 'prime_simp', name: 'Egyszerűsíthető prím számmal (2, 3 vagy 5)', color: 'blue' },
      { id: 'comp_simp', name: 'Egyszerűsíthető összetett számmal (≥ 4)', color: 'purple' },
    ],
    items: [
      { id: 'h1', text: '8/15', correctCategory: 'irreducible' },
      { id: 'h2', text: '13/27', correctCategory: 'irreducible' },
      { id: 'h3', text: '21/25', correctCategory: 'irreducible' },
      { id: 'h4', text: '14/21 (osztó: 7)', correctCategory: 'prime_simp' },
      { id: 'h5', text: '15/25 (osztó: 5)', correctCategory: 'prime_simp' },
      { id: 'h6', text: '18/27 (osztó: 9 -> prím lépésben is)', correctCategory: 'comp_simp' },
      { id: 'h7', text: '24/36 (LNKO = 12)', correctCategory: 'comp_simp' },
      { id: 'h8', text: '48/72 (LNKO = 24)', correctCategory: 'comp_simp' },
      { id: 'h9', text: '16/24 (LNKO = 8)', correctCategory: 'comp_simp' },
      { id: 'h10', text: '10/15 (osztó: 5)', correctCategory: 'prime_simp' },
    ],
  },
];

export function GCDSorter({ onBack }: GCDSorterProps) {
  return (
    <SorterTemplate
      title="LNKO Csoportosító"
      description="Rendezd a számpárokat és törteket a legnagyobb közös osztójuk alapján a megfelelő kategóriákba!"
      levels={SORTER_LEVELS}
      themeColor="indigo"
      onBack={onBack}
    />
  );
}
