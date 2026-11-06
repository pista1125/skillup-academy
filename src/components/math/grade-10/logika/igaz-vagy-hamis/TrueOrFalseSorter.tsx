import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TrueOrFalseSorterProps {
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
    title: 'Mondatok Logikai Besorolása',
    subtitle: 'Sorold be a kifejezéseket a megfelelő kategóriába: Igaz állítás, Hamis állítás vagy Nem állítás!',
    categories: [
      {
        id: 'cat-true',
        name: 'Igaz Állítás',
        description: 'Objektív tény, amely a valóságban egyértelműen igaz',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-false',
        name: 'Hamis Állítás',
        description: 'Objektív kijelentés, amely a valóságban egyértelműen hamis',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-not-statement',
        name: 'Nem Állítás',
        description: 'Kérdés, felkiáltás, parancs, óhaj vagy szubjektív vélemény',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Igaz állítások
      { id: 'tfs1-1', label: 'A sósav kémiai képlete HCl.', category: 'cat-true' },
      { id: 'tfs1-2', label: 'A 2 az egyetlen páros prímszám.', category: 'cat-true' },
      { id: 'tfs1-3', label: 'A háromszög belső szögeinek összege 180° az euklideszi síkban.', category: 'cat-true' },
      { id: 'tfs1-4', label: 'Két páratlan egész szám szorzata mindig páratlan.', category: 'cat-true' },

      // Hamis állítások
      { id: 'tfs1-5', label: 'Svájc fővárosa Zürich.', category: 'cat-false' },
      { id: 'tfs1-6', label: 'Két páros természetes szám összege mindig osztható 4-gyel.', category: 'cat-false' },
      { id: 'tfs1-7', label: 'Minden prímszám páratlan.', category: 'cat-false' },
      { id: 'tfs1-8', label: 'A tompaszögű háromszögnek lehet két tompaszöge.', category: 'cat-false' },

      // Nem állítások
      { id: 'tfs1-9', label: 'Hány óra van most?', category: 'cat-not-statement' },
      { id: 'tfs1-10', label: 'Budapest szebb város, mint Tokió.', category: 'cat-not-statement' },
      { id: 'tfs1-11', label: 'Bárcsak ötöst kapnék matematikából!', category: 'cat-not-statement' },
      { id: 'tfs1-12', label: 'Oldd meg ezt a feladatot a füzetedben!', category: 'cat-not-statement' }
    ]
  },
  2: {
    title: 'Állítások, Tagadásaik és Szélső Értékek',
    subtitle: 'Válogasd szét a kijelentéseket: Helyes Negáció (¬A), Hibás Szélső Érték (Csapda), vagy Eredeti Állítás!',
    categories: [
      {
        id: 'cat-correct-neg',
        name: 'Helyes Logikai Tagadás (¬A)',
        description: 'Pontosan akkor igaz, ha az alapállítás hamis (nem lehetnek egyszerre hamisak sem!)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-trap-extreme',
        name: 'Hibás Szélső Érték (Csapda)',
        description: 'Túlzó állítás, amely az eredetivel együtt egyszerre hamis lehet',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-original-claim',
        name: 'Eredeti Pozitív Állítás',
        description: 'Alapvető kijelentés a vizsgált jelenségről',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      }
    ],
    items: [
      // Helyes tagadás
      { id: 'tfs2-1', label: '„Van olyan autó a garázsban, amelyik nem kék.”', category: 'cat-correct-neg' },
      { id: 'tfs2-2', label: '„Legfeljebb 32-en vagyunk a teremben.” (x ≤ 32)', category: 'cat-correct-neg' },
      { id: 'tfs2-3', label: '„A dolgozatomra kevesebb mint 50 pontot kaptam.” (x < 50)', category: 'cat-correct-neg' },
      { id: 'tfs2-4', label: '„Létezik két páros szám, amelyek összege nem osztható 4-gyel.”', category: 'cat-correct-neg' },

      // Szélső érték csapda
      { id: 'tfs2-5', label: '„Egyik autó sem kék a garázsban.” (A „minden autó kék” tagadásaként próbálva)', category: 'cat-trap-extreme' },
      { id: 'tfs2-6', label: '„Minden diák utálja a matematikát.” (A „minden diák szereti” tagadásaként próbálva)', category: 'cat-trap-extreme' },
      { id: 'tfs2-7', label: '„Legfeljebb 50 pontot kaptam.” (A „legalább 50 pontot kaptam” tagadásaként próbálva)', category: 'cat-trap-extreme' },
      { id: 'tfs2-8', label: '„Két páros szám összege sosem osztható 4-gyel.”', category: 'cat-trap-extreme' },

      // Eredeti állítások
      { id: 'tfs2-9', label: '„A garázsban minden autó kék.”', category: 'cat-original-claim' },
      { id: 'tfs2-10', label: '„Többen vagyunk a teremben, mint 32.” (x > 32)', category: 'cat-original-claim' },
      { id: 'tfs2-11', label: '„A dolgozatomra legalább 50 pontot kaptam.” (x ≥ 50)', category: 'cat-original-claim' },
      { id: 'tfs2-12', label: '„Két páros szám összege mindig osztható 4-gyel.”', category: 'cat-original-claim' }
    ]
  },
  3: {
    title: 'Következtetések Igazságértéke Adott Feltétel Mellett',
    subtitle: 'A megadott feltételek alapján döntsd el az állításokról: Biztosan Igaz, Biztosan Hamis, vagy Nem dönthető el!',
    categories: [
      {
        id: 'cat-sure-true',
        name: 'Biztosan Igaz',
        description: 'A feltételből logikailag és cáfolhatatlanul következik',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-sure-false',
        name: 'Biztosan Hamis',
        description: 'A feltétel ismeretében kizárt, ellentmondásos',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-uncertain',
        name: 'Nem Dönthető El',
        description: 'A feltételből nem következik sem az igazsága, sem a hamissága',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Biztosan igaz
      { id: 'tfs3-1', label: 'Feltétel: Egy 3×3×3-as festett kockát 27 kockára vágunk. -> Állítás: „Pontosan 8 db olyan kis kocka van, amelynek 3 lapja piros.”', category: 'cat-sure-true' },
      { id: 'tfs3-2', label: 'Feltétel: Dominik a meccsen 10 passzából 10-szer pontos volt. -> Állítás: „Van olyan passza Dominiknak, amelyik sikeres volt.”', category: 'cat-sure-true' },
      { id: 'tfs3-3', label: 'Feltétel: Az n természetes szám osztható 12-vel. -> Állítás: „Az n szám osztható 3-mal és 4-gyel is.”', category: 'cat-sure-true' },
      { id: 'tfs3-4', label: 'Feltétel: Az ABCD négyszög rombusz. -> Állítás: „Az ABCD négyszög átlói merőlegesek egymásra.”', category: 'cat-sure-true' },

      // Biztosan hamis
      { id: 'tfs3-5', label: 'Feltétel: Egy 3×3×3-as festett kockát 27 kockára vágunk. -> Állítás: „Van olyan kis kocka, amelynek 4 lapja piros.”', category: 'cat-sure-false' },
      { id: 'tfs3-6', label: 'Feltétel: Dominik kiváló pontrúgó és passzoló. -> Állítás: „Dominik pontatlanul passzol és a pontrúgásai gyengék.”', category: 'cat-sure-false' },
      { id: 'tfs3-7', label: 'Feltétel: A szabályos dobókockával egyszer dobunk. -> Állítás: „A dobás eredménye egyszerre páros és 5.”', category: 'cat-sure-false' },
      { id: 'tfs3-8', label: 'Feltétel: A háromszög derékszögű. -> Állítás: „A háromszög minden szöge egyenlő.”', category: 'cat-sure-false' },

      // Nem dönthető el
      { id: 'tfs3-9', label: 'Feltétel: „Morzsa kutya kedveli Cili cicát.” -> Állítás: „Morzsa minden más macskát is kedvel.”', category: 'cat-uncertain' },
      { id: 'tfs3-10', label: 'Feltétel: „Morzsa kutya kedveli Cili cicát.” -> Állítás: „Van olyan kutya, amelyik NEM kedveli Cili cicát.”', category: 'cat-uncertain' },
      { id: 'tfs3-11', label: 'Feltétel: Az osztályban pontosan 30 diák van. -> Állítás: „Több fiú van az osztályban, mint lány.”', category: 'cat-uncertain' },
      { id: 'tfs3-12', label: 'Feltétel: Egy egész szám osztható 3-mal. -> Állítás: „A szám osztható 6-tal is.”', category: 'cat-uncertain' }
    ]
  }
};

export const TrueOrFalseSorter: React.FC<TrueOrFalseSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-logic-igaz-hamis-sorter',
  topicTitle = '1. Igaz vagy hamis?'
}) => {
  return (
    <SorterTemplate
      level={currentLevel || level}
      currentLevel={currentLevel || level}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      grade={10}
      chapterId="logika"
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfig={sorterLevels}
      levelConfigs={sorterLevels}
      levels={sorterLevels}
      levelsConfig={sorterLevels}
    />
  );
};

(TrueOrFalseSorter as any).sorterLevels = sorterLevels;

export default TrueOrFalseSorter;
