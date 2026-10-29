import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TriangleLines1SorterProps {
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
    title: '1. Szint: Körülírt Kör és Beírt Kör Tulajdonságai',
    subtitle: 'Sorold be a tulajdonságokat a körülírt kör (O) vagy a beírt kör (I) alá!',
    categories: [
      {
        id: 'cat-circum',
        name: 'Körülírt Kör (O pont)',
        description: 'Oldalfelező merőlegesek metszéspontja, csúcsoktól egyenlő távol',
        badgeColor: 'bg-violet-100 text-violet-900 border-violet-300'
      },
      {
        id: 'cat-incircle',
        name: 'Beírt Kör (I pont)',
        description: 'Belső szögfelezők metszéspontja, oldalaktól egyenlő távol',
        badgeColor: 'bg-pink-100 text-pink-900 border-pink-300'
      },
      {
        id: 'cat-both',
        name: 'Mindkét Körre Igaz Tulajdonság',
        description: 'Közös geometriai alaptulajdonságok',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      // Körülírt kör
      { id: 'ls1-1', label: 'Az oldalfelező merőlegesek metszéspontja határozza meg', category: 'cat-circum' },
      { id: 'ls1-2', label: 'Mindhárom csúcstól egyenlő távolságra van', category: 'cat-circum' },
      { id: 'ls1-3', label: 'Derékszögű háromszög esetén az átfogó felezőpontja', category: 'cat-circum' },
      { id: 'ls1-4', label: 'Tompaszögű háromszög esetén a háromszögön kívül található', category: 'cat-circum' },
      // Beírt kör
      { id: 'ls1-5', label: 'A belső szögfelezők metszéspontja határozza meg', category: 'cat-incircle' },
      { id: 'ls1-6', label: 'Mindhárom oldaltól egyenlő távolságra van', category: 'cat-incircle' },
      { id: 'ls1-7', label: 'Kivétel nélkül MINDEN háromszög esetén a háromszög belsejében van', category: 'cat-incircle' },
      { id: 'ls1-8', label: 'Sugara kiszámítható a területből: r = T / s', category: 'cat-incircle' },
      // Mindkettőre igaz
      { id: 'ls1-9', label: 'Szabályos háromszög esetén egybeesik a súlyponttal és a magasságponttal', category: 'cat-both' },
      { id: 'ls1-10', label: 'Egyenlő szárú háromszögben az alaphoz tartozó szimmetriatengelyre esik', category: 'cat-both' },
      { id: 'ls1-11', label: 'Minden síkbeli háromszöghöz pontosan egy létezik belőle', category: 'cat-both' },
      { id: 'ls1-12', label: 'Szerkesztéséhez elegendő 2 vonal metszéspontját megkeresni', category: 'cat-both' }
    ]
  },
  2: {
    title: '2. Szint: Az O Pont Elhelyezkedése a Háromszög Típusa Szerint',
    subtitle: 'Csoportosítsd a háromszögeket aszerint, hogy hová esik a körülírt kör középpontja (O)!',
    categories: [
      {
        id: 'cat-inside',
        name: 'Háromszögön Belül van az O',
        description: 'Hegyesszögű háromszögek (minden szög < 90°)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-boundary',
        name: 'Az Átfogó Felezőpontján van az O',
        description: 'Derékszögű háromszögek (egy szög = 90°)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-outside',
        name: 'Háromszögön Kívül van az O',
        description: 'Tompaszögű háromszögek (egy szög > 90°)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Belül
      { id: 'ls2-1', label: 'Szabályos háromszög', category: 'cat-inside' },
      { id: 'ls2-2', label: 'Szögei: 50°, 60°, 70°', category: 'cat-inside' },
      { id: 'ls2-3', label: 'Oldalai: 4 cm, 5 cm, 6 cm', category: 'cat-inside' },
      { id: 'ls2-4', label: 'Egyenlő szárú háromszög 40°-os szárszöggel', category: 'cat-inside' },
      // Határon (átfogón)
      { id: 'ls2-5', label: 'Oldalai: 3 cm, 4 cm, 5 cm', category: 'cat-boundary' },
      { id: 'ls2-6', label: 'Félszabályos háromszög', category: 'cat-boundary' },
      { id: 'ls2-7', label: 'Egyenlő szárú derékszögű háromszög', category: 'cat-boundary' },
      { id: 'ls2-8', label: 'Oldalai: 5 cm, 12 cm, 13 cm', category: 'cat-boundary' },
      // Kívül
      { id: 'ls2-9', label: 'Szögei: 110°, 40°, 30°', category: 'cat-outside' },
      { id: 'ls2-10', label: 'Oldalai: 3 cm, 5 cm, 7 cm', category: 'cat-outside' },
      { id: 'ls2-11', label: 'Egyenlő szárú háromszög 120°-os szárszöggel', category: 'cat-outside' },
      { id: 'ls2-12', label: 'Oldalai: 2 cm, 3 cm, 4 cm', category: 'cat-outside' }
    ]
  },
  3: {
    title: '3. Szint: Képletek és Távolsági Relációk',
    subtitle: 'Rendszerezd az összefüggéseket a keresett sugár vagy arány szerint!',
    categories: [
      {
        id: 'cat-R-formulas',
        name: 'Körülírt Kör Sugara (R)',
        description: 'Átfogóból vagy szinuszos képletből',
        badgeColor: 'bg-violet-100 text-violet-900 border-violet-300'
      },
      {
        id: 'cat-r-formulas',
        name: 'Beírt Kör Sugara (r)',
        description: 'Területből (T/s) vagy érintőszakaszokból',
        badgeColor: 'bg-pink-100 text-pink-900 border-pink-300'
      },
      {
        id: 'cat-bisector-ratio',
        name: 'Szögfelező Osztásarány',
        description: 'Szemközti oldal felosztása',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // R képletek
      { id: 'ls3-1', label: 'Derékszögű háromszögben: R = c / 2', category: 'cat-R-formulas' },
      { id: 'ls3-2', label: 'Szabályos háromszögben: R = (2/3) · m = (a · √3) / 3', category: 'cat-R-formulas' },
      { id: 'ls3-3', label: 'Általános képlet a területtel: R = (a · b · c) / (4T)', category: 'cat-R-formulas' },
      { id: 'ls3-4', label: 'Távolság a csúcsoktól: |OA| = |OB| = |OC| = R', category: 'cat-R-formulas' },
      // r képletek
      { id: 'ls3-5', label: 'Derékszögű háromszögben: r = (a + b - c) / 2', category: 'cat-r-formulas' },
      { id: 'ls3-6', label: 'Bármely háromszögben: r = T / s', category: 'cat-r-formulas' },
      { id: 'ls3-7', label: 'Szabályos háromszögben: r = (1/3) · m = (a · √3) / 6', category: 'cat-r-formulas' },
      { id: 'ls3-8', label: 'Távolság az oldalaktól: d(I, a) = d(I, b) = d(I, c) = r', category: 'cat-r-formulas' },
      // Szögfelező
      { id: 'ls3-9', label: 'Szögfelező aránya: x / y = b / c', category: 'cat-bisector-ratio' },
      { id: 'ls3-10', label: 'A belső szögfelező a szemközti oldalt a szomszédos oldalak arányában osztja', category: 'cat-bisector-ratio' }
    ]
  }
};

export const TriangleLines1Sorter: React.FC<TriangleLines1SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-bevezetes-geometriaba',
  topicTitle = 'A háromszög nevezetes vonalai és pontjai I.'
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
      themeColor="purple"
      storageKey="grade9-triangle-lines-1-sorter"
      levels={sorterLevels}
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • CSOPORTOSÍTÓ JÁTÉK"
    />
  );
};

