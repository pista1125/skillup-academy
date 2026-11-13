import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  TeamChallengeRelaySvg,
  ErrorHuntStepAnalysisSvg,
  SpeedVieteDuelSvg,
  SignChartSprintSvg,
  ScoreboardTournamentSvg
} from './GroupCompetitionFigures';

interface GroupCompetitionSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: 'Egyenletek megoldási stratégiája versenyhelyzetben',
    subtitle: 'Sorold be a megadott egyenleteket a leggyorsabb és legbiztonságosabb megoldási módszer szerint!',
    categories: [
      {
        id: 'cat-factor',
        name: 'Azonnali szorzattá alakítás vagy kiemelés',
        description: 'Hiányos egyenletek, nevezetes azonosságok vagy egész Viète-gyökök',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-radical',
        name: 'Kikötéshez kötött négyzetre emelés',
        description: 'Irracionális egyenletek: kötelező értelmezési tartomány és próba',
        badgeColor: 'bg-pink-100 text-pink-900 border-pink-300'
      },
      {
        id: 'cat-discriminant',
        name: 'Diszkrimináns / Megoldóképlet',
        description: 'Irracionális vagy tört gyökök, ahol a fejben számolás nem vezet gyors célhoz',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'gcs1-1', content: 'x² - 8x = 0', figure: <SpeedVieteDuelSvg size={42} />, categoryId: 'cat-factor' },
      { id: 'gcs1-2', content: 'x² - 7x + 12 = 0', categoryId: 'cat-factor' },
      { id: 'gcs1-3', content: '4x² - 9 = 0', categoryId: 'cat-factor' },
      { id: 'gcs1-4', content: '√(x + 5) = 3', figure: <TeamChallengeRelaySvg size={42} />, categoryId: 'cat-radical' },
      { id: 'gcs1-5', content: '√(2x - 1) = x - 2', categoryId: 'cat-radical' },
      { id: 'gcs1-6', content: '√(x² - 9) = 4', categoryId: 'cat-radical' },
      { id: 'gcs1-7', content: '2x² - 3x - 1 = 0', figure: <ScoreboardTournamentSvg size={42} />, categoryId: 'cat-discriminant' },
      { id: 'gcs1-8', content: '3x² + 5x + 1 = 0', categoryId: 'cat-discriminant' },
      { id: 'gcs1-9', content: 'x² - 2x - 5 = 0', categoryId: 'cat-discriminant' }
    ]
  },
  2: {
    title: 'A valós gyökök száma a diszkrimináns alapján',
    subtitle: 'Határozd meg villámgyorsan a másodfokú egyenletek valós gyökeinek számát a D előjele szerint!',
    categories: [
      {
        id: 'cat-two-roots',
        name: 'Két különböző valós gyök (D > 0)',
        description: 'A diszkrimináns szigorúan pozitív, a parabolának két zérushelye van',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-one-root',
        name: 'Egy (kétszeres) valós gyök (D = 0)',
        description: 'A kifejezés teljes négyzet, a parabola érinti az x-tengelyt',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-no-root',
        name: 'Nincs valós gyök (D < 0)',
        description: 'A diszkrimináns negatív, a parabola nem metszi az x-tengelyt',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'gcs2-1', content: 'x² - 5x + 4 = 0', figure: <SpeedVieteDuelSvg size={42} />, categoryId: 'cat-two-roots' },
      { id: 'gcs2-2', content: '2x² - 7x + 3 = 0', categoryId: 'cat-two-roots' },
      { id: 'gcs2-3', content: 'x² - 16 = 0', categoryId: 'cat-two-roots' },
      { id: 'gcs2-4', content: 'x² - 6x + 9 = 0', figure: <SignChartSprintSvg size={42} />, categoryId: 'cat-one-root' },
      { id: 'gcs2-5', content: '4x² + 4x + 1 = 0', categoryId: 'cat-one-root' },
      { id: 'gcs2-6', content: 'x² - 10x + 25 = 0', categoryId: 'cat-one-root' },
      { id: 'gcs2-7', content: 'x² + 4x + 10 = 0', figure: <ErrorHuntStepAnalysisSvg size={42} />, categoryId: 'cat-no-root' },
      { id: 'gcs2-8', content: 'x² + 9 = 0', categoryId: 'cat-no-root' },
      { id: 'gcs2-9', content: '2x² - 2x + 5 = 0', categoryId: 'cat-no-root' }
    ]
  },
  3: {
    title: 'Műveletek ekvivalenciája versenyhelyzetben',
    subtitle: 'Csoportosítsd az átalakításokat aszerint, hogy milyen hatással vannak az egyenlet megoldáshalmazára!',
    categories: [
      {
        id: 'cat-equiv',
        name: 'Mindig ekvivalens átalakítás',
        description: 'A megoldáshalmaz garantáltan nem változik, nem kell hamis gyöktől tartani',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-loss',
        name: 'Gyökvesztéssel fenyegető lépés',
        description: 'Ismeretlennel való osztás miatt megoldások tűnhetnek el végleg',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-false',
        name: 'Hamis gyököt behozó lépés',
        description: 'Páros kitevőre emelés vagy ismeretlennel szorzás, ami próbát tesz kötelezővé',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'gcs3-1', content: 'Mindkét oldalhoz 5x hozzáadása', figure: <TeamChallengeRelaySvg size={42} />, categoryId: 'cat-equiv' },
      { id: 'gcs3-2', content: 'Mindkét oldal megszorzása 3-mal', categoryId: 'cat-equiv' },
      { id: 'gcs3-3', content: 'Zárójelbontás és összevonás egy oldalon', categoryId: 'cat-equiv' },
      { id: 'gcs3-4', content: 'Mindkét oldal leosztása (x - 2)-vel', figure: <ErrorHuntStepAnalysisSvg size={42} />, categoryId: 'cat-loss' },
      { id: 'gcs3-5', content: 'Mindkét oldal osztása x-szel', categoryId: 'cat-loss' },
      { id: 'gcs3-6', content: 'Tört egyszerűsítése (x + 1)-gyel kikötés nélkül', categoryId: 'cat-loss' },
      { id: 'gcs3-7', content: '√(x + 3) = -1 négyzetre emelése', figure: <ScoreboardTournamentSvg size={42} />, categoryId: 'cat-false' },
      { id: 'gcs3-8', content: 'Egyenlet szorzása (x - 4)-gyel', categoryId: 'cat-false' },
      { id: 'gcs3-9', content: '√(2x - 1) = x négyzetre emelése próba nélkül', categoryId: 'cat-false' }
    ]
  }
};

export const GroupCompetitionSorter: React.FC<GroupCompetitionSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-eq-csoportverseny-sorter',
  topicTitle = '8. Csoportverseny'
}) => {
  const activeLevel = currentLevel ?? level;

  return (
    <SorterTemplate
      level={activeLevel}
      levelConfigs={sorterLevels}
      themeColor="pink"
      topicId={topicId}
      topicTitle={topicTitle}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

