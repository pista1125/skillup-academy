import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CircleMatcherProps {
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
    title: '1. Szint: A Kör Részei és Vonalas Elemei',
    subtitle: 'Párosítsd a kör részeinek és elemeinek nevét a pontos geometriai definíciójukkal!',
    pairs: [
      {
        id: 'p1_1',
        prompt: 'Sugár (r)',
        value: 'A középpontot a körvonal bármely pontjával összekötő szakasz',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17" r="13" fill="none" stroke="#e11d48" strokeWidth="1.5" />
            <circle cx="35" cy="17" r="2" fill="#e11d48" />
            <line x1="35" y1="17" x2="48" y2="17" stroke="#e11d48" strokeWidth="2" />
          </svg>
        )
      },
      {
        id: 'p1_2',
        prompt: 'Átmérő (d = 2r)',
        value: 'A középponton átmenő leghosszabb húr (hossza 2 · r)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17" r="13" fill="none" stroke="#e11d48" strokeWidth="1.5" />
            <line x1="22" y1="17" x2="48" y2="17" stroke="#4f46e5" strokeWidth="2" />
            <circle cx="35" cy="17" r="1.5" fill="#e11d48" />
          </svg>
        )
      },
      {
        id: 'p1_3',
        prompt: 'Húr',
        value: 'A körvonal tetszőleges két pontját összekötő belső szakasz',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17" r="13" fill="none" stroke="#e11d48" strokeWidth="1.5" />
            <line x1="26" y1="10" x2="44" y2="24" stroke="#f59e0b" strokeWidth="2" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 'p1_4',
        prompt: 'Körív (⌢AB)',
        value: 'A körvonal két pontja közé eső darabja',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17" r="13" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
            <path d="M 44.2 7.8 A 13 13 0 0 1 48 17" fill="none" stroke="#10b981" strokeWidth="3" />
          </svg>
        )
      },
      {
        id: 'p1_5',
        prompt: 'Körcikk (szektor)',
        value: 'Két sugár és a hozzájuk tartozó körív által határolt pizzaszelet-alakú síkrész',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17" r="13" fill="none" stroke="#e2e8f0" strokeWidth="1.2" />
            <path d="M 35 17 L 48 17 A 13 13 0 0 0 44 8 Z" fill="#10b981" fillOpacity="0.4" stroke="#059669" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'p1_6',
        prompt: 'Körszelet (szegmens)',
        value: 'Egy húr és a hozzá tartozó körív által határolt levágott síkrész',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17" r="13" fill="none" stroke="#e2e8f0" strokeWidth="1.2" />
            <path d="M 26 10 A 13 13 0 0 1 44 24 Z" fill="#0d9488" fillOpacity="0.4" stroke="#0f766e" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'p1_7',
        prompt: 'Körgyűrű',
        value: 'Két közös középpontú (koncentrikus), de eltérő sugarú kör közötti síkrész',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17" r="14" fill="#f3e8ff" stroke="#a855f7" strokeWidth="1.5" />
            <circle cx="35" cy="17" r="7" fill="#ffffff" stroke="#a855f7" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'p1_8',
        prompt: 'Körlap vs. Körvonal',
        value: 'A körvonal |OP| = r (vonal), a körlap |OP| ≤ r (teljes belső terület)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17" r="12" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1.5" />
            <text x="35" y="21" textAnchor="middle" className="text-[9px] font-bold fill-rose-700">lap</text>
          </svg>
        )
      }
    ]
  },

  2: {
    title: '2. Szint: Egyenes és Kör Kölcsönös Helyzete',
    subtitle: 'Párosítsd a kör és egyenes helyzeteit, tételeit és metszéspontjainak számát!',
    pairs: [
      {
        id: 'p2_1',
        prompt: 'Szelő egyenes (s)',
        value: 'd < r, két pontban metszi a kört',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17" r="12" fill="none" stroke="#e11d48" strokeWidth="1.5" />
            <line x1="12" y1="12" x2="58" y2="12" stroke="#0284c7" strokeWidth="1.8" />
            <circle cx="25" cy="12" r="2" fill="#0284c7" />
            <circle cx="45" cy="12" r="2" fill="#0284c7" />
          </svg>
        )
      },
      {
        id: 'p2_2',
        prompt: 'Érintő egyenes (e)',
        value: 'd = r, pontosan egyetlen közös pontja van a körrel',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17" r="12" fill="none" stroke="#e11d48" strokeWidth="1.5" />
            <line x1="15" y1="29" x2="55" y2="29" stroke="#d97706" strokeWidth="2" />
            <circle cx="35" cy="29" r="2" fill="#d97706" />
          </svg>
        )
      },
      {
        id: 'p2_3',
        prompt: 'Elkerülő egyenes',
        value: 'd > r, nincs közös pontja a körrel',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="15" r="10" fill="none" stroke="#e11d48" strokeWidth="1.5" />
            <line x1="15" y1="30" x2="55" y2="30" stroke="#64748b" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'p2_4',
        prompt: 'Érintési pont (E)',
        value: 'Az érintő egyenes és a körvonal egyetlen közös pontja',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="16" r="12" fill="none" stroke="#e11d48" strokeWidth="1.2" />
            <line x1="20" y1="28" x2="50" y2="28" stroke="#d97706" strokeWidth="1.5" />
            <circle cx="35" cy="28" r="2.5" fill="#d97706" />
            <text x="35" y="24" textAnchor="middle" className="text-[8px] font-bold fill-amber-700">E</text>
          </svg>
        )
      },
      {
        id: 'p2_5',
        prompt: 'Érintő alaptétele (e ⊥ r)',
        value: 'Az érintő merőleges az érintési pontba mutató sugárra',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="15" r="12" fill="none" stroke="#e11d48" strokeWidth="1.2" />
            <line x1="35" y1="15" x2="35" y2="27" stroke="#e11d48" strokeWidth="1.5" />
            <line x1="18" y1="27" x2="52" y2="27" stroke="#d97706" strokeWidth="2" />
            <rect x="30" y="22" width="5" height="5" fill="none" stroke="#8b5cf6" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 'p2_6',
        prompt: 'Szelő által kimetszett húr',
        value: 'A szelő egyenes körön belüli darabja (AB szakasz)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17" r="12" fill="none" stroke="#cbd5e1" strokeWidth="1.2" />
            <line x1="15" y1="17" x2="55" y2="17" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="23" y1="17" x2="47" y2="17" stroke="#0284c7" strokeWidth="2.5" />
          </svg>
        )
      },
      {
        id: 'p2_7',
        prompt: 'Középpont távolsága d(O, e)',
        value: 'Az O középpontból az egyenesre bocsátott merőleges szakasz hossza',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="12" r="3" fill="#e11d48" />
            <line x1="35" y1="12" x2="35" y2="26" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="2 1" />
            <line x1="15" y1="26" x2="55" y2="26" stroke="#475569" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'p2_8',
        prompt: 'Középponton átmenő szelő (d = 0)',
        value: 'A kör átmérőegyenese, a leghosszabb húrt metszi ki',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17" r="12" fill="none" stroke="#e11d48" strokeWidth="1.5" />
            <line x1="12" y1="17" x2="58" y2="17" stroke="#4f46e5" strokeWidth="2" />
            <circle cx="35" cy="17" r="2" fill="#e11d48" />
          </svg>
        )
      }
    ]
  },

  3: {
    title: '3. Szint: Két Kör Kölcsönös Helyzete és Speciális Tételek',
    subtitle: 'Párosítsd a két kör közötti távolsági feltételeket és geometriai összefüggéseket!',
    pairs: [
      {
        id: 'p3_1',
        prompt: 'Kívülről érintkező körök',
        value: 'd = r₁ + r₂, pontosan 1 közös pont a két kör között kívül',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="25" cy="17" r="10" fill="none" stroke="#e11d48" strokeWidth="1.5" />
            <circle cx="43" cy="17" r="8" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
            <circle cx="35" cy="17" r="2" fill="#d97706" />
          </svg>
        )
      },
      {
        id: 'p3_2',
        prompt: 'Belülről érintkező körök',
        value: 'd = r₁ - r₂, pontosan 1 közös pont a nagyobb körön belül',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17" r="14" fill="none" stroke="#e11d48" strokeWidth="1.5" />
            <circle cx="41" cy="17" r="8" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
            <circle cx="49" cy="17" r="2" fill="#d97706" />
          </svg>
        )
      },
      {
        id: 'p3_3',
        prompt: 'Metsző körök',
        value: 'r₁ - r₂ < d < r₁ + r₂, pontosan 2 közös metszéspont',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="28" cy="17" r="11" fill="none" stroke="#e11d48" strokeWidth="1.5" />
            <circle cx="42" cy="17" r="11" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
            <circle cx="35" cy="9" r="2" fill="#10b981" />
            <circle cx="35" cy="25" r="2" fill="#10b981" />
          </svg>
        )
      },
      {
        id: 'p3_4',
        prompt: 'Koncentrikus körök',
        value: 'd = 0, közös a középpontjuk (0 közös pont, ha r₁ ≠ r₂)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17" r="14" fill="none" stroke="#e11d48" strokeWidth="1.5" />
            <circle cx="35" cy="17" r="7" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
            <circle cx="35" cy="17" r="2" fill="#e11d48" />
          </svg>
        )
      },
      {
        id: 'p3_5',
        prompt: 'Egymáson kívül lévő körök',
        value: 'd > r₁ + r₂, nincsenek közös pontok (0 pont)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="20" cy="17" r="9" fill="none" stroke="#e11d48" strokeWidth="1.5" />
            <circle cx="50" cy="17" r="8" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'p3_6',
        prompt: 'Thalész-tétel',
        value: 'A kör átmérőjének két végpontjával a körvonal bármely pontja 90°-os szöget zár be',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <path d="M 15 25 A 20 20 0 0 1 55 25 Z" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1.2" />
            <line x1="15" y1="25" x2="45" y2="10" stroke="#2563eb" strokeWidth="1.5" />
            <line x1="55" y1="25" x2="45" y2="10" stroke="#2563eb" strokeWidth="1.5" />
            <circle cx="45" cy="10" r="2" fill="#2563eb" />
          </svg>
        )
      },
      {
        id: 'p3_7',
        prompt: 'A kör szimmetriái',
        value: 'Végtelen sok szimmetriatengelye van és középpontosan szimmetrikus O-ra',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17" r="12" fill="none" stroke="#e11d48" strokeWidth="1.5" />
            <line x1="35" y1="3" x2="35" y2="31" stroke="#a855f7" strokeWidth="1" strokeDasharray="2 1" />
            <line x1="21" y1="17" x2="49" y2="17" stroke="#a855f7" strokeWidth="1" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 'p3_8',
        prompt: 'Közös érintők száma (kívülálló körök)',
        value: 'Két egymáson kívül lévő körnek összesen 4 közös érintője van (2 külső, 2 belső)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="22" cy="17" r="8" fill="none" stroke="#e11d48" strokeWidth="1.2" />
            <circle cx="48" cy="17" r="8" fill="none" stroke="#4f46e5" strokeWidth="1.2" />
            <line x1="10" y1="7" x2="60" y2="7" stroke="#d97706" strokeWidth="1" />
            <line x1="10" y1="27" x2="60" y2="27" stroke="#d97706" strokeWidth="1" />
          </svg>
        )
      }
    ]
  }
};

export const CircleMatcher: React.FC<CircleMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g7-geom-circle',
  topicTitle = '12. A Kör'
}) => {
  return (
    <MatcherTemplate
      topicId={topicId}
      topicTitle={topicTitle}
      level={currentLevel || level}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
};

export default CircleMatcher;
