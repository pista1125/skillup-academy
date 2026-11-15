import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  DilationCenterSvg,
  NegativeRatioSvg,
  AreaPerimeterRatioSvg,
  SquareInTriangleSvg,
  PyramidSliceSvg
} from './CentralDilationFigures';

interface CentralDilationSorterProps {
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
    title: '1. Szint: Hasonlósági arányok minősítése',
    subtitle: 'Sorold be a megadott hasonlósági tényezőket a transzformáció jellege szerint!',
    categories: [
      {
        id: 'cat-enlarge',
        name: 'Középpontos nagyítás (|λ| > 1)',
        description: 'A szakaszok hossza megnő',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-reduce',
        name: 'Középpontos kicsinyítés (|λ| < 1)',
        description: 'A szakaszok hossza lecsökken',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      },
      {
        id: 'cat-congruent',
        name: 'Egybevágóság (|λ| = 1)',
        description: 'Távolságtartó: a méretek nem változnak',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      { id: 'cds1-1', content: 'λ = 2,5', figure: <DilationCenterSvg size={42} />, categoryId: 'cat-enlarge' },
      { id: 'cds1-2', content: 'λ = 1/3 (harmadára kicsinyítés)', categoryId: 'cat-reduce' },
      { id: 'cds1-3', content: 'λ = -4 (négyszeres nagyítás + tükrözés)', figure: <NegativeRatioSvg size={42} />, categoryId: 'cat-enlarge' },
      { id: 'cds1-4', content: 'λ = 1 (identitás)', categoryId: 'cat-congruent' },
      { id: 'cds1-5', content: 'λ = -1 (középpontos tükrözés)', categoryId: 'cat-congruent' },
      { id: 'cds1-6', content: 'λ = 0,75 (háromnegyedére kicsinyítés)', categoryId: 'cat-reduce' },
      { id: 'cds1-7', content: 'λ = -0,2 (ötödére kicsinyítés + tükrözés)', categoryId: 'cat-reduce' },
      { id: 'cds1-8', content: 'λ = 1,05 (5%-os nagyítás)', categoryId: 'cat-enlarge' }
    ]
  },
  2: {
    title: '2. Szint: Geometriai mennyiségek változása',
    subtitle: 'Döntsd el a geometriai jellemzőkről, hogyan változnak középpontos nagyításkor/kicsinyítéskor!',
    categories: [
      {
        id: 'cat-invariant',
        name: 'Változatlan marad (invariáns)',
        description: 'Nem függ a hasonlósági aránytól',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-linear',
        name: '|λ|-szorosára változik (lineáris)',
        description: '1 dimenziós hosszúságok és távolságok',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-quadratic',
        name: 'λ²-szeresére változik (kvadratikus)',
        description: '2 dimenziós síkbeli területek',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      { id: 'cds2-1', content: 'Háromszög belső szögeinek nagysága (α, β, γ)', categoryId: 'cat-invariant' },
      { id: 'cds2-2', content: 'A háromszög kerülete (K = a + b + c)', figure: <AreaPerimeterRatioSvg size={42} />, categoryId: 'cat-linear' },
      { id: 'cds2-3', content: 'A háromszög területe (T = a·m/2)', figure: <AreaPerimeterRatioSvg size={42} />, categoryId: 'cat-quadratic' },
      { id: 'cds2-4', content: 'Szakaszok párhuzamossága', categoryId: 'cat-invariant' },
      { id: 'cds2-5', content: 'A kör területe (T = r²π)', categoryId: 'cat-quadratic' },
      { id: 'cds2-6', content: 'Pont távolsága az O centrumtól (|OP|)', categoryId: 'cat-linear' },
      { id: 'cds2-7', content: 'Gúla alaplappal párhuzamos metszetének területe', figure: <PyramidSliceSvg size={42} />, categoryId: 'cat-quadratic' },
      { id: 'cds2-8', content: 'Bármely két belső szakasz hosszának aránya (a/b)', categoryId: 'cat-invariant' }
    ]
  },
  3: {
    title: '3. Szint: Matematikai igazságok vs. Tévhitek',
    subtitle: 'Különítsd el a középpontos nagyítás valódi törvényszerűségeit a tipikus tévhitektől!',
    categories: [
      {
        id: 'cat-truth',
        name: 'Matematikai igazság',
        description: 'Helytálló geometriai tétel',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-myth',
        name: 'Gyakori tévhit / Hiba',
        description: 'Matematikailag hibás állítás',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'cds3-1', content: 'Ha a háromszög oldalai 3-szorosra nőnek, a területe 9-szeresére nő', categoryId: 'cat-truth' },
      { id: 'cds3-2', content: 'Középpontos kicsinyítéskor a háromszög belső szögei is kisebbek lesznek', categoryId: 'cat-myth' },
      { id: 'cds3-3', content: 'Ha λ = -2, akkor a képszakasz hossza negatív szám (-2-szeres)', categoryId: 'cat-myth' },
      { id: 'cds3-4', content: 'Az O centrumon átmenő egyenesek mindegyik pontja helyben marad (fixpont)', categoryId: 'cat-myth' },
      { id: 'cds3-5', content: 'Két különböző pontból végzett azonos arányú nagyítás képei eltolással átvihetők egymásba', figure: <SquareInTriangleSvg size={42} />, categoryId: 'cat-truth' },
      { id: 'cds3-6', content: 'Ha egy alakzat kerülete felére csökken, a területe negyedére csökken', categoryId: 'cat-truth' },
      { id: 'cds3-7', content: 'Az O centrumon kívül nincs más fixpont, ha λ ≠ 1', categoryId: 'cat-truth' },
      { id: 'cds3-8', content: 'Negatív arány esetén az O centrum az eredeti és a képpont között helyezkedik el', figure: <NegativeRatioSvg size={42} />, categoryId: 'cat-truth' }
    ]
  }
};

export const CentralDilationSorter: React.FC<CentralDilationSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-hasonlosag',
  topicTitle = 'Középpontos nagyítás, kicsinyítés'
}) => {
  const activeLevel = currentLevel || level;

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
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

export default CentralDilationSorter;

