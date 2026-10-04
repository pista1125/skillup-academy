import React from 'react';
import { MatcherTemplate, MatchPair } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SequencesMatcherProps {
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
    id: 'seq-l1-p1',
    left: 'Számtani sorozat alapvető jellemzője',
    right: 'A szomszédos tagok különbsége állandó (d = differencia)',
    category: 'Alapfogalmak'
  },
  {
    id: 'seq-l1-p2',
    left: 'Mértani sorozat alapvető jellemzője',
    right: 'A szomszédos tagok hányadosa állandó (q = kvóciens)',
    category: 'Alapfogalmak'
  },
  {
    id: 'seq-l1-p3',
    left: 'Számtani sorozat n. tagjának képlete',
    right: 'a_n = a_1 + (n - 1) · d',
    category: 'Képletek'
  },
  {
    id: 'seq-l1-p4',
    left: 'Mértani sorozat n. tagjának képlete',
    right: 'a_n = a_1 · q^(n - 1)',
    category: 'Képletek'
  },
  {
    id: 'seq-l1-p5',
    left: 'A Fibonacci-sorozat rekurzív szabálya',
    right: 'F_n = F_(n-1) + F_(n-2) (1, 1, 2, 3, 5, 8...)',
    category: 'Nevezetes'
  },
  {
    id: 'seq-l1-p6',
    left: 'Explicit (általános) képlet',
    right: 'Közvetlenül n alapján számítja ki a tagot (pl. a_n = 3n + 1)',
    category: 'Megadási mód'
  },
  {
    id: 'seq-l1-p7',
    left: 'Rekurzív megadás',
    right: 'A kezdőtag(ok)ból és az előző tag(ok)ból számol tovább',
    category: 'Megadási mód'
  },
  {
    id: 'seq-l1-p8',
    left: 'A sorozat grafikonja a koordináta-rendszerben',
    right: 'Különálló, diszkrét pontok halmaza (n csak pozitív egész)',
    category: 'Grafikon'
  }
];

const level2Pairs: MatchPair[] = [
  {
    id: 'seq-l2-p1',
    left: 'a_1 = 5, d = 4 → a_6 értéke',
    right: 'a_6 = 5 + 5 · 4 = 25',
    category: 'Számtani számolás'
  },
  {
    id: 'seq-l2-p2',
    left: 'a_1 = 3, q = 2 → a_5 értéke',
    right: 'a_5 = 3 · 2^4 = 3 · 16 = 48',
    category: 'Mértani számolás'
  },
  {
    id: 'seq-l2-p3',
    left: '20, 16, 12, 8... sorozat differenciája (d)',
    right: 'd = -4 (szigorúan monoton csökkenő)',
    category: 'Számtani számolás'
  },
  {
    id: 'seq-l2-p4',
    left: '100, 50, 25, 12.5... sorozat kvóciense (q)',
    right: 'q = 0.5 vagy 1/2',
    category: 'Mértani számolás'
  },
  {
    id: 'seq-l2-p5',
    left: 'Fibonacci-sorozat 7. tagja (F_7)',
    right: '13 (mert 1, 1, 2, 3, 5, 8, 13)',
    category: 'Fibonacci'
  },
  {
    id: 'seq-l2-p6',
    left: 'a_n = 2n² sorozat 4. tagja (a_4)',
    right: 'a_4 = 2 · 4² = 2 · 16 = 32',
    category: 'Általános sorozat'
  },
  {
    id: 'seq-l2-p7',
    left: 'Számtani sorozatban a_1 = 10, a_4 = 22',
    right: '3d = 12 → d = 4',
    category: 'Számtani számolás'
  },
  {
    id: 'seq-l2-p8',
    left: 'Mértani sorozatban a_1 = 5, a_3 = 45 (pozitív tagok)',
    right: 'q² = 9 → q = 3',
    category: 'Mértani számolás'
  }
];

const level3Pairs: MatchPair[] = [
  {
    id: 'seq-l3-p1',
    left: 'Számtani sorozat bármely tagja a szomszédaihoz képest',
    right: 'A két szomszédos tag számtani közepe: a_k = (a_(k-1) + a_(k+1)) / 2',
    category: 'Összefüggések'
  },
  {
    id: 'seq-l3-p2',
    left: 'Pozitív mértani sorozat tagja a szomszédaihoz képest',
    right: 'A két szomszéd mértani közepe: a_k = √(a_(k-1) · a_(k+1))',
    category: 'Összefüggések'
  },
  {
    id: 'seq-l3-p3',
    left: 'a_1 = 3, d = 5 sorozatban melyik sorszámú tag az 53?',
    right: '3 + (n - 1) · 5 = 53 → 5(n - 1) = 50 → n = 11',
    category: 'Inverz feladat'
  },
  {
    id: 'seq-l3-p4',
    left: 'Oszcilláló (váltakozó előjelű) mértani sorozat feltétele',
    right: 'A kvóciens negatív szám (q < 0, pl. q = -1 vagy -2)',
    category: 'Tulajdonságok'
  },
  {
    id: 'seq-l3-p5',
    left: 'Fibonacci szomszédos tagok aránya (F_(n+1) / F_n)',
    right: 'Az aranymetszés számához tart: Φ ≈ 1,618',
    category: 'Fibonacci & Aranymetszés'
  },
  {
    id: 'seq-l3-p6',
    left: 'Baktériumtenyészet: minden órában megduplázódik',
    right: 'Mértani sorozat q = 2 szorzóval (exponenciális növekedés)',
    category: 'Alkalmazás'
  },
  {
    id: 'seq-l3-p7',
    left: 'Taxis díjszabás: 1000 Ft alapdíj + 400 Ft kilométerenként',
    right: 'Számtani sorozat jelleg: d = 400 Ft/km',
    category: 'Alkalmazás'
  },
  {
    id: 'seq-l3-p8',
    left: 'Konstans (állandó) sorozat: 7, 7, 7, 7...',
    right: 'Egyszerre számtani (d = 0) és mértani (q = 1) sorozat',
    category: 'Különleges eset'
  }
];

export const SequencesMatcher: React.FC<SequencesMatcherProps> = ({
  level = 1,
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  onOpenRules,
  onNextLevel,
  topicId = 'g8-func-sequences',
  topicTitle = 'Sorozatok'
}) => {
  const getPairsForLevel = (lvl: DifficultyLevel): MatchPair[] => {
    switch (lvl) {
      case 1: return level1Pairs;
      case 2: return level2Pairs;
      case 3: return level3Pairs;
      default: return level1Pairs;
    }
  };

  return (
    <MatcherTemplate
      pairs={getPairsForLevel(level)}
      level={level}
      topicId={topicId}
      chapterId="hozzarendelesek-valoszinuseg-sorozatok"
      topicTitle={topicTitle}
      themeColor="cyan"
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      onOpenRules={onOpenRules}
      onNextLevel={onNextLevel}
    />
  );
};

export default SequencesMatcher;
