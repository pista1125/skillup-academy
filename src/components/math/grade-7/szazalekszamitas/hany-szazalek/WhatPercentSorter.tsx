import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface WhatPercentSorterProps {
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
    title: '1. Szint: A Százalékláb Nagysága a 100%-hoz Viszonyítva',
    subtitle: 'Döntsd el a megadott hányadosokról, hogy 100%-nál kisebbek, pontosan 100%-osak vagy 100%-nál nagyobbak!',
    categories: [
      {
        id: 'cat-less',
        name: '100%-nál kisebb (É < A)',
        description: 'A rész kisebb az egésznél, az arány 0 és 100% közötti',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300'
      },
      {
        id: 'cat-equal',
        name: 'Pontosan 100% (É = A)',
        description: 'A vizsgált mennyiség pontosan megegyezik a teljes egésszel',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      },
      {
        id: 'cat-greater',
        name: '100%-nál nagyobb (É > A)',
        description: 'A vizsgált mennyiség meghaladja a viszonyítási alapot',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
      }
    ],
    items: [
      { id: 's1-1', label: '192 GB a 256 GB-nak (75%)', category: 'cat-less' },
      { id: 's1-2', label: '42 kg a 60 kg-nak (70%)', category: 'cat-less' },
      { id: 's1-3', label: '15 perc a 60 percnek (25%)', category: 'cat-less' },
      { id: 's1-4', label: '119 pont a 140 pontnak (85%)', category: 'cat-less' },
      { id: 's1-5', label: '50 pontból 50 pont a dolgozaton', category: 'cat-equal' },
      { id: 's1-6', label: '60 percből 60 perc jelenlét', category: 'cat-equal' },
      { id: 's1-7', label: '32 fős osztályból 32 jelenlévő', category: 'cat-equal' },
      { id: 's1-8', label: 'Teljes 256 GB pendrive-tárhely foglalt', category: 'cat-equal' },
      { id: 's1-9', label: '10 a 4-nek (250%)', category: 'cat-greater' },
      { id: 's1-10', label: '430 Ft a 290 Ft-nak (148%)', category: 'cat-greater' },
      { id: 's1-11', label: 'Heti 7 óra az 5 órának (140%)', category: 'cat-greater' },
      { id: 's1-12', label: '20 perc a 30 másodpercnek (4000%)', category: 'cat-greater' }
    ]
  },
  2: {
    title: '2. Szint: Százalékos Kérdés Típusa a Szövegben',
    subtitle: 'Sorold be a szöveges problémákat aszerint, hogy közvetlen részarányt, csökkenést vagy növekedést keresünk!',
    categories: [
      {
        id: 'cat-ratio',
        name: 'Közvetlen részarány (Hányad része?)',
        description: 'A vizsgált rész aránya a teljes egészhez képest',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300'
      },
      {
        id: 'cat-decrease',
        name: 'Csökkenés mértéke (Hány %-kal kevesebb?)',
        description: 'Leárazás, kedvezmény vagy maradék szabad terület',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
      },
      {
        id: 'cat-increase',
        name: 'Növekedés mértéke (Hány %-kal több?)',
        description: 'Drágulás, tanulási idő bővülése vagy területgyarapodás',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      }
    ],
    items: [
      { id: 's2-1', label: 'A pendrive 75%-a foglalt adat', category: 'cat-ratio' },
      { id: 's2-2', label: 'A 60 kg-os testtömeg 70%-a víz', category: 'cat-ratio' },
      { id: 's2-3', label: 'A háztartások 44%-ában van autó', category: 'cat-ratio' },
      { id: 's2-4', label: 'Matyi dolgozata 85%-os lett', category: 'cat-ratio' },
      { id: 's2-5', label: 'Szendvics leárazása 250-ről 180 Ft-ra (-28%)', category: 'cat-decrease' },
      { id: 's2-6', label: 'Ingatlan lealkudása 32M-ről 29,44M-re (-8%)', category: 'cat-decrease' },
      { id: 's2-7', label: 'Könyv árcsökkentése 2000-ről 1600 Ft-ra (-20%)', category: 'cat-decrease' },
      { id: 's2-8', label: 'Szabad tárhely a pendrive-on (25%)', category: 'cat-decrease' },
      { id: 's2-9', label: 'Lázár tanulási idejének bővülése 5-ről 7 órára (+40%)', category: 'cat-increase' },
      { id: 's2-10', label: 'Tej drágulása 290-ről 430 Ft-ra (+48%)', category: 'cat-increase' },
      { id: 's2-11', label: 'Könyv visszaemelése 1600-ról 2000 Ft-ra (+25%)', category: 'cat-increase' },
      { id: 's2-12', label: 'Téglalap területének növekedése (+44%)', category: 'cat-increase' }
    ]
  },
  3: {
    title: '3. Szint: Mi a Viszonyítási Alap (az Osztó A)?',
    subtitle: 'Azonosítsd a szöveges feladatban, hogy melyik érték szerepel a tört nevezőjében (az Alap)!',
    categories: [
      {
        id: 'cat-initial',
        name: 'Kezdőérték / Eredeti állapot az alap',
        description: 'Az árváltozások előtti régi ár vagy korábbi állapot a 100%',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300'
      },
      {
        id: 'cat-total',
        name: 'Teljes kapacitás / Teljes halmaz az alap',
        description: 'A teljes tárhely, maximális pontszám vagy összlétszám a 100%',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300'
      },
      {
        id: 'cat-modified',
        name: 'Módosult / Második mennyiség az alap',
        description: 'A visszaemelésnél a csökkentett ár, vagy geometriában a másik szög a 100%',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300'
      }
    ],
    items: [
      { id: 's3-1', label: '2000 Ft-ról 1600 Ft-ra leárazás (Alap: 2000 Ft)', category: 'cat-initial' },
      { id: 's3-2', label: 'Lázár korábbi heti 5 órája (Alap: 5 óra)', category: 'cat-initial' },
      { id: 's3-3', label: 'Szendvics eredeti 250 Ft-os ára (Alap: 250 Ft)', category: 'cat-initial' },
      { id: 's3-4', label: 'Tej régi 290 Ft-os ára (Alap: 290 Ft)', category: 'cat-initial' },
      { id: 's3-5', label: 'Pendrive 256 GB teljes kapacitása (Alap: 256 GB)', category: 'cat-total' },
      { id: 's3-6', label: 'Morgós Miska összes 120 morgása (Alap: 120)', category: 'cat-total' },
      { id: 's3-7', label: 'Ember 60 kg-os teljes testsúlya (Alap: 60 kg)', category: 'cat-total' },
      { id: 's3-8', label: 'Aladár 40 rászólása összesen (Alap: 40 eset)', category: 'cat-total' },
      { id: 's3-9', label: '1600 Ft-ról 2000 Ft-ra visszaemelés (Alap: 1600 Ft)', category: 'cat-modified' },
      { id: 's3-10', label: '27° aránya a másik 63°-os hegyesszöghöz (Alap: 63°)', category: 'cat-modified' },
      { id: 's3-11', label: '27° aránya a derékszöghöz (Alap: 90°)', category: 'cat-modified' },
      { id: 's3-12', label: '20 perc a 30 másodpercnek (Alap: 30 másodperc)', category: 'cat-modified' }
    ]
  }
};

export const WhatPercentSorter: React.FC<WhatPercentSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-pct-what-sorter',
  topicTitle = 'Hány százalék?'
}) => {
  const activeLevel = (currentLevel || level) as DifficultyLevel;

  return (
    <SorterTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      grade={7}
      chapterId="g7-percent-equations"
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="cyan"
      title="Hány százalék? - Csoportosító Játék"
      badge="CSOPORTOSÍTÓ"
    />
  );
};

export default WhatPercentSorter;
