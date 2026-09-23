import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GeometricConceptsMatcherProps {
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
    title: '1. Szint: Alapfogalmak és Jelölések',
    subtitle: 'Párosítsd a geometriai alapfogalmakat, származtatott alakzatokat a definíciójukkal és ábráikkal!',
    pairs: [
      {
        id: 'p1',
        prompt: 'Pont',
        value: '0 dimenziós helyzet, nincs kiterjedése (A, B, P)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-16 h-8">
            <circle cx="35" cy="15" r="4.5" className="fill-teal-600" />
            <text x="45" y="19" className="text-[12px] font-mono font-bold fill-slate-800 dark:fill-slate-100">P</text>
          </svg>
        )
      },
      {
        id: 'p2',
        prompt: 'Egyenes',
        value: 'Mindkét irányban végtelen, 1 dimenziós vonal',
        promptFigure: (
          <svg viewBox="0 0 80 30" className="w-18 h-8">
            <line x1="5" y1="15" x2="75" y2="15" className="stroke-blue-600 stroke-[2.5]" />
          </svg>
        )
      },
      {
        id: 'p3',
        prompt: 'Félegyenes',
        value: 'Egy pontból kiinduló, egy irányban végtelen egyenesrész',
        promptFigure: (
          <svg viewBox="0 0 80 30" className="w-18 h-8">
            <line x1="15" y1="15" x2="70" y2="15" className="stroke-cyan-600 stroke-[2.5]" />
            <circle cx="15" cy="15" r="4" className="fill-cyan-700" />
            <polygon points="70,12 78,15 70,18" className="fill-cyan-600" />
          </svg>
        )
      },
      {
        id: 'p4',
        prompt: 'Szakasz',
        value: 'Két végpont közötti egyenesrész a végpontokkal',
        promptFigure: (
          <svg viewBox="0 0 80 30" className="w-18 h-8">
            <line x1="15" y1="15" x2="65" y2="15" className="stroke-indigo-600 stroke-[3]" />
            <circle cx="15" cy="15" r="3.5" className="fill-indigo-700" />
            <circle cx="65" cy="15" r="3.5" className="fill-indigo-700" />
          </svg>
        )
      },
      {
        id: 'p5',
        prompt: 'Sík',
        value: '2 dimenziós, minden irányban végtelen felület (α, β)',
        promptFigure: (
          <svg viewBox="0 0 80 35" className="w-18 h-8">
            <polygon points="15,8 70,8 60,30 5,30" className="fill-indigo-100/50 stroke-indigo-500 stroke-[1.5]" />
          </svg>
        )
      },
      {
        id: 'p6',
        prompt: 'Felezőpont (F)',
        value: '|AF| = |FB| = |AB| / 2 (egyenlő távolság a végpontoktól)',
        promptFigure: (
          <svg viewBox="0 0 80 30" className="w-18 h-8">
            <line x1="10" y1="15" x2="70" y2="15" className="stroke-purple-600 stroke-[2.5]" />
            <circle cx="40" cy="15" r="3.5" className="fill-purple-700" />
            <text x="37" y="27" className="text-[10px] font-mono font-bold fill-purple-700">F</text>
          </svg>
        )
      },
      {
        id: 'p7',
        prompt: '2 pont kapcsolata',
        value: 'Pontosan 1 egyenest határoz meg',
        promptFigure: (
          <svg viewBox="0 0 80 30" className="w-18 h-8">
            <line x1="5" y1="20" x2="75" y2="10" className="stroke-teal-600 stroke-[2]" />
            <circle cx="25" cy="17" r="3" className="fill-teal-700" />
            <circle cx="55" cy="13" r="3" className="fill-teal-700" />
          </svg>
        )
      },
      {
        id: 'p8',
        prompt: '3 nem kollineáris pont',
        value: 'Pontosan 1 síkot határoz meg',
        promptFigure: (
          <svg viewBox="0 0 80 35" className="w-18 h-8">
            <circle cx="20" cy="25" r="3" className="fill-purple-600" />
            <circle cx="60" cy="20" r="3" className="fill-purple-600" />
            <circle cx="40" cy="10" r="3" className="fill-purple-600" />
          </svg>
        )
      }
    ]
  },
  2: {
    title: '2. Szint: Szögtípusok és Tartományok',
    subtitle: 'Párosítsd a szögfajtákat a pontos foktartományukkal és ábráikkal!',
    pairs: [
      {
        id: 'p9',
        prompt: 'Nullszög',
        value: 'α = 0° (a két szár egybeesik)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-16 h-7">
            <line x1="15" y1="15" x2="60" y2="15" className="stroke-slate-600 stroke-[2.5]" />
            <circle cx="15" cy="15" r="3" className="fill-slate-800 dark:fill-white" />
          </svg>
        )
      },
      {
        id: 'p10',
        prompt: 'Hegyesszög',
        value: '0° < α < 90° (kisebb a derékszögnél)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8">
            <line x1="15" y1="28" x2="60" y2="28" className="stroke-teal-600 stroke-[2]" />
            <line x1="15" y1="28" x2="48" y2="8" className="stroke-teal-600 stroke-[2]" />
            <path d="M 30 28 A 15 15 0 0 0 27 18" fill="none" className="stroke-teal-500 stroke-[1.5]" />
          </svg>
        )
      },
      {
        id: 'p11',
        prompt: 'Derékszög',
        value: 'α = 90° (a szárak merőlegesek egymásra)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8">
            <line x1="15" y1="28" x2="60" y2="28" className="stroke-blue-600 stroke-[2]" />
            <line x1="15" y1="28" x2="15" y2="5" className="stroke-blue-600 stroke-[2]" />
            <rect x="15" y="18" width="10" height="10" fill="none" className="stroke-blue-500 stroke-[1.5]" />
          </svg>
        )
      },
      {
        id: 'p12',
        prompt: 'Tompaszög',
        value: '90° < α < 180° (derék- és egyenesszög között)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8">
            <line x1="35" y1="28" x2="65" y2="28" className="stroke-amber-600 stroke-[2]" />
            <line x1="35" y1="28" x2="8" y2="10" className="stroke-amber-600 stroke-[2]" />
            <path d="M 50 28 A 15 15 0 0 0 24 19" fill="none" className="stroke-amber-500 stroke-[1.5]" />
          </svg>
        )
      },
      {
        id: 'p13',
        prompt: 'Egyenesszög',
        value: 'α = 180° (a szárak egy egyenest alkotnak)',
        promptFigure: (
          <svg viewBox="0 0 70 30" className="w-16 h-7">
            <line x1="10" y1="18" x2="60" y2="18" className="stroke-purple-600 stroke-[2]" />
            <path d="M 45 18 A 10 10 0 0 0 25 18" fill="none" className="stroke-purple-500 stroke-[1.5]" />
          </svg>
        )
      },
      {
        id: 'p14',
        prompt: 'Homorúszög (Konkáv)',
        value: '180° < α < 360° (nagyobb az egyenesszögnél)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8">
            <line x1="35" y1="15" x2="65" y2="15" className="stroke-rose-600 stroke-[2]" />
            <line x1="35" y1="15" x2="18" y2="30" className="stroke-rose-600 stroke-[2]" />
            <path d="M 48 15 A 13 13 0 1 1 26 23" fill="none" className="stroke-rose-500 stroke-[1.5]" />
          </svg>
        )
      },
      {
        id: 'p15',
        prompt: 'Teljesszög',
        value: 'α = 360° (egy teljes körülfordulás a síkban)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8">
            <line x1="35" y1="18" x2="65" y2="18" className="stroke-emerald-600 stroke-[2]" />
            <circle cx="35" cy="18" r="11" fill="none" className="stroke-emerald-500 stroke-[1.5]" />
          </svg>
        )
      },
      {
        id: 'p16',
        prompt: 'Konvex szög',
        value: '0° és 180° közötti szögtartomány (nem tartalmaz egyenest)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8">
            <path d="M 15 28 L 55 28 L 45 10 Z" className="fill-teal-100 dark:fill-teal-950 stroke-teal-500 stroke-[1.5]" />
          </svg>
        )
      }
    ]
  },
  3: {
    title: '3. Szint: Egyenesek Kölcsönös Helyzete és Távolságok',
    subtitle: 'Párosítsd a síkbeli és térbeli egyenespárok helyzeteit, távolságaikat és tulajdonságaikat!',
    pairs: [
      {
        id: 'p17',
        prompt: 'Metsző egyenesek',
        value: 'Pontosan 1 közös pontjuk van (e ∩ f = {M})',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8">
            <line x1="10" y1="28" x2="60" y2="8" className="stroke-indigo-600 stroke-[2]" />
            <line x1="10" y1="8" x2="60" y2="28" className="stroke-teal-600 stroke-[2]" />
            <circle cx="35" cy="18" r="3" className="fill-rose-500" />
          </svg>
        )
      },
      {
        id: 'p18',
        prompt: 'Párhuzamos egyenesek',
        value: 'Egysíkúak és nincs közös pontjuk (e ∥ f)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8">
            <line x1="10" y1="12" x2="60" y2="12" className="stroke-blue-600 stroke-[2]" />
            <line x1="10" y1="24" x2="60" y2="24" className="stroke-blue-600 stroke-[2]" />
          </svg>
        )
      },
      {
        id: 'p19',
        prompt: 'Kitérő egyenesek',
        value: 'Térbeli egyenesek: nincs közös pontjuk és NEM egysíkúak',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8">
            <line x1="15" y1="5" x2="15" y2="30" className="stroke-rose-600 stroke-[2.5]" />
            <line x1="30" y1="18" x2="65" y2="18" className="stroke-teal-600 stroke-[2.5]" />
          </svg>
        )
      },
      {
        id: 'p20',
        prompt: 'Merőleges egyenesek',
        value: '90°-os szöget zárnak be egymással (e ⊥ f)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8">
            <line x1="10" y1="25" x2="60" y2="25" className="stroke-blue-600 stroke-[2]" />
            <line x1="35" y1="5" x2="35" y2="30" className="stroke-blue-600 stroke-[2]" />
            <rect x="35" y="15" width="8" height="10" fill="none" className="stroke-blue-500" />
          </svg>
        )
      },
      {
        id: 'p21',
        prompt: 'Pont és egyenes távolsága',
        value: 'A pontból az egyenesre bocsátott merőleges szakasz hossza',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8">
            <line x1="10" y1="28" x2="60" y2="28" className="stroke-slate-600 stroke-[2]" />
            <line x1="35" y1="8" x2="35" y2="28" className="stroke-rose-600 stroke-[2]" strokeDasharray="2 2" />
            <circle cx="35" cy="8" r="3" className="fill-rose-600" />
          </svg>
        )
      },
      {
        id: 'p22',
        prompt: 'Párhuzamosok távolsága',
        value: 'Minden pontban azonos, állandó merőleges távolság',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8">
            <line x1="10" y1="10" x2="60" y2="10" className="stroke-blue-600 stroke-[2]" />
            <line x1="10" y1="26" x2="60" y2="26" className="stroke-blue-600 stroke-[2]" />
            <line x1="35" y1="10" x2="35" y2="26" className="stroke-teal-500 stroke-[1.5]" strokeDasharray="2 2" />
          </svg>
        )
      },
      {
        id: 'p23',
        prompt: 'Kocka szomszédos élei',
        value: 'Merőlegesen metszik egymást (90°)',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8">
            <rect x="20" y="10" width="20" height="20" className="fill-none stroke-purple-600 stroke-[2]" />
          </svg>
        )
      },
      {
        id: 'p24',
        prompt: 'Kocka szemközti lapjainak nem párhuzamos élei',
        value: 'Kitérő egyenesek',
        promptFigure: (
          <svg viewBox="0 0 70 35" className="w-16 h-8">
            <line x1="15" y1="5" x2="15" y2="30" className="stroke-rose-600 stroke-[2]" />
            <line x1="25" y1="10" x2="60" y2="10" className="stroke-teal-600 stroke-[2]" />
          </svg>
        )
      }
    ]
  }
};

export const GeometricConceptsMatcher: React.FC<GeometricConceptsMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules,
  onSwitchToTheory,
  onSwitchToQuiz,
  topicId = 'g7-geom-concepts',
  topicTitle = '1. Geometriai fogalmak'
}) => {
  return (
    <MatcherTemplate
      level={level}
      grade={7}
      chapterId="g7-geom-trans"
      topicId={topicId}
      topicTitle={topicTitle}
      title="Geometriai Fogalmak Kártyás Párosító"
      subtitle="Kattints a kártyákra, és párosítsd a geometriai fogalmakat, szögtípusokat, egyenes-helyzeteket és ábráikat!"
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
};

export default GeometricConceptsMatcher;
