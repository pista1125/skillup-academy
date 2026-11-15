import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  TransformationHierarchySvg,
  OrthogonalProjectionSvg,
  SundialProjectionSvg,
  TechnicalDrawingViewsSvg,
  VectorWorkProjectionSvg
} from './GeometricMappingsFigures';

interface GeometricMappingsSorterProps {
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
    title: '1. Szint: Hozzárendelések és transzformációk rendszere',
    subtitle: 'Sorold be a geometriai hozzárendeléseket a matematikai kategóriájuk szerint!',
    categories: [
      {
        id: 'cat-congruent',
        name: 'Egybevágóság (λ = 1)',
        description: 'Távolságtartó bijekció a síkon/térben',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-similarity',
        name: 'Hasonlóság (λ ≠ 1)',
        description: 'Aránytartó, szögtartó bijekció',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-projection',
        name: 'Nem transzformáció (Vetítés)',
        description: 'Dimenziócsökkenés, nem bijektív',
        badgeColor: 'bg-slate-100 text-slate-900 border-slate-300'
      }
    ],
    items: [
      { id: 'gms1-1', content: 'Tengelyes tükrözés a síkban', figure: <TransformationHierarchySvg size={42} />, categoryId: 'cat-congruent' },
      { id: 'gms1-2', content: 'Párhuzamos eltolás nemnulla vektorral', categoryId: 'cat-congruent' },
      { id: 'gms1-3', content: 'Középpontos nagyítás λ = 2,5 aránnyal', categoryId: 'cat-similarity' },
      { id: 'gms1-4', content: 'Merőleges vetítés a sík egy egyenesére', figure: <OrthogonalProjectionSvg size={42} />, categoryId: 'cat-projection' },
      { id: 'gms1-5', content: 'Pont körüli elforgatás 60°-kal', categoryId: 'cat-congruent' },
      { id: 'gms1-6', content: 'Középpontos kicsinyítés és eltolás egymásutánja', categoryId: 'cat-similarity' },
      { id: 'gms1-7', content: 'Párhuzamos vetítés a napóra lapjára', figure: <SundialProjectionSvg size={42} />, categoryId: 'cat-projection' },
      { id: 'gms1-8', content: 'Műszaki rajz 3 nézetének képsíkjaira vett vetületek', figure: <TechnicalDrawingViewsSvg size={42} />, categoryId: 'cat-projection' }
    ]
  },
  2: {
    title: '2. Szint: Tulajdonságok megőrzése és invarianciák',
    subtitle: 'Döntsd el a hozzárendelésekről, hogy milyen geometriai mennyiségeket őriznek meg!',
    categories: [
      {
        id: 'cat-isometric',
        name: 'Távolságtartó (|A\'B\'| = |AB|)',
        description: 'Megőrzi a távolságot és a szögeket',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-conformal',
        name: 'Csak arány- és szögtartó',
        description: 'Távolságot nem őriz meg, de szögtartó',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-distorted',
        name: 'Sem távolság-, sem szögtartó',
        description: 'A szögek és méretek torzulnak',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'gms2-1', content: 'Középpontos tükrözés a síkban', categoryId: 'cat-isometric' },
      { id: 'gms2-2', content: 'Középpontos nagyítás λ = 3 aránnyal', categoryId: 'cat-conformal' },
      { id: 'gms2-3', content: 'Síkbeli merőleges vetítés az e egyenesre', figure: <OrthogonalProjectionSvg size={42} />, categoryId: 'cat-distorted' },
      { id: 'gms2-4', content: 'Párhuzamos eltolás v vektorral', categoryId: 'cat-isometric' },
      { id: 'gms2-5', content: 'Középpontos hasonlóság és forgatás egymásutánja', categoryId: 'cat-conformal' },
      { id: 'gms2-6', content: 'Napóra árnyékvetése az S síkra a nap során', figure: <SundialProjectionSvg size={42} />, categoryId: 'cat-distorted' },
      { id: 'gms2-7', content: 'Csúsztatva tükrözés', categoryId: 'cat-isometric' },
      { id: 'gms2-8', content: 'Erővektor elmozdulás irányú összetevőjének vetítése', figure: <VectorWorkProjectionSvg size={42} />, categoryId: 'cat-distorted' }
    ]
  },
  3: {
    title: '3. Szint: Matematikai igazságok vs. Tévhitek',
    subtitle: 'Különítsd el a geometriai hozzárendelések tételeit a tipikus félreértésektől!',
    categories: [
      {
        id: 'cat-truth',
        name: 'Matematikai igazság',
        description: 'Helytálló tétel vagy megfigyelés',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-myth',
        name: 'Gyakori tévhit / Hiba',
        description: 'Téves geometriai kijelentés',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'gms3-1', content: 'Egy szakasz merőleges vetülete legfeljebb olyan hosszú, mint az eredeti szakasz (|a\'| ≤ |a|)', figure: <OrthogonalProjectionSvg size={42} />, categoryId: 'cat-truth' },
      { id: 'gms3-2', content: 'Egyenesre merőleges szakasz merőleges vetülete egyetlen ponttá zsugorodik', categoryId: 'cat-truth' },
      { id: 'gms3-3', content: 'A merőleges vetítés egy geometriai transzformáció a síkban', categoryId: 'cat-myth' },
      { id: 'gms3-4', content: 'Körvonal merőleges vetülete a sík egy egyenesére mindig egy szakasz', figure: <OrthogonalProjectionSvg size={42} />, categoryId: 'cat-truth' },
      { id: 'gms3-5', content: 'Egy gömb alakú test adhat téglalap alakú árnyékot a falon', categoryId: 'cat-myth' },
      { id: 'gms3-6', content: 'A derékszögű háromszög befogóinak átfogóra vett merőleges vetületeinek összege az átfogó', categoryId: 'cat-truth' },
      { id: 'gms3-7', content: 'A napóra számlapján az árnyékháromszög belső szögei állandóak a nap során', figure: <SundialProjectionSvg size={42} />, categoryId: 'cat-myth' },
      { id: 'gms3-8', content: 'Két egybevágósági transzformáció egymásutánja mindig egybevágóság', categoryId: 'cat-truth' }
    ]
  }
};

export const GeometricMappingsSorter: React.FC<GeometricMappingsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-hasonlosag',
  topicTitle = 'Geometriai hozzárendelések'
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

export default GeometricMappingsSorter;

