import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface HowManyWaysMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Alapfogalmak és Egyszerű Szabályok',
    subtitle: 'Párosítsd a döntési helyzeteket és feladatokat a helyes kombinatorikai számításokkal!',
    pairs: [
      {
        id: 'hm-1',
        prompt: '2 nadrág és 3 ing párosítása',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="6" y="6" width="16" height="16" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.2" />
            <text x="14" y="18" className="text-[9px] font-bold fill-blue-700" textAnchor="middle">2</text>
            <text x="27" y="18" className="text-[10px] font-bold fill-slate-400" textAnchor="middle">×</text>
            <rect x="32" y="6" width="16" height="16" rx="4" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.2" />
            <text x="40" y="18" className="text-[9px] font-bold fill-purple-700" textAnchor="middle">3</text>
          </svg>
        ),
        value: '6 féle öltözet (2 · 3 = 6, szorzási szabály)'
      },
      {
        id: 'hm-2',
        prompt: '3 busz vagy 4 vonat Szegedre',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="6" y="6" width="16" height="16" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
            <text x="14" y="18" className="text-[9px] font-bold fill-amber-700" textAnchor="middle">3</text>
            <text x="27" y="18" className="text-[10px] font-bold fill-slate-400" textAnchor="middle">+</text>
            <rect x="32" y="6" width="16" height="16" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.2" />
            <text x="40" y="18" className="text-[9px] font-bold fill-emerald-700" textAnchor="middle">4</text>
          </svg>
        ),
        value: '7 féle választás (3 + 4 = 7, összeadási szabály)'
      },
      {
        id: 'hm-3',
        prompt: 'Fadiagram levelei (ágvégek)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="8" y1="14" x2="24" y2="8" stroke="#3b82f6" strokeWidth="1.2" />
            <line x1="8" y1="14" x2="24" y2="20" stroke="#3b82f6" strokeWidth="1.2" />
            <circle cx="8" cy="14" r="2.5" fill="#1d4ed8" />
            <circle cx="24" cy="8" r="2" fill="#2563eb" />
            <circle cx="24" cy="20" r="2" fill="#2563eb" />
            <circle cx="44" cy="5" r="2" fill="#10b981" />
            <circle cx="44" cy="11" r="2" fill="#10b981" />
            <circle cx="44" cy="17" r="2" fill="#10b981" />
            <circle cx="44" cy="23" r="2" fill="#10b981" />
          </svg>
        ),
        value: 'Az összes lehetséges kimenetel száma'
      },
      {
        id: 'hm-4',
        prompt: '2 pénzérme feldobása (F, Í)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="18" cy="14" r="9" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.2" />
            <text x="18" y="17" className="text-[8px] font-black fill-yellow-900" textAnchor="middle">F/Í</text>
            <circle cx="36" cy="14" r="9" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.2" />
            <text x="36" y="17" className="text-[8px] font-black fill-yellow-900" textAnchor="middle">F/Í</text>
          </svg>
        ),
        value: '4 kimenetel (2² = 4: FF, FÍ, ÍF, ÍÍ)'
      },
      {
        id: 'hm-5',
        prompt: '1 szabályos dobókocka dobása',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="16" y="3" width="22" height="22" rx="4" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.2" />
            <circle cx="27" cy="14" r="2.5" fill="#991b1b" />
          </svg>
        ),
        value: '6 kimenetel ({1, 2, 3, 4, 5, 6})'
      },
      {
        id: 'hm-6',
        prompt: 'Menü: 3 leves és 4 főétel',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[11px] font-black fill-indigo-600" textAnchor="middle">3 × 4</text>
          </svg>
        ),
        value: '12 féle 2-fogásos ebéd (3 · 4 = 12)'
      },
      {
        id: 'hm-7',
        prompt: 'Független döntések összekapcsolása (ÉS)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="6" width="38" height="16" rx="4" fill="#ede9fe" stroke="#6366f1" strokeWidth="1" />
            <text x="27" y="18" className="text-[9px] font-bold fill-indigo-700" textAnchor="middle">n₁ · n₂ · ... · nₖ</text>
          </svg>
        ),
        value: 'Szorzási szabály (multiplikatív elv)'
      },
      {
        id: 'hm-8',
        prompt: 'Egymást kizáró alternatívák (VAGY)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="6" width="38" height="16" rx="4" fill="#ecfdf5" stroke="#059669" strokeWidth="1" />
            <text x="27" y="18" className="text-[9px] font-bold fill-emerald-700" textAnchor="middle">n₁ + n₂ + ... + nₘ</text>
          </svg>
        ),
        value: 'Összeadási szabály (additív elv)'
      }
    ]
  },
  2: {
    title: '2. Szint: Számjegyek és Kódok Számítása',
    subtitle: 'Alkalmazd a szorzási és összeadási szabályt kódokra és számképzésre!',
    pairs: [
      {
        id: 'hm2-1',
        prompt: '4-jegyű bankkártya PIN kód (0-9)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="5" y="7" width="10" height="14" rx="2" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
            <rect x="17" y="7" width="10" height="14" rx="2" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
            <rect x="29" y="7" width="10" height="14" rx="2" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
            <rect x="41" y="7" width="10" height="14" rx="2" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
          </svg>
        ),
        value: '10 000 lehetséges kód (10⁴ = 10 000)'
      },
      {
        id: 'hm2-2',
        prompt: '3-jegyű szám {1,2,3,4,5} különböző jegyekből',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[10px] font-bold fill-purple-700" textAnchor="middle">5 · 4 · 3</text>
          </svg>
        ),
        value: '60 darab (5 · 4 · 3 = 60)'
      },
      {
        id: 'hm2-3',
        prompt: '3-jegyű szám {1,2,3,4,5} ismétlődő jegyekkel',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[10px] font-bold fill-blue-700" textAnchor="middle">5³</text>
          </svg>
        ),
        value: '125 darab (5 · 5 · 5 = 125)'
      },
      {
        id: 'hm2-4',
        prompt: '3 dobókockával egyszerre dobunk',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[10px] font-bold fill-red-600" textAnchor="middle">6³</text>
          </svg>
        ),
        value: '216 kimenetel (6 · 6 · 6 = 216)'
      },
      {
        id: 'hm2-5',
        prompt: '3 pénzérme feldobása (sorrend számít)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[10px] font-bold fill-amber-600" textAnchor="middle">2³</text>
          </svg>
        ),
        value: '8 sorozat (2 · 2 · 2 = 8)'
      },
      {
        id: 'hm2-6',
        prompt: 'Útvonal A-ból B-be (3 út), B-ből C-be (5 út)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="8" cy="14" r="3" fill="#3b82f6" />
            <circle cx="27" cy="14" r="3" fill="#8b5cf6" />
            <circle cx="46" cy="14" r="3" fill="#10b981" />
            <line x1="11" y1="14" x2="24" y2="14" stroke="#64748b" strokeWidth="1.2" />
            <line x1="30" y1="14" x2="43" y2="14" stroke="#64748b" strokeWidth="1.2" />
          </svg>
        ),
        value: '15 különböző útvonal (3 · 5 = 15)'
      },
      {
        id: 'hm2-7',
        prompt: '3-jegyű szám {0,1,2,3} különböző jegyekből',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[9.5px] font-bold fill-rose-600" textAnchor="middle">3 · 3 · 2</text>
          </svg>
        ),
        value: '18 darab (0 nem lehet az első jegy)'
      },
      {
        id: 'hm2-8',
        prompt: '2 kocka dobásösszege pontosan 4',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[9px] font-bold fill-emerald-600" textAnchor="middle">1+3, 2+2, 3+1</text>
          </svg>
        ),
        value: '3 kimenetel ((1;3), (2;2), (3;1))'
      }
    ]
  },
  3: {
    title: '3. Szint: Összetett és Feltételes Feladatok',
    subtitle: 'Rendszerezd az összetett feltételeket tartalmazó kombinatorikai eseteket!',
    pairs: [
      {
        id: 'hm3-1',
        prompt: '3-jegyű páros számok {1,2,3,4,5} különböző jegyekből',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[10px] font-bold fill-indigo-600" textAnchor="middle">4 · 3 · 2</text>
          </svg>
        ),
        value: '24 darab (utolsó jegy 2 vagy 4, azaz 2 lehetőség)'
      },
      {
        id: 'hm3-2',
        prompt: '4 barát leül egymás mellé egy padra',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[10px] font-bold fill-purple-600" textAnchor="middle">4 · 3 · 2 · 1</text>
          </svg>
        ),
        value: '24 ülésrend (4! = 24)'
      },
      {
        id: 'hm3-3',
        prompt: 'Kétjegyű számok, amelyek jegyeinek összege 5',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[8.5px] font-bold fill-blue-600" textAnchor="middle">14,23,32,41,50</text>
          </svg>
        ),
        value: '5 darab szám (14, 23, 32, 41, 50)'
      },
      {
        id: 'hm3-4',
        prompt: '3-jegyű számok csupa páratlan jegyből',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[10px] font-bold fill-emerald-600" textAnchor="middle">5 · 5 · 5</text>
          </svg>
        ),
        value: '125 darab (minden helyre {1,3,5,7,9})'
      },
      {
        id: 'hm3-5',
        prompt: '5 fős csapatból elnök és titkár választása',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[10px] font-bold fill-amber-600" textAnchor="middle">5 · 4</text>
          </svg>
        ),
        value: '20 féle vezetőség (5 · 4 = 20)'
      },
      {
        id: 'hm3-6',
        prompt: 'Összes 3-jegyű pozitív egész szám',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[10px] font-bold fill-teal-600" textAnchor="middle">9 · 10 · 10</text>
          </svg>
        ),
        value: '900 darab (100-tól 999-ig)'
      },
      {
        id: 'hm3-7',
        prompt: '3-jegyű számok, amelyek 5-tel oszthatók',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[10px] font-bold fill-rose-600" textAnchor="middle">9 · 10 · 2</text>
          </svg>
        ),
        value: '180 darab (végződés 0 vagy 5: 9 · 10 · 2)'
      },
      {
        id: 'hm3-8',
        prompt: 'Út A-ból B-be (2 út), B-ből C-be (3 út) és vissza más úton',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[9px] font-bold fill-cyan-600" textAnchor="middle">2 · 3 · 2 · 1</text>
          </svg>
        ),
        value: '12 oda-vissza út (oda: 6, vissza: 2)'
      }
    ]
  }
};

export const HowManyWaysMatcher: React.FC<HowManyWaysMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId,
  topicTitle
}) => {
  return (
    <MatcherTemplate
      level={level}
      title="Hányféleképpen lehet? – Párosító Játék"
      subtitle="Találd meg a feladatok, feltételek és a helyes kombinatorikai számítások összetartozó párjait!"
      badge="9. Osztály • I. Kombinatorika, halmazok"
      topicTitle={topicTitle || 'Hányféleképpen lehet?'}
      themeColor="blue"
      grade={9}
      chapterId="kombinatorika-halmazok"
      topicId={topicId || 'g9-komb-hanyfelekeppen-matcher'}
      levelsConfig={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
};

export default HowManyWaysMatcher;
