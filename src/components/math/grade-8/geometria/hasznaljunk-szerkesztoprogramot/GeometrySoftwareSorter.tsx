import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface GeometrySoftwareSorterProps {
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
    title: '1. Szint: Objektumtípusok a Dinamikus Geometriában',
    subtitle: 'Sorold be az alakzatokat és elemeket a szabad, függő vagy pályához kötött kategóriába!',
    categories: [
      {
        id: 'cat-free',
        name: 'Szabad pont / objektum',
        description: 'Bárhová önállóan elmozdítható a síkban, nem függ más alakzattól',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-bound',
        name: 'Függő / Kötött objektum',
        description: 'Szerkesztési szabály (metszet, felező, merőleges) által teljesen meghatározott',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300'
      },
      {
        id: 'cat-path',
        name: 'Pályához kötött pont',
        description: 'Egy vonalon, egyenesen vagy kör kerületén csúsztatható, 1 szabadsági fokú',
        badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300'
      }
    ],
    items: [
      {
        id: 's1',
        label: 'Új háromszög kezdő A, B, C csúcsai',
        category: 'cat-free',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="15,22 55,22 35,6" fill="none" className="stroke-blue-400 stroke-[1.5]" />
            <circle cx="15" cy="22" r="2.5" className="fill-blue-600" />
            <circle cx="55" cy="22" r="2.5" className="fill-blue-600" />
            <circle cx="35" cy="6" r="2.5" className="fill-blue-600" />
          </svg>
        )
      },
      {
        id: 's2',
        label: 'Tetszőleges szakasz két végpontja',
        category: 'cat-free',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="15" y1="15" x2="55" y2="15" className="stroke-blue-400 stroke-[2]" />
            <circle cx="15" cy="15" r="3" className="fill-blue-600" />
            <circle cx="55" cy="15" r="3" className="fill-blue-600" />
          </svg>
        )
      },
      {
        id: 's3',
        label: 'Szabadon elhelyezett kör középpontja',
        category: 'cat-free',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="10" fill="none" className="stroke-blue-300 stroke-[1.5]" />
            <circle cx="35" cy="15" r="3.5" className="fill-blue-600" />
          </svg>
        )
      },
      {
        id: 's4',
        label: 'Két szakasz vagy egyenes metszéspontja',
        category: 'cat-bound',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="12" y1="24" x2="58" y2="6" className="stroke-slate-400 stroke-[1.5]" />
            <line x1="12" y1="6" x2="58" y2="24" className="stroke-slate-400 stroke-[1.5]" />
            <circle cx="35" cy="15" r="3.5" className="fill-slate-700" />
          </svg>
        )
      },
      {
        id: 's5',
        label: 'Szakasz felezőpontja',
        category: 'cat-bound',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="15" y1="15" x2="55" y2="15" className="stroke-slate-400 stroke-[1.8]" />
            <circle cx="35" cy="15" r="3" className="fill-slate-700" />
          </svg>
        )
      },
      {
        id: 's6',
        label: 'Háromszög súlypontja (súlyvonalak metszéspontja)',
        category: 'cat-bound',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="15,24 55,24 35,6" fill="none" className="stroke-slate-400 stroke-[1.2]" />
            <line x1="35" y1="6" x2="35" y2="24" className="stroke-slate-300 stroke-[1]" />
            <circle cx="35" cy="18" r="3" className="fill-slate-700" />
          </svg>
        )
      },
      {
        id: 's7',
        label: 'Kör kerületére helyezett mozgó P pont',
        category: 'cat-path',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="11" fill="none" className="stroke-cyan-500 stroke-[1.5]" />
            <circle cx="46" cy="15" r="3" className="fill-cyan-700" />
            <path d="M 46 10 L 46 8 M 46 20 L 46 22" className="stroke-cyan-600 stroke-[1]" />
          </svg>
        )
      },
      {
        id: 's8',
        label: 'Adott egyenesre illesztett, azon csúszó pont',
        category: 'cat-path',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="15" x2="60" y2="15" className="stroke-cyan-600 stroke-[1.5]" />
            <circle cx="35" cy="15" r="3" className="fill-cyan-700" />
            <path d="M 28 15 L 24 15 M 42 15 L 46 15" className="stroke-cyan-700 stroke-[1.2]" />
          </svg>
        )
      },
      {
        id: 's9',
        label: 'Numerikus csúszka (Slider) mozgatható gombja',
        category: 'cat-path',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="15" y1="15" x2="55" y2="15" className="stroke-slate-300 stroke-[2.5] stroke-linecap-round" />
            <circle cx="32" cy="15" r="4" className="fill-cyan-600 stroke-white stroke-[1]" />
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Eszközök Geometriai Szerepe és Típusa',
    subtitle: 'Csoportosítsd a szoftvereszközöket feladatuk és matematikai hatásuk szerint!',
    categories: [
      {
        id: 'cat-locus',
        name: 'Mértani hely szerkesztő',
        description: 'Adott távolsági vagy szögbeli feltételeket teljesítő ponthalmazt ad meg',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-transform',
        name: 'Transzformációs eszköz',
        description: 'Egybevágóságot vagy hasonlóságot hoz létre (tükrözés, eltolás, forgatás)',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-measure',
        name: 'Mérő és ellenőrző eszköz',
        description: 'Numerikus értékeket (hossz, szög, terület) számol és mutat ki dinamikusan',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      }
    ],
    items: [
      {
        id: 's10',
        label: 'Szakaszfelező merőleges egyenes eszköz',
        category: 'cat-locus',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="15" y1="15" x2="55" y2="15" className="stroke-emerald-600 stroke-[1.8]" />
            <line x1="35" y1="4" x2="35" y2="26" className="stroke-emerald-500 stroke-[1.5] stroke-dasharray-[2,2]" />
          </svg>
        )
      },
      {
        id: 's11',
        label: 'Szögfelező egyenes eszköz',
        category: 'cat-locus',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="15" y1="24" x2="55" y2="24" className="stroke-emerald-600 stroke-[1.5]" />
            <line x1="15" y1="24" x2="48" y2="6" className="stroke-emerald-600 stroke-[1.5]" />
            <line x1="15" y1="24" x2="55" y2="15" className="stroke-emerald-500 stroke-[1.5]" />
          </svg>
        )
      },
      {
        id: 's12',
        label: 'Kör adott középponttal és sugárral',
        category: 'cat-locus',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="11" fill="none" className="stroke-emerald-600 stroke-[1.5]" />
            <circle cx="35" cy="15" r="2.5" className="fill-emerald-700" />
          </svg>
        )
      },
      {
        id: 's13',
        label: 'Tengelyes tükrözés egyenesre',
        category: 'cat-transform',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="35" y1="3" x2="35" y2="27" className="stroke-slate-400 stroke-[1.2]" />
            <polygon points="18,22 30,22 24,10" fill="#6366f1" fillOpacity="0.2" className="stroke-indigo-600 stroke-[1.2]" />
            <polygon points="52,22 40,22 46,10" fill="#6366f1" fillOpacity="0.2" className="stroke-indigo-600 stroke-[1.2]" />
          </svg>
        )
      },
      {
        id: 's14',
        label: 'Párhuzamos eltolás vektorral',
        category: 'cat-transform',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="20" cy="15" r="5" fill="none" className="stroke-indigo-500 stroke-[1.5]" />
            <circle cx="50" cy="15" r="5" fill="none" className="stroke-indigo-600 stroke-[1.5]" />
            <line x1="26" y1="15" x2="43" y2="15" className="stroke-indigo-700 stroke-[1.5]" />
            <polygon points="45,15 40,12 40,18" className="fill-indigo-700" />
          </svg>
        )
      },
      {
        id: 's15',
        label: 'Középpontos forgatás adott α szöggel',
        category: 'cat-transform',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="25" cy="18" r="2.5" className="fill-indigo-800" />
            <circle cx="45" cy="8" r="2.5" className="fill-indigo-600" />
            <path d="M 45 18 A 20 20 0 0 0 42 10" fill="none" className="stroke-indigo-500 stroke-[1.5]" />
          </svg>
        )
      },
      {
        id: 's16',
        label: 'Szögmérő eszköz (3 pont kijelölése)',
        category: 'cat-measure',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <path d="M 22 22 L 48 22 M 22 22 L 40 8" className="stroke-amber-600 stroke-[1.5]" />
            <path d="M 32 22 A 10 10 0 0 0 30 16" fill="none" className="stroke-amber-600 stroke-[1.5]" />
            <text x="36" y="19" className="text-[7px] font-bold fill-amber-800">54°</text>
          </svg>
        )
      },
      {
        id: 's17',
        label: 'Távolság- vagy hosszúságmérő eszköz',
        category: 'cat-measure',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="15" y1="15" x2="55" y2="15" className="stroke-amber-500 stroke-[2]" />
            <text x="26" y="11" className="text-[7px] font-bold fill-amber-800">d = 6.4 cm</text>
          </svg>
        )
      },
      {
        id: 's18',
        label: 'Területmérő eszköz (alakzatra kattintva)',
        category: 'cat-measure',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="18,24 52,24 35,6" fill="#fef3c7" className="stroke-amber-500 stroke-[1.5]" />
            <text x="24" y="20" className="text-[6px] font-bold fill-amber-900">{"T = 24.5 cm²"}</text>
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Vonszolási Viselkedés és Konstrukciós Stabilitás',
    subtitle: 'Különböztesd meg a robusztus szerkesztést, a hibás szemre rajzot és az invariáns tulajdonságot!',
    categories: [
      {
        id: 'cat-stable',
        name: 'Robusztus szerkesztés',
        description: 'Vonszoláskor a definiált geometriai tulajdonság mindig szigorúan megmarad',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
      },
      {
        id: 'cat-unstable',
        name: 'Széteső "szemre rajz"',
        description: 'Nincsenek matematikai relációk; a csúcs elmozdításakor azonnal megszűnik a tulajdonság',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      },
      {
        id: 'cat-invariant',
        name: 'Geometriai Invariáns',
        description: 'Bármilyen alakúra deformáljuk az alakzatot, e tétel vagy mennyiség értéke állandó',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      }
    ],
    items: [
      {
        id: 's19',
        label: 'Thalész-körrel és annak pontjával készített derékszögű háromszög',
        category: 'cat-stable',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <path d="M 15 22 A 20 20 0 0 1 55 22" fill="none" className="stroke-teal-600 stroke-[1.2]" />
            <polygon points="15,22 55,22 30,5" fill="#14b8a6" fillOpacity="0.15" className="stroke-teal-700 stroke-[1.5]" />
            <path d="M 27 7 L 31 10 L 33 6" fill="none" className="stroke-teal-800 stroke-[1]" />
          </svg>
        )
      },
      {
        id: 's20',
        label: 'Szabályos háromszög két azonos sugarú kör metszéspontjával',
        category: 'cat-stable',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="20,24 50,24 35,6" fill="#14b8a6" fillOpacity="0.2" className="stroke-teal-600 stroke-[1.5]" />
            <circle cx="20" cy="24" r="18" fill="none" className="stroke-teal-400 stroke-[1] stroke-dasharray-[1,2]" />
          </svg>
        )
      },
      {
        id: 's21',
        label: 'Kör érintője sugárra szerkesztett merőleges egyenessel',
        category: 'cat-stable',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="28" cy="15" r="10" fill="none" className="stroke-teal-600 stroke-[1.5]" />
            <line x1="38" y1="2" x2="38" y2="28" className="stroke-teal-700 stroke-[1.8]" />
          </svg>
        )
      },
      {
        id: 's22',
        label: '"Derékszögű háromszög", ahol a 90°-ot csak szemre igazítottuk be',
        category: 'cat-unstable',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="15,22 55,22 28,8" fill="#f43f5e" fillOpacity="0.15" className="stroke-rose-500 stroke-[1.5] stroke-dasharray-[2,2]" />
            <text x="32" y="11" className="text-[6px] font-bold fill-rose-700">≠ 90°</text>
          </svg>
        )
      },
      {
        id: 's23',
        label: '"Szabályos háromszög" a harmadik csúcsot saccra egyenlő oldalúnak látva',
        category: 'cat-unstable',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="15,22 55,22 34,7" fill="#f43f5e" fillOpacity="0.1" className="stroke-rose-500 stroke-[1.5] stroke-dasharray-[2,2]" />
            <text x="24" y="27" className="text-[6px] font-bold fill-rose-700">a ≠ b ≠ c</text>
          </svg>
        )
      },
      {
        id: 's24',
        label: '"Körérintő" egyenest szemre a kör mellé húzva metszetnélkül',
        category: 'cat-unstable',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="28" cy="15" r="10" fill="none" className="stroke-slate-400 stroke-[1.2]" />
            <line x1="42" y1="3" x2="36" y2="27" className="stroke-rose-500 stroke-[1.5] stroke-dasharray-[2,2]" />
            <text x="44" y="18" className="text-[6px] font-bold fill-rose-700">metsz/elkerül</text>
          </svg>
        )
      },
      {
        id: 's25',
        label: 'Bármely háromszög belső szögeinek összege (mindig 180°)',
        category: 'cat-invariant',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <rect x="12" y="6" width="46" height="18" rx="4" fill="#faf5ff" className="stroke-purple-400 stroke-[1.2]" />
            <text x="16" y="17" className="text-[7px] font-bold fill-purple-800">{"α+β+γ = 180°"}</text>
          </svg>
        )
      },
      {
        id: 's26',
        label: 'A 3 oldalfelező merőleges mindig egyetlen pontban metszi egymást',
        category: 'cat-invariant',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="16,24 54,24 35,6" fill="none" className="stroke-purple-300 stroke-[1]" />
            <circle cx="35" cy="16" r="3" className="fill-purple-700" />
            <text x="40" y="17" className="text-[6px] font-bold fill-purple-900">O létezik</text>
          </svg>
        )
      },
      {
        id: 's27',
        label: 'A háromszög súlypontja a súlyvonalakat 2:1 arányban osztja',
        category: 'cat-invariant',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="15" y1="22" x2="55" y2="8" className="stroke-purple-500 stroke-[1.5]" />
            <circle cx="41.6" cy="12.7" r="2.5" className="fill-purple-800" />
            <text x="25" y="13" className="text-[6px] font-bold fill-purple-800">2 : 1</text>
          </svg>
        )
      }
    ]
  }
};

export const GeometrySoftwareSorter: React.FC<GeometrySoftwareSorterProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId,
  topicTitle
}) => {
  return (
    <SorterTemplate
      level={level}
      title="Szerkesztőprogram csoportosító játék"
      subtitle="Kategorizáld az elemeket és műveleteket objektumtípusuk, céljuk és stabilitásuk szerint!"
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId || 'g8-geom-software'}
      topicTitle={topicTitle || 'Használjunk szerkesztőprogramot!'}
      grade={8}
      chapterId="geometria"
    />
  );
};

export default GeometrySoftwareSorter;
