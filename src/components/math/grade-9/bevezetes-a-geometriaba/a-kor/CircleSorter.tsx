import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CircleSorterProps {
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
    title: '1. Szint: Kör és Egyenes Kölcsönös Helyzete',
    subtitle: 'Sorold be a tulajdonságokat és feltételeket a megfelelő egyenestípusba!',
    categories: [
      {
        id: 'cat-secant',
        name: 'Szelő Egyenes (d < r)',
        description: '2 metszéspont a körvonallal, húrt metsz ki',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-tangent',
        name: 'Érintő Egyenes (d = r)',
        description: 'Pontosan 1 közös pont, merőleges az érintési sugárra',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-external',
        name: 'Külső Egyenes (d > r)',
        description: 'Nincs közös pontja a körvonallal',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300'
      }
    ],
    items: [
      // Szelő
      { id: 'cs1-1', label: 'Az egyenes távolsága a középponttól kisebb, mint a sugár', category: 'cat-secant' },
      { id: 'cs1-2', label: 'Pontosan két pontban metszi a kört', category: 'cat-secant' },
      { id: 'cs1-3', label: 'A kör belsejébe eső szakasza egy húr', category: 'cat-secant' },
      { id: 'cs1-4', label: 'r = 8 cm és d = 5 cm', category: 'cat-secant' },
      // Érintő
      { id: 'cs1-5', label: 'Az egyenes távolsága pontosan egyenlő a sugárral', category: 'cat-tangent' },
      { id: 'cs1-6', label: 'Pontosan egyetlen közös pontja van a körvonallal', category: 'cat-tangent' },
      { id: 'cs1-7', label: 'Az érintési pontba húzott sugár merőleges az egyenesre', category: 'cat-tangent' },
      { id: 'cs1-8', label: 'r = 10 cm és d = 10 cm', category: 'cat-tangent' },
      // Külső egyenes
      { id: 'cs1-9', label: 'Az egyenes távolsága nagyobb, mint a sugár', category: 'cat-external' },
      { id: 'cs1-10', label: 'Nincs közös pontja a körvonallal', category: 'cat-external' },
      { id: 'cs1-11', label: 'Minden pontja a körön kívül helyezkedik el', category: 'cat-external' },
      { id: 'cs1-12', label: 'r = 6 cm és d = 9 cm', category: 'cat-external' }
    ]
  },
  2: {
    title: '2. Szint: A Kör Elemeinek Besorolása',
    subtitle: 'Rendszerezd a kör részeit vonalas elemek, síkrészek és tételek szerint!',
    categories: [
      {
        id: 'cat-lines',
        name: 'Vonalas Alakzatok & Szakaszok',
        description: 'Sugár, átmérő, húr, ív',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-regions',
        name: 'Síkrészek (Területek)',
        description: 'Körlap, körcikk, körszelet',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-theorems',
        name: 'Körrel Kapcsolatos Tételek',
        description: 'Érintő- és húrtételek',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // Vonalas
      { id: 'cs2-1', label: 'Sugár: a középpontot a körvonallal összekötő szakasz', category: 'cat-lines' },
      { id: 'cs2-2', label: 'Átmérő: a középponton átmenő leghosszabb húr', category: 'cat-lines' },
      { id: 'cs2-3', label: 'Húr: a körvonal két pontját összekötő belső szakasz', category: 'cat-lines' },
      { id: 'cs2-4', label: 'Körív: a körvonal két pontja közé eső görbe vonala', category: 'cat-lines' },
      // Síkrészek
      { id: 'cs2-5', label: 'Körcikk: két sugár és egy határoló ív által közrefogott terület', category: 'cat-regions' },
      { id: 'cs2-6', label: 'Körszelet: egy húr és egy körív által határolt síkrész', category: 'cat-regions' },
      { id: 'cs2-7', label: 'Körlap: a középponttól legfeljebb r távolságra lévő síkbeli pontok összessége', category: 'cat-regions' },
      { id: 'cs2-8', label: 'Körgyűrű: két koncentrikus körvonal közé eső terület', category: 'cat-regions' },
      // Tételek
      { id: 'cs2-9', label: 'Érintőszakaszok tétele: külső pontból |PE₁| = |PE₂|', category: 'cat-theorems' },
      { id: 'cs2-10', label: 'Húrfelező merőleges tétele: mindig átmegy a kör középpontján', category: 'cat-theorems' },
      { id: 'cs2-11', label: 'Érintőnégyszögek tétele: a szemközti oldalpárok összege egyenlő', category: 'cat-theorems' },
      { id: 'cs2-12', label: 'Thalész-tétel: átmérő fölé rajzolt háromszög derékszögű', category: 'cat-theorems' }
    ]
  },
  3: {
    title: '3. Szint: Két Kör Kölcsönös Helyzete',
    subtitle: 'Csoportosítsd a két kör közötti relációkat a d középponti távolság alapján!',
    categories: [
      {
        id: 'cat-disjoint',
        name: 'Kívül Elhelyezkedő vagy Koncentrikus',
        description: '0 közös pont (d > r₁ + r₂ vagy d < |r₁ - r₂|)',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300'
      },
      {
        id: 'cat-touching',
        name: 'Érintkező Körök (1 közös pont)',
        description: 'Kívülről (d = r₁ + r₂) vagy belülről (d = |r₁ - r₂|)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-intersecting',
        name: 'Metsző Körök (2 közös pont)',
        description: '|r₁ - r₂| < d < r₁ + r₂',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      // 0 pont
      { id: 'cs3-1', label: 'r₁ = 4 cm, r₂ = 3 cm, d = 10 cm', category: 'cat-disjoint' },
      { id: 'cs3-2', label: 'Koncentrikus körök: közös középpont', category: 'cat-disjoint' },
      { id: 'cs3-3', label: 'r₁ = 8 cm, r₂ = 2 cm, d = 3 cm', category: 'cat-disjoint' },
      { id: 'cs3-4', label: 'Nincs egyetlen közös pontjuk sem', category: 'cat-disjoint' },
      // 1 pont
      { id: 'cs3-5', label: 'Kívülről érintkeznek: d = r₁ + r₂', category: 'cat-touching' },
      { id: 'cs3-6', label: 'Belülről érintkeznek: d = |r₁ - r₂|', category: 'cat-touching' },
      { id: 'cs3-7', label: 'r₁ = 5 cm, r₂ = 3 cm, d = 8 cm', category: 'cat-touching' },
      { id: 'cs3-8', label: 'r₁ = 7 cm, r₂ = 2 cm, d = 5 cm', category: 'cat-touching' },
      // 2 pont
      { id: 'cs3-9', label: 'Két pontban metszik egymást', category: 'cat-intersecting' },
      { id: 'cs3-10', label: 'r₁ = 5 cm, r₂ = 4 cm, d = 6 cm', category: 'cat-intersecting' },
      { id: 'cs3-11', label: 'A két kör közös húrja merőleges a középpontokat összekötő centrálisra', category: 'cat-intersecting' },
      { id: 'cs3-12', label: 'r₁ = 6 cm, r₂ = 6 cm, d = 6 cm', category: 'cat-intersecting' }
    ]
  }
};

export const CircleSorter: React.FC<CircleSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-bevezetes-geometriaba',
  topicTitle = 'A kör'
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
      themeColor="rose"
      storageKey="grade9-circle-sorter"
      levels={sorterLevels}
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • CSOPORTOSÍTÓ JÁTÉK"
    />
  );
};

