import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  ThreeSetsVennRegionsSvg,
  SymmetricDifferenceSvg,
  NumberSetsHierarchySvg,
  SubsetInclusionVennSvg,
  DisjointSetsVennSvg,
  ComplexIntervalZIntersectionSvg,
  PowerSetTreeSvg
} from './SetsPracticeFigures';

interface SetsPracticeSorterProps {
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
    title: '1. Szint: Fogalmak és Alapkategóriák',
    subtitle: 'Válogasd szét az állításokat: Számhalmazok, Halmazműveletek vagy Részhalmazok!',
    categories: [
      {
        id: 'cat-numsets',
        name: 'Számhalmazok Besorolása',
        description: 'ℕ, ℤ, ℚ, ℚ* és ℝ tulajdonságai és hierarchiája',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      },
      {
        id: 'cat-operations',
        name: 'Halmazműveletek és Logika',
        description: 'Metszet, unió, különbség és diszjunkt halmazok',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-subsets',
        name: 'Részhalmazok és Hatványhalmaz',
        description: '2ⁿ szabály, üres halmaz és tartalmazási reláció',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      {
        id: 'sps1-1',
        label: '√2 ∈ ℚ* és π ∈ ℝ',
        category: 'cat-numsets',
        figure: <NumberSetsHierarchySvg size={65} />
      },
      {
        id: 'sps1-2',
        label: '-15 ∈ ℤ és 3/4 ∈ ℚ',
        category: 'cat-numsets'
      },
      {
        id: 'sps1-3',
        label: 'ℕ ⊆ ℤ ⊆ ℚ ⊆ ℝ',
        category: 'cat-numsets',
        figure: <NumberSetsHierarchySvg size={65} />
      },
      {
        id: 'sps1-4',
        label: '0,333... = 1/3 ∈ ℚ',
        category: 'cat-numsets'
      },
      {
        id: 'sps1-5',
        label: 'A ∩ B = {x | x ∈ A és x ∈ B}',
        category: 'cat-operations'
      },
      {
        id: 'sps1-6',
        label: 'A \\ B = {x | x ∈ A és x ∉ B}',
        category: 'cat-operations'
      },
      {
        id: 'sps1-7',
        label: 'A ∩ B = ∅',
        category: 'cat-operations',
        figure: <DisjointSetsVennSvg size={65} />
      },
      {
        id: 'sps1-8',
        label: 'A ∪ B = {x | x ∈ A vagy x ∈ B}',
        category: 'cat-operations'
      },
      {
        id: 'sps1-9',
        label: '4 elemű halmaz összes részhalmazának száma',
        category: 'cat-subsets',
        figure: <PowerSetTreeSvg size={65} />
      },
      {
        id: 'sps1-10',
        label: 'Az üres halmaz (∅) minden halmaznak részhalmaza',
        category: 'cat-subsets'
      },
      {
        id: 'sps1-11',
        label: 'A ⊆ B: A minden eleme benne van B-ben',
        category: 'cat-subsets',
        figure: <SubsetInclusionVennSvg size={65} />
      },
      {
        id: 'sps1-12',
        label: '5 elemű halmaz valódi részhalmazainak száma',
        category: 'cat-subsets'
      }
    ]
  },
  2: {
    title: '2. Szint: Intervallumok, Szitaformula és Azonosságok',
    subtitle: 'Kategorizáld a feladatokat: Intervallumok, Szitaformula vagy De Morgan szabályok!',
    categories: [
      {
        id: 'cat-intervals',
        name: 'Intervallumok és Számegyenes',
        description: 'Folytonos halmazok metszete, különbsége és egész pontjai',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-sieve',
        name: 'Szitaformula és Venn Elemösszegzés',
        description: '|A ∪ B| kiszámítása és átfedések korrekciója',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-identities',
        name: 'Halmazazonosságok és De Morgan',
        description: 'Szimmetrikus differencia, komplementerek és De Morgan törvények',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      {
        id: 'sps2-1',
        label: '[-2; 3] ∩ ℤ (egész számok az intervallumban)',
        category: 'cat-intervals',
        figure: <ComplexIntervalZIntersectionSvg size={65} />
      },
      {
        id: 'sps2-2',
        label: ']-1; 4] ∩ [2; 7[',
        category: 'cat-intervals'
      },
      {
        id: 'sps2-3',
        label: '[0; 5] ∩ ℕ',
        category: 'cat-intervals'
      },
      {
        id: 'sps2-4',
        label: '[-3; 2[ \\ [0; 5]',
        category: 'cat-intervals'
      },
      {
        id: 'sps2-5',
        label: '|A ∪ B| = |A| + |B| - |A ∩ B| (alap szitaformula)',
        category: 'cat-sieve'
      },
      {
        id: 'sps2-6',
        label: '|A| = 12, |B| = 8, |A ∩ B| = 3 esetén |A ∪ B|',
        category: 'cat-sieve'
      },
      {
        id: 'sps2-7',
        label: '30 fős osztály: 18 angol, 15 német, 6 mindkettő',
        category: 'cat-sieve'
      },
      {
        id: 'sps2-8',
        label: 'Diszjunkt halmazok uniójának elemszáma',
        category: 'cat-sieve',
        figure: <DisjointSetsVennSvg size={65} />
      },
      {
        id: 'sps2-9',
        label: '(A ∪ B) = Ā ∩ B̄ (De Morgan unióra)',
        category: 'cat-identities'
      },
      {
        id: 'sps2-10',
        label: 'A Δ B = (A \\ B) ∪ (B \\ A) (szimmetrikus differencia)',
        category: 'cat-identities',
        figure: <SymmetricDifferenceSvg size={65} />
      },
      {
        id: 'sps2-11',
        label: '(A ∩ B) = Ā ∪ B̄ (De Morgan metszetre)',
        category: 'cat-identities'
      },
      {
        id: 'sps2-12',
        label: 'A \\ B = A ∩ B̄ (különbség kifejezése komplementerrel)',
        category: 'cat-identities'
      }
    ]
  },
  3: {
    title: '3. Szint: Összetett Modellek és Elméleti Magasságok',
    subtitle: 'Válogasd szét: 3-Halmazos Szita, Logika és Paradoxonok vagy Szimmetrikus Diff & Hatványok!',
    categories: [
      {
        id: 'cat-three-venn',
        name: '3-Halmazos Szita & Modellek',
        description: 'Három halmaz Venn-diagramja, metszetek és pontosan k esetek',
        badgeColor: 'bg-violet-100 text-violet-900 border-violet-300'
      },
      {
        id: 'cat-logic-paradox',
        name: 'Logika, Paradoxonok & Számosság',
        description: 'Russell-paradoxon, Cantor számossági tételei és formális logika',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-symdiff-power',
        name: 'Szimmetrikus Diff & Hatványok',
        description: 'A Δ B tulajdonságai és magasabb rendű hatványhalmazok',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      }
    ],
    items: [
      {
        id: 'sps3-1',
        label: '|A ∪ B ∪ C| = ∑|A| - ∑|A ∩ B| + |A ∩ B ∩ C| (hármas szita)',
        category: 'cat-three-venn',
        figure: <ThreeSetsVennRegionsSvg size={65} />
      },
      {
        id: 'sps3-2',
        label: 'Pontosan két sportot űzők a páros metszetekből a hármas levonásával',
        category: 'cat-three-venn'
      },
      {
        id: 'sps3-3',
        label: 'A ∩ B ∩ C a 3 halmazos Venn legbelső, központi magja',
        category: 'cat-three-venn'
      },
      {
        id: 'sps3-4',
        label: '40 fős tábor: úszás, foci, túra szitaformulás felbontása',
        category: 'cat-three-venn'
      },
      {
        id: 'sps3-5',
        label: 'Russell-paradoxon: R = {X | X ∉ X} és az axiomatikus halmazelmélet',
        category: 'cat-logic-paradox'
      },
      {
        id: 'sps3-6',
        label: '|ℕ| = |ℚ| = ℵ₀ (kölcsönösen egyértelmű Cantor-féle megfeleltetés)',
        category: 'cat-logic-paradox',
        figure: <NumberSetsHierarchySvg size={65} />
      },
      {
        id: 'sps3-7',
        label: 'A ⊆ B tagadása: létezik x ∈ A, amire x ∉ B (A \\ B ≠ ∅)',
        category: 'cat-logic-paradox',
        figure: <SubsetInclusionVennSvg size={65} />
      },
      {
        id: 'sps3-8',
        label: 'Cantor második átlós módszere: ℝ nem megszámlálható halmaz',
        category: 'cat-logic-paradox'
      },
      {
        id: 'sps3-9',
        label: 'A Δ B = (A ∪ B) \\ (A ∩ B) (egyesítésből a metszet kivonása)',
        category: 'cat-symdiff-power',
        figure: <SymmetricDifferenceSvg size={65} />
      },
      {
        id: 'sps3-10',
        label: 'A = {1, 2} esetén |𝒫(𝒫(A))| elemszáma',
        category: 'cat-symdiff-power',
        figure: <PowerSetTreeSvg size={65} />
      },
      {
        id: 'sps3-11',
        label: 'A Δ A = ∅ és A Δ ∅ = A (szimmetrikus differencia alaptulajdonság)',
        category: 'cat-symdiff-power'
      },
      {
        id: 'sps3-12',
        label: 'Egy n elemű halmaz nem üres valódi részhalmazainak száma: 2ⁿ - 2',
        category: 'cat-symdiff-power'
      }
    ]
  }
};

export const SetsPracticeSorter: React.FC<SetsPracticeSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId,
  topicTitle
}) => {
  const activeLevel = currentLevel || level || 1;
  const config = sorterLevels[activeLevel] || sorterLevels[1];

  return (
    <SorterTemplate
      level={activeLevel}
      config={config}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      themeColor="violet"
      topicId={topicId || 'g9-komb-gyakorlas-halmaz-sorter'}
      topicTitle={topicTitle || '9. Osztály - Halmazok Gyakorló Csoportosító'}
    />
  );
};

export default SetsPracticeSorter;
