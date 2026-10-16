import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface StatisticsSummaryMatcherProps {
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
    title: '1. Szint: A Statisztika Alapfogalmai és Jelölései',
    subtitle: 'Párosítsd a témakör legfontosabb statisztikai fogalmait a szabatos definíciójukkal!',
    pairs: [
      { id: 'p1-1', prompt: 'Számtani közép (Átlag, x̄)', value: 'Az adatok összege osztva a darabszámmal' },
      { id: 'p1-2', prompt: 'Medián (Me)', value: 'A nagyság szerint rendezett adatsor középső eleme' },
      { id: 'p1-3', prompt: 'Módusz (Mo)', value: 'A leggyakoribb érték (a minta csúcsa)' },
      { id: 'p1-4', prompt: 'Terjedelem (R)', value: 'A legnagyobb és legkisebb adat különbsége (Max - Min)' },
      { id: 'p1-5', prompt: 'Relatív gyakoriság (f)', value: 'A gyakoriság és az összes adat hányadosa (k / n)' },
      { id: 'p1-6', prompt: 'Kördiagram aranyszabály', value: 'A teljes körlap 360° = 100%' },
      { id: 'p1-7', prompt: '1% középponti szöge', value: '3,6° (360° : 100)' },
      { id: 'p1-8', prompt: 'Csonkított tengely', value: 'Nem 0-ról induló y tengely (félrevezető)' }
    ]
  },
  2: {
    title: '2. Szint: Nevezetes Számítások és Képletek',
    subtitle: 'Párosítsd a statisztikai szabályokat a pontos matematikai eredményeikkel!',
    pairs: [
      { id: 'p2-1', prompt: '25% részesedés a kördiagramon', value: '90° (derékszög, a kör negyede)' },
      { id: 'p2-2', prompt: '50% részesedés a kördiagramon', value: '180° (egyenesszög, félkörlap)' },
      { id: 'p2-3', prompt: '75% részesedés a kördiagramon', value: '270° (három derékszög)' },
      { id: 'p2-4', prompt: '10% részesedés a kördiagramon', value: '36° (a kör tizedrésze)' },
      { id: 'p2-5', prompt: 'Páros darabszám esetén a medián', value: 'A két középső szám számtani közepe' },
      { id: 'p2-6', prompt: 'Átlagtól vett előjeles eltérések összege', value: 'Mindig pontosan 0 (egyensúlyi pont)' },
      { id: 'p2-7', prompt: 'Relatív gyakoriságok összege a mintában', value: 'Mindig pontosan 1,0 (vagy 100%)' },
      { id: 'p2-8', prompt: 'Extrém kiugró érték (outlier) hatása', value: 'Az átlagot erősen eltolja, a mediánt nem érinti' }
    ]
  },
  3: {
    title: '3. Szint: Diagramtípusok és Ideális Alkalmazásaik',
    subtitle: 'Párosítsd a diagramtípusokat azzal a céllal, amelyre a legalkalmasabbak!',
    pairs: [
      { id: 'p3-1', prompt: 'Oszlopdiagram (álló)', value: 'Különböző kategóriák összehasonlítása (0-ról indítva)' },
      { id: 'p3-2', prompt: 'Sávdiagram (fekvő)', value: 'Hosszú feliratú kategóriák és rangsorok bemutatása' },
      { id: 'p3-3', prompt: 'Vonalgrafikon', value: 'Időbeli folytonos folyamatok és változások ábrázolása' },
      { id: 'p3-4', prompt: 'Kördiagram', value: 'Egy teljes egész (100%) arányos részeinek szemléltetése' },
      { id: 'p3-5', prompt: 'Kettős oszlopdiagram', value: 'Két csoport párhuzamos összehasonlítása közös skálán' },
      { id: 'p3-6', prompt: 'Venn-diagram', value: 'Halmazok metszeteinek és közös elemeinek ábrázolása' },
      { id: 'p3-7', prompt: 'Pontdiagram (dot plot)', value: 'Kis minták eloszlásának és ponttornyainak leolvasása' },
      { id: 'p3-8', prompt: 'Számegyenes mérleg', value: 'Az átlag mint fizikai egyensúlyi súlypont bemutatása' }
    ]
  }
};

export const StatisticsSummaryMatcher: React.FC<StatisticsSummaryMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onBack,
  topicId = 'g6-stat-summary-matcher',
  topicTitle = 'Statisztika összefoglaló párosító'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <MatcherTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      level={activeLevel}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onBack={onBack}
    />
  );
};

export default StatisticsSummaryMatcher;
