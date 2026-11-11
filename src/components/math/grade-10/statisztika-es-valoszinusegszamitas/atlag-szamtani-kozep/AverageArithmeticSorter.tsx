import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  BalanceMeanSvg,
  DeviationLineSvg,
  WeightedMeanBlocksSvg,
  OutlierImpactSvg
} from './AverageArithmeticFigures';

interface AverageArithmeticSorterProps {
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
    title: 'Adatsorok átlagának nagyságrendi csoportosítása',
    subtitle: 'Számold ki fejben vagy papíron az adatsorok átlagát, és sorold be őket a megfelelő kategóriába!',
    categories: [
      {
        id: 'cat-less10',
        name: 'Átlag < 10',
        description: 'A számtani közép kisebb 10-nél',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-equal10',
        name: 'Átlag = 10',
        description: 'A számtani közép pontosan 10',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-more10',
        name: 'Átlag > 10',
        description: 'A számtani közép nagyobb 10-nél',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'aas1-1', content: 'Számok: 4, 6, 8', categoryId: 'cat-less10' },
      { id: 'aas1-2', content: 'Számok: 1, 2, 3, 4, 5', categoryId: 'cat-less10' },
      { id: 'aas1-3', content: 'Számok: 7, 8, 9, 10', categoryId: 'cat-less10' },
      { id: 'aas1-4', content: 'Számok: 5, 5, 5, 5, 10', categoryId: 'cat-less10' },

      { id: 'aas1-5', content: 'Számok: 5, 10, 15', categoryId: 'cat-equal10', figure: <BalanceMeanSvg size={54} /> },
      { id: 'aas1-6', content: 'Számok: 8, 9, 10, 11, 12', categoryId: 'cat-equal10' },
      { id: 'aas1-7', content: 'Számok: 10, 10, 10, 10', categoryId: 'cat-equal10' },
      { id: 'aas1-8', content: 'Számok: 0 és 20', categoryId: 'cat-equal10' },

      { id: 'aas1-9', content: 'Számok: 11, 12, 13', categoryId: 'cat-more10' },
      { id: 'aas1-10', content: 'Számok: 8, 9, 25', categoryId: 'cat-more10', figure: <OutlierImpactSvg size={54} /> },
      { id: 'aas1-11', content: 'Számok: 10, 10, 10, 30', categoryId: 'cat-more10' },
      { id: 'aas1-12', content: 'Számok: 15 és 20', categoryId: 'cat-more10' }
    ]
  },
  2: {
    title: 'Igaz állítások vs. Tévhitek az átlagról',
    subtitle: 'Válogasd szét a matematikai tényeket és a gyakori félreértéseket!',
    categories: [
      {
        id: 'cat-truth',
        name: 'Matematikai Igazság',
        description: 'Tétel vagy mindig érvényes tulajdonság',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-myth',
        name: 'Tévhit / Csapda',
        description: 'Nem igaz, vagy csak speciális esetben teljesül',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'aas2-1', content: 'Az átlagtól vett előjeles eltérések összege mindig nulla: Σ(xᵢ - x̄) = 0', categoryId: 'cat-truth', figure: <DeviationLineSvg size={54} /> },
      { id: 'aas2-2', content: 'Ha minden adathoz hozzáadunk 5-öt, az új átlag is pontosan 5-tel nő', categoryId: 'cat-truth' },
      { id: 'aas2-3', content: 'Ha minden adatot megkétszerezünk, az új átlag is pontosan megkétszereződik', categoryId: 'cat-truth' },
      { id: 'aas2-4', content: 'Az átlag nem feltétlenül szerepel a kiinduló adathalmaz elemei között', categoryId: 'cat-truth' },
      { id: 'aas2-5', content: 'Egyetlen szélsőséges adat (outlier) drasztikusan eltolhatja az átlagot', categoryId: 'cat-truth', figure: <OutlierImpactSvg size={54} /> },
      { id: 'aas2-6', content: 'Ha n adat átlaga x̄, akkor az adatok összege mindig n · x̄', categoryId: 'cat-truth' },

      { id: 'aas2-7', content: 'Az átlag mindig szerepel a minta elemei között', categoryId: 'cat-myth' },
      { id: 'aas2-8', content: 'Csoportok összevonásakor mindig vehető a csoportátlagok számtani közepe', categoryId: 'cat-myth', figure: <WeightedMeanBlocksSvg size={54} /> },
      { id: 'aas2-9', content: 'Ha az átlag 4, akkor a leggyakoribb érték (módusz) is kötelezően a 4', categoryId: 'cat-myth' },
      { id: 'aas2-10', content: 'Az átlag fölött és az átlag alatt mindig pontosan ugyanannyi adat áll', categoryId: 'cat-myth' },
      { id: 'aas2-11', content: 'Ha az adatsor átlaga nem változik, akkor maguk az adatok sem változhattak meg', categoryId: 'cat-myth' },
      { id: 'aas2-12', content: 'Két azonos átlagú adatsor terjedelme és szóródása is mindig megegyezik', categoryId: 'cat-myth' }
    ]
  },
  3: {
    title: 'Adatmódosítások hatása az átlagra',
    subtitle: 'Adott egy adatsor, melynek átlaga x̄ = 20. Hogyan változik az átlag az alábbi lépések után?',
    categories: [
      {
        id: 'cat-inc',
        name: 'Az átlag NŐ',
        description: 'Az új átlag > 20 lesz',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-dec',
        name: 'Az átlag CSÖKKEN',
        description: 'Az új átlag < 20 lesz',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-same',
        name: 'Az átlag NEM VÁLTOZIK',
        description: 'Az új átlag pontosan 20 marad',
        badgeColor: 'bg-slate-100 text-slate-900 border-slate-300'
      }
    ],
    items: [
      { id: 'aas3-1', content: 'Hozzáveszünk a számsokasághoz egy új adatot: 35', categoryId: 'cat-inc' },
      { id: 'aas3-2', content: 'Elhagyjuk a mintából a legkisebb adatot: 5', categoryId: 'cat-inc' },
      { id: 'aas3-3', content: 'Minden meglévő adatot 4-gyel növelünk', categoryId: 'cat-inc' },
      { id: 'aas3-4', content: 'Minden meglévő adatot megszorzunk 1,2-del', categoryId: 'cat-inc' },

      { id: 'aas3-5', content: 'Hozzáveszünk a számsokasághoz egy új adatot: 12', categoryId: 'cat-dec' },
      { id: 'aas3-6', content: 'Elhagyjuk a mintából a legnagyobb adatot: 45', categoryId: 'cat-dec' },
      { id: 'aas3-7', content: 'Minden meglévő adatból kivonunk 3-at', categoryId: 'cat-dec' },
      { id: 'aas3-8', content: 'Minden meglévő adatot megszorzunk 0,9-del', categoryId: 'cat-dec' },

      { id: 'aas3-9', content: 'Hozzáveszünk a mintához egyetlen új adatot, ami pontosan 20', categoryId: 'cat-same', figure: <BalanceMeanSvg size={54} /> },
      { id: 'aas3-10', content: 'Két új adatot veszünk hozzá egyszerre: 15 és 25', categoryId: 'cat-same' },
      { id: 'aas3-11', content: 'Elhagyunk egy meglévő 20 értékű adatot a számsokaságból', categoryId: 'cat-same' },
      { id: 'aas3-12', content: 'Az egyik adatot megnöveljük 6-tal, egy másikat csökkentünk 6-tal', categoryId: 'cat-same', figure: <DeviationLineSvg size={54} /> }
    ]
  }
};

export const AverageArithmeticSorter: React.FC<AverageArithmeticSorterProps> = (props) => {
  return (
    <SorterTemplate
      levels={sorterLevels}
      title="Átlag és számtani közép Csoportosító"
      subtitle="Rendszerezd az adatsorokat, állításokat és transzformációkat a megfelelő dobozokba!"
      topicId={props.topicId || 'g10-stat-atlag-szamtani-kozep-sorter'}
      topicTitle={props.topicTitle || 'Átlag, számtani közép'}
      {...props}
    />
  );
};

export default AverageArithmeticSorter;

