import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  ParabolaCasesDgt0Svg,
  ParabolaCasesDeq0Svg,
  ParabolaCasesDlt0Svg,
  SignTableChartSvg,
  InequalityIntervalNumberLineSvg
} from './QuadraticInequalitiesFigures';

interface QuadraticInequalitiesSorterProps {
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
    title: 'A megoldáshalmaz jellege',
    subtitle: 'Csoportosítsd az egyenlőtlenségeket a megoldáshalmazuk geometriai formája szerint!',
    categories: [
      {
        id: 'cat-intervallum',
        name: 'Korlátos intervallum',
        description: 'A megoldás a két zérushely közötti nyílt vagy zárt intervallum: ]x₁; x₂[ vagy [x₁; x₂]',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-unio',
        name: 'Két félegyenes uniója',
        description: 'A megoldás a két gyökön kívüli szakaszok uniója: ]-∞; x₁[ ∪ ]x₂; ∞[',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-special',
        name: 'Speciális eset (ℝ, ∅ vagy 1 pont)',
        description: 'A teljes valós számegyenes (ℝ), üres halmaz (∅) vagy egyetlen pont ({x₀})',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'qis1-1', content: 'x² - 4 < 0', categoryId: 'cat-intervallum' },
      { id: 'qis1-2', content: 'x² - 4x + 3 ≤ 0', figure: <ParabolaCasesDgt0Svg size={42} />, categoryId: 'cat-intervallum' },
      { id: 'qis1-3', content: 'x(x - 5) < 0', categoryId: 'cat-intervallum' },
      { id: 'qis1-4', content: 'x² > 25', figure: <InequalityIntervalNumberLineSvg size={42} />, categoryId: 'cat-unio' },
      { id: 'qis1-5', content: 'x² - 5x + 6 ≥ 0', categoryId: 'cat-unio' },
      { id: 'qis1-6', content: 'x² - 3x > 0', categoryId: 'cat-unio' },
      { id: 'qis1-7', content: 'x² < -4', categoryId: 'cat-special' },
      { id: 'qis1-8', content: 'x² + 9 > 0', figure: <ParabolaCasesDlt0Svg size={42} />, categoryId: 'cat-special' },
      { id: 'qis1-9', content: '(x - 5)² ≤ 0', figure: <ParabolaCasesDeq0Svg size={42} />, categoryId: 'cat-special' }
    ]
  },
  2: {
    title: 'A diszkrimináns előjele és a parabola tengelymetszése',
    subtitle: 'Határozd meg a kifejezések diszkriminánsának előjelét (D = b² - 4ac)!',
    categories: [
      {
        id: 'cat-d-pos',
        name: 'D > 0 (Két metszéspont)',
        description: 'Két valós zérushely létezik, a parabola átmetszi az x-tengelyt (vált előjelet)',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-d-zero',
        name: 'D = 0 (Egy érintési pont)',
        description: 'Pontosan egy zérushely, a parabola csúcsa az x-tengelyre esik',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-d-neg',
        name: 'D < 0 (Nincs metszéspont)',
        description: 'Nincs valós zérushely, a parabola lebeg az x-tengely felett vagy alatt',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'qis2-1', content: 'x² - 6x + 5 = 0', figure: <ParabolaCasesDgt0Svg size={42} />, categoryId: 'cat-d-pos' },
      { id: 'qis2-2', content: 'x² - 9 = 0', categoryId: 'cat-d-pos' },
      { id: 'qis2-3', content: '2x² + 3x - 2 = 0', categoryId: 'cat-d-pos' },
      { id: 'qis2-4', content: 'x² - 6x + 9 = 0', figure: <ParabolaCasesDeq0Svg size={42} />, categoryId: 'cat-d-zero' },
      { id: 'qis2-5', content: '4x² + 4x + 1 = 0', categoryId: 'cat-d-zero' },
      { id: 'qis2-6', content: 'x² - 10x + 25 = 0', categoryId: 'cat-d-zero' },
      { id: 'qis2-7', content: 'x² + x + 5 = 0', figure: <ParabolaCasesDlt0Svg size={42} />, categoryId: 'cat-d-neg' },
      { id: 'qis2-8', content: 'x² + 4 = 0', categoryId: 'cat-d-neg' },
      { id: 'qis2-9', content: '2x² - 2x + 1 = 0', categoryId: 'cat-d-neg' }
    ]
  },
  3: {
    title: 'Szabályok, tévhitek és feltételes igazságok',
    subtitle: 'Válaszd szét a mindig érvényes tételeket a gyakori hibáktól és feltételes állításoktól!',
    categories: [
      {
        id: 'cat-true',
        name: 'Mindig igaz szabály',
        description: 'Minden valós számra és kontextusra érvényes matematikai tétel',
        badgeColor: 'bg-green-100 text-green-900 border-green-300'
      },
      {
        id: 'cat-fallacy',
        name: 'Veszélyes tévhit / Hiba',
        description: 'Matematikailag hibás általánosítás vagy eljárási tévedés',
        badgeColor: 'bg-red-100 text-red-900 border-red-300'
      },
      {
        id: 'cat-conditional',
        name: 'Feltételtől függő állítás',
        description: 'Csak bizonyos paraméterek (pl. a > 0 vagy pozitív szorzó) esetén érvényes',
        badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-300'
      }
    ],
    items: [
      {
        id: 'qis3-1',
        content: 'Negatív számmal szorozva vagy osztva az egyenlőtlenség jele azonnal megfordul.',
        categoryId: 'cat-true'
      },
      {
        id: 'qis3-2',
        content: 'Ha D < 0 és a > 0, akkor ax² + bx + c > 0 minden valós x-re teljesül (M = ℝ).',
        figure: <ParabolaCasesDlt0Svg size={42} />,
        categoryId: 'cat-true'
      },
      {
        id: 'qis3-3',
        content: 'A tört f(x)/g(x) > 0 előjele azonos a szorzat f(x)·g(x) > 0 előjelével (ha g(x) ≠ 0).',
        figure: <SignTableChartSvg size={42} />,
        categoryId: 'cat-true'
      },
      {
        id: 'qis3-4',
        content: 'Az x² > 9 egyenlőtlenség mindkét oldalából azonnal gyököt vonva a megoldás x > 3.',
        categoryId: 'cat-fallacy'
      },
      {
        id: 'qis3-5',
        content: 'Egyenlőtlenség mindkét oldalát bátran beszorozhatjuk x-szel anélkül, hogy vizsgálnánk az előjelét.',
        categoryId: 'cat-fallacy'
      },
      {
        id: 'qis3-6',
        content: 'Ha egy másodfokú kifejezés D < 0, akkor a hozzá tartozó egyenlőtlenségnek soha nincs megoldása.',
        categoryId: 'cat-fallacy'
      },
      {
        id: 'qis3-7',
        content: 'A parabola a két zérushely között negatív, a gyökökön kívül pedig pozitív értékeket vesz fel.',
        figure: <ParabolaCasesDgt0Svg size={42} />,
        categoryId: 'cat-conditional'
      },
      {
        id: 'qis3-8',
        content: 'Az ax² + bx + c ≥ 0 egyenlőtlenség megoldáshalmaza a teljes valós számegyenes (ℝ).',
        categoryId: 'cat-conditional'
      },
      {
        id: 'qis3-9',
        content: 'Az egyenlőtlenség mindkét oldalát négyzetre emelve a megoldáshalmaz nem változik meg.',
        categoryId: 'cat-conditional'
      }
    ]
  }
};

export const QuadraticInequalitiesSorter: React.FC<QuadraticInequalitiesSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-eq-masodfoku-egyenlotlensegek-sorter',
  topicTitle = 'Másodfokú egyenlőtlenségek – Rendszerező'
}) => {
  const activeLevel = currentLevel ?? level;

  return (
    <SorterTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="blue"
      level={activeLevel}
      levelConfig={sorterLevels[activeLevel]}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

