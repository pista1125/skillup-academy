import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SurfaceAreaSorterProps {
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
    title: '1. Szint: Kocka, Téglatest vagy Hasáb?',
    subtitle: 'Válogasd szét a kifejezéseket, képleteket és feladatokat a megfelelő testcsoportba!',
    categories: [
      {
        id: 'cat-cube',
        name: 'Kocka felszíne',
        description: '6 egybevágó négyzetlap (A = 6a²)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-cuboid',
        name: 'Téglatest felszíne',
        description: '3 pár egybevágó téglalap [A = 2(ab+bc+ac)]',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-prism',
        name: 'Egyenes hasáb felszíne',
        description: 'Alaplapok + palást (A = 2·T_alap + T_palást)',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      { id: 's1-1', label: 'A = 6 · a²', category: 'cat-cube' },
      { id: 's1-2', label: 'A = 2 · (ab + ac + bc)', category: 'cat-cuboid' },
      { id: 's1-3', label: 'A = 2 · T_alap + T_palást', category: 'cat-prism' },
      { id: 's1-4', label: 'Dobókocka külső felülete', category: 'cat-cube' },
      { id: 's1-5', label: 'Téglalap alakú cipősdoboz becsomagolása', category: 'cat-cuboid' },
      { id: 's1-6', label: 'Toblerone csoki háromszög alapú doboza', category: 'cat-prism' },
      { id: 's1-7', label: 'a = 4 cm élű test: A = 6 · 16 = 96 cm²', category: 'cat-cube' },
      { id: 's1-8', label: 'a = 2 cm, b = 3 cm, c = 4 cm élű doboz', category: 'cat-cuboid' },
      { id: 's1-9', label: 'Palást felülete: T_palást = K_alap · m', category: 'cat-prism' },
      { id: 's1-10', label: 'Minden határoló lapja azonos méretű négyzet', category: 'cat-cube' },
      { id: 's1-11', label: 'Három különböző élhossza van: a, b és c', category: 'cat-cuboid' },
      { id: 's1-12', label: 'Ötszög alapú oszlop 5 téglalap palástlappal', category: 'cat-prism' }
    ]
  },
  2: {
    title: '2. Szint: Felszín nagysága és becslése',
    subtitle: 'Válogasd szét a testeket kiszámított felszínük nagysága szerint!',
    categories: [
      {
        id: 'cat-small',
        name: 'Kisebb, mint 100 cm²',
        description: 'A < 100 cm²',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      {
        id: 'cat-medium',
        name: '100 és 300 cm² között',
        description: '100 cm² ≤ A ≤ 300 cm²',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-large',
        name: 'Nagyobb, mint 300 cm²',
        description: 'A > 300 cm²',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      { id: 's2-1', label: 'Kocka a = 3 cm (A = 54 cm²)', category: 'cat-small' },
      { id: 's2-2', label: 'Kocka a = 5 cm (A = 150 cm²)', category: 'cat-medium' },
      { id: 's2-3', label: 'Kocka a = 8 cm (A = 384 cm²)', category: 'cat-large' },
      { id: 's2-4', label: 'Téglatest: 2 × 3 × 4 cm (A = 52 cm²)', category: 'cat-small' },
      { id: 's2-5', label: 'Téglatest: 3 × 4 × 5 cm (A = 94 cm²)', category: 'cat-small' },
      { id: 's2-6', label: 'Téglatest: 4 × 5 × 6 cm (A = 148 cm²)', category: 'cat-medium' },
      { id: 's2-7', label: 'Kocka a = 6 cm (A = 216 cm²)', category: 'cat-medium' },
      { id: 's2-8', label: 'Téglatest: 5 × 6 × 8 cm (A = 236 cm²)', category: 'cat-medium' },
      { id: 's2-9', label: 'Kocka a = 10 cm (A = 600 cm²)', category: 'cat-large' },
      { id: 's2-10', label: 'Téglatest: 5 × 10 × 10 cm (A = 400 cm²)', category: 'cat-large' },
      { id: 's2-11', label: 'Kocka a = 2 cm (A = 24 cm²)', category: 'cat-small' },
      { id: 's2-12', label: 'Téglatest: 6 × 8 × 10 cm (A = 376 cm²)', category: 'cat-large' }
    ]
  },
  3: {
    title: '3. Szint: Különleges és összetett felületek',
    subtitle: 'Válogasd szét a feladványokat a külső lapok száma és jellege szerint!',
    categories: [
      {
        id: 'cat-five',
        name: '5 lap felülete (nyitott / fedél nélküli)',
        description: 'Egy lap hiányzik vagy nem festjük (ab + 2ac + 2bc)',
        badgeColor: 'bg-sky-100 text-sky-800 border-sky-300'
      },
      {
        id: 'cat-six',
        name: '6 lap felülete (hagyományos zárt test)',
        description: 'Teljes zárt kocka vagy téglatest',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-ten',
        name: '10 külső lap (2 összeragasztott kocka)',
        description: '2 belső érintkező lap elveszik: 12 - 2 = 10 lap',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      { id: 's3-1', label: 'Felülről nyitott papírdoboz elkészítése', category: 'cat-five' },
      { id: 's3-2', label: 'Zárt kartondoboz teljes becsomagolása', category: 'cat-six' },
      { id: 's3-3', label: 'Két 1 cm-es kiskocka összeragasztása lap mentén', category: 'cat-ten' },
      { id: 's3-4', label: 'Szoba 4 falának és mennyezetének festése (padló nélkül)', category: 'cat-five' },
      { id: 's3-5', label: 'Hagyományos dobókocka minden lapja pettyezve', category: 'cat-six' },
      { id: 's3-6', label: 'Két 3 cm-es fakockából álló oszlop felülete (10 · 9 = 90 cm²)', category: 'cat-ten' },
      { id: 's3-7', label: 'Akvárium üvegfalai (aljzat + 4 oldallap, fedél nincs)', category: 'cat-five' },
      { id: 's3-8', label: 'Tégla teljes felületének bekenése habarccsal', category: 'cat-six' },
      { id: 's3-9', label: 'Két azonos kocka összeillesztésekor elvesző 2 lap után maradó felület', category: 'cat-ten' },
      { id: 's3-10', label: 'Nyitott láda külső festése (alap + 4 oldal)', category: 'cat-five' },
      { id: 's3-11', label: 'Zárt téglatest 3 pár egybevágó lapja', category: 'cat-six' },
      { id: 's3-12', label: 'Dupla kocka alakú dominókő felülete', category: 'cat-ten' }
    ]
  }
};

export const SurfaceAreaSorter: React.FC<SurfaceAreaSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onBack,
  topicId = 'g6-surface-area-sorter',
  topicTitle = 'Testek felszíne'
}) => {
  const activeLevel = (currentLevel || level) as DifficultyLevel;

  return (
    <SorterTemplate
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
      chapterId="kerulet-terulet-felszin-terfogat"
      themeColor="amber"
      badge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      title="Testek felszíne csoportosító"
      subtitle="Csoportosítsd a testeket, képleteket és felszínértékeket 3 szinten!"
    />
  );
};

(SurfaceAreaSorter as any).sorterLevels = sorterLevels;
(SurfaceAreaSorter as any).levels = sorterLevels;

export default SurfaceAreaSorter;
