import React from 'react';
import { SorterTemplate, SorterLevel } from '../SorterTemplate';

interface PercentageSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToTheory?: () => void;
}

export const PercentageSorter: React.FC<PercentageSorterProps> = ({
  onBack,
  onSwitchToQuiz,
  onSwitchToTheory
}) => {
  const levels: SorterLevel[] = [
    // ==========================================
    // 1. SZINT: KEZDŐ (A keresett alapmennyiség)
    // ==========================================
    {
      level: 1,
      instruction: 'Csoportosítsd a feladatokat aszerint, hogy a három alapmennyiség közül melyiket keressük!',
      categories: [
        {
          id: 'ertek',
          name: 'Százalékérték (é)',
          color: 'rose',
          description: 'A megadott %-nak megfelelő részérték kiszámítása'
        },
        {
          id: 'lab',
          name: 'Százalékláb (p%)',
          color: 'sky',
          description: 'A hányadrész meghatározása %-ban (Hány %?)'
        },
        {
          id: 'alap',
          name: 'Százalékalap (a)',
          color: 'emerald',
          description: 'A kiinduló teljes 100%-os egész visszaszámolása'
        }
      ],
      items: [
        {
          id: 'item-1',
          text: 'Mennyi 200 Ft-nak a 25%-a?',
          categoryId: 'ertek'
        },
        {
          id: 'item-2',
          text: 'Mennyi 500 kg-nak a 12%-a?',
          categoryId: 'ertek'
        },
        {
          id: 'item-3',
          text: 'Mennyi 80 liternek a 40%-a?',
          categoryId: 'ertek'
        },
        {
          id: 'item-4',
          text: 'Mennyi 1000 Ft-nak a 15%-a?',
          categoryId: 'ertek'
        },
        {
          id: 'item-5',
          text: 'A 30 a 120-nak hány százaléka?',
          categoryId: 'lab'
        },
        {
          id: 'item-6',
          text: '15 perc az 1 órának hány százaléka?',
          categoryId: 'lab'
        },
        {
          id: 'item-7',
          text: '20 tanulóból 8 lány hány százalék?',
          categoryId: 'lab'
        },
        {
          id: 'item-8',
          text: '450 Ft-ból 90 Ft hány százalék?',
          categoryId: 'lab'
        },
        {
          id: 'item-9',
          text: 'Melyik számnak a 20%-a a 60?',
          categoryId: 'alap'
        },
        {
          id: 'item-10',
          text: 'Melyik összegnek a 75%-a a 900 Ft?',
          categoryId: 'alap'
        },
        {
          id: 'item-11',
          text: 'Melyik távolságnak a 10%-a a 42 km?',
          categoryId: 'alap'
        },
        {
          id: 'item-12',
          text: 'Melyik súlynak az 50%-a a 150 kg?',
          categoryId: 'alap'
        }
      ]
    },

    // ==========================================
    // 2. SZINT: HALADÓ (Százalékérték a 100-hoz képest)
    // ==========================================
    {
      level: 2,
      instruction: 'Számold ki a százalékértéket, és csoportosítsd a kapott eredmény nagysága szerint!',
      categories: [
        {
          id: 'kisebb-100',
          name: 'Kisebb mint 100',
          color: 'sky',
          description: 'A kiszámított rész 100-nál kevesebb'
        },
        {
          id: 'pontosan-100',
          name: 'Pontosan 100',
          color: 'emerald',
          description: 'A kiszámított rész pontosan 100'
        },
        {
          id: 'nagyobb-100',
          name: 'Nagyobb mint 100',
          color: 'rose',
          description: 'A kiszámított rész 100-nál több'
        }
      ],
      items: [
        {
          id: 'item-13',
          text: '200-nak a 30%-a',
          categoryId: 'kisebb-100'
        },
        {
          id: 'item-14',
          text: '150-nek a 40%-a',
          categoryId: 'kisebb-100'
        },
        {
          id: 'item-15',
          text: '400-nak a 20%-a',
          categoryId: 'kisebb-100'
        },
        {
          id: 'item-16',
          text: '500-nak a 15%-a',
          categoryId: 'kisebb-100'
        },
        {
          id: 'item-17',
          text: '200-nak az 50%-a',
          categoryId: 'pontosan-100'
        },
        {
          id: 'item-18',
          text: '400-nak a 25%-a',
          categoryId: 'pontosan-100'
        },
        {
          id: 'item-19',
          text: '1000-nek a 10%-a',
          categoryId: 'pontosan-100'
        },
        {
          id: 'item-20',
          text: '500-nak a 20%-a',
          categoryId: 'pontosan-100'
        },
        {
          id: 'item-21',
          text: '200-nak a 60%-a',
          categoryId: 'nagyobb-100'
        },
        {
          id: 'item-22',
          text: '300-nak az 50%-a',
          categoryId: 'nagyobb-100'
        },
        {
          id: 'item-23',
          text: '400-nak a 35%-a',
          categoryId: 'nagyobb-100'
        },
        {
          id: 'item-24',
          text: '500-nak a 30%-a',
          categoryId: 'nagyobb-100'
        }
      ]
    },

    // ==========================================
    // 3. SZINT: MESTER (A százalékláb viszonya a 100%-hoz)
    // ==========================================
    {
      level: 3,
      instruction: 'Csoportosítsd a kifejezéseket a százalékláb nagysága szerint (100%-hoz képest)!',
      categories: [
        {
          id: 'kisebb-100-pct',
          name: '100%-nál kisebb (Rész vagy csökkenés)',
          color: 'teal',
          description: 'p% < 100%, kedvezmény vagy részmennyiség'
        },
        {
          id: 'pontosan-100-pct',
          name: 'Pontosan 100% (A teljes egész)',
          color: 'emerald',
          description: 'p% = 100%, a kiindulási alap maga'
        },
        {
          id: 'nagyobb-100-pct',
          name: '100%-nál nagyobb (Növekedés vagy túlteljesítés)',
          color: 'amber',
          description: 'p% > 100%, drágulás vagy terv feletti eredmény'
        }
      ],
      items: [
        {
          id: 'item-25',
          text: '25% árengedmény a boltban',
          categoryId: 'kisebb-100-pct'
        },
        {
          id: 'item-26',
          text: 'Egy zsebpénz 60%-os elköltése',
          categoryId: 'kisebb-100-pct'
        },
        {
          id: 'item-27',
          text: 'Egy túraútvonal 85%-ának megtétele',
          categoryId: 'kisebb-100-pct'
        },
        {
          id: 'item-28',
          text: '15%-os kiárusítási leértékelés',
          categoryId: 'kisebb-100-pct'
        },
        {
          id: 'item-29',
          text: 'Egy áru eredeti teljes ára',
          categoryId: 'pontosan-100-pct'
        },
        {
          id: 'item-30',
          text: 'Az iskola teljes tanulói létszáma',
          categoryId: 'pontosan-100-pct'
        },
        {
          id: 'item-31',
          text: 'A víztartály teljes névleges kapacitása',
          categoryId: 'pontosan-100-pct'
        },
        {
          id: 'item-32',
          text: 'A havi fizetés 100%-a',
          categoryId: 'pontosan-100-pct'
        },
        {
          id: 'item-33',
          text: 'A gyártási terv 120%-os teljesítése',
          categoryId: 'nagyobb-100-pct'
        },
        {
          id: 'item-34',
          text: '25%-os áremelés utáni új ár (125%)',
          categoryId: 'nagyobb-100-pct'
        },
        {
          id: 'item-35',
          text: 'A tavalyi terméseredmény 150%-a',
          categoryId: 'nagyobb-100-pct'
        },
        {
          id: 'item-36',
          text: '110%-os fizetés prémiummal kiegészítve',
          categoryId: 'nagyobb-100-pct'
        }
      ]
    }
  ];

  return (
    <SorterTemplate
      title="Százalékszámítás csoportosító"
      subtitle="Csoportosítsd a feladatokat alapmennyiségek, számértékek és százalékarányok szerint 3 szinten!"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 📂 RENDSZEREZŐ"
      themeColor="rose"
      levels={levels}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default PercentageSorter;
