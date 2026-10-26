import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface NumberSetsSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Számok Besorolása a Legszűkebb Számhalmazba',
    subtitle: 'Húzd a számokat a legszűkebb nevezetes számhalmaz csoportjába!',
    categories: [
      {
        id: 'cat-n',
        name: 'Természetes számok (ℕ)',
        description: 'Nemnegatív egész számok {0, 1, 2, 3, ...}',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-z-only',
        name: 'Negatív egész (ℤ \\ ℕ)',
        description: 'Szigorúan negatív egészek {..., -3, -2, -1}',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-q-only',
        name: 'Racionális tört (ℚ \\ ℤ)',
        description: 'Véges vagy végtelen szakaszos nem egész törtek',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      },
      {
        id: 'cat-qstar',
        name: 'Irracionális szám (ℚ*)',
        description: 'Végtelen nem szakaszos tizedestörtek és konstansok',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'nss1-1', label: '0', category: 'cat-n' },
      { id: 'nss1-2', label: '17', category: 'cat-n' },
      { id: 'nss1-3', label: '√25', category: 'cat-n' },
      { id: 'nss1-4', label: '1000', category: 'cat-n' },
      { id: 'nss1-5', label: '-4', category: 'cat-z-only' },
      { id: 'nss1-6', label: '-29', category: 'cat-z-only' },
      { id: 'nss1-7', label: '-√36', category: 'cat-z-only' },
      { id: 'nss1-8', label: '3/4', category: 'cat-q-only' },
      { id: 'nss1-9', label: '-2,5', category: 'cat-q-only' },
      { id: 'nss1-10', label: '0,333...', category: 'cat-q-only' },
      { id: 'nss1-11', label: '√2', category: 'cat-qstar' },
      { id: 'nss1-12', label: 'π', category: 'cat-qstar' }
    ]
  },
  2: {
    title: '2. Szint: Műveleti Zártság Megítélése',
    subtitle: 'Döntsd el, hogy az adott halmaz ZÁRT vagy NEM ZÁRT az adott műveletre nézve!',
    categories: [
      {
        id: 'cat-closed',
        name: 'Zárt Művelet (✓)',
        description: 'Bármely két halmazbeli elem műveletének eredménye a halmazban marad',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-not-closed',
        name: 'NEM Zárt Művelet (✗)',
        description: 'Létezik ellenpélda: az eredmény kiesik a halmazból',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'nss2-1', label: 'ℕ halmaz összeadása (+)', category: 'cat-closed' },
      { id: 'nss2-2', label: 'ℕ halmaz szorzása (·)', category: 'cat-closed' },
      { id: 'nss2-3', label: 'ℤ halmaz összeadása (+)', category: 'cat-closed' },
      { id: 'nss2-4', label: 'ℤ halmaz kivonása (−)', category: 'cat-closed' },
      { id: 'nss2-5', label: 'ℤ halmaz szorzása (·)', category: 'cat-closed' },
      { id: 'nss2-6', label: 'ℚ halmaz szorzása (·)', category: 'cat-closed' },
      { id: 'nss2-7', label: 'ℕ halmaz kivonása (−)', category: 'cat-not-closed' },
      { id: 'nss2-8', label: 'ℕ halmaz osztása (:)', category: 'cat-not-closed' },
      { id: 'nss2-9', label: 'ℤ halmaz osztása (:)', category: 'cat-not-closed' },
      { id: 'nss2-10', label: 'ℚ* halmaz összeadása (+)', category: 'cat-not-closed' },
      { id: 'nss2-11', label: 'ℚ* halmaz szorzása (·)', category: 'cat-not-closed' },
      { id: 'nss2-12', label: 'ℚ* halmaz kivonása (−)', category: 'cat-not-closed' }
    ]
  },
  3: {
    title: '3. Szint: Matematikai Állítások Igazságtartalma',
    subtitle: 'Sorold be az állításokat: Mindig Igaz, Mindig Hamis, vagy Feltételtől Függ!',
    categories: [
      {
        id: 'cat-always-true',
        name: 'Mindig Igaz',
        description: 'Minden számra és esetre kivétel nélkül teljesülő tétel',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-always-false',
        name: 'Mindig Hamis',
        description: 'Matematikai képtelenség vagy cáfolt tévhit',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-depends',
        name: 'Feltételtől Függ',
        description: 'Vannak számok, amikre teljesül, de vannak ellenpéldák is',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'nss3-1', label: 'Két természetes szám összege természetes szám', category: 'cat-always-true' },
      { id: 'nss3-2', label: 'Két egész szám különbsége egész szám', category: 'cat-always-true' },
      { id: 'nss3-3', label: 'Nem nulla racionális és irracionális összege irracionális', category: 'cat-always-true' },
      { id: 'nss3-4', label: 'Két irracionális szám szorzata mindig irracionális', category: 'cat-always-false' },
      { id: 'nss3-5', label: 'A kivonás asszociatív művelet: (a-b)-c = a-(b-c)', category: 'cat-always-false' },
      { id: 'nss3-6', label: 'A 0 számnak létezik reciproka', category: 'cat-always-false' },
      { id: 'nss3-7', label: 'Minden negatív szám irracionális szám', category: 'cat-always-false' },
      { id: 'nss3-8', label: 'Két irracionális szám összege irracionális', category: 'cat-depends' },
      { id: 'nss3-9', label: 'Két racionális szám hányadosa racionális', category: 'cat-depends' },
      { id: 'nss3-10', label: 'Egy szám négyzete nagyobb magánál a számnál', category: 'cat-depends' },
      { id: 'nss3-11', label: 'Két egész szám hányadosa egész szám', category: 'cat-depends' },
      { id: 'nss3-12', label: 'A számok összeadása kommutatív: a + b = b + a', category: 'cat-always-true' }
    ]
  }
};

export const NumberSetsSorter: React.FC<NumberSetsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-szamok-muveletek-sorter',
  topicTitle = '9. Osztály - Műveletek Számhalmazokban Csoportosító'
}) => {
  return (
    <SorterTemplate
      levels={sorterLevels}
      currentLevel={currentLevel || level}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="blue"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default NumberSetsSorter;
