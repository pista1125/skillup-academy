import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface VolumeSorterProps {
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
    title: '1. Szint: Kocka, Téglatest vagy Űrtartalom?',
    subtitle: 'Válogasd szét a képleteket, feladványokat és fogalmakat a megfelelő csoportba!',
    categories: [
      {
        id: 'cat-cube',
        name: 'Kocka térfogata',
        description: 'Minden él azonos: V = a³',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-cuboid',
        name: 'Téglatest térfogata',
        description: 'Három különböző él: V = a · b · c',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-liquid',
        name: 'Űrtartalom & Liter',
        description: 'Folyadékok, liter, 1 dm³ = 1 liter',
        badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300'
      }
    ],
    items: [
      { id: 's1-1', label: 'V = a · a · a = a³', category: 'cat-cube' },
      { id: 's1-2', label: 'V = a · b · c = T_alap · m', category: 'cat-cuboid' },
      { id: 's1-3', label: '1 dm³ víz pontosan 1 liter', category: 'cat-liquid' },
      { id: 's1-4', label: 'Dobókocka térfogata (a = 2 cm → V = 8 cm³)', category: 'cat-cube' },
      { id: 's1-5', label: 'Tégla térfogata (12 × 25 × 6,5 cm)', category: 'cat-cuboid' },
      { id: 's1-6', label: 'Tejesdoboz űrtartalma (1 liter = 1000 ml)', category: 'cat-liquid' },
      { id: 's1-7', label: 'a = 4 cm élű kocka: V = 64 cm³', category: 'cat-cube' },
      { id: 's1-8', label: '2 cm × 3 cm × 5 cm-es gyufásdoboz (V = 30 cm³)', category: 'cat-cuboid' },
      { id: 's1-9', label: '1 m³ = 1000 liter folyadék', category: 'cat-liquid' },
      { id: 's1-10', label: 'Köbös növekedés azonos élek mentén', category: 'cat-cube' },
      { id: 's1-11', label: 'Alapterület és testmagasság szorzata', category: 'cat-cuboid' },
      { id: 's1-12', label: 'Akvárium feltöltése csapvízzel literben', category: 'cat-liquid' }
    ]
  },
  2: {
    title: '2. Szint: Térfogat nagyságrendek és űrtartalom',
    subtitle: 'Csoportosítsd a tárgyakat és testeket térfogatuk / űrtartalmuk nagysága szerint!',
    categories: [
      {
        id: 'cat-small',
        name: 'Kis térfogat (< 1 liter)',
        description: 'Néhány cm³ vagy dl, pohár, gyógyszer, dobozka',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      {
        id: 'cat-medium',
        name: 'Közepes térfogat (1 – 100 liter)',
        description: 'Vödrök, hátizsákok, kis akváriumok, üzemanyagtartály',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-large',
        name: 'Nagy térfogat (> 100 liter)',
        description: 'Medencék, tartályok, fürdőkádak, szobák légtere',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      { id: 's2-1', label: 'Egy bögre forró tea (2,5 dl = 250 cm³)', category: 'cat-small' },
      { id: 's2-2', label: 'Kockacukor térfogata (~1 cm³)', category: 'cat-small' },
      { id: 's2-3', label: 'a = 5 cm élű kocka (V = 125 cm³ = 0,125 l)', category: 'cat-small' },
      { id: 's2-4', label: 'Vizesvödör űrtartalma (10–12 liter)', category: 'cat-medium' },
      { id: 's2-5', label: 'Iskolatáska belső tere (25 liter)', category: 'cat-medium' },
      { id: 's2-6', label: 'Szobai akvárium (60 × 30 × 40 cm = 72 liter)', category: 'cat-medium' },
      { id: 's2-7', label: 'Autó üzemanyagtankja (55 liter)', category: 'cat-medium' },
      { id: 's2-8', label: 'Kerti kék esővízgyűjtő hordó (200 liter)', category: 'cat-large' },
      { id: 's2-9', label: 'Kerti úszómedence (4 × 6 × 1,5 m = 36 000 liter)', category: 'cat-large' },
      { id: 's2-10', label: 'Szoba légtere (4 × 5 × 3 m = 60 m³ = 60 000 l)', category: 'cat-large' },
      { id: 's2-11', label: 'Felnőtt fürdőkád tele vízzel (~150 liter)', category: 'cat-large' },
      { id: 's2-12', label: 'Gyufásdoboz belső tere (kb. 30 cm³)', category: 'cat-small' }
    ]
  },
  3: {
    title: '3. Szint: Dimenziók és skálázási hatások',
    subtitle: 'Válogasd szét a mért mennyiségeket aszerint, hogy 1D él, 2D felület vagy 3D térfogat!',
    categories: [
      {
        id: 'cat-1d',
        name: '1D Él / Hosszúság',
        description: 'cm, m; k-szoros növekedés élnyújtáskor',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-2d',
        name: '2D Felszín / Terület',
        description: 'cm², m²; k²-szeres növekedés (duplázáskor 4×)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-3d',
        name: '3D Térfogat / Űrtartalom',
        description: 'cm³, liter, m³; k³-szoros növekedés (duplázáskor 8×)',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      { id: 's3-1', label: 'Kocka 12 élének összege: 12 · a', category: 'cat-1d' },
      { id: 's3-2', label: 'Téglatest magassága (m = c)', category: 'cat-1d' },
      { id: 's3-3', label: 'Kocka teljes felszíne: A = 6a²', category: 'cat-2d' },
      { id: 's3-4', label: 'Téglatest alapterülete: T_alap = a · b', category: 'cat-2d' },
      { id: 's3-5', label: 'Kocka térfogata: V = a³', category: 'cat-3d' },
      { id: 's3-6', label: 'Akvárium vízkapacitása literben', category: 'cat-3d' },
      { id: 's3-7', label: 'Él megduplázásakor 4-szeresére nő', category: 'cat-2d' },
      { id: 's3-8', label: 'Él megduplázásakor 8-szorosára nő', category: 'cat-3d' },
      { id: 's3-9', label: 'Él megduplázásakor 2-szeresére nő', category: 'cat-1d' },
      { id: 's3-10', label: 'Kiszorított víz térfogata: V_test = T_alap · Δm', category: 'cat-3d' },
      { id: 's3-11', label: 'Téglatest 4 falának területe: 2(a+b)m', category: 'cat-2d' },
      { id: 's3-12', label: 'Alaplap kerülete: K = 2(a + b)', category: 'cat-1d' }
    ]
  }
};

export const VolumeSorter: React.FC<VolumeSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onBack,
  topicId = 'g6-volume-sorter',
  topicTitle = 'Testek térfogata'
}) => {
  const activeLevel = (currentLevel || level) as DifficultyLevel;

  return (
    <SorterTemplate
      title="Testek térfogata csoportosító"
      subtitle="Csoportosítsd a térfogatképleteket, űrtartalmakat és skálázási hatásokat 3 szinten!"
      badge="6. OSZTÁLY • V. KERÜLET, TERÜLET, FELSZÍN, TÉRFOGAT"
      themeColor="teal"
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

(VolumeSorter as any).sorterLevels = sorterLevels;
(VolumeSorter as any).levels = sorterLevels;

export default VolumeSorter;
