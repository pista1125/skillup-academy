import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CalculatorProjectSorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Számok Típusa a Gyökvonás Után',
    subtitle: 'Kategorizáld a kifejezések végeredményét a számok fajtája szerint!',
    categories: [
      {
        id: 'cat-integer',
        name: 'Egész Szám',
        description: 'Pontos egész érték (racionális)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-finite-dec',
        name: 'Véges Tizedestört',
        description: 'Tizedesjegyekkel pontosan leírható tört (racionális)',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      },
      {
        id: 'cat-irrat',
        name: 'Végtelen Nem Szakaszos',
        description: 'Csak kerekítve adható meg (irracionális)',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      {
        id: 'cpj-s1-1',
        text: '√(3² + 4²)',
        category: 'cat-integer',
        explanation: '√(9 + 16) = √25 = 5 (egész szám).',
        badge: '= 5'
      },
      {
        id: 'cpj-s1-2',
        text: '√(5² + 12²)',
        category: 'cat-integer',
        explanation: '√(25 + 144) = √169 = 13 (egész szám).',
        badge: '= 13'
      },
      {
        id: 'cpj-s1-3',
        text: '√(100)',
        category: 'cat-integer',
        explanation: 'A 100 négyzetszám, gyöke pontosan 10.',
        badge: '= 10'
      },
      {
        id: 'cpj-s1-4',
        text: '√(10² - 6²)',
        category: 'cat-integer',
        explanation: '√(100 - 36) = √64 = 8 (egész szám).',
        badge: '= 8'
      },
      {
        id: 'cpj-s1-5',
        text: '√(6,25)',
        category: 'cat-finite-dec',
        explanation: '2,5² = 6,25, tehát a gyöke pontosan 2,5.',
        badge: '= 2,5'
      },
      {
        id: 'cpj-s1-6',
        text: '√(1,44)',
        category: 'cat-finite-dec',
        explanation: '1,2² = 1,44, tehát a gyöke pontosan 1,2.',
        badge: '= 1,2'
      },
      {
        id: 'cpj-s1-7',
        text: '√(0,36 + 0,64)',
        category: 'cat-finite-dec',
        explanation: '√(1,00) = 1,0 (pontos véges tizedes).',
        badge: '= 1,0'
      },
      {
        id: 'cpj-s1-8',
        text: '√(0,04)',
        category: 'cat-finite-dec',
        explanation: '0,2² = 0,04, tehát a gyöke pontosan 0,2.',
        badge: '= 0,2'
      },
      {
        id: 'cpj-s1-9',
        text: '√2',
        category: 'cat-irrat',
        explanation: '1,4142135... végtelen nem szakaszos tizedestört.',
        badge: 'Irracionális'
      },
      {
        id: 'cpj-s1-10',
        text: '√3',
        category: 'cat-irrat',
        explanation: '1,7320508... végtelen nem szakaszos tizedestört.',
        badge: 'Irracionális'
      },
      {
        id: 'cpj-s1-11',
        text: '√50',
        category: 'cat-irrat',
        explanation: '7,0710678... nem négyzetszám, így irracionális.',
        badge: 'Irracionális'
      },
      {
        id: 'cpj-s1-12',
        text: '√10',
        category: 'cat-irrat',
        explanation: '3,1622776... végtelen nem szakaszos tizedestört.',
        badge: 'Irracionális'
      }
    ]
  },
  2: {
    title: '2. Szint: Gyökök Becslése és Nagyságrendje',
    subtitle: 'Döntsd el fejben a szomszédos négyzetszámok alapján, mekkora a gyök értéke!',
    categories: [
      {
        id: 'cat-under5',
        name: 'Kisebb mint 5 (< 5)',
        description: 'A gyök értéke szigorúan 5 alatt van (N < 25)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-5to10',
        name: '5 és 10 között (5 – 10)',
        description: 'A gyök értéke 5 és 10 közé esik (25 < N < 100)',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      },
      {
        id: 'cat-over10',
        name: 'Nagyobb mint 10 (> 10)',
        description: 'A gyök értéke meghaladja a 10-et (N > 100)',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      {
        id: 'cpj-s2-1',
        text: '√10 értéke',
        category: 'cat-under5',
        explanation: '9 < 10 < 16 ⟹ 3 < √10 < 4 < 5.',
        badge: '≈ 3,16'
      },
      {
        id: 'cpj-s2-2',
        text: '√20 értéke',
        category: 'cat-under5',
        explanation: '16 < 20 < 25 ⟹ 4 < √20 < 5.',
        badge: '≈ 4,47'
      },
      {
        id: 'cpj-s2-3',
        text: '√18 értéke',
        category: 'cat-under5',
        explanation: '16 < 18 < 25 ⟹ 4 < √18 < 5.',
        badge: '≈ 4,24'
      },
      {
        id: 'cpj-s2-4',
        text: '√24 értéke',
        category: 'cat-under5',
        explanation: 'Közvetlenül 25 alatt van, kb. 4,90 < 5.',
        badge: '≈ 4,90'
      },
      {
        id: 'cpj-s2-5',
        text: '√30 értéke',
        category: 'cat-5to10',
        explanation: '25 < 30 < 36 ⟹ 5 és 6 közé esik.',
        badge: '≈ 5,48'
      },
      {
        id: 'cpj-s2-6',
        text: '√50 értéke',
        category: 'cat-5to10',
        explanation: '49 < 50 < 64 ⟹ 7 és 8 közé esik.',
        badge: '≈ 7,07'
      },
      {
        id: 'cpj-s2-7',
        text: '√80 értéke',
        category: 'cat-5to10',
        explanation: '64 < 80 < 81 ⟹ 8 és 9 közé esik.',
        badge: '≈ 8,94'
      },
      {
        id: 'cpj-s2-8',
        text: '√98 értéke',
        category: 'cat-5to10',
        explanation: '81 < 98 < 100 ⟹ 9 és 10 közé esik, szinte 10.',
        badge: '≈ 9,90'
      },
      {
        id: 'cpj-s2-9',
        text: '√105 értéke',
        category: 'cat-over10',
        explanation: '100 < 105 < 121 ⟹ 10 és 11 közé esik.',
        badge: '≈ 10,25'
      },
      {
        id: 'cpj-s2-10',
        text: '√120 értéke',
        category: 'cat-over10',
        explanation: '100 < 120 < 121 ⟹ 10 és 11 közé esik (közel 11).',
        badge: '≈ 10,95'
      },
      {
        id: 'cpj-s2-11',
        text: '√150 értéke',
        category: 'cat-over10',
        explanation: '144 < 150 < 169 ⟹ 12 és 13 közé esik.',
        badge: '≈ 12,25'
      },
      {
        id: 'cpj-s2-12',
        text: '√200 értéke',
        category: 'cat-over10',
        explanation: '196 < 200 < 225 ⟹ 14 és 15 közé esik.',
        badge: '≈ 14,14'
      }
    ]
  },
  3: {
    title: '3. Szint: Számológépes és Geometriai Állítások',
    subtitle: 'Döntsd el a számítási és szerkesztési állításokról, hogy mikor érvényesek!',
    categories: [
      {
        id: 'cat-always',
        name: 'Mindig Igaz',
        description: 'Matematikailag és logikailag minden esetben érvényes',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-cond',
        name: 'Csak Kerekítéskor / Feltételesen Igaz',
        description: 'Csak közelítésként vagy speciális paraméterek mellett teljesül',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300'
      },
      {
        id: 'cat-never',
        name: 'Soha Nem Igaz',
        description: 'Matematikailag helytelen állítás vagy tévedés',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      {
        id: 'cpj-s3-1',
        text: 'A számológépben a gyökjel alá zárójelet kell tenni: √(a² + b²)',
        category: 'cat-always',
        explanation: 'Enélkül a számológép csak a legelső számból vonna gyököt.',
        badge: 'Zárójelezés'
      },
      {
        id: 'cpj-s3-2',
        text: 'A Theodórosz-spirál n-edik átfogója c = √(n + 1)',
        category: 'cat-always',
        explanation: '(√n)² + 1² = n + 1 alapján minden lépésre érvényes összefüggés.',
        badge: 'Gyökcsiga képlet'
      },
      {
        id: 'cpj-s3-3',
        text: 'Minden négyzetszám négyzetgyöke pontos egész szám',
        category: 'cat-always',
        explanation: 'A négyzetszámok definíciójából adódóan gyökük egész.',
        badge: 'Négyzetszámok'
      },
      {
        id: 'cpj-s3-4',
        text: 'A √13 cm szakasz pontosan megszerkeszthető 2 és 3 cm befogókból',
        category: 'cat-always',
        explanation: '2² + 3² = 4 + 9 = 13, így az átfogó pontosan √13 cm.',
        badge: 'Szerkeszthetőség'
      },
      {
        id: 'cpj-s3-5',
        text: 'A √2 pontos értéke 1,41',
        category: 'cat-cond',
        explanation: 'Csak 2 tizedesjegyre kerekítve igaz! Pontos értéke végtelen tizedestört.',
        badge: 'Kerekítés'
      },
      {
        id: 'cpj-s3-6',
        text: 'A Theodórosz-spirál átfogója egész szám',
        category: 'cat-cond',
        explanation: 'Csak akkor egész, ha n + 1 négyzetszám (pl. √4 = 2, √9 = 3, √16 = 4).',
        badge: 'Spirál egészek'
      },
      {
        id: 'cpj-s3-7',
        text: 'A számológép kijelzőjén látható szám a végeredmény hajszálpontos értéke',
        category: 'cat-cond',
        explanation: 'Csak véges tizedestörteknél és egészeknél pontos, irracionális számnál a gép is kerekít.',
        badge: 'Kijelző korlát'
      },
      {
        id: 'cpj-s3-8',
        text: 'A számítás közbeni kerekítés nem módosítja a végeredményt',
        category: 'cat-cond',
        explanation: 'Csak akkor, ha a kerekítési hiba nem hat vissza a keresett tizedesjegyekre.',
        badge: 'Kerekítési hiba'
      },
      {
        id: 'cpj-s3-9',
        text: '√(a² + b²) = a + b',
        category: 'cat-never',
        explanation: 'Súlyos hiba! √(9 + 16) = √25 = 5, miközben 3 + 4 = 7 ≠ 5.',
        badge: 'Tilos azonosság'
      },
      {
        id: 'cpj-s3-10',
        text: 'A √50 pontos értéke 7,07',
        category: 'cat-never',
        explanation: '7,07² = 49,9849 ≠ 50. Ez csak egy kerekített érték, nem a pontos.',
        badge: 'Nem egyenlő'
      },
      {
        id: 'cpj-s3-11',
        text: 'Irracionális hosszúságú szakasz vonalzóval és körzővel soha nem szerkeszthető meg',
        category: 'cat-never',
        explanation: 'Tévedés! A Theodórosz-spirállal minden √n hosszúságú szakasz pontosan megszerkeszthető.',
        badge: 'Téves dogma'
      },
      {
        id: 'cpj-s3-12',
        text: 'Negatív számnak a valós számok körében létezik négyzetgyöke',
        category: 'cat-never',
        explanation: 'Valós szám négyzete soha nem lehet negatív, így negatív számból nincs valós gyök.',
        badge: 'Negatív gyök'
      }
    ]
  }
};

export const CalculatorProjectSorter: React.FC<CalculatorProjectSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-pyth-calculator-sorter',
  topicTitle = 'Számológép és Projektmunka'
}) => {
  const currentConfig = sorterLevels[level] || sorterLevels[1];

  return (
    <SorterTemplate
      key={`cpj-sorter-lvl-${level}`}
      level={level}
      currentLevel={level}
      categories={currentConfig.categories}
      items={currentConfig.items}
      config={currentConfig}
      levels={sorterLevels}
      levelsConfig={sorterLevels}
      title={currentConfig.title || 'Csoportosító Játék • Számológép & Projektmunka'}
      subtitle={currentConfig.subtitle || 'Kategorizáld a kifejezéseket, gyököket és matematikai állításokat!'}
      badge="8. Osztály • Pitagorasz-tétel"
      topicBadge="🧮 5. Lecke • Számológép és Projekt"
      badgeText="8. Osztály • Pitagorasz-tétel"
      topicId={topicId}
      topicTitle={topicTitle}
      chapterId="pitagorasz-tetel"
      grade={8}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default CalculatorProjectSorter;
