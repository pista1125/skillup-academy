import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SetRelationsMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onBack?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Alapfogalmak és Halmazok',
    subtitle: 'Párosítsd a hozzárendelések és függvények alapfogalmait a pontos jelentésükkel!',
    pairs: [
      {
        id: 'm1_1',
        prompt: 'Értelmezési tartomány (D)',
        value: 'A kiindulási elemek halmaza, amelynek elemeihez rendelünk',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <ellipse cx="35" cy="17" rx="26" ry="14" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
            <text x="35" y="21" textAnchor="middle" className="text-[10px] font-bold fill-indigo-700">D</text>
          </svg>
        )
      },
      {
        id: 'm1_2',
        prompt: 'Képhalmaz (Célhalmaz, B)',
        value: 'A célhalmaz, amelybe a hozzárendelt értékek érkeznek',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <ellipse cx="35" cy="17" rx="26" ry="14" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="35" y="21" textAnchor="middle" className="text-[10px] font-bold fill-slate-700">B</text>
          </svg>
        )
      },
      {
        id: 'm1_3',
        prompt: 'Értékkészlet (R)',
        value: 'A célhalmaz azon elemei, amelyeket a függvény ténylegesen felvesz (R ⊆ B)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <ellipse cx="35" cy="17" rx="18" ry="11" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
            <text x="35" y="21" textAnchor="middle" className="text-[10px] font-bold fill-blue-700">R</text>
          </svg>
        )
      },
      {
        id: 'm1_4',
        prompt: 'Függvény aranyszabálya',
        value: 'Az alaphalmaz minden eleméhez pontosan egyetlen kimenő érték tartozik',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <rect x="10" y="6" width="50" height="23" rx="4" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.2" />
            <text x="35" y="21" textAnchor="middle" className="text-[9px] font-bold fill-emerald-800">1 ➔ 1</text>
          </svg>
        )
      },
      {
        id: 'm1_5',
        prompt: 'Nyíldiagram',
        value: 'Venn-diagramok közötti irányított nyilakkal szemléltetett hozzárendelés',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="20" cy="17" r="10" fill="#e0e7ff" />
            <circle cx="50" cy="17" r="10" fill="#fef3c7" />
            <line x1="28" y1="17" x2="42" y2="17" stroke="#4f46e5" strokeWidth="2" />
          </svg>
        )
      },
      {
        id: 'm1_6',
        prompt: 'Kép és Őskép',
        value: 'Az x kiindulási érték az őskép, a hozzárendelt y érték pedig a képe',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <text x="20" y="21" textAnchor="middle" className="text-[10px] font-bold fill-indigo-700">x</text>
            <line x1="28" y1="17" x2="42" y2="17" stroke="#64748b" strokeWidth="1.5" />
            <text x="50" y="21" textAnchor="middle" className="text-[10px] font-bold fill-emerald-700">y</text>
          </svg>
        )
      },
      {
        id: 'm1_7',
        prompt: 'Többértelmű hozzárendelés',
        value: 'Egyetlen kiinduló elemből több nyíl is indul (ez NEM függvény!)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="20" cy="17" r="4" fill="#ef4444" />
            <line x1="24" y1="15" x2="52" y2="9" stroke="#ef4444" strokeWidth="1.5" />
            <line x1="24" y1="19" x2="52" y2="25" stroke="#ef4444" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'm1_8',
        prompt: 'Konstans hozzárendelés',
        value: 'Minden bemeneti elemhez pontosan ugyanazt a rögzített értéket rendeljük',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <circle cx="52" cy="17" r="4" fill="#f59e0b" />
            <line x1="18" y1="9" x2="48" y2="15" stroke="#f59e0b" strokeWidth="1.5" />
            <line x1="18" y1="25" x2="48" y2="19" stroke="#f59e0b" strokeWidth="1.5" />
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Szabályok és Értékpárok',
    subtitle: 'Párosítsd a hozzárendelési képleteket a hozzájuk tartozó számpárokkal (x ➔ y)!',
    pairs: [
      {
        id: 'm2_1',
        prompt: 'f(x) = 2x + 1',
        value: '(1 ➔ 3), (2 ➔ 5), (3 ➔ 7)',
        promptFigure: (
          <span className="text-xs font-mono font-bold text-indigo-700">f(x)=2x+1</span>
        )
      },
      {
        id: 'm2_2',
        prompt: 'f(x) = x²',
        value: '(-2 ➔ 4), (-1 ➔ 1), (2 ➔ 4)',
        promptFigure: (
          <span className="text-xs font-mono font-bold text-amber-700">f(x)=x²</span>
        )
      },
      {
        id: 'm2_3',
        prompt: 'f(x) = 10 - x',
        value: '(2 ➔ 8), (5 ➔ 5), (7 ➔ 3)',
        promptFigure: (
          <span className="text-xs font-mono font-bold text-emerald-700">f(x)=10-x</span>
        )
      },
      {
        id: 'm2_4',
        prompt: 'f(x) = x / 2',
        value: '(4 ➔ 2), (8 ➔ 4), (10 ➔ 5)',
        promptFigure: (
          <span className="text-xs font-mono font-bold text-sky-700">f(x)=x/2</span>
        )
      },
      {
        id: 'm2_5',
        prompt: 'f(x) = 3x - 2',
        value: '(1 ➔ 1), (2 ➔ 4), (3 ➔ 7)',
        promptFigure: (
          <span className="text-xs font-mono font-bold text-purple-700">f(x)=3x-2</span>
        )
      },
      {
        id: 'm2_6',
        prompt: 'f(x) = |x| (abszolút érték)',
        value: '(-5 ➔ 5), (0 ➔ 0), (5 ➔ 5)',
        promptFigure: (
          <span className="text-xs font-mono font-bold text-rose-700">f(x)=|x|</span>
        )
      },
      {
        id: 'm2_7',
        prompt: 'f(x) = x + 6',
        value: '(-1 ➔ 5), (0 ➔ 6), (4 ➔ 10)',
        promptFigure: (
          <span className="text-xs font-mono font-bold text-teal-700">f(x)=x+6</span>
        )
      },
      {
        id: 'm2_8',
        prompt: 'f(x) = 4',
        value: '(1 ➔ 4), (2 ➔ 4), (99 ➔ 4) (konstans)',
        promptFigure: (
          <span className="text-xs font-mono font-bold text-orange-700">f(x)=4</span>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Tulajdonságok és Speciális Hozzárendelések',
    subtitle: 'Párosítsd a hozzárendelési típusokat és feltételeket a matematikai magyarázatukkal!',
    pairs: [
      {
        id: 'm3_1',
        prompt: 'Kölcsönösen egyértelmű (1 : 1)',
        value: 'Különböző elemek képe különböző, és minden értékhez egyetlen őskép tartozik',
        promptFigure: (
          <span className="text-xs font-bold text-indigo-700">Bijekció</span>
        )
      },
      {
        id: 'm3_2',
        prompt: 'Több az egyhez kapcsolat',
        value: 'Több kiindulási elem mutat ugyanabba a cél-elembe (szabályos függvény!)',
        promptFigure: (
          <span className="text-xs font-bold text-emerald-700">Több ➔ 1</span>
        )
      },
      {
        id: 'm3_3',
        prompt: 'Egy a többhöz kapcsolat',
        value: 'Egyetlen kiinduló elemhez több cél-elem tartozik (NEM függvény!)',
        promptFigure: (
          <span className="text-xs font-bold text-rose-700">1 ➔ Több ❌</span>
        )
      },
      {
        id: 'm3_4',
        prompt: 'Tiltott érték: f(x) = 8 / x',
        value: 'x = 0 ki van zárva az értelmezési tartományból (nullával nem osztunk!)',
        promptFigure: (
          <span className="text-xs font-mono font-bold text-red-600">x ≠ 0</span>
        )
      },
      {
        id: 'm3_5',
        prompt: 'Függőleges egyenes teszt',
        value: 'Grafikonon minden függőleges egyenes legfeljebb egy pontban metszi a görbét',
        promptFigure: (
          <span className="text-xs font-bold text-blue-700">Függőleges teszt</span>
        )
      },
      {
        id: 'm3_6',
        prompt: 'f(x) = x² az egészeken',
        value: 'Függvény, de NEM kölcsönösen egyértelmű, mert pl. f(-3) = f(3) = 9',
        promptFigure: (
          <span className="text-xs font-mono font-bold text-purple-700">x² nem 1:1</span>
        )
      },
      {
        id: 'm3_7',
        prompt: 'f(x) = 3x - 1 inverz kérdés',
        value: 'Ha az y = 14 képelem adott, akkor az eredeti őskép x = 5 volt',
        promptFigure: (
          <span className="text-xs font-mono font-bold text-amber-700">y=14 ➔ x=5</span>
        )
      },
      {
        id: 'm3_8',
        prompt: 'Hiányos hozzárendelés',
        value: 'Az alaphalmaz valamelyik eleméhez nincs kirendelve semmi (nem függvény)',
        promptFigure: (
          <span className="text-xs font-bold text-slate-600">Hiányos ❌</span>
        )
      }
    ]
  }
};

export const SetRelationsMatcher: React.FC<SetRelationsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onBack,
  topicId = 'g7-stats-relations',
  topicTitle = '1. Két halmaz közötti hozzárendelések'
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
      onSwitchToSorter={onSwitchToSorter}
      onBack={onBack}
    />
  );
};

export default SetRelationsMatcher;
