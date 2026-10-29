import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TriangleLines2SorterProps {
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
    title: '1. Szint: Magasságpont (M) vs. Súlypont (S)',
    subtitle: 'Válogasd szét az állításokat a magasságpontra, a súlypontra vagy mindkettőre jellemző kategóriákba!',
    categories: [
      {
        id: 'cat-orthocenter',
        name: 'Magasságpont (M)',
        description: 'Merőlegesek metszéspontja, helyzete a szögektől függ',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-centroid',
        name: 'Súlypont (S)',
        description: 'Súlyvonalak metszéspontja, 2:1 arányú tömegközéppont',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-both',
        name: 'Mindkettőre Igaz',
        description: 'Közös geometriai tulajdonságok',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // Magasságpont (M)
      { id: 'ts1-1', label: 'Tompaszögű háromszögben a háromszögön KÍVÜLRE esik', category: 'cat-orthocenter' },
      { id: 'ts1-2', label: 'Derékszögű háromszögben a derékszögű csúccsal esik egybe', category: 'cat-orthocenter' },
      { id: 'ts1-3', label: 'A csúcsokból a szemközti oldalegyenesre bocsátott merőlegesek alkotják', category: 'cat-orthocenter' },
      { id: 'ts1-4', label: 'Euler-egyenesen |MS| = 2 · |SO| arányban szerepel', category: 'cat-orthocenter' },

      // Súlypont (S)
      { id: 'ts1-5', label: 'MINDIG a háromszög belsejében helyezkedik el', category: 'cat-centroid' },
      { id: 'ts1-6', label: 'A szakaszokat 2 : 1 arányban osztja a csúcs felől', category: 'cat-centroid' },
      { id: 'ts1-7', label: 'A lemez alakú háromszög fizikai tömegközéppontja', category: 'cat-centroid' },
      { id: 'ts1-8', label: 'A hozzá tartozó vonalak 6 egyenlő területű részre osztják a háromszöget', category: 'cat-centroid' },

      // Mindkettőre igaz
      { id: 'ts1-9', label: 'Bármely háromszögben a három hozzá tartozó vonal egy pontban metszi egymást', category: 'cat-both' },
      { id: 'ts1-10', label: 'Szabályos háromszögben egybeesik az összes többi nevezetes ponttal', category: 'cat-both' },
      { id: 'ts1-11', label: 'Rajta van az Euler-egyenesen nem szabályos háromszög esetén', category: 'cat-both' }
    ]
  },
  2: {
    title: '2. Szint: Magasságvonal, Súlyvonal és Középvonal',
    subtitle: 'Csoportosítsd a tulajdonságokat a három vonaltípus szerint!',
    categories: [
      {
        id: 'cat-altitude',
        name: 'Magasságvonal (m)',
        description: 'Merőleges a szemközti oldalra',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-median',
        name: 'Súlyvonal (s)',
        description: 'Csúcsot a szemközti felezőponttal köti össze',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-midline',
        name: 'Középvonal (k)',
        description: 'Két oldal felezőpontját köti össze',
        badgeColor: 'bg-pink-100 text-pink-900 border-pink-300'
      }
    ],
    items: [
      // Magasságvonal
      { id: 'ts2-1', label: 'Merőleges a szemközti oldalegyenesre a talppontban', category: 'cat-altitude' },
      { id: 'ts2-2', label: 'Derékszögű háromszögben a két befogó maga két magasságvonal', category: 'cat-altitude' },
      { id: 'ts2-3', label: 'Területszámítás alapképlete: T = (a · m_a) / 2', category: 'cat-altitude' },

      // Súlyvonal
      { id: 'ts2-4', label: 'Egyetlen vonal pontosan két egyenlő területű részre felezi a háromszöget', category: 'cat-median' },
      { id: 'ts2-5', label: 'A csúcs felőli szakasza kétszerese az oldalfelező felőlinek', category: 'cat-median' },
      { id: 'ts2-6', label: 'Csúcsból a szemközti oldal felezőpontjába húzott szakasz', category: 'cat-median' },

      // Középvonal
      { id: 'ts2-7', label: 'Egyik csúcson sem megy keresztül, csak oldalfelező pontokat köt össze', category: 'cat-midline' },
      { id: 'ts2-8', label: 'Párhuzamos a harmadik oldallal és feleakkora, mint az', category: 'cat-midline' },
      { id: 'ts2-9', label: 'A három vonal 4 egybevágó kis háromszögre osztja a síkidomot', category: 'cat-midline' },
      { id: 'ts2-10', label: 'Az általa alkotott belső háromszög területe az eredeti terület negyede', category: 'cat-midline' }
    ]
  },
  3: {
    title: '3. Szint: Számításos és Arányos Esetek',
    subtitle: 'Válogasd szét a számpéldákat az alkalmazott tétel alapján!',
    categories: [
      {
        id: 'cat-median-calc',
        name: 'Súlyvonal 2 : 1 Arány',
        description: '|AS| = 2/3 · s, |SF| = 1/3 · s',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-midline-calc',
        name: 'Középvonal Felezés',
        description: 'k = a / 2, T_kis = T / 4, K_kis = K / 2',
        badgeColor: 'bg-violet-100 text-violet-900 border-violet-300'
      },
      {
        id: 'cat-euler-calc',
        name: 'Euler-egyenes Távolságok',
        description: '|MS| = 2 · |SO|',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      }
    ],
    items: [
      // Súlyvonal számítások
      { id: 'ts3-1', label: 'Ha a súlyvonal 15 cm, a csúcs felőli rész 10 cm, a felezőpont felőli 5 cm', category: 'cat-median-calc' },
      { id: 'ts3-2', label: 'Ha a súlypont 4 cm-re van az oldalfelezőtől, a teljes súlyvonal 12 cm', category: 'cat-median-calc' },
      { id: 'ts3-3', label: 'Ha |AS| = 8 cm a csúcstól, akkor a felezőpontig tartó |SF_a| = 4 cm', category: 'cat-median-calc' },

      // Középvonal számítások
      { id: 'ts3-4', label: 'Ha az alap a = 18 cm, a vele párhuzamos középvonal k_a = 9 cm', category: 'cat-midline-calc' },
      { id: 'ts3-5', label: 'Ha a középvonalak hossza 5, 6 és 7 cm, az eredeti háromszög kerülete 36 cm', category: 'cat-midline-calc' },
      { id: 'ts3-6', label: 'Ha a nagy háromszög területe 48 cm², a középvonalak által határolt háromszög területe 12 cm²', category: 'cat-midline-calc' },

      // Euler-egyenes számítások
      { id: 'ts3-7', label: 'Ha a súlypont és a körülírt kör távolsága |SO| = 3.5 cm, akkor |MS| = 7 cm', category: 'cat-euler-calc' },
      { id: 'ts3-8', label: 'Ha |MS| = 10 cm, akkor |SO| = 5 cm, és a teljes |MO| távolság 15 cm', category: 'cat-euler-calc' },
      { id: 'ts3-9', label: 'A pontok elhelyezkedésének sorrendje az egyenesen: M — S — O', category: 'cat-euler-calc' }
    ]
  }
};

export const TriangleLines2Sorter: React.FC<TriangleLines2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-bevezetes-geometriaba',
  topicTitle = 'A háromszög nevezetes vonalai és pontjai II.'
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
      themeColor="teal"
      storageKey="grade9-triangle-lines-2-sorter"
      levels={sorterLevels}
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • CSOPORTOSÍTÓ JÁTÉK"
    />
  );
};

