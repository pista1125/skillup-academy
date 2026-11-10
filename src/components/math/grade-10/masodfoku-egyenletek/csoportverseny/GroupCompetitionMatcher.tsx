import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GroupCompetitionMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: 'Típushiba és a detektív helyreigazítás',
    subtitle: 'Párosítsd a levezetésben elkövetett gyakori hibát a helyes javítási szabállyal!',
    pairs: [
      { id: 'gcm1-1', left: 'b = -5 esetén b² = -25 számolása', right: 'Zárójelben kell négyzetelni: (-5)² = +25' },
      { id: 'gcm1-2', left: '3x² + 5x - 2 = 0 esetén osztás 2-vel', right: 'A nevezőben 2 · a = 6 szerepel' },
      { id: 'gcm1-3', left: '2x² - 8x = 0 leosztása x-szel', right: 'Tilos x-szel osztani, ki kell emelni: 2x(x - 4) = 0' },
      { id: 'gcm1-4', left: 'x² = 16 gyöke csak x = 4', right: 'Két valós gyök van: x = ±4' },
      { id: 'gcm1-5', left: 'b = -6 esetén a képletbe -6 írása (-b helyett)', right: 'Az ellentett előjel miatt: -(-6) = +6' },
      { id: 'gcm1-6', left: 'Törtesnél x = 3 gyök, de a nevező (x - 3)', right: 'x = 3 hamis gyök, azonnal el kell vetni' },
      { id: 'gcm1-7', left: 'Szöveges mozgásnál v = -40 km/h gyök', right: 'Negatív sebességet elvetjük, nem lehet fizikai válasz' },
      { id: 'gcm1-8', left: '20 perc késés beírása az egyenletbe 20-ként', right: 'Órára kell váltani: 20 perc = 1/3 óra' }
    ]
  },
  2: {
    title: 'Egyenlet és a diszkrimináns villámgyors értéke',
    subtitle: 'Párosítsd a másodfokú egyenleteket a hozzájuk tartozó D értékkel!',
    pairs: [
      { id: 'gcm2-1', left: 'x² - 6x + 9 = 0', right: 'D = 0 (1 kettős valós gyök: x = 3)' },
      { id: 'gcm2-2', left: 'x² - 5x + 6 = 0', right: 'D = 25 - 24 = 1 > 0 (2 valós gyök: 2 és 3)' },
      { id: 'gcm2-3', left: 'x² + 2x + 5 = 0', right: 'D = 4 - 20 = -16 < 0 (0 valós gyök, ∅)' },
      { id: 'gcm2-4', left: '2x² - 7x + 3 = 0', right: 'D = 49 - 24 = 25 > 0 (gyökök: 3 és 1/2)' },
      { id: 'gcm2-5', left: 'x² + 4x + 4 = 0', right: 'D = 0 (1 kettős gyök: x = -2)' },
      { id: 'gcm2-6', left: '3x² - 2x + 1 = 0', right: 'D = 4 - 12 = -8 < 0 (nincs valós megoldás)' },
      { id: 'gcm2-7', left: 'x² - 4 = 0 (hiányos b = 0)', right: 'D = 0 - 4(1)(-4) = 16 > 0 (gyökök: ±2)' },
      { id: 'gcm2-8', left: 'x² - 2x - 8 = 0', right: 'D = 4 - 4(1)(-8) = 36 > 0 (gyökök: 4 és -2)' }
    ]
  },
  3: {
    title: 'Csapatverseny szituáció és az optimális lépés',
    subtitle: 'Párosítsd a versenyhelyzeteket a legcélravezetőbb matematikai taktikával!',
    pairs: [
      { id: 'gcm3-1', left: 'Látod, hogy a és c különböző előjelű (pl. 5x² + 7x - 3 = 0)', right: 'Azonnal rávághatod: 2 valós gyök van (D > 0 biztosan)' },
      { id: 'gcm3-2', left: 'Bikvadratikus egyenletnél u₁ = 16, u₂ = -9 jött ki', right: 'Csak az u = 16-ból vonsz gyököt (x = ±4), a negatív u kiesik' },
      { id: 'gcm3-3', left: 'A kapott gyökök ellenőrzése 5 másodperc alatt', right: 'Viète-formulák alkalmazása: x₁ + x₂ = -b/a és x₁ · x₂ = c/a' },
      { id: 'gcm3-4', left: 'Folyami feladatnál oda-vissza út egyenlete', right: 'Közös nevező azonnal a v² - v_f² négyzetkülönbség' },
      { id: 'gcm3-5', left: 'Két cső együttes munkája t₁ és t₂ időkkel', right: 'Reciprokos összegzés: 1/t₁ + 1/t₂ = 1/T_közös' },
      { id: 'gcm3-6', left: 'Csapatváltóban az Elemző feladata', right: 'Egyenlet 0-ra rendezése, a, b, c és a kikötések kijelölése' },
      { id: 'gcm3-7', left: 'Kétszeri egymást követő p%-os árváltozás', right: 'Á₂ = Á₀ · (1 - p²/10 000) képlet közvetlen alkalmazása' },
      { id: 'gcm3-8', left: 'Egyenlet gyöke t = -5 a medencetöltésnél', right: 'Azonnal elvetni, negatív idő fizikai képtelenség' }
    ]
  }
};

export const GroupCompetitionMatcher: React.FC<GroupCompetitionMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-masodfoku-egyenletek',
  topicTitle = 'Csoportverseny Párosító'
}) => {
  const activeLevel = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <MatcherTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      level={activeLevel}
      levelConfig={matcherLevels[activeLevel]}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};

