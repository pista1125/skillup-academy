import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { TrackMiniSvg, SquareCirclesMiniSvg } from './CirclePracticeFigures';

interface CirclePracticeMatcherProps {
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
    title: 'Kombinált alakzatok és alapelemeik',
    subtitle: 'Párosítsd az alakzatot a kerületének vagy területének összefüggésével!',
    pairs: [
      { id: 'cpm1-1', prompt: 'Stadion pálya kerülete', promptFigure: <TrackMiniSvg size={44} />, value: 'K = 2L + 2rπ' },
      { id: 'cpm1-2', prompt: 'Stadion pálya területe', promptFigure: <TrackMiniSvg size={44} />, value: 'T = 2rL + r²π' },
      { id: 'cpm1-3', prompt: 'Négyzetbe írt kör sugara', promptFigure: <SquareCirclesMiniSvg size={44} />, value: 'r = a / 2' },
      { id: 'cpm1-4', prompt: 'Négyzet körülírt kör sugara', promptFigure: <SquareCirclesMiniSvg size={44} />, value: 'R = a√2 / 2' },
      { id: 'cpm1-5', prompt: 'Négyzet körülírt / beírt területarány', promptFigure: <SquareCirclesMiniSvg size={44} />, value: 'Pontosan 2' },
      { id: 'cpm1-6', prompt: 'Hulladék négyzetből kör kivágásakor', promptFigure: <SquareCirclesMiniSvg size={44} />, value: '1 - π/4 ≈ 21,5%' },
      { id: 'cpm1-7', prompt: 'Forgó kerék által megtett út', value: 's = n · 2rπ' },
      { id: 'cpm1-8', prompt: 'Futópálya sávkülönbsége kanyarban', promptFigure: <TrackMiniSvg size={44} />, value: 'ΔK = 2π · w' }
    ]
  },
  2: {
    title: 'Konkrét számítások méretekkel',
    subtitle: 'Párosítsd a feladatot a numerikus eredményével!',
    pairs: [
      { id: 'cpm2-1', prompt: 'a = 10 cm négyzet beírt körének területe', value: '25π cm² (kb. 78,5 cm²)' },
      { id: 'cpm2-2', prompt: 'a = 10 cm négyzet körülírt körének területe', value: '50π cm² (kb. 157 cm²)' },
      { id: 'cpm2-3', prompt: 'd = 50 cm kerék 100 fordulattal', value: '157 méter' },
      { id: 'cpm2-4', prompt: 'w = 1,22 m sávszélesség esetén ΔK', value: 'kb. 7,66 méter' },
      { id: 'cpm2-5', prompt: '3 érintkező 10 cm-es érme közti terület', value: 'kb. 16,1 cm²' },
      { id: 'cpm2-6', prompt: '6 és 8 cm befogójú derékszögű körülírt sugara', value: '5 cm' },
      { id: 'cpm2-7', prompt: '6 és 8 cm befogójú derékszögű beírt sugara', value: '2 cm' },
      { id: 'cpm2-8', prompt: 'R = 4 m és r = 3 m körgyűrű területe', value: '7π m² (kb. 22 m²)' }
    ]
  },
  3: {
    title: 'Elméleti tételek és arányok',
    subtitle: 'Párosítsd a geometriai tételeket azok lényegével!',
    pairs: [
      { id: 'cpm3-1', prompt: 'Hippokratész holdacskái', value: 'Holdacskák területe = derékszögű háromszög területe' },
      { id: 'cpm3-2', prompt: 'Izoperimetrikus tétel', value: 'Adott kerület mellett a kör területe a maximális' },
      { id: 'cpm3-3', prompt: 'Szabályos 8-szög és kör területaránya', value: 'kb. 90%' },
      { id: 'cpm3-4', prompt: 'Rombusz beírt köre', value: 'Átmérője = rombusz magassága (2r = m)' },
      { id: 'cpm3-5', prompt: 'Téglalapba írható kör feltétele', value: 'Csak négyzet esetén lehetséges' },
      { id: 'cpm3-6', prompt: 'Konzervdobozok átkötése 4 db esetén', value: 'L = 4 · d + d · π' },
      { id: 'cpm3-7', prompt: 'Derékszögű háromszögben r', value: 'r = (a + b - c) / 2' },
      { id: 'cpm3-8', prompt: 'Derékszögű háromszögben R', value: 'R = c / 2 (Thalész)' }
    ]
  }
};

export const CirclePracticeMatcher: React.FC<CirclePracticeMatcherProps> = (props) => {
  return (
    <MatcherTemplate
      title="Körszámítások és Összetett Alakzatok Párosító"
      subtitle="Kattints az összetartozó feladványokra, képletekre és eredményekre!"
      badge="PÁROSÍTÓ JÁTÉK"
      color="indigo"
      levels={matcherLevels}
      {...props}
    />
  );
};
