import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface EquationSummaryMatcherProps {
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
    title: '1. Szint: Fogalmak, Alapok és Szabályok',
    subtitle: 'Párosítsd az egyenletekkel kapcsolatos fogalmakat a pontos definíciójukkal!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Alaphalmaz (A)',
        value: 'Azon számok halmaza, amelyek közül a megoldást keressük'
      },
      {
        id: 'p2',
        prompt: 'Megoldáshalmaz (M)',
        value: 'Az alaphalmaz azon elemei, amelyek igazzá teszik az egyenlőséget'
      },
      {
        id: 'p3',
        prompt: 'Azonosság (0x = 0)',
        value: 'Olyan egyenlet, amelynek minden alaphalmazbeli szám megoldása (M = A)'
      },
      {
        id: 'p4',
        prompt: 'Ellentmondás (0x = b, b ≠ 0)',
        value: 'Olyan egyenlet, amelynek nincs megoldása (M = ∅)'
      },
      {
        id: 'p5',
        prompt: 'Lebontogatás módszere',
        value: 'A műveleti sorrend megfordításával kívülről befelé haladó megoldás'
      },
      {
        id: 'p6',
        prompt: 'Mérlegelv',
        value: 'Mindkét oldalhoz ugyanazt a számot adjuk, vonjuk ki, szorozzuk vagy osztjuk'
      },
      {
        id: 'p7',
        prompt: 'Egyenlőtlenség aranyszabálya',
        value: 'Negatív számmal szorozva vagy osztva a relációs jel megfordul'
      },
      {
        id: 'p8',
        prompt: 'Kötelező ellenőrzés',
        value: 'A kapott gyök behelyettesítése az EREDETI egyenlet mindkét oldalába'
      }
    ]
  },
  2: {
    title: '2. Szint: Egyenletek és Pontos Gyökeik',
    subtitle: 'Párosítsd az elsőfokú egyenleteket és egyenlőtlenségeket a helyes megoldásukkal!',
    pairs: [
      {
        id: 'p9',
        prompt: '3x + 12 = 0',
        value: 'x = -4'
      },
      {
        id: 'p10',
        prompt: '5x - 7 = 3x + 9',
        value: 'x = 8'
      },
      {
        id: 'p11',
        prompt: '2(x + 4) = 2x + 8',
        value: 'Azonosság (M = Q, minden szám megoldás)'
      },
      {
        id: 'p12',
        prompt: '4x + 5 = 4x - 3',
        value: 'Ellentmondás (M = ∅, nincs megoldás)'
      },
      {
        id: 'p13',
        prompt: 'x / 3 + 4 = 10',
        value: 'x = 18'
      },
      {
        id: 'p14',
        prompt: '-3x > 12',
        value: 'x < -4 (megfordult a relációs jel)'
      },
      {
        id: 'p15',
        prompt: '2x - 1 = 0',
        value: 'x = 1/2 (vagy 0,5)'
      },
      {
        id: 'p16',
        prompt: '7 - x = 15',
        value: 'x = -8'
      }
    ]
  },
  3: {
    title: '3. Szint: Szöveges Problémák és Algebrai Modelljeik',
    subtitle: 'Párosítsd az életszerű szöveges feladatot a felállított egyenletével és végeredményével!',
    pairs: [
      {
        id: 'p17',
        prompt: 'Egy szám 3-szorosához 8-at adva 29-et kapunk',
        value: '3x + 8 = 29  ⟹  x = 7'
      },
      {
        id: 'p18',
        prompt: 'Anya 30 évvel idősebb fiánál; 4 év múlva 3-szor annyi idős lesz',
        value: '(x + 30) + 4 = 3(x + 4)  ⟹  x = 11 éves a fiú'
      },
      {
        id: 'p19',
        prompt: 'Két dobozban 50 golyó van. Egyikből 5-öt átrakva a másikba egyenlő lesz',
        value: 'x - 5 = (50 - x) + 5  ⟹  x = 30 golyó'
      },
      {
        id: 'p20',
        prompt: 'Egy szám 2-szeresénél 5-tel kisebb szám legfeljebb 15',
        value: '2x - 5 ≤ 15  ⟹  x ≤ 10'
      },
      {
        id: 'p21',
        prompt: 'Egy szám fele és harmada összege 25',
        value: 'x/2 + x/3 = 25  ⟹  x = 30'
      },
      {
        id: 'p22',
        prompt: 'Gondoltam egy számot, kivontam 7-et, poroztam 4-gyel: 20-at kaptam',
        value: '4(x - 7) = 20  ⟹  x = 12'
      },
      {
        id: 'p23',
        prompt: 'Három egymást követő egész szám összege 48',
        value: 'x + (x+1) + (x+2) = 48  ⟹  x = 15'
      },
      {
        id: 'p24',
        prompt: 'Apa 40, fia 12 éves. Hány év múlva lesz apa 2-szer idősebb?',
        value: '40 + x = 2(12 + x)  ⟹  x = 16 év múlva'
      }
    ]
  }
};

export const EquationSummaryMatcher: React.FC<EquationSummaryMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g7-eq-summary-matcher',
  topicTitle = '5. Összefoglalás - Párosító'
}) => {
  const activeLevel = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <MatcherTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
      title="Egyenletek Összefoglalás - Párosító Játék"
      subtitle="Párosítsd a fogalmakat, algebrai levezetéseket és szöveges modelleket!"
      badge="VI. FEJEZET • PÁROSÍTÓ"
      themeColor="indigo"
      levels={matcherLevels}
      grade={7}
      chapterId="g7-percent-equations"
    />
  );
};

export default EquationSummaryMatcher;
