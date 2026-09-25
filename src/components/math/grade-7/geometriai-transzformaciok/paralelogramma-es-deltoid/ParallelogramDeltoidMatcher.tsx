import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ParallelogramDeltoidMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Alapfogalmak és definíciók',
    subtitle: 'Párosítsd a négyszögtípusokat a legfontosabb definícióikkal és alaptulajdonságaikkal!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Paralelogramma definíciója',
        value: 'Két pár párhuzamos szemközti oldallal rendelkező négyszög',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="15,28 50,28 58,8 23,8" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
            <line x1="23" y1="8" x2="58" y2="8" stroke="#7e22ce" strokeWidth="1.5" />
            <line x1="15" y1="28" x2="50" y2="28" stroke="#7e22ce" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'p2',
        prompt: 'Deltoid definíciója',
        value: 'Két-két szomszédos oldala egyenlő hosszúságú (főátlója szimmetriatengely)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,4 52,15 35,32 18,15" fill="#fce7f3" stroke="#db2777" strokeWidth="1.5" />
            <line x1="35" y1="4" x2="35" y2="32" stroke="#be185d" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 'p3',
        prompt: 'Rombusz definíciója',
        value: 'Minden oldala egyenlő hosszúságú paralelogramma',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,5 57,17.5 35,30 13,17.5" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
            <line x1="35" y1="5" x2="35" y2="30" stroke="#4338ca" strokeWidth="1" strokeDasharray="2 1" />
            <line x1="13" y1="17.5" x2="57" y2="17.5" stroke="#4338ca" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 'p4',
        prompt: 'Téglalap definíciója',
        value: 'Minden belső szöge derékszög (90°-os paralelogramma)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <rect x="14" y="8" width="42" height="20" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
            <path d="M 14 13 L 19 13 L 19 8" fill="none" stroke="#0284c7" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 'p5',
        prompt: 'Négyzet definíciója',
        value: 'Minden oldala egyenlő és minden szöge derékszög (szabályos négyszög)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <rect x="23" y="6" width="24" height="24" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
            <path d="M 23 11 L 28 11 L 28 6" fill="none" stroke="#16a34a" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 'p6',
        prompt: 'Paralelogramma szemközti szögei',
        value: 'Mindig egyenlők egymással (α = γ és β = δ)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="15,27 48,27 55,9 22,9" fill="#fdf4ff" stroke="#a855f7" strokeWidth="1.2" />
            <circle cx="19" cy="24" r="3" fill="#a855f7" />
            <circle cx="51" cy="12" r="3" fill="#a855f7" />
          </svg>
        )
      },
      {
        id: 'p7',
        prompt: 'Paralelogramma szomszédos szögei',
        value: 'Összegük mindig 180° (kiegészítő szögek: α + β = 180°)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="15,27 50,27 58,10 23,10" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
            <path d="M 25 27 A 8 8 0 0 1 18 20" fill="none" stroke="#d97706" strokeWidth="1.5" />
            <text x="30" y="22" className="text-[7px] font-bold fill-amber-700">180°</text>
          </svg>
        )
      },
      {
        id: 'p8',
        prompt: 'Deltoid szimmetriatengelye',
        value: 'A főátló egyenese (összeköti a két eltérő csúcsot)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,3 52,14 35,32 18,14" fill="#fae8ff" stroke="#c026d3" strokeWidth="1.2" />
            <line x1="35" y1="1" x2="35" y2="34" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 1" />
            <text x="38" y="8" className="text-[7px] font-bold fill-rose-600">t</text>
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Átlók, szögek és szimmetriatulajdonságok',
    subtitle: 'Párosítsd a négyszögek átlóira és szimmetriáira vonatkozó tételeket!',
    pairs: [
      {
        id: 'p2-1',
        prompt: 'Paralelogramma átlói',
        value: 'Kölcsönösen felezik egymást a szimmetriaközéppontban',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="12,26 46,26 56,8 22,8" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.2" />
            <line x1="12" y1="26" x2="56" y2="8" stroke="#dc2626" strokeWidth="1" />
            <line x1="22" y1="8" x2="46" y2="26" stroke="#2563eb" strokeWidth="1" />
            <circle cx="34" cy="17" r="2" fill="#7c3aed" />
          </svg>
        )
      },
      {
        id: 'p2-2',
        prompt: 'Deltoid átlóinak egymáshoz viszonyított helyzete',
        value: 'Mindig merőlegesek egymásra (e ⊥ f)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,3 52,14 35,32 18,14" fill="#fff1f2" stroke="#e11d48" strokeWidth="1.2" />
            <line x1="35" y1="3" x2="35" y2="32" stroke="#e11d48" strokeWidth="1.5" />
            <line x1="18" y1="14" x2="52" y2="14" stroke="#0284c7" strokeWidth="1.5" />
            <path d="M 35 18 L 39 18 L 39 14" fill="none" stroke="#475569" strokeWidth="0.8" />
          </svg>
        )
      },
      {
        id: 'p2-3',
        prompt: 'Deltoid mellékátlójának felezése',
        value: 'A főátló merőlegesen felezi a mellékátlót',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,4 54,15 35,31 16,15" fill="#f0fdfa" stroke="#0d9488" strokeWidth="1.2" />
            <line x1="16" y1="15" x2="35" y2="15" stroke="#0d9488" strokeWidth="1.2" />
            <line x1="35" y1="15" x2="54" y2="15" stroke="#0d9488" strokeWidth="1.2" />
            <circle cx="25" cy="15" r="1.2" fill="#0d9488" />
            <circle cx="45" cy="15" r="1.2" fill="#0d9488" />
          </svg>
        )
      },
      {
        id: 'p2-4',
        prompt: 'Deltoid szimmetrikus szögpárja',
        value: 'A mellékátló végpontjainál lévő két szemközti szög egyenlő (β = δ)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,4 52,14 35,31 18,14" fill="#eff6ff" stroke="#2563eb" strokeWidth="1.2" />
            <circle cx="18" cy="14" r="2.5" fill="#2563eb" />
            <circle cx="52" cy="14" r="2.5" fill="#2563eb" />
          </svg>
        )
      },
      {
        id: 'p2-5',
        prompt: 'Rombusz átlóinak különleges tulajdonsága',
        value: 'Merőlegesen felezik egymást, és felezik a belső szögeket is',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,5 57,17.5 35,30 13,17.5" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="1.2" />
            <line x1="35" y1="5" x2="35" y2="30" stroke="#7c3aed" strokeWidth="1" />
            <line x1="13" y1="17.5" x2="57" y2="17.5" stroke="#7c3aed" strokeWidth="1" />
            <path d="M 35 21 L 39 21 L 39 17.5" fill="none" stroke="#475569" strokeWidth="0.8" />
          </svg>
        )
      },
      {
        id: 'p2-6',
        prompt: 'Téglalap átlói',
        value: 'Egyenlő hosszúak és felezik egymást',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <rect x="14" y="8" width="42" height="19" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1.2" />
            <line x1="14" y1="8" x2="56" y2="27" stroke="#0284c7" strokeWidth="1" />
            <line x1="14" y1="27" x2="56" y2="8" stroke="#0284c7" strokeWidth="1" />
            <text x="31" y="24" className="text-[6px] font-bold fill-sky-800">d₁ = d₂</text>
          </svg>
        )
      },
      {
        id: 'p2-7',
        prompt: 'Általános paralelogramma szimmetriája',
        value: 'Középpontosan szimmetrikus, de nincs szimmetriatengelye',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="14,26 46,26 56,9 24,9" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
            <circle cx="35" cy="17.5" r="2.5" fill="#d97706" />
            <text x="39" y="19" className="text-[7px] font-bold fill-amber-800">O</text>
          </svg>
        )
      },
      {
        id: 'p2-8',
        prompt: 'Deltoid érintőkörének létezése',
        value: 'Mindig érintőnégyszög: van beírt köre, ami mind a 4 oldalt érinti',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,4 52,15 35,31 18,15" fill="#ecfdf5" stroke="#059669" strokeWidth="1.2" />
            <circle cx="35" cy="16.5" r="7.8" fill="none" stroke="#10b981" strokeWidth="1" />
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Számítások, összefüggések és kapcsolatok',
    subtitle: 'Alkalmazd a tételeket szögkeresésekre, hierarchiára és speciális esetekre!',
    pairs: [
      {
        id: 'p3-1',
        prompt: 'Paralelogramma egyik szöge 65°',
        value: 'A szomszédos tompaszöge 180° - 65° = 115°',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="12,26 44,26 54,9 22,9" fill="#fdf2f8" stroke="#db2777" strokeWidth="1.2" />
            <text x="16" y="24" className="text-[6px] font-bold fill-pink-600">65°</text>
            <text x="40" y="24" className="text-[6px] font-bold fill-pink-800">115°</text>
          </svg>
        )
      },
      {
        id: 'p3-2',
        prompt: 'Rombusz és a derékszögű háromszögek',
        value: 'Két merőleges átlója 4 darab egybevágó derékszögű háromszögre osztja',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,5 57,17.5 35,30 13,17.5" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.2" />
            <line x1="35" y1="5" x2="35" y2="30" stroke="#9333ea" strokeWidth="1" />
            <line x1="13" y1="17.5" x2="57" y2="17.5" stroke="#9333ea" strokeWidth="1" />
            <text x="24" y="14" className="text-[6px] font-bold fill-purple-700">T₁</text>
            <text x="42" y="14" className="text-[6px] font-bold fill-purple-700">T₂</text>
          </svg>
        )
      },
      {
        id: 'p3-3',
        prompt: 'Rombusz 60°-os hegyesszöggel',
        value: 'A rövidebb átlója 2 darab szabályos (egyenlő oldalú) háromszögre vágja',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,6 52,17.5 35,29 18,17.5" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.2" />
            <line x1="18" y1="17.5" x2="52" y2="17.5" stroke="#ca8a04" strokeWidth="1.2" />
            <text x="28" y="15" className="text-[6px] font-bold fill-amber-700">60°</text>
          </svg>
        )
      },
      {
        id: 'p3-4',
        prompt: 'Deltoid szögei: ha α = 100° és γ = 40°',
        value: 'A két szimmetrikus oldalszög: β = δ = (360° - 140°) / 2 = 110°',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,4 52,15 35,31 18,15" fill="#f1f5f9" stroke="#475569" strokeWidth="1.2" />
            <text x="32" y="10" className="text-[5.5px] font-bold fill-slate-700">100°</text>
            <text x="32" y="28" className="text-[5.5px] font-bold fill-slate-700">40°</text>
          </svg>
        )
      },
      {
        id: 'p3-5',
        prompt: 'Konkáv deltoid (nyílhegy alakzat)',
        value: 'Egyik belső szöge tompább 180°-nál (konkáv), mellékátlója külső',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,4 55,29 35,20 15,29" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.2" />
            <line x1="15" y1="29" x2="55" y2="29" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 'p3-6',
        prompt: 'Rombusz és deltoid közös tulajdonsága',
        value: 'Minden rombusz egyben deltoid is (merőleges átlók, érintőnégyszög)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="28" cy="17.5" r="14" fill="#fae8ff" stroke="#c026d3" strokeWidth="1" />
            <circle cx="34" cy="17.5" r="7" fill="#f3e8ff" stroke="#7c3aed" strokeWidth="1" />
            <text x="20" y="10" className="text-[5.5px] font-bold fill-pink-700">Deltoid</text>
            <text x="30" y="19" className="text-[5px] font-bold fill-purple-800">Rombusz</text>
          </svg>
        )
      },
      {
        id: 'p3-7',
        prompt: 'Négyzet helye a hierarchiában',
        value: 'Egyszerre paralelogramma, téglalap, rombusz és deltoid is',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <rect x="25" y="7" width="20" height="20" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
            <circle cx="35" cy="17" r="9" fill="none" stroke="#16a34a" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 'p3-8',
        prompt: 'Paralelogramma területe alapból és magasságból',
        value: 'T = a · ma (egy oldal és a hozzá tartozó magasság szorzata)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="12,26 44,26 54,9 22,9" fill="#f0fdf4" stroke="#15803d" strokeWidth="1.2" />
            <line x1="22" y1="9" x2="22" y2="26" stroke="#b91c1c" strokeWidth="1.2" strokeDasharray="2 1" />
            <text x="24" y="19" className="text-[6px] font-bold fill-red-700">ma</text>
            <text x="26" y="31" className="text-[6.5px] font-bold fill-emerald-800">a</text>
          </svg>
        )
      }
    ]
  }
};

export const ParallelogramDeltoidMatcher: React.FC<ParallelogramDeltoidMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId,
  topicTitle
}) => {
  const activeLevel = currentLevel || level;

  return (
    <MatcherTemplate
      key={`matcher-para-${activeLevel}`}
      topicId={topicId || 'g7-geom-parallelogram-matcher'}
      topicTitle={topicTitle || 'Paralelogramma és deltoid'}
      badgeText="7. OSZTÁLY • GEOMETRIA • 🔗 PÁROSÍTÓ"
      title="Paralelogramma és Deltoid Párosító Játék"
      subtitle="Keresd meg az összetartozó definíciókat, átlótulajdonságokat és geometriai összefüggéseket!"
      levels={matcherLevels}
      levelsConfig={matcherLevels}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      themeColor="purple"
    />
  );
};

export default ParallelogramDeltoidMatcher;
