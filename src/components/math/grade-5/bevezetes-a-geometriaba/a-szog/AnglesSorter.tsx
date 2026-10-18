import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface AnglesSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const AnglesSorter: React.FC<AnglesSorterProps> = ({
  onBack,
  onSwitchToTheory,
  level,
  onNextLevel,
  onOpenRules
}) => {
  const safeLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
    setCurrentLevel(nextLevel);
  }, [level]);

  const levels: Record<DifficultyLevel, SorterLevelConfig> = {
    // ========================================================
    // 1. SZINT: HEGYESSZÖG vs. DERÉKSZÖG vs. TOMPASZÖG
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-acute',
          name: 'Hegyesszög',
          description: '0° < α < 90° (kisebb mint a derékszög)',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-right',
          name: 'Derékszög',
          description: 'α = 90° (egymásra merőleges szögszárak)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-obtuse',
          name: 'Tompaszög',
          description: '90° < α < 180° (nagyobb a derékszögnél, kisebb az egyenesszögnél)',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        }
      ],
      items: [
        {
          id: 'i1-1',
          label: '25°',
          category: 'cat-acute',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <line x1="6" y1="24" x2="26" y2="24" stroke="#f59e0b" strokeWidth="2" />
              <line x1="6" y1="24" x2="24" y2="15" stroke="#f59e0b" strokeWidth="2" />
              <circle cx="6" cy="24" r="2.5" fill="#b45309" />
            </svg>
          )
        },
        {
          id: 'i1-2',
          label: '90°',
          category: 'cat-right',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <line x1="8" y1="24" x2="24" y2="24" stroke="#10b981" strokeWidth="2" />
              <line x1="8" y1="24" x2="8" y2="8" stroke="#10b981" strokeWidth="2" />
              <path d="M 15 24 A 7 7 0 0 0 8 17" fill="none" stroke="#059669" strokeWidth="1.2" />
              <circle cx="11.5" cy="20.5" r="0.9" fill="#047857" />
            </svg>
          )
        },
        {
          id: 'i1-3',
          label: '135°',
          category: 'cat-obtuse',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <line x1="16" y1="24" x2="28" y2="24" stroke="#3b82f6" strokeWidth="2" />
              <line x1="16" y1="24" x2="6" y2="14" stroke="#3b82f6" strokeWidth="2" />
              <circle cx="16" cy="24" r="2.5" fill="#1d4ed8" />
            </svg>
          )
        },
        {
          id: 'i1-4',
          label: '45°',
          category: 'cat-acute',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <line x1="6" y1="24" x2="26" y2="24" stroke="#f59e0b" strokeWidth="2" />
              <line x1="6" y1="24" x2="20" y2="10" stroke="#f59e0b" strokeWidth="2" />
              <circle cx="6" cy="24" r="2.5" fill="#b45309" />
            </svg>
          )
        },
        {
          id: 'i1-5',
          label: 'Óralap 3:00 állása',
          category: 'cat-right',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="13" stroke="#10b981" strokeWidth="1.5" />
              <line x1="16" y1="16" x2="16" y2="7" stroke="#059669" strokeWidth="2" />
              <line x1="16" y1="16" x2="25" y2="16" stroke="#059669" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i1-6',
          label: '110°',
          category: 'cat-obtuse',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <line x1="18" y1="24" x2="28" y2="24" stroke="#3b82f6" strokeWidth="2" />
              <line x1="18" y1="24" x2="10" y2="8" stroke="#3b82f6" strokeWidth="2" />
              <circle cx="18" cy="24" r="2.5" fill="#1d4ed8" />
            </svg>
          )
        },
        {
          id: 'i1-7',
          label: '89° (majdnem derék)',
          category: 'cat-acute',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <line x1="8" y1="24" x2="26" y2="24" stroke="#f59e0b" strokeWidth="2" />
              <line x1="8" y1="24" x2="9" y2="6" stroke="#f59e0b" strokeWidth="2" />
              <circle cx="8" cy="24" r="2.5" fill="#b45309" />
            </svg>
          )
        },
        {
          id: 'i1-8',
          label: '91° (épp nagyobb)',
          category: 'cat-obtuse',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <line x1="12" y1="24" x2="28" y2="24" stroke="#3b82f6" strokeWidth="2" />
              <line x1="12" y1="24" x2="10" y2="6" stroke="#3b82f6" strokeWidth="2" />
              <circle cx="12" cy="24" r="2.5" fill="#1d4ed8" />
            </svg>
          )
        },
        {
          id: 'i1-9',
          label: 'Szabályos háromszög szöge (60°)',
          category: 'cat-acute',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,6 4,26 28,26" stroke="#f59e0b" strokeWidth="1.5" fill="#fef3c7" />
            </svg>
          )
        },
        {
          id: 'i1-10',
          label: 'Négyzet sarka (90°)',
          category: 'cat-right',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="6" y="6" width="20" height="20" stroke="#10b981" strokeWidth="1.5" fill="#d1fae5" />
            </svg>
          )
        },
        {
          id: 'i1-11',
          label: 'Óralap 4:00 állása (120°)',
          category: 'cat-obtuse',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="13" stroke="#3b82f6" strokeWidth="1.5" />
              <line x1="16" y1="16" x2="16" y2="6" stroke="#2563eb" strokeWidth="2" />
              <line x1="16" y1="16" x2="25" y2="22" stroke="#2563eb" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i1-12',
          label: 'Óralap 1:00 állása (30°)',
          category: 'cat-acute',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="13" stroke="#f59e0b" strokeWidth="1.5" />
              <line x1="16" y1="16" x2="16" y2="6" stroke="#d97706" strokeWidth="2" />
              <line x1="16" y1="16" x2="22" y2="8" stroke="#d97706" strokeWidth="2" />
            </svg>
          )
        }
      ]
    },

    // ========================================================
    // 2. SZINT: DOMBORÚ SZÖG vs. EGYENES/TELJESSZÖG vs. HOMORÚSZÖG
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-convex',
          name: 'Domború szög',
          description: '0° < α < 180° (hegyesszög, derékszög vagy tompaszög)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-boundary',
          name: 'Egyenes- vagy Teljesszög',
          description: 'Pontosan 180° (egyenes vonal) vagy pontosan 360° (teljes kör)',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'cat-reflex',
          name: 'Homorú szög',
          description: '180° < α < 360° (nagyobb az egyenesszögnél)',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 'i2-1',
          label: '75°',
          category: 'cat-convex',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <line x1="6" y1="24" x2="26" y2="24" stroke="#10b981" strokeWidth="2" />
              <line x1="6" y1="24" x2="14" y2="8" stroke="#10b981" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i2-2',
          label: '180° (egyenes vonal)',
          category: 'cat-boundary',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <line x1="4" y1="20" x2="28" y2="20" stroke="#7c3aed" strokeWidth="2.5" />
              <circle cx="16" cy="20" r="2.5" fill="#5b21b6" />
            </svg>
          )
        },
        {
          id: 'i2-3',
          label: '210°',
          category: 'cat-reflex',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <line x1="16" y1="16" x2="28" y2="16" stroke="#f43f5e" strokeWidth="2" />
              <line x1="16" y1="16" x2="6" y2="22" stroke="#f43f5e" strokeWidth="2" />
              <path d="M10 20 A9 9 0 1 0 25 16" stroke="#e11d48" strokeWidth="1.2" strokeDasharray="2 2" fill="none" />
            </svg>
          )
        },
        {
          id: 'i2-4',
          label: '140°',
          category: 'cat-convex',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <line x1="18" y1="22" x2="28" y2="22" stroke="#10b981" strokeWidth="2" />
              <line x1="18" y1="22" x2="6" y2="12" stroke="#10b981" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i2-5',
          label: '360° (egy teljes fordulat)',
          category: 'cat-boundary',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="10" stroke="#7c3aed" strokeWidth="2" fill="none" />
              <line x1="16" y1="16" x2="26" y2="16" stroke="#7c3aed" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i2-6',
          label: '270° (háromnegyed fordulat)',
          category: 'cat-reflex',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <line x1="16" y1="16" x2="26" y2="16" stroke="#f43f5e" strokeWidth="2" />
              <line x1="16" y1="16" x2="16" y2="6" stroke="#f43f5e" strokeWidth="2" />
              <path d="M16 6 A10 10 0 1 0 26 16" stroke="#e11d48" strokeWidth="1.5" fill="none" />
            </svg>
          )
        },
        {
          id: 'i2-7',
          label: 'Óralap 6:00 állása (180°)',
          category: 'cat-boundary',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="13" stroke="#7c3aed" strokeWidth="1.5" />
              <line x1="16" y1="6" x2="16" y2="26" stroke="#5b21b6" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i2-8',
          label: '300°',
          category: 'cat-reflex',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <line x1="16" y1="16" x2="26" y2="16" stroke="#f43f5e" strokeWidth="2" />
              <line x1="16" y1="16" x2="22" y2="6" stroke="#f43f5e" strokeWidth="2" />
              <path d="M22 6 A10 10 0 1 0 26 16" stroke="#e11d48" strokeWidth="1.5" fill="none" />
            </svg>
          )
        },
        {
          id: 'i2-9',
          label: '90° (derékszög)',
          category: 'cat-convex',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <line x1="8" y1="24" x2="24" y2="24" stroke="#10b981" strokeWidth="2" />
              <line x1="8" y1="24" x2="8" y2="8" stroke="#10b981" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i2-10',
          label: '195°',
          category: 'cat-reflex',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <line x1="16" y1="16" x2="28" y2="16" stroke="#f43f5e" strokeWidth="2" />
              <line x1="16" y1="16" x2="5" y2="18" stroke="#f43f5e" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i2-11',
          label: '340°',
          category: 'cat-reflex',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <line x1="16" y1="16" x2="28" y2="16" stroke="#f43f5e" strokeWidth="2" />
              <line x1="16" y1="16" x2="27" y2="12" stroke="#f43f5e" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i2-12',
          label: '50°',
          category: 'cat-convex',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <line x1="8" y1="24" x2="26" y2="24" stroke="#10b981" strokeWidth="2" />
              <line x1="8" y1="24" x2="22" y2="10" stroke="#10b981" strokeWidth="2" />
            </svg>
          )
        }
      ]
    },

    // ========================================================
    // 3. SZINT: ÓRALAP MUTATÓI ÁLTAL BEZÁRT KISEBBIK SZÖG
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-clock-acute',
          name: 'Hegyesszög az órán (< 90°)',
          description: '1 vagy 2 óraköz különbség (30° vagy 60°)',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-clock-boundary',
          name: 'Pontosan 90° vagy 180°',
          description: '3 óraköz (90° derékszög) vagy 6 óraköz (180° egyenesszög)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-clock-obtuse',
          name: 'Tompaszög az órán (> 90° és < 180°)',
          description: '4 vagy 5 óraköz különbség (120° vagy 150°)',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        }
      ],
      items: [
        {
          id: 'i3-1',
          label: '1:00 (30°)',
          category: 'cat-clock-acute',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="13" stroke="#d97706" strokeWidth="1.2" />
              <line x1="16" y1="16" x2="16" y2="6" stroke="#b45309" strokeWidth="2" />
              <line x1="16" y1="16" x2="22" y2="8" stroke="#b45309" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i3-2',
          label: '3:00 (90° derékszög)',
          category: 'cat-clock-boundary',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="13" stroke="#059669" strokeWidth="1.2" />
              <line x1="16" y1="16" x2="16" y2="6" stroke="#047857" strokeWidth="2" />
              <line x1="16" y1="16" x2="26" y2="16" stroke="#047857" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i3-3',
          label: '4:00 (120°)',
          category: 'cat-clock-obtuse',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="13" stroke="#2563eb" strokeWidth="1.2" />
              <line x1="16" y1="16" x2="16" y2="6" stroke="#1d4ed8" strokeWidth="2" />
              <line x1="16" y1="16" x2="25" y2="22" stroke="#1d4ed8" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i3-4',
          label: '2:00 (60°)',
          category: 'cat-clock-acute',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="13" stroke="#d97706" strokeWidth="1.2" />
              <line x1="16" y1="16" x2="16" y2="6" stroke="#b45309" strokeWidth="2" />
              <line x1="16" y1="16" x2="25" y2="11" stroke="#b45309" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i3-5',
          label: '5:00 (150°)',
          category: 'cat-clock-obtuse',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="13" stroke="#2563eb" strokeWidth="1.2" />
              <line x1="16" y1="16" x2="16" y2="6" stroke="#1d4ed8" strokeWidth="2" />
              <line x1="16" y1="16" x2="22" y2="25" stroke="#1d4ed8" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i3-6',
          label: '6:00 (180° egyenesszög)',
          category: 'cat-clock-boundary',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="13" stroke="#059669" strokeWidth="1.2" />
              <line x1="16" y1="6" x2="16" y2="26" stroke="#047857" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i3-7',
          label: '9:00 (90° derékszög)',
          category: 'cat-clock-boundary',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="13" stroke="#059669" strokeWidth="1.2" />
              <line x1="16" y1="16" x2="16" y2="6" stroke="#047857" strokeWidth="2" />
              <line x1="16" y1="16" x2="6" y2="16" stroke="#047857" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i3-8',
          label: '10:00 (60° hegyes)',
          category: 'cat-clock-acute',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="13" stroke="#d97706" strokeWidth="1.2" />
              <line x1="16" y1="16" x2="16" y2="6" stroke="#b45309" strokeWidth="2" />
              <line x1="16" y1="16" x2="7" y2="11" stroke="#b45309" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i3-9',
          label: '7:00 (150° tompa)',
          category: 'cat-clock-obtuse',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="13" stroke="#2563eb" strokeWidth="1.2" />
              <line x1="16" y1="16" x2="16" y2="6" stroke="#1d4ed8" strokeWidth="2" />
              <line x1="16" y1="16" x2="10" y2="25" stroke="#1d4ed8" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i3-10',
          label: '8:00 (120° tompa)',
          category: 'cat-clock-obtuse',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="13" stroke="#2563eb" strokeWidth="1.2" />
              <line x1="16" y1="16" x2="16" y2="6" stroke="#1d4ed8" strokeWidth="2" />
              <line x1="16" y1="16" x2="7" y2="22" stroke="#1d4ed8" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i3-11',
          label: '11:00 (30° hegyes)',
          category: 'cat-clock-acute',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="13" stroke="#d97706" strokeWidth="1.2" />
              <line x1="16" y1="16" x2="16" y2="6" stroke="#b45309" strokeWidth="2" />
              <line x1="16" y1="16" x2="10" y2="8" stroke="#b45309" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i3-12',
          label: '2 és fél óraköz (75° hegyes)',
          category: 'cat-clock-acute',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="13" stroke="#d97706" strokeWidth="1.2" />
              <line x1="16" y1="16" x2="16" y2="6" stroke="#b45309" strokeWidth="2" />
              <line x1="16" y1="16" x2="26" y2="13" stroke="#b45309" strokeWidth="2" />
            </svg>
          )
        }
      ]
    }
  };

  return (
    <SorterTemplate
      title="Szögek Csoportosító Játék"
      subtitle="Válogasd szét a szögeket nagyságuk, típusaik és óralap-állásaik szerint!"
      badgeText="📐 5. Osztály • III. Geometria"
      themeColor="amber"
      currentLevel={currentLevel}
      onLevelChange={setCurrentLevel}
      levels={levels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};

export default AnglesSorter;
