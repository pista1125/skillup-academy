import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PyramidsMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Gúla Alapfogalmak és Részek',
    subtitle: 'Párosítsd a gúla fogalmait a hozzájuk tartozó geometriai definícióval!',
    pairs: [
      {
        id: 'pm1-1',
        prompt: 'Testcsúcs (M)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="27,4 10,24 44,24" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
            <circle cx="27" cy="4" r="2.5" fill="#ef4444" />
          </svg>
        ),
        value: 'A pont, ahol a gúla összes oldallapja és oldaléle találkozik'
      },
      {
        id: 'pm1-2',
        prompt: 'Testmagasság (m)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="27" y1="4" x2="27" y2="24" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="10" y1="24" x2="44" y2="24" stroke="#475569" strokeWidth="1" />
          </svg>
        ),
        value: 'A testcsúcsból az alaplap síkjára bocsátott merőleges szakasz hossza'
      },
      {
        id: 'pm1-3',
        prompt: 'Oldallap-magasság (mo)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="27,4 10,24 44,24" fill="none" stroke="#64748b" strokeWidth="1" />
            <line x1="27" y1="4" x2="27" y2="24" stroke="#16a34a" strokeWidth="1.5" />
          </svg>
        ),
        value: 'Az oldalháromszög alaphoz tartozó magassága (az oldallap síkjában)'
      },
      {
        id: 'pm1-4',
        prompt: 'Tetraéder',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="27,4 12,23 35,25" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1" />
            <polygon points="27,4 35,25 46,18" fill="#c7d2fe" stroke="#6366f1" strokeWidth="1" />
          </svg>
        ),
        value: 'Háromoldalú gúla (4 csúcsa és 4 háromszöglapja van)'
      },
      {
        id: 'pm1-5',
        prompt: 'Gúla palástja (Tp)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="27,4 10,24 44,24" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.2" />
          </svg>
        ),
        value: 'A csúcsban találkozó háromszöglapok területeinek összege'
      },
      {
        id: 'pm1-6',
        prompt: 'Alapél (a)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="10" y1="20" x2="44" y2="20" stroke="#f59e0b" strokeWidth="2.5" />
          </svg>
        ),
        value: 'Az alapsokszög kerületét alkotó szakasz'
      },
      {
        id: 'pm1-7',
        prompt: 'Alaplap (Ta)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="10,22 44,22 36,10 18,10" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.2" />
          </svg>
        ),
        value: 'A gúla alsó határoló lapja, amely bármilyen sokszög lehet'
      },
      {
        id: 'pm1-8',
        prompt: 'Oldalél (b)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="27" y1="4" x2="44" y2="24" stroke="#8b5cf6" strokeWidth="2" />
            <circle cx="27" cy="4" r="2" fill="#ef4444" />
            <circle cx="44" cy="24" r="2" fill="#8b5cf6" />
          </svg>
        ),
        value: 'A testcsúcsot az alapsokszög egy-egy csúcsával összekötő szakasz'
      }
    ]
  },
  2: {
    title: '2. Szint: Csúcsok, Lapok, Élek és Euler-tétel',
    subtitle: 'Párosítsd a gúlatípusokat a megfelelő csúcs-, lap- és élszámokkal!',
    pairs: [
      {
        id: 'pm2-1',
        prompt: 'Négyzet alapú gúla éleinek száma',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="14" y="6" width="26" height="16" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <text x="27" y="17" className="text-[8px] font-black fill-amber-900" textAnchor="middle">n = 4</text>
          </svg>
        ),
        value: '8 él (4 alapél + 4 oldalél)'
      },
      {
        id: 'pm2-2',
        prompt: 'Hatszög alapú gúla csúcsainak száma',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="14" y="6" width="26" height="16" rx="3" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1" />
            <text x="27" y="17" className="text-[8px] font-black fill-indigo-900" textAnchor="middle">n = 6</text>
          </svg>
        ),
        value: '7 csúcs (1 testcsúcs + 6 alaplapi csúcs)'
      },
      {
        id: 'pm2-3',
        prompt: 'Euler-tétel alapegyenlete',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="6" y="6" width="42" height="16" rx="3" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1" />
            <text x="27" y="17" className="text-[7.5px] font-mono font-black fill-purple-900" textAnchor="middle">C - É + L</text>
          </svg>
        ),
        value: 'C - É + L = 2 (minden konvex poliéderre)'
      },
      {
        id: 'pm2-4',
        prompt: 'n-oldalú gúla lapjainak száma',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="14" y="6" width="26" height="16" rx="3" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
            <text x="27" y="17" className="text-[8px] font-black fill-emerald-900" textAnchor="middle">L = ?</text>
          </svg>
        ),
        value: 'L = n + 1 (1 alapsokszög + n darab oldallap)'
      },
      {
        id: 'pm2-5',
        prompt: 'Szabályos tetraéder éleinek száma',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="27,4 12,24 42,24" fill="#fce7f3" stroke="#ec4899" strokeWidth="1" />
          </svg>
        ),
        value: '6 él (3 alapél + 3 oldalél)'
      },
      {
        id: 'pm2-6',
        prompt: 'Gúlák alaptulajdonsága: C és L viszonya',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="10" y="6" width="34" height="16" rx="3" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" />
            <text x="27" y="17" className="text-[8px] font-black fill-blue-900" textAnchor="middle">C vs L</text>
          </svg>
        ),
        value: 'C = L (a csúcsok és lapok száma minden gúlánál egyenlő)'
      },
      {
        id: 'pm2-7',
        prompt: 'Ötszög alapú gúla éleinek száma',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="27,4 42,14 36,24 18,24 12,14" fill="#d1fae5" stroke="#059669" strokeWidth="1" />
          </svg>
        ),
        value: '10 él (5 alapél + 5 oldalél, É = 2n)'
      },
      {
        id: 'pm2-8',
        prompt: 'Szabályos tetraéder lapjainak száma',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="27,4 10,24 44,24" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
            <text x="27" y="18" className="text-[8px] font-black fill-orange-950" textAnchor="middle">4 lap</text>
          </svg>
        ),
        value: '4 lap (4 darab egybevágó szabályos háromszög)'
      }
    ]
  },
  3: {
    title: '3. Szint: Pitagorasz-tétel és Képletek a Gúlában',
    subtitle: 'Párosítsd a derékszögű háromszögeket és szabályokat a helyes képlettel!',
    pairs: [
      {
        id: 'pm3-1',
        prompt: 'Testmagasság és oldallap-magasság kapcsolata',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="12,24 38,24 38,6" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
            <text x="26" y="14" className="text-[6.5px] font-mono font-black fill-emerald-800" textAnchor="middle">m, a/2</text>
          </svg>
        ),
        value: 'm² + (a/2)² = mo² (átfogó az oldallap-magasság)'
      },
      {
        id: 'pm3-2',
        prompt: 'Oldallap-magasság és oldalél kapcsolata',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="12,24 38,24 38,6" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <text x="26" y="14" className="text-[6.5px] font-mono font-black fill-amber-800" textAnchor="middle">mo, a/2</text>
          </svg>
        ),
        value: 'mo² + (a/2)² = b² (átfogó az oldalél b)'
      },
      {
        id: 'pm3-3',
        prompt: 'Testmagasság és oldalél kapcsolata',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="12,24 38,24 38,6" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1" />
            <text x="26" y="14" className="text-[6.5px] font-mono font-black fill-purple-800" textAnchor="middle">m, d/2</text>
          </svg>
        ),
        value: 'm² + (d/2)² = b² (átfogó az oldalél b, d a lapátló)'
      },
      {
        id: 'pm3-4',
        prompt: 'Szabályos 4-oldalú gúla egy oldallapjának területe',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="27,4 12,24 42,24" fill="#fee2e2" stroke="#ef4444" strokeWidth="1" />
            <text x="27" y="18" className="text-[6.5px] font-mono font-bold fill-red-800" textAnchor="middle">T_oldal</text>
          </svg>
        ),
        value: 'T = (a · mo) / 2 (alapél szorozva oldallap-magassággal osztva 2-vel)'
      },
      {
        id: 'pm3-5',
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
        id: 'pm3-6',
        prompt: 'Négyzet átlójának hossza (d)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="16" y="4" width="20" height="20" fill="none" stroke="#64748b" strokeWidth="1" />
            <line x1="16" y1="24" x2="36" y2="4" stroke="#6366f1" strokeWidth="1.2" />
          </svg>
        ),
        value: 'd = a · √2 (Pitagorasz: a² + a² = 2a²)'
      },
      {
        id: 'pm3-7',
        prompt: 'Gúla teljes felszíne (A)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="10" y="6" width="34" height="16" rx="3" fill="#fdf4ff" stroke="#c026d3" strokeWidth="1" />
            <text x="27" y="17" className="text-[8px] font-black fill-fuchsia-900" textAnchor="middle">A = Ta + Tp</text>
          </svg>
        ),
        value: 'A = Ta + Tp (az alaplap és a palást területének összege)'
      },
      {
        id: 'pm3-8',
        prompt: 'Gúla térfogata (V)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="6" width="38" height="16" rx="3" fill="#fef2f2" stroke="#dc2626" strokeWidth="1" />
            <text x="27" y="17" className="text-[7.5px] font-mono font-black fill-rose-900" textAnchor="middle">V = Ta·m/3</text>
          </svg>
        ),
        value: 'V = (Ta · m) / 3 (egyharmada az azonos alapú és magasságú hasábnak)'
      }
    ]
  }
};

export const PyramidsMatcher: React.FC<PyramidsMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g8-solids-pyramids',
  topicTitle = 'Gúlák Alapismeretek'
}) => {
  const activeLvl: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;

  return (
    <MatcherTemplate
      key={`pyr-matcher-${activeLvl}`}
      level={activeLvl}
      currentLevel={activeLvl}
      levels={matcherLevels}
      levelsConfig={matcherLevels}
      levelConfigs={matcherLevels}
      badge="8. Osztály • VI. Testek"
      themeColor="amber"
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

export default PyramidsMatcher;
