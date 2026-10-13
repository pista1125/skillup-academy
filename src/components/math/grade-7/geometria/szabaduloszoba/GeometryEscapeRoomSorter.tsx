import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';

interface GeometryEscapeRoomSorterProps {
  level?: number;
  currentLevel?: number;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
}

// 1. SZINT: A 3 Zár lakatkulcsai
const level1Config: SorterLevelConfig = {
  instruction: 'Válogasd szét a feladványokat és képleteket a 3 zár szerint!',
  categories: [
    { id: 'lock1', name: '1. Zár: Szögek & Átlók', color: 'violet' },
    { id: 'lock2', name: '2. Zár: Síkidomok Területe', color: 'purple' },
    { id: 'lock3', name: '3. Zár: Testek & Térfogat', color: 'indigo' }
  ],
  items: [
    {
      id: 's1-1',
      label: 'S_n = (n - 2) · 180° (Belső szögösszeg)',
      categoryId: 'lock1'
    },
    {
      id: 's1-2',
      label: 'd_n = n(n - 3) / 2 (Sokszög átlói)',
      categoryId: 'lock1'
    },
    {
      id: 's1-3',
      label: 'T = (a · m_a) / 2 (Háromszög területe)',
      categoryId: 'lock2'
    },
    {
      id: 's1-4',
      label: 'T = ((a + c) / 2) · m (Trapéz területe)',
      categoryId: 'lock2'
    },
    {
      id: 's1-5',
      label: 'V = T_a · M (Hasáb térfogata)',
      categoryId: 'lock3'
    },
    {
      id: 's1-6',
      label: 'C + L = E + 2 (Euler-féle poliédertétel)',
      categoryId: 'lock3'
    }
  ]
};

// 2. SZINT: Sík- és Térbeli lakatmechanizmusok
const level2Config: SorterLevelConfig = {
  instruction: 'Csoportosítsd a kódfejtő kulcsokat 2D síkbeli és 3D térbeli kategóriákba!',
  categories: [
    { id: 'plane', name: '2D Síkbeli Lakatok (Szögek, Terület)', color: 'blue' },
    { id: 'solid', name: '3D Térbeli Mesterkódok (Testek, Térfogat)', color: 'amber' }
  ],
  items: [
    {
      id: 's2-1',
      label: 'Háromszög-egyenlőtlenség: a + b > c',
      categoryId: 'plane'
    },
    {
      id: 's2-2',
      label: 'Kocka felszíne: A = 6 · a²',
      categoryId: 'solid'
    },
    {
      id: 's2-3',
      label: 'Deltoid területe: T = (e · f) / 2',
      categoryId: 'plane'
    },
    {
      id: 's2-4',
      label: 'Hasáb palástja: T_p = K_a · M',
      categoryId: 'solid'
    },
    {
      id: 's2-5',
      label: 'Paralelogramma területe: T = a · m_a',
      categoryId: 'plane'
    },
    {
      id: 's2-6',
      label: 'Kocka kiterített hálója: 11-féle alakzat',
      categoryId: 'solid'
    }
  ]
};

// 3. SZINT: Kódfejtő Mértékegység Váltók
const level3Config: SorterLevelConfig = {
  instruction: 'Csoportosítsd a titkos mértékegység-váltó kódokat!',
  categories: [
    { id: 'area_code', name: '100-as Lakat (Területmértékek)', color: 'cyan' },
    { id: 'vol_code', name: '1000-es Lakat (Térfogatmértékek)', color: 'emerald' },
    { id: 'bridge_code', name: 'Aranyhíd Lakat (Liter & Hektár)', color: 'purple' }
  ],
  items: [
    {
      id: 's3-1',
      label: '1 m² = 100 dm²',
      categoryId: 'area_code'
    },
    {
      id: 's3-2',
      label: '1 dm³ = 1000 cm³',
      categoryId: 'vol_code'
    },
    {
      id: 's3-3',
      label: '1 dm³ = 1 liter',
      categoryId: 'bridge_code'
    },
    {
      id: 's3-4',
      label: '1 ha = 100 a = 10 000 m²',
      categoryId: 'bridge_code'
    },
    {
      id: 's3-5',
      label: '1 m³ = 1000 liter',
      categoryId: 'vol_code'
    },
    {
      id: 's3-6',
      label: '1 cm² = 100 mm²',
      categoryId: 'area_code'
    }
  ]
};

export const GeometryEscapeRoomSorter: React.FC<GeometryEscapeRoomSorterProps> = ({
  level,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory
}) => {
  const activeLvl = Number(currentLevel ?? level) || 1;
  return (
    <SorterTemplate
      key={`escape-room-sorter-lvl-${activeLvl}`}
      title="Szabadulószoba Kulcsválogató"
      subtitle="Válogasd a lakatkulcsokat és kódokat a 3 zár mechanizmusa szerint!"
      badge="7. OSZTÁLY • 🔐 11. SZABADULÓSZOBA"
      level={activeLvl as any}
      currentLevel={activeLvl as any}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
      level1Config={level1Config}
      level2Config={level2Config}
      level3Config={level3Config}
    />
  );
};
