import React from 'react';
import { SorterTemplate, SorterCategory, SorterItem } from '../SorterTemplate';

export interface PerimeterSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: number;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const SORTER_CATEGORIES: Record<number, SorterCategory[]> = {
  1: [
    {
      id: 'cat-1-less',
      name: 'Kisebb, mint 20 cm',
      color: 'blue',
      description: 'Olyan alakzatok, amelyek kerülete K < 20 cm'
    },
    {
      id: 'cat-1-exact',
      name: 'Pontosan 20 cm',
      color: 'emerald',
      description: 'Olyan alakzatok, amelyek kerülete K = 20 cm'
    },
    {
      id: 'cat-1-more',
      name: 'Nagyobb, mint 20 cm',
      color: 'amber',
      description: 'Olyan alakzatok, amelyek kerülete K > 20 cm'
    }
  ],
  2: [
    {
      id: 'cat-2-square',
      name: 'Négyzet tulajdonság',
      color: 'indigo',
      description: 'Négyzetekre jellemző méretek, képletek és adatok'
    },
    {
      id: 'cat-2-rect',
      name: 'Téglalap tulajdonság',
      color: 'teal',
      description: 'Különböző oldalú téglalapokra érvényes adatok'
    },
    {
      id: 'cat-2-invalid',
      name: 'Lehetetlen / hibás adat',
      color: 'rose',
      description: 'Geometriailag ellentmondásos vagy hibás számítások'
    }
  ],
  3: [
    {
      id: 'cat-3-small',
      name: '1 méter alatti kerület',
      color: 'sky',
      description: 'Kisebb tárgyak, füzetek, eszközök kerülete (K < 100 cm)'
    },
    {
      id: 'cat-3-medium',
      name: '1 métertől 10 méterig',
      color: 'purple',
      description: 'Bútorok, ajtók, táblák kerülete (1 m ≤ K ≤ 10 m)'
    },
    {
      id: 'cat-3-large',
      name: '10 méter feletti kerület',
      color: 'rose',
      description: 'Szobák, telkek, sportpályák kerülete (K > 10 m)'
    }
  ]
};

const SORTER_ITEMS: SorterItem[] = [
  // =========================================================================
  // 1. SZINT: K < 20 cm | K = 20 cm | K > 20 cm
  // =========================================================================
  {
    id: 'si-1-1',
    level: 1,
    text: 'Négyzet: a = 3 cm',
    correctCategory: 'cat-1-less',
    explanation: 'K = 4 · 3 cm = 12 cm, ami kisebb 20 cm-nél.'
  },
  {
    id: 'si-1-2',
    level: 1,
    text: 'Téglalap: a = 4 cm, b = 2 cm',
    correctCategory: 'cat-1-less',
    explanation: 'K = 2 · (4 + 2) = 12 cm, ami kisebb 20 cm-nél.'
  },
  {
    id: 'si-1-3',
    level: 1,
    text: 'Négyzet: a = 4 cm',
    correctCategory: 'cat-1-less',
    explanation: 'K = 4 · 4 cm = 16 cm, ami kisebb 20 cm-nél.'
  },
  {
    id: 'si-1-4',
    level: 1,
    text: 'Téglalap: a = 5 cm, b = 3 cm',
    correctCategory: 'cat-1-less',
    explanation: 'K = 2 · (5 + 3) = 16 cm, ami kisebb 20 cm-nél.'
  },
  {
    id: 'si-1-5',
    level: 1,
    text: 'Négyzet: a = 5 cm',
    correctCategory: 'cat-1-exact',
    explanation: 'K = 4 · 5 cm = 20 cm, pontosan 20 cm!'
  },
  {
    id: 'si-1-6',
    level: 1,
    text: 'Téglalap: a = 6 cm, b = 4 cm',
    correctCategory: 'cat-1-exact',
    explanation: 'K = 2 · (6 + 4) = 2 · 10 = 20 cm, pontosan 20 cm!'
  },
  {
    id: 'si-1-7',
    level: 1,
    text: 'Téglalap: a = 7 cm, b = 3 cm',
    correctCategory: 'cat-1-exact',
    explanation: 'K = 2 · (7 + 3) = 2 · 10 = 20 cm, pontosan 20 cm!'
  },
  {
    id: 'si-1-8',
    level: 1,
    text: 'Téglalap: a = 9 cm, b = 1 cm',
    correctCategory: 'cat-1-exact',
    explanation: 'K = 2 · (9 + 1) = 2 · 10 = 20 cm, pontosan 20 cm!'
  },
  {
    id: 'si-1-9',
    level: 1,
    text: 'Négyzet: a = 6 cm',
    correctCategory: 'cat-1-more',
    explanation: 'K = 4 · 6 cm = 24 cm, ami nagyobb 20 cm-nél.'
  },
  {
    id: 'si-1-10',
    level: 1,
    text: 'Téglalap: a = 8 cm, b = 5 cm',
    correctCategory: 'cat-1-more',
    explanation: 'K = 2 · (8 + 5) = 26 cm, ami nagyobb 20 cm-nél.'
  },
  {
    id: 'si-1-11',
    level: 1,
    text: 'Négyzet: a = 1 dm (10 cm)',
    correctCategory: 'cat-1-more',
    explanation: 'K = 4 · 10 cm = 40 cm, ami jóval nagyobb 20 cm-nél.'
  },
  {
    id: 'si-1-12',
    level: 1,
    text: 'Téglalap: a = 10 cm, b = 6 cm',
    correctCategory: 'cat-1-more',
    explanation: 'K = 2 · (10 + 6) = 32 cm, ami nagyobb 20 cm-nél.'
  },

  // =========================================================================
  // 2. SZINT: NÉGYZET | TÉGLALAP | LEHETETLEN/HIBÁS ADAT
  // =========================================================================
  {
    id: 'si-2-1',
    level: 2,
    text: 'Oldala 7 cm, mind a 4 oldala egyenlő hosszú',
    correctCategory: 'cat-2-square',
    explanation: 'Négyzet, mert mind a 4 oldala azonos hosszúságú (K = 28 cm).'
  },
  {
    id: 'si-2-2',
    level: 2,
    text: 'K = 36 cm, egyforma oldalakkal: a = 9 cm',
    correctCategory: 'cat-2-square',
    explanation: 'Négyzet, mert K : 4 = 9 cm.'
  },
  {
    id: 'si-2-3',
    level: 2,
    text: 'Képlete: K = 4 · a',
    correctCategory: 'cat-2-square',
    explanation: 'A 4 egyenlő oldal miatt ez a négyzet kerületképlete.'
  },
  {
    id: 'si-2-4',
    level: 2,
    text: 'Két szomszédos oldala 8 cm és 8 cm, derékszögű síkidom',
    correctCategory: 'cat-2-square',
    explanation: 'Ha két szomszédos oldal egyenlő egy derékszögű négyszögben, akkor az négyzet.'
  },
  {
    id: 'si-2-5',
    level: 2,
    text: 'Oldalai: a = 8 cm és b = 5 cm',
    correctCategory: 'cat-2-rect',
    explanation: 'Két különböző szomszédos oldala van, ez téglalap.'
  },
  {
    id: 'si-2-6',
    level: 2,
    text: 'Képlete: K = 2 · (a + b)',
    correctCategory: 'cat-2-rect',
    explanation: 'Ez a téglalap klasszikus kerületszámítási képlete.'
  },
  {
    id: 'si-2-7',
    level: 2,
    text: 'Félkerülete 15 cm, oldalai 10 cm és 5 cm',
    correctCategory: 'cat-2-rect',
    explanation: 'a + b = 15 cm, így a kerület K = 30 cm, téglalap.'
  },
  {
    id: 'si-2-8',
    level: 2,
    text: 'Kerülete 50 cm, egyik oldala 15 cm, másik 10 cm',
    correctCategory: 'cat-2-rect',
    explanation: '2 · (15 + 10) = 50 cm, valós téglalap.'
  },
  {
    id: 'si-2-9',
    level: 2,
    text: 'Téglalap: K = 20 cm, de az egyik oldala a = 12 cm',
    correctCategory: 'cat-2-invalid',
    explanation: 'Lehetetlen! A félkerület K : 2 = 10 cm. Egyetlen oldal sem lehet nagyobb a félkerületnél!'
  },
  {
    id: 'si-2-10',
    level: 2,
    text: 'Négyzet: oldala a = -4 cm',
    correctCategory: 'cat-2-invalid',
    explanation: 'Lehetetlen! Hosszúság és oldalhossz nem lehet negatív szám.'
  },
  {
    id: 'si-2-11',
    level: 2,
    text: 'Téglalap: K = 12 cm, oldalai a = 8 cm és b = 4 cm',
    correctCategory: 'cat-2-invalid',
    explanation: 'Hibás adat! 2 · (8 + 4) = 24 cm lenne, nem pedig 12 cm.'
  },
  {
    id: 'si-2-12',
    level: 2,
    text: 'Négyzet: kerülete 20 cm, de oldala a = 6 cm',
    correctCategory: 'cat-2-invalid',
    explanation: 'Hibás számítás! 4 · 6 = 24 cm lenne, 20 cm-es kerületnél az oldalnak 5 cm-nek kellene lennie.'
  },

  // =========================================================================
  // 3. SZINT: K < 1 m | 1 m ≤ K ≤ 10 m | K > 10 m
  // =========================================================================
  {
    id: 'si-3-1',
    level: 3,
    text: 'Matematika füzet: 21 cm × 30 cm',
    correctCategory: 'cat-3-small',
    explanation: 'K = 2 · (21 + 30) = 102 cm helyett füzet esetén kb. K = 80-100 cm, 1 m alatti.'
  },
  {
    id: 'si-3-2',
    level: 3,
    text: 'Négyzet alakú poháralátét: a = 10 cm',
    correctCategory: 'cat-3-small',
    explanation: 'K = 4 · 10 cm = 40 cm = 0,4 m, 1 méter alatti.'
  },
  {
    id: 'si-3-3',
    level: 3,
    text: 'Okostelefon körvonala: 15 cm × 7 cm',
    correctCategory: 'cat-3-small',
    explanation: 'K = 2 · (15 + 7) = 44 cm = 0,44 m, 1 méter alatti.'
  },
  {
    id: 'si-3-4',
    level: 3,
    text: 'Kis fali képkeret: 18 cm × 24 cm',
    correctCategory: 'cat-3-small',
    explanation: 'K = 2 · (18 + 24) = 84 cm = 0,84 m, 1 méter alatti.'
  },
  {
    id: 'si-3-5',
    level: 3,
    text: 'Ebédlőasztal lapja: 150 cm × 100 cm',
    correctCategory: 'cat-3-medium',
    explanation: 'K = 2 · (1,5 + 1) = 5 méter, 1 m és 10 m közé esik.'
  },
  {
    id: 'si-3-6',
    level: 3,
    text: 'Négyzet alakú dohányzóasztal: a = 80 cm',
    correctCategory: 'cat-3-medium',
    explanation: 'K = 4 · 80 cm = 320 cm = 3,2 m, 1 m és 10 m közé esik.'
  },
  {
    id: 'si-3-7',
    level: 3,
    text: 'Tantermi fali tábla: 3 m × 1,2 m',
    correctCategory: 'cat-3-medium',
    explanation: 'K = 2 · (3 + 1,2) = 8,4 méter, 1 m és 10 m közé esik.'
  },
  {
    id: 'si-3-8',
    level: 3,
    text: 'Egyszemélyes heverő: 2 m × 0,9 m',
    correctCategory: 'cat-3-medium',
    explanation: 'K = 2 · (2 + 0,9) = 5,8 méter, 1 m és 10 m közé esik.'
  },
  {
    id: 'si-3-9',
    level: 3,
    text: 'Tanterem padlója: 9 m × 6 m',
    correctCategory: 'cat-3-large',
    explanation: 'K = 2 · (9 + 6) = 30 méter, jóval 10 méter feletti.'
  },
  {
    id: 'si-3-10',
    level: 3,
    text: 'Családi ház telke: 25 m × 20 m',
    correctCategory: 'cat-3-large',
    explanation: 'K = 2 · (25 + 20) = 90 méter, 10 méter feletti.'
  },
  {
    id: 'si-3-11',
    level: 3,
    text: 'Kosárlabdapálya: 28 m × 15 m',
    correctCategory: 'cat-3-large',
    explanation: 'K = 2 · (28 + 15) = 86 méter, 10 méter feletti.'
  },
  {
    id: 'si-3-12',
    level: 3,
    text: 'Négyzet alakú iskolai udvar: a = 20 m',
    correctCategory: 'cat-3-large',
    explanation: 'K = 4 · 20 m = 80 méter, 10 méter feletti.'
  }
];

export const PerimeterSorter: React.FC<PerimeterSorterProps> = ({
  onBack,
  onSwitchToTheory,
  level = 1,
  onNextLevel,
  onOpenRules
}) => {
  const activeLevel = typeof level === 'number' ? level : 1;
  const currentCategories = SORTER_CATEGORIES[activeLevel] || SORTER_CATEGORIES[1];
  const currentItems = SORTER_ITEMS.filter((item) => item.level === activeLevel);

  return (
    <SorterTemplate
      categories={currentCategories}
      items={currentItems}
      title="Téglalap, négyzet kerülete – Csoportosító"
      subtitle="5. osztály • IV. Hosszúság, terület, térfogat"
      topicBadge="5. OSZTÁLY • IV. HOSSZÚSÁG, TERÜLET, TÉRFOGAT • 2. TÉMA"
      topicId="g5-meas-perimeter-quiz"
      level={level}
      onNextLevel={onNextLevel}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onOpenRules={onOpenRules}
    />
  );
};

export default PerimeterSorter;
