import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ProportionalitySorterProps {
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
    title: '1. Szint: Egyenes vs. Fordított Arányosság',
    subtitle: 'Sorold be a képleteket és a való életbeli példákat a megfelelő típusba!',
    categories: [
      {
        id: 'cat-direct',
        name: 'Egyenes Arányosság (y = k · x)',
        description: 'Többhöz több tartozik, állandó hányados, origón átmenő egyenes',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-inverse',
        name: 'Fordított Arányosság (y = k / x)',
        description: 'Többhöz arányosan kevesebb tartozik, állandó szorzat, kétágú hiperbola',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // Egyenes arányosság
      { id: 'ps1-1', label: 'f(x) = 4x', category: 'cat-direct' },
      { id: 'ps1-2', label: 'Megvásárolt benzin mennyisége és a fizetendő összeg', category: 'cat-direct' },
      { id: 'ps1-3', label: 'f(x) = -2.5x', category: 'cat-direct' },
      { id: 'ps1-4', label: 'Állandó sebességgel haladó autó által megtett út az idő függvényében', category: 'cat-direct' },
      { id: 'ps1-5', label: 'A kör kerülete a sugár függvényében: K = 2π · r', category: 'cat-direct' },
      { id: 'ps1-6', label: 'Ledolgozott órák száma és az órabér alapján kapott fizetés', category: 'cat-direct' },
      // Fordított arányosság
      { id: 'ps1-7', label: 'g(x) = 12 / x', category: 'cat-inverse' },
      { id: 'ps1-8', label: 'Ugyanazon építkezésen dolgozó kőművesek száma és az elkészülés ideje', category: 'cat-inverse' },
      { id: 'ps1-9', label: 'Fix 24 m² területű téglalap szélessége és magassága', category: 'cat-inverse' },
      { id: 'ps1-10', label: 'g(x) = -6 / x', category: 'cat-inverse' },
      { id: 'ps1-11', label: 'Adott távolság megtételénél a jármű sebessége és a menetidő', category: 'cat-inverse' },
      { id: 'ps1-12', label: 'Egy torta szeleteinek száma és egy szelet nagysága', category: 'cat-inverse' }
    ]
  },
  2: {
    title: '2. Szint: Grafikon Síknegyedei (k előjele)',
    subtitle: 'Melyik síknegyedekben haladnak át a megadott függvények grafikonjai?',
    categories: [
      {
        id: 'cat-quad-1-3',
        name: 'I. és III. síknegyed (k > 0)',
        description: 'Pozitív bemenethez pozitív kimenet, negatívhoz negatív tartozik',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-quad-2-4',
        name: 'II. és IV. síknegyed (k < 0)',
        description: 'Pozitív bemenethez negatív kimenet, negatívhoz pozitív tartozik',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // I. és III. negyed (k > 0)
      { id: 'ps2-1', label: 'f(x) = 3x (emelkedő egyenes)', category: 'cat-quad-1-3' },
      { id: 'ps2-2', label: 'g(x) = 8 / x (pozitív paraméterű hiperbola)', category: 'cat-quad-1-3' },
      { id: 'ps2-3', label: 'P(2; 10) ponton átmenő egyenes arányosság', category: 'cat-quad-1-3' },
      { id: 'ps2-4', label: 'f(x) = 0.5x', category: 'cat-quad-1-3' },
      { id: 'ps2-5', label: 'Q(-3; -4) ponton átmenő fordított arányosság (k = 12)', category: 'cat-quad-1-3' },
      { id: 'ps2-6', label: 'g(x) = 1 / x', category: 'cat-quad-1-3' },
      // II. és IV. negyed (k < 0)
      { id: 'ps2-7', label: 'f(x) = -4x (süllyedő egyenes)', category: 'cat-quad-2-4' },
      { id: 'ps2-8', label: 'g(x) = -10 / x (negatív paraméterű hiperbola)', category: 'cat-quad-2-4' },
      { id: 'ps2-9', label: 'P(2; -6) ponton átmenő egyenes arányosság (k = -3)', category: 'cat-quad-2-4' },
      { id: 'ps2-10', label: 'f(x) = -x', category: 'cat-quad-2-4' },
      { id: 'ps2-11', label: 'Q(-2; 7) ponton átmenő fordított arányosság (k = -14)', category: 'cat-quad-2-4' },
      { id: 'ps2-12', label: 'g(x) = -1 / x', category: 'cat-quad-2-4' }
    ]
  },
  3: {
    title: '3. Szint: Állandóság Típusa',
    subtitle: 'Döntsd el, hogy mi az állandó invariáns a megadott összefüggésekben!',
    categories: [
      {
        id: 'cat-inv-ratio',
        name: 'Állandó Hányados (y / x = k)',
        description: 'Egyenes arányosság kapcsolat',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-inv-product',
        name: 'Állandó Szorzat (x · y = k)',
        description: 'Fordított arányosság kapcsolat',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-inv-neither',
        name: 'Egyik Sem (Nem Arányosság)',
        description: 'Összeg állandó (x + y = c) vagy eltolt egyenes (y = mx + b)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Hányados
      { id: 'ps3-1', label: 'y = 7x', category: 'cat-inv-ratio' },
      { id: 'ps3-2', label: 'A(2; 6), B(3; 9), C(5; 15) pontsorozat', category: 'cat-inv-ratio' },
      { id: 'ps3-3', label: 'f(x) = -3x', category: 'cat-inv-ratio' },
      { id: 'ps3-4', label: 'P(1; 4) és origón átmenő egyenes', category: 'cat-inv-ratio' },
      // Szorzat
      { id: 'ps3-5', label: 'y = 18 / x', category: 'cat-inv-product' },
      { id: 'ps3-6', label: 'A(2; 12), B(3; 8), C(4; 6) pontsorozat', category: 'cat-inv-product' },
      { id: 'ps3-7', label: 'Fix alapterületű háromszög alapja és magassága', category: 'cat-inv-product' },
      { id: 'ps3-8', label: 'y = -10 / x', category: 'cat-inv-product' },
      // Egyik sem
      { id: 'ps3-9', label: 'x + y = 20 (összegük állandó)', category: 'cat-inv-neither' },
      { id: 'ps3-10', label: 'y = 2x + 5 (eltolt lineáris, nem megy át az origón)', category: 'cat-inv-neither' },
      { id: 'ps3-11', label: 'y = x² (másodfokú összefüggés)', category: 'cat-inv-neither' },
      { id: 'ps3-12', label: 'Taxi alapdíj + kilométerdíj (y = 1000 + 400x)', category: 'cat-inv-neither' }
    ]
  }
};

export const ProportionalitySorter: React.FC<ProportionalitySorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'az-egyenes-es-forditott-aranyossag-fuggvenye',
  topicTitle = 'Az egyenes és fordított arányosság függvénye'
}) => {
  const activeLevel = (currentLevel ?? level) as DifficultyLevel;

  return (
    <SorterTemplate
      level={activeLevel}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      activityType="g9-func-aranyossag-sorter"
    />
  );
};

