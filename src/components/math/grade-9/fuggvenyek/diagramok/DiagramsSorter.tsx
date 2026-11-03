import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface DiagramsSorterProps {
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
    title: '1. Szint: Feladatok Besorolása a Megfelelő Diagramtípushoz',
    subtitle: 'Válaszd ki, melyik statisztikai kérdéshez melyik diagram illik legjobban!',
    categories: [
      {
        id: 'cat-bar',
        name: 'Oszlop- / Sávdiagram',
        description: 'Kategóriák és csoportok nagyságának összevetése',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-pie',
        name: 'Kördiagram',
        description: 'Rész-egész arányok (100% megoszlás)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-line',
        name: 'Vonaldiagram',
        description: 'Folyamatos időbeli változások, trendek',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      }
    ],
    items: [
      // Oszlop / sáv
      { id: 'ds1-1', label: 'Négy osztály sporteredményeinek pontszáma', category: 'cat-bar' },
      { id: 'ds1-2', label: 'Autómárkák eladott darabszámai a hónapban', category: 'cat-bar' },
      { id: 'ds1-3', label: 'Különböző gyümölcsök kilogrammonkénti ára', category: 'cat-bar' },
      { id: 'ds1-4', label: 'Könyvtárak látogatottsága városonként', category: 'cat-bar' },
      // Kör
      { id: 'ds1-5', label: 'Családi költségvetés százalékos megoszlása', category: 'cat-pie' },
      { id: 'ds1-6', label: 'Iskolai szavazás szavazatarányai', category: 'cat-pie' },
      { id: 'ds1-7', label: 'Büfé bevételének eloszlása termékfajtánként', category: 'cat-pie' },
      { id: 'ds1-8', label: 'Egy torta szeleteinek arányai', category: 'cat-pie' },
      // Vonal
      { id: 'ds1-9', label: 'Lázas beteg testhőmérséklete óránként', category: 'cat-line' },
      { id: 'ds1-10', label: 'Euró árfolyamának alakulása az év során', category: 'cat-line' },
      { id: 'ds1-11', label: 'Gyorsuló autó sebessége másodpercenként', category: 'cat-line' },
      { id: 'ds1-12', label: 'Napi légszennyezettségi index alakulása', category: 'cat-line' }
    ]
  },
  2: {
    title: '2. Szint: Körcikkek Besorolása Szögtartomány Szerint',
    subtitle: 'Sorold be a megadott százalékos arányokat a megfelelő szögtartományba!',
    categories: [
      {
        id: 'cat-acute',
        name: 'Hegyesszögű Szektor (0° < α < 90°)',
        description: '0% és 25% közötti részarány',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-right',
        name: 'Derékszög (α = 90°)',
        description: 'Pontosan 25%-os negyedrész',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-obtuse',
        name: 'Tompaszög / Egyenesszög (90° < α ≤ 180°)',
        description: '25% és 50% közötti részarány',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Hegyesszög (p < 25%)
      { id: 'ds2-1', label: '10% részesedés (36°)', category: 'cat-acute' },
      { id: 'ds2-2', label: '5% részesedés (18°)', category: 'cat-acute' },
      { id: 'ds2-3', label: '20% részesedés (72°)', category: 'cat-acute' },
      { id: 'ds2-4', label: '12,5% részesedés (45°)', category: 'cat-acute' },
      // Derékszög (p = 25%)
      { id: 'ds2-5', label: 'Pontosan a minta negyedrésze (1/4)', category: 'cat-right' },
      { id: 'ds2-6', label: '25% részesedés', category: 'cat-right' },
      { id: 'ds2-7', label: 'Derékszögű körcikk', category: 'cat-right' },
      { id: 'ds2-8', label: '90°-os szektorszög', category: 'cat-right' },
      // Tompaszög / Egyenesszög (25% < p <= 50%)
      { id: 'ds2-9', label: '30% részesedés (108°)', category: 'cat-obtuse' },
      { id: 'ds2-10', label: '40% részesedés (144°)', category: 'cat-obtuse' },
      { id: 'ds2-11', label: '50% részesedés (180° félkör)', category: 'cat-obtuse' },
      { id: 'ds2-12', label: '1/3 rész (120°)', category: 'cat-obtuse' }
    ]
  },
  3: {
    title: '3. Szint: Korrekt vs. Manipulatív Diagramtulajdonságok',
    subtitle: 'Válaszd szét a megbízható és a félrevezető ábrázolási technikákat!',
    categories: [
      {
        id: 'cat-fair',
        name: 'Korrekt és Megbízható',
        description: 'Aránytartó, pontos skálázású diagramok',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-misleading',
        name: 'Félrevezető / Manipulatív',
        description: 'Vizuális torzítások és csalóka technikák',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Korrekt
      { id: 'ds3-1', label: 'A függőleges tengely 0-ról indul', category: 'cat-fair' },
      { id: 'ds3-2', label: 'Az oszlopok szélessége teljesen azonos', category: 'cat-fair' },
      { id: 'ds3-3', label: 'Egyenlő időközökhöz egyenlő távolság tartozik az X tengelyen', category: 'cat-fair' },
      { id: 'ds3-4', label: 'A kördiagram szektorszögeinek összege pontosan 360°', category: 'cat-fair' },
      { id: 'ds3-5', label: 'Feltüntetett mértékegységek és pontos jelmagyarázat', category: 'cat-fair' },
      { id: 'ds3-6', label: '2D-s síkban rajzolt, nem döntött körcikkek', category: 'cat-fair' },
      // Megtévesztő
      { id: 'ds3-7', label: 'Csonkolt tengely (pl. skála 90-ről indul 0 helyett)', category: 'cat-misleading' },
      { id: 'ds3-8', label: '3D döntött perspektíva, amely az elülső körcikket felnagyítja', category: 'cat-misleading' },
      { id: 'ds3-9', label: 'Piktogram méreteinek (szélesség és magasság) egyidejű duplázása', category: 'cat-misleading' },
      { id: 'ds3-10', label: 'Különböző szélességű oszlopok az oszlopdiagramon', category: 'cat-misleading' },
      { id: 'ds3-11', label: 'Kihagyott vagy egyenlőtlen időközök azonos távolságon', category: 'cat-misleading' },
      { id: 'ds3-12', label: 'Hiányzó tengelyfeliratok és skálaértékek', category: 'cat-misleading' }
    ]
  }
};

export const DiagramsSorter: React.FC<DiagramsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-func-diagramok-sorter',
  topicTitle = '2. Diagramok'
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
      grade={9}
      chapterId="fuggvenyek"
      topicId={topicId}
      topicTitle={topicTitle}
      badge="9. Osztály • V. Függvények"
      levelConfigs={sorterLevels}
    />
  );
};

