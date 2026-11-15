import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  CircleHomothetySvg,
  CircleTouchingDilationSvg,
  InvariantLinesSvg,
  AngleInterceptThalesSvg,
  PyramidDilationSvg
} from './HomothetyFigures';

interface HomothetySorterProps {
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
    title: '1. Szint: Alakzatpárok középpontos hasonlósága',
    subtitle: 'Döntsd el a megadott alakzatpárokról, hogy mindig középpontosan hasonlók-e egymáshoz!',
    categories: [
      {
        id: 'cat-always',
        name: 'Mindig középpontosan hasonlók',
        description: 'Létezik hozzájuk közös centrum és arány a térben/síkon',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-not-always',
        name: 'NEM mindig középpontosan hasonlók',
        description: 'Hasonlóak lehetnek, de elforgatottság esetén nem középpontosan',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'hs1-1', content: 'Bármely két egy síkban fekvő kör (különböző sugárral)', figure: <CircleHomothetySvg size={42} />, categoryId: 'cat-always' },
      { id: 'hs1-2', content: 'Bármely két nem egybevágó négyzet a síkban', categoryId: 'cat-not-always' },
      { id: 'hs1-3', content: 'Bármely két gömb a térben', categoryId: 'cat-always' },
      { id: 'hs1-4', content: 'Bármely két nem egybevágó kocka a térben', categoryId: 'cat-not-always' },
      { id: 'hs1-5', content: 'Két koncentrikus kör (közös középponttal)', categoryId: 'cat-always' },
      { id: 'hs1-6', content: 'Két párhuzamos oldalú, egyenlő szögű szabályos háromszög', categoryId: 'cat-always' },
      { id: 'hs1-7', content: 'Szögszárakat metsző párhuzamosok által határolt trapézok (ABED és BCFE)', figure: <AngleInterceptThalesSvg size={42} />, categoryId: 'cat-not-always' },
      { id: 'hs1-8', content: 'Szögszárak és párhuzamos szelők alkotta háromszögek az O csúcsból (△OAD és △OBE)', figure: <AngleInterceptThalesSvg size={42} />, categoryId: 'cat-always' }
    ]
  },
  2: {
    title: '2. Szint: Geometriai elemek minősítése',
    subtitle: 'Sorold be a geometriai elemeket a transzformációban betöltött szerepük szerint!',
    categories: [
      {
        id: 'cat-fixpoint',
        name: 'Fixpont (O = O\')',
        description: 'Pont, amely helyben marad',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-fixline',
        name: 'Fixegyenes (e = e\')',
        description: 'Önmagába leképeződő egyenes (pontjai mozognak)',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-parallel',
        name: 'Nem fixegyenes (e\' ∥ e)',
        description: 'Párhuzamosan elmozduló egyenes',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      }
    ],
    items: [
      { id: 'hs2-1', content: 'A hasonlóság O középpontja (λ ≠ 1)', figure: <InvariantLinesSvg size={42} />, categoryId: 'cat-fixpoint' },
      { id: 'hs2-2', content: 'Tetszőleges egyenes, amely áthalad az O ponton', figure: <InvariantLinesSvg size={42} />, categoryId: 'cat-fixline' },
      { id: 'hs2-3', content: 'Egyenes, amely nem illeszkedik az O pontra', categoryId: 'cat-parallel' },
      { id: 'hs2-4', content: 'A két kör középpontjait összekötő centrális egyenes', figure: <CircleHomothetySvg size={42} />, categoryId: 'cat-fixline' },
      { id: 'hs2-5', content: 'Kör külső érintője, amely nem megy át a centrumon', categoryId: 'cat-parallel' },
      { id: 'hs2-6', content: 'Szög szára, amely az O csúcsból indul ki', categoryId: 'cat-fixline' },
      { id: 'hs2-7', content: 'Párhuzamos szelő, amely nem megy át O-n', categoryId: 'cat-parallel' },
      { id: 'hs2-8', content: 'Két kör külső hasonlósági centruma (H_k)', categoryId: 'cat-fixpoint' }
    ]
  },
  3: {
    title: '3. Szint: Matematikai igazságok vs. Tévhitek',
    subtitle: 'Különítsd el a középpontos hasonlóság szabatos tételeit a geometriai tévhitektől!',
    categories: [
      {
        id: 'cat-truth',
        name: 'Matematikai igazság',
        description: 'Szabatos geometriai tétel',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-myth',
        name: 'Gyakori tévhit / Hiba',
        description: 'Matematikailag téves állítás',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'hs3-1', content: 'Bármely két egy síkban fekvő körnek mindig van külső és belső hasonlósági pontja (ha r₁ ≠ r₂)', figure: <CircleHomothetySvg size={42} />, categoryId: 'cat-truth' },
      { id: 'hs3-2', content: 'Mivel minden négyzet hasonló, bármely két négyzet középpontosan is hasonló', categoryId: 'cat-myth' },
      { id: 'hs3-3', content: 'Ha az O centrum a körvonalon van, a kicsinyített kör belülről érinti az eredetit', figure: <CircleTouchingDilationSvg size={42} />, categoryId: 'cat-truth' },
      { id: 'hs3-4', content: 'A fixegyeneseken elhelyezkedő minden pont fixpont a transzformáció során', categoryId: 'cat-myth' },
      { id: 'hs3-5', content: 'Ha egy gömb sugarát felére csökkentjük, térfogata az 1/8-ára csökken', categoryId: 'cat-truth' },
      { id: 'hs3-6', content: 'Középpontos hasonlósággal a kör képe ellipszissé alakulhat', categoryId: 'cat-myth' },
      { id: 'hs3-7', content: 'Gúla csúcsából végzett λ = 8 arányú nagyításakor az alapterület 64-szeresére nő', figure: <PyramidDilationSvg size={42} />, categoryId: 'cat-truth' },
      { id: 'hs3-8', content: 'Két középpontosan hasonló sokszög megfelelő oldalai mindig párhuzamosak egymással', categoryId: 'cat-truth' }
    ]
  }
};

export const HomothetySorter: React.FC<HomothetySorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-hasonlosag',
  topicTitle = 'Középpontos hasonlóság'
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

export default HomothetySorter;

