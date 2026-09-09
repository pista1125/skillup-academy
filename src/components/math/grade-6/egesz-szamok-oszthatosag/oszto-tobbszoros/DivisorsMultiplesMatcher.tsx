import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface DivisorsMultiplesMatcherProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    pairs: [
      { id: 'dmm1-1', prompt: 'A 12 összes pozitív osztója', value: '1, 2, 3, 4, 6, 12 (6 db)' },
      { id: 'dmm1-2', prompt: 'A 15 összes pozitív osztója', value: '1, 3, 5, 15 (4 db)' },
      { id: 'dmm1-3', prompt: 'A 7 első 4 pozitív többszöröse', value: '7, 14, 21, 28' },
      { id: 'dmm1-4', prompt: 'A 9 első 4 pozitív többszöröse', value: '9, 18, 27, 36' },
      { id: 'dmm1-5', prompt: 'A 20 legkisebb és legnagyobb osztója', value: '1 és 20' },
      { id: 'dmm1-6', prompt: 'Pontosan 1 darab osztója van', value: 'Az 1' },
      { id: 'dmm1-7', prompt: 'A 10 legkisebb kétjegyű többszöröse', value: '10' },
      { id: 'dmm1-8', prompt: 'A 6 és 8 legkisebb közös többszöröse', value: '24' },
    ]
  },
  2: {
    pairs: [
      { id: 'dmm2-1', prompt: 'A 24 összes osztójának száma', value: '8 darab osztó' },
      { id: 'dmm2-2', prompt: 'A 36 összes osztójának száma', value: '9 darab osztó' },
      { id: 'dmm2-3', prompt: 'A 48 legnagyobb valódi osztója', value: '24' },
      { id: 'dmm2-4', prompt: 'A 12 és 18 közös osztói', value: '1, 2, 3, 6' },
      { id: 'dmm2-5', prompt: 'A 15 és 20 legkisebb közös többszöröse', value: '60' },
      { id: 'dmm2-6', prompt: 'A 13 összes pozitív osztója', value: '1 és 13 (prímszám)' },
      { id: 'dmm2-7', prompt: 'A 25 osztói (négyzetszám)', value: '1, 5, 25 (3 db)' },
      { id: 'dmm2-8', prompt: 'A 60 legkisebb 50-nél nagyobb többszöröse', value: '60' },
    ]
  },
  3: {
    pairs: [
      { id: 'dmm3-1', prompt: 'A 60 összes osztójának száma', value: '12 darab osztó' },
      { id: 'dmm3-2', prompt: 'A 100 összes osztójának száma', value: '9 darab osztó' },
      { id: 'dmm3-3', prompt: 'Páratlan számú osztójuk van', value: 'Négyzetszámok' },
      { id: 'dmm3-4', prompt: 'A 24 és 36 legnagyobb közös osztója', value: '12' },
      { id: 'dmm3-5', prompt: 'A 8 és 12 legkisebb közös többszöröse', value: '24' },
      { id: 'dmm3-6', prompt: 'A 72 legkisebb 3-jegyű többszöröse', value: '144' },
      { id: 'dmm3-7', prompt: 'A 40 és 60 legnagyobb közös osztója', value: '20' },
      { id: 'dmm3-8', prompt: 'A 30 összes prím osztója', value: '2, 3, 5' },
    ]
  }
};

export function DivisorsMultiplesMatcher({
  level,
  onNextLevel,
  onOpenRules
}: DivisorsMultiplesMatcherProps) {
  return (
    <MatcherTemplate
      level={level}
      title="Osztó, többszörös párosító játék"
      subtitle="Kattints a kártyákra és párosítsd a számokat az osztóikkal, illetve többszöröseikkel!"
      levels={MATCHER_LEVELS}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
}
