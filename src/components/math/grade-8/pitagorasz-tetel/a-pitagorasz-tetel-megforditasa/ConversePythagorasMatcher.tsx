import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ConversePythagorasMatcherProps {
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
    title: '1. Szint: Háromszögek Szögtípusának Meghatározása',
    subtitle: 'Párosítsd az oldalhosszakat a háromszög szögek szerinti típusával!',
    pairs: [
      {
        id: 'cp-m1-1',
        prompt: 'Oldalak: 3, 4, 5 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="8,22 46,22 8,6" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
            <path d="M 8 16 A 6 6 0 0 1 14 22" fill="none" stroke="#059669" strokeWidth="1" />
            <circle cx="10" cy="20" r="0.8" fill="#059669" />
            <text x="32" y="14" className="text-[6.5px] font-black fill-emerald-800">3-4-5</text>
          </svg>
        ),
        value: 'Derékszögű (3² + 4² = 25 = 5²)'
      },
      {
        id: 'cp-m1-2',
        prompt: 'Oldalak: 4, 6, 8 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="18,22 48,22 6,8" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1.5" />
            <path d="M 16 20 A 7 7 0 0 1 12 12" fill="none" stroke="#e11d48" strokeWidth="1" />
            <text x="32" y="14" className="text-[6.5px] font-bold fill-rose-800">4-6-8</text>
          </svg>
        ),
        value: 'Tompaszögű (4² + 6² = 52 < 64 = 8²)'
      },
      {
        id: 'cp-m1-3',
        prompt: 'Oldalak: 7, 8, 9 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="8,22 46,22 28,6" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
            <text x="27" y="16" className="text-[6.5px] font-bold fill-indigo-800" textAnchor="middle">7-8-9</text>
          </svg>
        ),
        value: 'Hegyesszögű (7² + 8² = 113 > 81 = 9²)'
      },
      {
        id: 'cp-m1-4',
        prompt: 'Oldalak: 5, 12, 13 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="6,24 48,24 6,10" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
            <path d="M 6 18 A 6 6 0 0 1 12 24" fill="none" stroke="#059669" strokeWidth="1" />
            <circle cx="8" cy="22" r="0.8" fill="#059669" />
            <text x="30" y="16" className="text-[6px] font-black fill-emerald-800">5-12-13</text>
          </svg>
        ),
        value: 'Derékszögű (5² + 12² = 169 = 13²)'
      },
      {
        id: 'cp-m1-5',
        prompt: 'Oldalak: 2, 3, 6 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="6" y1="20" x2="48" y2="20" stroke="#059669" strokeWidth="2" />
            <line x1="6" y1="20" x2="18" y2="12" stroke="#b45309" strokeWidth="1.5" />
            <line x1="48" y1="20" x2="34" y2="12" stroke="#ea580c" strokeWidth="1.5" />
            <text x="27" y="10" className="text-[6px] font-black fill-red-600" textAnchor="middle">2+3 &lt; 6</text>
          </svg>
        ),
        value: 'Nem háromszög (2 + 3 = 5 ≤ 6!)'
      },
      {
        id: 'cp-m1-6',
        prompt: 'Oldalak: 6, 8, 10 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="8,22 46,22 8,6" fill="#ecfdf5" stroke="#059669" strokeWidth="1.5" />
            <path d="M 8 16 A 6 6 0 0 1 14 22" fill="none" stroke="#059669" strokeWidth="1" />
            <circle cx="10" cy="20" r="0.8" fill="#059669" />
            <text x="30" y="14" className="text-[6px] font-bold fill-emerald-800">6-8-10</text>
          </svg>
        ),
        value: 'Derékszögű (3-4-5 kétszerese)'
      },
      {
        id: 'cp-m1-7',
        prompt: 'Oldalak: 5, 5, 8 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="6,22 48,22 27,10" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1.5" />
            <text x="27" y="18" className="text-[6px] font-bold fill-rose-800" textAnchor="middle">5-5-8</text>
          </svg>
        ),
        value: 'Tompaszögű (5² + 5² = 50 < 64 = 8²)'
      },
      {
        id: 'cp-m1-8',
        prompt: 'Oldalak: 6, 6, 6 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="8,22 46,22 27,6" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
            <text x="27" y="17" className="text-[6px] font-bold fill-indigo-800" textAnchor="middle">Szabályos</text>
          </svg>
        ),
        value: 'Hegyesszögű (minden szöge 60°)'
      }
    ]
  },
  2: {
    title: '2. Szint: Pitagoraszi Számhármasok és Skálázás',
    subtitle: 'Kösd össze az alap számhármasokat a többszöröseikkel és összefüggéseikkel!',
    pairs: [
      {
        id: 'cp-m2-1',
        prompt: '(3, 4, 5) számhármas 4-szerese',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="6" width="46" height="16" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <text x="27" y="17" className="text-[7px] font-black fill-amber-900" textAnchor="middle">4 · (3, 4, 5)</text>
          </svg>
        ),
        value: '(12, 16, 20)'
      },
      {
        id: 'cp-m2-2',
        prompt: '(5, 12, 13) számhármas 2-szerese',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="6" width="46" height="16" rx="4" fill="#ecfdf5" stroke="#059669" strokeWidth="1" />
            <text x="27" y="17" className="text-[6.5px] font-black fill-emerald-900" textAnchor="middle">2 · (5, 12, 13)</text>
          </svg>
        ),
        value: '(10, 24, 26)'
      },
      {
        id: 'cp-m2-3',
        prompt: '(8, 15, 17) számhármas',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="8,22 46,22 8,8" fill="#fef3c7" stroke="#b45309" strokeWidth="1.2" />
            <text x="28" y="17" className="text-[6.5px] font-bold fill-amber-900">8-15-17</text>
          </svg>
        ),
        value: '64 + 225 = 289 = 17²'
      },
      {
        id: 'cp-m2-4',
        prompt: '(7, 24, 25) számhármas',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="6,24 48,24 6,12" fill="#ecfdf5" stroke="#059669" strokeWidth="1.2" />
            <text x="26" y="18" className="text-[6px] font-bold fill-emerald-900">7-24-25</text>
          </svg>
        ),
        value: '49 + 576 = 625 = 25²'
      },
      {
        id: 'cp-m2-5',
        prompt: 'Egyiptomi 12 csomós zsinór',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="10,22 44,22 10,8" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
            <circle cx="10" cy="15" r="1.2" fill="#d97706" />
            <circle cx="27" cy="22" r="1.2" fill="#d97706" />
            <text x="32" y="14" className="text-[5.5px] font-black fill-amber-900">12 csomó</text>
          </svg>
        ),
        value: '3 : 4 : 5 arányú derékszögű kitűzés'
      },
      {
        id: 'cp-m2-6',
        prompt: '(9, 40, 41) számhármas',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="6,24 48,24 6,14" fill="#fef3c7" stroke="#b45309" strokeWidth="1.2" />
            <text x="26" y="19" className="text-[6px] font-bold fill-amber-900">9-40-41</text>
          </svg>
        ),
        value: '81 + 1600 = 1681 = 41²'
      },
      {
        id: 'cp-m2-7',
        prompt: '(30, 40, 50) számhármas',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="6" width="46" height="16" rx="4" fill="#ecfdf5" stroke="#059669" strokeWidth="1" />
            <text x="27" y="17" className="text-[6.5px] font-black fill-emerald-900" textAnchor="middle">10 · (3, 4, 5)</text>
          </svg>
        ),
        value: 'A (3, 4, 5) 10-szerese (900 + 1600 = 2500)'
      },
      {
        id: 'cp-m2-8',
        prompt: '1, 1 és √2 oldalarány',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="12,22 36,22 12,6" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
            <path d="M 12 17 A 5 5 0 0 1 17 22" fill="none" stroke="#b45309" strokeWidth="1" />
            <circle cx="14" cy="20" r="0.6" fill="#b45309" />
            <text x="28" y="13" className="text-[6px] font-bold fill-amber-900">√2</text>
          </svg>
        ),
        value: 'Egyenlő szárú derékszögű háromszög'
      }
    ]
  },
  3: {
    title: '3. Szint: Szabályok, Feltételek és Geometriai Állítások',
    subtitle: 'Párosítsd a matematikai feltételeket a pontos geometriai jelentésükkel!',
    pairs: [
      {
        id: 'cp-m3-1',
        prompt: 'c² = a² + b² (c leghosszabb)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="16" className="text-[6.5px] font-black fill-emerald-700" textAnchor="middle">c² = a² + b²</text>
            <text x="27" y="24" className="text-[5.5px] fill-slate-500" textAnchor="middle">γ = 90°</text>
          </svg>
        ),
        value: 'A háromszög pontosan derékszögű'
      },
      {
        id: 'cp-m3-2',
        prompt: 'c² < a² + b² (c leghosszabb)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="16" className="text-[6.5px] font-black fill-indigo-700" textAnchor="middle">c² &lt; a² + b²</text>
            <text x="27" y="24" className="text-[5.5px] fill-slate-500" textAnchor="middle">γ &lt; 90°</text>
          </svg>
        ),
        value: 'A háromszög hegyesszögű'
      },
      {
        id: 'cp-m3-3',
        prompt: 'c² > a² + b² (c leghosszabb)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="16" className="text-[6.5px] font-black fill-rose-700" textAnchor="middle">c² &gt; a² + b²</text>
            <text x="27" y="24" className="text-[5.5px] fill-slate-500" textAnchor="middle">γ &gt; 90°</text>
          </svg>
        ),
        value: 'A háromszög tompaszögű'
      },
      {
        id: 'cp-m3-4',
        prompt: 'a + b ≤ c feltétel',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="16" className="text-[6.5px] font-black fill-red-600" textAnchor="middle">a + b ≤ c</text>
            <text x="27" y="24" className="text-[5.5px] fill-red-500" textAnchor="middle">Hiba!</text>
          </svg>
        ),
        value: 'A szakaszokból nem szerkeszthető háromszög'
      },
      {
        id: 'cp-m3-5',
        prompt: 'Euklidészi generáló képlet',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="14" className="text-[5.5px] font-bold fill-amber-800" textAnchor="middle">m² - n², 2mn</text>
            <text x="27" y="23" className="text-[5.5px] font-black fill-emerald-800" textAnchor="middle">m² + n²</text>
          </svg>
        ),
        value: 'Mindig pitagoraszi számhármast ad (m > n)'
      },
      {
        id: 'cp-m3-6',
        prompt: 'k · (a, b, c) szorzás (k > 0)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="17" className="text-[6.5px] font-bold fill-slate-700" textAnchor="middle">k · (a, b, c)</text>
          </svg>
        ),
        value: 'Hasonló derékszögű háromszöget hoz létre'
      },
      {
        id: 'cp-m3-7',
        prompt: 'Ta + Tb = Tc területi feltétel',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="12" width="10" height="10" fill="#fed7aa" stroke="#ea580c" strokeWidth="0.8" />
            <rect x="18" y="10" width="12" height="12" fill="#fde68a" stroke="#d97706" strokeWidth="0.8" />
            <text x="40" y="18" className="text-[6.5px] font-bold fill-emerald-800">Tc</text>
          </svg>
        ),
        value: 'A befogónégyzetek összege kiadja az átfogónégyzetet'
      },
      {
        id: 'cp-m3-8',
        prompt: 'Egyiptomi kötél csomóinak száma',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="27" cy="14" r="10" fill="none" stroke="#d97706" strokeWidth="1" strokeDasharray="3 2" />
            <text x="27" y="16" className="text-[6px] font-black fill-amber-900" textAnchor="middle">12</text>
          </svg>
        ),
        value: '12 csomó (3 + 4 + 5 = 12 egységkerület)'
      }
    ]
  }
};

export const ConversePythagorasMatcher: React.FC<ConversePythagorasMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g8-pyth-converse-matcher',
  topicTitle = 'A Pitagorasz-tétel Megfordítása'
}) => {
  const currentConfig = matcherLevels[level] || matcherLevels[1];

  return (
    <MatcherTemplate
      key={`matcher-lvl-${level}`}
      level={level}
      currentLevel={level}
      topicId={topicId}
      topicTitle={topicTitle}
      badge="8. Osztály • Pitagorasz-tétel"
      topicBadge="📐 3. Lecke • Pitagorasz-tétel Megfordítása"
      title={currentConfig.title}
      subtitle={currentConfig.subtitle}
      pairs={currentConfig.pairs}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
};

export default ConversePythagorasMatcher;
