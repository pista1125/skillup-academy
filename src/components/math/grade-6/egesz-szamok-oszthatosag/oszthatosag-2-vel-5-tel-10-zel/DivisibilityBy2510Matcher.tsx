import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface DivisibilityBy2510MatcherProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    pairs: [
      { id: 'dbm1-1', prompt: '456 utolsó száma (6)', value: 'Páros, osztható 2-vel' },
      { id: 'dbm1-2', prompt: '735 utolsó száma (5)', value: 'Osztható 5-tel, de nem 2-vel' },
      { id: 'dbm1-3', prompt: '820 utolsó száma (0)', value: 'Osztható 2-vel, 5-tel és 10-zel is' },
      { id: 'dbm1-4', prompt: '913 utolsó száma (3)', value: 'Páratlan, nem osztható 2, 5, 10-zel' },
      { id: 'dbm1-5', prompt: 'A 0 szám párossága', value: 'Páros szám (0 = 2 · 0)' },
      { id: 'dbm1-6', prompt: 'A legkisebb pozitív páros szám', value: '2' },
      { id: 'dbm1-7', prompt: 'A legkisebb kétjegyű 5-tel osztható szám', value: '10' },
      { id: 'dbm1-8', prompt: '5-tel osztva a legnagyobb lehetséges maradék', value: '4 (mert 0 ≤ r < 5)' },
    ]
  },
  2: {
    pairs: [
      { id: 'dbm2-1', prompt: '547 osztási maradéka 5-tel', value: '2 (mert 7 : 5 = 1, mar. 2)' },
      { id: 'dbm2-2', prompt: '896 osztási maradéka 10-zel', value: '6 (pontosan az utolsó jegy)' },
      { id: 'dbm2-3', prompt: '713 osztási maradéka 2-vel', value: '1 (minden páratlan szám esetén)' },
      { id: 'dbm2-4', prompt: '34□ osztható 2-vel és 5-tel is', value: '□ = 0 (kizárólag)' },
      { id: 'dbm2-5', prompt: '78□ osztható 5-tel, de páratlan', value: '□ = 5 (kizárólag)' },
      { id: 'dbm2-6', prompt: '92□ páros szám', value: '□ ∈ {0, 2, 4, 6, 8}' },
      { id: 'dbm2-7', prompt: 'A 100-nál kisebb legnagyobb páratlan szám', value: '99' },
      { id: 'dbm2-8', prompt: '10-zel osztva a lehetséges maradékok száma', value: '10 darab (0-tól 9-ig)' },
    ]
  },
  3: {
    pairs: [
      { id: 'dbm3-1', prompt: 'Két páratlan szám összege', value: 'Mindig PÁROS (pl. 3 + 5 = 8)' },
      { id: 'dbm3-2', prompt: 'Egy páros és egy páratlan szorzata', value: 'Mindig PÁROS (pl. 4 · 7 = 28)' },
      { id: 'dbm3-3', prompt: '5-re végződő szám négyzete (...5²)', value: 'Mindig 25-re végződik' },
      { id: 'dbm3-4', prompt: 'A legkisebb 3-jegyű, 10-zel osztható szám', value: '100' },
      { id: 'dbm3-5', prompt: 'A legnagyobb 3-jegyű, 5-tel de nem 10-zel osztható', value: '995' },
      { id: 'dbm3-6', prompt: '1479 + 3281 összege', value: '10-zel osztható (9+1=10, 0-ra végződik)' },
      { id: 'dbm3-7', prompt: '5 · Páratlan szám szorzatának utolsó jegye', value: 'Mindig 5 (pl. 5 · 7 = 35)' },
      { id: 'dbm3-8', prompt: '5 · Páros szám szorzatának utolsó jegye', value: 'Mindig 0 (pl. 5 · 6 = 30)' },
    ]
  }
};

export function DivisibilityBy2510Matcher({
  level,
  onNextLevel,
  onOpenRules
}: DivisibilityBy2510MatcherProps) {
  return (
    <MatcherTemplate
      level={level}
      title="Oszthatóság (2, 5, 10) párosító játék"
      subtitle="Kattints a kártyákra és párosítsd a számokat, szabályokat és maradékokat!"
      levels={MATCHER_LEVELS}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
}
