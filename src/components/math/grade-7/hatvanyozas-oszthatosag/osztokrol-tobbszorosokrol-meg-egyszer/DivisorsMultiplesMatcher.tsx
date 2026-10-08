import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface DivisorsMultiplesMatcherProps {
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
    title: '1. Szint: Számok és Pozitív Osztóik Száma',
    subtitle: 'Párosítsd a számokat az összes pozitív osztójuk pontos darabszámával!',
    pairs: [
      {
        id: 'p1-1',
        prompt: '6 osztóinak száma',
        value: '4 darab (1, 2, 3, 6)'
      },
      {
        id: 'p1-2',
        prompt: '8 osztóinak száma',
        value: '4 darab (1, 2, 4, 8)'
      },
      {
        id: 'p1-3',
        prompt: '9 osztóinak száma',
        value: '3 darab (1, 3, 9 — négyzetszám)'
      },
      {
        id: 'p1-4',
        prompt: '12 osztóinak száma',
        value: '6 darab (1, 2, 3, 4, 6, 12)'
      },
      {
        id: 'p1-5',
        prompt: '16 osztóinak száma',
        value: '5 darab (1, 2, 4, 8, 16 — négyzetszám)'
      },
      {
        id: 'p1-6',
        prompt: '20 osztóinak száma',
        value: '6 darab (1, 2, 4, 5, 10, 20)'
      },
      {
        id: 'p1-7',
        prompt: '25 osztóinak száma',
        value: '3 darab (1, 5, 25 — négyzetszám)'
      },
      {
        id: 'p1-8',
        prompt: '36 osztóinak száma',
        value: '9 darab (négyzetszám: 3² · 2²)'
      }
    ]
  },
  2: {
    title: '2. Szint: A d(n) Képlet Alkalmazása',
    subtitle: 'Párosítsd a kanonikus alakokat a kitevőkből kiszámított osztószámmal!',
    pairs: [
      {
        id: 'p2-1',
        prompt: '2³ · 3¹ osztóinak száma',
        value: '(3+1) · (1+1) = 8 darab'
      },
      {
        id: 'p2-2',
        prompt: '2² · 5² osztóinak száma',
        value: '(2+1) · (2+1) = 9 darab'
      },
      {
        id: 'p2-3',
        prompt: '2⁴ · 3¹ osztóinak száma',
        value: '(4+1) · (1+1) = 10 darab'
      },
      {
        id: 'p2-4',
        prompt: '2² · 3¹ · 5¹ osztóinak száma',
        value: '(2+1) · (1+1) · (1+1) = 12 darab'
      },
      {
        id: 'p2-5',
        prompt: '2³ · 3² osztóinak száma',
        value: '(3+1) · (2+1) = 12 darab'
      },
      {
        id: 'p2-6',
        prompt: '2⁴ · 3² osztóinak száma',
        value: '(4+1) · (2+1) = 15 darab'
      },
      {
        id: 'p2-7',
        prompt: '2² · 3² · 5¹ osztóinak száma',
        value: '(2+1) · (2+1) · (1+1) = 18 darab'
      },
      {
        id: 'p2-8',
        prompt: '2³ · 3² · 5¹ osztóinak száma',
        value: '(3+1) · (2+1) · (1+1) = 24 darab'
      }
    ]
  },
  3: {
    title: '3. Szint: Keresési Határ és Különleges Tulajdonságok',
    subtitle: 'Párosítsd a számokat a keresési határukkal és osztópár-tulajdonságaikkal!',
    pairs: [
      {
        id: 'p3-1',
        prompt: '60 legnagyobb valódi osztója',
        value: '30 (mert 2 · 30 = 60)'
      },
      {
        id: 'p3-2',
        prompt: '60 legkisebb 1-nél nagyobb osztója',
        value: '2 (a legkisebb prímosztó)'
      },
      {
        id: 'p3-3',
        prompt: '36 középső magányos osztópárja',
        value: '6 · 6 = 36 (önmaga párja)'
      },
      {
        id: 'p3-4',
        prompt: '100 középső magányos osztópárja',
        value: '10 · 10 = 100 (önmaga párja)'
      },
      {
        id: 'p3-5',
        prompt: 'Keresési határ 48 esetén',
        value: 'Elég 6-ig vizsgálni (7² = 49 > 48)'
      },
      {
        id: 'p3-6',
        prompt: 'Keresési határ 80 esetén',
        value: 'Elég 8-ig vizsgálni (9² = 81 > 80)'
      },
      {
        id: 'p3-7',
        prompt: '49 osztóinak tulajdonsága',
        value: 'Pontosan 3 osztója van (1, 7, 49)'
      },
      {
        id: 'p3-8',
        prompt: '1000 osztóinak száma',
        value: '16 darab (2³ · 5³ ⟹ 4 · 4 = 16)'
      }
    ]
  }
};

export const DivisorsMultiplesMatcher: React.FC<DivisorsMultiplesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g7-powers-divisors-multiples',
  topicTitle = '7. Osztókról, többszörösökről még egyszer'
}) => {
  const effectiveLevel = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <MatcherTemplate
      level={effectiveLevel}
      currentLevel={effectiveLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      levels={matcherLevels}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="cyan"
    />
  );
};

export default DivisorsMultiplesMatcher;
