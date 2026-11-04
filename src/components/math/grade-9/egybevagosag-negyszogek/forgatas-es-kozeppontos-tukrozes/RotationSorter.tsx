import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface RotationSorterProps {
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
    title: '1. Szint: Transzformációk Tulajdonságainak Besorolása',
    subtitle: 'Sorold be a geometriai állításokat a megfelelő transzformációhoz!',
    categories: [
      {
        id: 'cat-central',
        name: 'Középpontos Tükrözés',
        description: '180°-os forgatás a síkban, párhuzamos képegyenesekkel',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-rot',
        name: 'Tetszőleges Forgatás (α)',
        description: 'Pont körüli elfordítás adott α szöggel és iránnyal',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-axial',
        name: 'Tengelyes Tükrözés',
        description: 'Egyenesre vonatkozó tükrözés, körüljárási irány megfordításával',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Középpontos tükrözés
      { id: 'rs1-1', label: 'Minden egyenes képe párhuzamos az eredetivel', category: 'cat-central' },
      { id: 'rs1-2', label: 'Megegyezik a síkbeli 180°-os forgatással', category: 'cat-central' },
      { id: 'rs1-3', label: 'Kétszer egymás után alkalmazva önmagába visz', category: 'cat-central' },
      { id: 'rs1-4', label: 'Origóra vonatkozó szabály: (x; y) ↦ (−x; −y)', category: 'cat-central' },
      // Tetszőleges forgatás
      { id: 'rs1-5', label: 'Pozitív iránya az óramutatóval ellentétes', category: 'cat-rot' },
      { id: 'rs1-6', label: 'Egyenes és képe α hajlásszöget zár be', category: 'cat-rot' },
      { id: 'rs1-7', label: 'Három adata: O középpont, α szög, forgásirány', category: 'cat-rot' },
      { id: 'rs1-8', label: 'Szabályos 3-szögnél α = 120° viszi önmagába', category: 'cat-rot' },
      // Tengelyes tükrözés
      { id: 'rs1-9', label: 'Megfordítja az alakzatok körüljárási irányát', category: 'cat-axial' },
      { id: 'rs1-10', label: 'Fixpontjai egy egész egyenest (tengelyt) alkotnak', category: 'cat-axial' },
      { id: 'rs1-11', label: 'A tengely merőlegesen felezi a pont és képpont szakaszát', category: 'cat-axial' },
      { id: 'rs1-12', label: 'Nem valósítható meg pusztán a síkban való forgatással', category: 'cat-axial' }
    ]
  },
  2: {
    title: '2. Szint: Alakzatok Középponti Szimmetriája (180°)',
    subtitle: 'Válaszd szét a síkidomokat aszerint, hogy középpontosan szimmetrikusak-e!',
    categories: [
      {
        id: 'cat-sym',
        name: 'Középpontosan Szimmetrikus (180°)',
        description: 'Van olyan O pont, amelyre tükrözve önmagába megy át',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-no-sym',
        name: 'NEM Középpontosan Szimmetrikus',
        description: 'Nincs olyan pont, amely körül 180°-kal elforgatva önmagába menne',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Középpontosan szimmetrikus
      { id: 'rs2-1', label: 'Paralelogramma (átlók metszéspontjára)', category: 'cat-sym' },
      { id: 'rs2-2', label: 'Téglalap', category: 'cat-sym' },
      { id: 'rs2-3', label: 'Rombusz', category: 'cat-sym' },
      { id: 'rs2-4', label: 'Négyzet', category: 'cat-sym' },
      { id: 'rs2-5', label: 'Szabályos hatszög', category: 'cat-sym' },
      { id: 'rs2-6', label: 'Kör', category: 'cat-sym' },
      // Nem középpontosan szimmetrikus
      { id: 'rs2-7', label: 'Szabályos háromszög (csak 120°-os szimmetria)', category: 'cat-no-sym' },
      { id: 'rs2-8', label: 'Egyenlő szárú trapéz (húrtrapéz)', category: 'cat-no-sym' },
      { id: 'rs2-9', label: 'Deltoid (ha nem rombusz)', category: 'cat-no-sym' },
      { id: 'rs2-10', label: 'Szabályos ötszög', category: 'cat-no-sym' },
      { id: 'rs2-11', label: 'Derékszögű háromszög', category: 'cat-no-sym' },
      { id: 'rs2-12', label: 'Félkör', category: 'cat-no-sym' }
    ]
  },
  3: {
    title: '3. Szint: Origó Körüli Forgatások Koordináta-szabályai',
    subtitle: 'Rendszerezd a pont-képpont párokat a végrehajtott forgatás szöge szerint!',
    categories: [
      {
        id: 'cat-rot180',
        name: '180° Forgatás (Tükrözés)',
        description: '(x; y) ↦ (−x; −y)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-rot90',
        name: '+90° Forgatás',
        description: '(x; y) ↦ (−y; x)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-rot270',
        name: '−90° (270°) Forgatás',
        description: '(x; y) ↦ (y; −x)',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // 180°: (-x, -y)
      { id: 'rs3-1', label: '(2; 5) ↦ (−2; −5)', category: 'cat-rot180' },
      { id: 'rs3-2', label: '(−4; 3) ↦ (4; −3)', category: 'cat-rot180' },
      { id: 'rs3-3', label: '(0; −6) ↦ (0; 6)', category: 'cat-rot180' },
      { id: 'rs3-4', label: '(−1; −7) ↦ (1; 7)', category: 'cat-rot180' },
      // +90°: (-y, x)
      { id: 'rs3-5', label: '(2; 5) ↦ (−5; 2)', category: 'cat-rot90' },
      { id: 'rs3-6', label: '(−4; 3) ↦ (−3; −4)', category: 'cat-rot90' },
      { id: 'rs3-7', label: '(0; −6) ↦ (6; 0)', category: 'cat-rot90' },
      { id: 'rs3-8', label: '(7; 1) ↦ (−1; 7)', category: 'cat-rot90' },
      // -90° (270°): (y, -x)
      { id: 'rs3-9', label: '(2; 5) ↦ (5; −2)', category: 'cat-rot270' },
      { id: 'rs3-10', label: '(−4; 3) ↦ (3; 4)', category: 'cat-rot270' },
      { id: 'rs3-11', label: '(0; −6) ↦ (−6; 0)', category: 'cat-rot270' },
      { id: 'rs3-12', label: '(1; 8) ↦ (8; −1)', category: 'cat-rot270' }
    ]
  }
};

export const RotationSorter: React.FC<RotationSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-trans-forgatas',
  topicTitle = '1. Forgatás és középpontos tükrözés'
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

