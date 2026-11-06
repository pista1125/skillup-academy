import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PracticeExamSorterProps {
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
    title: 'Mondatok Logikai Értékelése',
    subtitle: 'Sorold be a tankönyvi kijelentéseket a megfelelő kategóriába: IGAZ Állítás, HAMIS Állítás, vagy Nem Állítás!',
    categories: [
      {
        id: 'cat-true',
        name: 'IGAZ Matematikai Állítás',
        description: 'Minden esetben érvényes, bizonyított matematikai vagy természeti tény',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-false',
        name: 'HAMIS Matematikai Állítás',
        description: 'Létezik ellenpélda, ami megcáfolja a kijelentést',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-non-prop',
        name: 'Nem Állítás',
        description: 'Kérdés, felkiáltás, felszólítás vagy szubjektív vélemény',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300'
      }
    ],
    items: [
      // Igaz
      { id: 'ps1-1', label: '„A 2 az egyetlen páros prímszám.”', category: 'cat-true' },
      { id: 'ps1-2', label: '„Három pozitív valós szám szorzata mindig pozitív.”', category: 'cat-true' },
      { id: 'ps1-3', label: '„Ha egy négyszög négyzet, akkor minden szöge derékszög.”', category: 'cat-true' },
      { id: 'ps1-4', label: '„Két különböző valós szám négyzetösszege szigorúan pozitív.”', category: 'cat-true' },

      // Hamis
      { id: 'ps1-5', label: '„A kutya nem emlősállat.”', category: 'cat-false' },
      { id: 'ps1-6', label: '„Minden sokszögnek van átlója.” (Háromszög!)', category: 'cat-false' },
      { id: 'ps1-7', label: '„Bármely valós szám abszolút értéke pozitív.” (A 0!)', category: 'cat-false' },
      { id: 'ps1-8', label: '„Egy szorzat negatív, ha van benne negatív tényező.”', category: 'cat-false' },

      // Nem állítás
      { id: 'ps1-9', label: '„Milyen nap van ma?” (Kérdés)', category: 'cat-non-prop' },
      { id: 'ps1-10', label: '„Minden lány csinos.” (Szubjektív értékítélet)', category: 'cat-non-prop' },
      { id: 'ps1-11', label: '„Oldd meg a témazáró feladatokat a füzetedben!”', category: 'cat-non-prop' },
      { id: 'ps1-12', label: '„Olimpiai sport a tenisz?” (Kérdés)', category: 'cat-non-prop' }
    ]
  },
  2: {
    title: 'Tagadási Módszerek Típusai',
    subtitle: 'Csoportosítsd a tagadási sémákat a logikai szerkezetük alapján!',
    categories: [
      {
        id: 'cat-univ-neg',
        name: 'Univerzális Állítás Tagadása',
        description: 'A „Minden...” tagadása: van olyan kivétel, amelyre nem teljesül',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-exist-neg',
        name: 'Létezési Állítás Tagadása',
        description: 'A „Van olyan...” tagadása: egyetlen olyan elem sincs (univerzális hiány)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-comp-neg',
        name: 'Összetett Kifejezés Tagadása',
        description: 'De Morgan-szabályok (ÉS/VAGY) és implikáció tagadása',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // Univerzális tagadása
      { id: 'ps2-1', label: '„Van olyan atomóra, amelyik késik vagy siet.”', category: 'cat-univ-neg' },
      { id: 'ps2-2', label: '„Van olyan érettségi feladat, ami nem egyszerű.”', category: 'cat-univ-neg' },
      { id: 'ps2-3', label: '„Van olyan háztartás, ahol nincs televízió.”', category: 'cat-univ-neg' },
      { id: 'ps2-4', label: '„Van olyan városi kéményseprő, aki nem fekete.”', category: 'cat-univ-neg' },

      // Létezési tagadása
      { id: 'ps2-5', label: '„A szalonban egyik autó sem kék.”', category: 'cat-exist-neg' },
      { id: 'ps2-6', label: '„Nincs olyan magyar település, ahol él Laurencia.”', category: 'cat-exist-neg' },
      { id: 'ps2-7', label: '„Egyetlen társasjátékhoz sem kell dobókocka.”', category: 'cat-exist-neg' },
      { id: 'ps2-8', label: '„Minden mackó utálja a mézet.”', category: 'cat-exist-neg' },

      // Összetett tagadása
      { id: 'ps2-9', label: '¬A ∨ ¬B (A konjunkció De Morgan-tagadása)', category: 'cat-comp-neg' },
      { id: 'ps2-10', label: '¬A ∧ ¬B (A diszjunkció De Morgan-tagadása)', category: 'cat-comp-neg' },
      { id: 'ps2-11', label: 'A ∧ ¬B (Az implikáció logikai tagadása)', category: 'cat-comp-neg' },
      { id: 'ps2-12', label: '„Vasárnap süt a nap, de nem kirándulunk.”', category: 'cat-comp-neg' }
    ]
  },
  3: {
    title: 'Bizonyítási és Következtetési Módszerek',
    subtitle: 'Sorold be a matematikai érveléseket a bizonyítási stratégia típusa szerint!',
    categories: [
      {
        id: 'cat-indirect',
        name: 'Indirekt Bizonyítás',
        description: 'A tagadás feltevéséből ellentmondásra jutunk (kontrapozíció)',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-counterexample',
        name: 'Cáfolat Ellenpéldával',
        description: 'Egyetlen konkrét kivétel bemutatásával döntjük meg az állítást',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-equiv',
        name: 'Kétirányú Ekvivalencia',
        description: 'Akkor és csak akkor kapcsolat: oda-vissza érvényes levezetés',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      // Indirekt
      { id: 'ps3-1', label: '√2 irracionális: a racionális feltevésből ellentmondásra jutunk', category: 'cat-indirect' },
      { id: 'ps3-2', label: 'n² páros ⇒ n páros: n páratlan feltevéséből n² páratlan adódik', category: 'cat-indirect' },
      { id: 'ps3-3', label: 'Prímszámok végtelen száma: a véges lista ellentmondást szül', category: 'cat-indirect' },
      { id: 'ps3-4', label: 'A ⇒ B igazságának bizonyítása a ¬B ⇒ ¬A igazolásával', category: 'cat-indirect' },

      // Ellenpélda
      { id: 'ps3-5', label: 'A 2-es szám felmutatása: nem minden prím páratlan', category: 'cat-counterexample' },
      { id: 'ps3-6', label: 'A 9 felmutatása: nem minden 3-mal osztható szám osztható 6-tal', category: 'cat-counterexample' },
      { id: 'ps3-7', label: 'A háromszög felmutatása: nem minden sokszögnek van átlója', category: 'cat-counterexample' },
      { id: 'ps3-8', label: 'Húrtrapéz felmutatása: nem minden trapéz paralelogramma', category: 'cat-counterexample' },

      // Ekvivalencia
      { id: 'ps3-9', label: '„Négyszög paralelogramma ⟺ szemközti szögei egyenlők”', category: 'cat-equiv' },
      { id: 'ps3-10', label: '„Háromszög szabályos ⟺ minden belső szöge 60°-os”', category: 'cat-equiv' },
      { id: 'ps3-11', label: '„(x + 3)(5 - x) = 0 ⟺ x = -3 VAGY x = 5”', category: 'cat-equiv' },
      { id: 'ps3-12', label: '„(x + 3)² + (5 - y)² = 0 ⟺ x = -3 ÉS y = 5”', category: 'cat-equiv' }
    ]
  }
};

export const PracticeExamSorter: React.FC<PracticeExamSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-logic-tudasproba-sorter',
  topicTitle = '6. Gyakorlás, tudáspróba'
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

(PracticeExamSorter as any).sorterLevels = sorterLevels;

export default PracticeExamSorter;

