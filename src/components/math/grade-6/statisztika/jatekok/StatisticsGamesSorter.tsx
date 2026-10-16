import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface StatisticsGamesSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onBack?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Számok válogatása Venn-diagramba',
    subtitle: 'Helyezd el a számokat a megfelelő Venn-tartományba (A: Páros számok, B: 3-mal osztható számok)!',
    categories: [
      {
        id: 'cat-only-a',
        name: 'Csak A (Csak Páros)',
        description: 'Páros, de 3-mal nem osztható (A \\ B)',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-both',
        name: 'A ∩ B (Metszet)',
        description: 'Páros ÉS 3-mal is osztható (6 többszörösei)',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      },
      {
        id: 'cat-only-b',
        name: 'Csak B (Csak 3-mal osztható)',
        description: '3-mal osztható, de páratlan (B \\ A)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-neither',
        name: 'Egyik sem (Kívül)',
        description: 'Páratlan ÉS 3-mal sem osztható',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      { id: 's1-1', label: 'Szám: 4', category: 'cat-only-a' },
      { id: 's1-2', label: 'Szám: 6', category: 'cat-both' },
      { id: 's1-3', label: 'Szám: 9', category: 'cat-only-b' },
      { id: 's1-4', label: 'Szám: 7', category: 'cat-neither' },
      { id: 's1-5', label: 'Szám: 12', category: 'cat-both' },
      { id: 's1-6', label: 'Szám: 10', category: 'cat-only-a' },
      { id: 's1-7', label: 'Szám: 15', category: 'cat-only-b' },
      { id: 's1-8', label: 'Szám: 11', category: 'cat-neither' },
      { id: 's1-9', label: 'Szám: 18', category: 'cat-both' },
      { id: 's1-10', label: 'Szám: 14', category: 'cat-only-a' },
      { id: 's1-11', label: 'Szám: 21', category: 'cat-only-b' },
      { id: 's1-12', label: 'Szám: 13', category: 'cat-neither' }
    ]
  },
  2: {
    title: '2. Szint: Szöveges kifejezések és halmazműveletek',
    subtitle: 'Válogasd szét a mindennapi mondatokat aszerint, hogy melyik halmazműveletet fejezik ki!',
    categories: [
      {
        id: 'cat-inter',
        name: 'Metszet (A ∩ B)',
        description: 'Mindkét feltétel egyszerre teljesül ("ÉS")',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      },
      {
        id: 'cat-union',
        name: 'Unió (A ∪ B)',
        description: 'Legalább az egyik feltétel teljesül ("VAGY")',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-diff',
        name: 'Különbség (A \\ B)',
        description: 'Csak az első feltétel teljesül, a második nem ("CSAK")',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-neither',
        name: 'Egyik sem (Kívül)',
        description: 'Sem az első, sem a második feltétel nem áll fenn',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300'
      }
    ],
    items: [
      { id: 's2-1', label: 'Angolul ÉS németül is folyékonyan beszél', category: 'cat-inter' },
      { id: 's2-2', label: 'Sportol VAGY zenél (akár mindkettőt is)', category: 'cat-union' },
      { id: 's2-3', label: 'Sportol, de semmilyen hangszeren nem játszik', category: 'cat-diff' },
      { id: 's2-4', label: 'Sem a kutyát, sem a macskát nem szereti', category: 'cat-neither' },
      { id: 's2-5', label: 'A ∩ B matematikai művelet', category: 'cat-inter' },
      { id: 's2-6', label: 'Legalább az egyik szakkörre beiratkozott', category: 'cat-union' },
      { id: 's2-7', label: 'Csak sakkozik, focizni nem focizik', category: 'cat-diff' },
      { id: 's2-8', label: 'Kimaradt mindkét versenycsapatból', category: 'cat-neither' },
      { id: 's2-9', label: 'A két halmaz közös része', category: 'cat-inter' },
      { id: 's2-10', label: 'A ∪ B matematikai művelet', category: 'cat-union' },
      { id: 's2-11', label: 'A \\ B matematikai kivonás', category: 'cat-diff' },
      { id: 's2-12', label: 'Kívül esik a két zárt körön az alaphalmazban', category: 'cat-neither' }
    ]
  },
  3: {
    title: '3. Szint: Logikai állítások igazságtartalma',
    subtitle: 'Döntsd el a halmazokról és logikai feladványokról szóló állításokról, hogy igazak vagy hamisak!',
    categories: [
      {
        id: 'cat-true',
        name: 'Mindig Igaz',
        description: 'Matematikailag helyes, érvényes összefüggés',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-false',
        name: 'Hamis / Hiba',
        description: 'Téves állítás vagy hibás statisztikai következtetés',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      { id: 's3-1', label: 'A két halmaz uniója nem lehet kevesebb bármelyik alaphalmazbeli résznél: |A ∪ B| ≥ |A|', category: 'cat-true' },
      { id: 's3-2', label: 'Az osztálylétszámot mindig megkapjuk a két csoport létszámának egyszerű összeadásával: |A| + |B|', category: 'cat-false' },
      { id: 's3-3', label: 'A Szita-formula helyes képlete: |A ∪ B| = |A| + |B| - |A ∩ B|', category: 'cat-true' },
      { id: 's3-4', label: '1-től 100-ig egy gondolt szám felező barkochbával legfeljebb 7 kérdésből biztosan kitalálható', category: 'cat-true' },
      { id: 's3-5', label: 'Egy logikai mátrixban egy sorban több pipa (✓) is lehet egyértelmű párosítás esetén', category: 'cat-false' },
      { id: 's3-6', label: 'A háromhalmazos Venn-diagramban pontosan 7 belső zárt tartomány keletkezik', category: 'cat-true' },
      { id: 's3-7', label: 'Ha két halmaz diszjunkt (nincs közös elemük), akkor a metszetük elemszáma 0', category: 'cat-true' },
      { id: 's3-8', label: 'A halmazok különbségénél mindig teljesül, hogy A \\ B = B \\ A', category: 'cat-false' },
      { id: 's3-9', label: '20 eldöntendő barkochba kérdéssel több mint 1 millió lehetőség közül is kitalálhatunk egyet', category: 'cat-true' },
      { id: 's3-10', label: 'Ha A halmaznak 10 eleme van, B-nek 8, akkor a metszetükben lehet akár 12 elem is', category: 'cat-false' }
    ]
  }
};

export const StatisticsGamesSorter: React.FC<StatisticsGamesSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onBack,
  topicId = 'g6-stat-games-sorter',
  topicTitle = 'Játékok és Venn-diagramok'
}) => {
  const activeLevel = (currentLevel || level) as DifficultyLevel;

  return (
    <SorterTemplate
      title="Halmazok és logikai játékok csoportosító"
      subtitle="Válogasd szét a számokat, halmazműveleti mondatokat és logikai állításokat 3 szinten!"
      badge="6. OSZTÁLY • VI. STATISZTIKA • 1. JÁTÉKOK"
      themeColor="pink"
      level={activeLevel}
      currentLevel={activeLevel}
      levels={sorterLevels}
      levelsConfig={sorterLevels}
      config={sorterLevels[activeLevel]}
      levelConfig={sorterLevels[activeLevel]}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onBack={onBack}
      topicId={topicId}
      topicTitle={topicTitle}
      grade={6}
      chapterId="statisztika"
    />
  );
};

export default StatisticsGamesSorter;
