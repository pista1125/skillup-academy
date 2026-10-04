import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Chapter5PythagorasSummarySorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Háromszögtípusok és Alaptételek',
    subtitle: 'Sorold be a kifejezéseket és háromszögeket a megfelelő kategóriába!',
    categories: [
      {
        id: 'cat-right',
        name: 'Derékszögű Háromszög',
        description: 'a² + b² = c² teljesül',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-acute',
        name: 'Hegyesszögű Háromszög',
        description: 'c² < a² + b² (minden szög < 90°)',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      },
      {
        id: 'cat-obtuse',
        name: 'Tompaszögű Háromszög',
        description: 'c² > a² + b² (van egy szög > 90°)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      {
        id: 'sum-s1-1',
        text: 'Oldalak: 3 cm, 4 cm, 5 cm',
        category: 'cat-right',
        explanation: '3² + 4² = 9 + 16 = 25 = 5² ⟹ Derékszögű.',
        badge: '3-4-5'
      },
      {
        id: 'sum-s1-2',
        text: 'Oldalak: 5 cm, 12 cm, 13 cm',
        category: 'cat-right',
        explanation: '5² + 12² = 25 + 144 = 169 = 13² ⟹ Derékszögű.',
        badge: '5-12-13'
      },
      {
        id: 'sum-s1-3',
        text: 'Oldalak: 6 cm, 8 cm, 9 cm',
        category: 'cat-acute',
        explanation: '9² = 81, míg 6² + 8² = 100. 81 < 100 ⟹ Hegyesszögű.',
        badge: '6-8-9'
      },
      {
        id: 'sum-s1-4',
        text: 'Oldalak: 4 cm, 5 cm, 7 cm',
        category: 'cat-obtuse',
        explanation: '7² = 49, míg 4² + 5² = 16 + 25 = 41. 49 > 41 ⟹ Tompaszögű.',
        badge: '4-5-7'
      },
      {
        id: 'sum-s1-5',
        text: 'Oldalak: 8 cm, 15 cm, 17 cm',
        category: 'cat-right',
        explanation: '8² + 15² = 64 + 225 = 289 = 17² ⟹ Derékszögű.',
        badge: '8-15-17'
      },
      {
        id: 'sum-s1-6',
        text: 'Oldalak: 7 cm, 8 cm, 10 cm',
        category: 'cat-acute',
        explanation: '10² = 100, míg 7² + 8² = 49 + 64 = 113. 100 < 113 ⟹ Hegyesszögű.',
        badge: '7-8-10'
      },
      {
        id: 'sum-s1-7',
        text: 'Oldalak: 3 cm, 4 cm, 6 cm',
        category: 'cat-obtuse',
        explanation: '6² = 36, míg 3² + 4² = 25. 36 > 25 ⟹ Tompaszögű.',
        badge: '3-4-6'
      },
      {
        id: 'sum-s1-8',
        text: 'Oldalak: 7 cm, 24 cm, 25 cm',
        category: 'cat-right',
        explanation: '7² + 24² = 49 + 576 = 625 = 25² ⟹ Derékszögű.',
        badge: '7-24-25'
      },
      {
        id: 'sum-s1-9',
        text: 'Oldalak: 10 cm, 10 cm, 10 cm (szabályos háromszög)',
        category: 'cat-acute',
        explanation: '10² = 100 < 100 + 100 = 200 (minden szöge 60°) ⟹ Hegyesszögű.',
        badge: 'Szabályos 3szög'
      },
      {
        id: 'sum-s1-10',
        text: 'Oldalak: 2 cm, 3 cm, 4 cm',
        category: 'cat-obtuse',
        explanation: '4² = 16, míg 2² + 3² = 4 + 9 = 13. 16 > 13 ⟹ Tompaszögű.',
        badge: '2-3-4'
      },
      {
        id: 'sum-s1-11',
        text: 'Oldalak: 9 cm, 12 cm, 15 cm (3-4-5 háromszorosa)',
        category: 'cat-right',
        explanation: '9² + 12² = 81 + 144 = 225 = 15² ⟹ Derékszögű.',
        badge: '9-12-15'
      },
      {
        id: 'sum-s1-12',
        text: 'Oldalak: 5 cm, 7 cm, 8 cm',
        category: 'cat-acute',
        explanation: '8² = 64, míg 5² + 7² = 25 + 49 = 74. 64 < 74 ⟹ Hegyesszögű.',
        badge: '5-7-8'
      }
    ]
  },
  2: {
    title: '2. Szint: Eredmények Számértéke és Típusa',
    subtitle: 'Döntsd el, hogy a keresett mérték pontos egész szám, √2-es vagy √3-as alakú!',
    categories: [
      {
        id: 'cat-int',
        name: 'Egész Szám',
        description: 'Kerek egész szám (pl. pitagoraszi számhármas)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-sqrt2',
        name: '√2-es Érték',
        description: 'k · √2 alakú kifejezés (45°-45°-90°, négyzet)',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-sqrt3',
        name: '√3-as Érték',
        description: 'k · √3 alakú kifejezés (30°-60°-90°, kocka testátló)',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      {
        id: 'sum-s2-1',
        text: '8 cm oldalú négyzet átlója',
        category: 'cat-sqrt2',
        explanation: 'd = a√2 = 8√2 cm.',
        badge: '= 8√2 cm'
      },
      {
        id: 'sum-s2-2',
        text: '6 cm oldalú kocka testátlója',
        category: 'cat-sqrt3',
        explanation: 'D = a√3 = 6√3 cm.',
        badge: '= 6√3 cm'
      },
      {
        id: 'sum-s2-3',
        text: '9 cm és 12 cm befogójú derékszögű 3szög átfogója',
        category: 'cat-int',
        explanation: 'c = √(81 + 144) = √225 = 15 cm (egész szám).',
        badge: '= 15 cm'
      },
      {
        id: 'sum-s2-4',
        text: '10 cm oldalú szabályos háromszög magassága',
        category: 'cat-sqrt3',
        explanation: 'm = (a/2) · √3 = 5√3 cm.',
        badge: '= 5√3 cm'
      },
      {
        id: 'sum-s2-5',
        text: '6 cm és 8 cm oldalú téglalap átlója',
        category: 'cat-int',
        explanation: 'd = √(36 + 64) = √100 = 10 cm (egész szám).',
        badge: '= 10 cm'
      },
      {
        id: 'sum-s2-6',
        text: '5 cm befogójú 45°-45°-90° háromszög átfogója',
        category: 'cat-sqrt2',
        explanation: 'c = a√2 = 5√2 cm.',
        badge: '= 5√2 cm'
      },
      {
        id: 'sum-s2-7',
        text: '7 cm oldalú szabályos hatszög rövid átlója',
        category: 'cat-sqrt3',
        explanation: 'd_rövid = a√3 = 7√3 cm.',
        badge: '= 7√3 cm'
      },
      {
        id: 'sum-s2-8',
        text: '2 cm, 3 cm, 6 cm élű téglatest testátlója',
        category: 'cat-int',
        explanation: 'D = √(4 + 9 + 36) = √49 = 7 cm (egész szám).',
        badge: '= 7 cm'
      },
      {
        id: 'sum-s2-9',
        text: '12 cm oldalú kocka lapátlója',
        category: 'cat-sqrt2',
        explanation: 'd = a√2 = 12√2 cm.',
        badge: '= 12√2 cm'
      },
      {
        id: 'sum-s2-10',
        text: '8 cm átmérőjű körbe írt négyzet oldala',
        category: 'cat-sqrt2',
        explanation: 'a = d / √2 = 8 / √2 = 4√2 cm.',
        badge: '= 4√2 cm'
      },
      {
        id: 'sum-s2-11',
        text: '4 cm rövid befogójú 30°-60°-90° háromszög hosszú befogója',
        category: 'cat-sqrt3',
        explanation: 'b = a√3 = 4√3 cm.',
        badge: '= 4√3 cm'
      },
      {
        id: 'sum-s2-12',
        text: '16 cm és 12 cm átlójú rombusz oldala',
        category: 'cat-int',
        explanation: 'a = √(8² + 6²) = √(64 + 36) = 10 cm (egész szám).',
        badge: '= 10 cm'
      }
    ]
  },
  3: {
    title: '3. Szint: Geometriai Állítások Igazságtartalma',
    subtitle: 'Döntsd el a fejezet állításairól: Mindig igaz, Feltételes, vagy Soha nem igaz!',
    categories: [
      {
        id: 'cat-always',
        name: 'Mindig Igaz',
        description: 'Tétel vagy geometriai azonosság',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-sometimes',
        name: 'Csak Bizonyos Esetekben',
        description: 'Csak adott feltétel vagy speciális alakzat esetén igaz',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-never',
        name: 'Soha Nem Igaz',
        description: 'Matematikailag lehetetlen állítás',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      {
        id: 'sum-s3-1',
        text: 'Derékszögű háromszögben a két befogó négyzetösszege az átfogó négyzete',
        category: 'cat-always',
        explanation: 'Ez a Pitagorasz-tétel alaptétele.',
        badge: 'Pitagorasz-tétel'
      },
      {
        id: 'sum-s3-2',
        text: 'Egy derékszögű háromszög átfogója rövidebb, mint bármelyik befogója',
        category: 'cat-never',
        explanation: 'A derékszögű háromszögben az átfogó a leghosszabb oldal.',
        badge: 'Lehetetlen'
      },
      {
        id: 'sum-s3-3',
        text: 'Egy háromszög oldalai kielégítik az a² + b² = c² egyenlőséget',
        category: 'cat-sometimes',
        explanation: 'Csak derékszögű háromszögekre igaz.',
        badge: 'Feltételes'
      },
      {
        id: 'sum-s3-4',
        text: 'Bármely a élű kocka testátlója D = a · √3',
        category: 'cat-always',
        explanation: 'A Pitagorasz-tétel kétszeri alkalmazásából: D² = 3a² ⟹ D = a√3.',
        badge: 'Kocka testátló'
      },
      {
        id: 'sum-s3-5',
        text: '30°-60°-90° háromszögben a 30°-os szöggel szemközti oldal fele az átfogónak',
        category: 'cat-always',
        explanation: 'A szabályos háromszög feléből következő aranyszabály.',
        badge: '30°-os szabály'
      },
      {
        id: 'sum-s3-6',
        text: 'A rombusz átlói felezik egymást és derékszöget zárnak be',
        category: 'cat-always',
        explanation: 'A rombusz szimmetriatulajdonsága, emiatt bontható 4 derékszögű 3szögre.',
        badge: 'Rombusz átlók'
      },
      {
        id: 'sum-s3-7',
        text: 'A háromszög belső szögeinek összege 180°',
        category: 'cat-always',
        explanation: 'Minden síkbeli háromszög alaptétele.',
        badge: 'Szögösszeg'
      },
      {
        id: 'sum-s3-8',
        text: 'A téglatest testátlója D = a + b + c',
        category: 'cat-never',
        explanation: 'Helyesen D = √(a² + b² + c²), az élek nem összeadhatók közvetlenül.',
        badge: 'Téves képlet'
      },
      {
        id: 'sum-s3-9',
        text: 'Egy derékszögű háromszög oldalai egész számok (pitagoraszi számhármas)',
        category: 'cat-sometimes',
        explanation: 'Gyakran irracionális gyökös számok a befogók vagy az átfogó.',
        badge: 'Feltételes'
      },
      {
        id: 'sum-s3-10',
        text: 'Ha c² > a² + b² (c a leghosszabb oldal), akkor a háromszög tompaszögű',
        category: 'cat-always',
        explanation: 'A Pitagorasz-tétel megfordításának kiterjesztése tompaszögre.',
        badge: 'Tompaszög feltétel'
      },
      {
        id: 'sum-s3-11',
        text: 'A négyzet átlója pontosan kétszerese az oldalának (d = 2a)',
        category: 'cat-never',
        explanation: 'A négyzet átlója d = a√2 ≈ 1,414 a, soha nem 2a.',
        badge: 'Tévedés'
      },
      {
        id: 'sum-s3-12',
        text: 'A derékszögű háromszög két befogója azonos hosszúságú (a = b)',
        category: 'cat-sometimes',
        explanation: 'Csak az egyenlő szárú (45-45-90) derékszögű háromszögekben igaz.',
        badge: 'Feltételes'
      }
    ]
  }
};

export const Chapter5PythagorasSummarySorter: React.FC<Chapter5PythagorasSummarySorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-pyth-summary-sorter',
  topicTitle = 'V. Fejezet Összefoglalás'
}) => {
  const currentConfig = sorterLevels[level] || sorterLevels[1];

  return (
    <SorterTemplate
      key={`sum-sorter-lvl-${level}`}
      level={level}
      currentLevel={level}
      categories={currentConfig.categories}
      items={currentConfig.items}
      config={currentConfig}
      levels={sorterLevels}
      levelsConfig={sorterLevels}
      title={currentConfig.title || 'Csoportosító Játék • V. Fejezet Összefoglalás'}
      subtitle={currentConfig.subtitle || 'Kategorizáld a háromszögeket, értékeket és geometriai tételeket!'}
      badge="8. Osztály • V. Fejezet"
      topicBadge="🏆 V. Fejezet • Témazáró Csoportosító"
      badgeText="8. Osztály • Pitagorasz-tétel"
      topicId={topicId}
      topicTitle={topicTitle}
      chapterId="pitagorasz-tetel"
      grade={8}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default Chapter5PythagorasSummarySorter;
