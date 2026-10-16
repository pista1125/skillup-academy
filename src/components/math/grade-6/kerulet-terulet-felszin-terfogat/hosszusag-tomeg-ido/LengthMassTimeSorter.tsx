import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LengthMassTimeSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onBack?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Mennyiségtípusok Szétválogatása',
    subtitle: 'Válogasd szét a kifejezéseket aszerint, hogy hosszúságot, tömeget vagy időt mérnek!',
    categories: [
      {
        id: 'cat-length',
        name: 'Hosszúság',
        description: 'Méter, centiméter, kilométer, deciméter, milliméter',
        badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300'
      },
      {
        id: 'cat-mass',
        name: 'Tömeg',
        description: 'Kilogramm, gramm, tonna, mázsa, dekagramm',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-time',
        name: 'Idő',
        description: 'Óra, perc, másodperc, nap',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      }
    ],
    items: [
      { id: 's1-1', label: '450 m', category: 'cat-length' },
      { id: 's1-2', label: '2,5 kg', category: 'cat-mass' },
      { id: 's1-3', label: '15 perc', category: 'cat-time' },
      { id: 's1-4', label: '12 dm', category: 'cat-length' },
      { id: 's1-5', label: '40 dkg', category: 'cat-mass' },
      { id: 's1-6', label: '3 óra', category: 'cat-time' },
      { id: 's1-7', label: '85 mm', category: 'cat-length' },
      { id: 's1-8', label: '3 mázsa', category: 'cat-mass' },
      { id: 's1-9', label: '45 másodperc', category: 'cat-time' },
      { id: 's1-10', label: '5,2 km', category: 'cat-length' },
      { id: 's1-11', label: '1,2 tonna', category: 'cat-mass' },
      { id: 's1-12', label: '1,5 nap', category: 'cat-time' }
    ]
  },
  2: {
    title: '2. Szint: Hasonlítás 1 Kilogrammhoz',
    subtitle: 'Milyen viszonyban van az adott tömeg pontosan 1 kg-mal (100 dkg / 1000 g)?',
    categories: [
      {
        id: 'cat-less-1kg',
        name: 'Kisebb mint 1 kg',
        description: 'Kevesebb mint 1000 g vagy 100 dkg',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-equal-1kg',
        name: 'Pontosan 1 kg',
        description: 'Pontosan 1000 g, 100 dkg vagy 0,001 t',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-greater-1kg',
        name: 'Nagyobb mint 1 kg',
        description: 'Több mint 1000 g vagy 100 dkg',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      { id: 's2-1', label: '450 g', category: 'cat-less-1kg' },
      { id: 's2-2', label: '100 dkg', category: 'cat-equal-1kg' },
      { id: 's2-3', label: '1200 g', category: 'cat-greater-1kg' },
      { id: 's2-4', label: '65 dkg', category: 'cat-less-1kg' },
      { id: 's2-5', label: '1000 g', category: 'cat-equal-1kg' },
      { id: 's2-6', label: '150 dkg', category: 'cat-greater-1kg' },
      { id: 's2-7', label: '0,8 kg', category: 'cat-less-1kg' },
      { id: 's2-8', label: '0,001 t', category: 'cat-equal-1kg' },
      { id: 's2-9', label: '0,2 q', category: 'cat-greater-1kg' },
      { id: 's2-10', label: '950 g', category: 'cat-less-1kg' },
      { id: 's2-11', label: '0,01 q', category: 'cat-equal-1kg' },
      { id: 's2-12', label: '2,5 kg', category: 'cat-greater-1kg' }
    ]
  },
  3: {
    title: '3. Szint: Hasonlítás 1 Órához',
    subtitle: 'Vesd össze az időtartamokat pontosan 1 órával (60 perc = 3600 másodperc)!',
    categories: [
      {
        id: 'cat-less-1h',
        name: 'Kevesebb mint 1 óra',
        description: 'Rövidebb mint 60 perc vagy 3600 másodperc',
        badgeColor: 'bg-sky-100 text-sky-800 border-sky-300'
      },
      {
        id: 'cat-equal-1h',
        name: 'Pontosan 1 óra',
        description: 'Pontosan 60 perc vagy 3600 másodperc',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-greater-1h',
        name: 'Hosszabb mint 1 óra',
        description: 'Több mint 60 perc vagy 3600 másodperc',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      { id: 's3-1', label: '45 perc', category: 'cat-less-1h' },
      { id: 's3-2', label: '60 perc', category: 'cat-equal-1h' },
      { id: 's3-3', label: '75 perc', category: 'cat-greater-1h' },
      { id: 's3-4', label: '1800 s', category: 'cat-less-1h' },
      { id: 's3-5', label: '3600 s', category: 'cat-equal-1h' },
      { id: 's3-6', label: '1,5 óra', category: 'cat-greater-1h' },
      { id: 's3-7', label: '0,5 óra', category: 'cat-less-1h' },
      { id: 's3-8', label: '4/4 óra', category: 'cat-equal-1h' },
      { id: 's3-9', label: '1 óra 10 perc', category: 'cat-greater-1h' },
      { id: 's3-10', label: '50 perc', category: 'cat-less-1h' },
      { id: 's3-11', label: '2400 s', category: 'cat-less-1h' },
      { id: 's3-12', label: '4000 s', category: 'cat-greater-1h' }
    ]
  }
};

export const LengthMassTimeSorter: React.FC<LengthMassTimeSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onBack,
  topicId = 'g6-length-mass-time-sorter',
  topicTitle = 'Hosszúság, tömeg, idő'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <SorterTemplate
      title="Hosszúság, tömeg, idő Csoportosító"
      subtitle="Csoportosítsd a mennyiségeket a megadott kategóriák szerint!"
      badge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      themeColor="cyan"
      level={activeLevel}
      currentLevel={activeLevel}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onBack={onBack}
      topicId={topicId}
      topicTitle={topicTitle}
      grade={6}
      chapterId="kerulet-terulet-felszin-terfogat"
    />
  );
};

export default LengthMassTimeSorter;
