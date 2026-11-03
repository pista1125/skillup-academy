import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FunctionConceptSorterProps {
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
    title: '1. Szint: Függvény vs. Nem Függvény Hozzárendelések',
    subtitle: 'Döntsd el a hozzárendelésekről és alakzatokról, hogy függvénynek minősülnek-e!',
    categories: [
      {
        id: 'cat-func',
        name: 'Függvény (Egyértelmű)',
        description: 'Minden bemenethez pontosan egy kimenet tartozik',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-not-func',
        name: 'NEM Függvény (Többértékű)',
        description: 'Egy bemenethez több kimenet is tartozik',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Függvény
      { id: 'fs1-1', label: 'Minden emberhez hozzárendeljük a biológiai édesanyját', category: 'cat-func' },
      { id: 'fs1-2', label: 'Parabola grafikonja (y = x² - 4)', category: 'cat-func' },
      { id: 'fs1-3', label: 'Képlet: f(x) = 3x - 5', category: 'cat-func' },
      { id: 'fs1-4', label: 'Minden autóhoz a saját rendszámát rendeljük', category: 'cat-func' },
      { id: 'fs1-5', label: 'Konstans vízszintes egyenes (y = 4)', category: 'cat-func' },
      { id: 'fs1-6', label: 'Minden valós számhoz a köbét rendeljük', category: 'cat-func' },
      // Nem függvény
      { id: 'fs1-7', label: 'Minden édesanyához hozzárendeljük a gyermekeit', category: 'cat-not-func' },
      { id: 'fs1-8', label: 'Kör vonala a koordinátasíkon (x² + y² = 25)', category: 'cat-not-func' },
      { id: 'fs1-9', label: 'Függőleges egyenes (x = 3)', category: 'cat-not-func' },
      { id: 'fs1-10', label: 'Fekvő parabola, ahol egy x-hez két y tartozik', category: 'cat-not-func' },
      { id: 'fs1-11', label: 'Pozitív számhoz a két négyzetgyökét (±√x) rendeljük', category: 'cat-not-func' },
      { id: 'fs1-12', label: 'Minden diákhoz hozzárendeljük a kedvenc zeneszámait', category: 'cat-not-func' }
    ]
  },
  2: {
    title: '2. Szint: Értelmezési Tartomány (Df) Kategóriák',
    subtitle: 'Sorold be a függvényeket az értelmezési tartományuk jellege szerint!',
    categories: [
      {
        id: 'cat-all-r',
        name: 'Minden Valós Szám (Df = ℝ)',
        description: 'Nincs semmilyen tiltott bemeneti érték',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-except',
        name: 'Kizárt Pont(ok) (Df = ℝ \\ {x₀})',
        description: 'Törtes nevező miatti tiltott pont(ok)',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-interval',
        name: 'Félegyenes (Df = [a; ∞[)',
        description: 'Négyzetgyök alatti nemnegatív kikötés',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      // Df = R
      { id: 'fs2-1', label: 'f(x) = 2x + 7', category: 'cat-all-r' },
      { id: 'fs2-2', label: 'g(x) = x² - 4x + 3', category: 'cat-all-r' },
      { id: 'fs2-3', label: 'h(x) = |x - 5| + 2', category: 'cat-all-r' },
      { id: 'fs2-4', label: 'k(x) = x³ - 1', category: 'cat-all-r' },
      // Df = R \ {x0}
      { id: 'fs2-5', label: 'f(x) = 1 / x', category: 'cat-except' },
      { id: 'fs2-6', label: 'g(x) = 3 / (x - 4)', category: 'cat-except' },
      { id: 'fs2-7', label: 'h(x) = (x + 1) / (x + 6)', category: 'cat-except' },
      { id: 'fs2-8', label: 'k(x) = 1 / (x² - 4)', category: 'cat-except' },
      // Df = [a; inf[
      { id: 'fs2-9', label: 'f(x) = √x', category: 'cat-interval' },
      { id: 'fs2-10', label: 'g(x) = √(x - 3)', category: 'cat-interval' },
      { id: 'fs2-11', label: 'h(x) = √(x + 5)', category: 'cat-interval' },
      { id: 'fs2-12', label: 'k(x) = √(2x - 8)', category: 'cat-interval' }
    ]
  },
  3: {
    title: '3. Szint: Függvénytani Fogalmak és Jelölések',
    subtitle: 'Csoportosítsd a matematikai leírásokat a megfelelő fogalomhoz!',
    categories: [
      {
        id: 'cat-domain',
        name: 'Értelmezési Tartomány (Df)',
        description: 'Bemenetek, független változók, X-tengely',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-range',
        name: 'Értékkészlet (Rf)',
        description: 'Kimenetek, felvett magasságok, Y-tengely',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-root',
        name: 'Zérushely (x₀)',
        description: 'Ahol a függvényérték nulla: f(x) = 0',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Df
      { id: 'fs3-1', label: 'A grafikon vetülete a vízszintes x-tengelyre', category: 'cat-domain' },
      { id: 'fs3-2', label: 'Tört nevezője nem lehet nulla kikötés halmaza', category: 'cat-domain' },
      { id: 'fs3-3', label: 'Független változó lehetséges értékei', category: 'cat-domain' },
      { id: 'fs3-4', label: 'Gyök alatti nemnegatív bemenetek halmaza', category: 'cat-domain' },
      // Rf
      { id: 'fs3-5', label: 'A grafikon vetülete a függőleges y-tengelyre', category: 'cat-range' },
      { id: 'fs3-6', label: 'f(x) = x² esetén a [0; ∞[ intervallum', category: 'cat-range' },
      { id: 'fs3-7', label: 'A függvény által ténylegesen felvett értékek', category: 'cat-range' },
      { id: 'fs3-8', label: 'f(x) = |x| + 3 esetén a [3; ∞[ intervallum', category: 'cat-range' },
      // Zérushely
      { id: 'fs3-9', label: 'A pont, ahol a grafikon metszi az x-tengelyt', category: 'cat-root' },
      { id: 'fs3-10', label: '3x - 12 = 0 egyenlet megoldása (x = 4)', category: 'cat-root' },
      { id: 'fs3-11', label: 'Azon bemenet, amelyre a kimenet y = 0', category: 'cat-root' },
      { id: 'fs3-12', label: 'Parabola tengelymetszetei az x-tengelyen', category: 'cat-root' }
    ]
  }
};

export const FunctionConceptSorter: React.FC<FunctionConceptSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-func-fogalom-sorter',
  topicTitle = '5. A függvény fogalma'
}) => {
  return (
    <SorterTemplate
      level={level}
      currentLevel={currentLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      grade={9}
      chapterId="fuggvenyek"
      topicId={topicId}
      topicTitle={topicTitle}
      badge="9. Osztály • V. Függvények"
      levelConfigs={sorterLevels}
    />
  );
};

