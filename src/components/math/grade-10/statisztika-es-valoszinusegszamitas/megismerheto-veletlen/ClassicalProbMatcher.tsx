import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';

interface ClassicalProbMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  level?: number;
  currentLevel?: number;
  onSelectLevel?: (level: number) => void;
  [key: string]: any;
}

const matcherLevels: Record<number, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és a klasszikus valószínűség',
    subtitle: 'Párosítsd a valószínűségszámítás alapfogalmait és a Laplace-modell törvényszerűségeit a helyes magyarázatukkal!',
    pairs: [
      {
        id: 'cpm1-1',
        left: 'Klasszikus valószínűség (Laplace)',
        right: 'P(A) = kedvező elemi események száma / összes elemi esemény száma (k / n)'
      },
      {
        id: 'cpm1-2',
        left: 'Elemi esemény',
        right: 'A véletlen kísérlet egyetlen lehetséges, tovább nem bontható legfinomabb kimenetele'
      },
      {
        id: 'cpm1-3',
        left: 'Két dobókocka elemi eseményeinek száma',
        right: '6 × 6 = 36 egyenlően valószínű mikroszkopikus rácsmező'
      },
      {
        id: 'cpm1-4',
        left: 'Biztos esemény valószínűsége',
        right: 'P(I) = 1 (vagy 100%), minden kísérlet során garantáltan bekövetkezik'
      },
      {
        id: 'cpm1-5',
        left: 'Lehetetlen esemény valószínűsége',
        right: 'P(∅) = 0 (vagy 0%), egyetlen kísérletben sem valósulhat meg'
      },
      {
        id: 'cpm1-6',
        left: 'A relatív gyakoriság stabilitása',
        right: 'Nagy kísérletszám esetén a relatív gyakoriság a valószínűséghez simul'
      },
      {
        id: 'cpm1-7',
        left: 'Zsombor csapdája (7 vs. 8)',
        right: 'A 4+4 nem rendezett pár, így a 8 összeget csak 5 rácsmező adja, míg a 7-et 6 mező'
      },
      {
        id: 'cpm1-8',
        left: 'Egyforma kockák megkülönböztetése',
        right: 'A természet mindig megkülönbözteti a kockákat: a 36-os modell írja le a valóságot'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Két kocka dobása és rácsszámítások',
    subtitle: 'Párosítsd a két kockával végzett kísérlet eseményeit a pontos valószínűségükkel!',
    pairs: [
      {
        id: 'cpm2-1',
        left: 'Két kocka összege 7',
        right: '6/36 = 1/6'
      },
      {
        id: 'cpm2-2',
        left: 'Két kocka összege 12',
        right: '1/36'
      },
      {
        id: 'cpm2-3',
        left: 'Két kocka összege 10',
        right: '3/36 = 1/12'
      },
      {
        id: 'cpm2-4',
        left: 'Két kocka szorzata négyzetszám',
        right: '8/36 = 2/9'
      },
      {
        id: 'cpm2-5',
        left: 'Két kocka szorzata pontosan 6',
        right: '4/36 = 1/9'
      },
      {
        id: 'cpm2-6',
        left: 'Két kocka összege pontosan 8',
        right: '5/36'
      },
      {
        id: 'cpm2-7',
        left: 'Két kocka szorzata páratlan szám',
        right: '9/36 = 1/4'
      },
      {
        id: 'cpm2-8',
        left: 'Két kocka összege pontosan 11',
        right: '2/36 = 1/18'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Játékok, kártyák és többlépéses húzások',
    subtitle: 'Párosítsd a játékok és összetett kísérletek szabályait a matematikai valószínűségükkel!',
    pairs: [
      {
        id: 'cpm3-1',
        left: 'Kő-papír-olló döntetlen esélye',
        right: '1/3'
      },
      {
        id: 'cpm3-2',
        left: 'Kő-papír-olló-gyík-Spock döntetlen',
        right: '1/5'
      },
      {
        id: 'cpm3-3',
        left: 'Betűkártyák {A, E, M, Z}: értelmes magyar szó',
        right: '1/4'
      },
      {
        id: 'cpm3-4',
        left: 'Három érme: legalább 2 fej dobása',
        right: '1/2'
      },
      {
        id: 'cpm3-5',
        left: 'Három kockadobás összes elemi eseménye',
        right: '216 kimenetel'
      },
      {
        id: 'cpm3-6',
        left: '5 golyóból 2 húzása visszatevés nélkül',
        right: '20 lehetséges kimenetel'
      },
      {
        id: 'cpm3-7',
        left: '5 golyóból 2 húzása visszatevéssel',
        right: '25 lehetséges kimenetel'
      },
      {
        id: 'cpm3-8',
        left: 'Fair játék feltétele',
        right: 'P(játékos 1 nyer) = P(játékos 2 nyer)'
      }
    ]
  }
};

export const ClassicalProbMatcher: React.FC<ClassicalProbMatcherProps> = (props) => {
  const { onBack, onSwitchToTheory, onSwitchToQuiz, ...restProps } = props;
  return (
    <MatcherTemplate
      topicTitle="Klasszikus valószínűség & Megismerhető véletlen"
      topicBadge="10. OSZTÁLY • STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS"
      themeColor="purple"
      levels={matcherLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      {...restProps}
    />
  );
};

export default ClassicalProbMatcher;

