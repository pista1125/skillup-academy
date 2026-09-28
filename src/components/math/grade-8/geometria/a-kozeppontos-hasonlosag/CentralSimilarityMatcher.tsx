import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface CentralSimilarityMatcherProps {
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
    title: '1. Szint: Alapfogalmak és a λ paraméter',
    subtitle: 'Párosítsd a középpontos hasonlóság alapfogalmait a hozzájuk tartozó leírással!',
    pairs: [
      {
        id: 'cs-m1',
        prompt: 'Középpontos hasonlóság definíciója',
        value: "OP' = |λ| · OP az OP egyenesen, O képe önmaga (fixpont)",
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="5" y1="15" x2="65" y2="15" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <circle cx="20" cy="15" r="3" fill="#4f46e5" />
            <circle cx="40" cy="15" r="2.5" fill="#0284c7" />
            <circle cx="60" cy="15" r="2.5" fill="#10b981" />
            <text x="20" y="26" textAnchor="middle" className="text-[6px] font-bold fill-indigo-700">O</text>
            <text x="40" y="26" textAnchor="middle" className="text-[6px] font-bold fill-sky-700">P</text>
            <text x="60" y="26" textAnchor="middle" className="text-[6px] font-bold fill-emerald-700">P'</text>
          </svg>
        )
      },
      {
        id: 'cs-m2',
        prompt: 'Középpontos tükrözés (λ = -1)',
        value: "OP' = OP, az O a PP' szakasz felezőpontja (180°-os átfordulás)",
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="15" x2="60" y2="15" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="10" cy="15" r="2.5" fill="#f59e0b" />
            <circle cx="35" cy="15" r="3.5" fill="#4f46e5" />
            <circle cx="60" cy="15" r="2.5" fill="#0284c7" />
            <text x="10" y="25" textAnchor="middle" className="text-[6px] font-bold fill-amber-700">P'</text>
            <text x="35" y="25" textAnchor="middle" className="text-[6px] font-bold fill-indigo-700">O</text>
            <text x="60" y="25" textAnchor="middle" className="text-[6px] font-bold fill-sky-700">P</text>
          </svg>
        )
      },
      {
        id: 'cs-m3',
        prompt: 'Nagyítás (|λ| > 1)',
        value: 'A képalakzat minden távolsága és szakasza hosszabb az eredetinél',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="10,24 24,24 17,10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" />
            <polygon points="34,26 62,26 48,4" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'cs-m4',
        prompt: 'Kicsinyítés (0 < |λ| < 1)',
        value: 'A képalakzat minden távolsága és szakasza rövidebb az eredetinél',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="8,26 36,26 22,4" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
            <polygon points="46,24 60,24 53,10" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 'cs-m5',
        prompt: 'Pozitív arány (λ > 0)',
        value: "P' az OP félegyenesre esik, P és P' a centrum azonos oldalán fekszik",
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="15" y1="15" x2="60" y2="15" stroke="#10b981" strokeWidth="1.5" />
            <circle cx="15" cy="15" r="3" fill="#4f46e5" />
            <circle cx="35" cy="15" r="2.5" fill="#0284c7" />
            <circle cx="55" cy="15" r="2.5" fill="#10b981" />
            <text x="35" y="25" textAnchor="middle" className="text-[5px] font-bold fill-slate-700">P és P' egy oldalon</text>
          </svg>
        )
      },
      {
        id: 'cs-m6',
        prompt: 'Negatív arány (λ < 0)',
        value: "P' az OP ellentétes félegyenesére esik, az O pont a P és P' között van",
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="15" x2="60" y2="15" stroke="#ef4444" strokeWidth="1.5" />
            <circle cx="15" cy="15" r="2.5" fill="#ef4444" />
            <circle cx="35" cy="15" r="3" fill="#4f46e5" />
            <circle cx="55" cy="15" r="2.5" fill="#0284c7" />
            <text x="35" y="25" textAnchor="middle" className="text-[5px] font-bold fill-slate-700">O van középen</text>
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Geometriai tulajdonságok és invariánsok',
    subtitle: 'Párosítsd a középpontos hasonlóság alaptulajdonságait a megfelelő kifejezéssel!',
    pairs: [
      {
        id: 'cs-m7',
        prompt: 'Egyenes képe (O ∉ e)',
        value: "Vele párhuzamos egyenes: e' ∥ e",
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="10" x2="60" y2="10" stroke="#3b82f6" strokeWidth="1.5" />
            <line x1="10" y1="22" x2="60" y2="22" stroke="#7c3aed" strokeWidth="1.5" />
            <circle cx="35" cy="16" r="2" fill="#4f46e5" />
          </svg>
        )
      },
      {
        id: 'cs-m8',
        prompt: 'Invariáns egyenes (O ∈ e)',
        value: "A centrumon áthaladó egyenes képe önmaga: e' = e",
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="15" x2="60" y2="15" stroke="#4f46e5" strokeWidth="2" />
            <circle cx="35" cy="15" r="3" fill="#ffffff" stroke="#4f46e5" strokeWidth="1.5" />
            <text x="35" y="25" textAnchor="middle" className="text-[6px] font-bold fill-indigo-700">O ∈ e</text>
          </svg>
        )
      },
      {
        id: 'cs-m9',
        prompt: 'Szögtartás és körüljárás',
        value: 'A szögek nagysága és körüljárási iránya változatlan marad (α\' = α)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <path d="M 15 22 L 30 22 L 25 10" fill="none" stroke="#0d9488" strokeWidth="1.5" />
            <path d="M 40 22 L 60 22 L 53 6" fill="none" stroke="#0d9488" strokeWidth="1.5" />
            <text x="23" y="19" className="text-[6px] font-bold fill-teal-700">α</text>
            <text x="50" y="19" className="text-[6px] font-bold fill-teal-700">α' = α</text>
          </svg>
        )
      },
      {
        id: 'cs-m10',
        prompt: 'Szakaszok hossza',
        value: "|A'B'| = |λ| · |AB| (arányos megnyúlás vagy rövidülés)",
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="15" x2="28" y2="15" stroke="#2563eb" strokeWidth="2" />
            <line x1="36" y1="15" x2="62" y2="15" stroke="#7c3aed" strokeWidth="2" />
            <text x="19" y="11" textAnchor="middle" className="text-[5px] font-bold fill-blue-700">d</text>
            <text x="49" y="11" textAnchor="middle" className="text-[5px] font-bold fill-purple-700">|λ|·d</text>
          </svg>
        )
      },
      {
        id: 'cs-m11',
        prompt: 'Kerületek aránya',
        value: "K' = |λ| · K (a hasonlósági arány nagyságával arányos)",
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <rect x="12" y="10" width="16" height="12" fill="none" stroke="#0284c7" strokeWidth="1" />
            <rect x="36" y="6" width="28" height="20" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'cs-m12',
        prompt: 'Területek aránya',
        value: "T' = λ² · T = |λ|² · T (a hasonlósági arány négyzete)",
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <rect x="12" y="12" width="12" height="12" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1" />
            <rect x="36" y="4" width="24" height="24" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="48" y="18" textAnchor="middle" className="text-[7px] font-black fill-purple-950">λ²·T</text>
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Párhuzamos szelők és alkalmazások',
    subtitle: 'Párosítsd a tételeket, képleteket és gyakorlati alkalmazásokat!',
    pairs: [
      {
        id: 'cs-m13',
        prompt: 'Párhuzamos szelőszakaszok tétele',
        value: "OA' / OA = OB' / OB = A'B' / AB = |λ|",
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="5" y1="15" x2="65" y2="4" stroke="#64748b" strokeWidth="1" />
            <line x1="5" y1="15" x2="65" y2="26" stroke="#64748b" strokeWidth="1" />
            <line x1="30" y1="7" x2="30" y2="23" stroke="#3b82f6" strokeWidth="1.5" />
            <line x1="55" y1="3" x2="55" y2="27" stroke="#8b5cf6" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'cs-m14',
        prompt: 'Háromszög súlypontja (S)',
        value: "A csúcsok és oldalfelező pontok között λ = -1/2 középpontos hasonlóság áll fenn",
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="10,26 60,26 35,4" fill="none" stroke="#64748b" strokeWidth="1" />
            <polygon points="35,26 47.5,15 22.5,15" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1" />
            <circle cx="35" cy="18.6" r="2" fill="#ef4444" />
            <text x="35" y="16" textAnchor="middle" className="text-[5px] font-bold fill-rose-600">S</text>
          </svg>
        )
      },
      {
        id: 'cs-m15',
        prompt: 'Camera obscura (lyukkamera)',
        value: 'Optikai középpontos hasonlóság negatív aránnyal: a kép fejjel lefelé jön létre',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="12" y1="6" x2="12" y2="24" stroke="#10b981" strokeWidth="2" />
            <line x1="12" y1="6" x2="58" y2="24" stroke="#94a3b8" strokeDasharray="1 1" strokeWidth="1" />
            <line x1="12" y1="24" x2="58" y2="6" stroke="#94a3b8" strokeDasharray="1 1" strokeWidth="1" />
            <line x1="58" y1="6" x2="58" y2="24" stroke="#ef4444" strokeWidth="2" />
            <circle cx="35" cy="15" r="2" fill="#000000" />
          </svg>
        )
      },
      {
        id: 'cs-m16',
        prompt: 'Origó középpontú leképezés',
        value: "P(x, y) koordinátájú pont képe P'(λx, λy)",
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="25" x2="60" y2="25" stroke="#94a3b8" strokeWidth="1" />
            <line x1="20" y1="5" x2="20" y2="28" stroke="#94a3b8" strokeWidth="1" />
            <circle cx="32" cy="18" r="2" fill="#2563eb" />
            <circle cx="50" cy="10" r="2" fill="#7c3aed" />
            <text x="50" y="8" textAnchor="middle" className="text-[5px] font-bold fill-purple-700">(λx, λy)</text>
          </svg>
        )
      },
      {
        id: 'cs-m17',
        prompt: 'Háromszög középvonala',
        value: 'λ = 1/2 arányú kicsinyítést hoz létre a szemközti csúcsból nézve, T\' = T/4',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="15,26 55,26 35,4" fill="none" stroke="#64748b" strokeWidth="1" />
            <line x1="25" y1="15" x2="45" y2="15" stroke="#2563eb" strokeWidth="1.5" />
            <text x="35" y="13" textAnchor="middle" className="text-[5px] font-bold fill-blue-600">k = 1/2</text>
          </svg>
        )
      },
      {
        id: 'cs-m18',
        prompt: 'λ = -2 hatása a területre',
        value: "A kép pontjai 2-szer távolabb kerülnek átfordulva, területe 4-szeresére nő (T' = 4·T)",
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="40,20 50,20 45,12" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
            <circle cx="32" cy="15" r="2" fill="#4f46e5" />
            <polygon points="20,10 5,10 12,26" fill="#fecdd3" stroke="#e11d48" strokeWidth="1.5" />
            <text x="12" y="19" textAnchor="middle" className="text-[5px] font-black fill-rose-900">4·T</text>
          </svg>
        )
      }
    ]
  }
};

export const CentralSimilarityMatcher: React.FC<CentralSimilarityMatcherProps> = ({
  level,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g8-geom-central-similarity',
  topicTitle = 'A középpontos hasonlóság'
}) => {
  return (
    <MatcherTemplate
      level={level}
      levelsConfig={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      topicId={topicId}
      topicTitle={topicTitle}
      title="Középpontos Hasonlóság Párosító"
      subtitle="Kapcsold össze a fogalmakat, arányokat és képleteket!"
      badge="8. Osztály • Geometria"
      gameId="g8-geom-central-similarity-matcher"
    />
  );
};

export default CentralSimilarityMatcher;
