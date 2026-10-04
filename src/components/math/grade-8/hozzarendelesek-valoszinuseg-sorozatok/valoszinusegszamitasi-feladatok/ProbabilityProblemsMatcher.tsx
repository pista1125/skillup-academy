import React from 'react';
import { MatcherTemplate, MatchPair } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ProbabilityProblemsMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  onOpenRules?: () => void;
  onNextLevel?: () => void;
  level?: DifficultyLevel;
  topicId?: string;
  topicTitle?: string;
}

const level1Pairs: MatchPair[] = [
  {
    id: 'pr-l1-p1',
    left: 'Két kocka összege legalább 10',
    right: '6 / 36 = 1 / 6 ≈ 16,7% (10, 11 vagy 12 összeg)',
    category: 'Két Kocka'
  },
  {
    id: 'pr-l1-p2',
    left: 'Két kockával dupla dobása',
    right: '6 / 36 = 1 / 6 (1-1, 2-2, 3-3, 4-4, 5-5, 6-6)',
    category: 'Két Kocka'
  },
  {
    id: 'pr-l1-p3',
    left: 'Fa-diagram szorzási szabálya',
    right: 'Az egy ágon lévő egymást követő valószínűségeket összeszorozzuk',
    category: 'Fa-diagram'
  },
  {
    id: 'pr-l1-p4',
    left: 'Fa-diagram összeadási szabálya',
    right: 'A kedvező kimenetelhez vezető különböző ágak valószínűségeit összeadjuk',
    category: 'Fa-diagram'
  },
  {
    id: 'pr-l1-p5',
    left: 'Visszatevéses golyóhúzás lényege',
    right: 'A golyók száma és összetétele nem változik (független lépések)',
    category: 'Mintavétel'
  },
  {
    id: 'pr-l1-p6',
    left: 'Visszatevés nélküli mintavétel',
    right: 'Minden húzás után 1-gyel csökken a nevező és a kihúzott golyók száma',
    category: 'Mintavétel'
  },
  {
    id: 'pr-l1-p7',
    left: 'Három érme lehetséges kimenetelei',
    right: '2 · 2 · 2 = 2³ = 8 egyenlően valószínű elemi eset',
    category: 'Kombinatorika'
  },
  {
    id: 'pr-l1-p8',
    left: 'Legalább egy 6-os két kockával',
    right: '1 - (5/6 · 5/6) = 1 - 25/36 = 11/36 ≈ 30,6%',
    category: 'Ellentett Esemény'
  }
];

const level2Pairs: MatchPair[] = [
  {
    id: 'pr-l2-p1',
    left: 'Urna (4 piros, 6 fehér): 2 piros visszatevéssel',
    right: '(4/10) · (4/10) = 16 / 100 = 16%',
    category: 'Visszatevéssel'
  },
  {
    id: 'pr-l2-p2',
    left: 'Urna (4 piros, 6 fehér): 2 piros visszatevés NÉLKÜL',
    right: '(4/10) · (3/9) = 12 / 90 = 2 / 15 ≈ 13,3%',
    category: 'Visszatevés Nélkül'
  },
  {
    id: 'pr-l2-p3',
    left: 'Urna (3 zöld, 2 kék): 2 kék visszatevés nélkül',
    right: '(2/5) · (1/4) = 2 / 20 = 1 / 10 = 10%',
    category: 'Visszatevés Nélkül'
  },
  {
    id: 'pr-l2-p4',
    left: 'Három érmével pontosan 2 fej dobása',
    right: '3 / 8 = 37,5% (FFÍ, FÍF, ÍFF)',
    category: 'Három Érme'
  },
  {
    id: 'pr-l2-p5',
    left: 'Három érmével legalább 1 fej dobása',
    right: '1 - P(három írás) = 1 - 1/8 = 7/8 = 87,5%',
    category: 'Ellentett Esemény'
  },
  {
    id: 'pr-l2-p6',
    left: 'Magyar kártya: Piros színű VAGY Király húzása',
    right: '(8 piros + 3 egyéb király) / 32 = 11 / 32 ≈ 34,4%',
    category: 'Összetett Esemény'
  },
  {
    id: 'pr-l2-p7',
    left: 'Két kocka összege prím (2, 3, 5, 7, 11)',
    right: '(1 + 2 + 4 + 6 + 2) / 36 = 15 / 36 = 5 / 12 ≈ 41,7%',
    category: 'Két Kocka'
  },
  {
    id: 'pr-l2-p8',
    left: 'Két kocka összege pontosan 8',
    right: '5 / 36 ≈ 13,9% [párok: (2,6), (3,5), (4,4), (5,3), (6,2)]',
    category: 'Két Kocka'
  }
];

const level3Pairs: MatchPair[] = [
  {
    id: 'pr-l3-p1',
    left: '3 kockával dobva legalább egy 6-os',
    right: '1 - (5/6)³ = 1 - 125/216 = 91/216 ≈ 42,1%',
    category: 'Haladó Ellentett'
  },
  {
    id: 'pr-l3-p2',
    left: 'Urna (5 fehér, 5 fekete): különböző színű pár húzása',
    right: '2 · [(5/10) · (5/9)] = 50 / 90 = 5 / 9 ≈ 55,6%',
    category: 'Vegyes Húzás'
  },
  {
    id: 'pr-l3-p3',
    left: 'Magyar kártya: 2 lap kihúzása visszatevés nélkül, mindkettő ász',
    right: '(4/32) · (3/31) = 12 / 992 = 3 / 248 ≈ 1,21%',
    category: 'Kártyapárok'
  },
  {
    id: 'pr-l3-p4',
    left: 'Négy érmefeldobás lehetséges kimenetelei',
    right: '2⁴ = 16 egyenlően valószínű elemi sorozat',
    category: 'Hatványozás'
  },
  {
    id: 'pr-l3-p5',
    left: 'Négy érmével pontosan 2 fej és 2 írás',
    right: '6 / 16 = 3 / 8 = 37,5% (6 különböző elrendezés)',
    category: 'Kombinatorika'
  },
  {
    id: 'pr-l3-p6',
    left: 'Két kocka dobása: a dobott számok szorzata páratlan',
    right: '(3/6) · (3/6) = 9 / 36 = 1 / 4 = 25% (csak ha mindkettő páratlan)',
    category: 'Szorzatszabály'
  },
  {
    id: 'pr-l3-p7',
    left: 'Két kocka dobása: a dobott számok szorzata páros',
    right: '1 - 1/4 = 3 / 4 = 75% (27 eset a 36-ból)',
    category: 'Szorzatszabály'
  },
  {
    id: 'pr-l3-p8',
    left: 'Egy 5 tagú családban a születési sorrend (fiú/lány)',
    right: '2⁵ = 32 egyenlő esélyű ág a családfa diagramon',
    category: 'Fa-diagram'
  }
];

const matcherLevels: Record<DifficultyLevel, { title: string; subtitle: string; pairs: MatchPair[] }> = {
  1: {
    title: '1. Szint: Két Kocka és Fa-diagram Alapok',
    subtitle: 'Kösd össze az összetett kísérletek alapfogalmait és képleteit!',
    pairs: level1Pairs
  },
  2: {
    title: '2. Szint: Visszatevéses és Visszatevés Nélküli Számítások',
    subtitle: 'Párosítsd a golyóhúzások, érmesorozatok és kártyák valószínűségeit!',
    pairs: level2Pairs
  },
  3: {
    title: '3. Szint: Haladó Valószínűségi Feladatok és Szorzatok',
    subtitle: 'Találd meg a több lépéses kísérletek és komplementer események párjait!',
    pairs: level3Pairs
  }
};

export const ProbabilityProblemsMatcher: React.FC<ProbabilityProblemsMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'probability-problems',
  topicTitle = 'Valószínűségszámítási Feladatok'
}) => {
  return (
    <MatcherTemplate
      level={level}
      levels={matcherLevels}
      title="Valószínűségszámítási Feladatok"
      subtitle="Találd meg a több lépéses kísérletek, fa-diagramok és összetett események párjait!"
      topicId={topicId}
      topicTitle={topicTitle}
      badge="VI. FEJEZET • 8. OSZTÁLY"
      themeColor="rose"
      onBack={onSwitchToQuiz}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default ProbabilityProblemsMatcher;
