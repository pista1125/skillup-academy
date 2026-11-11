import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  MeanMedianModeSalarySvg,
  MedianEvenOddSvg,
  RangeAndOutlierSvg
} from './SummaryStatsFigures';

interface SummaryStatsSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: 'Statisztikai mutatók nagyságrendi csoportosítása',
    subtitle: 'Számítsd ki fejben az adatsorok mediánját, móduszát, átlagát vagy terjedelmét, és sorold be a megfelelő kategóriába!',
    categories: [
      {
        id: 'cat-less10',
        name: 'Érték < 10',
        description: 'A kiszámított mutató kisebb 10-nél',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-equal10',
        name: 'Érték = 10',
        description: 'A kiszámított mutató pontosan 10',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-more10',
        name: 'Érték > 10',
        description: 'A kiszámított mutató nagyobb 10-nél',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'sss1-1', content: 'A {2, 5, 8, 14, 16} adatsor mediánja', categoryId: 'cat-less10' },
      { id: 'sss1-2', content: 'A {4, 4, 6, 7, 9} adatsor módusza', categoryId: 'cat-less10' },
      { id: 'sss1-3', content: 'A {12, 14, 15, 19} adatsor terjedelme', categoryId: 'cat-less10' },
      { id: 'sss1-4', content: 'A {3, 6, 9, 12} adatsor számtani közepe', categoryId: 'cat-less10' },

      { id: 'sss1-5', content: 'A {6, 8, 10, 12, 14} adatsor mediánja', categoryId: 'cat-equal10', figure: <MedianEvenOddSvg size={54} /> },
      { id: 'sss1-6', content: 'A {10, 10, 10, 20, 30} adatsor módusza', categoryId: 'cat-equal10' },
      { id: 'sss1-7', content: 'A {5, 8, 12, 15} adatsor terjedelme', categoryId: 'cat-equal10' },
      { id: 'sss1-8', content: 'A {2, 6, 14, 18} adatsor számtani közepe', categoryId: 'cat-equal10' },

      { id: 'sss1-9', content: 'A {4, 8, 15, 20, 25} adatsor mediánja', categoryId: 'cat-more10' },
      { id: 'sss1-10', content: 'A {2, 12, 12, 12, 16} adatsor módusza', categoryId: 'cat-more10' },
      { id: 'sss1-11', content: 'A {1, 5, 10, 25} adatsor terjedelme', categoryId: 'cat-more10', figure: <RangeAndOutlierSvg size={54} /> },
      { id: 'sss1-12', content: 'A {8, 12, 14, 26} adatsor számtani közepe', categoryId: 'cat-more10' }
    ]
  },
  2: {
    title: 'Matematikai Igazság vs. Tévhit a mutatókról',
    subtitle: 'Válogasd szét a helytálló matematikai szabályokat és a gyakori tévedéseket!',
    categories: [
      {
        id: 'cat-truth',
        name: 'Matematikai Igazság',
        description: 'Tétel vagy mindig érvényes statisztikai szabály',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-myth',
        name: 'Tévhit / Csapda',
        description: 'Hibás feltételezés vagy hamis állítás',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'sss2-1', content: 'A medián robusztus mutató: egy kiugró szélsőérték nem rántja el a helyét', categoryId: 'cat-truth', figure: <RangeAndOutlierSvg size={54} /> },
      { id: 'sss2-2', content: 'Páratlan elemszám esetén a medián garantáltan a minta egyik konkrét eleme', categoryId: 'cat-truth' },
      { id: 'sss2-3', content: 'Egy mintának lehet több módusza is (pl. bimodális), vagy akár egy sem', categoryId: 'cat-truth' },
      { id: 'sss2-4', content: 'Ha minden adatot megnövelünk 5-tel, a terjedelem nem változik (R változatlan)', categoryId: 'cat-truth' },
      { id: 'sss2-5', content: 'Ha minden adatot megszorzunk 2-vel, az átlag, medián, módusz és terjedelem is megduplázódik', categoryId: 'cat-truth' },
      { id: 'sss2-6', content: 'Szimmetrikus eloszlású adatoknál az átlag és a medián egybeesik: x̄ = Me', categoryId: 'cat-truth' },

      { id: 'sss2-7', content: 'Az átlag és a medián mindig kötelezően a minta valamelyik kiinduló eleme', categoryId: 'cat-myth' },
      { id: 'sss2-8', content: 'A terjedelem (R) robusztus mutató, egyetlen extrém adat sem változtatja meg', categoryId: 'cat-myth' },
      { id: 'sss2-9', content: 'Páros elemszám esetén a medián mindig megegyezik a legkisebb adattal', categoryId: 'cat-myth', figure: <MedianEvenOddSvg size={54} /> },
      { id: 'sss2-10', content: 'Ha az adathalmaz módusza 5, akkor az átlagnak is kötelezően 5-nek kell lennie', categoryId: 'cat-myth' },
      { id: 'sss2-11', content: 'Az átlagtól vett előjeles eltérések összege mindig pozitív szám', categoryId: 'cat-myth' },
      { id: 'sss2-12', content: 'A rendezetlen adatsor középső eleme közvetlenül megadja a minta mediánját', categoryId: 'cat-myth' }
    ]
  },
  3: {
    title: 'Statisztikai mutatók egyedi tulajdonságai',
    subtitle: 'Melyik középértékre igazak az alábbi megállapítások?',
    categories: [
      {
        id: 'cat-mean',
        name: 'Számtani közép (Átlag)',
        description: 'Minden adat értéke beleszámít, érzékeny a szélsőértékekre',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-median',
        name: 'Medián (Felezőpont)',
        description: 'A rendezett sor közepe, robusztus a kiugró értékekre',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-mode',
        name: 'Módusz (Leggyakoribb)',
        description: 'A legtöbbször előforduló érték, kategoriális adatokra is létezik',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      { id: 'sss3-1', content: 'Minden egyes adat konkrét számszerű értéke közvetlenül beleszámít az összegbe', categoryId: 'cat-mean' },
      { id: 'sss3-2', content: 'Egyetlen extrém magas érték (outlier) drasztikusan feljebb húzza', categoryId: 'cat-mean', figure: <MeanMedianModeSalarySvg size={54} /> },
      { id: 'sss3-3', content: 'Az ettől vett előjeles eltérések összege szigorúan nulla: Σ(xᵢ - x̄) = 0', categoryId: 'cat-mean' },
      { id: 'sss3-4', content: 'A fizikai mérleg forgáspontjának, súlypontjának felel meg', categoryId: 'cat-mean' },

      { id: 'sss3-5', content: 'A nagyság szerint rendezett adatsor pontosan felező eleme (50%-50%)', categoryId: 'cat-median', figure: <MedianEvenOddSvg size={54} /> },
      { id: 'sss3-6', content: 'Robusztus mutató: a legnagyobb adat tízszeresére növelése sem mozdítja el', categoryId: 'cat-median' },
      { id: 'sss3-7', content: 'Páros elemszám esetén a két középső adat számtani közepeként számoljuk', categoryId: 'cat-median' },
      { id: 'sss3-8', content: 'Ferde eloszlású béreknél sokkal jobban tükrözi a tipikus fizetést, mint az átlag', categoryId: 'cat-median' },

      { id: 'sss3-9', content: 'A mintában a legtöbbször előforduló, legnagyobb gyakoriságú érték', categoryId: 'cat-mode' },
      { id: 'sss3-10', content: 'Nem számszerű (szöveges/kategoriális) adatoknál is meghatározható (pl. kedvenc szín)', categoryId: 'cat-mode' },
      { id: 'sss3-11', content: 'Egy adatsor lehet bimodális is, ha két érték holtversenyben a leggyakoribb', categoryId: 'cat-mode' },
      { id: 'sss3-12', content: 'Oszlopdiagramon vagy hisztogramon a legmagasabb oszlop helyét jelöli', categoryId: 'cat-mode' }
    ]
  }
};

export const SummaryStatsSorter: React.FC<SummaryStatsSorterProps> = (props) => {
  return (
    <SorterTemplate
      topicId={props.topicId || 'g10-stat-statisztikai-jellemzok-sorter'}
      topicTitle={props.topicTitle || 'Számsokaságok statisztikai jellemzői'}
      levels={sorterLevels}
      {...props}
    />
  );
};

export default SummaryStatsSorter;
