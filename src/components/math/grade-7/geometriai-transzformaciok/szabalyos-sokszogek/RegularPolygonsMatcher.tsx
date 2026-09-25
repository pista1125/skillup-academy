import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface RegularPolygonsMatcherProps {
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
    title: '1. Szint: Alapvető Sokszögek, Belső Szögek és Nevek',
    subtitle: 'Párosítsd a szabályos sokszögeket a rájuk jellemző szögekkel, tulajdonságokkal és képletekkel!',
    pairs: [
      {
        id: 'p1_1',
        prompt: 'Szabályos 3-szög (egyenlő oldalú)',
        value: 'Belső szöge 60°, 0 átló, 3 szimmetriatengely',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,6 18,30 52,30" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'p1_2',
        prompt: 'Szabályos 4-szög (négyzet)',
        value: 'Belső szöge 90°, 2 átló, 4 szimmetriatengely, centrum',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <rect x="23" y="6" width="24" height="24" rx="2" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'p1_3',
        prompt: 'Szabályos 5-szög (pentagon)',
        value: 'Belső szöge 108°, 5 átló, 5 szimmetriatengely',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,6 54,19 46,30 24,30 16,19" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'p1_4',
        prompt: 'Szabályos 6-szög (hexagon)',
        value: 'Belső szöge 120°, 9 átló, 6 szimmetriatengely, centrum',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="25,7 45,7 55,17.5 45,28 25,28 15,17.5" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'p1_5',
        prompt: 'Szabályos 8-szög (oktagon)',
        value: 'Belső szöge 135°, 20 átló, 8 szimmetriatengely',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="27,6 43,6 54,17 54,23 43,31 27,31 16,23 16,17" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'p1_6',
        prompt: 'Belső szögek összege képlet',
        value: 'Sn = (n - 2) · 180°',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <text x="35" y="22" textAnchor="middle" className="text-xs font-mono font-bold fill-orange-700">∑ belső</text>
          </svg>
        )
      },
      {
        id: 'p1_7',
        prompt: 'Egy belső szög képlete',
        value: 'α = (n - 2) · 180° / n',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <text x="35" y="22" textAnchor="middle" className="text-sm font-mono font-black fill-orange-700">α</text>
          </svg>
        )
      },
      {
        id: 'p1_8',
        prompt: 'Összes átló száma képlet',
        value: 'An = n · (n - 3) / 2',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <rect x="23" y="6" width="24" height="24" fill="none" stroke="#ea580c" strokeWidth="1" />
            <line x1="23" y1="6" x2="47" y2="30" stroke="#f97316" strokeWidth="1.5" strokeDasharray="2 2" />
            <line x1="47" y1="6" x2="23" y2="30" stroke="#f97316" strokeWidth="1.5" strokeDasharray="2 2" />
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Külső Szögek, Sugarak és Speciális Szimmetriák',
    subtitle: 'Kapcsold össze a szabályos sokszögek fejlettebb geometriai összefüggéseit a helyes leírásukkal!',
    pairs: [
      {
        id: 'p2_1',
        prompt: 'Külső szög és középponti szög',
        value: 'α\' = ω = 360° / n (mindig megegyeznek)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17.5" r="12" fill="none" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="35" y1="17.5" x2="35" y2="5.5" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="35" y1="17.5" x2="46" y2="23.5" stroke="#0284c7" strokeWidth="1.5" />
            <text x="40" y="16" className="text-[9px] font-bold fill-sky-600">ω</text>
          </svg>
        )
      },
      {
        id: 'p2_2',
        prompt: 'Szabályos hatszög és köré írt köre',
        value: 'R = a (6 db egyenlő oldalú háromszögre bomlik)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17.5" r="13" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" />
            <polygon points="26,7 44,7 53,17.5 44,28 26,28 17,17.5" fill="none" stroke="#ea580c" strokeWidth="1.5" />
            <line x1="35" y1="17.5" x2="53" y2="17.5" stroke="#3b82f6" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'p2_3',
        prompt: 'Páros vs. Páratlan csúcsszám szimmetriája',
        value: 'Páros n ⟹ van centrum; Páratlan n ⟹ soha nincs!',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <text x="22" y="22" className="text-xs font-mono font-bold fill-emerald-600">2k</text>
            <text x="38" y="22" className="text-xs font-bold fill-slate-400">vs</text>
            <text x="48" y="22" className="text-xs font-mono font-bold fill-rose-600">2k+1</text>
          </svg>
        )
      },
      {
        id: 'p2_4',
        prompt: 'Szabályos tízszög (dekagon)',
        value: 'Belső szöge 144°, külső szöge 36°, 35 átlója van',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17.5" r="13" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.5" />
            <text x="35" y="21" textAnchor="middle" className="text-[10px] font-bold fill-orange-800">10</text>
          </svg>
        )
      },
      {
        id: 'p2_5',
        prompt: 'Szabályos tizenkétszög (dodekagon)',
        value: 'Belső szöge 150°, külső szöge 30°, 54 átlója van',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="17.5" r="13" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.5" />
            <text x="35" y="21" textAnchor="middle" className="text-[10px] font-bold fill-orange-800">12</text>
          </svg>
        )
      },
      {
        id: 'p2_6',
        prompt: 'Sík hézagmentes parkettázása',
        value: 'Csak 3-szöggel (60°), négyzettel (90°) és 6-szöggel (120°)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <rect x="18" y="8" width="10" height="10" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
            <rect x="28" y="8" width="10" height="10" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
            <rect x="18" y="18" width="10" height="10" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
            <rect x="28" y="18" width="10" height="10" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 'p2_7',
        prompt: '1 csúcsból húzható átlók száma',
        value: 'n - 3 darab (önmagába és 2 szomszédba nem húzható)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="35" cy="8" r="3" fill="#ea580c" />
            <line x1="35" y1="8" x2="20" y2="28" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="2 2" />
            <line x1="35" y1="8" x2="50" y2="28" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="2 2" />
          </svg>
        )
      },
      {
        id: 'p2_8',
        prompt: 'Belső szög és külső szög kapcsolata',
        value: 'α + α\' = 180° (mindig egymás kiegészítő mellékszögei)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="10" y1="24" x2="60" y2="24" stroke="#64748b" strokeWidth="1.5" />
            <line x1="35" y1="24" x2="48" y2="10" stroke="#ea580c" strokeWidth="2" />
            <text x="26" y="20" className="text-[9px] font-bold fill-orange-700">α</text>
            <text x="44" y="20" className="text-[9px] font-bold fill-sky-700">α'</text>
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Mester Számítások és Geometriai Tételek',
    subtitle: 'Oldd meg a haladó matematikai feladványokat és párosítsd a helyes eredménnyel!',
    pairs: [
      {
        id: 'p3_1',
        prompt: 'Sokszög, melynek belső szögösszege 1260°',
        value: 'Kilencszög (n = 9): (9 - 2) · 180° = 1260°',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <text x="35" y="22" textAnchor="middle" className="text-xs font-mono font-bold fill-orange-800">1260°</text>
          </svg>
        )
      },
      {
        id: 'p3_2',
        prompt: 'Sokszög, melynek külső szöge 24°',
        value: 'Tizenötszög (n = 15): 360° / 24° = 15 oldal',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <text x="35" y="22" textAnchor="middle" className="text-xs font-mono font-bold fill-sky-700">α\' = 24°</text>
          </svg>
        )
      },
      {
        id: 'p3_3',
        prompt: 'Sokszög, melynek pontosan 20 átlója van',
        value: 'Szabályos nyolcszög (n = 8): 8 · 5 / 2 = 20',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <text x="35" y="22" textAnchor="middle" className="text-xs font-mono font-bold fill-indigo-700">20 átló</text>
          </svg>
        )
      },
      {
        id: 'p3_4',
        prompt: 'Sokszög, melynek egy csúcsából 7 átló indul',
        value: 'Tízszög (n = 10): n - 3 = 7 ⟹ n = 10',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <text x="35" y="22" textAnchor="middle" className="text-xs font-mono font-bold fill-indigo-700">n - 3 = 7</text>
          </svg>
        )
      },
      {
        id: 'p3_5',
        prompt: 'Rombusz és téglalap szabályossága',
        value: 'Nem szabályosak! Egyedül a négyzet egyszerre egyenlő oldalú és szögű.',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <text x="35" y="22" textAnchor="middle" className="text-xs font-bold fill-rose-600">❌ Nem szabályos</text>
          </svg>
        )
      },
      {
        id: 'p3_6',
        prompt: 'Szabályos ötszög átlói által bezárt alakzat',
        value: 'Ötágú csillag (pentagramma)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="35,6 42,26 21,14 49,14 28,26" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'p3_7',
        prompt: 'Bármely konvex sokszög külső szögeinek összege',
        value: 'MINDIG pontosan 360° (függetlenül az oldalszámtól!)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <text x="35" y="22" textAnchor="middle" className="text-xs font-mono font-black fill-emerald-700">∑ α\' = 360°</text>
          </svg>
        )
      },
      {
        id: 'p3_8',
        prompt: 'Szabályos sokszög szimmetriatengelyeinek száma',
        value: 'Mindig pontosan n darab (oldalszámmal egyenlő)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <text x="35" y="22" textAnchor="middle" className="text-xs font-mono font-black fill-purple-700">Tengely = n</text>
          </svg>
        )
      }
    ]
  }
};

export const RegularPolygonsMatcher: React.FC<RegularPolygonsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g7-geom-regular-polygons-matcher',
  topicTitle = '11. Szabályos sokszögek'
}) => {
  const effectiveLevel = currentLevel || level;

  return (
    <MatcherTemplate
      level={effectiveLevel}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="orange"
    />
  );
};
