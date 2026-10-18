import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface GroupingMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const GroupingMatcher: React.FC<GroupingMatcherProps> = ({
  onBack,
  onSwitchToTheory,
  level,
  onNextLevel,
  onOpenRules
}) => {
  const safeLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
  const [currentLevel, setCurrentLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
    setCurrentLevel(nextLevel);
  }, [level]);

  const levels: Record<DifficultyLevel, MatcherLevelConfig> = {
    // ========================================================
    // 1. SZINT: ALAKZATOK ÉS ALAPVETŐ TULAJDONSÁGOK
    // ========================================================
    1: {
      title: '1. Szint: Alakzatok és tulajdonságaik',
      subtitle: 'Párosítsd a geometriai alakzatot a legfőbb geometriai jellemzőjével!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'Négyzet',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <rect x="5" y="5" width="30" height="30" rx="2" className="fill-emerald-100 stroke-emerald-600" strokeWidth="2.5" />
            </svg>
          ),
          value: '4 egyenlő oldal, 4 derékszög (síkidom)'
        },
        {
          id: 'p1-2',
          prompt: 'Egyenlő oldalú háromszög',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <polygon points="20,5 36,35 4,35" className="fill-blue-100 stroke-blue-600" strokeWidth="2.5" strokeLinejoin="round" />
            </svg>
          ),
          value: '3 egyenlő oldal, 3 csúcs (sokszög)'
        },
        {
          id: 'p1-3',
          prompt: 'Kör',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="15" className="fill-rose-100 stroke-rose-600" strokeWidth="2.5" />
            </svg>
          ),
          value: 'Zárt görbe vonal határolja, nincs csúcsa'
        },
        {
          id: 'p1-4',
          prompt: 'Téglalap',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <rect x="3" y="10" width="34" height="20" rx="2" className="fill-emerald-100 stroke-emerald-600" strokeWidth="2.5" />
            </svg>
          ),
          value: 'Szemközti oldalai egyenlők, 4 derékszöge van'
        },
        {
          id: 'p1-5',
          prompt: 'Kocka',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <path d="M8 14 L20 6 L32 14 L20 22 Z" className="fill-blue-200 stroke-blue-600" strokeWidth="1.5" />
              <path d="M8 14 L20 22 L20 34 L8 26 Z" className="fill-blue-400 stroke-blue-700" strokeWidth="1.5" />
              <path d="M20 22 L32 14 L32 26 L20 34 Z" className="fill-blue-300 stroke-blue-600" strokeWidth="1.5" />
            </svg>
          ),
          value: '6 egybevágó négyzetlap határolja (test)'
        },
        {
          id: 'p1-6',
          prompt: 'Henger',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <path d="M10 12 L10 28 C10 33 30 33 30 28 L30 12 Z" className="fill-amber-100 stroke-amber-600" strokeWidth="1.5" />
              <ellipse cx="20" cy="28" rx="10" ry="4" className="fill-amber-200 stroke-amber-600" strokeWidth="1.5" />
              <ellipse cx="20" cy="12" rx="10" ry="4" className="fill-amber-200 stroke-amber-600" strokeWidth="1.5" />
            </svg>
          ),
          value: '2 körlap és egy palást határolja (forgástest)'
        },
        {
          id: 'p1-7',
          prompt: 'Gömb',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="14" className="fill-rose-100 stroke-rose-600" strokeWidth="1.5" />
              <ellipse cx="20" cy="20" rx="14" ry="4" className="stroke-rose-400" strokeWidth="1" strokeDasharray="2 2" />
              <path d="M6 20 C6 25 34 25 34 20" className="stroke-rose-500" strokeWidth="1" />
            </svg>
          ),
          value: 'Minden pontja egyenlő távol van a középpontjától'
        },
        {
          id: 'p1-8',
          prompt: 'Szabályos ötszög',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <polygon points="20,5 35,16 29,34 11,34 5,16" className="fill-purple-100 stroke-purple-600" strokeWidth="2.5" strokeLinejoin="round" />
            </svg>
          ),
          value: '5 egyenlő oldala és 5 csúcsa van'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: CSOPORTOK ÉS PÉLDÁNYOK MEGFELELTETÉSE
    // ========================================================
    2: {
      title: '2. Szint: Csoportok és kategóriák',
      subtitle: 'Párosítsd a kategória leírását a hozzá tartozó ábrával!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'Derékszögű háromszög',
          value: 'Van pontosan egy 90°-os szöge',
          valueFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <polygon points="8,8 8,32 32,32" className="fill-blue-100 stroke-blue-600" strokeWidth="2.5" />
              <rect x="8" y="26" width="6" height="6" className="stroke-blue-600 fill-blue-300" strokeWidth="1" />
            </svg>
          )
        },
        {
          id: 'p2-2',
          prompt: 'Görbe vonalú síkidom',
          value: 'Ellipszis (nincs egyenes szakasz)',
          valueFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <ellipse cx="20" cy="20" rx="16" ry="10" className="fill-rose-100 stroke-rose-600" strokeWidth="2.5" />
            </svg>
          )
        },
        {
          id: 'p2-3',
          prompt: 'Soklapú test (Gúla / piramis)',
          value: '1 sokszög alaplap és háromszögoldallapok',
          valueFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <polygon points="20,6 6,32 34,32" className="fill-amber-100 stroke-amber-600" strokeWidth="1.5" />
              <line x1="20" y1="6" x2="22" y2="32" className="stroke-amber-700" strokeWidth="1.5" />
            </svg>
          )
        },
        {
          id: 'p2-4',
          prompt: 'Hatszög (sokszög)',
          value: '6 oldala és 6 csúcsa van',
          valueFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <polygon points="20,6 33,13 33,27 20,34 7,27 7,13" className="fill-teal-100 stroke-teal-600" strokeWidth="2.5" strokeLinejoin="round" />
            </svg>
          )
        },
        {
          id: 'p2-5',
          prompt: 'Trapéz',
          value: 'Négyszög, melynek van párhuzamos oldalpárja',
          valueFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <polygon points="12,12 28,12 36,30 4,30" className="fill-purple-100 stroke-purple-600" strokeWidth="2.5" />
            </svg>
          )
        },
        {
          id: 'p2-6',
          prompt: 'Rombusz',
          value: '4 egyenlő oldala van, de nem feltétlen derékszögű',
          valueFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <polygon points="20,6 34,20 20,34 6,20" className="fill-emerald-100 stroke-emerald-600" strokeWidth="2.5" />
            </svg>
          )
        },
        {
          id: 'p2-7',
          prompt: 'Forgástest (Kúp)',
          value: '1 kör alakú alaplapja és 1 csúcsa van',
          valueFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <path d="M20 6 L6 30 C6 35 34 35 34 30 Z" className="fill-pink-100 stroke-pink-600" strokeWidth="1.5" />
              <ellipse cx="20" cy="30" rx="14" ry="4" className="fill-pink-200 stroke-pink-600" strokeWidth="1.5" />
            </svg>
          )
        },
        {
          id: 'p2-8',
          prompt: 'Téglatest',
          value: '6 téglalap határolja, 12 éle és 8 csúcsa van',
          valueFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <path d="M6 14 L26 8 L36 14 L16 20 Z" className="fill-indigo-100 stroke-indigo-600" strokeWidth="1.5" />
              <path d="M6 14 L16 20 L16 32 L6 26 Z" className="fill-indigo-300 stroke-indigo-700" strokeWidth="1.5" />
              <path d="M16 20 L36 14 L36 26 L16 32 Z" className="fill-indigo-200 stroke-indigo-600" strokeWidth="1.5" />
            </svg>
          )
        }
      ]
    },

    // ========================================================
    // 3. SZINT: KAKUKKTOJÁS ÉS KIZÁRÁSI INDOKLÁS
    // ========================================================
    3: {
      title: '3. Szint: Kakukktojás és a kizárási indoklás',
      subtitle: 'Párosítsd a 4 alakzatból álló csoportot a helyes kizárási indoklással!',
      pairs: [
        {
          id: 'p3-1',
          prompt: '[Kör, Négyzet, Téglalap, Háromszög]',
          value: 'A kör a kakukktojás, mert görbe vonal határolja, a többi sokszög'
        },
        {
          id: 'p3-2',
          prompt: '[Kocka, Téglatest, Piramis, Kör]',
          value: 'A kör a kakukktojás, mert 2D síkidom, a többi 3D test'
        },
        {
          id: 'p3-3',
          prompt: '[Háromszög, Ötszög, Hatszög, Téglalap]',
          value: 'A téglalap a kakukktojás, mert 4 oldala van, a többinek nem 4'
        },
        {
          id: 'p3-4',
          prompt: '[Kúp, Henger, Gömb, Kocka]',
          value: 'A kocka a kakukktojás, mert csak síklapok határolják (poliéder), a többi forgástest'
        },
        {
          id: 'p3-5',
          prompt: '[Négyzet, Rombusz, Szabályos 3-szög, Ált. téglalap]',
          value: 'A téglalap, mert az oldalai nem mind egyenlő hosszúak'
        },
        {
          id: 'p3-6',
          prompt: '[Pont, Szakasz, Félegyenes, Kocka]',
          value: 'A kocka, mert térbeli test, a többi alapelem/egyenes rész'
        },
        {
          id: 'p3-7',
          prompt: '[Kocka, Henger, Félgömb, Körlap]',
          value: 'A körlap, mert síkidom (2D), a másik három térkitöltő test (3D)'
        },
        {
          id: 'p3-8',
          prompt: '[Háromszög, Négyszög, Kör, Ötszög]',
          value: 'A kör, mert nincsenek csúcsai és oldalai'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      topicId="g5-geom-grouping-matcher"
      title="Csoportosítások Párosító Játék"
      subtitle="Találd meg az összetartozó alakzatokat, tulajdonságokat és indoklásokat!"
      badge="🧩 5. Osztály • III. Geometria"
      themeColor="blue"
      level={currentLevel}
      levels={levels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default GroupingMatcher;
