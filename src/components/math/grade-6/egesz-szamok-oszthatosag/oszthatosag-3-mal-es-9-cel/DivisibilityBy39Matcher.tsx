import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface DivisibilityBy39MatcherProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    pairs: [
      { id: 'db39m1-1', prompt: '123 számjegyösszege (6)', value: 'Osztható 3-mal, de 9-cel nem' },
      { id: 'db39m1-2', prompt: '459 számjegyösszege (18)', value: 'Osztható 3-mal ÉS 9-cel is' },
      { id: 'db39m1-3', prompt: '214 számjegyösszege (7)', value: 'Nem osztható sem 3-mal, sem 9-cel' },
      { id: 'db39m1-4', prompt: 'A 3-mal való oszthatóság feltétele', value: 'Számjegyösszeg 3 többszöröse' },
      { id: 'db39m1-5', prompt: 'A 9-cel való oszthatóság feltétele', value: 'Számjegyösszeg 9 többszöröse' },
      { id: 'db39m1-6', prompt: 'A legkisebb pozitív 9-cel osztható szám', value: '9' },
      { id: 'db39m1-7', prompt: 'A legkisebb kétjegyű 3-mal osztható szám', value: '12' },
      { id: 'db39m1-8', prompt: 'Minden 9-cel osztható szám', value: 'Automatikusan osztható 3-mal is' },
    ]
  },
  2: {
    pairs: [
      { id: 'db39m2-1', prompt: '532 szám 3-as osztási maradéka', value: '1 (mert 5+3+2=10, 10:3 mar. 1)' },
      { id: 'db39m2-2', prompt: '745 szám 9-es osztási maradéka', value: '7 (mert 7+4+5=16, 16:9 mar. 7)' },
      { id: 'db39m2-3', prompt: '4□2 osztható 3-mal (legkisebb □)', value: '□ = 0 (mert 4+0+2=6)' },
      { id: 'db39m2-4', prompt: '5□3 osztható 9-cel (pontos □)', value: '□ = 1 (mert 5+1+3=9)' },
      { id: 'db39m2-5', prompt: '71□ osztható 3-mal és 2-vel is', value: '□ = 4 (páros és 7+1+4=12)' },
      { id: 'db39m2-6', prompt: '999 999 számjegyösszege (54)', value: 'Osztható 9-cel és 3-mal is' },
      { id: 'db39m2-7', prompt: '3-mal osztva a lehetséges maradékok', value: '0, 1, 2 (3 darab)' },
      { id: 'db39m2-8', prompt: '9-cel osztva a maximális maradék', value: '8 (mert 0 ≤ r < 9)' },
    ]
  },
  3: {
    pairs: [
      { id: 'db39m3-1', prompt: '100 és 110 közötti 9-cel osztható szám', value: '108 (mert 1+0+8=9)' },
      { id: 'db39m3-2', prompt: 'A legnagyobb 3-jegyű 9-cel osztható szám', value: '999 (mert 9+9+9=27)' },
      { id: 'db39m3-3', prompt: 'Legkisebb 3-jegyű 3-mal osztható páratlan', value: '105 (mert 1+0+5=6)' },
      { id: 'db39m3-4', prompt: 'Ha N mod 9 = 4, akkor N mod 3 = ?', value: '1 (mert 4 : 3 = 1, mar. 1)' },
      { id: 'db39m3-5', prompt: 'Két 3-mal osztható szám összege', value: 'Mindig osztható 3-mal' },
      { id: 'db39m3-6', prompt: 'Egy 9-cel és egy nem 3-mal osztható összege', value: 'Soha nem osztható 3-mal' },
      { id: 'db39m3-7', prompt: 'A 243 (3⁵) oszthatósága', value: 'Osztható 3-mal és 9-cel is (összeg: 9)' },
      { id: 'db39m3-8', prompt: '1+2+3+...+9 számjegyek összege (45)', value: 'Osztható 9-cel és 3-mal is' },
    ]
  }
};

export function DivisibilityBy39Matcher({
  level,
  onNextLevel,
  onOpenRules
}: DivisibilityBy39MatcherProps) {
  return (
    <MatcherTemplate
      level={level}
      title="Oszthatóság (3, 9) párosító játék"
      subtitle="Kattints a kártyákra és párosítsd a számokat, számjegyösszegeket és szabályokat!"
      levels={MATCHER_LEVELS}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
}
