import React from 'react';
import { SorterTemplate, SorterLevel } from '../SorterTemplate';

interface WordProblemsSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToTheory?: () => void;
}

export const WordProblemsSorter: React.FC<WordProblemsSorterProps> = ({
  onBack,
  onSwitchToQuiz,
  onSwitchToTheory
}) => {
  const levels: SorterLevel[] = [
    // ==========================================
    // 1. SZINT: KEZDŐ (Feladattípus)
    // ==========================================
    {
      level: 1,
      instruction: 'Csoportosítsd a szöveges feladatokat a témájuk és típusuk szerint!',
      categories: [
        {
          id: 'szamkereses',
          name: 'Számkeresés és műveletek',
          color: 'teal',
          description: 'Ismeretlen számok közötti összefüggések és műveletek'
        },
        {
          id: 'eletkor',
          name: 'Életkor és személyek',
          color: 'violet',
          description: 'Életkorok és emberekkel kapcsolatos feladványok'
        },
        {
          id: 'geometria',
          name: 'Geometria és kerület',
          color: 'sky',
          description: 'Síkidomok oldalai, kerülete és geometriai méretei'
        }
      ],
      items: [
        {
          id: 'item-1',
          text: 'Két szám összege 36, a különbségük 6',
          categoryId: 'szamkereses'
        },
        {
          id: 'item-2',
          text: 'Egy szám négyszereséhez 8-at adva 40-et kapunk',
          categoryId: 'szamkereses'
        },
        {
          id: 'item-3',
          text: 'Gondolt szám harmadánál 5-tel kevesebb a 12',
          categoryId: 'szamkereses'
        },
        {
          id: 'item-4',
          text: 'Két szám aránya 3 : 5, összegük 40',
          categoryId: 'szamkereses'
        },
        {
          id: 'item-5',
          text: 'Anna és Béla együtt 25 könyvet olvastak',
          categoryId: 'eletkor'
        },
        {
          id: 'item-6',
          text: 'Apa most 38 éves, a fia pedig 10 éves',
          categoryId: 'eletkor'
        },
        {
          id: 'item-7',
          text: 'Három testvér életkorának összege 39 év',
          categoryId: 'eletkor'
        },
        {
          id: 'item-8',
          text: 'Anya 6 évvel ezelőtt hétszer annyi idős volt, mint a fia',
          categoryId: 'eletkor'
        },
        {
          id: 'item-9',
          text: 'Téglalap szélessége 6 cm, hossza háromszoros',
          categoryId: 'geometria'
        },
        {
          id: 'item-10',
          text: 'Téglalap kerülete 48 cm, hosszúsága 6-tal több',
          categoryId: 'geometria'
        },
        {
          id: 'item-11',
          text: 'Egyenlő szárú háromszög kerülete 32 cm',
          categoryId: 'geometria'
        },
        {
          id: 'item-12',
          text: 'Kert körüljárása és a kerítés hossza',
          categoryId: 'geometria'
        }
      ]
    },

    // ==========================================
    // 2. SZINT: HALADÓ (Keresett mértékegység)
    // ==========================================
    {
      level: 2,
      instruction: 'Csoportosítsd a feladatokat a keresett válasz mértékegysége szerint!',
      categories: [
        {
          id: 'hossz',
          name: 'Hosszúság (cm, m, km)',
          color: 'sky',
          description: 'A válasz térbeli vagy geometriai méret'
        },
        {
          id: 'penz',
          name: 'Pénzösszeg (Ft)',
          color: 'emerald',
          description: 'A válasz forintban kifejezett érték'
        },
        {
          id: 'darab',
          name: 'Darabszám vagy létszám (db, fő)',
          color: 'violet',
          description: 'A válasz megszámlálható darabszám vagy ember'
        }
      ],
      items: [
        {
          id: 'item-13',
          text: 'Mekkora a téglalap szélessége, ha K = 54 cm?',
          categoryId: 'hossz'
        },
        {
          id: 'item-14',
          text: 'Milyen hosszú a teljes túraútvonal a 3 napos túrán?',
          categoryId: 'hossz'
        },
        {
          id: 'item-15',
          text: 'Milyen hosszú az egyenlő szárú háromszög szára?',
          categoryId: 'hossz'
        },
        {
          id: 'item-16',
          text: 'Mekkora a telek eredeti szélessége méterben?',
          categoryId: 'hossz'
        },
        {
          id: 'item-17',
          text: 'Mennyibe került a toll a füzet mellett vásárolva?',
          categoryId: 'penz'
        },
        {
          id: 'item-18',
          text: 'Mennyi zsebpénze volt Bencének a mozizás előtt?',
          categoryId: 'penz'
        },
        {
          id: 'item-19',
          text: 'Mennyi volt a felnőtt belépőjegy ára?',
          categoryId: 'penz'
        },
        {
          id: 'item-20',
          text: 'Mennyi pénzt spórolt meg a vásárló összesen?',
          categoryId: 'penz'
        },
        {
          id: 'item-21',
          text: 'Hány könyvet olvasott Béla a nyáron?',
          categoryId: 'darab'
        },
        {
          id: 'item-22',
          text: 'Hány lány tanuló vett részt a kiránduláson?',
          categoryId: 'darab'
        },
        {
          id: 'item-23',
          text: 'Hány nyúl futkározik az udvaron?',
          categoryId: 'darab'
        },
        {
          id: 'item-24',
          text: 'Hány mesekönyv sorakozott a polcon?',
          categoryId: 'darab'
        }
      ]
    },

    // ==========================================
    // 3. SZINT: MESTER (Modell jellege)
    // ==========================================
    {
      level: 3,
      instruction: 'Csoportosítsd a feladatokat az alkalmazott egyenlet / modell típusa szerint!',
      categories: [
        {
          id: 'linearis',
          name: 'Lineáris egyenlet (ax + b = c)',
          color: 'teal',
          description: 'Csak az egyik oldalon szerepel ismeretlen'
        },
        {
          id: 'mindket-oldal',
          name: 'Mindkét oldalon ismeretlen',
          color: 'violet',
          description: 'A modell alakja: ax + b = cx + d'
        },
        {
          id: 'tortreszek',
          name: 'Törtrészek és maradékok',
          color: 'amber',
          description: 'Törtek összegzése vagy maradékból számított részek'
        }
      ],
      items: [
        {
          id: 'item-25',
          text: 'Egy szám 4-szereséhez 8-at adva 40-et kapunk',
          categoryId: 'linearis'
        },
        {
          id: 'item-26',
          text: 'Téglalap kerülete: 4x + 14 = 54',
          categoryId: 'linearis'
        },
        {
          id: 'item-27',
          text: 'Három testvér életkora: 3x = 39',
          categoryId: 'linearis'
        },
        {
          id: 'item-28',
          text: 'Füzet és toll vásárlása: 2x + 400 = 1200',
          categoryId: 'linearis'
        },
        {
          id: 'item-29',
          text: 'Életkor x év múlva: 38 + x = 3 · (10 + x)',
          categoryId: 'mindket-oldal'
        },
        {
          id: 'item-30',
          text: 'Könyvek átrakása polcon: 2x - 6 = x + 4',
          categoryId: 'mindket-oldal'
        },
        {
          id: 'item-31',
          text: 'Anya kora 6 éve: 4x - 6 = 7 · (x - 6)',
          categoryId: 'mindket-oldal'
        },
        {
          id: 'item-32',
          text: 'Járművek találkozása: 60t + 30 = 90t',
          categoryId: 'mindket-oldal'
        },
        {
          id: 'item-33',
          text: 'Túrázó 2/5-e, majd a maradék fele és 15 km',
          categoryId: 'tortreszek'
        },
        {
          id: 'item-34',
          text: 'Két munkás közös munkája: 1/6 - 1/10 = 1/x',
          categoryId: 'tortreszek'
        },
        {
          id: 'item-35',
          text: 'Tombolák 60%-a és a maradék 75%-a eladva',
          categoryId: 'tortreszek'
        },
        {
          id: 'item-36',
          text: 'Zsebpénz harmada és negyede után 1000 Ft marad',
          categoryId: 'tortreszek'
        }
      ]
    }
  ];

  return (
    <SorterTemplate
      title="Szöveges feladatok csoportosító"
      subtitle="Rendszerezd a feladványokat típusuk, mértékegységük és a matematikai modelljük szerint 3 szinten!"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 📂 RENDSZEREZŐ"
      themeColor="teal"
      levels={levels}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default WordProblemsSorter;
