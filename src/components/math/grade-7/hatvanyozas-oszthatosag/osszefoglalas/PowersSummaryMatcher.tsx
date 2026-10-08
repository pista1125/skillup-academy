import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PowersSummaryMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Hatványazonosságok és Normálalak',
    subtitle: 'Párosítsd a hatványkifejezéseket a helyes egyszerűsített alakkal vagy szabállyal!',
    pairs: [
      {
        id: 'p1-1',
        prompt: 'aⁿ · aᵐ',
        value: 'aⁿ⁺ᵐ (kitevők összeadása)'
      },
      {
        id: 'p1-2',
        prompt: 'aⁿ : aᵐ',
        value: 'aⁿ⁻ᵐ (kitevők kivonása)'
      },
      {
        id: 'p1-3',
        prompt: '(aⁿ)ᵐ',
        value: 'aⁿ·ᵐ (kitevők szorzása)'
      },
      {
        id: 'p1-4',
        prompt: '(a · b)ⁿ',
        value: 'aⁿ · bⁿ (szorzat hatványozása)'
      },
      {
        id: 'p1-5',
        prompt: 'a⁰ (a ≠ 0)',
        value: '1 (nulladik hatvány)'
      },
      {
        id: 'p1-6',
        prompt: '(-2)⁴',
        value: '+16 (páros kitevő)'
      },
      {
        id: 'p1-7',
        prompt: '(-2)³',
        value: '-8 (páratlan kitevő)'
      },
      {
        id: 'p1-8',
        prompt: '450 000 normálalakja',
        value: '4,5 · 10⁵'
      }
    ]
  },
  2: {
    title: '2. Szint: Oszthatóság és Prímtényezők',
    subtitle: 'Párosítsd a számokat és szabályokat a megfelelő tulajdonsággal!',
    pairs: [
      {
        id: 'p2-1',
        prompt: 'Oszthatóság 3-mal',
        value: 'A számjegyek összege osztható 3-mal'
      },
      {
        id: 'p2-2',
        prompt: 'Oszthatóság 4-gyel',
        value: 'Az utolsó 2 számjegy osztható 4-gyel'
      },
      {
        id: 'p2-3',
        prompt: 'Oszthatóság 8-cal',
        value: 'Az utolsó 3 számjegy osztható 8-cal'
      },
      {
        id: 'p2-4',
        prompt: 'Oszthatóság 6-tal',
        value: 'Osztható 2-vel és 3-mal'
      },
      {
        id: 'p2-5',
        prompt: 'Oszthatóság 12-vel',
        value: 'Osztható 3-mal és 4-gyel'
      },
      {
        id: 'p2-6',
        prompt: 'Oszthatóság 15-tel',
        value: 'Osztható 3-mal és 5-tel'
      },
      {
        id: 'p2-7',
        prompt: 'd(n) képlete (n = p₁^a · p₂^b)',
        value: '(a + 1)(b + 1)'
      },
      {
        id: 'p2-8',
        prompt: 'Páratlan sok osztó',
        value: 'Négyzetszámok tulajdonsága'
      }
    ]
  },
  3: {
    title: '3. Szint: LNKO, LKKT és Játékok',
    subtitle: 'Párosítsd a számelméleti és stratégiai fogalmakat a helyes összefüggéssel!',
    pairs: [
      {
        id: 'p3-1',
        prompt: 'LNKO definíciója',
        value: 'Közös prímek a legkisebb kitevőn'
      },
      {
        id: 'p3-2',
        prompt: 'LKKT definíciója',
        value: 'Összes prím a legnagyobb kitevőn'
      },
      {
        id: 'p3-3',
        prompt: 'LNKO(a, b) · LKKT(a, b)',
        value: 'a · b (a két szám szorzata)'
      },
      {
        id: 'p3-4',
        prompt: 'LNKO(a, b) = 1',
        value: 'a és b relatív prímek'
      },
      {
        id: 'p3-5',
        prompt: '21-es játék ciklusmérete (1–3 lépés)',
        value: '4 (k + 1)'
      },
      {
        id: 'p3-6',
        prompt: 'Kiegészítő lépés (ellenfél: x)',
        value: 'k + 1 - x'
      },
      {
        id: 'p3-7',
        prompt: 'Szimmetrikus érmejáték kerek asztalon',
        value: 'Kezdő nyer a középpont elfoglalásával'
      },
      {
        id: 'p3-8',
        prompt: 'Paritási invariáns',
        value: 'Állapot párosságának megmaradása'
      }
    ]
  }
};

export const PowersSummaryMatcher: React.FC<PowersSummaryMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g7-powers-summary',
  topicTitle = '11. Összefoglalás'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <MatcherTemplate
      level={activeLevel}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="slate"
      badgeText="7. Osztály • Matematika IV. Témakör • Összefoglalás"
    />
  );
};

export default PowersSummaryMatcher;
