import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface DiscriminantSorterProps {
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
    title: 'Egyenletek csoportosítása a valós gyökök száma szerint',
    subtitle: 'Számítsd ki vagy becsüld meg a diszkrimináns előjelét, és válogasd be az egyenletet a megfelelő kategóriába!',
    categories: [
      {
        id: 'cat-two',
        name: '2 különböző valós gyök',
        description: 'D > 0, a megoldóképlet ±√D része két különböző értéket ad.',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-one',
        name: '1 valós gyök (kettős gyök)',
        description: 'D = 0, a polinom teljes négyzetté alakítható: a(x - x₀)² = 0.',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-zero',
        name: '0 valós gyök (nincs megoldás)',
        description: 'D < 0, a valós számok halmazán a négyzetgyökvonás nem végezhető el.',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'ds1-1', content: 'x² - 5x + 6 = 0  (D = 25 - 24 = 1)', categoryId: 'cat-two' },
      { id: 'ds1-2', content: 'x² - 6x + 9 = 0  (D = 36 - 36 = 0)', categoryId: 'cat-one' },
      { id: 'ds1-3', content: 'x² + 2x + 5 = 0  (D = 4 - 20 = -16)', categoryId: 'cat-zero' },
      { id: 'ds1-4', content: '2x² - 3x - 5 = 0  (D = 9 + 40 = 49)', categoryId: 'cat-two' },
      { id: 'ds1-5', content: '4x² - 12x + 9 = 0  (D = 144 - 144 = 0)', categoryId: 'cat-one' },
      { id: 'ds1-6', content: '3x² - x + 2 = 0  (D = 1 - 24 = -23)', categoryId: 'cat-zero' },
      { id: 'ds1-7', content: 'x² - 9 = 0  (D = 0 - 4(1)(-9) = 36)', categoryId: 'cat-two' },
      { id: 'ds1-8', content: 'x² + 16 = 0  (D = 0 - 64 = -64)', categoryId: 'cat-zero' },
      { id: 'ds1-9', content: '9x² + 6x + 1 = 0  (D = 36 - 36 = 0)', categoryId: 'cat-one' },
      { id: 'ds1-10', content: '-x² + 4x - 3 = 0  (D = 16 - 12 = 4)', categoryId: 'cat-two' }
    ]
  },
  2: {
    title: 'A parabola és az x-tengely kölcsönös helyzete',
    subtitle: 'Csoportosítsd a grafikus vagy algebrai feltételeket a parabola és az x-tengely metszéspontjainak száma szerint!',
    categories: [
      {
        id: 'cat-secant',
        name: '2 metszéspont (szelő)',
        description: 'A parabola átlépi az x-tengelyt, az egyenletnek két különböző valós gyöke van.',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-tangent',
        name: '1 érintési pont (érintő)',
        description: 'A parabola csúcspontja az x-tengelyre esik, az egyenletnek egyetlen valós gyöke van.',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-exterior',
        name: '0 közös pont (elkerülő)',
        description: 'A parabola teljesen a tengely felett vagy alatt halad, nincs valós gyök.',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'ds2-1', content: 'y = (x - 2)²  ⟹ Csúcs (2; 0) az x-tengelyen', categoryId: 'cat-tangent' },
      { id: 'ds2-2', content: 'y = x² - 4  ⟹ Csúcs (0; -4), felfelé nyílik', categoryId: 'cat-secant' },
      { id: 'ds2-3', content: 'y = x² + 3  ⟹ Csúcs (0; 3), felfelé nyílik (lebeg)', categoryId: 'cat-exterior' },
      { id: 'ds2-4', content: 'D = b² - 4ac > 0 bármely másodfokú görbénél', categoryId: 'cat-secant' },
      { id: 'ds2-5', content: 'y = -(x + 1)²  ⟹ Csúcs (-1; 0), lefelé nyílik', categoryId: 'cat-tangent' },
      { id: 'ds2-6', content: 'y = -x² - 5  ⟹ Csúcs (0; -5), lefelé nyílik (süllyed)', categoryId: 'cat-exterior' },
      { id: 'ds2-7', content: 'Csúcspont magassága: y_C = 0', categoryId: 'cat-tangent' },
      { id: 'ds2-8', content: 'a > 0 és a csúcspont y-koordinátája negatív (y_C < 0)', categoryId: 'cat-secant' },
      { id: 'ds2-9', content: 'a > 0 és D < 0 (minden x-re szigorúan pozitív)', categoryId: 'cat-exterior' },
      { id: 'ds2-10', content: 'a · c < 0 feltétel teljesül (ellentétes előjelű együtthatók)', categoryId: 'cat-secant' }
    ]
  },
  3: {
    title: 'Igaz vagy Hamis állítások a diszkriminánsról',
    subtitle: 'Döntsd el minden állításról, hogy matematikailag mindig igaz, vagy hamis/félrevezető!',
    categories: [
      {
        id: 'cat-true',
        name: 'Mindig IGAZ',
        description: 'Minden valós együtthatós másodfokú egyenletre érvényes matematikai tétel.',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-false',
        name: 'HAMIS / Megtévesztő',
        description: 'Helytelen állítás, fogalmi tévedés vagy nem általánosan igaz szabály.',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'ds3-1', content: 'Ha a és c ellentétes előjelűek (ac < 0), akkor D biztosan szigorúan pozitív.', categoryId: 'cat-true' },
      { id: 'ds3-2', content: 'Ha D = 0, akkor az egyenletnek egyáltalán nincs megoldása.', categoryId: 'cat-false' },
      { id: 'ds3-3', content: 'A diszkrimináns képletében a b² tag értéke semmilyen valós b esetén sem lehet negatív.', categoryId: 'cat-true' },
      { id: 'ds3-4', content: 'Ha D < 0, akkor a másodfokú egyenlet mindkét gyöke negatív szám.', categoryId: 'cat-false' },
      { id: 'ds3-5', content: 'Ha D = 0, akkor a másodfokú kifejezés felírható a(x - x₀)² teljes négyzet alakban.', categoryId: 'cat-true' },
      { id: 'ds3-6', content: 'A diszkrimináns értéke megegyezik a két gyök összegével.', categoryId: 'cat-false' },
      { id: 'ds3-7', content: 'Ha D > 0, akkor a parabola biztosan két különböző pontban metszi az x-tengelyt.', categoryId: 'cat-true' },
      { id: 'ds3-8', content: 'Egy másodfokú egyenletnek lehet pontosan három különböző valós gyöke is.', categoryId: 'cat-false' },
      { id: 'ds3-9', content: 'Ha a > 0 és D < 0, akkor az ax² + bx + c kifejezés értéke minden valós x-re pozitív.', categoryId: 'cat-true' },
      { id: 'ds3-10', content: 'Ha c = 0, akkor D = b², ami mindig nemnegatív, így legalább egy valós gyök mindig van.', categoryId: 'cat-true' }
    ]
  }
};

export const DiscriminantSorter: React.FC<DiscriminantSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-quad-diszkriminans',
  topicTitle = 'A másodfokú egyenlet diszkriminánsa'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <SorterTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfigs={sorterLevels}
    />
  );
};

