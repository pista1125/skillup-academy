import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SquareRootSorterProps {
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
    title: '1. Szint: Kifejezések Jellege és Értelmezhetősége (Könnyű)',
    subtitle: 'Rendszerezd a kifejezéseket valós értékük és értelmezhetőségük szerint!',
    categories: [
      {
        id: 'cat-integer',
        name: 'Egész szám (Racionális érték)',
        description: 'Pontos egész érték (négyzetszámok gyöke)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-irrational',
        name: 'Irracionális szám (Végtelen nem szakaszos)',
        description: 'Nem négyzetszámok gyöke, csak közelítő tizedestörtként írható le',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-undefined',
        name: 'Nem értelmezett valós számként',
        description: 'Negatív számok gyöke, nincs valós megoldása',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'srs1-1', label: '√64 = 8', category: 'cat-integer' },
      { id: 'srs1-2', label: '√121 = 11', category: 'cat-integer' },
      { id: 'srs1-3', label: '√0 = 0', category: 'cat-integer' },
      { id: 'srs1-4', label: '√(100 / 25) = √4 = 2', category: 'cat-integer' },
      { id: 'srs1-5', label: '√2 ≈ 1,4142...', category: 'cat-irrational' },
      { id: 'srs1-6', label: '√7 ≈ 2,6457...', category: 'cat-irrational' },
      { id: 'srs1-7', label: '√10 ≈ 3,1622...', category: 'cat-irrational' },
      { id: 'srs1-8', label: '√50 = 5√2', category: 'cat-irrational' },
      { id: 'srs1-9', label: '√(-9) valós számok körében', category: 'cat-undefined' },
      { id: 'srs1-10', label: '√(-100) valós számok körében', category: 'cat-undefined' },
      { id: 'srs1-11', label: '√(-0,25) valós számok körében', category: 'cat-undefined' },
      { id: 'srs1-12', label: '√(-1) valós számok körében', category: 'cat-undefined' }
    ]
  },
  2: {
    title: '2. Szint: Alkalmazandó Műveleti Módszer (Közepes)',
    subtitle: 'Milyen matematikai műveleti fogással hozható a kifejezés a legegyszerűbb alakra?',
    categories: [
      {
        id: 'cat-factor-out',
        name: 'Kiemelés a gyökjel alól',
        description: 'Négyzetszám szorzó keresése és kivonása a gyökjel elé',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-rationalize',
        name: 'Nevező gyöktelenítése',
        description: 'Tört bővítése a nevezőben szereplő gyökös kifejezéssel',
        badgeColor: 'bg-pink-100 text-pink-900 border-pink-300'
      },
      {
        id: 'cat-bring-in',
        name: 'Bevitel a gyökjel alá',
        description: 'Pozitív szorzótényező négyzetre emelése és bevitele a gyök alá',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      }
    ],
    items: [
      { id: 'srs2-1', label: '√72 átírása 6√2 alakra', category: 'cat-factor-out' },
      { id: 'srs2-2', label: '√300 átírása 10√3 alakra', category: 'cat-factor-out' },
      { id: 'srs2-3', label: '√98 átírása 7√2 alakra', category: 'cat-factor-out' },
      { id: 'srs2-4', label: '√45 átírása 3√5 alakra', category: 'cat-factor-out' },
      { id: 'srs2-5', label: '6 / √3 átírása 2√3-ra', category: 'cat-rationalize' },
      { id: 'srs2-6', label: '10 / √5 átírása 2√5-re', category: 'cat-rationalize' },
      { id: 'srs2-7', label: '14 / √7 átírása 2√7-re', category: 'cat-rationalize' },
      { id: 'srs2-8', label: '1 / √2 átírása √2 / 2-re', category: 'cat-rationalize' },
      { id: 'srs2-9', label: '3√2 átírása √18-ra', category: 'cat-bring-in' },
      { id: 'srs2-10', label: '2√5 átírása √20-ra', category: 'cat-bring-in' },
      { id: 'srs2-11', label: '5√3 átírása √75-re', category: 'cat-bring-in' },
      { id: 'srs2-12', label: '4√2 átírása √32-re', category: 'cat-bring-in' }
    ]
  },
  3: {
    title: '3. Szint: Érettségi Kifejezések és Csapdák (Haladó)',
    subtitle: 'Rendszerezd az állításokat és azonosságokat érvényességük szerint!',
    categories: [
      {
        id: 'cat-identity-valid',
        name: 'Szabályos azonosság (Szorzat / Hányados)',
        description: 'Matematikailag helyes, tényezőnkénti gyökvonás',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-trap-invalid',
        name: 'Csapda: Érvénytelen azonosság (Összeg / Különbség)',
        description: 'Gyakori diákhiba: összeadásra és kivonásra nincs azonosság!',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-abs-rule',
        name: 'Abszolút értékes szabály (√(x²) = |x|)',
        description: 'Páros kitevőjű kifejezés gyökvonása abszolút értékkel',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'srs3-1', label: '√(a · b) = √a · √b alkalmazása', category: 'cat-identity-valid' },
      { id: 'srs3-2', label: '√(a / b) = √a / √b alkalmazása', category: 'cat-identity-valid' },
      { id: 'srs3-3', label: '√8 · √2 = √16 = 4 összevonása', category: 'cat-identity-valid' },
      { id: 'srs3-4', label: '√75 / √3 = √25 = 5 kiszámítása', category: 'cat-identity-valid' },
      { id: 'srs3-5', label: '„√(a + b) = √a + √b” feltételezése', category: 'cat-trap-invalid' },
      { id: 'srs3-6', label: '„√(a - b) = √a - √b” feltételezése', category: 'cat-trap-invalid' },
      { id: 'srs3-7', label: '„√(9 + 16) = 3 + 4 = 7” számítási hiba', category: 'cat-trap-invalid' },
      { id: 'srs3-8', label: '„√(100 - 36) = 10 - 6 = 4” számítási hiba', category: 'cat-trap-invalid' },
      { id: 'srs3-9', label: '√(x²) = |x| alkalmazása', category: 'cat-abs-rule' },
      { id: 'srs3-10', label: '√((-5)²) = |-5| = +5 kiszámítása', category: 'cat-abs-rule' },
      { id: 'srs3-11', label: '√(a⁶) = |a³| változós azonosság', category: 'cat-abs-rule' },
      { id: 'srs3-12', label: '√(x² - 6x + 9) = |x - 3| kifejezés átírása', category: 'cat-abs-rule' }
    ]
  }
};

export const SquareRootSorter: React.FC<SquareRootSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-szamok-negyzetgyok-sorter',
  topicTitle = 'A Négyzetgyök'
}) => {
  const activeLevel = currentLevel || level;
  const config = sorterLevels[activeLevel] || sorterLevels[1];

  return (
    <SorterTemplate
      key={`sqroot-sorter-${activeLevel}`}
      level={activeLevel}
      title={config.title}
      subtitle={config.subtitle}
      categories={config.categories}
      items={config.items}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="blue"
    />
  );
};

export default SquareRootSorter;
