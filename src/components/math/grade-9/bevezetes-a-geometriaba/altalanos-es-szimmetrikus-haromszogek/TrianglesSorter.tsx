import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TrianglesSorterProps {
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
    title: '1. Szint: Háromszögek Csoportosítása Szögeik Szerint',
    subtitle: 'Sorold be a megadott belső szöghármasokat a megfelelő szögfajta kategóriájába!',
    categories: [
      {
        id: 'cat-acute',
        name: 'Hegyesszögű',
        description: 'Mindhárom belső szög < 90°',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-right',
        name: 'Derékszögű',
        description: 'Pontosan egy 90°-os szög',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-obtuse',
        name: 'Tompaszögű',
        description: 'Pontosan egy > 90°-os szög',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Hegyesszögű
      { id: 'ts1-1', label: '50°, 60°, 70°', category: 'cat-acute' },
      { id: 'ts1-2', label: '60°, 60°, 60°', category: 'cat-acute' },
      { id: 'ts1-3', label: '40°, 70°, 70°', category: 'cat-acute' },
      { id: 'ts1-4', label: '55°, 65°, 60°', category: 'cat-acute' },
      // Derékszögű
      { id: 'ts1-5', label: '90°, 45°, 45°', category: 'cat-right' },
      { id: 'ts1-6', label: '30°, 60°, 90°', category: 'cat-right' },
      { id: 'ts1-7', label: '20°, 70°, 90°', category: 'cat-right' },
      { id: 'ts1-8', label: '15°, 75°, 90°', category: 'cat-right' },
      // Tompaszögű
      { id: 'ts1-9', label: '100°, 40°, 40°', category: 'cat-obtuse' },
      { id: 'ts1-10', label: '120°, 30°, 30°', category: 'cat-obtuse' },
      { id: 'ts1-11', label: '95°, 45°, 40°', category: 'cat-obtuse' },
      { id: 'ts1-12', label: '135°, 25°, 20°', category: 'cat-obtuse' }
    ]
  },
  2: {
    title: '2. Szint: Háromszög-egyenlőtlenség és Létezés',
    subtitle: 'Alkotnak-e háromszöget a megadott oldalhosszak a háromszög-egyenlőtlenség alapján?',
    categories: [
      {
        id: 'cat-valid',
        name: 'Létező Háromszög (a + b > c)',
        description: 'Minden oldalra teljesül a háromszög-egyenlőtlenség',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-invalid',
        name: 'Nem Szerkeszthető (a + b ≤ c)',
        description: 'A két rövidebb összeg nem nagyobb a harmadiknál',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Létező
      { id: 'ts2-1', label: '3 cm, 4 cm, 5 cm', category: 'cat-valid' },
      { id: 'ts2-2', label: '5 cm, 5 cm, 5 cm', category: 'cat-valid' },
      { id: 'ts2-3', label: '6 cm, 8 cm, 10 cm', category: 'cat-valid' },
      { id: 'ts2-4', label: '7 cm, 10 cm, 12 cm', category: 'cat-valid' },
      { id: 'ts2-5', label: '4 cm, 7 cm, 9 cm', category: 'cat-valid' },
      { id: 'ts2-6', label: '5 cm, 12 cm, 13 cm', category: 'cat-valid' },
      // Nem létező
      { id: 'ts2-7', label: '1 cm, 2 cm, 5 cm', category: 'cat-invalid' },
      { id: 'ts2-8', label: '3 cm, 3 cm, 7 cm', category: 'cat-invalid' },
      { id: 'ts2-9', label: '2 cm, 4 cm, 6 cm', category: 'cat-invalid' },
      { id: 'ts2-10', label: '5 cm, 5 cm, 10 cm', category: 'cat-invalid' },
      { id: 'ts2-11', label: '2 cm, 2 cm, 5 cm', category: 'cat-invalid' },
      { id: 'ts2-12', label: '4 cm, 5 cm, 11 cm', category: 'cat-invalid' }
    ]
  },
  3: {
    title: '3. Szint: Szimmetriatengelyek Száma',
    subtitle: 'Csoportosítsd a háromszögeket a szimmetriatengelyeik száma szerint!',
    categories: [
      {
        id: 'cat-axis0',
        name: '0 szimmetriatengely',
        description: 'Általános háromszögek, minden oldal különböző',
        badgeColor: 'bg-slate-100 text-slate-900 border-slate-300'
      },
      {
        id: 'cat-axis1',
        name: '1 szimmetriatengely',
        description: 'Egyenlő szárú, nem szabályos háromszögek',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-axis3',
        name: '3 szimmetriatengely',
        description: 'Szabályos (egyenlő oldalú) háromszögek',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ],
    items: [
      // 0 tengely
      { id: 'ts3-1', label: 'Különböző oldalú hegyesszögű háromszög', category: 'cat-axis0' },
      { id: 'ts3-2', label: 'Különböző oldalú derékszögű háromszög', category: 'cat-axis0' },
      { id: 'ts3-3', label: 'Különböző oldalú tompaszögű háromszög', category: 'cat-axis0' },
      // 1 tengely
      { id: 'ts3-4', label: 'Egyenlő szárú hegyesszögű háromszög', category: 'cat-axis1' },
      { id: 'ts3-5', label: 'Egyenlő szárú derékszögű háromszög', category: 'cat-axis1' },
      { id: 'ts3-6', label: 'Egyenlő szárú tompaszögű háromszög', category: 'cat-axis1' },
      { id: 'ts3-7', label: 'Háromszög, melynek alaphoz húzott magassága szögfelező', category: 'cat-axis1' },
      // 3 tengely
      { id: 'ts3-8', label: 'Szabályos háromszög', category: 'cat-axis3' },
      { id: 'ts3-9', label: 'Egyenlő oldalú háromszög', category: 'cat-axis3' },
      { id: 'ts3-10', label: 'Háromszög, melynek mindhárom magasságvonala szimmetriatengely', category: 'cat-axis3' }
    ]
  }
};

export const TrianglesSorter: React.FC<TrianglesSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-bevezetes-geometriaba',
  topicTitle = 'Általános és szimmetrikus háromszögek'
}) => {
  return (
    <SorterTemplate
      level={level}
      currentLevel={currentLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="blue"
      storageKey="grade9-triangles-sorter"
      levels={sorterLevels}
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • CSOPORTOSÍTÓ JÁTÉK"
    />
  );
};

