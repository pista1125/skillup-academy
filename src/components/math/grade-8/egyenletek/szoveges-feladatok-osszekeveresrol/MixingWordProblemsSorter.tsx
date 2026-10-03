import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MixingWordProblemsSorterProps {
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
    title: '1. Szint: Keverési Folyamatok Csoportosítása',
    subtitle: 'Sorold be az eseményeket hígítás, keverés vagy töményítés/elpárologtatás kategóriába!',
    categories: [
      {
        id: 'cat-dilute',
        name: 'Hígítás (Víz hozzáadása)',
        description: 'Tiszta oldószer (0%) adása, az oldat ritkul',
        badgeColor: 'bg-sky-100 text-sky-800 border-sky-300'
      },
      {
        id: 'cat-mix',
        name: 'Két oldat keverése',
        description: 'Két különböző koncentrációjú anyag összeöntése',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      {
        id: 'cat-conc',
        name: 'Töményítés & Elpárologtatás',
        description: 'Tiszta anyag adása vagy víz elforralása',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      }
    ],
    items: [
      {
        id: 's1',
        label: '5 liter 20%-os gyümölcsléhez 3 liter forrásvizet öntünk',
        category: 'cat-dilute'
      },
      {
        id: 's2',
        label: 'Sóoldathoz desztillált víz adása, így töménysége csökken',
        category: 'cat-dilute'
      },
      {
        id: 's3',
        label: 'Ecet felöntése tiszta vízzel a salátaöntethez',
        category: 'cat-dilute'
      },
      {
        id: 's4',
        label: 'Tiszta oldószer (p = 0%) hozzáadása az edénybe',
        category: 'cat-dilute'
      },
      {
        id: 's5',
        label: '200 g 10%-os és 300 g 35%-os sóoldat összeöntése',
        category: 'cat-mix'
      },
      {
        id: 's6',
        label: '3 liter 15%-os és 2 liter 40%-os szirup vegyítése',
        category: 'cat-mix'
      },
      {
        id: 's7',
        label: 'Két különböző töménységű savoldat összevegyítése',
        category: 'cat-mix'
      },
      {
        id: 's8',
        label: '300 g 14 karátos és 200 g 18 karátos arany egybeolvasztása',
        category: 'cat-mix'
      },
      {
        id: 's9',
        label: '100 g tiszta kristálycukor feloldása a teában',
        category: 'cat-conc'
      },
      {
        id: 's10',
        label: '500 g sós vízből 150 g víz elpárologtatása főzéssel',
        category: 'cat-conc'
      },
      {
        id: 's11',
        label: 'Tiszta tengeri só (p = 100%) szórása az oldatba',
        category: 'cat-conc'
      },
      {
        id: 's12',
        label: 'Víz elforralása: a só a lábasban marad, töménysége nő',
        category: 'cat-conc'
      }
    ]
  },
  2: {
    title: '2. Szint: Anyagok Töménysége és Komponensei',
    subtitle: 'Kategorizáld az anyagokat töménységük szerint: 0%, 100% vagy oldat/ötvözet!',
    categories: [
      {
        id: 'cat-zero',
        name: '0% Töménység (Oldószer)',
        description: 'Egyáltalán nem tartalmaz oldott anyagot vagy nemesfémet',
        badgeColor: 'bg-sky-100 text-sky-800 border-sky-300'
      },
      {
        id: 'cat-full',
        name: '100% Töménység (Tiszta anyag)',
        description: 'Kizárólag tiszta oldott anyag vagy 24 karátos színfém',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      },
      {
        id: 'cat-solution',
        name: '0% < p < 100% (Oldat vagy Ötvözet)',
        description: 'Több komponensből álló valóságos keverék',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      }
    ],
    items: [
      {
        id: 's13',
        label: 'Csapvíz / kútvíz a keverési feladatokban',
        category: 'cat-zero'
      },
      {
        id: 's14',
        label: 'Desztillált víz hozzáadása akkumulátorhoz',
        category: 'cat-zero'
      },
      {
        id: 's15',
        label: 'Elpárolgó vízgőz sótartalma (tiszta gőz)',
        category: 'cat-zero'
      },
      {
        id: 's16',
        label: 'Hígító folyadék nulla gramm oldott sóval',
        category: 'cat-zero'
      },
      {
        id: 's17',
        label: 'Tiszta száraz kristályos konyhasó (NaCl)',
        category: 'cat-full'
      },
      {
        id: 's18',
        label: '24 karátos színarany tömb (999,9‰)',
        category: 'cat-full'
      },
      {
        id: 's19',
        label: '100%-os tisztaságú finomított kristálycukor',
        category: 'cat-full'
      },
      {
        id: 's20',
        label: 'Tiszta réz adalék aranyötvözethez',
        category: 'cat-full'
      },
      {
        id: 's21',
        label: '10%-os konyhasóoldat a fazékban',
        category: 'cat-solution'
      },
      {
        id: 's22',
        label: '14 karátos arany gyűrű (58,3% arany)',
        category: 'cat-solution'
      },
      {
        id: 's23',
        label: '20%-os ecet a konyhaszekrényből',
        category: 'cat-solution'
      },
      {
        id: 's24',
        label: '70%-os gyógyszertári fertőtlenítő alkohol',
        category: 'cat-solution'
      }
    ]
  },
  3: {
    title: '3. Szint: Matematikai Modell Egyenletek',
    subtitle: 'Rendszerezd az egyenleteket a keverési modell típusa szerint!',
    categories: [
      {
        id: 'cat-eq-mix',
        name: 'Két oldat keverési egyenlete',
        description: 'm₁·p₁ + m₂·p₂ = (m₁ + m₂)·p_ö',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      {
        id: 'cat-eq-water',
        name: 'Hígítás & Elpárologtatás egyenlet',
        description: 'Víz adása (0%) vagy víz elpárolgása (m - v)',
        badgeColor: 'bg-sky-100 text-sky-800 border-sky-300'
      },
      {
        id: 'cat-eq-alloy',
        name: 'Karát- és Nemesfém modell',
        description: '24-ed részek vagy közvetlen karátösszeg',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      }
    ],
    items: [
      {
        id: 's25',
        label: 'm₁ · p₁ + m₂ · p₂ = (m₁ + m₂) · p_keverék',
        category: 'cat-eq-mix'
      },
      {
        id: 's26',
        label: '15x + 40(50 - x) = 50 · 30',
        category: 'cat-eq-mix'
      },
      {
        id: 's27',
        label: '200 · 10 + 300 · 35 = 500 · p_közös',
        category: 'cat-eq-mix'
      },
      {
        id: 's28',
        label: 'Összes oldott só = első edény sója + második edény sója',
        category: 'cat-eq-mix'
      },
      {
        id: 's29',
        label: 'm₁ · p₁ + m_víz · 0 = (m₁ + m_víz) · p_híg',
        category: 'cat-eq-water'
      },
      {
        id: 's30',
        label: 'm₁ · p₁ = (m₁ - m_elpárolgott) · p_új',
        category: 'cat-eq-water'
      },
      {
        id: 's31',
        label: '4 · 25 + 0 = (4 + y) · 10',
        category: 'cat-eq-water'
      },
      {
        id: 's32',
        label: '600 · 10 = (600 - v) · 15',
        category: 'cat-eq-water'
      },
      {
        id: 's33',
        label: 'm₁ · K₁ + m₂ · K₂ = (m₁ + m₂) · K_új',
        category: 'cat-eq-alloy'
      },
      {
        id: 's34',
        label: '300 · 14 + y · 18 = (300 + y) · 15',
        category: 'cat-eq-alloy'
      },
      {
        id: 's35',
        label: 'Tiszta arany tömege = össztömeg · (karát / 24)',
        category: 'cat-eq-alloy'
      },
      {
        id: 's36',
        label: '200 g 18 karátosban: 200 · (18 / 24) = 150 g színarany',
        category: 'cat-eq-alloy'
      }
    ]
  }
};

export const MixingWordProblemsSorter: React.FC<MixingWordProblemsSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-eq-mixing-sorter',
  topicTitle = 'Keverési Feladatok Csoportosító'
}) => {
  return (
    <SorterTemplate
      level={level}
      title="Keverési Feladatok Csoportosító"
      subtitle="Kategorizáld a keverési folyamatokat, töménységeket és egyenlettípusokat!"
      badge="CSOPORTOSÍTÓ JÁTÉK"
      themeColor="teal"
      topicId={topicId}
      topicTitle={topicTitle}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default MixingWordProblemsSorter;
