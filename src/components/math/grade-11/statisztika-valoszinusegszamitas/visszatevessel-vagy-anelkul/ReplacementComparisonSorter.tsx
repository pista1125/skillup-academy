import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ReplacementComparisonSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const REPLACEMENT_COMPARISON_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Melyik modell illik a helyzethez?',
    description: 'Sorold be a helyzetet aszerint, melyik mintavételi modellel számolunk!',
    categories: [
      { id: 'with', name: 'visszatevéses (binomiális)', color: 'blue' },
      { id: 'without', name: 'visszatevés nélküli', color: 'amber' },
      { id: 'both', name: 'nagy sokaság: mindkettő jó közelítés', color: 'emerald' }
    ],
    items: [
      { id: 'rcs1', text: 'egy kockával 10-szer dobunk', categoryId: 'with' },
      { id: 'rcs2', text: 'golyót húzunk, megnézzük, visszatesszük – 5-ször', categoryId: 'with' },
      { id: 'rcs3', text: 'lapot húzunk, majd visszakeverjük a pakliba – 4-szer', categoryId: 'with' },
      { id: 'rcs4', text: 'ötös lottó: 90 számból 5-öt húznak', categoryId: 'without' },
      { id: 'rcs5', text: '24 jelentkezőből 3 diákot sorsolnak ki', categoryId: 'without' },
      { id: 'rcs6', text: '60 nézőből 5 játékost sorsolnak, mindenki egyszer', categoryId: 'without' },
      { id: 'rcs7', text: 'országos közvélemény-kutatás 1000 megkérdezettel', categoryId: 'both' },
      { id: 'rcs8', text: '2500 fő között 20 utalványt sorsolnak', categoryId: 'both' },
      { id: 'rcs9', text: 'balkezesek egy véletlen 17 fős csoportban (p ≈ 0,11)', categoryId: 'both' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Mekkora a valószínűség?',
    description: 'Számold ki (vagy idézd fel) a valószínűséget, és sorold be!',
    categories: [
      { id: 'low', name: 'p < 0,1', color: 'rose' },
      { id: 'mid', name: '0,1 ≤ p < 0,5', color: 'teal' },
      { id: 'high', name: 'p ≥ 0,5', color: 'violet' }
    ],
    items: [
      { id: 'rcs10', text: 'metró (p = 0,92): 50 utasból mindenkinek van jegye', categoryId: 'low' },
      { id: 'rcs11', text: '64 figurából (4 űrhajós) 5: pontosan 2 űrhajós', categoryId: 'low' },
      { id: 'rcs12', text: 'busz (60 / 12), 10 különböző utas: 0 tanulóbérletes', categoryId: 'low' },
      { id: 'rcs13', text: 'Tomi, 3 húzás visszatevés nélkül: nincs maszlag', categoryId: 'mid' },
      { id: 'rcs14', text: '24 jelentkezőből (15 tizenkettedikes) 3: mind 12.-es', categoryId: 'mid' },
      { id: 'rcs15', text: '17 fős csoport (p = 0,11): nincs balkezes', categoryId: 'mid' },
      { id: 'rcs16', text: '50 darab (20 selejtes), 15 vizsgált, visszatevéssel: 5–7 selejtes', categoryId: 'high' },
      { id: 'rcs17', text: 'Tomi, 4 húzás visszatevéssel: van maszlag', categoryId: 'high' },
      { id: 'rcs18', text: '64 figurából (4 űrhajós) 5: nincs űrhajós', categoryId: 'high' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Melyik modell ad nagyobb valószínűséget?',
    description: 'Hasonlítsd össze a visszatevéses és a visszatevés nélküli eredményt!',
    categories: [
      { id: 'woBig', name: 'visszatevés nélkül nagyobb', color: 'amber' },
      { id: 'wBig', name: 'visszatevéssel nagyobb', color: 'blue' },
      { id: 'eq', name: 'a kettő egyenlő', color: 'emerald' }
    ],
    items: [
      { id: 'rcs19', text: '50 darab (20 selejtes), 15 vizsgált: 5, 6 vagy 7 selejtes', categoryId: 'woBig' },
      { id: 'rcs20', text: '3 piros, 7 kék golyó, 3 húzás: pontosan 1 piros', categoryId: 'woBig' },
      { id: 'rcs21', text: '24 jelentkező (15 + 9), 3 diák: két 12.-es és egy 11.-es', categoryId: 'woBig' },
      { id: 'rcs22', text: '4 piros, 6 kék golyó, 2 húzás: mindkettő piros', categoryId: 'wBig' },
      { id: 'rcs23', text: 'busz (60 / 12), 10 ellenőrzés: 0 tanulóbérletes', categoryId: 'wBig' },
      { id: 'rcs24', text: '24 jelentkező (15 tizenkettedikes), 3 diák: mind 12.-es', categoryId: 'wBig' },
      { id: 'rcs25', text: '4 piros, 6 kék golyó: az első húzás piros', categoryId: 'eq' },
      { id: 'rcs26', text: '4 piros, 6 kék golyó: a második húzás piros (az elsőt nem nézzük meg)', categoryId: 'eq' },
      { id: 'rcs27', text: '4 piros, 6 kék golyó, 3 húzás: a pirosak számának várható értéke', categoryId: 'eq' }
    ]
  }
};

export const ReplacementComparisonSorter: React.FC<ReplacementComparisonSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-stat-visszatevessel-vagy-anelkul-sorter',
  topicTitle = '15. Ráadás – Visszatevéssel vagy anélkül? – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="visszatevessel-vagy-anelkul"
      title={topicTitle}
      subtitle="Csoportosítsd a helyzeteket a mintavételi modell, a valószínűség nagysága és a két modell összevetése szerint!"
      levels={REPLACEMENT_COMPARISON_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default ReplacementComparisonSorter;
