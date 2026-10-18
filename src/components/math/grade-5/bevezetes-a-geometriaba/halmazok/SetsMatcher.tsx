import React, { useState, useEffect } from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface SetsMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export const SetsMatcher: React.FC<SetsMatcherProps> = ({
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
    // 1. SZINT: HALMAZJELÖLÉSEK ÉS ALAPFOGALMAK
    // ========================================================
    1: {
      title: '1. Szint: Halmazjelölések és alapfogalmak',
      subtitle: 'Párosítsd a halmazelméleti jeleket és szakkifejezéseket a jelentésükkel!',
      pairs: [
        {
          id: 'p1-1',
          prompt: 'a ∈ A',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 60 40" fill="none">
              <ellipse cx="36" cy="20" rx="20" ry="16" className="fill-purple-50 stroke-purple-500" strokeWidth="2" />
              <circle cx="34" cy="20" r="3" className="fill-purple-700" />
              <text x="34" y="14" textAnchor="middle" className="text-[10px] font-bold fill-purple-900">a</text>
              <text x="48" y="14" className="text-[10px] font-black fill-purple-600">A</text>
            </svg>
          ),
          value: 'Az „a” elem beletartozik az A halmazba (eleme)'
        },
        {
          id: 'p1-2',
          prompt: 'b ∉ A',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 60 40" fill="none">
              <ellipse cx="38" cy="20" rx="18" ry="16" className="fill-slate-50 stroke-slate-400" strokeWidth="1.5" />
              <circle cx="10" cy="20" r="3" className="fill-rose-600" />
              <text x="10" y="14" textAnchor="middle" className="text-[10px] font-bold fill-rose-700">b</text>
              <text x="48" y="14" className="text-[10px] font-black fill-slate-500">A</text>
            </svg>
          ),
          value: 'A „b” elem nem tartozik bele az A halmazba (nem eleme)'
        },
        {
          id: 'p1-3',
          prompt: '∅ (vagy { })',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="12" className="stroke-rose-500" strokeWidth="2.5" />
              <line x1="10" y1="30" x2="30" y2="10" className="stroke-rose-500" strokeWidth="2.5" />
            </svg>
          ),
          value: 'Üres halmaz: egyetlen eleme sincs'
        },
        {
          id: 'p1-4',
          prompt: 'A ∩ B (metszet)',
          promptFigure: (
            <svg className="w-14 h-10 mx-auto" viewBox="0 0 70 40" fill="none">
              <circle cx="26" cy="20" r="16" className="stroke-blue-500" strokeWidth="1.5" />
              <circle cx="44" cy="20" r="16" className="stroke-emerald-500" strokeWidth="1.5" />
              <path d="M 35 7.8 A 16 16 0 0 1 35 32.2 A 16 16 0 0 1 35 7.8 Z" className="fill-purple-300/80 stroke-purple-600" strokeWidth="1.5" />
            </svg>
          ),
          value: 'Közös rész: mindkét halmazba beletartozó elemek'
        },
        {
          id: 'p1-5',
          prompt: 'A ∪ B (unió)',
          promptFigure: (
            <svg className="w-14 h-10 mx-auto" viewBox="0 0 70 40" fill="none">
              <circle cx="26" cy="20" r="16" className="fill-amber-200/80 stroke-amber-500" strokeWidth="1.5" />
              <circle cx="44" cy="20" r="16" className="fill-amber-200/80 stroke-amber-500" strokeWidth="1.5" />
            </svg>
          ),
          value: 'Egyesítés: legalább az egyik halmazba tartozó elemek'
        },
        {
          id: 'p1-6',
          prompt: 'B ⊆ A (részhalmaz)',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 60 40" fill="none">
              <ellipse cx="30" cy="20" rx="26" ry="17" className="fill-blue-50 stroke-blue-500" strokeWidth="2" />
              <ellipse cx="34" cy="20" rx="14" ry="10" className="fill-indigo-200/80 stroke-indigo-600" strokeWidth="2" />
              <text x="34" y="22" textAnchor="middle" className="text-[9px] font-bold fill-indigo-900">B</text>
              <text x="14" y="16" className="text-[10px] font-black fill-blue-700">A</text>
            </svg>
          ),
          value: 'B minden eleme egyben az A halmaznak is eleme'
        },
        {
          id: 'p1-7',
          prompt: 'Venn-diagram',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 60 40" fill="none">
              <rect x="2" y="2" width="56" height="36" rx="6" className="stroke-slate-400 fill-slate-50" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx="25" cy="20" r="12" className="fill-teal-100/70 stroke-teal-500" strokeWidth="1.5" />
              <circle cx="37" cy="20" r="12" className="fill-pink-100/70 stroke-pink-500" strokeWidth="1.5" />
            </svg>
          ),
          value: 'Zárt görbékkel ábrázolt szemléletes halmazrajz'
        },
        {
          id: 'p1-8',
          prompt: 'Alaphalmaz (U)',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 60 40" fill="none">
              <rect x="4" y="4" width="52" height="32" rx="4" className="fill-amber-50 stroke-amber-500" strokeWidth="2" />
              <text x="10" y="15" className="text-[10px] font-black fill-amber-700">U</text>
              <circle cx="34" cy="20" r="9" className="fill-white stroke-slate-400" strokeWidth="1" />
            </svg>
          ),
          value: 'Az a legbővebb halmaz, amelyből az elemeket választjuk'
        }
      ]
    },

    // ========================================================
    // 2. SZINT: GEOMETRIAI ALAKZATOK ÉS HALMAZOK
    // ========================================================
    2: {
      title: '2. Szint: Geometriai alakzatok és halmazok',
      subtitle: 'Találd meg az alakzatcsoportok és halmazkapcsolatok helyes párját!',
      pairs: [
        {
          id: 'p2-1',
          prompt: 'Négyzetek halmaza',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <rect x="6" y="6" width="28" height="28" rx="2" className="fill-emerald-100 stroke-emerald-600" strokeWidth="2.5" />
            </svg>
          ),
          value: 'Részhalmaza a téglalapok halmazának'
        },
        {
          id: 'p2-2',
          prompt: 'Háromszögek ∩ Négyszögek',
          promptFigure: (
            <svg className="w-14 h-10 mx-auto" viewBox="0 0 70 40" fill="none">
              <polygon points="18,10 30,32 6,32" className="fill-blue-100 stroke-blue-500" strokeWidth="1.5" />
              <rect x="42" y="12" width="22" height="20" className="fill-emerald-100 stroke-emerald-500" strokeWidth="1.5" />
              <line x1="33" y1="8" x2="37" y2="34" className="stroke-slate-300" strokeWidth="1.5" strokeDasharray="2 2" />
            </svg>
          ),
          value: 'Üres halmaz (diszjunktak, nincs közös alakzat)'
        },
        {
          id: 'p2-3',
          prompt: 'Kék alakzatok ∩ Síkidomok',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <polygon points="20,6 34,34 6,34" className="fill-blue-500 stroke-blue-700" strokeWidth="2" />
            </svg>
          ),
          value: 'Azok a lapos alakzatok, amelyek színe kék'
        },
        {
          id: 'p2-4',
          prompt: 'Téglalapok ∩ Rombuszok',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <rect x="8" y="8" width="24" height="24" className="fill-amber-100 stroke-amber-600" strokeWidth="2" />
              <path d="M 8 13 L 13 13 L 13 8" className="stroke-amber-700" strokeWidth="1.5" />
            </svg>
          ),
          value: 'A négyzetek halmaza (4 egyenlő oldal ÉS 4 derékszög)'
        },
        {
          id: 'p2-5',
          prompt: 'Sokszögek halmaza',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <polygon points="20,5 34,15 30,34 10,34 6,15" className="fill-purple-100 stroke-purple-600" strokeWidth="2" />
            </svg>
          ),
          value: 'Kizárólag egyenes szakaszokkal határolt síkidomok'
        },
        {
          id: 'p2-6',
          prompt: 'Körök halmaza',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="14" className="fill-rose-100 stroke-rose-600" strokeWidth="2" />
            </svg>
          ),
          value: 'Zárt görbe vonallal határolt síkidomok halmaza'
        },
        {
          id: 'p2-7',
          prompt: 'Kockák ∩ Síkidomok',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <path d="M10 14 L20 8 L30 14 L20 20 Z" className="fill-blue-200 stroke-blue-600" strokeWidth="1" />
              <path d="M10 14 L20 20 L20 30 L10 24 Z" className="fill-blue-400 stroke-blue-700" strokeWidth="1" />
              <path d="M20 20 L30 14 L30 24 L20 30 Z" className="fill-blue-300 stroke-blue-600" strokeWidth="1" />
              <line x1="6" y1="34" x2="34" y2="6" className="stroke-rose-600" strokeWidth="2" />
            </svg>
          ),
          value: 'Üres halmaz (a kocka 3D test, nem síkidom)'
        },
        {
          id: 'p2-8',
          prompt: 'Egyenlő oldalú háromszögek',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <polygon points="20,6 34,34 6,34" className="fill-teal-100 stroke-teal-600" strokeWidth="2" />
            </svg>
          ),
          value: 'Részhalmaza az összes háromszög halmazának'
        }
      ]
    },

    // ========================================================
    // 3. SZINT: HALMAZMŰVELETEK ÉS LOGIKAI ÖSSZEFÜGGÉSEK
    // ========================================================
    3: {
      title: '3. Szint: Halmazműveletek és logikai szabályok',
      subtitle: 'Párosítsd az összetettebb halmazműveleti összefüggéseket a jelentésükkel!',
      pairs: [
        {
          id: 'p3-1',
          prompt: 'A \\ B (különbség)',
          promptFigure: (
            <svg className="w-14 h-10 mx-auto" viewBox="0 0 70 40" fill="none">
              <circle cx="26" cy="20" r="16" className="fill-violet-300 stroke-violet-600" strokeWidth="1.5" />
              <circle cx="44" cy="20" r="16" className="fill-white stroke-slate-400" strokeWidth="1.5" />
            </svg>
          ),
          value: 'Azok az elemek, amelyek A-ban benne vannak, de B-ben nem'
        },
        {
          id: 'p3-2',
          prompt: 'Ha B ⊆ A, akkor A ∩ B = ?',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 60 40" fill="none">
              <ellipse cx="30" cy="20" rx="25" ry="16" className="stroke-blue-500" strokeWidth="1.5" />
              <circle cx="34" cy="20" r="8" className="fill-blue-500 stroke-blue-700" strokeWidth="1.5" />
            </svg>
          ),
          value: 'Maga a szűkebb B halmaz (B minden eleme közös)'
        },
        {
          id: 'p3-3',
          prompt: 'Ha B ⊆ A, akkor A ∪ B = ?',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 60 40" fill="none">
              <ellipse cx="30" cy="20" rx="25" ry="16" className="fill-emerald-200 stroke-emerald-600" strokeWidth="1.5" />
              <circle cx="34" cy="20" r="8" className="stroke-emerald-800" strokeWidth="1.5" />
            </svg>
          ),
          value: 'Maga a tágabb A halmaz'
        },
        {
          id: 'p3-4',
          prompt: 'Diszjunkt halmazok metszete',
          promptFigure: (
            <svg className="w-14 h-10 mx-auto" viewBox="0 0 70 40" fill="none">
              <circle cx="20" cy="20" r="13" className="stroke-slate-500" strokeWidth="1.5" />
              <circle cx="50" cy="20" r="13" className="stroke-slate-500" strokeWidth="1.5" />
            </svg>
          ),
          value: 'A ∩ B = ∅ (nincs közös elemük)'
        },
        {
          id: 'p3-5',
          prompt: '|A| (számosság)',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="16" className="fill-amber-50 stroke-amber-500" strokeWidth="2" />
              <circle cx="15" cy="16" r="2" className="fill-amber-700" />
              <circle cx="25" cy="16" r="2" className="fill-amber-700" />
              <circle cx="20" cy="26" r="2" className="fill-amber-700" />
            </svg>
          ),
          value: 'Az A halmaz elemeinek a száma'
        },
        {
          id: 'p3-6',
          prompt: 'A\' (komplementer halmaz)',
          promptFigure: (
            <svg className="w-12 h-10 mx-auto" viewBox="0 0 60 40" fill="none">
              <rect x="2" y="2" width="56" height="36" rx="4" className="fill-rose-100 stroke-rose-400" strokeWidth="1.5" />
              <circle cx="30" cy="20" r="11" className="fill-white stroke-slate-500" strokeWidth="1.5" />
            </svg>
          ),
          value: 'Az alaphalmaz összes olyan eleme, ami nem tartozik A-ba'
        },
        {
          id: 'p3-7',
          prompt: 'Négyszögek ∩ Szimmetrikus alakzatok',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <polygon points="8,10 32,10 38,30 2,30" className="fill-indigo-100 stroke-indigo-600" strokeWidth="2" />
              <line x1="20" y1="6" x2="20" y2="34" className="stroke-rose-500" strokeWidth="1.5" strokeDasharray="3 2" />
            </svg>
          ),
          value: 'Tengelyesen vagy középpontosan szimmetrikus négyszögek'
        },
        {
          id: 'p3-8',
          prompt: 'A ∩ A = ? és A ∪ A = ?',
          promptFigure: (
            <svg className="w-10 h-10 mx-auto" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="14" className="fill-purple-200 stroke-purple-600" strokeWidth="2" />
              <text x="20" y="24" textAnchor="middle" className="text-[12px] font-black fill-purple-900">A</text>
            </svg>
          ),
          value: 'Mindkét művelet eredménye maga az A halmaz'
        }
      ]
    }
  };

  return (
    <MatcherTemplate
      level={currentLevel}
      currentLevel={currentLevel}
      title="Halmazok Párosító"
      subtitle="5. osztály • III. Bevezetés a geometriába • 2. Halmazok"
      badge="5. OSZTÁLY • HALMAZOK PÁROSÍTÓ"
      levels={levels}
      levelConfigs={levels}
      themeColor="violet"
      onBack={onBack}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};

export default SetsMatcher;
