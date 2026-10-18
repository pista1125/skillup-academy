import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface PolygonsMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const PolygonsMatcher: React.FC<PolygonsMatcherProps> = ({
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
    // 1. SZINT: SOKSZÖGEK ALAPJAI ÉS HÁROMSZÖGEK
    // ========================================================
    1: {
      title: '1. Szint: Sokszögek és háromszögek',
      subtitle: 'Párosítsd a sokszögek és háromszögek nevét a tulajdonságaikkal és ábráikkal!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'Háromszög (n = 3)',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 40 32" fill="none">
              <polygon points="20,4 6,28 34,28" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="20" cy="4" r="2" fill="#0f766e" />
              <circle cx="6" cy="28" r="2" fill="#0f766e" />
              <circle cx="34" cy="28" r="2" fill="#0f766e" />
            </svg>
          ),
          value: '3 oldal, 3 csúcs, 0 átló, belső szögek összege 180°'
        },
        {
          id: 'p1-2',
          prompt: 'Szabályos háromszög',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 40 32" fill="none">
              <polygon points="20,4 5,30 35,30" fill="#fef3c7" stroke="#d97706" strokeWidth="2" strokeLinejoin="round" />
              <text x="20" y="24" className="text-[7px] font-black fill-amber-900" textAnchor="middle">60°</text>
            </svg>
          ),
          value: 'Mind a 3 oldala és mind a 3 szöge egyenlő (szögei 60°-osak)'
        },
        {
          id: 'p1-3',
          prompt: 'Egyenlő szárú háromszög',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 40 32" fill="none">
              <polygon points="20,4 8,28 32,28" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" strokeLinejoin="round" />
              <line x1="13" y1="16" x2="15" y2="15" stroke="#4338ca" strokeWidth="1.5" />
              <line x1="25" y1="15" x2="27" y2="16" stroke="#4338ca" strokeWidth="1.5" />
            </svg>
          ),
          value: 'Két oldala (szárai) egyenlő, az alapon fekvő két szöge egyenlő'
        },
        {
          id: 'p1-4',
          prompt: 'Derékszögű háromszög',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 40 32" fill="none">
              <polygon points="8,6 8,28 34,28" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" strokeLinejoin="round" />
              <path d="M 16 28 A 8 8 0 0 0 8 20" fill="none" stroke="#15803d" strokeWidth="1.2" />
              <circle cx="12" cy="24" r="1" fill="#15803d" />
            </svg>
          ),
          value: 'Van 1 derékszöge (90°), amit negyedkörívvel és ponttal jelölünk'
        },
        {
          id: 'p1-5',
          prompt: 'Tompaszögű háromszög',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 40 32" fill="none">
              <polygon points="12,12 4,28 36,28" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="1.8" fill="#b91c1c" />
            </svg>
          ),
          value: 'Van 1 tompaszöge (> 90°), másik két szöge hegyesszög'
        },
        {
          id: 'p1-6',
          prompt: 'Átló definíciója',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 40 32" fill="none">
              <polygon points="6,6 34,6 34,26 6,26" fill="#f3f4f6" stroke="#6b7280" strokeWidth="1.5" />
              <line x1="6" y1="6" x2="34" y2="26" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
              <circle cx="6" cy="6" r="2" fill="#ef4444" />
              <circle cx="34" cy="26" r="2" fill="#ef4444" />
            </svg>
          ),
          value: 'Két nem szomszédos csúcsot összekötő belső egyenes szakasz'
        },
        {
          id: 'p1-7',
          prompt: 'Négyszög (n = 4)',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 40 32" fill="none">
              <polygon points="10,6 32,4 36,26 6,28" fill="#fae8ff" stroke="#a855f7" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="10" cy="6" r="1.8" fill="#7e22ce" />
              <circle cx="32" cy="4" r="1.8" fill="#7e22ce" />
              <circle cx="36" cy="26" r="1.8" fill="#7e22ce" />
              <circle cx="6" cy="28" r="1.8" fill="#7e22ce" />
            </svg>
          ),
          value: '4 oldal, 4 csúcs, pontosan 2 átló, belső szögek összege 360°'
        },
        {
          id: 'p1-8',
          prompt: 'Háromszög-egyenlőtlenség',
          promptFigure: (
            <div className="text-center font-black text-xs text-teal-800 dark:text-teal-300">
              a + b &gt; c
            </div>
          ),
          value: 'Bármely két oldal összegének nagyobbnak kell lennie a harmadiknál'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: NÉGYSZÖGEK ÉS SOKSZÖGEK TULAJDONSÁGAI
    // ========================================================
    2: {
      title: '2. Szint: Négyszögek és sokszögek',
      subtitle: 'Párosítsd a négyszögeket és sokszögeket a speciális tulajdonságaikkal!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'Négyzet',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="5" y="5" width="22" height="22" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
              <path d="M 11 27 A 6 6 0 0 0 5 21" fill="none" stroke="#047857" strokeWidth="1" />
              <circle cx="8" cy="24" r="0.8" fill="#047857" />
            </svg>
          ),
          value: '4 egyenlő oldal, 4 derékszög, átlói egyenlők és merőlegesek'
        },
        {
          id: 'p2-2',
          prompt: 'Téglalap',
          promptFigure: (
            <svg className="w-12 h-9 mx-auto" viewBox="0 0 40 28" fill="none">
              <rect x="4" y="6" width="32" height="16" fill="#e0e7ff" stroke="#4338ca" strokeWidth="2" />
              <path d="M 10 22 A 6 6 0 0 0 4 16" fill="none" stroke="#3730a3" strokeWidth="1" />
              <circle cx="7" cy="19" r="0.8" fill="#3730a3" />
            </svg>
          ),
          value: 'Szemközti oldalai párhuzamosak és egyenlők, 4 derékszöge van'
        },
        {
          id: 'p2-3',
          prompt: 'Rombusz',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,4 28,16 16,28 4,16" fill="#fef3c7" stroke="#d97706" strokeWidth="2" strokeLinejoin="round" />
              <line x1="16" y1="4" x2="16" y2="28" stroke="#b45309" strokeWidth="1" strokeDasharray="2 1" />
              <line x1="4" y1="16" x2="28" y2="16" stroke="#b45309" strokeWidth="1" strokeDasharray="2 1" />
            </svg>
          ),
          value: '4 egyenlő oldal, átlói merőlegesek egymásra és felezik a szögeket'
        },
        {
          id: 'p2-4',
          prompt: 'Paralelogramma',
          promptFigure: (
            <svg className="w-12 h-9 mx-auto" viewBox="0 0 40 28" fill="none">
              <polygon points="10,6 36,6 30,22 4,22" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          ),
          value: 'Szemközti oldalai párhuzamosak és egyenlők, átlói felezik egymást'
        },
        {
          id: 'p2-5',
          prompt: 'Trapéz',
          promptFigure: (
            <svg className="w-12 h-9 mx-auto" viewBox="0 0 40 28" fill="none">
              <polygon points="12,6 28,6 36,22 4,22" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" strokeLinejoin="round" />
              <line x1="12" y1="6" x2="28" y2="6" stroke="#c2410c" strokeWidth="2.5" />
              <line x1="4" y1="22" x2="36" y2="22" stroke="#c2410c" strokeWidth="2.5" />
            </svg>
          ),
          value: 'Legalább egy párhuzamos oldalpárja van (az alapok)'
        },
        {
          id: 'p2-6',
          prompt: 'Deltoid',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,3 26,12 16,29 6,12" fill="#fce7f3" stroke="#db2777" strokeWidth="2" strokeLinejoin="round" />
              <line x1="16" y1="3" x2="16" y2="29" stroke="#be185d" strokeWidth="1" strokeDasharray="2 1" />
              <line x1="6" y1="12" x2="26" y2="12" stroke="#be185d" strokeWidth="1" strokeDasharray="2 1" />
            </svg>
          ),
          value: 'Két-két szomszédos oldala egyenlő, átlói merőlegesek'
        },
        {
          id: 'p2-7',
          prompt: 'Szabályos ötszög (n = 5)',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,3 29,12 24,27 8,27 3,12" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          ),
          value: '5 egyenlő oldal, 5 egyenlő szög (108°), összesen 5 átló'
        },
        {
          id: 'p2-8',
          prompt: 'Szabályos hatszög (n = 6)',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,3 27,9 27,23 16,29 5,23 5,9" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          ),
          value: '6 egyenlő oldal, 9 átló, 6 db szabályos háromszögre bontható a középpontból'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: A KÖR ANATÓMIÁJA ÉS KÉPLETEK
    // ========================================================
    3: {
      title: '3. Szint: A kör részei és sokszög-képletek',
      subtitle: 'Párosítsd a kör fogalmait és a sokszögek alapvető képleteit!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'Sugár (r)',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="13" stroke="#0d9488" strokeWidth="1.5" />
              <line x1="16" y1="16" x2="29" y2="16" stroke="#0f766e" strokeWidth="2.5" />
              <circle cx="16" cy="16" r="2" fill="#0f766e" />
            </svg>
          ),
          value: 'A kör középpontját a körvonal tetszőleges pontjával összekötő szakasz (r = d : 2)'
        },
        {
          id: 'p3-2',
          prompt: 'Átmérő (d)',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="13" stroke="#0d9488" strokeWidth="1.5" />
              <line x1="3" y1="16" x2="29" y2="16" stroke="#b45309" strokeWidth="2.5" />
              <circle cx="16" cy="16" r="2" fill="#b45309" />
            </svg>
          ),
          value: 'A középponton áthaladó húr, a leghosszabb szakasz a körben (d = 2 · r)'
        },
        {
          id: 'p3-3',
          prompt: 'Húr',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="13" stroke="#94a3b8" strokeWidth="1.5" />
              <line x1="6" y1="10" x2="26" y2="22" stroke="#6366f1" strokeWidth="2.5" />
              <circle cx="6" cy="10" r="2" fill="#4338ca" />
              <circle cx="26" cy="22" r="2" fill="#4338ca" />
            </svg>
          ),
          value: 'A körvonal két tetszőleges pontját összekötő szakasz'
        },
        {
          id: 'p3-4',
          prompt: 'Körcikk',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="13" stroke="#e2e8f0" strokeWidth="1" />
              <path d="M 16 16 L 29 16 A 13 13 0 0 0 24 6 Z" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
              <circle cx="16" cy="16" r="1.8" fill="#c2410c" />
            </svg>
          ),
          value: 'Két sugár és egy körív által határolt síkrész (mint egy pizzaszelet)'
        },
        {
          id: 'p3-5',
          prompt: 'Körszelet',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="13" stroke="#e2e8f0" strokeWidth="1" />
              <path d="M 6 10 A 13 13 0 0 1 26 10 Z" fill="#bfdbfe" stroke="#2563eb" strokeWidth="1.5" />
            </svg>
          ),
          value: 'Egy húr és a hozzátartozó körív által határolt síkrész'
        },
        {
          id: 'p3-6',
          prompt: '1 csúcsból húzható átlók száma',
          promptFigure: (
            <div className="text-center font-black text-sm text-indigo-700 dark:text-indigo-400">
              n - 3
            </div>
          ),
          value: 'n - 3 (mert önmagába és 2 szomszédos csúcsába nem húzható átló)'
        },
        {
          id: 'p3-7',
          prompt: 'Összes átló száma',
          promptFigure: (
            <div className="text-center font-black text-xs text-emerald-700 dark:text-emerald-400">
              n · (n - 3) : 2
            </div>
          ),
          value: 'n · (n - 3) : 2 (mert minden átlónak 2 végpontja van)'
        },
        {
          id: 'p3-8',
          prompt: 'Belső szögek összege',
          promptFigure: (
            <div className="text-center font-black text-xs text-rose-700 dark:text-rose-400">
              (n - 2) · 180°
            </div>
          ),
          value: '(n - 2) · 180° (mert a sokszög egy csúcsból n - 2 háromszögre bontható)'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      title="Síkidomok és Sokszögek Párosító Játék"
      subtitle="Találd meg az összetartozó sokszögeket, háromszögeket, négyszögeket és kör-részeket!"
      badgeText="📐 5. Osztály • III. Geometria"
      themeColor="teal"
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

export default PolygonsMatcher;
