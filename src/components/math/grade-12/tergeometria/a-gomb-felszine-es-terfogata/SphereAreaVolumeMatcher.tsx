import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SphereAreaVolumeMatcherProps {
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

const SPHERE_AREA_VOLUME_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Képletek és fogalmak',
    description: 'Párosítsd a mennyiségeket a képletükkel vagy jelentésükkel!',
    pairs: [
      { id: 'savm1', left: 'A gömb felszíne', right: 'A = 4r²π' },
      { id: 'savm2', left: 'A gömb térfogata', right: 'V = 4r³π / 3' },
      { id: 'savm3', left: 'Egy főkör területe', right: 'r²π' },
      { id: 'savm4', left: 'A köré írt henger magassága', right: '2r (az átmérő)' },
      { id: 'savm5', left: 'A köré írt henger térfogata', right: '2r³π' },
      { id: 'savm6', left: '1 dm³', right: '1 liter' },
      { id: 'savm7', left: '1 liter víz tömege', right: '≈ 1 kg' },
      { id: 'savm8', left: 'A gömbfelület', right: 'nem teríthető ki síkba' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Számold ki!',
    description: 'Párosítsd a gömb adatát a felszínével vagy térfogatával!',
    pairs: [
      { id: 'savm9', left: 'r = 3 cm ⇒ A', right: '36π ≈ 113,1 cm²' },
      { id: 'savm10', left: 'r = 6 cm ⇒ V', right: '288π ≈ 904,8 cm³' },
      { id: 'savm11', left: 'd = 10 cm ⇒ A', right: '100π ≈ 314,2 cm²' },
      { id: 'savm12', left: 'd = 20 cm ⇒ V', right: '≈ 4189 cm³' },
      { id: 'savm13', left: 'r = 1 cm ⇒ V', right: '4π / 3 ≈ 4,19 cm³' },
      { id: 'savm14', left: 'A = 64π cm² ⇒ r', right: '4 cm' },
      { id: 'savm15', left: 'V = 36π cm³ ⇒ r', right: '3 cm' },
      { id: 'savm16', left: 'r = 2 m ⇒ A', right: '16π ≈ 50,3 m²' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Tankönyvi feladatok',
    description: 'Párosítsd a feladatot a helyes eredménnyel!',
    pairs: [
      { id: 'savm17', left: '8 kg-os gömb alakú dinnye átmérője', right: '≈ 25 cm' },
      { id: 'savm18', left: '2 cm-es golyóból 1 mm-es sörétek száma', right: '8000' },
      { id: 'savm19', left: 'A sörétek együttes felszíne : golyó felszíne', right: '20' },
      { id: 'savm20', left: '24 cm-es dinnye, 2 cm-es héj ⇒ ehető', right: '≈ 57,9 %' },
      { id: 'savm21', left: '4 cm és 3 cm sugarú gyertyából öntött gömb sugara', right: '∛91 ≈ 4,50 cm' },
      { id: 'savm22', left: 'Félgömb végű kazán (d = 4 m, M = 3,5 m) felszíne', right: '30π ≈ 94,2 m²' },
      { id: 'savm23', left: 'A Föld (R = 6371 km) vízfelülete (70,8 %)', right: '≈ 3,6 · 10⁸ km²' },
      { id: 'savm24', left: '10 db 30 mm-es buborék együttes felszíne', right: '≈ 282,7 cm²' }
    ]
  }
];

const SPHERE_AREA_VOLUME_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: SPHERE_AREA_VOLUME_MATCHER_LEVELS_LIST[0],
  2: SPHERE_AREA_VOLUME_MATCHER_LEVELS_LIST[1],
  3: SPHERE_AREA_VOLUME_MATCHER_LEVELS_LIST[2]
};

export const SphereAreaVolumeMatcher: React.FC<SphereAreaVolumeMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-ter-gomb-felszin-terfogat-matcher',
  topicTitle = '7. A gömb felszíne és térfogata – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="tergeometria"
      topicId={topicId}
      subtopicId="a-gomb-felszine-es-terfogata"
      title={topicTitle}
      subtitle="Gyakorold a gömb felszín- és térfogatképletét és a tankönyvi alkalmazásokat!"
      levels={SPHERE_AREA_VOLUME_MATCHER_LEVELS}
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

export default SphereAreaVolumeMatcher;
