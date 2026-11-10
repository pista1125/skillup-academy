import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GeometryProblemsSorterProps {
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
    title: 'Feladatok csoportosítása alakzattípus szerint',
    subtitle: 'Válogasd szét a feladatleírásokat a megfelelő geometriai kategóriába!',
    categories: [
      {
        id: 'cat-rect',
        name: 'Téglalap / Négyzet',
        description: 'Kerület, terület, oldalak szorzata vagy átló a feladat alapja.',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-tri',
        name: 'Derékszögű háromszög',
        description: 'Pitagorasz-tétel (a² + b² = c²), befogók és átfogó kapcsolata.',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-poly',
        name: 'Konvex sokszög átlói',
        description: 'A = n(n - 3) / 2 képlet és az oldalszám meghatározása.',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'gs1-1', content: 'Kert kerülete 48 m, területe 135 m². Keresd az oldalakat!', categoryId: 'cat-rect' },
      { id: 'gs1-2', content: 'Egyik befogó 7 cm-rel hosszabb a másiknál, az átfogó 13 cm.', categoryId: 'cat-tri' },
      { id: 'gs1-3', content: 'Hány oldalú a sokszög, ha összesen 54 átlója van?', categoryId: 'cat-poly' },
      { id: 'gs1-4', content: 'Medence körül egyenletesen 2 m széles járda fut.', categoryId: 'cat-rect' },
      { id: 'gs1-5', content: 'Befogók aránya 3:4, a terület 96 cm².', categoryId: 'cat-tri' },
      { id: 'gs1-6', content: 'Egy sokszög egyetlen csúcsából 9 átló húzható. Hány átlója van összesen?', categoryId: 'cat-poly' },
      { id: 'gs1-7', content: 'Téglalap átlója 25 cm, kerülete 70 cm.', categoryId: 'cat-rect' },
      { id: 'gs1-8', content: 'Átfogó 2 cm-rel hosszabb a hosszabbik befogónál, másik befogó 10 cm.', categoryId: 'cat-tri' },
      { id: 'gs1-9', content: 'Létezik-e olyan sokszög, amelynek 25 átlója van?', categoryId: 'cat-poly' },
      { id: 'gs1-10', content: 'Négyzet oldalát 3 cm-rel növelve a terület 39 cm²-rel nő.', categoryId: 'cat-rect' }
    ]
  },
  2: {
    title: 'Gyökök geometriai elfogadhatósága',
    subtitle: 'Döntsd el a kapott gyökökről, hogy elfogadható geometriai választ adnak-e, vagy kizárandók!',
    categories: [
      {
        id: 'cat-valid',
        name: 'Geometriailag elfogadható',
        description: 'Pozitív szakaszméret vagy n ≥ 3 egész oldalszám.',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-invalid',
        name: 'Kizárandó / Nem fogadható el',
        description: 'Negatív hosszúság, méreten kívüli kivágás vagy nem egész sokszög oldalszám.',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'gs2-1', content: 'Téglalap oldalhossza: x = 9 cm', categoryId: 'cat-valid' },
      { id: 'gs2-2', content: 'Derékszögű háromszög befogója: x = -12 cm', categoryId: 'cat-invalid' },
      { id: 'gs2-3', content: 'Konvex sokszög oldalszáma: n = 12', categoryId: 'cat-valid' },
      { id: 'gs2-4', content: 'Sokszög oldalszáma az egyenletből: n = 8,4', categoryId: 'cat-invalid' },
      { id: 'gs2-5', content: 'Ösvény szélessége a kert körül: x = 1,2 m', categoryId: 'cat-valid' },
      { id: 'gs2-6', content: 'Sokszög oldalszáma: n = -7', categoryId: 'cat-invalid' },
      { id: 'gs2-7', content: 'Egy 10 cm-es papírlap sarkából kivágandó négyzet oldala: x = 14 cm', categoryId: 'cat-invalid' },
      { id: 'gs2-8', content: 'Téglalap félkerületéből adódó mindkét oldal: a = 5 cm, b = 15 cm', categoryId: 'cat-valid' },
      { id: 'gs2-9', content: 'Derékszögű háromszög átfogója: c = -17 cm', categoryId: 'cat-invalid' },
      { id: 'gs2-10', content: 'Háromszög átfogója rövidebb a befogónál (c = 4 cm, miközben a = 5 cm)', categoryId: 'cat-invalid' }
    ]
  },
  3: {
    title: 'Helyes modell vs. Tipikus hiba',
    subtitle: 'Válogasd szét a geometriai állításokat aszerint, hogy helyes modellt vagy tipikus buktatót mutatnak!',
    categories: [
      {
        id: 'cat-correct',
        name: 'Helyes geometriai modell',
        description: 'Matematikailag és geometriailag precíz algebrai átírás.',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-error',
        name: 'Tipikus modellalkotási hiba',
        description: 'Gyakori diákhiba: hiányzó szorzó, téves képlet vagy rossz zárójelezés.',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'gs3-1', content: 'Téglalap körül x széles járda hossza: a + 2x (mivel mindkét oldalon hozzáadódik)', categoryId: 'cat-correct' },
      { id: 'gs3-2', content: 'Téglalap körül x széles járda hossza: a + x (csak egyszer adjuk hozzá)', categoryId: 'cat-error' },
      { id: 'gs3-3', content: 'Befogók x és x + 3: Pitagorasz-tétel: x² + (x + 3)² = c²', categoryId: 'cat-correct' },
      { id: 'gs3-4', content: 'Befogók x és x + 3: Hibás felírás: x² + x² + 9 = c² (hiányzik a 2ab tag!)', categoryId: 'cat-error' },
      { id: 'gs3-5', content: 'Sokszög átlóinak száma: A = n · (n - 3) / 2', categoryId: 'cat-correct' },
      { id: 'gs3-6', content: 'Sokszög átlóinak száma: A = n · (n - 2) / 2 (téves, mert a 2 szomszéd és a saját csúcs = 3)', categoryId: 'cat-error' },
      { id: 'gs3-7', content: 'K kerületű téglalap másik oldala: b = K/2 - a', categoryId: 'cat-correct' },
      { id: 'gs3-8', content: 'K kerületű téglalap másik oldala: b = K - a (elfelejtik, hogy 2 oldal van párban)', categoryId: 'cat-error' },
      { id: 'gs3-9', content: 'A téglalap terület-egyenletének (x² - (K/2)x + T = 0) két gyöke épp a két oldalhossz.', categoryId: 'cat-correct' },
      { id: 'gs3-10', content: 'Ha az egyenletnek van egy negatív gyöke, a feladatnak biztosan nincs megoldása.', categoryId: 'cat-error' }
    ]
  }
};

export const GeometryProblemsSorter: React.FC<GeometryProblemsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-quad-szoveges-geometria',
  topicTitle = 'Szöveges feladatok geometriából'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <SorterTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfigs={sorterLevels}
    />
  );
};

