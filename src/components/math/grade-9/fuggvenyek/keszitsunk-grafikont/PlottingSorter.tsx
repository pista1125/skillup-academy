import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PlottingSorterProps {
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
    title: '1. Szint: Pontilleszkedés az f(x) = 2x - 1 grafikonjára',
    subtitle: 'Számold ki f(x) értékét, és döntsd el, hogy a megadott pont rajta van-e az egyenesen!',
    categories: [
      {
        id: 'cat-on-graph',
        name: 'Rajta van a grafikonon',
        description: 'y = 2x - 1 pontosan teljesül a koordinátákra',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-off-graph',
        name: 'NINCS a grafikonon',
        description: 'y ≠ 2x - 1, a koordináták nem elégítik ki az egyenletet',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Rajta van: y = 2x - 1
      { id: 'ps1-1', label: 'P(0; -1) pont', category: 'cat-on-graph' },
      { id: 'ps1-2', label: 'Q(1; 1) pont', category: 'cat-on-graph' },
      { id: 'ps1-3', label: 'R(2; 3) pont', category: 'cat-on-graph' },
      { id: 'ps1-4', label: 'S(3; 5) pont', category: 'cat-on-graph' },
      { id: 'ps1-5', label: 'T(-1; -3) pont', category: 'cat-on-graph' },
      { id: 'ps1-6', label: 'U(5; 9) pont', category: 'cat-on-graph' },
      // Nincs rajta
      { id: 'ps1-7', label: 'A(0; 0) origó (mert 2·0 - 1 = -1 ≠ 0)', category: 'cat-off-graph' },
      { id: 'ps1-8', label: 'B(1; 2) pont (mert 2·1 - 1 = 1 ≠ 2)', category: 'cat-off-graph' },
      { id: 'ps1-9', label: 'C(2; 4) pont (mert 2·2 - 1 = 3 ≠ 4)', category: 'cat-off-graph' },
      { id: 'ps1-10', label: 'D(-2; -4) pont (mert 2·(-2) - 1 = -5 ≠ -4)', category: 'cat-off-graph' },
      { id: 'ps1-11', label: 'E(3; 6) pont (mert 2·3 - 1 = 5 ≠ 6)', category: 'cat-off-graph' },
      { id: 'ps1-12', label: 'F(-1; 1) pont (mert 2·(-1) - 1 = -3 ≠ 1)', category: 'cat-off-graph' }
    ]
  },
  2: {
    title: '2. Szint: Diszkrét vs. Folytonos Grafikon Ábrázolás',
    subtitle: 'Sorold be a szituációkat: különálló pontokként kell ábrázolni, vagy folytonos vonallal kötjük össze?',
    categories: [
      {
        id: 'cat-discrete',
        name: 'Diszkrét Pontok (Tilos összekötni)',
        description: 'A független változó csak diszkrét egészeket/darabszámokat vehet fel',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-continuous',
        name: 'Folytonos Vonal / Görbe',
        description: 'A független változó folytonos tartományon (ℝ) van értelmezve',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ],
    items: [
      // Diszkrét
      { id: 'ps2-1', label: 'Mozi belépőjegyek száma és a fizetendő összeg', category: 'cat-discrete' },
      { id: 'ps2-2', label: 'Függvény hozzárendelés D_f = ℤ értelmezési tartománnyal', category: 'cat-discrete' },
      { id: 'ps2-3', label: 'Egy osztály létszáma tanévenként az elmúlt 5 évben', category: 'cat-discrete' },
      { id: 'ps2-4', label: 'Dobókocka dobásának kimenetele és nyereményösszeg', category: 'cat-discrete' },
      { id: 'ps2-5', label: 'Vásárolt golyóstollak darabszáma és ára', category: 'cat-discrete' },
      { id: 'ps2-6', label: 'Buszon utazó személyek száma megállónként', category: 'cat-discrete' },
      // Folytonos
      { id: 'ps2-7', label: 'Egyenletesen haladó vonat út-idő grafikonja (s(t) = v · t)', category: 'cat-continuous' },
      { id: 'ps2-8', label: 'f(x) = 3x - 2, ahol D_f = ℝ', category: 'cat-continuous' },
      { id: 'ps2-9', label: 'Napi kinti hőmérséklet változása a 24 óra során', category: 'cat-continuous' },
      { id: 'ps2-10', label: 'Víztartály töltési magassága az idő függvényében', category: 'cat-continuous' },
      { id: 'ps2-11', label: 'f(x) = x², ahol D_f = [-3; 3]', category: 'cat-continuous' },
      { id: 'ps2-12', label: 'Felforralt víz lehűlési folyamatának hőmérséklet-görbéje', category: 'cat-continuous' }
    ]
  },
  3: {
    title: '3. Szint: Grafikon Alakja Képlet Alapján',
    subtitle: 'Egyenes vagy nem egyenes (görbe/törött vonal) a megadott függvény grafikonja?',
    categories: [
      {
        id: 'cat-line',
        name: 'Egyenes Vonal (Lineáris)',
        description: 'Elsőfokú vagy konstans függvény (f(x) = mx + b)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-non-line',
        name: 'Görbe vagy Törött Vonal (Nem lineáris)',
        description: 'Másodfokú, abszolútértékes, tört- vagy gyökfüggvény',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // Egyenes
      { id: 'ps3-1', label: 'f(x) = 2x - 5', category: 'cat-line' },
      { id: 'ps3-2', label: 'f(x) = -x + 3', category: 'cat-line' },
      { id: 'ps3-3', label: 'f(x) = 4 (konstans függvény)', category: 'cat-line' },
      { id: 'ps3-4', label: 'f(x) = 0.5x', category: 'cat-line' },
      { id: 'ps3-5', label: 'f(x) = -3x', category: 'cat-line' },
      { id: 'ps3-6', label: 'f(x) = (2x + 6) / 2', category: 'cat-line' },
      // Görbe vagy törött vonal
      { id: 'ps3-7', label: 'f(x) = x² - 2x + 1 (parabola)', category: 'cat-non-line' },
      { id: 'ps3-8', label: 'f(x) = |x - 3| (V alakú törött vonal)', category: 'cat-non-line' },
      { id: 'ps3-9', label: 'f(x) = 1 / x (hiperbola ágak)', category: 'cat-non-line' },
      { id: 'ps3-10', label: 'f(x) = √x (fekvő félparabola ív)', category: 'cat-non-line' },
      { id: 'ps3-11', label: 'f(x) = -x² + 4 (lefelé nyíló parabola)', category: 'cat-non-line' },
      { id: 'ps3-12', label: 'f(x) = 2|x| + 1 (törött vonal)', category: 'cat-non-line' }
    ]
  }
};

export const PlottingSorter: React.FC<PlottingSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'keszitsunk-grafikont',
  topicTitle = 'Készítsünk grafikont!'
}) => {
  const activeLevel = (currentLevel ?? level) as DifficultyLevel;

  return (
    <SorterTemplate
      level={activeLevel}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      activityType="g9-func-grafikon-sorter"
    />
  );
};

