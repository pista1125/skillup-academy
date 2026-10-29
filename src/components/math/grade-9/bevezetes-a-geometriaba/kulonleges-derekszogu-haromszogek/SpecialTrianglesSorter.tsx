import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SpecialTrianglesSorterProps {
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
    title: '1. Szint: Háromszögek Típusa Szögek és Arányok Szerint',
    subtitle: 'Sorold be a tulajdonságokat a megfelelő háromszögtípus alá!',
    categories: [
      {
        id: 'cat-306090',
        name: '30° - 60° - 90° (Félszabályos)',
        description: 'Szabályos háromszög fele, oldalarány: 1 : √3 : 2',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-454590',
        name: '45° - 45° - 90° (Egyenlő szárú)',
        description: 'Négyzet fele, oldalarány: 1 : 1 : √2',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-other',
        name: 'Egyéb Derékszögű Háromszög',
        description: 'Nem tartozik a két nevezetes típus közé',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300'
      }
    ],
    items: [
      // 30-60-90
      { id: 'ss1-1', label: 'Belső szögei: 30°, 60°, 90°', category: 'cat-306090' },
      { id: 'ss1-2', label: 'Átfogója pontosan a duplája a rövidebb befogónak', category: 'cat-306090' },
      { id: 'ss1-3', label: 'Oldalai: 4 cm, 4√3 cm, 8 cm', category: 'cat-306090' },
      { id: 'ss1-4', label: 'Egy szabályos háromszög felezésével jön létre', category: 'cat-306090' },
      // 45-45-90
      { id: 'ss1-5', label: 'Belső szögei: 45°, 45°, 90°', category: 'cat-454590' },
      { id: 'ss1-6', label: 'Két befogója egyenlő hosszúságú', category: 'cat-454590' },
      { id: 'ss1-7', label: 'Oldalai: 6 cm, 6 cm, 6√2 cm', category: 'cat-454590' },
      { id: 'ss1-8', label: 'Egy négyzet átló mentén történő kettévágásából származik', category: 'cat-454590' },
      // Egyéb derékszögű
      { id: 'ss1-9', label: 'Oldalai: 3 cm, 4 cm, 5 cm', category: 'cat-other' },
      { id: 'ss1-10', label: 'Oldalai: 5 cm, 12 cm, 13 cm', category: 'cat-other' },
      { id: 'ss1-11', label: 'Belső szögei: 20°, 70°, 90°', category: 'cat-other' },
      { id: 'ss1-12', label: 'Oldalai: 8 cm, 15 cm, 17 cm', category: 'cat-other' }
    ]
  },
  2: {
    title: '2. Szint: Adott Oldalhosszúságú Háromszögek Csoportosítása',
    subtitle: 'Válogasd szét a megadott oldalhosszúság-hármasokat a megfelelő kategóriába!',
    categories: [
      {
        id: 'cat-half-eq',
        name: 'Félszabályos Háromszögek (a, a√3, 2a)',
        description: 'Pontosan 1 : √3 : 2 arányú derékszögű háromszögek',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-iso-rt',
        name: 'Egyenlő Szárú Derékszögű (a, a, a√2)',
        description: 'Pontosan 1 : 1 : √2 arányú derékszögű háromszögek',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-general-rt',
        name: 'Általános Derékszögű Háromszögek',
        description: 'Pitagorasz-tétel teljesül, de nem a fenti két speciális eset',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      }
    ],
    items: [
      // Félszabályos
      { id: 'ss2-1', label: '1 cm, √3 cm, 2 cm', category: 'cat-half-eq' },
      { id: 'ss2-2', label: '5 cm, 5√3 cm, 10 cm', category: 'cat-half-eq' },
      { id: 'ss2-3', label: '3 cm, 3√3 cm, 6 cm', category: 'cat-half-eq' },
      { id: 'ss2-4', label: '√3 cm, 3 cm, 2√3 cm', category: 'cat-half-eq' },
      // Egyenlő szárú derékszögű
      { id: 'ss2-5', label: '1 cm, 1 cm, √2 cm', category: 'cat-iso-rt' },
      { id: 'ss2-6', label: '4 cm, 4 cm, 4√2 cm', category: 'cat-iso-rt' },
      { id: 'ss2-7', label: '√2 cm, √2 cm, 2 cm', category: 'cat-iso-rt' },
      { id: 'ss2-8', label: '7 cm, 7 cm, 7√2 cm', category: 'cat-iso-rt' },
      // Általános derékszögű
      { id: 'ss2-9', label: '6 cm, 8 cm, 10 cm', category: 'cat-general-rt' },
      { id: 'ss2-10', label: '7 cm, 24 cm, 25 cm', category: 'cat-general-rt' },
      { id: 'ss2-11', label: '9 cm, 12 cm, 15 cm', category: 'cat-general-rt' },
      { id: 'ss2-12', label: '10 cm, 24 cm, 26 cm', category: 'cat-general-rt' }
    ]
  },
  3: {
    title: '3. Szint: Képletek és Geometriai Származtatások',
    subtitle: 'Csoportosítsd a képleteket a megfelelő geometriai kontextus szerint!',
    categories: [
      {
        id: 'cat-3060',
        name: '30°-60°-90° és Szabályos Háromszög',
        description: '√3 szorzót tartalmazó összefüggések',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-4545',
        name: '45°-45°-90° és Négyzet',
        description: '√2 szorzót tartalmazó összefüggések',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-space',
        name: 'Kocka és Térbeli Testek',
        description: 'Lapátló és testátló számításai',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // 30-60
      { id: 'ss3-1', label: 'Szabályos háromszög magassága: m = (a · √3) / 2', category: 'cat-3060' },
      { id: 'ss3-2', label: 'Szabályos háromszög területe: T = (a² · √3) / 4', category: 'cat-3060' },
      { id: 'ss3-3', label: 'Hosszabbik befogó a rövidebből: b = a · √3', category: 'cat-3060' },
      { id: 'ss3-4', label: 'Félszabályos háromszög területe: T = (a² · √3) / 2', category: 'cat-3060' },
      // 45-45
      { id: 'ss3-5', label: 'Négyzet átlója az oldalból: d = a · √2', category: 'cat-4545' },
      { id: 'ss3-6', label: 'Egyenlő szárú derékszögű háromszög átfogója: c = a · √2', category: 'cat-4545' },
      { id: 'ss3-7', label: 'Négyzet oldala az átlóból: a = d / √2', category: 'cat-4545' },
      { id: 'ss3-8', label: 'Egyenlő szárú derékszögű háromszög területe: T = a² / 2', category: 'cat-4545' },
      // Kocka / Tér
      { id: 'ss3-9', label: 'Kocka lapátlója: d_lap = a · √2', category: 'cat-space' },
      { id: 'ss3-10', label: 'Kocka testátlója: D = a · √3', category: 'cat-space' }
    ]
  }
};

export const SpecialTrianglesSorter: React.FC<SpecialTrianglesSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-bevezetes-geometriaba',
  topicTitle = 'Különleges derékszögű háromszögek'
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
      themeColor="amber"
      storageKey="grade9-special-triangles-sorter"
      levels={sorterLevels}
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • CSOPORTOSÍTÓ JÁTÉK"
    />
  );
};

