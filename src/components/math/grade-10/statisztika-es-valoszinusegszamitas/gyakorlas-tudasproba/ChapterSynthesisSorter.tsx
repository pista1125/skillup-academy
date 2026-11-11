import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';

interface ChapterSynthesisSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  level?: number;
  currentLevel?: number;
  onSelectLevel?: (level: number) => void;
  [key: string]: any;
}

const sorterLevels: Record<number, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Statisztikai és valószínűségi mutatók rendszerezése',
    instruction: 'Csoportosítsd a fogalmakat és mértékeket aszerint, hogy helyzetmutatók, szóródási mutatók vagy valószínűségi jellemzők!',
    categories: [
      {
        id: 'cat-loc',
        name: 'Helyzetmutatók (Középértékek)',
        description: 'Az adathalmaz központi elhelyezkedését leíró mutatók',
        color: 'blue'
      },
      {
        id: 'cat-disp',
        name: 'Szóródási mutatók (Variabilitás)',
        description: 'Az adatok egymástól és az átlagtól való távolságát, szóródását mérő jellemzők',
        color: 'amber'
      },
      {
        id: 'cat-prob',
        name: 'Valószínűségi mutatók (Esélyek)',
        description: 'Véletlen kísérletek kimeneteleinek esélyét leíró mérőszámok',
        color: 'emerald'
      }
    ],
    items: [
      {
        id: 'css1-1',
        content: 'Számtani közép (egyszerű átlag: x̄)',
        categoryId: 'cat-loc',
        explanation: 'Az értékek összege osztva a darabszámmal: alapvető helyzetmutató.'
      },
      {
        id: 'css1-2',
        content: 'Medián (a rendezett adatsor középső eleme)',
        categoryId: 'cat-loc',
        explanation: 'A nagyság szerint rendezett sokaság felezőértéke, robusztus helyzetmutató.'
      },
      {
        id: 'css1-3',
        content: 'Módusz (a leggyakoribb adatérték)',
        categoryId: 'cat-loc',
        explanation: 'A legtöbbször előforduló érték az adathalmazban: tipikus helyzetmutató.'
      },
      {
        id: 'css1-4',
        content: 'Terjedelem (a maximum és minimum különbsége)',
        categoryId: 'cat-disp',
        explanation: 'A legnagyobb és legkisebb adat távolsága (R = x_max - x_min), alapvető szóródási mutató.'
      },
      {
        id: 'css1-5',
        content: 'Átlagtól vett négyzetes eltérések átlaga (szórásnégyzet)',
        categoryId: 'cat-disp',
        explanation: 'A variancia vagy szórásnégyzet (s²), a szóródás elméleti alapmutatója.'
      },
      {
        id: 'css1-6',
        content: 'Szórás (az átlagtól való eltérések négyzetes középértéke)',
        categoryId: 'cat-disp',
        explanation: 'A szórásnégyzet négyzetgyöke: az adatok átlag körüli szóródásának legfontosabb mutatója.'
      },
      {
        id: 'css1-7',
        content: 'Klasszikus valószínűség (kedvező esetek / összes eset)',
        categoryId: 'cat-prob',
        explanation: 'A Laplace-modell szerinti k/n elméleti valószínűség.'
      },
      {
        id: 'css1-8',
        content: 'Relatív gyakoriság (kísérleti gyakoriság / kísérletszám)',
        categoryId: 'cat-prob',
        explanation: 'A véletlen kísérlet során mért empirikus arány (g = k/n).'
      },
      {
        id: 'css1-9',
        content: 'Komplementer esemény valószínűsége: 1 – P(A)',
        categoryId: 'cat-prob',
        explanation: 'Az esemény be nem következésének valószínűségi mértéke.'
      },
      {
        id: 'css1-10',
        content: 'Súlyozott számtani közép (gyakoriságokkal súlyozott átlag)',
        categoryId: 'cat-loc',
        explanation: 'A csoportátlagok vagy osztályközepek súlyozott középértéke: helyzetmutató.'
      },
      {
        id: 'css1-11',
        content: 'Interkvartilis terjedelem (felső és alsó kvartilis különbsége)',
        categoryId: 'cat-disp',
        explanation: 'A középső 50% szélessége (Q3 - Q1), szóródási mutató.'
      },
      {
        id: 'css1-12',
        content: 'Biztos esemény valószínűsége (P = 1)',
        categoryId: 'cat-prob',
        explanation: 'A kísérlet során garantáltan bekövetkező esemény valószínűségi értéke.'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Matematikai összefüggés vagy vizsgacsapda?',
    instruction: 'Döntsd el a fejezet egészét átfogó állításokról, hogy igaz matematikai tételek vagy csapdák!',
    categories: [
      {
        id: 'cat-true',
        name: 'Matematikai Igazság',
        description: 'Érvényes statisztikai tétel vagy valószínűségi szabály',
        color: 'emerald'
      },
      {
        id: 'cat-false',
        name: 'Tévhit / Csapda',
        description: 'Gyakori vizsgahiba vagy téves intuíció',
        color: 'rose'
      }
    ],
    items: [
      {
        id: 'css2-1',
        content: 'Minden adathoz hozzáadva egy állandót, az átlag nő vele, de a szórás változatlan marad',
        categoryId: 'cat-true',
        explanation: 'Igaz: az eltolás az átlagot eltolja, de az adatok egymástól mért távolságait nem módosítja.'
      },
      {
        id: 'css2-2',
        content: 'A medián erősen érzékeny a kiugró hibás adatokra, míg az átlag védve van tőlük',
        categoryId: 'cat-false',
        explanation: 'Tévhit: éppen fordítva, a medián robusztus (nem változik a szélsőségektől), az átlag pedig érzékeny.'
      },
      {
        id: 'css2-3',
        content: 'Két pozitív szám mértani közepe soha nem lehet nagyobb a számtani közepüknél',
        categoryId: 'cat-true',
        explanation: 'Igaz: a számtani és mértani közép közötti egyenlőtlenség szerint A ≥ G.'
      },
      {
        id: 'css2-4',
        content: 'Ha egy érmével ötször fejet dobtunk, a 6. dobásra már nagyobb eséllyel jön írás',
        categoryId: 'cat-false',
        explanation: 'Tévhit: a dobások egymástól függetlenek, a következő dobás esélye ugyanúgy 50%.'
      },
      {
        id: 'css2-5',
        content: 'Az adatok átlagtól vett előjeles eltéréseinek összege mindig pontosan 0',
        categoryId: 'cat-true',
        explanation: 'Igaz: a számtani közép fundamentális tulajdonsága, hogy Σ(xᵢ – x̄) = 0.'
      },
      {
        id: 'css2-6',
        content: 'Csoportátlagokat mindig egyszerűen átlagolni lehet a csoportok létszámától függetlenül',
        categoryId: 'cat-false',
        explanation: 'Tévhit: különböző létszámú csoportok esetén súlyozott átlagot kell számítani.'
      },
      {
        id: 'css2-7',
        content: 'Nagy kísérletszám esetén a relatív gyakoriság az elméleti valószínűség körül stabilizálódik',
        categoryId: 'cat-true',
        explanation: 'Igaz: ez a nagy számok empirikus törvénye (a tapasztalati stabilitás elve).'
      },
      {
        id: 'css2-8',
        content: 'A logikai szita szerint két tetszőleges esemény uniója mindig egyszerűen P(A) + P(B)',
        categoryId: 'cat-false',
        explanation: 'Tévhit: csak egymást kizáró eseményeknél adódnak össze; egyébként le kell vonni a metszetet.'
      },
      {
        id: 'css2-9',
        content: 'Egy adathalmaznak lehet több módusza is, vagy akár egyetlen módusza sincs',
        categoryId: 'cat-true',
        explanation: 'Igaz: többcsúcsú (pl. bimodális) eloszlásnál több van, egyenletes gyakoriságnál nincs kitüntetett módusz.'
      },
      {
        id: 'css2-10',
        content: 'A valószínűség értéke bármilyen valós szám lehet, ha a feladat szövege megengedi',
        categoryId: 'cat-false',
        explanation: 'Tévhit: a valószínűség definíció szerint szigorúan 0 és 1 közé (0% és 100% közé) esik.'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Számított értékek nagyságrendje',
    instruction: 'Számítsd ki a reprezentatív statisztikai és valószínűségi feladatok végeredményét, és válogasd be a megfelelő nagyságrendbe!',
    categories: [
      {
        id: 'cat-small',
        name: 'Érték < 10',
        description: 'A számított mutató értéke 10-nél kisebb',
        color: 'blue'
      },
      {
        id: 'cat-med',
        name: '10 ≤ Érték ≤ 30',
        description: 'A számított mutató értéke 10 és 30 közé esik',
        color: 'emerald'
      },
      {
        id: 'cat-large',
        name: 'Érték > 30',
        description: 'A számított mutató értéke meghaladja a 30-at',
        color: 'amber'
      }
    ],
    items: [
      {
        id: 'css3-1',
        content: '30 fős osztály érettségi jegyeinek átlaga (összesen 96 pont)',
        categoryId: 'cat-small',
        explanation: '96 / 30 = 3,20 (< 10).'
      },
      {
        id: 'css3-2',
        content: '30 fős osztály jegyeinek módusza és mediánja',
        categoryId: 'cat-small',
        explanation: 'A leggyakoribb jegy 3, a rendezett sor közepe 3 (< 10).'
      },
      {
        id: 'css3-3',
        content: 'Két szám (számtani közép 15, mértani közép 12) kisebbik száma',
        categoryId: 'cat-small',
        explanation: 'A két szám 6 és 24; a kisebbik a 6 (< 10).'
      },
      {
        id: 'css3-4',
        content: 'Kamarakórus tagjainak létszáma (ha a korelnök nélkül az átlag 43-ról 42-re esik)',
        categoryId: 'cat-med',
        explanation: '43n - 54 = 42(n - 1) megoldása: n = 12 fő (10 és 30 között).'
      },
      {
        id: 'css3-5',
        content: '15 szám átlaga 4,2; a 16. szám hozzáadásával az átlag 5. A hozzáadott szám:',
        categoryId: 'cat-med',
        explanation: '16 · 5 - 15 · 4,2 = 80 - 63 = 17 (10 és 30 között).'
      },
      {
        id: 'css3-6',
        content: 'Két szám (számtani közép 15, mértani közép 12) nagyobbik száma',
        categoryId: 'cat-med',
        explanation: 'A két szám 6 és 24; a nagyobbik a 24 (10 és 30 között).'
      },
      {
        id: 'css3-7',
        content: 'A kamarakórus korelnökének életkora',
        categoryId: 'cat-large',
        explanation: 'A korelnök 54 éves (> 30).'
      },
      {
        id: 'css3-8',
        content: 'A 10, 20, 30, 40, 50, 60 számok átlaga',
        categoryId: 'cat-large',
        explanation: '210 / 6 = 35 (> 30).'
      },
      {
        id: 'css3-9',
        content: 'Egy szabályos dobókocka oldalainak összege',
        categoryId: 'cat-med',
        explanation: '1 + 2 + 3 + 4 + 5 + 6 = 21 (10 és 30 között).'
      },
      {
        id: 'css3-10',
        content: 'Egy kockával dobva páros szám esélye százalékban kifejezve',
        categoryId: 'cat-large',
        explanation: '3 / 6 = 50% (> 30).'
      },
      {
        id: 'css3-11',
        content: 'A 2, 4, 6 számok terjedelme',
        categoryId: 'cat-small',
        explanation: '6 - 2 = 4 (< 10).'
      },
      {
        id: 'css3-12',
        content: 'Két szám (9 és 16) mértani közepe',
        categoryId: 'cat-med',
        explanation: '√(9 · 16) = √144 = 12 (10 és 30 között).'
      }
    ]
  }
};

export const ChapterSynthesisSorter: React.FC<ChapterSynthesisSorterProps> = (props) => {
  const { onBack, onSwitchToTheory, onSwitchToQuiz, ...restProps } = props;

  return (
    <SorterTemplate
      topicTitle="Statisztika és Valószínűségszámítás"
      subtopicTitle="Fejezeti összefoglalás és tudáspróba"
      badgeText="FEJEZETI SZINTÉZIS CSOPORTOSÍTÓ"
      levels={sorterLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      {...restProps}
    />
  );
};

export default ChapterSynthesisSorter;
