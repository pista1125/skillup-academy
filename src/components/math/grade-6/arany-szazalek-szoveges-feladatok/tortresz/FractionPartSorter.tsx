import React from 'react';
import { SorterTemplate, SorterLevel } from '../SorterTemplate';

interface FractionPartSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToTheory?: () => void;
}

export const FractionPartSorter: React.FC<FractionPartSorterProps> = ({
  onBack,
  onSwitchToQuiz,
  onSwitchToTheory
}) => {
  const levels: SorterLevel[] = [
    // ==========================================
    // 1. SZINT: KEZDŐ (A megoldáshoz szükséges művelet)
    // ==========================================
    {
      level: 1,
      instruction: 'Csoportosítsd a feladatokat aszerint, hogy milyen művelettel kell őket megoldani!',
      categories: [
        {
          id: 'szorzas',
          name: 'Szorzás (Törtrész kiszámítása)',
          color: 'teal',
          description: 'Egész szorozva a törttel'
        },
        {
          id: 'osztas',
          name: 'Osztás (Egész visszaszámolása)',
          color: 'emerald',
          description: 'Megadott törtrész osztva a törttel'
        },
        {
          id: 'hanyados',
          name: 'Hányados / Arány (Hányadrésze?)',
          color: 'blue',
          description: 'Rész osztva az egésszel (A / B)'
        }
      ],
      items: [
        {
          id: 'item-1',
          text: 'Mennyi 200-nak a 3/5 része?',
          categoryId: 'szorzas'
        },
        {
          id: 'item-2',
          text: 'Mennyi 120-nak a 3/4 része?',
          categoryId: 'szorzas'
        },
        {
          id: 'item-3',
          text: '1 óra 2/3 részének kiszámítása percekben',
          categoryId: 'szorzas'
        },
        {
          id: 'item-4',
          text: '500 Ft 7/10 részének meghatározása',
          categoryId: 'szorzas'
        },
        {
          id: 'item-5',
          text: 'Melyik számnak a 2/3 része a 40?',
          categoryId: 'osztas'
        },
        {
          id: 'item-6',
          text: 'Melyik számnak a 3/5 része a 90?',
          categoryId: 'osztas'
        },
        {
          id: 'item-7',
          text: 'Melyik pénzösszegnek a fele (1/2) 1500 Ft?',
          categoryId: 'osztas'
        },
        {
          id: 'item-8',
          text: 'Melyik tartálynak a 4/9 része 360 liter?',
          categoryId: 'osztas'
        },
        {
          id: 'item-9',
          text: 'Hányadrésze a 20 a 80-nak?',
          categoryId: 'hanyados'
        },
        {
          id: 'item-10',
          text: 'Hányadrésze a 15 perc az 1 órának?',
          categoryId: 'hanyados'
        },
        {
          id: 'item-11',
          text: 'Hányadrésze a 250 g a 2 kg-nak?',
          categoryId: 'hanyados'
        },
        {
          id: 'item-12',
          text: 'Hányadrésze a 18 lány a 30 tanulónak?',
          categoryId: 'hanyados'
        }
      ]
    },

    // ==========================================
    // 2. SZINT: HALADÓ (A törtrész értéke az 50-hez viszonyítva)
    // ==========================================
    {
      level: 2,
      instruction: 'Számold ki a megadott törtrészt, és csoportosítsd az értéke szerint az 50-hez képest!',
      categories: [
        {
          id: 'kisebb-50',
          name: 'Kisebb mint 50',
          color: 'sky',
          description: 'A kiszámított rész 50-nél kevesebb'
        },
        {
          id: 'pontosan-50',
          name: 'Pontosan 50',
          color: 'teal',
          description: 'A kiszámított rész pontosan 50'
        },
        {
          id: 'nagyobb-50',
          name: 'Nagyobb mint 50',
          color: 'purple',
          description: 'A kiszámított rész 50-nél több'
        }
      ],
      items: [
        {
          id: 'item-13',
          text: '80-nak a 2/5 része',
          categoryId: 'kisebb-50'
        },
        {
          id: 'item-14',
          text: '60-nak a 2/3 része',
          categoryId: 'kisebb-50'
        },
        {
          id: 'item-15',
          text: '120-nak az 1/4 része',
          categoryId: 'kisebb-50'
        },
        {
          id: 'item-16',
          text: '150-nek a 2/10 része',
          categoryId: 'kisebb-50'
        },
        {
          id: 'item-17',
          text: '100-nak az 1/2 része',
          categoryId: 'pontosan-50'
        },
        {
          id: 'item-18',
          text: '200-nak az 1/4 része',
          categoryId: 'pontosan-50'
        },
        {
          id: 'item-19',
          text: '250-nek az 1/5 része',
          categoryId: 'pontosan-50'
        },
        {
          id: 'item-20',
          text: '75-nek a 2/3 része',
          categoryId: 'pontosan-50'
        },
        {
          id: 'item-21',
          text: '80-nak a 3/4 része',
          categoryId: 'nagyobb-50'
        },
        {
          id: 'item-22',
          text: '120-nak a 3/5 része',
          categoryId: 'nagyobb-50'
        },
        {
          id: 'item-23',
          text: '90-nek az 5/6 része',
          categoryId: 'nagyobb-50'
        },
        {
          id: 'item-24',
          text: '150-nek a 4/5 része',
          categoryId: 'nagyobb-50'
        }
      ]
    },

    // ==========================================
    // 3. SZINT: MESTER (A tört viszonya a teljes egészhez)
    // ==========================================
    {
      level: 3,
      instruction: 'Csoportosítsd a kifejezéseket a tört értéke (nagysága az egészhez képest) szerint!',
      categories: [
        {
          id: 'kisebb-egesz',
          name: 'Kisebb mint az egész (Valódi tört)',
          color: 'teal',
          description: 'A számláló kisebb a nevezőnél (a / b < 1)'
        },
        {
          id: 'pontosan-egesz',
          name: 'Pontosan az egész (Egységnyi tört)',
          color: 'emerald',
          description: 'A számláló egyenlő a nevezővel (a / b = 1)'
        },
        {
          id: 'nagyobb-egesz',
          name: 'Nagyobb mint az egész (Áltört)',
          color: 'amber',
          description: 'A számláló nagyobb a nevezőnél (a / b > 1)'
        }
      ],
      items: [
        {
          id: 'item-25',
          text: 'Egy pénzösszeg 4/5 része',
          categoryId: 'kisebb-egesz'
        },
        {
          id: 'item-26',
          text: 'Egy túraútvonal 7/10 része',
          categoryId: 'kisebb-egesz'
        },
        {
          id: 'item-27',
          text: 'Egy könyv 5/8 része',
          categoryId: 'kisebb-egesz'
        },
        {
          id: 'item-28',
          text: 'Egy torta 2/3 része',
          categoryId: 'kisebb-egesz'
        },
        {
          id: 'item-29',
          text: 'Egy osztály 5/5 része',
          categoryId: 'pontosan-egesz'
        },
        {
          id: 'item-30',
          text: 'Egy víztartály 8/8 része',
          categoryId: 'pontosan-egesz'
        },
        {
          id: 'item-31',
          text: 'Egy megtett táv 12/12 része',
          categoryId: 'pontosan-egesz'
        },
        {
          id: 'item-32',
          text: 'Egy elvégzett feladat 4/4 része',
          categoryId: 'pontosan-egesz'
        },
        {
          id: 'item-33',
          text: 'A betakarított termés 6/5 része',
          categoryId: 'nagyobb-egesz'
        },
        {
          id: 'item-34',
          text: 'Az eredeti ár 5/4 része (áremelés után)',
          categoryId: 'nagyobb-egesz'
        },
        {
          id: 'item-35',
          text: 'A teljesített terv 4/3 része',
          categoryId: 'nagyobb-egesz'
        },
        {
          id: 'item-36',
          text: 'Az alapmennyiség 3/2 része',
          categoryId: 'nagyobb-egesz'
        }
      ]
    }
  ];

  return (
    <SorterTemplate
      title="Törtrész és egész csoportosító"
      subtitle="Csoportosítsd a feladatokat műveletek, számértékek és törttípusok szerint 3 szinten!"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 📂 RENDSZEREZŐ"
      themeColor="teal"
      levels={levels}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default FractionPartSorter;
