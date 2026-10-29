import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  CircumcircleSvg,
  IncircleSvg,
  RightTriangleCirclesSvg
} from './TriangleLines1Figures';

interface TriangleLines1MatcherProps {
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
    title: '1. Szint: Nevezetes Vonalak és Középpontok',
    subtitle: 'Párosítsd a nevezetes vonalakat a megfelelő metszésponttal és körrel!',
    pairs: [
      {
        id: 'tm1-1',
        prompt: 'Oldalfelező merőlegesek metszéspontja (O)',
        value: 'A körülírt kör középpontja (mindhárom csúcstól egyenlő távol)',
        figure: <CircumcircleSvg size={65} />
      },
      {
        id: 'tm1-2',
        prompt: 'Belső szögfelezők metszéspontja (I)',
        value: 'A beírt kör középpontja (mindhárom oldaltól egyenlő távol)',
        figure: <IncircleSvg size={65} />
      },
      {
        id: 'tm1-3',
        prompt: 'Körülírt kör középpontja derékszögű háromszögben',
        value: 'Az átfogó felezőpontja (R = c / 2)',
        figure: <RightTriangleCirclesSvg size={65} />
      },
      {
        id: 'tm1-4',
        prompt: 'Beírt kör középpontjának helyzete',
        value: 'Mindig a háromszög belsejében van'
      },
      {
        id: 'tm1-5',
        prompt: 'Körülírt kör középpontja tompaszögű háromszögben',
        value: 'Mindig a háromszögön kívül található'
      },
      {
        id: 'tm1-6',
        prompt: 'Körülírt kör középpontja hegyesszögű háromszögben',
        value: 'Mindig a háromszög belsejében található'
      }
    ]
  },
  2: {
    title: '2. Szint: Képletek és Derékszögű Háromszög Körei',
    subtitle: 'Párosítsd az összefüggéseket a megfelelő sugarakkal és területekkel!',
    pairs: [
      {
        id: 'tm2-1',
        prompt: 'Derékszögű háromszög: a = 6, b = 8, c = 10',
        value: 'R = 5 cm (10 / 2) és r = 2 cm ((6 + 8 - 10) / 2)'
      },
      {
        id: 'tm2-2',
        prompt: 'Derékszögű háromszög beírt körének sugara',
        value: 'r = (a + b - c) / 2'
      },
      {
        id: 'tm2-3',
        prompt: 'Bármely háromszög beírt körének sugara a területből',
        value: 'r = T / s (ahol s a félkerület)'
      },
      {
        id: 'tm2-4',
        prompt: 'Derékszögű háromszög: a = 5, b = 12, c = 13',
        value: 'R = 6,5 cm és r = 2 cm'
      },
      {
        id: 'tm2-5',
        prompt: 'Szabályos háromszögben a nevezetes pontok',
        value: 'Egyetlen pontba esnek (O = I = M = S)'
      },
      {
        id: 'tm2-6',
        prompt: 'Belső szögfelező tétele az oldalarányokról',
        value: 'x / y = b / c'
      }
    ]
  },
  3: {
    title: '3. Szint: Számításos és Emelt Szintű Feladatok',
    subtitle: 'Párosítsd a geometriai konfigurációkat a pontos számítási eredményekkel!',
    pairs: [
      {
        id: 'tm3-1',
        prompt: 'a = 12 cm szabályos háromszög körülírt körének sugara',
        value: 'R = (2/3) · m = (2/3) · 6√3 = 4√3 cm'
      },
      {
        id: 'tm3-2',
        prompt: 'a = 12 cm szabályos háromszög beírt körének sugara',
        value: 'r = (1/3) · m = (1/3) · 6√3 = 2√3 cm'
      },
      {
        id: 'tm3-3',
        prompt: 'Derékszögű háromszögben R = 10 cm és r = 4 cm',
        value: 'Átfogó c = 20 cm, befogók összege a + b = 28 cm'
      },
      {
        id: 'tm3-4',
        prompt: 'Háromszög oldalai 13, 14, 15 (T = 84, s = 21)',
        value: 'r = 84 / 21 = 4 cm'
      },
      {
        id: 'tm3-5',
        prompt: 'Szögfelező osztása: b = 8 cm, c = 12 cm, a = 15 cm',
        value: 'x = 6 cm és y = 9 cm (2 : 3 arányban)'
      },
      {
        id: 'tm3-6',
        prompt: 'Egyenlő szárú háromszög alapja 12 cm, szára 10 cm',
        value: 'm = 8 cm, T = 48 cm², s = 16 cm => r = 3 cm'
      }
    ]
  }
};

export const TriangleLines1Matcher: React.FC<TriangleLines1MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-bevezetes-geometriaba',
  topicTitle = 'A háromszög nevezetes vonalai és pontjai I.'
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
      themeColor="purple"
      storageKey="grade9-triangle-lines-1-matcher"
      levels={matcherLevels}
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • PÁROSÍTÓ JÁTÉK"
    />
  );
};

