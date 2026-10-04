import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ProbabilityBasicsSorterProps {
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
    title: '1. Szint: Események Valószínűség Szerinti Jellege',
    subtitle: 'Válogasd szét a szituációkat: Lehetetlen (P = 0), Véletlen (0 < P < 1) vagy Biztos (P = 1)!',
    categories: [
      {
        id: 'cat-impossible',
        name: 'Lehetetlen Esemény (P = 0)',
        description: 'Soha nem következhet be, 0 kedvező eset létezik (0%)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-random',
        name: 'Véletlen Esemény (0 < P < 1)',
        description: 'Bekövetkezhet, de nem garantált: a valószínűsége 0 és 1 közé esik',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-certain',
        name: 'Biztos Esemény (P = 1)',
        description: 'Garantáltan bekövetkezik, minden lehetséges kimenetel kedvező (100%)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      { id: 's1-1', label: 'Szabályos 6 oldalú dobókockával 7-est dobunk', category: 'cat-impossible' },
      { id: 's1-2', label: 'Egy dobozból, amiben csak piros golyók vannak, kék golyót húzunk', category: 'cat-impossible' },
      { id: 's1-3', label: 'Két kockával dobva az összeg 1 lesz', category: 'cat-impossible' },
      { id: 's1-4', label: 'Magyar kártyacsomagból 5-ös számú lapot húzunk (a lapok 7-től ászig terjednek)', category: 'cat-impossible' },
      { id: 's1-5', label: 'Szabályos érmével fejet dobunk', category: 'cat-random' },
      { id: 's1-6', label: 'Dobókockával páros számot dobunk', category: 'cat-random' },
      { id: 's1-7', label: 'Magyar kártyából zöld ászt húzunk', category: 'cat-random' },
      { id: 's1-8', label: 'Urnából (5 piros, 5 sárga) piros golyót húzunk', category: 'cat-random' },
      { id: 's1-9', label: 'Dobókockával 7-nél kisebb pozitív egész számot dobunk', category: 'cat-certain' },
      { id: 's1-10', label: 'Egy dobozból, amiben csak fehér golyók vannak, fehér golyót húzunk', category: 'cat-certain' },
      { id: 's1-11', label: 'Egy feldobott érme fejet VAGY írást mutat', category: 'cat-certain' },
      { id: 's1-12', label: 'Két kockával dobva az összeg 2 és 12 közé esik', category: 'cat-certain' }
    ]
  },
  2: {
    title: '2. Szint: Valószínűségi Értékek Nagysága',
    subtitle: 'Kategorizáld a feladványokat a kiszámított valószínűségük nagysága szerint!',
    categories: [
      {
        id: 'cat-low',
        name: 'Kis Valószínűség (P ≤ 25%)',
        description: 'Legfeljebb 25% (1/4) az esélye a bekövetkezésnek',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-med',
        name: 'Közepes Esély (25% < P < 75%)',
        description: 'Kiegyensúlyozott tartomány (25% és 75% között)',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-high',
        name: 'Nagy Valószínűség (P ≥ 75%)',
        description: 'Legalább 75% (3/4) vagy még nagyobb esély',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      { id: 's2-1', label: 'Kockával 6-ost dobni (1/6 ≈ 16,7%)', category: 'cat-low' },
      { id: 's2-2', label: 'Két érmével két fejet dobni (1/4 = 25%)', category: 'cat-low' },
      { id: 's2-3', label: 'Magyar kártyából ászt húzni (4/32 = 1/8 = 12,5%)', category: 'cat-low' },
      { id: 's2-4', label: 'Urnából (2 piros, 8 kék) pirosat húzni (2/10 = 20%)', category: 'cat-low' },
      { id: 's2-5', label: 'Kockával páros számot dobni (3/6 = 50%)', category: 'cat-med' },
      { id: 's2-6', label: 'Érmével fejet dobni (1/2 = 50%)', category: 'cat-med' },
      { id: 's2-7', label: 'Kockával 2-nél nagyobb számot dobni: 3, 4, 5, 6 (4/6 = 66,7%)', category: 'cat-med' },
      { id: 's2-8', label: 'Két kocka összege 7 vagy 8 (11/36 ≈ 30,6%)', category: 'cat-med' },
      { id: 's2-9', label: 'Kockával NEM 6-ost dobni (5/6 ≈ 83,3%)', category: 'cat-high' },
      { id: 's2-10', label: 'Két érmével dobva: legalább egy fej (3/4 = 75%)', category: 'cat-high' },
      { id: 's2-11', label: 'Magyar kártyából NEM ászt húzni (28/32 = 87,5%)', category: 'cat-high' },
      { id: 's2-12', label: 'Urnából (9 fehér, 1 fekete) fehéret húzni (9/10 = 90%)', category: 'cat-high' }
    ]
  },
  3: {
    title: '3. Szint: Valószínűségi Állítások és Módszerek',
    subtitle: 'Döntsd el, hogy a klasszikus képlet, az ellentett esemény vagy hibás állítás illik a kártyára!',
    categories: [
      {
        id: 'cat-classic',
        name: 'Klasszikus Valószínűség (P = k / n)',
        description: 'Közvetlenül a kedvező és az összes eset hányadosaként számoljuk',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-complement',
        name: 'Ellentett Esemény (1 - P)',
        description: 'A "legalább egy" vagy a "nem bekövetkező" események gyors kiszámítása',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-err',
        name: 'Matematikai Hiba / Tévhit',
        description: 'Értelmetlen, 100% feletti vagy a valószínűség törvényeivel ellenkező állítás',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 's3-1', label: 'Egy dobozban 12 golyó van, ebből 5 zöld: P(zöld) = 5 / 12', category: 'cat-classic' },
      { id: 's3-2', label: 'Szabályos kockával prímszám esélye: 3 eset a 6-ból: 3 / 6 = 1 / 2', category: 'cat-classic' },
      { id: 's3-3', label: '52 lapból pikk kártya kihúzása: 13 / 52 = 1 / 4', category: 'cat-classic' },
      { id: 's3-4', label: 'Rulettkeréken a piros szám esélye: 18 / 37', category: 'cat-classic' },
      { id: 's3-5', label: 'Két kockával legalább egy 6-os esélye: 1 - P(egyik sem 6) = 1 - 25/36 = 11/36', category: 'cat-complement' },
      { id: 's3-6', label: 'Annak esélye, hogy ma nem esik az eső: 1 - P(esik)', category: 'cat-complement' },
      { id: 's3-7', label: '3 érmével dobva: legalább egy írás: 1 - P(mindhárom fej) = 1 - 1/8 = 7/8', category: 'cat-complement' },
      { id: 's3-8', label: 'A selejtes termék esélye 2%, így a hibátlan termék esélye: 1 - 0,02 = 98%', category: 'cat-complement' },
      { id: 's3-9', label: '"A győzelmi esélyem pontosan 140%-ra nőtt a tegnapihoz képest"', category: 'cat-err' },
      { id: 's3-10', label: '"Egy esemény valószínűsége negatív szám lett: P = -0,2"', category: 'cat-err' },
      { id: 's3-11', label: '"Ha a lottón sokszor nem húzták ki a 7-est, most 99% az esélye"', category: 'cat-err' },
      { id: 's3-12', label: '"A kedvező esetek száma 10, az összes eset 5, tehát P = 10/5 = 2"', category: 'cat-err' }
    ]
  }
};

export const ProbabilityBasicsSorter: React.FC<ProbabilityBasicsSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'probability-basics',
  topicTitle = 'Klasszikus Valószínűség'
}) => {
  return (
    <SorterTemplate
      level={level}
      levels={sorterLevels}
      topicId={topicId}
      topicTitle={topicTitle}
      badge="VI. FEJEZET • 8. OSZTÁLY"
      themeColor="amber"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default ProbabilityBasicsSorter;
