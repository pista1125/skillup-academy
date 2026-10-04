import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PythagorasApplicationsSorterProps {
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
    title: '1. Szint: Képletek és Alakzatok Besorolása',
    subtitle: 'Sorold be az összefüggéseket és tulajdonságokat a megfelelő síkidomhoz!',
    categories: [
      {
        id: 'cat-quad',
        name: 'Négyzet & Téglalap',
        description: 'd² = a² + b²; d = a√2; 90°-os sarokszögek',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-tri',
        name: 'Egyenlő Szárú & Szabályos',
        description: 'm² + (a/2)² = b²; m = (a√3)/2; alap felezése',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      },
      {
        id: 'cat-rhomb-trap',
        name: 'Rombusz & Szimmetrikus Trapéz',
        description: '(e/2)² + (f/2)² = a²; x = (a-c)/2; átlók merőlegesek',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      {
        id: 'pa-s1-1',
        text: 'd = a · √2',
        category: 'cat-quad',
        explanation: 'A négyzet átlójának közvetlen képlete az oldalhosszból.',
        badge: 'Négyzet'
      },
      {
        id: 'pa-s1-2',
        text: 'd² = a² + b²',
        category: 'cat-quad',
        explanation: 'A téglalap átlójának négyzete a két oldal négyzetösszege.',
        badge: 'Téglalap'
      },
      {
        id: 'pa-s1-3',
        text: 'A négyszög átlója 2 egybevágó derékszögű háromszögre osztja a síkidomot',
        category: 'cat-quad',
        explanation: 'Téglalap és négyzet esetén a sarokszög 90°, az átló pedig az átfogó.',
        badge: 'Átlófelbontás'
      },
      {
        id: 'pa-s1-4',
        text: 'd = √(8² + 6²) = 10 cm',
        category: 'cat-quad',
        explanation: 'A 6 cm és 8 cm oldalú téglalap átlója.',
        badge: 'Téglalap átló'
      },
      {
        id: 'pa-s1-5',
        text: 'm = (a · √3) / 2',
        category: 'cat-tri',
        explanation: 'Az a oldalú szabályos (egyenlő oldalú) háromszög magassága.',
        badge: 'Szabályos háromszög'
      },
      {
        id: 'pa-s1-6',
        text: 'T = (a² · √3) / 4',
        category: 'cat-tri',
        explanation: 'A szabályos háromszög területének közvetlen képlete az oldalból.',
        badge: 'Szabályos terület'
      },
      {
        id: 'pa-s1-7',
        text: 'A magasságvonal pontosan felezi a vízszintes alapot (a/2)',
        category: 'cat-tri',
        explanation: 'Egyenlő szárú és szabályos háromszögben a szimmetriatengely felezi az alapot.',
        badge: 'Alapfelezés'
      },
      {
        id: 'pa-s1-8',
        text: 'm² + (a/2)² = b²',
        category: 'cat-tri',
        explanation: 'Az egyenlő szárú háromszög magasságára felírt Pitagorasz-tétel.',
        badge: 'Egyenlő szárú'
      },
      {
        id: 'pa-s1-9',
        text: '(e/2)² + (f/2)² = a²',
        category: 'cat-rhomb-trap',
        explanation: 'A rombusz oldala az átlók feleiből álló derékszögű háromszög átfogója.',
        badge: 'Rombusz oldal'
      },
      {
        id: 'pa-s1-10',
        text: 'x = (a - c) / 2',
        category: 'cat-rhomb-trap',
        explanation: 'A szimmetrikus trapéz szára alatti kis derékszögű háromszög vízszintes befogója.',
        badge: 'Trapéz levágás'
      },
      {
        id: 'pa-s1-11',
        text: 'm² + ((a-c)/2)² = b²',
        category: 'cat-rhomb-trap',
        explanation: 'A szimmetrikus trapéz magasságára és szárára vonatkozó összefüggés.',
        badge: 'Trapéz magasság'
      },
      {
        id: 'pa-s1-12',
        text: 'Az átlók merőlegesen felezik egymást',
        category: 'cat-rhomb-trap',
        explanation: 'A rombusz alapvető tulajdonsága, amely 4 derékszögű háromszöget hoz létre.',
        badge: 'Rombusz átlók'
      }
    ]
  },
  2: {
    title: '2. Szint: Számított Méretek Nagysága',
    subtitle: 'Határozd meg fejben vagy gyors becsléssel, hogy a keresett méret kisebb, egyenlő vagy nagyobb 10 cm-nél!',
    categories: [
      {
        id: 'cat-less',
        name: 'Kisebb mint 10 cm (< 10 cm)',
        description: 'A kiszámított hosszúság szigorúan 10 cm alatt van',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-exact',
        name: 'Pontosan 10 cm (= 10 cm)',
        description: 'A kiszámított hosszúság pontosan 10 cm',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-more',
        name: 'Nagyobb mint 10 cm (> 10 cm)',
        description: 'A kiszámított hosszúság szigorúan meghaladja a 10 cm-t',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      {
        id: 'pa-s2-1',
        text: '6 cm oldalú négyzet átlója',
        category: 'cat-less',
        explanation: 'd = 6√2 ≈ 8,49 cm < 10 cm.',
        badge: 'd ≈ 8,49 cm'
      },
      {
        id: 'pa-s2-2',
        text: 'a = 12 cm, b = 10 cm egyenlő szárú háromszög magassága',
        category: 'cat-less',
        explanation: 'm = √(10² - 6²) = √64 = 8 cm < 10 cm.',
        badge: 'm = 8 cm'
      },
      {
        id: 'pa-s2-3',
        text: '10 cm oldalú szabályos háromszög magassága',
        category: 'cat-less',
        explanation: 'm = 5√3 ≈ 8,66 cm < 10 cm.',
        badge: 'm ≈ 8,66 cm'
      },
      {
        id: 'pa-s2-4',
        text: 'a = 4 cm és b = 8 cm téglalap átlója',
        category: 'cat-less',
        explanation: 'd = √(16 + 64) = √80 ≈ 8,94 cm < 10 cm.',
        badge: 'd ≈ 8,94 cm'
      },
      {
        id: 'pa-s2-5',
        text: 'a = 6 cm és b = 8 cm téglalap átlója',
        category: 'cat-exact',
        explanation: 'd = √(36 + 64) = √100 = 10 cm.',
        badge: 'd = 10 cm'
      },
      {
        id: 'pa-s2-6',
        text: 'e = 16 cm és f = 12 cm átlójú rombusz oldala',
        category: 'cat-exact',
        explanation: 'a = √(8² + 6²) = √100 = 10 cm.',
        badge: 'a = 10 cm'
      },
      {
        id: 'pa-s2-7',
        text: 'r = 6 cm sugarú kör 8 cm-es érintőszakasza mellett a külső pont távolsága (d)',
        category: 'cat-exact',
        explanation: 'd = √(6² + 8²) = √100 = 10 cm.',
        badge: 'd = 10 cm'
      },
      {
        id: 'pa-s2-8',
        text: 'd = 10√2 cm átlójú négyzet oldala',
        category: 'cat-exact',
        explanation: 'a = d / √2 = 10 cm.',
        badge: 'a = 10 cm'
      },
      {
        id: 'pa-s2-9',
        text: 'a = 10 cm oldalú négyzet átlója',
        category: 'cat-more',
        explanation: 'd = 10√2 ≈ 14,14 cm > 10 cm.',
        badge: 'd ≈ 14,14 cm'
      },
      {
        id: 'pa-s2-10',
        text: 'a = 5 cm és b = 12 cm téglalap átlója',
        category: 'cat-more',
        explanation: 'd = √(25 + 144) = √169 = 13 cm > 10 cm.',
        badge: 'd = 13 cm'
      },
      {
        id: 'pa-s2-11',
        text: 'e = 24 cm és f = 10 cm rombusz oldala',
        category: 'cat-more',
        explanation: 'a = √(12² + 5²) = √169 = 13 cm > 10 cm.',
        badge: 'a = 13 cm'
      },
      {
        id: 'pa-s2-12',
        text: 'a = 16, c = 6, b = 13 szimmetrikus trapéz magassága',
        category: 'cat-more',
        explanation: 'x = 5 cm, m = √(169 - 25) = √144 = 12 cm > 10 cm.',
        badge: 'm = 12 cm'
      }
    ]
  },
  3: {
    title: '3. Szint: Geometriai Állítások Igazságtartalma',
    subtitle: 'Döntsd el a síkbeli alakzatokról és alkalmazásokról szóló állításokról, hogy mindig, csak feltételesen vagy soha nem igazak!',
    categories: [
      {
        id: 'cat-always',
        name: 'Mindig Igaz',
        description: 'Matematikailag minden esetben érvényes törvényszerűség',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-cond',
        name: 'Csak Speciális / Szimmetrikus Alakzatra Igaz',
        description: 'Csak bizonyos feltételek (pl. szimmetria, egyenlő szárak) esetén teljesül',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-never',
        name: 'Soha Nem Igaz',
        description: 'Matematikai tévedés, geometriailag kizárt állítás',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      {
        id: 'pa-s3-1',
        text: 'A négyzet átlója pontosan a·√2 hosszúságú',
        category: 'cat-always',
        explanation: 'd² = a² + a² = 2a² alapján minden négyzetre pontosan érvényes.',
        badge: 'Négyzet átló'
      },
      {
        id: 'pa-s3-2',
        text: 'A kör érintője az érintési pontban merőleges az oda húzott sugárra',
        category: 'cat-always',
        explanation: 'A kör érintőjének alapvető geometriai definíciója és tétele.',
        badge: 'Kör érintő'
      },
      {
        id: 'pa-s3-3',
        text: 'A téglalap átlója szigorúan hosszabb bármelyik oldalánál',
        category: 'cat-always',
        explanation: 'Mivel a derékszögű háromszög átfogója, mindig hosszabb a befogóknál.',
        badge: 'Átfogó tulajdonság'
      },
      {
        id: 'pa-s3-4',
        text: 'A rombusz átlói derékszögben metszik egymást',
        category: 'cat-always',
        explanation: 'Minden rombusz tengelyesen szimmetrikus mindkét átlójára, így merőlegesek.',
        badge: 'Rombusz átlók'
      },
      {
        id: 'pa-s3-5',
        text: 'A magasságvonal pontosan felezi a háromszög alapját',
        category: 'cat-cond',
        explanation: 'Csak egyenlő szárú és szabályos háromszögben igaz, általános háromszögben nem!',
        badge: 'Alap felezése'
      },
      {
        id: 'pa-s3-6',
        text: 'A trapéz szára alatti kis szakasz x = (a - c) / 2',
        category: 'cat-cond',
        explanation: 'Ez a szimmetrikus (húr-) trapézra igaz, általános trapézra nem.',
        badge: 'Trapéz szimmetria'
      },
      {
        id: 'pa-s3-7',
        text: 'A négyszög két átlója pontosan egyenlő hosszú',
        category: 'cat-cond',
        explanation: 'Téglalapra és négyzetre (valamint húrtrapézra) igaz, de rombuszra vagy paralelogrammára nem!',
        badge: 'Átlók egyenlősége'
      },
      {
        id: 'pa-s3-8',
        text: 'A háromszög területe T = (a² · √3) / 4',
        category: 'cat-cond',
        explanation: 'Kizárólag szabályos (egyenlő oldalú) háromszögre igaz!',
        badge: 'Szabályos képlet'
      },
      {
        id: 'pa-s3-9',
        text: 'A téglalap átlója egyenlő a két oldal összegével: d = a + b',
        category: 'cat-never',
        explanation: 'A háromszög-egyenlőtlenség miatt d < a + b mindig teljesül.',
        badge: 'Téves összeg'
      },
      {
        id: 'pa-s3-10',
        text: 'A szabályos háromszög magassága egyenlő az oldal felével: m = a / 2',
        category: 'cat-never',
        explanation: 'm = (a√3)/2 ≈ 0,866a, ami szigorúan nagyobb az oldal felénél.',
        badge: 'Téves magasság'
      },
      {
        id: 'pa-s3-11',
        text: 'A rombusz oldala hosszabb a két átló összegénél',
        category: 'cat-never',
        explanation: 'A rombusz oldala a negyed átlók derékszögű háromszögének átfogója, nem lehet hosszabb a teljes átlóknál.',
        badge: 'Kizárt méret'
      },
      {
        id: 'pa-s3-12',
        text: 'Egy 5 m-es létrával 6 m magas fal tetejét el lehet érni, ha ferdén támasztjuk',
        category: 'cat-never',
        explanation: 'Ferdén támasztva a befogó (magasság) mindig kisebb az átfogónál (létrahossz).',
        badge: 'Létra paradoxon'
      }
    ]
  }
};

export const PythagorasApplicationsSorter: React.FC<PythagorasApplicationsSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-pyth-applications-sorter',
  topicTitle = 'A Pitagorasz-tétel alkalmazásai'
}) => {
  const currentConfig = sorterLevels[level] || sorterLevels[1];

  return (
    <SorterTemplate
      key={`pa-sorter-lvl-${level}`}
      level={level}
      currentLevel={level}
      categories={currentConfig.categories}
      items={currentConfig.items}
      config={currentConfig}
      levels={sorterLevels}
      levelsConfig={sorterLevels}
      title={currentConfig.title || 'Csoportosító Játék • Síkbeli és Gyakorlati Alkalmazások'}
      subtitle={currentConfig.subtitle || 'Kategorizáld a képleteket, kiszámított méreteket és geometriai összefüggéseket!'}
      badge="8. Osztály • Pitagorasz-tétel"
      topicBadge="🔷 4. Lecke • Alkalmazások"
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

export default PythagorasApplicationsSorter;
