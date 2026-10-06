import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface EarthMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: '1. Szint: Alapfogalmak és Földrajzi Adatok',
    subtitle: 'Párosítsd a Föld geometriai fogalmait és dimenzióit a definíciójukkal!',
    pairs: [
      {
        id: 'em1-1',
        prompt: 'Föld átlagos sugara (R)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="27" cy="14" r="11" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.2" />
            <line x1="27" y1="14" x2="38" y2="14" stroke="#0f766e" strokeWidth="1.5" />
            <text x="32" y="12" className="text-[6px] font-mono font-bold fill-teal-900" textAnchor="middle">R</text>
          </svg>
        ),
        value: 'R ≈ 6370 km (átlagos gömbi sugár)'
      },
      {
        id: 'em1-2',
        prompt: 'Föld átmérője (d = 2R)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="27" cy="14" r="11" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.2" />
            <line x1="16" y1="14" x2="38" y2="14" stroke="#0f766e" strokeWidth="1.5" />
            <text x="27" y="11" className="text-[6px] font-mono font-bold fill-teal-900" textAnchor="middle">d</text>
          </svg>
        ),
        value: 'd ≈ 12 740 km (középponton átmenő leghosszabb szakasz)'
      },
      {
        id: 'em1-3',
        prompt: 'Egyenlítő hossza (K)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="27" cy="14" r="11" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.2" />
            <ellipse cx="27" cy="14" rx="11" ry="3.5" fill="none" stroke="#0369a1" strokeWidth="1.5" />
          </svg>
        ),
        value: 'K = 2πR ≈ 40 000 km (a legnagyobb szélességi kör, főkör)'
      },
      {
        id: 'em1-4',
        prompt: 'Délkör hossza (fél-főkör)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="27" cy="14" r="11" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.2" />
            <line x1="27" y1="3" x2="27" y2="25" stroke="#6d28d9" strokeWidth="1.5" />
          </svg>
        ),
        value: 'πR ≈ 20 000 km (a két sarkot összekötő meridián)'
      },
      {
        id: 'em1-5',
        prompt: 'Kezdőmeridián (0°)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <rect x="6" y="5" width="42" height="18" rx="4" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.2" />
            <text x="27" y="16" className="text-[7.5px] font-black fill-emerald-800" textAnchor="middle">0° Greenwich</text>
          </svg>
        ),
        value: 'London mellett áthaladó, kiinduló hosszúsági kör'
      },
      {
        id: 'em1-6',
        prompt: 'Északi és Déli Sark',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="27" cy="14" r="11" fill="#f1f5f9" stroke="#64748b" strokeWidth="1" />
            <circle cx="27" cy="3" r="2" fill="#ef4444" />
            <circle cx="27" cy="25" r="2" fill="#3b82f6" />
          </svg>
        ),
        value: 'A forgástengely döféspontjai a felszínen (90° É és 90° D)'
      },
      {
        id: 'em1-7',
        prompt: 'Szélességi Körök (Paralellek)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="27" cy="14" r="11" fill="#f0fdfa" stroke="#0d9488" strokeWidth="1" />
            <line x1="18" y1="8" x2="36" y2="8" stroke="#0d9488" strokeWidth="1" />
            <line x1="16" y1="14" x2="38" y2="14" stroke="#0d9488" strokeWidth="1.5" />
            <line x1="18" y1="20" x2="36" y2="20" stroke="#0d9488" strokeWidth="1" />
          </svg>
        ),
        value: 'Az Egyenlítővel párhuzamos síkmetszetek (0° - 90°)'
      },
      {
        id: 'em1-8',
        prompt: 'Hosszúsági Körök (Délkörök)',
        figure: (
          <svg viewBox="0 0 54 28" className="w-12 h-6">
            <circle cx="27" cy="14" r="11" fill="#eff6ff" stroke="#2563eb" strokeWidth="1" />
            <ellipse cx="27" cy="14" rx="5" ry="11" fill="none" stroke="#2563eb" strokeWidth="1" />
            <line x1="27" y1="3" x2="27" y2="25" stroke="#2563eb" strokeWidth="1.2" />
          </svg>
        ),
        value: 'A pólusokat összekötő, egybevágó fél-főkörök (0° - 180°)'
      }
    ]
  },
  2: {
    title: '2. Szint: Felszín, Térfogat és Távolságszámítás',
    subtitle: 'Párosítsd a numerikus értékeket és számítási összefüggéseket!',
    pairs: [
      {
        id: 'em2-1',
        prompt: '1° szélességkülönbség a délkör mentén',
        value: 'kb. 111,1 km távolság (40 000 km / 360°)'
      },
      {
        id: 'em2-2',
        prompt: 'Föld teljes felszíne (A = 4πR²)',
        value: 'kb. 510 millió km² (509,9 millió km²)'
      },
      {
        id: 'em2-3',
        prompt: 'Óceánok és világtenger aránya',
        value: 'kb. 71% a felszínből (~361 millió km²)'
      },
      {
        id: 'em2-4',
        prompt: 'Szárazföld aránya a Föld felszínén',
        value: 'kb. 29% a felszínből (~149 millió km²)'
      },
      {
        id: 'em2-5',
        prompt: 'Föld térfogata (V = 4/3 πR³)',
        value: 'kb. 1083 milliárd km³ (1,08 · 10¹² km³)'
      },
      {
        id: 'em2-6',
        prompt: 'Ortodróma',
        value: 'A gömbi főkör íve (két pont közötti legrövidebb út)'
      },
      {
        id: 'em2-7',
        prompt: '60°-os szélességi kör sugara (cos 60° = 0,5)',
        value: 'r = R · 0,5 = 3185 km (pontosan fele a földsugárnak)'
      },
      {
        id: 'em2-8',
        prompt: '60°-os szélességi kör kerülete',
        value: 'K = 20 000 km (pontosan fele az Egyenlítő kerületének)'
      }
    ]
  },
  3: {
    title: '3. Szint: Összetett Számítások, Eratoszthenész és Időzónák',
    subtitle: 'Párosítsd az elméleti, csillagászati és történelmi összefüggéseket!',
    pairs: [
      {
        id: 'em3-1',
        prompt: 'Eratoszthenész szögkülönbsége (7,2°)',
        value: 'A teljes kör 1/50-ed része (7,2° / 360° = 1/50)'
      },
      {
        id: 'em3-2',
        prompt: 'Eratoszthenész kerületszámítása',
        value: 'K = 50 × 5000 stádium = 250 000 stádium ≈ 40 000 km'
      },
      {
        id: 'em3-3',
        prompt: '1 óra időeltérés hosszúsági fokokban',
        value: '15° hosszúságkülönbség (360° / 24 óra = 15°/h)'
      },
      {
        id: 'em3-4',
        prompt: '1° hosszúságkülönbség időbeli eltérése',
        value: 'Pontosan 4 perc időkülönbség (60 perc / 15° = 4 perc)'
      },
      {
        id: 'em3-5',
        prompt: 'Forgási kerületi sebesség az Egyenlítőn',
        value: 'v ≈ 40 000 km / 24 h ≈ 1670 km/h'
      },
      {
        id: 'em3-6',
        prompt: 'Forgási kerületi sebesség a sarkokon',
        value: '0 km/h (a forgástengely döféspontja nem ír le kört)'
      },
      {
        id: 'em3-7',
        prompt: 'Nemzetközi dátumválasztó vonal',
        value: 'A 180°-os hosszúsági kör a Csendes-óceánon'
      },
      {
        id: 'em3-8',
        prompt: 'Föld átlagos sűrűsége és tömege',
        value: 'ρ ≈ 5,52 g/cm³, tömege M ≈ 5,97 × 10²⁴ kg'
      }
    ]
  }
};

export const EarthMatcher: React.FC<EarthMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g8-solids-earth',
  topicTitle = 'A Föld Geometriája (Párosító)'
}) => {
  const activeLvl: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;

  return (
    <MatcherTemplate
      key={`earth-matcher-${activeLvl}`}
      level={activeLvl}
      currentLevel={activeLvl}
      levels={matcherLevels}
      levelsConfig={matcherLevels}
      levelConfigs={matcherLevels}
      levelConfig={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      themeColor="teal"
      topicId={topicId}
      topicTitle={topicTitle}
      badge="8. Osztály • VII. Testek"
    />
  );
};

export default EarthMatcher;
