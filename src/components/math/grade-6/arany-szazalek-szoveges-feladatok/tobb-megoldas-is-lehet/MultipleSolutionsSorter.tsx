import React from 'react';
import { SorterTemplate, SorterLevel } from '../SorterTemplate';

interface MultipleSolutionsSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToTheory?: () => void;
}

export const MultipleSolutionsSorter: React.FC<MultipleSolutionsSorterProps> = ({
  onBack,
  onSwitchToQuiz,
  onSwitchToTheory
}) => {
  const levels: SorterLevel[] = [
    // ==========================================
    // 1. SZINT: KEZDŐ (Megoldások száma)
    // ==========================================
    {
      level: 1,
      instruction: 'Csoportosítsd a matematikai állításokat és egyenleteket a megoldásaik száma szerint!',
      categories: [
        {
          id: 'nincs',
          name: 'Nincs megoldás (0 db)',
          color: 'rose',
          description: 'Ellentmondásos feltétel vagy üres megoldáshalmaz'
        },
        {
          id: 'egy',
          name: 'Pontosan 1 megoldás',
          color: 'teal',
          description: 'Egyetlen egyértelmű értéket ad'
        },
        {
          id: 'vegtelen',
          name: 'Végtelen sok megoldás',
          color: 'indigo',
          description: 'Azonosság vagy egyenlőtlenség valós számokon'
        }
      ],
      items: [
        {
          id: 'item-1',
          text: '0 · x = 8 egyenlet a valós számokon',
          categoryId: 'nincs'
        },
        {
          id: 'item-2',
          text: 'x + 3 = x + 7 egyenlet',
          categoryId: 'nincs'
        },
        {
          id: 'item-3',
          text: 'Egy osztály létszáma x = -4 fő',
          categoryId: 'nincs'
        },
        {
          id: 'item-4',
          text: 'Két prímszám összege 35',
          categoryId: 'nincs'
        },
        {
          id: 'item-5',
          text: '2x + 6 = 16 egyenlet megoldása',
          categoryId: 'egy'
        },
        {
          id: 'item-6',
          text: 'Páros prímszám a természetes számok között',
          categoryId: 'egy'
        },
        {
          id: 'item-7',
          text: '3x - 5 = 10 egyenlet megoldása',
          categoryId: 'egy'
        },
        {
          id: 'item-8',
          text: 'Derékszögű háromszög szomszédos egész oldalakkal',
          categoryId: 'egy'
        },
        {
          id: 'item-9',
          text: '0 · x = 0 egyenlet a valós számokon',
          categoryId: 'vegtelen'
        },
        {
          id: 'item-10',
          text: '2(x + 3) = 2x + 6 azonosság',
          categoryId: 'vegtelen'
        },
        {
          id: 'item-11',
          text: 'x > 5 egyenlőtlenség a valós számokon',
          categoryId: 'vegtelen'
        },
        {
          id: 'item-12',
          text: '3x - x = 2x összefüggés',
          categoryId: 'vegtelen'
        }
      ]
    },

    // ==========================================
    // 2. SZINT: HALADÓ (Megoldások pontos száma)
    // ==========================================
    {
      level: 2,
      instruction: 'Csoportosítsd a feladatokat a helyes megoldások száma szerint (2, 3 vagy 4 darab)!',
      categories: [
        {
          id: 'ketto',
          name: 'Pontosan 2 megoldás',
          color: 'teal',
          description: 'Pontosan két érvényes eset vagy számpár létezik'
        },
        {
          id: 'harom',
          name: 'Pontosan 3 megoldás',
          color: 'amber',
          description: 'Pontosan három érvényes eset vagy számpár létezik'
        },
        {
          id: 'negy',
          name: 'Pontosan 4 megoldás',
          color: 'violet',
          description: 'Pontosan négy érvényes eset vagy számpár létezik'
        }
      ],
      items: [
        {
          id: 'item-13',
          text: 'Két természetes szám szorzata 6 (a ≤ b)',
          categoryId: 'ketto'
        },
        {
          id: 'item-14',
          text: 'Egyenlő szárú háromszög szöghármasai, ha egyik szöge 50°',
          categoryId: 'ketto'
        },
        {
          id: 'item-15',
          text: '|x| = 7 egyenlet egész megoldásai',
          categoryId: 'ketto'
        },
        {
          id: 'item-16',
          text: 'Téglalap T = K egész oldalhosszakkal (a ≤ b)',
          categoryId: 'ketto'
        },
        {
          id: 'item-17',
          text: 'Téglalap területe 12 cm² egész oldalakkal (a ≤ b)',
          categoryId: 'harom'
        },
        {
          id: 'item-18',
          text: '400 Ft kifizetése 100 és 200 Ft-os érmékkel',
          categoryId: 'harom'
        },
        {
          id: 'item-19',
          text: '3x + 4y = 24 a természetes számok halmazán',
          categoryId: 'harom'
        },
        {
          id: 'item-20',
          text: 'Kék golyók száma: k < 3,33 pozitív egészeken',
          categoryId: 'harom'
        },
        {
          id: 'item-21',
          text: 'Pozitív egész számok, melyek kisebbek 5-nél',
          categoryId: 'negy'
        },
        {
          id: 'item-22',
          text: 'Téglalap kerülete 18 cm egész oldalakkal (a ≤ b)',
          categoryId: 'negy'
        },
        {
          id: 'item-23',
          text: 'Kétjegyű számok, melyek számjegyeinek összege 4',
          categoryId: 'negy'
        },
        {
          id: 'item-24',
          text: '500 Ft felváltása 50 és 100 Ft-osokra úgy, hogy mindből van',
          categoryId: 'negy'
        }
      ]
    },

    // ==========================================
    // 3. SZINT: MESTER (Alaphalmaz és feltételvizsgálat)
    // ==========================================
    {
      level: 3,
      instruction: 'Csoportosítsd a feladatokat a megoldást befolyásoló alaphalmaz és feltétel jellege szerint!',
      categories: [
        {
          id: 'termeszetes',
          name: 'Természetes számok (0, 1, 2...)',
          color: 'teal',
          description: 'Nemnegatív egész értékek és darabszámok'
        },
        {
          id: 'egesz',
          name: 'Egész számok halmaza (negatívakkal)',
          color: 'violet',
          description: 'Előjeles egész számok és távolságok a számegyenesen'
        },
        {
          id: 'valos-kizaras',
          name: 'Szöveges és geometriai kizáró feltétel',
          color: 'rose',
          description: 'Háromszög-egyenlőtlenség, valós létszám vagy azonosság'
        }
      ],
      items: [
        {
          id: 'item-25',
          text: 'x + y = 6 természetes számpárok (0-tól 6-ig)',
          categoryId: 'termeszetes'
        },
        {
          id: 'item-26',
          text: 'Érmék darabszáma fizetéskor a kasszánál',
          categoryId: 'termeszetes'
        },
        {
          id: 'item-27',
          text: 'Téglalap egész centiméter oldalhosszai',
          categoryId: 'termeszetes'
        },
        {
          id: 'item-28',
          text: '3x < 14 egyenlőtlenség nemnegatív megoldásai',
          categoryId: 'termeszetes'
        },
        {
          id: 'item-29',
          text: '|x| = 7 távolság a számegyenes nullapontjától',
          categoryId: 'egesz'
        },
        {
          id: 'item-30',
          text: '(x - 3)(x + 5) = 0 szorzat zérushelyei',
          categoryId: 'egesz'
        },
        {
          id: 'item-31',
          text: 'Két egész szám különbsége -5',
          categoryId: 'egesz'
        },
        {
          id: 'item-32',
          text: 'Téli hőmérsékletváltozások előjeles vizsgálata',
          categoryId: 'egesz'
        },
        {
          id: 'item-33',
          text: 'Emberek és állatok száma: nem lehet tört vagy negatív',
          categoryId: 'valos-kizaras'
        },
        {
          id: 'item-34',
          text: 'Háromszög-egyenlőtlenség kizárása: 4 + 4 nem nagyobb 9-nél',
          categoryId: 'valos-kizaras'
        },
        {
          id: 'item-35',
          text: '2(x + 3) = 2x + 6 azonosság minden valós számra',
          categoryId: 'valos-kizaras'
        },
        {
          id: 'item-36',
          text: '12 / n tört vizsgálata: n csak a 12 osztója lehet',
          categoryId: 'valos-kizaras'
        }
      ]
    }
  ];

  return (
    <SorterTemplate
      title="Több megoldás is lehet csoportosító"
      subtitle="Rendszerezd az állításokat és feladatokat a megoldások száma és az alaphalmaz megkötései szerint 3 szinten!"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 📂 RENDSZEREZŐ"
      themeColor="amber"
      levels={levels}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default MultipleSolutionsSorter;
