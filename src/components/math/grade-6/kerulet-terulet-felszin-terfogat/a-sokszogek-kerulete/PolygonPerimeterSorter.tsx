import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PolygonPerimeterSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onBack?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Síkidomok Kerületképletei',
    subtitle: 'Válogasd szét a síkidomokat a használandó kerületképlet szerint!',
    categories: [
      {
        id: 'four_a',
        name: 'K = 4 · a (Négyzet, Rombusz)',
        description: 'Minden oldal egyenlő hosszúságú (4 egyforma oldal)'
      },
      {
        id: 'two_a_plus_b',
        name: 'K = 2 · (a + b) (Téglalap, Paralelogramma, Deltoid)',
        description: 'Páronként egyenlő oldalak összege'
      },
      {
        id: 'triangle_perimeter',
        name: 'Háromszögek kerülete (a + b + c vagy 3a)',
        description: 'Három oldal összegéből álló kerület'
      }
    ],
    items: [
      { id: 'pps1_1', text: 'Négyzet: a = 5 cm', categoryId: 'four_a' },
      { id: 'pps1_2', text: 'Rombusz: a = 8 cm', categoryId: 'four_a' },
      { id: 'pps1_3', text: 'Négyzet alakú kendő (oldala 20 cm)', categoryId: 'four_a' },
      { id: 'pps1_4', text: 'Rombusz alakú mező: a = 11 dm', categoryId: 'four_a' },
      { id: 'pps1_5', text: 'Téglalap: a = 4 cm, b = 6 cm', categoryId: 'two_a_plus_b' },
      { id: 'pps1_6', text: 'Paralelogramma: a = 10 cm, b = 5 cm', categoryId: 'two_a_plus_b' },
      { id: 'pps1_7', text: 'Téglalap alakú szoba: a = 5 m, b = 4 m', categoryId: 'two_a_plus_b' },
      { id: 'pps1_8', text: 'Deltoid: a = 7 cm, b = 3 cm', categoryId: 'two_a_plus_b' },
      { id: 'pps1_9', text: 'Általános háromszög: a = 3, b = 4, c = 5 cm', categoryId: 'triangle_perimeter' },
      { id: 'pps1_10', text: 'Szabályos háromszög: a = 7 cm', categoryId: 'triangle_perimeter' },
      { id: 'pps1_11', text: 'Egyenlő szárú háromszög: alap 6 cm, szár 8 cm', categoryId: 'triangle_perimeter' },
      { id: 'pps1_12', text: 'Derékszögű háromszög: 6 cm, 8 cm, 10 cm', categoryId: 'triangle_perimeter' }
    ]
  },
  2: {
    title: '2. Szint: Kiszámított Kerület Nagysága',
    subtitle: 'Számítsd ki a kerületet és csoportosítsd annak nagysága alapján!',
    categories: [
      {
        id: 'under_20',
        name: 'K < 20 cm (20 cm-nél kisebb)',
        description: 'A síkidom kerülete 20 cm alatt van'
      },
      {
        id: 'between_20_30',
        name: '20 cm ≤ K ≤ 30 cm (20 és 30 cm között)',
        description: 'A kerület értéke legalább 20 cm, de legfeljebb 30 cm'
      },
      {
        id: 'over_30',
        name: 'K > 30 cm (30 cm-nél nagyobb)',
        description: 'A síkidom kerülete meghaladja a 30 cm-t'
      }
    ],
    items: [
      { id: 'pps2_1', text: 'Négyzet: a = 4 cm', categoryId: 'under_20' },
      { id: 'pps2_2', text: 'Szabályos háromszög: a = 5 cm', categoryId: 'under_20' },
      { id: 'pps2_3', text: 'Téglalap: a = 6 cm, b = 3 cm', categoryId: 'under_20' },
      { id: 'pps2_4', text: 'Rombusz: a = 4 cm', categoryId: 'under_20' },
      { id: 'pps2_5', text: 'Négyzet: a = 6 cm', categoryId: 'between_20_30' },
      { id: 'pps2_6', text: 'Téglalap: a = 8 cm, b = 4 cm', categoryId: 'between_20_30' },
      { id: 'pps2_7', text: 'Szabályos háromszög: a = 8 cm', categoryId: 'between_20_30' },
      { id: 'pps2_8', text: 'Szabályos ötszög: a = 5 cm', categoryId: 'between_20_30' },
      { id: 'pps2_9', text: 'Négyzet: a = 9 cm', categoryId: 'over_30' },
      { id: 'pps2_10', text: 'Rombusz: a = 10 cm', categoryId: 'over_30' },
      { id: 'pps2_11', text: 'Téglalap: a = 12 cm, b = 5 cm', categoryId: 'over_30' },
      { id: 'pps2_12', text: 'Szabályos hatszög: a = 6 cm', categoryId: 'over_30' }
    ]
  },
  3: {
    title: '3. Szint: Visszaszámolt Oldalhossz Nagysága',
    subtitle: 'Számold ki az adott kerületű szabályos alakzat oldalát (a) és kategorizáld!',
    categories: [
      {
        id: 'side_under_10',
        name: 'Oldalhossz: a < 10 cm',
        description: 'A visszaszámolt oldalhossz 10 cm-nél kisebb'
      },
      {
        id: 'side_10_20',
        name: 'Oldalhossz: 10 cm ≤ a ≤ 20 cm',
        description: 'A visszaszámolt oldalhossz 10 cm és 20 cm közé esik'
      },
      {
        id: 'side_over_20',
        name: 'Oldalhossz: a > 20 cm',
        description: 'A visszaszámolt oldalhossz 20 cm-nél hosszabb'
      }
    ],
    items: [
      { id: 'pps3_1', text: 'Négyzet, aminek kerülete K = 24 cm', categoryId: 'side_under_10' },
      { id: 'pps3_2', text: 'Szabályos háromszög, aminek K = 21 cm', categoryId: 'side_under_10' },
      { id: 'pps3_3', text: 'Rombusz, aminek kerülete K = 32 cm', categoryId: 'side_under_10' },
      { id: 'pps3_4', text: 'Szabályos hatszög, aminek K = 30 cm', categoryId: 'side_under_10' },
      { id: 'pps3_5', text: 'Négyzet, aminek kerülete K = 48 cm', categoryId: 'side_10_20' },
      { id: 'pps3_6', text: 'Szabályos háromszög, aminek K = 45 cm', categoryId: 'side_10_20' },
      { id: 'pps3_7', text: 'Rombusz, aminek kerülete K = 64 cm', categoryId: 'side_10_20' },
      { id: 'pps3_8', text: 'Szabályos ötszög, aminek K = 60 cm', categoryId: 'side_10_20' },
      { id: 'pps3_9', text: 'Négyzet, aminek kerülete K = 100 cm', categoryId: 'side_over_20' },
      { id: 'pps3_10', text: 'Szabályos háromszög, aminek K = 90 cm', categoryId: 'side_over_20' },
      { id: 'pps3_11', text: 'Rombusz, aminek kerülete K = 120 cm', categoryId: 'side_over_20' },
      { id: 'pps3_12', text: 'Négyzet alakú virágágyás: K = 1 m (100 cm)', categoryId: 'side_over_20' }
    ]
  }
};

export const PolygonPerimeterSorter: React.FC<PolygonPerimeterSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onBack,
  topicId = 'g6-polygon-perimeter-sorter',
  topicTitle = 'Sokszögek kerülete (Csoportosító)'
}) => {
  return (
    <SorterTemplate
      level={level}
      currentLevel={currentLevel}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onBack={onBack}
      themeColor="blue"
      grade={6}
      chapterId="kerulet-terulet-felszin-terfogat"
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

export default PolygonPerimeterSorter;
