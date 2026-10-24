import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CountingContMatcherProps {
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
    title: '1. Szint: Alapvető Permutációk és Faktoriálisok',
    subtitle: 'Párosítsd az alapvető kombinatorikai feladatokat és képleteket a pontos értékükkel!',
    pairs: [
      {
        id: 'cm1-1',
        prompt: '4! értéke (4 különböző elem sorbarendezése)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="6" width="46" height="16" rx="3" fill="#9333ea" />
            <text x="27" y="18" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">4!</text>
          </svg>
        ),
        value: '4 · 3 · 2 · 1 = 24 lehetőség'
      },
      {
        id: 'cm1-2',
        prompt: '5! értéke (5 könyv a polcon)',
        value: '5 · 4 · 3 · 2 · 1 = 120 sorrend'
      },
      {
        id: 'cm1-3',
        prompt: '0! értéke definíció szerint',
        value: '0! = 1 (üres halmaz sorbarendezése)'
      },
      {
        id: 'cm1-4',
        prompt: 'n különböző elem sorbarendezésének száma (Permutáció)',
        value: 'P_n = n! = n · (n-1) · ... · 1'
      },
      {
        id: 'cm1-5',
        prompt: '3 futó célba érési sorrendjeinek száma',
        value: '3! = 3 · 2 · 1 = 6 sorrend'
      },
      {
        id: 'cm1-6',
        prompt: 'n személy leültetése körasztal köré (Ciklikus permutáció)',
        value: '(n - 1)! (elforgatási szimmetria)'
      },
      {
        id: 'cm1-7',
        prompt: '4 ember leülése egy kerek asztalhoz',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="27" cy="14" r="10" fill="#e9d5ff" stroke="#9333ea" strokeWidth="1.5" />
            <circle cx="27" cy="4" r="2" fill="#7e22ce" />
            <circle cx="27" cy="24" r="2" fill="#7e22ce" />
            <circle cx="17" cy="14" r="2" fill="#7e22ce" />
            <circle cx="37" cy="14" r="2" fill="#7e22ce" />
          </svg>
        ),
        value: '(4 - 1)! = 3! = 6 különböző ülésrend'
      },
      {
        id: 'cm1-8',
        prompt: 'Kézfogások száma n ember között',
        value: 'n · (n - 1) / 2 (mindenki mindenkivel)'
      }
    ]
  },
  2: {
    title: '2. Szint: Ültetési Rendek és Sorrendi Kiválasztás',
    subtitle: 'Párosítsd a padban és körasztalnál érvényes feladatokat a helyes levezetéssel!',
    pairs: [
      {
        id: 'cm2-1',
        prompt: '5 fős futóverseny dobogósai (arany, ezüst, bronz)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="10" width="10" height="12" fill="#e2e8f0" />
            <rect x="22" y="6" width="10" height="16" fill="#f59e0b" />
            <rect x="36" y="14" width="10" height="8" fill="#b45309" />
          </svg>
        ),
        value: '5 · 4 · 3 = 60 különböző dobogó'
      },
      {
        id: 'cm2-2',
        prompt: '6 diák leülése egy 6 személyes padsorba',
        value: '6! = 720 ülésrend'
      },
      {
        id: 'cm2-3',
        prompt: '6 diák leülése egy 6 személyes körasztalhoz',
        value: '(6 - 1)! = 5! = 120 ülésrend'
      },
      {
        id: 'cm2-4',
        prompt: '5 fős társaság kézfogásai (minden pár kezet fog)',
        value: '(5 · 4) / 2 = 10 kézfogás'
      },
      {
        id: 'cm2-5',
        prompt: '8 fős csoportból elnök és titkár választása',
        value: '8 · 7 = 56 féle tisztségviselő-pár'
      },
      {
        id: 'cm2-6',
        prompt: '5 barát padban, 2 adott barát egymás mellett ül',
        value: '4! · 2! = 24 · 2 = 48 lehetőség (blokk-elv)'
      },
      {
        id: 'cm2-7',
        prompt: '5 barát padban, 2 adott barát NEM ül egymás mellett',
        value: '120 - 48 = 72 lehetőség (komplementer)'
      },
      {
        id: 'cm2-8',
        prompt: '5 csúcsú teljes gráf éleinek száma',
        value: '(5 · 4) / 2 = 10 él'
      }
    ]
  },
  3: {
    title: '3. Szint: Összetett Megkötések és Speciális Esetek',
    subtitle: 'Párosítsd a haladó kombinatorikai feladatokat a precíz eredménnyel!',
    pairs: [
      {
        id: 'cm3-1',
        prompt: '3 fiú és 3 lány leülése felváltva egy padba',
        value: '2 · 3! · 3! = 2 · 6 · 6 = 72 sorrend'
      },
      {
        id: 'cm3-2',
        prompt: '4 fiú és 4 lány felváltva körasztal körül',
        value: '(4 - 1)! · 4! = 3! · 4! = 6 · 24 = 144'
      },
      {
        id: 'cm3-3',
        prompt: '6 könyv a polcon, 3 adott könyv egymás mellett',
        value: '4! · 3! = 24 · 6 = 144 sorrend'
      },
      {
        id: 'cm3-4',
        prompt: '10 fős társaságban mindenki koccint mindenkivel',
        value: '(10 · 9) / 2 = 45 koccintás'
      },
      {
        id: 'cm3-5',
        prompt: '10 versenyzőből 1-3. helyezettek sorrendje',
        value: '10 · 9 · 8 = 720 lehetőség'
      },
      {
        id: 'cm3-6',
        prompt: '6 ember körasztalnál, 2 barát egymás mellett ül',
        value: '2! · (5 - 1)! = 2 · 24 = 48 ülésrend'
      },
      {
        id: 'cm3-7',
        prompt: '7 fős baráti körből 3 fős delegáció kiválasztása',
        value: '(7 · 6 · 5) / 3! = 210 / 6 = 35 csapat'
      },
      {
        id: 'cm3-8',
        prompt: '8 csúcsú konvex sokszög összes átlójának száma',
        value: 'n(n-3)/2 = (8 · 5) / 2 = 20 átló'
      }
    ]
  }
};

export const CountingContMatcher: React.FC<CountingContMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId,
  topicTitle
}) => {
  const activeLevel = currentLevel || level || 1;
  const config = matcherLevels[activeLevel] || matcherLevels[1];

  return (
    <MatcherTemplate
      level={activeLevel}
      config={config}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId || 'g9-komb-osszeszamlalas-matcher'}
      topicTitle={topicTitle || '9. Osztály - Permutációk és Sorbarendezések Párosító'}
    />
  );
};

export default CountingContMatcher;
