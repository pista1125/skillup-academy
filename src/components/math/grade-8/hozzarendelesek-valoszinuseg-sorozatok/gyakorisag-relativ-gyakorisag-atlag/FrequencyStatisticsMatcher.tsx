import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FrequencyStatisticsMatcherProps {
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
    title: '1. Szint: Statisztikai Alapfogalmak és Jelentésük',
    subtitle: 'Párosítsd a leíró statisztikai fogalmakat a matematikai definíciójukkal!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Abszolút gyakoriság (k)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="18" y="6" width="18" height="18" rx="2" fill="#10b981" />
            <text x="27" y="18" className="text-[8px] font-bold fill-white" textAnchor="middle">k</text>
          </svg>
        ),
        value: 'Megmutatja, hogy egy adott érték hányszor fordul elő a mintában'
      },
      {
        id: 'p2',
        prompt: 'Relatív gyakoriság (k / N)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="17" className="text-[7.5px] font-mono font-bold fill-teal-700" textAnchor="middle">k / N</text>
          </svg>
        ),
        value: 'A gyakoriság és az összes adat aránya (tört vagy százalék alakban)'
      },
      {
        id: 'p3',
        prompt: 'Számtani átlag (x̄)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="17" className="text-[8px] font-mono font-bold fill-blue-700" textAnchor="middle">Σx / N</text>
          </svg>
        ),
        value: 'Az adatok összegének és az adatok számának a hányadosa'
      },
      {
        id: 'p4',
        prompt: 'Módusz (Mo)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="8" y="14" width="10" height="10" fill="#94a3b8" />
            <rect x="22" y="4" width="10" height="20" fill="#10b981" />
            <rect x="36" y="10" width="10" height="14" fill="#94a3b8" />
          </svg>
        ),
        value: 'A mintában a leggyakrabban előforduló érték (legmagasabb oszlop)'
      },
      {
        id: 'p5',
        prompt: 'Medián (Me)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="6" y1="20" x2="48" y2="20" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="27" cy="20" r="4" fill="#8b5cf6" />
          </svg>
        ),
        value: 'A nagyság szerint növekvő sorba rendezett adatok középső eleme'
      },
      {
        id: 'p6',
        prompt: 'Terjedelem (R)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <line x1="8" y1="14" x2="46" y2="14" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="8" cy="14" r="2.5" fill="#f59e0b" />
            <circle cx="46" cy="14" r="2.5" fill="#f59e0b" />
          </svg>
        ),
        value: 'A legnagyobb és a legkisebb adat különbsége (xmax - xmin)'
      },
      {
        id: 'p7',
        prompt: 'Mintanagyság (N)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[8px] font-mono font-bold fill-slate-700" textAnchor="middle">N = Σk</text>
          </svg>
        ),
        value: 'Az adathalmazban vizsgált összes egyed vagy megfigyelés száma'
      },
      {
        id: 'p8',
        prompt: 'Relatív gyakoriságok összege',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="18" className="text-[8px] font-mono font-black fill-emerald-800" textAnchor="middle">Σ = 100%</text>
          </svg>
        ),
        value: 'Az összes kimenetel relatív gyakoriságának összege mindig 1 (100%)'
      }
    ]
  },
  2: {
    title: '2. Szint: Számítási Feladatok és Konkrét Eredmények',
    subtitle: 'Párosítsd a statisztikai adatsorokat a helyes kiszámított értékükkel!',
    pairs: [
      {
        id: 'p2-1',
        prompt: 'Adatok: 3, 5, 5, 6, 8, 9 átlaga',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="17" className="text-[6.5px] font-mono fill-blue-700" textAnchor="middle">Σ=36, N=6</text>
          </svg>
        ),
        value: 'Átlag: 36 / 6 = 6,0'
      },
      {
        id: 'p2-2',
        prompt: 'Rendezett adatok: 2, 4, 7, 9, 11 mediánja',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="17" className="text-[6.5px] font-mono fill-purple-700" textAnchor="middle">Páratlan N=5</text>
          </svg>
        ),
        value: 'Medián: 7 (a pontosan középen lévő 3. elem)'
      },
      {
        id: 'p2-3',
        prompt: 'Rendezett adatok: 3, 5, 7, 9 mediánja',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="17" className="text-[6.5px] font-mono fill-purple-700" textAnchor="middle">Páros N=4</text>
          </svg>
        ),
        value: 'Medián: (5 + 7) / 2 = 6,0 (a két középső átlaga)'
      },
      {
        id: 'p2-4',
        prompt: 'Adatok: 1, 2, 2, 3, 4, 4, 4, 5 módusza',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="17" className="text-[6.5px] font-mono fill-emerald-700" textAnchor="middle">k = 3 db</text>
          </svg>
        ),
        value: 'Módusz: 4 (mert 3-szor szerepel, többször mint bármi más)'
      },
      {
        id: 'p2-5',
        prompt: 'Adatok: 12, 15, 18, 29, 35 terjedelme',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="17" className="text-[6.5px] font-mono fill-amber-700" textAnchor="middle">35 - 12</text>
          </svg>
        ),
        value: 'Terjedelem: R = 35 - 12 = 23'
      },
      {
        id: 'p2-6',
        prompt: '20 diákból 5 kapott jelest. Relatív gyakoriság?',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="17" className="text-[6.5px] font-mono fill-teal-700" textAnchor="middle">5 / 20</text>
          </svg>
        ),
        value: '5 / 20 = 1 / 4 = 0,25 = 25%'
      },
      {
        id: 'p2-7',
        prompt: 'Egy kategória 25%-os arányú. Kördiagram körcikke?',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="27" cy="14" r="9" fill="#f1f5f9" stroke="#0ea5e9" />
            <path d="M 27 14 L 27 5 A 9 9 0 0 1 36 14 Z" fill="#0ea5e9" />
          </svg>
        ),
        value: 'Középponti szög: 0,25 · 360° = 90° (derékszögű körcikk)'
      },
      {
        id: 'p2-8',
        prompt: 'Egy kategória 10%-os arányú. Kördiagram körcikke?',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="17" className="text-[6.5px] font-mono fill-indigo-700" textAnchor="middle">0,10 · 360°</text>
          </svg>
        ),
        value: 'Középponti szög: 0,10 · 360° = 36°'
      }
    ]
  },
  3: {
    title: '3. Szint: Valós Helyzetek és Döntések',
    subtitle: 'Párosítsd a hétköznapi statisztikai helyzeteket a megfelelő mutatóval vagy szabállyal!',
    pairs: [
      {
        id: 'p3-1',
        prompt: 'Cipőbolt leggyakoribb rendelési mérete',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="17" className="text-[6.5px] font-bold fill-emerald-800" textAnchor="middle">Készlet</text>
          </svg>
        ),
        value: 'Módusz (abból a méretből kell a legtöbbet rendelni, amit a legtöbben vesznek)'
      },
      {
        id: 'p3-2',
        prompt: 'Egy cég dolgozóinak fizetése (egy vezérigazgatóval)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="17" className="text-[6.5px] font-bold fill-purple-800" textAnchor="middle">Kiugró bér</text>
          </svg>
        ),
        value: 'Medián (mert a vezérigazgató kiugró fizetése eltorzítaná az átlagot)'
      },
      {
        id: 'p3-3',
        prompt: 'Tanuló év végi bizonyítvány-eredménye',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="17" className="text-[6.5px] font-bold fill-blue-800" textAnchor="middle">Bizonyítvány</text>
          </svg>
        ),
        value: 'Számtani átlag (az összes tantárgy érdemjegyének átlaga)'
      },
      {
        id: 'p3-4',
        prompt: 'Két osztály átlaga: 8.A (4,0; 30 fő), 8.B (3,0; 10 fő)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="17" className="text-[6.5px] font-bold fill-amber-800" textAnchor="middle">Súlyozott</text>
          </svg>
        ),
        value: 'Súlyozott átlag: (30 · 4 + 10 · 3) / 40 = 150 / 40 = 3,75 (nem 3,5!)'
      },
      {
        id: 'p3-5',
        prompt: 'Rész-egész arányok szemléltetése (pl. költségvetés)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="27" cy="14" r="8" fill="#10b981" />
          </svg>
        ),
        value: 'Kördiagram (a 360 fokos teljes kör cikkekre bontásával)'
      },
      {
        id: 'p3-6',
        prompt: 'Kategóriák gyakoriságainak közvetlen összehasonlítása',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="12" y="10" width="8" height="12" fill="#0ea5e9" />
            <rect x="24" y="6" width="8" height="16" fill="#0ea5e9" />
            <rect x="36" y="12" width="8" height="10" fill="#0ea5e9" />
          </svg>
        ),
        value: 'Oszlopdiagram (az oszlopok magassága arányos a gyakorisággal)'
      },
      {
        id: 'p3-7',
        prompt: 'Egy futóverseny mezőnyének szóródása',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <text x="27" y="17" className="text-[6.5px] font-bold fill-rose-800" textAnchor="middle">Első - Utolsó</text>
          </svg>
        ),
        value: 'Terjedelem (a győztes és az utolsó célba érkező ideje közötti különbség)'
      },
      {
        id: 'p3-8',
        prompt: 'Kétpúpú eloszlás (pl. 2-es és 5-ös jegyek többsége)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="10" y="6" width="8" height="16" fill="#10b981" />
            <rect x="22" y="16" width="8" height="6" fill="#94a3b8" />
            <rect x="36" y="6" width="8" height="16" fill="#10b981" />
          </svg>
        ),
        value: 'Két móduszú minta (bimodális eloszlás, mindkét érték leggyakoribb)'
      }
    ]
  }
};

export const FrequencyStatisticsMatcher: React.FC<FrequencyStatisticsMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g8-func-frequency',
  topicTitle = 'Gyakoriság, Relatív Gyakoriság, Átlag'
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
      chapterId="hozzarendelesek-valoszinuseg-sorozatok"
      themeColor="emerald"
    />
  );
};

export default FrequencyStatisticsMatcher;
