import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ConstructionsMatcherProps {
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
    title: '1. Szint: Alapszerkesztések és lépéseik',
    subtitle: 'Párosítsd az euklideszi alapszerkesztéseket a hozzájuk tartozó eljárással!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Szakaszfelező merőleges',
        value: 'A végpontokból r > AB/2 sugarú körívek metszéspontjainak összekötése',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="12" y1="17.5" x2="58" y2="17.5" stroke="#0d9488" strokeWidth="2" />
            <circle cx="12" cy="17.5" r="2" fill="#0d9488" />
            <circle cx="58" cy="17.5" r="2" fill="#0d9488" />
            <path d="M 35 4 Q 38 17.5 35 31" stroke="#0ea5e9" strokeWidth="1" fill="none" strokeDasharray="2 1" />
            <path d="M 35 4 Q 32 17.5 35 31" stroke="#0ea5e9" strokeWidth="1" fill="none" strokeDasharray="2 1" />
            <line x1="35" y1="2" x2="35" y2="33" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="35" cy="5" r="1.5" fill="#e11d48" />
            <circle cx="35" cy="30" r="1.5" fill="#e11d48" />
          </svg>
        )
      },
      {
        id: 'p2',
        prompt: 'Szögfelező szerkesztése',
        value: 'Szárakon azonos távolság kimérése, majd azokból metsző egyenlő körívek',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="12" y1="26" x2="58" y2="26" stroke="#0d9488" strokeWidth="1.5" />
            <line x1="12" y1="26" x2="48" y2="6" stroke="#0d9488" strokeWidth="1.5" />
            <path d="M 28 26 A 16 16 0 0 0 24 16" fill="none" stroke="#6366f1" strokeWidth="1.2" />
            <circle cx="28" cy="26" r="1.5" fill="#6366f1" />
            <circle cx="24" cy="16" r="1.5" fill="#6366f1" />
            <line x1="12" y1="26" x2="60" y2="15" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="2 2" />
          </svg>
        )
      },
      {
        id: 'p3',
        prompt: 'Pontban egyenesre állított merőleges',
        value: 'A pont körül azonos távolságú pontpár kijelölése, majd felezőmerőlegesük',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="8" y1="24" x2="62" y2="24" stroke="#475569" strokeWidth="1.5" />
            <circle cx="35" cy="24" r="2" fill="#0d9488" />
            <circle cx="23" cy="24" r="1.5" fill="#0ea5e9" />
            <circle cx="47" cy="24" r="1.5" fill="#0ea5e9" />
            <line x1="35" y1="4" x2="35" y2="28" stroke="#e11d48" strokeWidth="1.5" />
            <path d="M 35 18 A 6 6 0 0 1 41 24" fill="none" stroke="#e11d48" strokeWidth="1" />
            <circle cx="37.5" cy="21.5" r="0.8" fill="#e11d48" />
          </svg>
        )
      },
      {
        id: 'p4',
        prompt: 'Külső pontból bocsátott merőleges',
        value: 'Külső pontból körív két metszésponttal az egyenesen, majd ezek felezőmerőlegese',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="8" y1="25" x2="62" y2="25" stroke="#475569" strokeWidth="1.5" />
            <circle cx="35" cy="8" r="2" fill="#0d9488" />
            <text x="35" y="6" textAnchor="middle" className="text-[7px] font-bold fill-teal-700">P</text>
            <path d="M 18 20 Q 35 32 52 20" stroke="#0ea5e9" strokeWidth="1" fill="none" strokeDasharray="2 1" />
            <line x1="35" y1="7" x2="35" y2="30" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="2 1" />
          </svg>
        )
      },
      {
        id: 'p5',
        prompt: 'Szögmásolás elve',
        value: 'Körív sugara a csúcsból, majd a szárak közti húrhossz rámérése a másolt ívre',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="8" y1="28" x2="32" y2="28" stroke="#0d9488" strokeWidth="1.2" />
            <line x1="8" y1="28" x2="26" y2="12" stroke="#0d9488" strokeWidth="1.2" />
            <path d="M 20 28 A 12 12 0 0 0 17 19" fill="none" stroke="#e11d48" strokeWidth="1" />
            <text x="34" y="22" className="text-[8px] font-bold fill-slate-500">➔</text>
            <line x1="42" y1="28" x2="66" y2="28" stroke="#0d9488" strokeWidth="1.2" />
            <line x1="42" y1="28" x2="60" y2="12" stroke="#0d9488" strokeWidth="1.2" />
            <path d="M 54 28 A 12 12 0 0 0 51 19" fill="none" stroke="#e11d48" strokeWidth="1" />
          </svg>
        )
      },
      {
        id: 'p6',
        prompt: 'Euklideszi szerkesztési eszközök',
        value: 'Kizárólag beosztás nélküli vonalzó és tetszőleges sugarú körző',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <rect x="8" y="20" width="30" height="7" fill="#fef3c7" stroke="#d97706" strokeWidth="1" rx="1" />
            <line x1="48" y1="8" x2="42" y2="26" stroke="#0284c7" strokeWidth="1.5" />
            <line x1="48" y1="8" x2="58" y2="26" stroke="#0284c7" strokeWidth="1.5" />
            <circle cx="48" cy="8" r="1.5" fill="#0284c7" />
          </svg>
        )
      },
      {
        id: 'p7',
        prompt: 'Párhuzamos szerkesztése ponton át',
        value: 'Merőleges állítása az egyenesre, majd arra újabb merőleges az adott pontban',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="10" y1="26" x2="60" y2="26" stroke="#475569" strokeWidth="1.5" />
            <line x1="10" y1="9" x2="60" y2="9" stroke="#0d9488" strokeWidth="1.5" />
            <line x1="35" y1="5" x2="35" y2="30" stroke="#e11d48" strokeWidth="1" strokeDasharray="2 1" />
            <circle cx="35" cy="9" r="2" fill="#0d9488" />
            <text x="39" y="11" className="text-[7px] font-bold fill-teal-700">P</text>
          </svg>
        )
      },
      {
        id: 'p8',
        prompt: 'Szakaszfelező merőleges mértani helye',
        value: 'A szakasz két végpontjától egyenlő távolságra lévő síkbeli pontok halmaza',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="15" y1="26" x2="55" y2="26" stroke="#475569" strokeWidth="1.5" />
            <circle cx="15" cy="26" r="2" fill="#475569" />
            <circle cx="55" cy="26" r="2" fill="#475569" />
            <line x1="35" y1="4" x2="35" y2="30" stroke="#0d9488" strokeWidth="1.2" />
            <circle cx="35" cy="11" r="2" fill="#e11d48" />
            <line x1="15" y1="26" x2="35" y2="11" stroke="#e11d48" strokeWidth="1" strokeDasharray="1.5 1.5" />
            <line x1="55" y1="26" x2="35" y2="11" stroke="#e11d48" strokeWidth="1" strokeDasharray="1.5 1.5" />
            <text x="21" y="16" className="text-[6px] font-bold fill-rose-600">d</text>
            <text x="47" y="16" className="text-[6px] font-bold fill-rose-600">d</text>
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Nevezetes szögek és szerkesztésük',
    subtitle: 'Párosítsd a nevezetes szögeket a megszerkesztésük alapvető módjával!',
    pairs: [
      {
        id: 'p9',
        prompt: '60°-os szög',
        value: 'Szabályos háromszög szerkesztése (a sugárral azonos körív felmérése)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="15" y1="27" x2="55" y2="27" stroke="#0d9488" strokeWidth="1.5" />
            <line x1="15" y1="27" x2="35" y2="8" stroke="#0d9488" strokeWidth="1.5" />
            <path d="M 28 27 A 13 13 0 0 0 22 17" fill="none" stroke="#e11d48" strokeWidth="1.2" />
            <text x="29" y="21" className="text-[7px] font-bold fill-rose-600">60°</text>
          </svg>
        )
      },
      {
        id: 'p10',
        prompt: '90°-os szög',
        value: 'Egyenesre állított merőleges (vagy 180°-os egyenesszög felezése)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="15" y1="26" x2="55" y2="26" stroke="#0d9488" strokeWidth="1.5" />
            <line x1="30" y1="26" x2="30" y2="7" stroke="#0d9488" strokeWidth="1.5" />
            <path d="M 30 19 A 7 7 0 0 1 37 26" fill="none" stroke="#e11d48" strokeWidth="1" />
            <circle cx="33.5" cy="22.5" r="0.8" fill="#e11d48" />
            <text x="40" y="16" className="text-[7px] font-bold fill-rose-600">90°</text>
          </svg>
        )
      },
      {
        id: 'p11',
        prompt: '30°-os szög',
        value: 'A 60°-os alapszög szögfelezőjének megszerkesztése',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="15" y1="27" x2="55" y2="27" stroke="#0d9488" strokeWidth="1.5" />
            <line x1="15" y1="27" x2="48" y2="12" stroke="#e11d48" strokeWidth="1.5" />
            <line x1="15" y1="27" x2="35" y2="8" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 1" />
            <text x="32" y="23" className="text-[7px] font-bold fill-rose-600">30°</text>
          </svg>
        )
      },
      {
        id: 'p12',
        prompt: '45°-os szög',
        value: 'A 90°-os derékszög szögfelezőjének megszerkesztése',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="15" y1="26" x2="55" y2="26" stroke="#0d9488" strokeWidth="1.5" />
            <line x1="25" y1="26" x2="25" y2="8" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 1" />
            <line x1="25" y1="26" x2="48" y2="8" stroke="#e11d48" strokeWidth="1.5" />
            <text x="36" y="21" className="text-[7px] font-bold fill-rose-600">45°</text>
          </svg>
        )
      },
      {
        id: 'p13',
        prompt: '120°-os szög',
        value: 'A 60°-os ív kétszeri felmérése vagy 180°-ból 60° levonása',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="35" y1="25" x2="62" y2="25" stroke="#0d9488" strokeWidth="1.5" />
            <line x1="35" y1="25" x2="18" y2="12" stroke="#0d9488" strokeWidth="1.5" />
            <path d="M 45 25 A 10 10 0 0 0 25 18" fill="none" stroke="#e11d48" strokeWidth="1.2" />
            <text x="32" y="14" className="text-[7px] font-bold fill-rose-600">120°</text>
          </svg>
        )
      },
      {
        id: 'p14',
        prompt: '75°-os szög',
        value: '45° és 30° összeadása (vagy a 60° és 90° közötti 30° felezése: 60° + 15°)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="18" y1="27" x2="58" y2="27" stroke="#0d9488" strokeWidth="1.5" />
            <line x1="18" y1="27" x2="31" y2="7" stroke="#e11d48" strokeWidth="1.5" />
            <line x1="18" y1="27" x2="44" y2="10" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="1.5 1.5" />
            <text x="32" y="21" className="text-[7px] font-bold fill-rose-600">75°</text>
          </svg>
        )
      },
      {
        id: 'p15',
        prompt: '15°-os szög',
        value: 'A 30°-os szög szögfelezőjének megszerkesztése',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="12" y1="26" x2="58" y2="26" stroke="#0d9488" strokeWidth="1.5" />
            <line x1="12" y1="26" x2="54" y2="17" stroke="#e11d48" strokeWidth="1.5" />
            <path d="M 28 26 A 16 16 0 0 0 27 22" fill="none" stroke="#e11d48" strokeWidth="1.2" />
            <text x="32" y="22" className="text-[6.5px] font-bold fill-rose-600">15°</text>
          </svg>
        )
      },
      {
        id: 'p16',
        prompt: '105°-os szög',
        value: '90° és 15° összege (vagy 60° és 45° összemérése)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="30" y1="26" x2="62" y2="26" stroke="#0d9488" strokeWidth="1.5" />
            <line x1="30" y1="26" x2="20" y2="9" stroke="#e11d48" strokeWidth="1.5" />
            <line x1="30" y1="26" x2="30" y2="9" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="1.5 1.5" />
            <text x="33" y="16" className="text-[7px] font-bold fill-rose-600">105°</text>
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Háromszögalapesetek és tételek',
    subtitle: 'Párosítsd a háromszögek szerkesztési eseteit és feltételeit a magyarázatukkal!',
    pairs: [
      {
        id: 'p17',
        prompt: 'o-o-o alapeset',
        value: 'Három oldal adott: alap felvétele, majd végpontjaiból körívek metszése',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="15,26 55,26 38,8" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.5" />
            <text x="35" y="32" textAnchor="middle" className="text-[6px] font-bold fill-teal-800">c</text>
            <text x="22" y="16" className="text-[6px] font-bold fill-teal-800">b</text>
            <text x="49" y="16" className="text-[6px] font-bold fill-teal-800">a</text>
          </svg>
        )
      },
      {
        id: 'p18',
        prompt: 'Háromszög-egyenlőtlenség',
        value: 'Bármely két oldal összege szigorúan nagyobb a harmadiknál: a + b > c',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="12" y1="24" x2="58" y2="24" stroke="#475569" strokeWidth="1.5" />
            <line x1="12" y1="24" x2="30" y2="12" stroke="#0d9488" strokeWidth="1.5" />
            <line x1="58" y1="24" x2="30" y2="12" stroke="#0ea5e9" strokeWidth="1.5" />
            <text x="35" y="8" textAnchor="middle" className="text-[6.5px] font-bold fill-slate-700">a + b &gt; c</text>
          </svg>
        )
      },
      {
        id: 'p19',
        prompt: 'o-sz-o alapeset',
        value: 'Két oldal és a közbezárt szög: szög felmérése után a szárak lemérése',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="15" y1="26" x2="55" y2="26" stroke="#0d9488" strokeWidth="2" />
            <line x1="15" y1="26" x2="32" y2="9" stroke="#0d9488" strokeWidth="2" />
            <line x1="32" y1="9" x2="55" y2="26" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 1" />
            <path d="M 23 26 A 8 8 0 0 0 20 20" fill="none" stroke="#e11d48" strokeWidth="1.5" />
            <text x="24" y="22" className="text-[6.5px] font-bold fill-rose-600">α</text>
          </svg>
        )
      },
      {
        id: 'p20',
        prompt: 'sz-o-sz alapeset',
        value: 'Egy oldal és a rajta fekvő két szög: szárak metszéspontja adja a 3. csúcsot',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="15" y1="26" x2="55" y2="26" stroke="#0d9488" strokeWidth="2" />
            <line x1="15" y1="26" x2="38" y2="8" stroke="#6366f1" strokeWidth="1.2" />
            <line x1="55" y1="26" x2="38" y2="8" stroke="#6366f1" strokeWidth="1.2" />
            <text x="18" y="24" className="text-[6px] font-bold fill-indigo-600">α</text>
            <text x="48" y="24" className="text-[6px] font-bold fill-indigo-600">β</text>
          </svg>
        )
      },
      {
        id: 'p21',
        prompt: 'o-o-sz (nagyobbikkal szemközti)',
        value: 'Mindig egyértelmű háromszöget ad, ha a szög a hosszabb oldallal van szemben',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="15" y1="26" x2="55" y2="26" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="15" y1="26" x2="28" y2="10" stroke="#0d9488" strokeWidth="1.8" />
            <line x1="28" y1="10" x2="50" y2="26" stroke="#e11d48" strokeWidth="1.8" />
            <text x="40" y="16" className="text-[6px] font-bold fill-rose-600">a &gt; b</text>
          </svg>
        )
      },
      {
        id: 'p22',
        prompt: 'o-o-sz (kisebbikkel szemközti)',
        value: 'Nem feltétlen egyértelmű: előfordulhat 0, 1 derékszögű, vagy 2 különböző megoldás',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <line x1="10" y1="26" x2="60" y2="26" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="15" y1="26" x2="32" y2="9" stroke="#0d9488" strokeWidth="1.5" />
            <line x1="32" y1="9" x2="38" y2="26" stroke="#e11d48" strokeWidth="1.2" />
            <line x1="32" y1="9" x2="48" y2="26" stroke="#e11d48" strokeWidth="1.2" strokeDasharray="2 1" />
            <text x="43" y="16" className="text-[6px] font-bold fill-rose-600">2 db ?</text>
          </svg>
        )
      },
      {
        id: 'p23',
        prompt: 'Belső szögek összege',
        value: 'Minden síkháromszögben pontosan 180°, így két szög ismeretében a harmadik számolható',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <polygon points="16,26 54,26 35,9" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
            <text x="35" y="20" textAnchor="middle" className="text-[6.5px] font-black fill-teal-700">∑ = 180°</text>
          </svg>
        )
      },
      {
        id: 'p24',
        prompt: 'Thalész-tétel szerkesztésekben',
        value: 'A szakasz fölé rajzolt Thálész-kör segítségével derékszögek és érintők szerkeszthetők',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8 mx-auto">
            <path d="M 15 26 A 20 20 0 0 1 55 26" fill="none" stroke="#0ea5e9" strokeWidth="1.2" />
            <line x1="15" y1="26" x2="55" y2="26" stroke="#475569" strokeWidth="1.5" />
            <line x1="15" y1="26" x2="43" y2="9" stroke="#e11d48" strokeWidth="1.2" />
            <line x1="55" y1="26" x2="43" y2="9" stroke="#e11d48" strokeWidth="1.2" />
            <circle cx="43" cy="9" r="1.5" fill="#e11d48" />
            <path d="M 39 12 A 5 5 0 0 0 45 13" fill="none" stroke="#e11d48" strokeWidth="0.8" />
            <circle cx="42" cy="12.5" r="0.6" fill="#e11d48" />
          </svg>
        )
      }
    ]
  }
};

export const ConstructionsMatcher: React.FC<ConstructionsMatcherProps> = ({
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
      key={`matcher-constructions-${level}`}
      topicId={topicId || 'g7-geom-constructions-matcher'}
      topicTitle={topicTitle || 'Szerkesztések'}
      badgeText="7. OSZTÁLY • GEOMETRIA • 🔗 PÁROSÍTÓ"
      title="Szerkesztések Párosító Játék"
      subtitle="Keresd meg az összetartozó alapszerkesztéseket, nevezetes szögeket és háromszögalapeseteket!"
      levels={matcherLevels}
      levelsConfig={matcherLevels}
      level={level}
      currentLevel={level}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      themeColor="teal"
    />
  );
};

export default ConstructionsMatcher;
