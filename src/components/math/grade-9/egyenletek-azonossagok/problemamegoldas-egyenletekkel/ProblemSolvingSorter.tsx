import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ProblemSolvingSorterProps {
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
    title: '1. Szint: Szöveges Feladattípusok Felismerése',
    subtitle: 'Melyik klasszikus feladattípusba tartoznak a következő leírások?',
    categories: [
      {
        id: 'cat-age',
        name: 'Életkoros feladat',
        description: 'Személyek életkora most, a múltban vagy jövőben',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-motion',
        name: 'Mozgásos feladat (s = v · t)',
        description: 'Járművek, sebesség, távolság és menetidő',
        badgeColor: 'bg-orange-100 text-orange-900 border-orange-300'
      },
      {
        id: 'cat-mixture',
        name: 'Keverési feladat (oldat / %)',
        description: 'Koncentrációk, tömegek és tiszta hatóanyag',
        badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-300'
      }
    ],
    items: [
      // Életkoros
      { id: 'ps1-1', label: 'Anya 28 évvel idősebb fiánál, 5 év múlva...', category: 'cat-age' },
      { id: 'ps1-2', label: 'Péter és Pál életkorának aránya 3 : 5', category: 'cat-age' },
      { id: 'ps1-3', label: 'Nagyapa háromszor annyi idős, mint unokája', category: 'cat-age' },
      { id: 'ps1-4', label: '10 évvel ezelőtt apa ötször annyi idős volt', category: 'cat-age' },
      // Mozgásos
      { id: 'ps1-5', label: 'Két biciklis szembe indul két városból 18 és 22 km/h-val', category: 'cat-motion' },
      { id: 'ps1-6', label: 'Egy vonat 72 km/h sebességgel mikor ér a 180 km-re lévő célba?', category: 'cat-motion' },
      { id: 'ps1-7', label: 'A gyorsvonat utoléri a teherautót 2 óra múlva', category: 'cat-motion' },
      { id: 'ps1-8', label: 'Gyalogos és futó azonos irányba halad a körpályán', category: 'cat-motion' },
      // Keverési
      { id: 'ps1-9', label: 'Hány gramm 15%-os ecetet kell keverni 200 g 20%-oshoz?', category: 'cat-mixture' },
      { id: 'ps1-10', label: '300 g vízben feloldunk 50 g cukrot, mi a töménység?', category: 'cat-mixture' },
      { id: 'ps1-11', label: 'Kétféle ezüst ötvözetből 800-as finomságút öntenek', category: 'cat-mixture' },
      { id: 'ps1-12', label: 'Egy termék árát 20%-kal emelték, majd 10%-kal csökkentették', category: 'cat-mixture' }
    ]
  },
  2: {
    title: '2. Szint: Szöveges Kapcsolatok Matematikai Művelete',
    subtitle: 'Milyen matematikai alapművelettel írható le a szöveges megfogalmazás?',
    categories: [
      {
        id: 'cat-addition',
        name: 'Összeadás (+)',
        description: 'Több, megnövelt, későbbi idő, együttes összeg',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-subtraction',
        name: 'Kivonás (-)',
        description: 'Kevesebb, csökkentett, korábbi idő, különbség',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-multiplication',
        name: 'Szorzás (·)',
        description: 'Hányszorosa, arányos része, s = v · t, hatóanyag',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Összeadás
      { id: 'ps2-1', label: '8-cal nagyobb szám (x + 8)', category: 'cat-addition' },
      { id: 'ps2-2', label: 'Életkora 5 év múlva (x + 5)', category: 'cat-addition' },
      { id: 'ps2-3', label: 'Két kosárban összesen 45 alma (x + y = 45)', category: 'cat-addition' },
      { id: 'ps2-4', label: 'Költségek növelése 1000 Ft-tal', category: 'cat-addition' },
      // Kivonás
      { id: 'ps2-5', label: '12-vel kevesebb pont (x - 12)', category: 'cat-subtraction' },
      { id: 'ps2-6', label: 'Életkora 4 évvel ezelőtt (x - 4)', category: 'cat-subtraction' },
      { id: 'ps2-7', label: 'Két szám különbsége 15 (x - y = 15)', category: 'cat-subtraction' },
      { id: 'ps2-8', label: 'Árengedmény, csökkentett ár', category: 'cat-subtraction' },
      // Szorzás
      { id: 'ps2-9', label: 'A szám négyszerese (4x)', category: 'cat-multiplication' },
      { id: 'ps2-10', label: 'Megtett út kiszámítása: v · t', category: 'cat-multiplication' },
      { id: 'ps2-11', label: 'Oldat tömege szorozva a töménységgel: m · p', category: 'cat-multiplication' },
      { id: 'ps2-12', label: 'Anya háromszor olyan idős (3x)', category: 'cat-multiplication' }
    ]
  },
  3: {
    title: '3. Szint: Eredmény Realitáskontrollja',
    subtitle: 'Elfogadható-e a kapott matematikai gyök a feladat valóságos szövege alapján?',
    categories: [
      {
        id: 'cat-valid',
        name: 'Elfogadható (Reális)',
        description: 'A valóságos feltételeknek tökéletesen megfelel',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-invalid-neg',
        name: 'Elvetendő (Negatív érték)',
        description: 'Életkor, sebesség, darabszám nem lehet negatív',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-invalid-fraction',
        name: 'Elvetendő (Tört darabszám)',
        description: 'Emberek, autók darabszáma csak egész lehet',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      // Elfogadható
      { id: 'ps3-1', label: 'Anya életkora: x = 36 év', category: 'cat-valid' },
      { id: 'ps3-2', label: 'Könyv ára: x = 2400 Ft', category: 'cat-valid' },
      { id: 'ps3-3', label: 'Autó sebessége: v = 85 km/h', category: 'cat-valid' },
      { id: 'ps3-4', label: 'Osztály létszáma: x = 28 fő', category: 'cat-valid' },
      // Negatív miatt elvetendő
      { id: 'ps3-5', label: 'Gyerek életkora: x = -6 év', category: 'cat-invalid-neg' },
      { id: 'ps3-6', label: 'Gyalogos sebessége: v = -4 km/h', category: 'cat-invalid-neg' },
      { id: 'ps3-7', label: 'Füzet bolti ára: x = -150 Ft', category: 'cat-invalid-neg' },
      { id: 'ps3-8', label: 'Távolság két város között: s = -45 km', category: 'cat-invalid-neg' },
      // Tört darabszám miatt elvetendő
      { id: 'ps3-9', label: 'Diákok száma a buszon: x = 24,5 fő', category: 'cat-invalid-fraction' },
      { id: 'ps3-10', label: 'Eladott autók száma: x = 3,7 darab', category: 'cat-invalid-fraction' },
      { id: 'ps3-11', label: 'Családi kutyák száma: x = 1,4 darab', category: 'cat-invalid-fraction' },
      { id: 'ps3-12', label: 'Focicsapat játékosai: x = 10,8 fő', category: 'cat-invalid-fraction' }
    ]
  }
};

export const ProblemSolvingSorter: React.FC<ProblemSolvingSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-egyenlet-problemamegoldas-quiz',
  topicTitle = 'Problémamegoldás egyenletekkel'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <SorterTemplate
      levels={sorterLevels}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      color="amber"
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};
