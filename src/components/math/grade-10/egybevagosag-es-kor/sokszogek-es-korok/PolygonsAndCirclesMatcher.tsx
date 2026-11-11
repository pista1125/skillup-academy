import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  CyclicQuadMiniSvg,
  TangentialQuadMiniSvg,
  HexagonMiniSvg,
  ThalesMiniatureSvg
} from './PolygonsAndCirclesFigures';

interface PolygonsAndCirclesMatcherProps {
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
    title: 'Húrnégyszögek, érintőnégyszögek és hatszög',
    subtitle: 'Párosítsd a sokszögek tulajdonságait a megfelelő állítással!',
    pairs: [
      { id: 'p1', prompt: 'Húrnégyszög', promptFigure: <CyclicQuadMiniSvg size={44} />, value: 'Csúcsai egy körön vannak' },
      { id: 'p2', prompt: 'Érintőnégyszög', promptFigure: <TangentialQuadMiniSvg size={44} />, value: 'Oldalai egy kört érintenek' },
      { id: 'p3', prompt: 'Húrnégyszög szögei', promptFigure: <CyclicQuadMiniSvg size={44} />, value: 'Szemköztiek összege 180°' },
      { id: 'p4', prompt: 'Érintőnégyszög oldalai', promptFigure: <TangentialQuadMiniSvg size={44} />, value: 'Szemköztiek összege egyenlő' },
      { id: 'p5', prompt: 'Thálész-tétel', promptFigure: <ThalesMiniatureSvg size={44} />, value: 'Átmérő feletti szög 90°' },
      { id: 'p6', prompt: 'Szabályos hatszög R', promptFigure: <HexagonMiniSvg size={44} />, value: 'Egyenlő az oldalával (R = a)' },
      { id: 'p7', prompt: 'Téglalap', value: 'Mindig húrnégyszög' },
      { id: 'p8', prompt: 'Rombusz', value: 'Mindig érintőnégyszög' }
    ]
  },
  2: {
    title: 'Számítások és nevezetes összefüggések',
    subtitle: 'Párosítsd a feladatokat az eredményükkel!',
    pairs: [
      { id: 'pm1', prompt: 'Húrnégyszög α = 65°', promptFigure: <CyclicQuadMiniSvg size={44} />, value: 'Szemközti γ = 115°' },
      { id: 'pm2', prompt: 'Érintőnégyszög a=4, c=8', promptFigure: <TangentialQuadMiniSvg size={44} />, value: 'Szemközti b + d = 12' },
      { id: 'pm3', prompt: 'Szabályos háromszög r', value: 'r = m / 3 = (a√3)/6' },
      { id: 'pm4', prompt: 'Szabályos háromszög R', value: 'R = 2m / 3 = (a√3)/3' },
      { id: 'pm5', prompt: 'Négyzet beírt köre', value: 'r = a / 2' },
      { id: 'pm6', prompt: 'Négyzet köré írt köre', value: 'R = (a√2) / 2' },
      { id: 'pm7', prompt: 'Húrtrapéz', promptFigure: <CyclicQuadMiniSvg size={44} />, value: 'Mindig köré írható kör' },
      { id: 'pm8', prompt: 'Érintő és sugár szöge', promptFigure: <ThalesMiniatureSvg size={44} />, value: 'Pontosan 90°' }
    ]
  },
  3: {
    title: 'Emelt szintű tételek és képletek',
    subtitle: 'Párosítsd az elméleti tételeket azok matematikai alakjával!',
    pairs: [
      { id: 'ph1', prompt: 'Érintőnégyszög T', promptFigure: <TangentialQuadMiniSvg size={44} />, value: 'T = s · r = (K / 2) · r' },
      { id: 'ph2', prompt: 'Derékszögű háromszög r', value: 'r = (a + b - c) / 2' },
      { id: 'ph3', prompt: 'Derékszögű háromszög R', promptFigure: <ThalesMiniatureSvg size={44} />, value: 'R = c / 2 (átfogó fele)' },
      { id: 'ph4', prompt: 'Szabályos hatszög r', promptFigure: <HexagonMiniSvg size={44} />, value: 'r = (a√3) / 2' },
      { id: 'ph5', prompt: 'Húrnégyszög α=2x, γ=3x', promptFigure: <CyclicQuadMiniSvg size={44} />, value: '5x = 180° => x = 36°' },
      { id: 'ph6', prompt: 'Deltoid + húrnégyszög', value: 'Két szemközti szöge 90°' },
      { id: 'ph7', prompt: 'Körgyűrű négyzet körül', value: 'T = π·(R² - r²) = π·a²/4' },
      { id: 'ph8', prompt: 'Szabályos tízszög', value: 'Középponti szög 36°' }
    ]
  }
};

export const PolygonsAndCirclesMatcher: React.FC<PolygonsAndCirclesMatcherProps> = (props) => {
  return (
    <MatcherTemplate
      topicId="g10-geo-sokszogek-es-korok"
      topicTitle="Sokszögek és körök kapcsolata"
      title="Sokszögek és körök kapcsolata Párosító"
      subtitle="Kattints a kártyákra, és találd meg a feladvány-eredmény párokat!"
      badge="PÁROSÍTÓ JÁTÉK"
      themeColor="amber"
      levels={matcherLevels}
      {...props}
    />
  );
};
