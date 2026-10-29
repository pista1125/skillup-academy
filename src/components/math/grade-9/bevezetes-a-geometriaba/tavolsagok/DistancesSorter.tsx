import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface DistancesSorterProps {
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
    title: '1. Szint: Távolságok Geometriai Típusa',
    subtitle: 'Sorold be az állításokat és fogalmakat a megfelelő távolsági kategóriába!',
    categories: [
      {
        id: 'cat-pt-pt',
        name: 'Két Pont Távolsága',
        description: 'Összekötő szakasz hossza',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-pt-line',
        name: 'Pont és Egyenes Távolsága',
        description: 'Merőleges szakasz hossza a talppontig',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      },
      {
        id: 'cat-line-line',
        name: 'Párhuzamosok Távolsága',
        description: 'Közös merőleges szakasz, mindenütt állandó',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      // Két pont
      { id: 'ds1-1', label: 'Az A és B pontot összekötő szakasz hossza: |AB|', category: 'cat-pt-pt' },
      { id: 'ds1-2', label: 'Koordinátasíkon: d = √((x₂ - x₁)² + (y₂ - y₁)²)', category: 'cat-pt-pt' },
      { id: 'ds1-3', label: 'A kör sugara a középpont és a körvonal egy pontjának távolsága', category: 'cat-pt-pt' },
      { id: 'ds1-4', label: 'A szakaszfelező merőleges pontjai ettől a két elemtől vannak egyenlő távol', category: 'cat-pt-pt' },
      // Pont és egyenes
      { id: 'ds1-5', label: 'A pontból az egyenesre bocsátott merőleges szakasz hossza', category: 'cat-pt-line' },
      { id: 'ds1-6', label: 'A legrövidebb összekötő távolság a pont és az egyenes pontjai között', category: 'cat-pt-line' },
      { id: 'ds1-7', label: 'A háromszög magassága a csúcs távolsága a szemközti oldalegyenestől', category: 'cat-pt-line' },
      { id: 'ds1-8', label: 'Ha a pont rajta van az egyenesen, akkor a távolság 0', category: 'cat-pt-line' },
      // Párhuzamosok
      { id: 'ds1-9', label: 'Két egyenes közös merőleges szakaszának hossza', category: 'cat-line-line' },
      { id: 'ds1-10', label: 'A sík minden pontjában állandó érték', category: 'cat-line-line' },
      { id: 'ds1-11', label: 'Középpárhuzamos egyenes felezi ezt a távolságot', category: 'cat-line-line' },
      { id: 'ds1-12', label: 'A sávszélesség a két határvonal között', category: 'cat-line-line' }
    ]
  },
  2: {
    title: '2. Szint: Mértani Helyek Osztályozása',
    subtitle: 'Csoportosítsd a ponthalmazokat az alakzatuk szerint!',
    categories: [
      {
        id: 'cat-circle',
        name: 'Körvonal vagy Körív',
        description: 'Adott ponttól r távolságra lévő pontok',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-single-line',
        name: 'Egyetlen Egyenes',
        description: 'Szakaszfelező merőleges vagy középpárhuzamos',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-line-pair',
        name: 'Két Egyenes (Egyenespár)',
        description: 'Szögfelezők párja vagy adott távolságú párhuzamosok',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Körvonal
      { id: 'ds2-1', label: 'Adott O ponttól pontosan 5 cm távolságra lévő síkbeli pontok', category: 'cat-circle' },
      { id: 'ds2-2', label: 'Egy háromszög csúcsaitól egyenlő távolságra lévő síkbeli pontok', category: 'cat-circle' },
      { id: 'ds2-3', label: 'Szakasz két végpontjából derékszögben látszó pontok halmaza', category: 'cat-circle' },
      { id: 'ds2-4', label: 'Egy rögzített kör középpontjától r távolságú pontok halmaza', category: 'cat-circle' },
      // Egyetlen egyenes
      { id: 'ds2-5', label: 'Két adott ponttól (A és B) egyenlő távolságra lévő pontok halmaza', category: 'cat-single-line' },
      { id: 'ds2-6', label: 'Két párhuzamos egyenestől egyenlő távolságra lévő pontok', category: 'cat-single-line' },
      { id: 'ds2-7', label: 'Egy konvex szög belsejében a száraktól egyenlő távolságra lévő pontok', category: 'cat-single-line' },
      { id: 'ds2-8', label: 'Egyenlő szárú háromszög alapjának felezőmerőlegese', category: 'cat-single-line' },
      // Két egyenes
      { id: 'ds2-9', label: 'Két metsző egyenestől egyenlő távolságra lévő pontok teljes halmaza', category: 'cat-line-line-pair' as any || 'cat-line-pair' },
      { id: 'ds2-10', label: 'Egy e egyenestől 3 cm távolságra lévő síkbeli pontok halmaza', category: 'cat-line-pair' },
      { id: 'ds2-11', label: 'Két egymást metsző egyenes szögfelezőinek összessége', category: 'cat-line-pair' },
      { id: 'ds2-12', label: 'Egy egyenes vonaltól 10 méterre lévő két párhuzamos vonal', category: 'cat-line-pair' }
    ]
  },
  3: {
    title: '3. Szint: Távolságok Számítása és Koordináták',
    subtitle: 'Csoportosítsd a feladatokat az eredmény nagysága szerint!',
    categories: [
      {
        id: 'cat-dist-small',
        name: 'Távolság: d ≤ 5 egység',
        description: 'Kis távolságértékek',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-dist-medium',
        name: 'Távolság: 5 < d ≤ 10 egység',
        description: 'Közepes távolságértékek',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      },
      {
        id: 'cat-dist-large',
        name: 'Távolság: d > 10 egység',
        description: 'Nagyobb távolságértékek',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // d <= 5
      { id: 'ds3-1', label: 'P(3; 4) pont távolsága az origótól', category: 'cat-dist-small' },
      { id: 'ds3-2', label: 'P(7; 3) pont távolsága az x tengelytől', category: 'cat-dist-small' },
      { id: 'ds3-3', label: 'y = 2 és y = 6 egyenesek távolsága', category: 'cat-dist-small' },
      { id: 'ds3-4', label: 'A(1; 1) és B(4; 5) pontok távolsága', category: 'cat-dist-small' },
      // 5 < d <= 10
      { id: 'ds3-5', label: 'P(6; 8) pont távolsága az origótól', category: 'cat-dist-medium' },
      { id: 'ds3-6', label: 'y = -3 és y = 4 egyenesek távolsága', category: 'cat-dist-medium' },
      { id: 'ds3-7', label: 'r = 10 cm körben a 16 cm-es húr távolsága a középponttól', category: 'cat-dist-medium' },
      { id: 'ds3-8', label: 'A(0; 0) és B(0; 9) pontok távolsága', category: 'cat-dist-medium' },
      // d > 10
      { id: 'ds3-9', label: 'P(5; 12) pont távolsága az origótól', category: 'cat-dist-large' },
      { id: 'ds3-10', label: 'y = -5 és y = 10 egyenesek távolsága', category: 'cat-dist-large' },
      { id: 'ds3-11', label: 'P(8; 15) pont távolsága az origótól', category: 'cat-dist-large' },
      { id: 'ds3-12', label: 'A(2; 3) és B(14; 8) pontok távolsága', category: 'cat-dist-large' }
    ]
  }
};

export const DistancesSorter: React.FC<DistancesSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-bevezetes-geometriaba',
  topicTitle = 'Távolságok'
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
      themeColor="cyan"
      storageKey="grade9-distances-sorter"
      levels={sorterLevels}
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • CSOPORTOSÍTÓ JÁTÉK"
    />
  );
};
