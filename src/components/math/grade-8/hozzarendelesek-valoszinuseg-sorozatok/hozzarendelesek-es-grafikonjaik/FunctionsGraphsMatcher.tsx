import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FunctionsGraphsMatcherProps {
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
    title: '1. Szint: Képletek, Meredekség és Tengelymetszet',
    subtitle: 'Párosítsd a lineáris függvények hozzárendelési szabályát a megfelelő tulajdonságaikkal!',
    pairs: [
      {
        id: 'p1',
        prompt: 'f(x) = 2x + 5',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7px] font-black fill-blue-800" textAnchor="middle">a=2, b=5</text>
          </svg>
        ),
        value: 'Meredekség: a = 2 (növekvő), Y-metszet: (0; 5)'
      },
      {
        id: 'p2',
        prompt: 'f(x) = -3x + 1',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7px] font-black fill-rose-800" textAnchor="middle">a=-3, b=1</text>
          </svg>
        ),
        value: 'Meredekség: a = -3 (csökkenő), Y-metszet: (0; 1)'
      },
      {
        id: 'p3',
        prompt: 'f(x) = 4 - x',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#fff7ed" stroke="#f97316" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7px] font-black fill-orange-800" textAnchor="middle">a=-1, b=4</text>
          </svg>
        ),
        value: 'Meredekség: a = -1 (csökkenő), Y-metszet: (0; 4)'
      },
      {
        id: 'p4',
        prompt: 'f(x) = 0,5x - 3',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="4" y="4" width="46" height="20" rx="4" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7px] font-black fill-emerald-800" textAnchor="middle">a=0.5, b=-3</text>
          </svg>
        ),
        value: 'Meredekség: a = 0,5 (enyhén növekvő), Y-metszet: (0; -3)'
      },
      {
        id: 'p5',
        prompt: 'f(x) = 6 (konstans)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="8" y1="14" x2="46" y2="14" stroke="#3b82f6" strokeWidth="2" />
            <text x="27" y="24" className="text-[6px] font-bold fill-blue-900" textAnchor="middle">a = 0 (vízszintes)</text>
          </svg>
        ),
        value: 'Vízszintes egyenes, meredeksége a = 0, metszi az y tengelyt a (0; 6) pontban'
      },
      {
        id: 'p6',
        prompt: 'f(x) = -2x',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="27" cy="14" r="2.5" fill="#3b82f6" />
            <line x1="15" y1="6" x2="39" y2="22" stroke="#3b82f6" strokeWidth="1.8" />
            <text x="27" y="26" className="text-[5.5px] font-bold fill-slate-600" textAnchor="middle">b = 0 (origó)</text>
          </svg>
        ),
        value: 'Egyenes arányosság: átmegy az origón (b = 0), meredeksége a = -2'
      },
      {
        id: 'p7',
        prompt: 'f(x) = x',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="14" y1="22" x2="40" y2="6" stroke="#10b981" strokeWidth="2" />
            <text x="27" y="25" className="text-[5.5px] font-bold fill-emerald-700" textAnchor="middle">I.-III. szögfelező</text>
          </svg>
        ),
        value: 'Az I. és III. síknegyed belső szögfelezője: a = 1, b = 0'
      },
      {
        id: 'p8',
        prompt: 'f(x) = -x',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="14" y1="6" x2="40" y2="22" stroke="#ef4444" strokeWidth="2" />
            <text x="27" y="25" className="text-[5.5px] font-bold fill-rose-700" textAnchor="middle">II.-IV. szögfelező</text>
          </svg>
        ),
        value: 'A II. és IV. síknegyed belső szögfelezője: a = -1, b = 0'
      }
    ]
  },
  2: {
    title: '2. Szint: Zérushelyek Számítása',
    subtitle: 'Határozd meg, hol metszi a függvény grafikonja az x-tengelyt (f(x) = 0)!',
    pairs: [
      {
        id: 'p9',
        prompt: 'f(x) = 2x - 8',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="36" cy="14" r="3" fill="#10b981" />
            <line x1="8" y1="14" x2="46" y2="14" stroke="#94a3b8" strokeWidth="1" />
            <text x="36" y="24" className="text-[6.5px] font-bold fill-emerald-800" textAnchor="middle">x = 4</text>
          </svg>
        ),
        value: 'Zérushely: x = 4 (mert 2 · 4 - 8 = 0, metszéspont: (4; 0))'
      },
      {
        id: 'p10',
        prompt: 'f(x) = 3x + 9',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="18" cy="14" r="3" fill="#10b981" />
            <line x1="8" y1="14" x2="46" y2="14" stroke="#94a3b8" strokeWidth="1" />
            <text x="18" y="24" className="text-[6.5px] font-bold fill-emerald-800" textAnchor="middle">x = -3</text>
          </svg>
        ),
        value: 'Zérushely: x = -3 (mert 3 · (-3) + 9 = 0, metszéspont: (-3; 0))'
      },
      {
        id: 'p11',
        prompt: 'f(x) = -4x + 12',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="32" cy="14" r="3" fill="#10b981" />
            <line x1="8" y1="14" x2="46" y2="14" stroke="#94a3b8" strokeWidth="1" />
            <text x="32" y="24" className="text-[6.5px] font-bold fill-emerald-800" textAnchor="middle">x = 3</text>
          </svg>
        ),
        value: 'Zérushely: x = 3 (mert -4 · 3 + 12 = 0, metszéspont: (3; 0))'
      },
      {
        id: 'p12',
        prompt: 'f(x) = 5x',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="27" cy="14" r="3" fill="#3b82f6" />
            <line x1="8" y1="14" x2="46" y2="14" stroke="#94a3b8" strokeWidth="1" />
            <text x="27" y="24" className="text-[6.5px] font-bold fill-blue-800" textAnchor="middle">x = 0</text>
          </svg>
        ),
        value: 'Zérushely: x = 0 (az origóban metszi a tengelyt, (0; 0))'
      },
      {
        id: 'p13',
        prompt: 'f(x) = -2x - 10',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="14" cy="14" r="3" fill="#10b981" />
            <line x1="8" y1="14" x2="46" y2="14" stroke="#94a3b8" strokeWidth="1" />
            <text x="14" y="24" className="text-[6.5px] font-bold fill-emerald-800" textAnchor="middle">x = -5</text>
          </svg>
        ),
        value: 'Zérushely: x = -5 (mert -2 · (-5) - 10 = 0, metszéspont: (-5; 0))'
      },
      {
        id: 'p14',
        prompt: 'f(x) = 0,5x - 2',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="36" cy="14" r="3" fill="#10b981" />
            <line x1="8" y1="14" x2="46" y2="14" stroke="#94a3b8" strokeWidth="1" />
            <text x="36" y="24" className="text-[6.5px] font-bold fill-emerald-800" textAnchor="middle">x = 4</text>
          </svg>
        ),
        value: 'Zérushely: x = 4 (mert 0,5 · 4 - 2 = 0, metszéspont: (4; 0))'
      },
      {
        id: 'p15',
        prompt: 'f(x) = x² - 4',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="16" cy="14" r="2.5" fill="#6366f1" />
            <circle cx="38" cy="14" r="2.5" fill="#6366f1" />
            <line x1="8" y1="14" x2="46" y2="14" stroke="#94a3b8" strokeWidth="1" />
            <text x="27" y="24" className="text-[6px] font-bold fill-indigo-800" textAnchor="middle">x = ±2</text>
          </svg>
        ),
        value: 'Két zérushely: x₁ = 2 és x₂ = -2 (két pontban metszi az x tengelyt)'
      },
      {
        id: 'p16',
        prompt: 'f(x) = |x| - 3',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="16" cy="14" r="2.5" fill="#06b6d4" />
            <circle cx="38" cy="14" r="2.5" fill="#06b6d4" />
            <line x1="8" y1="14" x2="46" y2="14" stroke="#94a3b8" strokeWidth="1" />
            <text x="27" y="24" className="text-[6px] font-bold fill-cyan-800" textAnchor="middle">x = ±3</text>
          </svg>
        ),
        value: 'Két zérushely: x₁ = 3 és x₂ = -3 (ahol |x| = 3)'
      }
    ]
  },
  3: {
    title: '3. Szint: Párhuzamosság, Pontilleszkedés és Görbék',
    subtitle: 'Párosítsd az egyenespárok kapcsolatát, a pontok illeszkedését és a nevezetes görbéket!',
    pairs: [
      {
        id: 'p17',
        prompt: 'y = 3x + 2 és y = 3x - 7',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="12" y1="20" x2="38" y2="4" stroke="#3b82f6" strokeWidth="1.5" />
            <line x1="16" y1="24" x2="42" y2="8" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="2 2" />
            <text x="27" y="26" className="text-[6px] font-bold fill-blue-800" textAnchor="middle">a₁ = a₂ = 3</text>
          </svg>
        ),
        value: 'Párhuzamos egyenesek: meredekségük megegyezik (a = 3), y-metszetük eltér'
      },
      {
        id: 'p18',
        prompt: 'y = 2x + 1 és y = -0,5x + 4',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="16" y1="22" x2="38" y2="6" stroke="#6366f1" strokeWidth="1.5" />
            <line x1="16" y1="8" x2="38" y2="20" stroke="#6366f1" strokeWidth="1.5" />
            <text x="27" y="26" className="text-[5.5px] font-bold fill-indigo-800" textAnchor="middle">Merőlegesek (90°)</text>
          </svg>
        ),
        value: 'Merőleges egyenesek: meredekségeik szorzata 2 · (-0,5) = -1'
      },
      {
        id: 'p19',
        prompt: 'f(x) = 4x - 5 és a P(2; 3) pont',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="6" y="6" width="42" height="16" rx="4" fill="#f0fdf4" stroke="#10b981" strokeWidth="1" />
            <text x="27" y="17" className="text-[6.5px] font-black fill-emerald-800" textAnchor="middle">4·2 - 5 = 3 ✓</text>
          </svg>
        ),
        value: 'A P pont illeszkedik az egyenesre (f(2) = 4 · 2 - 5 = 3, igaz állítás)'
      },
      {
        id: 'p20',
        prompt: 'f(x) = -2x + 6 és a Q(4; -2) pont',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="6" y="6" width="42" height="16" rx="4" fill="#f0fdf4" stroke="#10b981" strokeWidth="1" />
            <text x="27" y="17" className="text-[6.5px] font-black fill-emerald-800" textAnchor="middle">-2·4 + 6 = -2 ✓</text>
          </svg>
        ),
        value: 'A Q pont illeszkedik az egyenesre (f(4) = -2 · 4 + 6 = -2, igaz állítás)'
      },
      {
        id: 'p21',
        prompt: 'f(x) = x² (alapparabola)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <path d="M 12 6 Q 27 26 42 6" fill="none" stroke="#6366f1" strokeWidth="1.8" />
            <circle cx="27" cy="21" r="2" fill="#6366f1" />
            <text x="27" y="27" className="text-[5.5px] font-bold fill-indigo-900" textAnchor="middle">Tengelypont: (0;0)</text>
          </svg>
        ),
        value: 'Felfelé nyíló parabola, tengelyesen szimmetrikus az y-tengelyre, minimuma (0; 0)'
      },
      {
        id: 'p22',
        prompt: 'f(x) = |x| (abszolútérték)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <path d="M 14 6 L 27 20 L 40 6" fill="none" stroke="#06b6d4" strokeWidth="1.8" />
            <circle cx="27" cy="20" r="2" fill="#06b6d4" />
            <text x="27" y="27" className="text-[5.5px] font-bold fill-cyan-900" textAnchor="middle">„V” csúcs: (0;0)</text>
          </svg>
        ),
        value: 'Origóban törő „V” alakzat, értékei nemnegatívak (y ≥ 0), csúcspontja (0; 0)'
      },
      {
        id: 'p23',
        prompt: 'f(x) = x² + 2',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <path d="M 14 6 Q 27 20 40 6" fill="none" stroke="#8b5cf6" strokeWidth="1.8" />
            <circle cx="27" cy="16" r="2" fill="#8b5cf6" />
            <text x="27" y="26" className="text-[5.5px] font-bold fill-violet-900" textAnchor="middle">Csúcs: (0; 2)</text>
          </svg>
        ),
        value: 'Felfelé eltolt parabola: tengelypontja a (0; 2) pontban van, nincs zérushelye'
      },
      {
        id: 'p24',
        prompt: 'f(x) = |x| - 1',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <path d="M 14 8 L 27 22 L 40 8" fill="none" stroke="#06b6d4" strokeWidth="1.8" />
            <circle cx="27" cy="22" r="2" fill="#06b6d4" />
            <text x="27" y="27" className="text-[5.5px] font-bold fill-cyan-900" textAnchor="middle">Csúcs: (0; -1)</text>
          </svg>
        ),
        value: 'Lefelé 1 egységgel eltolt „V” alakzat: csúcspontja (0; -1), zérushelyei x = ±1'
      }
    ]
  }
};

export const FunctionsGraphsMatcher: React.FC<FunctionsGraphsMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g8-func-graphs',
  topicTitle = 'Hozzárendelések és Grafikonjaik'
}) => {
  return (
    <MatcherTemplate
      level={level}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="blue"
    />
  );
};

export default FunctionsGraphsMatcher;
