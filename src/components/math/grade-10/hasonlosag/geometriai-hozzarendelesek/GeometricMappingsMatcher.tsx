import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  TransformationHierarchySvg,
  OrthogonalProjectionSvg,
  SundialProjectionSvg,
  TechnicalDrawingViewsSvg,
  VectorWorkProjectionSvg
} from './GeometricMappingsFigures';

interface GeometricMappingsMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Alapfogalmak és transzformáció-típusok',
    subtitle: 'Párosítsd a leképezéseket és hozzárendeléseket a pontos matematikai leírásukkal!',
    pairs: [
      {
        id: 'gmm1-1',
        prompt: 'Geometriai leképezés (hozzárendelés)',
        promptFigure: <TransformationHierarchySvg size={42} />,
        value: 'Függvény, amelynek értelmezési tartománya és értékkészlete is ponthalmaz'
      },
      {
        id: 'gmm1-2',
        prompt: 'Geometriai transzformáció',
        value: 'Kölcsönösen egyértelmű (bijektív) leképezés, ahol az ÉT és ÉK ugyanaz a sík/tér'
      },
      {
        id: 'gmm1-3',
        prompt: 'Egybevágósági transzformáció',
        value: 'Távolságtartó bijekció (|A\'B\'| = |AB|), a hasonlósági arány λ = 1'
      },
      {
        id: 'gmm1-4',
        prompt: 'Hasonlósági transzformáció',
        value: 'Középpontos hasonlóság és egybevágóság egymásutánja (aránytartó, szögtartó)'
      },
      {
        id: 'gmm1-5',
        prompt: 'Tengelyes tükrözés jellege',
        value: 'Egybevágóság, de megfordítja a körüljárási irányt (irányváltó)'
      },
      {
        id: 'gmm1-6',
        prompt: 'Párhuzamos eltolás jellege',
        value: 'Egybevágóság, iránytartó, és nemnulla vektor esetén nincs fixpontja'
      },
      {
        id: 'gmm1-7',
        prompt: 'Pont körüli elforgatás',
        value: 'Egybevágóság, iránytartó, és egyetlen fixpontja a forgási középpont'
      },
      {
        id: 'gmm1-8',
        prompt: 'Csúsztatva tükrözés',
        value: 'Tengelyes tükrözés és a tengellyel párhuzamos eltolás kompozíciója'
      }
    ]
  },
  2: {
    title: '2. Szint: Merőleges vetítés és műszaki alkalmazások',
    subtitle: 'Párosítsd a vetítési tulajdonságokat a geometriai és fizikai szabályokkal!',
    pairs: [
      {
        id: 'gmm2-1',
        prompt: 'Szakasz vetülete merőleges vetítéskor',
        promptFigure: <OrthogonalProjectionSvg size={42} />,
        value: 'Legfeljebb olyan hosszú, mint az eredeti szakasz (|a\'| = |a| · cos α ≤ |a|)'
      },
      {
        id: 'gmm2-2',
        prompt: 'Vetítési egyenesre merőleges szakasz képe',
        value: 'Egyetlen pont (a szakasz teljes hossza 0-ra zsugorodik)'
      },
      {
        id: 'gmm2-3',
        prompt: 'Körvonal merőleges vetülete az egyenesre',
        promptFigure: <OrthogonalProjectionSvg size={42} />,
        value: 'Egy 2r hosszúságú zárt szakasz (az átmérője)'
      },
      {
        id: 'gmm2-4',
        prompt: 'Napóra működési elve',
        promptFigure: <SundialProjectionSvg size={42} />,
        value: 'Térbeli pontok párhuzamos vetítése síkra a Nap sugaraival'
      },
      {
        id: 'gmm2-5',
        prompt: 'Műszaki rajz 3 alapsíkja',
        promptFigure: <TechnicalDrawingViewsSvg size={42} />,
        value: 'Elölnézet, felülnézet és oldalnézet (Monge-féle képsíkok)'
      },
      {
        id: 'gmm2-6',
        prompt: 'Mechanikai munka számítása a fizikában',
        promptFigure: <VectorWorkProjectionSvg size={42} />,
        value: 'W = F_∥ · s = F · s · cos(α) (az erővektor elmozdulás irányú vetülete)'
      },
      {
        id: 'gmm2-7',
        prompt: 'Vetületre párhuzamos szakasz képe',
        value: 'Pontosan az eredetivel egyenlő hosszúságú szakasz'
      },
      {
        id: 'gmm2-8',
        prompt: 'Dimenziócsökkenés a vetítésnél',
        value: 'A sík pontjai egy egyenesre, vagy a tér pontjai egy síkra képződnek le'
      }
    ]
  },
  3: {
    title: '3. Szint: Kompetenciamérés, árnyékok és bijektivitás',
    subtitle: 'Párosítsd az összetett geometriai hozzárendeléseket a helyes következtetéssel!',
    pairs: [
      {
        id: 'gmm3-1',
        prompt: 'Melyik test NEM adhat árnyékként téglalapot?',
        value: 'Gömb (a gömb bármely párhuzamos vetülete mindig kör vagy ellipszis)'
      },
      {
        id: 'gmm3-2',
        prompt: 'Kölcsönös egyértelműség (bijektivitás)',
        value: 'Különböző pontoknak különböző a képe, és minden képpontnak van ősképe'
      },
      {
        id: 'gmm3-3',
        prompt: 'A merőleges vetítés kölcsönös egyértelműsége',
        value: 'NEM bijektív (végtelen sok pont képeződik le ugyanarra a vetületi pontra)'
      },
      {
        id: 'gmm3-4',
        prompt: 'Derékszögű háromszög átfogójának vetületei',
        value: 'A két befogó átfogóra vett vetületének összege pontosan maga az átfogó (c = p + q)'
      },
      {
        id: 'gmm3-5',
        prompt: 'Hengertest lehetséges vetületi képei',
        value: 'Kör (alaplappal párhuzamos síkra) vagy téglalap (tengellyel párhuzamos síkra)'
      },
      {
        id: 'gmm3-6',
        prompt: 'Két egybevágóság egymásutánja (kompozíciója)',
        value: 'Mindig egybevágósági transzformációt eredményez'
      },
      {
        id: 'gmm3-7',
        prompt: 'Két hasonlóság (λ₁ és λ₂) egymásutánja',
        value: 'Hasonlósági transzformáció, amelynek aránya λ = λ₁ · λ₂'
      },
      {
        id: 'gmm3-8',
        prompt: 'Árnyjáték csalóka illúziója',
        value: 'Különböző térbeli alakzatok vetülete azonos síkbeli árnyékot adhat'
      }
    ]
  }
};

export const GeometricMappingsMatcher: React.FC<GeometricMappingsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-hasonlosag',
  topicTitle = 'Geometriai hozzárendelések'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <MatcherTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

export default GeometricMappingsMatcher;

