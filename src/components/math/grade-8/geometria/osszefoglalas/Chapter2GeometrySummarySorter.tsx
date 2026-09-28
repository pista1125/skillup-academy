import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface Chapter2GeometrySummarySorterProps {
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
    title: '1. Szint: Egybevágóság vs. Hasonlóság vs. Torzítás',
    subtitle: 'Sorold be a transzformációkat és műveleteket geometriai jellegük szerint!',
    categories: [
      {
        id: 'cat-congruence',
        name: 'Egybevágósági leképezés (k = 1)',
        description: 'Távolságtartó: méret és alak pontosan változatlan marad',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-similarity',
        name: 'Hasonlósági leképezés (k ≠ 1)',
        description: 'Alaktartó: szögek egyeznek, de a méret k-szorosára változik',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      },
      {
        id: 'cat-neither',
        name: 'Nem hasonlóság (torzulás)',
        description: 'Az alak és a szögek megváltoznak (pl. nyújtás csak egy irányban)',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
      }
    ],
    items: [
      {
        id: 'sum-s1',
        label: 'Tengelyes tükrözés egyenesre',
        category: 'cat-congruence',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="35" y1="3" x2="35" y2="27" stroke="#94a3b8" strokeWidth="1.5" />
            <polygon points="18,22 30,22 24,10" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1" />
            <polygon points="52,22 40,22 46,10" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 'sum-s2',
        label: 'Középpontos hasonlóság λ = 2 aránnyal (kétszeres nagyítás)',
        category: 'cat-similarity',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="12,24 24,24 18,12" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1" />
            <polygon points="34,26 62,26 48,4" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'sum-s3',
        label: 'Téglalap csak a szélességében történő megnyújtása 2-szeresére',
        category: 'cat-neither',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <rect x="15" y="10" width="12" height="12" fill="#fee2e2" stroke="#ef4444" strokeWidth="1" />
            <rect x="36" y="10" width="24" height="12" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'sum-s4',
        label: 'Párhuzamos eltolás vektorral',
        category: 'cat-congruence',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="14,24 28,24 21,10" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
            <polygon points="42,24 56,24 49,10" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 'sum-s5',
        label: 'Középpontos tükrözés egy pontra (λ = -1)',
        category: 'cat-congruence',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="2.5" fill="#4f46e5" />
            <polygon points="15,22 27,22 21,12" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
            <polygon points="55,8 43,8 49,18" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 'sum-s6',
        label: 'Háromszög kicsinyítése felére a középvonalak mentén (k = 0,5)',
        category: 'cat-similarity',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="10,26 38,26 24,6" fill="none" stroke="#64748b" strokeWidth="1" />
            <polygon points="46,24 60,24 53,14" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.2" />
          </svg>
        )
      },
      {
        id: 'sum-s7',
        label: 'Kör átalakítása ellipszissé ferde összenyomással',
        category: 'cat-neither',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="20" cy="15" r="8" fill="none" stroke="#ef4444" strokeWidth="1" />
            <ellipse cx="48" cy="15" rx="14" ry="7" fill="none" stroke="#ef4444" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'sum-s8',
        label: 'Elforgatás az origó körül 60°-kal',
        category: 'cat-congruence',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="2.5" fill="#f59e0b" />
          </svg>
        )
      },
      {
        id: 'sum-s9',
        label: 'Középpontos hasonlóság λ = -1,5 aránnyal (átforduló másfélszeres kép)',
        category: 'cat-similarity',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-purple-700">λ = -1,5</text>
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Arányskálák Hatása (k, k², k³)',
    subtitle: 'Milyen hatvánnyal változik meg az adott geometriai mennyiség k-szoros hasonlóságnál?',
    categories: [
      {
        id: 'cat-linear',
        name: 'k-szoros (Egydimenziós)',
        description: 'Oldalhosszak, kerület, magasság, sugarak, átlók',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      {
        id: 'cat-quadratic',
        name: 'k²-szeres (Kétdimenziós)',
        description: 'Sík idomok területe, testek felszíne és palástja',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
      },
      {
        id: 'cat-cubic',
        name: 'k³-szoros (Háromdimenziós)',
        description: 'Térbeli testek térfogata, ürtartalma, tömege',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      }
    ],
    items: [
      {
        id: 'sum-s10',
        label: 'A sokszög kerülete (K)',
        category: 'cat-linear',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-blue-700">K' = k · K</text>
          </svg>
        )
      },
      {
        id: 'sum-s11',
        label: 'A háromszög területe (T)',
        category: 'cat-quadratic',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-purple-700">T' = k² · T</text>
          </svg>
        )
      },
      {
        id: 'sum-s12',
        label: 'A kocka térfogata (V)',
        category: 'cat-cubic',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-emerald-700">V' = k³ · V</text>
          </svg>
        )
      },
      {
        id: 'sum-s13',
        label: 'A kör sugara (r) és átmérője (d)',
        category: 'cat-linear',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-blue-700">r' = k · r</text>
          </svg>
        )
      },
      {
        id: 'sum-s14',
        label: 'A henger palástjának felszíne (A)',
        category: 'cat-quadratic',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-purple-700">A' = k² · A</text>
          </svg>
        )
      },
      {
        id: 'sum-s15',
        label: 'Egy aranygömb tömege azonos sűrűség mellett',
        category: 'cat-cubic',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-emerald-700">m' = k³ · m</text>
          </svg>
        )
      },
      {
        id: 'sum-s16',
        label: 'A háromszög alaphoz tartozó magassága (m_a)',
        category: 'cat-linear',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-blue-700">m' = k · m</text>
          </svg>
        )
      },
      {
        id: 'sum-s17',
        label: 'Körlap területe (T = r²π)',
        category: 'cat-quadratic',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-purple-700">T' = k² · T</text>
          </svg>
        )
      },
      {
        id: 'sum-s18',
        label: 'Vízmedence űrtartalma literben (V)',
        category: 'cat-cubic',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-emerald-700">V' = k³ · V</text>
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Fix Elemek Száma a Transzformációkban',
    subtitle: 'Csoportosítsd a leképezéseket a fixpontjaik száma és elhelyezkedése szerint!',
    categories: [
      {
        id: 'cat-point-fixed',
        name: 'Pontosan 1 fixpont',
        description: 'Csak a centrum marad a helyén (középpontos tükrözés, forgatás, középpontos hasonlóság)',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
      },
      {
        id: 'cat-line-fixed',
        name: 'Egyenesnyi fixpont (végtelen sok)',
        description: 'Egy teljes egyenes minden pontja helyben marad (tengelyes tükrözés)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
      },
      {
        id: 'cat-no-fixed',
        name: 'Nincs fixpontja',
        description: 'A sík egyetlen pontja sem marad a helyén (párhuzamos eltolás v ≠ 0)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
      }
    ],
    items: [
      {
        id: 'sum-s19',
        label: 'Középpontos tükrözés a sík egy O pontjára',
        category: 'cat-point-fixed',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="3" fill="#4f46e5" />
            <text x="35" y="25" textAnchor="middle" className="text-[6px] font-bold fill-indigo-700">O az egyetlen</text>
          </svg>
        )
      },
      {
        id: 'sum-s20',
        label: 'Tengelyes tükrözés a t egyenesre',
        category: 'cat-line-fixed',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="35" y1="5" x2="35" y2="25" stroke="#059669" strokeWidth="2" />
            <text x="35" y="28" textAnchor="middle" className="text-[5px] font-bold fill-emerald-700">t minden pontja fix</text>
          </svg>
        )
      },
      {
        id: 'sum-s21',
        label: 'Párhuzamos eltolás egy v = 5 cm-es vektorral',
        category: 'cat-no-fixed',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="20" y1="15" x2="45" y2="15" stroke="#d97706" strokeWidth="2" />
            <polygon points="45,15 40,12 40,18" fill="#d97706" />
          </svg>
        )
      },
      {
        id: 'sum-s22',
        label: 'Elforgatás az O pont körül 90°-kal',
        category: 'cat-point-fixed',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="3" fill="#4f46e5" />
            <text x="35" y="25" textAnchor="middle" className="text-[6px] font-bold fill-indigo-700">O fixpont</text>
          </svg>
        )
      },
      {
        id: 'sum-s23',
        label: 'Középpontos hasonlóság O centrummal és λ = 2,5 aránnyal',
        category: 'cat-point-fixed',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="3" fill="#4f46e5" />
            <text x="35" y="25" textAnchor="middle" className="text-[6px] font-bold fill-indigo-700">O' = O</text>
          </svg>
        )
      },
      {
        id: 'sum-s24',
        label: 'Párhuzamos eltolás ferdén balra fel 4 cm-rel',
        category: 'cat-no-fixed',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="45" y1="22" x2="25" y2="8" stroke="#d97706" strokeWidth="2" />
          </svg>
        )
      },
      {
        id: 'sum-s25',
        label: 'Középpontos hasonlóság λ = -0,5 aránnyal',
        category: 'cat-point-fixed',
        figure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="3" fill="#4f46e5" />
          </svg>
        )
      }
    ]
  }
};

export const Chapter2GeometrySummarySorter: React.FC<Chapter2GeometrySummarySorterProps> = ({
  level,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g8-geom-summary',
  topicTitle = 'Geometria Összefoglalás'
}) => {
  return (
    <SorterTemplate
      level={level}
      levelsConfig={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      title="Geometria Összefoglaló Csoportosító"
      subtitle="Kategorizáld a transzformációkat, dimenziókat és fix elemeket!"
      badge="8. Osztály • Geometria"
      gameId="g8-geom-summary-sorter"
    />
  );
};

export default Chapter2GeometrySummarySorter;
