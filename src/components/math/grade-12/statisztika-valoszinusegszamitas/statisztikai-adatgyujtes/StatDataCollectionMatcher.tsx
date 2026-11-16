import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface StatDataCollectionMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const STAT_DATA_COLLECTION_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Fogalmak',
    description: 'Párosítsd a fogalmat a jelentésével!',
    pairs: [
      { id: 'sdcm1', left: 'adatsokaság', right: 'az összes vizsgálni kívánt egyed (pl. a város összes lakója)' },
      { id: 'sdcm2', left: 'minta', right: 'a sokaság ténylegesen megkérdezett része' },
      { id: 'sdcm3', left: 'reprezentatív minta', right: 'adatai megfelelő módon tükrözik a teljes sokaságot' },
      { id: 'sdcm4', left: 'torzított minta', right: 'egyes csoportok túl- vagy alulreprezentáltak benne' },
      { id: 'sdcm5', left: 'osztály (csoport)', right: 'a sokaság egy szempont szerint elkülönülő része' },
      { id: 'sdcm6', left: 'mintanagyság', right: 'a mintába választott elemek száma' },
      { id: 'sdcm7', left: 'Literary Digest, 1936', right: '2,4 millió válasz, mégis téves előrejelzés' },
      { id: 'sdcm8', left: 'Gallup, 1936', right: '50 000 fős reprezentatív minta, pontos becslés' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Arányos minta',
    description: 'Párosítsd a feladatot a mintabeli létszámmal!',
    pairs: [
      { id: 'sdcm9', left: '1000 fő, 40% nő → 200 fős minta: nők', right: '80' },
      { id: 'sdcm10', left: '600 tanuló, 150 kilencedikes → 40 fős minta', right: '10' },
      { id: 'sdcm11', left: '13 000 lakos, 6600 nő → 2000 fős minta: nők', right: '≈ 1015' },
      { id: 'sdcm12', left: '13 000 lakos, 1963 szakiskolás férfi → 2000 fős minta', right: '302' },
      { id: 'sdcm13', left: '10 000 fő, 5000 középkorú → 500 fős minta', right: '250' },
      { id: 'sdcm14', left: '52% nő → 500 fős minta: nők', right: '260' },
      { id: 'sdcm15', left: '1000 fő, 180 a III. osztályban → 60 fős minta', right: '11' },
      { id: 'sdcm16', left: '10 000 fő, 3000 fiatal → 500 fős minta', right: '150' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Valószínűségek a tankönyvi feladatokból',
    description: 'Párosítsd a kérdést a valószínűséggel!',
    pairs: [
      { id: 'sdcm17', left: 'városban: férfi és szakiskola (1963 / 13 000)', right: '≈ 0,151' },
      { id: 'sdcm18', left: 'mintában: érettségizett nő ((349 + 172) / 2000)', right: '≈ 0,26' },
      { id: 'sdcm19', left: 'vásárló: kártya vagy kupon (60% + 25% − 12%)', right: '0,73' },
      { id: 'sdcm20', left: 'vásárló: egyik kedvezmény sem', right: '0,27' },
      { id: 'sdcm21', left: 'balesetes ügyfél rendszeres vezető (174 / 300)', right: '0,58' },
      { id: 'sdcm22', left: 'kuponhasználónak kártyája is van (12 / 25)', right: '0,48' },
      { id: 'sdcm23', left: 'legfeljebb 3 éjszakás látogató német', right: '≈ 0,068' },
      { id: 'sdcm24', left: 'tanuló szemüveges (120 / 400)', right: '0,3' }
    ]
  }
};

export const StatDataCollectionMatcher: React.FC<StatDataCollectionMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-stat-adatgyujtes-matcher',
  topicTitle = '1. Statisztikai adatgyűjtés – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="statisztika-valoszinusegszamitas"
      topicId={topicId}
      subtopicId="statisztikai-adatgyujtes"
      title={topicTitle}
      subtitle="Gyakorold a minta fogalmait, az arányos minta készítését és a valószínűségek kiszámítását!"
      levels={STAT_DATA_COLLECTION_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default StatDataCollectionMatcher;
