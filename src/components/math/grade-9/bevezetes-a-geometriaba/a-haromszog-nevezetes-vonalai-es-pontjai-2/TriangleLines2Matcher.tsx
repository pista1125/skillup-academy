import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  AltitudesAndOrthocenterSVG,
  MediansAndCentroidSVG,
  MidlinesSVG,
  EulerLineSVG
} from './TriangleLines2Figures';

interface TriangleLines2MatcherProps {
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
    title: '1. Szint: Alapfogalmak és Nevezetes Vonalak',
    subtitle: 'Párosítsd a nevezetes vonalakat és pontokat a pontos definíciójukkal!',
    pairs: [
      {
        id: 'tm2-1-1',
        prompt: 'Magasságvonal',
        value: 'Csúcsból a szemközti oldalegyenesre bocsátott merőleges',
        figure: <AltitudesAndOrthocenterSVG size={65} />
      },
      {
        id: 'tm2-1-2',
        prompt: 'Súlyvonal',
        value: 'Csúcsot a szemközti oldal felezőpontjával összekötő szakasz',
        figure: <MediansAndCentroidSVG size={65} />
      },
      {
        id: 'tm2-1-3',
        prompt: 'Középvonal',
        value: 'Két oldal felezőpontját összekötő szakasz (k = a / 2)',
        figure: <MidlinesSVG size={65} />
      },
      {
        id: 'tm2-1-4',
        prompt: 'Magasságpont (M)',
        value: 'A három magasságvonal közös metszéspontja'
      },
      {
        id: 'tm2-1-5',
        prompt: 'Súlypont (S)',
        value: 'A három súlyvonal közös metszéspontja (tömegközéppont)'
      },
      {
        id: 'tm2-1-6',
        prompt: 'Euler-egyenes',
        value: 'Az O, S és M pontokat összekötő közös egyenes',
        figure: <EulerLineSVG size={65} />
      }
    ]
  },
  2: {
    title: '2. Szint: Arányok és Területi Tulajdonságok',
    subtitle: 'Keresd meg az összefüggésekhez tartozó pontos arányokat és tulajdonságokat!',
    pairs: [
      {
        id: 'tm2-2-1',
        prompt: 'A súlypont osztásaránya a súlyvonalon',
        value: '2 : 1 arányban oszt a csúcs felől (|AS| = 2/3 · s_a)'
      },
      {
        id: 'tm2-2-2',
        prompt: 'A három súlyvonal területi felosztása',
        value: '6 darab egyenlő területű (T / 6) kis háromszögre oszt'
      },
      {
        id: 'tm2-2-3',
        prompt: 'A három középvonal geometriai felosztása',
        value: '4 darab egymással egybevágó kis háromszögre oszt (T_kis = T / 4)'
      },
      {
        id: 'tm2-2-4',
        prompt: 'Euler-egyenes távolságaránya',
        value: '|MS| = 2 · |SO| (a súlypont kétszer közelebb van O-hoz)'
      },
      {
        id: 'tm2-2-5',
        prompt: 'Középvonal hossza és iránya',
        value: 'Párhuzamos a szemközti oldallal és feleakkora, mint az'
      },
      {
        id: 'tm2-2-6',
        prompt: 'Szabályos háromszög nevezetes pontjai',
        value: 'M, S, O és I mind a négy pont egybeesik'
      }
    ]
  },
  3: {
    title: '3. Szint: Számításos és Speciális Helyzetek',
    subtitle: 'Párosítsd a konkrét geometriai feladatokat a helyes eredménnyel!',
    pairs: [
      {
        id: 'tm2-3-1',
        prompt: 'Ha a súlyvonal hossza s = 18 cm, mekkora a csúcs felőli szakasz?',
        value: '12 cm (mert 2/3 · 18 = 12 cm)'
      },
      {
        id: 'tm2-3-2',
        prompt: 'Ha a súlypont és az oldalfelező távolsága 5 cm, mekkora a teljes súlyvonal?',
        value: '15 cm (mert az 1 rész = 5 cm, így a 3 rész = 15 cm)'
      },
      {
        id: 'tm2-3-3',
        prompt: 'Hol helyezkedik el a magasságpont tompaszögű háromszögben?',
        value: 'A háromszögön kívül, a tompaszög mögötti külső szögtartományban'
      },
      {
        id: 'tm2-3-4',
        prompt: 'Hol helyezkedik el a magasságpont derékszögű háromszögben?',
        value: 'Pontosan a derékszögű csúcsban'
      },
      {
        id: 'tm2-3-5',
        prompt: 'Ha |SO| = 4 cm az Euler-egyenesen, mekkora az |MS| távolság?',
        value: '8 cm (mert |MS| = 2 · |SO|)'
      },
      {
        id: 'tm2-3-6',
        prompt: 'Ha a háromszög kerülete 36 cm, mekkora a középvonalak által határolt háromszög kerülete?',
        value: '18 cm (mert pontosan a fele az eredetinek: K / 2)'
      }
    ]
  }
};

export const TriangleLines2Matcher: React.FC<TriangleLines2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-bevezetes-geometriaba',
  topicTitle = 'A háromszög nevezetes vonalai és pontjai II.'
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
      themeColor="teal"
      storageKey="grade9-triangle-lines-2-matcher"
      levels={matcherLevels}
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • PÁROSÍTÓ JÁTÉK"
    />
  );
};

