import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface AlgebraicMethodsSorterProps {
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
    title: 'Legcélszerűbb Algebrai Módszer Kiválasztása',
    subtitle: 'Melyik módszerrel oldható meg leggyorsabban és legkevesebb törttel a rendszer?',
    categories: [
      {
        id: 'cat-sub',
        name: 'Behelyettesítő módszer',
        description: 'Van 1 vagy −1 együtthatójú ismeretlen, ami azonnal kifejezhető',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-elim',
        name: 'Egyenlő együtthatók (Elimináció)',
        description: 'Már azonosak/ellentettek az együtthatók, vagy szorzással könnyen kiejthetők',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-direct',
        name: 'Azonnali felismerés / Összehasonlítás',
        description: 'Mindkettőből y kifejezve, vagy ránézésre azonosság / ellentmondás',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      // Behelyettesítő
      { id: 'ams1-1', label: 'x = 3y − 2  és  2x + 5y = 18 (x már kifejezve)', category: 'cat-sub' },
      { id: 'ams1-2', label: 'x + 4y = 9  és  3x − 2y = 13 (I-ből x = 9 − 4y)', category: 'cat-sub' },
      { id: 'ams1-3', label: '5x − y = 7  és  2x + 3y = 8 (I-ből y = 5x − 7)', category: 'cat-sub' },
      { id: 'ams1-4', label: '2x + y = 1  és  7x + 3y = 4 (I-ből y = 1 − 2x)', category: 'cat-sub' },

      // Elimináció
      { id: 'ams1-5', label: '3x + 2y = 11  és  5x − 2y = 5 (+2y és −2y összeadódik)', category: 'cat-elim' },
      { id: 'ams1-6', label: '4x + 3y = 17  és  4x − 5y = 1 (4x kivonással kiesik)', category: 'cat-elim' },
      { id: 'ams1-7', label: '2x + 3y = 8  és  4x − y = 2 (II · 3 után y kiesik)', category: 'cat-elim' },
      { id: 'ams1-8', label: '3x + 5y = 19  és  2x + 3y = 12 (I · 2, II · 3 elimináció)', category: 'cat-elim' },

      // Azonnali / Összehasonlítás
      { id: 'ams1-9', label: 'y = 2x + 5  és  y = −x + 2 (Két függvény egyenlővé tétele)', category: 'cat-direct' },
      { id: 'ams1-10', label: '2x + 3y = 7  és  2x + 3y = 12 (0 = 5 ellentmondás)', category: 'cat-direct' },
      { id: 'ams1-11', label: 'x − 2y = 4  és  2x − 4y = 8 (0 = 0 azonosság)', category: 'cat-direct' },
      { id: 'ams1-12', label: 'y = 3x − 1  és  y = 3x + 4 (Párhuzamos egyenesek)', category: 'cat-direct' }
    ]
  },
  2: {
    title: 'Algebrai Vizsgálat: Megoldások Száma',
    subtitle: 'Sorold be a levezetések végeredményét a megoldások száma szerint!',
    categories: [
      {
        id: 'cat-one-sol',
        name: 'Pontosan 1 Megoldáspár',
        description: 'Határozott értékek adódnak: pl. x = 2, y = 3',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-no-sol',
        name: 'Nincs Megoldás (∅)',
        description: 'Ellentmondás adódik: 0 = k (k ≠ 0)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-inf-sol',
        name: 'Végtelen Sok Megoldás',
        description: 'Azonosság adódik: 0 = 0 (minden pont megoldás az egyenesen)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      // 1 megoldás
      { id: 'ams2-1', label: '7x = 14  ⟹  x = 2, visszahelyettesítve y = 1', category: 'cat-one-sol' },
      { id: 'ams2-2', label: 'y = −3, amiből x = 2 · (−3) + 8 = 2', category: 'cat-one-sol' },
      { id: 'ams2-3', label: '3x + y = 10 és x − y = 2  ⟹  (3; 1)', category: 'cat-one-sol' },
      { id: 'ams2-4', label: 'x = 0, y = 0 az egyetlen megoldás', category: 'cat-one-sol' },

      // Nincs megoldás
      { id: 'ams2-5', label: 'Kivonás után: 0 · x + 0 · y = 9  ⟹  0 = 9 hamis', category: 'cat-no-sol' },
      { id: 'ams2-6', label: '2(3x + y) = 14, de a másik egyenlet 6x + 2y = 10', category: 'cat-no-sol' },
      { id: 'ams2-7', label: 'x + y = 5 és x + y = −2  ⟹  0 = 7', category: 'cat-no-sol' },
      { id: 'ams2-8', label: '0 = −4 adódik az ismeretlenek kiesése után', category: 'cat-no-sol' },

      // Végtelen sok megoldás
      { id: 'ams2-9', label: 'Kivonás után: 0 · x + 0 · y = 0  ⟹  0 = 0 igaz', category: 'cat-inf-sol' },
      { id: 'ams2-10', label: 'A második egyenlet pontosan 3-szorosa az elsőnek', category: 'cat-inf-sol' },
      { id: 'ams2-11', label: '4x − 2y = 6  és  2x − y = 3  ⟹  Azonos egyenesek', category: 'cat-inf-sol' },
      { id: 'ams2-12', label: 'x = 5 − y beírása után: 5 − y + y = 5  ⟹  5 = 5', category: 'cat-inf-sol' }
    ]
  },
  3: {
    title: 'Rendszertípus és Megoldási Módszer',
    subtitle: 'Sorold be az egyenletrendszereket a felhasználandó matematikai technika alapján!',
    categories: [
      {
        id: 'cat-linear-2',
        name: 'Standard Kétismeretlenes Lineáris',
        description: 'Hagyományos behelyettesítéssel vagy eliminációval megoldható',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-auxiliary',
        name: 'Új Segédváltozós (Törtes)',
        description: 'a = 1/x és b = 1/y helyettesítéssel linearizálandó',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-linear-3',
        name: 'Háromismeretlenes Rendszer',
        description: 'Három változó (x, y, z), lépcsős Gauss-kiküszöbölés szükséges',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      }
    ],
    items: [
      // Standard 2
      { id: 'ams3-1', label: '3x − 2y = 8  és  5x + y = 22', category: 'cat-linear-2' },
      { id: 'ams3-2', label: 'x/2 + y/3 = 4  és  x − y = 1 (szorzás 6-tal sima lineárissá)', category: 'cat-linear-2' },
      { id: 'ams3-3', label: '2(x + 1) − 3y = 5  és  x + 4(y − 2) = 0', category: 'cat-linear-2' },
      { id: 'ams3-4', label: '7x + 2y = 16  és  3x + 5y = 19', category: 'cat-linear-2' },

      // Segédváltozós törtes
      { id: 'ams3-5', label: '3/x + 2/y = 7  és  1/x − 1/y = −1', category: 'cat-auxiliary' },
      { id: 'ams3-6', label: '5/x − 4/y = 1  és  2/x + 3/y = 5', category: 'cat-auxiliary' },
      { id: 'ams3-7', label: '1/(x+y) + 1/(x−y) = 3/4  és  1/(x+y) − 1/(x−y) = −1/4', category: 'cat-auxiliary' },
      { id: 'ams3-8', label: '6/(2x−1) + 4/(y+2) = 5  és  2/(2x−1) − 2/(y+2) = 0', category: 'cat-auxiliary' },

      // 3 ismeretlenes
      { id: 'ams3-9', label: 'x + y + z = 6,  2x − y + z = 3,  x + 2y − z = 2', category: 'cat-linear-3' },
      { id: 'ams3-10', label: 'x + y = 5,  y + z = 7,  x + z = 6', category: 'cat-linear-3' },
      { id: 'ams3-11', label: '2x + y − z = 1,  x − y + z = 2,  3x + 2y + z = 10', category: 'cat-linear-3' },
      { id: 'ams3-12', label: 'a + b + c = 180 (háromszög szögei), b = 2a, c = 3a', category: 'cat-linear-3' }
    ]
  }
};

export const AlgebraicMethodsSorter: React.FC<AlgebraicMethodsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-egyenletrendszerek',
  topicTitle = '2. Egyenletrendszerek megoldása algebrai módszerekkel'
}) => {
  const activeLvl = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <SorterTemplate
      title="2. Egyenletrendszerek algebrai megoldása – Csoportosító Játék"
      subtitle="Rendszerezd az egyenletrendszereket módszerük, megoldásszámuk és típusuk szerint!"
      badge="10. OSZTÁLY • II. EGYENLETRENDSZEREK"
      topicBadge="10. OSZTÁLY • II. EGYENLETRENDSZEREK • 8. LECKE"
      levels={sorterLevels}
      currentLevel={activeLvl}
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

