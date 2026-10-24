import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  IntersectionVennSvg,
  UnionVennSvg,
  DifferenceVennSvg,
  ComplementVennSvg,
  DisjointVennSvg,
  DeMorganUnionVennSvg,
  ThreeSetsVennSvg,
  SubsetOperationsVennSvg
} from './SetOperationsFigures';

interface SetOperationsMatcherProps {
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
    title: '1. Szint: Alapvető Halmazműveleti Fogalmak és Venn-diagramok',
    subtitle: 'Párosítsd a műveleti szimbólumokat a megfelelő definícióval és Venn-diagrammal!',
    pairs: [
      {
        id: 'som1-1',
        prompt: 'A ∩ B (Metszet)',
        value: 'Közös elemek: eleme A-nak ÉS eleme B-nek',
        figure: <IntersectionVennSvg size={65} />
      },
      {
        id: 'som1-2',
        prompt: 'A ∪ B (Unió)',
        value: 'Egyesítés: eleme A-nak VAGY eleme B-nek',
        figure: <UnionVennSvg size={65} />
      },
      {
        id: 'som1-3',
        prompt: 'A \\ B (Különbség)',
        value: 'A-ban benne van, de B-ben nincs benne',
        figure: <DifferenceVennSvg size={65} />
      },
      {
        id: 'som1-4',
        prompt: 'B \\ A (Különbség)',
        value: 'B-ben benne van, de A-ban nincs benne',
        figure: <DifferenceVennSvg size={65} reverse={true} />
      },
      {
        id: 'som1-5',
        prompt: 'Ā = U \\ A (Komplementer)',
        value: 'U alaphalmaz azon elemei, amelyek nincsenek benne A-ban',
        figure: <ComplementVennSvg size={65} />
      },
      {
        id: 'som1-6',
        prompt: 'A ∩ B = ∅ (Diszjunkt)',
        value: 'Két halmaznak egyetlen közös eleme sincs',
        figure: <DisjointVennSvg size={65} />
      },
      {
        id: 'som1-7',
        prompt: 'A ∩ A',
        value: 'Maga az A halmaz (idempotencia)'
      },
      {
        id: 'som1-8',
        prompt: 'A ∩ ∅',
        value: 'Üres halmaz (∅-val metszve mindig üres)'
      }
    ]
  },
  2: {
    title: '2. Szint: Műveleti Azonosságok és De Morgan Szabályok',
    subtitle: 'Párosítsd a halmazalgebrai kifejezéseket az ekvivalens egyszerűsített alakjukkal!',
    pairs: [
      {
        id: 'som2-1',
        prompt: '(A ∪ B) komplementere',
        value: 'Ā ∩ B̄ (De Morgan I. szabálya: metszetté alakul)',
        figure: <DeMorganUnionVennSvg size={65} />
      },
      {
        id: 'som2-2',
        prompt: '(A ∩ B) komplementere',
        value: 'Ā ∪ B̄ (De Morgan II. szabálya: unióvá alakul)'
      },
      {
        id: 'som2-3',
        prompt: 'A ∩ (B ∪ C) (Disztributivitás)',
        value: '(A ∩ B) ∪ (A ∩ C)'
      },
      {
        id: 'som2-4',
        prompt: 'A \\ B kifejezése komplementerrel',
        value: 'A ∩ B̄ (A metszve a B komplementerével)'
      },
      {
        id: 'som2-5',
        prompt: 'Ha A ⊆ B, mennyi A ∩ B?',
        value: 'Maga az A halmaz (a szűkebb belső halmaz)',
        figure: <SubsetOperationsVennSvg size={65} />
      },
      {
        id: 'som2-6',
        prompt: 'Ha A ⊆ B, mennyi A ∪ B?',
        value: 'Maga a B halmaz (a tágabb külső halmaz)'
      },
      {
        id: 'som2-7',
        prompt: 'Ha A ⊆ B, mennyi A \\ B?',
        value: 'Üres halmaz (∅, semmi sem marad A-ból)'
      },
      {
        id: 'som2-8',
        prompt: 'Ā̄ (kettős komplementer)',
        value: 'Maga az eredeti A halmaz (kettős tagadás)'
      }
    ]
  },
  3: {
    title: '3. Szint: 3 Halmazos Venn és Haladó Halmazalgebra',
    subtitle: 'Párosítsd a 3 halmazos képleteket és a speciális halmazegyenleteket a helyes értékkel!',
    pairs: [
      {
        id: 'som3-1',
        prompt: 'A ∩ B ∩ C',
        value: 'Mindhárom halmaz közös része (központi mag)',
        figure: <ThreeSetsVennSvg size={65} />
      },
      {
        id: 'som3-2',
        prompt: '3 halmazos Venn-diagram tartományai',
        value: 'Pontosan 8 diszjunkt zónára osztja az univerzumot'
      },
      {
        id: 'som3-3',
        prompt: '|A ∪ B| elemszám-képlete',
        value: '|A| + |B| - |A ∩ B| (a metszet levonásával)'
      },
      {
        id: 'som3-4',
        prompt: 'A ∪ Ā (halmaz és komplementere)',
        value: 'U (a teljes alaphalmazt kiadja)'
      },
      {
        id: 'som3-5',
        prompt: 'A ∩ Ā (halmaz és komplementere)',
        value: '∅ (mindig diszjunktak, nincs közös elemük)'
      },
      {
        id: 'som3-6',
        prompt: 'A \\ A',
        value: '∅ (önmagát kivonva üres halmazt kapunk)'
      },
      {
        id: 'som3-7',
        prompt: 'U \\ ∅ (üres halmaz komplementere)',
        value: 'U (a teljes alaphalmaz)'
      },
      {
        id: 'som3-8',
        prompt: 'U \\ U (alaphalmaz komplementere)',
        value: '∅ (az üres halmaz)'
      }
    ]
  }
};

export const SetOperationsMatcher: React.FC<SetOperationsMatcherProps> = ({
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
      themeColor="indigo"
      topicId={topicId || 'g9-komb-halmaz-muveletek-matcher'}
      topicTitle={topicTitle || '9. Osztály - Halmazműveletek Párosító'}
    />
  );
};

export default SetOperationsMatcher;
