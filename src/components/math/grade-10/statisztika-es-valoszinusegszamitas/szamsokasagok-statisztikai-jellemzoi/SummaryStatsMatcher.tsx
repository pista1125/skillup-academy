import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SummaryStatsMatcherProps {
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

const matcherLevels: Record<number, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapfogalmak és jelölések',
    subtitle: 'Párosítsd össze a statisztikai mutatók neveit, definícióit és alapvető jelentéseit!',
    pairs: [
      {
        id: 'ssm1-1',
        left: 'Átlag (x̄)',
        right: 'Az adatok összegének és az elemszámnak a hányadosa'
      },
      {
        id: 'ssm1-2',
        left: 'Módusz (Mo)',
        right: 'A mintában a legtöbbször előforduló (leggyakoribb) érték'
      },
      {
        id: 'ssm1-3',
        left: 'Medián (Me)',
        right: 'Növekvő sorrendben a pontosan középen álló elem (felezőpont)'
      },
      {
        id: 'ssm1-4',
        left: 'Terjedelem (R)',
        right: 'A legnagyobb és legkisebb adat kivonásos különbsége: x_max - x_min'
      },
      {
        id: 'ssm1-5',
        left: 'Páratlan elemszám mediánja',
        right: 'A rendezett adatsorban az ((n+1)/2)-edik helyen lévő konkrét elem'
      },
      {
        id: 'ssm1-6',
        left: 'Páros elemszám mediánja',
        right: 'A két középső (n/2 és n/2+1) adat számtani közepe'
      },
      {
        id: 'ssm1-7',
        left: 'Gyakoriság (k)',
        right: 'Azt mutatja meg, hogy egy adott érték hányszor fordul elő a mintában'
      },
      {
        id: 'ssm1-8',
        left: 'Kiugró érték (outlier)',
        right: 'A többi adattól távol eső, szélsőséges mérési érték'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Számítások konkrét adathalmazokon',
    subtitle: 'Számítsd ki fejben az adatsorok mutatóit, és találd meg a megfelelő párokat!',
    pairs: [
      {
        id: 'ssm2-1',
        left: 'Adatok: {3, 5, 8, 9, 10} mediánja',
        right: 'Me = 8'
      },
      {
        id: 'ssm2-2',
        left: 'Adatok: {2, 4, 6, 8} mediánja',
        right: 'Me = 5'
      },
      {
        id: 'ssm2-3',
        left: 'Adatok: {1, 2, 2, 3, 5, 7} módusza',
        right: 'Mo = 2'
      },
      {
        id: 'ssm2-4',
        left: 'Adatok: {10, 20, 20, 30, 30, 40} módusza',
        right: 'Bimodális: 20 és 30'
      },
      {
        id: 'ssm2-5',
        left: 'Adatok: {4, 7, 9, 12, 28} terjedelme',
        right: 'R = 24'
      },
      {
        id: 'ssm2-6',
        left: 'Jegyek: {2, 3, 3, 4, 4, 5} átlaga',
        right: 'x̄ = 3,5'
      },
      {
        id: 'ssm2-7',
        left: 'Hőmérsékletek: {-3, 0, 1, 2, 5} mediánja',
        right: 'Me = 1 °C'
      },
      {
        id: 'ssm2-8',
        left: 'Dobások: {1, 3, 3, 3, 4, 5, 6} módusza',
        right: 'Mo = 3'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Statisztikai tételek és mélyebb tulajdonságok',
    subtitle: 'Párosítsd a statisztikai mutatók elméleti összefüggéseit és viselkedését!',
    pairs: [
      {
        id: 'ssm3-1',
        left: 'Melyik mutató része BIZTOSAN a mintának?',
        right: 'A módusz (ha létezik) és páratlan n esetén a medián'
      },
      {
        id: 'ssm3-2',
        left: 'Robusztus (ellenálló) mutató',
        right: 'A medián: egyetlen kiugró érték nem mozdítja el a helyét'
      },
      {
        id: 'ssm3-3',
        left: 'Kiugró értékekre legérzékenyebb mutató',
        right: 'Az átlag és a terjedelem: egy extrém adat drasztikusan elhúzza'
      },
      {
        id: 'ssm3-4',
        left: 'Átlagtól vett előjeles eltérések összege',
        right: 'Mindig szigorúan 0: ∑(xᵢ - x̄) = 0'
      },
      {
        id: 'ssm3-5',
        left: 'Szimmetrikus adateloszlás esetén',
        right: 'Az átlag és a medián pontosan megegyezik: x̄ = Me'
      },
      {
        id: 'ssm3-6',
        left: 'Jobbra ferde eloszlás (pl. fizetések)',
        right: 'Átlag > Medián > Módusz'
      },
      {
        id: 'ssm3-7',
        left: 'Minden adat megnövelése c állandóval',
        right: 'Az átlag és a medián c-vel nő, de a terjedelem nem változik!'
      },
      {
        id: 'ssm3-8',
        left: 'Minden adat megszorzása k pozitív számmal',
        right: 'Az átlag, a medián, a módusz és a terjedelem is k-szorosára nő'
      }
    ]
  }
};

export const SummaryStatsMatcher: React.FC<SummaryStatsMatcherProps> = (props) => {
  return (
    <MatcherTemplate
      topicId={props.topicId || 'g10-stat-statisztikai-jellemzok-matcher'}
      topicTitle={props.topicTitle || 'Számsokaságok statisztikai jellemzői'}
      levels={matcherLevels}
      {...props}
    />
  );
};

export default SummaryStatsMatcher;

