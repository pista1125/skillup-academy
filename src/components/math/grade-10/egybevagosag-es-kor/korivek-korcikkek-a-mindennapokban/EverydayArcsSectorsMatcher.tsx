import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  ClockMiniSvg,
  WiperMiniSvg,
  PizzaSliceMiniSvg
} from './EverydayArcsSectorsFigures';

interface EverydayArcsSectorsMatcherProps {
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
    title: 'Óramutatók szögsebessége és alapállásai',
    subtitle: 'Párosítsd az óra mozgásait a szögekkel!',
    pairs: [
      { id: 'eam1-1', prompt: 'Nagymutató sebessége', promptFigure: <ClockMiniSvg size={44} />, value: '6° percenként' },
      { id: 'eam1-2', prompt: 'Kismutató sebessége', promptFigure: <ClockMiniSvg size={44} />, value: '0,5° percenként (30°/óra)' },
      { id: 'eam1-3', prompt: 'Mutatók szöge 3:00-kor', promptFigure: <ClockMiniSvg size={44} />, value: '90°' },
      { id: 'eam1-4', prompt: 'Mutatók szöge 6:00-kor', promptFigure: <ClockMiniSvg size={44} />, value: '180°' },
      { id: 'eam1-5', prompt: 'Mutatók szöge 12:00-kor', promptFigure: <ClockMiniSvg size={44} />, value: '0°' },
      { id: 'eam1-6', prompt: 'Mutatók szöge 1:00-kor', promptFigure: <ClockMiniSvg size={44} />, value: '30°' },
      { id: 'eam1-7', prompt: 'Mutatók szöge 4:00-kor', promptFigure: <ClockMiniSvg size={44} />, value: '120°' },
      { id: 'eam1-8', prompt: 'Mutatók szöge 5:00-kor', promptFigure: <ClockMiniSvg size={44} />, value: '150°' }
    ]
  },
  2: {
    title: 'Időpontok és bezárt szögek',
    subtitle: 'Párosítsd az időpontokat a mutatók által bezárt pontos szöggel!',
    pairs: [
      { id: 'eam2-1', prompt: '3:15-kor a szög', value: '7,5°' },
      { id: 'eam2-2', prompt: '8:20-kor a szög', value: '130°' },
      { id: 'eam2-3', prompt: '2:30-kor a szög', value: '105°' },
      { id: 'eam2-4', prompt: '9:30-kor a szög', value: '105°' },
      { id: 'eam2-5', prompt: '12:20-kor a szög', value: '110°' },
      { id: 'eam2-6', prompt: '7:35-kor a szög', value: '17,5°' },
      { id: 'eam2-7', prompt: '6:30-kor a szög', value: '15°' },
      { id: 'eam2-8', prompt: '1:05-kor a szög', value: '2,5°' }
    ]
  },
  3: {
    title: 'Gyakorlati modellek és képletek',
    subtitle: 'Párosítsd a valós helyzetet a geometriai modelljével!',
    pairs: [
      { id: 'eam3-1', prompt: 'Ablaktörlő lapát mozgása', value: 'Körgyűrű-cikk területe' },
      { id: 'eam3-2', prompt: 'Két mutató relatív szögsebessége', value: '5,5° percenként (11/2 °/perc)' },
      { id: 'eam3-3', prompt: 'Autópálya ív sávkülönbsége', value: 'Δi = (2π · w · α) / 360°' },
      { id: 'eam3-4', prompt: 'Pizza területe átmérőből', value: 'T = (d² · π) / 4' },
      { id: 'eam3-5', prompt: 'Mutatók fedése 12 óra alatt', value: '11 alkalommal történik meg' },
      { id: 'eam3-6', prompt: 'Mutatók merőlegessége 12 óra alatt', value: '22 alkalommal áll elő' },
      { id: 'eam3-7', prompt: 'Öntöző sugara duplázódik', value: 'Öntözött terület négyszereződik' },
      { id: 'eam3-8', prompt: 'Legyező papírfelülete', value: 'T = (π(R² - r²) · α) / 360°' }
    ]
  }
};

export const EverydayArcsSectorsMatcher: React.FC<EverydayArcsSectorsMatcherProps> = (props) => {
  return (
    <MatcherTemplate
      title="Körívek a mindennapokban Párosító"
      subtitle="Kattints az összetartozó időpontokra, szögekre és gyakorlati modellekre!"
      badge="PÁROSÍTÓ JÁTÉK"
      color="purple"
      levels={matcherLevels}
      {...props}
    />
  );
};
