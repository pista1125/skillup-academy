import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface AxialSorterProps {
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
    title: '1. Szint: Egybevágóságok Alaptulajdonságai',
    subtitle: 'Sorold be a geometriai jellemzőket a megfelelő egybevágósági transzformációhoz!',
    categories: [
      {
        id: 'cat-axial',
        name: 'Tengelyes Tükrözés',
        description: 'Egyenesre vonatkozó tükrözés, körüljárási irány megfordulásával',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-central',
        name: 'Középpontos Tükrözés',
        description: 'Pontra vonatkozó tükrözés, 180°-os síkbeli forgatás',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-trans',
        name: 'Eltolás (Transzláció)',
        description: 'Vektorral való párhuzamos elmozdítás fixpont nélkül',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      // Tengelyes tükrözés
      { id: 'as1-1', label: 'Megfordítja az alakzatok körüljárási irányát', category: 'cat-axial' },
      { id: 'as1-2', label: 'Fixpontjai egy egész egyenest (tengelyt) alkotnak', category: 'cat-axial' },
      { id: 'as1-3', label: 'A tengely merőlegesen felezi a pont-képpont szakaszt', category: 'cat-axial' },
      { id: 'as1-4', label: 'x-tengelyre vonatkozó szabály: (x; y) ↦ (x; −y)', category: 'cat-axial' },
      // Középpontos tükrözés
      { id: 'as1-5', label: 'Egyetlen fixpontja a középpont (O)', category: 'cat-central' },
      { id: 'as1-6', label: 'Minden egyenes képe párhuzamos az eredetivel', category: 'cat-central' },
      { id: 'as1-7', label: 'Megegyezik a síkbeli 180°-os elforgatással', category: 'cat-central' },
      { id: 'as1-8', label: 'Origóra vonatkozó szabály: (x; y) ↦ (−x; −y)', category: 'cat-central' },
      // Eltolás
      { id: 'as1-9', label: 'Nincs egyetlen fixpontja sem a síkban (v ≠ 0)', category: 'cat-trans' },
      { id: 'as1-10', label: 'Minden pontot azonos v vektorral mozdít el', category: 'cat-trans' },
      { id: 'as1-11', label: 'Két egymást követő eltolás összege v₁ + v₂', category: 'cat-trans' },
      { id: 'as1-12', label: 'Körüljárási irány és alakzat orientációja változatlan', category: 'cat-trans' }
    ]
  },
  2: {
    title: '2. Szint: Síkidomok Szimmetriatengelyeik Száma Szerint',
    subtitle: 'Válogasd szét a geometriai alakzatokat szimmetriatengelyeik darabszáma szerint!',
    categories: [
      {
        id: 'cat-ax1',
        name: 'Pontosan 1 Tengely',
        description: 'Egyetlen szimmetriatengellyel rendelkező alakzatok',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-ax2',
        name: 'Pontosan 2 Tengely',
        description: 'Két egymásra merőleges tengellyel bíró alakzatok',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-axMore',
        name: '3 vagy Több Tengely',
        description: 'Szabályos sokszögek és a kör',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      // 1 tengely
      { id: 'as2-1', label: 'Egyenlő szárú háromszög (alap felezőmerőlegese)', category: 'cat-ax1' },
      { id: 'as2-2', label: 'Húrtrapéz (párhuzamos alapok felezőmerőlegese)', category: 'cat-ax1' },
      { id: 'as2-3', label: 'Deltoid (szimmetriaátlója)', category: 'cat-ax1' },
      { id: 'as2-4', label: 'Szög (szögfelező egyenese)', category: 'cat-ax1' },
      // 2 tengely
      { id: 'as2-5', label: 'Téglalap (oldalfelező merőlegesek)', category: 'cat-ax2' },
      { id: 'as2-6', label: 'Rombusz (a két átlója)', category: 'cat-ax2' },
      { id: 'as2-7', label: 'Szakasz (felezőmerőleges és hordozó egyenes)', category: 'cat-ax2' },
      { id: 'as2-8', label: 'Ellipszis (két főtengelye)', category: 'cat-ax2' },
      // 3 vagy több
      { id: 'as2-9', label: 'Szabályos háromszög (3 tengely)', category: 'cat-axMore' },
      { id: 'as2-10', label: 'Négyzet (4 tengely: 2 oldalfelező + 2 átló)', category: 'cat-axMore' },
      { id: 'as2-11', label: 'Szabályos hatszög (6 tengely)', category: 'cat-axMore' },
      { id: 'as2-12', label: 'Kör (végtelen sok tengely, minden átmérője)', category: 'cat-axMore' }
    ]
  },
  3: {
    title: '3. Szint: Tükrözési Szabályok Koordinátái',
    subtitle: 'Rendszerezd a pontpárokat a végrehajtott tükrözés tengelye szerint!',
    categories: [
      {
        id: 'cat-rx',
        name: 'x-tengelyre Tükrözés',
        description: '(x; y) ↦ (x; −y)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-ry',
        name: 'y-tengelyre Tükrözés',
        description: '(x; y) ↦ (−x; y)',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-rdiag',
        name: 'y = x Egyenesre Tükrözés',
        description: '(x; y) ↦ (y; x)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // x-tengely: (x, -y)
      { id: 'as3-1', label: '(3; 4) ↦ (3; −4)', category: 'cat-rx' },
      { id: 'as3-2', label: '(−2; 5) ↦ (−2; −5)', category: 'cat-rx' },
      { id: 'as3-3', label: '(7; −1) ↦ (7; 1)', category: 'cat-rx' },
      { id: 'as3-4', label: '(−4; −6) ↦ (−4; 6)', category: 'cat-rx' },
      // y-tengely: (-x, y)
      { id: 'as3-5', label: '(3; 4) ↦ (−3; 4)', category: 'cat-ry' },
      { id: 'as3-6', label: '(−2; 5) ↦ (2; 5)', category: 'cat-ry' },
      { id: 'as3-7', label: '(7; −1) ↦ (−7; −1)', category: 'cat-ry' },
      { id: 'as3-8', label: '(−4; −6) ↦ (4; −6)', category: 'cat-ry' },
      // y = x: (y, x)
      { id: 'as3-9', label: '(3; 4) ↦ (4; 3)', category: 'cat-rdiag' },
      { id: 'as3-10', label: '(−2; 5) ↦ (5; −2)', category: 'cat-rdiag' },
      { id: 'as3-11', label: '(7; −1) ↦ (−1; 7)', category: 'cat-rdiag' },
      { id: 'as3-12', label: '(−4; −6) ↦ (−6; −4)', category: 'cat-rdiag' }
    ]
  }
};

export const AxialSorter: React.FC<AxialSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-trans-tengelyes',
  topicTitle = '3. Tengelyes tükrözés'
}) => {
  return (
    <SorterTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfigs={sorterLevels}
      initialLevel={currentLevel || level}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

