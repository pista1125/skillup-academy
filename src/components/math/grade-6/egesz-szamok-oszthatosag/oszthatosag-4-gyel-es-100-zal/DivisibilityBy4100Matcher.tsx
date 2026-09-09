import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface DivisibilityBy4100MatcherProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    pairs: [
      { id: 'db4100m1-1', prompt: '524 utolsó két jegye (24)', value: 'Osztható 4-gyel, de nem 100-zal' },
      { id: 'db4100m1-2', prompt: '800 utolsó két jegye (00)', value: 'Osztható 4-gyel ÉS 100-zal is' },
      { id: 'db4100m1-3', prompt: '718 utolsó két jegye (18)', value: 'Nem osztható sem 4-gyel, sem 100-zal' },
      { id: 'db4100m1-4', prompt: 'A 4-gyel való oszthatóság szabálya', value: 'Utolsó 2 számjegy 4 többszöröse vagy 00' },
      { id: 'db4100m1-5', prompt: 'A 100-zal való oszthatóság szabálya', value: 'Utolsó 2 számjegy kizárólag 00' },
      { id: 'db4100m1-6', prompt: 'A legkisebb kétjegyű 4-gyel osztható szám', value: '12 (3 · 4)' },
      { id: 'db4100m1-7', prompt: 'A legkisebb 3-jegyű 100-zal osztható szám', value: '100' },
      { id: 'db4100m1-8', prompt: 'Minden 100-zal osztható szám', value: 'Automatikusan osztható 4-gyel is' },
    ]
  },
  2: {
    pairs: [
      { id: 'db4100m2-1', prompt: '835 szám 4-es osztási maradéka', value: '3 (mert 35 : 4 = 8, mar. 3)' },
      { id: 'db4100m2-2', prompt: '9478 szám 100-as osztási maradéka', value: '78 (az utolsó két számjegy)' },
      { id: 'db4100m2-3', prompt: '71□ osztható 4-gyel (páratlan tízes)', value: '□ ∈ {2, 6} (12 vagy 16)' },
      { id: 'db4100m2-4', prompt: '82□ osztható 4-gyel (páros tízes)', value: '□ ∈ {0, 4, 8} (20, 24 vagy 28)' },
      { id: 'db4100m2-5', prompt: '9814 szám 4-es osztási maradéka', value: '2 (mert 14 : 4 = 3, mar. 2)' },
      { id: 'db4100m2-6', prompt: '5000 osztási tulajdonsága', value: 'Osztható 4-gyel, 10-zel és 100-zal is' },
      { id: 'db4100m2-7', prompt: '4-gyel osztva a lehetséges maradékok', value: '0, 1, 2, 3 (4 darab)' },
      { id: 'db4100m2-8', prompt: '4-gyel osztva a maximális maradék', value: '3 (mert 0 ≤ r < 4)' },
    ]
  },
  3: {
    pairs: [
      { id: 'db4100m3-1', prompt: 'A legnagyobb 3-jegyű 4-gyel osztható szám', value: '996 (mert 96 : 4 = 24)' },
      { id: 'db4100m3-2', prompt: 'A legnagyobb 3-jegyű 100-zal osztható szám', value: '900' },
      { id: 'db4100m3-3', prompt: 'Legkisebb 4-jegyű 4-gyel és 100-zal osztható', value: '1000' },
      { id: 'db4100m3-4', prompt: 'Ha N mod 100 = 36, akkor N mod 4 = ?', value: '0 (mert 36 : 4 = 9, mar. 0)' },
      { id: 'db4100m3-5', prompt: 'Ha N mod 100 = 75, akkor N mod 4 = ?', value: '3 (mert 75 : 4 = 18, mar. 3)' },
      { id: 'db4100m3-6', prompt: 'Két 4-gyel osztható szám összege', value: 'Mindig osztható 4-gyel (4k + 4m)' },
      { id: 'db4100m3-7', prompt: 'Bármely páros szám négyzete [(2k)²]', value: 'Mindig osztható 4-gyel (4k²)' },
      { id: 'db4100m3-8', prompt: '100 = 4 · 25 összefüggés', value: 'Ami 100-zal osztható, az 4-gyel és 25-tel is' },
    ]
  }
};

export function DivisibilityBy4100Matcher({
  level,
  onNextLevel,
  onOpenRules
}: DivisibilityBy4100MatcherProps) {
  return (
    <MatcherTemplate
      level={level}
      title="Oszthatóság (4, 100) párosító játék"
      subtitle="Kattints a kártyákra és párosítsd a számokat, utolsó két jegyeket és szabályokat!"
      levels={MATCHER_LEVELS}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
}
