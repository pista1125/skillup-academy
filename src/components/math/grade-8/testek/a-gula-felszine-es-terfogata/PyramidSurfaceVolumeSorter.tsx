import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PyramidSurfaceVolumeSorterProps {
  level?: DifficultyLevel;
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
    title: '1. Szint: Felszín (A) vs. Térfogat (V) vs. Mindkettő',
    subtitle: 'Csoportosítsd a fogalmakat, adatokat és mértékegységeket aszerint, melyik képlethez tartoznak!',
    categories: [
      {
        id: 'cat-surface',
        name: 'Csak a Felszínhez (A) Szükséges Közvetlenül',
        description: 'Palást, oldallap-magasság, határoló lapok területe',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-volume',
        name: 'Csak a Térfogathoz (V) Szükséges Közvetlenül',
        description: 'Testmagasság, harmadoló osztás, köbméter',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-both',
        name: 'Mindkét Képletben Közvetlenül Szerepel',
        description: 'Alapterület, alapél hossza, alapsokszög',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      { id: 'psvs1-1', label: 'Oldallap-magasság (mo)', category: 'cat-surface' },
      { id: 'psvs1-2', label: 'Kiterített síkbeli palást területe (Tp)', category: 'cat-surface' },
      { id: 'psvs1-3', label: 'Oldalháromszög alapélhez tartozó magassága', category: 'cat-surface' },
      { id: 'psvs1-4', label: 'Bádoglemez-fedés vagy sátorponyva területe', category: 'cat-surface' },
      { id: 'psvs1-5', label: 'Testmagasság (m)', category: 'cat-volume' },
      { id: 'psvs1-6', label: 'Harmadoló szabály (osztás 3-mal)', category: 'cat-volume' },
      { id: 'psvs1-7', label: 'Hasáb térfogatának pontosan a harmada', category: 'cat-volume' },
      { id: 'psvs1-8', label: 'Folyadékkapacitás literben vagy cm³-ben', category: 'cat-volume' },
      { id: 'psvs1-9', label: 'Alapterület (Ta)', category: 'cat-both' },
      { id: 'psvs1-10', label: 'Alapél (a) hossza', category: 'cat-both' },
      { id: 'psvs1-11', label: 'Alapsokszög alakja (négyzet, hatszög, stb.)', category: 'cat-both' },
      { id: 'psvs1-12', label: 'Alaplap síkja és alapkerület (Ka)', category: 'cat-both' }
    ]
  },
  2: {
    title: '2. Szint: Szakaszok Szerepe a Derékszögű Háromszögekben',
    subtitle: 'Rendszerezd a szakaszokat és geometriai szerepeiket a gúla háromszögeiben!',
    categories: [
      {
        id: 'cat-height-m',
        name: 'Testmagasság (m)',
        description: 'Térbeli merőleges magasság a test belsejében',
        badgeColor: 'bg-red-100 text-red-900 border-red-300'
      },
      {
        id: 'cat-height-mo',
        name: 'Oldallap-magasság (mo)',
        description: 'Oldalháromszög magassága a felületen',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-edge-b',
        name: 'Oldalél (b)',
        description: 'Csúcsot és alapcsúcsot összekötő ferde él',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'psvs2-1', label: 'Csúcsból az alapsíkra bocsátott merőleges szakasz', category: 'cat-height-m' },
      { id: 'psvs2-2', label: 'Befogó az m² + (a/2)² = mo² derékszögű háromszögben', category: 'cat-height-m' },
      { id: 'psvs2-3', label: 'Befogó az m² + (d/2)² = b² átlós metszeti háromszögben', category: 'cat-height-m' },
      { id: 'psvs2-4', label: 'A test térfogatának (V) kiszámításához elengedhetetlen', category: 'cat-height-m' },
      { id: 'psvs2-5', label: 'Az oldallap síkjában fekszik', category: 'cat-height-mo' },
      { id: 'psvs2-6', label: 'Átfogó az m² + (a/2)² = mo² derékszögű háromszögben', category: 'cat-height-mo' },
      { id: 'psvs2-7', label: 'Befogó a mo² + (a/2)² = b² derékszögű háromszögben', category: 'cat-height-mo' },
      { id: 'psvs2-8', label: 'A palástterület (Tp) kiszámításához közvetlenül szükséges', category: 'cat-height-mo' },
      { id: 'psvs2-9', label: 'Átfogó a mo² + (a/2)² = b² derékszögű háromszögben', category: 'cat-edge-b' },
      { id: 'psvs2-10', label: 'Átfogó az m² + (d/2)² = b² átlós metszeti háromszögben', category: 'cat-edge-b' },
      { id: 'psvs2-11', label: 'A testcsúcsot az alapsokszög egyik csúcsával köti össze', category: 'cat-edge-b' },
      { id: 'psvs2-12', label: 'A gúla külső ferde határoló éle', category: 'cat-edge-b' }
    ]
  },
  3: {
    title: '3. Szint: Matematikai Állítások Igazságértéke',
    subtitle: 'Döntsd el: Minden Gúlára Igaz, Csak Szabályos Gúlára Igaz, vagy Mindig Hamis!',
    categories: [
      {
        id: 'cat-always',
        name: 'Minden Gúlára Mindig Igaz',
        description: 'Univerzális poliéder- és gúlatörvény',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-regular',
        name: 'Csak Szabályos Gúlára Igaz',
        description: 'Szimmetria & egyenlő oldalélek feltétele',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-never',
        name: 'Mindig Hamis Állítás',
        description: 'Matematikailag hibás vagy értelmetlen',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'psvs3-1', label: 'A = Ta + Tp (a felszín az alap és a palást összege)', category: 'cat-always' },
      { id: 'psvs3-2', label: 'V = (Ta · m) / 3 (a térfogat a hasáb térfogatának harmada)', category: 'cat-always' },
      { id: 'psvs3-3', label: 'A testmagasság merőleges az alaplap síkjára', category: 'cat-always' },
      { id: 'psvs3-4', label: 'A felszín mértékegysége területegység (cm², m²)', category: 'cat-always' },
      { id: 'psvs3-5', label: 'Minden oldalél egyenlő hosszú (b1 = b2 = ...)', category: 'cat-regular' },
      { id: 'psvs3-6', label: 'Tp = 2 · a · mo (négyzet alapú gúlánál)', category: 'cat-regular' },
      { id: 'psvs3-7', label: 'm² + (a/2)² = mo² derékszögű kapcsolat fennáll', category: 'cat-regular' },
      { id: 'psvs3-8', label: 'Az oldallapok mind egybevágó egyenlő szárú háromszögek', category: 'cat-regular' },
      { id: 'psvs3-9', label: 'V = Ta · m (osztás nélkül)', category: 'cat-never' },
      { id: 'psvs3-10', label: 'A testmagasság és az oldallap-magasság mindig egyenlő (m = mo)', category: 'cat-never' },
      { id: 'psvs3-11', label: 'A gúla térfogatának mértékegysége cm²', category: 'cat-never' },
      { id: 'psvs3-12', label: 'm² = mo² + (a/2)² (m lenne az átfogó)', category: 'cat-never' }
    ]
  }
};

export const PyramidSurfaceVolumeSorter: React.FC<PyramidSurfaceVolumeSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-solids-pyramids-calc',
  topicTitle = 'A Gúla Felszíne és Térfogata'
}) => {
  const activeLvl: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;

  return (
    <SorterTemplate
      key={`psv-sorter-${activeLvl}`}
      level={activeLvl}
      currentLevel={activeLvl}
      levels={sorterLevels}
      levelsConfig={sorterLevels}
      levelConfigs={sorterLevels}
      badge="8. Osztály • VII. Testek"
      themeColor="rose"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

export default PyramidSurfaceVolumeSorter;
