import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ReflectionAppSorterProps {
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
    title: '1. Szint: Nevezetes vonalak és szakaszok a háromszögben',
    subtitle: 'Döntsd el, hogy az adott tulajdonság a középvonalra, súlyvonalra vagy magasságvonalra vonatkozik!',
    categories: [
      {
        id: 'cat-midline',
        name: 'Középvonal (k)',
        description: 'Két oldal felezőpontját köti össze, párhuzamos a 3. oldallal és fele akkora',
        badgeColor: 'bg-sky-100 text-sky-800 border-sky-300'
      },
      {
        id: 'cat-median',
        name: 'Súlyvonal (s)',
        description: 'Csúcsot a szemközti oldal felezőpontjával köti össze, felezi a területet',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-altitude',
        name: 'Magasságvonal (m)',
        description: 'Csúcsból a szemközti oldal egyenesére bocsátott merőleges szakasz',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      {
        id: 's1',
        label: 'Két oldal felezőpontját köti össze',
        category: 'cat-midline',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="10,24 50,24 30,4" fill="none" stroke="#94a3b8" strokeWidth="1" />
            <line x1="20" y1="14" x2="40" y2="14" stroke="#0284c7" strokeWidth="2" />
            <circle cx="20" cy="14" r="2" fill="#0284c7" />
            <circle cx="40" cy="14" r="2" fill="#0284c7" />
          </svg>
        )
      },
      {
        id: 's2',
        label: 'Csúcsból indul és a szemközti oldal felezőpontjába tart',
        category: 'cat-median',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="10,24 50,24 35,4" fill="none" stroke="#94a3b8" strokeWidth="1" />
            <line x1="35" y1="4" x2="30" y2="24" stroke="#f59e0b" strokeWidth="1.8" />
            <circle cx="30" cy="24" r="2" fill="#f59e0b" />
          </svg>
        )
      },
      {
        id: 's3',
        label: 'Csúcsból a szemközti oldalra bocsátott merőleges',
        category: 'cat-altitude',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="10,24 50,24 30,4" fill="none" stroke="#94a3b8" strokeWidth="1" />
            <line x1="30" y1="4" x2="30" y2="24" stroke="#a855f7" strokeWidth="1.8" />
            <rect x="30" y="20" width="3" height="4" fill="none" stroke="#a855f7" strokeWidth="0.8" />
          </svg>
        )
      },
      {
        id: 's4',
        label: 'Párhuzamos a 3. oldallal és hossza annak fele',
        category: 'cat-midline',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="16" y1="10" x2="44" y2="10" stroke="#0284c7" strokeWidth="1.8" />
            <line x1="8" y1="20" x2="52" y2="20" stroke="#0284c7" strokeWidth="1.8" />
            <text x="24" y="8" className="text-[6px] font-bold fill-sky-700">k = c/2</text>
          </svg>
        )
      },
      {
        id: 's5',
        label: 'Felezi a háromszög területét',
        category: 'cat-median',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="10,24 50,24 30,4" fill="none" stroke="#94a3b8" strokeWidth="1" />
            <line x1="30" y1="4" x2="30" y2="24" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="16" y="18" className="text-[6px] font-bold fill-amber-700">T/2</text>
            <text x="36" y="18" className="text-[6px] font-bold fill-amber-700">T/2</text>
          </svg>
        )
      },
      {
        id: 's6',
        label: 'Metszéspontjuk a magasságpont (M)',
        category: 'cat-altitude',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="3" fill="#a855f7" />
            <text x="27" y="24" className="text-[7px] font-bold fill-purple-700">M</text>
          </svg>
        )
      },
      {
        id: 's7',
        label: 'Metszéspontja a súlypont (S), amely 2:1 arányban oszt',
        category: 'cat-median',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="15" y1="6" x2="45" y2="22" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="35" cy="16.5" r="2.5" fill="#f59e0b" />
            <text x="38" y="14" className="text-[6px] font-bold fill-amber-700">S (2:1)</text>
          </svg>
        )
      },
      {
        id: 's8',
        label: '4 darab egybevágó kis háromszögre bontja a síkidomot',
        category: 'cat-midline',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="10,24 50,24 30,4" fill="none" stroke="#94a3b8" strokeWidth="1" />
            <polygon points="20,14 40,14 30,24" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 's9',
        label: 'Merőleges az oldalra, de nem felezi azt szükségképpen',
        category: 'cat-altitude',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="10" y1="20" x2="50" y2="20" stroke="#94a3b8" strokeWidth="1.2" />
            <line x1="38" y1="5" x2="38" y2="24" stroke="#a855f7" strokeWidth="1.8" />
            <rect x="38" y="16" width="4" height="4" fill="none" stroke="#a855f7" strokeWidth="0.8" />
          </svg>
        )
      },
      {
        id: 's10',
        label: 'Hossza k = c / 2',
        category: 'cat-midline',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <text x="14" y="17" className="text-[9px] font-mono font-bold fill-sky-700">k = c/2</text>
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Négyszögek Átlótulajdonságai és Szimmetriája',
    subtitle: 'Sorold be a tulajdonságokat aszerint, hogy mely négyszögekre érvényesek!',
    categories: [
      {
        id: 'cat-parallelogram-family',
        name: 'Minden paralelogrammára igaz',
        description: 'Általános alaptulajdonság (téglalapra, rombuszra és négyzetre is)',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-rhombus-square',
        name: 'Csak rombuszra és négyzetre igaz',
        description: 'Egyenlő oldalú négyszögek sajátos átlóviselkedése',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-rect-square',
        name: 'Csak téglalapra és négyzetre igaz',
        description: 'Derékszögű négyszögek sajátos átlóviselkedése',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      }
    ],
    items: [
      {
        id: 's11',
        label: 'Átlók kölcsönösen felezik egymást az O pontban',
        category: 'cat-parallelogram-family',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="10" y1="20" x2="50" y2="8" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <line x1="20" y1="8" x2="40" y2="20" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <circle cx="30" cy="14" r="2.5" fill="#f59e0b" />
          </svg>
        )
      },
      {
        id: 's12',
        label: 'Az átlók metszéspontja szimmetriaközéppont',
        category: 'cat-parallelogram-family',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="3.5" fill="#0284c7" />
            <text x="27" y="24" className="text-[7px] font-bold fill-sky-800">O</text>
          </svg>
        )
      },
      {
        id: 's13',
        label: 'Az átlók merőlegesek egymásra: e ⊥ f',
        category: 'cat-rhombus-square',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="30" y1="4" x2="30" y2="24" stroke="#16a34a" strokeWidth="1.8" />
            <line x1="15" y1="14" x2="45" y2="14" stroke="#16a34a" strokeWidth="1.8" />
            <rect x="30" y="11" width="3" height="3" fill="none" stroke="#16a34a" strokeWidth="0.8" />
          </svg>
        )
      },
      {
        id: 's14',
        label: 'Az átlók egyenlő hosszúak: |e| = |f|',
        category: 'cat-rect-square',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <rect x="15" y="7" width="30" height="14" fill="none" stroke="#6366f1" strokeWidth="1.2" />
            <line x1="15" y1="7" x2="45" y2="21" stroke="#6366f1" strokeWidth="1" />
            <line x1="15" y1="21" x2="45" y2="7" stroke="#6366f1" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 's15',
        label: 'Szemközti oldalak párhuzamosak és egyenlő hosszúak',
        category: 'cat-parallelogram-family',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="15" y1="8" x2="45" y2="8" stroke="#0284c7" strokeWidth="1.8" />
            <line x1="10" y1="20" x2="40" y2="20" stroke="#0284c7" strokeWidth="1.8" />
            <text x="47" y="15" className="text-[7px] font-bold fill-sky-700">∥</text>
          </svg>
        )
      },
      {
        id: 's16',
        label: 'Az átlók belső szögfelezők is egyben',
        category: 'cat-rhombus-square',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,4 48,14 30,24 12,14" fill="none" stroke="#16a34a" strokeWidth="1.2" />
            <line x1="12" y1="14" x2="48" y2="14" stroke="#16a34a" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 's17',
        label: 'Minden belső szöge pontosan 90 fok',
        category: 'cat-rect-square',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <rect x="18" y="6" width="24" height="16" fill="none" stroke="#6366f1" strokeWidth="1.5" />
            <text x="23" y="17" className="text-[7px] font-bold fill-indigo-700">90°</text>
          </svg>
        )
      },
      {
        id: 's18',
        label: 'Mind a 4 oldala egyenlő hosszú',
        category: 'cat-rhombus-square',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="30,5 45,14 30,23 15,14" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
            <text x="24" y="16" className="text-[6.5px] font-bold fill-emerald-700">a = b</text>
          </svg>
        )
      },
      {
        id: 's19',
        label: 'Bármely két szomszédos szög összege 180 fok',
        category: 'cat-parallelogram-family',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <text x="8" y="17" className="text-[7px] font-mono font-bold fill-blue-700">α + β = 180°</text>
          </svg>
        )
      },
      {
        id: 's20',
        label: 'Köré írható kör középpontja az átlók metszéspontja',
        category: 'cat-rect-square',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="11" fill="none" stroke="#6366f1" strokeWidth="1" />
            <rect x="22" y="8" width="16" height="12" fill="none" stroke="#6366f1" strokeWidth="1.2" />
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Állítások Értékelése a Középvonalról és Tükrözésről',
    subtitle: 'Döntsd el az állításokról, hogy mindig, csak feltétellel vagy sohasem igazak!',
    categories: [
      {
        id: 'cat-always-true',
        name: 'Mindig igaz (Tétel)',
        description: 'Minden esetben, általánosan érvényes matematikai tétel',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-conditional',
        name: 'Csak speciális alakzatokra igaz',
        description: 'Kizárólag bizonyos típusú háromszögekre vagy négyszögekre teljesül',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      },
      {
        id: 'cat-never-true',
        name: 'Sohasem igaz (Tévedés)',
        description: 'Matematikailag hamis állítás',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      {
        id: 's21',
        label: 'A háromszög középvonala párhuzamos a szemközti oldallal',
        category: 'cat-always-true',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="12" y1="10" x2="48" y2="10" stroke="#10b981" strokeWidth="2" />
            <line x1="8" y1="20" x2="52" y2="20" stroke="#10b981" strokeWidth="2" />
            <text x="44" y="16" className="text-[7px] font-bold fill-emerald-600">∥</text>
          </svg>
        )
      },
      {
        id: 's22',
        label: 'A középvonal hossza megegyezik a szemközti oldal hosszával',
        category: 'cat-never-true',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="15" y1="14" x2="45" y2="14" stroke="#f43f5e" strokeWidth="1.8" />
            <line x1="20" y1="6" x2="40" y2="22" stroke="#e11d48" strokeWidth="2" />
            <line x1="20" y1="22" x2="40" y2="6" stroke="#e11d48" strokeWidth="2" />
          </svg>
        )
      },
      {
        id: 's23',
        label: 'A középvonal hossza a szemközti oldal felével egyenlő',
        category: 'cat-always-true',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="18" y1="10" x2="42" y2="10" stroke="#10b981" strokeWidth="2" />
            <line x1="10" y1="20" x2="50" y2="20" stroke="#10b981" strokeWidth="2" />
            <text x="24" y="8" className="text-[6.5px] font-bold fill-emerald-700">k = c/2</text>
          </svg>
        )
      },
      {
        id: 's24',
        label: 'A középvonal merőleges az alapra',
        category: 'cat-conditional',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <line x1="15" y1="14" x2="45" y2="14" stroke="#f59e0b" strokeWidth="1.5" />
            <rect x="28" y="11" width="3" height="3" fill="none" stroke="#f59e0b" strokeWidth="0.8" />
            <text x="12" y="24" className="text-[6px] font-bold fill-amber-700">Csak derékszögűnél</text>
          </svg>
        )
      },
      {
        id: 's25',
        label: 'A trapéz középvonala k = (a + c) / 2',
        category: 'cat-always-true',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="10,24 50,24 40,8 20,8" fill="none" stroke="#10b981" strokeWidth="1.2" />
            <line x1="15" y1="16" x2="45" y2="16" stroke="#10b981" strokeWidth="1.8" />
          </svg>
        )
      },
      {
        id: 's26',
        label: 'A deltoid átlói kölcsönösen felezik egymást',
        category: 'cat-never-true',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="15,14 30,5 50,14 30,23" fill="none" stroke="#94a3b8" strokeWidth="1" />
            <line x1="20" y1="5" x2="40" y2="23" stroke="#e11d48" strokeWidth="2" />
            <line x1="20" y1="23" x2="40" y2="5" stroke="#e11d48" strokeWidth="2" />
          </svg>
        )
      },
      {
        id: 's27',
        label: 'Ha egy négyszög átlói felezik egymást, az paralelogramma',
        category: 'cat-always-true',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="15,22 25,8 50,8 40,22" fill="#d1fae5" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="32.5" cy="15" r="2" fill="#f59e0b" />
          </svg>
        )
      },
      {
        id: 's28',
        label: 'A középvonalak által határolt háromszög területe T / 4',
        category: 'cat-always-true',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <polygon points="10,24 50,24 30,4" fill="none" stroke="#94a3b8" strokeWidth="1" />
            <polygon points="20,14 40,14 30,24" fill="#a7f3d0" stroke="#10b981" strokeWidth="1.2" />
            <text x="24" y="20" className="text-[6.5px] font-bold fill-emerald-800">T / 4</text>
          </svg>
        )
      },
      {
        id: 's29',
        label: 'A háromszög három középvonala egyetlen közös pontban metszi egymást',
        category: 'cat-never-true',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <circle cx="30" cy="14" r="3" fill="#f43f5e" />
            <line x1="18" y1="6" x2="42" y2="22" stroke="#e11d48" strokeWidth="2" />
            <line x1="18" y1="22" x2="42" y2="6" stroke="#e11d48" strokeWidth="2" />
          </svg>
        )
      },
      {
        id: 's30',
        label: 'Az átlók egyenlő hosszúak egy paralelogrammában',
        category: 'cat-conditional',
        figure: (
          <svg viewBox="0 0 60 28" className="w-14 h-7 mx-auto">
            <rect x="18" y="7" width="24" height="14" fill="none" stroke="#f59e0b" strokeWidth="1.2" />
            <text x="14" y="26" className="text-[6px] font-bold fill-amber-700">Csak téglalapnál</text>
          </svg>
        )
      }
    ]
  }
};

export const ReflectionAppSorter: React.FC<ReflectionAppSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-geom-reflection-app',
  topicTitle = '6. A középpontos tükrözés alkalmazása'
}) => {
  return (
    <SorterTemplate
      level={level}
      grade={7}
      chapterId="g7-geom-trans"
      topicId={topicId}
      topicTitle={topicTitle}
      title="Középpontos Tükrözés Alkalmazásai Csoportosító"
      subtitle="Válaszd ki a kártyát, és sorold be a megfelelő geometriai kategóriába!"
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
    />
  );
};

export default ReflectionAppSorter;
