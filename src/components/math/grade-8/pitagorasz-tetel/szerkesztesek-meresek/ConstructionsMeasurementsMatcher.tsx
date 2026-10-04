import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ConstructionsMeasurementsMatcherProps {
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
    title: '1. Szint: Derékszögű Háromszög Alapfogalmai',
    subtitle: 'Párosítsd a háromszög elemeit a képekkel, nevükkel és alapvető tulajdonságaikkal!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Befogók (a, b)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polyline points="10,4 10,24 46,24" fill="none" stroke="#d97706" strokeWidth="2.5" />
            <path d="M 10 18 A 6 6 0 0 1 16 24" fill="none" stroke="#d97706" strokeWidth="1" />
            <circle cx="12.5" cy="21.5" r="0.8" fill="#d97706" />
            <text x="4" y="15" className="text-[6.5px] font-bold fill-amber-700">b</text>
            <text x="26" y="27" className="text-[6.5px] font-bold fill-amber-700">a</text>
          </svg>
        ),
        value: 'A derékszöget (90°) közrefogó két rövidebb oldal'
      },
      {
        id: 'p2',
        prompt: 'Átfogó (c)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="10,6 10,24 46,24" fill="#ecfdf5" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="10" y1="6" x2="46" y2="24" stroke="#059669" strokeWidth="2.5" />
            <text x="30" y="14" className="text-[7.5px] font-black fill-emerald-700">c</text>
          </svg>
        ),
        value: 'A derékszöggel szemközti leghosszabb oldal'
      },
      {
        id: 'p3',
        prompt: 'Derékszög jele (90°)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="8" y1="24" x2="46" y2="24" stroke="#475569" strokeWidth="1.5" />
            <line x1="18" y1="4" x2="18" y2="26" stroke="#475569" strokeWidth="1.5" />
            <path d="M 18 14 A 10 10 0 0 1 28 24" fill="none" stroke="#d97706" strokeWidth="1.8" />
            <circle cx="22" cy="20" r="1.5" fill="#d97706" />
            <text x="32" y="15" className="text-[7px] font-bold fill-amber-800">90°</text>
          </svg>
        ),
        value: 'Negyedkörív, benne egy ponttal'
      },
      {
        id: 'p4',
        prompt: 'Területképlet (T)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="10,6 10,24 44,24" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <text x="21" y="18" className="text-[8px] font-black fill-amber-900">T</text>
          </svg>
        ),
        value: 'T = (a · b) / 2'
      },
      {
        id: 'p5',
        prompt: 'Hegyesszögek összege',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="10,6 10,24 44,24" fill="#eef2ff" stroke="#6366f1" strokeWidth="1.2" />
            <text x="13" y="14" className="text-[6.5px] font-bold fill-indigo-700">α</text>
            <text x="34" y="22" className="text-[6.5px] font-bold fill-indigo-700">β</text>
          </svg>
        ),
        value: 'α + β = 90° (pótszögek)'
      },
      {
        id: 'p6',
        prompt: 'Körülírt kör sugara (R)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <path d="M 6 24 A 21 21 0 0 1 48 24" fill="#f5f3ff" stroke="#7e22ce" strokeWidth="1.2" />
            <line x1="6" y1="24" x2="48" y2="24" stroke="#1e293b" strokeWidth="1.5" />
            <circle cx="27" cy="24" r="1.5" fill="#7e22ce" />
            <line x1="27" y1="24" x2="48" y2="24" stroke="#a855f7" strokeWidth="2" />
            <text x="38" y="20" className="text-[6.5px] font-bold fill-purple-800">R</text>
          </svg>
        ),
        value: 'R = c / 2 (átfogó fele)'
      },
      {
        id: 'p7',
        prompt: 'Kör középpontja (O)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="6" y1="18" x2="48" y2="18" stroke="#059669" strokeWidth="2" />
            <circle cx="27" cy="18" r="2.5" fill="#047857" />
            <text x="27" y="12" className="text-[7px] font-black fill-emerald-800" textAnchor="middle">O</text>
          </svg>
        ),
        value: 'Az átfogó felezőpontja'
      },
      {
        id: 'p8',
        prompt: 'Pitagorasz-tétel',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="14" width="8" height="8" fill="#fde68a" stroke="#d97706" strokeWidth="0.8" />
            <rect x="16" y="10" width="12" height="12" fill="#fed7aa" stroke="#ea580c" strokeWidth="0.8" />
            <text x="37" y="18" className="text-[7px] font-black fill-emerald-800">a²+b²=c²</text>
          </svg>
        ),
        value: 'a² + b² = c²'
      }
    ]
  },
  2: {
    title: '2. Szint: Szerkesztési Eljárások és Nevezetes Szögek',
    subtitle: 'Kösd össze a szerkesztési lépéseket és szögviszonyokat a helyes leírásukkal!',
    pairs: [
      {
        id: 'p9',
        prompt: 'Két befogóból (a, b)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="8" y1="22" x2="44" y2="22" stroke="#d97706" strokeWidth="2" />
            <line x1="16" y1="6" x2="16" y2="22" stroke="#d97706" strokeWidth="2" />
            <path d="M 16 16 A 6 6 0 0 1 22 22" fill="none" stroke="#d97706" strokeWidth="1" />
            <circle cx="18.5" cy="19.5" r="0.7" fill="#d97706" />
            <circle cx="16" cy="6" r="1.5" fill="#b45309" />
            <circle cx="44" cy="22" r="1.5" fill="#b45309" />
          </svg>
        ),
        value: 'Derékszög C-ben, száraira a és b felmérése'
      },
      {
        id: 'p10',
        prompt: 'Átfogóból és befogóból (c, a)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="8" y1="22" x2="42" y2="22" stroke="#0284c7" strokeWidth="1.8" />
            <line x1="14" y1="6" x2="14" y2="24" stroke="#0284c7" strokeWidth="1.2" />
            <path d="M 12 11 A 28 28 0 0 1 22 6" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 1" />
            <circle cx="14" cy="9" r="1.8" fill="#0369a1" />
          </svg>
        ),
        value: 'a felmérése, C-ben merőleges, B-ből r=c körív'
      },
      {
        id: 'p11',
        prompt: 'Átfogóból és magasságból (c, mc)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <path d="M 8 22 A 19 19 0 0 1 46 22" fill="none" stroke="#a855f7" strokeWidth="1.2" />
            <line x1="8" y1="22" x2="46" y2="22" stroke="#6b21a8" strokeWidth="1.5" />
            <line x1="6" y1="12" x2="48" y2="12" stroke="#ec4899" strokeWidth="1" strokeDasharray="2 1" />
            <circle cx="17" cy="12" r="1.8" fill="#7e22ce" />
          </svg>
        ),
        value: 'Thálész-félkör és mc távolságú párhuzamos metszése'
      },
      {
        id: 'p12',
        prompt: 'Thálész-tétel',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <path d="M 8 22 A 19 19 0 0 1 46 22" fill="#f3e8ff" stroke="#a855f7" strokeWidth="1.2" />
            <polygon points="8,22 22,6 46,22" fill="none" stroke="#7e22ce" strokeWidth="1.2" />
            <circle cx="22" cy="6" r="1.5" fill="#7e22ce" />
            <text x="22" y="15" className="text-[6.5px] font-bold fill-purple-900" textAnchor="middle">90°</text>
          </svg>
        ),
        value: 'Félkörív pontjaiból az átmérő 90°-ban látszik'
      },
      {
        id: 'p13',
        prompt: 'Felezőmerőleges',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="8" y1="14" x2="46" y2="14" stroke="#475569" strokeWidth="1.5" />
            <line x1="27" y1="4" x2="27" y2="24" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="2 1" />
            <circle cx="27" cy="14" r="1.5" fill="#0369a1" />
          </svg>
        ),
        value: 'Szakasz felezése két körív metszéspontjával'
      },
      {
        id: 'p14',
        prompt: 'Átfogóhoz tartozó súlyvonal (sc)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="8,6 8,22 44,22" fill="none" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="8" y1="22" x2="26" y2="14" stroke="#4f46e5" strokeWidth="1.8" />
            <circle cx="26" cy="14" r="1.5" fill="#4338ca" />
            <text x="14" y="16" className="text-[6px] font-bold fill-indigo-700">sc</text>
          </svg>
        ),
        value: 'Hossza: sc = c / 2 = R'
      },
      {
        id: 'p15',
        prompt: 'Egyenlő szárú derékszögű',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="12,6 12,22 28,22" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
            <text x="35" y="16" className="text-[7px] font-bold fill-amber-800">45°</text>
          </svg>
        ),
        value: 'α = β = 45° és a = b'
      },
      {
        id: 'p16',
        prompt: 'Félszabályos háromszög',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="10,6 10,22 38,22" fill="#ecfdf5" stroke="#059669" strokeWidth="1.2" />
            <text x="13" y="12" className="text-[5.5px] font-bold fill-emerald-800">60°</text>
            <text x="30" y="20" className="text-[5.5px] font-bold fill-emerald-800">30°</text>
          </svg>
        ),
        value: 'Szögei: 30° - 60° - 90°'
      }
    ]
  },
  3: {
    title: '3. Szint: Területek és Pitagoraszi Számhármasok',
    subtitle: 'Párosítsd a háromszög adatait a kiszámítható hiányzó értékekkel!',
    pairs: [
      {
        id: 'p17',
        prompt: 'a = 3 cm és b = 4 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="10,6 10,22 32,22" fill="#fef3c7" stroke="#b45309" strokeWidth="1.2" />
            <text x="6" y="16" className="text-[6px] font-bold fill-amber-900">3</text>
            <text x="21" y="26" className="text-[6px] font-bold fill-amber-900">4</text>
            <text x="23" y="13" className="text-[6.5px] font-black fill-emerald-700">c=?</text>
          </svg>
        ),
        value: 'Átfogó: c = 5 cm (3² + 4² = 25)'
      },
      {
        id: 'p18',
        prompt: 'Ta = 9 cm² és Tb = 16 cm²',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="6" y="12" width="10" height="10" fill="#fde68a" stroke="#d97706" strokeWidth="0.8" />
            <rect x="18" y="8" width="14" height="14" fill="#fed7aa" stroke="#ea580c" strokeWidth="0.8" />
            <text x="40" y="18" className="text-[7.5px] font-black fill-emerald-800">Tc=?</text>
          </svg>
        ),
        value: 'Tc = 25 cm² (9 + 16 = 25)'
      },
      {
        id: 'p19',
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
        id: 'p20',
        prompt: 'Ta = 25 cm² és Tc = 169 cm²',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="14" className="text-[6.5px] font-bold fill-slate-700" textAnchor="middle">169 - 25</text>
            <text x="27" y="24" className="text-[7.5px] font-black fill-amber-800" textAnchor="middle">= 144</text>
          </svg>
        ),
        value: 'Tb = 144 cm² (b = 12 cm)'
      },
      {
        id: 'p21',
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
        id: 'p22',
        prompt: 'c = 10 cm átfogó',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="27" cy="14" r="11" fill="none" stroke="#7e22ce" strokeWidth="1" strokeDasharray="2 1" />
            <line x1="16" y1="14" x2="38" y2="14" stroke="#7e22ce" strokeWidth="1.5" />
            <circle cx="27" cy="14" r="1.5" fill="#7e22ce" />
            <text x="27" y="24" className="text-[6px] font-bold fill-purple-900" textAnchor="middle">R = 5</text>
          </svg>
        ),
        value: 'Körülírt kör sugara: R = 5 cm (c / 2)'
      },
      {
        id: 'p23',
        prompt: 'a = 6 cm és b = 8 cm terület',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="10,6 10,22 34,22" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
            <text x="20" y="17" className="text-[7px] font-black fill-amber-900">T=24</text>
          </svg>
        ),
        value: 'T = 24 cm² (6 · 8 / 2)'
      },
      {
        id: 'p24',
        prompt: 'Rácspontok: Δx = 4, Δy = 3',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="10" y1="20" x2="34" y2="20" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="34" y1="20" x2="34" y2="8" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="10" y1="20" x2="34" y2="8" stroke="#dc2626" strokeWidth="2" />
            <text x="20" y="12" className="text-[6px] font-bold fill-rose-600">d = 5</text>
          </svg>
        ),
        value: 'Ferde szakasz hossza: d = 5 egység'
      }
    ]
  }
};

export const ConstructionsMeasurementsMatcher: React.FC<ConstructionsMeasurementsMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g8-pyth-constructions-matcher',
  topicTitle = 'Szerkesztések és Mérések Párosító'
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
      topicBadge="📐 1. Lecke • Szerkesztések, Mérések"
      topicTitle={topicTitle}
      topicId={topicId}
      chapterId="pitagorasz-tetel"
      grade={8}
      themeColor="amber"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
};

export default ConstructionsMeasurementsMatcher;
