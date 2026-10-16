import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LengthMassTimeMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onBack?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Alapvető Mértékegység-párok',
    subtitle: 'Keresd meg minden mennyiség egyenértékű átváltott párját!',
    pairs: [
      { id: 'lmm1_1', prompt: '3 km', value: '3000 m' },
      { id: 'lmm1_2', prompt: '4,5 m', value: '450 cm' },
      { id: 'lmm1_3', prompt: '80 mm', value: '8 cm' },
      { id: 'lmm1_4', prompt: '2 t', value: '2000 kg' },
      { id: 'lmm1_5', prompt: '500 kg', value: '5 q' },
      { id: 'lmm1_6', prompt: '25 dkg', value: '250 g' },
      { id: 'lmm1_7', prompt: '2 óra', value: '120 perc' },
      { id: 'lmm1_8', prompt: '3 perc', value: '180 másodperc' }
    ]
  },
  2: {
    title: '2. Szint: Tizedestörtes és Többlépcsős Átváltások',
    subtitle: 'Párosítsd össze a tizedestörtes és összetettebb mennyiségeket!',
    pairs: [
      { id: 'lmm2_1', prompt: '0,75 m', value: '75 cm' },
      { id: 'lmm2_2', prompt: '3200 m', value: '3,2 km' },
      { id: 'lmm2_3', prompt: '65 dm', value: '6,5 m' },
      { id: 'lmm2_4', prompt: '1,5 t', value: '15 q' },
      { id: 'lmm2_5', prompt: '0,4 kg', value: '40 dkg' },
      { id: 'lmm2_6', prompt: '750 g', value: '0,75 kg' },
      { id: 'lmm2_7', prompt: '1,5 óra', value: '90 perc' },
      { id: 'lmm2_8', prompt: '1 óra 15 perc', value: '75 perc' }
    ]
  },
  3: {
    title: '3. Szint: Összetett és Vegyes Mértékek',
    subtitle: 'Kösd össze a vegyes és törtrészes mennyiségeket a pontos értékükkel!',
    pairs: [
      { id: 'lmm3_1', prompt: '0,04 m', value: '40 mm' },
      { id: 'lmm3_2', prompt: '2500 mm', value: '2,5 m' },
      { id: 'lmm3_3', prompt: '1 t 200 kg', value: '1,2 t' },
      { id: 'lmm3_4', prompt: '3500 kg', value: '35 q' },
      { id: 'lmm3_5', prompt: '150 dkg', value: '1,5 kg' },
      { id: 'lmm3_6', prompt: '3/4 óra', value: '45 perc' },
      { id: 'lmm3_7', prompt: '2 óra 30 perc', value: '150 perc' },
      { id: 'lmm3_8', prompt: '1/2 nap', value: '12 óra' }
    ]
  }
};

export const LengthMassTimeMatcher: React.FC<LengthMassTimeMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onBack,
  topicId = 'g6-length-mass-time-matcher',
  topicTitle = 'Hosszúság, tömeg, idő'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <MatcherTemplate
      title="Hosszúság, tömeg, idő Párosító"
      subtitle="Találd meg az egyenlő értékű mennyiségeket!"
      badge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      themeColor="cyan"
      level={activeLevel}
      currentLevel={activeLevel}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onBack={onBack}
      topicId={topicId}
      topicTitle={topicTitle}
      grade={6}
      chapterId="kerulet-terulet-felszin-terfogat"
    />
  );
};

export default LengthMassTimeMatcher;
