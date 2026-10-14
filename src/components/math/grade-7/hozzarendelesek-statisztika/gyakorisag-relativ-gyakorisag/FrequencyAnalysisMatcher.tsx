import React from 'react';
import { MatcherTemplate, MatcherPair } from '../MatcherTemplate';

interface FrequencyAnalysisMatcherProps {
  onBack?: () => void;
  onNextLevel?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  topicId?: string;
}

const LEVEL_1_PAIRS: MatcherPair[] = [
  {
    id: 'fa-m1-1',
    prompt: 'Gyakoriság (k)',
    value: 'Azt mutatja, hogy egy adat hányszor fordult elő (darabszám)',
  },
  {
    id: 'fa-m1-2',
    prompt: 'Relatív gyakoriság (g)',
    value: 'A gyakoriság és az összes adat számának hányadosa (k / n)',
  },
  {
    id: 'fa-m1-3',
    prompt: 'Relatív gyakoriságok összege',
    value: 'Mindig pontosan 1 (vagyis 100%)',
  },
  {
    id: 'fa-m1-4',
    prompt: 'Kördiagram teljes szöge',
    value: '360°-os teljes szög',
  },
  {
    id: 'fa-m1-5',
    prompt: 'Körcikk középponti szöge',
    value: 'α = g · 360° (a relatív gyakoriság 360-szorosa)',
  },
  {
    id: 'fa-m1-6',
    prompt: '25%-os részarány körcikke',
    value: '90°-os derékszög a kördiagramban',
  },
  {
    id: 'fa-m1-7',
    prompt: '50%-os részarány körcikke',
    value: '180°-os egyenesszög (félkör a kördiagramban)',
  },
  {
    id: 'fa-m1-8',
    prompt: 'Oszlopdiagram',
    value: 'Különböző csoportok gyakoriságának összehasonlítása oszlopokkal',
  },
];

const LEVEL_2_PAIRS: MatcherPair[] = [
  {
    id: 'fa-m2-1',
    prompt: 'k = 5 a 20-ból',
    value: 'g = 25% (90°-os középponti szög)',
  },
  {
    id: 'fa-m2-2',
    prompt: 'k = 10 a 20-ból',
    value: 'g = 50% (180°-os középponti szög)',
  },
  {
    id: 'fa-m2-3',
    prompt: 'k = 2 a 20-ból',
    value: 'g = 10% (36°-os középponti szög)',
  },
  {
    id: 'fa-m2-4',
    prompt: 'k = 4 a 20-ból',
    value: 'g = 20% (72°-os középponti szög)',
  },
  {
    id: 'fa-m2-5',
    prompt: 'k = 1 a 20-ból',
    value: 'g = 5% (18°-os középponti szög)',
  },
  {
    id: 'fa-m2-6',
    prompt: 'k = 8 a 20-ból',
    value: 'g = 40% (144°-os középponti szög)',
  },
  {
    id: 'fa-m2-7',
    prompt: 'k = 6 a 20-ból',
    value: 'g = 30% (108°-os középponti szög)',
  },
  {
    id: 'fa-m2-8',
    prompt: 'k = 20 a 20-ból',
    value: 'g = 100% (360°-os teljes kör)',
  },
];

const LEVEL_3_PAIRS: MatcherPair[] = [
  {
    id: 'fa-m3-1',
    prompt: 'n = 50 esetén k = 15',
    value: 'g = 15/50 = 30% (108°)',
  },
  {
    id: 'fa-m3-2',
    prompt: 'n = 40 esetén k = 6',
    value: 'g = 6/40 = 15% (54°)',
  },
  {
    id: 'fa-m3-3',
    prompt: 'n = 100 esetén k = 35',
    value: 'g = 35/100 = 35% (126°)',
  },
  {
    id: 'fa-m3-4',
    prompt: '60°-os körcikk aránya',
    value: '60° / 360° = 1/6 (kb. 16,7%)',
  },
  {
    id: 'fa-m3-5',
    prompt: '120°-os körcikk aránya',
    value: '120° / 360° = 1/3 (kb. 33,3%)',
  },
  {
    id: 'fa-m3-6',
    prompt: '45°-os körcikk aránya',
    value: '45° / 360° = 1/8 (12,5%)',
  },
  {
    id: 'fa-m3-7',
    prompt: 'g = 0,05 (5%) szöge',
    value: 'α = 0,05 · 360° = 18°',
  },
  {
    id: 'fa-m3-8',
    prompt: 'g = 0,75 (75%) szöge',
    value: 'α = 0,75 · 360° = 270°',
  },
];

export const FrequencyAnalysisMatcher: React.FC<FrequencyAnalysisMatcherProps> = ({
  onBack,
  onNextLevel,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  topicId = 'g7-stats-freq',
}) => {
  return (
    <MatcherTemplate
      title="Gyakoriság és Diagramok Párosító"
      subtitle="Találd meg a gyakoriságok, százalékos relatív értékek és körcikk-szögek párjait!"
      topicTitle="5. Gyakoriság, relatív gyakoriság"
      badge="PÁROSÍTÓ JÁTÉK • 7. OSZTÁLY"
      themeColor="teal"
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
          title: '1. szint: Gyakorisági és diagram alapfogalmak',
          description: 'Párosítsd a statisztikai és diagramos fogalmakat definícióikkal!',
          pairs: LEVEL_1_PAIRS,
        },
        2: {
          title: '2. szint: Számítások 20 fős mintára',
          description: 'Párosítsd a darabszámokat a megfelelő százalékkal és körcikk-szöggel!',
          pairs: LEVEL_2_PAIRS,
        },
        3: {
          title: '3. szint: Egyéb mintaméretek és körcikk-szögek',
          description: 'Kösd össze a különböző arányokat és körcikk-szögeket!',
          pairs: LEVEL_3_PAIRS,
        },
      }}
    />
  );
};

export default FrequencyAnalysisMatcher;
