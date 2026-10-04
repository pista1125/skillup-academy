import React from 'react';
import { MatcherTemplate, MatchPair } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FindingPatternsMatcherProps {
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
    id: 'fp-l1-p1',
    left: 'Gyufaszál négyzetlánc képlete (1, 2, 3... négyzet)',
    right: 'f(n) = 3n + 1 (4, 7, 10, 13...)',
    category: 'Gyufaszálak'
  },
  {
    id: 'fp-l1-p2',
    left: 'Gyufaszál háromszöglánc képlete',
    right: 'f(n) = 2n + 1 (3, 5, 7, 9...)',
    category: 'Gyufaszálak'
  },
  {
    id: 'fp-l1-p3',
    left: 'Háromszögszámok zárt képlete',
    right: 'T_n = n(n + 1) / 2 (1, 3, 6, 10, 15...)',
    category: 'Nevezetes Képletek'
  },
  {
    id: 'fp-l1-p4',
    left: 'Kézfogások száma n ember között',
    right: 'K = n(n - 1) / 2 (mindenki mindenki mással)',
    category: 'Kombinatorika'
  },
  {
    id: 'fp-l1-p5',
    left: 'Konvex n-szög átlóinak száma',
    right: 'Á = n(n - 3) / 2',
    category: 'Geometria'
  },
  {
    id: 'fp-l1-p6',
    left: 'Lineáris sorozat felismerése',
    right: 'A szomszédos tagok különbsége (d) állandó',
    category: 'Alapfogalmak'
  },
  {
    id: 'fp-l1-p7',
    left: 'Négyzetszámok sorozata',
    right: 'N_n = n² (1, 4, 9, 16, 25, 36...)',
    category: 'Nevezetes Képletek'
  },
  {
    id: 'fp-l1-p8',
    left: 'Páratlan számok algebrai alakja',
    right: '2n - 1 vagy 2n + 1',
    category: 'Algebra'
  }
];

const level2Pairs: MatchPair[] = [
  {
    id: 'fp-l2-p1',
    left: 'A 10. háromszögszám (T₁₀) értéke',
    right: '10 · 11 / 2 = 55 (1-től 10-ig a számok összege)',
    category: 'Kiszámítás'
  },
  {
    id: 'fp-l2-p2',
    left: 'Kézfogások száma egy 10 fős baráti társaságban',
    right: '10 · 9 / 2 = 45 kézfogás',
    category: 'Kézfogások'
  },
  {
    id: 'fp-l2-p3',
    left: 'Konvex nyolcszög (n = 8) átlóinak száma',
    right: '8 · 5 / 2 = 20 átló',
    category: 'Átlók'
  },
  {
    id: 'fp-l2-p4',
    left: 'Hány gyufaszál kell egy 20 négyzetből álló lánchoz?',
    right: '3 · 20 + 1 = 61 gyufaszál',
    category: 'Gyufaszálak'
  },
  {
    id: 'fp-l2-p5',
    left: 'Sorozat hiányzó eleme: 2, 5, 10, 17, 26, [ ? ]',
    right: '37 (szabály: n² + 1, ahol 6² + 1 = 37)',
    category: 'Számsorozatok'
  },
  {
    id: 'fp-l2-p6',
    left: 'Sorozat hiányzó eleme: 3, 7, 11, 15, [ ? ]',
    right: '19 (állandó differencia: d = +4)',
    category: 'Számsorozatok'
  },
  {
    id: 'fp-l2-p7',
    left: 'Hatszög (n = 6) átlóinak száma',
    right: '6 · 3 / 2 = 9 átló',
    category: 'Átlók'
  },
  {
    id: 'fp-l2-p8',
    left: 'Hány ember volt a szobában, ha 15 kézfogás történt?',
    right: '6 ember [mert 6 · 5 / 2 = 15]',
    category: 'Visszafelé Számolás'
  }
];

const level3Pairs: MatchPair[] = [
  {
    id: 'fp-l3-p1',
    left: 'Két szomszédos háromszögszám összege: T_{n-1} + T_n',
    right: 'Mindig a nagyobbik sorszám négyzete: n²',
    category: 'Algebrai Igazolás'
  },
  {
    id: 'fp-l3-p2',
    left: 'Konvex tízszög (n = 10) átlóinak száma',
    right: '10 · 7 / 2 = 35 átló',
    category: 'Átlók'
  },
  {
    id: 'fp-l3-p3',
    left: '12 fős bajnokság: hány meccs kell oda-visszavágó nélkül?',
    right: '12 · 11 / 2 = 66 mérkőzés',
    category: 'Körmérkőzés'
  },
  {
    id: 'fp-l3-p4',
    left: 'Sorozat: 1, 8, 27, 64, 125... szabálya',
    right: 'f(n) = n³ (köbszámok sorozata)',
    category: 'Hatványozás'
  },
  {
    id: 'fp-l3-p5',
    left: 'Hányadik négyzetláncban van pontosan 301 gyufaszál?',
    right: 'A 100. alakzatban [3n + 1 = 301 → 3n = 300 → n = 100]',
    category: 'Egyenletmegoldás'
  },
  {
    id: 'fp-l3-p6',
    left: 'Első 50 pozitív egész szám összege (1 + 2 + ... + 50)',
    right: 'T₅₀ = 50 · 51 / 2 = 1275',
    category: 'Gauss-összeg'
  },
  {
    id: 'fp-l3-p7',
    left: 'Másodfokú sorozat felismerése',
    right: 'A különbségek különbsége (2. rendű differencia) állandó',
    category: 'Analízis'
  },
  {
    id: 'fp-l3-p8',
    left: 'Melyik sokszög átlóinak száma egyenlő az oldalainak számával?',
    right: 'Az ötszög [n(n - 3) / 2 = n → 5 · 2 / 2 = 5]',
    category: 'Geometria'
  }
];

const matcherLevels: Record<DifficultyLevel, { title: string; subtitle: string; pairs: MatchPair[] }> = {
  1: {
    title: '1. Szint: Mintázatok és Nevezetes Képletek',
    subtitle: 'Kösd össze a gyufaszál-alakzatok és nevezetes geometriai képletek párjait!',
    pairs: level1Pairs
  },
  2: {
    title: '2. Szint: Konkrét Értékek és Kiszámítások',
    subtitle: 'Párosítsd a sorszámokat a kiszámított értékekkel és hiányzó elemekkel!',
    pairs: level2Pairs
  },
  3: {
    title: '3. Szint: Haladó Összefüggések és Algebra',
    subtitle: 'Találd meg az algebrai összefüggések, Gauss-összegek és egyenletek párjait!',
    pairs: level3Pairs
  }
};

export const FindingPatternsMatcher: React.FC<FindingPatternsMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'finding-patterns',
  topicTitle = 'Keressünk Összefüggéseket!'
}) => {
  return (
    <MatcherTemplate
      level={level}
      levels={matcherLevels}
      title="Keressünk Összefüggéseket!"
      subtitle="Találd meg a mintázatok, számsorozatok és geometriai képletek párjait!"
      topicId={topicId}
      topicTitle={topicTitle}
      badge="VI. FEJEZET • 8. OSZTÁLY"
      themeColor="amber"
      onBack={onSwitchToQuiz}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default FindingPatternsMatcher;
