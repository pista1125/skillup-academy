import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  TwoSetsSieveSvg,
  DivisibilitySieveSvg,
  ThreeSetsSieveSvg,
  SurveyVennSvg,
  DisjointSieveSvg
} from './SieveFigures';

interface SieveMatcherProps {
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
    title: '1. Szint: Két Halmaz Szitaformulája és Alapösszefüggések',
    subtitle: 'Párosítsd a szitaformula képleteit és fogalmait a szabatos magyarázatukkal!',
    pairs: [
      {
        id: 'sim1-1',
        prompt: '|A ∪ B| alapszita képlete',
        value: '|A| + |B| − |A ∩ B| (metszet levonása)',
        figure: <TwoSetsSieveSvg size={65} />
      },
      {
        id: 'sim1-2',
        prompt: '|A ∩ B| kifejezve unióval',
        value: '|A| + |B| − |A ∪ B|'
      },
      {
        id: 'sim1-3',
        prompt: 'Ha A és B diszjunktak (|A ∩ B| = 0)',
        value: '|A ∪ B| = |A| + |B| (semmit sem kell levonni)',
        figure: <DisjointSieveSvg size={65} />
      },
      {
        id: 'sim1-4',
        prompt: 'Csak A elemei (|A \\ B|)',
        value: '|A| − |A ∩ B|'
      },
      {
        id: 'sim1-5',
        prompt: 'Csak B elemei (|B \\ A|)',
        value: '|B| − |A ∩ B|'
      },
      {
        id: 'sim1-6',
        prompt: 'Pontosan egy halmazba tartozók',
        value: '|A ∪ B| − |A ∩ B| (szimmetrikus különbség)',
        figure: <SurveyVennSvg size={65} />
      },
      {
        id: 'sim1-7',
        prompt: 'Semelyikbe sem tartozók U-ban',
        value: '|U| − |A ∪ B| (univerzumból kivonva az uniót)'
      },
      {
        id: 'sim1-8',
        prompt: 'Duplán számolás elve',
        value: 'A metszetet azért vonjuk le, mert mindkét halmazban benne volt'
      }
    ]
  },
  2: {
    title: '2. Szint: Oszthatósági Szita és 3 Halmazos Képlet',
    subtitle: 'Párosítsd a számelméleti és többhalmazos problémákat a helyes képlettel és számértékkel!',
    pairs: [
      {
        id: 'sim2-1',
        prompt: '1..100 között 2-vel vagy 3-mal oszt.',
        value: '50 + 33 − 16 = 67 szám',
        figure: <DivisibilitySieveSvg size={65} />
      },
      {
        id: 'sim2-2',
        prompt: '1..100 között sem 2-vel, sem 3-mal',
        value: '100 − 67 = 33 szám'
      },
      {
        id: 'sim2-3',
        prompt: '1..100 között 4-gyel vagy 6-tal oszt.',
        value: '25 + 16 − 8 = 33 szám (lkkt = 12!)'
      },
      {
        id: 'sim2-4',
        prompt: '3 halmazos szitaformula alakja',
        value: 'Σ|egyedi| − Σ|páros| + |A ∩ B ∩ C|',
        figure: <ThreeSetsSieveSvg size={65} />
      },
      {
        id: 'sim2-5',
        prompt: 'Hármas metszet szerepe 3 halmaznál',
        value: '+1-szer visszapótoljuk, mert a 3 páros metszet teljesen levonta'
      },
      {
        id: 'sim2-6',
        prompt: 'Ha A ⊆ B, mennyi |A ∪ B|?',
        value: '|B| (a bővebb halmaz mérete)'
      },
      {
        id: 'sim2-7',
        prompt: 'Ha A ⊆ B, mennyi |A ∩ B|?',
        value: '|A| (a szűkebb belső halmaz mérete)'
      },
      {
        id: 'sim2-8',
        prompt: 'Ha A ⊆ B, mennyi |A \\ B|?',
        value: '0 (az üres halmaz elemszáma)'
      }
    ]
  },
  3: {
    title: '3. Szint: 3 Halmazos Venn Régiók és Szélsőértékek',
    subtitle: 'Párosítsd az összetett halmazelméleti konstrukciókat a pontos értékükkel!',
    pairs: [
      {
        id: 'sim3-1',
        prompt: 'A ∩ B ∩ C (Hármas metszet)',
        value: 'Mindhárom tulajdonsággal rendelkező legbelső mag',
        figure: <ThreeSetsSieveSvg size={65} />
      },
      {
        id: 'sim3-2',
        prompt: 'Csak A és B közös elemei (C nélkül)',
        value: '|A ∩ B| − |A ∩ B ∩ C|'
      },
      {
        id: 'sim3-3',
        prompt: 'Pontosan 2 szakkörre járók száma',
        value: 'Páros metszetek összege − 3 · |A ∩ B ∩ C|'
      },
      {
        id: 'sim3-4',
        prompt: 'Bentről kifelé kitöltési elv',
        value: 'Először a hármas metszetet írd be a Venn-diagramba!'
      },
      {
        id: 'sim3-5',
        prompt: '|A ∪ B| lehetséges minimuma',
        value: 'max(|A|, |B|) (ha a kisebbik teljesen benne van a nagyobbikban)'
      },
      {
        id: 'sim3-6',
        prompt: '|A ∪ B| lehetséges maximuma',
        value: '|A| + |B| (ha a két halmaz teljesen diszjunkt)'
      },
      {
        id: 'sim3-7',
        prompt: '|A ∩ B| kényszerített minimuma U-ban',
        value: 'max(0, |A| + |B| − |U|) (a túlcsorduló kötelező átfedés)'
      },
      {
        id: 'sim3-8',
        prompt: '4 halmaz esetén a 4-es metszet előjele',
        value: 'Negatív (−) a váltakozó előjelű Poincaré-elv miatt'
      }
    ]
  }
};

export const SieveMatcher: React.FC<SieveMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId,
  topicTitle
}) => {
  const activeLevel = currentLevel || level || 1;
  const config = matcherLevels[activeLevel] || matcherLevels[1];

  return (
    <MatcherTemplate
      level={activeLevel}
      config={config}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      themeColor="amber"
      topicId={topicId || 'g9-komb-szitaformula-matcher'}
      topicTitle={topicTitle || '9. Osztály - A Szitaformula Párosító'}
    />
  );
};

export default SieveMatcher;
