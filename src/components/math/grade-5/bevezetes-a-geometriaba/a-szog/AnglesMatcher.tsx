import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface AnglesMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const AnglesMatcher: React.FC<AnglesMatcherProps> = ({
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

  const levels: Record<DifficultyLevel, MatcherLevelConfig> = {
    // ========================================================
    // 1. SZINT: SZÖGFAJTÁK ÉS NAGYSÁGUK (ALAPOK)
    // ========================================================
    1: {
      title: '1. Szint: Szögfajták és nagyságuk',
      subtitle: 'Párosítsd a szög elnevezését a hozzá tartozó foktartománnyal és ábrával!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'Hegyesszög',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 50 40" fill="none">
              <line x1="10" y1="30" x2="45" y2="30" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="10" y1="30" x2="35" y2="10" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M22 30 A12 12 0 0 0 20 22" stroke="#d97706" strokeWidth="1.5" fill="none" />
              <circle cx="10" cy="30" r="3" fill="#b45309" />
            </svg>
          ),
          value: '0° < α < 90° (kisebb a derékszögnél)'
        },
        {
          id: 'p1-2',
          prompt: 'Derékszög',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 50 40" fill="none">
              <line x1="12" y1="32" x2="42" y2="32" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="12" y1="32" x2="12" y2="8" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 22 32 A 10 10 0 0 0 12 22" fill="none" stroke="#059669" strokeWidth="1.5" />
              <circle cx="17" cy="27" r="1.5" fill="#047857" />
              <circle cx="12" cy="32" r="3" fill="#047857" />
            </svg>
          ),
          value: 'Pontosan 90° (egymásra merőleges szárak)'
        },
        {
          id: 'p1-3',
          prompt: 'Tompaszög',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 50 40" fill="none">
              <line x1="22" y1="30" x2="45" y2="30" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="22" y1="30" x2="5" y2="12" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M34 30 A12 12 0 0 0 14 22" stroke="#2563eb" strokeWidth="1.5" fill="none" />
              <circle cx="22" cy="30" r="3" fill="#1d4ed8" />
            </svg>
          ),
          value: '90° < α < 180° (nagyobb a derékszögnél, de kisebb az egyenesszögnél)'
        },
        {
          id: 'p1-4',
          prompt: 'Egyenesszög',
          promptFigure: (
            <svg className="w-14 h-10 mx-auto" viewBox="0 0 60 40" fill="none">
              <line x1="5" y1="28" x2="55" y2="28" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="30" cy="28" r="3.5" fill="#6d28d9" />
              <path d="M42 28 A12 12 0 0 0 18 28" stroke="#7c3aed" strokeWidth="1.5" fill="#ede9fe" />
            </svg>
          ),
          value: 'Pontosan 180° (a szárak egyetlen egyenest alkotnak)'
        },
        {
          id: 'p1-5',
          prompt: 'Homorúszög',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 50 40" fill="none">
              <line x1="25" y1="20" x2="45" y2="20" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="25" y1="20" x2="10" y2="10" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M16 14 A14 14 0 1 0 39 20" stroke="#db2777" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
              <circle cx="25" cy="20" r="3" fill="#be185d" />
            </svg>
          ),
          value: '180° < α < 360° (nagyobb az egyenesszögnél)'
        },
        {
          id: 'p1-6',
          prompt: 'Teljesszög',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <line x1="20" y1="20" x2="38" y2="20" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="20" cy="20" r="11" stroke="#0891b2" strokeWidth="1.5" fill="none" />
              <circle cx="20" cy="20" r="3" fill="#0e7490" />
            </svg>
          ),
          value: 'Pontosan 360° (egy teljes fordulat, körbefordulás)'
        },
        {
          id: 'p1-7',
          prompt: 'Nullszög',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 50 40" fill="none">
              <line x1="10" y1="20" x2="45" y2="20" stroke="#64748b" strokeWidth="3" strokeLinecap="round" />
              <circle cx="10" cy="20" r="3.5" fill="#334155" />
            </svg>
          ),
          value: 'Pontosan 0° (a két szár egymásra simul, nincs nyílás)'
        },
        {
          id: 'p1-8',
          prompt: 'Szögcsúcs',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <line x1="20" y1="20" x2="36" y2="10" stroke="#cbd5e1" strokeWidth="1.5" />
              <line x1="20" y1="20" x2="36" y2="30" stroke="#cbd5e1" strokeWidth="1.5" />
              <circle cx="20" cy="20" r="4.5" fill="#ef4444" />
              <text x="10" y="24" className="text-[10px] font-black fill-rose-600">O</text>
            </svg>
          ),
          value: 'A két félegyenes (szögszár) közös kezdőpontja'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: SZÖGEK AZ ÓRALAPON ÉS SZÖGMÉRÉS
    // ========================================================
    2: {
      title: '2. Szint: Szögek az óralapon és konkrét értékek',
      subtitle: 'Párosítsd az óralap mutatóállásait és a szögértékeket a helyes válasszal!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'Óralap 3:00 vagy 9:00',
          promptFigure: (
            <svg className="w-12 h-12 mx-auto" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="17" stroke="#d97706" strokeWidth="1.5" fill="#fffbeb" />
              <line x1="20" y1="20" x2="20" y2="8" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
              <line x1="20" y1="20" x2="32" y2="20" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="20" cy="20" r="2" fill="#78350f" />
            </svg>
          ),
          value: 'Pontosan 90°-os derékszög (3 óraköz távolság)'
        },
        {
          id: 'p2-2',
          prompt: 'Óralap 6:00 állása',
          promptFigure: (
            <svg className="w-12 h-12 mx-auto" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="17" stroke="#d97706" strokeWidth="1.5" fill="#fffbeb" />
              <line x1="20" y1="20" x2="20" y2="8" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
              <line x1="20" y1="20" x2="20" y2="33" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="20" cy="20" r="2" fill="#78350f" />
            </svg>
          ),
          value: 'Pontosan 180°-os egyenesszög (fél fordulat)'
        },
        {
          id: 'p2-3',
          prompt: 'Óralap 1:00 állása',
          promptFigure: (
            <svg className="w-12 h-12 mx-auto" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="17" stroke="#d97706" strokeWidth="1.5" fill="#fffbeb" />
              <line x1="20" y1="20" x2="20" y2="8" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
              <line x1="20" y1="20" x2="26" y2="10" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="20" cy="20" r="2" fill="#78350f" />
            </svg>
          ),
          value: '30°-os hegyesszög (pontosan 1 óraköz: 360° : 12)'
        },
        {
          id: 'p2-4',
          prompt: 'Óralap 2:00 állása',
          promptFigure: (
            <svg className="w-12 h-12 mx-auto" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="17" stroke="#d97706" strokeWidth="1.5" fill="#fffbeb" />
              <line x1="20" y1="20" x2="20" y2="8" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
              <line x1="20" y1="20" x2="30" y2="15" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="20" cy="20" r="2" fill="#78350f" />
            </svg>
          ),
          value: '60°-os hegyesszög (2 óraköz: 2 × 30°)'
        },
        {
          id: 'p2-5',
          prompt: 'Óralap 4:00 állása',
          promptFigure: (
            <svg className="w-12 h-12 mx-auto" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="17" stroke="#d97706" strokeWidth="1.5" fill="#fffbeb" />
              <line x1="20" y1="20" x2="20" y2="8" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
              <line x1="20" y1="20" x2="30" y2="26" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="20" cy="20" r="2" fill="#78350f" />
            </svg>
          ),
          value: '120°-os tompaszög (4 óraköz: 4 × 30°)'
        },
        {
          id: 'p2-6',
          prompt: 'Óralap 5:00 állása',
          promptFigure: (
            <svg className="w-12 h-12 mx-auto" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="17" stroke="#d97706" strokeWidth="1.5" fill="#fffbeb" />
              <line x1="20" y1="20" x2="20" y2="8" stroke="#b45309" strokeWidth="2" strokeLinecap="round" />
              <line x1="20" y1="20" x2="26" y2="30" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="20" cy="20" r="2" fill="#78350f" />
            </svg>
          ),
          value: '150°-os tompaszög (5 óraköz: 5 × 30°)'
        },
        {
          id: 'p2-7',
          prompt: '1 óraköz nagysága az órán',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <path d="M20 20 L20 6 A14 14 0 0 1 27 8 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
              <circle cx="20" cy="20" r="2" fill="#b45309" />
            </svg>
          ),
          value: '360° : 12 = 30° minden két egymást követő óraszám között'
        },
        {
          id: 'p2-8',
          prompt: 'A percmutató elfordulása 1 perc alatt',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="15" stroke="#94a3b8" strokeWidth="1" />
              <line x1="20" y1="20" x2="20" y2="6" stroke="#0ea5e9" strokeWidth="2" />
              <line x1="20" y1="20" x2="21.5" y2="6.2" stroke="#0ea5e9" strokeWidth="2" />
            </svg>
          ),
          value: '360° : 60 = 6° fordulás percenként'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: SZÖGPÁROK ÉS MŰVELETEK
    // ========================================================
    3: {
      title: '3. Szint: Szögpárok és szögösszefüggések',
      subtitle: 'Párosítsd a szögpárokat, pótszögeket és szabályos sokszögek szögeit!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'Pótszögek',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 50 40" fill="none">
              <line x1="10" y1="32" x2="40" y2="32" stroke="#10b981" strokeWidth="2" />
              <line x1="10" y1="32" x2="10" y2="8" stroke="#10b981" strokeWidth="2" />
              <line x1="10" y1="32" x2="32" y2="15" stroke="#059669" strokeWidth="2" />
              <circle cx="10" cy="32" r="3" fill="#047857" />
            </svg>
          ),
          value: 'Két hegyesszög, amelyek összege pontosan 90°'
        },
        {
          id: 'p3-2',
          prompt: 'Kiegészítő szögek (Mellékszögek)',
          promptFigure: (
            <svg className="w-14 h-10 mx-auto" viewBox="0 0 60 40" fill="none">
              <line x1="5" y1="30" x2="55" y2="30" stroke="#6366f1" strokeWidth="2" />
              <line x1="30" y1="30" x2="42" y2="10" stroke="#4f46e5" strokeWidth="2" />
              <circle cx="30" cy="30" r="3" fill="#3730a3" />
            </svg>
          ),
          value: 'Két szög, amelyek összege pontosan 180°'
        },
        {
          id: 'p3-3',
          prompt: 'Csúcsszögek',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 50 40" fill="none">
              <line x1="8" y1="8" x2="42" y2="32" stroke="#ec4899" strokeWidth="2" />
              <line x1="8" y1="32" x2="42" y2="8" stroke="#ec4899" strokeWidth="2" />
              <circle cx="25" cy="20" r="3" fill="#be185d" />
            </svg>
          ),
          value: 'Két egyenes metszésekor egymással szemben lévő, egyenlő szögek'
        },
        {
          id: 'p3-4',
          prompt: 'Szabályos háromszög belső szögei',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <polygon points="20,8 6,32 34,32" stroke="#d97706" strokeWidth="1.5" fill="#fef3c7" />
            </svg>
          ),
          value: 'Mindhárom szöge egyenlő, pontosan 60° (összegük 180°)'
        },
        {
          id: 'p3-5',
          prompt: 'Négyzet belső szögei',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <rect x="8" y="8" width="24" height="24" stroke="#059669" strokeWidth="1.5" fill="#d1fae5" />
            </svg>
          ),
          value: 'Mind a 4 szöge pontosan 90°-os derékszög (összegük 360°)'
        },
        {
          id: 'p3-6',
          prompt: 'Szögfelező félegyenes',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 50 40" fill="none">
              <line x1="10" y1="30" x2="42" y2="30" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="10" y1="30" x2="35" y2="8" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="10" y1="30" x2="40" y2="18" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 2" />
              <circle cx="10" cy="30" r="3" fill="#d97706" />
            </svg>
          ),
          value: 'A szögcsúcsból indul és a szögtartományt 2 egyenlő részre osztja'
        },
        {
          id: 'p3-7',
          prompt: 'A 35°-os hegyesszög pótszöge',
          promptFigure: (
            <div className="text-center font-bold text-amber-700 text-xs">
              90° - 35° = ?
            </div>
          ),
          value: '55° (mert 35° + 55° = 90°)'
        },
        {
          id: 'p3-8',
          prompt: 'A 65°-os szög kiegészítő szöge',
          promptFigure: (
            <div className="text-center font-bold text-indigo-700 text-xs">
              180° - 65° = ?
            </div>
          ),
          value: '115° (mert 65° + 115° = 180°)'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      title="Szögek Párosító Játék"
      subtitle="Találd meg az összetartozó szögpárokat, szögfajtákat és mutatóállásokat!"
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

export default AnglesMatcher;
