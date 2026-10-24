import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  ThreeSetsVennRegionsSvg,
  SymmetricDifferenceSvg,
  NumberSetsHierarchySvg,
  SubsetInclusionVennSvg,
  DisjointSetsVennSvg,
  ComplexIntervalZIntersectionSvg,
  PowerSetTreeSvg
} from './SetsPracticeFigures';

interface SetsPracticeMatcherProps {
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
    title: '1. Szint: Alapvető Halmazműveletek és Jelölések',
    subtitle: 'Párosítsd a halmazelméleti szimbólumokat a pontos jelentésükkel!',
    pairs: [
      {
        id: 'spm1-1',
        prompt: 'A ∩ B (Halmazok metszete)',
        value: 'Mindkét halmaz közös elemei'
      },
      {
        id: 'spm1-2',
        prompt: 'A ∪ B (Halmazok uniója)',
        value: 'Legalább az egyik halmaz elemei'
      },
      {
        id: 'spm1-3',
        prompt: 'A \\ B (Halmazok különbsége)',
        value: 'A-ban lévő, de B-ben nem lévő elemek'
      },
      {
        id: 'spm1-4',
        prompt: 'A komplementere (Ā)',
        value: 'U azon elemei, melyek nincsenek benne A-ban'
      },
      {
        id: 'spm1-5',
        prompt: 'A ⊆ B (Részhalmaz reláció)',
        value: 'A minden eleme egyben B-nek is eleme',
        figure: <SubsetInclusionVennSvg size={70} />
      },
      {
        id: 'spm1-6',
        prompt: '∅ (Üres halmaz)',
        value: '0 elemet tartalmaz, minden halmaz részhalmaza'
      },
      {
        id: 'spm1-7',
        prompt: 'n elemű halmaz összes részhalmaza',
        value: '2ⁿ darab részhalmaz',
        figure: <PowerSetTreeSvg size={70} />
      },
      {
        id: 'spm1-8',
        prompt: 'Diszjunkt halmazok (A ∩ B = ∅)',
        value: 'Egyetlen közös elemük sincs',
        figure: <DisjointSetsVennSvg size={70} />
      }
    ]
  },
  2: {
    title: '2. Szint: Számhalmazok, Intervallumok és Szitaformula',
    subtitle: 'Párosítsd a nevezetes halmazokat és összefüggéseket a leírásukkal!',
    pairs: [
      {
        id: 'spm2-1',
        prompt: 'ℕ (Természetes számok)',
        value: '{0, 1, 2, 3, ...}',
        figure: <NumberSetsHierarchySvg size={70} />
      },
      {
        id: 'spm2-2',
        prompt: 'ℤ (Egész számok)',
        value: '{..., -2, -1, 0, 1, 2, ...}'
      },
      {
        id: 'spm2-3',
        prompt: 'ℚ (Racionális számok)',
        value: 'Felírható p/q alakban (p, q ∈ ℤ, q ≠ 0)'
      },
      {
        id: 'spm2-4',
        prompt: 'ℚ* (Irracionális számok)',
        value: 'Végtelen, nem szakaszos tizedestörtek (pl. √2, π)'
      },
      {
        id: 'spm2-5',
        prompt: '[-2; 3] ∩ ℤ egész pontjai',
        value: '{-2, -1, 0, 1, 2, 3} (6 darab szám)',
        figure: <ComplexIntervalZIntersectionSvg size={70} />
      },
      {
        id: 'spm2-6',
        prompt: 'A Δ B (Szimmetrikus differencia)',
        value: '(A \\ B) ∪ (B \\ A)',
        figure: <SymmetricDifferenceSvg size={70} />
      },
      {
        id: 'spm2-7',
        prompt: 'Két halmaz szitaformulája',
        value: '|A ∪ B| = |A| + |B| - |A ∩ B|'
      },
      {
        id: 'spm2-8',
        prompt: 'De Morgan I. törvénye: (A ∪ B)',
        value: 'Ā ∩ B̄ (komplementerek metszete)'
      }
    ]
  },
  3: {
    title: '3. Szint: Halmazazonosságok és Összetett Tulajdonságok',
    subtitle: 'Párosítsd a mélyebb elméleti azonosságokat és extremitásokat!',
    pairs: [
      {
        id: 'spm3-1',
        prompt: 'Három halmaz szitaformulája',
        value: '∑|A| - ∑|A ∩ B| + |A ∩ B ∩ C|',
        figure: <ThreeSetsVennRegionsSvg size={70} />
      },
      {
        id: 'spm3-2',
        prompt: 'De Morgan II. törvénye: (A ∩ B)',
        value: 'Ā ∪ B̄ (komplementerek uniója)'
      },
      {
        id: 'spm3-3',
        prompt: 'A \\ B átírása metszettel',
        value: 'A ∩ B̄ (A metszete B komplementerével)'
      },
      {
        id: 'spm3-4',
        prompt: 'n elemű halmaz nem üres valódi részhalmazai',
        value: '2ⁿ - 2 darab'
      },
      {
        id: 'spm3-5',
        prompt: '𝒫(∅) (Üres halmaz hatványhalmaza)',
        value: '{∅} (pontosan 1 eleme van, 2⁰ = 1)'
      },
      {
        id: 'spm3-6',
        prompt: 'A Δ B átírása unióval és metszettel',
        value: '(A ∪ B) \\ (A ∩ B)',
        figure: <SymmetricDifferenceSvg size={70} />
      },
      {
        id: 'spm3-7',
        prompt: 'A ⊆ B esetén A ∩ B és A ∪ B',
        value: 'A ∩ B = A és A ∪ B = B',
        figure: <SubsetInclusionVennSvg size={70} />
      },
      {
        id: 'spm3-8',
        prompt: 'Russell-paradoxon R = {X | X ∉ X}',
        value: 'R ∈ R ⟺ R ∉ R (antinómia, ZFC axiomatika)'
      }
    ]
  }
};

export const SetsPracticeMatcher: React.FC<SetsPracticeMatcherProps> = ({
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
      themeColor="violet"
      topicId={topicId || 'g9-komb-gyakorlas-halmaz-matcher'}
      topicTitle={topicTitle || '9. Osztály - Halmazok Gyakorló Párosító'}
    />
  );
};

export default SetsPracticeMatcher;
