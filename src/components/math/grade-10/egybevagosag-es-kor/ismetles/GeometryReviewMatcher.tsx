import React from 'react';
import { MatcherTemplate, MatchPair, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  PillarCongruenceMiniSvg,
  PillarCircleMiniSvg,
  PillarAnglesMiniSvg,
  PillarPolygonsMiniSvg
} from './GeometryReviewFigures';

interface GeometryReviewMatcherProps {
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

const easyPairs: MatchPair[] = [
  { id: 'p1', prompt: 'Kör kerülete', promptFigure: <PillarCircleMiniSvg size={44} />, value: 'K = 2rπ', left: 'Kör kerülete', right: 'K = 2rπ' },
  { id: 'p2', prompt: 'Kör területe', promptFigure: <PillarCircleMiniSvg size={44} />, value: 'T = r²π', left: 'Kör területe', right: 'T = r²π' },
  { id: 'p3', prompt: 'Középponti & kerületi szög', promptFigure: <PillarAnglesMiniSvg size={44} />, value: 'α = 2β', left: 'Középponti & kerületi szög', right: 'α = 2β' },
  { id: 'p4', prompt: 'Thálész-tétel', value: 'Átmérő feletti szög 90°', left: 'Thálész-tétel', right: 'Átmérő feletti szög 90°' },
  { id: 'p5', prompt: 'Húrnégyszög szögei', promptFigure: <PillarPolygonsMiniSvg size={44} />, value: 'α + γ = 180°', left: 'Húrnégyszög szögei', right: 'α + γ = 180°' },
  { id: 'p6', prompt: 'Érintőnégyszög oldalai', promptFigure: <PillarPolygonsMiniSvg size={44} />, value: 'a + c = b + d', left: 'Érintőnégyszög oldalai', right: 'a + c = b + d' },
  { id: 'p7', prompt: 'Hatszög R sugara', value: 'R = a', left: 'Hatszög R sugara', right: 'R = a' },
  { id: 'p8', prompt: 'Körgyűrű területe', promptFigure: <PillarCircleMiniSvg size={44} />, value: 'T = (R² - r²)π', left: 'Körgyűrű területe', right: 'T = (R² - r²)π' }
];

const mediumPairs: MatchPair[] = [
  { id: 'pm1', prompt: 'Körív hossza', value: 'i = 2rπ · (α / 360°)', left: 'Körív hossza', right: 'i = 2rπ · (α / 360°)' },
  { id: 'pm2', prompt: 'Körcikk területe', value: 'Tc = r²π · (α / 360°)', left: 'Körcikk területe', right: 'Tc = r²π · (α / 360°)' },
  { id: 'pm3', prompt: 'Körcikk T ívhosszal', value: 'Tc = (i · r) / 2', left: 'Körcikk T ívhosszal', right: 'Tc = (i · r) / 2' },
  { id: 'pm4', prompt: 'Érintőnégyszög T', promptFigure: <PillarPolygonsMiniSvg size={44} />, value: 'T = s · r', left: 'Érintőnégyszög T', right: 'T = s · r' },
  { id: 'pm5', prompt: 'Szabályos háromszög R', value: 'R = (a√3) / 3', left: 'Szabályos háromszög R', right: 'R = (a√3) / 3' },
  { id: 'pm6', prompt: 'Szabályos háromszög r', value: 'r = (a√3) / 6', left: 'Szabályos háromszög r', right: 'r = (a√3) / 6' },
  { id: 'pm7', prompt: 'Szabályos hatszög r', value: 'r = (a√3) / 2', left: 'Szabályos hatszög r', right: 'r = (a√3) / 2' },
  { id: 'pm8', prompt: 'Négyzet R sugara', value: 'R = (a√2) / 2', left: 'Négyzet R sugara', right: 'R = (a√2) / 2' }
];

const hardPairs: MatchPair[] = [
  { id: 'ph1', prompt: 'Derékszögű háromszög r', promptFigure: <PillarCongruenceMiniSvg size={44} />, value: 'r = (a + b - c) / 2', left: 'Derékszögű háromszög r', right: 'r = (a + b - c) / 2' },
  { id: 'ph2', prompt: 'Derékszögű háromszög R', promptFigure: <PillarCongruenceMiniSvg size={44} />, value: 'R = c / 2', left: 'Derékszögű háromszög R', right: 'R = c / 2' },
  { id: 'ph3', prompt: 'Szimmetrikus érintőtrapéz b', promptFigure: <PillarPolygonsMiniSvg size={44} />, value: 'b = (a + c) / 2', left: 'Szimmetrikus érintőtrapéz b', right: 'b = (a + c) / 2' },
  { id: 'ph4', prompt: 'Érintőtrapéz magassága', value: 'm = 2r', left: 'Érintőtrapéz magassága', right: 'm = 2r' },
  { id: 'ph5', prompt: 'Körcikk teljes kerülete', promptFigure: <PillarCircleMiniSvg size={44} />, value: 'K = i + 2r', left: 'Körcikk teljes kerülete', right: 'K = i + 2r' },
  { id: 'ph6', prompt: 'Középpont távolsága húrtól', value: 'd = √(r² - (h/2)²)', left: 'Középpont távolsága húrtól', right: 'd = √(r² - (h/2)²)' },
  { id: 'ph7', prompt: 'Körív és radián', value: 'i = r · α_rad', left: 'Körív és radián', right: 'i = r · α_rad' },
  { id: 'ph8', prompt: 'Hatszög teljes területe', value: 'T = 6 · (a²√3 / 4)', left: 'Hatszög teljes területe', right: 'T = 6 · (a²√3 / 4)' }
];

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: 'Geometriai alaptételek és képletek',
    subtitle: 'Párosítsd a kör és a sokszögek alapvető összefüggéseit!',
    pairs: easyPairs
  },
  2: {
    title: 'Körkörös képletek és beírt körök',
    subtitle: 'Keresd meg a körívek, cikkek és szabályos sokszögek sugarainak képletét!',
    pairs: mediumPairs
  },
  3: {
    title: 'Összetett geometriai kapcsolatok',
    subtitle: 'Kapcsold össze a speciális sokszögek és metrikus relációk formuláit!',
    pairs: hardPairs
  }
};

export const GeometryReviewMatcher: React.FC<GeometryReviewMatcherProps> = (props) => {
  return (
    <MatcherTemplate
      topicId={props.topicId || "g10-geo-ismetles"}
      topicTitle={props.topicTitle || "Gyakorlás, tudáspróba"}
      levels={matcherLevels}
      easyPairs={easyPairs}
      mediumPairs={mediumPairs}
      hardPairs={hardPairs}
      {...props}
    />
  );
};
