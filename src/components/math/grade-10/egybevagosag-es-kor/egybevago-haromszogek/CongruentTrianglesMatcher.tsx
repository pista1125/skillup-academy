import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  IsoscelesMiniSvg,
  PerpendicularBisectorMiniSvg,
  ParallelogramMiniSvg,
  KiteMiniSvg
} from './CongruentTrianglesFigures';

interface CongruentTrianglesMatcherProps {
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
    title: 'Nevezetes vonalak és pontok párosítása',
    subtitle: 'Kösd össze a geometriai vonalakat a metszéspontjuk nevével!',
    pairs: [
      { id: 'ctm1-1', prompt: 'Oldalfelező merőlegesek metszéspontja', promptFigure: <PerpendicularBisectorMiniSvg size={42} />, value: 'Körülírt kör középpontja (O)' },
      { id: 'ctm1-2', prompt: 'Belső szögfelezők metszéspontja', value: 'Beírt kör középpontja (K)' },
      { id: 'ctm1-3', prompt: 'Súlyvonalak metszéspontja', value: 'Súlypont (S, 2:1 osztóarány)' },
      { id: 'ctm1-4', prompt: 'Magasságvonalak metszéspontja', value: 'Magasságpont (M)' },
      { id: 'ctm1-5', prompt: 'Egyenlő szárú alapmagassága', promptFigure: <IsoscelesMiniSvg size={42} />, value: 'Egyben súlyvonal és szögfelező is' },
      { id: 'ctm1-6', prompt: 'Derékszögű átfogójának felezőpontja', value: 'Körülírt kör középpontja (R = c/2)' },
      { id: 'ctm1-7', prompt: 'Középvonal', value: 'Párhuzamos az alappal és fele akkora' },
      { id: 'ctm1-8', prompt: 'Paralelogramma átlói', promptFigure: <ParallelogramMiniSvg size={42} />, value: 'Kölcsönösen felezik egymást' }
    ]
  },
  2: {
    title: 'Képletek és metrikus relációk',
    subtitle: 'Párosítsd a geometriai összefüggéseket a megfelelő formulával!',
    pairs: [
      { id: 'ctm2-1', prompt: 'Szabályos háromszög magassága', value: 'm = (a · √3) / 2' },
      { id: 'ctm2-2', prompt: 'Szabályos háromszög területe', value: 'T = (a² · √3) / 4' },
      { id: 'ctm2-3', prompt: 'Derékszögű beírt körének sugara', value: 'r = (a + b - c) / 2' },
      { id: 'ctm2-4', prompt: 'Derékszögű körülírt körének sugara', value: 'R = c / 2' },
      { id: 'ctm2-5', prompt: 'Rombusz területe átlókkal', value: 'T = (e · f) / 2' },
      { id: 'ctm2-6', prompt: 'Deltoid területe', value: 'T = (e · f) / 2 (átlók merőlegesek)' },
      { id: 'ctm2-7', prompt: 'Háromszög területe beírt körrel', value: 'T = r · s (ahol s = K/2)' },
      { id: 'ctm2-8', prompt: 'Pitagorasz-tétel derékszögben', value: 'a² + b² = c²' }
    ]
  },
  3: {
    title: 'Híres geometriai tételek',
    subtitle: 'Párosítsd a tételt annak pontos matematikai állításával!',
    pairs: [
      { id: 'ctm3-1', prompt: 'Euler-egyenes', value: 'M, S, O egy egyenesre esik, MS:SO = 2:1' },
      { id: 'ctm3-2', prompt: 'Varignon-tétel', value: 'Bármely négyszög oldalfelezői paralelogrammát adnak' },
      { id: 'ctm3-3', prompt: 'Thalész-tétel', value: 'Kör átmérőjéből a körív pontjai derékszögben látszanak' },
      { id: 'ctm3-4', prompt: 'Szögfelező-tétel', value: 'A szögfelező a szemközti oldalt a szomszédos oldalak arányában osztja' },
      { id: 'ctm3-5', prompt: 'Középvonal-tétel', value: 'A középvonal a harmadik oldal felével egyenlő és párhuzamos' },
      { id: 'ctm3-6', prompt: 'Derékszögű súlyvonala (s_c)', value: 'Hossza megegyezik a félátfogóval (c/2)' },
      { id: 'ctm3-7', prompt: 'Csúcsszögek tétele', value: 'A csúcsszögek egymással szigorúan egyenlők' },
      { id: 'ctm3-8', prompt: 'Társszögek tétele', value: 'Párhuzamos szárú belső szögek összege 180°' }
    ]
  }
};

export const CongruentTrianglesMatcher: React.FC<CongruentTrianglesMatcherProps> = (props) => {
  return (
    <MatcherTemplate
      title="Egybevágó háromszögek Párosító"
      subtitle="Kattints az összetartozó tételekre, képletekre és geometriai tulajdonságokra!"
      badge="PÁROSÍTÓ JÁTÉK"
      color="teal"
      levels={matcherLevels}
      {...props}
    />
  );
};
