import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PythagorasTheoremMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Alapképletek és Számítások',
    subtitle: 'Párosítsd az oldalakat és képleteket a megfelelő értékekkel!',
    pairs: [
      {
        id: 'pt-m1',
        prompt: 'Átfogó kiszámítása (c)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="10,6 10,24 46,24" fill="#ecfdf5" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="10" y1="6" x2="46" y2="24" stroke="#059669" strokeWidth="2.5" />
            <text x="30" y="14" className="text-[7px] font-black fill-emerald-700">c = ?</text>
          </svg>
        ),
        value: 'c = √(a² + b²) (négyzetösszeg gyöke)'
      },
      {
        id: 'pt-m2',
        prompt: 'a befogó kiszámítása',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="12" y1="6" x2="12" y2="24" stroke="#d97706" strokeWidth="2.5" />
            <line x1="12" y1="24" x2="44" y2="24" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="12" y1="6" x2="44" y2="24" stroke="#cbd5e1" strokeWidth="1" />
            <text x="4" y="16" className="text-[7px] font-bold fill-amber-700">a=?</text>
          </svg>
        ),
        value: 'a = √(c² - b²) (kivonás!)'
      },
      {
        id: 'pt-m3',
        prompt: 'b befogó kiszámítása',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="12" y1="6" x2="12" y2="24" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="12" y1="24" x2="44" y2="24" stroke="#ea580c" strokeWidth="2.5" />
            <line x1="12" y1="6" x2="44" y2="24" stroke="#cbd5e1" strokeWidth="1" />
            <text x="26" y="27" className="text-[7px] font-bold fill-orange-700">b=?</text>
          </svg>
        ),
        value: 'b = √(c² - a²) (kivonás!)'
      },
      {
        id: 'pt-m4',
        prompt: 'a = 3 cm és b = 4 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="10,6 10,22 32,22" fill="#fef3c7" stroke="#b45309" strokeWidth="1.2" />
            <text x="6" y="16" className="text-[6px] font-bold fill-amber-900">3</text>
            <text x="21" y="26" className="text-[6px] font-bold fill-amber-900">4</text>
            <text x="23" y="13" className="text-[6.5px] font-black fill-emerald-700">c=5</text>
          </svg>
        ),
        value: 'Átfogó: c = 5 cm'
      },
      {
        id: 'pt-m5',
        prompt: 'Ta = 9 cm² és Tb = 16 cm²',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="6" y="12" width="10" height="10" fill="#fde68a" stroke="#d97706" strokeWidth="0.8" />
            <rect x="18" y="8" width="14" height="14" fill="#fed7aa" stroke="#ea580c" strokeWidth="0.8" />
            <text x="40" y="18" className="text-[7.5px] font-black fill-emerald-800">Tc=25</text>
          </svg>
        ),
        value: 'Tc = 25 cm² (9 + 16)'
      },
      {
        id: 'pt-m6',
        prompt: 'a = 6 cm és b = 8 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="10,6 10,22 34,22" fill="#ecfdf5" stroke="#059669" strokeWidth="1.2" />
            <text x="6" y="16" className="text-[6px] font-bold fill-emerald-900">6</text>
            <text x="22" y="26" className="text-[6px] font-bold fill-emerald-900">8</text>
            <text x="25" y="13" className="text-[6.5px] font-black fill-emerald-700">10</text>
          </svg>
        ),
        value: 'Átfogó: c = 10 cm (36 + 64 = 100)'
      },
      {
        id: 'pt-m7',
        prompt: 'c = 10 cm és a = 6 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="14" className="text-[6.5px] font-bold fill-slate-700" textAnchor="middle">100 - 36</text>
            <text x="27" y="24" className="text-[7.5px] font-black fill-amber-800" textAnchor="middle">= 64</text>
          </svg>
        ),
        value: 'Befogó: b = 8 cm (√64)'
      },
      {
        id: 'pt-m8',
        prompt: 'a = 1 cm és b = 1 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="12,8 12,22 26,22" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
            <text x="34" y="17" className="text-[7px] font-black fill-amber-800">√2</text>
          </svg>
        ),
        value: 'Átfogó: c = √2 ≈ 1,41 cm'
      }
    ]
  },
  2: {
    title: '2. Szint: Pitagoraszi Számhármasok és Kiszámítások',
    subtitle: 'Kösd össze az ismert oldalakat a hiányzó oldalhosszal!',
    pairs: [
      {
        id: 'pt-m9',
        prompt: 'a = 5 cm és b = 12 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="10,8 10,22 42,22" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.2" />
            <text x="6" y="17" className="text-[6px] font-bold fill-blue-900">5</text>
            <text x="26" y="26" className="text-[6px] font-bold fill-blue-900">12</text>
            <text x="28" y="13" className="text-[6.5px] font-black fill-blue-700">13</text>
          </svg>
        ),
        value: 'Átfogó: c = 13 cm (25 + 144 = 169)'
      },
      {
        id: 'pt-m10',
        prompt: 'c = 13 cm és a = 5 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="14" className="text-[6.5px] font-bold fill-slate-700" textAnchor="middle">169 - 25</text>
            <text x="27" y="24" className="text-[7.5px] font-black fill-blue-800" textAnchor="middle">= 144</text>
          </svg>
        ),
        value: 'Befogó: b = 12 cm (√144)'
      },
      {
        id: 'pt-m11',
        prompt: 'a = 8 cm és b = 15 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="10,8 10,22 42,22" fill="#fdf4ff" stroke="#7e22ce" strokeWidth="1.2" />
            <text x="6" y="17" className="text-[6px] font-bold fill-purple-900">8</text>
            <text x="26" y="26" className="text-[6px] font-bold fill-purple-900">15</text>
            <text x="28" y="13" className="text-[6.5px] font-black fill-purple-700">17</text>
          </svg>
        ),
        value: 'Átfogó: c = 17 cm (64 + 225 = 289)'
      },
      {
        id: 'pt-m12',
        prompt: 'a = 7 cm és b = 24 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="10,10 10,22 44,22" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.2" />
            <text x="6" y="17" className="text-[6px] font-bold fill-emerald-900">7</text>
            <text x="27" y="26" className="text-[6px] font-bold fill-emerald-900">24</text>
            <text x="29" y="14" className="text-[6.5px] font-black fill-emerald-700">25</text>
          </svg>
        ),
        value: 'Átfogó: c = 25 cm (49 + 576 = 625)'
      },
      {
        id: 'pt-m13',
        prompt: 'Ta = 25 cm² és Tc = 169 cm²',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[7.5px] font-black fill-amber-800" textAnchor="middle">Tb = 144 cm²</text>
          </svg>
        ),
        value: 'Másik befogó négyzete: Tb = 144 cm²'
      },
      {
        id: 'pt-m14',
        prompt: 'Ta = 64 cm² és Tb = 225 cm²',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[7.5px] font-black fill-purple-800" textAnchor="middle">Tc = 289 cm²</text>
          </svg>
        ),
        value: 'Átfogó négyzete: Tc = 289 cm²'
      },
      {
        id: 'pt-m15',
        prompt: 'c = 20 cm és a = 12 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="14" className="text-[6px] font-bold fill-slate-700" textAnchor="middle">4 · (3, 4, 5)</text>
            <text x="27" y="24" className="text-[7px] font-black fill-orange-700" textAnchor="middle">b = 16 cm</text>
          </svg>
        ),
        value: 'Befogó: b = 16 cm (3-4-5 négyszerese)'
      },
      {
        id: 'pt-m16',
        prompt: 'a = 10 cm és b = 24 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="14" className="text-[6px] font-bold fill-slate-700" textAnchor="middle">2 · (5, 12, 13)</text>
            <text x="27" y="24" className="text-[7px] font-black fill-blue-700" textAnchor="middle">c = 26 cm</text>
          </svg>
        ),
        value: 'Átfogó: c = 26 cm (5-12-13 kétszerese)'
      }
    ]
  },
  3: {
    title: '3. Szint: Területek, Rácstávolság és Gyökös Értékek',
    subtitle: 'Párosítsd az alakzatokat a pontos geometriai eredményeikkel!',
    pairs: [
      {
        id: 'pt-m17',
        prompt: 'a = 9 cm és b = 12 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="10,6 10,22 34,22" fill="#ecfdf5" stroke="#059669" strokeWidth="1.2" />
            <text x="6" y="16" className="text-[6px] font-bold fill-emerald-900">9</text>
            <text x="22" y="26" className="text-[6px] font-bold fill-emerald-900">12</text>
            <text x="25" y="13" className="text-[6.5px] font-black fill-emerald-700">15</text>
          </svg>
        ),
        value: 'Átfogó: c = 15 cm (3 · 5)'
      },
      {
        id: 'pt-m18',
        prompt: 'c = 41 cm és a = 9 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="14" className="text-[6.5px] font-bold fill-slate-700" textAnchor="middle">1681 - 81</text>
            <text x="27" y="24" className="text-[7.5px] font-black fill-rose-800" textAnchor="middle">= 1600</text>
          </svg>
        ),
        value: 'Befogó: b = 40 cm (√1600)'
      },
      {
        id: 'pt-m19',
        prompt: 'a = 2 cm és b = 3 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="12,8 12,22 30,22" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
            <text x="35" y="17" className="text-[7px] font-black fill-amber-800">√13</text>
          </svg>
        ),
        value: 'Átfogó: c = √13 ≈ 3,61 cm'
      },
      {
        id: 'pt-m20',
        prompt: 'a = 4 cm és b = 4 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="12,6 12,22 28,22" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.2" />
            <text x="35" y="17" className="text-[7px] font-black fill-blue-800">4√2</text>
          </svg>
        ),
        value: 'Átfogó: c = √32 = 4√2 cm'
      },
      {
        id: 'pt-m21',
        prompt: 'c = 25 cm és a = 24 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="14" className="text-[6.5px] font-bold fill-slate-700" textAnchor="middle">625 - 576</text>
            <text x="27" y="24" className="text-[7.5px] font-black fill-emerald-800" textAnchor="middle">= 49</text>
          </svg>
        ),
        value: 'Befogó: b = 7 cm (√49)'
      },
      {
        id: 'pt-m22',
        prompt: 'a = 8 cm és b = 6 cm háromszög',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="10,6 10,22 34,22" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
            <text x="20" y="17" className="text-[7px] font-black fill-amber-900">T=24</text>
          </svg>
        ),
        value: 'Terület: T = 24 cm² (6 · 8 / 2)'
      },
      {
        id: 'pt-m23',
        prompt: 'a = 5 cm és b = 12 cm háromszög',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="10,8 10,22 42,22" fill="#fdf4ff" stroke="#7e22ce" strokeWidth="1.2" />
            <text x="24" y="17" className="text-[7px] font-black fill-purple-900">T=30</text>
          </svg>
        ),
        value: 'Terület: T = 30 cm² (5 · 12 / 2)'
      },
      {
        id: 'pt-m24',
        prompt: 'Rácspontok: Δx = 6, Δy = 8',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="10" y1="20" x2="34" y2="20" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="34" y1="20" x2="34" y2="6" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="10" y1="20" x2="34" y2="6" stroke="#dc2626" strokeWidth="2" />
            <text x="18" y="11" className="text-[6px] font-bold fill-rose-600">d = 10</text>
          </svg>
        ),
        value: 'Ferde távolság: d = 10 egység'
      }
    ]
  }
};

export const PythagorasTheoremMatcher: React.FC<PythagorasTheoremMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g8-pyth-theorem-matcher',
  topicTitle = 'A Pitagorasz-tétel Párosító'
}) => {
  const currentConfig = matcherLevels[level] || matcherLevels[1];

  return (
    <MatcherTemplate
      key={`matcher-lvl-${level}`}
      level={level}
      currentLevel={level}
      pairs={currentConfig.pairs}
      levels={matcherLevels}
      title={currentConfig.title}
      subtitle={currentConfig.subtitle}
      badge="8. Osztály • Pitagorasz-tétel"
      topicBadge="📐 2. Lecke • A Pitagorasz-tétel"
      topicTitle={topicTitle}
      topicId={topicId}
      chapterId="pitagorasz-tetel"
      grade={8}
      themeColor="orange"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
};
