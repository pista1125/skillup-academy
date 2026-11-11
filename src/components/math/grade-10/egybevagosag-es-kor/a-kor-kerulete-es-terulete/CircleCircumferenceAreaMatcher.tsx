import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  CircleRadiusMiniSvg,
  CircleDiameterMiniSvg,
  CircularRingMiniSvg,
  SemicircleMiniSvg
} from './CircleCircumferenceAreaFigures';

interface CircleCircumferenceAreaMatcherProps {
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
    title: 'Körképletek és alapfogalmak',
    subtitle: 'Párosítsd a kör fogalmait a hozzájuk tartozó matematikai képlettel!',
    pairs: [
      { id: 'ccm1-1', prompt: 'Kör kerülete sugárral', promptFigure: <CircleRadiusMiniSvg size={44} />, value: 'K = 2 · r · π' },
      { id: 'ccm1-2', prompt: 'Kör területe sugárral', promptFigure: <CircleRadiusMiniSvg size={44} />, value: 'T = r² · π' },
      { id: 'ccm1-3', prompt: 'Kör kerülete átmérővel', promptFigure: <CircleDiameterMiniSvg size={44} />, value: 'K = d · π' },
      { id: 'ccm1-4', prompt: 'Kör területe átmérővel', promptFigure: <CircleDiameterMiniSvg size={44} />, value: 'T = (d² · π) / 4' },
      { id: 'ccm1-5', prompt: 'Körgyűrű területe', promptFigure: <CircularRingMiniSvg size={44} />, value: 'T = π · (R² - r²)' },
      { id: 'ccm1-6', prompt: 'A π közelítő értéke', value: '3,14159...' },
      { id: 'ccm1-7', prompt: 'Félkör határoló vonala', promptFigure: <SemicircleMiniSvg size={44} />, value: 'K = rπ + 2r' },
      { id: 'ccm1-8', prompt: 'Sugár és átmérő kapcsolata', value: 'd = 2r (r = d/2)' }
    ]
  },
  2: {
    title: 'Konkrét számítások r = 10 cm esetén',
    subtitle: 'Párosítsd az r = 10 cm-es kör adatait a pontos értékükkel!',
    pairs: [
      { id: 'ccm2-1', prompt: 'r = 10 cm kerülete pontosan', promptFigure: <CircleRadiusMiniSvg size={44} />, value: '20π cm (kb. 62,8 cm)' },
      { id: 'ccm2-2', prompt: 'r = 10 cm területe pontosan', promptFigure: <CircleRadiusMiniSvg size={44} />, value: '100π cm² (kb. 314 cm²)' },
      { id: 'ccm2-3', prompt: 'Beírt négyzet oldala', value: 'a = 10√2 cm (kb. 14,1 cm)' },
      { id: 'ccm2-4', prompt: 'Körülírt négyzet oldala', value: 'a = 20 cm' },
      { id: 'ccm2-5', prompt: 'Félkör területe', promptFigure: <SemicircleMiniSvg size={44} />, value: '50π cm² (kb. 157 cm²)' },
      { id: 'ccm2-6', prompt: 'Körgyűrű R=10, r=6', promptFigure: <CircularRingMiniSvg size={44} />, value: 'π(100 - 36) = 64π cm²' },
      { id: 'ccm2-7', prompt: 'Körgyűrű R=10, r=8', promptFigure: <CircularRingMiniSvg size={44} />, value: 'π(100 - 64) = 36π cm²' },
      { id: 'ccm2-8', prompt: 'Kör kerülete d = 10 cm esetén', promptFigure: <CircleDiameterMiniSvg size={44} />, value: '10π cm (kb. 31,4 cm)' }
    ]
  },
  3: {
    title: 'Geometriai tételek és különlegességek',
    subtitle: 'Párosítsd a körök magasabb szintű tételeit a leírásukkal!',
    pairs: [
      { id: 'ccm3-1', prompt: 'Mamikon-tétel', value: 'Körgyűrű területe = belső érintő húr felének négyzetével szorzott π' },
      { id: 'ccm3-2', prompt: 'Arkhimédész közelítése', value: '96 oldalú sokszögekkel: 223/71 < π < 22/7' },
      { id: 'ccm3-3', prompt: 'Lindemann-tétel (1882)', value: 'A π transzcendens, a kör nem négyszögesíthető' },
      { id: 'ccm3-4', prompt: 'Szabályos háromszög beírt sugara', value: 'r = m / 3 (súlypont 2:1 aránya miatt)' },
      { id: 'ccm3-5', prompt: 'Szabályos háromszög körülírt sugara', value: 'R = (2/3) · m' },
      { id: 'ccm3-6', prompt: 'Sugár duplázása', value: 'Kerület 2x, terület 4x növekedése' },
      { id: 'ccm3-7', prompt: 'Sugár triplázása', value: 'Kerület 3x, terület 9x növekedése' },
      { id: 'ccm3-8', prompt: 'Kör négyszögesítése', value: 'Lehetetlen klasszikus szerkesztési probléma' }
    ]
  }
};

export const CircleCircumferenceAreaMatcher: React.FC<CircleCircumferenceAreaMatcherProps> = (props) => {
  return (
    <MatcherTemplate
      title="A kör kerülete és területe Párosító"
      subtitle="Kattints az összetartozó képletekre, számításokra és geometriai tételekre!"
      badge="PÁROSÍTÓ JÁTÉK"
      color="cyan"
      levels={matcherLevels}
      {...props}
    />
  );
};
