import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  ChapterSummaryMindmapSvg,
  ExamVennSieveSvg,
  CompleteGraphKHandshakesSvg,
  IntervalSetIntersectionRulerSvg,
  CountingPermutationTreeSvg,
  DeMorganVennSvg,
  RussellParadoxScaleSvg
} from './KnowledgeTestFigures';

interface KnowledgeTestSorterProps {
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
    title: '1. Szint: Alapvető Fejezeti Témakörök',
    subtitle: 'Válogasd szét a fogalmakat: Kombinatorika & Gráfok, Halmazok vagy Intervallumok!',
    categories: [
      {
        id: 'cat-kombi-graphs',
        name: 'Kombinatorika & Gráfok',
        description: 'Sorbarendezések, permutációk, kódok és kézfogások',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-sets-ops',
        name: 'Halmazok & Műveletek',
        description: 'Unió, metszet, különbség és részhalmazok száma',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-intervals-nums',
        name: 'Számhalmazok & Intervallumok',
        description: 'Számegyenes, nyílt/zárt szakaszok és számhalmazok',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      }
    ],
    items: [
      {
        id: 'kts1-1',
        label: '5 könyv sorbarendezése egy polcon',
        category: 'cat-kombi-graphs',
        figure: <CountingPermutationTreeSvg size={65} />
      },
      {
        id: 'kts1-2',
        label: '6 fős társaság kézfogásai (mindenki mindenkivel)',
        category: 'cat-kombi-graphs',
        figure: <CompleteGraphKHandshakesSvg size={65} />
      },
      {
        id: 'kts1-3',
        label: 'Körasztal körül 4 ember leültetése',
        category: 'cat-kombi-graphs'
      },
      {
        id: 'kts1-4',
        label: '4-jegyű bankkártya PIN kódok száma',
        category: 'cat-kombi-graphs'
      },
      {
        id: 'kts1-5',
        label: 'A ∩ B = {x | x ∈ A és x ∈ B}',
        category: 'cat-sets-ops'
      },
      {
        id: 'kts1-6',
        label: 'A ∪ B = {x | x ∈ A vagy x ∈ B}',
        category: 'cat-sets-ops'
      },
      {
        id: 'kts1-7',
        label: 'A \\ B = {x | x ∈ A és x ∉ B}',
        category: 'cat-sets-ops'
      },
      {
        id: 'kts1-8',
        label: '4 elemű halmaz összes részhalmazának száma',
        category: 'cat-sets-ops'
      },
      {
        id: 'kts1-9',
        label: 'ℕ ⊆ ℤ ⊆ ℚ ⊆ ℝ',
        category: 'cat-intervals-nums',
        figure: <ChapterSummaryMindmapSvg size={65} />
      },
      {
        id: 'kts1-10',
        label: '[-2; 3] ∩ ℤ (egész számok az intervallumban)',
        category: 'cat-intervals-nums',
        figure: <IntervalSetIntersectionRulerSvg size={65} />
      },
      {
        id: 'kts1-11',
        label: ']-1; 5[ intervallum a valós számegyenesen',
        category: 'cat-intervals-nums'
      },
      {
        id: 'kts1-12',
        label: '√2 ∈ ℚ* és π ∈ ℝ',
        category: 'cat-intervals-nums'
      }
    ]
  },
  2: {
    title: '2. Szint: Tételmodellek és Módszertan',
    subtitle: 'Kategorizáld a feladatokat: Összeszámlálás & Dirichlet, Szitaformula vagy Halmazazonosságok!',
    categories: [
      {
        id: 'cat-counting-logic',
        name: 'Összeszámlálás & Dirichlet-elv',
        description: 'Skatulyaelv, garanciák és gráffokszám-tétel',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-sieve-venn',
        name: 'Szitaformula & Venn-diagramok',
        description: '|A ∪ B| kiszámítása és Venn-táblázatos eloszlás',
        badgeColor: 'bg-red-100 text-red-900 border-red-300'
      },
      {
        id: 'cat-identities-ops',
        name: 'Halmazazonosságok & Műveletek',
        description: 'De Morgan törvények és szimmetrikus differencia',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      {
        id: 'kts2-1',
        label: '13 ember között biztosan van 2 azonos születési hónappal',
        category: 'cat-counting-logic'
      },
      {
        id: 'kts2-2',
        label: '3 zokniszín esetén 4 zokni garantálja az azonos párt',
        category: 'cat-counting-logic'
      },
      {
        id: 'kts2-3',
        label: '4-jegyű számok {1,2,3,4}-ből ismétlés nélkül',
        category: 'cat-counting-logic'
      },
      {
        id: 'kts2-4',
        label: 'Páratlan fokszámú csúcsok száma minden gráfban páros',
        category: 'cat-counting-logic',
        figure: <CompleteGraphKHandshakesSvg size={65} />
      },
      {
        id: 'kts2-5',
        label: '|A ∪ B| = |A| + |B| - |A ∩ B| (alap szitaformula)',
        category: 'cat-sieve-venn'
      },
      {
        id: 'kts2-6',
        label: '30 fős osztály: 18 angol, 15 német, 6 mindkettő',
        category: 'cat-sieve-venn'
      },
      {
        id: 'kts2-7',
        label: '|A ∩ B| = ∅ esetén |A ∪ B| = |A| + |B| (diszjunkt halmazok)',
        category: 'cat-sieve-venn'
      },
      {
        id: 'kts2-8',
        label: '3 halmazos Venn-diagram 8 különálló régióra bontja az alaphalmazt',
        category: 'cat-sieve-venn',
        figure: <ExamVennSieveSvg size={65} />
      },
      {
        id: 'kts2-9',
        label: '(A ∪ B) = Ā ∩ B̄ (De Morgan unióra)',
        category: 'cat-identities-ops',
        figure: <DeMorganVennSvg size={65} />
      },
      {
        id: 'kts2-10',
        label: '(A ∩ B) = Ā ∪ B̄ (De Morgan metszetre)',
        category: 'cat-identities-ops'
      },
      {
        id: 'kts2-11',
        label: 'A Δ B = (A \\ B) ∪ (B \\ A) (szimmetrikus differencia)',
        category: 'cat-identities-ops'
      },
      {
        id: 'kts2-12',
        label: 'A \\ B = A ∩ B̄ (különbség metszettel)',
        category: 'cat-identities-ops'
      }
    ]
  },
  3: {
    title: '3. Szint: Magasabb Szintű és Mesterfeladatok',
    subtitle: 'Válogasd szét: Emelt Kombinatorika, 3-as Szita vagy Paradoxonok & Számosságok!',
    categories: [
      {
        id: 'cat-adv-counting',
        name: 'Emelt Kombinatorika & Gráfok',
        description: 'Sokszög átlói, nem üres valódi részhalmazok, blokk-trükk',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-three-sieve',
        name: '3-Halmazos Szita & Modellek',
        description: 'Háromhalmazos szita, pontosan két eset és szélsőértékek',
        badgeColor: 'bg-violet-100 text-violet-900 border-violet-300'
      },
      {
        id: 'cat-deep-logic',
        name: 'Halmazelmélet & Paradoxonok',
        description: 'Russell-paradoxon, Cantor számosságok és logikai tagadás',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      }
    ],
    items: [
      {
        id: 'kts3-1',
        label: '7 csúcsú konvex sokszög összes átlójának száma',
        category: 'cat-adv-counting'
      },
      {
        id: 'kts3-2',
        label: 'Nem üres valódi részhalmazok száma: 2ⁿ - 2',
        category: 'cat-adv-counting'
      },
      {
        id: 'kts3-3',
        label: 'Csúcsok fokszámösszege: ∑ d(v) = 2 · e',
        category: 'cat-adv-counting'
      },
      {
        id: 'kts3-4',
        label: 'Blokk-képzéses sorbarendezés (ha 2 ember egymás mellett ül)',
        category: 'cat-adv-counting',
        figure: <CountingPermutationTreeSvg size={65} />
      },
      {
        id: 'kts3-5',
        label: '|A ∪ B ∪ C| = ∑|A| - ∑|A ∩ B| + |A ∩ B ∩ C| (hármas szita)',
        category: 'cat-three-sieve',
        figure: <ExamVennSieveSvg size={65} />
      },
      {
        id: 'kts3-6',
        label: 'Pontosan két tárgyat kedvelők a páros metszetekből a hármas levonásával',
        category: 'cat-three-sieve'
      },
      {
        id: 'kts3-7',
        label: '50 fős évfolyam: matek, fizika, kémia szitaformulás felbontása',
        category: 'cat-three-sieve'
      },
      {
        id: 'kts3-8',
        label: 'Metszet minimális értéke: |A| + |B| - |U|',
        category: 'cat-three-sieve'
      },
      {
        id: 'kts3-9',
        label: 'Russell-paradoxon: R = {X | X ∉ X} és az axiomatikus halmazelmélet',
        category: 'cat-deep-logic',
        figure: <RussellParadoxScaleSvg size={65} />
      },
      {
        id: 'kts3-10',
        label: '|ℕ| = |ℚ| = ℵ₀ (kölcsönösen egyértelmű Cantor-féle bijekció)',
        category: 'cat-deep-logic',
        figure: <ChapterSummaryMindmapSvg size={65} />
      },
      {
        id: 'kts3-11',
        label: 'A ⊆ B állítás tagadása: A \\ B ≠ ∅ (létezik x ∈ A, amire x ∉ B)',
        category: 'cat-deep-logic'
      },
      {
        id: 'kts3-12',
        label: 'Cantor második átlós módszere: ℝ kontinuum számosságú, nem megszámlálható',
        category: 'cat-deep-logic'
      }
    ]
  }
};

export const KnowledgeTestSorter: React.FC<KnowledgeTestSorterProps> = ({
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
      themeColor="red"
      topicId={topicId || 'g9-komb-tudasproba-sorter'}
      topicTitle={topicTitle || '9. Osztály - Fejezeti Témazáró Csoportosító'}
    />
  );
};

export default KnowledgeTestSorter;
