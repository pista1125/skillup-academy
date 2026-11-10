import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ComprehensiveReviewSorterProps {
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
    title: 'Egyenletek osztályozása a leggyorsabb módszer szerint',
    subtitle: 'Hová tartoznak a következő kifejezések az optimális megoldási út szerint?',
    categories: [
      {
        id: 'cat-factoring',
        name: 'Kiemelés (c = 0)',
        description: 'Mindkét tagban van x, kiemeléssel azonnal x₁ = 0 gyököt kapunk.',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-direct-root',
        name: 'Közvetlen gyökvonás (b = 0)',
        description: 'Nincs elsőfokú tag, az x² kifejezhető és közvetlenül gyököt vonunk.',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-formula',
        name: 'Megoldóképlet / D',
        description: 'Teljes másodfokú egyenlet (a, b, c ≠ 0), diszkrimináns és képlet kell.',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-reducible',
        name: 'Visszavezethető egyenlet',
        description: 'Biquadratikus (u = x²) vagy törtes, amit át kell alakítani.',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'crs1-1', content: '3x² - 15x = 0', categoryId: 'cat-factoring' },
      { id: 'crs1-2', content: '2x² - 72 = 0', categoryId: 'cat-direct-root' },
      { id: 'crs1-3', content: '2x² - 5x + 2 = 0', categoryId: 'cat-formula' },
      { id: 'crs1-4', content: 'x⁴ - 5x² + 4 = 0', categoryId: 'cat-reducible' },
      { id: 'crs1-5', content: '5x² + 20x = 0', categoryId: 'cat-factoring' },
      { id: 'crs1-6', content: '4x² - 100 = 0', categoryId: 'cat-direct-root' },
      { id: 'crs1-7', content: '3x² + 4x - 7 = 0', categoryId: 'cat-formula' },
      { id: 'crs1-8', content: '(2x + 1)/x = 5/(x - 1)', categoryId: 'cat-reducible' },
      { id: 'crs1-9', content: '7x² - 28x = 0', categoryId: 'cat-factoring' },
      { id: 'crs1-10', content: '9x² - 81 = 0', categoryId: 'cat-direct-root' },
      { id: 'crs1-11', content: 'x² - 6x + 8 = 0', categoryId: 'cat-formula' },
      { id: 'crs1-12', content: '2x⁴ - 18x² = 0', categoryId: 'cat-reducible' }
    ]
  },
  2: {
    title: 'Valós gyökök száma a diszkrimináns alapján',
    subtitle: 'Sorold be az egyenleteket a valós megoldások száma szerint!',
    categories: [
      {
        id: 'cat-two-roots',
        name: '2 különböző valós gyök (D > 0)',
        description: 'Két metszéspont az x-tengellyel, a gyökvonás két különböző értéket ad.',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-one-root',
        name: '1 kettős valós gyök (D = 0)',
        description: 'A parabola csúcsa éppen érinti az x-tengelyt, teljes négyzet alakú.',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-no-roots',
        name: 'Nincs valós gyök (D < 0)',
        description: 'A parabola nem éri el az x-tengelyt, negatív számból nincs valós gyök.',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'crs2-1', content: 'x² - 5x + 6 = 0 (D = 1)', categoryId: 'cat-two-roots' },
      { id: 'crs2-2', content: 'x² - 6x + 9 = 0 (D = 0)', categoryId: 'cat-one-root' },
      { id: 'crs2-3', content: 'x² + 2x + 5 = 0 (D = -16)', categoryId: 'cat-no-roots' },
      { id: 'crs2-4', content: '2x² - 7x + 3 = 0 (D = 25)', categoryId: 'cat-two-roots' },
      { id: 'crs2-5', content: '4x² - 12x + 9 = 0 (D = 0)', categoryId: 'cat-one-root' },
      { id: 'crs2-6', content: '3x² - x + 2 = 0 (D = -23)', categoryId: 'cat-no-roots' },
      { id: 'crs2-7', content: 'x² - 4 = 0 (D = 16)', categoryId: 'cat-two-roots' },
      { id: 'crs2-8', content: 'x² + 8x + 16 = 0 (D = 0)', categoryId: 'cat-one-root' },
      { id: 'crs2-9', content: 'x² + 16 = 0 (x² = -16)', categoryId: 'cat-no-roots' },
      { id: 'crs2-10', content: '5x² - 4x - 1 = 0 (D = 36)', categoryId: 'cat-two-roots' }
    ]
  },
  3: {
    title: 'Szöveges feladatok modell- és problématípusai',
    subtitle: 'Melyik valós alkalmazási területhez tartoznak az alábbi egyenletmodellek?',
    categories: [
      {
        id: 'cat-geo',
        name: 'Geometria (Oldalak & Terület)',
        description: 'Téglalap, derékszögű háromszög Pitagorasz-tétele, pozitív hosszúságok.',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-finance',
        name: 'Pénzügy & Költségmegosztás',
        description: 'Egymást követő százalékos emelések, közös költség elosztása hiányzóknál.',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-motion-work',
        name: 'Mozgás & Munkavégzés',
        description: 'Sebességkülönbségek (t = s/v), folyami hajózás, reciprok munkateljesítmény.',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      }
    ],
    items: [
      { id: 'crs3-1', content: 'a² + (a + 5)² = 25² (Pitagorasz)', categoryId: 'cat-geo' },
      { id: 'crs3-2', content: '100 · (1 + p/100)² = 121 (Két kamatperiódus)', categoryId: 'cat-finance' },
      { id: 'crs3-3', content: '120/v - 120/(v + 20) = 1 (Két vonat menetideje)', categoryId: 'cat-motion-work' },
      { id: 'crs3-4', content: 'x · (x - 3) = 108 (Téglalap területe)', categoryId: 'cat-geo' },
      { id: 'crs3-5', content: '72000/(n - 2) - 72000/n = 1200 (Osztálykirándulás költsége)', categoryId: 'cat-finance' },
      { id: 'crs3-6', content: '1/t + 1/(t + 4) = 1/2,4 (Két szivattyú medencefeltöltése)', categoryId: 'cat-motion-work' },
      { id: 'crs3-7', content: '30/(v + 3) + 30/(v - 3) = 8 (Kenu oda-vissza folyón)', categoryId: 'cat-motion-work' },
      { id: 'crs3-8', content: '(2x + 1)(x + 4) = 77 (Paralelogramma területe)', categoryId: 'cat-geo' },
      { id: 'crs3-9', content: '(1000 - 50x)(20 + 2x) = 24000 (Jegyár és bevétel optimum)', categoryId: 'cat-finance' }
    ]
  }
};

export const ComprehensiveReviewSorter: React.FC<ComprehensiveReviewSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-masodfoku-egyenletek',
  topicTitle = 'Gyakorlás, tudáspróba'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <SorterTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      title="Gyakorlás és Tudáspróba Csoportosító"
      subtitle="Rendszerezze az egyenleteket, gyökszámokat és alkalmazási modelleket!"
      badge="Csoportosító Mesterfeladat"
      color="violet"
    />
  );
};

