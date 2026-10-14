import React from 'react';
import { MatcherTemplate, MatcherPair } from '../MatcherTemplate';

interface ProbabilityMatcherProps {
  onBack?: () => void;
  onNextLevel?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  topicId?: string;
}

const LEVEL_1_PAIRS: MatcherPair[] = [
  {
    id: 'pr-m1-1',
    prompt: 'Klasszikus valószínűség',
    value: 'P(A) = kedvező esetek / összes eset = k / n',
  },
  {
    id: 'pr-m1-2',
    prompt: 'Biztos esemény (I)',
    value: 'Minden esetben bekövetkezik, valószínűsége P(I) = 1 (100%)',
  },
  {
    id: 'pr-m1-3',
    prompt: 'Lehetetlen esemény (∅)',
    value: 'Soha nem következhet be, valószínűsége P(∅) = 0 (0%)',
  },
  {
    id: 'pr-m1-4',
    prompt: 'Véletlen esemény (A)',
    value: 'Bekövetkezhet vagy nem, valószínűsége 0 < P(A) < 1',
  },
  {
    id: 'pr-m1-5',
    prompt: 'Ellentett esemény (Ā)',
    value: 'Valószínűsége: P(Ā) = 1 - P(A) (kiegészíti 100%-ra)',
  },
  {
    id: 'pr-m1-6',
    prompt: 'Kedvező esetek száma (k)',
    value: 'A vizsgált feltételnek eleget tevő kimenetelek száma',
  },
  {
    id: 'pr-m1-7',
    prompt: 'Összes eset száma (n)',
    value: 'A kísérlet összes lehetséges egyedi kimenetelének száma',
  },
  {
    id: 'pr-m1-8',
    prompt: 'Nagy számok törvénye',
    value: 'Sok kísérlet esetén a relatív gyakoriság megközelíti a valószínűséget',
  },
];

const LEVEL_2_PAIRS: MatcherPair[] = [
  {
    id: 'pr-m2-1',
    prompt: 'Páros szám dobása kockával',
    value: '3/6 = 1/2 = 50% (kedvező: 2, 4, 6)',
  },
  {
    id: 'pr-m2-2',
    prompt: 'Hatost dobunk egy kockával',
    value: '1/6 ≈ 16,7% (kedvező: 6)',
  },
  {
    id: 'pr-m2-3',
    prompt: 'Prímszám dobása kockával',
    value: '3/6 = 1/2 = 50% (kedvező: 2, 3, 5)',
  },
  {
    id: 'pr-m2-4',
    prompt: '4-nél nagyobb szám dobása',
    value: '2/6 = 1/3 ≈ 33,3% (kedvező: 5, 6)',
  },
  {
    id: 'pr-m2-5',
    prompt: '7-es dobása szabályos kockával',
    value: '0/6 = 0 (Lehetetlen esemény)',
  },
  {
    id: 'pr-m2-6',
    prompt: '7-nél kisebb szám dobása',
    value: '6/6 = 1 = 100% (Biztos esemény)',
  },
  {
    id: 'pr-m2-7',
    prompt: 'Fej dobása szabályos érmével',
    value: '1/2 = 0,5 = 50%',
  },
  {
    id: 'pr-m2-8',
    prompt: 'NEM hatost dobunk kockával',
    value: '5/6 ≈ 83,3% (Ellentett esemény: 1 - 1/6)',
  },
];

const LEVEL_3_PAIRS: MatcherPair[] = [
  {
    id: 'pr-m3-1',
    prompt: 'Urna (5 piros, 3 kék, 2 zöld) → Piros',
    value: '5/10 = 1/2 = 50%',
  },
  {
    id: 'pr-m3-2',
    prompt: 'Urna (5 piros, 3 kék, 2 zöld) → Kék',
    value: '3/10 = 0,3 = 30%',
  },
  {
    id: 'pr-m3-3',
    prompt: 'Urna (5 piros, 3 kék, 2 zöld) → NEM zöld',
    value: '8/10 = 4/5 = 80%',
  },
  {
    id: 'pr-m3-4',
    prompt: '32 lapos pakliból egy Ász húzása',
    value: '4/32 = 1/8 = 12,5%',
  },
  {
    id: 'pr-m3-5',
    prompt: '32 lapos pakliból Piros lap húzása',
    value: '8/32 = 1/4 = 25%',
  },
  {
    id: 'pr-m3-6',
    prompt: 'Két érmével két Fej dobása',
    value: '1/4 = 25% (kimenetelek: FF, FÍ, ÍF, ÍÍ)',
  },
  {
    id: 'pr-m3-7',
    prompt: 'Két érmével legalább egy Fej',
    value: '3/4 = 75% (csak az ÍÍ nem kedvező)',
  },
  {
    id: 'pr-m3-8',
    prompt: 'Két kockával a dobott összeg 12',
    value: '1/36 ≈ 2,8% (csak a 6 + 6 kedvező)',
  },
];

export const ProbabilityMatcher: React.FC<ProbabilityMatcherProps> = ({
  onBack,
  onNextLevel,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  topicId = 'g7-stats-prob',
}) => {
  return (
    <MatcherTemplate
      title="Valószínűségszámítás Párosító"
      subtitle="Párosítsd a valószínűségi fogalmakat, kísérleteket és a számított esélyeket!"
      topicTitle="6. Valószínűség"
      badge="PÁROSÍTÓ JÁTÉK • 7. OSZTÁLY"
      themeColor="amber"
      topicId={topicId}
      grade={7}
      chapterId="hozzarendelesek-statisztika"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
      levelsConfig={{
        1: {
          title: '1. szint: Valószínűségi alapfogalmak',
          description: 'Párosítsd a valószínűség alapfogalmait és a klasszikus modell definícióit!',
          pairs: LEVEL_1_PAIRS,
        },
        2: {
          title: '2. szint: Szabályos kocka és érme',
          description: 'Keresd meg a kocka- és érmedobások eseményeihez tartozó helyes valószínűségeket!',
          pairs: LEVEL_2_PAIRS,
        },
        3: {
          title: '3. szint: Urnák, kártyák és összetett események',
          description: 'Párosítsd a golyóhúzások, kártyák és két érme eseményeit a tört vagy százalékos értékükkel!',
          pairs: LEVEL_3_PAIRS,
        },
      }}
    />
  );
};

export default ProbabilityMatcher;
