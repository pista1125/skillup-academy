import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface RandomFrequencyMatcherProps {
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

const matcherLevels: Record<number, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és jelölések',
    subtitle: 'Párosítsd a véletlen kísérletek és a relatív gyakoriság szakkifejezéseit a definíciójukkal!',
    pairs: [
      {
        id: 'rfm1-1',
        left: 'Véletlen kísérlet',
        right: 'Azonos feltételekkel megismételhető, de előre bizonytalan kimenetelű folyamat'
      },
      {
        id: 'rfm1-2',
        left: 'Esemény (A)',
        right: 'A kísérlet kimenetelére vonatkozó állítás, ami vagy bekövetkezik, vagy nem'
      },
      {
        id: 'rfm1-3',
        left: 'Gyakoriság (k)',
        right: 'Azt mutatja meg, hogy az esemény hányszor következett be az n kísérletből'
      },
      {
        id: 'rfm1-4',
        left: 'Relatív gyakoriság (g = k/n)',
        right: 'A bekövetkezések száma osztva az összes elvégzett kísérlet számával'
      },
      {
        id: 'rfm1-5',
        left: 'A relatív gyakoriság stabilitása',
        right: 'A kísérletszám növelésével a relatív gyakoriság egy fix értékhez (valószínűség) simul'
      },
      {
        id: 'rfm1-6',
        left: 'Biztos esemény',
        right: 'Olyan esemény, amely minden kísérlet során garantáltan bekövetkezik (g = 1)'
      },
      {
        id: 'rfm1-7',
        left: 'Lehetetlen esemény',
        right: 'Olyan esemény, amely egyetlen kísérlet során sem következhet be (g = 0)'
      },
      {
        id: 'rfm1-8',
        left: 'Elemi esemény',
        right: 'A kísérlet egyetlen lehetséges, tovább nem bontható legfinomabb kimenetele'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Számítások és kísérleti adatok',
    subtitle: 'Számold ki az érmék és kockák kísérleti relatív gyakoriságait!',
    pairs: [
      {
        id: 'rfm2-1',
        left: '50 érmedobásból 24 fej',
        right: '0,48 (48%)'
      },
      {
        id: 'rfm2-2',
        left: '400 érmedobásból 201 fej',
        right: '0,5025 (≈ 50,3%)'
      },
      {
        id: 'rfm2-3',
        left: '3 érme összes elemi eseményének száma',
        right: '8 elemi esemény'
      },
      {
        id: 'rfm2-4',
        left: '3 érme: pontosan 1 fej és 2 írás',
        right: '3/8 (37,5%)'
      },
      {
        id: 'rfm2-5',
        left: '3 érme: mindhárom érmén azonos oldal',
        right: '2/8 = 25%'
      },
      {
        id: 'rfm2-6',
        left: '850 kockadobásból 126 db egyes dobás',
        right: '≈ 14,82%'
      },
      {
        id: 'rfm2-7',
        left: 'Szabályos dobókockán a 6-os elméleti esélye',
        right: '1/6 (≈ 16,67%)'
      },
      {
        id: 'rfm2-8',
        left: 'Két kocka együttes feldobásának esetszáma',
        right: '36 elemi kimenetel'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Típuscsapdák, stabilitás és valószínűség',
    subtitle: 'Párosítsd a valószínűségszámítás empirikus és elméleti szabályait!',
    pairs: [
      {
        id: 'rfm3-1',
        left: 'Tibor csapdája 3 érme feldobásakor',
        right: 'A 4 összevont kimenetel nem egyformán valószínű, mert belső esetszámuk eltér!'
      },
      {
        id: 'rfm3-2',
        left: 'A nagy számok empirikus törvénye',
        right: 'Sok kísérletnél (n → ∞) a relatív gyakoriság ingadozása elenyészővé válik'
      },
      {
        id: 'rfm3-3',
        left: 'Relatív gyakoriság értékkészlete',
        right: 'Mindig a [0; 1] zárt intervallumba esik: 0 ≤ k/n ≤ 1'
      },
      {
        id: 'rfm3-4',
        left: 'Miért jobb a relatív gyakoriság a gyakoriságnál?',
        right: 'Mert összehasonlíthatóvá teszi a különböző nagyságú kísérletsorozatokat'
      },
      {
        id: 'rfm3-5',
        left: '850 dobásból prímszám (2, 3, 5) gyakorisága',
        right: '451 db (53,06%)'
      },
      {
        id: 'rfm3-6',
        left: '850 dobásból összetett szám (4, 6) gyakorisága',
        right: '273 db (32,12%)'
      },
      {
        id: 'rfm3-7',
        left: 'Független kísérletek elve',
        right: 'Egyetlen dobás kimenetele sem befolyásolja a rákövetkező dobások esélyét'
      },
      {
        id: 'rfm3-8',
        left: 'Laplace klasszikus valószínűségi modell',
        right: 'Kedvező esetek száma osztva az összes egyenlően valószínű eset számával'
      }
    ]
  }
};

export const RandomFrequencyMatcher: React.FC<RandomFrequencyMatcherProps> = (props) => {
  return (
    <MatcherTemplate
      topicId={props.topicId || 'g10-stat-veletlen-relativ-gyakorisag-matcher'}
      topicTitle={props.topicTitle || 'Véletlen? – Relatív gyakoriság'}
      levels={matcherLevels}
      {...props}
    />
  );
};

export default RandomFrequencyMatcher;

