import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface DivisibilityRulesMatcherProps {
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
    title: '1. Szint: Összetett Osztók és Relatív Prím Tényezőik',
    subtitle: 'Párosítsd az összetett számokat a helyes relatív prím felbontásukkal!',
    pairs: [
      {
        id: 'p1-1',
        prompt: '6-tal való oszthatóság',
        value: '2 és 3 szorzata (LNKO = 1)'
      },
      {
        id: 'p1-2',
        prompt: '12-vel való oszthatóság',
        value: '3 és 4 szorzata (LNKO = 1)'
      },
      {
        id: 'p1-3',
        prompt: '15-tel való oszthatóság',
        value: '3 és 5 szorzata (LNKO = 1)'
      },
      {
        id: 'p1-4',
        prompt: '18-cal való oszthatóság',
        value: '2 és 9 szorzata (LNKO = 1)'
      },
      {
        id: 'p1-5',
        prompt: '20-szal való oszthatóság',
        value: '4 és 5 szorzata (LNKO = 1)'
      },
      {
        id: 'p1-6',
        prompt: '24-gyel való oszthatóság',
        value: '3 és 8 szorzata (LNKO = 1)'
      },
      {
        id: 'p1-7',
        prompt: '36-tal való oszthatóság',
        value: '4 és 9 szorzata (LNKO = 1)'
      },
      {
        id: 'p1-8',
        prompt: '45-tel való oszthatóság',
        value: '5 és 9 szorzata (LNKO = 1)'
      }
    ]
  },
  2: {
    title: '2. Szint: Szabályok Szöveges Megfogalmazása',
    subtitle: 'Keresd meg az összetett osztóhoz tartozó pontos összevont szabályt!',
    pairs: [
      {
        id: 'p2-1',
        prompt: 'Osztható 6-tal',
        value: 'Páros ÉS számjegyösszege osztható 3-mal'
      },
      {
        id: 'p2-2',
        prompt: 'Osztható 12-vel',
        value: 'Utolsó 2 jegy osztható 4-gyel ÉS számjegyösszeg osztható 3-mal'
      },
      {
        id: 'p2-3',
        prompt: 'Osztható 15-tel',
        value: '0-ra vagy 5-re végződik ÉS számjegyösszeg osztható 3-mal'
      },
      {
        id: 'p2-4',
        prompt: 'Osztható 18-cal',
        value: 'Páros ÉS számjegyösszege osztható 9-cel'
      },
      {
        id: 'p2-5',
        prompt: 'Osztható 24-gyel',
        value: 'Utolsó 3 jegy osztható 8-cal ÉS számjegyösszeg osztható 3-mal'
      },
      {
        id: 'p2-6',
        prompt: 'Osztható 36-tal',
        value: 'Utolsó 2 jegy osztható 4-gyel ÉS számjegyösszeg osztható 9-cel'
      },
      {
        id: 'p2-7',
        prompt: 'Osztható 45-tel',
        value: '0-ra vagy 5-re végződik ÉS számjegyösszeg osztható 9-cel'
      },
      {
        id: 'p2-8',
        prompt: 'Osztható 72-vel',
        value: 'Utolsó 3 jegy osztható 8-cal ÉS számjegyösszeg osztható 9-cel'
      }
    ]
  },
  3: {
    title: '3. Szint: Számok és Oszthatósági Tulajdonságaik',
    subtitle: 'Párosítsd a vizsgált számokat az indoklással alátámasztott oszthatóságukkal!',
    pairs: [
      {
        id: 'p3-1',
        prompt: '132 oszthatósága',
        value: 'Osztható 12-vel (32:4=8 és összeg: 6)'
      },
      {
        id: 'p3-2',
        prompt: '225 oszthatósága',
        value: 'Osztható 15-tel és 45-tel (5-re végződik és összeg: 9)'
      },
      {
        id: 'p3-3',
        prompt: '342 oszthatósága',
        value: 'Osztható 18-cal (páros és számjegyösszeg: 9)'
      },
      {
        id: 'p3-4',
        prompt: '360 oszthatósága',
        value: 'Osztható 24-gyel és 36-tal (360:24=15, 360:36=10)'
      },
      {
        id: 'p3-5',
        prompt: '504 oszthatósága',
        value: 'Osztható 36-tal és 72-vel (504:72=7, összeg: 9)'
      },
      {
        id: 'p3-6',
        prompt: '735 oszthatósága',
        value: 'Osztható 15-tel, de 45-tel nem (összeg: 15)'
      },
      {
        id: 'p3-7',
        prompt: '948 oszthatósága',
        value: 'Osztható 12-vel, de 36-tal nem (összeg: 21)'
      },
      {
        id: 'p3-8',
        prompt: '1 224 oszthatósága',
        value: 'Osztható 24-gyel és 36-tal (224:8=28, összeg: 9)'
      }
    ]
  }
};

export const DivisibilityRulesMatcher: React.FC<DivisibilityRulesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g7-powers-custom-rules',
  topicTitle = '6. Készítsünk magunknak oszthatósági szabályokat!'
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
      themeColor="teal"
    />
  );
};

export default DivisibilityRulesMatcher;
