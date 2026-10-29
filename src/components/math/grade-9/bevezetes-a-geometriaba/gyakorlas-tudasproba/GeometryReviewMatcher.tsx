import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  ComprehensiveGeometryOverviewSVG,
  PythagorasAndSpecialTrianglesSVG,
  ThalesAndTangentsSummarySVG,
  TriangleAreaMasterFormulasSVG
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

export const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Alapfogalmak és Nevezetes Pontok',
    subtitle: 'Párosítsd a geometriai fogalmakat és nevezetes pontokat a definíciójukkal!',
    pairs: [
      {
        id: 'grm1-1',
        prompt: 'Körülírt kör középpontja (O)',
        value: 'Az oldalfelező merőlegesek közös metszéspontja, egyenlő távol van a 3 csúcstól'
      },
      {
        id: 'grm1-2',
        prompt: 'Beírt kör középpontja (I)',
        value: 'A belső szögfelezők közös metszéspontja, egyenlő távol van a 3 oldaltól'
      },
      {
        id: 'grm1-3',
        prompt: 'Súlypont (S)',
        value: 'A súlyvonalak metszéspontja, a csúcstól mérve 2 : 1 arányban osztja azokat'
      },
      {
        id: 'grm1-4',
        prompt: 'Magasságpont (M)',
        value: 'A csúcsokból a szemközti oldalegyenesekre bocsátott merőlegesek metszéspontja'
      },
      {
        id: 'grm1-5',
        prompt: 'Háromszög-egyenlőtlenség',
        value: 'Bármely két oldal összege szigorúan nagyobb a harmadik oldalnál (a + b > c)'
      },
      {
        id: 'grm1-6',
        prompt: 'Csúcsszögek',
        value: 'Két metsző egyenes által alkotott egymással szemközti szögek, melyek mindig egyenlők'
      }
    ]
  },
  2: {
    title: '2. Szint: Geometriai Képletek és Arányok',
    subtitle: 'Párosítsd a nevezetes képleteket az alkalmazásukkal és jelentésükkel!',
    pairs: [
      {
        id: 'grm2-1',
        prompt: 'Pitagorasz-tétel',
        value: 'a² + b² = c² (derékszögű háromszög befogói és átfogója)'
      },
      {
        id: 'grm2-2',
        prompt: '30° - 60° - 90° háromszög oldalai',
        value: 'a,  a√3,  2a (a 30°-os szöggel szemközti befogó fele az átfogónak)'
      },
      {
        id: 'grm2-3',
        prompt: '45° - 45° - 90° háromszög átfogója',
        value: 'c = a√2 (egy "a" oldalú négyzet átlója)'
      },
      {
        id: 'grm2-4',
        prompt: 'Szabályos háromszög területe',
        value: 'T = (a² · √3) / 4'
      },
      {
        id: 'grm2-5',
        prompt: 'Beírt kör sugara területtel',
        value: 'r = T / s (ahol s a félkerület)'
      },
      {
        id: 'grm2-6',
        prompt: 'Euler-egyenes aránya',
        value: 'MS : SO = 2 : 1 (M, S, O egy egyenesen fekszik)'
      }
    ]
  },
  3: {
    title: '3. Szint: Tételek, Érintők és Mértani Helyek',
    subtitle: 'Párosítsd a mélyebb tételeket a pontos matematikai állításukkal!',
    pairs: [
      {
        id: 'grm3-1',
        prompt: 'Thalész-tétel',
        value: 'A kör átmérőjének tetszőleges kerületi pontjából az átmérő 90° alatt látszik'
      },
      {
        id: 'grm3-2',
        prompt: 'Külső szög tétele',
        value: 'A háromszög bármely külső szöge egyenlő a két nem mellette fekvő belső szög összegével'
      },
      {
        id: 'grm3-3',
        prompt: 'Hérón-képlet',
        value: 'T = √[s(s-a)(s-b)(s-c)], ahol s = (a+b+c)/2'
      },
      {
        id: 'grm3-4',
        prompt: 'Kör érintőjének tulajdonsága',
        value: 'Az érintési pontba húzott sugár merőleges az érintő egyenesre (r ⊥ e)'
      },
      {
        id: 'grm3-5',
        prompt: 'Magasságtétel',
        value: 'm_c² = p · q (az átfogóhoz tartozó magasság mértani közepe a szeleteknek)'
      },
      {
        id: 'grm3-6',
        prompt: 'Középvonal tulajdonsága',
        value: 'Párhuzamos a harmadik oldallal és hossza pontosan a fele annak'
      }
    ]
  }
};

export const GeometryReviewMatcher: React.FC<GeometryReviewMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-bevezetes-geometriaba',
  topicTitle = 'Gyakorlás, tudáspróba'
}) => {
  return (
    <MatcherTemplate
      level={level}
      currentLevel={currentLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="red"
      storageKey="grade9-geometry-review-matcher"
      levels={matcherLevels}
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • PÁROSÍTÓ JÁTÉK"
    />
  );
};

