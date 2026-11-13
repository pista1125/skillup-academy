import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  RadicalStepFlowSvg,
  RadicalParabolaIntersectionSvg,
  RadicalDomainSvg,
  TwoRadicalsSvg,
  ExtraneousRootDetectorSvg
} from './RadicalEquationsFigures';

interface RadicalEquationsSorterProps {
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
    title: 'Gyökös egyenletek valós megoldásainak száma',
    subtitle: 'Csoportosítsd az egyenleteket a valós megoldásaik száma szerint!',
    categories: [
      {
        id: 'cat-zero',
        name: 'Nincs megoldás (M = ∅)',
        description: 'Negatív jobb oldal vagy üres értelmezési tartomány',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-one',
        name: 'Pontosan 1 valós gyök',
        description: 'Egyetlen valós szám elégíti ki az egyenletet',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-two',
        name: '2 valós gyök',
        description: 'Két különböző valós megoldása van',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      }
    ],
    items: [
      { id: 'res1-1', content: '√(x + 2) = -3', categoryId: 'cat-zero' },
      { id: 'res1-2', content: '√(x + 3) = x - 3', figure: <RadicalParabolaIntersectionSvg size={42} />, categoryId: 'cat-one' },
      { id: 'res1-3', content: '√(x² - 5) = 2', categoryId: 'cat-two' },
      { id: 'res1-4', content: '√(2x + 9) = x - 3', categoryId: 'cat-one' },
      { id: 'res1-5', content: '√(x - 5) = -1', categoryId: 'cat-zero' },
      { id: 'res1-6', content: '√(2x² + 1) = 3', categoryId: 'cat-two' },
      { id: 'res1-7', content: '√(x) = 5', categoryId: 'cat-one' },
      { id: 'res1-8', content: '√(x - 2) + √(1 - x) = 0', figure: <RadicalDomainSvg size={42} />, categoryId: 'cat-zero' },
      { id: 'res1-9', content: '√(25 - x²) = 4', categoryId: 'cat-two' }
    ]
  },
  2: {
    title: 'Gyökjelöltek minősítése négyzetre emelés után',
    subtitle: 'Sorold be a másodfokúvá emelt egyenletből kapott értékeket a valódi státuszuk szerint!',
    categories: [
      {
        id: 'cat-true-root',
        name: 'Valódi gyök (megoldás)',
        description: 'Behelyettesítve a bal és jobb oldal megegyezik',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-extraneous',
        name: 'Hamis gyök (jobb oldal negatív)',
        description: 'A gyök alatti szám jó, de a jobb oldal előjele ellentétes',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-out-domain',
        name: 'Kizárva (gyök alatt negatív)',
        description: 'A kapott értékkel a gyök alatti kifejezés negatív',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'res2-1', content: 'x = 6 az √(x + 3) = x - 3 egyenletben', categoryId: 'cat-true-root' },
      { id: 'res2-2', content: 'x = 1 az √(x + 3) = x - 3 egyenletben', figure: <ExtraneousRootDetectorSvg size={42} />, categoryId: 'cat-extraneous' },
      { id: 'res2-3', content: 'x = -5 az √(x + 3) = ... kifejezésben', categoryId: 'cat-out-domain' },
      { id: 'res2-4', content: 'x = 8 az √(2x + 9) = x - 3 egyenletben', categoryId: 'cat-true-root' },
      { id: 'res2-5', content: 'x = 0 az √(2x + 9) = x - 3 egyenletben', categoryId: 'cat-extraneous' },
      { id: 'res2-6', content: 'x = 1 az √(x - 4) = ... kifejezésben', categoryId: 'cat-out-domain' },
      { id: 'res2-7', content: 'x = 5 az √(x + 11) = x - 1 egyenletben', categoryId: 'cat-true-root' },
      { id: 'res2-8', content: 'x = -2 az √(x + 11) = x - 1 egyenletben', categoryId: 'cat-extraneous' },
      { id: 'res2-9', content: 'x = 10 az √(4 - x) = ... kifejezésben', categoryId: 'cat-out-domain' }
    ]
  },
  3: {
    title: 'Matematikai szabályok és gyakori tévhitek',
    subtitle: 'Döntsd el a gyökös egyenletekkel kapcsolatos kijelentésekről, hogy mikor érvényesek!',
    categories: [
      {
        id: 'cat-always-true',
        name: 'Mindig igaz szabály',
        description: 'Minden valós gyökös egyenletre szigorúan érvényes',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-myth',
        name: 'Veszélyes tévhit (Hamis)',
        description: 'Gyakori hiba, pontvesztést okoz az érettségin',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-conditional',
        name: 'Feltételesen érvényes szabály',
        description: 'Csak bizonyos kikötések vagy feltételek mellett működik',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      }
    ],
    items: [
      { id: 'res3-1', content: 'A négyzetgyök értéke definíció szerint nemnegatív (√... ≥ 0)', categoryId: 'cat-always-true' },
      { id: 'res3-2', content: 'A négyzetre emelés ekvivalens átalakítás', figure: <RadicalStepFlowSvg size={42} />, categoryId: 'cat-myth' },
      { id: 'res3-3', content: 'Ha mindkét oldal garantáltan nemnegatív, a négyzetre emelés ekvivalens', categoryId: 'cat-conditional' },
      { id: 'res3-4', content: 'A kapott gyököket kötelező behelyettesíteni az eredeti egyenletbe', categoryId: 'cat-always-true' },
      { id: 'res3-5', content: 'Ha két gyök van az egyik oldalon, azonnal négyzetre emelünk', figure: <TwoRadicalsSvg size={42} />, categoryId: 'cat-myth' },
      { id: 'res3-6', content: 'Páratlan gyökvonásnál (pl. ³√) nem szükséges a nemnegatív kikötés', categoryId: 'cat-conditional' },
      { id: 'res3-7', content: 'Ha √f(x) = -5, akkor a megoldáshalmaz üres halmaz (M = ∅)', categoryId: 'cat-always-true' },
      { id: 'res3-8', content: 'Ha egy gyökjelölt benne van az értelmezési tartományban, biztosan jó gyök', categoryId: 'cat-myth' },
      { id: 'res3-9', content: 'Páros kitevőjű ismeretlen alatt (pl. √(x² + 4)) a tartomány az egész ℝ', categoryId: 'cat-conditional' }
    ]
  }
};

export const RadicalEquationsSorter: React.FC<RadicalEquationsSorterProps> = ({
  level,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-eq-gyokos-egyenletek-sorter',
  topicTitle = 'Gyökös egyenletek – Csoportosító játék'
}) => {
  const activeLevel = level || currentLevel || 1;

  return (
    <SorterTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levelsConfig={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

