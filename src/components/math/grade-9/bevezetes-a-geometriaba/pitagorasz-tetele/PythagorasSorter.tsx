import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PythagorasSorterProps {
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
    title: '1. Szint: Háromszögek Szögfajtája az Oldalak Alapján',
    subtitle: 'Döntsd el a megadott oldalhosszakról a Pitagorasz-tétel megfordítása alapján a háromszög típusát!',
    categories: [
      {
        id: 'cat-acute',
        name: 'Hegyesszögű (a² + b² > c²)',
        description: 'A két rövidebb oldal négyzetösszege nagyobb a leghosszabb négyzeténél',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-right',
        name: 'Derékszögű (a² + b² = c²)',
        description: 'Teljesül a Pitagorasz-tétel',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-obtuse',
        name: 'Tompaszögű (a² + b² < c²)',
        description: 'A két rövidebb oldal négyzetösszege kisebb a leghosszabb négyzeténél',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Hegyesszögű
      { id: 'ps1-1', label: '4 cm, 5 cm, 6 cm', category: 'cat-acute' },
      { id: 'ps1-2', label: '6 cm, 7 cm, 8 cm', category: 'cat-acute' },
      { id: 'ps1-3', label: '5 cm, 5 cm, 5 cm', category: 'cat-acute' },
      { id: 'ps1-4', label: '7 cm, 8 cm, 10 cm', category: 'cat-acute' },
      // Derékszögű
      { id: 'ps1-5', label: '3 cm, 4 cm, 5 cm', category: 'cat-right' },
      { id: 'ps1-6', label: '5 cm, 12 cm, 13 cm', category: 'cat-right' },
      { id: 'ps1-7', label: '6 cm, 8 cm, 10 cm', category: 'cat-right' },
      { id: 'ps1-8', label: '8 cm, 15 cm, 17 cm', category: 'cat-right' },
      // Tompaszögű
      { id: 'ps1-9', label: '3 cm, 5 cm, 7 cm', category: 'cat-obtuse' },
      { id: 'ps1-10', label: '4 cm, 6 cm, 9 cm', category: 'cat-obtuse' },
      { id: 'ps1-11', label: '2 cm, 3 cm, 4 cm', category: 'cat-obtuse' },
      { id: 'ps1-12', label: '6 cm, 9 cm, 13 cm', category: 'cat-obtuse' }
    ]
  },
  2: {
    title: '2. Szint: Számhármasok Csoportosítása',
    subtitle: 'Válogasd szét a primitív, többszörös és nem pitagoraszi számhármasokat!',
    categories: [
      {
        id: 'cat-primitive',
        name: 'Primitív Pitagoraszi Számhármas',
        description: 'Derékszögű háromszög egész oldalai, melyek legnagyobb közös osztója 1',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-multiple',
        name: 'Számhármas Többszöröse (k > 1)',
        description: 'Egy alap pitagoraszi számhármas egész számszorosa',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-not-pyth',
        name: 'Nem Pitagoraszi Számhármas',
        description: 'Az a² + b² = c² nem teljesül rájuk',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Primitív
      { id: 'ps2-1', label: '(3, 4, 5)', category: 'cat-primitive' },
      { id: 'ps2-2', label: '(5, 12, 13)', category: 'cat-primitive' },
      { id: 'ps2-3', label: '(8, 15, 17)', category: 'cat-primitive' },
      { id: 'ps2-4', label: '(7, 24, 25)', category: 'cat-primitive' },
      // Többszörös
      { id: 'ps2-5', label: '(6, 8, 10)', category: 'cat-multiple' },
      { id: 'ps2-6', label: '(9, 12, 15)', category: 'cat-multiple' },
      { id: 'ps2-7', label: '(10, 24, 26)', category: 'cat-multiple' },
      { id: 'ps2-8', label: '(15, 20, 25)', category: 'cat-multiple' },
      // Nem pitagoraszi
      { id: 'ps2-9', label: '(4, 5, 6)', category: 'cat-not-pyth' },
      { id: 'ps2-10', label: '(5, 7, 9)', category: 'cat-not-pyth' },
      { id: 'ps2-11', label: '(7, 10, 12)', category: 'cat-not-pyth' },
      { id: 'ps2-12', label: '(8, 10, 15)', category: 'cat-not-pyth' }
    ]
  },
  3: {
    title: '3. Szint: Képletek és Ismeretlenek Meghatározása',
    subtitle: 'Rendszerezd az összefüggéseket a keresett geometriai mennyiség szerint!',
    categories: [
      {
        id: 'cat-hypotenuse',
        name: 'Átfogó vagy Átló Keresése',
        description: 'Négyzetösszegből gyökvonás: c = √(a² + b²)',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-leg',
        name: 'Befogó vagy Magasság Keresése',
        description: 'Négyzetkülönbségből gyökvonás: a = √(c² - b²)',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-area',
        name: 'Területi Összefüggés',
        description: 'Négyzetek területeinek kapcsolata',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Átfogó / Átló
      { id: 'ps3-1', label: 'Derékszögű háromszögben: c = √(a² + b²)', category: 'cat-hypotenuse' },
      { id: 'ps3-2', label: 'Téglalapban az oldalakból: d = √(a² + b²)', category: 'cat-hypotenuse' },
      { id: 'ps3-3', label: 'Négyzetben az oldalból: d = a · √2', category: 'cat-hypotenuse' },
      { id: 'ps3-4', label: 'Két pont között a síkon: d = √((x₂ - x₁)² + (y₂ - y₁)²)', category: 'cat-hypotenuse' },
      // Befogó / Magasság
      { id: 'ps3-5', label: 'Derékszögű háromszögben: b = √(c² - a²)', category: 'cat-leg' },
      { id: 'ps3-6', label: 'Egyenlő szárú háromszögben: m = √(b² - (a/2)²)', category: 'cat-leg' },
      { id: 'ps3-7', label: 'Szabályos háromszögben: m = (a · √3) / 2', category: 'cat-leg' },
      { id: 'ps3-8', label: 'Körben a húr távolsága a középponttól: d = √(r² - (h/2)²)', category: 'cat-leg' },
      // Terület
      { id: 'ps3-9', label: 'Négyzetek között: T_c = T_a + T_b', category: 'cat-area' },
      { id: 'ps3-10', label: 'Négyzetek között: T_a = T_c - T_b', category: 'cat-area' }
    ]
  }
};

export const PythagorasSorter: React.FC<PythagorasSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-bevezetes-geometriaba',
  topicTitle = 'Pitagorasz tétele'
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
      storageKey="grade9-pythagoras-sorter"
      levels={sorterLevels}
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • CSOPORTOSÍTÓ JÁTÉK"
    />
  );
};
