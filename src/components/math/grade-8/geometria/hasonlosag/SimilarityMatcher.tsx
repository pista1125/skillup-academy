import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface SimilarityMatcherProps {
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
    title: '1. Szint: Hasonlóság alapfogalmai és a k arány',
    subtitle: 'Párosítsd a hasonlósági transzformáció alapvető tulajdonságait és a k arányszámot!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Hasonlóság definíciója',
        value: "Minden pontpár távolsága k-szorosára változik: |P'Q'| = k · |PQ| (k > 0)",
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="10" y1="18" x2="25" y2="18" className="stroke-blue-600 stroke-[2]" />
            <line x1="38" y1="18" x2="62" y2="18" className="stroke-blue-700 stroke-[2]" />
            <text x="14" y="13" className="text-[6px] font-bold fill-blue-700">d</text>
            <text x="46" y="13" className="text-[6px] font-bold fill-blue-800">k·d</text>
          </svg>
        )
      },
      {
        id: 'p2',
        prompt: 'Nagyítás (k > 1)',
        value: 'A képalakzat minden szakasza hosszabb az eredeti alakzat megfelelő szakaszánál',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="12,24 26,24 19,10" fill="#dbeafe" className="stroke-blue-500 stroke-[1.2]" />
            <polygon points="36,26 62,26 49,4" fill="#bfdbfe" className="stroke-blue-700 stroke-[1.5]" />
            <text x="43" y="28" className="text-[6px] font-bold fill-blue-900">k &gt; 1</text>
          </svg>
        )
      },
      {
        id: 'p3',
        prompt: 'Kicsinyítés (0 < k < 1)',
        value: 'A képalakzat minden szakasza rövidebb az eredeti alakzat megfelelő szakaszánál',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="10,26 36,26 23,4" fill="#e0e7ff" className="stroke-indigo-600 stroke-[1.5]" />
            <polygon points="46,24 60,24 53,10" fill="#c7d2fe" className="stroke-indigo-500 stroke-[1.2]" />
            <text x="13" y="28" className="text-[5px] font-bold fill-indigo-900">k &lt; 1</text>
          </svg>
        )
      },
      {
        id: 'p4',
        prompt: 'Egybevágóság (k = 1)',
        value: 'Az egybevágóság a hasonlóság speciális esete, ahol a távolságok nem változnak',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="12,24 30,24 21,8" fill="#ecfdf5" className="stroke-emerald-600 stroke-[1.2]" />
            <polygon points="42,24 60,24 51,8" fill="#ecfdf5" className="stroke-emerald-600 stroke-[1.2]" />
            <text x="32" y="17" className="text-[7px] font-bold fill-emerald-800">=</text>
          </svg>
        )
      },
      {
        id: 'p5',
        prompt: 'Szögtartás hasonlóságnál',
        value: 'A megfelelő belső szögek nagysága szigorúan változatlan marad: α\' = α',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <path d="M 15 22 L 30 22 M 15 22 L 26 10" className="stroke-amber-600 stroke-[1.5]" />
            <path d="M 40 22 L 60 22 M 40 22 L 55 6" className="stroke-amber-600 stroke-[1.5]" />
            <text x="20" y="19" className="text-[6px] font-bold fill-amber-700">α</text>
            <text x="47" y="19" className="text-[6px] font-bold fill-amber-700">α' = α</text>
          </svg>
        )
      },
      {
        id: 'p6',
        prompt: 'Aránytartás elve',
        value: 'Két belső szakasz aránya megegyezik a képalakzat két megfelelő szakaszának arányával',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <rect x="15" y="6" width="40" height="18" rx="3" fill="#f8fafc" className="stroke-slate-400 stroke-[1.2]" />
            <text x="21" y="17" className="text-[7px] font-bold fill-slate-800">{"a / b = a' / b'"}</text>
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Háromszögek hasonlóságának alapesetei',
    subtitle: 'Kösd össze a hasonlósági alapeseteket a pontos geometriai kritériumukkal!',
    pairs: [
      {
        id: 'p7',
        prompt: 'Két szög egyenlő (sz-sz)',
        value: 'Két-két megfelelő szögük egyenlő (a harmadik szög összege miatt automatikusan azonos)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="12,25 32,25 24,9" fill="none" className="stroke-blue-600 stroke-[1.5]" />
            <polygon points="40,26 62,26 53,8" fill="none" className="stroke-blue-600 stroke-[1.5]" />
            <circle cx="16" cy="22" r="1.5" className="fill-blue-600" />
            <circle cx="28" cy="22" r="1.5" className="fill-teal-600" />
            <circle cx="45" cy="23" r="1.5" className="fill-blue-600" />
            <circle cx="58" cy="23" r="1.5" className="fill-teal-600" />
          </svg>
        )
      },
      {
        id: 'p8',
        prompt: 'Három oldal aránya (o-o-o)',
        value: 'Mindhárom megfelelő oldalpár aránya egyenlő: a\'/a = b\'/b = c\'/c = k',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="12,24 30,24 21,9" fill="#eff6ff" className="stroke-blue-600 stroke-[1.2]" />
            <polygon points="40,26 62,26 51,7" fill="#eff6ff" className="stroke-blue-600 stroke-[1.5]" />
            <text x="29" y="18" className="text-[6px] font-bold fill-blue-700">k-szoros</text>
          </svg>
        )
      },
      {
        id: 'p9',
        prompt: 'Két oldal aránya és közbezárt szög (o-sz-o)',
        value: 'Két-két oldal aránya k, és a köztük fekvő belső szög pontosan megegyezik',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="14,24 32,24 20,8" fill="none" className="stroke-purple-600 stroke-[1.5]" />
            <polygon points="42,26 64,26 50,7" fill="none" className="stroke-purple-600 stroke-[1.5]" />
            <path d="M 23 11 A 5 5 0 0 1 18 12" fill="none" className="stroke-rose-500 stroke-[1.2]" />
            <path d="M 54 10 A 7 7 0 0 1 48 11" fill="none" className="stroke-rose-500 stroke-[1.2]" />
          </svg>
        )
      },
      {
        id: 'p10',
        prompt: 'Két oldal és a nagyobbik szöge (d-o-o)',
        value: 'Két-két oldal aránya k, és a hosszabbik oldallal szemközti szög egyenlő',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="14,24 34,24 26,8" fill="none" className="stroke-amber-600 stroke-[1.5]" />
            <polygon points="42,26 65,26 55,7" fill="none" className="stroke-amber-600 stroke-[1.5]" />
            <text x="26" y="21" className="text-[5px] font-bold fill-amber-800">α</text>
            <text x="56" y="22" className="text-[5px] font-bold fill-amber-800">α'</text>
          </svg>
        )
      },
      {
        id: 'p11',
        prompt: 'Bármely két szabályos háromszög',
        value: 'Mindig hasonló egymáshoz, mert minden belső szögük pontosan 60° (sz-sz)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="12,24 28,24 20,10" fill="#ecfdf5" className="stroke-emerald-600 stroke-[1.5]" />
            <polygon points="38,26 62,26 50,5" fill="#ecfdf5" className="stroke-emerald-600 stroke-[1.5]" />
            <text x="17" y="22" className="text-[5px] font-bold fill-emerald-800">60°</text>
            <text x="47" y="23" className="text-[5px] font-bold fill-emerald-800">60°</text>
          </svg>
        )
      },
      {
        id: 'p12',
        prompt: 'Derékszögű háromszögek hasonlósága',
        value: 'Elegendő egyetlen hegyesszög megegyezése a hasonlósághoz (90° + α miatt sz-sz)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="12,24 30,24 12,10" fill="none" className="stroke-teal-600 stroke-[1.5]" />
            <path d="M 12 20 L 16 20 L 16 24" fill="none" className="stroke-teal-700 stroke-[1]" />
            <polygon points="40,26 64,26 40,8" fill="none" className="stroke-teal-600 stroke-[1.5]" />
            <path d="M 40 21 L 45 21 L 45 26" fill="none" className="stroke-teal-700 stroke-[1]" />
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Kerületek, területek aránya és gyakorlati alkalmazások',
    subtitle: 'Párosítsd a kerületek és területek összefüggéseit a valós problémákkal!',
    pairs: [
      {
        id: 'p13',
        prompt: 'Kerületek aránya (K\' / K)',
        value: 'A kerületek aránya megegyezik a hasonlósági aránnyal: K\' / K = k',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <rect x="15" y="7" width="40" height="16" rx="3" fill="#eff6ff" className="stroke-blue-400 stroke-[1.2]" />
            <text x="21" y="17" className="text-[7px] font-bold fill-blue-800">K' / K = k</text>
          </svg>
        )
      },
      {
        id: 'p14',
        prompt: 'Területek aránya (T\' / T)',
        value: 'A területek aránya a hasonlósági arány négyzete: T\' / T = k²',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <rect x="15" y="7" width="40" height="16" rx="3" fill="#fdf2f8" className="stroke-pink-400 stroke-[1.2]" />
            <text x="20" y="17" className="text-[7px] font-bold fill-pink-800">T' / T = k²</text>
          </svg>
        )
      },
      {
        id: 'p15',
        prompt: 'Térképi méretarány (1 : 100 000)',
        value: 'A térképen 1 cm a valóságban 100 000 cm = 1000 m = 1 km távolságnak felel meg (kicsinyítés)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="12" y1="18" x2="32" y2="18" className="stroke-indigo-600 stroke-[2]" />
            <text x="14" y="14" className="text-[6px] font-bold fill-indigo-700">1 cm</text>
            <text x="36" y="19" className="text-[6px] font-bold fill-slate-700">➔ 1 km</text>
          </svg>
        )
      },
      {
        id: 'p16',
        prompt: 'Thalész-féle árnyékmérés',
        value: 'A bot és fa magasságának aránya egyenlő az árnyékaik hosszának arányával: M/m = Á/á',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <line x1="15" y1="24" x2="15" y2="14" className="stroke-amber-800 stroke-[2]" />
            <line x1="15" y1="24" x2="25" y2="24" className="stroke-slate-600 stroke-[2]" />
            <line x1="40" y1="24" x2="40" y2="4" className="stroke-emerald-800 stroke-[2.5]" />
            <line x1="40" y1="24" x2="60" y2="24" className="stroke-slate-600 stroke-[2.5]" />
          </svg>
        )
      },
      {
        id: 'p17',
        prompt: 'Háromszög középvonala',
        value: 'Fele akkora kerületű (k = 1/2) és negyed akkora területű (k² = 1/4) háromszöget vág le',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <polygon points="12,24 58,24 35,6" fill="none" className="stroke-purple-600 stroke-[1.2]" />
            <polygon points="23.5,15 46.5,15 35,6" fill="#f3e8ff" className="stroke-purple-700 stroke-[1.2]" />
            <text x="31" y="13" className="text-[5px] font-bold fill-purple-900">T / 4</text>
          </svg>
        )
      },
      {
        id: 'p18',
        prompt: 'Térfogatok aránya (tértesteknél)',
        value: 'Hasonló tértestek (kocka, gömb) térfogatának aránya a hasonlóság köbe: V\' / V = k³',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-14 h-6 mx-auto">
            <rect x="15" y="7" width="40" height="16" rx="3" fill="#fef3c7" className="stroke-amber-400 stroke-[1.2]" />
            <text x="20" y="17" className="text-[7px] font-bold fill-amber-900">V' / V = k³</text>
          </svg>
        )
      }
    ]
  }
};

export const SimilarityMatcher: React.FC<SimilarityMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId,
  topicTitle
}) => {
  return (
    <MatcherTemplate
      level={level}
      title="Hasonlóság párosító játék"
      subtitle="Kattints a kártyákra és párosítsd a hasonlósági fogalmakat, alapeseteket és méretarányokat!"
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      topicId={topicId || 'g8-geom-similarity'}
      topicTitle={topicTitle || 'Hasonlóság'}
      grade={8}
      chapterId="geometria"
    />
  );
};

export default SimilarityMatcher;
