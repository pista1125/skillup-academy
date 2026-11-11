import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { CentralAngleMiniSvg, SectorMiniSvg, SegmentMiniSvg } from './CentralAngleArcSectorFigures';

interface CentralAngleArcSectorMatcherProps {
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
    title: 'Középponti szögek és törtrészek',
    subtitle: 'Párosítsd a szögeket azzal, hogy a teljes kör hányadrészét alkotják!',
    pairs: [
      { id: 'cam1-1', prompt: '180°-os középponti szög', value: 'Félkör (1/2 rész)' },
      { id: 'cam1-2', prompt: '90°-os középponti szög', value: 'Negyedkör (1/4 rész)' },
      { id: 'cam1-3', prompt: '60°-os középponti szög', value: 'Hatodkör (1/6 rész)' },
      { id: 'cam1-4', prompt: '45°-os középponti szög', value: 'Nyolcadkör (1/8 rész)' },
      { id: 'cam1-5', prompt: '120°-os középponti szög', value: 'Harmadkör (1/3 rész)' },
      { id: 'cam1-6', prompt: '30°-os középponti szög', value: 'Tizenketted kör (1/12 rész)' },
      { id: 'cam1-7', prompt: '360°-os teljes szög', value: 'Teljes kör (1 egész)' },
      { id: 'cam1-8', prompt: '72°-os középponti szög', value: 'Ötödkör (1/5 rész)' }
    ]
  },
  2: {
    title: 'Képletek és összefüggések',
    subtitle: 'Párosítsd a geometriai mennyiségeket a képletükkel!',
    pairs: [
      { id: 'cam2-1', prompt: 'Ívhossz képlete', promptFigure: <CentralAngleMiniSvg size={44} />, value: 'i = (2rπ · α) / 360°' },
      { id: 'cam2-2', prompt: 'Körcikk területe szöggel', promptFigure: <SectorMiniSvg size={44} />, value: 'T = (r²π · α) / 360°' },
      { id: 'cam2-3', prompt: 'Körcikk területe ívhosszal', promptFigure: <SectorMiniSvg size={44} />, value: 'T = (i · r) / 2' },
      { id: 'cam2-4', prompt: 'Körcikk kerülete', promptFigure: <SectorMiniSvg size={44} />, value: 'K = i + 2r' },
      { id: 'cam2-5', prompt: 'Körszelet területe', promptFigure: <SegmentMiniSvg size={44} />, value: 'T_szelet = T_cikk - T_△' },
      { id: 'cam2-6', prompt: '1 radián értéke fokban', promptFigure: <CentralAngleMiniSvg size={44} />, value: 'kb. 57,3° (180° / π)' },
      { id: 'cam2-7', prompt: 'π radián értéke fokban', value: '180°' },
      { id: 'cam2-8', prompt: '2π radián értéke fokban', value: '360°' }
    ]
  },
  3: {
    title: 'Nevezetes ívek és húrok r sugár esetén',
    subtitle: 'Mekkora húr és ívhossz tartozik a nevezetes szögekhez?',
    pairs: [
      { id: 'cam3-1', prompt: '60°-hoz tartozó húr hossza', value: 'd = r (szabályos háromszög)' },
      { id: 'cam3-2', prompt: '90°-hoz tartozó húr hossza', value: 'd = r · √2 (Pitagorasz)' },
      { id: 'cam3-3', prompt: '120°-hoz tartozó húr hossza', value: 'd = r · √3' },
      { id: 'cam3-4', prompt: '180°-hoz tartozó húr hossza', value: 'd = 2r (átmérő)' },
      { id: 'cam3-5', prompt: 'Maximális területű körcikk szöge', value: 'α = 2 radián (i = 2r)' },
      { id: 'cam3-6', prompt: '90°-os körszelet területe', value: 'T = r² · (π/4 - 1/2)' },
      { id: 'cam3-7', prompt: '60°-os körszelet területe', value: 'T = r² · (π/6 - √3/4)' },
      { id: 'cam3-8', prompt: 'Beírt kör sugara 60°-os cikkben', value: 'ρ = r / 3' }
    ]
  }
};

export const CentralAngleArcSectorMatcher: React.FC<CentralAngleArcSectorMatcherProps> = (props) => {
  return (
    <MatcherTemplate
      title="Középponti szög, körív, körcikk Párosító"
      subtitle="Kattints az összetartozó szögekre, képletekre és geometriai mennyiségekre!"
      badge="PÁROSÍTÓ JÁTÉK"
      color="blue"
      levels={matcherLevels}
      {...props}
    />
  );
};
