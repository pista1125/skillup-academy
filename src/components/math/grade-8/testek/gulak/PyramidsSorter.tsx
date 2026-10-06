import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PyramidsSorterProps {
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
    title: '1. Szint: Gúla Típusok és Tulajdonságok',
    subtitle: 'Csoportosítsd az állításokat és élszámokat a megfelelő gúla szerint!',
    categories: [
      {
        id: 'cat-tetra',
        name: 'Háromoldalú Gúla (Tetraéder)',
        description: 'Alaplapja háromszög, összes lapja háromszög',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-square',
        name: 'Négyzet alapú Gúla',
        description: 'Alaplapja négyszög, 4 oldallap',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-hexa',
        name: 'Hatszög alapú Gúla',
        description: 'Alaplapja hatszög, 6 oldallap',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      }
    ],
    items: [
      { id: 'ps1-1', label: '4 csúcsa és 4 lapja van', category: 'cat-tetra' },
      { id: 'ps1-2', label: '6 éle van összesen (3 alapél + 3 oldalél)', category: 'cat-tetra' },
      { id: 'ps1-3', label: 'Minden határoló lapja háromszög', category: 'cat-tetra' },
      { id: 'ps1-4', label: '5 csúcsa és 5 lapja van', category: 'cat-square' },
      { id: 'ps1-5', label: '8 éle van összesen (4 alapél + 4 oldalél)', category: 'cat-square' },
      { id: 'ps1-6', label: 'Alaplapja négyzet, palástja 4 háromszög', category: 'cat-square' },
      { id: 'ps1-7', label: 'Egyiptomi nagy piramisok alakja', category: 'cat-square' },
      { id: 'ps1-8', label: '7 csúcsa és 7 lapja van', category: 'cat-hexa' },
      { id: 'ps1-9', label: '12 éle van összesen (6 alapél + 6 oldalél)', category: 'cat-hexa' },
      { id: 'ps1-10', label: 'Alaplapja hatszög, palástja 6 háromszög', category: 'cat-hexa' },
      { id: 'ps1-11', label: 'Euler: 4 - 6 + 4 = 2', category: 'cat-tetra' },
      { id: 'ps1-12', label: 'Euler: 5 - 8 + 5 = 2', category: 'cat-square' }
    ]
  },
  2: {
    title: '2. Szint: Igaz vs. Szabályos vs. Hamis Állítások',
    subtitle: 'Döntsd el, hogy az állítás mindig igaz, csak szabályos gúlára igaz, vagy hamis!',
    categories: [
      {
        id: 'cat-always-true',
        name: 'Minden Gúlára Igaz',
        description: 'Általános tulajdonság',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-regular-only',
        name: 'Csak Szabályos Gúlára Igaz',
        description: 'Középpontos vetület & szimmetria',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-false',
        name: 'Hamis Állítás',
        description: 'Geometriailag helytelen',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'ps2-1', label: 'A csúcsok és lapok száma megegyezik: C = L', category: 'cat-always-true' },
      { id: 'ps2-2', label: 'Élek száma mindig páros: É = 2n', category: 'cat-always-true' },
      { id: 'ps2-3', label: 'Euler-tétel teljesül: C - É + L = 2', category: 'cat-always-true' },
      { id: 'ps2-4', label: 'Az oldallapok mind háromszögek', category: 'cat-always-true' },
      { id: 'ps2-5', label: 'Az oldalélek mind egyenlő hosszúak (b1 = b2 = ...)', category: 'cat-regular-only' },
      { id: 'ps2-6', label: 'Az oldallapok mind egybevágó egyenlő szárú háromszögek', category: 'cat-regular-only' },
      { id: 'ps2-7', label: 'A testcsúcs merőleges vetülete az alaplap középpontjába esik', category: 'cat-regular-only' },
      { id: 'ps2-8', label: 'Minden oldallap-magasság egyenlő (mo1 = mo2 = ...)', category: 'cat-regular-only' },
      { id: 'ps2-9', label: 'Egy gúlának lehet pontosan 15 éle', category: 'cat-false' },
      { id: 'ps2-10', label: 'A gúla oldallapjai mindig téglalapok', category: 'cat-false' },
      { id: 'ps2-11', label: 'Minden szabályos gúla oldallapjai egyenlő oldalú háromszögek', category: 'cat-false' },
      { id: 'ps2-12', label: 'A testmagasság mindig egyenlő az oldallap-magassággal (m = mo)', category: 'cat-false' }
    ]
  },
  3: {
    title: '3. Szint: Szakaszok Szerepe a Szabályos Gúlában',
    subtitle: 'Rendszerezd a tulajdonságokat: Testmagasság (m), Oldallap-magasság (mo) vagy Oldalél (b)?',
    categories: [
      {
        id: 'cat-height-m',
        name: 'Testmagasság (m)',
        description: 'Térbeli merőleges magasság',
        badgeColor: 'bg-red-100 text-red-900 border-red-300'
      },
      {
        id: 'cat-height-mo',
        name: 'Oldallap-magasság (mo)',
        description: 'Oldalháromszög magassága',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-edge-b',
        name: 'Oldalél (b)',
        description: 'Csúcsot és alapcsúcsot összekötő él',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'ps3-1', label: 'A testcsúcsból az alaplap síkjára bocsátott merőleges szakasz', category: 'cat-height-m' },
      { id: 'ps3-2', label: 'Befogó az m² + (a/2)² = mo² derékszögű háromszögben', category: 'cat-height-m' },
      { id: 'ps3-3', label: 'A gúla térfogatának kiszámításához elengedhetetlen magasság', category: 'cat-height-m' },
      { id: 'ps3-4', label: 'Az oldalháromszög alapélhez tartozó magassága', category: 'cat-height-mo' },
      { id: 'ps3-5', label: 'Az oldallap síkjában fekszik', category: 'cat-height-mo' },
      { id: 'ps3-6', label: 'Átfogó az m² + (a/2)² = mo² derékszögű háromszögben', category: 'cat-height-mo' },
      { id: 'ps3-7', label: 'A palást területének kiszámításához közvetlenül szükséges', category: 'cat-height-mo' },
      { id: 'ps3-8', label: 'Befogó a mo² + (a/2)² = b² derékszögű háromszögben', category: 'cat-height-mo' },
      { id: 'ps3-9', label: 'A testcsúcsot az alapsokszög egyik csúcsával köti össze', category: 'cat-edge-b' },
      { id: 'ps3-10', label: 'A gúla külső ferde határoló éle', category: 'cat-edge-b' },
      { id: 'ps3-11', label: 'Átfogó a mo² + (a/2)² = b² derékszögű háromszögben', category: 'cat-edge-b' },
      { id: 'ps3-12', label: 'Átfogó az m² + (d/2)² = b² átlós metszeti háromszögben', category: 'cat-edge-b' }
    ]
  }
};

export const PyramidsSorter: React.FC<PyramidsSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-solids-pyramids',
  topicTitle = 'Gúlák Alapismeretek'
}) => {
  const activeLvl: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;

  return (
    <SorterTemplate
      key={`pyr-sorter-${activeLvl}`}
      level={activeLvl}
      currentLevel={activeLvl}
      levels={sorterLevels}
      levelsConfig={sorterLevels}
      levelConfigs={sorterLevels}
      badge="8. Osztály • VI. Testek"
      themeColor="amber"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

export default PyramidsSorter;
