import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PythagorasApplicationsMatcherProps {
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
    title: '1. Szint: Négyzetek és Téglalapok Átlói',
    subtitle: 'Párosítsd a négyszögek oldalait a kiszámított átlóik hosszával!',
    pairs: [
      {
        id: 'pa-m1-1',
        prompt: 'Téglalap: a = 3 cm, b = 4 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="10" y="6" width="34" height="16" fill="#f8fafc" stroke="#059669" strokeWidth="1.2" />
            <line x1="10" y1="22" x2="44" y2="6" stroke="#059669" strokeWidth="1.4" />
          </svg>
        ),
        value: 'd = 5 cm (3² + 4² = 25)'
      },
      {
        id: 'pa-m1-2',
        prompt: 'Téglalap: a = 6 cm, b = 8 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="5" width="38" height="18" fill="#f8fafc" stroke="#059669" strokeWidth="1.2" />
            <line x1="8" y1="23" x2="46" y2="5" stroke="#059669" strokeWidth="1.4" />
          </svg>
        ),
        value: 'd = 10 cm (6² + 8² = 100)'
      },
      {
        id: 'pa-m1-3',
        prompt: 'Téglalap: a = 5 cm, b = 12 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="6" y="7" width="42" height="14" fill="#f8fafc" stroke="#059669" strokeWidth="1.2" />
            <line x1="6" y1="21" x2="48" y2="7" stroke="#059669" strokeWidth="1.4" />
          </svg>
        ),
        value: 'd = 13 cm (25 + 144 = 169)'
      },
      {
        id: 'pa-m1-4',
        prompt: 'Téglalap: a = 8 cm, b = 15 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="6" y="8" width="42" height="12" fill="#f8fafc" stroke="#059669" strokeWidth="1.2" />
            <line x1="6" y1="20" x2="48" y2="8" stroke="#059669" strokeWidth="1.4" />
          </svg>
        ),
        value: 'd = 17 cm (64 + 225 = 289)'
      },
      {
        id: 'pa-m1-5',
        prompt: 'Négyzet: a = 4 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="18" y="5" width="18" height="18" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.2" />
            <line x1="18" y1="23" x2="36" y2="5" stroke="#0284c7" strokeWidth="1.4" />
          </svg>
        ),
        value: 'd = 4√2 cm (≈ 5,66 cm)'
      },
      {
        id: 'pa-m1-6',
        prompt: 'Négyzet: a = 6 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="18" y="5" width="18" height="18" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.2" />
            <line x1="18" y1="23" x2="36" y2="5" stroke="#0284c7" strokeWidth="1.4" />
          </svg>
        ),
        value: 'd = 6√2 cm (≈ 8,49 cm)'
      },
      {
        id: 'pa-m1-7',
        prompt: 'Négyzet: a = 10 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="18" y="5" width="18" height="18" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.2" />
            <line x1="18" y1="23" x2="36" y2="5" stroke="#0284c7" strokeWidth="1.4" />
          </svg>
        ),
        value: 'd = 10√2 cm (≈ 14,14 cm)'
      },
      {
        id: 'pa-m1-8',
        prompt: 'Négyzet átlója: d = 10√2 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="18" y="5" width="18" height="18" fill="#f8fafc" stroke="#d97706" strokeWidth="1.2" />
            <line x1="18" y1="23" x2="36" y2="5" stroke="#d97706" strokeWidth="1.4" />
          </svg>
        ),
        value: 'Oldal: a = 10 cm (d / √2)'
      }
    ]
  },
  2: {
    title: '2. Szint: Háromszögek Magassága és Területe',
    subtitle: 'Párosítsd a háromszögek adatait a magasságukkal vagy területükkel!',
    pairs: [
      {
        id: 'pa-m2-1',
        prompt: 'Egyenlő szárú: a = 12 cm, b = 10 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="10,23 44,23 27,5" fill="#f8fafc" stroke="#059669" strokeWidth="1.2" />
            <line x1="27" y1="5" x2="27" y2="23" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="2 1" />
          </svg>
        ),
        value: 'Magasság: m = 8 cm (10² - 6² = 64)'
      },
      {
        id: 'pa-m2-2',
        prompt: 'Egyenlő szárú: a = 16 cm, b = 10 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="8,23 46,23 27,7" fill="#f8fafc" stroke="#059669" strokeWidth="1.2" />
            <line x1="27" y1="7" x2="27" y2="23" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="2 1" />
          </svg>
        ),
        value: 'Magasság: m = 6 cm (10² - 8² = 36)'
      },
      {
        id: 'pa-m2-3',
        prompt: 'Egyenlő szárú: a = 10 cm, b = 13 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="12,23 42,23 27,5" fill="#f8fafc" stroke="#059669" strokeWidth="1.2" />
            <line x1="27" y1="5" x2="27" y2="23" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="2 1" />
          </svg>
        ),
        value: 'Magasság: m = 12 cm (13² - 5² = 144)'
      },
      {
        id: 'pa-m2-4',
        prompt: 'Egyenlő szárú: a = 6 cm, b = 5 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="14,23 40,23 27,5" fill="#f8fafc" stroke="#059669" strokeWidth="1.2" />
            <line x1="27" y1="5" x2="27" y2="23" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="2 1" />
          </svg>
        ),
        value: 'Terület: T = 12 cm² (m = 4 cm)'
      },
      {
        id: 'pa-m2-5',
        prompt: 'Szabályos háromszög: a = 6 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="12,23 42,23 27,6" fill="#f8fafc" stroke="#d97706" strokeWidth="1.2" />
            <line x1="27" y1="6" x2="27" y2="23" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="2 1" />
          </svg>
        ),
        value: 'Magasság: m = 3√3 cm (≈ 5,2 cm)'
      },
      {
        id: 'pa-m2-6',
        prompt: 'Szabályos háromszög: a = 10 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="12,23 42,23 27,6" fill="#f8fafc" stroke="#d97706" strokeWidth="1.2" />
            <line x1="27" y1="6" x2="27" y2="23" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="2 1" />
          </svg>
        ),
        value: 'Magasság: m = 5√3 cm (≈ 8,66 cm)'
      },
      {
        id: 'pa-m2-7',
        prompt: 'Szabályos háromszög: a = 4 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="14,23 40,23 27,7" fill="#f8fafc" stroke="#d97706" strokeWidth="1.2" />
          </svg>
        ),
        value: 'Terület: T = 4√3 cm² (≈ 6,93 cm²)'
      },
      {
        id: 'pa-m2-8',
        prompt: 'Szabályos háromszög: a = 8 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="12,23 42,23 27,6" fill="#f8fafc" stroke="#d97706" strokeWidth="1.2" />
          </svg>
        ),
        value: 'Terület: T = 16√3 cm² (≈ 27,7 cm²)'
      }
    ]
  },
  3: {
    title: '3. Szint: Rombusz, Trapéz, Kör és Gyakorlati Számítások',
    subtitle: 'Párosítsd a sokoldalú síkbeli alakzatokat a kiszámított eredményekkel!',
    pairs: [
      {
        id: 'pa-m3-1',
        prompt: 'Rombusz: e = 16 cm, f = 12 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="27,4 47,14 27,24 7,14" fill="#f8fafc" stroke="#059669" strokeWidth="1.2" />
            <line x1="7" y1="14" x2="47" y2="14" stroke="#059669" strokeWidth="1" strokeDasharray="2 1" />
            <line x1="27" y1="4" x2="27" y2="24" stroke="#059669" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        ),
        value: 'Oldal: a = 10 cm (8² + 6² = 100)'
      },
      {
        id: 'pa-m3-2',
        prompt: 'Rombusz: e = 24 cm, f = 10 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="27,4 47,14 27,24 7,14" fill="#f8fafc" stroke="#059669" strokeWidth="1.2" />
          </svg>
        ),
        value: 'Oldal: a = 13 cm (12² + 5² = 169)'
      },
      {
        id: 'pa-m3-3',
        prompt: 'Szimm. trapéz: a = 20, c = 8, b = 10 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="7,23 47,23 37,8 17,8" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.2" />
            <line x1="37" y1="8" x2="37" y2="23" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="2 1" />
          </svg>
        ),
        value: 'Magasság: m = 8 cm (x = 6 cm)'
      },
      {
        id: 'pa-m3-4',
        prompt: 'Szimm. trapéz: a = 16, c = 6, b = 13 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="8,23 46,23 35,7 19,7" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.2" />
          </svg>
        ),
        value: 'Magasság: m = 12 cm (x = 5 cm)'
      },
      {
        id: 'pa-m3-5',
        prompt: 'Kör érintője: r = 6 cm, d = 10 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="16" cy="14" r="9" fill="#f8fafc" stroke="#059669" strokeWidth="1.2" />
            <line x1="16" y1="14" x2="44" y2="14" stroke="#64748b" strokeWidth="1" strokeDasharray="2 1" />
            <line x1="44" y1="14" x2="22" y2="7" stroke="#dc2626" strokeWidth="1.2" />
          </svg>
        ),
        value: 'Érintőszakasz: e = 8 cm (10² - 6² = 64)'
      },
      {
        id: 'pa-m3-6',
        prompt: 'Kör érintője: r = 5 cm, d = 13 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="16" cy="14" r="8" fill="#f8fafc" stroke="#059669" strokeWidth="1.2" />
            <line x1="44" y1="14" x2="21" y2="7" stroke="#dc2626" strokeWidth="1.2" />
          </svg>
        ),
        value: 'Érintőszakasz: e = 12 cm (13² - 5² = 144)'
      },
      {
        id: 'pa-m3-7',
        prompt: 'Létra a falnál: h = 5 m, táv = 3 m',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="12" y1="5" x2="12" y2="23" stroke="#334155" strokeWidth="2" />
            <line x1="12" y1="23" x2="42" y2="23" stroke="#334155" strokeWidth="1.5" />
            <line x1="12" y1="7" x2="36" y2="23" stroke="#059669" strokeWidth="2" />
          </svg>
        ),
        value: 'Falmagasság: m = 4 m (5² - 3² = 16)'
      },
      {
        id: 'pa-m3-8',
        prompt: 'Képernyő: 30 cm × 40 cm TV',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="6" width="38" height="16" rx="2" fill="#0f172a" stroke="#475569" strokeWidth="1.5" />
            <line x1="8" y1="22" x2="46" y2="6" stroke="#059669" strokeWidth="1.5" />
          </svg>
        ),
        value: 'Képátló: d = 50 cm (30² + 40² = 2500)'
      }
    ]
  }
};

export const PythagorasApplicationsMatcher: React.FC<PythagorasApplicationsMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g8-pyth-applications-matcher',
  topicTitle = 'A Pitagorasz-tétel alkalmazásai'
}) => {
  const currentConfig = matcherLevels[level] || matcherLevels[1];

  return (
    <MatcherTemplate
      key={`pa-matcher-lvl-${level}`}
      level={level}
      currentLevel={level}
      pairs={currentConfig.pairs}
      levels={matcherLevels}
      levelsConfig={matcherLevels}
      title={currentConfig.title || 'Párosító Játék • Síkbeli és Gyakorlati Alkalmazások'}
      subtitle={currentConfig.subtitle || 'Kösd össze a megadott síkidomok adatait a helyes eredménnyel!'}
      badge="8. Osztály • Pitagorasz-tétel"
      topicBadge="🔷 4. Lecke • Alkalmazások"
      badgeText="8. Osztály • Pitagorasz-tétel"
      topicId={topicId}
      topicTitle={topicTitle}
      chapterId="pitagorasz-tetel"
      grade={8}
      themeColor="emerald"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
};

export default PythagorasApplicationsMatcher;
