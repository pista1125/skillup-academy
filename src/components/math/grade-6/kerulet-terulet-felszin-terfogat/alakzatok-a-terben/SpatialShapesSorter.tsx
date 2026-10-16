import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SpatialShapesSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onBack?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Poliéderek és Forgástestek csoportosítása',
    subtitle: 'Válogasd szét a térbeli testeket aszerint, hogy csak síklapok határolják (poliéder), vagy görbe felületük is van (forgástest)!',
    categories: [
      {
        id: 'cat-polyhedron',
        name: 'Poliéderek (Soklapú testek)',
        description: 'Kizárólag sokszög síklapok határolják',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      },
      {
        id: 'cat-rotational',
        name: 'Forgástestek és Görbe felületű testek',
        description: 'Van görbe határoló felületük (palást / gömbfelület)',
        badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300'
      }
    ],
    items: [
      { id: 's1-1', label: 'Kocka (6 négyzetlap)', category: 'cat-polyhedron' },
      { id: 's1-2', label: 'Egyenes körhenger', category: 'cat-rotational' },
      { id: 's1-3', label: 'Téglatest (6 téglalap)', category: 'cat-polyhedron' },
      { id: 's1-4', label: 'Gömb', category: 'cat-rotational' },
      { id: 's1-5', label: 'Négyzet alapú gúla', category: 'cat-polyhedron' },
      { id: 's1-6', label: 'Egyenes körkúp', category: 'cat-rotational' },
      { id: 's1-7', label: 'Háromoldalú hasáb', category: 'cat-polyhedron' },
      { id: 's1-8', label: 'Félgömb (lapos kör és görbe felület)', category: 'cat-rotational' },
      { id: 's1-9', label: 'Szabályos tetraéder (4 háromszög)', category: 'cat-polyhedron' },
      { id: 's1-10', label: 'Ötszög alapú egyenes hasáb', category: 'cat-polyhedron' },
      { id: 's1-11', label: 'Körgyűrű keresztmetszetű cső', category: 'cat-rotational' },
      { id: 's1-12', label: 'Hatoldalú gúla', category: 'cat-polyhedron' }
    ]
  },
  2: {
    title: '2. Szint: Hasábok, Gúlák és Forgástestek',
    subtitle: 'Csoportosítsd a geometriai testeket a felépítésük típusa szerint!',
    categories: [
      {
        id: 'cat-prisms',
        name: 'Hasábok',
        description: 'Két párhuzamos, egybevágó alaplap és téglalap palást',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-pyramids',
        name: 'Gúlák',
        description: 'Egyetlen sokszög alaplap és egy csúcsban találkozó háromszögek',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-round',
        name: 'Forgástestek',
        description: 'Kör keresztmetszetű vagy gömbi testek',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      }
    ],
    items: [
      { id: 's2-1', label: 'Kocka (négyzetes hasáb)', category: 'cat-prisms' },
      { id: 's2-2', label: 'Négyzet alapú piramis (gúla)', category: 'cat-pyramids' },
      { id: 's2-3', label: 'Konzervdoboz (henger)', category: 'cat-round' },
      { id: 's2-4', label: 'Cipősdoboz (téglatest)', category: 'cat-prisms' },
      { id: 's2-5', label: 'Fagyistölcsér (kúp)', category: 'cat-round' },
      { id: 's2-6', label: 'Szabályos tetraéder (háromoldalú gúla)', category: 'cat-pyramids' },
      { id: 's2-7', label: 'Háromszög alapú hasáb (Toblerone csoki)', category: 'cat-prisms' },
      { id: 's2-8', label: 'Ötszög alapú gúla', category: 'cat-pyramids' },
      { id: 's2-9', label: 'Kosárlabda (gömb)', category: 'cat-round' },
      { id: 's2-10', label: 'Hatoldalú hasáb (ceruzafa test)', category: 'cat-prisms' },
      { id: 's2-11', label: 'Nyolcoldalú gúla sátortető', category: 'cat-pyramids' },
      { id: 's2-12', label: 'Félkúp (kettévágott kúp)', category: 'cat-round' }
    ]
  },
  3: {
    title: '3. Szint: Testek a csúcsaik száma (C) szerint',
    subtitle: 'Válogasd szét a testeket a geometriai csúcsaik pontos száma alapján!',
    categories: [
      {
        id: 'cat-few-vertices',
        name: 'Kevés csúcs (C = 0, 1 vagy 4)',
        description: 'Gömb, kúp vagy tetraéder',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-five-six',
        name: '5 vagy 6 csúcs (C = 5 vagy 6)',
        description: 'Négyzetes gúla, háromszögű hasáb, ötszögű gúla',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-eight',
        name: 'Pontosan 8 csúcs (C = 8)',
        description: 'Kocka, téglatest, 7-oldalú gúla',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-many',
        name: '10 vagy több csúcs (C ≥ 10)',
        description: 'Ötszögű, hatoldalú, nyolcoldalú hasábok',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      { id: 's3-1', label: 'Kocka (C = 8)', category: 'cat-eight' },
      { id: 's3-2', label: 'Tetraéder (C = 4)', category: 'cat-few-vertices' },
      { id: 's3-3', label: 'Téglatest (C = 8)', category: 'cat-eight' },
      { id: 's3-4', label: 'Négyzet alapú gúla (C = 5)', category: 'cat-five-six' },
      { id: 's3-5', label: 'Gömb (C = 0)', category: 'cat-few-vertices' },
      { id: 's3-6', label: 'Háromoldalú hasáb (C = 6)', category: 'cat-five-six' },
      { id: 's3-7', label: 'Ötoldalú hasáb (C = 10)', category: 'cat-many' },
      { id: 's3-8', label: 'Egyenes körkúp (1 geometriai csúcs)', category: 'cat-few-vertices' },
      { id: 's3-9', label: 'Ötoldalú gúla (C = 6)', category: 'cat-five-six' },
      { id: 's3-10', label: 'Henger (C = 0)', category: 'cat-few-vertices' },
      { id: 's3-11', label: 'Hatoldalú hasáb (C = 12)', category: 'cat-many' },
      { id: 's3-12', label: 'Hétszög alapú gúla (C = 8)', category: 'cat-eight' }
    ]
  }
};

export const SpatialShapesSorter: React.FC<SpatialShapesSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onBack,
  topicId = 'g6-spatial-shapes-sorter',
  topicTitle = 'Alakzatok a térben - Csoportosító'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <SorterTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      level={activeLevel}
      currentLevel={activeLevel}
      levels={sorterLevels}
      levelsConfig={sorterLevels}
      config={sorterLevels[activeLevel]}
      levelConfig={sorterLevels[activeLevel]}
      themeColor="purple"
      badge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      title="Alakzatok a térben csoportosító"
      subtitle="Csoportosítsd a térbeli alakzatokat, felületeket és testjellemzőket 3 szinten!"
      grade={6}
      chapterId="kerulet-terulet-felszin-terfogat"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onBack={onBack}
    />
  );
};

(SpatialShapesSorter as any).sorterLevels = sorterLevels;
(SpatialShapesSorter as any).levels = sorterLevels;

export default SpatialShapesSorter;
