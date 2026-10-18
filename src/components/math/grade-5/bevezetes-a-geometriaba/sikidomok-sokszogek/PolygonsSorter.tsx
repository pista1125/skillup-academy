import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface PolygonsSorterProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const PolygonsSorter: React.FC<PolygonsSorterProps> = ({
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
    // 1. SZINT: SOKSZÖGEK vs. GÖRBE IDOMOK vs. NEM SÍKIDOMOK
    // ========================================================
    1: {
      categories: [
        {
          id: 'cat-polygons',
          name: 'Sokszögek',
          description: 'Egyszerű zárt töröttvonal határolja (egyenes szakaszokból áll)',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        },
        {
          id: 'cat-curved',
          name: 'Görbe vonalú síkidomok',
          description: 'Görbe vonal (vagy ív) határolja a síkrészt, NEM sokszög',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-open',
          name: 'Nem síkidomok',
          description: 'Nyílt vonalak, önátmetsző alakzatok vagy különálló vonalak',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        {
          id: 'i1-1',
          label: 'Háromszög (3 oldal)',
          category: 'cat-polygons',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,4 4,28 28,28" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          )
        },
        {
          id: 'i1-2',
          label: 'Körlap',
          category: 'cat-curved',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="12" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i1-3',
          label: 'Nyílt töröttvonal',
          category: 'cat-open',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polyline points="4,24 12,8 20,24 28,12" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          )
        },
        {
          id: 'i1-4',
          label: 'Téglalap (4 oldal)',
          category: 'cat-polygons',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="8" width="24" height="16" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i1-5',
          label: 'Ellipszis',
          category: 'cat-curved',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <ellipse cx="16" cy="16" rx="13" ry="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i1-6',
          label: 'Önátmetsző hurkolt vonal',
          category: 'cat-open',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <path d="M 6 26 C 26 26 26 6 16 6 C 6 6 6 26 26 26" stroke="#e11d48" strokeWidth="2" fill="none" />
            </svg>
          )
        },
        {
          id: 'i1-7',
          label: 'Szabályos ötszög',
          category: 'cat-polygons',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,3 29,12 24,27 8,27 3,12" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          )
        },
        {
          id: 'i1-8',
          label: 'Körcikk (pizzaszelet)',
          category: 'cat-curved',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <path d="M 16 16 L 28 16 A 12 12 0 0 0 24 6 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i1-9',
          label: 'Párhuzamos egyenesek',
          category: 'cat-open',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <line x1="4" y1="10" x2="28" y2="10" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" />
              <line x1="4" y1="22" x2="28" y2="22" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )
        },
        {
          id: 'i1-10',
          label: 'Rombusz',
          category: 'cat-polygons',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,4 28,16 16,28 4,16" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          )
        },
        {
          id: 'i1-11',
          label: 'Félkörlap',
          category: 'cat-curved',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <path d="M 4 20 A 12 12 0 0 1 28 20 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i1-12',
          label: 'Nyílt körív',
          category: 'cat-open',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <path d="M 6 22 A 12 12 0 1 1 26 22" stroke="#e11d48" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          )
        }
      ]
    },

    // ========================================================
    // 2. SZINT: HÁROMSZÖGEK CSOPORTOSÍTÁSA
    // ========================================================
    2: {
      categories: [
        {
          id: 'cat-equilateral',
          name: 'Szabályos háromszög',
          description: 'Mind a 3 oldala és 3 szöge egyenlő (szögei 60°-osak)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-isosceles',
          name: 'Egyenlő szárú (nem szabályos)',
          description: '2 szára és az alapon fekvő 2 szöge egyenlő',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        },
        {
          id: 'cat-scalene',
          name: 'Általános (különböző oldalú)',
          description: 'Mind a 3 oldala és mind a 3 szöge különböző',
          badgeColor: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
        }
      ],
      items: [
        {
          id: 'i2-1',
          label: 'Oldalai: 5 cm, 5 cm, 5 cm',
          category: 'cat-equilateral',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,4 4,28 28,28" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i2-2',
          label: 'Szárai: 6 cm, 6 cm; alapja: 4 cm',
          category: 'cat-isosceles',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,3 7,27 25,27" fill="#e0e7ff" stroke="#4338ca" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i2-3',
          label: 'Oldalai: 3 cm, 4 cm, 5 cm (derékszögű)',
          category: 'cat-scalene',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="6,6 6,26 26,26" fill="#f1f5f9" stroke="#475569" strokeWidth="2" />
              <path d="M 13 26 A 7 7 0 0 0 6 19" fill="none" stroke="#047857" strokeWidth="1" />
              <circle cx="9.5" cy="22.5" r="0.8" fill="#047857" />
            </svg>
          )
        },
        {
          id: 'i2-4',
          label: 'Szögei: 60°, 60°, 60°',
          category: 'cat-equilateral',
          figure: (
            <div className="text-center font-bold text-[10px] text-emerald-700">60°-60°-60°</div>
          )
        },
        {
          id: 'i2-5',
          label: 'Alapi szögei: 70° és 70°, csúcsa 40°',
          category: 'cat-isosceles',
          figure: (
            <div className="text-center font-bold text-[10px] text-indigo-700">70°, 70°, 40°</div>
          )
        },
        {
          id: 'i2-6',
          label: 'Oldalai: 5 cm, 7 cm, 8 cm',
          category: 'cat-scalene',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="12,5 3,27 29,27" fill="#f1f5f9" stroke="#475569" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i2-7',
          label: '3 szimmetriatengelye van',
          category: 'cat-equilateral',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,4 4,28 28,28" stroke="#059669" strokeWidth="1.5" />
              <line x1="16" y1="4" x2="16" y2="28" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
            </svg>
          )
        },
        {
          id: 'i2-8',
          label: 'Derékszögű egyenlő szárú: 90°, 45°, 45°',
          category: 'cat-isosceles',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="6,6 6,26 26,26" fill="#e0e7ff" stroke="#4338ca" strokeWidth="2" />
              <path d="M 13 26 A 7 7 0 0 0 6 19" fill="none" stroke="#047857" strokeWidth="1" />
              <circle cx="9.5" cy="22.5" r="0.8" fill="#047857" />
            </svg>
          )
        },
        {
          id: 'i2-9',
          label: 'Szögei: 30°, 40°, 110° (tompaszögű)',
          category: 'cat-scalene',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="8,14 2,27 30,27" fill="#f1f5f9" stroke="#475569" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i2-10',
          label: 'Minden oldala és szöge egyenlő',
          category: 'cat-equilateral',
          figure: (
            <div className="text-center font-bold text-[10px] text-emerald-700">a = b = c</div>
          )
        },
        {
          id: 'i2-11',
          label: 'Pontosan 1 szimmetriatengelye van',
          category: 'cat-isosceles',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,3 7,27 25,27" stroke="#4338ca" strokeWidth="1.5" />
              <line x1="16" y1="3" x2="16" y2="27" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 1" />
            </svg>
          )
        },
        {
          id: 'i2-12',
          label: 'Egyetlen szimmetriatengelye sincs',
          category: 'cat-scalene',
          figure: (
            <div className="text-center font-bold text-[10px] text-slate-700">0 tengely</div>
          )
        }
      ]
    },

    // ========================================================
    // 3. SZINT: NÉGYSZÖGEK FAJTÁI
    // ========================================================
    3: {
      categories: [
        {
          id: 'cat-square-rect',
          name: 'Négyzet és Téglalap',
          description: 'Minden belső szöge derékszög (90°)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-rhombus-deltoid',
          name: 'Rombusz és Deltoid',
          description: 'Átlói merőlegesek egymásra (90°-ban metszik egymást)',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-parallelogram',
          name: 'Paralelogramma',
          description: '2 párhuzamos oldalpár, ferde (nem derékszögű)',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-trapezoid',
          name: 'Trapéz',
          description: 'Csak 1 párhuzamos oldalpárja van (az alapok)',
          badgeColor: 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800'
        }
      ],
      items: [
        {
          id: 'i3-1',
          label: 'Négyzet (4 egyenlő oldal, 4 derékszög)',
          category: 'cat-square-rect',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="6" y="6" width="20" height="20" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i3-2',
          label: 'Rombusz (4 egyenlő oldal, ferde)',
          category: 'cat-rhombus-deltoid',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,3 28,16 16,29 4,16" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i3-3',
          label: 'Általános paralelogramma',
          category: 'cat-parallelogram',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="9,7 29,7 23,25 3,25" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i3-4',
          label: 'Húrtrapéz (egyenlő szárú trapéz)',
          category: 'cat-trapezoid',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="10,7 22,7 28,25 4,25" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i3-5',
          label: 'Téglalap (szemközti oldalak egyenlők, 4 derékszög)',
          category: 'cat-square-rect',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="9" width="24" height="14" fill="#d1fae5" stroke="#059669" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i3-6',
          label: 'Deltoid (2-2 szomszédos oldal egyenlő)',
          category: 'cat-rhombus-deltoid',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="16,3 26,11 16,29 6,11" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            </svg>
          )
        },
        {
          id: 'i3-7',
          label: 'Szemközti oldalai párhuzamosak, de nem derékszögű',
          category: 'cat-parallelogram',
          figure: (
            <div className="text-center font-bold text-[9px] text-blue-700">a || c, b || d</div>
          )
        },
        {
          id: 'i3-8',
          label: 'Derékszögű trapéz (1 szára merőleges az alapokra)',
          category: 'cat-trapezoid',
          figure: (
            <svg className="w-8 h-8 mx-auto" viewBox="0 0 32 32" fill="none">
              <polygon points="6,7 20,7 28,25 6,25" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
              <path d="M 12 25 A 6 6 0 0 0 6 19" fill="none" stroke="#047857" strokeWidth="1" />
              <circle cx="9" cy="22" r="0.8" fill="#047857" />
            </svg>
          )
        },
        {
          id: 'i3-9',
          label: 'Átlói egyenlő hosszúak és felezik egymást',
          category: 'cat-square-rect',
          figure: (
            <div className="text-center font-bold text-[9px] text-emerald-700">e = f</div>
          )
        },
        {
          id: 'i3-10',
          label: 'Átlói merőlegesen metszik egymást (e ⊥ f)',
          category: 'cat-rhombus-deltoid',
          figure: (
            <div className="text-center font-bold text-[9px] text-amber-700">e ⊥ f (90°)</div>
          )
        },
        {
          id: 'i3-11',
          label: 'Szomszédos belső szögeinek összege 180°',
          category: 'cat-parallelogram',
          figure: (
            <div className="text-center font-bold text-[9px] text-blue-700">α + β = 180°</div>
          )
        },
        {
          id: 'i3-12',
          label: 'Csak 1 párhuzamos oldalpárja van: a és c alap',
          category: 'cat-trapezoid',
          figure: (
            <div className="text-center font-bold text-[9px] text-orange-700">a || c alapok</div>
          )
        }
      ]
    }
  };

  return (
    <SorterTemplate
      title="Síkidomok Csoportosító Játék"
      subtitle="Válogasd szét a síkidomokat sokszögek, háromszögek és négyszögek tulajdonságai szerint!"
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

export default PolygonsSorter;
