import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';

interface ArithmeticGeometricSorterProps {
  onNextLevel?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
}

const sorterLevels: Record<number, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Számok csoportosítása a közepeik viszonya szerint',
    description: 'Számítsd ki vagy becsüld meg a számok számtani (A) és mértani (G) közepét, majd sorold be őket a megfelelő kategóriába!',
    badge: '1. SZINT • KÖZEPEK VISZONYA',
    categories: [
      {
        id: 'cat-equal',
        title: 'A = G (Egyenlő közepek, a = b)',
        color: 'emerald',
        description: 'A két szám egyenlő, így számtani és mértani közepük pontosan megegyezik.'
      },
      {
        id: 'cat-small-diff',
        title: 'A > G kis különbséggel (0 < A - G ≤ 5)',
        color: 'teal',
        description: 'A két szám közel van egymáshoz, így a számtani és mértani közép alig tér el.'
      },
      {
        id: 'cat-large-diff',
        title: 'A > G nagy különbséggel (A - G > 5)',
        color: 'indigo',
        description: 'A két szám távol van egymástól, így a számtani közép jelentősen meghaladja a mértani közepet.'
      }
    ],
    items: [
      { id: 'ags1-1', text: '50 és 50', categoryId: 'cat-equal' },
      { id: 'ags1-2', text: '200 és 200', categoryId: 'cat-equal' },
      { id: 'ags1-3', text: '16 és 25', categoryId: 'cat-small-diff' },
      { id: 'ags1-4', text: '8 és 18', categoryId: 'cat-small-diff' },
      { id: 'ags1-5', text: '2 és 8', categoryId: 'cat-small-diff' },
      { id: 'ags1-6', text: '18 és 32', categoryId: 'cat-small-diff' },
      { id: 'ags1-7', text: '8 és 98', categoryId: 'cat-large-diff' },
      { id: 'ags1-8', text: '100 és 400', categoryId: 'cat-large-diff' },
      { id: 'ags1-9', text: '1 és 100', categoryId: 'cat-large-diff' },
      { id: 'ags1-10', text: '2 és 50', categoryId: 'cat-large-diff' }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Igaz vagy Tévhit az AM-GM egyenlőtlenségről?',
    description: 'Döntsd el minden állításról, hogy matematikailag szigorúan igaz tétel, vagy elterjedt tévhit!',
    badge: '2. SZINT • IGAZ VAGY TÉVHIT',
    categories: [
      {
        id: 'cat-true',
        title: 'Matematikailag Igaz',
        color: 'emerald',
        description: 'Bizonyított tétel vagy helytálló tulajdonság.'
      },
      {
        id: 'cat-false',
        title: 'Tévhit / Matematikailag Hibás',
        color: 'rose',
        description: 'Gyakori hiba, téves feltételezés vagy hamis állítás.'
      }
    ],
    items: [
      {
        id: 'ags2-1',
        text: 'Két pozitív szám számtani közepe mindig nagyobb vagy egyenlő a mértani közepüknél.',
        categoryId: 'cat-true'
      },
      {
        id: 'ags2-2',
        text: 'A számtani és mértani közép egyenlősége akkor és csak akkor áll fenn, ha a = b.',
        categoryId: 'cat-true'
      },
      {
        id: 'ags2-3',
        text: 'Azonos kerületű téglalapok közül a négyzet területe a legnagyobb.',
        categoryId: 'cat-true'
      },
      {
        id: 'ags2-4',
        text: 'Minden pozitív a számra teljesül, hogy a + 1/a ≥ 2.',
        categoryId: 'cat-true'
      },
      {
        id: 'ags2-5',
        text: 'A Thálész-félkörben az átmérőre állított magasság mindig legfeljebb akkora, mint a sugár.',
        categoryId: 'cat-true'
      },
      {
        id: 'ags2-6',
        text: 'Két tetszőleges valós szám mértani közepe mindig pozitív, függetlenül az előjelektől.',
        categoryId: 'cat-false'
      },
      {
        id: 'ags2-7',
        text: 'Ha két pozitív szám számtani közepe 10, akkor a szorzatuk tetszőlegesen nagy lehet.',
        categoryId: 'cat-false'
      },
      {
        id: 'ags2-8',
        text: 'Létezik olyan pozitív a valós szám, amelyre a + 1/a = 1,5.',
        categoryId: 'cat-false'
      },
      {
        id: 'ags2-9',
        text: 'Két hónap alatt a fix forintnövekedés és a fix százalékos szorzás közbenső értéke mindig egyenlő.',
        categoryId: 'cat-false'
      },
      {
        id: 'ags2-10',
        text: 'A számtani közép elnevezés a mértani arányokból ered.',
        categoryId: 'cat-false'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Szélsőérték-feladatok és optimalizálás célja',
    description: 'Csoportosítsd a problémákat aszerint, hogy maximális szorzatot, minimális összeget keresnek, vagy nem szélsőérték jellegűek!',
    badge: '3. SZINT • SZÉLSŐÉRTÉK ÉS OPTIMALIZÁLÁS',
    categories: [
      {
        id: 'cat-max-area',
        title: 'Maximális terület / szorzat elérése',
        color: 'emerald',
        description: 'Állandó összeg (pl. kerület) mellett a maximális szorzatot keressük (négyzet).'
      },
      {
        id: 'cat-min-perimeter',
        title: 'Minimális kerület / összeg elérése',
        color: 'blue',
        description: 'Állandó szorzat (pl. terület) mellett a minimális összeget keressük (négyzet).'
      },
      {
        id: 'cat-neutral',
        title: 'Középérték meghatározás / Nem szélsőérték',
        color: 'purple',
        description: 'Középértékek számítása, aránypárok vagy gazdasági összehasonlítások.'
      }
    ],
    items: [
      {
        id: 'ags3-1',
        text: 'Adott 52 m kerítéssel maximális területű téglalap alakú telek bekerítése',
        categoryId: 'cat-max-area'
      },
      {
        id: 'ags3-2',
        text: 'Adott 40 cm kerületű téglalapok közül a legnagyobb területű kiválasztása',
        categoryId: 'cat-max-area'
      },
      {
        id: 'ags3-3',
        text: 'Két pozitív szám összege 24; mikor maximális a szorzatuk?',
        categoryId: 'cat-max-area'
      },
      {
        id: 'ags3-4',
        text: 'Adott 100 m² területű telekhez minimális kerítéshossz meghatározása',
        categoryId: 'cat-min-perimeter'
      },
      {
        id: 'ags3-5',
        text: 'Két pozitív szám szorzata 64; mikor minimális az összegük?',
        categoryId: 'cat-min-perimeter'
      },
      {
        id: 'ags3-6',
        text: 'Adott 36 cm² területű téglalapok közül a legkisebb kerületű felkutatása',
        categoryId: 'cat-min-perimeter'
      },
      {
        id: 'ags3-7',
        text: 'Egy pozitív szám és reciprokának legkisebb lehetséges összege (a + 1/a min)',
        categoryId: 'cat-min-perimeter'
      },
      {
        id: 'ags3-8',
        text: 'Antal és Benő januári (150k) és márciusi (216k) béréből a februári bér kiszámítása',
        categoryId: 'cat-neutral'
      },
      {
        id: 'ags3-9',
        text: 'Egy téglalap oldalainak (27 cm és 12 cm) számtani és mértani közepe',
        categoryId: 'cat-neutral'
      },
      {
        id: 'ags3-10',
        text: 'Két év tőkenövekedési szorzója (1,21 és 1,69) után az átlagos éves szorzó megadása',
        categoryId: 'cat-neutral'
      }
    ]
  }
};

export const ArithmeticGeometricSorter: React.FC<ArithmeticGeometricSorterProps> = (props) => {
  return (
    <SorterTemplate
      topicTitle="Számtani és mértani közép csoportosító"
      topicSubtitle="Válogasd szét a számpárokat, döntsd el az igaz állításokat és ismerd fel a szélsőérték-helyzeteket!"
      levels={sorterLevels}
      themeColor="teal"
      topicId="g10-stat-szamtani-mertani-kozep-sorter"
      {...props}
    />
  );
};

export default ArithmeticGeometricSorter;

