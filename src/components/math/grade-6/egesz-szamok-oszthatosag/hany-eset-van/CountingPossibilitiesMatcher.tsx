import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface CountingPossibilitiesMatcherProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    pairs: [
      { id: 'cm1-1', prompt: '2 érme feldobásának összes esete', value: '4 eset (2 · 2)' },
      { id: 'cm1-2', prompt: '3 érme feldobásának összes esete', value: '8 eset (2 · 2 · 2)' },
      { id: 'cm1-3', prompt: '3 könyv sorrendje a polcon', value: '6 sorrend (3 · 2 · 1)' },
      { id: 'cm1-4', prompt: '4 póló és 2 nadrág kombinációja', value: '8 szett (4 · 2)' },
      { id: 'cm1-5', prompt: '2 dobókocka összes kimenetele', value: '36 eset (6 · 6)' },
      { id: 'cm1-6', prompt: 'Kétjegyű számok 4 és 7-ből (különböző)', value: '2 szám (47, 74)' },
      { id: 'cm1-7', prompt: '3 féle gombóc és 2 féle tölcsér', value: '6 kombináció (3 · 2)' },
      { id: 'cm1-8', prompt: '3 versenyző dobogós sorrendje', value: '6 sorrend (3!)' },
    ]
  },
  2: {
    pairs: [
      { id: 'cm2-1', prompt: '4 gyerek sorrendje 4 széken', value: '24 sorrend (4!)' },
      { id: 'cm2-2', prompt: '3-jegyű számok 1, 2, 3-ból (nem ismétlődő)', value: '6 szám (3!)' },
      { id: 'cm2-3', prompt: '3-jegyű számok 1, 2, 3-ból (ismétlődhet)', value: '27 szám (3³)' },
      { id: 'cm2-4', prompt: '3 nadrág, 4 ing és 2 pár cipő', value: '24 szett (3 · 4 · 2)' },
      { id: 'cm2-5', prompt: '4 érmedobás összes kimenetele', value: '16 eset (2⁴)' },
      { id: 'cm2-6', prompt: '3-jegyű számok 0, 5, 9-ből (különböző)', value: '4 szám (2 · 2 · 1)' },
      { id: 'cm2-7', prompt: '2 kocka összege pontosan 7', value: '6 kedvező eset' },
      { id: 'cm2-8', prompt: '5 futóból az 1. és 2. helyezett', value: '20 lehetőség (5 · 4)' },
    ]
  },
  3: {
    pairs: [
      { id: 'cm3-1', prompt: '5 ember sorbaállása (5!)', value: '120 sorrend' },
      { id: 'cm3-2', prompt: '4-jegyű PIN kódok (0-9, ismétléssel)', value: '10 000 kód (10⁴)' },
      { id: 'cm3-3', prompt: '4-jegyű számok 0, 1, 2, 3-ból (különböző)', value: '18 szám (3 · 3 · 2 · 1)' },
      { id: 'cm3-4', prompt: '3 dobókocka összes kimenetele', value: '216 eset (6³)' },
      { id: 'cm3-5', prompt: '6 emberből elnök és titkár', value: '30 lehetőség (6 · 5)' },
      { id: 'cm3-6', prompt: '3-jegyű páros számok 1, 2, 3, 4-ből (különböző)', value: '12 szám (3 · 2 · 2)' },
      { id: 'cm3-7', prompt: '5 érme feldobásának összes kimenetele', value: '32 eset (2⁵)' },
      { id: 'cm3-8', prompt: '4 ember kézfogásai (mindenki mindenkivel)', value: '6 kézfogás' },
    ]
  }
};

export function CountingPossibilitiesMatcher({
  level,
  onNextLevel,
  onOpenRules
}: CountingPossibilitiesMatcherProps) {
  return (
    <MatcherTemplate
      level={level}
      title="Hány eset van? Párosító játék"
      subtitle="Kattints a kártyákra és párosítsd a kombinatorikai feladatot az összes eset számával!"
      levels={MATCHER_LEVELS}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
}
