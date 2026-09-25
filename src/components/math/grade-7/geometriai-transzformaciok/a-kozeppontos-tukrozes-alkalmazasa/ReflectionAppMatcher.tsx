import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ReflectionAppMatcherProps {
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
    title: '1. Szint: Alapfogalmak és Alapkészségek',
    subtitle: 'Párosítsd a középvonal, szakaszfelező és alaptulajdonságok fogalmait!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Középvonal definíciója',
        value: 'A háromszög két oldalának felezőpontját összekötő szakasz',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="10,30 60,30 35,5" fill="none" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="22.5" y1="17.5" x2="47.5" y2="17.5" stroke="#0284c7" strokeWidth="2" />
            <circle cx="22.5" cy="17.5" r="2.5" fill="#0284c7" />
            <circle cx="47.5" cy="17.5" r="2.5" fill="#0284c7" />
          </svg>
        )
      },
      {
        id: 'p2',
        prompt: 'Középvonal hossza (k)',
        value: 'k = c / 2 (pontosan a harmadik oldal hosszának a fele)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="15" y1="10" x2="45" y2="10" stroke="#0284c7" strokeWidth="2" />
            <line x1="5" y1="25" x2="65" y2="25" stroke="#16a34a" strokeWidth="2" />
            <text x="25" y="8" className="text-[7px] font-bold fill-sky-700">k</text>
            <text x="32" y="23" className="text-[7px] font-bold fill-emerald-700">c = 2k</text>
          </svg>
        )
      },
      {
        id: 'p3',
        prompt: 'Középvonal állása',
        value: 'Párhuzamos a harmadik oldallal (k ∥ c)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="10" y1="12" x2="60" y2="12" stroke="#0284c7" strokeWidth="2" />
            <line x1="10" y1="24" x2="60" y2="24" stroke="#0284c7" strokeWidth="2" />
            <text x="32" y="20" className="text-[8px] font-bold fill-sky-600">∥</text>
          </svg>
        )
      },
      {
        id: 'p4',
        prompt: 'Szakasz felezőpontjára tükrözés',
        value: 'A végpontok helyet cserélnek: A\' = B és B\' = A',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="10" y1="17" x2="60" y2="17" stroke="#94a3b8" strokeWidth="1.5" />
            <circle cx="10" cy="17" r="3" fill="#0284c7" />
            <circle cx="35" cy="17" r="3.5" fill="#f59e0b" />
            <circle cx="60" cy="17" r="3" fill="#0d9488" />
            <text x="8" y="10" className="text-[7px] font-bold fill-sky-700">A</text>
            <text x="32" y="10" className="text-[7px] font-bold fill-amber-700">F</text>
            <text x="56" y="10" className="text-[7px] font-bold fill-teal-700">B</text>
          </svg>
        )
      },
      {
        id: 'p5',
        prompt: 'Három középvonal felosztása',
        value: '4 darab egymással egybevágó kis háromszögre osztja a háromszöget',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="10,30 60,30 35,5" fill="none" stroke="#0284c7" strokeWidth="1.5" />
            <polygon points="22.5,17.5 47.5,17.5 35,30" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2" />
            <text x="32" y="22" className="text-[7px] font-bold fill-sky-800">4 db</text>
          </svg>
        )
      },
      {
        id: 'p6',
        prompt: 'Kis háromszög területe',
        value: 'T_kis = T / 4 (az eredeti terület pontosan egynegyede)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="10,30 60,30 35,5" fill="none" stroke="#0284c7" strokeWidth="1" />
            <polygon points="22.5,17.5 47.5,17.5 35,30" fill="#bae6fd" stroke="#0284c7" strokeWidth="1" />
            <text x="24" y="26" className="text-[7px] font-bold fill-sky-900">T / 4</text>
          </svg>
        )
      },
      {
        id: 'p7',
        prompt: 'Kis háromszög kerülete',
        value: 'K_kis = K / 2 (az eredeti kerület pontosan a fele)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="20,25 50,25 35,8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
            <text x="26" y="20" className="text-[8px] font-bold fill-sky-800">K / 2</text>
          </svg>
        )
      },
      {
        id: 'p8',
        prompt: 'Trapéz középvonala',
        value: 'k = (a + c) / 2 (a két párhuzamos alap számtani közepe)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="10,30 60,30 48,10 22,10" fill="none" stroke="#0284c7" strokeWidth="1.2" />
            <line x1="16" y1="20" x2="54" y2="20" stroke="#f59e0b" strokeWidth="1.8" />
            <text x="32" y="19" className="text-[7px] font-bold fill-amber-700">k</text>
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Paralelogrammák és Bizonyítások',
    subtitle: 'Párosítsd a négyszögek átlóit, bizonyítási lépéseket és összefüggéseket!',
    pairs: [
      {
        id: 'p9',
        prompt: 'P tükrözése AB felezőpontjára',
        value: 'APBP\' négyszög szükségképpen paralelogramma',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="15,22 35,8 55,14 35,28" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
            <circle cx="35" cy="18" r="2" fill="#f59e0b" />
          </svg>
        )
      },
      {
        id: 'p10',
        prompt: 'Paralelogramma átlói',
        value: 'Kölcsönösen felezik egymást az O metszéspontban',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="10,25 30,8 60,8 40,25" fill="none" stroke="#0284c7" strokeWidth="1.2" />
            <line x1="10" y1="25" x2="60" y2="8" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <line x1="30" y1="8" x2="40" y2="25" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <circle cx="35" cy="16.5" r="2" fill="#f59e0b" />
          </svg>
        )
      },
      {
        id: 'p11',
        prompt: 'Rombusz átlói',
        value: 'Merőlegesen felezik egymást (e ⊥ f és felezik egymást)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,5 55,17.5 35,30 15,17.5" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.2" />
            <line x1="35" y1="5" x2="35" y2="30" stroke="#16a34a" strokeWidth="1" />
            <line x1="15" y1="17.5" x2="55" y2="17.5" stroke="#16a34a" strokeWidth="1" />
            <rect x="35" y="14.5" width="3" height="3" fill="none" stroke="#16a34a" strokeWidth="0.8" />
          </svg>
        )
      },
      {
        id: 'p12',
        prompt: 'Téglalap átlói',
        value: 'Egyenlő hosszúak és felezik egymást (|e| = |f|)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <rect x="15" y="8" width="40" height="20" fill="#f0f9ff" stroke="#0284c7" strokeWidth="1.2" />
            <line x1="15" y1="8" x2="55" y2="28" stroke="#0284c7" strokeDasharray="2 2" strokeWidth="1" />
            <line x1="15" y1="28" x2="55" y2="8" stroke="#0284c7" strokeDasharray="2 2" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 'p13',
        prompt: 'Négyzet átlói',
        value: 'Egyenlők, merőlegesek és kölcsönösen felezik egymást',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <rect x="23" y="6" width="24" height="24" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.2" />
            <line x1="23" y1="6" x2="47" y2="30" stroke="#7c3aed" strokeWidth="1" />
            <line x1="23" y1="30" x2="47" y2="6" stroke="#7c3aed" strokeWidth="1" />
            <circle cx="35" cy="18" r="1.5" fill="#f59e0b" />
          </svg>
        )
      },
      {
        id: 'p14',
        prompt: 'Súlyvonal definíciója',
        value: 'A csúcsot a szemközti oldal felezőpontjával összekötő szakasz',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="10,30 60,30 40,6" fill="none" stroke="#64748b" strokeWidth="1.2" />
            <line x1="40" y1="6" x2="35" y2="30" stroke="#e11d48" strokeWidth="1.8" />
            <circle cx="35" cy="30" r="2" fill="#e11d48" />
          </svg>
        )
      },
      {
        id: 'p15',
        prompt: 'Középvonal vs Súlyvonal',
        value: 'A középvonal oldalfelezőket köt össze, a súlyvonal csúcsból indul',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="10,30 60,30 35,6" fill="none" stroke="#94a3b8" strokeWidth="1" />
            <line x1="22.5" y1="18" x2="47.5" y2="18" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="35" y1="6" x2="35" y2="30" stroke="#e11d48" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'p16',
        prompt: 'Középvonal-tétel megfordítása',
        value: 'Ha egy egyenes felezi az egyik oldalt és párhuzamos az alappal, felezi a harmadik oldalt is',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="10,30 60,30 35,6" fill="none" stroke="#0284c7" strokeWidth="1.2" />
            <line x1="15" y1="18" x2="55" y2="18" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="22.5" cy="18" r="2.5" fill="#16a34a" />
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Számításos és Koordináta Feladványok',
    subtitle: 'Számítsd ki az értékeket a tételek alkalmazásával!',
    pairs: [
      {
        id: 'p17',
        prompt: 'c = 16 cm oldal középvonala (k)',
        value: 'k = 8 cm (mert k = 16 / 2)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="20" y1="12" x2="50" y2="12" stroke="#0284c7" strokeWidth="2" />
            <line x1="10" y1="26" x2="60" y2="26" stroke="#16a34a" strokeWidth="2" />
            <text x="32" y="9" className="text-[7px] font-bold fill-sky-700">k=?</text>
            <text x="26" y="24" className="text-[7px] font-bold fill-emerald-700">c=16</text>
          </svg>
        )
      },
      {
        id: 'p18',
        prompt: 'k = 11 cm középvonalhoz tartozó alap (c)',
        value: 'c = 22 cm (mert c = 2 · 11)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="20" y1="12" x2="50" y2="12" stroke="#0284c7" strokeWidth="2" />
            <line x1="10" y1="26" x2="60" y2="26" stroke="#16a34a" strokeWidth="2" />
            <text x="28" y="9" className="text-[7px] font-bold fill-sky-700">k=11</text>
            <text x="30" y="24" className="text-[7px] font-bold fill-emerald-700">c=?</text>
          </svg>
        )
      },
      {
        id: 'p19',
        prompt: 'K = 36 cm háromszög középvonal-háromszöge',
        value: 'K\' = 18 cm (a belső kerület K / 2)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="10,30 60,30 35,6" fill="none" stroke="#94a3b8" strokeWidth="1" />
            <polygon points="22.5,18 47.5,18 35,30" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
            <text x="28" y="24" className="text-[6.5px] font-bold fill-sky-800">K' = 18</text>
          </svg>
        )
      },
      {
        id: 'p20',
        prompt: 'T = 48 cm² háromszög középvonal-háromszöge',
        value: 'T\' = 12 cm² (a belső terület T / 4)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="10,30 60,30 35,6" fill="none" stroke="#94a3b8" strokeWidth="1" />
            <polygon points="22.5,18 47.5,18 35,30" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
            <text x="28" y="24" className="text-[6.5px] font-bold fill-sky-900">T' = 12</text>
          </svg>
        )
      },
      {
        id: 'p21',
        prompt: 'Trapéz: a = 14 cm és c = 6 cm',
        value: 'k = 10 cm (k = (14 + 6) / 2 = 20 / 2)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="10,28 60,28 45,10 25,10" fill="none" stroke="#0284c7" strokeWidth="1" />
            <line x1="17.5" y1="19" x2="52.5" y2="19" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="32" y="18" className="text-[6.5px] font-bold fill-amber-700">k=?</text>
          </svg>
        )
      },
      {
        id: 'p22',
        prompt: 'Trapéz: k = 15 cm és a = 22 cm',
        value: 'c = 8 cm (c = 2 · 15 - 22 = 30 - 22)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="8,28 62,28 48,10 22,10" fill="none" stroke="#0284c7" strokeWidth="1" />
            <line x1="15" y1="19" x2="55" y2="19" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="30" y="9" className="text-[6px] font-bold fill-sky-800">c=?</text>
            <text x="28" y="18" className="text-[6px] font-bold fill-amber-700">k=15</text>
          </svg>
        )
      },
      {
        id: 'p23',
        prompt: 'Átlómetszéspont O(4; 3) és A(1; 1)',
        value: 'C(7; 5) (mivel O felezi AC-t: x = 2·4-1, y = 2·3-1)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="15" y1="25" x2="55" y2="9" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1.2" />
            <circle cx="15" cy="25" r="2.5" fill="#0284c7" />
            <circle cx="35" cy="17" r="3" fill="#f59e0b" />
            <circle cx="55" cy="9" r="2.5" fill="#0d9488" />
            <text x="10" y="32" className="text-[6px] font-bold fill-sky-700">A</text>
            <text x="33" y="13" className="text-[6px] font-bold fill-amber-700">O</text>
            <text x="56" y="15" className="text-[6px] font-bold fill-teal-700">C=?</text>
          </svg>
        )
      },
      {
        id: 'p24',
        prompt: 'Szakasz A(2; 6) és B(8; -2) felezőpontja',
        value: 'F(5; 2) (számtani közepek: (2+8)/2 = 5, (6-2)/2 = 2)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="15" y1="10" x2="55" y2="25" stroke="#6366f1" strokeWidth="1.8" />
            <circle cx="15" cy="10" r="2.5" fill="#6366f1" />
            <circle cx="35" cy="17.5" r="3" fill="#f59e0b" />
            <circle cx="55" cy="25" r="2.5" fill="#6366f1" />
            <text x="32" y="13" className="text-[6px] font-bold fill-amber-700">F=?</text>
          </svg>
        )
      }
    ]
  }
};

export const ReflectionAppMatcher: React.FC<ReflectionAppMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g7-geom-reflection-app',
  topicTitle = '6. A középpontos tükrözés alkalmazása'
}) => {
  return (
    <MatcherTemplate
      level={level}
      grade={7}
      chapterId="g7-geom-trans"
      topicId={topicId}
      topicTitle={topicTitle}
      title="Középpontos Tükrözés Alkalmazásai Párosító"
      subtitle="Kattints egy fogalomra vagy állításra, majd válaszd ki a hozzá tartozó párját!"
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
};

export default ReflectionAppMatcher;
