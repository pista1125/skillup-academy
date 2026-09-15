import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export const MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    pairs: [
      { id: 'm1-1', left: '8 fok fagy ❄️', right: '-8 °C' },
      { id: 'm1-2', left: '1500 Ft tartozás 💸', right: '-1 500 Ft' },
      { id: 'm1-3', left: '25 méterrel a tengerszint alatt 🌊', right: '-25 m' },
      { id: 'm1-4', left: '3. emelet a liftben 🏢', right: '+3. emelet' },
      { id: 'm1-5', left: '2. mélygarázs szint 🚗', right: '-2. szint' },
      { id: 'm1-6', left: 'A víz fagyáspontja 🧊', right: '0 °C' },
      { id: 'm1-7', left: '5000 Ft zsebpénz 💰', right: '+5 000 Ft' },
      { id: 'm1-8', left: '18 fok kellemes meleg ☀️', right: '+18 °C' }
    ]
  },
  2: {
    pairs: [
      { id: 'm2-1', left: 'Nullától 4 egységgel balra', right: '-4' },
      { id: 'm2-2', left: 'A -7 ellentettje', right: '+7' },
      { id: 'm2-3', left: '-10 és -3 közül a nagyobb', right: '-3' },
      { id: 'm2-4', left: '0-nál 6-tal kisebb szám', right: '-6' },
      { id: 'm2-5', left: '-15 és +5 közötti távolság', right: '20 egység' },
      { id: 'm2-6', left: 'A -1 közvetlen bal szomszédja', right: '-2' },
      { id: 'm2-7', left: 'A -5 közvetlen jobb szomszédja', right: '-4' },
      { id: 'm2-8', left: 'A legnagyobb negatív egész szám', right: '-1' }
    ]
  },
  3: {
    pairs: [
      { id: 'm3-1', left: '-3 °C-ról melegszik 5 °C-ot', right: '+2 °C' },
      { id: 'm3-2', left: '+4. emeletről lemegy 6 szintet', right: '-2. szint' },
      { id: 'm3-3', left: '-500 Ft tartozásra befizet 2000 Ft-ot', right: '+1 500 Ft' },
      { id: 'm3-4', left: '-12-nél 8-cal nagyobb szám', right: '-4' },
      { id: 'm3-5', left: '-20-nál 5-tel kisebb szám', right: '-25' },
      { id: 'm3-6', left: 'Tengerszint -15 m-ről felmászik 30 m-t', right: '+15 m' },
      { id: 'm3-7', left: '-10 és +10 összege', right: '0' },
      { id: 'm3-8', left: '-100-nál 50-nel nagyobb szám', right: '-50' }
    ]
  }
};

export interface NegativeNumbersMatcherProps {
  onBack: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
}

export function NegativeNumbersMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level = 1
}: NegativeNumbersMatcherProps) {
  return (
    <MatcherTemplate
      title="Negatív számok - Párosító Játék"
      badge="❄️ 5. Osztály • I. Az egész számok"
      level={level}
      levels={MATCHER_LEVELS}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
}

export default NegativeNumbersMatcher;
