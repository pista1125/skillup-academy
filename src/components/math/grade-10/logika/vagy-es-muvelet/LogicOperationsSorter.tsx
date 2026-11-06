import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LogicOperationsSorterProps {
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
    title: 'Művelet Típusa a Nyelvben',
    subtitle: 'Sorold be a kifejezéseket a megfelelő logikai művelethez: VAGY (∨), ÉS (∧) vagy TAGADÁS (¬)!',
    categories: [
      {
        id: 'cat-or',
        name: 'VAGY Művelet (Diszjunkció, ∨)',
        description: 'Legalább az egyik tag igaz (mindkettő is lehet)',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-and',
        name: 'ÉS Művelet (Konjunkció, ∧)',
        description: 'Mindkét feltételnek egyszerre kell teljesülnie („de”, „ugyanakkor”)',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-not',
        name: 'TAGADÁS Művelet (Negáció, ¬)',
        description: 'Az állítás igazságértékének megfordítása',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // VAGY
      { id: 'ls1-1', label: '„Kulcsár Győző Münchenben vagy Montrealban nyert aranyat.”', category: 'cat-or' },
      { id: 'ls1-2', label: '„A 24 osztható 3-mal vagy 4-gyel.”', category: 'cat-or' },
      { id: 'ls1-3', label: '„Ma este fagyizni vagy moziba megyünk.”', category: 'cat-or' },
      { id: 'ls1-4', label: '„A háromszög egyenlő szárú vagy derékszögű.”', category: 'cat-or' },

      // ÉS
      { id: 'ls1-5', label: '„Dominik ügyes a passzokban, de pontatlanul lő.” (a „de” ÉS-t jelent)', category: 'cat-and' },
      { id: 'ls1-6', label: '„A 36 osztható 6-tal, valamint 8-cal is.”', category: 'cat-and' },
      { id: 'ls1-7', label: '„Ez az állat ragadozó, de nem védett.”', category: 'cat-and' },
      { id: 'ls1-8', label: '„Egerszegi Krisztina Perth-ben és Barcelonában is nyert.”', category: 'cat-and' },

      // TAGADÁS
      { id: 'ls1-9', label: '„Nem igaz, hogy ma esik a hó.”', category: 'cat-not' },
      { id: 'ls1-10', label: '„Nem minden macska fekete.”', category: 'cat-not' },
      { id: 'ls1-11', label: '„A sósav képlete nem HCl.”', category: 'cat-not' },
      { id: 'ls1-12', label: '„Egyik diák sem hiányzik az óráról.”', category: 'cat-not' }
    ]
  },
  2: {
    title: 'Összetett Kifejezések Logikai Jellege',
    subtitle: 'Döntsd el, hogy az összetett formula Mindig Igaz (Tautológia), Feltételtől Függő, vagy Lehetetlen (Ellentmondás)!',
    categories: [
      {
        id: 'cat-tautology',
        name: 'Mindig Igaz (Tautológia)',
        description: 'Bármely behelyettesítés esetén mindig IGAZ kimenetet ad',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-contingent',
        name: 'Feltételtől Függő',
        description: 'A részek igazságértékétől függően lehet igaz vagy hamis is',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-contradiction',
        name: 'Lehetetlen (Ellentmondás)',
        description: 'Egyetlen esetben sem lehet igaz (mindig HAMIS)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Mindig Igaz
      { id: 'ls2-1', label: 'A ∨ ¬A (egy állítás vagy a tagadása kötelezően igaz)', category: 'cat-tautology' },
      { id: 'ls2-2', label: '(A ∧ B) ⟹ A (ha mindkettő teljesül, A is teljesül)', category: 'cat-tautology' },
      { id: 'ls2-3', label: 'IGAZ ∨ B (ha az egyik tag már igaz, a diszjunkció biztosan igaz)', category: 'cat-tautology' },
      { id: 'ls2-4', label: '¬(A ∧ ¬A) (nem állhat fenn egy állítás és tagadása egyszerre)', category: 'cat-tautology' },

      // Feltételtől Függő
      { id: 'ls2-5', label: 'A ∧ B (értéke függ attól, hogy A és B igaz-e)', category: 'cat-contingent' },
      { id: 'ls2-6', label: 'A ∨ B (tetszőleges állítások megengedő kapcsolata)', category: 'cat-contingent' },
      { id: 'ls2-7', label: '„Holnap esni fog az eső vagy fújni fog a szél.”', category: 'cat-contingent' },
      { id: 'ls2-8', label: '„Dominik gólpasszt ad a hétvégi mérkőzésen.”', category: 'cat-contingent' },

      // Lehetetlen
      { id: 'ls2-9', label: 'A ∧ ¬A (egy állítás és tagadása egyszerre sosem állhat fenn)', category: 'cat-contradiction' },
      { id: 'ls2-10', label: 'HAMIS ∧ B (ha az egyik tag hamis, a konjunkció már nem lehet igaz)', category: 'cat-contradiction' },
      { id: 'ls2-11', label: '„A szám egyszerre páros és páratlan egész szám.”', category: 'cat-contradiction' },
      { id: 'ls2-12', label: '„A háromszög derékszögű, de nincs 90°-os szöge.”', category: 'cat-contradiction' }
    ]
  },
  3: {
    title: 'Számelméleti és Geometriai Kijelentések',
    subtitle: 'Válogasd szét a matematikai állításokat: Biztosan Igaz, Biztosan Hamis, vagy Ellenpéldával Cáfolható Általánosítás!',
    categories: [
      {
        id: 'cat-sure-true',
        name: 'Biztosan Igaz Kijelentés',
        description: 'Matematikailag igazolt, hibátlan állítás',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-sure-false',
        name: 'Biztosan Hamis Kijelentés',
        description: 'Matematikailag hibás, téves összetett állítás',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-counterexample',
        name: 'Ellenpéldával Cáfolható Általánosítás',
        description: 'Minden esetre állítja a feltételt, de létezik konkrét ellenpélda rá',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Biztosan Igaz
      { id: 'ls3-1', label: '„A 24 osztható 3-mal vagy 4-gyel.”', category: 'cat-sure-true' },
      { id: 'ls3-2', label: '„Az 50 osztható 5-tel és 10-zel.”', category: 'cat-sure-true' },
      { id: 'ls3-3', label: '„A 2 páros szám és prímszám.”', category: 'cat-sure-true' },
      { id: 'ls3-4', label: '„A négyzet minden szöge derékszög és minden oldala egyenlő.”', category: 'cat-sure-true' },

      // Biztosan Hamis
      { id: 'ls3-5', label: '„A 36 osztható 6-tal és 8-cal.”', category: 'cat-sure-false' },
      { id: 'ls3-6', label: '„A 35 osztható 2-vel vagy 3-mal.”', category: 'cat-sure-false' },
      { id: 'ls3-7', label: '„Van olyan síkbeli háromszög, ami derékszögű és tompaszögű is.”', category: 'cat-sure-false' },
      { id: 'ls3-8', label: '„Egy valós szám szigorúan kisebb 0-nál és szigorúan nagyobb 5-nél.”', category: 'cat-sure-false' },

      // Ellenpéldával cáfolható
      { id: 'ls3-9', label: '„Minden szám, ami osztható 3-mal, osztható 6-tal is.” (Ellenpélda: 9)', category: 'cat-counterexample' },
      { id: 'ls3-10', label: '„Ha egy négyszög átlói merőlegesek, akkor a négyszög négyzet.” (Ellenpélda: deltoid)', category: 'cat-counterexample' },
      { id: 'ls3-11', label: '„Minden prímszám páratlan.” (Ellenpélda: a 2)', category: 'cat-counterexample' },
      { id: 'ls3-12', label: '„Két páros szám összege mindig osztható 4-gyel.” (Ellenpélda: 2 + 4 = 6)', category: 'cat-counterexample' }
    ]
  }
};

export const LogicOperationsSorter: React.FC<LogicOperationsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-logic-vagy-es-sorter',
  topicTitle = '3. VAGY művelet, ÉS művelet'
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

(LogicOperationsSorter as any).sorterLevels = sorterLevels;

export default LogicOperationsSorter;

