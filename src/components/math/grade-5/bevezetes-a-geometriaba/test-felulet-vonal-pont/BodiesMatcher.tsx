import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface BodiesMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const BodiesMatcher: React.FC<BodiesMatcherProps> = ({
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
    // 1. SZINT: A NÉGY ALAPFOGALOM ÉS DIMENZIÓK (0D, 1D, 2D, 3D)
    // ========================================================
    1: {
      title: '1. Szint: A négy alapfogalom és dimenzióik',
      subtitle: 'Párosítsd a geometriai alapfogalmat a helyes leírásával és dimenziójával!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'Pont (csúcs)',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="4.5" className="fill-emerald-600" />
              <text x="20" y="12" textAnchor="middle" className="text-[11px] font-black fill-emerald-800">P</text>
            </svg>
          ),
          value: '0 dimenziós: nincs kiterjedése, csak helye a térben'
        },
        {
          id: 'p1-2',
          prompt: 'Vonal (él, egyenes, szakasz)',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 50 40" fill="none">
              <line x1="5" y1="20" x2="45" y2="20" className="stroke-blue-600" strokeWidth="3" />
              <circle cx="10" cy="20" r="3" className="fill-blue-700" />
              <circle cx="40" cy="20" r="3" className="fill-blue-700" />
              <text x="10" y="13" textAnchor="middle" className="text-[9px] font-bold fill-blue-900">A</text>
              <text x="40" y="13" textAnchor="middle" className="text-[9px] font-bold fill-blue-900">B</text>
            </svg>
          ),
          value: '1 dimenziós: egyetlen mérete a hosszúság'
        },
        {
          id: 'p1-3',
          prompt: 'Felület (lap, síkidom)',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <polygon points="20,6 36,32 4,32" className="fill-amber-100 stroke-amber-600" strokeWidth="2.5" />
            </svg>
          ),
          value: '2 dimenziós: hosszúsága és szélessége van (terület)'
        },
        {
          id: 'p1-4',
          prompt: 'Test (térbeli alakzat)',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <path d="M8 14 L20 6 L32 14 L20 22 Z" className="fill-purple-200 stroke-purple-600" strokeWidth="1.5" />
              <path d="M8 14 L20 22 L20 34 L8 26 Z" className="fill-purple-400 stroke-purple-700" strokeWidth="1.5" />
              <path d="M20 22 L32 14 L32 26 L20 34 Z" className="fill-purple-300 stroke-purple-600" strokeWidth="1.5" />
            </svg>
          ),
          value: '3 dimenziós: teret tölt be, térfogata és felszíne van'
        },
        {
          id: 'p1-5',
          prompt: 'Él',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <path d="M8 14 L20 6 L32 14 L20 22 Z" className="fill-slate-100 stroke-slate-300" strokeWidth="1" />
              <path d="M8 14 L20 22 L20 34 L8 26 Z" className="fill-slate-100 stroke-slate-300" strokeWidth="1" />
              <path d="M20 22 L32 14 L32 26 L20 34 Z" className="fill-slate-100 stroke-slate-300" strokeWidth="1" />
              <line x1="20" y1="22" x2="20" y2="34" className="stroke-rose-600" strokeWidth="3" />
            </svg>
          ),
          value: 'Két határoló lap (felület) metszésvonala egy testen'
        },
        {
          id: 'p1-6',
          prompt: 'Csúcs',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <path d="M8 14 L20 6 L32 14 L20 22 Z" className="fill-slate-100 stroke-slate-300" strokeWidth="1" />
              <path d="M8 14 L20 22 L20 34 L8 26 Z" className="fill-slate-100 stroke-slate-300" strokeWidth="1" />
              <path d="M20 22 L32 14 L32 26 L20 34 Z" className="fill-slate-100 stroke-slate-300" strokeWidth="1" />
              <circle cx="20" cy="22" r="4" className="fill-rose-600" />
            </svg>
          ),
          value: 'Három vagy több él találkozási pontja egy testen'
        },
        {
          id: 'p1-7',
          prompt: 'Lap',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <path d="M8 14 L20 6 L32 14 L20 22 Z" className="fill-slate-100 stroke-slate-300" strokeWidth="1" />
              <path d="M8 14 L20 22 L20 34 L8 26 Z" className="fill-emerald-300 stroke-emerald-700" strokeWidth="2" />
              <path d="M20 22 L32 14 L32 26 L20 34 Z" className="fill-slate-100 stroke-slate-300" strokeWidth="1" />
            </svg>
          ),
          value: 'A testet a külvilágtól elzáró sík vagy görbe felületrész'
        },
        {
          id: 'p1-8',
          prompt: 'Szakasz',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 50 40" fill="none">
              <line x1="8" y1="20" x2="42" y2="20" className="stroke-teal-600" strokeWidth="2.5" />
              <circle cx="8" cy="20" r="3" className="fill-teal-700" />
              <circle cx="42" cy="20" r="3" className="fill-teal-700" />
            </svg>
          ),
          value: 'Két pont közötti legrövidebb egyenes út (mérhető hosszal)'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: TESTEK RÉSZEINEK SZÁMA (LAPOK, ÉLEK, CSÚCSOK)
    // ========================================================
    2: {
      title: '2. Szint: Testek lapjai, élei és csúcsai',
      subtitle: 'Párosítsd a térbeli testet a csúcsai, élei és lapjai pontos számával!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'Kocka / Téglatest',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <path d="M8 14 L20 6 L32 14 L20 22 Z" className="fill-blue-200 stroke-blue-600" strokeWidth="1.5" />
              <path d="M8 14 L20 22 L20 34 L8 26 Z" className="fill-blue-400 stroke-blue-700" strokeWidth="1.5" />
              <path d="M20 22 L32 14 L32 26 L20 34 Z" className="fill-blue-300 stroke-blue-600" strokeWidth="1.5" />
            </svg>
          ),
          value: '6 lap, 12 él, 8 csúcs'
        },
        {
          id: 'p2-2',
          prompt: 'Háromoldalú prizma',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <polygon points="10,12 28,6 34,16" className="fill-teal-200 stroke-teal-600" strokeWidth="1.5" />
              <path d="M10 12 L10 30 L34 34 L34 16 Z" className="fill-teal-300 stroke-teal-700" strokeWidth="1.5" />
              <polygon points="10,30 28,24 34,34" className="stroke-teal-600" strokeWidth="1" strokeDasharray="2 2" />
            </svg>
          ),
          value: '5 lap (2 háromszög + 3 téglalap), 9 él, 6 csúcs'
        },
        {
          id: 'p2-3',
          prompt: 'Négyoldalú gúla',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <polygon points="6,30 20,34 34,28 20,24" className="stroke-amber-600 fill-amber-100" strokeWidth="1" />
              <polygon points="20,6 6,30 20,34" className="fill-amber-300 stroke-amber-700" strokeWidth="1.5" />
              <polygon points="20,6 20,34 34,28" className="fill-amber-400 stroke-amber-800" strokeWidth="1.5" />
            </svg>
          ),
          value: '5 lap (1 négyzet alap + 4 háromszög), 8 él, 5 csúcs'
        },
        {
          id: 'p2-4',
          prompt: 'Tetraéder (háromoldalú gúla)',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <polygon points="20,6 8,30 24,34" className="fill-purple-300 stroke-purple-700" strokeWidth="1.5" />
              <polygon points="20,6 24,34 34,26" className="fill-purple-400 stroke-purple-800" strokeWidth="1.5" />
              <line x1="8" y1="30" x2="34" y2="26" className="stroke-purple-600" strokeWidth="1" strokeDasharray="2 2" />
            </svg>
          ),
          value: '4 háromszöglap, 6 él, 4 csúcs'
        },
        {
          id: 'p2-5',
          prompt: 'Henger',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <path d="M10 12 L10 28 C10 33 30 33 30 28 L30 12 Z" className="fill-emerald-100 stroke-emerald-600" strokeWidth="1.5" />
              <ellipse cx="20" cy="28" rx="10" ry="4" className="fill-emerald-200 stroke-emerald-600" strokeWidth="1.5" />
              <ellipse cx="20" cy="12" rx="10" ry="4" className="fill-emerald-200 stroke-emerald-600" strokeWidth="1.5" />
            </svg>
          ),
          value: '3 lap (2 sík körlap + 1 palást), 2 görbe él, 0 csúcs'
        },
        {
          id: 'p2-6',
          prompt: 'Kúp',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <polygon points="20,6 9,28 31,28" className="fill-rose-200 stroke-rose-600" strokeWidth="1.5" />
              <ellipse cx="20" cy="28" rx="11" ry="4" className="fill-rose-300 stroke-rose-700" strokeWidth="1.5" />
            </svg>
          ),
          value: '2 lap (1 körlap + 1 palást), 1 kör él, 1 csúcs'
        },
        {
          id: 'p2-7',
          prompt: 'Gömb',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="14" className="fill-blue-100 stroke-blue-600" strokeWidth="1.5" />
              <ellipse cx="20" cy="20" rx="14" ry="4" className="stroke-blue-400" strokeWidth="1" strokeDasharray="2 2" />
            </svg>
          ),
          value: '1 zárt gömbfelület határolja, 0 éle és 0 csúcsa van'
        },
        {
          id: 'p2-8',
          prompt: 'Euler-összefüggés poliéderekre',
          promptFigure: (
            <svg className="w-14 h-10 mx-auto" viewBox="0 0 60 40" fill="none">
              <rect x="4" y="8" width="52" height="24" rx="4" className="fill-slate-100 stroke-slate-500" strokeWidth="1.5" />
              <text x="30" y="24" textAnchor="middle" className="text-[10px] font-black fill-slate-800">C + L - É = 2</text>
            </svg>
          ),
          value: 'Csúcsok száma + Lapok száma - Élek száma = 2'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: VONALFAJTÁK ÉS PONT-EGYENES RELÁCIÓK
    // ========================================================
    3: {
      title: '3. Szint: Egyenesek, félegyenesek és szakaszok',
      subtitle: 'Párosítsd a vonalfajtát és relációt a pontos geometriai definíciójával!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'Egyenes (e)',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 50 40" fill="none">
              <line x1="2" y1="20" x2="48" y2="20" className="stroke-indigo-600" strokeWidth="2.5" />
              <text x="44" y="14" className="text-[10px] font-bold fill-indigo-700">e</text>
            </svg>
          ),
          value: 'Mindkét irányban végtelenbe nyúló egyenes vonal (nincs végpontja)'
        },
        {
          id: 'p3-2',
          prompt: 'Félegyenes',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 50 40" fill="none">
              <line x1="12" y1="20" x2="48" y2="20" className="stroke-purple-600" strokeWidth="2.5" />
              <circle cx="12" cy="20" r="3.5" className="fill-purple-700" />
              <text x="12" y="13" textAnchor="middle" className="text-[9px] font-bold fill-purple-900">A</text>
            </svg>
          ),
          value: 'Egyik irányban egy kezdőpont határolja, másikban végtelen'
        },
        {
          id: 'p3-3',
          prompt: 'P ∈ e (pont illeszkedik az egyenesre)',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 50 40" fill="none">
              <line x1="5" y1="20" x2="45" y2="20" className="stroke-slate-500" strokeWidth="2" />
              <circle cx="25" cy="20" r="3.5" className="fill-emerald-600" />
              <text x="25" y="13" textAnchor="middle" className="text-[10px] font-bold fill-emerald-800">P</text>
            </svg>
          ),
          value: 'A P pont rajta van az „e” egyenesen'
        },
        {
          id: 'p3-4',
          prompt: 'Q ∉ e (pont nem illeszkedik az egyenesre)',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 50 40" fill="none">
              <line x1="5" y1="28" x2="45" y2="28" className="stroke-slate-500" strokeWidth="2" />
              <circle cx="25" cy="12" r="3.5" className="fill-rose-600" />
              <text x="25" y="8" textAnchor="middle" className="text-[10px] font-bold fill-rose-800">Q</text>
            </svg>
          ),
          value: 'A Q pont kívül helyezkedik el az „e” egyenesen'
        },
        {
          id: 'p3-5',
          prompt: 'Két pont egyenese',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 50 40" fill="none">
              <line x1="2" y1="20" x2="48" y2="20" className="stroke-blue-600" strokeWidth="2" />
              <circle cx="15" cy="20" r="3" className="fill-blue-700" />
              <circle cx="35" cy="20" r="3" className="fill-blue-700" />
            </svg>
          ),
          value: 'Két különböző ponton át pontosan egy egyenes fektethető'
        },
        {
          id: 'p3-6',
          prompt: 'Egy ponton átmenő egyenesek',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <line x1="5" y1="20" x2="35" y2="20" className="stroke-amber-500" strokeWidth="1.5" />
              <line x1="20" y1="5" x2="20" y2="35" className="stroke-amber-500" strokeWidth="1.5" />
              <line x1="8" y1="8" x2="32" y2="32" className="stroke-amber-500" strokeWidth="1.5" />
              <circle cx="20" cy="20" r="3" className="fill-amber-700" />
            </svg>
          ),
          value: 'Egyetlen ponton át végtelen sok egyenes húzható'
        },
        {
          id: 'p3-7',
          prompt: 'Töröttvonal',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 50 40" fill="none">
              <polyline points="6,28 18,10 32,26 44,12" className="stroke-teal-600" strokeWidth="2.5" fill="none" />
            </svg>
          ),
          value: 'Egymáshoz csatlakozó szakaszokból álló vonal'
        },
        {
          id: 'p3-8',
          prompt: 'Zárt vonal',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <path d="M10 20 C10 10 30 10 30 20 C30 30 10 30 10 20 Z" className="stroke-rose-600 fill-rose-50" strokeWidth="2" />
            </svg>
          ),
          value: 'Kezdő- és végpontja egybeesik, belső síkrészt zár körül'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      level={currentLevel}
      currentLevel={currentLevel}
      title="Test, Felület, Vonal, Pont Párosító"
      subtitle="5. osztály • III. Bevezetés a geometriába • 3. Test, felület, vonal, pont"
      badge="5. OSZTÁLY • TESTEK ÉS ELEMEIK"
      levels={levels}
      levelConfigs={levels}
      themeColor="emerald"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default BodiesMatcher;
