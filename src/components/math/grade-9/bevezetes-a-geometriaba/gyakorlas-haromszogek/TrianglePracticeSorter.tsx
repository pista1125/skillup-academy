import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TrianglePracticeSorterProps {
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

export const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Háromszögek Fajtái a Szögek Szerint',
    subtitle: 'Válogasd szét a tulajdonságokat hegyesszögű, derékszögű vagy tompaszögű kategóriákba!',
    categories: [
      {
        id: 'cat-acute',
        name: 'Hegyesszögű',
        description: 'Minden szöge kisebb 90°-nál',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-right',
        name: 'Derékszögű',
        description: 'Pontosan egy 90°-os szöge van',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-obtuse',
        name: 'Tompaszögű',
        description: 'Egy szöge nagyobb 90°-nál',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Hegyesszögű
      { id: 'tps1-1', label: 'Magasságpontja és körülírt kör középpontja is a belső tartományban van', category: 'cat-acute' },
      { id: 'tps1-2', label: 'Mindhárom belső szöge 90°-nál kisebb', category: 'cat-acute' },
      { id: 'tps1-3', label: 'A leghosszabb oldalra: a² + b² > c²', category: 'cat-acute' },

      // Derékszögű
      { id: 'tps1-4', label: 'Magasságpontja pontosan a derékszögű csúccsal esik egybe', category: 'cat-right' },
      { id: 'tps1-5', label: 'Körülírt kör középpontja az átfogó felezőpontja', category: 'cat-right' },
      { id: 'tps1-6', label: 'Érvényes rá a Pitagorasz-tétel: a² + b² = c²', category: 'cat-right' },
      { id: 'tps1-7', label: 'Beírt kör sugara: r = (a + b - c) / 2', category: 'cat-right' },

      // Tompaszögű
      { id: 'tps1-8', label: 'Magasságpontja és körülírt kör középpontja a háromszögön KÍVÜL van', category: 'cat-obtuse' },
      { id: 'tps1-9', label: 'Egyik belső szöge nagyobb 90°-nál', category: 'cat-obtuse' },
      { id: 'tps1-10', label: 'A leghosszabb oldalra: a² + b² < c²', category: 'cat-obtuse' }
    ]
  },
  2: {
    title: '2. Szint: Szerkeszthető Háromszög vagy Nem Létező?',
    subtitle: 'Válogasd szét az adathalmazokat aszerint, hogy létezhet-e ilyen síkbeli háromszög!',
    categories: [
      {
        id: 'cat-valid',
        name: 'Szerkeszthető / Valós Háromszög',
        description: 'Teljesül a háromszög-egyenlőtlenség és a szögösszeg (180°)',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-invalid',
        name: 'Nem Szerkeszthető / Hibás Adatok',
        description: 'Sérti a háromszög-egyenlőtlenséget vagy a 180°-os összeget',
        badgeColor: 'bg-red-100 text-red-900 border-red-300'
      }
    ],
    items: [
      // Szerkeszthető
      { id: 'tps2-1', label: 'Oldalai: 3 cm, 4 cm, 5 cm', category: 'cat-valid' },
      { id: 'tps2-2', label: 'Oldalai: 7 cm, 8 cm, 10 cm', category: 'cat-valid' },
      { id: 'tps2-3', label: 'Szögei: 45°, 45°, 90°', category: 'cat-valid' },
      { id: 'tps2-4', label: 'Oldalai: 6 cm, 6 cm, 6 cm', category: 'cat-valid' },
      { id: 'tps2-5', label: 'Szögei: 50°, 60°, 70°', category: 'cat-valid' },

      // Nem szerkeszthető
      { id: 'tps2-6', label: 'Oldalai: 2 cm, 3 cm, 6 cm', category: 'cat-invalid' },
      { id: 'tps2-7', label: 'Oldalai: 1 cm, 2 cm, 3 cm', category: 'cat-invalid' },
      { id: 'tps2-8', label: 'Szögei: 60°, 70°, 80°', category: 'cat-invalid' },
      { id: 'tps2-9', label: 'Szögei: 40°, 50°, 80°', category: 'cat-invalid' },
      { id: 'tps2-10', label: 'Oldalai: 4 cm, 5 cm, 12 cm', category: 'cat-invalid' }
    ]
  },
  3: {
    title: '3. Szint: Témakörök Képletcsoportosítása',
    subtitle: 'Rendszerezd az összefüggéseket a geometriai témakörök szerint!',
    categories: [
      {
        id: 'cat-angle-rules',
        name: 'Szögek és Külső Szögek',
        description: 'Belső szögösszeg, mellékszögek és külső szögek',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-pyth-rules',
        name: 'Pitagorasz és Magasságok',
        description: 'Derékszögű felbontás, szárak és magasságok',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-points-rules',
        name: 'Nevezetes Pontok és Körök',
        description: 'Súlypont aránya, körülírt és beírt sugár, Euler-egyenes',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // Szögek
      { id: 'tps3-1', label: 'α + β + γ = 180°', category: 'cat-angle-rules' },
      { id: 'tps3-2', label: 'α\' = β + γ', category: 'cat-angle-rules' },
      { id: 'tps3-3', label: 'α + α\' = 180°', category: 'cat-angle-rules' },
      { id: 'tps3-4', label: 'α\' + β\' + γ\' = 360°', category: 'cat-angle-rules' },

      // Pitagorasz
      { id: 'tps3-5', label: 'a² + b² = c²', category: 'cat-pyth-rules' },
      { id: 'tps3-6', label: 'm_a² + (a/2)² = b²', category: 'cat-pyth-rules' },
      { id: 'tps3-7', label: 'm = (a · √3) / 2', category: 'cat-pyth-rules' },

      // Nevezetes pontok
      { id: 'tps3-8', label: '|AS| = 2/3 · s_a', category: 'cat-points-rules' },
      { id: 'tps3-9', label: 'R = c / 2', category: 'cat-points-rules' },
      { id: 'tps3-10', label: 'r = (a + b - c) / 2', category: 'cat-points-rules' },
      { id: 'tps3-11', label: '|MS| = 2 · |SO|', category: 'cat-points-rules' }
    ]
  }
};

export const TrianglePracticeSorter: React.FC<TrianglePracticeSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-bevezetes-geometriaba',
  topicTitle = 'Gyakorlás (Háromszögek)'
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
      themeColor="amber"
      storageKey="grade9-triangle-practice-sorter"
      levels={sorterLevels}
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • CSOPORTOSÍTÓ JÁTÉK"
    />
  );
};

