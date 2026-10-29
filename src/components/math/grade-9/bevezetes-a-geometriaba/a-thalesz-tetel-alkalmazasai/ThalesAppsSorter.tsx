import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ThalesAppsSorterProps {
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

export const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Pont Helyzete és az Érintők Száma',
    subtitle: 'Sorold be az állításokat aszerint, hogy a pont a körön kívül, a körvonalon vagy a körön belül van!',
    categories: [
      {
        id: 'cat-external',
        name: 'Külső Pont (d > r)',
        description: '2 érintő húzható Thalész-körrel',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-on-circle',
        name: 'Körvonalbeli Pont (d = r)',
        description: 'Pontosan 1 érintő húzható',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-internal',
        name: 'Belső Pont (d < r)',
        description: 'Nem húzható érintő (0 db)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // Külső pont
      { id: 'tas1-1', label: 'A pontból pontosan 2 érintő egyenes húzható a körhöz', category: 'cat-external' },
      { id: 'tas1-2', label: 'Az érintőszakasz hossza Pitagorasz-tétellel számítható: e = √(d² - r²)', category: 'cat-external' },
      { id: 'tas1-3', label: 'Thalész-kör szerkesztésével kapjuk meg a két érintési pontot', category: 'cat-external' },
      { id: 'tas1-4', label: 'A középponttal és az érintési pontokkal együtt egy deltoidot alkot', category: 'cat-external' },

      // Körvonalon lévő pont
      { id: 'tas1-5', label: 'A pontban a sugárra merőleges egyenes az egyetlen érintő', category: 'cat-on-circle' },
      { id: 'tas1-6', label: 'A pontból pontosan 1 érintő egyenes húzható', category: 'cat-on-circle' },
      { id: 'tas1-7', label: 'A pont távolsága a középponttól pontosan a kör sugara', category: 'cat-on-circle' },

      // Belső pont
      { id: 'tas1-8', label: 'A ponton keresztül nem húzható egyetlen érintő sem a körhöz', category: 'cat-internal' },
      { id: 'tas1-9', label: 'Bármely a ponton átmenő egyenes metsző egyenes', category: 'cat-internal' },
      { id: 'tas1-10', label: 'A pont távolsága a középponttól kisebb a sugárnál', category: 'cat-internal' }
    ]
  },
  2: {
    title: '2. Szint: Szerkesztési Elemek Szerepe',
    subtitle: 'Csoportosítsd a tulajdonságokat a szerkesztés fő geometriai elemei szerint!',
    categories: [
      {
        id: 'cat-thales-role',
        name: 'Thalész-kör Szerepe',
        description: 'Átmérője az OP szakasz, biztosítja a derékszöget',
        badgeColor: 'bg-violet-100 text-violet-900 border-violet-300'
      },
      {
        id: 'cat-axis-role',
        name: 'OP Szakasz Szerepe',
        description: 'A szimmetriatengely és szögfelező',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-radius-role',
        name: 'Érintési Sugár (r)',
        description: 'Merőleges az érintőre az érintési pontban',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      }
    ],
    items: [
      // Thalész-kör
      { id: 'tas2-1', label: 'Középpontja az OP szakasz F felezőpontja', category: 'cat-thales-role' },
      { id: 'tas2-2', label: 'Metszéspontjai az eredeti körrel kijelölik az E_1 és E_2 érintési pontokat', category: 'cat-thales-role' },
      { id: 'tas2-3', label: 'Biztosítja, hogy az OE_1P szög pontosan 90° legyen', category: 'cat-thales-role' },

      // OP szakasz
      { id: 'tas2-4', label: 'Szimmetriatengelye az OE_1PE_2 deltoidnak', category: 'cat-axis-role' },
      { id: 'tas2-5', label: 'Felezi a két érintő által bezárt szöget', category: 'cat-axis-role' },
      { id: 'tas2-6', label: 'Merőlegesen felezi az E_1E_2 érintési húrt', category: 'cat-axis-role' },

      // Érintési sugár
      { id: 'tas2-7', label: 'Merőleges az érintő egyenesre az érintési pontban', category: 'cat-radius-role' },
      { id: 'tas2-8', label: 'A derékszögű háromszög egyik befogója', category: 'cat-radius-role' },
      { id: 'tas2-9', label: 'Hossza egyenlő a kör sugarával', category: 'cat-radius-role' }
    ]
  },
  3: {
    title: '3. Szint: Derékszögű Háromszög Szerkeszthetősége (c és m_c)',
    subtitle: 'Válogasd szét az átfogó (c) és magasság (m_c) párokat a megoldások száma szerint!',
    categories: [
      {
        id: 'cat-two-solutions',
        name: '2 Megoldás (m_c < c / 2)',
        description: 'A párhuzamos egyenes 2 pontban metszi a Thalész-kört',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-one-solution',
        name: '1 Megoldás (m_c = c / 2)',
        description: 'Egyenlő szárú derékszögű, a párhuzamos érinti a kört',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-no-solution',
        name: 'Nincs Megoldás (m_c > c / 2)',
        description: 'A magasság nagyobb a Thalész-kör sugaránál',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // 2 megoldás
      { id: 'tas3-1', label: 'Átfogó c = 10 cm és magasság m_c = 4 cm', category: 'cat-two-solutions' },
      { id: 'tas3-2', label: 'Átfogó c = 16 cm és magasság m_c = 6 cm', category: 'cat-two-solutions' },
      { id: 'tas3-3', label: 'Átfogó c = 12 cm és magasság m_c = 3 cm', category: 'cat-two-solutions' },

      // 1 megoldás
      { id: 'tas3-4', label: 'Átfogó c = 10 cm és magasság m_c = 5 cm', category: 'cat-one-solution' },
      { id: 'tas3-5', label: 'Átfogó c = 14 cm és magasság m_c = 7 cm', category: 'cat-one-solution' },
      { id: 'tas3-6', label: 'Átfogó c = 8 cm és magasság m_c = 4 cm', category: 'cat-one-solution' },

      // Nincs megoldás
      { id: 'tas3-7', label: 'Átfogó c = 10 cm és magasság m_c = 6 cm', category: 'cat-no-solution' },
      { id: 'tas3-8', label: 'Átfogó c = 8 cm és magasság m_c = 5 cm', category: 'cat-no-solution' },
      { id: 'tas3-9', label: 'Átfogó c = 12 cm és magasság m_c = 7 cm', category: 'cat-no-solution' }
    ]
  }
};

export const ThalesAppsSorter: React.FC<ThalesAppsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-bevezetes-geometriaba',
  topicTitle = 'A Thalész-tétel alkalmazásai'
}) => {
  return (
    <SorterTemplate
      level={level}
      currentLevel={currentLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="blue"
      storageKey="grade9-thales-apps-sorter"
      levels={sorterLevels}
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • CSOPORTOSÍTÓ JÁTÉK"
    />
  );
};

