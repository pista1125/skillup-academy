import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface RatioReviewSorterProps {
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
    title: '1. Szint: Arányok Nagysága az 1-hez Viszonyítva',
    subtitle: 'Döntsd el a felírt arányról, hogy értéke kisebb 1-nél (a < b), pontosan 1 (a = b), vagy nagyobb 1-nél (a > b)!',
    categories: [
      {
        id: 'cat-less',
        name: 'Egynél kisebb arány (a < b)',
        description: 'Az első tag kisebb a másodiknál, a hányados értéke 0 és 1 közötti',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300'
      },
      {
        id: 'cat-equal',
        name: 'Pontosan 1 (a = b)',
        description: 'A két tag megegyezik, a hányados értéke pontosan 1',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      },
      {
        id: 'cat-greater',
        name: 'Egynél nagyobb arány (a > b)',
        description: 'Az első tag nagyobb a másodiknál, a hányados értéke nagyobb 1-nél',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
      }
    ],
    items: [
      { id: 's1-1', label: '2 : 5 (értéke: 0,4)', category: 'cat-less' },
      { id: 's1-2', label: '3 : 4 (értéke: 0,75)', category: 'cat-less' },
      { id: 's1-3', label: '7 : 9 (értéke: ≈ 0,78)', category: 'cat-less' },
      { id: 's1-4', label: '1/2 : 3/4 (értéke: 2/3)', category: 'cat-less' },
      { id: 's1-5', label: '6 : 6 (értéke: 1)', category: 'cat-equal' },
      { id: 's1-6', label: '15 : 15 (értéke: 1)', category: 'cat-equal' },
      { id: 's1-7', label: '5/6 : 5/6 (egyenlő törtek)', category: 'cat-equal' },
      { id: 's1-8', label: '1,2 : 1,2 (értéke: 1)', category: 'cat-equal' },
      { id: 's1-9', label: '5 : 2 (értéke: 2,5)', category: 'cat-greater' },
      { id: 's1-10', label: '8 : 3 (értéke: ≈ 2,67)', category: 'cat-greater' },
      { id: 's1-11', label: '9 : 4 (értéke: 2,25)', category: 'cat-greater' },
      { id: 's1-12', label: '2 1/2 : 1 (értéke: 2,5)', category: 'cat-greater' }
    ]
  },
  2: {
    title: '2. Szint: Egyszerűsített Arányértékek Csoportosítása',
    subtitle: 'Sorold be a kifejezéseket a megfelelő legegyszerűbb aránycsoportba (2 : 3, 3 : 4 vagy 4 : 5)!',
    categories: [
      {
        id: 'cat-2-3',
        name: '2 : 3 arányúak',
        description: 'Legegyszerűbb egész alakjuk 2 : 3 (értékük ≈ 0,67)',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300'
      },
      {
        id: 'cat-3-4',
        name: '3 : 4 arányúak',
        description: 'Legegyszerűbb egész alakjuk 3 : 4 (értékük 0,75)',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300'
      },
      {
        id: 'cat-4-5',
        name: '4 : 5 arányúak',
        description: 'Legegyszerűbb egész alakjuk 4 : 5 (értékük 0,80)',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300'
      }
    ],
    items: [
      { id: 's2-1', label: '26 : 39 (osztva 13-mal)', category: 'cat-2-3' },
      { id: 's2-2', label: '1/2 : 3/4 (közös nev. 4)', category: 'cat-2-3' },
      { id: 's2-3', label: '4/3 : 2 (4/3 : 6/3)', category: 'cat-2-3' },
      { id: 's2-4', label: '16 : 24 (osztva 8-cal)', category: 'cat-2-3' },
      { id: 's2-5', label: '15 : 20 (osztva 5-tel)', category: 'cat-3-4' },
      { id: 's2-6', label: '0,75 : 1 (tizedes alak)', category: 'cat-3-4' },
      { id: 's2-7', label: '6 : 8 (osztva 2-vel)', category: 'cat-3-4' },
      { id: 's2-8', label: '3/8 : 1/2 (3/8 : 4/8)', category: 'cat-3-4' },
      { id: 's2-9', label: '20 : 25 (osztva 5-tel)', category: 'cat-4-5' },
      { id: 's2-10', label: '2 : 5/2 (4/2 : 5/2)', category: 'cat-4-5' },
      { id: 's2-11', label: '12/5 : 3 (12/5 : 15/5)', category: 'cat-4-5' },
      { id: 's2-12', label: '16 : 20 (osztva 4-gyel)', category: 'cat-4-5' }
    ]
  },
  3: {
    title: '3. Szint: Gyakorlati Arányossági Típusok Felismerése',
    subtitle: 'Válogasd szét a mindennapi és geometriai kapcsolatokat: egyenes arányosság, fordított arányosság vagy nem arányos?',
    categories: [
      {
        id: 'cat-direct',
        name: 'Egyenes arányosság (y / x = c)',
        description: 'Ha az egyik többszörösére nő, a másik is ugyanannyiszorosára nő',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300'
      },
      {
        id: 'cat-inverse',
        name: 'Fordított arányosság (x · y = c)',
        description: 'Ha az egyik k-szorosára nő, a másik k-ad részére csökken',
        badgeColor: 'bg-orange-100 text-orange-900 border-orange-300 dark:bg-orange-950/60 dark:text-orange-300'
      },
      {
        id: 'cat-none',
        name: 'Nem arányos összefüggés',
        description: 'Nincs köztük állandó hányados vagy szorzat kapcsolat',
        badgeColor: 'bg-slate-100 text-slate-900 border-slate-300 dark:bg-slate-950/60 dark:text-slate-300'
      }
    ],
    items: [
      { id: 's3-1', label: 'Vásárolt alma tömege és fizetendő ára', category: 'cat-direct' },
      { id: 's3-2', label: 'Egyenletesen haladó jármű ideje és megtett útja', category: 'cat-direct' },
      { id: 's3-3', label: 'Másolópapír lapjainak száma és vastagsága', category: 'cat-direct' },
      { id: 's3-4', label: 'Külföldi valuta beváltási összege', category: 'cat-direct' },
      { id: 's3-5', label: 'Adott fal megépítéséhez szükséges kőművesek száma és ideje', category: 'cat-inverse' },
      { id: 's3-6', label: 'Adott távolság megtételéhez szükséges sebesség és menetidő', category: 'cat-inverse' },
      { id: 's3-7', label: 'Téglalap oldalai rögzített terület esetén (a · b = T)', category: 'cat-inverse' },
      { id: 's3-8', label: 'Medence feltöltéséhez nyitott egyforma csapok száma és ideje', category: 'cat-inverse' },
      { id: 's3-9', label: 'Egy ember életkora és testmagassága', category: 'cat-none' },
      { id: 's3-10', label: 'Négyzet oldala és területe (T = a²)', category: 'cat-none' },
      { id: 's3-11', label: 'Két szám különbsége és összege', category: 'cat-none' },
      { id: 's3-12', label: 'Mozi belépőjegy ára és a néző életkora', category: 'cat-none' }
    ]
  }
};

export const RatioReviewSorter: React.FC<RatioReviewSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-pct-ratio-sorter',
  topicTitle = 'Az arányosságról még egyszer'
}) => {
  const activeLevel = (currentLevel || level) as DifficultyLevel;

  return (
    <SorterTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      grade={7}
      chapterId="g7-percent-equations"
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="blue"
      title="Az arányosságról még egyszer - Csoportosító Játék"
      badge="CSOPORTOSÍTÓ"
    />
  );
};

export default RatioReviewSorter;
