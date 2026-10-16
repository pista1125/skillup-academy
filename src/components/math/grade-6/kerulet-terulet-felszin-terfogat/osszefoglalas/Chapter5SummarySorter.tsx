import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Chapter5SummarySorterProps {
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
    title: '1. Szint: Milyen geometriai mennyiség?',
    subtitle: 'Válogasd szét a kifejezéseket aszerint, hogy kerület (1D), terület/felszín (2D) vagy térfogat (3D)!',
    categories: [
      {
        id: 'cat-1d',
        name: '1D Kerület / Hosszúság',
        description: 'cm, m, km; határoló vonalak összhossza',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-2d',
        name: '2D Terület / Felszín',
        description: 'cm², m², ha; síkrészek és külső felületek nagysága',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-3d',
        name: '3D Térfogat / Űrtartalom',
        description: 'cm³, liter, m³; test által elfoglalt térrész',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      }
    ],
    items: [
      { id: 's1-1', label: 'K = 2 · (a + b) kerületképlet', category: 'cat-1d' },
      { id: 's1-2', label: 'T = a · b területképlet', category: 'cat-2d' },
      { id: 's1-3', label: 'V = a · b · c térfogatképlet', category: 'cat-3d' },
      { id: 's1-4', label: 'Kocka 12 éle: 12 · a', category: 'cat-1d' },
      { id: 's1-5', label: 'Kocka teljes felszíne: A = 6a²', category: 'cat-2d' },
      { id: 's1-6', label: 'Kocka térfogata: V = a³', category: 'cat-3d' },
      { id: 's1-7', label: 'Háromszög területe: (a · m_a) / 2', category: 'cat-2d' },
      { id: 's1-8', label: '1 dm³ = 1 liter vízkapacitás', category: 'cat-3d' },
      { id: 's1-9', label: 'Kerítés hossza a telek körül', category: 'cat-1d' },
      { id: 's1-10', label: 'Szoba 4 falának festendő felülete', category: 'cat-2d' },
      { id: 's1-11', label: 'Kerti medence vízbefogadó képessége', category: 'cat-3d' },
      { id: 's1-12', label: 'Kocka lapátlójának hossza', category: 'cat-1d' }
    ]
  },
  2: {
    title: '2. Szint: Mértékegység váltószámok rendszere',
    subtitle: 'Válogasd szét a mértékegység-párokat az egymás közötti váltószám nagysága szerint!',
    categories: [
      {
        id: 'cat-10',
        name: '10-es váltószám',
        description: 'Szomszédos hosszúság-mértékegységek',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-100',
        name: '100-as váltószám',
        description: 'Szomszédos terület-mértékegységek (és hektoliter)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-1000',
        name: '1000-es váltószám',
        description: 'Térfogat, tömeg és kilo- prefixum',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      { id: 's2-1', label: '1 m = 10 dm', category: 'cat-10' },
      { id: 's2-2', label: '1 dm = 10 cm', category: 'cat-10' },
      { id: 's2-3', label: '1 cm = 10 mm', category: 'cat-10' },
      { id: 's2-4', label: '1 m² = 100 dm²', category: 'cat-100' },
      { id: 's2-5', label: '1 dm² = 100 cm²', category: 'cat-100' },
      { id: 's2-6', label: '1 ha = 100 a (ár)', category: 'cat-100' },
      { id: 's2-7', label: '1 hl = 100 liter', category: 'cat-100' },
      { id: 's2-8', label: '1 m³ = 1000 dm³ (1000 l)', category: 'cat-1000' },
      { id: 's2-9', label: '1 dm³ = 1000 cm³', category: 'cat-1000' },
      { id: 's2-10', label: '1 t = 1000 kg', category: 'cat-1000' },
      { id: 's2-11', label: '1 km = 1000 m', category: 'cat-1000' },
      { id: 's2-12', label: '1 kg = 1000 g', category: 'cat-1000' }
    ]
  },
  3: {
    title: '3. Szint: Síkidom, Test vagy Gyakorlati alkalmazás?',
    subtitle: 'Válogasd szét a fogalmakat és szabályokat a matematika megfelelő területe szerint!',
    categories: [
      {
        id: 'cat-2d-shape',
        name: 'Síkidomok (2D)',
        description: 'Sokszögek, háromszögek, téglalapok síkbeli mérése',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-3d-shape',
        name: 'Térbeli testek (3D)',
        description: 'Poliéderek, forgástestek, hálók, Euler-tétel',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-practical',
        name: 'Gyakorlati feladatok',
        description: 'Szobafestés, csempézés, ráhagyások, üvegakvárium',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      { id: 's3-1', label: 'Derékszögű háromszög befogói: T = (a · b) / 2', category: 'cat-2d-shape' },
      { id: 's3-2', label: 'Euler-tétel: C + L = É + 2', category: 'cat-3d-shape' },
      { id: 's3-3', label: 'Szobafestés: 4 falból ablakok és ajtók levonása', category: 'cat-practical' },
      { id: 's3-4', label: 'Kocka 11 különböző síkbeli hálója', category: 'cat-3d-shape' },
      { id: 's3-5', label: 'Összetett sokszög felbontása téglalapokra', category: 'cat-2d-shape' },
      { id: 's3-6', label: 'Fürdőszoba csempézése 10% vágási ráhagyással', category: 'cat-practical' },
      { id: 's3-7', label: 'N-oldalú hasáb csúcsai: C = 2n, lapjai: L = n+2', category: 'cat-3d-shape' },
      { id: 's3-8', label: 'Szabályos hatszög kerülete: K = 6 · a', category: 'cat-2d-shape' },
      { id: 's3-9', label: 'Üvegakvárium készítése (5 határoló lap)', category: 'cat-practical' },
      { id: 's3-10', label: 'Forgástestek: henger, kúp, gömb', category: 'cat-3d-shape' },
      { id: 's3-11', label: 'Négyzet átlói merőlegesek és felezik egymást', category: 'cat-2d-shape' },
      { id: 's3-12', label: 'Két réteg falfesték és vödrök felfelé kerekítése', category: 'cat-practical' }
    ]
  }
};

export const Chapter5SummarySorter: React.FC<Chapter5SummarySorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onBack,
  topicId = 'g6-chapter5-summary-sorter',
  topicTitle = 'Összefoglalás'
}) => {
  const activeLevel = (currentLevel || level) as DifficultyLevel;

  return (
    <SorterTemplate
      title="Összefoglaló csoportosító"
      subtitle="Rendszerezd az V. fejezet összes képletét, mértékegységét és fogalmát 3 szinten!"
      badge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      themeColor="slate"
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
      chapterId="kerulet-terulet-felszin-terfogat"
    />
  );
};

(Chapter5SummarySorter as any).sorterLevels = sorterLevels;
(Chapter5SummarySorter as any).levels = sorterLevels;

export default Chapter5SummarySorter;
