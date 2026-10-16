import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PieChartMatcherProps {
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
    title: '1. Szint: Nevezetes Százalékok és Középponti Szögek',
    subtitle: 'Párosítsd a kördiagram nevezetes százalékos részeit a pontos középponti szögeikkel!',
    pairs: [
      { id: 'p1-1', prompt: '50% részesedés (félkör)', value: '180° (egyenesszög)' },
      { id: 'p1-2', prompt: '25% részesedés (negyedkoll)', value: '90° (derékszög)' },
      { id: 'p1-3', prompt: '75% részesedés (háromnegyed)', value: '270° (három derékszög)' },
      { id: 'p1-4', prompt: '10% részesedés (tizedrész)', value: '36° (360° : 10)' },
      { id: 'p1-5', prompt: '20% részesedés (ötödrész)', value: '72° (20 · 3,6°)' },
      { id: 'p1-6', prompt: '12,5% részesedés (nyolcadrész)', value: '45° (90° : 2)' },
      { id: 'p1-7', prompt: '1% értékének megfelelő szög', value: '3,6° (360° : 100)' },
      { id: 'p1-8', prompt: '100% teljes egész', value: '360° (teljesszög)' }
    ]
  },
  2: {
    title: '2. Szint: Középponti Szögek és Osztálytermi Létszámok',
    subtitle: 'Párosítsd a körcikkek szögeit és adatait a kiszámított létszámokkal és törtekkel!',
    pairs: [
      { id: 'p2-1', prompt: '24 fős osztály: 90°-os körcikk (25%)', value: '6 tanuló' },
      { id: 'p2-2', prompt: '30 fős osztály: 180°-os körcikk (50%)', value: '15 tanuló' },
      { id: 'p2-3', prompt: '40 fős csoport: 144°-os körcikk (40%)', value: '16 tanuló' },
      { id: 'p2-4', prompt: '20 fős osztály: 72°-os körcikk (20%)', value: '4 tanuló' },
      { id: 'p2-5', prompt: '108°-os középponti szög százalékban', value: '30% (108 : 3,6)' },
      { id: 'p2-6', prompt: '144°-os középponti szög százalékban', value: '40% (144 : 3,6)' },
      { id: 'p2-7', prompt: '120°-os körcikk tört alakban', value: '1/3 rész (a kör harmada)' },
      { id: 'p2-8', prompt: '60°-os körcikk tört alakban', value: '1/6 rész (a kör hatoda)' }
    ]
  },
  3: {
    title: '3. Szint: Kördiagram Szabályok és Összefüggések',
    subtitle: 'Párosítsd a kördiagram elméleti törvényszerűségeit és szerkesztési fogalmait!',
    pairs: [
      { id: 'p3-1', prompt: 'A körcikkek középponti szögeinek összege', value: 'Mindig pontosan 360°' },
      { id: 'p3-2', prompt: 'A körcikkek százalékos értékeinek összege', value: 'Mindig pontosan 100%' },
      { id: 'p3-3', prompt: 'Döntött 3D-s tortadiagram hibája', value: 'Az elülső szelet optikailag aránytalanul nagynak tűnik' },
      { id: 'p3-4', prompt: 'Százalékból szög számítása', value: 'α = p · 3,6°' },
      { id: 'p3-5', prompt: 'Szögből százalék visszaszámolása', value: 'p = α : 3,6°' },
      { id: 'p3-6', prompt: 'Miért nem alkalmas 10-nél több kategóriára?', value: 'A vékony szeletek miatt átláthatatlanná válik' },
      { id: 'p3-7', prompt: 'A kördiagram legfőbb alkalmazási előnye', value: 'Egy teljes egész részekre oszlását szemlélteti' },
      { id: 'p3-8', prompt: 'Kézi szerkesztés első lépése a kör megrajzolása után', value: 'Függőleges kezdősugár berajzolása' }
    ]
  }
};

export const PieChartMatcher: React.FC<PieChartMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onBack,
  topicId = 'g6-pie-chart-matcher',
  topicTitle = 'Kördiagram'
}) => {
  const activeLevel = (currentLevel || level) as DifficultyLevel;

  return (
    <MatcherTemplate
      title="Kördiagram párosító"
      subtitle="Párosítsd a százalékokat, középponti szögeket és kördiagramos összefüggéseket 3 szinten!"
      badge="6. OSZTÁLY • VI. STATISZTIKA • 3. KÖRDIAGRAM"
      themeColor="indigo"
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

export default PieChartMatcher;
