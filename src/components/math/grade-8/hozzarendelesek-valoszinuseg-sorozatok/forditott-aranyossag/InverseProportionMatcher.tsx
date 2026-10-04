import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface InverseProportionMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Alapfogalmak és Szorzat Állandósága',
    subtitle: 'Párosítsd a fordított arányosság fogalmait, képleteit és grafikonjának tulajdonságait!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Szorzat állandósága',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7px] font-black fill-blue-800" textAnchor="middle">x · y = k</text>
          </svg>
        ),
        value: 'Az összetartozó értékek szorzata állandó: x · y = k (k ≠ 0)'
      },
      {
        id: 'p2',
        prompt: 'Hozzárendelési szabály',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7px] font-black fill-indigo-800" textAnchor="middle">y = k / x</text>
          </svg>
        ),
        value: 'Függvényképlet: y = k / x (ahol x ≠ 0 és k konstans)'
      },
      {
        id: 'p3',
        prompt: 'Értelmezési tartomány',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7px] font-black fill-rose-800" textAnchor="middle">x ≠ 0</text>
          </svg>
        ),
        value: 'D = R \\ {0}, mert 0-val nem lehet osztani'
      },
      {
        id: 'p4',
        prompt: 'Grafikon formája',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <path d="M 6 22 Q 16 16 22 6" fill="none" stroke="#6366f1" strokeWidth="1.8" />
            <path d="M 32 22 Q 38 12 48 6" fill="none" stroke="#6366f1" strokeWidth="1.8" />
            <text x="27" y="24" className="text-[5.5px] font-bold fill-indigo-800" textAnchor="middle">Hiperbola</text>
          </svg>
        ),
        value: 'Két ágból álló szimmetrikus hiperbola görbe'
      },
      {
        id: 'p5',
        prompt: 'Ha k > 0 a konstans',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[6.5px] font-black fill-emerald-800" textAnchor="middle">I. és III. negyed</text>
          </svg>
        ),
        value: 'A hiperbola ágai az I. és a III. síknegyedben találhatók'
      },
      {
        id: 'p6',
        prompt: 'Ha k < 0 a konstans',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#fff1f2" stroke="#f43f5e" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[6.5px] font-black fill-rose-800" textAnchor="middle">II. és IV. negyed</text>
          </svg>
        ),
        value: 'A hiperbola ágai a II. és a IV. síknegyedben találhatók'
      },
      {
        id: 'p7',
        prompt: 'Aszimptoták',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="8" y1="14" x2="46" y2="14" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="27" y1="4" x2="27" y2="24" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
            <text x="27" y="24" className="text-[5.5px] font-bold fill-slate-600" textAnchor="middle">Tengelyek</text>
          </svg>
        ),
        value: 'Az x és y tengelyek: a görbe közeledik hozzájuk, de nem metszi őket'
      },
      {
        id: 'p8',
        prompt: 'Zérushely értéke',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#f8fafc" stroke="#64748b" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[6.5px] font-black fill-slate-700" textAnchor="middle">Nincs zérushely</text>
          </svg>
        ),
        value: 'Nincs zérushelye, mert a k / x tört sosem lehet egyenlő nullával'
      }
    ]
  },
  2: {
    title: '2. Szint: Számítások és Hiányzó Értékek',
    subtitle: 'Határozd meg a hiányzó értéket vagy a k állandó szorzatot az értékpárokból!',
    pairs: [
      {
        id: 'p9',
        prompt: 'x = 4 és y = 6 összetartozik',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7px] font-black fill-blue-800" textAnchor="middle">k = 4 · 6 = ?</text>
          </svg>
        ),
        value: 'Az arányossági szorzatérték: k = 24 (képlet: y = 24 / x)'
      },
      {
        id: 'p10',
        prompt: 'x · y = 36 és x = 9',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7px] font-black fill-blue-800" textAnchor="middle">y = 36 / 9</text>
          </svg>
        ),
        value: 'A keresett érték: y = 4 (mivel 9 · 4 = 36)'
      },
      {
        id: 'p11',
        prompt: 'x · y = 60 és y = 12',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7px] font-black fill-blue-800" textAnchor="middle">x = 60 / 12</text>
          </svg>
        ),
        value: 'A keresett érték: x = 5 (mivel 5 · 12 = 60)'
      },
      {
        id: 'p12',
        prompt: 'y = 48 / x és x = -6',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7px] font-black fill-rose-800" textAnchor="middle">48 / (-6)</text>
          </svg>
        ),
        value: 'A függvény értéke: y = -8 (a III. síknegyedbeli pont: (-6; -8))'
      },
      {
        id: 'p13',
        prompt: 'y = -20 / x és x = 4',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7px] font-black fill-rose-800" textAnchor="middle">-20 / 4</text>
          </svg>
        ),
        value: 'A függvény értéke: y = -5 (a IV. síknegyedbeli pont: (4; -5))'
      },
      {
        id: 'p14',
        prompt: 'x = 0,5 és y = 10',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7px] font-black fill-emerald-800" textAnchor="middle">0,5 · 10</text>
          </svg>
        ),
        value: 'Az állandó szorzat: k = 5 (képlet: y = 5 / x)'
      },
      {
        id: 'p15',
        prompt: 'y = 100 / x és x = 25',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7px] font-black fill-blue-800" textAnchor="middle">100 / 25</text>
          </svg>
        ),
        value: 'A keresett érték: y = 4 (mivel 25 · 4 = 100)'
      },
      {
        id: 'p16',
        prompt: 'x · y = 18 és x = -3',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7px] font-black fill-rose-800" textAnchor="middle">18 / (-3)</text>
          </svg>
        ),
        value: 'A keresett érték: y = -6 (mivel (-3) · (-6) = +18)'
      }
    ]
  },
  3: {
    title: '3. Szint: Munkamegosztás, Sebesség és Geometria',
    subtitle: 'Párosítsd a valós életbeli helyzeteket a megfelelő számítással és megoldással!',
    pairs: [
      {
        id: 'p17',
        prompt: '4 festő 6 óra alatt fest le egy kerítést',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[6.5px] font-black fill-indigo-800" textAnchor="middle">3 festő ideje?</text>
          </svg>
        ),
        value: '3 festőnek 8 óra kell (összmunka: 4 · 6 = 24 óra, 24 / 3 = 8 óra)'
      },
      {
        id: 'p18',
        prompt: '6 munkás 10 nap alatt készít el egy árkot',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[6.5px] font-black fill-indigo-800" textAnchor="middle">12 munkás ideje?</text>
          </svg>
        ),
        value: '12 munkásnak 5 nap kell (dupla munkáslétszám → feleannyi idő: 60 / 12 = 5)'
      },
      {
        id: 'p19',
        prompt: '90 km/h sebességgel 2 óra a menetidő',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[6.5px] font-black fill-emerald-800" textAnchor="middle">60 km/h ideje?</text>
          </svg>
        ),
        value: '60 km/h-val 3 óra a menetidő (távolság: 90 · 2 = 180 km, 180 / 60 = 3)'
      },
      {
        id: 'p20',
        prompt: '50 km/h sebességgel 6 óra alatt ér célba',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[6.5px] font-black fill-emerald-800" textAnchor="middle">100 km/h ideje?</text>
          </svg>
        ),
        value: '100 km/h-val 3 óra kell (távolság: 300 km, dupla sebesség → fele menetidő)'
      },
      {
        id: 'p21',
        prompt: 'Téglalap területe T = 48 cm², egyik oldala a = 6 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#fff7ed" stroke="#f97316" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[6.5px] font-black fill-orange-800" textAnchor="middle">Másik oldal b?</text>
          </svg>
        ),
        value: 'A másik oldal hossza: b = 8 cm (mivel a · b = 48 cm², 48 / 6 = 8 cm)'
      },
      {
        id: 'p22',
        prompt: 'Téglalap területe T = 36 cm², egyik oldala a = 12 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#fff7ed" stroke="#f97316" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[6.5px] font-black fill-orange-800" textAnchor="middle">Másik oldal b?</text>
          </svg>
        ),
        value: 'A másik oldal hossza: b = 3 cm (mivel 12 · 3 = 36 cm²)'
      },
      {
        id: 'p23',
        prompt: '24 fogú fogaskerék percenként 100-at fordul',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#f8fafc" stroke="#64748b" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[6.5px] font-black fill-slate-700" textAnchor="middle">12 fogú kerék?</text>
          </svg>
        ),
        value: 'A 12 fogú kis kerék 200-at fordul (feleakkora fogszám → kétszeres fordulatszám)'
      },
      {
        id: 'p24',
        prompt: '3 azonos csap 8 óra alatt tölti meg a medencét',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[6.5px] font-black fill-blue-800" textAnchor="middle">6 csap ideje?</text>
          </svg>
        ),
        value: '6 csap 4 óra alatt tölti fel a medencét (dupla vízhozam → fele annyi idő: 24 / 6 = 4)'
      }
    ]
  }
};

export const InverseProportionMatcher: React.FC<InverseProportionMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g8-func-inverse',
  topicTitle = 'Fordított Arányosság'
}) => {
  return (
    <MatcherTemplate
      level={level}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
      chapterId="hozzarendelesek-valoszinuseg-sorozatok"
      themeColor="indigo"
    />
  );
};

export default InverseProportionMatcher;
