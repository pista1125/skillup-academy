import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';

interface DivisibilityCompositeSorterProps {
  onBack: () => void;
}

const SORTER_LEVELS: SorterLevelConfig[] = [
  {
    difficulty: 'easy',
    title: 'Könnyű szint: Oszthatóság 6-tal és 15-tel',
    instruction: 'Csoportosítsd a számokat aszerint, hogy 6-tal, 15-tel, vagy mindkettővel (30-cal) oszthatók!',
    categories: [
      { id: 'only6', name: 'Csak 6-tal osztható', color: 'blue' },
      { id: 'only15', name: 'Csak 15-tel osztható', color: 'amber' },
      { id: 'both', name: 'Mindkettővel (30-cal)', color: 'emerald' },
    ],
    items: [
      { id: 'e1', text: '12', correctCategory: 'only6' },
      { id: 'e2', text: '18', correctCategory: 'only6' },
      { id: 'e3', text: '24', correctCategory: 'only6' },
      { id: 'e4', text: '45', correctCategory: 'only15' },
      { id: 'e5', text: '75', correctCategory: 'only15' },
      { id: 'e6', text: '105', correctCategory: 'only15' },
      { id: 'e7', text: '30', correctCategory: 'both' },
      { id: 'e8', text: '60', correctCategory: 'both' },
      { id: 'e9', text: '90', correctCategory: 'both' },
      { id: 'e10', text: '150', correctCategory: 'both' },
    ],
  },
  {
    difficulty: 'medium',
    title: 'Közepes szint: Oszthatóság 12-vel és 18-cal',
    instruction: 'Csoportosítsd a számokat aszerint, hogy 12-vel, 18-cal, vagy mindkettővel (36-tal) oszthatók!',
    categories: [
      { id: 'only12', name: 'Csak 12-vel osztható', color: 'indigo' },
      { id: 'only18', name: 'Csak 18-cal osztható', color: 'purple' },
      { id: 'both36', name: 'Mindkettővel (36-tal)', color: 'emerald' },
    ],
    items: [
      { id: 'm1', text: '24', correctCategory: 'only12' },
      { id: 'm2', text: '48', correctCategory: 'only12' },
      { id: 'm3', text: '60', correctCategory: 'only12' },
      { id: 'm4', text: '84', correctCategory: 'only12' },
      { id: 'm5', text: '18', correctCategory: 'only18' },
      { id: 'm6', text: '54', correctCategory: 'only18' },
      { id: 'm7', text: '90', correctCategory: 'only18' },
      { id: 'm8', text: '36', correctCategory: 'both36' },
      { id: 'm9', text: '72', correctCategory: 'both36' },
      { id: 'm10', text: '144', correctCategory: 'both36' },
    ],
  },
  {
    difficulty: 'hard',
    title: 'Gondolkodtató szint: Oszthatóság 20-szal, 45-tel és egyéb',
    instruction: 'Csoportosítsd a 3-4 jegyű számokat oszthatóságuk alapján!',
    categories: [
      { id: 'div20', name: 'Osztható 20-szal', color: 'cyan' },
      { id: 'div45', name: 'Osztható 45-tel', color: 'amber' },
      { id: 'neither', name: 'Egyikkel sem (vagy más)', color: 'rose' },
    ],
    items: [
      { id: 'h1', text: '320', correctCategory: 'div20' },
      { id: 'h2', text: '1540', correctCategory: 'div20' },
      { id: 'h3', text: '2860', correctCategory: 'div20' },
      { id: 'h4', text: '225', correctCategory: 'div45' },
      { id: 'h5', text: '5670', correctCategory: 'div45' },
      { id: 'h6', text: '1485', correctCategory: 'div45' },
      { id: 'h7', text: '350', correctCategory: 'neither' },
      { id: 'h8', text: '425', correctCategory: 'neither' },
      { id: 'h9', text: '1218', correctCategory: 'neither' },
      { id: 'h10', text: '900', correctCategory: 'div45' },
    ],
  },
];

export function DivisibilityCompositeSorter({ onBack }: DivisibilityCompositeSorterProps) {
  return (
    <SorterTemplate
      title="Összetett Oszthatóság Csoportosító"
      description="Rendezd a számokat a megfelelő összetett oszthatósági kategóriákba!"
      levels={SORTER_LEVELS}
      themeColor="indigo"
      onBack={onBack}
    />
  );
}
