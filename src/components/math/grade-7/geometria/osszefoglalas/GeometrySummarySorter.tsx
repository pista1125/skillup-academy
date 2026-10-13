import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';

interface GeometrySummarySorterProps {
  level?: number;
  currentLevel?: number;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
}

// 1. SZINT: Síkidomok Területképletei számítási módja szerint
const level1Config: SorterLevelConfig = {
  instruction: 'Csoportosítsd a síkidomokat a területük kiszámítási módja szerint!',
  categories: [
    { id: 'triangles', name: 'Alap × Magasság / 2 (Háromszögek)', color: 'amber' },
    { id: 'parals', name: 'Alap × Magasság (Paralelogrammák)', color: 'emerald' },
    { id: 'diagonals_traps', name: 'Átlók szorzata / 2 vagy Trapéz középvonal', color: 'blue' }
  ],
  items: [
    {
      id: 's1-1',
      label: 'Általános háromszög (T = (a · m_a) / 2)',
      categoryId: 'triangles',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="10,40 70,40 40,10" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
        </svg>
      )
    },
    {
      id: 's1-2',
      label: 'Derékszögű háromszög (T = (a · b) / 2)',
      categoryId: 'triangles',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,40 65,40 15,10" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
        </svg>
      )
    },
    {
      id: 's1-3',
      label: 'Paralelogramma (T = a · m_a = b · m_b)',
      categoryId: 'parals',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,40 55,40 70,15 30,15" fill="#d1fae5" stroke="#059669" strokeWidth="1.2" />
        </svg>
      )
    },
    {
      id: 's1-4',
      label: 'Rombusz oldalával számolva (T = a · m)',
      categoryId: 'parals',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="15,40 50,40 65,15 30,15" fill="#d1fae5" stroke="#059669" strokeWidth="1.2" />
        </svg>
      )
    },
    {
      id: 's1-5',
      label: 'Trapéz (T = ((a + c) / 2) · m = k · m)',
      categoryId: 'diagonals_traps',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="10,40 70,40 55,15 25,15" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.2" />
        </svg>
      )
    },
    {
      id: 's1-6',
      label: 'Deltoid (T = (e · f) / 2)',
      categoryId: 'diagonals_traps',
      figure: (
        <svg viewBox="0 0 80 50" className="w-14 h-8">
          <polygon points="40,8 65,25 40,42 15,25" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.2" />
        </svg>
      )
    }
  ]
};

// 2. SZINT: Síkgeometria vs. Térgeometria tételek
const level2Config: SorterLevelConfig = {
  instruction: 'Válogasd szét a síkgeometriai és térgeometriai képleteket és törvényszerűségeket!',
  categories: [
    { id: 'plane', name: 'Síkgeometria (2D: szögek, sokszögek, területek)', color: 'indigo' },
    { id: 'solid', name: 'Térgeometria (3D: testek, hasábok, térfogat)', color: 'rose' }
  ],
  items: [
    {
      id: 's2-1',
      label: 'Belső szögek összege: S_n = (n - 2) · 180°',
      categoryId: 'plane'
    },
    {
      id: 's2-2',
      label: 'Egyenes hasáb térfogata: V = T_a · M',
      categoryId: 'solid'
    },
    {
      id: 's2-3',
      label: 'Sokszög összes átlója: d_n = n(n - 3) / 2',
      categoryId: 'plane'
    },
    {
      id: 's2-4',
      label: 'Euler-poliédertétel: C + L = E + 2',
      categoryId: 'solid'
    },
    {
      id: 's2-5',
      label: 'Háromszög-egyenlőtlenség: a + b > c',
      categoryId: 'plane'
    },
    {
      id: 's2-6',
      label: 'Hasáb teljes felszíne: A = 2T_a + K_a · M',
      categoryId: 'solid'
    }
  ]
};

// 3. SZINT: Mértékegység Típusok és Váltószámok
const level3Config: SorterLevelConfig = {
  instruction: 'Csoportosítsd a mértékegységeket és átváltási relációkat típusuk szerint!',
  categories: [
    { id: 'area_units', name: 'Területmértékek (100-as váltás)', color: 'cyan' },
    { id: 'volume_units', name: 'Térfogatmértékek (1000-es váltás)', color: 'blue' },
    { id: 'special_bridge', name: 'Speciális egységek & Aranyhidak', color: 'purple' }
  ],
  items: [
    {
      id: 's3-1',
      label: '1 m² = 100 dm² = 10 000 cm²',
      categoryId: 'area_units'
    },
    {
      id: 's3-2',
      label: '1 dm³ = 1 000 cm³ = 1 000 000 mm³',
      categoryId: 'volume_units'
    },
    {
      id: 's3-3',
      label: '1 dm³ = 1 liter (és 1 cm³ = 1 ml)',
      categoryId: 'special_bridge'
    },
    {
      id: 's3-4',
      label: '1 ha = 100 a = 10 000 m²',
      categoryId: 'special_bridge'
    },
    {
      id: 's3-5',
      label: '1 m³ = 1 000 dm³ = 1 000 liter',
      categoryId: 'volume_units'
    },
    {
      id: 's3-6',
      label: '1 cm² = 100 mm²',
      categoryId: 'area_units'
    }
  ]
};

export const GeometrySummarySorter: React.FC<GeometrySummarySorterProps> = ({
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
      key={`geom-summary-sorter-lvl-${activeLvl}`}
      title="Geometria Összefoglaló Csoportosító"
      subtitle="Rendszerezd a 7. osztályos geometria képleteit, tételeit és mértékegységeit!"
      badge="7. OSZTÁLY • VII. GEOMETRIA"
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
