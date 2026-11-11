import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetCard } from '../QuizTemplate';
import { DiscriminantMatcher } from './DiscriminantMatcher';
import { DiscriminantSorter } from './DiscriminantSorter';
import {
  DiscriminantCasesSvg,
  DiscriminantFormulaSvg,
  DiscriminantParabolaFamilySvg,
  SignOfQuadraticSvg
} from './DiscriminantFigures';

interface DiscriminantQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    title: 'A diszkrimináns fogalma és képlete',
    description: 'D = b² - 4ac. A megoldóképlet gyökjel alatti része. Mindig ügyelj a zárójelezésre: b² sosem negatív!',
    note: 'Ha a és c ellentétes előjelűek (ac < 0), akkor -4ac > 0, így D biztosan pozitív: garantált a 2 valós gyök!',
    color: 'from-purple-500 to-indigo-600',
    figure: <DiscriminantFormulaSvg size={220} />
  },
  {
    title: 'A gyökök száma a D előjele alapján',
    description: 'D > 0: 2 különböző valós gyök. D = 0: 1 kettős gyök (x = -b/(2a)). D < 0: nincs valós gyök (x ∈ ∅).',
    note: 'D = 0 esetén a polinom teljes négyzetté alakítható: ax² + bx + c = a(x - x₀)² = 0.',
    color: 'from-emerald-500 to-teal-600',
    figure: <DiscriminantCasesSvg size={220} />
  },
  {
    title: 'Geometriai kapcsolat a parabolával',
    description: 'A parabola csúcspontjának magassága: y_C = -D / (4a). D > 0: 2 metszéspont. D = 0: 1 érintési pont. D < 0: elkerülő (lebeg/süllyed).',
    note: 'A c konstans változtatása a parabolát függőlegesen tolja el, így változtatva a tengelymetszetek számát.',
    color: 'from-amber-500 to-orange-600',
    figure: <DiscriminantParabolaFamilySvg size={220} />
  },
  {
    title: 'Állandó előjelű másodfokú polinomok',
    description: 'Ha D < 0, a polinom nem vált előjelet: a > 0 és D < 0 ⟹ mindig pozitív. a < 0 és D < 0 ⟹ mindig negatív.',
    note: 'Alapvető tétel a törtek előjelvizsgálatánál és a négyzetgyökös kifejezések értelmezési tartományának meghatározásakor.',
    color: 'from-rose-500 to-red-600',
    figure: <SignOfQuadraticSvg size={220} />
  }
];

const quizLevels: Record<number, QuizLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Diszkrimináns számítása és a 3 alapeset',
    subtitle: 'A D = b² - 4ac képlet alkalmazása, az előjelek és a valós gyökök számának meghatározása.',
    range: '1–10. feladat',
    focus: 'D kiszámítása és a gyökök létezése',
    questions: [
      {
        id: 'dq1-1',
        question: 'Mi a diszkrimináns pontos képlete az ax² + bx + c = 0 másodfokú egyenletben?',
        options: [
          'D = b² - 4ac',
          'D = b² + 4ac',
          'D = -b ± 4ac',
          'D = 4ac - b²'
        ],
        correctAnswer: 0,
        explanation: 'A diszkrimináns a másodfokú megoldóképlet négyzetgyök alatti része: D = b² - 4ac.'
      },
      {
        id: 'dq1-2',
        question: 'Mennyi a diszkrimináns értéke az x² - 6x + 8 = 0 egyenletben?',
        options: [
          'D = 4',
          'D = -4',
          'D = 68',
          'D = 0'
        ],
        correctAnswer: 0,
        explanation: 'a = 1, b = -6, c = 8. Ekkor D = (-6)² - 4 · 1 · 8 = 36 - 32 = 4.'
      },
      {
        id: 'dq1-3',
        question: 'Mennyi a diszkriminánsa az x² + 4x + 4 = 0 egyenletnek?',
        options: [
          'D = 0',
          'D = 8',
          'D = 32',
          'D = -16'
        ],
        correctAnswer: 0,
        explanation: 'a = 1, b = 4, c = 4. Ekkor D = 4² - 4 · 1 · 4 = 16 - 16 = 0.'
      },
      {
        id: 'dq1-4',
        question: 'Mennyi a diszkriminánsa az x² + 2x + 5 = 0 egyenletnek?',
        options: [
          'D = -16',
          'D = +24',
          'D = +16',
          'D = 0'
        ],
        correctAnswer: 0,
        explanation: 'a = 1, b = 2, c = 5. Ekkor D = 2² - 4 · 1 · 5 = 4 - 20 = -16.'
      },
      {
        id: 'dq1-5',
        question: 'Hány valós gyöke van egy másodfokú egyenletnek, ha a diszkriminánsa D = 49?',
        options: [
          'Pontosan 2 különböző valós gyöke van',
          'Pontosan 1 valós gyöke van',
          'Nincs valós gyöke',
          'Végtelen sok gyöke van'
        ],
        correctAnswer: 0,
        explanation: 'Mivel D = 49 > 0, a √D = 7 elvégezhető, és a megoldóképletben a ±7 miatt két különböző valós gyököt kapunk.'
      },
      {
        id: 'dq1-6',
        question: 'Hány valós gyöke van az egyenletnek, ha D = 0?',
        options: [
          'Pontosan 1 valós gyöke van (két egybeeső / kettős gyök)',
          'Nincs megoldása',
          '2 különböző gyöke van',
          'Nem lehet eldönteni az a ismerete nélkül'
        ],
        correctAnswer: 0,
        explanation: 'Ha D = 0, a megoldóképletben ±√0 = ±0, így x₁ = x₂ = -b / (2a), azaz 1 valós (kettős) gyök létezik.'
      },
      {
        id: 'dq1-7',
        question: 'Hány valós gyöke van egy másodfokú egyenletnek, ha D = -25?',
        options: [
          '0 valós gyöke van (a valós számok körében nincs megoldás)',
          '2 negatív valós gyöke van',
          '1 valós gyöke van (x = -5)',
          '2 különböző valós gyöke van'
        ],
        correctAnswer: 0,
        explanation: 'A valós számok halmazán negatív számból nem vonhatunk négyzetgyököt (√(-25) ∉ ℝ), így az egyenletnek nincs valós gyöke.'
      },
      {
        id: 'dq1-8',
        question: 'Mennyi az x² - 5x = 0 hiányos másodfokú egyenlet diszkriminánsa?',
        options: [
          'D = 25',
          'D = 0',
          'D = -25',
          'D = 5'
        ],
        correctAnswer: 0,
        explanation: 'Itt a = 1, b = -5, c = 0. Ekkor D = (-5)² - 4 · 1 · 0 = 25 - 0 = 25.'
      },
      {
        id: 'dq1-9',
        question: 'Mennyi az x² - 16 = 0 hiányos egyenlet diszkriminánsa?',
        options: [
          'D = 64',
          'D = -64',
          'D = 0',
          'D = 16'
        ],
        correctAnswer: 0,
        explanation: 'Itt a = 1, b = 0, c = -16. Ekkor D = 0² - 4 · 1 · (-16) = +64.'
      },
      {
        id: 'dq1-10',
        question: 'Mennyi a 2x² - 3x - 2 = 0 egyenlet diszkriminánsa?',
        options: [
          'D = 25',
          'D = -7',
          'D = 7',
          'D = -23'
        ],
        correctAnswer: 0,
        explanation: 'a = 2, b = -3, c = -2. Ekkor D = (-3)² - 4 · 2 · (-2) = 9 - (-16) = 9 + 16 = 25.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Geometria, parabolák és gyökök tulajdonságai',
    subtitle: 'A parabola és az x-tengely metszéspontjai, a csúcspont és a diszkrimináns kapcsolata.',
    range: '11–20. feladat',
    focus: 'Grafikus jelentés és geometriai kapcsolatok',
    questions: [
      {
        id: 'dq2-1',
        question: 'Hány pontban metszi az f(x) = x² - 4x + 3 függvény grafikonja az x-tengelyt?',
        options: [
          '2 pontban (szelő)',
          '1 pontban (érintő)',
          '0 pontban (nem metszi)',
          '4 pontban'
        ],
        correctAnswer: 0,
        explanation: 'D = (-4)² - 4 · 1 · 3 = 16 - 12 = 4 > 0. Mivel D > 0, a grafikon 2 különböző pontban metszi az x-tengelyt (x₁ = 1, x₂ = 3).'
      },
      {
        id: 'dq2-2',
        question: 'Hogyan helyezkedik el az f(x) = x² - 6x + 9 függvény grafikonja az x-tengelyhez képest?',
        options: [
          'Érinti az x-tengelyt a csúcspontjában (x = 3-nál)',
          '2 pontban metszi a tengelyt',
          'Teljesen a tengely felett lebeg',
          'Metszi a negatív féltengelyt'
        ],
        correctAnswer: 0,
        explanation: 'D = (-6)² - 4 · 1 · 9 = 36 - 36 = 0. Mivel D = 0, a parabola csúcspontja (3; 0) pontosan az x-tengelyen van, azaz érinti azt.'
      },
      {
        id: 'dq2-3',
        question: 'Hogyan helyezkedik el az f(x) = x² + 2x + 7 parabola az x-tengelyhez képest?',
        options: [
          'Nem metszi és nem érinti a tengelyt (felette lebeg)',
          '2 pontban metszi',
          'Érinti a (0; 7) pontban',
          'Az x-tengely alatt halad'
        ],
        correctAnswer: 0,
        explanation: 'a = 1 > 0 (felfelé nyílik) és D = 4 - 28 = -24 < 0. Mivel D < 0, a parabola nem metszi és nem érinti az x-tengelyt, teljesen felette halad.'
      },
      {
        id: 'dq2-4',
        question: 'Ha egy másodfokú egyenlet diszkriminánsa D = 0, mennyi a gyök értéke az együtthatókkal kifejezve?',
        options: [
          'x = -b / (2a)',
          'x = b / (2a)',
          'x = -c / a',
          'x = 0'
        ],
        correctAnswer: 0,
        explanation: 'A megoldóképletből: x = (-b ± √0) / (2a) = -b / (2a).'
      },
      {
        id: 'dq2-5',
        question: 'Milyen szorzatalakba írható fel az ax² + bx + c polinom, ha D = 0?',
        options: [
          'a · (x - x₀)²',
          'a · (x - x₁) · (x - x₂)',
          'Nem alakítható szorzattá',
          '(ax + b)²'
        ],
        correctAnswer: 0,
        explanation: 'Ha D = 0, a két gyök egybeesik (x₁ = x₂ = x₀), így a polinom teljes négyzetté alakítható: a(x - x₀)².'
      },
      {
        id: 'dq2-6',
        question: 'Mit tudunk biztosan az ax² + bx + c = 0 egyenlet gyökeiről, ha a és c ellentétes előjelűek (a · c < 0)?',
        options: [
          'Biztosan van 2 különböző valós gyöke',
          'Biztosan nincs valós gyöke',
          'Biztosan 1 kettős gyöke van',
          'Csak akkor van gyöke, ha b = 0'
        ],
        correctAnswer: 0,
        explanation: 'Mivel b² ≥ 0 minden valós b-re, és ac < 0 miatt -4ac > 0, ezért D = b² + (-4ac) szigorúan pozitív (D > 0). Így mindig van 2 valós gyök!'
      },
      {
        id: 'dq2-7',
        question: 'Melyik egyenletnek van pontosan egy valós gyöke az alábbiak közül?',
        options: [
          'x² - 8x + 16 = 0',
          'x² - 8x + 15 = 0',
          'x² - 8x + 17 = 0',
          'x² - 8x = 0'
        ],
        correctAnswer: 0,
        explanation: 'x² - 8x + 16 = (x - 4)², diszkriminánsa D = 64 - 64 = 0, így pontosan egy valós gyöke van (x = 4).'
      },
      {
        id: 'dq2-8',
        question: 'Egy lefelé nyíló parabola (a < 0) csúcspontja az x-tengely alatt van (y_C < 0). Hány valós zérushelye van?',
        options: [
          '0 (nem metszi a tengelyt, D < 0)',
          '2 valós zérushelye van',
          '1 valós zérushelye van',
          'Végtelen sok'
        ],
        correctAnswer: 0,
        explanation: 'Mivel a csúcspont a tengely alatt van és a parabola lefelé nyílik, a görbe minden pontja az x-tengely alatt marad, sosem metszi azt, tehát 0 zérushelye van.'
      },
      {
        id: 'dq2-9',
        question: 'Mennyi a 3x² + 5 = 0 egyenlet diszkriminánsa?',
        options: [
          'D = -60',
          'D = +60',
          'D = 0',
          'D = 25'
        ],
        correctAnswer: 0,
        explanation: 'a = 3, b = 0, c = 5. Ekkor D = 0² - 4 · 3 · 5 = -60 < 0, tehát nincs valós gyök.'
      },
      {
        id: 'dq2-10',
        question: 'Milyen képlettel számítható ki a parabola csúcspontjának y-koordinátája a diszkrimináns segítségével?',
        options: [
          'y_C = -D / (4a)',
          'y_C = D / (2a)',
          'y_C = -b / (2a)',
          'y_C = √D / (4a)'
        ],
        correctAnswer: 0,
        explanation: 'A teljes négyzetté alakításból: ax² + bx + c = a(x + b/(2a))² + (c - b²/(4a)) = a(x + b/(2a))² - D/(4a). Így a csúcs y-koordinátája: y_C = -D / (4a).'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Paraméteres feladatok és emelt szintű vizsgálatok',
    subtitle: 'Paraméter meghatározása adott gyökszámhoz, állandó előjelűség és összetett problémák.',
    range: '21–30. feladat',
    focus: 'Paraméteres egyenletek és egyenlőtlenségek',
    questions: [
      {
        id: 'dq3-1',
        question: 'A p valós paraméter melyik értékére lesz az x² - 6x + p = 0 egyenletnek pontosan 1 valós gyöke?',
        options: [
          'p = 9',
          'p = 36',
          'p = -9',
          'p = 0'
        ],
        correctAnswer: 0,
        explanation: '1 valós gyök akkor van, ha D = 0. D = (-6)² - 4 · 1 · p = 36 - 4p = 0 ⟹ 4p = 36 ⟹ p = 9.'
      },
      {
        id: 'dq3-2',
        question: 'A p paraméter mely értékei esetén van az x² - 6x + p = 0 egyenletnek két különböző valós gyöke?',
        options: [
          'p < 9',
          'p > 9',
          'p ≤ 9',
          'p = 9'
        ],
        correctAnswer: 0,
        explanation: '2 különböző valós gyök feltétele: D > 0. D = 36 - 4p > 0 ⟹ 36 > 4p ⟹ p < 9.'
      },
      {
        id: 'dq3-3',
        question: 'A p paraméter mely értékei esetén nincs valós gyöke az x² - 6x + p = 0 egyenletnek?',
        options: [
          'p > 9',
          'p < 9',
          'p ≥ 9',
          'p = 0'
        ],
        correctAnswer: 0,
        explanation: 'Nincs valós gyök, ha D < 0. D = 36 - 4p < 0 ⟹ 4p > 36 ⟹ p > 9.'
      },
      {
        id: 'dq3-4',
        question: 'A k mely pozitív értékére van az x² + kx + 25 = 0 egyenletnek egyetlen valós gyöke?',
        options: [
          'k = 10',
          'k = 5',
          'k = 25',
          'k = 100'
        ],
        correctAnswer: 0,
        explanation: 'D = k² - 4 · 1 · 25 = k² - 100 = 0 ⟹ k² = 100. Mivel k pozitív, k = 10 (ekkor (x + 5)² = 0).'
      },
      {
        id: 'dq3-5',
        question: 'Melyik feltétel biztosítja, hogy az x² + 4x + c kifejezés MINDEN valós x-re szigorúan pozitív legyen?',
        options: [
          'c > 4',
          'c < 4',
          'c = 4',
          'c ≥ 0'
        ],
        correctAnswer: 0,
        explanation: 'a = 1 > 0 már teljesül. Hogy mindig pozitív legyen, a parabolának nem lehet zérushelye: D < 0. D = 16 - 4c < 0 ⟹ 4c > 16 ⟹ c > 4.'
      },
      {
        id: 'dq3-6',
        question: 'Hány valós megoldása van a px² + 4x + 1 = 0 egyenletnek, ha p = 0?',
        options: [
          '1 valós megoldása van (x = -0,25)',
          'Nincs megoldása',
          '2 különböző gyöke van',
          '0 megoldása van, mert másodfokú egyenletnél p nem lehet 0'
        ],
        correctAnswer: 0,
        explanation: 'Ha p = 0, a négyzetes tag eltűnik: 0x² + 4x + 1 = 0 ⟹ 4x = -1 ⟹ x = -0,25. Ez egy elsőfokú egyenlet, melynek pontosan 1 valós megoldása van!'
      },
      {
        id: 'dq3-7',
        question: 'A p mely valós értékére lesz a px² + 4x + 1 = 0 másodfokú egyenletnek kettős valós gyöke?',
        options: [
          'p = 4',
          'p = 16',
          'p = 0',
          'p = -4'
        ],
        correctAnswer: 0,
        explanation: 'Másodfokú egyenlethez p ≠ 0, és D = 0 kell: D = 4² - 4 · p · 1 = 16 - 4p = 0 ⟹ p = 4.'
      },
      {
        id: 'dq3-8',
        question: 'Igaz-e, hogy ha egy egész együtthatós másodfokú egyenlet diszkriminánsa négyzetszám (pl. D = 36), akkor a gyökök racionális számok?',
        options: [
          'Igen, mert √D egész szám, így x = (-b ± √D)/(2a) racionális',
          'Nem, a gyökök mindig irracionálisak',
          'Csak akkor, ha a = 1',
          'Csak akkor, ha c = 0'
        ],
        correctAnswer: 0,
        explanation: 'Ha D = k² (ahol k egész), akkor a megoldóképlet számlálója és nevezője is egész szám, így a gyökök két egész szám hányadosai, vagyis racionálisak.'
      },
      {
        id: 'dq3-9',
        question: 'Mennyi az x² + 2(m - 1)x + (m² - 2m) = 0 egyenlet diszkriminánsa, és hány gyöke van m-től függően?',
        options: [
          'D = 4 minden m-re, így mindig 2 különböző valós gyöke van',
          'D = 0 minden m-re, így 1 gyöke van',
          'D = m² - 4, m-től függ a gyökszám',
          'Nincs valós gyöke semmilyen m-re'
        ],
        correctAnswer: 0,
        explanation: 'b = 2(m-1), c = m² - 2m. Ekkor D = [2(m-1)]² - 4(1)(m² - 2m) = 4(m² - 2m + 1) - 4(m² - 2m) = 4m² - 8m + 4 - 4m² + 8m = 4 > 0. A D értéke független m-től és mindig 4, tehát mindig 2 valós gyök van!'
      },
      {
        id: 'dq3-10',
        question: 'Melyik állítás igaz az f(x) = -2x² + 4x - 5 függvényre minden valós x esetén?',
        options: [
          'Mindig szigorúan negatív (f(x) < 0 minden x ∈ ℝ-re)',
          'Mindig szigorúan pozitív (f(x) > 0 minden x ∈ ℝ-re)',
          'Vannak pozitív és negatív értékei is',
          'Érintője az x-tengely'
        ],
        correctAnswer: 0,
        explanation: 'a = -2 < 0 (lefelé nyíló parabola) és D = 4² - 4(-2)(-5) = 16 - 40 = -24 < 0. Mivel nem metszi a tengelyt és lefelé nyílik, minden pontja az x-tengely alatt halad, tehát f(x) < 0 minden x-re.'
      }
    ]
  }
};

export const DiscriminantQuiz: React.FC<DiscriminantQuizProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      title="A Másodfokú Egyenlet Diszkriminánsa"
      subtitle="Teszteld a tudásod a diszkrimináns kiszámításában, a gyökök számának meghatározásában és a paraméteres feladatokban!"
      topicId="g10-quad-diszkriminans"
      topicTitle="Diszkrimináns"
      badge="10. OSZTÁLY • V. MÁSODFOKÚ EGYENLETEK • GYAKORLÁS"
      color="purple"
      levels={quizLevels}
      cheatSheetCards={cheatSheetCards}
      initialGameMode={initialGameMode}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      matcherComponent={
        <DiscriminantMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
          topicId="g10-quad-diszkriminans"
        />
      }
      sorterComponent={
        <DiscriminantSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
          topicId="g10-quad-diszkriminans"
        />
      }
    />
  );
};

