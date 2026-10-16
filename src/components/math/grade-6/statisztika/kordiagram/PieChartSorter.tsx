import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PieChartSorterProps {
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
    title: '1. Szint: Középponti Szögek Mérete és Fajtája',
    subtitle: 'Válogasd szét a százalékokat és körcikkeket a hozzájuk tartozó szögfajta szerint!',
    categories: [
      {
        id: 'cat-acute',
        name: 'Hegyesszög (α < 90°)',
        description: 'Kisebb, mint a kör negyede (p < 25%)',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-right',
        name: 'Pontosan Derékszög (α = 90°)',
        description: 'A kör pontosan egynegyede (p = 25%)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-obtuse',
        name: 'Tompaszög (90° < α < 180°)',
        description: 'A kör negyede és fele közötti rész (25% < p < 50%)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-straight-reflex',
        name: 'Egyenes- vagy Homorúszög (α ≥ 180°)',
        description: 'Legalább a kör fele (p ≥ 50%)',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      { id: 's1-1', label: '10% részesedés (36°)', category: 'cat-acute' },
      { id: 's1-2', label: '25% részesedés (90°)', category: 'cat-right' },
      { id: 's1-3', label: '50% részesedés (180°)', category: 'cat-straight-reflex' },
      { id: 's1-4', label: '40% részesedés (144°)', category: 'cat-obtuse' },
      { id: 's1-5', label: '20% részesedés (72°)', category: 'cat-acute' },
      { id: 's1-6', label: '1/4 rész (90°)', category: 'cat-right' },
      { id: 's1-7', label: '35% részesedés (126°)', category: 'cat-obtuse' },
      { id: 's1-8', label: '75% részesedés (270°)', category: 'cat-straight-reflex' },
      { id: 's1-9', label: '12,5% részesedés (45°)', category: 'cat-acute' },
      { id: 's1-10', label: '30% részesedés (108°)', category: 'cat-obtuse' },
      { id: 's1-11', label: '5% részesedés (18°)', category: 'cat-acute' },
      { id: 's1-12', label: '60% részesedés (216°)', category: 'cat-straight-reflex' }
    ]
  },
  2: {
    title: '2. Szint: A legmegfelelőbb diagram kiválasztása',
    subtitle: 'Melyik feladathoz a legalkalmasabb a kördiagram, és mikor jobb más diagramot választani?',
    categories: [
      {
        id: 'cat-pie',
        name: 'Kördiagram a legjobb',
        description: 'Egy egész megoszlása részekre, kevés (3-6) kategória esetén',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-column',
        name: 'Oszlopdiagram a legjobb',
        description: 'Különálló kategóriák összehasonlítása, sok kategória vagy abszolút számok',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-line',
        name: 'Vonaldiagram a legjobb',
        description: 'Időbeli folyamatok, folytonos változások (hőmérséklet, sebesség)',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      }
    ],
    items: [
      { id: 's2-1', label: 'Családi havi költségvetés megoszlása (lakbér, étel, rezsi, megtakarítás)', category: 'cat-pie' },
      { id: 's2-2', label: 'Egy téli nap óránkénti hőmérsékletének változása', category: 'cat-line' },
      { id: 's2-3', label: 'Egy iskola 15 szakkörének pontos tanulói létszáma', category: 'cat-column' },
      { id: 's2-4', label: 'A Föld felszínének megoszlása óceán (71%) és szárazföld (29%) között', category: 'cat-pie' },
      { id: 's2-5', label: 'Futóversenyző pillanatnyi sebessége percről percre', category: 'cat-line' },
      { id: 's2-6', label: 'Magyarország 19 vármegyéjének lakosságszáma', category: 'cat-column' },
      { id: 's2-7', label: 'Egy ország villamosenergia-termelésének forrásai (atom, nap, szél, gáz)', category: 'cat-pie' },
      { id: 's2-8', label: 'Egy hegyi túrázó magasságának alakulása az eltelt órákban', category: 'cat-line' },
      { id: 's2-9', label: 'Matematika dolgozat érdemjegyeinek (1-5) gyakorisága', category: 'cat-column' },
      { id: 's2-10', label: 'Egy nap 24 órájának megoszlása (alvás, iskola, sport, szabadidő)', category: 'cat-pie' },
      { id: 's2-11', label: '12 hónap havi csapadékösszege külön tömbökben', category: 'cat-column' },
      { id: 's2-12', label: 'A Duna folyó vízállásának ingadozása egy hónap során', category: 'cat-line' }
    ]
  },
  3: {
    title: '3. Szint: Állítások a Kördiagramról',
    subtitle: 'Döntsd el a kördiagram szerkesztéséről és tulajdonságairól szóló állításokról, hogy igazak vagy tévesek!',
    categories: [
      {
        id: 'cat-true',
        name: 'Mindig Igaz',
        description: 'Matematikailag helyes és pontos szabály a kördiagramra',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-false',
        name: 'Hamis / Tévhit',
        description: 'Matematikai hiba vagy manipulatív tévedés',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      { id: 's3-1', label: 'A kördiagram körcikkeinek középponti szögei mindig 360°-ot adnak ki összeadva', category: 'cat-true' },
      { id: 's3-2', label: '1% részesedésnek pontosan 3,6°-os középponti szög felel meg', category: 'cat-true' },
      { id: 's3-3', label: 'A kördiagramon a derékszögű (90°-os) körcikk a teljes egész felét (50%) jelenti', category: 'cat-false' },
      { id: 's3-4', label: 'A döntött 3D-s tortadiagramon az elöl lévő szelet optikailag jóval nagyobbnak látszik', category: 'cat-true' },
      { id: 's3-5', label: 'Egy kördiagram szeleteinek százalékos összege lehet 115% is', category: 'cat-false' },
      { id: 's3-6', label: 'A 180°-os körcikk pontosan az adatok 50%-át (felét) képviseli', category: 'cat-true' },
      { id: 's3-7', label: 'Ha egy körcikk szöge 72°, akkor a hozzá tartozó százalék pontosan 20%', category: 'cat-true' },
      { id: 's3-8', label: 'Minél több kategóriánk van (pl. 25 adat), annál áttekinthetőbb a kördiagram', category: 'cat-false' },
      { id: 's3-9', label: 'A középponti szög kiszámítási képlete: α = p · 3,6°', category: 'cat-true' },
      { id: 's3-10', label: 'A kördiagram körcikkeit egymás után, az előző sugárra illesztett szögmérővel mérjük ki', category: 'cat-true' }
    ]
  }
};

export const PieChartSorter: React.FC<PieChartSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onBack,
  topicId = 'g6-pie-chart-sorter',
  topicTitle = 'Kördiagram'
}) => {
  const activeLevel = (currentLevel || level) as DifficultyLevel;

  return (
    <SorterTemplate
      title="Kördiagram csoportosító"
      subtitle="Válogasd szét a középponti szögeket, diagramválasztási helyzeteket és állításokat 3 szinten!"
      badge="6. OSZTÁLY • VI. STATISZTIKA • 3. KÖRDIAGRAM"
      themeColor="indigo"
      level={activeLevel}
      currentLevel={activeLevel}
      levels={sorterLevels}
      levelsConfig={sorterLevels}
      config={sorterLevels[activeLevel]}
      levelConfig={sorterLevels[activeLevel]}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onBack={onBack}
      topicId={topicId}
      topicTitle={topicTitle}
      grade={6}
      chapterId="statisztika"
    />
  );
};

export default PieChartSorter;
