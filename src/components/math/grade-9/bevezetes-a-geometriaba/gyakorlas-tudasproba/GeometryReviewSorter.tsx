import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GeometryReviewSorterProps {
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
    title: '1. Szint: A Négy Nevezetes Pont Tulajdonságai',
    subtitle: 'Válogasd szét a jellemzőket a megfelelő nevezetes pont kategóriájába!',
    categories: [
      {
        id: 'cat-o',
        name: 'Körülírt kör kp. (O)',
        description: 'Oldalfelező merőlegesek',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-i',
        name: 'Beírt kör kp. (I)',
        description: 'Belső szögfelezők',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-m',
        name: 'Magasságpont (M)',
        description: 'Magasságvonalak metszése',
        badgeColor: 'bg-red-100 text-red-900 border-red-300'
      },
      {
        id: 'cat-s',
        name: 'Súlypont (S)',
        description: 'Súlyvonalak metszése',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // O
      { id: 'grs1-1', label: 'Az oldalfelező merőleges egyenesek közös metszéspontja', category: 'cat-o' },
      { id: 'grs1-2', label: 'Egyenlő távolságra van a háromszög mindhárom csúcsától', category: 'cat-o' },
      { id: 'grs1-3', label: 'Derékszögű háromszög esetén pontosan az átfogó felezőpontjára esik', category: 'cat-o' },

      // I
      { id: 'grs1-4', label: 'A belső szögfelezők közös metszéspontja', category: 'cat-i' },
      { id: 'grs1-5', label: 'Egyenlő távolságra van a háromszög mindhárom oldalegyenesétől', category: 'cat-i' },
      { id: 'grs1-6', label: 'Bármely háromszög esetén garantáltan és kizárólag a háromszög belsejében van', category: 'cat-i' },

      // M
      { id: 'grs1-7', label: 'A csúcsokból a szemközti oldalegyenesre bocsátott merőlegesek metszéspontja', category: 'cat-m' },
      { id: 'grs1-8', label: 'Derékszögű háromszög esetén maga a derékszögű csúcs', category: 'cat-m' },
      { id: 'grs1-9', label: 'Tompaszögű háromszög esetén a háromszögön kívül helyezkedik el', category: 'cat-m' },

      // S
      { id: 'grs1-10', label: 'A csúcsokat a szemközti oldalfelező pontokkal összekötő szakaszok metszése', category: 'cat-s' },
      { id: 'grs1-11', label: 'A szakaszokat a csúcstól mérve 2 : 1 arányban osztja fel', category: 'cat-s' },
      { id: 'grs1-12', label: 'A háromszög lemez fizikai súlypontja', category: 'cat-s' }
    ]
  },
  2: {
    title: '2. Szint: Háromszögtípusok és Geometriai Viszonyaik',
    subtitle: 'Sorold be a tulajdonságokat és összefüggéseket a megfelelő szögtípus alá!',
    categories: [
      {
        id: 'cat-hegyes',
        name: 'Hegyesszögű háromszög',
        description: 'Minden szög < 90°',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-derek',
        name: 'Derékszögű háromszög',
        description: 'Pontosan egy 90°-os szög',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-tompa',
        name: 'Tompaszögű háromszög',
        description: 'Pontosan egy 90° feletti szög',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Hegyesszögű
      { id: 'grs2-1', label: 'Mind az O körülírt középpont, mind az M magasságpont a belső térben van', category: 'cat-hegyes' },
      { id: 'grs2-2', label: 'A leghosszabb oldal négyzete kisebb a két rövidebb négyzetösszegénél', category: 'cat-hegyes' },
      { id: 'grs2-3', label: 'Mindhárom magasságvonal talppontja közvetlenül az oldalszakaszra esik', category: 'cat-hegyes' },

      // Derékszögű
      { id: 'grs2-4', label: 'Érvényes rá a Pitagorasz-tétel: a² + b² = c²', category: 'cat-derek' },
      { id: 'grs2-5', label: 'Körülírt körének sugara pontosan a leghosszabb oldal fele: R = c / 2', category: 'cat-derek' },
      { id: 'grs2-6', label: 'Területe kiszámítható egyszerűen a két befogó szorzatának felével: T = (a · b) / 2', category: 'cat-derek' },
      { id: 'grs2-7', label: 'A két hegyesszög egymás pótszöge, összegük pontosan 90°', category: 'cat-derek' },

      // Tompaszögű
      { id: 'grs2-8', label: 'A leghosszabb oldal négyzete nagyobb a másik két oldal négyzetösszegénél', category: 'cat-tompa' },
      { id: 'grs2-9', label: 'Mind az O, mind az M pont a háromszögön kívül található', category: 'cat-tompa' },
      { id: 'grs2-10', label: 'Két magasságvonala csak a megfelelő oldalegyenes meghosszabbítását metszi', category: 'cat-tompa' }
    ]
  },
  3: {
    title: '3. Szint: Geometriai Állítások Érvényessége',
    subtitle: 'Döntsd el az állításokról, mikor igazak a geometriában!',
    categories: [
      {
        id: 'cat-mindig',
        name: 'Minden Háromszögre Igaz',
        description: 'Egyetemes törvényszerűségek',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-spec',
        name: 'Csak Meghatározott Típusra Igaz',
        description: 'Derékszögű / szabályos / egyenlő szárú',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-hamis',
        name: 'Geometriai Tévhit / Sosem Igaz',
        description: 'Matematikailag hibás állítások',
        badgeColor: 'bg-red-100 text-red-900 border-red-300'
      }
    ],
    items: [
      // Minden háromszögre
      { id: 'grs3-1', label: 'A belső szögek összege síkban pontosan 180°', category: 'cat-mindig' },
      { id: 'grs3-2', label: 'A beírt kör I középpontja mindig a háromszög belsejében fekszik', category: 'cat-mindig' },
      { id: 'grs3-3', label: 'A súlypont a súlyvonalakat a csúcstól mérve 2 : 1 arányban osztja', category: 'cat-mindig' },
      { id: 'grs3-4', label: 'A külső szög egyenlő a két nem mellette fekvő belső szög összegével', category: 'cat-mindig' },

      // Csak meghatározott típusra
      { id: 'grs3-5', label: 'A leghosszabb oldal felezőpontja egybeesik a körülírt kör középpontjával', category: 'cat-spec' },
      { id: 'grs3-6', label: 'A magasságpont, súlypont, körülírt és beírt kör középpontja mind egybeesik', category: 'cat-spec' },
      { id: 'grs3-7', label: 'A terület felírható úgy, mint T = (a² · √3) / 4', category: 'cat-spec' },
      { id: 'grs3-8', label: 'A 30°-os szöggel szemközti oldal pontosan fele az átfogónak', category: 'cat-spec' },

      // Sosem igaz (hamis)
      { id: 'grs3-9', label: 'Létezik olyan háromszög, amelynek oldalai 3 cm, 4 cm és 8 cm hosszúak', category: 'cat-hamis' },
      { id: 'grs3-10', label: 'A háromszög külső szögeinek összege 180°', category: 'cat-hamis' },
      { id: 'grs3-11', label: 'Egy háromszögnek lehet egyszerre két derékszöge', category: 'cat-hamis' }
    ]
  }
};

export const GeometryReviewSorter: React.FC<GeometryReviewSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-bevezetes-geometriaba',
  topicTitle = 'Gyakorlás, tudáspróba'
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
      themeColor="red"
      storageKey="grade9-geometry-review-sorter"
      levels={sorterLevels}
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • CSOPORTOSÍTÓ JÁTÉK"
    />
  );
};

