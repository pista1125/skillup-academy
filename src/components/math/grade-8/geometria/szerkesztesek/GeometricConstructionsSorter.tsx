import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface GeometricConstructionsSorterProps {
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
    title: '1. Szint: Szerkesztési Eljárások Típusa',
    subtitle: 'Sorold be a geometriai feladatokat a használt szerkesztési eljárás típusa szerint!',
    categories: [
      {
        id: 'cat-segment',
        name: 'Szakaszosztás & Arányos szakaszok',
        description: 'Szakasz arányos felosztása, negyedik és harmadik arányos szerkesztése',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-basic',
        name: 'Alapszerkesztések',
        description: 'Felezőmerőleges, szögfelező, merőleges és párhuzamos állítása',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-similar',
        name: 'Hasonlósági alakzatszerkesztés',
        description: 'Méretarányos háromszögek, nagyítás/kicsinyítés centrummal, kerületosztás',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      }
    ],
    items: [
      {
        id: 'gc-s1',
        label: 'Szakasz felosztása 3 : 4 arányban párhuzamos szelőkkel',
        category: 'cat-segment',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="20" x2="60" y2="20" stroke="#0284c7" strokeWidth="2" />
            <circle cx="31.4" cy="20" r="2.5" fill="#10b981" />
          </svg>
        )
      },
      {
        id: 'gc-s2',
        label: 'Szakaszfelező merőleges szerkesztése körzővel',
        category: 'cat-basic',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="15" x2="60" y2="15" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="35" y1="5" x2="35" y2="25" stroke="#10b981" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'gc-s3',
        label: 'Negyedik arányos szakasz szerkesztése: x = (b · c) / a',
        category: 'cat-segment',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[6px] font-bold fill-amber-700">a : b = c : x</text>
          </svg>
        )
      },
      {
        id: 'gc-s4',
        label: 'Szögfelező szerkesztése körívekkel a csúcsból',
        category: 'cat-basic',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <path d="M 15 22 L 55 22 M 15 22 L 45 8" fill="none" stroke="#64748b" strokeWidth="1.2" />
            <line x1="15" y1="22" x2="52" y2="14" stroke="#10b981" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'gc-s5',
        label: 'Háromszög 2-szeres nagyítása az egyik csúcsából mint centrumból',
        category: 'cat-similar',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="15,22 30,22 22,12" fill="none" stroke="#0284c7" strokeWidth="1" />
            <polygon points="15,22 45,22 30,2" fill="none" stroke="#10b981" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'gc-s6',
        label: 'Szakasz felosztása 3 egyenlő részre segédfélegyenessel',
        category: 'cat-segment',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="20" x2="60" y2="20" stroke="#0284c7" strokeWidth="1.5" />
            <circle cx="26.6" cy="20" r="2" fill="#10b981" />
            <circle cx="43.3" cy="20" r="2" fill="#10b981" />
          </svg>
        )
      },
      {
        id: 'gc-s7',
        label: 'Merőleges állítása egyenesre egy adott pontból',
        category: 'cat-basic',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="22" x2="60" y2="22" stroke="#64748b" strokeWidth="1.5" />
            <line x1="35" y1="8" x2="35" y2="22" stroke="#0284c7" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'gc-s8',
        label: 'Háromszög szerkesztése szögekből és kerületéből (arányos kerületosztás)',
        category: 'cat-similar',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="12,24 28,24 20,10" fill="none" stroke="#0284c7" strokeWidth="1" />
            <polygon points="36,26 62,26 49,6" fill="none" stroke="#10b981" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'gc-s9',
        label: 'Harmadik arányos szerkesztése: x = b² / a',
        category: 'cat-segment',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[6px] font-bold fill-amber-700">x = b² / a</text>
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Körosztások Száma a Segédfélegyenesen',
    subtitle: 'Hány egyenlő körosztást kell felmérni a segédfélegyenesre az adott osztáshoz?',
    categories: [
      {
        id: 'cat-few',
        name: '2 – 4 körosztás',
        description: 'Kis egységszámú felosztások (felezés, harmadolás, negyedelés)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-medium',
        name: '5 – 7 körosztás',
        description: 'Közepes összegű aránytagok (pl. 2:3, 3:4)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-many',
        name: '8 vagy több körosztás',
        description: 'Nagyobb egységszámú felosztások (pl. 3:5, 4:5, tizedelés)',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      {
        id: 'gc-s10',
        label: 'Szakasz felezése segédfélegyenessel (1 : 1 arány ⟹ 2 osztás)',
        category: 'cat-few',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-emerald-700">1 + 1 = 2</text>
          </svg>
        )
      },
      {
        id: 'gc-s11',
        label: 'Szakasz harmadolása (1 : 2 arány ⟹ 3 osztás)',
        category: 'cat-few',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-emerald-700">1 + 2 = 3</text>
          </svg>
        )
      },
      {
        id: 'gc-s12',
        label: 'Szakasz felosztása 1 : 3 arányban (1 + 3 = 4 osztás)',
        category: 'cat-few',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-emerald-700">1 + 3 = 4</text>
          </svg>
        )
      },
      {
        id: 'gc-s13',
        label: 'Szakasz felosztása 2 : 3 arányban (2 + 3 = 5 osztás)',
        category: 'cat-medium',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-amber-700">2 + 3 = 5</text>
          </svg>
        )
      },
      {
        id: 'gc-s14',
        label: 'Szakasz 6 egyenlő részre osztása (6 osztás)',
        category: 'cat-medium',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-amber-700">6 egység</text>
          </svg>
        )
      },
      {
        id: 'gc-s15',
        label: 'Szakasz felosztása 3 : 4 arányban (3 + 4 = 7 osztás)',
        category: 'cat-medium',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-amber-700">3 + 4 = 7</text>
          </svg>
        )
      },
      {
        id: 'gc-s16',
        label: 'Szakasz felosztása 3 : 5 arányban (3 + 5 = 8 osztás)',
        category: 'cat-many',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-purple-700">3 + 5 = 8</text>
          </svg>
        )
      },
      {
        id: 'gc-s17',
        label: 'Szakasz felosztása 4 : 5 arányban (4 + 5 = 9 osztás)',
        category: 'cat-many',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-purple-700">4 + 5 = 9</text>
          </svg>
        )
      },
      {
        id: 'gc-s18',
        label: 'Szakasz tizedelése (10 egyenlő részre bontás)',
        category: 'cat-many',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-purple-700">10 egység</text>
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Szabályos vagy Tilos Euklideszi Szerkesztésben?',
    subtitle: 'Válaszd szét a körzővel és vonalzóval szabályosan szerkeszthető és a tiltott eljárásokat!',
    categories: [
      {
        id: 'cat-valid',
        name: 'Szabályos euklideszi szerkesztés',
        description: 'Kizárólag körzővel és beosztás nélküli egyenes vonalzóval elvégezhető',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-invalid',
        name: 'Tilos / Nem szerkeszthető',
        description: 'Méréshez kötött, szögmérőt igényel, vagy elméletileg nem szerkeszthető',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      {
        id: 'gc-s19',
        label: 'Szakasz pontos harmadolása párhuzamos szelőkkel',
        category: 'cat-valid',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="20" x2="60" y2="20" stroke="#059669" strokeWidth="2" />
            <circle cx="26.6" cy="20" r="2" fill="#059669" />
            <circle cx="43.3" cy="20" r="2" fill="#059669" />
          </svg>
        )
      },
      {
        id: 'gc-s20',
        label: 'Szakasz lemérése milliméteres vonalzóval és elosztása 3-mal papíron',
        category: 'cat-invalid',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[6px] font-bold fill-rose-700">Mérés nem szerkesztés!</text>
          </svg>
        )
      },
      {
        id: 'gc-s21',
        label: 'Tetszőleges szög felezése körzővel és vonalzóval',
        category: 'cat-valid',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <path d="M 15 22 L 55 22 M 15 22 L 45 8" fill="none" stroke="#059669" strokeWidth="1.5" />
            <line x1="15" y1="22" x2="52" y2="14" stroke="#059669" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'gc-s22',
        label: 'Tetszőleges szög harmadolása általánosan körzővel és vonalzóval',
        category: 'cat-invalid',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[6px] font-bold fill-rose-700">Bizonyítottan lehetetlen!</text>
          </svg>
        )
      },
      {
        id: 'gc-s23',
        label: 'Negyedik arányos szerkesztése párhuzamos szelők tételével',
        category: 'cat-valid',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[6px] font-bold fill-emerald-700">a : b = c : x</text>
          </svg>
        )
      },
      {
        id: 'gc-s24',
        label: '40°-os szög kimérése műanyag iskolai szögmérővel',
        category: 'cat-invalid',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[6px] font-bold fill-rose-700">Szögmérő tiltott!</text>
          </svg>
        )
      },
      {
        id: 'gc-s25',
        label: 'Szabályos hatszög szerkesztése körbe a kör sugara alapján',
        category: 'cat-valid',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="35,5 55,10 55,20 35,25 15,20 15,10" fill="none" stroke="#059669" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 'gc-s26',
        label: 'Kör négyszögesítése kizárólag körzővel és vonalzóval',
        category: 'cat-invalid',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[6px] font-bold fill-rose-700">π transzcendens (lehetetlen)</text>
          </svg>
        )
      }
    ]
  }
};

export const GeometricConstructionsSorter: React.FC<GeometricConstructionsSorterProps> = ({
  level,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-geom-constructions',
  topicTitle = 'Szerkesztések'
}) => {
  return (
    <SorterTemplate
      level={level}
      levelsConfig={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      title="Szerkesztések Csoportosító"
      subtitle="Kategorizáld a szerkesztési eljárásokat és feladatokat!"
      badge="8. Osztály • Geometria"
      gameId="g8-geom-constructions-sorter"
    />
  );
};

export default GeometricConstructionsSorter;
