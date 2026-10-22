import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LocksSorterProps {
  level?: DifficultyLevel;
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
    title: '1. Szint: Kódtípusok és Alapvető Szabályok Csoportosítása',
    subtitle: 'Rendszerezd az ismétléses kódokat, ismétlés nélküli sorrendeket és valódi számokat!',
    categories: [
      {
        id: 'cat-repeat',
        name: 'Ismétléses Kódok (n^k)',
        description: 'Bármely pozícióra bármely elem kerülhet, a 0 is állhat elöl',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-norepeat',
        name: 'Ismétlés Nélküli Sorrendek',
        description: 'Minden felhasznált elem kiesik, csökkenő tényezők szorzata',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-numbers',
        name: 'Valódi Számok Képzése',
        description: 'A legelső helyiértékre (százas, ezres stb.) tilos a 0!',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'ls1-1', label: '4-jegyű bankkártya PIN kód: 10⁴ = 10 000', category: 'cat-repeat' },
      { id: 'ls1-2', label: '3-tárcsás bőrönd lakat: 10³ = 1 000', category: 'cat-repeat' },
      { id: 'ls1-3', label: '8-bites bináris bájt: 2⁸ = 256', category: 'cat-repeat' },
      { id: 'ls1-4', label: '6 karakteres jelszó kisbetűkből: 26⁶', category: 'cat-repeat' },
      { id: 'ls1-5', label: 'Futóverseny 1-3. helyezettjeinek sorrendje (10·9·8)', category: 'cat-norepeat' },
      { id: 'ls1-6', label: '4 barát leültetése egy 4 személyes padra (4!)', category: 'cat-norepeat' },
      { id: 'ls1-7', label: '3-jegyű kód különböző számjegyekből (10·9·8)', category: 'cat-norepeat' },
      { id: 'ls1-8', label: '5 könyv sorrendje egy polcon (5! = 120)', category: 'cat-norepeat' },
      { id: 'ls1-9', label: '3-jegyű pozitív egész számok: 9 · 10 · 10 = 900', category: 'cat-numbers' },
      { id: 'ls1-10', label: '4-jegyű pozitív egész számok: 9 · 10³ = 9 000', category: 'cat-numbers' },
      { id: 'ls1-11', label: '3-jegyű számok {0,1,2,3}-ból: 3 · 4 · 4 = 48', category: 'cat-numbers' },
      { id: 'ls1-12', label: '2-jegyű számok különböző jegyekkel: 9 · 9 = 81', category: 'cat-numbers' }
    ]
  },
  2: {
    title: '2. Szint: Különleges Feltételek és Kódstruktúrák',
    subtitle: 'Csoportosítsd a rendszámokat, paritási megkötéseket és szigorú feltételeket!',
    categories: [
      {
        id: 'cat-license',
        name: 'Rendszámok és Többblokkos Kódok',
        description: 'Több különböző ábécé (betűk, számok) szorzata',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-parity',
        name: 'Paritási és Oszthatósági Feltételek',
        description: 'Az utolsó helyiérték határozza meg a választási lehetőséget',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-complement',
        name: 'Komplementer Módszerrel Számolható',
        description: '„Legalább egy azonos”, „nem mindegyik páros” típusú feladatok',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'ls2-1', label: 'Régi magyar rendszám (3 betű + 3 szám): 26³ · 10³', category: 'cat-license' },
      { id: 'ls2-2', label: 'Új magyar rendszám (4 betű + 3 szám): 26⁴ · 10³', category: 'cat-license' },
      { id: 'ls2-3', label: 'Felhasználónév: 2 betű + 4 szám (26² · 10⁴)', category: 'cat-license' },
      { id: 'ls2-4', label: 'Két betűs országkód + 5 jegyű irányítószám', category: 'cat-license' },
      { id: 'ls2-5', label: 'Háromjegyű páros számok száma (utolsó: 0,2,4,6,8)', category: 'cat-parity' },
      { id: 'ls2-6', label: 'Háromjegyű 5-tel osztható számok (utolsó: 0 vagy 5)', category: 'cat-parity' },
      { id: 'ls2-7', label: '3-jegyű különböző jegyű páros számok {1..5}-ből (4·3·2)', category: 'cat-parity' },
      { id: 'ls2-8', label: 'Páratlan végződésű 4-jegyű számok (9·10·10·5)', category: 'cat-parity' },
      { id: 'ls2-9', label: '4-jegyű PIN legalább egy ismétlődéssel: 10 000 − 5 040', category: 'cat-complement' },
      { id: 'ls2-10', label: 'Legalább egy 6-ost dobunk 3 kockával: 6³ − 5³', category: 'cat-complement' },
      { id: 'ls2-11', label: '3-jegyű szám, melyben van legalább egy 0: 900 − 9·9·9', category: 'cat-complement' },
      { id: 'ls2-12', label: 'Nem csupa fej 5 érmedobásból: 2⁵ − 1', category: 'cat-complement' }
    ]
  },
  3: {
    title: '3. Szint: Kódkapacitás Nagyságrendi Besorolása',
    subtitle: 'Becsüld meg a kombinációk pontos nagyságrendjét a képletek alapján!',
    categories: [
      {
        id: 'cat-small',
        name: 'Kicsi Készlet (Legfeljebb 1 000)',
        description: 'Kézzel vagy másodpercek alatt végigpróbálható lehetőségek',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-medium',
        name: 'Közepes Készlet (1 001 – 1 000 000)',
        description: 'Néhány ezer és egy millió közötti kódok',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-huge',
        name: 'Hatalmas Készlet (1 000 000 felett)',
        description: 'Több tízmillió vagy milliárd kombináció, biztonságos rendszerek',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      { id: 'ls3-1', label: '3-tárcsás számzár: 10³ = 1 000', category: 'cat-small' },
      { id: 'ls3-2', label: '8 bites bináris bájt: 2⁸ = 256', category: 'cat-small' },
      { id: 'ls3-3', label: '3 kocka összes kimenetele: 6³ = 216', category: 'cat-small' },
      { id: 'ls3-4', label: 'Háromjegyű valódi számok: 9 · 10² = 900', category: 'cat-small' },
      { id: 'ls3-5', label: '4-jegyű bankkártya PIN kód: 10⁴ = 10 000', category: 'cat-medium' },
      { id: 'ls3-6', label: '5-jegyű irányítószámok (0 elöl is): 10⁵ = 100 000', category: 'cat-medium' },
      { id: 'ls3-7', label: '4-jegyű kód különböző jegyekkel: 10·9·8·7 = 5 040', category: 'cat-medium' },
      { id: 'ls3-8', label: '3 angol betűs monogram: 26³ = 17 576', category: 'cat-medium' },
      { id: 'ls3-9', label: 'Régi magyar rendszám (3 betű, 3 szám): 17 576 000', category: 'cat-huge' },
      { id: 'ls3-10', label: 'Új magyar rendszám (4 betű, 3 szám): 456 976 000', category: 'cat-huge' },
      { id: 'ls3-11', label: '6 karakteres alfanumerikus jelszó: 62⁶ ≈ 56,8 milliárd', category: 'cat-huge' },
      { id: 'ls3-12', label: '6 karakteres kisbetűs jelszó: 26⁶ ≈ 308,9 millió', category: 'cat-huge' }
    ]
  }
};

export const LocksSorter: React.FC<LocksSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId,
  topicTitle
}) => {
  return (
    <SorterTemplate
      level={level}
      config={sorterLevels[level] || sorterLevels[1]}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId || 'g9-komb-szamzarak-sorter'}
      topicTitle={topicTitle || '9. Osztály - Számzárak és Kódok Csoportosító'}
    />
  );
};

export default LocksSorter;
