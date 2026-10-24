import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  TwoSetsSieveSvg,
  DivisibilitySieveSvg,
  ThreeSetsSieveSvg,
  SurveyVennSvg,
  DisjointSieveSvg
} from './SieveFigures';

interface SieveSorterProps {
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
    title: '1. Szint: Szöveges Kérdések Halmazelméleti Jelentése',
    subtitle: 'Döntsd el, hogy a kérdés Uniót (VAGY), Metszetet (ÉS), vagy Különbséget/Komplementert keres!',
    categories: [
      {
        id: 'cat-union',
        name: 'Unió Keresése (Legalább az egyik)',
        description: 'A teljes lefedettség, az összes érintett elem száma',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-inter',
        name: 'Metszet Keresése (Mindkettő / Közös)',
        description: 'A közös átfedés, együttes teljesülés száma',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-comp-diff',
        name: 'Különbség vagy Kívül Esők (Csak az egyik / Semelyik)',
        description: 'Egy adott halmaz elhagyása vagy a külső univerzumi maradék',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      }
    ],
    items: [
      { id: 'sis1-1', label: 'Hányan sportolnak VAGY zenélnek az osztályban?', category: 'cat-union', figure: <TwoSetsSieveSvg size={65} /> },
      { id: 'sis1-2', label: 'Hány szám osztható 2-vel vagy 3-mal?', category: 'cat-union', figure: <DivisibilitySieveSvg size={65} /> },
      { id: 'sis1-3', label: 'Legalább egy nyelvet beszélő diákok száma', category: 'cat-union' },
      { id: 'sis1-4', label: '|A| + |B| - |A ∩ B| kiszámítása', category: 'cat-union' },
      { id: 'sis1-5', label: 'Hányan sportolnak ÉS zenélnek egyszerre?', category: 'cat-inter' },
      { id: 'sis1-6', label: 'Hány szám osztható 2-vel és 3-mal is?', category: 'cat-inter' },
      { id: 'sis1-7', label: 'Mindkét szakkörre egyszerre járó tanulók', category: 'cat-inter' },
      { id: 'sis1-8', label: '|A| + |B| - |A ∪ B| kiszámítása', category: 'cat-inter' },
      { id: 'sis1-9', label: 'Hányan sportolnak, de NEM zenélnek?', category: 'cat-comp-diff', figure: <SurveyVennSvg size={65} /> },
      { id: 'sis1-10', label: 'Egyik sportot és nyelvet sem űzők száma U-ban', category: 'cat-comp-diff' },
      { id: 'sis1-11', label: 'Csak németül beszélő tanulók száma', category: 'cat-comp-diff' },
      { id: 'sis1-12', label: 'Sem 2-vel, sem 3-mal nem osztható számok', category: 'cat-comp-diff' }
    ]
  },
  2: {
    title: '2. Szint: Szitaformula Modell Típusa',
    subtitle: 'Sorold be a feladatokat 2 halmazos, 3 halmazos, vagy diszjunkt modellbe!',
    categories: [
      {
        id: 'cat-2set',
        name: '2 Halmazos Szita Modell',
        description: '|A ∪ B| = |A| + |B| - |A ∩ B| képlettel oldható meg',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-3set',
        name: '3 Halmazos Szita Modell',
        description: '+ egyediek − páros metszetek + hármas metszet ritmus',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-disjoint',
        name: 'Diszjunkt Szita Modell',
        description: 'A metszet 0, egyszerű összeadás (|A| + |B|)',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      }
    ],
    items: [
      { id: 'sis2-1', label: 'Angol és német nyelvet tanulók felmérése', category: 'cat-2set', figure: <TwoSetsSieveSvg size={65} /> },
      { id: 'sis2-2', label: '2-vel vagy 3-mal osztható számok 100-ig', category: 'cat-2set', figure: <DivisibilitySieveSvg size={65} /> },
      { id: 'sis2-3', label: 'Kávét vagy teát fogyasztók a munkahelyen', category: 'cat-2set' },
      { id: 'sis2-4', label: '4-gyel vagy 6-tal osztható számok', category: 'cat-2set' },
      { id: 'sis2-5', label: 'Matek, fizika és kémia szakkörösök felmérése', category: 'cat-3set', figure: <ThreeSetsSieveSvg size={65} /> },
      { id: 'sis2-6', label: '2-vel, 3-mal vagy 5-tel osztható számok 120-ig', category: 'cat-3set' },
      { id: 'sis2-7', label: 'Úszás, futás és kerékpározás triatlon felmérés', category: 'cat-3set' },
      { id: 'sis2-8', label: '8 tartományra oszló Venn-diagramos feladat', category: 'cat-3set' },
      { id: 'sis2-9', label: 'Páros és páratlan számok uniója', category: 'cat-disjoint', figure: <DisjointSieveSvg size={65} /> },
      { id: 'sis2-10', label: 'Fiúk és lányok csoportjának egyesítése', category: 'cat-disjoint' },
      { id: 'sis2-11', label: 'Pozitív és negatív számok halmaza', category: 'cat-disjoint' },
      { id: 'sis2-12', label: 'Két független osztály létszámának összeadása', category: 'cat-disjoint' }
    ]
  },
  3: {
    title: '3. Szint: Szita Állítások Matematikai Érvényessége',
    subtitle: 'Döntsd el, hogy az összefüggés Mindig Igaz, Mindig Hamis, vagy Feltételtől Függ!',
    categories: [
      {
        id: 'cat-true',
        name: 'Mindig Igaz (Alaptétel)',
        description: 'Bármilyen véges halmazokra kivétel nélkül érvényes',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-false',
        name: 'Mindig Hamis (Hiba)',
        description: 'Matematikai képtelenség vagy elvi tévedés',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-cond',
        name: 'Feltételtől Függ',
        description: 'Csak speciális esetekben (pl. diszjunkt halmazoknál) teljesül',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'sis3-1', label: '|A ∪ B| = |A| + |B| − |A ∩ B|', category: 'cat-true', figure: <TwoSetsSieveSvg size={65} /> },
      { id: 'sis3-2', label: '|A ∩ B| ≤ min(|A|, |B|)', category: 'cat-true' },
      { id: 'sis3-3', label: '|A ∪ B| ≤ |A| + |B|', category: 'cat-true' },
      { id: 'sis3-4', label: '3 halmaznál a hármas metszet előjele pozitív (+)', category: 'cat-true', figure: <ThreeSetsSieveSvg size={65} /> },
      { id: 'sis3-5', label: '|A ∪ B| = |A| + |B| + |A ∩ B|', category: 'cat-false' },
      { id: 'sis3-6', label: '|A ∩ B| > |A| véges halmazoknál', category: 'cat-false' },
      { id: 'sis3-7', label: '|A ∪ B| < 0 elemszám', category: 'cat-false' },
      { id: 'sis3-8', label: '3 halmaz szitájában a páros metszetek előjele pozitív', category: 'cat-false' },
      { id: 'sis3-9', label: '|A ∪ B| = |A| + |B|', category: 'cat-cond', figure: <DisjointSieveSvg size={65} /> },
      { id: 'sis3-10', label: '|A ∩ B| = 0', category: 'cat-cond' },
      { id: 'sis3-11', label: '|A ∪ B| = |A|', category: 'cat-cond' },
      { id: 'sis3-12', label: '|A ∪ B| = |U|', category: 'cat-cond' }
    ]
  }
};

export const SieveSorter: React.FC<SieveSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId,
  topicTitle
}) => {
  const activeLevel = currentLevel || level || 1;
  const config = sorterLevels[activeLevel] || sorterLevels[1];

  return (
    <SorterTemplate
      level={activeLevel}
      config={config}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId || 'g9-komb-szitaformula-sorter'}
      topicTitle={topicTitle || '9. Osztály - A Szitaformula Csoportosító'}
    />
  );
};

export default SieveSorter;
