import React from 'react';
import { SorterTemplate, SorterLevel } from '../SorterTemplate';

interface RulesAndRelationsSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToTheory?: () => void;
}

export const RulesAndRelationsSorter: React.FC<RulesAndRelationsSorterProps> = ({
  onBack,
  onSwitchToQuiz,
  onSwitchToTheory
}) => {
  const levels: SorterLevel[] = [
    // ==========================================
    // 1. SZINT: KEZDŐ (A műveletek típusa a szabályban)
    // ==========================================
    {
      level: 1,
      instruction: 'Csoportosítsd a hozzárendelési szabályokat a bennük szereplő műveletek szerint!',
      categories: [
        {
          id: 'osszead-kivon',
          name: 'Csak összeadás / kivonás',
          color: 'blue',
          description: 'y = x + c vagy y = x - c alakú szabályok'
        },
        {
          id: 'szoroz-oszt',
          name: 'Csak szorzás / osztás',
          color: 'emerald',
          description: 'y = c · x vagy y = x / c alakú szabályok'
        },
        {
          id: 'kombinalt',
          name: 'Kombinált többműveletes',
          color: 'amber',
          description: 'Szorzást és összeadást/kivonást is tartalmaz'
        }
      ],
      items: [
        {
          id: 'item-1',
          text: 'y = x + 7',
          categoryId: 'osszead-kivon'
        },
        {
          id: 'item-2',
          text: 'y = x - 5',
          categoryId: 'osszead-kivon'
        },
        {
          id: 'item-3',
          text: 'y = x + 12',
          categoryId: 'osszead-kivon'
        },
        {
          id: 'item-4',
          text: 'y = x - 1',
          categoryId: 'osszead-kivon'
        },
        {
          id: 'item-5',
          text: 'y = 3 · x',
          categoryId: 'szoroz-oszt'
        },
        {
          id: 'item-6',
          text: 'y = 5 · x',
          categoryId: 'szoroz-oszt'
        },
        {
          id: 'item-7',
          text: 'y = x / 2',
          categoryId: 'szoroz-oszt'
        },
        {
          id: 'item-8',
          text: 'y = x / 4',
          categoryId: 'szoroz-oszt'
        },
        {
          id: 'item-9',
          text: 'y = 2 · x + 3',
          categoryId: 'kombinalt'
        },
        {
          id: 'item-10',
          text: 'y = 4 · x - 1',
          categoryId: 'kombinalt'
        },
        {
          id: 'item-11',
          text: 'y = 3 · x + 5',
          categoryId: 'kombinalt'
        },
        {
          id: 'item-12',
          text: 'y = x / 2 + 6',
          categoryId: 'kombinalt'
        }
      ]
    },

    // ==========================================
    // 2. SZINT: HALADÓ (Eredmény x = 3 bemenet esetén)
    // ==========================================
    {
      level: 2,
      instruction: 'Számold ki az y kimenetet x = 3 esetén, és csoportosítsd az eredmény nagysága szerint!',
      categories: [
        {
          id: 'kisebb-10',
          name: 'Kisebb mint 10 (y < 10)',
          color: 'sky',
          description: 'A kiszámított érték 10-nél kisebb'
        },
        {
          id: 'pontosan-10',
          name: 'Pontosan 10 (y = 10)',
          color: 'emerald',
          description: 'A kiszámított érték pontosan 10'
        },
        {
          id: 'nagyobb-10',
          name: 'Nagyobb mint 10 (y > 10)',
          color: 'purple',
          description: 'A kiszámított érték 10-nél nagyobb'
        }
      ],
      items: [
        {
          id: 'item-13',
          text: 'y = x + 4  (x = 3)',
          categoryId: 'kisebb-10'
        },
        {
          id: 'item-14',
          text: 'y = 2 · x + 1  (x = 3)',
          categoryId: 'kisebb-10'
        },
        {
          id: 'item-15',
          text: 'y = 4 · x - 5  (x = 3)',
          categoryId: 'kisebb-10'
        },
        {
          id: 'item-16',
          text: 'y = x / 3 + 2  (x = 3)',
          categoryId: 'kisebb-10'
        },
        {
          id: 'item-17',
          text: 'y = x + 7  (x = 3)',
          categoryId: 'pontosan-10'
        },
        {
          id: 'item-18',
          text: 'y = 3 · x + 1  (x = 3)',
          categoryId: 'pontosan-10'
        },
        {
          id: 'item-19',
          text: 'y = 4 · x - 2  (x = 3)',
          categoryId: 'pontosan-10'
        },
        {
          id: 'item-20',
          text: 'y = 2 · x + 4  (x = 3)',
          categoryId: 'pontosan-10'
        },
        {
          id: 'item-21',
          text: 'y = 5 · x  (x = 3)',
          categoryId: 'nagyobb-10'
        },
        {
          id: 'item-22',
          text: 'y = 4 · x + 3  (x = 3)',
          categoryId: 'nagyobb-10'
        },
        {
          id: 'item-23',
          text: 'y = 3 · x + 6  (x = 3)',
          categoryId: 'nagyobb-10'
        },
        {
          id: 'item-24',
          text: 'y = x · x + 2  (x = 3)',
          categoryId: 'nagyobb-10'
        }
      ]
    },

    // ==========================================
    // 3. SZINT: MESTER (A hozzárendelés jellege)
    // ==========================================
    {
      level: 3,
      instruction: 'Csoportosítsd a szabályokat a hozzárendelés matematikai típusa szerint!',
      categories: [
        {
          id: 'egyenes-aranyos',
          name: 'Egyenes arányosság (y = k · x)',
          color: 'emerald',
          description: 'Origón átmenő egyenes grafikon, állandó hányados'
        },
        {
          id: 'linearis-nem-aranyos',
          name: 'Lineáris, de NEM arányos (y = ax + b)',
          color: 'amber',
          description: 'Egyenes grafikon, de nem az origóból indul (b ≠ 0)'
        },
        {
          id: 'nemlinearis',
          name: 'Nemlineáris (Görbe kapcsolat)',
          color: 'rose',
          description: 'Négyzetes, fordított vagy tört összefüggés'
        }
      ],
      items: [
        {
          id: 'item-25',
          text: 'y = 6 · x',
          categoryId: 'egyenes-aranyos'
        },
        {
          id: 'item-26',
          text: 'y = 2,5 · x',
          categoryId: 'egyenes-aranyos'
        },
        {
          id: 'item-27',
          text: 'y = 10 · x',
          categoryId: 'egyenes-aranyos'
        },
        {
          id: 'item-28',
          text: 'y = x / 3',
          categoryId: 'egyenes-aranyos'
        },
        {
          id: 'item-29',
          text: 'y = 2 · x + 4',
          categoryId: 'linearis-nem-aranyos'
        },
        {
          id: 'item-30',
          text: 'y = 3 · x - 1',
          categoryId: 'linearis-nem-aranyos'
        },
        {
          id: 'item-31',
          text: 'y = 5 · x + 10',
          categoryId: 'linearis-nem-aranyos'
        },
        {
          id: 'item-32',
          text: 'y = 4 · x - 8',
          categoryId: 'linearis-nem-aranyos'
        },
        {
          id: 'item-33',
          text: 'y = x · x = x²',
          categoryId: 'nemlinearis'
        },
        {
          id: 'item-34',
          text: 'y = 20 / x (fordított arányosság)',
          categoryId: 'nemlinearis'
        },
        {
          id: 'item-35',
          text: 'y = x² + 5',
          categoryId: 'nemlinearis'
        },
        {
          id: 'item-36',
          text: 'y = x · (x + 1)',
          categoryId: 'nemlinearis'
        }
      ]
    }
  ];

  return (
    <SorterTemplate
      title="Szabályok, megfeleltetések csoportosító"
      subtitle="Csoportosítsd a szabályokat műveletek, kimeneti értékek és matematikai típusok szerint 3 szinten!"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 📂 RENDSZEREZŐ"
      themeColor="emerald"
      levels={levels}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default RulesAndRelationsSorter;
