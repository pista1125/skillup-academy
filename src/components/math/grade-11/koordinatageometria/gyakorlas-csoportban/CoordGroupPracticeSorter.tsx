import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CoordGroupPracticeSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const COORD_GROUP_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: |→u| = 3, |→v| = 4 – milyen a két vektor?',
    description: 'Döntsd el az adatokból, hogyan helyezkedik el egymáshoz képest a két vektor!',
    categories: [
      { id: 'perp', name: 'Merőlegesek', color: 'blue' },
      { id: 'same', name: 'Egyirányúak', color: 'emerald' },
      { id: 'opp', name: 'Ellentétes irányúak', color: 'rose' }
    ],
    items: [
      { id: 'cgs1', text: '|→u + →v| = 5', categoryId: 'perp' },
      { id: 'cgs2', text: '|→u − →v| = 5', categoryId: 'perp' },
      { id: 'cgs3', text: '→u(3; 0), →v(0; −4)', categoryId: 'perp' },
      { id: 'cgs4', text: '|→u + →v| = 7', categoryId: 'same' },
      { id: 'cgs5', text: '|→u − →v| = 1', categoryId: 'same' },
      { id: 'cgs6', text: '→u(0; 3), →v(0; 4)', categoryId: 'same' },
      { id: 'cgs7', text: '|→u + →v| = 1', categoryId: 'opp' },
      { id: 'cgs8', text: '|→u − →v| = 7', categoryId: 'opp' },
      { id: 'cgs9', text: '→u(3; 0), →v(−4; 0)', categoryId: 'opp' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik eszköz kell?',
    description: 'Válogasd szét a feladatokat a legfontosabb lépés szerint!',
    categories: [
      { id: 'mid', name: 'Felezőpont, középpont (C = 2K − A)', color: 'purple' },
      { id: 'rot', name: '90°-os elforgatás', color: 'amber' },
      { id: 'len', name: 'Vektor hossza (Pitagorasz)', color: 'teal' }
    ],
    items: [
      { id: 'cgs10', text: 'Paralelogramma C csúcsa az A csúcsból és a K középpontból', categoryId: 'mid' },
      { id: 'cgs11', text: 'Négyzet szemközti csúcsa a középpontból és egy csúcsból', categoryId: 'mid' },
      { id: 'cgs12', text: 'Egy négyszög oldalfelező pontjai', categoryId: 'mid' },
      { id: 'cgs13', text: 'Négyzet szomszédos csúcsa a középpontból és egy csúcsból', categoryId: 'rot' },
      { id: 'cgs14', text: 'Szabályos nyolcszög két csúccsal arrébb lévő csúcsa', categoryId: 'rot' },
      { id: 'cgs15', text: '→a +90°-os elforgatottjának végpontja', categoryId: 'rot' },
      { id: 'cgs16', text: 'Paralelogramma oldalának hossza a csúcsokból', categoryId: 'len' },
      { id: 'cgs17', text: 'Négyzet átlójának hossza két szemközti csúcsból', categoryId: 'len' },
      { id: 'cgs18', text: 'Két közös kezdőpontú vektor végpontjainak távolsága', categoryId: 'len' }
    ]
  },
  {
    level: 3,
    title: '3. szint: A(3; −10), B(−3; −6), C(1; 4) – melyik paralelogramma?',
    description: 'A negyedik csúcs három helyen lehet. Melyik esethez tartozik az adat?',
    categories: [
      { id: 'd1', name: 'A negyedik csúcs B-vel szemközti', color: 'blue' },
      { id: 'd2', name: 'A negyedik csúcs C-vel szemközti', color: 'emerald' },
      { id: 'd3', name: 'A negyedik csúcs A-val szemközti', color: 'purple' }
    ],
    items: [
      { id: 'cgs19', text: 'D(7; 0)', categoryId: 'd1' },
      { id: 'cgs20', text: 'D = A + C − B', categoryId: 'd1' },
      { id: 'cgs21', text: 'A B-ből induló átló ≈ 11,66', categoryId: 'd1' },
      { id: 'cgs22', text: 'D(−1; −20)', categoryId: 'd2' },
      { id: 'cgs23', text: 'D = A + B − C', categoryId: 'd2' },
      { id: 'cgs24', text: 'A C-ből induló átló ≈ 24,08', categoryId: 'd2' },
      { id: 'cgs25', text: 'D(−5; 8)', categoryId: 'd3' },
      { id: 'cgs26', text: 'D = B + C − A', categoryId: 'd3' },
      { id: 'cgs27', text: 'Az A-ból induló átló ≈ 19,70', categoryId: 'd3' }
    ]
  }
];

const COORD_GROUP_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: COORD_GROUP_SORTER_LEVELS_LIST[0],
  2: COORD_GROUP_SORTER_LEVELS_LIST[1],
  3: COORD_GROUP_SORTER_LEVELS_LIST[2]
};

export const CoordGroupPracticeSorter: React.FC<CoordGroupPracticeSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-geo-csoportmunka-sorter',
  topicTitle = '8. Gyakorlás csoportban – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="gyakorlas-csoportban"
      title={topicTitle}
      subtitle="Rendszerezd a vektorpárokat, a megoldási eszközöket és a paralelogramma három lehetséges negyedik csúcsát!"
      levels={COORD_GROUP_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default CoordGroupPracticeSorter;
