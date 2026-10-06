import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SphereMatcherProps {
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
    title: '1. Szint: Alapképletek és Definíciók',
    subtitle: 'Párosítsd a gömb fogalmait és jellemzőit a helyes matematikai képletekkel!',
    pairs: [
      {
        id: 'sm1-1',
        prompt: 'Gömb felszíne (A)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="27" cy="14" r="11" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.2" />
            <ellipse cx="27" cy="14" rx="11" ry="3.5" fill="none" stroke="#1d4ed8" strokeWidth="0.8" strokeDasharray="2 1.5" />
          </svg>
        ),
        value: 'A = 4πr² (Négyszerese a főkör területének)'
      },
      {
        id: 'sm1-2',
        prompt: 'Gömb térfogata (V)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="27" cy="14" r="11" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.2" />
            <text x="27" y="17" className="text-[7px] font-bold fill-purple-900" textAnchor="middle">4/3</text>
          </svg>
        ),
        value: 'V = (4/3)πr³ (A sugár köbének négyszerese per 3)'
      },
      {
        id: 'sm1-3',
        prompt: 'Főkör területe (Tf)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="27" cy="14" r="10" fill="#fef3c7" stroke="#d97706" strokeWidth="1.2" />
            <line x1="27" y1="14" x2="37" y2="14" stroke="#b45309" strokeWidth="1.2" />
            <text x="32" y="12" className="text-[6.5px] font-bold fill-amber-900" textAnchor="middle">r</text>
          </svg>
        ),
        value: 'T = r²π (A gömb legnagyobb lehetséges síkmetszete)'
      },
      {
        id: 'sm1-4',
        prompt: 'Főkör kerülete (K)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="27" cy="14" r="10" fill="none" stroke="#059669" strokeWidth="1.6" />
            <text x="27" y="17" className="text-[7px] font-bold fill-emerald-800" textAnchor="middle">2πr</text>
          </svg>
        ),
        value: 'K = 2πr (A gömb kerülete az Egyenlítő mentén)'
      },
      {
        id: 'sm1-5',
        prompt: 'Tömör félgömb teljes felszíne',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <path d="M 16,18 A 11,11 0 0,1 38,18 Z" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1" />
            <ellipse cx="27" cy="18" rx="11" ry="3.5" fill="#fee2e2" stroke="#e11d48" strokeWidth="1" />
          </svg>
        ),
        value: 'A = 3πr² (2πr² gömbsüveg + πr² sík alapkörlap)'
      },
      {
        id: 'sm1-6',
        prompt: 'Félgömb térfogata',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <path d="M 16,18 A 11,11 0 0,1 38,18 Z" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1" />
          </svg>
        ),
        value: 'V = (2/3)πr³ (A teljes gömb térfogatának pontosan a fele)'
      },
      {
        id: 'sm1-7',
        prompt: 'Átmérő és sugár összefüggése',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="16" y1="14" x2="38" y2="14" stroke="#3b82f6" strokeWidth="1.6" />
            <circle cx="27" cy="14" r="2" fill="#1d4ed8" />
          </svg>
        ),
        value: 'd = 2r (A sugár kétszerese az átmérő)'
      },
      {
        id: 'sm1-8',
        prompt: 'A gömb bármely síkmetszete',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <ellipse cx="27" cy="14" rx="10" ry="7" fill="#f1f5f9" stroke="#475569" strokeWidth="1.2" />
          </svg>
        ),
        value: 'Mindig kör (középponttól való távolság határozza meg a sugarát)'
      }
    ]
  },
  2: {
    title: '2. Szint: Számítások és Numerikus Értékek',
    subtitle: 'Párosítsd a megadott adatokat a pontos vagy közelítő számítási eredménnyel!',
    pairs: [
      {
        id: 'sm2-1',
        prompt: 'r = 5 cm sugarú gömb felszíne',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="27" cy="14" r="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
            <text x="27" y="16.5" className="text-[6px] font-mono font-bold fill-blue-900" textAnchor="middle">r=5</text>
          </svg>
        ),
        value: 'A = 100π ≈ 314 cm² (4 · 25 · π)'
      },
      {
        id: 'sm2-2',
        prompt: 'r = 3 cm sugarú gömb térfogata',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="27" cy="14" r="10" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1" />
            <text x="27" y="16.5" className="text-[6px] font-mono font-bold fill-purple-900" textAnchor="middle">r=3</text>
          </svg>
        ),
        value: 'V = 36π ≈ 113,04 cm³ ((4/3) · 27 · π)'
      },
      {
        id: 'sm2-3',
        prompt: 'd = 10 cm átmérőjű gömb főkörének területe',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="27" cy="14" r="10" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <text x="27" y="16.5" className="text-[6px] font-mono font-bold fill-amber-900" textAnchor="middle">d=10</text>
          </svg>
        ),
        value: 'Tf = 25π ≈ 78,5 cm² (r = 5 cm ⇒ 5²π)'
      },
      {
        id: 'sm2-4',
        prompt: 'Tf = 15 cm² főkörű gömb felszíne',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="12" y="6" width="30" height="16" rx="3" fill="#fee2e2" stroke="#ef4444" strokeWidth="1" />
            <text x="27" y="16.5" className="text-[6.5px] font-mono font-bold fill-rose-900" textAnchor="middle">Tf=15</text>
          </svg>
        ),
        value: 'A = 60 cm² (Négyszerese a főkörnek: 4 · 15)'
      },
      {
        id: 'sm2-5',
        prompt: 'r = 6 cm félgömb térfogata',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <path d="M 17,18 A 10,10 0 0,1 37,18 Z" fill="#cffafe" stroke="#0891b2" strokeWidth="1" />
            <text x="27" y="15" className="text-[6px] font-mono font-bold fill-cyan-900" textAnchor="middle">r=6</text>
          </svg>
        ),
        value: 'V = 144π ≈ 452,4 cm³ ((2/3) · 216 · π)'
      },
      {
        id: 'sm2-6',
        prompt: 'r = 2 cm tömör félgömb teljes felszíne',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <path d="M 17,18 A 10,10 0 0,1 37,18 Z" fill="#fce7f3" stroke="#db2777" strokeWidth="1" />
            <text x="27" y="15" className="text-[6px] font-mono font-bold fill-pink-900" textAnchor="middle">r=2</text>
          </svg>
        ),
        value: 'A = 12π ≈ 37,7 cm² (3 · 2² · π = 12π)'
      },
      {
        id: 'sm2-7',
        prompt: 'r = 10 cm gömb kisköre x = 6 cm távolságra',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="20,20 34,20 34,8" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
            <text x="27" y="16" className="text-[5.5px] font-mono fill-emerald-900" textAnchor="middle">Pitagorasz</text>
          </svg>
        ),
        value: 'Sugár ρ = 8 cm (√(10² - 6²) = √64 = 8)'
      },
      {
        id: 'sm2-8',
        prompt: 'd = 20 cm átmérőjű labda térfogata literben',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="27" cy="14" r="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1" />
            <text x="27" y="16.5" className="text-[6px] font-mono font-bold fill-emerald-800" textAnchor="middle">d=20</text>
          </svg>
        ),
        value: 'kb. 4,19 liter (r = 10 cm ⇒ 4187 cm³ = 4,187 dm³)'
      }
    ]
  },
  3: {
    title: '3. Szint: Arányok, Sűrűség és Összetett Tételek',
    subtitle: 'Párosítsd a geometriai tételeket, hasonlósági törvényeket és fizikai összefüggéseket!',
    pairs: [
      {
        id: 'sm3-1',
        prompt: 'Sugár 2-szeresre növelésének hatása a felszínre',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="14" y="6" width="26" height="16" rx="3" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
            <text x="27" y="16.5" className="text-[6.5px] font-mono font-bold fill-blue-900" textAnchor="middle">2× sugár</text>
          </svg>
        ),
        value: '4-szeresére nő (A hasonlóság négyzete: 2² = 4)'
      },
      {
        id: 'sm3-2',
        prompt: 'Sugár 2-szeresre növelésének hatása a térfogatra',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="14" y="6" width="26" height="16" rx="3" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1" />
            <text x="27" y="16.5" className="text-[6.5px] font-mono font-bold fill-purple-900" textAnchor="middle">2× sugár</text>
          </svg>
        ),
        value: '8-szorosára nő (A hasonlóság köbe: 2³ = 8)'
      },
      {
        id: 'sm3-3',
        prompt: 'Sugár 3-szorosra növelése esetén a térfogat',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="14" y="6" width="26" height="16" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
            <text x="27" y="16.5" className="text-[6.5px] font-mono font-bold fill-amber-900" textAnchor="middle">3× sugár</text>
          </svg>
        ),
        value: '27-szeresére nő (A hasonlóság köbe: 3³ = 27)'
      },
      {
        id: 'sm3-4',
        prompt: 'Arkhimédész tétele: Gömb és köré írt henger',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="18" y="4" width="18" height="20" fill="#f8fafc" stroke="#475569" strokeWidth="1" />
            <circle cx="27" cy="14" r="9" fill="#e0e7ff" stroke="#4338ca" strokeWidth="1" />
          </svg>
        ),
        value: 'Vgömb = 2/3 · Vhenger (A henger térfogatának kétharmada)'
      },
      {
        id: 'sm3-5',
        prompt: 'Érintősík távolsága a gömb középpontjától',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="27" cy="16" r="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1" />
            <line x1="12" y1="6" x2="42" y2="6" stroke="#dc2626" strokeWidth="1.2" />
          </svg>
        ),
        value: 'x = r (Pontosan a sugárral egyenlő, 1 közös pont)'
      },
      {
        id: 'sm3-6',
        prompt: '1 dm³ térfogatú vasgolyó tömege (ρ = 7,8 kg/dm³)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="27" cy="14" r="10" fill="#f1f5f9" stroke="#334155" strokeWidth="1.2" />
            <text x="27" y="16.5" className="text-[6px] font-bold fill-slate-800" textAnchor="middle">m = ρ·V</text>
          </svg>
        ),
        value: 'm = 7,8 kg (Tömeg = Sűrűség · Térfogat)'
      },
      {
        id: 'sm3-7',
        prompt: 'A gömb és a köré írt henger felszínének kapcsolata',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="18" y="4" width="18" height="20" fill="none" stroke="#64748b" strokeWidth="1" />
            <circle cx="27" cy="14" r="9" fill="none" stroke="#2563eb" strokeWidth="1.2" />
          </svg>
        ),
        value: 'Agömb = Tphenger = 4πr² (A henger palástja megegyezik a gömbfelszínnel)'
      },
      {
        id: 'sm3-8',
        prompt: 'A gömb felbontása kis gúlákra',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <polygon points="27,14 18,24 36,24" fill="#fef2f2" stroke="#ef4444" strokeWidth="1" />
            <circle cx="27" cy="14" r="1.5" fill="#ef4444" />
          </svg>
        ),
        value: 'V = (A · r) / 3 = (4/3)πr³ (Gúlaalap A, magasság r)'
      }
    ]
  }
};

export const SphereMatcher: React.FC<SphereMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g8-solids',
  topicTitle = 'A Gömb (8. osztály)'
}) => {
  return (
    <MatcherTemplate
      level={level}
      levels={matcherLevels}
      levelConfigs={matcherLevels}
      levelConfig={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="blue"
    />
  );
};

export default SphereMatcher;
