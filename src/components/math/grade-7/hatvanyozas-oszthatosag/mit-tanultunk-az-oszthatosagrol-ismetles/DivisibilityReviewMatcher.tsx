import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface DivisibilityReviewMatcherProps {
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
    title: '1. Szint: Utolsó Számjegyek és Alapvető Szabályok',
    subtitle: 'Párosítsd a számokat az oszthatósági tulajdonságukkal vagy indoklásukkal!',
    pairs: [
      {
        id: 'p1',
        prompt: '1 438',
        value: 'Osztható 2-vel (utolsó számjegye páros: 8)'
      },
      {
        id: 'p2',
        prompt: '3 765',
        value: 'Osztható 5-tel (utolsó számjegye 5)'
      },
      {
        id: 'p3',
        prompt: '9 240',
        value: 'Osztható 10-zel (utolsó számjegye 0)'
      },
      {
        id: 'p4',
        prompt: '4 524',
        value: 'Osztható 4-gyel (utolsó két jegye 24, ami : 4 = 6)'
      },
      {
        id: 'p5',
        prompt: '2 875',
        value: 'Osztható 25-tel (utolsó két jegye 75)'
      },
      {
        id: 'p6',
        prompt: '12 800',
        value: 'Osztható 100-zal (utolsó két jegye 00)'
      },
      {
        id: 'p7',
        prompt: '5 120',
        value: 'Osztható 8-cal (utolsó három jegye 120 : 8 = 15)'
      },
      {
        id: 'p8',
        prompt: '1-es szám',
        value: 'Minden egész számnak osztója (1 | b)'
      }
    ]
  },
  2: {
    title: '2. Szint: Számjegyösszeg és Összetett Osztók',
    subtitle: 'Párosítsd a számokat a számjegyösszegükkel és összetett oszthatósági szabályaikkal!',
    pairs: [
      {
        id: 'p9',
        prompt: '5 241',
        value: 'Osztható 3-mal (számjegyösszeg: 5+2+4+1 = 12)'
      },
      {
        id: 'p10',
        prompt: '8 532',
        value: 'Osztható 9-cel (számjegyösszeg: 8+5+3+2 = 18)'
      },
      {
        id: 'p11',
        prompt: '4 326',
        value: 'Osztható 6-tal (páros és jegyösszege 15 : 3)'
      },
      {
        id: 'p12',
        prompt: '7 512',
        value: 'Osztható 12-vel (jegyösszeg 15 : 3 és 12 : 4)'
      },
      {
        id: 'p13',
        prompt: '3 405',
        value: 'Osztható 15-tel (5-re végződik és jegyösszeg 12 : 3)'
      },
      {
        id: 'p14',
        prompt: '6 318',
        value: 'Osztható 18-cal (páros és jegyösszege 18 : 9)'
      },
      {
        id: 'p15',
        prompt: '12-vel való oszthatóság',
        value: '3-mal ÉS 4-gyel kell oszthatónak lennie (relatív prímek)'
      },
      {
        id: 'p16',
        prompt: '9-es osztási maradék',
        value: 'Megegyezik a számjegyek összegének 9-es maradékával'
      }
    ]
  },
  3: {
    title: '3. Szint: Hiányzó Számjegyek és Szorzatok Oszthatósága',
    subtitle: 'Keresd meg az ismeretlen számjegyeket vagy a szorzatok rejtett osztóit!',
    pairs: [
      {
        id: 'p17',
        prompt: '4 52x osztható 3-mal és páratlan',
        value: 'x = 1 vagy x = 7 (összeg: 11+1=12 vagy 11+7=18)'
      },
      {
        id: 'p18',
        prompt: '7 2x4 osztható 9-cel',
        value: 'x = 5 (összeg: 7+2+5+4 = 18 : 9)'
      },
      {
        id: 'p19',
        prompt: '3x2 osztható 4-gyel',
        value: 'x = 1, 3, 5, 7 vagy 9 (12, 32, 52, 72, 92 osztható 4-gyel)'
      },
      {
        id: 'p20',
        prompt: '14 · 15 · 33 szorzat',
        value: 'Biztosan osztható 10-zel (tartalmaz 2-t és 5-öt: 2·7 és 3·5)'
      },
      {
        id: 'p21',
        prompt: '3 ∤ a és 3 ∤ b esetén',
        value: 'a + b lehet osztható 3-mal (pl. 4 + 5 = 9)'
      },
      {
        id: 'p22',
        prompt: 'Három egymást követő szám összege',
        value: 'Mindig osztható 3-mal ((n-1)+n+(n+1) = 3n)'
      },
      {
        id: 'p23',
        prompt: 'Két egymást követő szám szorzata',
        value: 'Mindig páros (n · (n+1) mindig osztható 2-vel)'
      },
      {
        id: 'p24',
        prompt: '36-tal való oszthatóság',
        value: '4-gyel ÉS 9-cel kell oszthatónak lennie (lnko(4, 9) = 1)'
      }
    ]
  }
};

export const DivisibilityReviewMatcher: React.FC<DivisibilityReviewMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g7-powers-divisibility-review',
  topicTitle = '3. Mit tanultunk az oszthatóságról? (Ismétlés)'
}) => {
  const effectiveLevel = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <MatcherTemplate
      level={effectiveLevel}
      currentLevel={effectiveLevel}
      grade={7}
      chapterId="g7-powers-divisibility"
      topicId={topicId}
      topicTitle={topicTitle}
      title="Oszthatósági Szabályok – Kártyás Párosító"
      subtitle="Kattints a kártyákra, és párosítsd a számokat és állításokat a megfelelő oszthatósági indoklással!"
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};

export default DivisibilityReviewMatcher;
