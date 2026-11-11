import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';

interface PracticalProbMatcherProps {
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
    title: '1. Szint: Logikai szita és halmazos valószínűség alapjai',
    subtitle: 'Párosítsd a halmazos eseményeket és a logikai szita képleteit a jelentésükkel!',
    pairs: [
      {
        id: 'ppm1-1',
        left: 'Logikai szita képlete (2 eseményre)',
        right: 'P(A ∪ B) = P(A) + P(B) – P(A ∩ B)'
      },
      {
        id: 'ppm1-2',
        left: 'Mindkét esemény bekövetkezik',
        right: 'A és B metszete: P(A ∩ B)'
      },
      {
        id: 'ppm1-3',
        left: 'Legalább az egyik esemény bekövetkezik',
        right: 'A és B uniója: P(A ∪ B)'
      },
      {
        id: 'ppm1-4',
        left: 'Egyik esemény sem következik be',
        right: 'Az unió komplementere: 1 – P(A ∪ B)'
      },
      {
        id: 'ppm1-5',
        left: 'Csak az egyik esemény következik be',
        right: 'Szimmetrikus differencia: P(A) + P(B) – 2 · P(A ∩ B)'
      },
      {
        id: 'ppm1-6',
        left: '36 fős osztály: emelt töri esélye',
        right: '1/2 = 50%'
      },
      {
        id: 'ppm1-7',
        left: '36 fős osztály: mindkét tárgy emelt',
        right: '1/12 ≈ 8,33%'
      },
      {
        id: 'ppm1-8',
        left: '36 fős osztály: egyik tárgy sem emelt',
        right: '1/3 ≈ 33,33%'
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Kétdimenziós táblázatok és valós statisztikák',
    subtitle: 'Párosítsd a biztosítási és orvosi statisztikai eseményeket a pontos valószínűségükkel!',
    pairs: [
      {
        id: 'ppm2-1',
        left: '1000 biztosított: legalább egyik biztosítás',
        right: '904 / 1000 = 90,4%'
      },
      {
        id: 'ppm2-2',
        left: '1000 biztosított: egyik fajtával sem rendelkezik',
        right: '96 / 1000 = 9,6%'
      },
      {
        id: 'ppm2-3',
        left: '1000 biztosított: csak az egyik fajta biztosítása van',
        right: '808 / 1000 = 80,8%'
      },
      {
        id: 'ppm2-4',
        left: 'Vércsoportok (346 donor): 0-s vagy Rh-pozitív',
        right: '322 / 346 ≈ 93,06%'
      },
      {
        id: 'ppm2-5',
        left: 'Vércsoportok: AB-s vagy B-s vércsoportú donor',
        right: '68 / 346 ≈ 19,65%'
      },
      {
        id: 'ppm2-6',
        left: 'Vércsoportok: nem AB és nem Rh-negatív',
        right: '278 / 346 ≈ 80,35%'
      },
      {
        id: 'ppm2-7',
        left: 'Egyetem (860 hallgató): gazdasági szakos hallgatónő',
        right: '195 / 860 ≈ 22,67%'
      },
      {
        id: 'ppm2-8',
        left: 'Egyetem (860 hallgató): gazdasági szakos férfi',
        right: '117 / 860 ≈ 13,60%'
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Sorrendek, felelések és összetett kombinatorika',
    subtitle: 'Párosítsd a sorrendi permutációkat és mintavételi eseményeket!',
    pairs: [
      {
        id: 'ppm3-1',
        left: '5 barátnő belép a terembe: Anna lép be legelsőnek',
        right: '1 / 5 = 20%'
      },
      {
        id: 'ppm3-2',
        left: '5 barátnő: Anna és Kati egymás után lépnek be',
        right: '2/5 = 40%'
      },
      {
        id: 'ppm3-3',
        left: '5 barátnő: Anna és Kati NEM egymás után lépnek be',
        right: '3/5 = 60%'
      },
      {
        id: 'ppm3-4',
        left: '6 felelőjelölt: te leszel a mai legelső felelő',
        right: '1 / 6 ≈ 16,67%'
      },
      {
        id: 'ppm3-5',
        left: '6 felelőjelölt: a 2 kiválasztott egyike leszel',
        right: '1/3 ≈ 33,33%'
      },
      {
        id: 'ppm3-6',
        left: '6 felelőjelölt: ma NEM fogsz felelni',
        right: '2/3 ≈ 66,67%'
      },
      {
        id: 'ppm3-7',
        left: 'Parkolók (288 autó): autó az A parkoló 1. zónájából',
        right: '43 / 288 ≈ 14,93%'
      },
      {
        id: 'ppm3-8',
        left: 'Parkolók: autó a B parkolóból hajt el',
        right: '131 / 288 ≈ 45,49%'
      }
    ]
  }
};

export const PracticalProbMatcher: React.FC<PracticalProbMatcherProps> = (props) => {
  const { onBack, onSwitchToTheory, onSwitchToQuiz, ...restProps } = props;
  return (
    <MatcherTemplate
      topicTitle="Valószínűség a gyakorlatban"
      topicBadge="10. OSZTÁLY • STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS"
      themeColor="rose"
      levels={matcherLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      {...restProps}
    />
  );
};

export default PracticalProbMatcher;

