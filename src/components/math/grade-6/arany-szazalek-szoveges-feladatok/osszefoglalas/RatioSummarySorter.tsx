import React from 'react';
import { SorterTemplate, SorterLevel } from '../SorterTemplate';

interface RatioSummarySorterProps {
  level?: any;
  currentLevel?: any;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
}

export const RatioSummarySorter: React.FC<RatioSummarySorterProps> = ({
  level,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory
}) => {
  const levels: SorterLevel[] = [
    // ==========================================
    // 1. SZINT: KEZDŐ (A fejezet fő témakörei)
    // ==========================================
    {
      level: 1,
      instruction: 'Csoportosítsd a fogalmakat és feladatokat a IV. fejezet három fő témaköre szerint!',
      categories: [
        {
          id: 'arany',
          name: 'Arány és egyenes arányosság',
          color: 'amber',
          description: 'Hányadosok, arányos osztás és egyenes arányosság grafikonja'
        },
        {
          id: 'szazalek',
          name: 'Százalékszámítás és törtrész',
          color: 'teal',
          description: 'Századrészek, alap, százalékláb és érték, árengedmények'
        },
        {
          id: 'egyenlet',
          name: 'Egyenletek és szöveges feladatok',
          color: 'violet',
          description: 'Mérlegelv, életkoros, mozgásos feladatok és esetvizsgálat'
        }
      ],
      items: [
        {
          id: 'item-1',
          text: '15 : 25 arány egyszerűsítése 3 : 5-re',
          categoryId: 'arany'
        },
        {
          id: 'item-2',
          text: 'Egységár és fizetendő összeg kapcsolata (y = k · x)',
          categoryId: 'arany'
        },
        {
          id: 'item-3',
          text: 'Origóból kiinduló egyenes vonalú grafikon',
          categoryId: 'arany'
        },
        {
          id: 'item-4',
          text: 'Pénzösszeg felosztása 2 : 3 arányban két testvér között',
          categoryId: 'arany'
        },
        {
          id: 'item-5',
          text: '2000 Ft-nak a 15%-os kiszámítása',
          categoryId: 'szazalek'
        },
        {
          id: 'item-6',
          text: 'Egy szám 30%-a 45, mennyi maga a szám?',
          categoryId: 'szazalek'
        },
        {
          id: 'item-7',
          text: '120-nak a 3/4 részének meghatározása',
          categoryId: 'szazalek'
        },
        {
          id: 'item-8',
          text: 'Kabát árának csökkentése 20%-os leértékeléssel',
          categoryId: 'szazalek'
        },
        {
          id: 'item-9',
          text: '3x + 5 = 26 egyenlet megoldása mérlegelvvel',
          categoryId: 'egyenlet'
        },
        {
          id: 'item-10',
          text: 'Anna és Péter életkorának kiszámítása szöveges adatokból',
          categoryId: 'egyenlet'
        },
        {
          id: 'item-11',
          text: 'Két autó találkozása egymással szemben haladva',
          categoryId: 'egyenlet'
        },
        {
          id: 'item-12',
          text: '0 · x = 7 ellentmondásos egyenlet eseteinek vizsgálata',
          categoryId: 'egyenlet'
        }
      ]
    },

    // ==========================================
    // 2. SZINT: HALADÓ (Matematikai módszer és lépés)
    // ==========================================
    {
      level: 2,
      instruction: 'Csoportosítsd a feladatokat a megoldásukhoz szükséges matematikai fő lépés szerint!',
      categories: [
        {
          id: 'szorzas',
          name: 'Szorzás és százalékérték-számítás',
          color: 'teal',
          description: 'Alap szorzása a lábbal vagy arányossági tényezővel'
        },
        {
          id: 'osztas',
          name: 'Osztás és 1 rész meghatározása',
          color: 'amber',
          description: 'Összeg osztása a részek számával vagy alap visszaszámolása'
        },
        {
          id: 'egyenletrendezes',
          name: 'Egyenletrendezés és mérlegelv',
          color: 'violet',
          description: 'Mindkét oldal módosítása, ismeretlen kifejezése'
        }
      ],
      items: [
        {
          id: 'item-13',
          text: 'Alap megszorzása százaléklábbal (É = A · p%)',
          categoryId: 'szorzas'
        },
        {
          id: 'item-14',
          text: 'Egyenes arányossági érték kiszámítása: y = k · x',
          categoryId: 'szorzas'
        },
        {
          id: 'item-15',
          text: 'Tört szorzása egész számmal törtrész számításakor',
          categoryId: 'szorzas'
        },
        {
          id: 'item-16',
          text: 'Áremelés új árának számítása: szorzás 1,15-tel',
          categoryId: 'szorzas'
        },
        {
          id: 'item-17',
          text: 'Teljes összeg osztása az aránytagok összegével (1 rész)',
          categoryId: 'osztas'
        },
        {
          id: 'item-18',
          text: 'Alap visszaszámolása: százalékérték osztva a százaléklábbal',
          categoryId: 'osztas'
        },
        {
          id: 'item-19',
          text: 'Egységár megállapítása: k = y / x',
          categoryId: 'osztas'
        },
        {
          id: 'item-20',
          text: 'Arány legegyszerűbb alakra hozása közös osztóval osztva',
          categoryId: 'osztas'
        },
        {
          id: 'item-21',
          text: 'Ismeretlenes tagok összevonása az egyenlet mindkét oldalán',
          categoryId: 'egyenletrendezes'
        },
        {
          id: 'item-22',
          text: 'Állandó szám kivonása az egyenlet mindkét oldalából',
          categoryId: 'egyenletrendezes'
        },
        {
          id: 'item-23',
          text: 'Zárójelek felbontása és mérlegelv alkalmazása',
          categoryId: 'egyenletrendezes'
        },
        {
          id: 'item-24',
          text: 'Szisztematikus táblázatos próbálgatás és esetkizárás',
          categoryId: 'egyenletrendezes'
        }
      ]
    },

    // ==========================================
    // 3. SZINT: MESTER (Eredmények jellege és mértékegysége)
    // ==========================================
    {
      level: 3,
      instruction: 'Csoportosítsd a feladatokat a kapott eredmény mértékegysége és jellege szerint!',
      categories: [
        {
          id: 'penz',
          name: 'Pénzösszeg vagy százalékláb (Ft / %)',
          color: 'teal',
          description: 'Árak, költségek, leértékelések és százalékos arányok'
        },
        {
          id: 'geometria',
          name: 'Geometriai méret vagy szög (cm / cm² / °)',
          color: 'violet',
          description: 'Oldalhosszak, kerület, terület és háromszög szögei'
        },
        {
          id: 'darab-ido',
          name: 'Létszám, idő vagy darabszám (fő / óra / db)',
          color: 'amber',
          description: 'Személyek száma, eltelt idő és megoldások száma'
        }
      ],
      items: [
        {
          id: 'item-25',
          text: 'Új ár 20% leértékelés után: 8000 Ft',
          categoryId: 'penz'
        },
        {
          id: 'item-26',
          text: 'Kedvezmény mértéke az eredeti árhoz képest: 25%',
          categoryId: 'penz'
        },
        {
          id: 'item-27',
          text: 'Könyv ára 15% drágulás után: 4600 Ft',
          categoryId: 'penz'
        },
        {
          id: 'item-28',
          text: 'Alma vételára a piacon: 2250 Ft',
          categoryId: 'penz'
        },
        {
          id: 'item-29',
          text: 'Téglalap területe arányos oldalakból: 135 cm²',
          categoryId: 'geometria'
        },
        {
          id: 'item-30',
          text: 'Háromszög legnagyobb belső szöge: 90°',
          categoryId: 'geometria'
        },
        {
          id: 'item-31',
          text: 'Egyenlő szárú háromszög szára: 9 cm',
          categoryId: 'geometria'
        },
        {
          id: 'item-32',
          text: 'Téglalap kerülete: 48 cm',
          categoryId: 'geometria'
        },
        {
          id: 'item-33',
          text: 'Osztály lánytanulóinak száma arányos osztásból: 16 fő',
          categoryId: 'darab-ido'
        },
        {
          id: 'item-34',
          text: 'Két autó találkozási ideje: 1,5 óra múlva',
          categoryId: 'darab-ido'
        },
        {
          id: 'item-35',
          text: 'Péter életkora a szöveges egyenletből: 11 év',
          categoryId: 'darab-ido'
        },
        {
          id: 'item-36',
          text: 'Diofantoszi egyenlet megoldásainak száma: 4 számpár',
          categoryId: 'darab-ido'
        }
      ]
    }
  ];

  return (
    <SorterTemplate
      title="IV. Témaköri Összefoglaló Csoportosító"
      subtitle="Rendszerezd az összefüggéseket a fejezet témakörei, számítási módjai és eredményei szerint 3 szinten!"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 📂 RENDSZEREZŐ"
      themeColor="slate"
      level={level}
      currentLevel={currentLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      levels={levels}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default RatioSummarySorter;
