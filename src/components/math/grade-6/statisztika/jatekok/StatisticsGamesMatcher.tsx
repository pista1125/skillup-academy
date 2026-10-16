import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface StatisticsGamesMatcherProps {
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
    title: '1. Szint: Halmazok és Műveleti Jelek',
    subtitle: 'Párosítsd a halmazelméleti fogalmakat a megfelelő matematikai szimbólumokkal és jelentésükkel!',
    pairs: [
      { id: 'p1-1', prompt: 'A ∩ B (Metszet)', value: 'Közös elemek (mindkettőben benne van)' },
      { id: 'p1-2', prompt: 'A ∪ B (Unió)', value: 'Egyesítés (legalább az egyikben benne van)' },
      { id: 'p1-3', prompt: 'A \\ B (Különbség)', value: 'Csak A elemei (B nélkül)' },
      { id: 'p1-4', prompt: 'U jelölés', value: 'Alaphalmaz (Univerzum, a téglalap keret)' },
      { id: 'p1-5', prompt: '2 egymást metsző kör tartományai', value: '4 diszjunkt tartomány a síkban' },
      { id: 'p1-6', prompt: 'Üres halmaz jele (∅)', value: 'Olyan halmaz, amelynek nincs eleme' },
      { id: 'p1-7', prompt: 'Komplementer halmaz (Ā)', value: 'Az alaphalmaz minden eleme, ami nem A-ban van' },
      { id: 'p1-8', prompt: 'Diszjunkt halmazok', value: 'Nincs közös elemük (metszetük üres)' }
    ]
  },
  2: {
    title: '2. Szint: Osztálytermi Statisztikák és Szita-formula',
    subtitle: 'Párosítsd az osztálytermi feladványok kérdéseit a kiszámított eredményekkel!',
    pairs: [
      { id: 'p2-1', prompt: '30 fő: 18 sportol, 12 zenél, 6 mindkettőt. Hányan CSAK sportolnak?', value: '12 fő (18 - 6)' },
      { id: 'p2-2', prompt: '30 fő: 18 sportol, 12 zenél, 6 mindkettőt. Hányan CSAK zenélnek?', value: '6 fő (12 - 6)' },
      { id: 'p2-3', prompt: '30 fő: 18 sportol, 12 zenél, 6 mindkettőt. Hányan csinálnak legalább egyet?', value: '24 fő (12 + 6 + 6)' },
      { id: 'p2-4', prompt: '30 fő: 18 sportol, 12 zenél, 6 mindkettőt. Hányan nem csinálják egyiket sem?', value: '6 fő (30 - 24)' },
      { id: 'p2-5', prompt: 'Szita-formula két halmaz uniójára', value: '|A ∪ B| = |A| + |B| - |A ∩ B|' },
      { id: 'p2-6', prompt: '25 fős osztályban mindenki tanul nyelvet: 15 angolos, 14 németes. Hányan tanulnak mindkettőt?', value: '4 fő (15 + 14 - 25)' },
      { id: 'p2-7', prompt: 'A = {2, 4, 6, 8}, B = {4, 8, 12}. Mi az A ∩ B metszet?', value: '{4, 8}' },
      { id: 'p2-8', prompt: 'A = {1, 2, 3}, B = {3, 4, 5}. Mi az A \\ B különbség?', value: '{1, 2}' }
    ]
  },
  3: {
    title: '3. Szint: Barkochba, Logikai Mátrix és Hármas Venn',
    subtitle: 'Párosítsd a logikai játékok és összetett halmazok törvényszerűségeit!',
    pairs: [
      { id: 'p3-1', prompt: 'Barkochba: 1-től 100-ig egy szám kitalálása felezéssel', value: 'Legfeljebb 7 kérdés (2⁷ = 128)' },
      { id: 'p3-2', prompt: 'Barkochba: 20 eldöntendő kérdéssel lehetséges állapotok', value: '2²⁰ = 1 048 576 lehetőség' },
      { id: 'p3-3', prompt: 'Három egymást metsző kör belső tartományainak száma', value: '7 belső zárt tartomány' },
      { id: 'p3-4', prompt: 'Háromhalmazos feladat kitöltési sorrendje', value: 'Legbelső hármas metszettől kifelé' },
      { id: 'p3-5', prompt: 'Logikai mátrixban egy sorba beírt ✓ pipa következménye', value: 'A sor és oszlop többi mezője mind ✗ lesz' },
      { id: 'p3-6', prompt: '1-től 1000-ig gondolt szám barkochba felezéssel', value: 'Legfeljebb 10 kérdés (2¹⁰ = 1024)' },
      { id: 'p3-7', prompt: '3 halmaz mindegyikében benne lévő közös elemek', value: 'A ∩ B ∩ C hármas metszet' },
      { id: 'p3-8', prompt: 'A felező barkochba 1 kérdésének információtartalma', value: '1 bit (a bizonytalanság fele)' }
    ]
  }
};

export const StatisticsGamesMatcher: React.FC<StatisticsGamesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onBack,
  topicId = 'g6-stat-games-matcher',
  topicTitle = 'Játékok és Venn-diagramok'
}) => {
  const activeLevel = (currentLevel || level) as DifficultyLevel;

  return (
    <MatcherTemplate
      title="Halmazok és logikai játékok párosító"
      subtitle="Párosítsd a halmazelméleti jeleket, számításokat és logikai szabályokat 3 szinten!"
      badge="6. OSZTÁLY • VI. STATISZTIKA • 1. JÁTÉKOK"
      themeColor="pink"
      level={activeLevel}
      currentLevel={activeLevel}
      levels={matcherLevels}
      levelsConfig={matcherLevels}
      config={matcherLevels[activeLevel]}
      levelConfig={matcherLevels[activeLevel]}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onBack={onBack}
      topicId={topicId}
      topicTitle={topicTitle}
      grade={6}
      chapterId="statisztika"
    />
  );
};

export default StatisticsGamesMatcher;
