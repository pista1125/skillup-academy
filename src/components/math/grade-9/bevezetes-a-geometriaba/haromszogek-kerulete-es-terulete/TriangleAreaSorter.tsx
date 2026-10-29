import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TriangleAreaSorterProps {
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
    title: '1. Szint: Területképletek és Alkalmazási Körük',
    subtitle: 'Csoportosítsd a tulajdonságokat a három alapvető területképlet szerint!',
    categories: [
      {
        id: 'cat-base-height',
        name: 'Alap és Magasság',
        description: 'T = (a · m_a) / 2',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-right-angle',
        name: 'Derékszögű Háromszög',
        description: 'T = (a · b) / 2',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-equilateral',
        name: 'Szabályos Háromszög',
        description: 'T = (a² · √3) / 4',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // Alap és magasság
      { id: 'tas1-1', label: 'Bármely háromszögre érvényes, ha ismert egy oldal és a hozzá tartozó magasság', category: 'cat-base-height' },
      { id: 'tas1-2', label: 'A háromszög téglalappá kiegészített területének pontosan a fele', category: 'cat-base-height' },
      { id: 'tas1-3', label: 'T = (a · m_a) / 2 = (b · m_b) / 2 = (c · m_c) / 2', category: 'cat-base-height' },

      // Derékszögű
      { id: 'tas1-4', label: 'A két befogó merőlegességét használja ki', category: 'cat-right-angle' },
      { id: 'tas1-5', label: 'Közvetlenül a két befogó szorzatának a fele: T = (a · b) / 2', category: 'cat-right-angle' },
      { id: 'tas1-6', label: 'Csak és kizárólag derékszögű háromszögekre érvényes a befogókkal', category: 'cat-right-angle' },

      // Szabályos
      { id: 'tas1-7', label: 'Egyedül az "a" oldalhossz ismerete elegendő a területhez', category: 'cat-equilateral' },
      { id: 'tas1-8', label: 'Képlete: T = (a² · √3) / 4', category: 'cat-equilateral' },
      { id: 'tas1-9', label: 'Magassága a Pitagorasz-tételből levezetve: m = (a · √3) / 2', category: 'cat-equilateral' },
      { id: 'tas1-10', label: 'Csakis akkor használható, ha mindhárom szög 60°', category: 'cat-equilateral' }
    ]
  },
  2: {
    title: '2. Szint: Hérón-képlet és Sugárkapcsolatok',
    subtitle: 'Válogasd szét a kijelentéseket a Hérón-képlet és a sugaras területképletek közé!',
    categories: [
      {
        id: 'cat-heron',
        name: 'Hérón-képlet',
        description: 'T = √[s(s-a)(s-b)(s-c)]',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-inradius',
        name: 'Beírt Kör Sugara (r)',
        description: 'T = r · s  ⇒  r = T / s',
        badgeColor: 'bg-pink-100 text-pink-900 border-pink-300'
      },
      {
        id: 'cat-circumradius',
        name: 'Körülírt Kör Sugara (R)',
        description: 'T = abc / 4R  ⇒  R = abc / 4T',
        badgeColor: 'bg-violet-100 text-violet-900 border-violet-300'
      }
    ],
    items: [
      // Hérón
      { id: 'tas2-1', label: 'Akkor használjuk, ha mindhárom oldal ismert, de nincs megadva szög vagy magasság', category: 'cat-heron' },
      { id: 'tas2-2', label: 'Kiszámításának első lépése a félkerület meghatározása: s = (a+b+c)/2', category: 'cat-heron' },
      { id: 'tas2-3', label: 'Négyzetgyök alatt szerepel a félkerület és az oldalaktól vett eltérések szorzata', category: 'cat-heron' },

      // Beírt sugár
      { id: 'tas2-4', label: 'A beírt kör középpontjából a három csúcsba húzott szakaszok területösszegéből származik', category: 'cat-inradius' },
      { id: 'tas2-5', label: 'Alapképlete: T = r · s', category: 'cat-inradius' },
      { id: 'tas2-6', label: 'Kifejezhető belőle a beírt kör sugara: r = T / s', category: 'cat-inradius' },

      // Körülírt sugár
      { id: 'tas2-7', label: 'A három oldal szorzatát és a terület négyszeresét kapcsolja össze', category: 'cat-circumradius' },
      { id: 'tas2-8', label: 'Képlete: T = (a · b · c) / (4R)', category: 'cat-circumradius' },
      { id: 'tas2-9', label: 'Kifejezhető belőle a körülírt kör sugara: R = (abc) / (4T)', category: 'cat-circumradius' }
    ]
  },
  3: {
    title: '3. Szint: Területértékek Csoportosítása',
    subtitle: 'Válogasd szét a számpéldákat a kapott terület nagysága szerint!',
    categories: [
      {
        id: 'cat-area-24',
        name: 'T = 24 cm²',
        description: 'Kiszámított terület értéke 24',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-area-30',
        name: 'T = 30 cm²',
        description: 'Kiszámított terület értéke 30',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-area-48',
        name: 'T = 48 cm²',
        description: 'Kiszámított terület értéke 48',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      // T = 24 cm²
      { id: 'tas3-1', label: 'Derékszögű háromszög befogói: a = 6 cm és b = 8 cm', category: 'cat-area-24' },
      { id: 'tas3-2', label: 'Alap a = 12 cm és a hozzá tartozó magasság m_a = 4 cm', category: 'cat-area-24' },
      { id: 'tas3-3', label: 'Alap a = 8 cm és a hozzá tartozó magasság m_a = 6 cm', category: 'cat-area-24' },

      // T = 30 cm²
      { id: 'tas3-4', label: 'Derékszögű háromszög befogói: a = 5 cm és b = 12 cm', category: 'cat-area-30' },
      { id: 'tas3-5', label: 'Alap a = 10 cm és a hozzá tartozó magasság m_a = 6 cm', category: 'cat-area-30' },
      { id: 'tas3-6', label: 'Alap a = 15 cm és a hozzá tartozó magasság m_a = 4 cm', category: 'cat-area-30' },

      // T = 48 cm²
      { id: 'tas3-7', label: 'Egyenlő szárú háromszög alapja a = 12 cm, szára b = 10 cm', category: 'cat-area-48' },
      { id: 'tas3-8', label: 'Alap a = 16 cm és a hozzá tartozó magasság m_a = 6 cm', category: 'cat-area-48' },
      { id: 'tas3-9', label: 'Derékszögű háromszög befogói: a = 8 cm és b = 12 cm', category: 'cat-area-48' }
    ]
  }
};

export const TriangleAreaSorter: React.FC<TriangleAreaSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-bevezetes-geometriaba',
  topicTitle = 'Háromszögek kerülete és területe'
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
      themeColor="emerald"
      storageKey="grade9-triangle-area-sorter"
      levels={sorterLevels}
      badgeText="9. OSZTÁLY • IV. BEVEZETÉS A GEOMETRIÁBA • CSOPORTOSÍTÓ JÁTÉK"
    />
  );
};

