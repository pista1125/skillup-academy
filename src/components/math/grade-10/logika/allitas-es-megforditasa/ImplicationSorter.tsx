import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ImplicationSorterProps {
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
    title: 'Következtetések Logikai Értéke',
    subtitle: 'Sorold be a kijelentéseket a megfelelő kategóriába: Biztosan IGAZ Implikáció, HAMIS Implikáció, vagy Nem Következtetés!',
    categories: [
      {
        id: 'cat-true',
        name: 'Biztosan IGAZ Implikáció',
        description: 'A feltételből törvényszerűen következik az utótag (nincs ellenpélda)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-false',
        name: 'HAMIS Implikáció',
        description: 'Létezik matematikai ellenpélda, ahol a feltétel igaz, de a cél nem',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-non-implication',
        name: 'Nem Logikai Következtetés',
        description: 'Kérdés, felszólítás, szubjektív vélemény vagy feltétel nélküli mondat',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300'
      }
    ],
    items: [
      // Biztosan Igaz
      { id: 'is1-1', label: '„Ha egy szám osztható 6-tal, akkor osztható 3-mal is.”', category: 'cat-true' },
      { id: 'is1-2', label: '„Ha egy négyszög négyzet, akkor téglalap.”', category: 'cat-true' },
      { id: 'is1-3', label: '„Ha egy állat bogár, akkor rovar is.”', category: 'cat-true' },
      { id: 'is1-4', label: '„Ha egy háromszög szabályos, akkor minden szöge 60°-os.”', category: 'cat-true' },

      // Hamis
      { id: 'is1-5', label: '„Ha egy szám osztható 3-mal, akkor osztható 6-tal is.”', category: 'cat-false' },
      { id: 'is1-6', label: '„Ha egy négyszög téglalap, akkor négyzet.”', category: 'cat-false' },
      { id: 'is1-7', label: '„Ha egy szám prímszám, akkor páratlan.”', category: 'cat-false' },
      { id: 'is1-8', label: '„Ha egy négyszög trapéz, akkor paralelogramma.”', category: 'cat-false' },

      // Nem következtetés
      { id: 'is1-9', label: '„Minden négyszög szép és tökéletes.”', category: 'cat-non-implication' },
      { id: 'is1-10', label: '„Holnap vajon esni fog az eső?”', category: 'cat-non-implication' },
      { id: 'is1-11', label: '„Oldd meg a másodfokú egyenletet a füzetedben!”', category: 'cat-non-implication' },
      { id: 'is1-12', label: '„Budapest Magyarország fővárosa.”', category: 'cat-non-implication' }
    ]
  },
  2: {
    title: 'Szükséges, Elégséges vagy Ekvivalens?',
    subtitle: 'Határozd meg, hogy az A feltétel milyen szerepet tölt be a B tulajdonság szempontjából!',
    categories: [
      {
        id: 'cat-sufficient',
        name: 'Csak Elégséges Feltétel',
        description: 'A teljesülése garantálja B-t, de B más úton is teljesülhet (A ⇒ B, vissza nem)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-necessary',
        name: 'Csak Szükséges Feltétel',
        description: 'B nélkülözhetetlen feltétele A-nak, de önmagában nem elég (B ⇒ A, előre nem)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-equiv',
        name: 'Szükséges és Elégséges (Ekvivalens)',
        description: 'A és B kölcsönösen feltételezi egymást, mindkét irányban igaz (A ⟺ B)',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // Csak elégséges
      { id: 'is2-1', label: '„Négyzetnek lenni” a téglalap szempontjából', category: 'cat-sufficient' },
      { id: 'is2-2', label: '„24-gyel oszthatónak lenni” a 8-cal való oszthatóság szempontjából', category: 'cat-sufficient' },
      { id: 'is2-3', label: '„Budapesten tartózkodni” a Magyarországon tartózkodás szempontjából', category: 'cat-sufficient' },
      { id: 'is2-4', label: '„Olimpiai bajnoki címet szerezni” az olimpiai éremszerzés szempontjából', category: 'cat-sufficient' },

      // Csak szükséges
      { id: 'is2-5', label: '„Téglalapnak lenni” a négyzet szempontjából', category: 'cat-necessary' },
      { id: 'is2-6', label: '„8-cal oszthatónak lenni” a 24-gyel való oszthatóság szempontjából', category: 'cat-necessary' },
      { id: 'is2-7', label: '„Páros számnak lenni” a 6-tal való oszthatóság szempontjából', category: 'cat-necessary' },
      { id: 'is2-8', label: '„Országhatárt átlépni” a külföldi utazás szempontjából', category: 'cat-necessary' },

      // Ekvivalens (szükséges és elégséges)
      { id: 'is2-9', label: '„Szabályos háromszög” és „Minden szöge 60°-os” viszonya', category: 'cat-equiv' },
      { id: 'is2-10', label: '„Négyszög paralelogramma” és „Szemközti oldalai párhuzamosak és egyenlők”', category: 'cat-equiv' },
      { id: 'is2-11', label: '„(x + 3)(5 - x) = 0” és „x = -3 VAGY x = 5” viszonya', category: 'cat-equiv' },
      { id: 'is2-12', label: '„Pozitív egész szám osztható 10-zel” és „Utolsó számjegye 0”', category: 'cat-equiv' }
    ]
  },
  3: {
    title: 'Eredeti és Megfordított Állítás Kapcsolata',
    subtitle: 'Vizsgáld meg az A ⇒ B és a megfordított B ⇒ A állítás együttes igazságértékét!',
    categories: [
      {
        id: 'cat-both-true',
        name: 'Mindkét irány IGAZ (Ekvivalencia)',
        description: 'A ⇒ B igaz ÉS B ⇒ A is igaz',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-forward-only',
        name: 'Csak az Eredeti IGAZ, a Megfordítás HAMIS',
        description: 'A ⇒ B igaz, de a megfordításra van ellenpélda (B ⇏ A)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-both-false',
        name: 'Mindkét irány HAMIS',
        description: 'Egyik tulajdonságból sem következik a másik',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Mindkét irány igaz
      { id: 'is3-1', label: 'A: „Háromszög szabályos” ⟺ B: „Háromszög három szöge egyenlő”', category: 'cat-both-true' },
      { id: 'is3-2', label: 'A: „Négyszög rombusz” ⟺ B: „Négyszög minden oldala egyenlő hosszú”', category: 'cat-both-true' },
      { id: 'is3-3', label: 'A: „Egy szám négyzete 0” ⟺ B: „Maga a szám 0”', category: 'cat-both-true' },
      { id: 'is3-4', label: 'A: „Holnap kedd van” ⟺ B: „Tegnap vasárnap volt”', category: 'cat-both-true' },

      // Csak eredeti igaz
      { id: 'is3-5', label: 'A: „Négyszög deltoid” ⇒ B: „Átlói merőlegesek egymásra”', category: 'cat-forward-only' },
      { id: 'is3-6', label: 'A: „Egy szám osztható 12-vel” ⇒ B: „Egy szám osztható 4-gyel”', category: 'cat-forward-only' },
      { id: 'is3-7', label: 'A: „Ez az állat veréb” ⇒ B: „Ez az állat madár”', category: 'cat-forward-only' },
      { id: 'is3-8', label: 'A: „Péter 9,5 mp alatt futja a 100 m-t” ⇒ B: „Péter 15 mp alatt lefutja”', category: 'cat-forward-only' },

      // Mindkettő hamis
      { id: 'is3-9', label: 'A: „Háromszög derékszögű” és B: „Háromszög szabályos”', category: 'cat-both-false' },
      { id: 'is3-10', label: 'A: „Egy szám osztható 5-tel” és B: „Egy szám osztható 3-mal”', category: 'cat-both-false' },
      { id: 'is3-11', label: 'A: „Négyszög húrtrapéz” és B: „Négyszög rombusz”', category: 'cat-both-false' },
      { id: 'is3-12', label: 'A: „Ma szerda van” és B: „Ma péntek van”', category: 'cat-both-false' }
    ]
  }
};

export const ImplicationSorter: React.FC<ImplicationSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-logic-allitas-megforditas-sorter',
  topicTitle = '5. Állítás és megfordítása'
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

(ImplicationSorter as any).sorterLevels = sorterLevels;

export default ImplicationSorter;

