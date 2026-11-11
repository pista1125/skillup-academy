import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  SymmTangentialTrapezoidMiniSvg,
  RightTangentialTrapezoidMiniSvg,
  RegularOctagonMiniSvg
} from './PolygonCirclePracticeFigures';
import { HexagonMiniSvg } from '../sokszogek-es-korok/PolygonsAndCirclesFigures';

interface PolygonCirclePracticeMatcherProps {
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
    title: 'Szabályos hatszög és érintőtrapéz alapok',
    subtitle: 'Párosítsd a sokszögek alapfogalmait és képleteit!',
    pairs: [
      { id: 'p1', prompt: 'Hatszög alkotó háromszögei', promptFigure: <HexagonMiniSvg size={44} />, value: '6 db szabályos háromszög' },
      { id: 'p2', prompt: 'Hatszög R sugara', promptFigure: <HexagonMiniSvg size={44} />, value: 'Egyenlő az a oldallal' },
      { id: 'p3', prompt: 'Érintőtrapéz magassága', promptFigure: <SymmTangentialTrapezoidMiniSvg size={44} />, value: 'm = 2r (beírt kör átmérője)' },
      { id: 'p4', prompt: 'Szimmetrikus érintőtrapéz szára', promptFigure: <SymmTangentialTrapezoidMiniSvg size={44} />, value: 'b = (a + c) / 2' },
      { id: 'p5', prompt: 'Húrtrapéz szögei', value: 'Szemközti szögek összege 180°' },
      { id: 'p6', prompt: 'Négyzet beírt kör átmérője', value: '2r = a' },
      { id: 'p7', prompt: 'Négyzet köré írt kör átmérője', value: '2R = a√2 (átló)' },
      { id: 'p8', prompt: 'Thálész-szög', value: 'Mindig 90° az átmérő felett' }
    ]
  },
  2: {
    title: 'Konkrét számítások és területek',
    subtitle: 'Párosítsd a méreteket a kiszámított eredményekkel!',
    pairs: [
      { id: 'pm1', prompt: 'Hatszög a=6 cm, beírt sugár', promptFigure: <HexagonMiniSvg size={44} />, value: 'r = 3√3 cm' },
      { id: 'pm2', prompt: 'Hatszög a=4 cm területe', promptFigure: <HexagonMiniSvg size={44} />, value: 'T = 24√3 cm²' },
      { id: 'pm3', prompt: 'Érintőtrapéz a=18, c=8 szár', promptFigure: <SymmTangentialTrapezoidMiniSvg size={44} />, value: 'b = 13 cm' },
      { id: 'pm4', prompt: 'Érintőtrapéz a=18, c=8 magasság', promptFigure: <SymmTangentialTrapezoidMiniSvg size={44} />, value: 'm = 12 cm' },
      { id: 'pm5', prompt: 'Derékszögű háromszög a=5, b=12, r', value: 'r = 2 cm' },
      { id: 'pm6', prompt: 'Derékszögű háromszög a=5, b=12, R', value: 'R = 6,5 cm' },
      { id: 'pm7', prompt: 'Négyzet köré/beírt kör területarány', value: 'Pontosan 2 : 1' },
      { id: 'pm8', prompt: 'Érintőnégyszög T képlet', promptFigure: <RightTangentialTrapezoidMiniSvg size={44} />, value: 'T = s · r' }
    ]
  },
  3: {
    title: 'Összetett alakzatok és elméleti tételek',
    subtitle: 'Párosítsd a haladó geometriai tételeket az értékükkel!',
    pairs: [
      { id: 'ph1', prompt: 'Szabályos 12-szög R=10 T', value: 'T = 300 cm²' },
      { id: 'ph2', prompt: 'Szabályos 8-szög R=8 T', promptFigure: <RegularOctagonMiniSvg size={44} />, value: 'T = 128√2 cm²' },
      { id: 'ph3', prompt: 'Derékszögű háromszög T (érintési szakaszokkal)', value: 'T = x · y' },
      { id: 'ph4', prompt: 'Brahmagupta-képlet', value: 'T = √((s-a)(s-b)(s-c)(s-d))' },
      { id: 'ph5', prompt: 'Érintő húrtrapéz b=10, r=4 T', promptFigure: <SymmTangentialTrapezoidMiniSvg size={44} />, value: 'T = 80 cm²' },
      { id: 'ph6', prompt: 'Körgyűrű húr fele 10 cm', value: 'T = 100π cm²' },
      { id: 'ph7', prompt: 'Húrdeltoid a=5, b=12 R', value: 'R = 6,5 cm' },
      { id: 'ph8', prompt: 'Hatszög körgyűrű T', promptFigure: <HexagonMiniSvg size={44} />, value: 'T = π/4 · a²' }
    ]
  }
};

export const PolygonCirclePracticeMatcher: React.FC<PolygonCirclePracticeMatcherProps> = (props) => {
  return (
    <MatcherTemplate
      topicId="g10-geo-gyakorlas-sokszogek"
      topicTitle="Érintőtrapézok és szabályos sokszögek"
      title="Érintőtrapézok és szabályos sokszögek Párosító"
      subtitle="Kattints a kártyákra, és találd meg a feladvány-eredmény párokat!"
      badge="PÁROSÍTÓ JÁTÉK"
      themeColor="rose"
      levels={matcherLevels}
      {...props}
    />
  );
};
