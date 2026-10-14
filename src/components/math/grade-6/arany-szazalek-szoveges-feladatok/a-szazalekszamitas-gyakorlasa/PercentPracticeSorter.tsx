import React from 'react';
import { SorterTemplate, SorterLevel } from '../SorterTemplate';

interface PercentPracticeSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToTheory?: () => void;
}

export const PercentPracticeSorter: React.FC<PercentPracticeSorterProps> = ({
  onBack,
  onSwitchToQuiz,
  onSwitchToTheory
}) => {
  const levels: SorterLevel[] = [
    // ==========================================
    // 1. SZINT: KEZDŐ (Árváltozás iránya)
    // ==========================================
    {
      level: 1,
      instruction: 'Csoportosítsd az eseteket aszerint, hogy milyen irányú árváltozást jelentenek!',
      categories: [
        {
          id: 'learazas',
          name: 'Árleszállítás (Olcsóbb)',
          color: 'emerald',
          description: 'Kedvezmény, engedmény, kevesebb fizetendő'
        },
        {
          id: 'valtozatlan',
          name: 'Változatlan ár (0%)',
          color: 'sky',
          description: 'Nem változik a fizetendő összeg'
        },
        {
          id: 'aremeles',
          name: 'Áremelés (Drágább)',
          color: 'rose',
          description: 'Drágulás, haszonkulcs, több fizetendő'
        }
      ],
      items: [
        {
          id: 'item-1',
          text: '20%-os bolti akció a cipőkre',
          categoryId: 'learazas'
        },
        {
          id: 'item-2',
          text: '10%-os diákkedvezmény a belépőből',
          categoryId: 'learazas'
        },
        {
          id: 'item-3',
          text: 'Szezonvégi 30%-os kiárusítás',
          categoryId: 'learazas'
        },
        {
          id: 'item-4',
          text: '15%-os kuponos árengedmény',
          categoryId: 'learazas'
        },
        {
          id: 'item-5',
          text: 'Fix áras termék akció nélkül',
          categoryId: 'valtozatlan'
        },
        {
          id: 'item-6',
          text: '100%-os fizetendő eredeti alapár',
          categoryId: 'valtozatlan'
        },
        {
          id: 'item-7',
          text: 'Árgarancia változatlan árszinten',
          categoryId: 'valtozatlan'
        },
        {
          id: 'item-8',
          text: '0%-os árkorrekció a szerződésben',
          categoryId: 'valtozatlan'
        },
        {
          id: 'item-9',
          text: '15%-os inflációs áremelkedés',
          categoryId: 'aremeles'
        },
        {
          id: 'item-10',
          text: '10%-os alapanyag-drágulás beépítése',
          categoryId: 'aremeles'
        },
        {
          id: 'item-11',
          text: '25%-os haszonkulcs hozzáadása',
          categoryId: 'aremeles'
        },
        {
          id: 'item-12',
          text: '8%-os szolgáltatási díjemelés',
          categoryId: 'aremeles'
        }
      ]
    },

    // ==========================================
    // 2. SZINT: HALADÓ (Szorzótényező az 1-hez képest)
    // ==========================================
    {
      level: 2,
      instruction: 'Csoportosítsd a szorzótényezőket a nagyságuk szerint az 1 egészhez viszonyítva!',
      categories: [
        {
          id: 'kisebb-1',
          name: '1-nél kisebb szorzó (k < 1)',
          color: 'teal',
          description: 'A végösszeg kevesebb az eredetinél'
        },
        {
          id: 'egyenlo-1',
          name: 'Pontosan 1 a szorzó (k = 1)',
          color: 'sky',
          description: 'Az összeg pontosan változatlan marad'
        },
        {
          id: 'nagyobb-1',
          name: '1-nél nagyobb szorzó (k > 1)',
          color: 'pink',
          description: 'A végösszeg több az eredetinél'
        }
      ],
      items: [
        {
          id: 'item-13',
          text: '20%-os kedvezmény szorzója (0,80)',
          categoryId: 'kisebb-1'
        },
        {
          id: 'item-14',
          text: '35%-os kiárusítás szorzója (0,65)',
          categoryId: 'kisebb-1'
        },
        {
          id: 'item-15',
          text: 'Féláras akció szorzótényezője (0,50)',
          categoryId: 'kisebb-1'
        },
        {
          id: 'item-16',
          text: '10%-os diákkedvezmény szorzója (0,90)',
          categoryId: 'kisebb-1'
        },
        {
          id: 'item-17',
          text: '0%-os árváltozás szorzója (1,00)',
          categoryId: 'egyenlo-1'
        },
        {
          id: 'item-18',
          text: 'Eredeti ár 100%-ának szorzója (1,00)',
          categoryId: 'egyenlo-1'
        },
        {
          id: 'item-19',
          text: 'Kedvezmény nélküli vásárlás szorzója (1,00)',
          categoryId: 'egyenlo-1'
        },
        {
          id: 'item-20',
          text: 'Változatlan díjszabás szorzója (1,00)',
          categoryId: 'egyenlo-1'
        },
        {
          id: 'item-21',
          text: '15%-os drágulás szorzója (1,15)',
          categoryId: 'nagyobb-1'
        },
        {
          id: 'item-22',
          text: '25%-os áremelés szorzója (1,25)',
          categoryId: 'nagyobb-1'
        },
        {
          id: 'item-23',
          text: 'Ár megduplázódásának szorzója (2,00)',
          categoryId: 'nagyobb-1'
        },
        {
          id: 'item-24',
          text: '5%-os árkorrekció növekedéssel (1,05)',
          categoryId: 'nagyobb-1'
        }
      ]
    },

    // ==========================================
    // 3. SZINT: MESTER (Egymást követő változások végeredménye)
    // ==========================================
    {
      level: 3,
      instruction: 'Csoportosítsd az összetett változásokat aszerint, hogy a végső ár hogyan viszonyul az eredeti árhoz!',
      categories: [
        {
          id: 'vegul-olcsobb',
          name: 'Végül olcsóbb az eredetinél',
          color: 'emerald',
          description: 'A végső ár alacsonyabb, mint a kiinduláskor'
        },
        {
          id: 'vegul-ugyanannyi',
          name: 'Pontosan ugyanannyi maradt',
          color: 'sky',
          description: 'A végső ár megegyezik a kiindulási árral'
        },
        {
          id: 'vegul-dragabb',
          name: 'Végül drágább az eredetinél',
          color: 'rose',
          description: 'A végső ár magasabb, mint a kiinduláskor'
        }
      ],
      items: [
        {
          id: 'item-25',
          text: '20% emelés, majd az új ár 20% csökkentése',
          categoryId: 'vegul-olcsobb'
        },
        {
          id: 'item-26',
          text: '10% csökkentés, majd az új ár 10% emelése',
          categoryId: 'vegul-olcsobb'
        },
        {
          id: 'item-27',
          text: 'Két egymást követő 10%-os leárazás',
          categoryId: 'vegul-olcsobb'
        },
        {
          id: 'item-28',
          text: '30% leárazás, majd 15% emelés az akciós árból',
          categoryId: 'vegul-olcsobb'
        },
        {
          id: 'item-29',
          text: '2000 Ft fix emelés, majd 2000 Ft fix levonás',
          categoryId: 'vegul-ugyanannyi'
        },
        {
          id: 'item-30',
          text: '50%-os felezés, majd az új ár megduplázása (200%)',
          categoryId: 'vegul-ugyanannyi'
        },
        {
          id: 'item-31',
          text: '25% emelés, majd az új ár 20%-os csökkentése',
          categoryId: 'vegul-ugyanannyi'
        },
        {
          id: 'item-32',
          text: 'Változatlan áron történő újraértékesítés',
          categoryId: 'vegul-ugyanannyi'
        },
        {
          id: 'item-33',
          text: 'Két egymást követő 10%-os áremelés',
          categoryId: 'vegul-dragabb'
        },
        {
          id: 'item-34',
          text: '30% áremelés, majd csak 10% kedvezmény',
          categoryId: 'vegul-dragabb'
        },
        {
          id: 'item-35',
          text: '25% drágulás, majd 5% engedmény az új árból',
          categoryId: 'vegul-dragabb'
        },
        {
          id: 'item-36',
          text: '50% áremelés, majd 20% kedvezmény az új árból',
          categoryId: 'vegul-dragabb'
        }
      ]
    }
  ];

  return (
    <SorterTemplate
      title="Százalékszámítás a gyakorlatban csoportosító"
      subtitle="Csoportosítsd az árváltozásokat, szorzókat és egymást követő folyamatokat 3 szinten!"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 📂 RENDSZEREZŐ"
      themeColor="pink"
      levels={levels}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default PercentPracticeSorter;
