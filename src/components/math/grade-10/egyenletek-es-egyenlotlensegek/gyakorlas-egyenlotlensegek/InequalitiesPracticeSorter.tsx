import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  FractionSignChartSvg,
  AbsoluteValueInequalityBandSvg,
  DenominatorDangerTrapSvg,
  ComplexIntervalIntersectionSvg,
  AbsoluteQuadraticParabolaSvg
} from './InequalitiesPracticeFigures';

interface InequalitiesPracticeSorterProps {
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
    title: 'A megoldáshalmaz szerkezete',
    subtitle: 'Csoportosítsd a kifejezéseket a megoldáshalmazuk intervallum-típusa szerint!',
    categories: [
      {
        id: 'cat-single',
        name: 'Egyetlen korlátos intervallum',
        description: 'A megoldás egyetlen zárt vagy nyílt intervallum: [a; b] vagy ]a; b[',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-union',
        name: 'Két félegyenes uniója',
        description: 'A megoldás két végtelen külső tartomány uniója: ]-∞; a[ ∪ ]b; ∞[',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-half-open',
        name: 'Félig nyílt intervallum',
        description: 'A számláló zárt, de a tiltott nevező miatt a másik végpont nyílt: [a; b[ vagy ]a; b]',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'ips1-1', content: '|x| < 3', figure: <AbsoluteValueInequalityBandSvg size={42} />, categoryId: 'cat-single' },
      { id: 'ips1-2', content: '|x - 2| ≤ 4', categoryId: 'cat-single' },
      { id: 'ips1-3', content: '(x - 1)(x - 5) < 0', categoryId: 'cat-single' },
      { id: 'ips1-4', content: '|x| ≥ 6', categoryId: 'cat-union' },
      { id: 'ips1-5', content: '|x - 1| > 2', categoryId: 'cat-union' },
      { id: 'ips1-6', content: 'x² > 16', categoryId: 'cat-union' },
      { id: 'ips1-7', content: '(x - 2) / (x - 5) ≤ 0', figure: <FractionSignChartSvg size={42} />, categoryId: 'cat-half-open' },
      { id: 'ips1-8', content: '(x + 3) / (x - 1) ≤ 0', categoryId: 'cat-half-open' },
      { id: 'ips1-9', content: '(5 - x) / (x + 2) ≥ 0', categoryId: 'cat-half-open' }
    ]
  },
  2: {
    title: 'Szükséges megoldási módszer',
    subtitle: 'Válaszd ki az egyenlőtlenséghez illő helyes algebrai lépést!',
    categories: [
      {
        id: 'cat-null-den',
        name: 'Nullára rendezés és közös nevező',
        description: 'A jobb oldal nem 0: balra rendezzük, közös nevezőre hozzuk, és előjeltáblázatot készítünk',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-double-ineq',
        name: 'Kétoldali egyenlőtlenség (-d ≤ A ≤ d)',
        description: 'Középpont körüli zárt sáv: a kifejezés a két korlát közé esik',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-two-branches',
        name: 'Két különálló ág uniója (A ≤ -d vagy A ≥ d)',
        description: 'Külső tartományok: a kifejezés vagy kisebb a negatív korlátnál, vagy nagyobb a pozitívnál',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'ips2-1', content: '3 / (x - 2) > 1', figure: <DenominatorDangerTrapSvg size={42} />, categoryId: 'cat-null-den' },
      { id: 'ips2-2', content: 'x / (x + 1) ≤ 2', categoryId: 'cat-null-den' },
      { id: 'ips2-3', content: '(2x + 1) / (x - 3) ≥ 1', categoryId: 'cat-null-den' },
      { id: 'ips2-4', content: '|x - 4| ≤ 5', figure: <AbsoluteValueInequalityBandSvg size={42} />, categoryId: 'cat-double-ineq' },
      { id: 'ips2-5', content: '|2x + 1| < 7', categoryId: 'cat-double-ineq' },
      { id: 'ips2-6', content: '|x² - 3| < 1', figure: <AbsoluteQuadraticParabolaSvg size={42} />, categoryId: 'cat-double-ineq' },
      { id: 'ips2-7', content: '|x - 3| ≥ 4', categoryId: 'cat-two-branches' },
      { id: 'ips2-8', content: '|2x - 5| > 9', categoryId: 'cat-two-branches' },
      { id: 'ips2-9', content: '|x² - 5| ≥ 4', categoryId: 'cat-two-branches' }
    ]
  },
  3: {
    title: 'Szabályok, tévhitek és kikötések',
    subtitle: 'Válaszd szét az érvényes szabályokat a tipikus hibáktól és kikötési előírásoktól!',
    categories: [
      {
        id: 'cat-rule',
        name: 'Mindig érvényes matematikai tétel',
        description: 'Minden esetben helyes és kötelezően alkalmazható elméleti összefüggés',
        badgeColor: 'bg-green-100 text-green-900 border-green-300'
      },
      {
        id: 'cat-trap',
        name: 'Veszélyes tévhit / Hiba',
        description: 'Gyakori érettségi hiba, ami pontvesztéshez vagy hamis megoldáshoz vezet',
        badgeColor: 'bg-red-100 text-red-900 border-red-300'
      },
      {
        id: 'cat-domain',
        name: 'Kikötési / Értelmezési előírás',
        description: 'A nevező zérushelyének vagy a gyök alatti kifejezésnek a feltételei',
        badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-300'
      }
    ],
    items: [
      {
        id: 'ips3-1',
        content: '|A| ≤ d (ahol d > 0) pontosan akkor teljesül, ha -d ≤ A ≤ d.',
        categoryId: 'cat-rule'
      },
      {
        id: 'ips3-2',
        content: 'Egyenlőtlenség-rendszernél az egyes rész-megoldáshalmazok metszetét (I₁ ∩ I₂) kell képezni.',
        figure: <ComplexIntervalIntersectionSvg size={42} />,
        categoryId: 'cat-rule'
      },
      {
        id: 'ips3-3',
        content: 'Egy tört előjele megegyezik a számláló és nevező szorzatának előjelével (ha Q(x) ≠ 0).',
        categoryId: 'cat-rule'
      },
      {
        id: 'ips3-4',
        content: 'Törtes egyenlőtlenségben mindkét oldalt nyugodtan beszorozzuk a nevezővel a tört eltüntetéséhez.',
        figure: <DenominatorDangerTrapSvg size={42} />,
        categoryId: 'cat-trap'
      },
      {
        id: 'ips3-5',
        content: 'Az |x| < 4 egyenlőtlenségből azonnal következik, hogy a megoldás egyszerűen x < 4.',
        categoryId: 'cat-trap'
      },
      {
        id: 'ips3-6',
        content: 'Ha egy tört értéke ≤ 0, akkor a nevező is felveheti a 0 értéket (zárt zárójel a nevezőnél).',
        categoryId: 'cat-trap'
      },
      {
        id: 'ips3-7',
        content: 'A nevezőben szereplő kifejezés sohasem lehet egyenlő nullával (Q(x) ≠ 0 kötelező kikötés).',
        categoryId: 'cat-domain'
      },
      {
        id: 'ips3-8',
        content: 'Megengedő (≤, ≥) törtes egyenlőtlenségnél a nevező zérushelyénél mindig szigorúan NYÍLT a zárójel.',
        figure: <FractionSignChartSvg size={42} />,
        categoryId: 'cat-domain'
      },
      {
        id: 'ips3-9',
        content: 'A valós számok halmazán a nevező kizárása már a feladat megoldásának legelső lépésében kötelező.',
        categoryId: 'cat-domain'
      }
    ]
  }
};

export const InequalitiesPracticeSorter: React.FC<InequalitiesPracticeSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-eq-gyakorlas-egyenlotlensegek-sorter',
  topicTitle = 'Törtes és abszolútértékes egyenlőtlenségek – Rendszerező'
}) => {
  const activeLevel = currentLevel ?? level;

  return (
    <SorterTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="indigo"
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

