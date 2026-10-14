import React from 'react';
import { SorterTemplate, SorterLevel } from '../SorterTemplate';

interface DirectProportionGraphSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToTheory?: () => void;
}

export const DirectProportionGraphSorter: React.FC<DirectProportionGraphSorterProps> = ({
  onBack,
  onSwitchToQuiz,
  onSwitchToTheory
}) => {
  const levels: SorterLevel[] = [
    // ==========================================
    // 1. SZINT: KEZDŐ (A grafikon jellege)
    // ==========================================
    {
      level: 1,
      instruction: 'Csoportosítsd az összefüggéseket a grafikonjuk megjelenési formája szerint!',
      categories: [
        {
          id: 'folytonos',
          name: 'Folytonos félegyenes',
          color: 'emerald',
          description: 'Folytonosan osztható mennyiségek (út, idő, tömeg, folyadék)'
        },
        {
          id: 'diszkret',
          name: 'Diszkrét pontsor',
          color: 'blue',
          description: 'Csak egész darabokban létező mennyiségek (füzet, jegy, labda)'
        },
        {
          id: 'nem-aranyos',
          name: 'Nem egyenes arányosság',
          color: 'rose',
          description: 'Nem az origóból indul, vagy nem egyenes vonal'
        }
      ],
      items: [
        {
          id: 'item-1',
          text: 'Vásárolt alma tömege (kg) és fizetendő ára (Ft)',
          categoryId: 'folytonos'
        },
        {
          id: 'item-2',
          text: 'Egyenletesen haladó autó megtett útja és ideje',
          categoryId: 'folytonos'
        },
        {
          id: 'item-3',
          text: 'Vásárolt benzin térfogata (liter) és ára',
          categoryId: 'folytonos'
        },
        {
          id: 'item-4',
          text: 'Gyalogos túrázó menetideje és megtett kilométerei',
          categoryId: 'folytonos'
        },
        {
          id: 'item-5',
          text: 'Megvásárolt füzetek darabszáma és ára',
          categoryId: 'diszkret'
        },
        {
          id: 'item-6',
          text: 'Mozijegyek darabszáma és a végösszeg',
          categoryId: 'diszkret'
        },
        {
          id: 'item-7',
          text: 'Golyóstollak száma a boltban és áruk',
          categoryId: 'diszkret'
        },
        {
          id: 'item-8',
          text: 'Vonaljegyek száma és a fizetendő összeg',
          categoryId: 'diszkret'
        },
        {
          id: 'item-9',
          text: 'Taxi díjszabása 1000 Ft alapdíjjal + 400 Ft/km',
          categoryId: 'nem-aranyos'
        },
        {
          id: 'item-10',
          text: 'Négyzet oldala (a) és területe (T = a²)',
          categoryId: 'nem-aranyos'
        },
        {
          id: 'item-11',
          text: 'Életkor és lábméret alakulása az évek során',
          categoryId: 'nem-aranyos'
        },
        {
          id: 'item-12',
          text: 'Égő gyertya megmaradt hossza az eltelt időben',
          categoryId: 'nem-aranyos'
        }
      ]
    },

    // ==========================================
    // 2. SZINT: HALADÓ (Meredekség / k arányossági tényező)
    // ==========================================
    {
      level: 2,
      instruction: 'Csoportosítsd az egyeneseket az arányossági tényezőjük (meredekségük, k) szerint!',
      categories: [
        {
          id: 'lapos',
          name: 'Lapos emelkedés (k < 2)',
          color: 'sky',
          description: 'Kis meredekségű grafikon'
        },
        {
          id: 'kozepes',
          name: 'Közepes emelkedés (2 ≤ k ≤ 5)',
          color: 'amber',
          description: 'Mérsékelten meredek egyenes'
        },
        {
          id: 'meredek',
          name: 'Meredek egyenes (k > 5)',
          color: 'purple',
          description: 'Nagyon meredeken felfelé tartó grafikon'
        }
      ],
      items: [
        {
          id: 'item-13',
          text: 'y = 0,5 · x egyenes',
          categoryId: 'lapos'
        },
        {
          id: 'item-14',
          text: 'y = 1 · x egyenes',
          categoryId: 'lapos'
        },
        {
          id: 'item-15',
          text: 'P(4; 4) ponton átmenő egyenes',
          categoryId: 'lapos'
        },
        {
          id: 'item-16',
          text: 'P(6; 9) ponton átmenő egyenes',
          categoryId: 'lapos'
        },
        {
          id: 'item-17',
          text: 'y = 3 · x egyenes',
          categoryId: 'kozepes'
        },
        {
          id: 'item-18',
          text: 'y = 4 · x egyenes',
          categoryId: 'kozepes'
        },
        {
          id: 'item-19',
          text: 'P(2; 6) ponton átmenő egyenes',
          categoryId: 'kozepes'
        },
        {
          id: 'item-20',
          text: 'P(3; 15) ponton átmenő egyenes',
          categoryId: 'kozepes'
        },
        {
          id: 'item-21',
          text: 'y = 8 · x egyenes',
          categoryId: 'meredek'
        },
        {
          id: 'item-22',
          text: 'y = 12 · x egyenes',
          categoryId: 'meredek'
        },
        {
          id: 'item-23',
          text: 'P(2; 20) ponton átmenő egyenes',
          categoryId: 'meredek'
        },
        {
          id: 'item-24',
          text: 'P(3; 24) ponton átmenő egyenes',
          categoryId: 'meredek'
        }
      ]
    },

    // ==========================================
    // 3. SZINT: MESTER (Pontok illeszkedése az y = 3x egyeneshez)
    // ==========================================
    {
      level: 3,
      instruction: 'Határozd meg, hol helyezkednek el a pontok az y = 3 · x egyeneshez képest!',
      categories: [
        {
          id: 'rajta',
          name: 'Az egyenesen van (y = 3x)',
          color: 'emerald',
          description: 'A pont pontosan illeszkedik az egyenesre'
        },
        {
          id: 'felette',
          name: 'Az egyenes FELETT van (y > 3x)',
          color: 'amber',
          description: 'Az y érték nagyobb mint a 3 · x'
        },
        {
          id: 'alatta',
          name: 'Az egyenes ALATT van (y < 3x)',
          color: 'blue',
          description: 'Az y érték kisebb mint a 3 · x'
        }
      ],
      items: [
        {
          id: 'item-25',
          text: 'P(2; 6)',
          categoryId: 'rajta'
        },
        {
          id: 'item-26',
          text: 'P(4; 12)',
          categoryId: 'rajta'
        },
        {
          id: 'item-27',
          text: 'P(5; 15)',
          categoryId: 'rajta'
        },
        {
          id: 'item-28',
          text: 'P(10; 30)',
          categoryId: 'rajta'
        },
        {
          id: 'item-29',
          text: 'P(2; 8)',
          categoryId: 'felette'
        },
        {
          id: 'item-30',
          text: 'P(3; 12)',
          categoryId: 'felette'
        },
        {
          id: 'item-31',
          text: 'P(4; 15)',
          categoryId: 'felette'
        },
        {
          id: 'item-32',
          text: 'P(1; 5)',
          categoryId: 'felette'
        },
        {
          id: 'item-33',
          text: 'P(2; 4)',
          categoryId: 'alatta'
        },
        {
          id: 'item-34',
          text: 'P(3; 6)',
          categoryId: 'alatta'
        },
        {
          id: 'item-35',
          text: 'P(5; 10)',
          categoryId: 'alatta'
        },
        {
          id: 'item-36',
          text: 'P(4; 8)',
          categoryId: 'alatta'
        }
      ]
    }
  ];

  return (
    <SorterTemplate
      title="Egyenes arányosság grafikonja csoportosító"
      subtitle="Csoportosítsd a grafikonok típusait, meredekségeit és a pontok helyzetét 3 szinten!"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 📂 RENDSZEREZŐ"
      themeColor="lime"
      levels={levels}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default DirectProportionGraphSorter;
