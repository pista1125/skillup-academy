import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LocksMatcherProps {
  level?: DifficultyLevel;
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
    title: '1. Szint: Alapvető Kódok és Képletek',
    subtitle: 'Párosítsd a kódolási szituációkat a helyes számítási képlettel és darabszámmal!',
    pairs: [
      {
        id: 'lm1-1',
        prompt: '3-tárcsás számzár (0–9)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="6" y="6" width="42" height="16" rx="4" fill="#f59e0b" />
            <text x="14" y="18" fill="#ffffff" fontSize="9" fontWeight="bold">0</text>
            <text x="27" y="18" fill="#ffffff" fontSize="9" fontWeight="bold">0</text>
            <text x="40" y="18" fill="#ffffff" fontSize="9" fontWeight="bold">0</text>
          </svg>
        ),
        value: '10³ = 1 000 lehetőség (000–999)'
      },
      {
        id: 'lm1-2',
        prompt: '4-jegyű bankkártya PIN kód',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="6" width="46" height="16" rx="3" fill="#1e293b" />
            <circle cx="12" cy="14" r="2.5" fill="#f59e0b" />
            <circle cx="22" cy="14" r="2.5" fill="#f59e0b" />
            <circle cx="32" cy="14" r="2.5" fill="#f59e0b" />
            <circle cx="42" cy="14" r="2.5" fill="#f59e0b" />
          </svg>
        ),
        value: '10⁴ = 10 000 különböző kód'
      },
      {
        id: 'lm1-3',
        prompt: 'Ismétléses variáció képlete',
        value: 'V_n^{k, ism} = n^k (n alap, k hely)'
      },
      {
        id: 'lm1-4',
        prompt: '8 bites bináris bájt',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="2" y="7" width="50" height="14" rx="2" fill="#3b82f6" />
            <text x="27" y="18" fill="#ffffff" fontSize="8" fontWeight="mono" textAnchor="middle">01101001</text>
          </svg>
        ),
        value: '2⁸ = 256 állapot (0–255)'
      },
      {
        id: 'lm1-5',
        prompt: '3-jegyű kód ismétlés nélkül (0–9)',
        value: '10 · 9 · 8 = 720 lehetőség'
      },
      {
        id: 'lm1-6',
        prompt: '0 szerepe kódoknál',
        value: 'Állhat az első helyen is (pl. 007 érvényes kód)'
      },
      {
        id: 'lm1-7',
        prompt: '6-fokozatú kapcsoló 3 pozíción',
        value: '6³ = 216 különböző beállítás'
      },
      {
        id: 'lm1-8',
        prompt: 'Ismétlés nélküli variáció',
        value: 'n · (n-1) · ... · (n-k+1) (fogyó készlet)'
      }
    ]
  },
  2: {
    title: '2. Szint: Megkötéses Számalkotás és Rendszámok',
    subtitle: 'Párosítsd a feltételes feladatokat a megfelelő levezetéssel!',
    pairs: [
      {
        id: 'lm2-1',
        prompt: 'Háromjegyű valódi számok száma',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="6" width="14" height="16" rx="2" fill="#ef4444" />
            <text x="11" y="18" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">≠0</text>
            <rect x="20" y="6" width="14" height="16" rx="2" fill="#f59e0b" />
            <rect x="36" y="6" width="14" height="16" rx="2" fill="#f59e0b" />
          </svg>
        ),
        value: '9 · 10 · 10 = 900 darab (100–999)'
      },
      {
        id: 'lm2-2',
        prompt: 'Régi magyar rendszám (3 betű + 3 szám)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="2" y="7" width="50" height="14" rx="2" fill="#ffffff" stroke="#000" strokeWidth="1" />
            <text x="27" y="18" fill="#000" fontSize="7" fontWeight="bold" textAnchor="middle">ABC-123</text>
          </svg>
        ),
        value: '26³ · 10³ = 17 576 000 kombináció'
      },
      {
        id: 'lm2-3',
        prompt: 'Új magyar rendszám (4 betű + 3 szám)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="2" y="7" width="50" height="14" rx="2" fill="#ffffff" stroke="#000" strokeWidth="1" />
            <text x="27" y="18" fill="#000" fontSize="6.5" fontWeight="bold" textAnchor="middle">AA·AA-123</text>
          </svg>
        ),
        value: '26⁴ · 10³ = 456 976 000 kombináció'
      },
      {
        id: 'lm2-4',
        prompt: '3-jegyű különböző jegyű számok {0..4}-ből',
        value: '4 · 4 · 3 = 48 darab (első jegy nem 0)'
      },
      {
        id: 'lm2-5',
        prompt: '3-jegyű páros számok (ismétlődéssel)',
        value: '9 · 10 · 5 = 450 darab (utolsó: 0,2,4,6,8)'
      },
      {
        id: 'lm2-6',
        prompt: '3-jegyű 5-tel osztható számok',
        value: '9 · 10 · 2 = 180 darab (utolsó jegy 0 vagy 5)'
      },
      {
        id: 'lm2-7',
        prompt: 'Négyjegyű csupa páratlan jegyű számok',
        value: '5⁴ = 625 darab ({1,3,5,7,9} jegyekből)'
      },
      {
        id: 'lm2-8',
        prompt: '4 barát sorrendje 4 széken',
        value: '4! = 4 · 3 · 2 · 1 = 24 ülésrend'
      }
    ]
  },
  3: {
    title: '3. Szint: Haladó Számzár Analízis és Biztonság',
    subtitle: 'Párosítsd az összetett összefüggéseket és komplementer formulákat!',
    pairs: [
      {
        id: 'lm3-1',
        prompt: '4-jegyű PIN legalább egy ismétlődéssel',
        value: '10 000 − 5 040 = 4 960 (komplementer módszer)'
      },
      {
        id: 'lm3-2',
        prompt: '3-jegyű különböző jegyű számok {0,1,2,3,4,5}-ből, 5-tel osztható',
        value: '0-ra végződő (20) + 5-re végződő (16) = 36'
      },
      {
        id: 'lm3-3',
        prompt: '6 karakteres jelszó (a-z, A-Z, 0-9)',
        value: '62⁶ ≈ 56,8 milliárd lehetőség'
      },
      {
        id: 'lm3-4',
        prompt: '6 karakteres csak kisbetűs jelszó',
        value: '26⁶ ≈ 308,9 millió lehetőség'
      },
      {
        id: 'lm3-5',
        prompt: 'Kétjegyű számok páros jegyösszeggel',
        value: 'Páros+Páros (20) + Páratlan+Páratlan (25) = 45'
      },
      {
        id: 'lm3-6',
        prompt: '4-jegyű számok pontosan egy 0-val',
        value: '9 · (1 · 9 · 9 + 9 · 1 · 9 + 9 · 9 · 1) = 2 187'
      },
      {
        id: 'lm3-7',
        prompt: '10 fős verseny dobogósai (arany, ezüst, bronz)',
        value: '10 · 9 · 8 = 720 sorrend'
      },
      {
        id: 'lm3-8',
        prompt: 'Kódok brute-force feltörési sebessége',
        value: 'Kombinációk száma osztva másodpercenkénti próbákkal'
      }
    ]
  }
};

export const LocksMatcher: React.FC<LocksMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId,
  topicTitle
}) => {
  return (
    <MatcherTemplate
      level={level}
      config={matcherLevels[level] || matcherLevels[1]}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId || 'g9-komb-szamzarak-matcher'}
      topicTitle={topicTitle || '9. Osztály - Számzárak és Kódok Párosító'}
    />
  );
};

export default LocksMatcher;
