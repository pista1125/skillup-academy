import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PracticeTestSorterProps {
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
    title: '1. Szint: Témakörök és Feladattípusok',
    subtitle: 'Sorold be a kifejezéseket és problémákat a fejezet 3 nagy tématerületébe!',
    categories: [
      {
        id: 'cat-ident',
        name: 'Kifejezések & Azonosságok',
        description: 'Polinomok, kiemelés, nevezetes szorzatok',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-eq',
        name: 'Egyenletek & Kikötések',
        description: 'Mérlegelv, törtes egyenletek, É.T. meghatározása',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-apps',
        name: 'Szöveges Feladatok & Rendszerek',
        description: 'Életkor, mozgás, keverés és 2 ismeretlen',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      // Kifejezések
      { id: 'pts1-1', label: '(2x - 3)²', category: 'cat-ident' },
      { id: 'pts1-2', label: 'x² - 25 szorzattá alakítása', category: 'cat-ident' },
      { id: 'pts1-3', label: '6x²y - 9xy² közös tényezője', category: 'cat-ident' },
      { id: 'pts1-4', label: '(x + 4)(x - 4) kifejtése', category: 'cat-ident' },
      // Egyenletek
      { id: 'pts1-5', label: '3x - 7 = 2x + 5 mérlegelvi megoldása', category: 'cat-eq' },
      { id: 'pts1-6', label: '(x + 1)/3 = (2x - 1)/5 közös nevezője', category: 'cat-eq' },
      { id: 'pts1-7', label: '4 / (x - 6) értelmezési tartománya', category: 'cat-eq' },
      { id: 'pts1-8', label: '2x + 10 = 0 ellenőrzése', category: 'cat-eq' },
      // Szöveges & Rendszerek
      { id: 'pts1-9', label: 'Apa és fia életkorának aránya 5 év múlva', category: 'cat-apps' },
      { id: 'pts1-10', label: 'Két autó szembetalálkozása (s = v · t)', category: 'cat-apps' },
      { id: 'pts1-11', label: '30%-os és 50%-os sóoldat keverése', category: 'cat-apps' },
      { id: 'pts1-12', label: 'x + y = 14 és x - y = 6 egyenletrendszer', category: 'cat-apps' }
    ]
  },
  2: {
    title: '2. Szint: Megoldáshalmazok Besorolása',
    subtitle: 'Határozd meg az egyenletek és rendszerek lehetséges megoldásszámát!',
    categories: [
      {
        id: 'cat-one',
        name: 'Egyetlen Megoldás',
        description: 'Pontosan 1 valós gyök vagy 1 rendezett számpár',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-none',
        name: 'Nincs Megoldás (M = ∅)',
        description: 'Ellentmondás: 0 = k (k ≠ 0) vagy hamis gyök kiesése',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-inf',
        name: 'Végtelen Sok Megoldás',
        description: 'Azonosság: 0 = 0 minden megengedett ismeretlenre',
        badgeColor: 'bg-violet-100 text-violet-900 border-violet-300'
      }
    ],
    items: [
      // Egyetlen
      { id: 'pts2-1', label: '4x - 5 = 15', category: 'cat-one' },
      { id: 'pts2-2', label: 'x + y = 10 és x - y = 2', category: 'cat-one' },
      { id: 'pts2-3', label: '2(x - 3) = 8', category: 'cat-one' },
      { id: 'pts2-4', label: '3x + 1 = x + 7', category: 'cat-one' },
      // Nincs
      { id: 'pts2-5', label: '2x + 4 = 2x + 9', category: 'cat-none' },
      { id: 'pts2-6', label: 'x + y = 5 és x + y = 8', category: 'cat-none' },
      { id: 'pts2-7', label: '(x - 4)/(x - 4) = 0', category: 'cat-none' },
      { id: 'pts2-8', label: 'x + 3 = x - 1', category: 'cat-none' },
      // Végtelen
      { id: 'pts2-9', label: '3(x + 2) = 3x + 6', category: 'cat-inf' },
      { id: 'pts2-10', label: '2x + 4y = 10 és x + 2y = 5', category: 'cat-inf' },
      { id: 'pts2-11', label: '(x - 1)(x + 1) = x² - 1', category: 'cat-inf' },
      { id: 'pts2-12', label: '5x - 5x + 7 = 7', category: 'cat-inf' }
    ]
  },
  3: {
    title: '3. Szint: Algebrai Műveletek Hatása a Gyökökre',
    subtitle: 'Milyen következménnyel jár az adott lépés az egyenlet megoldáshalmazára?',
    categories: [
      {
        id: 'cat-equiv',
        name: 'Ekvivalens Átalakítás',
        description: 'A megoldáshalmaz garantáltan változatlan marad',
        badgeColor: 'bg-green-100 text-green-900 border-green-300'
      },
      {
        id: 'cat-gain',
        name: 'Gyökbevitel (Hamis gyök)',
        description: 'Olyan új gyök jelenhet meg, ami az eredetinek nem megoldása',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-loss',
        name: 'Gyökvesztés Veszélye',
        description: 'Valódi megoldás veszhet el az átalakítás során',
        badgeColor: 'bg-red-100 text-red-900 border-red-300'
      }
    ],
    items: [
      // Ekvivalens
      { id: 'pts3-1', label: 'Mindkét oldalhoz hozzáadunk 8-at', category: 'cat-equiv' },
      { id: 'pts3-2', label: 'Mindkét oldalt szorozzuk (-3)-mal', category: 'cat-equiv' },
      { id: 'pts3-3', label: 'Zárójel felbontása disztributivitással', category: 'cat-equiv' },
      { id: 'pts3-4', label: 'Mindkét oldalból kivonunk 4x-et', category: 'cat-equiv' },
      // Gyökbevitel
      { id: 'pts3-5', label: 'Mindkét oldal szorzása (x - 2)-vel', category: 'cat-gain' },
      { id: 'pts3-6', label: 'Mindkét oldal négyzetre emelése', category: 'cat-gain' },
      { id: 'pts3-7', label: 'Szorzás ismeretlent tartalmazó kifejezéssel', category: 'cat-gain' },
      { id: 'pts3-8', label: 'Törtes egyenlet felszorzása ellenőrzés nélkül', category: 'cat-gain' },
      // Gyökvesztés
      { id: 'pts3-9', label: 'Mindkét oldal osztása x-szel (ahol x lehet 0)', category: 'cat-loss' },
      { id: 'pts3-10', label: 'x(x - 5) = 2(x - 5) egyszerűsítése (x - 5)-tel', category: 'cat-loss' },
      { id: 'pts3-11', label: 'Osztás ismeretlent tartalmazó kifejezéssel', category: 'cat-loss' },
      { id: 'pts3-12', label: 'x² = 7x mindkét oldalának leosztása x-szel', category: 'cat-loss' }
    ]
  }
};

export const PracticeTestSorter: React.FC<PracticeTestSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-egyenlet-gyakorlas-quiz',
  topicTitle = 'Gyakorlás, tudáspróba'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <SorterTemplate
      levels={sorterLevels}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      color="purple"
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

