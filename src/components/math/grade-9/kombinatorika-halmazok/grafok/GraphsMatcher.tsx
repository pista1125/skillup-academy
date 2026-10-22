import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GraphsMatcherProps {
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
    title: '1. Szint: Alapfogalmak és Nevezetes Gráfok',
    subtitle: 'Párosítsd a gráfelemeket és fogalmakat a helyes matematikai jelentéssel!',
    pairs: [
      {
        id: 'gm1-1',
        prompt: 'Egyszerű gráf definíciója',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="12" y1="14" x2="42" y2="14" stroke="#059669" strokeWidth="2" />
            <circle cx="12" cy="14" r="4" fill="#047857" />
            <circle cx="42" cy="14" r="4" fill="#047857" />
          </svg>
        ),
        value: 'Nincs benne hurokél és többszörös él'
      },
      {
        id: 'gm1-2',
        prompt: 'Csúcs fokszáma: d(v)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="27" y1="14" x2="10" y2="7" stroke="#0d9488" strokeWidth="1.5" />
            <line x1="27" y1="14" x2="44" y2="7" stroke="#0d9488" strokeWidth="1.5" />
            <line x1="27" y1="14" x2="27" y2="24" stroke="#0d9488" strokeWidth="1.5" />
            <circle cx="27" cy="14" r="4.5" fill="#0f766e" />
          </svg>
        ),
        value: 'A csúcsból kiinduló élek száma'
      },
      {
        id: 'gm1-3',
        prompt: 'Izolált csúcs',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="27" cy="14" r="5" fill="#475569" stroke="#cbd5e1" strokeWidth="1.5" />
          </svg>
        ),
        value: 'Fokszáma d = 0 (nincs bekötve sehova)'
      },
      {
        id: 'gm1-4',
        prompt: 'Levélcsúcs (függőcsúcs)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="14" y1="14" x2="40" y2="14" stroke="#d97706" strokeWidth="2" />
            <circle cx="14" cy="14" r="3.5" fill="#b45309" />
            <circle cx="40" cy="14" r="4.5" fill="#d97706" />
          </svg>
        ),
        value: 'Fokszáma d = 1 (egy él végpontja)'
      },
      {
        id: 'gm1-5',
        prompt: 'Körgráf (C₄)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="16" y="5" width="22" height="18" fill="none" stroke="#2563eb" strokeWidth="1.8" />
            <circle cx="16" cy="5" r="3" fill="#1d4ed8" />
            <circle cx="38" cy="5" r="3" fill="#1d4ed8" />
            <circle cx="38" cy="23" r="3" fill="#1d4ed8" />
            <circle cx="16" cy="23" r="3" fill="#1d4ed8" />
          </svg>
        ),
        value: '4 csúcs, 4 él (minden csúcs foka 2)'
      },
      {
        id: 'gm1-6',
        prompt: 'Útgráf (P₄)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="8" y1="14" x2="20" y2="14" stroke="#059669" strokeWidth="1.8" />
            <line x1="20" y1="14" x2="33" y2="14" stroke="#059669" strokeWidth="1.8" />
            <line x1="33" y1="14" x2="46" y2="14" stroke="#059669" strokeWidth="1.8" />
            <circle cx="8" cy="14" r="2.5" fill="#047857" />
            <circle cx="20" cy="14" r="2.5" fill="#047857" />
            <circle cx="33" cy="14" r="2.5" fill="#047857" />
            <circle cx="46" cy="14" r="2.5" fill="#047857" />
          </svg>
        ),
        value: '4 csúcs, 3 él nyílt láncolatban'
      },
      {
        id: 'gm1-7',
        prompt: 'Teljes gráf (K₃)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="27,4 12,23 42,23" fill="none" stroke="#7c3aed" strokeWidth="1.8" />
            <circle cx="27" cy="4" r="3" fill="#6d28d9" />
            <circle cx="12" cy="23" r="3" fill="#6d28d9" />
            <circle cx="42" cy="23" r="3" fill="#6d28d9" />
          </svg>
        ),
        value: '3 csúcs, 3 él (háromszög, e = 3 · 2 / 2)'
      },
      {
        id: 'gm1-8',
        prompt: 'Kézfogási lemma képlete',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="5" width="46" height="18" rx="4" fill="#ccfbf1" stroke="#14b8a6" strokeWidth="1" />
            <text x="27" y="17" className="text-[9px] font-black fill-teal-900" textAnchor="middle">∑d = 2e</text>
          </svg>
        ),
        value: 'Fokszámok összege = 2 · élek száma'
      }
    ]
  },
  2: {
    title: '2. Szint: Képletek és Élszámítás',
    subtitle: 'Párosítsd a gráfokat és feladatokat a pontos élszámmal és tétellel!',
    pairs: [
      {
        id: 'gm2-1',
        prompt: 'K₅ teljes gráf élszáma',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="27" cy="14" r="10" fill="none" stroke="#7c3aed" strokeWidth="1.2" />
            <text x="27" y="17" className="text-[9px] font-black fill-purple-900" textAnchor="middle">K₅</text>
          </svg>
        ),
        value: '10 él (5 · 4 / 2 = 10)'
      },
      {
        id: 'gm2-2',
        prompt: 'K₆ teljes gráf élszáma',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="27" cy="14" r="10" fill="none" stroke="#7c3aed" strokeWidth="1.2" />
            <text x="27" y="17" className="text-[9px] font-black fill-purple-900" textAnchor="middle">K₆</text>
          </svg>
        ),
        value: '15 él (6 · 5 / 2 = 15)'
      },
      {
        id: 'gm2-3',
        prompt: '6 csúcsú fa élszáma',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="27" y1="4" x2="14" y2="14" stroke="#059669" strokeWidth="1.2" />
            <line x1="27" y1="4" x2="40" y2="14" stroke="#059669" strokeWidth="1.2" />
            <line x1="14" y1="14" x2="8" y2="24" stroke="#059669" strokeWidth="1.2" />
            <circle cx="27" cy="4" r="2" fill="#047857" />
            <circle cx="14" cy="14" r="2" fill="#047857" />
          </svg>
        ),
        value: '5 él (e = n - 1 = 6 - 1)'
      },
      {
        id: 'gm2-4',
        prompt: 'K₃,₃ teljes páros gráf élei',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="14" y1="7" x2="40" y2="7" stroke="#db2777" strokeWidth="1" />
            <line x1="14" y1="14" x2="40" y2="14" stroke="#db2777" strokeWidth="1" />
            <line x1="14" y1="21" x2="40" y2="21" stroke="#db2777" strokeWidth="1" />
            <circle cx="14" cy="7" r="2" fill="#2563eb" />
            <circle cx="40" cy="7" r="2" fill="#db2777" />
          </svg>
        ),
        value: '9 él (e = n · m = 3 · 3)'
      },
      {
        id: 'gm2-5',
        prompt: 'Páratlan fokú csúcsok száma',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="6" y="6" width="42" height="16" rx="3" fill="#fef3c7" stroke="#f59e0b" />
            <text x="27" y="17" className="text-[8px] font-black fill-amber-900" textAnchor="middle">2k db</text>
          </svg>
        ),
        value: 'Mindig PÁROS darab (Euler-tétel)'
      },
      {
        id: 'gm2-6',
        prompt: 'Csúcsfokszámok: 2, 2, 2, 2, 2',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="27,4 46,11 39,24 15,24 8,11" fill="none" stroke="#2563eb" strokeWidth="1.2" />
          </svg>
        ),
        value: '5 él (C₅ körgráf, e = 10 / 2)'
      },
      {
        id: 'gm2-7',
        prompt: '6 ember kölcsönös kézfogása',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[14px]" textAnchor="middle">🤝</text>
          </svg>
        ),
        value: '15 kézfogás (K₆ élszáma: 6·5/2)'
      },
      {
        id: 'gm2-8',
        prompt: 'Max fokszám 8 csúcsú egyszerű gráfnál',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="6" width="38" height="16" rx="4" fill="#ede9fe" stroke="#7c3aed" />
            <text x="27" y="17" className="text-[9px] font-bold fill-purple-900" textAnchor="middle">d_max</text>
          </svg>
        ),
        value: 'Legfeljebb 7 (n - 1 korlát)'
      }
    ]
  },
  3: {
    title: '3. Szint: Összetett Gráftulajdonságok és Mesterfok',
    subtitle: 'Párosítsd az emelt szintű gráfelméleti állításokat a pontos értékekkel!',
    pairs: [
      {
        id: 'gm3-1',
        prompt: '8 csúcsú 3-reguláris gráf',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="6" y="5" width="42" height="18" rx="4" fill="#eff6ff" stroke="#2563eb" />
            <text x="27" y="17" className="text-[8.5px] font-black fill-blue-900" textAnchor="middle">8·3 / 2</text>
          </svg>
        ),
        value: '12 él (összeg = 24, e = 12)'
      },
      {
        id: 'gm3-2',
        prompt: 'S₈ csillaggráf élei és fokai',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="27" y1="14" x2="10" y2="6" stroke="#d97706" strokeWidth="1" />
            <line x1="27" y1="14" x2="44" y2="6" stroke="#d97706" strokeWidth="1" />
            <line x1="27" y1="14" x2="27" y2="24" stroke="#d97706" strokeWidth="1" />
            <circle cx="27" cy="14" r="3.5" fill="#78350f" />
          </svg>
        ),
        value: '7 él (1 db 7-es és 7 db 1-es fokszám)'
      },
      {
        id: 'gm3-3',
        prompt: '10 csúcsú, 2 fából álló erdő',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="18" y="18" className="text-[11px]" textAnchor="middle">🌲</text>
            <text x="36" y="18" className="text-[11px]" textAnchor="middle">🌲</text>
          </svg>
        ),
        value: '8 él (e = n - k = 10 - 2 = 8)'
      },
      {
        id: 'gm3-4',
        prompt: 'K₄,₅ teljes páros gráf',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="5" width="38" height="18" rx="4" fill="#fdf2f8" stroke="#db2777" />
            <text x="27" y="17" className="text-[9px] font-black fill-pink-900" textAnchor="middle">4 · 5</text>
          </svg>
        ),
        value: '20 él (4 · 5 = 20)'
      },
      {
        id: 'gm3-5',
        prompt: 'Zárt Euler-vonal feltétele',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="27" cy="14" r="9" fill="none" stroke="#10b981" strokeWidth="1.5" />
            <text x="27" y="17" className="text-[8px] font-black fill-emerald-800" textAnchor="middle">Zárt</text>
          </svg>
        ),
        value: 'Összefüggő és MINDEN csúcs foka páros'
      },
      {
        id: 'gm3-6',
        prompt: 'Nyílt Euler-vonal feltétele',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <path d="M 12 20 Q 27 6, 42 20" fill="none" stroke="#059669" strokeWidth="1.8" />
            <text x="27" y="24" className="text-[7.5px] font-black fill-emerald-900" textAnchor="middle">Nyílt</text>
          </svg>
        ),
        value: 'Összefüggő és PONTOSAN 2 páratlan csúcsa van'
      },
      {
        id: 'gm3-7',
        prompt: 'Fokszámok: 3, 3, 3, 3, 3',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="5" width="38" height="18" rx="4" fill="#fee2e2" stroke="#dc2626" />
            <text x="27" y="17" className="text-[9px] font-black fill-rose-900" textAnchor="middle">&sum; = 15</text>
          </svg>
        ),
        value: 'LEHETETLEN (fokszámösszeg páratlan!)'
      },
      {
        id: 'gm3-8',
        prompt: 'Min. él 10 csúcs összefüggéséhez',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="6" y="5" width="42" height="18" rx="4" fill="#ecfdf5" stroke="#10b981" />
            <text x="27" y="17" className="text-[9px] font-bold fill-emerald-900" textAnchor="middle">Fa: n-1</text>
          </svg>
        ),
        value: '9 él (a minimális összefüggő gráf a fa)'
      }
    ]
  }
};

export const GraphsMatcher: React.FC<GraphsMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId,
  topicTitle
}) => {
  return (
    <MatcherTemplate
      level={level}
      levelConfigs={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId || 'g9-komb-grafok-matcher'}
      topicTitle={topicTitle || 'Gráfok Párosító'}
      themeColor="emerald"
    />
  );
};

export default GraphsMatcher;
