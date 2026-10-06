import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PyramidSurfaceVolumeMatcherProps {
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
    title: '1. Szint: Képletek és Alapösszefüggések',
    subtitle: 'Párosítsd a geometriai fogalmakat és kérdéseket a helyes képletekkel!',
    pairs: [
      {
        id: 'psvm1-1',
        prompt: 'Gúla teljes felszíne (A)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="27,4 10,24 44,24" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.2" />
            <text x="27" y="18" className="text-[7.5px] font-black fill-rose-900" textAnchor="middle">A = ?</text>
          </svg>
        ),
        value: 'A = Ta + Tp (Alapterület és palástterület összege)'
      },
      {
        id: 'psvm1-2',
        prompt: 'Gúla térfogata (V)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="27,4 10,24 44,24" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.2" />
            <line x1="27" y1="4" x2="27" y2="24" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" />
          </svg>
        ),
        value: 'V = (Ta · m) / 3 (Alapterület szorozva testmagassággal osztva 3-mal)'
      },
      {
        id: 'psvm1-3',
        prompt: 'Négyzet alapú gúla alapterülete (Ta)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="16" y="4" width="22" height="20" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
            <text x="27" y="17" className="text-[8px] font-bold fill-amber-900" textAnchor="middle">a × a</text>
          </svg>
        ),
        value: 'Ta = a² (Alapél négyzete)'
      },
      {
        id: 'psvm1-4',
        prompt: 'Szabályos 4-oldalú gúla palástja (Tp)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="6" width="38" height="16" rx="3" fill="#cffafe" stroke="#06b6d4" strokeWidth="1" />
            <text x="27" y="17" className="text-[7.5px] font-mono font-black fill-cyan-900" textAnchor="middle">Tp = ?</text>
          </svg>
        ),
        value: 'Tp = 4 · ((a · mo) / 2) = 2 · a · mo'
      },
      {
        id: 'psvm1-5',
        prompt: 'Hasáb és gúla térfogatának aránya',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="10" y="6" width="14" height="18" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1" />
            <polygon points="38,6 30,24 46,24" fill="#fee2e2" stroke="#ef4444" strokeWidth="1" />
          </svg>
        ),
        value: 'V_hasáb = 3 · V_gúla (Pontosan 3-szor akkora)'
      },
      {
        id: 'psvm1-6',
        prompt: 'Testmagasság (m) visszaszámolása V-ből',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="6" width="38" height="16" rx="3" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
            <text x="27" y="17" className="text-[7.5px] font-mono font-black fill-emerald-900" textAnchor="middle">m = ?</text>
          </svg>
        ),
        value: 'm = (3 · V) / Ta (Háromszor a térfogat osztva az alapterülettel)'
      },
      {
        id: 'psvm1-7',
        prompt: 'Egyetlen oldalháromszög területe',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="27,4 12,24 42,24" fill="#fdf4ff" stroke="#c026d3" strokeWidth="1.2" />
            <line x1="27" y1="4" x2="27" y2="24" stroke="#c026d3" strokeWidth="1.2" strokeDasharray="3 2" />
          </svg>
        ),
        value: 'T_oldal = (a · mo) / 2 (Alapél szorozva oldallap-magassággal osztva 2-vel)'
      },
      {
        id: 'psvm1-8',
        prompt: 'Szabályos tetraéder teljes felszíne',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="27,4 10,24 44,24" fill="#fce7f3" stroke="#ec4899" strokeWidth="1.2" />
            <text x="27" y="18" className="text-[7px] font-black fill-pink-900" textAnchor="middle">Tetra</text>
          </svg>
        ),
        value: 'A = a² · √3 (4 darab egybevágó szabályos háromszög összege)'
      }
    ]
  },
  2: {
    title: '2. Szint: Pitagorasz-kapcsolatok és Szakaszok',
    subtitle: 'Párosítsd a derékszögű háromszögeket és szakaszokat a Pitagorasz-egyenletekkel!',
    pairs: [
      {
        id: 'psvm2-1',
        prompt: 'Belső felezősík Pitagorasz-tétele',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="12,24 38,24 38,6" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.2" />
            <text x="26" y="14" className="text-[6.5px] font-mono font-black fill-emerald-800" textAnchor="middle">m, a/2</text>
          </svg>
        ),
        value: 'm² + (a/2)² = mo² (Átfogó: az oldallap-magasság mo)'
      },
      {
        id: 'psvm2-2',
        prompt: 'Oldallap Pitagorasz-tétele',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="12,24 38,24 38,6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
            <text x="26" y="14" className="text-[6.5px] font-mono font-black fill-amber-800" textAnchor="middle">mo, a/2</text>
          </svg>
        ),
        value: 'mo² + (a/2)² = b² (Átfogó: az oldalél b)'
      },
      {
        id: 'psvm2-3',
        prompt: 'Átlós síkmetszet Pitagorasz-tétele',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="12,24 38,24 38,6" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.2" />
            <text x="26" y="14" className="text-[6.5px] font-mono font-black fill-purple-800" textAnchor="middle">m, d/2</text>
          </svg>
        ),
        value: 'm² + (d/2)² = b² (Átfogó: oldalél b, d az alaplap átlója)'
      },
      {
        id: 'psvm2-4',
        prompt: 'Négyzet alap lapátlójának fele (d/2)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="16" y="4" width="20" height="20" fill="none" stroke="#64748b" strokeWidth="1" />
            <line x1="16" y1="24" x2="36" y2="4" stroke="#6366f1" strokeWidth="1.2" />
          </svg>
        ),
        value: 'd/2 = (a · √2) / 2 (A teljes lapátló d = a√2 fele)'
      },
      {
        id: 'psvm2-5',
        prompt: 'Testmagasság (m) számítása mo-ból',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="6" width="38" height="16" rx="3" fill="#fee2e2" stroke="#ef4444" strokeWidth="1" />
            <text x="27" y="17" className="text-[7.5px] font-mono font-black fill-rose-900" textAnchor="middle">m = ?</text>
          </svg>
        ),
        value: 'm = √(mo² - (a/2)²) (Átfogó négyzetéből levonva a befogó négyzetét)'
      },
      {
        id: 'psvm2-6',
        prompt: 'Oldallap-magasság ha a=6 cm és m=4 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="14,22 38,22 38,8" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
            <text x="26" y="15" className="text-[7px] font-mono font-bold fill-emerald-800" textAnchor="middle">4, 3</text>
          </svg>
        ),
        value: 'mo = 5 cm (√(4² + 3²) = √(16 + 9) = 5)'
      },
      {
        id: 'psvm2-7',
        prompt: 'Oldalél (b) ha a=12 cm és mo=8 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="14,22 38,22 38,8" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <text x="26" y="15" className="text-[7px] font-mono font-bold fill-amber-800" textAnchor="middle">8, 6</text>
          </svg>
        ),
        value: 'b = 10 cm (√(8² + 6²) = √(64 + 36) = 10)'
      },
      {
        id: 'psvm2-8',
        prompt: 'Gúla alakú sátor ponyvaszükséglete',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="27,4 10,24 44,24" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.2" />
          </svg>
        ),
        value: 'Csak a palást területe (Tp), mert az aljzatot nem fedjük ponyvával'
      }
    ]
  },
  3: {
    title: '3. Szint: Eredmények és Gyakorlati Számítások',
    subtitle: 'Párosítsd a numerikus feladványokat a pontos számított értékekkel!',
    pairs: [
      {
        id: 'psvm3-1',
        prompt: 'Térfogat ha a=6 cm és m=10 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="6" width="38" height="16" rx="3" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1" />
            <text x="27" y="17" className="text-[7px] font-mono font-bold fill-blue-900" textAnchor="middle">6 cm, 10 cm</text>
          </svg>
        ),
        value: 'V = 120 cm³ (Ta = 36, V = 36 · 10 / 3 = 120)'
      },
      {
        id: 'psvm3-2',
        prompt: 'Felszín ha a=10 cm és mo=13 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="6" width="38" height="16" rx="3" fill="#fdf4ff" stroke="#c026d3" strokeWidth="1" />
            <text x="27" y="17" className="text-[7px] font-mono font-bold fill-fuchsia-900" textAnchor="middle">10 cm, 13 cm</text>
          </svg>
        ),
        value: 'A = 360 cm² (Ta = 100, Tp = 4 · 65 = 260, A = 360)'
      },
      {
        id: 'psvm3-3',
        prompt: 'Magasság (m) ha Ta=50 cm² és V=250 cm³',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="6" width="38" height="16" rx="3" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
            <text x="27" y="17" className="text-[7px] font-mono font-bold fill-emerald-900" textAnchor="middle">Ta=50, V=250</text>
          </svg>
        ),
        value: 'm = 15 cm (3 · 250 / 50 = 750 / 50 = 15)'
      },
      {
        id: 'psvm3-4',
        prompt: 'Térfogat ha a=10 cm és m=12 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="6" width="38" height="16" rx="3" fill="#fff7ed" stroke="#f97316" strokeWidth="1" />
            <text x="27" y="17" className="text-[7px] font-mono font-bold fill-orange-900" textAnchor="middle">10 cm, 12 cm</text>
          </svg>
        ),
        value: 'V = 400 cm³ (Ta = 100, V = 100 · 12 / 3 = 400)'
      },
      {
        id: 'psvm3-5',
        prompt: 'Testmagasság ha a=8 cm és mo=5 cm',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="6" width="38" height="16" rx="3" fill="#fef2f2" stroke="#ef4444" strokeWidth="1" />
            <text x="27" y="17" className="text-[7px] font-mono font-bold fill-rose-900" textAnchor="middle">a=8, mo=5</text>
          </svg>
        ),
        value: 'm = 3 cm (a/2 = 4, m = √(5² - 4²) = √(25 - 16) = 3)'
      },
      {
        id: 'psvm3-6',
        prompt: 'Térfogat változása 2-szeres méretnagyításnál',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="6" width="38" height="16" rx="3" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1" />
            <text x="27" y="17" className="text-[7px] font-mono font-bold fill-purple-900" textAnchor="middle">k = 2, V = ?</text>
          </svg>
        ),
        value: '8-szorosára nő (A térfogat köbösen skálázódik: 2³ = 8)'
      },
      {
        id: 'psvm3-7',
        prompt: 'Felszín változása 2-szeres méretnagyításnál',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="6" width="38" height="16" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <text x="27" y="17" className="text-[7px] font-mono font-bold fill-amber-900" textAnchor="middle">k = 2, A = ?</text>
          </svg>
        ),
        value: '4-szeresére nő (A felszín négyzetesen skálázódik: 2² = 4)'
      },
      {
        id: 'psvm3-8',
        prompt: 'Tömeg kiszámítása anyagi sűrűségből (ρ)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="6" width="38" height="16" rx="3" fill="#cffafe" stroke="#06b6d4" strokeWidth="1" />
            <text x="27" y="17" className="text-[7px] font-mono font-bold fill-cyan-900" textAnchor="middle">m = ρ · V</text>
          </svg>
        ),
        value: 'm_tömeg = ρ · V (Sűrűség szorozva a térfogattal)'
      }
    ]
  }
};

export const PyramidSurfaceVolumeMatcher: React.FC<PyramidSurfaceVolumeMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g8-solids-pyramids-calc',
  topicTitle = 'A Gúla Felszíne és Térfogata'
}) => {
  const activeLvl: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;

  return (
    <MatcherTemplate
      key={`psv-matcher-${activeLvl}`}
      level={activeLvl}
      currentLevel={activeLvl}
      levels={matcherLevels}
      levelsConfig={matcherLevels}
      levelConfigs={matcherLevels}
      badge="8. Osztály • VII. Testek"
      themeColor="rose"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

export default PyramidSurfaceVolumeMatcher;
