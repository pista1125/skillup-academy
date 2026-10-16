import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PracticalSurfaceAreaSorterProps {
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
    title: '1. Szint: Hány határoló lapot számolunk?',
    subtitle: 'Csoportosítsd a feladatokat aszerint, hogy 4, 5 vagy 6 határoló lappal kell-e számolni!',
    categories: [
      {
        id: 'cat-6',
        name: '6 határoló lap',
        description: 'Zárt testek teljes külső felülete',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-5',
        name: '5 határoló lap',
        description: 'Nyitott testek (aljzat + 4 oldal vagy falak + mennyezet)',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      },
      {
        id: 'cat-4',
        name: '4 határoló lap',
        description: 'Csak a palást / a 4 oldalfal területe',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      }
    ],
    items: [
      { id: 's1-1', label: 'Zárt ajándékdoboz becsomagolása', category: 'cat-6' },
      { id: 's1-2', label: 'Felül nyitott üvegakvárium felülete', category: 'cat-5' },
      { id: 's1-3', label: 'Csak a 4 szobafal festése (mennyezet és padló nélkül)', category: 'cat-4' },
      { id: 's1-4', label: 'Úszómedence aljának és 4 belső falának csempézése', category: 'cat-5' },
      { id: 's1-5', label: 'Téglatest alakú hűtőszekrény teljes külső burkolata', category: 'cat-6' },
      { id: 's1-6', label: 'Négyszögletes oszlop 4 oldallapjának lefestése', category: 'cat-4' },
      { id: 's1-7', label: 'Fedél nélküli fa játékláda külső festése', category: 'cat-5' },
      { id: 's1-8', label: 'Tömör dobókocka felületének lakkozása', category: 'cat-6' },
      { id: 's1-9', label: 'Szobafestés: 4 fal és a mennyezet együttes területe', category: 'cat-5' },
      { id: 's1-10', label: 'Kémény külső vakolása a tető felett (4 oldallap)', category: 'cat-4' },
      { id: 's1-11', label: 'Zárt kartondoboz készítéséhez szükséges hullámpapír', category: 'cat-6' },
      { id: 's1-12', label: 'Folyosó 4 oldalfalának tapétázása', category: 'cat-4' }
    ]
  },
  2: {
    title: '2. Szint: Gyakorlati számítási művelet jellege',
    subtitle: 'Válogasd szét a feladatrészleteket aszerint, hogy milyen matematikai lépést igényelnek!',
    categories: [
      {
        id: 'cat-add',
        name: 'Hozzáadás / Összegzés',
        description: 'Lapok, mennyezet vagy felületrészek összeadása',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-sub',
        name: 'Levonás / Kivonás',
        description: 'Ablakok, ajtók vagy hiányzó lapok levonása',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-mult',
        name: 'Szorzás / Ráadás',
        description: 'Több réteg, kiadósság vagy vágási veszteség',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      { id: 's2-1', label: 'Ablakok területének levonása a szobafal felületéből', category: 'cat-sub' },
      { id: 's2-2', label: 'A szoba mennyezetének hozzáadása a 4 falhoz', category: 'cat-add' },
      { id: 's2-3', label: '2 réteg festék miatti felületszorzás (2×)', category: 'cat-mult' },
      { id: 's2-4', label: 'Ajtó felületének kivonása a falak bruttó területéből', category: 'cat-sub' },
      { id: 's2-5', label: 'Aljzat hozzáadása a 4 oldalfalhoz (akvárium)', category: 'cat-add' },
      { id: 's2-6', label: '10% vágási hulladék hozzáadása csempézésnél (· 1,1)', category: 'cat-mult' },
      { id: 's2-7', label: 'Fedél nélküli doboznál a felső lap kivonása a 6 lapból', category: 'cat-sub' },
      { id: 's2-8', label: 'Három pár téglalaplap összeadása a teljes felszínhez', category: 'cat-add' },
      { id: 's2-9', label: '20% csomagolópapír ráhagyás szorzása az átlapolásokhoz', category: 'cat-mult' },
      { id: 's2-10', label: 'Beépített szekrény mögötti falrész kihagyása a festésből', category: 'cat-sub' },
      { id: 's2-11', label: 'Medence padlója és 4 fala területének összeadása', category: 'cat-add' },
      { id: 's2-12', label: 'Festék liter igény szorzása a vödör méretének kerekítéséhez', category: 'cat-mult' }
    ]
  },
  3: {
    title: '3. Szint: Számított felületnagyság',
    subtitle: 'Válogasd szét a testeket és helyiségeket a festendő / burkolandó felület nagysága szerint!',
    categories: [
      {
        id: 'cat-small',
        name: 'Kisebb felület (< 20 m²)',
        description: 'Tárgyak, kis dobozok, kerti ládák és kis kamrák',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      {
        id: 'cat-medium',
        name: 'Közepes felület (20 – 60 m²)',
        description: 'Átlagos szobák falai és kisebb medencék',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-large',
        name: 'Nagy felület (> 60 m²)',
        description: 'Tágas nappalik, komplett szobák mennyezettel, nagy medencék',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      { id: 's3-1', label: 'a = 1 m élű fedél nélküli kockaláda: A = 5 m²', category: 'cat-small' },
      { id: 's3-2', label: '100 × 50 × 50 cm akvárium üvegfelülete: A = 2 m²', category: 'cat-small' },
      { id: 's3-3', label: '2 × 2 × 2,5 m-es kamra 4 fala: 2 · 4 · 2,5 = 20 m²', category: 'cat-small' },
      { id: 's3-4', label: '3 × 4 × 2,5 m szoba 4 fala: 2 · 7 · 2,5 = 35 m²', category: 'cat-medium' },
      { id: 's3-5', label: '4 × 5 × 2,5 m szoba 4 fala: 2 · 9 · 2,5 = 45 m²', category: 'cat-medium' },
      { id: 's3-6', label: '3 × 3 m-es, 1,5 m mély kismedence burkolata: 9 + 18 = 27 m²', category: 'cat-medium' },
      { id: 's3-7', label: '5 × 6 × 3 m szoba 4 fala: 2 · 11 · 3 = 66 m²', category: 'cat-large' },
      { id: 's3-8', label: '4 × 5 × 3 m szoba 4 fala és mennyezete: 54 + 20 = 74 m²', category: 'cat-large' },
      { id: 's3-9', label: '4 × 8 m-es, 1,5 m mély medence csempézése: 32 + 36 = 68 m²', category: 'cat-large' },
      { id: 's3-10', label: '50 × 40 × 30 cm-es cipősdoboz csomagolása: ~0,94 m²', category: 'cat-small' },
      { id: 's3-11', label: '4 × 4 × 3 m szoba 4 fala ablak nélkül: 48 - 4 = 44 m²', category: 'cat-medium' },
      { id: 's3-12', label: '8 × 10 × 3 m-es nagy előadóterem 4 fala: 108 m²', category: 'cat-large' }
    ]
  }
};

export const PracticalSurfaceAreaSorter: React.FC<PracticalSurfaceAreaSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onBack,
  topicId = 'g6-practical-surface-sorter',
  topicTitle = 'Felszínszámítási gyakorlati feladatok'
}) => {
  const activeLevel = (currentLevel || level) as DifficultyLevel;

  return (
    <SorterTemplate
      title="Gyakorlati felszínszámítás csoportosító"
      subtitle="Válogasd szét a hétköznapi felszínszámítási helyzeteket, lapok számát és felületeket 3 szinten!"
      badge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      themeColor="rose"
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
    />
  );
};

(PracticalSurfaceAreaSorter as any).sorterLevels = sorterLevels;
(PracticalSurfaceAreaSorter as any).levels = sorterLevels;

export default PracticalSurfaceAreaSorter;
