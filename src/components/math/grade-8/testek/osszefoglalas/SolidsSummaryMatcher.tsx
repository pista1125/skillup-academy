import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SolidsSummaryMatcherProps {
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
    title: '1. Szint: Alapfogalmak és Testek Képletei',
    subtitle: 'Párosítsd a geometriai testeket és képleteiket a helyes leírásukkal!',
    pairs: [
      {
        id: 'sm1-1',
        prompt: 'Kocka térfogata és felszíne',
        figure: (
          <svg viewBox="0 0 54 36" className="w-12 h-8">
            <rect x="14" y="10" width="18" height="18" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.2" />
            <polygon points="14,10 24,4 42,4 32,10" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="1.2" />
            <polygon points="32,10 42,4 42,22 32,28" fill="#a5b4fc" stroke="#4f46e5" strokeWidth="1.2" />
          </svg>
        ),
        value: 'V = a³, A = 6a² (6 egybevágó négyzetlap határolja)'
      },
      {
        id: 'sm1-2',
        prompt: 'Téglatest térfogata',
        figure: (
          <svg viewBox="0 0 54 36" className="w-12 h-8">
            <rect x="8" y="12" width="26" height="16" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.2" />
            <polygon points="8,12 18,6 44,6 34,12" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="1.2" />
            <polygon points="34,12 44,6 44,22 34,28" fill="#a5b4fc" stroke="#4f46e5" strokeWidth="1.2" />
          </svg>
        ),
        value: 'V = a · b · c (három különböző él szorzata)'
      },
      {
        id: 'sm1-3',
        prompt: 'Egyenes hasáb térfogata',
        figure: (
          <svg viewBox="0 0 54 36" className="w-12 h-8">
            <polygon points="10,28 30,28 20,20" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.2" />
            <polygon points="10,14 30,14 20,6" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="1.2" />
            <line x1="10" y1="14" x2="10" y2="28" stroke="#4f46e5" strokeWidth="1.2" />
            <line x1="30" y1="14" x2="30" y2="28" stroke="#4f46e5" strokeWidth="1.2" />
            <line x1="20" y1="6" x2="20" y2="20" stroke="#4f46e5" strokeWidth="1.2" />
          </svg>
        ),
        value: 'V = Tₐ · m (alapterület és testmagasság szorzata)'
      },
      {
        id: 'sm1-4',
        prompt: 'Szabályos gúla térfogata',
        figure: (
          <svg viewBox="0 0 54 36" className="w-12 h-8">
            <polygon points="27,4 10,26 30,30" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.2" />
            <polygon points="27,4 30,30 44,24" fill="#ddd6fe" stroke="#7c3aed" strokeWidth="1.2" />
          </svg>
        ),
        value: 'V = (Tₐ · m) / 3 (az azonos alapterületű hasáb harmada)'
      },
      {
        id: 'sm1-5',
        prompt: 'Egyenes körhenger térfogata',
        figure: (
          <svg viewBox="0 0 54 36" className="w-12 h-8">
            <ellipse cx="27" cy="8" rx="14" ry="4" fill="#c7d2fe" stroke="#4338ca" strokeWidth="1.2" />
            <line x1="13" y1="8" x2="13" y2="26" stroke="#4338ca" strokeWidth="1.2" />
            <line x1="41" y1="8" x2="41" y2="26" stroke="#4338ca" strokeWidth="1.2" />
            <path d="M 13 26 A 14 4 0 0 0 41 26 A 14 4 0 0 0 13 26" fill="#e0e7ff" stroke="#4338ca" strokeWidth="1.2" />
          </svg>
        ),
        value: 'V = r² · π · m (körlap területe szorozva a magassággal)'
      },
      {
        id: 'sm1-6',
        prompt: 'Egyenes körkúp térfogata',
        figure: (
          <svg viewBox="0 0 54 36" className="w-12 h-8">
            <line x1="27" y1="4" x2="13" y2="28" stroke="#6366f1" strokeWidth="1.2" />
            <line x1="27" y1="4" x2="41" y2="28" stroke="#6366f1" strokeWidth="1.2" />
            <path d="M 13 28 A 14 4 0 0 0 41 28" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.2" />
            <path d="M 13 28 A 14 4 0 0 1 41 28" fill="none" stroke="#6366f1" strokeWidth="1.2" strokeDasharray="2 2" />
          </svg>
        ),
        value: 'V = (r² · π · m) / 3 (a körhenger térfogatának harmadrésze)'
      },
      {
        id: 'sm1-7',
        prompt: 'Gömb felszíne',
        figure: (
          <svg viewBox="0 0 54 36" className="w-12 h-8">
            <circle cx="27" cy="18" r="14" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.2" />
            <ellipse cx="27" cy="18" rx="14" ry="4" fill="none" stroke="#6d28d9" strokeWidth="1" strokeDasharray="3 2" />
          </svg>
        ),
        value: 'A = 4 · π · r² (négy főkör területével egyenlő)'
      },
      {
        id: 'sm1-8',
        prompt: 'Gömb térfogata',
        figure: (
          <svg viewBox="0 0 54 36" className="w-12 h-8">
            <circle cx="27" cy="18" r="14" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.2" />
            <line x1="27" y1="18" x2="41" y2="18" stroke="#1d4ed8" strokeWidth="1.5" />
            <text x="34" y="16" className="text-[6px] font-bold fill-blue-900" textAnchor="middle">r</text>
          </svg>
        ),
        value: 'V = (4/3) · π · r³ (a köré írt 2r magas henger 2/3 része)'
      }
    ]
  },
  2: {
    title: '2. Szint: Pitagorasz-tétel és Részterületek a Térben',
    subtitle: 'Párosítsd a derékszögű háromszögeket és palástképleteket!',
    pairs: [
      {
        id: 'sm2-1',
        prompt: 'Hasáb palástjának területe (T_p)',
        figure: (
          <svg viewBox="0 0 54 36" className="w-12 h-8">
            <rect x="10" y="8" width="34" height="20" rx="2" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.2" />
            <text x="27" y="20" className="text-[6.5px] font-bold fill-blue-800" textAnchor="middle">Kₐ · m</text>
          </svg>
        ),
        value: 'T_p = Kₐ · m (alapkerület szorozva a hasáb magasságával)'
      },
      {
        id: 'sm2-2',
        prompt: 'Négyzetes gúla oldalmagassága (mₒ)',
        figure: (
          <svg viewBox="0 0 54 36" className="w-12 h-8">
            <polygon points="12,28 42,28 27,6" fill="#fdf4ff" stroke="#c026d3" strokeWidth="1.2" />
            <line x1="27" y1="6" x2="27" y2="28" stroke="#c026d3" strokeWidth="1.2" strokeDasharray="2 2" />
          </svg>
        ),
        value: 'mₒ = √(m² + (a/2)²) (testmagasság és fél alapél derékszögű háromszöge)'
      },
      {
        id: 'sm2-3',
        prompt: 'Gúla oldaléle (b)',
        figure: (
          <svg viewBox="0 0 54 36" className="w-12 h-8">
            <line x1="12" y1="28" x2="27" y2="8" stroke="#9333ea" strokeWidth="1.6" />
            <line x1="12" y1="28" x2="42" y2="28" stroke="#a855f7" strokeWidth="1.2" />
            <line x1="42" y1="28" x2="27" y2="8" stroke="#9333ea" strokeWidth="1.6" />
          </svg>
        ),
        value: 'b = √(mₒ² + (a/2)²) (oldallapon az oldalmagasságból számolva)'
      },
      {
        id: 'sm2-4',
        prompt: 'Kocka testátlója (d)',
        figure: (
          <svg viewBox="0 0 54 36" className="w-12 h-8">
            <rect x="14" y="8" width="20" height="20" fill="none" stroke="#4f46e5" strokeWidth="1.2" />
            <line x1="14" y1="28" x2="34" y2="8" stroke="#ea580c" strokeWidth="1.6" />
          </svg>
        ),
        value: 'd = a · √3 ≈ 1,732 · a (térbeli Pitagorasz-tétel eredménye)'
      },
      {
        id: 'sm2-5',
        prompt: 'Körhenger palástjának területe (T_p)',
        figure: (
          <svg viewBox="0 0 54 36" className="w-12 h-8">
            <rect x="8" y="10" width="38" height="16" rx="2" fill="#ecfdf5" stroke="#059669" strokeWidth="1.2" />
            <text x="27" y="20" className="text-[6.5px] font-bold fill-emerald-800" textAnchor="middle">2πr · m</text>
          </svg>
        ),
        value: 'T_p = 2 · π · r · m (kiterítve egy 2πr és m oldalú téglalap)'
      },
      {
        id: 'sm2-6',
        prompt: 'Kúp alkotója (a) a magasságból',
        figure: (
          <svg viewBox="0 0 54 36" className="w-12 h-8">
            <polygon points="16,26 38,26 27,6" fill="none" stroke="#2563eb" strokeWidth="1.2" />
            <line x1="27" y1="6" x2="27" y2="26" stroke="#2563eb" strokeWidth="1.2" strokeDasharray="2 2" />
            <text x="35" y="16" className="text-[6.5px] font-bold fill-blue-700">a</text>
          </svg>
        ),
        value: 'a = √(m² + r²) (kúp tengelymetszetének félderékszögű háromszöge)'
      },
      {
        id: 'sm2-7',
        prompt: 'Körkúp palástjának területe (T_p)',
        figure: (
          <svg viewBox="0 0 54 36" className="w-12 h-8">
            <path d="M 12 28 A 20 20 0 0 1 42 28 L 27 8 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
          </svg>
        ),
        value: 'T_p = r · π · a (ahol "a" a kúp alkotója, kiterítve körcikk)'
      },
      {
        id: 'sm2-8',
        prompt: 'Négyzet alapú gúla palástja (T_p)',
        figure: (
          <svg viewBox="0 0 54 36" className="w-12 h-8">
            <polygon points="14,26 40,26 27,10" fill="#ede9fe" stroke="#6d28d9" strokeWidth="1.2" />
            <text x="27" y="22" className="text-[6.5px] font-bold fill-purple-800" textAnchor="middle">4 · (a·mₒ/2)</text>
          </svg>
        ),
        value: 'T_p = 4 · (a · mₒ / 2) = 2 · a · mₒ (4 egyenlő szárú háromszög)'
      }
    ]
  },
  3: {
    title: '3. Szint: Hasonlóság, Mértékegységek és Föld-modell',
    subtitle: 'Párosítsd a méretezési törvényeket, arányokat és valós modell-adatokat!',
    pairs: [
      {
        id: 'sm3-1',
        prompt: 'Hasonlósági arány hosszaknál (k)',
        figure: (
          <svg viewBox="0 0 54 36" className="w-12 h-8">
            <line x1="8" y1="20" x2="22" y2="20" stroke="#4f46e5" strokeWidth="2" />
            <line x1="28" y1="20" x2="48" y2="20" stroke="#4f46e5" strokeWidth="2" />
            <text x="15" y="15" className="text-[6px] font-bold fill-indigo-700" textAnchor="middle">a</text>
            <text x="38" y="15" className="text-[6px] font-bold fill-indigo-700" textAnchor="middle">k·a</text>
          </svg>
        ),
        value: 'Minden 1D távolság, él, magasság és kerület k-szorosára változik'
      },
      {
        id: 'sm3-2',
        prompt: 'Hasonlóság hatása a felületre',
        figure: (
          <svg viewBox="0 0 54 36" className="w-12 h-8">
            <rect x="8" y="16" width="10" height="10" fill="#c7d2fe" stroke="#4338ca" strokeWidth="1" />
            <rect x="26" y="8" width="20" height="20" fill="#c7d2fe" stroke="#4338ca" strokeWidth="1" />
          </svg>
        ),
        value: 'A felszín és minden felületarány k²-szeresére változik (A\' = k² · A)'
      },
      {
        id: 'sm3-3',
        prompt: 'Hasonlóság hatása a térfogatra',
        figure: (
          <svg viewBox="0 0 54 36" className="w-12 h-8">
            <rect x="6" y="18" width="8" height="8" fill="#a5b4fc" stroke="#3730a3" strokeWidth="1" />
            <rect x="22" y="8" width="24" height="24" fill="#a5b4fc" stroke="#3730a3" strokeWidth="1" />
          </svg>
        ),
        value: 'A térfogat és tömeg k³-szorosára változik (V\' = k³ · V)'
      },
      {
        id: 'sm3-4',
        prompt: '1 köbméter (1 m³) átváltása',
        figure: (
          <svg viewBox="0 0 54 36" className="w-12 h-8">
            <rect x="10" y="8" width="34" height="20" rx="2" fill="#fef2f2" stroke="#dc2626" strokeWidth="1" />
            <text x="27" y="20" className="text-[6.5px] font-bold fill-red-800" textAnchor="middle">1 m³ = ?</text>
          </svg>
        ),
        value: '1000 dm³ = 1000 liter = 1 000 000 cm³'
      },
      {
        id: 'sm3-5',
        prompt: '1 liter (1 l) geometriai megfelelője',
        figure: (
          <svg viewBox="0 0 54 36" className="w-12 h-8">
            <rect x="16" y="10" width="22" height="18" rx="2" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.2" />
            <text x="27" y="22" className="text-[7px] font-bold fill-blue-800" textAnchor="middle">1 liter</text>
          </svg>
        ),
        value: '1 dm³ = 1000 cm³ = 1000 ml = 0,001 m³'
      },
      {
        id: 'sm3-6',
        prompt: 'Föld átlagos sugara és Egyenlítője',
        figure: (
          <svg viewBox="0 0 54 36" className="w-12 h-8">
            <circle cx="27" cy="18" r="13" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.2" />
            <ellipse cx="27" cy="18" rx="13" ry="4" fill="none" stroke="#0f766e" strokeWidth="1.2" />
          </svg>
        ),
        value: 'R ≈ 6370 km, K = 2πR ≈ 40 000 km (főkör kerülete)'
      },
      {
        id: 'sm3-7',
        prompt: 'Tömeg kiszámítása térfogatból',
        figure: (
          <svg viewBox="0 0 54 36" className="w-12 h-8">
            <rect x="10" y="8" width="34" height="20" rx="3" fill="#fefce8" stroke="#ca8a04" strokeWidth="1.2" />
            <text x="27" y="20" className="text-[7px] font-bold fill-amber-900" textAnchor="middle">m = ρ · V</text>
          </svg>
        ),
        value: 'm = ρ · V (tömeg = sűrűség szorozva a térfogattal)'
      },
      {
        id: 'sm3-8',
        prompt: 'Eratoszthenész Föld-mérése',
        figure: (
          <svg viewBox="0 0 54 36" className="w-12 h-8">
            <circle cx="27" cy="18" r="13" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.2" />
            <line x1="27" y1="18" x2="39" y2="13" stroke="#ea580c" strokeWidth="1.2" />
            <line x1="27" y1="18" x2="39" y2="23" stroke="#ea580c" strokeWidth="1.2" />
          </svg>
        ),
        value: '7,2° a 360°-nak 1/50 része ⟹ K = 50 · 5000 stádium'
      }
    ]
  }
};

export const SolidsSummaryMatcher: React.FC<SolidsSummaryMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g8-solids-summary',
  topicTitle = 'Fejezeti Összefoglalás: Testek (Párosító)'
}) => {
  const activeLvl: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;

  return (
    <MatcherTemplate
      key={`solids-summary-matcher-${activeLvl}`}
      level={activeLvl}
      currentLevel={activeLvl}
      levels={matcherLevels}
      levelsConfig={matcherLevels}
      levelConfigs={matcherLevels}
      levelConfig={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      themeColor="indigo"
      topicId={topicId}
      topicTitle={topicTitle}
      badge="8. Osztály • VII. Testek"
    />
  );
};

export default SolidsSummaryMatcher;
