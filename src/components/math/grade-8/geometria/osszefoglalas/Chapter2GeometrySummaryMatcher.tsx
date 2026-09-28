import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface Chapter2GeometrySummaryMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Geometriai transzformációk alaptípusai',
    subtitle: 'Párosítsd a transzformációkat a legfőbb geometriai jellemzőjükkel!',
    pairs: [
      {
        id: 'sum-m1',
        prompt: 'Tengelyes tükrözés',
        value: 'Az egyetlen alapvető egybevágóság, amely megfordítja a körüljárási irányt (orientációváltó)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="35" y1="3" x2="35" y2="27" stroke="#94a3b8" strokeWidth="1.5" />
            <polygon points="18,22 30,22 24,10" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1" />
            <polygon points="52,22 40,22 46,10" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 'sum-m2',
        prompt: 'Középpontos tükrözés',
        value: '180°-os elforgatás az O centrum körül, egyetlen fixpontja az O (irányítástartó)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="2.5" fill="#4f46e5" />
            <polygon points="15,22 27,22 21,12" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
            <polygon points="55,8 43,8 49,18" fill="#dbeafe" stroke="#2563eb" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 'sum-m3',
        prompt: 'Párhuzamos eltolás',
        value: 'Minden pontot azonos irányban és azonos távolságra visz el vektorral, nincs fixpontja',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="20" y1="15" x2="45" y2="15" stroke="#10b981" strokeWidth="1.5" />
            <polygon points="45,15 40,12 40,18" fill="#10b981" />
          </svg>
        )
      },
      {
        id: 'sum-m4',
        prompt: 'Elforgatás (rotáció)',
        value: 'Adott pont körül adott szöggel történő elforgatás, a centrum az egyetlen fixpont',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="2.5" fill="#f59e0b" />
            <path d="M 22 15 A 13 13 0 0 1 48 15" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
          </svg>
        )
      },
      {
        id: 'sum-m5',
        prompt: 'Geometriai hasonlóság (k > 0)',
        value: 'Minden pontpár távolsága k-szorosára változik, a szögek és a körüljárás szigorúan változatlanok',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="12,24 24,24 18,12" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1" />
            <polygon points="34,26 62,26 48,4" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'sum-m6',
        prompt: 'Középpontos hasonlóság (O, λ)',
        value: "OP' = |λ| · OP az OP egyenesen, centrumon kívüli egyenes képe párhuzamos vele (e' ∥ e)",
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="5" y1="15" x2="65" y2="15" stroke="#94a3b8" strokeDasharray="2 2" strokeWidth="1" />
            <circle cx="15" cy="15" r="2.5" fill="#4f46e5" />
            <circle cx="35" cy="15" r="2" fill="#0284c7" />
            <circle cx="60" cy="15" r="2.5" fill="#10b981" />
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Főösszefüggések, arányok és alapesetek',
    subtitle: 'Párosítsd az alaptételeket és összefüggéseket!',
    pairs: [
      {
        id: 'sum-m7',
        prompt: 'Háromszögek sz-sz hasonlósága',
        value: 'Két-két megfelelő belső szög egyenlő (a harmadik a 180° miatt automatikusan egyezik)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="12,24 28,24 20,10" fill="none" stroke="#0d9488" strokeWidth="1.2" />
            <polygon points="36,25 60,25 48,6" fill="none" stroke="#0d9488" strokeWidth="1.5" />
            <text x="48" y="22" textAnchor="middle" className="text-[5px] font-bold fill-teal-800">sz-sz</text>
          </svg>
        )
      },
      {
        id: 'sum-m8',
        prompt: 'Kerületek aránya hasonlóságnál',
        value: "K' / K = k (egyenesen arányos a hasonlósági arányszámmal)",
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-blue-700">K' = k · K</text>
          </svg>
        )
      },
      {
        id: 'sum-m9',
        prompt: 'Területek aránya hasonlóságnál',
        value: "T' / T = k² (a hasonlósági arány négyzete, pl. k=3 esetén 9-szeres)",
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <rect x="12" y="12" width="12" height="12" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1" />
            <rect x="36" y="4" width="24" height="24" fill="#c4b5fd" stroke="#7c3aed" strokeWidth="1.5" />
            <text x="48" y="18" textAnchor="middle" className="text-[6px] font-black fill-purple-950">k²·T</text>
          </svg>
        )
      },
      {
        id: 'sum-m10',
        prompt: 'Térfogatok aránya testeknél',
        value: "V' / V = k³ (a hasonlósági arány köbe, pl. k=2 esetén 8-szoros)",
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-emerald-700">V' = k³ · V</text>
          </svg>
        )
      },
      {
        id: 'sum-m11',
        prompt: 'Párhuzamos szelők tétele',
        value: "OA' / OA = OB' / OB = A'B' / AB = k",
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="5" y1="20" x2="65" y2="5" stroke="#64748b" strokeWidth="1" />
            <line x1="5" y1="20" x2="65" y2="25" stroke="#64748b" strokeWidth="1" />
            <line x1="30" y1="14" x2="30" y2="22" stroke="#3b82f6" strokeWidth="1.5" />
            <line x1="55" y1="8" x2="55" y2="24" stroke="#8b5cf6" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'sum-m12',
        prompt: 'Középpontos tükrözés mint hasonlóság',
        value: 'A középpontos hasonlóság speciális esete λ = -1 aránnyal (távolságtartó)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-amber-700">λ = -1</text>
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Szerkesztési módszerek és speciális tételek',
    subtitle: 'Párosítsd a szerkesztéseket és mélyebb tételeket!',
    pairs: [
      {
        id: 'sum-m13',
        prompt: 'Szakasz felosztása 3 : 4 arányban',
        value: '3 + 4 = 7 egyenlő körosztást mérünk a segédfélegyenesre, 7. pontot kötjük B-vel',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-amber-700">3 + 4 = 7</text>
          </svg>
        )
      },
      {
        id: 'sum-m14',
        prompt: 'Negyedik arányos szerkesztése',
        value: 'x = (b · c) / a szakasz megszerkesztése párhuzamos szelők tételével',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-indigo-700">x = (b·c)/a</text>
          </svg>
        )
      },
      {
        id: 'sum-m15',
        prompt: 'Aranymetszés aránya (Φ)',
        value: 'b / a = a / (a + b) ⟹ Φ = (1 + √5) / 2 ≈ 1,618',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <text x="35" y="18" textAnchor="middle" className="text-[7px] font-bold fill-rose-700">Φ ≈ 1,618</text>
          </svg>
        )
      },
      {
        id: 'sum-m16',
        prompt: 'Háromszög súlypontja (S)',
        value: 'Középpontos hasonlóság centruma a csúcsok és oldalfelező pontok közt λ = -1/2 aránnyal',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <circle cx="35" cy="15" r="2" fill="#ef4444" />
            <text x="35" y="24" textAnchor="middle" className="text-[6px] font-bold fill-rose-700">λ = -1/2</text>
          </svg>
        )
      },
      {
        id: 'sum-m17',
        prompt: 'Mértani közép szerkesztése',
        value: 'm = √(p · q) szerkesztése Thálész-félkörrel és a derékszögű háromszög magasságtételével',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <path d="M 15 22 A 20 20 0 0 1 55 22" fill="none" stroke="#64748b" strokeWidth="1" />
            <line x1="30" y1="22" x2="30" y2="8" stroke="#ef4444" strokeWidth="1.5" />
          </svg>
        )
      },
      {
        id: 'sum-m18',
        prompt: 'Háromszög szerkesztése K kerületből és szögekből',
        value: 'Segédháromszöget szerkesztünk a szögekkel, majd a K kerületet felosztjuk az oldalarányok szerint',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="15,24 30,24 22,12" fill="none" stroke="#0284c7" strokeWidth="1" />
            <polygon points="38,26 62,26 50,6" fill="none" stroke="#d97706" strokeWidth="1.5" />
          </svg>
        )
      }
    ]
  }
};

export const Chapter2GeometrySummaryMatcher: React.FC<Chapter2GeometrySummaryMatcherProps> = ({
  level,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g8-geom-summary',
  topicTitle = 'Geometria Összefoglalás'
}) => {
  return (
    <MatcherTemplate
      level={level}
      levelsConfig={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      topicId={topicId}
      topicTitle={topicTitle}
      title="Geometria Összefoglaló Párosító"
      subtitle="Párosítsd a fejezet fogalmait, arányait és tételeit!"
      badge="8. Osztály • Geometria"
      gameId="g8-geom-summary-matcher"
    />
  );
};

export default Chapter2GeometrySummaryMatcher;
