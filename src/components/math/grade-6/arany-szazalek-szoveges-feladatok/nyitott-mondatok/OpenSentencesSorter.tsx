import React from 'react';
import { SorterTemplate, SorterLevel } from '../SorterTemplate';

interface OpenSentencesSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToTheory?: () => void;
}

export const OpenSentencesSorter: React.FC<OpenSentencesSorterProps> = ({
  onBack,
  onSwitchToQuiz,
  onSwitchToTheory
}) => {
  const levels: SorterLevel[] = [
    // ==========================================
    // 1. SZINT: KEZDŐ (Nyitott mondat típusa)
    // ==========================================
    {
      level: 1,
      instruction: 'Csoportosítsd a matematikai leírásokat aszerint, hogy milyen típusú kifejezések!',
      categories: [
        {
          id: 'egyenlet',
          name: 'Egyenlet (= jel)',
          color: 'violet',
          description: 'Két kifejezést egyenlőségjel köt össze'
        },
        {
          id: 'egyenlotlenseg',
          name: 'Egyenlőtlenség (<, >, ≤, ≥)',
          color: 'indigo',
          description: 'Két kifejezést relációs jel kapcsol össze'
        },
        {
          id: 'kifejezes',
          name: 'Nyitott kifejezés',
          color: 'sky',
          description: 'Önálló műveleti leírás relációs jel nélkül'
        }
      ],
      items: [
        {
          id: 'item-1',
          text: 'x + 8 = 15',
          categoryId: 'egyenlet'
        },
        {
          id: 'item-2',
          text: '3x = 21',
          categoryId: 'egyenlet'
        },
        {
          id: 'item-3',
          text: '12 - x = 5',
          categoryId: 'egyenlet'
        },
        {
          id: 'item-4',
          text: 'x / 4 = 6',
          categoryId: 'egyenlet'
        },
        {
          id: 'item-5',
          text: 'x + 2 < 10',
          categoryId: 'egyenlotlenseg'
        },
        {
          id: 'item-6',
          text: '2x ≥ 8',
          categoryId: 'egyenlotlenseg'
        },
        {
          id: 'item-7',
          text: '5 - x > 1',
          categoryId: 'egyenlotlenseg'
        },
        {
          id: 'item-8',
          text: 'x / 3 ≤ 4',
          categoryId: 'egyenlotlenseg'
        },
        {
          id: 'item-9',
          text: 'Egy szám háromszorosa: 3x',
          categoryId: 'kifejezes'
        },
        {
          id: 'item-10',
          text: 'Egy szám és 5 összege: x + 5',
          categoryId: 'kifejezes'
        },
        {
          id: 'item-11',
          text: 'Egy szám fele: x / 2',
          categoryId: 'kifejezes'
        },
        {
          id: 'item-12',
          text: 'Kétszeresnél néggyel több: 2x + 4',
          categoryId: 'kifejezes'
        }
      ]
    },

    // ==========================================
    // 2. SZINT: HALADÓ (A megoldás értéke 5-höz képest)
    // ==========================================
    {
      level: 2,
      instruction: 'Csoportosítsd az egyenleteket a megoldásuk (x értéke) nagysága szerint az 5-höz viszonyítva!',
      categories: [
        {
          id: 'kisebb-5',
          name: 'Kisebb 5-nél (x < 5)',
          color: 'teal',
          description: 'A megoldás értéke szigorúan kisebb, mint 5'
        },
        {
          id: 'egyenlo-5',
          name: 'Pontosan 5 (x = 5)',
          color: 'violet',
          description: 'Az ismeretlen értéke pontosan 5'
        },
        {
          id: 'nagyobb-5',
          name: 'Nagyobb 5-nél (x > 5)',
          color: 'rose',
          description: 'A megoldás értéke szigorúan nagyobb, mint 5'
        }
      ],
      items: [
        {
          id: 'item-13',
          text: '2x + 1 = 7 egyenlet gyöke',
          categoryId: 'kisebb-5'
        },
        {
          id: 'item-14',
          text: '4x = 12 egyenlet gyöke',
          categoryId: 'kisebb-5'
        },
        {
          id: 'item-15',
          text: '10 - x = 8 egyenlet gyöke',
          categoryId: 'kisebb-5'
        },
        {
          id: 'item-16',
          text: 'x + 9 = 13 egyenlet gyöke',
          categoryId: 'kisebb-5'
        },
        {
          id: 'item-17',
          text: '3x - 5 = 10 egyenlet gyöke',
          categoryId: 'egyenlo-5'
        },
        {
          id: 'item-18',
          text: '2x + 4 = 14 egyenlet gyöke',
          categoryId: 'egyenlo-5'
        },
        {
          id: 'item-19',
          text: 'x / 2 = 2,5 egyenlet gyöke',
          categoryId: 'egyenlo-5'
        },
        {
          id: 'item-20',
          text: '20 - 3x = 5 egyenlet gyöke',
          categoryId: 'egyenlo-5'
        },
        {
          id: 'item-21',
          text: '2x - 4 = 12 egyenlet gyöke',
          categoryId: 'nagyobb-5'
        },
        {
          id: 'item-22',
          text: '5x = 35 egyenlet gyöke',
          categoryId: 'nagyobb-5'
        },
        {
          id: 'item-23',
          text: 'x - 7 = 2 egyenlet gyöke',
          categoryId: 'nagyobb-5'
        },
        {
          id: 'item-24',
          text: 'x / 3 = 4 egyenlet gyöke',
          categoryId: 'nagyobb-5'
        }
      ]
    },

    // ==========================================
    // 3. SZINT: MESTER (Megoldások száma)
    // ==========================================
    {
      level: 3,
      instruction: 'Csoportosítsd az egyenleteket aszerint, hogy hány megoldásuk van a valós számok halmazán!',
      categories: [
        {
          id: 'nincs-megoldas',
          name: 'Nincs megoldása (0 db)',
          color: 'rose',
          description: 'Ellentmondás, egyetlen szám sem teszi igazzá'
        },
        {
          id: 'egy-megoldas',
          name: 'Pontosan 1 megoldás',
          color: 'violet',
          description: 'Egyetlen egyértelmű szám teszi igazzá'
        },
        {
          id: 'vegtelen-megoldas',
          name: 'Végtelen sok megoldás',
          color: 'emerald',
          description: 'Azonosság, minden valós szám megoldás'
        }
      ],
      items: [
        {
          id: 'item-25',
          text: '2x + 3 = 2x + 7',
          categoryId: 'nincs-megoldas'
        },
        {
          id: 'item-26',
          text: 'x + 5 = x',
          categoryId: 'nincs-megoldas'
        },
        {
          id: 'item-27',
          text: '4x - 1 = 4x + 8',
          categoryId: 'nincs-megoldas'
        },
        {
          id: 'item-28',
          text: '0 · x = 12',
          categoryId: 'nincs-megoldas'
        },
        {
          id: 'item-29',
          text: '3x + 4 = 19',
          categoryId: 'egy-megoldas'
        },
        {
          id: 'item-30',
          text: '2 · (x + 5) = 24',
          categoryId: 'egy-megoldas'
        },
        {
          id: 'item-31',
          text: '5x - 8 = 2x + 13',
          categoryId: 'egy-megoldas'
        },
        {
          id: 'item-32',
          text: 'x / 4 + 2 = 7',
          categoryId: 'egy-megoldas'
        },
        {
          id: 'item-33',
          text: '2 · (x + 3) = 2x + 6',
          categoryId: 'vegtelen-megoldas'
        },
        {
          id: 'item-34',
          text: '3x + 5 - x = 2x + 5',
          categoryId: 'vegtelen-megoldas'
        },
        {
          id: 'item-35',
          text: '0 · x = 0',
          categoryId: 'vegtelen-megoldas'
        },
        {
          id: 'item-36',
          text: '4 · (x - 1) + 4 = 4x',
          categoryId: 'vegtelen-megoldas'
        }
      ]
    }
  ];

  return (
    <SorterTemplate
      title="Nyitott mondatok és egyenletek csoportosító"
      subtitle="Rendszerezd az egyenleteket típusuk, gyökük és a megoldások száma szerint 3 szinten!"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 📂 RENDSZEREZŐ"
      themeColor="violet"
      levels={levels}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default OpenSentencesSorter;
